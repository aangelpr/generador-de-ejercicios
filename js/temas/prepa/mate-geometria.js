/* Modo prepa - Matematicas: geometria y trigonometria
   (los reactivos 9 a 18 de la version de practica) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  /* notacion con algo encima: segmento, semirrecta, recta, arco */
  function sobre(txt, marca) { return '<span class="sobre" data-s="' + marca + '">' + txt + '</span>'; }

  /* angulo en radianes como fraccion de pi */
  function rad(g) {
    var s = F.simplifica(g, 180);
    if (s[0] === 0) return '0';
    var num = s[0] === 1 ? '&pi;' : s[0] + '&pi;';
    return s[1] === 1 ? num : F.frac(num, s[1]);
  }
  function tipoAngulo(g) {
    if (g < 90) return 'agudo';
    if (g === 90) return 'recto';
    if (g < 180) return 'obtuso';
    if (g === 180) return 'llano';
    if (g < 360) return 'c&oacute;ncavo';
    return 'perigonal';
  }

  var casos = {};

  /* 9. Definiciones (completar texto) */
  casos.definiciones = function (r) {
    var d = r.elige([
      { t: 'La ___, con ___ O y ___ r, es el lugar geom&eacute;trico de los puntos que equidistan una distancia fija r de un punto fijo O.',
        b: ['circunferencia', 'centro', 'radio'],
        m: [['curva', 'cuerda', 'radio'], ['curva', 'centro', 'diagonal'], ['circunferencia', 'foco', 'apotema'], ['elipse', 'centro', 'di&aacute;metro']] },
      { t: 'La ___ es el lugar geom&eacute;trico de los puntos que equidistan de un punto fijo llamado ___ y de una recta fija llamada ___.',
        b: ['par&aacute;bola', 'foco', 'directriz'],
        m: [['elipse', 'centro', 'eje mayor'], ['hip&eacute;rbola', 'foco', 'as&iacute;ntota'], ['par&aacute;bola', 'v&eacute;rtice', 'eje focal']] },
      { t: 'La ___ es el lugar geom&eacute;trico de los puntos cuya ___ de distancias a dos puntos fijos, llamados ___, es constante.',
        b: ['elipse', 'suma', 'focos'],
        m: [['hip&eacute;rbola', 'suma', 'focos'], ['elipse', 'diferencia', 'v&eacute;rtices'], ['circunferencia', 'suma', 'centros']] },
      { t: 'La ___ es el lugar geom&eacute;trico de los puntos cuya ___ de distancias a dos puntos fijos, llamados ___, es constante en valor absoluto.',
        b: ['hip&eacute;rbola', 'diferencia', 'focos'],
        m: [['elipse', 'diferencia', 'focos'], ['hip&eacute;rbola', 'suma', 'v&eacute;rtices'], ['par&aacute;bola', 'diferencia', 'directrices']] },
      { t: 'Una ___ es el segmento que une dos puntos de una circunferencia; si adem&aacute;s pasa por el ___, se llama ___.',
        b: ['cuerda', 'centro', 'di&aacute;metro'],
        m: [['secante', 'centro', 'radio'], ['tangente', 'foco', 'di&aacute;metro'], ['cuerda', 'v&eacute;rtice', 'radio']] },
      { t: 'Una recta ___ a una circunferencia la toca en un solo punto, mientras que una recta ___ la corta en dos puntos.',
        b: ['tangente', 'secante'],
        m: [['secante', 'tangente'], ['tangente', 'paralela'], ['perpendicular', 'secante']] }
    ]);
    return P.complete(r, d.t, d.b, d.m,
      ['Lee la definicion completa antes de escoger: cada palabra tiene que encajar con su hueco.',
        'Recuerda: circunferencia &rarr; centro y radio; parabola &rarr; foco y directriz; elipse &rarr; suma; hiperbola &rarr; diferencia.'],
      []);
  };

  /* 10. Notacion de objetos geometricos (relacione) */
  casos.notacion = function (r) {
    var objs = [
      { s: sobre('AB', '&mdash;'), o: 'Segmento' },
      { s: sobre('AB', '&rarr;'), o: 'Semirrecta' },
      { s: sobre('AB', '&harr;'), o: 'L&iacute;nea recta' },
      { s: sobre('AB', '&#8994;'), o: 'Arco' },
      { s: '&ang;ABC', o: '&Aacute;ngulo' },
      { s: '&ell; &#8741; m', o: 'Rectas paralelas' },
      { s: '&ell; &perp; m', o: 'Rectas perpendiculares' },
      { s: '&#9651;ABC', o: 'Tri&aacute;ngulo' }
    ];
    var elegidos = r.muestra(objs, 4);
    var extra = r.elige(objs.filter(function (x) { return elegidos.indexOf(x) === -1; }));
    var der = r.baraja(elegidos.concat([extra]));
    var pares = elegidos.map(function (x) { return der.indexOf(x); });
    return P.relacione(r, 'Relacione los s&iacute;mbolos con los objetos que les correspondan.', ['S&iacute;mbolo', 'Objeto'],
      elegidos.map(function (x) { return x.s; }), der.map(function (x) { return x.o; }), pares,
      ['Una raya arriba (sin flechas) es un segmento: tiene principio y fin.',
        'Una flecha es semirrecta (empieza en A y sigue sin fin); doble flecha es recta completa.'], []);
  };

  /* 11. Caracteristicas de un angulo (grados, radianes y tipo) */
  casos.angulos = function (r) {
    var g = r.elige([30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360]);
    var tipo = tipoAngulo(g);
    var otros = [30, 45, 60, 90, 120, 135, 150, 180, 210, 240, 270, 300, 330, 360].filter(function (x) { return x !== g; });
    var gMal = r.muestra(otros, 3);
    function frase(t, gg, k) {
      var formas = [
        'Se conoce como &aacute;ngulo ' + t + ' y es igual a ' + rad(gg) + ' radianes',
        'Equivale a ' + rad(gg) + ' radianes y es un &aacute;ngulo ' + t,
        'Es igual a ' + rad(gg) + ' radianes y adem&aacute;s es un &aacute;ngulo ' + t
      ];
      return formas[k % 3];
    }
    var bien = frase(tipo, g, r.entero(0, 2));
    var malas = [
      frase(tipo, gMal[0], 0),
      frase(tipoAngulo(gMal[1]) === tipo ? (g < 180 ? 'c&oacute;ncavo' : 'agudo') : tipoAngulo(gMal[1]), g, 1),
      frase(tipoAngulo(gMal[2]), gMal[2], 2)
    ];
    return P.ejercicio(
      'Seleccione la opci&oacute;n que concentra las caracter&iacute;sticas de un &aacute;ngulo de ' + g + '&deg;.',
      P.opciones(r, bien, malas),
      ['Para pasar a radianes multiplica por &pi;/180: ' + g + '&deg; = ' + g + '&pi;/180.',
        'Agudo &lt; 90&deg;, recto = 90&deg;, obtuso entre 90&deg; y 180&deg;, llano = 180&deg;, concavo entre 180&deg; y 360&deg;.'],
      [g + '&deg; &times; &pi;/180 = ' + rad(g) + ' radianes', 'Por su medida es un angulo <b>' + tipo + '</b>']);
  };

  /* 12. Relaciones entre rectas (relacione) */
  casos.relacionRectas = function (r) {
    var m = r.enteroNoCero(-4, 4), b1 = r.entero(-6, 6), b2 = r.entero(-6, 6);
    while (b2 === b1) b2 = r.entero(-6, 6);
    var R5 = r.elige([2, 3, 4, 5]);
    function recta(mm, bb) { return 'y = ' + (mm === 0 ? '' : P.poli([mm, bb]).replace(/^-/, '&minus;')) + (mm === 0 ? bb : ''); }
    var mPerp = F.simplifica(-1, m);
    var perp = 'y = ' + (mPerp[1] === 1 ? (mPerp[0] === -1 ? '&minus;' : mPerp[0] === 1 ? '' : mPerp[0]) : (mPerp[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(mPerp[0]), mPerp[1])) + 'x' + (b2 >= 0 ? ' + ' + b2 : ' &minus; ' + (-b2));
    var mObl = m + r.elige([1, 2, 3]);
    if (mObl === 0) mObl = 5;
    var pares = [
      { izq: recta(m, b1) + ' &nbsp;y&nbsp; ' + recta(m, b2), rel: 'Paralelas' },
      { izq: recta(m, b1) + ' &nbsp;y&nbsp; ' + perp, rel: 'Perpendiculares' },
      { izq: recta(m, b1) + ' &nbsp;y&nbsp; ' + recta(mObl, b2), rel: 'Oblicuas' },
      { izq: 'y = ' + R5 + ' &nbsp;y&nbsp; x' + F.sup(2) + ' + y' + F.sup(2) + ' = ' + (R5 * R5), rel: 'Tangente a la circunferencia' }
    ];
    var izq = r.baraja(pares);
    var der = r.baraja(pares.map(function (p) { return p.rel; }).concat(['Coincidentes']));
    var asign = izq.map(function (p) { return der.indexOf(p.rel); });
    return P.relacione(r, 'Identifique la relaci&oacute;n entre cada par de rectas (o recta y circunferencia).', ['Rectas', 'Relaci&oacute;n'],
      izq.map(function (p) { return p.izq; }), der, asign,
      ['Misma pendiente y distinta ordenada: paralelas. Pendientes que multiplicadas dan &minus;1: perpendiculares.',
        'Si las pendientes son distintas pero no dan &minus;1, se cortan sin angulo recto: oblicuas. La recta y = ' + R5 + ' toca a la circunferencia de radio ' + R5 + ' en un solo punto.'],
      []);
  };

  /* 13. Clasificacion de triangulos (completar texto) */
  casos.triangulos = function (r) {
    function porAngulos() {
      var t = r.entero(0, 2), a, b, c;
      if (t === 0) { a = r.entero(50, 80); b = r.entero(40, 80); c = 180 - a - b; if (c >= 90 || c <= 0) { a = 60; b = 70; c = 50; } }
      else if (t === 1) { a = 90; b = r.entero(20, 70); c = 90 - b; }
      else { a = r.entero(100, 140); b = r.entero(10, 180 - a - 10); c = 180 - a - b; }
      return { txt: a + '&deg;, ' + b + '&deg; y ' + c + '&deg;', tipo: ['acut&aacute;ngulo', 'rect&aacute;ngulo', 'obtus&aacute;ngulo'][t] };
    }
    function porLados() {
      var t = r.entero(0, 2), l = r.entero(3, 9);
      if (t === 0) return { txt: l + ', ' + l + ' y ' + l + ' cm', tipo: 'equil&aacute;tero' };
      if (t === 1) { var o = l + r.entero(1, 3); return { txt: l + ', ' + l + ' y ' + o + ' cm', tipo: 'is&oacute;sceles' }; }
      return { txt: l + ', ' + (l + 1) + ' y ' + (l + 3) + ' cm', tipo: 'escaleno' };
    }
    var t1 = porAngulos(), t2 = porLados(), t3 = porAngulos();
    var texto = 'Un tri&aacute;ngulo cuyos &aacute;ngulos miden ' + t1.txt + ' es ___; uno cuyos lados miden ' + t2.txt +
      ' es ___, mientras que uno con &aacute;ngulos de ' + t3.txt + ' es ___.';
    var bien = [t1.tipo, t2.tipo, t3.tipo];
    var angs = ['acut&aacute;ngulo', 'rect&aacute;ngulo', 'obtus&aacute;ngulo'], lados = ['equil&aacute;tero', 'is&oacute;sceles', 'escaleno'];
    var malas = [];
    for (var k = 0; k < 12; k++) {
      var c = [r.elige(angs), r.elige(lados), r.elige(angs)];
      if (k % 3 === 0) c = [t2.tipo, t1.tipo, t3.tipo];   // confundir lados con angulos
      malas.push(c);
    }
    return P.complete(r, texto, bien, malas,
      ['Por sus angulos: acutangulo (todos &lt; 90&deg;), rectangulo (uno de 90&deg;), obtusangulo (uno &gt; 90&deg;).',
        'Por sus lados: equilatero (3 iguales), isosceles (2 iguales), escaleno (todos distintos).'],
      []);
  };

  /* 14. Triangulos semejantes */
  casos.semejanza = function (r) {
    var k = r.elige([5, 8, 10, 20, 25, 50]), ec = r.entero(2, 6), de = r.entero(3, 9);
    var ac = k * ec, ab = k * de;
    return P.ejercicio(
      'Sea &#9651;ABC semejante a &#9651;EDC tales que ' + F.frac('AC', 'EC') + ' = ' + F.frac('BC', 'DC') + ' = ' + F.frac('AB', 'ED') +
        '. Si ' + sobre('AC', '&mdash;') + ' = ' + ac + ', ' + sobre('EC', '&mdash;') + ' = ' + ec + ' y ' + sobre('DE', '&mdash;') + ' = ' + de +
        ', determine la medida de ' + sobre('AB', '&mdash;') + '.',
      P.opciones(r, ab, [ab + ac, ac * de / (ec + 1), ab * 2, ac + de, ec * de]),
      ['En triangulos semejantes los lados correspondientes son proporcionales.',
        'La razon de semejanza es AC/EC = ' + ac + '/' + ec + ' = ' + k + '. Multiplica DE por esa razon.'],
      ['Razon: ' + ac + ' / ' + ec + ' = ' + k, 'AB = ' + k + ' &times; ' + de + ' = <b>' + ab + '</b>']);
  };

  /* 15. Volumenes */
  casos.volumen = function (r) {
    var t = r.entero(0, 2), rr = r.entero(2, 9), h = r.entero(3, 15), v, err, enun, form;
    if (t === 0) {
      v = 3.14 * rr * rr * h; form = 'V = &pi;r' + F.sup(2) + 'h';
      err = [3.14 * rr * rr * h / 3, 2 * 3.14 * rr * h, 3.14 * rr * h * h, 3.14 * rr * rr * h / 4];
      enun = 'Determine el volumen de un cilindro de ' + P.num(h) + ' cm de altura que tiene una base circular con ' + P.num(rr) + ' cm de radio.';
    } else if (t === 1) {
      v = 3.14 * rr * rr * h / 3; form = 'V = &pi;r' + F.sup(2) + 'h / 3';
      err = [3.14 * rr * rr * h, 3.14 * rr * h / 3, 2 * 3.14 * rr * h / 3];
      enun = 'Determine el volumen de un cono de ' + P.num(h) + ' cm de altura y ' + P.num(rr) + ' cm de radio en la base.';
    } else {
      v = 4 * 3.14 * rr * rr * rr / 3; form = 'V = 4&pi;r' + F.sup(3) + ' / 3';
      err = [4 * 3.14 * rr * rr, 3.14 * rr * rr * rr, 4 * 3.14 * rr * rr * rr];
      enun = 'Determine el volumen de una esfera de ' + P.num(rr) + ' cm de radio.';
    }
    return P.ejercicio(enun + P.considere('&pi; = 3.14.'),
      P.opciones(r, v, err, { unidad: 'cm' + F.sup(3), fijo: true, enteros: false }),
      ['Formula: ' + form + '.', 'Eleva al cuadrado (o al cubo) solo el radio, y multiplica al final por 3.14.'],
      [form, 'V = <b>' + P.num(v) + ' cm' + F.sup(3) + '</b>']);
  };

  /* 16. Razones trigonometricas */
  casos.razones = function (r) {
    var t = r.elige([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15]]);
    /* angulo recto en A; AC = t[0], AB = t[1], CB = t[2]; angulo pedido en C */
    var ac = t[0], ab = t[1], cb = t[2];
    var sen = ab / cb, cos = ac / cb, tan = ab / ac;
    var exp = r.entero(0, 2), v, txt, sol;
    if (exp === 0) { v = sen * cos; txt = 'cos(&ang;ACB) &middot; sen(&ang;ACB)'; sol = F.frac(ac, cb) + ' &times; ' + F.frac(ab, cb); }
    else if (exp === 1) { v = tan; txt = 'tan(&ang;ACB)'; sol = F.frac(ab, ac); }
    else { v = sen / cos + cos / sen; txt = 'tan(&ang;ACB) + cot(&ang;ACB)'; sol = F.frac(ab, ac) + ' + ' + F.frac(ac, ab); }
    var err = [cos, sen, 1 / tan, ac * ab / (cb), sen + cos, cos * cos];
    return P.ejercicio(
      'Considere &#9651;ABC con &ang;BAC recto, la hipotenusa ' + sobre('CB', '&mdash;') + ' = ' + cb + ' cm, el cateto ' + sobre('AB', '&mdash;') + ' = ' + ab +
        ' cm y el cateto ' + sobre('AC', '&mdash;') + ' = ' + ac + ' cm. &iquest;Cu&aacute;l es el valor de la expresi&oacute;n ' + txt + '?',
      P.opciones(r, v, err, { fijo: true, enteros: false }),
      ['Desde el angulo C: el cateto opuesto es AB y el adyacente es AC.',
        'sen = opuesto/hipotenusa, cos = adyacente/hipotenusa, tan = opuesto/adyacente.'],
      ['sen(C) = ' + F.frac(ab, cb) + ', cos(C) = ' + F.frac(ac, cb) + ', tan(C) = ' + F.frac(ab, ac),
        txt + ' = ' + sol + ' = <b>' + P.num(v) + '</b>']);
  };

  /* 17. Circunferencia unitaria: coseno o seno de una suma */
  casos.sumaAngulos = function (r) {
    var a, b;
    do { a = r.elige([10, 20, 30, 40, 50, 60, 70]); b = r.elige([10, 20, 30, 40, 50, 60, 70]); } while (a === b || a + b > 150);
    if (a > b) { var tt = a; a = b; b = tt; }
    function c2(x) { return Math.round(x * 100) / 100; }
    var ca = c2(Math.cos(a * Math.PI / 180)), sa = c2(Math.sin(a * Math.PI / 180));
    var cb = c2(Math.cos(b * Math.PI / 180)), sb = c2(Math.sin(b * Math.PI / 180));
    var pideCos = r.bool();
    var v = pideCos ? ca * cb - sa * sb : sa * cb + ca * sb;
    var err = pideCos ? [ca * cb + sa * sb, -(ca * cb - sa * sb), -(ca * cb + sa * sb)] : [sa * cb - ca * sb, -(sa * cb + ca * sb), ca * cb - sa * sb];
    var f = pideCos ? 'cos(&alpha; + &beta;) = cos &alpha; cos &beta; &minus; sen &alpha; sen &beta;' : 'sen(&alpha; + &beta;) = sen &alpha; cos &beta; + cos &alpha; sen &beta;';
    var fmt4 = function (x) { return P.num(F.redondea(x, 4), 4); };
    return P.ejercicio(
      'Considere dos puntos en la circunferencia unitaria: A = (' + ca.toFixed(2) + ', ' + sa.toFixed(2) + '), separado ' + a +
        '&deg; de la horizontal, y B = (' + cb.toFixed(2) + ', ' + sb.toFixed(2) + '), separado ' + b + '&deg; de la horizontal. ' +
        '&iquest;Cu&aacute;l es el valor de ' + (pideCos ? 'cos' : 'sen') + '(' + (a + b) + '&deg;)?' + P.considere(f + '.'),
      P.opciones(r, F.redondea(v, 4), err.map(function (x) { return F.redondea(x, 4); }), { fmt: fmt4, enteros: false, dec: 4, conSigno: true }),
      ['En la circunferencia unitaria cada punto es (cos &theta;, sen &theta;).',
        (a + b) + '&deg; = ' + a + '&deg; + ' + b + '&deg;: usa la formula de la suma.'],
      ['cos ' + a + '&deg; = ' + ca.toFixed(2) + ', sen ' + a + '&deg; = ' + sa.toFixed(2) + ', cos ' + b + '&deg; = ' + cb.toFixed(2) + ', sen ' + b + '&deg; = ' + sb.toFixed(2),
        (pideCos ? '(' + ca.toFixed(2) + ')(' + cb.toFixed(2) + ') &minus; (' + sa.toFixed(2) + ')(' + sb.toFixed(2) + ')'
          : '(' + sa.toFixed(2) + ')(' + cb.toFixed(2) + ') + (' + ca.toFixed(2) + ')(' + sb.toFixed(2) + ')') + ' = <b>' + fmt4(v) + '</b>']);
  };

  /* 18. Area de un triangulo rectangulo con angulos de 30 y 60 */
  casos.areaTrig = function (r) {
    var c = r.elige([4, 8, 12, 16, 20]);
    var k = c * c / 8;   /* area = (c/2)(c raiz3/2)/2 = c^2 raiz3 / 8 */
    var ang = r.elige([30, 60]);
    var dib = F.svg(220, 130,
      '<path d="M20 110 H180 V20 Z"/>' +
      '<path d="M168 110 V98 H180"/>' +
      F.txtSvg(70, 58, String(c)) +
      F.txtSvg(ang === 30 ? 44 : 150, ang === 30 ? 106 : 42, ang + '&deg;'));
    function raiz(n, abajo) { return abajo ? F.frac(n, '&radic;3') : n + '&radic;3'; }
    var bien = raiz(k, false);
    var malas = [raiz(k, true), raiz(2 * k, true), raiz(2 * k, false)];
    return P.ejercicio(
      'Calcule el &aacute;rea del siguiente tri&aacute;ngulo rect&aacute;ngulo (la hipotenusa mide ' + c + ').<br>' + dib +
        P.considere('sen(30&deg;) = ' + F.frac(1, 2) + ' y sen(60&deg;) = ' + F.frac('&radic;3', 2) + '.'),
      P.opciones(r, bien, malas),
      ['Saca los dos catetos con la hipotenusa: uno es ' + c + ' &middot; sen(30&deg;) y el otro ' + c + ' &middot; sen(60&deg;).',
        'Area del triangulo rectangulo = cateto &times; cateto / 2.'],
      ['Cateto 1 = ' + c + ' &times; 1/2 = ' + (c / 2), 'Cateto 2 = ' + c + ' &times; &radic;3/2 = ' + (c / 2) + '&radic;3',
        'Area = ' + (c / 2) + ' &times; ' + (c / 2) + '&radic;3 / 2 = <b>' + bien + '</b>']);
  };

  EJ.tema({
    id: 'prepa-geometria',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Geometria y trigonometria',
    descripcion: 'Definiciones, notacion, angulos y radianes, rectas, triangulos, semejanza, volumenes y trigonometria. Reactivos 9 a 18 de la guia.',
    etiquetas: ['circunferencia', 'angulos', 'radianes', 'triangulos', 'semejanza', 'volumen', 'seno', 'coseno'],
    dificultades: ['medio'],
    formulario: 'Grados a radianes: &times; &pi;/180 &nbsp;&middot;&nbsp; Cilindro: &pi;r' + F.sup(2) + 'h &nbsp;&middot;&nbsp; Cono: &pi;r' + F.sup(2) + 'h/3 &nbsp;&middot;&nbsp; Esfera: 4&pi;r' + F.sup(3) + '/3<br>' +
      'sen = op/hip &nbsp;&middot;&nbsp; cos = ady/hip &nbsp;&middot;&nbsp; tan = op/ady<br>' +
      'cos(&alpha; + &beta;) = cos&alpha; cos&beta; &minus; sen&alpha; sen&beta; &nbsp;&middot;&nbsp; sen(&alpha; + &beta;) = sen&alpha; cos&beta; + cos&alpha; sen&beta;',

    generar: function (dif, r) {
      var t = r.subtema([
        ['definiciones', 'Definiciones (completar)'],
        ['notacion', 'Notacion geometrica'],
        ['angulos', 'Angulos y radianes'],
        ['relacionRectas', 'Relacion entre rectas'],
        ['triangulos', 'Clasificacion de triangulos'],
        ['semejanza', 'Triangulos semejantes'],
        ['volumen', 'Volumenes'],
        ['razones', 'Razones trigonometricas'],
        ['sumaAngulos', 'Circunferencia unitaria'],
        ['areaTrig', 'Area con seno']
      ]);
      return casos[t](r);
    }
  });
})();
