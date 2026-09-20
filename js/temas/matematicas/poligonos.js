/* Nombres de poligonos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var POL = [
    { n: 3, nombre: 'triangulo', pre: 'tri', alt: ['trigono'] },
    { n: 4, nombre: 'cuadrilatero', pre: 'cuadri', alt: ['tetragono', 'cuadrangulo'] },
    { n: 5, nombre: 'pentagono', pre: 'penta', alt: [] },
    { n: 6, nombre: 'hexagono', pre: 'hexa', alt: ['exagono'] },
    { n: 7, nombre: 'heptagono', pre: 'hepta', alt: [] },
    { n: 8, nombre: 'octagono', pre: 'octa', alt: ['octogono'] },
    { n: 9, nombre: 'eneagono', pre: 'enea', alt: ['nonagono'] },
    { n: 10, nombre: 'decagono', pre: 'deca', alt: [] },
    { n: 11, nombre: 'endecagono', pre: 'endeca', alt: ['undecagono'] },
    { n: 12, nombre: 'dodecagono', pre: 'dodeca', alt: [] },
    { n: 15, nombre: 'pentadecagono', pre: 'pentadeca', alt: ['pentakaidecagono'] },
    { n: 20, nombre: 'icosagono', pre: 'icosa', alt: [] }
  ];

  /* La lista de prefijos, para las pistas. */
  var PREFIJOS = 'tri = 3, cuadri/tetra = 4, penta = 5, hexa = 6, hepta = 7, ' +
    'octa = 8, enea = 9, deca = 10, endeca = 11, dodeca = 12, icosa = 20.';

  var G = EJ.guia.armar;

  var extra = {};

  extra.anguloCentral = function (r) {
    var p = r.elige(POL);
    return {
      guia: G({
        intro: 'Queremos el <b>angulo central</b> de un ' + p.nombre + ' regular.<br>' +
          'Imagina el poligono con un punto en el centro y una linea hacia cada vertice: queda partido en ' + p.n + ' rebanadas iguales, ' +
          'como un pastel. El angulo central es la punta de una rebanada.',
        pasos: [
          { pregunta: '&iquest;Cual es el angulo central?',
            resp: R.opcion(['El que se forma en el centro, entre dos vertices seguidos',
              'El que se forma en una esquina del poligono'], 0),
            pista: 'El de la esquina es el angulo INTERIOR, que es otra cosa. El central se mide desde el centro.',
            despues: 'Es la punta de una de las rebanadas.' },
          { pregunta: '&iquest;Cuantas rebanadas (angulos centrales) hay?',
            resp: R.numero(p.n, { dec: 0 }),
            pista: 'Una por cada lado del poligono.',
            despues: 'Y todas iguales, porque el poligono es regular.' },
          { pregunta: 'Esas ' + p.n + ' rebanadas se reparten la vuelta completa.<br>&iquest;Cuanto mide cada una? (2 decimales)',
            resp: R.numero(360 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' }),
            pista: 'La vuelta completa son 360&deg;: 360 &divide; ' + p.n + '.',
            despues: 'Dato util: el angulo central y el angulo EXTERIOR de un poligono regular miden lo mismo.' }
        ],
        final: 'El angulo central mide <b>' + F.n(360 / p.n, 2) + '&deg;</b>',
        receta: ['El centro reparte el poligono en n rebanadas iguales',
          'Toda la vuelta son 360&deg;',
          'Angulo central = 360&deg; &divide; n',
          'Coincide con el angulo exterior']
      }),
      enunciado: '&iquest;Cuanto mide el angulo central de un ' + p.nombre + ' regular? (2 decimales)',
      respuesta: R.numero(360 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' }),
      pistas: ['El angulo central se mide desde el centro hacia dos vertices seguidos.',
        'Los ' + p.n + ' angulos centrales se reparten los 360&deg; de la vuelta completa.'],
      solucion: ['La vuelta completa son 360&deg; y hay ' + p.n + ' angulos centrales iguales',
        'Angulo central = 360&deg; &divide; ' + p.n + ' = <b>' + F.n(360 / p.n, 2) + '&deg;</b>']
    };
  };

  extra.areaRegular = function (r) {
    var p = r.elige(POL.filter(function (x) { return x.n >= 5 && x.n <= 12; }));
    var lado = r.entero(3, 15);
    var apotema = lado / (2 * Math.tan(Math.PI / p.n));
    var perimetro = p.n * lado;
    var area = perimetro * apotema / 2;
    return {
      guia: G({
        intro: 'Un ' + p.nombre + ' regular con lados de <b>' + lado + ' cm</b> y apotema de <b>' + F.n(apotema, 2) + ' cm</b>.<br>' +
          'La formula del area, (perimetro &times; apotema) / 2, sale de partir el poligono en ' + p.n + ' triangulos ' +
          'que salen del centro: la base de cada uno es un lado y su altura es la apotema.',
        pasos: [
          { pregunta: 'Empieza por el perimetro: ' + p.n + ' lados de ' + lado + ' cm cada uno.',
            resp: R.numero(perimetro, { dec: 2, tol: 0.01 }),
            pista: 'Perimetro es la suma de todos los lados: ' + p.n + ' &times; ' + lado + '.',
            despues: 'Perimetro = ' + perimetro + ' cm.' },
          { pregunta: '&iquest;Que es la apotema?',
            resp: R.opcion(['La distancia del centro al punto medio de un lado',
              'La distancia del centro a un vertice'], 0),
            pista: 'Es la altura de cada triangulito: cae perpendicular sobre el lado, no llega a la esquina.',
            despues: 'La distancia al vertice es el RADIO, que es mayor. Confundirlos es el error mas comun aqui.' },
          { pregunta: 'Aplica la formula: (' + perimetro + ' &times; ' + F.n(apotema, 2) + ') &divide; 2<br>&iquest;Cuanto es el area? (2 decimales)',
            resp: R.numero(perimetro * F.redondea(apotema, 2) / 2, { dec: 2, tol: 0.5 }),
            pista: 'Multiplica y luego divide entre 2. Es lo mismo que sumar el area de los ' + p.n + ' triangulos.',
            despues: '' },
          { pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'Perimetro (cm)', resp: R.numero(perimetro, { dec: 2, tol: 0.01 }) },
              { etiqueta: 'Area (cm&sup2;)', resp: R.numero(perimetro * F.redondea(apotema, 2) / 2, { dec: 2, tol: 0.5 }) }
            ]),
            pista: 'Perimetro ' + perimetro + ' cm, area ' + F.n(perimetro * F.redondea(apotema, 2) / 2, 2) + ' cm&sup2;.',
            despues: '' }
        ],
        final: 'Perimetro <b>' + perimetro + ' cm</b> y area <b>' + F.n(perimetro * F.redondea(apotema, 2) / 2, 2) + ' cm&sup2;</b>',
        receta: ['Perimetro = n &times; lado',
          'Apotema = del centro al punto medio de un lado (no al vertice)',
          'Area = (perimetro &times; apotema) / 2',
          'Viene de sumar n triangulos con base = lado y altura = apotema',
          'El area va en unidades al cuadrado']
      }),
      enunciado: 'Un ' + p.nombre + ' regular tiene lados de ' + lado + ' cm y apotema de ' + F.n(apotema, 2) + ' cm.<br>' +
        'Calcula su perimetro y su area (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Perimetro (cm)', resp: R.numero(perimetro, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Area (cm&sup2;)', resp: R.numero(perimetro * F.redondea(apotema, 2) / 2, { dec: 2, tol: 0.5 }) }
      ]),
      pistas: ['El perimetro es el numero de lados por la medida de cada lado.',
        'Area de un poligono regular = (perimetro &times; apotema) / 2.'],
      solucion: ['Perimetro = ' + p.n + ' &times; ' + lado + ' = <b>' + perimetro + ' cm</b>',
        'Area = (' + perimetro + ' &times; ' + F.n(apotema, 2) + ') / 2',
        'Area = <b>' + F.n(perimetro * F.redondea(apotema, 2) / 2, 2) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'poligonos',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Nombres de poligonos',
    descripcion: 'Nombre segun el numero de lados, angulos interiores, exteriores y diagonales.',
    formulario: 'Suma de angulos interiores = (n &minus; 2)&middot;180&deg; &nbsp;&middot;&nbsp; Suma de exteriores = 360&deg;<br>' +
      'Angulo interior de un poligono regular = (n &minus; 2)&middot;180&deg;/n<br>' +
      'Numero de diagonales = n(n &minus; 3)/2',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, p;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['nombre', 'Del numero de lados al nombre'],
          ['lados', 'Del nombre al numero de lados']
        ]);
        p = r.elige(POL);
        if (tf === 'nombre') {
          var otroP = POL[(POL.indexOf(p) + 5) % POL.length];
          guiaDelPaso = G({
            intro: 'Nos preguntan como se llama el poligono de <b>' + p.n + ' lados</b>.<br>' +
              'Los nombres no son inventados: son un <b>prefijo griego</b> que dice el numero, mas la terminacion ' +
              '<b>"-gono"</b>, que significa "angulo". Aprendiendose los prefijos ya no hay que memorizar la lista.',
            pasos: [
              { pregunta: '&iquest;Que prefijo griego significa ' + p.n + '?',
                resp: R.opcion([p.pre + '-', otroP.pre + '-'], 0),
                pista: PREFIJOS,
                despues: 'El prefijo es <b>' + p.pre + '</b>.' },
              { pregunta: 'Ahora pegale la terminacion.<br>&iquest;Como se llama el poligono?',
                resp: R.texto(p.nombre, { alternativas: p.alt, ayuda: 'Escribe solo el nombre; los acentos no importan.' }),
                pista: p.n === 3 ? 'Este es de los raros: no acaba en -gono sino en -angulo (aunque "trigono" tambien vale).'
                  : (p.n === 4 ? 'Otro raro: acaba en -latero, de "lado" (aunque "tetragono" tambien vale).'
                    : 'Es ' + p.pre + ' + gono = ' + p.nombre + '.'),
                despues: '' }
            ],
            final: 'El poligono de ' + p.n + ' lados es el <b>' + p.nombre + '</b>',
            receta: ['Prefijo griego = numero de lados',
              'Terminacion -gono = angulo',
              'El triangulo y el cuadrilatero son las dos excepciones de nombre',
              'Tiene los mismos lados que angulos']
          });
          enun = '&iquest;Como se llama el poligono de ' + p.n + ' lados?';
          resp = R.texto(p.nombre, { alternativas: p.alt, ayuda: 'Escribe solo el nombre, sin acentos importa poco.' });
          pistas = ['Los nombres vienen del griego: penta = 5, hexa = 6, hepta = 7, octa = 8, enea = 9, deca = 10.',
            'Empieza con "' + p.nombre.substring(0, 3) + '&hellip;"'];
          sol = ['El prefijo griego para ' + p.n + ' da el nombre',
            'Se llama <b>' + p.nombre + '</b>'];
        } else {
          guiaDelPaso = G({
            intro: 'Nos preguntan cuantos lados tiene un <b>' + p.nombre + '</b>.<br>' +
              'No hay que memorizar la lista: el nombre lo dice, porque viene de un prefijo griego.',
            pasos: [
              { pregunta: 'Separa la palabra <b>' + p.nombre + '</b>. La terminacion "-gono" significa "angulo".<br>&iquest;Cual es el prefijo, o sea lo que va antes?',
                resp: R.texto(p.nombre.replace(/gono$|latero$|gulo$/, ''), { alternativas: [p.nombre] }),
                pista: 'Quitale la terminacion a ' + p.nombre + '.',
                despues: 'Ese prefijo es el que trae el numero.' },
              { pregunta: '&iquest;Que numero significa ese prefijo?',
                resp: R.numero(p.n, { dec: 0 }),
                pista: 'tri = 3, tetra/cuadri = 4, penta = 5, hexa = 6, hepta = 7, octa = 8, enea = 9, deca = 10, dodeca = 12, icosa = 20.',
                despues: '' }
            ],
            final: 'Un ' + p.nombre + ' tiene <b>' + p.n + ' lados</b>',
            receta: ['La terminacion -gono significa angulo',
              'El prefijo griego dice el numero',
              'Mismo numero de lados que de angulos']
          });
          enun = '&iquest;Cuantos lados tiene un ' + p.nombre + '?';
          resp = R.numero(p.n, { dec: 0, unidad: 'lados' });
          pistas = ['Fijate en el prefijo griego del nombre.',
            'El prefijo "' + p.nombre.substring(0, 4) + '" indica el numero.'];
          sol = ['El ' + p.nombre + ' tiene <b>' + p.n + ' lados</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['suma', 'Suma de angulos interiores'],
          ['interior', 'Angulo interior de un regular'],
          ['diagonales', 'Numero de diagonales'],
          ['anguloCentral', 'Angulo central']
        ]);
        if (extra[t]) return extra[t](r, dif);
        p = r.elige(POL);
        if (t === 'suma') {
          guiaDelPaso = EJ.guia.angulosPoligono(p.n, p.nombre);
          enun = '&iquest;Cuanto suman los angulos interiores de un ' + p.nombre + '?';
          resp = R.numero((p.n - 2) * 180, { dec: 0, unidad: 'grados' });
          pistas = ['La formula es (n &minus; 2) &middot; 180&deg;.',
            'El ' + p.nombre + ' tiene n = ' + p.n + ', asi que (' + p.n + ' &minus; 2) &middot; 180&deg;.'];
          sol = ['n = ' + p.n,
            'Suma = (' + p.n + ' &minus; 2) &middot; 180&deg; = ' + (p.n - 2) + ' &middot; 180&deg;',
            'Suma = <b>' + ((p.n - 2) * 180) + '&deg;</b>'];
        } else if (t === 'interior') {
          guiaDelPaso = G({
            intro: 'Queremos cuanto mide <b>cada</b> angulo interior de un <b>' + p.nombre + ' regular</b>.<br>' +
              'Son dos pasos: primero cuanto suman TODOS, y luego repartir esa suma. ' +
              'Y la formula de la suma no hay que creersela a ciegas: sale de partir el poligono en triangulos.',
            pasos: [
              { pregunta: 'Desde un solo vertice traza diagonales a todos los demas.<br>&iquest;En cuantos triangulos queda partido el ' + p.nombre + '?',
                resp: R.numero(p.n - 2, { dec: 0 }),
                pista: 'Siempre salen dos menos que lados: ' + p.n + ' &minus; 2. (Al vertice de al lado no se le puede trazar diagonal.)',
                despues: 'De ahi viene el (n &minus; 2) de la formula.' },
              { pregunta: 'Cada triangulo aporta 180&deg;.<br>&iquest;Cuanto suman en total los angulos interiores?',
                resp: R.numero((p.n - 2) * 180, { dec: 0 }),
                pista: (p.n - 2) + ' &times; 180&deg;.',
                despues: '' },
              { pregunta: '&iquest;Por que se puede dividir esa suma entre ' + p.n + '?',
                resp: R.opcion(['Porque al ser regular todos los angulos son iguales',
                  'Porque siempre se divide entre el numero de lados'], 0),
                pista: 'Si el poligono no fuera regular, la suma seria la misma pero cada angulo podria ser distinto.',
                despues: 'La palabra "regular" del enunciado es la que autoriza este paso.' },
              { pregunta: 'Divide: ' + ((p.n - 2) * 180) + '&deg; &divide; ' + p.n + ' (2 decimales)',
                resp: R.numero((p.n - 2) * 180 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' }),
                pista: 'Division directa.',
                despues: 'Comprueba que sea menor que 180&deg;: un angulo interior de un poligono convexo siempre lo es.' }
            ],
            final: 'Cada angulo interior mide <b>' + F.n((p.n - 2) * 180 / p.n, 2) + '&deg;</b>',
            receta: ['El poligono se parte en (n &minus; 2) triangulos',
              'Suma de interiores = (n &minus; 2) &middot; 180&deg;',
              'Solo si es REGULAR se divide entre n',
              'Cada angulo debe salir menor que 180&deg;']
          });
          enun = '&iquest;Cuanto mide cada angulo interior de un ' + p.nombre + ' regular? (redondea a 2 decimales)';
          resp = R.numero((p.n - 2) * 180 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' });
          pistas = ['En un poligono regular todos los angulos son iguales: divide la suma entre n.',
            'Suma = ' + ((p.n - 2) * 180) + '&deg;, y hay ' + p.n + ' angulos.'];
          sol = ['Suma de interiores = (' + p.n + ' &minus; 2) &middot; 180&deg; = ' + ((p.n - 2) * 180) + '&deg;',
            'Cada angulo = ' + ((p.n - 2) * 180) + '&deg; &divide; ' + p.n,
            'Cada angulo = <b>' + F.n((p.n - 2) * 180 / p.n, 2) + '&deg;</b>'];
        } else {
          guiaDelPaso = G({
            intro: 'Queremos cuantas <b>diagonales</b> tiene un ' + p.nombre + '.<br>' +
              'Una diagonal une dos vertices que NO son vecinos. La formula n(n &minus; 3)/2 se entiende sola ' +
              'si la armamos pieza por pieza en vez de memorizarla.',
            pasos: [
              { pregunta: 'Parate en un vertice. &iquest;A cuantos vertices NO le puedes trazar diagonal?',
                resp: R.numero(3, { dec: 0 }),
                pista: 'A si mismo, y a sus dos vecinos (con esos ya hay lado, no diagonal). Son 3.',
                despues: 'Por eso aparece el (n &minus; 3): desde cada vertice salen ' + (p.n - 3) + ' diagonales.' },
              { pregunta: 'Hay ' + p.n + ' vertices y de cada uno salen ' + (p.n - 3) + '.<br>&iquest;Cuanto da ' + p.n + ' &times; ' + (p.n - 3) + '?',
                resp: R.numero(p.n * (p.n - 3), { dec: 0 }),
                pista: 'Multiplicacion directa.',
                despues: p.n === 3 ? 'Da 0: un triangulo no tiene diagonales, porque todos sus vertices son vecinos.'
                  : 'Pero este numero esta inflado.' },
              { pregunta: '&iquest;Por que hay que dividir entre 2?',
                resp: R.opcion(['Porque cada diagonal se conto dos veces, una desde cada punta',
                  'Porque la mitad de las diagonales son lados'], 0),
                pista: 'La diagonal que va de A a C es la MISMA que va de C a A, pero la contamos en los dos vertices.',
                despues: '' },
              { pregunta: 'Divide: ' + (p.n * (p.n - 3)) + ' &divide; 2',
                resp: R.numero(p.n * (p.n - 3) / 2, { dec: 0, unidad: 'diagonales' }),
                pista: 'Ultimo paso.',
                despues: '' }
            ],
            final: 'El ' + p.nombre + ' tiene <b>' + (p.n * (p.n - 3) / 2) + ' diagonales</b>',
            receta: ['Desde cada vertice salen (n &minus; 3) diagonales',
              'Se descartan el propio vertice y sus dos vecinos',
              'Multiplicar por los n vertices',
              'Dividir entre 2 porque cada una se conto dos veces']
          });
          enun = '&iquest;Cuantas diagonales tiene un ' + p.nombre + '?';
          resp = R.numero(p.n * (p.n - 3) / 2, { dec: 0, unidad: 'diagonales' });
          pistas = ['La formula es n(n &minus; 3)/2.',
            'Con n = ' + p.n + ': ' + p.n + '(' + p.n + ' &minus; 3)/2.'];
          sol = ['D = n(n &minus; 3)/2',
            'D = ' + p.n + ' &middot; ' + (p.n - 3) + ' / 2 = ' + (p.n * (p.n - 3)) + '/2',
            'D = <b>' + (p.n * (p.n - 3) / 2) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['desdeSuma', 'Hallar n desde la suma'],
          ['desdeInterior', 'Hallar n desde el angulo interior'],
          ['desdeDiagonales', 'Hallar n desde las diagonales'],
          ['exterior', 'Angulo exterior'],
          ['areaRegular', 'Perimetro y area']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        p = r.elige(POL.filter(function (x) { return x.n >= 4; }));
        if (t2 === 'desdeSuma') {
          guiaDelPaso = G({
            intro: 'Nos dicen que los angulos interiores suman <b>' + ((p.n - 2) * 180) + '&deg;</b> y hay que averiguar cuantos lados tiene.<br>' +
              'Es la formula de siempre, (n &minus; 2) &middot; 180&deg;, pero al reves: ahora la incognita es n y hay que despejarla.',
            pasos: [
              { pregunta: 'Plantea (n &minus; 2) &middot; 180 = ' + ((p.n - 2) * 180) + '.<br>El 180 esta multiplicando, asi que pasa dividiendo: ' + ((p.n - 2) * 180) + ' &divide; 180',
                resp: R.numero(p.n - 2, { dec: 0 }),
                pista: 'Division directa. Siempre da exacto, porque la suma siempre es multiplo de 180.',
                despues: 'Eso vale (n &minus; 2), no n.' },
              { pregunta: 'Ahora despeja n: sumale 2.',
                resp: R.numero(p.n, { dec: 0 }),
                pista: 'n = ' + (p.n - 2) + ' + 2.',
                despues: 'El poligono tiene ' + p.n + ' lados. Una comprobacion rapida: tambien es el numero de triangulos mas 2.' },
              { pregunta: '&iquest;Como se llama el poligono de ' + p.n + ' lados?',
                resp: R.texto(p.nombre, { alternativas: p.alt }),
                pista: 'Por el prefijo griego. ' + PREFIJOS,
                despues: '' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Lados', resp: R.numero(p.n, { dec: 0 }) },
                  { etiqueta: 'Nombre', resp: R.texto(p.nombre, { alternativas: p.alt }) }
                ]),
                pista: p.n + ' lados, y se llama ' + p.nombre + '.',
                despues: '' }
            ],
            final: 'Tiene <b>' + p.n + ' lados</b> y es un <b>' + p.nombre + '</b>',
            receta: ['Usar la misma formula (n &minus; 2)180',
              'Dividir entre 180 para aislar (n &minus; 2)',
              'Sumar 2 para llegar a n',
              'Traducir el numero a nombre con el prefijo griego']
          });
          enun = 'Los angulos interiores de un poligono suman ' + ((p.n - 2) * 180) + '&deg;.<br>&iquest;Cuantos lados tiene y como se llama?';
          resp = R.varios([
            { etiqueta: 'Lados', resp: R.numero(p.n, { dec: 0 }) },
            { etiqueta: 'Nombre', resp: R.texto(p.nombre, { alternativas: p.alt }) }
          ]);
          pistas = ['Despeja n de (n &minus; 2) &middot; 180&deg; = ' + ((p.n - 2) * 180) + '&deg;.',
            'n &minus; 2 = ' + ((p.n - 2) * 180) + '/180 = ' + (p.n - 2) + '.'];
          sol = ['(n &minus; 2)180 = ' + ((p.n - 2) * 180),
            'n &minus; 2 = ' + (p.n - 2) + ' &rArr; n = <b>' + p.n + '</b>',
            'Se llama <b>' + p.nombre + '</b>'];
        } else if (t2 === 'desdeInterior') {
          var ang = (p.n - 2) * 180 / p.n;
          while (Math.abs(ang - Math.round(ang)) > 1e-9) { p = r.elige([{ n: 3, nombre: 'triangulo', alt: [] }, { n: 4, nombre: 'cuadrilatero', alt: [] }, { n: 5, nombre: 'pentagono', alt: [] }, { n: 6, nombre: 'hexagono', alt: [] }, { n: 8, nombre: 'octagono', alt: ['octogono'] }, { n: 10, nombre: 'decagono', alt: [] }, { n: 12, nombre: 'dodecagono', alt: [] }, { n: 20, nombre: 'icosagono', alt: [] }]); ang = (p.n - 2) * 180 / p.n; }
          guiaDelPaso = G({
            intro: 'Cada angulo interior mide <b>' + ang + '&deg;</b> y hay que averiguar cuantos lados tiene.<br>' +
              'Se podria despejar n de (n &minus; 2)180/n = ' + ang + ', pero eso es una ecuacion fea. ' +
              'Hay un camino mucho mas corto: pasar por el <b>angulo exterior</b>, porque los exteriores SIEMPRE suman 360&deg;.',
            pasos: [
              { pregunta: 'El angulo interior y el exterior son suplementarios (juntos hacen una linea recta).<br>&iquest;Cuanto mide el exterior? 180&deg; &minus; ' + ang + '&deg;',
                resp: R.numero(180 - ang, { dec: 2, tol: 0.01 }),
                pista: 'Resta directa.',
                despues: 'Cada angulo exterior mide ' + (180 - ang) + '&deg;.' },
              { pregunta: '&iquest;Cuanto suman TODOS los angulos exteriores de un poligono?',
                resp: R.numero(360, { dec: 0 }),
                pista: 'Este es el dato clave: siempre 360&deg;, tenga 3 lados o 100. Es como dar una vuelta completa caminando por el borde.',
                despues: 'Y como es regular, todos los exteriores son iguales.' },
              { pregunta: 'Si ' + (180 - ang) + '&deg; cabe n veces en 360&deg;, entonces n = 360 &divide; ' + (180 - ang) + '.<br>&iquest;Cuantos lados tiene?',
                resp: R.numero(p.n, { dec: 0 }),
                pista: 'Division directa. Debe dar un entero.',
                despues: '' },
              { pregunta: '&iquest;Como se llama?',
                resp: R.texto(p.nombre, { alternativas: p.alt }),
                pista: PREFIJOS,
                despues: '' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Lados', resp: R.numero(p.n, { dec: 0 }) },
                  { etiqueta: 'Nombre', resp: R.texto(p.nombre, { alternativas: p.alt }) }
                ]),
                pista: p.n + ' lados, ' + p.nombre + '.',
                despues: '' }
            ],
            final: 'Tiene <b>' + p.n + ' lados</b> y es un <b>' + p.nombre + '</b>',
            receta: ['Pasar del interior al exterior: 180&deg; &minus; interior',
              'Los exteriores SIEMPRE suman 360&deg;',
              'n = 360&deg; &divide; angulo exterior',
              'Es mucho mas corto que despejar de la formula del interior']
          });
          enun = 'Cada angulo interior de un poligono regular mide ' + ang + '&deg;.<br>&iquest;Cuantos lados tiene y como se llama?';
          resp = R.varios([
            { etiqueta: 'Lados', resp: R.numero(p.n, { dec: 0 }) },
            { etiqueta: 'Nombre', resp: R.texto(p.nombre, { alternativas: p.alt }) }
          ]);
          pistas = ['Si el interior mide ' + ang + '&deg;, el exterior mide 180&deg; &minus; ' + ang + '&deg; = ' + (180 - ang) + '&deg;.',
            'Los exteriores suman 360&deg;, asi que n = 360&deg; / ' + (180 - ang) + '&deg;.'];
          sol = ['Angulo exterior = 180&deg; &minus; ' + ang + '&deg; = ' + (180 - ang) + '&deg;',
            'n = 360&deg; &divide; ' + (180 - ang) + '&deg; = <b>' + p.n + '</b>',
            'Es un <b>' + p.nombre + '</b>'];
        } else if (t2 === 'desdeDiagonales') {
          var D = p.n * (p.n - 3) / 2;
          guiaDelPaso = G({
            intro: 'Un poligono tiene <b>' + D + ' diagonales</b> y hay que averiguar cuantos lados tiene.<br>' +
              'Partimos de n(n &minus; 3)/2 = ' + D + '. Se puede resolver como ecuacion cuadratica, ' +
              'pero con numeros chicos sale mas rapido buscando dos numeros que se lleven 3.',
            pasos: [
              { pregunta: 'Quitate el /2 multiplicando los dos lados por 2: ' + D + ' &times; 2',
                resp: R.numero(2 * D, { dec: 0 }),
                pista: 'Lo que divide de un lado pasa multiplicando al otro.',
                despues: 'Queda n(n &minus; 3) = ' + (2 * D) + '.' },
              { pregunta: 'Busca dos numeros que se lleven 3 y multiplicados den ' + (2 * D) + '.<br>&iquest;Cual es el mayor de los dos? (ese es n)',
                resp: R.numero(p.n, { dec: 0 }),
                pista: 'Prueba: ' + p.n + ' &times; ' + (p.n - 3) + ' = ' + (2 * D) + '.',
                despues: 'Tambien se podria resolver n&sup2; &minus; 3n &minus; ' + (2 * D) + ' = 0 con la formula general: da lo mismo.' },
              { pregunta: 'La ecuacion cuadratica tiene otra raiz, negativa. &iquest;Por que se descarta?',
                resp: R.opcion(['Porque un poligono no puede tener un numero negativo de lados',
                  'Porque siempre se toma la mayor'], 0),
                pista: 'Es un problema de geometria: la respuesta tiene que tener sentido fisico.',
                despues: '' },
              { pregunta: 'Comprueba: &iquest;cuantas diagonales tiene un poligono de ' + p.n + ' lados?',
                resp: R.numero(D, { dec: 0 }),
                pista: p.n + '(' + p.n + ' &minus; 3)/2 = ' + (p.n * (p.n - 3)) + '/2 = ' + D + '.',
                despues: 'Coincide, asi que el resultado esta bien.' }
            ],
            final: 'El poligono tiene <b>' + p.n + ' lados</b>',
            receta: ['Partir de n(n &minus; 3)/2 = diagonales',
              'Multiplicar por 2 para quitar la fraccion',
              'Buscar dos numeros que se lleven 3 con ese producto',
              'Descartar la solucion negativa',
              'Comprobar metiendo el resultado en la formula']
          });
          enun = 'Un poligono tiene ' + D + ' diagonales. &iquest;Cuantos lados tiene?';
          resp = R.numero(p.n, { dec: 0, unidad: 'lados' });
          pistas = ['Plantea n(n &minus; 3)/2 = ' + D + ' y resuelve la ecuacion cuadratica.',
            'n&sup2; &minus; 3n &minus; ' + (2 * D) + ' = 0.'];
          sol = ['n(n &minus; 3)/2 = ' + D,
            'n&sup2; &minus; 3n &minus; ' + (2 * D) + ' = 0',
            'Resolviendo: n = <b>' + p.n + '</b> (la raiz negativa se descarta)'];
        } else {
          guiaDelPaso = G({
            intro: 'Queremos el <b>angulo exterior</b> de un ' + p.nombre + ' regular.<br>' +
              'El exterior es el que queda entre un lado y la prolongacion del siguiente. ' +
              'Y tiene una propiedad preciosa: <b>los exteriores de cualquier poligono suman siempre 360&deg;</b>, ' +
              'tenga 3 lados o 100. Por eso este ejercicio es mas facil que el del angulo interior.',
            pasos: [
              { pregunta: '&iquest;Cuanto suman los angulos exteriores de un ' + p.nombre + '?',
                resp: R.numero(360, { dec: 0 }),
                pista: 'La misma respuesta para todos los poligonos: 360&deg;. Imagina que caminas por el borde: al volver al inicio diste una vuelta completa.',
                despues: 'No depende del numero de lados. Ese es todo el truco.' },
              { pregunta: '&iquest;Cuantos angulos exteriores hay?',
                resp: R.numero(p.n, { dec: 0 }),
                pista: 'Uno por cada vertice, y hay tantos vertices como lados.',
                despues: 'Y como es regular, todos miden lo mismo.' },
              { pregunta: 'Reparte los 360&deg; entre los ' + p.n + '.<br>&iquest;Cuanto mide cada uno? (2 decimales)',
                resp: R.numero(360 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' }),
                pista: '360 &divide; ' + p.n + '.',
                despues: 'Comprobacion: interior + exterior debe dar 180&deg;. Aqui ' +
                  F.n((p.n - 2) * 180 / p.n, 2) + '&deg; + ' + F.n(360 / p.n, 2) + '&deg; = 180&deg;.' }
            ],
            final: 'Cada angulo exterior mide <b>' + F.n(360 / p.n, 2) + '&deg;</b>',
            receta: ['Los exteriores SIEMPRE suman 360&deg;',
              'No depende del numero de lados',
              'Si es regular: cada uno vale 360&deg; &divide; n',
              'Comprobacion: interior + exterior = 180&deg;']
          });
          enun = '&iquest;Cuanto mide cada angulo exterior de un ' + p.nombre + ' regular? (redondea a 2 decimales)';
          resp = R.numero(360 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' });
          pistas = ['Los angulos exteriores de cualquier poligono suman 360&deg;.',
            'Cada uno mide 360&deg; / ' + p.n + '.'];
          sol = ['Suma de exteriores = 360&deg; (siempre)',
            'Cada exterior = 360&deg; &divide; ' + p.n + ' = <b>' + F.n(360 / p.n, 2) + '&deg;</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
