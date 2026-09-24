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
      seccion: 'Paso 1: bajar el primero',
      queHacemos: 'Bajamos el primer coeficiente tal cual, sin tocarlo.',
      paraQue: 'Es el unico que se baja sin operar. De ahi en adelante todo es multiplicar y sumar.',
      queda: 'abajo: ' + coefs[0],
      pregunta: 'Se baja el primer coeficiente tal cual. &iquest;Que numero bajamos?',
      resp: R.numero(coefs[0], { dec: 0 }),
      pista: 'Es el primer numero de la lista: ' + coefs.join(', ') + '.',
      despues: 'Ese numero ya quedo abajo. De aqui en adelante siempre es: multiplicar y sumar.'
    }];

    for (var k = 0; k < n - 1; k++) {
      (function (k) {
        pasos.push({
          seccion: 'Ciclo ' + (k + 1) + ': multiplicar',
          queHacemos: 'Multiplicamos el ultimo numero de abajo por el de afuera.',
          paraQue: 'Ese producto se escribe debajo del siguiente coeficiente, listo para sumarlo.',
          queda: 'abajo: ' + abajo.slice(0, k + 1).join(' | ') + '   (sube ' + mult[k] + ')',
          pregunta: 'Multiplica el numero que acabas de obtener abajo (<b>' + abajo[k] + '</b>) por el de afuera (<b>' + a + '</b>).<br>&iquest;Cuanto da ' + abajo[k] + ' &middot; ' + a + '?',
          resp: R.numero(mult[k], { dec: 0 }),
          pista: 'Cuidado con los signos: ' + (abajo[k] < 0 ? 'negativo' : 'positivo') + ' por ' + (a < 0 ? 'negativo' : 'positivo') + ' da ' + (mult[k] < 0 ? 'negativo' : 'positivo') + '.',
          despues: 'Ese ' + mult[k] + ' se escribe debajo del siguiente coeficiente (' + coefs[k + 1] + ').'
        });
        pasos.push({
          seccion: 'Ciclo ' + (k + 1) + ': sumar la columna',
          queHacemos: 'Sumamos el coeficiente de arriba con el numero que acabamos de poner debajo.',
          paraQue: k + 1 < n - 1
            ? 'Ese resultado es el siguiente numero de abajo, y con el se vuelve a multiplicar.'
            : 'Este ultimo numero de abajo ya no es parte del cociente: es el RESIDUO.',
          queda: 'abajo: ' + abajo.slice(0, k + 2).join(' | '),
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
          seccion: 'Paso 1: el signo',
          queHacemos: 'Miramos los dos signos y decidimos el del resultado, sin multiplicar nada todavia.',
          paraQue: 'Para resolver el signo de una vez y despues olvidarnos de el. Si lo dejas para el final, se te pierde.',
          queda: (val > 0 ? '+' : '&minus;') + ' (falta el numero)',
          pregunta: 'Los signos son ' + (a < 0 ? 'negativo' : 'positivo') + ' y ' + (b < 0 ? 'negativo' : 'positivo') + '.<br>&iquest;De que signo va a salir el resultado?',
          resp: R.opcion(['Positivo', 'Negativo'], val > 0 ? 0 : 1),
          pista: 'Signos iguales dan positivo; signos distintos dan negativo.',
          despues: 'Ya sabemos el signo. Ahora solo faltan los numeros.'
        },
        {
          seccion: 'Paso 2: el numero',
          queHacemos: 'Multiplicamos los valores absolutos, como si fueran numeros normales.',
          paraQue: 'Porque el signo ya esta decidido: aqui solo falta la cuenta.',
          queda: (val > 0 ? '' : '&minus;') + Math.abs(val),
          pregunta: 'Multiplica los numeros sin signo:<br>&iquest;Cuanto da ' + Math.abs(a) + ' &middot; ' + Math.abs(b) + '?',
          resp: R.numero(Math.abs(val), { dec: 0 }),
          pista: 'Es una multiplicacion normal, ignorando los signos por un momento.',
          despues: 'Perfecto. Ya tenemos el numero y el signo.'
        },
        {
          seccion: 'Paso 3: juntar',
          queHacemos: 'Pegamos el signo al numero.',
          paraQue: 'Para dar la respuesta completa.',
          queda: String(val),
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
          seccion: 'Paso 1: denominador comun',
          queHacemos: 'Buscamos un denominador que les sirva a las dos fracciones.',
          paraQue: 'Porque sumar cuartos con sextos no se puede: hay que cortar los dos pasteles en trozos del mismo tamano antes de juntarlos.',
          queda: F.frac('?', m) + ' ' + signo + ' ' + F.frac('?', m),
          pregunta: '&iquest;Cual es el minimo comun multiplo de <b>' + b + '</b> y <b>' + d + '</b>?',
          resp: R.numero(m, { dec: 0 }),
          pista: 'Es el numero mas chico al que le caben exactos tanto el ' + b + ' como el ' + d + '.',
          despues: 'Ese ' + m + ' va a ser el denominador de las dos fracciones.'
        },
        {
          seccion: 'Paso 2: convertir la primera',
          queHacemos: 'Averiguamos por cuanto hay que multiplicar la primera fraccion.',
          paraQue: 'Multiplicar arriba y abajo por lo mismo no cambia el valor: es multiplicar por 1 disfrazado.',
          queda: '&times; ' + fa,
          pregunta: 'Para que ' + F.frac(a, b) + ' tenga denominador ' + m + ', hay que multiplicar arriba y abajo por el mismo numero.<br>&iquest;Por cual? (' + m + ' &divide; ' + b + ')',
          resp: R.numero(fa, { dec: 0 }),
          pista: 'Divide el nuevo denominador entre el que ya tenias: ' + m + ' &divide; ' + b + '.',
          despues: 'Entonces el numerador ' + a + ' se multiplica por ' + fa + '.'
        },
        {
          seccion: 'Paso 2: convertir la primera',
          queHacemos: 'Multiplicamos el numerador por ese mismo numero.',
          paraQue: 'Para que la fraccion siga valiendo lo mismo con el denominador nuevo.',
          queda: F.frac(na, m) + ' ' + signo + ' ' + F.frac('?', m),
          pregunta: '&iquest;Cuanto queda ese numerador? (' + a + ' &middot; ' + fa + ')',
          resp: R.numero(na, { dec: 0 }),
          pista: 'Multiplica ' + a + ' por ' + fa + '.',
          despues: 'La primera fraccion quedo ' + F.frac(na, m) + '.'
        },
        {
          seccion: 'Paso 3: convertir la segunda',
          queHacemos: 'Lo mismo con la segunda fraccion.',
          paraQue: 'Para que las dos queden con el denominador ' + m + ' y ya se puedan operar.',
          queda: F.frac(na, m) + ' ' + signo + ' ' + F.frac(nc, m),
          pregunta: 'Ahora la otra: ' + F.frac(c, d) + ' se multiplica por ' + fc + '.<br>&iquest;Cuanto queda su numerador? (' + c + ' &middot; ' + fc + ')',
          resp: R.numero(nc, { dec: 0 }),
          pista: m + ' &divide; ' + d + ' = ' + fc + ', asi que el numerador se multiplica por ' + fc + '.',
          despues: 'La segunda quedo ' + F.frac(nc, m) + '.'
        },
        {
          seccion: 'Paso 4: operar',
          queHacemos: 'Sumamos o restamos SOLO los numeradores.',
          paraQue: 'El denominador ya es el mismo para las dos, asi que se queda igual. Sumarlo tambien es el error clasico.',
          queda: F.frac(num, m),
          pregunta: 'Ya tienen el mismo denominador: ' + F.frac(na, m) + ' ' + signo + ' ' + F.frac(nc, m) + '<br>' +
            '&iquest;Cuanto da ' + na + ' ' + signo + ' ' + nc + '? (solo los numeradores)',
          resp: R.numero(num, { dec: 0 }),
          pista: 'El denominador NO se toca, solo se operan los de arriba.',
          despues: 'Vamos en ' + F.frac(num, m) + '.'
        },
        {
          seccion: 'Paso 5: simplificar',
          queHacemos: 'Buscamos si arriba y abajo se pueden dividir entre lo mismo.',
          paraQue: 'Una fraccion sin simplificar no esta mal, pero no esta terminada.',
          queda: F.fracSimp(num, m),
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
          seccion: 'Paso 1: cuadrado del primero',
          queHacemos: 'Aplicamos la formula (a + b)&sup2; = a&sup2; + 2ab + b&sup2;, una pieza a la vez.',
          paraQue: 'Porque (a + b)&sup2; NO es a&sup2; + b&sup2;: al multiplicar el binomio por si mismo aparece un termino de en medio que hay que contar dos veces.',
          queda: F.term(c * c, 'x', 2),
          pregunta: 'Primer termino: eleva al cuadrado el primero.<br>&iquest;Cuanto es (' + primero + ')&sup2;?',
          resp: R.expresion('(' + (c * c) + ')*x^2', { mostrar: F.term(c * c, 'x', 2) }),
          pista: 'Se eleva el coeficiente y tambien la x: (' + c + ')&sup2; = ' + (c * c) + ' y x&sup2;.',
          despues: 'Ese es el primer termino del resultado.'
        },
        {
          seccion: 'Paso 2: doble producto',
          queHacemos: 'Multiplicamos los dos terminos entre si y el resultado por 2.',
          paraQue: 'Este es el termino que aparece dos veces al desarrollar, y el que todo el mundo olvida.',
          queda: F.une([F.term(c * c, 'x', 2), F.term(2 * c * a, 'x', 1)]),
          pregunta: 'Segundo termino: el DOBLE producto.<br>&iquest;Cuanto es 2 &middot; (' + primero + ') &middot; (' + a + ')?',
          resp: R.expresion('(' + (2 * c * a) + ')*x', { mostrar: F.term(2 * c * a, 'x', 1) }),
          pista: 'Multiplica 2 &middot; ' + c + ' &middot; (' + a + ') = ' + (2 * c * a) + ', y le queda la x.',
          despues: 'Este es el que mas se olvida. Ya lo tienes.'
        },
        {
          seccion: 'Paso 3: cuadrado del segundo',
          queHacemos: 'Elevamos al cuadrado el segundo termino.',
          paraQue: 'Para completar las tres piezas de la formula.',
          queda: P.texto(res),
          pregunta: 'Tercer termino: el cuadrado del segundo.<br>&iquest;Cuanto es (' + a + ')&sup2;?',
          resp: R.numero(a * a, { dec: 0 }),
          pista: a < 0 ? 'Ojo: un negativo al cuadrado sale positivo.' : 'Multiplica ' + a + ' por si mismo.',
          despues: 'Ya tenemos los tres pedazos.'
        },
        {
          seccion: 'Paso 4: juntar',
          queHacemos: 'Escribimos los tres terminos en orden, de mayor a menor grado.',
          paraQue: 'Para dar la respuesta ordenada.',
          queda: P.texto(res),
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
          seccion: 'Paso 1: buscar los dos numeros',
          queHacemos: 'Buscamos dos numeros que multiplicados den ' + pol[2] + ' y sumados den ' + pol[1] + '.',
          paraQue: 'Al multiplicar (x + a)(x + b) sale x&sup2; + (a+b)x + ab. Vamos al reves: el numero solo es el PRODUCTO y el de la x es la SUMA.',
          queda: n1 + ' y ' + n2,
          pregunta: '&iquest;Cuales son esos dos numeros?<br>(el producto debe dar ' + pol[2] + ' y la suma ' + pol[1] + ')<br>Escribelos separados por coma.',
          resp: R.lista([n1, n2], { ayuda: 'Por ejemplo: 3, -5' }),
          pista: 'Piensa en las parejas que multiplicadas dan ' + pol[2] + ' y prueba cual de esas suma ' + pol[1] + '.',
          despues: 'Comprobacion: (' + n1 + ')(' + n2 + ') = ' + (n1 * n2) + ' y ' + n1 + ' + (' + n2 + ') = ' + (n1 + n2) + '.'
        },
        {
          seccion: 'Paso 2: escribir los parentesis',
          queHacemos: 'Metemos cada numero en su parentesis junto a la x.',
          paraQue: 'Cada numero va con su signo. Se comprueba multiplicando de regreso.',
          queda: '(' + F.poli([1, n1], 'x') + ')(' + F.poli([1, n2], 'x') + ')',
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
          seccion: 'Paso 1: los dos cuadrados',
          queHacemos: 'Elevamos al cuadrado el primer cateto.',
          paraQue: 'La formula trabaja con los CUADRADOS de los lados, no con los lados. Se calculan uno por uno.',
          queda: 'c&sup2; = ' + (a * a) + ' + ?',
          pregunta: 'Eleva al cuadrado el primer cateto.<br>&iquest;Cuanto es ' + a + '&sup2;?',
          resp: R.numero(a * a, { dec: 0 }),
          pista: a + ' &middot; ' + a,
          despues: ''
        },
        {
          seccion: 'Paso 1: los dos cuadrados',
          queHacemos: 'Ahora el segundo cateto.',
          paraQue: 'Para tener las dos piezas de a&sup2; + b&sup2;.',
          queda: 'c&sup2; = ' + (a * a) + ' + ' + (b * b),
          pregunta: 'Ahora el otro cateto.<br>&iquest;Cuanto es ' + b + '&sup2;?',
          resp: R.numero(b * b, { dec: 0 }),
          pista: b + ' &middot; ' + b,
          despues: ''
        },
        {
          seccion: 'Paso 2: sumar',
          queHacemos: 'Sumamos los dos cuadrados.',
          paraQue: 'Eso da c&sup2;, que NO es la respuesta todavia: nos piden c.',
          queda: 'c&sup2; = ' + c2,
          pregunta: 'Sumalos: &iquest;cuanto da ' + (a * a) + ' + ' + (b * b) + '?<br>(ese es el valor de c&sup2;)',
          resp: R.numero(c2, { dec: 0 }),
          pista: 'Es una suma normal.',
          despues: 'Ya tenemos c&sup2; = ' + c2 + '. Pero nos piden c, no c&sup2;.'
        },
        {
          seccion: 'Paso 3: la raiz',
          queHacemos: 'Sacamos la raiz cuadrada.',
          paraQue: 'Es el paso que mas se olvida: quedarse en c&sup2; y dar ese numero como respuesta.',
          queda: 'c = ' + F.n(c, 2),
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
        var hechosD = [], iD;
        for (iD = 0; iD <= i; iD++) {
          if (coefs[iD] !== 0) hechosD.push(F.term(coefs[iD] * (g - iD), 'x', g - iD - 1));
        }
        pasos.push({
          seccion: 'Termino de grado ' + exp,
          queHacemos: 'Bajamos el exponente multiplicando y despues le restamos 1.',
          paraQue: 'Cada termino se deriva por su cuenta: la derivada de una suma es la suma de las derivadas.',
          queda: (hechosD.length ? F.une(hechosD) : '0') + (i < coefs.length - 2 ? ' + ?' : ''),
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
        seccion: 'El termino sin x',
        queHacemos: 'Derivamos la constante.',
        paraQue: 'Una constante es una recta horizontal: su pendiente es 0. Por eso desaparece.',
        queda: P.texto(d),
        pregunta: 'Falta el termino sin x: <b>' + indep + '</b>.<br>&iquest;Cual es su derivada?',
        resp: R.numero(0, { dec: 0 }),
        pista: 'La derivada de cualquier numero solo es siempre la misma...',
        despues: 'Exacto: las constantes desaparecen al derivar.'
      });
    }
    pasos.push({
      seccion: 'Paso final: juntar',
      queHacemos: 'Sumamos todos los terminos derivados.',
      paraQue: 'Comprobacion: el grado de f&prime; siempre baja uno respecto al de f.',
      queda: P.texto(d),
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
          seccion: 'Paso 1: que regla toca',
          queHacemos: 'Miramos la operacion entre las dos potencias y recordamos que le toca a los exponentes.',
          paraQue: 'Porque la regla depende de la operacion: multiplicando se suman, dividiendo se restan, y una potencia de otra se multiplican.',
          queda: 'x' + F.sup(a + ' + ' + b),
          pregunta: 'Las dos potencias tienen la MISMA base (x) y se estan multiplicando.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 0),
          pista: 'x&sup3; es x&middot;x&middot;x. Si multiplicas x&sup2; &middot; x&sup3; acabas con 5 equis multiplicandose.',
          despues: 'Asi es: al multiplicar potencias de la misma base, los exponentes se SUMAN.'
        },
        {
          seccion: 'Paso 2: la cuenta',
          queHacemos: 'Sumamos los dos exponentes.',
          paraQue: 'Porque x' + F.sup(a) + ' son ' + a + ' equis multiplicandose y x' + F.sup(b) + ' otras ' + b + ': en total ' + (a + b) + '.',
          queda: 'x' + F.sup(a + b),
          pregunta: '&iquest;Cuanto da ' + a + ' + ' + b + '?',
          resp: R.numero(a + b, { dec: 0 }),
          pista: 'Suma sencilla.',
          despues: ''
        },
        {
          seccion: 'Paso 3: escribir',
          queHacemos: 'Escribimos la potencia con el exponente nuevo.',
          paraQue: 'La base NO cambia: solo cambia el exponente.',
          queda: 'x' + F.sup(a + b),
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
    function equis(e) { return e === 0 ? '1' : (e === 1 ? 'x' : 'x' + F.sup(e)); }

    var terminos = [];
    expandido.forEach(function (c, i) {
      var e = expandido.length - 1 - i;
      if (c !== 0) terminos.push({ c: c, e: e, txt: F.term(c, 'x', e) });
    });
    var coefs = terminos.map(function (t) { return t.c; });
    var gradoDentro = dentro.length - 1;

    /* lo que va quedando dentro del parentesis, termino a termino */
    function dentroHasta(i) {
      var trozos = [];
      for (var j = 0; j <= i; j++) {
        if (dentro[j] !== 0) trozos.push(F.term(dentro[j], 'x', gradoDentro - j));
      }
      return F.une(trozos);
    }

    var pasos = [];

    /* ---------- PASO 1: el factor comun ---------- */
    var S1 = 'Paso 1: encontrar el factor comun';
    pasos.push({
      seccion: S1, rotulo: 'm.c.d.',
      queHacemos: 'Buscamos el numero mas grande que divide de forma exacta a ' + coefs.map(Math.abs).join(', ') + '.',
      paraQue: 'Para sacar del parentesis el mayor numero que los ' + terminos.length + ' terminos tienen en comun. ' +
        'Si sacaras uno mas chico, la factorizacion quedaria a medias.',
      pregunta: '&iquest;Cual es el m.c.d. de <b>' + coefs.map(Math.abs).join(', ') + '</b>?',
      resp: R.numero(ak, { dec: 0 }),
      pista: 'Prueba a dividir todos entre 2, entre 3, entre 4... y quedate con el mayor que salga exacto en TODOS.',
      queda: String(ak),
      despues: ''
    });
    if (k < 0) {
      pasos.push({
        seccion: S1, rotulo: 'El signo',
        queHacemos: 'Decidimos si el factor comun se saca en positivo o en negativo.',
        paraQue: 'Cuando el polinomio empieza con un termino negativo, se acostumbra sacar tambien el menos, ' +
          'para que lo de adentro del parentesis empiece en positivo y se lea mejor.',
        pregunta: 'El primer termino es <b>' + terminos[0].txt + '</b>, que es negativo.<br>' +
          '&iquest;Conviene sacar tambien el signo menos?',
        resp: R.opcion(['Si, para que lo de adentro empiece en positivo', 'No, el factor se deja positivo'], 0),
        pista: 'No es obligatorio, pero es lo normal: asi el parentesis queda mas limpio.',
        queda: String(k),
        despues: 'Ojo: al sacar el menos, TODOS los signos de adentro se voltean.'
      });
    }
    pasos.push({
      seccion: S1, rotulo: 'Exponente menor',
      queHacemos: 'De las x que hay en cada termino, nos quedamos con la menor cantidad.',
      paraQue: 'Porque solo se puede sacar lo que TODOS tienen. El termino con menos x manda.',
      pregunta: 'Ahora tenemos <b>' + terminos.map(function (t) { return equis(t.e); }).join(', ') + '</b>.<br>' +
        '&iquest;Cual es el exponente mas pequeno?',
      resp: R.numero(m, { dec: 0 }),
      pista: m === 0 ? 'Cuidado: hay un termino sin x, asi que no se puede sacar ninguna.'
        : 'El mas chico de ' + terminos.map(function (t) { return t.e; }).join(', ') + '.',
      queda: factorTxt,
      despues: 'Ese es el factor comun completo.'
    });

    /* ---------- PASO 2: dividir cada termino ---------- */
    var S2 = 'Paso 2: dividir cada termino entre ' + factorTxt;
    terminos.forEach(function (t, i) {
      var cq = t.c / k, eq = t.e - m;
      var j = gradoDentro - eq;   /* posicion de este termino dentro de `dentro` */
      pasos.push({
        seccion: S2, rotulo: t.txt + ' entre ' + factorTxt,
        queHacemos: 'Dividimos ' + t.txt + ' entre ' + factorTxt + ': los numeros por un lado y las x por otro.',
        paraQue: 'Para saber que queda dentro del parentesis. Sacar factor comun es deshacer una multiplicacion, ' +
          'asi que lo de adentro se recupera dividiendo.',
        pregunta: (i === 0 ? 'Vamos a dividir cada termino entre ' + factorTxt + '.<br>&iquest;Cuanto es?<br>' : 'Ahora:<br>') +
          '<b>' + t.txt + ' &divide; ' + factorTxt + ' = ?</b>',
        resp: R.expresion(F.term(cq, 'x', eq).replace(/&minus;/g, '-').replace(/<sup>/g, '^').replace(/<\/sup>/g, ''), {
          mostrar: F.term(cq, 'x', eq)
        }),
        pista: 'Los numeros: ' + t.c + ' &divide; ' + k + ' = ' + cq + '. ' +
          (m > 0 ? 'Las x: ' + equis(t.e) + ' &divide; ' + equis(m) + ' = ' + equis(eq) +
            (eq === 0 ? ' (la x desaparece)' : '') + '.' : 'No hay x que dividir.'),
        queda: factorTxt + '(' + dentroHasta(j) + ')',
        despues: ''
      });
    });

    /* ---------- la comprobacion, al final ---------- */
    var comprobacion = terminos.map(function (t) {
      return factorTxt + ' &middot; ' + F.term(t.c / k, 'x', t.e - m) + ' = ' + t.txt;
    }).join('<br>');

    return {
      intro: 'Vamos a factorizar <b>' + P.texto(expandido) + '</b> sacando factor comun.<br>' +
        'La idea: buscar lo que se repite en TODOS los terminos y sacarlo afuera.',
      pasos: pasos,
      final: '<b>Comprobamos:</b><br>' + comprobacion + '<br><br>' +
        'Sale el ejercicio original, asi que esta bien.<br><br>' +
        '<b>Resultado: ' + factorTxt + '(' + P.texto(dentro) + ')</b>',
      receta: ['m.c.d. de los coeficientes',
        'La MENOR potencia de la letra',
        'Dividir cada termino entre el factor comun',
        'Ir armando el parentesis termino a termino',
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
          seccion: 'Paso 1: el valor de uno',
          queHacemos: 'Averiguamos cuanto vale una sola unidad.',
          paraQue: 'Ese es el truco de la regla de tres: bajar a uno y desde ahi subir a lo que sea. Se llama reduccion a la unidad.',
          queda: 'uno cuesta ' + precioU,
          pregunta: '&iquest;Cuanto cuesta uno solo?<br>(divide ' + total + ' entre ' + n1 + ')',
          resp: R.numero(precioU, { dec: 4, tol: 0.01 }),
          pista: total + ' &divide; ' + n1,
          despues: 'Ese es el precio unitario. Ahora solo hay que multiplicar.'
        },
        {
          seccion: 'Paso 2: subir a lo pedido',
          queHacemos: 'Multiplicamos el valor de uno por la cantidad que piden.',
          paraQue: 'Si uno cuesta eso, ' + n2 + ' cuestan ' + n2 + ' veces mas.',
          queda: String(n2 * precioU),
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
          seccion: 'Paso 1: los coeficientes',
          queHacemos: 'Multiplicamos solo los numeros.',
          paraQue: 'Numeros con numeros y letras con letras: nunca se mezclan. Cada parte lleva su propia regla.',
          queda: (c1 * c2) + 'x' + F.sup('?') + 'y' + F.sup('?'),
          pregunta: 'Primero los coeficientes:<br>&iquest;Cuanto es ' + c1 + ' &middot; ' + c2 + '?',
          resp: R.numero(c1 * c2, { dec: 0 }),
          pista: 'Ojo con los signos.',
          despues: 'Ese es el numero que va adelante.'
        },
        {
          seccion: 'Paso 2: la x',
          queHacemos: 'Sumamos los exponentes de la x.',
          paraQue: 'Multiplicandose, las potencias de la misma base SUMAN sus exponentes.',
          queda: (c1 * c2) + 'x' + F.sup(a1 + a2) + 'y' + F.sup('?'),
          pregunta: 'Ahora la x: x' + F.sup(a1) + ' &middot; x' + F.sup(a2) + '.<br>&iquest;Que exponente queda? (se SUMAN)',
          resp: R.numero(a1 + a2, { dec: 0 }),
          pista: a1 + ' + ' + a2,
          despues: ''
        },
        {
          seccion: 'Paso 3: la y',
          queHacemos: 'Lo mismo con la y.',
          paraQue: 'Cada letra por separado: la x nunca se junta con la y.',
          queda: res,
          pregunta: 'Y la y: y' + F.sup(b1) + ' &middot; y' + F.sup(b2) + '.<br>&iquest;Que exponente queda?',
          resp: R.numero(b1 + b2, { dec: 0 }),
          pista: b1 + ' + ' + b2,
          despues: 'Ya tenemos las tres piezas.'
        },
        {
          seccion: 'Paso 4: juntar',
          queHacemos: 'Escribimos las tres partes juntas.',
          paraQue: 'Para dar la respuesta completa.',
          queda: res,
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
          seccion: 'Paso 1: que regla toca',
          queHacemos: 'Miramos la operacion entre las dos potencias y recordamos que le toca a los exponentes.',
          paraQue: 'Dividiendo, las equis de arriba se van cancelando con las de abajo, asi que los exponentes se restan.',
          queda: 'x' + F.sup(a + ' &minus; ' + b),
          pregunta: 'Misma base, pero ahora se estan DIVIDIENDO.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 1),
          pista: 'Arriba hay ' + a + ' equis y abajo ' + b + '; se van cancelando de una en una.',
          despues: 'Exacto: al dividir se RESTAN (el de arriba menos el de abajo).'
        },
        {
          seccion: 'Paso 2: la cuenta',
          queHacemos: 'Restamos: el de arriba menos el de abajo.',
          paraQue: 'El orden importa. Al reves saldria el exponente con el signo cambiado.',
          queda: 'x' + F.sup(a - b),
          pregunta: '&iquest;Cuanto da ' + a + ' &minus; ' + b + '?',
          resp: R.numero(a - b, { dec: 0 }),
          pista: 'Resta sencilla.',
          despues: ''
        },
        {
          seccion: 'Paso 3: escribir',
          queHacemos: 'Escribimos la potencia con el exponente nuevo.',
          paraQue: 'Para dar la respuesta.',
          queda: 'x' + F.sup(a - b),
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
          seccion: 'Paso 1: que regla toca',
          queHacemos: 'Miramos la operacion entre las dos potencias y recordamos que le toca a los exponentes.',
          paraQue: 'Aqui NO se suman: (x' + F.sup(a) + ')' + F.sup(b) + ' significa repetir x' + F.sup(a) + ' un total de ' + b + ' veces, y eso multiplica los exponentes.',
          queda: 'x' + F.sup(a + ' &middot; ' + b),
          pregunta: 'Aqui hay una potencia DENTRO de otra.<br>&iquest;Que se hace con los exponentes?',
          resp: R.opcion(['Se suman', 'Se restan', 'Se multiplican'], 2),
          pista: '(x' + F.sup(a) + ')' + F.sup(b) + ' significa x' + F.sup(a) + ' multiplicada por si misma ' + b + ' veces.',
          despues: 'Correcto: potencia de potencia, los exponentes se MULTIPLICAN.'
        },
        {
          seccion: 'Paso 2: la cuenta',
          queHacemos: 'Multiplicamos los dos exponentes.',
          paraQue: 'Para obtener el exponente final.',
          queda: 'x' + F.sup(a * b),
          pregunta: '&iquest;Cuanto da ' + a + ' &middot; ' + b + '?',
          resp: R.numero(a * b, { dec: 0 }),
          pista: 'Multiplicacion sencilla.',
          despues: ''
        },
        {
          seccion: 'Paso 3: escribir',
          queHacemos: 'Escribimos la potencia resultante.',
          paraQue: 'Para dar la respuesta.',
          queda: 'x' + F.sup(a * b),
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
          seccion: 'Paso 1: contar los saltos',
          queHacemos: 'Contamos cuantas veces hay que sumar la diferencia para llegar a ese lugar.',
          paraQue: 'Del termino 1 al 2 hay UN salto, no dos. Por eso la formula lleva (n &minus; 1) y no n: es el error mas comun del tema.',
          queda: a1 + ' + ' + (n - 1) + ' &middot; ' + d,
          pregunta: 'Para llegar del termino 1 al termino ' + n + ', &iquest;cuantas veces hay que sumar la diferencia?',
          resp: R.numero(n - 1, { dec: 0 }),
          pista: 'Son (n &minus; 1) saltos: del 1 al 2 es uno, del 1 al 3 son dos...',
          despues: 'Por eso la formula dice (n &minus; 1) y no n.'
        },
        {
          seccion: 'Paso 2: lo que se acumula',
          queHacemos: 'Multiplicamos los saltos por la diferencia.',
          paraQue: 'Para saber cuanto se avanzo en total desde el primer termino.',
          queda: a1 + ' + ' + ((n - 1) * d),
          pregunta: '&iquest;Cuanto es ' + (n - 1) + ' &middot; ' + d + '?',
          resp: R.numero((n - 1) * d, { dec: 0 }),
          pista: 'Cuidado si la diferencia es negativa.',
          despues: 'Eso es lo que avanzamos desde el primer termino.'
        },
        {
          seccion: 'Paso 3: sumar el inicio',
          queHacemos: 'Le sumamos el primer termino.',
          paraQue: 'El punto de partida nunca se pierde.',
          queda: String(a1 + (n - 1) * d),
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
          seccion: 'Paso 1: la diferencia',
          queHacemos: 'Restamos dos terminos seguidos para ver cuanto avanza cada vez.',
          paraQue: 'Si siempre avanza lo mismo, la sucesion es aritmetica y con eso ya se puede predecir el siguiente.',
          queda: v[v.length - 1] + ' + (' + d + ')',
          pregunta: 'Resta dos terminos seguidos para ver cuanto avanza:<br>&iquest;Cuanto da ' + v[1] + ' &minus; ' + v[0] + '?',
          resp: R.numero(d, { dec: 0 }),
          pista: 'Compruebalo con otra pareja: ' + v[2] + ' &minus; ' + v[1] + ' debe dar lo mismo.',
          despues: 'Esa es la diferencia, y es la misma entre todos: por eso es aritmetica.'
        },
        {
          seccion: 'Paso 2: avanzar',
          queHacemos: 'Le sumamos la diferencia al ultimo termino.',
          paraQue: 'Para dar un salto mas y llegar al siguiente.',
          queda: String(v[v.length - 1] + d),
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
          seccion: 'Paso 1: contar los lados',
          queHacemos: 'Sacamos el numero de lados del nombre.',
          paraQue: 'El prefijo griego dice el numero. Ese es el n de la formula.',
          queda: 'n = ' + n,
          pregunta: '&iquest;Cuantos lados tiene un ' + nombre + '?',
          resp: R.numero(n, { dec: 0 }),
          pista: 'El prefijo griego lo dice: penta = 5, hexa = 6, hepta = 7, octa = 8, deca = 10.',
          despues: 'Entonces n = ' + n + '.'
        },
        {
          seccion: 'Paso 2: cuantos triangulos salen',
          queHacemos: 'Le restamos 2 al numero de lados.',
          paraQue: 'No es un 2 magico: es en cuantos triangulos se parte la figura trazando diagonales desde un vertice.',
          queda: (n - 2) + ' triangulos',
          pregunta: '&iquest;Cuanto es n &minus; 2? (' + n + ' &minus; 2)',
          resp: R.numero(n - 2, { dec: 0 }),
          pista: 'Es el numero de triangulos en que se puede partir la figura.',
          despues: 'Se resta 2 porque el poligono se parte en ' + (n - 2) + ' triangulos, y cada uno suma 180&deg;.'
        },
        {
          seccion: 'Paso 3: sumar los triangulos',
          queHacemos: 'Multiplicamos los triangulos por 180&deg;.',
          paraQue: 'Cada triangulo aporta 180&deg;, y juntos cubren todos los angulos del poligono.',
          queda: ((n - 2) * 180) + '&deg;',
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
          seccion: 'Paso 1: los dos senos',
          queHacemos: 'Sacamos el seno del angulo que va con el lado conocido.',
          paraQue: 'Ese es el que va ABAJO en la formula, porque acompana al lado que ya tenemos.',
          queda: 'b = ' + a + ' &middot; ? &divide; ' + F.n(senA, 4),
          pregunta: 'Saca el seno del angulo que conoces con su lado.<br>&iquest;Cuanto vale sen ' + A + '&deg;? (4 decimales)',
          resp: R.numero(senA, { dec: 4, tol: 0.001 }),
          pista: 'Con la calculadora en grados: sen(' + A + ').',
          despues: 'Ese va abajo en la formula.'
        },
        {
          seccion: 'Paso 1: los dos senos',
          queHacemos: 'Ahora el seno del angulo del lado que buscamos.',
          paraQue: 'Ese va ARRIBA. La calculadora tiene que estar en GRADOS: es el error numero uno del tema.',
          queda: 'b = ' + a + ' &middot; ' + F.n(senB, 4) + ' &divide; ' + F.n(senA, 4),
          pregunta: '&iquest;Y cuanto vale sen ' + B + '&deg;? (4 decimales)',
          resp: R.numero(senB, { dec: 4, tol: 0.001 }),
          pista: 'Otra vez la calculadora, en grados.',
          despues: 'Ese va arriba, junto con el lado conocido.'
        },
        {
          seccion: 'Paso 2: hacer la cuenta',
          queHacemos: 'Multiplicamos arriba y dividimos al final.',
          paraQue: 'Comprobacion: al angulo mayor le toca el lado mayor.',
          queda: 'b = ' + F.n(b, 2),
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
          seccion: 'Paso 1: la parte de Pitagoras',
          queHacemos: 'Sumamos los cuadrados de los dos lados.',
          paraQue: 'Hasta aqui es identico a Pitagoras. Lo que sigue es la correccion por el angulo.',
          queda: 'c&sup2; = ' + (a * a + b * b) + ' &minus; ?',
          pregunta: 'Primero la parte facil: &iquest;cuanto es ' + a + '&sup2; + ' + b + '&sup2;?',
          resp: R.numero(a * a + b * b, { dec: 0 }),
          pista: a + '&sup2; = ' + (a * a) + ' y ' + b + '&sup2; = ' + (b * b) + '.',
          despues: 'Hasta aqui es igual que Pitagoras. Lo que sigue es la correccion por el angulo.'
        },
        {
          seccion: 'Paso 2: el coseno',
          queHacemos: 'Sacamos el coseno del angulo.',
          paraQue: 'Si el angulo pasa de 90&deg; el coseno sale NEGATIVO, y entonces la resta acaba sumando.',
          queda: 'cos ' + C + '&deg; = ' + F.n(cosC, 4),
          pregunta: '&iquest;Cuanto vale cos ' + C + '&deg;? (4 decimales)',
          resp: R.numero(cosC, { dec: 4, tol: 0.001 }),
          pista: C > 90 ? 'Ojo: pasa de 90&deg;, asi que el coseno sale NEGATIVO.' : 'Con la calculadora en grados.',
          despues: ''
        },
        {
          seccion: 'Paso 3: el termino que se resta',
          queHacemos: 'Multiplicamos 2 por los dos lados y por el coseno.',
          paraQue: 'Este es el pedazo que corrige a Pitagoras: mide cuanto se abre o se cierra el triangulo.',
          queda: 'c&sup2; = ' + (a * a + b * b) + ' &minus; (' + F.n(doble, 4) + ')',
          pregunta: 'Ahora calcula 2&middot;' + a + '&middot;' + b + '&middot;cos ' + C + '&deg;<br>(4 decimales)',
          resp: R.numero(doble, { dec: 4, tol: 0.01 }),
          pista: '2 &middot; ' + a + ' &middot; ' + b + ' = ' + (2 * a * b) + ', y eso por ' + F.n(cosC, 4) + '.',
          despues: 'Este es el pedazo que se RESTA.'
        },
        {
          seccion: 'Paso 4: restar',
          queHacemos: 'Hacemos la resta.',
          paraQue: 'Ojo: si el coseno era negativo, restar un negativo SUMA.',
          queda: 'c&sup2; = ' + F.n(c2, 4),
          pregunta: 'Resta: ' + (a * a + b * b) + ' &minus; (' + F.n(doble, 4) + ')<br>Eso es c&sup2;. (4 decimales)',
          resp: R.numero(c2, { dec: 4, tol: 0.01 }),
          pista: C > 90 ? 'Como el coseno era negativo, restar un negativo SUMA.' : 'Resta normal.',
          despues: 'Ya tenemos c&sup2;, falta la raiz.'
        },
        {
          seccion: 'Paso 5: la raiz',
          queHacemos: 'Sacamos la raiz cuadrada.',
          paraQue: 'El paso que mas se olvida: quedarse en c&sup2; y darlo como respuesta.',
          queda: 'c = ' + F.n(c, 2),
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
          seccion: 'Paso 1: probar sustituyendo',
          queHacemos: 'Metemos el valor directamente y vemos que sale.',
          paraQue: 'Siempre se prueba primero. 0/0 no significa que no exista: significa que hay trabajo por hacer.',
          queda: '0/0:  hay que factorizar',
          pregunta: 'Sustituye x = ' + a + ' de una vez. &iquest;Que pasa?',
          resp: R.opcion(['Sale un numero normal', 'Sale 0/0 (indeterminado)', 'Sale un numero entre 0'], 1),
          pista: 'Checa el denominador: ' + a + ' ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ' = 0. &iquest;Y el numerador?',
          despues: '0/0 no significa que no exista: significa que hay que trabajarlo. Se factoriza.'
        },
        {
          seccion: 'Paso 2: factorizar',
          queHacemos: 'Buscamos los dos numeros que factorizan el de arriba.',
          paraQue: 'Uno de ellos tiene que dar el factor que se anula, para poder cancelarlo con el de abajo.',
          queda: '(' + F.poli([1, -a], 'x') + ')(' + F.poli([1, -b], 'x') + ') &divide; (' + F.poli([1, -a], 'x') + ')',
          pregunta: 'Factoriza el numerador ' + P.texto(pol) + '.<br>&iquest;Que dos numeros dan producto ' + pol[2] + ' y suma ' + pol[1] + '? (separados por coma)',
          resp: R.lista([-a, -b], { ayuda: 'Por ejemplo: 3, -5' }),
          pista: 'Uno de ellos tiene que ser ' + (-a) + ', para que aparezca el factor que se cancela.',
          despues: 'Queda (' + F.poli([1, -a], 'x') + ')(' + F.poli([1, -b], 'x') + ').'
        },
        {
          seccion: 'Paso 3: cancelar y sustituir',
          queHacemos: 'Cancelamos el factor repetido y volvemos a sustituir.',
          paraQue: 'Ya sin el factor que se anulaba, la sustitucion funciona.',
          queda: 'limite = ' + val,
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
          seccion: 'Paso 1: la media',
          queHacemos: 'Sumamos todos los datos.',
          paraQue: 'La media reparte el total a partes iguales, asi que primero hace falta el total.',
          queda: 'suma = ' + suma + ';  media ?, mediana ?, moda ?',
          pregunta: 'Para la media, primero sumalos todos.<br>&iquest;Cuanto da la suma?',
          resp: R.numero(suma, { dec: 0 }),
          pista: 'Sumalos de dos en dos para no perderte.',
          despues: 'Hay ' + n + ' datos, asi que ahora se divide entre ' + n + '.'
        },
        {
          seccion: 'Paso 1: la media',
          queHacemos: 'Dividimos entre cuantos datos hay.',
          paraQue: 'La media es sensible a los valores extremos: un dato muy grande la jala hacia arriba.',
          queda: 'media ' + F.n(suma / n, 4) + ', mediana ?, moda ?',
          pregunta: 'Divide la suma entre cuantos datos hay:<br>' + suma + ' &divide; ' + n + ' (4 decimales)',
          resp: R.numero(suma / n, { dec: 4, tol: 0.001 }),
          pista: 'Esa es la media o promedio.',
          despues: 'Lista la media. Ahora la mediana, que necesita los datos ORDENADOS.'
        },
        {
          seccion: 'Paso 2: la mediana',
          queHacemos: 'Ordenamos los datos y buscamos el del centro.',
          paraQue: 'ORDENAR primero no es opcional: sin ordenar, el del medio no significa nada.',
          queda: 'media ' + F.n(suma / n, 4) + ', mediana ' + F.n(mediana, 2) + ', moda ?',
          pregunta: 'Ordenados quedan: <b>' + orden.join(', ') + '</b><br>' +
            (n % 2 ? 'Son ' + n + ' datos (impar), asi que hay uno justo en medio. &iquest;Cual es?'
              : 'Son ' + n + ' datos (par), asi que se promedian los dos de en medio. &iquest;Cuanto da?'),
          resp: R.numero(mediana, { dec: 2, tol: 0.01 }),
          pista: n % 2 ? 'Es el de la posicion ' + ((n + 1) / 2) + '.'
            : 'Son ' + orden[n / 2 - 1] + ' y ' + orden[n / 2] + ': sumalos y divide entre 2.',
          despues: 'Esa es la mediana: el valor que parte los datos a la mitad.'
        },
        {
          seccion: 'Paso 3: la moda',
          queHacemos: 'Buscamos el dato que mas veces aparece.',
          paraQue: 'Es la unica de las tres que sirve tambien para datos que no son numeros.',
          queda: 'media ' + F.n(suma / n, 4) + ', mediana ' + F.n(mediana, 2) + ', moda ' + moda,
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
          seccion: 'Paso 1: los casos totales',
          queHacemos: 'Contamos todos los resultados posibles.',
          paraQue: 'Es el denominador. Se cuenta TODO lo que puede salir, no solo lo que nos interesa.',
          queda: 'P = ? &divide; ' + total,
          pregunta: '&iquest;Cuantos resultados posibles hay en total?',
          resp: R.numero(total, { dec: 0 }),
          pista: 'Cuenta TODO lo que puede pasar, no solo lo que buscas.',
          despues: 'Ese numero va abajo en la fraccion.'
        },
        {
          seccion: 'Paso 2: los casos favorables',
          queHacemos: 'Contamos solo los que cumplen la condicion.',
          paraQue: 'Es el numerador. Siempre sale menor o igual que el total: si te sale mayor, algo se conto de mas.',
          queda: 'P = ' + fav + ' &divide; ' + total,
          pregunta: 'De esos, &iquest;cuantos cumplen que ' + quePasa + '?',
          resp: R.numero(fav, { dec: 0 }),
          pista: 'Estos son los casos favorables.',
          despues: 'Ese va arriba.'
        },
        {
          seccion: 'Paso 3: la fraccion',
          queHacemos: 'Ponemos favorables entre totales y simplificamos.',
          paraQue: 'Comprobacion: una probabilidad siempre queda entre 0 y 1.',
          queda: 'P = ' + F.fracSimp(fav, total),
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
          seccion: 'Paso 1: el numero de acomodos',
          queHacemos: 'Calculamos la combinatoria C(n, k).',
          paraQue: 'Los exitos pueden salir en distintos ordenes, y todos cuentan. Este numero los cuenta todos.',
          queda: c + ' &middot; ? &middot; ?',
          pregunta: 'Primer pedazo: &iquest;cuanto vale C(' + n + ', ' + k + ')?<br>(de cuantas formas se pueden acomodar ' + k + ' exitos entre ' + n + ' intentos)',
          resp: R.numero(c, { dec: 0 }),
          pista: 'C(n,k) = n! / (k!(n&minus;k)!) = ' + n + '! / (' + k + '!&middot;' + (n - k) + '!).',
          despues: 'Ese numero cuenta en cuantos ordenes distintos pueden salir los exitos.'
        },
        {
          seccion: 'Paso 2: la parte de los exitos',
          queHacemos: 'Elevamos p al numero de exitos.',
          paraQue: 'Es la probabilidad de que los ' + k + ' exitos ocurran, uno detras de otro.',
          queda: c + ' &middot; ' + F.n(pk, 6) + ' &middot; ?',
          pregunta: 'Segundo pedazo: ' + pTxt + '<sup>' + k + '</sup> (la probabilidad de los ' + k + ' ' + (k === 1 ? 'exito' : 'exitos') + ')<br>(6 decimales)',
          resp: R.numero(pk, { dec: 6, tol: 0.0001 }),
          pista: 'Multiplica ' + pTxt + ' por si mismo ' + k + ' veces.',
          despues: ''
        },
        {
          seccion: 'Paso 3: la parte de los fracasos',
          queHacemos: 'Elevamos (1 &minus; p) al numero de fracasos.',
          paraQue: 'El exponente es n &minus; k, no n. Confundirlo es el error tipico.',
          queda: c + ' &middot; ' + F.n(pk, 6) + ' &middot; ' + F.n(qn, 6),
          pregunta: 'Tercer pedazo: (1 &minus; ' + pTxt + ')<sup>' + (n - k) + '</sup> = ' + qTxt + '<sup>' + (n - k) + '</sup><br>(la de los fracasos, 6 decimales)',
          resp: R.numero(qn, { dec: 6, tol: 0.0001 }),
          pista: 'Los otros ' + (n - k) + ' intentos tienen que fallar.',
          despues: 'Ya tenemos los tres. Solo falta multiplicarlos.'
        },
        {
          seccion: 'Paso 4: multiplicar',
          queHacemos: 'Multiplicamos los tres pedazos.',
          paraQue: 'Comprobacion: tiene que salir entre 0 y 1.',
          queda: 'P(X = ' + k + ') = ' + F.n(val, 4),
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
          seccion: 'Paso 1: elegir u',
          queHacemos: 'Renombramos la parte fea como u.',
          paraQue: 'Se elige lo de ADENTRO del parentesis: si su derivada es sencilla, la sustitucion funciona.',
          queda: 'u = ' + dentro,
          pregunta: '&iquest;Que conviene tomar como u?',
          resp: R.opcion(['u = ' + dentro, 'u = x', 'u = ' + n], 0),
          pista: 'Se toma lo que esta "adentro", lo que estorba.',
          despues: 'Bien. Ahora hay que ver cuanto vale du.'
        },
        {
          seccion: 'Paso 2: derivar u',
          queHacemos: 'Derivamos u para saber cuanto vale du.',
          paraQue: 'Hace falta para cambiar el dx por du. Ese numero acaba dividiendo fuera de la integral.',
          queda: '(1/' + a + ')&int;u' + F.sup(n) + 'du',
          pregunta: 'Si u = ' + dentro + ', deriva: du = ? dx<br>&iquest;Que numero acompana al dx?',
          resp: R.numero(a, { dec: 0 }),
          pista: 'La derivada de ' + dentro + ' respecto de x.',
          despues: 'Entonces dx = du/' + a + ', y ese ' + a + ' sale dividiendo.'
        },
        {
          seccion: 'Paso 3: integrar en u',
          queHacemos: 'Integramos con la regla de la potencia.',
          paraQue: 'Al integrar, el exponente SUBE uno y se divide entre el nuevo exponente. Justo al reves de derivar.',
          queda: F.frac('u' + F.sup(n + 1), a * (n + 1)),
          pregunta: 'La integral queda (1/' + a + ')&int;u' + F.sup(n) + 'du.<br>&iquest;Cuanto vale &int;u' + F.sup(n) + 'du?',
          resp: R.expresion('u^(' + (n + 1) + ')/' + (n + 1), { vars: ['u'], mostrar: F.frac('u' + F.sup(n + 1), n + 1), masConstante: true }),
          pista: 'Regla de la potencia al reves: se sube el exponente en 1 y se divide entre el nuevo exponente.',
          despues: 'Solo falta regresar el cambio: u vuelve a ser ' + dentro + '.'
        },
        {
          seccion: 'Paso 4: deshacer el cambio',
          queHacemos: 'Volvemos a poner la x donde estaba la u.',
          paraQue: 'La pregunta era en x. Dejar la respuesta en u es dejarla a medias. Y no olvidar el + C.',
          queda: F.frac('(' + dentro + ')' + F.sup(n + 1), a * (n + 1)) + ' + C',
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
          seccion: 'Paso 1: repartir u y dv',
          queHacemos: 'Decidimos que parte hace de u.',
          paraQue: 'Se toma como u lo que se SIMPLIFICA al derivar. La x derivada da 1; la exponencial no se simplifica nunca.',
          queda: 'u = x,  dv = ' + e + ' dx',
          pregunta: 'Hay que repartir: una parte es u y la otra dv.<br>&iquest;Que conviene tomar como u?',
          resp: R.opcion(['u = x', 'u = ' + e], 0),
          pista: 'Se elige como u lo que se SIMPLIFICA al derivar. La x se vuelve 1; la exponencial nunca cambia.',
          despues: 'Entonces u = x (y du = dx), y dv = ' + e + 'dx.'
        },
        {
          seccion: 'Paso 2: obtener v',
          queHacemos: 'Integramos dv.',
          paraQue: 'Hacen falta las cuatro piezas (u, du, v, dv) antes de aplicar la formula.',
          queda: 'v = ' + q(e, k),
          pregunta: 'Integra dv para obtener v:<br>&iquest;Cuanto es &int;' + e + 'dx?',
          resp: R.expresion('exp(' + k + '*x)/' + k, { masConstante: true, mostrar: q(e, k) }),
          pista: k === 1 ? 'La exponencial se integra en si misma.' : 'Se divide entre el ' + k + ' del exponente.',
          despues: 'Ya tenemos u = x, du = dx, v = ' + q(e, k) + '.'
        },
        {
          seccion: 'Paso 3: aplicar la formula',
          queHacemos: 'Sustituimos en uv &minus; &int;v du y resolvemos la integral que queda.',
          paraQue: 'La integral nueva tiene que ser MAS facil que la original. Si sale peor, u y dv estaban al reves.',
          queda: q('x' + e, k) + ' &minus; ' + q(e, k * k),
          pregunta: 'Aplica la formula: uv &minus; &int;v du = ' + q('x' + e, k) + ' &minus; ' + q(1, k) + '&int;' + e + 'dx<br>' +
            '&iquest;Cuanto vale esa ultima integral, ' + q(1, k) + '&int;' + e + 'dx?',
          resp: R.expresion('exp(' + k + '*x)/' + (k * k), { masConstante: true, mostrar: q(e, k * k) }),
          pista: 'Otra vez la misma integral de antes, dividida entre ' + k + ' de nuevo.',
          despues: 'Ahora solo hay que restarla.'
        },
        {
          seccion: 'Paso 4: escribir',
          queHacemos: 'Juntamos todo y factorizamos la exponencial.',
          paraQue: 'Comprobacion: si derivas el resultado tienes que volver al integrando original.',
          queda: e + '(' + q('x', k) + ' &minus; ' + q(1, k * k) + ') + C',
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
          seccion: 'Paso 1: tantear',
          queHacemos: 'Damos la vuelta a la pregunta y empezamos a probar exponentes.',
          paraQue: 'Un logaritmo ES una pregunta: a que exponente hay que elevar la base para llegar a ese numero.',
          queda: b + '&sup2; = ' + (b * b) + (b * b === x ? '  (ya llegamos)' : ';  falta llegar a ' + x),
          pregunta: 'Escribe la pregunta al reves: ' + b + ' elevado a QUE da ' + x + '?<br>Empieza probando: &iquest;cuanto es ' + b + '&sup2;?',
          resp: R.numero(b * b, { dec: 0 }),
          pista: b + ' &middot; ' + b,
          despues: (b * b === x ? 'Justo ese era.' : 'Todavia no llegamos a ' + x + ', hay que seguir subiendo.')
        },
        {
          seccion: 'Paso 2: el exponente',
          queHacemos: 'Seguimos subiendo hasta dar con el numero.',
          paraQue: 'Ese exponente ES el logaritmo. No hay nada mas que calcular.',
          queda: 'log<sub>' + b + '</sub>(' + x + ') = ' + n,
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
          seccion: 'Paso 1: el centro',
          queHacemos: 'Leemos la x del centro dentro del primer parentesis.',
          paraQue: 'La formula lleva un MENOS, asi que el signo se invierte: (x + 3)&sup2; significa h = &minus;3.',
          queda: 'centro (' + h + ', ?),  radio ?',
          pregunta: 'Compara con la formula. &iquest;Cual es la <b>h</b> (la x del centro)?<br>Cuidado: el signo se invierte.',
          resp: R.numero(h, { dec: 0 }),
          pista: h === 0 ? 'No hay nada sumando a la x, asi que h = 0.'
            : 'Dice ' + cuad('x', h) + '; como la formula lleva un menos, h = ' + h + '.',
          despues: 'Por eso hay que fijarse: lo que se ve restando es lo que vale h.'
        },
        {
          seccion: 'Paso 1: el centro',
          queHacemos: 'Lo mismo con la y.',
          paraQue: 'Mismo razonamiento: lo que se ve restando es lo que vale k.',
          queda: 'centro (' + h + ', ' + k + '),  radio ?',
          pregunta: '&iquest;Y la <b>k</b> (la y del centro)?',
          resp: R.numero(k, { dec: 0 }),
          pista: k === 0 ? 'No hay nada sumando a la y, asi que k = 0.' : 'Mismo razonamiento con ' + cuad('y', k) + '.',
          despues: 'Centro listo: (' + h + ', ' + k + ').'
        },
        {
          seccion: 'Paso 2: el radio',
          queHacemos: 'Sacamos la raiz del lado derecho.',
          paraQue: 'El error tipico es quedarse con r&sup2; y darlo como radio.',
          queda: 'centro (' + h + ', ' + k + '),  radio ' + r,
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
          seccion: 'Paso 1: preparar la formula',
          queHacemos: 'Localizamos a y b y calculamos 2a.',
          paraQue: 'La x del vertice es &minus;b/2a. Antes de dividir conviene tener listo el denominador.',
          queda: 'x = &minus;(' + b + ') &divide; ' + (2 * a),
          pregunta: 'Identifica los coeficientes: a = ' + a + ' y b = ' + b + '.<br>&iquest;Cuanto vale 2a?',
          resp: R.numero(2 * a, { dec: 0 }),
          pista: '2 &middot; ' + a,
          despues: 'Ese va abajo en la formula.'
        },
        {
          seccion: 'Paso 2: la x del vertice',
          queHacemos: 'Hacemos la division.',
          paraQue: 'Ojo con el doble signo si b ya venia negativo: &minus;(&minus;5) es +5.',
          queda: 'vertice (' + F.n(h, 4) + ', ?)',
          pregunta: 'Ahora calcula &minus;b/2a = &minus;(' + b + ') / ' + (2 * a) + '<br>(4 decimales)',
          resp: R.numero(h, { dec: 4, tol: 0.01 }),
          pista: 'Ojo con el doble signo si b ya es negativo.',
          despues: 'Esa es la x del vertice. Falta la y.'
        },
        {
          seccion: 'Paso 3: la y del vertice',
          queHacemos: 'Sustituimos esa x en la funcion original.',
          paraQue: 'En la ORIGINAL, no en la formula. Ese valor es la altura del vertice.',
          queda: 'vertice (' + F.n(h, 4) + ', ' + F.n(kk, 4) + ')',
          pregunta: 'Sustituye esa x en la funcion para obtener la y del vertice.<br>f(' + F.n(h, 4) + ') = ? (4 decimales)',
          resp: R.numero(kk, { dec: 4, tol: 0.01 }),
          pista: 'Eleva al cuadrado, multiplica por ' + a + ', suma ' + b + ' por la x, y suma ' + c + '.',
          despues: ''
        },
        {
          seccion: 'Paso 4: maximo o minimo',
          queHacemos: 'Miramos el signo de a.',
          paraQue: 'Si a es positiva abre hacia arriba como una U, y el vertice es el punto mas BAJO: un minimo.',
          queda: 'vertice (' + F.n(h, 4) + ', ' + F.n(kk, 4) + '),  ' + (a > 0 ? 'minimo' : 'maximo'),
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
          seccion: 'Paso 1: la antiderivada',
          queHacemos: 'Buscamos una funcion cuya derivada sea la del integrando.',
          paraQue: 'En una integral DEFINIDA la constante no hace falta: se cancela al restar.',
          queda: 'F(x) = ' + P.texto(I),
          pregunta: 'Primero la antiderivada. Integra ' + P.texto(coefs) + ' (sin la constante).<br>Escribe F(x).',
          resp: R.expresion(P.expr(I), { mostrar: P.texto(I), masConstante: true }),
          pista: 'Al reves de derivar: sube el exponente en 1 y divide entre el nuevo exponente.',
          despues: 'Esa es F(x). Ahora se evalua en los dos limites.'
        },
        {
          seccion: 'Paso 2: evaluar arriba',
          queHacemos: 'Sustituimos el limite superior en F.',
          paraQue: 'El teorema fundamental cambia todo el area por dos evaluaciones y una resta.',
          queda: 'F(' + b + ') = ' + F.n(Fb, 4) + ',  F(' + a + ') = ?',
          pregunta: 'Evalua en el limite de ARRIBA:<br>F(' + b + ') = ? (4 decimales)',
          resp: R.numero(Fb, { dec: 4, tol: 0.01 }),
          pista: 'Sustituye x = ' + b + ' en ' + P.texto(I) + '.',
          despues: ''
        },
        {
          seccion: 'Paso 3: evaluar abajo',
          queHacemos: 'Ahora el limite inferior.',
          paraQue: 'En la MISMA antiderivada, no en la funcion original.',
          queda: 'F(' + b + ') = ' + F.n(Fb, 4) + ',  F(' + a + ') = ' + F.n(Fa, 4),
          pregunta: 'Ahora en el de ABAJO:<br>F(' + a + ') = ? (4 decimales)',
          resp: R.numero(Fa, { dec: 4, tol: 0.01 }),
          pista: 'Sustituye x = ' + a + '.',
          despues: 'Ya solo falta restar.'
        },
        {
          seccion: 'Paso 4: restar',
          queHacemos: 'Restamos: siempre arriba menos abajo.',
          paraQue: 'Al reves sale con el signo cambiado. Un resultado negativo no es error: significa area por debajo del eje.',
          queda: 'integral = ' + F.n(Fb - Fa, 4),
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
          seccion: 'Paso 1: derivar',
          queHacemos: 'Derivamos la funcion.',
          paraQue: 'Un punto critico es donde la curva se APLANA, y eso es justo donde la derivada vale cero.',
          queda: P.texto(d) + ' = 0',
          pregunta: 'Primero deriva la funcion. &iquest;Cuanto vale f&prime;(x)?',
          resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
          pista: 'Baja cada exponente multiplicando; la constante ' + c + ' se vuelve 0.',
          despues: 'Ahora hay que ver donde esa derivada vale cero.'
        },
        {
          seccion: 'Paso 2: igualar a cero',
          queHacemos: 'Resolvemos la ecuacion.',
          paraQue: 'Ese valor de x es el punto critico.',
          queda: 'x = ' + F.n(x0, 4),
          pregunta: 'Iguala a cero y despeja:<br>' + P.texto(d) + ' = 0. &iquest;Cuanto vale x? (4 decimales)',
          resp: R.numero(x0, { dec: 4, tol: 0.01 }),
          pista: 'Pasa el ' + b + ' del otro lado y divide entre ' + (2 * a) + '.',
          despues: 'Ese es el punto critico.'
        },
        {
          seccion: 'Paso 3: clasificar',
          queHacemos: 'Miramos el signo de la segunda derivada.',
          paraQue: 'Segunda derivada positiva = la curva abre hacia arriba = minimo. Negativa = maximo.',
          queda: 'x = ' + F.n(x0, 4) + ',  ' + (a > 0 ? 'minimo' : 'maximo'),
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
          seccion: 'Paso 1: multiplicar en cruz',
          queHacemos: 'Multiplicamos la diagonal que no tiene x.',
          paraQue: 'El producto cruzado quita las dos fracciones de un golpe y deja una ecuacion simple.',
          queda: a + 'x = ' + F.n(b * c),
          pregunta: 'En una proporcion se multiplica en cruz.<br>&iquest;Cuanto da ' + b + ' &middot; ' + F.n(c) + '? (lo de la diagonal que NO tiene x)',
          resp: R.numero(b * c, { dec: 4, tol: 0.01 }),
          pista: 'Multiplica el de abajo-izquierda por el de arriba-derecha.',
          despues: 'Ese producto queda igualado a ' + a + '&middot;x.'
        },
        {
          seccion: 'Paso 2: despejar',
          queHacemos: 'Pasamos el numero que multiplica a la x dividiendo.',
          paraQue: 'Para dejar la x sola.',
          queda: 'x = ' + F.n(x, 2),
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
          seccion: 'Paso 1: la coordenada x',
          queHacemos: 'Sacamos el coseno del angulo.',
          paraQue: 'En este sentido no hay que decidir cuadrantes: el coseno ya trae el signo correcto metido.',
          queda: '(x, y) = (' + r_ + ' &middot; ' + F.n(cs, 4) + ', ?)',
          pregunta: '&iquest;Cuanto vale cos ' + th + '&deg;? (4 decimales)',
          resp: R.numero(cs, { dec: 4, tol: 0.001 }),
          pista: (th > 90 && th < 270) ? 'Ojo: en ese cuadrante el coseno es negativo.' : 'Calculadora en GRADOS.',
          despues: ''
        },
        {
          seccion: 'Paso 1: la coordenada x',
          queHacemos: 'Multiplicamos el radio por el coseno.',
          paraQue: 'Esa es la x: cuanto avanza el punto en horizontal.',
          queda: '(x, y) = (' + F.n(x, 2) + ', ?)',
          pregunta: 'Multiplica por r para tener la x:<br>' + r_ + ' &middot; ' + F.n(cs, 4) + ' (2 decimales)',
          resp: R.numero(x, { dec: 2, tol: 0.02 }),
          pista: 'Esa es la coordenada x.',
          despues: 'Ya tenemos la x. Ahora la y con el seno.'
        },
        {
          seccion: 'Paso 2: la coordenada y',
          queHacemos: 'Ahora el seno del mismo angulo.',
          paraQue: 'Abajo del eje x el seno sale negativo, y eso coloca el punto solo.',
          queda: '(x, y) = (' + F.n(x, 2) + ', ' + r_ + ' &middot; ' + F.n(sn, 4) + ')',
          pregunta: '&iquest;Cuanto vale sen ' + th + '&deg;? (4 decimales)',
          resp: R.numero(sn, { dec: 4, tol: 0.001 }),
          pista: th > 180 ? 'Ojo: abajo del eje x el seno es negativo.' : 'Calculadora en GRADOS.',
          despues: ''
        },
        {
          seccion: 'Paso 2: la coordenada y',
          queHacemos: 'Multiplicamos el radio por el seno.',
          paraQue: 'Comprobacion: los signos de x e y deben cuadrar con el cuadrante donde cae el angulo.',
          queda: '(x, y) = (' + F.n(x, 2) + ', ' + F.n(y, 2) + ')',
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
          seccion: 'Paso 1: sacar a y b',
          queHacemos: 'Sacamos la raiz del denominador de x&sup2;.',
          paraQue: 'Los denominadores son a&sup2; y b&sup2;, no a y b. Usarlos sin sacar la raiz es el error tipico.',
          queda: 'a = ' + a + ',  b = ?,  c = ?',
          pregunta: 'Debajo de x&sup2; esta a&sup2; = ' + (a * a) + '.<br>&iquest;Cuanto vale <b>a</b>?',
          resp: R.numero(a, { dec: 2, tol: 0.01 }),
          pista: 'Saca la raiz de ' + (a * a) + '.',
          despues: 'a es el semieje mayor.'
        },
        {
          seccion: 'Paso 1: sacar a y b',
          queHacemos: 'Lo mismo con el otro denominador.',
          paraQue: 'a es el semieje mayor y b el menor.',
          queda: 'a = ' + a + ',  b = ' + b + ',  c = ?',
          pregunta: 'Debajo de y&sup2; esta b&sup2; = ' + (b * b) + '.<br>&iquest;Cuanto vale <b>b</b>?',
          resp: R.numero(b, { dec: 2, tol: 0.01 }),
          pista: 'Raiz de ' + (b * b) + '.',
          despues: 'Ahora la c, que es la distancia del centro a cada foco.'
        },
        {
          seccion: 'Paso 2: calcular c',
          queHacemos: 'Restamos los dos cuadrados.',
          paraQue: 'En la elipse se RESTA; en la hiperbola se suma. Confundirlas es el error mas comun del tema.',
          queda: 'a = ' + a + ',  b = ' + b + ';  c&sup2; = ' + c2,
          pregunta: 'En la elipse se RESTA: c&sup2; = a&sup2; &minus; b&sup2;.<br>&iquest;Cuanto es ' + (a * a) + ' &minus; ' + (b * b) + '?',
          resp: R.numero(c2, { dec: 0 }),
          pista: 'Resta simple. (En la hiperbola seria suma, ojo con no confundirlas.)',
          despues: ''
        },
        {
          seccion: 'Paso 2: calcular c',
          queHacemos: 'Sacamos la raiz.',
          paraQue: 'c es la distancia del centro a cada foco. Ya solo falta dividir.',
          queda: 'a = ' + a + ',  c = ' + F.n(c, 4),
          pregunta: 'Saca la raiz para tener c: &radic;<span class="rad">' + c2 + '</span> (4 decimales)',
          resp: R.numero(c, { dec: 4, tol: 0.005 }),
          pista: 'Raiz cuadrada de ' + c2 + '.',
          despues: 'Ya tenemos c y a. Solo falta dividir.'
        },
        {
          seccion: 'Paso 3: dividir',
          queHacemos: 'Dividimos c entre a.',
          paraQue: 'En una elipse e siempre sale entre 0 y 1. Si te sale mayor que 1, invertiste la division.',
          queda: 'e = ' + F.n(e, 4),
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
          seccion: 'Paso 1: listar los exponentes',
          queHacemos: 'Anotamos el exponente de cada termino que aparece.',
          paraQue: 'Hay un atajo: no hace falta sustituir &minus;x en toda la expresion, basta con mirar los exponentes.',
          queda: 'exponentes: ' + exps.join(', '),
          pregunta: '&iquest;Que exponentes aparecen en la funcion?<br>Escribelos separados por coma (el termino sin x cuenta como exponente 0).',
          resp: R.lista(exps, { ayuda: 'Por ejemplo: 4, 2, 0' }),
          pista: 'Fijate en cada termino: ' + P.texto(coefs) + '.',
          despues: 'Ahora hay que ver si son todos del mismo tipo.'
        },
        {
          seccion: 'Paso 2: ver si son del mismo tipo',
          queHacemos: 'Comprobamos si son todos pares, todos impares o mezclados.',
          paraQue: 'Ojo: el 0 cuenta como par, asi que una constante suelta se comporta como termino par.',
          queda: ['todos pares', 'todos impares', 'mezclados'][tipo],
          pregunta: 'Los exponentes son ' + exps.join(', ') + '.<br>&iquest;Como son?',
          resp: R.opcion(['Todos pares', 'Todos impares', 'Mezclados'], tipo),
          pista: 'Recuerda que el 0 cuenta como par.',
          despues: pares ? 'Cuando todos son pares, al cambiar x por &minus;x nada cambia de signo.'
            : impares ? 'Cuando todos son impares, TODOS los terminos cambian de signo a la vez.'
              : 'Al estar mezclados, unos cambian de signo y otros no, asi que no se cumple ninguna de las dos condiciones.'
        },
        {
          seccion: 'Paso 3: clasificar',
          queHacemos: 'Traducimos eso a par, impar o ninguna.',
          paraQue: 'Todos pares: nada cambia de signo. Todos impares: TODOS cambian a la vez. Mezclados: unos si y otros no, asi que no cumple ninguna.',
          queda: ['par', 'impar', 'ni par ni impar'][tipo],
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
          seccion: 'Paso 1: donde esta la variable',
          queHacemos: 'Miramos DONDE aparece la x.',
          paraQue: 'Es la pregunta clave: en la base, en el exponente, dentro de una raiz, en un denominador, o dentro de otra funcion.',
          queda: opcionesDesc[correctaDesc],
          pregunta: 'Observa la expresion. &iquest;Cual de estas descripciones le queda?',
          resp: R.opcion(opcionesDesc, correctaDesc),
          pista: 'Pregunta clave: &iquest;la x esta en la base, en el exponente, dentro de una raiz, en un denominador, o dentro de otra funcion?',
          despues: 'Eso es lo que decide el tipo.'
        },
        {
          seccion: 'Paso 2: ponerle nombre',
          queHacemos: 'Traducimos esa descripcion al nombre del tipo.',
          paraQue: 'Cada descripcion corresponde a un tipo con nombre propio.',
          queda: TIPOS[idxTipo].toLowerCase(),
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

  /* ================= FISICA: MRU ================= */
  /* `cual` dice que se pide: 'v', 'd' o 't'. */
  guia.mruDespeje = function (cual, v, d, t) {
    var pide = { v: 'la velocidad', d: 'la distancia', t: 'el tiempo' }[cual];
    var despejada = { v: 'v = d / t', d: 'd = v &middot; t', t: 't = d / v' }[cual];
    var trampa = { v: 'v = d &middot; t', d: 'd = v / t', t: 't = v / d' }[cual];
    var cuenta = { v: d + ' &divide; ' + t, d: v + ' &times; ' + t, t: d + ' &divide; ' + v }[cual];
    var valor = { v: v, d: d, t: t }[cual];
    var unidad = { v: 'm/s', d: 'm', t: 's' }[cual];
    return {
      intro: 'Movimiento con <b>velocidad constante</b> (MRU) y hay que encontrar ' + pide + '.<br>' +
        'Todo el MRU cabe en una sola relacion: <b>v = d / t</b>. Lo unico que cambia de un ejercicio a otro ' +
        'es cual de las tres letras te piden.',
      pasos: [
        {
          seccion: 'Paso 1: la relacion',
          queHacemos: 'Escribimos la relacion entre velocidad, distancia y tiempo.',
          paraQue: 'Velocidad es cuantos metros recorre por cada segundo, o sea metros ENTRE segundos. De ahi sale todo lo demas.',
          queda: 'v = d / t',
          pregunta: 'En un movimiento con velocidad constante, &iquest;como se relacionan v, d y t?',
          resp: R.opcion(['v = d / t', 'v = d &middot; t'], 0),
          pista: 'Piensalo con las unidades: la velocidad se mide en metros POR segundo, y ese "por" es una division.',
          despues: 'Con esa relacion se puede despejar cualquiera de las tres.'
        },
        {
          seccion: 'Paso 2: despejar lo que piden',
          queHacemos: 'Despejamos ' + pide + '.',
          paraQue: cual === 'v'
            ? 'Aqui no hay que despejar nada: la formula ya viene con la v sola.'
            : 'Lo que esta dividiendo pasa multiplicando, y al reves. Confundir el sentido es el error tipico.',
          queda: despejada,
          pregunta: '&iquest;Como queda la formula despejada para ' + pide + '?',
          resp: R.opcion([despejada, trampa], 0),
          pista: 'Comprueba con las unidades: solo una de las dos te deja ' + unidad + '.',
          despues: 'Ahora solo falta sustituir los numeros.'
        },
        {
          seccion: 'Paso 3: sustituir y calcular',
          queHacemos: 'Metemos los datos y hacemos la cuenta.',
          paraQue: 'La respuesta de fisica lleva SIEMPRE su unidad. Un numero suelto no dice nada.',
          queda: F.n(valor, 2) + ' ' + unidad,
          pregunta: 'Calcula ' + cuenta + ' (2 decimales)',
          resp: R.numero(valor, { dec: 2, tol: 0.01, unidad: unidad }),
          pista: 'Division o multiplicacion directa.',
          despues: ''
        }
      ],
      final: pide.charAt(0).toUpperCase() + pide.slice(1) + ' es <b>' + F.n(valor, 2) + ' ' + unidad + '</b>',
      receta: ['MRU es velocidad constante: v = d / t',
        'Despejar la letra que piden',
        'Sustituir y calcular',
        'Escribir la unidad junto al numero']
    };
  };

  /* ================= FISICA: ACELERACION ================= */
  guia.aceleracion = function (v0, vf, t) {
    var cambio = vf - v0;
    var a = cambio / t;
    return {
      intro: 'La velocidad pasa de <b>' + F.n(v0, 2) + ' m/s</b> a <b>' + F.n(vf, 2) + ' m/s</b> en <b>' + t + ' s</b>.<br>' +
        'Acelerar es <b>cambiar de velocidad</b>, y la aceleracion mide cuanto cambia en cada segundo.',
      pasos: [
        {
          seccion: 'Paso 1: cuanto cambio la velocidad',
          queHacemos: 'Restamos la velocidad final menos la inicial.',
          paraQue: 'Lo que importa no es que tan rapido va, sino cuanto CAMBIO. Un coche a 100 km/h constantes tiene aceleracion cero.',
          queda: 'cambio de ' + F.n(cambio, 2) + ' m/s en ' + t + ' s',
          pregunta: '&iquest;Cuanto cambio la velocidad en total? (2 decimales)',
          resp: R.numero(cambio, { dec: 2, tol: 0.02, unidad: 'm/s' }),
          pista: F.n(vf, 2) + ' &minus; ' + F.n(v0, 2) + '.',
          despues: 'Ese cambio se repartio a lo largo de los ' + t + ' s.'
        },
        {
          seccion: 'Paso 2: repartirlo entre los segundos',
          queHacemos: 'Dividimos ese cambio entre el tiempo.',
          paraQue: 'Asi sale cuanta velocidad gana en CADA segundo, que es justo lo que significa la aceleracion.',
          queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;',
          pregunta: 'Reparte ese cambio entre los ' + t + ' s: ' + F.n(cambio, 2) + ' &divide; ' + t + ' (2 decimales)',
          resp: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
          pista: 'Division directa.',
          despues: 'Cada segundo que pasa, el movil gana ' + F.n(a, 2) + ' m/s.'
        },
        {
          seccion: 'Paso 3: leer las unidades',
          queHacemos: 'Vemos de donde sale el m/s&sup2;.',
          paraQue: 'No es un cuadrado raro: es (m/s) por cada s, o sea metros por segundo POR SEGUNDO. Entenderlo evita confundir velocidad con aceleracion.',
          queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;',
          pregunta: '&iquest;Que significa que la aceleracion valga ' + F.n(a, 2) + ' m/s&sup2;?',
          resp: R.opcion(['Que cada segundo la velocidad aumenta ' + F.n(a, 2) + ' m/s',
            'Que recorre ' + F.n(a, 2) + ' m cada segundo'], 0),
          pista: 'La segunda seria la velocidad, no la aceleracion.',
          despues: ''
        }
      ],
      final: 'La aceleracion es <b>' + F.n(a, 2) + ' m/s&sup2;</b>',
      receta: ['Aceleracion = cuanto CAMBIA la velocidad por segundo',
        'Restar la final menos la inicial',
        'Dividir ese cambio entre el tiempo',
        'Velocidad constante quiere decir aceleracion cero']
    };
  };

  /* ================= FISICA: VELOCIDAD FINAL ================= */
  guia.velocidadFinal = function (v0, a, t) {
    var gana = a * t;
    var vf = v0 + gana;
    return {
      intro: 'Arranca con <b>' + F.n(v0, 2) + ' m/s</b> y acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b> durante <b>' + t + ' s</b>.<br>' +
        'La idea es sencilla: a la velocidad que ya tenia se le suma <b>lo que gana acelerando</b>.',
      pasos: [
        {
          seccion: 'Paso 1: cuanta velocidad gana',
          queHacemos: 'Multiplicamos la aceleracion por el tiempo.',
          paraQue: 'Si gana ' + F.n(a, 2) + ' m/s en cada segundo, en ' + t + ' s gana ' + t + ' veces eso.',
          queda: 'gana ' + F.n(gana, 2) + ' m/s',
          pregunta: 'Calcula ' + F.n(a, 2) + ' &times; ' + t + ' (2 decimales)',
          resp: R.numero(gana, { dec: 2, tol: 0.02, unidad: 'm/s' }),
          pista: 'Multiplicacion directa.',
          despues: 'Eso es lo que GANO, no la velocidad final todavia.'
        },
        {
          seccion: 'Paso 2: sumarlo a la inicial',
          queHacemos: 'Le sumamos la velocidad con la que arranco.',
          paraQue: 'Aqui esta el error tipico: dar como respuesta lo que gano y olvidar que ya venia con velocidad.',
          queda: 'v<sub>f</sub> = ' + F.n(vf, 2) + ' m/s',
          pregunta: 'Ahora sumale la velocidad inicial: ' + F.n(v0, 2) + ' + ' + F.n(gana, 2) + ' (2 decimales)',
          resp: R.numero(vf, { dec: 2, tol: 0.02, unidad: 'm/s' }),
          pista: 'Suma directa.',
          despues: 'Eso es v<sub>f</sub> = v<sub>0</sub> + a t, la formula de siempre, entendida por partes.'
        }
      ],
      final: 'Termina con <b>' + F.n(vf, 2) + ' m/s</b>',
      receta: ['v<sub>f</sub> = v<sub>0</sub> + a t',
        'Primero lo que gana acelerando: a por t',
        'Despues sumarle la velocidad de arranque',
        'Si v<sub>0</sub> es cero, la velocidad final ES lo que gano']
    };
  };

  /* ================= FISICA: DISTANCIA EN MUA ================= */
  guia.distanciaMUA = function (v0, a, t) {
    var parte1 = v0 * t;
    var parte2 = 0.5 * a * t * t;
    var d = parte1 + parte2;
    return {
      intro: 'Parte con <b>' + F.n(v0, 2) + ' m/s</b> y acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b> durante <b>' + t + ' s</b>.<br>' +
        'La formula d = v<sub>0</sub>t + &frac12;at&sup2; asusta, pero son <b>dos pedazos</b> que se suman: ' +
        'lo que habria recorrido sin acelerar, mas lo que gano por acelerar.',
      pasos: [
        {
          seccion: 'Paso 1: lo que recorreria sin acelerar',
          queHacemos: 'Multiplicamos la velocidad inicial por el tiempo.',
          paraQue: 'Es el pedazo de MRU: si no acelerara nada, avanzaria eso.',
          queda: F.n(parte1, 2) + ' m  +  ?',
          pregunta: 'Calcula v<sub>0</sub> &middot; t = ' + F.n(v0, 2) + ' &times; ' + t + ' (2 decimales)',
          resp: R.numero(parte1, { dec: 2, tol: 0.02, unidad: 'm' }),
          pista: 'Multiplicacion directa.' + (v0 === 0 ? ' Ojo: si arranca del reposo, este pedazo vale 0.' : ''),
          despues: v0 === 0 ? 'Como parte del reposo, este pedazo no aporta nada.' : 'Ese es el primer pedazo.'
        },
        {
          seccion: 'Paso 2: lo que gana por acelerar',
          queHacemos: 'Calculamos &frac12; a t&sup2;.',
          paraQue: 'El tiempo va al CUADRADO: por eso acelerar un poco mas de tiempo hace mucha diferencia en la distancia.',
          queda: F.n(parte1, 2) + ' m  +  ' + F.n(parte2, 2) + ' m',
          pregunta: 'Calcula &frac12; &middot; ' + F.n(a, 2) + ' &middot; ' + t + '&sup2; = &frac12; &middot; ' + F.n(a, 2) + ' &middot; ' + (t * t) + ' (2 decimales)',
          resp: R.numero(parte2, { dec: 2, tol: 0.05, unidad: 'm' }),
          pista: 'Primero eleva el tiempo al cuadrado, luego multiplica y al final divide entre 2.',
          despues: 'Ese es el extra que aporta la aceleracion.'
        },
        {
          seccion: 'Paso 3: sumar los dos pedazos',
          queHacemos: 'Sumamos las dos partes.',
          paraQue: 'Comprobacion: la distancia siempre sale mayor que el primer pedazo, porque acelerando se avanza mas.',
          queda: 'd = ' + F.n(d, 2) + ' m',
          pregunta: 'Suma: ' + F.n(parte1, 2) + ' + ' + F.n(parte2, 2) + ' (2 decimales)',
          resp: R.numero(d, { dec: 2, tol: 0.05, unidad: 'm' }),
          pista: 'Suma directa.',
          despues: ''
        }
      ],
      final: 'Recorre <b>' + F.n(d, 2) + ' m</b>',
      receta: ['d = v<sub>0</sub>t + &frac12;at&sup2; son dos pedazos que se suman',
        'Primer pedazo: lo que avanzaria sin acelerar',
        'Segundo pedazo: lo que gana por acelerar, con el tiempo AL CUADRADO',
        'Si parte del reposo, solo queda el segundo pedazo']
    };
  };

  /* ================= FISICA: MUA SIN EL TIEMPO ================= */
  guia.sinTiempo = function (v0, a, d) {
    var doble = 2 * a * d;
    var vf2 = v0 * v0 + doble;
    var vf = Math.sqrt(vf2);
    return {
      intro: 'Parte con <b>' + F.n(v0, 2) + ' m/s</b>, acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b> y recorre <b>' + d + ' m</b>.<br>' +
        'Fijate en lo que <b>no</b> nos dan: el tiempo. De las cuatro formulas de MUA hay una que no lo usa, ' +
        'y es justo la que sirve aqui: <b>v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad</b>.',
      pasos: [
        {
          seccion: 'Paso 1: elegir la formula',
          queHacemos: 'Miramos que dato falta y elegimos la formula que no lo necesita.',
          paraQue: 'Cada formula de MUA deja fuera una variable. Elegir bien ahorra tener que calcular el tiempo aparte.',
          queda: 'v<sub>f</sub>&sup2; = ' + (v0 * v0) + ' + 2(' + F.n(a, 2) + ')(' + d + ')',
          pregunta: 'No nos dan el tiempo. &iquest;Que formula conviene?',
          resp: R.opcion(['v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad', 'v<sub>f</sub> = v<sub>0</sub> + at'], 0),
          pista: 'La segunda lleva una t que no tenemos.',
          despues: 'Esta relaciona velocidades con distancia, sin pasar por el tiempo.'
        },
        {
          seccion: 'Paso 2: el termino 2ad',
          queHacemos: 'Multiplicamos 2 por la aceleracion y por la distancia.',
          paraQue: 'Es lo que aporta el tramo acelerado. Si la aceleracion fuera negativa, este termino restaria.',
          queda: 'v<sub>f</sub>&sup2; = ' + (v0 * v0) + ' + ' + F.n(doble, 2),
          pregunta: 'Calcula 2 &middot; ' + F.n(a, 2) + ' &middot; ' + d + ' (2 decimales)',
          resp: R.numero(doble, { dec: 2, tol: 0.05 }),
          pista: 'Multiplicacion directa.',
          despues: ''
        },
        {
          seccion: 'Paso 3: sumar el cuadrado inicial',
          queHacemos: 'Le sumamos v<sub>0</sub> al cuadrado.',
          paraQue: 'Ojo: se suma el CUADRADO de la velocidad inicial, no la velocidad.',
          queda: 'v<sub>f</sub>&sup2; = ' + F.n(vf2, 2),
          pregunta: 'Calcula ' + (v0 * v0) + ' + ' + F.n(doble, 2) + ' (2 decimales)',
          resp: R.numero(vf2, { dec: 2, tol: 0.05 }),
          pista: v0 === 0 ? 'Parte del reposo, asi que v0 al cuadrado es 0.' : F.n(v0, 2) + '&sup2; = ' + (v0 * v0) + '.',
          despues: 'Eso es v<sub>f</sub> AL CUADRADO, no la velocidad todavia.'
        },
        {
          seccion: 'Paso 4: sacar la raiz',
          queHacemos: 'Sacamos la raiz cuadrada.',
          paraQue: 'Este es el paso que mas se olvida: quedarse en el cuadrado y darlo como respuesta.',
          queda: 'v<sub>f</sub> = ' + F.n(vf, 2) + ' m/s',
          pregunta: 'Saca la raiz de ' + F.n(vf2, 2) + ' (2 decimales)',
          resp: R.numero(vf, { dec: 2, tol: 0.03, unidad: 'm/s' }),
          pista: '&radic;<span class="rad">' + F.n(vf2, 2) + '</span>.',
          despues: ''
        }
      ],
      final: 'Llega con <b>' + F.n(vf, 2) + ' m/s</b>',
      receta: ['Si falta el tiempo: v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad',
        'Calcular 2ad',
        'Sumarle el CUADRADO de la velocidad inicial',
        'Sacar la raiz al final: lo que sale de la formula es v<sub>f</sub>&sup2;, no v<sub>f</sub>']
    };
  };

  EJ.guia = guia;
})(window);
