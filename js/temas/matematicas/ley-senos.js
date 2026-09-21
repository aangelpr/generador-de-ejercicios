/* Ley de senos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }

  function figura(A, B, C, a, b, c) {
    return F.svg(260, 150,
      '<path d="M30 125 L230 125 L95 25 Z"/>' +
      F.txtSvg(20, 138, A) + F.txtSvg(228, 138, B) + F.txtSvg(90, 18, C) +
      F.txtSvg(125, 142, c) + F.txtSvg(50, 70, b) + F.txtSvg(175, 70, a));
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.tercerAngulo = function (r) {
    var A = r.entero(20, 100), B = r.entero(20, 150 - A);
    var C = 180 - A - B;
    var a = r.entero(5, 20);
    var c = a * Math.sin(rad(C)) / Math.sin(rad(A));
    return {
      guia: G({
        intro: 'Tenemos A = <b>' + A + '&deg;</b>, B = <b>' + B + '&deg;</b> y el lado a = <b>' + a + ' cm</b>; piden C y c.<br>' +
          'La ley de senos dice que <b>a/sen A = b/sen B = c/sen C</b>: cada lado dividido entre el seno de SU angulo opuesto ' +
          'da siempre el mismo numero. Para usarla hace falta una pareja completa (un lado con su angulo), y aqui la tenemos: a y A.',
        pasos: [
          { seccion: 'Paso 1: el angulo que falta',
            queHacemos: 'Recordamos cuanto suman los angulos de un triangulo.',
            paraQue: 'El tercer angulo sale gratis, sin calculadora. Siempre se empieza por lo mas barato.',
            queda: 'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg;',
            pregunta: 'Empecemos por el angulo que falta. &iquest;Cuanto suman los tres angulos de cualquier triangulo?',
            resp: R.numero(180, { dec: 0 }),
            pista: 'Siempre 180&deg;, sea el triangulo que sea.',
            despues: 'Con eso sale C sin necesidad de trigonometria.' },
          { seccion: 'Paso 1: el angulo que falta',
            queHacemos: 'Restamos los dos angulos conocidos.',
            paraQue: 'Con esto ya tenemos los tres angulos del triangulo.',
            queda: 'C = ' + C + '&deg;',
            pregunta: 'Calcula C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg;',
            resp: R.numero(C, { dec: 2, tol: 0.05 }),
            pista: 'Resta directa.',
            despues: 'C = ' + C + '&deg;.' },
          { seccion: 'Paso 2: elegir la pareja',
            queHacemos: 'Buscamos el unico lado del que tambien conocemos su angulo opuesto.',
            paraQue: 'La ley de senos no arranca sin una pareja lado-angulo completa. De b no sabemos nada.',
            queda: 'C = ' + C + '&deg;;  c &divide; sen C = ' + a + ' &divide; sen ' + A + '&deg;',
            pregunta: 'Para hallar c hay que usar la pareja completa que conocemos.<br>&iquest;Cual es?',
            resp: R.opcion(['a con A, porque es el unico lado que conocemos junto a su angulo opuesto',
              'b con B'], 0),
            pista: 'De b no sabemos nada, asi que esa pareja no sirve como punto de partida.',
            despues: 'La proporcion es ' + F.frac('c', 'sen C') + ' = ' + F.frac('a', 'sen A') + '.' },
          { seccion: 'Paso 3: el seno',
            queHacemos: 'Sacamos el seno del angulo nuevo.',
            paraQue: 'Calculadora en GRADOS, no en radianes.',
            queda: 'C = ' + C + '&deg;;  sen C = ' + F.n(Math.sin(rad(C)), 4),
            pregunta: 'Calcula sen ' + C + '&deg; (4 decimales)',
            resp: R.numero(Math.sin(rad(C)), { dec: 4, tol: 0.001 }),
            pista: 'Con la calculadora en GRADOS, no en radianes. Es el error numero uno de todo el tema.',
            despues: '' },
          { seccion: 'Paso 4: despejar c',
            queHacemos: 'Multiplicamos el lado conocido por el seno de arriba y dividimos.',
            paraQue: 'Comprobacion util: al angulo mas grande le toca el lado mas grande.',
            queda: 'C = ' + C + '&deg;,  c = ' + F.n(c, 2) + ' cm',
            pregunta: 'Despeja: c = ' + a + ' &middot; sen ' + C + '&deg; &divide; sen ' + A + '&deg; (2 decimales)',
            resp: R.numero(c, { dec: 2, tol: 0.02 }),
            pista: a + ' &times; ' + F.n(Math.sin(rad(C)), 4) + ' &divide; ' + F.n(Math.sin(rad(A)), 4) + '.',
            despues: 'Comprobacion util: al angulo mas grande le toca el lado mas grande.' },
          { seccion: 'Paso 5: escribir',
            queHacemos: 'Damos las dos respuestas.',
            paraQue: 'Para cerrar el ejercicio.',
            queda: 'C = ' + C + '&deg;,  c = ' + F.n(c, 2) + ' cm',
            pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
              { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) }
            ]),
            pista: 'C = ' + C + '&deg; y c = ' + F.n(c, 2) + ' cm.',
            despues: '' }
        ],
        final: 'C = <b>' + C + '&deg;</b> y c = <b>' + F.n(c, 2) + ' cm</b>',
        receta: ['Los angulos suman 180&deg;: de ahi sale el que falta',
          'La ley de senos necesita una pareja lado-angulo completa',
          'Cada lado va con el seno de su angulo OPUESTO',
          'La calculadora en grados',
          'A mayor angulo, mayor lado opuesto']
      }),
      enunciado: 'En un triangulo A = ' + A + '&deg; y B = ' + B + '&deg;, con el lado a = ' + a + ' cm.<br>' +
        'Calcula el angulo C y el lado c (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
        { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) }
      ]),
      pistas: ['Los tres angulos de un triangulo suman 180&deg;.',
        'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = ' + C + '&deg;. Despues usa c = a&middot;sen C / sen A.'],
      solucion: ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
        'c = a &middot; sen C / sen A = ' + a + ' &middot; ' + F.n(Math.sin(rad(C)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
        'c = <b>' + F.n(c, 2) + ' cm</b>']
    };
  };

  extra.area = function (r) {
    var a = r.entero(5, 20), b = r.entero(5, 20);
    var C = r.elige([25, 35, 42, 55, 68, 75, 100, 115, 130]);
    var area = 0.5 * a * b * Math.sin(rad(C));
    return {
      guia: G({
        intro: 'Dos lados (<b>' + a + '</b> y <b>' + b + ' cm</b>) con un angulo de <b>' + C + '&deg;</b> entre ellos, y piden el area.<br>' +
          'La formula de siempre, base &times; altura / 2, no sirve porque no nos dan la altura. ' +
          'Pero cuando conoces dos lados y el angulo que forman hay otra: <b>Area = &frac12; a b sen C</b>.',
        pasos: [
          { seccion: 'Paso 1: elegir la formula',
            queHacemos: 'Miramos que datos tenemos y elegimos la formula que encaja.',
            paraQue: 'No hay altura, pero si dos lados y el angulo entre ellos. De hecho b &middot; sen C ES la altura: la formula ya la trae dentro.',
            queda: 'Area = &frac12; &middot; ' + a + ' &middot; ' + b + ' &middot; sen ' + C + '&deg;',
            pregunta: '&iquest;Por que no se usa base &times; altura / 2?',
            resp: R.opcion(['Porque no nos dan la altura, pero si el angulo entre los dos lados',
              'Porque el triangulo no tiene altura'], 0),
            pista: 'Fijate en lo que SI te dan: dos lados y el angulo que hay entre ellos. Esa combinacion tiene su propia formula.',
            despues: 'De hecho b &middot; sen C ES la altura sobre el lado a; la formula ya la trae dentro.' },
          { seccion: 'Paso 2: el seno',
            queHacemos: 'Sacamos el seno del angulo.',
            paraQue: 'El seno es positivo tambien para angulos obtusos, asi que el area nunca sale negativa.',
            queda: 'Area = &frac12; &middot; ' + a + ' &middot; ' + b + ' &middot; ' + F.n(Math.sin(rad(C)), 4),
            pregunta: 'Calcula sen ' + C + '&deg; (4 decimales)',
            resp: R.numero(Math.sin(rad(C)), { dec: 4, tol: 0.001 }),
            pista: 'Calculadora en GRADOS.' + (C > 90 ? ' Aunque el angulo sea obtuso, su seno es positivo.' : ''),
            despues: '' },
          { seccion: 'Paso 3: la cuenta',
            queHacemos: 'Multiplicamos todo y dividimos entre 2.',
            paraQue: 'El angulo tiene que ser el que esta ENTRE los dos lados; con otro, la formula no vale.',
            queda: 'Area = ' + F.n(area, 2) + ' cm&sup2;',
            pregunta: 'Area = &frac12; &times; ' + a + ' &times; ' + b + ' &times; ' + F.n(Math.sin(rad(C)), 4) + ' (2 decimales)',
            resp: R.numero(area, { dec: 2, tol: 0.05, unidad: 'cm&sup2;' }),
            pista: 'Multiplica todo y divide entre 2 al final.',
            despues: 'El angulo tiene que ser el que esta ENTRE los dos lados; si fuera otro, la formula no vale.' }
        ],
        final: 'El area es <b>' + F.n(area, 2) + ' cm&sup2;</b>',
        receta: ['Dos lados y el angulo entre ellos: Area = &frac12; a b sen C',
          'El angulo debe ir ENTRE los dos lados',
          'Calculadora en grados',
          'El seno es positivo tambien para angulos obtusos']
      }),
      enunciado: 'Un triangulo tiene lados a = ' + a + ' cm y b = ' + b + ' cm con un angulo de ' + C + '&deg; entre ellos.<br>' +
        'Calcula su area (2 decimales).',
      respuesta: R.numero(area, { dec: 2, tol: 0.05, unidad: 'cm&sup2;' }),
      pistas: ['Cuando conoces dos lados y el angulo ENTRE ellos: Area = &frac12; a b sen C.',
        'sen ' + C + '&deg; = ' + F.n(Math.sin(rad(C)), 4) + '.'],
      solucion: ['Area = &frac12; &middot; a &middot; b &middot; sen C',
        'Area = &frac12; &middot; ' + a + ' &middot; ' + b + ' &middot; ' + F.n(Math.sin(rad(C)), 4),
        'Area = <b>' + F.n(area, 2) + ' cm&sup2;</b>']
    };
  };

  extra.casoAmbiguo = function (r) {
    var A = r.elige([25, 30, 35, 40]);
    var b = r.entero(10, 20);
    /* para que haya dos soluciones: b sen A < a < b */
    var minimo = b * Math.sin(rad(A));
    var a = F.redondea(minimo + (b - minimo) * r.real(0.25, 0.75), 2);
    var B1 = deg(Math.asin(b * Math.sin(rad(A)) / a));
    var B2 = 180 - B1;
    return {
      guia: G({
        intro: 'Tenemos a = <b>' + a + '</b>, b = <b>' + b + '</b> y A = <b>' + A + '&deg;</b>.<br>' +
          'Ojo con este: se conocen dos LADOS y un angulo que NO esta entre ellos (caso LLA). ' +
          'Con esos datos puede haber <b>dos triangulos distintos</b> que cumplan todo, y los dos son validos. ' +
          'Por eso se llama el caso ambiguo.',
        pasos: [
          { seccion: 'Paso 1: despejar el seno',
            queHacemos: 'Despejamos sen B con la ley de senos.',
            paraQue: 'Caso LLA: dos lados y un angulo que NO esta entre ellos. Puede haber DOS triangulos validos.',
            queda: 'sen B = ' + F.n(b * Math.sin(rad(A)) / a, 4),
            pregunta: 'De ' + F.frac('a', 'sen A') + ' = ' + F.frac('b', 'sen B') + ' se despeja sen B = b &middot; sen A &divide; a.<br>Calculalo (4 decimales)',
            resp: R.numero(b * Math.sin(rad(A)) / a, { dec: 4, tol: 0.001 }),
            pista: b + ' &times; sen ' + A + '&deg; &divide; ' + a + '. Calculadora en grados.',
            despues: 'sen B = ' + F.n(b * Math.sin(rad(A)) / a, 4) + '. Y aqui viene lo interesante.' },
          { seccion: 'Paso 2: la primera solucion',
            queHacemos: 'Aplicamos arcsen para el angulo agudo.',
            paraQue: 'La calculadora solo devuelve uno de los dos posibles. Hay que saber que se queda callada sobre el otro.',
            queda: 'B = ' + F.n(B1, 2) + '&deg;  (falta la otra)',
            pregunta: 'La calculadora, al hacer arcsen, siempre devuelve el angulo agudo.<br>&iquest;Cual es? (2 decimales)',
            resp: R.numero(F.redondea(B1, 2), { dec: 2, tol: 0.1 }),
            pista: 'arcsen(' + F.n(b * Math.sin(rad(A)) / a, 4) + ').',
            despues: 'Esa es la primera solucion: B = ' + F.n(B1, 2) + '&deg;.' },
          { seccion: 'Paso 3: por que hay otra',
            queHacemos: 'Vemos por que el obtuso tambien encaja.',
            paraQue: 'sen(180&deg; &minus; x) = sen x: el agudo y su suplementario tienen el MISMO seno.',
            queda: 'B = ' + F.n(B1, 2) + '&deg;  o  180&deg; &minus; ' + F.n(B1, 2) + '&deg;',
            pregunta: '&iquest;Por que hay una segunda solucion?',
            resp: R.opcion(['Porque sen(180&deg; &minus; x) = sen x: el angulo obtuso tiene el mismo seno',
              'Porque el seno tambien puede ser negativo'], 0),
            pista: 'Dos angulos distintos pueden compartir el mismo seno: uno agudo y su suplementario. La calculadora solo te ensena uno.',
            despues: 'Por eso hay que buscar el otro a mano.' },
          { seccion: 'Paso 4: la segunda solucion',
            queHacemos: 'Restamos a 180&deg; para tener el obtuso.',
            paraQue: 'Vale porque al sumarlo con A todavia queda por debajo de 180&deg;: cabe un triangulo.',
            queda: 'B = ' + F.n(B1, 2) + '&deg;  o  ' + F.n(B2, 2) + '&deg;',
            pregunta: 'Calcula el obtuso: 180&deg; &minus; ' + F.n(B1, 2) + '&deg; (2 decimales)',
            resp: R.numero(F.redondea(B2, 2), { dec: 2, tol: 0.1 }),
            pista: 'Resta directa.',
            despues: 'Las dos sirven porque ' + A + '&deg; + ' + F.n(B2, 2) + '&deg; todavia es menor que 180&deg;: cabe un triangulo.' },
          { seccion: 'Paso 5: escribir',
            queHacemos: 'Damos las dos soluciones.',
            paraQue: 'Las dos son correctas; dar solo una es respuesta incompleta.',
            queda: 'B = ' + F.n(B1, 2) + '&deg;  o  ' + F.n(B2, 2) + '&deg;',
            pregunta: 'Escribe los dos valores de B separados por coma.',
            resp: R.lista([F.redondea(B1, 2), F.redondea(B2, 2)], {
              tol: 0.1, ayuda: 'Escribe los dos angulos separados por coma.' }),
            pista: F.n(B1, 2) + ' y ' + F.n(B2, 2) + '.',
            despues: '' }
        ],
        final: 'B puede ser <b>' + F.n(B1, 2) + '&deg;</b> o <b>' + F.n(B2, 2) + '&deg;</b>',
        receta: ['Caso LLA: dos lados y un angulo NO comprendido',
          'Despejar sen B con la ley de senos',
          'La calculadora da solo el agudo',
          'El otro es 180&deg; menos ese',
          'Vale si al sumarlo con A sigue por debajo de 180&deg;']
      }),
      enunciado: 'En un triangulo a = ' + a + ', b = ' + b + ' y A = ' + A + '&deg;.<br>' +
        'Este es el caso ambiguo (LLA): encuentra los DOS valores posibles del angulo B (2 decimales).',
      respuesta: R.lista([F.redondea(B1, 2), F.redondea(B2, 2)], {
        tol: 0.1, ayuda: 'Escribe los dos angulos separados por coma.'
      }),
      pistas: ['sen B = b &middot; sen A / a. La calculadora te da el angulo agudo, pero el obtuso tiene el mismo seno.',
        'sen B = ' + F.n(b * Math.sin(rad(A)) / a, 4) + ' &rArr; B = arcsen(&hellip;) y tambien 180&deg; &minus; ese valor.'],
      solucion: ['sen B = ' + b + ' &middot; sen ' + A + '&deg; / ' + a + ' = ' + F.n(b * Math.sin(rad(A)) / a, 4),
        'Primera solucion (agudo): B = <b>' + F.n(B1, 2) + '&deg;</b>',
        'Segunda solucion (obtuso): B = 180&deg; &minus; ' + F.n(B1, 2) + '&deg; = <b>' + F.n(B2, 2) + '&deg;</b>',
        'Las dos sirven porque A + B sigue siendo menor que 180&deg;']
    };
  };

  EJ.tema({
    id: 'ley-senos',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Ley de senos',
    descripcion: 'Resolver triangulos oblicuangulos cuando se conocen angulos y un lado opuesto.',
    formulario: 'a / sen A = b / sen B = c / sen C<br>' +
      'Se usa cuando conoces: dos angulos y un lado (AAL/ALA), o dos lados y un angulo opuesto (LLA).<br>' +
      'Recuerda que A + B + C = 180&deg;.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, A, B, C, a, b, c;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['ladoOpuesto', 'Calcular un lado'],
          ['tercerAngulo', 'Tercer angulo y su lado']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        A = r.entero(30, 80); B = r.entero(30, 180 - A - 25);
        C = 180 - A - B;
        a = r.entero(5, 30);
        b = a * Math.sin(rad(B)) / Math.sin(rad(A));
        guiaDelPaso = EJ.guia.leySenosLado(A, B, a);
        enun = 'En un triangulo A = ' + A + '&deg;, B = ' + B + '&deg; y el lado a = ' + a + ' cm.<br>' +
          'Calcula el lado b (2 decimales).' + figura('A=' + A + '&deg;', 'B=' + B + '&deg;', '', 'a=' + a, 'b=?', '');
        resp = R.numero(b, { dec: 2, tol: 0.01, unidad: 'cm' });
        pistas = ['Usa a/sen A = b/sen B y despeja b.',
          'b = a &middot; sen B / sen A = ' + a + ' &middot; sen ' + B + '&deg; / sen ' + A + '&deg;.'];
        sol = ['a / sen A = b / sen B',
          'b = ' + a + ' &middot; sen ' + B + '&deg; / sen ' + A + '&deg;',
          'b = ' + a + ' &middot; ' + F.n(Math.sin(rad(B)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
          'b = <b>' + F.n(b, 2) + ' cm</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['angulo', 'Calcular un angulo'],
          ['tercerLado', 'Tercer angulo y lado'],
          ['area', 'Area con dos lados y su angulo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'angulo') {
          A = r.entero(35, 75);
          B = r.entero(25, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(8, 25);
          b = a * Math.sin(rad(B)) / Math.sin(rad(A));
          guiaDelPaso = G({
            intro: 'Conocemos dos lados (a = <b>' + a + '</b>, b = <b>' + F.n(b, 2) + '</b>) y el angulo A = <b>' + A + '&deg;</b>, ' +
              'y buscamos el angulo B.<br>' +
              'Es la ley de senos otra vez, pero ahora la incognita esta dentro de un seno. ' +
              'Asi que primero se despeja <b>sen B</b> y despues se deshace con arcsen.',
            pasos: [
              { seccion: 'Paso 1: el seno conocido',
                queHacemos: 'Sacamos el seno del angulo que si conocemos.',
                paraQue: 'Calculadora en GRADOS. Es la pieza que hace falta para despejar el otro seno.',
                queda: 'sen B = ' + F.n(b, 2) + ' &middot; ' + F.n(Math.sin(rad(A)), 4) + ' &divide; ' + a,
                pregunta: 'Calcula sen ' + A + '&deg; (4 decimales)',
                resp: R.numero(Math.sin(rad(A)), { dec: 4, tol: 0.001 }),
                pista: 'Calculadora en GRADOS.',
                despues: '' },
              { seccion: 'Paso 2: despejar sen B',
                queHacemos: 'Despejamos el seno del angulo que buscamos.',
                paraQue: 'Esto TODAVIA no es el angulo: es su seno. Pararse aqui es el error tipico.',
                queda: 'sen B = ' + F.n(Math.sin(rad(B)), 4),
                pregunta: 'De ' + F.frac('a', 'sen A') + ' = ' + F.frac('b', 'sen B') + ' sale sen B = b &middot; sen A &divide; a.<br>' +
                  'Calcula ' + F.n(b, 2) + ' &times; ' + F.n(Math.sin(rad(A)), 4) + ' &divide; ' + a + ' (4 decimales)',
                resp: R.numero(Math.sin(rad(B)), { dec: 4, tol: 0.002 }),
                pista: 'Multiplica primero y divide despues.',
                despues: 'Esto todavia no es el angulo: es su seno.' },
              { seccion: 'Paso 3: deshacer el seno',
                queHacemos: 'Aplicamos arcsen para llegar al angulo.',
                paraQue: 'En el caso LLA tambien podria valer el obtuso; aqui piden el agudo.',
                queda: 'B = ' + F.n(B, 2) + '&deg;',
                pregunta: 'Ahora deshaz el seno con arcsen (o sen&#8315;&sup1;).<br>&iquest;Cuanto mide B? (2 decimales)',
                resp: R.numero(B, { dec: 2, tol: 0.25, unidad: 'grados' }),
                pista: 'arcsen(' + F.n(Math.sin(rad(B)), 4) + '). Asegurate de que la calculadora este en grados.',
                despues: 'Nota: en el caso LLA tambien podria valer el obtuso ' + F.n(180 - B, 2) + '&deg;; aqui nos piden el agudo.' }
            ],
            final: 'B = <b>' + F.n(B, 2) + '&deg;</b>',
            receta: ['Ley de senos igual que siempre',
              'Si la incognita es un angulo, primero se despeja su SENO',
              'Despues arcsen para llegar al angulo',
              'Calculadora en grados',
              'Ojo con la posible segunda solucion obtusa']
          });
          enun = 'En un triangulo a = ' + a + ' cm, b = ' + F.n(b, 2) + ' cm y A = ' + A + '&deg;.<br>' +
            'Calcula el angulo B (2 decimales, toma el angulo agudo).';
          /* el lado b se da redondeado a 2 decimales, asi que el angulo que
             calcule el alumno puede desviarse un poco: tolerancia mas amplia */
          resp = R.numero(B, { dec: 2, tol: 0.25, unidad: 'grados' });
          pistas = ['De a/sen A = b/sen B despeja sen B = b &middot; sen A / a.',
            'sen B = ' + F.n(b, 2) + ' &middot; sen ' + A + '&deg; / ' + a + ' = ' + F.n(Math.sin(rad(B)), 4) + '. Ahora usa arcsen.'];
          sol = ['sen B = b &middot; sen A / a',
            'sen B = ' + F.n(b, 2) + ' &middot; ' + F.n(Math.sin(rad(A)), 4) + ' / ' + a + ' = ' + F.n(Math.sin(rad(B)), 4),
            'B = arcsen(' + F.n(Math.sin(rad(B)), 4) + ') = <b>' + F.n(B, 2) + '&deg;</b>',
            'Nota: el caso LLA puede tener una segunda solucion obtusa (' + F.n(180 - B, 2) + '&deg;) si el triangulo lo permite.'];
        } else {
          A = r.entero(30, 70); B = r.entero(30, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(6, 24);
          c = a * Math.sin(rad(C)) / Math.sin(rad(A));
          guiaDelPaso = G({
            intro: 'Datos: A = <b>' + A + '&deg;</b>, B = <b>' + B + '&deg;</b> y a = <b>' + a + ' cm</b>. Piden C y c.<br>' +
              'Un truco practico de la ley de senos: la razon <b>lado &divide; seno de su angulo opuesto</b> vale lo mismo para los tres. ' +
              'Si calculas esa razon una vez, todos los demas lados salen con una multiplicacion.',
            pasos: [
              { seccion: 'Paso 1: el tercer angulo',
                queHacemos: 'Sacamos el angulo que falta con la suma 180&deg;.',
                paraQue: 'Sale gratis, sin calculadora.',
                queda: 'C = ' + C + '&deg;',
                pregunta: 'Primero el angulo que falta: C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg;',
                resp: R.numero(C, { dec: 2, tol: 0.05 }),
                pista: 'Los tres angulos suman 180&deg;.',
                despues: 'C = ' + C + '&deg;.' },
              { seccion: 'Paso 2: la pareja que arranca todo',
                queHacemos: 'Identificamos la unica razon lado/seno calculable.',
                paraQue: 'De b y c no sabemos nada todavia. Sin una pareja completa la ley de senos no arranca.',
                queda: 'C = ' + C + '&deg;;  razon = ' + a + ' &divide; sen ' + A + '&deg;',
                pregunta: '&iquest;Por que la pareja (a, A) es la clave del problema?',
                resp: R.opcion(['Porque es la unica razon lado/seno que se puede calcular con los datos',
                  'Porque a es siempre el lado mayor'], 0),
                pista: 'De b y c no sabemos nada todavia; sin una pareja completa la ley de senos no arranca.',
                despues: '' },
              { seccion: 'Paso 3: calcular la razon',
                queHacemos: 'Dividimos el lado entre el seno de su angulo opuesto.',
                paraQue: 'Ese numero es el MISMO para los tres lados. Calculado una vez, los demas lados salen con una multiplicacion.',
                queda: 'C = ' + C + '&deg;;  razon = ' + F.n(a / Math.sin(rad(A)), 4),
                pregunta: 'Calcula esa razon: ' + a + ' &divide; sen ' + A + '&deg; (4 decimales)',
                resp: R.numero(a / Math.sin(rad(A)), { dec: 4, tol: 0.01 }),
                pista: a + ' &divide; ' + F.n(Math.sin(rad(A)), 4) + '. Calculadora en grados.',
                despues: 'Ese numero es el mismo para los tres lados del triangulo.' },
              { seccion: 'Paso 4: obtener c',
                queHacemos: 'Multiplicamos la razon por el seno del angulo opuesto a c.',
                paraQue: 'Cada lado = razon &times; seno de SU angulo opuesto.',
                queda: 'C = ' + C + '&deg;,  c = ' + F.n(c, 2) + ' cm',
                pregunta: 'Multiplica esa razon por sen ' + C + '&deg; para obtener c. (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.01 }),
                pista: F.n(a / Math.sin(rad(A)), 4) + ' &times; ' + F.n(Math.sin(rad(C)), 4) + '.',
                despues: '' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos las dos respuestas.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'C = ' + C + '&deg;,  c = ' + F.n(c, 2) + ' cm',
                pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'C (grados)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
                  { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'C = ' + C + '&deg; y c = ' + F.n(c, 2) + ' cm.',
                despues: '' }
            ],
            final: 'C = <b>' + C + '&deg;</b> y c = <b>' + F.n(c, 2) + ' cm</b>',
            receta: ['Sacar el tercer angulo con la suma 180&deg;',
              'Calcular la razon lado/sen una sola vez',
              'Esa razon sirve para todos los lados',
              'Cada lado = razon &times; seno de su angulo opuesto']
          });
          enun = 'En un triangulo A = ' + A + '&deg;, B = ' + B + '&deg; y a = ' + a + ' cm.<br>' +
            'Calcula el angulo C y el lado c (2 decimales).';
          resp = R.varios([
            { etiqueta: 'C (grados)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Los angulos de un triangulo suman 180&deg;: de ahi sale C.',
            'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = ' + C + '&deg;. Luego c = a &middot; sen C / sen A.'];
          sol = ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
            'c = a &middot; sen C / sen A = ' + a + ' &middot; ' + F.n(Math.sin(rad(C)), 4) + ' / ' + F.n(Math.sin(rad(A)), 4),
            'c = <b>' + F.n(c, 2) + ' cm</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['resolver', 'Resolver el triangulo completo'],
          ['aplicacion', 'Problema aplicado'],
          ['casoAmbiguo', 'Caso ambiguo (LLA)']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'resolver') {
          A = r.entero(28, 70); B = r.entero(28, 180 - A - 30);
          C = 180 - A - B;
          a = r.entero(7, 22);
          b = a * Math.sin(rad(B)) / Math.sin(rad(A));
          c = a * Math.sin(rad(C)) / Math.sin(rad(A));
          var area = 0.5 * a * b * Math.sin(rad(C));
          guiaDelPaso = G({
            intro: '"Resolver el triangulo" significa encontrar <b>todo</b> lo que falta: los tres angulos y los tres lados.<br>' +
              'Tenemos A = <b>' + A + '&deg;</b>, B = <b>' + B + '&deg;</b> y a = <b>' + a + ' cm</b>. ' +
              'El orden importa: se empieza por lo que sale gratis y se deja el area para el final.',
            pasos: [
              { seccion: 'Paso 1: ordenar el trabajo',
                queHacemos: 'Decidimos por donde empezar.',
                paraQue: 'Siempre lo mas barato primero. El tercer angulo no necesita ni calculadora.',
                queda: 'faltan C, b, c y el area',
                pregunta: '&iquest;Que conviene calcular primero?',
                resp: R.opcion(['El tercer angulo, porque sale solo con la suma 180&deg;',
                  'El area, para tener una referencia'], 0),
                pista: 'Siempre lo mas barato primero. El tercer angulo no necesita ni calculadora.',
                despues: '' },
              { seccion: 'Paso 2: el tercer angulo',
                queHacemos: 'Restamos para hallar C.',
                paraQue: 'Con esto ya estan los tres angulos.',
                queda: 'C = ' + C + '&deg;;  faltan b, c y el area',
                pregunta: 'C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg;',
                resp: R.numero(C, { dec: 2, tol: 0.05 }),
                pista: 'Resta directa.',
                despues: 'Ya tenemos los tres angulos.' },
              { seccion: 'Paso 3: el lado b',
                queHacemos: 'Ley de senos con la pareja original.',
                paraQue: 'Se usa SIEMPRE la pareja original (a, A) para no arrastrar errores de redondeo.',
                queda: 'C = ' + C + '&deg;,  b = ' + F.n(b, 2) + ';  faltan c y el area',
                pregunta: 'Ahora b = ' + a + ' &middot; sen ' + B + '&deg; &divide; sen ' + A + '&deg; (2 decimales)',
                resp: R.numero(b, { dec: 2, tol: 0.02 }),
                pista: a + ' &times; ' + F.n(Math.sin(rad(B)), 4) + ' &divide; ' + F.n(Math.sin(rad(A)), 4) + '.',
                despues: '' },
              { seccion: 'Paso 4: el lado c',
                queHacemos: 'La misma cuenta con el otro seno.',
                paraQue: 'Comprobacion: el lado mayor debe corresponder al angulo mayor.',
                queda: 'C = ' + C + '&deg;,  b = ' + F.n(b, 2) + ',  c = ' + F.n(c, 2) + ';  falta el area',
                pregunta: 'Y c = ' + a + ' &middot; sen ' + C + '&deg; &divide; sen ' + A + '&deg; (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.02 }),
                pista: 'Misma cuenta con el otro seno.',
                despues: 'Comprueba: el lado mayor debe corresponder al angulo mayor.' },
              { seccion: 'Paso 5: el area',
                queHacemos: 'Aplicamos &frac12; a b sen C.',
                paraQue: 'C es justo el angulo que queda ENTRE a y b. Con otro angulo la formula no valdria.',
                queda: 'C = ' + C + '&deg;,  b = ' + F.n(b, 2) + ',  c = ' + F.n(c, 2) + ',  area = ' + F.n(area, 2),
                pregunta: 'Para el area usamos dos lados y el angulo entre ellos: &frac12; &middot; a &middot; b &middot; sen C. (2 decimales)',
                resp: R.numero(area, { dec: 2, tol: 0.05 }),
                pista: '&frac12; &times; ' + a + ' &times; ' + F.n(b, 2) + ' &times; ' + F.n(Math.sin(rad(C)), 4) + '. ' +
                  'Fijate que C es justo el angulo que queda entre a y b.',
                despues: '' },
              { seccion: 'Paso 6: escribir',
                queHacemos: 'Damos las cuatro respuestas.',
                paraQue: 'El triangulo queda resuelto del todo.',
                queda: 'C = ' + C + '&deg;,  b = ' + F.n(b, 2) + ',  c = ' + F.n(c, 2) + ',  area = ' + F.n(area, 2),
                pregunta: 'Escribe las cuatro respuestas.',
                resp: R.varios([
                  { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
                  { etiqueta: 'b (cm)', resp: R.numero(b, { dec: 2, tol: 0.02 }) },
                  { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
                  { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.05 }) }
                ]),
                pista: 'C = ' + C + '&deg;, b = ' + F.n(b, 2) + ', c = ' + F.n(c, 2) + ' y area = ' + F.n(area, 2) + '.',
                despues: '' }
            ],
            final: 'C = <b>' + C + '&deg;</b>, b = <b>' + F.n(b, 2) + '</b>, c = <b>' + F.n(c, 2) + '</b>, area = <b>' + F.n(area, 2) + ' cm&sup2;</b>',
            receta: ['Primero el tercer angulo (gratis)',
              'Despues los lados con la ley de senos',
              'Usar SIEMPRE la pareja original para no arrastrar errores',
              'El area al final, con dos lados y el angulo entre ellos',
              'Comprobar: a mayor angulo, mayor lado opuesto']
          });
          enun = 'Resuelve el triangulo: A = ' + A + '&deg;, B = ' + B + '&deg;, a = ' + a + ' cm.<br>' +
            'Da C, b, c y el area (2 decimales).';
          resp = R.varios([
            { etiqueta: 'C (&deg;)', resp: R.numero(C, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'b (cm)', resp: R.numero(b, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'c (cm)', resp: R.numero(c, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['Empieza por C = 180&deg; &minus; A &minus; B y luego aplica la ley de senos dos veces.',
            'Para el area usa Area = (1/2)&middot;a&middot;b&middot;sen C.'];
          sol = ['C = 180&deg; &minus; ' + A + '&deg; &minus; ' + B + '&deg; = <b>' + C + '&deg;</b>',
            'b = a&middot;sen B/sen A = <b>' + F.n(b, 2) + '</b>',
            'c = a&middot;sen C/sen A = <b>' + F.n(c, 2) + '</b>',
            'Area = &frac12; &middot; ' + a + ' &middot; ' + F.n(b, 2) + ' &middot; sen ' + C + '&deg; = <b>' + F.n(area, 2) + ' cm&sup2;</b>'];
        } else {
          var ang1 = r.entero(25, 50), ang2 = r.entero(55, 80);
          var base = r.entero(20, 120);
          // dos observadores separados `base`, miden angulos de elevacion ang1 y ang2 al mismo punto
          var Aint = ang1, Bint = 180 - ang2, Cint = 180 - Aint - Bint;
          var dist = base * Math.sin(rad(Bint)) / Math.sin(rad(Cint));
          var altura = dist * Math.sin(rad(ang1));
          guiaDelPaso = G({
            intro: 'Dos personas separadas <b>' + base + ' m</b> miran la punta de una torre: la lejana con ' + ang1 + '&deg; ' +
              'y la cercana con ' + ang2 + '&deg;.<br>' +
              'Lo dificil de este problema no es la trigonometria, es <b>ver el triangulo</b>: sus vertices son las dos personas ' +
              'y la punta de la torre. Y cuidado, porque el angulo que se ve DENTRO de ese triangulo en la persona cercana ' +
              'no es el ' + ang2 + '&deg; que nos dan.',
            pasos: [
              { seccion: 'Paso 1: el angulo de adentro',
                queHacemos: 'Convertimos el angulo de elevacion en el angulo INTERIOR del triangulo.',
                paraQue: 'Los dos estan sobre la misma linea del suelo, asi que son suplementarios. Este paso decide todo el problema.',
                queda: 'angulos: ' + ang1 + '&deg;, ' + Bint + '&deg; y ?',
                pregunta: 'La persona cercana mide ' + ang2 + '&deg; hacia la punta, pero mirando hacia el otro lado.<br>' +
                  '&iquest;Cuanto vale el angulo INTERIOR del triangulo en ese vertice?',
                resp: R.numero(Bint, { dec: 2, tol: 0.05 }),
                pista: 'Es el suplementario: 180&deg; &minus; ' + ang2 + '&deg;. Los dos angulos estan sobre la misma linea del suelo.',
                despues: 'Este es el paso que decide todo el problema.' },
              { seccion: 'Paso 2: el angulo de la punta',
                queHacemos: 'Sacamos el tercer angulo con la suma 180&deg;.',
                paraQue: 'Curiosidad: da justo la diferencia de los dos angulos de elevacion.',
                queda: 'angulos: ' + ang1 + '&deg;, ' + Bint + '&deg; y ' + Cint + '&deg;',
                pregunta: 'Ahora el angulo en la punta de la torre: 180&deg; &minus; ' + ang1 + '&deg; &minus; ' + Bint + '&deg;',
                resp: R.numero(Cint, { dec: 2, tol: 0.05 }),
                pista: 'Los tres angulos suman 180&deg;.',
                despues: 'Curiosidad: da justo ' + ang2 + '&deg; &minus; ' + ang1 + '&deg; = ' + Cint + '&deg;.' },
              { seccion: 'Paso 3: la distancia inclinada',
                queHacemos: 'Ley de senos para el lado que va del observador a la punta.',
                paraQue: 'El lado conocido se opone al angulo de la punta, y la distancia que buscamos al otro.',
                queda: 'distancia = ' + F.n(dist, 2) + ' m;  falta la altura',
                pregunta: 'Ley de senos: la distancia de la persona LEJANA a la punta es<br>' +
                  base + ' &middot; sen ' + Bint + '&deg; &divide; sen ' + Cint + '&deg; (2 decimales)',
                resp: R.numero(dist, { dec: 2, tol: 0.05 }),
                pista: 'El lado ' + base + ' se opone al angulo de la punta (' + Cint + '&deg;), y la distancia que buscamos se opone a ' + Bint + '&deg;.',
                despues: 'Esa distancia es la hipotenusa del triangulo rectangulo que forma la torre con el suelo.' },
              { seccion: 'Paso 4: la altura',
                queHacemos: 'Con esa distancia inclinada sacamos la altura.',
                paraQue: 'Ya es un triangulo rectangulo normal: cateto opuesto = hipotenusa &times; seno.',
                queda: 'altura = ' + F.n(altura, 2) + ' m',
                pregunta: 'Ultimo paso: altura = ' + F.n(dist, 2) + ' &middot; sen ' + ang1 + '&deg; (2 decimales)',
                resp: R.numero(altura, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'En un triangulo rectangulo, el cateto opuesto es la hipotenusa por el seno del angulo.',
                despues: '' }
            ],
            final: 'La torre mide <b>' + F.n(altura, 2) + ' m</b>',
            receta: ['Dibujar el triangulo: las dos personas y la punta',
              'El angulo interior en la persona cercana es el SUPLEMENTO del de elevacion',
              'Tercer angulo con la suma 180&deg;',
              'Ley de senos para una distancia inclinada',
              'Al final, trigonometria simple para la altura']
          });
          enun = 'Dos personas estan alineadas con la base de una torre y separadas ' + base + ' m.<br>' +
            'La mas lejana ve la punta con un angulo de elevacion de ' + ang1 + '&deg; y la mas cercana con ' + ang2 + '&deg;.<br>' +
            '&iquest;Cual es la altura de la torre? (2 decimales)';
          resp = R.numero(altura, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['Forma el triangulo con los dos observadores y la punta de la torre.',
            'En ese triangulo un angulo es ' + ang1 + '&deg;, otro es 180&deg; &minus; ' + ang2 + '&deg; = ' + Bint + '&deg; y el tercero ' + Cint + '&deg;.'];
          sol = ['Angulos del triangulo: ' + Aint + '&deg;, ' + Bint + '&deg; y ' + Cint + '&deg;',
            'Ley de senos para el lado que va del observador cercano a la punta: d = ' + base + ' &middot; sen ' + Aint + '&deg; / sen ' + Cint + '&deg;',
            'Con ese lado, altura = d &middot; sen ' + ang2 + '&deg;',
            'Altura = <b>' + F.n(altura, 2) + ' m</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
