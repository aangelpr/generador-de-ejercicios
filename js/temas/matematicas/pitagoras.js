/* Teorema de Pitagoras */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var TERNAS = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29], [6, 8, 10], [9, 12, 15], [10, 24, 26], [12, 16, 20]];

  /* Triangulo rectangulo con etiquetas en los tres lados. */
  function figura(ca, cb, hip) {
    return F.svg(230, 150,
      '<path d="M30 120 L190 120 L30 25 Z"/>' +
      '<path d="M30 105 L45 105 L45 120" stroke-width="1.5"/>' +
      F.txtSvg(100, 140, cb) +
      F.txtSvg(8, 80, ca) +
      F.txtSvg(120, 65, hip));
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.cuadradoDiagonal = function (r) {
    var L = r.entero(3, 25);
    var d = L * Math.SQRT2;
    return {
      guia: G({
        intro: 'Un cuadrado de <b>' + L + ' cm</b> de lado, y queremos su diagonal.<br>' +
          'A primera vista no hay ningun triangulo... hasta que trazas la diagonal: ' +
          'el cuadrado queda partido en dos triangulos rectangulos, y la diagonal es la hipotenusa de cualquiera de ellos.',
        pasos: [
          { seccion: 'Paso 1: encontrar el triangulo',
            queHacemos: 'Vemos que triangulo aparece al trazar la diagonal.',
            paraQue: 'Las esquinas del cuadrado son angulos rectos: los dos lados hacen de catetos y la diagonal de hipotenusa.',
            queda: 'd&sup2; = ' + L + '&sup2; + ' + L + '&sup2;',
            pregunta: 'Al trazar la diagonal, &iquest;que triangulo aparece?',
            resp: R.opcion(['Uno rectangulo con catetos ' + L + ' y ' + L, 'Uno equilatero de lado ' + L], 0),
            pista: 'Las esquinas del cuadrado son angulos rectos, y los dos lados que forman la esquina son los catetos.',
            despues: 'Ahora ya es un Pitagoras normal.' },
          { seccion: 'Paso 2: sumar los cuadrados',
            queHacemos: 'Elevamos los dos catetos y los sumamos.',
            paraQue: 'Como son iguales, es el doble de uno solo.',
            queda: 'd&sup2; = ' + (2 * L * L),
            pregunta: 'Suma los cuadrados de los catetos: ' + L + '&sup2; + ' + L + '&sup2;',
            resp: R.numero(2 * L * L, { dec: 0 }),
            pista: L + '&sup2; = ' + (L * L) + ', y como son dos iguales, el doble.',
            despues: 'd&sup2; = ' + (2 * L * L) + '.' },
          { seccion: 'Paso 3: la raiz',
            queHacemos: 'Sacamos la raiz.',
            paraQue: 'De aqui sale la formula rapida: la diagonal de un cuadrado SIEMPRE es el lado por &radic;2 (como 1.414 veces).',
            queda: 'd = ' + F.n(d, 2) + ' cm',
            pregunta: 'Saca la raiz. &iquest;Cuanto mide la diagonal? (2 decimales)',
            resp: R.numero(d, { dec: 2, tol: 0.01, unidad: 'cm' }),
            pista: '&radic;<span class="rad">' + (2 * L * L) + '</span>. Exacto vale ' + L + '&radic;<span class="rad">2</span>.',
            despues: 'De aqui sale la formula rapida: la diagonal de un cuadrado SIEMPRE es el lado por &radic;<span class="rad">2</span> (como 1.414 veces).' }
        ],
        final: 'La diagonal mide <b>' + F.n(d, 2) + ' cm</b>',
        receta: ['Trazar la diagonal: aparecen dos triangulos rectangulos',
          'Los catetos son dos lados del cuadrado',
          'd&sup2; = L&sup2; + L&sup2; = 2L&sup2;',
          'Formula rapida: d = L&radic;<span class="rad">2</span>']
      }),
      enunciado: 'Un cuadrado tiene lados de ' + L + ' cm.<br>&iquest;Cuanto mide su diagonal? (2 decimales)',
      respuesta: R.numero(d, { dec: 2, tol: 0.01, unidad: 'cm' }),
      pistas: ['La diagonal parte el cuadrado en dos triangulos rectangulos de catetos ' + L + ' y ' + L + '.',
        'd&sup2; = ' + (L * L) + ' + ' + (L * L) + ' = ' + (2 * L * L) + '.'],
      solucion: ['d&sup2; = ' + L + '&sup2; + ' + L + '&sup2; = ' + (2 * L * L),
        'd = &radic;<span class="rad">' + (2 * L * L) + '</span> = ' + L + '&radic;<span class="rad">2</span>',
        'd = <b>' + F.n(d, 2) + ' cm</b>']
    };
  };

  extra.equilatero = function (r) {
    var L = r.entero(4, 24);
    var h = L * Math.sqrt(3) / 2;
    var area = L * h / 2;
    return {
      guia: G({
        intro: 'Un triangulo equilatero de <b>' + L + ' cm</b> de lado; queremos su altura y su area.<br>' +
          'Un equilatero no es rectangulo, asi que Pitagoras no se aplica directo. El truco es <b>trazar la altura</b>: ' +
          'parte el triangulo justo por la mitad y deja dos triangulos rectangulos identicos. Ahi si se puede.',
        pasos: [
          { seccion: 'Paso 1: partirlo por la mitad',
            queHacemos: 'Trazamos la altura y medimos la base de cada mitad.',
            paraQue: 'Un equilatero no es rectangulo, pero la altura lo parte en dos que si lo son. Ese corte es el que habilita Pitagoras.',
            queda: 'catetos: h y ' + (L / 2),
            pregunta: 'La altura cae en el punto medio del lado de abajo.<br>&iquest;Cuanto mide la base de cada mitad?',
            resp: R.numero(L / 2, { dec: 2, tol: 0.01 }),
            pista: 'La mitad del lado: ' + L + ' &divide; 2.',
            despues: 'Cada mitad es un triangulo rectangulo con catetos h y ' + (L / 2) + '.' },
          { seccion: 'Paso 2: quien es la hipotenusa',
            queHacemos: 'Decidimos cual de los lados de la mitad es la hipotenusa.',
            paraQue: 'De esto depende todo: si la incognita es un cateto se RESTA, no se suma.',
            queda: 'h&sup2; = ' + (L * L) + ' &minus; ' + ((L / 2) * (L / 2)),
            pregunta: 'En esa mitad, &iquest;cual es la hipotenusa?',
            resp: R.opcion(['El lado del triangulo, que mide ' + L, 'La altura h'], 0),
            pista: 'La hipotenusa es el lado inclinado, el que esta frente al angulo recto. La altura es un cateto.',
            despues: 'Entonces h es un cateto: hay que RESTAR.' },
          { seccion: 'Paso 3: calcular h&sup2;',
            queHacemos: 'Restamos los dos cuadrados.',
            paraQue: 'Siempre la hipotenusa al cuadrado menos el cateto al cuadrado. Si sale negativo, estan cambiados.',
            queda: 'h&sup2; = ' + (L * L - (L / 2) * (L / 2)),
            pregunta: 'Calcula h&sup2; = ' + L + '&sup2; &minus; ' + (L / 2) + '&sup2; = ' + (L * L) + ' &minus; ' + ((L / 2) * (L / 2)),
            resp: R.numero(L * L - (L / 2) * (L / 2), { dec: 2, tol: 0.01 }),
            pista: 'Resta directa.', despues: '' },
          { seccion: 'Paso 4: la altura',
            queHacemos: 'Sacamos la raiz.',
            paraQue: 'De aqui sale la formula rapida del equilatero: h = L&radic;3/2.',
            queda: 'altura = ' + F.n(h, 2) + ' cm',
            pregunta: 'Saca la raiz: &iquest;cuanto mide la altura? (2 decimales)',
            resp: R.numero(h, { dec: 2, tol: 0.02 }),
            pista: '&radic;<span class="rad">' + F.n(L * L - (L / 2) * (L / 2), 2) + '</span>.',
            despues: 'De aqui sale la formula rapida del equilatero: h = L&radic;<span class="rad">3</span>/2.' },
          { seccion: 'Paso 5: el area',
            queHacemos: 'Multiplicamos base por altura y dividimos entre 2.',
            paraQue: 'Ojo: la base es el lado COMPLETO, no la mitad. La mitad solo sirvio para hallar h.',
            queda: 'altura ' + F.n(h, 2) + ' cm,  area ' + F.n(area, 2) + ' cm&sup2;',
            pregunta: 'Ahora el area: base &times; altura &divide; 2 = ' + L + ' &times; ' + F.n(h, 2) + ' &divide; 2 (2 decimales)',
            resp: R.numero(area, { dec: 2, tol: 0.2 }),
            pista: 'Ojo: la base es el lado COMPLETO (' + L + '), no la mitad. La mitad solo se uso para hallar h.',
            despues: '' },
          { seccion: 'Paso 6: escribir',
            queHacemos: 'Damos las dos respuestas.',
            paraQue: 'Ojo con las unidades: la altura en cm y el area en cm&sup2;.',
            queda: 'altura ' + F.n(h, 2) + ' cm,  area ' + F.n(area, 2) + ' cm&sup2;',
            pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.02 }) },
              { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.2 }) }
            ]),
            pista: 'Altura ' + F.n(h, 2) + ' cm y area ' + F.n(area, 2) + ' cm&sup2;.',
            despues: '' }
        ],
        final: 'Altura <b>' + F.n(h, 2) + ' cm</b> y area <b>' + F.n(area, 2) + ' cm&sup2;</b>',
        receta: ['Trazar la altura: parte el equilatero en dos rectangulos',
          'El cateto de abajo es MEDIO lado',
          'La hipotenusa es el lado completo, asi que se resta',
          'Formula rapida: h = L&radic;<span class="rad">3</span>/2',
          'Para el area se usa el lado completo como base']
      }),
      enunciado: 'Un triangulo equilatero tiene lados de ' + L + ' cm.<br>Calcula su altura y su area (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.02 }) },
        { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.2 }) }
      ]),
      pistas: ['La altura divide al equilatero en dos triangulos rectangulos con catetos h y ' + (L / 2) + '.',
        'h&sup2; = ' + L + '&sup2; &minus; ' + (L / 2) + '&sup2; = ' + (L * L - (L / 2) * (L / 2)) + '.'],
      solucion: ['Medio lado: ' + (L / 2),
        'h&sup2; = ' + (L * L) + ' &minus; ' + ((L / 2) * (L / 2)) + ' = ' + (L * L - (L / 2) * (L / 2)),
        'h = <b>' + F.n(h, 2) + ' cm</b> (formula rapida: h = L&radic;<span class="rad">3</span>/2)',
        'Area = base &middot; h / 2 = ' + L + ' &middot; ' + F.n(h, 2) + ' / 2 = <b>' + F.n(area, 2) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'pitagoras',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Teorema de Pitagoras',
    descripcion: 'Calcular hipotenusa y catetos, distancias y alturas en triangulos rectangulos.',
    formulario: 'c&sup2; = a&sup2; + b&sup2; (c es la hipotenusa)<br>' +
      'c = &radic;<span class="rad">a&sup2; + b&sup2;</span> &nbsp;&middot;&nbsp; a = &radic;<span class="rad">c&sup2; &minus; b&sup2;</span><br>' +
      'Distancia entre puntos: d = &radic;<span class="rad">(x&#8322;&minus;x&#8321;)&sup2; + (y&#8322;&minus;y&#8321;)&sup2;</span>',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, t, a, b, c;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['hipotenusa', 'Calcular la hipotenusa'],
          ['cateto', 'Calcular un cateto']
        ]);
        t = r.elige(TERNAS);
        a = t[0]; b = t[1]; c = t[2];
        if (tf === 'hipotenusa') {
          guiaDelPaso = EJ.guia.pitagoras(a, b);
          enun = 'Calcula la hipotenusa del triangulo rectangulo:' + figura(a + ' cm', b + ' cm', '?');
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['La hipotenusa es el lado mas largo, opuesto al angulo recto: c&sup2; = a&sup2; + b&sup2;.',
            a + '&sup2; + ' + b + '&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + '. Falta sacar la raiz.'];
          sol = ['c&sup2; = ' + a + '&sup2; + ' + b + '&sup2;',
            'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'c = &radic;<span class="rad">' + (a * a + b * b) + '</span> = <b>' + c + ' cm</b>'];
        } else {
          guiaDelPaso = G({
            intro: 'Conocemos la hipotenusa (<b>' + c + ' cm</b>) y un cateto (<b>' + a + ' cm</b>), y falta el otro cateto.<br>' +
              'Es el mismo teorema c&sup2; = a&sup2; + b&sup2;, pero al reves. Y eso cambia una cosa importante: ' +
              'cuando buscas un cateto se <b>RESTA</b>, no se suma.',
            pasos: [
              { seccion: 'Paso 1: quien es la hipotenusa',
                queHacemos: 'Identificamos la hipotenusa antes de operar.',
                paraQue: 'Si la incognita es un cateto se RESTA; si es la hipotenusa se suma. Confundirlo cambia todo el ejercicio.',
                queda: 'b&sup2; = ' + c + '&sup2; &minus; ' + a + '&sup2;',
                pregunta: '&iquest;Cual de los lados es la hipotenusa?',
                resp: R.opcion(['El de ' + c + ' cm: el mas largo, frente al angulo recto',
                  'El de ' + a + ' cm'], 0),
                pista: 'La hipotenusa siempre es el lado mas largo y nunca toca el angulo recto.',
                despues: 'Como la hipotenusa ya la conocemos, la incognita es un cateto: b&sup2; = c&sup2; &minus; a&sup2;.' },
              { seccion: 'Paso 2: los dos cuadrados',
                queHacemos: 'Elevamos al cuadrado la hipotenusa.',
                paraQue: 'Es el numero grande, el que va delante en la resta.',
                queda: 'b&sup2; = ' + (c * c) + ' &minus; ?',
                pregunta: 'Calcula el cuadrado de la hipotenusa: ' + c + '&sup2;',
                resp: R.numero(c * c, { dec: 0 }),
                pista: c + ' &times; ' + c + '.', despues: '' },
              { seccion: 'Paso 2: los dos cuadrados',
                queHacemos: 'Ahora el cateto que si conocemos.',
                paraQue: 'Para tener las dos piezas de la resta.',
                queda: 'b&sup2; = ' + (c * c) + ' &minus; ' + (a * a),
                pregunta: 'Y el del cateto conocido: ' + a + '&sup2;',
                resp: R.numero(a * a, { dec: 0 }),
                pista: a + ' &times; ' + a + '.', despues: '' },
              { seccion: 'Paso 3: restar',
                queHacemos: 'Restamos: siempre el grande menos el chico.',
                paraQue: 'Si te da negativo, cambiaste la hipotenusa por un cateto.',
                queda: 'b&sup2; = ' + (c * c - a * a),
                pregunta: 'Restalos: ' + (c * c) + ' &minus; ' + (a * a),
                resp: R.numero(c * c - a * a, { dec: 0 }),
                pista: 'Siempre el grande menos el chico. Si te da negativo, cambiaste la hipotenusa por un cateto.',
                despues: 'Eso es b&sup2;, todavia falta la raiz.' },
              { seccion: 'Paso 4: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Comprobacion: un cateto siempre sale menor que la hipotenusa.',
                queda: 'b = ' + b + ' cm',
                pregunta: 'Saca la raiz cuadrada de ' + (c * c - a * a) + '.<br>&iquest;Cuanto mide el otro cateto?',
                resp: R.numero(b, { dec: 2, tol: 0.01, unidad: 'cm' }),
                pista: 'Busca el numero que multiplicado por si mismo da ' + (c * c - a * a) + '.',
                despues: 'Comprueba que sea menor que la hipotenusa (' + c + '), y lo es.' }
            ],
            final: 'El otro cateto mide <b>' + b + ' cm</b>',
            receta: ['Identificar la hipotenusa: la mas larga, frente al angulo recto',
              'Si la incognita es un cateto, se RESTA',
              'b&sup2; = c&sup2; &minus; a&sup2;',
              'No olvidar la raiz al final',
              'Un cateto siempre sale menor que la hipotenusa']
          });
          enun = 'En un triangulo rectangulo la hipotenusa mide ' + c + ' cm y un cateto mide ' + a + ' cm.<br>Calcula el otro cateto.' + figura(a + ' cm', '?', c + ' cm');
          resp = R.numero(b, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['Despeja el cateto: b&sup2; = c&sup2; &minus; a&sup2;.',
            c + '&sup2; &minus; ' + a + '&sup2; = ' + (c * c) + ' &minus; ' + (a * a) + ' = ' + (c * c - a * a) + '.'];
          sol = ['b&sup2; = c&sup2; &minus; a&sup2;',
            'b&sup2; = ' + (c * c) + ' &minus; ' + (a * a) + ' = ' + (c * c - a * a),
            'b = &radic;<span class="rad">' + (c * c - a * a) + '</span> = <b>' + b + ' cm</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['noEntero', 'Hipotenusa con decimales'],
          ['rectangulo', 'Diagonal de un rectangulo'],
          ['distancia', 'Distancia entre dos puntos'],
          ['cuadradoDiagonal', 'Diagonal de un cuadrado']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'noEntero') {
          a = r.entero(3, 18); b = r.entero(3, 18);
          c = Math.sqrt(a * a + b * b);
          guiaDelPaso = EJ.guia.pitagoras(a, b);
          enun = 'Los catetos de un triangulo rectangulo miden ' + a + ' m y ' + b + ' m.<br>Calcula la hipotenusa (redondea a 2 decimales).' + figura(a + ' m', b + ' m', '?');
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['c = &radic;<span class="rad">a&sup2; + b&sup2;</span>.',
            'a&sup2; + b&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + '.'];
          sol = ['c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'c = &radic;<span class="rad">' + (a * a + b * b) + '</span>',
            'c = <b>' + F.n(c, 2) + ' m</b>' + (Math.abs(c - Math.round(c)) < 1e-9 ? '' : ' (valor exacto: ' + F.raizSimp(a * a + b * b) + ')')];
        } else if (t2 === 'rectangulo') {
          a = r.entero(4, 20); b = r.entero(4, 20);
          c = Math.sqrt(a * a + b * b);
          guiaDelPaso = G({
            intro: 'Un rectangulo de <b>' + a + ' cm</b> de base y <b>' + b + ' cm</b> de altura; queremos su diagonal.<br>' +
              'Aqui no hay ningun triangulo dibujado, pero la diagonal crea uno: parte el rectangulo en dos triangulos rectangulos. ' +
              'Reconocer eso es el 90% del ejercicio.',
            pasos: [
              { seccion: 'Paso 1: encontrar el triangulo',
                queHacemos: 'Vemos que la diagonal parte el rectangulo en dos triangulos rectangulos.',
                paraQue: 'No hay triangulo dibujado, pero la diagonal lo crea. Reconocerlo es el 90% del ejercicio.',
                queda: 'd&sup2; = ' + a + '&sup2; + ' + b + '&sup2;',
                pregunta: '&iquest;Por que se puede usar Pitagoras en un rectangulo?',
                resp: R.opcion(['Porque la diagonal lo parte en dos triangulos rectangulos',
                  'Porque todos los rectangulos son triangulos'], 0),
                pista: 'Las esquinas de un rectangulo son angulos rectos: la base y la altura hacen de catetos, y la diagonal de hipotenusa.',
                despues: 'Catetos: ' + a + ' y ' + b + '. Hipotenusa: la diagonal.' },
              { seccion: 'Paso 2: sumar los cuadrados',
                queHacemos: 'Elevamos base y altura y las sumamos.',
                paraQue: 'La diagonal es la hipotenusa, asi que aqui se SUMA.',
                queda: 'd&sup2; = ' + (a * a + b * b),
                pregunta: 'Suma los cuadrados: ' + a + '&sup2; + ' + b + '&sup2; = ' + (a * a) + ' + ' + (b * b),
                resp: R.numero(a * a + b * b, { dec: 0 }),
                pista: 'Eleva cada uno y suma.',
                despues: 'd&sup2; = ' + (a * a + b * b) + '.' },
              { seccion: 'Paso 3: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Comprobacion: la diagonal debe ser mayor que los dos lados y menor que su suma.',
                queda: 'd = ' + F.n(c, 2) + ' cm',
                pregunta: 'Saca la raiz. &iquest;Cuanto mide la diagonal? (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.01, unidad: 'cm' }),
                pista: '&radic;<span class="rad">' + (a * a + b * b) + '</span>.',
                despues: 'Comprueba: la diagonal debe ser mayor que los dos lados, y menor que su suma.' }
            ],
            final: 'La diagonal mide <b>' + F.n(c, 2) + ' cm</b>',
            receta: ['La diagonal parte el rectangulo en dos triangulos rectangulos',
              'Base y altura son los catetos',
              'La diagonal es la hipotenusa: se SUMA',
              'La diagonal siempre es mayor que cualquier lado']
          });
          enun = 'Un rectangulo mide ' + a + ' cm de base y ' + b + ' cm de altura.<br>&iquest;Cuanto mide su diagonal? (redondea a 2 decimales)';
          resp = R.numero(c, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['La diagonal parte el rectangulo en dos triangulos rectangulos cuyos catetos son la base y la altura.',
            'd = &radic;<span class="rad">' + (a * a) + ' + ' + (b * b) + '</span>.'];
          sol = ['La diagonal es la hipotenusa de un triangulo de catetos ' + a + ' y ' + b,
            'd&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b),
            'd = <b>' + F.n(c, 2) + ' cm</b>'];
        } else {
          var x1 = r.entero(-8, 8), y1 = r.entero(-8, 8);
          var x2 = r.entero(-8, 8), y2 = r.entero(-8, 8);
          while (x2 === x1 && y2 === y1) { x2 = r.entero(-8, 8); y2 = r.entero(-8, 8); }
          var dx = x2 - x1, dy = y2 - y1;
          c = Math.sqrt(dx * dx + dy * dy);
          guiaDelPaso = G({
            intro: 'Queremos la distancia entre <b>A(' + x1 + ', ' + y1 + ')</b> y <b>B(' + x2 + ', ' + y2 + ')</b>.<br>' +
              'La formula de la distancia no es una formula nueva: <b>es Pitagoras</b>. ' +
              'Si unes los dos puntos y dibujas el escaloncito horizontal y vertical, sale un triangulo rectangulo ' +
              'y la distancia es su hipotenusa.',
            pasos: [
              { seccion: 'Paso 1: los dos catetos',
                queHacemos: 'Restamos las x para tener el cateto horizontal.',
                paraQue: 'La formula de la distancia no es nueva: ES Pitagoras. El escaloncito entre los dos puntos forma el triangulo.',
                queda: '&Delta;x = ' + dx + ',  &Delta;y = ?',
                pregunta: 'Cateto horizontal: &Delta;x = ' + x2 + ' &minus; (' + x1 + ')',
                resp: R.numero(dx, { dec: 0 }),
                pista: 'Resta las x, con todo y signos.', despues: '' },
              { seccion: 'Paso 1: los dos catetos',
                queHacemos: 'Ahora restamos las y.',
                paraQue: 'Ese es el cateto vertical del escaloncito.',
                queda: '&Delta;x = ' + dx + ',  &Delta;y = ' + dy,
                pregunta: 'Cateto vertical: &Delta;y = ' + y2 + ' &minus; (' + y1 + ')',
                resp: R.numero(dy, { dec: 0 }),
                pista: 'Ahora las y.', despues: '' },
              { seccion: 'Paso 2: los signos dan igual',
                queHacemos: 'Comprobamos que el signo de las restas no afecta.',
                paraQue: 'Al elevar al cuadrado todo sale positivo. Por eso da igual restar A &minus; B o B &minus; A.',
                queda: 'd&sup2; = (' + dx + ')&sup2; + (' + dy + ')&sup2;',
                pregunta: '&iquest;Importa que alguna resta haya salido negativa?',
                resp: R.opcion(['No, porque se van a elevar al cuadrado',
                  'Si, entonces la distancia sale negativa'], 0),
                pista: 'Al cuadrado todo sale positivo. Por eso da igual restar A &minus; B o B &minus; A.',
                despues: 'Una distancia nunca puede ser negativa.' },
              { seccion: 'Paso 3: sumar los cuadrados',
                queHacemos: 'Elevamos los dos catetos y sumamos.',
                paraQue: 'Es la suma de siempre: a&sup2; + b&sup2;.',
                queda: 'd&sup2; = ' + (dx * dx + dy * dy),
                pregunta: 'Suma los cuadrados: (' + dx + ')&sup2; + (' + dy + ')&sup2; = ' + (dx * dx) + ' + ' + (dy * dy),
                resp: R.numero(dx * dx + dy * dy, { dec: 0 }),
                pista: 'Eleva cada uno y suma.', despues: '' },
              { seccion: 'Paso 4: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Una distancia nunca puede salir negativa.',
                queda: 'd = ' + F.n(c, 2),
                pregunta: 'Saca la raiz. &iquest;Cual es la distancia? (2 decimales)',
                resp: R.numero(c, { dec: 2, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + (dx * dx + dy * dy) + '</span>.',
                despues: '' }
            ],
            final: 'La distancia es <b>' + F.n(c, 2) + '</b>',
            receta: ['La formula de distancia ES Pitagoras',
              '&Delta;x y &Delta;y son los catetos',
              'El signo de las restas da igual: se elevan al cuadrado',
              'La distancia es la hipotenusa, siempre positiva']
          });
          enun = 'Calcula la distancia entre los puntos A(' + x1 + ', ' + y1 + ') y B(' + x2 + ', ' + y2 + ').<br>(redondea a 2 decimales)';
          resp = R.numero(c, { dec: 2, tol: 0.01 });
          pistas = ['La distancia es la hipotenusa de un triangulo con catetos &Delta;x y &Delta;y.',
            '&Delta;x = ' + dx + ' y &Delta;y = ' + dy + '.'];
          sol = ['&Delta;x = ' + x2 + ' &minus; (' + x1 + ') = ' + dx + ', &Delta;y = ' + y2 + ' &minus; (' + y1 + ') = ' + dy,
            'd = &radic;<span class="rad">(' + dx + ')&sup2; + (' + dy + ')&sup2;</span> = &radic;<span class="rad">' + (dx * dx + dy * dy) + '</span>',
            'd = <b>' + F.n(c, 2) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['escalera', 'Problema de la escalera'],
          ['isosceles', 'Triangulo isosceles'],
          ['equilatero', 'Triangulo equilatero'],
          ['verificar', 'Comprobar si es rectangulo'],
          ['cubo', 'Diagonal de una caja']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'escalera') {
          var L = r.entero(5, 15);
          var base = r.entero(2, L - 1);
          var alt = Math.sqrt(L * L - base * base);
          guiaDelPaso = G({
            intro: 'Una escalera de <b>' + L + ' m</b> apoyada en la pared, con la base a <b>' + base + ' m</b> de ella.<br>' +
              'En los problemas con dibujo mental lo primero es ver el triangulo: el piso y la pared forman el angulo recto, ' +
              'y la escalera va en diagonal. Identificar bien quien es la hipotenusa decide si se suma o se resta.',
            pasos: [
              { seccion: 'Paso 1: dibujar el triangulo',
                queHacemos: 'Vemos donde esta el angulo recto y quien es la hipotenusa.',
                paraQue: 'El angulo recto lo forman piso y pared. Lo que va en diagonal es la hipotenusa, y eso decide si se suma o se resta.',
                queda: 'h&sup2; = ' + L + '&sup2; &minus; ' + base + '&sup2;',
                pregunta: '&iquest;Cual de los tres es la hipotenusa?',
                resp: R.opcion(['La escalera, de ' + L + ' m', 'La altura a la que llega en la pared'], 0),
                pista: 'El angulo recto lo forman el piso y la pared. La escalera esta ENFRENTE de ese angulo, en diagonal: es la hipotenusa.',
                despues: 'Entonces la altura es un cateto, y hay que RESTAR.' },
              { seccion: 'Paso 2: restar los cuadrados',
                queHacemos: 'La escalera al cuadrado menos la separacion al cuadrado.',
                paraQue: 'Buscamos un cateto, asi que se resta.',
                queda: 'h&sup2; = ' + (L * L - base * base),
                pregunta: 'Calcula h&sup2; = ' + L + '&sup2; &minus; ' + base + '&sup2; = ' + (L * L) + ' &minus; ' + (base * base),
                resp: R.numero(L * L - base * base, { dec: 0 }),
                pista: 'La escalera al cuadrado menos la separacion al cuadrado.',
                despues: '' },
              { seccion: 'Paso 3: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Comprobacion: debe salir menor que la escalera.',
                queda: 'altura = ' + F.n(alt, 2) + ' m',
                pregunta: 'Saca la raiz. &iquest;A que altura llega? (2 decimales)',
                resp: R.numero(alt, { dec: 2, tol: 0.01, unidad: 'm' }),
                pista: '&radic;<span class="rad">' + (L * L - base * base) + '</span>.',
                despues: 'Comprueba: tiene que ser menor que los ' + L + ' m de la escalera, y lo es.' }
            ],
            final: 'La escalera llega a <b>' + F.n(alt, 2) + ' m</b>',
            receta: ['Dibujar el triangulo: el angulo recto esta entre piso y pared',
              'Lo que va en diagonal es la hipotenusa',
              'Buscar un cateto = restar',
              'El resultado debe ser menor que la hipotenusa']
          });
          enun = 'Una escalera de ' + L + ' m esta apoyada en una pared y su base esta a ' + base + ' m de la pared.<br>&iquest;A que altura llega la escalera? (2 decimales)';
          resp = R.numero(alt, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['La escalera es la hipotenusa; la distancia a la pared y la altura son los catetos.',
            'altura&sup2; = ' + (L * L) + ' &minus; ' + (base * base) + ' = ' + (L * L - base * base) + '.'];
          sol = ['h&sup2; = L&sup2; &minus; base&sup2; = ' + (L * L) + ' &minus; ' + (base * base),
            'h = &radic;<span class="rad">' + (L * L - base * base) + '</span>',
            'h = <b>' + F.n(alt, 2) + ' m</b>'];
        } else if (t3 === 'isosceles') {
          var lado = r.entero(6, 20);
          var bas = r.entero(4, 2 * lado - 2);
          while (bas >= 2 * lado) bas = r.entero(4, 2 * lado - 2);
          var h = Math.sqrt(lado * lado - (bas / 2) * (bas / 2));
          var area = bas * h / 2;
          guiaDelPaso = G({
            intro: 'Un isosceles con lados iguales de <b>' + lado + ' cm</b> y base de <b>' + bas + ' cm</b>; ' +
              'queremos su altura y su area.<br>' +
              'Un isosceles no es rectangulo, pero su altura lo parte en dos triangulos rectangulos iguales. ' +
              'Ese corte es el que permite usar Pitagoras.',
            pasos: [
              { seccion: 'Paso 1: partirlo por la mitad',
                queHacemos: 'Trazamos la altura y tomamos media base.',
                paraQue: 'Un isosceles no es rectangulo, pero su altura lo parte en dos que si lo son.',
                queda: 'catetos: h y ' + (bas / 2),
                pregunta: 'La altura cae justo en el punto medio de la base.<br>&iquest;Cuanto mide medio base?',
                resp: R.numero(bas / 2, { dec: 2, tol: 0.01 }),
                pista: bas + ' &divide; 2.',
                despues: 'Cada mitad es un rectangulo con catetos h y ' + (bas / 2) + '.' },
              { seccion: 'Paso 2: quien es la hipotenusa',
                queHacemos: 'Identificamos la hipotenusa de esa mitad.',
                paraQue: 'La altura es vertical y forma el angulo recto con la base: es cateto. Por eso toca RESTAR.',
                queda: 'h&sup2; = ' + (lado * lado) + ' &minus; ' + ((bas / 2) * (bas / 2)),
                pregunta: 'En esa mitad, &iquest;cual es la hipotenusa?',
                resp: R.opcion(['El lado igual, de ' + lado + ' cm', 'La altura h'], 0),
                pista: 'Es el lado inclinado. La altura es vertical y forma el angulo recto con la base: es cateto.',
                despues: 'Como buscamos un cateto, toca RESTAR.' },
              { seccion: 'Paso 3: calcular h&sup2;',
                queHacemos: 'Restamos los dos cuadrados.',
                paraQue: 'El lado igual al cuadrado menos media base al cuadrado.',
                queda: 'h&sup2; = ' + (lado * lado - (bas / 2) * (bas / 2)),
                pregunta: 'Calcula h&sup2; = ' + (lado * lado) + ' &minus; ' + ((bas / 2) * (bas / 2)),
                resp: R.numero(lado * lado - (bas / 2) * (bas / 2), { dec: 2, tol: 0.01 }),
                pista: 'El lado al cuadrado menos medio base al cuadrado.',
                despues: '' },
              { seccion: 'Paso 4: la altura',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Ya tenemos la altura; falta el area.',
                queda: 'altura = ' + F.n(h, 2) + ' cm',
                pregunta: 'Saca la raiz: &iquest;cuanto mide la altura? (2 decimales)',
                resp: R.numero(h, { dec: 2, tol: 0.01 }),
                pista: '&radic;<span class="rad">' + F.n(lado * lado - (bas / 2) * (bas / 2), 2) + '</span>.',
                despues: '' },
              { seccion: 'Paso 5: el area',
                queHacemos: 'Multiplicamos base por altura y dividimos entre 2.',
                paraQue: 'Ojo: la base es la COMPLETA, no la mitad. La mitad solo servia para hallar h.',
                queda: 'altura ' + F.n(h, 2) + ' cm,  area ' + F.n(area, 2) + ' cm&sup2;',
                pregunta: 'Ahora el area: base &times; altura &divide; 2 = ' + bas + ' &times; ' + F.n(h, 2) + ' &divide; 2 (2 decimales)',
                resp: R.numero(area, { dec: 2, tol: 0.02 }),
                pista: 'Ojo: la base es la COMPLETA (' + bas + '), no la mitad. La mitad solo servia para hallar h.',
                despues: '' },
              { seccion: 'Paso 6: escribir',
                queHacemos: 'Damos las dos respuestas.',
                paraQue: 'Ojo con las unidades: la altura en cm y el area en cm&sup2;.',
                queda: 'altura ' + F.n(h, 2) + ' cm,  area ' + F.n(area, 2) + ' cm&sup2;',
                pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.02 }) }
                ]),
                pista: 'Altura ' + F.n(h, 2) + ' cm y area ' + F.n(area, 2) + ' cm&sup2;.',
                despues: '' }
            ],
            final: 'Altura <b>' + F.n(h, 2) + ' cm</b> y area <b>' + F.n(area, 2) + ' cm&sup2;</b>',
            receta: ['La altura parte el isosceles en dos rectangulos iguales',
              'El cateto de abajo es MEDIA base',
              'El lado igual es la hipotenusa: se resta',
              'Para el area se usa la base completa']
          });
          enun = 'Un triangulo isosceles tiene lados iguales de ' + lado + ' cm y base de ' + bas + ' cm.<br>Calcula su altura y su area (2 decimales).';
          resp = R.varios([
            { etiqueta: 'Altura (cm)', resp: R.numero(h, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Area (cm&sup2;)', resp: R.numero(area, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['La altura de un isosceles cae en el punto medio de la base y forma dos triangulos rectangulos.',
            'Los catetos son h y ' + (bas / 2) + '; la hipotenusa es ' + lado + '.'];
          sol = ['Medio base = ' + (bas / 2),
            'h&sup2; = ' + lado + '&sup2; &minus; ' + (bas / 2) + '&sup2; = ' + (lado * lado) + ' &minus; ' + ((bas / 2) * (bas / 2)) + ' = ' + (lado * lado - (bas / 2) * (bas / 2)),
            'h = <b>' + F.n(h, 2) + ' cm</b>',
            'Area = base &middot; h / 2 = ' + bas + ' &middot; ' + F.n(h, 2) + ' / 2 = <b>' + F.n(area, 2) + ' cm&sup2;</b>'];
        } else if (t3 === 'verificar') {
          var esRecto = r.bool();
          var tt = r.elige(TERNAS);
          a = tt[0]; b = tt[1]; c = esRecto ? tt[2] : tt[2] + r.elige([1, -1, 2]);
          var ord = [a, b, c].slice().sort(function (u, w) { return u - w; });
          guiaDelPaso = G({
            intro: 'Nos dan tres lados (<b>' + a + ', ' + b + ' y ' + c + '</b>) y hay que decidir si el triangulo es rectangulo.<br>' +
              'Aqui se usa el teorema <b>al reves</b>: si se cumple que el cuadrado del lado mayor es igual a la suma de ' +
              'los cuadrados de los otros dos, entonces es rectangulo. Y si no se cumple, no lo es. No hay que medir ningun angulo.',
            pasos: [
              { seccion: 'Paso 1: el candidato a hipotenusa',
                queHacemos: 'Buscamos el lado mas grande de los tres.',
                paraQue: 'Si el triangulo fuera rectangulo, ese seria la hipotenusa. Aqui se usa el teorema al REVES.',
                queda: 'comparar ' + ord[2] + '&sup2;  contra  ' + ord[0] + '&sup2; + ' + ord[1] + '&sup2;',
                pregunta: '&iquest;Cual es el lado mayor?',
                resp: R.numero(ord[2], { dec: 0 }),
                pista: 'El mas grande de los tres. Ese es el candidato a hipotenusa.',
                despues: 'Si el triangulo fuera rectangulo, ' + ord[2] + ' seria la hipotenusa.' },
              { seccion: 'Paso 2: los cuadrados',
                queHacemos: 'Elevamos al cuadrado el lado mayor.',
                paraQue: 'Es uno de los dos numeros que hay que comparar.',
                queda: (ord[2] * ord[2]) + '  contra  ?',
                pregunta: 'Calcula su cuadrado: ' + ord[2] + '&sup2;',
                resp: R.numero(ord[2] * ord[2], { dec: 0 }),
                pista: ord[2] + ' &times; ' + ord[2] + '.', despues: '' },
              { seccion: 'Paso 2: los cuadrados',
                queHacemos: 'Sumamos los cuadrados de los otros dos.',
                paraQue: 'Ese es el otro numero de la comparacion.',
                queda: (ord[2] * ord[2]) + '  contra  ' + (ord[0] * ord[0] + ord[1] * ord[1]),
                pregunta: 'Ahora los otros dos: ' + ord[0] + '&sup2; + ' + ord[1] + '&sup2;',
                resp: R.numero(ord[0] * ord[0] + ord[1] * ord[1], { dec: 0 }),
                pista: (ord[0] * ord[0]) + ' + ' + (ord[1] * ord[1]) + '.',
                despues: 'Hay que comparar ' + (ord[2] * ord[2]) + ' con ' + (ord[0] * ord[0] + ord[1] * ord[1]) + '.' },
              { seccion: 'Paso 3: comparar y decidir',
                queHacemos: 'Comparamos los dos numeros.',
                paraQue: 'Si coinciden es rectangulo. Si el cuadrado del mayor es MENOR que la suma es acutangulo, y si es mayor, obtusangulo.',
                queda: esRecto ? 'Si es rectangulo' : 'No es rectangulo',
                pregunta: 'Entonces, &iquest;es rectangulo?',
                resp: R.opcion(['Si, es rectangulo', 'No es rectangulo'], esRecto ? 0 : 1),
                pista: esRecto ? 'Los dos numeros salieron iguales, asi que se cumple el teorema.'
                  : 'Los dos numeros son distintos (' + (ord[2] * ord[2]) + ' contra ' + (ord[0] * ord[0] + ord[1] * ord[1]) + '), asi que no se cumple.',
                despues: esRecto ? '' : 'Dato extra: si el cuadrado del mayor es MENOR que la suma, el triangulo es acutangulo; si es mayor, obtusangulo.' }
            ],
            final: esRecto ? '<b>Si</b> es rectangulo: ' + (ord[0] * ord[0]) + ' + ' + (ord[1] * ord[1]) + ' = ' + (ord[2] * ord[2])
              : '<b>No</b> es rectangulo: ' + (ord[0] * ord[0] + ord[1] * ord[1]) + ' &ne; ' + (ord[2] * ord[2]),
            receta: ['Identificar el lado mayor',
              'Elevar el mayor al cuadrado',
              'Sumar los cuadrados de los otros dos',
              'Si coinciden: es rectangulo; si no, no',
              'Esto se llama el reciproco del teorema de Pitagoras']
          });
          enun = 'Un triangulo tiene lados ' + a + ', ' + b + ' y ' + c + '.<br>&iquest;Es un triangulo rectangulo?';
          resp = R.opcion(['Si, es rectangulo', 'No es rectangulo'], esRecto ? 0 : 1);
          pistas = ['Comprueba si el cuadrado del lado mayor es igual a la suma de los cuadrados de los otros dos.',
            'Lado mayor: ' + Math.max(a, b, c) + '. Su cuadrado vale ' + Math.pow(Math.max(a, b, c), 2) + '.'];
          var otros = [a, b, c].filter(function (x, i) { return i !== [a, b, c].indexOf(Math.max(a, b, c)); });
          sol = ['Lado mayor al cuadrado: ' + Math.max(a, b, c) + '&sup2; = ' + Math.pow(Math.max(a, b, c), 2),
            'Suma de los otros dos al cuadrado: ' + otros[0] + '&sup2; + ' + otros[1] + '&sup2; = ' + (otros[0] * otros[0] + otros[1] * otros[1]),
            esRecto ? 'Son iguales, asi que <b>si</b> es rectangulo' : 'No son iguales, asi que <b>no</b> es rectangulo'];
        } else {
          var L1 = r.entero(2, 12), L2 = r.entero(2, 12), L3 = r.entero(2, 12);
          var diag = Math.sqrt(L1 * L1 + L2 * L2 + L3 * L3);
          guiaDelPaso = G({
            intro: 'Una caja de <b>' + L1 + ' &times; ' + L2 + ' &times; ' + L3 + ' cm</b>, y queremos la diagonal que la atraviesa por dentro ' +
              '(de una esquina a la esquina opuesta).<br>' +
              'Esto es en tres dimensiones, pero se resuelve aplicando Pitagoras <b>dos veces</b>: ' +
              'primero en el piso de la caja, y luego con la altura.',
            pasos: [
              { seccion: 'Paso 1: Pitagoras en el piso',
                queHacemos: 'Aplicamos Pitagoras a la base de la caja.',
                paraQue: 'En tres dimensiones se usa el teorema DOS veces: primero abajo y luego con la altura.',
                queda: 'diagonal del piso al cuadrado = ' + (L1 * L1 + L2 * L2),
                pregunta: 'Primero la diagonal del PISO de la caja, que mide ' + L1 + ' &times; ' + L2 + '.<br>Calcula ' + L1 + '&sup2; + ' + L2 + '&sup2;',
                resp: R.numero(L1 * L1 + L2 * L2, { dec: 0 }),
                pista: (L1 * L1) + ' + ' + (L2 * L2) + '.',
                despues: 'Esa diagonal del piso mide &radic;<span class="rad">' + (L1 * L1 + L2 * L2) + '</span> &asymp; ' + F.n(Math.sqrt(L1 * L1 + L2 * L2), 3) + ' cm.' },
              { seccion: 'Paso 2: Pitagoras con la altura',
                queHacemos: 'Sumamos el cuadrado de la altura.',
                paraQue: 'Detalle bonito: no hizo falta sacar la raiz del paso anterior, porque aqui se vuelve a elevar al cuadrado. Por eso la formula queda D&sup2; = a&sup2; + b&sup2; + c&sup2;.',
                queda: 'D&sup2; = ' + (L1 * L1 + L2 * L2 + L3 * L3),
                pregunta: 'Ahora el segundo triangulo: un cateto es esa diagonal del piso y el otro es la altura de ' + L3 + ' cm.<br>Suma sus cuadrados: ' + (L1 * L1 + L2 * L2) + ' + ' + (L3 * L3),
                resp: R.numero(L1 * L1 + L2 * L2 + L3 * L3, { dec: 0 }),
                pista: 'Fijate en el detalle bonito: no hizo falta sacar la raiz del paso anterior, porque aqui se vuelve a elevar al cuadrado.',
                despues: 'Por eso la formula queda D&sup2; = a&sup2; + b&sup2; + c&sup2;: los tres de un jalon.' },
              { seccion: 'Paso 3: la raiz',
                queHacemos: 'Sacamos la raiz.',
                paraQue: 'Comprobacion: debe salir mayor que cualquiera de las tres aristas.',
                queda: 'D = ' + F.n(diag, 2) + ' cm',
                pregunta: 'Saca la raiz. &iquest;Cuanto mide la diagonal interior? (2 decimales)',
                resp: R.numero(diag, { dec: 2, tol: 0.01, unidad: 'cm' }),
                pista: '&radic;<span class="rad">' + (L1 * L1 + L2 * L2 + L3 * L3) + '</span>.',
                despues: 'Comprueba: debe ser mayor que cualquiera de las tres aristas.' }
            ],
            final: 'La diagonal interior mide <b>' + F.n(diag, 2) + ' cm</b>',
            receta: ['Pitagoras dos veces: primero en la base, luego con la altura',
              'No hace falta sacar la raiz intermedia',
              'Formula directa: D = &radic;<span class="rad">a&sup2; + b&sup2; + c&sup2;</span>',
              'Debe salir mayor que cualquier arista']
          });
          enun = 'Una caja mide ' + L1 + ' &times; ' + L2 + ' &times; ' + L3 + ' cm.<br>&iquest;Cual es la diagonal interior de la caja? (2 decimales)';
          resp = R.numero(diag, { dec: 2, tol: 0.01, unidad: 'cm' });
          pistas = ['Aplica Pitagoras dos veces: primero en la base, luego con la altura.',
            'Diagonal de la base: &radic;<span class="rad">' + (L1 * L1) + ' + ' + (L2 * L2) + '</span> = ' + F.n(Math.sqrt(L1 * L1 + L2 * L2), 3) + '.'];
          sol = ['Diagonal de la base: d&sub1;&sup2; = ' + (L1 * L1) + ' + ' + (L2 * L2) + ' = ' + (L1 * L1 + L2 * L2),
            'Ahora con la altura: D&sup2; = d&sub1;&sup2; + ' + (L3 * L3) + ' = ' + (L1 * L1 + L2 * L2 + L3 * L3),
            'D = &radic;<span class="rad">' + (L1 * L1 + L2 * L2 + L3 * L3) + '</span> = <b>' + F.n(diag, 2) + ' cm</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
