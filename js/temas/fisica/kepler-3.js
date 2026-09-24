/* Tercera ley de Kepler: T^2 = a^3 (en anos y UA). */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  var PLANETAS = [
    { n: 'Mercurio', a: 0.387, T: 0.241 },
    { n: 'Venus', a: 0.723, T: 0.615 },
    { n: 'Marte', a: 1.524, T: 1.881 },
    { n: 'Jupiter', a: 5.203, T: 11.862 },
    { n: 'Saturno', a: 9.537, T: 29.457 },
    { n: 'Urano', a: 19.19, T: 84.02 },
    { n: 'Neptuno', a: 30.07, T: 164.8 }
  ];

  var extra = {};

  /* ---------------- periodo a partir del semieje ---------------- */
  extra.periodo = function (r) {
    var p = r.elige(PLANETAS);
    var a3 = Math.pow(p.a, 3);
    var T = Math.sqrt(a3);
    return {
      guia: G({
        intro: 'El semieje mayor de la orbita de <b>' + p.n + '</b> es <b>' + F.n(p.a, 3) + ' UA</b>. ' +
          'Queremos cuanto tarda en dar una vuelta al Sol.<br>' +
          'En las unidades de casa (anos y UA) la tercera ley queda comodisima: <b>T&sup2; = a&sup3;</b>, ' +
          'sin ninguna constante que estorbe.',
        pasos: [
          {
            seccion: 'Paso 1: la relacion',
            queHacemos: 'Escribimos la tercera ley.',
            paraQue: 'El cuadrado del periodo va con el CUBO del semieje. Por eso los planetas lejanos tardan desproporcionadamente mas.',
            queda: 'T&sup2; = ' + F.n(p.a, 3) + '&sup3;',
            pregunta: 'Con T en anos y a en UA, &iquest;como se relacionan?',
            resp: R.opcion(['T&sup2; = a&sup3;', 'T = a&sup2;'], 0),
            pista: 'Es la unica ley de Kepler con exponentes: cuadrado a un lado, cubo al otro.',
            despues: 'Esta forma tan limpia solo funciona en anos y UA.'
          },
          {
            seccion: 'Paso 2: el cubo del semieje',
            queHacemos: 'Elevamos a al cubo.',
            paraQue: 'Ese numero es T al cuadrado, no el periodo. Confundirlos es el error tipico.',
            queda: 'T&sup2; = ' + F.n(a3, 4),
            pregunta: 'Calcula ' + F.n(p.a, 3) + '&sup3; (4 decimales)',
            resp: R.numero(a3, { dec: 4, tol: Math.max(0.01, a3 * 0.004) }),
            pista: F.n(p.a, 3) + ' &times; ' + F.n(p.a, 3) + ' &times; ' + F.n(p.a, 3) + '.',
            despues: 'Eso todavia es T&sup2;.'
          },
          {
            seccion: 'Paso 3: sacar la raiz',
            queHacemos: 'Sacamos la raiz cuadrada.',
            paraQue: 'El paso que mas se olvida. Comprobacion: el valor real es ' + F.n(p.T, 3) + ' anos.',
            queda: 'T = ' + F.n(T, 3) + ' anos',
            pregunta: 'Saca la raiz de ' + F.n(a3, 4) + ' (3 decimales)',
            resp: R.numero(T, { dec: 3, tol: Math.max(0.01, T * 0.01), unidad: 'anos' }),
            pista: '&radic;<span class="rad">' + F.n(a3, 4) + '</span>.',
            despues: 'Coincide con el dato real de ' + F.n(p.T, 3) + ' anos.'
          },
          {
            seccion: 'Paso 4: por que crece tan rapido',
            queHacemos: 'Pensamos que pasa al alejarse.',
            paraQue: 'No es solo que el camino sea mas largo: ademas el planeta va MAS LENTO, porque el Sol lo atrae con menos fuerza. Las dos cosas se suman.',
            queda: 'T = ' + F.n(T, 3) + ' anos',
            pregunta: 'Un planeta al doble de distancia, &iquest;tarda el doble en dar la vuelta?',
            resp: R.opcion(['No: tarda casi el triple (2&sup3;&#8260;&sup2; &asymp; 2.83 veces)',
              'Si: el doble de distancia, el doble de tiempo'], 0),
            pista: 'T crece como a elevado a 3/2, no como a.',
            despues: ''
          }
        ],
        final: '<b>' + p.n + '</b> tarda <b>' + F.n(T, 3) + ' anos</b> en dar una vuelta',
        receta: ['En anos y UA: T&sup2; = a&sup3;',
          'Elevar a al cubo',
          'Sacar la raiz cuadrada al final',
          'Doble distancia no es doble tiempo: es 2.83 veces']
      }),
      enunciado: 'El semieje mayor de la orbita de ' + p.n + ' es ' + F.n(p.a, 3) + ' UA.<br>' +
        '&iquest;Cuanto dura su ano? (3 decimales, en anos terrestres)',
      respuesta: R.numero(T, { dec: 3, tol: Math.max(0.01, T * 0.01), unidad: 'anos' }),
      pistas: ['Con T en anos y a en UA se cumple T&sup2; = a&sup3;.',
        'a&sup3; = ' + F.n(p.a, 3) + '&sup3; = ' + F.n(a3, 4) + ', y de ahi la raiz.'],
      solucion: ['Tercera ley en anos y UA: T&sup2; = a&sup3;',
        'a&sup3; = ' + F.n(p.a, 3) + '&sup3; = ' + F.n(a3, 4),
        'T = &radic;<span class="rad">' + F.n(a3, 4) + '</span> = <b>' + F.n(T, 3) + ' anos</b>']
    };
  };

  /* ---------------- semieje a partir del periodo ---------------- */
  extra.semieje = function (r) {
    var p = r.elige(PLANETAS);
    var T2 = p.T * p.T;
    var a = Math.pow(T2, 1 / 3);
    return {
      guia: G({
        intro: 'El ano de <b>' + p.n + '</b> dura <b>' + F.n(p.T, 3) + ' anos terrestres</b>.<br>' +
          'Ahora el problema va al reves: del periodo al semieje. Hay que despejar la <b>a</b>, ' +
          'y eso lleva una raiz cubica.',
        pasos: [
          {
            seccion: 'Paso 1: el cuadrado del periodo',
            queHacemos: 'Elevamos T al cuadrado.',
            paraQue: 'De T&sup2; = a&sup3;, ese numero ya es directamente a&sup3;.',
            queda: 'a&sup3; = ' + F.n(T2, 4),
            pregunta: 'Calcula ' + F.n(p.T, 3) + '&sup2; (4 decimales)',
            resp: R.numero(T2, { dec: 4, tol: Math.max(0.01, T2 * 0.004) }),
            pista: F.n(p.T, 3) + ' &times; ' + F.n(p.T, 3) + '.',
            despues: 'Ese numero es a al cubo.'
          },
          {
            seccion: 'Paso 2: la raiz cubica',
            queHacemos: 'Sacamos la raiz cubica.',
            paraQue: 'Para deshacer un cubo hace falta raiz cubica, no cuadrada. En la calculadora suele ser x elevado a (1/3).',
            queda: 'a = ' + F.n(a, 3) + ' UA',
            pregunta: 'Calcula la raiz cubica de ' + F.n(T2, 4) + ' (3 decimales)',
            resp: R.numero(a, { dec: 3, tol: Math.max(0.01, a * 0.01), unidad: 'UA' }),
            pista: 'Eleva ' + F.n(T2, 4) + ' a la potencia 1/3, o sea 0.3333.',
            despues: 'El valor real es ' + F.n(p.a, 3) + ' UA: cuadra.'
          },
          {
            seccion: 'Paso 3: comprobar al reves',
            queHacemos: 'Elevamos el resultado al cubo para verificar.',
            paraQue: 'Comprobar deshaciendo la operacion es la forma mas segura de cazar un error de raiz.',
            queda: 'a = ' + F.n(a, 3) + ' UA  (comprobado)',
            pregunta: 'Calcula ' + F.n(a, 3) + '&sup3; y comprueba que da T&sup2; (4 decimales)',
            resp: R.numero(T2, { dec: 4, tol: Math.max(0.02, T2 * 0.01) }),
            pista: 'Debe darte otra vez ' + F.n(T2, 4) + '.',
            despues: 'Coincide, asi que la raiz cubica esta bien hecha.'
          }
        ],
        final: 'El semieje mayor es <b>' + F.n(a, 3) + ' UA</b>',
        receta: ['T&sup2; = a&sup3;',
          'Elevar T al cuadrado: eso ya es a&sup3;',
          'Raiz CUBICA para llegar a la a',
          'Comprobar elevando al cubo el resultado']
      }),
      enunciado: 'El ano de ' + p.n + ' dura ' + F.n(p.T, 3) + ' anos terrestres.<br>' +
        '&iquest;Cual es el semieje mayor de su orbita? (3 decimales, en UA)',
      respuesta: R.numero(a, { dec: 3, tol: Math.max(0.01, a * 0.01), unidad: 'UA' }),
      pistas: ['De T&sup2; = a&sup3; se despeja a con una raiz cubica.',
        'T&sup2; = ' + F.n(T2, 4) + ', y a es la raiz cubica de ese numero.'],
      solucion: ['T&sup2; = a&sup3;',
        'T&sup2; = ' + F.n(p.T, 3) + '&sup2; = ' + F.n(T2, 4),
        'a = raiz cubica de ' + F.n(T2, 4) + ' = <b>' + F.n(a, 3) + ' UA</b>']
    };
  };

  EJ.tema({
    id: 'kepler-3',
    materia: 'fisica',
    grupo: 'Gravitacion',
    nombre: 'Tercera ley de Kepler (periodos)',
    descripcion: 'La relacion T2 = a3 entre el periodo orbital y el tamano de la orbita.',
    etiquetas: ['kepler', 'periodo', 'orbita', 'semieje'],
    formulario: '<b>Tercera ley:</b> el cuadrado del periodo es proporcional al cubo del semieje mayor.<br>' +
      'T&sup2; / a&sup3; = constante, la misma para todos los cuerpos que giran alrededor del mismo astro.<br>' +
      '<b>Con T en anos y a en UA (Sol): T&sup2; = a&sup3;</b><br>' +
      'Comparando dos cuerpos: (T<sub>1</sub>/T<sub>2</sub>)&sup2; = (a<sub>1</sub>/a<sub>2</sub>)&sup3;<br>' +
      '<small>Lejos se tarda mucho mas, por dos razones: el camino es mas largo Y ademas se va mas lento.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['relacion', 'Que relacion hay'],
          ['masLejos', 'Cual tarda mas'],
          ['periodo', 'Calcular el periodo']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        if (tf === 'relacion') {
          guiaDelPaso = G({
            intro: 'Kepler tardo anos en dar con esta relacion. Probo con T y a, con T&sup2; y a, con todo, ' +
              'hasta que un dia encajaron <b>T&sup2; y a&sup3;</b>.<br>' +
              'Es la unica de sus tres leyes que relaciona planetas <b>distintos</b> entre si.',
            pasos: [
              {
                seccion: 'Paso 1: que compara',
                queHacemos: 'Vemos que magnitudes relaciona.',
                paraQue: 'Las otras dos leyes describen UNA orbita. Esta compara unas con otras: por eso permite deducir distancias a partir de tiempos.',
                queda: 'relaciona el periodo con el tamano de la orbita',
                pregunta: '&iquest;Que relaciona la tercera ley?',
                resp: R.opcion(['El periodo con el tamano de la orbita', 'La velocidad con la distancia al Sol'], 0),
                pista: 'La de la velocidad con la distancia es la segunda ley.',
                despues: ''
              },
              {
                seccion: 'Paso 2: con que exponentes',
                queHacemos: 'Recordamos la formula.',
                paraQue: 'Cuadrado del tiempo, cubo de la distancia. El orden importa: al reves no cuadra con ningun planeta.',
                queda: 'T&sup2; = a&sup3;',
                pregunta: '&iquest;Cual es la relacion, con T en anos y a en UA?',
                resp: R.opcion(['T&sup2; = a&sup3;', 'T&sup3; = a&sup2;'], 0),
                pista: 'Comprueba con la Tierra: T = 1 y a = 1, lo cual encaja con las dos. Prueba con Marte: a = 1.524 y T = 1.881.',
                despues: 'Con Marte: 1.881&sup2; = 3.54 y 1.524&sup3; = 3.54. Cuadra.'
              }
            ],
            final: 'La relacion es <b>T&sup2; = a&sup3;</b>',
            receta: ['Cuadrado del periodo, cubo del semieje',
              'Con anos y UA no hace falta constante',
              'Es la unica ley que compara planetas distintos',
              'Comprobar siempre con un planeta conocido']
          });
          enun = 'Segun la tercera ley de Kepler, con T en anos y a en UA, &iquest;que relacion se cumple?';
          resp = R.opcion(['T&sup2; = a&sup3;', 'T&sup3; = a&sup2;'], 0);
          pistas = ['Es la unica ley de Kepler con exponentes.',
            'Compruebalo con Marte: a = 1.524 y T = 1.881.'];
          sol = ['La tercera ley relaciona el periodo con el tamano de la orbita',
            'Con T en anos y a en UA: <b>T&sup2; = a&sup3;</b>',
            'Con Marte: 1.881&sup2; = 3.54 y 1.524&sup3; = 3.54'];

        } else {
          var pa = r.elige(PLANETAS);
          var resto = PLANETAS.filter(function (x) { return x.n !== pa.n; });
          var pb = r.elige(resto);
          var lejos = pa.a > pb.a ? pa : pb;
          guiaDelPaso = G({
            intro: 'Comparamos <b>' + pa.n + '</b> (a = ' + F.n(pa.a, 3) + ' UA) con <b>' + pb.n + '</b> ' +
              '(a = ' + F.n(pb.a, 3) + ' UA).<br>' +
              'Esta se puede responder sin calcular nada, pero conviene entender <b>por que</b>.',
            pasos: [
              {
                seccion: 'Paso 1: cual esta mas lejos',
                queHacemos: 'Comparamos los semiejes.',
                paraQue: 'Mayor semieje quiere decir orbita mas grande.',
                queda: 'mas lejos: ' + lejos.n,
                pregunta: '&iquest;Cual tiene la orbita mas grande?',
                resp: R.opcion([lejos.n, lejos.n === pa.n ? pb.n : pa.n], 0),
                pista: 'El de mayor semieje mayor.',
                despues: ''
              },
              {
                seccion: 'Paso 2: las dos razones',
                queHacemos: 'Pensamos por que tarda mas.',
                paraQue: 'No es solo que el camino sea mas largo. Ademas va mas lento, porque el Sol lo atrae con menos fuerza. Por eso el efecto es tan exagerado.',
                queda: 'camino mas largo Y ademas mas lento',
                pregunta: '&iquest;Por que un planeta lejano tarda tanto mas?',
                resp: R.opcion(['Porque recorre mas camino y ademas va mas lento',
                  'Solo porque recorre mas camino'], 0),
                pista: 'Neptuno esta 30 veces mas lejos que la Tierra, pero su ano dura 165 anos, no 30.',
                despues: 'Si solo fuera el camino, Neptuno tardaria 30 anos, no 165.'
              },
              {
                seccion: 'Paso 3: responder',
                queHacemos: 'Damos la respuesta.',
                paraQue: 'El ano de ' + lejos.n + ' dura ' + F.n(lejos.T, 2) + ' anos terrestres.',
                queda: lejos.n + ' tarda mas',
                pregunta: '&iquest;Cual tarda mas en dar una vuelta al Sol?',
                resp: R.opcion([lejos.n, lejos.n === pa.n ? pb.n : pa.n], 0),
                pista: 'El que esta mas lejos, siempre.',
                despues: ''
              }
            ],
            final: '<b>' + lejos.n + '</b> tarda mas: ' + F.n(lejos.T, 2) + ' anos',
            receta: ['Mas lejos del Sol, mas tarda',
              'Por el camino mas largo Y por ir mas lento',
              'T crece como a elevado a 3/2',
              'Neptuno: 30 veces mas lejos, 165 veces mas tiempo']
          });
          enun = pa.n + ' esta a ' + F.n(pa.a, 3) + ' UA y ' + pb.n + ' a ' + F.n(pb.a, 3) + ' UA.<br>' +
            '&iquest;Cual tarda mas en dar una vuelta al Sol?';
          resp = R.opcion([lejos.n, lejos.n === pa.n ? pb.n : pa.n], 0);
          pistas = ['Cuanto mayor es el semieje, mayor es el periodo.',
            'Ademas de recorrer mas camino, el planeta lejano va mas lento.'];
          sol = ['La tercera ley dice que T crece con a',
            lejos.n + ' tiene la orbita mas grande',
            'Por eso <b>' + lejos.n + '</b> tarda mas: ' + F.n(lejos.T, 2) + ' anos'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['periodo', 'Periodo desde el semieje'],
          ['semieje', 'Semieje desde el periodo'],
          ['constante', 'Comprobar la constante']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var pc = r.elige(PLANETAS);
        var k = pc.T * pc.T / Math.pow(pc.a, 3);
        guiaDelPaso = G({
          intro: 'Vamos a comprobar la tercera ley con <b>' + pc.n + '</b>: a = ' + F.n(pc.a, 3) + ' UA ' +
            'y T = ' + F.n(pc.T, 3) + ' anos.<br>' +
            'Si la ley es cierta, el cociente <b>T&sup2;/a&sup3;</b> tiene que dar <b>1</b> en estas unidades, ' +
            'para este planeta y para todos los demas.',
          pasos: [
            {
              seccion: 'Paso 1: el cuadrado del periodo',
              queHacemos: 'Elevamos T al cuadrado.',
              paraQue: 'Es el numerador del cociente que vamos a comprobar.',
              queda: 'T&sup2; = ' + F.n(pc.T * pc.T, 4),
              pregunta: 'Calcula ' + F.n(pc.T, 3) + '&sup2; (4 decimales)',
              resp: R.numero(pc.T * pc.T, { dec: 4, tol: Math.max(0.01, pc.T * pc.T * 0.004) }),
              pista: 'Multiplicalo por si mismo.',
              despues: ''
            },
            {
              seccion: 'Paso 2: el cubo del semieje',
              queHacemos: 'Elevamos a al cubo.',
              paraQue: 'El denominador. Si la ley funciona, tiene que salir un numero muy parecido al anterior.',
              queda: 'a&sup3; = ' + F.n(Math.pow(pc.a, 3), 4),
              pregunta: 'Calcula ' + F.n(pc.a, 3) + '&sup3; (4 decimales)',
              resp: R.numero(Math.pow(pc.a, 3), { dec: 4, tol: Math.max(0.01, Math.pow(pc.a, 3) * 0.004) }),
              pista: 'Tres veces multiplicado por si mismo.',
              despues: 'Fijate que se parece muchisimo al T&sup2; de antes.'
            },
            {
              seccion: 'Paso 3: el cociente',
              queHacemos: 'Dividimos uno entre otro.',
              paraQue: 'Si da practicamente 1, la ley se cumple. Las pequenas diferencias vienen de que los datos estan redondeados.',
              queda: 'T&sup2;/a&sup3; = ' + F.n(k, 4),
              pregunta: 'Calcula ' + F.n(pc.T * pc.T, 4) + ' / ' + F.n(Math.pow(pc.a, 3), 4) + ' (4 decimales)',
              resp: R.numero(k, { dec: 4, tol: 0.02 }),
              pista: 'Division directa. Deberia darte casi 1.',
              despues: 'Da practicamente 1, como predice la ley.'
            },
            {
              seccion: 'Paso 4: que significa que sea constante',
              queHacemos: 'Pensamos que pasa con los demas planetas.',
              paraQue: 'Ese mismo cociente da 1 para TODOS los planetas del Sol. Es lo que convierte la ley en una herramienta: mides el periodo y deduces la distancia.',
              queda: 'T&sup2;/a&sup3; = 1 para todos',
              pregunta: 'Si hicieras lo mismo con otro planeta del Sol, &iquest;que obtendrias?',
              resp: R.opcion(['Tambien 1, practicamente', 'Un numero distinto para cada uno'], 0),
              pista: 'Por eso se llama constante: es la misma para todo lo que gira alrededor del Sol.',
              despues: 'Alrededor de otro astro la constante seria otra, pero igual para todos sus satelites.'
            }
          ],
          final: 'T&sup2;/a&sup3; = <b>' + F.n(k, 4) + '</b>, practicamente 1: la ley se cumple',
          receta: ['Calcular T&sup2; y a&sup3; por separado',
            'Dividirlos',
            'En anos y UA debe dar 1',
            'El mismo valor sale para todos los planetas del Sol']
        });
        enun = 'Para ' + pc.n + ', a = ' + F.n(pc.a, 3) + ' UA y T = ' + F.n(pc.T, 3) + ' anos.<br>' +
          'Calcula T&sup2;/a&sup3; y comprueba la tercera ley (4 decimales).';
        resp = R.numero(k, { dec: 4, tol: 0.02 });
        pistas = ['Calcula T&sup2; y a&sup3; por separado y divide.',
          'Si la ley se cumple, el resultado debe ser practicamente 1.'];
        sol = ['T&sup2; = ' + F.n(pc.T, 3) + '&sup2; = ' + F.n(pc.T * pc.T, 4),
          'a&sup3; = ' + F.n(pc.a, 3) + '&sup3; = ' + F.n(Math.pow(pc.a, 3), 4),
          'T&sup2;/a&sup3; = <b>' + F.n(k, 4) + '</b>, practicamente 1'];

      } else {
        var t3 = r.subtema([
          ['comparar', 'Comparar dos planetas'],
          ['satelite', 'Satelite artificial'],
          ['semieje', 'Semieje desde el periodo']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'comparar') {
          var f1 = r.elige(PLANETAS);
          var otros2 = PLANETAS.filter(function (x) { return x.n !== f1.n; });
          var f2 = r.elige(otros2);
          var razonA = f2.a / f1.a;
          var razonT = Math.pow(razonA, 1.5);
          guiaDelPaso = G({
            intro: '<b>' + f2.n + '</b> esta <b>' + F.n(razonA, 3) + ' veces</b> mas lejos del Sol que <b>' + f1.n + '</b>.<br>' +
              'Queremos cuantas veces mas dura su ano, sin calcular ningun periodo concreto: ' +
              'solo con <b>proporciones</b>.',
            pasos: [
              {
                seccion: 'Paso 1: la ley en forma de proporcion',
                queHacemos: 'Escribimos la tercera ley comparando dos cuerpos.',
                paraQue: 'Asi la constante desaparece y solo quedan las proporciones. Sirve aunque no sepas los valores absolutos.',
                queda: '(T<sub>2</sub>/T<sub>1</sub>)&sup2; = (' + F.n(razonA, 3) + ')&sup3;',
                pregunta: 'Comparando dos planetas, &iquest;que relacion se cumple?',
                resp: R.opcion(['(T<sub>2</sub>/T<sub>1</sub>)&sup2; = (a<sub>2</sub>/a<sub>1</sub>)&sup3;',
                  '(T<sub>2</sub>/T<sub>1</sub>)&sup3; = (a<sub>2</sub>/a<sub>1</sub>)&sup2;'], 0),
                pista: 'Los exponentes van igual que en T&sup2; = a&sup3;.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el cubo de la proporcion',
                queHacemos: 'Elevamos al cubo la razon de distancias.',
                paraQue: 'Ese numero es la proporcion de periodos AL CUADRADO, todavia no la proporcion de periodos.',
                queda: '(T<sub>2</sub>/T<sub>1</sub>)&sup2; = ' + F.n(Math.pow(razonA, 3), 3),
                pregunta: 'Calcula ' + F.n(razonA, 3) + '&sup3; (3 decimales)',
                resp: R.numero(Math.pow(razonA, 3), { dec: 3, tol: Math.max(0.05, Math.pow(razonA, 3) * 0.01) }),
                pista: 'Tres veces multiplicado por si mismo.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la raiz',
                queHacemos: 'Sacamos la raiz cuadrada.',
                paraQue: 'Ahora si sale cuantas veces mas dura el ano. Comprobacion con los datos reales: ' + F.n(f2.T / f1.T, 2) + ' veces.',
                queda: 'su ano dura ' + F.n(razonT, 2) + ' veces mas',
                pregunta: 'Saca la raiz de ' + F.n(Math.pow(razonA, 3), 3) + ' (2 decimales)',
                resp: R.numero(razonT, { dec: 2, tol: Math.max(0.05, razonT * 0.02) }),
                pista: '&radic;<span class="rad">' + F.n(Math.pow(razonA, 3), 3) + '</span>.',
                despues: 'Con los periodos reales: ' + F.n(f2.T, 2) + ' / ' + F.n(f1.T, 2) + ' = ' + F.n(f2.T / f1.T, 2) + '. Cuadra.'
              },
              {
                seccion: 'Paso 4: leer el resultado',
                queHacemos: 'Comparamos las dos proporciones.',
                paraQue: 'Esta ' + F.n(razonA, 2) + ' veces mas lejos pero tarda ' + F.n(razonT, 2) + ' veces mas. El tiempo crece mas deprisa que la distancia.',
                queda: F.n(razonA, 2) + ' veces mas lejos, ' + F.n(razonT, 2) + ' veces mas tiempo',
                pregunta: '&iquest;Que crece mas rapido, la distancia o el periodo?',
                resp: R.opcion(['El periodo', 'La distancia'], 0),
                pista: 'Compara ' + F.n(razonA, 2) + ' con ' + F.n(razonT, 2) + '.',
                despues: ''
              }
            ],
            final: 'El ano de ' + f2.n + ' dura <b>' + F.n(razonT, 2) + ' veces</b> el de ' + f1.n,
            receta: ['Comparando dos cuerpos: (T<sub>2</sub>/T<sub>1</sub>)&sup2; = (a<sub>2</sub>/a<sub>1</sub>)&sup3;',
              'Elevar al cubo la razon de distancias',
              'Sacar la raiz para llegar a la razon de periodos',
              'El periodo crece mas rapido que la distancia']
          });
          enun = f2.n + ' esta ' + F.n(razonA, 3) + ' veces mas lejos del Sol que ' + f1.n + '.<br>' +
            '&iquest;Cuantas veces mas dura su ano? (2 decimales)';
          resp = R.numero(razonT, { dec: 2, tol: Math.max(0.05, razonT * 0.02) });
          pistas = ['Comparando dos cuerpos: (T<sub>2</sub>/T<sub>1</sub>)&sup2; = (a<sub>2</sub>/a<sub>1</sub>)&sup3;.',
            '(' + F.n(razonA, 3) + ')&sup3; = ' + F.n(Math.pow(razonA, 3), 3) + ', y de ahi la raiz.'];
          sol = ['(T<sub>2</sub>/T<sub>1</sub>)&sup2; = (a<sub>2</sub>/a<sub>1</sub>)&sup3;',
            '(' + F.n(razonA, 3) + ')&sup3; = ' + F.n(Math.pow(razonA, 3), 3),
            'T<sub>2</sub>/T<sub>1</sub> = &radic;<span class="rad">' + F.n(Math.pow(razonA, 3), 3) + '</span> = <b>' + F.n(razonT, 2) + '</b>'];

        } else {
          /* satelites de la Tierra: se compara con la Luna */
          var rLuna = 384400, TLuna = 27.32;
          var rSat = r.elige([7000, 10000, 15000, 20000, 26600, 42164]);
          var Tsat = TLuna * Math.pow(rSat / rLuna, 1.5);
          var horas = Tsat * 24;
          guiaDelPaso = G({
            intro: 'Un satelite gira alrededor de la <b>Tierra</b> a <b>' + rSat + ' km</b> del centro.<br>' +
              'La tercera ley tambien vale aqui, pero la constante ya <b>no es 1</b>: eso solo pasa con el Sol ' +
              'en anos y UA. El truco es <b>compararlo con la Luna</b>, que tambien gira alrededor de la Tierra.',
            pasos: [
              {
                seccion: 'Paso 1: por que no vale T&sup2; = a&sup3;',
                queHacemos: 'Vemos que cambia al salir del Sol.',
                paraQue: 'La constante depende de la masa del astro central. La de la Tierra es muy distinta a la del Sol.',
                queda: 'hay que compararlo con otro satelite de la Tierra',
                pregunta: '&iquest;Por que no se puede usar T&sup2; = a&sup3; directamente?',
                resp: R.opcion(['Porque esa forma solo vale para el Sol, en anos y UA',
                  'Porque los satelites artificiales no obedecen a Kepler'], 0),
                pista: 'La constante de Kepler depende del astro alrededor del cual se gira.',
                despues: 'Por eso comparamos con la Luna, que gira alrededor de lo mismo.'
              },
              {
                seccion: 'Paso 2: la razon de distancias',
                queHacemos: 'Dividimos el radio del satelite entre el de la Luna.',
                paraQue: 'La Luna esta a 384 400 km y tarda 27.32 dias. Es nuestra referencia.',
                queda: F.n(rSat / rLuna, 5) + ' veces la distancia de la Luna',
                pregunta: 'Calcula ' + rSat + ' / 384400 (5 decimales)',
                resp: R.numero(rSat / rLuna, { dec: 5, tol: 0.0005 }),
                pista: 'Division directa.',
                despues: 'Mucho mas cerca que la Luna, asi que tardara mucho menos.'
              },
              {
                seccion: 'Paso 3: elevar a 3/2',
                queHacemos: 'Elevamos esa razon al cubo y sacamos la raiz.',
                paraQue: 'Es la misma operacion de siempre: (T/T<sub>L</sub>)&sup2; = (r/r<sub>L</sub>)&sup3;.',
                queda: F.n(Math.pow(rSat / rLuna, 1.5), 5) + ' veces el periodo lunar',
                pregunta: 'Calcula ' + F.n(rSat / rLuna, 5) + ' elevado a 1.5 (5 decimales)',
                resp: R.numero(Math.pow(rSat / rLuna, 1.5), { dec: 5, tol: 0.0008 }),
                pista: 'Elevalo al cubo y luego saca la raiz, o usa directamente el exponente 1.5.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el periodo en horas',
                queHacemos: 'Multiplicamos por el periodo de la Luna y pasamos a horas.',
                paraQue: 'Comprobacion: a 42 164 km sale casi exactamente 24 h, que es la orbita geoestacionaria de los satelites de television.',
                queda: 'T = ' + F.n(horas, 2) + ' horas',
                pregunta: 'Multiplica por 27.32 dias y pasa a horas: &times; 24 (2 decimales)',
                resp: R.numero(horas, { dec: 2, tol: Math.max(0.3, horas * 0.02), unidad: 'horas' }),
                pista: F.n(Math.pow(rSat / rLuna, 1.5), 5) + ' &times; 27.32 &times; 24.',
                despues: rSat === 42164 ? 'Salen 24 h: esa es justo la orbita geoestacionaria.' : 'Mucho menos que los 27 dias de la Luna, como era de esperar.'
              }
            ],
            final: 'El satelite tarda <b>' + F.n(horas, 2) + ' horas</b> en dar una vuelta',
            receta: ['T&sup2; = a&sup3; solo vale para el Sol, en anos y UA',
              'Alrededor de otro astro hay que comparar con algo que lo orbite',
              'Para la Tierra: la Luna, a 384 400 km y 27.32 dias',
              '(T/T<sub>L</sub>)&sup2; = (r/r<sub>L</sub>)&sup3;',
              'A 42 164 km el periodo es de 24 h: orbita geoestacionaria']
          });
          enun = 'Un satelite gira alrededor de la Tierra a ' + rSat + ' km del centro.<br>' +
            'Sabiendo que la Luna esta a 384400 km y tarda 27.32 dias, &iquest;cuanto tarda el satelite? (2 decimales, en horas)';
          resp = R.numero(horas, { dec: 2, tol: Math.max(0.3, horas * 0.02), unidad: 'horas' });
          pistas = ['Compara el satelite con la Luna: los dos giran alrededor de la Tierra.',
            '(T/T<sub>Luna</sub>)&sup2; = (r/r<sub>Luna</sub>)&sup3;, con r/r<sub>Luna</sub> = ' + F.n(rSat / rLuna, 5) + '.'];
          sol = ['La forma T&sup2; = a&sup3; solo vale para el Sol; aqui comparo con la Luna',
            'r/r<sub>Luna</sub> = ' + rSat + '/384400 = ' + F.n(rSat / rLuna, 5),
            'T/T<sub>Luna</sub> = (' + F.n(rSat / rLuna, 5) + ')<sup>3/2</sup> = ' + F.n(Math.pow(rSat / rLuna, 1.5), 5),
            'T = ' + F.n(Math.pow(rSat / rLuna, 1.5), 5) + ' &times; 27.32 dias = <b>' + F.n(horas, 2) + ' horas</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
