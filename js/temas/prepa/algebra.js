/* Modo prepa: algebra (ecuaciones, planteamiento, sistemas, productos notables) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var NOMBRES = ['Ana', 'Luis', 'Sofia', 'Diego', 'Mariana', 'Jorge', 'Valeria', 'Carlos', 'Fernanda', 'Emilio'];

  /* "3x + 5", "3x - 5" */
  function lineal(a, b) { return F.poli([a, b]); }

  /* Negativos entre parentesis: 4 -> "4", -4 -> "(-4)" */
  function np(k) { return k < 0 ? '(' + k + ')' : String(k); }

  var casos = {};

  /* ---------- facil ---------- */

  casos.ecuacion = function (r) {
    var x = r.enteroNoCero(-9, 12), a = r.entero(2, 9), b = r.enteroNoCero(-20, 20);
    var c = a * x + b;
    var resp = P.opciones(r, x, [(c + b) / a, c / a - b, (c - b) * a, -x], { dec: 2 });
    return P.ejercicio(
      '&iquest;Cual es el valor de x en la ecuacion?<br><span class="expr">' + lineal(a, b) + ' = ' + c + '</span>',
      resp,
      ['Deja sola a la x: primero pasa el ' + b + ' al otro lado con la operacion contraria.',
        'Despues divide entre ' + a + '.'],
      [a + 'x = ' + c + ' ' + (b > 0 ? '&minus; ' + b : '+ ' + (-b)) + ' = ' + (c - b),
        'x = ' + (c - b) + ' &divide; ' + a + ' = <b>' + x + '</b>']);
  };

  casos.evaluar = function (r) {
    var a = r.enteroNoCero(-4, 4), b = r.enteroNoCero(-6, 6), c = r.entero(-9, 9);
    var x = r.enteroNoCero(-4, 4);
    var v = a * x * x + b * x + c;
    var resp = P.opciones(r, v, [a * (-x * x) + b * x + c, a * 2 * x + b * x + c, a * x * x - b * x + c, (a * x) * (a * x) + b * x + c]);
    return P.ejercicio(
      'Si x = ' + x + ', &iquest;cuanto vale la expresion <span class="expr">' + F.poli([a, b, c]) + '</span>?',
      resp,
      ['Sustituye x por (' + x + ') con todo y parentesis.',
        '(' + x + ')' + F.sup(2) + ' = ' + (x * x) + ': el cuadrado de un negativo es positivo.'],
      ['Sustituyo: ' + a + '(' + x + ')' + F.sup(2) + ' + ' + np(b) + '(' + x + ') + ' + np(c),
        '= ' + a + '(' + (x * x) + ') + ' + np(b * x) + ' + ' + np(c),
        '= ' + (a * x * x) + ' + ' + np(b * x) + ' + ' + np(c) + ' = <b>' + v + '</b>']);
  };

  casos.lenguaje = function (r) {
    var n = r.entero(2, 5), k = r.entero(2, 9);
    var frases = [
      { t: 'El doble de un numero aumentado en ' + k, bien: '2x + ' + k, mal: ['2(x + ' + k + ')', 'x' + F.sup(2) + ' + ' + k, '2 + x + ' + k] },
      { t: 'El triple de la suma de un numero y ' + k, bien: '3(x + ' + k + ')', mal: ['3x + ' + k, 'x + 3 &middot; ' + k, '3 + x + ' + k] },
      { t: 'El cuadrado de un numero disminuido en ' + k, bien: 'x' + F.sup(2) + ' &minus; ' + k, mal: ['(x &minus; ' + k + ')' + F.sup(2), '2x &minus; ' + k, k + ' &minus; x' + F.sup(2)] },
      { t: 'La mitad de un numero menos ' + k, bien: 'x/2 &minus; ' + k, mal: ['(x &minus; ' + k + ')/2', '2x &minus; ' + k, k + ' &minus; x/2'] },
      { t: 'La suma de dos numeros consecutivos', bien: 'x + (x + 1)', mal: ['x + x', 'x(x + 1)', '2x + 2'] },
      { t: n + ' veces un numero es igual a ese numero mas ' + k, bien: n + 'x = x + ' + k, mal: [n + '(x + ' + k + ') = x', n + 'x + x = ' + k, 'x + ' + n + ' = ' + k + 'x'] }
    ];
    var f = r.elige(frases);
    var resp = P.opciones(r, f.bien, f.mal);
    return P.ejercicio(
      '&iquest;Cual expresion algebraica representa la frase?<br><i>&ldquo;' + f.t + '&rdquo;</i>',
      resp,
      ['Lee con cuidado a que se le aplica cada operacion.',
        '"El doble de la suma" lleva parentesis; "el doble de un numero, mas..." no.'],
      ['Traduccion: <b>' + f.bien + '</b>']);
  };

  /* ---------- medio ---------- */

  casos.planteamiento = function (r) {
    var tipo = r.entero(0, 2);
    var enun, v, err, pistas, sol;
    if (tipo === 0) {
      /* tres consecutivos que suman S */
      var x = r.entero(8, 60);
      var s = 3 * x + 3;
      v = x + 2;
      err = [x, x + 1, s / 3, x + 3];
      enun = 'La suma de tres numeros enteros consecutivos es ' + s + '. &iquest;Cual es el mayor de ellos?';
      pistas = ['Llama x al primero: los otros son x + 1 y x + 2.', 'x + (x + 1) + (x + 2) = ' + s + ', o sea 3x + 3 = ' + s + '.'];
      sol = ['x + (x + 1) + (x + 2) = ' + s, '3x + 3 = ' + s + ' &rarr; 3x = ' + (s - 3) + ' &rarr; x = ' + x,
        'Los numeros son ' + x + ', ' + (x + 1) + ' y ' + (x + 2) + '; el mayor es <b>' + v + '</b>'];
    } else if (tipo === 1) {
      /* edades */
      var hijo = r.entero(6, 16), veces = r.entero(2, 4);
      var papa = hijo * veces, suma = hijo + papa;
      var quien = r.elige(NOMBRES);
      v = hijo;
      err = [papa, suma / veces, suma - veces, suma / 2];
      enun = 'La mama de ' + quien + ' tiene ' + (veces === 2 ? 'el doble' : veces === 3 ? 'el triple' : 'el cuadruple') + ' de la edad de ' + quien +
        ' y entre los dos suman ' + suma + ' anos. &iquest;Cuantos anos tiene ' + quien + '?';
      pistas = ['Si ' + quien + ' tiene x anos, su mama tiene ' + veces + 'x.', 'x + ' + veces + 'x = ' + suma + '.'];
      sol = ['x + ' + veces + 'x = ' + suma, (veces + 1) + 'x = ' + suma,
        'x = ' + suma + ' &divide; ' + (veces + 1) + ' = <b>' + hijo + ' anos</b> (su mama tiene ' + papa + ')'];
    } else {
      /* rectangulo: largo = ancho + d, perimetro P */
      var ancho = r.entero(4, 25), d = r.entero(2, 12);
      var largo = ancho + d, per = 2 * (ancho + largo);
      v = largo * ancho;
      err = [per, largo + ancho, (per / 4) * (per / 4), largo * 2 * ancho];
      enun = 'Un terreno rectangular mide ' + d + ' m mas de largo que de ancho y su perimetro es de ' + per + ' m. &iquest;Cual es su area?';
      pistas = ['Ancho = x, largo = x + ' + d + '. Perimetro = 2(largo + ancho).',
        '2(x + x + ' + d + ') = ' + per + '. Ya con x, multiplica largo por ancho.'];
      sol = ['2(2x + ' + d + ') = ' + per + ' &rarr; 4x + ' + (2 * d) + ' = ' + per + ' &rarr; x = ' + ancho,
        'Ancho ' + ancho + ' m, largo ' + largo + ' m',
        'Area = ' + largo + ' &times; ' + ancho + ' = <b>' + v + ' m&sup2;</b>'];
      return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'm&sup2;' }), pistas, sol);
    }
    return P.ejercicio(enun, P.opciones(r, v, err), pistas, sol);
  };

  casos.sistema = function (r) {
    var cosas = r.elige([
      ['tortas', 'refrescos'], ['cuadernos', 'lapices'], ['boletos de adulto', 'boletos de nino'], ['tacos', 'aguas']
    ]);
    var p1, p2, a1, b1, a2, b2;
    do {
      p1 = r.entero(8, 45); p2 = r.entero(5, 30);
      a1 = r.entero(1, 5); b1 = r.entero(1, 5); a2 = r.entero(1, 5); b2 = r.entero(1, 5);
    } while (p1 === p2 || a1 * b2 - a2 * b1 === 0);
    var c1 = a1 * p1 + b1 * p2, c2 = a2 * p1 + b2 * p2;
    var resp = P.opciones(r, p1, [p2, c1 / (a1 + b1), p1 + p2, Math.abs(c1 - c2)], { antes: '$' });
    return P.ejercicio(
      'Por ' + a1 + ' ' + cosas[0] + ' y ' + b1 + ' ' + cosas[1] + ' se pagaron $' + c1 + '. ' +
        'Por ' + a2 + ' ' + cosas[0] + ' y ' + b2 + ' ' + cosas[1] + ' se pagaron $' + c2 + '. ' +
        '&iquest;Cuanto cuesta cada uno de los ' + cosas[0] + '?',
      resp,
      ['Plantea: ' + a1 + 'x + ' + b1 + 'y = ' + c1 + ' y ' + a2 + 'x + ' + b2 + 'y = ' + c2 + ', con x = precio de ' + cosas[0] + '.',
        'Multiplica las ecuaciones para que la y tenga el mismo coeficiente y restalas (eliminacion).'],
      [a1 + 'x + ' + b1 + 'y = ' + c1 + ' &nbsp; y &nbsp; ' + a2 + 'x + ' + b2 + 'y = ' + c2,
        'Multiplico la primera por ' + b2 + ' y la segunda por ' + b1 + ':',
        (a1 * b2) + 'x + ' + (b1 * b2) + 'y = ' + (c1 * b2) + ' &nbsp; y &nbsp; ' + (a2 * b1) + 'x + ' + (b1 * b2) + 'y = ' + (c2 * b1),
        'Resto: ' + (a1 * b2 - a2 * b1) + 'x = ' + (c1 * b2 - c2 * b1) + ' &rarr; x = <b>$' + p1 + '</b>',
        'Y el otro precio: y = $' + p2]);
  };

  casos.productoNotable = function (r) {
    var a = r.entero(1, 5), b = r.entero(1, 9);
    var s = r.elige([1, -1]);
    var tipo = r.entero(0, 1);
    var ax = (a === 1 ? '' : a) + 'x';
    var bien, mal, enun, sol;
    if (tipo === 0) {
      /* (ax +- b)^2 */
      enun = '(' + ax + (s > 0 ? ' + ' : ' &minus; ') + b + ')' + F.sup(2);
      bien = F.poli([a * a, s * 2 * a * b, b * b]);
      mal = [F.poli([a * a, 0, b * b]), F.poli([a * a, s * a * b, b * b]), F.poli([a * a, s * 2 * a * b, -b * b])];
      sol = ['Binomio al cuadrado: (a ' + (s > 0 ? '+' : '&minus;') + ' b)' + F.sup(2) + ' = a' + F.sup(2) + ' ' + (s > 0 ? '+' : '&minus;') + ' 2ab + b' + F.sup(2),
        'Cuadrado del primero: ' + F.poli([a * a, 0, 0]) + '; doble producto: ' + F.poli([s * 2 * a * b, 0]) + '; cuadrado del segundo: ' + (b * b),
        'Resultado: <b>' + bien + '</b>'];
    } else {
      /* (ax + b)(ax - b) */
      enun = '(' + ax + ' + ' + b + ')(' + ax + ' &minus; ' + b + ')';
      bien = F.poli([a * a, 0, -b * b]);
      mal = [F.poli([a * a, 0, b * b]), F.poli([a * a, -2 * a * b, -b * b]), F.poli([a, 0, -b]), F.poli([a * a, 2 * a * b, -b * b])];
      sol = ['Binomios conjugados: (a + b)(a &minus; b) = a' + F.sup(2) + ' &minus; b' + F.sup(2),
        'Los terminos de en medio se cancelan',
        'Resultado: <b>' + bien + '</b>'];
    }
    return P.ejercicio('&iquest;Cual es el resultado de desarrollar <span class="expr">' + enun + '</span>?',
      P.opciones(r, bien, mal),
      ['Es un producto notable: no hace falta multiplicar termino por termino.',
        tipo === 0 ? 'No olvides el doble producto del primero por el segundo.' : 'Los terminos cruzados se cancelan: queda una diferencia de cuadrados.'],
      sol);
  };

  /* ---------- dificil ---------- */

  casos.factorizar = function (r) {
    var p, q;
    do { p = r.enteroNoCero(-9, 9); q = r.enteroNoCero(-9, 9); } while (p === -q || p === q);
    /* (x + p)(x + q) = x^2 + (p+q)x + pq */
    function fac(u, w) {
      function f(k) { return '(x ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + ')'; }
      return f(u) + f(w);
    }
    var bien = fac(p, q);
    var mal = [fac(-p, -q), fac(p, -q), fac(p * q > 0 ? p + q : -p, q)];
    return P.ejercicio(
      '&iquest;Cual es la factorizacion de <span class="expr">' + F.poli([1, p + q, p * q]) + '</span>?',
      P.opciones(r, bien, mal),
      ['Busca dos numeros que multiplicados den ' + (p * q) + ' y sumados den ' + (p + q) + '.',
        'Fijate en los signos: si el producto es negativo, los numeros tienen signos distintos.'],
      [F.poli([1, p + q, p * q]) + ': buscamos m &times; n = ' + (p * q) + ' y m + n = ' + (p + q),
        'Son ' + p + ' y ' + q + ' porque ' + p + ' &times; ' + np(q) + ' = ' + (p * q) + ' y ' + p + ' + ' + np(q) + ' = ' + (p + q),
        'Factorizacion: <b>' + bien + '</b>']);
  };

  casos.cuadratica = function (r) {
    var x1, x2;
    do { x1 = r.enteroNoCero(-9, 9); x2 = r.enteroNoCero(-9, 9); } while (x1 === x2 || x1 === -x2);
    var b = -(x1 + x2), c = x1 * x2;
    function par(u, w) { var m = [u, w].sort(function (i, j) { return i - j; }); return 'x = ' + m[0] + ' y x = ' + m[1]; }
    var bien = par(x1, x2);
    var mal = [par(-x1, -x2), par(x1, -x2), par(-x1, x2)];
    return P.ejercicio(
      '&iquest;Cuales son las soluciones de la ecuacion <span class="expr">' + F.poli([1, b, c]) + ' = 0</span>?',
      P.opciones(r, bien, mal),
      ['Factoriza: busca dos numeros que multiplicados den ' + c + ' y sumados den ' + b + '.',
        'Si (x &minus; m)(x &minus; n) = 0, las soluciones son x = m y x = n: cambian de signo respecto a lo que esta en el parentesis.'],
      ['Factorizo: ' + F.poli([1, b, c]) + ' = (x ' + (x1 > 0 ? '&minus; ' + x1 : '+ ' + (-x1)) + ')(x ' + (x2 > 0 ? '&minus; ' + x2 : '+ ' + (-x2)) + ')',
        'Cada factor igual a cero: x = ' + x1 + ', x = ' + x2,
        'Soluciones: <b>' + bien + '</b>',
        'Tambien sale con la formula general x = (&minus;b &plusmn; &radic;(b' + F.sup(2) + ' &minus; 4ac)) / 2a']);
  };

  casos.despeje = function (r) {
    var f = r.elige([
      { txt: 'v = d / t', var: 't', bien: 't = d / v', mal: ['t = v / d', 't = d &middot; v', 't = v &minus; d'] },
      { txt: 'F = m &middot; a', var: 'a', bien: 'a = F / m', mal: ['a = m / F', 'a = F &middot; m', 'a = F &minus; m'] },
      { txt: 'A = b &middot; h / 2', var: 'h', bien: 'h = 2A / b', mal: ['h = A / 2b', 'h = 2b / A', 'h = A &middot; b / 2'] },
      { txt: 'y = mx + b', var: 'x', bien: 'x = (y &minus; b) / m', mal: ['x = y / m &minus; b', 'x = (y + b) / m', 'x = m(y &minus; b)'] },
      { txt: 'P = 2l + 2a', var: 'l', bien: 'l = (P &minus; 2a) / 2', mal: ['l = P / 2 &minus; 2a', 'l = (P + 2a) / 2', 'l = P &minus; a'] },
      { txt: 'C = 5(F &minus; 32) / 9', var: 'F', bien: 'F = 9C / 5 + 32', mal: ['F = 5C / 9 + 32', 'F = 9(C + 32) / 5', 'F = 9C / 5 &minus; 32'] },
      { txt: 'E = m c' + F.sup(2), var: 'c', bien: 'c = &radic;(E / m)', mal: ['c = E / 2m', 'c = (E / m)' + F.sup(2), 'c = &radic;(E &middot; m)'] }
    ]);
    return P.ejercicio(
      'En la formula <span class="expr">' + f.txt + '</span>, &iquest;cual es el despeje correcto de <b>' + f.var + '</b>?',
      P.opciones(r, f.bien, f.mal),
      ['Lo que suma pasa restando, lo que multiplica pasa dividiendo (y al reves).',
        'Quita primero lo que esta "mas lejos" de ' + f.var + ' y al final lo que la multiplica.'],
      ['Despejando ' + f.var + ' de ' + f.txt + ':', '<b>' + f.bien + '</b>']);
  };

  EJ.tema({
    id: 'prepa-algebra',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Algebra',
    descripcion: 'Ecuaciones, lenguaje algebraico, problemas con ecuaciones, sistemas, productos notables y factorizacion.',
    etiquetas: ['ecuaciones', 'sistemas', 'factorizacion', 'productos notables', 'despeje'],
    formulario: '(a &plusmn; b)' + F.sup(2) + ' = a' + F.sup(2) + ' &plusmn; 2ab + b' + F.sup(2) +
      ' &nbsp;&middot;&nbsp; (a + b)(a &minus; b) = a' + F.sup(2) + ' &minus; b' + F.sup(2) + '<br>' +
      'x' + F.sup(2) + ' + (m + n)x + mn = (x + m)(x + n)<br>' +
      'Formula general: x = (&minus;b &plusmn; &radic;(b' + F.sup(2) + ' &minus; 4ac)) / 2a',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['ecuacion', 'Ecuaciones de primer grado'],
          ['evaluar', 'Valor de una expresion'],
          ['lenguaje', 'Lenguaje algebraico']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['planteamiento', 'Problemas con ecuaciones'],
          ['sistema', 'Sistemas de ecuaciones'],
          ['productoNotable', 'Productos notables']
        ]);
      } else {
        t = r.subtema([
          ['factorizar', 'Factorizacion de trinomios'],
          ['cuadratica', 'Ecuaciones de segundo grado'],
          ['despeje', 'Despeje de formulas']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
