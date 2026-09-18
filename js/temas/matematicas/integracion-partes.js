/* Integracion por partes */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function inte(expr) { return '<span class="big">&int; ' + expr + ' dx</span>'; }

  var extra = {};

  extra.arctan = function (r) {
    var k = r.entero(1, 4);
    var mostrar = (k > 1 ? k + '(' : '') + 'x arctan(x) &minus; &frac12; ln(1 + x&sup2;)' + (k > 1 ? ')' : '') + ' + C';
    var resp = R.expresion(k + '*(x*atan(x)-0.5*ln(1+x^2))', { masConstante: true });
    resp.mostrar = function () { return mostrar; };
    return {
      enunciado: 'Resuelve: <span class="big">&int; ' + (k > 1 ? k + ' ' : '') + 'arctan(x) dx</span>',
      respuesta: resp,
      pistas: ['Aunque no se vea un producto, toma u = arctan(x) y dv = dx.',
        'du = dx/(1 + x&sup2;) y v = x, asi que queda x&middot;arctan(x) &minus; &int; x/(1 + x&sup2;) dx.'],
      solucion: ['u = arctan x &rArr; du = dx/(1 + x&sup2;); dv = dx &rArr; v = x',
        '&int;arctan x dx = x arctan x &minus; &int; ' + F.frac('x', '1 + x&sup2;') + ' dx',
        'Esa ultima integral sale por sustitucion: vale &frac12; ln(1 + x&sup2;)',
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  EJ.tema({
    id: 'integracion-partes',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Integracion por partes',
    descripcion: 'Integrales de productos usando &int;u dv = uv &minus; &int;v du.',
    formulario: '&int; u dv = uv &minus; &int; v du<br>' +
      'Para elegir u sirve la regla LIATE: Logaritmica, Inversa trigonometrica, Algebraica, Trigonometrica, Exponencial.<br>' +
      'Lo que elijas como u debe simplificarse al derivarlo.',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, k, n, texto, mostrar, ayudaU;
      var opciones = { masConstante: true, ayuda: 'No hace falta escribir "+C". Usa ^ para exponentes y * para multiplicar.' };

      if (dif === 'facil') {
        var t = r.subtema([
          ['xExp', 'x por exponencial'],
          ['xSen', 'x por seno'],
          ['xCos', 'x por coseno']
        ]);
        if (extra[t]) return extra[t](r, dif);
        k = r.entero(1, 4);
        if (t === 'xExp') {
          enun = 'Resuelve: ' + inte('x e' + F.sup(k + 'x'));
          texto = 'exp(' + k + '*x)*(x/' + k + '-1/' + (k * k) + ')';
          mostrar = 'e' + F.sup(k + 'x') + '(' + F.frac('x', k) + ' &minus; ' + F.frac(1, k * k) + ') + C';
          ayudaU = 'u = x (se simplifica al derivar), dv = e' + F.sup(k + 'x') + 'dx';
          sol = ['u = x &rArr; du = dx; dv = e' + F.sup(k + 'x') + 'dx &rArr; v = e' + F.sup(k + 'x') + '/' + k,
            '&int;u dv = uv &minus; &int;v du = ' + F.frac('x e' + F.sup(k + 'x'), k) + ' &minus; ' + F.frac(1, k) + '&int; e' + F.sup(k + 'x') + 'dx',
            '= ' + F.frac('x e' + F.sup(k + 'x'), k) + ' &minus; ' + F.frac('e' + F.sup(k + 'x'), k * k),
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t === 'xSen') {
          enun = 'Resuelve: ' + inte('x sen(' + k + 'x)');
          texto = '-x*cos(' + k + '*x)/' + k + '+sin(' + k + '*x)/' + (k * k);
          mostrar = '&minus;' + F.frac('x cos(' + k + 'x)', k) + ' + ' + F.frac('sen(' + k + 'x)', k * k) + ' + C';
          ayudaU = 'u = x, dv = sen(' + k + 'x)dx';
          sol = ['u = x &rArr; du = dx; dv = sen(' + k + 'x)dx &rArr; v = &minus;cos(' + k + 'x)/' + k,
            'uv &minus; &int;v du = &minus;' + F.frac('x cos(' + k + 'x)', k) + ' + ' + F.frac(1, k) + '&int;cos(' + k + 'x)dx',
            '= &minus;' + F.frac('x cos(' + k + 'x)', k) + ' + ' + F.frac('sen(' + k + 'x)', k * k),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          enun = 'Resuelve: ' + inte('x cos(' + k + 'x)');
          texto = 'x*sin(' + k + '*x)/' + k + '+cos(' + k + '*x)/' + (k * k);
          mostrar = F.frac('x sen(' + k + 'x)', k) + ' + ' + F.frac('cos(' + k + 'x)', k * k) + ' + C';
          ayudaU = 'u = x, dv = cos(' + k + 'x)dx';
          sol = ['u = x &rArr; du = dx; dv = cos(' + k + 'x)dx &rArr; v = sen(' + k + 'x)/' + k,
            'uv &minus; &int;v du = ' + F.frac('x sen(' + k + 'x)', k) + ' &minus; ' + F.frac(1, k) + '&int;sen(' + k + 'x)dx',
            '= ' + F.frac('x sen(' + k + 'x)', k) + ' + ' + F.frac('cos(' + k + 'x)', k * k),
            'Resultado: <b>' + mostrar + '</b>'];
        }
        pistas = ['Elige como u la parte algebraica (la x), porque al derivarla desaparece.', ayudaU + '.'];
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['x2Exp', 'x&sup2; por exponencial (dos veces)'],
          ['xLn', 'Potencia por logaritmo'],
          ['lnSolo', 'Integral de ln(x)'],
          ['arctan', 'Integral de arctan(x)']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'x2Exp') {
          enun = 'Resuelve: ' + inte('x&sup2; e<sup>x</sup>');
          texto = 'exp(x)*(x^2-2*x+2)';
          mostrar = 'e<sup>x</sup>(x&sup2; &minus; 2x + 2) + C';
          pistas = ['Aplica partes DOS veces: la primera baja x&sup2; a 2x y la segunda lo baja a una constante.',
            'Primera vez: u = x&sup2;, dv = e<sup>x</sup>dx &rArr; x&sup2;e<sup>x</sup> &minus; 2&int;x e<sup>x</sup>dx.'];
          sol = ['Primera aplicacion: u = x&sup2;, dv = e<sup>x</sup>dx &rArr; x&sup2;e<sup>x</sup> &minus; 2&int;xe<sup>x</sup>dx',
            'Segunda aplicacion: &int;xe<sup>x</sup>dx = xe<sup>x</sup> &minus; e<sup>x</sup>',
            'Junto todo: x&sup2;e<sup>x</sup> &minus; 2(xe<sup>x</sup> &minus; e<sup>x</sup>)',
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t2 === 'xLn') {
          n = r.entero(1, 3);
          enun = 'Resuelve: ' + inte('x' + (n > 1 ? F.sup(n) : '') + ' ln(x)');
          texto = 'x^(' + (n + 1) + ')*ln(x)/' + (n + 1) + '-x^(' + (n + 1) + ')/' + ((n + 1) * (n + 1));
          mostrar = F.frac('x' + F.sup(n + 1) + ' ln(x)', n + 1) + ' &minus; ' + F.frac('x' + F.sup(n + 1), (n + 1) * (n + 1)) + ' + C';
          pistas = ['Aqui conviene u = ln x (por LIATE, el logaritmo va primero), y dv = x' + (n > 1 ? F.sup(n) : '') + 'dx.',
            'du = dx/x y v = x' + F.sup(n + 1) + '/' + (n + 1) + ', asi que &int;v du se vuelve facil.'];
          sol = ['u = ln x &rArr; du = dx/x; dv = x' + F.sup(n) + 'dx &rArr; v = x' + F.sup(n + 1) + '/' + (n + 1),
            'uv &minus; &int;v du = ' + F.frac('x' + F.sup(n + 1) + ' ln x', n + 1) + ' &minus; ' + F.frac(1, n + 1) + '&int;x' + F.sup(n) + 'dx',
            '= ' + F.frac('x' + F.sup(n + 1) + ' ln x', n + 1) + ' &minus; ' + F.frac('x' + F.sup(n + 1), (n + 1) * (n + 1)),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          k = r.entero(1, 5);
          enun = 'Resuelve: ' + inte((k > 1 ? k + ' ' : '') + 'ln(x)');
          texto = k + '*(x*ln(x)-x)';
          mostrar = (k > 1 ? k + '(' : '') + 'x ln(x) &minus; x' + (k > 1 ? ')' : '') + ' + C';
          pistas = ['Aunque parezca que no hay producto, se toma u = ln x y dv = dx.',
            'Entonces v = x y &int;v du = &int;x&middot;(1/x)dx = &int;dx.'];
          sol = ['u = ln x &rArr; du = dx/x; dv = dx &rArr; v = x',
            '&int;ln x dx = x ln x &minus; &int;x&middot;(1/x)dx = x ln x &minus; &int;dx',
            '= x ln x &minus; x',
            'Resultado: <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['expSen', 'Exponencial por seno (ciclica)'],
          ['x2Trig', 'x&sup2; por trigonometrica'],
          ['arctan', 'Integral de arctan(x)'],
          ['definida', 'Integral definida por partes']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'expSen') {
          var a = r.entero(1, 3), b = r.entero(1, 3);
          enun = 'Resuelve: ' + inte('e' + F.sup(a + 'x') + ' sen(' + b + 'x)');
          texto = 'exp(' + a + '*x)*(' + a + '*sin(' + b + '*x)-' + b + '*cos(' + b + '*x))/' + (a * a + b * b);
          mostrar = F.frac('e' + F.sup(a + 'x') + '(' + a + ' sen(' + b + 'x) &minus; ' + b + ' cos(' + b + 'x))', a * a + b * b) + ' + C';
          pistas = ['Aplica partes dos veces: vuelve a aparecer la integral original.',
            'Llama I a la integral, despejala como una ecuacion: I = &hellip; &minus; (' + (b * b) + '/' + (a * a) + ')I.'];
          sol = ['Aplico partes dos veces (siempre tomando la exponencial como dv, o siempre como u)',
            'Reaparece la integral original I, asi que la trato como incognita',
            'Despejando I queda dividido entre a&sup2; + b&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'Resultado: <b>' + mostrar + '</b>'];
        } else if (t3 === 'x2Trig') {
          var esSen = r.bool();
          enun = 'Resuelve: ' + inte('x&sup2; ' + (esSen ? 'sen(x)' : 'cos(x)'));
          if (esSen) {
            texto = '-x^2*cos(x)+2*x*sin(x)+2*cos(x)';
            mostrar = '&minus;x&sup2; cos(x) + 2x sen(x) + 2 cos(x) + C';
            sol = ['u = x&sup2;, dv = sen x dx &rArr; &minus;x&sup2;cos x + 2&int;x cos x dx',
              '&int;x cos x dx = x sen x + cos x',
              'Junto: &minus;x&sup2;cos x + 2(x sen x + cos x)',
              'Resultado: <b>' + mostrar + '</b>'];
          } else {
            texto = 'x^2*sin(x)+2*x*cos(x)-2*sin(x)';
            mostrar = 'x&sup2; sen(x) + 2x cos(x) &minus; 2 sen(x) + C';
            sol = ['u = x&sup2;, dv = cos x dx &rArr; x&sup2;sen x &minus; 2&int;x sen x dx',
              '&int;x sen x dx = &minus;x cos x + sen x',
              'Junto: x&sup2;sen x &minus; 2(&minus;x cos x + sen x)',
              'Resultado: <b>' + mostrar + '</b>'];
          }
          pistas = ['Necesitas aplicar partes dos veces, siempre con la potencia de x como u.',
            'Despues de la primera vez te queda una integral del tipo &int;x sen x dx o &int;x cos x dx.'];
        } else {
          var lim = r.entero(1, 3);
          var valor = (lim - 1) * Math.exp(lim) + 1;   // int_0^lim x e^x dx
          enun = 'Calcula la integral definida (4 decimales):<br>' +
            '<span class="big">&int;<sub>0</sub><sup>' + lim + '</sup> x e<sup>x</sup> dx</span>';
          resp = R.numero(valor, { dec: 4, tol: 0.002 });
          pistas = ['Primero encuentra la antiderivada por partes: &int;xe<sup>x</sup>dx = e<sup>x</sup>(x &minus; 1).',
            'Ahora evalua entre 0 y ' + lim + ': recuerda que e<sup>0</sup> = 1.'];
          sol = ['Por partes: &int;xe<sup>x</sup>dx = xe<sup>x</sup> &minus; e<sup>x</sup> = e<sup>x</sup>(x &minus; 1)',
            'En x = ' + lim + ': e' + F.sup(lim) + '(' + (lim - 1) + ') = ' + F.n((lim - 1) * Math.exp(lim), 4),
            'En x = 0: e&#8304;(&minus;1) = &minus;1',
            'Integral = ' + F.n((lim - 1) * Math.exp(lim), 4) + ' &minus; (&minus;1) = <b>' + F.n(valor, 4) + '</b>'];
          return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
        }
      }

      resp = R.expresion(texto, opciones);
      resp.mostrar = function () { return mostrar; };
      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
