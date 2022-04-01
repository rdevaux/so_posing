const CACHE_NAME = 'sw-cache-example';
const toCache = [
    'views/accueil/accueil.pug',
    'views/categories/categories.pug',
    'views/categories/sous-categories.pug',
    'views/photos/photos.pug',
    'javascript/status.js',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                return cache.addAll(toCache)
            })
            .then(self.skipWaiting())
    )
})

self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request)
            .catch(async () => {
                const cache = await caches.open(CACHE_NAME);
                return await cache.match(event.request);
            })
    )
})

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(keyList.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log('[ServiceWorker] Removing old cache', key)
                        return caches.delete(key)
                    }
                }))
            })
            .then(() => self.clients.claim())
    )
})