/* Ley de Boyle: a temperatura constante, P1V1 = P2V2. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar, GU = EJ.guia;

  var extra = {};

  /* ---------------- hallar el volumen final ---------------- */
  extra.volumen = function (r) {
    var p1 = r.elige([100, 120, 150, 200, 250]);
    var v1 = r.elige([2, 3, 4, 5, 6, 8]);
    var p2 = r.elige([50, 75, 300, 400, 500]);
    var v2 = p1 * v1 / p2;
    return {
      guia: G(GU.leyGas({
        ley: 'Boyle', fija: 'la temperatura', inversa: true,
        leyTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        malTxt: 'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
        X: { s: 'P', n: 'la presion', u: 'kPa' },
        Y: { s: 'V', n: 'el volumen', u: 'L' },
        x1: p1, y1: v1, x2: p2,
        escena: 'Un gas ocupa <b>' + v1 + ' L</b> a <b>' + p1 + ' kPa</b>. Sin cambiar la temperatura, ' +
          'la presion pasa a <b>' + p2 + ' kPa</b>.',
        porque: 'Al apretar un gas las moleculas tienen menos sitio, chocan mas seguido contra las paredes y la presion sube. Mas presion, menos volumen: van al reves.',
        ejemplo: 'Tapa una jeringa con el dedo y empuja: cuesta cada vez mas.'
      })),
      enunciado: 'Un gas ocupa ' + v1 + ' L a ' + p1 + ' kPa. A temperatura constante la presion pasa a ' +
        p2 + ' kPa.<br>&iquest;Que volumen ocupa ahora? (2 decimales)',
      respuesta: R.numero(v2, { dec: 2, tol: 0.08, unidad: 'L' }),
      pistas: ['A temperatura constante vale la ley de Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.',
        'Despejando: V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>.'],
      solucion: ['P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        'V<sub>2</sub> = ' + v1 + ' &middot; ' + p1 + '/' + p2,
        'V<sub>2</sub> = <b>' + F.n(v2, 2) + ' L</b>']
    };
  };

  /* ---------------- hallar la presion final ---------------- */
  extra.presion = function (r) {
    var p1 = r.elige([100, 150, 200, 250, 300]);
    var v1 = r.elige([4, 5, 6, 8, 10]);
    var v2 = r.elige([2, 3, 12, 15, 20]);
    while (v2 === v1) v2 = r.elige([2, 3, 12]);
    var p2 = p1 * v1 / v2;
    return {
      guia: G(GU.leyGas({
        ley: 'Boyle', fija: 'la temperatura', inversa: true,
        leyTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        malTxt: 'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
        X: { s: 'V', n: 'el volumen', u: 'L' },
        Y: { s: 'P', n: 'la presion', u: 'kPa' },
        x1: v1, y1: p1, x2: v2,
        escena: 'Un gas esta a <b>' + p1 + ' kPa</b> ocupando <b>' + v1 + ' L</b>. Sin cambiar la temperatura, ' +
          'el volumen pasa a <b>' + v2 + ' L</b>.',
        porque: 'Si le das mas sitio al gas, las moleculas chocan menos seguido contra las paredes y la presion baja. Mas volumen, menos presion: van al reves.',
        ejemplo: 'Al soltar el piston de una jeringa tapada, la presion de dentro cae.'
      })),
      enunciado: 'Un gas a ' + p1 + ' kPa ocupa ' + v1 + ' L. A temperatura constante pasa a ocupar ' +
        v2 + ' L.<br>&iquest;Cual es su nueva presion? (2 decimales)',
      respuesta: R.numero(p2, { dec: 2, tol: 0.08, unidad: 'kPa' }),
      pistas: ['Ley de Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.',
        'Despejando: P<sub>2</sub> = P<sub>1</sub> &middot; V<sub>1</sub>/V<sub>2</sub>.'],
      solucion: ['P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        'P<sub>2</sub> = ' + p1 + ' &middot; ' + v1 + '/' + v2,
        'P<sub>2</sub> = <b>' + F.n(p2, 2) + ' kPa</b>']
    };
  };

  EJ.tema({
    id: 'boyle',
    materia: 'fisica',
    grupo: 'Gases',
    nombre: 'Ley de Boyle',
    descripcion: 'A temperatura constante, presion y volumen van al reves: P1V1 = P2V2.',
    etiquetas: ['gases', 'boyle', 'presion', 'volumen'],
    formulario: '<b>Ley de Boyle</b> (temperatura constante):<br>' +
      'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub><br>' +
      'Presion y volumen son <b>inversamente proporcionales</b>: si uno sube, el otro baja.<br>' +
      '<small>Despejes: V<sub>2</sub> = V<sub>1</sub>P<sub>1</sub>/P<sub>2</sub> &middot; ' +
      'P<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>/V<sub>2</sub><br>' +
      'Las unidades de presion y de volumen solo tienen que ser las mismas a los dos lados.<br>' +
      'Aqui NO hace falta pasar nada a kelvin: la temperatura ni siquiera aparece.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['sentido', 'Si aprieto, que pasa'],
          ['mitad', 'Casos con numeros redondos']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que relaciona la ley de Boyle?', ok: 'La presion y el volumen, a temperatura constante',
              mal: 'El volumen y la temperatura', por: 'lo del volumen y la temperatura es la ley de Charles' },
            { q: 'En la ley de Boyle, &iquest;que magnitud se mantiene constante?', ok: 'La temperatura',
              mal: 'La presion', por: 'si la presion no cambiara no habria nada que calcular' },
            { q: '&iquest;Como son la presion y el volumen segun Boyle?', ok: 'Inversamente proporcionales',
              mal: 'Directamente proporcionales', por: 'cuando uno sube el otro baja, y su producto se mantiene' },
            { q: 'Segun Boyle, &iquest;que se mantiene igual al comprimir un gas?',
              ok: 'El producto de la presion por el volumen', mal: 'La suma de la presion y el volumen',
              por: 'la ley dice justamente que P por V vale lo mismo antes y despues' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Boyle</b> describe que pasa al apretar un gas sin dejar que cambie de temperatura.<br>' +
              'Es la mas intuitiva de las leyes de los gases: la has sentido cada vez que tapas una jeringa y empujas.',
            pasos: [
              {
                seccion: 'Paso 1: que magnitudes entran',
                queHacemos: 'Identificamos de que habla la ley.',
                paraQue: 'Boyle liga <b>presion</b> y <b>volumen</b>. La temperatura no aparece en la formula porque se supone fija.',
                queda: 'presion y volumen, con T fija',
                pregunta: '&iquest;Que dos magnitudes relaciona Boyle?',
                resp: R.opcion(['La presion y el volumen', 'La temperatura y el volumen'], 0),
                pista: 'La que falta en la formula es la que se mantiene constante.',
                despues: ''
              },
              {
                seccion: 'Paso 2: en que sentido',
                queHacemos: 'Decidimos si suben juntas o al reves.',
                paraQue: 'Al reducir el sitio, las moleculas chocan mas seguido contra las paredes y la presion sube. Son inversamente proporcionales.',
                queda: 'P&middot;V = constante',
                pregunta: 'Al bajar el volumen, &iquest;que hace la presion?',
                resp: R.opcion(['Sube', 'Baja'], 0),
                pista: 'Aprieta una jeringa tapada y lo notas en el dedo.',
                despues: 'Por eso el producto P&middot;V se mantiene.'
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior a la pregunta.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> y mira que aparece y que no.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['Boyle liga presion y volumen',
              'La temperatura se mantiene constante',
              'Son inversamente proporcionales',
              'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['La ley de Boyle es P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>, a temperatura constante.',
            'Aqui ' + pq.por + '.'];
          sol = ['Boyle: presion y volumen son inversamente proporcionales a T constante',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'sentido') {
          var cs = r.elige([
            { q: 'Aprietas el embolo de una jeringa tapada con el dedo.', ok: 'La presion de dentro sube',
              mal: 'La presion de dentro baja', por: 'reduces el volumen, asi que la presion sube' },
            { q: 'Un globo sube por la atmosfera, donde la presion exterior es menor.',
              ok: 'Se hincha: su volumen aumenta', mal: 'Se encoge', por: 'menos presion fuera deja que el gas se expanda' },
            { q: 'Un buzo suelta una burbuja en el fondo y esta sube.', ok: 'La burbuja crece al subir',
              mal: 'La burbuja se encoge al subir', por: 'al subir hay menos agua encima, la presion baja y el volumen crece' },
            { q: 'Comprimes un gas hasta la mitad de su volumen, sin cambiar la temperatura.',
              ok: 'Su presion se duplica', mal: 'Su presion se reduce a la mitad',
              por: 'el producto P&middot;V no cambia, asi que al partir V a la mitad P tiene que doblarse' }
          ]);
          guiaDelPaso = G({
            intro: 'Muchas preguntas de Boyle se contestan <b>sin calcular nada</b>: basta con saber en que ' +
              'sentido se mueven las cosas.<br>' +
              'Vale la pena dominar esto antes de meterse con los numeros.',
            pasos: [
              {
                seccion: 'Paso 1: la regla',
                queHacemos: 'Fijamos el sentido de la relacion.',
                paraQue: 'Presion y volumen van al reves. Si uno sube, el otro baja, y ademas en la misma proporcion.',
                queda: 'si uno sube, el otro baja',
                pregunta: 'Presion y volumen a temperatura constante, &iquest;como van?',
                resp: R.opcion(['Al reves: si uno sube el otro baja', 'Juntos: si uno sube el otro tambien'], 0),
                pista: 'Su producto se mantiene constante.',
                despues: ''
              },
              {
                seccion: 'Paso 2: quien cambia primero',
                queHacemos: 'Vemos cual de las dos es la causa en este caso.',
                paraQue: 'Aqui ' + cs.por + '.',
                queda: cs.ok,
                pregunta: cs.q + '<br>&iquest;Que ocurre?',
                resp: R.opcion([cs.ok, cs.mal], 0),
                pista: 'Pregunta que magnitud cambia por si sola, y deduce la otra.',
                despues: ''
              }
            ],
            final: '<b>' + cs.ok + '</b>',
            receta: ['Presion y volumen van al reves',
              'Identificar cual cambia primero',
              'La otra cambia en sentido contrario',
              'Si una se parte a la mitad, la otra se duplica']
          });
          enun = cs.q + '<br>&iquest;Que ocurre?';
          resp = R.opcion([cs.ok, cs.mal], 0);
          pistas = ['A temperatura constante, presion y volumen van en sentidos contrarios.',
            'Aqui ' + cs.por + '.'];
          sol = ['Boyle: si uno sube, el otro baja',
            'Aqui ' + cs.por,
            'Respuesta: <b>' + cs.ok + '</b>'];

        } else {
          var v0 = r.elige([2, 4, 6, 8, 10]);
          var veces = r.elige([2, 3, 4]);
          var comprime = r.bool();
          var vf = comprime ? v0 / veces : v0 * veces;
          var p0 = r.elige([100, 200, 300]);
          var pf = p0 * v0 / vf;
          guiaDelPaso = G({
            intro: 'Un gas ocupa <b>' + v0 + ' L</b> a <b>' + p0 + ' kPa</b>. A temperatura constante su volumen ' +
              (comprime ? 'se reduce a la ' + (veces === 2 ? 'mitad' : veces === 3 ? 'tercera parte' : 'cuarta parte')
                        : 'se multiplica por ' + veces) + '.<br>' +
              'Con numeros tan redondos se puede resolver <b>de cabeza</b>, sin despejar nada.',
            pasos: [
              {
                seccion: 'Paso 1: el volumen nuevo',
                queHacemos: 'Aplicamos el cambio al volumen.',
                paraQue: 'Es el dato de partida, y conviene tenerlo en numero antes de razonar la presion.',
                queda: 'V<sub>2</sub> = ' + F.n(vf, 2) + ' L',
                pregunta: '&iquest;Cuanto vale el volumen final? (2 decimales)',
                resp: R.numero(vf, { dec: 2, tol: 0.05, unidad: 'L' }),
                pista: comprime ? 'Divide entre ' + veces + '.' : 'Multiplica por ' + veces + '.',
                despues: ''
              },
              {
                seccion: 'Paso 2: razonar la presion',
                queHacemos: 'Pensamos en que proporcion cambia.',
                paraQue: 'Como van al reves, si el volumen se ' + (comprime ? 'divide' : 'multiplica') + ' entre ' + veces + ', la presion se ' + (comprime ? 'multiplica' : 'divide') + ' por ' + veces + '. Sin calculadora.',
                queda: 'la presion se ' + (comprime ? 'multiplica' : 'divide') + ' por ' + veces,
                pregunta: 'Si el volumen se ' + (comprime ? 'divide' : 'multiplica') + ' entre ' + veces + ', &iquest;que hace la presion?',
                resp: R.opcion(comprime
                  ? ['Se multiplica por ' + veces, 'Se divide entre ' + veces]
                  : ['Se divide entre ' + veces, 'Se multiplica por ' + veces], 0),
                pista: 'El producto P&middot;V no puede cambiar.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el numero',
                queHacemos: 'Aplicamos esa proporcion a la presion inicial.',
                paraQue: 'Ya sabemos el sentido y el factor, asi que solo queda una operacion.',
                queda: 'P<sub>2</sub> = ' + F.n(pf, 2) + ' kPa',
                pregunta: '&iquest;Cual es la presion final? (2 decimales)',
                resp: R.numero(pf, { dec: 2, tol: 0.08, unidad: 'kPa' }),
                pista: comprime ? 'Multiplica ' + p0 + ' por ' + veces + '.' : 'Divide ' + p0 + ' entre ' + veces + '.',
                despues: ''
              },
              {
                seccion: 'Paso 4: comprobar con el producto',
                queHacemos: 'Verificamos que P&middot;V no cambio.',
                paraQue: 'Es la comprobacion mas rapida que existe para Boyle: los dos productos tienen que dar lo mismo.',
                queda: 'P&middot;V = ' + F.n(p0 * v0, 0) + ' en los dos casos',
                pregunta: 'Calcula ' + F.n(pf, 2) + ' &times; ' + F.n(vf, 2) + ' (0 decimales)',
                resp: R.numero(p0 * v0, { dec: 0, tol: 1 }),
                pista: 'Tiene que dar lo mismo que ' + p0 + ' &times; ' + v0 + '.',
                despues: 'Coincide con ' + p0 + ' &times; ' + v0 + ' = ' + F.n(p0 * v0, 0) + '.'
              }
            ],
            final: 'P<sub>2</sub> = <b>' + F.n(pf, 2) + ' kPa</b>',
            receta: ['Si el volumen se divide entre n, la presion se multiplica por n',
              'Y al reves',
              'No hace falta despejar nada con numeros redondos',
              'Comprobar siempre que P&middot;V da lo mismo antes y despues']
          });
          enun = 'Un gas ocupa ' + v0 + ' L a ' + p0 + ' kPa. A temperatura constante su volumen ' +
            (comprime ? 'se reduce a la ' + (veces === 2 ? 'mitad' : veces === 3 ? 'tercera parte' : 'cuarta parte')
                      : 'se multiplica por ' + veces) + '.<br>&iquest;Cual es su nueva presion? (2 decimales)';
          resp = R.numero(pf, { dec: 2, tol: 0.08, unidad: 'kPa' });
          pistas = ['Presion y volumen van al reves, y en la misma proporcion.',
            'El producto P&middot;V tiene que seguir valiendo ' + F.n(p0 * v0, 0) + '.'];
          sol = ['V<sub>2</sub> = ' + F.n(vf, 2) + ' L',
            'P&middot;V no cambia: P<sub>2</sub> = ' + p0 + ' &middot; ' + v0 + ' / ' + F.n(vf, 2),
            'P<sub>2</sub> = <b>' + F.n(pf, 2) + ' kPa</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['volumen', 'Hallar el volumen final'],
          ['presion', 'Hallar la presion final'],
          ['unidades', 'Cuidado con las unidades']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var pAtm = r.elige([1, 2, 3]);
        var vLit = r.elige([4, 6, 8, 10]);
        var pKpa = r.elige([200, 400, 500]);
        var pAtmEnKpa = pAtm * 101.3;
        var vFin = pAtmEnKpa * vLit / pKpa;
        guiaDelPaso = G({
          intro: 'Un gas ocupa <b>' + vLit + ' L</b> a <b>' + pAtm + ' atm</b>. A temperatura constante la presion ' +
            'pasa a <b>' + pKpa + ' kPa</b>.<br>' +
            'Fijate en el detalle: una presion viene en <b>atm</b> y la otra en <b>kPa</b>. Antes de aplicar Boyle ' +
            'hay que ponerlas en la misma unidad.',
          pasos: [
            {
              seccion: 'Paso 1: detectar el problema',
              queHacemos: 'Comparamos las unidades de las dos presiones.',
              paraQue: 'La ley compara P<sub>1</sub> con P<sub>2</sub> dividiendolas. Si estan en unidades distintas, el cociente no significa nada y el resultado sale disparatado.',
              queda: 'atm y kPa: hay que unificar',
              pregunta: '&iquest;Se puede aplicar Boyle directamente con atm y kPa mezcladas?',
              resp: R.opcion(['No: primero hay que pasarlas a la misma unidad', 'Si, la ley no mira las unidades'], 0),
              pista: 'Las dos presiones tienen que medirse con la misma vara.',
              despues: ''
            },
            {
              seccion: 'Paso 2: convertir',
              queHacemos: 'Pasamos las atm a kPa.',
              paraQue: '1 atm son 101.3 kPa. Convertimos la primera presion para dejar las dos en kPa.',
              queda: 'P<sub>1</sub> = ' + F.n(pAtmEnKpa, 1) + ' kPa',
              pregunta: 'Convierte ' + pAtm + ' atm a kPa (1 decimal)',
              resp: R.numero(pAtmEnKpa, { dec: 1, tol: 0.2, unidad: 'kPa' }),
              pista: 'Multiplica por 101.3.',
              despues: ''
            },
            {
              seccion: 'Paso 3: aplicar Boyle',
              queHacemos: 'Despejamos el volumen final.',
              paraQue: 'Ya con todo en kPa, V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>.',
              queda: 'V<sub>2</sub> = ' + vLit + ' &middot; ' + F.n(pAtmEnKpa, 1) + '/' + pKpa,
              pregunta: '&iquest;Como queda despejado el volumen final?',
              resp: R.opcion(['V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>',
                'V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>2</sub>/P<sub>1</sub>'], 0),
              pista: 'Parte de P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.',
              despues: ''
            },
            {
              seccion: 'Paso 4: calcular',
              queHacemos: 'Hacemos la cuenta.',
              paraQue: 'La presion ' + (pKpa > pAtmEnKpa ? 'subio' : 'bajo') + ', asi que el volumen tiene que ' + (pKpa > pAtmEnKpa ? 'bajar' : 'subir') + '.',
              queda: 'V<sub>2</sub> = ' + F.n(vFin, 2) + ' L',
              pregunta: 'Calcula ' + vLit + ' &times; ' + F.n(pAtmEnKpa, 1) + ' &divide; ' + pKpa + ' (2 decimales)',
              resp: R.numero(vFin, { dec: 2, tol: 0.08, unidad: 'L' }),
              pista: 'Multiplica y luego divide.',
              despues: 'Y efectivamente ' + (vFin < vLit ? 'bajo' : 'subio') + ' respecto a los ' + vLit + ' L iniciales.'
            }
          ],
          final: 'V<sub>2</sub> = <b>' + F.n(vFin, 2) + ' L</b>',
          receta: ['Antes de aplicar Boyle, unificar unidades',
            '1 atm = 101.3 kPa',
            'V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>',
            'Comprobar que el volumen se movio en el sentido esperado']
        });
        enun = 'Un gas ocupa ' + vLit + ' L a ' + pAtm + ' atm. A temperatura constante la presion pasa a ' +
          pKpa + ' kPa.<br>&iquest;Que volumen ocupa ahora? (2 decimales)<br>' +
          '<small>1 atm = 101.3 kPa</small>';
        resp = R.numero(vFin, { dec: 2, tol: 0.08, unidad: 'L' });
        pistas = ['Las dos presiones tienen que estar en la misma unidad: 1 atm = 101.3 kPa.',
          'Luego V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>.'];
        sol = [pAtm + ' atm = ' + F.n(pAtmEnKpa, 1) + ' kPa',
          'V<sub>2</sub> = ' + vLit + ' &middot; ' + F.n(pAtmEnKpa, 1) + '/' + pKpa,
          'V<sub>2</sub> = <b>' + F.n(vFin, 2) + ' L</b>'];

      } else {
        var t3 = r.subtema([
          ['buzo', 'La burbuja del buzo'],
          ['jeringa', 'Jeringa y aire atrapado'],
          ['porcentaje', 'Cambio en porcentaje']
        ]);

        if (t3 === 'buzo') {
          var prof = r.elige([10, 20, 30, 40]);
          var vFondo = r.elige([2, 3, 4, 5]);
          var pFondo = 101.3 + 9.8 * 1000 * prof / 1000;   /* kPa: atmosferica + columna de agua */
          var vSup = pFondo * vFondo / 101.3;
          guiaDelPaso = G({
            intro: 'Un buzo suelta una burbuja de <b>' + vFondo + ' cm&sup3;</b> a <b>' + prof + ' m</b> de profundidad. ' +
              'La burbuja sube hasta la superficie manteniendo la temperatura.<br>' +
              'Lo que hay que ver primero es <b>cuanta presion</b> hay ahi abajo: no es solo la del agua.',
            pasos: [
              {
                seccion: 'Paso 1: la presion del agua',
                queHacemos: 'Calculamos cuanto pesa la columna de agua encima.',
                paraQue: 'Cada 10 m de agua anaden unos 98 kPa. Con ' + prof + ' m son ' + F.n(9.8 * prof, 1) + ' kPa.',
                queda: 'agua: ' + F.n(9.8 * prof, 1) + ' kPa',
                pregunta: 'Calcula 9.8 &times; ' + prof + ' (1 decimal)',
                resp: R.numero(9.8 * prof, { dec: 1, tol: 0.2, unidad: 'kPa' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: sumar la atmosfera',
                queHacemos: 'Le anadimos la presion atmosferica.',
                paraQue: 'El aire tambien pesa: encima del agua hay toda la atmosfera. Olvidarse de esos 101.3 kPa es el error clasico de este ejercicio.',
                queda: 'P<sub>fondo</sub> = ' + F.n(pFondo, 1) + ' kPa',
                pregunta: 'Calcula ' + F.n(9.8 * prof, 1) + ' + 101.3 (1 decimal)',
                resp: R.numero(pFondo, { dec: 1, tol: 0.2, unidad: 'kPa' }),
                pista: 'Suma la presion atmosferica.',
                despues: 'En la superficie solo quedaran los 101.3 kPa.'
              },
              {
                seccion: 'Paso 3: aplicar Boyle',
                queHacemos: 'Despejamos el volumen en la superficie.',
                paraQue: 'V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>1</sub>/P<sub>2</sub>, con P<sub>1</sub> la del fondo y P<sub>2</sub> la de arriba.',
                queda: 'V<sub>2</sub> = ' + vFondo + ' &middot; ' + F.n(pFondo, 1) + '/101.3',
                pregunta: '&iquest;Que presion va en el numerador?',
                resp: R.opcion(['La del fondo, donde empezo', 'La de la superficie'], 0),
                pista: 'En la inversa va el dato viejo arriba.',
                despues: ''
              },
              {
                seccion: 'Paso 4: calcular',
                queHacemos: 'Hacemos la cuenta.',
                paraQue: 'La presion bajo mucho al subir, asi que la burbuja tiene que haber crecido bastante.',
                queda: 'V<sub>2</sub> = ' + F.n(vSup, 2) + ' cm&sup3;',
                pregunta: 'Calcula ' + vFondo + ' &times; ' + F.n(pFondo, 1) + ' &divide; 101.3 (2 decimales)',
                resp: R.numero(vSup, { dec: 2, tol: 0.1, unidad: 'cm&sup3;' }),
                pista: 'Multiplica y divide.',
                despues: 'Casi ' + F.n(vSup / vFondo, 1) + ' veces su tamano inicial.'
              },
              {
                seccion: 'Paso 5: por que importa',
                queHacemos: 'Le damos sentido practico.',
                paraQue: 'Lo mismo le pasa al aire de los pulmones de un buzo. Por eso la regla numero uno del buceo es no aguantar la respiracion al subir: el aire se expande y puede reventar el pulmon.',
                queda: 'la burbuja crece ' + F.n(vSup / vFondo, 1) + ' veces',
                pregunta: '&iquest;Por que un buzo nunca debe aguantar la respiracion al subir?',
                resp: R.opcion(['Porque el aire de sus pulmones se expande al bajar la presion',
                  'Porque se le acabaria el oxigeno'], 0),
                pista: 'A sus pulmones les pasa lo mismo que a la burbuja.',
                despues: ''
              }
            ],
            final: 'En la superficie la burbuja mide <b>' + F.n(vSup, 2) + ' cm&sup3;</b>',
            receta: ['Presion en el fondo = atmosferica + 9.8 &times; profundidad (en kPa)',
              'No olvidar los 101.3 kPa de la atmosfera',
              'V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>fondo</sub>/P<sub>superficie</sub>',
              'Al subir la presion baja y el gas se expande']
          });
          enun = 'Un buzo suelta una burbuja de ' + vFondo + ' cm&sup3; a ' + prof + ' m de profundidad.<br>' +
            '&iquest;Que volumen tiene al llegar a la superficie? (2 decimales)<br>' +
            '<small>Presion atmosferica 101.3 kPa &middot; cada metro de agua anade 9.8 kPa</small>';
          resp = R.numero(vSup, { dec: 2, tol: 0.1, unidad: 'cm&sup3;' });
          pistas = ['La presion en el fondo es 101.3 + 9.8 &times; ' + prof + ' kPa.',
            'Luego V<sub>2</sub> = V<sub>1</sub> &middot; P<sub>fondo</sub>/101.3.'];
          sol = ['P<sub>fondo</sub> = 101.3 + 9.8 &middot; ' + prof + ' = ' + F.n(pFondo, 1) + ' kPa',
            'V<sub>2</sub> = ' + vFondo + ' &middot; ' + F.n(pFondo, 1) + '/101.3',
            'V<sub>2</sub> = <b>' + F.n(vSup, 2) + ' cm&sup3;</b>'];

        } else if (t3 === 'jeringa') {
          var vJer = r.elige([20, 30, 40, 50]);
          var vEmp = r.elige([5, 10, 15]);
          while (vEmp >= vJer) vEmp = r.elige([5, 10]);
          var vRes = vJer - vEmp;
          var pFin = 101.3 * vJer / vRes;
          guiaDelPaso = G({
            intro: 'Una jeringa contiene <b>' + vJer + ' mL</b> de aire a presion atmosferica (101.3 kPa). ' +
              'Se tapa la punta y se empuja el embolo <b>' + vEmp + ' mL</b> hacia dentro.<br>' +
              'El dato que hay que construir es el <b>volumen que queda</b>: el enunciado te da cuanto empujaste, no cuanto queda.',
            pasos: [
              {
                seccion: 'Paso 1: el volumen que queda',
                queHacemos: 'Restamos lo que se empujo.',
                paraQue: 'El aire no se escapa porque la punta esta tapada: solo se le quita sitio. De ' + vJer + ' mL se pasa a ' + vRes + '.',
                queda: 'V<sub>2</sub> = ' + vRes + ' mL',
                pregunta: 'Calcula ' + vJer + ' &minus; ' + vEmp,
                resp: R.numero(vRes, { dec: 0, tol: 0.5, unidad: 'mL' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: que ley usar',
                queHacemos: 'Comprobamos que se cumple la condicion de Boyle.',
                paraQue: 'La temperatura no cambia y el aire no puede salir, asi que P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> vale tal cual.',
                queda: 'vale P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
                pregunta: '&iquest;Se puede usar Boyle aqui?',
                resp: R.opcion(['Si: la temperatura no cambia y el gas no se escapa',
                  'No: hace falta saber la temperatura'], 0),
                pista: 'Boyle solo pide temperatura constante y cantidad de gas fija.',
                despues: ''
              },
              {
                seccion: 'Paso 3: despejar y calcular',
                queHacemos: 'Aplicamos P<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>/V<sub>2</sub>.',
                paraQue: 'El volumen bajo, asi que la presion tiene que subir por encima de la atmosferica.',
                queda: 'P<sub>2</sub> = ' + F.n(pFin, 1) + ' kPa',
                pregunta: 'Calcula 101.3 &times; ' + vJer + ' &divide; ' + vRes + ' (1 decimal)',
                resp: R.numero(pFin, { dec: 1, tol: 0.3, unidad: 'kPa' }),
                pista: 'Multiplica y luego divide.',
                despues: ''
              },
              {
                seccion: 'Paso 4: cuanto se nota',
                queHacemos: 'Comparamos con la presion inicial.',
                paraQue: 'Es ' + F.n(pFin / 101.3, 2) + ' veces la atmosferica. Por eso el embolo empuja de vuelta con tanta fuerza en cuanto sueltas.',
                queda: F.n(pFin / 101.3, 2) + ' veces la atmosferica',
                pregunta: 'Calcula ' + F.n(pFin, 1) + ' &divide; 101.3 (2 decimales)',
                resp: R.numero(pFin / 101.3, { dec: 2, tol: 0.03 }),
                pista: 'Division directa.',
                despues: ''
              }
            ],
            final: 'P<sub>2</sub> = <b>' + F.n(pFin, 1) + ' kPa</b>',
            receta: ['Primero construir el volumen final: el inicial menos lo empujado',
              'Boyle vale porque la temperatura no cambia y el gas no escapa',
              'P<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>/V<sub>2</sub>',
              'Comparar con la atmosferica para ver cuanto se nota']
          });
          enun = 'Una jeringa tapada contiene ' + vJer + ' mL de aire a 101.3 kPa. Se empuja el embolo ' + vEmp +
            ' mL hacia dentro, sin cambiar la temperatura.<br>&iquest;Cual es la presion del aire ahora? (1 decimal)';
          resp = R.numero(pFin, { dec: 1, tol: 0.3, unidad: 'kPa' });
          pistas = ['El volumen final es ' + vJer + ' &minus; ' + vEmp + ' = ' + vRes + ' mL.',
            'Luego P<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>/V<sub>2</sub>.'];
          sol = ['V<sub>2</sub> = ' + vJer + ' &minus; ' + vEmp + ' = ' + vRes + ' mL',
            'P<sub>2</sub> = 101.3 &middot; ' + vJer + '/' + vRes,
            'P<sub>2</sub> = <b>' + F.n(pFin, 1) + ' kPa</b>'];

        } else {
          var pct = r.elige([20, 25, 40, 50, 60]);
          var reduce = r.bool();
          var f = reduce ? (1 - pct / 100) : (1 + pct / 100);
          var cambio = 1 / f;
          var pctP = (cambio - 1) * 100;
          guiaDelPaso = G({
            intro: 'A temperatura constante, el volumen de un gas <b>' + (reduce ? 'disminuye' : 'aumenta') +
              ' un ' + pct + '%</b>.<br>' +
              'La pregunta no pide un valor, sino <b>en que porcentaje</b> cambia la presion. Se resuelve sin ' +
              'conocer ni un solo dato numerico.',
            pasos: [
              {
                seccion: 'Paso 1: el volumen como factor',
                queHacemos: 'Traducimos el porcentaje a un multiplicador.',
                paraQue: (reduce ? 'Bajar un ' + pct + '% es quedarse con el ' + (100 - pct) + '%' : 'Subir un ' + pct + '% es quedarse con el ' + (100 + pct) + '%') + ', o sea multiplicar por ' + F.n(f, 2) + '.',
                queda: 'V<sub>2</sub> = ' + F.n(f, 2) + ' &middot; V<sub>1</sub>',
                pregunta: '&iquest;Por cuanto se multiplica el volumen? (2 decimales)',
                resp: R.numero(f, { dec: 2, tol: 0.005 }),
                pista: reduce ? '100% &minus; ' + pct + '% = ' + (100 - pct) + '%.' : '100% + ' + pct + '% = ' + (100 + pct) + '%.',
                despues: ''
              },
              {
                seccion: 'Paso 2: invertir el factor',
                queHacemos: 'Calculamos 1 dividido entre ese numero.',
                paraQue: 'Como P y V van al reves, si V se multiplica por ' + F.n(f, 2) + ', P se multiplica por el inverso. No por el mismo porcentaje al reves: eso es lo que casi todos fallan.',
                queda: 'P<sub>2</sub> = ' + F.n(cambio, 4) + ' &middot; P<sub>1</sub>',
                pregunta: 'Calcula 1 &divide; ' + F.n(f, 2) + ' (4 decimales)',
                resp: R.numero(cambio, { dec: 4, tol: 0.002 }),
                pista: 'El producto P&middot;V no cambia.',
                despues: ''
              },
              {
                seccion: 'Paso 3: pasarlo a porcentaje',
                queHacemos: 'Restamos 1 y multiplicamos por 100.',
                paraQue: 'Un factor de ' + F.n(cambio, 4) + ' quiere decir un cambio del ' + F.n(pctP, 1) + '%.',
                queda: 'la presion ' + (pctP > 0 ? 'sube' : 'baja') + ' un ' + F.n(Math.abs(pctP), 1) + '%',
                pregunta: 'Calcula (' + F.n(cambio, 4) + ' &minus; 1) &times; 100 (1 decimal)',
                resp: R.numero(pctP, { dec: 1, tol: 0.3, unidad: '%' }),
                pista: 'Resta 1 y multiplica por 100.',
                despues: ''
              },
              {
                seccion: 'Paso 4: por que no es ' + pct + '%',
                queHacemos: 'Comparamos con la respuesta intuitiva.',
                paraQue: 'Mucha gente contesta ' + pct + '% por simetria, pero la relacion inversa no es simetrica: bajar el volumen un ' + pct + '% no sube la presion un ' + pct + '%.',
                queda: F.n(Math.abs(pctP), 1) + '%, no ' + pct + '%',
                pregunta: '&iquest;Por que no cambia exactamente un ' + pct + '%?',
                resp: R.opcion(['Porque la relacion es inversa, y un inverso no es simetrico',
                  'Porque el enunciado tiene un error'], 0),
                pista: 'Prueba con numeros: la mitad de volumen da el doble de presion, no un 50% mas.',
                despues: ''
              }
            ],
            final: 'La presion <b>' + (pctP > 0 ? 'sube' : 'baja') + ' un ' + F.n(Math.abs(pctP), 1) + '%</b>',
            receta: ['Pasar el porcentaje a factor',
              'La presion cambia con el INVERSO de ese factor',
              'Restar 1 y multiplicar por 100 para volver a porcentaje',
              'El porcentaje no sale simetrico: la relacion es inversa']
          });
          enun = 'A temperatura constante, el volumen de un gas ' + (reduce ? 'disminuye' : 'aumenta') +
            ' un ' + pct + '%.<br>&iquest;En que porcentaje cambia su presion? (1 decimal, con signo)';
          resp = R.numero(pctP, { dec: 1, tol: 0.3, unidad: '%' });
          pistas = ['El volumen se multiplica por ' + F.n(f, 2) + '.',
            'Como P&middot;V no cambia, la presion se multiplica por 1/' + F.n(f, 2) + '.'];
          sol = ['V<sub>2</sub> = ' + F.n(f, 2) + ' V<sub>1</sub>',
            'P<sub>2</sub> = P<sub>1</sub>/' + F.n(f, 2) + ' = ' + F.n(cambio, 4) + ' P<sub>1</sub>',
            'La presion cambia un <b>' + F.n(pctP, 1) + '%</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
