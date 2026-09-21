/* Elementos de una funcion: dominio, rango, crecimiento y decrecimiento */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var G = EJ.guia.armar;

  var extra = {};

  extra.intersecciones = function (r) {
    var m = r.enteroNoCero(-6, 6), b = r.enteroNoCero(-12, 12);
    return {
      guia: G({
        intro: 'La recta <b>f(x) = ' + P.texto([m, b]) + '</b> corta a los dos ejes y hay que encontrar donde.<br>' +
          'Los dos cortes salen de la misma idea, solo que al reves: sobre el <b>eje y</b> la x vale 0, ' +
          'y sobre el <b>eje x</b> la y vale 0. Si tienes clara esa frase, el ejercicio se resuelve solo.',
        pasos: [
          { seccion: 'Paso 1: el corte con el eje y',
            queHacemos: 'Recordamos que sobre el eje y la x vale 0.',
            paraQue: 'Los dos cortes salen de la misma idea al reves: en el eje y la x es 0, y en el eje x la y es 0.',
            queda: 'eje y: f(0);  eje x: ?',
            pregunta: 'Empecemos por el eje y. &iquest;Cuanto vale x en cualquier punto del eje y?',
            resp: R.numero(0, { dec: 0 }),
            pista: 'El eje y es la linea vertical que pasa por el origen: ahi no te has movido nada en horizontal.',
            despues: 'Asi que basta con evaluar f(0).' },
          { seccion: 'Paso 1: el corte con el eje y',
            queHacemos: 'Evaluamos la funcion en 0.',
            paraQue: 'En una recta el corte con el eje y es siempre el termino independiente.',
            queda: 'eje y: (0, ' + b + ');  eje x: ?',
            pregunta: 'Calcula f(0) = ' + m + '(0) ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            resp: R.numero(b, { dec: 4, tol: 0.01 }),
            pista: 'El termino con x desaparece y queda solo el numero suelto.',
            despues: 'El corte con el eje y siempre es el termino independiente: aqui ' + b + '.' },
          { seccion: 'Paso 2: el corte con el eje x',
            queHacemos: 'Ahora al reves: igualamos la funcion a 0.',
            paraQue: 'Sobre el eje x la altura es cero, asi que hay que resolver f(x) = 0.',
            queda: 'eje y: (0, ' + b + ');  resolver ' + P.texto([m, b]) + ' = 0',
            pregunta: 'Ahora el eje x. &iquest;Cuanto vale y (o sea f(x)) sobre el eje x?',
            resp: R.numero(0, { dec: 0 }),
            pista: 'El eje x es la linea horizontal: ahi la altura es cero.',
            despues: 'Entonces hay que resolver la ecuacion f(x) = 0.' },
          { seccion: 'Paso 2: el corte con el eje x',
            queHacemos: 'Despejamos la x.',
            paraQue: 'Ese valor es donde la recta cruza el eje horizontal.',
            queda: 'eje y: (0, ' + b + ');  eje x: (' + F.n(-b / m, 4) + ', 0)',
            pregunta: 'Resuelve ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = 0 (4 decimales)',
            resp: R.numero(-b / m, { dec: 4, tol: 0.01 }),
            pista: 'Pasa el ' + b + ' restando y divide entre ' + m + ': x = ' + (-b) + ' &divide; ' + m + '.',
            despues: 'Este corte tambien se llama el CERO o la raiz de la funcion.' },
          { seccion: 'Paso 3: escribir',
            queHacemos: 'Damos los dos cortes.',
            paraQue: 'Para cerrar el ejercicio.',
            queda: 'eje x: ' + F.n(-b / m, 4) + ',  eje y: ' + b,
            pregunta: 'Escribe las dos respuestas.',
            resp: R.varios([
              { etiqueta: 'Corte con eje x', resp: R.numero(-b / m, { dec: 4, tol: 0.01 }) },
              { etiqueta: 'Corte con eje y', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
            ]),
            pista: 'Eje x en ' + F.n(-b / m, 4) + ' y eje y en ' + b + '.',
            despues: '' }
        ],
        final: 'Corta los ejes en <b>(' + F.n(-b / m, 4) + ', 0)</b> y <b>(0, ' + b + ')</b>',
        receta: ['Sobre el eje y, x = 0: evaluar f(0)',
          'Sobre el eje x, y = 0: resolver f(x) = 0',
          'En una recta mx + b, el corte con y es siempre b',
          'El corte con x es el cero o raiz de la funcion']
      }),
      enunciado: 'La recta f(x) = ' + P.texto([m, b]) + ' corta a los dos ejes.<br>' +
        'Encuentra la interseccion con el eje x y con el eje y (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Corte con eje x', resp: R.numero(-b / m, { dec: 4, tol: 0.01 }) },
        { etiqueta: 'Corte con eje y', resp: R.numero(b, { dec: 4, tol: 0.01 }) }
      ]),
      pistas: ['Para el corte con el eje x se hace f(x) = 0; para el corte con el eje y se hace x = 0.',
        '0 = ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' &rArr; x = ' + F.n(-b / m, 4) + '.'],
      solucion: ['Eje x: ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = 0 &rArr; x = <b>' + F.n(-b / m, 4) + '</b>',
        'Eje y: f(0) = <b>' + b + '</b>',
        'Los puntos son (' + F.n(-b / m, 4) + ', 0) y (0, ' + b + ')']
    };
  };

  extra.porTramos = function (r) {
    var corte = r.enteroNoCero(-4, 4);
    var m1 = r.enteroNoCero(-4, 4), b1 = r.entero(-6, 6);
    var a2 = r.enteroNoCero(-3, 3), b2 = r.entero(-6, 6);
    var x1 = corte - r.entero(1, 4);
    var x2 = corte + r.entero(1, 4);
    var v1 = m1 * x1 + b1;
    var v2 = a2 * x2 * x2 + b2;
    var vCorte = a2 * corte * corte + b2;
    return {
      guia: G({
        intro: 'Una funcion <b>por tramos</b>: no tiene una sola formula, sino varias, y cada una manda en una zona distinta.<br>' +
          'El error clasico no es calcular mal, sino <b>usar la regla equivocada</b>. Por eso, antes de sustituir nada, ' +
          'siempre hay que preguntarse: este valor de x, &iquest;a que tramo pertenece?',
        pasos: [
          { seccion: 'Paso 1: primer valor',
            queHacemos: 'Antes de calcular, decidimos a que tramo pertenece esa x.',
            paraQue: 'El error clasico no es calcular mal, sino usar la regla equivocada. Primero se decide, luego se sustituye.',
            queda: 'f(' + x1 + ') = ?,  f(' + corte + ') = ?,  f(' + x2 + ') = ?',
            pregunta: 'Para x = ' + x1 + ', &iquest;que regla toca?',
            resp: R.opcion(['La primera, porque ' + x1 + ' es menor que ' + corte,
              'La segunda'], 0),
            pista: 'La condicion de la primera regla es x &lt; ' + corte + ', y ' + x1 + ' la cumple.',
            despues: 'Entonces se usa ' + P.texto([m1, b1]) + '.' },
          { seccion: 'Paso 1: primer valor',
            queHacemos: 'Ya con el tramo elegido, sustituimos.',
            paraQue: 'Es una sustitucion normal.',
            queda: 'f(' + x1 + ') = ' + v1 + ',  f(' + corte + ') = ?,  f(' + x2 + ') = ?',
            pregunta: 'Calcula f(' + x1 + ') = ' + m1 + '(' + x1 + ') ' + (b1 < 0 ? '&minus; ' + (-b1) : '+ ' + b1),
            resp: R.numero(v1, { dec: 2 }),
            pista: 'Multiplica y luego suma.', despues: '' },
          { seccion: 'Paso 2: la frontera',
            queHacemos: 'Miramos cual de los dos tramos incluye el punto de corte.',
            paraQue: 'Justo en la frontera solo UNO de los dos tramos la incluye. Hay que mirar si el signo lleva el "igual".',
            queda: 'f(' + x1 + ') = ' + v1 + ',  f(' + corte + ') = ?,  f(' + x2 + ') = ?',
            pregunta: 'Ahora el caso delicado: x = ' + corte + ' exactamente, que es justo la frontera.<br>&iquest;Que regla le toca?',
            resp: R.opcion(['La segunda, porque su condicion dice x &ge; ' + corte,
              'La primera, porque ahi se acaba'], 0),
            pista: 'Fijate en el simbolo: la segunda regla dice x &ge; ' + corte + ', y ese &ge; INCLUYE el ' + corte + '. ' +
              'La primera dice x &lt; ' + corte + ', que lo deja fuera.',
            despues: 'Este detalle del &ge; contra el &gt; es todo el ejercicio.' },
          { seccion: 'Paso 2: la frontera',
            queHacemos: 'Sustituimos con la regla que le toca.',
            paraQue: 'Con el tramo ya decidido, el calculo es directo.',
            queda: 'f(' + x1 + ') = ' + v1 + ',  f(' + corte + ') = ' + vCorte + ',  f(' + x2 + ') = ?',
            pregunta: 'Calcula f(' + corte + ') = ' + a2 + '(' + corte + ')&sup2; ' + (b2 < 0 ? '&minus; ' + (-b2) : '+ ' + b2),
            resp: R.numero(vCorte, { dec: 2 }),
            pista: 'Primero (' + corte + ')&sup2; = ' + (corte * corte) + ', luego multiplica por ' + a2 + ' y suma.',
            despues: '' },
          { seccion: 'Paso 3: tercer valor',
            queHacemos: 'Repetimos con el ultimo valor.',
            paraQue: 'Cae claramente en el segundo tramo, sin dudas de frontera.',
            queda: 'f(' + x1 + ') = ' + v1 + ',  f(' + corte + ') = ' + vCorte + ',  f(' + x2 + ') = ' + v2,
            pregunta: 'Y para x = ' + x2 + ', que tambien cae en el segundo tramo: f(' + x2 + ')',
            resp: R.numero(v2, { dec: 2 }),
            pista: a2 + '(' + x2 + ')&sup2; ' + (b2 < 0 ? '&minus; ' + (-b2) : '+ ' + b2) + '.',
            despues: '' },
          { seccion: 'Paso 4: escribir',
            queHacemos: 'Damos los tres resultados.',
            paraQue: 'Para cerrar el ejercicio.',
            queda: v1 + ',  ' + vCorte + ',  ' + v2,
            pregunta: 'Escribe los tres valores.',
            resp: R.varios([
              { etiqueta: 'f(' + x1 + ')', resp: R.numero(v1, { dec: 2 }) },
              { etiqueta: 'f(' + corte + ')', resp: R.numero(vCorte, { dec: 2 }) },
              { etiqueta: 'f(' + x2 + ')', resp: R.numero(v2, { dec: 2 }) }
            ]),
            pista: v1 + ', ' + vCorte + ' y ' + v2 + '.',
            despues: '' }
        ],
        final: 'f(' + x1 + ') = <b>' + v1 + '</b>, f(' + corte + ') = <b>' + vCorte + '</b>, f(' + x2 + ') = <b>' + v2 + '</b>',
        receta: ['Primero decidir el tramo, despues calcular',
          'Comparar el valor de x con la frontera',
          'Cuidado con &le; y &ge;: incluyen la frontera',
          '&lt; y &gt; la dejan fuera',
          'Cada tramo usa su propia formula']
      }),
      enunciado: 'Sea la funcion por tramos:<br>' +
        '<span class="big">f(x) = ' + P.texto([m1, b1]) + ' &nbsp; si x &lt; ' + corte + '<br>' +
        'f(x) = ' + F.une([F.term(a2, 'x', 2), String(b2)]) + ' &nbsp; si x &ge; ' + corte + '</span><br>' +
        'Calcula f(' + x1 + '), f(' + corte + ') y f(' + x2 + ').',
      respuesta: R.varios([
        { etiqueta: 'f(' + x1 + ')', resp: R.numero(v1, { dec: 2 }) },
        { etiqueta: 'f(' + corte + ')', resp: R.numero(vCorte, { dec: 2 }) },
        { etiqueta: 'f(' + x2 + ')', resp: R.numero(v2, { dec: 2 }) }
      ]),
      pistas: ['Para cada valor de x primero decide QUE regla le toca.',
        'Ojo con x = ' + corte + ': la condicion dice x &ge; ' + corte + ', asi que usa la segunda regla.'],
      solucion: ['x = ' + x1 + ' es menor que ' + corte + ' &rArr; primera regla: f(' + x1 + ') = <b>' + v1 + '</b>',
        'x = ' + corte + ' cumple x &ge; ' + corte + ' &rArr; segunda regla: f(' + corte + ') = <b>' + vCorte + '</b>',
        'x = ' + x2 + ' &rArr; segunda regla: f(' + x2 + ') = <b>' + v2 + '</b>']
    };
  };

  EJ.tema({
    id: 'elementos-funcion',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Elementos de funcion, crecientes y decrecientes',
    descripcion: 'Dominio, rango, vertice, ceros e intervalos donde la funcion crece o decrece.',
    formulario: 'Dominio: valores de x permitidos (no dividir entre 0, no raiz par de negativo).<br>' +
      'Rango: valores que alcanza f(x).<br>' +
      'Parabola y = ax&sup2; + bx + c: vertice en x = &minus;b/2a; si a &gt; 0 decrece antes del vertice y crece despues.<br>' +
      'En general: f crece donde f&prime;(x) &gt; 0 y decrece donde f&prime;(x) &lt; 0.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, h, k;

      if (dif === 'facil') {
        var t = r.subtema([
          ['dominioRacional', 'Dominio de una racional'],
          ['evaluar', 'Evaluar la funcion'],
          ['ceros', 'Ceros o raices'],
          ['intersecciones', 'Cortes con los ejes']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'dominioRacional') {
          a = r.enteroNoCero(-9, 9);
          guiaDelPaso = G({
            intro: 'Queremos el dominio de <b>f(x) = ' + F.frac(1, 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a))) + '</b>.<br>' +
              'El dominio es la lista de valores de x que se le pueden meter a la funcion sin que se rompa. ' +
              'En una fraccion solo hay una cosa prohibida, y de ahi sale todo.',
            pasos: [
              { seccion: 'Paso 1: la unica prohibicion',
                queHacemos: 'Recordamos que el denominador no puede valer 0.',
                paraQue: 'El dominio es la lista de x que se le pueden meter sin que se rompa. En una fraccion solo hay una cosa prohibida.',
                queda: 'resolver x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0',
                pregunta: '&iquest;Que es lo unico que no se puede hacer en una fraccion?',
                resp: R.opcion(['Que el denominador valga 0', 'Que el numerador valga 0'], 0),
                pista: 'Dividir entre cero no da un numero: no esta definido. El numerador en cambio puede valer 0 sin problema.',
                despues: 'Asi que hay que buscar que x hace cero el de abajo, y excluirla.' },
              { seccion: 'Paso 2: encontrar el prohibido',
                queHacemos: 'Igualamos el denominador a cero y despejamos.',
                paraQue: 'Ese valor es justo el que hay que quitar del dominio.',
                queda: 'prohibido: x = ' + a,
                pregunta: 'Resuelve x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0',
                resp: R.numero(a, { dec: 2 }),
                pista: 'Pasa el ' + (a > 0 ? a : (-a)) + ' al otro lado cambiandole el signo.',
                despues: 'En x = ' + a + ' el denominador se hace cero.' },
              { seccion: 'Paso 3: escribir el dominio',
                queHacemos: 'Quitamos ese valor de todos los reales.',
                paraQue: 'En la grafica ahi hay una asintota vertical: la curva se dispara sin llegar a tocar esa linea.',
                queda: 'todos los reales menos x = ' + a,
                pregunta: 'Entonces, &iquest;cual es el dominio?',
                resp: R.opcion(['Todos los numeros reales excepto ' + a, 'Solamente x = ' + a], 0),
                pista: 'Se quita el valor problematico y se queda TODO lo demas. No al reves.',
                despues: 'En la grafica, ahi hay una asintota vertical.' }
            ],
            final: 'Hay que excluir <b>x = ' + a + '</b>',
            receta: ['El denominador nunca puede valer 0',
              'Igualar el denominador a cero y resolver',
              'Esos valores se EXCLUYEN; el resto si vale',
              'Cada valor excluido suele ser una asintota vertical']
          });
          enun = 'Para la funcion f(x) = ' + F.frac(1, 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a))) + ':<br>' +
            '&iquest;Que valor de x hay que excluir del dominio?';
          resp = R.numero(a, { dec: 2 });
          pistas = ['El dominio excluye lo que hace CERO al denominador.',
            'Resuelve x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0.'];
          sol = ['El denominador no puede valer 0',
            'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' = 0 &rArr; x = <b>' + a + '</b>',
            'Dominio: todos los reales excepto ' + a];
        } else if (t === 'evaluar') {
          var pol = [r.enteroNoCero(-4, 4), r.entero(-6, 6), r.entero(-8, 8)];
          var x0 = r.enteroNoCero(-5, 5);
          guiaDelPaso = G({
            intro: 'Tenemos <b>f(x) = ' + P.texto(pol) + '</b> y nos piden <b>f(' + x0 + ')</b>.<br>' +
              'Evaluar una funcion es sustituir: donde diga x, se escribe ' + x0 + '. ' +
              'El unico cuidado real es poner el numero entre PARENTESIS, porque es negativo y los signos cambian.',
            pasos: [
              { seccion: 'Paso 1: la potencia',
                queHacemos: 'Elevamos al cuadrado el numero, con parentesis.',
                paraQue: 'Los PARENTESIS son el unico cuidado real: (&minus;3)&sup2; da 9, pero &minus;3&sup2; daria &minus;9.',
                queda: pol[0] + '(' + (x0 * x0) + ') + ' + pol[1] + '(' + x0 + ') + ' + pol[2],
                pregunta: 'Empieza por la potencia: (' + x0 + ')&sup2;',
                resp: R.numero(x0 * x0, { dec: 0 }),
                pista: x0 < 0 ? 'Negativo al cuadrado sale POSITIVO. Si lo escribes sin parentesis te sale al reves.'
                  : 'Multiplica ' + x0 + ' por si mismo.',
                despues: '' },
              { seccion: 'Paso 2: el termino cuadratico',
                queHacemos: 'Multiplicamos la potencia por su coeficiente.',
                paraQue: 'Primero las potencias, luego los productos. Asi no se pierden los signos.',
                queda: (pol[0] * x0 * x0) + ' + ? + ' + pol[2],
                pregunta: 'Multiplica por su coeficiente: ' + pol[0] + ' &times; ' + (x0 * x0),
                resp: R.numero(pol[0] * x0 * x0, { dec: 0 }),
                pista: 'Ojo con los signos.', despues: '' },
              { seccion: 'Paso 3: el termino lineal',
                queHacemos: 'Multiplicamos el coeficiente de x por el valor.',
                paraQue: 'Es el segundo de los tres pedazos.',
                queda: (pol[0] * x0 * x0) + ' + (' + (pol[1] * x0) + ') + ' + pol[2],
                pregunta: 'Ahora el termino lineal: ' + pol[1] + ' &times; (' + x0 + ')',
                resp: R.numero(pol[1] * x0, { dec: 0 }),
                pista: 'Multiplicacion directa, cuidando el signo.', despues: '' },
              { seccion: 'Paso 4: sumar',
                queHacemos: 'Sumamos los tres.',
                paraQue: 'Ese numero es f(' + x0 + ').',
                queda: 'f(' + x0 + ') = ' + P.evalua(pol, x0),
                pregunta: 'Suma los tres pedazos: ' + (pol[0] * x0 * x0) + ' + (' + (pol[1] * x0) + ') + (' + pol[2] + ')',
                resp: R.numero(P.evalua(pol, x0), { dec: 2 }),
                pista: 'De dos en dos, con cuidado de los signos.',
                despues: 'Eso significa que la grafica pasa por el punto (' + x0 + ', ' + P.evalua(pol, x0) + ').' }
            ],
            final: 'f(' + x0 + ') = <b>' + P.evalua(pol, x0) + '</b>',
            receta: ['Sustituir cada x por el valor, ENTRE PARENTESIS',
              'Resolver primero las potencias',
              'Multiplicar cada una por su coeficiente',
              'Sumar todo al final',
              'El resultado es la altura de la grafica en ese punto']
          });
          enun = 'Si f(x) = ' + P.texto(pol) + ', calcula f(' + x0 + ').';
          resp = R.numero(P.evalua(pol, x0), { dec: 2 });
          pistas = ['Sustituye x por ' + x0 + ' en toda la expresion.',
            '(' + x0 + ')&sup2; = ' + (x0 * x0) + '.'];
          sol = ['f(' + x0 + ') = ' + pol[0] + '(' + x0 + ')&sup2; + (' + pol[1] + ')(' + x0 + ') + (' + pol[2] + ')',
            '= ' + (pol[0] * x0 * x0) + ' + (' + (pol[1] * x0) + ') + (' + pol[2] + ')',
            'f(' + x0 + ') = <b>' + P.evalua(pol, x0) + '</b>'];
        } else {
          var r1 = r.enteroNoCero(-8, 8), r2 = r.enteroNoCero(-8, 8);
          while (r2 === r1) r2 = r.enteroNoCero(-8, 8);
          var q = P.deRaices([r1, r2]);
          guiaDelPaso = G({
            intro: 'Hay que encontrar los <b>ceros</b> de f(x) = ' + P.texto(q) + '.<br>' +
              'Un cero (o raiz) es un valor de x que hace que la funcion valga 0. En la grafica son los puntos ' +
              'donde la curva cruza el eje x. Encontrarlos es resolver la ecuacion f(x) = 0.',
            pasos: [
              { seccion: 'Paso 1: que es un cero',
                queHacemos: 'Aclaramos que es un cero de la funcion.',
                paraQue: 'Es donde la grafica TOCA el eje x. No confundirlo con f(0), que es el corte con el eje y.',
                queda: 'resolver ' + P.texto(q) + ' = 0',
                pregunta: '&iquest;Que es un "cero" de la funcion?',
                resp: R.opcion(['El valor de x que hace f(x) = 0', 'El valor de f cuando x = 0'], 0),
                pista: 'Es donde la grafica toca el eje x. Lo otro (f cuando x = 0) es el corte con el eje y, que es distinto.',
                despues: 'Entonces hay que resolver ' + P.texto(q) + ' = 0.' },
              { seccion: 'Paso 2: factorizar',
                queHacemos: 'Buscamos dos numeros con ese producto y esa suma.',
                paraQue: 'Factorizado, el problema se parte en dos ecuaciones faciles.',
                queda: '(x ' + (r1 < 0 ? '+ ' + (-r1) : '&minus; ' + r1) + ')(x ' + (r2 < 0 ? '+ ' + (-r2) : '&minus; ' + r2) + ') = 0',
                pregunta: 'Para resolverla, factorizamos. Busca dos numeros con PRODUCTO ' + q[2] + ' y SUMA ' + q[1] + '.<br>Escribelos separados por coma.',
                resp: R.lista([-r1, -r2], { ayuda: 'Los dos numeros, separados por coma.' }),
                pista: 'Son ' + (-r1) + ' y ' + (-r2) + '.',
                despues: 'Queda (x ' + (r1 < 0 ? '+ ' + (-r1) : '&minus; ' + r1) + ')(x ' + (r2 < 0 ? '+ ' + (-r2) : '&minus; ' + r2) + ') = 0.' },
              { seccion: 'Paso 3: los dos ceros',
                queHacemos: 'Igualamos cada factor a cero.',
                paraQue: 'Salen con el signo CONTRARIO al que se ve en el parentesis.',
                queda: 'x = ' + r1 + ',  x = ' + r2,
                pregunta: 'Un producto vale 0 si alguno de los factores vale 0.<br>Escribe los dos ceros separados por coma.',
                resp: R.lista([r1, r2], { ayuda: 'Escribe los dos valores separados por coma.' }),
                pista: 'De cada parentesis sale un valor: ' + r1 + ' y ' + r2 + '. Fijate que salen con el signo CONTRARIO al que se ve.',
                despues: 'Comprobacion: si sustituyes cualquiera de los dos en la funcion, debe dar 0.' }
            ],
            final: 'Los ceros son <b>x = ' + r1 + '</b> y <b>x = ' + r2 + '</b>',
            receta: ['Cero = donde f(x) = 0 = donde cruza el eje x',
              'Igualar a cero y factorizar',
              'Dos numeros: producto = termino independiente, suma = coeficiente de x',
              'Cada factor igualado a cero da un cero',
              'Los ceros salen con el signo contrario al del parentesis']
          });
          enun = 'Encuentra los ceros (raices) de f(x) = ' + P.texto(q) + '.';
          resp = R.lista([r1, r2], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Los ceros son los valores de x donde f(x) = 0: factoriza.',
            'Busca dos numeros que multiplicados den ' + q[2] + ' y sumados den ' + q[1] + '.'];
          sol = ['Igualo a cero: ' + P.texto(q) + ' = 0',
            'Factorizo: (x ' + (r1 < 0 ? '+ ' + (-r1) : '&minus; ' + r1) + ')(x ' + (r2 < 0 ? '+ ' + (-r2) : '&minus; ' + r2) + ') = 0',
            'Ceros: <b>x = ' + r1 + '</b> y <b>x = ' + r2 + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['vertice', 'Vertice y crecimiento'],
          ['rangoCuad', 'Rango de una cuadratica'],
          ['dominioRaiz', 'Dominio con raiz cuadrada'],
          ['porTramos', 'Funcion por tramos'],
          ['intersecciones', 'Cortes con los ejes']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        a = r.enteroNoCero(-4, 4); b = r.entero(-10, 10); c = r.entero(-8, 8);
        h = -b / (2 * a); k = P.evalua([a, b, c], h);
        if (t2 === 'vertice') {
          guiaDelPaso = EJ.guia.verticeParabola(a, b, c);
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ':<br>' +
            'encuentra el vertice y di si la funcion crece o decrece a la derecha del vertice.';
          resp = R.varios([
            { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'A la derecha del vertice', resp: R.opcion(['Crece', 'Decrece'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['La x del vertice es &minus;b/2a; la y se obtiene sustituyendo.',
            'x = &minus;(' + b + ')/(2&middot;' + a + ') = ' + F.n(h, 4) + '. Como a ' + (a > 0 ? '&gt;' : '&lt;') + ' 0, la parabola abre hacia ' + (a > 0 ? 'arriba' : 'abajo') + '.'];
          sol = ['x = &minus;b/2a = &minus;(' + b + ')/(2&middot;' + a + ') = <b>' + F.n(h, 4) + '</b>',
            'y = f(' + F.n(h, 4) + ') = <b>' + F.n(k, 4) + '</b>',
            'a = ' + a + ' ' + (a > 0 ? '&gt; 0 &rArr; abre hacia arriba: el vertice es minimo y a su derecha <b>crece</b>' : '&lt; 0 &rArr; abre hacia abajo: el vertice es maximo y a su derecha <b>decrece</b>')];
        } else if (t2 === 'rangoCuad') {
          guiaDelPaso = G({
            intro: 'De <b>f(x) = ' + P.texto([a, b, c]) + '</b> queremos su valor extremo y saber de que tipo es.<br>' +
              'Una parabola siempre tiene un punto "de retorno": donde deja de bajar y empieza a subir (o al reves). ' +
              'Ese punto es el <b>vertice</b>, y su altura es el valor extremo. Si abre hacia arriba es un minimo; si abre hacia abajo, un maximo.',
            pasos: [
              { seccion: 'Paso 1: donde buscarlo',
                queHacemos: 'Localizamos el punto de retorno.',
                paraQue: 'Una parabola siempre tiene un punto donde deja de bajar y empieza a subir (o al reves): el vertice.',
                queda: 'extremo = f(&minus;b/2a)',
                pregunta: '&iquest;Donde esta el valor extremo de una parabola?',
                resp: R.opcion(['En el vertice', 'En los ceros'], 0),
                pista: 'Los ceros son donde vale 0, que es otra cosa. El extremo es el punto mas alto o mas bajo de la curva.',
                despues: 'Asi que primero hay que localizar el vertice.' },
              { seccion: 'Paso 2: la x del vertice',
                queHacemos: 'Aplicamos la formula.',
                paraQue: 'Es la abscisa del punto de retorno.',
                queda: 'x = ' + F.n(h, 4) + ';  extremo = ?',
                pregunta: 'La x del vertice es &minus;b/2a.<br>Calcula &minus;(' + b + ') &divide; (2 &times; ' + a + ') (4 decimales)',
                resp: R.numero(h, { dec: 4, tol: 0.01 }),
                pista: 'Ojo con el signo de menos de la formula y con el signo de b.',
                despues: 'El vertice esta en x = ' + F.n(h, 4) + '.' },
              { seccion: 'Paso 3: la altura',
                queHacemos: 'Sustituimos esa x en la funcion.',
                paraQue: 'Esa altura es el valor extremo, el que marca donde empieza o acaba el rango.',
                queda: 'extremo = ' + F.n(k, 4) + ';  falta el tipo',
                pregunta: 'Sustituye ese valor en la funcion para obtener la altura. (4 decimales)',
                resp: R.numero(k, { dec: 4, tol: 0.01 }),
                pista: 'f(' + F.n(h, 4) + ') = ' + a + '(' + F.n(h, 4) + ')&sup2; + (' + b + ')(' + F.n(h, 4) + ') + (' + c + ').',
                despues: 'Ese numero es el valor extremo.' },
              { seccion: 'Paso 4: maximo o minimo',
                queHacemos: 'Miramos el signo de a.',
                paraQue: 'Abre hacia arriba: el extremo es un minimo y el rango va de ahi hacia arriba. Hacia abajo, al reves.',
                queda: 'extremo ' + F.n(k, 4) + ',  ' + (a > 0 ? 'minimo' : 'maximo'),
                pregunta: 'Como a = ' + a + ', la parabola abre hacia ' + (a > 0 ? 'ARRIBA' : 'ABAJO') + '.<br>&iquest;Que tipo de extremo es?',
                resp: R.opcion(['Minimo (rango [y, &infin;))', 'Maximo (rango (&minus;&infin;, y])'], a > 0 ? 0 : 1),
                pista: a > 0 ? 'Si abre hacia arriba, el vertice es el punto mas BAJO: un minimo, y la funcion no baja de ahi.'
                  : 'Si abre hacia abajo, el vertice es el punto mas ALTO: un maximo, y la funcion no sube de ahi.',
                despues: 'El signo de a es lo unico que decide esto.' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos el extremo y su tipo.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'extremo ' + F.n(k, 4) + ',  ' + (a > 0 ? 'minimo' : 'maximo'),
                pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Valor extremo (y)', resp: R.numero(k, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'Tipo', resp: R.opcion(['Minimo (rango [y, &infin;))', 'Maximo (rango (&minus;&infin;, y])'], a > 0 ? 0 : 1) }
                ]),
                pista: 'Extremo ' + F.n(k, 4) + ', de tipo ' + (a > 0 ? 'minimo' : 'maximo') + '.',
                despues: '' }
            ],
            final: 'Valor extremo <b>' + F.n(k, 4) + '</b>, un <b>' + (a > 0 ? 'minimo' : 'maximo') + '</b>',
            receta: ['El extremo esta en el vertice',
              'x del vertice = &minus;b/2a',
              'Sustituir para obtener la altura',
              'a &gt; 0 abre arriba: minimo. a &lt; 0 abre abajo: maximo',
              'El rango arranca (o termina) en ese valor']
          });
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ':<br>' +
            '&iquest;cual es el valor extremo de la funcion y de que tipo es?';
          resp = R.varios([
            { etiqueta: 'Valor extremo (y)', resp: R.numero(k, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Tipo', resp: R.opcion(['Minimo (rango [y, &infin;))', 'Maximo (rango (&minus;&infin;, y])'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['El valor extremo de una parabola esta en su vertice.',
            'x del vertice = ' + F.n(h, 4) + '; sustituye para obtener y.'];
          sol = ['x del vertice = &minus;b/2a = ' + F.n(h, 4),
            'y = f(' + F.n(h, 4) + ') = <b>' + F.n(k, 4) + '</b>',
            'Como a ' + (a > 0 ? '&gt; 0, es un <b>minimo</b> y el rango es [' + F.n(k, 4) + ', &infin;)' : '&lt; 0, es un <b>maximo</b> y el rango es (&minus;&infin;, ' + F.n(k, 4) + ']')];
        } else {
          a = r.elige([1, 2, 3, -1, -2]); b = r.entero(-9, 9);
          var limite = -b / a;
          guiaDelPaso = G({
            intro: 'Queremos el dominio de <b>f(x) = &radic;<span class="rad">' + F.poli([a, b], 'x') + '</span></b>.<br>' +
              'Una raiz cuadrada solo existe (en los reales) si lo de adentro es <b>mayor o igual que cero</b>. ' +
              'Asi que el dominio sale de resolver una desigualdad, no una ecuacion.',
            pasos: [
              { seccion: 'Paso 1: la condicion',
                queHacemos: 'Recordamos que dentro de una raiz par no puede haber negativos.',
                paraQue: 'El 0 SI vale: &radic;0 = 0. Por eso es "mayor o IGUAL", y por eso sale una desigualdad y no una ecuacion.',
                queda: F.poli([a, b], 'x') + ' &ge; 0',
                pregunta: '&iquest;Que condicion tiene que cumplir lo de adentro de la raiz?',
                resp: R.opcion(['Que sea mayor o igual que 0', 'Que sea distinto de 0'], 0),
                pista: '&radic;<span class="rad">9</span> vale 3, pero &radic;<span class="rad">&minus;9</span> no existe en los reales. El 0 si vale: &radic;<span class="rad">0</span> = 0.',
                despues: 'Entonces hay que resolver ' + F.poli([a, b], 'x') + ' &ge; 0.' },
              { seccion: 'Paso 2: despejar',
                queHacemos: 'Pasamos el termino independiente al otro lado.',
                paraQue: 'Cambia de signo al cruzar, igual que en cualquier ecuacion.',
                queda: a + 'x &ge; ' + (-b),
                pregunta: 'Pasa el ' + b + ' al otro lado. &iquest;Que queda a la derecha?',
                resp: R.numero(-b, { dec: 2 }),
                pista: 'Cambia de signo al cruzar: queda ' + a + 'x &ge; ' + (-b) + '.',
                despues: '' },
              { seccion: 'Paso 3: el signo de la desigualdad',
                queHacemos: 'Decidimos si el sentido se voltea antes de dividir.',
                paraQue: '2 &lt; 4, pero al dividir entre &minus;1 quedan &minus;2 y &minus;4, y ahora &minus;2 es el MAYOR. Por eso se invierte.',
                queda: a > 0 ? a + 'x &ge; ' + (-b) + '  (no se voltea)' : a + 'x &ge; ' + (-b) + '  (se voltea)',
                pregunta: 'Al dividir entre un numero NEGATIVO, &iquest;que le pasa a la desigualdad?',
                resp: R.opcion(['Se voltea', 'Se queda igual'], 0),
                pista: 'Piensa en 2 &lt; 4; si divides los dos entre &minus;1 queda &minus;2 y &minus;4, y ahora &minus;2 es el MAYOR. El sentido se invierte.',
                despues: a > 0 ? 'Aqui vamos a dividir entre ' + a + ', que es positivo, asi que NO se voltea.'
                  : 'Aqui vamos a dividir entre ' + a + ', que es negativo, asi que SI se voltea.' },
              { seccion: 'Paso 4: el valor frontera',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Ese numero marca donde empieza (o acaba) el dominio.',
                queda: 'frontera ' + F.n(limite, 4),
                pregunta: 'Divide entre ' + a + '. &iquest;Cual es el valor frontera? (4 decimales)',
                resp: R.numero(limite, { dec: 4, tol: 0.01 }),
                pista: (-b) + ' &divide; ' + a + '.',
                despues: '' },
              { seccion: 'Paso 5: escribir el dominio',
                queHacemos: 'Elegimos el sentido final de la desigualdad.',
                paraQue: 'Comprobacion rapida: prueba un numero del intervalo y mira que lo de adentro salga positivo.',
                queda: 'x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4),
                pregunta: '&iquest;Como queda el dominio?',
                resp: R.opcion(['x &ge; ese valor', 'x &le; ese valor'], a > 0 ? 0 : 1),
                pista: a > 0 ? 'Como se dividio entre un positivo, el sentido se mantiene: x &ge; ' + F.n(limite, 4) + '.'
                  : 'Como se dividio entre un negativo, el sentido se voltea: x &le; ' + F.n(limite, 4) + '.',
                despues: 'Comprobacion rapida: prueba un numero del intervalo y mira que lo de adentro salga positivo.' },
              { seccion: 'Paso 6: escribir',
                queHacemos: 'Damos la frontera y el sentido.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4),
                pregunta: 'Escribe las dos respuestas.',
                resp: R.varios([
                  { etiqueta: 'Valor frontera', resp: R.numero(limite, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'El dominio es', resp: R.opcion(['x &ge; ese valor', 'x &le; ese valor'], a > 0 ? 0 : 1) }
                ]),
                pista: 'Frontera ' + F.n(limite, 4) + ', y el dominio es x ' + (a > 0 ? '&ge;' : '&le;') + ' ese valor.',
                despues: '' }
            ],
            final: 'Dominio: <b>x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4) + '</b>',
            receta: ['Dentro de una raiz par: mayor o IGUAL que cero',
              'Plantear la desigualdad y despejar',
              'Dividir entre un negativo VOLTEA la desigualdad',
              'Comprobar probando un valor del intervalo']
          });
          enun = 'Encuentra el dominio de f(x) = &radic;<span class="rad">' + F.poli([a, b], 'x') + '</span>.<br>' +
            'Da el valor frontera de x y el sentido de la desigualdad.';
          resp = R.varios([
            { etiqueta: 'Valor frontera', resp: R.numero(limite, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'El dominio es', resp: R.opcion(['x &ge; ese valor', 'x &le; ese valor'], a > 0 ? 0 : 1) }
          ]);
          pistas = ['Dentro de una raiz cuadrada no puede haber numeros negativos: plantea ' + F.poli([a, b], 'x') + ' &ge; 0.',
            'Al despejar recuerda que si divides entre un numero negativo la desigualdad se voltea.'];
          sol = [F.poli([a, b], 'x') + ' &ge; 0',
            a + 'x &ge; ' + (-b) + ' &rArr; x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4),
            'Dominio: <b>x ' + (a > 0 ? '&ge;' : '&le;') + ' ' + F.n(limite, 4) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cubica', 'Cambios de sentido en una cubica'],
          ['racional', 'Dominio de una racional'],
          ['crecimientoCuad', 'Crecimiento y valor extremo'],
          ['porTramos', 'Funcion por tramos']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cubica') {
          var m = r.entero(1, 3);
          /* f'(x) = 3m(x - p1)(x - p2). Para que los coeficientes salgan enteros,
             p1 y p2 deben tener la misma paridad. */
          var p1 = r.elige([-4, -3, -2, -1, 1, 2, 3, 4]);
          var mismos = [-4, -3, -2, -1, 1, 2, 3, 4].filter(function (v) {
            return v !== p1 && (v - p1) % 2 === 0;
          });
          var p2 = r.elige(mismos);
          var lo = Math.min(p1, p2), hi = Math.max(p1, p2);
          var f = [m, -m * 3 * (p1 + p2) / 2, m * 3 * p1 * p2, r.entero(-5, 5)];
          guiaDelPaso = G({
            intro: 'La cubica <b>f(x) = ' + P.texto(f) + '</b> sube, luego baja y luego vuelve a subir. ' +
              'Hay que encontrar los dos puntos donde da la vuelta.<br>' +
              'La idea clave: en un punto de retorno la curva se aplana un instante, ' +
              'asi que su <b>pendiente es cero</b>. Y la pendiente es la derivada.',
            pasos: [
              { seccion: 'Paso 1: la idea clave',
                queHacemos: 'Recordamos que en un punto de retorno la pendiente vale cero.',
                paraQue: 'Donde la funcion vale 0 es donde cruza el eje x, que no tiene nada que ver. Lo que marca el retorno es la DERIVADA.',
                queda: 'resolver f&prime;(x) = 0',
                pregunta: '&iquest;Donde cambia de sentido una funcion?',
                resp: R.opcion(['Donde su derivada vale 0', 'Donde la funcion vale 0'], 0),
                pista: 'Donde la funcion vale 0 es donde cruza el eje x, que no tiene nada que ver. ' +
                  'Lo que marca un cambio de subida a bajada es que la pendiente pase por cero.',
                despues: 'Asi que hay que derivar e igualar a cero.' },
              { seccion: 'Paso 2: derivar',
                queHacemos: 'Derivamos termino a termino.',
                paraQue: 'El exponente baja multiplicando y se le resta 1. La constante desaparece.',
                queda: P.texto(P.derivada(f)) + ' = 0',
                pregunta: 'Deriva f(x). &iquest;Cuanto vale f&prime;(x)?',
                resp: R.expresion(P.expr(P.derivada(f)), { mostrar: P.texto(P.derivada(f)) }),
                pista: 'Cada termino: el exponente baja multiplicando y se le resta 1. La constante desaparece. Queda ' + P.texto(P.derivada(f)) + '.',
                despues: '' },
              { seccion: 'Paso 3: resolver',
                queHacemos: 'Simplificamos y resolvemos la cuadratica.',
                paraQue: 'Simplificar antes de resolver ahorra muchisimo trabajo.',
                queda: 'x = ' + lo + ',  x = ' + hi,
                pregunta: 'Iguala a cero. Todos los coeficientes se pueden dividir entre ' + (3 * m) + ', y queda<br>' +
                  'x&sup2; ' + (-(p1 + p2) < 0 ? '&minus; ' + (p1 + p2) : '+ ' + (-(p1 + p2))) + 'x ' + (p1 * p2 < 0 ? '&minus; ' + (-(p1 * p2)) : '+ ' + (p1 * p2)) + ' = 0.<br>' +
                  'Escribe las dos soluciones separadas por coma.',
                resp: R.lista([lo, hi], { tol: 0.01, ayuda: 'Escribe los dos valores separados por coma.' }),
                pista: 'Dos numeros con producto ' + (p1 * p2) + ' y suma ' + (p1 + p2) + ': son ' + lo + ' y ' + hi + '.',
                despues: 'Simplificar antes de resolver ahorra muchisimo trabajo.' },
              { seccion: 'Paso 4: interpretar',
                queHacemos: 'Vemos que pasa en el tramo de en medio.',
                paraQue: 'Sube, baja, sube: el tramo de en medio es el que baja. En ' + lo + ' hay un maximo local y en ' + hi + ' un minimo local.',
                queda: 'x = ' + lo + ' (maximo),  x = ' + hi + ' (minimo)',
                pregunta: 'Entre esos dos valores, &iquest;que hace la funcion?',
                resp: R.opcion(['Decrece', 'Crece'], 0),
                pista: 'El enunciado lo dice: sube, baja, sube. El tramo de en medio, entre ' + lo + ' y ' + hi + ', es el que baja.',
                despues: 'En ' + lo + ' hay un maximo local y en ' + hi + ' un minimo local.' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos los dos valores.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: lo + ',  ' + hi,
                pregunta: 'Escribe los dos valores de x donde cambia de sentido.',
                resp: R.lista([lo, hi], { tol: 0.01, ayuda: 'Escribe los dos valores separados por coma.' }),
                pista: 'Son ' + lo + ' y ' + hi + '.',
                despues: '' }
            ],
            final: 'Cambia de sentido en <b>x = ' + lo + '</b> y <b>x = ' + hi + '</b>',
            receta: ['Los cambios de sentido estan donde f&prime;(x) = 0',
              'Derivar: el exponente baja multiplicando y se resta 1',
              'Simplificar dividiendo entre el factor comun antes de resolver',
              'Una cubica tiene como mucho dos cambios de sentido',
              'El primero es un maximo local y el segundo un minimo local']
          });
          enun = 'La funcion f(x) = ' + P.texto(f) + ' crece, luego decrece y luego vuelve a crecer.<br>' +
            'Encuentra los dos valores de x donde cambia de sentido.';
          resp = R.lista([lo, hi], { tol: 0.01, ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Los cambios de sentido ocurren donde f&prime;(x) = 0.',
            'f&prime;(x) = ' + P.texto(P.derivada(f)) + '. Igualala a cero y resuelve.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada(f)),
            'Igualo a cero y resuelvo la cuadratica',
            'x = <b>' + lo + '</b> y x = <b>' + hi + '</b>',
            'La funcion crece en (&minus;&infin;, ' + lo + '), decrece en (' + lo + ', ' + hi + ') y crece en (' + hi + ', &infin;)'];
        } else if (t3 === 'racional') {
          a = r.enteroNoCero(-6, 6); b = r.enteroNoCero(-6, 6);
          while (b === a) b = r.enteroNoCero(-6, 6);
          guiaDelPaso = G({
            intro: 'Hay que encontrar el dominio de una fraccion cuyo denominador es <b>' + P.texto(P.deRaices([a, b])) + '</b>.<br>' +
              'La regla es la misma de siempre (el denominador no puede ser cero), pero ahora el denominador ' +
              'es una cuadratica, asi que hay <b>dos</b> valores prohibidos en vez de uno.',
            pasos: [
              { seccion: 'Paso 1: que hay que excluir',
                queHacemos: 'Recordamos que lo prohibido es el denominador.',
                paraQue: 'El numerador puede valer 0 tranquilamente: eso solo significa que la funcion vale 0 ahi.',
                queda: 'resolver ' + P.texto(P.deRaices([a, b])) + ' = 0',
                pregunta: '&iquest;Que valores hay que excluir del dominio?',
                resp: R.opcion(['Los que hacen 0 el denominador', 'Los que hacen 0 el numerador'], 0),
                pista: 'El numerador puede valer 0 tranquilamente: eso solo significa que la funcion vale 0 ahi.',
                despues: 'Entonces hay que resolver ' + P.texto(P.deRaices([a, b])) + ' = 0.' },
              { seccion: 'Paso 2: factorizar',
                queHacemos: 'Factorizamos la cuadratica del denominador.',
                paraQue: 'Factorizada, se ve de un vistazo que dos valores la anulan.',
                queda: '(x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ') = 0',
                pregunta: 'Factoriza el denominador: busca dos numeros con PRODUCTO ' + (a * b) + ' y SUMA ' + (-(a + b)) + '.<br>Escribelos separados por coma.',
                resp: R.lista([-a, -b], { ayuda: 'Los dos numeros, separados por coma.' }),
                pista: 'Son ' + (-a) + ' y ' + (-b) + '.',
                despues: 'Queda (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ').' },
              { seccion: 'Paso 3: los prohibidos',
                queHacemos: 'Sacamos los dos valores prohibidos.',
                paraQue: 'Salen con el signo contrario al que se ve. En la grafica hay dos asintotas verticales.',
                queda: 'excluir x = ' + a + '  y  x = ' + b,
                pregunta: 'Iguala cada factor a cero.<br>&iquest;Que dos valores hay que excluir? (separados por coma)',
                resp: R.lista([a, b], { ayuda: 'Escribe los dos valores separados por coma.' }),
                pista: 'De cada parentesis sale uno, con el signo contrario al que se ve: ' + a + ' y ' + b + '.',
                despues: 'El dominio son todos los reales MENOS esos dos; en la grafica hay dos asintotas verticales.' }
            ],
            final: 'Hay que excluir <b>x = ' + a + '</b> y <b>x = ' + b + '</b>',
            receta: ['El denominador nunca puede ser cero',
              'Factorizar el denominador',
              'Igualar cada factor a cero',
              'Se excluyen esos valores y se queda todo lo demas',
              'Cada exclusion suele ser una asintota vertical']
          });
          enun = 'Encuentra el dominio de f(x) = ' + F.frac('x + ' + r.entero(1, 9), P.texto(P.deRaices([a, b]))) + '.<br>' +
            'Da los dos valores que hay que excluir.';
          resp = R.lista([a, b], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Hay que excluir las raices del denominador.',
            'Factoriza ' + P.texto(P.deRaices([a, b])) + ' e iguala cada factor a cero.'];
          sol = ['Denominador: ' + P.texto(P.deRaices([a, b])) + ' = (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ')',
            'Se anula en x = ' + a + ' y x = ' + b,
            'Dominio: todos los reales excepto <b>' + a + '</b> y <b>' + b + '</b>'];
        } else {
          a = r.enteroNoCero(-3, 3); b = r.entero(-12, 12); c = r.entero(-9, 9);
          h = -b / (2 * a);
          var cero1 = null;
          guiaDelPaso = G({
            intro: 'De <b>f(x) = ' + P.texto([a, b, c]) + '</b> queremos donde cambia de sentido, donde crece y su valor extremo.<br>' +
              'Se puede hacer con la formula del vertice, pero vamos por el camino que sirve para CUALQUIER funcion: ' +
              'la <b>derivada</b>. Donde la derivada vale cero, la curva se aplana y da la vuelta.',
            pasos: [
              { seccion: 'Paso 1: derivar',
                queHacemos: 'Derivamos la cuadratica.',
                paraQue: 'Se podria usar la formula del vertice, pero la derivada sirve para CUALQUIER funcion, no solo parabolas.',
                queda: P.texto(P.derivada([a, b, c])) + ' = 0',
                pregunta: 'Deriva la funcion. &iquest;Cuanto vale f&prime;(x)?',
                resp: R.expresion(P.expr(P.derivada([a, b, c])), { mostrar: P.texto(P.derivada([a, b, c])) }),
                pista: 'El termino ' + a + 'x&sup2; da ' + (2 * a) + 'x, el termino ' + b + 'x da ' + b + ', y la constante desaparece.',
                despues: 'La derivada es la pendiente de la curva en cada punto.' },
              { seccion: 'Paso 2: donde se aplana',
                queHacemos: 'Resolvemos la ecuacion.',
                paraQue: 'Compruebalo: coincide con &minus;b/2a. Es la misma cosa por otro camino.',
                queda: 'x = ' + F.n(h, 4) + ';  faltan el intervalo y el extremo',
                pregunta: 'Iguala f&prime;(x) = 0 y despeja x. (4 decimales)',
                resp: R.numero(h, { dec: 4, tol: 0.01 }),
                pista: (2 * a) + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b) + ' = 0 &rArr; x = ' + (-b) + ' &divide; ' + (2 * a) + '.',
                despues: 'Compruebalo: coincide con la formula del vertice, &minus;b/2a. Es la misma cosa.' },
              { seccion: 'Paso 3: donde crece',
                queHacemos: 'Decidimos de que lado del vertice sube la curva.',
                paraQue: 'Otra forma de verlo: donde f&prime;(x) es positiva, la funcion crece.',
                queda: 'x = ' + F.n(h, 4) + ',  crece en ' + (a > 0 ? '(x, &infin;)' : '(&minus;&infin;, x)') + ';  falta el extremo',
                pregunta: 'Como a = ' + a + ', la parabola abre hacia ' + (a > 0 ? 'arriba' : 'abajo') + '.<br>&iquest;En que intervalo CRECE?',
                resp: R.opcion(['(&minus;&infin;, x)', '(x, &infin;)'], a > 0 ? 1 : 0),
                pista: a > 0 ? 'Abriendo hacia arriba, primero baja hasta el vertice y despues sube: crece a la DERECHA.'
                  : 'Abriendo hacia abajo, primero sube hasta el vertice y despues baja: crece a la IZQUIERDA.',
                despues: 'Otra forma de verlo: donde f&prime;(x) es positiva, la funcion crece.' },
              { seccion: 'Paso 4: el valor extremo',
                queHacemos: 'Sustituimos esa x en la funcion.',
                paraQue: 'En la funcion ORIGINAL, no en la derivada. Es el error tipico aqui.',
                queda: 'x = ' + F.n(h, 4) + ',  crece en ' + (a > 0 ? '(x, &infin;)' : '(&minus;&infin;, x)') + ',  extremo ' + F.n(P.evalua([a, b, c], h), 4),
                pregunta: 'Calcula el valor extremo, f(' + F.n(h, 4) + '). (4 decimales)',
                resp: R.numero(P.evalua([a, b, c], h), { dec: 4, tol: 0.01 }),
                pista: 'Sustituye ese valor de x en la funcion ORIGINAL, no en la derivada.',
                despues: 'Es un ' + (a > 0 ? 'minimo' : 'maximo') + '.' },
              { seccion: 'Paso 5: escribir',
                queHacemos: 'Damos las tres respuestas.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: 'x = ' + F.n(h, 4) + ',  crece en ' + (a > 0 ? '(x, &infin;)' : '(&minus;&infin;, x)') + ',  extremo ' + F.n(P.evalua([a, b, c], h), 4),
                pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'x del cambio', resp: R.numero(h, { dec: 4, tol: 0.01 }) },
                  { etiqueta: 'Crece en', resp: R.opcion(['(&minus;&infin;, x)', '(x, &infin;)'], a > 0 ? 1 : 0) },
                  { etiqueta: 'Valor extremo f(x)', resp: R.numero(P.evalua([a, b, c], h), { dec: 4, tol: 0.01 }) }
                ]),
                pista: 'x = ' + F.n(h, 4) + ', crece en ' + (a > 0 ? '(x, &infin;)' : '(&minus;&infin;, x)') +
                  ' y el extremo vale ' + F.n(P.evalua([a, b, c], h), 4) + '.',
                despues: '' }
            ],
            final: 'Cambia en x = <b>' + F.n(h, 4) + '</b>, con valor extremo <b>' + F.n(P.evalua([a, b, c], h), 4) + '</b>',
            receta: ['Derivar e igualar a cero para hallar el cambio de sentido',
              'En una cuadratica coincide con &minus;b/2a',
              'a &gt; 0: decrece y luego crece. a &lt; 0: al reves',
              'El valor extremo se calcula en la funcion ORIGINAL',
              'Donde f&prime; &gt; 0 la funcion crece; donde f&prime; &lt; 0 decrece']
          });
          enun = 'Para f(x) = ' + P.texto([a, b, c]) + ' indica:<br>' +
            'el valor de x donde cambia de crecer a decrecer (o al reves), en que intervalo CRECE y el valor extremo.';
          resp = R.varios([
            { etiqueta: 'x del cambio', resp: R.numero(h, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Crece en', resp: R.opcion(['(&minus;&infin;, x)', '(x, &infin;)'], a > 0 ? 1 : 0) },
            { etiqueta: 'Valor extremo f(x)', resp: R.numero(P.evalua([a, b, c], h), { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['Deriva: f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' y encuentra donde vale cero.',
            'f&prime;(x) = 0 en x = ' + F.n(h, 4) + '. El signo de a dice hacia donde abre.'];
          sol = ['f&prime;(x) = ' + P.texto(P.derivada([a, b, c])) + ' = 0 &rArr; x = <b>' + F.n(h, 4) + '</b>',
            'Como a = ' + a + ' ' + (a > 0 ? '&gt; 0, f decrece antes y <b>crece despues</b>' : '&lt; 0, f crece antes y decrece despues'),
            'Valor extremo: f(' + F.n(h, 4) + ') = <b>' + F.n(P.evalua([a, b, c], h), 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
