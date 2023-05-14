const CACHE_NAME = 'qrpwd-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/s.css',
  '/qrpwd-logo.png',
  '/qrcode.min.js',
  '/crypto-js.min.js',
  '/zxing.min.js',
  '/decode-browser.js',
  '/encode-browser.js'
];

self.addEventListener('install', async function(event) {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(urlsToCache);
  } catch (error) {
    console.error('Failed to cache files:', error);
  }
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
});