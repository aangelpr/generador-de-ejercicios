/* Nombres de poligonos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var POL = [
    { n: 3, nombre: 'triangulo', alt: ['trigono'] },
    { n: 4, nombre: 'cuadrilatero', alt: ['tetragono', 'cuadrangulo'] },
    { n: 5, nombre: 'pentagono', alt: [] },
    { n: 6, nombre: 'hexagono', alt: ['exagono'] },
    { n: 7, nombre: 'heptagono', alt: [] },
    { n: 8, nombre: 'octagono', alt: ['octogono'] },
    { n: 9, nombre: 'eneagono', alt: ['nonagono'] },
    { n: 10, nombre: 'decagono', alt: [] },
    { n: 11, nombre: 'endecagono', alt: ['undecagono'] },
    { n: 12, nombre: 'dodecagono', alt: [] },
    { n: 15, nombre: 'pentadecagono', alt: ['pentakaidecagono'] },
    { n: 20, nombre: 'icosagono', alt: [] }
  ];

  var G = EJ.guia.armar;

  var extra = {};

  extra.anguloCentral = function (r) {
    var p = r.elige(POL);
    return {
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
          enun = '&iquest;Cuanto mide cada angulo interior de un ' + p.nombre + ' regular? (redondea a 2 decimales)';
          resp = R.numero((p.n - 2) * 180 / p.n, { dec: 2, tol: 0.01, unidad: 'grados' });
          pistas = ['En un poligono regular todos los angulos son iguales: divide la suma entre n.',
            'Suma = ' + ((p.n - 2) * 180) + '&deg;, y hay ' + p.n + ' angulos.'];
          sol = ['Suma de interiores = (' + p.n + ' &minus; 2) &middot; 180&deg; = ' + ((p.n - 2) * 180) + '&deg;',
            'Cada angulo = ' + ((p.n - 2) * 180) + '&deg; &divide; ' + p.n,
            'Cada angulo = <b>' + F.n((p.n - 2) * 180 / p.n, 2) + '&deg;</b>'];
        } else {
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
          enun = 'Un poligono tiene ' + D + ' diagonales. &iquest;Cuantos lados tiene?';
          resp = R.numero(p.n, { dec: 0, unidad: 'lados' });
          pistas = ['Plantea n(n &minus; 3)/2 = ' + D + ' y resuelve la ecuacion cuadratica.',
            'n&sup2; &minus; 3n &minus; ' + (2 * D) + ' = 0.'];
          sol = ['n(n &minus; 3)/2 = ' + D,
            'n&sup2; &minus; 3n &minus; ' + (2 * D) + ' = 0',
            'Resolviendo: n = <b>' + p.n + '</b> (la raiz negativa se descarta)'];
        } else {
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
