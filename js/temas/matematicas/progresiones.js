/* Progresiones aritmeticas y geometricas */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  var G = EJ.guia.armar;

  var extra = {};

  extra.medios = function (r) {
    var a1 = r.entero(-8, 10), d = r.enteroNoCero(-7, 8), k = r.entero(2, 4);
    var ultimo = a1 + (k + 1) * d;
    var medios = [];
    for (var i = 1; i <= k; i++) medios.push(a1 + i * d);
    return {
      guia: G({
        intro: 'Hay que <b>interpolar ' + k + ' medios aritmeticos</b> entre ' + a1 + ' y ' + ultimo + '.<br>' +
          'Interpolar significa meter numeros en medio de forma que todo quede como una progresion aritmetica: ' +
          'que de cada uno al siguiente se sume siempre lo mismo. El chiste es encontrar cuanto es ese "lo mismo".',
        pasos: [
          { pregunta: 'Si metes ' + k + ' numeros entre los dos que ya hay, &iquest;cuantos terminos quedan en total?',
            resp: R.numero(k + 2, { dec: 0 }),
            pista: 'Los ' + k + ' de en medio mas los dos de las puntas.',
            despues: 'Son ' + (k + 2) + ' terminos: ' + a1 + ', ' + k + ' medios, y ' + ultimo + '.' },
          { pregunta: 'Del primero al ultimo, &iquest;cuantos SALTOS hay?',
            resp: R.numero(k + 1, { dec: 0 }),
            pista: 'Siempre hay un salto menos que terminos: con ' + (k + 2) + ' terminos hay ' + (k + 1) + ' saltos.',
            despues: 'Aqui es donde se equivoca casi todo el mundo: se dividen entre ' + k + ' en vez de entre ' + (k + 1) + '.' },
          { pregunta: 'La distancia total es ' + ultimo + ' &minus; (' + a1 + ') = ' + (ultimo - a1) + ', repartida en ' + (k + 1) + ' saltos.<br>&iquest;Cuanto vale d?',
            resp: R.numero(d, { dec: 0 }),
            pista: 'd = ' + (ultimo - a1) + ' &divide; ' + (k + 1) + '.',
            despues: 'Cada salto vale ' + d + '.' },
          { pregunta: 'Ahora ve sumando ' + d + ' desde ' + a1 + '.<br>Escribe los ' + k + ' medios separados por comas.',
            resp: R.lista(medios, { ayuda: 'Escribe los ' + k + ' valores separados por comas.' }),
            pista: a1 + ' + (' + d + ') = ' + medios[0] + ', y asi sucesivamente.',
            despues: 'Comprueba: si sumas ' + d + ' al ultimo medio debe salir ' + ultimo + '.' }
        ],
        final: 'Los medios son <b>' + medios.join(', ') + '</b>',
        receta: ['Contar el total de terminos: los medios mas los dos extremos',
          'Los saltos son uno menos que los terminos',
          'd = (ultimo &minus; primero) &divide; saltos',
          'Ir sumando d desde el primero',
          'Comprobar que se cae justo en el ultimo']
      }),
      enunciado: 'Interpola ' + k + ' medios aritmeticos entre ' + a1 + ' y ' + ultimo + '.<br>' +
        'Da los ' + k + ' numeros que van en medio, separados por comas.',
      respuesta: R.lista(medios, { ayuda: 'Escribe los ' + k + ' valores separados por comas.' }),
      pistas: ['Al meter ' + k + ' numeros en medio quedan ' + (k + 2) + ' terminos en total.',
        'Usa a<sub>' + (k + 2) + '</sub> = a<sub>1</sub> + (' + (k + 1) + ')d y despeja d: d = (' + ultimo + ' &minus; ' + a1 + ')/' + (k + 1) + ' = ' + d + '.'],
      solucion: ['En total hay ' + (k + 2) + ' terminos: ' + a1 + ', los ' + k + ' medios, y ' + ultimo,
        'd = (' + ultimo + ' &minus; ' + a1 + ') / ' + (k + 1) + ' = ' + d,
        'Voy sumando ' + d + ': <b>' + medios.join(', ') + '</b>']
    };
  };

  extra.hallarR = function (r) {
    var a1 = r.elige([2, 3, 4, 5]), q = r.elige([2, 3, 4]), k = r.entero(4, 6);
    var ak = a1 * Math.pow(q, k - 1);
    return {
      guia: G({
        intro: 'Sabemos que a<sub>1</sub> = <b>' + a1 + '</b> y a<sub>' + k + '</sub> = <b>' + ak + '</b>, y falta la razon.<br>' +
          'La formula es a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>. Aqui conocemos todo menos r, asi que se despeja. ' +
          'Como r viene elevada, al final habra que sacar una raiz.',
        pasos: [
          { pregunta: 'De a<sub>' + k + '</sub> = ' + a1 + ' &middot; r<sup>' + (k - 1) + '</sup>, despeja la potencia:<br>' + ak + ' &divide; ' + a1,
            resp: R.numero(ak / a1, { dec: 0 }),
            pista: 'El ' + a1 + ' esta multiplicando, asi que pasa dividiendo.',
            despues: 'Entonces r<sup>' + (k - 1) + '</sup> = ' + (ak / a1) + '.' },
          { pregunta: '&iquest;Que numero elevado a la ' + (k - 1) + ' da ' + (ak / a1) + '?',
            resp: R.numero(q, { dec: 4, tol: 0.001 }),
            pista: 'Prueba con numeros chicos: ' + q + ' elevado a ' + (k - 1) + ' da ' + (ak / a1) + '.',
            despues: 'La razon es r = ' + q + '.' },
          { pregunta: 'Ya con r, calcula a<sub>' + (k + 2) + '</sub> = ' + a1 + ' &middot; ' + q + '<sup>' + (k + 1) + '</sup>.<br>&iquest;Cuanto da?',
            resp: R.numero(a1 * Math.pow(q, k + 1), { dec: 2, tol: 0.01 }),
            pista: q + '<sup>' + (k + 1) + '</sup> = ' + Math.pow(q, k + 1) + ', y eso por ' + a1 + '.',
            despues: 'Ojo con el exponente: para a<sub>' + (k + 2) + '</sub> es ' + (k + 1) + ', uno menos que el lugar.' },
          { pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'Razon r', resp: R.numero(q, { dec: 4, tol: 0.001 }) },
              { etiqueta: 'a<sub>' + (k + 2) + '</sub>', resp: R.numero(a1 * Math.pow(q, k + 1), { dec: 2, tol: 0.01 }) }
            ]),
            pista: 'r = ' + q + ' y a<sub>' + (k + 2) + '</sub> = ' + (a1 * Math.pow(q, k + 1)) + '.',
            despues: '' }
        ],
        final: 'r = <b>' + q + '</b> y a<sub>' + (k + 2) + '</sub> = <b>' + (a1 * Math.pow(q, k + 1)) + '</b>',
        receta: ['Escribir la formula a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>',
          'Dividir entre a<sub>1</sub> para dejar sola la potencia',
          'Sacar la raiz correspondiente para hallar r',
          'Con r ya se calcula cualquier otro termino',
          'El exponente siempre es el lugar menos 1']
      }),
      enunciado: 'En una progresion geometrica a<sub>1</sub> = ' + a1 + ' y a<sub>' + k + '</sub> = ' + ak + '.<br>' +
        'Encuentra la razon r y el termino a<sub>' + (k + 2) + '</sub>.',
      respuesta: R.varios([
        { etiqueta: 'Razon r', resp: R.numero(q, { dec: 4, tol: 0.001 }) },
        { etiqueta: 'a<sub>' + (k + 2) + '</sub>', resp: R.numero(a1 * Math.pow(q, k + 1), { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['De a<sub>k</sub> = a<sub>1</sub>r<sup>k&minus;1</sup> despeja: r<sup>' + (k - 1) + '</sup> = ' + ak + '/' + a1 + '.',
        'r<sup>' + (k - 1) + '</sup> = ' + (ak / a1) + ', asi que r es la raiz ' + (k - 1) + '-esima de ese numero.'],
      solucion: ['r<sup>' + (k - 1) + '</sup> = ' + ak + ' / ' + a1 + ' = ' + (ak / a1),
        'r = <b>' + q + '</b>',
        'a<sub>' + (k + 2) + '</sub> = ' + a1 + ' &middot; ' + q + '<sup>' + (k + 1) + '</sup> = <b>' + (a1 * Math.pow(q, k + 1)) + '</b>']
    };
  };

  EJ.tema({
    id: 'progresiones',
    materia: 'matematicas',
    grupo: 'Sucesiones y series',
    nombre: 'Progresiones aritmeticas y geometricas',
    descripcion: 'Termino n-esimo y suma de progresiones aritmeticas y geometricas.',
    formulario: 'Aritmetica: a<sub>n</sub> = a<sub>1</sub> + (n&minus;1)d &nbsp;&middot;&nbsp; S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2<br>' +
      'Geometrica: a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup> &nbsp;&middot;&nbsp; S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1) &nbsp;&middot;&nbsp; S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r) si |r| &lt; 1',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a1, d, n, q, an;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['aritmetica', 'Termino n-esimo aritmetico'],
          ['geometrica', 'Termino n-esimo geometrico']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'aritmetica') {
          a1 = r.entero(-8, 12); d = r.enteroNoCero(-6, 8); n = r.entero(8, 20);
          an = a1 + (n - 1) * d;
          guiaDelPaso = EJ.guia.terminoAritmetico(a1, d, n);
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y d = ' + d + '.<br>Calcula a<sub>' + n + '</sub>.';
          resp = R.numero(an, { dec: 0 });
          pistas = ['Usa a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.',
            'a<sub>' + n + '</sub> = ' + a1 + ' + (' + n + ' &minus; 1)(' + d + ')'];
          sol = ['a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d',
            'a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + a1 + ' + ' + ((n - 1) * d),
            'a<sub>' + n + '</sub> = <b>' + an + '</b>'];
        } else {
          a1 = r.elige([1, 2, 3, 4, 5]); q = r.elige([2, 3, -2]); n = r.entero(5, 9);
          an = a1 * Math.pow(q, n - 1);
          guiaDelPaso = G({
            intro: 'Progresion geometrica con a<sub>1</sub> = <b>' + a1 + '</b> y r = <b>' + q + '</b>; queremos <b>a<sub>' + n + '</sub></b>.<br>' +
              'En una geometrica cada termino sale de multiplicar el anterior por r. Para llegar al lugar ' + n + ' ' +
              'habria que multiplicar varias veces, y eso es justo lo que hace la formula a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>.',
            pasos: [
              { pregunta: 'Para llegar del lugar 1 al lugar ' + n + ', &iquest;cuantas veces hay que multiplicar por ' + q + '?',
                resp: R.numero(n - 1, { dec: 0 }),
                pista: 'No son ' + n + ' veces. El primer termino ya esta ahi sin multiplicar nada; por eso el exponente es n &minus; 1.',
                despues: 'Entonces el exponente es ' + (n - 1) + '.' },
              { pregunta: 'Calcula la potencia: (' + q + ')' + F.sup(n - 1),
                resp: R.numero(Math.pow(q, n - 1), { dec: 0 }),
                pista: q < 0 ? 'Base negativa con exponente ' + ((n - 1) % 2 === 0 ? 'par: sale positivo' : 'impar: sale negativo') + '.'
                  : 'Multiplica ' + q + ' por si mismo ' + (n - 1) + ' veces.',
                despues: '' },
              { pregunta: 'Multiplica por el primer termino: ' + a1 + ' &middot; ' + Math.pow(q, n - 1),
                resp: R.numero(an, { dec: 0 }),
                pista: 'Multiplicacion directa.',
                despues: '' }
            ],
            final: 'a<sub>' + n + '</sub> = <b>' + an + '</b>',
            receta: ['Geometrica: se multiplica por r cada vez',
              'El exponente es n &minus; 1, no n',
              'Calcular primero la potencia',
              'Multiplicar por a<sub>1</sub> al final']
          });
          enun = 'En una progresion geometrica a<sub>1</sub> = ' + a1 + ' y r = ' + q + '.<br>Calcula a<sub>' + n + '</sub>.';
          resp = R.numero(an, { dec: 0 });
          pistas = ['Usa a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>.',
            'a<sub>' + n + '</sub> = ' + a1 + ' &middot; (' + q + ')' + F.sup(n - 1)];
          sol = ['a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>',
            '(' + q + ')' + F.sup(n - 1) + ' = ' + Math.pow(q, n - 1),
            'a<sub>' + n + '</sub> = ' + a1 + ' &middot; ' + Math.pow(q, n - 1) + ' = <b>' + an + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['sumaAP', 'Suma de una aritmetica'],
          ['hallarD', 'Hallar la diferencia d'],
          ['sumaGP', 'Suma de una geometrica'],
          ['medios', 'Interpolar medios aritmeticos']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'sumaAP') {
          a1 = r.entero(-5, 10); d = r.enteroNoCero(-5, 7); n = r.entero(10, 25);
          an = a1 + (n - 1) * d;
          var S = n * (a1 + an) / 2;
          guiaDelPaso = G({
            intro: 'Hay que sumar los primeros <b>' + n + '</b> terminos de una aritmetica que empieza en <b>' + a1 + '</b> con d = <b>' + d + '</b>.<br>' +
              'Sumarlos uno por uno seria eterno. El truco es el de Gauss: si emparejas el primero con el ultimo, ' +
              'el segundo con el penultimo, etc., todas las parejas suman lo mismo. De ahi sale S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.',
            pasos: [
              { pregunta: 'La formula pide el ULTIMO termino, asi que hay que calcularlo primero.<br>a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ')',
                resp: R.numero(an, { dec: 0 }),
                pista: (n - 1) + ' &times; (' + d + ') = ' + ((n - 1) * d) + ', mas ' + a1 + '.',
                despues: 'a<sub>' + n + '</sub> = ' + an + '. Este es el paso que se salta la gente y por eso no le sale la suma.' },
              { pregunta: 'Suma el primero con el ultimo: ' + a1 + ' + (' + an + ')',
                resp: R.numero(a1 + an, { dec: 0 }),
                pista: 'Suma simple, con cuidado de los signos.',
                despues: 'Todas las parejas (segundo con penultimo, etc.) suman exactamente esto mismo.' },
              { pregunta: 'Hay ' + n + ' terminos, o sea ' + n + '/2 parejas.<br>Calcula ' + n + ' &times; ' + (a1 + an) + ' &divide; 2',
                resp: R.numero(S, { dec: 2 }),
                pista: 'Multiplica y luego divide entre 2.',
                despues: '' }
            ],
            final: 'S<sub>' + n + '</sub> = <b>' + F.n(S) + '</b>',
            receta: ['Calcular primero el ultimo termino a<sub>n</sub>',
              'Sumar primero + ultimo',
              'Multiplicar por n y dividir entre 2',
              'Idea: todas las parejas suman lo mismo']
          });
          enun = 'Calcula la suma de los primeros ' + n + ' terminos de la progresion aritmetica que empieza con a<sub>1</sub> = ' + a1 + ' y tiene d = ' + d + '.';
          resp = R.numero(S, { dec: 2 });
          pistas = ['Primero necesitas el ultimo termino a<sub>' + n + '</sub>, luego usa S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.',
            'a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + an + '.'];
          sol = ['a<sub>' + n + '</sub> = ' + a1 + ' + ' + (n - 1) + '(' + d + ') = ' + an,
            'S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2 = ' + n + '(' + a1 + ' + ' + an + ')/2',
            'S<sub>' + n + '</sub> = ' + n + '(' + (a1 + an) + ')/2 = <b>' + F.n(S) + '</b>'];
        } else if (t === 'hallarD') {
          a1 = r.entero(-6, 10); d = r.enteroNoCero(-6, 8);
          var k = r.entero(6, 15);
          var ak = a1 + (k - 1) * d;
          guiaDelPaso = G({
            intro: 'Sabemos que a<sub>1</sub> = <b>' + a1 + '</b> y a<sub>' + k + '</sub> = <b>' + ak + '</b>, pero no nos dan d.<br>' +
              'La idea es simple: entre esos dos terminos hay cierta distancia, y esa distancia se repartio en partes iguales. ' +
              'Cada parte es d.',
            pasos: [
              { pregunta: 'Del lugar 1 al lugar ' + k + ', &iquest;cuantos saltos hay?',
                resp: R.numero(k - 1, { dec: 0 }),
                pista: 'Uno menos que la diferencia de lugares... o mejor dicho: ' + k + ' &minus; 1. Del 1 al 2 hay un salto.',
                despues: 'Por eso la formula lleva (n &minus; 1)d.' },
              { pregunta: '&iquest;Cuanto cambio el valor en total? ' + ak + ' &minus; (' + a1 + ')',
                resp: R.numero(ak - a1, { dec: 0 }),
                pista: 'Ultimo menos primero, con signos.',
                despues: 'Esa es la distancia total recorrida.' },
              { pregunta: 'Reparte esa distancia entre los saltos: ' + (ak - a1) + ' &divide; ' + (k - 1),
                resp: R.numero(d, { dec: 3 }),
                pista: 'Division directa. Si sale negativa, la progresion va bajando.',
                despues: 'd = ' + d + '.' },
              { pregunta: 'Ya con d, calcula a<sub>' + (k + 5) + '</sub> = ' + a1 + ' + ' + (k + 4) + '(' + d + ')',
                resp: R.numero(a1 + (k + 4) * d, { dec: 3 }),
                pista: 'Otra vez el (n &minus; 1): para el lugar ' + (k + 5) + ' son ' + (k + 4) + ' saltos.',
                despues: '' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'd', resp: R.numero(d, { dec: 3 }) },
                  { etiqueta: 'a<sub>' + (k + 5) + '</sub>', resp: R.numero(a1 + (k + 4) * d, { dec: 3 }) }
                ]),
                pista: 'd = ' + d + ' y a<sub>' + (k + 5) + '</sub> = ' + (a1 + (k + 4) * d) + '.',
                despues: '' }
            ],
            final: 'd = <b>' + d + '</b> y a<sub>' + (k + 5) + '</sub> = <b>' + (a1 + (k + 4) * d) + '</b>',
            receta: ['Contar los saltos: lugar final menos lugar inicial',
              'Calcular el cambio total de valor',
              'd = cambio total &divide; saltos',
              'Con d ya se puede saltar a cualquier lugar']
          });
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y a<sub>' + k + '</sub> = ' + ak + '.<br>Encuentra la diferencia d y el termino a<sub>' + (k + 5) + '</sub>.';
          resp = R.varios([
            { etiqueta: 'd', resp: R.numero(d, { dec: 3 }) },
            { etiqueta: 'a<sub>' + (k + 5) + '</sub>', resp: R.numero(a1 + (k + 4) * d, { dec: 3 }) }
          ]);
          pistas = ['De a<sub>k</sub> = a<sub>1</sub> + (k &minus; 1)d despeja d.',
            'd = (' + ak + ' &minus; ' + a1 + ') / (' + k + ' &minus; 1) = ' + d + '.'];
          sol = ['d = (a<sub>' + k + '</sub> &minus; a<sub>1</sub>)/(' + k + ' &minus; 1) = (' + ak + ' &minus; ' + a1 + ')/' + (k - 1) + ' = <b>' + d + '</b>',
            'a<sub>' + (k + 5) + '</sub> = ' + a1 + ' + ' + (k + 4) + '(' + d + ') = <b>' + (a1 + (k + 4) * d) + '</b>'];
        } else {
          a1 = r.elige([1, 2, 3, 4]); q = r.elige([2, 3]); n = r.entero(5, 9);
          var Sg = a1 * (Math.pow(q, n) - 1) / (q - 1);
          guiaDelPaso = G({
            intro: 'Hay que sumar los primeros <b>' + n + '</b> terminos de una geometrica con a<sub>1</sub> = <b>' + a1 + '</b> y r = <b>' + q + '</b>.<br>' +
              'Aqui no sirve el truco de las parejas, porque los terminos crecen muy rapido. La formula propia es<br>' +
              'S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1) / (r &minus; 1).<br>' +
              'Ojo: aqui el exponente SI es n, no n &minus; 1.',
            pasos: [
              { pregunta: 'Calcula la potencia: ' + q + F.sup(n),
                resp: R.numero(Math.pow(q, n), { dec: 0 }),
                pista: 'Multiplica ' + q + ' por si mismo ' + n + ' veces. Crece rapidisimo.',
                despues: 'Cuidado: en la SUMA el exponente es n; en el termino n-esimo era n &minus; 1.' },
              { pregunta: 'Restale 1: ' + Math.pow(q, n) + ' &minus; 1',
                resp: R.numero(Math.pow(q, n) - 1, { dec: 0 }),
                pista: 'Resta directa.', despues: '' },
              { pregunta: 'Ahora divide entre (r &minus; 1) = ' + (q - 1) + ' y multiplica por a<sub>1</sub> = ' + a1 + '.<br>&iquest;Cuanto da la suma?',
                resp: R.numero(Sg, { dec: 2 }),
                pista: a1 + ' &times; ' + (Math.pow(q, n) - 1) + ' &divide; ' + (q - 1) + '.',
                despues: '' }
            ],
            final: 'S<sub>' + n + '</sub> = <b>' + F.n(Sg) + '</b>',
            receta: ['S<sub>n</sub> = a<sub>1</sub>(r&#8319; &minus; 1)/(r &minus; 1)',
              'En la suma el exponente es n (no n &minus; 1)',
              'Calcular la potencia, restar 1',
              'Dividir entre r &minus; 1 y multiplicar por a<sub>1</sub>']
          });
          enun = 'Calcula la suma de los primeros ' + n + ' terminos de la progresion geometrica con a<sub>1</sub> = ' + a1 + ' y r = ' + q + '.';
          resp = R.numero(Sg, { dec: 2 });
          pistas = ['Usa S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1).',
            q + F.sup(n) + ' = ' + Math.pow(q, n) + '.'];
          sol = ['S<sub>n</sub> = a<sub>1</sub>(r<sup>n</sup> &minus; 1)/(r &minus; 1)',
            'S = ' + a1 + '(' + Math.pow(q, n) + ' &minus; 1)/(' + q + ' &minus; 1) = ' + a1 + '(' + (Math.pow(q, n) - 1) + ')/' + (q - 1),
            'S = <b>' + F.n(Sg) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['infinita', 'Suma geometrica infinita'],
          ['hallarN', 'Hallar el lugar n'],
          ['hallarR', 'Hallar la razon r'],
          ['problema', 'Problema aplicado'],
          ['medios', 'Interpolar medios aritmeticos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'infinita') {
          var pn = r.entero(1, 4), pd = r.elige([2, 3, 4, 5]);
          while (pn >= pd) pn = r.entero(1, pd - 1);
          a1 = r.entero(2, 12);
          var Sinf = a1 / (1 - pn / pd);
          guiaDelPaso = G({
            intro: 'Hay que sumar <b>infinitos</b> terminos: a<sub>1</sub> = ' + a1 + ' y r = ' + F.frac(pn, pd) + '.<br>' +
              'Suena imposible, pero como la razon es menor que 1, cada termino es mas chico que el anterior y se van ' +
              'haciendo diminutos. La suma se acerca a un numero fijo y nunca lo pasa. La formula es S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r).',
            pasos: [
              { pregunta: '&iquest;Por que esta suma infinita si da un numero?',
                resp: R.opcion(['Porque |r| &lt; 1 y los terminos se hacen cada vez mas chicos',
                  'Porque son infinitos terminos'], 0),
                pista: 'Si r fuera 2, cada termino seria mas grande y la suma se iria al infinito. Con r = ' + F.frac(pn, pd) + ' pasa lo contrario.',
                despues: 'Esa condicion |r| &lt; 1 hay que revisarla SIEMPRE antes de usar la formula.' },
              { pregunta: 'Calcula el denominador: 1 &minus; ' + F.frac(pn, pd),
                resp: R.fraccion(pd - pn, pd),
                pista: 'Escribe el 1 como ' + F.frac(pd, pd) + ' y resta: ' + F.frac(pd, pd) + ' &minus; ' + F.frac(pn, pd) + '.',
                despues: 'Queda ' + F.frac(pd - pn, pd) + '.' },
              { pregunta: 'Ahora divide: ' + a1 + ' &divide; ' + F.frac(pd - pn, pd) + '<br>&iquest;Cuanto da la suma? (4 decimales)',
                resp: R.numero(Sinf, { dec: 4 }),
                pista: 'Dividir entre una fraccion es multiplicar por su reciproco: ' + a1 + ' &middot; ' + F.frac(pd, pd - pn) + '.',
                despues: 'Exacto vale ' + F.fracSimp(a1 * pd, pd - pn) + '.' }
            ],
            final: 'S<sub>&infin;</sub> = <b>' + F.fracSimp(a1 * pd, pd - pn) + '</b> (' + F.n(Sinf, 4) + ')',
            receta: ['Comprobar que |r| &lt; 1, si no, no converge',
              'S<sub>&infin;</sub> = a<sub>1</sub> / (1 &minus; r)',
              'Restar la fraccion con denominador comun',
              'Dividir = multiplicar por el reciproco']
          });
          enun = 'Calcula la suma de todos los terminos de la progresion geometrica infinita con a<sub>1</sub> = ' + a1 + ' y r = ' + F.frac(pn, pd) + '.';
          resp = R.numero(Sinf, { dec: 4 });
          pistas = ['Como |r| &lt; 1 la serie converge: S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r).',
            '1 &minus; ' + F.frac(pn, pd) + ' = ' + F.frac(pd - pn, pd) + ', y dividir entre una fraccion es multiplicar por su reciproco.'];
          sol = ['|r| = ' + F.frac(pn, pd) + ' &lt; 1, asi que la serie converge',
            'S<sub>&infin;</sub> = a<sub>1</sub>/(1 &minus; r) = ' + a1 + ' / ' + F.frac(pd - pn, pd),
            'S<sub>&infin;</sub> = ' + a1 + ' &middot; ' + F.frac(pd, pd - pn) + ' = <b>' + F.fracSimp(a1 * pd, pd - pn) + '</b> (' + F.n(Sinf, 4) + ')'];
        } else if (t2 === 'hallarN') {
          a1 = r.entero(-4, 8); d = r.entero(2, 7); n = r.entero(12, 40);
          an = a1 + (n - 1) * d;
          guiaDelPaso = G({
            intro: 'Conocemos a<sub>1</sub> = <b>' + a1 + '</b>, d = <b>' + d + '</b> y el VALOR <b>' + an + '</b>; lo que falta es el <b>lugar</b>.<br>' +
              'Es el problema al reves: normalmente te dan n y buscas el valor. Aqui se plantea la misma formula ' +
              'a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d y se despeja n.',
            pasos: [
              { pregunta: 'Planteamos ' + an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ').<br>Empieza quitando el ' + a1 + ': ' + an + ' &minus; (' + a1 + ')',
                resp: R.numero(an - a1, { dec: 0 }),
                pista: 'Pasa el ' + a1 + ' restando al otro lado.',
                despues: 'Queda ' + (an - a1) + ' = ' + d + '(n &minus; 1).' },
              { pregunta: 'Ahora quita el ' + d + ' dividiendo: ' + (an - a1) + ' &divide; ' + d + '<br>&iquest;Cuanto vale (n &minus; 1)?',
                resp: R.numero((an - a1) / d, { dec: 0 }),
                pista: 'El ' + d + ' esta multiplicando al parentesis, asi que pasa dividiendo.',
                despues: 'Cuidado: esto todavia NO es n, es n &minus; 1.' },
              { pregunta: 'Ultimo paso: sumale 1.<br>&iquest;Que lugar ocupa?',
                resp: R.numero(n, { dec: 0 }),
                pista: 'n = ' + ((an - a1) / d) + ' + 1.',
                despues: 'Ese +1 final es el paso que mas se olvida en todo el tema.' }
            ],
            final: 'El termino ' + an + ' ocupa el lugar <b>' + n + '</b>',
            receta: ['Usar la misma formula a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d',
              'Restar a<sub>1</sub> de los dos lados',
              'Dividir entre d',
              'SUMAR 1 al final para pasar de (n &minus; 1) a n',
              'El resultado debe ser un entero positivo']
          });
          enun = 'En una progresion aritmetica a<sub>1</sub> = ' + a1 + ' y d = ' + d + '.<br>&iquest;Que lugar n ocupa el termino que vale ' + an + '?';
          resp = R.numero(n, { dec: 0 });
          pistas = ['Plantea ' + an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ') y despeja n.',
            '(n &minus; 1) = (' + an + ' &minus; ' + a1 + ')/' + d + ' = ' + ((an - a1) / d) + '.'];
          sol = [an + ' = ' + a1 + ' + (n &minus; 1)(' + d + ')',
            (an - a1) + ' = ' + d + '(n &minus; 1) &rArr; n &minus; 1 = ' + ((an - a1) / d),
            'n = <b>' + n + '</b>'];
        } else {
          var sueldo = r.entero(8, 15) * 1000;
          var aum = r.entero(3, 9) * 100;
          var anios = r.entero(6, 12);
          var total = anios * (2 * sueldo + (anios - 1) * aum) / 2;
          guiaDelPaso = G({
            intro: 'Gana <b>$' + sueldo + '</b> el primer año y le aumentan <b>$' + aum + '</b> fijos cada año. ' +
              'Piden el sueldo del año <b>' + anios + '</b> y el total acumulado.<br>' +
              'Lo primero en cualquier problema aplicado es traducirlo: &iquest;que es a<sub>1</sub>, que es d, que es n?',
            pasos: [
              { pregunta: '&iquest;Que tipo de progresion es?',
                resp: R.opcion(['Aritmetica: cada año se SUMA la misma cantidad',
                  'Geometrica: cada año se MULTIPLICA por lo mismo'], 0),
                pista: 'Dice "$' + aum + ' fijos", no "un ' + aum + '% mas". Se suma siempre lo mismo.',
                despues: 'Entonces a<sub>1</sub> = ' + sueldo + ' y d = ' + aum + '.' },
              { pregunta: 'Sueldo del año ' + anios + ': a<sub>' + anios + '</sub> = ' + sueldo + ' + ' + (anios - 1) + '(' + aum + ')',
                resp: R.numero(sueldo + (anios - 1) * aum, { dec: 2 }),
                pista: 'Son ' + (anios - 1) + ' aumentos, no ' + anios + ': el primer año todavia no le habian aumentado nada.',
                despues: 'Gana $' + (sueldo + (anios - 1) * aum) + ' en el año ' + anios + '.' },
              { pregunta: 'Para el TOTAL se usa S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.<br>Suma primero y ultimo: ' + sueldo + ' + ' + (sueldo + (anios - 1) * aum),
                resp: R.numero(2 * sueldo + (anios - 1) * aum, { dec: 2 }),
                pista: 'Suma el sueldo del primer año con el del año ' + anios + '.',
                despues: '' },
              { pregunta: 'Multiplica por ' + anios + ' y divide entre 2.<br>&iquest;Cuanto gano en total?',
                resp: R.numero(total, { dec: 2 }),
                pista: anios + ' &times; ' + (2 * sueldo + (anios - 1) * aum) + ' &divide; 2.',
                despues: 'Revisa que tenga sentido: debe ser mas que ' + anios + ' veces el primer sueldo.' },
              { pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Anio ' + anios, resp: R.numero(sueldo + (anios - 1) * aum, { dec: 2 }) },
                  { etiqueta: 'Total', resp: R.numero(total, { dec: 2 }) }
                ]),
                pista: '$' + (sueldo + (anios - 1) * aum) + ' y $' + total + '.',
                despues: '' }
            ],
            final: 'Gana <b>$' + (sueldo + (anios - 1) * aum) + '</b> en el año ' + anios + ' y <b>$' + F.n(total) + '</b> en total',
            receta: ['Traducir el problema: quien es a<sub>1</sub>, d y n',
              'Aumento FIJO en dinero = aritmetica (si fuera % seria geometrica)',
              'Los aumentos son n &minus; 1',
              'Para el acumulado, la formula de la suma',
              'Revisar que el resultado sea razonable']
          });
          enun = 'Una persona gana $' + sueldo + ' el primer anio y cada anio le aumentan $' + aum + ' fijos.<br>' +
            '&iquest;Cuanto gana en el anio ' + anios + ' y cuanto ha ganado en total en esos ' + anios + ' anios?';
          resp = R.varios([
            { etiqueta: 'Anio ' + anios, resp: R.numero(sueldo + (anios - 1) * aum, { dec: 2 }) },
            { etiqueta: 'Total', resp: R.numero(total, { dec: 2 }) }
          ]);
          pistas = ['Es una progresion aritmetica con a<sub>1</sub> = ' + sueldo + ' y d = ' + aum + '.',
            'Para el total usa S<sub>n</sub> = n(a<sub>1</sub> + a<sub>n</sub>)/2.'];
          sol = ['a<sub>' + anios + '</sub> = ' + sueldo + ' + ' + (anios - 1) + '(' + aum + ') = <b>' + (sueldo + (anios - 1) * aum) + '</b>',
            'S = ' + anios + '(' + sueldo + ' + ' + (sueldo + (anios - 1) * aum) + ')/2',
            'S = <b>' + F.n(total) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
