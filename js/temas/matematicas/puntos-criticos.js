/* Puntos criticos de una funcion */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  /* Cubica m(x-p)(x-q) integrada: devuelve el polinomio f con f' = 3m(x-p)(x-q). */
  function cubicaCon(r, m) {
    var p = r.elige([-4, -3, -2, -1, 1, 2, 3, 4]);
    var opciones = [-4, -3, -2, -1, 1, 2, 3, 4].filter(function (v) {
      return v !== p && (v - p) % 2 === 0;
    });
    var q = r.elige(opciones);
    return {
      f: [m, -m * 3 * (p + q) / 2, m * 3 * p * q, r.entero(-6, 6)],
      lo: Math.min(p, q), hi: Math.max(p, q)
    };
  }

  var extra = {};

  extra.concavidad = function (r) {
    var p = [r.enteroNoCero(-3, 3), r.entero(-9, 9), r.entero(-6, 6), r.entero(-5, 5)];
    var d2 = P.derivada(P.derivada(p));
    var x0 = -d2[1] / d2[0];
    var arribaDespues = d2[0] > 0;
    return {
      enunciado: 'Para f(x) = ' + P.texto(p) + ':<br>' +
        'encuentra el valor de x donde cambia la concavidad y di como es la curva a la DERECHA de ese punto.',
      respuesta: R.varios([
        { etiqueta: 'x del cambio', resp: R.numero(x0, { dec: 4, tol: 0.01 }) },
        { etiqueta: 'A la derecha es', resp: R.opcion(['Concava hacia arriba', 'Concava hacia abajo'], arribaDespues ? 0 : 1) }
      ]),
      pistas: ['La concavidad la decide el signo de la segunda derivada.',
        'f&Prime;(x) = ' + P.texto(d2) + '. Donde vale 0 esta el cambio; despues de ahi su signo es el de ' + d2[0] + '.'],
      solucion: ['f&prime;(x) = ' + P.texto(P.derivada(p)),
        'f&Prime;(x) = ' + P.texto(d2),
        'f&Prime;(x) = 0 &rArr; x = <b>' + F.n(x0, 4) + '</b>',
        'Para x mayor que ese valor, f&Prime; es ' + (arribaDespues ? 'positiva &rArr; <b>concava hacia arriba</b>' : 'negativa &rArr; <b>concava hacia abajo</b>')]
    };
  };

  EJ.tema({
    id: 'puntos-criticos',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Puntos criticos de una funcion',
    descripcion: 'Encontrar y clasificar maximos, minimos y puntos de inflexion.',
    formulario: 'Puntos criticos: donde f&prime;(x) = 0 (o no existe).<br>' +
      'Criterio de la segunda derivada: f&Prime;(x) &gt; 0 &rArr; minimo; f&Prime;(x) &lt; 0 &rArr; maximo.<br>' +
      'Punto de inflexion: donde f&Prime;(x) = 0 y cambia de signo (cambia la concavidad).',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, p, d, d2, a, b, c, x0;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['cuadratica', 'Punto critico de una cuadratica'],
          ['cubica', 'Puntos criticos de una cubica']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'cuadratica') {
          a = r.enteroNoCero(-4, 4); b = r.entero(-12, 12); c = r.entero(-9, 9);
          x0 = -b / (2 * a);
          enun = 'Encuentra el punto critico de f(x) = ' + P.texto([a, b, c]) + '.<br>Da el valor de x.';
          resp = R.numero(x0, { dec: 4, tol: 0.01 });
          pistas = ['Deriva e iguala a cero.',
            'f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' = 0.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada([a, b, c])),
            'Igualo a cero: ' + (2 * a) + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = 0',
            'x = <b>' + F.n(x0, 4) + '</b>'];
        } else {
          var cb = cubicaCon(r, r.elige([1, 2]));
          p = cb.f; d = P.derivada(p);
          enun = 'Encuentra los puntos criticos de f(x) = ' + P.texto(p) + '.<br>Da los valores de x separados por coma.';
          resp = R.lista([cb.lo, cb.hi], { tol: 0.01 });
          pistas = ['Deriva e iguala a cero: te queda una ecuacion cuadratica.',
            'f&prime;(x) = ' + P.texto(d) + '. Factoriza para resolverla.'];
          sol = ['f&prime;(x) = ' + P.texto(d),
            'Resuelvo f&prime;(x) = 0',
            'Puntos criticos en x = <b>' + cb.lo + '</b> y x = <b>' + cb.hi + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['clasificaCuad', 'Clasificar en una cuadratica'],
          ['clasificaCubica', 'Clasificar en una cubica'],
          ['inflexion', 'Punto de inflexion'],
          ['concavidad', 'Concavidad']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'clasificaCuad') {
          a = r.enteroNoCero(-4, 4); b = r.entero(-12, 12); c = r.entero(-9, 9);
          x0 = -b / (2 * a);
          enun = 'Para f(x) = ' + P.texto([a, b, c] ) + ' encuentra el punto critico, el valor de la funcion ahi<br>' +
            'y clasificalo con el criterio de la segunda derivada.';
          resp = R.varios([
            { etiqueta: 'x critico', resp: R.numero(x0, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'f(x) ahi', resp: R.numero(P.evalua([a, b, c], x0), { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Tipo', resp: R.opcion(['Minimo', 'Maximo'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + '; igualala a cero.',
            'f&Prime;(x) = ' + (2 * a) + ', que es ' + (a > 0 ? 'positiva' : 'negativa') + ' siempre.'];
          sol = ['f&prime;(x) = 0 &rArr; x = <b>' + F.n(x0, 4) + '</b>',
            'f(' + F.n(x0, 4) + ') = <b>' + F.n(P.evalua([a, b, c], x0), 4) + '</b>',
            'f&Prime;(x) = ' + (2 * a) + ' ' + (a > 0 ? '&gt; 0 &rArr; es un <b>minimo</b>' : '&lt; 0 &rArr; es un <b>maximo</b>')];
        } else if (t === 'clasificaCubica') {
          var cb2 = cubicaCon(r, r.elige([1, 2, -1]));
          p = cb2.f; d = P.derivada(p); d2 = P.derivada(d);
          var positivo = p[0] > 0;
          enun = 'Para f(x) = ' + P.texto(p) + ':<br>encuentra los dos puntos criticos y clasifica el de la IZQUIERDA.';
          resp = R.varios([
            { etiqueta: 'x critico menor', resp: R.numero(cb2.lo, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'x critico mayor', resp: R.numero(cb2.hi, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'El de la izquierda es', resp: R.opcion(['Maximo local', 'Minimo local'], positivo ? 0 : 1) }
          ]);
          pistas = ['f&prime;(x) = ' + P.texto(d) + '. Resuelvela igualando a cero.',
            'Evalua f&Prime;(x) = ' + P.texto(d2) + ' en el punto critico menor: si sale negativa es maximo.'];
          sol = ['f&prime;(x) = ' + P.texto(d) + ' = 0 &rArr; x = ' + cb2.lo + ' y x = ' + cb2.hi,
            'f&Prime;(x) = ' + P.texto(d2),
            'f&Prime;(' + cb2.lo + ') = ' + F.n(P.evalua(d2, cb2.lo), 2) + ' ' + (P.evalua(d2, cb2.lo) < 0 ? '&lt; 0 &rArr; <b>maximo local</b>' : '&gt; 0 &rArr; <b>minimo local</b>')];
        } else {
          p = [r.enteroNoCero(-3, 3), r.entero(-9, 9), r.entero(-6, 6), r.entero(-5, 5)];
          d2 = P.derivada(P.derivada(p));
          x0 = -d2[1] / d2[0];
          enun = 'Encuentra el punto de inflexion de f(x) = ' + P.texto(p) + '.<br>Da el valor de x (4 decimales).';
          resp = R.numero(x0, { dec: 4, tol: 0.01 });
          pistas = ['El punto de inflexion esta donde f&Prime;(x) = 0.',
            'f&Prime;(x) = ' + P.texto(d2) + '.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada(p)),
            'f&Prime;(x) = ' + P.texto(d2),
            'f&Prime;(x) = 0 &rArr; x = <b>' + F.n(x0, 4) + '</b>',
            'Ahi la concavidad cambia de sentido'];
        }
      } else {
        var t2 = r.subtema([
          ['extremosIntervalo', 'Extremos absolutos en un intervalo'],
          ['analisisCompleto', 'Analisis completo'],
          ['optimizacion', 'Problema de optimizacion'],
          ['concavidad', 'Concavidad']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'extremosIntervalo') {
          var cb3 = cubicaCon(r, 1);
          p = cb3.f; d = P.derivada(p);
          a = cb3.lo - r.entero(1, 3); b = cb3.hi + r.entero(1, 3);
          var candidatos = [a, b, cb3.lo, cb3.hi];
          var valores = candidatos.map(function (x) { return P.evalua(p, x); });
          var maxV = Math.max.apply(null, valores), minV = Math.min.apply(null, valores);
          enun = 'Encuentra el maximo y el minimo ABSOLUTOS de f(x) = ' + P.texto(p) + '<br>' +
            'en el intervalo cerrado [' + a + ', ' + b + '].<br>Da los valores de f (no las x).';
          resp = R.varios([
            { etiqueta: 'Maximo absoluto', resp: R.numero(maxV, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Minimo absoluto', resp: R.numero(minV, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Hay que evaluar f en los puntos criticos Y en los extremos del intervalo.',
            'Puntos criticos: x = ' + cb3.lo + ' y x = ' + cb3.hi + '. Evalua tambien en ' + a + ' y ' + b + '.'];
          sol = ['f&prime;(x) = ' + P.texto(d) + ' = 0 &rArr; x = ' + cb3.lo + ', ' + cb3.hi,
            'Evaluo en los cuatro candidatos: ' + candidatos.map(function (x, i) { return 'f(' + x + ') = ' + F.n(valores[i], 2); }).join(', '),
            'Maximo absoluto: <b>' + F.n(maxV, 2) + '</b>',
            'Minimo absoluto: <b>' + F.n(minV, 2) + '</b>'];
        } else if (t2 === 'analisisCompleto') {
          var cb4 = cubicaCon(r, r.elige([1, 2]));
          p = cb4.f; d = P.derivada(p); d2 = P.derivada(d);
          var xinf = -d2[1] / d2[0];
          enun = 'Analiza f(x) = ' + P.texto(p) + ':<br>' +
            'da los dos puntos criticos, el punto de inflexion y el valor maximo local.';
          resp = R.varios([
            { etiqueta: 'x critico menor', resp: R.numero(cb4.lo, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'x critico mayor', resp: R.numero(cb4.hi, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'x de inflexion', resp: R.numero(xinf, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Valor maximo local', resp: R.numero(P.evalua(p, p[0] > 0 ? cb4.lo : cb4.hi), { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['Primera derivada para los criticos, segunda derivada para la inflexion.',
            'La inflexion siempre queda justo a la mitad de los dos puntos criticos en una cubica.'];
          sol = ['f&prime;(x) = ' + P.texto(d) + ' &rArr; criticos en <b>' + cb4.lo + '</b> y <b>' + cb4.hi + '</b>',
            'f&Prime;(x) = ' + P.texto(d2) + ' = 0 &rArr; inflexion en x = <b>' + F.n(xinf, 4) + '</b>',
            'Como a = ' + p[0] + ' ' + (p[0] > 0 ? '&gt; 0, el maximo local esta en el critico menor' : '&lt; 0, el maximo local esta en el critico mayor'),
            'Valor maximo local = <b>' + F.n(P.evalua(p, p[0] > 0 ? cb4.lo : cb4.hi), 2) + '</b>'];
        } else {
          var per = r.entero(10, 60) * 2;
          var ladoOpt = per / 4, areaOpt = ladoOpt * ladoOpt;
          enun = 'Con ' + per + ' m de malla se quiere cercar un terreno rectangular de area maxima.<br>' +
            'Encuentra las dimensiones del lado y el area maxima.';
          resp = R.varios([
            { etiqueta: 'Lado (m)', resp: R.numero(ladoOpt, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Area maxima (m&sup2;)', resp: R.numero(areaOpt, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['Si un lado mide x, el otro mide (' + per + ' &minus; 2x)/2. Escribe el area en funcion de x.',
            'A(x) = x(' + (per / 2) + ' &minus; x). Derivala e iguala a cero.'];
          sol = ['Perimetro: 2x + 2y = ' + per + ' &rArr; y = ' + (per / 2) + ' &minus; x',
            'A(x) = x(' + (per / 2) + ' &minus; x) = ' + (per / 2) + 'x &minus; x&sup2;',
            'A&prime;(x) = ' + (per / 2) + ' &minus; 2x = 0 &rArr; x = <b>' + F.n(ladoOpt, 2) + '</b>',
            'Es un cuadrado, y el area maxima es <b>' + F.n(areaOpt, 2) + ' m&sup2;</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
