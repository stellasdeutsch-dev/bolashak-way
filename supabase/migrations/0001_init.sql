-- Bolashak Way Cloud — schema, policies and admin helpers.
-- Run once in the Supabase SQL editor (or `supabase db push`). Idempotent re-runs are
-- not supported: drop the objects first if you need to start over.
--
-- Design notes
--  • progress.user_id references public.profiles, not auth.users, so PostgREST can embed
--    profiles.select('*, progress(*)'); deletion still cascades auth.users → profiles → progress.
--  • is_admin() is SECURITY DEFINER: a policy on profiles that reads profiles under RLS
--    would recurse. Every definer function pins search_path.
--  • profiles has no insert/update/delete policies at all. Rows are created by a trigger
--    on auth.users; roles change only through set_role(), which refuses to remove the
--    last admin. Nobody can promote themselves.
--  • Any account holder writes their own progress row with the anon key, so the row is
--    capped: snapshot ≤ 128 KB, short text columns, ratio within [0, 1].

-- ── profiles ─────────────────────────────────────────────────────────────────
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null default '',
  role       text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);
create index profiles_email_idx on public.profiles (lower(email));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email) values (new.id, coalesce(new.email, ''))
  on conflict (id) do nothing;
  return new;
end $$;
create trigger on_auth_user_created
  after insert on auth.users for each row execute function public.handle_new_user();

create or replace function public.handle_user_email_change()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set email = coalesce(new.email, '') where id = new.id;
  return new;
end $$;
create trigger on_auth_user_email_changed
  after update of email on auth.users for each row
  when (old.email is distinct from new.email)
  execute function public.handle_user_email_change();

-- ── progress: one row per user — the snapshot plus columns the admin screens sort by ──
create table public.progress (
  user_id           uuid primary key references public.profiles(id) on delete cascade,
  snapshot          jsonb not null check (jsonb_typeof(snapshot) = 'object' and pg_column_size(snapshot) <= 131072),
  schema_version    int  not null check (schema_version between 1 and 1000),
  competition_year  int  not null check (competition_year between 2020 and 2100),
  track             text check (track is null or length(track) <= 64),
  category          text check (category is null or length(category) <= 64),
  current_stage     text check (current_stage is null or length(current_stage) <= 64),
  ratio             numeric(5,4) not null default 0 check (ratio between 0 and 1),
  done_stages       int not null default 0 check (done_stages between 0 and 100),
  total_stages      int not null default 0 check (total_stages between 0 and 100),
  client_updated_at timestamptz not null,
  updated_at        timestamptz not null default now()
);
create index progress_updated_at_idx on public.progress (updated_at desc);
create index progress_category_idx   on public.progress (category);

create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
create trigger progress_set_updated_at
  before insert or update on public.progress for each row execute function public.handle_updated_at();

-- ── activity ledger: one row per user per day, written only by the trigger ───────
create table public.activity_days (
  user_id uuid not null references public.profiles(id) on delete cascade,
  day     date not null,
  ratio   numeric(5,4) not null default 0,
  primary key (user_id, day)
);
create or replace function public.record_activity()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.activity_days (user_id, day, ratio) values (new.user_id, current_date, new.ratio)
  on conflict (user_id, day) do update set ratio = excluded.ratio;
  return new;
end $$;
create trigger progress_record_activity
  after insert or update on public.progress for each row execute function public.record_activity();

-- ── admin helpers ────────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.set_role(target uuid, new_role text)
returns void language plpgsql security definer set search_path = public as $$
declare admins int;
begin
  if not public.is_admin() then raise exception 'forbidden' using errcode = '42501'; end if;
  if new_role not in ('user', 'admin') then raise exception 'invalid role %', new_role; end if;
  -- Serialise the last-admin check so two concurrent demotions cannot both pass it.
  perform pg_advisory_xact_lock(hashtext('public.set_role'));
  if new_role = 'user' then
    select count(*) into admins from public.profiles where role = 'admin';
    if admins <= 1 and exists (select 1 from public.profiles where id = target and role = 'admin') then
      raise exception 'cannot demote the last admin';
    end if;
  end if;
  update public.profiles set role = new_role where id = target;
  if not found then raise exception 'no such user'; end if;
