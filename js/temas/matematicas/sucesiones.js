/* Sucesiones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function lista(v) { return v.join(', ') + ', &hellip;'; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.figuras = function (r) {
    var inicio = r.entero(3, 8), paso = r.entero(2, 6), k = r.entero(7, 20);
    var objeto = r.elige(['palillos', 'cuadritos', 'puntos', 'fichas']);
    var val = inicio + (k - 1) * paso;
    return {
      guia: G({
        intro: 'La figura 1 usa <b>' + inicio + ' ' + objeto + '</b> y cada figura nueva usa <b>' + paso + ' mas</b> que la anterior. ' +
          'Queremos la figura <b>' + k + '</b>.<br>' +
          'Se podria ir figura por figura, pero seria eterno. Como siempre se suma lo mismo, es una sucesion <b>aritmetica</b> ' +
          'y hay formula: a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d.',
        pasos: [
          { pregunta: 'Para llegar de la figura 1 a la figura ' + k + ', &iquest;cuantos saltos hay que dar?',
            resp: R.numero(k - 1, { dec: 0 }),
            pista: 'No son ' + k + '. De la figura 1 a la 2 hay UN salto, de la 1 a la 3 hay dos... Por eso la formula lleva (n &minus; 1).',
            despues: 'Este es el error clasico de las sucesiones: contar un salto de mas.' },
          { pregunta: 'En cada salto se agregan ' + paso + '. &iquest;Cuantos ' + objeto + ' se agregan en total?<br>' + (k - 1) + ' &times; ' + paso,
            resp: R.numero((k - 1) * paso, { dec: 0 }),
            pista: 'Multiplica los saltos por lo que crece cada vez.',
            despues: '' },
          { pregunta: 'Ahora sumale los que ya tenia la figura 1: ' + inicio + ' + ' + ((k - 1) * paso),
            resp: R.numero(val, { dec: 0 }),
            pista: 'El primer termino nunca se pierde: es el punto de partida.',
            despues: '' }
        ],
        final: 'La figura ' + k + ' usa <b>' + val + ' ' + objeto + '</b>',
        receta: ['Identificar a<sub>1</sub> (la primera figura) y d (lo que crece)',
          'Los saltos son n &minus; 1, no n',
          'a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d',
          'Comprobacion: con n = 1 debe dar el primer termino']
      }),
      enunciado: 'Con ' + objeto + ' se forma una sucesion de figuras: la figura 1 usa ' + inicio + ' ' + objeto + ',<br>' +
        'y cada figura nueva usa ' + paso + ' mas que la anterior.<br>&iquest;Cuantos ' + objeto + ' usa la figura ' + k + '?',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Es una sucesion aritmetica: el primer termino es ' + inicio + ' y la diferencia es ' + paso + '.',
        'Usa a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d con n = ' + k + '.'],
      solucion: ['a<sub>1</sub> = ' + inicio + ', d = ' + paso,
        'a<sub>' + k + '</sub> = ' + inicio + ' + (' + k + ' &minus; 1)(' + paso + ') = ' + inicio + ' + ' + ((k - 1) * paso),
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.faltante = function (r) {
    var a1 = r.entero(-6, 12), d = r.enteroNoCero(-8, 9);
    var v = [];
    for (var i = 0; i < 5; i++) v.push(a1 + i * d);
    var hueco = r.entero(1, 3);
    var mostrados = v.map(function (x, i) { return i === hueco ? '__' : String(x); });
    return {
      guia: G({
        intro: 'Falta un termino en <b>' + mostrados.join(', ') + '</b>.<br>' +
          'La estrategia: no mires el hueco. Busca primero el patron usando los terminos que SI se ven, ' +
          'y una vez que lo tengas, el hueco se llena solo.',
        pasos: [
          { pregunta: 'Saca la diferencia con dos terminos seguidos que si conozcas:<br>' + v[4] + ' &minus; (' + v[3] + ')',
            resp: R.numero(d, { dec: 0 }),
            pista: 'Resta el segundo menos el primero. Puede salir negativa si la sucesion baja.',
            despues: 'Como la diferencia es constante, la sucesion es aritmetica con d = ' + d + '.' },
          { pregunta: 'El hueco esta en la posicion ' + (hueco + 1) + '.<br>&iquest;Cual es el termino que va justo ANTES?',
            resp: R.numero(v[hueco - 1], { dec: 0 }),
            pista: 'Es el que esta pegado a la izquierda del hueco: ' + v[hueco - 1] + '.',
            despues: '' },
          { pregunta: 'Sumale la diferencia: ' + v[hueco - 1] + ' + (' + d + ')',
            resp: R.numero(v[hueco], { dec: 0 }),
            pista: 'Solo hay que avanzar un paso desde el termino anterior.',
            despues: '' },
          { pregunta: '&iquest;Como compruebas que quedo bien?',
            resp: R.opcion(['Viendo que la diferencia con el SIGUIENTE tambien sea ' + d, 'No se puede comprobar'], 0),
            pista: 'Si el numero es correcto, el patron debe funcionar hacia los dos lados.',
            despues: 'Y en efecto: ' + v[hueco + 1] + ' &minus; (' + v[hueco] + ') = ' + d + '.' }
        ],
        final: 'El termino que falta es <b>' + v[hueco] + '</b>',
        receta: ['Usar terminos conocidos para hallar el patron',
          'Con diferencia constante: sucesion aritmetica',
          'Avanzar un paso desde el termino anterior al hueco',
          'Comprobar hacia el otro lado']
      }),
      enunciado: 'Encuentra el termino que falta:<br><span class="big">' + mostrados.join(', ') + '</span>',
      respuesta: R.numero(v[hueco], { dec: 0 }),
      pistas: ['Saca la diferencia con dos terminos consecutivos que si conozcas.',
        'La diferencia es ' + d + '.'],
      solucion: ['Diferencia: ' + v[4] + ' &minus; ' + v[3] + ' = ' + d,
        'El termino que falta es el anterior mas ' + d,
        'Resultado: <b>' + v[hueco] + '</b>']
    };
  };

  EJ.tema({
    id: 'sucesiones',
    materia: 'matematicas',
    grupo: 'Sucesiones y series',
    nombre: 'Sucesiones',
    descripcion: 'Detectar el patron, calcular el siguiente termino y encontrar el termino general.',
    formulario: 'Diferencia constante &rArr; a<sub>n</sub> = a<sub>1</sub> + (n &minus; 1)d (lineal en n)<br>' +
      'Razon constante &rArr; a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup><br>' +
      'Segunda diferencia constante &rArr; a<sub>n</sub> es de segundo grado en n',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, v = [], i;

      if (dif === 'facil') {
        var t = r.subtema([
          ['aritmetica', 'Siguiente termino (aritmetica)'],
          ['geometrica', 'Siguiente termino (geometrica)'],
          ['cuadrados', 'Patron de cuadrados'],
          ['faltante', 'Termino que falta'],
          ['figuras', 'Sucesion de figuras']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'aritmetica') {
          var a1 = r.entero(-9, 12), d = r.enteroNoCero(-7, 9);
          for (i = 0; i < 5; i++) v.push(a1 + i * d);
          guiaDelPaso = EJ.guia.siguienteTermino(v, d);
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(a1 + 5 * d, { dec: 0 });
          pistas = ['Fijate en la diferencia entre terminos consecutivos.',
            'La diferencia siempre es ' + d + ', asi que suma ' + d + ' al ultimo termino.'];
          sol = ['Diferencia: ' + v[1] + ' &minus; ' + v[0] + ' = ' + d + ' (constante)',
            'Siguiente: ' + v[4] + ' + (' + d + ') = <b>' + (a1 + 5 * d) + '</b>'];
        } else if (t === 'geometrica') {
          var g1 = r.elige([1, 2, 3, 5]), q = r.elige([2, 3, -2]);
          for (i = 0; i < 5; i++) v.push(g1 * Math.pow(q, i));
          guiaDelPaso = G({
            intro: 'Tenemos <b>' + lista(v) + '</b> y hay que dar el siguiente.<br>' +
              'Lo primero siempre es preguntarse: &iquest;esta sucesion <b>suma</b> siempre lo mismo o <b>multiplica</b> siempre por lo mismo?',
            pasos: [
              { pregunta: 'Prueba restando: ' + v[1] + ' &minus; ' + v[0] + ' = ' + (v[1] - v[0]) + ', pero ' + v[2] + ' &minus; ' + v[1] + ' = ' + (v[2] - v[1]) + '.<br>&iquest;Que tipo de sucesion es?',
                resp: R.opcion(['Geometrica: se multiplica por un numero fijo', 'Aritmetica: se suma un numero fijo'], 0),
                pista: 'Las diferencias NO son iguales, asi que no es aritmetica. Prueba dividiendo en vez de restar.',
                despues: 'En las geometricas lo que se repite es el cociente, no la resta.' },
              { pregunta: 'Encuentra la razon dividiendo: ' + v[1] + ' &divide; ' + v[0],
                resp: R.numero(q, { dec: 0 }),
                pista: 'Comprueba con otro par: ' + v[2] + ' &divide; ' + v[1] + ' tambien da ' + q + '.' + (q < 0 ? ' Es negativa, por eso los signos se alternan.' : ''),
                despues: 'La razon es ' + q + '.' },
              { pregunta: 'Multiplica el ultimo termino por la razon: ' + v[4] + ' &times; (' + q + ')',
                resp: R.numero(g1 * Math.pow(q, 5), { dec: 0 }),
                pista: 'Aqui NO se suma: se multiplica.',
                despues: '' }
            ],
            final: 'El siguiente termino es <b>' + (g1 * Math.pow(q, 5)) + '</b>',
            receta: ['Probar primero si las diferencias son constantes',
              'Si no, probar si los cocientes lo son',
              'Cociente constante = geometrica',
              'Para avanzar: multiplicar por la razon']
          });
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(g1 * Math.pow(q, 5), { dec: 0 });
          pistas = ['Aqui no se suma: se multiplica. Divide un termino entre el anterior.',
            'La razon es ' + q + '. Multiplica el ultimo termino por ' + q + '.'];
          sol = ['Razon: ' + v[1] + ' &divide; ' + v[0] + ' = ' + q,
            'Siguiente: ' + v[4] + ' &middot; (' + q + ') = <b>' + (g1 * Math.pow(q, 5)) + '</b>'];
        } else {
          var k = r.entero(0, 3);
          for (i = 1; i <= 5; i++) v.push(i * i + k);
          guiaDelPaso = G({
            intro: 'Tenemos <b>' + lista(v) + '</b>.<br>' +
              'Esta no suma siempre lo mismo ni multiplica siempre por lo mismo. Cuando pasa eso, ' +
              'el truco es mirar <b>como crecen las diferencias</b>.',
            pasos: [
              { pregunta: 'Primera diferencia: ' + v[1] + ' &minus; ' + v[0],
                resp: R.numero(v[1] - v[0], { dec: 0 }),
                pista: 'Resta normal.', despues: '' },
              { pregunta: 'Siguiente diferencia: ' + v[2] + ' &minus; ' + v[1],
                resp: R.numero(v[2] - v[1], { dec: 0 }),
                pista: 'Otra resta.',
                despues: 'Las diferencias van ' + (v[1] - v[0]) + ', ' + (v[2] - v[1]) + ', ' + (v[3] - v[2]) + ': no son constantes, crecen de 2 en 2. Eso delata los cuadrados.' },
              k ? { pregunta: 'Los cuadrados puros son 1, 4, 9, 16, 25.<br>&iquest;Cuanto hay que sumarles para llegar a esta sucesion?',
                resp: R.numero(k, { dec: 0 }),
                pista: 'Compara termino a termino: ' + v[0] + ' &minus; 1 = ' + k + '.',
                despues: 'Entonces el termino n-esimo es n&sup2; + ' + k + '.' }
                : { pregunta: 'Entonces, &iquest;cual es el termino n-esimo?',
                  resp: R.opcion(['n&sup2;', '2n'], 0),
                  pista: 'Son exactamente 1, 4, 9, 16, 25: los cuadrados de 1, 2, 3, 4, 5.',
                  despues: '' },
              { pregunta: 'El siguiente es el termino 6: 6&sup2;' + (k ? ' + ' + k : '') + '.<br>&iquest;Cuanto da?',
                resp: R.numero(36 + k, { dec: 0 }),
                pista: '6&sup2; = 36' + (k ? ', mas ' + k : '') + '.',
                despues: '' }
            ],
            final: 'El siguiente termino es <b>' + (36 + k) + '</b>',
            receta: ['Si las diferencias no son constantes, mirar como crecen',
              'Diferencias que suben de 2 en 2 = cuadrados',
              'Comparar con 1, 4, 9, 16, 25 y ver que se le suma',
              'Evaluar en la posicion que piden']
          });
          enun = 'Escribe el siguiente termino de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.numero(36 + k, { dec: 0 });
          pistas = ['Las diferencias no son constantes: crecen de 2 en 2. Piensa en cuadrados.',
            'Son los cuadrados 1, 4, 9, 16, 25' + (k ? ' sumandoles ' + k : '') + '.'];
          sol = ['Cada termino es n' + F.sup(2) + (k ? ' + ' + k : ''),
            'Para n = 6: 6' + F.sup(2) + (k ? ' + ' + k : '') + ' = <b>' + (36 + k) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['generalLineal', 'Termino general lineal'],
          ['alternada', 'Signos alternados'],
          ['recursiva', 'Regla recursiva'],
          ['figuras', 'Sucesion de figuras']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'generalLineal') {
          var m = r.enteroNoCero(-6, 8), b = r.entero(-8, 10);
          for (i = 1; i <= 5; i++) v.push(m * i + b);
          guiaDelPaso = G({
            intro: 'Hay que encontrar el <b>termino general</b> de ' + lista(v) + '.<br>' +
              'El termino general es una formula que, con solo darle la posicion n, escupe el termino que va ahi. ' +
              'Sirve para no tener que contar uno por uno.',
            pasos: [
              { pregunta: 'Saca la diferencia: ' + v[1] + ' &minus; (' + v[0] + ')',
                resp: R.numero(m, { dec: 0 }),
                pista: 'Comprueba con otro par: ' + v[2] + ' &minus; (' + v[1] + ') da lo mismo.',
                despues: 'Es constante, asi que la sucesion es aritmetica.' },
              { pregunta: 'Si la diferencia es constante, &iquest;de que forma es el termino general?',
                resp: R.opcion(['a<sub>n</sub> = mn + b, una formula lineal', 'a<sub>n</sub> = m &middot; r&#8319;, exponencial'], 0),
                pista: 'Sumar siempre lo mismo hace que la sucesion crezca en linea recta, igual que y = mx + b.',
                despues: 'Y ese m es justo la diferencia que acabas de calcular: m = ' + m + '.' },
              { pregunta: 'Falta b. Usa el primer termino, n = 1:<br>' + m + '(1) + b = ' + v[0] + '<br>&iquest;Cuanto vale b?',
                resp: R.numero(b, { dec: 0 }),
                pista: 'Despeja: b = ' + v[0] + ' &minus; (' + m + ') = ' + b + '.',
                despues: 'Ojo: b NO es el primer termino. Es lo que habria antes del primero, en la posicion 0.' },
              { pregunta: 'Escribe el termino general en funcion de n.',
                resp: R.expresion('(' + m + ')*n+(' + b + ')', {
                  vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([m, b], 'n'),
                  ayuda: 'Escribe la formula en terminos de n, por ejemplo 3n-1.' }),
                pista: 'Es ' + F.poli([m, b], 'n') + '.',
                despues: 'Comprueba con n = 3: deberia dar ' + v[2] + '.' }
            ],
            final: '<b>a<sub>n</sub> = ' + F.poli([m, b], 'n') + '</b>',
            receta: ['Calcular la diferencia',
              'Diferencia constante = formula lineal mn + b',
              'm es la diferencia',
              'b se despeja sustituyendo n = 1',
              'Comprobar con otro termino']
          });
          enun = 'Encuentra el termino general a<sub>n</sub> de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion('(' + m + ')*n+(' + b + ')', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([m, b], 'n'),
            ayuda: 'Escribe la formula en terminos de n, por ejemplo 3n-1.'
          });
          pistas = ['La diferencia es constante, asi que a<sub>n</sub> es de la forma mn + b.',
            'La diferencia es ' + m + ', asi que a<sub>n</sub> = ' + m + 'n + b. Usa a<sub>1</sub> = ' + v[0] + ' para hallar b.'];
          sol = ['Diferencia constante d = ' + m + ' &rArr; a<sub>n</sub> = ' + m + 'n + b',
            'Con n = 1: ' + m + '(1) + b = ' + v[0] + ' &rArr; b = ' + b,
            'Termino general: <b>a<sub>n</sub> = ' + F.poli([m, b], 'n') + '</b>'];
        } else if (t2 === 'alternada') {
          var base = r.elige([1, 2, 3]), paso = r.entero(2, 5);
          for (i = 0; i < 6; i++) v.push(Math.pow(-1, i) * (base + i * paso));
          enun = 'Escribe los dos siguientes terminos de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          var s6 = Math.pow(-1, 6) * (base + 6 * paso), s7 = Math.pow(-1, 7) * (base + 7 * paso);
          guiaDelPaso = G({
            intro: 'Tenemos <b>' + lista(v) + '</b> y hay que dar los dos siguientes.<br>' +
              'A primera vista es un desastre porque los signos brincan. El truco es <b>partir el problema en dos</b>: ' +
              'por un lado los numeros sin signo, por otro el signo. Cada parte por separado es facilisima.',
            pasos: [
              { pregunta: '&iquest;Que conviene hacer con una sucesion de signos alternados?',
                resp: R.opcion(['Separar el signo del valor absoluto', 'Buscar la razon dividiendo'], 0),
                pista: 'Si tapas los signos, los numeros que quedan siguen un patron muy simple.',
                despues: 'Sin signos queda ' + [base, base + paso, base + 2 * paso, base + 3 * paso].join(', ') + ', &hellip;' },
              { pregunta: 'Esos valores suben de ' + paso + ' en ' + paso + '.<br>El sexto es ' + (base + 5 * paso) + '. &iquest;Cual es el septimo (sin signo)?',
                resp: R.numero(base + 6 * paso, { dec: 0 }),
                pista: 'Sumale ' + paso + ' al anterior.',
                despues: '' },
              { pregunta: 'Ahora el signo. Mirando como se alternan, &iquest;que signo lleva el septimo termino?',
                resp: R.opcion(['Positivo', 'Negativo'], s6 > 0 ? 0 : 1),
                pista: 'Van uno si y uno no. El sexto termino es ' + v[5] + ', asi que el septimo lleva el contrario.',
                despues: 'Entonces el septimo termino es ' + s6 + '.' },
              { pregunta: 'Repite para el octavo: valor y signo juntos.',
                resp: R.numero(s7, { dec: 0 }),
                pista: 'Sin signo seria ' + (base + 7 * paso) + ', y el signo es el contrario del anterior.',
                despues: '' },
              { pregunta: 'Escribe los dos terminos separados por coma.',
                resp: R.lista([s6, s7], { ayuda: 'Escribe los dos valores separados por coma.' }),
                pista: 'Son ' + s6 + ' y ' + s7 + '.',
                despues: '' }
            ],
            final: 'Los dos siguientes son <b>' + s6 + '</b> y <b>' + s7 + '</b>',
            receta: ['Separar signo y valor absoluto',
              'Resolver el patron de los numeros sin signo',
              'Resolver aparte el patron de los signos',
              'Juntar las dos cosas al final',
              'En formula, el signo alternado se escribe (&minus;1)&#8319;']
          });
          resp = R.lista([s6, s7], { ayuda: 'Escribe los dos valores separados por coma.' });
          pistas = ['Separa el problema en dos: el signo por un lado y el valor absoluto por otro.',
            'Los valores absolutos van de ' + paso + ' en ' + paso + ' y el signo se alterna.'];
          sol = ['Valores absolutos: ' + base + ', ' + (base + paso) + ', ' + (base + 2 * paso) + ', &hellip; suben de ' + paso + ' en ' + paso,
            'El signo se alterna empezando en ' + (v[0] > 0 ? '+' : '&minus;'),
            'Siguientes: <b>' + s6 + '</b> y <b>' + s7 + '</b>'];
        } else {
          var p = r.entero(1, 4), q2 = r.entero(1, 4);
          v = [p, q2];
          for (i = 2; i < 6; i++) v.push(v[i - 1] + v[i - 2]);
          guiaDelPaso = G({
            intro: 'Esta sucesion es <b>recursiva</b>: cada termino se construye a partir de los anteriores, ' +
              'no con una formula que dependa de la posicion.<br>' +
              'Aqui la regla ya nos la dan: cada termino es la suma de los dos que van antes (como la sucesion de Fibonacci).',
            pasos: [
              { pregunta: '&iquest;Cuantos terminos anteriores hacen falta para calcular uno nuevo?',
                resp: R.numero(2, { dec: 0 }),
                pista: 'La regla dice "la suma de los DOS anteriores".',
                despues: 'Por eso hay que fijarse en los dos ultimos que se ven.' },
              { pregunta: 'Escribe los dos ultimos terminos de la lista, separados por coma.',
                resp: R.lista([v[4], v[5]], { ayuda: 'Los dos valores, separados por coma.' }),
                pista: 'Son los que estan al final: ' + v[4] + ' y ' + v[5] + '.',
                despues: '' },
              { pregunta: 'Sumalos: ' + v[4] + ' + ' + v[5],
                resp: R.numero(v[4] + v[5], { dec: 0 }),
                pista: 'Suma directa.',
                despues: 'Y si quisieras el siguiente, usarias ' + v[5] + ' + ' + (v[4] + v[5]) + '.' }
            ],
            final: 'El siguiente termino es <b>' + (v[4] + v[5]) + '</b>',
            receta: ['Recursiva = cada termino depende de los anteriores',
              'Identificar cuantos anteriores pide la regla',
              'Tomar los ultimos que ya tienes',
              'Aplicar la regla; no hay atajo, se va uno por uno']
          });
          enun = 'En esta sucesion cada termino es la suma de los dos anteriores:<br><span class="big">' + lista(v) + '</span><br>&iquest;Cual es el siguiente termino?';
          resp = R.numero(v[4] + v[5], { dec: 0 });
          pistas = ['Suma los dos ultimos terminos que ves.',
            v[4] + ' + ' + v[5] + ' = ?'];
          sol = ['Regla: a<sub>n</sub> = a<sub>n&minus;1</sub> + a<sub>n&minus;2</sub>',
            v[4] + ' + ' + v[5] + ' = <b>' + (v[4] + v[5]) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cuadratica', 'Termino general cuadratico'],
          ['generalGeom', 'Termino general geometrico'],
          ['mixta', 'Sucesion recursiva']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cuadratica') {
          var A = r.elige([1, 2, 3]), B = r.entero(-4, 4), C = r.entero(-6, 6);
          for (i = 1; i <= 5; i++) v.push(A * i * i + B * i + C);
          guiaDelPaso = G({
            intro: 'Hay que encontrar el termino general de <b>' + lista(v) + '</b>.<br>' +
              'Las diferencias no van a ser constantes. Cuando eso pasa, se aplica el <b>metodo de las diferencias</b>: ' +
              'si hay que bajar dos niveles para encontrar algo constante, la formula es de segundo grado.',
            pasos: [
              { pregunta: 'Primera diferencia: ' + v[1] + ' &minus; (' + v[0] + ')',
                resp: R.numero(v[1] - v[0], { dec: 0 }),
                pista: 'Resta el segundo menos el primero.', despues: '' },
              { pregunta: 'Segunda: ' + v[2] + ' &minus; (' + v[1] + ')',
                resp: R.numero(v[2] - v[1], { dec: 0 }),
                pista: 'Otra resta de terminos seguidos.',
                despues: 'Las diferencias van ' + [v[1] - v[0], v[2] - v[1], v[3] - v[2], v[4] - v[3]].join(', ') + ': NO son constantes.' },
              { pregunta: 'Como no son constantes, restamos otra vez, ahora entre las diferencias:<br>' + (v[2] - v[1]) + ' &minus; (' + (v[1] - v[0]) + ')',
                resp: R.numero(2 * A, { dec: 0 }),
                pista: 'Es la "diferencia de las diferencias".',
                despues: 'Esta si es constante, y aparecio en el SEGUNDO nivel: por eso a<sub>n</sub> es de grado 2.' },
              { pregunta: 'La segunda diferencia siempre vale 2a.<br>&iquest;Cuanto vale entonces a? (' + (2 * A) + ' &divide; 2)',
                resp: R.numero(A, { dec: 0 }),
                pista: 'Divide la segunda diferencia entre 2.',
                despues: 'Ya sabemos que a<sub>n</sub> = ' + A + 'n&sup2; + bn + c. Faltan b y c.' },
              { pregunta: 'Sustituye n = 1 y n = 2 y resta las dos ecuaciones.<br>&iquest;Cuanto vale b?',
                resp: R.numero(B, { dec: 0 }),
                pista: 'a<sub>2</sub> &minus; a<sub>1</sub> = 3a + b, o sea ' + (v[1] - v[0]) + ' = 3(' + A + ') + b, asi que b = ' + B + '.',
                despues: '' },
              { pregunta: 'Ahora con n = 1: ' + A + ' + (' + B + ') + c = ' + v[0] + '.<br>&iquest;Cuanto vale c?',
                resp: R.numero(C, { dec: 0 }),
                pista: 'Despeja: c = ' + v[0] + ' &minus; ' + A + ' &minus; (' + B + ') = ' + C + '.',
                despues: '' },
              { pregunta: 'Escribe el termino general completo.',
                resp: R.expresion('(' + A + ')*n^2+(' + B + ')*n+(' + C + ')', {
                  vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([A, B, C], 'n') }),
                pista: 'Es ' + F.poli([A, B, C], 'n') + '.',
                despues: 'Comprueba con n = 4: deberia dar ' + v[3] + '.' }
            ],
            final: '<b>a<sub>n</sub> = ' + F.poli([A, B, C], 'n') + '</b>',
            receta: ['Calcular las primeras diferencias',
              'Si no son constantes, calcular las diferencias de esas',
              'Constante en el nivel 2 = formula de grado 2',
              'Segunda diferencia = 2a',
              'Sustituir n = 1 y n = 2 para despejar b y c',
              'Comprobar con otro termino']
          });
          enun = 'Encuentra el termino general a<sub>n</sub> de la sucesion:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion('(' + A + ')*n^2+(' + B + ')*n+(' + C + ')', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + F.poli([A, B, C], 'n')
          });
          pistas = ['Calcula las primeras diferencias y luego las diferencias de esas diferencias.',
            'La segunda diferencia es ' + (2 * A) + ', y siempre vale 2a, asi que a = ' + A + '. Plantea a<sub>n</sub> = ' + A + 'n&sup2; + bn + c.'];
          sol = ['Primeras diferencias: ' + [v[1] - v[0], v[2] - v[1], v[3] - v[2], v[4] - v[3]].join(', '),
            'Segundas diferencias: ' + (2 * A) + ' (constante) &rArr; es cuadratica con a = ' + (2 * A) + '/2 = ' + A,
            'Con n = 1 y n = 2 se despejan b = ' + B + ' y c = ' + C,
            'Termino general: <b>a<sub>n</sub> = ' + F.poli([A, B, C], 'n') + '</b>'];
        } else if (t3 === 'generalGeom') {
          var g = r.elige([2, 3, 5]), rz = r.elige([2, 3]);
          for (i = 0; i < 5; i++) v.push(g * Math.pow(rz, i));
          guiaDelPaso = G({
            intro: 'Hay que encontrar el termino general de <b>' + lista(v) + '</b>, con n = 1 para el primer termino.<br>' +
              'Aqui no se suma: se multiplica siempre por el mismo numero. Es una sucesion <b>geometrica</b>, ' +
              'y su formula es a<sub>n</sub> = a<sub>1</sub> &middot; r<sup>n&minus;1</sup>.',
            pasos: [
              { pregunta: '&iquest;Cual es el primer termino, a<sub>1</sub>?',
                resp: R.numero(g, { dec: 0 }),
                pista: 'Es el que abre la lista.', despues: '' },
              { pregunta: 'Encuentra la razon dividiendo: ' + v[1] + ' &divide; ' + v[0],
                resp: R.numero(rz, { dec: 0 }),
                pista: 'Comprueba con otro par: ' + v[2] + ' &divide; ' + v[1] + ' da lo mismo.',
                despues: 'La razon es r = ' + rz + '.' },
              { pregunta: 'La formula lleva r<sup>n&minus;1</sup> y no r<sup>n</sup>. &iquest;Por que?',
                resp: R.opcion(['Porque al primer termino todavia no se le ha multiplicado nada',
                  'Porque la numeracion empieza en cero'], 0),
                pista: 'Con n = 1 el exponente debe dar 0, para que r&#8304; = 1 y quede a<sub>1</sub> tal cual.',
                despues: 'Es el mismo detalle del (n &minus; 1) de las aritmeticas.' },
              { pregunta: 'Escribe el termino general en funcion de n.',
                resp: R.expresion(g + '*' + rz + '^(n-1)', {
                  vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1') }),
                pista: 'Es ' + g + ' &middot; ' + rz + F.sup('n&minus;1') + '. En el teclado se escribe ' + g + '*' + rz + '^(n-1).',
                despues: 'Comprueba con n = 3: ' + g + ' &middot; ' + rz + '&sup2; = ' + v[2] + '.' }
            ],
            final: '<b>a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1') + '</b>',
            receta: ['Identificar a<sub>1</sub>, el primer termino',
              'Razon r = cualquier termino entre el anterior',
              'a<sub>n</sub> = a<sub>1</sub> &middot; r<sup>n&minus;1</sup>',
              'El exponente es n &minus; 1 para que el primero salga bien',
              'Comprobar con el tercer termino']
          });
          enun = 'Encuentra el termino general a<sub>n</sub> (con n = 1 para el primer termino) de:<br><span class="big">' + lista(v) + '</span>';
          resp = R.expresion(g + '*' + rz + '^(n-1)', {
            vars: ['n'], enteros: true, mostrar: 'a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1')
          });
          pistas = ['Cada termino se obtiene multiplicando por una razon fija r.',
            'a<sub>1</sub> = ' + g + ' y r = ' + rz + '. La formula es a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>.'];
          sol = ['Razon: r = ' + v[1] + '/' + v[0] + ' = ' + rz,
            'a<sub>n</sub> = a<sub>1</sub>r<sup>n&minus;1</sup>',
            'Resultado: <b>a<sub>n</sub> = ' + g + '&middot;' + rz + F.sup('n&minus;1') + '</b>'];
        } else {
          var c0 = r.entero(1, 5), mm = r.entero(2, 4), bb = r.entero(1, 6);
          v = [c0];
          for (i = 1; i < 5; i++) v.push(mm * v[i - 1] + bb);
          enun = 'La sucesion cumple a<sub>n</sub> = ' + mm + 'a<sub>n&minus;1</sub> + ' + bb + ' con a<sub>1</sub> = ' + c0 + ':<br><span class="big">' + lista(v) + '</span><br>Calcula a<sub>7</sub>.';
          var a6 = mm * v[4] + bb, a7 = mm * a6 + bb;
          guiaDelPaso = G({
            intro: 'La regla es <b>a<sub>n</sub> = ' + mm + 'a<sub>n&minus;1</sub> + ' + bb + '</b>, y nos piden <b>a<sub>7</sub></b>.<br>' +
              'Es recursiva: cada termino se calcula a partir del anterior. La lista llega hasta a<sub>5</sub> = ' + v[4] + ', ' +
              'asi que hay que dar dos pasos mas, en orden.',
            pasos: [
              { pregunta: '&iquest;Se puede saltar directo a a<sub>7</sub> sin calcular a<sub>6</sub>?',
                resp: R.opcion(['No, hay que ir uno por uno', 'Si, sustituyendo n = 7 en la regla'], 0),
                pista: 'La regla no depende de n, depende del termino anterior. Si no tienes a<sub>6</sub>, no puedes calcular a<sub>7</sub>.',
                despues: 'Entonces primero a<sub>6</sub>.' },
              { pregunta: 'Aplica la regla al ultimo que tienes, a<sub>5</sub> = ' + v[4] + ':<br>a<sub>6</sub> = ' + mm + '(' + v[4] + ') + ' + bb,
                resp: R.numero(a6, { dec: 0 }),
                pista: 'Multiplica primero y suma despues.',
                despues: 'a<sub>6</sub> = ' + a6 + '.' },
              { pregunta: 'Ahora repite con a<sub>6</sub>:<br>a<sub>7</sub> = ' + mm + '(' + a6 + ') + ' + bb,
                resp: R.numero(a7, { dec: 0 }),
                pista: 'Misma operacion, con el numero nuevo.',
                despues: '' }
            ],
            final: 'a<sub>7</sub> = <b>' + a7 + '</b>',
            receta: ['Recursiva: cada termino necesita el anterior',
              'No hay salto directo; se avanza de uno en uno',
              'Aplicar la regla tal cual, cuidando el orden de las operaciones',
              'Anotar cada resultado para usarlo en el siguiente paso']
          });
          resp = R.numero(a7, { dec: 0 });
          pistas = ['Aplica la regla paso a paso: primero a<sub>6</sub> y luego a<sub>7</sub>.',
            'a<sub>6</sub> = ' + mm + '(' + v[4] + ') + ' + bb + ' = ' + a6 + '.'];
          sol = ['a<sub>6</sub> = ' + mm + '(' + v[4] + ') + ' + bb + ' = ' + a6,
            'a<sub>7</sub> = ' + mm + '(' + a6 + ') + ' + bb + ' = <b>' + a7 + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
