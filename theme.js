// Resolve the theme before the first paint, so a dark-mode reader never sees a white flash.
// A file of its own rather than an inline script: the Content-Security-Policy allows only
// scripts from this site, with no hashes to keep in step.
try {
  var t = (JSON.parse(localStorage.getItem('bolashak-way') || '{}').state || {}).theme || 'system'
  if (t === 'system') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', t)
} catch (e) {}
