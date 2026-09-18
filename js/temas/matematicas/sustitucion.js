/* Formula de sustitucion (cambio de variable) */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function inte(expr) { return '<span class="big">&int; ' + expr + ' dx</span>'; }

  var extra = {};

  extra.exponencialSimple = function (r) {
    var k = r.enteroNoCero(-5, 6), c = r.entero(1, 5);
    var mostrar = F.frac(c === 1 ? 'e' + F.sup(k + 'x') : c + 'e' + F.sup(k + 'x'), k) + ' + C';
    var resp = R.expresion('(' + c + '/' + k + ')*exp(' + k + '*x)', { masConstante: true });
    resp.mostrar = function () { return mostrar; };
    return {
      enunciado: 'Resuelve: <span class="big">&int; ' + (c === 1 ? '' : c) + 'e' + F.sup(k + 'x') + ' dx</span>',
      respuesta: resp,
      pistas: ['Con u = ' + k + 'x se tiene du = ' + k + ' dx, asi que dx = du/' + k + '.',
        'La integral de e<sup>u</sup> es e<sup>u</sup>; solo queda dividir entre ' + k + '.'],
      solucion: ['u = ' + k + 'x &rArr; du = ' + k + 'dx',
        '(' + c + '/' + k + ')&int;e<sup>u</sup>du = (' + c + '/' + k + ')e<sup>u</sup>',
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  extra.tangente = function (r) {
    var k = r.entero(1, 3);
    var mostrar = (k > 1 ? k : '') + '&minus;ln|cos(x)| + C';
    mostrar = (k > 1 ? k + '(' : '') + '&minus;ln|cos(x)|' + (k > 1 ? ')' : '') + ' + C';
    var resp = R.expresion('-' + k + '*ln(cos(x))', { masConstante: true, rango: [0.2, 1.4] });
    resp.mostrar = function () { return mostrar; };
    return {
      enunciado: 'Resuelve: <span class="big">&int; ' + (k > 1 ? k + ' ' : '') + 'tan(x) dx</span>',
      respuesta: resp,
      pistas: ['Escribe tan x como sen x / cos x.',
        'Toma u = cos x; entonces du = &minus;sen x dx, asi que sen x dx = &minus;du.'],
      solucion: ['&int;tan x dx = &int; ' + F.frac('sen x', 'cos x') + ' dx',
        'u = cos x &rArr; du = &minus;sen x dx',
        '&int; &minus;du/u = &minus;ln|u|',
        'Resultado: <b>' + mostrar + '</b> (tambien se escribe como ln|sec x| + C)']
    };
  };

  EJ.tema({
    id: 'sustitucion',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Formula de sustitucion',
    descripcion: 'Integrales por cambio de variable u = g(x), incluyendo integrales definidas.',
    formulario: '&int; f(g(x))&middot;g&prime;(x) dx = &int; f(u) du con u = g(x)<br>' +
      'Buscas una parte cuya derivada tambien aparezca (salvo constantes).<br>' +
      'En definidas conviene cambiar tambien los limites: &int;<sub>a</sub><sup>b</sup> &rarr; &int;<sub>g(a)</sub><sup>g(b)</sup>',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, k, n, a, b, texto, mostrar;
      var opciones = { masConstante: true, ayuda: 'No hace falta escribir "+C". Usa ^ para exponentes.' };

      if (dif === 'facil') {
        var t = r.subtema([
          ['binomio', 'Binomio elevado a una potencia'],
          ['trig', 'Seno y coseno de kx'],
          ['cuadrado', 'Con la derivada visible'],
          ['exponencialSimple', 'Exponencial e^(kx)']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'binomio') {
          a = r.entero(2, 6); b = r.entero(-8, 8); n = r.entero(2, 5);
          enun = 'Resuelve: ' + inte('(' + P.texto([a, b]) + ')' + F.sup(n));
          texto = '((' + a + '*x+(' + b + '))^(' + (n + 1) + '))/(' + (a * (n + 1)) + ')';
          mostrar = F.frac('(' + P.texto([a, b]) + ')' + F.sup(n + 1), a * (n + 1)) + ' + C';
          pistas = ['Toma u = ' + P.texto([a, b]) + ', entonces du = ' + a + ' dx.',
            'Como dx = du/' + a + ', la integral queda (1/' + a + ')&int;u' + F.sup(n) + ' du.'];
          sol = ['u = ' + P.texto([a, b]) + ' &rArr; du = ' + a + 'dx &rArr; dx = du/' + a,
            '(1/' + a + ')&int;u' + F.sup(n) + 'du = ' + F.frac('u' + F.sup(n + 1), a * (n + 1)),
            'Regreso el cambio: <b>' + mostrar + '</b>'];
        } else if (t === 'trig') {
          k = r.entero(2, 6);
          var esSen = r.bool();
          enun = 'Resuelve: ' + inte(esSen ? 'sen(' + k + 'x)' : 'cos(' + k + 'x)');
          texto = esSen ? '-cos(' + k + '*x)/' + k : 'sin(' + k + '*x)/' + k;
          mostrar = (esSen ? '&minus;' + F.frac('cos(' + k + 'x)', k) : F.frac('sen(' + k + 'x)', k)) + ' + C';
          pistas = ['Con u = ' + k + 'x se tiene du = ' + k + 'dx.',
            'Queda (1/' + k + ')&int;' + (esSen ? 'sen' : 'cos') + '(u)du.'];
          sol = ['u = ' + k + 'x &rArr; du = ' + k + 'dx',
            '(1/' + k + ')&int;' + (esSen ? 'sen u du = &minus;cos u /' + k : 'cos u du = sen u /' + k),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          a = r.entero(1, 9); n = r.entero(2, 4);
          enun = 'Resuelve: ' + inte('2x(x&sup2; + ' + a + ')' + F.sup(n));
          texto = '((x^2+' + a + ')^(' + (n + 1) + '))/' + (n + 1);
          mostrar = F.frac('(x&sup2; + ' + a + ')' + F.sup(n + 1), n + 1) + ' + C';
          pistas = ['Observa que la derivada de x&sup2; + ' + a + ' es justo 2x, que ya esta multiplicando.',
            'Con u = x&sup2; + ' + a + ', du = 2x dx, asi que la integral es &int;u' + F.sup(n) + 'du.'];
          sol = ['u = x&sup2; + ' + a + ' &rArr; du = 2x dx',
            '&int;u' + F.sup(n) + 'du = u' + F.sup(n + 1) + '/' + (n + 1),
            'Resultado: <b>' + mostrar + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['racional', 'Racional que da logaritmo'],
          ['lnSobreX', 'Con logaritmo adentro'],
          ['expCuadrado', 'Exponencial con x&sup2;'],
          ['senPotencia', 'Potencia de seno'],
          ['tangente', 'Integral de tan(x)']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'racional') {
          a = r.entero(1, 9);
          enun = 'Resuelve: ' + inte(F.frac('x', 'x&sup2; + ' + a));
          texto = 'ln(x^2+' + a + ')/2';
          mostrar = '&frac12; ln(x&sup2; + ' + a + ') + C';
          pistas = ['La derivada del denominador es 2x, y arriba tienes x: solo falta un 2.',
            'Con u = x&sup2; + ' + a + ', du = 2x dx &rArr; x dx = du/2.'];
          sol = ['u = x&sup2; + ' + a + ' &rArr; du = 2x dx',
            'x dx = du/2, asi que la integral es (1/2)&int;du/u',
            '= &frac12; ln|u|',
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t2 === 'lnSobreX') {
          enun = 'Resuelve: ' + inte(F.frac('ln(x)', 'x'));
          texto = '(ln(x))^2/2';
          mostrar = F.frac('(ln x)&sup2;', 2) + ' + C';
          pistas = ['La derivada de ln x es 1/x, que ya esta multiplicando.',
            'Con u = ln x, du = dx/x, la integral es &int;u du.'];
          sol = ['u = ln x &rArr; du = dx/x',
            '&int;u du = u&sup2;/2',
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t2 === 'expCuadrado') {
          k = r.entero(1, 4);
          enun = 'Resuelve: ' + inte('x e' + F.sup(k + 'x&sup2;'));
          texto = 'exp(' + k + '*x^2)/' + (2 * k);
          mostrar = F.frac('e' + F.sup(k + 'x&sup2;'), 2 * k) + ' + C';
          pistas = ['Con u = ' + k + 'x&sup2;, du = ' + (2 * k) + 'x dx.',
            'Entonces x dx = du/' + (2 * k) + '.'];
          sol = ['u = ' + k + 'x&sup2; &rArr; du = ' + (2 * k) + 'x dx',
            '(1/' + (2 * k) + ')&int;e<sup>u</sup>du = e<sup>u</sup>/' + (2 * k),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          n = r.entero(2, 5);
          enun = 'Resuelve: ' + inte('sen' + F.sup(n) + '(x) cos(x)');
          texto = '(sin(x))^(' + (n + 1) + ')/' + (n + 1);
          mostrar = F.frac('sen' + F.sup(n + 1) + '(x)', n + 1) + ' + C';
          pistas = ['La derivada de sen x es cos x, que ya aparece multiplicando.',
            'Con u = sen x la integral queda &int;u' + F.sup(n) + 'du.'];
          sol = ['u = sen x &rArr; du = cos x dx',
            '&int;u' + F.sup(n) + 'du = u' + F.sup(n + 1) + '/' + (n + 1),
            'Resultado: <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['definida', 'Integral definida con cambio de limites'],
          ['raizCubica', 'Con raiz cuadrada'],
          ['expSen', 'Exponencial con seno'],
          ['logaritmica', 'Derivada del denominador'],
          ['tangente', 'Integral de tan(x)']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'definida') {
          b = r.entero(1, 3); n = r.entero(2, 4);
          var valor = (Math.pow(b * b + 1, n + 1) - 1) / (2 * (n + 1));
          enun = 'Calcula (4 decimales):<br><span class="big">&int;<sub>0</sub><sup>' + b + '</sup> x(x&sup2; + 1)' + F.sup(n) + ' dx</span>';
          resp = R.numero(valor, { dec: 4, tol: 0.005 });
          pistas = ['Usa u = x&sup2; + 1 y cambia tambien los limites de integracion.',
            'Cuando x = 0, u = 1; cuando x = ' + b + ', u = ' + (b * b + 1) + '. Ademas x dx = du/2.'];
          sol = ['u = x&sup2; + 1 &rArr; du = 2x dx &rArr; x dx = du/2',
            'Limites nuevos: de u = 1 a u = ' + (b * b + 1),
            '(1/2)&int;<sub>1</sub><sup>' + (b * b + 1) + '</sup> u' + F.sup(n) + 'du = ' + F.frac('u' + F.sup(n + 1), 2 * (n + 1)) + ' evaluado',
            'Resultado = (' + (b * b + 1) + F.sup(n + 1) + ' &minus; 1)/' + (2 * (n + 1)) + ' = <b>' + F.n(valor, 4) + '</b>'];
          return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
        } else if (t3 === 'raizCubica') {
          a = r.entero(1, 9);
          enun = 'Resuelve: ' + inte('x&sup2; &radic;<span class="rad">x&sup3; + ' + a + '</span>');
          texto = '2*(x^3+' + a + ')^(3/2)/9';
          mostrar = F.frac('2(x&sup3; + ' + a + ')' + F.sup('3/2'), 9) + ' + C';
          pistas = ['La derivada de x&sup3; + ' + a + ' es 3x&sup2;, y arriba tienes x&sup2;.',
            'Con u = x&sup3; + ' + a + ': x&sup2;dx = du/3, y &radic;u = u<sup>1/2</sup>.'];
          sol = ['u = x&sup3; + ' + a + ' &rArr; du = 3x&sup2;dx &rArr; x&sup2;dx = du/3',
            '(1/3)&int;u<sup>1/2</sup>du = (1/3)&middot;(2/3)u<sup>3/2</sup>',
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t3 === 'expSen') {
          enun = 'Resuelve: ' + inte('e<sup>sen(x)</sup> cos(x)');
          texto = 'exp(sin(x))';
          mostrar = 'e<sup>sen(x)</sup> + C';
          pistas = ['Mira el exponente: su derivada es cos x, que ya esta multiplicando.',
            'Con u = sen x la integral es simplemente &int;e<sup>u</sup>du.'];
          sol = ['u = sen x &rArr; du = cos x dx',
            '&int;e<sup>u</sup>du = e<sup>u</sup>',
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          var c = r.entero(1, 6), d = r.entero(2, 9);
          enun = 'Resuelve: ' + inte(F.frac(P.texto([2, c]), P.texto([1, c, d])));
          texto = 'ln(x^2+' + c + '*x+' + d + ')';
          mostrar = 'ln|' + P.texto([1, c, d]) + '| + C';
          pistas = ['Compara el numerador con la derivada del denominador.',
            '(' + P.texto([1, c, d]) + ')&prime; = ' + P.texto([2, c]) + ', que es exactamente el numerador.'];
          sol = ['u = ' + P.texto([1, c, d]) + ' &rArr; du = (' + P.texto([2, c]) + ')dx',
            'La integral se vuelve &int;du/u = ln|u|',
            'Resultado: <b>' + mostrar + '</b>'];
        }
      }

      resp = R.expresion(texto, opciones);
      resp.mostrar = function () { return mostrar; };
      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
