/* Ley de Ohm: V = IR, y la potencia electrica P = VI. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  var extra = {};

  /* ---------------- hallar la corriente ---------------- */
  extra.corriente = function (r) {
    var v = r.elige([6, 9, 12, 24, 120, 220]);
    var res = r.elige([2, 4, 5, 10, 20, 50, 100]);
    var i = v / res;
    return {
      guia: G({
        intro: 'Por una resistencia de <b>' + res + ' &Omega;</b> se aplica un voltaje de <b>' + v + ' V</b>.<br>' +
          'La ley de Ohm, <b>V = IR</b>, relaciona las tres magnitudes del circuito. Aqui la incognita es la ' +
          '<b>corriente</b>.',
        pasos: [
          {
            seccion: 'Paso 1: identificar los datos',
            queHacemos: 'Ordenamos que tenemos y que buscamos.',
            paraQue: 'Tenemos V y R, buscamos I. Con eso ya sabemos cual de los tres despejes toca.',
            queda: 'V = ' + v + ', R = ' + res + ', falta I',
            pregunta: '&iquest;Que magnitud hay que despejar?',
            resp: R.opcion(['La corriente I', 'La resistencia R'], 0),
            pista: 'La resistencia te la dan en el enunciado.',
            despues: ''
          },
          {
            seccion: 'Paso 2: despejar',
            queHacemos: 'De V = IR sacamos la corriente.',
            paraQue: 'Queda I = V/R. La R estaba multiplicando, asi que pasa dividiendo.',
            queda: 'I = ' + v + ' / ' + res,
            pregunta: '&iquest;Como queda despejada la corriente?',
            resp: R.opcion(['I = V/R', 'I = V&middot;R'], 0),
            pista: 'Deja sola la I.',
            despues: ''
          },
          {
            seccion: 'Paso 3: calcular',
            queHacemos: 'Hacemos la division.',
            paraQue: 'Con V en voltios y R en ohmios, la corriente sale directamente en amperios.',
            queda: 'I = ' + F.n(i, 2) + ' A',
            pregunta: 'Calcula ' + v + ' &divide; ' + res + ' (2 decimales)',
            resp: R.numero(i, { dec: 2, tol: 0.02, unidad: 'A' }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: leer el resultado',
            queHacemos: 'Pensamos que pasaria con mas resistencia.',
            paraQue: 'La resistencia esta dividiendo: si fuera mayor, pasaria menos corriente. Por eso se llama resistencia, porque se opone al paso.',
            queda: 'I = ' + F.n(i, 2) + ' A',
            pregunta: 'Con el doble de resistencia y el mismo voltaje, &iquest;que corriente pasaria?',
            resp: R.opcion(['La mitad', 'El doble'], 0),
            pista: 'La R esta en el denominador.',
            despues: ''
          }
        ],
        final: 'I = <b>' + F.n(i, 2) + ' A</b>',
        receta: ['V = IR',
          'I = V/R',
          'Voltios entre ohmios da amperios',
          'Mas resistencia, menos corriente']
      }),
      enunciado: 'Por una resistencia de ' + res + ' &Omega; se aplican ' + v + ' V.<br>' +
        '&iquest;Que corriente circula? (2 decimales)',
      respuesta: R.numero(i, { dec: 2, tol: 0.02, unidad: 'A' }),
      pistas: ['Ley de Ohm: V = IR.',
        'Despejando: I = V/R.'],
      solucion: ['V = IR',
        'I = ' + v + '/' + res,
        'I = <b>' + F.n(i, 2) + ' A</b>']
    };
  };

  /* ---------------- hallar la resistencia ---------------- */
  extra.resistencia = function (r) {
    var v = r.elige([6, 9, 12, 24, 120]);
    var i = r.elige([0.5, 1, 2, 3, 4, 0.25]);
    var res = v / i;
    return {
      guia: G({
        intro: 'Un componente conectado a <b>' + v + ' V</b> deja pasar <b>' + F.n(i, 2) + ' A</b>.<br>' +
          'Buscamos su <b>resistencia</b>: cuanto se opone al paso de la corriente.',
        pasos: [
          {
            seccion: 'Paso 1: despejar',
            queHacemos: 'De V = IR sacamos la resistencia.',
            paraQue: 'Queda R = V/I. La corriente estaba multiplicando y pasa dividiendo.',
            queda: 'R = ' + v + ' / ' + F.n(i, 2),
            pregunta: '&iquest;Como queda despejada la resistencia?',
            resp: R.opcion(['R = V/I', 'R = V&middot;I'], 0),
            pista: 'Deja sola la R.',
            despues: ''
          },
          {
            seccion: 'Paso 2: calcular',
            queHacemos: 'Hacemos la division.',
            paraQue: 'Voltios entre amperios da ohmios.',
            queda: 'R = ' + F.n(res, 2) + ' &Omega;',
            pregunta: 'Calcula ' + v + ' &divide; ' + F.n(i, 2) + ' (2 decimales)',
            resp: R.numero(res, { dec: 2, tol: 0.05, unidad: '&Omega;' }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 3: comprobar',
            queHacemos: 'Volvemos a la formula original.',
            paraQue: 'Multiplicando I por R hay que recuperar el voltaje. Es la comprobacion mas rapida de un despeje.',
            queda: 'I&middot;R = ' + v + ' V: correcto',
            pregunta: 'Calcula ' + F.n(i, 2) + ' &times; ' + F.n(res, 2) + ' (0 decimales)',
            resp: R.numero(v, { dec: 0, tol: 0.6, unidad: 'V' }),
            pista: 'Tiene que dar los ' + v + ' V del enunciado.',
            despues: ''
          },
          {
            seccion: 'Paso 4: que significa',
            queHacemos: 'Interpretamos el numero.',
            paraQue: 'Una resistencia grande deja pasar poca corriente con el mismo voltaje. Un cable bueno tiene casi cero; un aislante, millones de ohmios.',
            queda: 'R = ' + F.n(res, 2) + ' &Omega;',
            pregunta: 'Un material con resistencia enorme, &iquest;que es?',
            resp: R.opcion(['Un aislante', 'Un buen conductor'], 0),
            pista: 'Mucha resistencia quiere decir que casi no deja pasar corriente.',
            despues: ''
          }
        ],
        final: 'R = <b>' + F.n(res, 2) + ' &Omega;</b>',
        receta: ['V = IR',
          'R = V/I',
          'Voltios entre amperios da ohmios',
          'Comprobar que I&middot;R devuelve el voltaje']
      }),
      enunciado: 'Un componente conectado a ' + v + ' V deja pasar ' + F.n(i, 2) + ' A.<br>' +
        '&iquest;Cual es su resistencia? (2 decimales)',
      respuesta: R.numero(res, { dec: 2, tol: 0.05, unidad: '&Omega;' }),
      pistas: ['Ley de Ohm: V = IR.',
        'Despejando: R = V/I.'],
      solucion: ['V = IR',
        'R = ' + v + '/' + F.n(i, 2),
        'R = <b>' + F.n(res, 2) + ' &Omega;</b>']
    };
  };

  EJ.tema({
    id: 'ohm',
    materia: 'fisica',
    grupo: 'Electromagnetismo y optica',
    nombre: 'Ley de Ohm',
    descripcion: 'Voltaje, corriente y resistencia: V = IR, mas la potencia electrica.',
    etiquetas: ['ohm', 'electricidad', 'corriente', 'resistencia', 'potencia'],
    formulario: '<b>Ley de Ohm:</b> V = I &middot; R<br>' +
      'V = voltaje (V) &middot; I = corriente (A) &middot; R = resistencia (&Omega;)<br>' +
      '<b>Despejes:</b> I = V/R &middot; R = V/I<br>' +
      '<b>Potencia:</b> P = V&middot;I = I&sup2;R = V&sup2;/R &nbsp;(W)<br>' +
      '<b>Energia:</b> E = P &middot; t &nbsp;(1 kWh = 1000 W durante 1 hora)<br>' +
      '<small>Resistencias en <b>serie</b>: R = R<sub>1</sub> + R<sub>2</sub> (se suman, la corriente es la misma).<br>' +
      'En <b>paralelo</b>: 1/R = 1/R<sub>1</sub> + 1/R<sub>2</sub> (el total baja, el voltaje es el mismo).</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['voltaje', 'Hallar el voltaje'],
          ['despejes', 'Los tres despejes']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que relaciona la ley de Ohm?', ok: 'El voltaje, la corriente y la resistencia',
              mal: 'La potencia y la energia', por: 'la potencia es otra formula, P = VI' },
            { q: 'Con el mismo voltaje, si subes la resistencia, &iquest;que pasa con la corriente?',
              ok: 'Baja', mal: 'Sube', por: 'la resistencia se opone al paso de la corriente' },
            { q: 'Con la misma resistencia, si subes el voltaje, &iquest;que pasa con la corriente?',
              ok: 'Sube proporcionalmente', mal: 'Baja', por: 'el voltaje es el que empuja a los electrones' },
            { q: '&iquest;Que papel juega el voltaje en un circuito?',
              ok: 'Es el empuje que mueve la corriente', mal: 'Es la cantidad de electrones que pasan',
              por: 'la cantidad que pasa es la corriente; el voltaje es lo que la impulsa' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Ohm</b> es la formula basica de todo circuito: <b>V = IR</b>.<br>' +
              'Una analogia que funciona: el voltaje es la presion del agua, la corriente es el caudal que pasa, ' +
              'y la resistencia es lo estrecha que esta la tuberia.',
            pasos: [
              {
                seccion: 'Paso 1: las tres magnitudes',
                queHacemos: 'Ponemos nombre a cada una.',
                paraQue: 'Voltaje (V) es el empuje; corriente (I) es lo que pasa; resistencia (R) es lo que estorba. Confundir voltaje con corriente es el lio mas frecuente al empezar.',
                queda: 'V empuja, I pasa, R estorba',
                pregunta: '&iquest;Que representa la corriente?',
                resp: R.opcion(['La cantidad de carga que pasa', 'El empuje que la mueve'], 0),
                pista: 'El empuje es el voltaje.',
                despues: ''
              },
              {
                seccion: 'Paso 2: como se relacionan',
                queHacemos: 'Leemos la formula.',
                paraQue: 'V = IR quiere decir que con mas voltaje pasa mas corriente, y con mas resistencia pasa menos. Las dos cosas a la vez.',
                queda: 'V = I&middot;R',
                pregunta: 'Con mas resistencia y el mismo voltaje, &iquest;que hace la corriente?',
                resp: R.opcion(['Baja', 'Sube'], 0),
                pista: 'Tuberia mas estrecha, menos caudal.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a V = IR y mira que esta multiplicando y que dividiendo.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['V = IR',
              'V es el empuje, I lo que pasa, R lo que estorba',
              'Mas voltaje, mas corriente',
              'Mas resistencia, menos corriente']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['La ley de Ohm es V = IR.',
            'Aqui ' + pq.por + '.'];
          sol = ['Ohm relaciona voltaje, corriente y resistencia',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'voltaje') {
          var iV = r.elige([0.5, 1, 2, 3, 5]);
          var rV = r.elige([4, 10, 12, 20, 50, 100]);
          var vV = iV * rV;
          guiaDelPaso = G({
            intro: 'Por una resistencia de <b>' + rV + ' &Omega;</b> circulan <b>' + F.n(iV, 1) + ' A</b>.<br>' +
              'Es el caso mas directo de la ley: tenemos I y R, y buscamos V. Solo hay que multiplicar.',
            pasos: [
              {
                seccion: 'Paso 1: la formula tal cual',
                queHacemos: 'Usamos V = IR sin despejar nada.',
                paraQue: 'La incognita ya esta sola en la formula original: es el unico caso donde no hay que mover nada.',
                queda: 'V = ' + F.n(iV, 1) + ' &times; ' + rV,
                pregunta: '&iquest;Hay que despejar algo?',
                resp: R.opcion(['No: V ya esta sola', 'Si, hay que dividir'], 0),
                pista: 'Mira donde esta la V en V = IR.',
                despues: ''
              },
              {
                seccion: 'Paso 2: multiplicar',
                queHacemos: 'Hacemos la cuenta.',
                paraQue: 'Amperios por ohmios da voltios.',
                queda: 'V = ' + F.n(vV, 1) + ' V',
                pregunta: 'Calcula ' + F.n(iV, 1) + ' &times; ' + rV + ' (1 decimal)',
                resp: R.numero(vV, { dec: 1, tol: 0.1, unidad: 'V' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: que significa',
                queHacemos: 'Interpretamos el resultado.',
                paraQue: 'Son los voltios que hay que aplicar para que pasen esos ' + F.n(iV, 1) + ' A por esa resistencia. Se llama caida de tension en la resistencia.',
                queda: 'V = ' + F.n(vV, 1) + ' V',
                pregunta: 'Con el doble de corriente por la misma resistencia, &iquest;que voltaje haria falta?',
                resp: R.opcion(['El doble', 'La mitad'], 0),
                pista: 'La corriente esta multiplicando.',
                despues: ''
              }
            ],
            final: 'V = <b>' + F.n(vV, 1) + ' V</b>',
            receta: ['V = IR, sin despejar nada',
              'Amperios por ohmios da voltios',
              'Es la caida de tension en la resistencia',
              'Doble de corriente, doble de voltaje']
          });
          enun = 'Por una resistencia de ' + rV + ' &Omega; circulan ' + F.n(iV, 1) + ' A.<br>' +
            '&iquest;Que voltaje hay en sus extremos? (1 decimal)';
          resp = R.numero(vV, { dec: 1, tol: 0.1, unidad: 'V' });
          pistas = ['Ley de Ohm: V = IR.',
            'Aqui la V ya esta despejada.'];
          sol = ['V = IR',
            'V = ' + F.n(iV, 1) + ' &middot; ' + rV,
            'V = <b>' + F.n(vV, 1) + ' V</b>'];

        } else {
          var cd = r.elige([
            { q: 'Te dan el voltaje y la resistencia, y buscas la corriente.', ok: 'I = V/R', mal: 'I = V&middot;R',
              por: 'la R estaba multiplicando a la I, asi que pasa dividiendo' },
            { q: 'Te dan el voltaje y la corriente, y buscas la resistencia.', ok: 'R = V/I', mal: 'R = V&middot;I',
              por: 'la I estaba multiplicando a la R, asi que pasa dividiendo' },
            { q: 'Te dan la corriente y la resistencia, y buscas el voltaje.', ok: 'V = I&middot;R', mal: 'V = I/R',
              por: 'la formula ya viene despejada para V' },
            { q: 'Duplicas el voltaje y tambien la resistencia. &iquest;Que pasa con la corriente?',
              ok: 'Se queda igual', mal: 'Se duplica',
              por: 'al multiplicar arriba y abajo por dos, el cociente V/R no cambia' }
          ]);
          guiaDelPaso = G({
            intro: 'De V = IR salen <b>tres formulas</b>, segun lo que busques. Merece la pena tenerlas ' +
              'automatizadas: casi todo ejercicio de circuitos empieza por elegir la correcta.',
            pasos: [
              {
                seccion: 'Paso 1: la formula base',
                queHacemos: 'Partimos siempre de la misma.',
                paraQue: 'V = IR es la unica que hay que memorizar. Las otras dos salen de despejar, y despejar mal es el error mas comun.',
                queda: 'V = I&middot;R',
                pregunta: '&iquest;Cual es la formula de partida?',
                resp: R.opcion(['V = IR', 'I = VR'], 0),
                pista: 'El voltaje es el producto de los otros dos.',
                despues: ''
              },
              {
                seccion: 'Paso 2: los dos despejes',
                queHacemos: 'Sacamos I y R.',
                paraQue: 'Lo que esta multiplicando pasa dividiendo: I = V/R y R = V/I. Fijate en que la V siempre queda arriba.',
                queda: 'I = V/R &middot; R = V/I',
                pregunta: 'En los dos despejes, &iquest;donde queda siempre la V?',
                resp: R.opcion(['Arriba, en el numerador', 'Abajo, en el denominador'], 0),
                pista: 'La V nunca divide.',
                despues: 'Ese detalle ayuda a no equivocarse.'
              },
              {
                seccion: 'Paso 3: elegir',
                queHacemos: 'Aplicamos al caso.',
                paraQue: 'Aqui ' + cd.por + '.',
                queda: cd.ok,
                pregunta: cd.q + '<br>&iquest;Que formula usas?',
                resp: R.opcion([cd.ok, cd.mal], 0),
                pista: 'Mira que dos datos tienes.',
                despues: ''
              }
            ],
            final: '<b>' + cd.ok + '</b>',
            receta: ['Memorizar solo V = IR',
              'I = V/R cuando falta la corriente',
              'R = V/I cuando falta la resistencia',
              'La V siempre queda arriba']
          });
          enun = cd.q + '<br>&iquest;Que formula corresponde?';
          resp = R.opcion([cd.ok, cd.mal], 0);
          pistas = ['Todo sale de V = IR.',
            'Aqui ' + cd.por + '.'];
          sol = ['De V = IR salen I = V/R y R = V/I',
            'Aqui ' + cd.por,
            'Respuesta: <b>' + cd.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['corriente', 'Hallar la corriente'],
          ['resistencia', 'Hallar la resistencia'],
          ['potencia', 'Potencia electrica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var vP = r.elige([12, 24, 120, 220]);
        var rP = r.elige([10, 20, 44, 50, 100]);
        var iP = vP / rP;
        var pot = vP * iP;
        guiaDelPaso = G({
          intro: 'Una resistencia de <b>' + rP + ' &Omega;</b> se conecta a <b>' + vP + ' V</b>.<br>' +
            'Ademas de la corriente, interesa la <b>potencia</b>: cuanta energia consume por segundo. ' +
            'Es lo que aparece en la etiqueta de cualquier aparato.',
          pasos: [
            {
              seccion: 'Paso 1: la corriente',
              queHacemos: 'Aplicamos I = V/R.',
              paraQue: 'Necesitamos la corriente para poder calcular la potencia con P = VI.',
              queda: 'I = ' + F.n(iP, 2) + ' A',
              pregunta: 'Calcula ' + vP + ' &divide; ' + rP + ' (2 decimales)',
              resp: R.numero(iP, { dec: 2, tol: 0.02, unidad: 'A' }),
              pista: 'Division directa.',
              despues: ''
            },
            {
              seccion: 'Paso 2: que es la potencia',
              queHacemos: 'Fijamos el concepto antes de calcular.',
              paraQue: 'La potencia es energia por segundo, y se mide en vatios. No es lo mismo que la energia total: eso depende ademas del tiempo que lo tengas encendido.',
              queda: 'potencia = energia por segundo',
              pregunta: '&iquest;Que mide la potencia?',
              resp: R.opcion(['La energia consumida por segundo', 'La energia total consumida'], 0),
              pista: 'Por eso en la factura pagas kWh, que es potencia por tiempo.',
              despues: ''
            },
            {
              seccion: 'Paso 3: calcular la potencia',
              queHacemos: 'Multiplicamos voltaje por corriente.',
              paraQue: 'P = VI. Voltios por amperios da vatios.',
              queda: 'P = ' + F.n(pot, 1) + ' W',
              pregunta: 'Calcula ' + vP + ' &times; ' + F.n(iP, 2) + ' (1 decimal)',
              resp: R.numero(pot, { dec: 1, tol: 0.5, unidad: 'W' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 4: el atajo',
              queHacemos: 'Comprobamos con P = V&sup2;/R.',
              paraQue: 'Sustituyendo I = V/R en P = VI sale P = V&sup2;/R, que ahorra un paso cuando no te piden la corriente.',
              queda: 'V&sup2;/R da lo mismo',
              pregunta: 'Calcula ' + vP + '&sup2; &divide; ' + rP + ' (1 decimal)',
              resp: R.numero(pot, { dec: 1, tol: 0.5, unidad: 'W' }),
              pista: 'Tiene que dar los mismos ' + F.n(pot, 1) + ' W.',
              despues: ''
            },
            {
              seccion: 'Paso 5: a donde va esa energia',
              queHacemos: 'Pensamos que hace la resistencia con ella.',
              paraQue: 'En una resistencia toda esa potencia se convierte en calor. Asi funcionan un tostador, una parrilla electrica o el filamento de un foco.',
              queda: 'P = ' + F.n(pot, 1) + ' W, en forma de calor',
              pregunta: '&iquest;En que se convierte esa potencia en una resistencia?',
              resp: R.opcion(['En calor', 'En luz unicamente'], 0),
              pista: 'Piensa en un tostador.',
              despues: ''
            }
          ],
          final: 'P = <b>' + F.n(pot, 1) + ' W</b>',
          receta: ['I = V/R',
            'P = V&middot;I, en vatios',
            'Atajo: P = V&sup2;/R',
            'En una resistencia esa potencia se vuelve calor']
        });
        enun = 'Una resistencia de ' + rP + ' &Omega; se conecta a ' + vP + ' V.<br>' +
          '&iquest;Que potencia consume? (1 decimal)';
        resp = R.numero(pot, { dec: 1, tol: 0.5, unidad: 'W' });
        pistas = ['Primero la corriente: I = V/R.',
          'Luego P = VI, o directamente P = V&sup2;/R.'];
        sol = ['I = ' + vP + '/' + rP + ' = ' + F.n(iP, 2) + ' A',
          'P = VI = ' + vP + ' &middot; ' + F.n(iP, 2),
          'P = <b>' + F.n(pot, 1) + ' W</b>'];

      } else {
        var t3 = r.subtema([
          ['serie', 'Resistencias en serie'],
          ['paralelo', 'Resistencias en paralelo'],
          ['consumo', 'Consumo y costo']
        ]);

        if (t3 === 'serie') {
          var r1 = r.elige([10, 20, 30, 50]);
          var r2 = r.elige([15, 40, 60, 100]);
          var vS = r.elige([12, 24, 120]);
          var rTot = r1 + r2;
          var iS = vS / rTot;
          var v1 = iS * r1, v2 = iS * r2;
          guiaDelPaso = G({
            intro: 'Dos resistencias de <b>' + r1 + ' &Omega;</b> y <b>' + r2 + ' &Omega;</b> se conectan ' +
              '<b>en serie</b> a <b>' + vS + ' V</b>.<br>' +
              'En serie hay un solo camino: toda la corriente pasa por las dos. Esa observacion resuelve el ejercicio.',
            pasos: [
              {
                seccion: 'Paso 1: la resistencia total',
                queHacemos: 'Sumamos las dos.',
                paraQue: 'En serie los obstaculos se suman, porque la corriente tiene que atravesarlos uno detras de otro.',
                queda: 'R total = ' + rTot + ' &Omega;',
                pregunta: 'Calcula ' + r1 + ' + ' + r2,
                resp: R.numero(rTot, { dec: 0, tol: 0.5, unidad: '&Omega;' }),
                pista: 'Suma directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la corriente',
                queHacemos: 'Aplicamos Ohm al circuito completo.',
                paraQue: 'I = V/R total. Y esta corriente es la MISMA en las dos resistencias: en serie no hay por donde repartirse.',
                queda: 'I = ' + F.n(iS, 3) + ' A, igual en las dos',
                pregunta: 'Calcula ' + vS + ' &divide; ' + rTot + ' (3 decimales)',
                resp: R.numero(iS, { dec: 3, tol: 0.002, unidad: 'A' }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el voltaje de cada una',
                queHacemos: 'Aplicamos V = IR a cada resistencia.',
                paraQue: 'Aqui si se reparte: la mayor se queda con mas voltaje. Con ' + r1 + ' y ' + r2 + ' salen ' + F.n(v1, 2) + ' V y ' + F.n(v2, 2) + ' V.',
                queda: F.n(v1, 2) + ' V y ' + F.n(v2, 2) + ' V',
                pregunta: 'Calcula el voltaje en la de ' + r2 + ' &Omega;: ' + F.n(iS, 3) + ' &times; ' + r2 + ' (2 decimales)',
                resp: R.numero(v2, { dec: 2, tol: 0.05, unidad: 'V' }),
                pista: 'V = IR con esa resistencia.',
                despues: ''
              },
              {
                seccion: 'Paso 4: comprobar el reparto',
                queHacemos: 'Sumamos los dos voltajes.',
                paraQue: 'Tienen que dar los ' + vS + ' V de la fuente. Si no suman, algo esta mal: el voltaje se reparte entero entre los componentes.',
                queda: 'los dos suman ' + vS + ' V',
                pregunta: 'Calcula ' + F.n(v1, 2) + ' + ' + F.n(v2, 2) + ' (0 decimales)',
                resp: R.numero(vS, { dec: 0, tol: 0.6, unidad: 'V' }),
                pista: 'Tiene que dar el voltaje de la fuente.',
                despues: ''
              },
              {
                seccion: 'Paso 5: las dos reglas',
                queHacemos: 'Guardamos lo aprendido.',
                paraQue: 'En serie: la corriente es la misma en todos, y el voltaje se reparte. Son las dos frases que hay que tener grabadas.',
                queda: 'misma I, V repartido',
                pregunta: 'En serie, &iquest;que es igual en todas las resistencias?',
                resp: R.opcion(['La corriente', 'El voltaje'], 0),
                pista: 'Solo hay un camino para la corriente.',
                despues: ''
              }
            ],
            final: 'Circula <b>' + F.n(iS, 3) + ' A</b> por las dos',
            receta: ['En serie: R total = R<sub>1</sub> + R<sub>2</sub>',
              'I = V/R total',
              'La corriente es la MISMA en todas',
              'El voltaje se reparte, y la suma da el de la fuente']
          });
          enun = 'Dos resistencias de ' + r1 + ' &Omega; y ' + r2 + ' &Omega; se conectan en serie a ' + vS + ' V.<br>' +
            '&iquest;Que corriente circula? (3 decimales)';
          resp = R.numero(iS, { dec: 3, tol: 0.002, unidad: 'A' });
          pistas = ['En serie las resistencias se suman: R total = ' + r1 + ' + ' + r2 + '.',
            'Luego I = V/R total.'];
          sol = ['R total = ' + r1 + ' + ' + r2 + ' = ' + rTot + ' &Omega;',
            'I = ' + vS + '/' + rTot,
            'I = <b>' + F.n(iS, 3) + ' A</b>'];

        } else if (t3 === 'paralelo') {
          var ra = r.elige([10, 20, 30, 60]);
          var rb = r.elige([15, 20, 40, 60]);
          var vPa = r.elige([12, 24, 120]);
          var rPar = 1 / (1 / ra + 1 / rb);
          var ia = vPa / ra, ib = vPa / rb;
          var iTot = ia + ib;
          guiaDelPaso = G({
            intro: 'Dos resistencias de <b>' + ra + ' &Omega;</b> y <b>' + rb + ' &Omega;</b> se conectan ' +
              '<b>en paralelo</b> a <b>' + vPa + ' V</b>.<br>' +
              'En paralelo hay <b>dos caminos</b>, y eso cambia todo: el resultado sorprende la primera vez.',
            pasos: [
              {
                seccion: 'Paso 1: que tienen en comun',
                queHacemos: 'Vemos que magnitud comparten.',
                paraQue: 'Las dos estan conectadas a los mismos dos puntos, asi que tienen el MISMO voltaje. Al reves que en serie, donde lo que compartian era la corriente.',
                queda: 'las dos a ' + vPa + ' V',
                pregunta: 'En paralelo, &iquest;que es igual en las dos resistencias?',
                resp: R.opcion(['El voltaje', 'La corriente'], 0),
                pista: 'Estan pegadas a los mismos dos puntos.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la corriente de cada rama',
                queHacemos: 'Aplicamos Ohm por separado.',
                paraQue: 'Cada una toma la corriente que le corresponde: la menor resistencia se lleva mas. Salen ' + F.n(ia, 2) + ' A y ' + F.n(ib, 2) + ' A.',
                queda: F.n(ia, 2) + ' A y ' + F.n(ib, 2) + ' A',
                pregunta: 'Calcula la corriente por la de ' + ra + ' &Omega;: ' + vPa + ' &divide; ' + ra + ' (2 decimales)',
                resp: R.numero(ia, { dec: 2, tol: 0.02, unidad: 'A' }),
                pista: 'I = V/R con esa resistencia.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la corriente total',
                queHacemos: 'Sumamos las dos ramas.',
                paraQue: 'Toda la corriente que sale de la fuente se reparte y luego se junta otra vez.',
                queda: 'I total = ' + F.n(iTot, 2) + ' A',
                pregunta: 'Calcula ' + F.n(ia, 2) + ' + ' + F.n(ib, 2) + ' (2 decimales)',
                resp: R.numero(iTot, { dec: 2, tol: 0.03, unidad: 'A' }),
                pista: 'Suma directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: la resistencia equivalente',
                queHacemos: 'Dividimos el voltaje entre la corriente total.',
                paraQue: 'Sale ' + F.n(rPar, 2) + ' &Omega;, MENOR que cualquiera de las dos. Anadir un camino siempre facilita el paso, nunca lo dificulta.',
                queda: 'R equivalente = ' + F.n(rPar, 2) + ' &Omega;',
                pregunta: 'Calcula ' + vPa + ' &divide; ' + F.n(iTot, 2) + ' (2 decimales)',
                resp: R.numero(rPar, { dec: 2, tol: 0.1, unidad: '&Omega;' }),
                pista: 'R = V/I con la corriente total.',
                despues: 'Menor que ' + Math.min(ra, rb) + ' &Omega;, la mas pequena de las dos.'
              },
              {
                seccion: 'Paso 5: por que baja',
                queHacemos: 'Le damos sentido a ese resultado.',
                paraQue: 'Con dos puertas abiertas pasa mas gente que con una sola. Por eso la resistencia equivalente en paralelo siempre queda por debajo de la menor.',
                queda: 'mas caminos, menos resistencia',
                pregunta: 'En paralelo, &iquest;como es la resistencia total?',
                resp: R.opcion(['Menor que la mas pequena de las dos', 'La suma de las dos'], 0),
                pista: 'Lo de sumar es en serie.',
                despues: ''
              }
            ],
            final: 'La resistencia equivalente es <b>' + F.n(rPar, 2) + ' &Omega;</b>',
            receta: ['En paralelo el voltaje es el mismo en todas',
              'Cada rama toma su corriente: I = V/R',
              'La corriente total es la suma de las ramas',
              'La R equivalente queda por DEBAJO de la menor']
          });
          enun = 'Dos resistencias de ' + ra + ' &Omega; y ' + rb + ' &Omega; se conectan en paralelo a ' + vPa + ' V.<br>' +
            '&iquest;Cual es su resistencia equivalente? (2 decimales)';
          resp = R.numero(rPar, { dec: 2, tol: 0.1, unidad: '&Omega;' });
          pistas = ['En paralelo: 1/R = 1/R<sub>1</sub> + 1/R<sub>2</sub>.',
            'Tambien puedes sumar las corrientes de cada rama y dividir el voltaje entre el total.'];
          sol = ['Cada rama: ' + F.n(ia, 2) + ' A y ' + F.n(ib, 2) + ' A',
            'I total = ' + F.n(iTot, 2) + ' A',
            'R = ' + vPa + '/' + F.n(iTot, 2) + ' = <b>' + F.n(rPar, 2) + ' &Omega;</b>'];

        } else {
          var potW = r.elige([100, 800, 1200, 1500, 2000]);
          var horas = r.elige([2, 3, 4, 5, 8]);
          var precio = r.elige([1.5, 2, 2.5, 3]);
          var kwh = potW * horas / 1000;
          var costo = kwh * precio;
          guiaDelPaso = G({
            intro: 'Un aparato de <b>' + potW + ' W</b> se usa <b>' + horas + ' horas</b> al dia. El kWh cuesta ' +
              '<b>' + F.n(precio, 1) + ' pesos</b>.<br>' +
              'Aqui la fisica se vuelve factura: hay que pasar de vatios a kilovatios-hora, que es lo que cobra ' +
              'la compania.',
            pasos: [
              {
                seccion: 'Paso 1: potencia no es energia',
                queHacemos: 'Separamos las dos ideas.',
                paraQue: 'Los ' + potW + ' W son el consumo por segundo. Lo que se paga es la energia, que depende tambien del tiempo: E = P &middot; t.',
                queda: 'E = P &middot; t',
                pregunta: '&iquest;Que se cobra en la factura?',
                resp: R.opcion(['La energia: potencia por tiempo', 'La potencia del aparato'], 0),
                pista: 'Un foco encendido un minuto no cuesta lo mismo que encendido un mes.',
                despues: ''
              },
              {
                seccion: 'Paso 2: a kilovatios',
                queHacemos: 'Dividimos los vatios entre 1000.',
                paraQue: 'La unidad de la factura es el kWh, no el Wh. Son ' + F.n(potW / 1000, 2) + ' kW.',
                queda: F.n(potW / 1000, 2) + ' kW',
                pregunta: 'Convierte ' + potW + ' W a kilovatios (2 decimales)',
                resp: R.numero(potW / 1000, { dec: 2, tol: 0.005, unidad: 'kW' }),
                pista: 'Divide entre 1000.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la energia diaria',
                queHacemos: 'Multiplicamos por las horas.',
                paraQue: 'Kilovatios por horas da kilovatios-hora, que es justo la unidad de la factura.',
                queda: 'E = ' + F.n(kwh, 2) + ' kWh al dia',
                pregunta: 'Calcula ' + F.n(potW / 1000, 2) + ' &times; ' + horas + ' (2 decimales)',
                resp: R.numero(kwh, { dec: 2, tol: 0.02, unidad: 'kWh' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el costo',
                queHacemos: 'Multiplicamos por el precio del kWh.',
                paraQue: 'Ya con la energia en kWh, el costo es una multiplicacion mas.',
                queda: F.n(costo, 2) + ' pesos al dia',
                pregunta: 'Calcula ' + F.n(kwh, 2) + ' &times; ' + F.n(precio, 1) + ' (2 decimales)',
                resp: R.numero(costo, { dec: 2, tol: 0.03 }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 5: al mes',
                queHacemos: 'Multiplicamos por 30 dias.',
                paraQue: 'Al dia parece poco; al mes ya se nota. Es la cuenta que conviene hacer antes de comprar un aparato.',
                queda: F.n(costo * 30, 2) + ' pesos al mes',
                pregunta: 'Calcula ' + F.n(costo, 2) + ' &times; 30 (2 decimales)',
                resp: R.numero(costo * 30, { dec: 2, tol: 0.8 }),
                pista: 'Multiplicacion directa.',
                despues: ''
              }
            ],
            final: 'Cuesta <b>' + F.n(costo, 2) + ' pesos al dia</b>',
            receta: ['La factura cobra energia, no potencia',
              'Pasar los vatios a kilovatios: dividir entre 1000',
              'E = kW &times; horas = kWh',
              'Costo = kWh &times; precio del kWh']
          });
          enun = 'Un aparato de ' + potW + ' W se usa ' + horas + ' horas al dia, y el kWh cuesta ' +
            F.n(precio, 1) + ' pesos.<br>&iquest;Cuanto cuesta usarlo un dia? (2 decimales)';
          resp = R.numero(costo, { dec: 2, tol: 0.03 });
          pistas = ['Energia = potencia &times; tiempo, en kWh.',
            potW + ' W son ' + F.n(potW / 1000, 2) + ' kW.'];
          sol = [F.n(potW / 1000, 2) + ' kW &times; ' + horas + ' h = ' + F.n(kwh, 2) + ' kWh',
            'Costo = ' + F.n(kwh, 2) + ' &times; ' + F.n(precio, 1),
            'Costo = <b>' + F.n(costo, 2) + ' pesos al dia</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
