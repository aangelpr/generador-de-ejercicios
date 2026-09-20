/* Proporciones y variacion lineal */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var OBJETOS = ['lapices', 'cuadernos', 'panes', 'litros de pintura', 'kilos de arroz', 'boletos'];
  var TAREAS = ['pintar una barda', 'cosechar el campo', 'llenar el tanque', 'armar los pedidos'];

  var G = EJ.guia.armar;

  var extra = {};

  extra.porcentaje = function (r) {
    var directo = r.bool();
    var pct = r.elige([5, 10, 12, 15, 20, 25, 30, 40, 45, 60, 75, 80]);
    var base = r.entero(2, 40) * 10;
    if (directo) {
      return {
        guia: G({
          intro: 'Queremos el <b>' + pct + '% de ' + base + '</b>.<br>' +
            'Por ciento significa literalmente "de cada cien". Asi que ' + pct + '% es la fraccion ' + F.frac(pct, 100) + ', ' +
            'y sacar un porcentaje es solo multiplicar por esa fraccion.',
          pasos: [
            { pregunta: '&iquest;Que quiere decir ' + pct + '%?',
              resp: R.opcion([pct + ' de cada 100', pct + ' unidades en total'], 0),
              pista: 'El simbolo % es un atajo para "dividido entre 100".',
              despues: 'Entonces ' + pct + '% = ' + F.frac(pct, 100) + '.' },
            { pregunta: 'Pasalo a decimal: ' + pct + ' &divide; 100',
              resp: R.numero(pct / 100, { dec: 4 }),
              pista: 'Dividir entre 100 es recorrer el punto decimal dos lugares a la izquierda.',
              despues: 'Ese decimal es el que se multiplica.' },
            { pregunta: 'Ahora multiplica: ' + (pct / 100) + ' &middot; ' + base,
              resp: R.numero(base * pct / 100, { dec: 4 }),
              pista: 'Otra forma de verlo: ' + base + ' &divide; 100 = ' + (base / 100) + ' es el 1%, y el ' + pct + '% son ' + pct + ' veces eso.',
              despues: '' }
          ],
          final: 'El ' + pct + '% de ' + base + ' es <b>' + F.n(base * pct / 100, 4) + '</b>',
          receta: ['% significa "entre 100"',
            'Pasar el porcentaje a decimal',
            'Multiplicar por el total',
            'Truco: el 1% es el total entre 100']
        }),
        enunciado: '&iquest;Cuanto es el ' + pct + '% de ' + base + '?',
        respuesta: R.numero(base * pct / 100, { dec: 4 }),
        pistas: ['Un porcentaje es una fraccion con denominador 100: ' + pct + '% = ' + F.frac(pct, 100) + '.',
          'Multiplica ' + base + ' por ' + (pct / 100) + '.'],
        solucion: [pct + '% = ' + pct + '/100 = ' + (pct / 100),
          (pct / 100) + ' &middot; ' + base + ' = <b>' + F.n(base * pct / 100, 4) + '</b>']
      };
    }
    var parte = base * pct / 100;
    return {
      guia: G({
        intro: 'Nos preguntan que <b>porcentaje representa ' + F.n(parte, 2) + ' de ' + base + '</b>.<br>' +
          'Es el camino de regreso: ahora conocemos la parte y el total, y falta el porcentaje. ' +
          'Primero se saca que fraccion del total es, y luego esa fraccion se pasa a "de cada cien".',
        pasos: [
          { pregunta: '&iquest;Que se divide entre que?',
            resp: R.opcion(['La parte entre el total', 'El total entre la parte'], 0),
            pista: 'Queremos saber que tanto del total es esa cantidad, asi que la parte va arriba.',
            despues: 'Entonces toca ' + F.n(parte, 2) + ' &divide; ' + base + '.' },
          { pregunta: 'Haz la division: ' + F.n(parte, 2) + ' &divide; ' + base,
            resp: R.numero(parte / base, { dec: 4 }),
            pista: 'Da un numero entre 0 y 1: es la fraccion del total.',
            despues: 'Ese decimal todavia no es el porcentaje.' },
          { pregunta: 'Pasalo a porcentaje multiplicando por 100.<br>&iquest;Que porcentaje es?',
            resp: R.numero(pct, { dec: 4, unidad: '%' }),
            pista: 'Multiplicar por 100 es recorrer el punto dos lugares a la derecha: ' + (parte / base) + ' &rarr; ' + pct + '%.',
            despues: '' }
        ],
        final: F.n(parte, 2) + ' es el <b>' + pct + '%</b> de ' + base,
        receta: ['Parte entre total (la parte va arriba)',
          'Sale un decimal entre 0 y 1',
          'Multiplicar por 100 para volverlo porcentaje',
          'Comprobacion: ese % del total debe regresar la parte']
      }),
      enunciado: '&iquest;Que porcentaje representa ' + F.n(parte, 2) + ' de ' + base + '?',
      respuesta: R.numero(pct, { dec: 4, unidad: '%' }),
      pistas: ['Divide la parte entre el total y multiplica por 100.',
        '(' + F.n(parte, 2) + ' / ' + base + ') &middot; 100'],
      solucion: [F.n(parte, 2) + ' &divide; ' + base + ' = ' + F.n(parte / base, 4),
        'Multiplico por 100: <b>' + pct + '%</b>']
    };
  };

  extra.escala = function (r) {
    var escala = r.elige([1000, 2500, 5000, 10000, 25000, 50000]);
    var cm = r.entero(2, 40) / 2;
    var metros = cm * escala / 100;
    return {
      guia: G({
        intro: 'Un mapa a escala <b>1 : ' + escala + '</b> y dos ciudades separadas <b>' + cm + ' cm</b> en el papel.<br>' +
          'La escala es una proporcion disfrazada: dice cuantas unidades reales vale cada unidad del dibujo. ' +
          'El unico truco es cuidar las unidades al final.',
        pasos: [
          { pregunta: '&iquest;Que significa la escala 1 : ' + escala + '?',
            resp: R.opcion(['1 cm del mapa son ' + escala + ' cm reales', '1 cm del mapa es ' + escala + ' metros reales'], 0),
            pista: 'La escala no trae unidades: es 1 de lo que sea a ' + escala + ' de lo mismo. Si mides en cm, el resultado sale en cm.',
            despues: 'Entonces hay que multiplicar los centimetros del mapa por ' + escala + '.' },
          { pregunta: 'Multiplica: ' + cm + ' &times; ' + escala + '<br>&iquest;Cuantos centimetros reales son?',
            resp: R.numero(cm * escala, { dec: 2 }),
            pista: 'Cada centimetro del mapa vale ' + escala + ' centimetros de verdad.',
            despues: 'Pero nos piden metros, y esto esta en centimetros.' },
          { pregunta: 'Pasa ' + F.n(cm * escala) + ' cm a metros.<br>&iquest;Cuantos metros son?',
            resp: R.numero(metros, { dec: 2, unidad: 'm' }),
            pista: 'En un metro hay 100 cm, asi que se divide entre 100.',
            despues: '' }
        ],
        final: 'La distancia real es <b>' + F.n(metros, 2) + ' m</b>',
        receta: ['La escala no tiene unidades: son las mismas arriba y abajo',
          'Multiplicar la medida del mapa por el numero de la escala',
          'Convertir al final a la unidad que piden',
          '100 cm = 1 m']
      }),
      enunciado: 'Un mapa esta a escala 1 : ' + escala + '.<br>' +
        'Dos ciudades aparecen separadas ' + cm + ' cm en el mapa. &iquest;Cuantos metros hay en la realidad?',
      respuesta: R.numero(metros, { dec: 2, unidad: 'm' }),
      pistas: ['La escala dice que 1 cm del mapa son ' + escala + ' cm reales.',
        cm + ' cm &times; ' + escala + ' = ' + F.n(cm * escala) + ' cm; ahora pasalo a metros dividiendo entre 100.'],
      solucion: ['Distancia real en cm: ' + cm + ' &times; ' + escala + ' = ' + F.n(cm * escala),
        'Paso a metros: ' + F.n(cm * escala) + ' &divide; 100',
        'Resultado: <b>' + F.n(metros, 2) + ' m</b>']
    };
  };

  extra.compuesta = function (r) {
    var o1 = r.entero(3, 10), h1 = r.entero(4, 10), d1 = r.entero(4, 15);
    var o2 = r.entero(3, 12), h2 = r.entero(4, 10);
    var trabajo = o1 * h1 * d1;
    var d2 = trabajo / (o2 * h2);
    return {
      guia: G({
        intro: 'Regla de tres <b>compuesta</b>: cambian dos cosas a la vez (los trabajadores y las horas diarias).<br>' +
          'El truco para no perderse es no pensar en proporciones, sino en <b>cuanto trabajo hay que hacer</b>. ' +
          'Ese trabajo es el mismo pase lo que pase, y se mide en horas-trabajador.',
        pasos: [
          { pregunta: '&iquest;Que cantidad NO cambia entre las dos situaciones?',
            resp: R.opcion(['El trabajo total de la obra', 'El numero de dias'], 0),
            pista: 'La obra es la misma; lo que cambia es quien la hace y a que ritmo.',
            despues: 'Ese trabajo se mide multiplicando trabajadores &times; horas &times; dias.' },
          { pregunta: 'Calcula el trabajo total: ' + o1 + ' &times; ' + h1 + ' &times; ' + d1 + '<br>&iquest;Cuantas horas-trabajador son?',
            resp: R.numero(trabajo, { dec: 0 }),
            pista: 'Multiplica los tres numeros de la primera situacion.',
            despues: 'La obra cuesta ' + trabajo + ' horas-trabajador, siempre.' },
          { pregunta: 'Ahora, &iquest;cuanto se avanza POR DIA en la nueva situacion?<br>' + o2 + ' trabajadores &times; ' + h2 + ' horas',
            resp: R.numero(o2 * h2, { dec: 0 }),
            pista: 'Solo los dos numeros nuevos: ' + o2 + ' &middot; ' + h2 + '.',
            despues: 'Cada dia se avanzan ' + (o2 * h2) + ' horas-trabajador.' },
          { pregunta: 'Divide el trabajo entre lo que se avanza al dia: ' + trabajo + ' &divide; ' + (o2 * h2) + '<br>&iquest;Cuantos dias tardan? (4 decimales)',
            resp: R.numero(d2, { dec: 4, tol: 0.001, unidad: 'dias' }),
            pista: 'Si el resultado no es exacto, deja los decimales.',
            despues: '' }
        ],
        final: 'Tardarian <b>' + F.n(d2, 4) + ' dias</b>',
        receta: ['No pensar en proporciones: pensar en trabajo total',
          'Trabajo = trabajadores &times; horas &times; dias',
          'Ese trabajo se conserva',
          'Dias = trabajo &divide; (lo que se avanza por dia)']
      }),
      enunciado: 'Si ' + o1 + ' trabajadores, trabajando ' + h1 + ' horas diarias, terminan una obra en ' + d1 + ' dias,<br>' +
        '&iquest;en cuantos dias la terminarian ' + o2 + ' trabajadores que trabajen ' + h2 + ' horas diarias? (4 decimales)',
      respuesta: R.numero(d2, { dec: 4, tol: 0.001, unidad: 'dias' }),
      pistas: ['Calcula el trabajo total en horas-trabajador: se conserva.',
        'Trabajo = ' + o1 + ' &times; ' + h1 + ' &times; ' + d1 + ' = ' + trabajo + ' horas-trabajador.'],
      solucion: ['Trabajo total: ' + o1 + ' &middot; ' + h1 + ' &middot; ' + d1 + ' = ' + trabajo + ' horas-trabajador',
        'Con las nuevas condiciones se avanzan ' + o2 + ' &middot; ' + h2 + ' = ' + (o2 * h2) + ' horas-trabajador por dia',
        'Dias = ' + trabajo + ' &divide; ' + (o2 * h2) + ' = <b>' + F.n(d2, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'proporciones',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Proporciones y variacion lineal',
    descripcion: 'Regla de tres directa e inversa, constante de proporcionalidad y funcion lineal.',
    formulario: 'Directa: a/b = c/d &rArr; ad = bc, y = kx con k = y/x<br>' +
      'Inversa: x&middot;y = k &rArr; x<sub>1</sub>y<sub>1</sub> = x<sub>2</sub>y<sub>2</sub><br>' +
      'Variacion lineal: y = mx + b, con m = (y<sub>2</sub> &minus; y<sub>1</sub>)/(x<sub>2</sub> &minus; x<sub>1</sub>)',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var a, b, c, d, enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['proporcion', 'Resolver una proporcion'],
          ['reglaDeTres', 'Regla de tres directa'],
          ['porcentaje', 'Porcentajes']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'proporcion') {
          b = r.entero(2, 12); d = r.entero(2, 12);
          var k = r.entero(2, 9);
          a = b * k; c = d * k;   // a/b = c/d = k
          guiaDelPaso = G({
            intro: 'Hay que encontrar x en <b>' + F.frac(a, b) + ' = ' + F.frac('x', d) + '</b>.<br>' +
              'Una proporcion es decir que dos fracciones valen lo mismo. Y cuando eso pasa, ' +
              'los <b>productos cruzados</b> son iguales: lo de arriba de una por lo de abajo de la otra.',
            pasos: [
              { pregunta: '&iquest;Como se cruzan?',
                resp: R.opcion([a + ' &middot; ' + d + ' = ' + b + ' &middot; x', a + ' &middot; ' + b + ' = ' + d + ' &middot; x'], 0),
                pista: 'Se multiplica en diagonal: el de arriba izquierda con el de abajo derecha, y al reves.',
                despues: 'Queda la ecuacion ' + a + ' &middot; ' + d + ' = ' + b + ' &middot; x.' },
              { pregunta: 'Resuelve el lado que ya se puede: ' + a + ' &middot; ' + d,
                resp: R.numero(a * d, { dec: 0 }),
                pista: 'Multiplicacion normal.',
                despues: 'La ecuacion es ' + (a * d) + ' = ' + b + 'x.' },
              { pregunta: 'Despeja x: el ' + b + ' esta multiplicando, asi que pasa dividiendo.<br>&iquest;Cuanto vale x?',
                resp: R.numero(c, { dec: 0 }),
                pista: 'x = ' + (a * d) + ' &divide; ' + b + '.',
                despues: 'Se puede comprobar: ' + F.frac(a, b) + ' y ' + F.frac(c, d) + ' valen lo mismo.' }
            ],
            final: 'x = <b>' + c + '</b>',
            receta: ['Multiplicar en cruz',
              'Queda una ecuacion sencilla',
              'Despejar x',
              'Comprobar que las dos fracciones dan el mismo valor']
          });
          enun = 'Encuentra el valor de x en la proporcion: ' + F.frac(a, b) + ' = ' + F.frac('x', d);
          resp = R.numero(c, { dec: 0 });
          pistas = ['En una proporcion el producto cruzado es igual: a&middot;d = b&middot;x.',
            'Entonces x = (' + a + ' &middot; ' + d + ') / ' + b + '.'];
          sol = ['Producto cruzado: ' + a + ' &middot; ' + d + ' = ' + b + ' &middot; x',
            'x = ' + (a * d) + ' / ' + b,
            'x = <b>' + c + '</b>'];
        } else {
          var obj = r.elige(OBJETOS);
          var n1 = r.entero(2, 9);
          var precioU = r.entero(3, 25);
          var n2 = r.entero(2, 15);
          guiaDelPaso = EJ.guia.reglaDeTres(n1, precioU, n2, obj);
          enun = 'Si ' + n1 + ' ' + obj + ' cuestan $' + (n1 * precioU) + ', &iquest;cuanto cuestan ' + n2 + ' ' + obj + '?';
          resp = R.numero(n2 * precioU, { unidad: 'pesos', dec: 2 });
          pistas = ['Es una regla de tres directa: mas ' + obj + ', mas dinero.',
            'Precio de uno solo: ' + (n1 * precioU) + ' / ' + n1 + ' = ' + precioU + '.'];
          sol = ['Costo unitario: ' + (n1 * precioU) + ' &divide; ' + n1 + ' = ' + precioU,
            'Para ' + n2 + ': ' + n2 + ' &middot; ' + precioU + ' = <b>$' + (n2 * precioU) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['inversa', 'Proporcion inversa'],
          ['constante', 'Variacion directa y constante k'],
          ['escala', 'Escalas'],
          ['porcentaje', 'Porcentajes']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'inversa') {
          var tarea = r.elige(TAREAS);
          var o1 = r.elige([2, 3, 4, 6, 8, 12]);
          var dias = r.elige([6, 8, 12, 18, 24]);
          var total = o1 * dias;
          var o2 = r.elige([2, 3, 4, 6, 8, 12].filter(function (x) { return x !== o1 && total % x === 0; }));
          if (o2 === undefined) o2 = o1 * 2;
          guiaDelPaso = G({
            intro: '<b>' + o1 + '</b> trabajadores tardan <b>' + dias + '</b> dias en ' + tarea + ', y queremos saber cuanto tardarian <b>' + o2 + '</b>.<br>' +
              'Lo primero de todo es decidir si la proporcion es directa o inversa, porque el procedimiento cambia por completo.',
            pasos: [
              { pregunta: 'Si hay MAS trabajadores, &iquest;que pasa con los dias?',
                resp: R.opcion(['Bajan: es proporcion INVERSA', 'Suben: es proporcion directa'], 0),
                pista: 'Piensalo con el sentido comun: entre mas gente ayude, menos tiempo tarda la obra.',
                despues: 'En una proporcion inversa lo que se mantiene constante es el PRODUCTO, no el cociente.' },
              { pregunta: 'Calcula esa constante: ' + o1 + ' &times; ' + dias,
                resp: R.numero(total, { dec: 0 }),
                pista: 'Multiplica trabajadores por dias. Eso es el trabajo total, en dias-trabajador.',
                despues: 'La obra cuesta ' + total + ' dias-trabajador, con cuanta gente sea.' },
              { pregunta: 'Ahora reparte ese trabajo entre ' + o2 + ' trabajadores: ' + total + ' &divide; ' + o2 + '<br>&iquest;Cuantos dias tardan?',
                resp: R.numero(total / o2, { unidad: 'dias', dec: 2 }),
                pista: 'Division directa.',
                despues: 'Comprueba que tenga sentido: ' + (o2 > o1 ? 'como hay mas gente, salieron menos dias.' : 'como hay menos gente, salieron mas dias.') }
            ],
            final: 'Tardarian <b>' + F.n(total / o2, 2) + ' dias</b>',
            receta: ['Decidir si es directa o inversa',
              'Inversa: el PRODUCTO se mantiene constante',
              'Calcular la constante con los datos completos',
              'Dividir entre el dato nuevo',
              'Revisar que el resultado tenga sentido']
          });
          enun = 'Si ' + o1 + ' trabajadores tardan ' + dias + ' dias en ' + tarea + ', &iquest;cuantos dias tardarian ' + o2 + ' trabajadores al mismo ritmo?';
          resp = R.numero(total / o2, { unidad: 'dias', dec: 2 });
          pistas = ['Es proporcion inversa: mas trabajadores, menos dias. El producto trabajadores &times; dias es constante.',
            'k = ' + o1 + ' &middot; ' + dias + ' = ' + total + ' dias-trabajador.'];
          sol = ['Trabajo total: ' + o1 + ' &middot; ' + dias + ' = ' + total + ' dias-trabajador',
            'Con ' + o2 + ' trabajadores: ' + total + ' &divide; ' + o2,
            'Resultado: <b>' + F.n(total / o2, 2) + ' dias</b>'];
        } else {
          var kk = r.enteroNoCero(-6, 9);
          var x1 = r.entero(2, 9);
          var x2 = r.entero(2, 12);
          while (x2 === x1) x2 = r.entero(2, 12);
          guiaDelPaso = G({
            intro: 'Nos dicen que <b>y varia directamente con x</b>, y que y = <b>' + (kk * x1) + '</b> cuando x = <b>' + x1 + '</b>.<br>' +
              '"Variacion directa" es una frase clave: significa que la relacion es <b>y = kx</b>, con k un numero fijo. ' +
              'Todo el ejercicio es encontrar ese k y luego usarlo.',
            pasos: [
              { pregunta: 'De y = kx, &iquest;como se despeja k?',
                resp: R.opcion(['k = y / x', 'k = x / y'], 0),
                pista: 'La x esta multiplicando a k, asi que pasa dividiendo.',
                despues: 'Entonces k se saca dividiendo el valor de y entre el de x.' },
              { pregunta: 'Calcula k: ' + (kk * x1) + ' &divide; ' + x1,
                resp: R.numero(kk, { dec: 3 }),
                pista: 'Ojo con el signo si alguno es negativo.',
                despues: 'La relacion completa es y = ' + kk + 'x. Ese k sirve para CUALQUIER par de valores.' },
              { pregunta: 'Usa la relacion para x = ' + x2 + ': y = ' + kk + ' &middot; ' + x2,
                resp: R.numero(kk * x2, { dec: 3 }),
                pista: 'Solo sustituir y multiplicar.',
                despues: '' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) },
                  { etiqueta: 'y', resp: R.numero(kk * x2, { dec: 3 }) }
                ]),
                pista: 'k = ' + kk + ' y y = ' + (kk * x2) + '.',
                despues: '' }
            ],
            final: 'k = <b>' + kk + '</b> y para x = ' + x2 + ', y = <b>' + (kk * x2) + '</b>',
            receta: ['Variacion directa = y = kx',
              'k = y / x con el par de datos que te dan',
              'Ese k no cambia nunca en el problema',
              'Sustituir el nuevo valor de x']
          });
          enun = 'y varia directamente con x. Si y = ' + (kk * x1) + ' cuando x = ' + x1 + ', encuentra la constante k y el valor de y cuando x = ' + x2 + '.';
          resp = R.varios([
            { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) },
            { etiqueta: 'y', resp: R.numero(kk * x2, { dec: 3 }) }
          ]);
          pistas = ['Variacion directa significa y = kx, asi que k = y/x.',
            'k = ' + (kk * x1) + ' / ' + x1 + ' = ' + kk + '. Ahora sustituye x = ' + x2 + '.'];
          sol = ['y = kx &rArr; k = y/x = ' + (kk * x1) + '/' + x1 + ' = <b>' + kk + '</b>',
            'La relacion es y = ' + kk + 'x',
            'Para x = ' + x2 + ': y = ' + kk + ' &middot; ' + x2 + ' = <b>' + (kk * x2) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['lineal', 'Variacion lineal (y = mx + b)'],
          ['reparto', 'Reparto proporcional'],
          ['compuesta', 'Regla de tres compuesta']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'lineal') {
          var m = r.enteroNoCero(-5, 6);
          var bb = r.entero(-9, 9);
          a = r.entero(1, 6); b = a + r.entero(1, 5);
          var y1 = m * a + bb, y2 = m * b + bb;
          var x0 = r.entero(7, 15);
          guiaDelPaso = G({
            intro: 'Nos dan dos puntos de una recta: <b>(' + a + ', ' + y1 + ')</b> y <b>(' + b + ', ' + y2 + ')</b>, ' +
              'y hay que encontrar su ecuacion y = mx + b.<br>' +
              'La diferencia con la variacion directa es que aqui la recta <b>no pasa por el origen</b>: sobra o falta un pedazo, y ese pedazo es b.',
            pasos: [
              { pregunta: 'La pendiente es "cuanto sube y por cada unidad que avanza x".<br>Primero: &iquest;cuanto cambio la y? ' + y2 + ' &minus; (' + y1 + ')',
                resp: R.numero(y2 - y1, { dec: 0 }),
                pista: 'Resta el segundo menos el primero, con todo y signos.',
                despues: '' },
              { pregunta: '&iquest;Y cuanto cambio la x? ' + b + ' &minus; ' + a,
                resp: R.numero(b - a, { dec: 0 }),
                pista: 'En el mismo orden que la resta anterior: si arriba pusiste el segundo primero, abajo tambien.',
                despues: 'Importante: el ORDEN tiene que ser el mismo arriba y abajo, o el signo sale al reves.' },
              { pregunta: 'Divide para obtener la pendiente: ' + (y2 - y1) + ' &divide; ' + (b - a),
                resp: R.numero(m, { dec: 3 }),
                pista: 'Ese es el valor de m.',
                despues: 'Ya sabemos que la recta es y = ' + m + 'x + b. Falta b.' },
              { pregunta: 'Sustituye el punto (' + a + ', ' + y1 + ') en y = ' + m + 'x + b.<br>Queda ' + y1 + ' = ' + (m * a) + ' + b. &iquest;Cuanto vale b?',
                resp: R.numero(bb, { dec: 3 }),
                pista: 'Despeja: b = ' + y1 + ' &minus; (' + (m * a) + ').',
                despues: 'La recta completa es y = ' + F.poli([m, bb], 'x') + '. Sirve cualquiera de los dos puntos: da lo mismo.' },
              { pregunta: 'Ya con la ecuacion, calcula y cuando x = ' + x0 + '.',
                resp: R.numero(m * x0 + bb, { dec: 3 }),
                pista: m + ' &middot; ' + x0 + ' + (' + bb + ').',
                despues: '' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'm', resp: R.numero(m, { dec: 3 }) },
                  { etiqueta: 'b', resp: R.numero(bb, { dec: 3 }) },
                  { etiqueta: 'y(' + x0 + ')', resp: R.numero(m * x0 + bb, { dec: 3 }) }
                ]),
                pista: 'm = ' + m + ', b = ' + bb + ' y y(' + x0 + ') = ' + (m * x0 + bb) + '.',
                despues: '' }
            ],
            final: 'y = <b>' + F.poli([m, bb], 'x') + '</b>, y y(' + x0 + ') = <b>' + (m * x0 + bb) + '</b>',
            receta: ['m = (cambio de y) / (cambio de x)',
              'Respetar el mismo orden arriba y abajo',
              'Sustituir un punto para despejar b',
              'Con y = mx + b ya se puede evaluar donde sea']
          });
          enun = 'y varia linealmente con x. Se sabe que y = ' + y1 + ' cuando x = ' + a + ', y que y = ' + y2 + ' cuando x = ' + b + '.<br>' +
            'Encuentra la pendiente m, la ordenada al origen b y el valor de y cuando x = ' + x0 + '.';
          resp = R.varios([
            { etiqueta: 'm', resp: R.numero(m, { dec: 3 }) },
            { etiqueta: 'b', resp: R.numero(bb, { dec: 3 }) },
            { etiqueta: 'y(' + x0 + ')', resp: R.numero(m * x0 + bb, { dec: 3 }) }
          ]);
          pistas = ['La pendiente es el cambio de y entre el cambio de x: m = (y&#8322; &minus; y&#8321;)/(x&#8322; &minus; x&#8321;).',
            'm = (' + y2 + ' &minus; ' + y1 + ')/(' + b + ' &minus; ' + a + ') = ' + m + '. Con m sustituye un punto para hallar b.'];
          sol = ['m = (' + y2 + ' &minus; ' + y1 + ') / (' + b + ' &minus; ' + a + ') = ' + (y2 - y1) + '/' + (b - a) + ' = <b>' + m + '</b>',
            'Sustituyo el punto (' + a + ', ' + y1 + '): ' + y1 + ' = ' + m + '(' + a + ') + b &rArr; b = <b>' + bb + '</b>',
            'La recta es y = ' + F.poli([m, bb], 'x'),
            'y(' + x0 + ') = ' + m + '(' + x0 + ') + ' + bb + ' = <b>' + (m * x0 + bb) + '</b>'];
        } else {
          var p1 = r.entero(2, 6), p2 = r.entero(2, 6), p3 = r.entero(2, 6);
          var u = r.entero(50, 400);
          var T = (p1 + p2 + p3) * u;
          guiaDelPaso = G({
            intro: 'Hay que repartir <b>$' + T + '</b> entre tres personas, proporcionalmente a <b>' + p1 + ', ' + p2 + ' y ' + p3 + '</b>.<br>' +
              'La idea: imagina que el dinero se corta en pedacitos iguales. Cada persona no se lleva un tercio, ' +
              'sino tantos pedacitos como le toquen. Primero hay que saber cuantos pedacitos hay en total y cuanto vale cada uno.',
            pasos: [
              { pregunta: '&iquest;En cuantas partes iguales se corta el total?<br>' + p1 + ' + ' + p2 + ' + ' + p3,
                resp: R.numero(p1 + p2 + p3, { dec: 0 }),
                pista: 'Suma los tres numeros de la proporcion.',
                despues: 'Hay ' + (p1 + p2 + p3) + ' partes en total.' },
              { pregunta: '&iquest;Cuanto vale cada parte? ' + T + ' &divide; ' + (p1 + p2 + p3),
                resp: R.numero(u, { dec: 2 }),
                pista: 'Reparte el total entre el numero de partes.',
                despues: 'Cada parte vale $' + u + '. Este es el numero clave de todo el ejercicio.' },
              { pregunta: 'A la primera persona le tocan ' + p1 + ' partes: ' + p1 + ' &times; ' + u,
                resp: R.numero(p1 * u, { dec: 2 }),
                pista: 'Multiplica sus partes por el valor de cada una.',
                despues: 'Con las otras dos es igual.' },
              { pregunta: 'Calcula las tres y escribelas.',
                resp: R.varios([
                  { etiqueta: 'Parte de ' + p1, resp: R.numero(p1 * u, { dec: 2 }) },
                  { etiqueta: 'Parte de ' + p2, resp: R.numero(p2 * u, { dec: 2 }) },
                  { etiqueta: 'Parte de ' + p3, resp: R.numero(p3 * u, { dec: 2 }) }
                ]),
                pista: '$' + (p1 * u) + ', $' + (p2 * u) + ' y $' + (p3 * u) + '.',
                despues: 'Comprobacion: las tres deben sumar exactamente $' + T + '.' }
            ],
            final: 'Les tocan <b>$' + (p1 * u) + '</b>, <b>$' + (p2 * u) + '</b> y <b>$' + (p3 * u) + '</b>',
            receta: ['Sumar los numeros de la proporcion: esas son las partes',
              'Total &divide; partes = cuanto vale cada parte',
              'Multiplicar el valor de la parte por lo que le toca a cada quien',
              'Comprobar que todo sume el total']
          });
          enun = 'Se reparten $' + T + ' entre tres personas de forma directamente proporcional a ' + p1 + ', ' + p2 + ' y ' + p3 + '.<br>&iquest;Cuanto le toca a cada una?';
          resp = R.varios([
            { etiqueta: 'Parte de ' + p1, resp: R.numero(p1 * u, { dec: 2 }) },
            { etiqueta: 'Parte de ' + p2, resp: R.numero(p2 * u, { dec: 2 }) },
            { etiqueta: 'Parte de ' + p3, resp: R.numero(p3 * u, { dec: 2 }) }
          ]);
          pistas = ['Suma las partes y divide el total entre esa suma: eso vale cada parte.',
            'Suma = ' + (p1 + p2 + p3) + ', asi que cada parte vale ' + T + ' / ' + (p1 + p2 + p3) + ' = ' + u + '.'];
          sol = ['Suma de las partes: ' + p1 + ' + ' + p2 + ' + ' + p3 + ' = ' + (p1 + p2 + p3),
            'Valor de cada parte: ' + T + ' &divide; ' + (p1 + p2 + p3) + ' = ' + u,
            'Reparto: ' + p1 + '&middot;' + u + ' = <b>' + (p1 * u) + '</b>, ' + p2 + '&middot;' + u + ' = <b>' + (p2 * u) + '</b>, ' + p3 + '&middot;' + u + ' = <b>' + (p3 * u) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
