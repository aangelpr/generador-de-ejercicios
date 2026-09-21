/* Polinomios: operaciones generales.
   Este archivo es el modelo de como se organiza un tema con varios subtemas:
   cada subtema es una funcion suelta y `generar` solo decide cual toca. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function poliAleatorio(r, grado, min, max) {
    var p = [r.enteroNoCero(Math.max(min, -6), Math.max(1, max))];
    for (var i = 0; i < grado; i++) p.push(r.entero(min, max));
    return p;
  }
  function pr(p) { return '(' + P.texto(p) + ')'; }

  var G = EJ.guia.armar;

  var casos = {};

  /* ---------- suma y resta ---------- */
  casos.suma = function (r, dif) {
    var g = dif === 'facil' ? r.entero(1, 2) : 3;
    var A = poliAleatorio(r, g, -8, 8);
    var B = poliAleatorio(r, r.entero(1, g), -8, 8);
    var esSuma = r.bool();
    var res = esSuma ? P.suma(A, B) : P.resta(A, B);

    var nG = Math.max(A.length, B.length), Ag = [], Bg = [], iG;
    for (iG = 0; iG < nG - A.length; iG++) Ag.push(0);
    Ag = Ag.concat(A);
    for (iG = 0; iG < nG - B.length; iG++) Bg.push(0);
    Bg = Bg.concat(B);
    var pasosG = [];
    if (!esSuma) {
      pasosG.push({
        pregunta: 'Antes de operar: al restar, &iquest;que le pasa al segundo polinomio?',
        resp: R.opcion(['Le cambian TODOS los signos', 'Solo le cambia el signo al primer termino'], 0),
        pista: 'El menos de afuera entra a todo el parentesis, no solo al primero.',
        despues: pr(A) + ' &minus; ' + pr(B) + ' es lo mismo que ' + pr(A) + ' + ' + pr(P.escala(B, -1)) + '.'
      });
    }
    for (iG = 0; iG < nG; iG++) {
      (function (kk) {
        var e = nG - 1 - kk;
        var vA = Ag[kk], vB = esSuma ? Bg[kk] : -Bg[kk];
        pasosG.push({
          pregunta: (e === 0 ? 'Terminos sin x (independientes)' : 'Terminos de grado ' + e) +
            ': ' + vA + ' ' + (vB < 0 ? '&minus; ' + (-vB) : '+ ' + vB) + '<br>&iquest;Cuanto da?',
          resp: R.numero(vA + vB, { dec: 0 }),
          pista: e === 0 ? 'Son los dos numeros que van solos.'
            : 'Solo se suman los coeficientes; la x' + (e > 1 ? F.sup(e) : '') + ' se queda igual.',
          despues: (vA + vB) === 0 ? 'Da 0, asi que ese termino desaparece del resultado.' : ''
        });
      })(iG);
    }
    pasosG.push({
      pregunta: 'Junta todo y escribe el polinomio resultado.',
      resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pista: 'Es ' + P.texto(res) + '.', despues: ''
    });

    return {
      guia: G({
        intro: 'Hay que ' + (esSuma ? 'sumar' : 'restar') + ' <b>' + pr(A) + ' ' + (esSuma ? '+' : '&minus;') + ' ' + pr(B) + '</b>.<br>' +
          'La regla de oro: solo se juntan los terminos que tienen la MISMA potencia de x. ' +
          (esSuma ? 'Iremos grado por grado, de mayor a menor.'
            : 'Y ojo, que aqui hay una resta: el menos de afuera cambia todos los signos del segundo.'),
        pasos: pasosG,
        final: 'Resultado: <b>' + P.texto(res) + '</b>',
        receta: ['Alinear por grados',
          esSuma ? 'Sumar coeficiente con coeficiente' : 'Cambiar TODOS los signos del segundo y luego sumar',
          'La parte de la x nunca cambia',
          'Si un coeficiente da 0, ese termino desaparece']
      }),
      enunciado: (esSuma ? 'Suma' : 'Resta') + ' los polinomios:<br>' + pr(A) + ' ' + (esSuma ? '+' : '&minus;') + ' ' + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: [
        esSuma ? 'Junta los terminos que tienen la misma potencia de x.'
          : 'Al restar, el signo menos cambia TODOS los signos del segundo polinomio.',
        esSuma ? 'Ordena por grados y suma coeficiente con coeficiente.'
          : 'Reescribe como ' + pr(A) + ' + ' + pr(P.escala(B, -1)) + '.'
      ],
      solucion: [
        esSuma ? 'Sumo coeficientes del mismo grado' : 'Cambio los signos del segundo: ' + P.texto(P.escala(B, -1)),
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- grado, coeficientes y ordenamiento ---------- */
  casos.grado = function (r) {
    var g = r.entero(3, 5);
    var p = poliAleatorio(r, g, -9, 9);
    while (p[p.length - 1] === 0) p[p.length - 1] = r.enteroNoCero(-9, 9);
    var desordenado = r.baraja(p.map(function (c, i) { return { c: c, e: p.length - 1 - i }; }))
      .filter(function (t) { return t.c !== 0; })
      .map(function (t) { return F.term(t.c, 'x', t.e); });
    return {
      guia: G({
        intro: 'Nos dan <b>' + F.une(desordenado) + '</b> y piden tres cosas: grado, coeficiente principal y termino independiente.<br>' +
          'El truco de todo esto es el mismo: <b>primero ordenar de mayor a menor grado</b>. Una vez ordenado, las tres respuestas se leen solas.',
        pasos: [
          { pregunta: 'Ordenado de mayor a menor queda ' + P.texto(p) + '.<br>&iquest;Cual es el exponente mas grande?',
            resp: R.numero(g, { dec: 0 }),
            pista: 'Mira todos los exponentes y quedate con el mayor. Ese numero es el GRADO.',
            despues: 'Entonces el grado es ' + g + '.' },
          { pregunta: 'El <b>coeficiente principal</b> es el numero que acompaña al termino de mayor grado.<br>&iquest;Cual es?',
            resp: R.numero(p[0], { dec: 0 }),
            pista: 'Es el que va con x' + (g > 1 ? F.sup(g) : '') + ': ' + F.term(p[0], 'x', g) + '.',
            despues: 'Ojo: "principal" no quiere decir el primero que esta escrito, sino el de mayor grado.' },
          { pregunta: 'El <b>termino independiente</b> es el que no lleva x.<br>&iquest;Cual es?',
            resp: R.numero(p[p.length - 1], { dec: 0 }),
            pista: 'Es el numero suelto: ' + p[p.length - 1] + '. Tambien se puede pensar como el que va con x&#8304;.',
            despues: 'Tambien es el valor de P(0).' },
          { pregunta: 'Escribe las tres respuestas.',
            resp: R.varios([
              { etiqueta: 'Grado', resp: R.numero(g, { dec: 0 }) },
              { etiqueta: 'Coeficiente principal', resp: R.numero(p[0], { dec: 0 }) },
              { etiqueta: 'Termino independiente', resp: R.numero(p[p.length - 1], { dec: 0 }) }
            ]),
            pista: 'Grado ' + g + ', coeficiente principal ' + p[0] + ', termino independiente ' + p[p.length - 1] + '.',
            despues: '' }
        ],
        final: 'Grado <b>' + g + '</b>, coeficiente principal <b>' + p[0] + '</b>, termino independiente <b>' + p[p.length - 1] + '</b>',
        receta: ['Ordenar de mayor a menor grado',
          'Grado = exponente mas grande',
          'Coeficiente principal = el que va con ese exponente',
          'Termino independiente = el numero sin x']
      }),
      enunciado: 'Del polinomio<br><span class="big">' + F.une(desordenado) + '</span><br>' +
        'indica su grado, su coeficiente principal y su termino independiente.',
      respuesta: R.varios([
        { etiqueta: 'Grado', resp: R.numero(g, { dec: 0 }) },
        { etiqueta: 'Coeficiente principal', resp: R.numero(p[0], { dec: 0 }) },
        { etiqueta: 'Termino independiente', resp: R.numero(p[p.length - 1], { dec: 0 }) }
      ]),
      pistas: [
        'El grado es el exponente mas grande que aparece; conviene ordenar de mayor a menor.',
        'Ordenado queda ' + P.texto(p) + '. El coeficiente principal acompana al termino de mayor grado y el independiente es el que no tiene x.'
      ],
      solucion: [
        'Ordeno de mayor a menor grado: ' + P.texto(p),
        'El exponente mayor es ' + g + ' &rArr; grado <b>' + g + '</b>',
        'Le acompana el coeficiente <b>' + p[0] + '</b>',
        'El termino sin x es <b>' + p[p.length - 1] + '</b>'
      ]
    };
  };

  /* ---------- valor numerico ---------- */
  casos.evaluar = function (r, dif) {
    var p = poliAleatorio(r, dif === 'facil' ? 2 : 3, -6, 6);
    var x0 = r.enteroNoCero(-4, 4);
    var res = P.evalua(p, x0);
    var gE = p.length - 1;
    var pasosE = [
      { pregunta: 'Sustituimos cada x por (' + x0 + '). Empieza por la potencia: &iquest;cuanto es (' + x0 + ')&sup2;?',
        resp: R.numero(x0 * x0, { dec: 0 }),
        pista: x0 < 0 ? 'Negativo al cuadrado sale POSITIVO. Por eso se pone entre parentesis.' : 'Multiplica ' + x0 + ' por si mismo.',
        despues: '' }
    ];
    if (gE >= 3) {
      pasosE.push({
        pregunta: '&iquest;Y (' + x0 + ')&sup3;?',
        resp: R.numero(Math.pow(x0, 3), { dec: 0 }),
        pista: x0 < 0 ? 'Negativo al cubo se queda NEGATIVO (exponente impar).' : 'Es ' + (x0 * x0) + ' &middot; ' + x0 + '.',
        despues: 'Ya tenemos las potencias; ahora solo falta multiplicar y sumar.'
      });
    }
    pasosE.push({
      pregunta: 'Multiplica el coeficiente de mayor grado por su potencia: ' + p[0] + ' &middot; (' + Math.pow(x0, gE) + ')',
      resp: R.numero(p[0] * Math.pow(x0, gE), { dec: 0 }),
      pista: 'Cuidado con los signos.', despues: 'Falta hacer lo mismo con los demas y sumarlo todo.'
    });
    pasosE.push({
      pregunta: 'Calcula los demas terminos y suma todo.<br>&iquest;Cuanto vale P(' + x0 + ')?',
      resp: R.numero(res, { dec: 0 }),
      pista: 'Queda ' + p.map(function (co, ii) {
        var ee = gE - ii;
        return '(' + co + ')' + (ee ? '(' + Math.pow(x0, ee) + ')' : '');
      }).join(' + ') + ' = ' + res + '.',
      despues: ''
    });
    return {
      guia: G({
        intro: 'Nos dan P(x) = <b>' + P.texto(p) + '</b> y piden <b>P(' + x0 + ')</b>.<br>' +
          'Eso significa: donde diga x, escribe ' + x0 + '. El unico cuidado real es poner el numero entre PARENTESIS, ' +
          'sobre todo porque es negativo y los signos de las potencias cambian.',
        pasos: pasosE,
        final: 'P(' + x0 + ') = <b>' + res + '</b>',
        receta: ['Sustituir cada x por el valor, entre parentesis',
          'Resolver primero las potencias',
          'Multiplicar cada una por su coeficiente',
          'Sumar todo al final']
      }),
      enunciado: 'Si P(x) = ' + P.texto(p) + ', calcula P(' + x0 + ').',
      respuesta: R.numero(res, { dec: 0 }),
      pistas: ['Sustituye x por ' + x0 + ' con cuidado de los signos en las potencias.',
        '(' + x0 + ')&sup2; = ' + (x0 * x0) + (p.length > 3 ? ' y (' + x0 + ')&sup3; = ' + Math.pow(x0, 3) : '') + '.'],
      solucion: [
        'Sustituyo cada x por (' + x0 + ')',
        'Calculo las potencias y multiplico por sus coeficientes',
        'P(' + x0 + ') = <b>' + res + '</b>'
      ]
    };
  };

  /* ---------- multiplicacion ---------- */
  casos.producto = function (r, dif) {
    var A = dif === 'dificil' ? poliAleatorio(r, 2, -5, 5) : [r.enteroNoCero(-4, 5), r.entero(-7, 7)];
    var B = poliAleatorio(r, 2, -6, 6);
    var res = P.multiplica(A, B);

    var pasosM = [];
    (function () {
      for (var i = 0; i < A.length; i++) {
        if (A[i] === 0) continue;
        var eA = A.length - 1 - i, ceros = [];
        for (var z = 0; z < eA; z++) ceros.push(0);
        (function (etiqueta, parcial) {
          pasosM.push({
            pregunta: 'Multiplica <b>' + etiqueta + '</b> por todo ' + pr(B) + '.<br>&iquest;Que sale?',
            resp: R.expresion(P.expr(parcial), { mostrar: P.texto(parcial) }),
            pista: 'Repartelo uno por uno: ' + etiqueta + ' por cada termino de adentro. Queda ' + P.texto(parcial) + '.',
            despues: ''
          });
        })(F.term(A[i], 'x', eA), P.multiplica(B, [A[i]].concat(ceros)));
      }
    })();
    pasosM.push({
      pregunta: 'Ya tienes todos los pedazos. Sumalos y reduce los terminos semejantes.<br>Escribe el producto final.',
      resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pista: 'Junta los que tienen la misma potencia de x. Queda ' + P.texto(res) + '.',
      despues: ''
    });

    return {
      guia: G({
        intro: 'Hay que multiplicar <b>' + pr(A) + pr(B) + '</b>.<br>' +
          'Se usa la propiedad distributiva: <b>cada</b> termino del primer parentesis multiplica a <b>cada</b> termino del segundo. ' +
          'Lo hacemos por partes para no perdernos, y hasta el final se juntan los semejantes.',
        pasos: pasosM,
        final: 'Resultado: <b>' + P.texto(res) + '</b>',
        receta: ['Cada termino del primero por cada termino del segundo',
          'Coeficientes se multiplican, exponentes se SUMAN',
          'Al final reducir terminos semejantes',
          'Comprobacion rapida: el grado del resultado es la suma de los grados']
      }),
      enunciado: 'Multiplica: ' + pr(A) + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['Multiplica cada termino del primero por cada termino del segundo.',
        'Te salen ' + (A.length * B.length) + ' productos; luego reduce los semejantes.'],
      solucion: [
        'Aplico la propiedad distributiva termino a termino',
        F.term(A[0], 'x', A.length - 1) + ' &middot; ' + pr(B) + ' = ' + P.texto(P.multiplica([A[0]].concat(new Array(A.length - 1).fill(0)), B)),
        'Hago lo mismo con los demas terminos y sumo los semejantes',
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- factor comun ---------- */
  casos.factorComun = function (r, dif) {
    var k = r.elige([2, 3, 4, 5, 6, -2, -3]);
    var m = dif === 'dificil' ? r.entero(1, 3) : r.entero(0, 2);
    var dentro = dif === 'dificil' ? poliAleatorio(r, 2, -7, 7) : [r.enteroNoCero(1, 6), r.enteroNoCero(-8, 8)];
    /* si el ultimo coeficiente fuera 0, lo de adentro tendria todavia una x en
       comun y el "factor comun" del enunciado no seria el completo */
    while (dentro[dentro.length - 1] === 0) dentro = poliAleatorio(r, 2, -7, 7);
    /* el signo del factor comun es el del primer termino: solo se saca el menos
       cuando el polinomio empieza en negativo. Si no, salen cosas como
       -3x(-6x + 5) que nadie escribe asi. */
    dentro[0] = Math.abs(dentro[0]);
    /* el polinomio visible es k*x^m*(dentro) */
    var expandido = P.multiplica(P.escala(dentro, k), [1].concat(new Array(m).fill(0)));
    var factorTxt = (k === 1 ? '' : k) + (m ? 'x' + (m > 1 ? F.sup(m) : '') : '');
    return {
      enunciado: 'Factoriza sacando el factor comun:<br><span class="big">' + P.texto(expandido) + '</span>',
      respuesta: R.factorizada('(' + k + ')*x^(' + m + ')*(' + P.expr(dentro) + ')', {
        mostrar: factorTxt + pr(dentro)
      }),
      guia: EJ.guia.factorComun(k, m, dentro),
      pistas: [
        'Busca que numero divide a TODOS los coeficientes y cual es la menor potencia de x que aparece en todos.',
        'El factor comun es ' + factorTxt + '. Divide cada termino entre el para saber que queda dentro del parentesis.'
      ],
      solucion: [
        'Maximo comun divisor de los coeficientes: ' + Math.abs(k),
        m ? 'La menor potencia de x presente en todos los terminos es x' + (m > 1 ? F.sup(m) : '') : 'No hay x en todos los terminos, asi que el factor comun es solo numerico',
        'Factor comun: ' + factorTxt,
        'Divido cada termino entre el factor comun: ' + P.texto(dentro),
        'Resultado: <b>' + factorTxt + pr(dentro) + '</b>'
      ]
    };
  };

  /* ---------- division entre un monomio ---------- */
  casos.entreMonomio = function (r) {
    var c = r.elige([2, 3, 4, 5]);
    var m = r.entero(1, 2);
    var q = poliAleatorio(r, 2, -6, 6);
    var dividendo = P.multiplica(P.escala(q, c), [1].concat(new Array(m).fill(0)));
    var divisor = F.term(c, 'x', m);
    var gD = dividendo.length - 1, gQ = q.length - 1;
    var pasosDM = [
      { pregunta: '&iquest;Se puede repartir la division entre cada termino de arriba?',
        resp: R.opcion(['Si, porque abajo hay un solo monomio', 'No, nunca se puede repartir'], 0),
        pista: 'Repartir vale cuando el DENOMINADOR es un solo termino. Si abajo hubiera una suma, no se podria.',
        despues: 'Entonces vamos termino por termino.' },
      { pregunta: 'Primer termino: ' + F.term(dividendo[0], 'x', gD) + ' entre ' + divisor + '.<br>&iquest;Que coeficiente queda?',
        resp: R.numero(q[0], { dec: 0 }),
        pista: 'Solo los numeros: ' + dividendo[0] + ' &divide; ' + c + ' = ' + q[0] + '.',
        despues: '' },
      { pregunta: 'Y la x: x' + F.sup(gD) + ' entre x' + (m > 1 ? F.sup(m) : '') + '.<br>&iquest;Que exponente queda?',
        resp: R.numero(gQ, { dec: 0 }),
        pista: 'Dividiendose, los exponentes se RESTAN: ' + gD + ' &minus; ' + m + '.',
        despues: 'Primer termino del cociente: ' + F.term(q[0], 'x', gQ) + '.' }
    ];
    (function () {
      for (var i = 1; i < q.length; i++) {
        if (q[i] === 0) continue;
        (function (kk) {
          pasosDM.push({
            pregunta: 'Ahora ' + F.term(dividendo[kk], 'x', gD - kk) + ' entre ' + divisor + '.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(q[kk], { dec: 0 }),
            pista: dividendo[kk] + ' &divide; ' + c + ' = ' + q[kk] + ', y el exponente vuelve a bajar ' + m + '.',
            despues: 'Queda ' + F.term(q[kk], 'x', gQ - kk) + '.'
          });
        })(i);
        break;
      }
    })();
    pasosDM.push({
      pregunta: 'Termina los que falten y escribe el cociente completo.',
      resp: R.expresion(P.expr(q), { mostrar: P.texto(q) }),
      pista: 'Es ' + P.texto(q) + '.', despues: ''
    });
    return {
      guia: G({
        intro: 'Hay que resolver <b>' + F.frac(P.texto(dividendo), divisor) + '</b>.<br>' +
          'Cuando el de abajo es <b>un solo monomio</b>, la division se reparte: cada termino de arriba se divide entre el de abajo, por separado. ' +
          '(Esto NO se puede hacer si abajo hay una suma.)',
        pasos: pasosDM,
        final: 'Resultado: <b>' + P.texto(q) + '</b>',
        receta: ['Solo vale si abajo hay UN monomio',
          'Se reparte la division termino por termino',
          'Coeficientes se dividen',
          'Exponentes se restan',
          'Comprobacion: multiplicar el cociente por el divisor']
      }),
      enunciado: 'Divide: ' + F.frac(P.texto(dividendo), divisor),
      respuesta: R.expresion(P.expr(q), { mostrar: P.texto(q) }),
      pistas: ['Cuando el divisor es un solo monomio, se divide termino por termino.',
        'Para cada termino: divide el coeficiente entre ' + c + ' y resta ' + m + ' al exponente.'],
      solucion: [
        'Reparto la division entre cada termino del numerador',
        'Coeficientes divididos entre ' + c + ' y exponentes restados en ' + m,
        'Resultado: <b>' + P.texto(q) + '</b>'
      ]
    };
  };

  /* ---------- simplificar una expresion combinada ---------- */
  casos.combinada = function (r) {
    var A = poliAleatorio(r, 2, -6, 6);
    var B = poliAleatorio(r, 2, -6, 6);
    var k = r.elige([2, 3, -2]);
    var res = P.resta(A, P.escala(B, k));

    var Bk = P.escala(B, k);
    var pasosS = [
      { pregunta: 'Primero lo de adentro: distribuye el ' + k + ' en ' + pr(B) + '.<br>&iquest;Que queda?',
        resp: R.expresion(P.expr(Bk), { mostrar: P.texto(Bk) }),
        pista: 'Multiplica ' + k + ' por cada coeficiente: queda ' + P.texto(Bk) + '.',
        despues: 'La expresion es ahora ' + pr(A) + ' &minus; ' + pr(Bk) + '.' },
      { pregunta: 'Ese parentesis va RESTANDO. &iquest;Que hay que hacer con sus signos?',
        resp: R.opcion(['Cambiarlos todos', 'Dejarlos igual'], 0),
        pista: 'El menos de afuera entra a todo el parentesis. Es el error mas comun de todo el tema.',
        despues: 'Queda ' + P.texto(A) + ' + ' + P.texto(P.escala(Bk, -1)) + '.' }
    ];
    (function () {
      for (var i = 0; i < 3; i++) {
        (function (kk) {
          var e = 2 - kk, vA = A[kk], vB = -Bk[kk];
          pasosS.push({
            pregunta: (e === 0 ? 'Terminos sin x' : 'Terminos de grado ' + e) + ': ' +
              vA + ' ' + (vB < 0 ? '&minus; ' + (-vB) : '+ ' + vB) + '<br>&iquest;Cuanto da?',
            resp: R.numero(vA + vB, { dec: 0 }),
            pista: 'Solo los coeficientes; la parte de la x no se toca.',
            despues: (vA + vB) === 0 ? 'Da 0: ese termino desaparece.' : ''
          });
        })(i);
      }
    })();
    pasosS.push({
      pregunta: 'Escribe la expresion simplificada completa.',
      resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pista: 'Es ' + P.texto(res) + '.', despues: ''
    });

    return {
      guia: G({
        intro: 'Hay que simplificar <b>' + pr(A) + ' &minus; ' + k + pr(B) + '</b>.<br>' +
          'Son dos cosas seguidas: primero distribuir el ' + k + ' y despues restar. ' +
          'La trampa esta en el signo menos, que hay que repartir a TODO el segundo parentesis.',
        pasos: pasosS,
        final: 'Resultado: <b>' + P.texto(res) + '</b>',
        receta: ['Distribuir el numero de afuera',
          'El menos cambia TODOS los signos del parentesis',
          'Juntar terminos del mismo grado',
          'Ordenar de mayor a menor']
      }),
      enunciado: 'Simplifica: ' + pr(A) + ' &minus; ' + k + pr(B),
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['Primero multiplica el ' + k + ' por todo el segundo polinomio.',
        k + pr(B) + ' = ' + P.texto(P.escala(B, k)) + '. Ahora resta.'],
      solucion: [
        'Distribuyo: ' + k + pr(B) + ' = ' + P.texto(P.escala(B, k)),
        'Resto termino a termino (ojo con los signos)',
        'Resultado: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  /* ---------- division larga ---------- */
  casos.division = function (r) {
    var B = [1, r.enteroNoCero(-6, 6)];
    var Q = poliAleatorio(r, 2, -5, 5);
    var rem = r.enteroNoCero(-9, 9);
    var A = P.suma(P.multiplica(B, Q), [rem]);
    var bb = B[1], gA = A.length - 1;
    return {
      guia: G({
        intro: 'Hay que dividir <b>' + P.texto(A) + '</b> entre <b>' + P.texto(B) + '</b>.<br>' +
          'Es la division larga de toda la vida, pero con letras. El ciclo es siempre el mismo: ' +
          '<b>divido, multiplico, resto, bajo</b>; y se repite hasta que lo que queda tenga grado menor que el divisor.',
        pasos: [
          { pregunta: 'DIVIDO: el termino de mayor grado de arriba entre el de mayor grado de abajo.<br>' +
              F.term(A[0], 'x', gA) + ' &divide; x = ?',
            resp: R.expresion('(' + Q[0] + ')*x^' + (Q.length - 1), { mostrar: F.term(Q[0], 'x', Q.length - 1) }),
            pista: 'El coeficiente se queda igual (abajo hay un 1) y el exponente baja 1: ' + F.term(Q[0], 'x', Q.length - 1) + '.',
            despues: 'Ese es el primer termino del cociente.' },
          { pregunta: 'MULTIPLICO y RESTO: ' + F.term(Q[0], 'x', Q.length - 1) + ' &middot; ' + pr(B) + ' = ' +
              P.texto(P.multiplica(B, [Q[0], 0])) + '.<br>Al restarlo, &iquest;que coeficiente queda en x&sup2;?',
            resp: R.numero(Q[1], { dec: 0 }),
            pista: 'Era ' + A[1] + ' y le restas ' + (Q[0] * bb) + ': ' + A[1] + ' &minus; (' + (Q[0] * bb) + ') = ' + Q[1] + '.',
            despues: 'El termino de x&sup3; se cancela solo: para eso se eligio asi el cociente. Ese ' + Q[1] + ' es el segundo termino del cociente.' },
          { pregunta: 'Repito el ciclo. Ahora toca el de x.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(Q[2], { dec: 0 }),
            pista: 'Otra vez: ' + A[2] + ' &minus; (' + Q[1] + ')(' + bb + ') = ' + A[2] + ' &minus; (' + (Q[1] * bb) + ') = ' + Q[2] + '.',
            despues: 'Tercer termino del cociente.' },
          { pregunta: 'Ultimo ciclo, con el termino independiente.<br>&iquest;Que numero queda?',
            resp: R.numero(rem, { dec: 0 }),
            pista: A[3] + ' &minus; (' + Q[2] + ')(' + bb + ') = ' + A[3] + ' &minus; (' + (Q[2] * bb) + ') = ' + rem + '.',
            despues: 'Ya no se puede seguir: ' + rem + ' tiene grado 0 y el divisor grado 1. Ese es el RESIDUO.' },
          { pregunta: 'Escribe el cociente y el residuo.',
            resp: R.varios([
              { etiqueta: 'Cociente', resp: R.expresion(P.expr(Q), { mostrar: P.texto(Q) }) },
              { etiqueta: 'Residuo', resp: R.numero(rem, { dec: 0 }) }
            ]),
            pista: 'Cociente ' + P.texto(Q) + ' y residuo ' + rem + '.',
            despues: '' }
        ],
        final: 'Cociente <b>' + P.texto(Q) + '</b> y residuo <b>' + rem + '</b>',
        receta: ['Dividir los terminos de mayor grado',
          'Multiplicar el resultado por todo el divisor',
          'Restar (ojo con los signos)',
          'Bajar el siguiente termino y repetir',
          'Parar cuando el grado sea menor que el del divisor',
          'Comprobacion: divisor &middot; cociente + residuo = dividendo']
      }),
      enunciado: 'Divide ' + P.texto(A) + ' entre ' + P.texto(B) + '.<br>Da el cociente y el residuo.',
      respuesta: R.varios([
        { etiqueta: 'Cociente', resp: R.expresion(P.expr(Q), { mostrar: P.texto(Q) }) },
        { etiqueta: 'Residuo', resp: R.numero(rem, { dec: 0 }) }
      ]),
      pistas: ['Divide el termino de mayor grado del dividendo entre el del divisor, multiplica, resta y repite.',
        'El primer termino del cociente es ' + F.term(Q[0], 'x', Q.length - 1) + '.'],
      solucion: [
        'Primer paso: ' + F.term(A[0], 'x', A.length - 1) + ' &divide; x = ' + F.term(Q[0], 'x', Q.length - 1),
        'Multiplico, resto y bajo el siguiente termino; repito hasta que el grado sea menor que el del divisor',
        'Cociente: <b>' + P.texto(Q) + '</b>',
        'Residuo: <b>' + rem + '</b>',
        'Comprobacion: ' + pr(B) + pr(Q) + ' + (' + rem + ') = ' + P.texto(A)
      ]
    };
  };

  /* ---------- division sintetica (Ruffini) ---------- */
  casos.sintetica = function (r) {
    var a = r.enteroNoCero(-4, 4);
    var Q = poliAleatorio(r, 2, -6, 6);
    var rem = r.entero(-9, 9);
    var A = P.suma(P.multiplica([1, -a], Q), [rem]);
    /* renglon de la division sintetica */
    var bajados = [A[0]], acumulado = A[0];
    for (var i = 1; i < A.length; i++) { acumulado = A[i] + acumulado * a; bajados.push(acumulado); }
    return {
      enunciado: 'Usa division sintetica para dividir<br><span class="big">' + P.texto(A) + '</span><br>entre (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ').<br>Da el cociente y el residuo.',
      respuesta: R.varios([
        { etiqueta: 'Cociente', resp: R.expresion(P.expr(Q), { mostrar: P.texto(Q) }) },
        { etiqueta: 'Residuo', resp: R.numero(rem, { dec: 0 }) }
      ]),
      guia: EJ.guia.sintetica(A, a),
      pistas: [
        'Escribe solo los coeficientes ' + A.join(', ') + ' y usa como divisor el valor que anula al parentesis: x = ' + a + '.',
        'Baja el primer coeficiente, multiplicalo por ' + a + ', sumalo al siguiente y repite. El ultimo numero es el residuo.'
      ],
      solucion: [
        'Coeficientes del dividendo: ' + A.join(' | ') + ' &nbsp; y divisor x = ' + a,
        'Renglon de resultados: ' + bajados.join(' | '),
        'Los primeros numeros son el cociente (un grado menos): <b>' + P.texto(Q) + '</b>',
        'El ultimo es el residuo: <b>' + rem + '</b>'
      ]
    };
  };

  /* ---------- teorema del residuo ---------- */
  casos.residuo = function (r) {
    var p = poliAleatorio(r, 3, -7, 7);
    var a = r.enteroNoCero(-4, 4);
    var res = P.evalua(p, a);
    return {
      guia: G({
        intro: 'Piden el residuo de dividir <b>' + P.texto(p) + '</b> entre <b>(x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')</b>, ' +
          'pero <b>sin hacer la division</b>.<br>' +
          'Se puede, gracias al <b>teorema del residuo</b>: el residuo de dividir P(x) entre (x &minus; a) es simplemente <b>P(a)</b>. ' +
          'Toda la division larga se cambia por una sustitucion.',
        pasos: [
          { pregunta: '&iquest;Para que valor de x se hace cero el divisor (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')?',
            resp: R.numero(a, { dec: 0 }),
            pista: 'Iguala el parentesis a cero y despeja: x = ' + a + '. Ojo con el signo, es el CONTRARIO del que se ve.',
            despues: 'Ese numero es el que hay que sustituir.' },
          { pregunta: 'Calcula la potencia mas grande: (' + a + ')&sup3;',
            resp: R.numero(Math.pow(a, 3), { dec: 0 }),
            pista: a < 0 ? 'Negativo al cubo se queda negativo.' : 'Multiplica ' + a + ' tres veces.',
            despues: '' },
          { pregunta: 'Y (' + a + ')&sup2;',
            resp: R.numero(a * a, { dec: 0 }),
            pista: a < 0 ? 'Negativo al cuadrado sale positivo.' : 'Multiplica ' + a + ' por si mismo.',
            despues: 'Ya solo falta multiplicar por los coeficientes y sumar.' },
          { pregunta: 'Sustituye y suma todo: &iquest;cuanto vale P(' + a + ')?',
            resp: R.numero(res, { dec: 0 }),
            pista: '(' + p[0] + ')(' + Math.pow(a, 3) + ') + (' + p[1] + ')(' + (a * a) + ') + (' + p[2] + ')(' + a + ') + (' + p[3] + ') = ' + res + '.',
            despues: 'Y ese mismo numero es el residuo.' }
        ],
        final: 'El residuo es <b>' + res + '</b>',
        receta: ['Igualar el divisor a cero para hallar a',
          'Cuidado: el signo de a es el contrario del que se ve',
          'Calcular P(a) sustituyendo',
          'Ese valor ES el residuo, sin dividir nada']
      }),
      enunciado: 'Sin hacer la division, encuentra el residuo de dividir<br><span class="big">' + P.texto(p) + '</span><br>entre (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ').',
      respuesta: R.numero(res, { dec: 0 }),
      pistas: ['Teorema del residuo: al dividir P(x) entre (x &minus; a), el residuo es P(a).',
        'Aqui a = ' + a + ', asi que solo hay que calcular P(' + a + ').'],
      solucion: [
        'El divisor (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ') se anula en x = ' + a,
        'Por el teorema del residuo, el residuo es P(' + a + ')',
        'P(' + a + ') = <b>' + res + '</b>'
      ]
    };
  };

  /* ---------- teorema del factor ---------- */
  casos.factorTeorema = function (r) {
    var a = r.enteroNoCero(-4, 4);
    var esFactor = r.bool();
    var Q = poliAleatorio(r, 2, -5, 5);
    var p = P.multiplica([1, -a], Q);
    if (!esFactor) p = P.suma(p, [r.elige([1, -1, 2, -2, 3])]);
    var valor = P.evalua(p, a);
    return {
      guia: G({
        intro: 'Hay que decidir si <b>(x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')</b> es factor de <b>' + P.texto(p) + '</b>.<br>' +
          '"Ser factor" significa que la division sale exacta, sin residuo. Y por el <b>teorema del factor</b>, ' +
          'eso pasa exactamente cuando <b>P(a) = 0</b>. Asi que basta con evaluar.',
        pasos: [
          { pregunta: '&iquest;En que valor de x se anula (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')?',
            resp: R.numero(a, { dec: 0 }),
            pista: 'Iguala a cero y despeja: x = ' + a + '.',
            despues: '' },
          { pregunta: 'Calcula (' + a + ')&sup3;',
            resp: R.numero(Math.pow(a, 3), { dec: 0 }),
            pista: a < 0 ? 'Exponente impar: se queda negativo.' : 'Es ' + a + ' &middot; ' + a + ' &middot; ' + a + '.',
            despues: '' },
          { pregunta: 'Ahora evalua todo: &iquest;cuanto vale P(' + a + ')?',
            resp: R.numero(valor, { dec: 0 }),
            pista: '(' + p[0] + ')(' + Math.pow(a, 3) + ') + (' + p[1] + ')(' + (a * a) + ') + (' + p[2] + ')(' + a + ') + (' + p[3] + ') = ' + valor + '.',
            despues: valor === 0 ? 'Dio 0.' : 'Dio ' + valor + ', que no es 0.' },
          { pregunta: 'Entonces, &iquest;es factor?',
            resp: R.opcion(['Si es factor', 'No es factor'], esFactor ? 0 : 1),
            pista: valor === 0 ? 'P(' + a + ') = 0, asi que la division es exacta.'
              : 'P(' + a + ') = ' + valor + ', y ese mismo numero seria el residuo: sobra algo.',
            despues: '' }
        ],
        final: valor === 0 ? '<b>Si</b> es factor, porque P(' + a + ') = 0'
          : '<b>No</b> es factor: P(' + a + ') = ' + valor + ', ese seria el residuo',
        receta: ['Igualar el divisor a cero para hallar a',
          'Calcular P(a)',
          'Si da 0: si es factor',
          'Si no da 0: no lo es, y ese valor es el residuo']
      }),
      enunciado: '&iquest;Es (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ') un factor de<br><span class="big">' + P.texto(p) + '</span>?',
      respuesta: R.opcion(['Si es factor', 'No es factor'], esFactor ? 0 : 1),
      pistas: ['Teorema del factor: (x &minus; a) es factor de P(x) si y solo si P(a) = 0.',
        'Calcula P(' + a + ') y fijate si da cero.'],
      solucion: [
        'El divisor se anula en x = ' + a,
        'P(' + a + ') = ' + valor,
        valor === 0 ? 'Como da 0, <b>si</b> es factor (la division es exacta)' : 'Como no da 0 (residuo ' + valor + '), <b>no</b> es factor'
      ]
    };
  };

  /* ---------- factorizacion por agrupacion ---------- */
  casos.agrupacion = function (r) {
    var a = r.enteroNoCero(-6, 6);      // (x + a)
    var b = r.enteroNoCero(-7, 7);      // (x^2 + b)
    var p = P.multiplica([1, a], [1, 0, b]);   // x^3 + a x^2 + b x + ab
    var parA = '(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ')';
    return {
      guia: G({
        intro: 'Hay que factorizar <b>' + P.texto(p) + '</b> agrupando.<br>' +
          'Con cuatro terminos y sin factor comun entre todos, el truco es partirlos en dos parejas, ' +
          'sacar factor comun de cada pareja y esperar que quede el <b>mismo parentesis</b> en las dos. Si queda, ya ganaste.',
        pasos: [
          { pregunta: 'Agrupamos asi: (' + F.une([F.term(1, 'x', 3), F.term(a, 'x', 2)]) + ') + (' + F.une([F.term(b, 'x', 1), String(a * b)]) + ').<br>' +
              '&iquest;Cual es el factor comun del PRIMER grupo?',
            resp: R.expresion('x^2', { mostrar: 'x&sup2;' }),
            pista: 'Los dos tienen x&sup2; (uno tiene x&sup3;, que es x&sup2; &middot; x). Numero comun no hay.',
            despues: '' },
          { pregunta: 'Sacalo: x&sup2;( ? ).<br>&iquest;Que queda dentro del parentesis?',
            resp: R.expresion('x+(' + a + ')', { mostrar: F.poli([1, a], 'x') }),
            pista: 'Divide cada uno entre x&sup2;: x&sup3; &divide; x&sup2; = x, y ' + F.term(a, 'x', 2) + ' &divide; x&sup2; = ' + a + '.',
            despues: 'Vamos en x&sup2;' + parA + ' + ...' },
          { pregunta: 'Ahora el SEGUNDO grupo: ' + F.term(b, 'x', 1) + ' y ' + (a * b) + '.<br>&iquest;Cual es su factor comun?',
            resp: R.numero(b, { dec: 0 }),
            pista: 'Aqui es solo un numero: ' + b + '. (' + (a * b) + ' &divide; ' + b + ' = ' + a + '.)',
            despues: 'Queda ' + b + parA + ': &iexcl;el MISMO parentesis que en el primer grupo! Por eso funciona la agrupacion.' },
          { pregunta: 'Los dos grupos comparten ' + parA + '.<br>Escribe la factorizacion completa.',
            resp: R.factorizada('(x^2+(' + b + '))*(x+(' + a + '))', {
              mostrar: '(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')' }),
            pista: 'Un factor es el parentesis repetido y el otro son los dos factores que sacaste: (' +
              F.poli([1, 0, b], 'x') + ')' + parA + '.',
            despues: '' }
        ],
        final: 'Resultado: <b>(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')</b>',
        receta: ['Partir los cuatro terminos en dos parejas',
          'Sacar factor comun de cada pareja',
          'Debe quedar el MISMO parentesis en las dos',
          'Ese parentesis es un factor; lo que sacaste es el otro',
          'Si no coinciden, prueba agrupando de otra manera']
      }),
      enunciado: 'Factoriza agrupando terminos:<br><span class="big">' + P.texto(p) + '</span>',
      respuesta: R.factorizada('(x^2+(' + b + '))*(x+(' + a + '))', {
        mostrar: '(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')'
      }),
      pistas: [
        'Agrupa los dos primeros terminos y los dos ultimos, y saca factor comun en cada grupo.',
        'De x&sup3; ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + 'x&sup2; sale x&sup2;(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + '); del otro grupo debe salir el mismo parentesis.'
      ],
      solucion: [
        'Agrupo: (' + F.une([F.term(1, 'x', 3), F.term(a, 'x', 2)]) + ') + (' + F.une([F.term(b, 'x', 1), String(a * b)]) + ')',
        'Factor comun de cada grupo: x&sup2;(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ') + ' + b + '(x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ')',
        'Ahora (x ' + (a > 0 ? '+ ' + a : '&minus; ' + (-a)) + ') es factor comun de todo',
        'Resultado: <b>(' + F.poli([1, 0, b], 'x') + ')(' + F.poli([1, a], 'x') + ')</b>'
      ]
    };
  };

  /* ---------- cuadrado de un trinomio ---------- */
  casos.cuadradoTrinomio = function (r) {
    var a = r.enteroNoCero(-4, 4), b = r.enteroNoCero(-5, 5), c = r.enteroNoCero(-5, 5);
    var tri = [a, b, c], res = P.potencia(tri, 2);
    return {
      guia: G({
        intro: 'Hay que desarrollar <b>' + pr(tri) + '&sup2;</b>.<br>' +
          'Son TRES terminos al cuadrado, asi que salen <b>seis</b> pedazos: los tres cuadrados y los tres dobles productos.<br>' +
          '(a + b + c)&sup2; = a&sup2; + b&sup2; + c&sup2; + 2ab + 2ac + 2bc.<br>' +
          'Aqui a = <b>' + F.term(a, 'x', 2) + '</b>, b = <b>' + F.term(b, 'x', 1) + '</b> y c = <b>' + c + '</b>.',
        pasos: [
          { pregunta: 'Grado 4. Sale del cuadrado del primero: (' + F.term(a, 'x', 2) + ')&sup2;.<br>&iquest;Que coeficiente queda?',
            resp: R.numero(a * a, { dec: 0 }),
            pista: a + '&sup2; = ' + (a * a) + ', y (x&sup2;)&sup2; = x&#8308;.',
            despues: 'Primer termino: ' + F.term(a * a, 'x', 4) + '.' },
          { pregunta: 'Grado 3. Sale del doble producto primero &times; segundo: 2 &middot; ' + a + ' &middot; (' + b + ').<br>&iquest;Cuanto da?',
            resp: R.numero(2 * a * b, { dec: 0 }),
            pista: 'Multiplica 2 &middot; ' + a + ' &middot; (' + b + '). Las letras: x&sup2; &middot; x = x&sup3;.',
            despues: '' },
          { pregunta: 'Grado 2. Aqui caen DOS cosas: el cuadrado del segundo (' + b + ')&sup2; y el doble producto primero &times; tercero 2 &middot; ' + a + ' &middot; (' + c + ').<br>&iquest;Cuanto suman las dos?',
            resp: R.numero(b * b + 2 * a * c, { dec: 0 }),
            pista: '(' + b + ')&sup2; = ' + (b * b) + ' y 2 &middot; ' + a + ' &middot; (' + c + ') = ' + (2 * a * c) + '. Sumalos.',
            despues: 'Este es el paso donde mas se equivoca la gente: se olvidan de juntar los dos.' },
          { pregunta: 'Grado 1. Doble producto segundo &times; tercero: 2 &middot; ' + b + ' &middot; (' + c + ').<br>&iquest;Cuanto da?',
            resp: R.numero(2 * b * c, { dec: 0 }),
            pista: 'Solo los numeros; la letra que queda es una x sola.',
            despues: '' },
          { pregunta: 'Grado 0. Cuadrado del tercero: (' + c + ')&sup2;',
            resp: R.numero(c * c, { dec: 0 }),
            pista: c < 0 ? 'Negativo al cuadrado sale positivo.' : 'Multiplica ' + c + ' por si mismo.',
            despues: 'Ya estan los cinco terminos del resultado.' },
          { pregunta: 'Junta todo y escribe el desarrollo completo.',
            resp: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
            pista: 'Es ' + P.texto(res) + '.', despues: '' }
        ],
        final: pr(tri) + '&sup2; = <b>' + P.texto(res) + '</b>',
        receta: ['Los cuadrados de los tres terminos',
          'Los tres dobles productos: ab, ac y bc',
          'Juntar los que caen en el mismo grado',
          'Sale un polinomio de grado 4 con cinco terminos']
      }),
      enunciado: 'Desarrolla: ' + pr(tri) + '&sup2;',
      respuesta: R.expresion(P.expr(res), { mostrar: P.texto(res) }),
      pistas: ['(a + b + c)&sup2; = a&sup2; + b&sup2; + c&sup2; + 2ab + 2ac + 2bc.',
        'Aqui a = ' + F.term(a, 'x', 2) + ', b = ' + F.term(b, 'x', 1) + ', c = ' + c + '.'],
      solucion: [
        'Cuadrados: ' + F.term(a * a, 'x', 4) + ', ' + F.term(b * b, 'x', 2) + ', ' + (c * c),
        'Dobles productos: 2ab = ' + F.term(2 * a * b, 'x', 3) + ', 2ac = ' + F.term(2 * a * c, 'x', 2) + ', 2bc = ' + F.term(2 * b * c, 'x', 1),
        'Sumo todo: <b>' + P.texto(res) + '</b>'
      ]
    };
  };

  EJ.tema({
    id: 'polinomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Polinomios (operaciones generales)',
    descripcion: 'Suma, resta, producto, division, factor comun, agrupacion, division sintetica y teoremas del residuo y del factor.',
    formulario: 'Se suman o restan solo terminos semejantes.<br>' +
      'Producto: propiedad distributiva termino a termino.<br>' +
      'Division: Dividendo = divisor &middot; cociente + residuo, con grado(residuo) &lt; grado(divisor).<br>' +
      'Teorema del residuo: el residuo de dividir P(x) entre (x &minus; a) es P(a).<br>' +
      'Teorema del factor: (x &minus; a) es factor de P(x) si P(a) = 0.',

    generar: function (dif, r) {
      var id;
      if (dif === 'facil') {
        id = r.subtema([
          ['suma', 'Suma y resta'],
          ['grado', 'Grado y coeficientes'],
          ['evaluar', 'Valor numerico'],
          ['factorComun', 'Factor comun']
        ]);
      } else if (dif === 'medio') {
        id = r.subtema([
          ['producto', 'Multiplicacion'],
          ['combinada', 'Simplificar expresion'],
          ['factorComun', 'Factor comun'],
          ['entreMonomio', 'Division entre monomio'],
          ['residuo', 'Teorema del residuo'],
          ['suma', 'Suma y resta']
        ]);
      } else {
        id = r.subtema([
          ['division', 'Division larga'],
          ['sintetica', 'Division sintetica'],
          ['agrupacion', 'Factorizar por agrupacion'],
          ['factorTeorema', 'Teorema del factor'],
          ['factorComun', 'Factor comun'],
          ['cuadradoTrinomio', 'Cuadrado de un trinomio'],
          ['producto', 'Multiplicacion']
        ]);
      }
      return casos[id](r, dif);
    }
  });
})();
