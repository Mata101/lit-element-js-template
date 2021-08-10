const filesToCache = [
  '/',
  'index.html',
  'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
  'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
  'index.js',
  'node_modules/@vaadin/router/dist/vaadin-router.js',
  'node_modules/lit-element/lit-element.js',
  'manifest.webmanifest',
  'node_modules/pwa-helpers/media-query.js',
  'node_modules/@vaadin/vaadin-tabs/vaadin-tabs.js',
  '__web-dev-server__web-socket.js',
  'node_modules/lit-html/lib/shady-render.js'
];

        const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)

    }).catch(error => {

    })
  );
});