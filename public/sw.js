// Minimal service worker — required for Chrome/Android beforeinstallprompt
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));

self.addEventListener('fetch', (e) => {
  // Only handle same-origin GET requests; pass everything else through
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) {
    return;
  }
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