end $$;

create or replace function public.admin_stats()
returns jsonb language plpgsql stable security definer set search_path = public as $$
declare result jsonb;
begin
  if not public.is_admin() then raise exception 'forbidden' using errcode = '42501'; end if;
  select jsonb_build_object(
    'users_total',      (select count(*) from profiles),
    'admins',           (select count(*) from profiles where role = 'admin'),
    'with_progress',    (select count(*) from progress),
    'onboarded',        (select count(*) from progress where category is not null),
    'active_7d',        (select count(*) from progress where updated_at >= now() - interval '7 days'),
    'active_30d',       (select count(*) from progress where updated_at >= now() - interval '30 days'),
    'by_track',         (select coalesce(jsonb_object_agg(track, n), '{}') from (select track, count(*) n from progress where track is not null group by 1) t),
    'by_category',      (select coalesce(jsonb_object_agg(category, n), '{}') from (select category, count(*) n from progress where category is not null group by 1) t),
    'by_current_stage', (select coalesce(jsonb_object_agg(coalesce(current_stage, '__complete'), n), '{}') from (select current_stage, count(*) n from progress where category is not null group by 1) t),
    'ratio_buckets',    (select coalesce(jsonb_object_agg(b::text, n), '{}') from (select least(floor(ratio * 10), 9)::int b, count(*) n from progress where category is not null group by 1) t),
    'signups_by_week',  (select coalesce(jsonb_agg(jsonb_build_object('week', w, 'n', n) order by w), '[]') from (select date_trunc('week', created_at)::date w, count(*) n from profiles where created_at >= date_trunc('week', now()) - interval '11 weeks' group by 1) t),
    'active_by_day',    (select coalesce(jsonb_agg(jsonb_build_object('day', day, 'n', n) order by day), '[]') from (select day, count(*) n from activity_days where day >= current_date - 29 group by 1) t),
    'generated_at',     now()
  ) into result;
  return result;
end $$;

-- Right to erasure: a user removes their own auth row; profiles and progress cascade.
create or replace function public.delete_own_account()
returns void language plpgsql security definer set search_path = public, auth as $$
begin
  if auth.uid() is null then raise exception 'not signed in' using errcode = '42501'; end if;
  if (select role from public.profiles where id = auth.uid()) = 'admin'
     and (select count(*) from public.profiles where role = 'admin') <= 1 then
    raise exception 'the last admin cannot delete their account';
  end if;
  delete from auth.users where id = auth.uid();
end $$;

-- ── row level security ───────────────────────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.progress      enable row level security;
alter table public.activity_days enable row level security;

create policy "profiles: read own"        on public.profiles for select to authenticated using (id = auth.uid());
create policy "profiles: admin reads all" on public.profiles for select to authenticated using (public.is_admin());

create policy "progress: read own"        on public.progress for select to authenticated using (user_id = auth.uid());
create policy "progress: insert own"      on public.progress for insert to authenticated with check (user_id = auth.uid());
create policy "progress: update own"      on public.progress for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "progress: delete own"      on public.progress for delete to authenticated using (user_id = auth.uid());
create policy "progress: admin reads all" on public.progress for select to authenticated using (public.is_admin());

create policy "activity: admin reads all" on public.activity_days for select to authenticated using (public.is_admin());

-- ── grants: Supabase pre-grants anon/authenticated on public; tighten explicitly ──
revoke all on public.profiles, public.progress, public.activity_days from anon, authenticated;
grant select                         on public.profiles      to authenticated;
grant select, insert, update, delete on public.progress      to authenticated;
grant select                         on public.activity_days to authenticated;

revoke execute on function public.is_admin(), public.set_role(uuid, text), public.admin_stats(), public.delete_own_account() from public, anon;
grant  execute on function public.is_admin(), public.set_role(uuid, text), public.admin_stats(), public.delete_own_account() to authenticated;
revoke execute on function public.handle_new_user(), public.handle_user_email_change(), public.handle_updated_at(), public.record_activity() from public, anon, authenticated;

-- ── first admin (run once, after the owner has signed up) ────────────────────
-- update public.profiles set role = 'admin' where email = 'owner@example.com';
