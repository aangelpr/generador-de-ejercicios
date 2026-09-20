/* Excentricidad */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var G = EJ.guia.armar;

  var extra = {};

  extra.comparar = function (r) {
    var a1 = r.entero(5, 15), b1 = r.entero(2, a1 - 1);
    var a2 = r.entero(5, 15), b2 = r.entero(2, a2 - 1);
    var e1 = Math.sqrt(a1 * a1 - b1 * b1) / a1;
    var e2 = Math.sqrt(a2 * a2 - b2 * b2) / a2;
    while (Math.abs(e1 - e2) < 0.05) { b2 = r.entero(2, a2 - 1); e2 = Math.sqrt(a2 * a2 - b2 * b2) / a2; }
    var cA = Math.sqrt(a1 * a1 - b1 * b1), cB = Math.sqrt(a2 * a2 - b2 * b2);
    return {
      guia: G({
        intro: 'Dos elipses y hay que ver cual se parece mas a una circunferencia.<br>' +
          'A ojo no se puede: hay elipses con numeros grandes que son casi redondas y otras con numeros chicos muy estiradas. ' +
          'Lo que decide es la <b>excentricidad</b>, que mide exactamente eso: cuanto se aleja de ser un circulo.',
        pasos: [
          { pregunta: 'Empecemos con la elipse A. Calcula c = &radic;<span class="rad">' + (a1 * a1) + ' &minus; ' + (b1 * b1) + '</span> (4 decimales)',
            resp: R.numero(cA, { dec: 4, tol: 0.005 }),
            pista: 'Dentro de la raiz queda ' + (a1 * a1 - b1 * b1) + '.',
            despues: '' },
          { pregunta: 'Su excentricidad: e = c/a = ' + F.n(cA, 4) + ' &divide; ' + a1 + ' (4 decimales)',
            resp: R.numero(e1, { dec: 4, tol: 0.005 }),
            pista: 'Division directa.',
            despues: 'e de A = ' + F.n(e1, 4) + '.' },
          { pregunta: 'Ahora la elipse B, mismo procedimiento.<br>&iquest;Cual es su excentricidad? (4 decimales)',
            resp: R.numero(e2, { dec: 4, tol: 0.005 }),
            pista: 'c = &radic;<span class="rad">' + (a2 * a2 - b2 * b2) + '</span> = ' + F.n(cB, 4) + ', y luego entre ' + a2 + '.',
            despues: 'e de B = ' + F.n(e2, 4) + '.' },
          { pregunta: 'La excentricidad va de 0 (circulo perfecto) a 1 (totalmente aplastada).<br>&iquest;Cual de las dos es mas circular?',
            resp: R.opcion(['Elipse A', 'Elipse B'], e1 < e2 ? 0 : 1),
            pista: 'La mas redonda es la de excentricidad MENOR, la que esta mas cerca de 0. Aqui ' +
              F.n(e1, 4) + ' contra ' + F.n(e2, 4) + '.',
            despues: 'Fijate que no importa el tamano: una elipse gigante puede ser mas redonda que una chiquita.' },
          { pregunta: 'Escribe las tres respuestas.',
            resp: R.varios([
              { etiqueta: 'e de A', resp: R.numero(e1, { dec: 4, tol: 0.005 }) },
              { etiqueta: 'e de B', resp: R.numero(e2, { dec: 4, tol: 0.005 }) },
              { etiqueta: 'Mas circular', resp: R.opcion(['Elipse A', 'Elipse B'], e1 < e2 ? 0 : 1) }
            ]),
            pista: 'e(A) = ' + F.n(e1, 4) + ', e(B) = ' + F.n(e2, 4) + ', mas circular la ' + (e1 < e2 ? 'A' : 'B') + '.',
            despues: '' }
        ],
        final: 'e(A) = <b>' + F.n(e1, 4) + '</b>, e(B) = <b>' + F.n(e2, 4) + '</b>; la mas circular es la <b>elipse ' + (e1 < e2 ? 'A' : 'B') + '</b>',
        receta: ['Para cada elipse: c = &radic;<span class="rad">a&sup2; &minus; b&sup2;</span>',
          'e = c/a',
          'e cerca de 0: casi un circulo',
          'e cerca de 1: muy aplastada',
          'El tamano no influye, solo la proporcion']
      }),
      enunciado: 'Dos elipses:<br>' +
        'A: ' + F.frac('x&sup2;', a1 * a1) + ' + ' + F.frac('y&sup2;', b1 * b1) + ' = 1<br>' +
        'B: ' + F.frac('x&sup2;', a2 * a2) + ' + ' + F.frac('y&sup2;', b2 * b2) + ' = 1<br>' +
        'Calcula las dos excentricidades y di cual elipse se parece mas a una circunferencia (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'e de A', resp: R.numero(e1, { dec: 4, tol: 0.005 }) },
        { etiqueta: 'e de B', resp: R.numero(e2, { dec: 4, tol: 0.005 }) },
        { etiqueta: 'Mas circular', resp: R.opcion(['Elipse A', 'Elipse B'], e1 < e2 ? 0 : 1) }
      ]),
      pistas: ['Para cada una: c = &radic;<span class="rad">a&sup2; &minus; b&sup2;</span> y luego e = c/a.',
        'Mientras mas CERCA de 0 este la excentricidad, mas redonda es la elipse.'],
      solucion: ['Elipse A: c = &radic;<span class="rad">' + (a1 * a1 - b1 * b1) + '</span> &rArr; e = <b>' + F.n(e1, 4) + '</b>',
        'Elipse B: c = &radic;<span class="rad">' + (a2 * a2 - b2 * b2) + '</span> &rArr; e = <b>' + F.n(e2, 4) + '</b>',
        'La mas circular es la de menor excentricidad: <b>elipse ' + (e1 < e2 ? 'A' : 'B') + '</b>']
    };
  };

  EJ.tema({
    id: 'excentricidad',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Excentricidad',
    descripcion: 'Calcular e interpretar la excentricidad de las conicas.',
    formulario: 'e = c/a<br>' +
      'Circunferencia: e = 0 &nbsp;&middot;&nbsp; Elipse: 0 &lt; e &lt; 1 &nbsp;&middot;&nbsp; Parabola: e = 1 &nbsp;&middot;&nbsp; Hiperbola: e &gt; 1<br>' +
      'Elipse: c&sup2; = a&sup2; &minus; b&sup2; &nbsp;&middot;&nbsp; Hiperbola: c&sup2; = a&sup2; + b&sup2;',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, e;

      if (dif === 'facil') {
        var t = r.subtema([
          ['elipseAC', 'Excentricidad con a y c'],
          ['concepto', 'Casos especiales (circulo y parabola)'],
          ['clasifica', 'Clasificar segun e']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'elipseAC') {
          a = r.entero(5, 20); c = r.entero(1, a - 1);
          e = c / a;
          guiaDelPaso = G({
            intro: 'Una elipse con a = <b>' + a + '</b> y c = <b>' + c + '</b>.<br>' +
              'La excentricidad mide que tan "estirada" esta una conica. Su formula es cortita, ' +
              'pero hay que tener claro que es cada letra: <b>a</b> es el semieje mayor (del centro al vertice) ' +
              'y <b>c</b> la distancia del centro a un foco.',
            pasos: [
              { pregunta: '&iquest;Cual es la formula de la excentricidad?',
                resp: R.opcion(['e = c/a', 'e = a/c'], 0),
                pista: 'Es la distancia al foco dividida entre el semieje mayor. Siempre c arriba.',
                despues: 'Como en la elipse el foco queda DENTRO (c &lt; a), el resultado sale entre 0 y 1.' },
              { pregunta: 'Calcula e = ' + c + ' &divide; ' + a + ' (4 decimales)',
                resp: R.numero(e, { dec: 4, tol: 0.01 }),
                pista: 'Division directa.',
                despues: '' },
              { pregunta: 'Ese numero, &iquest;que confirma?',
                resp: R.opcion(['Que esta entre 0 y 1, asi que efectivamente es una elipse',
                  'Que es mayor que 1, asi que seria una hiperbola'], 0),
                pista: 'Circunferencia e = 0, elipse entre 0 y 1, parabola e = 1, hiperbola mayor que 1.',
                despues: e < 0.4 ? 'Ademas, al estar cerca de 0, esta elipse es bastante redonda.'
                  : 'Al estar mas cerca de 1, esta elipse es bastante alargada.' }
            ],
            final: 'e = <b>' + F.n(e, 4) + '</b>',
            receta: ['e = c/a, siempre c arriba',
              'a es el semieje mayor, c la distancia al foco',
              'En la elipse siempre sale entre 0 y 1',
              'Cerca de 0 redonda, cerca de 1 alargada']
          });
          enun = 'Una elipse tiene a = ' + a + ' y c = ' + c + '.<br>Calcula su excentricidad (2 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.01 });
          pistas = ['La excentricidad siempre es e = c/a.',
            'e = ' + c + '/' + a + '.'];
          sol = ['e = c/a', 'e = ' + c + ' / ' + a + ' = <b>' + F.n(e, 4) + '</b>',
            'Como 0 &lt; e &lt; 1, se confirma que es una elipse'];
        } else if (t === 'concepto') {
          var conicas = [
            { n: 'una circunferencia', e: 0, txt: '0' },
            { n: 'una parabola', e: 1, txt: '1' }
          ];
          var cn = r.elige(conicas);
          guiaDelPaso = G({
            intro: 'Nos preguntan la excentricidad de <b>' + cn.n + '</b>.<br>' +
              'La excentricidad siempre es <b>e = c/a</b>, donde c es la distancia del centro a un foco.',
            pasos: cn.e === 0 ? [
              { pregunta: 'En una circunferencia, &iquest;donde estan sus dos focos?',
                resp: R.opcion(['Los dos juntos, en el centro', 'Separados, como en la elipse'], 0),
                pista: 'Una circunferencia es una elipse donde los focos se juntaron hasta coincidir.',
                despues: 'Al estar los dos en el centro, la distancia del centro al foco es cero.' },
              { pregunta: 'Entonces c = 0. &iquest;Cuanto vale e = c/a = 0/a?',
                resp: R.numero(0, { dec: 2 }),
                pista: 'Cero entre cualquier numero da cero.', despues: '' }
            ] : [
              { pregunta: 'La definicion de parabola dice que cada punto esta a la misma distancia del foco que de la directriz.<br>&iquest;Como es entonces la razon entre esas dos distancias?',
                resp: R.opcion(['Igual a 1, porque son iguales', 'Menor que 1', 'Mayor que 1'], 0),
                pista: 'Si dos cosas son iguales, al dividir una entre otra da 1.',
                despues: 'Y esa razon es precisamente la excentricidad.' },
              { pregunta: 'Entonces, &iquest;cuanto vale la excentricidad de una parabola?',
                resp: R.numero(1, { dec: 2 }),
                pista: 'Lo acabas de decir.', despues: '' }
            ],
            final: 'La excentricidad de ' + cn.n + ' es <b>' + cn.e + '</b>',
            receta: ['e = c/a siempre',
              'Circunferencia: los focos coinciden, c = 0, e = 0',
              'Parabola: por definicion e = 1',
              'Elipse entre 0 y 1; hiperbola mayor que 1']
          });
          enun = '&iquest;Cuanto vale la excentricidad de ' + cn.n + '?';
          resp = R.numero(cn.e, { dec: 2 });
          pistas = ['Piensa en que tan "estirada" esta la curva respecto a un circulo.',
            cn.e === 0 ? 'En la circunferencia los dos focos coinciden en el centro, asi que c = 0.' : 'En la parabola la distancia al foco y a la directriz siempre es la misma.'];
          sol = [cn.e === 0 ? 'En la circunferencia c = 0, asi que e = 0/a = <b>0</b>' : 'Por definicion la parabola cumple e = <b>1</b>'];
        } else {
          var val = r.elige([0, 0.3, 0.55, 0.8, 1, 1.4, 2.2, 3]);
          var tipo = val === 0 ? 'Circunferencia' : val < 1 ? 'Elipse' : val === 1 ? 'Parabola' : 'Hiperbola';
          var TIPOSE = ['Circunferencia', 'Elipse', 'Parabola', 'Hiperbola'];
          var idxE = TIPOSE.indexOf(tipo);
          var pasosCl = [
            { pregunta: 'Primera pregunta del filtro: &iquest;la excentricidad vale exactamente 0?',
              resp: R.opcion(['Si, vale 0', 'No, vale mas que 0'], val === 0 ? 0 : 1),
              pista: 'e = 0 solo pasa en un caso: cuando los dos focos estan pegados en el centro.',
              despues: val === 0 ? 'Con e = 0 ya esta: es una circunferencia.' : 'Entonces hay que compararla con 1.' }
          ];
          if (val !== 0) {
            pasosCl.push({
              pregunta: 'Compara ' + val + ' con 1.',
              resp: R.opcion(['Es menor que 1', 'Es exactamente 1', 'Es mayor que 1'],
                val < 1 ? 0 : (val === 1 ? 1 : 2)),
              pista: 'El 1 es la frontera: justo ahi esta la parabola, y separa la elipse de la hiperbola.',
              despues: val < 1 ? 'Entre 0 y 1: curva cerrada, una elipse.'
                : (val === 1 ? 'Exactamente 1: la parabola, el caso frontera.'
                  : 'Mayor que 1: la curva se abre y se va al infinito en dos ramas.')
            });
          }
          pasosCl.push({
            pregunta: 'Entonces, &iquest;que conica es?',
            resp: R.opcion(TIPOSE, idxE),
            pista: 'e = 0 circunferencia &middot; 0 &lt; e &lt; 1 elipse &middot; e = 1 parabola &middot; e &gt; 1 hiperbola.',
            despues: ''
          });
          guiaDelPaso = G({
            intro: 'Una conica con excentricidad <b>e = ' + val + '</b>: hay que decir cual es.<br>' +
              'La excentricidad por si sola ya identifica el tipo de conica, sin ver la ecuacion ni el dibujo. ' +
              'Solo hay que ubicar el numero en una recta con dos marcas: el 0 y el 1.',
            pasos: pasosCl,
            final: 'Con e = ' + val + ' se trata de una <b>' + tipo + '</b>',
            receta: ['e = 0: circunferencia (los focos coinciden)',
              '0 &lt; e &lt; 1: elipse',
              'e = 1: parabola',
              'e &gt; 1: hiperbola',
              'Mientras mas grande la e, mas abierta la curva']
          });
          enun = 'Una conica tiene excentricidad e = ' + val + '. &iquest;De que conica se trata?';
          resp = R.opcion(['Circunferencia', 'Elipse', 'Parabola', 'Hiperbola'], ['Circunferencia', 'Elipse', 'Parabola', 'Hiperbola'].indexOf(tipo));
          pistas = ['e = 0 circunferencia, 0 &lt; e &lt; 1 elipse, e = 1 parabola, e &gt; 1 hiperbola.',
            'Compara ' + val + ' con 0 y con 1.'];
          sol = ['e = ' + val + (val === 0 ? ' es exactamente 0' : val < 1 ? ' esta entre 0 y 1' : val === 1 ? ' es exactamente 1' : ' es mayor que 1'),
            'Se trata de una <b>' + tipo + '</b>'];
        }
      } else if (dif === 'medio') {
        var tm = r.subtema([
          ['elipseEcuacion', 'Excentricidad de una elipse'],
          ['hiperbolaEcuacion', 'Excentricidad de una hiperbola'],
          ['comparar', 'Comparar dos elipses']
        ]);
        if (extra[tm]) return extra[tm](r, dif);
        if (tm === 'elipseEcuacion') {
          a = r.entero(3, 10); b = r.entero(2, a - 1);
          c = Math.sqrt(a * a - b * b); e = c / a;
          guiaDelPaso = EJ.guia.excentricidadElipse(a, b);
          enun = 'Calcula la excentricidad de la elipse <span class="big">' +
            F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</span> (4 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.005 });
          pistas = ['Primero saca a y b de los denominadores, luego c&sup2; = a&sup2; &minus; b&sup2;.',
            'c = &radic;<span class="rad">' + (a * a) + ' &minus; ' + (b * b) + '</span> = ' + F.n(c, 4) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
            'c&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + ' &rArr; c = ' + F.n(c, 4),
            'e = c/a = ' + F.n(c, 4) + '/' + a + ' = <b>' + F.n(e, 4) + '</b>'];
        } else {
          a = r.entero(2, 9); b = r.entero(2, 9);
          c = Math.sqrt(a * a + b * b); e = c / a;
          guiaDelPaso = G({
            intro: 'Excentricidad de la hiperbola <b>' + F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</b>.<br>' +
              'El procedimiento es el mismo que en la elipse (sacar a, sacar c, dividir), ' +
              'pero con un cambio decisivo: aqui c se calcula <b>sumando</b>. Y por eso la excentricidad saldra mayor que 1.',
            pasos: [
              { pregunta: 'El denominador del termino positivo es a&sup2; = ' + (a * a) + '.<br>&iquest;Cuanto vale a?',
                resp: R.numero(a, { dec: 2, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + (a * a) + '</span>.',
                despues: 'Ojo: en la hiperbola a NO es necesariamente el denominador mayor; es el del termino que va SUMANDO.' },
              { pregunta: 'Y b&sup2; = ' + (b * b) + ', asi que b vale...',
                resp: R.numero(b, { dec: 2, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + (b * b) + '</span>.',
                despues: '' },
              { pregunta: 'En la hiperbola, &iquest;como se calcula c?',
                resp: R.opcion(['c&sup2; = a&sup2; + b&sup2; (se suma)', 'c&sup2; = a&sup2; &minus; b&sup2; (se resta)'], 0),
                pista: 'Al reves que en la elipse. Los focos de la hiperbola quedan MAS LEJOS que los vertices.',
                despues: '' },
              { pregunta: 'Calcula c = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span> (4 decimales)',
                resp: R.numero(c, { dec: 4, tol: 0.005 }),
                pista: 'Dentro de la raiz queda ' + (a * a + b * b) + '.',
                despues: 'Fijate que c = ' + F.n(c, 4) + ' es mayor que a = ' + a + '.' },
              { pregunta: 'Ahora e = c/a = ' + F.n(c, 4) + ' &divide; ' + a + ' (4 decimales)',
                resp: R.numero(e, { dec: 4, tol: 0.005 }),
                pista: 'Division directa.',
                despues: 'Comprobacion: tiene que salir MAYOR que 1. Si te sale menor, restaste en vez de sumar.' }
            ],
            final: 'e = <b>' + F.n(e, 4) + '</b>',
            receta: ['a&sup2; es el denominador del termino POSITIVO',
              'Hiperbola: c&sup2; = a&sup2; + b&sup2;',
              'e = c/a igual que siempre',
              'En la hiperbola e siempre sale mayor que 1']
          });
          enun = 'Calcula la excentricidad de la hiperbola <span class="big">' +
            F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</span> (4 decimales).';
          resp = R.numero(e, { dec: 4, tol: 0.005 });
          pistas = ['En la hiperbola c&sup2; = a&sup2; + b&sup2; (se suman).',
            'c = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span> = ' + F.n(c, 4) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
            'c&sup2; = ' + (a * a + b * b) + ' &rArr; c = ' + F.n(c, 4),
            'e = c/a = <b>' + F.n(e, 4) + '</b> (mayor que 1, como toda hiperbola)'];
        }
      } else {
        var t2 = r.subtema([
          ['despejaC', 'Hallar c y b en una elipse'],
          ['despejaB', 'Hallar c y b en una hiperbola'],
          ['planeta', 'Orbitas (aplicacion)'],
          ['comparar', 'Comparar dos elipses']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'despejaC') {
          a = r.entero(6, 20);
          e = r.elige([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8]);
          c = a * e;
          b = Math.sqrt(a * a - c * c);
          guiaDelPaso = G({
            intro: 'Una elipse con a = <b>' + a + '</b> y e = <b>' + e + '</b>; hay que encontrar c y b.<br>' +
              'Es el camino de regreso: normalmente calculas e a partir de a y b, y aqui te dan la e ' +
              'para que reconstruyas la elipse. Se hace en dos saltos: primero c, y con c la b.',
            pasos: [
              { pregunta: 'De e = c/a, &iquest;como se despeja c?',
                resp: R.opcion(['c = a &middot; e', 'c = e / a'], 0),
                pista: 'La a esta dividiendo, asi que pasa multiplicando al otro lado.',
                despues: '' },
              { pregunta: 'Calcula c = ' + a + ' &times; ' + e + ' (4 decimales)',
                resp: R.numero(c, { dec: 4, tol: 0.01 }),
                pista: 'Multiplicacion directa.',
                despues: 'c = ' + F.n(c, 4) + ', menor que a = ' + a + ', como debe ser en una elipse.' },
              { pregunta: 'En la elipse b&sup2; = a&sup2; &minus; c&sup2;.<br>Calcula ' + (a * a) + ' &minus; ' + F.n(c * c, 4) + ' (4 decimales)',
                resp: R.numero(a * a - c * c, { dec: 4, tol: 0.02 }),
                pista: 'Primero eleva c al cuadrado: ' + F.n(c * c, 4) + '. Luego resta.',
                despues: '' },
              { pregunta: 'Saca la raiz para obtener b. (4 decimales)',
                resp: R.numero(b, { dec: 4, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + F.n(a * a - c * c, 4) + '</span>.',
                despues: 'Comprueba que b salga menor que a: el semieje menor nunca supera al mayor.' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
                ]),
                pista: 'c = ' + F.n(c, 4) + ' y b = ' + F.n(b, 4) + '.',
                despues: '' }
            ],
            final: 'c = <b>' + F.n(c, 4) + '</b> y b = <b>' + F.n(b, 4) + '</b>',
            receta: ['c = a &middot; e (despejando de e = c/a)',
              'Elipse: b&sup2; = a&sup2; &minus; c&sup2;',
              'No olvidar la raiz al final',
              'Comprobar: c y b tienen que salir menores que a']
          });
          enun = 'Una elipse tiene a = ' + a + ' y excentricidad e = ' + e + '.<br>Encuentra c y b (4 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['De e = c/a despeja c = a&middot;e.',
            'c = ' + a + ' &middot; ' + e + ' = ' + F.n(c, 4) + '. Ahora b&sup2; = a&sup2; &minus; c&sup2;.'];
          sol = ['c = a&middot;e = ' + a + '(' + e + ') = <b>' + F.n(c, 4) + '</b>',
            'b&sup2; = a&sup2; &minus; c&sup2; = ' + (a * a) + ' &minus; ' + F.n(c * c, 4) + ' = ' + F.n(a * a - c * c, 4),
            'b = <b>' + F.n(b, 4) + '</b>'];
        } else if (t2 === 'despejaB') {
          a = r.entero(4, 12);
          e = r.elige([1.25, 1.5, 2, 2.5]);
          c = a * e;
          b = Math.sqrt(c * c - a * a);
          guiaDelPaso = G({
            intro: 'Una hiperbola con a = <b>' + a + '</b> y e = <b>' + e + '</b>; hay que encontrar c y b.<br>' +
              'El primer paso es identico al de la elipse (c = a &middot; e), pero el segundo se invierte: ' +
              'como aqui <b>c es mayor que a</b>, la resta va al reves.',
            pasos: [
              { pregunta: 'Calcula c = ' + a + ' &times; ' + e + ' (4 decimales)',
                resp: R.numero(c, { dec: 4, tol: 0.01 }),
                pista: 'De e = c/a se despeja c = a &middot; e, igual que en la elipse.',
                despues: 'c = ' + F.n(c, 4) + '. Fijate que es MAYOR que a = ' + a + ', porque e &gt; 1.' },
              { pregunta: 'En la hiperbola, &iquest;cual es la relacion con b?',
                resp: R.opcion(['b&sup2; = c&sup2; &minus; a&sup2;', 'b&sup2; = a&sup2; &minus; c&sup2;'], 0),
                pista: 'Siempre el mayor menos el menor, o daria negativo. Como aqui c &gt; a, va c&sup2; primero. ' +
                  '(En la elipse era al reves porque ahi a &gt; c.)',
                despues: '' },
              { pregunta: 'Calcula b&sup2; = ' + F.n(c * c, 4) + ' &minus; ' + (a * a) + ' (4 decimales)',
                resp: R.numero(c * c - a * a, { dec: 4, tol: 0.05 }),
                pista: 'Eleva c al cuadrado y restale ' + (a * a) + '.',
                despues: '' },
              { pregunta: 'Saca la raiz para obtener b. (4 decimales)',
                resp: R.numero(b, { dec: 4, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + F.n(c * c - a * a, 4) + '</span>.',
                despues: 'Con a y b ya se puede escribir la hiperbola completa y sus asintotas.' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
                ]),
                pista: 'c = ' + F.n(c, 4) + ' y b = ' + F.n(b, 4) + '.',
                despues: '' }
            ],
            final: 'c = <b>' + F.n(c, 4) + '</b> y b = <b>' + F.n(b, 4) + '</b>',
            receta: ['c = a &middot; e (igual que en la elipse)',
              'Hiperbola: b&sup2; = c&sup2; &minus; a&sup2;',
              'Siempre el mayor menos el menor',
              'En la hiperbola c &gt; a porque e &gt; 1']
          });
          enun = 'Una hiperbola tiene a = ' + a + ' y excentricidad e = ' + e + '.<br>Encuentra c y b (4 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['c = a&middot;e igual que siempre; lo que cambia es la relacion con b.',
            'En la hiperbola b&sup2; = c&sup2; &minus; a&sup2;.'];
          sol = ['c = ' + a + '(' + e + ') = <b>' + F.n(c, 4) + '</b>',
            'b&sup2; = c&sup2; &minus; a&sup2; = ' + F.n(c * c, 4) + ' &minus; ' + (a * a) + ' = ' + F.n(c * c - a * a, 4),
            'b = <b>' + F.n(b, 4) + '</b>'];
        } else {
          var rmax = r.entero(120, 900) / 10;
          var rmin = r.entero(50, Math.floor(rmax * 10) - 20) / 10;
          a = (rmax + rmin) / 2;
          c = a - rmin;
          e = c / a;
          guiaDelPaso = G({
            intro: 'La orbita de un planeta es una elipse con el Sol en <b>un foco</b> (primera ley de Kepler). ' +
              'Nos dan la distancia maxima (<b>' + F.n(rmax, 1) + '</b>) y la minima (<b>' + F.n(rmin, 1) + '</b>) en millones de km.<br>' +
              'El truco esta en traducir esas dos distancias al lenguaje de la elipse. Una vez traducidas, ' +
              'sale un sistema de dos ecuaciones que se resuelve sumando y restando.',
            pasos: [
              { pregunta: 'El Sol esta en un foco, a distancia c del centro. El punto MAS LEJANO de la orbita esta a ' +
                  'distancia a del centro, del lado contrario.<br>&iquest;A que equivale entonces la distancia maxima?',
                resp: R.opcion(['a + c', 'a &minus; c'], 0),
                pista: 'Se recorre del Sol al centro (c) y del centro al extremo opuesto (a). Se suman.',
                despues: 'Y por el mismo razonamiento, la minima es a &minus; c.' },
              { pregunta: 'Tenemos a + c = ' + F.n(rmax, 1) + ' y a &minus; c = ' + F.n(rmin, 1) + '.<br>' +
                  'Si sumas las dos ecuaciones, la c se cancela y queda 2a. &iquest;Cuanto vale a? (4 decimales)',
                resp: R.numero(a, { dec: 4, tol: 0.01 }),
                pista: '(' + F.n(rmax, 1) + ' + ' + F.n(rmin, 1) + ') &divide; 2 = ' + F.n(a, 4) + '. Es el promedio de las dos distancias.',
                despues: 'a es el semieje mayor de la orbita.' },
              { pregunta: 'Ahora restalas: se cancela la a y queda 2c.<br>&iquest;Cuanto vale c? (4 decimales)',
                resp: R.numero(c, { dec: 4, tol: 0.01 }),
                pista: '(' + F.n(rmax, 1) + ' &minus; ' + F.n(rmin, 1) + ') &divide; 2 = ' + F.n(c, 4) + '. Es lo descentrado que esta el Sol.',
                despues: '' },
              { pregunta: 'Finalmente e = c/a = ' + F.n(c, 4) + ' &divide; ' + F.n(a, 4) + ' (4 decimales)',
                resp: R.numero(e, { dec: 4, tol: 0.005 }),
                pista: 'Division directa.',
                despues: e < 0.2 ? 'Es una orbita bastante redonda, como la de la mayoria de los planetas (la Tierra tiene e &asymp; 0.017).'
                  : 'Es una orbita notablemente alargada, mas parecida a la de un cometa que a la de un planeta.' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'a', resp: R.numero(a, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'e', resp: R.numero(e, { dec: 4, tol: 0.005 }) }
                ]),
                pista: 'a = ' + F.n(a, 4) + ', c = ' + F.n(c, 4) + ' y e = ' + F.n(e, 4) + '.',
                despues: '' }
            ],
            final: 'a = <b>' + F.n(a, 4) + '</b>, c = <b>' + F.n(c, 4) + '</b> y e = <b>' + F.n(e, 4) + '</b>',
            receta: ['Distancia maxima = a + c, minima = a &minus; c',
              'Sumando las dos ecuaciones sale 2a',
              'Restandolas sale 2c',
              'a es el promedio de las dos distancias',
              'e = c/a, y en los planetas suele salir cerca de 0']
          });
          enun = 'La orbita de un planeta es una elipse con el Sol en un foco.<br>' +
            'Su distancia maxima al Sol es ' + F.n(rmax, 1) + ' millones de km y la minima es ' + F.n(rmin, 1) + ' millones de km.<br>' +
            'Calcula a, c y la excentricidad de la orbita (4 decimales).';
          resp = R.varios([
            { etiqueta: 'a', resp: R.numero(a, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'c', resp: R.numero(c, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'e', resp: R.numero(e, { dec: 4, tol: 0.005 }) }
          ]);
          pistas = ['La distancia maxima es a + c y la minima es a &minus; c.',
            'Sumando las dos distancias obtienes 2a; restandolas obtienes 2c.'];
          sol = ['a + c = ' + F.n(rmax, 1) + ' y a &minus; c = ' + F.n(rmin, 1),
            'Sumando: 2a = ' + F.n(rmax + rmin, 2) + ' &rArr; a = <b>' + F.n(a, 4) + '</b>',
            'Restando: 2c = ' + F.n(rmax - rmin, 2) + ' &rArr; c = <b>' + F.n(c, 4) + '</b>',
            'e = c/a = <b>' + F.n(e, 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
