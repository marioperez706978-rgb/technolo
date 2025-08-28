const CACHE_NAME = 'tech1-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/bootstrap.min.css',
  '/assets/css/estilos.css',
  '/assets/js/bootstrap.bundle.min.js',
  '/assets/js/mayusculas.js',
  '/assets/js/notificacions.js',
  '/assets/js/listarusup.js',
  '/assets/js/opciones.js',
  '/assets/js/listarusuarios.js',
  '/assets/js/listafe.js',
  '/assets/js/informacion.js',
  '/assets/js/oplogin.js',
  '/assets/js/guardarfedesindi.js',
  '/assets/js/formulario.js',
  '/assets/js/federacios.js',
  '/assets/js/contravisible.js',
  '/assets/js/placa.js',
  '/assets/js/año.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});
