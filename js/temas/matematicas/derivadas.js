/* Reglas de derivacion */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function pr(p) { return '(' + P.texto(p) + ')'; }

  var extra = {};

  extra.raiz = function (r) {
    var c = r.entero(2, 9);
    var conRaiz = r.bool();
    if (conRaiz) {
      return {
        enunciado: 'Deriva: f(x) = ' + c + '&radic;<span class="rad">x</span>',
        respuesta: R.expresion('(' + c + '/2)*x^(-1/2)', { mostrar: F.frac(c, '2&radic;<span class="rad">x</span>') }),
        pistas: ['Escribe la raiz como potencia: &radic;<span class="rad">x</span> = x<sup>1/2</sup>.',
          'Aplica la regla de la potencia: el exponente 1/2 baja y queda x<sup>&minus;1/2</sup>.'],
        solucion: ['f(x) = ' + c + 'x<sup>1/2</sup>',
          'f&prime;(x) = ' + c + ' &middot; &frac12; &middot; x<sup>&minus;1/2</sup>',
          'f&prime;(x) = <b>' + F.frac(c, '2&radic;<span class="rad">x</span>') + '</b>']
      };
    }
    var n = r.entero(2, 5);
    return {
      enunciado: 'Deriva: f(x) = ' + F.frac(c, 'x' + F.sup(n)),
      respuesta: R.expresion('(' + (-c * n) + ')*x^(' + (-n - 1) + ')', { mostrar: '&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) }),
      pistas: ['Pasa la x al numerador con exponente negativo: ' + F.frac(c, 'x' + F.sup(n)) + ' = ' + c + 'x<sup>&minus;' + n + '</sup>.',
        'Ahora aplica la regla de la potencia con exponente &minus;' + n + '.'],
      solucion: ['f(x) = ' + c + 'x<sup>&minus;' + n + '</sup>',
        'f&prime;(x) = ' + c + ' &middot; (&minus;' + n + ') &middot; x<sup>&minus;' + (n + 1) + '</sup> = ' + (-c * n) + 'x<sup>&minus;' + (n + 1) + '</sup>',
        'f&prime;(x) = <b>&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) + '</b>']
    };
  };

  extra.rectaTangente = function (r) {
    var p = [r.enteroNoCero(-3, 3), r.entero(-6, 6), r.entero(-7, 7)];
    var d = P.derivada(p);
    var x0 = r.enteroNoCero(-4, 4);
    var y0 = P.evalua(p, x0);
    var m = P.evalua(d, x0);
    var b = y0 - m * x0;
    return {
      enunciado: 'Encuentra la recta tangente a f(x) = ' + P.texto(p) + ' en x = ' + x0 + '.<br>' +
        'Da la pendiente m y la ordenada al origen b de la recta y = mx + b.',
      respuesta: R.varios([
        { etiqueta: 'Pendiente m', resp: R.numero(m, { dec: 2 }) },
        { etiqueta: 'Ordenada b', resp: R.numero(b, { dec: 2 }) }
      ]),
      pistas: ['La pendiente de la tangente es la derivada evaluada en el punto: m = f&prime;(' + x0 + ').',
        'f&prime;(x) = ' + P.texto(d) + ', y el punto de tangencia es (' + x0 + ', ' + y0 + ').'],
      solucion: ['f&prime;(x) = ' + P.texto(d),
        'm = f&prime;(' + x0 + ') = <b>' + m + '</b>',
        'Punto de tangencia: (' + x0 + ', ' + y0 + ')',
        'Uso y &minus; y&#8320; = m(x &minus; x&#8320;): b = ' + y0 + ' &minus; (' + m + ')(' + x0 + ') = <b>' + b + '</b>',
        'Recta tangente: y = ' + F.poli([m, b], 'x')]
    };
  };

  extra.implicita = function (r) {
    var rad2 = r.elige([25, 100, 169, 289]);
    var ternas = { 25: [3, 4], 100: [6, 8], 169: [5, 12], 289: [8, 15] };
    var par = ternas[rad2];
    var x0 = par[0] * r.elige([1, -1]), y0 = par[1] * r.elige([1, -1]);
    var m = -x0 / y0;
    return {
      enunciado: 'La circunferencia x&sup2; + y&sup2; = ' + rad2 + ' pasa por el punto (' + x0 + ', ' + y0 + ').<br>' +
        'Usando derivacion implicita, encuentra dy/dx en ese punto (4 decimales).',
      respuesta: R.numero(m, { dec: 4, tol: 0.005 }),
      pistas: ['Deriva los dos lados respecto de x, recordando que y depende de x: (y&sup2;)&prime; = 2y&middot;y&prime;.',
        '2x + 2y&middot;y&prime; = 0 &rArr; y&prime; = &minus;x/y.'],
      solucion: ['Derivo: 2x + 2y&middot;y&prime; = 0',
        'Despejo: y&prime; = &minus;x/y',
        'Sustituyo el punto: y&prime; = &minus;(' + x0 + ')/(' + y0 + ')',
        'dy/dx = <b>' + F.n(m, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'derivadas',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Reglas de derivacion',
    descripcion: 'Regla de la potencia, producto, cociente, cadena y derivadas de funciones basicas.',
    formulario: '(x<sup>n</sup>)&prime; = nx<sup>n&minus;1</sup> &nbsp;&middot;&nbsp; (uv)&prime; = u&prime;v + uv&prime; &nbsp;&middot;&nbsp; (u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;<br>' +
      'Cadena: [f(g(x))]&prime; = f&prime;(g(x))&middot;g&prime;(x)<br>' +
      '(sen x)&prime; = cos x &nbsp;&middot;&nbsp; (cos x)&prime; = &minus;sen x &nbsp;&middot;&nbsp; (e<sup>x</sup>)&prime; = e<sup>x</sup> &nbsp;&middot;&nbsp; (ln x)&prime; = 1/x',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, p, d, a, b, c, n, k;

      if (dif === 'facil') {
        var t = r.subtema([
          ['polinomio', 'Derivada de un polinomio'],
          ['potencia', 'Regla de la potencia'],
          ['raiz', 'Raices y exponentes negativos'],
          ['enPunto', 'Derivada en un punto']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'polinomio') {
          p = [r.enteroNoCero(-6, 6), r.entero(-8, 8), r.entero(-9, 9), r.entero(-7, 7)];
          d = P.derivada(p);
          enun = 'Deriva: f(x) = ' + P.texto(p);
          resp = R.expresion(P.expr(d), { mostrar: P.texto(d) });
          pistas = ['Aplica la regla de la potencia termino por termino: baja el exponente y restale 1.',
            'La constante ' + p[3] + ' se deriva como 0.'];
          sol = ['(x<sup>n</sup>)&prime; = nx<sup>n&minus;1</sup> en cada termino',
            F.term(p[0], 'x', 3) + ' &rarr; ' + F.term(3 * p[0], 'x', 2) + ', ' + F.term(p[1], 'x', 2) + ' &rarr; ' + F.term(2 * p[1], 'x', 1) + ', ' + F.term(p[2], 'x', 1) + ' &rarr; ' + p[2] + ', ' + p[3] + ' &rarr; 0',
            'f&prime;(x) = <b>' + P.texto(d) + '</b>'];
        } else if (t === 'potencia') {
          a = r.enteroNoCero(-8, 8); n = r.entero(4, 9);
          enun = 'Deriva: f(x) = ' + F.term(a, 'x', n);
          resp = R.expresion('(' + (a * n) + ')*x^(' + (n - 1) + ')', { mostrar: F.term(a * n, 'x', n - 1) });
          pistas = ['Multiplica el coeficiente por el exponente y baja el exponente en 1.',
            a + ' &middot; ' + n + ' = ' + (a * n) + '.'];
          sol = ['f&prime;(x) = ' + a + ' &middot; ' + n + ' &middot; x<sup>' + n + '&minus;1</sup>',
            'f&prime;(x) = <b>' + F.term(a * n, 'x', n - 1) + '</b>'];
        } else {
          p = [r.enteroNoCero(-4, 4), r.entero(-7, 7), r.entero(-8, 8), r.entero(-5, 5)];
          d = P.derivada(p);
          a = r.enteroNoCero(-4, 4);
          enun = 'Si f(x) = ' + P.texto(p) + ', calcula f&prime;(' + a + ').';
          resp = R.numero(P.evalua(d, a), { dec: 2 });
          pistas = ['Primero deriva y despues sustituye.',
            'f&prime;(x) = ' + P.texto(d) + '.'];
          sol = ['f&prime;(x) = ' + P.texto(d),
            'f&prime;(' + a + ') = ' + P.texto(d).replace(/x/g, '(' + a + ')'),
            'f&prime;(' + a + ') = <b>' + P.evalua(d, a) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['producto', 'Regla del producto'],
          ['cociente', 'Regla del cociente'],
          ['cadena', 'Regla de la cadena'],
          ['basicas', 'Trigonometricas, exponencial y log'],
          ['raiz', 'Raices y exponentes negativos'],
          ['rectaTangente', 'Recta tangente']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'producto') {
          var u = [r.enteroNoCero(-4, 4), r.entero(-6, 6)];
          var v = [r.enteroNoCero(-3, 3), r.entero(-5, 5), r.entero(-6, 6)];
          d = P.derivada(P.multiplica(u, v));
          enun = 'Deriva usando la regla del producto: f(x) = ' + pr(u) + pr(v);
          resp = R.expresion(P.expr(d), { mostrar: P.texto(d) });
          pistas = ['(uv)&prime; = u&prime;v + uv&prime;, con u = ' + P.texto(u) + ' y v = ' + P.texto(v) + '.',
            'u&prime; = ' + P.texto(P.derivada(u)) + ' y v&prime; = ' + P.texto(P.derivada(v)) + '.'];
          sol = ['u = ' + P.texto(u) + ', u&prime; = ' + P.texto(P.derivada(u)),
            'v = ' + P.texto(v) + ', v&prime; = ' + P.texto(P.derivada(v)),
            'f&prime; = u&prime;v + uv&prime; = ' + pr(P.derivada(u)) + pr(v) + ' + ' + pr(u) + pr(P.derivada(v)),
            'Desarrollando y reduciendo: <b>' + P.texto(d) + '</b>'];
        } else if (t2 === 'cociente') {
          a = r.enteroNoCero(-5, 5); b = r.entero(-7, 7);
          c = r.enteroNoCero(-4, 4); var dd = r.entero(-6, 6);
          var numD = a * dd - b * c;
          /* si ad - bc = 0 la funcion es constante y la derivada seria 0: no sirve como ejercicio */
          while (numD === 0) { dd = r.entero(-6, 6); b = r.entero(-7, 7); numD = a * dd - b * c; }
          enun = 'Deriva usando la regla del cociente: f(x) = ' + F.frac(P.texto([a, b]), P.texto([c, dd]));
          resp = R.expresion('(' + numD + ')/((' + c + ')*x+(' + dd + '))^2', {
            mostrar: F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;')
          });
          pistas = ['(u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;, con u&prime; = ' + a + ' y v&prime; = ' + c + '.',
            'Numerador: ' + a + '(' + P.texto([c, dd]) + ') &minus; (' + P.texto([a, b]) + ')(' + c + ') = ' + numD + '.'];
          sol = ['u = ' + P.texto([a, b]) + ', u&prime; = ' + a + '; v = ' + P.texto([c, dd]) + ', v&prime; = ' + c,
            'Numerador: ' + a + '(' + P.texto([c, dd]) + ') &minus; (' + P.texto([a, b]) + ')(' + c + ')',
            '= ' + (a * dd) + ' &minus; ' + (b * c) + ' = ' + numD + ' (los terminos con x se cancelan)',
            'f&prime;(x) = <b>' + F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;') + '</b>'];
        } else if (t2 === 'cadena') {
          a = r.enteroNoCero(-4, 4); b = r.entero(-7, 7); n = r.entero(3, 7);
          enun = 'Deriva usando la regla de la cadena: f(x) = (' + P.texto([a, b]) + ')' + F.sup(n);
          resp = R.expresion('(' + (n * a) + ')*((' + a + ')*x+(' + b + '))^(' + (n - 1) + ')', {
            mostrar: (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1)
          });
          pistas = ['Deriva primero "lo de afuera" dejando el parentesis igual, y multiplica por la derivada de adentro.',
            'La derivada de adentro es ' + a + '.'];
          sol = ['Afuera: n(&hellip;)<sup>n&minus;1</sup> = ' + n + '(' + P.texto([a, b]) + ')' + F.sup(n - 1),
            'Adentro: (' + P.texto([a, b]) + ')&prime; = ' + a,
            'f&prime;(x) = <b>' + (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + '</b>'];
        } else {
          k = r.entero(2, 6);
          var caso = r.elige(['sen', 'cos', 'exp', 'ln']);
          var mostrar, txt, pista2;
          if (caso === 'sen') {
            enun = 'Deriva: f(x) = sen(' + k + 'x)';
            txt = k + '*cos(' + k + '*x)'; mostrar = k + ' cos(' + k + 'x)';
            pista2 = 'La derivada de sen u es cos u multiplicada por u&prime; = ' + k + '.';
          } else if (caso === 'cos') {
            enun = 'Deriva: f(x) = cos(' + k + 'x)';
            txt = '-' + k + '*sin(' + k + '*x)'; mostrar = '&minus;' + k + ' sen(' + k + 'x)';
            pista2 = 'La derivada de cos u es &minus;sen u multiplicada por u&prime; = ' + k + '.';
          } else if (caso === 'exp') {
            enun = 'Deriva: f(x) = e<sup>' + k + 'x</sup>';
            txt = k + '*exp(' + k + '*x)'; mostrar = k + 'e' + F.sup(k + 'x');
            pista2 = 'La exponencial se queda igual y se multiplica por la derivada del exponente.';
          } else {
            b = r.entero(1, 9);
            enun = 'Deriva: f(x) = ln(' + k + 'x + ' + b + ')';
            txt = k + '/(' + k + '*x+' + b + ')'; mostrar = F.frac(k, P.texto([k, b]));
            pista2 = 'La derivada de ln u es u&prime;/u, con u&prime; = ' + k + '.';
          }
          resp = R.expresion(txt, { mostrar: mostrar });
          pistas = ['Es una cadena: deriva la funcion exterior y multiplica por la derivada del interior.', pista2];
          sol = ['Identifico u = ' + (caso === 'ln' ? P.texto([k, b]) : k + 'x') + ', con u&prime; = ' + k,
            pista2,
            'f&prime;(x) = <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['productoExp', 'Producto con exponencial'],
          ['productoTrig', 'Producto con trigonometrica'],
          ['lnPoli', 'Logaritmo de un polinomio'],
          ['cadenaCuad', 'Cadena con polinomio'],
          ['cocienteTrig', 'Cociente con trigonometrica'],
          ['segunda', 'Segunda derivada'],
          ['rectaTangente', 'Recta tangente'],
          ['implicita', 'Derivacion implicita']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'productoExp') {
          n = r.entero(2, 4); k = r.enteroNoCero(-3, 3);
          enun = 'Deriva: f(x) = x' + F.sup(n) + 'e' + F.sup(k + 'x');
          resp = R.expresion('exp(' + k + '*x)*(' + n + '*x^(' + (n - 1) + ')+(' + k + ')*x^(' + n + '))', {
            mostrar: 'e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')'
          });
          pistas = ['Regla del producto con u = x' + F.sup(n) + ' y v = e' + F.sup(k + 'x') + '.',
            'u&prime; = ' + n + 'x' + F.sup(n - 1) + ' y v&prime; = ' + k + 'e' + F.sup(k + 'x') + '.'];
          sol = ['u = x' + F.sup(n) + ' &rArr; u&prime; = ' + n + 'x' + F.sup(n - 1),
            'v = e' + F.sup(k + 'x') + ' &rArr; v&prime; = ' + k + 'e' + F.sup(k + 'x'),
            'f&prime; = ' + n + 'x' + F.sup(n - 1) + 'e' + F.sup(k + 'x') + ' + ' + k + 'x' + F.sup(n) + 'e' + F.sup(k + 'x'),
            'Factorizando: <b>e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')</b>'];
        } else if (t3 === 'productoTrig') {
          n = r.entero(2, 3); k = r.entero(2, 4);
          var esSen = r.bool();
          enun = 'Deriva: f(x) = x' + F.sup(n) + ' ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x)';
          resp = R.expresion(
            esSen ? n + '*x^(' + (n - 1) + ')*sin(' + k + '*x)+' + k + '*x^(' + n + ')*cos(' + k + '*x)'
              : n + '*x^(' + (n - 1) + ')*cos(' + k + '*x)-' + k + '*x^(' + n + ')*sin(' + k + '*x)',
            {
              mostrar: esSen
                ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
                : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)'
            });
          pistas = ['Producto: u = x' + F.sup(n) + ', v = ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x).',
            'v&prime; = ' + (esSen ? k + ' cos(' + k + 'x)' : '&minus;' + k + ' sen(' + k + 'x)') + ' por la regla de la cadena.'];
          sol = ['u&prime; = ' + n + 'x' + F.sup(n - 1),
            'v&prime; = ' + (esSen ? k + ' cos(' + k + 'x)' : '&minus;' + k + ' sen(' + k + 'x)'),
            'f&prime; = u&prime;v + uv&prime;',
            'f&prime;(x) = <b>' + (esSen
              ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
              : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)') + '</b>'];
        } else if (t3 === 'lnPoli') {
          p = [r.entero(1, 4), r.entero(-5, 5), r.entero(2, 9)];
          d = P.derivada(p);
          enun = 'Deriva: f(x) = ln(' + P.texto(p) + ')';
          resp = R.expresion('(' + P.expr(d) + ')/(' + P.expr(p) + ')', {
            mostrar: F.frac(P.texto(d), P.texto(p))
          });
          pistas = ['(ln u)&prime; = u&prime;/u.',
            'u&prime; = ' + P.texto(d) + '.'];
          sol = ['u = ' + P.texto(p) + ' &rArr; u&prime; = ' + P.texto(d),
            'f&prime; = u&prime;/u',
            'f&prime;(x) = <b>' + F.frac(P.texto(d), P.texto(p)) + '</b>'];
        } else if (t3 === 'cadenaCuad') {
          p = [r.enteroNoCero(-3, 3), r.entero(-5, 5), r.entero(-6, 6)];
          d = P.derivada(p);
          n = r.entero(3, 6);
          enun = 'Deriva: f(x) = (' + P.texto(p) + ')' + F.sup(n);
          resp = R.expresion(n + '*(' + P.expr(p) + ')^(' + (n - 1) + ')*(' + P.expr(d) + ')', {
            mostrar: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')'
          });
          pistas = ['Cadena: n(&hellip;)<sup>n&minus;1</sup> por la derivada de lo de adentro.',
            'La derivada de adentro es ' + P.texto(d) + '.'];
          sol = ['Exterior: ' + n + '(' + P.texto(p) + ')' + F.sup(n - 1),
            'Interior: (' + P.texto(p) + ')&prime; = ' + P.texto(d),
            'f&prime;(x) = <b>' + n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')</b>'];
        } else if (t3 === 'segunda') {
          p = [r.enteroNoCero(-4, 4), r.entero(-6, 6), r.entero(-7, 7), r.entero(-5, 5), r.entero(-6, 6)];
          var d1 = P.derivada(p), d2 = P.derivada(d1);
          enun = 'Calcula la segunda derivada f&Prime;(x) de f(x) = ' + P.texto(p);
          resp = R.expresion(P.expr(d2), { mostrar: P.texto(d2) });
          pistas = ['Deriva una vez y vuelve a derivar el resultado.',
            'f&prime;(x) = ' + P.texto(d1) + '.'];
          sol = ['f&prime;(x) = ' + P.texto(d1),
            'Derivo otra vez',
            'f&Prime;(x) = <b>' + P.texto(d2) + '</b>'];
        } else {
          k = r.entero(1, 4);
          enun = 'Deriva: f(x) = ' + F.frac('sen(x)', 'x' + (k > 1 ? F.sup(k) : ''));
          resp = R.expresion('(x^(' + k + ')*cos(x)-' + k + '*x^(' + (k - 1) + ')*sin(x))/(x^(' + (2 * k) + '))', {
            mostrar: F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x)', 'x' + F.sup(2 * k))
          });
          pistas = ['Regla del cociente con u = sen x y v = x' + (k > 1 ? F.sup(k) : '') + '.',
            'u&prime; = cos x y v&prime; = ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '1') + '.'];
          sol = ['u = sen x, u&prime; = cos x',
            'v = x' + F.sup(k) + ', v&prime; = ' + k + 'x' + F.sup(k - 1),
            'f&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;',
            'f&prime;(x) = <b>' + F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + k + 'x' + F.sup(k - 1) + ' sen(x)', 'x' + F.sup(2 * k)) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
