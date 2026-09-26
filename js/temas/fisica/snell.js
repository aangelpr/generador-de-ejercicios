/* Ley de Snell: n1 sen(t1) = n2 sen(t2). */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var C = 300000000;                                  /* velocidad de la luz en el vacio, m/s */

  function sen(grados) { return Math.sin(grados * Math.PI / 180); }
  function asen(x) { return Math.asin(x) * 180 / Math.PI; }
  /* Los medios llevan el articulo pegado ("el agua"), asi que al anteponerles
     una preposicion hay que contraer: "de el agua" no es espanol. El segundo
     argumento pone en negrita solo el nombre, no la preposicion. */
  function pega(prep, corto, m, negrita) {
    var junta = m.indexOf("el ") === 0;
    var nombre = junta ? m.slice(3) : m;
    return (junta ? corto : prep + " ") + (negrita ? "<b>" + nombre + "</b>" : nombre);
  }
  function DE(m, negrita) { return pega("de", "del ", m, negrita); }
  function A(m, negrita) { return pega("a", "al ", m, negrita); }

  var MEDIOS = [
    { n: 'el aire', i: 1.00 }, { n: 'el agua', i: 1.33 }, { n: 'el vidrio', i: 1.50 },
    { n: 'el diamante', i: 2.42 }, { n: 'el alcohol', i: 1.36 }, { n: 'el cuarzo', i: 1.46 }
  ];

  var extra = {};

  /* ---------------- hallar el angulo refractado ---------------- */
  extra.angulo = function (r) {
    var a = r.elige([MEDIOS[0], MEDIOS[1], MEDIOS[2]]);
    var b = r.elige(MEDIOS.filter(function (m) { return m.i !== a.i; }));
    var t1 = r.elige([15, 20, 25, 30, 35, 40, 45]);
    var razon = a.i * sen(t1) / b.i;
    while (razon > 0.99) { t1 = r.elige([15, 20, 25]); razon = a.i * sen(t1) / b.i; }
    var t2 = asen(razon);
    var acerca = b.i > a.i;
    return {
      guia: G({
        intro: 'Un rayo de luz pasa ' + DE(a.n, 1) + ' (n = ' + F.n(a.i, 2) + ') ' + A(b.n, 1) + ' ' +
          '(n = ' + F.n(b.i, 2) + ') con un angulo de incidencia de <b>' + t1 + '&deg;</b>.<br>' +
          'Los angulos se miden siempre <b>respecto a la normal</b>, la linea perpendicular a la superficie. ' +
          'No respecto a la superficie misma.',
        pasos: [
          {
            seccion: 'Paso 1: hacia donde se dobla',
            queHacemos: 'Comparamos los dos indices antes de calcular.',
            paraQue: acerca
              ? 'Pasa a un medio mas denso opticamente (n mayor), asi que la luz se frena y se acerca a la normal: el angulo saldra MENOR.'
              : 'Pasa a un medio menos denso opticamente (n menor), asi que la luz se acelera y se aleja de la normal: el angulo saldra MAYOR.',
            queda: 'se ' + (acerca ? 'acerca' : 'aleja') + ' de la normal',
            pregunta: 'Al pasar a un medio con n ' + (acerca ? 'mayor' : 'menor') + ', &iquest;que hace el rayo?',
            resp: R.opcion(acerca
              ? ['Se acerca a la normal', 'Se aleja de la normal']
              : ['Se aleja de la normal', 'Se acerca a la normal'], 0),
            pista: 'Mas indice quiere decir luz mas lenta, y la luz lenta se acerca a la normal.',
            despues: 'Saberlo de antemano permite detectar un resultado absurdo.'
          },
          {
            seccion: 'Paso 2: el seno del angulo de entrada',
            queHacemos: 'Calculamos sen(' + t1 + '&deg;).',
            paraQue: 'La ley no relaciona los angulos directamente, sino sus senos. Por eso nunca hay que dividir angulos entre si.',
            queda: 'sen(' + t1 + '&deg;) = ' + F.n(sen(t1), 4),
            pregunta: 'Calcula sen(' + t1 + '&deg;) (4 decimales)',
            resp: R.numero(sen(t1), { dec: 4, tol: 0.0015 }),
            pista: 'Usa la calculadora en grados.',
            despues: ''
          },
          {
            seccion: 'Paso 3: despejar el otro seno',
            queHacemos: 'De n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub> sacamos sen&theta;<sub>2</sub>.',
            paraQue: 'Queda sen&theta;<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/n<sub>2</sub>. Ojo: esto es el SENO del angulo, no el angulo.',
            queda: 'sen&theta;<sub>2</sub> = ' + F.n(razon, 4),
            pregunta: 'Calcula ' + F.n(a.i, 2) + ' &times; ' + F.n(sen(t1), 4) + ' &divide; ' + F.n(b.i, 2) + ' (4 decimales)',
            resp: R.numero(razon, { dec: 4, tol: 0.0015 }),
            pista: 'Multiplica y luego divide.',
            despues: 'Todavia falta deshacer el seno.'
          },
          {
            seccion: 'Paso 4: el arcoseno',
            queHacemos: 'Aplicamos la funcion inversa del seno.',
            paraQue: 'Es el paso que mas se olvida: quedarse en ' + F.n(razon, 4) + ' y darlo como angulo. Hay que hacer sen&#8315;&sup1; para volver a grados.',
            queda: '&theta;<sub>2</sub> = ' + F.n(t2, 2) + '&deg;',
            pregunta: 'Calcula sen&#8315;&sup1;(' + F.n(razon, 4) + ') en grados (2 decimales)',
            resp: R.numero(t2, { dec: 2, tol: 0.15, unidad: '&deg;' }),
            pista: 'En la calculadora es la tecla asin o sen&#8315;&sup1;.',
            despues: ''
          },
          {
            seccion: 'Paso 5: comprobar la prediccion',
            queHacemos: 'Verificamos que coincide con el paso 1.',
            paraQue: 'Predijimos que el angulo saldria ' + (acerca ? 'menor' : 'mayor') + ' que ' + t1 + '&deg;, y salio ' + F.n(t2, 2) + '&deg;. Cuadra.',
            queda: t1 + '&deg; &rarr; ' + F.n(t2, 2) + '&deg;',
            pregunta: '&iquest;El resultado va en el sentido esperado?',
            resp: R.opcion(['Si, ' + (acerca ? 'salio menor' : 'salio mayor') + ' como se predijo',
              'No, salio al reves'], 0),
            pista: 'Compara ' + F.n(t2, 2) + '&deg; con ' + t1 + '&deg;.',
            despues: ''
          }
        ],
        final: '&theta;<sub>2</sub> = <b>' + F.n(t2, 2) + '&deg;</b>',
        receta: ['n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>',
          'Los angulos van medidos desde la NORMAL',
          'Predecir primero si se acerca o se aleja',
          'sen&theta;<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/n<sub>2</sub>',
          'No olvidar el arcoseno al final']
      }),
      enunciado: 'Un rayo pasa ' + DE(a.n) + ' (n = ' + F.n(a.i, 2) + ') ' + A(b.n) + ' (n = ' + F.n(b.i, 2) + ') ' +
        'con un angulo de incidencia de ' + t1 + '&deg;.<br>&iquest;Cual es el angulo de refraccion? (2 decimales)',
      respuesta: R.numero(t2, { dec: 2, tol: 0.15, unidad: '&deg;' }),
      pistas: ['Ley de Snell: n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>.',
        'Despeja sen&theta;<sub>2</sub> y al final aplica el arcoseno.'],
      solucion: ['sen&theta;<sub>2</sub> = ' + F.n(a.i, 2) + '&middot;sen(' + t1 + '&deg;)/' + F.n(b.i, 2),
        'sen&theta;<sub>2</sub> = ' + F.n(razon, 4),
        '&theta;<sub>2</sub> = <b>' + F.n(t2, 2) + '&deg;</b>']
    };
  };

  EJ.tema({
    id: 'snell',
    materia: 'fisica',
    grupo: 'Electromagnetismo y optica',
    nombre: 'Ley de Snell',
    descripcion: 'Como se dobla la luz al cambiar de medio: n1 sen(t1) = n2 sen(t2).',
    etiquetas: ['snell', 'optica', 'refraccion', 'indice', 'reflexion total'],
    formulario: '<b>Ley de Snell:</b> n<sub>1</sub> sen&theta;<sub>1</sub> = n<sub>2</sub> sen&theta;<sub>2</sub><br>' +
      'Los angulos se miden desde la <b>normal</b> (la perpendicular a la superficie).<br>' +
      '<b>Indice de refraccion:</b> n = c/v, con c = 3&times;10&#8312; m/s<br>' +
      '<b>Angulo critico:</b> sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub> &nbsp;<small>(solo si n<sub>1</sub> &gt; n<sub>2</sub>)</small><br>' +
      '<small>Indices: aire 1.00 &middot; agua 1.33 &middot; alcohol 1.36 &middot; cuarzo 1.46 &middot; ' +
      'vidrio 1.50 &middot; diamante 2.42<br>' +
      'A medio con n mayor: la luz se frena y se ACERCA a la normal.<br>' +
      'A medio con n menor: se acelera y se ALEJA. Pasado el angulo critico, ya no sale: se refleja toda.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la ley'],
          ['sentido', 'Hacia donde se dobla'],
          ['indice', 'El indice de refraccion']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que describe la ley de Snell?', ok: 'Como cambia de direccion la luz al cambiar de medio',
              corto: 'el cambio de direccion', mal: 'Como se refleja la luz en un espejo',
              por: 'lo del espejo es la reflexion; Snell describe la refraccion' },
            { q: '&iquest;Respecto a que se miden los angulos en la ley de Snell?',
              ok: 'Respecto a la normal, perpendicular a la superficie', corto: 'respecto a la normal',
              mal: 'Respecto a la superficie', por: 'medirlos desde la superficie da el angulo complementario y el resultado sale mal' },
            { q: '&iquest;Por que se dobla la luz al entrar en el agua?',
              ok: 'Porque cambia de velocidad al cambiar de medio', corto: 'cambia de velocidad',
              mal: 'Porque el agua la empuja', por: 'la refraccion es consecuencia directa del cambio de velocidad' },
            { q: 'Un palo metido en el agua parece quebrado. &iquest;Por que?',
              ok: 'Porque la luz se refracta al salir del agua', corto: 'por la refraccion',
              mal: 'Porque el agua lo deforma', por: 'los rayos cambian de direccion al salir y tu cerebro los prolonga en linea recta' }
          ]);
          guiaDelPaso = G({
            intro: 'La <b>ley de Snell</b> dice cuanto se dobla un rayo de luz al pasar de un medio a otro.<br>' +
              'Es lo que hace que un palo metido en el agua parezca quebrado, y lo que permite que existan ' +
              'las lentes y las gafas.',
            pasos: [
              {
                seccion: 'Paso 1: por que se dobla',
                queHacemos: 'Buscamos la causa fisica.',
                paraQue: 'La luz viaja mas despacio en el agua o en el vidrio que en el aire. Al cambiar de velocidad, cambia de direccion.',
                queda: 'cambia de velocidad, cambia de rumbo',
                pregunta: '&iquest;Por que se dobla la luz al cambiar de medio?',
                resp: R.opcion(['Porque cambia de velocidad', 'Porque pierde energia'], 0),
                pista: 'En el agua la luz va mas lenta que en el aire.',
                despues: ''
              },
              {
                seccion: 'Paso 2: desde donde se mide',
                queHacemos: 'Fijamos la referencia de los angulos.',
                paraQue: 'Siempre desde la <b>normal</b>, la perpendicular a la superficie. Medir desde la superficie es un error clasico que da el angulo complementario.',
                queda: 'los angulos, desde la normal',
                pregunta: '&iquest;Respecto a que linea se miden los angulos?',
                resp: R.opcion(['La normal, perpendicular a la superficie', 'La superficie'], 0),
                pista: 'Normal quiere decir perpendicular.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.corto || pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a la idea del cambio de velocidad.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['La luz se dobla porque cambia de velocidad',
              'n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>',
              'Los angulos se miden desde la normal',
              'Eso se llama refraccion, no reflexion']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['La ley de Snell describe la refraccion: el cambio de direccion al cambiar de medio.',
            'Aqui ' + pq.por + '.'];
          sol = ['Snell describe como se dobla la luz al cambiar de velocidad',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'sentido') {
          var par = r.elige([
            { de: 'el aire', a: 'el agua', n1: 1.00, n2: 1.33 },
            { de: 'el agua', a: 'el aire', n1: 1.33, n2: 1.00 },
            { de: 'el aire', a: 'el vidrio', n1: 1.00, n2: 1.50 },
            { de: 'el vidrio', a: 'el aire', n1: 1.50, n2: 1.00 },
            { de: 'el agua', a: 'el diamante', n1: 1.33, n2: 2.42 }
          ]);
          var seAcerca = par.n2 > par.n1;
          guiaDelPaso = G({
            intro: 'Un rayo pasa ' + DE(par.de, 1) + ' (n = ' + F.n(par.n1, 2) + ') ' + A(par.a, 1) + ' ' +
              '(n = ' + F.n(par.n2, 2) + ').<br>' +
              'Sin calcular nada se puede saber <b>hacia donde</b> se dobla. Es la comprobacion que salva ' +
              'cualquier ejercicio de Snell.',
            pasos: [
              {
                seccion: 'Paso 1: que significa el indice',
                queHacemos: 'Interpretamos el numero n.',
                paraQue: 'Un indice mayor quiere decir que la luz va mas lenta en ese medio. El aire tiene 1.00, el vidrio 1.50: en el vidrio la luz va a dos tercios de su velocidad.',
                queda: 'mas indice, luz mas lenta',
                pregunta: 'Un medio con n mayor, &iquest;que hace con la luz?',
                resp: R.opcion(['La frena', 'La acelera'], 0),
                pista: 'n = c/v: si n sube, v baja.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la regla del sentido',
                queHacemos: 'Asociamos velocidad con direccion.',
                paraQue: 'Cuando la luz se frena, se acerca a la normal. Cuando se acelera, se aleja. Una sola frase para todos los casos.',
                queda: 'se frena: se acerca a la normal',
                pregunta: 'Si la luz se frena al entrar, &iquest;que hace el rayo?',
                resp: R.opcion(['Se acerca a la normal', 'Se aleja de la normal'], 0),
                pista: 'Frenar y acercarse van juntos.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Comparamos los dos indices del caso.',
                paraQue: F.n(par.n2, 2) + ' es ' + (seAcerca ? 'mayor' : 'menor') + ' que ' + F.n(par.n1, 2) + ', asi que la luz se ' + (seAcerca ? 'frena y se acerca' : 'acelera y se aleja') + ' de la normal.',
                queda: 'se ' + (seAcerca ? 'acerca' : 'aleja') + ' de la normal',
                pregunta: 'Al pasar ' + DE(par.de) + ' ' + A(par.a) + ', &iquest;que hace el rayo?',
                resp: R.opcion(seAcerca
                  ? ['Se acerca a la normal', 'Se aleja de la normal']
                  : ['Se aleja de la normal', 'Se acerca a la normal'], 0),
                pista: 'Compara ' + F.n(par.n1, 2) + ' con ' + F.n(par.n2, 2) + '.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el angulo',
                queHacemos: 'Traducimos eso al valor del angulo.',
                paraQue: 'Acercarse a la normal quiere decir angulo mas chico; alejarse, angulo mas grande. Asi se detecta un resultado absurdo antes de entregarlo.',
                queda: 'el angulo sale ' + (seAcerca ? 'menor' : 'mayor'),
                pregunta: '&iquest;El angulo de salida sera mayor o menor que el de entrada?',
                resp: R.opcion(seAcerca ? ['Menor', 'Mayor'] : ['Mayor', 'Menor'], 0),
                pista: 'Cerca de la normal es angulo pequeno.',
                despues: ''
              }
            ],
            final: 'El rayo <b>se ' + (seAcerca ? 'acerca' : 'aleja') + '</b> de la normal',
            receta: ['n mayor quiere decir luz mas lenta',
              'Se frena: se acerca a la normal, angulo menor',
              'Se acelera: se aleja de la normal, angulo mayor',
              'Predecirlo antes de calcular detecta errores']
          });
          enun = 'Un rayo pasa ' + DE(par.de) + ' (n = ' + F.n(par.n1, 2) + ') ' + A(par.a) + ' (n = ' + F.n(par.n2, 2) + ').<br>' +
            '&iquest;Que hace el rayo respecto a la normal?';
          resp = R.opcion(seAcerca
            ? ['Se acerca a la normal', 'Se aleja de la normal']
            : ['Se aleja de la normal', 'Se acerca a la normal'], 0);
          pistas = ['Compara los dos indices de refraccion.',
            'Si la luz se frena (n mayor) se acerca a la normal; si se acelera, se aleja.'];
          sol = ['n pasa de ' + F.n(par.n1, 2) + ' a ' + F.n(par.n2, 2),
            'La luz se ' + (seAcerca ? 'frena' : 'acelera'),
            'El rayo <b>se ' + (seAcerca ? 'acerca' : 'aleja') + '</b> de la normal'];

        } else {
          var med = r.elige([MEDIOS[1], MEDIOS[2], MEDIOS[3], MEDIOS[4], MEDIOS[5]]);
          var vel = C / med.i;
          guiaDelPaso = G({
            intro: 'En <b>' + med.n + '</b> el indice de refraccion vale <b>' + F.n(med.i, 2) + '</b>.<br>' +
              'Ese numero no es arbitrario: sale de comparar la velocidad de la luz en el vacio con la que ' +
              'tiene dentro del material.',
            pasos: [
              {
                seccion: 'Paso 1: que es el indice',
                queHacemos: 'Recordamos su definicion.',
                paraQue: 'n = c/v: cuantas veces mas lenta va la luz ahi dentro que en el vacio. Por eso el indice nunca es menor que 1.',
                queda: 'n = c/v',
                pregunta: '&iquest;Como se define el indice de refraccion?',
                resp: R.opcion(['Velocidad en el vacio entre velocidad en el medio',
                  'Velocidad en el medio entre velocidad en el vacio'], 0),
                pista: 'Si fuera al reves, saldria siempre menor que 1.',
                despues: ''
              },
              {
                seccion: 'Paso 2: despejar la velocidad',
                queHacemos: 'De n = c/v sacamos v.',
                paraQue: 'Queda v = c/n. Con c = 3&times;10&#8312; m/s.',
                queda: 'v = 3&times;10&#8312; / ' + F.n(med.i, 2),
                pregunta: '&iquest;Como queda despejada la velocidad?',
                resp: R.opcion(['v = c/n', 'v = c&middot;n'], 0),
                pista: 'La v estaba dividiendo.',
                despues: ''
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Sale ' + F.n(vel / 1000000, 1) + ' millones de m/s: mas lenta que en el vacio, como tenia que ser.',
                queda: 'v = ' + F.n(vel / 1000000, 1) + ' millones de m/s',
                pregunta: 'Calcula 300 &divide; ' + F.n(med.i, 2) + ', en millones de m/s (1 decimal)',
                resp: R.numero(vel / 1000000, { dec: 1, tol: 0.4 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: comprobar',
                queHacemos: 'Verificamos que es menor que c.',
                paraQue: 'Nada supera la velocidad de la luz en el vacio, asi que el resultado tiene que quedar por debajo de 300 millones. Si sale mayor, el despeje esta al reves.',
                queda: F.n(vel / 1000000, 1) + ' < 300: correcto',
                pregunta: '&iquest;Puede la luz ir mas rapido dentro de un material que en el vacio?',
                resp: R.opcion(['No, nunca', 'Si, en algunos materiales'], 0),
                pista: 'Por eso el indice siempre es mayor o igual que 1.',
                despues: ''
              }
            ],
            final: 'v = <b>' + F.n(vel / 1000000, 1) + ' millones de m/s</b>',
            receta: ['n = c/v',
              'v = c/n, con c = 3&times;10&#8312; m/s',
              'El resultado siempre menor que c',
              'Por eso el indice nunca baja de 1']
          });
          enun = 'El indice de refraccion ' + DE(med.n) + ' es ' + F.n(med.i, 2) + '.<br>' +
            '&iquest;A que velocidad viaja la luz ahi, en millones de m/s? (1 decimal)<br>' +
            '<small>c = 300 millones de m/s</small>';
          resp = R.numero(vel / 1000000, { dec: 1, tol: 0.4 });
          pistas = ['El indice es n = c/v.',
            'Despejando: v = c/n.'];
          sol = ['n = c/v, asi que v = c/n',
            'v = 300 / ' + F.n(med.i, 2),
            'v = <b>' + F.n(vel / 1000000, 1) + ' millones de m/s</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['angulo', 'Hallar el angulo refractado'],
          ['indice', 'Hallar el indice desconocido'],
          ['piscina', 'Por que la alberca parece menos honda']
        ]);
        if (t2 === 'angulo') return extra.angulo(r, dif);

        if (t2 === 'indice') {
          var mA = r.elige([MEDIOS[0], MEDIOS[1]]);
          var tIn = r.elige([30, 40, 45, 50, 60]);
          var mB = r.elige(MEDIOS.filter(function (m) { return m.i > mA.i + 0.1; }));
          var senOut = mA.i * sen(tIn) / mB.i;
          var tOut = asen(senOut);
          var nCalc = mA.i * sen(tIn) / sen(tOut);
          guiaDelPaso = G({
            intro: 'Un rayo pasa ' + DE(mA.n, 1) + ' (n = ' + F.n(mA.i, 2) + ') a un material desconocido. ' +
              'Entra con <b>' + tIn + '&deg;</b> y sale con <b>' + F.n(tOut, 1) + '&deg;</b>.<br>' +
              'Con los dos angulos se puede <b>identificar el material</b>: asi se miden los indices en el laboratorio.',
            pasos: [
              {
                seccion: 'Paso 1: los dos senos',
                queHacemos: 'Calculamos el seno de cada angulo.',
                paraQue: 'La ley relaciona senos, no angulos. Con ' + tIn + '&deg; y ' + F.n(tOut, 1) + '&deg; salen ' + F.n(sen(tIn), 4) + ' y ' + F.n(sen(tOut), 4) + '.',
                queda: F.n(sen(tIn), 4) + ' y ' + F.n(sen(tOut), 4),
                pregunta: 'Calcula sen(' + tIn + '&deg;) (4 decimales)',
                resp: R.numero(sen(tIn), { dec: 4, tol: 0.0015 }),
                pista: 'Calculadora en grados.',
                despues: 'Y sen(' + F.n(tOut, 1) + '&deg;) = ' + F.n(sen(tOut), 4) + '.'
              },
              {
                seccion: 'Paso 2: despejar el indice',
                queHacemos: 'De la ley sacamos n<sub>2</sub>.',
                paraQue: 'Queda n<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/sen&theta;<sub>2</sub>. El seno del angulo de salida pasa dividiendo.',
                queda: 'n<sub>2</sub> = ' + F.n(mA.i, 2) + '&middot;' + F.n(sen(tIn), 4) + '/' + F.n(sen(tOut), 4),
                pregunta: '&iquest;Como queda despejado el indice desconocido?',
                resp: R.opcion(['n<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/sen&theta;<sub>2</sub>',
                  'n<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>2</sub>/sen&theta;<sub>1</sub>'], 0),
                pista: 'Parte de n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>.',
                despues: ''
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Hacemos la cuenta.',
                paraQue: 'El indice es un numero sin unidades: es un cociente de velocidades.',
                queda: 'n<sub>2</sub> = ' + F.n(nCalc, 2),
                pregunta: 'Calcula ' + F.n(mA.i, 2) + ' &times; ' + F.n(sen(tIn), 4) + ' &divide; ' + F.n(sen(tOut), 4) + ' (2 decimales)',
                resp: R.numero(nCalc, { dec: 2, tol: 0.04 }),
                pista: 'Multiplica y luego divide.',
                despues: ''
              },
              {
                seccion: 'Paso 4: identificar el material',
                queHacemos: 'Comparamos con la tabla.',
                paraQue: 'Un indice de ' + F.n(nCalc, 2) + ' corresponde ' + A(mB.n) + '. Cada material tiene el suyo, asi que medir el indice basta para reconocerlo.',
                queda: 'es ' + mB.n,
                pregunta: '&iquest;Que material tiene ese indice?',
                resp: R.opcion([mB.n.replace('el ', ''), 'el aire'], 0),
                pista: 'Busca ' + F.n(nCalc, 2) + ' en la tabla del formulario.',
                despues: ''
              },
              {
                seccion: 'Paso 5: comprobar el sentido',
                queHacemos: 'Verificamos que el angulo bajo.',
                paraQue: 'El indice salio mayor que ' + F.n(mA.i, 2) + ', asi que la luz se frena y el angulo tenia que salir menor. De ' + tIn + '&deg; a ' + F.n(tOut, 1) + '&deg;: cuadra.',
                queda: tIn + '&deg; &rarr; ' + F.n(tOut, 1) + '&deg;',
                pregunta: 'Con n<sub>2</sub> mayor que n<sub>1</sub>, &iquest;el angulo tenia que bajar?',
                resp: R.opcion(['Si, la luz se frena y se acerca a la normal', 'No, tenia que subir'], 0),
                pista: 'Mas indice, mas cerca de la normal.',
                despues: ''
              }
            ],
            final: 'n<sub>2</sub> = <b>' + F.n(nCalc, 2) + '</b>: es ' + mB.n,
            receta: ['n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>',
              'n<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/sen&theta;<sub>2</sub>',
              'El indice no tiene unidades',
              'Comparar con la tabla para identificar el material']
          });
          enun = 'Un rayo pasa ' + DE(mA.n) + ' (n = ' + F.n(mA.i, 2) + ') a un material desconocido. Entra con ' +
            tIn + '&deg; y sale con ' + F.n(tOut, 1) + '&deg;.<br>&iquest;Cual es el indice del material? (2 decimales)';
          resp = R.numero(nCalc, { dec: 2, tol: 0.04 });
          pistas = ['n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>.',
            'Despejando: n<sub>2</sub> = n<sub>1</sub>sen&theta;<sub>1</sub>/sen&theta;<sub>2</sub>.'];
          sol = ['sen(' + tIn + '&deg;) = ' + F.n(sen(tIn), 4) + ', sen(' + F.n(tOut, 1) + '&deg;) = ' + F.n(sen(tOut), 4),
            'n<sub>2</sub> = ' + F.n(mA.i, 2) + ' &middot; ' + F.n(sen(tIn), 4) + '/' + F.n(sen(tOut), 4),
            'n<sub>2</sub> = <b>' + F.n(nCalc, 2) + '</b>: es ' + mB.n];

        } else {
          var hondo = r.elige([1.5, 2, 2.5, 3]);
          var aparente = hondo / 1.33;
          guiaDelPaso = G({
            intro: 'Una alberca tiene <b>' + F.n(hondo, 1) + ' m</b> de profundidad real. Vista desde arriba ' +
              'parece mucho menos honda.<br>' +
              'Mirando casi en vertical, la profundidad aparente es la real dividida entre el indice del agua. ' +
              'Vamos a ver de donde sale eso.',
            pasos: [
              {
                seccion: 'Paso 1: de donde viene la ilusion',
                queHacemos: 'Seguimos el rayo desde el fondo.',
                paraQue: 'La luz que sale del fondo se desvia al pasar al aire. Tu cerebro, que supone que la luz siempre viaja recta, prolonga el rayo desviado y situa el fondo mas arriba de donde esta.',
                queda: 'el cerebro prolonga el rayo recto',
                pregunta: '&iquest;Por que el fondo parece estar mas arriba?',
                resp: R.opcion(['Porque el cerebro prolonga el rayo desviado en linea recta',
                  'Porque el agua encoge las distancias'], 0),
                pista: 'El agua no cambia de tamano: cambia la direccion de la luz.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la formula',
                queHacemos: 'Aplicamos la relacion para vision casi vertical.',
                paraQue: 'Profundidad aparente = real / n. Con el agua, n = 1.33.',
                queda: 'aparente = ' + F.n(hondo, 1) + ' / 1.33',
                pregunta: '&iquest;Entre que hay que dividir?',
                resp: R.opcion(['Entre el indice del agua, 1.33', 'Entre 2'], 0),
                pista: 'El indice del agua es 1.33.',
                despues: ''
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Salen ' + F.n(aparente, 2) + ' m: unos tres cuartos de la profundidad real.',
                queda: 'aparente = ' + F.n(aparente, 2) + ' m',
                pregunta: 'Calcula ' + F.n(hondo, 1) + ' &divide; 1.33 (2 decimales)',
                resp: R.numero(aparente, { dec: 2, tol: 0.03, unidad: 'm' }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: cuanto se pierde',
                queHacemos: 'Restamos las dos profundidades.',
                paraQue: 'Son ' + F.n(hondo - aparente, 2) + ' m de diferencia. Por eso las albercas enganan, y por eso llevan la profundidad escrita en el borde.',
                queda: 'parece ' + F.n(hondo - aparente, 2) + ' m menos honda',
                pregunta: 'Calcula ' + F.n(hondo, 1) + ' &minus; ' + F.n(aparente, 2) + ' (2 decimales)',
                resp: R.numero(hondo - aparente, { dec: 2, tol: 0.03, unidad: 'm' }),
                pista: 'Resta directa.',
                despues: ''
              }
            ],
            final: 'Parece de <b>' + F.n(aparente, 2) + ' m</b> de profundidad',
            receta: ['La luz se desvia al salir del agua',
              'El cerebro la prolonga recta y ve el fondo mas alto',
              'Aparente = real / n, mirando casi en vertical',
              'Con agua, n = 1.33: parece un 25% menos honda']
          });
          enun = 'Una alberca tiene ' + F.n(hondo, 1) + ' m de profundidad real. Mirando casi en vertical, ' +
            'la profundidad aparente es la real dividida entre el indice del agua (1.33).<br>' +
            '&iquest;Que profundidad aparenta? (2 decimales)';
          resp = R.numero(aparente, { dec: 2, tol: 0.03, unidad: 'm' });
          pistas = ['Profundidad aparente = profundidad real / n.',
            'El indice del agua es 1.33.'];
          sol = ['aparente = real / n',
            'aparente = ' + F.n(hondo, 1) + ' / 1.33',
            'aparente = <b>' + F.n(aparente, 2) + ' m</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['critico', 'Angulo critico'],
          ['fibra', 'Reflexion total y fibra optica'],
          ['angulo', 'Hallar el angulo refractado']
        ]);
        if (t3 === 'angulo') return extra.angulo(r, dif);

        if (t3 === 'critico') {
          var denso = r.elige([MEDIOS[1], MEDIOS[2], MEDIOS[3], MEDIOS[4], MEDIOS[5]]);
          var fuera = r.elige([MEDIOS[0], MEDIOS[1]]);
          while (fuera.i >= denso.i) fuera = MEDIOS[0];
          var senC = fuera.i / denso.i;
          var tc = asen(senC);
          guiaDelPaso = G({
            intro: 'Un rayo viaja dentro ' + DE(denso.n, 1) + ' (n = ' + F.n(denso.i, 2) + ') e intenta salir ' +
              A(fuera.n, 1) + ' (n = ' + F.n(fuera.i, 2) + ').<br>' +
              'Al ir de un medio denso a uno menos denso, el rayo se aleja de la normal. Si el angulo de entrada ' +
              'crece lo suficiente, llega un punto en que <b>ya no puede salir</b>.',
            pasos: [
              {
                seccion: 'Paso 1: el caso limite',
                queHacemos: 'Imaginamos el rayo justo al borde de salir.',
                paraQue: 'El angulo de salida no puede pasar de 90&deg;: ahi el rayo saldria rozando la superficie. El angulo de entrada que produce esos 90&deg; es el <b>angulo critico</b>.',
                queda: 'el limite es &theta;<sub>2</sub> = 90&deg;',
                pregunta: '&iquest;Cual es el maximo angulo de salida posible?',
                resp: R.numero(90, { dec: 0, tol: 0.5, unidad: '&deg;' }),
                pista: 'Mas de 90&deg; ya seria volver hacia dentro.',
                despues: ''
              },
              {
                seccion: 'Paso 2: simplificar la ley',
                queHacemos: 'Metemos 90&deg; en la ley de Snell.',
                paraQue: 'sen(90&deg;) = 1, asi que n<sub>1</sub>sen&theta;<sub>c</sub> = n<sub>2</sub>, y de ahi sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>. La formula del angulo critico no es nueva: es Snell en el caso limite.',
                queda: 'sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>',
                pregunta: '&iquest;Cuanto vale sen(90&deg;)?',
                resp: R.numero(1, { dec: 0, tol: 0.05 }),
                pista: 'Es el valor maximo del seno.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el cociente',
                queHacemos: 'Dividimos los dos indices.',
                paraQue: 'sen&theta;<sub>c</sub> = ' + F.n(fuera.i, 2) + '/' + F.n(denso.i, 2) + '. Fijate en que solo funciona si el de dentro es el mayor: si no, saldria un seno mayor que 1, imposible.',
                queda: 'sen&theta;<sub>c</sub> = ' + F.n(senC, 4),
                pregunta: 'Calcula ' + F.n(fuera.i, 2) + ' &divide; ' + F.n(denso.i, 2) + ' (4 decimales)',
                resp: R.numero(senC, { dec: 4, tol: 0.0015 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el arcoseno',
                queHacemos: 'Volvemos a grados.',
                paraQue: 'El angulo critico es ' + F.n(tc, 2) + '&deg;. Pasado ese valor, nada de luz sale: toda se refleja hacia dentro.',
                queda: '&theta;<sub>c</sub> = ' + F.n(tc, 2) + '&deg;',
                pregunta: 'Calcula sen&#8315;&sup1;(' + F.n(senC, 4) + ') en grados (2 decimales)',
                resp: R.numero(tc, { dec: 2, tol: 0.15, unidad: '&deg;' }),
                pista: 'Tecla asin o sen&#8315;&sup1;.',
                despues: ''
              },
              {
                seccion: 'Paso 5: que pasa despues',
                queHacemos: 'Miramos mas alla del critico.',
                paraQue: 'Con angulos mayores no hay refraccion: se produce <b>reflexion total interna</b> y la superficie se comporta como un espejo perfecto, sin perder nada de luz.',
                queda: 'pasado ' + F.n(tc, 1) + '&deg;: espejo perfecto',
                pregunta: 'Con un angulo mayor que el critico, &iquest;que ocurre?',
                resp: R.opcion(['La luz se refleja toda hacia dentro', 'Sale rozando la superficie'], 0),
                pista: 'Por eso se llama reflexion TOTAL.',
                despues: ''
              }
            ],
            final: 'El angulo critico es <b>' + F.n(tc, 2) + '&deg;</b>',
            receta: ['El angulo critico es el que da 90&deg; de salida',
              'sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>',
              'Solo existe si n<sub>1</sub> &gt; n<sub>2</sub>',
              'Pasado ese angulo: reflexion total interna']
          });
          enun = 'Un rayo viaja dentro ' + DE(denso.n) + ' (n = ' + F.n(denso.i, 2) + ') hacia ' + fuera.n +
            ' (n = ' + F.n(fuera.i, 2) + ').<br>&iquest;Cual es el angulo critico? (2 decimales)';
          resp = R.numero(tc, { dec: 2, tol: 0.15, unidad: '&deg;' });
          pistas = ['El angulo critico es el que da un angulo de salida de 90&deg;.',
            'sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>.'];
          sol = ['sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub> = ' + F.n(fuera.i, 2) + '/' + F.n(denso.i, 2),
            'sen&theta;<sub>c</sub> = ' + F.n(senC, 4),
            '&theta;<sub>c</sub> = <b>' + F.n(tc, 2) + '&deg;</b>'];

        } else {
          var nNucleo = r.elige([1.48, 1.50, 1.52]);
          var nFunda = r.elige([1.44, 1.45, 1.46]);
          while (nFunda >= nNucleo) nFunda = 1.44;
          var senCf = nFunda / nNucleo;
          var tcf = asen(senCf);
          guiaDelPaso = G({
            intro: 'Una fibra optica tiene un nucleo de <b>n = ' + F.n(nNucleo, 2) + '</b> rodeado de una funda de ' +
              '<b>n = ' + F.n(nFunda, 2) + '</b>.<br>' +
              'La fibra lleva luz kilometros sin perderla, y lo hace con la reflexion total interna que acabamos ' +
              'de ver. Los numeros explican por que funciona tan bien.',
            pasos: [
              {
                seccion: 'Paso 1: por que el nucleo es mas denso',
                queHacemos: 'Miramos el orden de los indices.',
                paraQue: 'Para que haya reflexion total, la luz tiene que ir del medio mas denso al menos denso. Por eso el nucleo tiene siempre el indice mayor.',
                queda: 'nucleo mas denso que la funda',
                pregunta: '&iquest;Por que el nucleo debe tener mayor indice que la funda?',
                resp: R.opcion(['Para que pueda haber reflexion total interna', 'Para que la fibra sea mas resistente'], 0),
                pista: 'Sin esa condicion no existe angulo critico.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el angulo critico',
                queHacemos: 'Aplicamos sen&theta;<sub>c</sub> = n<sub>2</sub>/n<sub>1</sub>.',
                paraQue: 'Con indices tan parecidos, el cociente queda muy cerca de 1 y el angulo critico sale muy grande.',
                queda: 'sen&theta;<sub>c</sub> = ' + F.n(senCf, 4),
                pregunta: 'Calcula ' + F.n(nFunda, 2) + ' &divide; ' + F.n(nNucleo, 2) + ' (4 decimales)',
                resp: R.numero(senCf, { dec: 4, tol: 0.0015 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el angulo',
                queHacemos: 'Sacamos el arcoseno.',
                paraQue: 'Son ' + F.n(tcf, 2) + '&deg;, muy cerca de los 90&deg;. Quiere decir que la luz tiene que ir casi paralela al eje de la fibra.',
                queda: '&theta;<sub>c</sub> = ' + F.n(tcf, 2) + '&deg;',
                pregunta: 'Calcula sen&#8315;&sup1;(' + F.n(senCf, 4) + ') en grados (2 decimales)',
                resp: R.numero(tcf, { dec: 2, tol: 0.2, unidad: '&deg;' }),
                pista: 'Tecla asin.',
                despues: ''
              },
              {
                seccion: 'Paso 4: por que funciona',
                queHacemos: 'Vemos que implica ese angulo tan alto.',
                paraQue: 'Cualquier rayo que viaje casi en linea recta por la fibra golpea la pared con mas de ' + F.n(tcf, 1) + '&deg; y se refleja entero. Y eso se repite miles de veces sin perder practicamente nada.',
                queda: 'rebota entero, miles de veces',
                pregunta: '&iquest;Que le pasa a un rayo que golpee la pared con ' + F.n(tcf + 5, 0) + '&deg;?',
                resp: R.opcion(['Se refleja por completo hacia dentro', 'Se escapa por la funda'], 0),
                pista: 'Supera el angulo critico.',
                despues: ''
              },
              {
                seccion: 'Paso 5: mejor que un espejo',
                queHacemos: 'Comparamos con la alternativa.',
                paraQue: 'Un espejo metalico absorbe algo de luz en cada rebote, y tras miles de rebotes no quedaria nada. La reflexion total no absorbe: por eso la senal aguanta kilometros.',
                queda: 'reflexion total: sin perdidas',
                pregunta: '&iquest;Por que no se usa un tubo con espejos en vez de fibra?',
                resp: R.opcion(['Porque los espejos absorben algo en cada rebote y la reflexion total no',
                  'Porque los espejos son mas caros'], 0),
                pista: 'Piensa en miles de rebotes seguidos.',
                despues: ''
              }
            ],
            final: 'El angulo critico de la fibra es <b>' + F.n(tcf, 2) + '&deg;</b>',
            receta: ['El nucleo debe tener mayor indice que la funda',
              'sen&theta;<sub>c</sub> = n<sub>funda</sub>/n<sub>nucleo</sub>',
              'Indices parecidos dan un angulo critico muy alto',
              'La reflexion total no pierde luz: mejor que un espejo']
          });
          enun = 'Una fibra optica tiene nucleo de n = ' + F.n(nNucleo, 2) + ' y funda de n = ' + F.n(nFunda, 2) + '.<br>' +
            '&iquest;Cual es el angulo critico en la frontera entre ambos? (2 decimales)';
          resp = R.numero(tcf, { dec: 2, tol: 0.2, unidad: '&deg;' });
          pistas = ['sen&theta;<sub>c</sub> = n<sub>funda</sub>/n<sub>nucleo</sub>.',
            'Al final aplica el arcoseno para volver a grados.'];
          sol = ['sen&theta;<sub>c</sub> = ' + F.n(nFunda, 2) + '/' + F.n(nNucleo, 2) + ' = ' + F.n(senCf, 4),
            '&theta;<sub>c</sub> = sen&#8315;&sup1;(' + F.n(senCf, 4) + ')',
            '&theta;<sub>c</sub> = <b>' + F.n(tcf, 2) + '&deg;</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
