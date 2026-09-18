/* Teoremas fundamentales del calculo */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function integralDef(p, a, b) {
    var I = P.integral(p);
    return P.evalua(I, b) - P.evalua(I, a);
  }

  var extra = {};

  extra.propiedades = function (r) {
    var i1 = r.entero(-20, 20), i2 = r.entero(-20, 20);
    var a = r.entero(0, 3), b = a + r.entero(1, 4), c = b + r.entero(1, 4);
    var k = r.elige([2, 3, 4]);
    return {
      enunciado: 'Si &int;<sub>' + a + '</sub><sup>' + b + '</sup> f(x)dx = ' + i1 + ' y &int;<sub>' + b + '</sub><sup>' + c + '</sup> f(x)dx = ' + i2 + ',<br>' +
        'calcula &int;<sub>' + a + '</sub><sup>' + c + '</sup> f(x)dx y &int;<sub>' + b + '</sub><sup>' + a + '</sup> ' + k + 'f(x)dx.',
      respuesta: R.varios([
        { etiqueta: '&int; de ' + a + ' a ' + c, resp: R.numero(i1 + i2, { dec: 2 }) },
        { etiqueta: '&int; de ' + b + ' a ' + a + ' de ' + k + 'f', resp: R.numero(-k * i1, { dec: 2 }) }
      ]),
      pistas: ['Las integrales sobre tramos seguidos se suman: &int;<sub>a</sub><sup>b</sup> + &int;<sub>b</sub><sup>c</sup> = &int;<sub>a</sub><sup>c</sup>.',
        'Al voltear los limites la integral cambia de signo, y una constante sale multiplicando.'],
      solucion: ['&int;<sub>' + a + '</sub><sup>' + c + '</sup> = ' + i1 + ' + (' + i2 + ') = <b>' + (i1 + i2) + '</b>',
        'Al invertir los limites: &int;<sub>' + b + '</sub><sup>' + a + '</sup> f = &minus;(' + i1 + ') = ' + (-i1),
        'La constante ' + k + ' sale: ' + k + ' &middot; (' + (-i1) + ') = <b>' + (-k * i1) + '</b>']
    };
  };

  extra.areaEntreCurvas = function (r) {
    var m = r.entero(2, 7);
    /* area entre y = mx  y  y = x^2, que se cortan en 0 y m */
    var area = m * m * m / 6;
    return {
      enunciado: 'Calcula el area encerrada entre la recta y = ' + m + 'x y la parabola y = x&sup2; (4 decimales).',
      respuesta: R.numero(area, { dec: 4, tol: 0.005 }),
      pistas: ['Primero encuentra donde se cortan: iguala ' + m + 'x = x&sup2;.',
        'Se cortan en x = 0 y x = ' + m + '. El area es &int;<sub>0</sub><sup>' + m + '</sup> (' + m + 'x &minus; x&sup2;) dx (la de arriba menos la de abajo).'],
      solucion: [m + 'x = x&sup2; &rArr; x = 0 y x = ' + m,
        'Entre esos puntos la recta va ARRIBA de la parabola',
        'Area = &int;<sub>0</sub><sup>' + m + '</sup> (' + m + 'x &minus; x&sup2;)dx = [' + F.frac(m, 2) + 'x&sup2; &minus; ' + F.frac(1, 3) + 'x&sup3;]',
        'Area = ' + F.n(m * m * m / 2, 4) + ' &minus; ' + F.n(m * m * m / 3, 4) + ' = <b>' + F.n(area, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'tfc',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Teoremas fundamentales del calculo',
    descripcion: 'Evaluar integrales definidas y derivar funciones definidas por una integral.',
    formulario: 'Primer teorema: si F(x) = &int;<sub>a</sub><sup>x</sup> f(t)dt entonces F&prime;(x) = f(x).<br>' +
      'Con limite variable: d/dx &int;<sub>a</sub><sup>g(x)</sup> f(t)dt = f(g(x))&middot;g&prime;(x).<br>' +
      'Segundo teorema: &int;<sub>a</sub><sup>b</sup> f(x)dx = F(b) &minus; F(a), donde F es una antiderivada de f.<br>' +
      'Valor promedio en [a, b]: (1/(b&minus;a))&int;<sub>a</sub><sup>b</sup> f(x)dx',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, p, a, b, I, val;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['definida', 'Integral definida de un polinomio'],
          ['propiedades', 'Propiedades de la integral definida']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        p = [r.entero(1, 5), r.entero(-6, 6), r.entero(-8, 8)];
        a = r.entero(0, 3); b = a + r.entero(1, 4);
        I = P.integral(p);
        val = integralDef(p, a, b);
        enun = 'Calcula la integral definida (4 decimales):<br>' +
          '<span class="big">&int;<sub>' + a + '</sub><sup>' + b + '</sup> (' + P.texto(p) + ') dx</span>';
        resp = R.numero(val, { dec: 4, tol: 0.005 });
        pistas = ['Primero encuentra una antiderivada F(x) y luego calcula F(' + b + ') &minus; F(' + a + ').',
          'F(x) = ' + P.texto(I) + '.'];
        sol = ['Antiderivada: F(x) = ' + P.texto(I),
          'F(' + b + ') = ' + F.n(P.evalua(I, b), 4),
          'F(' + a + ') = ' + F.n(P.evalua(I, a), 4),
          'Integral = F(' + b + ') &minus; F(' + a + ') = <b>' + F.n(val, 4) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['primerTeorema', 'Primer teorema fundamental'],
          ['areaPoli', 'Area bajo una curva'],
          ['promedio', 'Valor promedio'],
          ['propiedades', 'Propiedades de la integral definida']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'primerTeorema') {
          p = [r.entero(1, 4), r.entero(-5, 5), r.entero(-7, 7)];
          a = r.entero(0, 4);
          enun = 'Si F(x) = &int;<sub>' + a + '</sub><sup>x</sup> (' + P.texto(p, 't') + ') dt,<br>encuentra F&prime;(x).';
          resp = R.expresion(P.expr(p), { mostrar: P.texto(p) });
          pistas = ['El primer teorema fundamental dice que derivar deshace la integral.',
            'Solo hay que cambiar la t por x en el integrando.'];
          sol = ['Primer teorema: F&prime;(x) = f(x), donde f es el integrando',
            'Cambio t por x',
            'F&prime;(x) = <b>' + P.texto(p) + '</b>'];
        } else if (t === 'areaPoli') {
          var r1 = r.entero(0, 3);
          var r2 = r1 + r.entero(2, 5);
          p = P.escala(P.deRaices([r1, r2]), -1);   // abre hacia abajo: area positiva entre las raices
          val = integralDef(p, r1, r2);
          enun = 'Calcula el area entre la curva y = ' + P.texto(p) + ' y el eje x,<br>' +
            'entre sus dos cortes con el eje (4 decimales).';
          resp = R.numero(val, { dec: 4, tol: 0.005 });
          pistas = ['Primero encuentra donde la curva corta al eje x (ahi estan los limites de integracion).',
            'Las raices son x = ' + r1 + ' y x = ' + r2 + '.'];
          sol = ['Raices: x = ' + r1 + ' y x = ' + r2,
            'Area = &int;<sub>' + r1 + '</sub><sup>' + r2 + '</sup> (' + P.texto(p) + ') dx',
            'F(x) = ' + P.texto(P.integral(p)),
            'Area = <b>' + F.n(val, 4) + '</b>'];
        } else {
          p = [r.entero(1, 4), r.entero(-5, 5), r.entero(-6, 6)];
          a = r.entero(0, 2); b = a + r.entero(2, 5);
          val = integralDef(p, a, b) / (b - a);
          enun = 'Calcula el valor promedio de f(x) = ' + P.texto(p) + ' en el intervalo [' + a + ', ' + b + '].<br>(4 decimales)';
          resp = R.numero(val, { dec: 4, tol: 0.005 });
          pistas = ['Valor promedio = (1/(b &minus; a)) &int;<sub>a</sub><sup>b</sup> f(x)dx.',
            'La integral vale ' + F.n(integralDef(p, a, b), 4) + '; divide entre ' + (b - a) + '.'];
          sol = ['&int;<sub>' + a + '</sub><sup>' + b + '</sup> f(x)dx = ' + F.n(integralDef(p, a, b), 4),
            'Divido entre b &minus; a = ' + (b - a),
            'Valor promedio = <b>' + F.n(val, 4) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['cadenaTFC', 'Primer teorema con regla de la cadena'],
          ['limiteInferior', 'Variable en el limite inferior'],
          ['raizIntegral', 'Derivar y evaluar'],
          ['trigDefinida', 'Integral definida trigonometrica'],
          ['areaEntreCurvas', 'Area entre dos curvas']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'cadenaTFC') {
          var n = r.entero(2, 3);
          var k = r.entero(1, 4);
          a = r.entero(0, 3);
          enun = 'Si F(x) = &int;<sub>' + a + '</sub><sup>x' + F.sup(n) + '</sup> (' + k + 't&sup2; + 1) dt,<br>encuentra F&prime;(x).';
          resp = R.expresion('(' + k + '*(x^(' + n + '))^2+1)*' + n + '*x^(' + (n - 1) + ')', {
            mostrar: '(' + k + 'x' + F.sup(2 * n) + ' + 1)&middot;' + n + 'x' + F.sup(n - 1)
          });
          pistas = ['El limite superior no es x sino x' + F.sup(n) + ': hay que usar la regla de la cadena.',
            'F&prime;(x) = f(g(x))&middot;g&prime;(x), con g(x) = x' + F.sup(n) + ' y g&prime;(x) = ' + n + 'x' + F.sup(n - 1) + '.'];
          sol = ['f(t) = ' + k + 't&sup2; + 1, g(x) = x' + F.sup(n),
            'f(g(x)) = ' + k + '(x' + F.sup(n) + ')&sup2; + 1 = ' + k + 'x' + F.sup(2 * n) + ' + 1',
            'g&prime;(x) = ' + n + 'x' + F.sup(n - 1),
            'F&prime;(x) = <b>(' + k + 'x' + F.sup(2 * n) + ' + 1)&middot;' + n + 'x' + F.sup(n - 1) + '</b>'];
        } else if (t2 === 'limiteInferior') {
          p = [r.entero(1, 4), r.entero(-4, 4), r.entero(1, 6)];
          b = r.entero(1, 5);
          enun = 'Si F(x) = &int;<sub>x</sub><sup>' + b + '</sup> (' + P.texto(p, 't') + ') dt,<br>encuentra F&prime;(x).';
          resp = R.expresion('-(' + P.expr(p) + ')', { mostrar: P.texto(P.escala(p, -1)) });
          pistas = ['La variable esta en el limite INFERIOR: primero voltea la integral cambiando el signo.',
            '&int;<sub>x</sub><sup>' + b + '</sup> = &minus;&int;<sub>' + b + '</sub><sup>x</sup>.'];
          sol = ['Volteo los limites: F(x) = &minus;&int;<sub>' + b + '</sub><sup>x</sup> f(t)dt',
            'Ahora aplico el primer teorema y conservo el signo menos',
            'F&prime;(x) = <b>' + P.texto(P.escala(p, -1)) + '</b>'];
        } else if (t2 === 'raizIntegral') {
          var kk = r.entero(1, 5);
          a = r.entero(0, 2);
          enun = 'Si F(x) = &int;<sub>' + a + '</sub><sup>x</sup> &radic;<span class="rad">' + kk + 't + 1</span> dt,<br>encuentra F&prime;(4).  (4 decimales)';
          val = Math.sqrt(kk * 4 + 1);
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['Por el primer teorema F&prime;(x) es el propio integrando con x en lugar de t.',
            'F&prime;(x) = &radic;<span class="rad">' + kk + 'x + 1</span>; ahora sustituye x = 4.'];
          sol = ['F&prime;(x) = &radic;<span class="rad">' + kk + 'x + 1</span>',
            'F&prime;(4) = &radic;<span class="rad">' + (4 * kk) + ' + 1</span> = &radic;<span class="rad">' + (4 * kk + 1) + '</span>',
            'F&prime;(4) = <b>' + F.n(val, 4) + '</b>'];
        } else {
          var kd = r.entero(1, 4);
          var tipo = r.bool();
          val = tipo ? (1 - Math.cos(kd * Math.PI / 2)) / kd : Math.sin(kd * Math.PI / 2) / kd;
          enun = 'Calcula (4 decimales):<br><span class="big">&int;<sub>0</sub><sup>&pi;/2</sup> ' +
            (tipo ? 'sen(' + kd + 'x)' : 'cos(' + kd + 'x)') + ' dx</span>';
          resp = R.numero(val, { dec: 4, tol: 0.002 });
          pistas = [tipo ? 'Una antiderivada de sen(kx) es &minus;cos(kx)/k.' : 'Una antiderivada de cos(kx) es sen(kx)/k.',
            'Evalua entre 0 y &pi;/2 = ' + F.n(Math.PI / 2, 4) + ' radianes.'];
          sol = ['F(x) = ' + (tipo ? '&minus;cos(' + kd + 'x)/' + kd : 'sen(' + kd + 'x)/' + kd),
            'F(&pi;/2) = ' + F.n(tipo ? -Math.cos(kd * Math.PI / 2) / kd : Math.sin(kd * Math.PI / 2) / kd, 4),
            'F(0) = ' + F.n(tipo ? -1 / kd : 0, 4),
            'Integral = <b>' + F.n(val, 4) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
