/* Monomios */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function disp(c, vs) {
    var cuerpo = vs.filter(function (v) { return v[1] !== 0; })
      .map(function (v) { return v[1] === 1 ? v[0] : v[0] + F.sup(v[1]); }).join('');
    if (cuerpo === '') return F.n(c);
    if (c === 1) return cuerpo;
    if (c === -1) return '-' + cuerpo;
    return F.n(c) + cuerpo;
  }
  function txt(c, vs) {
    return '(' + c + ')' + vs.map(function (v) { return '*' + v[0] + '^(' + v[1] + ')'; }).join('');
  }
  function par(s) { return '(' + s + ')'; }

  var extra = {};

  extra.valorNumerico = function (r) {
    var c = r.enteroNoCero(-6, 6), a = r.entero(1, 3), b = r.entero(1, 2);
    var x = r.enteroNoCero(-4, 4), y = r.enteroNoCero(-4, 4);
    var val = c * Math.pow(x, a) * Math.pow(y, b);
    return {
      enunciado: 'Calcula el valor numerico de ' + disp(c, [['x', a], ['y', b]]) + '<br>cuando x = ' + x + ' y y = ' + y + '.',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Sustituye cada letra por su valor y respeta los parentesis en los negativos.',
        '(' + x + ')' + F.sup(a) + ' = ' + Math.pow(x, a) + ' y (' + y + ')' + F.sup(b) + ' = ' + Math.pow(y, b) + '.'],
      solucion: ['Sustituyo: ' + c + '(' + x + ')' + F.sup(a) + '(' + y + ')' + F.sup(b),
        '= ' + c + ' &middot; ' + Math.pow(x, a) + ' &middot; ' + Math.pow(y, b),
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.raizMonomio = function (r) {
    var c = r.elige([2, 3, 4, 5, 6, 7]);
    var a = r.entero(1, 4), b = r.entero(1, 3);
    return {
      enunciado: 'Simplifica: &radic;<span class="rad">' + disp(c * c, [['x', 2 * a], ['y', 2 * b]]) + '</span>',
      respuesta: R.expresion(txt(c, [['x', a], ['y', b]]), {
        vars: ['x', 'y'], mostrar: disp(c, [['x', a], ['y', b]])
      }),
      pistas: ['La raiz cuadrada de un monomio: raiz del coeficiente y exponentes a la mitad.',
        '&radic;<span class="rad">' + (c * c) + '</span> = ' + c + ', y los exponentes ' + (2 * a) + ' y ' + (2 * b) + ' se dividen entre 2.'],
      solucion: ['Coeficiente: &radic;<span class="rad">' + (c * c) + '</span> = ' + c,
        'Exponentes: ' + (2 * a) + ' &divide; 2 = ' + a + ' y ' + (2 * b) + ' &divide; 2 = ' + b,
        'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>']
    };
  };

  EJ.tema({
    id: 'monomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Monomios',
    descripcion: 'Producto, cociente, potencia, terminos semejantes y grado de un monomio.',
    formulario: 'Producto: se multiplican coeficientes y se suman exponentes.<br>' +
      'Cociente: se dividen coeficientes y se restan exponentes.<br>' +
      'Grado de un monomio = suma de los exponentes de sus variables. Solo se suman terminos semejantes.',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, c1, c2, a1, a2, b1, b2, vars = ['x', 'y'];

      if (dif === 'facil') {
        var t = r.subtema([
          ['producto', 'Producto de monomios'],
          ['cociente', 'Division de monomios'],
          ['grado', 'Grado de un monomio'],
          ['valorNumerico', 'Valor numerico']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          c1 = r.enteroNoCero(-6, 6); c2 = r.enteroNoCero(-6, 6);
          a1 = r.entero(1, 4); a2 = r.entero(1, 4); b1 = r.entero(0, 3); b2 = r.entero(0, 3);
          enun = 'Multiplica: ' + par(disp(c1, [['x', a1], ['y', b1]])) + par(disp(c2, [['x', a2], ['y', b2]]));
          resp = R.expresion(txt(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]]), {
            vars: vars, mostrar: disp(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]])
          });
          pistas = ['Multiplica los coeficientes y suma los exponentes de cada variable.',
            'Coeficiente: ' + c1 + ' &middot; ' + c2 + ' = ' + (c1 * c2) + '.'];
          sol = ['Coeficientes: ' + c1 + ' &middot; ' + c2 + ' = ' + (c1 * c2),
            'Exponentes de x: ' + a1 + ' + ' + a2 + ' = ' + (a1 + a2) + '; de y: ' + b1 + ' + ' + b2 + ' = ' + (b1 + b2),
            'Resultado: <b>' + disp(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]]) + '</b>'];
        } else if (t === 'cociente') {
          c2 = r.elige([2, 3, 4, 5]); var k = r.enteroNoCero(-6, 6);
          c1 = c2 * k;
          a2 = r.entero(1, 3); a1 = a2 + r.entero(1, 3);
          b2 = r.entero(0, 2); b1 = b2 + r.entero(0, 3);
          enun = 'Divide: ' + F.frac(disp(c1, [['x', a1], ['y', b1]]), disp(c2, [['x', a2], ['y', b2]]));
          resp = R.expresion(txt(k, [['x', a1 - a2], ['y', b1 - b2]]), {
            vars: vars, mostrar: disp(k, [['x', a1 - a2], ['y', b1 - b2]])
          });
          pistas = ['Divide los coeficientes y resta los exponentes.',
            'Coeficiente: ' + c1 + ' &divide; ' + c2 + ' = ' + k + '.'];
          sol = ['Coeficientes: ' + c1 + ' &divide; ' + c2 + ' = ' + k,
            'Exponentes: x' + F.sup(a1 + '&minus;' + a2) + ' = x' + F.sup(a1 - a2) + ', y' + F.sup(b1 + '&minus;' + b2) + ' = y' + F.sup(b1 - b2),
            'Resultado: <b>' + disp(k, [['x', a1 - a2], ['y', b1 - b2]]) + '</b>'];
        } else {
          c1 = r.enteroNoCero(-9, 9); a1 = r.entero(1, 5); b1 = r.entero(1, 4);
          var z1 = r.entero(0, 3);
          var vs = [['x', a1], ['y', b1], ['z', z1]];
          enun = '&iquest;Cual es el grado del monomio ' + disp(c1, vs) + '?';
          resp = R.numero(a1 + b1 + z1, { dec: 0 });
          pistas = ['El grado de un monomio es la suma de los exponentes de todas sus variables.',
            'Suma ' + a1 + ' + ' + b1 + (z1 ? ' + ' + z1 : '') + '.'];
          sol = ['Exponentes: x&rarr;' + a1 + ', y&rarr;' + b1 + (z1 ? ', z&rarr;' + z1 : ''),
            'Grado = <b>' + (a1 + b1 + z1) + '</b> (el coeficiente no cuenta)'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['potencia', 'Potencia de un monomio'],
          ['semejantes', 'Terminos semejantes'],
          ['tresVars', 'Cociente con tres variables'],
          ['raizMonomio', 'Raiz de un monomio'],
          ['valorNumerico', 'Valor numerico']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'potencia') {
          c1 = r.enteroNoCero(-4, 4); a1 = r.entero(1, 4); b1 = r.entero(1, 3);
          var n = r.entero(2, 3);
          var C = Math.pow(c1, n);
          enun = 'Desarrolla: ' + par(disp(c1, [['x', a1], ['y', b1]])) + F.sup(n);
          resp = R.expresion(txt(C, [['x', a1 * n], ['y', b1 * n]]), {
            vars: vars, mostrar: disp(C, [['x', a1 * n], ['y', b1 * n]])
          });
          pistas = ['El exponente de afuera afecta al coeficiente y a cada variable.',
            '(' + c1 + ')' + F.sup(n) + ' = ' + C + '.'];
          sol = ['Coeficiente: (' + c1 + ')' + F.sup(n) + ' = ' + C,
            'Variables: x' + F.sup(a1) + ' &rarr; x' + F.sup(a1 * n) + ', y' + F.sup(b1) + ' &rarr; y' + F.sup(b1 * n),
            'Resultado: <b>' + disp(C, [['x', a1 * n], ['y', b1 * n]]) + '</b>'];
        } else if (t2 === 'semejantes') {
          a1 = r.entero(1, 3); b1 = r.entero(1, 3);
          var k1 = r.enteroNoCero(-9, 9), k2 = r.enteroNoCero(-9, 9), k3 = r.enteroNoCero(-9, 9);
          var otroTermino = r.enteroNoCero(-5, 5);
          var ea = r.enteroExcepto(1, 4, [a1]);
          var total = k1 + k2 + k3;
          enun = 'Reduce terminos semejantes:<br>' + disp(k1, [['x', a1], ['y', b1]]) + ' + ' +
            par(disp(k2, [['x', a1], ['y', b1]])) + ' + ' + par(disp(otroTermino, [['x', ea], ['y', b1]])) + ' + ' +
            par(disp(k3, [['x', a1], ['y', b1]]));
          resp = R.expresion(txt(total, [['x', a1], ['y', b1]]) + '+' + txt(otroTermino, [['x', ea], ['y', b1]]), {
            vars: vars,
            mostrar: F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])])
          });
          pistas = ['Solo se pueden sumar los terminos que tienen exactamente las mismas variables con los mismos exponentes.',
            'Hay tres terminos con x' + F.sup(a1) + 'y' + F.sup(b1) + ' y uno distinto que se queda solo.'];
          sol = ['Terminos semejantes (x' + F.sup(a1) + 'y' + F.sup(b1) + '): ' + k1 + ' + (' + k2 + ') + (' + k3 + ') = ' + total,
            'El termino ' + disp(otroTermino, [['x', ea], ['y', b1]]) + ' no es semejante, se queda igual',
            'Resultado: <b>' + F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]) + '</b>'];
        } else {
          vars = ['x', 'y', 'z'];
          c2 = r.elige([2, 3, 4]); var kk = r.enteroNoCero(-5, 5);
          c1 = c2 * kk;
          var e1 = [r.entero(2, 5), r.entero(1, 4), r.entero(1, 3)];
          var e2 = [r.entero(1, e1[0]), r.entero(0, e1[1]), r.entero(0, e1[2])];
          var vv1 = [['x', e1[0]], ['y', e1[1]], ['z', e1[2]]];
          var vv2 = [['x', e2[0]], ['y', e2[1]], ['z', e2[2]]];
          var vvr = [['x', e1[0] - e2[0]], ['y', e1[1] - e2[1]], ['z', e1[2] - e2[2]]];
          enun = 'Simplifica: ' + F.frac(disp(c1, vv1), disp(c2, vv2));
          resp = R.expresion(txt(kk, vvr), { vars: vars, mostrar: disp(kk, vvr) });
          pistas = ['Trabaja variable por variable restando exponentes.',
            'Coeficiente ' + c1 + '/' + c2 + ' = ' + kk + '.'];
          sol = ['Coeficientes: ' + c1 + ' &divide; ' + c2 + ' = ' + kk,
            'x: ' + e1[0] + '&minus;' + e2[0] + ' = ' + (e1[0] - e2[0]) + ', y: ' + e1[1] + '&minus;' + e2[1] + ' = ' + (e1[1] - e2[1]) + ', z: ' + e1[2] + '&minus;' + e2[2] + ' = ' + (e1[2] - e2[2]),
            'Resultado: <b>' + disp(kk, vvr) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['combinado', 'Producto entre cociente'],
          ['dobleProducto', 'Potencias multiplicadas'],
          ['raizMonomio', 'Raiz de un monomio']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'combinado') {
          c1 = r.enteroNoCero(-6, 8); c2 = r.enteroNoCero(-5, 6);
          var c3 = r.elige([2, 3, 4]);
          var prodC = c1 * c2;
          while (prodC % c3 !== 0) { c1 = r.enteroNoCero(-6, 8); prodC = c1 * c2; }
          var A = [r.entero(2, 5), r.entero(1, 4)], B = [r.entero(1, 4), r.entero(1, 3)];
          var D = [r.entero(1, 3), r.entero(0, 2)];
          var ex = A[0] + B[0] - D[0], ey = A[1] + B[1] - D[1];
          enun = 'Simplifica: ' + F.frac(par(disp(c1, [['x', A[0]], ['y', A[1]]])) + par(disp(c2, [['x', B[0]], ['y', B[1]]])), disp(c3, [['x', D[0]], ['y', D[1]]]));
          resp = R.expresion(txt(prodC / c3, [['x', ex], ['y', ey]]), {
            vars: vars, mostrar: disp(prodC / c3, [['x', ex], ['y', ey]])
          });
          pistas = ['Resuelve primero el producto del numerador y despues divide.',
            'Numerador: ' + disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]) + '.'];
          sol = ['Numerador: ' + disp(c1, [['x', A[0]], ['y', A[1]]]) + ' &middot; ' + disp(c2, [['x', B[0]], ['y', B[1]]]) + ' = ' + disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]),
            'Divido coeficientes: ' + prodC + ' &divide; ' + c3 + ' = ' + (prodC / c3),
            'Resto exponentes: x' + F.sup(ex) + 'y' + F.sup(ey),
            'Resultado: <b>' + disp(prodC / c3, [['x', ex], ['y', ey]]) + '</b>'];
        } else {
          c1 = r.elige([-3, -2, 2, 3]); c2 = r.elige([-2, 2, 3]);
          var n1 = r.entero(2, 3), n2 = r.entero(2, 3);
          var A2 = [r.entero(1, 3), r.entero(1, 2)], B2 = [r.entero(1, 2), r.entero(1, 2)];
          var CF = Math.pow(c1, n1) * Math.pow(c2, n2);
          var exf = A2[0] * n1 + B2[0] * n2, eyf = A2[1] * n1 + B2[1] * n2;
          enun = 'Desarrolla y simplifica: ' + par(disp(c1, [['x', A2[0]], ['y', A2[1]]])) + F.sup(n1) + ' ' + par(disp(c2, [['x', B2[0]], ['y', B2[1]]])) + F.sup(n2);
          resp = R.expresion(txt(CF, [['x', exf], ['y', eyf]]), { vars: vars, mostrar: disp(CF, [['x', exf], ['y', eyf]]) });
          pistas = ['Eleva cada monomio a su potencia por separado y luego multiplica.',
            'Primero: ' + disp(Math.pow(c1, n1), [['x', A2[0] * n1], ['y', A2[1] * n1]]) + ' y ' + disp(Math.pow(c2, n2), [['x', B2[0] * n2], ['y', B2[1] * n2]]) + '.'];
          sol = ['Primer factor elevado: ' + disp(Math.pow(c1, n1), [['x', A2[0] * n1], ['y', A2[1] * n1]]),
            'Segundo factor elevado: ' + disp(Math.pow(c2, n2), [['x', B2[0] * n2], ['y', B2[1] * n2]]),
            'Multiplico: coeficiente ' + Math.pow(c1, n1) + ' &middot; ' + Math.pow(c2, n2) + ' = ' + CF,
            'Resultado: <b>' + disp(CF, [['x', exf], ['y', eyf]]) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
