/* Elementos de una funcion: dominio, rango, crecimiento y decrecimiento */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var extra = {};

  extra.intersecciones = function (r) {
    var m = r.enteroNoCero(-6, 6), b = r.enteroNoCero(-12, 12);
    return {
      enunciado: 'La recta f(x) = ' + P.texto([m, b]) + ' corta a los dos ejes.<br>' +
        'Encuentra la interseccion con el eje x y con el eje y (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Corte con eje x', resp: R.numero(-b / m, { dec: 4, tol: 0.01 }) },
        { etiqueta: 'Corte con eje y', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
      ]),
      pistas: ['Para el corte con el eje x se hace f(x) = 0; para el corte con el eje y se hace x = 0.',
        '0 = ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' &rArr; x = ' + F.n(-b / m, 4) + '.'],
      solucion: ['Eje x: ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = 0 &rArr; x = <b>' + F.n(-b / m, 4) + '</b>',
        'Eje y: f(0) = <b>' + b + '</b>',
        'Los puntos son (' + F.n(-b / m, 4) + ', 0) y (0, ' + b + ')']
    };
  };

  extra.porTramos = function (r) {
    var corte = r.enteroNoCero(-4, 4);
    var m1 = r.enteroNoCero(-4, 4), b1 = r.entero(-6, 6);
    var a2 = r.enteroNoCero(-3, 3), b2 = r.entero(-6, 6);
    var x1 = corte - r.entero(1, 4);
    var x2 = corte + r.entero(1, 4);
    var v1 = m1 * x1 + b1;
    var v2 = a2 * x2 * x2 + b2;
    var vCorte = a2 * corte * corte + b2;
    return {
      enunciado: 'Sea la funcion por tramos:<br>' +
        '<span class="big">f(x) = ' + P.texto([m1, b1]) + ' &nbsp; si x &lt; ' + corte + '<br>' +
        'f(x) = ' + F.une([F.term(a2, 'x', 2), String(b2)]) + ' &nbsp; si x &ge; ' + corte + '</span><br>' +
        'Calcula f(' + x1 + '), f(' + corte + ') y f(' + x2 + ').',
      respuesta: R.varios([
        { etiqueta: 'f(' + x1 + ')', resp: R.numero(v1, { dec: 2 }) },
        { etiqueta: 'f(' + corte + ')', resp: R.numero(vCorte, { dec: 2 }) },
        { etiqueta: 'f(' + x2 + ')', resp: R.numero(v2, { dec: 2 }) }
      ]),
      pistas: ['Para cada valor de x primero decide QUE regla le toca.',
        'Ojo con x = ' + corte + ': la condicion dice x &ge; ' + corte + ', asi que usa la segunda regla.'],
      solucion: ['x = ' + x1 + ' es menor que ' + corte + ' &rArr; primera regla: f(' + x1 + ') = <b>' + v1 + '</b>',
        'x = ' + corte + ' cumple x &ge; ' + corte + ' &rArr; segunda regla: f(' + corte + ') = <b>' + vCorte + '</b>',
        'x = ' + x2 + ' &rArr; segunda regla: f(' + x2 + ') = <b>' + v2 + '</b>']
    };
  };

  EJ.tema({
    id: 'elementos-funcion',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Elementos de funcion, crecientes y decrecientes',
    descripcion: 'Dominio, rango, vertice, ceros e intervalos donde la funcion crece o decrece.',
    formulario: 'Dominio: valores de x permitidos (no dividir entre 0, no raiz par de negativo).<br>' +
      'Rango: valores que alcanza f(x).<br>' +
      'Parabola y = ax&sup2; + bx + c: vertice en x = &minus;b/2a; si a &gt; 0 decrece antes del vertice y crece despues.<br>' +
      'En general: f crece donde f&prime;(x) &gt; 0 y decrece donde f&prime;(x) &lt; 0.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, h, k;

      if (dif === 'facil') {
        var t = r.subtema([
          ['dominioRacional', 'Dominio de una racional'],
          ['evaluar', 'Evaluar la funcion'],
          ['ceros', 'Ceros o raices'],
          ['intersecciones', 'Cortes con los ejes']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'dominioRacional') {
          a = r.enteroNoCero(-9, 9);
          enun = 'Para la funcion f(x) = ' + F.frac(1, 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a))) + ':<br>' +
            '&iquest;Que valor de x hay que excluir del dominio?';
          resp = R.numero(a, { dec: 2 });
          pistas = ['El dominio excluye lo que hace CERO al denominador.',
            'Resuelve x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0.'];
          sol = ['El denominador no puede valer 0',
            'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0 &rArr; x = <b>' + a + '</b>',
            'Dominio: todos los reales excepto ' + a];
        } else if (t === 'evaluar') {
          var pol = [r.enteroNoCero(-4, 4), r.entero(-6, 6), r.entero(-8, 8)];
          var x0 = r.enteroNoCero(-5, 5);
          enun = 'Si f(x) = ' + P.texto(pol) + ', calcula f(' + x0 + ').';
          resp = R.numero(P.evalua(pol, x0), { dec: 2 });
          pistas = ['Sustituye x por ' + x0 + ' en toda la expresion.',
            '(' + x0 + ')&sup2; = ' + (x0 * x0) + '.'];
          sol = ['f(' + x0 + ') = ' + pol[0] + '(' + x0 + ')&sup2; + (' + pol[1] + ')(' + x0 + ') + (' + pol[2] + ')',
            '= ' + (pol[0] * x0 * x0) + ' + (' + (pol[1] * x0) + ') + (' + pol[2] + ')',
            'f(' + x0 + ') = <b>' + P.evalua(pol, x0) + '</b>'];
        } else {
          var r1 = r.enteroNoCero(-8, 8), r2 = r.enteroNoCero(-8, 8);
          while (r2 === r1) r2 = r.enteroNoCero(-8, 8);
          var q = P.deRaices([r1, r2]);
          enun = 'Encuentra los ceros (raices) de f(x) = ' + P.texto(q) + '.';
          resp = R.lista([r1, r2], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Los ceros son los valores de x donde f(x) = 0: factoriza.',
            'Busca dos numeros que multiplicados den ' + q[2] + ' y sumados den ' + q[1] + '.'];
          sol = ['Igualo a cero: ' + P.texto(q) + ' = 0',
            'Factorizo: (x ' + (r1 < 0 ? '+ ' + (-r1) : '&minus; ' + r1) + ')(x ' + (r2 < 0 ? '+ ' + (-r2) : '&minus; ' + r2) + ') = 0',
            'Ceros: <b>x = ' + r1 + '</b> y <b>x = ' + r2 + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['vertice', 'Vertice y crecimiento'],
          ['rangoCuad', 'Rango de una cuadratica'],
          ['dominioRaiz', 'Dominio con raiz cuadrada'],
          ['porTramos', 'Funcion por tramos'],
          ['intersecciones', 'Cortes con los ejes']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        a = r.enteroNoCero(-4, 4); b = r.entero(-10, 10); c = r.entero(-8, 8);
        h = -b / (2 * a); k = P.evalua([a, b, c], h);
        if (t2 === 'vertice') {
          guiaDelPaso = EJ.guia.verticeParabola(a, b, c);
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ':<br>' +
            'encuentra el vertice y di si la funcion crece o decrece a la derecha del vertice.';
          resp = R.varios([
            { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'A la derecha del vertice', resp: R.opcion(['Crece', 'Decrece'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['La x del vertice es &minus;b/2a; la y se obtiene sustituyendo.',
            'x = &minus;(' + b + ')/(2&middot;' + a + ') = ' + F.n(h, 4) + '. Como a ' + (a > 0 ? '&gt;' : '&lt;') + ' 0, la parabola abre hacia ' + (a > 0 ? 'arriba' : 'abajo') + '.'];
          sol = ['x = &minus;b/2a = &minus;(' + b + ')/(2&middot;' + a + ') = <b>' + F.n(h, 4) + '</b>',
            'y = f(' + F.n(h, 4) + ') = <b>' + F.n(k, 4) + '</b>',
            'a = ' + a + ' ' + (a > 0 ? '&gt; 0 &rArr; abre hacia arriba: el vertice es minimo y a su derecha <b>crece</b>' : '&lt; 0 &rArr; abre hacia abajo: el vertice es maximo y a su derecha <b>decrece</b>')];
        } else if (t2 === 'rangoCuad') {
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ':<br>' +
            '&iquest;cual es el valor extremo de la funcion y de que tipo es?';
          resp = R.varios([
            { etiqueta: 'Valor extremo (y)', resp: R.numero(k, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Tipo', resp: R.opcion(['Minimo (rango [y, &infin;))', 'Maximo (rango (&minus;&infin;, y])'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['El valor extremo de una parabola esta en su vertice.',
            'x del vertice = ' + F.n(h, 4) + '; sustituye para obtener y.'];
          sol = ['x del vertice = &minus;b/2a = ' + F.n(h, 4),
            'y = f(' + F.n(h, 4) + ') = <b>' + F.n(k, 4) + '</b>',
            'Como a ' + (a > 0 ? '&gt; 0, es un <b>minimo</b> y el rango es [' + F.n(k, 4) + ', &infin;)' : '&lt; 0, es un <b>maximo</b> y el rango es (&minus;&infin;, ' + F.n(k, 4) + ']')];
        } else {
          a = r.elige([1, 2, 3, -1, -2]); b = r.entero(-9, 9);
          var limite = -b / a;
          enun = 'Encuentra el dominio de f(x) = &radic;<span class="rad">' + F.poli([a, b], 'x') + '</span>.<br>' +
            'Da el valor frontera de x y el sentido de la desigualdad.';
          resp = R.varios([
            { etiqueta: 'Valor frontera', resp: R.numero(limite, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'El dominio es', resp: R.opcion(['x &ge; ese valor', 'x &le; ese valor'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['Dentro de una raiz cuadrada no puede haber numeros negativos: plantea ' + F.poli([a, b], 'x') + ' &ge; 0.',
            'Al despejar recuerda que si divides entre un numero negativo la desigualdad se voltea.'];
          sol = [F.poli([a, b], 'x') + ' &ge; 0',
            a + 'x &ge; ' + (-b) + ' &rArr; x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4),
            'Dominio: <b>x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cubica', 'Cambios de sentido en una cubica'],
          ['racional', 'Dominio de una racional'],
          ['crecimientoCuad', 'Crecimiento y valor extremo'],
          ['porTramos', 'Funcion por tramos']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cubica') {
          var m = r.entero(1, 3);
          /* f'(x) = 3m(x - p1)(x - p2). Para que los coeficientes salgan enteros,
             p1 y p2 deben tener la misma paridad. */
          var p1 = r.elige([-4, -3, -2, -1, 1, 2, 3, 4]);
          var mismos = [-4, -3, -2, -1, 1, 2, 3, 4].filter(function (v) {
            return v !== p1 && (v - p1) % 2 === 0;
          });
          var p2 = r.elige(mismos);
          var lo = Math.min(p1, p2), hi = Math.max(p1, p2);
          var f = [m, -m * 3 * (p1 + p2) / 2, m * 3 * p1 * p2, r.entero(-5, 5)];
          enun = 'La funcion f(x) = ' + P.texto(f) + ' crece, luego decrece y luego vuelve a crecer.<br>' +
            'Encuentra los dos valores de x donde cambia de sentido.';
          resp = R.lista([lo, hi], { tol: 0.01, ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Los cambios de sentido ocurren donde f&prime;(x) = 0.',
            'f&prime;(x) = ' + P.texto(P.derivada(f)) + '. Igualala a cero y resuelve.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada(f)),
            'Igualo a cero y resuelvo la cuadratica',
            'x = <b>' + lo + '</b> y x = <b>' + hi + '</b>',
            'La funcion crece en (&minus;&infin;, ' + lo + '), decrece en (' + lo + ', ' + hi + ') y crece en (' + hi + ', &infin;)'];
        } else if (t3 === 'racional') {
          a = r.enteroNoCero(-6, 6); b = r.enteroNoCero(-6, 6);
          while (b === a) b = r.enteroNoCero(-6, 6);
          enun = 'Encuentra el dominio de f(x) = ' + F.frac('x + ' + r.entero(1, 9), P.texto(P.deRaices([a, b]))) + '.<br>' +
            'Da los dos valores que hay que excluir.';
          resp = R.lista([a, b], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Hay que excluir las raices del denominador.',
            'Factoriza ' + P.texto(P.deRaices([a, b])) + ' e iguala cada factor a cero.'];
          sol = ['Denominador: ' + P.texto(P.deRaices([a, b])) + ' = (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ')',
            'Se anula en x = ' + a + ' y x = ' + b,
            'Dominio: todos los reales excepto <b>' + a + '</b> y <b>' + b + '</b>'];
        } else {
          a = r.enteroNoCero(-3, 3); b = r.entero(-12, 12); c = r.entero(-9, 9);
          h = -b / (2 * a);
          var cero1 = null;
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ' indica:<br>' +
            'el valor de x donde cambia de crecer a decrecer (o al reves), en que intervalo CRECE y el valor extremo.';
          resp = R.varios([
            { etiqueta: 'x del cambio', resp: R.numero(h, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Crece en', resp: R.opcion(['(&minus;&infin;, x)', '(x, &infin;)'], a > 0 ? 1 : 0) },
            { etiqueta: 'Valor extremo f(x)', resp: R.numero(P.evalua([a, b, c], h), { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['Deriva: f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' y encuentra donde vale cero.',
            'f&prime;(x) = 0 en x = ' + F.n(h, 4) + '. El signo de a dice hacia donde abre.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' = 0 &rArr; x = <b>' + F.n(h, 4) + '</b>',
            'Como a = ' + a + ' ' + (a > 0 ? '&gt; 0, f decrece antes y <b>crece despues</b>' : '&lt; 0, f crece antes y decrece despues'),
            'Valor extremo: f(' + F.n(h, 4) + ') = <b>' + F.n(P.evalua([a, b, c], h), 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
