/* Primera ley de Newton: inercia y equilibrio. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  /* Situaciones cotidianas donde se nota la inercia. */
  var ESCENAS = [
    { q: 'Vas de pie en un autobus y el chofer <b>frena</b> de golpe.<br>&iquest;Hacia donde te vas?',
      ok: 'Hacia adelante', mal: 'Hacia atras',
      por: 'tu cuerpo seguia moviendose hacia adelante mientras el autobus frenaba' },
    { q: 'Vas sentado en un coche parado y <b>arranca</b> de golpe.<br>&iquest;Hacia donde se va tu cuerpo?',
      ok: 'Hacia atras, contra el asiento', mal: 'Hacia adelante',
      por: 'tu cuerpo estaba quieto y tiende a seguir quieto mientras el coche sale' },
    { q: 'Vas en un coche que <b>da vuelta a la izquierda</b>.<br>&iquest;Hacia donde te sientes empujado?',
      ok: 'Hacia la derecha', mal: 'Hacia la izquierda',
      por: 'tu cuerpo tiende a seguir derecho mientras el coche gira' },
    { q: 'Sacudes un mantel muy rapido y los platos se quedan en la mesa.<br>&iquest;Por que?',
      ok: 'Porque los platos tienden a quedarse quietos', mal: 'Porque el mantel los empuja hacia abajo',
      por: 'los platos, en reposo, se resisten a cambiar de estado' },
    { q: 'Un astronauta lanza una herramienta en el espacio, lejos de todo.<br>&iquest;Que hace la herramienta?',
      ok: 'Sigue en linea recta a velocidad constante para siempre', mal: 'Se va frenando poco a poco',
      por: 'sin ninguna fuerza que la frene, nada cambia su movimiento' }
  ];

  var extra = {};

  /* ---------------- situaciones de inercia ---------------- */
  extra.situacion = function (r) {
    var e = r.elige(ESCENAS);
    return {
      guia: G({
        intro: 'Una pregunta de <b>inercia</b>.<br>' +
          'La primera ley dice que un cuerpo <b>sigue como estaba</b> (quieto o moviendose derecho a velocidad ' +
          'constante) mientras nada lo obligue a cambiar. Casi todas estas situaciones se resuelven con una sola ' +
          'pregunta: &iquest;que estaba haciendo el cuerpo antes?',
        pasos: [
          {
            seccion: 'Paso 1: que dice la ley',
            queHacemos: 'Recordamos que afirma la primera ley.',
            paraQue: 'No dice que las cosas se paran solas. Dice justo lo contrario: sin fuerzas, nada cambia.',
            queda: 'sin fuerza, todo sigue igual',
            pregunta: 'Segun la primera ley, &iquest;que le pasa a un cuerpo sobre el que no actua ninguna fuerza?',
            resp: R.opcion(['Sigue como estaba: quieto, o derecho a velocidad constante',
              'Se va frenando hasta pararse'], 0),
            pista: 'Las cosas parecen pararse solas por el rozamiento, que SI es una fuerza. Sin el, no se pararian.',
            despues: 'Esa resistencia a cambiar se llama inercia.'
          },
          {
            seccion: 'Paso 2: que venia haciendo',
            queHacemos: 'Miramos en que estado estaba el cuerpo justo antes.',
            paraQue: 'Aqui esta la clave: el cuerpo va a intentar SEGUIR haciendo eso. Si venia quieto, se queda; si venia moviendose, sigue.',
            queda: 'sigue haciendo lo que venia haciendo',
            pregunta: 'Para resolver estas situaciones, &iquest;que hay que preguntarse primero?',
            resp: R.opcion(['Que venia haciendo el cuerpo antes del cambio',
              'Cuanto pesa el cuerpo'], 0),
            pista: 'El peso influye en cuanta inercia tiene, pero no en hacia donde tiende a ir.',
            despues: ''
          },
          {
            seccion: 'Paso 3: aplicarlo',
            queHacemos: 'Respondemos la situacion.',
            paraQue: 'Aqui ' + e.por + '.',
            queda: e.ok,
            pregunta: e.q,
            resp: R.opcion([e.ok, e.mal], 0),
            pista: 'Piensa que hacia tu cuerpo un instante antes, y que sigue queriendo hacer.',
            despues: 'No es que algo te empuje: es que nada te obligo a cambiar.'
          }
        ],
        final: '<b>' + e.ok + '</b>, porque ' + e.por,
        receta: ['Sin fuerza neta, nada cambia de movimiento',
          'Quieto sigue quieto; en movimiento sigue derecho y a la misma velocidad',
          'Preguntarse siempre que venia haciendo el cuerpo',
          'Las cosas se paran por el ROZAMIENTO, no solas']
      }),
      enunciado: e.q,
      respuesta: R.opcion([e.ok, e.mal], 0),
      pistas: ['La primera ley dice que un cuerpo sigue como estaba mientras nada lo obligue a cambiar.',
        'Preguntate que venia haciendo tu cuerpo justo antes.'],
      solucion: ['La inercia hace que el cuerpo tienda a seguir como estaba',
        'Aqui ' + e.por,
        'Respuesta: <b>' + e.ok + '</b>']
    };
  };

  /* ---------------- equilibrio con tres fuerzas ---------------- */
  extra.tresFuerzas = function (r) {
    var f1 = r.entero(10, 60), f2 = r.entero(10, 60);
    var f3 = f1 + f2;
    return {
      guia: G({
        intro: 'Sobre una caja quieta actuan <b>tres fuerzas horizontales</b>: dos hacia la derecha, de ' +
          '<b>' + f1 + ' N</b> y <b>' + f2 + ' N</b>, y una tercera hacia la izquierda.<br>' +
          'La caja <b>no se mueve</b>. Ese dato lo decide todo.',
        pasos: [
          {
            seccion: 'Paso 1: que significa que no se mueva',
            queHacemos: 'Traducimos "esta quieta" a lenguaje de fuerzas.',
            paraQue: 'Quieta no quiere decir "sin fuerzas": quiere decir que las fuerzas se ANULAN entre si. La suma da cero.',
            queda: 'suma de fuerzas = 0',
            pregunta: 'La caja esta en reposo. &iquest;Cuanto vale la suma de todas las fuerzas?',
            resp: R.numero(0, { dec: 2, unidad: 'N' }),
            pista: 'Si la suma no fuera cero, la caja estaria acelerando hacia algun lado.',
            despues: 'Eso es el equilibrio: fuerzas que se cancelan.'
          },
          {
            seccion: 'Paso 2: sumar las de un lado',
            queHacemos: 'Sumamos las dos fuerzas que van hacia la derecha.',
            paraQue: 'Dos fuerzas en el mismo sentido se suman como numeros normales.',
            queda: 'derecha: ' + f3 + ' N',
            pregunta: 'Calcula ' + f1 + ' + ' + f2 + ' (fuerzas hacia la derecha)',
            resp: R.numero(f3, { dec: 2, tol: 0.01, unidad: 'N' }),
            pista: 'Suma directa.',
            despues: 'Entre las dos empujan ' + f3 + ' N hacia la derecha.'
          },
          {
            seccion: 'Paso 3: la fuerza que falta',
            queHacemos: 'Deducimos cuanto vale la tercera.',
            paraQue: 'Para que la suma sea cero, la de la izquierda tiene que igualar exactamente a las otras dos juntas.',
            queda: 'la tercera vale ' + f3 + ' N hacia la izquierda',
            pregunta: '&iquest;Cuanto vale la fuerza hacia la izquierda? (2 decimales)',
            resp: R.numero(f3, { dec: 2, tol: 0.01, unidad: 'N' }),
            pista: 'Tiene que compensar los ' + f3 + ' N de la derecha.',
            despues: 'Con eso las fuerzas se anulan y la caja sigue quieta.'
          },
          {
            seccion: 'Paso 4: reposo y MRU son lo mismo',
            queHacemos: 'Vemos que otro caso cumple la misma condicion.',
            paraQue: 'Aqui se equivoca mucha gente: creen que hace falta fuerza para MANTENER el movimiento. No: hace falta para CAMBIARLO.',
            queda: 'suma = 0 tanto en reposo como en MRU',
            pregunta: 'Si la caja, en vez de quieta, se deslizara a velocidad constante, &iquest;cuanto valdria la suma de fuerzas?',
            resp: R.opcion(['Tambien cero', 'Tendria que ser mayor que cero'], 0),
            pista: 'Velocidad constante quiere decir que la velocidad no CAMBIA, y cambiarla es lo que necesita fuerza.',
            despues: 'Reposo y velocidad constante son el mismo caso para la primera ley.'
          }
        ],
        final: 'La tercera fuerza vale <b>' + f3 + ' N</b> hacia la izquierda',
        receta: ['En reposo o en MRU, la suma de fuerzas es CERO',
          'Sumar las fuerzas de cada sentido por separado',
          'La que falta es la que iguala a las demas',
          'Mantener una velocidad no necesita fuerza; cambiarla, si']
      }),
      enunciado: 'Sobre una caja actuan dos fuerzas hacia la derecha de ' + f1 + ' N y ' + f2 + ' N, ' +
        'y una tercera hacia la izquierda.<br>Si la caja permanece en reposo, &iquest;cuanto vale la tercera? (2 decimales)',
      respuesta: R.numero(f3, { dec: 2, tol: 0.01, unidad: 'N' }),
      pistas: ['En reposo la suma de todas las fuerzas es cero.',
        'Hacia la derecha hay ' + f1 + ' + ' + f2 + ' = ' + f3 + ' N.'],
      solucion: ['En equilibrio, la suma de fuerzas vale 0',
        'Hacia la derecha: ' + f1 + ' + ' + f2 + ' = ' + f3 + ' N',
        'La tercera debe compensarlas: <b>' + f3 + ' N</b> hacia la izquierda']
    };
  };

  EJ.tema({
    id: 'newton-1',
    materia: 'fisica',
    grupo: 'Dinamica',
    nombre: 'Primera ley de Newton (inercia)',
    descripcion: 'Inercia, equilibrio de fuerzas y por que reposo y velocidad constante son lo mismo.',
    etiquetas: ['inercia', 'newton', 'equilibrio', 'fuerzas'],
    formulario: '<b>Primera ley (inercia):</b> si la suma de fuerzas sobre un cuerpo es cero, ' +
      'el cuerpo sigue como estaba: en reposo, o moviendose en linea recta a velocidad constante.<br>' +
      '&Sigma;F = 0 &hArr; a = 0 &hArr; reposo o MRU<br>' +
      '<small>Mantener una velocidad NO necesita fuerza. Cambiarla, si. ' +
      'Las cosas parecen pararse solas por el rozamiento, que es una fuerza.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['situacion', 'Situaciones de inercia'],
          ['enunciado', 'Que dice la ley'],
          ['equilibrio', 'Esta en equilibrio?']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        if (tf === 'enunciado') {
          var casos = [
            { q: 'Un libro esta quieto sobre una mesa.<br>&iquest;Que se puede decir de las fuerzas sobre el?',
              ok: 'Se anulan: la suma es cero', mal: 'No hay ninguna fuerza sobre el',
              por: 'el peso lo jala hacia abajo y la mesa lo empuja hacia arriba con la misma intensidad' },
            { q: 'Un coche viaja por una recta a 80 km/h constantes.<br>&iquest;Cuanto vale la fuerza neta sobre el?',
              ok: 'Cero', mal: 'Igual a su peso',
              por: 'la velocidad no cambia, y sin cambio de velocidad no hay fuerza neta' },
            { q: '&iquest;Que hace falta para que un cuerpo cambie su velocidad?',
              ok: 'Una fuerza neta distinta de cero', mal: 'Que se le acabe la inercia',
              por: 'la inercia no se gasta: es la resistencia misma a cambiar' },
            { q: 'Una nave en el espacio apaga los motores lejos de todo astro.<br>&iquest;Que le pasa?',
              ok: 'Sigue recto a velocidad constante', mal: 'Se detiene poco a poco',
              por: 'no hay nada que la frene, asi que nada cambia su movimiento' }
          ];
          var c = r.elige(casos);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre <b>que dice</b> exactamente la primera ley.<br>' +
              'Conviene tenerla clara antes de calcular nada, porque casi todos los errores de dinamica ' +
              'vienen de entenderla al reves.',
            pasos: [
              {
                seccion: 'Paso 1: la idea central',
                queHacemos: 'Recordamos que estados no necesitan fuerza.',
                paraQue: 'Hay DOS estados sin fuerza neta: estar quieto y moverse recto a velocidad constante. Los dos son "no cambiar".',
                queda: '&Sigma;F = 0 en reposo y en MRU',
                pregunta: '&iquest;En cual de estos casos la fuerza neta vale cero?',
                resp: R.opcion(['Tanto en reposo como a velocidad constante', 'Solo en reposo'], 0),
                pista: 'La ley habla de cambiar la velocidad, no de tener velocidad.',
                despues: 'Estar quieto y ir derecho a velocidad fija son el mismo caso.'
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Respondemos la pregunta concreta.',
                paraQue: 'Aqui ' + c.por + '.',
                queda: c.ok,
                pregunta: c.q,
                resp: R.opcion([c.ok, c.mal], 0),
                pista: 'Preguntate si la velocidad esta cambiando o no.',
                despues: ''
              }
            ],
            final: '<b>' + c.ok + '</b>',
            receta: ['&Sigma;F = 0 quiere decir que la velocidad no cambia',
              'Reposo y MRU son el mismo caso',
              'Fuerza neta cero no es lo mismo que "sin fuerzas"',
              'La inercia no se gasta ni se acaba']
          });
          enun = c.q;
          resp = R.opcion([c.ok, c.mal], 0);
          pistas = ['La primera ley habla de CAMBIAR la velocidad, no de tenerla.',
            'Fijate si la velocidad esta cambiando o se mantiene.'];
          sol = ['Sin fuerza neta, el movimiento no cambia',
            'Aqui ' + c.por,
            'Respuesta: <b>' + c.ok + '</b>'];

        } else {
          var fa = r.entero(10, 80);
          var igual = r.bool();
          var fb = igual ? fa : fa + r.elige([5, 10, 15, 20, -5, -10]);
          guiaDelPaso = G({
            intro: 'Un bloque recibe <b>' + fa + ' N</b> hacia la derecha y <b>' + fb + ' N</b> hacia la izquierda.<br>' +
              'Hay que decir si esta en equilibrio. Como van en sentidos contrarios, se <b>restan</b>.',
            pasos: [
              {
                seccion: 'Paso 1: sentidos contrarios',
                queHacemos: 'Decidimos si las fuerzas se suman o se restan.',
                paraQue: 'Mismo sentido: se suman. Sentidos contrarios: se restan. Sumarlas siempre es el error tipico.',
                queda: 'hay que restar: ' + fa + ' &minus; ' + fb,
                pregunta: 'Las dos fuerzas van en sentidos contrarios. &iquest;Que se hace con ellas?',
                resp: R.opcion(['Se restan', 'Se suman'], 0),
                pista: 'Una tira para un lado y la otra para el contrario: se estorban entre si.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la fuerza neta',
                queHacemos: 'Hacemos la resta.',
                paraQue: 'El resultado es la fuerza que "sobrevive" y decide lo que pasa.',
                queda: 'neta = ' + (fa - fb) + ' N',
                pregunta: 'Calcula ' + fa + ' &minus; ' + fb + ' (2 decimales)',
                resp: R.numero(fa - fb, { dec: 2, tol: 0.01, unidad: 'N' }),
                pista: 'Resta directa. Si sale negativo, la fuerza neta apunta a la izquierda.',
                despues: igual ? 'Da cero: las fuerzas se anulan.' : 'No da cero: sobra fuerza hacia un lado.'
              },
              {
                seccion: 'Paso 3: decidir',
                queHacemos: 'Vemos si hay equilibrio.',
                paraQue: 'Equilibrio es fuerza neta CERO. Si sobra fuerza, el bloque acelera y ya no hay equilibrio.',
                queda: igual ? 'en equilibrio' : 'acelera hacia ' + (fa > fb ? 'la derecha' : 'la izquierda'),
                pregunta: '&iquest;Esta el bloque en equilibrio?',
                resp: R.opcion(['Si, la fuerza neta es cero', 'No, sobra fuerza hacia un lado'], igual ? 0 : 1),
                pista: igual ? 'Las dos fuerzas valen lo mismo y se cancelan.'
                  : 'Quedan ' + Math.abs(fa - fb) + ' N sin compensar.',
                despues: ''
              }
            ],
            final: igual ? 'Esta <b>en equilibrio</b>: las fuerzas se anulan'
              : '<b>No</b> esta en equilibrio: sobran ' + Math.abs(fa - fb) + ' N hacia ' + (fa > fb ? 'la derecha' : 'la izquierda'),
            receta: ['Fuerzas en sentidos contrarios: se restan',
              'Equilibrio es fuerza neta CERO',
              'Si sobra fuerza, el cuerpo acelera',
              'El signo dice hacia donde apunta lo que sobra']
          });
          enun = 'Sobre un bloque actuan ' + fa + ' N hacia la derecha y ' + fb + ' N hacia la izquierda.<br>' +
            '&iquest;Esta en equilibrio?';
          resp = R.opcion(['Si, la fuerza neta es cero', 'No, sobra fuerza hacia un lado'], igual ? 0 : 1);
          pistas = ['Van en sentidos contrarios, asi que se restan.',
            'Fuerza neta: ' + fa + ' &minus; ' + fb + ' = ' + (fa - fb) + ' N.'];
          sol = ['Sentidos contrarios: se restan',
            'Neta = ' + fa + ' &minus; ' + fb + ' = ' + (fa - fb) + ' N',
            igual ? 'Da cero, asi que <b>si</b> hay equilibrio' : 'No da cero, asi que <b>no</b> hay equilibrio'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['tresFuerzas', 'Tres fuerzas en equilibrio'],
          ['pesoNormal', 'Peso y normal'],
          ['rozamiento', 'Arrastrar a velocidad constante']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var m = r.elige([2, 3, 5, 8, 10, 12, 15, 20]);
        var peso = m * 9.8;

        if (t2 === 'pesoNormal') {
          guiaDelPaso = G({
            intro: 'Una caja de <b>' + m + ' kg</b> esta quieta sobre una mesa.<br>' +
              'Queremos la fuerza con la que la mesa la sostiene, que se llama <b>normal</b>. ' +
              'La caja no se mueve, asi que las fuerzas verticales tienen que anularse.',
            pasos: [
              {
                seccion: 'Paso 1: el peso',
                queHacemos: 'Calculamos cuanto pesa la caja.',
                paraQue: 'Peso no es lo mismo que masa: la masa es kg y el peso es la FUERZA con que la Tierra la jala, en newtons. W = mg.',
                queda: 'peso = ' + F.n(peso, 2) + ' N hacia abajo',
                pregunta: 'Calcula el peso: ' + m + ' &times; 9.8 (2 decimales)',
                resp: R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'W = mg.',
                despues: 'Ese peso jala la caja hacia abajo todo el tiempo.'
              },
              {
                seccion: 'Paso 2: que la mantiene quieta',
                queHacemos: 'Vemos que otra fuerza actua.',
                paraQue: 'Si solo estuviera el peso, la caja caeria. Como no cae, la mesa tiene que estar empujando hacia arriba.',
                queda: 'normal hacia arriba = ?',
                pregunta: '&iquest;Que fuerza impide que la caja caiga?',
                resp: R.opcion(['La normal: la mesa empuja hacia arriba', 'La inercia de la caja'], 0),
                pista: 'La inercia no es una fuerza: es la resistencia a cambiar de movimiento.',
                despues: 'Toda superficie empuja perpendicularmente a quien se apoya en ella.'
              },
              {
                seccion: 'Paso 3: cuanto vale la normal',
                queHacemos: 'Igualamos las dos fuerzas verticales.',
                paraQue: 'Como la caja esta quieta, la suma vertical es cero, asi que la normal iguala exactamente al peso.',
                queda: 'normal = ' + F.n(peso, 2) + ' N',
                pregunta: '&iquest;Cuanto vale la normal? (2 decimales)',
                resp: R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'Tiene que compensar el peso exactamente.',
                despues: 'Cuidado: la normal NO siempre vale mg. En un plano inclinado o con alguien empujando, cambia.'
              }
            ],
            final: 'La normal vale <b>' + F.n(peso, 2) + ' N</b>',
            receta: ['Peso = masa &times; 9.8, en newtons',
              'Una superficie siempre empuja perpendicular: es la normal',
              'Quieto quiere decir que las verticales se anulan',
              'En horizontal y sin nada mas, normal = peso']
          });
          enun = 'Una caja de ' + m + ' kg esta en reposo sobre una mesa horizontal.<br>' +
            '&iquest;Cuanto vale la fuerza normal que ejerce la mesa? (2 decimales)';
          resp = R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' });
          pistas = ['La caja esta quieta: las fuerzas verticales se anulan.',
            'El peso es mg = ' + m + '(9.8) = ' + F.n(peso, 2) + ' N, y la normal lo compensa.'];
          sol = ['Peso = mg = ' + m + '(9.8) = ' + F.n(peso, 2) + ' N, hacia abajo',
            'La caja no se mueve, asi que la normal iguala al peso',
            'Normal = <b>' + F.n(peso, 2) + ' N</b>'];

        } else {
          var froz = r.entero(15, 90);
          guiaDelPaso = G({
            intro: 'Arrastras una caja por el suelo a <b>velocidad constante</b>, tirando con una fuerza horizontal. ' +
              'El rozamiento se opone con <b>' + froz + ' N</b>.<br>' +
              'La trampa de este problema: parece que si la caja se mueve tiene que haber fuerza de sobra. No la hay.',
            pasos: [
              {
                seccion: 'Paso 1: leer "velocidad constante"',
                queHacemos: 'Traducimos ese dato a fuerzas.',
                paraQue: 'Velocidad constante quiere decir que la velocidad NO cambia, y no cambiar es justo lo que no necesita fuerza neta.',
                queda: '&Sigma;F = 0',
                pregunta: 'Si va a velocidad constante, &iquest;cuanto vale la fuerza neta?',
                resp: R.numero(0, { dec: 2, unidad: 'N' }),
                pista: 'Es el mismo caso que estar quieto, segun la primera ley.',
                despues: 'Aunque se este moviendo, las fuerzas estan empatadas.'
              },
              {
                seccion: 'Paso 2: quien compite con quien',
                queHacemos: 'Identificamos las dos fuerzas horizontales.',
                paraQue: 'Tu tiras hacia adelante y el rozamiento tira hacia atras. Son las dos unicas que importan en horizontal.',
                queda: 'tu fuerza = rozamiento',
                pregunta: '&iquest;Que fuerza se opone a que arrastres la caja?',
                resp: R.opcion(['El rozamiento del suelo', 'El peso de la caja'], 0),
                pista: 'El peso va hacia abajo, no hacia atras: no te estorba para arrastrarla.',
                despues: ''
              },
              {
                seccion: 'Paso 3: cuanto tiras',
                queHacemos: 'Igualamos tu fuerza al rozamiento.',
                paraQue: 'Si tiraras MAS, la caja iria acelerando. Si tiraras menos, iria frenando. Velocidad constante es el empate exacto.',
                queda: 'tiras con ' + froz + ' N',
                pregunta: '&iquest;Con cuanta fuerza estas tirando? (2 decimales)',
                resp: R.numero(froz, { dec: 2, tol: 0.01, unidad: 'N' }),
                pista: 'Justo la necesaria para empatar los ' + froz + ' N del rozamiento.',
                despues: 'Moverse no necesita fuerza de sobra: solo cambiar de velocidad la necesita.'
              }
            ],
            final: 'Tiras con <b>' + froz + ' N</b>, exactamente lo que vale el rozamiento',
            receta: ['Velocidad constante: fuerza neta cero',
              'Tu fuerza y el rozamiento se empatan',
              'Mas fuerza que el rozamiento: acelera',
              'Menos: frena']
          });
          enun = 'Arrastras una caja a velocidad constante por el suelo. El rozamiento vale ' + froz + ' N.<br>' +
            '&iquest;Con que fuerza estas tirando? (2 decimales)';
          resp = R.numero(froz, { dec: 2, tol: 0.01, unidad: 'N' });
          pistas = ['Velocidad constante quiere decir fuerza neta cero.',
            'Tu fuerza tiene que empatar exactamente al rozamiento.'];
          sol = ['A velocidad constante, &Sigma;F = 0',
            'Tu fuerza hacia adelante y el rozamiento hacia atras se cancelan',
            'F = <b>' + froz + ' N</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['tresFuerzas', 'Tres fuerzas en equilibrio'],
          ['cuatroFuerzas', 'Equilibrio en dos ejes'],
          ['analiza', 'Analizar un movimiento']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'cuatroFuerzas') {
          var mm = r.elige([4, 6, 8, 10, 12, 15]);
          var pes = mm * 9.8;
          var emp = r.entero(20, 70);
          guiaDelPaso = G({
            intro: 'Una caja de <b>' + mm + ' kg</b> se desliza por el suelo a <b>velocidad constante</b>. ' +
              'La empujas horizontalmente con <b>' + emp + ' N</b>.<br>' +
              'Aqui actuan CUATRO fuerzas. El truco es separarlas en <b>dos ejes independientes</b>: ' +
              'lo vertical por un lado y lo horizontal por otro.',
            pasos: [
              {
                seccion: 'Paso 1: separar los ejes',
                queHacemos: 'Agrupamos las fuerzas segun su direccion.',
                paraQue: 'Las verticales no afectan al movimiento horizontal y al reves. Tratarlas juntas es lo que enreda estos problemas.',
                queda: 'arriba-abajo y los dos horizontales',
                pregunta: '&iquest;Cuantas fuerzas actuan en VERTICAL?',
                resp: R.numero(2, { dec: 0 }),
                pista: 'El peso hacia abajo y la normal hacia arriba. El empuje y el rozamiento son horizontales.',
                despues: 'Cada eje se resuelve por separado.'
              },
              {
                seccion: 'Paso 2: el eje vertical',
                queHacemos: 'Igualamos normal y peso.',
                paraQue: 'La caja no se hunde ni despega, asi que en vertical hay equilibrio.',
                queda: 'normal = ' + F.n(pes, 2) + ' N',
                pregunta: '&iquest;Cuanto vale la normal? (2 decimales)',
                resp: R.numero(pes, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'Compensa el peso: ' + mm + ' &times; 9.8.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el eje horizontal',
                queHacemos: 'Igualamos rozamiento y empuje.',
                paraQue: 'Velocidad constante tambien en horizontal quiere decir que las dos se empatan.',
                queda: 'normal ' + F.n(pes, 2) + ' N,  rozamiento ' + emp + ' N',
                pregunta: '&iquest;Cuanto vale el rozamiento? (2 decimales)',
                resp: R.numero(emp, { dec: 2, tol: 0.01, unidad: 'N' }),
                pista: 'Empata al empuje, porque la velocidad no cambia.',
                despues: ''
              },
              {
                seccion: 'Paso 4: por que no son iguales entre ejes',
                queHacemos: 'Comparamos los dos ejes.',
                paraQue: 'La normal y el rozamiento casi nunca coinciden: son de ejes distintos y no tienen por que parecerse.',
                queda: 'dos equilibrios independientes',
                pregunta: '&iquest;Tiene que valer el rozamiento lo mismo que la normal?',
                resp: R.opcion(['No: son de ejes distintos', 'Si: siempre son iguales'], 0),
                pista: 'Aqui la normal vale ' + F.n(pes, 2) + ' N y el rozamiento ' + emp + ' N, y las dos situaciones estan en equilibrio.',
                despues: ''
              }
            ],
            final: 'Normal <b>' + F.n(pes, 2) + ' N</b> y rozamiento <b>' + emp + ' N</b>',
            receta: ['Separar siempre en eje vertical y eje horizontal',
              'Cada eje se equilibra por su cuenta',
              'Vertical: normal = peso (si el suelo es horizontal)',
              'Horizontal: rozamiento = empuje, si la velocidad es constante']
          });
          enun = 'Una caja de ' + mm + ' kg se desliza a velocidad constante mientras la empujas con ' + emp + ' N horizontales.<br>' +
            'Calcula la normal y el rozamiento (2 decimales).';
          resp = R.varios([
            { etiqueta: 'Normal (N)', resp: R.numero(pes, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'Rozamiento (N)', resp: R.numero(emp, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Separa las fuerzas en dos ejes: vertical y horizontal.',
            'En vertical la normal compensa el peso; en horizontal el rozamiento compensa tu empuje.'];
          sol = ['Eje vertical: normal = peso = ' + mm + '(9.8) = <b>' + F.n(pes, 2) + ' N</b>',
            'Eje horizontal, a velocidad constante: rozamiento = empuje = <b>' + emp + ' N</b>',
            'Cada eje se equilibra por separado'];

        } else {
          var sit = r.elige([
            { q: 'Un satelite gira alrededor de la Tierra a rapidez constante.<br>&iquest;Hay fuerza neta sobre el?',
              ok: 'Si: aunque la rapidez no cambie, la direccion si',
              mal: 'No: como la rapidez es constante, la fuerza neta es cero',
              por: 'la primera ley pide velocidad constante EN LINEA RECTA; al girar, la direccion cambia todo el tiempo' },
            { q: 'Un paracaidista cae a velocidad constante (velocidad limite).<br>&iquest;Cuanto vale la fuerza neta?',
              ok: 'Cero: el aire empuja hacia arriba tanto como pesa',
              mal: 'Igual a su peso, porque esta cayendo',
              por: 'cae, pero sin cambiar de velocidad, asi que las fuerzas estan empatadas' },
            { q: 'Un coche toma una curva a rapidez constante.<br>&iquest;Esta en equilibrio?',
              ok: 'No: esta cambiando de direccion, asi que acelera',
              mal: 'Si, porque el velocimetro no cambia',
              por: 'la velocidad incluye la direccion, y esa si esta cambiando' }
          ]);
          guiaDelPaso = G({
            intro: 'Una situacion donde la primera ley <b>parece</b> decir una cosa y dice otra.<br>' +
              'El detalle que casi siempre se pasa por alto: la ley habla de <b>velocidad</b>, ' +
              'y la velocidad incluye la <b>direccion</b>, no solo que tan rapido vas.',
            pasos: [
              {
                seccion: 'Paso 1: velocidad no es rapidez',
                queHacemos: 'Distinguimos las dos ideas.',
                paraQue: 'La rapidez es el numero del velocimetro. La velocidad es ese numero MAS la direccion. Cambiar cualquiera de las dos es acelerar.',
                queda: 'velocidad = rapidez + direccion',
                pregunta: 'Si un cuerpo mantiene la rapidez pero cambia de direccion, &iquest;esta acelerando?',
                resp: R.opcion(['Si: cambiar de direccion ya es acelerar', 'No: la rapidez no cambio'], 0),
                pista: 'Por eso en una curva sientes que te empujan, aunque el velocimetro no se mueva.',
                despues: 'La primera ley pide velocidad constante Y en linea recta.'
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Miramos la situacion con ese criterio.',
                paraQue: 'Aqui ' + sit.por + '.',
                queda: sit.ok,
                pregunta: sit.q,
                resp: R.opcion([sit.ok, sit.mal], 0),
                pista: 'Preguntate si la velocidad, con todo y direccion, se mantiene igual.',
                despues: ''
              }
            ],
            final: '<b>' + sit.ok + '</b>',
            receta: ['La primera ley pide velocidad constante EN LINEA RECTA',
              'Cambiar de direccion tambien es acelerar',
              'Rapidez constante no basta para que haya equilibrio',
              'Caer a velocidad limite SI es equilibrio: nada cambia']
          });
          enun = sit.q;
          resp = R.opcion([sit.ok, sit.mal], 0);
          pistas = ['La primera ley pide velocidad constante y en LINEA RECTA.',
            'La velocidad incluye la direccion, no solo la rapidez.'];
          sol = ['Equilibrio es que la velocidad no cambie, ni en valor ni en direccion',
            'Aqui ' + sit.por,
            'Respuesta: <b>' + sit.ok + '</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
