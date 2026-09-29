/* Modo prepa: estadistica y probabilidad */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  function suma(l) { return l.reduce(function (a, b) { return a + b; }, 0); }
  function orden(l) { return l.slice().sort(function (a, b) { return a - b; }); }
  function mediana(l) {
    var o = orden(l), m = o.length / 2;
    return o.length % 2 ? o[Math.floor(m)] : (o[m - 1] + o[m]) / 2;
  }

  /* Fraccion como texto de inciso: "3/8" */
  function fr(a, b) { var s = F.simplifica(a, b); return s[1] === 1 ? String(s[0]) : F.frac(s[0], s[1]); }

  var casos = {};

  /* ---------- facil ---------- */

  casos.media = function (r) {
    var n = r.entero(5, 7), l = [];
    do {
      l = [];
      for (var i = 0; i < n; i++) l.push(r.entero(5, 10));
    } while (suma(l) % n !== 0);
    var prom = suma(l) / n;
    return P.ejercicio(
      'Las calificaciones de un alumno en ' + n + ' materias fueron: ' + l.join(', ') + '. &iquest;Cual es su promedio?',
      P.opciones(r, prom, [mediana(l), suma(l) / (n - 1), suma(l), (Math.max.apply(null, l) + Math.min.apply(null, l)) / 2], { dec: 2 }),
      ['Promedio (media) = suma de todos los datos / cuantos datos hay.', 'La suma da ' + suma(l) + '.'],
      ['Suma: ' + l.join(' + ') + ' = ' + suma(l),
        'Promedio: ' + suma(l) + ' / ' + n + ' = <b>' + F.n(prom, 2) + '</b>']);
  };

  casos.medianaModa = function (r) {
    var n = r.elige([7, 9, 8]), l = [];
    for (var i = 0; i < n - 2; i++) l.push(r.entero(1, 20));
    var moda = r.elige(l);
    l.push(moda, moda);
    /* que la moda sea unica */
    var cuenta = {};
    l.forEach(function (x) { cuenta[x] = (cuenta[x] || 0) + 1; });
    var max = Math.max.apply(null, Object.keys(cuenta).map(function (k) { return cuenta[k]; }));
    var modas = Object.keys(cuenta).filter(function (k) { return cuenta[k] === max; });
    if (modas.length > 1) { l.push(moda); }
    l = r.baraja(l);
    var pideModa = r.bool();
    var med = mediana(l);
    var v = pideModa ? moda : med;
    var err = pideModa
      ? [med, suma(l) / l.length, max + (max === moda ? 1 : 0), Math.max.apply(null, l)]
      : [l[Math.floor(l.length / 2)], moda, suma(l) / l.length, orden(l)[Math.floor(l.length / 2) - 1] + 1];
    return P.ejercicio(
      'Los goles que anoto un equipo en sus partidos fueron: ' + l.join(', ') + '. &iquest;Cual es la ' + (pideModa ? 'moda' : 'mediana') + '?',
      P.opciones(r, v, err, { dec: 2 }),
      [pideModa ? 'La moda es el dato que mas se repite.' : 'La mediana es el dato de en medio, pero primero hay que ORDENAR los datos.',
        pideModa ? 'Cuenta cuantas veces aparece cada numero.' : 'Hay ' + l.length + ' datos; ' + (l.length % 2 ? 'el de en medio es el lugar ' + ((l.length + 1) / 2) + '.' : 'hay dos en medio: promedia los lugares ' + (l.length / 2) + ' y ' + (l.length / 2 + 1) + '.')],
      pideModa
        ? ['El ' + moda + ' aparece ' + l.filter(function (x) { return x === moda; }).length + ' veces, mas que cualquier otro', 'Moda = <b>' + moda + '</b>']
        : ['Ordenados: ' + orden(l).join(', '), 'Mediana = <b>' + F.n(med, 2) + '</b>']);
  };

  casos.probSimple = function (r) {
    var rojas = r.entero(2, 9), azules = r.entero(2, 9), verdes = r.entero(2, 7);
    var total = rojas + azules + verdes;
    var col = r.elige([['roja', rojas], ['azul', azules], ['verde', verdes]]);
    var otros = total - col[1];
    return P.ejercicio(
      'En una bolsa hay ' + rojas + ' pelotas rojas, ' + azules + ' azules y ' + verdes + ' verdes. Si se saca una sin ver, &iquest;cual es la probabilidad de que sea ' + col[0] + '?',
      P.opciones(r, fr(col[1], total), [fr(col[1], otros), fr(otros, total), fr(1, 3), fr(1, total), fr(col[1] + 1, total), fr(col[1], total + 1)]),
      ['Probabilidad = casos favorables / casos totales.', 'En total hay ' + total + ' pelotas.'],
      ['Favorables: ' + col[1] + ' &nbsp; Totales: ' + total, 'P = <b>' + fr(col[1], total) + '</b>']);
  };

  /* ---------- medio ---------- */

  casos.promedioFaltante = function (r) {
    var n = r.entero(3, 5), meta = r.entero(7, 9);
    var l = [], i;
    var falta;
    do {
      l = [];
      for (i = 0; i < n; i++) l.push(r.entero(6, 10));
      falta = meta * (n + 1) - suma(l);
    } while (falta < 5 || falta > 10);
    return P.ejercicio(
      'En sus primeros ' + n + ' examenes un alumno saco ' + l.join(', ') + '. &iquest;Cuanto necesita sacar en el siguiente para que su promedio sea exactamente ' + meta + '?',
      P.opciones(r, falta, [meta, meta * n - suma(l) + meta, 2 * meta - suma(l) / n, Math.round(suma(l) / n)].map(function (x) { return F.redondea(x, 2); }), { dec: 2 }),
      ['Si el promedio de ' + (n + 1) + ' examenes es ' + meta + ', la suma de todos debe ser ' + meta + ' &times; ' + (n + 1) + '.',
        'Ya lleva ' + suma(l) + ' puntos.'],
      ['Suma necesaria: ' + meta + ' &times; ' + (n + 1) + ' = ' + (meta * (n + 1)),
        'Lleva: ' + l.join(' + ') + ' = ' + suma(l),
        'Le falta: ' + (meta * (n + 1)) + ' &minus; ' + suma(l) + ' = <b>' + falta + '</b>']);
  };

  casos.dosDados = function (r) {
    var s = r.entero(3, 11), fav = 0;
    for (var i = 1; i <= 6; i++) for (var j = 1; j <= 6; j++) if (i + j === s) fav++;
    return P.ejercicio(
      'Se lanzan dos dados normales. &iquest;Cual es la probabilidad de que la suma sea ' + s + '?',
      P.opciones(r, fr(fav, 36), [fr(1, 11), fr(fav, 12), fr(1, 6), fr(fav + 1, 36), fr(s, 36)]),
      ['Hay 6 &times; 6 = 36 resultados posibles, todos igual de probables.',
        'Cuenta las parejas (dado 1, dado 2) que suman ' + s + '. (3, 4) y (4, 3) son distintas.'],
      ['Parejas que suman ' + s + ': ' + (function () {
        var p = [];
        for (var a = 1; a <= 6; a++) for (var b = 1; b <= 6; b++) if (a + b === s) p.push('(' + a + ', ' + b + ')');
        return p.join(', ');
      })(),
        'Son ' + fav + ' de 36: P = <b>' + fr(fav, 36) + '</b>']);
  };

  casos.graficaTabla = function (r) {
    var cats = r.elige([
      ['Futbol', 'Basquetbol', 'Voleibol', 'Natacion'],
      ['Tacos', 'Tortas', 'Quesadillas', 'Tamales'],
      ['Rock', 'Pop', 'Reggaeton', 'Banda']
    ]);
    var tot = r.elige([40, 50, 60, 80, 100, 120, 200]);
    var pcts;
    do {
      pcts = [r.entero(2, 8) * 5, r.entero(2, 8) * 5, r.entero(2, 8) * 5];
      pcts.push(100 - suma(pcts));
    } while (pcts[3] < 10 || pcts.some(function (p) { return (p * tot) % 100 !== 0; }));
    var k = r.entero(0, 3);
    var v = pcts[k] * tot / 100;
    var tabla = '<table class="tabla"><tr><th>' + cats.join('</th><th>') + '</th></tr><tr><td>' +
      pcts.map(function (p) { return p + '%'; }).join('</td><td>') + '</td></tr></table>';
    return P.ejercicio(
      'Se pregunto a ' + tot + ' alumnos cual es su favorito y los resultados en porcentaje fueron:<br>' + tabla +
        '&iquest;Cuantos alumnos eligieron <b>' + cats[k] + '</b>?',
      P.opciones(r, v, [pcts[k], tot / 4, tot - v, pcts[k] * 100 / tot]),
      ['El porcentaje es de los ' + tot + ' alumnos.', pcts[k] + '% de ' + tot + ' = ' + tot + ' &times; ' + pcts[k] + ' / 100.'],
      [pcts[k] + '% de ' + tot + ' = ' + tot + ' &times; ' + F.n(pcts[k] / 100) + ' = <b>' + v + ' alumnos</b>']);
  };

  /* ---------- dificil ---------- */

  casos.sinReemplazo = function (r) {
    var a = r.entero(3, 7), b = r.entero(2, 6), t = a + b;
    return P.ejercicio(
      'Una caja tiene ' + a + ' focos buenos y ' + b + ' fundidos. Se sacan dos focos, uno tras otro, sin regresar el primero. ' +
        '&iquest;Cual es la probabilidad de que los dos esten buenos?',
      P.opciones(r, fr(a * (a - 1), t * (t - 1)), [fr(a * a, t * t), fr(a, t), fr(a * (a - 1), t * t), fr(a - 1, t - 1), fr(2 * a - 1, 2 * t)]),
      ['Multiplica la probabilidad del primero por la del segundo.',
        'Despues de sacar un foco bueno quedan ' + (a - 1) + ' buenos de ' + (t - 1) + ' en total.'],
      ['Primero bueno: ' + F.frac(a, t),
        'Segundo bueno (ya sin el primero): ' + F.frac(a - 1, t - 1),
        'P = ' + F.frac(a, t) + ' &times; ' + F.frac(a - 1, t - 1) + ' = ' + F.frac(a * (a - 1), t * (t - 1)) + ' = <b>' + fr(a * (a - 1), t * (t - 1)) + '</b>']);
  };

  casos.conteo = function (r) {
    var tipo = r.entero(0, 2), v, err, enun, sol, pistas;
    if (tipo === 0) {
      var c = r.entero(3, 6), p = r.entero(2, 5), z = r.entero(2, 4);
      v = c * p * z;
      err = [c + p + z, c * p + z, v * 2];
      enun = 'Para el uniforme hay ' + c + ' camisas, ' + p + ' pantalones y ' + z + ' pares de zapatos. &iquest;De cuantas formas distintas te puedes vestir?';
      pistas = ['Principio multiplicativo: por cada camisa puedes usar cualquier pantalon, y asi.', 'Multiplica las opciones.'];
      sol = [c + ' &times; ' + p + ' &times; ' + z + ' = <b>' + v + '</b>'];
    } else if (tipo === 1) {
      var n = r.entero(5, 10), k = 3, perm = n * (n - 1) * (n - 2);
      v = perm;
      err = [perm / 6, n * n * n, n * 3];
      enun = 'En un concurso participan ' + n + ' alumnos y se dara 1er, 2do y 3er lugar. &iquest;De cuantas formas distintas pueden quedar los tres lugares?';
      pistas = ['Importa el orden (no es lo mismo ganar el 1ro que el 3ro): son permutaciones.', 'Para el 1er lugar hay ' + n + ' opciones, para el 2do ' + (n - 1) + '...'];
      sol = [n + ' &times; ' + (n - 1) + ' &times; ' + (n - 2) + ' = <b>' + v + '</b>'];
    } else {
      var m = r.entero(5, 10), cm = m * (m - 1) * (m - 2) / 6;
      v = cm;
      err = [m * (m - 1) * (m - 2), m * 3, m * (m - 1) / 2];
      enun = 'De ' + m + ' amigos se van a escoger 3 para ir al cine. &iquest;Cuantos grupos distintos se pueden formar?';
      pistas = ['Aqui NO importa el orden: el grupo Ana-Luis-Sofia es el mismo que Sofia-Ana-Luis.', 'Son combinaciones: C(' + m + ', 3) = ' + m + ' &times; ' + (m - 1) + ' &times; ' + (m - 2) + ' / (3 &times; 2 &times; 1).'];
      sol = ['C(' + m + ', 3) = ' + (m * (m - 1) * (m - 2)) + ' / 6 = <b>' + v + '</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err), pistas, sol);
  };

  casos.complemento = function (r) {
    var n = r.elige([2, 3]);
    var tiros = n === 2 ? 4 : 8;
    return P.ejercicio(
      'Se lanza una moneda ' + n + ' veces. &iquest;Cual es la probabilidad de que salga AL MENOS un sol?',
      P.opciones(r, fr(tiros - 1, tiros), [fr(1, tiros), fr(1, 2), fr(n, n + 1), fr(tiros - 2, tiros), fr(1, n)]),
      ['"Al menos uno" es mas facil por el complemento: 1 &minus; P(ningun sol).',
        'Ningun sol significa aguila en los ' + n + ' tiros: (1/2)' + F.sup(n) + ' = 1/' + tiros + '.'],
      ['P(ningun sol) = (1/2)' + F.sup(n) + ' = ' + F.frac(1, tiros),
        'P(al menos un sol) = 1 &minus; ' + F.frac(1, tiros) + ' = <b>' + fr(tiros - 1, tiros) + '</b>']);
  };

  EJ.tema({
    id: 'prepa-estadistica',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Estadistica y probabilidad',
    descripcion: 'Media, mediana y moda, lectura de tablas, probabilidad y conteo.',
    etiquetas: ['promedio', 'media', 'mediana', 'moda', 'probabilidad', 'combinaciones'],
    formulario: 'Media = suma / numero de datos &nbsp;&middot;&nbsp; Mediana: el de en medio, ya ordenados &nbsp;&middot;&nbsp; Moda: el que mas se repite<br>' +
      'P(A) = favorables / totales &nbsp;&middot;&nbsp; P(no A) = 1 &minus; P(A)<br>' +
      'Importa el orden: n(n &minus; 1)(n &minus; 2)... &nbsp;&middot;&nbsp; No importa: divide entre k!',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['media', 'Promedio'],
          ['medianaModa', 'Mediana y moda'],
          ['probSimple', 'Probabilidad simple']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['promedioFaltante', 'Calificacion que falta'],
          ['dosDados', 'Dos dados'],
          ['graficaTabla', 'Lectura de tablas']
        ]);
      } else {
        t = r.subtema([
          ['sinReemplazo', 'Extracciones sin reemplazo'],
          ['conteo', 'Tecnicas de conteo'],
          ['complemento', 'Al menos uno']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
