/* Ley de Hooke: F = kx, y la energia elastica (1/2)kx^2. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- hallar la constante del resorte ---------------- */
  extra.constante = function (r) {
    var fza = r.elige([10, 15, 20, 25, 30, 40, 50]);
    var xcm = r.elige([2, 4, 5, 8, 10, 20]);
    var x = xcm / 100;
    var k = fza / x;
    return {
      guia: G({
        intro: 'Una fuerza de <b>' + fza + ' N</b> estira un resorte <b>' + xcm + ' cm</b>.<br>' +
          'Buscamos su <b>constante elastica k</b>, que es lo que mide cuan duro es el resorte: ' +
          'cuantos newtons hacen falta por cada metro de estiramiento.',
        pasos: [
          {
            seccion: 'Paso 1: pasar a metros',
            queHacemos: 'Convertimos los centimetros a metros.',
            paraQue: 'La constante se da en N/m. Si dejas los centimetros, k sale 100 veces mas chica y el resultado no sirve para nada.',
            queda: 'x = ' + F.n(x, 2) + ' m',
            pregunta: 'Convierte ' + xcm + ' cm a metros (2 decimales)',
            resp: R.numero(x, { dec: 2, tol: 0.005, unidad: 'm' }),
            pista: 'Divide entre 100.',
            despues: ''
          },
          {
            seccion: 'Paso 2: despejar k',
            queHacemos: 'De F = kx sacamos la constante.',
            paraQue: 'Queda k = F/x: la fuerza que hace falta por cada metro estirado.',
            queda: 'k = ' + fza + ' / ' + F.n(x, 2),
            pregunta: '&iquest;Como queda despejada la constante?',
            resp: R.opcion(['k = F/x', 'k = F&middot;x'], 0),
            pista: 'La x esta multiplicando, asi que pasa dividiendo.',
            despues: ''
          },
          {
            seccion: 'Paso 3: calcular',
            queHacemos: 'Hacemos la division.',
            paraQue: 'El resultado sale en N/m, que es la unidad propia de la constante elastica.',
            queda: 'k = ' + F.n(k, 1) + ' N/m',
            pregunta: 'Calcula ' + fza + ' &divide; ' + F.n(x, 2) + ' (1 decimal)',
            resp: R.numero(k, { dec: 1, tol: 0.5, unidad: 'N/m' }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: que significa ese numero',
            queHacemos: 'Le damos sentido fisico.',
            paraQue: 'Quiere decir que cada metro de estiramiento cuesta ' + F.n(k, 1) + ' N. Cuanto mayor es k, mas duro es el resorte y menos se deja estirar.',
            queda: F.n(k, 1) + ' N por cada metro',
            pregunta: 'Si k fuera el doble, &iquest;que pasaria con el mismo estiramiento?',
            resp: R.opcion(['Haria falta el doble de fuerza', 'Haria falta la mitad de fuerza'], 0),
            pista: 'k mide la dureza del resorte.',
            despues: ''
          }
        ],
        final: 'k = <b>' + F.n(k, 1) + ' N/m</b>',
        receta: ['Pasar el estiramiento a metros',
          'k = F/x',
          'El resultado va en N/m',
          'k grande quiere decir resorte duro']
      }),
      enunciado: 'Una fuerza de ' + fza + ' N estira un resorte ' + xcm + ' cm.<br>' +
        '&iquest;Cual es su constante elastica? (1 decimal)',
      respuesta: R.numero(k, { dec: 1, tol: 0.5, unidad: 'N/m' }),
      pistas: ['Ley de Hooke: F = kx, con x en metros.',
        xcm + ' cm son ' + F.n(x, 2) + ' m.'],
      solucion: ['x = ' + F.n(x, 2) + ' m',
        'k = F/x = ' + fza + '/' + F.n(x, 2),
        'k = <b>' + F.n(k, 1) + ' N/m</b>']
    };
  };

  /* ---------------- hallar el estiramiento ---------------- */
  extra.estiramiento = function (r) {
    var k = r.elige([100, 200, 250, 400, 500]);
    var fza = r.elige([10, 20, 25, 40, 50, 60]);
    var x = fza / k;
    return {
      guia: G({
        intro: 'Un resorte de constante <b>' + k + ' N/m</b> recibe una fuerza de <b>' + fza + ' N</b>.<br>' +
          'Esta vez la incognita es cuanto se estira.',
        pasos: [
          {
            seccion: 'Paso 1: despejar x',
            queHacemos: 'De F = kx sacamos el estiramiento.',
            paraQue: 'Queda x = F/k. Cuanto mas duro el resorte (k grande), menos se estira con la misma fuerza.',
            queda: 'x = ' + fza + ' / ' + k,
            pregunta: '&iquest;Como queda despejado el estiramiento?',
            resp: R.opcion(['x = F/k', 'x = F&middot;k'], 0),
            pista: 'La k esta multiplicando, asi que pasa dividiendo.',
            despues: ''
          },
          {
            seccion: 'Paso 2: calcular',
            queHacemos: 'Hacemos la division.',
            paraQue: 'Con k en N/m y F en N, el resultado sale directamente en metros.',
            queda: 'x = ' + F.n(x, 3) + ' m',
            pregunta: 'Calcula ' + fza + ' &divide; ' + k + ' (3 decimales)',
            resp: R.numero(x, { dec: 3, tol: 0.002, unidad: 'm' }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 3: pasarlo a centimetros',
            queHacemos: 'Multiplicamos por 100.',
            paraQue: 'En metros sale un numero incomodo de imaginar. En centimetros se ve de golpe cuanto es.',
            queda: 'x = ' + F.n(x * 100, 1) + ' cm',
            pregunta: 'Expresa ese estiramiento en centimetros (1 decimal)',
            resp: R.numero(x * 100, { dec: 1, tol: 0.2, unidad: 'cm' }),
            pista: 'Multiplica por 100.',
            despues: ''
          },
          {
            seccion: 'Paso 4: comprobar',
            queHacemos: 'Verificamos con la formula original.',
            paraQue: 'Multiplicando k por x hay que recuperar la fuerza de partida. Es la comprobacion mas rapida.',
            queda: 'k&middot;x = ' + fza + ' N: correcto',
            pregunta: 'Calcula ' + k + ' &times; ' + F.n(x, 3) + ' (0 decimales)',
            resp: R.numero(fza, { dec: 0, tol: 0.6, unidad: 'N' }),
            pista: 'Tiene que dar los ' + fza + ' N del enunciado.',
            despues: ''
          }
        ],
        final: 'x = <b>' + F.n(x * 100, 1) + ' cm</b>',
        receta: ['x = F/k',
          'Con k en N/m y F en N, x sale en metros',
          'Multiplicar por 100 para pasarlo a centimetros',
          'Comprobar que k&middot;x devuelve la fuerza']
      }),
      enunciado: 'Un resorte de constante ' + k + ' N/m recibe una fuerza de ' + fza + ' N.<br>' +
        '&iquest;Cuanto se estira, en centimetros? (1 decimal)',
      respuesta: R.numero(x * 100, { dec: 1, tol: 0.2, unidad: 'cm' }),
      pistas: ['Ley de Hooke: F = kx, asi que x = F/k.',
        'El resultado sale en metros: pasalo a centimetros.'],
      solucion: ['x = F/k = ' + fza + '/' + k,
        'x = ' + F.n(x, 3) + ' m',
        'x = <b>' + F.n(x * 100, 1) + ' cm</b>']
    };
  };

  EJ.tema({
    id: 'hooke',
    materia: 'fisica',
    grupo: 'Elasticidad y fluidos',
    nombre: 'Ley de Hooke',
    descripcion: 'La fuerza de un resorte es proporcional a lo que se estira: F = kx.',
    etiquetas: ['hooke', 'elasticidad', 'resorte', 'energia elastica'],
    formulario: '<b>Ley de Hooke:</b> F = k&middot;x<br>' +
      'F = fuerza aplicada (N) &middot; k = constante elastica (N/m) &middot; x = estiramiento o compresion (m)<br>' +
      '<b>Energia elastica:</b> E = &frac12;kx&sup2; (J)<br>' +
      '<small>Despejes: k = F/x &middot; x = F/k<br>' +
      'Si cuelgas una masa, la fuerza es su peso: F = mg, con g = 9.8 m/s&sup2;.<br>' +
      'La ley solo vale dentro del <b>limite elastico</b>: pasado ese punto el resorte se deforma para siempre.<br>' +
      'El estiramiento SIEMPRE en metros.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['fuerza', 'Hallar la fuerza'],
          ['limite', 'El limite elastico']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que dice la ley de Hooke?', ok: 'Que la fuerza es proporcional a lo que se estira',
              mal: 'Que la fuerza es proporcional al peso del resorte',
              por: 'lo que importa es cuanto se deforma, no cuanto pesa el resorte' },
            { q: 'Si estiras un resorte el doble, &iquest;que pasa con la fuerza?', ok: 'Hace falta el doble',
              mal: 'Hace falta cuatro veces mas', por: 'la relacion es proporcional, no cuadratica' },
            { q: '&iquest;Que mide la constante k?', ok: 'Cuan duro es el resorte',
              mal: 'Cuanto mide el resorte en reposo', por: 'k dice cuantos newtons cuesta cada metro de estiramiento' },
            { q: 'Un resorte con k grande, &iquest;como es?', ok: 'Duro: cuesta mucho estirarlo',
              mal: 'Blando: se estira facil', por: 'a mayor k, mas fuerza hace falta para el mismo estiramiento' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Hooke</b> dice algo muy simple: cuanto mas estiras un resorte, mas fuerza hace ' +
              'falta, y ademas <b>en la misma proporcion</b>.<br>' +
              'Toda la ley cabe en tres letras: <b>F = kx</b>.',
            pasos: [
              {
                seccion: 'Paso 1: que relaciona',
                queHacemos: 'Identificamos las dos magnitudes.',
                paraQue: 'Hooke liga la <b>fuerza</b> con el <b>estiramiento</b>. No con la longitud total del resorte: con lo que se ha estirado respecto a su posicion de reposo.',
                queda: 'F = k&middot;x',
                pregunta: '&iquest;Que representa la x en F = kx?',
                resp: R.opcion(['Lo que se estira respecto al reposo', 'La longitud total del resorte'], 0),
                pista: 'Un resorte sin estirar no hace fuerza.',
                despues: ''
              },
              {
                seccion: 'Paso 2: que es k',
                queHacemos: 'Interpretamos la constante.',
                paraQue: 'k mide la dureza: los newtons que cuesta cada metro. Un resorte de coche tiene k enorme; el de un boligrafo, minuscula.',
                queda: 'k = dureza, en N/m',
                pregunta: '&iquest;Que mide la constante k?',
                resp: R.opcion(['Cuan duro es el resorte', 'Cuanto mide el resorte'], 0),
                pista: 'Sus unidades son N/m: fuerza por cada metro.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior a la pregunta.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a F = kx.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['F = kx',
              'x es lo que se estira, no la longitud total',
              'k mide la dureza, en N/m',
              'Doble de estiramiento, doble de fuerza']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['La ley de Hooke es F = kx.',
            'Aqui ' + pq.por + '.'];
          sol = ['Hooke: la fuerza es proporcional al estiramiento',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'fuerza') {
          var kf = r.elige([50, 100, 150, 200, 300]);
          var xcmF = r.elige([2, 5, 10, 15, 20]);
          var xF = xcmF / 100;
          var fF = kf * xF;
          guiaDelPaso = G({
            intro: 'Un resorte de constante <b>' + kf + ' N/m</b> se estira <b>' + xcmF + ' cm</b>.<br>' +
              'Es el caso mas directo de Hooke: tenemos k y x, y buscamos F. Solo hay un detalle que cuidar.',
            pasos: [
              {
                seccion: 'Paso 1: el detalle de las unidades',
                queHacemos: 'Pasamos los centimetros a metros.',
                paraQue: 'La constante viene en N por <b>metro</b>. Multiplicar por ' + xcmF + ' en vez de por ' + F.n(xF, 2) + ' daria una fuerza 100 veces mayor.',
                queda: 'x = ' + F.n(xF, 2) + ' m',
                pregunta: 'Convierte ' + xcmF + ' cm a metros (2 decimales)',
                resp: R.numero(xF, { dec: 2, tol: 0.005, unidad: 'm' }),
                pista: 'Divide entre 100.',
                despues: 'Este es el error numero uno de todo el tema.'
              },
              {
                seccion: 'Paso 2: aplicar la formula',
                queHacemos: 'Multiplicamos k por x.',
                paraQue: 'F = kx, sin mas. Con k en N/m y x en m, el resultado sale en newtons.',
                queda: 'F = ' + F.n(fF, 2) + ' N',
                pregunta: 'Calcula ' + kf + ' &times; ' + F.n(xF, 2) + ' (2 decimales)',
                resp: R.numero(fF, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: en que sentido apunta',
                queHacemos: 'Pensamos en la fuerza que devuelve el resorte.',
                paraQue: 'El resorte responde con la misma fuerza, pero <b>en sentido contrario</b>: siempre tira hacia su posicion de reposo. Por eso a veces la ley se escribe con un signo menos.',
                queda: 'F = ' + F.n(fF, 2) + ' N, hacia el reposo',
                pregunta: '&iquest;Hacia donde tira el resorte estirado?',
                resp: R.opcion(['Hacia su posicion de reposo', 'Hacia donde lo estiras'], 0),
                pista: 'Por eso se le llama fuerza recuperadora.',
                despues: ''
              }
            ],
            final: 'F = <b>' + F.n(fF, 2) + ' N</b>',
            receta: ['Pasar el estiramiento a metros',
              'F = kx',
              'Con k en N/m y x en m, F sale en newtons',
              'El resorte siempre tira hacia su reposo']
          });
          enun = 'Un resorte de constante ' + kf + ' N/m se estira ' + xcmF + ' cm.<br>' +
            '&iquest;Que fuerza hace falta? (2 decimales)';
          resp = R.numero(fF, { dec: 2, tol: 0.05, unidad: 'N' });
          pistas = ['F = kx, con x en metros.',
            xcmF + ' cm son ' + F.n(xF, 2) + ' m.'];
          sol = ['x = ' + F.n(xF, 2) + ' m',
            'F = ' + kf + ' &middot; ' + F.n(xF, 2),
            'F = <b>' + F.n(fF, 2) + ' N</b>'];

        } else {
          var pl = r.elige([
            { q: 'Estiras un resorte tanto que ya no vuelve a su tamano original.',
              ok: 'Pasaste el limite elastico: la ley de Hooke ya no vale',
              corto: 'pasaste el limite elastico', mal: 'Hooke sigue valiendo igual',
              por: 'la ley solo describe deformaciones de las que el material se recupera' },
            { q: '&iquest;Hasta donde vale la ley de Hooke?', ok: 'Hasta el limite elastico del material',
              mal: 'Siempre, sin limite', por: 'pasado ese punto la deformacion se vuelve permanente y deja de ser proporcional' },
            { q: 'Un clip que doblas y se queda doblado, &iquest;que paso?',
              ok: 'Se paso del limite elastico y se deformo para siempre', corto: 'se deformo para siempre',
              mal: 'Se cumplio la ley de Hooke', por: 'si no vuelve solo, la deformacion ya no es elastica' },
            { q: 'Dentro del limite elastico, &iquest;que le pasa al material al soltarlo?',
              ok: 'Vuelve exactamente a su forma original', mal: 'Queda un poco deformado',
              por: 'esa recuperacion completa es justo lo que define el comportamiento elastico' }
          ]);
          guiaDelPaso = G({
            intro: 'F = kx no vale siempre. Todo material tiene un <b>limite elastico</b>, y pasado ese punto ' +
              'la ley deja de funcionar.<br>' +
              'Entender donde acaba una ley es tan util como saber aplicarla.',
            pasos: [
              {
                seccion: 'Paso 1: que es elastico',
                queHacemos: 'Definimos el comportamiento elastico.',
                paraQue: 'Elastico quiere decir que al soltar, el material vuelve <b>exactamente</b> a como estaba. Si queda deformado, ya no lo es.',
                queda: 'elastico = vuelve a su forma',
                pregunta: '&iquest;Que caracteriza a una deformacion elastica?',
                resp: R.opcion(['Que el material vuelve a su forma original', 'Que el material se rompe'], 0),
                pista: 'Piensa en una liga frente a un clip doblado.',
                despues: ''
              },
              {
                seccion: 'Paso 2: donde se acaba',
                queHacemos: 'Localizamos el limite.',
                paraQue: 'Hay un punto de estiramiento a partir del cual el material ya no se recupera. Ese es el limite elastico, y Hooke solo vale por debajo de el.',
                queda: 'Hooke vale antes del limite',
                pregunta: '&iquest;Hasta donde vale F = kx?',
                resp: R.opcion(['Hasta el limite elastico', 'Hasta que el material se rompe'], 0),
                pista: 'Antes de romperse ya dejo de ser proporcional.',
                despues: 'Entre el limite elastico y la rotura hay toda una zona donde la ley falla.'
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + pl.por + '.',
                queda: pl.corto || pl.ok,
                pregunta: pl.q,
                resp: R.opcion([pl.ok, pl.mal], 0),
                pista: 'Pregunta si el material vuelve solo a su forma.',
                despues: ''
              }
            ],
            final: '<b>' + pl.ok + '</b>',
            receta: ['Elastico: vuelve a su forma al soltarlo',
              'Hooke solo vale dentro del limite elastico',
              'Pasado ese punto la deformacion es permanente',
              'Y la relacion deja de ser proporcional']
          });
          enun = pl.q;
          resp = R.opcion([pl.ok, pl.mal], 0);
          pistas = ['La ley de Hooke solo vale dentro del limite elastico.',
            'Aqui ' + pl.por + '.'];
          sol = ['Hooke vale mientras el material recupere su forma',
            'Aqui ' + pl.por,
            'Respuesta: <b>' + pl.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['constante', 'Hallar la constante'],
          ['estiramiento', 'Hallar el estiramiento'],
          ['masa', 'Resorte con una masa colgada']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var m = r.elige([0.5, 1, 1.5, 2, 2.5, 3]);
        var kM = r.elige([100, 150, 200, 250, 400]);
        var peso = m * g;
        var xM = peso / kM;
        guiaDelPaso = G({
          intro: 'De un resorte de constante <b>' + kM + ' N/m</b> se cuelga una masa de <b>' + F.n(m, 1) + ' kg</b>.<br>' +
            'El enunciado te da una <b>masa</b>, pero Hooke pide una <b>fuerza</b>. Ese es todo el ejercicio: ' +
            'primero hay que convertir una cosa en la otra.',
          pasos: [
            {
              seccion: 'Paso 1: masa no es fuerza',
              queHacemos: 'Distinguimos las dos cosas.',
              paraQue: 'Los kilogramos miden masa; los newtons, fuerza. Meter ' + F.n(m, 1) + ' directamente en F = kx seria mezclar unidades distintas.',
              queda: 'hace falta el peso, en newtons',
              pregunta: '&iquest;Que fuerza estira el resorte?',
              resp: R.opcion(['El peso de la masa colgada', 'La masa, tal cual'], 0),
              pista: 'Lo que tira hacia abajo es el peso, no la masa.',
              despues: ''
            },
            {
              seccion: 'Paso 2: calcular el peso',
              queHacemos: 'Multiplicamos la masa por g.',
              paraQue: 'Peso = mg, con g = 9.8 m/s&sup2;. Asi pasamos de kilogramos a newtons.',
              queda: 'F = ' + F.n(peso, 2) + ' N',
              pregunta: 'Calcula ' + F.n(m, 1) + ' &times; 9.8 (2 decimales)',
              resp: R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 3: aplicar Hooke',
              queHacemos: 'Despejamos el estiramiento.',
              paraQue: 'Ya con la fuerza en newtons, x = F/k sale en metros.',
              queda: 'x = ' + F.n(xM, 4) + ' m',
              pregunta: 'Calcula ' + F.n(peso, 2) + ' &divide; ' + kM + ' (4 decimales)',
              resp: R.numero(xM, { dec: 4, tol: 0.0008, unidad: 'm' }),
              pista: 'x = F/k.',
              despues: ''
            },
            {
              seccion: 'Paso 4: a centimetros',
              queHacemos: 'Multiplicamos por 100.',
              paraQue: 'Un resorte que se estira ' + F.n(xM * 100, 2) + ' cm es algo que uno puede imaginar; ' + F.n(xM, 4) + ' m, no tanto.',
              queda: 'x = ' + F.n(xM * 100, 2) + ' cm',
              pregunta: 'Expresa el estiramiento en centimetros (2 decimales)',
              resp: R.numero(xM * 100, { dec: 2, tol: 0.08, unidad: 'cm' }),
              pista: 'Multiplica por 100.',
              despues: ''
            },
            {
              seccion: 'Paso 5: el equilibrio',
              queHacemos: 'Vemos por que se queda quieto ahi.',
              paraQue: 'El resorte se estira hasta que su fuerza recuperadora iguala al peso. En ese punto las dos se cancelan y la masa deja de bajar.',
              queda: 'kx = mg en el equilibrio',
              pregunta: '&iquest;Por que la masa se detiene en esa posicion?',
              resp: R.opcion(['Porque la fuerza del resorte iguala al peso', 'Porque el resorte ya no puede estirarse mas'], 0),
              pista: 'Las dos fuerzas se equilibran.',
              despues: ''
            }
          ],
          final: 'El resorte se estira <b>' + F.n(xM * 100, 2) + ' cm</b>',
          receta: ['La fuerza que estira es el PESO: F = mg',
            'g = 9.8 m/s&sup2;',
            'x = F/k, en metros',
            'En el equilibrio kx = mg']
        });
        enun = 'De un resorte de constante ' + kM + ' N/m se cuelga una masa de ' + F.n(m, 1) + ' kg.<br>' +
          '&iquest;Cuanto se estira, en centimetros? (2 decimales)<br><small>g = 9.8 m/s&sup2;</small>';
        resp = R.numero(xM * 100, { dec: 2, tol: 0.08, unidad: 'cm' });
        pistas = ['La fuerza que estira el resorte es el peso: F = mg.',
          'Luego x = F/k, y el resultado en metros hay que pasarlo a centimetros.'];
        sol = ['F = mg = ' + F.n(m, 1) + ' &middot; 9.8 = ' + F.n(peso, 2) + ' N',
          'x = F/k = ' + F.n(peso, 2) + '/' + kM + ' = ' + F.n(xM, 4) + ' m',
          'x = <b>' + F.n(xM * 100, 2) + ' cm</b>'];

      } else {
        var t3 = r.subtema([
          ['energia', 'Energia elastica'],
          ['lanza', 'Resorte que lanza'],
          ['constante', 'Hallar la constante']
        ]);
        if (t3 === 'constante') return extra.constante(r, dif);

        if (t3 === 'energia') {
          var kE = r.elige([200, 300, 400, 500, 800]);
          var xcmE = r.elige([5, 10, 15, 20]);
          var xE = xcmE / 100;
          var ener = 0.5 * kE * xE * xE;
          var doble = 0.5 * kE * (2 * xE) * (2 * xE);
          guiaDelPaso = G({
            intro: 'Un resorte de constante <b>' + kE + ' N/m</b> se comprime <b>' + xcmE + ' cm</b>.<br>' +
              'Al comprimirlo le estas <b>guardando energia</b>, y esa energia no crece igual que la fuerza: ' +
              'crece <b>al cuadrado</b>. Ahi esta lo interesante.',
            pasos: [
              {
                seccion: 'Paso 1: a metros',
                queHacemos: 'Convertimos la compresion.',
                paraQue: 'La formula lleva x al cuadrado, asi que un error de unidades aqui no se multiplica por 100, sino por 10 000.',
                queda: 'x = ' + F.n(xE, 2) + ' m',
                pregunta: 'Convierte ' + xcmE + ' cm a metros (2 decimales)',
                resp: R.numero(xE, { dec: 2, tol: 0.005, unidad: 'm' }),
                pista: 'Divide entre 100.',
                despues: ''
              },
              {
                seccion: 'Paso 2: elevar al cuadrado',
                queHacemos: 'Calculamos x&sup2;.',
                paraQue: 'Es la pieza que hace que la energia crezca tan rapido. Conviene calcularla aparte para no equivocarse.',
                queda: 'x&sup2; = ' + F.n(xE * xE, 4),
                pregunta: 'Calcula ' + F.n(xE, 2) + '&sup2; (4 decimales)',
                resp: R.numero(xE * xE, { dec: 4, tol: 0.0005 }),
                pista: 'Multiplica el numero por si mismo.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicar la formula',
                queHacemos: 'Multiplicamos por k y por un medio.',
                paraQue: 'E = &frac12;kx&sup2;. El resultado sale en joules, la unidad de energia de siempre.',
                queda: 'E = ' + F.n(ener, 3) + ' J',
                pregunta: 'Calcula 0.5 &times; ' + kE + ' &times; ' + F.n(xE * xE, 4) + ' (3 decimales)',
                resp: R.numero(ener, { dec: 3, tol: 0.005, unidad: 'J' }),
                pista: 'Multiplica los tres factores.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el doble de compresion',
                queHacemos: 'Repetimos con el doble de x.',
                paraQue: 'Comprimiendo el doble, la fuerza se duplica, pero la energia se multiplica por CUATRO. Es lo que diferencia esta formula de F = kx.',
                queda: 'con el doble: ' + F.n(doble, 3) + ' J',
                pregunta: 'Si se comprimiera ' + (2 * xcmE) + ' cm, &iquest;cuanta energia guardaria? (3 decimales)',
                resp: R.numero(doble, { dec: 3, tol: 0.02, unidad: 'J' }),
                pista: 'Repite la formula con ' + F.n(2 * xE, 2) + ' m.',
                despues: 'Exactamente cuatro veces mas, no el doble.'
              },
              {
                seccion: 'Paso 5: a donde va esa energia',
                queHacemos: 'Pensamos que pasa al soltar.',
                paraQue: 'Al soltarlo, esa energia se convierte en movimiento. Es como funcionan una ballesta, un trampolin o la suspension de un coche.',
                queda: 'E = ' + F.n(ener, 3) + ' J listos para soltarse',
                pregunta: 'Al soltar el resorte, &iquest;en que se convierte esa energia?',
                resp: R.opcion(['En energia de movimiento', 'Se pierde'], 0),
                pista: 'Piensa en una ballesta.',
                despues: ''
              }
            ],
            final: 'E = <b>' + F.n(ener, 3) + ' J</b>',
            receta: ['Pasar la compresion a metros',
              'Elevar x al cuadrado',
              'E = &frac12;kx&sup2;, en joules',
              'Al doble de compresion, CUATRO veces mas energia']
          });
          enun = 'Un resorte de constante ' + kE + ' N/m se comprime ' + xcmE + ' cm.<br>' +
            '&iquest;Cuanta energia elastica almacena? (3 decimales)';
          resp = R.numero(ener, { dec: 3, tol: 0.005, unidad: 'J' });
          pistas = ['La energia elastica es E = &frac12;kx&sup2;, con x en metros.',
            xcmE + ' cm son ' + F.n(xE, 2) + ' m.'];
          sol = ['x = ' + F.n(xE, 2) + ' m, x&sup2; = ' + F.n(xE * xE, 4),
            'E = 0.5 &middot; ' + kE + ' &middot; ' + F.n(xE * xE, 4),
            'E = <b>' + F.n(ener, 3) + ' J</b>'];

        } else {
          var kL = r.elige([400, 500, 800, 1000]);
          var xcmL = r.elige([5, 8, 10, 12]);
          var xL = xcmL / 100;
          var mL = r.elige([0.02, 0.05, 0.1, 0.2]);
          var eL = 0.5 * kL * xL * xL;
          var vL = Math.sqrt(2 * eL / mL);
          guiaDelPaso = G({
            intro: 'Un resorte de constante <b>' + kL + ' N/m</b> se comprime <b>' + xcmL + ' cm</b> y lanza una ' +
              'bolita de <b>' + F.n(mL, 2) + ' kg</b>.<br>' +
              'Aqui se juntan dos temas: la energia que guarda el resorte pasa integra a la bolita como ' +
              '<b>energia de movimiento</b>.',
            pasos: [
              {
                seccion: 'Paso 1: la energia guardada',
                queHacemos: 'Aplicamos E = &frac12;kx&sup2;.',
                paraQue: 'Es toda la energia disponible para el lanzamiento. Con x = ' + F.n(xL, 2) + ' m.',
                queda: 'E = ' + F.n(eL, 3) + ' J',
                pregunta: 'Calcula 0.5 &times; ' + kL + ' &times; ' + F.n(xL, 2) + '&sup2; (3 decimales)',
                resp: R.numero(eL, { dec: 3, tol: 0.01, unidad: 'J' }),
                pista: 'Primero eleva ' + F.n(xL, 2) + ' al cuadrado.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la conversion',
                queHacemos: 'Igualamos las dos energias.',
                paraQue: 'Toda la energia elastica se convierte en cinetica: &frac12;kx&sup2; = &frac12;mv&sup2;. Los dos medios se cancelan, pero conviene escribirlo entero para no perderse.',
                queda: '&frac12;kx&sup2; = &frac12;mv&sup2;',
                pregunta: '&iquest;En que se convierte la energia del resorte?',
                resp: R.opcion(['En energia cinetica de la bolita', 'En calor'], 0),
                pista: 'La bolita sale disparada.',
                despues: ''
              },
              {
                seccion: 'Paso 3: despejar la velocidad',
                queHacemos: 'De E = &frac12;mv&sup2; sacamos v.',
                paraQue: 'Queda v = &radic;<span class="rad">2E/m</span>. Primero el cociente, y la raiz al final.',
                queda: 'v = &radic;<span class="rad">2&middot;' + F.n(eL, 3) + '/' + F.n(mL, 2) + '</span>',
                pregunta: 'Calcula 2 &times; ' + F.n(eL, 3) + ' &divide; ' + F.n(mL, 2) + ' (2 decimales)',
                resp: R.numero(2 * eL / mL, { dec: 2, tol: 0.1 }),
                pista: 'Multiplica por 2 y divide entre la masa.',
                despues: 'Eso es v AL CUADRADO, todavia no la velocidad.'
              },
              {
                seccion: 'Paso 4: la raiz',
                queHacemos: 'Sacamos la raiz cuadrada.',
                paraQue: 'Es el paso que mas se olvida: quedarse en el cuadrado y darlo por respuesta.',
                queda: 'v = ' + F.n(vL, 2) + ' m/s',
                pregunta: 'Saca la raiz de ' + F.n(2 * eL / mL, 2) + ' (2 decimales)',
                resp: R.numero(vL, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: '&radic;<span class="rad">' + F.n(2 * eL / mL, 2) + '</span>.',
                despues: ''
              },
              {
                seccion: 'Paso 5: que pasaria con mas masa',
                queHacemos: 'Pensamos en una bolita mas pesada.',
                paraQue: 'La energia disponible es la misma, asi que repartida en mas masa da menos velocidad. Por eso los juguetes de resorte lanzan mejor los proyectiles ligeros.',
                queda: 'v = ' + F.n(vL, 2) + ' m/s con ' + F.n(mL, 2) + ' kg',
                pregunta: 'Con una bolita mas pesada y el mismo resorte, &iquest;que velocidad saldria?',
                resp: R.opcion(['Menor: la misma energia repartida en mas masa', 'Mayor'], 0),
                pista: 'La energia del resorte no cambia.',
                despues: ''
              }
            ],
            final: 'La bolita sale a <b>' + F.n(vL, 2) + ' m/s</b>',
            receta: ['E = &frac12;kx&sup2; con x en metros',
              'Toda esa energia pasa a cinetica',
              'v = &radic;<span class="rad">2E/m</span>',
              'No olvidar la raiz al final']
          });
          enun = 'Un resorte de constante ' + kL + ' N/m se comprime ' + xcmL + ' cm y lanza una bolita de ' +
            F.n(mL, 2) + ' kg.<br>&iquest;A que velocidad sale despedida? (2 decimales)';
          resp = R.numero(vL, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['Primero la energia guardada: E = &frac12;kx&sup2;.',
            'Toda esa energia pasa a cinetica: v = &radic;<span class="rad">2E/m</span>.'];
          sol = ['E = 0.5 &middot; ' + kL + ' &middot; ' + F.n(xL, 2) + '&sup2; = ' + F.n(eL, 3) + ' J',
            'v&sup2; = 2E/m = ' + F.n(2 * eL / mL, 2),
            'v = <b>' + F.n(vL, 2) + ' m/s</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
