/* Tercera ley de Newton: accion y reaccion. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  /* Pares accion-reaccion de la vida diaria. */
  var PARES = [
    { a: 'Empujas una pared con 50 N', b: 'La pared te empuja a ti con 50 N',
      mal: 'La pared no hace nada porque no se mueve',
      nota: 'una pared no se mueve, pero eso no quiere decir que no empuje: lo que pasa es que esta sujeta al suelo' },
    { a: 'La Tierra jala a una manzana con su peso', b: 'La manzana jala a la Tierra con la misma fuerza',
      mal: 'La manzana no jala a la Tierra, es muy pequena',
      nota: 'la manzana SI jala a la Tierra con la misma fuerza; lo que pasa es que la Tierra tiene tanta masa que no se le nota' },
    { a: 'Un nadador empuja el agua hacia atras', b: 'El agua empuja al nadador hacia adelante',
      mal: 'El nadador avanza por su propio impulso, sin el agua',
      nota: 'sin algo que empujar no habria avance: por eso no se puede nadar en el aire' },
    { a: 'Un cohete expulsa gases hacia abajo', b: 'Los gases empujan al cohete hacia arriba',
      mal: 'El cohete se apoya en el aire para subir',
      nota: 'por eso los cohetes funcionan en el vacio, donde no hay aire contra el que apoyarse' },
    { a: 'Un martillo golpea un clavo con 200 N', b: 'El clavo golpea al martillo con 200 N',
      mal: 'El clavo no ejerce fuerza, solo la recibe',
      nota: 'el clavo devuelve la misma fuerza; por eso el martillo rebota' },
    { a: 'Al caminar, tu pie empuja el suelo hacia atras', b: 'El suelo te empuja hacia adelante',
      mal: 'Avanzas porque tus piernas te impulsan hacia adelante',
      nota: 'sobre hielo muy liso no puedes caminar, justo porque el suelo no te devuelve la fuerza' }
  ];

  var extra = {};

  /* ---------------- identificar el par ---------------- */
  extra.identificarPar = function (r) {
    var p = r.elige(PARES);
    return {
      guia: G({
        intro: 'La tercera ley dice que <b>las fuerzas siempre van de dos en dos</b>: si A empuja a B, ' +
          'B empuja a A con la misma intensidad y en sentido contrario.<br>' +
          'Lo delicado no es la formula, es reconocer <b>quien empuja a quien</b>.',
        pasos: [
          {
            seccion: 'Paso 1: las fuerzas van en pares',
            queHacemos: 'Recordamos que dice la ley.',
            paraQue: 'No existe una fuerza sola: empujar algo es, al mismo tiempo, ser empujado por ese algo.',
            queda: 'si A empuja a B, B empuja a A',
            pregunta: 'Si un cuerpo A ejerce una fuerza sobre B, &iquest;que pasa?',
            resp: R.opcion(['B ejerce la misma fuerza sobre A, en sentido contrario',
              'B solo recibe la fuerza, no ejerce ninguna'], 0),
            pista: 'Prueba a empujar una pared: sientes como te empuja de vuelta en las manos.',
            despues: 'Las dos fuerzas aparecen y desaparecen juntas.'
          },
          {
            seccion: 'Paso 2: encontrar la pareja',
            queHacemos: 'Buscamos la reaccion de esta situacion.',
            paraQue: 'Para encontrarla basta con invertir el orden: si "A empuja a B", la pareja es "B empuja a A". Nada mas.',
            queda: p.b,
            pregunta: '<b>' + p.a + '.</b><br>&iquest;Cual es la reaccion?',
            resp: R.opcion([p.b, p.mal], 0),
            pista: 'Dale la vuelta a la frase: cambia quien empuja por quien es empujado.',
            despues: 'Aqui ' + p.nota + '.'
          },
          {
            seccion: 'Paso 3: por que no se cancelan',
            queHacemos: 'Vemos por que dos fuerzas iguales y opuestas no dejan todo quieto.',
            paraQue: 'Esta es LA duda del tema. No se cancelan porque actuan sobre CUERPOS DISTINTOS. Para cancelarse tendrian que actuar sobre el mismo.',
            queda: 'actuan sobre cuerpos distintos',
            pregunta: 'Si las dos fuerzas son iguales y opuestas, &iquest;por que no se anulan?',
            resp: R.opcion(['Porque actuan sobre cuerpos distintos',
              'Porque una es un poco mayor que la otra'], 0),
            pista: 'Para que dos fuerzas se anulen tienen que estar aplicadas al MISMO cuerpo.',
            despues: 'Cada una hace efecto en su propio cuerpo.'
          }
        ],
        final: 'La reaccion es: <b>' + p.b + '</b>',
        receta: ['Las fuerzas siempre vienen de dos en dos',
          'La reaccion sale de invertir quien empuja a quien',
          'Son iguales en valor y opuestas en sentido',
          'NO se cancelan: actuan sobre cuerpos distintos']
      }),
      enunciado: '<b>' + p.a + '.</b><br>&iquest;Cual es la reaccion segun la tercera ley?',
      respuesta: R.opcion([p.b, p.mal], 0),
      pistas: ['La reaccion se obtiene invirtiendo quien ejerce y quien recibe.',
        'Aqui ' + p.nota + '.'],
      solucion: ['La tercera ley empareja "A sobre B" con "B sobre A"',
        'Reaccion: <b>' + p.b + '</b>',
        'Son iguales y opuestas, pero actuan sobre cuerpos distintos: por eso no se cancelan']
    };
  };

  /* ---------------- retroceso ---------------- */
  extra.retroceso = function (r) {
    var M = r.elige([60, 70, 80, 4, 5, 6]);
    var esPersona = M >= 60;
    var m = esPersona ? r.elige([2, 3, 5, 8]) : r.elige([0.01, 0.02, 0.05]);
    var v = esPersona ? r.elige([3, 4, 5, 6]) : r.elige([300, 400, 500]);
    var V = m * v / M;
    return {
      guia: G({
        intro: esPersona
          ? 'Una persona de <b>' + M + ' kg</b> sobre patines lanza un objeto de <b>' + m + ' kg</b> a <b>' + v + ' m/s</b>.'
          : 'Un rifle de <b>' + M + ' kg</b> dispara una bala de <b>' + m + ' kg</b> a <b>' + v + ' m/s</b>.',
        pasos: [
          {
            seccion: 'Paso 1: el par de fuerzas',
            queHacemos: 'Identificamos las dos fuerzas del empujon.',
            paraQue: 'Durante el lanzamiento, cada uno empuja al otro con la MISMA fuerza y durante el MISMO tiempo. De ahi sale todo lo demas.',
            queda: 'misma fuerza, mismo tiempo, sentidos contrarios',
            pregunta: 'Al lanzar, &iquest;que fuerzas aparecen?',
            resp: R.opcion([
              'Cada uno empuja al otro con la misma fuerza, en sentidos contrarios',
              'Solo hay fuerza sobre el objeto lanzado'], 0),
            pista: 'Por eso el que lanza sale disparado hacia atras.',
            despues: 'Misma fuerza durante el mismo tiempo en los dos.'
          },
          {
            seccion: 'Paso 2: lo que se conserva',
            queHacemos: 'Igualamos las cantidades de movimiento.',
            paraQue: 'Si empiezan quietos, la suma m&middot;v de los dos tiene que seguir valiendo cero. Uno va hacia un lado y el otro hacia el contrario, con el mismo m&middot;v.',
            queda: M + '&middot;V = ' + m + '&middot;' + v,
            pregunta: 'Partiendo del reposo, &iquest;que relacion se cumple?',
            resp: R.opcion(['M &middot; V = m &middot; v', 'M &middot; V = m / v'], 0),
            pista: 'La cantidad de movimiento total era cero y tiene que seguir siendo cero.',
            despues: 'De ahi se despeja la velocidad de retroceso.'
          },
          {
            seccion: 'Paso 3: calcular el retroceso',
            queHacemos: 'Despejamos V = m&middot;v / M.',
            paraQue: 'Fijate en la asimetria: la misma fuerza, pero el mas pesado sale mucho mas lento. Es la inercia otra vez.',
            queda: 'V = ' + F.n(V, 3) + ' m/s',
            pregunta: 'Calcula (' + m + ' &times; ' + v + ') / ' + M + ' (3 decimales)',
            resp: R.numero(V, { dec: 3, tol: 0.005, unidad: 'm/s' }),
            pista: 'Primero ' + m + ' &times; ' + v + ' = ' + F.n(m * v, 2) + ', luego divide entre ' + M + '.',
            despues: 'Retrocede a ' + F.n(V, 3) + ' m/s, mucho menos que los ' + v + ' m/s del otro.'
          },
          {
            seccion: 'Paso 4: misma fuerza, distinto efecto',
            queHacemos: 'Entendemos por que uno sale tan rapido y el otro tan lento.',
            paraQue: 'Las FUERZAS son iguales (tercera ley), pero las ACELERACIONES no, porque las masas son distintas (segunda ley). Las dos leyes trabajando juntas.',
            queda: 'V = ' + F.n(V, 3) + ' m/s de retroceso',
            pregunta: 'Si la fuerza sobre los dos es la misma, &iquest;por que uno sale mucho mas rapido?',
            resp: R.opcion(['Porque tiene menos masa, y con la misma fuerza acelera mas',
              'Porque recibe mas fuerza'], 0),
            pista: 'Tercera ley: fuerzas iguales. Segunda ley: a = F/m, distinta para cada masa.',
            despues: ''
          }
        ],
        final: 'Retrocede a <b>' + F.n(V, 3) + ' m/s</b>',
        receta: ['Al lanzar, los dos reciben la misma fuerza',
          'Partiendo del reposo: M&middot;V = m&middot;v',
          'El mas pesado retrocede mas despacio',
          'Fuerzas iguales, aceleraciones distintas: tercera y segunda ley juntas']
      }),
      enunciado: (esPersona
        ? 'Una persona de ' + M + ' kg sobre patines lanza horizontalmente un objeto de ' + m + ' kg a ' + v + ' m/s.'
        : 'Un rifle de ' + M + ' kg dispara una bala de ' + m + ' kg a ' + v + ' m/s.') +
        '<br>&iquest;Con que velocidad retrocede? (3 decimales)',
      respuesta: R.numero(V, { dec: 3, tol: 0.005, unidad: 'm/s' }),
      pistas: ['Los dos reciben la misma fuerza durante el mismo tiempo.',
        'Partiendo del reposo: M&middot;V = m&middot;v, asi que V = (' + m + ')(' + v + ')/' + M + '.'],
      solucion: ['La tercera ley da fuerzas iguales y opuestas',
        'Partiendo del reposo: M&middot;V = m&middot;v',
        'V = (' + m + ')(' + v + ') / ' + M + ' = <b>' + F.n(V, 3) + ' m/s</b>']
    };
  };

  EJ.tema({
    id: 'newton-3',
    materia: 'fisica',
    grupo: 'Dinamica',
    nombre: 'Tercera ley de Newton (accion y reaccion)',
    descripcion: 'Pares de fuerzas, por que no se cancelan y el retroceso al lanzar algo.',
    etiquetas: ['accion', 'reaccion', 'newton', 'pares de fuerzas'],
    formulario: '<b>Tercera ley:</b> si A ejerce una fuerza sobre B, B ejerce sobre A una fuerza ' +
      'del mismo valor y sentido contrario.<br>' +
      'F<sub>AB</sub> = &minus;F<sub>BA</sub><br>' +
      '<small>Las dos fuerzas actuan sobre CUERPOS DISTINTOS: por eso no se cancelan.<br>' +
      'Al lanzar algo partiendo del reposo: M&middot;V = m&middot;v.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['identificarPar', 'Encontrar la reaccion'],
          ['valor', 'Valor de la reaccion'],
          ['enunciado', 'Que dice la ley']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        if (tf === 'valor') {
          var fz = r.entero(20, 250);
          var m1 = r.elige([1, 2, 5]);
          var m2 = m1 * r.elige([3, 5, 10]);
          guiaDelPaso = G({
            intro: 'Un cuerpo de <b>' + m1 + ' kg</b> empuja a otro de <b>' + m2 + ' kg</b> con <b>' + fz + ' N</b>.<br>' +
              'La pregunta es con cuanta fuerza responde el segundo. La respuesta sorprende: ' +
              'la masa <b>no importa</b> para eso.',
            pasos: [
              {
                seccion: 'Paso 1: cuanto vale la reaccion',
                queHacemos: 'Aplicamos la tercera ley.',
                paraQue: 'Las dos fuerzas del par son SIEMPRE iguales, sin importar las masas ni cual se mueve.',
                queda: 'reaccion = ' + fz + ' N',
                pregunta: '&iquest;Con cuanta fuerza responde el segundo cuerpo? (2 decimales)',
                resp: R.numero(fz, { dec: 2, tol: 0.01, unidad: 'N' }),
                pista: 'Exactamente la misma que recibio.',
                despues: 'Las masas no cambian el valor de las fuerzas del par.'
              },
              {
                seccion: 'Paso 2: donde SI importa la masa',
                queHacemos: 'Vemos en que se nota la diferencia de masas.',
                paraQue: 'Las fuerzas son iguales, pero las aceleraciones no: a = F/m. El ligero acelera ' + (m2 / m1) + ' veces mas.',
                queda: 'misma fuerza, distinta aceleracion',
                pregunta: 'Si las fuerzas son iguales, &iquest;en que se nota que uno tiene mas masa?',
                resp: R.opcion(['En la aceleracion: el ligero acelera mas', 'En la fuerza: el pesado empuja mas'], 0),
                pista: 'a = F/m: misma F, distinta m, distinta a.',
                despues: ''
              }
            ],
            final: 'La reaccion vale <b>' + fz + ' N</b>, igual que la accion',
            receta: ['Las fuerzas del par son siempre iguales',
              'Las masas no cambian el valor de esas fuerzas',
              'Lo que si cambia con la masa es la aceleracion',
              'a = F/m para cada cuerpo por separado']
          });
          enun = 'Un cuerpo de ' + m1 + ' kg empuja a otro de ' + m2 + ' kg con una fuerza de ' + fz + ' N.<br>' +
            '&iquest;Con que fuerza empuja el segundo al primero? (2 decimales)';
          resp = R.numero(fz, { dec: 2, tol: 0.01, unidad: 'N' });
          pistas = ['La tercera ley dice que las dos fuerzas del par son iguales.',
            'Las masas no influyen en el valor de las fuerzas, solo en las aceleraciones.'];
          sol = ['Tercera ley: accion y reaccion tienen el mismo valor',
            'La masa no cambia ese valor',
            'La reaccion vale <b>' + fz + ' N</b>'];

        } else {
          var preg = r.elige([
            { q: 'Las fuerzas de accion y reaccion, &iquest;sobre que actuan?',
              ok: 'Sobre cuerpos distintos', mal: 'Sobre el mismo cuerpo',
              por: 'por eso no se cancelan entre si' },
            { q: '&iquest;Puede existir una fuerza sola, sin su pareja?',
              ok: 'No: las fuerzas siempre van en pares', mal: 'Si, cuando el otro cuerpo esta quieto',
              por: 'toda interaccion tiene dos lados' },
            { q: 'Accion y reaccion, &iquest;cual ocurre primero?',
              ok: 'Las dos a la vez', mal: 'Primero la accion y despues la reaccion',
              por: 'no hay retraso: aparecen y desaparecen juntas' },
            { q: '&iquest;Puede ser la reaccion menor que la accion?',
              ok: 'No: siempre valen lo mismo', mal: 'Si, si el otro cuerpo es mas debil',
              por: 'el valor es siempre identico, aunque los efectos sean muy distintos' }
          ]);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre lo que dice exactamente la tercera ley.<br>' +
              'Es la ley mas facil de recitar ("a toda accion corresponde una reaccion") y la mas facil ' +
              'de entender mal.',
            pasos: [
              {
                seccion: 'Paso 1: los tres detalles',
                queHacemos: 'Repasamos que caracteriza al par de fuerzas.',
                paraQue: 'Mismo valor, sentidos contrarios, y sobre cuerpos DISTINTOS. El tercer detalle es el que casi siempre se olvida.',
                queda: 'mismo valor, sentido contrario, cuerpos distintos',
                pregunta: '&iquest;Que caracteriza al par accion-reaccion?',
                resp: R.opcion(['Mismo valor, sentidos contrarios, sobre cuerpos distintos',
                  'Mismo valor y sentido, sobre el mismo cuerpo'], 0),
                pista: 'Si actuaran sobre el mismo cuerpo se anularian y nada se moveria nunca.',
                despues: ''
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + preg.por + '.',
                queda: preg.ok,
                pregunta: preg.q,
                resp: R.opcion([preg.ok, preg.mal], 0),
                pista: 'Piensa en las tres caracteristicas del par.',
                despues: ''
              }
            ],
            final: '<b>' + preg.ok + '</b>',
            receta: ['Mismo valor y sentidos contrarios',
              'Sobre cuerpos DISTINTOS',
              'Aparecen y desaparecen a la vez',
              'Ninguna fuerza existe sola']
          });
          enun = preg.q;
          resp = R.opcion([preg.ok, preg.mal], 0);
          pistas = ['El par cumple: mismo valor, sentidos contrarios y sobre cuerpos distintos.',
            'Aqui ' + preg.por + '.'];
          sol = ['El par accion-reaccion tiene siempre el mismo valor y sentidos opuestos',
            'Y actua sobre cuerpos distintos: ' + preg.por,
            'Respuesta: <b>' + preg.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['porQueNoSeCancelan', 'Por que no se cancelan'],
          ['caballoCarreta', 'La paradoja del tiro'],
          ['identificarPar', 'Encontrar la reaccion']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        if (t2 === 'porQueNoSeCancelan') {
          var mp = r.elige([2, 5, 10, 20]);
          var fp = r.entero(10, 60);
          var ap = fp / mp;
          guiaDelPaso = G({
            intro: 'Empujas una caja de <b>' + mp + ' kg</b> con <b>' + fp + ' N</b> y la caja te empuja a ti ' +
              'con <b>' + fp + ' N</b>.<br>' +
              'Si son iguales y opuestas, &iquest;como es que la caja se mueve? Es la objecion mas comun ' +
              'a esta ley, y tiene una respuesta muy clara.',
            pasos: [
              {
                seccion: 'Paso 1: donde actua cada fuerza',
                queHacemos: 'Anotamos sobre que cuerpo actua cada una.',
                paraQue: 'Una va sobre la CAJA y la otra sobre TI. Nunca estan en el mismo sitio.',
                queda: 'una sobre la caja, otra sobre ti',
                pregunta: 'La fuerza que TU haces, &iquest;sobre quien actua?',
                resp: R.opcion(['Sobre la caja', 'Sobre ti mismo'], 0),
                pista: 'Y la de la caja actua sobre ti.',
                despues: 'Estan repartidas en dos cuerpos distintos.'
              },
              {
                seccion: 'Paso 2: cuando se cancelan dos fuerzas',
                queHacemos: 'Recordamos la condicion para que se anulen.',
                paraQue: 'Para sumar fuerzas y ver si se cancelan, tienen que estar aplicadas al MISMO cuerpo. Si no, no se pueden ni sumar.',
                queda: 'no se pueden sumar: estan en cuerpos distintos',
                pregunta: '&iquest;Cuando se anulan dos fuerzas entre si?',
                resp: R.opcion(['Cuando actuan sobre el mismo cuerpo', 'Siempre que sean iguales y opuestas'], 0),
                pista: 'Las fuerzas se suman por cuerpo, no todas juntas.',
                despues: 'Por eso el par accion-reaccion nunca se anula.'
              },
              {
                seccion: 'Paso 3: que le pasa a la caja',
                queHacemos: 'Aplicamos la segunda ley solo a la caja.',
                paraQue: 'Sobre la caja actuan tus ' + fp + ' N (olvidando el rozamiento). Esa es su fuerza neta, y con ella acelera.',
                queda: 'a de la caja = ' + F.n(ap, 2) + ' m/s&sup2;',
                pregunta: 'Sin rozamiento, &iquest;cuanto acelera la caja? (2 decimales)',
                resp: R.numero(ap, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'a = F/m = ' + fp + '/' + mp + '. La fuerza que la caja te hace a TI no cuenta aqui.',
                despues: 'La otra fuerza del par actua sobre ti, no sobre la caja.'
              },
              {
                seccion: 'Paso 4: y a ti',
                queHacemos: 'Vemos por que tu no sales disparado.',
                paraQue: 'A ti tambien te empujan, pero el rozamiento de tus pies con el suelo lo compensa. Sobre hielo si saldrias hacia atras.',
                queda: 'la caja acelera; a ti te sostiene el rozamiento',
                pregunta: '&iquest;Por que tu no sales empujado hacia atras?',
                resp: R.opcion(['Porque el rozamiento de tus pies lo compensa', 'Porque sobre ti no actua ninguna fuerza'], 0),
                pista: 'Intenta empujar algo pesado estando sobre patines: si sales hacia atras.',
                despues: ''
              }
            ],
            final: 'La caja acelera <b>' + F.n(ap, 2) + ' m/s&sup2;</b>: las fuerzas del par actuan sobre cuerpos distintos',
            receta: ['Las fuerzas se suman POR CUERPO',
              'Accion y reaccion estan en cuerpos distintos: no se suman',
              'Sobre la caja solo cuenta tu empujon',
              'A ti te sostiene el rozamiento con el suelo']
          });
          enun = 'Empujas una caja de ' + mp + ' kg con ' + fp + ' N y ella te empuja con ' + fp + ' N.<br>' +
            'Sin rozamiento en la caja, &iquest;cuanto acelera? (2 decimales)';
          resp = R.numero(ap, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' });
          pistas = ['Las dos fuerzas del par actuan sobre cuerpos distintos: no se cancelan.',
            'Sobre la caja solo actua tu empujon: a = ' + fp + '/' + mp + '.'];
          sol = ['Tu fuerza actua sobre la CAJA; la de ella, sobre TI',
            'Para la caja, la fuerza neta es ' + fp + ' N',
            'a = ' + fp + '/' + mp + ' = <b>' + F.n(ap, 2) + ' m/s&sup2;</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'Un caballo tira de una carreta. Alguien objeta: <i>"si la carreta tira del caballo con la ' +
              'misma fuerza, nunca podrian avanzar"</i>.<br>' +
              'Es una objecion clasica y suena convincente. Pero tiene una trampa.',
            pasos: [
              {
                seccion: 'Paso 1: separar los cuerpos',
                queHacemos: 'Decidimos sobre que cuerpo vamos a estudiar las fuerzas.',
                paraQue: 'El error de la objecion es mezclar fuerzas de dos cuerpos distintos como si estuvieran en el mismo.',
                queda: 'analizar la carreta sola',
                pregunta: 'Para saber si la carreta avanza, &iquest;que fuerzas hay que mirar?',
                resp: R.opcion(['Solo las que actuan SOBRE la carreta', 'Todas las del problema juntas'], 0),
                pista: 'La segunda ley se aplica a un cuerpo a la vez.',
                despues: 'La fuerza que la carreta hace sobre el caballo no actua sobre la carreta.'
              },
              {
                seccion: 'Paso 2: las fuerzas sobre la carreta',
                queHacemos: 'Listamos solo las que la afectan a ella.',
                paraQue: 'Sobre la carreta actuan el tiron del caballo hacia adelante y el rozamiento hacia atras. Y ya.',
                queda: 'tiron del caballo vs rozamiento',
                pregunta: '&iquest;Que fuerzas actuan sobre la carreta?',
                resp: R.opcion(['El tiron del caballo y el rozamiento', 'El tiron del caballo y el tiron de la carreta'], 0),
                pista: 'El tiron de la carreta actua sobre el CABALLO, no sobre ella misma.',
                despues: 'Si el tiron le gana al rozamiento, la carreta acelera.'
              },
              {
                seccion: 'Paso 3: donde falla la objecion',
                queHacemos: 'Senalamos el error del razonamiento.',
                paraQue: 'Compara dos fuerzas que estan en cuerpos distintos. Es como sumar peras de una caja con manzanas de otra.',
                queda: 'compara fuerzas de cuerpos distintos',
                pregunta: '&iquest;Cual es el error de la objecion?',
                resp: R.opcion(['Mezcla fuerzas que actuan sobre cuerpos distintos',
                  'Supone que las fuerzas son iguales, y no lo son'], 0),
                pista: 'Las fuerzas del par SI son iguales: eso no es el error.',
                despues: ''
              },
              {
                seccion: 'Paso 4: que hace avanzar al caballo',
                queHacemos: 'Vemos que empuja al caballo hacia adelante.',
                paraQue: 'El caballo empuja el suelo hacia atras con sus patas y el suelo lo empuja hacia adelante: otro par accion-reaccion, el que de verdad mueve al conjunto.',
                queda: 'el suelo empuja al caballo hacia adelante',
                pregunta: '&iquest;Que fuerza empuja al caballo hacia adelante?',
                resp: R.opcion(['El suelo, como reaccion a que el lo empuja hacia atras',
                  'Su propia fuerza muscular, sin necesidad del suelo'], 0),
                pista: 'Sobre hielo liso el caballo patinaria sin avanzar.',
                despues: 'Por eso hace falta agarre: sin suelo que empujar, no hay avance.'
              }
            ],
            final: 'La objecion falla porque <b>mezcla fuerzas aplicadas a cuerpos distintos</b>',
            receta: ['Analizar un cuerpo a la vez',
              'Sobre la carreta: tiron del caballo y rozamiento',
              'El par accion-reaccion nunca esta en el mismo cuerpo',
              'El caballo avanza porque el suelo lo empuja']
          });
          enun = 'Un caballo tira de una carreta. Si la carreta tira del caballo con la misma fuerza,<br>' +
            '&iquest;por que pueden avanzar?';
          resp = R.opcion(['Porque esas dos fuerzas actuan sobre cuerpos distintos y no se cancelan',
            'Porque el caballo tira un poco mas fuerte que la carreta'], 0);
          pistas = ['Para saber si la carreta acelera, mira solo las fuerzas que actuan SOBRE la carreta.',
            'El tiron de la carreta actua sobre el caballo, no sobre ella misma.'];
          sol = ['Hay que analizar un cuerpo a la vez',
            'Sobre la carreta actuan el tiron del caballo y el rozamiento; si el tiron gana, acelera',
            'Las dos fuerzas del par estan en cuerpos distintos: <b>no se cancelan</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['retroceso', 'Retroceso al lanzar'],
          ['dosBloques', 'Dos bloques que se empujan'],
          ['identificarPar', 'Encontrar la reaccion']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        var mA = r.elige([2, 3, 4, 5]);
        var mB = r.elige([6, 8, 10, 12]);
        var Ff = r.entero(20, 100);
        var aTot = Ff / (mA + mB);
        var contacto = mB * aTot;
        guiaDelPaso = G({
          intro: 'Dos bloques pegados, de <b>' + mA + ' kg</b> y <b>' + mB + ' kg</b>, se empujan con <b>' + Ff + ' N</b> ' +
            'aplicados al primero.<br>' +
            'Queremos la fuerza de <b>contacto</b> entre ellos. El truco es mirar el problema dos veces: ' +
            'primero los dos juntos, luego uno solo.',
          pasos: [
            {
              seccion: 'Paso 1: los dos como un solo cuerpo',
              queHacemos: 'Sumamos las masas y sacamos la aceleracion del conjunto.',
              paraQue: 'Van pegados, asi que aceleran igual. Tratandolos como uno solo, las fuerzas internas no estorban.',
              queda: 'a = ' + F.n(aTot, 2) + ' m/s&sup2; para los dos',
              pregunta: 'Calcula ' + Ff + ' / (' + mA + ' + ' + mB + ') (2 decimales)',
              resp: R.numero(aTot, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
              pista: 'a = F / masa total.',
              despues: 'Los dos bloques aceleran a ' + F.n(aTot, 2) + ' m/s&sup2;.'
            },
            {
              seccion: 'Paso 2: mirar solo el segundo',
              queHacemos: 'Aislamos el bloque de atras.',
              paraQue: 'Sobre el NO actua tu mano: lo unico que lo empuja es el primer bloque. Esa es justo la fuerza que buscamos.',
              queda: 'F contacto = ' + mB + ' &times; ' + F.n(aTot, 2),
              pregunta: 'Sobre el bloque de ' + mB + ' kg, &iquest;que fuerza actua?',
              resp: R.opcion(['Solo el empuje del otro bloque', 'Los ' + Ff + ' N aplicados'], 0),
              pista: 'Los ' + Ff + ' N los recibe el primer bloque, no el segundo.',
              despues: ''
            },
            {
              seccion: 'Paso 3: calcular el contacto',
              queHacemos: 'Aplicamos F = ma solo al segundo bloque.',
              paraQue: 'Sale menor que los ' + Ff + ' N aplicados, y tiene sentido: esa fuerza solo tiene que mover al segundo bloque, no a los dos.',
              queda: 'F contacto = ' + F.n(contacto, 2) + ' N',
              pregunta: 'Calcula ' + mB + ' &times; ' + F.n(aTot, 2) + ' (2 decimales)',
              resp: R.numero(contacto, { dec: 2, tol: 0.05, unidad: 'N' }),
              pista: 'F = ma con la masa del segundo bloque.',
              despues: ''
            },
            {
              seccion: 'Paso 4: la tercera ley aqui',
              queHacemos: 'Vemos la otra mitad del par.',
              paraQue: 'El primer bloque empuja al segundo con ' + F.n(contacto, 2) + ' N, y el segundo empuja al primero con lo mismo hacia atras. Por eso al primero le llegan ' + Ff + ' menos ' + F.n(contacto, 2) + ' netos.',
              queda: 'F contacto = ' + F.n(contacto, 2) + ' N en los dos sentidos',
              pregunta: '&iquest;Con cuanta fuerza empuja el bloque de atras al de adelante?',
              resp: R.numero(contacto, { dec: 2, tol: 0.05, unidad: 'N' }),
              pista: 'Tercera ley: la misma que recibe.',
              despues: 'Comprobacion: al primero le quedan ' + Ff + ' &minus; ' + F.n(contacto, 2) + ' = ' + F.n(Ff - contacto, 2) + ' N netos, que entre ' + mA + ' kg dan los mismos ' + F.n(aTot, 2) + ' m/s&sup2;.'
            }
          ],
          final: 'La fuerza de contacto es de <b>' + F.n(contacto, 2) + ' N</b>',
          receta: ['Primero el conjunto: a = F / masa total',
            'Despues aislar un bloque y aplicarle F = ma',
            'Sobre el de atras solo actua el contacto',
            'La tercera ley empareja las dos fuerzas de contacto',
            'Comprobar con el otro bloque: debe dar la misma aceleracion']
        });
        enun = 'Dos bloques pegados de ' + mA + ' kg y ' + mB + ' kg se empujan con ' + Ff + ' N aplicados al primero.<br>' +
          '&iquest;Cual es la fuerza de contacto entre ellos? (2 decimales)';
        resp = R.numero(contacto, { dec: 2, tol: 0.05, unidad: 'N' });
        pistas = ['Primero trata los dos como un solo cuerpo: a = F/(m<sub>1</sub>+m<sub>2</sub>).',
          'Luego aisla el segundo bloque: sobre el solo actua el contacto, asi que F = m<sub>2</sub>&middot;a.'];
        sol = ['Conjunto: a = ' + Ff + '/(' + mA + '+' + mB + ') = ' + F.n(aTot, 2) + ' m/s&sup2;',
          'Solo el segundo bloque: F = m&middot;a = ' + mB + '(' + F.n(aTot, 2) + ')',
          'F contacto = <b>' + F.n(contacto, 2) + ' N</b>'];
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
