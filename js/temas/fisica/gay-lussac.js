/* Ley de Gay-Lussac: a volumen constante, P1/T1 = P2/T2. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar, GU = EJ.guia;

  var extra = {};

  /* ---------------- hallar la presion final ---------------- */
  extra.presion = function (r) {
    var c1 = r.elige([20, 25, 27, 30]);
    var c2 = r.elige([100, 127, 200, 227, 327, -23]);
    var t1 = c1 + 273, t2 = c2 + 273;
    var p1 = r.elige([100, 150, 200, 250, 300]);
    var p2 = p1 * t2 / t1;
    return {
      guia: G(GU.leyGas({
        ley: 'Gay-Lussac', fija: 'el volumen', inversa: false,
        leyTxt: 'P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        X: { s: 'T', n: 'la temperatura', u: 'K' },
        Y: { s: 'P', n: 'la presion', u: 'kPa' },
        x1: t1, y1: p1, x2: t2,
        celsius: { t1: c1, t2: c2 },
        escena: 'Un gas encerrado en un recipiente rigido esta a <b>' + p1 + ' kPa</b> y <b>' + c1 + ' &deg;C</b>. ' +
          'Se calienta hasta <b>' + c2 + ' &deg;C</b>.',
        porque: 'Al calentar, las moleculas se mueven mas rapido y golpean las paredes con mas fuerza. Como el recipiente es rigido y no pueden expandirse, todo ese empuje extra se traduce en presion. Suben juntas.',
        ejemplo: 'Un aerosol cerca del fuego: no crece, pero la presion de dentro se dispara.'
      })),
      enunciado: 'Un gas en un recipiente rigido esta a ' + p1 + ' kPa y ' + c1 + ' &deg;C. Se calienta hasta ' +
        c2 + ' &deg;C.<br>&iquest;Cual es su nueva presion? (2 decimales)',
      respuesta: R.numero(p2, { dec: 2, tol: 0.3, unidad: 'kPa' }),
      pistas: ['A volumen constante vale Gay-Lussac: P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>.',
        'Pasa a kelvin: ' + t1 + ' K y ' + t2 + ' K.'],
      solucion: ['T<sub>1</sub> = ' + t1 + ' K, T<sub>2</sub> = ' + t2 + ' K',
        'P<sub>2</sub> = ' + p1 + ' &middot; ' + t2 + '/' + t1,
        'P<sub>2</sub> = <b>' + F.n(p2, 2) + ' kPa</b>']
    };
  };

  /* ---------------- hallar la temperatura final ---------------- */
  extra.temperatura = function (r) {
    var c1 = r.elige([20, 25, 27]);
    var t1 = c1 + 273;
    var p1 = r.elige([100, 150, 200]);
    var p2 = r.elige([250, 300, 400, 50, 75]);
    while (p2 === p1) p2 = r.elige([300, 400]);
    var t2 = t1 * p2 / p1;
    return {
      guia: G(GU.leyGas({
        ley: 'Gay-Lussac', fija: 'el volumen', inversa: false,
        leyTxt: 'P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        X: { s: 'P', n: 'la presion', u: 'kPa' },
        Y: { s: 'T', n: 'la temperatura', u: 'K' },
        x1: p1, y1: t1, x2: p2,
        escena: 'Un gas en un recipiente rigido esta a <b>' + p1 + ' kPa</b> y <b>' + c1 + ' &deg;C</b> (' + t1 + ' K). ' +
          'Su presion pasa a <b>' + p2 + ' kPa</b>.',
        porque: 'A volumen fijo, presion y temperatura suben y bajan juntas. Si la presion cambio sin que nadie apretara nada, la causa solo puede ser un cambio de temperatura.',
        ejemplo: 'La presion de las llantas sube en un dia caluroso, sin que nadie las infle.'
      })),
      enunciado: 'Un gas en un recipiente rigido esta a ' + p1 + ' kPa y ' + c1 + ' &deg;C. Su presion pasa a ' +
        p2 + ' kPa.<br>&iquest;A que temperatura esta ahora, en kelvin? (2 decimales)',
      respuesta: R.numero(t2, { dec: 2, tol: 0.5, unidad: 'K' }),
      pistas: ['Gay-Lussac: P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>.',
        'Primero pasa ' + c1 + ' &deg;C a kelvin: ' + t1 + ' K.'],
      solucion: ['T<sub>1</sub> = ' + c1 + ' + 273 = ' + t1 + ' K',
        'T<sub>2</sub> = ' + t1 + ' &middot; ' + p2 + '/' + p1,
        'T<sub>2</sub> = <b>' + F.n(t2, 2) + ' K</b>']
    };
  };

  EJ.tema({
    id: 'gay-lussac',
    materia: 'fisica',
    grupo: 'Gases',
    nombre: 'Ley de Gay-Lussac',
    descripcion: 'A volumen constante, presion y temperatura van juntas: P1/T1 = P2/T2.',
    etiquetas: ['gases', 'gay-lussac', 'presion', 'temperatura'],
    formulario: '<b>Ley de Gay-Lussac</b> (volumen constante):<br>' +
      'P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub><br>' +
      'Presion y temperatura son <b>directamente proporcionales</b>: si una sube, la otra tambien.<br>' +
      '<small>Despejes: P<sub>2</sub> = P<sub>1</sub>T<sub>2</sub>/T<sub>1</sub> &middot; ' +
      'T<sub>2</sub> = T<sub>1</sub>P<sub>2</sub>/P<sub>1</sub><br>' +
      '<b>Las temperaturas SIEMPRE en kelvin:</b> K = &deg;C + 273.<br>' +
      'Es la ley de los recipientes rigidos: aerosoles, llantas, ollas de presion.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['cual', 'Cual de las tres leyes usar'],
          ['sencillo', 'Calculo con kelvin ya dados']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que relaciona la ley de Gay-Lussac?', ok: 'La presion y la temperatura, a volumen constante',
              mal: 'La presion y el volumen', por: 'lo de presion y volumen es la ley de Boyle' },
            { q: 'En la ley de Gay-Lussac, &iquest;que se mantiene constante?', ok: 'El volumen',
              mal: 'La presion', por: 'se usa en recipientes rigidos, que no pueden cambiar de tamano' },
            { q: '&iquest;Por que un aerosol puede explotar cerca del fuego?',
              ok: 'Porque al calentarse sube la presion y el bote no puede expandirse',
              corto: 'sube la presion y el bote no cede', mal: 'Porque el metal se derrite',
              por: 'el recipiente es rigido, asi que todo el calentamiento se convierte en presion' },
            { q: 'La presion de las llantas del coche sube en verano. &iquest;Por que ley?',
              ok: 'Gay-Lussac: mas temperatura, mas presion a volumen fijo', corto: 'Gay-Lussac',
              mal: 'Boyle: mas presion, menos volumen',
              por: 'la llanta no cambia de tamano apreciablemente, asi que lo que manda es la temperatura' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Gay-Lussac</b> es la de los recipientes que <b>no pueden crecer</b>: aerosoles, ' +
              'llantas, ollas de presion.<br>' +
              'Si el gas no puede expandirse al calentarse, la unica salida que le queda es subir la presion.',
            pasos: [
              {
                seccion: 'Paso 1: que magnitudes entran',
                queHacemos: 'Identificamos de que habla la ley.',
                paraQue: 'Gay-Lussac liga <b>presion</b> y <b>temperatura</b>. El volumen no aparece porque se supone fijo.',
                queda: 'presion y temperatura, con V fijo',
                pregunta: '&iquest;Que dos magnitudes relaciona Gay-Lussac?',
                resp: R.opcion(['La presion y la temperatura', 'La presion y el volumen'], 0),
                pista: 'La que falta en la formula es la que se mantiene constante.',
                despues: ''
              },
              {
                seccion: 'Paso 2: por que suben juntas',
                queHacemos: 'Pensamos que hacen las moleculas.',
                paraQue: 'Al calentar se mueven mas rapido y golpean mas fuerte. Como no pueden separarse (el recipiente es rigido), esos golpes se traducen directamente en presion.',
                queda: 'P/T = constante',
                pregunta: 'Al subir la temperatura en un recipiente rigido, &iquest;que hace la presion?',
                resp: R.opcion(['Sube tambien', 'Baja'], 0),
                pista: 'Las moleculas no tienen a donde expandirse.',
                despues: 'Por eso lo que se mantiene es el cociente P/T.'
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior a la pregunta.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.corto || pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Pregunta si el recipiente puede cambiar de tamano.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['Gay-Lussac liga presion y temperatura',
              'El volumen se mantiene constante: recipiente rigido',
              'Son directamente proporcionales',
              'P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['Gay-Lussac es P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>, a volumen constante.',
            'Aqui ' + pq.por + '.'];
          sol = ['Gay-Lussac: presion y temperatura son directamente proporcionales a V constante',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'cual') {
          var cc = r.elige([
            { q: 'Un gas se calienta dentro de una olla de presion cerrada.', ok: 'Gay-Lussac',
              mal: 'Boyle', por: 'la olla es rigida: el volumen no cambia, y lo que se relacionan son presion y temperatura' },
            { q: 'Se aprieta el embolo de una jeringa sin cambiar la temperatura.', ok: 'Boyle',
              mal: 'Charles', por: 'lo que se mantiene constante es la temperatura, y cambian presion y volumen' },
            { q: 'Un globo se lleva del sol a la sombra, al aire libre.', ok: 'Charles',
              mal: 'Gay-Lussac', por: 'al aire libre la presion es siempre la atmosferica, y cambian volumen y temperatura' },
            { q: 'Un tanque de acero con gas se deja al sol.', ok: 'Gay-Lussac',
              mal: 'Charles', por: 'el acero no cede: el volumen es fijo y lo que sube es la presion' }
          ]);
          guiaDelPaso = G({
            intro: 'Las tres leyes de los gases se parecen tanto que lo dificil no es aplicarlas, sino ' +
              '<b>saber cual toca</b>.<br>' +
              'Hay un truco que no falla: buscar que magnitud <b>no</b> cambia.',
            pasos: [
              {
                seccion: 'Paso 1: el truco',
                queHacemos: 'Buscamos la magnitud que se mantiene fija.',
                paraQue: 'Cada ley se llama por lo que deja fuera. La que no cambia es la que no aparece en la formula.',
                queda: 'buscar la que no cambia',
                pregunta: '&iquest;Que hay que identificar primero?',
                resp: R.opcion(['La magnitud que se mantiene constante', 'La magnitud que buscamos'], 0),
                pista: 'De ahi sale el nombre de la ley.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la tabla',
                queHacemos: 'Asociamos cada constante con su ley.',
                paraQue: 'Temperatura fija es Boyle. Presion fija es Charles. Volumen fijo es Gay-Lussac. Con eso basta.',
                queda: 'T fija: Boyle &middot; P fija: Charles &middot; V fijo: Gay-Lussac',
                pregunta: 'Si el volumen es el que no cambia, &iquest;que ley es?',
                resp: R.opcion(['Gay-Lussac', 'Boyle'], 0),
                pista: 'Recipiente rigido quiere decir volumen fijo.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Decidimos la ley del caso.',
                paraQue: 'Aqui ' + cc.por + '.',
                queda: cc.ok,
                pregunta: cc.q + '<br>&iquest;Que ley se aplica?',
                resp: R.opcion([cc.ok, cc.mal], 0),
                pista: 'Pregunta: &iquest;el recipiente puede crecer? &iquest;esta al aire libre? &iquest;cambia la temperatura?',
                despues: ''
              }
            ],
            final: 'Se aplica la ley de <b>' + cc.ok + '</b>',
            receta: ['Buscar primero la magnitud que NO cambia',
              'Temperatura fija: Boyle',
              'Presion fija (al aire libre): Charles',
              'Volumen fijo (recipiente rigido): Gay-Lussac']
          });
          enun = cc.q + '<br>&iquest;Que ley de los gases se aplica?';
          resp = R.opcion([cc.ok, cc.mal], 0);
          pistas = ['Busca la magnitud que se mantiene constante: esa da el nombre de la ley.',
            'Aqui ' + cc.por + '.'];
          sol = ['T fija: Boyle &middot; P fija: Charles &middot; V fijo: Gay-Lussac',
            'Aqui ' + cc.por,
            'Respuesta: <b>' + cc.ok + '</b>'];

        } else {
          var tA = r.elige([250, 300, 400]);
          var tB = r.elige([150, 200, 500, 600, 800]);
          while (tB === tA) tB = r.elige([600, 800]);
          var pA = r.elige([100, 150, 200, 300]);
          var pB = pA * tB / tA;
          guiaDelPaso = G(GU.leyGas({
            ley: 'Gay-Lussac', fija: 'el volumen', inversa: false,
        leyTxt: 'P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
            X: { s: 'T', n: 'la temperatura', u: 'K' },
            Y: { s: 'P', n: 'la presion', u: 'kPa' },
            x1: tA, y1: pA, x2: tB,
            escena: 'Un gas en un recipiente rigido esta a <b>' + pA + ' kPa</b> y <b>' + tA + ' K</b>. ' +
              'Se lleva a <b>' + tB + ' K</b>.<br>Las temperaturas ya vienen en kelvin, asi que no hay que convertir.',
            porque: 'En un recipiente rigido el gas no puede expandirse. Al calentarlo, las moleculas golpean mas fuerte y la presion sube. Van juntas.',
            ejemplo: 'La presion de una llanta sube en un dia caluroso.'
          }));
          enun = 'Un gas en un recipiente rigido esta a ' + pA + ' kPa y ' + tA + ' K. Se lleva a ' + tB + ' K.<br>' +
            '&iquest;Cual es su nueva presion? (2 decimales)';
          resp = R.numero(pB, { dec: 2, tol: 0.3, unidad: 'kPa' });
          pistas = ['Gay-Lussac: P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>.',
            'Ya estan en kelvin: P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.'];
          sol = ['P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>',
            'P<sub>2</sub> = ' + pA + ' &middot; ' + tB + '/' + tA,
            'P<sub>2</sub> = <b>' + F.n(pB, 2) + ' kPa</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['presion', 'Hallar la presion final'],
          ['temperatura', 'Hallar la temperatura final'],
          ['llanta', 'La llanta en verano']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var cFrio = r.elige([10, 15, 20]);
        var cSol = r.elige([45, 50, 55, 60]);
        var tFrio = cFrio + 273, tSol = cSol + 273;
        var pFrio = r.elige([200, 220, 240]);
        var pSol = pFrio * tSol / tFrio;
        var subida = pSol - pFrio;
        guiaDelPaso = G({
          intro: 'Por la manana una llanta marca <b>' + pFrio + ' kPa</b> a <b>' + cFrio + ' &deg;C</b>. ' +
            'Tras rodar al sol, el aire de dentro llega a <b>' + cSol + ' &deg;C</b>.<br>' +
            'La llanta apenas cambia de tamano, asi que el volumen es practicamente fijo: es un caso de Gay-Lussac.',
          pasos: [
            {
              seccion: 'Paso 1: a kelvin',
              queHacemos: 'Convertimos las dos temperaturas.',
              paraQue: 'La ley las divide, asi que hay que usar la escala absoluta. En Celsius el cociente saldria disparatado.',
              queda: tFrio + ' K &rarr; ' + tSol + ' K',
              pregunta: 'Convierte ' + cSol + ' &deg;C a kelvin (0 decimales)',
              resp: R.numero(tSol, { dec: 0, tol: 0.5, unidad: 'K' }),
              pista: 'Suma 273.',
              despues: 'Y ' + cFrio + ' &deg;C = ' + tFrio + ' K.'
            },
            {
              seccion: 'Paso 2: el factor',
              queHacemos: 'Dividimos la temperatura nueva entre la vieja.',
              paraQue: 'Fijate en que sale poco mayor que 1: en kelvin ese salto de ' + (cSol - cFrio) + ' grados no es tan grande como parece.',
              queda: tSol + '/' + tFrio + ' = ' + F.n(tSol / tFrio, 4),
              pregunta: 'Calcula ' + tSol + ' &divide; ' + tFrio + ' (4 decimales)',
              resp: R.numero(tSol / tFrio, { dec: 4, tol: 0.0015 }),
              pista: 'Division directa.',
              despues: ''
            },
            {
              seccion: 'Paso 3: la presion nueva',
              queHacemos: 'Multiplicamos la presion inicial por ese factor.',
              paraQue: 'P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>: la presion crece en la misma proporcion que la temperatura absoluta.',
              queda: 'P<sub>2</sub> = ' + F.n(pSol, 1) + ' kPa',
              pregunta: 'Calcula ' + pFrio + ' &times; ' + F.n(tSol / tFrio, 4) + ' (1 decimal)',
              resp: R.numero(pSol, { dec: 1, tol: 0.4, unidad: 'kPa' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 4: cuanto subio',
              queHacemos: 'Restamos la presion inicial.',
              paraQue: 'Son ' + F.n(subida, 1) + ' kPa de mas. Por eso se recomienda medir la presion de las llantas <b>en frio</b>: medida al sol sale alta y te lleva a desinflarlas de mas.',
              queda: '+' + F.n(subida, 1) + ' kPa',
              pregunta: 'Calcula ' + F.n(pSol, 1) + ' &minus; ' + pFrio + ' (1 decimal)',
              resp: R.numero(subida, { dec: 1, tol: 0.4, unidad: 'kPa' }),
              pista: 'Resta directa.',
              despues: ''
            },
            {
              seccion: 'Paso 5: la consecuencia practica',
              queHacemos: 'Sacamos la regla de uso.',
              paraQue: 'Si ajustas la presion con la llanta caliente, al enfriarse quedara por debajo de lo debido. Por eso los manuales insisten en medir en frio.',
              queda: 'medir siempre en frio',
              pregunta: '&iquest;Por que conviene medir la presion de las llantas en frio?',
              resp: R.opcion(['Porque caliente marca de mas y acabarias desinflandolas',
                'Porque el manometro falla con calor'], 0),
              pista: 'Piensa que pasa al enfriarse despues de ajustarla caliente.',
              despues: ''
            }
          ],
          final: 'La presion sube a <b>' + F.n(pSol, 1) + ' kPa</b>',
          receta: ['La llanta es casi rigida: vale Gay-Lussac',
            'Pasar las dos temperaturas a kelvin',
            'P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>',
            'Medir la presion siempre en frio']
        });
        enun = 'Una llanta marca ' + pFrio + ' kPa a ' + cFrio + ' &deg;C. Tras rodar al sol el aire llega a ' +
          cSol + ' &deg;C, sin cambiar de volumen.<br>&iquest;Que presion marca ahora? (1 decimal)';
        resp = R.numero(pSol, { dec: 1, tol: 0.4, unidad: 'kPa' });
        pistas = ['Volumen fijo: Gay-Lussac, P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>.',
          'En kelvin: ' + tFrio + ' K y ' + tSol + ' K.'];
        sol = ['T<sub>1</sub> = ' + tFrio + ' K, T<sub>2</sub> = ' + tSol + ' K',
          'P<sub>2</sub> = ' + pFrio + ' &middot; ' + tSol + '/' + tFrio,
          'P<sub>2</sub> = <b>' + F.n(pSol, 1) + ' kPa</b>, ' + F.n(subida, 1) + ' kPa mas'];

      } else {
        var t3 = r.subtema([
          ['aerosol', 'El aerosol y su limite'],
          ['olla', 'La olla de presion'],
          ['presion', 'Hallar la presion final']
        ]);
        if (t3 === 'presion') return extra.presion(r, dif);

        if (t3 === 'aerosol') {
          var cAmb = r.elige([20, 25]);
          var tAmb = cAmb + 273;
          var pAmb = r.elige([300, 350, 400]);
          var pMax = r.elige([900, 1000, 1200]);
          var tMax = tAmb * pMax / pAmb;
          var cMax = tMax - 273;
          guiaDelPaso = G({
            intro: 'Un aerosol esta a <b>' + pAmb + ' kPa</b> a <b>' + cAmb + ' &deg;C</b>, y su envase aguanta como ' +
              'maximo <b>' + pMax + ' kPa</b>.<br>' +
              'La pregunta no es cuanta presion tendra, sino <b>a que temperatura revienta</b>. Es el mismo ' +
              'despeje, leido al reves.',
            pasos: [
              {
                seccion: 'Paso 1: que se busca',
                queHacemos: 'Identificamos la incognita.',
                paraQue: 'Nos dan las dos presiones y una temperatura: falta la temperatura que corresponde a la presion maxima.',
                queda: 'incognita: T<sub>2</sub>',
                pregunta: '&iquest;Que hay que despejar?',
                resp: R.opcion(['La temperatura final', 'La presion final'], 0),
                pista: 'La presion maxima ya te la dan.',
                despues: ''
              },
              {
                seccion: 'Paso 2: a kelvin y despejar',
                queHacemos: 'Convertimos y despejamos T<sub>2</sub>.',
                paraQue: cAmb + ' &deg;C son ' + tAmb + ' K, y de P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub> sale T<sub>2</sub> = T<sub>1</sub> &middot; P<sub>2</sub>/P<sub>1</sub>.',
                queda: 'T<sub>2</sub> = ' + tAmb + ' &middot; ' + pMax + '/' + pAmb,
                pregunta: 'Convierte ' + cAmb + ' &deg;C a kelvin (0 decimales)',
                resp: R.numero(tAmb, { dec: 0, tol: 0.5, unidad: 'K' }),
                pista: 'Suma 273.',
                despues: ''
              },
              {
                seccion: 'Paso 3: calcular en kelvin',
                queHacemos: 'Hacemos la cuenta.',
                paraQue: 'La presion tiene que multiplicarse por ' + F.n(pMax / pAmb, 2) + ', asi que la temperatura absoluta tambien.',
                queda: 'T<sub>2</sub> = ' + F.n(tMax, 1) + ' K',
                pregunta: 'Calcula ' + tAmb + ' &times; ' + pMax + ' &divide; ' + pAmb + ' (1 decimal)',
                resp: R.numero(tMax, { dec: 1, tol: 0.5, unidad: 'K' }),
                pista: 'Multiplica y divide.',
                despues: ''
              },
              {
                seccion: 'Paso 4: volver a Celsius',
                queHacemos: 'Restamos 273 para entender el numero.',
                paraQue: 'En kelvin el resultado no dice mucho. En Celsius se ve que son ' + F.n(cMax, 0) + ' grados: mucho para una habitacion, pero nada para una fogata o el interior de un coche cerrado al sol.',
                queda: F.n(cMax, 1) + ' &deg;C',
                pregunta: 'Calcula ' + F.n(tMax, 1) + ' &minus; 273 (1 decimal)',
                resp: R.numero(cMax, { dec: 1, tol: 0.5, unidad: '&deg;C' }),
                pista: 'Resta 273.',
                despues: ''
              },
              {
                seccion: 'Paso 5: la advertencia del bote',
                queHacemos: 'Conectamos con lo que dice la etiqueta.',
                paraQue: 'Todos los aerosoles avisan de no exponerlos al sol ni al fuego. Esta cuenta es exactamente la razon.',
                queda: 'revienta hacia los ' + F.n(cMax, 0) + ' &deg;C',
                pregunta: '&iquest;Por que los aerosoles avisan de no dejarlos al sol?',
                resp: R.opcion(['Porque a volumen fijo la presion sube con la temperatura hasta reventar',
                  'Porque el contenido se echa a perder'], 0),
                pista: 'El envase no puede expandirse.',
                despues: ''
              }
            ],
            final: 'Reventaria hacia los <b>' + F.n(cMax, 1) + ' &deg;C</b>',
            receta: ['Volumen fijo: Gay-Lussac',
              'Pasar la temperatura conocida a kelvin',
              'T<sub>2</sub> = T<sub>1</sub> &middot; P<sub>2</sub>/P<sub>1</sub>',
              'Volver a Celsius para interpretar el resultado']
          });
          enun = 'Un aerosol esta a ' + pAmb + ' kPa y ' + cAmb + ' &deg;C. Su envase aguanta hasta ' + pMax + ' kPa.<br>' +
            '&iquest;A que temperatura en &deg;C alcanzaria ese limite? (1 decimal)';
          resp = R.numero(cMax, { dec: 1, tol: 0.5, unidad: '&deg;C' });
          pistas = ['Volumen fijo: T<sub>2</sub> = T<sub>1</sub> &middot; P<sub>2</sub>/P<sub>1</sub>, en kelvin.',
            'T<sub>1</sub> = ' + tAmb + ' K. Al final resta 273 para volver a Celsius.'];
          sol = ['T<sub>1</sub> = ' + tAmb + ' K',
            'T<sub>2</sub> = ' + tAmb + ' &middot; ' + pMax + '/' + pAmb + ' = ' + F.n(tMax, 1) + ' K',
            'T<sub>2</sub> = <b>' + F.n(cMax, 1) + ' &deg;C</b>'];

        } else {
          var pOlla = r.elige([170, 180, 200]);
          var tCoc = r.elige([110, 115, 120]);
          var tAmbC = r.elige([20, 25]);
          var tAmbK = tAmbC + 273, tCocK = tCoc + 273;
          var pAmbOlla = 101.3;
          var pCalc = pAmbOlla * tCocK / tAmbK;
          guiaDelPaso = G({
            intro: 'Una olla de presion se cierra a <b>' + tAmbC + ' &deg;C</b> con el aire dentro a la presion ' +
              'atmosferica (101.3 kPa). Al cocinar, el interior llega a <b>' + tCoc + ' &deg;C</b>.<br>' +
              'Vamos a calcular a cuanto subiria la presion del aire atrapado, y de paso a entender <b>para que ' +
              'sirve</b> una olla de presion.',
            pasos: [
              {
                seccion: 'Paso 1: a kelvin',
                queHacemos: 'Convertimos las dos temperaturas.',
                paraQue: 'La olla es rigida, asi que es Gay-Lussac, y eso exige kelvin: ' + tAmbK + ' K y ' + tCocK + ' K.',
                queda: tAmbK + ' K &rarr; ' + tCocK + ' K',
                pregunta: 'Convierte ' + tCoc + ' &deg;C a kelvin (0 decimales)',
                resp: R.numero(tCocK, { dec: 0, tol: 0.5, unidad: 'K' }),
                pista: 'Suma 273.',
                despues: 'Y ' + tAmbC + ' &deg;C = ' + tAmbK + ' K.'
              },
              {
                seccion: 'Paso 2: la presion del aire',
                queHacemos: 'Aplicamos Gay-Lussac.',
                paraQue: 'P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>, partiendo de la atmosferica.',
                queda: 'P<sub>2</sub> = ' + F.n(pCalc, 1) + ' kPa',
                pregunta: 'Calcula 101.3 &times; ' + tCocK + ' &divide; ' + tAmbK + ' (1 decimal)',
                resp: R.numero(pCalc, { dec: 1, tol: 0.4, unidad: 'kPa' }),
                pista: 'Multiplica y divide.',
                despues: ''
              },
              {
                seccion: 'Paso 3: comparar con la real',
                queHacemos: 'Miramos el dato de la olla, ' + pOlla + ' kPa.',
                paraQue: 'La presion real es mayor que la que da este calculo. La diferencia la aporta el <b>vapor de agua</b>, que no estaba contado: la olla no solo calienta aire, tambien genera vapor.',
                queda: F.n(pCalc, 0) + ' kPa del aire, ' + pOlla + ' reales',
                pregunta: '&iquest;De donde sale la presion que falta?',
                resp: R.opcion(['Del vapor de agua que se genera al hervir', 'De un error en la ley'], 0),
                pista: 'Dentro de la olla no solo hay aire.',
                despues: ''
              },
              {
                seccion: 'Paso 4: para que sirve la olla',
                queHacemos: 'Cerramos con el porque del invento.',
                paraQue: 'A mas presion, el agua hierve por encima de 100 &deg;C. Eso permite cocinar a ' + tCoc + ' &deg;C, y la comida se hace en mucho menos tiempo.',
                queda: 'mas presion, el agua hierve mas caliente',
                pregunta: '&iquest;Por que una olla de presion cocina mas rapido?',
                resp: R.opcion(['Porque a mas presion el agua hierve por encima de 100 &deg;C',
                  'Porque el metal transmite mejor el calor'], 0),
                pista: 'Al aire libre el agua no pasa de 100 &deg;C por mucho que la calientes.',
                despues: ''
              }
            ],
            final: 'El aire atrapado llegaria a <b>' + F.n(pCalc, 1) + ' kPa</b>',
            receta: ['La olla es rigida: Gay-Lussac',
              'Pasar las temperaturas a kelvin',
              'P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>',
              'La presion real es mayor: tambien hay vapor de agua']
          });
          enun = 'Una olla de presion se cierra a ' + tAmbC + ' &deg;C con aire a 101.3 kPa. Al cocinar el interior ' +
            'llega a ' + tCoc + ' &deg;C, sin cambiar de volumen.<br>' +
            '&iquest;A que presion llegaria ese aire? (1 decimal)';
          resp = R.numero(pCalc, { dec: 1, tol: 0.4, unidad: 'kPa' });
          pistas = ['Volumen fijo: Gay-Lussac, P<sub>2</sub> = P<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.',
            'En kelvin: ' + tAmbK + ' K y ' + tCocK + ' K.'];
          sol = ['T<sub>1</sub> = ' + tAmbK + ' K, T<sub>2</sub> = ' + tCocK + ' K',
            'P<sub>2</sub> = 101.3 &middot; ' + tCocK + '/' + tAmbK,
            'P<sub>2</sub> = <b>' + F.n(pCalc, 1) + ' kPa</b> (la real es mayor: tambien hay vapor)'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
