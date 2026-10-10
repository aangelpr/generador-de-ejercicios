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

  /* ---------- dibujo ---------- */
  function r1(x) { return Math.round(x * 10) / 10; }
  function etiqueta(x, y, t, clase) {
    return '<text x="' + r1(x) + '" y="' + r1(y) + '" text-anchor="middle" dominant-baseline="middle" stroke="none" fill="currentColor" ' +
      'font-size="14" font-style="italic" font-family="Georgia, \'Times New Roman\', serif"' + (clase ? ' class="' + clase + '"' : '') + '>' + t + '</text>';
  }
  function linea(a, b, extra) {
    return '<line x1="' + r1(a[0]) + '" y1="' + r1(a[1]) + '" x2="' + r1(b[0]) + '" y2="' + r1(b[1]) + '"' + (extra || '') + '/>';
  }
  /* punta de flecha en b, apuntando de a hacia b */
  function flecha(a, b, extra) {
    var dx = b[0] - a[0], dy = b[1] - a[1], L = Math.sqrt(dx * dx + dy * dy) || 1;
    var ux = dx / L, uy = dy / L, px = -uy, py = ux;
    var p1 = [b[0] - 10 * ux + 4.5 * px, b[1] - 10 * uy + 4.5 * py], p2 = [b[0] - 10 * ux - 4.5 * px, b[1] - 10 * uy - 4.5 * py];
    return '<path d="M' + r1(b[0]) + ' ' + r1(b[1]) + ' L' + r1(p1[0]) + ' ' + r1(p1[1]) + ' L' + r1(p2[0]) + ' ' + r1(p2[1]) + ' Z" fill="currentColor" stroke="none"' + (extra || '') + '/>';
  }
  function punto(p) { return '<circle cx="' + r1(p[0]) + '" cy="' + r1(p[1]) + '" r="3.2" fill="currentColor" stroke="none"/>'; }
  var CURVAS = ['&#119966;', '&#119967;', '&#119974;'];          // C, D, K caligraficas
  var ELL = '&ell;';

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

  /* 10. Notacion de objetos geometricos con base en el grafico (relacione) */
  casos.notacion = function (r) {
    var W = 280, H = 185;
    var letras = r.muestra(['A', 'B', 'C', 'D', 'E', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'], 3);
    var nA = letras[0], nB = letras[1], nO = letras[2];
    var nRay = r.elige(['k', 'j', 'h', 't']);
    var nRecta = r.elige([ELL, 'm', 'n', 's']);
    var nCurva = r.elige(CURVAS);
    var esp = r.bool();                       // figura en espejo para variar
    function P2(x, y) { return [esp ? W - x : x, y]; }

    var B = P2(212, 104), A = P2(88, 160), O = P2(40, 92);
    var L1 = P2(40, 22), L2 = P2(258, 126);   // recta que pasa por B
    var R2 = P2(268, 112);                    // la semirrecta sigue despues de B
    var c0 = P2(62, 28), cq = P2(160, 96), c1 = P2(62, 170);

    var dib = F.svg(W, H,
      '<path class="ac" d="M' + c0[0] + ' ' + c0[1] + ' Q' + cq[0] + ' ' + cq[1] + ' ' + c1[0] + ' ' + c1[1] + '"/>' +
      linea(L1, L2) + flecha(L2, L1) + flecha(L1, L2) +
      linea(O, R2) + flecha(O, R2) +
      linea(A, B, ' class="ac"') +
      punto(A) + punto(B) + punto(O) +
      etiqueta(A[0] + (esp ? 10 : -10), A[1] + 12, nA) +
      etiqueta(B[0], B[1] - 14, nB) +
      etiqueta(O[0] + (esp ? 12 : -12), O[1] + 2, nO) +
      etiqueta(P2(158, 0)[0], 112, nRay) +
      etiqueta(P2(122, 0)[0], 48, nRecta) +
      etiqueta(P2(74, 0)[0], 66, nCurva));

    var objs = [
      { s: sobre(nA + nB, '&mdash;'), o: 'Segmento' },
      { s: nO + '<i>' + nRay + '</i>', o: 'Semirrecta' },
      { s: '<i>' + nRecta + '</i>', o: 'L&iacute;nea recta' },
      { s: nCurva, o: 'L&iacute;nea curva' },
      { s: nO, o: 'Punto' }
    ];
    var elegidos = r.muestra(objs.slice(0, 4), r.bool() ? 4 : 3);
    if (elegidos.length === 3) elegidos.push(objs[4]);
    elegidos = r.baraja(elegidos);
    var resto = objs.filter(function (x) { return elegidos.indexOf(x) === -1; }).map(function (x) { return x.o; })
      .concat(['&Aacute;ngulo', 'L&iacute;nea poligonal']);
    var der = r.baraja(elegidos.map(function (x) { return x.o; }).concat([r.elige(resto)]));
    var pares = elegidos.map(function (x) { return der.indexOf(x.o); });
    return P.relacione(r, 'Con base en el gr&aacute;fico, relacione los s&iacute;mbolos con los objetos que les correspondan.' + dib,
      ['S&iacute;mbolo del gr&aacute;fico', 'Objetos del gr&aacute;fico'],
      elegidos.map(function (x) { return x.s; }), der, pares,
      ['Busca cada simbolo en el dibujo. Dos puntos unidos sin flechas (' + nA + nB + ') son un segmento: tiene principio y fin.',
        'La que sale de ' + nO + ' y tiene flecha solo en un extremo es semirrecta; la que tiene flecha en los dos extremos es la recta completa. ' + nCurva + ' es la linea curva.'],
      []);
  };

  /* el angulo dibujado: lado inicial horizontal y el arco que gira hacia el final */
  function dibujoAngulo(r, g) {
    var W = 220, H = 184, cx = 110, cy = 92, R = 62, ra = g > 180 ? 28 : 24;
    var t = g * Math.PI / 180;
    var V = [cx, cy], ini = [cx + R, cy], fin = [cx + R * Math.cos(t), cy - R * Math.sin(t)];
    var nombres = r.muestra(['A', 'B', 'C', 'O', 'P', 'Q'], 3);
    var a0 = [cx + ra, cy], a1 = [cx + ra * Math.cos(t), cy - ra * Math.sin(t)];
    var arco = g >= 360
      ? '<path class="ac" d="M' + r1(a0[0]) + ' ' + r1(a0[1]) + ' A' + ra + ' ' + ra + ' 0 1 0 ' + (cx - ra) + ' ' + cy + ' A' + ra + ' ' + ra + ' 0 1 0 ' + r1(a0[0]) + ' ' + r1(a0[1] - 0.01) + '"/>'
      : '<path class="ac" d="M' + r1(a0[0]) + ' ' + r1(a0[1]) + ' A' + ra + ' ' + ra + ' 0 ' + (g > 180 ? 1 : 0) + ' 0 ' + r1(a1[0]) + ' ' + r1(a1[1]) + '"/>';
    /* la punta del arco sigue la tangente (sentido contrario a las manecillas) */
    var tg = [-Math.sin(t), -Math.cos(t)];
    var punta = flecha([a1[0] - tg[0] * 6, a1[1] - tg[1] * 6], [a1[0] + tg[0] * 2, a1[1] + tg[1] * 2], ' class="ac-relleno"');
    var mid = (g >= 360 ? 225 : g / 2) * Math.PI / 180, rl = ra + 16;
    var lado2 = g >= 360 ? '' : linea(V, fin);
    var nFin = g >= 360 ? '' : etiqueta(cx + (R + 12) * Math.cos(t), cy - (R + 12) * Math.sin(t), nombres[2]);
    return F.svg(W, H,
      linea(V, ini) + lado2 + arco + punta + punto(V) + punto(ini) + (g >= 360 ? '' : punto(fin)) +
      etiqueta(cx + 15 * Math.cos(mid + Math.PI), cy - 15 * Math.sin(mid + Math.PI), nombres[0]) +
      etiqueta(ini[0] + 12, ini[1] + 1, nombres[1]) + nFin +
      etiqueta(cx + rl * Math.cos(mid), cy - rl * Math.sin(mid), '&theta;'));
  }

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
      'Seleccione la opci&oacute;n que concentra las caracter&iacute;sticas de un &aacute;ngulo de ' + g + '&deg;.' + dibujoAngulo(r, g),
      P.opciones(r, bien, malas),
      ['Para pasar a radianes multiplica por &pi;/180: ' + g + '&deg; = ' + g + '&pi;/180.',
        'Agudo &lt; 90&deg;, recto = 90&deg;, obtuso entre 90&deg; y 180&deg;, llano = 180&deg;, concavo entre 180&deg; y 360&deg;.'],
      [g + '&deg; &times; &pi;/180 = ' + rad(g) + ' radianes', 'Por su medida es un angulo <b>' + tipo + '</b>']);
  };

  /* 12. Relaciones entre rectas con base en el grafico: una circunferencia con
     dos tangentes paralelas, una recta perpendicular a ellas por el centro y
     otra oblicua. Todo el dibujo se gira un angulo al azar. */
  function rectasGrafico(r) {
    var W = 300, H = 236, cx = 150, cy = 118, R = 48;
    var giro = r.entero(-35, 35) * Math.PI / 180, inc = r.elige([30, 35, 40, 50, 55]) * Math.PI / 180;
    if (r.bool()) inc = -inc;
    function G(x, y) {   // coordenadas locales (centro en 0,0) -> pantalla
      return [cx + x * Math.cos(giro) - y * Math.sin(giro), cy + x * Math.sin(giro) + y * Math.cos(giro)];
    }
    var nombres = r.baraja(['1', '2', '3', '4']);
    function nom(k) { return ELL + '<tspan font-size="10" dy="4">' + nombres[k] + '</tspan>'; }
    function nomHtml(k) { return '<i>' + ELL + '</i><sub>' + nombres[k] + '</sub>'; }
    var nC = r.elige(CURVAS);
    var punteada = ' stroke-dasharray="2 4" stroke-width="1.6"';
    /* 0 y 1: tangentes (arriba y abajo); 2: perpendicular por el centro; 3: oblicua por el centro */
    var t0a = G(-112, -R), t0b = G(112, -R), t1a = G(-112, R), t1b = G(112, R);
    var p2a = G(0, -96), p2b = G(0, 96);
    var L3 = 104, o3a = G(-L3 * Math.cos(inc), -L3 * Math.sin(inc)), o3b = G(L3 * Math.cos(inc), L3 * Math.sin(inc));
    function esquina(x, y, sx, sy) {   // marca de angulo recto en (x,y) de lado 8
      var a = G(x + 8 * sx, y), b = G(x + 8 * sx, y + 8 * sy), c = G(x, y + 8 * sy);
      return '<path class="ac" stroke-width="1.4" d="M' + r1(a[0]) + ' ' + r1(a[1]) + ' L' + r1(b[0]) + ' ' + r1(b[1]) + ' L' + r1(c[0]) + ' ' + r1(c[1]) + '"/>';
    }
    var O = G(0, 0), T0 = G(0, -R), T1 = G(0, R);
    function dentro(q) { return [Math.min(W - 14, Math.max(14, q[0])), Math.min(H - 10, Math.max(12, q[1]))]; }
    var e0 = dentro(G(124, -R)), e1 = dentro(G(124, R)), e2 = dentro(G(0, -108)), e3 = dentro(G(118 * Math.cos(inc), 118 * Math.sin(inc)));
    var eC = G(-R - 14, 0);
    var dib = F.svg(W, H,
      '<circle class="ac" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/>' +
      linea(t0a, t0b) + linea(t1a, t1b) + linea(p2a, p2b, punteada) + linea(o3a, o3b, punteada) +
      esquina(0, -R, 1, 1) + esquina(0, R, 1, -1) +
      punto(O) + punto(T0) + punto(T1) +
      etiqueta(O[0] - 12, O[1] + 4, 'O') +
      etiqueta(e0[0], e0[1], nom(0)) + etiqueta(e1[0], e1[1], nom(1)) +
      etiqueta(e2[0], e2[1], nom(2)) + etiqueta(e3[0], e3[1], nom(3)) +
      etiqueta(eC[0], eC[1], nC));

    var y = ' &nbsp;y&nbsp; ';
    var porRel = {
      'Paralelas': [nomHtml(0) + y + nomHtml(1)],
      'Perpendiculares': [nomHtml(2) + y + nomHtml(0), nomHtml(2) + y + nomHtml(1)],
      'Oblicuas': [nomHtml(3) + y + nomHtml(2), nomHtml(3) + y + nomHtml(0), nomHtml(3) + y + nomHtml(1)],
      'Tangente a ': [nomHtml(0), nomHtml(1)],
      'Secante a ': [nomHtml(2), nomHtml(3)]
    };
    var rels = r.muestra(Object.keys(porRel), 4);
    var filas = r.baraja(rels.map(function (k) { return { izq: r.elige(porRel[k]), rel: k }; }));
    function texto(k) { return /a $/.test(k) ? k + nC : k; }
    var der = r.baraja(Object.keys(porRel)).map(texto);
    var asign = filas.map(function (f) { return der.indexOf(texto(f.rel)); });
    return P.relacione(r, 'Con base en el gr&aacute;fico, identifique las relaciones entre las rectas.' + dib,
      ['Objeto del gr&aacute;fico', 'Relaci&oacute;n'],
      filas.map(function (f) { return f.izq; }), der, asign,
      ['Las rectas que tocan a ' + nC + ' en un solo punto son tangentes; las que pasan por el centro O la cortan en dos puntos: son secantes.',
        'Las dos tangentes nunca se cruzan: son paralelas. La recta con la marca de angulo recto es perpendicular a ellas; la otra que pasa por O las corta inclinada: oblicua.'],
      []);
  }

  /* 12. Relaciones entre rectas (relacione): con dibujo o con ecuaciones */
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

  /* Formulas sugeridas ("Considere ...") que comparten varias formas */
  var CONS_SUMA180 = P.considere('que los &aacute;ngulos interiores de un tri&aacute;ngulo suman 180&deg;.');
  var CONS_COMPLEMENTO = P.considere('que dos &aacute;ngulos complementarios suman 90&deg; y dos suplementarios, 180&deg;.');
  var CONS_PITAGORAS = P.considere('el teorema de Pit&aacute;goras: c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2) + '.');
  function consRazones(extra) {
    return P.considere('sen &theta; = ' + F.frac('cateto opuesto', 'hipotenusa') + ', cos &theta; = ' + F.frac('cateto adyacente', 'hipotenusa') +
      ' y tan &theta; = ' + F.frac('cateto opuesto', 'cateto adyacente') + (extra ? '; ' + extra : '') + '.');
  }

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
    return P.ejercicio(enun + P.considere(form + ' y &pi; = 3.14.'),
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
        ' cm y el cateto ' + sobre('AC', '&mdash;') + ' = ' + ac + ' cm. &iquest;Cu&aacute;l es el valor de la expresi&oacute;n ' + txt + '?' +
        consRazones(exp === 2 ? 'cot &theta; = ' + F.frac(1, 'tan &theta;') : ''),
      P.opciones(r, v, err, { fijo: true, enteros: false }),
      ['Desde el angulo C: el cateto opuesto es AB y el adyacente es AC.',
        'sen = opuesto/hipotenusa, cos = adyacente/hipotenusa, tan = opuesto/adyacente.'],
      ['sen(C) = ' + F.frac(ab, cb) + ', cos(C) = ' + F.frac(ac, cb) + ', tan(C) = ' + F.frac(ab, ac),
        txt + ' = ' + sol + ' = <b>' + P.num(v) + '</b>']);
  };

  /* 17. Circunferencia unitaria: coseno o seno de una suma */
  casos.sumaAngulos = function (r) {
    var a, b;
    do { a = r.elige([10, 20, 30, 40, 50, 60, 70]); b = r.elige([10, 20, 30, 40, 50, 60, 70]); } while (a === b || a + b > 150 || a + b === 90);
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

  /* ================= otras formas de preguntar =================
     Cada reactivo de la guia tiene aqui mas enfoques: el mismo tema visto
     desde otro lado (al reves, con un problema, con un dibujo...). */

  /* numero y fraccion con el signo menos tipografico */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  function fr(a, b) {
    var s = F.simplifica(a, b);
    if (s[1] === 1) return m(s[0]);
    return (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
  }
  function grados(v) { return F.n(v, 2) + '&deg;'; }
  var LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'M', 'N', 'P', 'Q', 'R', 'S'];
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29], [12, 16, 20], [9, 40, 41]];

  /* ---------- 9. definiciones ---------- */
  var DEFS = [
    ['Radio', 'Segmento que une el centro de una circunferencia con cualquier punto de ella.'],
    ['Di&aacute;metro', 'Cuerda que pasa por el centro de la circunferencia.'],
    ['Cuerda', 'Segmento que une dos puntos cualesquiera de una circunferencia.'],
    ['Secante', 'Recta que corta a la circunferencia en dos puntos.'],
    ['Tangente', 'Recta que toca a la circunferencia en un solo punto.'],
    ['Arco', 'Parte de la circunferencia comprendida entre dos de sus puntos.'],
    ['Apotema', 'Segmento que une el centro de un pol&iacute;gono regular con el punto medio de uno de sus lados.'],
    ['Mediatriz', 'Recta perpendicular a un segmento que pasa por su punto medio.'],
    ['Bisectriz', 'Recta que divide a un &aacute;ngulo en dos &aacute;ngulos iguales.'],
    ['Altura de un tri&aacute;ngulo', 'Segmento perpendicular trazado desde un v&eacute;rtice hasta el lado opuesto o su prolongaci&oacute;n.'],
    ['Mediana de un tri&aacute;ngulo', 'Segmento que une un v&eacute;rtice con el punto medio del lado opuesto.'],
    ['Hipotenusa', 'Lado opuesto al &aacute;ngulo recto de un tri&aacute;ngulo rect&aacute;ngulo.'],
    ['Sector circular', 'Regi&oacute;n del c&iacute;rculo limitada por dos radios y el arco que abarcan.'],
    ['Lugar geom&eacute;trico', 'Conjunto de todos los puntos que cumplen una misma condici&oacute;n.']
  ];
  var PISTA_DEFS = ['Piensa en un dibujo de cada inciso y compara con lo que dice la definicion.',
    'Radio: del centro a la orilla. Diametro: de orilla a orilla pasando por el centro. Cuerda: de orilla a orilla por donde sea.'];

  function defTermino(r) {
    var d = r.elige(DEFS);
    return P.ejercicio('&iquest;A qu&eacute; elemento geom&eacute;trico corresponde la siguiente definici&oacute;n?<br><div class="lectura">' + d[1] + '</div>',
      P.opciones(r, d[0], r.muestra(DEFS.filter(function (x) { return x !== d; }), 5).map(function (x) { return x[0]; })),
      PISTA_DEFS, ['Es la definicion de: <b>' + d[0] + '</b>']);
  }

  function defDefinicion(r) {
    var d = r.elige(DEFS);
    return P.ejercicio('&iquest;Cu&aacute;l es la definici&oacute;n de <b>' + d[0].toLowerCase() + '</b>?',
      P.opciones(r, d[1], r.muestra(DEFS.filter(function (x) { return x !== d; }), 5).map(function (x) { return x[1]; })),
      PISTA_DEFS, [d[0] + ': <b>' + d[1] + '</b>']);
  }

  function defLugares(r) {
    var pares = [['Circunferencia', 'Sus puntos est&aacute;n a la misma distancia de un punto fijo llamado centro'],
      ['Par&aacute;bola', 'Sus puntos est&aacute;n a la misma distancia de un punto fijo (foco) y de una recta fija (directriz)'],
      ['Elipse', 'La suma de las distancias de sus puntos a dos puntos fijos (focos) es constante'],
      ['Hip&eacute;rbola', 'La diferencia de las distancias de sus puntos a dos puntos fijos (focos) es constante'],
      ['Mediatriz', 'Sus puntos est&aacute;n a la misma distancia de los extremos de un segmento'],
      ['Bisectriz', 'Sus puntos est&aacute;n a la misma distancia de los lados de un &aacute;ngulo']];
    var elegidos = r.muestra(pares, 4), resto = pares.filter(function (p) { return elegidos.indexOf(p) === -1; });
    var der = r.baraja(elegidos.map(function (p) { return p[1]; }).concat([r.elige(resto)[1]]));
    return P.relacione(r, 'Relacione cada lugar geom&eacute;trico con la condici&oacute;n que cumplen sus puntos.', ['Lugar geom&eacute;trico', 'Condici&oacute;n'],
      elegidos.map(function (p) { return p[0]; }), der, elegidos.map(function (p) { return der.indexOf(p[1]); }),
      ['Elipse: SUMA de distancias a los focos. Hiperbola: DIFERENCIA. Parabola: foco y directriz.',
        'La mediatriz equidista de los extremos de un segmento; la bisectriz, de los lados de un angulo.'], []);
  }

  /* ---------- 10. notacion ---------- */
  function notacionQueEs(r) {
    var L = r.muestra(LETRAS, 4), a = L[0], b = L[1], c = L[2], d = L[3];
    var objs = [
      { s: sobre(a + b, '&mdash;'), o: 'Segmento' },
      { s: sobre(a + b, '&rarr;'), o: 'Semirrecta' },
      { s: sobre(a + b, '&harr;'), o: 'Recta' },
      { s: sobre(a + b, '&#8994;'), o: 'Arco' },
      { s: '&ang;' + a + b + c, o: '&Aacute;ngulo' },
      { s: '&#9651;' + a + b + c, o: 'Tri&aacute;ngulo' },
      { s: sobre(a + b, '&harr;') + ' &#8741; ' + sobre(c + d, '&harr;'), o: 'Rectas paralelas' },
      { s: sobre(a + b, '&harr;') + ' &perp; ' + sobre(c + d, '&harr;'), o: 'Rectas perpendiculares' }
    ];
    var x = r.elige(objs);
    return P.ejercicio('&iquest;Qu&eacute; objeto geom&eacute;trico representa la notaci&oacute;n <span class="expr">' + x.s + '</span>?',
      P.opciones(r, x.o, r.muestra(objs.filter(function (o) { return o !== x; }), 5).map(function (o) { return o.o; })),
      ['Raya arriba sin flechas: segmento. Una flecha: semirrecta. Flecha en los dos lados: recta.',
        '&#8741; significa paralelas y &perp; perpendiculares.'],
      ['La notacion representa: <b>' + x.o + '</b>']);
  }

  function notacionEscribir(r) {
    var L = r.muestra(LETRAS, 3), a = L[0], b = L[1], c = L[2];
    var casos2 = [
      { p: 'la semirrecta que tiene su origen en ' + a + ' y pasa por ' + b, b: sobre(a + b, '&rarr;'),
        m: [sobre(b + a, '&rarr;'), sobre(a + b, '&harr;'), sobre(a + b, '&mdash;')], ex: 'La semirrecta se nombra empezando por su origen.' },
      { p: 'el segmento cuyos extremos son ' + a + ' y ' + b, b: sobre(a + b, '&mdash;'),
        m: [sobre(a + b, '&rarr;'), sobre(a + b, '&harr;'), sobre(a + b, '&#8994;')], ex: 'El segmento lleva una raya sin flechas.' },
      { p: 'la recta que pasa por los puntos ' + a + ' y ' + b, b: sobre(a + b, '&harr;'),
        m: [sobre(a + b, '&rarr;'), sobre(a + b, '&mdash;'), sobre(b + a, '&rarr;')], ex: 'La recta no tiene principio ni fin: flecha en los dos lados.' },
      { p: 'el &aacute;ngulo con v&eacute;rtice en ' + b + ' formado por las semirrectas ' + sobre(b + a, '&rarr;') + ' y ' + sobre(b + c, '&rarr;'),
        b: '&ang;' + a + b + c, m: ['&ang;' + b + a + c, '&ang;' + a + c + b, '&#9651;' + a + b + c], ex: 'El vertice va en medio del nombre del angulo.' }
    ];
    var x = r.elige(casos2);
    return P.ejercicio('&iquest;Cu&aacute;l es la notaci&oacute;n correcta para ' + x.p + '?', P.opciones(r, x.b, x.m),
      ['Fijate en la marca de arriba (raya, una flecha o dos flechas) y en el orden de las letras.', x.ex],
      ['Notacion correcta: <b>' + x.b + '</b>']);
  }

  /* ---------- 11. angulos ---------- */
  function angRadianes(r) {
    var g = r.elige([30, 45, 60, 120, 135, 150, 210, 225, 240, 270, 300, 315, 330]);
    if (r.bool()) {
      return P.ejercicio('&iquest;A cu&aacute;ntos grados equivale un &aacute;ngulo de ' + rad(g) + ' radianes?' + P.considere('&pi; rad = 180&deg;.'),
        P.opciones(r, g, [g / 2, 2 * g, 360 - g, g + 90], { fmt: grados }),
        ['&pi; radianes = 180&deg;: cambia &pi; por 180&deg; y haz la operacion.', 'Por ejemplo, ' + rad(90) + ' = 180&deg;/2 = 90&deg;.'],
        [rad(g) + ' &times; 180&deg;/&pi; = <b>' + g + '&deg;</b>']);
    }
    var otros = [30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330].filter(function (x) { return x !== g; });
    return P.ejercicio('&iquest;A cu&aacute;ntos radianes equivale un &aacute;ngulo de ' + g + '&deg;?' + P.considere('180&deg; = &pi; rad.'),
      P.opciones(r, rad(g) + ' rad', [rad(g / 2), rad(2 * g > 360 ? 2 * g - 360 : 2 * g), rad(360 - g)].concat(r.muestra(otros, 3).map(rad))
        .filter(function (t) { return t !== rad(g); }).map(function (t) { return t + ' rad'; })),
      ['Multiplica los grados por &pi;/180 y simplifica la fraccion.', '180&deg; = &pi;, 90&deg; = &pi;/2, 60&deg; = &pi;/3, 45&deg; = &pi;/4, 30&deg; = &pi;/6.'],
      [g + '&deg; &times; &pi;/180 = <b>' + rad(g) + '</b> rad']);
  }

  function angComplemento(r) {
    var sup = r.bool(), g = sup ? r.entero(15, 165) : r.entero(5, 85), v = (sup ? 180 : 90) - g;
    var malas = sup ? [90 - g, 360 - g, 180 + g, 270 - g] : [180 - g, 360 - g, 90 + g, 270 - g];
    return P.ejercicio('&iquest;Cu&aacute;l es el ' + (sup ? 'suplemento' : 'complemento') + ' de un &aacute;ngulo de ' + g + '&deg;?' + CONS_COMPLEMENTO,
      P.opciones(r, v, malas, { fmt: grados }),
      ['Complementarios: suman 90&deg;. Suplementarios: suman 180&deg;.', 'Resta el angulo de ' + (sup ? '180&deg;' : '90&deg;') + '.'],
      [(sup ? '180&deg;' : '90&deg;') + ' &minus; ' + g + '&deg; = <b>' + v + '&deg;</b>']);
  }

  /* dos paralelas cortadas por una transversal */
  function angParalelas(r) {
    var th = r.elige([35, 40, 50, 55, 60, 65, 70, 75]);
    function val(p) { return p % 2 === 0 ? th : 180 - th; }
    /* posiciones en cada cruce: 0 derecha-arriba, 1 arriba-izquierda, 2 izquierda-abajo, 3 abajo-derecha */
    function interior(i, p) { return i === 0 ? (p === 2 || p === 3) : (p === 0 || p === 1); }
    function lado(p) { return (p === 0 || p === 3) ? 'der' : 'izq'; }
    function nombre(i1, p1, i2, p2) {
      if (i1 === i2) return (p1 + 2) % 4 === p2 ? ['opuestos por el v&eacute;rtice', true] : ['adyacentes (forman un &aacute;ngulo llano)', false];
      if (p1 === p2) return ['correspondientes', true];
      var in1 = interior(i1, p1), in2 = interior(i2, p2);
      if (in1 !== in2) return null;
      var mismo = lado(p1) === lado(p2);
      return [(mismo ? 'conjugados ' : 'alternos ') + (in1 ? 'internos' : 'externos'), !mismo];
    }
    var pares = [];
    for (var i1 = 0; i1 < 2; i1++) for (var p1 = 0; p1 < 4; p1++) for (var i2 = 0; i2 < 2; i2++) for (var p2 = 0; p2 < 4; p2++) {
      if (i1 === i2 && p1 === p2) continue;
      var n = nombre(i1, p1, i2, p2);
      if (n) pares.push([i1, p1, i2, p2, n]);
    }
    var e = r.elige(pares), x = val(e[3]), dado = val(e[1]);
    /* dibujo */
    var W = 300, H = 210, y = [72, 148], esp = r.bool();
    var dx = (y[1] - y[0]) / Math.tan(th * Math.PI / 180);
    var cruce = [[150 + dx / 2, y[0]], [150 - dx / 2, y[1]]];
    function X(p) { return esp ? [W - p[0], p[1]] : p; }
    var u = [Math.cos(th * Math.PI / 180), -Math.sin(th * Math.PI / 180)];
    var rayos = [[1, 0], u, [-1, 0], [-u[0], -u[1]]];   // derecha, sube, izquierda, baja
    function marca(i, p, txt, R) {
      var c = cruce[i], a = rayos[p], b = rayos[(p + 1) % 4];
      var bis = [a[0] + b[0], a[1] + b[1]], L = Math.sqrt(bis[0] * bis[0] + bis[1] * bis[1]);
      var pa = X([c[0] + a[0] * R, c[1] + a[1] * R]), pb = X([c[0] + b[0] * R, c[1] + b[1] * R]);
      var cruz = a[0] * b[1] - a[1] * b[0];
      var barrido = (cruz > 0) !== esp ? 1 : 0;
      var t = X([c[0] + bis[0] / L * (R + 16), c[1] + bis[1] / L * (R + 16)]);
      return '<path class="ac" stroke-width="1.6" d="M' + r1(pa[0]) + ' ' + r1(pa[1]) + ' A' + R + ' ' + R + ' 0 0 ' + barrido + ' ' + r1(pb[0]) + ' ' + r1(pb[1]) + '"/>' +
        etiqueta(t[0], t[1], txt);
    }
    var ext = 62;
    var t0 = X([cruce[1][0] - u[0] * ext, cruce[1][1] - u[1] * ext]), t1 = X([cruce[0][0] + u[0] * ext, cruce[0][1] + u[1] * ext]);
    function paralelita(yy) {   // la marca de paralelas sobre cada recta
      var px = X([255, yy]);
      return '<path stroke-width="1.6" d="M' + (px[0] - 4) + ' ' + (yy - 5) + ' L' + (px[0] + 3) + ' ' + yy + ' L' + (px[0] - 4) + ' ' + (yy + 5) + '"/>';
    }
    var dib = F.svg(W, H,
      linea(X([12, y[0]]), X([288, y[0]])) + linea(X([12, y[1]]), X([288, y[1]])) + paralelita(y[0]) + paralelita(y[1]) +
      linea(t0, t1) + punto(X(cruce[0])) + punto(X(cruce[1])) +
      marca(e[0], e[1], dado + '&deg;', 13) + marca(e[2], e[3], 'x', 21));
    var rel = e[4];
    return P.ejercicio('En la figura, las dos rectas horizontales son paralelas y las corta una transversal. &iquest;Cu&aacute;nto mide el &aacute;ngulo x?' + dib +
      P.considere('que entre paralelas los &aacute;ngulos correspondientes, los alternos y los opuestos por el v&eacute;rtice son iguales, y los conjugados y los adyacentes suman 180&deg;.'),
      P.opciones(r, x, [180 - x, 90 - x, 360 - x, x / 2, 90 + x], { fmt: grados }),
      ['Los angulos marcados son ' + rel[0] + '.', 'Entre paralelas, los angulos que se ven "iguales" miden lo mismo; los que no, suman 180&deg;.'],
      ['Son angulos ' + rel[0] + ': ' + (rel[1] ? 'son iguales' : 'suman 180&deg;'),
        'x = ' + (rel[1] ? dado + '&deg;' : '180&deg; &minus; ' + dado + '&deg;') + ' = <b>' + x + '&deg;</b>']);
  }

  function angPoligono(r) {
    var pol = r.elige([[5, 'pent&aacute;gono'], [6, 'hex&aacute;gono'], [8, 'oct&aacute;gono'], [9, 'ene&aacute;gono'], [10, 'dec&aacute;gono'], [12, 'dodec&aacute;gono']]);
    var n = pol[0], tipo = r.entero(0, 2), suma = (n - 2) * 180, enun, v, malas, sol;
    if (tipo === 0) {
      enun = '&iquest;Cu&aacute;nto suman los &aacute;ngulos interiores de un ' + pol[1] + '?';
      v = suma; malas = [n * 180, (n - 1) * 180, 360, (n - 2) * 90]; sol = 'S = (n &minus; 2) &times; 180&deg; = (' + n + ' &minus; 2) &times; 180&deg; = <b>' + v + '&deg;</b>';
    } else if (tipo === 1) {
      enun = '&iquest;Cu&aacute;nto mide cada &aacute;ngulo interior de un ' + pol[1] + ' regular?';
      v = suma / n; malas = [360 / n, suma, 180 / n, suma / (n - 1)]; sol = 'Suma: ' + suma + '&deg;; cada uno: ' + suma + '&deg; &divide; ' + n + ' = <b>' + F.n(v, 2) + '&deg;</b>';
    } else {
      enun = '&iquest;Cu&aacute;nto mide cada &aacute;ngulo exterior de un ' + pol[1] + ' regular?';
      v = 360 / n; malas = [suma / n, 180 / n, 360 / (n - 2), 360 * n / 10]; sol = 'Los exteriores siempre suman 360&deg;: 360&deg; &divide; ' + n + ' = <b>' + F.n(v, 2) + '&deg;</b>';
    }
    var cons = tipo === 2 ? 'que los &aacute;ngulos exteriores de cualquier pol&iacute;gono suman 360&deg;.'
      : 'S = (n &minus; 2) &times; 180&deg;' + (tipo === 1 ? ' y que en un pol&iacute;gono regular todos los &aacute;ngulos interiores son iguales.' : '.');
    return P.ejercicio(enun + P.considere(cons), P.opciones(r, v, malas, { fmt: grados, dec: 2 }),
      ['Los angulos interiores de un poligono de n lados suman (n &minus; 2) &times; 180&deg;.', 'Los exteriores de cualquier poligono suman 360&deg;; si es regular, todos son iguales.'],
      ['Un ' + pol[1] + ' tiene ' + n + ' lados', sol]);
  }

  function angEcuacion(r) {
    var total = r.elige([90, 180]), x, a1, b1, a2, b2;
    do { x = r.entero(5, 30); a1 = r.entero(1, 5); a2 = r.entero(1, 5); b1 = r.entero(-20, 30); b2 = total - (a1 + a2) * x - b1; }
    while (a1 * x + b1 <= 0 || a2 * x + b2 <= 0 || Math.abs(b2) > 60 || b2 === 0 || b1 === 0);
    function lin(a, b) { return '(' + (a === 1 ? '' : a) + 'x ' + (b > 0 ? '+ ' + b : '&minus; ' + (-b)) + ')&deg;'; }
    var otro = total === 90 ? 180 : 90;
    var malas = [(otro - b1 - b2) / (a1 + a2), (total + b1 + b2) / (a1 + a2), total / (a1 + a2), x + 5];
    return P.ejercicio('Dos &aacute;ngulos son ' + (total === 90 ? 'complementarios' : 'suplementarios') + ' y miden ' + lin(a1, b1) + ' y ' + lin(a2, b2) +
      '. &iquest;Cu&aacute;l es el valor de x?' + CONS_COMPLEMENTO,
      P.opciones(r, x, malas, { dec: 2 }),
      [(total === 90 ? 'Complementarios' : 'Suplementarios') + ': la suma de los dos es ' + total + '&deg;.', 'Junta las x y los numeros y despeja.'],
      [lin(a1, b1).replace('&deg;', '') + ' + ' + lin(a2, b2).replace('&deg;', '') + ' = ' + total,
        (a1 + a2) + 'x + ' + P.np(b1 + b2) + ' = ' + total + ' &rarr; x = <b>' + x + '</b>']);
  }

  /* ---------- 12. rectas ---------- */
  /* y = (num/den)x + b bien escrita */
  function rectaTxt(num, den, b) {
    var s = F.simplifica(num, den), coef;
    if (s[1] === 1) coef = s[0] === 1 ? '' : s[0] === -1 ? '&minus;' : m(s[0]);
    else coef = (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
    var cte = b === 0 ? '' : b > 0 ? ' + ' + F.n(b) : ' &minus; ' + F.n(-b);
    return 'y = ' + coef + 'x' + cte;
  }

  function pendienteParPerp(r) {
    var mm = r.elige([[2, 1], [3, 1], [-2, 1], [-3, 1], [1, 2], [2, 3], [-3, 4], [3, 2], [-1, 3], [4, 1], [-5, 2], [5, 3]]);
    var b = r.enteroNoCero(-9, 9), perp = r.bool(0.6);
    var bien = perp ? fr(-mm[1], mm[0]) : fr(mm[0], mm[1]);
    var malas = [fr(mm[0], mm[1]), fr(-mm[0], mm[1]), fr(mm[1], mm[0]), fr(-mm[1], mm[0]), m(b)];
    return P.ejercicio('&iquest;Cu&aacute;l es la pendiente de una recta ' + (perp ? 'perpendicular' : 'paralela') + ' a <span class="expr">' + rectaTxt(mm[0], mm[1], b) + '</span>?' +
      P.considere('que en y = mx + b la pendiente es m; las paralelas tienen la misma pendiente y las perpendiculares cumplen m<sub>1</sub> &middot; m<sub>2</sub> = &minus;1.'),
      P.opciones(r, bien, malas),
      ['Paralelas: tienen la MISMA pendiente. Perpendiculares: sus pendientes multiplicadas dan &minus;1.',
        'Para la perpendicular voltea la fraccion y cambiale el signo.'],
      ['Pendiente de la recta dada: ' + fr(mm[0], mm[1]), (perp ? 'Perpendicular: &minus;1 / (' + fr(mm[0], mm[1]) + ')' : 'Paralela: la misma') + ' = <b>' + bien + '</b>']);
  }

  function rectasGeneral(r) {
    function ec(A, B, C) {
      if (A < 0 || (A === 0 && B < 0)) { A = -A; B = -B; C = -C; }
      var t = (A === 0 ? '' : (A === 1 ? '' : A) + 'x') + (B === 0 ? '' : (A === 0 ? (B < 0 ? '&minus;' : '') : (B < 0 ? ' &minus; ' : ' + ')) + (Math.abs(B) === 1 ? '' : Math.abs(B)) + 'y');
      return t + ' = ' + m(C);
    }
    var p, q, k1, k2, tipo = r.entero(0, 3), A2, B2, C2, s = r.entero(2, 3);
    do { p = r.enteroNoCero(-4, 4); q = r.entero(1, 4); } while (F.mcd(Math.abs(p), q) !== 1);
    k1 = r.enteroNoCero(-6, 6); k2 = r.enteroNoCero(-6, 6);
    while (k2 === k1) k2 = r.enteroNoCero(-6, 6);
    var A1 = p, B1 = -q, C1 = -q * k1;                 // y = (p/q)x + k1  ->  px - qy = -q k1
    if (tipo === 0) { A2 = p * s; B2 = -q * s; C2 = -q * k2 * s; }
    else if (tipo === 1) { A2 = -q; B2 = -p; C2 = -p * k2; }   // y = (-q/p)x + k2
    else if (tipo === 2) { A2 = p * s; B2 = -q * s; C2 = -q * k1 * s; }
    else {
      var p2 = p + q * r.elige([1, 2]), q2 = q;        // otra pendiente que no es perpendicular
      if (p * p2 === -q * q2) p2 += q;
      A2 = p2; B2 = -q2; C2 = -q2 * k2;
    }
    var NOM = ['Paralelas', 'Perpendiculares', 'Coincidentes', 'Oblicuas (se cortan sin formar &aacute;ngulo recto)'];
    var m1 = fr(p, q), m2 = fr(-A2, B2);
    return P.ejercicio('Las rectas <span class="expr">' + ec(A1, B1, C1) + '</span> y <span class="expr">' + ec(A2, B2, C2) + '</span> son:' +
      P.considere('que la recta Ax + By = C tiene pendiente m = &minus;A/B; las paralelas tienen la misma pendiente y las perpendiculares cumplen m<sub>1</sub> &middot; m<sub>2</sub> = &minus;1.'),
      P.opciones(r, NOM[tipo], NOM.filter(function (_, i) { return i !== tipo; })),
      ['Despeja y en cada ecuacion para ver su pendiente (y su ordenada al origen).',
        'Misma pendiente: paralelas (o la misma recta si tambien coincide la ordenada). Pendientes que multiplicadas dan &minus;1: perpendiculares.'],
      ['Pendientes: m<sub>1</sub> = ' + m1 + ', m<sub>2</sub> = ' + m2, 'Son <b>' + NOM[tipo].toLowerCase() + '</b>']);
  }

  function rectaPorPunto(r) {
    var mm = r.enteroNoCero(-4, 4), b = r.enteroNoCero(-8, 8), perp = r.bool();
    var x0 = perp ? mm * r.enteroNoCero(-2, 2) : r.enteroNoCero(-4, 4), y0 = r.entero(-6, 6);
    var num = perp ? -1 : mm, den = perp ? mm : 1;     // pendiente de la recta buscada
    var b2 = y0 - num * x0 / den;
    var bien = rectaTxt(num, den, b2);
    var malas = [rectaTxt(num, den, y0), rectaTxt(num, den, y0 + num * x0 / den), rectaTxt(perp ? mm : -1, perp ? 1 : mm, b2), rectaTxt(mm, 1, b)];
    return P.ejercicio('&iquest;Cu&aacute;l es la ecuaci&oacute;n de la recta que pasa por el punto (' + m(x0) + ', ' + m(y0) + ') y es ' + (perp ? 'perpendicular' : 'paralela') +
      ' a <span class="expr">' + rectaTxt(mm, 1, b) + '</span>?' +
      P.considere('y &minus; y<sub>1</sub> = m(x &minus; x<sub>1</sub>); las paralelas tienen la misma pendiente y las perpendiculares cumplen m<sub>1</sub> &middot; m<sub>2</sub> = &minus;1.'),
      P.opciones(r, bien, malas),
      ['Primero la pendiente: ' + (perp ? 'la perpendicular es &minus;1/' + m(mm) : 'la paralela es la misma, ' + m(mm)) + '.',
        'Luego punto-pendiente: y &minus; y<sub>1</sub> = m(x &minus; x<sub>1</sub>), y despeja y.'],
      ['m = ' + fr(num, den), 'y &minus; ' + P.np(y0) + ' = ' + fr(num, den) + '(x &minus; ' + P.np(x0) + ')', 'Ecuacion: <b>' + bien + '</b>']);
  }

  /* ---------- 13. triangulos ---------- */
  function tipoPorAngulo(c) { return c < 90 ? 'acut&aacute;ngulo' : c === 90 ? 'rect&aacute;ngulo' : 'obtus&aacute;ngulo'; }

  function triTercerAngulo(r) {
    var a, b, c;
    do { a = r.entero(15, 100); b = r.entero(15, 100); c = 180 - a - b; } while (c < 10 || a === b);
    if (r.bool(0.35)) { a = r.entero(20, 70); b = 90 - a; c = 90; }
    var mayor = Math.max(a, b, c), tipo = tipoPorAngulo(mayor);
    function op(g, t) { return g + '&deg;, ' + t; }
    var tipos = ['acut&aacute;ngulo', 'rect&aacute;ngulo', 'obtus&aacute;ngulo'];
    var malas = tipos.filter(function (t) { return t !== tipo; }).map(function (t) { return op(c, t); });
    var s = a + b;
    if (s < 180) malas.push(op(s, tipoPorAngulo(Math.max(a, b, s))));
    malas.push(op(360 - a - b, 'obtus&aacute;ngulo'));
    return P.ejercicio('Dos &aacute;ngulos de un tri&aacute;ngulo miden ' + a + '&deg; y ' + b + '&deg;. &iquest;Cu&aacute;nto mide el tercer &aacute;ngulo y c&oacute;mo se clasifica el tri&aacute;ngulo?' + CONS_SUMA180,
      P.opciones(r, op(c, tipo), malas),
      ['Los tres angulos de un triangulo suman 180&deg;.', 'Se clasifica por su angulo mayor: menor de 90&deg; acutangulo, 90&deg; rectangulo, mayor de 90&deg; obtusangulo.'],
      ['Tercer angulo: 180&deg; &minus; ' + a + '&deg; &minus; ' + b + '&deg; = ' + c + '&deg;', 'El mayor mide ' + mayor + '&deg;: es <b>' + tipo + '</b>']);
  }

  function triDesigualdad(r) {
    var si = r.bool(0.6), buenas = [], malas = [];
    while (buenas.length < 4 || malas.length < 4) {
      var a = r.entero(2, 12), b = r.entero(2, 12), c = r.entero(2, 20);
      var l = [a, b, c].sort(function (x, y) { return x - y; });
      var t = l[0] + ' cm, ' + l[1] + ' cm y ' + l[2] + ' cm';
      if (l[0] + l[1] > l[2]) { if (buenas.length < 4 && buenas.indexOf(t) === -1) buenas.push(t); }
      else if (malas.length < 4 && malas.indexOf(t) === -1) malas.push(t);
    }
    var bien = si ? buenas[0] : malas[0], otras = si ? malas.slice(0, 3) : buenas.slice(0, 3);
    return P.ejercicio('&iquest;Con cu&aacute;l de las siguientes medidas ' + (si ? 'S&Iacute;' : 'NO') + ' es posible construir un tri&aacute;ngulo?' +
      P.considere('que en todo tri&aacute;ngulo cada lado es menor que la suma de los otros dos.'),
      P.opciones(r, bien, otras),
      ['Desigualdad del triangulo: la suma de los dos lados mas chicos debe ser MAYOR que el lado mas grande.',
        'Si los dos chicos suman igual o menos que el grande, no alcanzan a cerrar el triangulo.'],
      ['Con ' + bien + ': ' + (si ? 'los dos menores suman mas que el mayor' : 'los dos menores no superan al mayor') + ' &rarr; <b>' + bien + '</b>']);
  }

  function triPitagoras(r) {
    var t = r.elige(TRIPLES), k = r.elige([1, 1, 2]), a = t[0] * k, b = t[1] * k, c = t[2] * k;
    var ctx = r.entero(0, 3), enun, v, malas;
    if (ctx === 0) {
      enun = 'Los catetos de un tri&aacute;ngulo rect&aacute;ngulo miden ' + a + ' cm y ' + b + ' cm. &iquest;Cu&aacute;nto mide la hipotenusa?';
      v = c; malas = [a + b, Math.round(Math.sqrt(b * b - a * a) * 100) / 100, (a + b) / 2, a * b / 2];
    } else if (ctx === 1) {
      enun = 'La hipotenusa de un tri&aacute;ngulo rect&aacute;ngulo mide ' + c + ' cm y uno de sus catetos mide ' + a + ' cm. &iquest;Cu&aacute;nto mide el otro cateto?';
      v = b; malas = [c - a, Math.round(Math.sqrt(c * c + a * a) * 100) / 100, (c + a) / 2, c * a / 10];
    } else if (ctx === 2) {
      enun = 'Una escalera de ' + c + ' m se apoya en una pared y su pie queda a ' + a + ' m de la pared. &iquest;A qu&eacute; altura de la pared llega?';
      v = b; malas = [c - a, Math.round(Math.sqrt(c * c + a * a) * 100) / 100, c + a, (c + a) / 2];
    } else {
      enun = 'Un terreno rectangular mide ' + a + ' m de ancho y ' + b + ' m de largo. &iquest;Cu&aacute;nto mide su diagonal?';
      v = c; malas = [a + b, 2 * (a + b), Math.round(Math.sqrt(b * b - a * a) * 100) / 100, (a + b) / 2];
    }
    var u = ctx >= 2 ? 'm' : 'cm';
    return P.ejercicio(enun + P.considere('el teorema de Pit&aacute;goras: c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2) + '.'),
      P.opciones(r, v, malas, { unidad: u, dec: 2 }),
      ['La hipotenusa es el lado mas largo, el que esta frente al angulo recto.',
        'Si buscas la hipotenusa SUMA los cuadrados; si buscas un cateto RESTA al cuadrado de la hipotenusa.'],
      [ctx === 0 || ctx === 3 ? 'c = &radic;(' + a + F.sup(2) + ' + ' + b + F.sup(2) + ') = &radic;' + (c * c) + ' = <b>' + c + ' ' + u + '</b>'
        : 'b = &radic;(' + c + F.sup(2) + ' &minus; ' + a + F.sup(2) + ') = &radic;' + (b * b) + ' = <b>' + b + ' ' + u + '</b>']);
  }

  function triExterior(r) {
    var a = r.entero(25, 80), b = r.entero(25, 80), ext = a + b;
    while (ext >= 175) { b -= 10; ext = a + b; }
    return P.ejercicio('Un &aacute;ngulo exterior de un tri&aacute;ngulo mide ' + ext + '&deg; y uno de los dos &aacute;ngulos interiores que no son adyacentes a &eacute;l mide ' + a +
      '&deg;. &iquest;Cu&aacute;nto mide el otro &aacute;ngulo interior no adyacente?' + P.considere('que un &aacute;ngulo exterior de un tri&aacute;ngulo es igual a la suma de los dos interiores no adyacentes.'),
      P.opciones(r, b, [180 - ext, 180 - a, ext + a, 180 - b - a], { fmt: grados }),
      ['Un angulo exterior es igual a la SUMA de los dos interiores que no estan pegados a el.', 'Asi que el que falta es el exterior menos el que conoces.'],
      [ext + '&deg; = ' + a + '&deg; + x &rarr; x = <b>' + b + '&deg;</b>']);
  }

  var CONS_ISOSCELES = P.considere('que los &aacute;ngulos interiores de un tri&aacute;ngulo suman 180&deg; y que en un tri&aacute;ngulo is&oacute;sceles los dos &aacute;ngulos de la base son iguales.');
  function triIsosceles(r) {
    var desigual, igual;
    do { desigual = r.entero(10, 160); } while (desigual % 2 !== 0);
    igual = (180 - desigual) / 2;
    if (r.bool()) {
      return P.ejercicio('En un tri&aacute;ngulo is&oacute;sceles, el &aacute;ngulo desigual mide ' + desigual + '&deg;. &iquest;Cu&aacute;nto mide cada uno de los otros dos &aacute;ngulos?' + CONS_ISOSCELES,
        P.opciones(r, igual, [180 - desigual, desigual, desigual / 2, 90 - desigual / 4], { fmt: grados, dec: 2 }),
        ['En un isosceles los dos angulos de la base son iguales.', 'Quita el desigual a 180&deg; y reparte lo que queda entre dos.'],
        ['(180&deg; &minus; ' + desigual + '&deg;) / 2 = <b>' + igual + '&deg;</b>']);
    }
    return P.ejercicio('En un tri&aacute;ngulo is&oacute;sceles, cada uno de los &aacute;ngulos iguales mide ' + igual + '&deg;. &iquest;Cu&aacute;nto mide el &aacute;ngulo desigual?' + CONS_ISOSCELES,
      P.opciones(r, desigual, [180 - igual, 2 * igual, 90 - igual, igual], { fmt: grados, dec: 2 }),
      ['Los dos angulos iguales suman ' + (2 * igual) + '&deg;.', 'Lo que falta para 180&deg; es el angulo desigual.'],
      ['180&deg; &minus; 2(' + igual + '&deg;) = <b>' + desigual + '&deg;</b>']);
  }

  /* ---------- 14. semejanza ---------- */
  function semSombras(r) {
    var per = r.elige([[1.5, 0.5], [1.6, 0.8], [1.8, 1.2], [1.5, 1], [1.6, 1.2], [1.8, 0.6], [1.7, 0.5]]);
    var k = per[0] / per[1], S = r.entero(2, 9);
    var H = F.redondea(S * k, 2);
    var cosa = r.elige(['un poste', 'un &aacute;rbol', 'un edificio peque&ntilde;o', 'una antena']);
    return P.ejercicio('A cierta hora del d&iacute;a, ' + cosa + ' proyecta una sombra de ' + S + ' m. A la misma hora, una persona de ' + P.num(per[0]) +
      ' m de estatura proyecta una sombra de ' + P.num(per[1]) + ' m. &iquest;Cu&aacute;l es la altura de ' + cosa.replace(/^un[a]? /, function (t) { return t === 'una ' ? 'la ' : 'el '; }) + '?' +
      P.considere('que a la misma hora las alturas y las sombras son proporcionales: ' + F.frac('altura<sub>1</sub>', 'sombra<sub>1</sub>') + ' = ' + F.frac('altura<sub>2</sub>', 'sombra<sub>2</sub>') + '.'),
      P.opciones(r, H, [S * per[1] / per[0], S * per[0], S + per[0] - per[1], S / per[0]].map(function (v) { return F.redondea(v, 2); }), { unidad: 'm', dec: 2 }),
      ['Los rayos del sol llegan con el mismo angulo: los dos triangulos (objeto-sombra) son semejantes.',
        'Altura / sombra es la misma razon: ' + P.num(per[0]) + ' / ' + P.num(per[1]) + ' = h / ' + S + '.'],
      ['h = ' + S + ' &times; ' + P.num(per[0]) + ' / ' + P.num(per[1]) + ' = <b>' + F.n(H, 2) + ' m</b>']);
  }

  /* teorema de Tales: tres paralelas cortadas por dos transversales */
  function semTales(r) {
    var a, b, d, x;
    do { a = r.entero(2, 9); b = r.entero(2, 12); d = r.entero(2, 12); x = d * b / a; }
    while (a === b || x !== Math.round(x * 10) / 10 || x > 40 || Math.max(a, b) / Math.min(a, b) > 2.5);
    var L = r.muestra(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'P', 'Q', 'R', 'S'], 6);
    var W = 300, H = 210, y0 = 28, esc = 150 / (a + b);
    var ys = [y0, y0 + a * esc, y0 + (a + b) * esc];
    /* dos transversales que no se cruzan dentro del dibujo */
    var k1 = r.elige([0.2, 0.3, 0.4]), k2 = r.elige([-0.25, -0.15, 0.1]);
    function sobreT(x0, k) { return ys.map(function (yy) { return [x0 + k * (yy - y0), yy]; }); }
    var t1 = sobreT(62, k1), t2 = sobreT(238, k2);
    var s = '';
    ys.forEach(function (yy) { s += linea([10, yy], [290, yy]); });
    function prolonga(p, q) { var dx = q[0] - p[0], dy = q[1] - p[1]; return [[p[0] - dx * 0.12, p[1] - dy * 0.12], [q[0] + dx * 0.08, q[1] + dy * 0.08]]; }
    var e1 = prolonga(t1[0], t1[2]), e2 = prolonga(t2[0], t2[2]);
    s += linea(e1[0], e1[1]) + linea(e2[0], e2[1]);
    t1.concat(t2).forEach(function (p) { s += punto(p); });
    s += etiqueta(t1[0][0] - 12, t1[0][1] - 9, L[0]) + etiqueta(t1[1][0] - 12, t1[1][1] - 9, L[1]) + etiqueta(t1[2][0] - 12, t1[2][1] - 9, L[2]);
    s += etiqueta(t2[0][0] + 12, t2[0][1] - 9, L[3]) + etiqueta(t2[1][0] + 12, t2[1][1] - 9, L[4]) + etiqueta(t2[2][0] + 12, t2[2][1] - 9, L[5]);
    function medio(p, q, dx, txt) { return etiqueta((p[0] + q[0]) / 2 + dx, (p[1] + q[1]) / 2, txt, 'ac-relleno'); }
    s += medio(t1[0], t1[1], -16, String(a)) + medio(t1[1], t1[2], -16, String(b)) + medio(t2[0], t2[1], 16, String(d)) + medio(t2[1], t2[2], 16, 'x');
    var dib = F.svg(W, H, s);
    return P.ejercicio('En la figura, las tres rectas horizontales son paralelas. Si ' + sobre(L[0] + L[1], '&mdash;') + ' = ' + a + ', ' + sobre(L[1] + L[2], '&mdash;') + ' = ' + b +
      ' y ' + sobre(L[3] + L[4], '&mdash;') + ' = ' + d + ', &iquest;cu&aacute;nto mide x = ' + sobre(L[4] + L[5], '&mdash;') + '?' + dib +
      P.considere('el teorema de Tales: las paralelas cortan a las dos transversales en segmentos proporcionales.'),
      P.opciones(r, x, [d * a / b, d + b - a, a * b / d, d * b], { dec: 1 }),
      ['Teorema de Tales: paralelas cortan a las transversales en segmentos proporcionales.',
        'Plantea ' + F.frac(L[0] + L[1], L[1] + L[2]) + ' = ' + F.frac(L[3] + L[4], L[4] + L[5]) + '.'],
      [F.frac(a, b) + ' = ' + F.frac(d, 'x') + ' &rarr; x = ' + d + ' &times; ' + b + ' / ' + a + ' = <b>' + F.n(x) + '</b>']);
  }

  var CONS_ESCALA = P.considere('que si las medidas se multiplican por k, los per&iacute;metros se multiplican por k, las &aacute;reas por k' + F.sup(2) + ' y los vol&uacute;menes por k' + F.sup(3) + '.');
  function semRazonAreas(r) {
    var k = r.entero(2, 5), tipo = r.entero(0, 2), base = r.entero(2, 12), v, malas, enun, u;
    if (tipo === 0) {
      enun = 'Dos tri&aacute;ngulos son semejantes y la raz&oacute;n de semejanza del mayor al menor es ' + k + '. Si el &aacute;rea del menor es ' + base +
        ' cm' + F.sup(2) + ', &iquest;cu&aacute;l es el &aacute;rea del mayor?';
      v = base * k * k; malas = [base * k, base * k * k * k, base + k, base * 2 * k]; u = 'cm' + F.sup(2);
    } else if (tipo === 1) {
      enun = 'Dos cubos son semejantes y la arista del mayor es ' + k + ' veces la del menor. Si el volumen del menor es ' + base + ' cm' + F.sup(3) +
        ', &iquest;cu&aacute;l es el volumen del mayor?';
      v = base * k * k * k; malas = [base * k, base * k * k, base * 3 * k, base + k * k * k]; u = 'cm' + F.sup(3);
    } else {
      enun = 'Dos pol&iacute;gonos son semejantes y la raz&oacute;n de semejanza del mayor al menor es ' + k + '. Si el per&iacute;metro del menor es ' + base +
        ' cm, &iquest;cu&aacute;l es el per&iacute;metro del mayor?';
      v = base * k; malas = [base * k * k, base + k, base * k * k * k, base * 2]; u = 'cm';
    }
    return P.ejercicio(enun + CONS_ESCALA, P.opciones(r, v, malas, { unidad: u }),
      ['Si las longitudes se multiplican por k, las areas se multiplican por k' + F.sup(2) + ' y los volumenes por k' + F.sup(3) + '.',
        'El perimetro es una longitud: se multiplica solo por k.'],
      ['k = ' + k + ' &rarr; factor ' + (tipo === 0 ? 'k' + F.sup(2) + ' = ' + (k * k) : tipo === 1 ? 'k' + F.sup(3) + ' = ' + (k * k * k) : 'k = ' + k),
        base + ' &times; ' + (v / base) + ' = <b>' + v + ' ' + u + '</b>']);
  }

  function semCriterios(r) {
    var C = [['Tienen sus &aacute;ngulos correspondientes iguales', '&Aacute;ngulo - &aacute;ngulo - &aacute;ngulo (AAA)'],
      ['Sus tres lados correspondientes son proporcionales', 'Lado - lado - lado (LLL)'],
      ['Dos lados son proporcionales y el &aacute;ngulo que forman es igual', 'Lado - &aacute;ngulo - lado (LAL)']];
    var c = r.elige(C);
    return P.ejercicio('Dos tri&aacute;ngulos cumplen la siguiente condici&oacute;n. &iquest;Qu&eacute; criterio de semejanza se aplica?<br><div class="lectura">' + c[0] + '.</div>',
      P.opciones(r, c[1], C.filter(function (x) { return x !== c; }).map(function (x) { return x[1]; }).concat(['&Aacute;ngulo - lado - &aacute;ngulo (ALA)'])),
      ['AAA: los angulos correspondientes iguales. LLL: los tres lados en la misma proporcion.', 'LAL: dos lados proporcionales y el angulo ENTRE ellos igual.'],
      ['Criterio: <b>' + c[1] + '</b>']);
  }

  function semEscala(r) {
    var esc = r.elige([10000, 20000, 25000, 50000, 100000, 250000]), cm = r.entero(2, 15);
    var km = cm * esc / 100000;
    return P.ejercicio('En un mapa con escala 1:' + P.num(esc, 0).replace(/ /g, ',') + ', dos pueblos est&aacute;n separados ' + cm +
      ' cm. &iquest;Cu&aacute;l es la distancia real entre ellos?' + P.considere('que en la escala 1:n, 1 cm del mapa equivale a n cm reales, y que 1 km = 100 000 cm.'),
      P.opciones(r, km, [km * 10, km / 10, cm * esc / 1000, km * 100], { unidad: 'km', dec: 3 }),
      ['1:' + esc + ' quiere decir que 1 cm del mapa son ' + esc + ' cm reales.', 'Para pasar de centimetros a kilometros divide entre 100 000.'],
      [cm + ' &times; ' + esc + ' = ' + P.num(cm * esc, 0) + ' cm', P.num(cm * esc, 0) + ' cm &divide; 100 000 = <b>' + F.n(km, 3) + ' km</b>']);
  }

  /* ---------- 15. volumenes y areas ---------- */
  function volPrismaPiramide(r) {
    var tipo = r.entero(0, 2), a = r.entero(2, 12), b = r.entero(2, 12), h = r.entero(3, 15), v, malas, enun, form;
    if (tipo === 0) {
      enun = 'Determine el volumen de una pir&aacute;mide de base cuadrada de ' + a + ' cm de lado y ' + h + ' cm de altura.';
      v = a * a * h / 3; malas = [a * a * h, a * a * h / 2, 4 * a * h / 3, a * h / 3]; form = 'V = (&aacute;rea de la base &times; h) / 3';
    } else if (tipo === 1) {
      enun = 'Determine el volumen de un prisma rectangular de ' + a + ' cm de largo, ' + b + ' cm de ancho y ' + h + ' cm de altura.';
      v = a * b * h; malas = [a * b * h / 3, 2 * (a * b + a * h + b * h), a * b + h, a * b * h / 2]; form = 'V = largo &times; ancho &times; altura';
    } else {
      enun = 'Determine el volumen de un prisma triangular cuya base es un tri&aacute;ngulo de ' + a + ' cm de base y ' + b + ' cm de altura, y que mide ' + h + ' cm de largo.';
      v = a * b * h / 2; malas = [a * b * h, a * b * h / 3, a * b / 2 + h, a * b * h / 6]; form = 'V = (b &times; h / 2) &times; largo';
    }
    return P.ejercicio(enun + P.considere(form + '.'), P.opciones(r, v, malas, { unidad: 'cm' + F.sup(3), dec: 2 }),
      ['Prismas: area de la base por la altura. Piramides y conos: lo mismo dividido entre 3.', form + '.'],
      [form, 'V = <b>' + F.n(v, 2) + ' cm' + F.sup(3) + '</b>']);
  }

  function volDespeje(r) {
    var rr = r.entero(2, 8), h = r.entero(3, 20), V = F.redondea(3.14 * rr * rr * h, 2);
    var cono = r.bool(0.35);
    if (cono) V = F.redondea(3.14 * rr * rr * h / 3, 2);
    return P.ejercicio('Un ' + (cono ? 'cono' : 'cilindro') + ' tiene un volumen de ' + P.num(V) + ' cm' + F.sup(3) + ' y un radio de ' + rr + ' cm. &iquest;Cu&aacute;l es su altura?' +
      P.considere('&pi; = 3.14.'),
      P.opciones(r, h, [V / (3.14 * rr), cono ? V / (3.14 * rr * rr) : 3 * h, V / (2 * 3.14 * rr), h * rr / 2].map(function (v) { return F.redondea(v, 2); }), { unidad: 'cm', dec: 2 }),
      ['Escribe la formula del volumen y despeja h.', cono ? 'Cono: V = &pi;r' + F.sup(2) + 'h / 3, asi que h = 3V / (&pi;r' + F.sup(2) + ').' : 'Cilindro: V = &pi;r' + F.sup(2) + 'h, asi que h = V / (&pi;r' + F.sup(2) + ').'],
      ['&pi;r' + F.sup(2) + ' = 3.14 &times; ' + (rr * rr) + ' = ' + F.n(3.14 * rr * rr, 2),
        'h = ' + (cono ? '3 &times; ' : '') + P.num(V) + ' / ' + F.n(3.14 * rr * rr, 2) + ' = <b>' + h + ' cm</b>']);
  }

  function volLitros(r) {
    var tipo = r.entero(0, 1), v, enun, sol;
    if (tipo === 0) {
      var l = r.entero(10, 30) / 10, a = r.entero(8, 20) / 10, h = r.entero(8, 20) / 10;
      v = F.redondea(l * a * h * 1000, 2);
      enun = 'Una cisterna tiene forma de prisma rectangular de ' + F.n(l) + ' m de largo, ' + F.n(a) + ' m de ancho y ' + F.n(h) + ' m de profundidad. &iquest;Cu&aacute;ntos litros le caben?' + P.considere('V = largo &times; ancho &times; altura y 1 m' + F.sup(3) + ' = 1 000 L.');
      sol = ['V = ' + F.n(l) + ' &times; ' + F.n(a) + ' &times; ' + F.n(h) + ' = ' + F.n(l * a * h, 3) + ' m' + F.sup(3), '1 m' + F.sup(3) + ' = 1 000 L &rarr; <b>' + P.num(v, 0) + ' L</b>'];
    } else {
      var d = r.elige([0.8, 1, 1.2, 1.4, 1.6]), hh = r.elige([1, 1.2, 1.5, 1.8, 2]), rr = d / 2;
      v = F.redondea(3.14 * rr * rr * hh * 1000, 2);
      enun = 'Un tinaco cil&iacute;ndrico mide ' + F.n(d) + ' m de di&aacute;metro y ' + F.n(hh) + ' m de altura. &iquest;Cu&aacute;ntos litros le caben?' + P.considere('V = &pi;r' + F.sup(2) + 'h, &pi; = 3.14 y 1 m' + F.sup(3) + ' = 1 000 L.');
      sol = ['Radio = ' + F.n(rr) + ' m', 'V = 3.14 &times; ' + F.n(rr) + F.sup(2) + ' &times; ' + F.n(hh) + ' = ' + F.n(v / 1000, 4) + ' m' + F.sup(3), '&times; 1 000 = <b>' + P.num(v, 0) + ' L</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, [v / 10, v * 10, v / 1000, tipo === 1 ? v * 4 : v / 100], { unidad: 'L', fmt: function (x) { return P.num(x, x === Math.round(x) ? 0 : 2); } }),
      ['Calcula el volumen en metros cubicos.', '1 m' + F.sup(3) + ' = 1 000 litros.' + (tipo === 1 ? ' Ojo: el radio es la mitad del diametro.' : '')], sol);
  }

  function volArea(r) {
    var tipo = r.entero(0, 2), a, v, malas, enun, sol;
    if (tipo === 0) {
      a = r.entero(2, 15);
      enun = '&iquest;Cu&aacute;l es el &aacute;rea total de la superficie de un cubo de ' + a + ' cm de arista?' + P.considere('A = 6a' + F.sup(2) + ', donde a es la arista.');
      v = 6 * a * a; malas = [a * a * a, 4 * a * a, a * a, 12 * a]; sol = 'A = 6a' + F.sup(2) + ' = 6 &times; ' + (a * a) + ' = <b>' + v + ' cm' + F.sup(2) + '</b>';
    } else if (tipo === 1) {
      var rr = r.entero(2, 9), h = r.entero(3, 15);
      enun = '&iquest;Cu&aacute;l es el &aacute;rea total de un cilindro de ' + rr + ' cm de radio y ' + h + ' cm de altura?' + P.considere('&pi; = 3.14 y A = 2&pi;r' + F.sup(2) + ' + 2&pi;rh.');
      v = F.redondea(2 * 3.14 * rr * rr + 2 * 3.14 * rr * h, 2); malas = [2 * 3.14 * rr * h, 3.14 * rr * rr * h, 3.14 * rr * rr + 2 * 3.14 * rr * h, 2 * 3.14 * rr * rr];
      sol = 'A = 2(3.14)(' + rr + ')' + F.sup(2) + ' + 2(3.14)(' + rr + ')(' + h + ') = <b>' + P.num(v) + ' cm' + F.sup(2) + '</b>';
    } else {
      var rs = r.entero(2, 10);
      enun = '&iquest;Cu&aacute;l es el &aacute;rea de la superficie de una esfera de ' + rs + ' cm de radio?' + P.considere('&pi; = 3.14 y A = 4&pi;r' + F.sup(2) + '.');
      v = F.redondea(4 * 3.14 * rs * rs, 2); malas = [4 * 3.14 * rs * rs * rs / 3, 3.14 * rs * rs, 2 * 3.14 * rs, 4 * 3.14 * rs];
      sol = 'A = 4 &times; 3.14 &times; ' + (rs * rs) + ' = <b>' + P.num(v) + ' cm' + F.sup(2) + '</b>';
    }
    return P.ejercicio(enun, P.opciones(r, v, malas.map(function (x) { return F.redondea(x, 2); }), { unidad: 'cm' + F.sup(2), dec: 2 }),
      ['El area de la superficie es lo que mide la "envoltura" del cuerpo (en unidades cuadradas), no lo que le cabe.', 'Suma las areas de todas sus caras o usa la formula.'], [sol]);
  }

  function volEscala(r) {
    var k = r.entero(2, 4), cuerpo = r.elige([['el radio de una esfera', 'volumen'], ['la arista de un cubo', 'volumen'], ['el radio de un c&iacute;rculo', '&aacute;rea'], ['el lado de un cuadrado', '&aacute;rea']]);
    var VEZ = { 2: 'duplica', 3: 'triplica', 4: 'cuadruplica' };
    var vol = cuerpo[1] === 'volumen', v = vol ? k * k * k : k * k;
    return P.ejercicio('Si ' + cuerpo[0] + ' se ' + VEZ[k] + ', &iquest;por cu&aacute;nto se multiplica su ' + cuerpo[1] + '?' + CONS_ESCALA,
      P.opciones(r, 'Por ' + v, (vol ? [k, k * k, 3 * k, k + 1] : [k, k * k * k, 2 * k, k + 1]).filter(function (x) { return x !== v; }).map(function (x) { return 'Por ' + x; })),
      ['El ' + cuerpo[1] + ' depende de la medida elevada al ' + (vol ? 'cubo' : 'cuadrado') + '.', 'Asi que se multiplica por ' + k + (vol ? F.sup(3) : F.sup(2)) + '.'],
      [k + (vol ? F.sup(3) : F.sup(2)) + ' = <b>' + v + '</b>']);
  }

  /* ---------- 16. razones trigonometricas ---------- */
  /* sen, cos y tan con dos decimales, como los da el cuadernillo */
  var TRIG = { 20: [0.34, 0.94, 0.36], 25: [0.42, 0.91, 0.47], 30: [0.5, 0.87, 0.58], 35: [0.57, 0.82, 0.7], 40: [0.64, 0.77, 0.84],
    45: [0.71, 0.71, 1], 50: [0.77, 0.64, 1.19], 53: [0.8, 0.6, 1.33], 55: [0.82, 0.57, 1.43], 60: [0.87, 0.5, 1.73], 65: [0.91, 0.42, 2.14], 70: [0.94, 0.34, 2.75] };
  function consideraTrig(a) {
    var t = TRIG[a];
    return P.considere('sen(' + a + '&deg;) = ' + t[0].toFixed(2) + ', cos(' + a + '&deg;) = ' + t[1].toFixed(2) + ' y tan(' + a + '&deg;) = ' + t[2].toFixed(2) + '.');
  }

  function razProblema(r) {
    var a = r.elige([20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70]), t = TRIG[a], s = t[0], c = t[1], tg = t[2];
    var ctx = r.entero(0, 6), L = r.entero(3, 25), enun, v, malas, pista, sol;
    if (ctx === 0 || ctx === 1) {
      var altura = ctx === 0;
      enun = 'Una escalera de ' + L + ' m se apoya en una pared y forma un &aacute;ngulo de ' + a + '&deg; con el piso. ' +
        (altura ? '&iquest;A qu&eacute; altura de la pared llega la escalera?' : '&iquest;A qu&eacute; distancia de la pared queda el pie de la escalera?');
      v = altura ? L * s : L * c; malas = altura ? [L * c, L * tg, L / s] : [L * s, L / c, L * tg];
      pista = 'La escalera es la HIPOTENUSA. ' + (altura ? 'La altura es el cateto OPUESTO al angulo del piso: usa seno.' : 'La distancia al pie es el cateto ADYACENTE: usa coseno.');
      sol = (altura ? 'h = ' + L + ' &times; sen(' + a + '&deg;) = ' + L + ' &times; ' + s.toFixed(2) : 'd = ' + L + ' &times; cos(' + a + '&deg;) = ' + L + ' &times; ' + c.toFixed(2));
    } else if (ctx === 2) {
      enun = 'Se vuela un papalote con un hilo de ' + L + ' m que forma un &aacute;ngulo de ' + a + '&deg; con el suelo. Suponiendo el hilo recto, &iquest;a qu&eacute; altura est&aacute; el papalote sobre la mano de quien lo vuela?';
      v = L * s; malas = [L * c, L * tg, L / s];
      pista = 'El hilo es la hipotenusa y la altura es el cateto opuesto: seno.'; sol = 'h = ' + L + ' &times; ' + s.toFixed(2);
    } else if (ctx === 3) {
      enun = 'Desde un punto en el suelo a ' + L + ' m del pie de un &aacute;rbol, se ve la punta del &aacute;rbol con un &aacute;ngulo de elevaci&oacute;n de ' + a + '&deg;. &iquest;Cu&aacute;l es la altura del &aacute;rbol?';
      v = L * tg; malas = [L * s, L * c, L / tg];
      pista = 'Conoces el cateto ADYACENTE (la distancia al pie) y buscas el OPUESTO (la altura): tangente.'; sol = 'h = ' + L + ' &times; tan(' + a + '&deg;) = ' + L + ' &times; ' + tg.toFixed(2);
    } else if (ctx === 4) {
      enun = 'Un poste de ' + L + ' m de altura proyecta una sombra cuando los rayos del sol llegan con un &aacute;ngulo de elevaci&oacute;n de ' + a + '&deg;. &iquest;Cu&aacute;nto mide la sombra?';
      v = L / tg; malas = [L * tg, L * c, L / s];
      pista = 'El poste es el cateto OPUESTO al angulo y la sombra el ADYACENTE: tan = opuesto / adyacente, asi que sombra = altura / tan.'; sol = 'sombra = ' + L + ' / ' + tg.toFixed(2);
    } else if (ctx === 5) {
      enun = 'Una rampa de ' + L + ' m de largo tiene una inclinaci&oacute;n de ' + a + '&deg; respecto al piso. &iquest;Qu&eacute; altura alcanza la rampa?';
      v = L * s; malas = [L * c, L * tg, L / c];
      pista = 'La rampa es la hipotenusa; la altura, el cateto opuesto: seno.'; sol = 'h = ' + L + ' &times; ' + s.toFixed(2);
    } else {
      enun = 'Un dron vuela a ' + L + ' m de altura y ve un punto en el suelo con un &aacute;ngulo de depresi&oacute;n de ' + a + '&deg;. &iquest;Qu&eacute; distancia en l&iacute;nea recta hay entre el dron y ese punto?';
      v = L / s; malas = [L * s, L / c, L * tg];
      pista = 'La altura es el cateto opuesto al angulo (en el punto del suelo) y la distancia en linea recta es la hipotenusa: d = altura / sen.'; sol = 'd = ' + L + ' / ' + s.toFixed(2);
    }
    v = F.redondea(v, 2);
    return P.ejercicio(enun + consideraTrig(a),
      P.opciones(r, v, malas.map(function (x) { return F.redondea(x, 2); }), { unidad: 'm', dec: 2, fijo: true }),
      [pista, 'sen = opuesto/hipotenusa, cos = adyacente/hipotenusa, tan = opuesto/adyacente.'],
      [sol + ' = <b>' + P.num(v) + ' m</b>']);
  }

  /* triangulo rectangulo dibujado con sus lados y un angulo marcado */
  function dibujoRect(r, hor, ver, hip, nombres, enHor, etiquetas) {
    var W = 260, H = 190, esc = Math.min(180 / hor, 120 / ver), w = hor * esc, h = ver * esc, esp = r.bool();
    function X(p) { return esp ? [W - p[0], p[1]] : p; }
    var R = X([40, 160]), Hh = X([40 + w, 160]), V = X([40, 160 - h]);
    var s = '<path d="M' + r1(R[0]) + ' ' + r1(R[1]) + ' L' + r1(Hh[0]) + ' ' + r1(Hh[1]) + ' L' + r1(V[0]) + ' ' + r1(V[1]) + ' Z"/>';
    var q = X([52, 148]), q1 = X([52, 160]), q2 = X([40, 148]);
    s += '<path stroke-width="1.4" d="M' + r1(q1[0]) + ' ' + r1(q1[1]) + ' L' + r1(q[0]) + ' ' + r1(q[1]) + ' L' + r1(q2[0]) + ' ' + r1(q2[1]) + '"/>';
    /* el angulo theta */
    var Vt = enHor ? Hh : V, A1 = R, A2 = enHor ? V : Hh;
    function u(p, o) { var dx = o[0] - p[0], dy = o[1] - p[1], l = Math.sqrt(dx * dx + dy * dy); return [dx / l, dy / l]; }
    var ua = u(Vt, A1), ub = u(Vt, A2), Ra = 22;
    var pa = [Vt[0] + ua[0] * Ra, Vt[1] + ua[1] * Ra], pb = [Vt[0] + ub[0] * Ra, Vt[1] + ub[1] * Ra];
    var cruz = ua[0] * ub[1] - ua[1] * ub[0];
    s += '<path class="ac" stroke-width="1.6" d="M' + r1(pa[0]) + ' ' + r1(pa[1]) + ' A' + Ra + ' ' + Ra + ' 0 0 ' + (cruz > 0 ? 1 : 0) + ' ' + r1(pb[0]) + ' ' + r1(pb[1]) + '"/>';
    var bis = [ua[0] + ub[0], ua[1] + ub[1]], lb = Math.sqrt(bis[0] * bis[0] + bis[1] * bis[1]);
    s += etiqueta(Vt[0] + bis[0] / lb * 36, Vt[1] + bis[1] / lb * 36, '&theta;', 'ac-relleno');
    /* nombres de los vertices */
    s += etiqueta(R[0] + (esp ? 12 : -12), R[1] + 12, nombres[0]) + etiqueta(Hh[0] + (esp ? -12 : 12), Hh[1] + 12, nombres[1]) + etiqueta(V[0] + (esp ? 12 : -12), V[1] - 10, nombres[2]);
    /* medidas de los lados */
    if (etiquetas) {
      s += etiqueta((R[0] + Hh[0]) / 2, R[1] + 16, etiquetas[0]);
      s += etiqueta(R[0] + (esp ? 18 : -18), (R[1] + V[1]) / 2, etiquetas[1]);
      var mh = [(Hh[0] + V[0]) / 2, (Hh[1] + V[1]) / 2], nh = esp ? [-0.6, -0.8] : [0.6, -0.8];
      s += etiqueta(mh[0] + nh[0] * 18, mh[1] + nh[1] * 18, etiquetas[2]);
    }
    return F.svg(W, H, s);
  }

  function razFigura(r) {
    var t = r.elige(TRIPLES), hor = t[0], ver = t[1];
    if (r.bool()) { hor = t[1]; ver = t[0]; }
    var hip = t[2], enHor = r.bool(), nombres = r.muestra(LETRAS, 3);
    var op = enHor ? ver : hor, ady = enHor ? hor : ver;
    var fun = r.elige(['sen', 'cos', 'tan']);
    var val = { sen: [op, hip], cos: [ady, hip], tan: [op, ady] };
    function q(p) { return F.frac(p[0], p[1]); }
    var bien = q(val[fun]);
    var malas = ['sen', 'cos', 'tan'].filter(function (f) { return f !== fun; }).map(function (f) { return q(val[f]); })
      .concat([q([val[fun][1], val[fun][0]]), q([hip, op])]);
    var dib = dibujoRect(r, hor, ver, hip, nombres, enHor, [String(hor), String(ver), String(hip)]);
    return P.ejercicio('Con base en el tri&aacute;ngulo rect&aacute;ngulo de la figura, &iquest;cu&aacute;l es el valor de ' + fun + ' &theta;?' + dib + consRazones(),
      P.opciones(r, bien, malas),
      ['Desde &theta;: el cateto OPUESTO es el que esta enfrente; el ADYACENTE es el que lo toca (sin ser la hipotenusa).',
        'sen = opuesto/hipotenusa, cos = adyacente/hipotenusa, tan = opuesto/adyacente.'],
      ['Opuesto a &theta;: ' + op + ', adyacente: ' + ady + ', hipotenusa: ' + hip, fun + ' &theta; = <b>' + bien + '</b>']);
  }

  function razPitagoras(r) {
    var t = r.elige(TRIPLES), a = t[0], b = t[1], c = t[2];
    var conHip = r.bool(), fun = r.elige(['sen', 'cos', 'tan']);
    /* angulo opuesto al cateto a */
    var val = { sen: [a, c], cos: [b, c], tan: [a, b] };
    var enun = conHip
      ? 'En un tri&aacute;ngulo rect&aacute;ngulo la hipotenusa mide ' + c + ' cm y uno de sus catetos mide ' + a + ' cm. Si &alpha; es el &aacute;ngulo opuesto a ese cateto, &iquest;cu&aacute;nto vale ' + fun + ' &alpha;?'
      : 'Los catetos de un tri&aacute;ngulo rect&aacute;ngulo miden ' + a + ' cm y ' + b + ' cm. Si &alpha; es el &aacute;ngulo opuesto al cateto de ' + a + ' cm, &iquest;cu&aacute;nto vale ' + fun + ' &alpha;?';
    function q(p) { return F.frac(p[0], p[1]); }
    var malas = ['sen', 'cos', 'tan'].filter(function (f) { return f !== fun; }).map(function (f) { return q(val[f]); }).concat([q([val[fun][1], val[fun][0]])]);
    return P.ejercicio(enun + consRazones('c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2)), P.opciones(r, q(val[fun]), malas),
      ['Primero completa el triangulo con Pitagoras: ' + (conHip ? 'el otro cateto es &radic;(' + c + F.sup(2) + ' &minus; ' + a + F.sup(2) + ')' : 'la hipotenusa es &radic;(' + a + F.sup(2) + ' + ' + b + F.sup(2) + ')') + '.',
        'Desde &alpha;, el cateto de ' + a + ' es el opuesto.'],
      [(conHip ? 'Otro cateto = ' + b : 'Hipotenusa = ' + c), fun + ' &alpha; = <b>' + q(val[fun]) + '</b>']);
  }

  function razDeOtra(r) {
    var t = r.elige([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29]]), op = t[0], ady = t[1];
    if (r.bool()) { op = t[1]; ady = t[0]; }
    var hip = t[2];
    var R = { sen: [op, hip], cos: [ady, hip], tan: [op, ady], csc: [hip, op], sec: [hip, ady], cot: [ady, op] };
    var dada = r.elige(['sen', 'cos', 'tan']);
    var pide = r.elige(Object.keys(R).filter(function (k) { return k !== dada; }));
    function q(k) { return F.frac(R[k][0], R[k][1]); }
    var malas = Object.keys(R).filter(function (k) { return k !== pide; }).map(q);
    var falta = dada === 'tan' ? 'la hipotenusa: &radic;(' + R.tan[0] + F.sup(2) + ' + ' + R.tan[1] + F.sup(2) + ') = ' + hip
      : 'el otro cateto: &radic;(' + hip + F.sup(2) + ' &minus; ' + R[dada][0] + F.sup(2) + ') = ' + (dada === 'sen' ? ady : op);
    return P.ejercicio('Si ' + dada + ' &theta; = ' + q(dada) + ' y &theta; es un &aacute;ngulo agudo, &iquest;cu&aacute;nto vale ' + pide + ' &theta;?' +
      consRazones('csc &theta; = ' + F.frac(1, 'sen &theta;') + ', sec &theta; = ' + F.frac(1, 'cos &theta;') + ', cot &theta; = ' + F.frac(1, 'tan &theta;') + ' y c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2)),
      P.opciones(r, q(pide), malas),
      ['Dibuja un triangulo rectangulo con esos lados: ' + dada + ' = ' + R[dada][0] + '/' + R[dada][1] + '.', 'Con Pitagoras sacas el lado que falta y luego armas la razon que te piden.'],
      ['Falta ' + falta, 'Opuesto ' + op + ', adyacente ' + ady + ', hipotenusa ' + hip, pide + ' &theta; = <b>' + q(pide) + '</b>']);
  }

  function razAngulo(r) {
    var a = r.elige([30, 45, 60]), alto = r.entero(2, 12), tg = { 30: 0.58, 45: 1, 60: 1.73 }[a];
    var base = F.redondea(alto / Math.tan(a * Math.PI / 180), 2);
    var ctx = r.elige([
      'Una rampa sube ' + alto + ' m en una distancia horizontal de ' + P.num(base) + ' m. &iquest;Qu&eacute; &aacute;ngulo de inclinaci&oacute;n tiene la rampa?',
      'Un poste de ' + alto + ' m proyecta una sombra de ' + P.num(base) + ' m. &iquest;Con qu&eacute; &aacute;ngulo de elevaci&oacute;n llegan los rayos del sol?',
      'Un tobog&aacute;n baja ' + alto + ' m mientras avanza ' + P.num(base) + ' m en horizontal. &iquest;Qu&eacute; &aacute;ngulo forma con el piso?'
    ]);
    return P.ejercicio(ctx + P.considere('tan(30&deg;) &asymp; 0.58, tan(45&deg;) = 1 y tan(60&deg;) &asymp; 1.73.'),
      P.opciones(r, a + '&deg;', [30, 45, 60, 15, 75].filter(function (x) { return x !== a; }).map(function (x) { return x + '&deg;'; })),
      ['Conoces el cateto opuesto (lo que sube) y el adyacente (lo horizontal): usa la tangente.', 'tan &alpha; = ' + alto + ' / ' + P.num(base) + '; compara con los valores que te dan.'],
      ['tan &alpha; = ' + alto + ' / ' + P.num(base) + ' &asymp; ' + tg.toFixed(2), '&alpha; = <b>' + a + '&deg;</b>']);
  }

  /* ---------- 17. circunferencia unitaria e identidades ---------- */
  var R6 = '&radic;6', R2 = '&radic;2', R3 = '&radic;3';
  function sumExacto(r) {
    var mas = F.frac(R6 + ' + ' + R2, 4), menos = F.frac(R6 + ' &minus; ' + R2, 4);
    var casos3 = [['sen(75&deg;)', '45&deg; + 30&deg;', mas], ['cos(75&deg;)', '45&deg; + 30&deg;', menos], ['sen(15&deg;)', '45&deg; &minus; 30&deg;', menos],
      ['cos(15&deg;)', '45&deg; &minus; 30&deg;', mas], ['sen(105&deg;)', '60&deg; + 45&deg;', mas], ['cos(105&deg;)', '60&deg; + 45&deg;', '&minus;' + menos]];
    var c = r.elige(casos3);
    var todas = [mas, menos, '&minus;' + menos, '&minus;' + mas, F.frac(R3 + ' + 1', 2), F.frac(R2 + ' + ' + R3, 4)];
    return P.ejercicio('&iquest;Cu&aacute;l es el valor exacto de ' + c[0] + '?' +
      P.considere('sen(&alpha; &plusmn; &beta;) = sen &alpha; cos &beta; &plusmn; cos &alpha; sen &beta;, cos(&alpha; &plusmn; &beta;) = cos &alpha; cos &beta; &#8723; sen &alpha; sen &beta;, ' +
        'sen 30&deg; = ' + F.frac(1, 2) + ', cos 30&deg; = ' + F.frac(R3, 2) + ', sen 45&deg; = cos 45&deg; = ' + F.frac(R2, 2) + ', sen 60&deg; = ' + F.frac(R3, 2) + ' y cos 60&deg; = ' + F.frac(1, 2) + '.'),
      P.opciones(r, c[2], todas.filter(function (x) { return x !== c[2]; })),
      ['Escribe el angulo como ' + c[1] + ' y usa la formula.', 'Multiplica las fracciones: ' + F.frac(R2, 2) + ' &middot; ' + F.frac(R3, 2) + ' = ' + F.frac(R6, 4) + '.'],
      [c[0] + ' = ' + c[0].replace(/\(.*\)/, '(' + c[1] + ')') + ' = <b>' + c[2] + '</b>']);
  }

  function sumCircUnit(r) {
    var g = r.elige([30, 45, 60, 120, 135, 150, 210, 225, 240, 300, 315, 330]);
    var t = g * Math.PI / 180;
    function exacto(v) {
      var a = Math.abs(v), s = v < -1e-9 ? '&minus;' : '';
      if (a < 1e-9) return '0';
      if (Math.abs(a - 0.5) < 1e-9) return s + F.frac(1, 2);
      if (Math.abs(a - Math.SQRT2 / 2) < 1e-9) return s + F.frac(R2, 2);
      if (Math.abs(a - Math.sqrt(3) / 2) < 1e-9) return s + F.frac(R3, 2);
      return s + '1';
    }
    var c = Math.cos(t), sn = Math.sin(t);
    function pt(x, y) { return '(' + exacto(x) + ', ' + exacto(y) + ')'; }
    var bien = pt(c, sn);
    return P.ejercicio('&iquest;Cu&aacute;les son las coordenadas del punto de la circunferencia unitaria que corresponde a un &aacute;ngulo de ' + g + '&deg;?' +
      P.considere(P.valoresRef(g) + '.'),
      P.opciones(r, bien, [pt(sn, c), pt(-c, sn), pt(c, -sn), pt(-c, -sn), pt(-sn, c)]),
      ['En la circunferencia unitaria el punto es (cos &theta;, sen &theta;): primero el coseno.',
        'Ubica el cuadrante para los signos: en el II cuadrante x es negativa; en el III, las dos; en el IV, y es negativa.'],
      ['cos ' + g + '&deg; = ' + exacto(c) + ', sen ' + g + '&deg; = ' + exacto(sn), 'Punto: <b>' + bien + '</b>']);
  }

  function sumCuadrante(r) {
    var q = r.entero(1, 4), signos = { 1: ['+', '+'], 2: ['+', '&minus;'], 3: ['&minus;', '&minus;'], 4: ['&minus;', '+'] };
    var ORD = { 1: 'primer', 2: 'segundo', 3: 'tercer', 4: 'cuarto' };
    function txt(s) { return 'sen &theta; ' + (s[0] === '+' ? '&gt; 0' : '&lt; 0') + ' y cos &theta; ' + (s[1] === '+' ? '&gt; 0' : '&lt; 0'); }
    if (r.bool()) {
      return P.ejercicio('Si el &aacute;ngulo &theta; est&aacute; en el ' + ORD[q] + ' cuadrante, &iquest;qu&eacute; signos tienen sen &theta; y cos &theta;?',
        P.opciones(r, txt(signos[q]), [1, 2, 3, 4].filter(function (k) { return k !== q; }).map(function (k) { return txt(signos[k]); })),
        ['cos &theta; es la coordenada x y sen &theta; la coordenada y del punto en la circunferencia unitaria.', 'Piensa en que lado del plano cae cada cuadrante.'],
        ['En el ' + ORD[q] + ' cuadrante: <b>' + txt(signos[q]) + '</b>']);
    }
    return P.ejercicio('&iquest;En qu&eacute; cuadrante se cumple que ' + txt(signos[q]) + '?',
      P.opciones(r, ORD[q].charAt(0).toUpperCase() + ORD[q].slice(1) + ' cuadrante', [1, 2, 3, 4].filter(function (k) { return k !== q; }).map(function (k) { return ORD[k].charAt(0).toUpperCase() + ORD[k].slice(1) + ' cuadrante'; })),
      ['sen positivo: arriba del eje x. cos positivo: a la derecha del eje y.', 'Junta las dos condiciones.'],
      ['Es el <b>' + ORD[q] + ' cuadrante</b>']);
  }

  function sumIdentidad(r) {
    var s2 = F.sup(2);
    var ids = [['(1 &minus; cos' + s2 + 'x) / sen x', 'sen x'], ['tan x &middot; cos x', 'sen x'], ['sec' + s2 + 'x &minus; tan' + s2 + 'x', '1'],
      ['sen x / tan x', 'cos x'], ['1 + cot' + s2 + 'x', 'csc' + s2 + 'x'], ['1 &minus; sen' + s2 + 'x', 'cos' + s2 + 'x'],
      ['cos x &middot; sec x', '1'], ['(sen x + cos x)' + s2 + ' &minus; 2 sen x cos x', '1'], ['sen x &middot; csc x &minus; cos' + s2 + 'x', 'sen' + s2 + 'x']];
    var c = r.elige(ids);
    var pool = ['sen x', 'cos x', '1', 'tan x', 'csc' + s2 + 'x', 'cos' + s2 + 'x', 'sen' + s2 + 'x', '0', 'sec x'];
    return P.ejercicio('&iquest;A qu&eacute; es igual la siguiente expresi&oacute;n?<br><span class="expr">' + c[0] + '</span>' +
      P.considere('sen' + s2 + 'x + cos' + s2 + 'x = 1, tan x = sen x / cos x, sec x = 1 / cos x, csc x = 1 / sen x y cot x = cos x / sen x.'),
      P.opciones(r, c[1], pool.filter(function (x) { return x !== c[1]; })),
      ['Escribe todo con seno y coseno.', 'Usa sen' + s2 + 'x + cos' + s2 + 'x = 1 (o sus despejes) para simplificar.'],
      [c[0] + ' = <b>' + c[1] + '</b>']);
  }

  function sumDoble(r) {
    var t = r.elige([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), a = t[0], b = t[1], c = t[2];
    if (r.bool()) { a = t[1]; b = t[0]; }
    var pideSen = r.bool();
    var v = pideSen ? [2 * a * b, c * c] : [b * b - a * a, c * c];
    var malas = pideSen ? [[2 * a, c], [a * b, c * c], [b * b - a * a, c * c]] : [[2 * a * b, c * c], [a * a - b * b, c * c], [2 * b, c]];
    return P.ejercicio('Si sen &theta; = ' + F.frac(a, c) + ' y cos &theta; = ' + F.frac(b, c) + ', &iquest;cu&aacute;nto vale ' + (pideSen ? 'sen' : 'cos') + '(2&theta;)?' +
      P.considere(pideSen ? 'sen(2&theta;) = 2 sen &theta; cos &theta;.' : 'cos(2&theta;) = cos' + F.sup(2) + '&theta; &minus; sen' + F.sup(2) + '&theta;.'),
      P.opciones(r, fr(v[0], v[1]), malas.map(function (x) { return fr(x[0], x[1]); }).concat([fr(1, 1)])),
      ['No es el doble del ' + (pideSen ? 'seno' : 'coseno') + ': usa la formula del angulo doble.', 'Multiplica las fracciones con cuidado (denominador ' + (c * c) + ').'],
      [(pideSen ? '2 &times; ' + F.frac(a, c) + ' &times; ' + F.frac(b, c) : F.frac(b * b, c * c) + ' &minus; ' + F.frac(a * a, c * c)) + ' = <b>' + fr(v[0], v[1]) + '</b>']);
  }

  /* ---------- 18. areas y leyes de senos y cosenos ---------- */
  function areaSeno(r) {
    var ang = r.elige([[30, 0.5], [45, 0.71], [60, 0.87], [120, 0.87], [150, 0.5], [53, 0.8]]), a = r.entero(4, 20), b = r.entero(4, 20);
    var v = F.redondea(a * b * ang[1] / 2, 2);
    return P.ejercicio('Dos lados de un terreno triangular miden ' + a + ' m y ' + b + ' m, y forman un &aacute;ngulo de ' + ang[0] + '&deg;. &iquest;Cu&aacute;l es el &aacute;rea del terreno?' +
      P.considere('A = ' + F.frac('a &middot; b &middot; sen C', 2) + ' y sen(' + ang[0] + '&deg;) = ' + ang[1].toFixed(2) + '.'),
      P.opciones(r, v, [a * b * ang[1], a * b / 2, a * b * Math.sqrt(1 - ang[1] * ang[1]) / 2, (a + b) * ang[1] / 2].map(function (x) { return F.redondea(x, 2); }), { unidad: 'm' + F.sup(2), dec: 2 }),
      ['Con dos lados y el angulo entre ellos: A = (a &middot; b &middot; sen C) / 2.', 'No olvides dividir entre 2.'],
      ['A = (' + a + ' &times; ' + b + ' &times; ' + ang[1].toFixed(2) + ') / 2 = <b>' + F.n(v, 2) + ' m' + F.sup(2) + '</b>']);
  }

  function leySenos(r) {
    var opciones = [[30, 0.5], [45, 0.71], [60, 0.87], [53, 0.8], [37, 0.6], [70, 0.94]];
    var A = r.elige(opciones), B = r.elige(opciones.filter(function (x) { return x !== A && x[0] + A[0] < 170; }));
    var a = r.entero(4, 20), b = F.redondea(a * B[1] / A[1], 2);
    return P.ejercicio('En el tri&aacute;ngulo ABC, el &aacute;ngulo A mide ' + A[0] + '&deg;, el &aacute;ngulo B mide ' + B[0] + '&deg; y el lado a (opuesto a A) mide ' + a +
      ' cm. &iquest;Cu&aacute;nto mide el lado b?' +
      P.considere(F.frac('a', 'sen A') + ' = ' + F.frac('b', 'sen B') + ', sen(' + A[0] + '&deg;) = ' + A[1].toFixed(2) + ' y sen(' + B[0] + '&deg;) = ' + B[1].toFixed(2) + '.'),
      P.opciones(r, b, [a * A[1] / B[1], a * B[1], a / B[1], a * B[0] / A[0]].map(function (x) { return F.redondea(x, 2); }), { unidad: 'cm', dec: 2 }),
      ['Ley de senos: cada lado entre el seno de su angulo opuesto da lo mismo.', 'Despeja b = a &middot; sen B / sen A.'],
      ['b = ' + a + ' &times; ' + B[1].toFixed(2) + ' / ' + A[1].toFixed(2) + ' = <b>' + F.n(b, 2) + ' cm</b>']);
  }

  function leyCosenos(r) {
    var c = r.elige([[5, 8, 60, 7], [3, 8, 60, 7], [3, 5, 120, 7], [16, 10, 60, 14], [6, 10, 120, 14], [8, 15, 60, 13], [7, 15, 60, 13], [5, 21, 60, 19], [7, 8, 120, 13]]);
    var a = c[0], b = c[1], cos = c[2] === 60 ? 0.5 : -0.5;
    var sinCos = F.redondea(Math.sqrt(a * a + b * b), 2), signo = F.redondea(Math.sqrt(a * a + b * b + 2 * a * b * cos), 2);
    return P.ejercicio('Dos lados de un tri&aacute;ngulo miden ' + a + ' cm y ' + b + ' cm, y el &aacute;ngulo entre ellos mide ' + c[2] + '&deg;. &iquest;Cu&aacute;nto mide el tercer lado?' +
      P.considere('c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2) + ' &minus; 2ab cos C y cos(' + c[2] + '&deg;) = ' + m(cos) + '.'),
      P.opciones(r, c[3], [sinCos, signo, a + b - 2, Math.abs(b - a) + 3], { unidad: 'cm', dec: 2 }),
      ['Con dos lados y el angulo ENTRE ellos se usa la ley de cosenos.', 'Cuidado con el signo: si el coseno es negativo, el termino 2ab cos C se suma.'],
      ['c' + F.sup(2) + ' = ' + (a * a) + ' + ' + (b * b) + ' &minus; 2(' + a + ')(' + b + ')(' + m(cos) + ') = ' + (c[3] * c[3]), 'c = &radic;' + (c[3] * c[3]) + ' = <b>' + c[3] + ' cm</b>']);
  }

  function areaEquilatero(r) {
    var l = r.elige([2, 4, 6, 8, 10, 12]), k = l * l / 4;
    function raiz3(n) { return (n === 1 ? '' : F.n(n)) + R3; }
    return P.ejercicio('&iquest;Cu&aacute;l es el &aacute;rea de un tri&aacute;ngulo equil&aacute;tero de ' + l + ' cm de lado?' +
      P.considere('la altura de un tri&aacute;ngulo equil&aacute;tero de lado l es h = ' + F.frac('l' + R3, 2) + '.'),
      P.opciones(r, raiz3(k) + ' cm' + F.sup(2), [raiz3(2 * k), raiz3(k / 2), raiz3(l), String(l * l / 2)].map(function (x) { return x + ' cm' + F.sup(2); })),
      ['Area = base &times; altura / 2 con base l y altura l&radic;3/2.', 'Queda A = (&radic;3/4) l' + F.sup(2) + '.'],
      ['h = ' + l + R3 + '/2 = ' + raiz3(l / 2), 'A = ' + l + ' &times; ' + raiz3(l / 2) + ' / 2 = <b>' + raiz3(k) + ' cm' + F.sup(2) + '</b>']);
  }

  function triangulo45(r) {
    var c = r.entero(2, 12), deCateto = r.bool();
    if (deCateto) {
      return P.ejercicio('Los catetos de un tri&aacute;ngulo rect&aacute;ngulo is&oacute;sceles miden ' + c + ' cm cada uno. &iquest;Cu&aacute;nto mide la hipotenusa?' + CONS_PITAGORAS,
        P.opciones(r, c + R2 + ' cm', [2 * c + ' cm', c + R3 + ' cm', (2 * c) + R2 + ' cm', F.frac(c + R2, 2) + ' cm']),
        ['En el triangulo de 45&deg;-45&deg;-90&deg; la hipotenusa es el cateto por &radic;2.', 'Por Pitagoras: &radic;(' + c + F.sup(2) + ' + ' + c + F.sup(2) + ') = &radic;(2 &middot; ' + (c * c) + ').'],
        ['h = &radic;(' + (c * c) + ' + ' + (c * c) + ') = &radic;' + (2 * c * c) + ' = <b>' + c + R2 + ' cm</b>']);
    }
    return P.ejercicio('La hipotenusa de un tri&aacute;ngulo rect&aacute;ngulo is&oacute;sceles mide ' + c + R2 + ' cm. &iquest;Cu&aacute;nto mide cada cateto?' + CONS_PITAGORAS,
      P.opciones(r, c + ' cm', [c + R2 + ' cm', (2 * c) + ' cm', F.frac(c, 2) + ' cm', c + R3 + ' cm']),
      ['En el triangulo de 45&deg;-45&deg;-90&deg; la hipotenusa es el cateto por &radic;2.', 'Divide la hipotenusa entre &radic;2.'],
      [c + R2 + ' &divide; ' + R2 + ' = <b>' + c + ' cm</b>']);
  }

  /* ================= temas de la guia de estudio =================
     1.12 Congruencia y semejanza y 1.13 Figuras geometricas. */

  function poligonoNombre(r) {
    var POL = [[3, 'Tri&aacute;ngulo'], [4, 'Cuadril&aacute;tero'], [5, 'Pent&aacute;gono'], [6, 'Hex&aacute;gono'], [7, 'Hept&aacute;gono'],
      [8, 'Oct&aacute;gono'], [9, 'Ene&aacute;gono'], [10, 'Dec&aacute;gono'], [12, 'Dodec&aacute;gono']];
    var p = r.elige(POL);
    if (r.bool()) {
      return P.ejercicio('&iquest;C&oacute;mo se llama el pol&iacute;gono que tiene ' + p[0] + ' lados?',
        P.opciones(r, p[1], r.muestra(POL.filter(function (x) { return x !== p; }), 4).map(function (x) { return x[1]; })),
        ['El nombre viene del griego: penta = 5, hexa = 6, hepta = 7, octa = 8, enea = 9, deca = 10, dodeca = 12.', 'Un poligono de n lados tambien tiene n vertices y n angulos.'],
        ['Un poligono de ' + p[0] + ' lados es un <b>' + p[1].toLowerCase() + '</b>']);
    }
    var d = p[0] * (p[0] - 3) / 2;
    return P.ejercicio('&iquest;Cu&aacute;ntas diagonales tiene un ' + p[1].toLowerCase() + '?' + P.considere('D = ' + F.frac('n(n &minus; 3)', 2) + '.'),
      P.opciones(r, d, [p[0] * (p[0] - 3), p[0], p[0] * (p[0] - 1) / 2, p[0] - 3]),
      ['Desde cada vertice salen n &minus; 3 diagonales (no hacia el mismo ni hacia sus dos vecinos).', 'Se divide entre 2 porque cada diagonal se conto dos veces.'],
      ['D = ' + p[0] + '(' + p[0] + ' &minus; 3) / 2 = <b>' + d + '</b>']);
  }

  function congruencia(r) {
    var C = [['Tienen dos lados iguales y el &aacute;ngulo comprendido entre ellos tambi&eacute;n es igual', 'Lado - &aacute;ngulo - lado (LAL)'],
      ['Tienen un lado igual y los dos &aacute;ngulos adyacentes a ese lado tambi&eacute;n son iguales', '&Aacute;ngulo - lado - &aacute;ngulo (ALA)'],
      ['Tienen sus tres lados respectivamente iguales', 'Lado - lado - lado (LLL)']];
    var c = r.elige(C);
    var sem = r.bool(0.35);
    if (sem) {
      var ops = ['Son congruentes: tienen la misma forma y el mismo tama&ntilde;o', 'Son semejantes: tienen la misma forma pero no necesariamente el mismo tama&ntilde;o',
        'No guardan ninguna relaci&oacute;n', 'Son congruentes solo si son rect&aacute;ngulos'];
      var k = r.entero(2, 4), l = [r.entero(3, 6), r.entero(4, 8), r.entero(5, 9)];
      return P.ejercicio('Un tri&aacute;ngulo mide ' + l.join(', ') + ' cm y otro mide ' + l.map(function (x) { return x * k; }).join(', ') + ' cm. &iquest;Qu&eacute; relaci&oacute;n hay entre ellos?',
        P.opciones(r, ops[1], [ops[0], ops[2], ops[3]]),
        ['Congruentes: mismos lados y angulos (son copias exactas). Semejantes: lados proporcionales y angulos iguales.', 'Divide cada lado del segundo entre el del primero.'],
        ['Cada lado es ' + k + ' veces el otro: <b>' + ops[1].toLowerCase() + '</b>']);
    }
    return P.ejercicio('Dos tri&aacute;ngulos cumplen la siguiente condici&oacute;n. &iquest;Qu&eacute; criterio de congruencia se aplica?<br><div class="lectura">' + c[0] + '.</div>',
      P.opciones(r, c[1], C.filter(function (x) { return x !== c; }).map(function (x) { return x[1]; }).concat(['&Aacute;ngulo - &aacute;ngulo - &aacute;ngulo (AAA)'])),
      ['Congruentes = misma forma y mismo tamano.', 'AAA no garantiza congruencia: dos triangulos con los mismos angulos pueden ser de distinto tamano (eso es semejanza).'],
      ['Criterio: <b>' + c[1] + '</b>']);
  }

  function areasPerimetros(r) {
    var tipo = r.entero(0, 5), enun, v, malas, sol, u = 'cm' + F.sup(2);
    if (tipo === 0) {
      var d1 = r.entero(4, 20), d2 = r.entero(4, 20);
      enun = '&iquest;Cu&aacute;l es el &aacute;rea de un rombo cuyas diagonales miden ' + d1 + ' cm y ' + d2 + ' cm?' + P.considere('A = ' + F.frac('d<sub>1</sub> &middot; d<sub>2</sub>', 2) + '.');
      v = d1 * d2 / 2; malas = [d1 * d2, (d1 + d2) * 2, d1 * d2 / 4, (d1 + d2) / 2]; sol = 'A = d<sub>1</sub>d<sub>2</sub> / 2 = ' + d1 + ' &times; ' + d2 + ' / 2';
    } else if (tipo === 1) {
      var b1 = r.entero(6, 20), b2 = r.entero(2, b1 - 2), h = r.entero(3, 12);
      enun = '&iquest;Cu&aacute;l es el &aacute;rea de un trapecio de bases ' + b1 + ' cm y ' + b2 + ' cm, y altura ' + h + ' cm?' + P.considere('A = ' + F.frac('(B + b)h', 2) + '.');
      v = (b1 + b2) * h / 2; malas = [(b1 + b2) * h, b1 * b2 * h / 2, b1 * h / 2 + b2, (b1 - b2) * h / 2]; sol = 'A = (b<sub>1</sub> + b<sub>2</sub>)h / 2 = (' + b1 + ' + ' + b2 + ') &times; ' + h + ' / 2';
    } else if (tipo === 2) {
      var b = r.entero(5, 20), hh = r.entero(3, 12), lado = hh + r.entero(1, 5);
      enun = 'Un paralelogramo tiene ' + b + ' cm de base, ' + lado + ' cm de lado inclinado y ' + hh + ' cm de altura. &iquest;Cu&aacute;l es su &aacute;rea?' + P.considere('A = base &times; altura.');
      v = b * hh; malas = [b * lado, b * hh / 2, 2 * (b + lado), b * lado / 2]; sol = 'A = base &times; altura = ' + b + ' &times; ' + hh + ' (no se usa el lado inclinado)';
    } else if (tipo === 3) {
      var n = r.elige([5, 6, 8]), l = r.entero(4, 12), ap = F.redondea(l / (2 * Math.tan(Math.PI / n)), 2), nom = { 5: 'pent&aacute;gono', 6: 'hex&aacute;gono', 8: 'oct&aacute;gono' }[n];
      enun = '&iquest;Cu&aacute;l es el &aacute;rea de un ' + nom + ' regular de ' + l + ' cm de lado y ' + P.num(ap) + ' cm de apotema?' + P.considere('A = ' + F.frac('P &middot; a', 2) + ', donde P es el per&iacute;metro.');
      v = F.redondea(n * l * ap / 2, 2); malas = [n * l * ap, n * l, l * ap / 2, n * l * ap / 4]; sol = 'P = ' + n + ' &times; ' + l + ' = ' + (n * l) + ' cm; A = ' + (n * l) + ' &times; ' + P.num(ap) + ' / 2';
    } else if (tipo === 4) {
      var rr = r.entero(2, 15), area = r.bool();
      if (area) {
        enun = '&iquest;Cu&aacute;l es el &aacute;rea de un c&iacute;rculo de ' + rr + ' cm de radio?' + P.considere('A = &pi;r' + F.sup(2) + ' y &pi; = 3.14.');
        v = F.redondea(3.14 * rr * rr, 2); malas = [2 * 3.14 * rr, 3.14 * rr, 3.14 * 4 * rr * rr, 3.14 * rr * rr / 2]; sol = 'A = &pi;r' + F.sup(2) + ' = 3.14 &times; ' + (rr * rr);
      } else {
        u = 'cm';
        enun = '&iquest;Cu&aacute;nto mide la circunferencia (el per&iacute;metro) de un c&iacute;rculo de ' + (2 * rr) + ' cm de di&aacute;metro?' + P.considere('C = &pi;d y &pi; = 3.14.');
        v = F.redondea(2 * 3.14 * rr, 2); malas = [3.14 * rr * rr, 3.14 * rr, 4 * 3.14 * rr, 3.14 * 4 * rr * rr]; sol = 'C = &pi;d = 3.14 &times; ' + (2 * rr);
      }
    } else {
      var a = r.entero(3, 15), bb = r.entero(3, 15);
      while (bb === a) bb = r.entero(3, 15);
      u = 'cm';
      enun = 'Un rect&aacute;ngulo mide ' + a + ' cm de largo y ' + bb + ' cm de ancho. &iquest;Cu&aacute;l es su per&iacute;metro?' + P.considere('P = 2(largo + ancho).');
      v = 2 * (a + bb); malas = [a * bb, a + bb, 4 * a, 2 * a * bb]; sol = 'P = 2(a + b) = 2(' + a + ' + ' + bb + ')';
    }
    return P.ejercicio(enun, P.opciones(r, v, malas.map(function (x) { return F.redondea(x, 2); }), { unidad: u, dec: 2 }),
      ['El area mide la superficie (unidades cuadradas); el perimetro, el contorno (unidades lineales).', 'Rombo: d<sub>1</sub>d<sub>2</sub>/2. Trapecio: (B + b)h/2. Paralelogramo: bh. Poligono regular: P&middot;a/2. Circulo: &pi;r' + F.sup(2) + ' y 2&pi;r.'],
      [sol + ' = <b>' + F.n(v, 2) + ' ' + u + '</b>']);
  }

  var ENFOQUES = {
    definiciones: [casos.definiciones, defTermino, defDefinicion, defLugares, poligonoNombre],
    notacion: [casos.notacion, casos.notacion, notacionQueEs, notacionEscribir],
    angulos: [casos.angulos, angRadianes, angComplemento, angParalelas, angParalelas, angPoligono, angEcuacion],
    relacionRectas: [rectasGrafico, rectasGrafico, casos.relacionRectas, pendienteParPerp, rectasGeneral, rectaPorPunto],
    triangulos: [casos.triangulos, triTercerAngulo, triDesigualdad, triPitagoras, triExterior, triIsosceles],
    semejanza: [casos.semejanza, semSombras, semTales, semRazonAreas, semCriterios, semEscala, congruencia],
    volumen: [casos.volumen, volPrismaPiramide, volDespeje, volLitros, volArea, volEscala, areasPerimetros, areasPerimetros],
    razones: [casos.razones, razProblema, razProblema, razFigura, razPitagoras, razDeOtra, razAngulo],
    sumaAngulos: [casos.sumaAngulos, sumExacto, sumCircUnit, sumCuadrante, sumIdentidad, sumDoble],
    areaTrig: [casos.areaTrig, areaSeno, leySenos, leyCosenos, areaEquilatero, triangulo45]
  };

  var SUB_GEOMETRIA = [
    ['definiciones', 'Definiciones (completar)', 'facil'],
    ['notacion', 'Notacion geometrica', 'facil'],
    ['angulos', 'Angulos y radianes', 'medio'],
    ['relacionRectas', 'Relacion entre rectas', 'medio'],
    ['triangulos', 'Clasificacion de triangulos', 'facil'],
    ['semejanza', 'Triangulos semejantes', 'medio'],
    ['volumen', 'Volumenes', 'medio'],
    ['razones', 'Razones trigonometricas', 'medio'],
    ['sumaAngulos', 'Circunferencia unitaria', 'dificil'],
    ['areaTrig', 'Area con seno', 'dificil']
  ];

  EJ.tema({
    id: 'prepa-geometria',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Geometria y trigonometria',
    descripcion: 'Definiciones, notacion, angulos y radianes, rectas, triangulos, semejanza, volumenes y trigonometria. Reactivos 9 a 18 de la guia.',
    etiquetas: ['circunferencia', 'angulos', 'radianes', 'triangulos', 'semejanza', 'volumen', 'seno', 'coseno'],
    dificultades: P.registrarSubtemas('prepa-geometria', SUB_GEOMETRIA),
    formulario: 'Grados a radianes: &times; &pi;/180 &nbsp;&middot;&nbsp; Cilindro: &pi;r' + F.sup(2) + 'h &nbsp;&middot;&nbsp; Cono: &pi;r' + F.sup(2) + 'h/3 &nbsp;&middot;&nbsp; Esfera: 4&pi;r' + F.sup(3) + '/3<br>' +
      'sen = op/hip &nbsp;&middot;&nbsp; cos = ady/hip &nbsp;&middot;&nbsp; tan = op/ady<br>' +
      'cos(&alpha; + &beta;) = cos&alpha; cos&beta; &minus; sen&alpha; sen&beta; &nbsp;&middot;&nbsp; sen(&alpha; + &beta;) = sen&alpha; cos&beta; + cos&alpha; sen&beta;',

    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-geometria', SUB_GEOMETRIA);
      return P.enfoque(r, ENFOQUES[t]);
    }
  });
})();
