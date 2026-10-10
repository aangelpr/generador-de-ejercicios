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

  /* ================= otras formas de preguntar ================= */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  function pm(x, y) { return '(' + m(x) + ', ' + m(y) + ')'; }
  function fr(a, b) {
    var s = F.simplifica(a, b);
    if (s[1] === 1) return m(s[0]);
    return (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
  }
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25], [9, 12, 15]];

  /* ---------- 19. coordenadas polares ---------- */
  /* r por un valor exacto de seno o coseno: 0, 1/2, raiz2/2, raiz3/2 o 1 */
  function exactoPor(rr, v) {
    var a = Math.abs(v), s = v < -1e-9 ? '&minus;' : '';
    if (a < 1e-9) return '0';
    if (Math.abs(a - 1) < 1e-9) return s + rr;
    if (Math.abs(a - 0.5) < 1e-9) return s + (rr % 2 === 0 ? String(rr / 2) : F.frac(rr, 2));
    var raiz = Math.abs(a - Math.SQRT2 / 2) < 1e-9 ? '&radic;2' : '&radic;3';
    return s + (rr % 2 === 0 ? (rr / 2 === 1 ? '' : rr / 2) + raiz : F.frac(rr + raiz, 2));
  }

  function polAcartesianas(r) {
    var rr = r.entero(2, 10), g = r.elige([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]);
    var t = g * Math.PI / 180, c = Math.cos(t), s = Math.sin(t);
    function pt(x, y) { return '(' + exactoPor(rr, x) + ', ' + exactoPor(rr, y) + ')'; }
    return P.ejercicio('&iquest;Cu&aacute;les son las coordenadas cartesianas del punto que en coordenadas polares es (' + rr + ', ' + g + '&deg;)?' +
      P.considere('x = r cos &theta; &nbsp;y&nbsp; y = r sen &theta;.'),
      P.opciones(r, pt(c, s), [pt(s, c), pt(-c, s), pt(c, -s), pt(-c, -s), pt(-s, -c)]),
      ['x va con el COSENO y y con el SENO.', 'Fijate en el cuadrante de ' + g + '&deg; para los signos.'],
      ['x = ' + rr + ' cos ' + g + '&deg; = ' + exactoPor(rr, c), 'y = ' + rr + ' sen ' + g + '&deg; = ' + exactoPor(rr, s), 'Punto: <b>' + pt(c, s) + '</b>']);
  }

  function polDistancia(r) {
    var t = r.elige(TRIPLES), x = t[0] * r.signo(), y = t[1] * r.signo();
    if (r.bool()) { var tmp = x; x = y; y = tmp; }
    return P.ejercicio('&iquest;A qu&eacute; distancia del origen se encuentra el punto ' + pm(x, y) + '? (Es el valor de r en coordenadas polares.)',
      P.opciones(r, t[2], [Math.abs(x) + Math.abs(y), Math.abs(Math.abs(x) - Math.abs(y)), x * x + y * y, Math.abs(x * y) / 2]),
      ['r = &radic;(x' + F.sup(2) + ' + y' + F.sup(2) + '): es el teorema de Pitagoras.', 'Los signos no importan porque se elevan al cuadrado.'],
      ['r = &radic;(' + (x * x) + ' + ' + (y * y) + ') = &radic;' + (x * x + y * y) + ' = <b>' + t[2] + '</b>']);
  }

  function polCuadrante(r) {
    var g = r.elige([20, 50, 75, 100, 130, 160, 200, 230, 260, 290, 320, 350]), rr = r.entero(2, 9);
    var q = g < 90 ? 'Primer' : g < 180 ? 'Segundo' : g < 270 ? 'Tercer' : 'Cuarto';
    var negativo = r.bool(0.3), real = negativo ? (g + 180) % 360 : g;
    q = real < 90 ? 'Primer' : real < 180 ? 'Segundo' : real < 270 ? 'Tercer' : 'Cuarto';
    var todos = ['Primer cuadrante', 'Segundo cuadrante', 'Tercer cuadrante', 'Cuarto cuadrante'];
    return P.ejercicio('&iquest;En qu&eacute; cuadrante se ubica el punto que en coordenadas polares es (' + (negativo ? '&minus;' : '') + rr + ', ' + g + '&deg;)?',
      P.opciones(r, q + ' cuadrante', todos.filter(function (x) { return x !== q + ' cuadrante'; })),
      ['Primer cuadrante: de 0&deg; a 90&deg;; segundo: de 90&deg; a 180&deg;; tercero: de 180&deg; a 270&deg;; cuarto: de 270&deg; a 360&deg;.',
        negativo ? 'Con r negativo el punto queda del lado contrario: suma 180&deg; al angulo.' : 'El radio no cambia el cuadrante, solo el angulo.'],
      [negativo ? g + '&deg; + 180&deg; = ' + real + '&deg;' : 'El angulo es ' + g + '&deg;', 'Esta en el <b>' + q.toLowerCase() + ' cuadrante</b>']);
  }

  /* ---------- 20. punto medio y distancia ---------- */
  function pmExtremo(r) {
    var ax, ay, bx, by;
    do {
      ax = r.entero(-8, 8); ay = r.entero(-8, 8); bx = r.entero(-8, 8); by = r.entero(-8, 8);
      if ((ax + bx) % 2 !== 0) bx++;
      if ((ay + by) % 2 !== 0) by++;
    } while (ax === bx || ay === by);
    var mx = (ax + bx) / 2, my = (ay + by) / 2;
    return P.ejercicio('El punto M' + pm(mx, my) + ' es el punto medio del segmento AB. Si A = ' + pm(ax, ay) + ', &iquest;cu&aacute;les son las coordenadas de B?',
      P.opciones(r, pm(bx, by), [pm((ax + mx) / 2, (ay + my) / 2), pm(mx - ax, my - ay), pm(ax - 2 * mx, ay - 2 * my), pm(2 * ax - mx, 2 * ay - my)]),
      ['Si M es el punto medio, para llegar de A a B hay que dar el mismo salto que de A a M otra vez.', 'B = (2x<sub>M</sub> &minus; x<sub>A</sub>, 2y<sub>M</sub> &minus; y<sub>A</sub>).'],
      ['x<sub>B</sub> = 2(' + m(mx) + ') &minus; ' + P.np(ax) + ' = ' + m(bx), 'y<sub>B</sub> = 2(' + m(my) + ') &minus; ' + P.np(ay) + ' = ' + m(by), 'B = <b>' + pm(bx, by) + '</b>']);
  }

  function pmDistancia(r) {
    var t = r.elige(TRIPLES), x1 = r.entero(-6, 6), y1 = r.entero(-6, 6), sx = r.signo(), sy = r.signo();
    var dx = t[0], dy = t[1];
    if (r.bool()) { dx = t[1]; dy = t[0]; }
    var x2 = x1 + sx * dx, y2 = y1 + sy * dy;
    return P.ejercicio('&iquest;Cu&aacute;l es la distancia entre los puntos ' + pm(x1, y1) + ' y ' + pm(x2, y2) + '?' +
      P.considere('d = &radic;((x<sub>2</sub> &minus; x<sub>1</sub>)' + F.sup(2) + ' + (y<sub>2</sub> &minus; y<sub>1</sub>)' + F.sup(2) + ').'),
      P.opciones(r, t[2], [dx + dy, Math.abs(dx - dy), dx * dx + dy * dy, F.redondea(Math.sqrt(Math.pow(x1 + x2, 2) + Math.pow(y1 + y2, 2)), 2)], { dec: 2 }),
      ['Resta las x y resta las y; despues eleva al cuadrado, suma y saca raiz.', 'Cuidado con los negativos al restar.'],
      ['&Delta;x = ' + m(x2 - x1) + ', &Delta;y = ' + m(y2 - y1), 'd = &radic;(' + (dx * dx) + ' + ' + (dy * dy) + ') = <b>' + t[2] + '</b>']);
  }

  function pmCentroRadio(r) {
    var t = r.elige(TRIPLES), cx = r.entero(-6, 6), cy = r.entero(-6, 6);
    var dx = t[0], dy = t[1];
    var ax = cx - dx, ay = cy - dy, bx = cx + dx, by = cy + dy;
    function op(x, y, rr) { return 'Centro ' + pm(x, y) + ', radio ' + rr; }
    return P.ejercicio('Los puntos ' + pm(ax, ay) + ' y ' + pm(bx, by) + ' son los extremos de un di&aacute;metro de una circunferencia. &iquest;Cu&aacute;les son su centro y su radio?',
      P.opciones(r, op(cx, cy, t[2]), [op(cx, cy, 2 * t[2]), op(dx, dy, t[2]), op(bx - ax, by - ay, t[2]), op(cx, cy, dx + dy)]),
      ['El centro es el punto medio del diametro.', 'El radio es la mitad del diametro (la distancia entre los extremos).'],
      ['Centro: ((' + m(ax) + ' + ' + P.np(bx) + ')/2, (' + m(ay) + ' + ' + P.np(by) + ')/2) = ' + pm(cx, cy),
        'Diametro = &radic;(' + (4 * dx * dx) + ' + ' + (4 * dy * dy) + ') = ' + (2 * t[2]) + ', radio = <b>' + t[2] + '</b>']);
  }

  function pmDivision(r) {
    var k = r.elige([[1, 2], [2, 1], [1, 3], [3, 1], [2, 3]]), ax, ay, bx, by, px, py;
    do {
      ax = r.entero(-8, 8); ay = r.entero(-8, 8); bx = r.entero(-8, 8); by = r.entero(-8, 8);
      px = (k[1] * ax + k[0] * bx) / (k[0] + k[1]); py = (k[1] * ay + k[0] * by) / (k[0] + k[1]);
    } while (px !== Math.round(px) || py !== Math.round(py) || (ax === bx && ay === by));
    var inv = [(k[0] * ax + k[1] * bx) / (k[0] + k[1]), (k[0] * ay + k[1] * by) / (k[0] + k[1])];
    return P.ejercicio('&iquest;Cu&aacute;les son las coordenadas del punto P que divide al segmento de A' + pm(ax, ay) + ' a B' + pm(bx, by) + ' en la raz&oacute;n ' +
      F.frac('AP', 'PB') + ' = ' + F.frac(k[0], k[1]) + '?' +
      P.considere('x = ' + F.frac('x<sub>1</sub> + r x<sub>2</sub>', '1 + r') + ' &nbsp;y&nbsp; y = ' + F.frac('y<sub>1</sub> + r y<sub>2</sub>', '1 + r') + ', con r = ' + F.frac('AP', 'PB') + '.'),
      P.opciones(r, pm(px, py), [pm(F.redondea(inv[0], 2), F.redondea(inv[1], 2)), pm((ax + bx) / 2, (ay + by) / 2), pm(2 * px - ax, 2 * py - ay),
        pm(px + 1, py - 1), pm(px - 1, py + 1)]),
      ['r = ' + F.frac(k[0], k[1]) + ': P esta mas cerca de ' + (k[0] < k[1] ? 'A' : 'B') + '.', 'Sustituye en la formula con cuidado (o piensa que AB se parte en ' + (k[0] + k[1]) + ' pedazos iguales).'],
      ['x = ' + m(px) + ', y = ' + m(py), 'P = <b>' + pm(px, py) + '</b>']);
  }

  /* ---------- 21. pendiente y ecuacion de la recta ---------- */
  function rectaTxt(num, den, b) {
    var s = F.simplifica(num, den), coef;
    if (s[1] === 1) coef = s[0] === 1 ? '' : s[0] === -1 ? '&minus;' : m(s[0]);
    else coef = (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
    if (s[0] === 0) return 'y = ' + m(b);
    return 'y = ' + coef + 'x' + (b === 0 ? '' : b > 0 ? ' + ' + F.n(b) : ' &minus; ' + F.n(-b));
  }

  function penDosPuntos(r) {
    var x1, y1, x2, y2;
    do { x1 = r.entero(-7, 7); y1 = r.entero(-7, 7); x2 = r.entero(-7, 7); y2 = r.entero(-7, 7); }
    while (x1 === x2 || y1 === y2 || Math.abs(x2 - x1) === Math.abs(y2 - y1));
    var bien = fr(y2 - y1, x2 - x1);
    return P.ejercicio('&iquest;Cu&aacute;l es la pendiente de la recta que pasa por los puntos ' + pm(x1, y1) + ' y ' + pm(x2, y2) + '?' +
      P.considere('m = ' + F.frac('y<sub>2</sub> &minus; y<sub>1</sub>', 'x<sub>2</sub> &minus; x<sub>1</sub>') + '.'),
      P.opciones(r, bien, [fr(x2 - x1, y2 - y1), fr(y1 - y2, x2 - x1), fr(y2 + y1, x2 + x1 === 0 ? 1 : x2 + x1), fr(y2 - y1, x1 + x2 === 0 ? 2 : x1 + x2),
        fr(x1 - x2, y2 - y1), fr(2 * (y2 - y1), x2 - x1), fr(y2 - y1 + 1, x2 - x1)]),
      ['La pendiente es lo que SUBE entre lo que AVANZA: diferencia de y entre diferencia de x.', 'Resta en el mismo orden arriba y abajo.'],
      ['m = (' + m(y2) + ' &minus; ' + P.np(y1) + ') / (' + m(x2) + ' &minus; ' + P.np(x1) + ') = ' + F.frac(m(y2 - y1), m(x2 - x1)) + ' = <b>' + bien + '</b>']);
  }

  function penEcuacion(r) {
    var mm = r.enteroNoCero(-5, 5), x0 = r.enteroNoCero(-5, 5), y0 = r.entero(-8, 8), b = y0 - mm * x0;
    return P.ejercicio('&iquest;Cu&aacute;l es la ecuaci&oacute;n de la recta que pasa por el punto ' + pm(x0, y0) + ' y tiene pendiente ' + m(mm) + '?',
      P.opciones(r, rectaTxt(mm, 1, b), [rectaTxt(mm, 1, y0), rectaTxt(mm, 1, y0 + mm * x0), rectaTxt(x0, 1, y0), rectaTxt(-mm, 1, b)]),
      ['Usa punto-pendiente: y &minus; y<sub>1</sub> = m(x &minus; x<sub>1</sub>).', 'Despeja y: la ordenada al origen NO es la y del punto.'],
      ['y &minus; ' + P.np(y0) + ' = ' + m(mm) + '(x &minus; ' + P.np(x0) + ')', '<b>' + rectaTxt(mm, 1, b) + '</b>']);
  }

  function penAngulo(r) {
    var c = r.elige([[1, 1, 45], [-1, 1, 135], [173, 100, 60], [58, 100, 30], [-173, 100, 120], [-58, 100, 150]]);
    var mtxt = c[1] === 1 ? m(c[0]) : m(c[0] / c[1]);
    return P.ejercicio('Una recta tiene pendiente m = ' + mtxt + '. &iquest;Cu&aacute;l es su &aacute;ngulo de inclinaci&oacute;n?' +
      P.considere('m = tan &theta;, tan 30&deg; &asymp; 0.58, tan 45&deg; = 1 y tan 60&deg; &asymp; 1.73.'),
      P.opciones(r, c[2] + '&deg;', [30, 45, 60, 120, 135, 150].filter(function (g) { return g !== c[2]; }).map(function (g) { return g + '&deg;'; })),
      ['El angulo de inclinacion se mide desde el eje x positivo y su tangente es la pendiente.', 'Si la pendiente es negativa el angulo es obtuso: 180&deg; menos el angulo de la tangente positiva.'],
      ['tan &theta; = ' + mtxt + ' &rarr; &theta; = <b>' + c[2] + '&deg;</b>']);
  }

  function penInterpreta(r) {
    var c = r.elige([
      { m: r.entero(12, 40), b: r.entero(150, 400) * 2, y: 'el costo total (en pesos) de imprimir x playeras', mq: 'Lo que cuesta cada playera adicional', bq: 'El costo fijo, aunque no se imprima ninguna playera' },
      { m: r.entero(3, 9), b: r.entero(10, 60), y: 'la altura (en cm) de una planta despu&eacute;s de x semanas', mq: 'Lo que crece la planta cada semana', bq: 'La altura de la planta al inicio' },
      { m: r.entero(40, 90), b: r.entero(100, 500), y: 'la distancia (en km) a la que est&aacute; un autob&uacute;s despu&eacute;s de x horas', mq: 'La velocidad del autob&uacute;s en km por hora', bq: 'La distancia a la que estaba al empezar a contar' }
    ]);
    var pideM = r.bool();
    var malas = [pideM ? c.bq : c.mq, 'El total despu&eacute;s de ' + c.m + ' unidades de x', 'El n&uacute;mero de unidades de x que se necesitan para llegar a ' + c.b];
    return P.ejercicio('La ecuaci&oacute;n y = ' + c.m + 'x + ' + c.b + ' representa ' + c.y + '. &iquest;Qu&eacute; representa el n&uacute;mero ' + (pideM ? c.m : c.b) + '?',
      P.opciones(r, pideM ? c.mq : c.bq, malas),
      ['En y = mx + b, la pendiente m es lo que cambia y por cada unidad de x.', 'La ordenada al origen b es el valor de y cuando x = 0 (el punto de partida).'],
      ['El ' + (pideM ? c.m + ' es la pendiente' : c.b + ' es la ordenada al origen') + ': <b>' + (pideM ? c.mq : c.bq) + '</b>']);
  }

  function penGeneral(r) {
    var A, B, C;
    do { A = r.enteroNoCero(-6, 6); B = r.enteroNoCero(-6, 6); C = r.enteroNoCero(-12, 12); } while (C % B !== 0 || Math.abs(A) === Math.abs(B));
    var mT = fr(-A, B), bT = m(-C / B);
    function op(mm, bb) { return 'm = ' + mm + ', b = ' + bb; }
    var ec = (A < 0 ? '&minus;' : '') + (Math.abs(A) === 1 ? '' : Math.abs(A)) + 'x' + (B < 0 ? ' &minus; ' : ' + ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y' +
      (C === 0 ? '' : C < 0 ? ' &minus; ' + (-C) : ' + ' + C) + ' = 0';
    return P.ejercicio('&iquest;Cu&aacute;les son la pendiente (m) y la ordenada al origen (b) de la recta <span class="expr">' + ec + '</span>?',
      P.opciones(r, op(mT, bT), [op(fr(A, B), bT), op(mT, m(C / B)), op(fr(-B, A), bT), op(fr(A, B), m(C / B)), op(mT, m(-C))]),
      ['Despeja y: deja By de un lado y pasa lo demas al otro con signo contrario.', 'Al final divide todo entre ' + m(B) + '.'],
      ['y = ' + fr(-A, B) + 'x + ' + P.np(-C / B), '<b>' + op(mT, bT) + '</b>']);
  }

  /* ---------- 22. sistemas de ecuaciones ---------- */
  function sisResolver(r) {
    var x, y, a1, b1, a2, b2;
    do { x = r.enteroNoCero(-6, 8); y = r.enteroNoCero(-6, 8); a1 = r.enteroNoCero(-5, 5); b1 = r.enteroNoCero(-5, 5); a2 = r.enteroNoCero(-5, 5); b2 = r.enteroNoCero(-5, 5); }
    while (a1 * b2 - a2 * b1 === 0 || Math.abs(x) === Math.abs(y));
    function ec(a, b, c) { return (a === 1 ? '' : a === -1 ? '&minus;' : m(a)) + 'x ' + (b < 0 ? '&minus; ' : '+ ') + (Math.abs(b) === 1 ? '' : Math.abs(b)) + 'y = ' + m(c); }
    return P.ejercicio('&iquest;Cu&aacute;l es la soluci&oacute;n del sistema de ecuaciones?<br><span class="expr">' + ec(a1, b1, a1 * x + b1 * y) + '</span><br><span class="expr">' +
      ec(a2, b2, a2 * x + b2 * y) + '</span>',
      P.opciones(r, pm(x, y), [pm(y, x), pm(-x, y), pm(x, -y), pm(-x, -y), pm(x + 1, y - 1)]),
      ['Puedes resolver por suma y resta o por sustitucion.', 'Tambien sirve comprobar: el inciso correcto cumple LAS DOS ecuaciones.'],
      ['Comprobacion: ' + m(a1) + '(' + m(x) + ') + ' + P.np(b1) + '(' + m(y) + ') = ' + m(a1 * x + b1 * y) + ' y ' + m(a2) + '(' + m(x) + ') + ' + P.np(b2) + '(' + m(y) + ') = ' + m(a2 * x + b2 * y),
        'Solucion: <b>' + pm(x, y) + '</b>']);
  }

  function sisClasificar(r) {
    var a = r.enteroNoCero(-5, 5), b = r.enteroNoCero(-5, 5), c = r.entero(-10, 10), k = r.entero(2, 4), tipo = r.entero(0, 2), A2, B2, C2;
    if (tipo === 0) { A2 = a * k; B2 = b * k; C2 = c * k; }
    else if (tipo === 1) { A2 = a * k; B2 = b * k; C2 = c * k + r.enteroNoCero(-5, 5); }
    else { A2 = a + r.enteroNoCero(-3, 3); B2 = b; C2 = r.entero(-10, 10); if (A2 * b - a * B2 === 0) A2 += 1; if (A2 === 0) A2 = 7; }
    function ec(A, B, C) { return (A === 1 ? '' : A === -1 ? '&minus;' : m(A)) + 'x ' + (B < 0 ? '&minus; ' : '+ ') + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y = ' + m(C); }
    var NOM = ['Infinitas soluciones (son la misma recta)', 'Ninguna soluci&oacute;n (las rectas son paralelas)', 'Una sola soluci&oacute;n (las rectas se cortan)'];
    return P.ejercicio('&iquest;Cu&aacute;ntas soluciones tiene el siguiente sistema de ecuaciones?<br><span class="expr">' + ec(a, b, c) + '</span><br><span class="expr">' + ec(A2, B2, C2) + '</span>',
      P.opciones(r, NOM[tipo], NOM.filter(function (_, i) { return i !== tipo; }).concat(['Exactamente dos soluciones'])),
      ['Compara las ecuaciones: si una es multiplo de la otra son la misma recta.', 'Si solo los coeficientes de x y y son proporcionales (y el resultado no), son paralelas: no se cortan.'],
      [tipo === 0 ? 'La segunda ecuacion es la primera por ' + k : tipo === 1 ? 'Los coeficientes son proporcionales (por ' + k + ') pero el resultado no' : 'Las pendientes son distintas', '<b>' + NOM[tipo] + '</b>']);
  }

  function sisProblema(r) {
    var tipo = r.entero(0, 2), enun, bien, malas, sol;
    if (tipo === 0) {
      var pa = r.elige([60, 70, 80, 90]), pn = r.elige([35, 40, 45, 50]), A = r.entero(20, 90), N = r.entero(20, 90);
      enun = 'En un cine, el boleto de adulto cuesta $' + pa + ' y el de ni&ntilde;o $' + pn + '. Un domingo se vendieron ' + (A + N) + ' boletos y se juntaron $' +
        P.num(pa * A + pn * N, 0).replace(' ', ',') + '. &iquest;Cu&aacute;ntos boletos de adulto se vendieron?';
      bien = A; malas = [N, Math.round((pa * A + pn * N) / pa), Math.round((A + N) / 2), A + 10];
      sol = ['a + n = ' + (A + N) + ' y ' + pa + 'a + ' + pn + 'n = ' + (pa * A + pn * N), 'Sustituyendo n = ' + (A + N) + ' &minus; a: ' + (pa - pn) + 'a = ' + ((pa - pn) * A), 'a = <b>' + A + '</b>'];
    } else if (tipo === 1) {
      var hijo = r.entero(6, 18), dif = r.entero(20, 35), padre = hijo + dif;
      enun = 'La suma de las edades de un padre y su hijo es ' + (padre + hijo) + ' a&ntilde;os y el padre tiene ' + dif + ' a&ntilde;os m&aacute;s que el hijo. &iquest;Qu&eacute; edad tiene el hijo?';
      bien = hijo; malas = [padre, Math.round((padre + hijo) / 2), (padre + hijo) - dif, hijo + 2];
      sol = ['p + h = ' + (padre + hijo) + ' y p = h + ' + dif, '2h + ' + dif + ' = ' + (padre + hijo) + ' &rarr; h = <b>' + hijo + '</b>'];
    } else {
      var x5 = r.entero(5, 25), x10 = r.entero(5, 25);
      enun = 'En una alcanc&iacute;a hay ' + (x5 + x10) + ' monedas de $5 y de $10 que suman $' + (5 * x5 + 10 * x10) + '. &iquest;Cu&aacute;ntas monedas de $10 hay?';
      bien = x10; malas = [x5, Math.round((5 * x5 + 10 * x10) / 10), Math.round((x5 + x10) / 2), x10 + 3];
      sol = ['c + d = ' + (x5 + x10) + ' y 5c + 10d = ' + (5 * x5 + 10 * x10), 'Sustituyendo c = ' + (x5 + x10) + ' &minus; d: 5d = ' + (5 * x10), 'd = <b>' + x10 + '</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, bien, malas),
      ['Usa dos incognitas y escribe dos ecuaciones: una con las cantidades y otra con el dinero (o con la diferencia).', 'Comprueba el inciso en las dos condiciones del problema.'], sol);
  }

  /* ---------- 23. parabolas ---------- */
  function verMinimo(r) {
    var a = r.entero(1, 5), h = r.entero(5, 40), k = r.entero(100, 900);
    var b = 2 * a * h, c = a * h * h + k;
    var ctx = r.elige([['El costo de producir x piezas es', 'piezas', 'el costo m&iacute;nimo'], ['El gasto de combustible de un cami&oacute;n a x km/h es', 'km/h', 'el gasto m&iacute;nimo']]);
    function op(x, y) { return 'Con ' + x + ' ' + ctx[1] + ', ' + ctx[2] + ' es ' + y; }
    return P.ejercicio(ctx[0] + ' C(x) = ' + P.poli([a, -b, c]).replace(/ - /g, ' &minus; ') + '. &iquest;Con qu&eacute; valor de x se obtiene ' + ctx[2] + ' y cu&aacute;nto vale?' +
      P.considere('el v&eacute;rtice: x = &minus;b / 2a.'),
      P.opciones(r, op(h, k), [op(2 * h, c), op(h, c), op(b, k), op(Math.round(h / 2), a * Math.pow(Math.round(h / 2) - h, 2) + k)]),
      ['Como a es positiva la parabola abre hacia arriba: el vertice es el MINIMO.', 'x = &minus;(&minus;' + b + ') / (2 &middot; ' + a + '); luego sustituye para C(x).'],
      ['x = ' + b + ' / ' + (2 * a) + ' = ' + h, 'C(' + h + ') = ' + k, '<b>' + op(h, k) + '</b>']);
  }

  function verRaices(r) {
    var t2 = r.entero(2, 8), t1 = -r.entero(1, Math.min(4, t2 - 1)), a = 5;
    var b = -a * (t1 + t2), c = a * t1 * t2;   /* h(t) = -5(t - t1)(t - t2) */
    var h0 = -c;
    return P.ejercicio('Una piedra se lanza hacia arriba desde lo alto de un edificio. Su altura en metros es h(t) = &minus;5t' + F.sup(2) + ' + ' + (-b) + 't + ' + h0 +
      ', con t en segundos. &iquest;Despu&eacute;s de cu&aacute;nto tiempo llega al suelo?',
      P.opciones(r, t2, [-t1, (t1 + t2) / 2, t2 + 1, h0 / 5], { unidad: 's', dec: 2 }),
      ['Llega al suelo cuando h(t) = 0.', 'Divide entre &minus;5 y factoriza; de las dos soluciones solo sirve la positiva.'],
      ['&minus;5t' + F.sup(2) + ' + ' + (-b) + 't + ' + h0 + ' = 0 &rarr; t' + F.sup(2) + ' &minus; ' + (t1 + t2) + 't &minus; ' + (-t1 * t2) + ' = 0',
        '(t &minus; ' + t2 + ')(t + ' + (-t1) + ') = 0 &rarr; t = ' + t2 + ' o t = ' + t1, 'Tiempo: <b>' + t2 + ' s</b>']);
  }

  function verCanonica(r) {
    var h = r.enteroNoCero(-6, 6), k = r.entero(-9, 9);
    var b = -2 * h, c = h * h + k;
    function can(hh, kk) { return 'y = (x ' + (hh > 0 ? '&minus; ' + hh : '+ ' + (-hh)) + ')' + F.sup(2) + (kk === 0 ? '' : kk > 0 ? ' + ' + kk : ' &minus; ' + (-kk)); }
    return P.ejercicio('&iquest;Cu&aacute;l es la forma y = (x &minus; h)' + F.sup(2) + ' + k de la par&aacute;bola <span class="expr">y = ' + P.poli([1, b, c]).replace(/ - /g, ' &minus; ') + '</span>?',
      P.opciones(r, can(h, k), [can(-h, k), can(h, c), can(h, -k), can(b, k)]),
      ['Completa el cuadrado: la mitad del coeficiente de x es ' + m(b / 2) + '.', '(x ' + (h > 0 ? '&minus; ' + h : '+ ' + (-h)) + ')' + F.sup(2) + ' da x' + F.sup(2) + ' ' + (b < 0 ? '&minus; ' : '+ ') + Math.abs(b) + 'x + ' + (h * h) + '; ajusta la constante.'],
      ['x' + F.sup(2) + ' ' + (b < 0 ? '&minus; ' : '+ ') + Math.abs(b) + 'x + ' + (h * h) + ' &minus; ' + (h * h) + ' + ' + P.np(c), '<b>' + can(h, k) + '</b> (vertice ' + pm(h, k) + ')']);
  }

  function verEje(r) {
    var a = r.enteroNoCero(-4, 4), h = r.enteroNoCero(-6, 6), k = r.entero(-9, 9);
    while (Math.abs(k) === Math.abs(h)) k = r.entero(-9, 9);
    var b = -2 * a * h, c = a * h * h + k;
    var abre = a > 0 ? 'hacia arriba' : 'hacia abajo';
    function op(x, ab) { return 'Eje x = ' + m(x) + ', abre ' + ab; }
    return P.ejercicio('Para la par&aacute;bola <span class="expr">y = ' + P.poli([a, b, c]).replace(/ - /g, ' &minus; ').replace(/^-/, '&minus;') + '</span>, &iquest;cu&aacute;l es su eje de simetr&iacute;a y hacia d&oacute;nde abre?',
      P.opciones(r, op(h, abre), [op(-h, abre), op(h, a > 0 ? 'hacia abajo' : 'hacia arriba'), op(-h, a > 0 ? 'hacia abajo' : 'hacia arriba'), op(k, abre)]),
      ['El eje de simetria pasa por el vertice: x = &minus;b / 2a.', 'Si a &gt; 0 abre hacia arriba; si a &lt; 0, hacia abajo.'],
      ['x = &minus;(' + m(b) + ') / (2 &middot; ' + P.np(a) + ') = ' + m(h), 'a = ' + m(a) + ': abre ' + abre]);
  }

  /* ---------- 24. conicas ---------- */
  function conIdentificar(r) {
    var A = r.entero(1, 9), C = r.entero(1, 9), tipo = r.entero(0, 3), D = r.enteroNoCero(-9, 9), E = r.enteroNoCero(-9, 9), K = r.entero(-30, -1);
    while (C === A) C = r.entero(1, 9);
    var NOM = ['Circunferencia', 'Elipse', 'Hip&eacute;rbola', 'Par&aacute;bola'], ec;
    function t(c, v) { return c === 0 ? '' : (c === 1 ? '' : c === -1 ? '&minus;' : m(c)) + v; }
    function junta(l) { return l.filter(Boolean).join(' + ').replace(/\+ &minus;/g, '&minus; ') + ' = 0'; }
    if (tipo === 0) ec = junta([t(A, 'x' + F.sup(2)), t(A, 'y' + F.sup(2)), t(D, 'x'), t(E, 'y'), m(K)]);
    else if (tipo === 1) ec = junta([t(A, 'x' + F.sup(2)), t(C, 'y' + F.sup(2)), t(D, 'x'), t(E, 'y'), m(K)]);
    else if (tipo === 2) ec = junta([t(A, 'x' + F.sup(2)), t(-C, 'y' + F.sup(2)), t(D, 'x'), t(E, 'y'), m(K)]);
    else ec = r.bool() ? junta([t(A, 'x' + F.sup(2)), t(D, 'x'), t(E, 'y'), m(K)]) : junta([t(C, 'y' + F.sup(2)), t(D, 'x'), t(E, 'y'), m(K)]);
    return P.ejercicio('&iquest;Qu&eacute; secci&oacute;n c&oacute;nica representa la ecuaci&oacute;n <span class="expr">' + ec + '</span>?',
      P.opciones(r, NOM[tipo], NOM.filter(function (_, i) { return i !== tipo; })),
      ['Mira solo los terminos al cuadrado: si falta x' + F.sup(2) + ' o y' + F.sup(2) + ' es parabola.',
        'Mismos coeficientes y mismo signo: circunferencia. Distintos y mismo signo: elipse. Signos contrarios: hiperbola.'],
      ['Es una <b>' + NOM[tipo].toLowerCase() + '</b>']);
  }

  function conCirculo(r) {
    var h = r.enteroNoCero(-7, 7), k = r.enteroNoCero(-7, 7), rr = r.entero(2, 9), general = r.bool();
    function op(x, y, rad) { return 'Centro ' + pm(x, y) + ', radio ' + rad; }
    var ec;
    if (general) {
      var D = -2 * h, E = -2 * k, Fc = h * h + k * k - rr * rr;
      ec = 'x' + F.sup(2) + ' + y' + F.sup(2) + (D ? (D < 0 ? ' &minus; ' : ' + ') + Math.abs(D) + 'x' : '') + (E ? (E < 0 ? ' &minus; ' : ' + ') + Math.abs(E) + 'y' : '') +
        (Fc ? (Fc < 0 ? ' &minus; ' : ' + ') + Math.abs(Fc) : '') + ' = 0';
    } else {
      ec = (h === 0 ? 'x' + F.sup(2) : '(x ' + (h > 0 ? '&minus; ' + h : '+ ' + (-h)) + ')' + F.sup(2)) + ' + ' +
        (k === 0 ? 'y' + F.sup(2) : '(y ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')' + F.sup(2)) + ' = ' + (rr * rr);
    }
    return P.ejercicio('&iquest;Cu&aacute;les son el centro y el radio de la circunferencia <span class="expr">' + ec + '</span>?',
      P.opciones(r, op(h, k, rr), [op(-h, -k, rr), op(h, k, rr * rr), op(-h, k, rr), op(h, -k, rr)]),
      ['La forma ordinaria es (x &minus; h)' + F.sup(2) + ' + (y &minus; k)' + F.sup(2) + ' = r' + F.sup(2) + ': el centro es (h, k) con el signo CONTRARIO al del parentesis.',
        general ? 'Completa cuadrados: h es la mitad del coeficiente de x con signo cambiado, y lo mismo para k.' : 'El radio es la raiz del numero de la derecha.'],
      ['Centro ' + pm(h, k), 'r = &radic;' + (rr * rr) + ' = ' + rr, '<b>' + op(h, k, rr) + '</b>']);
  }

  function conParabola(r) {
    var p = r.enteroNoCero(-5, 5), enX = r.bool();
    var ec = enX ? 'y' + F.sup(2) + ' = ' + m(4 * p) + 'x' : 'x' + F.sup(2) + ' = ' + m(4 * p) + 'y';
    function op(f, d) { return 'Foco ' + f + ', directriz ' + d; }
    var bien = enX ? op(pm(p, 0), 'x = ' + m(-p)) : op(pm(0, p), 'y = ' + m(-p));
    var malas = enX ? [op(pm(-p, 0), 'x = ' + m(p)), op(pm(0, p), 'y = ' + m(-p)), op(pm(4 * p, 0), 'x = ' + m(-4 * p)), op(pm(p, 0), 'y = ' + m(-p))]
      : [op(pm(0, -p), 'y = ' + m(p)), op(pm(p, 0), 'x = ' + m(-p)), op(pm(0, 4 * p), 'y = ' + m(-4 * p)), op(pm(0, p), 'x = ' + m(-p))];
    return P.ejercicio('&iquest;Cu&aacute;les son el foco y la directriz de la par&aacute;bola <span class="expr">' + ec + '</span>?',
      P.opciones(r, bien, malas),
      ['Compara con ' + (enX ? 'y' + F.sup(2) + ' = 4px' : 'x' + F.sup(2) + ' = 4py') + ': 4p = ' + m(4 * p) + '.', 'El foco esta a p del vertice (0, 0) y la directriz a p del otro lado.'],
      ['p = ' + m(4 * p) + ' / 4 = ' + m(p), '<b>' + bien + '</b>']);
  }

  function conEjemplos(r) {
    var pares = [['Par&aacute;bola', 'La forma de una antena de televisi&oacute;n satelital'], ['Elipse', 'La &oacute;rbita de la Tierra alrededor del Sol'],
      ['Circunferencia', 'El borde de una rueda de bicicleta'], ['Hip&eacute;rbola', 'La trayectoria de un cometa que pasa una sola vez cerca del Sol'],
      ['Par&aacute;bola', 'La trayectoria de un bal&oacute;n pateado'], ['Elipse', 'La forma de una mesa ovalada de comedor']];
    var usa = {}, elegidos = [];
    r.baraja(pares).forEach(function (p) { if (!usa[p[0]]) { usa[p[0]] = true; elegidos.push(p); } });
    var der = r.baraja(elegidos.map(function (p) { return p[1]; }));
    return P.relacione(r, 'Relacione cada secci&oacute;n c&oacute;nica con un ejemplo de la vida real.', ['C&oacute;nica', 'Ejemplo'],
      elegidos.map(function (p) { return p[0]; }), der, elegidos.map(function (p) { return der.indexOf(p[1]); }),
      ['Las orbitas de los planetas son elipses; las antenas satelitales, parabolas.', 'Lo que pasa una sola vez y se aleja para siempre sigue una hiperbola.'], []);
  }

  /* ---------- 25. excentricidad ---------- */
  function excDeEcuacion(r) {
    var t = r.elige([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), c = t[0], b = t[1], a = t[2];
    if (r.bool()) { c = t[1]; b = t[0]; }
    var horizontal = r.bool();
    var ec = horizontal ? F.frac('x' + F.sup(2), a * a) + ' + ' + F.frac('y' + F.sup(2), b * b) + ' = 1' : F.frac('x' + F.sup(2), b * b) + ' + ' + F.frac('y' + F.sup(2), a * a) + ' = 1';
    return P.ejercicio('&iquest;Cu&aacute;l es la excentricidad de la elipse <span class="expr">' + ec + '</span>?' +
      P.considere('a' + F.sup(2) + ' = b' + F.sup(2) + ' + c' + F.sup(2) + ' y e = c / a.'),
      P.opciones(r, fr(c, a), [fr(b, a), fr(c, b), fr(a, c), fr(b, c)]),
      ['a' + F.sup(2) + ' es el denominador MAS GRANDE: a = ' + a + ', b = ' + b + '.', 'c = &radic;(a' + F.sup(2) + ' &minus; b' + F.sup(2) + ').'],
      ['c = &radic;(' + (a * a) + ' &minus; ' + (b * b) + ') = ' + c, 'e = <b>' + fr(c, a) + '</b>']);
  }

  function excInterpreta(r) {
    var c = r.elige([['e = 0', 'Circunferencia'], ['0 &lt; e &lt; 1', 'Elipse'], ['e = 1', 'Par&aacute;bola'], ['e &gt; 1', 'Hip&eacute;rbola']]);
    if (r.bool()) {
      return P.ejercicio('Una c&oacute;nica tiene excentricidad ' + c[0] + '. &iquest;De qu&eacute; c&oacute;nica se trata?',
        P.opciones(r, c[1], ['Circunferencia', 'Elipse', 'Par&aacute;bola', 'Hip&eacute;rbola'].filter(function (x) { return x !== c[1]; })),
        ['La excentricidad mide que tan "estirada" esta la conica.', 'Circunferencia 0, elipse entre 0 y 1, parabola 1, hiperbola mas de 1.'],
        ['Con ' + c[0] + ' es una <b>' + c[1].toLowerCase() + '</b>']);
    }
    var ops = ['Se parece cada vez m&aacute;s a una circunferencia', 'Se vuelve cada vez m&aacute;s alargada', 'Se convierte en una recta', 'Sus focos se separan cada vez m&aacute;s'];
    return P.ejercicio('&iquest;Qu&eacute; le pasa a la forma de una elipse cuando su excentricidad se acerca a 0?',
      P.opciones(r, ops[0], ops.slice(1)),
      ['e = c/a: si e se acerca a 0, c (la distancia del centro a los focos) se hace muy chica.', 'Con los focos juntos en el centro, la elipse se vuelve redonda.'],
      ['<b>' + ops[0] + '</b>']);
  }

  function excFocos(r) {
    var t = r.elige([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10]]), k = r.elige([1, 2]), a = t[2] * k, b = t[1] * k, c = t[0] * k;
    if (r.bool()) { b = t[0] * k; c = t[1] * k; }
    return P.ejercicio('Una elipse tiene un eje mayor de ' + (2 * a) + ' cm y un eje menor de ' + (2 * b) + ' cm. &iquest;Cu&aacute;l es la distancia entre sus focos?' +
      P.considere('a' + F.sup(2) + ' = b' + F.sup(2) + ' + c' + F.sup(2) + '.'),
      P.opciones(r, 2 * c, [c, 2 * a - 2 * b, a + b, 4 * c], { unidad: 'cm' }),
      ['Los ejes miden 2a y 2b: a = ' + a + ' y b = ' + b + '.', 'Los focos estan a c del centro, asi que entre ellos hay 2c.'],
      ['c = &radic;(' + (a * a) + ' &minus; ' + (b * b) + ') = ' + c, 'Distancia entre focos: 2c = <b>' + (2 * c) + ' cm</b>']);
  }

  var ENFOQUES = {
    polares: [casos.polares, polAcartesianas, polDistancia, polCuadrante],
    puntoMedio: [casos.puntoMedio, pmExtremo, pmDistancia, pmCentroRadio, pmDivision],
    pendiente: [casos.pendiente, penDosPuntos, penEcuacion, penAngulo, penInterpreta, penGeneral],
    sistema: [casos.sistema, sisResolver, sisClasificar, sisProblema],
    vertice: [casos.vertice, verMinimo, verRaices, verCanonica, verEje],
    conicas: [casos.conicas, conIdentificar, conCirculo, conParabola, conEjemplos],
    excentricidad: [casos.excentricidad, excDeEcuacion, excInterpreta, excFocos]
  };

  var SUB_ANALITICA = [
    ['polares', 'Coordenadas polares', 'medio'],
    ['puntoMedio', 'Punto medio', 'facil'],
    ['pendiente', 'Pendiente', 'facil'],
    ['sistema', 'Sistemas de ecuaciones', 'dificil'],
    ['vertice', 'Vertice de la parabola', 'medio'],
    ['conicas', 'Identificar conicas', 'medio'],
    ['excentricidad', 'Excentricidad de la elipse', 'dificil']
  ];

  EJ.tema({
    id: 'prepa-analitica',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Geometria analitica',
    descripcion: 'Coordenadas polares, punto medio, pendiente, sistemas de ecuaciones, vertice de la parabola, conicas y excentricidad. Reactivos 19 a 25 de la guia.',
    etiquetas: ['polares', 'punto medio', 'pendiente', 'sistemas', 'parabola', 'conicas', 'elipse'],
    dificultades: P.registrarSubtemas('prepa-analitica', SUB_ANALITICA),
    formulario: 'Punto medio: ((x<sub>1</sub> + x<sub>2</sub>)/2, (y<sub>1</sub> + y<sub>2</sub>)/2) &nbsp;&middot;&nbsp; Polares: r = &radic;(x' + F.sup(2) + ' + y' + F.sup(2) + '), &theta; = arctan(y/x)<br>' +
      'Vertice: x = &minus;b/2a &nbsp;&middot;&nbsp; Elipse: e = c/a, a' + F.sup(2) + ' = b' + F.sup(2) + ' + c' + F.sup(2) + ', eje mayor = 2a',

    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-analitica', SUB_ANALITICA);
      return P.enfoque(r, ENFOQUES[t]);
    }
  });
})();
