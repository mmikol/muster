/* The app used to live here and kept its files in this browser. This takes its place once: it clears those files, steps aside, and reloads any
   open page, which then lands on the forwarding page and goes on to the new address. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', ev => ev.waitUntil((async () => {
  const mine = 'app:' + self.registration.scope + ':';
  for (const k of await caches.keys()) if (k.startsWith(mine)) await caches.delete(k);
  await self.clients.claim();
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url).catch(() => {});
})()));
