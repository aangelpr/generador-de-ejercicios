/* Progresiones aritmeticas y geometricas */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var extra = {};

  extra.medios = function (r) {
    var a1 = r.entero(-8, 10), d = r.enteroNoCero(-7, 8), k = r.entero(2, 4);
    var ultimo = a1 + (k + 1) * d;
    var medios = [];
    for (var i = 1; i <= k; i++) medios.push(a1 + i * d);
    return {
      enunciado: 'Interpola ' + k + ' medios aritmeticos entre ' + a1 + ' y ' + ultimo + '.<br>' +
        'Da los ' + k + ' numeros que van en medio, separados por comas.',
      respuesta: R.lista(medios, { ayuda: 'Escribe los ' + k + ' valores separados por comas.' }),
      pistas: ['Al meter ' + k + ' numeros en medio quedan ' + (k + 2) + ' terminos en total.',
        'Usa a<sub>' + (k + 2) + '</sub> = a<sub>1</sub> + (' + (k + 1) + ')d y despeja d: d = (' + ultimo + ' &minus; ' + a1 + ')/' + (k + 1) + ' = ' + d + '.'],
      solucion: ['En total hay ' + (k + 2) + ' terminos: ' + a1 + ', los ' + k + ' medios, y ' + ultimo,
        'd = (' + ultimo + ' &minus; ' + a1 + ') / ' + (k + 1) + ' = ' + d,
        'Voy sumando ' + d + ': <b>' + medios.join(', ') + '</b>']
    };
  };

  extra.hallarR = function (r) {
    var a1 = r.elige([2, 3, 4, 5]), q = r.elige([2, 3, 4]), k = r.entero(4, 6);
    var ak = a1 * Math.pow(q, k - 1);
    return {
      enunciado: 'En una progresion geometrica a<sub>1</sub> = ' + a1 + ' y a<sub>' + k + '</sub> = ' + ak + '.<br>' +
        'Encuentra la razon r y el termino a<sub>' + (k + 2) + '</sub>.',
      respuesta: R.varios([
        { etiqueta: 'Razon r', resp: R.numero(q, { dec: 4, tol: 0.001 }) },
        { etiqueta: 'a<sub>' + (k + 2) + '</sub>', resp: R.numero(a1 * Math.pow(q, k + 1), { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['De a<sub>k</sub> = a<sub>1</sub>r<sup>k&minus;1</sup> despeja: r<sup>' + (k - 1) + '</sup> = ' + ak + '/' + a1 + '.',
        'r<sup>' + (k - 1) + '</sup> = ' + (ak / a1) + ', asi que r es la raiz ' + (k - 1) + '-esima de ese numero.'],
      solucion: ['r<sup>' + (k - 1) + '</sup> = ' + ak + ' / ' + a1 + ' = ' + (ak / a1),
        'r = <b>' + q + '</b>',
        'a<sub>' + (k + 2) + '</sub> = ' + a1 + ' &middot; ' + q + '<sup>' + (k + 1) + '</sup> = <b>' + (a1 * Math.pow(q, k + 1)) + '</b>']
    };
  };

  EJ.tema({
    id: 'progresiones',
    materia: 'matematicas',
    grupo: 'Sucesiones y series',
    nombre: 'Progresiones aritmeticas y geometricas',
    descripcion: 'Termino n-esimo y suma de progresiones aritmeticas y geometricas.',
    formulario: 'Aritmetica: a<sub>n</sub> = a<sub>1</sub> + (n&minus;1)d &nbsp;&middot;&nbsp; S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2<br>' +
      'Geometrica: a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup> &nbsp;&middot;&nbsp; S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1) &nbsp;&middot;&nbsp; S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r) si |r| &lt; 1',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a1, d, n, q, an;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['aritmetica', 'Termino n-esimo aritmetico'],
          ['geometrica', 'Termino n-esimo geometrico']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'aritmetica') {
          a1 = r.entero(-8, 12); d = r.enteroNoCero(-6, 8); n = r.entero(8, 20);
          an = a1 + (n - 1) * d;
          guiaDelPaso = EJ.guia.terminoAritmetico(a1, d, n);
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y d = ' + d + '.<br>Calcula a<sub>' + n + '</sub>.';
          resp = R.numero(an, { dec: 0 });
          pistas = ['Usa a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.',
            'a<sub>' + n + '</sub> = ' + a1 + ' + (' + n + ' &minus; 1)(' + d + ')'];
          sol = ['a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d',
            'a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + a1 + ' + ' + ((n - 1) * d),
            'a<sub>' + n + '</sub> = <b>' + an + '</b>'];
        } else {
          a1 = r.elige([1, 2, 3, 4, 5]); q = r.elige([2, 3, -2]); n = r.entero(5, 9);
          an = a1 * Math.pow(q, n - 1);
          enun = 'En una progresion geometrica a<sub>1</sub> = ' + a1 + ' y r = ' + q + '.<br>Calcula a<sub>' + n + '</sub>.';
          resp = R.numero(an, { dec: 0 });
          pistas = ['Usa a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>.',
            'a<sub>' + n + '</sub> = ' + a1 + ' &middot; (' + q + ')' + F.sup(n - 1)];
          sol = ['a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>',
            '(' + q + ')' + F.sup(n - 1) + ' = ' + Math.pow(q, n - 1),
            'a<sub>' + n + '</sub> = ' + a1 + ' &middot; ' + Math.pow(q, n - 1) + ' = <b>' + an + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['sumaAP', 'Suma de una aritmetica'],
          ['hallarD', 'Hallar la diferencia d'],
          ['sumaGP', 'Suma de una geometrica'],
          ['medios', 'Interpolar medios aritmeticos']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'sumaAP') {
          a1 = r.entero(-5, 10); d = r.enteroNoCero(-5, 7); n = r.entero(10, 25);
          an = a1 + (n - 1) * d;
          var S = n * (a1 + an) / 2;
          enun = 'Calcula la suma de los primeros ' + n + ' terminos de la progresion aritmetica que empieza con a<sub>1</sub> = ' + a1 + ' y tiene d = ' + d + '.';
          resp = R.numero(S, { dec: 2 });
          pistas = ['Primero necesitas el ultimo termino a<sub>' + n + '</sub>, luego usa S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.',
            'a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + an + '.'];
          sol = ['a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + an,
            'S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2 = ' + n + '(' + a1 + ' + ' + an + ')/2',
            'S<sub>' + n + '</sub> = ' + n + '(' + (a1 + an) + ')/2 = <b>' + F.n(S) + '</b>'];
        } else if (t === 'hallarD') {
          a1 = r.entero(-6, 10); d = r.enteroNoCero(-6, 8);
          var k = r.entero(6, 15);
          var ak = a1 + (k - 1) * d;
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y a<sub>' + k + '</sub> = ' + ak + '.<br>Encuentra la diferencia d y el termino a<sub>' + (k + 5) + '</sub>.';
          resp = R.varios([
            { etiqueta: 'd', resp: R.numero(d, { dec: 3 }) },
            { etiqueta: 'a<sub>' + (k + 5) + '</sub>', resp: R.numero(a1 + (k + 4) * d, { dec: 3 }) }
          ]);
          pistas = ['De a<sub>k</sub> = a<sub>1</sub> + (k &minus; 1)d despeja d.',
            'd = (' + ak + ' &minus; ' + a1 + ') / (' + k + ' &minus; 1) = ' + d + '.'];
          sol = ['d = (a<sub>' + k + '</sub> &minus; a<sub>1</sub>)/(' + k + ' &minus; 1) = (' + ak + ' &minus; ' + a1 + ')/' + (k - 1) + ' = <b>' + d + '</b>',
            'a<sub>' + (k + 5) + '</sub> = ' + a1 + ' + ' + (k + 4) + '(' + d + ') = <b>' + (a1 + (k + 4) * d) + '</b>'];
        } else {
          a1 = r.elige([1, 2, 3, 4]); q = r.elige([2, 3]); n = r.entero(5, 9);
          var Sg = a1 * (Math.pow(q, n) - 1) / (q - 1);
          enun = 'Calcula la suma de los primeros ' + n + ' terminos de la progresion geometrica con a<sub>1</sub> = ' + a1 + ' y r = ' + q + '.';
          resp = R.numero(Sg, { dec: 2 });
          pistas = ['Usa S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1).',
            q + F.sup(n) + ' = ' + Math.pow(q, n) + '.'];
          sol = ['S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1)',
            'S = ' + a1 + '(' + Math.pow(q, n) + ' &minus; 1)/(' + q + ' &minus; 1) = ' + a1 + '(' + (Math.pow(q, n) - 1) + ')/' + (q - 1),
            'S = <b>' + F.n(Sg) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['infinita', 'Suma geometrica infinita'],
          ['hallarN', 'Hallar el lugar n'],
          ['hallarR', 'Hallar la razon r'],
          ['problema', 'Problema aplicado'],
          ['medios', 'Interpolar medios aritmeticos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'infinita') {
          var pn = r.entero(1, 4), pd = r.elige([2, 3, 4, 5]);
          while (pn >= pd) pn = r.entero(1, pd - 1);
          a1 = r.entero(2, 12);
          var Sinf = a1 / (1 - pn / pd);
          enun = 'Calcula la suma de todos los terminos de la progresion geometrica infinita con a<sub>1</sub> = ' + a1 + ' y r = ' + F.frac(pn, pd) + '.';
          resp = R.numero(Sinf, { dec: 4 });
          pistas = ['Como |r| &lt; 1 la serie converge: S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r).',
            '1 &minus; ' + F.frac(pn, pd) + ' = ' + F.frac(pd - pn, pd) + ', y dividir entre una fraccion es multiplicar por su reciproco.'];
          sol = ['|r| = ' + F.frac(pn, pd) + ' &lt; 1, asi que la serie converge',
            'S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r) = ' + a1 + ' / ' + F.frac(pd - pn, pd),
            'S<sub>&infin;</sub> = ' + a1 + ' &middot; ' + F.frac(pd, pd - pn) + ' = <b>' + F.fracSimp(a1 * pd, pd - pn) + '</b> (' + F.n(Sinf, 4) + ')'];
        } else if (t2 === 'hallarN') {
          a1 = r.entero(-4, 8); d = r.entero(2, 7); n = r.entero(12, 40);
          an = a1 + (n - 1) * d;
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y d = ' + d + '.<br>&iquest;Que lugar n ocupa el termino que vale ' + an + '?';
          resp = R.numero(n, { dec: 0 });
          pistas = ['Plantea ' + an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ') y despeja n.',
            '(n &minus; 1) = (' + an + ' &minus; ' + a1 + ')/' + d + ' = ' + ((an - a1) / d) + '.'];
          sol = [an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ')',
            (an - a1) + ' = ' + d + '(n &minus; 1) &rArr; n &minus; 1 = ' + ((an - a1) / d),
            'n = <b>' + n + '</b>'];
        } else {
          var sueldo = r.entero(8, 15) * 1000;
          var aum = r.entero(3, 9) * 100;
          var anios = r.entero(6, 12);
          var total = anios * (2 * sueldo + (anios - 1) * aum) / 2;
          enun = 'Una persona gana $' + sueldo + ' el primer anio y cada anio le aumentan $' + aum + ' fijos.<br>' +
            '&iquest;Cuanto gana en el anio ' + anios + ' y cuanto ha ganado en total en esos ' + anios + ' anios?';
          resp = R.varios([
            { etiqueta: 'Anio ' + anios, resp: R.numero(sueldo + (anios - 1) * aum, { dec: 2 }) },
            { etiqueta: 'Total', resp: R.numero(total, { dec: 2 }) }
          ]);
          pistas = ['Es una progresion aritmetica con a<sub>1</sub> = ' + sueldo + ' y d = ' + aum + '.',
            'Para el total usa S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.'];
          sol = ['a<sub>' + anios + '</sub> = ' + sueldo + ' + ' + (anios - 1) + '(' + aum + ') = <b>' + (sueldo + (anios - 1) * aum) + '</b>',
            'S = ' + anios + '(' + sueldo + ' + ' + (sueldo + (anios - 1) * aum) + ')/2',
            'S = <b>' + F.n(total) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
