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

  casos.muestraVariable = function (r, c) {
    var bien = ['los ' + c.n + ' alumnos', c.tema.v];
    var malas = [['los ' + c.n + ' alumnos', 'el grupo de bachillerato'], ['el grupo de bachillerato', c.tema.v],
      ['el grupo de bachillerato', 'el alumnado'], [c.tema.v, 'los ' + c.n + ' alumnos'],
      ['todos los alumnos de la preparatoria', c.tema.v], ['los ' + c.n + ' alumnos', 'la media de los datos'], ['la media de los datos', c.tema.v]];
    var e = P.complete(r, 'La muestra corresponde a ___ y ___ es la variable.', bien, malas,
      ['La muestra son los individuos a los que SI se les pregunto.', 'La variable es lo que se mide en cada uno.'], []);
    e.enunciado = c.texto + e.enunciado;
    return e;
  };

  casos.mediana = function (r, c) {
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

  casos.varianza = function (r, c) {
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

  casos.grafica = function (r, c) {
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

  casos.deterministico = function (r, c) {
    var bien = 'No, porque no se puede predecir el resultado de los partidos y del torneo';
    var malas = ['S&iacute;, porque si se repite el pr&oacute;ximo a&ntilde;o se obtendr&aacute;n los mismos resultados',
      'S&iacute;, porque no se puede predecir el resultado de los partidos y del torneo',
      'No, porque tiene s&oacute;lo un resultado posible para cada partido',
      'S&iacute;, porque siempre gana el equipo que tiene mejores jugadores',
      'No, porque el torneo dura varios d&iacute;as'];
    return P.ejercicio(c.texto + '&iquest;El evento deportivo se considera determin&iacute;stico?',
      P.opciones(r, bien, malas),
      ['Deterministico: con las mismas condiciones SIEMPRE sale lo mismo (como calcular un area).',
        'Aleatorio: hay varios resultados posibles y no sabes cual saldra.'],
      ['Un partido puede terminar de varias formas y no se sabe de antemano: es un experimento aleatorio, no deterministico.']);
  };

  casos.independientes = function (r, c) {
    var q = c.q, bien = F.fracSimp(1, q * q);
    var malas = [F.fracSimp(1, q), F.fracSimp(2, q * q), F.fracSimp(1, q * q * q), F.fracSimp(1, q + 1), F.fracSimp(2, q), F.fracSimp(1, 2 * q)];
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que dos equipos ganen su primer partido, suponiendo que jugaron en partidos diferentes?' +
      P.considere('P(A &cap; B) = P(A) &middot; P(B).'),
      P.opciones(r, bien, malas),
      ['Un equipo gana su partido con probabilidad 1/' + c.q + ' (' + c.q + ' resultados igual de probables).',
        'Como juegan en partidos distintos, los eventos son independientes: multiplica.'],
      ['P(A) = P(B) = ' + F.frac(1, c.q), 'P(A &cap; B) = ' + F.frac(1, c.q) + ' &times; ' + F.frac(1, c.q) + ' = <b>' + bien + '</b>']);
  };

  casos.binomial = function (r, c) {
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

  /* ================= otras formas de preguntar =================
     Todas reciben el contexto ya armado (c), para que las preguntas de un
     multirreactivo sigan hablando de los mismos datos. */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  function frecuencias(c) {
    var f = [];
    for (var v = 0; v <= c.tema.max; v++) f.push(c.datos.filter(function (x) { return x === v; }).length);
    return f;
  }

  /* ---------- muestra y variable ---------- */
  function mvTipoVariable(r, c) {
    var ops = ['Cuantitativa discreta', 'Cuantitativa continua', 'Cualitativa nominal', 'Cualitativa ordinal'];
    /* la variable del texto u otra que se les pudiera preguntar a los mismos alumnos */
    var vars = [[c.tema.v, 0], [c.tema.v, 0], ['su estatura en metros', 1], ['el tiempo que tardan en llegar a la escuela', 1],
      ['su color favorito', 2], ['el medio de transporte que usan', 2], ['su nivel de satisfacci&oacute;n con la escuela (bajo, medio o alto)', 3],
      ['el lugar que ocuparon en una carrera (primero, segundo, tercero...)', 3]];
    var v = r.elige(vars), otra = v[0] !== c.tema.v;
    return P.ejercicio(c.texto + (otra ? 'Si a esos alumnos tambi&eacute;n se les preguntara ' + v[0] + ', &iquest;qu&eacute; tipo de variable ser&iacute;a?'
      : '&iquest;Qu&eacute; tipo de variable es ' + v[0] + '?'),
      P.opciones(r, ops[v[1]], ops.filter(function (_, i) { return i !== v[1]; })),
      ['Cuantitativa: se mide con numeros. Cualitativa: es una cualidad (color, opinion...); si sus valores tienen orden, es ordinal.',
        'Discreta: solo toma valores enteros que se cuentan (0, 1, 2...). Continua: puede tomar cualquier valor (estatura, tiempo).'],
      ['La variable es <b>' + ops[v[1]].toLowerCase() + '</b>']);
  }

  function mvPoblacion(r, c) {
    var bien = 'Todos los alumnos de la preparatoria';
    return P.ejercicio(c.texto + 'Si con este estudio se quisieran sacar conclusiones sobre toda la escuela, &iquest;cu&aacute;l ser&iacute;a la poblaci&oacute;n?',
      P.opciones(r, bien, ['Los ' + c.n + ' alumnos encuestados', 'El grupo de bachillerato donde se pregunt&oacute;', c.tema.v.charAt(0).toUpperCase() + c.tema.v.slice(1)]),
      ['La poblacion es el conjunto COMPLETO sobre el que se quiere concluir.', 'La muestra es solo la parte a la que de verdad se le pregunto.'],
      ['Poblacion: <b>' + bien.toLowerCase() + '</b>; muestra: los ' + c.n + ' alumnos encuestados']);
  }

  function mvFrecuencia(r, c) {
    var f = frecuencias(c), vals = [];
    f.forEach(function (x, i) { if (x > 0) vals.push(i); });
    var k = r.elige(vals);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;ntos alumnos respondieron ' + k + '?',
      P.opciones(r, f[k], f.filter(function (x, i) { return i !== k; }).concat([c.n - f[k], k, f[k] + 1])),
      ['Cuenta cuantas veces aparece el ' + k + ' en el conjunto X.', 'Eso es la frecuencia absoluta del valor ' + k + '.'],
      ['El ' + k + ' aparece <b>' + f[k] + '</b> veces']);
  }

  /* ---------- medidas de tendencia central y de posicion ---------- */
  function medModa(r, c) {
    var f = frecuencias(c), max = Math.max.apply(null, f), modas = [];
    f.forEach(function (x, i) { if (x === max) modas.push(i); });
    if (modas.length > 1) return medRango(r, c);
    var moda = modas[0];
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la moda de los datos?',
      P.opciones(r, moda, [0, 1, 2, 3, 4].filter(function (v) { return v !== moda && v <= c.tema.max; }).concat([max])),
      ['La moda es el dato que MAS se repite.', 'No la confundas con cuantas veces se repite (eso es su frecuencia).'],
      ['Frecuencias: ' + f.map(function (x, i) { return i + ' &rarr; ' + x; }).join(', '), 'Moda: <b>' + moda + '</b>']);
  }

  function medRango(r, c) {
    var mx = Math.max.apply(null, c.datos), mn = Math.min.apply(null, c.datos);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es el rango (o recorrido) de los datos?',
      P.opciones(r, mx - mn, [mx, mn + 1, F.redondea(c.media, 2), mx + mn, c.n].filter(function (v) { return v !== mx - mn; })),
      ['Rango = dato mayor &minus; dato menor.', 'No es el numero de datos ni la media.'],
      ['Mayor: ' + mx + ', menor: ' + mn, 'Rango: ' + mx + ' &minus; ' + mn + ' = <b>' + (mx - mn) + '</b>']);
  }

  function medPorcentaje(r, c) {
    var k = r.entero(1, Math.min(2, c.tema.max)), cuenta = c.datos.filter(function (x) { return x >= k; }).length;
    var v = F.redondea(cuenta / c.n * 100, 2);
    return P.ejercicio(c.texto + '&iquest;Qu&eacute; porcentaje de los alumnos respondi&oacute; ' + k + ' o m&aacute;s?',
      P.opciones(r, v, [F.redondea((c.n - cuenta) / c.n * 100, 2), cuenta, F.redondea(c.datos.filter(function (x) { return x > k; }).length / c.n * 100, 2), F.redondea(cuenta / 100 * c.n, 2)],
        { dec: 2, fmt: function (x) { return F.n(x, 2) + '%'; } }),
      ['Cuenta los datos que valen ' + k + ' o mas ("o mas" incluye al ' + k + ').', 'Divide entre el total de alumnos y multiplica por 100.'],
      [cuenta + ' de ' + c.n + ' alumnos', cuenta + ' / ' + c.n + ' &times; 100 = <b>' + F.n(v, 2) + '%</b>']);
  }

  function medNuevaMedia(r, c) {
    var nuevo = r.entero(0, c.tema.max + 2), sum = c.media * c.n;
    var v = F.redondea((sum + nuevo) / (c.n + 1), 2);
    return P.ejercicio(c.texto + 'Si se encuesta a un alumno m&aacute;s que responde ' + nuevo + ', &iquest;cu&aacute;l es la nueva media del grupo? (Redondee a dos decimales.)',
      P.opciones(r, v, [F.redondea((c.media + nuevo) / 2, 2), F.redondea((sum + nuevo) / c.n, 2), F.redondea(c.media, 2), F.redondea(sum / (c.n + 1), 2)], { dec: 2 }),
      ['Primero recupera la suma de los datos: media &times; n = ' + F.n(c.media, 2) + ' &times; ' + c.n + '.', 'Suma el dato nuevo y divide entre ' + (c.n + 1) + ' (ahora hay un dato mas).'],
      ['Suma: ' + F.n(sum, 2) + ' + ' + nuevo + ' = ' + F.n(sum + nuevo, 2), 'Media: ' + F.n(sum + nuevo, 2) + ' / ' + (c.n + 1) + ' = <b>' + F.n(v, 2) + '</b>']);
  }

  /* ---------- dispersion ---------- */
  function sumaCuadrados(c) { return suma(c.datos.map(function (x) { return (x - c.media) * (x - c.media); })); }

  function varDesviacion(r, c) {
    var sc = sumaCuadrados(c), S = Math.sqrt(sc / (c.n - 1)), f4 = function (v) { return v.toFixed(4); };
    return P.ejercicio(c.texto + 'Calcule la desviaci&oacute;n est&aacute;ndar muestral de X.' +
      P.considere('s = &radic;(' + F.frac(1, 'n &minus; 1') + ' &sum; (x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + ').'),
      P.opciones(r, S, [sc / (c.n - 1), Math.sqrt(sc / c.n), sc / c.n, Math.sqrt(sc) / (c.n - 1)], { fmt: f4, dec: 4, enteros: false }),
      ['La desviacion estandar es la RAIZ de la varianza.', 'Primero la varianza (divide entre n &minus; 1 = ' + (c.n - 1) + ') y al final saca raiz.'],
      ['&sum;(x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + ' = ' + F.n(sc, 4), 'Varianza: ' + F.n(sc / (c.n - 1), 4), 's = &radic;' + F.n(sc / (c.n - 1), 4) + ' = <b>' + f4(S) + '</b>']);
  }

  function varPoblacional(r, c) {
    var sc = sumaCuadrados(c), V = sc / c.n, f4 = function (v) { return v.toFixed(4); };
    return P.ejercicio(c.texto + 'Si se considera que los ' + c.n + ' alumnos son toda la poblaci&oacute;n, &iquest;cu&aacute;l es la varianza poblacional?' +
      P.considere('&sigma;' + F.sup(2) + ' = ' + F.frac(1, 'n') + ' &sum; (x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + '.'),
      P.opciones(r, V, [sc / (c.n - 1), Math.sqrt(V), sc, sc / (c.n + 1)], { fmt: f4, dec: 4, enteros: false }),
      ['La varianza poblacional divide entre n (no entre n &minus; 1).', 'Resta la media a cada dato, eleva al cuadrado, suma y divide entre ' + c.n + '.'],
      ['&sum;(x<sub>i</sub> &minus; x&#772;)' + F.sup(2) + ' = ' + F.n(sc, 4), '&sigma;' + F.sup(2) + ' = ' + F.n(sc, 4) + ' / ' + c.n + ' = <b>' + f4(V) + '</b>']);
  }

  function varConcepto(r, c) {
    var bien = r.elige(['Qu&eacute; tan dispersos est&aacute;n los datos respecto a la media', 'La dispersi&oacute;n de los datos alrededor de la media',
      'Cu&aacute;nto se alejan los datos de la media, en promedio y al cuadrado']);
    var malas = ['El valor que m&aacute;s se repite', 'El valor que queda en medio de los datos ordenados', 'El promedio de los datos',
      'La suma de todos los datos', 'Cu&aacute;ntos datos hay en la muestra', 'La diferencia entre el dato mayor y el menor'];
    return P.ejercicio(c.texto + 'Al calcular la varianza de X, &iquest;qu&eacute; se est&aacute; midiendo?',
      P.opciones(r, bien, r.muestra(malas, 5)),
      ['La moda, la mediana y la media son medidas de tendencia central.', 'La varianza y la desviacion estandar son medidas de DISPERSION.'],
      ['La varianza mide <b>' + bien.toLowerCase() + '</b>']);
  }

  /* ---------- graficas y frecuencias ---------- */
  function grafCircular(r, c) {
    var f = frecuencias(c), vals = [];
    f.forEach(function (x, i) { if (x > 0) vals.push(i); });
    var k = r.elige(vals), v = F.redondea(f[k] / c.n * 360, 2);
    return P.ejercicio(c.texto + 'Si los datos se representan en una gr&aacute;fica circular (de pastel), &iquest;qu&eacute; &aacute;ngulo le corresponde al sector de los alumnos que respondieron ' + k + '?',
      P.opciones(r, v, [F.redondea(f[k] / c.n * 100, 2), f[k] * 10, F.redondea(360 / (c.tema.max + 1), 2), F.redondea(f[k] / c.n * 180, 2)], { dec: 2, fmt: function (x) { return F.n(x, 2) + '&deg;'; } }),
      ['El circulo completo (360&deg;) representa a los ' + c.n + ' alumnos.', 'Angulo = (frecuencia / total) &times; 360&deg;.'],
      ['Frecuencia del ' + k + ': ' + f[k], f[k] + ' / ' + c.n + ' &times; 360&deg; = <b>' + F.n(v, 2) + '&deg;</b>']);
  }

  function grafFrecRelativa(r, c) {
    var f = frecuencias(c), vals = [];
    f.forEach(function (x, i) { if (x > 0) vals.push(i); });
    var k = r.elige(vals), v = F.redondea(f[k] / c.n * 100, 2);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la frecuencia relativa (en porcentaje) del valor ' + k + '?',
      P.opciones(r, v, [f[k], F.redondea(f[k] / c.n, 2), F.redondea((c.n - f[k]) / c.n * 100, 2), F.redondea(k / c.n * 100, 2)], { dec: 2, fmt: function (x) { return F.n(x, 2) + '%'; } }),
      ['Frecuencia relativa = frecuencia del valor / total de datos.', 'Para pasarla a porcentaje multiplica por 100.'],
      [f[k] + ' / ' + c.n + ' = ' + F.n(f[k] / c.n, 4) + ' &rarr; <b>' + F.n(v, 2) + '%</b>']);
  }

  /* ---------- torneo: experimento aleatorio ---------- */
  function detEspacio(r, c) {
    var con = c.q === 3;
    var bien = con ? '{gana, empata, pierde}' : '{gana, pierde}';
    var malas = con ? ['{gana, pierde}', '{gana}', '{gana, empata}', '{gana, empata, pierde, se cancela}'] : ['{gana, empata, pierde}', '{gana}', '{pierde}', '{gana, pierde, empata, se cancela}'];
    return P.ejercicio(c.texto + 'Para un equipo, &iquest;cu&aacute;l es el espacio muestral del resultado de un partido?',
      P.opciones(r, bien, malas),
      ['El espacio muestral es el conjunto de TODOS los resultados posibles del experimento.', con ? 'En futbol puede haber empate.' : 'En este deporte no hay empates.'],
      ['S = <b>' + bien + '</b>']);
  }

  function detPartidos(r, c) {
    var total = c.N * (c.N - 1) / 2;
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;ntos partidos se jugar&aacute;n en total en el torneo?',
      P.opciones(r, total, [c.N * (c.N - 1), c.N - 1, c.N * c.N, c.N * (c.N + 1) / 2]),
      ['Cada pareja de equipos juega UNA vez: son combinaciones de ' + c.N + ' en 2.', 'Si cuentas ' + c.N + ' &times; ' + (c.N - 1) + ' cuentas cada partido dos veces.'],
      ['C(' + c.N + ', 2) = ' + c.N + ' &times; ' + (c.N - 1) + ' / 2 = <b>' + total + '</b>']);
  }

  function detOtros(r, c) {
    var bien = r.elige(['Calcular el &aacute;rea de la cancha conociendo su largo y su ancho', 'Calcular cu&aacute;ntos jugadores hay en total si cada equipo tiene ' + (c.q === 3 ? 11 : 6) + ' titulares']);
    var malas = ['Lanzar una moneda para decidir qui&eacute;n saca primero', 'Predecir cu&aacute;ntos puntos har&aacute; un equipo en su primer partido', 'Sacar de una urna el nombre del equipo que inaugura el torneo'];
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l de los siguientes experimentos relacionados con el torneo es determin&iacute;stico?',
      P.opciones(r, bien, malas),
      ['Deterministico: con los mismos datos siempre da el mismo resultado.', 'Aleatorio: no se puede saber el resultado antes de hacerlo.'],
      ['Es deterministico: <b>' + bien + '</b>']);
  }

  /* ---------- torneo: probabilidad ---------- */
  function indComplemento(r, c) {
    var bien = F.fracSimp(c.q - 1, c.q);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo NO gane su primer partido?',
      P.opciones(r, bien, [F.fracSimp(1, c.q), F.fracSimp(1, c.q * c.q), '0', F.fracSimp(c.q - 1, c.q * c.q), '1']),
      ['Evento complementario: P(no A) = 1 &minus; P(A).', 'Ganar tiene probabilidad ' + F.frac(1, c.q) + '.'],
      ['1 &minus; ' + F.frac(1, c.q) + ' = <b>' + bien + '</b>']);
  }

  function indTodos(r, c) {
    var n = c.N - 1, bien = F.fracSimp(1, Math.pow(c.q, n));
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo gane todos sus partidos?' + P.considere('que los partidos son independientes entre s&iacute;.'),
      P.opciones(r, bien, [F.fracSimp(n, Math.pow(c.q, n)), F.fracSimp(1, c.q * n), F.fracSimp(1, c.q), F.fracSimp(1, Math.pow(c.q, n - 1)),
        F.fracSimp(1, Math.pow(c.q, n + 1)), F.fracSimp(c.q - 1, Math.pow(c.q, n)), F.fracSimp(1, n)]),
      ['Gana el 1o Y el 2o Y ... : con eventos independientes se MULTIPLICA.', 'Son ' + n + ' partidos, cada uno con probabilidad ' + F.frac(1, c.q) + '.'],
      ['(' + F.fracTxt(1, c.q) + ')<sup>' + n + '</sup> = <b>' + bien + '</b>']);
  }

  function indNoPierde(r, c) {
    var bien = F.fracSimp((c.q - 1) * (c.q - 1), c.q * c.q);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo no pierda ninguno de sus dos primeros partidos?' + P.considere('que los partidos son independientes entre s&iacute;.'),
      P.opciones(r, bien, [F.fracSimp(c.q - 1, c.q), F.fracSimp(1, c.q * c.q), F.fracSimp(2 * (c.q - 1), c.q * c.q), F.fracSimp(c.q - 1, c.q * c.q),
        F.fracSimp(c.q * c.q - (c.q - 1) * (c.q - 1), c.q * c.q), F.fracSimp(1, c.q), '1']),
      ['No perder un partido tiene probabilidad ' + F.frac(c.q - 1, c.q) + ' (' + (c.q === 3 ? 'ganar o empatar' : 'solo ganar') + ').', 'Para dos partidos independientes, multiplica.'],
      ['(' + F.fracTxt(c.q - 1, c.q) + ')' + F.sup(2) + ' = <b>' + bien + '</b>']);
  }

  function binAlMenosUno(r, c) {
    var n = c.N - 1, v = 1 - Math.pow(1 - c.p, n), f3 = function (x) { return x.toFixed(3); };
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo gane al menos uno de sus partidos?',
      P.opciones(r, v, [Math.pow(1 - c.p, n), n * c.p > 1 ? c.p : n * c.p, 1 - Math.pow(c.p, n), Math.pow(c.p, n)], { fmt: f3, dec: 3, enteros: false }),
      ['"Al menos uno" es lo contrario de "ninguno".', 'P(al menos uno) = 1 &minus; P(no gana ninguno) = 1 &minus; (1 &minus; p)<sup>n</sup>.'],
      ['P(ninguno) = (' + F.fracTxt(c.q - 1, c.q) + ')<sup>' + n + '</sup> = ' + f3(Math.pow(1 - c.p, n)), '1 &minus; ' + f3(Math.pow(1 - c.p, n)) + ' = <b>' + f3(v) + '</b>']);
  }

  function binEsperanza(r, c) {
    var n = c.N - 1, v = F.redondea(n * c.p, 2);
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;ntos partidos se espera que gane, en promedio, un equipo?' + P.considere('que el valor esperado de una binomial es E = n &middot; p.'),
      P.opciones(r, v, [n, F.redondea(n * (1 - c.p), 2), F.redondea(c.p, 2), F.redondea(n / 2 + 1, 2)], { dec: 2 }),
      ['n es el numero de partidos que juega cada equipo: ' + n + '.', 'p es la probabilidad de ganar uno: ' + F.fracTxt(1, c.q) + '.'],
      ['E = ' + n + ' &times; ' + F.fracTxt(1, c.q) + ' = <b>' + F.n(v, 2) + '</b>']);
  }

  function binNinguno(r, c) {
    var n = c.N - 1, v = Math.pow(1 - c.p, n), f3 = function (x) { return x.toFixed(3); };
    return P.ejercicio(c.texto + '&iquest;Cu&aacute;l es la probabilidad de que un equipo no gane ninguno de sus partidos?',
      P.opciones(r, v, [1 - v, Math.pow(c.p, n), 1 - c.p, (1 - c.p) / n], { fmt: f3, dec: 3, enteros: false }),
      ['No ganar un partido: 1 &minus; p = ' + F.fracTxt(c.q - 1, c.q) + '.', 'Ninguno de ' + n + ': multiplica esa probabilidad ' + n + ' veces.'],
      ['(' + F.fracTxt(c.q - 1, c.q) + ')<sup>' + n + '</sup> = <b>' + f3(v) + '</b>']);
  }

  var ENF_DATOS = {
    muestraVariable: [casos.muestraVariable, mvTipoVariable, mvPoblacion, mvFrecuencia],
    mediana: [casos.mediana, medModa, medRango, medPorcentaje, medNuevaMedia],
    varianza: [casos.varianza, varDesviacion, varPoblacional, varConcepto],
    grafica: [casos.grafica, casos.grafica, grafCircular, grafFrecRelativa]
  };
  var ENF_TORNEO = {
    deterministico: [casos.deterministico, detEspacio, detPartidos, detOtros],
    independientes: [casos.independientes, indComplemento, indTodos, indNoPierde],
    binomial: [casos.binomial, binAlMenosUno, binEsperanza, binNinguno]
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
      /* primero el contexto (el mismo para todo el multirreactivo) y luego la forma de preguntar */
      if (ENF_DATOS[t]) return P.enfoque(r, ENF_DATOS[t], contextoDatos(r));
      return P.enfoque(r, ENF_TORNEO[t], contextoTorneo(r));
    }
  });
})();
