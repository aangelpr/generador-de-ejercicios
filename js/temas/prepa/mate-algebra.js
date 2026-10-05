/* Modo prepa - Matematicas: numeros, algebra, sucesiones y variacion
   (los reactivos 1 a 8 de la version de practica) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var VECES = { 2: 'doble', 3: 'triple', 4: 'cu&aacute;druple', 5: 'qu&iacute;ntuple' };
  var PARTE = { 2: 'un medio', 3: 'un tercio', 4: 'un cuarto', 5: 'un quinto' };

  /* factor (x - k) bien escrito */
  function fx(k) { return k === 0 ? 'x' : '(x ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')'; }

  var casos = {};

  /* 1. Ordenar racionales */
  casos.racionales = function (r) {
    var fr = [], vals = [];
    while (fr.length < 3) {
      var d = r.elige([3, 4, 5, 6, 7, 8, 9, 10, 12]), n = r.entero(1, d - 1);
      var s = F.simplifica(n, d), v = s[0] / s[1];
      if (vals.some(function (w) { return Math.abs(w - v) < 0.02; })) continue;
      fr.push(s); vals.push(v);
    }
    var orden = [0, 1, 2].sort(function (a, b) { return vals[a] - vals[b]; });
    function txt(o) { return o.map(function (i) { return i + 1; }).join(', '); }
    var bien = txt(orden);
    var malas = [txt(orden.slice().reverse()), txt([0, 1, 2]), txt([orden[1], orden[0], orden[2]]),
      txt([orden[0], orden[2], orden[1]]), txt([2, 1, 0])];
    var lista = fr.map(function (s, i) { return (i + 1) + '. &nbsp;' + F.frac(s[0], s[1]); }).join('<br>');
    return P.ejercicio(
      'Del siguiente listado de n&uacute;meros racionales, ordene de menor a mayor.<br><div class="lista-num">' + lista + '</div>',
      P.opciones(r, bien, malas),
      ['Pasa cada fraccion a decimal (divide numerador entre denominador) o ponlas con el mismo denominador.',
        'No te fijes solo en el denominador: 1/5 es mas chico que 1/3 aunque 5 sea mas grande.'],
      fr.map(function (s, i) { return (i + 1) + '. ' + F.frac(s[0], s[1]) + ' = ' + F.n(vals[i], 3); })
        .concat(['De menor a mayor: <b>' + bien + '</b>']));
  };

  /* 2. Grado de un polinomio */
  casos.grado = function (r) {
    var terminos = [], grados = [], coefs = [];
    var g = r.entero(3, 6);
    var mixto = r.bool(0.5);
    /* termino principal */
    if (mixto) {
      var ex = r.entero(1, g - 1);
      terminos.push({ c: r.entero(2, 9), t: 'x' + (ex > 1 ? F.sup(ex) : '') + 'y' + (g - ex > 1 ? F.sup(g - ex) : '') });
    } else {
      terminos.push({ c: r.entero(2, 9), t: 'x' + F.sup(g) });
    }
    grados.push(g);
    /* otros terminos de grado menor */
    var n = r.entero(3, 5);
    for (var i = 0; i < n; i++) {
      var gx = r.entero(1, g - 1), vb = r.elige(['x', 'y']);
      terminos.push({ c: r.enteroNoCero(-12, 12), t: vb + (gx > 1 ? F.sup(gx) : '') });
      grados.push(gx);
    }
    var cte = r.entero(5, 20);
    terminos = [terminos[0]].concat(r.baraja(terminos.slice(1)));
    var txt = '';
    terminos.forEach(function (tm, k) {
      var c = tm.c;
      var abs = Math.abs(c) === 1 ? '' : Math.abs(c);
      txt += (k === 0 ? (c < 0 ? '&minus;' : '') : (c < 0 ? ' &minus; ' : ' + ')) + abs + tm.t;
    });
    txt += ' + ' + cte;
    coefs = terminos.map(function (tm) { return Math.abs(tm.c); });
    var malas = [terminos.length + 1, Math.max.apply(null, coefs), cte, g - 1, g + 1];
    return P.ejercicio(
      '&iquest;Cu&aacute;l es el grado de la siguiente expresi&oacute;n?<br><span class="expr">' + txt + '</span>',
      P.opciones(r, g, malas),
      ['El grado de un termino es la suma de los exponentes de sus variables; el del polinomio es el mayor de esos.',
        'No es el numero de terminos ni el coeficiente mas grande.' + (mixto ? ' En un termino como x' + F.sup(2) + 'y' + F.sup(3) + ' el grado es 2 + 3.' : '')],
      ['Grados de cada termino: ' + grados.join(', ') + ' (el ' + cte + ' es de grado 0)',
        'El mayor es <b>' + g + '</b>']);
  };

  /* 3. Lenguaje algebraico */
  casos.lenguaje = function (r) {
    var forma = r.entero(0, 2), enun, bien, malas;
    var k1 = r.entero(2, 5), k2 = r.entero(2, 5), q = r.entero(2, 4);
    while (k2 === k1) k2 = r.entero(2, 5);
    var fq = F.frac(1, q);
    if (forma === 0) {
      enun = 'El ' + VECES[k1] + ' producto de un n&uacute;mero es igual al ' + VECES[k2] +
        ' producto del mismo n&uacute;mero m&aacute;s ' + PARTE[q] + ' de otro n&uacute;mero.';
      bien = k1 + 'a = ' + k2 + 'a + ' + fq + 'b';
      malas = [k1 + 'a = ' + k2 + 'b + ' + fq + 'a', k1 + 'b = ' + k2 + 'a + ' + fq + 'a', k1 + 'b = ' + k2 + 'a + ' + fq + 'b',
        k1 + 'a = ' + k2 + '(a + ' + fq + 'b)'];
    } else if (forma === 1) {
      var n = r.entero(10, 60);
      enun = 'La suma de un n&uacute;mero y el ' + VECES[k1] + ' de otro n&uacute;mero es igual a ' + n + '.';
      bien = 'a + ' + k1 + 'b = ' + n;
      malas = [k1 + '(a + b) = ' + n, k1 + 'a + b = ' + n, 'a + b = ' + k1 + ' &middot; ' + n, 'a + b' + F.sup(k1) + ' = ' + n];
    } else {
      enun = 'El cuadrado de un n&uacute;mero disminuido en el ' + VECES[k2] + ' de otro n&uacute;mero es igual a ' + PARTE[q] + ' del primero.';
      bien = 'a' + F.sup(2) + ' &minus; ' + k2 + 'b = ' + fq + 'a';
      malas = ['(a &minus; ' + k2 + 'b)' + F.sup(2) + ' = ' + fq + 'a', '2a &minus; ' + k2 + 'b = ' + fq + 'a',
        'a' + F.sup(2) + ' &minus; ' + k2 + 'b = ' + fq + 'b', 'a' + F.sup(2) + ' &minus; b' + F.sup(k2) + ' = ' + fq + 'a'];
    }
    return P.ejercicio(
      'Seleccione la opci&oacute;n que represente algebraicamente el siguiente texto.<br><div class="lectura">' + enun + '</div>',
      P.opciones(r, bien, malas),
      ['Ponle nombre a cada numero: el primero es a y el otro es b.',
        'Fijate bien a cual numero le pasa cada cosa: "el mismo numero" es a otra vez; "otro numero" es b.'],
      ['Primer numero: a; otro numero: b', 'Traduccion: <b>' + bien + '</b>']);
  };

  /* 4. Progresion aritmetica: suma */
  casos.progAritmetica = function (r) {
    var n = r.entero(12, 30), a1 = r.entero(2, 10), d = r.entero(2, 8);
    var an = a1 + (n - 1) * d, S = n * (a1 + an) / 2;
    function suma(m) { return m * (2 * a1 + (m - 1) * d) / 2; }
    var ctx = r.entero(0, 2), enun, unidad = '', antes = '';
    if (ctx === 0) {
      enun = 'Hace ' + n + ' d&iacute;as, un ni&ntilde;o decidi&oacute; ahorrar $' + a1 + ' y cada d&iacute;a posterior ahorra $' + d +
        ' m&aacute;s que el anterior. Contando hoy, &iquest;cu&aacute;nto lleva ahorrado?';
      antes = '$';
    } else if (ctx === 1) {
      enun = 'Un auditorio tiene ' + n + ' filas. La primera fila tiene ' + a1 + ' butacas y cada fila tiene ' + d +
        ' butacas m&aacute;s que la anterior. &iquest;Cu&aacute;ntas butacas tiene el auditorio?';
      unidad = 'butacas';
    } else {
      enun = 'Una corredora entrena ' + n + ' d&iacute;as. El primer d&iacute;a corre ' + a1 + ' km y cada d&iacute;a corre ' + d +
        ' km m&aacute;s que el anterior. &iquest;Cu&aacute;ntos kil&oacute;metros corri&oacute; en total?';
      unidad = 'km';
    }
    var op = { unidad: unidad, fmt: antes ? function (v) { return P.pesos(v).slice(1); } : null, antes: antes };
    return P.ejercicio(enun + P.considere('a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)r &nbsp;y&nbsp; S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>) / 2.'),
      P.opciones(r, S, [suma(n - 1), suma(n - 2), n * an / 2, n * a1 + n * d], op),
      ['Primero calcula el ultimo termino: a' + '<sub>' + n + '</sub> = ' + a1 + ' + (' + n + ' &minus; 1)(' + d + ').',
        'Luego suma todo con S = n(a<sub>1</sub> + a<sub>n</sub>)/2 con n = ' + n + '.'],
      ['a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + ' &times; ' + d + ' = ' + an,
        'S<sub>' + n + '</sub> = ' + n + '(' + a1 + ' + ' + an + ') / 2 = <b>' + F.n(S) + '</b>']);
  };

  /* 5. Progresion geometrica: suma */
  casos.progGeometrica = function (r) {
    var q = r.elige([2, 3, 4]), n = q === 2 ? r.entero(8, 14) : q === 3 ? r.entero(6, 10) : r.entero(5, 8);
    var an = Math.pow(q, n - 1), S = (q * an - 1) / (q - 1);
    var ctx = r.entero(0, 1), enun;
    if (ctx === 0) {
      enun = 'Una persona enferma de gripe contagi&oacute; a ' + q + ' personas. Al d&iacute;a siguiente, cada una de &eacute;stas contagi&oacute; a otras ' + q +
        ' y as&iacute; sucesivamente. Si cada persona se aisl&oacute; al d&iacute;a siguiente de contagiar, &iquest;cu&aacute;ntas personas se contagiaron en ' + n + ' d&iacute;as?';
    } else {
      enun = 'Una cadena de mensajes empieza el primer d&iacute;a con 1 mensaje. Cada d&iacute;a, cada mensaje del d&iacute;a anterior se reenv&iacute;a a ' + q +
        ' personas nuevas. &iquest;Cu&aacute;ntos mensajes se habr&aacute;n enviado en total al terminar el d&iacute;a ' + n + '?';
    }
    return P.ejercicio(enun + P.considere('a<sub>n</sub> = r<sup>n&minus;1</sup> &nbsp;y&nbsp; S<sub>n</sub> = (r&middot;a<sub>n</sub> &minus; a<sub>1</sub>) / (r &minus; 1).'),
      P.opciones(r, S, [an, an + 1, S * (q - 1), q * an], { fmt: function (v) { return P.num(v, 0); } }),
      ['Es una progresion geometrica con a<sub>1</sub> = 1 y razon r = ' + q + '.',
        'No te pide solo lo del ultimo dia (a<sub>n</sub>): pide el TOTAL, o sea la suma S<sub>n</sub>.'],
      ['a<sub>' + n + '</sub> = ' + q + '<sup>' + (n - 1) + '</sup> = ' + P.num(an, 0),
        'S<sub>' + n + '</sub> = (' + q + ' &times; ' + P.num(an, 0) + ' &minus; 1) / ' + (q - 1) + ' = <b>' + P.num(S, 0) + '</b>']);
  };

  /* 6. Proporcionalidad inversa */
  casos.proporcionInversa = function (r) {
    var a, d, k, nd;
    do { a = r.entero(8, 40); d = r.entero(6, 30); k = r.entero(2, 15); nd = a * d / (a + k); }
    while (nd !== Math.round(nd) || nd === d);
    var ctx = r.elige([
      ['Un albergue tiene a su cuidado ' + a + ' gatos y cuenta con alimento para ' + d + ' d&iacute;as. Si el albergue adopta ' + k +
        ' gatos m&aacute;s, &iquest;para cu&aacute;ntos d&iacute;as habr&aacute; alimento suficiente?'],
      ['Un campamento de ' + a + ' scouts tiene v&iacute;veres para ' + d + ' d&iacute;as. Si llegan ' + k +
        ' scouts m&aacute;s, &iquest;para cu&aacute;ntos d&iacute;as alcanzar&aacute;n los v&iacute;veres?']
    ]);
    return P.ejercicio(ctx[0],
      P.opciones(r, nd, [d * (a + k) / a, d - k, d, Math.round(d * a / k)].map(function (x) { return Math.round(x * 10) / 10; }), { dec: 1 }),
      ['A MAS animales, MENOS dias: es proporcionalidad inversa.',
        'La comida total en "raciones-dia" no cambia: ' + a + ' &times; ' + d + ' = ' + (a * d) + '.'],
      ['Total de raciones: ' + a + ' &times; ' + d + ' = ' + (a * d),
        'Ahora son ' + (a + k) + ': ' + (a * d) + ' &divide; ' + (a + k) + ' = <b>' + nd + ' d&iacute;as</b>']);
  };

  /* 7. Variacion lineal y proporcional */
  casos.variacion = function (r) {
    var ctx = r.elige([
      { a: 'a un campesino le pagan $' + r.elige([150, 200, 250]) + ' por d&iacute;a m&aacute;s $' + r.elige([30, 40, 50]) + ' por cada caja de producto recolectado',
        b: 'Otro campesino recibe dinero s&oacute;lo por las cajas recolectadas', x: 'las cajas recolectadas', y: 'el dinero que recibe' },
      { a: 'un taxi cobra $' + r.elige([9, 13, 15]) + ' de banderazo m&aacute;s $' + r.elige([6, 8, 9]) + ' por cada kil&oacute;metro',
        b: 'Una aplicaci&oacute;n de bicicletas cobra s&oacute;lo por kil&oacute;metro recorrido', x: 'los kil&oacute;metros', y: 'el costo del viaje' },
      { a: 'un plomero cobra $' + r.elige([200, 250, 300]) + ' por la visita m&aacute;s $' + r.elige([120, 150]) + ' por hora de trabajo',
        b: 'Otro plomero cobra s&oacute;lo por hora trabajada', x: 'las horas trabajadas', y: 'el pago' }
    ]);
    var alReves = r.bool();
    var t1 = alReves ? ctx.b : 'Si ' + ctx.a;
    var t2 = alReves ? 'Si ' + ctx.a : ctx.b;
    var bien = alReves ? ['proporcional', 'lineal'] : ['lineal', 'proporcional'];
    var todas = [['lineal', 'lineal'], ['lineal', 'proporcional'], ['proporcional', 'lineal'], ['proporcional', 'proporcional']];
    var texto = t1 + ', se habla de una variaci&oacute;n ___ entre ' + ctx.x + ' y ' + ctx.y + '. ' + t2 +
      ', entonces se habla de una variaci&oacute;n ___ entre ' + ctx.x + ' y ' + ctx.y + '.';
    texto = texto.charAt(0).toUpperCase() + texto.slice(1);
    return P.complete(r, texto, bien, todas.filter(function (c) { return c.join() !== bien.join(); }),
      ['Proporcional: y = kx (si x vale 0, y vale 0 y al doble de x le toca el doble de y).',
        'Lineal: y = mx + b con una parte fija b; ya no es el doble al doble.'],
      ['Con cobro fijo + cobro por unidad: y = mx + b &rarr; lineal', 'Solo cobro por unidad: y = kx &rarr; proporcional']);
  };

  /* 8. Factorizacion de un polinomio paso a paso (completar texto) */
  casos.factorizacion = function (r) {
    var p, q, s;
    do { p = r.enteroNoCero(-4, 4); q = r.enteroNoCero(-6, 6); s = r.enteroNoCero(-6, 6); }
    while (p === q || p === s || q === s || q === -s);
    /* (x-p)(x-q)(x-s) */
    var c2 = -(p + q + s), c1 = p * q + p * s + q * s, c0 = -p * q * s;
    var cuad = P.poli([1, -(q + s), q * s]);
    var bien = [fx(p), cuad, fx(q), fx(s)];
    var malas = [
      [fx(-p), cuad, fx(q), fx(s)],
      [fx(p), cuad, fx(-q), fx(-s)],
      [fx(p), P.poli([1, q + s, q * s]), fx(-q), fx(-s)],
      [fx(-p), P.poli([1, q + s, q * s]), fx(-q), fx(-s)]
    ];
    var texto = 'Al evaluar el polinomio P(x) = ' + P.poli([1, c2, c1, c0]) + ' en x = ' + p + ' se obtiene 0, por lo que ___ es un factor. ' +
      'Al dividir P(x) entre ese factor se obtiene ___. Este &uacute;ltimo se factoriza con ___ y ___ como factores.';
    return P.complete(r, texto, bien, malas,
      ['Si P(' + p + ') = 0, el factor es (x &minus; ' + P.np(p) + '): el signo dentro del parentesis es el contrario.',
        'Para la cuadratica busca dos numeros que multiplicados den ' + (q * s) + ' y sumados den ' + (-(q + s)) + '.'],
      ['P(' + p + ') = 0 &rarr; factor ' + fx(p),
        'P(x) &divide; ' + fx(p) + ' = ' + cuad,
        cuad + ' = ' + fx(q) + fx(s)]);
  };

  EJ.tema({
    id: 'prepa-algebra',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Numeros, algebra y variacion',
    descripcion: 'Racionales, grado, lenguaje algebraico, progresiones, proporcionalidad inversa, variacion y factorizacion. Reactivos 1 a 8 de la guia.',
    etiquetas: ['racionales', 'grado', 'lenguaje algebraico', 'progresion', 'proporcionalidad', 'factorizacion'],
    dificultades: ['medio'],
    formulario: 'Aritmetica: a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)r, S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2<br>' +
      'Geometrica: a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>, S<sub>n</sub> = (r&middot;a<sub>n</sub> &minus; a<sub>1</sub>)/(r &minus; 1)<br>' +
      'Proporcional: y = kx &nbsp;&middot;&nbsp; Lineal: y = mx + b &nbsp;&middot;&nbsp; Inversa: x&middot;y = k',

    generar: function (dif, r) {
      var t = r.subtema([
        ['racionales', 'Ordenar racionales'],
        ['grado', 'Grado de un polinomio'],
        ['lenguaje', 'Lenguaje algebraico'],
        ['progAritmetica', 'Progresion aritmetica'],
        ['progGeometrica', 'Progresion geometrica'],
        ['proporcionInversa', 'Proporcionalidad inversa'],
        ['variacion', 'Variacion lineal y proporcional'],
        ['factorizacion', 'Factorizacion']
      ]);
      return casos[t](r);
    }
  });
})();
