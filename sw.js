/* Service worker: guarda la app en el celular para que funcione sin internet.
   Estrategia: pide los archivos a la red (para que siempre veas la version mas
   nueva) y, si no hay internet o tarda demasiado, usa la copia guardada. */
/* Sube este numero cada vez que cambies archivos de la app: obliga al celular
   a bajar la version nueva completa. */
var CACHE = 'generador-ejercicios-v4';

var ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icono-192.png',
  './icono-512.png',
  './css/estilos.css',
  './js/nucleo/aleatorio.js',
  './js/nucleo/formato.js',
  './js/nucleo/expresion.js',
  './js/nucleo/poli.js',
  './js/nucleo/respuestas.js',
  './js/nucleo/registro.js',
  './js/nucleo/almacen.js',
  './js/nucleo/motor.js',
  './js/temas/materias.js',
  './js/temas/matematicas/signos.js',
  './js/temas/matematicas/exponentes.js',
  './js/temas/matematicas/fracciones.js',
  './js/temas/matematicas/proporciones.js',
  './js/temas/matematicas/sucesiones.js',
  './js/temas/matematicas/progresiones.js',
  './js/temas/matematicas/monomios.js',
  './js/temas/matematicas/binomios.js',
  './js/temas/matematicas/trinomios.js',
  './js/temas/matematicas/polinomios.js',
  './js/temas/matematicas/poligonos.js',
  './js/temas/matematicas/tales.js',
  './js/temas/matematicas/pitagoras.js',
  './js/temas/matematicas/ley-senos.js',
  './js/temas/matematicas/ley-cosenos.js',
  './js/temas/matematicas/coordenadas.js',
  './js/temas/matematicas/conicas.js',
  './js/temas/matematicas/excentricidad.js',
  './js/temas/matematicas/elementos-funcion.js',
  './js/temas/matematicas/paridad.js',
  './js/temas/matematicas/tipos-funcion.js',
  './js/temas/matematicas/logaritmos.js',
  './js/temas/matematicas/limites.js',
  './js/temas/matematicas/derivadas.js',
  './js/temas/matematicas/puntos-criticos.js',
  './js/temas/matematicas/tfc.js',
  './js/temas/matematicas/integracion-partes.js',
  './js/temas/matematicas/sustitucion.js',
  './js/temas/matematicas/estadistica.js',
  './js/temas/matematicas/probabilidad.js',
  './js/temas/matematicas/binomial.js',
  './js/app.js'
];

/* Guarda todos los archivos. Si alguno falla no se cancela todo: se guardan
   los que si se pudieron bajar. */
function guardarTodo() {
  return caches.open(CACHE).then(function (c) {
    return Promise.all(ARCHIVOS.map(function (a) {
      return c.add(a).catch(function () { /* ese archivo se reintenta al usarlo */ });
    }));
  });
}

self.addEventListener('install', function (e) {
  e.waitUntil(guardarTodo().then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (claves) {
      return Promise.all(claves.map(function (k) {
        return k === CACHE ? null : caches.delete(k);
      }));
    })
      .then(guardarTodo)          // por si el cache quedo vacio
      .then(function () { return self.clients.claim(); })
  );
});

/* Primero intenta la red (para que siempre veas la version mas nueva) y si no
   hay internet -o tarda mas de 2.5 s- responde con lo que tiene guardado. */
var ESPERA = 2500;

function redPrimero(req) {
  return new Promise(function (resolve, reject) {
    var resuelto = false;
    function contestar(resp) { if (!resuelto && resp) { resuelto = true; resolve(resp); } }

    var reloj = setTimeout(function () {
      caches.match(req).then(contestar);
    }, ESPERA);

    fetch(req).then(function (resp) {
      clearTimeout(reloj);
      if (resp && resp.status === 200 && resp.type === 'basic') {
        var copia = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copia); });
      }
      contestar(resp);
    }).catch(function (err) {
      clearTimeout(reloj);
      caches.match(req).then(function (guardado) {
        if (guardado) contestar(guardado);
        else if (!resuelto) reject(err);
      });
    });
  });
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  if (e.request.url.indexOf('http') !== 0) return;
  e.respondWith(redPrimero(e.request));
});
