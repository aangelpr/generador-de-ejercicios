/* Modo prepa - Matematicas: estadistica y probabilidad
   (los reactivos 34 a 40 de la version de practica, que son dos multirreactivos:
   un texto con datos y varias preguntas sobre el mismo texto)

   Cada pregunta del multirreactivo es un subtema. Todas arman primero el mismo
   contexto con el generador aleatorio, asi que con la misma semilla salen
   exactamente los mismos datos: el simulacro aprovecha eso para que las
   preguntas 34 a 37 (y 38 a 40) hablen del mismo grupo y del mismo torneo. */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  function suma(l) { return l.reduce(function (a, b) { return a + b; }, 0); }

  /* ---------- multirreactivo 1: datos de un grupo ---------- */
  function contextoDatos(r) {
    var tema = r.elige([
      { q: 'cu&aacute;ntos transportes usan para llegar a la escuela', v: 'la cantidad de transportes', max: 3 },
      { q: 'cu&aacute;ntos hermanos tienen', v: 'el n&uacute;mero de hermanos', max: 4 },
      { q: 'cu&aacute;ntos libros leyeron en las vacaciones', v: 'la cantidad de libros le&iacute;dos', max: 4 }
    ]);
    var n, datos, media;
    do {
      n = r.elige([10, 12, 15, 16, 20]);
      datos = [];
      for (var i = 0; i < n; i++) {
        /* mas peso a los valores chicos, como en la realidad */
        datos.push(Math.min(tema.max, Math.floor(Math.pow(r.real(0, 1), 1.6) * (tema.max + 1))));
      }
      media = suma(datos) / n;
      var frec = [];
      for (var v = 0; v <= tema.max; v++) frec.push(datos.filter(function (x) { return x === v; }).length);
      /* frecuencias todas iguales harian que todas las graficas se vieran igual */
    } while (Math.abs(media * 100 - Math.round(media * 100)) > 1e-9 || new Set(datos).size < 3 || new Set(frec).size < 2);
    var texto = 'En un grupo de bachillerato se pregunt&oacute; a ' + n + ' alumnos ' + tema.q + '. Los datos obtenidos se concentran en el conjunto<br>' +
      '<span class="expr">X = {' + datos.join(', ') + '}</span>,<br>donde la media de los datos es x&#772; = ' + F.n(media, 2) + '.';
    return { tema: tema, n: n, datos: datos, media: media, texto: P.lectura(texto) };
  }

  function mediana(l) {
    var o = l.slice().sort(function (a, b) { return a - b; }), m = o.length / 2;
    return o.length % 2 ? o[Math.floor(m)] : (o[m - 1] + o[m]) / 2;
  }

  function barras(frec, max) {
    var w = 130, h = 90, n = frec.length, ancho = (w - 20) / n;
    var top = Math.max.apply(null, frec) || 1;
    var s = '<path d="M14 72 H' + (w - 4) + ' M14 72 V6" stroke-width="1.5"/>';
    frec.forEach(function (f, i) {
      var alto = 62 * f / top, x = 18 + i * ancho;
      s += '<rect x="' + x + '" y="' + (72 - alto) + '" width="' + (ancho - 6) + '" height="' + alto + '" fill="currentColor" fill-opacity="0.35"/>';
      s += F.txtSvg(x + ancho / 2 - 7, 86, String(i));
    });
    return '<span class="mini-graf">' + F.svg(w, h, s) + '</span>';
  }

  var casos = {};

  casos.muestraVariable = function (r) {
    var c = contextoDatos(r);
    var bien = ['los ' + c.n + ' alumnos', c.tema.v];
    var malas = [['los ' + c.n + ' alumnos', 'el grupo de bachillerato'], ['el grupo de bachillerato', c.tema.v],
      ['el grupo de bachillerato', 'el alumnado'], [c.tema.v, 'los ' + c.n + ' alumnos']];
    var e = P.complete(r, 'La muestra corresponde a ___ y ___ es la variable.', bien, malas,
      ['La muestra son los individuos a los que SI se les pregunto.', 'La variable es lo que se mide en cada uno.'], []);
    e.enunciado = c.texto + e.enunciado;
    return e;
  };

  casos.mediana = function (r) {
    var c = contextoDatos(r);
    var med = mediana(c.datos), orden = c.datos.slice().sort(function (a, b) { return a - b; });
    var e = P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la mediana de los datos del grupo?',
      P.opciones(r, med, [0, 1, 2, 3, 4, c.media, c.datos[Math.floor(c.n / 2)]].filter(function (x) { return x !== med; }).slice(0, 5), { dec: 2 }),
      ['Primero ORDENA los datos de menor a mayor.', c.n % 2
        ? 'Con ' + c.n + ' datos, la mediana es el que queda en el lugar ' + ((c.n + 1) / 2) + '.'
        : 'Con ' + c.n + ' datos, la mediana es el promedio de los lugares ' + (c.n / 2) + ' y ' + (c.n / 2 + 1) + '.'],
      ['Ordenados: ' + orden.join(', '), c.n % 2
        ? 'Lugar ' + ((c.n + 1) / 2) + ': ' + orden[(c.n - 1) / 2]
        : 'Lugares ' + (c.n / 2) + ' y ' + (c.n / 2 + 1) + ': ' + orden[c.n / 2 - 1] + ' y ' + orden[c.n / 2],
        'Mediana = <b>' + F.n(med, 2) + '</b>']);
    return e;
  };

  casos.varianza = function (r) {
    var c = contextoDatos(r);
    var sc = suma(c.datos.map(function (x) { return (x - c.media) * (x - c.media); }));
    var S = sc / (c.n - 1);
    var f5 = function (v) { return v.toFixed(5); };
    return P.ejercicio(c.texto + 'Calcule la varianza de X.' +
      P.considere('S = ' + F.frac(1, 'n &minus; 1') + ' &sum; (x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + '.'),
      P.opciones(r, S, [sc / c.n, Math.sqrt(S), sc / (c.n + 1), sc / (c.n - 2)], { fmt: f5, dec: 5, enteros: false }),
      ['Resta la media a cada dato, eleva al cuadrado y suma todo.', 'Divide entre n &minus; 1 = ' + (c.n - 1) + ', no entre ' + c.n + '.'],
      ['&sum;(x<sub>i</sub> &minus; ' + F.n(c.media, 2) + ')' + F.sup(2) + ' = ' + F.n(sc, 4),
        'S = ' + F.n(sc, 4) + ' / ' + (c.n - 1) + ' = <b>' + f5(S) + '</b>']);
  };

  casos.grafica = function (r) {
    var c = contextoDatos(r);
    var frec = [];
    for (var v = 0; v <= c.tema.max; v++) frec.push(c.datos.filter(function (x) { return x === v; }).length);
    var bien = barras(frec);
    /* graficas incorrectas: frecuencias cambiadas de lugar */
    var malas = [], k = 0;
    while (malas.length < 3 && k < 40) {
      k++;
      var otra = r.baraja(frec);
      if (otra.join() === frec.join()) continue;
      var g = barras(otra);
      if (malas.indexOf(g) === -1) malas.push(g);
    }
    if (malas.length < 3) malas.push(barras(frec.slice().reverse()), barras(frec.map(function (f) { return f + 1; })));
    return P.ejercicio(c.texto + 'Identifique la gr&aacute;fica que corresponde a la distribuci&oacute;n de los datos.',
      P.opciones(r, bien, malas),
      ['Cuenta cuantas veces aparece cada valor (su frecuencia).', 'La barra mas alta debe estar en el valor que mas se repite.'],
      ['Frecuencias: ' + frec.map(function (f, i) { return i + ' &rarr; ' + f; }).join(', ')]);
  };

  /* ---------- multirreactivo 2: un torneo ---------- */
  function contextoTorneo(r) {
    var N = r.entero(4, 6);
    var deporte = r.elige([
      { n: 'futbol', empates: true }, { n: 'b&aacute;squetbol', empates: false }, { n: 'voleibol', empates: false }
    ]);
    var anios = r.elige([25, 40, 50, 60]);
    var texto = 'Una preparatoria cumpli&oacute; ' + anios + ' a&ntilde;os y para celebrarlo organiz&oacute; un torneo de ' + deporte.n +
      ' en formato de liga, es decir, todos los equipos juegan contra todos. Se formaron ' + N + ' equipos, por lo que cada uno jugar&aacute; ' + (N - 1) +
      ' partidos. ' + (deporte.empates ? 'En cada partido un equipo puede ganar, empatar o perder, y se supone que los tres resultados son igual de probables.'
        : 'En este deporte no hay empates, y se supone que cada equipo tiene la misma probabilidad de ganar o perder.') +
      ' El ganador del torneo ser&aacute; el que haga m&aacute;s puntos.';
    return { N: N, p: deporte.empates ? 1 / 3 : 1 / 2, q: deporte.empates ? 3 : 2, texto: P.lectura(texto) };
  }

  function comb(n, k) { var x = 1; for (var i = 1; i <= k; i++) x = x * (n - k + i) / i; return Math.round(x); }

  casos.deterministico = function (r) {
    var c = contextoTorneo(r);
    var bien = 'No, porque no se puede predecir el resultado de los partidos y del torneo';
    var malas = ['S&iacute;, porque si se repite el pr&oacute;ximo a&ntilde;o se obtendr&aacute;n los mismos resultados',
      'S&iacute;, porque no se puede predecir el resultado de los partidos y del torneo',
      'No, porque tiene s&oacute;lo un resultado posible para cada partido'];
    return P.ejercicio(c.texto + '&iquest;El evento deportivo se considera determin&iacute;stico?',
      P.opciones(r, bien, malas),
      ['Deterministico: con las mismas condiciones SIEMPRE sale lo mismo (como calcular un area).',
        'Aleatorio: hay varios resultados posibles y no sabes cual saldra.'],
      ['Un partido puede terminar de varias formas y no se sabe de antemano: es un experimento aleatorio, no deterministico.']);
  };

  casos.independientes = function (r) {
    var c = contextoTorneo(r);
    var q = c.q, bien = F.fracSimp(1, q * q);
    var malas = [F.fracSimp(1, q), F.fracSimp(2, q * q), F.fracSimp(1, q * q * q), F.fracSimp(1, q + 1), F.fracSimp(2, q), F.fracSimp(1, 2 * q)];
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que dos equipos ganen su primer partido, suponiendo que jugaron en partidos diferentes?' +
      P.considere('P(A &cap; B) = P(A) &middot; P(B).'),
      P.opciones(r, bien, malas),
      ['Un equipo gana su partido con probabilidad 1/' + c.q + ' (' + c.q + ' resultados igual de probables).',
        'Como juegan en partidos distintos, los eventos son independientes: multiplica.'],
      ['P(A) = P(B) = ' + F.frac(1, c.q), 'P(A &cap; B) = ' + F.frac(1, c.q) + ' &times; ' + F.frac(1, c.q) + ' = <b>' + bien + '</b>']);
  };

  casos.binomial = function (r) {
    var c = contextoTorneo(r);
    var n = c.N - 1, k = r.entero(1, Math.min(3, n - 1)), p = c.p;
    var v = comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    var f3 = function (x) { return x.toFixed(3); };
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo gane exactamente ' + (k === 1 ? 'uno' : k === 2 ? 'dos' : 'tres') + ' de sus partidos?' +
      P.considere('P(X = k; n, p) = ' + F.frac('n!', 'k!&middot;(n &minus; k)!') + ' &middot; p<sup>k</sup> &middot; (1 &minus; p)<sup>n&minus;k</sup>.'),
      P.opciones(r, v, [Math.pow(p, k) * Math.pow(1 - p, n - k), Math.pow(p, k), comb(n, k) * Math.pow(p, k), Math.pow(p, n)], { fmt: f3, dec: 3, enteros: false }),
      ['n = ' + n + ' partidos, k = ' + k + ' victorias, p = ' + F.fracSimp(1, c.q) + '.',
        'No olvides el numero de formas, C(' + n + ', ' + k + ') = ' + comb(n, k) + '.'],
      ['C(' + n + ', ' + k + ') = ' + comb(n, k),
        'P = ' + comb(n, k) + ' &times; (' + F.fracTxt(1, c.q) + ')<sup>' + k + '</sup> &times; (' + F.fracTxt(c.q - 1, c.q) + ')<sup>' + (n - k) + '</sup> = <b>' + f3(v) + '</b>']);
  };

  var SUB_ESTADISTICA = [
    ['muestraVariable', 'Muestra y variable', 'facil'],
    ['mediana', 'Mediana', 'facil'],
    ['varianza', 'Varianza', 'dificil'],
    ['grafica', 'Grafica de la distribucion', 'medio'],
    ['deterministico', 'Deterministico o aleatorio', 'facil'],
    ['independientes', 'Eventos independientes', 'medio'],
    ['binomial', 'Distribucion binomial', 'dificil']
  ];

  EJ.tema({
    id: 'prepa-estadistica',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Estadistica y probabilidad',
    descripcion: 'Multirreactivos: muestra y variable, mediana, varianza y graficas de un grupo; torneo con probabilidad, eventos independientes y binomial. Reactivos 34 a 40 de la guia.',
    etiquetas: ['muestra', 'variable', 'mediana', 'varianza', 'grafica', 'probabilidad', 'binomial'],
    dificultades: P.registrarSubtemas('prepa-estadistica', SUB_ESTADISTICA),
    formulario: 'Media: x&#772; = &sum;x<sub>i</sub>/n &nbsp;&middot;&nbsp; Varianza muestral: S = &sum;(x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + '/(n &minus; 1)<br>' +
      'Independientes: P(A &cap; B) = P(A)P(B) &nbsp;&middot;&nbsp; Binomial: C(n, k) p<sup>k</sup>(1 &minus; p)<sup>n&minus;k</sup>',
    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-estadistica', SUB_ESTADISTICA);
      return casos[t](r);
    }
  });
})();
