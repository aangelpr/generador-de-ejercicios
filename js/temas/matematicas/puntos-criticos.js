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

  var G = EJ.guia.armar;

  var extra = {};

  extra.concavidad = function (r) {
    var p = [r.enteroNoCero(-3, 3), r.entero(-9, 9), r.entero(-6, 6), r.entero(-5, 5)];
    var d2 = P.derivada(P.derivada(p));
    var x0 = -d2[1] / d2[0];
    var arribaDespues = d2[0] > 0;
    return {
      guia: G({
        intro: 'De f(x) = ' + P.texto(p) + ' queremos donde cambia la <b>concavidad</b>.<br>' +
          'Concava hacia arriba es forma de taza; hacia abajo, forma de paraguas. Quien lo decide es el signo de la <b>segunda</b> derivada.',
        pasos: [
          { rotulo: 'Quien manda',
            pregunta: '&iquest;Que derivada decide la concavidad?',
            resp: R.opcion(['La segunda', 'La primera'], 0),
            pista: 'La primera dice si SUBE o BAJA. La segunda dice si la subida se acelera o se frena, y eso es la curvatura.',
            despues: 'f&Prime; &gt; 0: taza (hacia arriba). f&Prime; &lt; 0: paraguas (hacia abajo).' },
          { rotulo: 'Primera derivada',
            pregunta: 'Deriva una vez.',
            resp: R.expresion(P.expr(P.derivada(p)), { mostrar: P.texto(P.derivada(p)) }),
            pista: 'Regla de la potencia: queda ' + P.texto(P.derivada(p)) + '.',
            despues: '' },
          { rotulo: 'Segunda derivada',
            pregunta: 'Deriva otra vez.',
            resp: R.expresion(P.expr(d2), { mostrar: P.texto(d2) }),
            pista: 'Deriva el resultado anterior: ' + P.texto(d2) + '.',
            despues: 'Fijate que quedo una recta: cambia de signo una sola vez.' },
          { rotulo: 'x del cambio',
            pregunta: 'Iguala f&Prime;(x) = 0 y despeja x. (4 decimales)',
            resp: R.numero(x0, { dec: 4, tol: 0.01 }),
            pista: d2[0] + 'x ' + (d2[1] < 0 ? '&minus; ' + (-d2[1]) : '+ ' + d2[1]) + ' = 0.',
            despues: 'Ahi esta el punto de inflexion: el instante en que la curva deja de abrir hacia un lado y abre hacia el otro.' },
          { rotulo: 'A la derecha',
            pregunta: 'Para x mayor que ' + F.n(x0, 4) + ', &iquest;como es la curva?',
            resp: R.opcion(['Concava hacia arriba', 'Concava hacia abajo'], arribaDespues ? 0 : 1),
            pista: 'El coeficiente de f&Prime; es ' + d2[0] + '. A la derecha de la raiz, una recta toma el signo de su pendiente: ' +
              (arribaDespues ? 'positiva, asi que f&Prime; &gt; 0.' : 'negativa, asi que f&Prime; &lt; 0.'),
            despues: '' },
          { rotulo: 'Respuesta',
            pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'x del cambio', resp: R.numero(x0, { dec: 4, tol: 0.01 }) },
              { etiqueta: 'A la derecha es', resp: R.opcion(['Concava hacia arriba', 'Concava hacia abajo'], arribaDespues ? 0 : 1) }
            ]),
            pista: 'x = ' + F.n(x0, 4) + ' y a la derecha es concava hacia ' + (arribaDespues ? 'arriba' : 'abajo') + '.',
            despues: '' }
        ],
        final: 'Cambia en x = <b>' + F.n(x0, 4) + '</b>, y a la derecha es concava hacia <b>' + (arribaDespues ? 'arriba' : 'abajo') + '</b>',
        receta: ['La concavidad la decide f&Prime;',
          'f&Prime; &gt; 0: hacia arriba (taza). f&Prime; &lt; 0: hacia abajo (paraguas)',
          'Derivar dos veces e igualar a cero',
          'Ese punto es la inflexion',
          'El signo despues lo da el coeficiente principal de f&Prime;']
      }),
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
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
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
          guiaDelPaso = EJ.guia.puntoCriticoCuadratica(a, b, c);
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
          guiaDelPaso = G({
            intro: 'Buscamos los <b>puntos criticos</b> de f(x) = ' + P.texto(p) + '.<br>' +
              'Un punto critico es donde la curva se <b>aplana</b>: ni sube ni baja, asi que su pendiente vale 0.',
            pasos: [
              { rotulo: 'Que es un punto critico',
                pregunta: '&iquest;Donde estan los puntos criticos?',
                resp: R.opcion(['Donde f&prime;(x) = 0', 'Donde f(x) = 0'], 0),
                pista: 'Donde f(x) = 0 es donde la curva CRUZA el eje x, que es otra cosa. ' +
                  'Un punto critico es donde la curva se pone horizontal, o sea donde la PENDIENTE es 0.',
                despues: 'Y la pendiente es la derivada, asi que hay que derivar e igualar a cero.' },
              { rotulo: 'La derivada',
                pregunta: 'Deriva f(x).',
                resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
                pista: 'Regla de la potencia termino a termino: queda ' + P.texto(d) + '.',
                despues: 'Ahora hay que resolver ' + P.texto(d) + ' = 0, que es una cuadratica.' },
              { rotulo: 'Simplificar',
                pregunta: 'Antes de resolver, conviene simplificar.<br>&iquest;Entre que numero se pueden dividir los tres coeficientes?',
                resp: R.numero(d[0], { dec: 0 }),
                pista: 'Mira ' + d.join(', ') + ': los tres son multiplos de ' + d[0] + '.',
                despues: 'Queda x&sup2; ' + (-(cb.lo + cb.hi) < 0 ? '&minus; ' + (cb.lo + cb.hi) : '+ ' + (-(cb.lo + cb.hi))) + 'x ' +
                  (cb.lo * cb.hi < 0 ? '&minus; ' + (-(cb.lo * cb.hi)) : '+ ' + (cb.lo * cb.hi)) + ' = 0. Mucho mas manejable.' },
              { rotulo: 'Puntos criticos',
                pregunta: 'Resuelve esa cuadratica.<br>Escribe los dos valores separados por coma.',
                resp: R.lista([cb.lo, cb.hi], { tol: 0.01 }),
                pista: 'Dos numeros con producto ' + (cb.lo * cb.hi) + ' y suma ' + (cb.lo + cb.hi) + ': son ' + cb.lo + ' y ' + cb.hi + '.',
                despues: 'Una cubica tiene como mucho dos puntos criticos: uno donde deja de subir y otro donde vuelve a subir.' }
            ],
            final: 'Puntos criticos en x = <b>' + cb.lo + '</b> y x = <b>' + cb.hi + '</b>',
            receta: ['Punto critico = donde la pendiente vale 0 = f&prime;(x) = 0',
              'No confundir con f(x) = 0, que son los ceros',
              'Derivar e igualar a cero',
              'Simplificar dividiendo entre el factor comun antes de resolver',
              'Una cubica tiene como mucho dos']
          });
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
          guiaDelPaso = G({
            intro: 'De f(x) = ' + P.texto([a, b, c]) + ' queremos el punto critico y <b>de que tipo</b> es.<br>' +
              'Encontrarlo es facil; lo nuevo es clasificarlo con el <b>criterio de la segunda derivada</b>.',
            pasos: [
              { rotulo: 'x critico',
                pregunta: 'Deriva, iguala a cero y despeja x. (4 decimales)',
                resp: R.numero(x0, { dec: 4, tol: 0.01 }),
                pista: 'f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' = 0, asi que x = ' + (-b) + ' &divide; ' + (2 * a) + '.',
                despues: 'Ahi la curva esta horizontal, pero todavia no sabemos si es una cima o un valle.' },
              { rotulo: 'f(x) ahi',
                pregunta: 'Calcula la altura: sustituye en la funcion ORIGINAL. (4 decimales)',
                resp: R.numero(P.evalua([a, b, c], x0), { dec: 4, tol: 0.01 }),
                pista: 'Ojo: en f, no en f&prime;. En f&prime; daria 0 por definicion.',
                despues: '' },
              { rotulo: 'Segunda derivada',
                pregunta: 'Deriva otra vez. &iquest;Cuanto vale f&Prime;(x)?',
                resp: R.numero(2 * a, { dec: 0 }),
                pista: 'La derivada de ' + P.texto(P.derivada([a, b, c])) + ' es ' + (2 * a) + ', una constante.',
                despues: 'Al ser constante, su signo es el mismo en todas partes: la parabola no cambia de curvatura nunca.' },
              { rotulo: 'Tipo',
                pregunta: 'f&Prime; = ' + (2 * a) + ', que es ' + (a > 0 ? 'POSITIVA' : 'NEGATIVA') + '.<br>&iquest;Que tipo de punto es?',
                resp: R.opcion(['Minimo', 'Maximo'], a > 0 ? 0 : 1),
                pista: a > 0 ? 'f&Prime; &gt; 0 significa concava hacia arriba, forma de taza: el punto critico es el fondo, un MINIMO.'
                  : 'f&Prime; &lt; 0 significa concava hacia abajo, forma de paraguas: el punto critico es la cima, un MAXIMO.',
                despues: 'Truco para acordarse: f&Prime; positiva es una carita sonriente (minimo) y negativa una triste (maximo).' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'x critico', resp: R.numero(x0, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'f(x) ahi', resp: R.numero(P.evalua([a, b, c], x0), { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'Tipo', resp: R.opcion(['Minimo', 'Maximo'], a > 0 ? 0 : 1) }
                ]),
                pista: 'x = ' + F.n(x0, 4) + ', f(x) = ' + F.n(P.evalua([a, b, c], x0), 4) + ', y es un ' + (a > 0 ? 'minimo' : 'maximo') + '.',
                despues: '' }
            ],
            final: 'Critico en x = <b>' + F.n(x0, 4) + '</b>, con f(x) = <b>' + F.n(P.evalua([a, b, c], x0), 4) + '</b>: es un <b>' + (a > 0 ? 'minimo' : 'maximo') + '</b>',
            receta: ['f&prime;(x) = 0 da el punto critico',
              'Sustituir en f (no en f&prime;) para la altura',
              'f&Prime; &gt; 0: minimo (taza, carita feliz)',
              'f&Prime; &lt; 0: maximo (paraguas, carita triste)',
              'En una cuadratica basta con el signo de a']
          });
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
          guiaDelPaso = G({
            intro: 'De f(x) = ' + P.texto(p) + ' queremos los dos puntos criticos y clasificar el de la izquierda.<br>' +
              'En una cubica los dos criticos son <b>de distinto tipo</b>: uno es maximo local y el otro minimo local.',
            pasos: [
              { rotulo: 'Puntos criticos',
                pregunta: 'Deriva, iguala a cero y resuelve.<br>Escribe los dos valores separados por coma.',
                resp: R.lista([cb2.lo, cb2.hi], { tol: 0.01 }),
                pista: 'f&prime;(x) = ' + P.texto(d) + '. Dividiendo entre ' + d[0] + ' y resolviendo salen ' + cb2.lo + ' y ' + cb2.hi + '.',
                despues: 'Ahora hay que averiguar cual es cima y cual es valle.' },
              { rotulo: 'Segunda derivada',
                pregunta: 'Deriva otra vez para poder clasificar.<br>&iquest;Cuanto vale f&Prime;(x)?',
                resp: R.expresion(P.expr(d2), { mostrar: P.texto(d2) }),
                pista: 'Deriva ' + P.texto(d) + ': queda ' + P.texto(d2) + '.',
                despues: 'Aqui f&Prime; NO es constante: hay que evaluarla en cada punto por separado.' },
              { rotulo: 'f&Prime; en el menor',
                pregunta: 'Evalua f&Prime; en el critico de la izquierda, x = ' + cb2.lo + '. (2 decimales)',
                resp: R.numero(P.evalua(d2, cb2.lo), { dec: 2, tol: 0.01 }),
                pista: 'Sustituye ' + cb2.lo + ' en ' + P.texto(d2) + '.',
                despues: 'Salio ' + (P.evalua(d2, cb2.lo) < 0 ? 'NEGATIVA' : 'POSITIVA') + ', y eso ya lo decide todo.' },
              { rotulo: 'Clasificacion',
                pregunta: 'Con ese signo, &iquest;que es el punto de la izquierda?',
                resp: R.opcion(['Maximo local', 'Minimo local'], positivo ? 0 : 1),
                pista: P.evalua(d2, cb2.lo) < 0 ? 'f&Prime; &lt; 0: concava hacia abajo, forma de paraguas. Es una cima: MAXIMO local.'
                  : 'f&Prime; &gt; 0: concava hacia arriba, forma de taza. Es un valle: MINIMO local.',
                despues: 'Y el otro critico sera lo contrario: en una cubica siempre se alternan.' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'x critico menor', resp: R.numero(cb2.lo, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'x critico mayor', resp: R.numero(cb2.hi, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'El de la izquierda es', resp: R.opcion(['Maximo local', 'Minimo local'], positivo ? 0 : 1) }
                ]),
                pista: cb2.lo + ', ' + cb2.hi + ', y el de la izquierda es ' + (positivo ? 'maximo' : 'minimo') + ' local.',
                despues: '' }
            ],
            final: 'Criticos en <b>' + cb2.lo + '</b> y <b>' + cb2.hi + '</b>; el de la izquierda es un <b>' + (positivo ? 'maximo' : 'minimo') + ' local</b>',
            receta: ['f&prime; = 0 da los criticos',
              'f&Prime; evaluada en cada uno los clasifica',
              'f&Prime; &lt; 0: maximo. f&Prime; &gt; 0: minimo',
              'En una cubica f&Prime; no es constante: hay que evaluar en cada punto',
              'Los dos criticos de una cubica siempre son de tipo contrario']
          });
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
          guiaDelPaso = G({
            intro: 'Buscamos el <b>punto de inflexion</b> de f(x) = ' + P.texto(p) + '.<br>' +
              'No es un maximo ni un minimo: es donde la curva deja de abrir hacia un lado y empieza a abrir hacia el otro.',
            pasos: [
              { rotulo: 'Que es la inflexion',
                pregunta: '&iquest;Que caracteriza a un punto de inflexion?',
                resp: R.opcion(['Que ahi cambia la concavidad', 'Que ahi la funcion vale 0'], 0),
                pista: 'En un maximo la curva deja de subir. En una inflexion la curva puede seguir subiendo, ' +
                  'pero cambia de "taza" a "paraguas" o al reves.',
                despues: 'Como la concavidad la decide f&Prime;, hay que derivar DOS veces.' },
              { rotulo: 'Primera derivada',
                pregunta: 'Deriva una vez.',
                resp: R.expresion(P.expr(P.derivada(p)), { mostrar: P.texto(P.derivada(p)) }),
                pista: 'Termino a termino: ' + P.texto(P.derivada(p)) + '.',
                despues: '' },
              { rotulo: 'Segunda derivada',
                pregunta: 'Deriva otra vez.',
                resp: R.expresion(P.expr(d2), { mostrar: P.texto(d2) }),
                pista: 'Deriva el resultado anterior: ' + P.texto(d2) + '.',
                despues: 'Quedo una recta, asi que cruza el cero una sola vez: hay un unico punto de inflexion.' },
              { rotulo: 'Punto de inflexion',
                pregunta: 'Iguala f&Prime;(x) = 0 y despeja x. (4 decimales)',
                resp: R.numero(x0, { dec: 4, tol: 0.01 }),
                pista: d2[0] + 'x ' + (d2[1] < 0 ? '&minus; ' + (-d2[1]) : '+ ' + d2[1]) + ' = 0.',
                despues: 'Dato curioso de las cubicas: la inflexion siempre cae justo a la mitad de los dos puntos criticos.' }
            ],
            final: 'Punto de inflexion en x = <b>' + F.n(x0, 4) + '</b>',
            receta: ['Inflexion = donde cambia la concavidad',
              'La concavidad la decide f&Prime;',
              'Derivar dos veces e igualar a cero',
              'No confundir con maximo o minimo (esos son f&prime; = 0)',
              'En una cubica queda a la mitad de los dos criticos']
          });
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
          guiaDelPaso = G({
            intro: 'Queremos el maximo y el minimo <b>absolutos</b> de f en el intervalo cerrado [' + a + ', ' + b + '].<br>' +
              'Absoluto significa el mas alto y el mas bajo de TODO el intervalo, y ahi hay una trampa clasica.',
            pasos: [
              { rotulo: 'Donde buscar',
                pregunta: '&iquest;Basta con mirar los puntos criticos?',
                resp: R.opcion(['No: tambien hay que evaluar en los DOS extremos del intervalo',
                  'Si, el maximo absoluto siempre es un punto critico'], 0),
                pista: 'Imagina una recta que sube: no tiene ningun punto critico, pero en un intervalo cerrado si tiene ' +
                  'un maximo y un minimo, y estan en las puntas.',
                despues: 'Por eso se evalua en los criticos Y en las dos orillas.' },
              { rotulo: 'Puntos criticos',
                pregunta: 'Deriva, iguala a cero y resuelve.<br>Escribe los dos valores separados por coma.',
                resp: R.lista([cb3.lo, cb3.hi], { tol: 0.01 }),
                pista: 'f&prime;(x) = ' + P.texto(d) + ', y sus raices son ' + cb3.lo + ' y ' + cb3.hi + '.',
                despues: 'Los dos caen dentro de [' + a + ', ' + b + '], asi que los dos cuentan.' },
              { rotulo: 'Cuantos candidatos',
                pregunta: '&iquest;Cuantos valores hay que evaluar en total?',
                resp: R.numero(4, { dec: 0 }),
                pista: 'Los 2 criticos mas los 2 extremos del intervalo: ' + candidatos.join(', ') + '.',
                despues: 'Se evalua f en los cuatro y se comparan las alturas. El mayor gana y el menor pierde.' },
              { rotulo: 'Maximo absoluto',
                pregunta: 'Evalua f en los cuatro y quedate con el mayor. (2 decimales)',
                resp: R.numero(maxV, { dec: 2, tol: 0.01 }),
                pista: candidatos.map(function (x, i) { return 'f(' + x + ') = ' + F.n(valores[i], 2); }).join(', ') + '.',
                despues: '' },
              { rotulo: 'Minimo absoluto',
                pregunta: '&iquest;Y el menor de los cuatro? (2 decimales)',
                resp: R.numero(minV, { dec: 2, tol: 0.01 }),
                pista: 'De la misma lista, el mas pequeno.',
                despues: 'Ojo: se piden los VALORES de f, no las x donde ocurren.' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe los dos valores.',
                resp: R.varios([
                  { etiqueta: 'Maximo absoluto', resp: R.numero(maxV, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Minimo absoluto', resp: R.numero(minV, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'Maximo ' + F.n(maxV, 2) + ' y minimo ' + F.n(minV, 2) + '.',
                despues: '' }
            ],
            final: 'Maximo absoluto <b>' + F.n(maxV, 2) + '</b> y minimo absoluto <b>' + F.n(minV, 2) + '</b>',
            receta: ['En un intervalo cerrado siempre hay maximo y minimo absolutos',
              'Candidatos: los puntos criticos Y los dos extremos',
              'Evaluar f en todos y comparar',
              'Descartar los criticos que caigan fuera del intervalo',
              'Se piden los VALORES de f, no las x']
          });
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
          var xMax = p[0] > 0 ? cb4.lo : cb4.hi;
          guiaDelPaso = G({
            intro: 'Analisis completo de f(x) = ' + P.texto(p) + '.<br>' +
              'Hay que juntar las dos derivadas: la <b>primera</b> para los puntos criticos y la <b>segunda</b> para la inflexion.',
            pasos: [
              { rotulo: 'Puntos criticos',
                pregunta: 'Empieza con f&prime;(x) = 0.<br>Escribe los dos puntos criticos separados por coma.',
                resp: R.lista([cb4.lo, cb4.hi], { tol: 0.01 }),
                pista: 'f&prime;(x) = ' + P.texto(d) + '. Dividiendo entre ' + d[0] + ' salen ' + cb4.lo + ' y ' + cb4.hi + '.',
                despues: 'Entre esos dos valores la funcion hace lo contrario que fuera de ellos.' },
              { rotulo: 'Inflexion',
                pregunta: 'Ahora f&Prime;(x) = 0 para la inflexion. (4 decimales)',
                resp: R.numero(xinf, { dec: 4, tol: 0.01 }),
                pista: 'f&Prime;(x) = ' + P.texto(d2) + '. Tambien sale como el promedio de ' + cb4.lo + ' y ' + cb4.hi + '.',
                despues: 'En una cubica la inflexion SIEMPRE cae a la mitad de los dos criticos. Sirve de comprobacion.' },
              { rotulo: 'Donde esta el maximo',
                pregunta: 'El coeficiente principal es ' + p[0] + '.<br>&iquest;En cual de los dos criticos esta el maximo local?',
                resp: R.opcion(['En el critico menor (' + cb4.lo + ')', 'En el critico mayor (' + cb4.hi + ')'], p[0] > 0 ? 0 : 1),
                pista: p[0] > 0 ? 'Con a &gt; 0 la cubica viene subiendo desde abajo: primero hace una cima (maximo) y luego un valle.'
                  : 'Con a &lt; 0 la cubica viene bajando: primero hace un valle y luego una cima.',
                despues: 'El signo del coeficiente principal decide el orden de la cima y el valle.' },
              { rotulo: 'Valor maximo local',
                pregunta: 'Evalua f en x = ' + xMax + '. (2 decimales)',
                resp: R.numero(P.evalua(p, xMax), { dec: 2, tol: 0.02 }),
                pista: 'Sustituye ' + xMax + ' en la funcion ORIGINAL ' + P.texto(p) + '.',
                despues: 'Se llama maximo LOCAL porque es el mas alto de su zona, pero la cubica sigue creciendo mas alla.' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe las cuatro respuestas.',
                resp: R.varios([
                  { etiqueta: 'x critico menor', resp: R.numero(cb4.lo, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'x critico mayor', resp: R.numero(cb4.hi, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'x de inflexion', resp: R.numero(xinf, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'Valor maximo local', resp: R.numero(P.evalua(p, xMax), { dec: 2, tol: 0.02 }) }
                ]),
                pista: cb4.lo + ', ' + cb4.hi + ', ' + F.n(xinf, 4) + ' y ' + F.n(P.evalua(p, xMax), 2) + '.',
                despues: '' }
            ],
            final: 'Criticos <b>' + cb4.lo + '</b> y <b>' + cb4.hi + '</b>, inflexion en <b>' + F.n(xinf, 4) +
              '</b>, maximo local <b>' + F.n(P.evalua(p, xMax), 2) + '</b>',
            receta: ['f&prime; = 0 para los puntos criticos',
              'f&Prime; = 0 para la inflexion',
              'La inflexion queda a la mitad de los dos criticos',
              'a &gt; 0: primero maximo y luego minimo. a &lt; 0: al reves',
              'Local significa "el mas alto de su zona", no de toda la funcion']
          });
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
          guiaDelPaso = G({
            intro: 'Con <b>' + per + ' m</b> de malla, &iquest;que rectangulo encierra mas area?<br>' +
              'Los problemas de optimizacion tienen siempre la misma estructura: una <b>restriccion</b> (la malla que hay) ' +
              'y algo que <b>maximizar</b> (el area). El truco es dejar todo en funcion de UNA sola variable.',
            pasos: [
              { rotulo: 'La restriccion',
                pregunta: 'El perimetro es 2x + 2y = ' + per + '.<br>Si un lado mide x, &iquest;cuanto mide el otro?',
                resp: R.opcion([(per / 2) + ' &minus; x', per + ' &minus; x'], 0),
                pista: 'Despeja y: 2y = ' + per + ' &minus; 2x, y dividiendo entre 2 queda y = ' + (per / 2) + ' &minus; x.',
                despues: 'Este es el paso clave: usar la restriccion para quitarse una variable de encima.' },
              { rotulo: 'La funcion a maximizar',
                pregunta: 'El area es x &middot; y = x(' + (per / 2) + ' &minus; x).<br>Desarrollala.',
                resp: R.expresion('-x^2+' + (per / 2) + '*x', { mostrar: '&minus;x&sup2; + ' + (per / 2) + 'x' }),
                pista: 'Distribuye la x: queda ' + (per / 2) + 'x &minus; x&sup2;.',
                despues: 'Ya es una cuadratica con una sola variable, y abre hacia abajo: tiene un maximo.' },
              { rotulo: 'Derivar e igualar',
                pregunta: 'Deriva A(x), iguala a cero y despeja x. (2 decimales)',
                resp: R.numero(ladoOpt, { dec: 2, tol: 0.01 }),
                pista: 'A&prime;(x) = ' + (per / 2) + ' &minus; 2x = 0, asi que x = ' + (per / 2) + ' &divide; 2.',
                despues: 'Con x = ' + F.n(ladoOpt, 2) + ', el otro lado tambien mide ' + F.n(ladoOpt, 2) + ': sale un CUADRADO.' },
              { rotulo: 'Area maxima',
                pregunta: 'Calcula el area con ese lado. (2 decimales)',
                resp: R.numero(areaOpt, { dec: 2, tol: 0.05 }),
                pista: F.n(ladoOpt, 2) + ' &times; ' + F.n(ladoOpt, 2) + '.',
                despues: 'Resultado general que vale la pena recordar: con un perimetro fijo, el rectangulo de mayor area es siempre el cuadrado.' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe el lado y el area.',
                resp: R.varios([
                  { etiqueta: 'Lado (m)', resp: R.numero(ladoOpt, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Area maxima (m&sup2;)', resp: R.numero(areaOpt, { dec: 2, tol: 0.05 }) }
                ]),
                pista: 'Lado ' + F.n(ladoOpt, 2) + ' m y area ' + F.n(areaOpt, 2) + ' m&sup2;.',
                despues: '' }
            ],
            final: 'Lado <b>' + F.n(ladoOpt, 2) + ' m</b> y area maxima <b>' + F.n(areaOpt, 2) + ' m&sup2;</b>',
            receta: ['Identificar la restriccion y lo que se quiere maximizar',
              'Usar la restriccion para dejar todo en UNA variable',
              'Derivar, igualar a cero y despejar',
              'Comprobar que el resultado tenga sentido fisico',
              'Con perimetro fijo, el cuadrado siempre da el area maxima']
          });
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

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
