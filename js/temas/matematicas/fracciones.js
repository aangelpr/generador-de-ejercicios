/* Reglas para fracciones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function fr(a, b) { return a < 0 ? '-' + F.frac(-a, b) : F.frac(a, b); }

  var G = EJ.guia.armar;

  var extra = {};

  extra.simplificar = function (r) {
    var k = r.entero(2, 12);
    var a = r.entero(1, 11), b = r.entero(2, 12);
    while (F.mcd(a, b) !== 1) { a = r.entero(1, 11); b = r.entero(2, 12); }
    var num = a * k, den = b * k;
    return {
      guia: G({
        intro: 'Hay que simplificar <b>' + F.frac(num, den) + '</b>.<br>' +
          'Simplificar es escribir la MISMA cantidad con numeros mas chicos. Se logra dividiendo arriba y abajo entre el mismo numero.',
        pasos: [
          { seccion: 'Paso 1: buscar el divisor comun',
            queHacemos: 'Buscamos el numero mas grande que divide exacto al de arriba Y al de abajo.',
            paraQue: 'Simplificar es quitarle a la fraccion los factores que le sobran, sin cambiar su valor.',
            queda: F.frac('?', '?'),
            pregunta: 'Busca un numero que divida exacto TANTO al ' + num + ' como al ' + den + '.<br>&iquest;Cual es el mas grande que puedes?',
            resp: R.numero(k, { dec: 0 }),
            pista: 'Se llama maximo comun divisor. Prueba con los factores de ' + num + ': si divides ' + num + ' entre el, tiene que dar exacto, y con ' + den + ' tambien.',
            despues: 'Ese ' + k + ' es el m.c.d. Ahora se divide arriba y abajo entre el.' },
          { seccion: 'Paso 2: dividir los dos',
            queHacemos: 'Dividimos el numerador entre ese numero.',
            paraQue: 'Hay que dividir arriba Y abajo entre lo mismo. Si solo divides uno, la fraccion cambia de valor.',
            queda: F.frac(a, '?'),
            pregunta: 'Divide el numerador: &iquest;cuanto es ' + num + ' &divide; ' + k + '?',
            resp: R.numero(a, { dec: 0 }), pista: 'Division exacta, sin decimales.', despues: '' },
          { seccion: 'Paso 2: dividir los dos',
            queHacemos: 'Ahora el denominador, entre el mismo numero.',
            paraQue: 'Para que la fraccion siga valiendo lo mismo.',
            queda: F.frac(a, b),
            pregunta: 'Y el denominador: ' + den + ' &divide; ' + k,
            resp: R.numero(b, { dec: 0 }), pista: 'Tambien exacta.',
            despues: 'Ojo: se divide ARRIBA Y ABAJO entre lo mismo, por eso la fraccion no cambia de valor.' },
          { seccion: 'Paso 3: escribir',
            queHacemos: 'Escribimos la fraccion que quedo.',
            paraQue: 'Ya no se puede simplificar mas: esta en su forma minima.',
            queda: F.frac(a, b),
            pregunta: 'Escribe la fraccion ya simplificada.',
            resp: R.fraccion(a, b), pista: 'Es ' + a + ' entre ' + b + '.', despues: '' }
        ],
        final: F.frac(num, den) + ' = <b>' + F.frac(a, b) + '</b> (vale lo mismo, solo que con numeros mas chicos)',
        receta: ['Buscar el numero mas grande que divida a los dos',
          'Dividir arriba y abajo entre el',
          'Si ya nada los divide, la fraccion esta en su minima expresion']
      }),
      enunciado: 'Simplifica hasta su minima expresion: ' + F.frac(num, den),
      respuesta: R.fraccion(a, b),
      pistas: ['Busca el maximo comun divisor del numerador y el denominador.',
        'El m.c.d. de ' + num + ' y ' + den + ' es ' + k + '.'],
      solucion: ['m.c.d.(' + num + ', ' + den + ') = ' + k,
        'Divido arriba y abajo entre ' + k,
        'Resultado: <b>' + F.frac(a, b) + '</b>']
    };
  };

  extra.comparar = function (r) {
    var a = r.entero(1, 9), b = r.entero(2, 12), c = r.entero(1, 9), d = r.entero(2, 12);
    while (a * d === b * c) { c = r.entero(1, 9); d = r.entero(2, 12); }
    var primeraMayor = a * d > b * c;
    return {
      guia: G({
        intro: 'Hay que decidir cual es mayor: <b>' + F.frac(a, b) + '</b> o <b>' + F.frac(c, d) + '</b>.<br>' +
          'Como tienen denominadores distintos no se pueden comparar de golpe. El truco mas rapido es el producto cruzado.',
        pasos: [
          { seccion: 'Paso 1: multiplicar en cruz',
            queHacemos: 'Multiplicamos en cruz para comparar sin tener que buscar denominador comun.',
            paraQue: 'Comparar fracciones a ojo enga&ntilde;a: 3/5 parece mas chico que 5/9 y no lo es. El producto cruzado lo resuelve seguro.',
            queda: (a * d) + ' contra ?',
            pregunta: 'Multiplica en cruz empezando por la primera: numerador de la izquierda por denominador de la derecha.<br>&iquest;Cuanto es ' + a + ' &middot; ' + d + '?',
            resp: R.numero(a * d, { dec: 0 }),
            pista: 'Sube desde el ' + a + ' y cruza hacia el ' + d + '.',
            despues: 'Ese numero representa a la fraccion de la IZQUIERDA.' },
          { seccion: 'Paso 1: multiplicar en cruz',
            queHacemos: 'Ahora la otra diagonal.',
            paraQue: 'Para tener los dos numeros que se van a comparar.',
            queda: (a * d) + ' contra ' + (b * c),
            pregunta: 'Ahora al reves: ' + c + ' &middot; ' + b,
            resp: R.numero(b * c, { dec: 0 }),
            pista: 'Numerador de la derecha por denominador de la izquierda.',
            despues: 'Y ese representa a la de la DERECHA.' },
          { seccion: 'Paso 2: comparar',
            queHacemos: 'Gana la fraccion cuyo numerador participo en el producto mayor.',
            paraQue: 'Porque al multiplicar en cruz es como si las hubieras puesto con el mismo denominador, pero sin el trabajo.',
            queda: primeraMayor ? fr(a, b) + ' es mayor' : fr(c, d) + ' es mayor',
            pregunta: 'Compara los dos resultados: ' + (a * d) + ' y ' + (b * c) + '.<br>&iquest;Cual fraccion es mayor?',
            resp: R.opcion([F.frac(a, b), F.frac(c, d)], primeraMayor ? 0 : 1),
            pista: 'Gana la fraccion del producto mas grande. Funciona porque es como ponerles el mismo denominador (' + b + ' &middot; ' + d + ') sin escribirlo.',
            despues: '' }
        ],
        final: 'La mayor es <b>' + (primeraMayor ? F.frac(a, b) : F.frac(c, d)) + '</b> (en decimales: ' + F.n(a / b, 3) + ' contra ' + F.n(c / d, 3) + ')',
        receta: ['Multiplicar en cruz',
          'El producto mas grande indica la fraccion mas grande',
          'Es lo mismo que igualar denominadores, pero mas rapido']
      }),
      enunciado: '&iquest;Cual fraccion es mayor?<br><span class="big">' + F.frac(a, b) + ' &nbsp; o &nbsp; ' + F.frac(c, d) + '</span>',
      respuesta: R.opcion([F.frac(a, b), F.frac(c, d)], primeraMayor ? 0 : 1),
      pistas: ['Puedes igualar denominadores, o comparar los productos cruzados.',
        'Producto cruzado: ' + a + '&middot;' + d + ' = ' + (a * d) + ' contra ' + c + '&middot;' + b + ' = ' + (b * c) + '.'],
      solucion: ['Comparo productos cruzados: ' + (a * d) + ' contra ' + (b * c),
        'Como ' + (a * d) + (primeraMayor ? ' &gt; ' : ' &lt; ') + (b * c) + ', la mayor es <b>' + (primeraMayor ? F.frac(a, b) : F.frac(c, d)) + '</b>',
        'En decimales: ' + F.n(a / b, 4) + ' y ' + F.n(c / d, 4)]
    };
  };

  extra.mixtas = function (r) {
    var e1 = r.entero(1, 6), n1 = r.entero(1, 5), d1 = r.entero(n1 + 1, 9);
    var e2 = r.entero(1, 6), n2 = r.entero(1, 5), d2 = r.entero(n2 + 1, 9);
    var i1 = e1 * d1 + n1, i2 = e2 * d2 + n2;
    var m = F.mcm(d1, d2);
    var num = i1 * (m / d1) + i2 * (m / d2);
    var s = F.simplifica(num, m);
    return {
      guia: G({
        intro: 'Vamos a sumar <b>' + e1 + ' ' + F.frac(n1, d1) + ' + ' + e2 + ' ' + F.frac(n2, d2) + '</b>.<br>' +
          'Un numero mixto (entero + fraccion) no se puede sumar asi nada mas: primero se convierte todo a una sola fraccion.',
        pasos: [
          { seccion: 'Paso 1: mixto a impropia',
            queHacemos: 'Convertimos el primer numero mixto a una sola fraccion.',
            paraQue: 'Un mixto son dos cosas pegadas (un entero y una fraccion) y asi no se puede operar. Hay que volverlo una sola fraccion.',
            queda: F.frac(i1, d1) + ' + ' + e2 + ' ' + F.frac(n2, d2),
            pregunta: 'Convierte ' + e1 + ' ' + F.frac(n1, d1) + ' a fraccion impropia.<br>La regla: entero &times; denominador + numerador.<br>&iquest;Cuanto da ' + e1 + ' &middot; ' + d1 + ' + ' + n1 + '?',
            resp: R.numero(i1, { dec: 0 }),
            pista: 'El entero ' + e1 + ' son ' + (e1 * d1) + ' pedacitos de ' + F.frac(1, d1) + ', mas los ' + n1 + ' que ya tenias.',
            despues: 'Entonces ' + e1 + ' ' + F.frac(n1, d1) + ' = ' + F.frac(i1, d1) + '. El denominador NO cambia.' },
          { seccion: 'Paso 1: mixto a impropia',
            queHacemos: 'Lo mismo con el segundo.',
            paraQue: 'Para tener dos fracciones normales que si se puedan sumar.',
            queda: F.frac(i1, d1) + ' + ' + F.frac(i2, d2),
            pregunta: 'Ahora el otro: ' + e2 + ' &middot; ' + d2 + ' + ' + n2,
            resp: R.numero(i2, { dec: 0 }), pista: 'Mismo procedimiento.',
            despues: 'Queda ' + F.frac(i2, d2) + '. Ya son dos fracciones normales.' },
          { seccion: 'Paso 2: denominador comun',
            queHacemos: 'Buscamos el m.c.m. de los dos denominadores.',
            paraQue: 'Para poder sumar hay que cortar los dos pasteles en trozos del mismo tamano.',
            queda: F.frac('?', m) + ' + ' + F.frac('?', m),
            pregunta: 'Para sumarlas necesitan el mismo denominador.<br>&iquest;Cual es el m.c.m. de ' + d1 + ' y ' + d2 + '?',
            resp: R.numero(m, { dec: 0 }), pista: 'El numero mas chico donde caben exactos los dos.', despues: '' },
          { seccion: 'Paso 3: sumar',
            queHacemos: 'Convertimos las dos y sumamos solo los numeradores.',
            paraQue: 'El denominador ya es el mismo: no se toca.',
            queda: F.frac(num, m),
            pregunta: 'Convierte y suma los numeradores.<br>&iquest;Cuanto queda arriba, con denominador ' + m + '?',
            resp: R.numero(num, { dec: 0 }),
            pista: F.frac(i1, d1) + ' = ' + F.frac(i1 * (m / d1), m) + ' y ' + F.frac(i2, d2) + ' = ' + F.frac(i2 * (m / d2), m) + '.',
            despues: 'Vamos en ' + F.frac(num, m) + '.' },
          { seccion: 'Paso 4: simplificar',
            queHacemos: 'Simplificamos el resultado.',
            paraQue: 'Para dejarlo en su forma minima.',
            queda: F.fracSimp(num, m),
            pregunta: 'Escribe el resultado ya simplificado.',
            resp: R.fraccion(s[0], s[1]),
            pista: F.mcd(num, m) === 1 ? 'Revisa si algo divide a los dos; si no, ya esta.' : 'Los dos se dividen entre ' + F.mcd(num, m) + '.',
            despues: '' }
        ],
        final: 'Resultado: <b>' + F.fracSimp(num, m) + '</b>',
        receta: ['Mixto a impropia: entero x denominador + numerador',
          'El denominador no cambia en esa conversion',
          'Ya con fracciones normales: m.c.m. y sumar',
          'Simplificar al final']
      }),
      enunciado: 'Suma estos numeros mixtos y da el resultado como fraccion impropia simplificada:<br>' +
        '<span class="big">' + e1 + ' ' + F.frac(n1, d1) + ' + ' + e2 + ' ' + F.frac(n2, d2) + '</span>',
      respuesta: R.fraccion(s[0], s[1]),
      pistas: ['Primero convierte cada mixto a fraccion impropia: entero &times; denominador + numerador.',
        e1 + ' ' + F.frac(n1, d1) + ' = ' + F.frac(i1, d1) + ' y ' + e2 + ' ' + F.frac(n2, d2) + ' = ' + F.frac(i2, d2) + '.'],
      solucion: ['Convierto a impropias: ' + F.frac(i1, d1) + ' y ' + F.frac(i2, d2),
        'm.c.m.(' + d1 + ', ' + d2 + ') = ' + m,
        'Sumo: ' + F.frac(num, m),
        'Simplifico: <b>' + F.fracSimp(num, m) + '</b>']
    };
  };

  extra.deCantidad = function (r) {
    var b = r.elige([2, 3, 4, 5, 6, 8]);
    var a = r.entero(1, b - 1);
    var k = r.entero(2, 20) * b;
    return {
      guia: G({
        intro: 'Queremos <b>' + F.frac(a, b) + ' de ' + k + '</b>.<br>' +
          'La palabra "de" en matematicas significa multiplicar. Pero es mas facil pensarlo en dos pasos: primero partir, luego tomar.',
        pasos: [
          { seccion: 'Paso 1: partir',
            queHacemos: 'Dividimos la cantidad entre el denominador.',
            paraQue: 'El denominador dice en cuantos pedazos iguales se corta el total. Asi sabemos cuanto vale UN pedazo.',
            queda: 'cada parte vale ' + (k / b),
            pregunta: 'El denominador ' + b + ' dice en cuantas partes iguales se parte el ' + k + '.<br>&iquest;Cuanto vale cada parte?',
            resp: R.numero(k / b, { dec: 4, tol: 0.001 }),
            pista: 'Divide ' + k + ' entre ' + b + '.',
            despues: 'Cada una de las ' + b + ' partes vale ' + F.n(k / b, 4) + '.' },
          { seccion: 'Paso 2: tomar',
            queHacemos: 'Multiplicamos el valor de una parte por cuantas queremos.',
            paraQue: 'El numerador dice cuantos de esos pedazos se toman.',
            queda: String(a * (k / b)),
            pregunta: 'El numerador ' + a + ' dice cuantas de esas partes tomamos.<br>&iquest;Cuanto es ' + F.n(k / b, 4) + ' &middot; ' + a + '?',
            resp: R.numero(a * k / b, { dec: 4, tol: 0.001 }),
            pista: 'Multiplica lo que vale una parte por ' + a + '.',
            despues: '' }
        ],
        final: F.frac(a, b) + ' de ' + k + ' es <b>' + F.n(a * k / b, 4) + '</b>',
        receta: ['"De" significa multiplicar',
          'Dividir entre el denominador: cuanto vale una parte',
          'Multiplicar por el numerador: cuantas partes se toman']
      }),
      enunciado: '&iquest;Cuanto es ' + F.frac(a, b) + ' de ' + k + '?',
      respuesta: R.numero(a * k / b, { dec: 4 }),
      pistas: ['"De" significa multiplicar: ' + F.frac(a, b) + ' &middot; ' + k + '.',
        'Divide ' + k + ' entre ' + b + ' y multiplica por ' + a + '.'],
      solucion: [k + ' &divide; ' + b + ' = ' + (k / b),
        (k / b) + ' &middot; ' + a + ' = ' + (a * k / b),
        'Resultado: <b>' + F.n(a * k / b, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'fracciones',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Reglas para fracciones',
    descripcion: 'Suma, resta, multiplicacion, division y simplificacion de fracciones.',
    formulario: 'a/b + c/d = (ad + bc)/bd &nbsp;&middot;&nbsp; (a/b)(c/d) = ac/bd &nbsp;&middot;&nbsp; (a/b) &divide; (c/d) = (a/b)(d/c) = ad/bc',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var a, b, c, d, num, den, enun, pistas, sol, s;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['sumaResta', 'Suma y resta'],
          ['simplificar', 'Simplificar'],
          ['comparar', 'Comparar fracciones'],
          ['deCantidad', 'Fraccion de una cantidad']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        b = r.elige([2, 3, 4, 5, 6, 8, 10, 12]);
        d = r.elige([2, 3, 4, 5, 6, 8, 10, 12]);
        a = r.entero(1, b * 2 - 1);
        c = r.entero(1, d * 2 - 1);
        var op = r.elige(['+', '-']);
        var m = F.mcm(b, d);
        num = op === '+' ? a * (m / b) + c * (m / d) : a * (m / b) - c * (m / d);
        den = m;
        s = F.simplifica(num, den);
        guiaDelPaso = EJ.guia.sumaFracciones(a, b, c, d, op === '+');
        enun = 'Resuelve y simplifica: ' + fr(a, b) + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + fr(c, d);
        pistas = [
          'Para sumar o restar necesitas el mismo denominador: usa el minimo comun multiplo de ' + b + ' y ' + d + '.',
          'El m.c.m. es ' + m + '. Convierte: ' + fr(a, b) + ' = ' + fr(a * (m / b), m) + ' y ' + fr(c, d) + ' = ' + fr(c * (m / d), m) + '.'
        ];
        sol = [
          'm.c.m.(' + b + ', ' + d + ') = ' + m,
          'Convierto: ' + fr(a * (m / b), m) + ' ' + (op === '+' ? '+' : '&minus;') + ' ' + fr(c * (m / d), m),
          'Opero los numeradores: ' + fr(num, den),
          'Simplifico dividiendo entre ' + F.mcd(num, den) + ': <b>' + F.fracSimp(num, den) + '</b>'
        ];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['producto', 'Multiplicacion'],
          ['cociente', 'Division'],
          ['tres', 'Tres fracciones'],
          ['mixtas', 'Numeros mixtos'],
          ['simplificar', 'Simplificar']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          a = r.entero(1, 9); b = r.entero(2, 12); c = r.entero(1, 9); d = r.entero(2, 12);
          num = a * c; den = b * d;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + fr(a, b) + ' &middot; ' + fr(c, d) + '</b>.<br>' +
              'Multiplicar fracciones es lo MAS facil de todo: no hay que igualar denominadores ni nada. Se multiplica derecho.',
            pasos: [
              { seccion: 'Paso 1: arriba por arriba',
                queHacemos: 'Multiplicamos los dos numeradores.',
                paraQue: 'Multiplicar fracciones es lo mas facil: va derecho, sin buscar denominador comun.',
                queda: F.frac(num, '?'),
                pregunta: 'Multiplica los de arriba: &iquest;cuanto es ' + a + ' &middot; ' + c + '?',
                resp: R.numero(num, { dec: 0 }), pista: 'Numerador por numerador.',
                despues: 'Ese es el numerador del resultado.' },
              { seccion: 'Paso 2: abajo por abajo',
                queHacemos: 'Multiplicamos los dos denominadores.',
                paraQue: 'Para completar la fraccion.',
                queda: F.frac(num, den),
                pregunta: 'Ahora los de abajo: ' + b + ' &middot; ' + d,
                resp: R.numero(den, { dec: 0 }), pista: 'Denominador por denominador.',
                despues: 'Vamos en ' + F.frac(num, den) + '.' },
              { seccion: 'Paso 3: simplificar',
                queHacemos: 'Simplificamos la fraccion que quedo.',
                paraQue: 'Una fraccion sin simplificar no esta terminada.',
                queda: F.fracSimp(num, den),
                pregunta: 'Escribe el resultado ya simplificado.',
                resp: R.fraccion(F.simplifica(num, den)[0], F.simplifica(num, den)[1]),
                pista: F.mcd(num, den) === 1 ? 'Si nada divide a los dos, ya estaba simplificada.' : 'Los dos se pueden dividir entre ' + F.mcd(num, den) + '.',
                despues: '' }
            ],
            final: fr(a, b) + ' &middot; ' + fr(c, d) + ' = <b>' + F.fracSimp(num, den) + '</b>',
            receta: ['Arriba por arriba, abajo por abajo',
              'NO se igualan denominadores (eso es solo para sumar y restar)',
              'Simplificar al final']
          });
          enun = 'Multiplica y simplifica: ' + fr(a, b) + ' &middot; ' + fr(c, d);
          pistas = ['En el producto se multiplican numerador con numerador y denominador con denominador.',
            'Queda ' + fr(num, den) + '; ahora simplifica con el m.c.d.'];
          sol = ['Numeradores: ' + a + ' &middot; ' + c + ' = ' + num,
            'Denominadores: ' + b + ' &middot; ' + d + ' = ' + den,
            'Simplifico entre ' + F.mcd(num, den) + ': <b>' + F.fracSimp(num, den) + '</b>'];
        } else if (t === 'cociente') {
          a = r.entero(1, 9); b = r.entero(2, 12); c = r.entero(1, 9); d = r.entero(2, 12);
          num = a * d; den = b * c;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + fr(a, b) + ' &divide; ' + fr(c, d) + '</b>.<br>' +
              'Dividir fracciones se convierte en una multiplicacion: se voltea la SEGUNDA.',
            pasos: [
              { seccion: 'Paso 1: voltear la segunda',
                queHacemos: 'Le damos la vuelta a la segunda fraccion y cambiamos la division por multiplicacion.',
                paraQue: 'Dividir entre 1/2 es lo mismo que multiplicar por 2. Voltear convierte el problema en uno que ya sabemos hacer.',
                queda: fr(a, b) + ' &middot; ' + F.frac(d, c),
                pregunta: 'Voltea la segunda fraccion (su reciproco).<br>Si ' + fr(c, d) + ' se voltea, &iquest;que numero queda ARRIBA?',
                resp: R.numero(d, { dec: 0 }),
                pista: 'El de abajo se sube y el de arriba se baja: queda ' + F.frac(d, c) + '.',
                despues: 'Y el signo de division se cambia por multiplicacion: ' + fr(a, b) + ' &middot; ' + F.frac(d, c) + '.' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Arriba por arriba.',
                paraQue: 'Ya es una multiplicacion normal.',
                queda: F.frac(num, '?'),
                pregunta: 'Ahora multiplica los de arriba: ' + a + ' &middot; ' + d,
                resp: R.numero(num, { dec: 0 }), pista: 'Ya es una multiplicacion normal.', despues: '' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Abajo por abajo.',
                paraQue: 'Para completar la fraccion.',
                queda: F.frac(num, den),
                pregunta: 'Y los de abajo: ' + b + ' &middot; ' + c,
                resp: R.numero(den, { dec: 0 }), pista: 'Denominador por denominador.', despues: '' },
              { seccion: 'Paso 3: simplificar',
                queHacemos: 'Simplificamos la fraccion que quedo.',
                paraQue: 'Una fraccion sin simplificar no esta terminada.',
                queda: F.fracSimp(num, den),
                pregunta: 'Escribe el resultado ya simplificado.',
                resp: R.fraccion(F.simplifica(num, den)[0], F.simplifica(num, den)[1]),
                pista: F.mcd(num, den) === 1 ? 'Ya estaba simplificada.' : 'Divide los dos entre ' + F.mcd(num, den) + '.',
                despues: '' }
            ],
            final: fr(a, b) + ' &divide; ' + fr(c, d) + ' = <b>' + F.fracSimp(num, den) + '</b>',
            receta: ['Voltear la SEGUNDA fraccion',
              'Cambiar la division por multiplicacion',
              'Multiplicar derecho y simplificar']
          });
          enun = 'Divide y simplifica: ' + fr(a, b) + ' &divide; ' + fr(c, d);
          pistas = ['Dividir es multiplicar por el reciproco: invierte la segunda fraccion.',
            fr(a, b) + ' &middot; ' + fr(d, c) + ' = ' + fr(num, den) + '.'];
          sol = ['Invierto la segunda: ' + fr(a, b) + ' &middot; ' + fr(d, c),
            'Multiplico: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        } else {
          b = r.elige([2, 3, 4, 6]); d = r.elige([3, 4, 5, 6]);
          var f = r.elige([2, 4, 8, 12]);
          a = r.entero(1, b + 3); c = r.entero(1, d + 3);
          var g = r.entero(1, f);
          var mm = F.mcm(F.mcm(b, d), f);
          num = a * (mm / b) + c * (mm / d) - g * (mm / f);
          den = mm;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + fr(a, b) + ' + ' + fr(c, d) + ' &minus; ' + fr(g, f) + '</b>.<br>' +
              'Son tres fracciones, pero el metodo es el mismo que con dos: un solo denominador comun para TODAS.',
            pasos: [
              { seccion: 'Paso 1: denominador comun',
                queHacemos: 'Buscamos un denominador que les sirva a las TRES.',
                paraQue: 'Con tres fracciones no hace falta hacerlo de dos en dos: un solo m.c.m. las convierte todas de una vez.',
                queda: F.frac('?', mm) + ' + ' + F.frac('?', mm) + ' &minus; ' + F.frac('?', mm),
                pregunta: '&iquest;Cual es el m.c.m. de los tres denominadores (' + b + ', ' + d + ' y ' + f + ')?',
                resp: R.numero(mm, { dec: 0 }),
                pista: 'Busca el numero mas chico donde quepan exactos los tres. Truco: empieza por el mayor (' + Math.max(b, d, f) + ') y ve probando sus multiplos.',
                despues: 'Con ' + mm + ' se puede convertir las tres de un jalon.' },
              { seccion: 'Paso 2: convertir las tres',
                queHacemos: 'Convertimos la primera fraccion al denominador nuevo.',
                paraQue: 'Multiplicar arriba y abajo por lo mismo no cambia el valor de la fraccion.',
                queda: F.frac(a * (mm / b), mm) + ' + ' + F.frac('?', mm) + ' &minus; ' + F.frac('?', mm),
                pregunta: 'Convierte la primera: ' + fr(a, b) + ' con denominador ' + mm + '.<br>&iquest;Que numerador queda? (' + a + ' &middot; ' + (mm / b) + ')',
                resp: R.numero(a * (mm / b), { dec: 0 }),
                pista: mm + ' &divide; ' + b + ' = ' + (mm / b) + ', y por eso el numerador se multiplica por ' + (mm / b) + '.',
                despues: '' },
              { seccion: 'Paso 2: convertir las tres',
                queHacemos: 'Ahora la segunda.',
                paraQue: 'Lo mismo: por cuanto se multiplico abajo, se multiplica arriba.',
                queda: F.frac(a * (mm / b), mm) + ' + ' + F.frac(c * (mm / d), mm) + ' &minus; ' + F.frac('?', mm),
                pregunta: 'La segunda: ' + fr(c, d) + ' &rarr; numerador ' + c + ' &middot; ' + (mm / d),
                resp: R.numero(c * (mm / d), { dec: 0 }), pista: mm + ' &divide; ' + d + ' = ' + (mm / d) + '.', despues: '' },
              { seccion: 'Paso 2: convertir las tres',
                queHacemos: 'Y la tercera.',
                paraQue: 'Ya con las tres iguales abajo se pueden operar.',
                queda: F.frac(a * (mm / b), mm) + ' + ' + F.frac(c * (mm / d), mm) + ' &minus; ' + F.frac(g * (mm / f), mm),
                pregunta: 'Y la tercera: ' + fr(g, f) + ' &rarr; numerador ' + g + ' &middot; ' + (mm / f),
                resp: R.numero(g * (mm / f), { dec: 0 }), pista: mm + ' &divide; ' + f + ' = ' + (mm / f) + '.',
                despues: 'Ya las tres tienen denominador ' + mm + '.' },
              { seccion: 'Paso 3: operar',
                queHacemos: 'Sumamos y restamos solo los numeros de arriba, en orden.',
                paraQue: 'El denominador ya es el mismo para las tres: se queda tal cual.',
                queda: F.frac(num, den),
                pregunta: 'Ahora opera SOLO los numeradores:<br>' + (a * (mm / b)) + ' + ' + (c * (mm / d)) + ' &minus; ' + (g * (mm / f)),
                resp: R.numero(num, { dec: 0 }), pista: 'El denominador ni se toca.', despues: '' },
              { seccion: 'Paso 4: simplificar',
                queHacemos: 'Simplificamos el resultado.',
                paraQue: 'Para dejarlo en su forma minima.',
                queda: F.fracSimp(num, den),
                pregunta: 'Escribe el resultado ya simplificado.',
                resp: R.fraccion(F.simplifica(num, den)[0], F.simplifica(num, den)[1]),
                pista: F.mcd(num, den) === 1 ? 'Ya estaba simplificada.' : 'Los dos se dividen entre ' + F.mcd(num, den) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + F.fracSimp(num, den) + '</b>',
            receta: ['Un solo m.c.m. para todos los denominadores',
              'Convertir cada fraccion a ese denominador',
              'Operar solo los numeradores, en orden',
              'Simplificar']
          });
          enun = 'Resuelve y simplifica: ' + fr(a, b) + ' + ' + fr(c, d) + ' &minus; ' + fr(g, f);
          pistas = ['Busca el m.c.m. de los tres denominadores de una vez.',
            'm.c.m.(' + b + ', ' + d + ', ' + f + ') = ' + mm + '.'];
          sol = ['m.c.m. = ' + mm,
            'Convierto todo: ' + fr(a * (mm / b), mm) + ' + ' + fr(c * (mm / d), mm) + ' &minus; ' + fr(g * (mm / f), mm),
            'Opero: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['combinada', 'Jerarquia de operaciones'],
          ['compleja', 'Fraccion compleja'],
          ['mixtas', 'Numeros mixtos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'combinada') {
          a = r.entero(1, 7); b = r.elige([2, 3, 4, 6]);
          c = r.entero(1, 7); d = r.elige([2, 3, 5, 6]);
          var e = r.entero(1, 5), h = r.elige([2, 3, 4]);
          var pn = c * e, pd = d * h;                 // producto de la derecha
          var mm2 = F.mcm(b, pd);
          num = a * (mm2 / b) + pn * (mm2 / pd);
          den = mm2;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + fr(a, b) + ' + ' + fr(c, d) + ' &middot; ' + fr(e, h) + '</b>.<br>' +
              'Cuidado: aqui hay una suma Y una multiplicacion mezcladas. Manda la jerarquia, igual que con numeros normales.',
            pasos: [
              { seccion: 'Paso 1: decidir el orden',
                queHacemos: 'Miramos la expresion y decidimos por donde empezar.',
                paraQue: 'Multiplicar va antes que sumar, aunque este escrito al final. Y ademas conviene: multiplicar fracciones no necesita denominador comun.',
                queda: fr(a, b) + ' + (' + fr(c, d) + ' &middot; ' + fr(e, h) + ')',
                pregunta: '&iquest;Que se hace primero?',
                resp: R.opcion(['La multiplicacion ' + fr(c, d) + ' &middot; ' + fr(e, h), 'La suma, porque esta antes'], 0),
                pista: 'Multiplicar y dividir van antes que sumar y restar, aunque esten al final.',
                despues: 'Exacto. Y ademas conviene, porque multiplicar fracciones no necesita denominador comun.' },
              { seccion: 'Paso 2: la multiplicacion',
                queHacemos: 'Multiplicamos los numeradores.',
                paraQue: 'Para resolver la parte que tiene prioridad.',
                queda: fr(a, b) + ' + ' + F.frac(pn, '?'),
                pregunta: 'Resuelve esa multiplicacion. Numerador: ' + c + ' &middot; ' + e,
                resp: R.numero(pn, { dec: 0 }), pista: 'Arriba por arriba.', despues: '' },
              { seccion: 'Paso 2: la multiplicacion',
                queHacemos: 'Y los denominadores.',
                paraQue: 'Para completar esa fraccion.',
                queda: fr(a, b) + ' + ' + F.frac(pn, pd),
                pregunta: 'Y su denominador: ' + d + ' &middot; ' + h,
                resp: R.numero(pd, { dec: 0 }), pista: 'Abajo por abajo.',
                despues: 'La multiplicacion da ' + F.fracSimp(pn, pd) + '. Ahora si, la suma.' },
              { seccion: 'Paso 3: la suma',
                queHacemos: 'Ahora si, buscamos denominador comun para sumar.',
                paraQue: 'La suma si lo necesita, a diferencia de la multiplicacion.',
                queda: F.frac('?', mm2) + ' + ' + F.frac('?', mm2),
                pregunta: 'Para sumar ' + fr(a, b) + ' + ' + F.frac(pn, pd) + ' hace falta denominador comun.<br>&iquest;Cual es el m.c.m. de ' + b + ' y ' + pd + '?',
                resp: R.numero(mm2, { dec: 0 }), pista: 'El menor donde caben los dos.', despues: '' },
              { seccion: 'Paso 3: la suma',
                queHacemos: 'Convertimos las dos y sumamos los numeradores.',
                paraQue: 'Para llegar al resultado.',
                queda: F.frac(num, den),
                pregunta: 'Convierte y suma los numeradores. &iquest;Cuanto queda arriba?',
                resp: R.numero(num, { dec: 0 }),
                pista: fr(a, b) + ' = ' + F.frac(a * (mm2 / b), mm2) + ' y ' + F.frac(pn, pd) + ' = ' + F.frac(pn * (mm2 / pd), mm2) + '.',
                despues: '' },
              { seccion: 'Paso 4: simplificar',
                queHacemos: 'Simplificamos el resultado.',
                paraQue: 'Para dejarlo en su forma minima.',
                queda: F.fracSimp(num, den),
                pregunta: 'Escribe el resultado ya simplificado.',
                resp: R.fraccion(F.simplifica(num, den)[0], F.simplifica(num, den)[1]),
                pista: F.mcd(num, den) === 1 ? 'Ya estaba simplificada.' : 'Divide los dos entre ' + F.mcd(num, den) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + F.fracSimp(num, den) + '</b>',
            receta: ['Primero la multiplicacion (o division)',
              'Multiplicar fracciones no necesita denominador comun',
              'Despues la suma, esa si con m.c.m.',
              'Simplificar al final']
          });
          enun = 'Resuelve y simplifica: ' + fr(a, b) + ' + ' + fr(c, d) + ' &middot; ' + fr(e, h);
          pistas = ['Jerarquia: primero el producto, luego la suma.',
            fr(c, d) + ' &middot; ' + fr(e, h) + ' = ' + F.fracSimp(pn, pd) + '.'];
          sol = ['Producto primero: ' + fr(c, d) + ' &middot; ' + fr(e, h) + ' = ' + fr(pn, pd) + ' = ' + F.fracSimp(pn, pd),
            'Ahora la suma con m.c.m. = ' + mm2 + ': ' + fr(a * (mm2 / b), mm2) + ' + ' + fr(pn * (mm2 / pd), mm2),
            'Resultado: ' + fr(num, den) + ' = <b>' + F.fracSimp(num, den) + '</b>'];
        } else {
          a = r.entero(1, 6); b = r.elige([2, 3, 4, 5]);
          c = r.entero(1, 6); d = r.elige([2, 3, 4, 5]);
          var e2 = r.entero(1, 6), h2 = r.elige([2, 3, 4, 5]);
          var m1 = F.mcm(b, d);
          var sn = a * (m1 / b) + c * (m1 / d), sd = m1;   // numerador de la fraccion compleja
          num = sn * h2; den = sd * e2;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac(fr(a, b) + ' + ' + fr(c, d), fr(e2, h2)) + '</b>.<br>' +
              'Esto es una fraccion DENTRO de otra. La raya grande de en medio significa "dividido entre": arriba entre abajo.',
            pasos: [
              { seccion: 'Paso 1: resolver arriba',
                queHacemos: 'Sumamos las dos fracciones del numerador.',
                paraQue: 'La raya grande de en medio es una division, y para dividir primero hay que tener UNA sola fraccion arriba.',
                queda: F.frac('?', m1) + ' dividido entre ' + F.frac(e2, h2),
                pregunta: 'Primero se resuelve todo lo de ARRIBA. Para sumar ' + fr(a, b) + ' + ' + fr(c, d) + ' hace falta el m.c.m.<br>&iquest;Cual es el de ' + b + ' y ' + d + '?',
                resp: R.numero(m1, { dec: 0 }), pista: 'El menor donde quepan los dos.', despues: '' },
              { seccion: 'Paso 1: resolver arriba',
                queHacemos: 'Convertimos y sumamos.',
                paraQue: 'Para dejar el numerador como una sola fraccion.',
                queda: F.frac(sn, sd) + ' dividido entre ' + F.frac(e2, h2),
                pregunta: 'Suma los numeradores ya convertidos. &iquest;Cuanto queda arriba, con denominador ' + m1 + '?',
                resp: R.numero(sn, { dec: 0 }),
                pista: fr(a, b) + ' = ' + F.frac(a * (m1 / b), m1) + ' y ' + fr(c, d) + ' = ' + F.frac(c * (m1 / d), m1) + '.',
                despues: 'La parte de arriba vale ' + F.frac(sn, sd) + '. Ahora hay que dividirla entre ' + F.frac(e2, h2) + '.' },
              { seccion: 'Paso 2: voltear',
                queHacemos: 'Volteamos la fraccion de abajo y cambiamos la division por multiplicacion.',
                paraQue: 'Es el mismo truco de siempre: dividir entre una fraccion es multiplicar por la volteada.',
                queda: F.frac(sn, sd) + ' &middot; ' + F.frac(h2, e2),
                pregunta: 'Dividir entre una fraccion es multiplicar por su reciproco.<br>Si volteas ' + F.frac(e2, h2) + ', &iquest;que queda arriba?',
                resp: R.numero(h2, { dec: 0 }), pista: 'Se voltea: queda ' + F.frac(h2, e2) + '.',
                despues: 'Entonces la cuenta es ' + F.frac(sn, sd) + ' &middot; ' + F.frac(h2, e2) + '.' },
              { seccion: 'Paso 3: multiplicar',
                queHacemos: 'Arriba por arriba.',
                paraQue: 'Ya es una multiplicacion normal.',
                queda: F.frac(num, '?'),
                pregunta: 'Multiplica los de arriba: ' + sn + ' &middot; ' + h2,
                resp: R.numero(num, { dec: 0 }), pista: 'Numerador por numerador.', despues: '' },
              { seccion: 'Paso 3: multiplicar',
                queHacemos: 'Abajo por abajo.',
                paraQue: 'Para completar la fraccion.',
                queda: F.frac(num, den),
                pregunta: 'Y los de abajo: ' + sd + ' &middot; ' + e2,
                resp: R.numero(den, { dec: 0 }), pista: 'Denominador por denominador.', despues: '' },
              { seccion: 'Paso 4: simplificar',
                queHacemos: 'Simplificamos el resultado.',
                paraQue: 'Para dejarlo en su forma minima.',
                queda: F.fracSimp(num, den),
                pregunta: 'Escribe el resultado ya simplificado.',
                resp: R.fraccion(F.simplifica(num, den)[0], F.simplifica(num, den)[1]),
                pista: F.mcd(num, den) === 1 ? 'Ya estaba simplificada.' : 'Divide los dos entre ' + F.mcd(num, den) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + F.fracSimp(num, den) + '</b>',
            receta: ['La raya grande es una division',
              'Resolver primero arriba y abajo por separado',
              'Dividir = multiplicar por el reciproco',
              'Simplificar al final']
          });
          enun = 'Resuelve y simplifica: ' + F.frac(fr(a, b) + ' + ' + fr(c, d), fr(e2, h2));
          pistas = ['Resuelve primero la suma de arriba y luego divide entre la fraccion de abajo.',
            'Arriba: ' + fr(a, b) + ' + ' + fr(c, d) + ' = ' + F.fracSimp(sn, sd) + '. Dividir entre ' + fr(e2, h2) + ' es multiplicar por ' + fr(h2, e2) + '.'];
          sol = ['Numerador: ' + fr(a, b) + ' + ' + fr(c, d) + ' = ' + fr(sn, sd),
            'Divido: ' + fr(sn, sd) + ' &divide; ' + fr(e2, h2) + ' = ' + fr(sn, sd) + ' &middot; ' + fr(h2, e2),
            'Multiplico: ' + fr(num, den),
            'Simplifico: <b>' + F.fracSimp(num, den) + '</b>'];
        }
      }

      s = F.simplifica(num, den);
      return {
        guia: guiaDelPaso,
        enunciado: enun,
        respuesta: R.fraccion(s[0], s[1]),
        pistas: pistas,
        solucion: sol
      };
    }
  });
})();
