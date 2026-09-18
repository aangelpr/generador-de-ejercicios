/* Binomios: productos notables */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function bin(c, a) { return F.poli([c, a], 'x'); }   // cx + a

  var extra = {};

  extra.dosVariables = function (r) {
    var a = r.entero(1, 5), b = r.enteroNoCero(-6, 6);
    var mostrar = F.une([F.term(a * a, 'x', 2), F.term(2 * a * b, 'xy', 1), F.term(b * b, 'y', 2)]);
    return {
      enunciado: 'Desarrolla: (' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')&sup2;',
      respuesta: R.expresion('(' + (a * a) + ')*x^2+(' + (2 * a * b) + ')*x*y+(' + (b * b) + ')*y^2', {
        vars: ['x', 'y'], mostrar: mostrar
      }),
      pistas: ['Sigue siendo (a + b)&sup2; = a&sup2; + 2ab + b&sup2;, con a = ' + F.term(a, 'x', 1) + ' y b = ' + F.term(b, 'y', 1) + '.',
        'El termino de en medio lleva las dos letras: 2(' + F.term(a, 'x', 1) + ')(' + F.term(b, 'y', 1) + ') = ' + F.term(2 * a * b, 'xy', 1) + '.'],
      solucion: ['Cuadrado del primero: ' + F.term(a * a, 'x', 2),
        'Doble producto: ' + F.term(2 * a * b, 'xy', 1),
        'Cuadrado del segundo: ' + F.term(b * b, 'y', 2),
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  extra.factorizaDosVars = function (r) {
    var a = r.entero(1, 7), b = r.entero(1, 9);
    var mostrar = '(' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')(' + F.une([F.term(a, 'x', 1), F.term(-b, 'y', 1)]) + ')';
    return {
      enunciado: 'Factoriza: ' + F.une([F.term(a * a, 'x', 2), F.term(-b * b, 'y', 2)]),
      respuesta: R.factorizada('(' + a + '*x+' + b + '*y)*(' + a + '*x-' + b + '*y)', {
        vars: ['x', 'y'], mostrar: mostrar
      }),
      pistas: ['Es una diferencia de cuadrados, solo que con dos letras: a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).',
        'La raiz del primero es ' + F.term(a, 'x', 1) + ' y la del segundo ' + F.term(b, 'y', 1) + '.'],
      solucion: ['&radic;<span class="rad">' + (a * a) + 'x&sup2;</span> = ' + F.term(a, 'x', 1) + ' y &radic;<span class="rad">' + (b * b) + 'y&sup2;</span> = ' + F.term(b, 'y', 1),
        'Aplico (a + b)(a &minus; b)',
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  EJ.tema({
    id: 'binomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Binomios',
    descripcion: 'Binomio al cuadrado, al cubo, suma por diferencia y binomios con termino comun.',
    formulario: '(a + b)&sup2; = a&sup2; + 2ab + b&sup2; &nbsp;&middot;&nbsp; (a &minus; b)&sup2; = a&sup2; &minus; 2ab + b&sup2;<br>' +
      '(a + b)(a &minus; b) = a&sup2; &minus; b&sup2; &nbsp;&middot;&nbsp; (x + a)(x + b) = x&sup2; + (a+b)x + ab<br>' +
      '(a + b)&sup3; = a&sup3; + 3a&sup2;b + 3ab&sup2; + b&sup3;',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, a, b, c, res;

      if (dif === 'facil') {
        var t = r.subtema([
          ['cuadrado', 'Binomio al cuadrado'],
          ['conjugados', 'Suma por diferencia'],
          ['terminoComun', 'Binomios con termino comun']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'cuadrado') {
          a = r.enteroNoCero(-9, 9);
          res = P.potencia([1, a], 2);
          enun = 'Desarrolla: (' + bin(1, a) + ')&sup2;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Usa (a &plusmn; b)&sup2; = a&sup2; &plusmn; 2ab + b&sup2;. Aqui a = x y b = ' + Math.abs(a) + '.',
            'El termino de en medio es 2 &middot; x &middot; (' + a + ') = ' + (2 * a) + 'x y el ultimo es (' + a + ')&sup2; = ' + (a * a) + '.'];
          sol = ['Cuadrado del primero: x&sup2;',
            'Doble producto: 2(x)(' + a + ') = ' + (2 * a) + 'x',
            'Cuadrado del segundo: (' + a + ')&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t === 'conjugados') {
          a = r.entero(2, 12);
          res = [1, 0, -a * a];
          enun = 'Desarrolla: (' + bin(1, a) + ')(' + bin(1, -a) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Es una suma por su diferencia: el resultado es el cuadrado del primero menos el cuadrado del segundo.',
            'x&sup2; &minus; (' + a + ')&sup2;'];
          sol = ['(a + b)(a &minus; b) = a&sup2; &minus; b&sup2;',
            'a = x, b = ' + a,
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else {
          a = r.enteroNoCero(-8, 8); b = r.enteroNoCero(-8, 8);
          while (b === a) b = r.enteroNoCero(-8, 8);
          res = P.multiplica([1, a], [1, b]);
          enun = 'Desarrolla: (' + bin(1, a) + ')(' + bin(1, b) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['(x + a)(x + b) = x&sup2; + (a + b)x + ab.',
            'a + b = ' + (a + b) + ' y a &middot; b = ' + (a * b) + '.'];
          sol = ['Termino cuadratico: x&sup2;',
            'Coeficiente lineal: ' + a + ' + (' + b + ') = ' + (a + b),
            'Termino independiente: (' + a + ')(' + b + ') = ' + (a * b),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['cuadradoCoef', 'Cuadrado con coeficiente'],
          ['conjugadosCoef', 'Suma por diferencia con coeficiente'],
          ['factorizaDif', 'Factorizar diferencia de cuadrados'],
          ['dosVariables', 'Binomio con dos variables']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'cuadradoCoef') {
          c = r.entero(2, 6); a = r.enteroNoCero(-9, 9);
          res = P.potencia([c, a], 2);
          enun = 'Desarrolla: (' + bin(c, a) + ')&sup2;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Ahora el primer termino tiene coeficiente: (a + b)&sup2; = a&sup2; + 2ab + b&sup2; con a = ' + c + 'x.',
            'a&sup2; = ' + (c * c) + 'x&sup2; y 2ab = 2(' + c + 'x)(' + a + ') = ' + (2 * c * a) + 'x.'];
          sol = ['Cuadrado del primero: (' + c + 'x)&sup2; = ' + (c * c) + 'x&sup2;',
            'Doble producto: 2(' + c + 'x)(' + a + ') = ' + (2 * c * a) + 'x',
            'Cuadrado del segundo: (' + a + ')&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t2 === 'conjugadosCoef') {
          c = r.entero(2, 7); a = r.entero(2, 10);
          res = [c * c, 0, -a * a];
          enun = 'Desarrolla: (' + bin(c, a) + ')(' + bin(c, -a) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Sigue siendo suma por diferencia: (a+b)(a&minus;b) = a&sup2; &minus; b&sup2;.',
            'a = ' + c + 'x, b = ' + a + '.'];
          sol = ['a&sup2; = (' + c + 'x)&sup2; = ' + (c * c) + 'x&sup2;',
            'b&sup2; = ' + a + '&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else {
          c = r.elige([1, 2, 3, 4, 5]); a = r.entero(2, 10);
          enun = 'Factoriza: ' + P.texto([c * c, 0, -a * a]);
          resp = R.factorizada('(' + c + '*x+' + a + ')*(' + c + '*x-' + a + ')', {
            mostrar: '(' + bin(c, a) + ')(' + bin(c, -a) + ')'
          });
          pistas = ['Es una diferencia de cuadrados: a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).',
            'La raiz del primero es ' + bin(c, 0) + ' y la del segundo es ' + a + '.'];
          sol = ['&radic;<span class="rad">' + (c * c) + 'x&sup2;</span> = ' + c + 'x y &radic;<span class="rad">' + (a * a) + '</span> = ' + a,
            'a&sup2; &minus; b&sup2; = (a + b)(a &minus; b)',
            'Resultado: <b>(' + bin(c, a) + ')(' + bin(c, -a) + ')</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cubo', 'Binomio al cubo'],
          ['cuadradoGrado', 'Cuadrado con potencias altas'],
          ['cubosFactor', 'Factorizar suma o diferencia de cubos'],
          ['factorizaDosVars', 'Diferencia de cuadrados con dos variables']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cubo') {
          c = r.elige([1, 1, 2, 3]); a = r.enteroNoCero(-5, 5);
          res = P.potencia([c, a], 3);
          enun = 'Desarrolla: (' + bin(c, a) + ')&sup3;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['(a + b)&sup3; = a&sup3; + 3a&sup2;b + 3ab&sup2; + b&sup3;, con a = ' + bin(c, 0) + ' y b = ' + a + '.',
            'a&sup3; = ' + (c * c * c) + 'x&sup3; y b&sup3; = ' + (a * a * a) + '.'];
          sol = ['a&sup3; = (' + c + 'x)&sup3; = ' + (c * c * c) + 'x&sup3;',
            '3a&sup2;b = 3(' + (c * c) + 'x&sup2;)(' + a + ') = ' + (3 * c * c * a) + 'x&sup2;',
            '3ab&sup2; = 3(' + c + 'x)(' + (a * a) + ') = ' + (3 * c * a * a) + 'x',
            'b&sup3; = ' + (a * a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t3 === 'cuadradoGrado') {
          c = r.entero(2, 5); a = r.enteroNoCero(-7, 7);
          var m = r.entero(2, 3);
          var cuad = [c * c, 0, 2 * c * a, 0, a * a];   // (cx^2 + a)^2 cuando m = 2
          var mostrar, exprTxt;
          if (m === 2) {
            mostrar = F.term(c * c, 'x', 4) + ' + ' + F.term(2 * c * a, 'x', 2) + ' + ' + (a * a);
            mostrar = F.une([F.term(c * c, 'x', 4), F.term(2 * c * a, 'x', 2), String(a * a)]);
            exprTxt = '(' + (c * c) + ')*x^4+(' + (2 * c * a) + ')*x^2+(' + (a * a) + ')';
          } else {
            mostrar = F.une([F.term(c * c, 'x', 6), F.term(2 * c * a, 'x', 3), String(a * a)]);
            exprTxt = '(' + (c * c) + ')*x^6+(' + (2 * c * a) + ')*x^3+(' + (a * a) + ')';
          }
          enun = 'Desarrolla: (' + F.une([F.term(c, 'x', m), String(a)]) + ')&sup2;';
          resp = R.expresion(exprTxt, { mostrar: mostrar });
          pistas = ['Sigue siendo (a + b)&sup2;, solo que a = ' + F.term(c, 'x', m) + '.',
            'Recuerda que (x' + F.sup(m) + ')&sup2; = x' + F.sup(2 * m) + '.'];
          sol = ['a&sup2; = (' + F.term(c, 'x', m) + ')&sup2; = ' + F.term(c * c, 'x', 2 * m),
            '2ab = 2(' + F.term(c, 'x', m) + ')(' + a + ') = ' + F.term(2 * c * a, 'x', m),
            'b&sup2; = ' + (a * a),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          a = r.entero(1, 5);
          var signo = r.bool() ? 1 : -1;
          var cubo = a * a * a;
          var pol = [1, 0, 0, signo * cubo];
          enun = 'Factoriza: ' + P.texto(pol);
          var f1 = '(x' + (signo > 0 ? '+' : '-') + a + ')';
          var f2 = '(x^2' + (signo > 0 ? '-' : '+') + a + 'x+' + (a * a) + ')';
          resp = R.factorizada(f1 + '*' + f2, {
            mostrar: '(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')'
          });
          pistas = [signo > 0 ? 'Es una suma de cubos: a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;).'
            : 'Es una diferencia de cubos: a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;).',
            'a = x y b = ' + a + ' porque ' + a + '&sup3; = ' + cubo + '.'];
          sol = ['Identifico a = x, b = ' + a + ' (ya que ' + a + '&sup3; = ' + cubo + ')',
            signo > 0 ? 'a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;)' : 'a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;)',
            'Resultado: <b>(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
