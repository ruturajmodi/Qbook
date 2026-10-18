QUANTUMTRADE — INSTALLABLE APP (PWA)
====================================

An installable app must be served over HTTPS (or http://localhost). Opening index.html
straight from your phone's file manager works as a normal page but cannot be installed.

STEP 1 — Put these files online (free, ~2 minutes). Keep the folder structure exactly as is:
  index.html, manifest.webmanifest, sw.js, icons/ (5 PNG files)

  Easiest options:
  • Netlify Drop: go to app.netlify.com/drop and drag this whole folder in.
  • GitHub Pages: create a repo, upload the files, Settings > Pages > deploy from main.
  • Cloudflare Pages / Vercel: create a project and upload the folder.

STEP 2 — Install
  • Android (Chrome): open your link > menu (⋮) > "Install app" / "Add to Home screen".
  • iPhone / iPad (Safari): open your link > Share > "Add to Home Screen".
  • Windows / Mac / Chromebook (Chrome or Edge): click the install icon in the address bar.

It then opens full-screen with its own icon and works offline. Your trades stay on the
device (browser storage) — install does not change or move your data.

UPDATING LATER
  Replace index.html with the new version, and change VERSION in sw.js (e.g. 'qt-v2').
  Installed apps will pick up the update the next time they are opened online.

NOTE ON DATA
  Data is stored per address. If you start using the app from a new web address, your
  existing trades will not appear there: use Data Management > Export, then Import.
