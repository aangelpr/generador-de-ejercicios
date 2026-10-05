/* Modo prepa - Matematicas: geometria analitica
   (los reactivos 19 a 25 de la version de practica) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  function par(x, y) { return '(' + F.n(x) + ', ' + F.n(y) + ')'; }

  var casos = {};

  /* 19. Coordenadas polares */
  casos.polares = function (r) {
    var a = r.entero(2, 9);
    var tipo = r.entero(0, 1), x, y, rr, th, rTxt;
    if (tipo === 0) {
      var eje = r.entero(0, 3);
      x = [a, 0, -a, 0][eje]; y = [0, a, 0, -a][eje];
      rr = a; th = [0, 90, 180, 270][eje]; rTxt = String(a);
    } else {
      var cuad = r.entero(0, 3);
      x = [a, -a, -a, a][cuad]; y = [a, a, -a, -a][cuad];
      th = [45, 135, 225, 315][cuad]; rTxt = a + '&radic;2';
    }
    function pol(rt, t) { return '(' + rt + ', ' + t + '&deg;)'; }
    var bien = pol(rTxt, th);
    var malas = [pol('&minus;' + rTxt, th), pol(rTxt, (th + 90) % 360), pol('&minus;' + rTxt, (th + 90) % 360), pol(rTxt, (th + 180) % 360)];
    return P.ejercicio(
      'Encuentre las coordenadas polares del punto ' + par(x, y) + '.' +
        P.considere('r' + F.sup(2) + ' = x' + F.sup(2) + ' + y' + F.sup(2) + ' &nbsp;y&nbsp; &theta; = arctan(y/x), sumando 180&deg; si x &lt; 0.'),
      P.opciones(r, bien, malas),
      ['El radio r es una distancia: siempre es positivo.',
        'Ubica el punto en el plano: el cuadrante (o el eje) te dice el angulo.'],
      ['r = &radic;(' + (x * x) + ' + ' + (y * y) + ') = ' + rTxt, '&theta; = ' + th + '&deg;', 'Polares: <b>' + bien + '</b>']);
  };

  /* 20. Punto medio */
  casos.puntoMedio = function (r) {
    var mx = r.enteroNoCero(-6, 6), my = r.enteroNoCero(-6, 6), dx = r.entero(1, 6), dy = r.enteroNoCero(-6, 6);
    var x1 = mx - dx, y1 = my - dy, x2 = mx + dx, y2 = my + dy;
    var bien = par(mx, my);
    var malas = [par(-mx, my), par(mx, -my), par(-mx, -my), par(dx, dy), par(x2 - x1, y2 - y1)];
    return P.ejercicio(
      '&iquest;Cu&aacute;l es el punto medio del segmento de recta comprendido entre los puntos ' + par(x1, y1) + ' y ' + par(x2, y2) + '?',
      P.opciones(r, bien, malas),
      ['Punto medio = ((x1 + x2)/2, (y1 + y2)/2): se SUMAN, no se restan.', 'Cuida los signos al sumar negativos.'],
      ['x = (' + x1 + ' + ' + P.np(x2) + ')/2 = ' + mx, 'y = (' + y1 + ' + ' + P.np(y2) + ')/2 = ' + my, 'Punto medio: <b>' + bien + '</b>']);
  };

  /* 21. Pendiente a partir de una ecuacion con contexto */
  casos.pendiente = function (r) {
    var m = r.entero(2, 9), c = r.entero(5, 40) * 2;
    var ctx = r.elige([
      ['Juan se dedica a la venta de bisuter&iacute;a', 'su ganancia (y)', 'la cantidad de art&iacute;culos que vende (x)'],
      ['Una papeler&iacute;a imprime volantes', 'su ganancia (y)', 'los cientos de volantes impresos (x)'],
      ['Mar&iacute;a vende aguas frescas', 'su ganancia (y)', 'los litros que vende (x)']
    ]);
    return P.ejercicio(
      ctx[0] + ' y la ecuaci&oacute;n ' + m + 'x &minus; y = ' + c + ' representa la relaci&oacute;n entre ' + ctx[1] + ' y ' + ctx[2] +
        '. Encuentre la medida de inclinaci&oacute;n (pendiente) de la gr&aacute;fica.',
      P.opciones(r, m, [-m, -c, c / m, 1, -1], { conSigno: true }),
      ['Despeja y para dejarla como y = mx + b: la pendiente es el numero que multiplica a x.',
        'Al pasar &minus;y al otro lado cambian los signos: ' + m + 'x &minus; ' + c + ' = y.'],
      [m + 'x &minus; y = ' + c + ' &rarr; y = ' + m + 'x &minus; ' + c, 'Pendiente m = <b>' + m + '</b>']);
  };

  /* 22. Sistema de ecuaciones 2x2 */
  casos.sistema = function (r) {
    var cosas = r.elige([['paletas', 'helados', 'Paleta', 'helado'], ['tortas', 'jugos', 'Torta', 'jugo'], ['cuadernos', 'plumas', 'Cuaderno', 'pluma']]);
    var p, q, a1, b1, a2, b2, c1, c2;
    do {
      p = r.entero(16, 60) / 2; q = r.entero(16, 60) / 2;
      a1 = r.entero(2, 6); b1 = r.entero(2, 6); a2 = r.entero(2, 6); b2 = r.entero(2, 7);
      c1 = a1 * p + b1 * q; c2 = a2 * p + b2 * q;
    } while (p === q || a1 * b2 - a2 * b1 === 0 || c1 !== Math.round(c1) || c2 !== Math.round(c2));
    var quien = r.elige([['Daniela', 'Patricia'], ['Luis', 'Carlos'], ['Sof&iacute;a', 'Valeria']]);
    function op(x, y) { return cosas[2] + ', $' + x.toFixed(1) + '; ' + cosas[3] + ', $' + y.toFixed(1); }
    var bien = op(p, q);
    var malas = [op(q, p), op(p + q, Math.abs(p - q) || 1), op(c1 / (a1 + b1), c2 / (a2 + b2)), op(p * 2, q * 2)];
    return P.ejercicio(
      quien[0] + ' compr&oacute; ' + a1 + ' ' + cosas[0] + ' y ' + b1 + ' ' + cosas[1] + ', pagando $' + c1 + '. ' +
        quien[1] + ' pag&oacute; $' + c2 + ' por ' + a2 + ' ' + cosas[0] + ' y ' + b2 + ' ' + cosas[1] + '. ' +
        '&iquest;Cu&aacute;l es el precio de cada ' + cosas[2].toLowerCase() + ' y cada ' + cosas[3] + '?',
      P.opciones(r, bien, malas),
      ['Plantea: ' + a1 + 'x + ' + b1 + 'y = ' + c1 + ' y ' + a2 + 'x + ' + b2 + 'y = ' + c2 + '.',
        'Tambien puedes comprobar cada inciso: sustituye los precios en las dos compras.'],
      ['Multiplico la 1a por ' + b2 + ' y la 2a por ' + b1 + ' y resto: ' + (a1 * b2 - a2 * b1) + 'x = ' + (c1 * b2 - c2 * b1),
        'x = ' + p.toFixed(1) + ' y luego y = ' + q.toFixed(1),
        'Comprobacion: ' + a1 + '(' + p + ') + ' + b1 + '(' + q + ') = ' + c1]);
  };

  /* 23. Vertice de una parabola (punto mas alto) */
  casos.vertice = function (r) {
    var a = -r.entero(1, 5), h = r.entero(1, 6), k = r.entero(4, 30);
    var b = -2 * a * h, c = a * h * h + k;
    var ctx = r.elige(['Una pelota es lanzada hacia arriba siguiendo la trayectoria',
      'Un proyectil de juguete sigue la trayectoria', 'El chorro de una fuente sigue la curva']);
    var bien = par(h, k);
    return P.ejercicio(
      ctx + ' y = ' + P.poli([a, b, c]) + '. &iquest;Cu&aacute;l es el punto m&aacute;s alto que alcanza?' +
        P.considere('el v&eacute;rtice: x = &minus;b / 2a.'),
      P.opciones(r, bien, [par(-h, k), par(h, -k), par(-k, h), par(k, h), par(-h, -k), par(h, c), par(2 * h, k)]),
      ['El punto mas alto es el vertice. Su x es &minus;b/(2a) = &minus;' + P.np(b) + '/(2 &middot; ' + P.np(a) + ').',
        'Para la y, sustituye esa x en la ecuacion.'],
      ['x = &minus;' + P.np(b) + ' / (2 &times; ' + P.np(a) + ') = ' + h,
        'y = ' + a + '(' + h + ')' + F.sup(2) + ' + ' + b + '(' + h + ') + ' + P.np(c) + ' = ' + k,
        'Vertice: <b>' + bien + '</b>']);
  };

  /* 24. Identificar conicas (relacione) */
  casos.conicas = function (r) {
    function ec(A, C, D, E, G) {
      var t = [];
      if (A) t.push((A === 1 ? '' : A === -1 ? '-' : A) + 'x' + F.sup(2));
      if (C) t.push((C === 1 ? '' : C === -1 ? '-' : C) + 'y' + F.sup(2));
      if (D) t.push(F.term(D, 'x', 1));
      if (E) t.push(F.term(E, 'y', 1));
      if (G) t.push(String(G));
      return F.une(t).replace(/ - /g, ' &minus; ').replace(/^-/, '&minus;') + ' = 0';
    }
    function nz(a, b) { return r.enteroNoCero(a, b); }
    var k = r.entero(2, 6), A = r.entero(2, 6), C = A + r.entero(1, 4);
    var conicas = [
      { n: 'Elipse', e: ec(A, C, nz(-9, 9), nz(-9, 9), -r.entero(5, 40)) },
      { n: 'Par&aacute;bola', e: r.bool() ? ec(r.entero(1, 5), 0, nz(-9, 9), nz(-9, 9), nz(-9, 9)) : ec(0, r.entero(1, 5), nz(-9, 9), nz(-9, 9), nz(-9, 9)) },
      { n: 'Circunferencia', e: ec(k, k, nz(-9, 9), nz(-9, 9), -r.entero(5, 90)) },
      { n: 'Hip&eacute;rbola', e: ec(-A, C, nz(-9, 9), nz(-9, 9), nz(-30, 30)) }
    ];
    var der = r.baraja(conicas);
    var pares = conicas.map(function (c) { return der.indexOf(c); });
    return P.relacione(r, 'Relacione las siguientes secciones c&oacute;nicas con su ejemplo.', ['Secci&oacute;n c&oacute;nica', 'Ejemplo'],
      conicas.map(function (c) { return c.n; }), der.map(function (c) { return c.e; }), pares,
      ['Fijate solo en x' + F.sup(2) + ' y y' + F.sup(2) + ': si falta uno es parabola.',
        'Mismo coeficiente y mismo signo: circunferencia. Distinto coeficiente, mismo signo: elipse. Signos contrarios: hiperbola.'],
      []);
  };

  /* 25. Excentricidad de la elipse */
  casos.excentricidad = function (r) {
    var t = r.elige([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]);
    var esC = r.bool();
    var cc = esC ? t[1] : t[0], bb = esC ? t[0] : t[1];   /* c y b del triangulo b^2 + c^2 = a^2 */
    var mult = r.elige([1, 2]);
    var a = t[2] * mult, c = cc * mult, b = bb * mult;
    var ef = F.simplifica(c, a);
    var ctx = r.elige(['Un arquitecto est&aacute; dise&ntilde;ando &aacute;reas verdes en forma de elipse',
      'Una pista de patinaje tiene forma de elipse', 'Una mesa de juntas tiene forma de elipse']);
    var pideB = r.bool(0.35);
    var v = pideB ? b : c;
    return P.ejercicio(
      ctx + ', con una excentricidad de ' + F.frac(ef[0], ef[1]) + ' y un eje mayor de ' + (2 * a) + ' metros. ' +
        (pideB ? '&iquest;Cu&aacute;nto mide el semieje menor?' : '&iquest;Cu&aacute;nto mide la semidistancia focal?') +
        P.considere('e = c / a &nbsp;y&nbsp; a' + F.sup(2) + ' = b' + F.sup(2) + ' + c' + F.sup(2) + '.'),
      P.opciones(r, v, pideB ? [c, 2 * b, a, a - c] : [2 * c, a, b, a - c], { unidad: 'm' }),
      ['El eje mayor mide 2a, asi que a = ' + (2 * a) + '/2 = ' + a + '.',
        'De e = c/a: c = e &middot; a.' + (pideB ? ' Luego b = &radic;(a' + F.sup(2) + ' &minus; c' + F.sup(2) + ').' : '')],
      ['a = ' + a + ' m', 'c = ' + F.frac(ef[0], ef[1]) + ' &times; ' + a + ' = ' + c + ' m'].concat(pideB
        ? ['b = &radic;(' + (a * a) + ' &minus; ' + (c * c) + ') = <b>' + b + ' m</b>'] : ['Semidistancia focal: <b>' + c + ' m</b>']));
  };

  EJ.tema({
    id: 'prepa-analitica',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Geometria analitica',
    descripcion: 'Coordenadas polares, punto medio, pendiente, sistemas de ecuaciones, vertice de la parabola, conicas y excentricidad. Reactivos 19 a 25 de la guia.',
    etiquetas: ['polares', 'punto medio', 'pendiente', 'sistemas', 'parabola', 'conicas', 'elipse'],
    dificultades: ['medio'],
    formulario: 'Punto medio: ((x<sub>1</sub> + x<sub>2</sub>)/2, (y<sub>1</sub> + y<sub>2</sub>)/2) &nbsp;&middot;&nbsp; Polares: r = &radic;(x' + F.sup(2) + ' + y' + F.sup(2) + '), &theta; = arctan(y/x)<br>' +
      'Vertice: x = &minus;b/2a &nbsp;&middot;&nbsp; Elipse: e = c/a, a' + F.sup(2) + ' = b' + F.sup(2) + ' + c' + F.sup(2) + ', eje mayor = 2a',

    generar: function (dif, r) {
      var t = r.subtema([
        ['polares', 'Coordenadas polares'],
        ['puntoMedio', 'Punto medio'],
        ['pendiente', 'Pendiente'],
        ['sistema', 'Sistemas de ecuaciones'],
        ['vertice', 'Vertice de la parabola'],
        ['conicas', 'Identificar conicas'],
        ['excentricidad', 'Excentricidad de la elipse']
      ]);
      return casos[t](r);
    }
  });
})();
