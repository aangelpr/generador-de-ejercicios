/* Primera ley de Kepler: las orbitas son elipses con el Sol en un foco. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  /* Datos reales aproximados, en unidades astronomicas. */
  var PLANETAS = [
    { n: 'Mercurio', a: 0.387, e: 0.2056 },
    { n: 'Venus', a: 0.723, e: 0.0068 },
    { n: 'la Tierra', a: 1.000, e: 0.0167 },
    { n: 'Marte', a: 1.524, e: 0.0934 },
    { n: 'Jupiter', a: 5.203, e: 0.0484 },
    { n: 'Saturno', a: 9.537, e: 0.0539 }
  ];

  function dibujoElipse(marcaFoco) {
    return F.svg(260, 150,
      '<ellipse cx="130" cy="75" rx="105" ry="62" fill="none"/>' +
      '<circle cx="45" cy="75" r="7" fill="currentColor" stroke="none"/>' +
      '<circle cx="215" cy="75" r="3" fill="none"/>' +
      '<line x1="25" y1="75" x2="235" y2="75" stroke-dasharray="4 3"/>' +
      F.txtSvg(30, 66, marcaFoco ? 'Sol' : '') +
      F.txtSvg(196, 66, marcaFoco ? 'foco' : '') +
      F.txtSvg(110, 100, marcaFoco ? 'centro' : ''));
  }

  var extra = {};

  /* ---------------- perihelio y afelio ---------------- */
  extra.periAfelio = function (r) {
    var p = r.elige(PLANETAS);
    var peri = p.a * (1 - p.e);
    var afel = p.a * (1 + p.e);
    return {
      guia: G({
        intro: 'La orbita de <b>' + p.n + '</b> tiene semieje mayor <b>a = ' + F.n(p.a, 3) + ' UA</b> ' +
          'y excentricidad <b>e = ' + F.n(p.e, 4) + '</b>.<br>' +
          'Como el Sol esta en un <b>foco</b> y no en el centro, la distancia al Sol <b>cambia</b> a lo largo del ano. ' +
          'Queremos los dos extremos: el punto mas cercano (perihelio) y el mas lejano (afelio).',
        tablero: function () { return dibujoElipse(true); },
        pasos: [
          {
            seccion: 'Paso 1: por que cambia la distancia',
            queHacemos: 'Recordamos donde esta el Sol.',
            paraQue: 'Si el Sol estuviera en el CENTRO la distancia seria siempre la misma. Esta en un FOCO, que esta desplazado, y por eso hay un lado cercano y otro lejano.',
            queda: 'hay un punto cercano y otro lejano',
            pregunta: 'Segun la primera ley de Kepler, &iquest;donde esta el Sol?',
            resp: R.opcion(['En uno de los focos de la elipse', 'En el centro de la elipse'], 0),
            pista: 'Si estuviera en el centro, la orbita seria un circulo y la distancia nunca cambiaria.',
            despues: 'Por eso hay estaciones del ano en la distancia al Sol.'
          },
          {
            seccion: 'Paso 2: el perihelio',
            queHacemos: 'Calculamos a(1 &minus; e).',
            paraQue: 'La excentricidad mide cuanto se corre el foco respecto al centro. Restandola sale el lado corto.',
            queda: 'perihelio ' + F.n(peri, 4) + ' UA,  afelio ?',
            pregunta: 'Calcula ' + F.n(p.a, 3) + ' &times; (1 &minus; ' + F.n(p.e, 4) + ') (4 decimales)',
            resp: R.numero(peri, { dec: 4, tol: 0.002, unidad: 'UA' }),
            pista: 'Primero 1 &minus; ' + F.n(p.e, 4) + ' = ' + F.n(1 - p.e, 4) + ', luego por ' + F.n(p.a, 3) + '.',
            despues: 'Ese es el punto mas cercano al Sol.'
          },
          {
            seccion: 'Paso 3: el afelio',
            queHacemos: 'Ahora a(1 + e).',
            paraQue: 'Mismo calculo pero sumando: el foco esta corrido hacia un lado, asi que el otro lado queda mas lejos.',
            queda: 'perihelio ' + F.n(peri, 4) + ',  afelio ' + F.n(afel, 4) + ' UA',
            pregunta: 'Calcula ' + F.n(p.a, 3) + ' &times; (1 + ' + F.n(p.e, 4) + ') (4 decimales)',
            resp: R.numero(afel, { dec: 4, tol: 0.002, unidad: 'UA' }),
            pista: '1 + ' + F.n(p.e, 4) + ' = ' + F.n(1 + p.e, 4) + ', por ' + F.n(p.a, 3) + '.',
            despues: ''
          },
          {
            seccion: 'Paso 4: comprobar',
            queHacemos: 'Promediamos los dos y vemos que sale.',
            paraQue: 'El promedio del perihelio y el afelio da exactamente el semieje mayor. Es una comprobacion rapida y segura.',
            queda: 'promedio = ' + F.n(p.a, 3) + ' UA = el semieje mayor',
            pregunta: 'Calcula (' + F.n(peri, 4) + ' + ' + F.n(afel, 4) + ') / 2 (3 decimales)',
            resp: R.numero(p.a, { dec: 3, tol: 0.003, unidad: 'UA' }),
            pista: 'Deberia darte justo el semieje mayor.',
            despues: 'Coincide: el semieje mayor es el promedio de las dos distancias extremas.'
          }
        ],
        final: 'Perihelio <b>' + F.n(peri, 4) + ' UA</b> y afelio <b>' + F.n(afel, 4) + ' UA</b>',
        receta: ['El Sol esta en un FOCO, no en el centro',
          'Perihelio (mas cerca) = a(1 &minus; e)',
          'Afelio (mas lejos) = a(1 + e)',
          'Comprobacion: el promedio de los dos da a']
      }),
      enunciado: 'La orbita de ' + p.n + ' tiene a = ' + F.n(p.a, 3) + ' UA y e = ' + F.n(p.e, 4) + '.<br>' +
        'Calcula su perihelio y su afelio (4 decimales).' + dibujoElipse(true),
      respuesta: R.varios([
        { etiqueta: 'Perihelio (UA)', resp: R.numero(peri, { dec: 4, tol: 0.002 }) },
        { etiqueta: 'Afelio (UA)', resp: R.numero(afel, { dec: 4, tol: 0.002 }) }
      ]),
      pistas: ['El Sol esta en un foco, asi que la distancia varia entre dos extremos.',
        'Perihelio = a(1 &minus; e) y afelio = a(1 + e).'],
      solucion: ['El Sol ocupa un foco de la elipse',
        'Perihelio = ' + F.n(p.a, 3) + '(1 &minus; ' + F.n(p.e, 4) + ') = <b>' + F.n(peri, 4) + ' UA</b>',
        'Afelio = ' + F.n(p.a, 3) + '(1 + ' + F.n(p.e, 4) + ') = <b>' + F.n(afel, 4) + ' UA</b>',
        'Comprobacion: su promedio da ' + F.n(p.a, 3) + ' UA, el semieje mayor']
    };
  };

  EJ.tema({
    id: 'kepler-1',
    materia: 'fisica',
    grupo: 'Gravitacion',
    nombre: 'Primera ley de Kepler (orbitas)',
    descripcion: 'Las orbitas son elipses con el Sol en un foco: perihelio, afelio y excentricidad.',
    etiquetas: ['kepler', 'orbita', 'elipse', 'perihelio', 'afelio'],
    formulario: '<b>Primera ley:</b> los planetas describen <b>elipses</b> y el Sol ocupa <b>uno de los focos</b> ' +
      '(no el centro).<br>' +
      'Perihelio (minima distancia) = a(1 &minus; e)<br>' +
      'Afelio (maxima distancia) = a(1 + e)<br>' +
      'a = semieje mayor = promedio del perihelio y el afelio<br>' +
      'e = excentricidad = (afelio &minus; perihelio) / (afelio + perihelio)<br>' +
      '<small>e = 0 es un circulo perfecto; cuanto mas cerca de 1, mas alargada la orbita.<br>' +
      '1 UA = distancia media Tierra-Sol &asymp; 150 millones de km.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['forma', 'Que forma tiene la orbita'],
          ['dondeSol', 'Donde esta el Sol'],
          ['excentricidad', 'Que significa la excentricidad']
        ]);

        if (tf === 'forma') {
          guiaDelPaso = G({
            intro: 'Antes de Kepler todo el mundo daba por hecho que las orbitas eran <b>circulos perfectos</b>: ' +
              'parecia lo mas natural y lo mas bello.<br>' +
              'Kepler paso anos peleandose con los datos de Marte hasta aceptar que no cuadraban con un circulo.',
            pasos: [
              {
                seccion: 'Paso 1: la forma',
                queHacemos: 'Recordamos que figura describen los planetas.',
                paraQue: 'Fue un cambio enorme: hasta entonces se creia que los cielos tenian que ser perfectamente circulares.',
                queda: 'son elipses',
                pregunta: 'Segun la primera ley, &iquest;que forma tienen las orbitas?',
                resp: R.opcion(['Elipses', 'Circulos perfectos'], 0),
                pista: 'Kepler llego a esta conclusion a la fuerza: era la unica figura que cuadraba con las medidas de Marte.',
                despues: 'Una elipse es como un circulo achatado.'
              },
              {
                seccion: 'Paso 2: cuanto se achatan',
                queHacemos: 'Vemos que tan alargadas son de verdad.',
                paraQue: 'Aqui hay una trampa: los dibujos de los libros exageran muchisimo. La orbita de la Tierra, dibujada a escala, se ve como un circulo.',
                queda: 'elipses, pero casi circulares',
                pregunta: 'Las orbitas de los planetas, &iquest;son muy alargadas?',
                resp: R.opcion(['No: son elipses muy poco achatadas, casi circulos',
                  'Si: son claramente ovaladas'], 0),
                pista: 'La Tierra tiene e = 0.0167, que es practicamente cero.',
                despues: 'Lo que si esta claramente descentrado es el Sol.'
              }
            ],
            final: 'Las orbitas son <b>elipses</b>, aunque muy poco achatadas',
            receta: ['Primera ley: las orbitas son elipses',
              'El circulo es un caso particular de elipse (e = 0)',
              'Las orbitas reales son casi circulares',
              'Los dibujos de los libros exageran el achatamiento']
          });
          enun = 'Segun la primera ley de Kepler, &iquest;que forma tienen las orbitas de los planetas?';
          resp = R.opcion(['Elipses', 'Circulos perfectos'], 0);
          pistas = ['Kepler llego a esta conclusion estudiando las medidas de la orbita de Marte.',
            'El circulo es un caso particular, pero las orbitas reales no lo son exactamente.'];
          sol = ['Kepler encontro que los datos no cuadraban con circulos',
            'La figura que si cuadra es la <b>elipse</b>',
            'Eso si: las orbitas reales son elipses muy poco achatadas'];

        } else if (tf === 'dondeSol') {
          guiaDelPaso = G({
            intro: 'Una elipse tiene un <b>centro</b> y tambien dos puntos especiales llamados <b>focos</b>.<br>' +
              'La primera ley dice exactamente donde va el Sol, y no es donde uno esperaria.',
            tablero: function () { return dibujoElipse(true); },
            pasos: [
              {
                seccion: 'Paso 1: donde va el Sol',
                queHacemos: 'Localizamos el Sol en la elipse.',
                paraQue: 'Esta en un foco, que esta corrido respecto al centro. Esa es la parte que de verdad cambia las cosas.',
                queda: 'el Sol esta en un foco',
                pregunta: '&iquest;Donde esta el Sol?',
                resp: R.opcion(['En uno de los dos focos', 'En el centro de la elipse'], 0),
                pista: 'Si estuviera en el centro, la distancia al Sol nunca cambiaria.',
                despues: 'En el otro foco no hay nada: esta vacio.'
              },
              {
                seccion: 'Paso 2: que consecuencia tiene',
                queHacemos: 'Deducimos que pasa con la distancia al Sol.',
                paraQue: 'Al estar descentrado, hay una parte del ano en que el planeta esta mas cerca y otra en que esta mas lejos.',
                queda: 'la distancia al Sol cambia durante el ano',
                pregunta: '&iquest;Que consecuencia tiene que el Sol este en un foco?',
                resp: R.opcion(['Que la distancia al Sol cambia a lo largo del ano',
                  'Que el planeta gira siempre a la misma velocidad'], 0),
                pista: 'Un punto de la elipse esta mas cerca del foco y otro mas lejos.',
                despues: 'Esos dos puntos se llaman perihelio y afelio.'
              }
            ],
            final: 'El Sol esta en <b>uno de los focos</b>, no en el centro',
            receta: ['El Sol ocupa un foco de la elipse',
              'El otro foco esta vacio',
              'Por eso la distancia al Sol cambia durante el ano',
              'Mas cerca: perihelio. Mas lejos: afelio']
          });
          enun = 'Segun la primera ley de Kepler, &iquest;que lugar ocupa el Sol en la orbita de un planeta?';
          resp = R.opcion(['Uno de los focos de la elipse', 'El centro de la elipse'], 0);
          pistas = ['Una elipse tiene centro y ademas dos focos.',
            'Si el Sol estuviera en el centro, la distancia nunca cambiaria.'];
          sol = ['La primera ley coloca al Sol en <b>uno de los focos</b>',
            'El otro foco queda vacio',
            'Por eso la distancia al Sol varia entre el perihelio y el afelio'];

        } else {
          var e1 = r.elige([0.01, 0.05, 0.1, 0.2, 0.5, 0.8]);
          var casi = e1 < 0.1;
          guiaDelPaso = G({
            intro: 'Una orbita tiene excentricidad <b>e = ' + e1 + '</b>.<br>' +
              'La excentricidad es un numero entre 0 y 1 que mide <b>cuanto se aleja la orbita de ser un circulo</b>.',
            pasos: [
              {
                seccion: 'Paso 1: que mide e',
                queHacemos: 'Recordamos la escala de la excentricidad.',
                paraQue: 'e = 0 es un circulo perfecto. Cuanto mas se acerca a 1, mas alargada y mas descentrado queda el Sol.',
                queda: 'e = 0 circulo;  e cerca de 1, muy alargada',
                pregunta: '&iquest;Que orbita corresponde a e = 0?',
                resp: R.opcion(['Un circulo perfecto', 'Una elipse muy alargada'], 0),
                pista: 'Con e = 0 los dos focos se juntan en el centro.',
                despues: 'Ahi la distancia al Sol seria siempre la misma.'
              },
              {
                seccion: 'Paso 2: clasificar esta',
                queHacemos: 'Ubicamos e = ' + e1 + ' en esa escala.',
                paraQue: 'Para comparar: la Tierra tiene 0.0167 y Mercurio, el mas excentrico de los planetas, 0.2056. Los cometas llegan a 0.9 y mas.',
                queda: casi ? 'casi circular' : 'claramente alargada',
                pregunta: 'Con e = ' + e1 + ', &iquest;como es la orbita?',
                resp: R.opcion(casi
                  ? ['Casi circular', 'Muy alargada']
                  : ['Claramente alargada', 'Practicamente un circulo'], 0),
                pista: 'La Tierra tiene e = 0.0167; un cometa puede pasar de 0.9.',
                despues: casi ? 'Se parece mucho a un circulo.' : 'Se le nota bastante el achatamiento.'
              }
            ],
            final: 'Con e = ' + e1 + ' la orbita es <b>' + (casi ? 'casi circular' : 'claramente alargada') + '</b>',
            receta: ['e va de 0 a 1',
              'e = 0 es un circulo perfecto',
              'Cuanto mas cerca de 1, mas alargada',
              'Los planetas tienen e pequena; los cometas, grande']
          });
          enun = 'Una orbita tiene excentricidad e = ' + e1 + '.<br>&iquest;Como es esa orbita?';
          resp = R.opcion(casi ? ['Casi circular', 'Muy alargada'] : ['Claramente alargada', 'Practicamente un circulo'], 0);
          pistas = ['La excentricidad va de 0 (circulo) a casi 1 (muy alargada).',
            'La Tierra tiene e = 0.0167 y se considera casi circular.'];
          sol = ['e = 0 seria un circulo perfecto',
            'Cuanto mas se acerca a 1, mas alargada es la elipse',
            'Con e = ' + e1 + ' la orbita es <b>' + (casi ? 'casi circular' : 'claramente alargada') + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['periAfelio', 'Perihelio y afelio'],
          ['semieje', 'Semieje mayor'],
          ['calcularE', 'Calcular la excentricidad']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var pl = r.elige(PLANETAS);
        var pe = pl.a * (1 - pl.e), af = pl.a * (1 + pl.e);

        if (t2 === 'semieje') {
          guiaDelPaso = G({
            intro: 'De un planeta sabemos que su perihelio es <b>' + F.n(pe, 4) + ' UA</b> y su afelio ' +
              '<b>' + F.n(af, 4) + ' UA</b>.<br>' +
              'Queremos el semieje mayor. Hay una relacion muy comoda: <b>a es el promedio de los dos</b>.',
            pasos: [
              {
                seccion: 'Paso 1: por que es el promedio',
                queHacemos: 'Vemos de donde sale esa relacion.',
                paraQue: 'Perihelio + afelio = a(1&minus;e) + a(1+e) = 2a. Las e se cancelan solas, sin importar cuanto valga.',
                queda: 'a = (perihelio + afelio) / 2',
                pregunta: 'Si sumas el perihelio y el afelio, &iquest;que obtienes?',
                resp: R.opcion(['El eje mayor completo, o sea 2a', 'El semieje mayor a'], 0),
                pista: 'a(1&minus;e) + a(1+e) = 2a: la excentricidad desaparece.',
                despues: 'Por eso basta con dividir entre 2.'
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Sumamos y dividimos entre dos.',
                paraQue: 'Es el radio medio de la orbita, y es el valor que usa la tercera ley de Kepler.',
                queda: 'a = ' + F.n(pl.a, 3) + ' UA',
                pregunta: 'Calcula (' + F.n(pe, 4) + ' + ' + F.n(af, 4) + ') / 2 (3 decimales)',
                resp: R.numero(pl.a, { dec: 3, tol: 0.003, unidad: 'UA' }),
                pista: 'Suma primero y divide despues.',
                despues: ''
              }
            ],
            final: 'El semieje mayor es <b>' + F.n(pl.a, 3) + ' UA</b>',
            receta: ['Perihelio + afelio = 2a',
              'a = promedio de los dos',
              'La excentricidad se cancela en esa suma',
              'Ese a es el que entra en la tercera ley de Kepler']
          });
          enun = 'Un planeta tiene perihelio ' + F.n(pe, 4) + ' UA y afelio ' + F.n(af, 4) + ' UA.<br>' +
            '&iquest;Cual es su semieje mayor? (3 decimales)';
          resp = R.numero(pl.a, { dec: 3, tol: 0.003, unidad: 'UA' });
          pistas = ['El semieje mayor es el promedio del perihelio y el afelio.',
            'a = (' + F.n(pe, 4) + ' + ' + F.n(af, 4) + ') / 2.'];
          sol = ['Perihelio + afelio = a(1&minus;e) + a(1+e) = 2a',
            'a = (' + F.n(pe, 4) + ' + ' + F.n(af, 4) + ') / 2',
            'a = <b>' + F.n(pl.a, 3) + ' UA</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'Un planeta tiene perihelio <b>' + F.n(pe, 4) + ' UA</b> y afelio <b>' + F.n(af, 4) + ' UA</b>.<br>' +
              'Queremos su <b>excentricidad</b>. Sale de comparar la diferencia entre los dos extremos con su suma.',
            pasos: [
              {
                seccion: 'Paso 1: la diferencia',
                queHacemos: 'Restamos afelio menos perihelio.',
                paraQue: 'Esa diferencia mide cuanto se descentra la orbita. Si fuera cero, seria un circulo.',
                queda: 'diferencia = ' + F.n(af - pe, 4),
                pregunta: 'Calcula ' + F.n(af, 4) + ' &minus; ' + F.n(pe, 4) + ' (4 decimales)',
                resp: R.numero(af - pe, { dec: 4, tol: 0.003 }),
                pista: 'Resta directa.',
                despues: 'Pero una diferencia sola no dice si es mucho o poco: depende del tamano de la orbita.'
              },
              {
                seccion: 'Paso 2: compararla con el tamano',
                queHacemos: 'Sumamos los dos para tener la referencia.',
                paraQue: 'Una diferencia de 0.1 UA es enorme en Mercurio y ridicula en Saturno. Por eso hay que dividir entre la suma.',
                queda: 'e = ' + F.n(af - pe, 4) + ' &divide; ' + F.n(af + pe, 4),
                pregunta: 'Calcula ' + F.n(af, 4) + ' + ' + F.n(pe, 4) + ' (4 decimales)',
                resp: R.numero(af + pe, { dec: 4, tol: 0.003 }),
                pista: 'Suma directa. Recuerda que esto vale 2a.',
                despues: ''
              },
              {
                seccion: 'Paso 3: dividir',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Al dividir, el resultado ya no tiene unidades: es una proporcion, comparable entre orbitas de cualquier tamano.',
                queda: 'e = ' + F.n(pl.e, 4),
                pregunta: 'Calcula ' + F.n(af - pe, 4) + ' / ' + F.n(af + pe, 4) + ' (4 decimales)',
                resp: R.numero(pl.e, { dec: 4, tol: 0.003 }),
                pista: 'Division directa.',
                despues: 'Un numero sin unidades, entre 0 y 1.'
              }
            ],
            final: 'La excentricidad es <b>' + F.n(pl.e, 4) + '</b>',
            receta: ['e = (afelio &minus; perihelio) / (afelio + perihelio)',
              'La diferencia mide el descentramiento',
              'La suma sirve de referencia de tamano',
              'e no tiene unidades y va de 0 a 1']
          });
          enun = 'Un planeta tiene perihelio ' + F.n(pe, 4) + ' UA y afelio ' + F.n(af, 4) + ' UA.<br>' +
            '&iquest;Cual es su excentricidad? (4 decimales)';
          resp = R.numero(pl.e, { dec: 4, tol: 0.003 });
          pistas = ['e = (afelio &minus; perihelio) / (afelio + perihelio).',
            'Arriba ' + F.n(af - pe, 4) + ' y abajo ' + F.n(af + pe, 4) + '.'];
          sol = ['e = (afelio &minus; perihelio) / (afelio + perihelio)',
            'e = ' + F.n(af - pe, 4) + ' / ' + F.n(af + pe, 4),
            'e = <b>' + F.n(pl.e, 4) + '</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['periAfelio', 'Perihelio y afelio'],
          ['comparar', 'Comparar dos orbitas'],
          ['cometa', 'Orbita de un cometa']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'comparar') {
          var dos = r.muestra ? null : null;
          var p1 = r.elige(PLANETAS);
          var otros = PLANETAS.filter(function (x) { return x.n !== p1.n; });
          var p2 = r.elige(otros);
          var masExc = p1.e > p2.e ? p1 : p2;
          var v1 = p1.a * (1 + p1.e) - p1.a * (1 - p1.e);
          var v2 = p2.a * (1 + p2.e) - p2.a * (1 - p2.e);
          var masVaria = v1 > v2 ? p1 : p2;
          guiaDelPaso = G({
            intro: 'Comparamos dos orbitas:<br>' +
              '<b>' + p1.n + '</b>: a = ' + F.n(p1.a, 3) + ' UA, e = ' + F.n(p1.e, 4) + '<br>' +
              '<b>' + p2.n + '</b>: a = ' + F.n(p2.a, 3) + ' UA, e = ' + F.n(p2.e, 4) + '<br>' +
              'Ojo con la trampa: "mas excentrica" y "su distancia varia mas en kilometros" ' +
              '<b>no son lo mismo</b>.',
            pasos: [
              {
                seccion: 'Paso 1: cual es mas excentrica',
                queHacemos: 'Comparamos las dos excentricidades.',
                paraQue: 'La excentricidad es una proporcion: dice que tan achatada es la orbita respecto a su propio tamano.',
                queda: 'mas excentrica: ' + masExc.n,
                pregunta: '&iquest;Cual de las dos orbitas es mas excentrica?',
                resp: R.opcion([masExc.n, masExc.n === p1.n ? p2.n : p1.n], 0),
                pista: 'Simplemente la que tenga mayor e.',
                despues: 'Pero eso no dice cual varia mas en distancia absoluta.'
              },
              {
                seccion: 'Paso 2: cuanto varia cada una',
                queHacemos: 'Calculamos afelio menos perihelio en UA.',
                paraQue: 'Esa diferencia vale 2ae: depende de la excentricidad Y del tamano. Una orbita enorme poco excentrica puede variar mas que una pequena muy excentrica.',
                queda: p1.n + ': ' + F.n(v1, 4) + ' UA;  ' + p2.n + ': ' + F.n(v2, 4) + ' UA',
                pregunta: 'Para ' + p1.n + ', calcula 2 &times; ' + F.n(p1.a, 3) + ' &times; ' + F.n(p1.e, 4) + ' (4 decimales)',
                resp: R.numero(v1, { dec: 4, tol: 0.004, unidad: 'UA' }),
                pista: 'afelio &minus; perihelio = 2ae.',
                despues: 'Para ' + p2.n + ' sale ' + F.n(v2, 4) + ' UA.'
              },
              {
                seccion: 'Paso 3: quien varia mas de verdad',
                queHacemos: 'Comparamos las dos variaciones.',
                paraQue: masExc.n === masVaria.n
                  ? 'Aqui coinciden, pero no siempre pasa: son dos preguntas distintas.'
                  : 'Aqui NO coinciden: ' + masExc.n + ' es mas excentrica, pero ' + masVaria.n + ' varia mas en kilometros, porque su orbita es mucho mayor.',
                queda: 'varia mas: ' + masVaria.n,
                pregunta: '&iquest;Cual varia mas su distancia al Sol, en UA?',
                resp: R.opcion([masVaria.n, masVaria.n === p1.n ? p2.n : p1.n], 0),
                pista: 'Compara ' + F.n(v1, 4) + ' con ' + F.n(v2, 4) + '.',
                despues: ''
              }
            ],
            final: 'Mas excentrica: <b>' + masExc.n + '</b>. Varia mas en UA: <b>' + masVaria.n + '</b>',
            receta: ['e mide el achatamiento en proporcion',
              'afelio &minus; perihelio = 2ae, en distancia real',
              'Una orbita grande poco excentrica puede variar mas',
              'Son dos preguntas distintas: no confundirlas']
          });
          enun = p1.n + ' tiene a = ' + F.n(p1.a, 3) + ' UA y e = ' + F.n(p1.e, 4) + '; ' +
            p2.n + ' tiene a = ' + F.n(p2.a, 3) + ' UA y e = ' + F.n(p2.e, 4) + '.<br>' +
            '&iquest;Cual varia mas su distancia al Sol (en UA)?';
          resp = R.opcion([masVaria.n, masVaria.n === p1.n ? p2.n : p1.n], 0);
          pistas = ['La variacion total es afelio &minus; perihelio = 2ae.',
            'Depende de la excentricidad Y del tamano de la orbita.'];
          sol = ['Variacion = afelio &minus; perihelio = 2ae',
            p1.n + ': 2(' + F.n(p1.a, 3) + ')(' + F.n(p1.e, 4) + ') = ' + F.n(v1, 4) + ' UA',
            p2.n + ': 2(' + F.n(p2.a, 3) + ')(' + F.n(p2.e, 4) + ') = ' + F.n(v2, 4) + ' UA',
            'Varia mas: <b>' + masVaria.n + '</b>'];

        } else {
          var ac = r.elige([10, 17, 20, 25, 35]);
          var ec = r.elige([0.85, 0.9, 0.95, 0.967]);
          var pc = ac * (1 - ec), afc = ac * (1 + ec);
          guiaDelPaso = G({
            intro: 'Un cometa tiene semieje mayor <b>a = ' + ac + ' UA</b> y excentricidad <b>e = ' + ec + '</b>.<br>' +
              'Las mismas formulas de siempre, pero con una e enorme los resultados son espectaculares: ' +
              'el cometa pasa de rozar el Sol a perderse mucho mas alla de los planetas.',
            pasos: [
              {
                seccion: 'Paso 1: lo mas cerca que llega',
                queHacemos: 'Calculamos a(1 &minus; e).',
                paraQue: 'Con e casi 1, el parentesis queda diminuto y el perihelio sale pequenisimo: por eso los cometas se acercan tanto al Sol.',
                queda: 'perihelio ' + F.n(pc, 3) + ' UA',
                pregunta: 'Calcula ' + ac + ' &times; (1 &minus; ' + ec + ') (3 decimales)',
                resp: R.numero(pc, { dec: 3, tol: 0.01, unidad: 'UA' }),
                pista: '1 &minus; ' + ec + ' = ' + F.n(1 - ec, 3) + ', por ' + ac + '.',
                despues: 'Mas cerca que la Tierra, que esta a 1 UA.'
              },
              {
                seccion: 'Paso 2: lo mas lejos que llega',
                queHacemos: 'Ahora a(1 + e).',
                paraQue: 'Al otro extremo se va lejisimos. Esa diferencia brutal es lo que hace que los cometas tarden decadas en volver.',
                queda: 'perihelio ' + F.n(pc, 3) + ',  afelio ' + F.n(afc, 3) + ' UA',
                pregunta: 'Calcula ' + ac + ' &times; (1 + ' + ec + ') (3 decimales)',
                resp: R.numero(afc, { dec: 3, tol: 0.02, unidad: 'UA' }),
                pista: '1 + ' + ec + ' = ' + F.n(1 + ec, 3) + ', por ' + ac + '.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la proporcion',
                queHacemos: 'Dividimos afelio entre perihelio.',
                paraQue: 'Ese cociente dice cuantas veces mas lejos llega que su punto mas cercano. En la Tierra vale casi 1; aqui es enorme.',
                queda: 'llega ' + F.n(afc / pc, 1) + ' veces mas lejos',
                pregunta: 'Calcula ' + F.n(afc, 3) + ' / ' + F.n(pc, 3) + ' (1 decimal)',
                resp: R.numero(afc / pc, { dec: 1, tol: 1.5 }),
                pista: 'Division directa.',
                despues: 'En la Tierra esa proporcion es 1.03: casi no varia.'
              }
            ],
            final: 'Perihelio <b>' + F.n(pc, 3) + ' UA</b> y afelio <b>' + F.n(afc, 3) + ' UA</b>',
            receta: ['Las mismas formulas que para un planeta',
              'Con e cerca de 1, el perihelio sale diminuto',
              'Y el afelio, enorme',
              'Por eso los cometas solo se ven cada muchos anos']
          });
          enun = 'Un cometa tiene a = ' + ac + ' UA y e = ' + ec + '.<br>' +
            'Calcula su perihelio y su afelio (3 decimales).';
          resp = R.varios([
            { etiqueta: 'Perihelio (UA)', resp: R.numero(pc, { dec: 3, tol: 0.01 }) },
            { etiqueta: 'Afelio (UA)', resp: R.numero(afc, { dec: 3, tol: 0.02 }) }
          ]);
          pistas = ['Las mismas formulas: a(1 &minus; e) y a(1 + e).',
            'Con e = ' + ec + ', el parentesis del perihelio queda muy pequeno.'];
          sol = ['Perihelio = ' + ac + '(1 &minus; ' + ec + ') = <b>' + F.n(pc, 3) + ' UA</b>',
            'Afelio = ' + ac + '(1 + ' + ec + ') = <b>' + F.n(afc, 3) + ' UA</b>',
            'Llega ' + F.n(afc / pc, 1) + ' veces mas lejos de lo que se acerca'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
