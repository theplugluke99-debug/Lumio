const CACHE_NAME = 'lumio-v1'
const STATIC_ASSETS = [
  '/',
  '/demo',
  '/audit',
  '/manifest.json',
]

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  )
})

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  )
})
