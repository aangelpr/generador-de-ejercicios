/* Segunda ley de la termodinamica: sentido del calor, entropia y rendimiento. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  var extra = {};

  /* ---------------- rendimiento de una maquina termica ---------------- */
  extra.rendimiento = function (r) {
    var Qc = r.elige([500, 600, 800, 1000, 1200]);
    var Qf = r.elige([200, 300, 400, 450]);
    while (Qf >= Qc) Qf = r.elige([200, 300]);
    var W = Qc - Qf;
    var e = W / Qc;
    return {
      guia: G({
        intro: 'Una maquina termica toma <b>' + Qc + ' J</b> de la fuente caliente y tira <b>' + Qf + ' J</b> ' +
          'a la fria en cada ciclo.<br>' +
          'El <b>rendimiento</b> mide que fraccion del calor que pagas se convierte en trabajo util.',
        pasos: [
          {
            seccion: 'Paso 1: el trabajo util',
            queHacemos: 'Restamos lo que sale de lo que entra.',
            paraQue: 'En un ciclo la energia interna vuelve a su valor inicial, asi que todo el calor neto se convierte en trabajo.',
            queda: 'W = ' + W + ' J',
            pregunta: 'Calcula ' + Qc + ' &minus; ' + Qf,
            resp: R.numero(W, { dec: 0, tol: 0.5, unidad: 'J' }),
            pista: 'El calor que no se aprovecha se va al foco frio.',
            despues: ''
          },
          {
            seccion: 'Paso 2: comparar con lo que pagas',
            queHacemos: 'Dividimos el trabajo entre el calor tomado del foco caliente.',
            paraQue: 'El rendimiento es lo que obtienes entre lo que pagas. Pagas los ' + Qc + ' J del foco caliente (el combustible), no el calor neto.',
            queda: 'e = ' + W + ' / ' + Qc + ' = ' + F.n(e, 3),
            pregunta: 'Calcula ' + W + ' &divide; ' + Qc + ' (3 decimales)',
            resp: R.numero(e, { dec: 3, tol: 0.002 }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 3: pasarlo a porcentaje',
            queHacemos: 'Multiplicamos por 100.',
            paraQue: 'Asi se lee de golpe: de cada 100 J de combustible, cuantos se vuelven trabajo.',
            queda: 'e = ' + F.n(100 * e, 1) + '%',
            pregunta: 'Expresa el rendimiento en porcentaje (1 decimal)',
            resp: R.numero(100 * e, { dec: 1, tol: 0.2, unidad: '%' }),
            pista: 'Multiplica por 100.',
            despues: ''
          },
          {
            seccion: 'Paso 4: por que nunca llega al 100%',
            queHacemos: 'Miramos los ' + Qf + ' J que se tiran.',
            paraQue: 'Ese calor no se pierde por mala ingenieria: la segunda ley exige que SIEMPRE haya un foco frio al que tirar calor. Una maquina con rendimiento 100% es imposible.',
            queda: 'e = ' + F.n(100 * e, 1) + '%, y el 100% es imposible',
            pregunta: '&iquest;Por que se tiran ' + Qf + ' J en lugar de aprovecharlos?',
            resp: R.opcion(['Porque la segunda ley obliga a ceder calor a un foco frio',
              'Porque la maquina esta mal disenada'], 0),
            pista: 'No es un fallo tecnico, es una ley.',
            despues: ''
          }
        ],
        final: 'Rendimiento = <b>' + F.n(100 * e, 1) + '%</b>',
        receta: ['W = Q caliente &minus; Q frio',
          'e = W / Q caliente',
          'Por 100 para el porcentaje',
          'Nunca puede ser 100%: siempre se tira calor al foco frio']
      }),
      enunciado: 'Una maquina termica absorbe ' + Qc + ' J de la fuente caliente y cede ' + Qf + ' J a la fria.<br>' +
        '&iquest;Cual es su rendimiento en porcentaje? (1 decimal)',
      respuesta: R.numero(100 * e, { dec: 1, tol: 0.2, unidad: '%' }),
      pistas: ['El trabajo util es W = Q caliente &minus; Q frio.',
        'El rendimiento es e = W / Q caliente, por 100.'],
      solucion: ['W = ' + Qc + ' &minus; ' + Qf + ' = ' + W + ' J',
        'e = ' + W + ' / ' + Qc + ' = ' + F.n(e, 3),
        'e = <b>' + F.n(100 * e, 1) + '%</b>']
    };
  };

  /* ---------------- rendimiento maximo de Carnot ---------------- */
  extra.carnot = function (r) {
    var Tf = r.elige([300, 320, 350, 280]);
    var Tc = Tf + r.elige([150, 200, 250, 300, 400]);
    var e = 1 - Tf / Tc;
    return {
      guia: G({
        intro: 'Una maquina trabaja entre un foco caliente a <b>' + Tc + ' K</b> y uno frio a <b>' + Tf + ' K</b>.<br>' +
          'Carnot demostro que existe un <b>techo</b> de rendimiento que depende solo de las dos temperaturas, ' +
          'y que ninguna maquina, por buena que sea, puede superar.',
        pasos: [
          {
            seccion: 'Paso 1: las temperaturas en kelvin',
            queHacemos: 'Comprobamos que estan en kelvin.',
            paraQue: 'La formula de Carnot solo funciona con temperaturas absolutas. Con grados Celsius da resultados sin sentido, incluso negativos.',
            queda: 'Tc = ' + Tc + ' K,  Tf = ' + Tf + ' K',
            pregunta: '&iquest;En que escala tienen que estar las temperaturas?',
            resp: R.opcion(['En kelvin', 'En grados Celsius'], 0),
            pista: 'Es un cociente de temperaturas: necesita una escala que empiece en el cero real.',
            despues: ''
          },
          {
            seccion: 'Paso 2: el cociente',
            queHacemos: 'Dividimos la temperatura fria entre la caliente.',
            paraQue: 'Ese cociente es la fraccion de calor que forzosamente se tira. Cuanto mas juntas estan las temperaturas, mas se desperdicia.',
            queda: 'Tf / Tc = ' + F.n(Tf / Tc, 4),
            pregunta: 'Calcula ' + Tf + ' &divide; ' + Tc + ' (4 decimales)',
            resp: R.numero(Tf / Tc, { dec: 4, tol: 0.0015 }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 3: restar a 1',
            queHacemos: 'Aplicamos e = 1 &minus; Tf/Tc.',
            paraQue: 'Si esa fraccion es lo que se tira, lo que queda aprovechable es el resto.',
            queda: 'e = ' + F.n(e, 4),
            pregunta: 'Calcula 1 &minus; ' + F.n(Tf / Tc, 4) + ' (4 decimales)',
            resp: R.numero(e, { dec: 4, tol: 0.0015 }),
            pista: 'Resta directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: el porcentaje y que significa',
            queHacemos: 'Pasamos a porcentaje y lo interpretamos.',
            paraQue: 'Es un TECHO: ninguna maquina real entre esos dos focos puede superarlo, y en la practica se queda bastante por debajo.',
            queda: 'e maximo = ' + F.n(100 * e, 1) + '%',
            pregunta: 'Expresa el rendimiento maximo en porcentaje (1 decimal)',
            resp: R.numero(100 * e, { dec: 1, tol: 0.2, unidad: '%' }),
            pista: 'Multiplica por 100.',
            despues: 'Para subirlo habria que calentar mas el foco caliente o enfriar mas el frio.'
          }
        ],
        final: 'Rendimiento maximo = <b>' + F.n(100 * e, 1) + '%</b>',
        receta: ['e maximo = 1 &minus; Tf / Tc',
          'Las temperaturas SIEMPRE en kelvin',
          'Es un techo teorico: las maquinas reales quedan por debajo',
          'Solo llegaria al 100% con Tf = 0 K, que es inalcanzable']
      }),
      enunciado: 'Una maquina trabaja entre ' + Tc + ' K y ' + Tf + ' K.<br>' +
        '&iquest;Cual es su rendimiento maximo posible en porcentaje? (1 decimal)',
      respuesta: R.numero(100 * e, { dec: 1, tol: 0.2, unidad: '%' }),
      pistas: ['El rendimiento de Carnot es e = 1 &minus; Tf / Tc, con las temperaturas en kelvin.',
        'Tf / Tc = ' + Tf + ' / ' + Tc + '.'],
      solucion: ['e = 1 &minus; Tf / Tc',
        'e = 1 &minus; ' + Tf + '/' + Tc + ' = 1 &minus; ' + F.n(Tf / Tc, 4),
        'e = ' + F.n(e, 4) + ' = <b>' + F.n(100 * e, 1) + '%</b> como maximo']
    };
  };

  EJ.tema({
    id: 'termo-2',
    materia: 'fisica',
    grupo: 'Termodinamica',
    nombre: 'Segunda ley de la termodinamica',
    descripcion: 'El sentido del calor, la entropia y por que ninguna maquina rinde el 100%.',
    etiquetas: ['termodinamica', 'entropia', 'rendimiento', 'carnot'],
    formulario: '<b>Segunda ley:</b> el calor va solo de lo caliente a lo frio por si mismo.<br>' +
      'La <b>entropia</b> (el desorden) del universo nunca disminuye: &Delta;S &ge; 0.<br>' +
      '<b>Rendimiento:</b> e = W / Q<sub>caliente</sub> = 1 &minus; Q<sub>frio</sub> / Q<sub>caliente</sub><br>' +
      '<b>Rendimiento maximo (Carnot):</b> e = 1 &minus; T<sub>frio</sub> / T<sub>caliente</sub> &nbsp;<small>(en kelvin)</small><br>' +
      '<small>La primera ley dice cuanta energia hay; la segunda, en que sentido se mueve.<br>' +
      'Ninguna maquina termica alcanza el 100%: siempre hay que ceder calor a un foco frio.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['sentido', 'El sentido del calor'],
          ['entropia', 'Que es la entropia'],
          ['imposible', 'Lo que la segunda ley prohibe']
        ]);

        if (tf === 'sentido') {
          var cs = r.elige([
            { q: 'Pones un hielo en un vaso de agua tibia.', ok: 'El calor pasa del agua al hielo',
              mal: 'El calor pasa del hielo al agua', por: 'el calor siempre sale del cuerpo mas caliente, que aqui es el agua' },
            { q: 'Dejas una taza de cafe caliente sobre la mesa.', ok: 'El cafe cede calor al aire y se enfria',
              mal: 'El aire cede calor al cafe y lo mantiene caliente', por: 'el cafe esta mas caliente que el aire, asi que el calor sale de el' },
            { q: 'Sacas un refresco del refrigerador y lo dejas fuera.', ok: 'El aire le cede calor y el refresco se calienta',
              mal: 'El refresco cede calor al aire y se enfria mas', por: 'ahora el ambiente es lo caliente y la lata lo frio' },
            { q: '&iquest;Puede el calor ir de un cuerpo frio a uno caliente?', ok: 'Solo si una maquina gasta energia para forzarlo',
              mal: 'Nunca, bajo ninguna circunstancia', por: 'eso hace justamente un refrigerador, pero necesita electricidad: no ocurre por si solo' }
          ]);
          guiaDelPaso = G({
            intro: 'La segunda ley tiene una version muy sencilla de enunciar: <b>el calor no sube solo</b>.<br>' +
              'Pasa siempre de lo caliente a lo frio, nunca al reves por su cuenta.',
            pasos: [
              {
                seccion: 'Paso 1: la regla',
                queHacemos: 'Fijamos el sentido natural del calor.',
                paraQue: 'Dos cuerpos en contacto siempre acaban igualandose, y el que baja de temperatura es el caliente.',
                queda: 'El calor va de caliente a frio',
                pregunta: 'Por si mismo, &iquest;en que sentido fluye el calor?',
                resp: R.opcion(['De lo caliente a lo frio', 'De lo frio a lo caliente'], 0),
                pista: 'Nunca has visto un vaso de agua congelarse solo mientras calienta la habitacion.',
                despues: ''
              },
              {
                seccion: 'Paso 2: quien esta mas caliente',
                queHacemos: 'Identificamos los dos cuerpos del caso.',
                paraQue: 'Aqui ' + cs.por + '.',
                queda: cs.ok,
                pregunta: cs.q + '<br>&iquest;Que ocurre?',
                resp: R.opcion([cs.ok, cs.mal], 0),
                pista: 'Pregunta cual de los dos esta mas caliente: de ahi sale el calor.',
                despues: ''
              }
            ],
            final: '<b>' + cs.ok + '</b>',
            receta: ['El calor va solo de caliente a frio',
              'Identificar quien esta mas caliente',
              'De ahi sale el calor',
              'Para forzar lo contrario hace falta gastar energia (un refrigerador)']
          });
          enun = cs.q + '<br>&iquest;Que ocurre con el calor?';
          resp = R.opcion([cs.ok, cs.mal], 0);
          pistas = ['La segunda ley: el calor va solo de lo caliente a lo frio.',
            'Aqui ' + cs.por + '.'];
          sol = ['El calor fluye espontaneamente de caliente a frio',
            'Aqui ' + cs.por,
            'Respuesta: <b>' + cs.ok + '</b>'];

        } else if (tf === 'entropia') {
          var ce = r.elige([
            { q: 'Un hielo se derrite en un vaso.', ok: 'La entropia aumenta: el agua liquida esta mas desordenada', corto: 'la entropia aumenta',
              mal: 'La entropia disminuye', por: 'en el hielo las moleculas estan ordenadas en una red, y al derretirse quedan sueltas' },
            { q: 'Echas una gota de tinta en agua y se reparte.', ok: 'La entropia aumenta',
              mal: 'La entropia se mantiene igual', por: 'la tinta pasa de estar concentrada a estar repartida, que es un estado mucho mas desordenado' },
            { q: '&iquest;Puede disminuir la entropia de tu habitacion al ordenarla?',
              ok: 'Si, pero la del universo aumenta, porque tu gastas energia', corto: 'si, pero la del universo sube', mal: 'No, es imposible ordenar nada',
              por: 'la segunda ley habla del TOTAL: puedes ordenar algo local a costa de desordenar mas el resto' },
            { q: 'Un vaso se cae y se rompe. &iquest;Por que no se recompone solo?',
              ok: 'Porque eso reduciria la entropia, y no ocurre espontaneamente', corto: 'reduciria la entropia', mal: 'Porque el vidrio es fragil',
              por: 'hay incontables formas de estar roto y practicamente una de estar entero' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>entropia</b> suena abstracta, pero la idea es simple: mide cuanto <b>desorden</b> hay, ' +
              'o mejor dicho, de cuantas maneras se puede reorganizar algo sin que se note.<br>' +
              'La segunda ley dice que la entropia del universo <b>nunca baja</b>.',
            pasos: [
              {
                seccion: 'Paso 1: que mide la entropia',
                queHacemos: 'Fijamos el significado.',
                paraQue: 'Mas entropia quiere decir mas formas posibles de estar revuelto. Por puro conteo, lo desordenado es mucho mas probable.',
                queda: 'Entropia = desorden',
                pregunta: '&iquest;Que mide la entropia?',
                resp: R.opcion(['El desorden de un sistema', 'La cantidad de calor que tiene'], 0),
                pista: 'No es energia: es en cuantas formas se puede reordenar.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la ley',
                queHacemos: 'Recordamos que dice la segunda ley sobre ella.',
                paraQue: 'En el universo entero nunca disminuye. Puede bajar en un rincon, pero solo si sube mas en otro.',
                queda: '&Delta;S &ge; 0 en el universo',
                pregunta: 'En el universo completo, &iquest;que puede hacer la entropia?',
                resp: R.opcion(['Solo aumentar o quedarse igual', 'Aumentar o disminuir libremente'], 0),
                pista: 'Por eso los procesos naturales no se ven al reves.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Analizamos el caso.',
                paraQue: 'Aqui ' + ce.por + '.',
                queda: ce.corto || ce.ok,
                pregunta: ce.q + '<br>&iquest;Que pasa con la entropia?',
                resp: R.opcion([ce.ok, ce.mal], 0),
                pista: 'Pregunta si el estado final tiene mas o menos formas de organizarse.',
                despues: ''
              }
            ],
            final: '<b>' + ce.ok + '</b>',
            receta: ['La entropia mide el desorden',
              'La del universo nunca disminuye',
              'Puede bajar localmente si sube mas en otro sitio',
              'Por eso los procesos naturales no se ven al reves']
          });
          enun = ce.q + '<br>&iquest;Que ocurre con la entropia?';
          resp = R.opcion([ce.ok, ce.mal], 0);
          pistas = ['La entropia mide el desorden, y la del universo nunca disminuye.',
            'Aqui ' + ce.por + '.'];
          sol = ['La entropia mide el desorden de un sistema',
            'Aqui ' + ce.por,
            'Respuesta: <b>' + ce.ok + '</b>'];

        } else {
          var ci = r.elige([
            { q: 'Una maquina que convierta en trabajo TODO el calor que recibe.', ok: 'Es imposible',
              mal: 'Es posible con buena ingenieria', por: 'siempre hay que ceder algo de calor a un foco frio' },
            { q: 'Un refrigerador que enfrie sin consumir electricidad.', ok: 'Es imposible',
              mal: 'Es posible si esta bien aislado', por: 'sacar calor de lo frio para darlo a lo caliente exige gastar energia' },
            { q: 'Una maquina con un rendimiento del 45%.', ok: 'Es posible',
              mal: 'Es imposible', por: 'un rendimiento menor al 100% no contradice nada' },
            { q: 'Un barco que avance usando solo el calor del mar, sin foco frio.', ok: 'Es imposible',
              mal: 'Es posible: hay muchisima energia en el mar', por: 'energia hay de sobra, pero sin un foco frio no se puede extraer trabajo' }
          ]);
          guiaDelPaso = G({
            intro: 'La segunda ley no dice cuanta energia hay: eso ya lo dice la primera. Dice <b>que se puede hacer ' +
              'con ella</b>.<br>' +
              'Muchos inventos imaginarios cumplen la primera ley perfectamente y aun asi son imposibles.',
            pasos: [
              {
                seccion: 'Paso 1: lo que prohibe',
                queHacemos: 'Recordamos la prohibicion clave.',
                paraQue: 'Ninguna maquina puede convertir todo el calor en trabajo. Siempre hay que tirar una parte a un foco frio.',
                queda: 'Rendimiento 100%: imposible',
                pregunta: '&iquest;Puede una maquina convertir en trabajo el 100% del calor que recibe?',
                resp: R.opcion(['No, nunca', 'Si, si esta bien construida'], 0),
                pista: 'No es un limite tecnico, es una ley.',
                despues: ''
              },
              {
                seccion: 'Paso 2: energia no es lo mismo que trabajo',
                queHacemos: 'Separamos las dos ideas.',
                paraQue: 'El mar tiene energia enorme, pero sin una diferencia de temperatura no se puede sacar trabajo de ella. Hace falta un desnivel, igual que un rio necesita pendiente.',
                queda: 'Sin foco frio no hay trabajo',
                pregunta: '&iquest;Que hace falta para extraer trabajo del calor?',
                resp: R.opcion(['Una diferencia de temperatura entre dos focos', 'Solo tener mucha energia disponible'], 0),
                pista: 'Piensa en un rio: sin pendiente no mueve nada aunque lleve muchisima agua.',
                despues: ''
              },
              {
                seccion: 'Paso 3: juzgar el caso',
                queHacemos: 'Decidimos si es posible.',
                paraQue: 'Aqui ' + ci.por + '.',
                queda: ci.ok,
                pregunta: ci.q + '<br>&iquest;Es posible?',
                resp: R.opcion([ci.ok, ci.mal], 0),
                pista: 'Pregunta si rompe la segunda ley o solo parece muy eficiente.',
                despues: ''
              }
            ],
            final: '<b>' + ci.ok + '</b>',
            receta: ['La segunda ley prohibe el rendimiento del 100%',
              'Prohibe tambien enfriar sin gastar energia',
              'Hace falta una diferencia de temperatura para sacar trabajo',
              'Un rendimiento bajo o medio no rompe nada']
          });
          enun = ci.q + '<br>&iquest;Es posible segun la segunda ley?';
          resp = R.opcion([ci.ok, ci.mal], 0);
          pistas = ['La segunda ley prohibe convertir todo el calor en trabajo y enfriar sin gastar energia.',
            'Aqui ' + ci.por + '.'];
          sol = ['La segunda ley limita lo que se puede hacer con la energia',
            'Aqui ' + ci.por,
            'Respuesta: <b>' + ci.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['rendimiento', 'Rendimiento de una maquina'],
          ['calorCedido', 'Calor cedido al foco frio'],
          ['refrigerador', 'Como funciona un refrigerador']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        if (t2 === 'calorCedido') {
          var Qc2 = r.elige([800, 1000, 1200, 1500, 2000]);
          var pct = r.elige([20, 25, 30, 35, 40]);
          var W2 = Qc2 * pct / 100;
          var Qf2 = Qc2 - W2;
          guiaDelPaso = G({
            intro: 'Una maquina con un rendimiento del <b>' + pct + '%</b> absorbe <b>' + Qc2 + ' J</b> del foco caliente.<br>' +
              'La pregunta no es cuanto trabajo hace, sino <b>cuanto calor desperdicia</b>.',
            pasos: [
              {
                seccion: 'Paso 1: el trabajo util',
                queHacemos: 'Aplicamos el porcentaje de rendimiento.',
                paraQue: 'El rendimiento dice que fraccion del calor absorbido se vuelve trabajo: el ' + pct + '% de ' + Qc2 + '.',
                queda: 'W = ' + W2 + ' J',
                pregunta: 'Calcula el ' + pct + '% de ' + Qc2 + ' (0 decimales)',
                resp: R.numero(W2, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Multiplica por ' + (pct / 100) + '.',
                despues: ''
              },
              {
                seccion: 'Paso 2: lo que sobra',
                queHacemos: 'Restamos el trabajo del calor absorbido.',
                paraQue: 'En un ciclo la energia se conserva: lo que entra y no sale como trabajo tiene que salir como calor al foco frio.',
                queda: 'Q frio = ' + Qf2 + ' J',
                pregunta: 'Calcula ' + Qc2 + ' &minus; ' + W2 + ' (0 decimales)',
                resp: R.numero(Qf2, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'Todo lo que no es trabajo se va como calor.',
                despues: ''
              },
              {
                seccion: 'Paso 3: leerlo',
                queHacemos: 'Interpretamos el resultado.',
                paraQue: 'Con un rendimiento del ' + pct + '%, el ' + (100 - pct) + '% del combustible se va en calor. Eso es lo normal en un motor real.',
                queda: 'Q frio = ' + Qf2 + ' J (' + (100 - pct) + '% del total)',
                pregunta: 'De cada 100 J, &iquest;cuantos se desperdician como calor? (0 decimales)',
                resp: R.numero(100 - pct, { dec: 0, tol: 0.5, unidad: 'J' }),
                pista: 'El resto del 100%.',
                despues: 'Por eso los motores se calientan tanto.'
              }
            ],
            final: 'Cede <b>' + Qf2 + ' J</b> al foco frio',
            receta: ['W = rendimiento x Q caliente',
              'Q frio = Q caliente &minus; W',
              'Lo que no es trabajo sale como calor',
              'Un rendimiento del ' + pct + '% desperdicia el ' + (100 - pct) + '%']
          });
          enun = 'Una maquina con rendimiento del ' + pct + '% absorbe ' + Qc2 + ' J del foco caliente.<br>' +
            '&iquest;Cuanto calor cede al foco frio? (0 decimales)';
          resp = R.numero(Qf2, { dec: 0, tol: 0.5, unidad: 'J' });
          pistas = ['El trabajo util es el ' + pct + '% de ' + Qc2 + ' J.',
            'El resto tiene que salir como calor al foco frio.'];
          sol = ['W = ' + pct + '% de ' + Qc2 + ' = ' + W2 + ' J',
            'Q frio = ' + Qc2 + ' &minus; ' + W2,
            'Q frio = <b>' + Qf2 + ' J</b>'];

        } else {
          var cr = r.elige([
            { q: '&iquest;Por que un refrigerador necesita estar enchufado?',
              ok: 'Porque mover calor de lo frio a lo caliente exige gastar energia', corto: 'subir calor cuesta energia',
              mal: 'Porque necesita luz para el foco interior',
              por: 'sacar calor de dentro y echarlo a la cocina va contra el sentido natural, y eso hay que pagarlo' },
            { q: '&iquest;Se puede enfriar una cocina dejando abierta la puerta del refrigerador?',
              ok: 'No: al final la calienta, porque el motor tambien disipa calor', corto: 'no: al final la calienta',
              mal: 'Si, poco a poco la enfria',
              por: 'el refrigerador saca calor de dentro y lo echa fuera, y ademas anade el calor de su propio motor' },
            { q: '&iquest;Que hace la rejilla trasera de un refrigerador?',
              ok: 'Soltar a la cocina el calor sacado del interior', mal: 'Absorber calor de la cocina',
              por: 'el calor extraido de los alimentos tiene que ir a alguna parte, y esa parte es la habitacion' },
            { q: 'Un refrigerador, &iquest;viola la segunda ley al enfriar?',
              ok: 'No, porque consume energia para lograrlo', mal: 'Si, porque el calor va de frio a caliente',
              por: 'la ley prohibe que ocurra ESPONTANEAMENTE, no que se fuerce gastando trabajo' }
          ]);
          guiaDelPaso = G({
            intro: 'Un refrigerador parece contradecir la segunda ley: saca calor de lo frio (los alimentos) y lo ' +
              'echa a lo caliente (la cocina).<br>' +
              'No la contradice, y ver por que ayuda a entender que dice la ley exactamente.',
            pasos: [
              {
                seccion: 'Paso 1: la palabra que importa',
                queHacemos: 'Afinamos el enunciado de la ley.',
                paraQue: 'La segunda ley prohibe que el calor suba ESPONTANEAMENTE, por si solo. No prohibe forzarlo pagando con energia.',
                queda: 'Prohibido solo si es espontaneo',
                pregunta: '&iquest;Que prohibe exactamente la segunda ley?',
                resp: R.opcion(['Que el calor suba de frio a caliente por si solo',
                  'Que el calor suba de frio a caliente en cualquier caso'], 0),
                pista: 'La palabra clave es "espontaneamente".',
                despues: ''
              },
              {
                seccion: 'Paso 2: que hace el motor',
                queHacemos: 'Miramos de donde sale la energia.',
                paraQue: 'El compresor consume electricidad y con ella bombea el calor cuesta arriba. Esa energia tambien acaba como calor en la cocina.',
                queda: 'El motor paga el bombeo de calor',
                pregunta: '&iquest;Para que consume electricidad el refrigerador?',
                resp: R.opcion(['Para bombear calor de dentro hacia fuera', 'Para generar frio de la nada'], 0),
                pista: 'El frio no se fabrica: se quita calor.',
                despues: 'No existe "generar frio": solo se mueve calor.'
              },
              {
                seccion: 'Paso 3: el caso',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + cr.por + '.',
                queda: cr.corto || cr.ok,
                pregunta: cr.q,
                resp: R.opcion([cr.ok, cr.mal], 0),
                pista: 'Sigue el recorrido del calor: de donde sale y a donde llega.',
                despues: ''
              }
            ],
            final: '<b>' + cr.ok + '</b>',
            receta: ['La segunda ley prohibe el flujo ESPONTANEO de frio a caliente',
              'Un refrigerador lo fuerza gastando electricidad',
              'El frio no se genera: se mueve calor',
              'Ese calor, mas el del motor, acaba en la habitacion']
          });
          enun = cr.q;
          resp = R.opcion([cr.ok, cr.mal], 0);
          pistas = ['La segunda ley prohibe que el calor suba espontaneamente, no que se fuerce gastando energia.',
            'Aqui ' + cr.por + '.'];
          sol = ['Un refrigerador bombea calor cuesta arriba consumiendo energia',
            'Aqui ' + cr.por,
            'Respuesta: <b>' + cr.ok + '</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['carnot', 'Rendimiento maximo de Carnot'],
          ['compara', 'Comparar con el maximo'],
          ['mejora', 'Como subir el rendimiento']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'compara') {
          var Tf3 = r.elige([300, 320, 350]);
          var Tc3 = Tf3 + r.elige([200, 250, 300, 400]);
          var eMax = 1 - Tf3 / Tc3;
          var eReal = Math.round(100 * eMax * r.elige([0.5, 0.6, 0.7])) / 100;
          guiaDelPaso = G({
            intro: 'Un fabricante asegura que su maquina, trabajando entre <b>' + Tc3 + ' K</b> y <b>' + Tf3 + ' K</b>, ' +
              'rinde un <b>' + F.n(100 * eReal, 1) + '%</b>.<br>' +
              'Para saber si miente hay que comparar con el techo de Carnot.',
            pasos: [
              {
                seccion: 'Paso 1: el techo teorico',
                queHacemos: 'Calculamos el rendimiento de Carnot.',
                paraQue: 'Es el maximo absoluto entre esas dos temperaturas. Ninguna maquina puede superarlo.',
                queda: 'e maximo = ' + F.n(100 * eMax, 1) + '%',
                pregunta: 'Calcula 1 &minus; ' + Tf3 + '/' + Tc3 + ', en porcentaje (1 decimal)',
                resp: R.numero(100 * eMax, { dec: 1, tol: 0.2, unidad: '%' }),
                pista: 'Divide, resta a 1 y multiplica por 100.',
                despues: ''
              },
              {
                seccion: 'Paso 2: comparar',
                queHacemos: 'Miramos si el valor anunciado cabe debajo del techo.',
                paraQue: 'Si el anunciado es menor, es creible. Si lo supera, el fabricante estaria rompiendo la segunda ley.',
                queda: F.n(100 * eReal, 1) + '% frente a ' + F.n(100 * eMax, 1) + '%',
                pregunta: '&iquest;El ' + F.n(100 * eReal, 1) + '% anunciado supera el maximo?',
                resp: R.opcion(['No, esta por debajo: es posible', 'Si, lo supera: es imposible'], 0),
                pista: 'Compara los dos porcentajes.',
                despues: ''
              },
              {
                seccion: 'Paso 3: que fraccion del maximo alcanza',
                queHacemos: 'Dividimos el real entre el maximo.',
                paraQue: 'Asi se ve lo buena que es la maquina en si, sin que las temperaturas confundan la comparacion.',
                queda: 'Aprovecha el ' + F.n(100 * eReal / eMax, 0) + '% del techo',
                pregunta: 'Calcula ' + F.n(100 * eReal, 1) + ' &divide; ' + F.n(100 * eMax, 1) + ', en porcentaje (0 decimales)',
                resp: R.numero(100 * eReal / eMax, { dec: 0, tol: 2, unidad: '%' }),
                pista: 'Divide el rendimiento real entre el maximo.',
                despues: ''
              },
              {
                seccion: 'Paso 4: conclusion',
                queHacemos: 'Damos el veredicto.',
                paraQue: 'La maquina es posible, aunque queda por debajo del ideal, como toda maquina real.',
                queda: 'Anuncio creible: ' + F.n(100 * eReal, 1) + '% < ' + F.n(100 * eMax, 1) + '%',
                pregunta: '&iquest;Es creible el anuncio del fabricante?',
                resp: R.opcion(['Si, porque no supera el maximo de Carnot', 'No, viola la segunda ley'], 0),
                pista: 'Lo unico prohibido es pasarse del techo.',
                despues: ''
              }
            ],
            final: 'Maximo posible: <b>' + F.n(100 * eMax, 1) + '%</b>, asi que el anuncio es creible',
            receta: ['Calcular el maximo con e = 1 &minus; Tf/Tc',
              'Comparar el rendimiento anunciado con ese techo',
              'Por debajo: posible. Por encima: imposible',
              'El cociente entre ambos dice lo buena que es la maquina']
          });
          enun = 'Una maquina trabaja entre ' + Tc3 + ' K y ' + Tf3 + ' K.<br>' +
            '&iquest;Cual es el rendimiento maximo que podria tener, en porcentaje? (1 decimal)';
          resp = R.numero(100 * eMax, { dec: 1, tol: 0.2, unidad: '%' });
          pistas = ['El techo lo da Carnot: e = 1 &minus; Tf / Tc.',
            'Tf = ' + Tf3 + ' K y Tc = ' + Tc3 + ' K.'];
          sol = ['e maximo = 1 &minus; ' + Tf3 + '/' + Tc3,
            'e maximo = ' + F.n(eMax, 4),
            'e maximo = <b>' + F.n(100 * eMax, 1) + '%</b>'];

        } else {
          var Tf4 = r.elige([300, 320]);
          var Tc4 = Tf4 + r.elige([200, 300]);
          var sube = r.elige([100, 150, 200]);
          var e1 = 1 - Tf4 / Tc4;
          var e2 = 1 - Tf4 / (Tc4 + sube);
          guiaDelPaso = G({
            intro: 'Una maquina trabaja entre <b>' + Tc4 + ' K</b> y <b>' + Tf4 + ' K</b>. Se propone subir la fuente ' +
              'caliente a <b>' + (Tc4 + sube) + ' K</b>.<br>' +
              '&iquest;Cuanto mejora realmente? Conviene calcularlo antes de gastar en la modificacion.',
            pasos: [
              {
                seccion: 'Paso 1: el rendimiento actual',
                queHacemos: 'Aplicamos Carnot con las temperaturas de ahora.',
                paraQue: 'Es el punto de partida contra el que compararemos.',
                queda: 'e actual = ' + F.n(100 * e1, 1) + '%',
                pregunta: 'Calcula 1 &minus; ' + Tf4 + '/' + Tc4 + ', en porcentaje (1 decimal)',
                resp: R.numero(100 * e1, { dec: 1, tol: 0.2, unidad: '%' }),
                pista: 'Divide, resta a 1 y multiplica por 100.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el rendimiento nuevo',
                queHacemos: 'Repetimos con la fuente caliente subida.',
                paraQue: 'Al aumentar Tc, el cociente Tf/Tc baja y el rendimiento sube.',
                queda: 'e nuevo = ' + F.n(100 * e2, 1) + '%',
                pregunta: 'Calcula 1 &minus; ' + Tf4 + '/' + (Tc4 + sube) + ', en porcentaje (1 decimal)',
                resp: R.numero(100 * e2, { dec: 1, tol: 0.2, unidad: '%' }),
                pista: 'Mismo calculo con la temperatura nueva.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la mejora',
                queHacemos: 'Restamos los dos rendimientos.',
                paraQue: 'Asi se ve cuantos puntos porcentuales se ganan por subir ' + sube + ' K la fuente caliente.',
                queda: 'Mejora de ' + F.n(100 * (e2 - e1), 1) + ' puntos',
                pregunta: 'Calcula ' + F.n(100 * e2, 1) + ' &minus; ' + F.n(100 * e1, 1) + ' (1 decimal)',
                resp: R.numero(100 * (e2 - e1), { dec: 1, tol: 0.3, unidad: '%' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: la otra opcion',
                queHacemos: 'Pensamos en bajar el foco frio.',
                paraQue: 'Tambien subiria el rendimiento, pero el foco frio suele ser el ambiente, y enfriarlo cuesta energia. Por eso en la practica casi siempre se sube el caliente.',
                queda: 'Mejor subir Tc que bajar Tf',
                pregunta: '&iquest;Por que se prefiere subir el foco caliente a enfriar el frio?',
                resp: R.opcion(['Porque el foco frio suele ser el ambiente y enfriarlo cuesta energia',
                  'Porque bajar el foco frio no cambia el rendimiento'], 0),
                pista: 'Enfriar por debajo del ambiente exige un refrigerador, que consume.',
                despues: ''
              }
            ],
            final: 'El rendimiento maximo pasa de <b>' + F.n(100 * e1, 1) + '%</b> a <b>' + F.n(100 * e2, 1) + '%</b>',
            receta: ['e = 1 &minus; Tf / Tc con las dos parejas de temperaturas',
              'Restar para ver la mejora',
              'Subir Tc o bajar Tf mejoran el rendimiento',
              'Bajar Tf suele ser inviable: el foco frio es el ambiente']
          });
          enun = 'Una maquina trabaja entre ' + Tc4 + ' K y ' + Tf4 + ' K. Se sube la fuente caliente a ' +
            (Tc4 + sube) + ' K.<br>&iquest;Cual es ahora su rendimiento maximo, en porcentaje? (1 decimal)';
          resp = R.numero(100 * e2, { dec: 1, tol: 0.2, unidad: '%' });
          pistas = ['Carnot otra vez: e = 1 &minus; Tf / Tc, con la temperatura caliente nueva.',
            'Tc pasa a ser ' + (Tc4 + sube) + ' K.'];
          sol = ['Antes: e = 1 &minus; ' + Tf4 + '/' + Tc4 + ' = ' + F.n(100 * e1, 1) + '%',
            'Ahora: e = 1 &minus; ' + Tf4 + '/' + (Tc4 + sube),
            'e = <b>' + F.n(100 * e2, 1) + '%</b>, una mejora de ' + F.n(100 * (e2 - e1), 1) + ' puntos'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
