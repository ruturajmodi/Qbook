/* QuantumTrade service worker — offline support.
   Bump VERSION whenever you replace index.html so installed apps pick up the update. */
const VERSION='qt-v1';
const CORE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/maskable-512.png','./icons/apple-touch-icon.png','./icons/favicon-32.png'];
const CDN=['https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'];

self.addEventListener('install',e=>{
  e.waitUntil((async()=>{
    const c=await caches.open(VERSION);
    await c.addAll(CORE);
    // best-effort: cache the CDN libraries so charts/PDF work offline too
    await Promise.allSettled(CDN.map(u=>c.add(new Request(u,{mode:'no-cors'}))));
    self.skipWaiting();
  })());
});
self.addEventListener('activate',e=>{
  e.waitUntil((async()=>{
    for(const k of await caches.keys())if(k!==VERSION)await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch',e=>{
  const r=e.request,u=new URL(r.url);
  if(r.method!=='GET')return;
  if(u.hostname.endsWith('jsonbin.io'))return;           // never cache cloud-backup API calls
  if(!/^https?:$/.test(u.protocol))return;
  e.respondWith((async()=>{
    const c=await caches.open(VERSION);
    const hit=await c.match(r,{ignoreSearch:true});
    const net=fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque'))c.put(r,res.clone());return res}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit}                 // instant from cache, refresh in background
    const res=await net;
    if(res)return res;
    if(r.mode==='navigate')return (await c.match('./index.html'))||Response.error();
    return Response.error();
  })());
});
