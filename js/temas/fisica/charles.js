/* Ley de Charles: a presion constante, V1/T1 = V2/T2. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar, GU = EJ.guia;

  var extra = {};

  /* ---------------- hallar el volumen final (datos en Celsius) ---------------- */
  extra.volumen = function (r) {
    var c1 = r.elige([0, 20, 25, 27, 50, 100]);
    var c2 = r.elige([-73, -23, 77, 127, 227, 327]);
    while (c2 === c1) c2 = r.elige([127, 227]);
    var t1 = c1 + 273, t2 = c2 + 273;
    var v1 = r.elige([2, 3, 4, 5, 6, 8]);
    var v2 = v1 * t2 / t1;
    return {
      guia: G(GU.leyGas({
        ley: 'Charles', fija: 'la presion', inversa: false,
        leyTxt: 'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        X: { s: 'T', n: 'la temperatura', u: 'K' },
        Y: { s: 'V', n: 'el volumen', u: 'L' },
        x1: t1, y1: v1, x2: t2,
        celsius: { t1: c1, t2: c2 },
        escena: 'Un gas ocupa <b>' + v1 + ' L</b> a <b>' + c1 + ' &deg;C</b>. Sin cambiar la presion, se lleva a ' +
          '<b>' + c2 + ' &deg;C</b>.',
        porque: 'Al calentar un gas sus moleculas se mueven mas rapido y empujan mas. Si la presion tiene que quedarse igual, la unica salida es que el gas se expanda. Mas temperatura, mas volumen: van juntas.',
        ejemplo: 'Mete un globo al congelador y se arruga; sacalo al sol y se vuelve a hinchar.'
      })),
      enunciado: 'Un gas ocupa ' + v1 + ' L a ' + c1 + ' &deg;C. A presion constante se lleva a ' + c2 + ' &deg;C.<br>' +
        '&iquest;Que volumen ocupa ahora? (2 decimales)',
      respuesta: R.numero(v2, { dec: 2, tol: 0.08, unidad: 'L' }),
      pistas: ['Ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>, con las temperaturas en kelvin.',
        c1 + ' &deg;C = ' + t1 + ' K y ' + c2 + ' &deg;C = ' + t2 + ' K.'],
      solucion: ['Paso a kelvin: ' + t1 + ' K y ' + t2 + ' K',
        'V<sub>2</sub> = ' + v1 + ' &middot; ' + t2 + '/' + t1,
        'V<sub>2</sub> = <b>' + F.n(v2, 2) + ' L</b>']
    };
  };

  /* ---------------- hallar la temperatura final ---------------- */
  extra.temperatura = function (r) {
    var c1 = r.elige([0, 25, 27, 50]);
    var t1 = c1 + 273;
    var v1 = r.elige([2, 4, 5, 6]);
    var v2 = r.elige([1, 3, 8, 10, 12]);
    while (v2 === v1) v2 = r.elige([8, 10]);
    var t2 = t1 * v2 / v1;
    return {
      guia: G(GU.leyGas({
        ley: 'Charles', fija: 'la presion', inversa: false,
        leyTxt: 'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
        X: { s: 'V', n: 'el volumen', u: 'L' },
        Y: { s: 'T', n: 'la temperatura', u: 'K' },
        x1: v1, y1: t1, x2: v2,
        escena: 'Un gas ocupa <b>' + v1 + ' L</b> a <b>' + c1 + ' &deg;C</b> (' + t1 + ' K). Sin cambiar la presion, ' +
          'pasa a ocupar <b>' + v2 + ' L</b>.',
        porque: 'Volumen y temperatura van juntas a presion fija: si el gas se expandio sin que nadie tirara de el, es porque se calento. Si se encogio, se enfrio.',
        ejemplo: 'El globo del congelador se encoge porque se enfria, no porque lo aprieten.'
      })),
      enunciado: 'Un gas ocupa ' + v1 + ' L a ' + c1 + ' &deg;C. A presion constante pasa a ocupar ' + v2 + ' L.<br>' +
        '&iquest;A que temperatura esta ahora, en kelvin? (2 decimales)',
      respuesta: R.numero(t2, { dec: 2, tol: 0.5, unidad: 'K' }),
      pistas: ['Ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>.',
        'Primero pasa ' + c1 + ' &deg;C a kelvin: ' + t1 + ' K.'],
      solucion: ['T<sub>1</sub> = ' + c1 + ' + 273 = ' + t1 + ' K',
        'T<sub>2</sub> = ' + t1 + ' &middot; ' + v2 + '/' + v1,
        'T<sub>2</sub> = <b>' + F.n(t2, 2) + ' K</b>']
    };
  };

  EJ.tema({
    id: 'charles',
    materia: 'fisica',
    grupo: 'Gases',
    nombre: 'Ley de Charles',
    descripcion: 'A presion constante, volumen y temperatura van juntos: V1/T1 = V2/T2.',
    etiquetas: ['gases', 'charles', 'volumen', 'temperatura'],
    formulario: '<b>Ley de Charles</b> (presion constante):<br>' +
      'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub><br>' +
      'Volumen y temperatura son <b>directamente proporcionales</b>: si uno sube, el otro tambien.<br>' +
      '<small>Despejes: V<sub>2</sub> = V<sub>1</sub>T<sub>2</sub>/T<sub>1</sub> &middot; ' +
      'T<sub>2</sub> = T<sub>1</sub>V<sub>2</sub>/V<sub>1</sub><br>' +
      '<b>Las temperaturas SIEMPRE en kelvin:</b> K = &deg;C + 273.<br>' +
      'Con grados Celsius el resultado sale mal, y es el error mas comun del tema.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['kelvin', 'Por que hay que usar kelvin'],
          ['sencillo', 'Calculo con kelvin ya dados']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que relaciona la ley de Charles?', ok: 'El volumen y la temperatura, a presion constante',
              mal: 'La presion y el volumen', por: 'lo de presion y volumen es la ley de Boyle' },
            { q: 'En la ley de Charles, &iquest;que se mantiene constante?', ok: 'La presion',
              mal: 'La temperatura', por: 'si la temperatura no cambiara no habria nada que calcular' },
            { q: '&iquest;Como son el volumen y la temperatura segun Charles?', ok: 'Directamente proporcionales',
              mal: 'Inversamente proporcionales', por: 'al calentar, el gas se expande: suben las dos a la vez' },
            { q: 'Metes un globo inflado al congelador. &iquest;Que le pasa?', ok: 'Se encoge',
              mal: 'Se hincha mas', por: 'al bajar la temperatura baja tambien el volumen' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Charles</b> describe que le pasa al volumen de un gas cuando cambias su ' +
              'temperatura sin dejar que cambie la presion.<br>' +
              'Es la de los globos: al sol se hinchan, en el congelador se arrugan.',
            pasos: [
              {
                seccion: 'Paso 1: que magnitudes entran',
                queHacemos: 'Identificamos de que habla la ley.',
                paraQue: 'Charles liga <b>volumen</b> y <b>temperatura</b>. La presion no aparece en la formula porque se supone fija.',
                queda: 'volumen y temperatura, con P fija',
                pregunta: '&iquest;Que dos magnitudes relaciona Charles?',
                resp: R.opcion(['El volumen y la temperatura', 'La presion y el volumen'], 0),
                pista: 'La que falta en la formula es la que se mantiene constante.',
                despues: ''
              },
              {
                seccion: 'Paso 2: en que sentido',
                queHacemos: 'Decidimos si suben juntas o al reves.',
                paraQue: 'Al calentar, las moleculas se mueven mas rapido. Como la presion no puede subir, el gas se expande. Suben juntas: son directamente proporcionales.',
                queda: 'V/T = constante',
                pregunta: 'Al subir la temperatura, &iquest;que hace el volumen?',
                resp: R.opcion(['Sube tambien', 'Baja'], 0),
                pista: 'Un globo al sol se hincha.',
                despues: 'Por eso lo que se mantiene es el cociente V/T.'
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior a la pregunta.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub> y mira que aparece.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['Charles liga volumen y temperatura',
              'La presion se mantiene constante',
              'Son directamente proporcionales',
              'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['La ley de Charles es V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>, a presion constante.',
            'Aqui ' + pq.por + '.'];
          sol = ['Charles: volumen y temperatura son directamente proporcionales a P constante',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'kelvin') {
          var ck = r.elige([
            { q: '&iquest;Por que hay que pasar a kelvin antes de usar Charles?',
              ok: 'Porque la ley divide temperaturas, y Celsius tiene el cero en el sitio equivocado',
              corto: 'Celsius tiene mal el cero', mal: 'Por costumbre: con Celsius tambien sale',
              por: 'dividir 40 entre 20 no es lo mismo que dividir 313 entre 293' },
            { q: 'Un gas pasa de 10 &deg;C a 20 &deg;C. &iquest;Se duplica su volumen?',
              ok: 'No: en kelvin es de 283 a 293, un cambio minimo', corto: 'no: 283 a 293 K',
              mal: 'Si, porque la temperatura se duplico',
              por: 'la temperatura que cuenta es la absoluta, y ahi apenas subio un 3%' },
            { q: 'Si usas Celsius y una temperatura es 0 &deg;C, &iquest;que pasa?',
              ok: 'Sale una division entre cero, que no tiene sentido', corto: 'division entre cero',
              mal: 'Sale correcto igualmente', por: 'eso deja a la vista que Celsius no sirve para esta formula' },
            { q: '&iquest;Como se pasa de grados Celsius a kelvin?', ok: 'Sumando 273', mal: 'Multiplicando por 273',
              por: 'las dos escalas tienen el mismo tamano de grado, solo cambia donde empiezan' }
          ]);
          guiaDelPaso = G({
            intro: 'Antes de tocar numeros hay que entender <b>por que Charles exige kelvin</b>.<br>' +
              'No es una mania: usar grados Celsius aqui da resultados sencillamente falsos.',
            pasos: [
              {
                seccion: 'Paso 1: que hace la formula',
                queHacemos: 'Miramos que operacion aparece.',
                paraQue: 'La ley compara temperaturas <b>dividiendolas</b>. Y un cociente solo significa algo si el cero de la escala es un cero de verdad.',
                queda: 'la ley divide T<sub>2</sub> entre T<sub>1</sub>',
                pregunta: '&iquest;Que operacion hace la ley con las dos temperaturas?',
                resp: R.opcion(['Las divide una entre otra', 'Las resta'], 0),
                pista: 'Mira V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el problema del cero',
                queHacemos: 'Pensamos donde esta el cero de cada escala.',
                paraQue: 'El 0 &deg;C es solo la congelacion del agua, un punto cualquiera. El 0 K es la ausencia total de agitacion. Dividir solo tiene sentido desde el cero de verdad.',
                queda: '0 &deg;C no es "nada de temperatura"',
                pregunta: '&iquest;Que representa el 0 K que no representa el 0 &deg;C?',
                resp: R.opcion(['La temperatura minima posible', 'La congelacion del agua'], 0),
                pista: 'El 0 &deg;C es la congelacion del agua, nada mas.',
                despues: 'Por eso hay que sumar 273 antes de dividir.'
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + ck.por + '.',
                queda: ck.corto || ck.ok,
                pregunta: ck.q,
                resp: R.opcion([ck.ok, ck.mal], 0),
                pista: 'Prueba a hacer la cuenta en las dos escalas y compara.',
                despues: ''
              }
            ],
            final: '<b>' + ck.ok + '</b>',
            receta: ['Charles divide temperaturas',
              'Dividir exige una escala con el cero real',
              'K = &deg;C + 273',
              'Convertir SIEMPRE antes de aplicar la ley']
          });
          enun = ck.q;
          resp = R.opcion([ck.ok, ck.mal], 0);
          pistas = ['La ley divide una temperatura entre otra, asi que necesita la escala absoluta.',
            'Aqui ' + ck.por + '.'];
          sol = ['Charles compara temperaturas dividiendolas: hacen falta kelvin',
            'Aqui ' + ck.por,
            'Respuesta: <b>' + ck.ok + '</b>'];

        } else {
          var tA = r.elige([200, 250, 300, 400]);
          var tB = r.elige([100, 150, 500, 600, 800]);
          while (tB === tA) tB = r.elige([600, 800]);
          var vA = r.elige([2, 3, 4, 6]);
          var vB = vA * tB / tA;
          guiaDelPaso = G(GU.leyGas({
            ley: 'Charles', fija: 'la presion', inversa: false,
        leyTxt: 'V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
        malTxt: 'P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>',
            X: { s: 'T', n: 'la temperatura', u: 'K' },
            Y: { s: 'V', n: 'el volumen', u: 'L' },
            x1: tA, y1: vA, x2: tB,
            escena: 'Un gas ocupa <b>' + vA + ' L</b> a <b>' + tA + ' K</b>. Sin cambiar la presion, se lleva a ' +
              '<b>' + tB + ' K</b>.<br>Aqui las temperaturas ya vienen en kelvin, asi que no hay que convertir nada.',
            porque: 'Al calentar un gas sus moleculas empujan mas fuerte. Si la presion no puede subir, el gas se expande. Temperatura y volumen suben juntos.',
            ejemplo: 'Un globo al sol se hincha; en el congelador se arruga.'
          }));
          enun = 'Un gas ocupa ' + vA + ' L a ' + tA + ' K. A presion constante se lleva a ' + tB + ' K.<br>' +
            '&iquest;Que volumen ocupa ahora? (2 decimales)';
          resp = R.numero(vB, { dec: 2, tol: 0.08, unidad: 'L' });
          pistas = ['Ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>.',
            'Ya estan en kelvin: V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.'];
          sol = ['V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>',
            'V<sub>2</sub> = ' + vA + ' &middot; ' + tB + '/' + tA,
            'V<sub>2</sub> = <b>' + F.n(vB, 2) + ' L</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['volumen', 'Hallar el volumen final'],
          ['temperatura', 'Hallar la temperatura final'],
          ['globo', 'El globo en el congelador']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var cAmb = r.elige([20, 25, 27]);
        var cCong = r.elige([-18, -20, -15]);
        var tAmb = cAmb + 273, tCong = cCong + 273;
        var vAmb = r.elige([2, 2.5, 3, 4]);
        var vCong = vAmb * tCong / tAmb;
        var baja = (1 - vCong / vAmb) * 100;
        guiaDelPaso = G({
          intro: 'Un globo de <b>' + F.n(vAmb, 1) + ' L</b> esta a <b>' + cAmb + ' &deg;C</b>. Se mete al congelador, ' +
            'a <b>' + cCong + ' &deg;C</b>.<br>' +
            'Todo el mundo sabe que se va a arrugar. Lo interesante es <b>cuanto</b>: casi siempre menos de lo que uno espera.',
          pasos: [
            {
              seccion: 'Paso 1: a kelvin',
              queHacemos: 'Convertimos las dos temperaturas.',
              paraQue: 'Aqui hay una negativa, y en kelvin deja de serlo. Trabajar con un &minus;' + Math.abs(cCong) + ' en una division daria un volumen negativo, que no existe.',
              queda: tAmb + ' K y ' + tCong + ' K',
              pregunta: 'Convierte ' + cCong + ' &deg;C a kelvin (0 decimales)',
              resp: R.numero(tCong, { dec: 0, tol: 0.5, unidad: 'K' }),
              pista: 'Suma 273, aunque el numero sea negativo.',
              despues: 'Y ' + cAmb + ' &deg;C = ' + tAmb + ' K.'
            },
            {
              seccion: 'Paso 2: el factor',
              queHacemos: 'Dividimos la temperatura nueva entre la vieja.',
              paraQue: 'Ese cociente es la proporcion en que cambia el volumen. Fijate en que sale cerca de 1: es la clave de todo el ejercicio.',
              queda: tCong + '/' + tAmb + ' = ' + F.n(tCong / tAmb, 4),
              pregunta: 'Calcula ' + tCong + ' &divide; ' + tAmb + ' (4 decimales)',
              resp: R.numero(tCong / tAmb, { dec: 4, tol: 0.0015 }),
              pista: 'Division directa.',
              despues: ''
            },
            {
              seccion: 'Paso 3: el volumen nuevo',
              queHacemos: 'Multiplicamos el volumen inicial por ese factor.',
              paraQue: 'Charles en estado puro: V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.',
              queda: 'V<sub>2</sub> = ' + F.n(vCong, 3) + ' L',
              pregunta: 'Calcula ' + F.n(vAmb, 1) + ' &times; ' + F.n(tCong / tAmb, 4) + ' (3 decimales)',
              resp: R.numero(vCong, { dec: 3, tol: 0.01, unidad: 'L' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 4: cuanto se encogio',
              queHacemos: 'Calculamos el porcentaje perdido.',
              paraQue: 'Solo un ' + F.n(baja, 1) + '%, aunque bajaste ' + F.n(cAmb - cCong, 0) + ' grados Celsius. En kelvin ese salto es pequeno comparado con los ' + tAmb + ' de partida.',
              queda: 'se encoge un ' + F.n(baja, 1) + '%',
              pregunta: 'Calcula (1 &minus; ' + F.n(tCong / tAmb, 4) + ') &times; 100 (1 decimal)',
              resp: R.numero(baja, { dec: 1, tol: 0.3, unidad: '%' }),
              pista: 'Resta el factor a 1 y multiplica por 100.',
              despues: ''
            },
            {
              seccion: 'Paso 5: por que se nota tan poco',
              queHacemos: 'Le damos sentido al resultado.',
              paraQue: 'En Celsius parece un cambio brutal. En kelvin, que es la escala que manda, pasar de ' + tAmb + ' a ' + tCong + ' es una bajada de apenas el ' + F.n(baja, 1) + '%.',
              queda: F.n(vAmb, 1) + ' &rarr; ' + F.n(vCong, 2) + ' L',
              pregunta: '&iquest;Por que el globo no se encoge mucho mas?',
              resp: R.opcion(['Porque en kelvin la temperatura bajo poco en proporcion',
                'Porque el hule del globo lo impide'], 0),
              pista: 'Compara ' + tCong + ' con ' + tAmb + ', no ' + cCong + ' con ' + cAmb + '.',
              despues: ''
            }
          ],
          final: 'En el congelador el globo mide <b>' + F.n(vCong, 2) + ' L</b>',
          receta: ['Pasar las dos temperaturas a kelvin',
            'Las negativas en Celsius dejan de serlo en kelvin',
            'V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>',
            'En kelvin los saltos son proporcionalmente pequenos']
        });
        enun = 'Un globo de ' + F.n(vAmb, 1) + ' L a ' + cAmb + ' &deg;C se mete a un congelador a ' + cCong + ' &deg;C.<br>' +
          '&iquest;Que volumen tiene dentro del congelador? (2 decimales)';
        resp = R.numero(vCong, { dec: 2, tol: 0.05, unidad: 'L' });
        pistas = ['Pasa las dos temperaturas a kelvin: ' + tAmb + ' K y ' + tCong + ' K.',
          'V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.'];
        sol = ['T<sub>1</sub> = ' + tAmb + ' K, T<sub>2</sub> = ' + tCong + ' K',
          'V<sub>2</sub> = ' + F.n(vAmb, 1) + ' &middot; ' + tCong + '/' + tAmb,
          'V<sub>2</sub> = <b>' + F.n(vCong, 2) + ' L</b>, un ' + F.n(baja, 1) + '% menos'];

      } else {
        var t3 = r.subtema([
          ['ceroAbs', 'Extrapolar al cero absoluto'],
          ['porcentaje', 'Expansion en porcentaje'],
          ['volumen', 'Hallar el volumen final']
        ]);
        if (t3 === 'volumen') return extra.volumen(r, dif);

        if (t3 === 'ceroAbs') {
          var tRef = r.elige([300, 400, 500]);
          var vRef = r.elige([4, 5, 6, 8]);
          var tBaja = r.elige([100, 150, 200]);
          var vBaja = vRef * tBaja / tRef;
          guiaDelPaso = G({
            intro: 'Un gas ocupa <b>' + vRef + ' L</b> a <b>' + tRef + ' K</b>, a presion constante.<br>' +
              'Charles no solo sirve para calcular volumenes: extrapolando su recta fue como se <b>descubrio</b> ' +
              'donde estaba el cero absoluto, mucho antes de poder acercarse a el.',
            pasos: [
              {
                seccion: 'Paso 1: el volumen a temperatura baja',
                queHacemos: 'Aplicamos Charles hasta ' + tBaja + ' K.',
                paraQue: 'Vemos como el volumen baja proporcionalmente con la temperatura absoluta.',
                queda: 'a ' + tBaja + ' K ocupa ' + F.n(vBaja, 2) + ' L',
                pregunta: 'Calcula ' + vRef + ' &times; ' + tBaja + ' &divide; ' + tRef + ' (2 decimales)',
                resp: R.numero(vBaja, { dec: 2, tol: 0.05, unidad: 'L' }),
                pista: 'V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.',
                despues: ''
              },
              {
                seccion: 'Paso 2: seguir bajando',
                queHacemos: 'Miramos que pasa segun T se acerca a cero.',
                paraQue: 'Como V es proporcional a T, al acercarse T a 0 K el volumen calculado se acerca a cero tambien. La recta corta el eje justo ahi.',
                queda: 'en 0 K la recta da V = 0',
                pregunta: 'Segun la formula, &iquest;que volumen daria a 0 K? (0 decimales)',
                resp: R.numero(0, { dec: 0, tol: 0.1, unidad: 'L' }),
                pista: 'Multiplica por 0.',
                despues: ''
              },
              {
                seccion: 'Paso 3: como se uso esto',
                queHacemos: 'Vemos que se hizo con ese dato.',
                paraQue: 'Midiendo volumenes a temperaturas normales y prolongando la recta hacia abajo, se vio que cortaba el eje en &minus;273 &deg;C. Asi se localizo el cero absoluto sin llegar ni de lejos a el.',
                queda: 'la recta corta en &minus;273 &deg;C',
                pregunta: '&iquest;Como se localizo el cero absoluto con esta ley?',
                resp: R.opcion(['Prolongando la recta de volumen hasta que corta el eje',
                  'Enfriando un gas hasta llegar ahi'], 0),
                pista: 'Nadie ha llegado nunca a 0 K.',
                despues: ''
              },
              {
                seccion: 'Paso 4: por que es solo teorico',
                queHacemos: 'Miramos el limite del razonamiento.',
                paraQue: 'Ningun gas llega a volumen cero: mucho antes se licua y deja de comportarse como gas. La recta es una extrapolacion, no una prediccion literal.',
                queda: 'antes de llegar, el gas se licua',
                pregunta: '&iquest;Por que ningun gas llega de verdad a volumen cero?',
                resp: R.opcion(['Porque antes se convierte en liquido', 'Porque la ley esta equivocada'], 0),
                pista: 'La ley vale mientras siga siendo un gas.',
                despues: ''
              }
            ],
            final: 'A ' + tBaja + ' K ocuparia <b>' + F.n(vBaja, 2) + ' L</b>',
            receta: ['V es proporcional a T absoluta',
              'Al acercarse T a 0 K, la recta da V = 0',
              'Prolongando esa recta se localizo el cero absoluto',
              'En la practica el gas se licua mucho antes']
          });
          enun = 'Un gas ocupa ' + vRef + ' L a ' + tRef + ' K, a presion constante.<br>' +
            '&iquest;Que volumen ocuparia a ' + tBaja + ' K? (2 decimales)';
          resp = R.numero(vBaja, { dec: 2, tol: 0.05, unidad: 'L' });
          pistas = ['V<sub>2</sub> = V<sub>1</sub> &middot; T<sub>2</sub>/T<sub>1</sub>.',
            'Las dos temperaturas ya estan en kelvin.'];
          sol = ['V<sub>2</sub> = ' + vRef + ' &middot; ' + tBaja + '/' + tRef,
            'V<sub>2</sub> = <b>' + F.n(vBaja, 2) + ' L</b>',
            'Prolongando esta recta hasta V = 0 se llega a 0 K, el cero absoluto'];

        } else {
          var cIni = r.elige([20, 25, 27, 30]);
          var tIni = cIni + 273;
          var subeC = r.elige([30, 50, 60, 100]);
          var tFin = tIni + subeC;
          var pctV = (tFin / tIni - 1) * 100;
          guiaDelPaso = G({
            intro: 'Un gas a <b>' + cIni + ' &deg;C</b> se calienta <b>' + subeC + ' grados</b> a presion constante.<br>' +
              'La pregunta es en <b>que porcentaje</b> se expande. Aqui se ve de golpe por que mezclar escalas ' +
              'es tan peligroso.',
            pasos: [
              {
                seccion: 'Paso 1: las dos temperaturas en kelvin',
                queHacemos: 'Convertimos la inicial y la final.',
                paraQue: 'Subir ' + subeC + ' grados es lo mismo en las dos escalas, pero los valores absolutos no lo son. De ' + tIni + ' K se pasa a ' + tFin + ' K.',
                queda: tIni + ' K &rarr; ' + tFin + ' K',
                pregunta: 'Convierte ' + cIni + ' &deg;C a kelvin (0 decimales)',
                resp: R.numero(tIni, { dec: 0, tol: 0.5, unidad: 'K' }),
                pista: 'Suma 273.',
                despues: 'Y la final: ' + tIni + ' + ' + subeC + ' = ' + tFin + ' K.'
              },
              {
                seccion: 'Paso 2: el factor de expansion',
                queHacemos: 'Dividimos la final entre la inicial.',
                paraQue: 'Como V es proporcional a T, ese cociente es exactamente el factor por el que se multiplica el volumen.',
                queda: tFin + '/' + tIni + ' = ' + F.n(tFin / tIni, 4),
                pregunta: 'Calcula ' + tFin + ' &divide; ' + tIni + ' (4 decimales)',
                resp: R.numero(tFin / tIni, { dec: 4, tol: 0.0015 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: a porcentaje',
                queHacemos: 'Restamos 1 y multiplicamos por 100.',
                paraQue: 'El volumen crece un ' + F.n(pctV, 1) + '%, no un ' + subeC + '%. Son cosas muy distintas.',
                queda: 'se expande un ' + F.n(pctV, 1) + '%',
                pregunta: 'Calcula (' + F.n(tFin / tIni, 4) + ' &minus; 1) &times; 100 (1 decimal)',
                resp: R.numero(pctV, { dec: 1, tol: 0.3, unidad: '%' }),
                pista: 'Resta 1 y multiplica por 100.',
                despues: ''
              },
              {
                seccion: 'Paso 4: la trampa',
                queHacemos: 'Comparamos con el error tipico.',
                paraQue: 'Si hubieras trabajado en Celsius, ' + cIni + ' &rarr; ' + (cIni + subeC) + ' daria un factor de ' + F.n((cIni + subeC) / cIni, 2) + ', o sea un ' + F.n(((cIni + subeC) / cIni - 1) * 100, 0) + '% de expansion. Nada que ver con el ' + F.n(pctV, 1) + '% real.',
                queda: 'en Celsius habria dado ' + F.n(((cIni + subeC) / cIni - 1) * 100, 0) + '%: falso',
                pregunta: '&iquest;Por que en Celsius sale un numero tan distinto?',
                resp: R.opcion(['Porque su cero no es el cero real, y el cociente sale falseado',
                  'Porque los grados Celsius son mas pequenos'], 0),
                pista: 'Los grados miden igual: lo que cambia es desde donde se cuenta.',
                despues: ''
              }
            ],
            final: 'El gas se expande un <b>' + F.n(pctV, 1) + '%</b>',
            receta: ['Pasar las dos temperaturas a kelvin',
              'El factor es T<sub>2</sub>/T<sub>1</sub>',
              'Restar 1 y multiplicar por 100',
              'En Celsius el porcentaje sale falseado']
          });
          enun = 'Un gas a ' + cIni + ' &deg;C se calienta ' + subeC + ' grados a presion constante.<br>' +
            '&iquest;En que porcentaje aumenta su volumen? (1 decimal)';
          resp = R.numero(pctV, { dec: 1, tol: 0.3, unidad: '%' });
          pistas = ['En kelvin pasa de ' + tIni + ' K a ' + tFin + ' K.',
            'El volumen se multiplica por T<sub>2</sub>/T<sub>1</sub>.'];
          sol = [tIni + ' K &rarr; ' + tFin + ' K',
            'Factor = ' + tFin + '/' + tIni + ' = ' + F.n(tFin / tIni, 4),
            'Aumenta un <b>' + F.n(pctV, 1) + '%</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
