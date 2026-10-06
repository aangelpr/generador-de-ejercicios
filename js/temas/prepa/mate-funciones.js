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
      return funciones[t](r);
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
      return calculo[t](r);
    }
  });
})();
