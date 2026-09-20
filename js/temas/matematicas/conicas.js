/* Secciones conicas */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function cuad(v, h) {   // (x - h)^2 con signo correcto
    if (h === 0) return v + '&sup2;';
    return '(' + v + (h > 0 ? ' &minus; ' + h : ' + ' + (-h)) + ')&sup2;';
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.circunferencia = function (r) {
    var h = r.entero(-7, 7), k = r.entero(-7, 7), a = r.entero(2, 9);
    return {
      guia: EJ.guia.circunferencia(h, k, a),
      enunciado: 'Encuentra el centro y el radio de la circunferencia:<br><span class="big">' +
        cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '</span>',
      respuesta: R.varios([
        { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
      ]),
      pistas: ['En (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2; el centro es (h, k). Ojo con los signos.',
        'El lado derecho es r&sup2; = ' + (a * a) + '.'],
      solucion: ['Comparo con la forma ordinaria',
        'Centro: <b>(' + h + ', ' + k + ')</b>',
        'r = &radic;<span class="rad">' + (a * a) + '</span> = <b>' + a + '</b>']
    };
  };

  extra.parabolaHorizontal = function (r) {
    var h = r.entero(-6, 6), k = r.entero(-6, 6);
    var p = r.elige([1, 2, 3, -1, -2, -3]);
    return {
      guia: G({
        intro: 'Tenemos <b>' + cuad('y', k) + ' = ' + (4 * p) + '(x ' + (h > 0 ? '&minus; ' + h : '+ ' + (-h)) + ')</b>.<br>' +
          'Lo primero en cualquier parabola es ver <b>cual de las dos variables esta al cuadrado</b>, ' +
          'porque eso decide hacia donde abre. Aqui la elevada es la y, y eso cambia todo respecto a la parabola de siempre.',
        pasos: [
          { pregunta: 'La variable al cuadrado es la y. &iquest;Que significa eso?',
            resp: R.opcion(['Que la parabola abre horizontalmente, a la derecha o a la izquierda',
              'Que abre hacia arriba o hacia abajo'], 0),
            pista: 'La parabola se abre en la direccion de la variable que va SOLA (sin cuadrado). Aqui la que va sola es la x.',
            despues: 'Asi que abre horizontal y el foco se correra en horizontal.' },
          { pregunta: '&iquest;Cual es la coordenada x del vertice?',
            resp: R.numero(h, { dec: 2 }),
            pista: 'Es el numero dentro del parentesis de la x, con el signo CAMBIADO: ' + (h > 0 ? '(x &minus; ' + h + ') da ' + h : '(x + ' + (-h) + ') da ' + h) + '.',
            despues: '' },
          { pregunta: '&iquest;Y la coordenada y del vertice?',
            resp: R.numero(k, { dec: 2 }),
            pista: 'Del otro parentesis, tambien con el signo cambiado.',
            despues: 'Vertice: (' + h + ', ' + k + ').' },
          { pregunta: 'El coeficiente de afuera es 4p = ' + (4 * p) + '.<br>&iquest;Cuanto vale p?',
            resp: R.numero(p, { dec: 2 }),
            pista: 'Divide entre 4: ' + (4 * p) + ' &divide; 4.',
            despues: 'p es la distancia del vertice al foco, y su signo dice la direccion.' },
          { pregunta: 'El foco se corre p unidades desde el vertice, en HORIZONTAL.<br>Foco x = ' + h + ' + (' + p + ')',
            resp: R.numero(h + p, { dec: 2 }),
            pista: 'Suma p a la x del vertice. La y del foco no cambia: sigue siendo ' + k + '.',
            despues: '' },
          { pregunta: 'Como p es ' + (p > 0 ? 'positivo' : 'negativo') + ', &iquest;hacia donde abre?',
            resp: R.opcion(['La derecha', 'La izquierda'], p > 0 ? 0 : 1),
            pista: 'La parabola siempre abre hacia el lado donde esta el foco.',
            despues: 'La directriz queda del otro lado: x = ' + (h - p) + '.' },
          { pregunta: 'Escribe las cuatro respuestas.',
            resp: R.varios([
              { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
              { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
              { etiqueta: 'Foco x', resp: R.numero(h + p, { dec: 2 }) },
              { etiqueta: 'Abre hacia', resp: R.opcion(['La derecha', 'La izquierda'], p > 0 ? 0 : 1) }
            ]),
            pista: 'Vertice (' + h + ', ' + k + '), foco x = ' + (h + p) + ', abre hacia ' + (p > 0 ? 'la derecha' : 'la izquierda') + '.',
            despues: '' }
        ],
        final: 'Vertice <b>(' + h + ', ' + k + ')</b>, foco <b>(' + (h + p) + ', ' + k + ')</b>, abre hacia <b>' + (p > 0 ? 'la derecha' : 'la izquierda') + '</b>',
        receta: ['Ver que variable esta al cuadrado: decide la direccion',
          'Abre en la direccion de la variable que va sola',
          'El vertice sale de los parentesis con el signo cambiado',
          'p = (coeficiente de afuera) / 4',
          'El foco se corre p desde el vertice; la directriz, p al otro lado']
      }),
      enunciado: 'La parabola <span class="big">' + cuad('y', k) + ' = ' + (4 * p) + '(x ' + (h > 0 ? '&minus; ' + h : '+ ' + (-h)) + ')</span> abre horizontalmente.<br>' +
        'Encuentra su vertice, su foco y hacia donde abre.',
      respuesta: R.varios([
        { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'Foco x', resp: R.numero(h + p, { dec: 2 }) },
        { etiqueta: 'Abre hacia', resp: R.opcion(['La derecha', 'La izquierda'], p > 0 ? 0 : 1) }
      ]),
      pistas: ['Cuando la y es la que esta al cuadrado, la parabola abre a la derecha (p &gt; 0) o a la izquierda (p &lt; 0).',
        '4p = ' + (4 * p) + ' &rArr; p = ' + p + '. El foco se corre p unidades en horizontal desde el vertice.'],
      solucion: ['Vertice: <b>(' + h + ', ' + k + ')</b>',
        '4p = ' + (4 * p) + ' &rArr; p = ' + p,
        'Foco: (h + p, k) = <b>(' + (h + p) + ', ' + k + ')</b>',
        'Como p ' + (p > 0 ? '&gt; 0 abre hacia <b>la derecha</b>' : '&lt; 0 abre hacia <b>la izquierda</b>') + '; directriz x = ' + (h - p)]
    };
  };

  extra.elipseTrasladada = function (r) {
    var h = r.entero(-6, 6), k = r.entero(-6, 6);
    var a = r.entero(4, 9), b = r.entero(2, a - 1);
    var c = Math.sqrt(a * a - b * b);
    return {
      guia: G({
        intro: 'Elipse <b>' + F.frac(cuad('x', h), a * a) + ' + ' + F.frac(cuad('y', k), b * b) + ' = 1</b>.<br>' +
          'Es la elipse de siempre pero <b>trasladada</b>: en vez de estar centrada en el origen, su centro se movio a (h, k). ' +
          'Todo lo demas (a, b, c) se calcula exactamente igual; solo hay que acordarse de sumarle el centro al final.',
        pasos: [
          { pregunta: '&iquest;Cual es la coordenada x del centro?',
            resp: R.numero(h, { dec: 2 }),
            pista: 'Lo que hay dentro del parentesis, con el signo CAMBIADO. ' + (h >= 0 ? '(x &minus; ' + h + ') significa centro en ' + h : '(x + ' + (-h) + ') significa centro en ' + h) + '.',
            despues: '' },
          { pregunta: '&iquest;Y la coordenada y del centro?',
            resp: R.numero(k, { dec: 2 }),
            pista: 'Del otro parentesis, igual con el signo cambiado.',
            despues: 'Centro: (' + h + ', ' + k + ').' },
          { pregunta: 'En la elipse, c se calcula RESTANDO.<br>Calcula c&sup2; = ' + (a * a) + ' &minus; ' + (b * b),
            resp: R.numero(a * a - b * b, { dec: 0 }),
            pista: 'El denominador mayor menos el menor. (En la hiperbola se suma; en la elipse se resta.)',
            despues: '' },
          { pregunta: 'Saca la raiz para obtener c. (2 decimales)',
            resp: R.numero(c, { dec: 2, tol: 0.01 }),
            pista: '&radic;<span class="rad">' + (a * a - b * b) + '</span>.',
            despues: 'c es la distancia del centro a cada foco, y siempre sale menor que a.' },
          { pregunta: '&iquest;Sobre que eje estan los focos?',
            resp: R.opcion(['Sobre el horizontal, porque el denominador mayor esta bajo la x',
              'Sobre el vertical'], 0),
            pista: 'Los focos siempre van sobre el eje MAYOR, y el eje mayor es el de la variable con el denominador mas grande.',
            despues: 'Entonces los focos son (h &plusmn; c, k): solo cambia la x.' },
          { pregunta: 'Foco derecho x = ' + h + ' + ' + F.n(c, 2) + ' (2 decimales)',
            resp: R.numero(h + c, { dec: 2, tol: 0.01 }),
            pista: 'Al centro se le suma c.',
            despues: 'Aqui es donde se nota la traslacion: si el centro fuera el origen, el foco seria ' + F.n(c, 2) + ' a secas.' },
          { pregunta: 'Escribe las cuatro respuestas.',
            resp: R.varios([
              { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
              { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
              { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
              { etiqueta: 'Foco derecho x', resp: R.numero(h + c, { dec: 2, tol: 0.01 }) }
            ]),
            pista: 'Centro (' + h + ', ' + k + '), c = ' + F.n(c, 2) + ', foco derecho x = ' + F.n(h + c, 2) + '.',
            despues: '' }
        ],
        final: 'Centro <b>(' + h + ', ' + k + ')</b>, c = <b>' + F.n(c, 2) + '</b>, foco derecho <b>(' + F.n(h + c, 2) + ', ' + k + ')</b>',
        receta: ['El centro sale de los parentesis con el signo cambiado',
          'a&sup2; es el denominador mayor, b&sup2; el menor',
          'Elipse: c&sup2; = a&sup2; &minus; b&sup2; (se resta)',
          'Los focos van sobre el eje mayor',
          'A las coordenadas hay que sumarles el centro']
      }),
      enunciado: 'Para la elipse <span class="big">' + F.frac(cuad('x', h), a * a) + ' + ' + F.frac(cuad('y', k), b * b) + ' = 1</span><br>' +
        'encuentra el centro, el valor de c y las coordenadas del foco derecho (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Foco derecho x', resp: R.numero(h + c, { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['El centro sale de los parentesis, con signo cambiado.',
        'c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + ', y los focos estan sobre el eje mayor (horizontal).'],
      solucion: ['Centro: <b>(' + h + ', ' + k + ')</b>',
        'a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
        'c = &radic;<span class="rad">' + (a * a - b * b) + '</span> = <b>' + F.n(c, 2) + '</b>',
        'Focos: (h &plusmn; c, k) &rArr; el derecho es <b>(' + F.n(h + c, 2) + ', ' + k + ')</b>']
    };
  };

  EJ.tema({
    id: 'conicas',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Secciones conicas',
    descripcion: 'Identificar circunferencia, parabola, elipse e hiperbola y encontrar sus elementos.',
    formulario: 'Circunferencia: (x&minus;h)&sup2; + (y&minus;k)&sup2; = r&sup2;<br>' +
      'Parabola: (x&minus;h)&sup2; = 4p(y&minus;k) &nbsp; (foco a distancia p del vertice)<br>' +
      'Elipse: (x&minus;h)&sup2;/a&sup2; + (y&minus;k)&sup2;/b&sup2; = 1, con c&sup2; = a&sup2; &minus; b&sup2;<br>' +
      'Hiperbola: (x&minus;h)&sup2;/a&sup2; &minus; (y&minus;k)&sup2;/b&sup2; = 1, con c&sup2; = a&sup2; + b&sup2;',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, h, k, a, b, c;
      var TIPOS = ['Circunferencia', 'Parabola', 'Elipse', 'Hiperbola'];

      if (dif === 'facil') {
        var tf = r.subtema([
          ['identificar', 'Identificar la conica'],
          ['circunferencia', 'Centro y radio']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var idx = r.entero(0, 3);
        var A, C, ec;
        if (idx === 0) {
          A = r.elige([1, 2, 3, 4]);
          ec = A + 'x&sup2; + ' + A + 'y&sup2; ' + (r.bool() ? '+ ' + r.entero(1, 9) + 'x ' : '') + '&minus; ' + r.entero(2, 30) + ' = 0';
        } else if (idx === 1) {
          ec = r.bool()
            ? r.entero(1, 5) + 'x&sup2; &minus; ' + r.entero(2, 9) + 'y + ' + r.entero(1, 9) + ' = 0'
            : r.entero(1, 5) + 'y&sup2; + ' + r.entero(2, 9) + 'x &minus; ' + r.entero(1, 9) + ' = 0';
        } else if (idx === 2) {
          A = r.entero(2, 9); C = r.enteroExcepto(2, 9, [A]);
          ec = A + 'x&sup2; + ' + C + 'y&sup2; &minus; ' + r.entero(10, 60) + ' = 0';
        } else {
          A = r.entero(2, 9); C = r.entero(2, 9);
          ec = r.bool() ? A + 'x&sup2; &minus; ' + C + 'y&sup2; &minus; ' + r.entero(5, 40) + ' = 0'
            : '&minus;' + A + 'x&sup2; + ' + C + 'y&sup2; &minus; ' + r.entero(5, 40) + ' = 0';
        }
        var pasosId = [
          { pregunta: 'Lo primero, siempre: &iquest;cuantas variables aparecen elevadas al cuadrado?',
            resp: R.numero(idx === 1 ? 1 : 2, { dec: 0 }),
            pista: 'Busca x&sup2; y y&sup2;. ' + (idx === 1 ? 'Aqui solo una de las dos esta al cuadrado; la otra va sola.' : 'Aqui las dos estan al cuadrado.'),
            despues: idx === 1 ? 'Con una sola variable al cuadrado ya esta resuelto: es una parabola.'
              : 'Con las dos al cuadrado hay tres candidatas, y se separan mirando los coeficientes.' }
        ];
        if (idx !== 1) {
          pasosId.push({
            pregunta: '&iquest;Los coeficientes de x&sup2; y y&sup2; tienen el mismo signo?',
            resp: R.opcion(['Si, los dos son del mismo signo', 'No, son contrarios'], idx === 3 ? 1 : 0),
            pista: 'Si uno es positivo y el otro negativo, la curva se rompe en dos ramas que se van al infinito.',
            despues: idx === 3 ? 'Signos contrarios: es una hiperbola, y ahi se acaba.'
              : 'Mismo signo: es circunferencia o elipse. Falta un detalle mas.'
          });
          if (idx !== 3) {
            pasosId.push({
              pregunta: '&iquest;Los dos coeficientes son exactamente iguales?',
              resp: R.opcion(['Si, valen lo mismo', 'No, son distintos'], idx === 0 ? 0 : 1),
              pista: idx === 0 ? 'Compara los numeros que acompañan a x&sup2; y a y&sup2;: son el mismo.'
                : 'Compara los numeros: no coinciden.',
              despues: idx === 0 ? 'Iguales quiere decir que estira igual en las dos direcciones: circunferencia.'
                : 'Distintos pero del mismo signo: estira mas en una direccion que en la otra, o sea una elipse.'
            });
          }
        }
        pasosId.push({
          pregunta: 'Entonces, &iquest;que conica es?',
          resp: R.opcion(TIPOS, idx),
          pista: 'Falta un cuadrado &rarr; parabola. Mismos coeficientes &rarr; circunferencia. ' +
            'Mismo signo pero distintos &rarr; elipse. Signos contrarios &rarr; hiperbola.',
          despues: ''
        });
        guiaDelPaso = G({
          intro: 'Hay que identificar que conica es <b>' + ec + '</b>, sin dibujarla ni resolver nada.<br>' +
            'Se puede saber solo mirando los terminos cuadraticos, con un arbolito de tres preguntas. ' +
            'No hace falta completar cuadrados ni nada parecido.',
          pasos: pasosId,
          final: 'Es una <b>' + TIPOS[idx] + '</b>',
          receta: ['&iquest;Cuantas variables al cuadrado? Si solo una: parabola',
            'Si son dos, &iquest;mismo signo? Si no: hiperbola',
            'Si tienen el mismo signo, &iquest;coeficientes iguales? Si: circunferencia',
            'Si son distintos: elipse',
            'Los terminos lineales y la constante no cambian el tipo']
        });
        enun = '&iquest;Que conica representa la ecuacion?<br><span class="big">' + ec + '</span>';
        resp = R.opcion(TIPOS, idx);
        pistas = ['Fijate en los terminos cuadraticos: cuantos hay, si tienen el mismo coeficiente y si tienen el mismo signo.',
          'Regla rapida: falta un cuadrado &rarr; parabola; mismos coeficientes &rarr; circunferencia; mismo signo pero distintos &rarr; elipse; signos contrarios &rarr; hiperbola.'];
        sol = ['Observo los coeficientes de x&sup2; y y&sup2;',
          idx === 0 ? 'Los dos cuadrados tienen el MISMO coeficiente' :
            idx === 1 ? 'Solo aparece UNA variable al cuadrado' :
              idx === 2 ? 'Los dos cuadrados tienen el mismo signo pero distinto coeficiente' :
                'Los cuadrados tienen SIGNOS CONTRARIOS',
          'Es una <b>' + TIPOS[idx] + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['circulo', 'Circunferencia: centro y radio'],
          ['parabola', 'Parabola vertical'],
          ['parabolaHorizontal', 'Parabola horizontal'],
          ['elipse', 'Elipse: a, b y c']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'circulo') {
          h = r.entero(-7, 7); k = r.entero(-7, 7); a = r.entero(2, 9);
          guiaDelPaso = EJ.guia.circunferencia(h, k, a);
          enun = 'Encuentra el centro y el radio de la circunferencia:<br><span class="big">' +
            cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '</span>';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
          ]);
          pistas = ['En (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2; el centro es (h, k). Cuidado con los signos.',
            'El lado derecho es r&sup2; = ' + (a * a) + ', asi que r = &radic;<span class="rad">' + (a * a) + '</span>.'];
          sol = ['Comparo con (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2;',
            'Centro: <b>(' + h + ', ' + k + ')</b>',
            'r = &radic;<span class="rad">' + (a * a) + '</span> = <b>' + a + '</b>'];
        } else if (t === 'parabola') {
          h = r.entero(-6, 6); k = r.entero(-6, 6);
          var p = r.elige([1, 2, 3, -1, -2, -3]);
          guiaDelPaso = G({
            intro: 'Parabola <b>' + cuad('x', h) + ' = ' + (4 * p) + '(y ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')</b>.<br>' +
              'La forma (x &minus; h)&sup2; = 4p(y &minus; k) trae toda la informacion a la vista: ' +
              'el vertice en los parentesis y la posicion del foco en el coeficiente de afuera. Solo hay que leerla bien.',
            pasos: [
              { pregunta: 'La variable al cuadrado es la x. &iquest;Que direccion tiene la parabola?',
                resp: R.opcion(['Vertical: abre hacia arriba o hacia abajo',
                  'Horizontal: abre a los lados'], 0),
                pista: 'Abre en la direccion de la variable que va SOLA, que aqui es la y.',
                despues: 'Entonces el foco se correra en vertical.' },
              { pregunta: '&iquest;Cual es la coordenada x del vertice?',
                resp: R.numero(h, { dec: 2 }),
                pista: 'El numero del parentesis con el signo CAMBIADO: ' + cuad('x', h) + ' da ' + h + '.',
                despues: '' },
              { pregunta: '&iquest;Y la y del vertice?',
                resp: R.numero(k, { dec: 2 }),
                pista: 'Del otro parentesis, tambien con el signo cambiado.',
                despues: 'Vertice: (' + h + ', ' + k + ').' },
              { pregunta: 'El coeficiente de afuera es 4p = ' + (4 * p) + '.<br>&iquest;Cuanto vale p?',
                resp: R.numero(p, { dec: 2 }),
                pista: 'Divide entre 4.',
                despues: 'p es la distancia del vertice al foco. Como es ' + (p > 0 ? 'positivo, abre hacia arriba' : 'negativo, abre hacia abajo') + '.' },
              { pregunta: 'El eje es vertical, asi que la x del foco es la misma del vertice.<br>&iquest;Cual es?',
                resp: R.numero(h, { dec: 2 }),
                pista: 'No cambia: ' + h + '.',
                despues: '' },
              { pregunta: 'Y la y del foco: ' + k + ' + (' + p + ')',
                resp: R.numero(k + p, { dec: 2 }),
                pista: 'Al vertice se le suma p.',
                despues: 'La directriz queda al otro lado, en y = ' + (k - p) + '.' },
              { pregunta: 'Escribe las cuatro respuestas.',
                resp: R.varios([
                  { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
                  { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
                  { etiqueta: 'Foco x', resp: R.numero(h, { dec: 2 }) },
                  { etiqueta: 'Foco y', resp: R.numero(k + p, { dec: 2 }) }
                ]),
                pista: 'Vertice (' + h + ', ' + k + ') y foco (' + h + ', ' + (k + p) + ').',
                despues: '' }
            ],
            final: 'Vertice <b>(' + h + ', ' + k + ')</b> y foco <b>(' + h + ', ' + (k + p) + ')</b>',
            receta: ['La parabola abre en la direccion de la variable que va sola',
              'Vertice: los numeros de los parentesis con el signo cambiado',
              'p = coeficiente de afuera / 4',
              'El foco se corre p desde el vertice, sobre el eje',
              'La directriz queda p al otro lado']
          });
          enun = 'Encuentra el vertice y el foco de la parabola:<br><span class="big">' +
            cuad('x', h) + ' = ' + (4 * p) + '(y ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')</span>';
          resp = R.varios([
            { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Foco x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Foco y', resp: R.numero(k + p, { dec: 2 }) }
          ]);
          pistas = ['La forma (x &minus; h)&sup2; = 4p(y &minus; k) tiene vertice (h, k) y abre hacia arriba si p &gt; 0.',
            '4p = ' + (4 * p) + ' &rArr; p = ' + p + '. El foco esta p unidades arriba (o abajo) del vertice.'];
          sol = ['Vertice: <b>(' + h + ', ' + k + ')</b>',
            '4p = ' + (4 * p) + ' &rArr; p = ' + p,
            'El eje es vertical, asi que el foco es (h, k + p) = <b>(' + h + ', ' + (k + p) + ')</b>',
            'Directriz: y = ' + (k - p)];
        } else {
          a = r.entero(3, 9); b = r.entero(2, a - 1);
          c = Math.sqrt(a * a - b * b);
          guiaDelPaso = G({
            intro: 'Elipse <b>' + F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</b>, centrada en el origen.<br>' +
              'Los tres numeros que la describen son a (semieje mayor), b (semieje menor) y c (distancia del centro a cada foco). ' +
              'Los dos primeros se leen de los denominadores; el tercero se calcula.',
            pasos: [
              { pregunta: '&iquest;De donde sale a?',
                resp: R.opcion(['De la raiz del denominador MAYOR', 'De la raiz del denominador menor'], 0),
                pista: 'a es siempre el semieje mayor, asi que le corresponde el denominador mas grande. ' +
                  'Aqui el mayor es ' + (a * a) + ', que esta bajo la x.',
                despues: 'Y ojo: los denominadores son a&sup2; y b&sup2;, no a y b. Hay que sacarles raiz.' },
              { pregunta: 'Calcula a = &radic;<span class="rad">' + (a * a) + '</span>',
                resp: R.numero(a, { dec: 2, tol: 0.01 }),
                pista: 'Busca el numero que al cuadrado da ' + (a * a) + '.',
                despues: '' },
              { pregunta: 'Y b = &radic;<span class="rad">' + (b * b) + '</span>',
                resp: R.numero(b, { dec: 2, tol: 0.01 }),
                pista: 'Lo mismo con el otro denominador.',
                despues: '' },
              { pregunta: 'En la ELIPSE, &iquest;como se relaciona c con a y b?',
                resp: R.opcion(['c&sup2; = a&sup2; &minus; b&sup2; (se resta)', 'c&sup2; = a&sup2; + b&sup2; (se suma)'], 0),
                pista: 'En la elipse se RESTA y en la hiperbola se SUMA. Confundirlas es el error mas comun de todo el tema.',
                despues: 'Tiene sentido: en la elipse los focos estan DENTRO de la curva, asi que c tiene que ser menor que a.' },
              { pregunta: 'Calcula c = &radic;<span class="rad">' + (a * a) + ' &minus; ' + (b * b) + '</span> (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.01 }),
                pista: 'Dentro de la raiz queda ' + (a * a - b * b) + '.',
                despues: 'Comprueba que c = ' + F.n(c, 2) + ' sea menor que a = ' + a + '. Si te sale mayor, sumaste en vez de restar.' },
              { pregunta: 'Escribe a, b y c.',
                resp: R.varios([
                  { etiqueta: 'a', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'b', resp: R.numero(b, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'a = ' + a + ', b = ' + b + ' y c = ' + F.n(c, 2) + '.',
                despues: '' }
            ],
            final: 'a = <b>' + a + '</b>, b = <b>' + b + '</b> y c = <b>' + F.n(c, 2) + '</b>',
            receta: ['Los denominadores son a&sup2; y b&sup2;: hay que sacarles raiz',
              'a es el del denominador MAYOR',
              'Elipse: c&sup2; = a&sup2; &minus; b&sup2;',
              'c siempre sale menor que a',
              'Focos en (&plusmn;c, 0) y vertices en (&plusmn;a, 0)']
          });
          enun = 'Para la elipse <span class="big">' + F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</span><br>' +
            'encuentra a, b y c (2 decimales).';
          resp = R.varios([
            { etiqueta: 'a', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['a es la raiz del denominador MAYOR y b la del menor.',
            'En la elipse c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ' &rArr; a = <b>' + a + '</b>',
            'b&sup2; = ' + (b * b) + ' &rArr; b = <b>' + b + '</b>',
            'c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a - b * b) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'Focos en (&plusmn;' + F.n(c, 2) + ', 0), vertices en (&plusmn;' + a + ', 0)'];
        }
      } else {
        var t2 = r.subtema([
          ['general', 'Completar el cuadrado'],
          ['hiperbola', 'Hiperbola: c, vertices y asintotas'],
          ['elipseTrasladada', 'Elipse con centro (h, k)'],
          ['construir', 'Escribir la ecuacion']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'general') {
          h = r.entero(-6, 6); k = r.entero(-6, 6); a = r.entero(2, 8);
          var D = -2 * h, E = -2 * k, Fc = h * h + k * k - a * a;
          guiaDelPaso = G({
            intro: 'La ecuacion viene en <b>forma general</b>, toda revuelta. Para leerle el centro y el radio hay que ' +
              'pasarla a la forma ordinaria (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2;.<br>' +
              'Eso se hace <b>completando el cuadrado</b>, una vez con la x y otra con la y. Son los mismos pasos dos veces.',
            pasos: [
              { pregunta: 'Agrupa los terminos de x por un lado, los de y por otro, y manda la constante a la derecha.<br>&iquest;Que queda del lado derecho?',
                resp: R.numero(-Fc, { dec: 0 }),
                pista: 'El ' + Fc + ' cambia de signo al pasar: queda ' + (-Fc) + '.',
                despues: '(x&sup2; ' + (D >= 0 ? '+ ' + D : '&minus; ' + (-D)) + 'x) + (y&sup2; ' + (E >= 0 ? '+ ' + E : '&minus; ' + (-E)) + 'y) = ' + (-Fc) },
              { pregunta: 'Para completar el cuadrado en x hay que sumar (mitad del coeficiente de x)&sup2;.<br>La mitad de ' + D + ' es ' + (D / 2) + '. &iquest;Cuanto es ' + (D / 2) + '&sup2;?',
                resp: R.numero((D / 2) * (D / 2), { dec: 0 }),
                pista: 'Al cuadrado siempre sale positivo.',
                despues: 'Con eso el grupo de la x se vuelve ' + cuad('x', h) + '.' },
              { pregunta: 'Lo mismo con la y: la mitad de ' + E + ' es ' + (E / 2) + '. &iquest;Cuanto es ' + (E / 2) + '&sup2;?',
                resp: R.numero((E / 2) * (E / 2), { dec: 0 }),
                pista: 'Mismo procedimiento.',
                despues: 'Y el grupo de la y se vuelve ' + cuad('y', k) + '.' },
              { pregunta: 'Lo que sumas de un lado hay que sumarlo del otro.<br>&iquest;Cuanto queda a la derecha? ' + (-Fc) + ' + ' + ((D / 2) * (D / 2)) + ' + ' + ((E / 2) * (E / 2)),
                resp: R.numero(a * a, { dec: 0 }),
                pista: 'Suma los tres numeros. Este paso es el que mas se olvida: si no sumas del otro lado, el radio sale mal.',
                despues: 'Queda ' + cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '. Ahora ya se lee todo.' },
              { pregunta: '&iquest;Cual es la coordenada x del centro?',
                resp: R.numero(h, { dec: 2 }),
                pista: 'Es el numero del parentesis con el signo cambiado. Atajo: siempre es &minus;D/2 = &minus;(' + D + ')/2.',
                despues: '' },
              { pregunta: '&iquest;Y la y del centro?',
                resp: R.numero(k, { dec: 2 }),
                pista: 'Igual: &minus;E/2 = &minus;(' + E + ')/2.',
                despues: 'Centro (' + h + ', ' + k + ').' },
              { pregunta: 'El lado derecho es r&sup2; = ' + (a * a) + '.<br>&iquest;Cuanto vale el radio?',
                resp: R.numero(a, { dec: 2, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + (a * a) + '</span>. No te quedes con ' + (a * a) + '.',
                despues: '' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
                  { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
                  { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'Centro (' + h + ', ' + k + ') y radio ' + a + '.',
                despues: '' }
            ],
            final: 'Centro <b>(' + h + ', ' + k + ')</b> y radio <b>' + a + '</b>',
            receta: ['Agrupar las x juntas, las y juntas, y la constante a la derecha',
              'Completar el cuadrado: sumar (mitad del coeficiente)&sup2;',
              'Sumar ESO MISMO tambien del lado derecho',
              'Atajo para el centro: (&minus;D/2, &minus;E/2)',
              'El lado derecho es r&sup2;: sacarle raiz']
          });
          enun = 'Completa el cuadrado y encuentra el centro y el radio de:<br><span class="big">' +
            'x&sup2; + y&sup2; ' + (D >= 0 ? '+ ' + D : '&minus; ' + (-D)) + 'x ' + (E >= 0 ? '+ ' + E : '&minus; ' + (-E)) + 'y ' +
            (Fc >= 0 ? '+ ' + Fc : '&minus; ' + (-Fc)) + ' = 0</span>';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Agrupa los terminos de x y los de y, y completa el cuadrado en cada grupo.',
            'La mitad de ' + D + ' es ' + (D / 2) + ' y su cuadrado es ' + (D / 2) * (D / 2) + '; igual con y.'];
          sol = ['Agrupo: (x&sup2; ' + (D >= 0 ? '+ ' + D : '&minus; ' + (-D)) + 'x) + (y&sup2; ' + (E >= 0 ? '+ ' + E : '&minus; ' + (-E)) + 'y) = ' + (-Fc),
            'Completo cuadrados sumando ' + ((D / 2) * (D / 2)) + ' y ' + ((E / 2) * (E / 2)) + ' en ambos lados',
            cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a),
            'Centro <b>(' + h + ', ' + k + ')</b>, radio <b>' + a + '</b>'];
        } else if (t2 === 'hiperbola') {
          a = r.entero(2, 8); b = r.entero(2, 8);
          c = Math.sqrt(a * a + b * b);
          guiaDelPaso = G({
            intro: 'Hiperbola <b>' + F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</b>.<br>' +
              'Se parece mucho a la elipse, pero con un menos en medio, y ese menos cambia dos cosas importantes: ' +
              'c ahora se calcula <b>sumando</b>, y aparecen las <b>asintotas</b>, dos rectas a las que la curva se acerca sin tocarlas nunca.',
            pasos: [
              { pregunta: 'En la HIPERBOLA, &iquest;como se calcula c?',
                resp: R.opcion(['c&sup2; = a&sup2; + b&sup2; (se suma)', 'c&sup2; = a&sup2; &minus; b&sup2; (se resta)'], 0),
                pista: 'Al reves que en la elipse. Aqui los focos quedan mas lejos que los vertices, asi que c tiene que ser MAYOR que a.',
                despues: 'Truco para acordarse: el signo de la formula es el contrario al signo de la ecuacion.' },
              { pregunta: 'Calcula c = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span> (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.01 }),
                pista: 'Dentro de la raiz queda ' + (a * a + b * b) + '.',
                despues: 'Comprueba: c = ' + F.n(c, 2) + ' es mayor que a = ' + a + ', como tiene que ser.' },
              { pregunta: 'Los vertices estan en (&plusmn;a, 0), sobre el eje de la variable POSITIVA (aqui la x).<br>&iquest;Cual es la x del vertice positivo?',
                resp: R.numero(a, { dec: 2 }),
                pista: 'a = &radic;<span class="rad">' + (a * a) + '</span> = ' + a + '. La hiperbola solo corta ese eje, nunca el otro.',
                despues: '' },
              { pregunta: 'Las asintotas son y = &plusmn;(b/a)x.<br>&iquest;Cual es la pendiente positiva? (2 decimales)',
                resp: R.numero(b / a, { dec: 2, tol: 0.01 }),
                pista: b + ' &divide; ' + a + '. Ojo al orden: es b sobre a, no al reves.',
                despues: 'Las asintotas son las diagonales del rectangulo de lados 2a y 2b centrado en el origen.' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Vertice x', resp: R.numero(a, { dec: 2 }) },
                  { etiqueta: 'Pendiente', resp: R.numero(b / a, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'c = ' + F.n(c, 2) + ', vertice x = ' + a + ', pendiente = ' + F.n(b / a, 2) + '.',
                despues: '' }
            ],
            final: 'c = <b>' + F.n(c, 2) + '</b>, vertice <b>(' + a + ', 0)</b>, pendiente de las asintotas <b>' + F.n(b / a, 2) + '</b>',
            receta: ['Hiperbola: c&sup2; = a&sup2; + b&sup2; (se SUMA)',
              'c siempre mayor que a (al reves que en la elipse)',
              'a&sup2; es el denominador del termino POSITIVO, aunque no sea el mayor',
              'Vertices en (&plusmn;a, 0)',
              'Asintotas y = &plusmn;(b/a)x']
          });
          enun = 'Para la hiperbola <span class="big">' + F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</span><br>' +
            'encuentra c, las coordenadas de un vertice (el positivo) y la pendiente positiva de las asintotas (2 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Vertice x', resp: R.numero(a, { dec: 2 }) },
            { etiqueta: 'Pendiente', resp: R.numero(b / a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['En la hiperbola se SUMAN: c&sup2; = a&sup2; + b&sup2;.',
            'Las asintotas de esta hiperbola son y = &plusmn;(b/a)x = &plusmn;(' + b + '/' + a + ')x.'];
          sol = ['a = ' + a + ', b = ' + b,
            'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'Vertices en (&plusmn;a, 0) = <b>(' + a + ', 0)</b> y (' + (-a) + ', 0)',
            'Asintotas: y = &plusmn;' + F.frac(b, a) + 'x, pendiente <b>' + F.n(b / a, 2) + '</b>'];
        } else {
          h = r.entero(-5, 5); k = r.entero(-5, 5); a = r.entero(2, 8);
          guiaDelPaso = G({
            intro: 'Hay que escribir la ecuacion de la circunferencia con centro <b>(' + h + ', ' + k + ')</b> ' +
              'que pasa por <b>(' + (h + a) + ', ' + k + ')</b>.<br>' +
              'Es el problema al reves del de siempre: en vez de leer los datos de la ecuacion, hay que construirla. ' +
              'El centro ya nos lo dan, asi que lo unico que falta es el radio.',
            pasos: [
              { pregunta: 'En este problema, &iquest;que es el radio?',
                resp: R.opcion(['La distancia del centro al punto por el que pasa',
                  'La mitad de la distancia entre los dos puntos'], 0),
                pista: 'Todos los puntos de una circunferencia estan a la misma distancia del centro, y esa distancia ES el radio. ' +
                  'Como el punto dado esta en la circunferencia, su distancia al centro es justo r.',
                despues: '' },
              { pregunta: 'Los dos puntos tienen la misma y (' + k + '), asi que la distancia es solo la resta de las x.<br>Calcula |' + (h + a) + ' &minus; (' + h + ')|',
                resp: R.numero(a, { dec: 2, tol: 0.01 }),
                pista: 'No hace falta Pitagoras: al estar alineados horizontalmente, &Delta;y = 0.',
                despues: 'El radio es ' + a + '.' },
              { pregunta: 'En la ecuacion (x &minus; h)&sup2; + (y &minus; k)&sup2; = ?, el lado derecho es r&sup2;.<br>&iquest;Cuanto vale?',
                resp: R.numero(a * a, { dec: 2, tol: 0.01 }),
                pista: a + '&sup2; = ' + (a * a) + '. Este es el error tipico al reves: aqui hay que ELEVAR, no sacar raiz.',
                despues: 'La ecuacion completa queda ' + cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '.' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Lado derecho (r&sup2;)', resp: R.numero(a * a, { dec: 2, tol: 0.01 }) }
                ]),
                pista: 'Radio ' + a + ' y r&sup2; = ' + (a * a) + '.',
                despues: '' }
            ],
            final: '<b>' + cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '</b>',
            receta: ['El radio es la distancia del centro a cualquier punto de la curva',
              'Si los puntos estan alineados, la distancia es una simple resta',
              'En la ecuacion, el centro va con el signo cambiado',
              'El lado derecho es r&sup2;, no r']
          });
          enun = 'Escribe la ecuacion de la circunferencia con centro (' + h + ', ' + k + ') que pasa por el punto (' + (h + a) + ', ' + k + ').<br>' +
            'Da el radio y el valor del lado derecho de la ecuacion (x &minus; h)&sup2; + (y &minus; k)&sup2; = ?';
          resp = R.varios([
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Lado derecho (r&sup2;)', resp: R.numero(a * a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['El radio es la distancia del centro al punto dado.',
            'Como tienen la misma y, la distancia es simplemente |' + (h + a) + ' &minus; (' + h + ')| = ' + a + '.'];
          sol = ['r = distancia entre (' + h + ', ' + k + ') y (' + (h + a) + ', ' + k + ') = <b>' + a + '</b>',
            'r&sup2; = <b>' + (a * a) + '</b>',
            'Ecuacion: ' + cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a)];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
