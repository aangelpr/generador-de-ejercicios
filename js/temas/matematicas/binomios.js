/* Binomios: productos notables */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function bin(c, a) { return F.poli([c, a], 'x'); }   // cx + a

  var G = EJ.guia.armar;

  var extra = {};

  extra.dosVariables = function (r) {
    var a = r.entero(1, 5), b = r.enteroNoCero(-6, 6);
    var mostrar = F.une([F.term(a * a, 'x', 2), F.term(2 * a * b, 'xy', 1), F.term(b * b, 'y', 2)]);
    return {
      guia: G({
        intro: 'Vamos a desarrollar <b>(' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')&sup2;</b>.<br>' +
          'Que haya dos letras no cambia nada: sigue siendo (primero + segundo)&sup2; = primero&sup2; + 2(primero)(segundo) + segundo&sup2;.<br>' +
          'Aqui el primero es <b>' + F.term(a, 'x', 1) + '</b> y el segundo es <b>' + F.term(b, 'y', 1) + '</b>.',
        pasos: [
          { pregunta: 'Cuadrado del primero: (' + F.term(a, 'x', 1) + ')&sup2;.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(a * a, { dec: 0 }),
            pista: 'Se eleva el coeficiente y tambien la letra: ' + a + '&sup2; = ' + (a * a) + ', y la x pasa a x&sup2;.',
            despues: 'Primer termino: ' + F.term(a * a, 'x', 2) + '.' },
          { pregunta: 'Doble producto: 2 &middot; (' + F.term(a, 'x', 1) + ') &middot; (' + F.term(b, 'y', 1) + ').<br>&iquest;Que coeficiente da?',
            resp: R.numero(2 * a * b, { dec: 0 }),
            pista: 'Multiplica solo los numeros: 2 &middot; ' + a + ' &middot; (' + b + ') = ' + (2 * a * b) + '.',
            despues: 'Y este termino lleva las DOS letras: ' + F.term(2 * a * b, 'xy', 1) + '. Es el que mas se olvida.' },
          { pregunta: 'Cuadrado del segundo: (' + F.term(b, 'y', 1) + ')&sup2;.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(b * b, { dec: 0 }),
            pista: b < 0 ? 'Ojo: un negativo al cuadrado sale positivo.' : 'Multiplica ' + b + ' por si mismo.',
            despues: 'Tercer termino: ' + F.term(b * b, 'y', 2) + '.' },
          { pregunta: 'Junta los tres y escribe el resultado completo.',
            resp: R.expresion('(' + (a * a) + ')*x^2+(' + (2 * a * b) + ')*x*y+(' + (b * b) + ')*y^2', { vars: ['x', 'y'], mostrar: mostrar }),
            pista: 'Es ' + mostrar + '.', despues: '' }
        ],
        final: '(' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')&sup2; = <b>' + mostrar + '</b>',
        receta: ['Cuadrado del primero',
          'Doble producto (lleva las dos letras)',
          'Cuadrado del segundo',
          'Se juntan los tres']
      }),
      enunciado: 'Desarrolla: (' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')&sup2;',
      respuesta: R.expresion('(' + (a * a) + ')*x^2+(' + (2 * a * b) + ')*x*y+(' + (b * b) + ')*y^2', {
        vars: ['x', 'y'], mostrar: mostrar
      }),
      pistas: ['Sigue siendo (a + b)&sup2; = a&sup2; + 2ab + b&sup2;, con a = ' + F.term(a, 'x', 1) + ' y b = ' + F.term(b, 'y', 1) + '.',
        'El termino de en medio lleva las dos letras: 2(' + F.term(a, 'x', 1) + ')(' + F.term(b, 'y', 1) + ') = ' + F.term(2 * a * b, 'xy', 1) + '.'],
      solucion: ['Cuadrado del primero: ' + F.term(a * a, 'x', 2),
        'Doble producto: ' + F.term(2 * a * b, 'xy', 1),
        'Cuadrado del segundo: ' + F.term(b * b, 'y', 2),
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  extra.factorizaDosVars = function (r) {
    var a = r.entero(1, 7), b = r.entero(1, 9);
    var mostrar = '(' + F.une([F.term(a, 'x', 1), F.term(b, 'y', 1)]) + ')(' + F.une([F.term(a, 'x', 1), F.term(-b, 'y', 1)]) + ')';
    return {
      guia: G({
        intro: 'Hay que factorizar <b>' + F.une([F.term(a * a, 'x', 2), F.term(-b * b, 'y', 2)]) + '</b>.<br>' +
          'Fijate: son dos cuadrados restandose. Eso es una <b>diferencia de cuadrados</b> y se abre en dos parentesis.',
        pasos: [
          { pregunta: 'Saca la raiz del primero: &radic;<span class="rad">' + (a * a) + 'x&sup2;</span>.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(a, { dec: 0 }),
            pista: '&radic;<span class="rad">' + (a * a) + '</span> = ' + a + ', y la raiz de x&sup2; es x.',
            despues: 'El primero es ' + F.term(a, 'x', 1) + '.' },
          { pregunta: 'Ahora la raiz del segundo: &radic;<span class="rad">' + (b * b) + 'y&sup2;</span>.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(b, { dec: 0 }),
            pista: '&radic;<span class="rad">' + (b * b) + '</span> = ' + b + ', y la raiz de y&sup2; es y.',
            despues: 'El segundo es ' + F.term(b, 'y', 1) + '.' },
          { pregunta: 'Ya con las dos raices, &iquest;como quedan los parentesis?',
            resp: R.opcion(['Uno sumando y otro restando: (a + b)(a &minus; b)', 'Los dos iguales: (a &minus; b)&sup2;'], 0),
            pista: 'Si fueran dos parentesis iguales apareceria un termino de en medio con xy, y aqui no hay.',
            despues: 'Esa es la identidad: a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).' },
          { pregunta: 'Escribe la factorizacion completa.',
            resp: R.factorizada('(' + a + '*x+' + b + '*y)*(' + a + '*x-' + b + '*y)', { vars: ['x', 'y'], mostrar: mostrar }),
            pista: 'Es ' + mostrar + '.', despues: '' }
        ],
        final: 'Resultado: <b>' + mostrar + '</b>',
        receta: ['Comprobar que son dos cuadrados restandose',
          'Sacar la raiz de cada uno',
          'Escribir (raiz1 + raiz2)(raiz1 &minus; raiz2)']
      }),
      enunciado: 'Factoriza: ' + F.une([F.term(a * a, 'x', 2), F.term(-b * b, 'y', 2)]),
      respuesta: R.factorizada('(' + a + '*x+' + b + '*y)*(' + a + '*x-' + b + '*y)', {
        vars: ['x', 'y'], mostrar: mostrar
      }),
      pistas: ['Es una diferencia de cuadrados, solo que con dos letras: a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).',
        'La raiz del primero es ' + F.term(a, 'x', 1) + ' y la del segundo ' + F.term(b, 'y', 1) + '.'],
      solucion: ['&radic;<span class="rad">' + (a * a) + 'x&sup2;</span> = ' + F.term(a, 'x', 1) + ' y &radic;<span class="rad">' + (b * b) + 'y&sup2;</span> = ' + F.term(b, 'y', 1),
        'Aplico (a + b)(a &minus; b)',
        'Resultado: <b>' + mostrar + '</b>']
    };
  };

  EJ.tema({
    id: 'binomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Binomios',
    descripcion: 'Binomio al cuadrado, al cubo, suma por diferencia y binomios con termino comun.',
    formulario: '(a + b)&sup2; = a&sup2; + 2ab + b&sup2; &nbsp;&middot;&nbsp; (a &minus; b)&sup2; = a&sup2; &minus; 2ab + b&sup2;<br>' +
      '(a + b)(a &minus; b) = a&sup2; &minus; b&sup2; &nbsp;&middot;&nbsp; (x + a)(x + b) = x&sup2; + (a+b)x + ab<br>' +
      '(a + b)&sup3; = a&sup3; + 3a&sup2;b + 3ab&sup2; + b&sup3;',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, res;

      if (dif === 'facil') {
        var t = r.subtema([
          ['cuadrado', 'Binomio al cuadrado'],
          ['conjugados', 'Suma por diferencia'],
          ['terminoComun', 'Binomios con termino comun']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'cuadrado') {
          a = r.enteroNoCero(-9, 9);
          res = P.potencia([1, a], 2);
          guiaDelPaso = EJ.guia.binomioCuadrado(1, a);
          enun = 'Desarrolla: (' + bin(1, a) + ')&sup2;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Usa (a &plusmn; b)&sup2; = a&sup2; &plusmn; 2ab + b&sup2;. Aqui a = x y b = ' + Math.abs(a) + '.',
            'El termino de en medio es 2 &middot; x &middot; (' + a + ') = ' + (2 * a) + 'x y el ultimo es (' + a + ')&sup2; = ' + (a * a) + '.'];
          sol = ['Cuadrado del primero: x&sup2;',
            'Doble producto: 2(x)(' + a + ') = ' + (2 * a) + 'x',
            'Cuadrado del segundo: (' + a + ')&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t === 'conjugados') {
          a = r.entero(2, 12);
          res = [1, 0, -a * a];
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + bin(1, a) + ')(' + bin(1, -a) + ')</b>.<br>' +
              'Mira bien: los dos parentesis son identicos salvo por el signo de en medio. Cuando pasa eso hay un atajo.',
            pasos: [
              { pregunta: '&iquest;Que producto notable es este?',
                resp: R.opcion(['Suma por su diferencia', 'Binomio al cuadrado'], 0),
                pista: 'Uno SUMA ' + a + ' y el otro RESTA ' + a + '. La formula es (a + b)(a &minus; b).',
                despues: 'Por eso no hace falta multiplicar termino por termino.' },
              { pregunta: 'Veamos por que hay atajo. Al multiplicar saldrian +' + a + 'x y &minus;' + a + 'x.<br>&iquest;Cuanto suman esos dos?',
                resp: R.numero(0, { dec: 0 }),
                pista: 'Son el mismo numero con signos contrarios.',
                despues: 'Se cancelan. Por eso el resultado NO tiene termino con x.' },
              { pregunta: 'Cuadrado del segundo: &iquest;cuanto es (' + a + ')&sup2;?',
                resp: R.numero(a * a, { dec: 0 }),
                pista: 'Multiplica ' + a + ' por si mismo.',
                despues: 'Y va restando, porque la formula es a&sup2; &minus; b&sup2;.' },
              { pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
                pista: 'Es el cuadrado del primero (x&sup2;) menos ' + (a * a) + '.', despues: '' }
            ],
            final: '(' + bin(1, a) + ')(' + bin(1, -a) + ') = <b>' + P.texto(res) + '</b>',
            receta: ['Reconocer que son iguales salvo el signo',
              'Cuadrado del primero',
              'MENOS el cuadrado del segundo',
              'No hay termino de en medio: se cancela']
          });
          enun = 'Desarrolla: (' + bin(1, a) + ')(' + bin(1, -a) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Es una suma por su diferencia: el resultado es el cuadrado del primero menos el cuadrado del segundo.',
            'x&sup2; &minus; (' + a + ')&sup2;'];
          sol = ['(a + b)(a &minus; b) = a&sup2; &minus; b&sup2;',
            'a = x, b = ' + a,
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else {
          a = r.enteroNoCero(-8, 8); b = r.enteroNoCero(-8, 8);
          while (b === a) b = r.enteroNoCero(-8, 8);
          res = P.multiplica([1, a], [1, b]);
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + bin(1, a) + ')(' + bin(1, b) + ')</b>.<br>' +
              'Los dos parentesis empiezan con la misma x: ese es el <b>termino comun</b>.<br>' +
              'La formula es (x + a)(x + b) = x&sup2; + (a + b)x + ab. O sea: solo hay que sumar y multiplicar los dos numeros.',
            pasos: [
              { pregunta: 'El primer termino sale de x &middot; x.<br>&iquest;Que exponente lleva la x?',
                resp: R.numero(2, { dec: 0 }),
                pista: 'Multiplicandose, los exponentes se suman: 1 + 1.',
                despues: 'Primer termino: x&sup2;, con coeficiente 1.' },
              { pregunta: 'Ahora SUMA los dos numeros: ' + a + ' + (' + b + ')',
                resp: R.numero(a + b, { dec: 0 }),
                pista: 'Cuidado con los signos. Uno es ' + a + ' y el otro ' + b + '.',
                despues: (a + b) === 0 ? 'Da 0, asi que el termino con x desaparece del resultado.'
                  : 'Esa suma es el coeficiente de la x: ' + F.term(a + b, 'x', 1) + '.' },
              { pregunta: 'Ahora MULTIPLICALOS: ' + a + ' &middot; (' + b + ')',
                resp: R.numero(a * b, { dec: 0 }),
                pista: (a * b) < 0 ? 'Signos distintos: el resultado es negativo.' : 'Signos iguales: el resultado es positivo.',
                despues: 'Ese es el termino independiente (el que va solo, sin x).' },
              { pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
                pista: 'Es ' + P.texto(res) + '.', despues: '' }
            ],
            final: '(' + bin(1, a) + ')(' + bin(1, b) + ') = <b>' + P.texto(res) + '</b>',
            receta: ['x&sup2; siempre va primero',
              'La SUMA de los dos numeros acompaña a la x',
              'El PRODUCTO de los dos numeros va solo',
              'Sirve al reves para factorizar trinomios']
          });
          enun = 'Desarrolla: (' + bin(1, a) + ')(' + bin(1, b) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['(x + a)(x + b) = x&sup2; + (a + b)x + ab.',
            'a + b = ' + (a + b) + ' y a &middot; b = ' + (a * b) + '.'];
          sol = ['Termino cuadratico: x&sup2;',
            'Coeficiente lineal: ' + a + ' + (' + b + ') = ' + (a + b),
            'Termino independiente: (' + a + ')(' + b + ') = ' + (a * b),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['cuadradoCoef', 'Cuadrado con coeficiente'],
          ['conjugadosCoef', 'Suma por diferencia con coeficiente'],
          ['factorizaDif', 'Factorizar diferencia de cuadrados'],
          ['dosVariables', 'Binomio con dos variables']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'cuadradoCoef') {
          c = r.entero(2, 6); a = r.enteroNoCero(-9, 9);
          res = P.potencia([c, a], 2);
          guiaDelPaso = EJ.guia.binomioCuadrado(c, a);
          enun = 'Desarrolla: (' + bin(c, a) + ')&sup2;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Ahora el primer termino tiene coeficiente: (a + b)&sup2; = a&sup2; + 2ab + b&sup2; con a = ' + c + 'x.',
            'a&sup2; = ' + (c * c) + 'x&sup2; y 2ab = 2(' + c + 'x)(' + a + ') = ' + (2 * c * a) + 'x.'];
          sol = ['Cuadrado del primero: (' + c + 'x)&sup2; = ' + (c * c) + 'x&sup2;',
            'Doble producto: 2(' + c + 'x)(' + a + ') = ' + (2 * c * a) + 'x',
            'Cuadrado del segundo: (' + a + ')&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t2 === 'conjugadosCoef') {
          c = r.entero(2, 7); a = r.entero(2, 10);
          res = [c * c, 0, -a * a];
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + bin(c, a) + ')(' + bin(c, -a) + ')</b>.<br>' +
              'Otra vez son iguales salvo el signo: suma por su diferencia, (a + b)(a &minus; b) = a&sup2; &minus; b&sup2;.<br>' +
              'Lo unico nuevo es que el primero trae coeficiente: a = <b>' + bin(c, 0) + '</b>.',
            pasos: [
              { pregunta: 'Cuadrado del primero: (' + bin(c, 0) + ')&sup2;.<br>&iquest;Que coeficiente queda?',
                resp: R.numero(c * c, { dec: 0 }),
                pista: 'Se eleva TODO, no solo la x: ' + c + '&sup2; = ' + (c * c) + '. Es el error mas comun dejarlo en ' + c + '.',
                despues: 'Primer termino: ' + F.term(c * c, 'x', 2) + '.' },
              { pregunta: 'Cuadrado del segundo: (' + a + ')&sup2;',
                resp: R.numero(a * a, { dec: 0 }),
                pista: 'Multiplica ' + a + ' por si mismo.', despues: '' },
              { pregunta: '&iquest;Con que signo entra ese segundo cuadrado?',
                resp: R.opcion(['Restando', 'Sumando'], 0),
                pista: 'La formula termina en &minus; b&sup2;.',
                despues: 'Y no hay termino de en medio: los de en medio se cancelan.' },
              { pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
                pista: 'Es ' + P.texto(res) + '.', despues: '' }
            ],
            final: '(' + bin(c, a) + ')(' + bin(c, -a) + ') = <b>' + P.texto(res) + '</b>',
            receta: ['Cuadrado del primero (coeficiente incluido)',
              'MENOS el cuadrado del segundo',
              'Nunca hay termino de en medio']
          });
          enun = 'Desarrolla: (' + bin(c, a) + ')(' + bin(c, -a) + ')';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['Sigue siendo suma por diferencia: (a+b)(a&minus;b) = a&sup2; &minus; b&sup2;.',
            'a = ' + c + 'x, b = ' + a + '.'];
          sol = ['a&sup2; = (' + c + 'x)&sup2; = ' + (c * c) + 'x&sup2;',
            'b&sup2; = ' + a + '&sup2; = ' + (a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else {
          c = r.elige([1, 2, 3, 4, 5]); a = r.entero(2, 10);
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>' + P.texto([c * c, 0, -a * a]) + '</b>.<br>' +
              'Factorizar es el camino de regreso: en vez de abrir parentesis, hay que cerrarlos.<br>' +
              'Aqui hay dos cuadrados restandose, asi que se usa a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).',
            pasos: [
              { pregunta: '&iquest;Por que se puede factorizar asi?',
                resp: R.opcion(['Porque los dos terminos son cuadrados y se estan restando',
                  'Porque no tiene termino de en medio'], 0),
                pista: 'Los dos tienen raiz exacta y hay un menos entre ellos: esas son las dos condiciones.',
                despues: 'Si estuvieran sumandose NO se podria (una suma de cuadrados no se factoriza asi).' },
              { pregunta: 'Saca la raiz del primero: &radic;<span class="rad">' + (c * c) + 'x&sup2;</span>.<br>&iquest;Que coeficiente queda?',
                resp: R.numero(c, { dec: 0 }),
                pista: '&radic;<span class="rad">' + (c * c) + '</span> = ' + c + ', y la raiz de x&sup2; es x.',
                despues: 'El primero es ' + bin(c, 0) + '.' },
              { pregunta: 'Ahora la raiz del segundo: &radic;<span class="rad">' + (a * a) + '</span>',
                resp: R.numero(a, { dec: 0 }),
                pista: 'Busca el numero que multiplicado por si mismo da ' + (a * a) + '.',
                despues: 'El segundo es ' + a + '.' },
              { pregunta: 'Escribe la factorizacion completa: los dos parentesis.',
                resp: R.factorizada('(' + c + '*x+' + a + ')*(' + c + '*x-' + a + ')', {
                  mostrar: '(' + bin(c, a) + ')(' + bin(c, -a) + ')' }),
                pista: 'Uno con mas y otro con menos: (' + bin(c, a) + ')(' + bin(c, -a) + ').',
                despues: '' }
            ],
            final: 'Resultado: <b>(' + bin(c, a) + ')(' + bin(c, -a) + ')</b>',
            receta: ['Comprobar: dos cuadrados RESTANDOSE',
              'Sacar la raiz de cada uno',
              'Escribir (raiz1 + raiz2)(raiz1 &minus; raiz2)',
              'Se puede comprobar multiplicando de vuelta']
          });
          enun = 'Factoriza: ' + P.texto([c * c, 0, -a * a]);
          resp = R.factorizada('(' + c + '*x+' + a + ')*(' + c + '*x-' + a + ')', {
            mostrar: '(' + bin(c, a) + ')(' + bin(c, -a) + ')'
          });
          pistas = ['Es una diferencia de cuadrados: a&sup2; &minus; b&sup2; = (a + b)(a &minus; b).',
            'La raiz del primero es ' + bin(c, 0) + ' y la del segundo es ' + a + '.'];
          sol = ['&radic;<span class="rad">' + (c * c) + 'x&sup2;</span> = ' + c + 'x y &radic;<span class="rad">' + (a * a) + '</span> = ' + a,
            'a&sup2; &minus; b&sup2; = (a + b)(a &minus; b)',
            'Resultado: <b>(' + bin(c, a) + ')(' + bin(c, -a) + ')</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['cubo', 'Binomio al cubo'],
          ['cuadradoGrado', 'Cuadrado con potencias altas'],
          ['cubosFactor', 'Factorizar suma o diferencia de cubos'],
          ['factorizaDosVars', 'Diferencia de cuadrados con dos variables']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'cubo') {
          c = r.elige([1, 1, 2, 3]); a = r.enteroNoCero(-5, 5);
          res = P.potencia([c, a], 3);
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + bin(c, a) + ')&sup3;</b>.<br>' +
              'Al cubo salen <b>cuatro</b> terminos, no tres. La formula es:<br>' +
              '(a + b)&sup3; = a&sup3; + 3a&sup2;b + 3ab&sup2; + b&sup3;.<br>' +
              'Aqui a = <b>' + bin(c, 0) + '</b> y b = <b>' + a + '</b>. Fijate en el patron: la a va bajando de grado y la b subiendo.',
            pasos: [
              { pregunta: 'Primer termino, a&sup3;: (' + bin(c, 0) + ')&sup3;.<br>&iquest;Que coeficiente queda?',
                resp: R.numero(c * c * c, { dec: 0 }),
                pista: c === 1 ? '1 al cubo sigue siendo 1.' : c + ' &middot; ' + c + ' &middot; ' + c + ' = ' + (c * c * c) + '.',
                despues: 'Y la x se va a x&sup3;: ' + F.term(c * c * c, 'x', 3) + '.' },
              { pregunta: 'Segundo termino, 3a&sup2;b: 3 &middot; ' + (c * c) + ' &middot; (' + a + ').<br>&iquest;Cuanto da?',
                resp: R.numero(3 * c * c * a, { dec: 0 }),
                pista: 'a&sup2; = ' + (c * c) + 'x&sup2;, y eso por 3 y por ' + a + '.',
                despues: 'Este lleva x&sup2;: ' + F.term(3 * c * c * a, 'x', 2) + '.' },
              { pregunta: 'Tercer termino, 3ab&sup2;: 3 &middot; ' + c + ' &middot; (' + a + ')&sup2;.<br>&iquest;Cuanto da?',
                resp: R.numero(3 * c * a * a, { dec: 0 }),
                pista: 'Primero (' + a + ')&sup2; = ' + (a * a) + ' (sale positivo aunque sea negativo), luego 3 &middot; ' + c + ' &middot; ' + (a * a) + '.',
                despues: 'Este lleva x: ' + F.term(3 * c * a * a, 'x', 1) + '.' },
              { pregunta: 'Cuarto termino, b&sup3;: (' + a + ')&sup3;',
                resp: R.numero(a * a * a, { dec: 0 }),
                pista: a < 0 ? 'Negativo al CUBO se queda negativo (exponente impar).' : 'Multiplica ' + a + ' tres veces.',
                despues: 'Ya estan los cuatro pedazos.' },
              { pregunta: 'Junta los cuatro y escribe el resultado completo.',
                resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
                pista: 'Es ' + P.texto(res) + '.', despues: '' }
            ],
            final: '(' + bin(c, a) + ')&sup3; = <b>' + P.texto(res) + '</b>',
            receta: ['Cubo del primero',
              'Triple del primero al cuadrado por el segundo',
              'Triple del primero por el segundo al cuadrado',
              'Cubo del segundo',
              'Son cuatro terminos, los de en medio llevan el 3']
          });
          enun = 'Desarrolla: (' + bin(c, a) + ')&sup3;';
          resp = R.expresion(P.expr(res), { mostrar: P.texto(res) });
          pistas = ['(a + b)&sup3; = a&sup3; + 3a&sup2;b + 3ab&sup2; + b&sup3;, con a = ' + bin(c, 0) + ' y b = ' + a + '.',
            'a&sup3; = ' + (c * c * c) + 'x&sup3; y b&sup3; = ' + (a * a * a) + '.'];
          sol = ['a&sup3; = (' + c + 'x)&sup3; = ' + (c * c * c) + 'x&sup3;',
            '3a&sup2;b = 3(' + (c * c) + 'x&sup2;)(' + a + ') = ' + (3 * c * c * a) + 'x&sup2;',
            '3ab&sup2; = 3(' + c + 'x)(' + (a * a) + ') = ' + (3 * c * a * a) + 'x',
            'b&sup3; = ' + (a * a * a),
            'Resultado: <b>' + P.texto(res) + '</b>'];
        } else if (t3 === 'cuadradoGrado') {
          c = r.entero(2, 5); a = r.enteroNoCero(-7, 7);
          var m = r.entero(2, 3);
          var cuad = [c * c, 0, 2 * c * a, 0, a * a];   // (cx^2 + a)^2 cuando m = 2
          var mostrar, exprTxt;
          if (m === 2) {
            mostrar = F.term(c * c, 'x', 4) + ' + ' + F.term(2 * c * a, 'x', 2) + ' + ' + (a * a);
            mostrar = F.une([F.term(c * c, 'x', 4), F.term(2 * c * a, 'x', 2), String(a * a)]);
            exprTxt = '(' + (c * c) + ')*x^4+(' + (2 * c * a) + ')*x^2+(' + (a * a) + ')';
          } else {
            mostrar = F.une([F.term(c * c, 'x', 6), F.term(2 * c * a, 'x', 3), String(a * a)]);
            exprTxt = '(' + (c * c) + ')*x^6+(' + (2 * c * a) + ')*x^3+(' + (a * a) + ')';
          }
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + F.une([F.term(c, 'x', m), String(a)]) + ')&sup2;</b>.<br>' +
              'Sigue siendo el binomio al cuadrado de siempre. Lo unico distinto es que el primero ya trae exponente, ' +
              'asi que hay que acordarse de como se eleva una potencia a otra potencia.',
            pasos: [
              { pregunta: 'Cuadrado del primero: (' + F.term(c, 'x', m) + ')&sup2;.<br>&iquest;Que coeficiente queda?',
                resp: R.numero(c * c, { dec: 0 }),
                pista: 'El coeficiente se eleva de verdad: ' + c + '&sup2; = ' + (c * c) + '.',
                despues: '' },
              { pregunta: 'Y la x: (x' + F.sup(m) + ')&sup2; &rarr; &iquest;que exponente queda?',
                resp: R.numero(2 * m, { dec: 0 }),
                pista: 'Potencia de una potencia: los exponentes se MULTIPLICAN, ' + m + ' &middot; 2. (No se suman.)',
                despues: 'Primer termino: ' + F.term(c * c, 'x', 2 * m) + '.' },
              { pregunta: 'Doble producto: 2 &middot; (' + F.term(c, 'x', m) + ') &middot; (' + a + ').<br>&iquest;Que coeficiente da?',
                resp: R.numero(2 * c * a, { dec: 0 }),
                pista: 'Solo los numeros: 2 &middot; ' + c + ' &middot; (' + a + ') = ' + (2 * c * a) + '.',
                despues: 'Aqui el exponente NO se duplica: se copia tal cual, queda ' + F.term(2 * c * a, 'x', m) + '.' },
              { pregunta: 'Cuadrado del segundo: (' + a + ')&sup2;',
                resp: R.numero(a * a, { dec: 0 }),
                pista: a < 0 ? 'Negativo al cuadrado sale positivo.' : 'Multiplica ' + a + ' por si mismo.',
                despues: '' },
              { pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(exprTxt, { mostrar: mostrar }),
                pista: 'Es ' + mostrar + '.', despues: '' }
            ],
            final: '(' + F.une([F.term(c, 'x', m), String(a)]) + ')&sup2; = <b>' + mostrar + '</b>',
            receta: ['Cuadrado del primero: coeficiente al cuadrado y exponente por 2',
              'Doble producto: el exponente se copia igual',
              'Cuadrado del segundo',
              'Potencia de potencia = exponentes se multiplican']
          });
          enun = 'Desarrolla: (' + F.une([F.term(c, 'x', m), String(a)]) + ')&sup2;';
          resp = R.expresion(exprTxt, { mostrar: mostrar });
          pistas = ['Sigue siendo (a + b)&sup2;, solo que a = ' + F.term(c, 'x', m) + '.',
            'Recuerda que (x' + F.sup(m) + ')&sup2; = x' + F.sup(2 * m) + '.'];
          sol = ['a&sup2; = (' + F.term(c, 'x', m) + ')&sup2; = ' + F.term(c * c, 'x', 2 * m),
            '2ab = 2(' + F.term(c, 'x', m) + ')(' + a + ') = ' + F.term(2 * c * a, 'x', m),
            'b&sup2; = ' + (a * a),
            'Resultado: <b>' + mostrar + '</b>'];
        } else {
          a = r.entero(1, 5);
          var signo = r.bool() ? 1 : -1;
          var cubo = a * a * a;
          var pol = [1, 0, 0, signo * cubo];
          guiaDelPaso = G({
            intro: 'Hay que factorizar <b>' + P.texto(pol) + '</b>.<br>' +
              'Los dos terminos son cubos, asi que se usa una de estas dos formulas:<br>' +
              'a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;)<br>' +
              'a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;)',
            pasos: [
              { pregunta: 'Aqui a = x. &iquest;Y cuanto vale b? O sea: &iquest;de que numero es cubo ' + cubo + '?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'Busca el numero que multiplicado tres veces por si mismo da ' + cubo + '. Prueba: ' + a + ' &middot; ' + a + ' &middot; ' + a + '.',
                despues: 'Entonces b = ' + a + '.' },
              { pregunta: '&iquest;Cual de las dos formulas toca aqui?',
                resp: R.opcion(['a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;)',
                  'a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;)'], signo > 0 ? 0 : 1),
                pista: 'Fijate en el signo del ejercicio: es una ' + (signo > 0 ? 'SUMA' : 'RESTA') + ' de cubos.',
                despues: 'Truco para acordarse: el parentesis chico lleva el MISMO signo, y el de en medio del trinomio lleva el CONTRARIO.' },
              { pregunta: 'En el trinomio grande, el termino de en medio es &plusmn;ab.<br>&iquest;Que coeficiente lleva la x ahi?',
                resp: R.numero(-signo * a, { dec: 0 }),
                pista: 'Como el parentesis chico va con ' + (signo > 0 ? 'mas' : 'menos') + ', el de en medio va con ' +
                  (signo > 0 ? 'menos' : 'mas') + ': ' + (signo > 0 ? '&minus;' : '+') + a + 'x.',
                despues: '' },
              { pregunta: 'Y el ultimo termino del trinomio es b&sup2;. &iquest;Cuanto vale?',
                resp: R.numero(a * a, { dec: 0 }),
                pista: a + '&sup2; = ' + (a * a) + '. Siempre va SUMANDO.',
                despues: 'El trinomio nunca se puede factorizar mas: ahi se acaba.' },
              { pregunta: 'Escribe la factorizacion completa.',
                resp: R.factorizada('(x' + (signo > 0 ? '+' : '-') + a + ')*(x^2' + (signo > 0 ? '-' : '+') + a + 'x+' + (a * a) + ')', {
                  mostrar: '(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')' }),
                pista: 'Es (' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ').',
                despues: '' }
            ],
            final: 'Resultado: <b>(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')</b>',
            receta: ['Sacar la raiz cubica de cada termino',
              'Parentesis chico: las dos raices con el MISMO signo del ejercicio',
              'Trinomio: a&sup2;, luego ab con el signo CONTRARIO, luego b&sup2; sumando',
              'El trinomio ya no se factoriza mas']
          });
          enun = 'Factoriza: ' + P.texto(pol);
          var f1 = '(x' + (signo > 0 ? '+' : '-') + a + ')';
          var f2 = '(x^2' + (signo > 0 ? '-' : '+') + a + 'x+' + (a * a) + ')';
          resp = R.factorizada(f1 + '*' + f2, {
            mostrar: '(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')'
          });
          pistas = [signo > 0 ? 'Es una suma de cubos: a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;).'
            : 'Es una diferencia de cubos: a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;).',
            'a = x y b = ' + a + ' porque ' + a + '&sup3; = ' + cubo + '.'];
          sol = ['Identifico a = x, b = ' + a + ' (ya que ' + a + '&sup3; = ' + cubo + ')',
            signo > 0 ? 'a&sup3; + b&sup3; = (a + b)(a&sup2; &minus; ab + b&sup2;)' : 'a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;)',
            'Resultado: <b>(' + F.poli([1, signo * a], 'x') + ')(' + F.poli([1, -signo * a, a * a], 'x') + ')</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
