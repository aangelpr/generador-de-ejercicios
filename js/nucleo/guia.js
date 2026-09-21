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

  /* ================= GUIA AUTOMATICA DESDE LA SOLUCION =================
     Cada ejercicio ya trae su solucion paso a paso escrita. En vez de redactar
     otro guion aparte, se toma esa solucion, se le tapa el resultado a cada
     paso y se pregunta. Asi CUALQUIER subtema tiene entrenamiento guiado,
     resolviendo el mismo ejercicio que se genero. */

  /* Busca el numero con el que termina un paso ("... = 169" o "... <b>169</b>"). */
  function valorDelPaso(texto) {
    var t = String(texto).replace(/\s+$/, '').replace(/\.$/, '');
    var pruebas = [
      /=\s*<b>\s*(-?\d[\d.]*)\s*<\/b>\s*$/,
      /<b>\s*(-?\d[\d.]*)\s*<\/b>\s*$/,
      /=\s*(-?\d[\d.]*)\s*$/
    ];
    for (var i = 0; i < pruebas.length; i++) {
      var m = t.match(pruebas[i]);
      if (m) {
        var num = parseFloat(m[1]);
        if (isFinite(num)) return { crudo: m[0], numero: num, decimales: (m[1].split('.')[1] || '').length };
      }
    }
    return null;
  }

  /* Muchos pasos terminan en una fraccion dibujada con HTML. Tambien se puede
     preguntar: se detecta el numerador y el denominador. */
  function fraccionDelPaso(texto) {
    var t = String(texto).replace(/\s+$/, '').replace(/\.$/, '');
    var re = /(&minus;|-)?\s*<span class="frac"><span class="num">\s*(-?\d+)\s*<\/span><span class="den">\s*(\d+)\s*<\/span><\/span>\s*(<\/b>)?\s*$/;
    var m = t.match(re);
    if (!m) return null;
    var num = parseInt(m[2], 10), den = parseInt(m[3], 10);
    if (!isFinite(num) || !isFinite(den) || den === 0) return null;
    if (m[1]) num = -num;
    /* solo si el renglon trae una operacion; si no, no hay nada que calcular */
    var plano = t.replace(/<[^>]+>/g, ' ');
    if (!/[=+\u2212]|&minus;|&middot;|&divide;|\/|x|\+/.test(plano)) return null;
    return { crudo: m[0], num: num, den: den };
  }

  /* Pasa un pedazo de HTML matematico a algo que el interprete pueda leer:
     x<sup>2</sup> -> x^2, &minus; -> -, &middot; -> *, etc. */
  function aTexto(html) {
    return String(html)
      .replace(/<sup>\s*([^<]*)<\/sup>/g, '^($1)')
      .replace(/<[^>]+>/g, '')
      .replace(/&minus;/g, '-').replace(/&middot;/g, '*').replace(/&times;/g, '*')
      .replace(/&divide;/g, '/').replace(/&nbsp;/g, ' ')
      .replace(/&sup2;/g, '^2').replace(/&sup3;/g, '^3')
      .replace(/&radic;/g, 'sqrt').replace(/&pi;/g, 'pi')
      .trim();
  }

  /* Si el paso termina en una expresion algebraica ("... = 3x^2 - 2x"),
     tambien se puede preguntar. Se revisa que el interprete la entienda. */
  function expresionDelPaso(texto) {
    var t = String(texto).replace(/\s+$/, '').replace(/\.$/, '');
    var pruebas = [
      /=\s*<b>([\s\S]{1,60}?)<\/b>\s*$/,
      /<b>([\s\S]{1,60}?)<\/b>\s*$/,
      /=\s*([^=<]{1,60})$/
    ];
    for (var i = 0; i < pruebas.length; i++) {
      var m = t.match(pruebas[i]);
      if (!m) continue;
      var plano = aTexto(m[1]);
      if (!plano || plano.length > 40) continue;
      if (!/[a-z]/i.test(plano)) continue;                 // sin letras no es expresion
      if (/[,;:?]|\s(y|o|de|en|es|que)\s/i.test(plano)) continue;   // parece texto normal
      var vars = [];
      ['x', 'y', 'n', 't', 'u'].forEach(function (v) {
        if (new RegExp('(^|[^a-z])' + v + '([^a-z]|$)', 'i').test(plano)) vars.push(v);
      });
      if (!vars.length || vars.length > 2) continue;
      if (!EJ.expr.valida(plano, vars)) continue;
      return { crudo: m[0], texto: plano, vars: vars, muestra: m[1] };
    }
    return null;
  }

  /* Reemplaza ese valor final por un signo de interrogacion. */
  function tapaValor(texto, crudo) {
    var i = texto.lastIndexOf(crudo);
    if (i === -1) return texto;
    /* Ojo: se revisa si EMPIEZA con "=", no si lo contiene; el HTML trae
       atributos como class="frac" que tambien llevan un igual. */
    var reemplazo = /^\s*=/.test(crudo) ? '= <b>?</b>' : '<b>?</b>';
    return texto.slice(0, i) + reemplazo + texto.slice(i + crudo.length);
  }

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

  /* Apagado a proposito: ver el comentario en motor.js */
  guia.usarAutomaticas = false;

  /* Arma un guion escrito directamente dentro de un tema (donde ya estan los
     numeros del ejercicio). Solo revisa que venga completo. */
  guia.armar = function (g) {
    if (!g || !g.pasos || !g.pasos.length) return null;
    for (var i = 0; i < g.pasos.length; i++) {
      if (!g.pasos[i].pregunta || !g.pasos[i].resp) return null;
    }
    return {
      intro: g.intro || '',
      tablero: g.tablero || null,
      pasos: g.pasos,
      final: g.final || '',
      receta: g.receta || []
    };
  };

  guia.desdeSolucion = function (ej) {
    var sol = (ej.solucion || []).filter(function (x) { return x && String(x).trim(); });
    if (sol.length < 2) return null;

    var pasos = [];
    for (var i = 0; i < sol.length; i++) {
      var texto = sol[i];
      var ultimo = (i === sol.length - 1);
      var v = ultimo ? null : valorDelPaso(texto);   // el ultimo paso ya es la respuesta
      if (v) {
        pasos.push({
          pregunta: tapaValor(texto, v.crudo),
          resp: R.numero(v.numero, { dec: v.decimales, tol: v.decimales ? Math.pow(10, -v.decimales) * 5 : 1e-6 }),
          pista: 'Haz solo la operacion de este renglon, nada mas.',
          despues: texto
        });
        continue;
      }
      var fr = ultimo ? null : fraccionDelPaso(texto);
      if (fr) {
        pasos.push({
          pregunta: tapaValor(texto, fr.crudo),
          resp: R.fraccion(fr.num, fr.den),
          pista: 'Solo este renglon: escribe la fraccion que queda (por ejemplo 3/4).',
          despues: texto
        });
        continue;
      }
      var e = ultimo ? null : expresionDelPaso(texto);
      if (e) {
        /* Auto-prueba: la pregunta solo sirve si su propia respuesta se valida.
           Si el texto no era realmente una expresion evaluable (por ejemplo
           "4n + b", con una letra desconocida), aqui se descarta. */
        var respE = R.expresion(e.texto, { vars: e.vars, mostrar: e.muestra });
        var sirve = false;
        try { sirve = !!respE.verificar([e.texto]); } catch (err) { sirve = false; }
        if (sirve) {
          pasos.push({
            pregunta: tapaValor(texto, e.crudo),
            resp: respE,
            pista: 'Solo este renglon: escribe la expresion que queda.',
            despues: texto
          });
          continue;
        }
      }
      pasos.push({ soloTexto: true, pregunta: texto, resp: null });
    }

    pasos.push({
      pregunta: 'Con todo eso ya se puede cerrar el ejercicio.<br><b>Escribe la respuesta final.</b>',
      resp: ej.respuesta,
      pista: (ej.pistas || [])[(ej.pistas || []).length - 1] || 'Junta lo que fuiste calculando.',
      despues: ''
    });

    return {
      intro: ej.enunciado,
      tablero: null,
      pasos: pasos,
      final: 'Respuesta: <b>' + ej.respuesta.mostrar() + '</b>',
      receta: (ej.pistas || []).slice(0, 2),
      derivada: true
    };
  };


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
    var ak = Math.abs(k);

    var terminos = [];
    expandido.forEach(function (c, i) {
      var e = expandido.length - 1 - i;
      if (c !== 0) terminos.push({ c: c, e: e, txt: F.term(c, 'x', e) });
    });
    var coefs = terminos.map(function (t) { return t.c; });
    var ordinal = ['primer', 'segundo', 'tercer', 'cuarto', 'quinto'];
    /* x&sup1; no se escribe con el 1, y x&#8304; no se escribe */
    function equis(e) { return e === 0 ? '1' : (e === 1 ? 'x' : 'x' + F.sup(e)); }
    var pasos = [];

    /* ---------- PASO 1: el m.c.d. ---------- */
    var S1 = 'Paso 1: buscar el m.c.d.';
    var qh1 = 'Buscamos el numero mas grande que divide de forma exacta a ' + coefs.map(Math.abs).join(', ') + '.';
    var pq1 = 'Para sacar del parentesis el mayor numero que los ' + terminos.length + ' terminos tienen en comun. ' +
      'Si sacaras uno mas chico, la factorizacion quedaria a medias.';
    pasos.push({
      seccion: S1, rotulo: 'm.c.d.', queHacemos: qh1, paraQue: pq1,
      pregunta: 'Los coeficientes son <b>' + coefs.join(', ') + '</b>.<br>' +
        '&iquest;Cual es el numero mas grande que los divide a todos?',
      resp: R.numero(ak, { dec: 0 }),
      pista: 'Prueba a dividir todos entre 2, entre 3, entre 4... y quedate con el mayor que salga exacto en TODOS. ' +
        'Los signos no importan aqui.',
      proceso: ['m.c.d. de ' + coefs.map(Math.abs).join(', ') + ' = <b>' + ak + '</b>'],
      despues: ''
    });
    terminos.forEach(function (t, i) {
      pasos.push({
        seccion: S1, rotulo: Math.abs(t.c) + ' entre ' + ak, queHacemos: qh1, paraQue: pq1,
        pregunta: 'Compruebalo: &iquest;cuanto es <b>' + Math.abs(t.c) + ' &divide; ' + ak + '</b>?',
        resp: R.numero(Math.abs(t.c) / ak, { dec: 0 }),
        pista: 'Division exacta, sin residuo.',
        proceso: [Math.abs(t.c) + ' &divide; ' + ak + ' = ' + (Math.abs(t.c) / ak)],
        despues: i === terminos.length - 1 ? 'Los ' + terminos.length + ' dieron exacto, asi que ' + ak + ' si es divisor comun.' : ''
      });
    });

    /* ---------- PASO 2: la letra ---------- */
    var S2 = 'Paso 2: buscar la letra comun';
    var qh2 = 'Revisamos que exponente tiene la x en cada termino, y nos quedamos con el menor.';
    var pq2 = 'Para sacar la mayor cantidad de x que TODOS los terminos tienen. ' +
      'Manda el exponente mas chico, porque de ese solo hay esa cantidad.';
    terminos.forEach(function (t) {
      pasos.push({
        seccion: S2, rotulo: 'Exponente de ' + t.txt, queHacemos: qh2, paraQue: pq2,
        pregunta: 'En <b>' + t.txt + '</b>, &iquest;que exponente tiene la x?',
        resp: R.numero(t.e, { dec: 0 }),
        pista: t.e === 0 ? 'Ese termino no tiene x: su exponente es 0.'
          : t.e === 1 ? 'Cuando no se ve ningun exponente, es 1.' : 'Es el numerito de arriba.',
        proceso: [t.txt + '  &rarr;  exponente ' + t.e],
        despues: ''
      });
    });
    pasos.push({
      seccion: S2, rotulo: 'El menor exponente', queHacemos: qh2, paraQue: pq2,
      pregunta: 'Los exponentes son <b>' + terminos.map(function (t) { return t.e; }).join(', ') + '</b>.<br>' +
        '&iquest;Cual es el MENOR?',
      resp: R.numero(m, { dec: 0 }),
      pista: 'El mas chico de todos. No se puede sacar mas x de las que tiene el termino mas pobre.',
      proceso: ['El menor es <b>' + m + '</b>', '', 'Factor comun = <b>' + factorTxt + '</b>'],
      despues: 'Juntando el numero y la letra, el factor comun es ' + factorTxt + '.'
    });

    /* ---------- PASO 3: dividir cada termino ---------- */
    var S3 = 'Paso 3: dividir cada termino entre ' + factorTxt;
    var qh3 = 'Dividimos cada termino del ejercicio entre ' + factorTxt + ', por separado.';
    var pq3 = 'Para saber que queda DENTRO del parentesis. Sacar factor comun es deshacer una multiplicacion: ' +
      'si ' + factorTxt + ' multiplicaba a algo, ese algo se recupera dividiendo.';
    terminos.forEach(function (t, i) {
      var cq = t.c / k, eq = t.e - m;
      pasos.push({
        seccion: S3, rotulo: 'Coeficiente del ' + (ordinal[i] || 'siguiente'), queHacemos: qh3, paraQue: pq3,
        pregunta: 'Vamos con el <b>' + (ordinal[i] || 'siguiente') + ' termino</b>: ' + t.txt + ' &divide; ' + factorTxt + '.<br>' +
          'Primero los numeros: &iquest;cuanto es <b>' + t.c + ' &divide; ' + k + '</b>?',
        resp: R.numero(cq, { dec: 0 }),
        pista: (t.c < 0) !== (k < 0) ? 'Signos distintos: el resultado es negativo.' : 'Signos iguales: el resultado es positivo.',
        proceso: [(i === 0 ? '' : ' ') + t.txt + ' &divide; ' + factorTxt, t.c + ' &divide; ' + k + ' = ' + cq],
        despues: ''
      });
      if (m > 0) {
        pasos.push({
          seccion: S3, rotulo: 'Exponente del ' + (ordinal[i] || 'siguiente'), queHacemos: qh3, paraQue: pq3,
          pregunta: 'Ahora la letra: ' + equis(t.e) + ' &divide; ' + equis(m) + '.<br>' +
            '&iquest;Que exponente queda?',
          resp: R.numero(eq, { dec: 0 }),
          pista: 'Dividiendo se RESTAN los exponentes: ' + t.e + ' &minus; ' + m + '.',
          proceso: [equis(t.e) + ' &divide; ' + equis(m) + ' = ' + equis(eq),
            'Queda: <b>' + F.term(cq, 'x', eq) + '</b>'],
          despues: eq === 0 ? 'Exponente 0 significa que la x desaparece: queda un numero solo.' : ''
        });
      } else {
        pasos[pasos.length - 1].proceso.push('Queda: <b>' + F.term(cq, 'x', eq) + '</b>');
      }
    });

    /* ---------- PASO 4: armar ---------- */
    pasos.push({
      seccion: 'Paso 4: armar la factorizacion',
      rotulo: 'Factorizacion',
      queHacemos: 'Ponemos el factor comun afuera y los resultados de las divisiones dentro del parentesis.',
      paraQue: 'Porque esa es la forma factorizada: un producto, no una suma.',
      pregunta: 'Junta todo: el factor comun afuera y lo que quedo dentro del parentesis.',
      resp: R.factorizada('(' + k + ')*x^(' + m + ')*(' + P.expr(dentro) + ')', {
        mostrar: factorTxt + '(' + P.texto(dentro) + ')'
      }),
      pista: 'Se escribe ' + factorTxt + '(' + P.texto(dentro) + '): el factor pegado al parentesis, sin signo de por medio.',
      proceso: [factorTxt + '(' + P.texto(dentro) + ')'],
      despues: ''
    });

    /* ---------- PASO 5: comprobar ---------- */
    var S5 = 'Paso 5: comprobar';
    var qh5 = 'Multiplicamos ' + factorTxt + ' por cada termino del parentesis.';
    var pq5 = 'Para ver que regresamos al ejercicio original. Si algo no coincide, hay un error en alguna division.';
    terminos.forEach(function (t, i) {
      var dentroTxt = F.term(t.c / k, 'x', t.e - m);
      pasos.push({
        seccion: S5, rotulo: factorTxt + ' por ' + dentroTxt, queHacemos: qh5, paraQue: pq5,
        pregunta: '&iquest;Cuanto es <b>' + factorTxt + ' &middot; ' + dentroTxt + '</b>?',
        resp: R.expresion(P.expr(P.multiplica([t.c].concat(new Array(t.e).fill(0)), [1])), { mostrar: t.txt }),
        pista: 'Multiplica los numeros (' + k + ' &middot; ' + (t.c / k) + ') y suma los exponentes (' + m + ' + ' + (t.e - m) + ').',
        proceso: [factorTxt + ' &middot; ' + dentroTxt + ' = ' + t.txt],
        despues: i === terminos.length - 1
          ? 'Los ' + terminos.length + ' coinciden con el ejercicio original, asi que la factorizacion esta bien.' : ''
      });
    });

    return {
      intro: 'Vamos a factorizar <b>' + P.texto(expandido) + '</b> sacando factor comun.<br>' +
        'La idea: buscar lo que se repite en TODOS los terminos y sacarlo afuera.',
      pasos: pasos,
      final: P.texto(expandido) + ' = <b>' + factorTxt + '(' + P.texto(dentro) + ')</b>',
      receta: ['m.c.d. de los coeficientes',
        'La MENOR potencia de la letra',
        'Dividir cada termino entre el factor comun',
        'Escribir factor(lo que quedo)',
        'Comprobar multiplicando de regreso']
    };
  };

  /* ================= REGLA DE TRES ================= */
  guia.reglaDeTres = function (n1, precioU, n2, objeto) {
    var total = n1 * precioU;
    return {
      intro: 'Si <b>' + n1 + ' ' + objeto + '</b> cuestan <b>$' + total + '</b>, queremos saber cuanto cuestan <b>' + n2 + '</b>.<br>' +
        'El truco de la regla de tres: primero averigua cuanto cuesta UNO.',
      pasos: [
        {
          pregunta: '&iquest;Cuanto cuesta uno solo?<br>(divide ' + total + ' entre ' + n1 + ')',
          resp: R.numero(precioU, { dec: 4, tol: 0.01 }),
          pista: total + ' &divide; ' + n1,
          despues: 'Ese es el precio unitario. Ahora solo hay que multiplicar.'
        },
        {
          pregunta: 'Si uno cuesta ' + precioU + ', &iquest;cuanto cuestan ' + n2 + '?',
          resp: R.numero(n2 * precioU, { dec: 4, tol: 0.01 }),
          pista: n2 + ' &middot; ' + precioU,
          despues: ''
        }
      ],
      final: n2 + ' ' + objeto + ' cuestan <b>$' + F.n(n2 * precioU, 2) + '</b>',
      receta: ['Dividir para saber cuanto vale UNO',
        'Multiplicar por la cantidad que te piden']
    };
  };

  /* ================= PORCENTAJE ================= */
  guia.porcentaje = function (pct, base) {
    var res = base * pct / 100;
    return {
      intro: 'Queremos el <b>' + pct + '%</b> de <b>' + base + '</b>.<br>' +
        'Un porcentaje es una fraccion con denominador 100.',
      pasos: [
        {
          pregunta: '&iquest;Como se escribe ' + pct + '% en decimal?<br>(divide entre 100)',
          resp: R.numero(pct / 100, { dec: 4, tol: 0.0001 }),
          pista: 'Recorre el punto dos lugares a la izquierda: ' + pct + ' &divide; 100.',
          despues: 'Ya lo tenemos en decimal. "De" significa multiplicar.'
        },
        {
          pregunta: 'Ahora multiplica: ' + (pct / 100) + ' &middot; ' + base,
          resp: R.numero(res, { dec: 4, tol: 0.01 }),
          pista: 'Si se te complica, calcula ' + base + ' &divide; 100 = ' + (base / 100) + ' y multiplicalo por ' + pct + '.',
          despues: ''
        }
      ],
      final: 'El ' + pct + '% de ' + base + ' es <b>' + F.n(res, 4) + '</b>',
      receta: ['Pasar el porcentaje a decimal (entre 100)',
        'Multiplicar por la cantidad']
    };
  };

  /* ================= PRODUCTO DE MONOMIOS ================= */
  guia.productoMonomios = function (c1, a1, b1, c2, a2, b2) {
    function mono(c, ex, ey) {
      var s = (c === 1 ? '' : c === -1 ? '-' : String(c));
      if (ex) s += 'x' + (ex > 1 ? F.sup(ex) : '');
      if (ey) s += 'y' + (ey > 1 ? F.sup(ey) : '');
      return s || String(c);
    }
    var m1 = mono(c1, a1, b1), m2 = mono(c2, a2, b2);
    var res = mono(c1 * c2, a1 + a2, b1 + b2);
    return {
      intro: 'Vamos a multiplicar <b>(' + m1 + ')(' + m2 + ')</b>.<br>' +
        'En un producto de monomios se hace por partes: numeros con numeros, y cada letra por su lado.',
      pasos: [
        {
          pregunta: 'Primero los coeficientes:<br>&iquest;Cuanto es ' + c1 + ' &middot; ' + c2 + '?',
          resp: R.numero(c1 * c2, { dec: 0 }),
          pista: 'Ojo con los signos.',
          despues: 'Ese es el numero que va adelante.'
        },
        {
          pregunta: 'Ahora la x: x' + F.sup(a1) + ' &middot; x' + F.sup(a2) + '.<br>&iquest;Que exponente queda? (se SUMAN)',
          resp: R.numero(a1 + a2, { dec: 0 }),
          pista: a1 + ' + ' + a2,
          despues: ''
        },
        {
          pregunta: 'Y la y: y' + F.sup(b1) + ' &middot; y' + F.sup(b2) + '.<br>&iquest;Que exponente queda?',
          resp: R.numero(b1 + b2, { dec: 0 }),
          pista: b1 + ' + ' + b2,
          despues: 'Ya tenemos las tres piezas.'
        },
        {
          pregunta: 'Escribe el monomio completo.',
          resp: R.expresion('(' + (c1 * c2) + ')*x^(' + (a1 + a2) + ')*y^(' + (b1 + b2) + ')', {
            vars: ['x', 'y'], mostrar: res
          }),
          pista: 'Es ' + res + '.',
          despues: ''
        }
      ],
      final: '(' + m1 + ')(' + m2 + ') = <b>' + res + '</b>',
      receta: ['Multiplicar los coeficientes',
        'Sumar los exponentes de cada letra por separado',
        'Juntar todo']
    };
  };

  /* ================= COCIENTE DE POTENCIAS ================= */
  guia.cocientePotencias = function (a, b) {
    return {
      intro: 'Vamos a simplificar <b>' + F.frac('x' + F.sup(a), 'x' + F.sup(b)) + '</b>.',
      pasos: [
        {
          pregunta: 'Misma base, pero ahora se estan DIVIDIENDO.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 1),
          pista: 'Arriba hay ' + a + ' equis y abajo ' + b + '; se van cancelando de una en una.',
          despues: 'Exacto: al dividir se RESTAN (el de arriba menos el de abajo).'
        },
        {
          pregunta: '&iquest;Cuanto da ' + a + ' &minus; ' + b + '?',
          resp: R.numero(a - b, { dec: 0 }),
          pista: 'Resta sencilla.',
          despues: ''
        },
        {
          pregunta: 'Escribe el resultado.',
          resp: R.expresion('x^(' + (a - b) + ')', { mostrar: 'x' + F.sup(a - b) }),
          pista: 'Se escribe x^' + (a - b) + '.',
          despues: ''
        }
      ],
      final: F.frac('x' + F.sup(a), 'x' + F.sup(b)) + ' = <b>x' + F.sup(a - b) + '</b>',
      receta: ['Dividiendo con la misma base: exponente de arriba MENOS el de abajo']
    };
  };

  /* ================= POTENCIA DE UNA POTENCIA ================= */
  guia.potenciaDePotencia = function (a, b) {
    return {
      intro: 'Vamos a simplificar <b>(x' + F.sup(a) + ')' + F.sup(b) + '</b>.',
      pasos: [
        {
          pregunta: 'Aqui hay una potencia DENTRO de otra.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 2),
          pista: '(x' + F.sup(a) + ')' + F.sup(b) + ' significa x' + F.sup(a) + ' multiplicada por si misma ' + b + ' veces.',
          despues: 'Correcto: potencia de potencia, los exponentes se MULTIPLICAN.'
        },
        {
          pregunta: '&iquest;Cuanto da ' + a + ' &middot; ' + b + '?',
          resp: R.numero(a * b, { dec: 0 }),
          pista: 'Multiplicacion sencilla.',
          despues: ''
        },
        {
          pregunta: 'Escribe el resultado.',
          resp: R.expresion('x^(' + (a * b) + ')', { mostrar: 'x' + F.sup(a * b) }),
          pista: 'Se escribe x^' + (a * b) + '.',
          despues: ''
        }
      ],
      final: '(x' + F.sup(a) + ')' + F.sup(b) + ' = <b>x' + F.sup(a * b) + '</b>',
      receta: ['Multiplicandose: se suman', 'Dividiendose: se restan', 'Potencia de potencia: se multiplican']
    };
  };

  /* ================= TERMINO n DE UNA PROGRESION ARITMETICA ================= */
  guia.terminoAritmetico = function (a1, d, n) {
    var an = a1 + (n - 1) * d;
    return {
      intro: 'Progresion aritmetica con primer termino <b>a&#8321; = ' + a1 + '</b> y diferencia <b>d = ' + d + '</b>.<br>' +
        'Queremos el termino <b>a<sub>' + n + '</sub></b>. La formula es a<sub>n</sub> = a&#8321; + (n &minus; 1)d.',
      pasos: [
        {
          pregunta: 'Para llegar del termino 1 al termino ' + n + ', &iquest;cuantas veces hay que sumar la diferencia?',
          resp: R.numero(n - 1, { dec: 0 }),
          pista: 'Son (n &minus; 1) saltos: del 1 al 2 es uno, del 1 al 3 son dos...',
          despues: 'Por eso la formula dice (n &minus; 1) y no n.'
        },
        {
          pregunta: '&iquest;Cuanto es ' + (n - 1) + ' &middot; ' + d + '?',
          resp: R.numero((n - 1) * d, { dec: 0 }),
          pista: 'Cuidado si la diferencia es negativa.',
          despues: 'Eso es lo que avanzamos desde el primer termino.'
        },
        {
          pregunta: 'Sumaselo al primer termino: ' + a1 + ' + (' + ((n - 1) * d) + ')',
          resp: R.numero(an, { dec: 0 }),
          pista: 'Suma final.',
          despues: ''
        }
      ],
      final: 'a<sub>' + n + '</sub> = <b>' + an + '</b>',
      receta: ['Contar los saltos: n &minus; 1',
        'Multiplicarlos por la diferencia',
        'Sumar el primer termino']
    };
  };

  /* ================= SIGUIENTE TERMINO DE UNA SUCESION ================= */
  guia.siguienteTermino = function (v, d) {
    var sig = v[v.length - 1] + d;
    return {
      intro: 'Tenemos la sucesion <b>' + v.join(', ') + ', &hellip;</b><br>' +
        'Para continuarla primero hay que descubrir el patron.',
      pasos: [
        {
          pregunta: 'Resta dos terminos seguidos para ver cuanto avanza:<br>&iquest;Cuanto da ' + v[1] + ' &minus; ' + v[0] + '?',
          resp: R.numero(d, { dec: 0 }),
          pista: 'Compruebalo con otra pareja: ' + v[2] + ' &minus; ' + v[1] + ' debe dar lo mismo.',
          despues: 'Esa es la diferencia, y es la misma entre todos: por eso es aritmetica.'
        },
        {
          pregunta: 'Ahora sumale esa diferencia al ultimo termino:<br>' + v[v.length - 1] + ' + (' + d + ')',
          resp: R.numero(sig, { dec: 0 }),
          pista: 'Suma simple.',
          despues: ''
        }
      ],
      final: 'El siguiente termino es <b>' + sig + '</b>',
      receta: ['Restar terminos seguidos para hallar la diferencia',
        'Comprobar que sea la misma en todos',
        'Sumarsela al ultimo termino']
    };
  };

  /* ================= SUMA DE ANGULOS DE UN POLIGONO ================= */
  guia.angulosPoligono = function (n, nombre) {
    return {
      intro: 'Queremos cuanto suman los angulos interiores de un <b>' + nombre + '</b>.<br>' +
        'La formula es (n &minus; 2) &middot; 180&deg;, donde n es el numero de lados.',
      pasos: [
        {
          pregunta: '&iquest;Cuantos lados tiene un ' + nombre + '?',
          resp: R.numero(n, { dec: 0 }),
          pista: 'El prefijo griego lo dice: penta = 5, hexa = 6, hepta = 7, octa = 8, deca = 10.',
          despues: 'Entonces n = ' + n + '.'
        },
        {
          pregunta: '&iquest;Cuanto es n &minus; 2? (' + n + ' &minus; 2)',
          resp: R.numero(n - 2, { dec: 0 }),
          pista: 'Es el numero de triangulos en que se puede partir la figura.',
          despues: 'Se resta 2 porque el poligono se parte en ' + (n - 2) + ' triangulos, y cada uno suma 180&deg;.'
        },
        {
          pregunta: 'Multiplica por 180: ' + (n - 2) + ' &middot; 180',
          resp: R.numero((n - 2) * 180, { dec: 0 }),
          pista: 'Cada triangulo aporta 180&deg;.',
          despues: ''
        }
      ],
      final: 'Los angulos interiores de un ' + nombre + ' suman <b>' + ((n - 2) * 180) + '&deg;</b>',
      receta: ['Contar los lados (n)',
        'Restarle 2 (los triangulos en que se parte)',
        'Multiplicar por 180']
    };
  };

  /* ================= LEY DE SENOS: UN LADO ================= */
  guia.leySenosLado = function (A, B, a) {
    var rad = Math.PI / 180;
    var senA = Math.sin(A * rad), senB = Math.sin(B * rad);
    var b = a * senB / senA;
    return {
      intro: 'Triangulo con <b>A = ' + A + '&deg;</b>, <b>B = ' + B + '&deg;</b> y el lado <b>a = ' + a + '</b>.<br>' +
        'La ley de senos dice: ' + F.frac('a', 'sen A') + ' = ' + F.frac('b', 'sen B') + '. Despejando: b = a &middot; sen B &divide; sen A.',
      pasos: [
        {
          pregunta: 'Saca el seno del angulo que conoces con su lado.<br>&iquest;Cuanto vale sen ' + A + '&deg;? (4 decimales)',
          resp: R.numero(senA, { dec: 4, tol: 0.001 }),
          pista: 'Con la calculadora en grados: sen(' + A + ').',
          despues: 'Ese va abajo en la formula.'
        },
        {
          pregunta: '&iquest;Y cuanto vale sen ' + B + '&deg;? (4 decimales)',
          resp: R.numero(senB, { dec: 4, tol: 0.001 }),
          pista: 'Otra vez la calculadora, en grados.',
          despues: 'Ese va arriba, junto con el lado conocido.'
        },
        {
          pregunta: 'Ahora arma la cuenta: b = ' + a + ' &middot; ' + F.n(senB, 4) + ' &divide; ' + F.n(senA, 4) + '<br>(2 decimales)',
          resp: R.numero(b, { dec: 2, tol: 0.05 }),
          pista: 'Multiplica primero arriba y al final divide.',
          despues: ''
        }
      ],
      final: 'El lado b mide <b>' + F.n(b, 2) + '</b>',
      receta: ['Escribir la ley de senos con los datos',
        'Sacar los dos senos con la calculadora (en GRADOS)',
        'Multiplicar el lado conocido por el seno de arriba y dividir entre el de abajo']
    };
  };

  /* ================= LEY DE COSENOS: TERCER LADO ================= */
  guia.leyCosenosLado = function (a, b, C) {
    var rad = Math.PI / 180;
    var cosC = Math.cos(C * rad);
    var doble = 2 * a * b * cosC;
    var c2 = a * a + b * b - doble;
    var c = Math.sqrt(c2);
    return {
      intro: 'Tenemos dos lados, <b>a = ' + a + '</b> y <b>b = ' + b + '</b>, con el angulo <b>C = ' + C + '&deg;</b> entre ellos.<br>' +
        'La formula es c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos C.',
      pasos: [
        {
          pregunta: 'Primero la parte facil: &iquest;cuanto es ' + a + '&sup2; + ' + b + '&sup2;?',
          resp: R.numero(a * a + b * b, { dec: 0 }),
          pista: a + '&sup2; = ' + (a * a) + ' y ' + b + '&sup2; = ' + (b * b) + '.',
          despues: 'Hasta aqui es igual que Pitagoras. Lo que sigue es la correccion por el angulo.'
        },
        {
          pregunta: '&iquest;Cuanto vale cos ' + C + '&deg;? (4 decimales)',
          resp: R.numero(cosC, { dec: 4, tol: 0.001 }),
          pista: C > 90 ? 'Ojo: pasa de 90&deg;, asi que el coseno sale NEGATIVO.' : 'Con la calculadora en grados.',
          despues: ''
        },
        {
          pregunta: 'Ahora calcula 2&middot;' + a + '&middot;' + b + '&middot;cos ' + C + '&deg;<br>(4 decimales)',
          resp: R.numero(doble, { dec: 4, tol: 0.01 }),
          pista: '2 &middot; ' + a + ' &middot; ' + b + ' = ' + (2 * a * b) + ', y eso por ' + F.n(cosC, 4) + '.',
          despues: 'Este es el pedazo que se RESTA.'
        },
        {
          pregunta: 'Resta: ' + (a * a + b * b) + ' &minus; (' + F.n(doble, 4) + ')<br>Eso es c&sup2;. (4 decimales)',
          resp: R.numero(c2, { dec: 4, tol: 0.01 }),
          pista: C > 90 ? 'Como el coseno era negativo, restar un negativo SUMA.' : 'Resta normal.',
          despues: 'Ya tenemos c&sup2;, falta la raiz.'
        },
        {
          pregunta: 'Saca la raiz cuadrada de ' + F.n(c2, 4) + ' (2 decimales)',
          resp: R.numero(c, { dec: 2, tol: 0.02 }),
          pista: 'Ultimo paso.',
          despues: ''
        }
      ],
      final: 'El lado c mide <b>' + F.n(c, 2) + '</b>',
      receta: ['a&sup2; + b&sup2;',
        'Calcular 2ab&middot;cos C',
        'Restarlo (eso da c&sup2;)',
        'Sacar la raiz']
    };
  };

  /* ================= LIMITE 0/0 FACTORIZANDO ================= */
  guia.limiteFactorizar = function (a, b) {
    var pol = P.multiplica([1, -a], [1, -b]);
    var val = a - b;
    var den = 'x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a);
    return {
      intro: 'Queremos <b>lim<sub>x&rarr;' + a + '</sub> ' + F.frac(P.texto(pol), den) + '</b>.',
      pasos: [
        {
          pregunta: 'Sustituye x = ' + a + ' de una vez. &iquest;Que pasa?',
          resp: R.opcion(['Sale un numero normal', 'Sale 0/0 (indeterminado)', 'Sale un numero entre 0'], 1),
          pista: 'Checa el denominador: ' + a + ' ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ' = 0. &iquest;Y el numerador?',
          despues: '0/0 no significa que no exista: significa que hay que trabajarlo. Se factoriza.'
        },
        {
          pregunta: 'Factoriza el numerador ' + P.texto(pol) + '.<br>&iquest;Que dos numeros dan producto ' + pol[2] + ' y suma ' + pol[1] + '? (separados por coma)',
          resp: R.lista([-a, -b], { ayuda: 'Por ejemplo: 3, -5' }),
          pista: 'Uno de ellos tiene que ser ' + (-a) + ', para que aparezca el factor que se cancela.',
          despues: 'Queda (' + F.poli([1, -a], 'x') + ')(' + F.poli([1, -b], 'x') + ').'
        },
        {
          pregunta: 'Se cancela el factor (' + F.poli([1, -a], 'x') + ') con el denominador y queda solo (' + F.poli([1, -b], 'x') + ').<br>' +
            'Ahora si sustituye x = ' + a + ': &iquest;cuanto da?',
          resp: R.numero(val, { dec: 0 }),
          pista: a + ' ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b),
          despues: ''
        }
      ],
      final: 'El limite vale <b>' + val + '</b>',
      receta: ['Sustituir para ver si sale 0/0',
        'Si sale, factorizar',
        'Cancelar el factor que estorba',
        'Sustituir otra vez']
    };
  };

  /* ================= MEDIA, MEDIANA Y MODA ================= */
  guia.medidasCentrales = function (datos) {
    var n = datos.length;
    var suma = datos.reduce(function (x, y) { return x + y; }, 0);
    var orden = datos.slice().sort(function (x, y) { return x - y; });
    var mediana = n % 2 ? orden[(n - 1) / 2] : (orden[n / 2 - 1] + orden[n / 2]) / 2;
    var cuenta = {}, moda = null, max = 0;
    datos.forEach(function (x) {
      cuenta[x] = (cuenta[x] || 0) + 1;
      if (cuenta[x] > max) { max = cuenta[x]; moda = x; }
    });
    return {
      intro: 'Tenemos estos datos:<br><b>' + datos.join(', ') + '</b><br>' +
        'Vamos por las tres medidas de tendencia central, una por una.',
      pasos: [
        {
          pregunta: 'Para la media, primero sumalos todos.<br>&iquest;Cuanto da la suma?',
          resp: R.numero(suma, { dec: 0 }),
          pista: 'Sumalos de dos en dos para no perderte.',
          despues: 'Hay ' + n + ' datos, asi que ahora se divide entre ' + n + '.'
        },
        {
          pregunta: 'Divide la suma entre cuantos datos hay:<br>' + suma + ' &divide; ' + n + ' (4 decimales)',
          resp: R.numero(suma / n, { dec: 4, tol: 0.001 }),
          pista: 'Esa es la media o promedio.',
          despues: 'Lista la media. Ahora la mediana, que necesita los datos ORDENADOS.'
        },
        {
          pregunta: 'Ordenados quedan: <b>' + orden.join(', ') + '</b><br>' +
            (n % 2 ? 'Son ' + n + ' datos (impar), asi que hay uno justo en medio. &iquest;Cual es?'
              : 'Son ' + n + ' datos (par), asi que se promedian los dos de en medio. &iquest;Cuanto da?'),
          resp: R.numero(mediana, { dec: 2, tol: 0.01 }),
          pista: n % 2 ? 'Es el de la posicion ' + ((n + 1) / 2) + '.'
            : 'Son ' + orden[n / 2 - 1] + ' y ' + orden[n / 2] + ': sumalos y divide entre 2.',
          despues: 'Esa es la mediana: el valor que parte los datos a la mitad.'
        },
        {
          pregunta: 'Y la moda: &iquest;cual es el dato que MAS se repite?',
          resp: R.numero(moda, { dec: 0 }),
          pista: 'Cuenta cuantas veces aparece cada uno.',
          despues: ''
        }
      ],
      final: 'Media <b>' + F.n(suma / n, 4) + '</b>, mediana <b>' + F.n(mediana, 2) + '</b>, moda <b>' + moda + '</b>',
      receta: ['Media: sumar todo y dividir entre cuantos son',
        'Mediana: ordenar y tomar el de en medio',
        'Moda: el que mas se repite']
    };
  };

  /* ================= PROBABILIDAD SIMPLE ================= */
  guia.probabilidadSimple = function (fav, total, quePasa, dondeSale) {
    var s = F.simplifica(fav, total);
    return {
      intro: dondeSale + '<br>Queremos la probabilidad de que <b>' + quePasa + '</b>.<br>' +
        'La regla es: casos favorables entre casos totales.',
      pasos: [
        {
          pregunta: '&iquest;Cuantos resultados posibles hay en total?',
          resp: R.numero(total, { dec: 0 }),
          pista: 'Cuenta TODO lo que puede pasar, no solo lo que buscas.',
          despues: 'Ese numero va abajo en la fraccion.'
        },
        {
          pregunta: 'De esos, &iquest;cuantos cumplen que ' + quePasa + '?',
          resp: R.numero(fav, { dec: 0 }),
          pista: 'Estos son los casos favorables.',
          despues: 'Ese va arriba.'
        },
        {
          pregunta: 'Escribe la probabilidad como fraccion simplificada.',
          resp: R.fraccion(s[0], s[1]),
          pista: 'Es ' + F.frac(fav, total) + '; revisa si se puede simplificar.',
          despues: ''
        }
      ],
      final: 'P = ' + F.frac(fav, total) + ' = <b>' + F.fracSimp(fav, total) + '</b> (' + F.n(100 * fav / total, 2) + '%)',
      receta: ['Contar los casos TOTALES',
        'Contar los casos FAVORABLES',
        'Poner favorables entre totales y simplificar']
    };
  };

  /* ================= DISTRIBUCION BINOMIAL ================= */
  guia.binomialExacta = function (n, k, p) {
    function comb(n, k) {
      var res = 1;
      for (var i = 1; i <= k; i++) res = res * (n - k + i) / i;
      return Math.round(res);
    }
    var c = comb(n, k), pk = Math.pow(p, k), qn = Math.pow(1 - p, n - k);
    var val = c * pk * qn;
    var pTxt = F.n(p, 4);          // p puede ser 1/6 y se veria horrible completo
    var qTxt = F.n(1 - p, 4);
    return {
      intro: 'Tenemos <b>n = ' + n + '</b> intentos, probabilidad de exito <b>p = ' + pTxt + '</b>, y queremos exactamente <b>k = ' + k + '</b> ' + (k === 1 ? 'exito' : 'exitos') + '.<br>' +
        'La formula es P(X = k) = C(n, k) &middot; p<sup>k</sup> &middot; (1 &minus; p)<sup>n&minus;k</sup>. Son tres pedazos.',
      pasos: [
        {
          pregunta: 'Primer pedazo: &iquest;cuanto vale C(' + n + ', ' + k + ')?<br>(de cuantas formas se pueden acomodar ' + k + ' exitos entre ' + n + ' intentos)',
          resp: R.numero(c, { dec: 0 }),
          pista: 'C(n,k) = n! / (k!(n&minus;k)!) = ' + n + '! / (' + k + '!&middot;' + (n - k) + '!).',
          despues: 'Ese numero cuenta en cuantos ordenes distintos pueden salir los exitos.'
        },
        {
          pregunta: 'Segundo pedazo: ' + pTxt + '<sup>' + k + '</sup> (la probabilidad de los ' + k + ' ' + (k === 1 ? 'exito' : 'exitos') + ')<br>(6 decimales)',
          resp: R.numero(pk, { dec: 6, tol: 0.0001 }),
          pista: 'Multiplica ' + pTxt + ' por si mismo ' + k + ' veces.',
          despues: ''
        },
        {
          pregunta: 'Tercer pedazo: (1 &minus; ' + pTxt + ')<sup>' + (n - k) + '</sup> = ' + qTxt + '<sup>' + (n - k) + '</sup><br>(la de los fracasos, 6 decimales)',
          resp: R.numero(qn, { dec: 6, tol: 0.0001 }),
          pista: 'Los otros ' + (n - k) + ' intentos tienen que fallar.',
          despues: 'Ya tenemos los tres. Solo falta multiplicarlos.'
        },
        {
          pregunta: 'Multiplica los tres: ' + c + ' &middot; ' + F.n(pk, 6) + ' &middot; ' + F.n(qn, 6) + '<br>(4 decimales)',
          resp: R.numero(val, { dec: 4, tol: 0.002 }),
          pista: 'Multiplica de izquierda a derecha.',
          despues: ''
        }
      ],
      final: 'P(X = ' + k + ') = <b>' + F.n(val, 4) + '</b> (o sea ' + F.n(val * 100, 2) + '%)',
      receta: ['C(n, k): en cuantos ordenes pueden salir',
        'p elevado a los exitos',
        '(1&minus;p) elevado a los fracasos',
        'Multiplicar los tres']
    };
  };

  /* ================= INTEGRAL POR SUSTITUCION ================= */
  guia.sustitucionBinomio = function (a, b, n) {
    var dentro = F.poli([a, b], 'x');
    return {
      intro: 'Queremos <b>&int; (' + dentro + ')' + F.sup(n) + ' dx</b>.<br>' +
        'La idea de la sustitucion es renombrar la parte fea como u.',
      pasos: [
        {
          pregunta: '&iquest;Que conviene tomar como u?',
          resp: R.opcion(['u = ' + dentro, 'u = x', 'u = ' + n], 0),
          pista: 'Se toma lo que esta "adentro", lo que estorba.',
          despues: 'Bien. Ahora hay que ver cuanto vale du.'
        },
        {
          pregunta: 'Si u = ' + dentro + ', deriva: du = ? dx<br>&iquest;Que numero acompana al dx?',
          resp: R.numero(a, { dec: 0 }),
          pista: 'La derivada de ' + dentro + ' respecto de x.',
          despues: 'Entonces dx = du/' + a + ', y ese ' + a + ' sale dividiendo.'
        },
        {
          pregunta: 'La integral queda (1/' + a + ')&int;u' + F.sup(n) + 'du.<br>&iquest;Cuanto vale &int;u' + F.sup(n) + 'du?',
          resp: R.expresion('u^(' + (n + 1) + ')/' + (n + 1), { vars: ['u'], mostrar: F.frac('u' + F.sup(n + 1), n + 1), masConstante: true }),
          pista: 'Regla de la potencia al reves: se sube el exponente en 1 y se divide entre el nuevo exponente.',
          despues: 'Solo falta regresar el cambio: u vuelve a ser ' + dentro + '.'
        },
        {
          pregunta: 'Escribe el resultado final en terminos de x.',
          resp: R.expresion('((' + a + '*x+(' + b + '))^(' + (n + 1) + '))/(' + (a * (n + 1)) + ')', {
            masConstante: true, mostrar: F.frac('(' + dentro + ')' + F.sup(n + 1), a * (n + 1)) + ' + C'
          }),
          pista: 'Junta el 1/' + a + ' con el 1/' + (n + 1) + ': queda dividido entre ' + (a * (n + 1)) + '.',
          despues: ''
        }
      ],
      final: '&int;(' + dentro + ')' + F.sup(n) + 'dx = <b>' + F.frac('(' + dentro + ')' + F.sup(n + 1), a * (n + 1)) + ' + C</b>',
      receta: ['Elegir u (lo de adentro)',
        'Derivar para obtener du y despejar dx',
        'Integrar en u con la regla de la potencia',
        'Regresar el cambio a x']
    };
  };

  /* ================= INTEGRACION POR PARTES ================= */
  guia.partesXExp = function (k) {
    var e = 'e' + (k === 1 ? '<sup>x</sup>' : F.sup(k + 'x'));
    function q(num, den) { return den === 1 ? String(num) : F.frac(num, den); }
    return {
      intro: 'Queremos <b>&int; x ' + e + ' dx</b>.<br>' +
        'Es un producto de dos cosas distintas: toca integracion por partes, &int;u dv = uv &minus; &int;v du.',
      pasos: [
        {
          pregunta: 'Hay que repartir: una parte es u y la otra dv.<br>&iquest;Que conviene tomar como u?',
          resp: R.opcion(['u = x', 'u = ' + e], 0),
          pista: 'Se elige como u lo que se SIMPLIFICA al derivar. La x se vuelve 1; la exponencial nunca cambia.',
          despues: 'Entonces u = x (y du = dx), y dv = ' + e + 'dx.'
        },
        {
          pregunta: 'Integra dv para obtener v:<br>&iquest;Cuanto es &int;' + e + 'dx?',
          resp: R.expresion('exp(' + k + '*x)/' + k, { masConstante: true, mostrar: q(e, k) }),
          pista: k === 1 ? 'La exponencial se integra en si misma.' : 'Se divide entre el ' + k + ' del exponente.',
          despues: 'Ya tenemos u = x, du = dx, v = ' + q(e, k) + '.'
        },
        {
          pregunta: 'Aplica la formula: uv &minus; &int;v du = ' + q('x' + e, k) + ' &minus; ' + q(1, k) + '&int;' + e + 'dx<br>' +
            '&iquest;Cuanto vale esa ultima integral, ' + q(1, k) + '&int;' + e + 'dx?',
          resp: R.expresion('exp(' + k + '*x)/' + (k * k), { masConstante: true, mostrar: q(e, k * k) }),
          pista: 'Otra vez la misma integral de antes, dividida entre ' + k + ' de nuevo.',
          despues: 'Ahora solo hay que restarla.'
        },
        {
          pregunta: 'Escribe el resultado completo.',
          resp: R.expresion('exp(' + k + '*x)*(x/' + k + '-1/' + (k * k) + ')', {
            masConstante: true,
            mostrar: e + '(' + q('x', k) + ' &minus; ' + q(1, k * k) + ') + C'
          }),
          pista: 'Es ' + q('x' + e, k) + ' &minus; ' + q(e, k * k) + ', que factorizando queda ' + e + '(' + q('x', k) + ' &minus; ' + q(1, k * k) + ').',
          despues: ''
        }
      ],
      final: '&int;x' + e + 'dx = <b>' + e + '(' + q('x', k) + ' &minus; ' + q(1, k * k) + ') + C</b>',
      receta: ['Elegir u (lo que se simplifica al derivar) y dv',
        'Derivar u para tener du, integrar dv para tener v',
        'Aplicar uv &minus; &int;v du',
        'Resolver la integral que queda']
    };
  };

  /* ================= LOGARITMO: EVALUAR ================= */
  guia.logaritmoEvaluar = function (b, n) {
    var x = Math.pow(b, n);
    return {
      intro: 'Queremos <b>log<sub>' + b + '</sub>(' + x + ')</b>.<br>' +
        'Un logaritmo es una pregunta: &iquest;a que exponente hay que elevar la base para llegar a ese numero?',
      pasos: [
        {
          pregunta: 'Escribe la pregunta al reves: ' + b + ' elevado a QUE da ' + x + '?<br>Empieza probando: &iquest;cuanto es ' + b + '&sup2;?',
          resp: R.numero(b * b, { dec: 0 }),
          pista: b + ' &middot; ' + b,
          despues: (b * b === x ? 'Justo ese era.' : 'Todavia no llegamos a ' + x + ', hay que seguir subiendo.')
        },
        {
          pregunta: 'Sigue hasta llegar a ' + x + '.<br>&iquest;Cual es el exponente que buscamos?',
          resp: R.numero(n, { dec: 0 }),
          pista: b + '<sup>' + n + '</sup> = ' + x + '.',
          despues: 'Ese exponente ES el logaritmo.'
        }
      ],
      final: 'log<sub>' + b + '</sub>(' + x + ') = <b>' + n + '</b>, porque ' + b + '<sup>' + n + '</sup> = ' + x,
      receta: ['Preguntarse: la base elevada a que da ese numero',
        'El exponente que responde es el logaritmo']
    };
  };

  /* ================= CIRCUNFERENCIA: CENTRO Y RADIO ================= */
  guia.circunferencia = function (h, k, r) {
    function cuad(v, c) {
      if (c === 0) return v + '&sup2;';
      return '(' + v + (c > 0 ? ' &minus; ' + c : ' + ' + (-c)) + ')&sup2;';
    }
    var ec = cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (r * r);
    return {
      intro: 'Tenemos la circunferencia <b>' + ec + '</b>.<br>' +
        'La forma general es (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2;, donde (h, k) es el centro.',
      pasos: [
        {
          pregunta: 'Compara con la formula. &iquest;Cual es la <b>h</b> (la x del centro)?<br>Cuidado: el signo se invierte.',
          resp: R.numero(h, { dec: 0 }),
          pista: h === 0 ? 'No hay nada sumando a la x, asi que h = 0.'
            : 'Dice ' + cuad('x', h) + '; como la formula lleva un menos, h = ' + h + '.',
          despues: 'Por eso hay que fijarse: lo que se ve restando es lo que vale h.'
        },
        {
          pregunta: '&iquest;Y la <b>k</b> (la y del centro)?',
          resp: R.numero(k, { dec: 0 }),
          pista: k === 0 ? 'No hay nada sumando a la y, asi que k = 0.' : 'Mismo razonamiento con ' + cuad('y', k) + '.',
          despues: 'Centro listo: (' + h + ', ' + k + ').'
        },
        {
          pregunta: 'El lado derecho es r&sup2; = ' + (r * r) + '.<br>&iquest;Cuanto vale el radio r?',
          resp: R.numero(r, { dec: 2, tol: 0.01 }),
          pista: 'Saca la raiz cuadrada de ' + (r * r) + '.',
          despues: ''
        }
      ],
      final: 'Centro <b>(' + h + ', ' + k + ')</b> y radio <b>' + r + '</b>',
      receta: ['Comparar con (x&minus;h)&sup2; + (y&minus;k)&sup2; = r&sup2;',
        'El centro sale con el signo CAMBIADO',
        'El radio es la raiz del lado derecho']
    };
  };

  /* ================= VERTICE DE UNA PARABOLA ================= */
  guia.verticeParabola = function (a, b, c) {
    var h = -b / (2 * a);
    var kk = a * h * h + b * h + c;
    return {
      intro: 'Tenemos <b>f(x) = ' + P.texto([a, b, c]) + '</b>.<br>' +
        'El vertice es el punto mas alto o mas bajo. Su x se calcula con <b>x = &minus;b/2a</b>.',
      pasos: [
        {
          pregunta: 'Identifica los coeficientes: a = ' + a + ' y b = ' + b + '.<br>&iquest;Cuanto vale 2a?',
          resp: R.numero(2 * a, { dec: 0 }),
          pista: '2 &middot; ' + a,
          despues: 'Ese va abajo en la formula.'
        },
        {
          pregunta: 'Ahora calcula &minus;b/2a = &minus;(' + b + ') / ' + (2 * a) + '<br>(4 decimales)',
          resp: R.numero(h, { dec: 4, tol: 0.01 }),
          pista: 'Ojo con el doble signo si b ya es negativo.',
          despues: 'Esa es la x del vertice. Falta la y.'
        },
        {
          pregunta: 'Sustituye esa x en la funcion para obtener la y del vertice.<br>f(' + F.n(h, 4) + ') = ? (4 decimales)',
          resp: R.numero(kk, { dec: 4, tol: 0.01 }),
          pista: 'Eleva al cuadrado, multiplica por ' + a + ', suma ' + b + ' por la x, y suma ' + c + '.',
          despues: ''
        },
        {
          pregunta: 'Como a = ' + a + ', &iquest;ese vertice es un maximo o un minimo?',
          resp: R.opcion(['Minimo (la parabola abre hacia arriba)', 'Maximo (la parabola abre hacia abajo)'], a > 0 ? 0 : 1),
          pista: 'Si a es positiva la parabola abre hacia arriba, como una U.',
          despues: ''
        }
      ],
      final: 'Vertice en <b>(' + F.n(h, 4) + ', ' + F.n(kk, 4) + ')</b>, y es un <b>' + (a > 0 ? 'minimo' : 'maximo') + '</b>',
      receta: ['x del vertice = &minus;b/2a',
        'Sustituir esa x para tener la y',
        'El signo de a dice si es minimo o maximo']
    };
  };

  /* ================= INTEGRAL DEFINIDA ================= */
  guia.integralDefinida = function (coefs, a, b) {
    var I = P.integral(coefs);
    var Fb = P.evalua(I, b), Fa = P.evalua(I, a);
    return {
      intro: 'Queremos <b>&int;<sub>' + a + '</sub><sup>' + b + '</sup> (' + P.texto(coefs) + ') dx</b>.<br>' +
        'El segundo teorema fundamental dice: se busca una antiderivada F y se calcula F(b) &minus; F(a).',
      pasos: [
        {
          pregunta: 'Primero la antiderivada. Integra ' + P.texto(coefs) + ' (sin la constante).<br>Escribe F(x).',
          resp: R.expresion(P.expr(I), { mostrar: P.texto(I), masConstante: true }),
          pista: 'Al reves de derivar: sube el exponente en 1 y divide entre el nuevo exponente.',
          despues: 'Esa es F(x). Ahora se evalua en los dos limites.'
        },
        {
          pregunta: 'Evalua en el limite de ARRIBA:<br>F(' + b + ') = ? (4 decimales)',
          resp: R.numero(Fb, { dec: 4, tol: 0.01 }),
          pista: 'Sustituye x = ' + b + ' en ' + P.texto(I) + '.',
          despues: ''
        },
        {
          pregunta: 'Ahora en el de ABAJO:<br>F(' + a + ') = ? (4 decimales)',
          resp: R.numero(Fa, { dec: 4, tol: 0.01 }),
          pista: 'Sustituye x = ' + a + '.',
          despues: 'Ya solo falta restar.'
        },
        {
          pregunta: 'Resta: F(' + b + ') &minus; F(' + a + ') = ' + F.n(Fb, 4) + ' &minus; (' + F.n(Fa, 4) + ')<br>(4 decimales)',
          resp: R.numero(Fb - Fa, { dec: 4, tol: 0.01 }),
          pista: 'Siempre es el de arriba menos el de abajo.',
          despues: ''
        }
      ],
      final: 'La integral vale <b>' + F.n(Fb - Fa, 4) + '</b>',
      receta: ['Encontrar la antiderivada F(x)',
        'Evaluar en el limite de arriba',
        'Evaluar en el de abajo',
        'Restar: F(b) &minus; F(a)']
    };
  };

  /* ================= PUNTO CRITICO DE UNA CUADRATICA ================= */
  guia.puntoCriticoCuadratica = function (a, b, c) {
    var d = P.derivada([a, b, c]);
    var x0 = -b / (2 * a);
    return {
      intro: 'Buscamos el punto critico de <b>f(x) = ' + P.texto([a, b, c]) + '</b>.<br>' +
        'Un punto critico es donde la derivada vale cero (donde la curva se "aplana").',
      pasos: [
        {
          pregunta: 'Primero deriva la funcion. &iquest;Cuanto vale f&prime;(x)?',
          resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
          pista: 'Baja cada exponente multiplicando; la constante ' + c + ' se vuelve 0.',
          despues: 'Ahora hay que ver donde esa derivada vale cero.'
        },
        {
          pregunta: 'Iguala a cero y despeja:<br>' + P.texto(d) + ' = 0. &iquest;Cuanto vale x? (4 decimales)',
          resp: R.numero(x0, { dec: 4, tol: 0.01 }),
          pista: 'Pasa el ' + b + ' del otro lado y divide entre ' + (2 * a) + '.',
          despues: 'Ese es el punto critico.'
        },
        {
          pregunta: 'La segunda derivada es f&Prime;(x) = ' + (2 * a) + '.<br>Como es ' + (a > 0 ? 'positiva' : 'negativa') + ', &iquest;que tipo de punto es?',
          resp: R.opcion(['Minimo', 'Maximo'], a > 0 ? 0 : 1),
          pista: 'Segunda derivada positiva = la curva abre hacia arriba = minimo.',
          despues: ''
        }
      ],
      final: 'Punto critico en <b>x = ' + F.n(x0, 4) + '</b>, y es un <b>' + (a > 0 ? 'minimo' : 'maximo') + '</b>',
      receta: ['Derivar la funcion',
        'Igualar la derivada a cero y despejar',
        'La segunda derivada dice si es maximo o minimo']
    };
  };

  /* ================= TEOREMA DE TALES ================= */
  guia.tales = function (a, b, c) {
    var x = b * c / a;
    return {
      intro: 'Dos rectas cortadas por paralelas. Los segmentos correspondientes son <b>proporcionales</b>:<br>' +
        '<b>' + F.frac(a, b) + ' = ' + F.frac(F.n(c), 'x') + '</b><br>Hay que despejar la x.',
      pasos: [
        {
          pregunta: 'En una proporcion se multiplica en cruz.<br>&iquest;Cuanto da ' + b + ' &middot; ' + F.n(c) + '? (lo de la diagonal que NO tiene x)',
          resp: R.numero(b * c, { dec: 4, tol: 0.01 }),
          pista: 'Multiplica el de abajo-izquierda por el de arriba-derecha.',
          despues: 'Ese producto queda igualado a ' + a + '&middot;x.'
        },
        {
          pregunta: 'Entonces ' + a + 'x = ' + F.n(b * c) + '.<br>Despeja x dividiendo entre ' + a + '. (2 decimales)',
          resp: R.numero(x, { dec: 2, tol: 0.01 }),
          pista: F.n(b * c) + ' &divide; ' + a,
          despues: ''
        }
      ],
      final: 'x = <b>' + F.n(x, 2) + '</b>',
      receta: ['Escribir la proporcion con los segmentos que se corresponden',
        'Multiplicar en cruz',
        'Despejar la incognita dividiendo']
    };
  };

  /* ================= POLARES A RECTANGULARES ================= */
  guia.polarARectangular = function (r_, th) {
    var rad = Math.PI / 180;
    var cs = Math.cos(th * rad), sn = Math.sin(th * rad);
    var x = r_ * cs, y = r_ * sn;
    return {
      intro: 'Tenemos el punto polar <b>(r, &theta;) = (' + r_ + ', ' + th + '&deg;)</b> y lo queremos en rectangulares (x, y).<br>' +
        'Las formulas son <b>x = r&middot;cos&theta;</b> y <b>y = r&middot;sen&theta;</b>.',
      pasos: [
        {
          pregunta: '&iquest;Cuanto vale cos ' + th + '&deg;? (4 decimales)',
          resp: R.numero(cs, { dec: 4, tol: 0.001 }),
          pista: (th > 90 && th < 270) ? 'Ojo: en ese cuadrante el coseno es negativo.' : 'Calculadora en GRADOS.',
          despues: ''
        },
        {
          pregunta: 'Multiplica por r para tener la x:<br>' + r_ + ' &middot; ' + F.n(cs, 4) + ' (2 decimales)',
          resp: R.numero(x, { dec: 2, tol: 0.02 }),
          pista: 'Esa es la coordenada x.',
          despues: 'Ya tenemos la x. Ahora la y con el seno.'
        },
        {
          pregunta: '&iquest;Cuanto vale sen ' + th + '&deg;? (4 decimales)',
          resp: R.numero(sn, { dec: 4, tol: 0.001 }),
          pista: th > 180 ? 'Ojo: abajo del eje x el seno es negativo.' : 'Calculadora en GRADOS.',
          despues: ''
        },
        {
          pregunta: 'Multiplica por r para tener la y:<br>' + r_ + ' &middot; ' + F.n(sn, 4) + ' (2 decimales)',
          resp: R.numero(y, { dec: 2, tol: 0.02 }),
          pista: 'Esa es la coordenada y.',
          despues: ''
        }
      ],
      final: 'El punto es <b>(' + F.n(x, 2) + ', ' + F.n(y, 2) + ')</b>',
      receta: ['x = r&middot;cos&theta;',
        'y = r&middot;sen&theta;',
        'La calculadora SIEMPRE en grados si el angulo viene en grados']
    };
  };

  /* ================= EXCENTRICIDAD DE UNA ELIPSE ================= */
  guia.excentricidadElipse = function (a, b) {
    var c2 = a * a - b * b, c = Math.sqrt(c2), e = c / a;
    return {
      intro: 'Elipse <b>' + F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</b>.<br>' +
        'La excentricidad mide que tan "estirada" esta: <b>e = c/a</b>. Primero hay que encontrar a, b y c.',
      pasos: [
        {
          pregunta: 'Debajo de x&sup2; esta a&sup2; = ' + (a * a) + '.<br>&iquest;Cuanto vale <b>a</b>?',
          resp: R.numero(a, { dec: 2, tol: 0.01 }),
          pista: 'Saca la raiz de ' + (a * a) + '.',
          despues: 'a es el semieje mayor.'
        },
        {
          pregunta: 'Debajo de y&sup2; esta b&sup2; = ' + (b * b) + '.<br>&iquest;Cuanto vale <b>b</b>?',
          resp: R.numero(b, { dec: 2, tol: 0.01 }),
          pista: 'Raiz de ' + (b * b) + '.',
          despues: 'Ahora la c, que es la distancia del centro a cada foco.'
        },
        {
          pregunta: 'En la elipse se RESTA: c&sup2; = a&sup2; &minus; b&sup2;.<br>&iquest;Cuanto es ' + (a * a) + ' &minus; ' + (b * b) + '?',
          resp: R.numero(c2, { dec: 0 }),
          pista: 'Resta simple. (En la hiperbola seria suma, ojo con no confundirlas.)',
          despues: ''
        },
        {
          pregunta: 'Saca la raiz para tener c: &radic;<span class="rad">' + c2 + '</span> (4 decimales)',
          resp: R.numero(c, { dec: 4, tol: 0.005 }),
          pista: 'Raiz cuadrada de ' + c2 + '.',
          despues: 'Ya tenemos c y a. Solo falta dividir.'
        },
        {
          pregunta: 'Por ultimo: e = c/a = ' + F.n(c, 4) + ' &divide; ' + a + ' (4 decimales)',
          resp: R.numero(e, { dec: 4, tol: 0.005 }),
          pista: 'Debe salir entre 0 y 1, porque es una elipse.',
          despues: ''
        }
      ],
      final: 'e = <b>' + F.n(e, 4) + '</b> (entre 0 y 1, como toda elipse)',
      receta: ['Sacar a y b de los denominadores',
        'Elipse: c&sup2; = a&sup2; &minus; b&sup2;',
        'e = c/a',
        'Cerca de 0 es casi un circulo; cerca de 1 es muy alargada']
    };
  };

  /* ================= FUNCION PAR O IMPAR ================= */
  guia.paridad = function (coefs, TIPOS) {
    var exps = [];
    var g = coefs.length - 1;
    for (var i = 0; i < coefs.length; i++) if (coefs[i] !== 0) exps.push(g - i);
    var pares = exps.every(function (e) { return e % 2 === 0; });
    var impares = exps.every(function (e) { return e % 2 !== 0; });
    var tipo = pares ? 0 : (impares ? 1 : 2);
    return {
      intro: 'Queremos clasificar <b>f(x) = ' + P.texto(coefs) + '</b>.<br>' +
        'Par significa f(&minus;x) = f(x); impar significa f(&minus;x) = &minus;f(x).<br>' +
        'Hay un atajo: basta mirar los EXPONENTES.',
      pasos: [
        {
          pregunta: '&iquest;Que exponentes aparecen en la funcion?<br>Escribelos separados por coma (el termino sin x cuenta como exponente 0).',
          resp: R.lista(exps, { ayuda: 'Por ejemplo: 4, 2, 0' }),
          pista: 'Fijate en cada termino: ' + P.texto(coefs) + '.',
          despues: 'Ahora hay que ver si son todos del mismo tipo.'
        },
        {
          pregunta: 'Los exponentes son ' + exps.join(', ') + '.<br>&iquest;Como son?',
          resp: R.opcion(['Todos pares', 'Todos impares', 'Mezclados'], tipo),
          pista: 'Recuerda que el 0 cuenta como par.',
          despues: pares ? 'Cuando todos son pares, al cambiar x por &minus;x nada cambia de signo.'
            : impares ? 'Cuando todos son impares, TODOS los terminos cambian de signo a la vez.'
              : 'Al estar mezclados, unos cambian de signo y otros no, asi que no se cumple ninguna de las dos condiciones.'
        },
        {
          pregunta: 'Entonces, &iquest;que es la funcion?',
          resp: R.opcion(TIPOS, tipo),
          pista: 'Todos pares &rarr; par. Todos impares &rarr; impar. Mezclados &rarr; ninguna.',
          despues: ''
        }
      ],
      final: 'f(x) = ' + P.texto(coefs) + ' es <b>' + ['par', 'impar', 'ni par ni impar'][tipo] + '</b>',
      receta: ['Listar los exponentes que aparecen',
        'Todos pares = funcion par (simetrica al eje y)',
        'Todos impares = funcion impar (simetrica al origen)',
        'Mezclados = ninguna de las dos']
    };
  };

  /* ================= IDENTIFICAR EL TIPO DE FUNCION ================= */
  guia.tipoFuncion = function (texto, opcionesDesc, correctaDesc, TIPOS, idxTipo) {
    return {
      intro: 'Tenemos <b>f(x) = ' + texto + '</b> y hay que decir que tipo de funcion es.<br>' +
        'El truco es siempre el mismo: <b>fijarse donde esta la variable</b>.',
      pasos: [
        {
          pregunta: 'Observa la expresion. &iquest;Cual de estas descripciones le queda?',
          resp: R.opcion(opcionesDesc, correctaDesc),
          pista: 'Pregunta clave: &iquest;la x esta en la base, en el exponente, dentro de una raiz, en un denominador, o dentro de otra funcion?',
          despues: 'Eso es lo que decide el tipo.'
        },
        {
          pregunta: 'Entonces, &iquest;que tipo de funcion es?',
          resp: R.opcion(TIPOS, idxTipo),
          pista: 'Cada una de esas descripciones corresponde a un tipo con nombre propio.',
          despues: ''
        }
      ],
      final: 'f(x) = ' + texto + ' es una funcion <b>' + TIPOS[idxTipo].toLowerCase() + '</b>',
      receta: ['Ver DONDE aparece la variable',
        'En la base con exponente: polinomica (lineal, cuadratica, cubica...)',
        'En el exponente: exponencial',
        'Dentro de log: logaritmica; dentro de raiz: radical; en el denominador: racional']
    };
  };

  EJ.guia = guia;
})(window);
