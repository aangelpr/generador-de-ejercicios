/* Trinomios */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function fac(c, a) { return '(' + F.poli([c, a], 'x') + ')'; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.raices = function (r) {
    var p = r.enteroNoCero(-9, 9), q = r.enteroNoCero(-9, 9);
    var pol = P.multiplica([1, -p], [1, -q]);
    return {
      guia: G({
        intro: 'Hay que resolver <b>' + P.texto(pol) + ' = 0</b>.<br>' +
          'La idea: si logras escribirlo como un producto, entonces se usa que <b>un producto vale 0 solo si alguno de los factores vale 0</b>. ' +
          'Asi la ecuacion se parte en dos ecuaciones faciles.',
        pasos: [
          { pregunta: 'Primero hay que factorizar. Busca dos numeros cuyo PRODUCTO sea ' + pol[2] + ' y cuya SUMA sea ' + pol[1] + '.<br>Escribelos separados por coma.',
            resp: R.lista([-p, -q], { ayuda: 'Los dos numeros, separados por coma.' }),
            pista: 'Prueba las parejas que multiplicadas dan ' + pol[2] + ' y quedate con la que suma ' + pol[1] + '. Son ' + (-p) + ' y ' + (-q) + '.',
            despues: 'Con esos dos numeros el trinomio queda ' + fac(1, -p) + fac(1, -q) + '.' },
          { pregunta: 'Ya factorizado tenemos ' + fac(1, -p) + fac(1, -q) + ' = 0.<br>&iquest;Que permite eso?',
            resp: R.opcion(['Que cada factor por separado puede valer 0', 'Que los dos factores valen 0 a la vez'], 0),
            pista: 'Para que una multiplicacion de 0 basta con que UNO de los dos sea 0.',
            despues: 'Entonces se resuelven las dos por separado.' },
          { pregunta: 'Primera: ' + F.poli([1, -p], 'x') + ' = 0.<br>&iquest;Cuanto vale x?',
            resp: R.numero(p, { dec: 0 }),
            pista: 'Pasa el ' + (-p) + ' al otro lado cambiandole el signo.',
            despues: 'Primera solucion: x = ' + p + '.' },
          { pregunta: 'Segunda: ' + F.poli([1, -q], 'x') + ' = 0.<br>&iquest;Cuanto vale x?',
            resp: R.numero(q, { dec: 0 }),
            pista: 'Igual que antes, pero con el otro factor.',
            despues: '' },
          { pregunta: 'Escribe las dos soluciones separadas por coma.',
            resp: R.lista([p, q], { ayuda: 'Los dos valores, separados por coma.' }),
            pista: 'Son ' + p + ' y ' + q + '.', despues: '' }
        ],
        final: 'Las soluciones son <b>x = ' + p + '</b> y <b>x = ' + q + '</b>',
        receta: ['Factorizar el trinomio',
          'Igualar CADA factor a cero',
          'Resolver cada ecuacion chiquita',
          'Se puede comprobar sustituyendo en el original']
      }),
      enunciado: 'Resuelve la ecuacion factorizando:<br><span class="big">' + P.texto(pol) + ' = 0</span><br>Da las dos soluciones separadas por coma.',
      respuesta: R.lista([p, q], { ayuda: 'Escribe los dos valores separados por comas.' }),
      pistas: ['Factoriza el trinomio: busca dos numeros con producto ' + pol[2] + ' y suma ' + pol[1] + '.',
        'Queda ' + fac(1, -p) + fac(1, -q) + ' = 0; un producto es cero si alguno de los factores es cero.'],
      solucion: ['Factorizo: ' + fac(1, -p) + fac(1, -q) + ' = 0',
        'Igualo cada factor a cero',
        'x ' + (p < 0 ? '+ ' + (-p) : '&minus; ' + p) + ' = 0 &rArr; x = <b>' + p + '</b>',
        'x ' + (q < 0 ? '+ ' + (-q) : '&minus; ' + q) + ' = 0 &rArr; x = <b>' + q + '</b>']
    };
  };

  extra.dosVariables = function (r) {
    var p = r.enteroNoCero(-6, 6), q = r.enteroNoCero(-6, 6);
    var b = p + q, c = p * q;
    var mostrar = '(' + F.une([F.term(1, 'x', 1), F.term(p, 'y', 1)]) + ')(' + F.une([F.term(1, 'x', 1), F.term(q, 'y', 1)]) + ')';
    return {
      guia: G({
        intro: 'Hay que factorizar <b>' + F.une([F.term(1, 'x', 2), F.term(b, 'xy', 1), F.term(c, 'y', 2)]) + '</b>.<br>' +
          'Asusta por la y, pero funciona igual que x&sup2; + bx + c: se buscan dos numeros que multiplicados den el ultimo ' +
          'coeficiente y sumados den el de en medio. La y solo se arrastra.',
        pasos: [
          { pregunta: '&iquest;Que forma van a tener los dos parentesis?',
            resp: R.opcion(['(x + ?y)(x + ?y)', '(x + ?)(y + ?)'], 0),
            pista: 'El primer termino es x&sup2;, asi que cada parentesis empieza con x. Y el ultimo lleva y&sup2;, asi que cada uno termina con y.',
            despues: 'Solo faltan los dos numeros que van con la y.' },
          { pregunta: 'Busca dos numeros con PRODUCTO ' + c + ' y SUMA ' + b + '.<br>Escribelos separados por coma.',
            resp: R.lista([p, q], { ayuda: 'Los dos numeros, separados por coma.' }),
            pista: 'Son ' + p + ' y ' + q + ': ' + p + ' &middot; (' + q + ') = ' + c + ' y ' + p + ' + (' + q + ') = ' + b + '.',
            despues: 'Esos dos van acompañados de y.' },
          { pregunta: 'Escribe la factorizacion completa.',
            resp: R.factorizada('(x+(' + p + ')*y)*(x+(' + q + ')*y)', { vars: ['x', 'y'], mostrar: mostrar }),
            pista: 'Es ' + mostrar + '.', despues: '' }
        ],
        final: 'Resultado: <b>' + mostrar + '</b>',
        receta: ['Se trata igual que x&sup2; + bx + c',
          'Dos numeros: producto = ultimo, suma = el de en medio',
          'A cada numero se le pega la y',
          'Se puede comprobar multiplicando de vuelta']
      }),
      enunciado: 'Factoriza: ' + F.une([F.term(1, 'x', 2), F.term(b, 'xy', 1), F.term(c, 'y', 2)]),
      respuesta: R.factorizada('(x+(' + p + ')*y)*(x+(' + q + ')*y)', { vars: ['x', 'y'], mostrar: mostrar }),
      pistas: ['Funciona igual que x&sup2; + bx + c, pero el segundo termino de cada parentesis lleva y.',
        'Busca dos numeros con producto ' + c + ' y suma ' + b + ': son ' + p + ' y ' + q + '.'],
      solucion: ['Trato el trinomio como (x + ?y)(x + ?y)',
        'Necesito producto ' + c + ' y suma ' + b + ' &rArr; ' + p + ' y ' + q,
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  EJ.tema({
    id: 'trinomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Trinomios',
    descripcion: 'Factorizacion de x&sup2;+bx+c, de ax&sup2;+bx+c, trinomio cuadrado perfecto y completar el cuadrado.',
    formulario: 'x&sup2; + bx + c = (x + p)(x + q) con p + q = b y pq = c<br>' +
      'Cuadrado perfecto: a&sup2; &plusmn; 2ab + b&sup2; = (a &plusmn; b)&sup2;<br>' +
      'Completar el cuadrado: x&sup2; + bx + c = (x + b/2)&sup2; + (c &minus; b&sup2;/4)',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, p, q, a, b, c, pol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['factorizar', 'Factorizar x&sup2; + bx + c'],
          ['raices', 'Resolver igualando a cero']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        p = r.enteroNoCero(-9, 9); q = r.enteroNoCero(-9, 9);
        pol = P.multiplica([1, -p], [1, -q]);
        guiaDelPaso = EJ.guia.trinomioSimple(p, q);
        enun = 'Factoriza: ' + P.texto(pol);
        resp = R.factorizada('(x-(' + p + '))*(x-(' + q + '))', {
          mostrar: fac(1, -p) + fac(1, -q)
        });
        pistas = ['Busca dos numeros que multiplicados den ' + pol[2] + ' y sumados den ' + pol[1] + '.',
          'Esos numeros son ' + (-p) + ' y ' + (-q) + '.'];
        sol = ['Necesito dos numeros con producto ' + pol[2] + ' y suma ' + pol[1],
          'Son ' + (-p) + ' y ' + (-q) + ', porque (' + (-p) + ')(' + (-q) + ') = ' + pol[2] + ' y (' + (-p) + ') + (' + (-q) + ') = ' + pol[1],
          'Resultado: <b>' + fac(1, -p) + fac(1, -q) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['conCoef', 'Factorizar ax&sup2; + bx + c'],
          ['cuadradoPerfecto', 'Trinomio cuadrado perfecto'],
          ['identificar', 'Reconocer cuadrado perfecto'],
          ['raices', 'Resolver igualando a cero'],
          ['dosVariables', 'Trinomio con dos variables']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'conCoef') {
          var m = r.entero(2, 5), n = r.entero(1, 4);
          p = r.enteroNoCero(-6, 6); q = r.enteroNoCero(-6, 6);
          pol = P.multiplica([m, p], [n, q]);
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>' + P.texto(pol) + '</b>.<br>' +
              'Aqui la x&sup2; ya NO tiene coeficiente 1, asi que el truco de "dos numeros que sumen y multipliquen" no sirve directo. ' +
              'Se usa el <b>metodo ac</b>: se parte el termino de en medio y se agrupa de dos en dos.',
            pasos: [
              { pregunta: 'Multiplica el primer coeficiente por el ultimo: ' + pol[0] + ' &middot; (' + pol[2] + ')',
                resp: R.numero(pol[0] * pol[2], { dec: 0 }),
                pista: 'a = ' + pol[0] + ' y c = ' + pol[2] + '. Ojo con los signos.',
                despues: 'A ese numero le llamamos a&middot;c.' },
              { pregunta: 'Ahora busca dos numeros con PRODUCTO ' + (pol[0] * pol[2]) + ' y SUMA ' + pol[1] + '.<br>Escribelos separados por coma.',
                resp: R.lista([m * q, n * p], { ayuda: 'Los dos numeros, separados por coma.' }),
                pista: 'Son ' + (m * q) + ' y ' + (n * p) + '.',
                despues: 'Con ellos parto el termino de en medio: ' +
                  F.une([F.term(pol[0], 'x', 2), F.term(m * q, 'x', 1), F.term(n * p, 'x', 1), String(pol[2])]) + '.' },
              { pregunta: 'Agrupa los DOS PRIMEROS: ' + F.term(pol[0], 'x', 2) + ' y ' + F.term(m * q, 'x', 1) + '.<br>Su factor comun es ' + F.term(m, 'x', 1) + '. &iquest;Que queda dentro del parentesis?',
                resp: R.expresion(n + '*x+(' + q + ')', { mostrar: F.poli([n, q], 'x') }),
                pista: 'Divide cada uno entre ' + F.term(m, 'x', 1) + ': queda ' + F.poli([n, q], 'x') + '.',
                despues: 'Van ' + F.term(m, 'x', 1) + '(' + F.poli([n, q], 'x') + ').' },
              { pregunta: 'Ahora los DOS ULTIMOS: ' + F.term(n * p, 'x', 1) + ' y ' + pol[2] + '.<br>&iquest;Cual es su factor comun?',
                resp: R.numero(p, { dec: 0 }),
                pista: 'Es un numero solo: ' + p + '. Sacalo y comprueba que dentro queda otra vez ' + F.poli([n, q], 'x') + '.',
                despues: 'Queda ' + p + '(' + F.poli([n, q], 'x') + '): &iexcl;es el MISMO parentesis que antes! Por eso funciona el metodo.' },
              { pregunta: 'Los dos comparten (' + F.poli([n, q], 'x') + ').<br>Escribe la factorizacion completa.',
                resp: R.factorizada('(' + m + '*x+(' + p + '))*(' + n + '*x+(' + q + '))', { mostrar: fac(m, p) + fac(n, q) }),
                pista: 'Un parentesis es lo que compartian y el otro son los factores que sacaste: ' + fac(m, p) + fac(n, q) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + fac(m, p) + fac(n, q) + '</b>',
            receta: ['Calcular a&middot;c',
              'Dos numeros: producto a&middot;c, suma b',
              'Partir el termino de en medio con esos dos',
              'Agrupar de dos en dos y sacar factor comun',
              'El parentesis que se repite es uno de los factores']
          });
          enun = 'Factoriza: ' + P.texto(pol);
          resp = R.factorizada('(' + m + '*x+(' + p + '))*(' + n + '*x+(' + q + '))', {
            mostrar: fac(m, p) + fac(n, q)
          });
          pistas = ['Como el coeficiente de x&sup2; no es 1, busca dos numeros cuyo producto sea a&middot;c = ' + (pol[0] * pol[2]) + ' y cuya suma sea b = ' + pol[1] + '.',
            'Esos numeros son ' + (m * q) + ' y ' + (n * p) + '; con ellos separas el termino de en medio y agrupas.'];
          sol = ['a&middot;c = ' + pol[0] + ' &middot; ' + pol[2] + ' = ' + (pol[0] * pol[2]) + ', y b = ' + pol[1],
            'Los numeros ' + (m * q) + ' y ' + (n * p) + ' cumplen producto ' + (pol[0] * pol[2]) + ' y suma ' + pol[1],
            'Separo: ' + F.term(pol[0], 'x', 2) + ' + ' + F.term(m * q, 'x', 1) + ' + ' + F.term(n * p, 'x', 1) + ' + (' + pol[2] + ') y agrupo',
            'Resultado: <b>' + fac(m, p) + fac(n, q) + '</b>'];
        } else if (t === 'cuadradoPerfecto') {
          c = r.elige([1, 1, 2, 3]); a = r.enteroNoCero(-8, 8);
          pol = P.potencia([c, a], 2);
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>' + P.texto(pol) + '</b>, y ya nos dicen que es un <b>cuadrado perfecto</b>.<br>' +
              'Eso significa que sale de elevar un binomio al cuadrado, asi que el resultado es un solo parentesis elevado a 2. ' +
              'Es el camino de regreso de a&sup2; &plusmn; 2ab + b&sup2; = (a &plusmn; b)&sup2;.',
            pasos: [
              { pregunta: 'Saca la raiz del PRIMER termino: &radic;<span class="rad">' + pol[0] + 'x&sup2;</span>.<br>&iquest;Que coeficiente queda?',
                resp: R.numero(c, { dec: 0 }),
                pista: '&radic;<span class="rad">' + pol[0] + '</span> = ' + c + ', y la raiz de x&sup2; es x.',
                despues: 'Ese es el primero del binomio: ' + F.term(c, 'x', 1) + '.' },
              { pregunta: 'Ahora la raiz del ULTIMO: &radic;<span class="rad">' + pol[2] + '</span>',
                resp: R.numero(Math.abs(a), { dec: 0 }),
                pista: 'Busca el numero que multiplicado por si mismo da ' + pol[2] + '.',
                despues: 'Ese es el segundo del binomio (falta ver con que signo).' },
              { pregunta: 'Comprueba que de verdad es cuadrado perfecto: el termino de en medio debe ser el DOBLE producto.<br>&iquest;Cuanto es 2 &middot; ' + c + ' &middot; (' + a + ')?',
                resp: R.numero(pol[1], { dec: 0 }),
                pista: 'Multiplica 2 &middot; ' + c + ' &middot; (' + a + ').',
                despues: 'Y el trinomio tiene justo ' + F.term(pol[1], 'x', 1) + ': coincide, asi que si lo es. Este paso es el que hay que hacer SIEMPRE antes de factorizar asi.' },
              { pregunta: 'Dentro del parentesis, &iquest;que signo va?',
                resp: R.opcion(['Mas (+)', 'Menos (&minus;)'], a > 0 ? 0 : 1),
                pista: 'El mismo signo que tiene el termino de en medio, que aqui es ' + (pol[1] > 0 ? 'positivo' : 'negativo') + '.',
                despues: '' },
              { pregunta: 'Escribe la factorizacion completa.',
                resp: R.factorizada('(' + c + '*x+(' + a + '))^2', { mostrar: fac(c, a) + '&sup2;' }),
                pista: 'Es ' + fac(c, a) + '&sup2;.', despues: '' }
            ],
            final: 'Resultado: <b>' + fac(c, a) + '&sup2;</b>',
            receta: ['Raiz del primer termino',
              'Raiz del ultimo termino',
              'COMPROBAR que el de en medio es el doble producto',
              'El signo es el del termino de en medio',
              'Todo va dentro de un parentesis al cuadrado']
          });
          enun = 'Factoriza el trinomio cuadrado perfecto: ' + P.texto(pol);
          resp = R.factorizada('(' + c + '*x+(' + a + '))^2', { mostrar: fac(c, a) + '&sup2;' });
          pistas = ['Comprueba que el primero y el ultimo termino son cuadrados perfectos y que el de en medio es su doble producto.',
            '&radic;<span class="rad">' + pol[0] + 'x&sup2;</span> = ' + c + 'x y &radic;<span class="rad">' + pol[2] + '</span> = ' + Math.abs(a) + '.'];
          sol = ['Raiz del primer termino: ' + c + 'x; raiz del ultimo: ' + Math.abs(a),
            'Doble producto: 2(' + c + 'x)(' + a + ') = ' + pol[1] + 'x &check; coincide con el termino de en medio',
            'Resultado: <b>' + fac(c, a) + '&sup2;</b>'];
        } else {
          a = r.enteroNoCero(-7, 7);
          var perfecto = P.potencia([1, a], 2);
          var falso = [1, 2 * a, a * a + r.elige([1, -1, 2, -2, 3])];
          var esPerfecto = r.bool();
          pol = esPerfecto ? perfecto : falso;
          guiaDelPaso = G({
            intro: 'Hay que decidir si <b>' + P.texto(pol) + '</b> es un trinomio cuadrado perfecto.<br>' +
              'No se adivina: hay una prueba. Un trinomio x&sup2; + bx + c es cuadrado perfecto solo si <b>c = (b/2)&sup2;</b>. ' +
              'Vamos a comprobarlo con numeros.',
            pasos: [
              { pregunta: 'El coeficiente de en medio es b = ' + pol[1] + '.<br>&iquest;Cuanto vale la mitad, b/2?',
                resp: R.numero(pol[1] / 2, { dec: 0 }),
                pista: 'Divide ' + pol[1] + ' entre 2.',
                despues: '' },
              { pregunta: 'Ahora eleva esa mitad al cuadrado: (' + (pol[1] / 2) + ')&sup2;',
                resp: R.numero((pol[1] / 2) * (pol[1] / 2), { dec: 0 }),
                pista: 'Multiplica ' + (pol[1] / 2) + ' por si mismo (si es negativo, sale positivo).',
                despues: 'Ese es el valor que DEBERIA tener el ultimo termino.' },
              { pregunta: '&iquest;Cuanto vale de verdad el ultimo termino del trinomio?',
                resp: R.numero(pol[2], { dec: 0 }),
                pista: 'Es el numero que va solo, sin x: ' + pol[2] + '.',
                despues: 'Ya tenemos los dos numeros que hay que comparar: ' + ((pol[1] / 2) * (pol[1] / 2)) + ' y ' + pol[2] + '.' },
              { pregunta: 'Entonces, &iquest;es un trinomio cuadrado perfecto?',
                resp: R.opcion(['Si, es cuadrado perfecto', 'No lo es'], esPerfecto ? 0 : 1),
                pista: esPerfecto ? 'Los dos numeros son iguales, asi que si.'
                  : 'Los dos numeros NO son iguales (' + ((pol[1] / 2) * (pol[1] / 2)) + ' contra ' + pol[2] + '), asi que no.',
                despues: esPerfecto ? 'Y como si lo es, se factoriza como ' + fac(1, a) + '&sup2;.'
                  : 'Habria que factorizarlo por otro camino, no como cuadrado perfecto.' }
            ],
            final: esPerfecto ? '<b>Si</b> es cuadrado perfecto: ' + P.texto(pol) + ' = ' + fac(1, a) + '&sup2;'
              : '<b>No</b> es cuadrado perfecto: le falta (o le sobra) para que c sea (b/2)&sup2;',
            receta: ['Tomar b, el coeficiente de en medio',
              'Calcular (b/2)&sup2;',
              'Compararlo con el ultimo termino',
              'Si son iguales: si es; si no, no']
          });
          enun = '&iquest;Es ' + P.texto(pol) + ' un trinomio cuadrado perfecto?';
          resp = R.opcion(['Si, es cuadrado perfecto', 'No lo es'], esPerfecto ? 0 : 1);
          pistas = ['Revisa si el primero y el ultimo termino son cuadrados exactos.',
            'El ultimo termino deberia ser (' + pol[1] + '/2)&sup2; = ' + (pol[1] / 2) * (pol[1] / 2) + ' y aqui vale ' + pol[2] + '.'];
          sol = ['Para ser cuadrado perfecto debe cumplirse c = (b/2)&sup2;',
            '(b/2)&sup2; = (' + pol[1] + '/2)&sup2; = ' + (pol[1] / 2) * (pol[1] / 2) + ' y el trinomio tiene c = ' + pol[2],
            esPerfecto ? 'Coinciden, asi que <b>si</b> lo es: ' + fac(1, a) + '&sup2;' : 'No coinciden, asi que <b>no</b> es cuadrado perfecto'];
        }
      } else {
        var t2 = r.subtema([
          ['factorComun', 'Factor comun y trinomio'],
          ['bicuadratico', 'Trinomio bicuadratico'],
          ['completar', 'Completar el cuadrado'],
          ['dosVariables', 'Trinomio con dos variables']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'factorComun') {
          var k = r.elige([2, 3, 4, 5, -2, -3]);
          p = r.enteroNoCero(-7, 7); q = r.enteroNoCero(-7, 7);
          pol = P.escala(P.multiplica([1, -p], [1, -q]), k);
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>completamente</b> ' + P.texto(pol) + '.<br>' +
              '"Completamente" es la palabra clave: antes de buscar los dos parentesis hay que revisar si los tres terminos ' +
              'tienen algo en comun. Ese es SIEMPRE el primer paso al factorizar.',
            pasos: [
              { pregunta: 'Mira los tres coeficientes: ' + pol[0] + ', ' + pol[1] + ' y ' + pol[2] + '.<br>&iquest;Que numero divide a los tres?',
                resp: R.numero(k, { dec: 0 }),
                pista: k < 0 ? 'Es ' + Math.abs(k) + ', y como el primero es negativo conviene sacar tambien el signo: ' + k + '.'
                  : 'Busca el mayor que divida a los tres exactos.',
                despues: 'Ese es el factor comun.' },
              { pregunta: 'Sacalo del parentesis. &iquest;Que trinomio queda dentro?',
                resp: R.expresion(P.expr(P.escala(pol, 1 / k)), { mostrar: P.texto(P.escala(pol, 1 / k)) }),
                pista: 'Divide cada termino entre ' + k + ': queda ' + P.texto(P.escala(pol, 1 / k)) + '.',
                despues: 'Vamos en ' + k + '(' + P.texto(P.escala(pol, 1 / k)) + '). Ahora si, el trinomio de adentro.' },
              { pregunta: 'Factoriza lo de adentro: dos numeros con PRODUCTO ' + (p * q) + ' y SUMA ' + (-(p + q)) + '.<br>Escribelos separados por coma.',
                resp: R.lista([-p, -q], { ayuda: 'Los dos numeros, separados por coma.' }),
                pista: 'Son ' + (-p) + ' y ' + (-q) + '.',
                despues: 'El trinomio de adentro es ' + fac(1, -p) + fac(1, -q) + '.' },
              { pregunta: 'Escribe la factorizacion completa, sin olvidar el ' + k + ' de afuera.',
                resp: R.factorizada('(' + k + ')*(x-(' + p + '))*(x-(' + q + '))', { mostrar: k + fac(1, -p) + fac(1, -q) }),
                pista: 'Es ' + k + fac(1, -p) + fac(1, -q) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + k + fac(1, -p) + fac(1, -q) + '</b>',
            receta: ['SIEMPRE empezar buscando factor comun',
              'Sacarlo y quedarse con el trinomio limpio',
              'Factorizar ese trinomio (producto y suma)',
              'No olvidar volver a escribir el factor comun']
          });
          enun = 'Factoriza completamente: ' + P.texto(pol);
          resp = R.factorizada('(' + k + ')*(x-(' + p + '))*(x-(' + q + '))', {
            mostrar: k + fac(1, -p) + fac(1, -q)
          });
          pistas = ['Primero saca el factor comun de los tres terminos.',
            'El factor comun es ' + k + '; queda ' + k + '(' + P.texto(P.escala(pol, 1 / k)) + ').'];
          sol = ['Factor comun: ' + k,
            pol.join(', ').length ? 'Queda ' + k + '(' + P.texto(P.escala(pol, 1 / k)) + ')' : '',
            'Factorizo el trinomio: dos numeros con producto ' + (p * q) + ' y suma ' + (p + q),
            'Resultado: <b>' + k + fac(1, -p) + fac(1, -q) + '</b>'];
        } else if (t2 === 'bicuadratico') {
          p = r.entero(1, 6); q = r.entero(1, 6);
          while (q === p) q = r.entero(1, 6);
          pol = [1, 0, -(p + q), 0, p * q];
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>' + F.une([F.term(1, 'x', 4), F.term(-(p + q), 'x', 2), String(p * q)]) + '</b>.<br>' +
              'No es un trinomio normal porque hay x&#8308; y x&sup2;... pero fijate: los exponentes son 4, 2 y 0. ' +
              'Con un <b>cambio de variable</b> se vuelve un trinomio de los de siempre.',
            pasos: [
              { pregunta: 'Hacemos u = x&sup2;.<br>Entonces x&#8308; es u elevado a &iquest;que exponente?',
                resp: R.numero(2, { dec: 0 }),
                pista: 'x&#8308; = (x&sup2;)&sup2;, y como x&sup2; es u, queda u&sup2;.',
                despues: 'El ejercicio se convierte en u&sup2; &minus; ' + (p + q) + 'u + ' + (p * q) + ': ya es un trinomio normal.' },
              { pregunta: 'Factoriza ese trinomio en u: dos numeros con PRODUCTO ' + (p * q) + ' y SUMA ' + (-(p + q)) + '.<br>Escribelos separados por coma.',
                resp: R.lista([-p, -q], { ayuda: 'Los dos numeros, separados por coma.' }),
                pista: 'Son ' + (-p) + ' y ' + (-q) + '.',
                despues: 'Queda (u &minus; ' + p + ')(u &minus; ' + q + ').' },
              { pregunta: 'Ultimo paso, el que mas se olvida: regresar el cambio.<br>&iquest;Por que hay que sustituir u?',
                resp: R.opcion(['Porque la respuesta tiene que estar en x, no en u', 'Porque u no existe'], 0),
                pista: 'La u fue solo un apodo para x&sup2; mientras factorizabamos.',
                despues: 'Se cambia cada u por x&sup2;.' },
              { pregunta: 'Escribe la factorizacion en x.',
                resp: R.factorizada('(x^2-' + p + ')*(x^2-' + q + ')', { mostrar: '(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')' }),
                pista: 'Es (x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ').',
                despues: '' }
            ],
            final: 'Resultado: <b>(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')</b>',
            receta: ['Ver que los exponentes son 4, 2 y 0',
              'Cambiar u = x&sup2;',
              'Factorizar el trinomio en u como siempre',
              'REGRESAR el cambio: cada u vuelve a ser x&sup2;']
          });
          enun = 'Factoriza: ' + F.une([F.term(1, 'x', 4), F.term(-(p + q), 'x', 2), String(p * q)]);
          resp = R.factorizada('(x^2-' + p + ')*(x^2-' + q + ')', {
            mostrar: '(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')'
          });
          pistas = ['Haz el cambio u = x&sup2;: el trinomio se vuelve u&sup2; &minus; ' + (p + q) + 'u + ' + (p * q) + '.',
            'Ese trinomio en u se factoriza con los numeros ' + p + ' y ' + q + '; luego regresa u = x&sup2;.'];
          sol = ['Cambio u = x&sup2;: u&sup2; &minus; ' + (p + q) + 'u + ' + (p * q),
            'Factorizo: (u &minus; ' + p + ')(u &minus; ' + q + ')',
            'Regreso el cambio: <b>(x&sup2; &minus; ' + p + ')(x&sup2; &minus; ' + q + ')</b>'];
        } else {
          b = r.elige([-10, -8, -6, -4, -2, 2, 4, 6, 8, 10]);
          c = r.entero(-10, 12);
          var h = b / 2, kk = c - h * h;
          guiaDelPaso = G({
            intro: 'Hay que escribir <b>' + P.texto([1, b, c]) + '</b> en la forma (x + h)&sup2; + k.<br>' +
              'Esto se llama <b>completar el cuadrado</b>: se fuerza a que aparezca un binomio al cuadrado, y lo que sobra o falta se ajusta con k. ' +
              'Sirve muchisimo para graficar parabolas y para integrar.',
            pasos: [
              { pregunta: 'h siempre es la MITAD del coeficiente de x.<br>&iquest;Cuanto vale h = ' + b + ' / 2?',
                resp: R.numero(h, { dec: 3 }),
                pista: 'Divide ' + b + ' entre 2, con todo y signo.',
                despues: 'Entonces el binomio es (x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ').' },
              { pregunta: 'Desarrolla ese binomio: (x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2;.<br>&iquest;Que numero queda al final (el termino independiente)?',
                resp: R.numero(h * h, { dec: 3 }),
                pista: 'Es h&sup2; = (' + h + ')&sup2; = ' + (h * h) + '. Sale positivo aunque h sea negativo.',
                despues: 'Ojo: el binomio trae ' + (h * h) + ', pero el trinomio original trae ' + c + '. No son iguales.' },
              { pregunta: '&iquest;Cuanto hay que sumarle a ' + (h * h) + ' para llegar a ' + c + '?<br>Ese es k = ' + c + ' &minus; ' + (h * h),
                resp: R.numero(kk, { dec: 3 }),
                pista: 'Resta: ' + c + ' &minus; ' + (h * h) + ' = ' + kk + '. Si da negativo, k es negativo y va restando.',
                despues: 'Ese ajuste es justo lo que "completa" el cuadrado.' },
              { pregunta: 'Escribe los dos valores.',
                resp: R.varios([
                  { etiqueta: 'h', resp: R.numero(h, { dec: 3 }) },
                  { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) }
                ]),
                pista: 'h = ' + h + ' y k = ' + kk + '.',
                despues: '' }
            ],
            final: P.texto([1, b, c]) + ' = <b>(x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2; ' +
              (kk < 0 ? '&minus; ' + Math.abs(kk) : '+ ' + kk) + '</b>',
            receta: ['h = mitad del coeficiente de x',
              'El binomio (x + h)&sup2; trae de regalo h&sup2;',
              'k = c &minus; h&sup2; corrige esa diferencia',
              'Comprobacion: desarrollar y ver que vuelve al original']
          });
          enun = 'Escribe ' + P.texto([1, b, c]) + ' en la forma (x + h)&sup2; + k.<br>Da los valores de h y de k.';
          resp = R.varios([
            { etiqueta: 'h', resp: R.numero(h, { dec: 3 }) },
            { etiqueta: 'k', resp: R.numero(kk, { dec: 3 }) }
          ]);
          pistas = ['h siempre es la mitad del coeficiente de x.',
            'h = ' + b + '/2 = ' + h + '. Ahora k = c &minus; h&sup2;.'];
          sol = ['h = b/2 = ' + b + '/2 = <b>' + h + '</b>',
            '(x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2; = x&sup2; + ' + b + 'x + ' + (h * h),
            'Para que quede ' + c + ' hay que sumar k = ' + c + ' &minus; ' + (h * h) + ' = <b>' + kk + '</b>',
            'Forma final: ' + P.texto([1, b, c]) + ' = (x ' + (h < 0 ? '&minus; ' + Math.abs(h) : '+ ' + h) + ')&sup2; ' + (kk < 0 ? '&minus; ' + Math.abs(kk) : '+ ' + kk)];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
