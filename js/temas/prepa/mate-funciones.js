/* Modo prepa - Matematicas: funciones (reactivos 26 a 30) y calculo (31 a 33)
   de la version de practica */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  function intervalo(a, b, cerrado) { return (cerrado ? '[' : '(') + a + ', ' + b + (cerrado ? ']' : ')'); }
  function neg(n) { return n < 0 ? '&minus;' + (-n) : String(n); }

  var funciones = {}, calculo = {};

  /* 26. Rango de una funcion trigonometrica */
  funciones.rango = function (r) {
    var A = r.entero(2, 7), B = r.entero(2, 5), D = r.bool(0.4) ? r.enteroNoCero(-5, 5) : 0;
    while (B === A) B = r.entero(2, 5);
    var trig = r.elige(['cos', 'sen']);
    var f = 'f(x) = ' + A + ' &middot; ' + trig + '(' + B + 'x)' + (D ? (D > 0 ? ' + ' + D : ' &minus; ' + (-D)) : '');
    var bien = intervalo(neg(D - A), neg(D + A), true);
    var malas = [intervalo(neg(-B), neg(B), false), '(&minus;&infin;, &infin;)', intervalo(neg(-1), neg(1), true),
      intervalo(neg(-A), neg(A), true), intervalo(neg(D - B), neg(D + B), true)];
    return P.ejercicio(
      'Identifique el rango de la funci&oacute;n <span class="expr">' + f + '</span>.',
      P.opciones(r, bien, malas),
      [trig + '(lo que sea) siempre esta entre &minus;1 y 1, sin importar el ' + B + ' de adentro.',
        'Multiplica esos extremos por ' + A + (D ? ' y luego sumales ' + D : '') + '.'],
      ['&minus;1 &le; ' + trig + '(' + B + 'x) &le; 1',
        '&minus;' + A + ' &le; ' + A + trig + '(' + B + 'x) &le; ' + A + (D ? ' &rarr; sumando ' + D + ': ' + (D - A) + ' a ' + (D + A) : ''),
        'Rango: <b>' + bien + '</b>']);
  };

  /* 27. Paridad (relacione, con dos respuestas por grupo) */
  funciones.paridad = function (r) {
    var pares = ['x' + F.sup(2), 'x' + F.sup(4) + ' &minus; ' + r.entero(1, 9), 'cos(x)', '|x|', r.entero(2, 5) + 'x' + F.sup(2) + ' + ' + r.entero(1, 9), 'x' + F.sup(2) + 'cos(x)'];
    var impares = ['x' + F.sup(3), r.entero(2, 9) + 'x', 'sen(x)', 'x' + F.sup(3) + ' &minus; x', F.frac(1, 'x'), 'x' + F.sup(5) + ' + ' + r.entero(2, 6) + 'x'];
    var p = r.muestra(pares, 2), q = r.muestra(impares, 2);
    var der = r.baraja(p.concat(q));
    var grupos = [p.map(function (x) { return der.indexOf(x); }), q.map(function (x) { return der.indexOf(x); })];
    return P.relacione(r, 'Relacione cada condici&oacute;n de paridad con las funciones que la cumplen.', ['Condici&oacute;n', 'Funci&oacute;n'],
      ['Par', 'Impar'], der.map(function (x) { return 'f(x) = ' + x; }), grupos,
      ['Par: f(&minus;x) = f(x) (grafica simetrica respecto al eje y). Impar: f(&minus;x) = &minus;f(x) (simetrica respecto al origen).',
        'Prueba con x = 1 y x = &minus;1: si da lo mismo es par; si da lo mismo pero con signo contrario, impar.'],
      []);
  };

  /* 28. Tipos de funcion (relacione) */
  funciones.tipos = function (r) {
    var k = r.entero(2, 6), b = r.elige([2, 3, 4, 5]);
    var bancos = [
      { n: 'Algebraica', e: r.elige(['T(M) = ' + k + 'M' + F.sup(2) + ' + ' + r.entero(1, 9), 'g(x) = &radic;(x + ' + k + ')', 'h(s) = ' + F.frac('s + 1', 's &minus; ' + k)]) },
      { n: 'Exponencial', e: r.elige(['p(r) = ' + b + '<sup>' + k + 'r</sup>', 'N(t) = 500 &middot; ' + b + '<sup>t</sup>', 'y = e<sup>' + k + 'x</sup>']) },
      { n: 'Trigonom&eacute;trica', e: r.elige(['v(t) = sen(' + k + 't)', 'y = cos(x) + ' + k, 'w(&theta;) = tan(' + k + '&theta;)']) },
      { n: 'Logar&iacute;tmica', e: r.elige(['f(x) = log<sub>' + b + '</sub>(' + k + 'x)', 'q(t) = ln(t + ' + k + ')', 'y = log(' + k + 'x)']) }
    ];
    var der = r.baraja(bancos);
    return P.relacione(r, 'Relacione los tipos de funciones con la representaci&oacute;n que le corresponda.', ['Tipo de funci&oacute;n', 'Representaci&oacute;n'],
      bancos.map(function (x) { return x.n; }), der.map(function (x) { return x.e; }), bancos.map(function (x) { return der.indexOf(x); }),
      ['Exponencial: la variable esta en el EXPONENTE. Logaritmica: aparece log o ln.',
        'Trigonometrica: sen, cos, tan. Algebraica: solo sumas, productos, potencias fijas y raices de la variable.'],
      []);
  };

  /* 29. Logaritmos: tiempo de una inversion */
  funciones.logaritmos = function (r) {
    var i = r.elige([4, 5, 6, 8, 10]), t = r.entero(2, 6), C0 = r.elige([5000, 8000, 10000, 20000, 50000]);
    var C = Math.round(C0 * Math.pow(1 + i / 100, t) * 100) / 100;
    var l1 = Math.log10(1 + i / 100), l2 = Math.log10(C / C0);
    var anios = function (v) { return v + (v === 1 ? ' a&ntilde;o' : ' a&ntilde;os'); };
    return P.ejercicio(
      'La evoluci&oacute;n del capital dentro de un fondo de ahorro est&aacute; dada por C(t) = C<sub>0</sub> &middot; (1 + i/100)<sup>t</sup>, ' +
        'donde C<sub>0</sub> es la inversi&oacute;n inicial, i es la tasa de ganancia y t el tiempo en a&ntilde;os. Si se invierten ' + P.pesos(C0) +
        ' con una tasa del ' + i + ' por ciento, &iquest;en cu&aacute;nto tiempo se obtendr&aacute;n ' + P.pesos(C) + '?' +
        P.considere('log<sub>10</sub>(' + (1 + i / 100) + ') = ' + l1.toFixed(4) + ' y log<sub>10</sub>(' + F.n(C / C0, 6) + ') = ' + l2.toFixed(4) + '.'),
      P.opciones(r, t, [t - 1, t + 1, t + 2, t - 2], { fmt: anios }),
      ['Divide entre C<sub>0</sub>: (1 + i/100)<sup>t</sup> = ' + P.pesos(C) + ' / ' + P.pesos(C0) + '.',
        'Saca logaritmo de los dos lados: t &middot; log(' + (1 + i / 100) + ') = log(' + F.n(C / C0, 6) + ').'],
      [(1 + i / 100) + '<sup>t</sup> = ' + F.n(C / C0, 6),
        't = ' + l2.toFixed(4) + ' / ' + l1.toFixed(4) + ' = <b>' + t + '</b>']);
  };

  /* 30. Limite con indeterminacion 0/0 */
  funciones.limite = function (r) {
    var a = r.entero(2, 9), K = r.entero(2 * a + 30, 2 * a + 90);
    var v = K - 2 * a;
    var ctx = r.elige(['Una poblaci&oacute;n de monos capuchinos est&aacute; en peligro de desaparecer; la cantidad de ejemplares',
      'La cantidad de peces en un lago contaminado', 'El n&uacute;mero de ajolotes en un canal']);
    return P.ejercicio(
      ctx + ' se modela con la funci&oacute;n M(t) = ' + K + ' &minus; ' + F.frac('t' + F.sup(2) + ' &minus; ' + (a * a), 't &minus; ' + a) +
        ', donde t es el tiempo en a&ntilde;os. &iquest;Cu&aacute;ntos habr&aacute; en ' + a + ' a&ntilde;os?',
      P.opciones(r, v, [K - a, K - a * a, K - 2 * a - a, K, K - 2 * a + 2]),
      ['Si sustituyes t = ' + a + ' directo te sale 0/0: hay que simplificar primero (es un limite).',
        't' + F.sup(2) + ' &minus; ' + (a * a) + ' = (t &minus; ' + a + ')(t + ' + a + '): cancela el factor (t &minus; ' + a + ').'],
      [F.frac('t' + F.sup(2) + ' &minus; ' + (a * a), 't &minus; ' + a) + ' = t + ' + a,
        'M(' + a + ') = ' + K + ' &minus; (' + a + ' + ' + a + ') = <b>' + v + '</b>']);
  };

  /* 31. Derivada de un polinomio */
  calculo.derivada = function (r) {
    var a = r.entero(2, 9), b = r.enteroNoCero(-9, 9), c = r.enteroNoCero(-9, 9);
    var ctx = r.elige([['La energ&iacute;a E de una part&iacute;cula en movimiento', 'E(t)', 'el cambio de energ&iacute;a de la part&iacute;cula'],
      ['La posici&oacute;n s de un carrito', 's(t)', 'la velocidad del carrito'],
      ['El volumen V de agua en un tanque', 'V(t)', 'la rapidez con que cambia el volumen']]);
    var f = ctx[1] + ' = ' + P.poli([a, b, c, 0], 't');
    var bien = P.poli([3 * a, 2 * b, c], 't');
    var malas = [P.poli([3 * a, -2 * b, c], 't'), P.poli([3 * a, 2 * b, -c], 't'), P.poli([3 * a, -2 * b, -c], 't'), P.poli([a, b, c], 't')];
    return P.ejercicio(
      ctx[0] + ' se expresa en funci&oacute;n del tiempo t por medio de <span class="expr">' + f + '</span>. ' +
        '&iquest;Cu&aacute;l es la funci&oacute;n que describe ' + ctx[2] + ' respecto al tiempo?',
      P.opciones(r, bien, malas),
      ['El cambio respecto al tiempo es la DERIVADA.', 'Regla de la potencia: la derivada de t<sup>n</sup> es n&middot;t<sup>n&minus;1</sup>; los signos se conservan.'],
      ['Derivo termino a termino: ' + a + 't' + F.sup(3) + ' &rarr; ' + (3 * a) + 't' + F.sup(2) + ', ' + b + 't' + F.sup(2) + ' &rarr; ' + (2 * b) + 't, ' + c + 't &rarr; ' + c,
        'Resultado: <b>' + bien + '</b>']);
  };

  /* 32. Maximo en un intervalo */
  calculo.maximo = function (r) {
    var k = r.elige([1, 1, 2]), h = k + r.entero(1, 2), m = r.entero(1, 6);
    var tMax = h - k, vMax = 2 * k * k * k + m, tMin = h + k, vMin = -2 * k * k * k + m;
    var u = '(t &minus; ' + h + ')';
    var f = 'p(t) = ' + u + F.sup(3) + ' &minus; ' + (3 * k * k) + u + ' + ' + m;
    function op(v, t) { return F.n(v) + ' kPa en ' + t + ' s'; }
    var bien = op(vMax, tMax);
    var malas = [op(vMin, tMin), op(vMax, tMin), op(m, h), op(vMin, tMax), op(vMax - m, tMax)];
    return P.ejercicio(
      'En un experimento se midi&oacute;, durante ' + tMin + ' segundos, la presi&oacute;n de un gas expuesto a condiciones extremas. ' +
        'El modelo es <span class="expr">' + f + '</span>, con t en segundos y p(t) en kilopascales. ' +
        '&iquest;Cu&aacute;l es la presi&oacute;n m&aacute;xima y en qu&eacute; tiempo se alcanz&oacute;?',
      P.opciones(r, bien, malas),
      ['Deriva y busca donde p\'(t) = 0: p\'(t) = 3' + u + F.sup(2) + ' &minus; ' + (3 * k * k) + '.',
        'Salen dos tiempos; el maximo es donde la funcion pasa de subir a bajar (compara los valores).'],
      ['p\'(t) = 0 &rarr; ' + u + F.sup(2) + ' = ' + (k * k) + ' &rarr; t = ' + tMax + ' o t = ' + tMin,
        'p(' + tMax + ') = ' + vMax + ' y p(' + tMin + ') = ' + vMin,
        'Maximo: <b>' + bien + '</b>']);
  };

  /* 33. Integral definida: cuanto crecio */
  calculo.integral = function (r) {
    var a = r.entero(1, 3), b = r.entero(0, 4), c = r.entero(1, 5), T = r.entero(1, 3);
    var total = a * T * T * T + b * T * T + c * T;
    var deriv = 3 * a * T * T + 2 * b * T + c;
    var ctx = r.elige(['El crecimiento de una planta', 'El crecimiento de un cultivo de hongos', 'La altura del agua en una presa']);
    var unidad = 'cm';
    return P.ejercicio(
      ctx + ' se mide en cent&iacute;metros por cada segundo transcurrido y est&aacute; dado por la funci&oacute;n <span class="expr">c\'(t) = ' +
        P.poli([3 * a, 2 * b, c], 't') + '</span>. &iquest;Cu&aacute;ntos cent&iacute;metros creci&oacute; en ' + T + (T === 1 ? ' segundo' : ' segundos') + '?',
      P.opciones(r, total, [deriv, 6 * a * T + 2 * b, 0, total - c * T, total + c], { unidad: unidad }),
      ['c\'(t) es la RAPIDEZ de crecimiento; lo que crecio en total es la integral de 0 a ' + T + '.',
        'Una antiderivada es c(t) = ' + P.poli([a, b, c, 0], 't') + '.'],
      ['&int;<sub>0</sub><sup>' + T + '</sup> (' + P.poli([3 * a, 2 * b, c], 't') + ') dt = [' + P.poli([a, b, c, 0], 't') + ']<sub>0</sub><sup>' + T + '</sup>',
        '= ' + (a * T * T * T) + ' + ' + (b * T * T) + ' + ' + (c * T) + ' = <b>' + total + ' cm</b>']);
  };

  /* ================= otras formas de preguntar ================= */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  function fr(a, b) {
    var s = F.simplifica(a, b);
    if (s[1] === 1) return m(s[0]);
    return (s[0] < 0 ? '&minus;' : '') + F.frac(Math.abs(s[0]), s[1]);
  }
  /* fraccion de pi: pi(2, 3) -> 2pi/3 */
  function pi(n, d) {
    var s = F.simplifica(n, d), num = (s[0] === 1 ? '' : s[0] === -1 ? '&minus;' : m(s[0])) + '&pi;';
    return s[1] === 1 ? num : F.frac(num, s[1]);
  }
  /* (x - a) bien escrito */
  function xMenos(a) { return a === 0 ? 'x' : 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)); }
  function pol(c, v) { return P.poli(c, v).replace(/^-/, '&minus;'); }

  /* ---------- 26. rango, dominio y graficas ---------- */
  function ranAmplitudPeriodo(r) {
    var A = r.entero(2, 9), B = r.elige([2, 3, 4, 6]), trig = r.elige(['sen', 'cos']);
    while (A === B) A = r.entero(2, 9);
    function op(a, p) { return 'Amplitud ' + a + ', periodo ' + p; }
    return P.ejercicio('&iquest;Cu&aacute;les son la amplitud y el periodo de la funci&oacute;n <span class="expr">f(x) = ' + A + ' ' + trig + '(' + B + 'x)</span>?',
      P.opciones(r, op(A, pi(2, B)), [op(B, pi(2, A)), op(A, pi(2 * B, 1)), op(2 * A, pi(2, B)), op(A, pi(2, 1))]),
      ['La amplitud es el numero que multiplica a ' + trig + ' (cuanto sube y baja desde el centro).', 'El periodo de ' + trig + '(Bx) es 2&pi; / B.'],
      ['Amplitud: ' + A, 'Periodo: 2&pi; / ' + B + ' = ' + pi(2, B), '<b>' + op(A, pi(2, B)) + '</b>']);
  }

  function ranDominio(r) {
    var a = r.enteroNoCero(-9, 9), tipo = r.entero(0, 3);
    var ops = { cerrado: '[' + m(a) + ', &infin;)', abierto: '(' + m(a) + ', &infin;)', izq: '(&minus;&infin;, ' + m(a) + ']',
      menos: 'Todos los reales excepto x = ' + m(a), todos: 'Todos los n&uacute;meros reales', otro: '[' + m(-a) + ', &infin;)' };
    var f, bien, exp;
    if (tipo === 0) { f = '&radic;(' + xMenos(a) + ')'; bien = 'cerrado'; exp = 'Dentro de la raiz no puede haber negativos: ' + xMenos(a) + ' &ge; 0.'; }
    else if (tipo === 1) { f = F.frac(1, xMenos(a)); bien = 'menos'; exp = 'No se puede dividir entre cero: x no puede valer ' + m(a) + '.'; }
    else if (tipo === 2) { f = '&radic;(' + m(a) + ' &minus; x)'; bien = 'izq'; exp = m(a) + ' &minus; x &ge; 0, o sea x &le; ' + m(a) + '.'; }
    else { f = 'ln(' + xMenos(a) + ')'; bien = 'abierto'; exp = 'El logaritmo solo acepta positivos (sin el cero): ' + xMenos(a) + ' &gt; 0.'; }
    return P.ejercicio('&iquest;Cu&aacute;l es el dominio de la funci&oacute;n <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, ops[bien], Object.keys(ops).filter(function (k) { return k !== bien; }).map(function (k) { return ops[k]; })),
      ['El dominio son los valores de x que SI se pueden sustituir.', 'Cuidado con raices de negativos, division entre cero y logaritmos de negativos o cero.'],
      [exp, 'Dominio: <b>' + ops[bien] + '</b>']);
  }

  function ranCuadratica(r) {
    var a = r.enteroNoCero(-3, 3), h = r.enteroNoCero(-5, 5), k = r.enteroNoCero(-9, 9);
    while (Math.abs(k) === Math.abs(h)) k = r.enteroNoCero(-9, 9);
    var f = r.bool() ? (a === 1 ? '' : a === -1 ? '&minus;' : m(a)) + '(' + xMenos(h) + ')' + F.sup(2) + (k > 0 ? ' + ' + k : ' &minus; ' + (-k))
      : pol([a, -2 * a * h, a * h * h + k]);
    function arriba(v) { return '[' + m(v) + ', &infin;)'; }
    function abajo(v) { return '(&minus;&infin;, ' + m(v) + ']'; }
    var bien = a > 0 ? arriba(k) : abajo(k);
    return P.ejercicio('&iquest;Cu&aacute;l es el rango de la funci&oacute;n <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, bien, [a > 0 ? abajo(k) : arriba(k), a > 0 ? arriba(h) : abajo(h), 'Todos los n&uacute;meros reales', a > 0 ? arriba(-k) : abajo(-k)]),
      ['Es una parabola: su vertice marca el valor mas bajo (si abre hacia arriba) o el mas alto (si abre hacia abajo).',
        'El rango habla de los valores de y: depende de la k del vertice, no de la h.'],
      ['Vertice: (' + m(h) + ', ' + m(k) + '); abre hacia ' + (a > 0 ? 'arriba' : 'abajo'), 'Rango: <b>' + bien + '</b>']);
  }

  function ranMaxMin(r) {
    var A = r.entero(2, 9), B = r.entero(2, 6), D = r.enteroNoCero(-8, 8), trig = r.elige(['sen', 'cos']), max = r.bool();
    var v = max ? D + A : D - A;
    return P.ejercicio('&iquest;Cu&aacute;l es el valor ' + (max ? 'm&aacute;ximo' : 'm&iacute;nimo') + ' que alcanza la funci&oacute;n <span class="expr">f(x) = ' + A + ' ' + trig + '(' + B + 'x) ' +
      (D > 0 ? '+ ' + D : '&minus; ' + (-D)) + '</span>?',
      P.opciones(r, v, [max ? D - A : D + A, A, D, A * D, max ? A + B : B - A], { conSigno: true, fmt: m }),
      [trig + ' siempre esta entre &minus;1 y 1.', 'El ' + (max ? 'maximo' : 'minimo') + ' sale cuando ' + trig + ' vale ' + (max ? '1' : '&minus;1') + '.'],
      [A + '(' + (max ? '1' : '&minus;1') + ') ' + (D > 0 ? '+ ' + D : '&minus; ' + (-D)) + ' = <b>' + m(v) + '</b>']);
  }

  /* ---------- 27. paridad ---------- */
  var PARES = ['x' + F.sup(4) + ' &minus; 3x' + F.sup(2), 'cos(x)', '|x|', '5x' + F.sup(2) + ' + 2', 'x' + F.sup(2) + ' cos(x)', 'x' + F.sup(6) + ' + 1'];
  var IMPARES = ['x' + F.sup(3), '4x', 'sen(x)', 'x' + F.sup(3) + ' &minus; x', F.frac(1, 'x'), 'x' + F.sup(5) + ' + 2x'];
  var NINGUNA = ['x' + F.sup(2) + ' + x', 'x' + F.sup(3) + ' + 1', '(x &minus; 1)' + F.sup(2), 'e<sup>x</sup>', 'x + 5', 'cos(x) + x'];

  function parUna(r) {
    var par = r.bool(), bien = r.elige(par ? PARES : IMPARES);
    var malas = r.muestra(par ? IMPARES : PARES, 2).concat(r.muestra(NINGUNA, 1));
    return P.ejercicio('&iquest;Cu&aacute;l de las siguientes funciones es ' + (par ? 'par' : 'impar') + '?',
      P.opciones(r, 'f(x) = ' + bien, malas.map(function (x) { return 'f(x) = ' + x; })),
      ['Sustituye x por &minus;x en cada inciso.', 'Par: f(&minus;x) = f(x). Impar: f(&minus;x) = &minus;f(x).'],
      ['f(x) = ' + bien + ' es <b>' + (par ? 'par' : 'impar') + '</b>']);
  }

  function parSimetria(r) {
    var par = r.bool();
    var ops = ['Al eje y', 'Al origen', 'Al eje x', 'A la recta y = x'];
    return P.ejercicio('La gr&aacute;fica de una funci&oacute;n ' + (par ? 'par' : 'impar') + ' es sim&eacute;trica con respecto:',
      P.opciones(r, par ? ops[0] : ops[1], par ? [ops[1], ops[2], ops[3]] : [ops[0], ops[2], ops[3]]),
      ['Par: lo de la izquierda es el reflejo de lo de la derecha (como x' + F.sup(2) + ').', 'Impar: si giras la grafica media vuelta alrededor del origen queda igual (como x' + F.sup(3) + ').'],
      ['Una funcion ' + (par ? 'par' : 'impar') + ' es simetrica respecto <b>' + (par ? 'al eje y' : 'al origen') + '</b>']);
  }

  function parValor(r) {
    var par = r.bool(), a = r.entero(2, 9), v = r.enteroNoCero(-15, 15), suma = r.bool(0.35);
    var res = suma ? (par ? 2 * v : 0) : (par ? v : -v);
    return P.ejercicio('Si f es una funci&oacute;n ' + (par ? 'par' : 'impar') + ' y f(' + a + ') = ' + m(v) + ', &iquest;cu&aacute;nto vale ' +
      (suma ? 'f(' + a + ') + f(&minus;' + a + ')' : 'f(&minus;' + a + ')') + '?',
      P.opciones(r, res, suma ? [par ? 0 : 2 * v, v, -v, a] : [par ? -v : v, 0, -a, F.redondea(1 / v, 2)], { conSigno: true, fmt: m }),
      ['Par: f(&minus;x) = f(x). Impar: f(&minus;x) = &minus;f(x).', 'Aplica la regla con x = ' + a + '.'],
      ['f(&minus;' + a + ') = ' + m(par ? v : -v) + (suma ? ', asi que la suma es ' + m(res) : ''), 'Resultado: <b>' + m(res) + '</b>']);
  }

  function parClasifica(r) {
    var tipo = r.entero(0, 2), f = r.elige([PARES, IMPARES, NINGUNA][tipo]);
    var NOM = ['Par', 'Impar', 'Ni par ni impar', 'Par e impar a la vez'];
    return P.ejercicio('&iquest;C&oacute;mo es la funci&oacute;n <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, NOM[tipo], NOM.filter(function (_, i) { return i !== tipo; })),
      ['Calcula f(&minus;x) y comparalo con f(x) y con &minus;f(x).', 'Si no coincide con ninguno, no es par ni impar.'],
      ['f(x) = ' + f + ': <b>' + NOM[tipo].toLowerCase() + '</b>']);
  }

  /* ---------- 28. tipos de funciones ---------- */
  function tipGrafica(r) {
    var rango = { x: [-4, 4], y: [-3, 5] };
    var g = {
      Exponencial: P.miniGrafica(function (x) { return Math.pow(2, x) - 1; }, rango),
      'Logar&iacute;tmica': P.miniGrafica(function (x) { return x > 0.02 ? 1.3 * Math.log(x) + 1 : NaN; }, rango),
      'Trigonom&eacute;trica': P.miniGrafica(function (x) { return 1.6 * Math.sin(1.6 * x) + 1; }, rango),
      'Cuadr&aacute;tica': P.miniGrafica(function (x) { return 0.45 * x * x - 2; }, rango),
      Lineal: P.miniGrafica(function (x) { return 0.8 * x + 1; }, rango)
    };
    var pide = r.elige(['Exponencial', 'Logar&iacute;tmica', 'Trigonom&eacute;trica', 'Cuadr&aacute;tica']);
    return P.ejercicio('&iquest;Cu&aacute;l de las siguientes gr&aacute;ficas corresponde a una funci&oacute;n ' + pide.toLowerCase() + '?',
      P.opciones(r, g[pide], r.muestra(Object.keys(g).filter(function (k) { return k !== pide; }), 3).map(function (k) { return g[k]; })),
      ['Exponencial: casi pegada al eje x a la izquierda y se dispara hacia arriba. Logaritmica: solo existe para x &gt; 0 y crece cada vez mas lento.',
        'Trigonometrica: ondas que se repiten. Cuadratica: una parabola.'],
      ['La grafica correcta es la de la funcion <b>' + pide.toLowerCase() + '</b>.']);
  }

  function tipContexto(r) {
    var c = r.elige([['El n&uacute;mero de bacterias de un cultivo que se duplica cada hora', 'Exponencial'],
      ['El valor de un auto que pierde el 15% de su valor cada a&ntilde;o', 'Exponencial'],
      ['La altura de un asiento de la rueda de la fortuna conforme pasa el tiempo', 'Trigonom&eacute;trica'],
      ['La temperatura promedio de una ciudad a lo largo de varios a&ntilde;os, que se repite cada a&ntilde;o', 'Trigonom&eacute;trica'],
      ['La intensidad de un sonido medida en decibeles', 'Logar&iacute;tmica'], ['La magnitud de un sismo en la escala de Richter', 'Logar&iacute;tmica'],
      ['El &aacute;rea de un cuadrado seg&uacute;n la medida de su lado', 'Algebraica (polinomial)'], ['Lo que se paga por x kilos de tortilla a $22 el kilo', 'Algebraica (polinomial)']]);
    var NOM = ['Exponencial', 'Trigonom&eacute;trica', 'Logar&iacute;tmica', 'Algebraica (polinomial)'];
    return P.ejercicio('&iquest;Qu&eacute; tipo de funci&oacute;n modela mejor la siguiente situaci&oacute;n?<br><div class="lectura">' + c[0] + '.</div>',
      P.opciones(r, c[1], NOM.filter(function (x) { return x !== c[1]; })),
      ['Algo que se multiplica por lo mismo cada periodo es exponencial; algo que se repite como onda es trigonometrica.',
        'Las escalas que comprimen numeros muy grandes (decibeles, Richter, pH) son logaritmicas.'],
      ['Es una funcion <b>' + c[1].toLowerCase() + '</b>']);
  }

  function tipComposicion(r) {
    var a = r.enteroNoCero(-4, 5), b = r.enteroNoCero(-6, 6), c = r.entero(-5, 5), k = r.enteroNoCero(-3, 4), fog = r.bool();
    function f(x) { return a * x + b; }
    function g(x) { return x * x + c; }
    var v = fog ? f(g(k)) : g(f(k)), otro = fog ? g(f(k)) : f(g(k));
    var gTxt = 'x' + F.sup(2) + (c === 0 ? '' : c > 0 ? ' + ' + c : ' &minus; ' + (-c));
    return P.ejercicio('Si <span class="expr">f(x) = ' + pol([a, b]) + '</span> y <span class="expr">g(x) = ' + gTxt + '</span>, &iquest;cu&aacute;nto vale (' + (fog ? 'f &#8728; g' : 'g &#8728; f') + ')(' + m(k) + ')?',
      P.opciones(r, v, [otro, f(k) * g(k), f(k) + g(k), fog ? f(k) : g(k)], { conSigno: true, fmt: m }),
      ['(' + (fog ? 'f &#8728; g' : 'g &#8728; f') + ')(x) = ' + (fog ? 'f(g(x))' : 'g(f(x))') + ': primero se evalua la de adentro.',
        'Calcula ' + (fog ? 'g' : 'f') + '(' + m(k) + ') y ese resultado lo metes en ' + (fog ? 'f' : 'g') + '.'],
      [(fog ? 'g(' + m(k) + ') = ' + m(g(k)) + ', f(' + m(g(k)) + ') = ' : 'f(' + m(k) + ') = ' + m(f(k)) + ', g(' + m(f(k)) + ') = ') + '<b>' + m(v) + '</b>']);
  }

  function tipInversa(r) {
    var a = r.enteroNoCero(-5, 6), b = r.enteroNoCero(-9, 9);
    while (Math.abs(a) === 1) a = r.enteroNoCero(-5, 6);
    function sobre(num, den) { return den === 1 ? num : den === -1 ? '&minus;(' + num + ')' : F.frac(num, m(den)); }
    var bien = sobre(xMenos(b), a);
    return P.ejercicio('&iquest;Cu&aacute;l es la funci&oacute;n inversa de <span class="expr">f(x) = ' + pol([a, b]) + '</span>?',
      P.opciones(r, 'f<sup>&minus;1</sup>(x) = ' + bien, [sobre(xMenos(-b), a), pol([a, -b]), F.frac(1, pol([a, b])), sobre(xMenos(b), -a)].map(function (t) { return 'f<sup>&minus;1</sup>(x) = ' + t; })),
      ['Escribe y = ' + pol([a, b]) + ', intercambia x con y y despeja y.', 'La inversa deshace en orden contrario: primero quita el ' + m(b) + ' y luego divide entre ' + m(a) + '.'],
      ['x = ' + pol([a, b], 'y') + ' &rarr; y = ' + bien, 'f<sup>&minus;1</sup>(x) = <b>' + bien + '</b>']);
  }

  function tipValor(r) {
    var tipo = r.entero(0, 2), enun, v, malas, sol;
    if (tipo === 0) {
      var c = r.entero(2, 6), b = r.elige([2, 3]), n = r.entero(2, b === 2 ? 6 : 4);
      v = c * Math.pow(b, n); enun = 'Si f(x) = ' + c + ' &middot; ' + b + '<sup>x</sup>, &iquest;cu&aacute;nto vale f(' + n + ')?';
      malas = [Math.pow(c * b, n), c * b * n, c + Math.pow(b, n), c * Math.pow(b, n - 1)]; sol = c + ' &middot; ' + b + '<sup>' + n + '</sup> = ' + c + ' &middot; ' + Math.pow(b, n) + ' = <b>' + v + '</b>';
    } else if (tipo === 1) {
      var b2 = r.elige([2, 3, 5, 10]), k = r.entero(2, b2 === 2 ? 7 : 4), N = Math.pow(b2, k), c2 = r.entero(1, 9);
      v = k + c2; enun = 'Si g(x) = log<sub>' + b2 + '</sub>(x) + ' + c2 + ', &iquest;cu&aacute;nto vale g(' + P.num(N, 0) + ')?';
      malas = [N / b2 + c2, k * c2, k, N + c2]; sol = 'log<sub>' + b2 + '</sub>(' + N + ') = ' + k + ' porque ' + b2 + '<sup>' + k + '</sup> = ' + N + '; ' + k + ' + ' + c2 + ' = <b>' + v + '</b>';
    } else {
      var A = r.entero(2, 9), x0 = r.elige([1, 3]);
      v = x0 === 1 ? A : -A; enun = 'Si h(x) = ' + A + ' sen(' + F.frac('&pi;x', 2) + '), &iquest;cu&aacute;nto vale h(' + x0 + ')?';
      malas = [x0 === 1 ? -A : A, 0, A / 2, 2 * A]; sol = 'h(' + x0 + ') = ' + A + ' sen(' + (x0 === 1 ? F.frac('&pi;', 2) : F.frac('3&pi;', 2)) + ') = ' + A + '(' + (x0 === 1 ? '1' : '&minus;1') + ') = <b>' + m(v) + '</b>';
    }
    return P.ejercicio(enun, P.opciones(r, v, malas, { conSigno: true, fmt: m }),
      ['Sustituye el valor en lugar de x y respeta el orden: primero la potencia, el logaritmo o el seno; despues lo demas.', 'log<sub>b</sub>(N) es el exponente al que hay que elevar b para obtener N.'], [sol]);
  }

  /* ---------- 29. logaritmos y exponenciales ---------- */
  function logValor(r) {
    var tipo = r.entero(0, 3), b, k, N, txt;
    if (tipo === 0) { b = r.elige([2, 3, 4, 5]); k = r.entero(2, b === 2 ? 7 : 4); N = String(Math.pow(b, k)); txt = 'log<sub>' + b + '</sub> ' + N; }
    else if (tipo === 1) { b = 10; k = r.elige([-3, -2, -1, 2, 3, 4]); N = k > 0 ? P.num(Math.pow(10, k), 0).replace(/ /g, ',') : String(Math.pow(10, k)); txt = 'log ' + N; }
    else if (tipo === 2) { b = r.elige([2, 3]); k = -r.entero(2, 4); N = F.frac(1, Math.pow(b, -k)); txt = 'log<sub>' + b + '</sub> ' + N; }
    else { b = 'e'; k = r.entero(2, 9); N = 'e<sup>' + k + '</sup>'; txt = 'ln(' + N + ')'; }
    var malas = [k + 1, -k, k * 2, typeof b === 'number' ? b * k : k - 1, k - 1];
    return P.ejercicio('&iquest;Cu&aacute;l es el valor de <span class="expr">' + txt + '</span>?',
      P.opciones(r, k, malas, { conSigno: true, fmt: m }),
      ['log<sub>b</sub>(N) = k quiere decir b<sup>k</sup> = N: busca el exponente.', 'Un logaritmo de un numero entre 0 y 1 es negativo.'],
      [(b === 'e' ? 'e' : b) + '<sup>' + k + '</sup> = ' + N + ', asi que ' + txt + ' = <b>' + m(k) + '</b>']);
  }

  function logEcuacion(r) {
    var b = r.elige([2, 3, 5]), k = r.entero(2, b === 2 ? 7 : 4), c = r.enteroNoCero(-3, 3), a = r.elige([1, 1, 2]);
    var N = Math.pow(b, k), x = (k - c) / a;
    var exp = (a === 1 ? 'x' : a + 'x') + (c > 0 ? ' + ' + c : ' &minus; ' + (-c));
    return P.ejercicio('Resuelva la ecuaci&oacute;n <span class="expr">' + b + '<sup>' + exp + '</sup> = ' + N + '</span>.',
      P.opciones(r, x, [(k + c) / a, k, N / b - c, (N - c) / a].map(function (v) { return F.redondea(v, 2); }), { conSigno: true, dec: 2, fmt: function (v) { return 'x = ' + m(F.redondea(v, 2)); } }),
      ['Escribe ' + N + ' como potencia de ' + b + ': ' + N + ' = ' + b + '<sup>' + k + '</sup>.', 'Con la misma base, los exponentes son iguales: ' + exp + ' = ' + k + '.'],
      [exp + ' = ' + k + ' &rarr; x = <b>' + m(x) + '</b>']);
  }

  function logPropiedades(r) {
    var tipo = r.entero(0, 2), enun, bien, malas;
    if (tipo === 0) {
      var n = r.entero(2, 5);
      enun = 'log(' + F.frac('x<sup>' + n + '</sup>y', 'z') + ')';
      bien = n + ' log x + log y &minus; log z';
      malas = [n + ' log x &middot; log y &minus; log z', 'log ' + n + 'x + log y &minus; log z', n + ' log x + log y + log z', '(log x)<sup>' + n + '</sup> + log y &minus; log z'];
    } else if (tipo === 1) {
      enun = 'log<sub>b</sub>(M &middot; N)';
      bien = 'log<sub>b</sub> M + log<sub>b</sub> N';
      malas = ['log<sub>b</sub> M &middot; log<sub>b</sub> N', 'log<sub>b</sub> M &minus; log<sub>b</sub> N', 'log<sub>b</sub>(M + N)', 'M &middot; log<sub>b</sub> N'];
    } else {
      var k = r.entero(2, 6);
      enun = 'ln(' + F.frac('a', 'b<sup>' + k + '</sup>') + ')';
      bien = 'ln a &minus; ' + k + ' ln b';
      malas = ['ln a + ' + k + ' ln b', F.frac('ln a', k + ' ln b'), 'ln a &minus; (ln b)<sup>' + k + '</sup>', k + ' ln a &minus; ln b'];
    }
    return P.ejercicio('&iquest;A qu&eacute; es igual la expresi&oacute;n <span class="expr">' + enun + '</span>?',
      P.opciones(r, bien, malas),
      ['El logaritmo de un producto es la SUMA de logaritmos; el de un cociente, la RESTA.', 'Un exponente pasa al frente multiplicando: log(x<sup>n</sup>) = n log x.'],
      [enun + ' = <b>' + bien + '</b>']);
  }

  function logCrecimiento(r) {
    var tipo = r.entero(0, 1), enun, v, malas, sol, u;
    if (tipo === 0) {
      var ini = r.elige([40, 80, 120, 160, 200, 320]), vida = r.elige([3, 5, 8, 10, 20]), n = r.entero(2, 4);
      v = ini / Math.pow(2, n); u = 'g';
      enun = 'Una sustancia radiactiva se reduce a la mitad cada ' + vida + ' a&ntilde;os. Si hoy hay ' + ini + ' g, &iquest;cu&aacute;nto quedar&aacute; dentro de ' + (vida * n) + ' a&ntilde;os?';
      malas = [ini / (2 * n), ini / Math.pow(2, n - 1), ini - ini / 2 * n, ini / Math.pow(2, n + 1)];
      sol = (vida * n) + ' a&ntilde;os son ' + n + ' vidas medias: ' + ini + ' / 2<sup>' + n + '</sup> = <b>' + F.n(v, 2) + ' g</b>';
    } else {
      var P0 = r.elige([1000, 2000, 4000, 5000]), i = r.elige([10, 20, 50]), t = r.entero(2, 4);
      v = F.redondea(P0 * Math.pow(1 + i / 100, t), 2); u = 'habitantes';
      enun = 'Una poblaci&oacute;n de ' + P.num(P0, 0) + ' habitantes crece ' + i + '% cada a&ntilde;o, es decir, P(t) = ' + P.num(P0, 0) + ' &middot; (' + (1 + i / 100) + ')<sup>t</sup>. &iquest;Cu&aacute;ntos habitantes habr&aacute; en ' + t + ' a&ntilde;os?';
      malas = [P0 * (1 + i / 100 * t), P0 * Math.pow(1 + i / 100, t - 1), P0 * (1 + i / 100) * t, P0 + i * t];
      sol = P.num(P0, 0) + ' &middot; ' + (1 + i / 100) + '<sup>' + t + '</sup> = <b>' + P.num(v, v === Math.round(v) ? 0 : 2) + '</b>';
    }
    return P.ejercicio(enun, P.opciones(r, v, malas.map(function (x) { return F.redondea(x, 2); }), { unidad: u, dec: 2, fmt: function (x) { return P.num(x, x === Math.round(x) ? 0 : 2); } }),
      ['En el crecimiento (o decaimiento) exponencial se MULTIPLICA por lo mismo en cada periodo; no se suma.', 'Cuenta cuantos periodos pasan y eleva el factor a esa potencia.'], [sol]);
  }

  /* ---------- 30. limites y continuidad ---------- */
  function limSustitucion(r) {
    var a = r.enteroNoCero(-4, 5), b = r.enteroNoCero(-6, 6), c = r.entero(-9, 9), x0 = r.enteroNoCero(-3, 4);
    var v = a * x0 * x0 + b * x0 + c;
    return P.ejercicio('Calcule <span class="expr">lim<sub>x&rarr;' + m(x0) + '</sub> (' + pol([a, b, c]) + ')</span>.',
      P.opciones(r, v, [a * x0 * x0 - b * x0 + c, a * x0 + b * x0 + c, a * x0 * x0 + b * x0, -v], { conSigno: true, fmt: m }),
      ['Los polinomios son continuos: basta con sustituir x = ' + m(x0) + '.', 'Usa parentesis al sustituir negativos.'],
      [m(a) + '(' + m(x0) + ')' + F.sup(2) + ' + ' + P.np(b) + '(' + m(x0) + ') + ' + P.np(c) + ' = <b>' + m(v) + '</b>']);
  }

  function limInfinito(r) {
    var tipo = r.entero(0, 2), a = r.entero(2, 9), c = r.entero(2, 9), b = r.enteroNoCero(-9, 9), d = r.enteroNoCero(-9, 9), num, den, bien, malas, exp;
    while (c === a) c = r.entero(2, 9);
    if (tipo === 0) { num = pol([a, 0, b]); den = pol([c, d, 0]); bien = fr(a, c); malas = [fr(b, d), '0', 'No existe (crece sin l&iacute;mite)', fr(c, a)]; exp = 'Mismo grado arriba y abajo: el limite es el cociente de los coeficientes principales, ' + a + '/' + c + '.'; }
    else if (tipo === 1) { num = pol([a, b]); den = pol([c, 0, d]); bien = '0'; malas = [fr(a, c), fr(b, d), 'No existe (crece sin l&iacute;mite)', '1']; exp = 'El denominador tiene mayor grado: la fraccion se hace cada vez mas chica.'; }
    else { num = pol([a, 0, 0, b]); den = pol([c, d]); bien = 'No existe (crece sin l&iacute;mite)'; malas = [fr(a, c), '0', fr(b, d), '1']; exp = 'El numerador tiene mayor grado: la fraccion crece sin limite.'; }
    return P.ejercicio('Calcule <span class="expr">lim<sub>x&rarr;&infin;</sub> ' + F.frac(num, den) + '</span>.',
      P.opciones(r, bien, malas),
      ['Compara el grado (el mayor exponente) de arriba y de abajo.', 'Puedes dividir todo entre la potencia mas alta del denominador.'],
      [exp, 'Limite: <b>' + bien + '</b>']);
  }

  function limTrinomio(r) {
    var a, b;
    do { a = r.enteroNoCero(-6, 6); b = r.enteroNoCero(-6, 6); } while (a === b || a === -b);
    var num = pol([1, -(a + b), a * b]), v = a - b;
    return P.ejercicio('Calcule <span class="expr">lim<sub>x&rarr;' + m(a) + '</sub> ' + F.frac(num, xMenos(a)) + '</span>.',
      P.opciones(r, String(m(v)), [m(a + b), '0', 'No existe', m(a * b), m(b - a)]),
      ['Si sustituyes directo sale 0/0: factoriza el numerador.', num + ' = (' + xMenos(a) + ')(' + xMenos(b) + '); cancela el factor repetido.'],
      [F.frac(num, xMenos(a)) + ' = ' + xMenos(b), 'Sustituyendo x = ' + m(a) + ': ' + m(a) + ' &minus; ' + P.np(b) + ' = <b>' + m(v) + '</b>']);
  }

  function limTabla(r) {
    var x0 = r.entero(1, 5), L = r.enteroNoCero(-8, 12), k = r.entero(2, 5) * r.signo();
    var xs = [x0 - 0.1, x0 - 0.01, x0 - 0.001, x0 + 0.001, x0 + 0.01, x0 + 0.1];
    var ys = xs.map(function (x) { return F.redondea(L + k * (x - x0), 3); });
    var tabla = '<table class="tabla"><tr><th>x</th>' + xs.map(function (x) { return '<td>' + F.n(x, 3) + '</td>'; }).join('') + '</tr>' +
      '<tr><th>f(x)</th>' + ys.map(function (y) { return '<td>' + m(y) + '</td>'; }).join('') + '</tr></table>';
    return P.ejercicio('Con base en la tabla, &iquest;a qu&eacute; valor se aproxima f(x) cuando x se acerca a ' + x0 + '?<div class="tablero-caja">' + tabla + '</div>',
      P.opciones(r, L, [x0, ys[0], ys[5], L + k], { conSigno: true, fmt: m }),
      ['Fijate en la fila de f(x) en las columnas mas cercanas a ' + x0 + ' (por la izquierda y por la derecha).', 'El limite es el numero al que se acercan los dos lados, aunque nunca lo toquen.'],
      ['Por los dos lados f(x) se acerca a <b>' + m(L) + '</b>']);
  }

  function limContinuidad(r) {
    var p = r.enteroNoCero(-9, 9), q = r.enteroNoCero(-9, 9);
    while (q === p || q === -p) q = r.enteroNoCero(-9, 9);
    return P.ejercicio('&iquest;En qu&eacute; valor de x la funci&oacute;n <span class="expr">f(x) = ' + F.frac(xMenos(-p), xMenos(q)) + '</span> no es continua?',
      P.opciones(r, 'x = ' + m(q), ['x = ' + m(-q), 'x = ' + m(-p), 'x = ' + m(p), 'x = 0']),
      ['Una fraccion se rompe donde el denominador vale 0.', 'Iguala ' + xMenos(q) + ' a cero y despeja.'],
      [xMenos(q) + ' = 0 &rarr; x = <b>' + m(q) + '</b>']);
  }

  /* ---------- 31. derivadas ---------- */
  function derValor(r) {
    var a = r.enteroNoCero(-5, 6), b = r.enteroNoCero(-9, 9), c = r.entero(0, 20), t0 = r.entero(1, 5);
    var v = 2 * a * t0 + b;
    return P.ejercicio('La posici&oacute;n de un objeto (en metros) es <span class="expr">s(t) = ' + pol([a, b, c], 't') + '</span>, con t en segundos. &iquest;Cu&aacute;l es su velocidad en t = ' + t0 + ' s?',
      P.opciones(r, v, [a * t0 * t0 + b * t0 + c, 2 * a * t0, a * t0 + b, 2 * a * t0 * t0 + b], { conSigno: true, fmt: function (x) { return m(x) + ' m/s'; } }),
      ['La velocidad es la derivada de la posicion: v(t) = s\'(t).', 'Deriva y despues sustituye t = ' + t0 + '; no sustituyas en s(t).'],
      ['v(t) = ' + pol([2 * a, b], 't'), 'v(' + t0 + ') = ' + m(2 * a) + '(' + t0 + ') + ' + P.np(b) + ' = <b>' + m(v) + ' m/s</b>']);
  }

  function derRegla(r) {
    var k = r.entero(2, 9), tipo = r.entero(0, 4), f, bien, malas;
    if (tipo === 0) {
      var a = r.entero(2, 5), b = r.enteroNoCero(-7, 7), n = r.entero(2, 5), u = '(' + pol([a, b]) + ')';
      f = u + '<sup>' + n + '</sup>';
      bien = (n * a) + u + (n - 1 > 1 ? '<sup>' + (n - 1) + '</sup>' : '');
      malas = [n + u + (n - 1 > 1 ? '<sup>' + (n - 1) + '</sup>' : ''), (n * a) + u + '<sup>' + n + '</sup>', a + u + (n - 1 > 1 ? '<sup>' + (n - 1) + '</sup>' : ''), n + 'x' + u + (n - 1 > 1 ? '<sup>' + (n - 1) + '</sup>' : '')];
    } else if (tipo === 1) {
      f = 'sen(' + k + 'x)'; bien = k + ' cos(' + k + 'x)'; malas = ['cos(' + k + 'x)', '&minus;' + k + ' cos(' + k + 'x)', k + ' sen(' + k + 'x)', '&minus;cos(' + k + 'x)'];
    } else if (tipo === 2) {
      f = 'cos(' + k + 'x)'; bien = '&minus;' + k + ' sen(' + k + 'x)'; malas = [k + ' sen(' + k + 'x)', '&minus;sen(' + k + 'x)', '&minus;' + k + ' cos(' + k + 'x)', 'sen(' + k + 'x)'];
    } else if (tipo === 3) {
      f = 'e<sup>' + k + 'x</sup>'; bien = k + 'e<sup>' + k + 'x</sup>'; malas = ['e<sup>' + k + 'x</sup>', k + 'x e<sup>' + k + 'x &minus; 1</sup>', 'e<sup>' + k + '</sup>', F.frac('e<sup>' + k + 'x</sup>', k)];
    } else {
      f = 'ln(' + k + 'x)'; bien = F.frac(1, 'x'); malas = [F.frac(k, 'x'), F.frac(1, k + 'x'), 'ln(' + k + ')', k + ' ln(x)'];
    }
    return P.ejercicio('&iquest;Cu&aacute;l es la derivada de <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, 'f\'(x) = ' + bien, malas.map(function (t) { return 'f\'(x) = ' + t; })),
      ['Regla de la cadena: deriva la funcion de afuera y multiplica por la derivada de lo de adentro.',
        '(sen u)\' = cos u &middot; u\', (cos u)\' = &minus;sen u &middot; u\', (e<sup>u</sup>)\' = e<sup>u</sup> &middot; u\', (ln u)\' = u\'/u.'],
      ['f\'(x) = <b>' + bien + '</b>']);
  }

  function derTangente(r) {
    var a = r.enteroNoCero(-3, 4), b = r.enteroNoCero(-6, 6), c = r.entero(-8, 8), x0 = r.enteroNoCero(-3, 3);
    var mm = 2 * a * x0 + b, y0 = a * x0 * x0 + b * x0 + c, bb = y0 - mm * x0;
    if (r.bool()) {
      return P.ejercicio('&iquest;Cu&aacute;l es la pendiente de la recta tangente a la curva <span class="expr">y = ' + pol([a, b, c]) + '</span> en el punto donde x = ' + m(x0) + '?',
        P.opciones(r, mm, [y0, 2 * a + b, a * x0 + b, -mm], { conSigno: true, fmt: m }),
        ['La pendiente de la tangente es la derivada evaluada en ese punto.', 'y\' = ' + pol([2 * a, b]) + '.'],
        ['y\'(' + m(x0) + ') = ' + m(2 * a) + '(' + m(x0) + ') + ' + P.np(b) + ' = <b>' + m(mm) + '</b>']);
    }
    function rec(mm2, b2) { return 'y = ' + pol([mm2, b2]); }
    return P.ejercicio('&iquest;Cu&aacute;l es la ecuaci&oacute;n de la recta tangente a <span class="expr">y = ' + pol([a, b, c]) + '</span> en x = ' + m(x0) + '?',
      P.opciones(r, rec(mm, bb), [rec(mm, y0), rec(y0, bb), rec(-mm, bb), rec(mm, c), rec(mm, bb + 2 * x0), rec(mm + 1, bb - x0), rec(mm, -bb - 1)]
        .filter(function (t) { return t !== rec(mm, bb); })),
      ['Necesitas un punto y una pendiente: el punto es (' + m(x0) + ', f(' + m(x0) + ')) y la pendiente es f\'(' + m(x0) + ').', 'Luego usa y &minus; y<sub>1</sub> = m(x &minus; x<sub>1</sub>).'],
      ['Punto: (' + m(x0) + ', ' + m(y0) + '), pendiente: ' + m(mm), 'Tangente: <b>' + rec(mm, bb) + '</b>']);
  }

  function derTabla(r) {
    var n = r.entero(3, 7);
    var pares = [['x<sup>' + n + '</sup>', n + 'x<sup>' + (n - 1) + '</sup>'], ['sen x', 'cos x'], ['cos x', '&minus;sen x'], ['e<sup>x</sup>', 'e<sup>x</sup>'],
      ['ln x', F.frac(1, 'x')], ['7 (una constante)', '0'], ['tan x', 'sec' + F.sup(2) + 'x']];
    var elegidos = r.muestra(pares, 4), resto = pares.filter(function (p) { return elegidos.indexOf(p) === -1; });
    var der = r.baraja(elegidos.map(function (p) { return p[1]; }).concat([r.elige(resto)[1]]));
    return P.relacione(r, 'Relacione cada funci&oacute;n con su derivada.', ['Funci&oacute;n', 'Derivada'],
      elegidos.map(function (p) { return 'f(x) = ' + p[0]; }), der.map(function (d) { return 'f\'(x) = ' + d; }), elegidos.map(function (p) { return der.indexOf(p[1]); }),
      ['La derivada de sen es cos, y la de cos es MENOS sen.', 'e<sup>x</sup> es su propia derivada; la de ln x es 1/x; la de una constante, 0.'], []);
  }

  function derInterpreta(r) {
    var q = r.entero(50, 300), v = r.entero(15, 90);
    var ops = ['Producir la pieza ' + (q + 1) + ' cuesta aproximadamente $' + v + ' adicionales',
      'Producir ' + q + ' piezas cuesta en total $' + v, 'El costo promedio de cada una de las ' + q + ' piezas es $' + v, 'El costo fijo de la f&aacute;brica es de $' + v];
    return P.ejercicio('C(x) es el costo en pesos de producir x piezas. Si C\'(' + q + ') = ' + v + ', &iquest;qu&eacute; significa este dato?',
      P.opciones(r, ops[0], ops.slice(1)),
      ['La derivada es una razon de cambio: cuanto cambia el costo por cada pieza mas.', 'No es el costo total ni el promedio: es el costo "marginal".'],
      ['C\'(' + q + ') = ' + v + ': <b>' + ops[0] + '</b>']);
  }

  /* ---------- 32. maximos y minimos ---------- */
  function maxCerca(r) {
    var Pm = r.elige([40, 60, 80, 100, 120, 200]), rio = r.bool();
    function op(a, b) { return F.n(a, 2) + ' m por ' + F.n(b, 2) + ' m'; }
    if (rio) {
      var x = Pm / 4, y = Pm / 2;
      return P.ejercicio('Con ' + Pm + ' m de malla se quiere cercar un terreno rectangular junto a un r&iacute;o; el lado del r&iacute;o no se cerca. &iquest;Qu&eacute; medidas dan el &aacute;rea m&aacute;xima?' +
        P.considere('A(x) = x(' + Pm + ' &minus; 2x), donde x es cada lado perpendicular al r&iacute;o.'),
        P.opciones(r, op(x, y), [op(Pm / 4, Pm / 4), op(Pm / 3, Pm / 3), op(Pm / 2, Pm / 4 / 2), op(Pm / 5, Pm - 2 * Pm / 5)]),
        ['Deriva A(x) = ' + Pm + 'x &minus; 2x' + F.sup(2) + ' e iguala a cero.', 'El lado paralelo al rio mide ' + Pm + ' &minus; 2x.'],
        ['A\'(x) = ' + Pm + ' &minus; 4x = 0 &rarr; x = ' + x, 'Lado paralelo: ' + Pm + ' &minus; 2(' + x + ') = ' + y, '<b>' + op(x, y) + '</b> (area ' + (x * y) + ' m' + F.sup(2) + ')']);
    }
    var l = Pm / 4;
    return P.ejercicio('Con ' + Pm + ' m de malla se quiere cercar un terreno rectangular por sus cuatro lados. &iquest;Qu&eacute; medidas dan el &aacute;rea m&aacute;xima?' +
      P.considere('A(x) = x(' + (Pm / 2) + ' &minus; x).'),
      P.opciones(r, op(l, l), [op(Pm / 2, Pm / 4), op(Pm / 3, Pm / 6), op(Pm / 5, 3 * Pm / 10), op(Pm / 8, 3 * Pm / 8)]),
      ['Si un lado mide x, el otro mide ' + (Pm / 2) + ' &minus; x.', 'Deriva A(x) e iguala a cero: el maximo es un cuadrado.'],
      ['A\'(x) = ' + (Pm / 2) + ' &minus; 2x = 0 &rarr; x = ' + l, '<b>' + op(l, l) + '</b>']);
  }

  function maxCriticos(r) {
    var k = r.entero(1, 4), c = r.entero(-9, 9), maxi = r.bool();
    var f = 'x' + F.sup(3) + ' &minus; ' + (3 * k * k) + 'x' + (c === 0 ? '' : c > 0 ? ' + ' + c : ' &minus; ' + (-c));
    var bien = maxi ? -k : k;
    return P.ejercicio('&iquest;En qu&eacute; valor de x tiene un ' + (maxi ? 'm&aacute;ximo' : 'm&iacute;nimo') + ' relativo la funci&oacute;n <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, 'x = ' + m(bien), ['x = ' + m(-bien), 'x = 0', 'x = ' + (3 * k * k), 'x = ' + m(c)].filter(function (t) { return t !== 'x = ' + m(bien); })),
      ['f\'(x) = 3x' + F.sup(2) + ' &minus; ' + (3 * k * k) + ' = 0 da dos puntos criticos.', 'Usa la segunda derivada f\'\'(x) = 6x: negativa en un maximo, positiva en un minimo.'],
      ['Puntos criticos: x = &plusmn;' + k, 'f\'\'(' + m(-k) + ') = ' + m(-6 * k) + ' &lt; 0 (maximo) y f\'\'(' + k + ') = ' + (6 * k) + ' &gt; 0 (minimo)', '<b>x = ' + m(bien) + '</b>']);
  }

  function maxCreciente(r) {
    var a = r.enteroNoCero(-3, 3), h = r.enteroNoCero(-6, 6), k = r.entero(-9, 9);
    var f = pol([a, -2 * a * h, a * h * h + k]), crece = r.bool();
    var der = '(' + m(h) + ', &infin;)', izq = '(&minus;&infin;, ' + m(h) + ')';
    var bien = (a > 0) === crece ? der : izq;
    return P.ejercicio('&iquest;En qu&eacute; intervalo es ' + (crece ? 'creciente' : 'decreciente') + ' la funci&oacute;n <span class="expr">f(x) = ' + f + '</span>?',
      P.opciones(r, bien, [bien === der ? izq : der, '(' + m(-h) + ', &infin;)', '(&minus;&infin;, ' + m(-h) + ')', '(&minus;&infin;, &infin;)']),
      ['f es creciente donde f\'(x) &gt; 0 y decreciente donde f\'(x) &lt; 0.', 'f\'(x) = ' + pol([2 * a, -2 * a * h]) + ' cambia de signo en x = ' + m(h) + '.'],
      ['f\'(x) = ' + pol([2 * a, -2 * a * h]), (crece ? 'Creciente' : 'Decreciente') + ' en <b>' + bien + '</b>']);
  }

  function maxIngreso(r) {
    var q = r.entero(1, 5), xs = r.entero(10, 60), p = 2 * q * xs;
    var I = p * xs - q * xs * xs;
    function op(x, v) { return x + ' productos, ingreso de $' + P.num(v, 0).replace(/ /g, ','); }
    return P.ejercicio('El ingreso por vender x productos es <span class="expr">I(x) = ' + p + 'x &minus; ' + (q === 1 ? '' : q) + 'x' + F.sup(2) + '</span> pesos. &iquest;Cu&aacute;ntos productos hay que vender para obtener el ingreso m&aacute;ximo y de cu&aacute;nto es?',
      P.opciones(r, op(xs, I), [op(2 * xs, I), op(xs, p * xs), op(Math.round(xs / 2), p * Math.round(xs / 2) - q * Math.round(xs / 2) * Math.round(xs / 2)), op(p, I)]),
      ['Deriva: I\'(x) = ' + p + ' &minus; ' + (2 * q) + 'x, iguala a cero y despeja.', 'Despues sustituye ese x en I(x).'],
      ['x = ' + p + ' / ' + (2 * q) + ' = ' + xs, 'I(' + xs + ') = ' + P.num(I, 0), '<b>' + op(xs, I) + '</b>']);
  }

  function maxConcepto(r) {
    var neg = r.bool(), ops = ['Un m&aacute;ximo relativo', 'Un m&iacute;nimo relativo', 'Un punto de inflexi&oacute;n', 'Una as&iacute;ntota vertical'];
    return P.ejercicio('Si f\'(a) = 0 y f\'\'(a) ' + (neg ? '&lt;' : '&gt;') + ' 0, &iquest;qu&eacute; tiene la funci&oacute;n f en x = a?',
      P.opciones(r, neg ? ops[0] : ops[1], neg ? [ops[1], ops[2], ops[3]] : [ops[0], ops[2], ops[3]]),
      ['f\'(a) = 0: la tangente es horizontal (puede ser maximo o minimo).', 'f\'\' negativa: la curva es concava hacia abajo, como una montana.'],
      ['Criterio de la segunda derivada: <b>' + (neg ? ops[0] : ops[1]).toLowerCase() + '</b>']);
  }

  /* ---------- 33. integrales ---------- */
  function intAntiderivada(r) {
    var a = 3 * r.enteroNoCero(-3, 3), b = 2 * r.enteroNoCero(-4, 4), c = r.enteroNoCero(-9, 9);
    var bien = pol([a / 3, b / 2, c, 0]) + ' + C';
    var malas = [pol([a, b, c, 0]) + ' + C', pol([2 * a, b]) + ' + C', pol([a / 3, b / 2, 0, 0]) + ' + C', pol([a / 2, b, c, 0]) + ' + C'];
    return P.ejercicio('&iquest;Cu&aacute;l es el resultado de <span class="expr">&int;(' + pol([a, b, c]) + ') dx</span>?',
      P.opciones(r, bien, malas),
      ['Regla de la potencia para integrar: &int;x<sup>n</sup> dx = x<sup>n+1</sup> / (n + 1) + C.', 'Sube el exponente en 1 y divide entre el nuevo exponente; la constante se vuelve ' + c + 'x.'],
      ['&int;' + pol([a, 0, 0]) + ' dx = ' + pol([a / 3, 0, 0, 0]) + ', &int;' + pol([b, 0]) + ' dx = ' + pol([b / 2, 0, 0]) + ', &int;' + m(c) + ' dx = ' + pol([c, 0]),
        '<b>' + bien + '</b>']);
  }

  function intArea(r) {
    var tipo = r.entero(0, 1), a = r.entero(2, 6), v, f, malas, sol;
    if (tipo === 0) { f = 'x' + F.sup(2); v = a * a * a / 3; malas = [a * a, a * a * a, 2 * a, a * a / 2]; sol = '&int;<sub>0</sub><sup>' + a + '</sup> x' + F.sup(2) + ' dx = ' + a + F.sup(3) + '/3'; }
    else { var k = r.entero(2, 6); f = k + 'x'; v = k * a * a / 2; malas = [k * a * a, k * a, k, k * a * a / 4]; sol = '&int;<sub>0</sub><sup>' + a + '</sup> ' + k + 'x dx = ' + k + '(' + a + F.sup(2) + ')/2'; }
    return P.ejercicio('&iquest;Cu&aacute;l es el &aacute;rea bajo la curva <span class="expr">y = ' + f + '</span>, entre x = 0 y x = ' + a + '?',
      P.opciones(r, F.redondea(v, 2), malas.map(function (x) { return F.redondea(x, 2); }), { dec: 2, unidad: 'u' + F.sup(2) }),
      ['El area bajo la curva es la integral definida de 0 a ' + a + '.', 'Integra, evalua en ' + a + ' y resta lo que da en 0.'],
      [sol + ' = <b>' + F.n(v, 2) + ' u' + F.sup(2) + '</b>']);
  }

  function intDefinida(r) {
    var mm = r.enteroNoCero(-4, 6), c = r.enteroNoCero(-6, 8), a = r.entero(-2, 2), b = a + r.entero(1, 4);
    function Fx(x) { return mm * x * x / 2 + c * x; }
    var v = Fx(b) - Fx(a);
    return P.ejercicio('Calcule <span class="expr">&int;<sub>' + m(a) + '</sub><sup>' + m(b) + '</sup> (' + pol([mm, c]) + ') dx</span>.',
      P.opciones(r, F.redondea(v, 2), [Fx(b), Fx(b) + Fx(a), mm * b + c, (mm * b + c) - (mm * a + c)].map(function (x) { return F.redondea(x, 2); }), { conSigno: true, dec: 2, fmt: function (x) { return m(F.redondea(x, 2)); } }),
      ['Integra: F(x) = ' + F.frac(m(mm), 2) + 'x' + F.sup(2) + ' + ' + P.np(c) + 'x.', 'Despues F(' + m(b) + ') &minus; F(' + m(a) + '): primero el de arriba menos el de abajo.'],
      ['F(' + m(b) + ') = ' + m(F.redondea(Fx(b), 2)) + ', F(' + m(a) + ') = ' + m(F.redondea(Fx(a), 2)), 'Resultado: <b>' + m(F.redondea(v, 2)) + '</b>']);
  }

  function intTrig(r) {
    var tipo = r.entero(0, 3), enun, bien, malas;
    if (tipo === 0) { enun = '&int; cos x dx'; bien = 'sen x + C'; malas = ['&minus;sen x + C', 'cos x + C', '&minus;cos x + C']; }
    else if (tipo === 1) { enun = '&int; sen x dx'; bien = '&minus;cos x + C'; malas = ['cos x + C', 'sen x + C', '&minus;sen x + C']; }
    else if (tipo === 2) { enun = '&int;<sub>0</sub><sup>&pi;</sup> sen x dx'; bien = '2'; malas = ['0', '1', '&minus;2', '&pi;']; }
    else { enun = '&int;<sub>0</sub><sup>&pi;/2</sup> cos x dx'; bien = '1'; malas = ['0', '&minus;1', '2', F.frac('&pi;', 2)]; }
    return P.ejercicio('&iquest;Cu&aacute;l es el resultado de <span class="expr">' + enun + '</span>?',
      P.opciones(r, bien, malas),
      ['La integral deshace la derivada: (sen x)\' = cos x y (cos x)\' = &minus;sen x.', 'Para la definida evalua la antiderivada en los limites: sen(&pi;/2) = 1, cos(&pi;) = &minus;1.'],
      [enun + ' = <b>' + bien + '</b>']);
  }

  var ENF_FUNCIONES = {
    rango: [funciones.rango, ranAmplitudPeriodo, ranDominio, ranCuadratica, ranMaxMin],
    paridad: [funciones.paridad, parUna, parSimetria, parValor, parClasifica],
    tipos: [funciones.tipos, tipGrafica, tipContexto, tipComposicion, tipInversa, tipValor],
    logaritmos: [funciones.logaritmos, logValor, logEcuacion, logPropiedades, logCrecimiento],
    limite: [funciones.limite, limSustitucion, limInfinito, limTrinomio, limTabla, limContinuidad]
  };
  var ENF_CALCULO = {
    derivada: [calculo.derivada, derValor, derRegla, derRegla, derTangente, derTabla, derInterpreta],
    maximo: [calculo.maximo, maxCerca, maxCriticos, maxCreciente, maxIngreso, maxConcepto],
    integral: [calculo.integral, intAntiderivada, intArea, intDefinida, intTrig]
  };

  var SUB_FUNCIONES = [
    ['rango', 'Rango de funciones trigonometricas', 'facil'],
    ['paridad', 'Paridad', 'medio'],
    ['tipos', 'Tipos de funciones', 'facil'],
    ['logaritmos', 'Logaritmos e interes', 'dificil'],
    ['limite', 'Limites', 'medio']
  ];

  EJ.tema({
    id: 'prepa-funciones',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Funciones',
    descripcion: 'Rango, paridad, tipos de funcion, logaritmos y limites. Reactivos 26 a 30 de la guia.',
    etiquetas: ['rango', 'paridad', 'exponencial', 'logaritmo', 'limite'],
    dificultades: P.registrarSubtemas('prepa-funciones', SUB_FUNCIONES),
    formulario: '&minus;1 &le; sen x, cos x &le; 1 &nbsp;&middot;&nbsp; Par: f(&minus;x) = f(x) &nbsp;&middot;&nbsp; Impar: f(&minus;x) = &minus;f(x)<br>' +
      'log(a<sup>t</sup>) = t&middot;log(a) &nbsp;&middot;&nbsp; a' + F.sup(2) + ' &minus; b' + F.sup(2) + ' = (a &minus; b)(a + b)',
    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-funciones', SUB_FUNCIONES);
      return P.enfoque(r, ENF_FUNCIONES[t]);
    }
  });

  var SUB_CALCULO = [
    ['derivada', 'Derivada', 'facil'],
    ['maximo', 'Maximo en un intervalo', 'dificil'],
    ['integral', 'Integral definida', 'medio']
  ];

  EJ.tema({
    id: 'prepa-calculo',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Calculo',
    descripcion: 'Derivada como razon de cambio, maximos en un intervalo e integral como acumulacion. Reactivos 31 a 33 de la guia.',
    etiquetas: ['derivada', 'maximo', 'integral'],
    dificultades: P.registrarSubtemas('prepa-calculo', SUB_CALCULO),
    formulario: '(t<sup>n</sup>)\' = n&middot;t<sup>n&minus;1</sup> &nbsp;&middot;&nbsp; Maximos y minimos: f\'(t) = 0<br>' +
      '&int;<sub>a</sub><sup>b</sup> f\'(t) dt = f(b) &minus; f(a)',
    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-calculo', SUB_CALCULO);
      return P.enfoque(r, ENF_CALCULO[t]);
    }
  });
})();
