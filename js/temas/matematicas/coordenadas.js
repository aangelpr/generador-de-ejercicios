/* Coordenadas rectangulares y polares */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }
  function normaliza(g) { var v = g % 360; return v < 0 ? v + 360 : v; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.distanciaPuntoMedio = function (r) {
    var x1 = r.entero(-10, 10), y1 = r.entero(-10, 10);
    var x2 = r.entero(-10, 10), y2 = r.entero(-10, 10);
    while (x1 === x2 && y1 === y2) { x2 = r.entero(-10, 10); y2 = r.entero(-10, 10); }
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    return {
      guia: G({
        intro: 'Dados <b>A(' + x1 + ', ' + y1 + ')</b> y <b>B(' + x2 + ', ' + y2 + ')</b>, piden la distancia y el punto medio.<br>' +
          'Son dos cosas muy distintas aunque se pidan juntas: la distancia es <b>cuanto hay</b> entre los dos (un numero) ' +
          'y el punto medio es <b>donde queda el centro</b> (un punto, con sus dos coordenadas).',
        pasos: [
          { seccion: 'Paso 1: los dos catetos',
            queHacemos: 'Restamos las x para ver cuanto se avanza en horizontal.',
            paraQue: 'Son dos cosas distintas aunque se pidan juntas: la distancia es CUANTO hay, y el punto medio es DONDE queda el centro.',
            queda: '&Delta;x = ' + (x2 - x1) + ',  &Delta;y = ?',
            pregunta: 'Empecemos por la distancia. Cuanto avanza en horizontal: &Delta;x = ' + x2 + ' &minus; (' + x1 + ')',
            resp: R.numero(x2 - x1, { dec: 0 }),
            pista: 'Resta las x, con signos.', despues: '' },
          { seccion: 'Paso 1: los dos catetos',
            queHacemos: 'Ahora las y.',
            paraQue: 'Los dos juntos forman el triangulo rectangulo del que la distancia es la hipotenusa.',
            queda: '&Delta;x = ' + (x2 - x1) + ',  &Delta;y = ' + (y2 - y1),
            pregunta: 'Y en vertical: &Delta;y = ' + y2 + ' &minus; (' + y1 + ')',
            resp: R.numero(y2 - y1, { dec: 0 }),
            pista: 'Ahora las y.',
            despues: 'Esos dos son los catetos de un triangulo rectangulo; la distancia es su hipotenusa.' },
          { seccion: 'Paso 2: la distancia',
            queHacemos: 'Elevamos los dos, sumamos y sacamos la raiz.',
            paraQue: 'La formula de distancia no es nueva: ES Pitagoras.',
            queda: 'distancia = ' + F.n(d, 2) + ';  falta el punto medio',
            pregunta: 'Aplica Pitagoras: &radic;<span class="rad">(' + (x2 - x1) + ')&sup2; + (' + (y2 - y1) + ')&sup2;</span> (2 decimales)',
            resp: R.numero(d, { dec: 2, tol: 0.01 }),
            pista: 'Dentro de la raiz queda ' + ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + '.',
            despues: 'Los signos no importaron porque se elevaron al cuadrado.' },
          { seccion: 'Paso 3: el punto medio',
            queHacemos: 'Recordamos que el punto medio es un PROMEDIO, no una resta.',
            paraQue: 'Aqui se suma y se divide entre 2; en la distancia se restaba. Confundirlos es el error tipico.',
            queda: 'distancia = ' + F.n(d, 2) + ';  medio = (?, ?)',
            pregunta: 'Ahora el punto medio. &iquest;Como se calcula?',
            resp: R.opcion(['Promediando cada coordenada por separado',
              'Dividiendo la distancia entre 2'], 0),
            pista: 'Un punto necesita dos numeros. La distancia es solo uno, asi que no puede ser eso.',
            despues: 'Se promedian las x entre si y las y entre si.' },
          { seccion: 'Paso 3: el punto medio',
            queHacemos: 'Promediamos las dos x.',
            paraQue: 'El resultado tiene que quedar entre las dos coordenadas originales.',
            queda: 'distancia = ' + F.n(d, 2) + ';  medio = (' + F.n((x1 + x2) / 2, 2) + ', ?)',
            pregunta: 'Punto medio en x: (' + x1 + ' + ' + x2 + ') &divide; 2 (2 decimales)',
            resp: R.numero((x1 + x2) / 2, { dec: 2, tol: 0.01 }),
            pista: 'Promedio normal.', despues: '' },
          { seccion: 'Paso 3: el punto medio',
            queHacemos: 'Y las dos y.',
            paraQue: 'El punto medio es un PUNTO, asi que lleva dos coordenadas.',
            queda: 'distancia = ' + F.n(d, 2) + ';  medio = (' + F.n((x1 + x2) / 2, 2) + ', ' + F.n((y1 + y2) / 2, 2) + ')',
            pregunta: 'Punto medio en y: (' + y1 + ' + ' + y2 + ') &divide; 2 (2 decimales)',
            resp: R.numero((y1 + y2) / 2, { dec: 2, tol: 0.01 }),
            pista: 'Igual con las y.',
            despues: 'Comprobacion: el punto medio debe quedar entre los dos valores originales.' },
          { seccion: 'Paso 4: escribir',
            queHacemos: 'Damos la distancia y las dos coordenadas del medio.',
            paraQue: 'Para cerrar el ejercicio.',
            queda: 'distancia = ' + F.n(d, 2) + ';  medio = (' + F.n((x1 + x2) / 2, 2) + ', ' + F.n((y1 + y2) / 2, 2) + ')',
            pregunta: 'Escribe las tres respuestas.',
            resp: R.varios([
              { etiqueta: 'Distancia', resp: R.numero(d, { dec: 2, tol: 0.01 }) },
              { etiqueta: 'Punto medio x', resp: R.numero((x1 + x2) / 2, { dec: 2, tol: 0.01 }) },
              { etiqueta: 'Punto medio y', resp: R.numero((y1 + y2) / 2, { dec: 2, tol: 0.01 }) }
            ]),
            pista: 'd = ' + F.n(d, 2) + ', medio = (' + F.n((x1 + x2) / 2, 2) + ', ' + F.n((y1 + y2) / 2, 2) + ').',
            despues: '' }
        ],
        final: 'Distancia <b>' + F.n(d, 2) + '</b>, punto medio <b>(' + F.n((x1 + x2) / 2, 2) + ', ' + F.n((y1 + y2) / 2, 2) + ')</b>',
        receta: ['Distancia: Pitagoras con &Delta;x y &Delta;y (un solo numero)',
          'Los signos dan igual: se elevan al cuadrado',
          'Punto medio: promedio de las x y promedio de las y (un punto)',
          'El punto medio siempre cae entre los dos originales']
      }),
      enunciado: 'Dados A(' + x1 + ', ' + y1 + ') y B(' + x2 + ', ' + y2 + '):<br>' +
        'calcula la distancia AB y las coordenadas del punto medio (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Distancia', resp: R.numero(d, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Punto medio x', resp: R.numero((x1 + x2) / 2, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Punto medio y', resp: R.numero((y1 + y2) / 2, { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['Distancia: d = &radic;<span class="rad">(x&#8322;&minus;x&#8321;)&sup2; + (y&#8322;&minus;y&#8321;)&sup2;</span>. Punto medio: promedio de cada coordenada.',
        '&Delta;x = ' + (x2 - x1) + ' y &Delta;y = ' + (y2 - y1) + '.'],
      solucion: ['d = &radic;<span class="rad">(' + (x2 - x1) + ')&sup2; + (' + (y2 - y1) + ')&sup2;</span> = &radic;<span class="rad">' + ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + '</span> = <b>' + F.n(d, 2) + '</b>',
        'Punto medio x = (' + x1 + ' + ' + x2 + ')/2 = <b>' + F.n((x1 + x2) / 2, 2) + '</b>',
        'Punto medio y = (' + y1 + ' + ' + y2 + ')/2 = <b>' + F.n((y1 + y2) / 2, 2) + '</b>']
    };
  };

  extra.aPolarEcuacion = function (r) {
    var a = r.entero(2, 9);
    var esX = r.bool();
    return {
      guia: G({
        intro: 'Hay que pasar <b>x&sup2; + y&sup2; &minus; ' + (2 * a) + (esX ? 'x' : 'y') + ' = 0</b> a forma polar.<br>' +
          'Convertir ecuaciones es mecanico si tienes a mano las tres identidades puente: ' +
          '<b>x&sup2; + y&sup2; = r&sup2;</b>, <b>x = r cos&theta;</b> y <b>y = r sen&theta;</b>. Se sustituye y se limpia.',
        pasos: [
          { seccion: 'Paso 1: las identidades puente',
            queHacemos: 'Elegimos las identidades que conectan los dos sistemas.',
            paraQue: 'Convertir ecuaciones es mecanico si tienes a mano x&sup2; + y&sup2; = r&sup2;, x = r cos&theta; y y = r sen&theta;.',
            queda: 'r&sup2; &minus; ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + ' = 0',
            pregunta: '&iquest;Que identidades hay que usar?',
            resp: R.opcion(['x&sup2; + y&sup2; = r&sup2;, x = r cos&theta;, y = r sen&theta;',
              'x = r, y = &theta;'], 0),
            pista: 'r es la distancia al origen, asi que r&sup2; = x&sup2; + y&sup2; sale de Pitagoras. Las otras dos son la proyeccion del radio.',
            despues: 'Sustituyendo queda r&sup2; &minus; ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + ' = 0.' },
          { seccion: 'Paso 2: factorizar y despejar',
            queHacemos: 'Sacamos r como factor comun y descartamos r = 0.',
            paraQue: 'r = 0 es solo el origen, que ya esta en la curva. La informacion util esta en el otro factor.',
            queda: 'r = ' + (2 * a) + ' &middot; ?',
            pregunta: 'Los dos terminos tienen r. Factorizala: r(r &minus; ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + ') = 0.<br>' +
              'Descartando r = 0 (el origen), &iquest;cuanto vale k en r = k &middot; (cos&theta; o sen&theta;)?',
            resp: R.numero(2 * a, { dec: 2 }),
            pista: 'Es el coeficiente que acompanaba al termino lineal: ' + (2 * a) + '.',
            despues: '' },
          { seccion: 'Paso 3: que funcion queda',
            queHacemos: 'Vemos si queda coseno o seno.',
            paraQue: 'Con coseno el centro se va sobre el eje x; con seno, sobre el eje y.',
            queda: 'r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;'),
            pregunta: '&iquest;Que funcion aparece, cos&theta; o sen&theta;?',
            resp: R.opcion(['cos&theta;', 'sen&theta;'], esX ? 0 : 1),
            pista: 'El termino que habia era ' + (esX ? 'x, y x = r cos&theta;' : 'y, y y = r sen&theta;') + '.',
            despues: 'Resultado: r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + ', que es una circunferencia de radio ' + a +
              ' con centro en ' + (esX ? '(' + a + ', 0)' : '(0, ' + a + ')') + ': pasa por el origen.' },
          { seccion: 'Paso 4: escribir',
            queHacemos: 'Damos k y la funcion.',
            paraQue: 'Es una circunferencia de radio ' + a + ' que pasa por el origen.',
            queda: 'r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;'),
            pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'Valor de k', resp: R.numero(2 * a, { dec: 2 }) },
              { etiqueta: 'Funcion', resp: R.opcion(['cos&theta;', 'sen&theta;'], esX ? 0 : 1) }
            ]),
            pista: 'k = ' + (2 * a) + ' y la funcion es ' + (esX ? 'cos&theta;' : 'sen&theta;') + '.',
            despues: '' }
        ],
        final: '<b>r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + '</b>',
        receta: ['Memorizar las tres identidades puente',
          'Sustituir y factorizar r',
          'Descartar r = 0 (es solo el origen)',
          'Termino en x &rarr; cos&theta;; termino en y &rarr; sen&theta;',
          'r = k cos&theta; es una circunferencia que pasa por el origen']
      }),
      enunciado: 'Convierte a forma polar la ecuacion:<br><span class="big">x&sup2; + y&sup2; &minus; ' + (2 * a) + (esX ? 'x' : 'y') + ' = 0</span><br>' +
        'El resultado es r = k &middot; (cos&theta; o sen&theta;). Indica k y cual de las dos funciones es.',
      respuesta: R.varios([
        { etiqueta: 'Valor de k', resp: R.numero(2 * a, { dec: 2 }) },
        { etiqueta: 'Funcion', resp: R.opcion(['cos&theta;', 'sen&theta;'], esX ? 0 : 1) }
      ]),
      pistas: ['Usa las identidades x&sup2; + y&sup2; = r&sup2;, x = r cos&theta; y y = r sen&theta;.',
        'Queda r&sup2; = ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + '; divide todo entre r.'],
      solucion: ['Sustituyo: r&sup2; &minus; ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + ' = 0',
        'Factorizo r: r(r &minus; ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + ') = 0',
        'Resultado: <b>r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + '</b>',
        'Es una circunferencia de radio ' + a + ' con centro en ' + (esX ? '(' + a + ', 0)' : '(0, ' + a + ')')]
    };
  };

  EJ.tema({
    id: 'coordenadas',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Coordenadas rectangulares y polares',
    descripcion: 'Conversion entre (x, y) y (r, &theta;), y ecuaciones en forma polar.',
    formulario: 'De polares a rectangulares: x = r&middot;cos&theta;, y = r&middot;sen&theta;<br>' +
      'De rectangulares a polares: r = &radic;<span class="rad">x&sup2; + y&sup2;</span>, &theta; = arctan(y/x) ajustando el cuadrante<br>' +
      'Identidades utiles: x&sup2; + y&sup2; = r&sup2;, x = r cos&theta;, y = r sen&theta;',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, x, y, rr, th;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['polarARect', 'De polares a rectangulares'],
          ['rectAPolar', 'De rectangulares a polares'],
          ['distanciaPuntoMedio', 'Distancia y punto medio']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'polarARect') {
          th = r.elige([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]);
          rr = r.entero(2, 12);
          x = rr * Math.cos(rad(th)); y = rr * Math.sin(rad(th));
          guiaDelPaso = EJ.guia.polarARectangular(rr, th);
          enun = 'Convierte el punto polar (r, &theta;) = (' + rr + ', ' + th + '&deg;) a coordenadas rectangulares.<br>(2 decimales)';
          resp = R.par(x, y, { dec: 2, tol: 0.01 });
          pistas = ['x = r&middot;cos&theta; y y = r&middot;sen&theta;.',
            'cos ' + th + '&deg; = ' + F.n(Math.cos(rad(th)), 4) + ' y sen ' + th + '&deg; = ' + F.n(Math.sin(rad(th)), 4) + '.'];
          sol = ['x = ' + rr + '&middot;cos ' + th + '&deg; = ' + rr + '(' + F.n(Math.cos(rad(th)), 4) + ') = <b>' + F.n(x, 2) + '</b>',
            'y = ' + rr + '&middot;sen ' + th + '&deg; = ' + rr + '(' + F.n(Math.sin(rad(th)), 4) + ') = <b>' + F.n(y, 2) + '</b>',
            'Punto: (' + F.n(x, 2) + ', ' + F.n(y, 2) + ')'];
        } else {
          var base = r.elige([[3, 4], [5, 12], [6, 8], [8, 15], [1, 1], [2, 2], [0, 5], [7, 0]]);
          x = base[0] * r.elige([1, -1]); y = base[1] * r.elige([1, -1]);
          rr = Math.sqrt(x * x + y * y);
          th = normaliza(deg(Math.atan2(y, x)));
          var donde = (x === 0 ? (y > 0 ? 'sobre el eje y positivo' : 'sobre el eje y negativo')
            : (y === 0 ? (x > 0 ? 'sobre el eje x positivo' : 'sobre el eje x negativo')
              : 'en el cuadrante ' + (x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III'))));
          guiaDelPaso = G({
            intro: 'Hay que pasar <b>(' + x + ', ' + y + ')</b> a coordenadas polares.<br>' +
              'Las rectangulares dicen "camina ' + x + ' a la derecha y ' + y + ' hacia arriba". ' +
              'Las polares dicen otra cosa: "<b>gira hasta el angulo &theta; y avanza r</b>". Es el mismo punto contado de otra forma.',
            pasos: [
              { seccion: 'Paso 1: el radio',
                queHacemos: 'Sumamos los cuadrados de las dos coordenadas.',
                paraQue: 'Las rectangulares dicen "camina tanto a la derecha y tanto hacia arriba"; las polares dicen "gira hasta &theta; y avanza r".',
                queda: 'r = &radic;' + (x * x + y * y) + ',  &theta; = ?',
                pregunta: 'r es la distancia al origen, o sea Pitagoras.<br>Calcula x&sup2; + y&sup2; = ' + (x * x) + ' + ' + (y * y),
                resp: R.numero(x * x + y * y, { dec: 0 }),
                pista: 'Eleva cada coordenada y suma.', despues: '' },
              { seccion: 'Paso 1: el radio',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'r siempre es positivo: es una distancia.',
                queda: 'r = ' + F.n(rr, 2) + ',  &theta; = ?',
                pregunta: 'Saca la raiz para obtener r. (2 decimales)',
                resp: R.numero(rr, { dec: 2, tol: 0.02 }),
                pista: '&radic;<span class="rad">' + (x * x + y * y) + '</span>.',
                despues: 'r siempre es positivo: es una distancia.' },
              { seccion: 'Paso 2: por que arctan no basta',
                queHacemos: 'Vemos por que la calculadora sola no sirve.',
                paraQue: 'arctan da el mismo valor para (x, y) y para (&minus;x, &minus;y): no distingue cuadrantes opuestos.',
                queda: 'r = ' + F.n(rr, 2) + ',  &theta; = ? (hay que mirar el dibujo)',
                pregunta: 'Para &theta; la formula es arctan(y/x)... pero no basta con meterlo a la calculadora. &iquest;Por que?',
                resp: R.opcion(['Porque arctan da el mismo valor para (x, y) y para (&minus;x, &minus;y): no distingue cuadrantes opuestos',
                  'Porque arctan no acepta numeros negativos'], 0),
                pista: 'y/x da lo mismo si le cambias el signo a los dos. La calculadora no sabe de que lado del plano estas.',
                despues: 'Por eso siempre hay que mirar el dibujo y ajustar.' },
              { seccion: 'Paso 3: ubicar el angulo',
                queHacemos: 'Ajustamos el angulo a la zona donde de verdad cae el punto.',
                paraQue: 'Saber el cuadrante ANTES de calcular evita el error clasico del angulo equivocado.',
                queda: 'r = ' + F.n(rr, 2) + ',  &theta; = ' + F.n(th, 2) + '&deg;',
                pregunta: 'El punto esta ' + donde + '.<br>&iquest;Cuanto vale &theta; en [0&deg;, 360&deg;)? (2 decimales)',
                resp: R.numero(th, { dec: 2, tol: 0.02 }),
                pista: 'Con ese cuadrante, &theta; = ' + F.n(th, 2) + '&deg;.',
                despues: '' },
              { seccion: 'Paso 4: escribir',
                queHacemos: 'Damos el par (r, &theta;).',
                paraQue: 'Para cerrar el ejercicio.',
                queda: '(' + F.n(rr, 2) + ', ' + F.n(th, 2) + '&deg;)',
                pregunta: 'Escribe r y &theta;.',
                resp: R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 }),
                pista: 'r = ' + F.n(rr, 2) + ' y &theta; = ' + F.n(th, 2) + '&deg;.',
                despues: '' }
            ],
            final: '(r, &theta;) = <b>(' + F.n(rr, 2) + ', ' + F.n(th, 2) + '&deg;)</b>',
            receta: ['r = &radic;<span class="rad">x&sup2; + y&sup2;</span>, siempre positivo',
              '&theta; = arctan(y/x), pero hay que ajustar el cuadrante',
              'Mirar los signos de x y de y antes de aceptar la calculadora',
              'Dar &theta; entre 0&deg; y 360&deg;']
          });
          enun = 'Convierte el punto (' + x + ', ' + y + ') a coordenadas polares.<br>Da r y &theta; en grados entre 0&deg; y 360&deg; (2 decimales).';
          resp = R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 });
          pistas = ['r = &radic;<span class="rad">x&sup2; + y&sup2;</span> y &theta; = arctan(y/x), pero cuida el cuadrante.',
            'El punto esta en el cuadrante ' + (x >= 0 ? (y >= 0 ? 'I' : 'IV') : (y >= 0 ? 'II' : 'III')) + ', asi que &theta; debe quedar ahi.'];
          sol = ['r = &radic;<span class="rad">' + (x * x) + ' + ' + (y * y) + '</span> = <b>' + F.n(rr, 2) + '</b>',
            '&theta; de referencia: arctan(|' + y + '|/|' + x + '|)',
            'Ajustando al cuadrante: &theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['aPolar', 'De rectangulares a polares'],
          ['aRect', 'De polares a rectangulares'],
          ['cuadrante', 'Cuadrante y angulo'],
          ['distanciaPuntoMedio', 'Distancia y punto medio']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'aPolar') {
          x = r.enteroNoCero(-12, 12); y = r.enteroNoCero(-12, 12);
          rr = Math.sqrt(x * x + y * y);
          th = normaliza(deg(Math.atan2(y, x)));
          var cuadNum = x > 0 ? (y > 0 ? 0 : 3) : (y > 0 ? 1 : 2);
          var ref = deg(Math.atan(Math.abs(y / x)));
          guiaDelPaso = G({
            intro: 'Hay que pasar <b>(' + x + ', ' + y + ')</b> a polares.<br>' +
              'El radio es facil; el angulo es donde se pierde todo el mundo. La forma segura de hacerlo es en dos tiempos: ' +
              'primero el <b>angulo de referencia</b> (siempre agudo, con valores absolutos) y luego ajustarlo al cuadrante.',
            pasos: [
              { seccion: 'Paso 1: el radio',
                queHacemos: 'Calculamos la distancia al origen.',
                paraQue: 'El radio es la parte facil; el angulo es donde se pierde todo el mundo.',
                queda: 'r = ' + F.n(rr, 2) + ',  &theta; = ?',
                pregunta: 'Calcula r = &radic;<span class="rad">' + (x * x) + ' + ' + (y * y) + '</span> (2 decimales)',
                resp: R.numero(rr, { dec: 2, tol: 0.02 }),
                pista: 'Pitagoras con las dos coordenadas.',
                despues: 'r = ' + F.n(rr, 2) + ', siempre positivo.' },
              { seccion: 'Paso 2: el cuadrante',
                queHacemos: 'Leemos el cuadrante directamente de los signos.',
                paraQue: 'Saber esto ANTES de calcular el angulo evita el error clasico.',
                queda: 'r = ' + F.n(rr, 2) + ';  cuadrante ' + ['I', 'II', 'III', 'IV'][cuadNum],
                pregunta: 'Los signos son (' + (x > 0 ? '+' : '&minus;') + ', ' + (y > 0 ? '+' : '&minus;') + ').<br>&iquest;En que cuadrante cae el punto?',
                resp: R.opcion(['I', 'II', 'III', 'IV'], cuadNum),
                pista: '(+,+) es el I, (&minus;,+) el II, (&minus;,&minus;) el III y (+,&minus;) el IV. Se numeran girando en contra del reloj.',
                despues: 'Saber esto ANTES de calcular evita el error clasico del angulo equivocado.' },
              { seccion: 'Paso 3: el angulo de referencia',
                queHacemos: 'Calculamos el arctan con valores absolutos.',
                paraQue: 'Con valores absolutos siempre sale un angulo agudo: el que forma el punto con el eje x mas cercano.',
                queda: 'r = ' + F.n(rr, 2) + ';  referencia ' + F.n(ref, 2) + '&deg;',
                pregunta: 'Angulo de referencia: arctan(|' + y + '| &divide; |' + x + '|) (2 decimales)',
                resp: R.numero(ref, { dec: 2, tol: 0.02 }),
                pista: 'Con valores absolutos siempre sale un angulo entre 0&deg; y 90&deg;.',
                despues: 'Es el angulo que forma el punto con el eje x mas cercano.' },
              { seccion: 'Paso 4: ajustar al cuadrante',
                queHacemos: 'Sumamos o restamos segun el cuadrante.',
                paraQue: 'I: referencia. II: 180&deg; &minus; ref. III: 180&deg; + ref. IV: 360&deg; &minus; ref.',
                queda: 'r = ' + F.n(rr, 2) + ',  &theta; = ' + F.n(th, 2) + '&deg;',
                pregunta: 'Ajusta al cuadrante. &iquest;Cuanto vale &theta;? (2 decimales)',
                resp: R.numero(th, { dec: 2, tol: 0.02 }),
                pista: 'Cuadrante I: &theta; = referencia. II: 180&deg; &minus; referencia. III: 180&deg; + referencia. IV: 360&deg; &minus; referencia.',
                despues: '' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos el par (r, &theta;).',
                paraQue: 'Para cerrar el ejercicio.',
                queda: '(' + F.n(rr, 2) + ', ' + F.n(th, 2) + '&deg;)',
                pregunta: 'Escribe r y &theta;.',
                resp: R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 }),
                pista: 'r = ' + F.n(rr, 2) + ' y &theta; = ' + F.n(th, 2) + '&deg;.',
                despues: '' }
            ],
            final: '(r, &theta;) = <b>(' + F.n(rr, 2) + ', ' + F.n(th, 2) + '&deg;)</b>',
            receta: ['r con Pitagoras',
              'Determinar el cuadrante por los SIGNOS antes de calcular',
              'Angulo de referencia con valores absolutos (siempre agudo)',
              'Ajustar: I ref, II 180&minus;ref, III 180+ref, IV 360&minus;ref']
          });
          enun = 'Convierte (' + x + ', ' + y + ') a polares con &theta; en [0&deg;, 360&deg;) (2 decimales).';
          resp = R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 });
          pistas = ['Calcula primero el angulo de referencia con los valores absolutos.',
            'Angulo de referencia: ' + F.n(deg(Math.atan(Math.abs(y / x))), 2) + '&deg;. Ahora ubicalo en el cuadrante correcto.'];
          sol = ['r = &radic;<span class="rad">' + (x * x) + ' + ' + (y * y) + '</span> = <b>' + F.n(rr, 2) + '</b>',
            'Cuadrante ' + (x >= 0 ? (y >= 0 ? 'I' : 'IV') : (y >= 0 ? 'II' : 'III')) + ', angulo de referencia ' + F.n(deg(Math.atan(Math.abs(y / x))), 2) + '&deg;',
            '&theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        } else if (t === 'aRect') {
          th = r.entero(1, 359); rr = r.entero(2, 15);
          x = rr * Math.cos(rad(th)); y = rr * Math.sin(rad(th));
          guiaDelPaso = G({
            intro: 'Hay que pasar el punto polar <b>(' + rr + ', ' + th + '&deg;)</b> a rectangulares.<br>' +
              'Este sentido es el facil de los dos, porque no hay que decidir cuadrantes: ' +
              'las formulas <b>x = r cos&theta;</b> y <b>y = r sen&theta;</b> ya traen los signos correctos metidos en el coseno y el seno.',
            pasos: [
              { seccion: 'Paso 1: la coordenada x',
                queHacemos: 'Sacamos el coseno del angulo.',
                paraQue: 'Este sentido es el facil: no hay que decidir cuadrantes, porque el coseno ya trae el signo.',
                queda: '(x, y) = (' + rr + ' &middot; ' + F.n(Math.cos(rad(th)), 4) + ', ?)',
                pregunta: 'Calcula cos ' + th + '&deg; (4 decimales)',
                resp: R.numero(Math.cos(rad(th)), { dec: 4, tol: 0.001 }),
                pista: 'Calculadora en GRADOS.' + (Math.cos(rad(th)) < 0 ? ' Fijate que sale negativo: el punto esta a la izquierda del eje y.' : ''),
                despues: '' },
              { seccion: 'Paso 1: la coordenada x',
                queHacemos: 'Multiplicamos r por el coseno.',
                paraQue: 'Esa es la x.',
                queda: '(x, y) = (' + F.n(x, 2) + ', ?)',
                pregunta: 'x = ' + rr + ' &times; ' + F.n(Math.cos(rad(th)), 4) + ' (2 decimales)',
                resp: R.numero(x, { dec: 2, tol: 0.02 }),
                pista: 'Multiplicacion directa.', despues: '' },
              { seccion: 'Paso 2: la coordenada y',
                queHacemos: 'Ahora el seno.',
                paraQue: 'El seno coloca el punto arriba o abajo del eje x, segun su signo.',
                queda: '(x, y) = (' + F.n(x, 2) + ', ' + rr + ' &middot; ' + F.n(Math.sin(rad(th)), 4) + ')',
                pregunta: 'Ahora sen ' + th + '&deg; (4 decimales)',
                resp: R.numero(Math.sin(rad(th)), { dec: 4, tol: 0.001 }),
                pista: 'Misma calculadora, otra tecla.', despues: '' },
              { seccion: 'Paso 2: la coordenada y',
                queHacemos: 'Multiplicamos r por el seno.',
                paraQue: 'Comprobacion: los signos deben coincidir con el cuadrante donde cae el angulo.',
                queda: '(x, y) = (' + F.n(x, 2) + ', ' + F.n(y, 2) + ')',
                pregunta: 'y = ' + rr + ' &times; ' + F.n(Math.sin(rad(th)), 4) + ' (2 decimales)',
                resp: R.numero(y, { dec: 2, tol: 0.02 }),
                pista: 'Multiplicacion directa.',
                despues: 'Comprobacion: los signos de x e y deben coincidir con el cuadrante donde cae ' + th + '&deg;.' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Damos el par (x, y).',
                paraQue: 'Para cerrar el ejercicio.',
                queda: '(' + F.n(x, 2) + ', ' + F.n(y, 2) + ')',
                pregunta: 'Escribe el punto (x, y).',
                resp: R.par(x, y, { dec: 2, tol: 0.02 }),
                pista: '(' + F.n(x, 2) + ', ' + F.n(y, 2) + ').',
                despues: '' }
            ],
            final: '(x, y) = <b>(' + F.n(x, 2) + ', ' + F.n(y, 2) + ')</b>',
            receta: ['x = r cos&theta;, y = r sen&theta;',
              'Este sentido no necesita ajustar cuadrantes',
              'El seno y el coseno ya traen el signo',
              'Comprobar que los signos cuadren con el angulo']
          });
          enun = 'Convierte el punto polar (' + rr + ', ' + th + '&deg;) a rectangulares (2 decimales).';
          resp = R.par(x, y, { dec: 2, tol: 0.02 });
          pistas = ['x = r cos&theta;, y = r sen&theta;. Respeta los signos del cuadrante.',
            'cos ' + th + '&deg; = ' + F.n(Math.cos(rad(th)), 4) + ', sen ' + th + '&deg; = ' + F.n(Math.sin(rad(th)), 4) + '.'];
          sol = ['x = ' + rr + '(' + F.n(Math.cos(rad(th)), 4) + ') = <b>' + F.n(x, 2) + '</b>',
            'y = ' + rr + '(' + F.n(Math.sin(rad(th)), 4) + ') = <b>' + F.n(y, 2) + '</b>'];
        } else {
          x = r.enteroNoCero(-9, 9); y = r.enteroNoCero(-9, 9);
          var cuad = x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III');
          th = normaliza(deg(Math.atan2(y, x)));
          var ref2 = deg(Math.atan(Math.abs(y / x)));
          guiaDelPaso = G({
            intro: 'Del punto <b>(' + x + ', ' + y + ')</b> nos piden el cuadrante y el angulo polar.<br>' +
              'El cuadrante se lee directo de los signos, sin calcular nada. Y una vez que lo sabes, ' +
              'el angulo se arma con el de referencia mas un ajuste.',
            pasos: [
              { seccion: 'Paso 1: el cuadrante',
                queHacemos: 'Leemos el cuadrante de los signos, sin calcular nada.',
                paraQue: '(+,+) I, (&minus;,+) II, (&minus;,&minus;) III, (+,&minus;) IV. Se cuentan girando contra el reloj.',
                queda: 'cuadrante ' + cuad + ',  &theta; = ?',
                pregunta: 'Los signos son (' + (x > 0 ? '+' : '&minus;') + ', ' + (y > 0 ? '+' : '&minus;') + ').<br>&iquest;Que cuadrante es?',
                resp: R.texto(cuad, { alternativas: [cuad.toLowerCase(), String(['I', 'II', 'III', 'IV'].indexOf(cuad) + 1)] }),
                pista: '(+,+) I &middot; (&minus;,+) II &middot; (&minus;,&minus;) III &middot; (+,&minus;) IV. Se cuentan girando en contra del reloj desde arriba a la derecha.',
                despues: 'Ya sabemos donde cae, asi que el angulo tiene que quedar en esa zona.' },
              { seccion: 'Paso 2: el angulo de referencia',
                queHacemos: 'Calculamos el arctan con valores absolutos.',
                paraQue: 'Es el angulo hasta el eje x mas cercano, no el final.',
                queda: 'cuadrante ' + cuad + ';  referencia ' + F.n(ref2, 2) + '&deg;',
                pregunta: 'Angulo de referencia: arctan(|' + y + '| &divide; |' + x + '|) (2 decimales)',
                resp: R.numero(ref2, { dec: 2, tol: 0.02 }),
                pista: 'Con valores absolutos, para que salga agudo.',
                despues: 'Es el angulo hasta el eje x mas cercano, no el final.' },
              { seccion: 'Paso 3: ajustar',
                queHacemos: 'Aplicamos el ajuste que toca segun el cuadrante.',
                paraQue: 'Si la calculadora te dio otra cosa, es porque arctan no distingue cuadrantes opuestos.',
                queda: 'cuadrante ' + cuad + ',  &theta; = ' + F.n(th, 2) + '&deg;',
                pregunta: 'Ajustalo al cuadrante ' + cuad + '. &iquest;Cuanto vale &theta;? (2 decimales)',
                resp: R.numero(th, { dec: 2, tol: 0.02 }),
                pista: 'Cuadrante I: &theta; = referencia. II: 180&deg; &minus; referencia. III: 180&deg; + referencia. IV: 360&deg; &minus; referencia.',
                despues: 'Si la calculadora te dio otra cosa, es porque arctan no distingue cuadrantes opuestos.' },
              { seccion: 'Paso 4: escribir',
                queHacemos: 'Damos el cuadrante y el angulo.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'cuadrante ' + cuad + ',  &theta; = ' + F.n(th, 2) + '&deg;',
                pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Cuadrante (I, II, III o IV)', resp: R.texto(cuad, { alternativas: [cuad.toLowerCase(), String(['I', 'II', 'III', 'IV'].indexOf(cuad) + 1)] }) },
                  { etiqueta: '&theta; (&deg;)', resp: R.numero(th, { dec: 2, tol: 0.02 }) }
                ]),
                pista: 'Cuadrante ' + cuad + ' y &theta; = ' + F.n(th, 2) + '&deg;.',
                despues: '' }
            ],
            final: 'Cuadrante <b>' + cuad + '</b> y &theta; = <b>' + F.n(th, 2) + '&deg;</b>',
            receta: ['El cuadrante se lee de los signos, sin calcular',
              'Angulo de referencia con valores absolutos',
              'Ajuste segun el cuadrante',
              'La calculadora sola no basta: arctan no distingue opuestos']
          });
          enun = '&iquest;En que cuadrante esta el punto (' + x + ', ' + y + ') y cual es su angulo polar &theta; en [0&deg;, 360&deg;)?<br>(2 decimales)';
          resp = R.varios([
            { etiqueta: 'Cuadrante (I, II, III o IV)', resp: R.texto(cuad, { alternativas: [cuad.toLowerCase(), String(['I', 'II', 'III', 'IV'].indexOf(cuad) + 1)] }) },
            { etiqueta: '&theta; (&deg;)', resp: R.numero(th, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['El cuadrante depende de los signos: (+,+) I, (&minus;,+) II, (&minus;,&minus;) III, (+,&minus;) IV.',
            'La calculadora da arctan(' + y + '/' + x + ') = ' + F.n(deg(Math.atan(y / x)), 2) + '&deg;; sumale 180&deg; o 360&deg; segun el cuadrante.'];
          sol = ['Signos (' + (x > 0 ? '+' : '&minus;') + ', ' + (y > 0 ? '+' : '&minus;') + ') &rArr; cuadrante <b>' + cuad + '</b>',
            '&theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['ecuacionCirculo', 'Ecuacion polar de una circunferencia'],
          ['ecuacionRecta', 'Ecuacion polar de una recta'],
          ['aPolarEc', 'Distancia entre puntos polares'],
          ['aPolarEcuacion', 'De rectangular a polar']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'ecuacionCirculo') {
          var a = r.entero(2, 8);
          var esCos = r.bool();
          guiaDelPaso = G({
            intro: 'La ecuacion polar <b>r = ' + (2 * a) + (esCos ? ' cos' : ' sen') + '&theta;</b> es una circunferencia, y hay que encontrar su centro y su radio.<br>' +
              'En polares no se ve nada: hay que pasarla a rectangulares. Y para eso hace falta un truquito, ' +
              'porque tal como esta no se puede sustituir directo.',
            pasos: [
              { seccion: 'Paso 1: el truco de multiplicar por r',
                queHacemos: 'Multiplicamos los dos lados por r.',
                paraQue: 'Las identidades puente no sirven con un cos&theta; suelto: necesitan que venga multiplicado por r.',
                queda: 'x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y'),
                pregunta: 'Multiplicamos los dos lados por r. &iquest;Por que conviene?',
                resp: R.opcion(['Porque asi aparecen r&sup2; (que es x&sup2; + y&sup2;) y r cos&theta; (que es x)',
                  'Porque asi se cancela la r'], 0),
                pista: 'Las identidades puente no sirven con un cos&theta; suelto: necesitan que venga multiplicado por r.',
                despues: 'Queda r&sup2; = ' + (2 * a) + (esCos ? ' r cos&theta;' : ' r sen&theta;') + ', y ahora si: x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y') + '.' },
              { seccion: 'Paso 2: completar el cuadrado',
                queHacemos: 'Sumamos (b/2)&sup2; a los dos lados.',
                paraQue: 'Es la unica forma de que aparezca un parentesis al cuadrado, que es donde se leen centro y radio.',
                queda: (esCos ? '(x &minus; ' + a + ')&sup2; + y&sup2; = ' + (a * a) : 'x&sup2; + (y &minus; ' + a + ')&sup2; = ' + (a * a)),
                pregunta: 'Pasamos todo a un lado: ' + (esCos ? 'x&sup2; &minus; ' + (2 * a) + 'x + y&sup2; = 0' : 'x&sup2; + y&sup2; &minus; ' + (2 * a) + 'y = 0') + '.<br>' +
                  'Para completar el cuadrado hay que sumar (b/2)&sup2; a los dos lados. &iquest;Cuanto vale eso?',
                resp: R.numero(a * a, { dec: 0 }),
                pista: 'La mitad de ' + (2 * a) + ' es ' + a + ', y al cuadrado da ' + (a * a) + '.',
                despues: 'Queda ' + (esCos ? '(x &minus; ' + a + ')&sup2; + y&sup2; = ' + (a * a) : 'x&sup2; + (y &minus; ' + a + ')&sup2; = ' + (a * a)) + '.' },
              { seccion: 'Paso 3: leer el centro',
                queHacemos: 'Leemos la coordenada x del centro.',
                paraQue: 'El centro es el numero que va DENTRO del parentesis, con el signo cambiado.',
                queda: 'centro (' + (esCos ? a : 0) + ', ?),  radio ?',
                pregunta: 'De esa forma se leen centro y radio directo.<br>&iquest;Cual es la coordenada x del centro?',
                resp: R.numero(esCos ? a : 0, { dec: 2 }),
                pista: 'El centro es el numero que va DENTRO del parentesis, con el signo cambiado.',
                despues: '' },
              { seccion: 'Paso 3: leer el centro',
                queHacemos: 'Ahora la coordenada y.',
                paraQue: 'Si una variable aparece sola, sin restar nada, su coordenada del centro es 0.',
                queda: 'centro (' + (esCos ? a : 0) + ', ' + (esCos ? 0 : a) + '),  radio ?',
                pregunta: '&iquest;Y la coordenada y del centro?',
                resp: R.numero(esCos ? 0 : a, { dec: 2 }),
                pista: esCos ? 'La y aparece sola, sin restar nada: su centro es 0.' : 'Es el que esta dentro del parentesis de la y.',
                despues: '' },
              { seccion: 'Paso 4: el radio',
                queHacemos: 'Sacamos la raiz del lado derecho.',
                paraQue: 'No te quedes con el cuadrado. Fijate: el radio y la distancia del centro al origen coinciden, asi que la circunferencia pasa por el origen.',
                queda: 'centro (' + (esCos ? a : 0) + ', ' + (esCos ? 0 : a) + '),  radio ' + a,
                pregunta: 'El lado derecho es el radio AL CUADRADO. &iquest;Cuanto vale el radio?',
                resp: R.numero(a, { dec: 2 }),
                pista: '&radic;<span class="rad">' + (a * a) + '</span> = ' + a + '. No te quedes con ' + (a * a) + '.',
                despues: 'Fijate: el radio es ' + a + ' y el centro esta a ' + a + ' del origen, asi que la circunferencia pasa justo por el origen. Eso siempre ocurre con r = k cos&theta;.' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos centro y radio.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'centro (' + (esCos ? a : 0) + ', ' + (esCos ? 0 : a) + '),  radio ' + a,
                pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'Centro x', resp: R.numero(esCos ? a : 0, { dec: 2 }) },
                  { etiqueta: 'Centro y', resp: R.numero(esCos ? 0 : a, { dec: 2 }) },
                  { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
                ]),
                pista: 'Centro (' + (esCos ? a + ', 0' : '0, ' + a) + ') y radio ' + a + '.',
                despues: '' }
            ],
            final: 'Centro <b>(' + (esCos ? a + ', 0' : '0, ' + a) + ')</b> y radio <b>' + a + '</b>',
            receta: ['Multiplicar por r para poder usar las identidades',
              'x&sup2; + y&sup2; = r&sup2;, x = r cos&theta;, y = r sen&theta;',
              'Completar el cuadrado sumando (b/2)&sup2;',
              'El centro es el numero del parentesis con el signo cambiado',
              'El lado derecho es r&sup2;: hay que sacarle raiz']
          });
          enun = 'La ecuacion polar r = ' + (2 * a) + (esCos ? ' cos' : ' sen') + '&theta; representa una circunferencia.<br>' +
            'Encuentra su centro (en rectangulares) y su radio.';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(esCos ? a : 0, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(esCos ? 0 : a, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
          ]);
          pistas = ['Multiplica los dos lados por r para poder usar r&sup2; = x&sup2; + y&sup2; y r cos&theta; = x.',
            'Queda x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y') + '; ahora completa el cuadrado.'];
          sol = ['Multiplico por r: r&sup2; = ' + (2 * a) + (esCos ? ' r cos&theta;' : ' r sen&theta;'),
            'Sustituyo: x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y'),
            'Completo el cuadrado: ' + (esCos ? '(x &minus; ' + a + ')&sup2; + y&sup2; = ' + (a * a) : 'x&sup2; + (y &minus; ' + a + ')&sup2; = ' + (a * a)),
            'Centro <b>(' + (esCos ? a + ', 0' : '0, ' + a) + ')</b>, radio <b>' + a + '</b>'];
        } else if (t2 === 'ecuacionRecta') {
          var A = r.enteroNoCero(-5, 5), B = r.enteroNoCero(-5, 5), C = r.enteroNoCero(-12, 12);
          /* si B = -A la recta es paralela a la direccion 45 grados y r se va al infinito */
          while (B === -A) B = r.enteroNoCero(-5, 5);
          enun = 'Escribe la ecuacion ' + F.une([F.term(A, 'x', 1), F.term(B, 'y', 1)]) + ' = ' + C + ' en forma polar,<br>' +
            'y calcula r cuando &theta; = 45&deg; (2 decimales).';
          var denom = A * Math.cos(rad(45)) + B * Math.sin(rad(45));
          guiaDelPaso = G({
            intro: 'Hay que pasar la recta <b>' + F.une([F.term(A, 'x', 1), F.term(B, 'y', 1)]) + ' = ' + C + '</b> a forma polar ' +
              'y evaluarla en &theta; = 45&deg;.<br>' +
              'Aqui la conversion es directa: se sustituye x = r cos&theta; y y = r sen&theta;, y luego se despeja r. ' +
              'Lo interesante es que en polares una recta NO queda como algo simple: r depende del angulo.',
            pasos: [
              { seccion: 'Paso 1: sustituir y factorizar',
                queHacemos: 'Cambiamos x e y por sus formas polares y sacamos r como factor comun.',
                paraQue: 'Lo interesante es que en polares una recta NO queda simple: r depende del angulo.',
                queda: 'r = ' + C + ' &divide; (' + A + ' cos&theta; + ' + B + ' sen&theta;)',
                pregunta: 'Sustituyendo queda ' + A + '(r cos&theta;) + ' + B + '(r sen&theta;) = ' + C + '.<br>' +
                  'Si factorizas r, &iquest;que queda multiplicandola?',
                resp: R.opcion(['(' + A + ' cos&theta; + ' + B + ' sen&theta;)',
                  '(' + A + ' + ' + B + ')'], 0),
                pista: 'La r esta en los dos terminos, asi que sale fuera y adentro quedan los cosenos y senos con sus coeficientes.',
                despues: 'Entonces r = ' + C + ' &divide; (' + A + ' cos&theta; + ' + B + ' sen&theta;). Esa es la forma polar de la recta.' },
              { seccion: 'Paso 2: evaluar en 45&deg;',
                queHacemos: 'Sacamos el coseno de 45&deg;.',
                paraQue: 'En 45&deg; el seno y el coseno valen lo mismo, asi que la cuenta se acorta.',
                queda: 'r = ' + C + ' &divide; ?',
                pregunta: 'Ahora evaluamos en 45&deg;. Calcula cos 45&deg; (4 decimales)',
                resp: R.numero(Math.cos(rad(45)), { dec: 4, tol: 0.001 }),
                pista: 'Es &radic;<span class="rad">2</span>/2. En 45&deg; el seno y el coseno valen lo mismo.',
                despues: '' },
              { seccion: 'Paso 2: evaluar en 45&deg;',
                queHacemos: 'Calculamos el denominador completo.',
                paraQue: 'Si el denominador diera 0, r se iria al infinito: la recta seria paralela a esa direccion.',
                queda: 'r = ' + C + ' &divide; ' + F.n(denom, 4),
                pregunta: 'Calcula el denominador: ' + A + ' &times; cos45&deg; + ' + B + ' &times; sen45&deg; (4 decimales)',
                resp: R.numero(denom, { dec: 4, tol: 0.002 }),
                pista: 'Como los dos valen ' + F.n(Math.cos(rad(45)), 4) + ', es lo mismo que (' + A + ' + ' + B + ') &times; ' + F.n(Math.cos(rad(45)), 4) + '.',
                despues: 'Ojo: si el denominador diera 0, r se iria al infinito y la recta seria paralela a esa direccion.' },
              { seccion: 'Paso 3: dividir',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Un r negativo no es un error: significa que el punto queda en la direccion contraria.',
                queda: 'r = ' + F.n(C / denom, 2),
                pregunta: 'Divide: r = ' + C + ' &divide; ' + F.n(denom, 4) + ' (2 decimales)',
                resp: R.numero(C / denom, { dec: 2, tol: 0.02 }),
                pista: 'Division directa.',
                despues: 'Un r negativo no es un error: significa que el punto queda en la direccion contraria a ' + '45&deg;.' }
            ],
            final: 'r = <b>' + F.n(C / denom, 2) + '</b> cuando &theta; = 45&deg;',
            receta: ['Sustituir x = r cos&theta; y y = r sen&theta;',
              'Factorizar r y despejarla',
              'r = C / (A cos&theta; + B sen&theta;)',
              'Evaluar el denominador con el angulo pedido',
              'Denominador 0 significa que r se va al infinito']
          });
          resp = R.numero(C / denom, { dec: 2, tol: 0.02 });
          pistas = ['Sustituye x = r cos&theta; y y = r sen&theta; y despeja r.',
            'r = C / (A cos&theta; + B sen&theta;) = ' + C + ' / (' + A + 'cos45&deg; + ' + B + 'sen45&deg;).'];
          sol = ['Sustituyendo: ' + A + '(r cos&theta;) + ' + B + '(r sen&theta;) = ' + C,
            'r(' + A + 'cos&theta; + ' + B + 'sen&theta;) = ' + C + ' &rArr; r = ' + C + '/(' + A + 'cos&theta; + ' + B + 'sen&theta;)',
            'Con &theta; = 45&deg;: denominador = ' + F.n(denom, 4),
            'r = <b>' + F.n(C / denom, 2) + '</b>'];
        } else {
          var r1 = r.entero(2, 10), t1 = r.elige([0, 30, 45, 60, 90, 120]);
          var r2 = r.entero(2, 10), t2b = r.elige([150, 180, 210, 240, 270, 300]);
          var dAng = Math.abs(t2b - t1);
          var d = Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(rad(dAng)));
          guiaDelPaso = G({
            intro: 'Queremos la distancia entre <b>P(' + r1 + ', ' + t1 + '&deg;)</b> y <b>Q(' + r2 + ', ' + t2b + '&deg;)</b>, ' +
              'dados en polares.<br>' +
              'Se podrian pasar los dos a rectangulares y usar la formula de distancia, pero hay un camino mas corto: ' +
              'los dos radios salen del origen, asi que el origen, P y Q forman un <b>triangulo</b>. Y ahi entra la ley de cosenos.',
            pasos: [
              { seccion: 'Paso 1: el angulo entre los radios',
                queHacemos: 'Restamos los dos angulos.',
                paraQue: 'Los dos radios salen del origen, asi que el origen, P y Q forman un triangulo. Ese es el atajo.',
                queda: 'angulo = ' + dAng + '&deg;',
                pregunta: '&iquest;Cuanto vale el angulo que separa los dos radios? ' + t2b + '&deg; &minus; ' + t1 + '&deg;',
                resp: R.numero(dAng, { dec: 0 }),
                pista: 'Resta directa de los dos angulos.',
                despues: dAng > 180 ? 'Pasa de 180&deg;, asi que el angulo real del triangulo es 360&deg; &minus; ' + dAng + '&deg; = ' + (360 - dAng) + '&deg;. No importa: el coseno de los dos es el mismo, y la formula funciona igual.' : '' },
              { seccion: 'Paso 2: elegir la ley',
                queHacemos: 'Decidimos que herramienta usar.',
                paraQue: 'Dos lados y el angulo entre ellos es justo el caso de la ley de cosenos. Pitagoras solo valdria con 90&deg;.',
                queda: 'd&sup2; = ' + (r1 * r1) + ' + ' + (r2 * r2) + ' &minus; ' + (2 * r1 * r2) + ' cos ' + dAng + '&deg;',
                pregunta: 'En ese triangulo conocemos dos lados (' + r1 + ' y ' + r2 + ') y el angulo entre ellos.<br>&iquest;Que se usa?',
                resp: R.opcion(['La ley de cosenos', 'El teorema de Pitagoras'], 0),
                pista: 'Pitagoras solo valdria si el angulo fuera de 90&deg;, y aqui es de ' + dAng + '&deg;.',
                despues: 'd&sup2; = r&sub1;&sup2; + r&sub2;&sup2; &minus; 2r&sub1;r&sub2;cos(&theta;&sub2; &minus; &theta;&sub1;).' },
              { seccion: 'Paso 3: el coseno',
                queHacemos: 'Sacamos el coseno del angulo.',
                paraQue: 'Si pasa de 90&deg; sale negativo, y la resta acaba sumando: los puntos quedan mas lejos.',
                queda: 'cos ' + dAng + '&deg; = ' + F.n(Math.cos(rad(dAng)), 4),
                pregunta: 'Calcula cos ' + dAng + '&deg; (4 decimales)',
                resp: R.numero(Math.cos(rad(dAng)), { dec: 4, tol: 0.001 }),
                pista: 'Calculadora en grados.' + (Math.cos(rad(dAng)) < 0 ? ' Sale negativo, asi que el termino acabara sumando.' : ''),
                despues: '' },
              { seccion: 'Paso 4: aplicar la formula',
                queHacemos: 'Sustituimos todo en la ley de cosenos.',
                paraQue: 'Esto da d&sup2;, todavia no la distancia.',
                queda: 'd&sup2; = ' + F.n(d * d, 2),
                pregunta: 'Aplica la formula: d&sup2; = ' + (r1 * r1) + ' + ' + (r2 * r2) + ' &minus; 2(' + r1 + ')(' + r2 + ')(' + F.n(Math.cos(rad(dAng)), 4) + ') (2 decimales)',
                resp: R.numero(d * d, { dec: 2, tol: 0.2 }),
                pista: 'El producto 2r&sub1;r&sub2;cos vale ' + F.n(2 * r1 * r2 * Math.cos(rad(dAng)), 3) + '. Restaselo a ' + (r1 * r1 + r2 * r2) + '.',
                despues: '' },
              { seccion: 'Paso 5: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Sale mucho mas rapido que pasar los dos puntos a rectangulares.',
                queda: 'd = ' + F.n(d, 2),
                pregunta: 'Saca la raiz. &iquest;Cual es la distancia? (2 decimales)',
                resp: R.numero(d, { dec: 2, tol: 0.02 }),
                pista: '&radic;<span class="rad">' + F.n(d * d, 2) + '</span>.',
                despues: 'Comprobacion: debe ser menor que ' + (r1 + r2) + ' (la suma de los dos radios).' }
            ],
            final: 'La distancia es <b>' + F.n(d, 2) + '</b>',
            receta: ['El origen y los dos puntos forman un triangulo',
              'Los radios son dos lados y la diferencia de angulos es el angulo entre ellos',
              'Ley de cosenos, no Pitagoras',
              'Si la diferencia pasa de 180&deg; da igual: el coseno es el mismo',
              'Debe salir menor que la suma de los radios']
          });
          enun = 'Calcula la distancia entre los puntos polares P(' + r1 + ', ' + t1 + '&deg;) y Q(' + r2 + ', ' + t2b + '&deg;).<br>(2 decimales)';
          resp = R.numero(d, { dec: 2, tol: 0.02 });
          pistas = ['Puedes pasarlos a rectangulares, o usar directamente la ley de cosenos con el angulo entre los radios.',
            'El angulo entre los radios es ' + dAng + '&deg;.'];
          sol = ['d&sup2; = r&sub1;&sup2; + r&sub2;&sup2; &minus; 2r&sub1;r&sub2;cos(&theta;&sub2; &minus; &theta;&sub1;)',
            'd&sup2; = ' + (r1 * r1) + ' + ' + (r2 * r2) + ' &minus; ' + F.n(2 * r1 * r2 * Math.cos(rad(dAng)), 3) + ' = ' + F.n(d * d, 3),
            'd = <b>' + F.n(d, 2) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
