/* Modo guiado: en vez de pedir el resultado final, el ejercicio se parte en
   micro-preguntas ("multiplica esto por esto, cuanto da?") y se va llenando un
   tablero conforme contestas.

   Un tema arma su guia devolviendo, junto al ejercicio, un objeto asi:

     guia: {
       intro:  'texto que plantea el problema',
       tablero: function (hechos) { return '<pre>...</pre>'; },   // opcional
       pasos:  [ { pregunta, resp, pista, despues } ],
       final:  'el resultado y la receta',
       receta: ['1. Bajar', '2. Multiplicar', ...]                // opcional
     }

   Aqui viven los constructores que arman esas guias para familias completas de
   ejercicios, para que los archivos de temas solo tengan que llamarlos. */
(function (global) {
  'use strict';
  var EJ = global.EJ = global.EJ || {};
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  /* ---------- ayudas para dibujar tableros ---------- */
  function celda(v, ancho) {
    var s = (v === null || v === undefined) ? '' : String(v);
    while (s.length < ancho) s = ' ' + s;
    return s;
  }
  function pre(lineas) {
    return '<pre class="tablero">' + lineas.join('\n') + '</pre>';
  }

  var guia = {};

  /* ================= DIVISION SINTETICA ================= */
  guia.sintetica = function (coefs, a) {
    var n = coefs.length;
    var mult = [], abajo = [coefs[0]];
    for (var i = 1; i < n; i++) {
      mult.push(abajo[i - 1] * a);
      abajo.push(coefs[i] + mult[i - 1]);
    }
    var cociente = abajo.slice(0, n - 1);
    var residuo = abajo[n - 1];

    var ancho = 1;
    coefs.concat(mult).concat(abajo).forEach(function (v) {
      ancho = Math.max(ancho, String(v).length);
    });
    ancho += 2;
    var anchoIzq = String(a).length + 2;

    function tablero(hechos) {
      var verAbajo = Math.ceil(hechos / 2);
      var verMult = Math.floor(hechos / 2);
      var l1 = celda(a, anchoIzq) + ' |' + coefs.map(function (c) { return celda(c, ancho); }).join('');
      var l2 = celda('', anchoIzq) + ' |' + celda('', ancho) +
        mult.map(function (m, k) { return celda(k < verMult ? m : '', ancho); }).join('');
      var raya = celda('', anchoIzq) + ' +' + new Array(ancho * n + 1).join('-');
      var l4 = celda('', anchoIzq) + '  ' +
        abajo.map(function (b, k) { return celda(k < verAbajo ? b : '', ancho); }).join('');
      return pre([l1, l2, raya, l4]);
    }

    var pasos = [{
      pregunta: 'Se baja el primer coeficiente tal cual. &iquest;Que numero bajamos?',
      resp: R.numero(coefs[0], { dec: 0 }),
      pista: 'Es el primer numero de la lista: ' + coefs.join(', ') + '.',
      despues: 'Ese numero ya quedo abajo. De aqui en adelante siempre es: multiplicar y sumar.'
    }];

    for (var k = 0; k < n - 1; k++) {
      (function (k) {
        pasos.push({
          pregunta: 'Multiplica el numero que acabas de obtener abajo (<b>' + abajo[k] + '</b>) por el de afuera (<b>' + a + '</b>).<br>&iquest;Cuanto da ' + abajo[k] + ' &middot; ' + a + '?',
          resp: R.numero(mult[k], { dec: 0 }),
          pista: 'Cuidado con los signos: ' + (abajo[k] < 0 ? 'negativo' : 'positivo') + ' por ' + (a < 0 ? 'negativo' : 'positivo') + ' da ' + (mult[k] < 0 ? 'negativo' : 'positivo') + '.',
          despues: 'Ese ' + mult[k] + ' se escribe debajo del siguiente coeficiente (' + coefs[k + 1] + ').'
        });
        pasos.push({
          pregunta: 'Ahora suma esa columna:<br>&iquest;Cuanto da ' + coefs[k + 1] + ' + (' + mult[k] + ')?',
          resp: R.numero(abajo[k + 1], { dec: 0 }),
          pista: 'Suma el coeficiente de arriba con el numero que acabas de poner debajo.',
          despues: k + 1 < n - 1
            ? 'Ese resultado va abajo, y con el volvemos a multiplicar por ' + a + '.'
            : 'Ese ultimo numero de abajo es el <b>residuo</b>.'
        });
      })(k);
    }

    return {
      intro: 'Vamos a dividir <b>' + P.texto(coefs) + '</b> entre <b>' + F.poli([1, -a], 'x') + '</b>.<br>' +
        'Usamos el <b>' + a + '</b> porque ' + F.poli([1, -a], 'x') + ' = 0 cuando x = ' + a + '.<br>' +
        'Los coeficientes son: <b>' + coefs.join(', ') + '</b>',
      tablero: tablero,
      pasos: pasos,
      final: 'Los numeros de abajo, menos el ultimo, son los coeficientes del resultado: <b>' + cociente.join(', ') + '</b>.<br>' +
        'Como empezamos en x' + F.sup(n - 1) + ', el cociente es <b>' + P.texto(cociente) + '</b>' +
        ' y el residuo es <b>' + residuo + '</b>.',
      receta: ['Bajar el primer coeficiente',
        'Multiplicar ese numero por el de afuera',
        'Sumar la columna',
        'Repetir: multiplicar y sumar hasta acabar',
        'El ultimo numero de abajo es el residuo']
    };
  };

  /* ================= PRODUCTO CON SIGNOS ================= */
  guia.productoSignos = function (a, b) {
    var val = a * b;
    return {
      intro: 'Vamos a resolver <b>(' + a + ') &middot; (' + b + ')</b> por partes: primero el signo y luego los numeros.',
      pasos: [
        {
          pregunta: 'Los signos son ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + '.<br>&iquest;De que signo va a salir el resultado?',
          resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
          pista: 'Signos iguales dan positivo; signos distintos dan negativo.',
          despues: 'Ya sabemos el signo. Ahora solo faltan los numeros.'
        },
        {
          pregunta: 'Multiplica los numeros sin signo:<br>&iquest;Cuanto da ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + '?',
          resp: R.numero(Math.abs(val), { dec: 0 }),
          pista: 'Es una multiplicacion normal, ignorando los signos por un momento.',
          despues: 'Perfecto. Ya tenemos el numero y el signo.'
        },
        {
          pregunta: 'Junta las dos cosas: escribe el resultado completo, con su signo.',
          resp: R.numero(val, { dec: 0 }),
          pista: 'Es ' + Math.abs(val) + ' con signo ' + (val < 0 ? 'negativo' : 'positivo') + '.',
          despues: ''
        }
      ],
      final: '(' + a + ') &middot; (' + b + ') = <b>' + val + '</b>',
      receta: ['Primero decide el SIGNO con la regla',
        'Luego multiplica los numeros sin signo',
        'Junta los dos']
    };
  };

  /* ================= SUMA Y RESTA DE FRACCIONES ================= */
  guia.sumaFracciones = function (a, b, c, d, esSuma) {
    var m = F.mcm(b, d);
    var fa = m / b, fc = m / d;
    var na = a * fa, nc = c * fc;
    var num = esSuma ? na + nc : na - nc;
    var g = F.mcd(num, m);
    var s = F.simplifica(num, m);
    var signo = esSuma ? '+' : '&minus;';
    return {
      intro: 'Vamos a resolver <b>' + F.frac(a, b) + ' ' + signo + ' ' + F.frac(c, d) + '</b>.<br>' +
        'Para sumar o restar fracciones necesitamos que tengan el MISMO denominador.',
      pasos: [
        {
          pregunta: '&iquest;Cual es el minimo comun multiplo de <b>' + b + '</b> y <b>' + d + '</b>?',
          resp: R.numero(m, { dec: 0 }),
          pista: 'Es el numero mas chico al que le caben exactos tanto el ' + b + ' como el ' + d + '.',
          despues: 'Ese ' + m + ' va a ser el denominador de las dos fracciones.'
        },
        {
          pregunta: 'Para que ' + F.frac(a, b) + ' tenga denominador ' + m + ', hay que multiplicar arriba y abajo por el mismo numero.<br>&iquest;Por cual? (' + m + ' &divide; ' + b + ')',
          resp: R.numero(fa, { dec: 0 }),
          pista: 'Divide el nuevo denominador entre el que ya tenias: ' + m + ' &divide; ' + b + '.',
          despues: 'Entonces el numerador ' + a + ' se multiplica por ' + fa + '.'
        },
        {
          pregunta: '&iquest;Cuanto queda ese numerador? (' + a + ' &middot; ' + fa + ')',
          resp: R.numero(na, { dec: 0 }),
          pista: 'Multiplica ' + a + ' por ' + fa + '.',
          despues: 'La primera fraccion quedo ' + F.frac(na, m) + '.'
        },
        {
          pregunta: 'Ahora la otra: ' + F.frac(c, d) + ' se multiplica por ' + fc + '.<br>&iquest;Cuanto queda su numerador? (' + c + ' &middot; ' + fc + ')',
          resp: R.numero(nc, { dec: 0 }),
          pista: m + ' &divide; ' + d + ' = ' + fc + ', asi que el numerador se multiplica por ' + fc + '.',
          despues: 'La segunda quedo ' + F.frac(nc, m) + '.'
        },
        {
          pregunta: 'Ya tienen el mismo denominador: ' + F.frac(na, m) + ' ' + signo + ' ' + F.frac(nc, m) + '<br>' +
            '&iquest;Cuanto da ' + na + ' ' + signo + ' ' + nc + '? (solo los numeradores)',
          resp: R.numero(num, { dec: 0 }),
          pista: 'El denominador NO se toca, solo se operan los de arriba.',
          despues: 'Vamos en ' + F.frac(num, m) + '.'
        },
        {
          pregunta: '&iquest;Se puede simplificar ' + F.frac(num, m) + '?<br>Escribe la fraccion ya simplificada.',
          resp: R.fraccion(s[0], s[1]),
          pista: g === 1 ? 'Revisa si algun numero divide a los dos... si no, ya estaba simplificada.'
            : 'Los dos se pueden dividir entre ' + g + '.',
          despues: ''
        }
      ],
      final: F.frac(a, b) + ' ' + signo + ' ' + F.frac(c, d) + ' = <b>' + F.fracSimp(num, m) + '</b>',
      receta: ['Sacar el m.c.m. de los denominadores',
        'Convertir cada fraccion a ese denominador',
        'Operar SOLO los numeradores',
        'Simplificar al final']
    };
  };

  /* ================= BINOMIO AL CUADRADO ================= */
  guia.binomioCuadrado = function (c, a) {
    var res = P.potencia([c, a], 2);
    var primero = F.term(c, 'x', 1);
    return {
      intro: 'Vamos a desarrollar <b>(' + F.poli([c, a], 'x') + ')&sup2;</b>.<br>' +
        'La formula es (primero + segundo)&sup2; = primero&sup2; + 2(primero)(segundo) + segundo&sup2;.<br>' +
        'Aqui el primero es <b>' + primero + '</b> y el segundo es <b>' + a + '</b>.',
      pasos: [
        {
          pregunta: 'Primer termino: eleva al cuadrado el primero.<br>&iquest;Cuanto es (' + primero + ')&sup2;?',
          resp: R.expresion('(' + (c * c) + ')*x^2', { mostrar: F.term(c * c, 'x', 2) }),
          pista: 'Se eleva el coeficiente y tambien la x: (' + c + ')&sup2; = ' + (c * c) + ' y x&sup2;.',
          despues: 'Ese es el primer termino del resultado.'
        },
        {
          pregunta: 'Segundo termino: el DOBLE producto.<br>&iquest;Cuanto es 2 &middot; (' + primero + ') &middot; (' + a + ')?',
          resp: R.expresion('(' + (2 * c * a) + ')*x', { mostrar: F.term(2 * c * a, 'x', 1) }),
          pista: 'Multiplica 2 &middot; ' + c + ' &middot; (' + a + ') = ' + (2 * c * a) + ', y le queda la x.',
          despues: 'Este es el que mas se olvida. Ya lo tienes.'
        },
        {
          pregunta: 'Tercer termino: el cuadrado del segundo.<br>&iquest;Cuanto es (' + a + ')&sup2;?',
          resp: R.numero(a * a, { dec: 0 }),
          pista: a < 0 ? 'Ojo: un negativo al cuadrado sale positivo.' : 'Multiplica ' + a + ' por si mismo.',
          despues: 'Ya tenemos los tres pedazos.'
        },
        {
          pregunta: 'Junta los tres terminos y escribe el resultado completo.',
          resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
          pista: 'Es ' + F.term(c * c, 'x', 2) + ', luego ' + F.term(2 * c * a, 'x', 1) + ' y al final ' + (a * a) + '.',
          despues: ''
        }
      ],
      final: '(' + F.poli([c, a], 'x') + ')&sup2; = <b>' + P.texto(res) + '</b>',
      receta: ['Cuadrado del primero',
        'Doble producto de los dos',
        'Cuadrado del segundo',
        'Se juntan los tres']
    };
  };

  /* ================= FACTORIZAR x^2 + bx + c ================= */
  guia.trinomioSimple = function (p, q) {
    var pol = P.multiplica([1, -p], [1, -q]);
    var n1 = -p, n2 = -q;
    return {
      intro: 'Vamos a factorizar <b>' + P.texto(pol) + '</b>.<br>' +
        'Buscamos dos numeros que MULTIPLICADOS den ' + pol[2] + ' y SUMADOS den ' + pol[1] + '.',
      pasos: [
        {
          pregunta: '&iquest;Cuales son esos dos numeros?<br>(el producto debe dar ' + pol[2] + ' y la suma ' + pol[1] + ')<br>Escribelos separados por coma.',
          resp: R.lista([n1, n2], { ayuda: 'Por ejemplo: 3, -5' }),
          pista: 'Piensa en las parejas que multiplicadas dan ' + pol[2] + ' y prueba cual de esas suma ' + pol[1] + '.',
          despues: 'Comprobacion: (' + n1 + ')(' + n2 + ') = ' + (n1 * n2) + ' y ' + n1 + ' + (' + n2 + ') = ' + (n1 + n2) + '.'
        },
        {
          pregunta: 'Ahora escribe la factorizacion usando esos numeros:<br>(x + primero)(x + segundo)',
          resp: R.factorizada('(x+(' + n1 + '))*(x+(' + n2 + '))', {
            mostrar: '(' + F.poli([1, n1], 'x') + ')(' + F.poli([1, n2], 'x') + ')'
          }),
          pista: 'Cada numero va con su signo dentro de un parentesis con la x.',
          despues: ''
        }
      ],
      final: P.texto(pol) + ' = <b>(' + F.poli([1, n1], 'x') + ')(' + F.poli([1, n2], 'x') + ')</b>',
      receta: ['Buscar dos numeros: producto = termino sin x, suma = coeficiente de x',
        'Escribirlos como (x + uno)(x + otro)',
        'Se puede comprobar multiplicando de regreso']
    };
  };

  /* ================= TEOREMA DE PITAGORAS ================= */
  guia.pitagoras = function (a, b) {
    var c2 = a * a + b * b;
    var c = Math.sqrt(c2);
    return {
      intro: 'Tenemos un triangulo rectangulo con catetos <b>' + a + '</b> y <b>' + b + '</b>.<br>' +
        'La formula es c&sup2; = a&sup2; + b&sup2;, donde c es la hipotenusa (el lado largo).',
      pasos: [
        {
          pregunta: 'Eleva al cuadrado el primer cateto.<br>&iquest;Cuanto es ' + a + '&sup2;?',
          resp: R.numero(a * a, { dec: 0 }),
          pista: a + ' &middot; ' + a,
          despues: ''
        },
        {
          pregunta: 'Ahora el otro cateto.<br>&iquest;Cuanto es ' + b + '&sup2;?',
          resp: R.numero(b * b, { dec: 0 }),
          pista: b + ' &middot; ' + b,
          despues: ''
        },
        {
          pregunta: 'Sumalos: &iquest;cuanto da ' + (a * a) + ' + ' + (b * b) + '?<br>(ese es el valor de c&sup2;)',
          resp: R.numero(c2, { dec: 0 }),
          pista: 'Es una suma normal.',
          despues: 'Ya tenemos c&sup2; = ' + c2 + '. Pero nos piden c, no c&sup2;.'
        },
        {
          pregunta: 'Ultimo paso: saca la raiz cuadrada.<br>&iquest;Cuanto es &radic;<span class="rad">' + c2 + '</span>? (2 decimales)',
          resp: R.numero(c, { dec: 2, tol: 0.01 }),
          pista: 'Busca el numero que multiplicado por si mismo da ' + c2 + '.',
          despues: ''
        }
      ],
      final: 'La hipotenusa mide <b>' + F.n(c, 2) + '</b>.',
      receta: ['Elevar al cuadrado cada cateto',
        'Sumarlos (eso es c&sup2;)',
        'Sacar la raiz cuadrada para tener c']
    };
  };

  /* ================= DERIVADA DE UN POLINOMIO ================= */
  guia.derivadaPoli = function (coefs) {
    var d = P.derivada(coefs);
    var g = coefs.length - 1;
    var pasos = [];
    for (var i = 0; i < coefs.length - 1; i++) {
      (function (i) {
        var exp = g - i, coef = coefs[i];
        if (coef === 0) return;
        pasos.push({
          pregunta: 'Deriva el termino <b>' + F.term(coef, 'x', exp) + '</b>.<br>' +
            'Recuerda: baja el exponente multiplicando y al exponente le restas 1.',
          resp: R.expresion('(' + (coef * exp) + ')*x^(' + (exp - 1) + ')', { mostrar: F.term(coef * exp, 'x', exp - 1) }),
          pista: 'Multiplica ' + coef + ' &middot; ' + exp + ' = ' + (coef * exp) + ', y el exponente pasa de ' + exp + ' a ' + (exp - 1) + '.',
          despues: ''
        });
      })(i);
    }
    var indep = coefs[coefs.length - 1];
    if (indep !== 0) {
      pasos.push({
        pregunta: 'Falta el termino sin x: <b>' + indep + '</b>.<br>&iquest;Cual es su derivada?',
        resp: R.numero(0, { dec: 0 }),
        pista: 'La derivada de cualquier numero solo es siempre la misma...',
        despues: 'Exacto: las constantes desaparecen al derivar.'
      });
    }
    pasos.push({
      pregunta: 'Junta todo y escribe f&prime;(x) completa.',
      resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
      pista: 'Suma los terminos que fuiste obteniendo: ' + P.texto(d) + ' (con tus propias palabras, escribelo).',
      despues: ''
    });
    return {
      intro: 'Vamos a derivar <b>f(x) = ' + P.texto(coefs) + '</b>, termino por termino.<br>' +
        'La regla de la potencia dice: (x<sup>n</sup>)&prime; = n&middot;x<sup>n&minus;1</sup>.',
      pasos: pasos,
      final: 'f&prime;(x) = <b>' + P.texto(d) + '</b>',
      receta: ['Derivar cada termino por separado',
        'Bajar el exponente multiplicando y restarle 1',
        'Las constantes se vuelven 0',
        'Juntar todos los terminos']
    };
  };

  /* ================= LEYES DE EXPONENTES: PRODUCTO ================= */
  guia.productoPotencias = function (a, b) {
    return {
      intro: 'Vamos a simplificar <b>x' + F.sup(a) + ' &middot; x' + F.sup(b) + '</b>.',
      pasos: [
        {
          pregunta: 'Las dos potencias tienen la MISMA base (x) y se estan multiplicando.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 0),
          pista: 'x&sup3; es x&middot;x&middot;x. Si multiplicas x&sup2; &middot; x&sup3; acabas con 5 equis multiplicandose.',
          despues: 'Asi es: al multiplicar potencias de la misma base, los exponentes se SUMAN.'
        },
        {
          pregunta: '&iquest;Cuanto da ' + a + ' + ' + b + '?',
          resp: R.numero(a + b, { dec: 0 }),
          pista: 'Suma sencilla.',
          despues: ''
        },
        {
          pregunta: 'Escribe el resultado completo.',
          resp: R.expresion('x^(' + (a + b) + ')', { mostrar: 'x' + F.sup(a + b) }),
          pista: 'Es la x con el exponente que acabas de obtener: se escribe x^' + (a + b) + '.',
          despues: ''
        }
      ],
      final: 'x' + F.sup(a) + ' &middot; x' + F.sup(b) + ' = <b>x' + F.sup(a + b) + '</b>',
      receta: ['Misma base multiplicandose: exponentes se SUMAN',
        'Misma base dividiendose: exponentes se RESTAN',
        'Potencia de potencia: exponentes se MULTIPLICAN']
    };
  };

  /* ================= FACTOR COMUN ================= */
  guia.factorComun = function (k, m, dentro) {
    var expandido = P.multiplica(P.escala(dentro, k), [1].concat(new Array(m).fill(0)));
    var factorTxt = (k === 1 ? '' : k) + (m ? 'x' + (m > 1 ? F.sup(m) : '') : '');
    var coefs = expandido.filter(function (c) { return c !== 0; });
    return {
      intro: 'Vamos a factorizar <b>' + P.texto(expandido) + '</b> sacando factor comun.<br>' +
        'Hay que buscar lo que se repite en TODOS los terminos.',
      pasos: [
        {
          pregunta: 'Primero los numeros. Los coeficientes son ' + coefs.join(', ') + '.<br>' +
            '&iquest;Cual es el numero mas grande que divide a todos?',
          resp: R.numero(Math.abs(k), { dec: 0 }),
          pista: 'Es el maximo comun divisor de ' + coefs.map(Math.abs).join(', ') + '.',
          despues: 'Ese numero sale del parentesis.'
        },
        {
          pregunta: 'Ahora las letras. &iquest;Cual es la MENOR potencia de x que aparece en todos los terminos?<br>' +
            'Escribe solo el exponente (si no hay x en todos, escribe 0).',
          resp: R.numero(m, { dec: 0 }),
          pista: 'Fijate en el termino con menos equis: ese manda.',
          despues: 'Entonces el factor comun completo es ' + factorTxt + '.'
        },
        {
          pregunta: 'Divide cada termino entre ' + factorTxt + ' y escribe lo que queda DENTRO del parentesis.',
          resp: R.expresion(P.expr(dentro), { mostrar: P.texto(dentro) }),
          pista: 'Divide coeficiente entre ' + Math.abs(k) + (m ? ' y restale ' + m + ' al exponente de cada x' : '') + '.',
          despues: ''
        },
        {
          pregunta: 'Escribe la factorizacion completa: factor comun por el parentesis.',
          resp: R.factorizada('(' + k + ')*x^(' + m + ')*(' + P.expr(dentro) + ')', {
            mostrar: factorTxt + '(' + P.texto(dentro) + ')'
          }),
          pista: 'Se escribe ' + factorTxt + '(' + P.texto(dentro) + ').',
          despues: ''
        }
      ],
      final: P.texto(expandido) + ' = <b>' + factorTxt + '(' + P.texto(dentro) + ')</b>',
      receta: ['m.c.d. de los coeficientes',
        'La menor potencia de la letra',
        'Dividir cada termino entre el factor comun',
        'Escribir factor(lo que quedo)']
    };
  };

  EJ.guia = guia;
})(window);
