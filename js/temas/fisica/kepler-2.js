/* Segunda ley de Kepler: la ley de las areas. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  function dibujoAreas() {
    return F.svg(270, 150,
      '<ellipse cx="135" cy="75" rx="115" ry="60" fill="none"/>' +
      '<circle cx="55" cy="75" r="6" fill="currentColor" stroke="none"/>' +
      /* sector cerca del Sol: corto y ancho */
      '<path d="M55 75 L22 58 A115 60 0 0 1 30 96 Z" fill="currentColor" opacity="0.25" stroke="none"/>' +
      /* sector lejos del Sol: largo y estrecho */
      '<path d="M55 75 L238 62 A115 60 0 0 1 236 90 Z" fill="currentColor" opacity="0.25" stroke="none"/>' +
      F.txtSvg(40, 62, 'Sol') +
      F.txtSvg(12, 120, 'rapido') +
      F.txtSvg(210, 120, 'lento'));
  }

  var extra = {};

  /* ---------------- velocidades en perihelio y afelio ---------------- */
  extra.velocidades = function (r) {
    var rp = r.elige([0.9, 1.0, 1.2, 1.5, 2.0]);
    var factor = r.elige([1.5, 2, 2.5, 3, 4]);
    var ra = rp * factor;
    var vp = r.elige([20, 25, 30, 35, 40]);
    var va = vp / factor;
    return {
      guia: G({
        intro: 'Un planeta pasa por el perihelio a <b>' + rp + ' UA</b> del Sol con una velocidad de ' +
          '<b>' + vp + ' km/s</b>, y por el afelio a <b>' + F.n(ra, 2) + ' UA</b>.<br>' +
          'La segunda ley dice que barre <b>areas iguales en tiempos iguales</b>. De ahi sale una regla muy util: ' +
          'cuando esta lejos va lento, y cuando esta cerca va rapido.',
        tablero: function () { return dibujoAreas(); },
        pasos: [
          {
            seccion: 'Paso 1: que significa barrer areas iguales',
            queHacemos: 'Interpretamos el dibujo.',
            paraQue: 'Los dos sectores sombreados tienen la MISMA area y se barren en el mismo tiempo. Cerca del Sol el sector es corto y ancho; lejos, largo y estrecho.',
            queda: 'cerca va rapido, lejos va lento',
            pregunta: 'Si en el mismo tiempo barre la misma area, &iquest;donde va mas rapido?',
            resp: R.opcion(['Cerca del Sol', 'Lejos del Sol'], 0),
            pista: 'Cerca, el radio es corto: para cubrir la misma area tiene que recorrer mas arco.',
            despues: 'Por eso los planetas no giran a velocidad constante.'
          },
          {
            seccion: 'Paso 2: la relacion con numeros',
            queHacemos: 'Escribimos la regla del perihelio y el afelio.',
            paraQue: 'En esos dos puntos el movimiento es perpendicular al radio, y la ley se simplifica a r&middot;v = constante.',
            queda: '(' + rp + ')(' + vp + ') = (' + F.n(ra, 2) + ')(v)',
            pregunta: 'En perihelio y afelio se cumple una relacion sencilla. &iquest;Cual?',
            resp: R.opcion(['r<sub>p</sub> v<sub>p</sub> = r<sub>a</sub> v<sub>a</sub>', 'r<sub>p</sub> / v<sub>p</sub> = r<sub>a</sub> / v<sub>a</sub>'], 0),
            pista: 'Si la distancia se hace mayor, la velocidad tiene que hacerse menor: van al reves, o sea que su producto se mantiene.',
            despues: 'Producto constante quiere decir que uno sube cuando el otro baja.'
          },
          {
            seccion: 'Paso 3: cuantas veces mas lejos',
            queHacemos: 'Dividimos las dos distancias.',
            paraQue: 'Ese factor es justo el que va a dividir a la velocidad.',
            queda: 'esta ' + factor + ' veces mas lejos',
            pregunta: 'Calcula ' + F.n(ra, 2) + ' / ' + rp + ' (2 decimales)',
            resp: R.numero(factor, { dec: 2, tol: 0.02 }),
            pista: 'Division directa.',
            despues: 'En el afelio esta ' + factor + ' veces mas lejos que en el perihelio.'
          },
          {
            seccion: 'Paso 4: la velocidad en el afelio',
            queHacemos: 'Dividimos la velocidad entre ese mismo factor.',
            paraQue: 'Como r&middot;v se mantiene, si la distancia se multiplica por ' + factor + ', la velocidad se divide entre ' + factor + '.',
            queda: 'v en el afelio = ' + F.n(va, 2) + ' km/s',
            pregunta: 'Calcula ' + vp + ' / ' + factor + ' (2 decimales)',
            resp: R.numero(va, { dec: 2, tol: 0.05, unidad: 'km/s' }),
            pista: 'Division directa.',
            despues: 'Mucho mas lento, como manda la segunda ley.'
          }
        ],
        final: 'En el afelio va a <b>' + F.n(va, 2) + ' km/s</b>',
        receta: ['Areas iguales en tiempos iguales',
          'Cerca del Sol rapido, lejos lento',
          'En perihelio y afelio: r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>',
          'Si la distancia se multiplica, la velocidad se divide por lo mismo']
      }),
      enunciado: 'Un planeta pasa por el perihelio a ' + rp + ' UA con ' + vp + ' km/s, ' +
        'y por el afelio a ' + F.n(ra, 2) + ' UA.<br>&iquest;Con que velocidad pasa por el afelio? (2 decimales)' +
        dibujoAreas(),
      respuesta: R.numero(va, { dec: 2, tol: 0.05, unidad: 'km/s' }),
      pistas: ['En perihelio y afelio se cumple r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>.',
        'Esta ' + factor + ' veces mas lejos, asi que ira ' + factor + ' veces mas lento.'],
      solucion: ['La segunda ley da r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>',
        '(' + rp + ')(' + vp + ') = (' + F.n(ra, 2) + ')(v<sub>a</sub>)',
        'v<sub>a</sub> = ' + vp + ' / ' + factor + ' = <b>' + F.n(va, 2) + ' km/s</b>']
    };
  };

  EJ.tema({
    id: 'kepler-2',
    materia: 'fisica',
    grupo: 'Gravitacion',
    nombre: 'Segunda ley de Kepler (areas)',
    descripcion: 'Areas iguales en tiempos iguales: por que los planetas van mas rapido cerca del Sol.',
    etiquetas: ['kepler', 'areas', 'velocidad orbital', 'perihelio'],
    formulario: '<b>Segunda ley:</b> la linea que une el planeta con el Sol barre <b>areas iguales ' +
      'en tiempos iguales</b>.<br>' +
      'Consecuencia: cerca del Sol el planeta va <b>mas rapido</b>; lejos, mas lento.<br>' +
      'En el perihelio y el afelio: r<sub>p</sub> v<sub>p</sub> = r<sub>a</sub> v<sub>a</sub><br>' +
      '<small>Solo vale en esos dos puntos, donde la velocidad es perpendicular al radio.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['dondeRapido', 'Donde va mas rapido'],
          ['queDice', 'Que dice la ley'],
          ['estaciones', 'Duracion de las estaciones']
        ]);

        if (tf === 'dondeRapido') {
          guiaDelPaso = G({
            intro: 'Un planeta recorre su orbita eliptica alrededor del Sol.<br>' +
              '&iquest;Va siempre a la misma velocidad? La respuesta es que no, y la segunda ley dice exactamente ' +
              'donde va rapido y donde lento.',
            tablero: function () { return dibujoAreas(); },
            pasos: [
              {
                seccion: 'Paso 1: la idea de las areas',
                queHacemos: 'Miramos los dos sectores sombreados.',
                paraQue: 'Los dos tienen la misma area y se barren en el mismo tiempo. Uno es corto y ancho, el otro largo y estrecho.',
                queda: 'misma area en el mismo tiempo',
                pregunta: 'Segun la segunda ley, &iquest;que es lo que se mantiene constante?',
                resp: R.opcion(['El area barrida por unidad de tiempo', 'La velocidad del planeta'], 0),
                pista: 'Si la velocidad fuera constante, la ley no diria nada nuevo.',
                despues: 'Lo constante es el area por segundo, no la velocidad.'
              },
              {
                seccion: 'Paso 2: deducir donde va rapido',
                queHacemos: 'Pensamos que pasa cuando el radio es corto.',
                paraQue: 'Con un radio corto, para cubrir la misma area hace falta un arco mucho mas largo. Y recorrer mas en el mismo tiempo es ir mas rapido.',
                queda: 'mas rapido cerca del Sol',
                pregunta: '&iquest;Donde va mas rapido el planeta?',
                resp: R.opcion(['Cerca del Sol (perihelio)', 'Lejos del Sol (afelio)'], 0),
                pista: 'Fijate en el sector de la izquierda del dibujo: es cortito de radio pero muy ancho de arco.',
                despues: 'La Tierra va mas rapido en enero, que es cuando esta mas cerca del Sol.'
              }
            ],
            final: 'Va <b>mas rapido cerca del Sol</b>',
            receta: ['Areas iguales en tiempos iguales',
              'Radio corto obliga a un arco largo: mas rapido',
              'Radio largo permite un arco corto: mas lento',
              'La velocidad orbital NO es constante']
          });
          enun = 'Segun la segunda ley de Kepler, &iquest;en que parte de su orbita va mas rapido un planeta?';
          resp = R.opcion(['Cerca del Sol (perihelio)', 'Lejos del Sol (afelio)'], 0);
          pistas = ['La linea planeta-Sol barre areas iguales en tiempos iguales.',
            'Con el radio corto hace falta recorrer mas arco para cubrir la misma area.'];
          sol = ['La ley dice que se barren areas iguales en tiempos iguales',
            'Cerca del Sol el radio es corto, asi que el arco tiene que ser largo',
            'Por eso el planeta va <b>mas rapido cerca del Sol</b>'];

        } else if (tf === 'queDice') {
          var op = r.elige([
            { q: '&iquest;Que barre la linea que une el planeta con el Sol?',
              ok: 'Areas iguales en tiempos iguales', mal: 'Distancias iguales en tiempos iguales',
              por: 'lo que se mantiene constante es el AREA por unidad de tiempo, no la distancia recorrida' },
            { q: 'Un planeta, &iquest;gira a velocidad constante?',
              ok: 'No: va cambiando a lo largo de la orbita', mal: 'Si, siempre a la misma velocidad',
              por: 'acelera al acercarse al Sol y frena al alejarse' },
            { q: '&iquest;En que punto de su orbita va mas lento un planeta?',
              ok: 'En el afelio, lo mas lejos del Sol', mal: 'En el perihelio, lo mas cerca',
              por: 'con el radio largo le basta un arco corto para barrer la misma area' },
            { q: 'Si la orbita fuera un circulo perfecto, &iquest;que pasaria?',
              ok: 'La velocidad seria constante', mal: 'El planeta seguiria acelerando y frenando',
              por: 'la distancia al Sol no cambiaria nunca, asi que tampoco la velocidad' }
          ]);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre que dice exactamente la <b>ley de las areas</b>.<br>' +
              'Es la menos intuitiva de las tres leyes de Kepler, pero la idea es simple: ' +
              'lo que se mantiene constante no es la velocidad, sino el <b>area barrida por segundo</b>.',
            pasos: [
              {
                seccion: 'Paso 1: que se conserva',
                queHacemos: 'Fijamos la idea central.',
                paraQue: 'Casi todos los errores vienen de creer que lo constante es la velocidad o la distancia recorrida.',
                queda: 'el area por segundo es constante',
                pregunta: '&iquest;Que magnitud se mantiene constante?',
                resp: R.opcion(['El area barrida por unidad de tiempo', 'La velocidad del planeta'], 0),
                pista: 'La ley se llama justamente "ley de las areas".',
                despues: ''
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + op.por + '.',
                queda: op.ok,
                pregunta: op.q,
                resp: R.opcion([op.ok, op.mal], 0),
                pista: 'Piensa en el area, no en la velocidad.',
                despues: ''
              }
            ],
            final: '<b>' + op.ok + '</b>',
            receta: ['Lo constante es el AREA por unidad de tiempo',
              'La velocidad cambia: rapido cerca, lento lejos',
              'En una orbita circular si seria constante',
              'Mas lento en el afelio, mas rapido en el perihelio']
          });
          enun = op.q;
          resp = R.opcion([op.ok, op.mal], 0);
          pistas = ['Lo que se mantiene constante es el area barrida por unidad de tiempo.',
            'Aqui ' + op.por + '.'];
          sol = ['La segunda ley habla de AREAS, no de velocidad ni de distancia',
            'Aqui ' + op.por,
            'Respuesta: <b>' + op.ok + '</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'En el hemisferio norte, el <b>verano dura unos dias mas</b> que el invierno.<br>' +
              'No es casualidad ni un error del calendario: es una consecuencia directa de la segunda ley.',
            pasos: [
              {
                seccion: 'Paso 1: cuando esta mas cerca',
                queHacemos: 'Recordamos un dato que sorprende.',
                paraQue: 'La Tierra esta MAS CERCA del Sol en enero, en pleno invierno del norte. Las estaciones no las causa la distancia, sino la inclinacion del eje.',
                queda: 'mas cerca en enero (invierno del norte)',
                pregunta: '&iquest;Cuando esta la Tierra mas cerca del Sol?',
                resp: R.opcion(['En enero, durante el invierno del hemisferio norte',
                  'En julio, durante el verano del hemisferio norte'], 0),
                pista: 'Las estaciones se deben a la inclinacion del eje, no a la distancia.',
                despues: 'Por eso el invierno del norte ocurre cerca del perihelio.'
              },
              {
                seccion: 'Paso 2: como va de rapido entonces',
                queHacemos: 'Aplicamos la ley de las areas.',
                paraQue: 'Cerca del Sol la Tierra va mas rapido, asi que recorre esa parte de la orbita en menos dias.',
                queda: 'en enero va mas rapido',
                pregunta: 'Estando cerca del Sol, &iquest;como se mueve la Tierra?',
                resp: R.opcion(['Mas rapido', 'Mas lento'], 0),
                pista: 'Segunda ley: cerca, rapido.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la consecuencia',
                queHacemos: 'Juntamos las dos cosas.',
                paraQue: 'Si atraviesa mas rapido el tramo del invierno del norte, ese invierno dura menos dias. Y el verano, que ocurre lejos del Sol, dura mas.',
                queda: 'el verano del norte dura mas',
                pregunta: '&iquest;Por que el verano del norte dura mas dias que el invierno?',
                resp: R.opcion(['Porque ocurre lejos del Sol, donde la Tierra va mas lenta',
                  'Porque el Sol calienta mas y alarga los dias'], 0),
                pista: 'Lejos del Sol la Tierra tarda mas en recorrer ese tramo de orbita.',
                despues: 'La diferencia es de unos 4 o 5 dias.'
              }
            ],
            final: 'El verano del norte dura mas porque <b>ocurre lejos del Sol, donde la Tierra va mas lenta</b>',
            receta: ['La Tierra esta mas cerca del Sol en enero',
              'Cerca del Sol va mas rapido: ese tramo dura menos',
              'Lejos va mas lento: ese tramo dura mas',
              'Las estaciones las causa la inclinacion del eje, no la distancia']
          });
          enun = 'En el hemisferio norte el verano dura unos dias mas que el invierno.<br>&iquest;Por que?';
          resp = R.opcion(['Porque ocurre lejos del Sol, donde la Tierra se mueve mas lenta',
            'Porque el Sol calienta mas y eso alarga los dias'], 0);
          pistas = ['La Tierra esta mas cerca del Sol en enero, no en julio.',
            'Segun la segunda ley, cerca del Sol va mas rapido y tarda menos en recorrer ese tramo.'];
          sol = ['La Tierra pasa por el perihelio en enero (invierno del norte)',
            'Cerca del Sol va mas rapido, asi que atraviesa antes ese tramo',
            'El verano del norte cae cerca del afelio, donde va mas lenta: <b>dura mas dias</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['velocidades', 'Velocidad en perihelio y afelio'],
          ['proporcion', 'Cuantas veces mas rapido'],
          ['areaEnTiempo', 'Area barrida']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        if (t2 === 'proporcion') {
          var rp2 = r.elige([0.5, 0.8, 1.0, 1.5]);
          var fac = r.elige([2, 3, 4, 5]);
          var ra2 = rp2 * fac;
          guiaDelPaso = G({
            intro: 'Un planeta esta a <b>' + rp2 + ' UA</b> en el perihelio y a <b>' + F.n(ra2, 2) + ' UA</b> ' +
              'en el afelio.<br>' +
              'Sin saber ninguna velocidad concreta, se puede decir <b>cuantas veces</b> mas rapido va en un ' +
              'punto que en el otro.',
            pasos: [
              {
                seccion: 'Paso 1: cuantas veces mas lejos',
                queHacemos: 'Dividimos las distancias.',
                paraQue: 'Lo que importa no son los valores sueltos sino su proporcion.',
                queda: 'esta ' + fac + ' veces mas lejos',
                pregunta: 'Calcula ' + F.n(ra2, 2) + ' / ' + rp2 + ' (2 decimales)',
                resp: R.numero(fac, { dec: 2, tol: 0.02 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: que le pasa a la velocidad',
                queHacemos: 'Aplicamos que r&middot;v se mantiene.',
                paraQue: 'Distancia y velocidad son inversamente proporcionales en esos dos puntos: si una se multiplica por ' + fac + ', la otra se divide entre ' + fac + '.',
                queda: 'va ' + fac + ' veces mas rapido en el perihelio',
                pregunta: 'Si en el afelio esta ' + fac + ' veces mas lejos, &iquest;como es su velocidad ahi?',
                resp: R.opcion([fac + ' veces menor', fac + ' veces mayor'], 0),
                pista: 'r&middot;v constante: si r sube, v baja.',
                despues: 'O dicho al reves: en el perihelio va ' + fac + ' veces mas rapido.'
              },
              {
                seccion: 'Paso 3: comprobar con un caso',
                queHacemos: 'Probamos con un numero cualquiera.',
                paraQue: 'Verificar con un ejemplo concreto es la mejor forma de asegurarse de que la proporcion va en el sentido correcto.',
                queda: 'v perihelio = ' + fac + ' &times; v afelio',
                pregunta: 'Si en el afelio fuera a 10 km/s, &iquest;a cuanto iria en el perihelio? (2 decimales)',
                resp: R.numero(10 * fac, { dec: 2, tol: 0.05, unidad: 'km/s' }),
                pista: fac + ' veces mas rapido.',
                despues: 'Cuadra: mas cerca, mas rapido.'
              }
            ],
            final: 'En el perihelio va <b>' + fac + ' veces mas rapido</b> que en el afelio',
            receta: ['r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>',
              'Distancia y velocidad van al reves',
              'La proporcion de velocidades es la inversa de la de distancias',
              'Comprobar con un numero concreto']
          });
          enun = 'Un planeta esta a ' + rp2 + ' UA en el perihelio y a ' + F.n(ra2, 2) + ' UA en el afelio.<br>' +
            '&iquest;Cuantas veces mas rapido va en el perihelio? (2 decimales)';
          resp = R.numero(fac, { dec: 2, tol: 0.02 });
          pistas = ['En esos dos puntos se cumple r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>.',
            'La proporcion de velocidades es la inversa de la de distancias.'];
          sol = ['r<sub>p</sub>v<sub>p</sub> = r<sub>a</sub>v<sub>a</sub>, asi que v<sub>p</sub>/v<sub>a</sub> = r<sub>a</sub>/r<sub>p</sub>',
            'r<sub>a</sub>/r<sub>p</sub> = ' + F.n(ra2, 2) + ' / ' + rp2,
            'Va <b>' + fac + ' veces mas rapido</b> en el perihelio'];

        } else {
          var area = r.elige([20, 30, 40, 50]);
          var dias = r.elige([10, 15, 20, 30]);
          var dias2 = dias * r.elige([2, 3, 4]);
          var area2 = area * dias2 / dias;
          guiaDelPaso = G({
            intro: 'Un planeta barre <b>' + area + ' millones de km&sup2;</b> en <b>' + dias + ' dias</b>.<br>' +
              'Queremos saber cuanta area barre en <b>' + dias2 + ' dias</b>. Con la segunda ley esto es ' +
              'una simple regla de tres, y da igual en que parte de la orbita este.',
            pasos: [
              {
                seccion: 'Paso 1: el area por dia',
                queHacemos: 'Dividimos area entre tiempo.',
                paraQue: 'Ese cociente es lo que la segunda ley dice que se mantiene constante durante toda la orbita.',
                queda: F.n(area / dias, 3) + ' millones de km&sup2; por dia',
                pregunta: 'Calcula ' + area + ' / ' + dias + ' (3 decimales)',
                resp: R.numero(area / dias, { dec: 3, tol: 0.01 }),
                pista: 'Division directa.',
                despues: 'Ese ritmo no cambia en ningun momento de la orbita.'
              },
              {
                seccion: 'Paso 2: proporcion directa',
                queHacemos: 'Multiplicamos ese ritmo por el tiempo nuevo.',
                paraQue: 'Como el ritmo es constante, area y tiempo son directamente proporcionales: al triple de tiempo, el triple de area.',
                queda: F.n(area2, 2) + ' millones de km&sup2;',
                pregunta: 'Calcula ' + F.n(area / dias, 3) + ' &times; ' + dias2 + ' (2 decimales)',
                resp: R.numero(area2, { dec: 2, tol: 0.1 }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: donde de la orbita',
                queHacemos: 'Comprobamos si hace falta saber la posicion.',
                paraQue: 'Aqui esta la gracia de la ley: NO importa si esta cerca o lejos del Sol. El area por dia es la misma en todas partes.',
                queda: 'da igual en que parte de la orbita',
                pregunta: '&iquest;Hace falta saber si el planeta esta cerca o lejos del Sol?',
                resp: R.opcion(['No: el area por dia es siempre la misma', 'Si: cerca barre mas area'], 0),
                pista: 'Eso es justamente lo que afirma la segunda ley.',
                despues: ''
              }
            ],
            final: 'Barre <b>' + F.n(area2, 2) + ' millones de km&sup2;</b>',
            receta: ['El area por unidad de tiempo es constante',
              'Area y tiempo son directamente proporcionales',
              'Es una regla de tres',
              'No importa en que parte de la orbita este']
          });
          enun = 'Un planeta barre ' + area + ' millones de km&sup2; en ' + dias + ' dias.<br>' +
            '&iquest;Cuanta area barre en ' + dias2 + ' dias? (2 decimales)';
          resp = R.numero(area2, { dec: 2, tol: 0.1 });
          pistas = ['El area barrida por unidad de tiempo es constante.',
            'Es una regla de tres: ' + area + ' es a ' + dias + ' como x es a ' + dias2 + '.'];
          sol = ['La segunda ley dice que el area por dia no cambia',
            'Area por dia = ' + area + '/' + dias + ' = ' + F.n(area / dias, 3),
            'En ' + dias2 + ' dias: ' + F.n(area / dias, 3) + ' &times; ' + dias2 + ' = <b>' + F.n(area2, 2) + '</b> millones de km&sup2;'];
        }

      } else {
        var t3 = r.subtema([
          ['velocidades', 'Velocidad en perihelio y afelio'],
          ['desdeAE', 'A partir de a y e'],
          ['porQue', 'Por que ocurre']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'desdeAE') {
          var aa = r.elige([1, 1.5, 2, 3, 5]);
          var ee = r.elige([0.2, 0.3, 0.4, 0.5, 0.6]);
          var vpe = r.elige([20, 25, 30, 35]);
          var rel = (1 + ee) / (1 - ee);
          var vaf = vpe / rel;
          guiaDelPaso = G({
            intro: 'Una orbita tiene <b>a = ' + aa + ' UA</b> y <b>e = ' + ee + '</b>. En el perihelio el planeta ' +
              'va a <b>' + vpe + ' km/s</b>.<br>' +
              'Aqui hay que juntar las <b>dos primeras leyes</b>: la primera da las distancias y la segunda ' +
              'las velocidades.',
            pasos: [
              {
                seccion: 'Paso 1: las dos distancias',
                queHacemos: 'Aplicamos la primera ley.',
                paraQue: 'Sin el perihelio y el afelio no se puede usar la segunda ley. Primero hay que saber entre que distancias se mueve.',
                queda: 'perihelio ' + F.n(aa * (1 - ee), 3) + ',  afelio ' + F.n(aa * (1 + ee), 3) + ' UA',
                pregunta: 'Calcula el perihelio: ' + aa + '(1 &minus; ' + ee + ') (3 decimales)',
                resp: R.numero(aa * (1 - ee), { dec: 3, tol: 0.01, unidad: 'UA' }),
                pista: '1 &minus; ' + ee + ' = ' + F.n(1 - ee, 2) + '.',
                despues: 'Y el afelio es ' + aa + '(1 + ' + ee + ') = ' + F.n(aa * (1 + ee), 3) + ' UA.'
              },
              {
                seccion: 'Paso 2: la proporcion de distancias',
                queHacemos: 'Dividimos afelio entre perihelio.',
                paraQue: 'Al dividir, la a se cancela: la proporcion depende SOLO de la excentricidad. Queda (1+e)/(1&minus;e).',
                queda: 'el afelio esta ' + F.n(rel, 3) + ' veces mas lejos',
                pregunta: 'Calcula (1 + ' + ee + ') / (1 &minus; ' + ee + ') (3 decimales)',
                resp: R.numero(rel, { dec: 3, tol: 0.01 }),
                pista: F.n(1 + ee, 2) + ' / ' + F.n(1 - ee, 2) + '.',
                despues: 'El tamano de la orbita no influye en esta proporcion.'
              },
              {
                seccion: 'Paso 3: la velocidad en el afelio',
                queHacemos: 'Dividimos la velocidad entre esa proporcion.',
                paraQue: 'Segunda ley: si la distancia se multiplica por ese factor, la velocidad se divide entre el.',
                queda: 'v afelio = ' + F.n(vaf, 2) + ' km/s',
                pregunta: 'Calcula ' + vpe + ' / ' + F.n(rel, 3) + ' (2 decimales)',
                resp: R.numero(vaf, { dec: 2, tol: 0.1, unidad: 'km/s' }),
                pista: 'Division directa.',
                despues: 'Cuanto mayor sea la excentricidad, mayor la diferencia entre las dos velocidades.'
              }
            ],
            final: 'En el afelio va a <b>' + F.n(vaf, 2) + ' km/s</b>',
            receta: ['Primera ley: perihelio a(1&minus;e), afelio a(1+e)',
              'Su proporcion es (1+e)/(1&minus;e), sin la a',
              'Segunda ley: la velocidad va a la inversa',
              'Mas excentricidad, mas diferencia de velocidades']
          });
          enun = 'Una orbita tiene a = ' + aa + ' UA y e = ' + ee + '. En el perihelio el planeta va a ' + vpe + ' km/s.<br>' +
            '&iquest;Con que velocidad pasa por el afelio? (2 decimales)';
          resp = R.numero(vaf, { dec: 2, tol: 0.1, unidad: 'km/s' });
          pistas = ['Primero saca perihelio y afelio con la primera ley.',
            'Su proporcion es (1+e)/(1&minus;e) = ' + F.n(rel, 3) + ', y la velocidad va a la inversa.'];
          sol = ['Perihelio = ' + aa + '(1&minus;' + ee + ') = ' + F.n(aa * (1 - ee), 3) + ' UA',
            'Afelio = ' + aa + '(1+' + ee + ') = ' + F.n(aa * (1 + ee), 3) + ' UA',
            'Proporcion: (1+e)/(1&minus;e) = ' + F.n(rel, 3),
            'v<sub>a</sub> = ' + vpe + ' / ' + F.n(rel, 3) + ' = <b>' + F.n(vaf, 2) + ' km/s</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'Kepler descubrio esta ley mirando datos, sin saber por que pasaba.<br>' +
              'Hoy se entiende como una consecuencia de algo mas profundo: la <b>conservacion del momento angular</b>. ' +
              'La idea se parece mucho a la de una patinadora que gira.',
            pasos: [
              {
                seccion: 'Paso 1: la patinadora',
                queHacemos: 'Recordamos que pasa cuando encoge los brazos.',
                paraQue: 'Al acercar la masa al eje, gira mas rapido, sin que nadie la empuje. Es exactamente lo mismo que le pasa a un planeta.',
                queda: 'acercar la masa al centro acelera el giro',
                pregunta: 'Una patinadora que gira encoge los brazos. &iquest;Que le pasa?',
                resp: R.opcion(['Gira mas rapido', 'Gira mas lento'], 0),
                pista: 'Es un truco clasico del patinaje artistico.',
                despues: 'Nadie la empuja: es la conservacion del momento angular.'
              },
              {
                seccion: 'Paso 2: la misma idea en el planeta',
                queHacemos: 'Trasladamos la idea a la orbita.',
                paraQue: 'Acercarse al Sol es como encoger los brazos: el planeta queda mas cerca del centro de giro y por eso se acelera.',
                queda: 'acercarse al Sol acelera al planeta',
                pregunta: 'Un planeta que se acerca al Sol, &iquest;que hace?',
                resp: R.opcion(['Se acelera, como la patinadora', 'Mantiene su velocidad'], 0),
                pista: 'Se esta acercando al centro de giro.',
                despues: 'Y al alejarse, frena.'
              },
              {
                seccion: 'Paso 3: que se conserva',
                queHacemos: 'Ponemos nombre a la cantidad constante.',
                paraQue: 'El momento angular m&middot;r&middot;v se mantiene porque la gravedad apunta siempre hacia el Sol y no puede hacerlo girar mas o menos.',
                queda: 'se conserva m&middot;r&middot;v',
                pregunta: '&iquest;Que cantidad se conserva en la orbita?',
                resp: R.opcion(['El momento angular, m&middot;r&middot;v', 'La velocidad del planeta'], 0),
                pista: 'Es el producto de masa, distancia y velocidad.',
                despues: 'Como la masa no cambia, queda r&middot;v = constante: justo la segunda ley.'
              },
              {
                seccion: 'Paso 4: por que la gravedad no lo estropea',
                queHacemos: 'Vemos por que esa cantidad se mantiene.',
                paraQue: 'La gravedad tira siempre en linea recta hacia el Sol. Una fuerza asi puede cambiar la rapidez, pero no puede alterar el giro alrededor del Sol.',
                queda: 'la gravedad apunta al Sol y no cambia el giro',
                pregunta: '&iquest;Por que la gravedad no cambia el momento angular?',
                resp: R.opcion(['Porque apunta siempre directamente hacia el Sol',
                  'Porque es una fuerza muy debil'], 0),
                pista: 'Para cambiar un giro hace falta empujar de lado, no hacia el centro.',
                despues: ''
              }
            ],
            final: 'La segunda ley es la <b>conservacion del momento angular</b>: m&middot;r&middot;v constante',
            receta: ['Es el mismo efecto que la patinadora al encoger los brazos',
              'Se conserva el momento angular m&middot;r&middot;v',
              'La masa no cambia, asi que r&middot;v es constante',
              'La gravedad apunta al Sol y por eso no altera el giro']
          });
          enun = 'La segunda ley de Kepler es consecuencia de la conservacion de una cantidad.<br>&iquest;Cual?';
          resp = R.opcion(['El momento angular (m&middot;r&middot;v)', 'La energia cinetica'], 0);
          pistas = ['Piensa en la patinadora que gira mas rapido al encoger los brazos.',
            'Es el producto de masa, distancia al centro y velocidad.'];
          sol = ['Al acercarse al Sol, el planeta se acelera, como la patinadora al encoger los brazos',
            'Lo que se conserva es el <b>momento angular</b>: m&middot;r&middot;v',
            'Como la masa no cambia, queda r&middot;v = constante, que es la segunda ley',
            'Se conserva porque la gravedad apunta siempre hacia el Sol'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
