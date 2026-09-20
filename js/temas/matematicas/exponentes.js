/* Leyes de los exponentes */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  /* Monomio en pantalla: coeficiente + variables con exponentes. */
  function disp(c, vs) {
    var cuerpo = vs.filter(function (v) { return v[1] !== 0; })
      .map(function (v) { return v[1] === 1 ? v[0] : v[0] + F.sup(v[1]); }).join('');
    if (cuerpo === '') return F.n(c);
    if (c === 1) return cuerpo;
    if (c === -1) return '-' + cuerpo;
    return F.n(c) + cuerpo;
  }
  /* El mismo monomio en texto plano, para que lo lea el comparador. */
  function txt(c, vs) {
    return '(' + c + ')' + vs.map(function (v) { return '*' + v[0] + '^(' + v[1] + ')'; }).join('');
  }

  var extra = {};

  extra.cero = function (r) {
    var c = r.entero(2, 9), a = r.entero(2, 5), b = r.entero(1, 4);
    var k = r.entero(2, 9);
    var val = k + 1;
    return {
      enunciado: 'Calcula: ' + k + 'x' + F.sup(0) + ' + (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(0),
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Cualquier cosa (distinta de cero) elevada a la potencia 0 vale 1.',
        'Ojo: en ' + k + 'x' + F.sup(0) + ' el exponente solo afecta a la x, asi que queda ' + k + ' &middot; 1.'],
      solucion: [
        'x' + F.sup(0) + ' = 1, asi que ' + k + 'x' + F.sup(0) + ' = ' + k,
        'Todo el parentesis elevado a 0 vale 1',
        'Suma: ' + k + ' + 1 = <b>' + val + '</b>'
      ]
    };
  };

  extra.cientifica = function (r) {
    var m1 = r.entero(11, 95) / 10, e1 = r.enteroNoCero(-8, 8);
    var m2 = r.entero(11, 95) / 10, e2 = r.enteroNoCero(-8, 8);
    var esProducto = r.bool();
    var mant = esProducto ? m1 * m2 : m1 / m2;
    var expo = esProducto ? e1 + e2 : e1 - e2;
    while (mant >= 10) { mant /= 10; expo++; }
    while (mant < 1) { mant *= 10; expo--; }
    var op = esProducto ? '&middot;' : '&divide;';
    return {
      enunciado: 'Resuelve y deja el resultado en notacion cientifica:<br>' +
        '<span class="big">(' + m1 + ' &times; 10' + F.sup(e1) + ') ' + op + ' (' + m2 + ' &times; 10' + F.sup(e2) + ')</span><br>' +
        'Da la mantisa (entre 1 y 10, con 4 decimales) y el exponente.',
      respuesta: R.varios([
        { etiqueta: 'Mantisa', resp: R.numero(mant, { dec: 4, tol: 0.001 }) },
        { etiqueta: 'Exponente de 10', resp: R.numero(expo, { dec: 0 }) }
      ]),
      pistas: [
        esProducto ? 'Multiplica las mantisas y SUMA los exponentes.' : 'Divide las mantisas y RESTA los exponentes.',
        'Si la mantisa te queda fuera del rango 1 a 10, corre el punto y ajusta el exponente.'
      ],
      solucion: [
        'Mantisas: ' + m1 + ' ' + op + ' ' + m2 + ' = ' + F.n(esProducto ? m1 * m2 : m1 / m2, 4),
        'Exponentes: ' + e1 + (esProducto ? ' + ' : ' &minus; ') + e2 + ' = ' + (esProducto ? e1 + e2 : e1 - e2),
        'Ajusto la mantisa al rango [1, 10)',
        'Resultado: <b>' + F.n(mant, 4) + ' &times; 10' + F.sup(expo) + '</b>'
      ]
    };
  };

  EJ.tema({
    id: 'leyes-exponentes',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Leyes de los exponentes',
    descripcion: 'Producto, cociente, potencia de potencia, exponente cero, negativo y fraccionario.',
    formulario: 'a<sup>m</sup>&middot;a<sup>n</sup> = a<sup>m+n</sup> &nbsp; a<sup>m</sup>/a<sup>n</sup> = a<sup>m&minus;n</sup> &nbsp; (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup><br>' +
      '(ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup> &nbsp; a<sup>0</sup> = 1 &nbsp; a<sup>&minus;n</sup> = 1/a<sup>n</sup> &nbsp; a<sup>m/n</sup> = <sup>n</sup>&radic;<span class="rad">a<sup>m</sup></span>',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var a, b, c, d, n, m, enun, resp, pistas, sol, vars = ['x'];

      if (dif === 'facil') {
        var t = r.subtema([
          ['producto', 'Producto de potencias'],
          ['cociente', 'Cociente de potencias'],
          ['potencia', 'Potencia de una potencia'],
          ['negativo', 'Exponente negativo'],
          ['cero', 'Exponente cero']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          a = r.entero(2, 8); b = r.entero(2, 8);
          enun = 'Simplifica: x' + F.sup(a) + ' &middot; x' + F.sup(b);
          guiaDelPaso = EJ.guia.productoPotencias(a, b);
          resp = R.expresion('x^(' + (a + b) + ')', { mostrar: 'x' + F.sup(a + b) });
          pistas = ['Misma base multiplicandose: los exponentes se suman.', a + ' + ' + b + ' = ' + (a + b) + '.'];
          sol = ['a<sup>m</sup> &middot; a<sup>n</sup> = a<sup>m+n</sup>', 'x' + F.sup(a) + ' &middot; x' + F.sup(b) + ' = x' + F.sup(a + '+' + b) + ' = <b>x' + F.sup(a + b) + '</b>'];
        } else if (t === 'cociente') {
          b = r.entero(2, 5); a = b + r.entero(1, 5);
          enun = 'Simplifica: ' + F.frac('x' + F.sup(a), 'x' + F.sup(b));
          resp = R.expresion('x^(' + (a - b) + ')', { mostrar: 'x' + F.sup(a - b) });
          pistas = ['Misma base dividiendose: los exponentes se restan.', a + ' &minus; ' + b + ' = ' + (a - b) + '.'];
          sol = ['a<sup>m</sup>/a<sup>n</sup> = a<sup>m&minus;n</sup>', 'x' + F.sup(a) + '/x' + F.sup(b) + ' = <b>x' + F.sup(a - b) + '</b>'];
        } else if (t === 'potencia') {
          a = r.entero(2, 6); b = r.entero(2, 4);
          enun = 'Simplifica: (x' + F.sup(a) + ')' + F.sup(b);
          resp = R.expresion('x^(' + (a * b) + ')', { mostrar: 'x' + F.sup(a * b) });
          pistas = ['Potencia de una potencia: los exponentes se multiplican.', a + ' &middot; ' + b + ' = ' + (a * b) + '.'];
          sol = ['(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>', '(x' + F.sup(a) + ')' + F.sup(b) + ' = <b>x' + F.sup(a * b) + '</b>'];
        } else {
          a = r.entero(2, 4); b = a + r.entero(1, 4);
          enun = 'Escribe con exponente positivo: ' + F.frac('x' + F.sup(a), 'x' + F.sup(b));
          resp = R.expresion('1/x^(' + (b - a) + ')', { mostrar: F.frac(1, 'x' + F.sup(b - a)) });
          pistas = ['Resta los exponentes: te queda un exponente negativo.',
            'a<sup>&minus;n</sup> = 1/a<sup>n</sup>, con n = ' + (b - a) + '.'];
          sol = ['x' + F.sup(a) + '/x' + F.sup(b) + ' = x' + F.sup(a - b),
            'Un exponente negativo pasa al denominador: <b>' + F.frac(1, 'x' + F.sup(b - a)) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['coefPotencia', 'Potencia con coeficiente'],
          ['cocienteCoef', 'Producto entre cociente'],
          ['dosVars', 'Dos variables'],
          ['negativoCoef', 'Exponentes negativos'],
          ['cientifica', 'Notacion cientifica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'coefPotencia') {
          c = r.entero(2, 5); a = r.entero(2, 4); n = r.entero(2, 3);
          enun = 'Simplifica: (' + disp(c, [['x', a]]) + ')' + F.sup(n);
          resp = R.expresion(txt(Math.pow(c, n), [['x', a * n]]), { mostrar: disp(Math.pow(c, n), [['x', a * n]]) });
          pistas = ['El exponente de afuera afecta al coeficiente y a la variable.',
            c + F.sup(n) + ' = ' + Math.pow(c, n) + ' y x' + F.sup(a) + ' elevado a ' + n + ' da x' + F.sup(a * n) + '.'];
          sol = ['(ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup>',
            '(' + c + ')' + F.sup(n) + ' = ' + Math.pow(c, n),
            '(x' + F.sup(a) + ')' + F.sup(n) + ' = x' + F.sup(a * n),
            'Resultado: <b>' + disp(Math.pow(c, n), [['x', a * n]]) + '</b>'];
        } else if (t2 === 'cocienteCoef') {
          c = r.entero(2, 6); d = r.entero(2, 6);
          var e = r.elige([2, 3, 4]);
          a = r.entero(2, 5); b = r.entero(1, 4); m = r.entero(1, 4);
          var coef = (c * d) / e;
          while (Math.abs(coef - Math.round(coef)) > 1e-9) { c = r.entero(2, 6); coef = (c * d) / e; }
          var expF = a + b - m;
          enun = 'Simplifica: ' + F.frac('(' + disp(c, [['x', a]]) + ')(' + disp(d, [['x', b]]) + ')', disp(e, [['x', m]]));
          resp = R.expresion(txt(coef, [['x', expF]]), { mostrar: disp(coef, [['x', expF]]) });
          pistas = ['Multiplica arriba primero: coeficientes por coeficientes y exponentes se suman.',
            'Arriba queda ' + disp(c * d, [['x', a + b]]) + '; ahora divide entre ' + disp(e, [['x', m]]) + '.'];
          sol = ['Numerador: ' + disp(c, [['x', a]]) + ' &middot; ' + disp(d, [['x', b]]) + ' = ' + disp(c * d, [['x', a + b]]),
            'Coeficientes: ' + (c * d) + ' &divide; ' + e + ' = ' + coef,
            'Exponentes: ' + (a + b) + ' &minus; ' + m + ' = ' + expF,
            'Resultado: <b>' + disp(coef, [['x', expF]]) + '</b>'];
        } else if (t2 === 'dosVars') {
          vars = ['x', 'y'];
          a = r.entero(2, 4); b = r.entero(1, 3); n = r.entero(2, 3); c = r.elige([1, 2, 3]);
          enun = 'Simplifica: (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(n);
          resp = R.expresion(txt(Math.pow(c, n), [['x', a * n], ['y', b * n]]), {
            vars: vars, mostrar: disp(Math.pow(c, n), [['x', a * n], ['y', b * n]])
          });
          pistas = ['El exponente de afuera se reparte a cada factor.',
            'x' + F.sup(a) + ' &rarr; x' + F.sup(a * n) + ', y' + F.sup(b) + ' &rarr; y' + F.sup(b * n) + '.'];
          sol = ['(x<sup>a</sup>y<sup>b</sup>)<sup>n</sup> = x<sup>an</sup>y<sup>bn</sup>',
            'Resultado: <b>' + disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]) + '</b>'];
        } else {
          c = r.entero(2, 6); d = r.entero(2, 6); a = r.entero(2, 5); b = r.entero(1, 4);
          enun = 'Escribe sin exponentes negativos: (' + disp(c, [['x', -a]]) + ')(' + disp(d, [['x', b]]) + ')';
          var ef = b - a;
          var mostrar = ef >= 0 ? disp(c * d, [['x', ef]]) : F.frac(c * d, 'x' + F.sup(-ef));
          resp = R.expresion(txt(c * d, [['x', ef]]), { mostrar: mostrar });
          pistas = ['Aunque el exponente sea negativo, al multiplicar bases iguales se suman.',
            'Exponente final: &minus;' + a + ' + ' + b + ' = ' + ef + '.'];
          sol = ['Coeficientes: ' + c + ' &middot; ' + d + ' = ' + (c * d),
            'Exponentes: (&minus;' + a + ') + ' + b + ' = ' + ef,
            'Resultado: <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['doblePotencia', 'Cociente elevado a potencias'],
          ['raiz', 'Exponente fraccionario'],
          ['cocientePotencia', 'Fraccion elevada a potencia'],
          ['cientifica', 'Notacion cientifica']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'doblePotencia') {
          vars = ['x', 'y'];
          a = r.entero(2, 4); b = r.entero(1, 3); m = r.entero(2, 3);
          c = r.entero(1, 3); d = r.entero(1, 3); n = r.entero(1, 2);
          var ex = a * m - c * n, ey = b * m - d * n;
          enun = 'Simplifica: ' + F.frac('(' + disp(1, [['x', a], ['y', b]]) + ')' + F.sup(m), '(' + disp(1, [['x', c], ['y', d]]) + ')' + F.sup(n));
          resp = R.expresion(txt(1, [['x', ex], ['y', ey]]), { vars: vars, mostrar: disp(1, [['x', ex], ['y', ey]]) });
          pistas = ['Primero distribuye los exponentes de afuera en el numerador y en el denominador.',
            'Arriba: x' + F.sup(a * m) + 'y' + F.sup(b * m) + '. Abajo: x' + F.sup(c * n) + 'y' + F.sup(d * n) + '. Ahora resta exponentes.'];
          sol = ['Numerador: x' + F.sup(a * m) + 'y' + F.sup(b * m),
            'Denominador: x' + F.sup(c * n) + 'y' + F.sup(d * n),
            'Resto exponentes: x' + F.sup(a * m + '&minus;' + c * n) + 'y' + F.sup(b * m + '&minus;' + d * n),
            'Resultado: <b>' + disp(1, [['x', ex], ['y', ey]]) + '</b>'];
        } else if (t3 === 'raiz') {
          vars = ['x', 'y'];
          var k = r.elige([2, 3]);
          c = r.elige([2, 3]); a = r.entero(1, 3); b = r.entero(1, 3);
          var C = Math.pow(c, k);
          enun = 'Simplifica: (' + disp(C, [['x', a * k], ['y', b * k]]) + ')' + F.sup(F.frac(1, k));
          resp = R.expresion(txt(c, [['x', a], ['y', b]]), { vars: vars, mostrar: disp(c, [['x', a], ['y', b]]) });
          pistas = ['Un exponente 1/' + k + ' es la raiz ' + (k === 2 ? 'cuadrada' : 'cubica') + ': divide cada exponente entre ' + k + '.',
            C + F.sup(F.frac(1, k)) + ' = ' + c + ' porque ' + c + F.sup(k) + ' = ' + C + '.'];
          sol = ['a<sup>m/n</sup> = <sup>n</sup>&radic;<span class="rad">a<sup>m</sup></span>: reparto el exponente 1/' + k + ' a cada factor.',
            C + F.sup(F.frac(1, k)) + ' = ' + c,
            'x' + F.sup(a * k) + ' &rarr; x' + F.sup(a) + ', y' + F.sup(b * k) + ' &rarr; y' + F.sup(b),
            'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>'];
        } else {
          c = r.elige([2, 3, 4, 5]); d = r.elige([2, 3]); n = r.entero(2, 3);
          a = r.entero(3, 6); b = r.entero(1, 2);
          var cc = Math.pow(c, n), dd = Math.pow(d, n), s = F.simplifica(cc, dd);
          var ex2 = (a - b) * n;
          enun = 'Simplifica: (' + F.frac(disp(c, [['x', a]]), disp(d, [['x', b]])) + ')' + F.sup(n);
          resp = R.expresion('(' + s[0] + '/' + s[1] + ')*x^(' + ex2 + ')', {
            mostrar: (s[1] === 1 ? disp(s[0], [['x', ex2]]) : F.frac(s[0], s[1]) + ' x' + F.sup(ex2))
          });
          pistas = ['Simplifica primero lo de adentro del parentesis.',
            'Adentro queda ' + F.frac(c, d) + ' x' + F.sup(a - b) + '; ahora eleva todo a la ' + n + '.'];
          sol = ['Dentro del parentesis: ' + F.frac(c, d) + 'x' + F.sup(a - b),
            'Elevo a la ' + n + ': coeficiente (' + c + '/' + d + ')' + F.sup(n) + ' = ' + F.frac(cc, dd) + ', exponente ' + (a - b) + ' &middot; ' + n + ' = ' + ex2,
            'Resultado: <b>' + (s[1] === 1 ? disp(s[0], [['x', ex2]]) : F.frac(s[0], s[1]) + ' x' + F.sup(ex2)) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
