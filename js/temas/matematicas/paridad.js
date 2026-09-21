/* Funciones pares e impares */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  var TIPOS = ['Par (simetrica respecto al eje y)', 'Impar (simetrica respecto al origen)', 'Ni par ni impar'];

  var G = EJ.guia.armar;

  var extra = {};

  extra.desdeTabla = function (r) {
    var tipo = r.entero(0, 2);
    var v1 = r.enteroNoCero(-9, 9), v2 = r.enteroNoCero(-9, 9);
    var f = {};
    if (tipo === 0) { f = { m2: v1, m1: v2, p1: v2, p2: v1 }; }        // par
    else if (tipo === 1) { f = { m2: -v1, m1: -v2, p1: v2, p2: v1 }; } // impar
    else { f = { m2: v1, m1: v2, p1: v2 + r.elige([1, -1, 2]), p2: v1 }; }
    var fila = function (k) { return '<td>' + f[k] + '</td>'; };
    function comp(u, w) { return u === w ? 0 : (u === -w ? 1 : 2); }
    var COMPS = ['Iguales', 'Opuestos (mismo numero con el signo cambiado)', 'Ni iguales ni opuestos'];
    return {
      guia: G({
        intro: 'Hay que clasificar la funcion viendo solo una <b>tabla de valores</b>, sin formula.<br>' +
          'Se puede, porque la paridad es una simetria: basta con comparar cada valor negativo de x con su positivo. ' +
          'Si f(&minus;x) coincide con f(x) es par; si sale el opuesto, impar.',
        pasos: [
          { seccion: 'Paso 1: primera pareja',
            queHacemos: 'Comparamos el valor en &minus;2 con el valor en 2.',
            paraQue: 'La paridad es una simetria: basta con emparejar cada x negativo con su positivo. No hace falta formula.',
            queda: COMPS[comp(f.m2, f.p2)],
            pregunta: 'Compara f(&minus;2) = ' + f.m2 + ' con f(2) = ' + f.p2 + '.<br>&iquest;Como son entre si?',
            resp: R.opcion(COMPS, comp(f.m2, f.p2)),
            pista: 'Iguales significa el mismo numero con el mismo signo. Opuestos significa el mismo numero con el signo cambiado.',
            despues: '' },
          { seccion: 'Paso 2: segunda pareja',
            queHacemos: 'Repetimos con la otra pareja de la tabla.',
            paraQue: 'Una sola pareja no basta: hay que ver si el patron se repite en todas.',
            queda: COMPS[comp(f.m2, f.p2)] + '  y  ' + COMPS[comp(f.m1, f.p1)],
            pregunta: 'Ahora la otra pareja: f(&minus;1) = ' + f.m1 + ' contra f(1) = ' + f.p1 + '.',
            resp: R.opcion(COMPS, comp(f.m1, f.p1)),
            pista: 'Mismo criterio que antes.',
            despues: comp(f.m2, f.p2) === comp(f.m1, f.p1)
              ? 'Las dos parejas se comportan igual, asi que el patron es consistente.'
              : 'Cuidado: las dos parejas NO se comportan igual.' },
          { seccion: 'Paso 3: la regla',
            queHacemos: 'Decidimos si una coincidencia suelta es suficiente.',
            paraQue: 'No lo es: la simetria tiene que cumplirse en TODOS los puntos. Si una sola pareja falla, ya no es par ni impar.',
            queda: tipo === 0 ? 'todas iguales' : (tipo === 1 ? 'todas opuestas' : 'no se cumple en todas'),
            pregunta: '&iquest;Basta con que UNA pareja cumpla la simetria?',
            resp: R.opcion(['No, se tiene que cumplir para TODOS los valores', 'Si, con una basta'], 0),
            pista: 'Par o impar es una propiedad de toda la funcion. Si falla en un solo punto, ya no lo es.',
            despues: tipo === 2 ? 'Y aqui justo falla en una de las parejas, por eso no sera ni par ni impar.' : '' },
          { seccion: 'Paso 4: clasificar',
            queHacemos: 'Damos la clasificacion.',
            paraQue: 'Valores iguales: par (espejo en el eje y). Valores opuestos: impar (giro de 180&deg; en el origen).',
            queda: TIPOS[tipo].split(' (')[0].toLowerCase(),
            pregunta: 'Clasifica la funcion.',
            resp: R.opcion(TIPOS, tipo),
            pista: tipo === 0 ? 'Todos los valores coinciden: f(&minus;x) = f(x).'
              : tipo === 1 ? 'Todos los valores salen opuestos: f(&minus;x) = &minus;f(x).'
                : 'No se cumple ninguna de las dos condiciones en todos los puntos.',
            despues: '' }
        ],
        final: 'Es <b>' + TIPOS[tipo].split(' (')[0].toLowerCase() + '</b>',
        receta: ['Emparejar cada x negativo con su positivo',
          'Valores iguales: par (simetria respecto al eje y)',
          'Valores opuestos: impar (simetria respecto al origen)',
          'Tiene que cumplirse en TODAS las parejas, no en una',
          'Si falla en alguna: ni par ni impar']
      }),
      enunciado: 'Con esta tabla de valores de f(x), clasifica la funcion:' +
        '<table class="tabla"><tr><th>x</th><td>&minus;2</td><td>&minus;1</td><td>1</td><td>2</td></tr>' +
        '<tr><th>f(x)</th>' + fila('m2') + fila('m1') + fila('p1') + fila('p2') + '</tr></table>',
      respuesta: R.opcion(TIPOS, tipo),
      pistas: ['Compara f(&minus;2) con f(2) y f(&minus;1) con f(1).',
        'Si son iguales es par; si son opuestos (mismo numero con signo cambiado) es impar.'],
      solucion: ['f(&minus;2) = ' + f.m2 + ' y f(2) = ' + f.p2,
        'f(&minus;1) = ' + f.m1 + ' y f(1) = ' + f.p1,
        tipo === 0 ? 'Los valores coinciden &rArr; f(&minus;x) = f(x): es <b>par</b>'
          : tipo === 1 ? 'Los valores son opuestos &rArr; f(&minus;x) = &minus;f(x): es <b>impar</b>'
            : 'No son ni iguales ni opuestos: <b>no es par ni impar</b>']
    };
  };

  EJ.tema({
    id: 'paridad',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Funciones pares e impares',
    descripcion: 'Clasificar funciones segun su simetria usando f(&minus;x).',
    formulario: 'Par: f(&minus;x) = f(x) (simetria respecto al eje y). Ejemplos: x&sup2;, cos x, |x|<br>' +
      'Impar: f(&minus;x) = &minus;f(x) (simetria respecto al origen). Ejemplos: x&sup3;, sen x, 1/x<br>' +
      'Si no cumple ninguna, no es par ni impar. par&middot;par = par, impar&middot;impar = par, par&middot;impar = impar.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, idx, texto;

      if (dif === 'facil') {
        var casos = [
          { f: 'x&sup2;', t: 0, por: 'todos los exponentes son pares' },
          { f: 'x&sup3;', t: 1, por: 'el exponente es impar' },
          { f: 'x&sup4;', t: 0, por: 'todos los exponentes son pares' },
          { f: 'x&sup5;', t: 1, por: 'el exponente es impar' },
          { f: 'x&sup2; + 3', t: 0, por: 'solo hay potencias pares (la constante cuenta como x&#8304;)' },
          { f: 'x&sup3; &minus; x', t: 1, por: 'todos los exponentes son impares' },
          { f: 'x + 2', t: 2, por: 'mezcla un exponente impar con una constante' },
          { f: 'x&sup2; + x', t: 2, por: 'mezcla exponentes pares e impares' },
          { f: '|x|', t: 0, por: 'el valor absoluto ignora el signo' },
          { f: 'cos x', t: 0, por: 'cos(&minus;x) = cos x' },
          { f: 'sen x', t: 1, por: 'sen(&minus;x) = &minus;sen x' },
          { f: '1/x', t: 1, por: '1/(&minus;x) = &minus;(1/x)' }
        ];
        var tf = r.subtema([
          ['basicas', 'Funciones basicas'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var caso = r.elige(casos);
        guiaDelPaso = G({
          intro: 'Hay que clasificar <b>f(x) = ' + caso.f + '</b> como par, impar o ninguna.<br>' +
            'No se adivina mirando la grafica: hay una prueba algebraica. Se sustituye x por &minus;x ' +
            'y se compara el resultado con la funcion original.',
          pasos: [
            { seccion: 'Paso 1: la prueba',
              queHacemos: 'Recordamos cual es la prueba algebraica.',
              paraQue: 'Par e impar hablan de SIMETRIA, no del signo de la funcion. Nada que ver con que la funcion sea positiva.',
              queda: 'calcular f(&minus;x) y compararlo',
              pregunta: '&iquest;Cual es la prueba para saber si es par o impar?',
              resp: R.opcion(['Calcular f(&minus;x) y compararlo con f(x) y con &minus;f(x)',
                'Ver si la funcion toma valores positivos o negativos'], 0),
              pista: 'Par e impar hablan de SIMETRIA, no del signo de la funcion. Nada que ver con que la funcion sea positiva.',
              despues: 'Par significa f(&minus;x) = f(x); impar significa f(&minus;x) = &minus;f(x).' },
            { seccion: 'Paso 2: sustituir',
              queHacemos: 'Cambiamos x por &minus;x y vemos que sale.',
              paraQue: 'Aqui ' + caso.por + '.',
              queda: ['queda igual', 'queda con todos los signos cambiados', 'no queda ni una cosa ni la otra'][caso.t],
              pregunta: 'Sustituye x por &minus;x en ' + caso.f + '.<br>&iquest;Que resulta?',
              resp: R.opcion(['f(&minus;x) = f(x), queda igual',
                'f(&minus;x) = &minus;f(x), queda todo con el signo cambiado',
                'No queda ni una cosa ni la otra'], caso.t),
              pista: 'Aqui ' + caso.por + '.',
              despues: '' },
            { seccion: 'Paso 3: clasificar',
              queHacemos: 'Traducimos el resultado.',
              paraQue: 'f(&minus;x) = f(x) es par (espejo en el eje y); f(&minus;x) = &minus;f(x) es impar (giro de 180&deg;).',
              queda: TIPOS[caso.t].split(' (')[0].toLowerCase(),
              pregunta: 'Entonces, &iquest;como se clasifica?',
              resp: R.opcion(TIPOS, caso.t),
              pista: caso.t === 0 ? 'f(&minus;x) = f(x) es la definicion de par: la grafica es un espejo respecto al eje y.'
                : caso.t === 1 ? 'f(&minus;x) = &minus;f(x) es la definicion de impar: la grafica gira 180&deg; alrededor del origen.'
                  : 'Si no cumple ninguna de las dos, no es par ni impar. La mayoria de las funciones estan en este caso.',
              despues: '' }
          ],
          final: 'f(x) = ' + caso.f + ' es <b>' + TIPOS[caso.t].split(' (')[0].toLowerCase() + '</b>',
          receta: ['Sustituir x por &minus;x',
            'Si queda igual: par (espejo en el eje y)',
            'Si queda todo con el signo cambiado: impar (simetria en el origen)',
            'Si no pasa ninguna de las dos: ni par ni impar',
            'Atajo en polinomios: todos los exponentes pares &rarr; par; todos impares &rarr; impar']
        });
        enun = 'Clasifica la funcion f(x) = ' + caso.f;
        resp = R.opcion(TIPOS, caso.t);
        pistas = ['Calcula f(&minus;x) y comparalo con f(x) y con &minus;f(x).',
          'Pista rapida: ' + caso.por + '.'];
        sol = ['Sustituyo x por &minus;x en f(x) = ' + caso.f,
          caso.t === 0 ? 'Resulta f(&minus;x) = f(x), porque ' + caso.por : caso.t === 1 ? 'Resulta f(&minus;x) = &minus;f(x), porque ' + caso.por : 'f(&minus;x) no es igual a f(x) ni a &minus;f(x), porque ' + caso.por,
          'Es <b>' + TIPOS[caso.t].split(' (')[0].toLowerCase() + '</b>'];
      } else if (dif === 'medio') {
        var tm = r.subtema([
          ['polinomio', 'Polinomios'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[tm]) return extra[tm](r, dif);
        var tipo = r.entero(0, 2);
        var coefs;
        if (tipo === 0) {        // solo potencias pares
          coefs = [r.enteroNoCero(-5, 5), 0, r.enteroNoCero(-7, 7), 0, r.enteroNoCero(-9, 9)];
        } else if (tipo === 1) { // solo potencias impares
          coefs = [r.enteroNoCero(-5, 5), 0, r.enteroNoCero(-7, 7), 0];
        } else {                 // mezcla
          coefs = [r.enteroNoCero(-5, 5), r.enteroNoCero(-4, 4), r.enteroNoCero(-7, 7), 0];
        }
        texto = P.texto(coefs);
        guiaDelPaso = EJ.guia.paridad(coefs, TIPOS);
        enun = 'Clasifica la funcion f(x) = ' + texto;
        resp = R.opcion(TIPOS, tipo);
        pistas = ['Fijate en los exponentes que aparecen realmente en la expresion.',
          'Si TODOS son pares la funcion es par; si TODOS son impares es impar; si hay de los dos, no es ni par ni impar.'];
        sol = ['Exponentes presentes: ' + coefs.map(function (c, i) { return c ? (coefs.length - 1 - i) : null; }).filter(function (x) { return x !== null; }).join(', '),
          tipo === 0 ? 'Todos son pares &rArr; f(&minus;x) = f(x)' : tipo === 1 ? 'Todos son impares &rArr; f(&minus;x) = &minus;f(x)' : 'Hay exponentes pares e impares mezclados',
          'Es <b>' + TIPOS[tipo].split(' (')[0].toLowerCase() + '</b>'];
      } else {
        var t2 = r.subtema([
          ['producto', 'Producto de funciones'],
          ['calcularFmenosX', 'Calcular f(&minus;x)'],
          ['trigonometrica', 'Con funciones trigonometricas'],
          ['desdeTabla', 'Desde una tabla de valores']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'producto') {
          var piezas = [
            { f: 'x&sup2;', p: 0 }, { f: 'x&sup3;', p: 1 }, { f: 'x&#8308;', p: 0 },
            { f: 'sen x', p: 1 }, { f: 'cos x', p: 0 }, { f: 'x', p: 1 }, { f: '|x|', p: 0 }
          ];
          var A = r.elige(piezas), B = r.elige(piezas);
          var resultado = (A.p + B.p) % 2 === 0 ? 0 : 1;
          guiaDelPaso = G({
            intro: 'Hay que clasificar el producto <b>(' + A.f + ')(' + B.f + ')</b>.<br>' +
              'No hace falta multiplicar nada ni sustituir &minus;x en toda la expresion: ' +
              'basta con clasificar cada factor por separado y aplicar una regla de combinacion ' +
              'que funciona igual que la de los signos.',
            pasos: [
              { seccion: 'Paso 1: clasificar cada factor',
                queHacemos: 'Clasificamos el primer factor por separado.',
                paraQue: 'No hace falta multiplicar nada: basta con clasificar cada pieza y combinarlas.',
                queda: A.f + ' es ' + (A.p ? 'impar' : 'par') + ';  ' + B.f + ' = ?',
                pregunta: '&iquest;Que paridad tiene ' + A.f + '?',
                resp: R.opcion(['Par', 'Impar'], A.p ? 1 : 0),
                pista: 'Las potencias siguen a su exponente (x&sup2; par, x&sup3; impar), cos es par, sen es impar, |x| es par.',
                despues: '' },
              { seccion: 'Paso 1: clasificar cada factor',
                queHacemos: 'Ahora el segundo.',
                paraQue: 'Con los dos clasificados ya se puede aplicar la regla.',
                queda: A.f + ' es ' + (A.p ? 'impar' : 'par') + ';  ' + B.f + ' es ' + (B.p ? 'impar' : 'par'),
                pregunta: '&iquest;Y ' + B.f + '?',
                resp: R.opcion(['Par', 'Impar'], B.p ? 1 : 0),
                pista: 'Mismo criterio.',
                despues: 'Ya tenemos las dos piezas.' },
              { seccion: 'Paso 2: la regla',
                queHacemos: 'Recordamos como se combinan en un producto.',
                paraQue: 'Funciona igual que la regla de los signos: par&middot;par = par, impar&middot;impar = par, par&middot;impar = impar.',
                queda: (A.p ? 'impar' : 'par') + ' &middot; ' + (B.p ? 'impar' : 'par') + ' = ?',
                pregunta: '&iquest;Cual es la regla del producto?',
                resp: R.opcion(['par &middot; par = par, impar &middot; impar = par, par &middot; impar = impar',
                  'El producto de dos funciones siempre es par'], 0),
                pista: 'Funciona como los signos al multiplicar: dos iguales dan par, dos distintos dan impar. ' +
                  'Viene de que los signos de menos se multiplican entre si.',
                despues: '' },
              { seccion: 'Paso 3: aplicarla',
                queHacemos: 'Combinamos las dos paridades.',
                paraQue: 'Ojo: esto vale para el PRODUCTO. En una suma no funciona igual.',
                queda: TIPOS[resultado].split(' (')[0].toLowerCase(),
                pregunta: 'Aplica la regla: ' + (A.p ? 'impar' : 'par') + ' &middot; ' + (B.p ? 'impar' : 'par') + '.<br>&iquest;Como queda el producto?',
                resp: R.opcion(TIPOS, resultado),
                pista: (A.p ? 'impar' : 'par') + ' por ' + (B.p ? 'impar' : 'par') + ' da ' + (resultado ? 'impar' : 'par') + '.',
                despues: 'Ojo: esta regla vale para PRODUCTOS. En una suma es distinto: solo hay simetria si los dos sumandos la comparten.' }
            ],
            final: 'El producto es <b>' + (resultado ? 'impar' : 'par') + '</b>',
            receta: ['Clasificar cada factor por separado',
              'par &middot; par = par',
              'impar &middot; impar = par',
              'par &middot; impar = impar',
              'Funciona como la regla de los signos']
          });
          enun = 'Clasifica la funcion f(x) = (' + A.f + ')(' + B.f + ')';
          resp = R.opcion(TIPOS, resultado);
          pistas = ['Clasifica cada factor por separado y usa las reglas del producto.',
            'par &middot; par = par, impar &middot; impar = par, par &middot; impar = impar.'];
          sol = [A.f + ' es ' + (A.p ? 'impar' : 'par') + ' y ' + B.f + ' es ' + (B.p ? 'impar' : 'par'),
            (A.p ? 'impar' : 'par') + ' &middot; ' + (B.p ? 'impar' : 'par') + ' = ' + (resultado ? 'impar' : 'par'),
            'Es <b>' + (resultado ? 'impar' : 'par') + '</b>'];
        } else if (t2 === 'calcularFmenosX') {
          var a = r.enteroNoCero(-5, 5), b = r.enteroNoCero(-6, 6), c = r.enteroNoCero(-7, 7);
          var f = [a, b, c, 0];   // ax^3 + bx^2 + cx
          guiaDelPaso = G({
            intro: 'Con <b>f(x) = ' + P.texto(f) + '</b> hay que escribir <b>f(&minus;x)</b> ya simplificada.<br>' +
              'Es el calculo que hay detras de toda la teoria de paridad. Todo se reduce a saber que le pasa ' +
              'al signo de cada potencia cuando la base es negativa.',
            pasos: [
              { seccion: 'Paso 1: los signos de las potencias',
                queHacemos: 'Vemos que pasa con un exponente impar.',
                paraQue: 'Son tres signos de menos multiplicados: queda negativo.',
                queda: 'f(&minus;x) = ' + (-a) + 'x&sup3; + ?x&sup2; + ?x',
                pregunta: '&iquest;Cuanto vale (&minus;x)&sup3;?',
                resp: R.opcion(['&minus;x&sup3;', 'x&sup3;'], 0),
                pista: 'Son tres signos de menos multiplicados: (&minus;)(&minus;)(&minus;) = &minus;. Exponente impar, se queda negativo.',
                despues: '' },
              { seccion: 'Paso 1: los signos de las potencias',
                queHacemos: 'Ahora con un exponente par.',
                paraQue: 'Regla general: los terminos de grado IMPAR cambian de signo y los de grado PAR se quedan igual.',
                queda: 'f(&minus;x) = ' + (-a) + 'x&sup3; + ' + b + 'x&sup2; + ?x',
                pregunta: '&iquest;Y (&minus;x)&sup2;?',
                resp: R.opcion(['x&sup2;', '&minus;x&sup2;'], 0),
                pista: 'Dos signos de menos se cancelan. Exponente par, sale positivo.',
                despues: 'Regla general: los terminos de grado IMPAR cambian de signo y los de grado PAR se quedan igual.' },
              { seccion: 'Paso 2: armar f(&minus;x)',
                queHacemos: 'Aplicamos la regla a cada termino.',
                paraQue: 'Asi queda la funcion completa evaluada en &minus;x, lista para comparar.',
                queda: 'f(&minus;x) = ' + P.texto([-a, b, -c, 0]),
                pregunta: 'Aplicalo a los tres terminos y escribe f(&minus;x) simplificada.',
                resp: R.expresion('(' + (-a) + ')*x^3+(' + b + ')*x^2+(' + (-c) + ')*x', {
                  mostrar: P.texto([-a, b, -c, 0]) }),
                pista: 'El ' + a + 'x&sup3; pasa a ' + (-a) + 'x&sup3;, el ' + b + 'x&sup2; se queda igual y el ' + c + 'x pasa a ' + (-c) + 'x. Queda ' + P.texto([-a, b, -c, 0]) + '.',
                despues: '' },
              { seccion: 'Paso 3: comparar',
                queHacemos: 'Ponemos f(&minus;x) al lado de f(x).',
                paraQue: 'Para ser par tendria que quedar identica; para impar, TODOS los signos cambiados. Aqui unos cambiaron y otros no.',
                queda: TIPOS[2].split(' (')[0].toLowerCase(),
                pregunta: 'Comparando f(&minus;x) con f(x), &iquest;que se puede concluir?',
                resp: R.opcion(TIPOS, 2),
                pista: 'Para ser par tendria que quedar identica, y para ser impar tendrian que haber cambiado TODOS los signos. ' +
                  'Aqui unos cambiaron y otros no.',
                despues: 'Es lo que pasa siempre que un polinomio mezcla exponentes pares e impares.' }
            ],
            final: 'f(&minus;x) = <b>' + P.texto([-a, b, -c, 0]) + '</b>',
            receta: ['Sustituir x por (&minus;x), con parentesis',
              '(&minus;x) elevado a exponente PAR: se queda positivo',
              'Elevado a exponente IMPAR: cambia de signo',
              'Comparar el resultado con f(x) y con &minus;f(x)',
              'Si mezcla pares e impares, no es ni par ni impar']
          });
          enun = 'Si f(x) = ' + P.texto(f) + ', escribe f(&minus;x) simplificada.';
          resp = R.expresion('(' + (-a) + ')*x^3+(' + b + ')*x^2+(' + (-c) + ')*x', {
            mostrar: P.texto([-a, b, -c, 0])
          });
          pistas = ['Sustituye x por (&minus;x) y recuerda que (&minus;x)&sup2; = x&sup2; pero (&minus;x)&sup3; = &minus;x&sup3;.',
            'Los terminos de grado impar cambian de signo y los de grado par se quedan igual.'];
          sol = ['(&minus;x)&sup3; = &minus;x&sup3;, (&minus;x)&sup2; = x&sup2;, (&minus;x) = &minus;x',
            'f(&minus;x) = ' + a + '(&minus;x&sup3;) + ' + b + '(x&sup2;) + ' + c + '(&minus;x)',
            'f(&minus;x) = <b>' + P.texto([-a, b, -c, 0]) + '</b>',
            'Como no coincide con f(x) ni con &minus;f(x), la funcion no es par ni impar'];
        } else {
          var casos2 = [
            { f: 'x&sup2; sen x', t: 1 },
            { f: 'x cos x', t: 1 },
            { f: 'x sen x', t: 0 },
            { f: 'sen x cos x', t: 1 },
            { f: 'x&sup2; cos x', t: 0 },
            { f: 'x&sup3; sen x', t: 0 },
            { f: 'sen x + x', t: 1 },
            { f: 'cos x + x&sup2;', t: 0 },
            { f: 'sen x + 1', t: 2 },
            { f: 'cos x + x', t: 2 }
          ];
          var cs = r.elige(casos2);
          guiaDelPaso = G({
            intro: 'Hay que clasificar <b>f(x) = ' + cs.f + '</b>.<br>' +
              'Aqui se mezclan potencias con funciones trigonometricas. La estrategia es la de siempre: ' +
              'clasificar cada pieza y combinarlas, pero cuidado, porque <b>sumar y multiplicar se comportan distinto</b>.',
            pasos: [
              { seccion: 'Paso 1: clasificar las piezas',
                queHacemos: 'Clasificamos el seno.',
                paraQue: 'sen(&minus;x) = &minus;sen x: su grafica es simetrica respecto al origen.',
                queda: 'sen impar;  cos = ?',
                pregunta: '&iquest;Que paridad tiene sen x?',
                resp: R.opcion(['Impar', 'Par'], 0),
                pista: 'sen(&minus;x) = &minus;sen x. Su grafica es simetrica respecto al origen.',
                despues: '' },
              { seccion: 'Paso 1: clasificar las piezas',
                queHacemos: 'Ahora el coseno.',
                paraQue: 'Truco para acordarse: el coseno "no se entera" del signo, el seno si.',
                queda: 'sen impar,  cos par',
                pregunta: '&iquest;Y cos x?',
                resp: R.opcion(['Par', 'Impar'], 0),
                pista: 'cos(&minus;x) = cos x. Su grafica es un espejo en el eje y.',
                despues: 'Truco para acordarse: el coseno "no se entera" del signo, el seno si.' },
              { seccion: 'Paso 2: producto o suma',
                queHacemos: 'Miramos si las piezas se multiplican o se suman.',
                paraQue: 'En un producto se combinan como los signos. En una SUMA solo hay simetria si todos los sumandos la comparten.',
                queda: 'f(x) = ' + cs.f + ' es ?',
                pregunta: '&iquest;Como se combinan las piezas?',
                resp: R.opcion(['En un producto se combinan como los signos; en una SUMA solo hay simetria si todos los sumandos la comparten',
                  'Siempre se combinan igual, se sumen o se multipliquen'], 0),
                pista: 'x&sup2; (par) por sen x (impar) da impar. Pero x&sup2; + sen x no es ni par ni impar, ' +
                  'porque cada sumando tiene una simetria distinta y no se puede quedar con las dos.',
                despues: 'Por eso hay que mirar primero si es producto o suma.' },
              { seccion: 'Paso 3: clasificar',
                queHacemos: 'Aplicamos la regla que toca.',
                paraQue: 'Si se mezclan simetrias distintas en una suma, no cumple ninguna de las dos.',
                queda: TIPOS[cs.t].split(' (')[0].toLowerCase(),
                pregunta: 'Clasifica f(x) = ' + cs.f,
                resp: R.opcion(TIPOS, cs.t),
                pista: cs.t === 0 ? 'Todo junto cumple f(&minus;x) = f(x).'
                  : cs.t === 1 ? 'Todo junto cumple f(&minus;x) = &minus;f(x).'
                    : 'Se mezclan simetrias distintas en una suma, asi que no cumple ninguna.',
                despues: '' }
            ],
            final: 'Es <b>' + TIPOS[cs.t].split(' (')[0].toLowerCase() + '</b>',
            receta: ['sen es impar, cos es par',
              'Las potencias siguen a su exponente',
              'En productos: dos iguales dan par, distintos dan impar',
              'En sumas: solo hay simetria si TODOS los sumandos la tienen',
              'Una constante suelta cuenta como par']
          });
          enun = 'Clasifica la funcion f(x) = ' + cs.f;
          resp = R.opcion(TIPOS, cs.t);
          pistas = ['Recuerda: sen es impar, cos es par, x<sup>n</sup> es par si n es par.',
            'En un producto se suman las paridades; en una suma, solo es par (o impar) si TODOS los sumandos lo son.'];
          sol = ['Analizo cada parte: sen x es impar, cos x es par, las potencias siguen su exponente',
            cs.t === 0 ? 'Todo junto cumple f(&minus;x) = f(x)' : cs.t === 1 ? 'Todo junto cumple f(&minus;x) = &minus;f(x)' : 'Se mezclan simetrias distintas, asi que no cumple ninguna de las dos condiciones',
            'Es <b>' + TIPOS[cs.t].split(' (')[0].toLowerCase() + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
