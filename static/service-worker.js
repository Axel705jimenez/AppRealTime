const CACHE_NAME = 'chat-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/static/css/styles.css',
    '/static/icons/icon-192x192.png',
    '/static/icons/icon-512x512.png',
    '/static/script.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Archivos en caché:', urlsToCache);
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});
