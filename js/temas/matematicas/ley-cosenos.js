/* Ley de cosenos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }

  function figura(a, b, c, C) {
    return F.svg(260, 150,
      '<path d="M30 125 L230 125 L95 25 Z"/>' +
      F.txtSvg(125, 142, c) + F.txtSvg(45, 70, b) + F.txtSvg(175, 70, a) +
      (C ? F.txtSvg(86, 45, C) : ''));
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.paralelogramo = function (r) {
    var a = r.entero(4, 18), b = r.entero(4, 18);
    var ang = r.elige([40, 50, 60, 70, 80, 110, 120]);
    var menor = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(ang)));
    var mayor = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(180 - ang)));
    return {
      guia: G({
        intro: 'Un paralelogramo de lados <b>' + a + '</b> y <b>' + b + ' cm</b> con un angulo de <b>' + ang + '&deg;</b>; ' +
          'queremos sus dos diagonales.<br>' +
          'Cada diagonal parte el paralelogramo en dos triangulos, y en cada uno conocemos <b>dos lados y el angulo entre ellos</b>: ' +
          'justo el caso de la ley de cosenos. Lo unico es que cada diagonal usa un angulo distinto.',
        pasos: [
          { pregunta: 'Los angulos consecutivos de un paralelogramo son suplementarios.<br>&iquest;Cuanto mide el otro angulo?',
            resp: R.numero(180 - ang, { dec: 0 }),
            pista: '180&deg; &minus; ' + ang + '&deg;.',
            despues: 'Cada diagonal "ve" uno de los dos angulos: una el de ' + ang + '&deg; y la otra el de ' + (180 - ang) + '&deg;.' },
          { pregunta: 'Primera diagonal, la que esta frente al angulo de ' + ang + '&deg;.<br>Calcula cos ' + ang + '&deg; (4 decimales)',
            resp: R.numero(Math.cos(rad(ang)), { dec: 4, tol: 0.001 }),
            pista: 'Calculadora en GRADOS.' + (ang > 90 ? ' Como el angulo pasa de 90&deg;, el coseno sale NEGATIVO.' : ''),
            despues: '' },
          { pregunta: 'Aplica d&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; 2(' + a + ')(' + b + ')cos ' + ang + '&deg; y saca la raiz. (2 decimales)',
            resp: R.numero(menor, { dec: 2, tol: 0.03 }),
            pista: 'Cuidado con el doble menos si el coseno es negativo: restar un negativo es sumar.',
            despues: '' },
          { pregunta: 'Ahora la otra diagonal, con el angulo de ' + (180 - ang) + '&deg;. (2 decimales)',
            resp: R.numero(mayor, { dec: 2, tol: 0.03 }),
            pista: 'Misma formula, cambiando solo el coseno: cos ' + (180 - ang) + '&deg; = ' + F.n(Math.cos(rad(180 - ang)), 4) + '.',
            despues: 'Fijate que el coseno cambia de signo al pasar de ' + ang + '&deg; a ' + (180 - ang) + '&deg;: por eso las diagonales miden distinto.' },
          { pregunta: 'Escribe las dos diagonales.',
            resp: R.varios([
              { etiqueta: 'Diagonal frente a ' + ang + '&deg;', resp: R.numero(menor, { dec: 2, tol: 0.03 }) },
              { etiqueta: 'La otra diagonal', resp: R.numero(mayor, { dec: 2, tol: 0.03 }) }
            ]),
            pista: F.n(menor, 2) + ' cm y ' + F.n(mayor, 2) + ' cm.',
            despues: '' }
        ],
        final: 'Las diagonales miden <b>' + F.n(menor, 2) + ' cm</b> y <b>' + F.n(mayor, 2) + ' cm</b>',
        receta: ['Cada diagonal crea un triangulo con los dos lados',
          'Angulos consecutivos del paralelogramo: suman 180&deg;',
          'Ley de cosenos en cada triangulo, con su propio angulo',
          'Coseno negativo (angulo obtuso) hace crecer la diagonal']
      }),
      enunciado: 'Un paralelogramo tiene lados de ' + a + ' y ' + b + ' cm, y uno de sus angulos mide ' + ang + '&deg;.<br>' +
        'Calcula sus dos diagonales (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Diagonal frente a ' + ang + '&deg;', resp: R.numero(menor, { dec: 2, tol: 0.03 }) },
        { etiqueta: 'La otra diagonal', resp: R.numero(mayor, { dec: 2, tol: 0.03 }) }
      ]),
      pistas: ['Cada diagonal parte el paralelogramo en dos triangulos: aplica la ley de cosenos en cada uno.',
        'Los angulos consecutivos de un paralelogramo suman 180&deg;, asi que el otro mide ' + (180 - ang) + '&deg;.'],
      solucion: ['Primera diagonal: d&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; 2(' + a + ')(' + b + ')cos ' + ang + '&deg;',
        'd = <b>' + F.n(menor, 2) + ' cm</b>',
        'El otro angulo es ' + (180 - ang) + '&deg;',
        'Segunda diagonal: D = <b>' + F.n(mayor, 2) + ' cm</b>']
    };
  };

  extra.clasifica = function (r) {
    var a = r.entero(4, 15), b = r.entero(4, 15);
    var c = r.entero(Math.max(2, Math.abs(a - b) + 1), a + b - 1);
    var lados = [a, b, c].sort(function (x, y) { return x - y; });
    var suma = lados[0] * lados[0] + lados[1] * lados[1], mayor2 = lados[2] * lados[2];
    var idx = mayor2 === suma ? 1 : (mayor2 < suma ? 0 : 2);
    var cosMayor = (suma - mayor2) / (2 * lados[0] * lados[1]);
    return {
      guia: G({
        intro: 'Tres lados (<b>' + a + ', ' + b + ' y ' + c + '</b>) y hay que decir si el triangulo es acutangulo, rectangulo u obtusangulo.<br>' +
          'No hace falta calcular ningun angulo. Basta con comparar el cuadrado del lado MAYOR contra la suma de los ' +
          'cuadrados de los otros dos, porque en la ley de cosenos esa diferencia es justo lo que decide el signo del coseno.',
        pasos: [
          { pregunta: '&iquest;Cual es el lado mayor?',
            resp: R.numero(lados[2], { dec: 0 }),
            pista: 'El mas grande de los tres. Frente a el esta el angulo mayor, que es el unico que puede pasar de 90&deg;.',
            despues: 'Solo hace falta estudiar ese angulo: si el mayor es agudo, los tres lo son.' },
          { pregunta: 'Calcula su cuadrado: ' + lados[2] + '&sup2;',
            resp: R.numero(mayor2, { dec: 0 }),
            pista: lados[2] + ' &times; ' + lados[2] + '.', despues: '' },
          { pregunta: 'Ahora la suma de los otros dos: ' + lados[0] + '&sup2; + ' + lados[1] + '&sup2;',
            resp: R.numero(suma, { dec: 0 }),
            pista: (lados[0] * lados[0]) + ' + ' + (lados[1] * lados[1]) + '.',
            despues: 'Hay que comparar ' + mayor2 + ' con ' + suma + '. ' +
              (idx === 1 ? 'Son iguales.' : (idx === 0 ? 'El mayor al cuadrado es MENOR que la suma.' : 'El mayor al cuadrado es MAYOR que la suma.')) },
          { pregunta: 'Entonces, &iquest;como se clasifica?',
            resp: R.opcion(['Acutangulo (todos sus angulos son agudos)',
              'Rectangulo (tiene un angulo de 90&deg;)',
              'Obtusangulo (tiene un angulo mayor de 90&deg;)'], idx),
            pista: 'Si mayor&sup2; = suma, es rectangulo (eso es Pitagoras). Si mayor&sup2; &lt; suma, el coseno sale positivo y el angulo es agudo. ' +
              'Si mayor&sup2; &gt; suma, el coseno sale negativo y el angulo pasa de 90&deg;.',
            despues: 'De hecho cos del angulo mayor = (' + suma + ' &minus; ' + mayor2 + ')/' + (2 * lados[0] * lados[1]) + ' = ' + F.n(cosMayor, 4) + ', ' +
              'y su signo dice todo.' }
        ],
        final: 'Es <b>' + (idx === 1 ? 'rectangulo' : (idx === 0 ? 'acutangulo' : 'obtusangulo')) + '</b>',
        receta: ['Comparar el cuadrado del lado mayor con la suma de los otros dos',
          'Iguales: rectangulo (Pitagoras)',
          'Mayor&sup2; menor que la suma: acutangulo',
          'Mayor&sup2; mayor que la suma: obtusangulo',
          'Solo importa el angulo mayor: los otros dos siempre son agudos']
      }),
      enunciado: 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + '.<br>&iquest;Como se clasifica por sus angulos?',
      respuesta: R.opcion(['Acutangulo (todos sus angulos son agudos)', 'Rectangulo (tiene un angulo de 90&deg;)', 'Obtusangulo (tiene un angulo mayor de 90&deg;)'], idx),
      pistas: ['Compara el cuadrado del lado MAYOR con la suma de los cuadrados de los otros dos.',
        'Lado mayor: ' + lados[2] + ', su cuadrado es ' + mayor2 + '; la suma de los otros cuadrados es ' + suma + '.'],
      solucion: ['c&sup2; = ' + mayor2 + ' y a&sup2; + b&sup2; = ' + suma,
        'Como cos del angulo mayor = (' + suma + ' &minus; ' + mayor2 + ')/' + (2 * lados[0] * lados[1]) + ' = ' + F.n(cosMayor, 4),
        idx === 1 ? 'El coseno da 0 &rArr; angulo de 90&deg;: es <b>rectangulo</b>'
          : idx === 0 ? 'El coseno es positivo &rArr; el angulo mayor es agudo: es <b>acutangulo</b>'
            : 'El coseno es negativo &rArr; el angulo mayor pasa de 90&deg;: es <b>obtusangulo</b>']
    };
  };

  EJ.tema({
    id: 'ley-cosenos',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Ley de cosenos',
    descripcion: 'Tercer lado con dos lados y el angulo entre ellos, y angulos conociendo los tres lados.',
    formulario: 'c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C<br>' +
      'cos C = (a&sup2; + b&sup2; &minus; c&sup2;) / (2ab)<br>' +
      'Se usa con: dos lados y el angulo entre ellos (LAL) o los tres lados (LLL). Si C = 90&deg; se reduce a Pitagoras.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, C, A;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['tercerLado', 'Tercer lado (dos lados y su angulo)'],
          ['paralelogramo', 'Diagonales de un paralelogramo']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        a = r.entero(4, 20); b = r.entero(4, 20);
        C = r.elige([30, 45, 60, 70, 80, 100, 120, 135]);
        c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
        guiaDelPaso = EJ.guia.leyCosenosLado(a, b, C);
        enun = 'En un triangulo a = ' + a + ' cm, b = ' + b + ' cm y el angulo entre ellos C = ' + C + '&deg;.<br>' +
          'Calcula el lado c (2 decimales).' + figura('a=' + a, 'b=' + b, 'c=?', C + '&deg;');
        resp = R.numero(c, { dec: 2, tol: 0.02, unidad: 'cm' });
        pistas = ['Usa c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C.',
          'a&sup2; + b&sup2; = ' + (a * a + b * b) + ' y 2ab&middot;cos C = ' + F.n(2 * a * b * Math.cos(rad(C)), 3) + '.'];
        sol = ['c&sup2; = ' + a + '&sup2; + ' + b + '&sup2; &minus; 2(' + a + ')(' + b + ')cos ' + C + '&deg;',
          'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; ' + F.n(2 * a * b * Math.cos(rad(C)), 3),
          'c&sup2; = ' + F.n(c * c, 3),
          'c = <b>' + F.n(c, 2) + ' cm</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['angulo', 'Angulo con los tres lados'],
          ['mayorAngulo', 'Angulo mayor'],
          ['clasifica', 'Clasificar el triangulo'],
          ['paralelogramo', 'Diagonales de un paralelogramo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        a = r.entero(5, 18); b = r.entero(5, 18);
        var cc = r.entero(Math.max(2, Math.abs(a - b) + 1), a + b - 1);
        c = cc;
        var cosC = (a * a + b * b - c * c) / (2 * a * b);
        C = deg(Math.acos(cosC));
        if (t === 'angulo') {
          guiaDelPaso = G({
            intro: 'Conocemos los <b>tres lados</b> (a = ' + a + ', b = ' + b + ', c = ' + c + ') y queremos el angulo C, ' +
              'el que esta frente al lado c.<br>' +
              'Con tres lados la ley de senos no arranca (no hay ninguna pareja lado-angulo completa). ' +
              'La de cosenos si, despejada para el coseno: <b>cos C = (a&sup2; + b&sup2; &minus; c&sup2;) / (2ab)</b>.',
            pasos: [
              { pregunta: 'Con los tres lados, &iquest;que formula toca?',
                resp: R.opcion(['cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab)',
                  'a/sen A = c/sen C'], 0),
                pista: 'La ley de senos necesita conocer un angulo para empezar, y aqui no tenemos ninguno.',
                despues: 'Fijate en la estructura: el lado OPUESTO al angulo que buscas (c) es el que va restando.' },
              { pregunta: 'Calcula el numerador: ' + (a * a) + ' + ' + (b * b) + ' &minus; ' + (c * c),
                resp: R.numero(a * a + b * b - c * c, { dec: 0 }),
                pista: 'Eleva los tres y opera. Puede salir negativo, y no pasa nada.',
                despues: (a * a + b * b - c * c) < 0 ? 'Salio negativo: eso ya anuncia que C es obtuso.' : '' },
              { pregunta: 'Y el denominador: 2 &times; ' + a + ' &times; ' + b,
                resp: R.numero(2 * a * b, { dec: 0 }),
                pista: 'Los dos lados que TOCAN al angulo C.', despues: '' },
              { pregunta: 'Divide para obtener cos C. (4 decimales)',
                resp: R.numero(cosC, { dec: 4, tol: 0.001 }),
                pista: (a * a + b * b - c * c) + ' &divide; ' + (2 * a * b) + '. Siempre queda entre &minus;1 y 1.',
                despues: '' },
              { pregunta: 'Deshaz el coseno con arccos (o cos&#8315;&sup1;).<br>&iquest;Cuanto mide C? (2 decimales)',
                resp: R.numero(C, { dec: 2, tol: 0.05, unidad: 'grados' }),
                pista: 'arccos(' + F.n(cosC, 4) + '), con la calculadora en grados.',
                despues: 'Ventaja del arccos frente al arcsen: no hay ambiguedad. Si sale mayor de 90&deg;, es que el coseno era negativo.' }
            ],
            final: 'C = <b>' + F.n(C, 2) + '&deg;</b>',
            receta: ['Tres lados: ley de cosenos, no de senos',
              'cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab)',
              'El lado opuesto al angulo buscado es el que resta',
              'El resultado siempre queda entre &minus;1 y 1',
              'arccos no tiene ambiguedad: el signo ya dice si es agudo u obtuso']
          });
          enun = 'Un triangulo tiene lados a = ' + a + ', b = ' + b + ' y c = ' + c + ' cm.<br>' +
            'Calcula el angulo C (el opuesto al lado c), en grados con 2 decimales.';
          resp = R.numero(C, { dec: 2, tol: 0.05, unidad: 'grados' });
          pistas = ['Despeja el coseno: cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab).',
            'cos C = (' + (a * a) + ' + ' + (b * b) + ' &minus; ' + (c * c) + ')/(2&middot;' + a + '&middot;' + b + ') = ' + F.n(cosC, 4) + '.'];
          sol = ['cos C = (a&sup2; + b&sup2; &minus; c&sup2;)/(2ab)',
            'cos C = (' + (a * a) + ' + ' + (b * b) + ' &minus; ' + (c * c) + ')/' + (2 * a * b) + ' = ' + F.n(cosC, 4),
            'C = arccos(' + F.n(cosC, 4) + ') = <b>' + F.n(C, 2) + '&deg;</b>'];
        } else {
          var lados = [a, b, c];
          var mayor = Math.max(a, b, c);
          var otros = lados.slice(); otros.splice(lados.indexOf(mayor), 1);
          var cosM = (otros[0] * otros[0] + otros[1] * otros[1] - mayor * mayor) / (2 * otros[0] * otros[1]);
          var angM = deg(Math.acos(cosM));
          guiaDelPaso = G({
            intro: 'Tres lados (<b>' + a + ', ' + b + ' y ' + c + ' cm</b>) y nos piden el angulo <b>mayor</b>.<br>' +
              'Antes de calcular nada hay que saber cual buscar. La regla es corta: ' +
              '<b>a mayor lado, mayor angulo opuesto</b>. Asi que el angulo mayor esta frente al lado mayor.',
            pasos: [
              { pregunta: '&iquest;Frente a que lado esta el angulo mayor?',
                resp: R.numero(mayor, { dec: 0 }),
                pista: 'Al lado mas largo (' + mayor + ') le toca el angulo mas grande. Es proporcional, no al azar.',
                despues: 'Entonces el angulo que buscamos se opone al lado ' + mayor + '.' },
              { pregunta: 'En la formula, el lado opuesto es el que resta.<br>Calcula ' + (otros[0] * otros[0]) + ' + ' + (otros[1] * otros[1]) + ' &minus; ' + (mayor * mayor),
                resp: R.numero(otros[0] * otros[0] + otros[1] * otros[1] - mayor * mayor, { dec: 0 }),
                pista: 'Los dos lados chicos suman sus cuadrados y el mayor resta el suyo.',
                despues: (otros[0] * otros[0] + otros[1] * otros[1] - mayor * mayor) < 0
                  ? 'Negativo: el angulo mayor pasa de 90&deg;.' : 'Positivo: el angulo mayor es agudo, asi que el triangulo es acutangulo.' },
              { pregunta: 'Divide entre 2 &middot; ' + otros[0] + ' &middot; ' + otros[1] + ' = ' + (2 * otros[0] * otros[1]) + ' para obtener el coseno. (4 decimales)',
                resp: R.numero(cosM, { dec: 4, tol: 0.001 }),
                pista: 'Division directa.', despues: '' },
              { pregunta: 'Aplica arccos. &iquest;Cuanto mide el angulo mayor? (2 decimales)',
                resp: R.numero(angM, { dec: 2, tol: 0.05, unidad: 'grados' }),
                pista: 'arccos(' + F.n(cosM, 4) + '), calculadora en grados.',
                despues: 'Comprobacion: debe ser mayor que 60&deg;, porque si los tres fueran menores no sumarian 180&deg;.' }
            ],
            final: 'El angulo mayor mide <b>' + F.n(angM, 2) + '&deg;</b>',
            receta: ['A mayor lado, mayor angulo opuesto',
              'Identificar primero el lado mayor',
              'El lado opuesto al angulo buscado es el que resta en la formula',
              'Coseno negativo = angulo obtuso',
              'El angulo mayor siempre pasa de 60&deg;']
          });
          enun = 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + ' cm.<br>' +
            'Calcula su angulo mayor (2 decimales).';
          resp = R.numero(angM, { dec: 2, tol: 0.05, unidad: 'grados' });
          pistas = ['El angulo mayor siempre se opone al lado mayor, que aqui es ' + mayor + '.',
            'cos = (' + (otros[0] * otros[0]) + ' + ' + (otros[1] * otros[1]) + ' &minus; ' + (mayor * mayor) + ')/(2&middot;' + otros[0] + '&middot;' + otros[1] + ').'];
          sol = ['El lado mayor es ' + mayor + ', asi que busco el angulo opuesto a el',
            'cos = (' + (otros[0] * otros[0]) + ' + ' + (otros[1] * otros[1]) + ' &minus; ' + (mayor * mayor) + ')/' + (2 * otros[0] * otros[1]) + ' = ' + F.n(cosM, 4),
            'Angulo = <b>' + F.n(angM, 2) + '&deg;</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['navegacion', 'Problema de navegacion'],
          ['completo', 'Resolver el triangulo completo'],
          ['heron', 'Angulo y area (Heron)'],
          ['clasifica', 'Clasificar el triangulo']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'navegacion') {
          var v1 = r.entero(20, 90), v2 = r.entero(20, 90);
          var ang = r.elige([40, 50, 60, 75, 110, 120, 135]);
          var d = Math.sqrt(v1 * v1 + v2 * v2 - 2 * v1 * v2 * Math.cos(rad(ang)));
          guiaDelPaso = G({
            intro: 'Dos barcos salen del mismo puerto: uno recorre <b>' + v1 + ' km</b>, el otro <b>' + v2 + ' km</b>, ' +
              'y el angulo entre sus rutas es de <b>' + ang + '&deg;</b>.<br>' +
              'El triangulo son las dos rutas y la linea que une a los barcos. Conocemos dos lados y el angulo ENTRE ellos: ' +
              'es el caso de la ley de cosenos.',
            pasos: [
              { pregunta: '&iquest;Por que no se puede usar Pitagoras aqui?',
                resp: R.opcion(['Porque el angulo entre las rutas no es de 90&deg;',
                  'Porque los barcos se mueven'], 0),
                pista: 'Pitagoras solo vale con angulo recto. La ley de cosenos es su version general: si pusieras 90&deg;, el coseno seria 0 y quedaria Pitagoras exacto.',
                despues: 'Por eso se dice que Pitagoras es un caso particular de la ley de cosenos.' },
              { pregunta: 'Calcula cos ' + ang + '&deg; (4 decimales)',
                resp: R.numero(Math.cos(rad(ang)), { dec: 4, tol: 0.001 }),
                pista: 'Calculadora en GRADOS.' + (ang > 90 ? ' Como pasa de 90&deg;, sale negativo.' : ''),
                despues: ang > 90 ? 'Al ser negativo, el termino &minus;2ab&middot;cos C acabara SUMANDO: los barcos quedan mas lejos.' : '' },
              { pregunta: 'Aplica d&sup2; = ' + (v1 * v1) + ' + ' + (v2 * v2) + ' &minus; 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg;.<br>&iquest;Cuanto vale d&sup2;? (2 decimales)',
                resp: R.numero(d * d, { dec: 2, tol: 0.5 }),
                pista: 'El producto 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg; vale ' + F.n(2 * v1 * v2 * Math.cos(rad(ang)), 3) + '. Restaselo a ' + (v1 * v1 + v2 * v2) + '.',
                despues: '' },
              { pregunta: 'Saca la raiz. &iquest;A que distancia estan? (2 decimales)',
                resp: R.numero(d, { dec: 2, tol: 0.05, unidad: 'km' }),
                pista: '&radic;<span class="rad">' + F.n(d * d, 2) + '</span>.',
                despues: 'Comprobacion: la distancia debe ser menor que ' + (v1 + v2) + ' km (la suma de las dos rutas).' }
            ],
            final: 'Estan a <b>' + F.n(d, 2) + ' km</b> uno del otro',
            receta: ['Dos lados y el angulo entre ellos: ley de cosenos',
              'Pitagoras es el caso particular con 90&deg;',
              'Calcular el coseno primero, con la calculadora en grados',
              'No olvidar la raiz al final',
              'Comprobar que sea menor que la suma de los otros dos lados']
          });
          enun = 'Dos barcos salen del mismo puerto al mismo tiempo. Uno recorre ' + v1 + ' km y el otro ' + v2 + ' km,<br>' +
            'y el angulo entre sus rutas es de ' + ang + '&deg;.<br>&iquest;A que distancia estan uno del otro? (2 decimales)';
          resp = R.numero(d, { dec: 2, tol: 0.05, unidad: 'km' });
          pistas = ['Las dos rutas y la distancia entre los barcos forman un triangulo con el angulo ' + ang + '&deg; entre los lados conocidos.',
            'd&sup2; = ' + (v1 * v1) + ' + ' + (v2 * v2) + ' &minus; 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg;.'];
          sol = ['d&sup2; = ' + v1 + '&sup2; + ' + v2 + '&sup2; &minus; 2(' + v1 + ')(' + v2 + ')cos ' + ang + '&deg;',
            'd&sup2; = ' + (v1 * v1 + v2 * v2) + ' &minus; ' + F.n(2 * v1 * v2 * Math.cos(rad(ang)), 3) + ' = ' + F.n(d * d, 3),
            'd = <b>' + F.n(d, 2) + ' km</b>'];
        } else if (t2 === 'completo') {
          a = r.entero(6, 18); b = r.entero(6, 18);
          C = r.elige([35, 48, 62, 75, 105, 128]);
          c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(rad(C)));
          A = deg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
          var B = 180 - A - C;
          guiaDelPaso = G({
            intro: 'Datos: a = <b>' + a + '</b>, b = <b>' + b + '</b> y el angulo entre ellos C = <b>' + C + '&deg;</b>. ' +
              'Hay que encontrar el lado c y los angulos A y B.<br>' +
              'Con dos lados y el angulo comprendido solo se puede empezar por la ley de cosenos. ' +
              'Una vez que tengamos los tres lados, lo demas sale rodado.',
            pasos: [
              { pregunta: 'Primero c, con c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; 2(' + a + ')(' + b + ')cos ' + C + '&deg;.<br>Saca la raiz. (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.02 }),
                pista: '2(' + a + ')(' + b + ')cos ' + C + '&deg; = ' + F.n(2 * a * b * Math.cos(rad(C)), 3) + '.',
                despues: 'Ya tenemos los tres lados.' },
              { pregunta: 'Para el angulo A podriamos usar senos o cosenos. &iquest;Por que conviene cosenos?',
                resp: R.opcion(['Porque el arccos distingue solo entre agudo y obtuso, sin ambiguedad',
                  'Porque la ley de senos no se puede usar aqui'], 0),
                pista: 'Con arcsen, un angulo obtuso se disfraza de agudo (tienen el mismo seno). Con arccos eso no pasa: el signo del coseno lo delata.',
                despues: 'Las dos leyes funcionan, pero cosenos evita el error.' },
              { pregunta: 'Calcula cos A = (b&sup2; + c&sup2; &minus; a&sup2;)/(2bc). (4 decimales)',
                resp: R.numero((b * b + c * c - a * a) / (2 * b * c), { dec: 4, tol: 0.002 }),
                pista: 'Ahora el que resta es a, porque A es el angulo opuesto al lado a.',
                despues: '' },
              { pregunta: 'Aplica arccos para obtener A. (2 decimales)',
                resp: R.numero(A, { dec: 2, tol: 0.05 }),
                pista: 'arccos(' + F.n((b * b + c * c - a * a) / (2 * b * c), 4) + ').',
                despues: '' },
              { pregunta: 'Y B sale gratis: B = 180&deg; &minus; ' + F.n(A, 2) + '&deg; &minus; ' + C + '&deg;. (2 decimales)',
                resp: R.numero(B, { dec: 2, tol: 0.05 }),
                pista: 'Los tres angulos suman 180&deg;. No hace falta mas trigonometria.',
                despues: 'Comprueba que el lado mayor corresponda al angulo mayor.' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
                  { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
                  { etiqueta: 'B (&deg;)', resp: R.numero(B, { dec: 2, tol: 0.05 }) }
                ]),
                pista: 'c = ' + F.n(c, 2) + ', A = ' + F.n(A, 2) + '&deg; y B = ' + F.n(B, 2) + '&deg;.',
                despues: '' }
            ],
            final: 'c = <b>' + F.n(c, 2) + '</b>, A = <b>' + F.n(A, 2) + '&deg;</b> y B = <b>' + F.n(B, 2) + '&deg;</b>',
            receta: ['Dos lados y el angulo entre ellos: empezar por la ley de cosenos',
              'Con los tres lados, sacar un angulo tambien con cosenos (sin ambiguedad)',
              'El ultimo angulo, con la suma 180&deg;',
              'Comprobar: a mayor lado, mayor angulo opuesto']
          });
          enun = 'En un triangulo a = ' + a + ', b = ' + b + ' y C = ' + C + '&deg;.<br>' +
            'Encuentra el lado c y los angulos A y B (2 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'B (&deg;)', resp: R.numero(B, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['Primero c con la ley de cosenos; despues A con la ley de cosenos o de senos.',
            'c = ' + F.n(c, 2) + '. Ahora cos A = (b&sup2; + c&sup2; &minus; a&sup2;)/(2bc).'];
          sol = ['c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' &minus; ' + F.n(2 * a * b * Math.cos(rad(C)), 3) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'cos A = (b&sup2; + c&sup2; &minus; a&sup2;)/(2bc) &rArr; A = <b>' + F.n(A, 2) + '&deg;</b>',
            'B = 180&deg; &minus; A &minus; C = <b>' + F.n(B, 2) + '&deg;</b>'];
        } else {
          a = r.entero(6, 20); b = r.entero(6, 20);
          var c2 = r.entero(Math.max(3, Math.abs(a - b) + 2), a + b - 2);
          c = c2;
          var s = (a + b + c) / 2;
          var area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          var cosA = (b * b + c * c - a * a) / (2 * b * c);
          A = deg(Math.acos(cosA));
          guiaDelPaso = G({
            intro: 'Un terreno de <b>' + a + ', ' + b + ' y ' + c + ' metros</b> por lado. Piden el angulo A (frente al lado de ' + a + ' m) y el area.<br>' +
              'Con solo los tres lados, el angulo sale con la ley de cosenos y el area con la <b>formula de Heron</b>, ' +
              'que calcula el area sin necesidad de conocer ninguna altura ni ningun angulo.',
            pasos: [
              { pregunta: 'Calcula cos A = (' + (b * b) + ' + ' + (c * c) + ' &minus; ' + (a * a) + ') &divide; ' + (2 * b * c) + ' (4 decimales)',
                resp: R.numero(cosA, { dec: 4, tol: 0.001 }),
                pista: 'El lado que resta es a, porque A es el angulo opuesto a el.',
                despues: cosA < 0 ? 'Coseno negativo: A es obtuso.' : 'Coseno positivo: A es agudo.' },
              { pregunta: 'Aplica arccos. &iquest;Cuanto mide A? (2 decimales)',
                resp: R.numero(A, { dec: 2, tol: 0.05 }),
                pista: 'arccos(' + F.n(cosA, 4) + '), con la calculadora en grados.',
                despues: '' },
              { pregunta: 'Ahora el area. Heron empieza por el semiperimetro: s = (' + a + ' + ' + b + ' + ' + c + ') &divide; 2 (2 decimales)',
                resp: R.numero(s, { dec: 2, tol: 0.01 }),
                pista: 'Suma los tres lados y divide entre 2. "Semi" es la mitad.',
                despues: 's = ' + F.n(s, 2) + '.' },
              { pregunta: 'Area = &radic;<span class="rad">s(s&minus;a)(s&minus;b)(s&minus;c)</span>.<br>Calculala. (2 decimales)',
                resp: R.numero(area, { dec: 2, tol: 0.1, unidad: 'm&sup2;' }),
                pista: 's&minus;a = ' + F.n(s - a, 2) + ', s&minus;b = ' + F.n(s - b, 2) + ', s&minus;c = ' + F.n(s - c, 2) + '. ' +
                  'Multiplica los cuatro y saca la raiz.',
                despues: 'Tambien sale con &frac12; &middot; b &middot; c &middot; sen A, y debe dar lo mismo.' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
                  { etiqueta: 'Area (m&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.1 }) }
                ]),
                pista: 'A = ' + F.n(A, 2) + '&deg; y area = ' + F.n(area, 2) + ' m&sup2;.',
                despues: '' }
            ],
            final: 'A = <b>' + F.n(A, 2) + '&deg;</b> y el area es <b>' + F.n(area, 2) + ' m&sup2;</b>',
            receta: ['Tres lados: angulo con la ley de cosenos',
              'Area con Heron, sin necesitar altura ni angulos',
              's es el SEMIperimetro: la mitad de la suma',
              'Area = &radic;<span class="rad">s(s&minus;a)(s&minus;b)(s&minus;c)</span>',
              'Se puede comprobar con &frac12; b c sen A']
          });
          enun = 'Un terreno triangular mide ' + a + ', ' + b + ' y ' + c + ' metros por lado.<br>' +
            'Calcula el angulo A (opuesto al lado de ' + a + ' m) y el area del terreno (2 decimales).';
          resp = R.varios([
            { etiqueta: 'A (&deg;)', resp: R.numero(A, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'Area (m&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.1 }) }
          ]);
          pistas = ['Para el angulo usa la ley de cosenos; para el area puedes usar Heron o &frac12;bc&middot;sen A.',
            'Semiperimetro s = ' + F.n(s, 2) + '.'];
          sol = ['cos A = (' + (b * b) + ' + ' + (c * c) + ' &minus; ' + (a * a) + ')/' + (2 * b * c) + ' = ' + F.n(cosA, 4),
            'A = <b>' + F.n(A, 2) + '&deg;</b>',
            'Heron: s = ' + F.n(s, 2) + ', Area = &radic;<span class="rad">s(s&minus;a)(s&minus;b)(s&minus;c)</span>',
            'Area = <b>' + F.n(area, 2) + ' m&sup2;</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
