/* Modo prepa: razonamiento matematico (sucesiones, problemas de logica y de tiempo) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var NOMBRES = ['Ana', 'Luis', 'Sofia', 'Diego', 'Mariana', 'Jorge', 'Valeria', 'Carlos', 'Fernanda', 'Emilio'];
  var LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  var casos = {};

  /* ---------- facil ---------- */

  casos.sucesion = function (r) {
    var tipo = r.entero(0, 2), l = [], sig, regla, err, i;
    if (tipo === 0) {
      var a = r.entero(-10, 20), d = r.enteroNoCero(-9, 12);
      for (i = 0; i < 5; i++) l.push(a + i * d);
      sig = a + 5 * d;
      regla = 'Cada numero es el anterior ' + (d > 0 ? 'mas ' + d : 'menos ' + (-d)) + '.';
      err = [sig + d, sig - 1, l[4] - d, sig + 1];
    } else if (tipo === 1) {
      var b = r.entero(1, 5), q = r.elige([2, 3]);
      for (i = 0; i < 5; i++) l.push(b * Math.pow(q, i));
      sig = l[4] * q;
      regla = 'Cada numero es el anterior por ' + q + '.';
      err = [l[4] + (l[4] - l[3]), l[4] * q + q, l[4] * q * q, l[4] + q];
    } else {
      var c = r.entero(1, 6), e = r.entero(1, 3);
      /* diferencias que crecen: c, c+e, c+2e, ... */
      l.push(r.entero(1, 10));
      for (i = 1; i < 5; i++) l.push(l[i - 1] + c + (i - 1) * e);
      sig = l[4] + c + 4 * e;
      regla = 'Las diferencias van creciendo: ' + [0, 1, 2, 3].map(function (k) { return c + k * e; }).join(', ') + ', y sigue ' + (c + 4 * e) + '.';
      err = [l[4] + c + 3 * e, l[4] + c + 5 * e, sig + 1, l[4] * 2 - l[3]];
    }
    return P.ejercicio(
      '&iquest;Que numero sigue en la sucesion?<br><span class="expr">' + l.join(', ') + ', ...</span>',
      P.opciones(r, sig, err),
      ['Fijate en lo que cambia de un numero al siguiente: resta cada numero menos el anterior.',
        'Si las restas no son iguales, prueba dividir, o mira como cambian las restas.'],
      [regla, 'Sigue: <b>' + sig + '</b>']);
  };

  casos.letras = function (r) {
    var salto = r.entero(2, 4), ini = r.entero(0, 25 - 6 * salto), l = [], i;
    for (i = 0; i < 5; i++) l.push(LETRAS.charAt(ini + i * salto));
    var sig = LETRAS.charAt(ini + 5 * salto);
    var err = [LETRAS.charAt(ini + 5 * salto - 1), LETRAS.charAt(ini + 5 * salto + 1), LETRAS.charAt(ini + 4 * salto + 1), LETRAS.charAt(ini + 6 * salto)];
    return P.ejercicio(
      '&iquest;Que letra sigue?<br><span class="expr">' + l.join(', ') + ', ...</span><br><small>(alfabeto sin &Ntilde;)</small>',
      P.opciones(r, sig, err),
      ['Cuenta cuantas letras hay entre una y otra.', 'Se brinca ' + (salto - 1) + ' letra' + (salto - 1 === 1 ? '' : 's') + ' cada vez.'],
      ['Avanza ' + salto + ' lugares en el alfabeto cada vez', 'Despues de ' + l[4] + ' sigue <b>' + sig + '</b>']);
  };

  casos.reloj = function (r) {
    var h = r.entero(6, 11), m = r.elige([0, 15, 20, 30, 40, 45]);
    var dur = r.entero(70, 250);
    var totalMin = h * 60 + m + dur;
    var hf = Math.floor(totalMin / 60) % 24, mf = totalMin % 60;
    function hora(hh, mm) { return hh + ':' + (mm < 10 ? '0' : '') + mm; }
    var bien = hora(hf, mf);
    /* error tipico: tomar 130 min como 1 h 30 min */
    var malMin = h * 60 + m + Math.floor(dur / 100) * 60 + dur % 100;
    var mal = [hora(Math.floor(malMin / 60) % 24, malMin % 60), hora(hf + 1, mf), hora(hf, (mf + 10) % 60), hora(hf - 1, mf)];
    return P.ejercicio(
      'Una pelicula dura ' + dur + ' minutos y empieza a las ' + hora(h, m) + '. &iquest;A que hora termina?',
      P.opciones(r, bien, mal),
      ['Pasa los ' + dur + ' minutos a horas y minutos: una hora son 60 minutos, no 100.',
        dur + ' min = ' + Math.floor(dur / 60) + ' h ' + (dur % 60) + ' min.'],
      [dur + ' minutos = ' + Math.floor(dur / 60) + ' h ' + (dur % 60) + ' min',
        hora(h, m) + ' + ' + Math.floor(dur / 60) + ' h ' + (dur % 60) + ' min = <b>' + bien + '</b>']);
  };

  /* ---------- medio ---------- */

  casos.trabajoJuntos = function (r) {
    var pares = [[2, 3], [3, 6], [4, 12], [6, 12], [10, 15], [12, 24], [6, 3], [20, 30], [5, 20], [9, 18], [8, 24]];
    var p = r.elige(pares), a = p[0], b = p[1];
    var t = a * b / (a + b);
    var cosa = r.elige(['llenar un tinaco', 'pintar un cuarto', 'limpiar el patio']);
    var q1 = r.elige(NOMBRES), q2 = r.elige(NOMBRES.filter(function (x) { return x !== q1; }));
    return P.ejercicio(
      q1 + ' tarda ' + a + ' horas en ' + cosa + ' y ' + q2 + ' tarda ' + b + ' horas. Si trabajan juntos, &iquest;cuanto tardan?',
      P.opciones(r, t, [(a + b) / 2, a + b, Math.abs(a - b), Math.min(a, b) / 2], { unidad: 'horas', dec: 2 }),
      ['No se promedian los tiempos. Piensa en cuanto avanza cada uno en UNA hora.',
        'En una hora: ' + q1 + ' hace ' + F.frac(1, a) + ' del trabajo y ' + q2 + ' ' + F.frac(1, b) + '.'],
      ['Juntos en una hora: ' + F.frac(1, a) + ' + ' + F.frac(1, b) + ' = ' + F.fracSimp(a + b, a * b) + ' del trabajo',
        'Tiempo = 1 &divide; ' + F.fracSimp(a + b, a * b) + ' = <b>' + F.n(t, 2) + ' horas</b>']);
  };

  casos.encuentro = function (r) {
    var v1, v2, d, t;
    do {
      v1 = r.entero(4, 12) * 10; v2 = r.entero(4, 12) * 10; t = r.elige([1.5, 2, 2.5, 3, 4]);
      d = (v1 + v2) * t;
    } while (d > 900);
    var c1 = r.elige(['Monterrey', 'Guadalajara', 'Puebla', 'Queretaro']);
    var c2 = r.elige(['Leon', 'Toluca', 'Morelia', 'San Luis Potosi']);
    return P.ejercicio(
      'Dos autobuses salen al mismo tiempo, uno de ' + c1 + ' y otro de ' + c2 + ', uno hacia el otro por la misma carretera. ' +
        'Las ciudades estan a ' + d + ' km, uno va a ' + v1 + ' km/h y el otro a ' + v2 + ' km/h. &iquest;En cuanto tiempo se encuentran?',
      P.opciones(r, t, [d / Math.abs(v1 - v2 || 10), d / v1, d / v2, d / ((v1 + v2) / 2) / 2], { unidad: 'horas', dec: 2, enteros: false }),
      ['Como van uno hacia el otro, la distancia entre ellos se cierra a ' + v1 + ' + ' + v2 + ' km cada hora.',
        'Tiempo = distancia / velocidad con que se acercan.'],
      ['Se acercan a ' + v1 + ' + ' + v2 + ' = ' + (v1 + v2) + ' km/h',
        't = ' + d + ' / ' + (v1 + v2) + ' = <b>' + F.n(t, 2) + ' horas</b>']);
  };

  casos.edades = function (r) {
    var hijo = r.entero(4, 14), dif = r.entero(20, 34), papa = hijo + dif;
    /* en cuantos anos el papa tendra el doble (dif >= 20 > hijo, asi que sale positivo) */
    var n = dif - hijo;
    var quien = r.elige(NOMBRES);
    return P.ejercicio(
      quien + ' tiene ' + hijo + ' anos y su papa ' + papa + '. &iquest;Dentro de cuantos anos el papa tendra exactamente el doble de la edad de ' + quien + '?',
      P.opciones(r, n, [dif, n / 2, 2 * hijo, hijo], { dec: 1, unidad: 'anos' }),
      ['Dentro de x anos los dos tendran x anos mas: ' + (papa) + ' + x = 2(' + hijo + ' + x).',
        'La diferencia de edades (' + dif + ') nunca cambia. Cuando el papa tenga el doble, ' + quien + ' tendra justo esa diferencia.'],
      [papa + ' + x = 2(' + hijo + ' + x)',
        papa + ' + x = ' + (2 * hijo) + ' + 2x',
        'x = ' + papa + ' &minus; ' + (2 * hijo) + ' = <b>' + n + ' anos</b>',
        'Comprobacion: ' + quien + ' tendra ' + (hijo + n) + ' y su papa ' + (papa + n)]);
  };

  /* ---------- dificil ---------- */

  casos.sucesionTermino = function (r) {
    var a = r.entero(-5, 12), d = r.enteroNoCero(2, 9), n = r.entero(20, 60);
    var l = [a, a + d, a + 2 * d, a + 3 * d];
    var v = a + (n - 1) * d;
    return P.ejercicio(
      '&iquest;Cual es el termino numero ' + n + ' de la sucesion <span class="expr">' + l.join(', ') + ', ...</span>?',
      P.opciones(r, v, [a + n * d, n * d, v + a, a + (n - 2) * d]),
      ['Es aritmetica: va sumando ' + d + '. La formula es a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.',
        'Del primero al termino ' + n + ' hay ' + (n - 1) + ' saltos, no ' + n + '.'],
      ['a<sub>1</sub> = ' + a + ', d = ' + d,
        'a<sub>' + n + '</sub> = ' + a + ' + (' + n + ' &minus; 1)(' + d + ') = ' + a + ' + ' + ((n - 1) * d) + ' = <b>' + v + '</b>']);
  };

  casos.mezcla = function (r) {
    var p1, p2, k1, k2, pm;
    do {
      p1 = r.entero(8, 20) * 10; p2 = r.entero(8, 30) * 10;
      k1 = r.entero(2, 12); k2 = r.entero(2, 12);
      pm = (p1 * k1 + p2 * k2) / (k1 + k2);
    } while (p1 === p2 || Math.round(pm * 100) !== pm * 100);
    return P.ejercicio(
      'Una cafeteria mezcla ' + k1 + ' kg de cafe de $' + p1 + ' el kilo con ' + k2 + ' kg de cafe de $' + p2 + ' el kilo. &iquest;A como sale el kilo de la mezcla?',
      P.opciones(r, pm, [(p1 + p2) / 2, p1 * k1 + p2 * k2, (p1 * k2 + p2 * k1) / (k1 + k2), (p1 + p2) / (k1 + k2)], { antes: '$', fmt: P.pesos, enteros: false }),
      ['No basta promediar los dos precios: hay mas kilos de uno que del otro.',
        'Saca el costo total de toda la mezcla y dividelo entre los kilos totales.'],
      ['Costo total: ' + k1 + ' &times; ' + p1 + ' + ' + k2 + ' &times; ' + p2 + ' = ' + (p1 * k1 + p2 * k2),
        'Kilos totales: ' + (k1 + k2),
        'Precio por kilo: ' + (p1 * k1 + p2 * k2) + ' / ' + (k1 + k2) + ' = <b>$' + P.pesos(pm) + '</b>']);
  };

  casos.logica = function (r) {
    var gente = r.muestra(NOMBRES, 4);
    var orden = r.baraja(gente);   /* de mas alto a mas bajo */
    /* pistas que determinan el orden: A > B, B > C, C > D dicho desordenado */
    var frases = [
      orden[0] + ' mide mas que ' + orden[1],
      orden[2] + ' mide menos que ' + orden[1],
      orden[3] + ' es quien mide menos de los cuatro'
    ];
    frases = r.baraja(frases);
    var preg = r.entero(0, 1);
    var bien = preg === 0 ? orden[1] : orden[2];
    var mal = gente.filter(function (x) { return x !== bien; });
    return P.ejercicio(
      'Cuatro amigos se comparan por estatura:<br>&bull; ' + frases.join('<br>&bull; ') + '.<br>' +
        '&iquest;Quien es el ' + (preg === 0 ? 'segundo mas alto' : 'tercero mas alto') + '?',
      P.opciones(r, bien, mal),
      ['Acomodalos en una lista del mas alto al mas bajo.', 'Empieza por lo seguro: quien es el mas bajo.'],
      ['Del mas alto al mas bajo: ' + orden.join(' &gt; '),
        'El ' + (preg === 0 ? 'segundo' : 'tercero') + ' es <b>' + bien + '</b>']);
  };

  EJ.tema({
    id: 'prepa-razonamiento',
    materia: 'prepa',
    grupo: 'Razonamiento',
    nombre: 'Razonamiento matematico',
    descripcion: 'Sucesiones de numeros y letras, tiempo, trabajo en equipo, encuentros, edades, mezclas y logica.',
    etiquetas: ['sucesiones', 'series', 'logica', 'edades', 'trabajo', 'reloj'],
    formulario: 'Sucesion aritmetica: a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d<br>' +
      'Trabajo juntos: 1/t = 1/a + 1/b &nbsp;&middot;&nbsp; Encuentro: t = d / (v<sub>1</sub> + v<sub>2</sub>)<br>' +
      'Mezclas: precio = costo total / cantidad total',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['sucesion', 'Sucesiones numericas'],
          ['letras', 'Sucesiones de letras'],
          ['reloj', 'Problemas de tiempo']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['trabajoJuntos', 'Trabajo en equipo'],
          ['encuentro', 'Moviles que se encuentran'],
          ['edades', 'Problemas de edades']
        ]);
      } else {
        t = r.subtema([
          ['sucesionTermino', 'Termino n de una sucesion'],
          ['mezcla', 'Mezclas'],
          ['logica', 'Ordenamiento logico']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
