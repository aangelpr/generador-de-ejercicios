/* Trinomios */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function fac(c, a) { return '(' + F.poli([c, a], 'x') + ')'; }

  var extra = {};

  extra.raices = function (r) {
    var p = r.enteroNoCero(-9, 9), q = r.enteroNoCero(-9, 9);
    var pol = P.multiplica([1, -p], [1, -q]);
    return {
      enunciado: 'Resuelve la ecuacion factorizando:<br><span class="big">' + P.texto(pol) + ' = 0</span><br>Da las dos soluciones separadas por coma.',
      respuesta: R.lista([p, q], { ayuda: 'Escribe los dos valores separados por comas.' }),
      pistas: ['Factoriza el trinomio: busca dos numeros con producto ' + pol[2] + ' y suma ' + pol[1] + '.',
        'Queda ' + fac(1, -p) + fac(1, -q) + ' = 0; un producto es cero si alguno de los factores es cero.'],
      solucion: ['Factorizo: ' + fac(1, -p) + fac(1, -q) + ' = 0',
        'Igualo cada factor a cero',
        'x ' + (p < 0 ? '+ ' + (-p) : '&minus; ' + p) + ' = 0 &rArr; x = <b>' + p + '</b>',
        'x ' + (q < 0 ? '+ ' + (-q) : '&minus; ' + q) + ' = 0 &rArr; x = <b>' + q + '</b>']
    };
  };

  extra.dosVariables = function (r) {
    var p = r.enteroNoCero(-6, 6), q = r.enteroNoCero(-6, 6);
    var b = p + q, c = p * q;
    var mostrar = '(' + F.une([F.term(1, 'x', 1), F.term(p, 'y', 1)]) + ')(' + F.une([F.term(1, 'x', 1), F.term(q, 'y', 1)]) + ')';
    return {
      enunciado: 'Factoriza: ' + F.une([F.term(1, 'x', 2), F.term(b, 'xy', 1), F.term(c, 'y', 2)]),
      respuesta: R.factorizada('(x+(' + p + ')*y)*(x+(' + q + ')*y)', { vars: ['x', 'y'], mostrar: mostrar }),
      pistas: ['Funciona igual que x&sup2; + bx + c, pero el segundo termino de cada parentesis lleva y.',
        'Busca dos numeros con producto ' + c + ' y suma ' + b + ': son ' + p + ' y ' + q + '.'],
      solucion: ['Trato el trinomio como (x + ?y)(x + ?y)',
        'Necesito producto ' + c + ' y suma ' + b + ' &rArr; ' + p + ' y ' + q,
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  EJ.tema({
    id: 'trinomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Trinomios',
    descripcion: 'Factorizacion de x&sup2;+bx+c, de ax&sup2;+bx+c, trinomio cuadrado perfecto y completar el cuadrado.',
    formulario: 'x&sup2; + bx + c = (x + p)(x + q) con p + q = b y pq = c<br>' +
      'Cuadrado perfecto: a&sup2; &plusmn; 2ab + b&sup2; = (a &plusmn; b)&sup2;<br>' +
      'Completar el cuadrado: x&sup2; + bx + c = (x + b/2)&sup2; + (c &minus; b&sup2;/4)',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, p, q, a, b, c, pol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['factorizar', 'Factorizar x&sup2; + bx + c'],
          ['raices', 'Resolver igualando a cero']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        p = r.enteroNoCero(-9, 9); q = r.enteroNoCero(-9, 9);
        pol = P.multiplica([1, -p], [1, -q]);
        guiaDelPaso = EJ.guia.trinomioSimple(p, q);
        enun = 'Factoriza: ' + P.texto(pol);
        resp = R.factorizada('(x-(' + p + '))*(x-(' + q + '))', {
          mostrar: fac(1, -p) + fac(1, -q)
        });
        pistas = ['Busca dos numeros que multiplicados den ' + pol[2] + ' y sumados den ' + pol[1] + '.',
          'Esos numeros son ' + (-p) + ' y ' + (-q) + '.'];
        sol = ['Necesito dos numeros con producto ' + pol[2] + ' y suma ' + pol[1],
          'Son ' + (-p) + ' y ' + (-q) + ', porque (' + (-p) + ')(' + (-q) + ') = ' + pol[2] + ' y (' + (-p) + ') + (' + (-q) + ') = ' + pol[1],
          'Resultado: <b>' + fac(1, -p) + fac(1, -q) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['conCoef', 'Factorizar ax&sup2; + bx + c'],
          ['cuadradoPerfecto', 'Trinomio cuadrado perfecto'],
          ['identificar', 'Reconocer cuadrado perfecto'],
          ['raices', 'Resolver igualando a cero'],
          ['dosVariables', 'Trinomio con dos variables']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'conCoef') {
          var m = r.entero(2, 5), n = r.entero(1, 4);
          p = r.enteroNoCero(-6, 6); q = r.enteroNoCero(-6, 6);
          pol = P.multiplica([m, p], [n, q]);
          enun = 'Factoriza: ' + P.texto(pol);
          resp = R.factorizada('(' + m + '*x+(' + p + '))*(' + n + '*x+(' + q + '))', {
            mostrar: fac(m, p) + fac(n, q)
          });
          pistas = ['Como el coeficiente de x&sup2; no es 1, busca dos numeros cuyo producto sea a&middot;c = ' + (pol[0] * pol[2]) + ' y cuya suma sea b = ' + pol[1] + '.',
            'Esos numeros son ' + (m * q) + ' y ' + (n * p) + '; con ellos separas el termino de en medio y agrupas.'];
          sol = ['a&middot;c = ' + pol[0] + ' &middot; ' + pol[2] + ' = ' + (pol[0] * pol[2]) + ', y b = ' + pol[1],
            'Los numeros ' + (m * q) + ' y ' + (n * p) + ' cumplen producto ' + (pol[0] * pol[2]) + ' y suma ' + pol[1],
            'Separo: ' + F.term(pol[0], 'x', 2) + ' + ' + F.term(m * q, 'x', 1) + ' + ' + F.term(n * p, 'x', 1) + ' + (' + pol[2] + ') y agrupo',
            'Resultado: <b>' + fac(m, p) + fac(n, q) + '</b>'];
        } else if (t === 'cuadradoPerfecto') {
          c = r.elige([1, 1, 2, 3]); a = r.enteroNoCero(-8, 8);
          pol = P.potencia([c, a], 2);
          enun = 'Factoriza el trinomio cuadrado perfecto: ' + P.texto(pol);
          resp = R.factorizada('(' + c + '*x+(' + a + '))^2', { mostrar: fac(c, a) + '&sup2;' });
          pistas = ['Comprueba que el primero y el ultimo termino son cuadrados perfectos y que el de en medio es su doble producto.',
            '&radic;<span class="rad">' + pol[0] + 'x&sup2;</span> = ' + c + 'x y &radic;<span class="rad">' + pol[2] + '</span> = ' + Math.abs(a) + '.'];
          sol = ['Raiz del primer termino: ' + c + 'x; raiz del ultimo: ' + Math.abs(a),
            'Doble producto: 2(' + c + 'x)(' + a + ') = ' + pol[1] + 'x &check; coincide con el termino de en medio',
            'Resultado: <b>' + fac(c, a) + '&sup2;</b>'];
        } else {
          a = r.enteroNoCero(-7, 7);
          var perfecto = P.potencia([1, a], 2);
          var falso = [1, 2 * a, a * a + r.elige([1, -1, 2, -2, 3])];
          var esPerfecto = r.bool();
          pol = esPerfecto ? perfecto : falso;
          enun = '&iquest;Es ' + P.texto(pol) + ' un trinomio cuadrado perfecto?';
          resp = R.opcion(['Si, es cuadrado perfecto', 'No lo es'], esPerfecto ? 0 : 1);
          pistas = ['Revisa si el primero y el ultimo termino son cuadrados exactos.',
            'El ultimo termino deberia ser (' + pol[1] + '/2)&sup2; = ' + (pol[1] / 2) * (pol[1] / 2) + ' y aqui vale ' + pol[2] + '.'];
          sol = ['Para ser cuadrado perfecto debe cumplirse c = (b/2)&sup2;',
            '(b/2)&sup2; = (' + pol[1] + '/2)&sup2; = ' + (pol[1] / 2) * (pol[1] / 2) + ' y el trinomio tiene c = ' + pol[2],
            esPerfecto ? 'Coinciden, asi que <b>si</b> lo es: ' + fac(1, a) + '&sup2;' : 'No coinciden, asi que <b>no</b> es cuadrado perfecto'];
        }
      } else {
        var t2 = r.subtema([
          ['factorComun', 'Factor comun y trinomio'],
          ['bicuadratico', 'Trinomio bicuadratico'],
          ['completar', 'Completar el cuadrado'],
          ['dosVariables', 'Trinomio con dos variables']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'factorComun') {
          var k = r.elige([2, 3, 4, 5, -2, -3]);
          p = r.enteroNoCero(-7, 7); q = r.enteroNoCero(-7, 7);
          pol = P.escala(P.multiplica([1, -p], [1, -q]), k);
          enun = 'Factoriza completamente: ' + P.texto(pol);
          resp = R.factorizada('(' + k + ')*(x-(' + p + '))*(x-(' + q + '))', {
            mostrar: k + fac(1, -p) + fac(1, -q)
          });
          pistas = ['Primero saca el factor comun de los tres terminos.',
            'El factor comun es ' + k + '; queda ' + k + '(' + P.texto(P.escala(pol, 1 / k)) + ').'];
          sol = ['Factor comun: ' + k,
            pol.join(', ').length ? 'Queda ' + k + '(' + P.texto(P.escala(pol, 1 / k)) + ')' : '',
            'Factorizo el trinomio: dos numeros con producto ' + (p * q) + ' y suma ' + (p + q),
            'Resultado: <b>' + k + fac(1, -p) + fac(1, -q) + '</b>'];
        } else if (t2 === 'bicuadratico') {
          p = r.entero(1, 6); q = r.entero(1, 6);
          while (q === p) q = r.entero(1, 6);
          pol = [1, 0, -(p + q), 0, p * q];
          enun = 'Factoriza: ' + F.une([F.term(1, 'x', 4), F.term(-(p + q), 'x', 2), String(p * q)]);
          resp = R.factorizada('(x^2-' + p + ')*(x^2-' + q + ')', {
            mostrar: '(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')'
          });
          pistas = ['Haz el cambio u = x&sup2;: el trinomio se vuelve u&sup2; &minus; ' + (p + q) + 'u + ' + (p * q) + '.',
            'Ese trinomio en u se factoriza con los numeros ' + p + ' y ' + q + '; luego regresa u = x&sup2;.'];
          sol = ['Cambio u = x&sup2;: u&sup2; &minus; ' + (p + q) + 'u + ' + (p * q),
            'Factorizo: (u &minus; ' + p + ')(u &minus; ' + q + ')',
            'Regreso el cambio: <b>(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')</b>'];
        } else {
          b = r.elige([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10]);
          c = r.entero(-10, 12);
          var h = b / 2, kk = c - h * h;
          enun = 'Escribe ' + P.texto([1, b, c]) + ' en la forma (x + h)&sup2; + k.<br>Da los valores de h y de k.';
          resp = R.varios([
            { etiqueta: 'h', resp: R.numero(h, { dec: 3 }) },
            { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) }
          ]);
          pistas = ['h siempre es la mitad del coeficiente de x.',
            'h = ' + b + '/2 = ' + h + '. Ahora k = c &minus; h&sup2;.'];
          sol = ['h = b/2 = ' + b + '/2 = <b>' + h + '</b>',
            '(x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2; = x&sup2; + ' + b + 'x + ' + (h * h),
            'Para que quede ' + c + ' hay que sumar k = ' + c + ' &minus; ' + (h * h) + ' = <b>' + kk + '</b>',
            'Forma final: ' + P.texto([1, b, c]) + ' = (x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2; ' + (kk < 0 ? '&minus; ' + Math.abs(kk) : '+ ' + kk)];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
