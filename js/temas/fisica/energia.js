/* Ley de conservacion de la energia mecanica. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- caida: de potencial a cinetica ---------------- */
  extra.caida = function (r) {
    var m = r.elige([0.5, 1, 2, 3, 5, 10]);
    var h = r.elige([5, 10, 15, 20, 30, 45]);
    var Ep = m * g * h;
    var v = Math.sqrt(2 * g * h);
    return {
      guia: G({
        intro: 'Se suelta un objeto de <b>' + m + ' kg</b> desde <b>' + h + ' m</b> de altura.<br>' +
          'En vez de usar las formulas de caida libre, vamos por el camino de la <b>energia</b>: ' +
          'arriba tiene energia guardada por su altura, y al caer esa energia se convierte en movimiento. ' +
          'Nada se pierde, solo cambia de forma.',
        pasos: [
          {
            seccion: 'Paso 1: la energia de arriba',
            queHacemos: 'Calculamos la energia potencial en lo alto.',
            paraQue: 'Es la energia que tiene <b>por estar alto</b>. Toda ella esta disponible para convertirse en movimiento.',
            queda: 'E<sub>p</sub> = ' + F.n(Ep, 2) + ' J',
            pregunta: 'Calcula E<sub>p</sub> = mgh = ' + m + ' &times; 9.8 &times; ' + h + ' (2 decimales)',
            resp: R.numero(Ep, { dec: 2, tol: 0.1, unidad: 'J' }),
            pista: 'Multiplica los tres numeros.',
            despues: 'La energia se mide en julios (J).'
          },
          {
            seccion: 'Paso 2: que pasa al llegar abajo',
            queHacemos: 'Vemos en que se convirtio esa energia.',
            paraQue: 'Abajo la altura es cero, asi que ya no queda energia potencial: toda se volvio cinetica, de movimiento.',
            queda: 'E<sub>c</sub> abajo = ' + F.n(Ep, 2) + ' J',
            pregunta: 'Justo antes de tocar el suelo, &iquest;cuanta energia cinetica tiene? (2 decimales)',
            resp: R.numero(Ep, { dec: 2, tol: 0.1, unidad: 'J' }),
            pista: 'Toda la potencial se convirtio en cinetica: la misma cantidad.',
            despues: 'Ni mas ni menos: la energia solo cambio de forma.'
          },
          {
            seccion: 'Paso 3: de energia a velocidad',
            queHacemos: 'Despejamos v de E<sub>c</sub> = &frac12;mv&sup2;.',
            paraQue: 'Al despejar, la masa se cancela: v = &radic;(2gh). Por eso todos los objetos llegan con la misma velocidad, pesen lo que pesen.',
            queda: 'v = ' + F.n(v, 2) + ' m/s',
            pregunta: 'De ' + F.n(Ep, 2) + ' = &frac12;(' + m + ')v&sup2; despeja v (2 decimales)',
            resp: R.numero(v, { dec: 2, tol: 0.05, unidad: 'm/s' }),
            pista: 'v = &radic;<span class="rad">2(' + F.n(Ep, 2) + ')/' + m + '</span>, o mas corto: &radic;<span class="rad">2gh</span>.',
            despues: 'Es el mismo resultado que con las formulas de caida libre.'
          },
          {
            seccion: 'Paso 4: por que se cancela la masa',
            queHacemos: 'Miramos donde esta la masa en los dos lados.',
            paraQue: 'mgh = &frac12;mv&sup2;: la m aparece en los dos lados y se tacha. Por eso una pluma y un martillo, sin aire, llegan igual de rapido.',
            queda: 'v = ' + F.n(v, 2) + ' m/s, sin importar la masa',
            pregunta: 'Si el objeto pesara el doble, &iquest;con que velocidad llegaria?',
            resp: R.opcion(['La misma: ' + F.n(v, 2) + ' m/s', 'El doble'], 0),
            pista: 'La masa esta en los dos lados de mgh = &frac12;mv&sup2; y se cancela.',
            despues: 'Tendria el doble de energia, pero tambien el doble de masa que mover.'
          }
        ],
        final: 'Llega a <b>' + F.n(v, 2) + ' m/s</b>, con <b>' + F.n(Ep, 2) + ' J</b> de energia cinetica',
        receta: ['Arriba: toda la energia es potencial, mgh',
          'Abajo: toda es cinetica, &frac12;mv&sup2;',
          'La suma se conserva: nada se pierde',
          'La masa se cancela: v = &radic;(2gh)']
      }),
      enunciado: 'Se suelta un objeto de ' + m + ' kg desde ' + h + ' m.<br>' +
        'Usando conservacion de la energia, &iquest;con que velocidad llega al suelo? (2 decimales)',
      respuesta: R.numero(v, { dec: 2, tol: 0.05, unidad: 'm/s' }),
      pistas: ['Toda la energia potencial de arriba se convierte en cinetica abajo: mgh = &frac12;mv&sup2;.',
        'Al despejar, la masa se cancela: v = &radic;<span class="rad">2gh</span>.'],
      solucion: ['Arriba: E<sub>p</sub> = mgh = ' + m + '(9.8)(' + h + ') = ' + F.n(Ep, 2) + ' J',
        'Abajo toda es cinetica: &frac12;mv&sup2; = ' + F.n(Ep, 2) + ' J',
        'v = &radic;<span class="rad">2gh</span> = &radic;<span class="rad">' + F.n(2 * g * h, 2) + '</span> = <b>' + F.n(v, 2) + ' m/s</b>']
    };
  };

  /* ---------------- pendulo / montana rusa ---------------- */
  extra.altura = function (r) {
    var m = r.elige([0.5, 1, 2, 5]);
    var v0 = r.elige([4, 6, 8, 10, 12, 15]);
    var h = v0 * v0 / (2 * g);
    return {
      guia: G({
        intro: 'Un carrito de <b>' + m + ' kg</b> llega al pie de una rampa sin rozamiento a <b>' + v0 + ' m/s</b>.<br>' +
          'Queremos hasta que altura sube. La pregunta se podria hacer con cinematica, pero con energia ' +
          'sale mas limpio: <b>toda la energia de movimiento se convierte en altura</b>.',
        pasos: [
          {
            seccion: 'Paso 1: la energia que trae',
            queHacemos: 'Calculamos la energia cinetica al pie de la rampa.',
            paraQue: 'Es todo el "capital" de energia que tiene para gastar subiendo.',
            queda: 'E<sub>c</sub> = ' + F.n(0.5 * m * v0 * v0, 2) + ' J',
            pregunta: 'Calcula &frac12;(' + m + ')(' + v0 + ')&sup2; (2 decimales)',
            resp: R.numero(0.5 * m * v0 * v0, { dec: 2, tol: 0.1, unidad: 'J' }),
            pista: 'Primero ' + v0 + '&sup2; = ' + (v0 * v0) + ', luego por ' + m + ' y divide entre 2.',
            despues: 'Esa es la energia disponible.'
          },
          {
            seccion: 'Paso 2: en que se convierte',
            queHacemos: 'Vemos que pasa en el punto mas alto.',
            paraQue: 'Arriba del todo se detiene un instante, asi que ya no le queda energia cinetica: toda se volvio potencial.',
            queda: 'E<sub>p</sub> arriba = ' + F.n(0.5 * m * v0 * v0, 2) + ' J',
            pregunta: 'En el punto mas alto, &iquest;cuanta energia cinetica le queda?',
            resp: R.numero(0, { dec: 2, unidad: 'J' }),
            pista: 'Si todavia se moviera, seguiria subiendo.',
            despues: 'Toda la energia paso a ser potencial.'
          },
          {
            seccion: 'Paso 3: despejar la altura',
            queHacemos: 'Igualamos &frac12;mv&sup2; = mgh y despejamos h.',
            paraQue: 'Otra vez la masa se cancela: h = v&sup2;/(2g). Sube lo mismo un carrito ligero que uno pesado.',
            queda: 'h = ' + F.n(h, 2) + ' m',
            pregunta: 'Calcula ' + (v0 * v0) + ' / 19.6 (2 decimales)',
            resp: R.numero(h, { dec: 2, tol: 0.05, unidad: 'm' }),
            pista: 'h = v&sup2;/(2g).',
            despues: 'Y no depende de la masa.'
          },
          {
            seccion: 'Paso 4: la forma de la rampa',
            queHacemos: 'Pensamos si importa como sea la rampa.',
            paraQue: 'La energia potencial solo depende de la ALTURA, no del camino recorrido. Por una rampa suave o una empinada sube igual de alto.',
            queda: 'h = ' + F.n(h, 2) + ' m, sea cual sea la rampa',
            pregunta: 'Si la rampa fuera mas empinada, &iquest;subiria a otra altura?',
            resp: R.opcion(['No: subiria a la misma altura', 'Si: menos, porque le cuesta mas'], 0),
            pista: 'mgh solo depende de h. El camino no aparece por ningun lado.',
            despues: 'Eso si, tardaria distinto y llegaria por otro sitio.'
          }
        ],
        final: 'Sube hasta <b>' + F.n(h, 2) + ' m</b>',
        receta: ['Abajo: toda cinetica. Arriba: toda potencial',
          '&frac12;mv&sup2; = mgh',
          'La masa se cancela: h = v&sup2;/(2g)',
          'La altura no depende de la forma de la rampa']
      }),
      enunciado: 'Un carrito de ' + m + ' kg llega al pie de una rampa sin rozamiento a ' + v0 + ' m/s.<br>' +
        '&iquest;Hasta que altura sube? (2 decimales)',
      respuesta: R.numero(h, { dec: 2, tol: 0.05, unidad: 'm' }),
      pistas: ['Toda la energia cinetica se convierte en potencial: &frac12;mv&sup2; = mgh.',
        'Al despejar, la masa se cancela: h = v&sup2;/(2g) = ' + (v0 * v0) + '/19.6.'],
      solucion: ['E<sub>c</sub> abajo = &frac12;(' + m + ')(' + v0 + ')&sup2; = ' + F.n(0.5 * m * v0 * v0, 2) + ' J',
        'Arriba se detiene: toda esa energia es ahora potencial',
        '&frac12;mv&sup2; = mgh, y la masa se cancela: h = v&sup2;/(2g)',
        'h = ' + (v0 * v0) + '/19.6 = <b>' + F.n(h, 2) + ' m</b>']
    };
  };

  EJ.tema({
    id: 'energia',
    materia: 'fisica',
    grupo: 'Energia',
    nombre: 'Ley de conservacion de la energia',
    descripcion: 'Energia cinetica y potencial, y como se transforman una en otra.',
    etiquetas: ['energia', 'cinetica', 'potencial', 'conservacion', 'julios'],
    formulario: '<b>Energia cinetica</b> (por moverse): E<sub>c</sub> = &frac12; m v&sup2;<br>' +
      '<b>Energia potencial</b> (por la altura): E<sub>p</sub> = m g h<br>' +
      '<b>Conservacion</b> (sin rozamiento): E<sub>c</sub> + E<sub>p</sub> = constante<br>' +
      'E<sub>c1</sub> + E<sub>p1</sub> = E<sub>c2</sub> + E<sub>p2</sub><br>' +
      '<small>La energia se mide en julios (J). 1 J = 1 kg&middot;m&sup2;/s&sup2;.<br>' +
      'Con rozamiento la mecanica no se conserva: parte se convierte en calor.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['cinetica', 'Energia cinetica'],
          ['potencial', 'Energia potencial'],
          ['queDice', 'Que dice la ley']
        ]);

        var m = r.elige([0.5, 1, 2, 3, 5, 10, 20]);

        if (tf === 'cinetica') {
          var v = r.elige([2, 3, 4, 5, 6, 8, 10, 12]);
          var Ec = 0.5 * m * v * v;
          guiaDelPaso = G({
            intro: 'Un cuerpo de <b>' + m + ' kg</b> se mueve a <b>' + v + ' m/s</b>.<br>' +
              'La energia cinetica es la que tiene <b>por estar en movimiento</b>: E<sub>c</sub> = &frac12;mv&sup2;. ' +
              'El detalle importante es ese cuadrado.',
            pasos: [
              {
                seccion: 'Paso 1: elevar la velocidad al cuadrado',
                queHacemos: 'Primero el cuadrado de la velocidad.',
                paraQue: 'Solo la velocidad va al cuadrado, no la masa. Es lo que hace que ir al doble de rapido sea CUATRO veces mas peligroso.',
                queda: 'E<sub>c</sub> = &frac12;(' + m + ')(' + (v * v) + ')',
                pregunta: 'Calcula ' + v + '&sup2;',
                resp: R.numero(v * v, { dec: 2, tol: 0.01 }),
                pista: v + ' &times; ' + v + '.',
                despues: ''
              },
              {
                seccion: 'Paso 2: completar la cuenta',
                queHacemos: 'Multiplicamos por la masa y dividimos entre 2.',
                paraQue: 'El resultado sale en julios.',
                queda: 'E<sub>c</sub> = ' + F.n(Ec, 2) + ' J',
                pregunta: 'Calcula &frac12; &times; ' + m + ' &times; ' + (v * v) + ' (2 decimales)',
                resp: R.numero(Ec, { dec: 2, tol: 0.05, unidad: 'J' }),
                pista: 'Multiplica y divide entre 2 al final.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el efecto del cuadrado',
                queHacemos: 'Vemos que pasaria al doblar la velocidad.',
                paraQue: 'Por eso un choque a 100 km/h es cuatro veces mas violento que a 50, no el doble. El cuadrado lo cambia todo.',
                queda: 'E<sub>c</sub> = ' + F.n(Ec, 2) + ' J',
                pregunta: 'Si fuera al doble de rapido, &iquest;cuanta energia tendria?',
                resp: R.opcion(['Cuatro veces mas', 'El doble'], 0),
                pista: 'La velocidad esta al cuadrado: al doblarla, se multiplica por 2&sup2; = 4.',
                despues: ''
              }
            ],
            final: 'Tiene <b>' + F.n(Ec, 2) + ' J</b> de energia cinetica',
            receta: ['E<sub>c</sub> = &frac12;mv&sup2;',
              'Solo la velocidad va al cuadrado',
              'Primero el cuadrado, despues multiplicar',
              'Doble velocidad es cuatro veces mas energia']
          });
          enun = 'Un cuerpo de ' + m + ' kg se mueve a ' + v + ' m/s.<br>&iquest;Cual es su energia cinetica? (2 decimales)';
          resp = R.numero(Ec, { dec: 2, tol: 0.05, unidad: 'J' });
          pistas = ['E<sub>c</sub> = &frac12;mv&sup2;. Ojo: solo la velocidad va al cuadrado.',
            'E<sub>c</sub> = &frac12;(' + m + ')(' + (v * v) + ').'];
          sol = ['E<sub>c</sub> = &frac12;mv&sup2;',
            'v&sup2; = ' + v + '&sup2; = ' + (v * v),
            'E<sub>c</sub> = &frac12;(' + m + ')(' + (v * v) + ') = <b>' + F.n(Ec, 2) + ' J</b>'];

        } else if (tf === 'potencial') {
          var h = r.elige([2, 3, 5, 8, 10, 15, 20]);
          var Ep = m * g * h;
          guiaDelPaso = G({
            intro: 'Un cuerpo de <b>' + m + ' kg</b> esta a <b>' + h + ' m</b> de altura.<br>' +
              'La energia potencial es la que tiene <b>guardada por su posicion</b>: si lo sueltas, ' +
              'esa energia se convierte en movimiento.',
            pasos: [
              {
                seccion: 'Paso 1: la formula',
                queHacemos: 'Escribimos E<sub>p</sub> = mgh.',
                paraQue: 'Los tres factores tienen sentido: mas masa, mas alto o mas gravedad, mas energia guardada.',
                queda: 'E<sub>p</sub> = ' + m + ' &times; 9.8 &times; ' + h,
                pregunta: '&iquest;Cual es la formula de la energia potencial?',
                resp: R.opcion(['E<sub>p</sub> = m g h', 'E<sub>p</sub> = &frac12; m h&sup2;'], 0),
                pista: 'Aqui no hay ningun cuadrado: los tres factores van simples.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Multiplicamos los tres.',
                paraQue: 'Tambien sale en julios: es la misma moneda que la cinetica, y por eso se pueden intercambiar.',
                queda: 'E<sub>p</sub> = ' + F.n(Ep, 2) + ' J',
                pregunta: 'Calcula ' + m + ' &times; 9.8 &times; ' + h + ' (2 decimales)',
                resp: R.numero(Ep, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: desde donde se mide la altura',
                queHacemos: 'Pensamos respecto a que se mide h.',
                paraQue: 'La energia potencial depende de donde pongas el cero. Lo que de verdad importa siempre es la DIFERENCIA de altura, no el valor absoluto.',
                queda: 'E<sub>p</sub> = ' + F.n(Ep, 2) + ' J respecto al suelo',
                pregunta: 'La altura h, &iquest;desde donde se mide?',
                resp: R.opcion(['Desde donde tu decidas poner el cero', 'Siempre desde el centro de la Tierra'], 0),
                pista: 'Lo normal es tomar el suelo como cero, pero es una eleccion.',
                despues: 'Lo que cuenta en los problemas es cuanto CAMBIA la altura.'
              }
            ],
            final: 'Tiene <b>' + F.n(Ep, 2) + ' J</b> de energia potencial',
            receta: ['E<sub>p</sub> = mgh',
              'Sin cuadrados: los tres factores simples',
              'Tambien se mide en julios',
              'La altura se mide desde el cero que tu elijas']
          });
          enun = 'Un cuerpo de ' + m + ' kg esta a ' + h + ' m de altura.<br>&iquest;Cual es su energia potencial? (2 decimales)';
          resp = R.numero(Ep, { dec: 2, tol: 0.1, unidad: 'J' });
          pistas = ['E<sub>p</sub> = m g h, con g = 9.8.',
            'E<sub>p</sub> = ' + m + ' &times; 9.8 &times; ' + h + '.'];
          sol = ['E<sub>p</sub> = m g h',
            'E<sub>p</sub> = ' + m + '(9.8)(' + h + ')',
            'E<sub>p</sub> = <b>' + F.n(Ep, 2) + ' J</b>'];

        } else {
          var cq = r.elige([
            { q: 'Segun la ley de conservacion, &iquest;que le pasa a la energia?',
              ok: 'No se crea ni se destruye: solo cambia de forma', mal: 'Se va gastando hasta agotarse',
              por: 'lo que parece que se gasta en realidad se convirtio en calor, sonido o deformacion' },
            { q: 'Un pendulo sin rozamiento oscila. &iquest;Donde tiene mas energia cinetica?',
              ok: 'En el punto mas bajo', mal: 'En los extremos, donde mas alto llega',
              por: 'abajo es donde va mas rapido; en los extremos se detiene un instante' },
            { q: 'Una pelota rebota y cada vez sube menos. &iquest;Se perdio energia?',
              ok: 'No se perdio: se convirtio en calor y sonido', mal: 'Si, la energia desaparecio',
              por: 'en cada rebote una parte se transforma en calor y en el ruido del golpe' },
            { q: 'Con rozamiento, &iquest;se conserva la energia mecanica?',
              ok: 'No: parte se convierte en calor', mal: 'Si, siempre se conserva',
              por: 'la mecanica (cinetica mas potencial) disminuye, aunque la energia total siga siendo la misma' }
          ]);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre que dice la <b>ley de conservacion de la energia</b>.<br>' +
              'Es una de las ideas mas potentes de toda la fisica, y tambien una de las peor entendidas.',
            pasos: [
              {
                seccion: 'Paso 1: la idea central',
                queHacemos: 'Fijamos que afirma la ley.',
                paraQue: 'La energia no se gasta: se TRANSFORMA. Cuando decimos que algo "gasto" energia, en realidad la paso a otra forma, casi siempre calor.',
                queda: 'no se crea ni se destruye: se transforma',
                pregunta: '&iquest;Que dice la ley de conservacion de la energia?',
                resp: R.opcion(['Que no se crea ni se destruye, solo se transforma',
                  'Que toda energia acaba agotandose'], 0),
                pista: 'La energia total del universo es siempre la misma; lo que cambia es en que forma esta.',
                despues: ''
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + cq.por + '.',
                queda: cq.ok,
                pregunta: cq.q,
                resp: R.opcion([cq.ok, cq.mal], 0),
                pista: 'Preguntate en que se convirtio la energia, no si desaparecio.',
                despues: ''
              }
            ],
            final: '<b>' + cq.ok + '</b>',
            receta: ['La energia no se crea ni se destruye',
              'Solo cambia de forma',
              'Lo que parece perdido suele ser calor',
              'Sin rozamiento, cinetica + potencial se mantiene constante']
          });
          enun = cq.q;
          resp = R.opcion([cq.ok, cq.mal], 0);
          pistas = ['La energia no se gasta: se transforma.',
            'Aqui ' + cq.por + '.'];
          sol = ['La energia no se crea ni se destruye, solo cambia de forma',
            'Aqui ' + cq.por,
            'Respuesta: <b>' + cq.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['caida', 'Velocidad al caer'],
          ['altura', 'Altura que alcanza'],
          ['pendulo', 'Pendulo']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var mp = r.elige([0.2, 0.5, 1, 2]);
        var hp = r.elige([0.2, 0.3, 0.5, 0.8, 1.0, 1.5]);
        var vp = Math.sqrt(2 * g * hp);
        guiaDelPaso = G({
          intro: 'Un pendulo de <b>' + mp + ' kg</b> se suelta desde una altura de <b>' + hp + ' m</b> ' +
            'sobre su punto mas bajo.<br>' +
            'Parece complicado por la cuerda y el arco, pero con energia se vuelve trivial: ' +
            'solo importa <b>cuanto baja</b>, no el camino.',
          pasos: [
            {
              seccion: 'Paso 1: la energia de partida',
              queHacemos: 'Calculamos la potencial en el punto de suelta.',
              paraQue: 'Se suelta sin empujarlo, asi que al principio no hay cinetica: toda la energia es potencial.',
              queda: 'E total = ' + F.n(mp * g * hp, 3) + ' J',
              pregunta: 'Calcula ' + mp + ' &times; 9.8 &times; ' + hp + ' (3 decimales)',
              resp: R.numero(mp * g * hp, { dec: 3, tol: 0.01, unidad: 'J' }),
              pista: 'E<sub>p</sub> = mgh.',
              despues: 'Esa es toda la energia del sistema.'
            },
            {
              seccion: 'Paso 2: abajo del todo',
              queHacemos: 'Vemos como esta repartida la energia en el punto mas bajo.',
              paraQue: 'Abajo la altura es cero, asi que la potencial es cero y toda la energia esta en el movimiento.',
              queda: 'E<sub>c</sub> abajo = ' + F.n(mp * g * hp, 3) + ' J',
              pregunta: 'En el punto mas bajo, &iquest;cuanto vale la energia potencial?',
              resp: R.numero(0, { dec: 2, unidad: 'J' }),
              pista: 'Ahi la altura es cero.',
              despues: 'Toda la energia es cinetica.'
            },
            {
              seccion: 'Paso 3: la velocidad',
              queHacemos: 'Despejamos v.',
              paraQue: 'Sale v = &radic;(2gh), la misma formula que en caida libre. La cuerda obliga a seguir un arco, pero no cambia la energia.',
              queda: 'v = ' + F.n(vp, 3) + ' m/s',
              pregunta: 'Calcula &radic;<span class="rad">2(9.8)(' + hp + ')</span> (3 decimales)',
              resp: R.numero(vp, { dec: 3, tol: 0.01, unidad: 'm/s' }),
              pista: 'Dentro de la raiz: ' + F.n(2 * g * hp, 3) + '.',
              despues: ''
            },
            {
              seccion: 'Paso 4: hasta donde sube al otro lado',
              queHacemos: 'Aplicamos la conservacion al otro extremo.',
              paraQue: 'Sin rozamiento sube exactamente a la misma altura. Si la cuerda fuera mas larga o mas corta, daria igual: la altura seria la misma.',
              queda: 'sube otra vez a ' + hp + ' m',
              pregunta: '&iquest;A que altura llega al otro lado?',
              resp: R.numero(hp, { dec: 2, tol: 0.01, unidad: 'm' }),
              pista: 'Toda la cinetica vuelve a convertirse en potencial.',
              despues: 'Por eso un pendulo ideal oscilaria para siempre.'
            }
          ],
          final: 'Pasa por abajo a <b>' + F.n(vp, 3) + ' m/s</b> y sube otra vez a <b>' + hp + ' m</b>',
          receta: ['Solo importa la diferencia de altura, no el camino',
            'Arriba toda potencial, abajo toda cinetica',
            'v = &radic;(2gh), igual que en caida libre',
            'Sin rozamiento vuelve a la misma altura']
        });
        enun = 'Un pendulo de ' + mp + ' kg se suelta desde ' + hp + ' m sobre su punto mas bajo.<br>' +
          '&iquest;Con que velocidad pasa por el punto mas bajo? (3 decimales)';
        resp = R.numero(vp, { dec: 3, tol: 0.01, unidad: 'm/s' });
        pistas = ['Toda la energia potencial se convierte en cinetica: mgh = &frac12;mv&sup2;.',
          'La masa se cancela: v = &radic;<span class="rad">2gh</span> = &radic;<span class="rad">' + F.n(2 * g * hp, 3) + '</span>.'];
        sol = ['E<sub>p</sub> arriba = mgh = ' + mp + '(9.8)(' + hp + ') = ' + F.n(mp * g * hp, 3) + ' J',
          'Abajo toda es cinetica: &frac12;mv&sup2; = ' + F.n(mp * g * hp, 3) + ' J',
          'v = &radic;<span class="rad">2gh</span> = <b>' + F.n(vp, 3) + ' m/s</b>'];

      } else {
        var t3 = r.subtema([
          ['puntoIntermedio', 'En un punto intermedio'],
          ['conRozamiento', 'Con rozamiento'],
          ['altura', 'Altura que alcanza']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'puntoIntermedio') {
          var mi = r.elige([1, 2, 5]);
          var h0 = r.elige([10, 15, 20, 30]);
          var h1 = r.elige([2, 4, 5, 8]);
          while (h1 >= h0) h1 = r.elige([2, 4, 5]);
          var Etot = mi * g * h0;
          var Epi = mi * g * h1;
          var Eci = Etot - Epi;
          var vi = Math.sqrt(2 * g * (h0 - h1));
          guiaDelPaso = G({
            intro: 'Se suelta un objeto de <b>' + mi + ' kg</b> desde <b>' + h0 + ' m</b>.<br>' +
              'Queremos su velocidad cuando va pasando por los <b>' + h1 + ' m</b>. ' +
              'A media caida la energia esta <b>repartida</b> entre las dos formas, y hay que llevar la cuenta.',
            pasos: [
              {
                seccion: 'Paso 1: la energia total',
                queHacemos: 'Calculamos la potencial inicial.',
                paraQue: 'Ese numero no va a cambiar en toda la caida: es el total con el que trabajamos.',
                queda: 'E total = ' + F.n(Etot, 2) + ' J',
                pregunta: 'Calcula ' + mi + ' &times; 9.8 &times; ' + h0 + ' (2 decimales)',
                resp: R.numero(Etot, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'E<sub>p</sub> = mgh con la altura inicial.',
                despues: 'Ese total se mantiene durante toda la caida.'
              },
              {
                seccion: 'Paso 2: lo que le queda de potencial',
                queHacemos: 'Calculamos la potencial a ' + h1 + ' m.',
                paraQue: 'Todavia le queda altura, asi que le queda potencial. No toda se convirtio aun.',
                queda: 'E<sub>p</sub> = ' + F.n(Epi, 2) + ' J de ' + F.n(Etot, 2) + ' J',
                pregunta: 'Calcula ' + mi + ' &times; 9.8 &times; ' + h1 + ' (2 decimales)',
                resp: R.numero(Epi, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'Misma formula, con la altura nueva.',
                despues: ''
              },
              {
                seccion: 'Paso 3: lo que se volvio cinetica',
                queHacemos: 'Restamos para ver cuanta energia se convirtio.',
                paraQue: 'La cinetica es lo que FALTA para llegar al total. Esta es la idea clave de todo el tema.',
                queda: 'E<sub>c</sub> = ' + F.n(Eci, 2) + ' J',
                pregunta: 'Calcula ' + F.n(Etot, 2) + ' &minus; ' + F.n(Epi, 2) + ' (2 decimales)',
                resp: R.numero(Eci, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'Total menos lo que queda de potencial.',
                despues: 'Esa es la energia que ya se convirtio en movimiento.'
              },
              {
                seccion: 'Paso 4: la velocidad',
                queHacemos: 'Despejamos v de la cinetica.',
                paraQue: 'Comprobacion: equivale a haber caido ' + (h0 - h1) + ' m, que es justo lo que bajo.',
                queda: 'v = ' + F.n(vi, 2) + ' m/s',
                pregunta: 'De ' + F.n(Eci, 2) + ' = &frac12;(' + mi + ')v&sup2; despeja v (2 decimales)',
                resp: R.numero(vi, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'v = &radic;<span class="rad">2(' + F.n(Eci, 2) + ')/' + mi + '</span>. Tambien sale como &radic;<span class="rad">2g(' + h0 + '&minus;' + h1 + ')</span>.',
                despues: 'Solo cuenta lo que BAJO, no la altura a la que esta.'
              }
            ],
            final: 'A los ' + h1 + ' m va a <b>' + F.n(vi, 2) + ' m/s</b>',
            receta: ['La energia total no cambia en toda la caida',
              'A media caida esta repartida entre las dos formas',
              'Cinetica = total menos la potencial que queda',
              'Equivale a haber caido solo la diferencia de alturas']
          });
          enun = 'Se suelta un objeto de ' + mi + ' kg desde ' + h0 + ' m.<br>' +
            '&iquest;Con que velocidad pasa por los ' + h1 + ' m? (2 decimales)';
          resp = R.numero(vi, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['La energia total es mgh con la altura inicial y no cambia.',
            'A ' + h1 + ' m le queda potencial; la cinetica es lo que falta para el total.'];
          sol = ['E total = ' + mi + '(9.8)(' + h0 + ') = ' + F.n(Etot, 2) + ' J',
            'A ' + h1 + ' m: E<sub>p</sub> = ' + mi + '(9.8)(' + h1 + ') = ' + F.n(Epi, 2) + ' J',
            'E<sub>c</sub> = ' + F.n(Etot, 2) + ' &minus; ' + F.n(Epi, 2) + ' = ' + F.n(Eci, 2) + ' J',
            'v = &radic;<span class="rad">2E<sub>c</sub>/m</span> = <b>' + F.n(vi, 2) + ' m/s</b>'];

        } else {
          var mr = r.elige([1, 2, 5, 10]);
          var hr = r.elige([5, 10, 15, 20]);
          var vr = r.elige([5, 8, 10, 12]);
          var Eini = mr * g * hr;
          var Efin = 0.5 * mr * vr * vr;
          while (Efin >= Eini) { vr = r.elige([4, 5, 6]); Efin = 0.5 * mr * vr * vr; }
          var perdida = Eini - Efin;
          guiaDelPaso = G({
            intro: 'Un objeto de <b>' + mr + ' kg</b> se suelta desde <b>' + hr + ' m</b> por una rampa ' +
              '<b>con rozamiento</b> y llega abajo a <b>' + vr + ' m/s</b>.<br>' +
              'Sin rozamiento llegaria mas rapido. Esa diferencia no desaparecio: ' +
              'se convirtio en <b>calor</b>.',
            pasos: [
              {
                seccion: 'Paso 1: la energia de partida',
                queHacemos: 'Calculamos la potencial inicial.',
                paraQue: 'Es toda la energia con la que empieza.',
                queda: 'empieza con ' + F.n(Eini, 2) + ' J',
                pregunta: 'Calcula ' + mr + ' &times; 9.8 &times; ' + hr + ' (2 decimales)',
                resp: R.numero(Eini, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'E<sub>p</sub> = mgh.',
                despues: ''
              },
              {
                seccion: 'Paso 2: la energia con la que llega',
                queHacemos: 'Calculamos la cinetica al final.',
                paraQue: 'Es la energia mecanica que le quedo al llegar abajo.',
                queda: 'llega con ' + F.n(Efin, 2) + ' J de ' + F.n(Eini, 2) + ' J',
                pregunta: 'Calcula &frac12;(' + mr + ')(' + vr + ')&sup2; (2 decimales)',
                resp: R.numero(Efin, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'Primero ' + vr + '&sup2; = ' + (vr * vr) + '.',
                despues: 'Menos de lo que tenia arriba.'
              },
              {
                seccion: 'Paso 3: cuanta se convirtio en calor',
                queHacemos: 'Restamos las dos.',
                paraQue: 'Esa diferencia NO desaparecio: el rozamiento la convirtio en calor. Si tocaras la rampa, estaria un poco mas caliente.',
                queda: F.n(perdida, 2) + ' J se volvieron calor',
                pregunta: 'Calcula ' + F.n(Eini, 2) + ' &minus; ' + F.n(Efin, 2) + ' (2 decimales)',
                resp: R.numero(perdida, { dec: 2, tol: 0.1, unidad: 'J' }),
                pista: 'Resta directa.',
                despues: 'La energia total sigue igual: parte de ella ahora es calor.'
              },
              {
                seccion: 'Paso 4: que ley sigue valiendo',
                queHacemos: 'Distinguimos energia mecanica de energia total.',
                paraQue: 'La energia MECANICA no se conservo; la energia TOTAL si. La ley general nunca falla: solo hay que contar todas las formas.',
                queda: 'mecanica no se conserva; total si',
                pregunta: 'Con rozamiento, &iquest;que ocurre?',
                resp: R.opcion(['La energia mecanica disminuye, pero la total se conserva',
                  'La energia total disminuye'], 0),
                pista: 'El calor tambien es energia: hay que contarlo.',
                despues: ''
              }
            ],
            final: 'Se convirtieron <b>' + F.n(perdida, 2) + ' J</b> en calor',
            receta: ['Calcular la energia inicial y la final',
              'La diferencia se la llevo el rozamiento',
              'Esa energia se convirtio en calor, no desaparecio',
              'La energia mecanica no se conserva, pero la total si']
          });
          enun = 'Un objeto de ' + mr + ' kg se suelta desde ' + hr + ' m por una rampa con rozamiento y llega abajo a ' + vr + ' m/s.<br>' +
            '&iquest;Cuanta energia se convirtio en calor? (2 decimales)';
          resp = R.numero(perdida, { dec: 2, tol: 0.1, unidad: 'J' });
          pistas = ['Calcula la energia al principio (mgh) y al final (&frac12;mv&sup2;).',
            'La diferencia se la llevo el rozamiento en forma de calor.'];
          sol = ['Al principio: mgh = ' + mr + '(9.8)(' + hr + ') = ' + F.n(Eini, 2) + ' J',
            'Al final: &frac12;mv&sup2; = &frac12;(' + mr + ')(' + (vr * vr) + ') = ' + F.n(Efin, 2) + ' J',
            'Diferencia = ' + F.n(Eini, 2) + ' &minus; ' + F.n(Efin, 2) + ' = <b>' + F.n(perdida, 2) + ' J</b> convertidos en calor'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
