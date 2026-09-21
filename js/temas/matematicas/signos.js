/* Leyes de los signos */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function p(x) { return x < 0 ? '(' + x + ')' : String(x); }
  var G = EJ.guia.armar;

  /* Subtemas agregados aparte del bloque principal. */
  var extra = {};

  extra.valorAbsoluto = function (r) {
    var a = r.enteroNoCero(-15, 15), b = r.enteroNoCero(-12, 12), c = r.enteroNoCero(-9, 9);
    var val = Math.abs(a) + Math.abs(b) - Math.abs(c);
    return {
      guia: G({
        intro: 'Vamos con <b>|' + a + '| + |' + b + '| &minus; |' + c + '|</b>.<br>' +
          'Las barras son valor absoluto: miden la DISTANCIA al cero, asi que lo de adentro siempre sale positivo.',
        pasos: [
          { seccion: 'Paso 1: quitar las barras',
            queHacemos: 'El valor absoluto son dos barritas que borran el signo: |&minus;7| y |7| valen lo mismo, 7.',
            paraQue: 'Para poder operar con numeros normales. Las barras se quitan PRIMERO, una por una, y hasta despues se suma o se resta.',
            queda: String(Math.abs(a)),
            pregunta: '&iquest;Cuanto vale |' + a + '|?', resp: R.numero(Math.abs(a), { dec: 0 }),
            pista: 'Quita el signo: la distancia de ' + a + ' al cero.', despues: '' },
          { seccion: 'Paso 1: quitar las barras',
            queHacemos: 'El valor absoluto son dos barritas que borran el signo: |&minus;7| y |7| valen lo mismo, 7.',
            paraQue: 'Para poder operar con numeros normales. Las barras se quitan PRIMERO, una por una, y hasta despues se suma o se resta.',
            queda: Math.abs(a) + ' + ' + Math.abs(b),
            pregunta: '&iquest;Y |' + b + '|?', resp: R.numero(Math.abs(b), { dec: 0 }),
            pista: 'Otra vez, sin signo.', despues: '' },
          { seccion: 'Paso 1: quitar las barras',
            queHacemos: 'El valor absoluto son dos barritas que borran el signo: |&minus;7| y |7| valen lo mismo, 7.',
            paraQue: 'Para poder operar con numeros normales. Las barras se quitan PRIMERO, una por una, y hasta despues se suma o se resta.',
            queda: Math.abs(a) + ' + ' + Math.abs(b) + ' &minus; ' + Math.abs(c),
            pregunta: '&iquest;Y |' + c + '|?', resp: R.numero(Math.abs(c), { dec: 0 }),
            pista: 'Sin signo tambien.', despues: 'Ojo: el menos de AFUERA si cuenta, ese no se quita.' },
          { seccion: 'Paso 2: operar',
            queHacemos: 'Ya sin barras, hacemos la cuenta de izquierda a derecha.',
            paraQue: 'Porque la suma y la resta tienen la misma prioridad: se resuelven en el orden en que aparecen.',
            queda: String(val),
            pregunta: 'Ahora opera: ' + Math.abs(a) + ' + ' + Math.abs(b) + ' &minus; ' + Math.abs(c),
            resp: R.numero(val, { dec: 0 }), pista: 'De izquierda a derecha.', despues: '' }
        ],
        final: '|' + a + '| + |' + b + '| &minus; |' + c + '| = <b>' + val + '</b>',
        receta: ['Resolver cada valor absoluto por separado (siempre positivo)',
          'Los signos de AFUERA de las barras se respetan',
          'Operar de izquierda a derecha']
      }),
      enunciado: 'Calcula: |' + a + '| + |' + b + '| &minus; |' + c + '|',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['El valor absoluto es la distancia al cero: siempre sale positivo.',
        '|' + a + '| = ' + Math.abs(a) + ', |' + b + '| = ' + Math.abs(b) + ', |' + c + '| = ' + Math.abs(c) + '.'],
      solucion: ['Quito los signos dentro de las barras: ' + Math.abs(a) + ' + ' + Math.abs(b) + ' &minus; ' + Math.abs(c),
        'Opero de izquierda a derecha',
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.potenciaSigno = function (r) {
    var base = r.entero(2, 5), n = r.entero(2, 4);
    var conParentesis = r.bool();
    var val = conParentesis ? Math.pow(-base, n) : -Math.pow(base, n);
    return {
      guia: G({
        intro: 'Vamos con <b>' + (conParentesis ? '(&minus;' + base + ')' + F.sup(n) : '&minus;' + base + F.sup(n)) + '</b>.<br>' +
          'Aqui lo que decide todo es el PARENTESIS.',
        pasos: [
          { seccion: 'Paso 1: quien esta elevado',
            queHacemos: 'Miramos si el parentesis encierra al signo o no. Es todo el ejercicio.',
            paraQue: 'Porque (&minus;2)&sup2; y &minus;2&sup2; NO son lo mismo: el primero vale 4 y el segundo &minus;4.',
            queda: conParentesis ? '(&minus;' + base + ')' + F.sup(n) : '&minus;(' + base + F.sup(n) + ')',
            pregunta: '&iquest;Quien esta elevado al exponente ' + n + '?',
            resp: R.opcion(['El &minus;' + base + ' completo, con su signo', 'Solo el ' + base + ', el menos queda afuera'], conParentesis ? 0 : 1),
            pista: conParentesis ? 'El parentesis encierra al signo, asi que el signo tambien se eleva.'
              : 'Sin parentesis el exponente solo agarra al numero; el menos se queda esperando.',
            despues: conParentesis ? 'Entonces la base es &minus;' + base + '.' : 'Entonces primero se calcula ' + base + F.sup(n) + ' y al final se le pone el menos.' },
          { seccion: 'Paso 2: la potencia',
            queHacemos: 'Calculamos la potencia dejando el signo aparte, para no enredarnos.',
            paraQue: 'Asi el signo se decide una sola vez al final, en vez de ir arrastrandolo.',
            queda: (conParentesis ? '' : '&minus;') + Math.pow(base, n),
            pregunta: '&iquest;Cuanto vale ' + base + F.sup(n) + ' (sin signo)?',
            resp: R.numero(Math.pow(base, n), { dec: 0 }),
            pista: 'Multiplica ' + base + ' por si mismo ' + n + ' veces.', despues: '' },
          { seccion: 'Paso 3: el signo',
            queHacemos: 'Decidimos el signo del resultado.',
            paraQue: 'Con parentesis manda si el exponente es par o impar. Sin parentesis, el menos siempre queda afuera y el resultado es negativo.',
            queda: (val > 0 ? 'positivo' : 'negativo'),
            pregunta: 'Ahora el signo. &iquest;El resultado final es positivo o negativo?',
            resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
            pista: conParentesis ? 'Base negativa con exponente ' + (n % 2 === 0 ? 'PAR sale positivo' : 'IMPAR sale negativo') + '.'
              : 'El menos de afuera no se toco en ningun momento.',
            despues: '' },
          { seccion: 'Paso 3: el signo',
            queHacemos: 'Juntamos el numero con el signo que acabamos de decidir.',
            paraQue: 'Para dar la respuesta final.',
            queda: String(val),
            pregunta: 'Escribe el resultado completo.', resp: R.numero(val, { dec: 0 }),
            pista: 'Es ' + Math.pow(base, n) + ' con signo ' + (val < 0 ? 'negativo' : 'positivo') + '.', despues: '' }
        ],
        final: (conParentesis ? '(&minus;' + base + ')' + F.sup(n) : '&minus;' + base + F.sup(n)) + ' = <b>' + val + '</b>',
        receta: ['Con parentesis: el signo TAMBIEN se eleva',
          'Sin parentesis: el menos se queda afuera',
          'Base negativa: exponente par da positivo, impar da negativo']
      }),
      enunciado: 'Calcula: ' + (conParentesis ? '(&minus;' + base + ')' + F.sup(n) : '&minus;' + base + F.sup(n)),
      respuesta: R.numero(val, { dec: 0 }),
      pistas: [
        'Ojo con el parentesis: en (&minus;a)<sup>n</sup> el signo tambien se eleva; en &minus;a<sup>n</sup> el signo se queda afuera.',
        conParentesis ? 'Aqui la base es &minus;' + base + ' y el exponente ' + n + ' es ' + (n % 2 === 0 ? 'par' : 'impar') + '.'
          : 'Aqui primero se calcula ' + base + F.sup(n) + ' = ' + Math.pow(base, n) + ' y al final se le pone el menos.'
      ],
      solucion: conParentesis
        ? ['La base completa es (&minus;' + base + ')',
          'Exponente ' + n + ' (' + (n % 2 === 0 ? 'par' : 'impar') + ') &rArr; resultado ' + (val > 0 ? 'positivo' : 'negativo'),
          'Resultado: <b>' + val + '</b>']
        : ['Sin parentesis, el exponente solo afecta al ' + base,
          base + F.sup(n) + ' = ' + Math.pow(base, n),
          'El signo menos queda afuera: <b>' + val + '</b>']
    };
  };

  extra.fraccionesSigno = function (r) {
    var a = r.enteroNoCero(-9, 9), b = r.entero(2, 9);
    var c = r.enteroNoCero(-9, 9), d = r.entero(2, 9);
    var num = a * c, den = b * d;
    var s = F.simplifica(num, den);
    function fr(x, y) { return x < 0 ? '(&minus;' + F.frac(-x, y) + ')' : F.frac(x, y); }
    return {
      guia: G({
        intro: 'Vamos con <b>' + fr(a, b) + ' &middot; ' + fr(c, d) + '</b>.<br>' +
          'Es una multiplicacion de fracciones con signo: primero el signo, luego los numeros.',
        pasos: [
          { seccion: 'Paso 1: el signo',
            queHacemos: 'Decidimos el signo del resultado antes de multiplicar nada.',
            paraQue: 'Para no tener que andar arrastrando los menos por toda la cuenta: se resuelve una vez y se olvida.',
            queda: (num > 0 ? '+' : '&minus;') + ' (falta el numero)',
            pregunta: 'Signos ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (c < 0 ? 'negativo' : 'positivo') + '.<br>&iquest;De que signo sale el resultado?',
            resp: R.opcion(['Positivo', 'Negativo'], num > 0 ? 0 : 1),
            pista: 'Misma regla de siempre: iguales positivo, distintos negativo.', despues: '' },
          { seccion: 'Paso 2: multiplicar',
            queHacemos: 'Multiplicamos arriba con arriba.',
            paraQue: 'Multiplicar fracciones es lo mas facil que hay: derecho, sin buscar denominador comun.',
            queda: F.frac((num > 0 ? '' : '&minus;') + Math.abs(num), '?'),
            pregunta: 'Multiplica los numeradores (sin signo): ' + Math.abs(a) + ' &middot; ' + Math.abs(c),
            resp: R.numero(Math.abs(num), { dec: 0 }), pista: 'Arriba con arriba.', despues: '' },
          { seccion: 'Paso 2: multiplicar',
            queHacemos: 'Ahora abajo con abajo.',
            paraQue: 'Para completar la fraccion antes de simplificarla.',
            queda: F.frac((num > 0 ? '' : '&minus;') + Math.abs(num), den),
            pregunta: 'Multiplica los denominadores: ' + b + ' &middot; ' + d,
            resp: R.numero(den, { dec: 0 }), pista: 'Abajo con abajo.',
            despues: 'Vamos en ' + F.frac(num, den) + '.' },
          { seccion: 'Paso 3: simplificar',
            queHacemos: 'Buscamos si arriba y abajo se pueden dividir entre lo mismo.',
            paraQue: 'Una fraccion sin simplificar no esta mal, pero no esta terminada.',
            queda: F.fracSimp(num, den),
            pregunta: 'Simplifica y escribe la fraccion final (con su signo).',
            resp: R.fraccion(s[0], s[1]),
            pista: F.mcd(num, den) === 1 ? 'Revisa: si nada los divide, ya estaba simplificada.'
              : 'Los dos se pueden dividir entre ' + F.mcd(num, den) + '.',
            despues: '' }
        ],
        final: fr(a, b) + ' &middot; ' + fr(c, d) + ' = <b>' + F.fracSimp(num, den) + '</b>',
        receta: ['Decidir el signo con la regla',
          'Numerador por numerador, denominador por denominador',
          'Simplificar al final']
      }),
      enunciado: 'Multiplica y simplifica: ' + fr(a, b) + ' &middot; ' + fr(c, d),
      respuesta: R.fraccion(s[0], s[1]),
      pistas: ['Primero decide el signo del resultado con la regla de los signos; despues multiplica.',
        'Signos ' + (a < 0 ? '&minus;' : '+') + ' y ' + (c < 0 ? '&minus;' : '+') + ' dan ' + (num < 0 ? 'negativo' : 'positivo') + '.'],
      solucion: ['Signo del resultado: ' + (num < 0 ? 'negativo' : 'positivo'),
        'Numeradores: ' + a + ' &middot; ' + c + ' = ' + num + '; denominadores: ' + b + ' &middot; ' + d + ' = ' + den,
        'Simplifico: <b>' + F.fracSimp(num, den) + '</b>']
    };
  };

  EJ.tema({
    id: 'leyes-signos',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Leyes de los signos',
    descripcion: 'Suma, resta, multiplicacion y division con numeros positivos y negativos.',
    formulario: '(+)(+) = + &nbsp; (&minus;)(&minus;) = + &nbsp; (+)(&minus;) = &minus; &nbsp; (&minus;)(+) = &minus;<br>' +
      'Restar es sumar el opuesto: a &minus; (&minus;b) = a + b. Una potencia de base negativa es positiva si el exponente es par.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var a, b, c, d, val, enun, pistas, sol;

      if (dif === 'facil') {
        var tipo = r.subtema([
          ['suma', 'Suma y resta'],
          ['producto', 'Multiplicacion'],
          ['cociente', 'Division'],
          ['valorAbsoluto', 'Valor absoluto']
        ]);
        if (extra[tipo]) return extra[tipo](r, dif);
        if (tipo === 'producto') {
          a = r.enteroNoCero(-12, 12); b = r.enteroNoCero(-12, 12);
          val = a * b;
          guiaDelPaso = EJ.guia.productoSignos(a, b);
          enun = 'Calcula: ' + p(a) + ' &middot; ' + p(b);
          pistas = [
            'Signos iguales dan resultado positivo; signos distintos dan resultado negativo.',
            'Multiplica los valores absolutos: ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' = ' + Math.abs(val) + '. Solo falta decidir el signo.'
          ];
          sol = [
            'Los signos son ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + ', asi que el resultado es ' + (val < 0 ? 'negativo' : 'positivo') + '.',
            Math.abs(a) + ' &middot; ' + Math.abs(b) + ' = ' + Math.abs(val),
            'Resultado: <b>' + val + '</b>'
          ];
        } else if (tipo === 'suma') {
          a = r.enteroNoCero(-20, 20); b = r.enteroNoCero(-20, 20);
          var op = r.elige(['+', '-']);
          val = op === '+' ? a + b : a - b;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + a + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + p(b) + '</b>.<br>' +
              (op === '-' ? 'Lo primero al restar: restar es lo mismo que sumar el opuesto.'
                : 'Al sumar con signos, lo que importa es si los signos son iguales o distintos.'),
            pasos: [
              op === '-' ? {
                seccion: 'Paso 1: quitar la resta',
                queHacemos: 'Cambiamos la resta por una suma, volteandole el signo al segundo numero.',
                paraQue: 'Para tener una sola operacion en vez de dos. Con puras sumas se aplica una sola regla.',
                queda: a + ' + (' + (-b) + ')',
                pregunta: 'Cambia la resta por suma del opuesto.<br>&iquest;En que se convierte ' + p(b) + ' al cambiarle el signo?',
                resp: R.numero(-b, { dec: 0 }),
                pista: 'El opuesto de ' + b + ' es ' + (-b) + '.',
                despues: 'Entonces la cuenta es ' + a + ' + (' + (-b) + ').'
              } : {
                seccion: 'Paso 1: mirar los signos',
                queHacemos: 'Comparamos los dos signos antes de tocar los numeros.',
                paraQue: 'Porque la regla cambia por completo: iguales se suman, distintos se restan.',
                queda: (a < 0) === (b < 0) ? 'sumar y conservar el signo' : 'restar y poner el signo del mayor',
                pregunta: 'Los signos son ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + '.<br>&iquest;Que hay que hacer con los numeros?',
                resp: R.opcion(['Sumarlos y conservar el signo', 'Restarlos y poner el signo del mas grande'],
                  (a < 0) === (b < 0) ? 0 : 1),
                pista: 'Signos iguales se suman; signos distintos se restan.',
                despues: (a < 0) === (b < 0) ? 'Como son iguales, se suman y se conserva el signo.'
                  : 'Como son distintos, se restan y manda el de mayor valor absoluto.'
              },
              {
                seccion: 'Paso 2: la cuenta',
                queHacemos: 'Aplicamos lo que decidimos y sacamos el numero.',
                paraQue: 'Para llegar al resultado.',
                queda: String(val),
                pregunta: 'Haz la cuenta. &iquest;Cuanto da el resultado final?',
                resp: R.numero(val, { dec: 0 }),
                pista: 'Queda ' + a + ' ' + (op === '-' ? (b < 0 ? '+ ' + Math.abs(b) : '&minus; ' + b) : (b < 0 ? '&minus; ' + Math.abs(b) : '+ ' + b)) + '.',
                despues: ''
              }
            ],
            final: a + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + p(b) + ' = <b>' + val + '</b>',
            receta: ['Restar es sumar el opuesto',
              'Signos iguales: se suman y se conserva el signo',
              'Signos distintos: se restan y gana el de mayor valor absoluto']
          });
          enun = 'Calcula: ' + a + ' ' + op + ' ' + p(b);
          pistas = [
            op === '-' ? 'Restar un numero es sumar su opuesto: a &minus; (&minus;b) = a + b.' : 'Si los signos son iguales se suman y se conserva el signo; si son distintos se restan y manda el de mayor valor absoluto.',
            'Queda ' + a + ' ' + (op === '-' ? (b < 0 ? '+ ' + Math.abs(b) : '- ' + b) : (b < 0 ? '- ' + Math.abs(b) : '+ ' + b)) + '.'
          ];
          sol = [
            op === '-' ? 'Cambio la resta por suma del opuesto: ' + a + ' &minus; ' + p(b) + ' = ' + a + ' ' + (b < 0 ? '+ ' + Math.abs(b) : '&minus; ' + b) : 'Sumo directamente.',
            'Resultado: <b>' + val + '</b>'
          ];
        } else {
          b = r.enteroNoCero(-9, 9);
          var q = r.enteroNoCero(-9, 9);
          a = b * q;
          val = q;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + p(a) + ' &divide; ' + p(b) + '</b>.<br>' +
              'La division usa EXACTAMENTE la misma regla de signos que la multiplicacion.',
            pasos: [
              {
                seccion: 'Paso 1: el signo',
                queHacemos: 'Decidimos el signo antes de dividir.',
                paraQue: 'La regla de los signos es la misma para multiplicar y para dividir, asi que se resuelve de una vez.',
                queda: (val > 0 ? '+' : '&minus;') + ' (falta el numero)',
                pregunta: 'Signos ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + '.<br>&iquest;De que signo sale el resultado?',
                resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
                pista: 'Iguales dan positivo, distintos dan negativo.',
                despues: 'Ya esta el signo. Ahora el numero.'
              },
              {
                seccion: 'Paso 2: el numero',
                queHacemos: 'Dividimos los valores absolutos, sin preocuparnos del signo.',
                paraQue: 'Porque el signo ya quedo decidido: aqui solo falta la cuenta.',
                queda: (val > 0 ? '' : '&minus;') + Math.abs(q),
                pregunta: 'Divide sin signos: &iquest;cuanto es ' + Math.abs(a) + ' &divide; ' + Math.abs(b) + '?',
                resp: R.numero(Math.abs(q), { dec: 0 }),
                pista: 'Piensa: ' + Math.abs(b) + ' por cuanto da ' + Math.abs(a) + '.',
                despues: ''
              },
              {
                seccion: 'Paso 3: juntar',
                queHacemos: 'Pegamos el signo al numero.',
                paraQue: 'Para dar la respuesta completa.',
                queda: String(val),
                pregunta: 'Junta el signo con el numero y escribe el resultado.',
                resp: R.numero(val, { dec: 0 }),
                pista: 'Es ' + Math.abs(q) + ' con signo ' + (val < 0 ? 'negativo' : 'positivo') + '.',
                despues: ''
              }
            ],
            final: p(a) + ' &divide; ' + p(b) + ' = <b>' + val + '</b>',
            receta: ['El signo se decide igual que en la multiplicacion',
              'Dividir los numeros sin signo',
              'Juntar ambos']
          });
          enun = 'Calcula: ' + p(a) + ' &divide; ' + p(b);
          pistas = [
            'La division sigue la misma regla de signos que la multiplicacion.',
            Math.abs(a) + ' &divide; ' + Math.abs(b) + ' = ' + Math.abs(q) + '. Falta el signo.'
          ];
          sol = [
            'Signos ' + (a < 0 ? '&minus;' : '+') + ' y ' + (b < 0 ? '&minus;' : '+') + ' dan ' + (val < 0 ? 'negativo' : 'positivo') + '.',
            'Resultado: <b>' + val + '</b>'
          ];
        }
      } else if (dif === 'medio') {
        var tipo2 = r.subtema([
          ['triple', 'Varios factores'],
          ['mixta', 'Jerarquia de operaciones'],
          ['cocienteProd', 'Producto entre division'],
          ['potenciaSigno', 'Potencias de negativos']
        ]);
        if (extra[tipo2]) return extra[tipo2](r, dif);
        if (tipo2 === 'triple') {
          a = r.enteroNoCero(-8, 8); b = r.enteroNoCero(-8, 8); c = r.enteroNoCero(-6, 6);
          val = a * b * c;
          var negs = [a, b, c].filter(function (x) { return x < 0; }).length;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + p(a) + ' &middot; ' + p(b) + ' &middot; ' + p(c) + '</b>.<br>' +
              'Con varios factores hay un truco: no hace falta ir de dos en dos para el signo, basta CONTAR los negativos.',
            pasos: [
              { seccion: 'Paso 1: contar los negativos',
                queHacemos: 'Contamos cuantos factores negativos hay, sin multiplicar nada todavia.',
                paraQue: 'Porque cada menos voltea el signo. Con un numero par de menos se cancelan entre si; con impar, sobra uno.',
                queda: negs + ' negativo(s)',
                pregunta: '&iquest;Cuantos factores negativos hay?', resp: R.numero(negs, { dec: 0 }),
                pista: 'Revisa uno por uno: ' + p(a) + ', ' + p(b) + ', ' + p(c) + '.',
                despues: 'Son ' + negs + '. Ahora: par o impar decide el signo.' },
              { seccion: 'Paso 1: contar los negativos',
                queHacemos: 'Contamos cuantos factores negativos hay, sin multiplicar nada todavia.',
                paraQue: 'Porque cada menos voltea el signo. Con un numero par de menos se cancelan entre si; con impar, sobra uno.',
                queda: (val > 0 ? '+' : '&minus;') + ' (falta el numero)',
                pregunta: 'Con ' + negs + ' negativo(s), &iquest;de que signo sale el resultado?',
                resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
                pista: 'Cantidad PAR de negativos da positivo; cantidad IMPAR da negativo.',
                despues: negs % 2 === 0 ? 'Par: se cancelan de dos en dos.' : 'Impar: queda uno suelto.' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Multiplicamos los tres valores absolutos, de dos en dos.',
                paraQue: 'El signo ya esta resuelto, asi que aqui solo se trata de la cuenta.',
                queda: (val > 0 ? '' : '&minus;') + Math.abs(val),
                pregunta: 'Multiplica los tres numeros sin signo: ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' &middot; ' + Math.abs(c),
                resp: R.numero(Math.abs(val), { dec: 0 }), pista: 'De dos en dos: primero ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' = ' + (Math.abs(a) * Math.abs(b)) + '.', despues: '' },
              { seccion: 'Paso 3: juntar',
                queHacemos: 'Pegamos el signo al numero.',
                paraQue: 'Para dar la respuesta completa.',
                queda: String(val),
                pregunta: 'Escribe el resultado con su signo.', resp: R.numero(val, { dec: 0 }),
                pista: 'Es ' + Math.abs(val) + ' con signo ' + (val < 0 ? 'negativo' : 'positivo') + '.', despues: '' }
            ],
            final: p(a) + ' &middot; ' + p(b) + ' &middot; ' + p(c) + ' = <b>' + val + '</b>',
            receta: ['Contar cuantos factores negativos hay',
              'Par de negativos = positivo; impar = negativo',
              'Multiplicar los numeros sin signo',
              'Juntar signo y numero']
          });
          enun = 'Calcula: ' + p(a) + ' &middot; ' + p(b) + ' &middot; ' + p(c);
          pistas = [
            'Cuenta cuantos factores negativos hay: si son pares el resultado es positivo, si son impares es negativo.',
            'Hay ' + negs + ' factor(es) negativo(s), asi que el signo es ' + (negs % 2 === 0 ? 'positivo' : 'negativo') + '.'
          ];
          sol = [
            'Producto de los valores absolutos: ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + ' &middot; ' + Math.abs(c) + ' = ' + Math.abs(val),
            negs + ' negativos &rarr; signo ' + (negs % 2 === 0 ? 'positivo' : 'negativo'),
            'Resultado: <b>' + val + '</b>'
          ];
        } else if (tipo2 === 'mixta') {
          a = r.enteroNoCero(-15, 15); b = r.enteroNoCero(-10, 10); c = r.enteroNoCero(-9, 9); d = r.enteroNoCero(-6, 6);
          val = a - b + c * d;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + a + ' &minus; ' + p(b) + ' + ' + p(c) + ' &middot; ' + p(d) + '</b>.<br>' +
              'Aqui hay mezcla de operaciones, asi que manda la JERARQUIA: primero multiplicar, luego sumar y restar.',
            pasos: [
              { seccion: 'Paso 1: decidir el orden',
                queHacemos: 'Miramos la expresion completa y decidimos por donde empezar.',
                paraQue: 'Porque multiplicar y dividir van ANTES que sumar y restar, aunque esten escritas al final.',
                queda: 'primero ' + p(c) + ' &middot; ' + p(d),
                pregunta: '&iquest;Que operacion se hace PRIMERO?',
                resp: R.opcion(['La multiplicacion ' + p(c) + ' &middot; ' + p(d), 'La resta, porque esta antes'], 0),
                pista: 'No se lee de izquierda a derecha: multiplicar y dividir van antes que sumar y restar.',
                despues: 'Exacto, aunque este al final, la multiplicacion va primero.' },
              { seccion: 'Paso 2: la multiplicacion',
                queHacemos: 'Resolvemos la multiplicacion que tiene prioridad.',
                paraQue: 'Para dejar la expresion con puras sumas y restas, que ya se hacen en orden.',
                queda: a + ' &minus; ' + p(b) + ' + ' + p(c * d),
                pregunta: 'Resuelve esa multiplicacion: ' + p(c) + ' &middot; ' + p(d),
                resp: R.numero(c * d, { dec: 0 }), pista: 'Regla de los signos: ' + (c < 0 ? '&minus;' : '+') + ' por ' + (d < 0 ? '&minus;' : '+') + '.',
                despues: 'Ahora la cuenta queda ' + a + ' &minus; ' + p(b) + ' + ' + p(c * d) + '.' },
              { seccion: 'Paso 3: sumas y restas',
                queHacemos: 'Ya sin multiplicaciones, operamos de izquierda a derecha.',
                paraQue: 'Porque suma y resta tienen la misma prioridad: manda el orden en que aparecen.',
                queda: (a - b) + ' + ' + p(c * d),
                pregunta: 'Ahora si, de izquierda a derecha: &iquest;cuanto es ' + a + ' &minus; ' + p(b) + '?',
                resp: R.numero(a - b, { dec: 0 }), pista: b < 0 ? 'Restar un negativo es sumar.' : 'Resta normal.', despues: '' },
              { seccion: 'Paso 3: sumas y restas',
                queHacemos: 'La ultima cuenta.',
                paraQue: 'Para llegar al resultado.',
                queda: String(val),
                pregunta: 'Ultimo: ' + (a - b) + ' + ' + p(c * d), resp: R.numero(val, { dec: 0 }),
                pista: 'Suma con signo.', despues: '' }
            ],
            final: a + ' &minus; ' + p(b) + ' + ' + p(c) + ' &middot; ' + p(d) + ' = <b>' + val + '</b>',
            receta: ['Primero multiplicaciones y divisiones',
              'Despues sumas y restas, de izquierda a derecha',
              'Cuidado con los signos en cada paso']
          });
          enun = 'Calcula: ' + a + ' &minus; ' + p(b) + ' + ' + p(c) + ' &middot; ' + p(d);
          pistas = [
            'Primero la multiplicacion, despues las sumas y restas (jerarquia de operaciones).',
            p(c) + ' &middot; ' + p(d) + ' = ' + (c * d) + '.'
          ];
          sol = [
            'Multiplico primero: ' + p(c) + ' &middot; ' + p(d) + ' = ' + (c * d),
            'Queda ' + a + ' &minus; ' + p(b) + ' + ' + p(c * d) + ' = ' + (a - b) + ' + ' + p(c * d),
            'Resultado: <b>' + val + '</b>'
          ];
        } else {
          c = r.enteroNoCero(-6, 6);
          a = r.enteroNoCero(-9, 9); b = r.enteroNoCero(-9, 9);
          var prod = a * b;
          var den = r.elige([c, -c]);
          while (prod % den !== 0) { b = r.enteroNoCero(-9, 9); prod = a * b; }
          val = prod / den;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac(p(a) + ' &middot; ' + p(b), p(den)) + '</b>.<br>' +
              'Una fraccion es una division: primero se resuelve todo lo de arriba y luego se divide.',
            pasos: [
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Resolvemos primero toda la parte de arriba.',
                paraQue: 'La raya de fraccion agrupa: es como si arriba hubiera un parentesis invisible. Hay que resolverlo antes de dividir.',
                queda: F.frac(p(prod), p(den)),
                pregunta: 'Empieza por el numerador: &iquest;cuanto es ' + p(a) + ' &middot; ' + p(b) + '?',
                resp: R.numero(prod, { dec: 0 }), pista: 'Signo primero, luego los numeros.',
                despues: 'Arriba queda ' + prod + '.' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Decidimos el signo del cociente antes de hacer la cuenta.',
                paraQue: 'La regla de los signos es la misma al dividir que al multiplicar.',
                queda: (val > 0 ? '+' : '&minus;') + ' (falta el numero)',
                pregunta: 'Ahora divide: ' + p(prod) + ' &divide; ' + p(den) + '<br>&iquest;De que signo sale?',
                resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
                pista: 'Misma regla de siempre.', despues: '' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Hacemos la division y le pegamos el signo.',
                paraQue: 'Para dar la respuesta completa.',
                queda: String(val),
                pregunta: 'Escribe el resultado de la division, con su signo.',
                resp: R.numero(val, { dec: 0 }), pista: Math.abs(prod) + ' &divide; ' + Math.abs(den) + ' = ' + Math.abs(val) + '.', despues: '' }
            ],
            final: F.frac(p(a) + ' &middot; ' + p(b), p(den)) + ' = <b>' + val + '</b>',
            receta: ['Resolver primero el numerador completo',
              'Despues dividir',
              'La regla de signos se aplica en cada operacion']
          });
          enun = 'Calcula: ' + F.frac(p(a) + ' &middot; ' + p(b), p(den));
          pistas = [
            'Resuelve primero el numerador con la regla de los signos.',
            'Numerador: ' + p(a) + ' &middot; ' + p(b) + ' = ' + prod + '.'
          ];
          sol = [
            'Numerador: ' + p(a) + ' &middot; ' + p(b) + ' = ' + prod,
            prod + ' &divide; ' + p(den) + ' = ' + val,
            'Resultado: <b>' + val + '</b>'
          ];
        }
      } else {
        var tipo3 = r.subtema([
          ['anidado', 'Parentesis anidados'],
          ['potencias', 'Potencias y division'],
          ['fraccionesSigno', 'Fracciones con signo']
        ]);
        if (extra[tipo3]) return extra[tipo3](r, dif);
        if (tipo3 === 'potencias') {
          a = r.enteroNoCero(-4, -2); b = r.enteroNoCero(2, 4);
          var n = r.entero(2, 3), m = r.entero(2, 3);
          c = r.elige([-2, -3, 2, 3]);
          var num = Math.pow(a, n) * Math.pow(-b, m);
          val = num / c;
          var i = 0;
          while (Math.abs(val - Math.round(val)) > 1e-9 && i < 30) {
            c = r.elige([-2, -3, 2, 3, -4, 4]);
            val = num / c; i++;
          }
          if (Math.abs(val - Math.round(val)) > 1e-9) { c = 1; val = num; }
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac('(' + a + ')' + F.sup(n) + ' &middot; (' + (-b) + ')' + F.sup(m), p(c)) + '</b>.<br>' +
              'Se resuelve por pedazos: cada potencia por separado, luego el producto, y al final la division.',
            pasos: [
              { seccion: 'Paso 1: las potencias',
                queHacemos: 'Calculamos la primera potencia, con todo y signo.',
                paraQue: 'Las potencias van antes que la multiplicacion y la division: son lo primero de la jerarquia.',
                queda: F.frac(p(Math.pow(a, n)) + ' &middot; (' + (-b) + ')' + F.sup(m), p(c)),
                pregunta: '&iquest;Cuanto vale (' + a + ')' + F.sup(n) + '?',
                resp: R.numero(Math.pow(a, n), { dec: 0 }),
                pista: 'Base negativa con exponente ' + (n % 2 === 0 ? 'PAR: sale positivo' : 'IMPAR: sale negativo') + '. El numero es ' + Math.pow(Math.abs(a), n) + '.',
                despues: '' },
              { seccion: 'Paso 1: las potencias',
                queHacemos: 'Ahora la segunda potencia.',
                paraQue: 'Base negativa: con exponente par sale positivo y con impar, negativo.',
                queda: F.frac(p(Math.pow(a, n)) + ' &middot; ' + p(Math.pow(-b, m)), p(c)),
                pregunta: '&iquest;Y (' + (-b) + ')' + F.sup(m) + '?',
                resp: R.numero(Math.pow(-b, m), { dec: 0 }),
                pista: 'Exponente ' + (m % 2 === 0 ? 'par: positivo' : 'impar: negativo') + '.',
                despues: 'Ya tenemos las dos potencias.' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Multiplicamos las dos potencias que acabamos de calcular.',
                paraQue: 'Para resolver todo el numerador antes de dividir.',
                queda: F.frac(p(num), p(c)),
                pregunta: 'Multiplicalas: ' + p(Math.pow(a, n)) + ' &middot; ' + p(Math.pow(-b, m)),
                resp: R.numero(num, { dec: 0 }), pista: 'Regla de signos otra vez.',
                despues: 'Ese es el numerador completo.' },
              { seccion: 'Paso 3: dividir',
                queHacemos: 'Dividimos el numerador entre el denominador.',
                paraQue: 'Para llegar al resultado.',
                queda: String(val),
                pregunta: 'Por ultimo divide: ' + p(num) + ' &divide; ' + p(c),
                resp: R.numero(val, { dec: 0 }), pista: 'Signo y luego numeros.', despues: '' }
            ],
            final: 'El resultado es <b>' + val + '</b>',
            receta: ['Resolver cada potencia por separado (ojo con par/impar)',
              'Multiplicar los resultados',
              'Dividir al final']
          });
          enun = 'Calcula: ' + F.frac('(' + a + ')' + F.sup(n) + ' &middot; (' + (-b) + ')' + F.sup(m), p(c));
          pistas = [
            'Una base negativa elevada a exponente par da positivo; a exponente impar, negativo.',
            '(' + a + ')' + F.sup(n) + ' = ' + Math.pow(a, n) + ' y (' + (-b) + ')' + F.sup(m) + ' = ' + Math.pow(-b, m) + '.'
          ];
          sol = [
            '(' + a + ')' + F.sup(n) + ' = ' + Math.pow(a, n) + ' (exponente ' + (n % 2 === 0 ? 'par' : 'impar') + ')',
            '(' + (-b) + ')' + F.sup(m) + ' = ' + Math.pow(-b, m) + ' (exponente ' + (m % 2 === 0 ? 'par' : 'impar') + ')',
            'Numerador: ' + Math.pow(a, n) + ' &middot; ' + Math.pow(-b, m) + ' = ' + num,
            num + ' &divide; ' + p(c) + ' = <b>' + val + '</b>'
          ];
        } else {
          a = r.enteroNoCero(-12, 12); b = r.enteroNoCero(-9, 9);
          c = r.enteroNoCero(-9, 9); d = r.enteroNoCero(-5, 5);
          var e = r.enteroNoCero(-5, 5);
          var dentro = b - c;
          var corchete = a - dentro;
          val = -corchete + d * e;
          guiaDelPaso = G({
            intro: 'Vamos con <b>&minus;[ ' + a + ' &minus; ( ' + b + ' &minus; ' + p(c) + ' ) ] + ' + p(d) + ' &middot; ' + p(e) + '</b>.<br>' +
              'Con parentesis dentro de corchetes se trabaja de ADENTRO hacia afuera.',
            pasos: [
              { seccion: 'Paso 1: de adentro hacia afuera',
                queHacemos: 'Resolvemos el parentesis que esta mas adentro de todos.',
                paraQue: 'Con parentesis dentro de corchetes siempre se va de adentro hacia afuera. Al reves te enredas seguro.',
                queda: '&minus;[ ' + a + ' &minus; ' + p(dentro) + ' ] + ' + p(d) + ' &middot; ' + p(e),
                pregunta: 'Empieza por el parentesis mas interno: &iquest;cuanto es ' + b + ' &minus; ' + p(c) + '?',
                resp: R.numero(dentro, { dec: 0 }),
                pista: c < 0 ? 'Restar un negativo es sumar.' : 'Resta normal.',
                despues: 'Ahora el corchete queda [ ' + a + ' &minus; ' + p(dentro) + ' ].' },
              { seccion: 'Paso 2: el corchete',
                queHacemos: 'Ahora si, resolvemos el corchete completo.',
                paraQue: 'Para quedarnos con un solo numero donde antes habia toda una expresion.',
                queda: '&minus;(' + corchete + ') + ' + p(d) + ' &middot; ' + p(e),
                pregunta: 'Resuelve el corchete: ' + a + ' &minus; ' + p(dentro),
                resp: R.numero(corchete, { dec: 0 }), pista: dentro < 0 ? 'Otra vez: menos por menos, suma.' : 'Resta normal.',
                despues: 'Pero cuidado: afuera del corchete hay un signo menos.' },
              { seccion: 'Paso 3: el menos de afuera',
                queHacemos: 'Aplicamos el signo menos que estaba pegado al corchete.',
                paraQue: 'Ese menos multiplica a TODO lo de adentro. Es el descuido mas comun de todo el tema.',
                queda: (-corchete) + ' + ' + p(d) + ' &middot; ' + p(e),
                pregunta: 'Ese menos de afuera cambia el signo de todo el corchete.<br>&iquest;En que se convierte &minus;(' + corchete + ')?',
                resp: R.numero(-corchete, { dec: 0 }), pista: 'Solo cambia de signo.', despues: '' },
              { seccion: 'Paso 4: la multiplicacion',
                queHacemos: 'Resolvemos la multiplicacion que quedaba pendiente.',
                paraQue: 'Multiplicar va antes que sumar, asi que se resuelve antes de juntar las dos partes.',
                queda: (-corchete) + ' + ' + p(d * e),
                pregunta: 'Ahora la otra parte: ' + p(d) + ' &middot; ' + p(e),
                resp: R.numero(d * e, { dec: 0 }), pista: 'Regla de signos.', despues: '' },
              { seccion: 'Paso 5: sumar',
                queHacemos: 'Sumamos los dos numeros que quedaron.',
                paraQue: 'Para llegar al resultado.',
                queda: String(val),
                pregunta: 'Suma las dos partes: ' + (-corchete) + ' + ' + p(d * e),
                resp: R.numero(val, { dec: 0 }), pista: 'Suma con signo.', despues: '' }
            ],
            final: 'El resultado es <b>' + val + '</b>',
            receta: ['De adentro hacia afuera: primero el parentesis, luego el corchete',
              'Un menos delante de un corchete cambia el signo de TODO lo de adentro',
              'Las multiplicaciones se resuelven aparte',
              'Al final se suma todo']
          });
          enun = 'Calcula: &minus;[ ' + a + ' &minus; ( ' + b + ' &minus; ' + p(c) + ' ) ] + ' + p(d) + ' &middot; ' + p(e);
          pistas = [
            'Empieza por el parentesis mas interno y ve saliendo.',
            '( ' + b + ' &minus; ' + p(c) + ' ) = ' + dentro + ', asi que el corchete queda [ ' + a + ' &minus; ' + p(dentro) + ' ].'
          ];
          sol = [
            'Parentesis interno: ' + b + ' &minus; ' + p(c) + ' = ' + dentro,
            'Corchete: ' + a + ' &minus; ' + p(dentro) + ' = ' + corchete,
            'El signo menos de fuera cambia el corchete: &minus;(' + corchete + ') = ' + (-corchete),
            'Producto: ' + p(d) + ' &middot; ' + p(e) + ' = ' + (d * e),
            'Suma final: ' + (-corchete) + ' + ' + p(d * e) + ' = <b>' + val + '</b>'
          ];
        }
      }

      return {
        guia: guiaDelPaso,
        enunciado: enun,
        respuesta: R.numero(val, { dec: 0 }),
        pistas: pistas,
        solucion: sol
      };
    }
  });
})();
