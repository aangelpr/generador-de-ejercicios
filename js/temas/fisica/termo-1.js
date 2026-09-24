/* Primera ley de la termodinamica: dU = Q - W. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  /* Criterio usado (el mas comun en bachillerato):
       Q > 0 el sistema ABSORBE calor
       W > 0 el sistema HACE trabajo (se expande)
       dU = Q - W                                          */

  var extra = {};

  /* ---------------- calcular la variacion de energia interna ---------------- */
  extra.variacion = function (r) {
    var Q = r.elige([100, 150, 200, 250, 300, 400, 500]) * r.elige([1, -1]);
    var W = r.elige([50, 80, 100, 120, 150, 200]) * r.elige([1, -1]);
    var dU = Q - W;
    return {
      guia: G({
        intro: 'Un gas <b>' + (Q > 0 ? 'absorbe' : 'cede') + ' ' + Math.abs(Q) + ' J</b> de calor y ' +
          '<b>' + (W > 0 ? 'realiza' : 'recibe') + ' ' + Math.abs(W) + ' J</b> de trabajo.<br>' +
          'La primera ley es la conservacion de la energia aplicada al calor: <b>&Delta;U = Q &minus; W</b>. ' +
          'Lo unico dificil son los <b>signos</b>.',
        pasos: [
          {
            seccion: 'Paso 1: el signo del calor',
            queHacemos: 'Decidimos que signo lleva Q.',
            paraQue: 'Q es positivo cuando el sistema ABSORBE calor (le entra energia) y negativo cuando lo cede. Aqui ' + (Q > 0 ? 'absorbe' : 'cede') + '.',
            queda: 'Q = ' + Q + ' J',
            pregunta: 'El gas ' + (Q > 0 ? 'absorbe' : 'cede') + ' ' + Math.abs(Q) + ' J. &iquest;Que signo lleva Q?',
            resp: R.numero(Q, { dec: 0, tol: 0.5, unidad: 'J' }),
            pista: Q > 0 ? 'Absorber es recibir energia: positivo.' : 'Ceder es entregar energia: negativo.',
            despues: ''
          },
          {
            seccion: 'Paso 2: el signo del trabajo',
            queHacemos: 'Ahora el signo de W.',
            paraQue: 'W es positivo cuando el sistema HACE trabajo, o sea cuando se expande y empuja hacia fuera. Ahi gasta energia, y por eso va restando.',
            queda: 'Q = ' + Q + ',  W = ' + W,
            pregunta: 'El gas ' + (W > 0 ? 'realiza' : 'recibe') + ' ' + Math.abs(W) + ' J de trabajo. &iquest;Que signo lleva W?',
            resp: R.numero(W, { dec: 0, tol: 0.5, unidad: 'J' }),
            pista: W > 0 ? 'Si el gas hace el trabajo, W es positivo.' : 'Si se lo hacen a el (lo comprimen), W es negativo.',
            despues: 'Fijate que en la formula W va RESTANDO.'
          },
          {
            seccion: 'Paso 3: aplicar la formula',
            queHacemos: 'Calculamos Q menos W.',
            paraQue: 'La energia interna sube con el calor que entra y baja con el trabajo que el gas gasta empujando.',
            queda: '&Delta;U = ' + dU + ' J',
            pregunta: 'Calcula ' + Q + ' &minus; (' + W + ') (0 decimales)',
            resp: R.numero(dU, { dec: 0, tol: 0.5, unidad: 'J' }),
            pista: 'Cuidado: restar un negativo es sumar.',
            despues: ''
          },
          {
            seccion: 'Paso 4: leer el resultado',
            queHacemos: 'Interpretamos el signo de &Delta;U.',
            paraQue: 'La energia interna esta ligada a la temperatura: si &Delta;U sube, el gas se calienta; si baja, se enfria.',
            queda: '&Delta;U = ' + dU + ' J:  ' + (dU > 0 ? 'se calienta' : dU < 0 ? 'se enfria' : 'no cambia de temperatura'),
            pregunta: 'Con &Delta;U = ' + dU + ' J, &iquest;que le pasa al gas?',
            resp: R.opcion(dU > 0
              ? ['Su energia interna aumenta: se calienta', 'Su energia interna baja: se enfria']
              : dU < 0
                ? ['Su energia interna baja: se enfria', 'Su energia interna aumenta: se calienta']
                : ['No cambia su energia interna', 'Su energia interna aumenta'], 0),
            pista: 'El signo de &Delta;U dice si gano o perdio energia interna.',
            despues: ''
          }
        ],
        final: '&Delta;U = <b>' + dU + ' J</b>',
        receta: ['&Delta;U = Q &minus; W',
          'Q positivo: el sistema absorbe calor',
          'W positivo: el sistema hace trabajo (se expande)',
          'El trabajo va RESTANDO: el gas gasta energia al empujar',
          'El signo de &Delta;U dice si se calienta o se enfria']
      }),
      enunciado: 'Un gas ' + (Q > 0 ? 'absorbe' : 'cede') + ' ' + Math.abs(Q) + ' J de calor y ' +
        (W > 0 ? 'realiza' : 'recibe') + ' ' + Math.abs(W) + ' J de trabajo.<br>' +
        '&iquest;Cuanto vale la variacion de su energia interna? (0 decimales)',
      respuesta: R.numero(dU, { dec: 0, tol: 0.5, unidad: 'J' }),
      pistas: ['Primera ley: &Delta;U = Q &minus; W.',
        'Q = ' + Q + ' J (' + (Q > 0 ? 'absorbe' : 'cede') + ') y W = ' + W + ' J (' + (W > 0 ? 'lo hace el gas' : 'se lo hacen al gas') + ').'],
      solucion: ['Q = ' + Q + ' J, W = ' + W + ' J',
        '&Delta;U = Q &minus; W = ' + Q + ' &minus; (' + W + ')',
        '&Delta;U = <b>' + dU + ' J</b>: el gas ' + (dU > 0 ? 'se calienta' : dU < 0 ? 'se enfria' : 'no cambia de temperatura')]
    };
  };

  EJ.tema({
    id: 'termo-1',
    materia: 'fisica',
    grupo: 'Termodinamica',
    nombre: 'Primera ley de la termodinamica',
    descripcion: 'Conservacion de la energia con calor y trabajo: dU = Q - W.',
    etiquetas: ['termodinamica', 'energia interna', 'calor', 'trabajo'],
    formulario: '<b>Primera ley:</b> &Delta;U = Q &minus; W<br>' +
      '&Delta;U = variacion de energia interna (ligada a la temperatura)<br>' +
      'Q = calor. <b>Positivo si el sistema lo absorbe</b>, negativo si lo cede.<br>' +
      'W = trabajo. <b>Positivo si el sistema lo realiza</b> (se expande), negativo si se lo hacen.<br>' +
      '<small>Es la conservacion de la energia de toda la vida, incluyendo el calor.<br>' +
      'Procesos especiales: isotermico (&Delta;U = 0, Q = W) &middot; adiabatico (Q = 0, &Delta;U = &minus;W) &middot; ' +
      'isocorico o a volumen constante (W = 0, &Delta;U = Q).</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['formula', 'Que dice la primera ley'],
          ['signos', 'Los signos de Q y W'],
          ['sencillo', 'Calculo directo']
        ]);

        if (tf === 'formula') {
          var pf = r.elige([
            { q: '&iquest;Que expresa la primera ley de la termodinamica?',
              ok: 'La conservacion de la energia, incluyendo el calor', mal: 'Que el calor va de caliente a frio',
              por: 'lo del sentido del calor es la segunda ley, no la primera' },
            { q: 'Si un sistema absorbe calor y no hace trabajo, &iquest;que le pasa?',
              ok: 'Toda esa energia aumenta su energia interna', mal: 'La energia desaparece',
              por: 'con W = 0 queda &Delta;U = Q: todo el calor se queda dentro' },
            { q: 'En un proceso a temperatura constante, &iquest;cuanto vale &Delta;U?',
              ok: 'Cero, asi que Q = W', mal: 'Es igual al calor absorbido',
              por: 'si la temperatura no cambia, la energia interna tampoco, y todo el calor se va en trabajo' },
            { q: 'En un proceso adiabatico no entra ni sale calor. &iquest;Que queda?',
              ok: '&Delta;U = &minus;W: el sistema trabaja a costa de su energia interna', corto: '&Delta;U = &minus;W', mal: 'No pasa nada, porque Q = 0',
              por: 'sin calor, la unica fuente de trabajo es la propia energia interna, y por eso el gas se enfria al expandirse' }
          ]);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre que dice la <b>primera ley</b>.<br>' +
              'No es una ley nueva: es la conservacion de la energia de siempre, pero contando tambien el calor ' +
              'como una forma de energia.',
            pasos: [
              {
                seccion: 'Paso 1: la idea',
                queHacemos: 'Fijamos que afirma la primera ley.',
                paraQue: 'La energia que entra como calor, o sale como trabajo, tiene que cuadrar con el cambio de energia interna. No se pierde nada.',
                queda: '&Delta;U = Q &minus; W',
                pregunta: '&iquest;Que dice la primera ley?',
                resp: R.opcion(['Que la energia se conserva, contando tambien el calor',
                  'Que el calor siempre va de caliente a frio'], 0),
                pista: 'Lo del sentido del calor es la segunda ley.',
                despues: ''
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pf.por + '.',
                queda: pf.corto || pf.ok,
                pregunta: pf.q,
                resp: R.opcion([pf.ok, pf.mal], 0),
                pista: 'Escribe &Delta;U = Q &minus; W y mira que termino se anula.',
                despues: ''
              }
            ],
            final: '<b>' + pf.ok + '</b>',
            receta: ['&Delta;U = Q &minus; W',
              'Es la conservacion de la energia con el calor incluido',
              'Isotermico: &Delta;U = 0, asi que Q = W',
              'Adiabatico: Q = 0, asi que &Delta;U = &minus;W',
              'Volumen constante: W = 0, asi que &Delta;U = Q']
          });
          enun = pf.q;
          resp = R.opcion([pf.ok, pf.mal], 0);
          pistas = ['La primera ley es &Delta;U = Q &minus; W.',
            'Aqui ' + pf.por + '.'];
          sol = ['La primera ley es la conservacion de la energia incluyendo el calor',
            'Aqui ' + pf.por,
            'Respuesta: <b>' + pf.ok + '</b>'];

        } else if (tf === 'signos') {
          var caso = r.elige([
            { q: 'Un gas <b>absorbe</b> calor del exterior.', ok: 'Q positivo', mal: 'Q negativo',
              por: 'absorber es recibir energia, y eso cuenta como positivo' },
            { q: 'Un gas <b>cede</b> calor al exterior.', ok: 'Q negativo', mal: 'Q positivo',
              por: 'ceder es entregar energia: sale del sistema' },
            { q: 'Un gas <b>se expande</b> empujando el piston.', ok: 'W positivo', mal: 'W negativo',
              por: 'el gas es quien hace el trabajo, y gasta energia en ello' },
            { q: 'Se <b>comprime</b> un gas empujando el piston hacia dentro.', ok: 'W negativo', mal: 'W positivo',
              por: 'el trabajo se lo hacen al gas: recibe energia' }
          ]);
          guiaDelPaso = G({
            intro: 'La primera ley es facil de escribir y facil de equivocar, porque todo depende de los ' +
              '<b>signos</b> de Q y W.<br>' +
              'La regla es una sola: <b>positivo lo que aumenta la energia del sistema</b>... con una excepcion ' +
              'que conviene entender.',
            pasos: [
              {
                seccion: 'Paso 1: el criterio del calor',
                queHacemos: 'Fijamos el signo de Q.',
                paraQue: 'Entra energia: positivo. Sale: negativo. Aqui no hay sorpresa.',
                queda: 'Q positivo si entra calor',
                pregunta: 'Si el sistema ABSORBE calor, &iquest;que signo lleva Q?',
                resp: R.opcion(['Positivo', 'Negativo'], 0),
                pista: 'Absorber es recibir energia.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el criterio del trabajo',
                queHacemos: 'Fijamos el signo de W.',
                paraQue: 'Aqui esta la trampa: W es positivo cuando el sistema HACE el trabajo, aunque eso le quite energia. Por eso en la formula va restando.',
                queda: 'W positivo si el sistema se expande',
                pregunta: 'Si el sistema REALIZA trabajo (se expande), &iquest;que signo lleva W?',
                resp: R.opcion(['Positivo, y va restando en la formula', 'Negativo'], 0),
                pista: 'Se toma positivo por convenio, y el signo menos de la formula se encarga del resto.',
                despues: 'Por eso la formula es &Delta;U = Q &minus; W y no Q + W.'
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Decidimos el signo del caso.',
                paraQue: 'Aqui ' + caso.por + '.',
                queda: caso.ok,
                pregunta: caso.q + '<br>&iquest;Que signo corresponde?',
                resp: R.opcion([caso.ok, caso.mal], 0),
                pista: 'Pregunta clave: &iquest;entra o sale energia? &iquest;quien hace el trabajo?',
                despues: ''
              }
            ],
            final: '<b>' + caso.ok + '</b>',
            receta: ['Q positivo: el sistema absorbe calor',
              'Q negativo: el sistema cede calor',
              'W positivo: el sistema se expande y hace trabajo',
              'W negativo: comprimen al sistema',
              'La formula resta el trabajo: &Delta;U = Q &minus; W']
          });
          enun = caso.q + '<br>&iquest;Que signo corresponde segun el convenio de la primera ley?';
          resp = R.opcion([caso.ok, caso.mal], 0);
          pistas = ['Q es positivo si el sistema absorbe calor; W es positivo si el sistema realiza trabajo.',
            'Aqui ' + caso.por + '.'];
          sol = ['Convenio: Q positivo al absorber, W positivo al realizar trabajo',
            'Aqui ' + caso.por,
            'Respuesta: <b>' + caso.ok + '</b>'];

        } else {
          var Qs = r.elige([100, 200, 300, 400, 500]);
          var Ws = r.elige([50, 100, 150, 200]);
          while (Ws >= Qs) Ws = r.elige([50, 100]);
          guiaDelPaso = G({
            intro: 'Un gas absorbe <b>' + Qs + ' J</b> de calor y realiza <b>' + Ws + ' J</b> de trabajo.<br>' +
              'Los dos signos son positivos, asi que este caso es el mas directo: basta con restar.',
            pasos: [
              {
                seccion: 'Paso 1: anotar los datos con signo',
                queHacemos: 'Ponemos Q y W con su signo.',
                paraQue: 'Absorbe (Q positivo) y realiza trabajo (W positivo). Los dos van con el convenio estandar.',
                queda: 'Q = +' + Qs + ',  W = +' + Ws,
                pregunta: '&iquest;Cuanto vale Q?',
                resp: R.numero(Qs, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Absorbe, asi que positivo.',
                despues: 'Y W = +' + Ws + ', porque el gas hace el trabajo.'
              },
              {
                seccion: 'Paso 2: restar',
                queHacemos: 'Aplicamos &Delta;U = Q &minus; W.',
                paraQue: 'De los ' + Qs + ' J que entran, el gas gasta ' + Ws + ' J empujando. El resto se queda dentro.',
                queda: '&Delta;U = ' + (Qs - Ws) + ' J',
                pregunta: 'Calcula ' + Qs + ' &minus; ' + Ws,
                resp: R.numero(Qs - Ws, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Resta directa.',
                despues: 'Esa energia se queda dentro del gas.'
              },
              {
                seccion: 'Paso 3: que significa',
                queHacemos: 'Interpretamos el resultado.',
                paraQue: 'La energia interna subio, asi que el gas esta mas caliente que al principio.',
                queda: '&Delta;U = ' + (Qs - Ws) + ' J: se calienta',
                pregunta: 'Con &Delta;U positivo, &iquest;que le paso al gas?',
                resp: R.opcion(['Se calento', 'Se enfrio'], 0),
                pista: 'Mas energia interna quiere decir mas temperatura.',
                despues: ''
              }
            ],
            final: '&Delta;U = <b>' + (Qs - Ws) + ' J</b>: el gas se calienta',
            receta: ['&Delta;U = Q &minus; W',
              'Absorber calor: Q positivo',
              'Expandirse: W positivo, y va restando',
              '&Delta;U positivo quiere decir que se calienta']
          });
          enun = 'Un gas absorbe ' + Qs + ' J de calor y realiza ' + Ws + ' J de trabajo.<br>' +
            '&iquest;Cuanto cambia su energia interna? (0 decimales)';
          resp = R.numero(Qs - Ws, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['&Delta;U = Q &minus; W, con Q = +' + Qs + ' y W = +' + Ws + '.',
            'De la energia que entra, parte se gasta en el trabajo.'];
          sol = ['Q = +' + Qs + ' J (absorbe), W = +' + Ws + ' J (realiza trabajo)',
            '&Delta;U = ' + Qs + ' &minus; ' + Ws,
            '&Delta;U = <b>' + (Qs - Ws) + ' J</b>: el gas se calienta'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['variacion', 'Variacion de energia interna'],
          ['despejarQ', 'Despejar el calor'],
          ['despejarW', 'Despejar el trabajo']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var dU2 = r.elige([100, 200, 300, -100, -200]);
        var W2 = r.elige([50, 100, 150, 200, -100]);
        var Q2 = dU2 + W2;

        if (t2 === 'despejarQ') {
          guiaDelPaso = G({
            intro: 'La energia interna de un gas <b>' + (dU2 > 0 ? 'aumenta' : 'disminuye') + ' en ' + Math.abs(dU2) + ' J</b> ' +
              'mientras el gas <b>' + (W2 > 0 ? 'realiza' : 'recibe') + ' ' + Math.abs(W2) + ' J</b> de trabajo.<br>' +
              'Ahora la incognita es el calor: hay que <b>despejar Q</b>.',
            pasos: [
              {
                seccion: 'Paso 1: despejar',
                queHacemos: 'De &Delta;U = Q &minus; W pasamos W al otro lado.',
                paraQue: 'Queda Q = &Delta;U + W. El trabajo cambia de signo al cruzar el igual.',
                queda: 'Q = ' + dU2 + ' + (' + W2 + ')',
                pregunta: '&iquest;Como queda despejado el calor?',
                resp: R.opcion(['Q = &Delta;U + W', 'Q = &Delta;U &minus; W'], 0),
                pista: 'La W estaba restando, asi que pasa sumando.',
                despues: ''
              },
              {
                seccion: 'Paso 2: sustituir con signos',
                queHacemos: 'Metemos los valores con su signo.',
                paraQue: '&Delta;U es ' + (dU2 > 0 ? 'positivo (aumenta)' : 'negativo (disminuye)') + ' y W es ' + (W2 > 0 ? 'positivo (lo hace el gas)' : 'negativo (se lo hacen)') + '.',
                queda: 'Q = ' + Q2 + ' J',
                pregunta: 'Calcula ' + dU2 + ' + (' + W2 + ')',
                resp: R.numero(Q2, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Cuidado con los signos negativos.',
                despues: ''
              },
              {
                seccion: 'Paso 3: interpretar',
                queHacemos: 'Leemos que significa el signo de Q.',
                paraQue: 'Q positivo quiere decir que el gas absorbio calor; negativo, que lo cedio.',
                queda: 'Q = ' + Q2 + ' J:  ' + (Q2 > 0 ? 'absorbe calor' : 'cede calor'),
                pregunta: 'Con Q = ' + Q2 + ' J, &iquest;que hizo el gas?',
                resp: R.opcion(Q2 > 0
                  ? ['Absorbio calor', 'Cedio calor']
                  : ['Cedio calor', 'Absorbio calor'], 0),
                pista: 'Positivo es absorber.',
                despues: ''
              }
            ],
            final: 'Q = <b>' + Q2 + ' J</b>: el gas ' + (Q2 > 0 ? 'absorbe' : 'cede') + ' calor',
            receta: ['De &Delta;U = Q &minus; W se despeja Q = &Delta;U + W',
              'La W cambia de signo al pasar al otro lado',
              'Sustituir con los signos correctos',
              'Q positivo es absorber; negativo, ceder']
          });
          enun = 'La energia interna de un gas ' + (dU2 > 0 ? 'aumenta' : 'disminuye') + ' en ' + Math.abs(dU2) + ' J ' +
            'mientras ' + (W2 > 0 ? 'realiza' : 'recibe') + ' ' + Math.abs(W2) + ' J de trabajo.<br>' +
            '&iquest;Cuanto calor intercambio? (0 decimales, con signo)';
          resp = R.numero(Q2, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['De &Delta;U = Q &minus; W se despeja Q = &Delta;U + W.',
            '&Delta;U = ' + dU2 + ' J y W = ' + W2 + ' J.'];
          sol = ['Q = &Delta;U + W',
            'Q = ' + dU2 + ' + (' + W2 + ')',
            'Q = <b>' + Q2 + ' J</b>: el gas ' + (Q2 > 0 ? 'absorbe' : 'cede') + ' calor'];

        } else {
          var Q3 = r.elige([200, 300, 400, 500, -200]);
          var dU3 = r.elige([100, 150, -100, -150]);
          var W3 = Q3 - dU3;
          guiaDelPaso = G({
            intro: 'Un gas <b>' + (Q3 > 0 ? 'absorbe' : 'cede') + ' ' + Math.abs(Q3) + ' J</b> de calor y su energia ' +
              'interna <b>' + (dU3 > 0 ? 'aumenta' : 'disminuye') + ' en ' + Math.abs(dU3) + ' J</b>.<br>' +
              'Falta el trabajo. Es el mismo despeje, pero cuidando de donde sale cada signo.',
            pasos: [
              {
                seccion: 'Paso 1: despejar el trabajo',
                queHacemos: 'De &Delta;U = Q &minus; W despejamos W.',
                paraQue: 'Queda W = Q &minus; &Delta;U: el trabajo es la parte del calor que no se quedo dentro.',
                queda: 'W = ' + Q3 + ' &minus; (' + dU3 + ')',
                pregunta: '&iquest;Como queda despejado el trabajo?',
                resp: R.opcion(['W = Q &minus; &Delta;U', 'W = &Delta;U &minus; Q'], 0),
                pista: 'Pasa &Delta;U a un lado y W al otro, con cuidado de los signos.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Hacemos la resta con signos.',
                paraQue: 'Restar un negativo suma: es el error mas frecuente aqui.',
                queda: 'W = ' + W3 + ' J',
                pregunta: 'Calcula ' + Q3 + ' &minus; (' + dU3 + ')',
                resp: R.numero(W3, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: dU3 < 0 ? 'Restar ' + dU3 + ' es sumar ' + (-dU3) + '.' : 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: quien hizo el trabajo',
                queHacemos: 'Interpretamos el signo de W.',
                paraQue: 'W positivo quiere decir que el gas se expandio y empujo. Negativo, que lo comprimieron.',
                queda: 'W = ' + W3 + ' J:  ' + (W3 > 0 ? 'el gas se expande' : 'comprimen al gas'),
                pregunta: 'Con W = ' + W3 + ' J, &iquest;que paso?',
                resp: R.opcion(W3 > 0
                  ? ['El gas realizo trabajo: se expandio', 'Comprimieron al gas']
                  : ['Comprimieron al gas', 'El gas realizo trabajo: se expandio'], 0),
                pista: 'Positivo es que lo hace el gas.',
                despues: ''
              }
            ],
            final: 'W = <b>' + W3 + ' J</b>',
            receta: ['De &Delta;U = Q &minus; W se despeja W = Q &minus; &Delta;U',
              'El trabajo es la parte del calor que no se quedo dentro',
              'Restar un negativo es sumar',
              'W positivo: el gas se expande']
          });
          enun = 'Un gas ' + (Q3 > 0 ? 'absorbe' : 'cede') + ' ' + Math.abs(Q3) + ' J de calor y su energia interna ' +
            (dU3 > 0 ? 'aumenta' : 'disminuye') + ' en ' + Math.abs(dU3) + ' J.<br>' +
            '&iquest;Cuanto trabajo hubo? (0 decimales, con signo)';
          resp = R.numero(W3, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['De &Delta;U = Q &minus; W se despeja W = Q &minus; &Delta;U.',
            'Q = ' + Q3 + ' J y &Delta;U = ' + dU3 + ' J.'];
          sol = ['W = Q &minus; &Delta;U',
            'W = ' + Q3 + ' &minus; (' + dU3 + ')',
            'W = <b>' + W3 + ' J</b>: ' + (W3 > 0 ? 'el gas se expandio' : 'comprimieron al gas')];
        }

      } else {
        var t3 = r.subtema([
          ['isotermico', 'Proceso isotermico'],
          ['adiabatico', 'Proceso adiabatico'],
          ['ciclo', 'Ciclo completo']
        ]);

        if (t3 === 'isotermico') {
          var Qi = r.elige([150, 200, 250, 300, 400]);
          guiaDelPaso = G({
            intro: 'Un gas se expande <b>a temperatura constante</b> (proceso isotermico) absorbiendo ' +
              '<b>' + Qi + ' J</b> de calor.<br>' +
              'El dato "temperatura constante" parece inofensivo, pero es el que resuelve todo el problema.',
            pasos: [
              {
                seccion: 'Paso 1: que implica temperatura constante',
                queHacemos: 'Traducimos ese dato a energia interna.',
                paraQue: 'La energia interna depende de la temperatura. Si la temperatura no cambia, &Delta;U = 0.',
                queda: '&Delta;U = 0',
                pregunta: 'A temperatura constante, &iquest;cuanto vale &Delta;U?',
                resp: R.numero(0, { dec: 0, unidad: 'J' }),
                pista: 'La energia interna esta ligada a la temperatura.',
                despues: 'Ese es el dato clave.'
              },
              {
                seccion: 'Paso 2: que queda de la formula',
                queHacemos: 'Sustituimos &Delta;U = 0 en la primera ley.',
                paraQue: '0 = Q &minus; W, o sea Q = W. Todo el calor que entra se convierte en trabajo, sin quedarse nada dentro.',
                queda: 'Q = W',
                pregunta: 'Con &Delta;U = 0, &iquest;que relacion queda entre Q y W?',
                resp: R.opcion(['Q = W', 'Q = &minus;W'], 0),
                pista: '0 = Q &minus; W.',
                despues: 'El gas actua como un intermediario: recibe calor y lo entrega como trabajo.'
              },
              {
                seccion: 'Paso 3: el trabajo',
                queHacemos: 'Leemos el valor del trabajo.',
                paraQue: 'Es exactamente el calor absorbido: ni mas ni menos.',
                queda: 'W = ' + Qi + ' J',
                pregunta: '&iquest;Cuanto trabajo realizo el gas? (0 decimales)',
                resp: R.numero(Qi, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Igual al calor absorbido.',
                despues: ''
              },
              {
                seccion: 'Paso 4: como se consigue esto',
                queHacemos: 'Pensamos que hace falta en la practica.',
                paraQue: 'Hay que ir metiendo calor justo al ritmo al que el gas se enfriaria al expandirse. Se logra con un bano termico y una expansion muy lenta.',
                queda: 'Q = W = ' + Qi + ' J',
                pregunta: '&iquest;Como se mantiene constante la temperatura mientras el gas se expande?',
                resp: R.opcion(['Metiendo calor al mismo ritmo que el gas lo gastaria en expandirse',
                  'Aislando el gas del exterior'], 0),
                pista: 'Si lo aislaras no entraria calor: eso seria un proceso adiabatico, y ahi si se enfria.',
                despues: ''
              }
            ],
            final: 'El gas realiza <b>' + Qi + ' J</b> de trabajo: todo el calor se convierte en trabajo',
            receta: ['Isotermico quiere decir temperatura constante',
              'Temperatura constante quiere decir &Delta;U = 0',
              'Entonces Q = W: todo el calor se vuelve trabajo',
              'Hace falta un bano termico y expansion lenta']
          });
          enun = 'Un gas se expande a temperatura constante absorbiendo ' + Qi + ' J de calor.<br>' +
            '&iquest;Cuanto trabajo realiza? (0 decimales)';
          resp = R.numero(Qi, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['A temperatura constante la energia interna no cambia: &Delta;U = 0.',
            'Con &Delta;U = 0 la primera ley queda Q = W.'];
          sol = ['Isotermico quiere decir &Delta;U = 0',
            '&Delta;U = Q &minus; W se vuelve 0 = Q &minus; W, asi que Q = W',
            'W = <b>' + Qi + ' J</b>: todo el calor absorbido se convierte en trabajo'];

        } else if (t3 === 'adiabatico') {
          var Wa = r.elige([120, 150, 200, 250, 300]);
          var expande = r.bool();
          var W4 = expande ? Wa : -Wa;
          var dU4 = -W4;
          guiaDelPaso = G({
            intro: 'Un gas <b>aislado termicamente</b> (proceso adiabatico) ' +
              (expande ? 'se expande realizando' : 'es comprimido recibiendo') + ' <b>' + Wa + ' J</b> de trabajo.<br>' +
              'Aislado quiere decir que <b>no entra ni sale calor</b>. Con esa restriccion, el gas solo puede ' +
              'sacar energia de si mismo.',
            pasos: [
              {
                seccion: 'Paso 1: que implica estar aislado',
                queHacemos: 'Traducimos "aislado termicamente".',
                paraQue: 'Sin intercambio de calor, Q = 0. Es el otro caso limite frente al isotermico.',
                queda: 'Q = 0',
                pregunta: 'Aislado termicamente. &iquest;Cuanto vale Q?',
                resp: R.numero(0, { dec: 0, unidad: 'J' }),
                pista: 'No entra ni sale calor.',
                despues: ''
              },
              {
                seccion: 'Paso 2: que queda de la formula',
                queHacemos: 'Sustituimos Q = 0.',
                paraQue: 'Queda &Delta;U = &minus;W. El trabajo sale directamente de la energia interna del gas, que es lo unico que tiene.',
                queda: '&Delta;U = &minus;W',
                pregunta: 'Con Q = 0, &iquest;que queda?',
                resp: R.opcion(['&Delta;U = &minus;W', '&Delta;U = W'], 0),
                pista: '&Delta;U = 0 &minus; W.',
                despues: ''
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Aplicamos la formula con el signo de W.',
                paraQue: 'W = ' + W4 + ' J, asi que &Delta;U = ' + dU4 + ' J.',
                queda: '&Delta;U = ' + dU4 + ' J',
                pregunta: 'Con W = ' + W4 + ' J, calcula &Delta;U = &minus;W',
                resp: R.numero(dU4, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Cambiale el signo al trabajo.',
                despues: ''
              },
              {
                seccion: 'Paso 4: se calienta o se enfria',
                queHacemos: 'Interpretamos el resultado.',
                paraQue: expande
                  ? 'Al expandirse sin recibir calor, el gas gasta su propia energia y SE ENFRIA. Es lo que pasa al abrir un aerosol.'
                  : 'Al comprimirlo, el trabajo que le haces se queda dentro y el gas SE CALIENTA. Es lo que pasa al inflar una bici con bomba.',
                queda: '&Delta;U = ' + dU4 + ' J:  ' + (dU4 > 0 ? 'se calienta' : 'se enfria'),
                pregunta: '&iquest;Que le pasa a la temperatura del gas?',
                resp: R.opcion(expande
                  ? ['Baja: se enfria', 'Sube: se calienta']
                  : ['Sube: se calienta', 'Baja: se enfria'], 0),
                pista: expande ? 'Prueba a soltar el aire de un aerosol: sale frio.' : 'La bomba de bicicleta se calienta al usarla.',
                despues: ''
              }
            ],
            final: '&Delta;U = <b>' + dU4 + ' J</b>: el gas ' + (dU4 > 0 ? 'se calienta' : 'se enfria'),
            receta: ['Adiabatico quiere decir Q = 0',
              'Entonces &Delta;U = &minus;W',
              'Al expandirse sin calor, el gas se enfria',
              'Al comprimirlo sin dejar salir calor, se calienta']
          });
          enun = 'Un gas aislado termicamente ' + (expande ? 'se expande realizando' : 'es comprimido recibiendo') +
            ' ' + Wa + ' J de trabajo.<br>&iquest;Cuanto cambia su energia interna? (0 decimales, con signo)';
          resp = R.numero(dU4, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['Aislado termicamente quiere decir Q = 0.',
            'Con Q = 0 la primera ley queda &Delta;U = &minus;W, con W = ' + W4 + ' J.'];
          sol = ['Adiabatico: Q = 0',
            '&Delta;U = Q &minus; W = 0 &minus; (' + W4 + ')',
            '&Delta;U = <b>' + dU4 + ' J</b>: el gas ' + (dU4 > 0 ? 'se calienta' : 'se enfria')];

        } else {
          var Qabs = r.elige([500, 600, 800, 1000]);
          var Qced = r.elige([200, 300, 350, 400]);
          while (Qced >= Qabs) Qced = r.elige([200, 300]);
          var Wneto = Qabs - Qced;
          guiaDelPaso = G({
            intro: 'Una maquina termica funciona en <b>ciclos</b>: absorbe <b>' + Qabs + ' J</b> de una fuente caliente ' +
              'y cede <b>' + Qced + ' J</b> a una fria, volviendo cada vez a su estado inicial.<br>' +
              'La palabra <b>ciclo</b> es la clave: si vuelve al mismo estado, su energia interna no pudo cambiar.',
            pasos: [
              {
                seccion: 'Paso 1: que implica un ciclo',
                queHacemos: 'Pensamos en la energia interna tras un ciclo completo.',
                paraQue: 'La energia interna depende del ESTADO. Si el gas acaba igual que empezo, &Delta;U = 0, por muchas vueltas que haya dado en medio.',
                queda: '&Delta;U = 0 en el ciclo',
                pregunta: 'Tras un ciclo completo, &iquest;cuanto vale &Delta;U?',
                resp: R.numero(0, { dec: 0, unidad: 'J' }),
                pista: 'Vuelve exactamente al mismo estado del principio.',
                despues: 'Da igual lo que pasara durante el ciclo.'
              },
              {
                seccion: 'Paso 2: el calor neto',
                queHacemos: 'Restamos el calor cedido al absorbido.',
                paraQue: 'Entran ' + Qabs + ' J y salen ' + Qced + '. Lo que queda es el calor neto que recibio la maquina.',
                queda: 'Q neto = ' + Wneto + ' J',
                pregunta: 'Calcula ' + Qabs + ' &minus; ' + Qced,
                resp: R.numero(Wneto, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el trabajo del ciclo',
                queHacemos: 'Aplicamos la primera ley con &Delta;U = 0.',
                paraQue: '0 = Q neto &minus; W, asi que W = Q neto. Todo el calor neto se convierte en trabajo util.',
                queda: 'W = ' + Wneto + ' J por ciclo',
                pregunta: '&iquest;Cuanto trabajo produce la maquina por ciclo? (0 decimales)',
                resp: R.numero(Wneto, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Igual al calor neto.',
                despues: ''
              },
              {
                seccion: 'Paso 4: por que no aprovecha todo',
                queHacemos: 'Miramos los ' + Qced + ' J que se van.',
                paraQue: 'Se podria pensar que con mejor ingenieria se aprovecharian los ' + Qabs + ' J completos. La segunda ley demuestra que es IMPOSIBLE: siempre hay que tirar calor a un foco frio.',
                queda: 'W = ' + Wneto + ' de ' + Qabs + ' J (' + F.n(100 * Wneto / Qabs, 1) + '%)',
                pregunta: '&iquest;Se podria disenar una maquina que aproveche los ' + Qabs + ' J completos?',
                resp: R.opcion(['No: la segunda ley lo prohibe', 'Si, con mejor ingenieria'], 0),
                pista: 'La primera ley lo permitiria, pero la segunda no.',
                despues: 'Su rendimiento es del ' + F.n(100 * Wneto / Qabs, 1) + '%.'
              }
            ],
            final: 'La maquina produce <b>' + Wneto + ' J</b> por ciclo',
            receta: ['En un ciclo completo &Delta;U = 0',
              'Entonces W = Q neto = Q absorbido &minus; Q cedido',
              'El calor cedido no se aprovecha',
              'La segunda ley impide aprovecharlo todo']
          });
          enun = 'Una maquina termica absorbe ' + Qabs + ' J y cede ' + Qced + ' J por ciclo.<br>' +
            '&iquest;Cuanto trabajo produce en cada ciclo? (0 decimales)';
          resp = R.numero(Wneto, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['En un ciclo completo la energia interna vuelve a su valor inicial: &Delta;U = 0.',
            'Entonces W = Q absorbido &minus; Q cedido.'];
          sol = ['En un ciclo &Delta;U = 0, porque vuelve al estado inicial',
            'W = Q neto = ' + Qabs + ' &minus; ' + Qced,
            'W = <b>' + Wneto + ' J</b> por ciclo'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
