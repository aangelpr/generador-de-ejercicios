/* Leyes de los exponentes */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  /* Monomio en pantalla: coeficiente + variables con exponentes. */
  function disp(c, vs) {
    var cuerpo = vs.filter(function (v) { return v[1] !== 0; })
      .map(function (v) { return v[1] === 1 ? v[0] : v[0] + F.sup(v[1]); }).join('');
    if (cuerpo === '') return F.n(c);
    if (c === 1) return cuerpo;
    if (c === -1) return '-' + cuerpo;
    return F.n(c) + cuerpo;
  }
  /* El mismo monomio en texto plano, para que lo lea el comparador. */
  var G = EJ.guia.armar;
  function txt(c, vs) {
    return '(' + c + ')' + vs.map(function (v) { return '*' + v[0] + '^(' + v[1] + ')'; }).join('');
  }

  var extra = {};

  extra.cero = function (r) {
    var c = r.entero(2, 9), a = r.entero(2, 5), b = r.entero(1, 4);
    var k = r.entero(2, 9);
    var val = k + 1;
    return {
      guia: G({
        intro: 'Vamos con <b>' + k + 'x' + F.sup(0) + ' + (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(0) + '</b>.<br>' +
          'La regla es corta: cualquier cosa (que no sea cero) elevada a 0 vale 1. Lo dificil es ver A QUIEN le toca el exponente.',
        pasos: [
          { seccion: 'Paso 1: a quien afecta el cero',
            queHacemos: 'Miramos QUE parte esta afectada por el exponente cero.',
            paraQue: 'Porque x&#8304; = 1, pero 5x&#8304; no es 1: el 5 no esta elevado, solo la x. El parentesis lo cambia todo.',
            queda: k + ' &middot; 1',
            pregunta: 'En ' + k + 'x' + F.sup(0) + ', &iquest;a quien esta elevando el cero?',
            resp: R.opcion(['Solo a la x', 'A todo el ' + k + 'x'], 0),
            pista: 'No hay parentesis, asi que el exponente solo agarra a la letra de junto.',
            despues: 'Entonces x' + F.sup(0) + ' = 1 y queda ' + k + ' &middot; 1.' },
          { seccion: 'Paso 1: a quien afecta el cero',
            queHacemos: 'Sustituimos la parte que vale 1 y hacemos la cuenta.',
            paraQue: 'Para quedarnos con el primer sumando ya resuelto.',
            queda: k + ' + ?',
            pregunta: '&iquest;Cuanto vale entonces ' + k + 'x' + F.sup(0) + '?',
            resp: R.numero(k, { dec: 0 }), pista: k + ' &middot; 1.', despues: '' },
          { seccion: 'Paso 2: el segundo termino',
            queHacemos: 'Ahora el exponente cero si envuelve a todo el monomio.',
            paraQue: 'Cualquier cosa (menos el cero) elevada a cero vale 1, sin importar lo complicada que sea.',
            queda: k + ' + 1',
            pregunta: 'Ahora el segundo: (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(0) + '.<br>Aqui SI hay parentesis. &iquest;Cuanto vale?',
            resp: R.numero(1, { dec: 0 }),
            pista: 'Todo el parentesis es la base, y cualquier base elevada a 0 da 1.', despues: '' },
          { seccion: 'Paso 3: sumar',
            queHacemos: 'Sumamos los dos resultados.',
            paraQue: 'Para llegar al numero final.',
            queda: String(val),
            pregunta: 'Suma los dos: ' + k + ' + 1', resp: R.numero(val, { dec: 0 }), pista: 'Suma sencilla.', despues: '' }
        ],
        final: 'El resultado es <b>' + val + '</b>',
        receta: ['Todo (menos el cero) elevado a 0 vale 1',
          'Sin parentesis el exponente solo agarra a la letra de junto',
          'Con parentesis agarra todo lo de adentro']
      }),
      enunciado: 'Calcula: ' + k + 'x' + F.sup(0) + ' + (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(0),
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Cualquier cosa (distinta de cero) elevada a la potencia 0 vale 1.',
        'Ojo: en ' + k + 'x' + F.sup(0) + ' el exponente solo afecta a la x, asi que queda ' + k + ' &middot; 1.'],
      solucion: [
        'x' + F.sup(0) + ' = 1, asi que ' + k + 'x' + F.sup(0) + ' = ' + k,
        'Todo el parentesis elevado a 0 vale 1',
        'Suma: ' + k + ' + 1 = <b>' + val + '</b>'
      ]
    };
  };

  extra.cientifica = function (r) {
    var m1 = r.entero(11, 95) / 10, e1 = r.enteroNoCero(-8, 8);
    var m2 = r.entero(11, 95) / 10, e2 = r.enteroNoCero(-8, 8);
    var esProducto = r.bool();
    var mant = esProducto ? m1 * m2 : m1 / m2;
    var expo = esProducto ? e1 + e2 : e1 - e2;
    while (mant >= 10) { mant /= 10; expo++; }
    while (mant < 1) { mant *= 10; expo--; }
    var op = esProducto ? '&middot;' : '&divide;';
    var mantCruda = esProducto ? m1 * m2 : m1 / m2;
    var expCrudo = esProducto ? e1 + e2 : e1 - e2;
    return {
      guia: G({
        intro: 'Vamos con <b>(' + m1 + ' &times; 10' + F.sup(e1) + ') ' + op + ' (' + m2 + ' &times; 10' + F.sup(e2) + ')</b>.<br>' +
          'En notacion cientifica se trabaja por separado: las mantisas por un lado y las potencias de 10 por otro.',
        pasos: [
          { seccion: 'Paso 1: las mantisas',
            queHacemos: 'Operamos solo los numeros de adelante, dejando las potencias de 10 aparte.',
            paraQue: 'En notacion cientifica cada parte se trabaja por su lado: mantisas con mantisas, potencias con potencias.',
            queda: F.n(mantCruda, 4) + ' &times; 10' + F.sup('?'),
            pregunta: 'Primero las mantisas: &iquest;cuanto es ' + m1 + ' ' + op + ' ' + m2 + '? (4 decimales)',
            resp: R.numero(mantCruda, { dec: 4, tol: 0.001 }),
            pista: 'Solo los numeros de adelante, ignorando las potencias de 10.', despues: '' },
          { seccion: 'Paso 2: las potencias de 10',
            queHacemos: 'Aplicamos la regla de los exponentes a las potencias de 10.',
            paraQue: 'Multiplicando se suman los exponentes y dividiendo se restan: es la misma regla de siempre.',
            queda: F.n(mantCruda, 4) + ' &times; 10' + F.sup(expCrudo),
            pregunta: 'Ahora las potencias de 10: con ' + (esProducto ? 'un producto se SUMAN' : 'un cociente se RESTAN') + ' los exponentes.<br>&iquest;Cuanto da ' + e1 + (esProducto ? ' + ' : ' &minus; ') + e2 + '?',
            resp: R.numero(expCrudo, { dec: 0 }), pista: 'Suma o resta con signo.', despues: 'Vamos en ' + F.n(mantCruda, 4) + ' &times; 10' + F.sup(expCrudo) + '.' },
          { seccion: 'Paso 3: normalizar',
            queHacemos: 'Ajustamos la mantisa para que quede entre 1 y 10.',
            paraQue: 'Es la regla de la notacion cientifica. Sin ese ajuste el numero esta bien, pero no esta en notacion cientifica.',
            queda: F.n(mant, 4) + ' &times; 10' + F.sup('?'),
            pregunta: 'La mantisa debe quedar entre 1 y 10. &iquest;Cual es la mantisa final? (4 decimales)',
            resp: R.numero(mant, { dec: 4, tol: 0.001 }),
            pista: mantCruda >= 10 ? 'Como paso de 10, recorre el punto una posicion a la izquierda.'
              : (mantCruda < 1 ? 'Como quedo menor que 1, recorre el punto a la derecha.' : 'Ya estaba en el rango: no se mueve.'),
            despues: '' },
          { seccion: 'Paso 3: normalizar',
            queHacemos: 'Compensamos el movimiento del punto con el exponente.',
            paraQue: 'Si corres el punto a la izquierda el exponente sube, y al reves. Asi el numero sigue valiendo lo mismo.',
            queda: F.n(mant, 4) + ' &times; 10' + F.sup(expo),
            pregunta: 'Y al ajustar la mantisa, el exponente cambia.<br>&iquest;Cual es el exponente final?',
            resp: R.numero(expo, { dec: 0 }),
            pista: expo === expCrudo ? 'No hubo que ajustar nada, se queda igual.'
              : (expo > expCrudo ? 'Al achicar la mantisa, el exponente SUBE.' : 'Al agrandar la mantisa, el exponente BAJA.'),
            despues: '' }
        ],
        final: 'Resultado: <b>' + F.n(mant, 4) + ' &times; 10' + F.sup(expo) + '</b>',
        receta: ['Operar las mantisas por separado',
          'Producto: sumar exponentes. Cociente: restarlos',
          'Dejar la mantisa entre 1 y 10 ajustando el exponente']
      }),
      enunciado: 'Resuelve y deja el resultado en notacion cientifica:<br>' +
        '<span class="big">(' + m1 + ' &times; 10' + F.sup(e1) + ') ' + op + ' (' + m2 + ' &times; 10' + F.sup(e2) + ')</span><br>' +
        'Da la mantisa (entre 1 y 10, con 4 decimales) y el exponente.',
      respuesta: R.varios([
        { etiqueta: 'Mantisa', resp: R.numero(mant, { dec: 4, tol: 0.001 }) },
        { etiqueta: 'Exponente de 10', resp: R.numero(expo, { dec: 0 }) }
      ]),
      pistas: [
        esProducto ? 'Multiplica las mantisas y SUMA los exponentes.' : 'Divide las mantisas y RESTA los exponentes.',
        'Si la mantisa te queda fuera del rango 1 a 10, corre el punto y ajusta el exponente.'
      ],
      solucion: [
        'Mantisas: ' + m1 + ' ' + op + ' ' + m2 + ' = ' + F.n(esProducto ? m1 * m2 : m1 / m2, 4),
        'Exponentes: ' + e1 + (esProducto ? ' + ' : ' &minus; ') + e2 + ' = ' + (esProducto ? e1 + e2 : e1 - e2),
        'Ajusto la mantisa al rango [1, 10)',
        'Resultado: <b>' + F.n(mant, 4) + ' &times; 10' + F.sup(expo) + '</b>'
      ]
    };
  };

  EJ.tema({
    id: 'leyes-exponentes',
    materia: 'matematicas',
    grupo: 'Aritmetica y algebra basica',
    nombre: 'Leyes de los exponentes',
    descripcion: 'Producto, cociente, potencia de potencia, exponente cero, negativo y fraccionario.',
    formulario: 'a<sup>m</sup>&middot;a<sup>n</sup> = a<sup>m+n</sup> &nbsp; a<sup>m</sup>/a<sup>n</sup> = a<sup>m&minus;n</sup> &nbsp; (a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup><br>' +
      '(ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup> &nbsp; a<sup>0</sup> = 1 &nbsp; a<sup>&minus;n</sup> = 1/a<sup>n</sup> &nbsp; a<sup>m/n</sup> = <sup>n</sup>&radic;<span class="rad">a<sup>m</sup></span>',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var a, b, c, d, n, m, enun, resp, pistas, sol, vars = ['x'];

      if (dif === 'facil') {
        var t = r.subtema([
          ['producto', 'Producto de potencias'],
          ['cociente', 'Cociente de potencias'],
          ['potencia', 'Potencia de una potencia'],
          ['negativo', 'Exponente negativo'],
          ['cero', 'Exponente cero']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          a = r.entero(2, 8); b = r.entero(2, 8);
          enun = 'Simplifica: x' + F.sup(a) + ' &middot; x' + F.sup(b);
          guiaDelPaso = EJ.guia.productoPotencias(a, b);
          resp = R.expresion('x^(' + (a + b) + ')', { mostrar: 'x' + F.sup(a + b) });
          pistas = ['Misma base multiplicandose: los exponentes se suman.', a + ' + ' + b + ' = ' + (a + b) + '.'];
          sol = ['a<sup>m</sup> &middot; a<sup>n</sup> = a<sup>m+n</sup>', 'x' + F.sup(a) + ' &middot; x' + F.sup(b) + ' = x' + F.sup(a + '+' + b) + ' = <b>x' + F.sup(a + b) + '</b>'];
        } else if (t === 'cociente') {
          b = r.entero(2, 5); a = b + r.entero(1, 5);
          guiaDelPaso = EJ.guia.cocientePotencias(a, b);
          enun = 'Simplifica: ' + F.frac('x' + F.sup(a), 'x' + F.sup(b));
          resp = R.expresion('x^(' + (a - b) + ')', { mostrar: 'x' + F.sup(a - b) });
          pistas = ['Misma base dividiendose: los exponentes se restan.', a + ' &minus; ' + b + ' = ' + (a - b) + '.'];
          sol = ['a<sup>m</sup>/a<sup>n</sup> = a<sup>m&minus;n</sup>', 'x' + F.sup(a) + '/x' + F.sup(b) + ' = <b>x' + F.sup(a - b) + '</b>'];
        } else if (t === 'potencia') {
          a = r.entero(2, 6); b = r.entero(2, 4);
          guiaDelPaso = EJ.guia.potenciaDePotencia(a, b);
          enun = 'Simplifica: (x' + F.sup(a) + ')' + F.sup(b);
          resp = R.expresion('x^(' + (a * b) + ')', { mostrar: 'x' + F.sup(a * b) });
          pistas = ['Potencia de una potencia: los exponentes se multiplican.', a + ' &middot; ' + b + ' = ' + (a * b) + '.'];
          sol = ['(a<sup>m</sup>)<sup>n</sup> = a<sup>mn</sup>', '(x' + F.sup(a) + ')' + F.sup(b) + ' = <b>x' + F.sup(a * b) + '</b>'];
        } else {
          a = r.entero(2, 4); b = a + r.entero(1, 4);
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac('x' + F.sup(a), 'x' + F.sup(b)) + '</b>.<br>' +
              'Arriba hay ' + a + ' equis y abajo ' + b + ': como abajo hay mas, va a sobrar abajo.',
            pasos: [
              { seccion: 'Paso 1: restar exponentes',
                queHacemos: 'Restamos los exponentes, que es lo que toca al dividir potencias de la misma base.',
                paraQue: 'Porque dividir es cancelar: si arriba hay ' + a + ' equis y abajo ' + b + ', se van cancelando de una en una.',
                queda: 'x' + F.sup(a - b),
                pregunta: 'Aplica la regla del cociente: &iquest;cuanto da ' + a + ' &minus; ' + b + '?',
                resp: R.numero(a - b, { dec: 0 }), pista: 'El de arriba menos el de abajo.',
                despues: 'Te quedo x' + F.sup(a - b) + ', con exponente NEGATIVO.' },
              { seccion: 'Paso 2: quitar el negativo',
                queHacemos: 'Bajamos la potencia al denominador y le quitamos el menos al exponente.',
                paraQue: 'Un exponente negativo no significa que el numero sea negativo: significa que esta del otro lado de la raya.',
                queda: F.frac(1, 'x' + F.sup(b - a)),
                pregunta: 'Un exponente negativo significa que ese factor va abajo.<br>&iquest;Con que exponente positivo queda en el denominador?',
                resp: R.numero(b - a, { dec: 0 }),
                pista: 'a<sup>&minus;n</sup> = 1/a<sup>n</sup>: el exponente se vuelve positivo al bajar.',
                despues: 'Entonces queda 1 entre x' + F.sup(b - a) + '.' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Escribimos el resultado sin exponentes negativos.',
                paraQue: 'Porque asi se acostumbra dar la respuesta final.',
                queda: F.frac(1, 'x' + F.sup(b - a)),
                pregunta: 'Escribe el resultado con exponente positivo.',
                resp: R.expresion('1/x^(' + (b - a) + ')', { mostrar: F.frac(1, 'x' + F.sup(b - a)) }),
                pista: 'Se escribe 1/x^' + (b - a) + '.', despues: '' }
            ],
            final: F.frac('x' + F.sup(a), 'x' + F.sup(b)) + ' = <b>' + F.frac(1, 'x' + F.sup(b - a)) + '</b>',
            receta: ['Restar exponentes como siempre',
              'Si sale negativo, el factor se pasa al otro lado de la fraccion',
              'Al cambiar de lado, el exponente se vuelve positivo']
          });
          enun = 'Escribe con exponente positivo: ' + F.frac('x' + F.sup(a), 'x' + F.sup(b));
          resp = R.expresion('1/x^(' + (b - a) + ')', { mostrar: F.frac(1, 'x' + F.sup(b - a)) });
          pistas = ['Resta los exponentes: te queda un exponente negativo.',
            'a<sup>&minus;n</sup> = 1/a<sup>n</sup>, con n = ' + (b - a) + '.'];
          sol = ['x' + F.sup(a) + '/x' + F.sup(b) + ' = x' + F.sup(a - b),
            'Un exponente negativo pasa al denominador: <b>' + F.frac(1, 'x' + F.sup(b - a)) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['coefPotencia', 'Potencia con coeficiente'],
          ['cocienteCoef', 'Producto entre cociente'],
          ['dosVars', 'Dos variables'],
          ['negativoCoef', 'Exponentes negativos'],
          ['cientifica', 'Notacion cientifica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'coefPotencia') {
          c = r.entero(2, 5); a = r.entero(2, 4); n = r.entero(2, 3);
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + disp(c, [['x', a]]) + ')' + F.sup(n) + '</b>.<br>' +
              'El error clasico es elevar solo la x. El exponente de afuera afecta a TODO lo que esta dentro del parentesis.',
            pasos: [
              { seccion: 'Paso 1: el coeficiente',
                queHacemos: 'Elevamos el coeficiente al exponente de afuera.',
                paraQue: 'El exponente de afuera le cae a TODO lo del parentesis, no solo a la letra. Este es el error tipico.',
                queda: Math.pow(c, n) + 'x' + F.sup('?'),
                pregunta: 'Primero el numero: &iquest;cuanto vale ' + c + F.sup(n) + '?',
                resp: R.numero(Math.pow(c, n), { dec: 0 }),
                pista: 'Multiplica ' + c + ' por si mismo ' + n + ' veces.',
                despues: 'Ese es el coeficiente nuevo.' },
              { seccion: 'Paso 2: la letra',
                queHacemos: 'Elevamos la potencia de x a la potencia de afuera.',
                paraQue: 'Potencia de potencia: los exponentes se MULTIPLICAN, no se suman.',
                queda: disp(Math.pow(c, n), [['x', a * n]]),
                pregunta: 'Ahora la parte con x: (x' + F.sup(a) + ')' + F.sup(n) + '.<br>&iquest;Que exponente queda?',
                resp: R.numero(a * n, { dec: 0 }), pista: 'Potencia de potencia: se MULTIPLICAN, ' + a + ' &middot; ' + n + '.',
                despues: '' },
              { seccion: 'Paso 3: juntar',
                queHacemos: 'Escribimos coeficiente y letra juntos.',
                paraQue: 'Para dar la respuesta completa.',
                queda: disp(Math.pow(c, n), [['x', a * n]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(Math.pow(c, n), [['x', a * n]]), { mostrar: disp(Math.pow(c, n), [['x', a * n]]) }),
                pista: 'Es ' + disp(Math.pow(c, n), [['x', a * n]]) + '.', despues: '' }
            ],
            final: '(' + disp(c, [['x', a]]) + ')' + F.sup(n) + ' = <b>' + disp(Math.pow(c, n), [['x', a * n]]) + '</b>',
            receta: ['El exponente de afuera afecta al coeficiente Y a la letra',
              'El coeficiente se eleva',
              'Los exponentes de las letras se multiplican']
          });
          enun = 'Simplifica: (' + disp(c, [['x', a]]) + ')' + F.sup(n);
          resp = R.expresion(txt(Math.pow(c, n), [['x', a * n]]), { mostrar: disp(Math.pow(c, n), [['x', a * n]]) });
          pistas = ['El exponente de afuera afecta al coeficiente y a la variable.',
            c + F.sup(n) + ' = ' + Math.pow(c, n) + ' y x' + F.sup(a) + ' elevado a ' + n + ' da x' + F.sup(a * n) + '.'];
          sol = ['(ab)<sup>n</sup> = a<sup>n</sup>b<sup>n</sup>',
            '(' + c + ')' + F.sup(n) + ' = ' + Math.pow(c, n),
            '(x' + F.sup(a) + ')' + F.sup(n) + ' = x' + F.sup(a * n),
            'Resultado: <b>' + disp(Math.pow(c, n), [['x', a * n]]) + '</b>'];
        } else if (t2 === 'cocienteCoef') {
          c = r.entero(2, 6); d = r.entero(2, 6);
          var e = r.elige([2, 3, 4]);
          a = r.entero(2, 5); b = r.entero(1, 4); m = r.entero(1, 4);
          var coef = (c * d) / e;
          while (Math.abs(coef - Math.round(coef)) > 1e-9) { c = r.entero(2, 6); coef = (c * d) / e; }
          var expF = a + b - m;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac('(' + disp(c, [['x', a]]) + ')(' + disp(d, [['x', b]]) + ')', disp(e, [['x', m]])) + '</b>.<br>' +
              'Primero se resuelve todo el numerador y despues se divide.',
            pasos: [
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Resolvemos primero todo lo de arriba.',
                paraQue: 'Porque conviene simplificar cada parte de la fraccion antes de dividir.',
                queda: F.frac((c * d) + 'x' + F.sup('?'), disp(e, [['x', m]])),
                pregunta: 'Multiplica los coeficientes de arriba: ' + c + ' &middot; ' + d,
                resp: R.numero(c * d, { dec: 0 }), pista: 'Solo los numeros.', despues: '' },
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Sumamos los exponentes de arriba.',
                paraQue: 'Multiplicandose, las potencias de la misma base suman sus exponentes.',
                queda: F.frac(disp(c * d, [['x', a + b]]), disp(e, [['x', m]])),
                pregunta: 'Y los exponentes de arriba: x' + F.sup(a) + ' &middot; x' + F.sup(b) + '.<br>&iquest;Que exponente queda?',
                resp: R.numero(a + b, { dec: 0 }), pista: 'Multiplicandose se SUMAN.',
                despues: 'Arriba quedo ' + disp(c * d, [['x', a + b]]) + '.' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Dividimos los numeros de arriba entre los de abajo.',
                paraQue: 'Ya con el numerador resuelto, solo queda la division.',
                queda: coef + 'x' + F.sup('?'),
                pregunta: 'Ahora divide los coeficientes: ' + (c * d) + ' &divide; ' + e,
                resp: R.numero(coef, { dec: 0 }), pista: 'Division normal.', despues: '' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Restamos los exponentes.',
                paraQue: 'Dividiendose, las potencias de la misma base restan sus exponentes.',
                queda: disp(coef, [['x', expF]]),
                pregunta: 'Y resta los exponentes: ' + (a + b) + ' &minus; ' + m,
                resp: R.numero(expF, { dec: 0 }), pista: 'Dividiendose se RESTAN.', despues: '' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Juntamos coeficiente y letra.',
                paraQue: 'Para dar la respuesta completa.',
                queda: disp(coef, [['x', expF]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(coef, [['x', expF]]), { mostrar: disp(coef, [['x', expF]]) }),
                pista: 'Es ' + disp(coef, [['x', expF]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(coef, [['x', expF]]) + '</b>',
            receta: ['Resolver primero el numerador (coeficientes y exponentes)',
              'Dividir los coeficientes',
              'Restar los exponentes']
          });
          enun = 'Simplifica: ' + F.frac('(' + disp(c, [['x', a]]) + ')(' + disp(d, [['x', b]]) + ')', disp(e, [['x', m]]));
          resp = R.expresion(txt(coef, [['x', expF]]), { mostrar: disp(coef, [['x', expF]]) });
          pistas = ['Multiplica arriba primero: coeficientes por coeficientes y exponentes se suman.',
            'Arriba queda ' + disp(c * d, [['x', a + b]]) + '; ahora divide entre ' + disp(e, [['x', m]]) + '.'];
          sol = ['Numerador: ' + disp(c, [['x', a]]) + ' &middot; ' + disp(d, [['x', b]]) + ' = ' + disp(c * d, [['x', a + b]]),
            'Coeficientes: ' + (c * d) + ' &divide; ' + e + ' = ' + coef,
            'Exponentes: ' + (a + b) + ' &minus; ' + m + ' = ' + expF,
            'Resultado: <b>' + disp(coef, [['x', expF]]) + '</b>'];
        } else if (t2 === 'dosVars') {
          vars = ['x', 'y'];
          a = r.entero(2, 4); b = r.entero(1, 3); n = r.entero(2, 3); c = r.elige([1, 2, 3]);
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(n) + '</b>.<br>' +
              'El exponente de afuera se reparte a CADA factor de adentro: al numero, a la x y a la y.',
            pasos: [
              { seccion: 'Paso 1: el coeficiente',
                queHacemos: 'Elevamos el numero al exponente de afuera.',
                paraQue: 'El exponente le toca a cada factor del parentesis, empezando por el numero.',
                queda: Math.pow(c, n) + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'El coeficiente: &iquest;cuanto es ' + c + F.sup(n) + '?',
                resp: R.numero(Math.pow(c, n), { dec: 0 }), pista: c === 1 ? '1 elevado a lo que sea es 1.' : 'Multiplicalo por si mismo ' + n + ' veces.', despues: '' },
              { seccion: 'Paso 2: la x',
                queHacemos: 'Multiplicamos el exponente de la x por el de afuera.',
                paraQue: 'Potencia de potencia: los exponentes se multiplican.',
                queda: Math.pow(c, n) + 'x' + F.sup(a * n) + 'y' + F.sup('?'),
                pregunta: 'La x: (x' + F.sup(a) + ')' + F.sup(n) + ' &rarr; &iquest;que exponente?',
                resp: R.numero(a * n, { dec: 0 }), pista: 'Se multiplican: ' + a + ' &middot; ' + n + '.', despues: '' },
              { seccion: 'Paso 3: la y',
                queHacemos: 'Lo mismo con la y.',
                paraQue: 'Cada letra se trabaja por separado, nunca se mezclan entre ellas.',
                queda: disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]),
                pregunta: 'La y: (y' + F.sup(b) + ')' + F.sup(n) + ' &rarr; &iquest;que exponente?',
                resp: R.numero(b * n, { dec: 0 }), pista: 'Igual: ' + b + ' &middot; ' + n + '.', despues: 'Ya estan las tres partes.' },
              { seccion: 'Paso 4: juntar',
                queHacemos: 'Escribimos las tres partes juntas.',
                paraQue: 'Para dar la respuesta completa.',
                queda: disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(Math.pow(c, n), [['x', a * n], ['y', b * n]]), { vars: ['x','y'], mostrar: disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]) }),
                pista: 'Es ' + disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]) + '</b>',
            receta: ['El exponente de afuera le toca a cada factor',
              'El coeficiente se eleva',
              'Los exponentes de cada letra se multiplican']
          });
          enun = 'Simplifica: (' + disp(c, [['x', a], ['y', b]]) + ')' + F.sup(n);
          resp = R.expresion(txt(Math.pow(c, n), [['x', a * n], ['y', b * n]]), {
            vars: vars, mostrar: disp(Math.pow(c, n), [['x', a * n], ['y', b * n]])
          });
          pistas = ['El exponente de afuera se reparte a cada factor.',
            'x' + F.sup(a) + ' &rarr; x' + F.sup(a * n) + ', y' + F.sup(b) + ' &rarr; y' + F.sup(b * n) + '.'];
          sol = ['(x<sup>a</sup>y<sup>b</sup>)<sup>n</sup> = x<sup>an</sup>y<sup>bn</sup>',
            'Resultado: <b>' + disp(Math.pow(c, n), [['x', a * n], ['y', b * n]]) + '</b>'];
        } else {
          c = r.entero(2, 6); d = r.entero(2, 6); a = r.entero(2, 5); b = r.entero(1, 4);
          var ef = b - a;
          var mostrar = ef >= 0 ? disp(c * d, [['x', ef]]) : F.frac(c * d, 'x' + F.sup(-ef));
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + disp(c, [['x', -a]]) + ')(' + disp(d, [['x', b]]) + ')</b>.<br>' +
              'Aunque haya un exponente negativo, la regla del producto es la misma: los exponentes se suman.',
            pasos: [
              { seccion: 'Paso 1: los coeficientes',
                queHacemos: 'Multiplicamos solo los numeros.',
                paraQue: 'Numeros con numeros y letras con letras: nunca se mezclan.',
                queda: (c * d) + 'x' + F.sup('?'),
                pregunta: 'Multiplica los coeficientes: ' + c + ' &middot; ' + d,
                resp: R.numero(c * d, { dec: 0 }), pista: 'Solo los numeros.', despues: '' },
              { seccion: 'Paso 2: los exponentes',
                queHacemos: 'Sumamos los exponentes, aunque uno sea negativo.',
                paraQue: 'Que el exponente sea negativo no cambia la regla: al multiplicar bases iguales SIEMPRE se suman.',
                queda: (c * d) + 'x' + F.sup(ef),
                pregunta: 'Suma los exponentes: (&minus;' + a + ') + ' + b,
                resp: R.numero(b - a, { dec: 0 }),
                pista: 'Suma con signo: uno es negativo.',
                despues: (b - a) < 0 ? 'Salio negativo, asi que ese factor se va abajo.' : 'Salio positivo o cero, se queda arriba.' },
              { seccion: 'Paso 3: quitar el negativo',
                queHacemos: 'Si el exponente quedo negativo, bajamos ese factor al denominador.',
                paraQue: 'Un exponente negativo no significa numero negativo: significa que va del otro lado de la raya.',
                queda: mostrar,
                pregunta: 'Escribe el resultado sin exponentes negativos.',
                resp: R.expresion(txt(c * d, [['x', ef]]), { mostrar: mostrar }),
                pista: ef >= 0 ? 'Es ' + disp(c * d, [['x', ef]]) + '.' : 'Como el exponente es negativo, queda ' + F.frac(c * d, 'x' + F.sup(-ef)) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + mostrar + '</b>',
            receta: ['Multiplicar coeficientes',
              'Sumar exponentes aunque alguno sea negativo',
              'Si el exponente final es negativo, el factor baja al denominador']
          });
          enun = 'Escribe sin exponentes negativos: (' + disp(c, [['x', -a]]) + ')(' + disp(d, [['x', b]]) + ')';
          resp = R.expresion(txt(c * d, [['x', ef]]), { mostrar: mostrar });
          pistas = ['Aunque el exponente sea negativo, al multiplicar bases iguales se suman.',
            'Exponente final: &minus;' + a + ' + ' + b + ' = ' + ef + '.'];
          sol = ['Coeficientes: ' + c + ' &middot; ' + d + ' = ' + (c * d),
            'Exponentes: (&minus;' + a + ') + ' + b + ' = ' + ef,
            'Resultado: <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['doblePotencia', 'Cociente elevado a potencias'],
          ['raiz', 'Exponente fraccionario'],
          ['cocientePotencia', 'Fraccion elevada a potencia'],
          ['cientifica', 'Notacion cientifica']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'doblePotencia') {
          vars = ['x', 'y'];
          a = r.entero(2, 4); b = r.entero(1, 3); m = r.entero(2, 3);
          c = r.entero(1, 3); d = r.entero(1, 3); n = r.entero(1, 2);
          var ex = a * m - c * n, ey = b * m - d * n;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac('(' + disp(1, [['x', a], ['y', b]]) + ')' + F.sup(m), '(' + disp(1, [['x', c], ['y', d]]) + ')' + F.sup(n)) + '</b>.<br>' +
              'Hay dos niveles de exponentes. Primero se reparten los de afuera, y hasta el final se divide.',
            pasos: [
              { seccion: 'Paso 1: repartir el exponente de arriba',
                queHacemos: 'Multiplicamos los exponentes de adentro por el de afuera.',
                paraQue: 'Potencia de potencia: primero se resuelven los dos niveles y hasta el final se divide.',
                queda: F.frac('x' + F.sup(a * m) + 'y' + F.sup(b * m), '(' + disp(1, [['x', c], ['y', d]]) + ')' + F.sup(n)),
                pregunta: 'Arriba: (x' + F.sup(a) + 'y' + F.sup(b) + ')' + F.sup(m) + '.<br>&iquest;Que exponente le queda a la x?',
                resp: R.numero(a * m, { dec: 0 }), pista: 'Potencia de potencia: ' + a + ' &middot; ' + m + '.',
                despues: 'Y a la y le toca ' + (b * m) + '. Arriba quedo x' + F.sup(a * m) + 'y' + F.sup(b * m) + '.' },
              { seccion: 'Paso 2: repartir el de abajo',
                queHacemos: 'Lo mismo con el denominador.',
                paraQue: 'Para que arriba y abajo queden sin parentesis y ya se puedan restar los exponentes.',
                queda: F.frac('x' + F.sup(a * m) + 'y' + F.sup(b * m), 'x' + F.sup(c * n) + 'y' + F.sup(d * n)),
                pregunta: 'Abajo: (x' + F.sup(c) + 'y' + F.sup(d) + ')' + F.sup(n) + '.<br>&iquest;Que exponente le queda a la x?',
                resp: R.numero(c * n, { dec: 0 }), pista: c + ' &middot; ' + n + '.',
                despues: 'Y a la y, ' + (d * n) + '.' },
              { seccion: 'Paso 3: dividir',
                queHacemos: 'Restamos los exponentes de la x.',
                paraQue: 'Cada letra se divide por su cuenta: la x con la x y la y con la y.',
                queda: 'x' + F.sup(ex) + 'y' + F.sup('?'),
                pregunta: 'Ahora si, divide: para la x, &iquest;cuanto es ' + (a * m) + ' &minus; ' + (c * n) + '?',
                resp: R.numero(ex, { dec: 0 }), pista: 'Arriba menos abajo.', despues: '' },
              { seccion: 'Paso 3: dividir',
                queHacemos: 'Ahora los de la y.',
                paraQue: 'Para terminar la division.',
                queda: disp(1, [['x', ex], ['y', ey]]),
                pregunta: 'Para la y: ' + (b * m) + ' &minus; ' + (d * n),
                resp: R.numero(ey, { dec: 0 }), pista: 'Lo mismo con la otra letra.', despues: '' },
              { seccion: 'Paso 4: escribir',
                queHacemos: 'Juntamos las dos letras con sus exponentes.',
                paraQue: 'Para dar la respuesta completa.',
                queda: disp(1, [['x', ex], ['y', ey]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(1, [['x', ex], ['y', ey]]), { vars: ['x', 'y'], mostrar: disp(1, [['x', ex], ['y', ey]]) }),
                pista: 'Es ' + disp(1, [['x', ex], ['y', ey]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(1, [['x', ex], ['y', ey]]) + '</b>',
            receta: ['Repartir primero los exponentes de afuera, arriba y abajo',
              'Despues restar los exponentes de cada letra',
              'Nunca mezclar la x con la y']
          });
          enun = 'Simplifica: ' + F.frac('(' + disp(1, [['x', a], ['y', b]]) + ')' + F.sup(m), '(' + disp(1, [['x', c], ['y', d]]) + ')' + F.sup(n));
          resp = R.expresion(txt(1, [['x', ex], ['y', ey]]), { vars: vars, mostrar: disp(1, [['x', ex], ['y', ey]]) });
          pistas = ['Primero distribuye los exponentes de afuera en el numerador y en el denominador.',
            'Arriba: x' + F.sup(a * m) + 'y' + F.sup(b * m) + '. Abajo: x' + F.sup(c * n) + 'y' + F.sup(d * n) + '. Ahora resta exponentes.'];
          sol = ['Numerador: x' + F.sup(a * m) + 'y' + F.sup(b * m),
            'Denominador: x' + F.sup(c * n) + 'y' + F.sup(d * n),
            'Resto exponentes: x' + F.sup(a * m + '&minus;' + c * n) + 'y' + F.sup(b * m + '&minus;' + d * n),
            'Resultado: <b>' + disp(1, [['x', ex], ['y', ey]]) + '</b>'];
        } else if (t3 === 'raiz') {
          vars = ['x', 'y'];
          var k = r.elige([2, 3]);
          c = r.elige([2, 3]); a = r.entero(1, 3); b = r.entero(1, 3);
          var C = Math.pow(c, k);
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + disp(C, [['x', a * k], ['y', b * k]]) + ')' + F.sup(F.frac(1, k)) + '</b>.<br>' +
              'Un exponente 1/' + k + ' es lo mismo que sacar la raiz ' + (k === 2 ? 'cuadrada' : 'cubica') + ': se DIVIDE cada exponente entre ' + k + '.',
            pasos: [
              { seccion: 'Paso 1: el coeficiente',
                queHacemos: 'Sacamos la raiz del numero.',
                paraQue: 'Un exponente 1/' + k + ' es exactamente una raiz: se reparte a cada factor, igual que cualquier otro exponente.',
                queda: c + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'El coeficiente: &iquest;cual es la raiz ' + (k === 2 ? 'cuadrada' : 'cubica') + ' de ' + C + '?',
                resp: R.numero(c, { dec: 0 }),
                pista: 'Busca el numero que elevado a ' + k + ' da ' + C + '.', despues: '' },
              { seccion: 'Paso 2: la x',
                queHacemos: 'Dividimos el exponente de la x entre ' + k + '.',
                paraQue: 'Potencia de potencia: ' + (a * k) + ' por 1/' + k + ' es dividir entre ' + k + '.',
                queda: c + 'x' + F.sup(a) + 'y' + F.sup('?'),
                pregunta: 'La x: x' + F.sup(a * k) + ' elevada a 1/' + k + '.<br>&iquest;Que exponente queda?',
                resp: R.numero(a, { dec: 0 }), pista: 'Divide: ' + (a * k) + ' entre ' + k + '.', despues: '' },
              { seccion: 'Paso 3: la y',
                queHacemos: 'Lo mismo con la y.',
                paraQue: 'Cada letra por separado.',
                queda: disp(c, [['x', a], ['y', b]]),
                pregunta: 'La y: y' + F.sup(b * k) + ' da que exponente?',
                resp: R.numero(b, { dec: 0 }), pista: (b * k) + ' entre ' + k + '.', despues: 'Ya estan las tres partes.' },
              { seccion: 'Paso 4: escribir',
                queHacemos: 'Juntamos las tres partes.',
                paraQue: 'Para dar la respuesta completa.',
                queda: disp(c, [['x', a], ['y', b]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(c, [['x', a], ['y', b]]), { vars: ['x', 'y'], mostrar: disp(c, [['x', a], ['y', b]]) }),
                pista: 'Es ' + disp(c, [['x', a], ['y', b]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>',
            receta: ['Exponente 1/n es la raiz n-esima',
              'Se le aplica al coeficiente y a cada letra',
              'Los exponentes se DIVIDEN entre n']
          });
          enun = 'Simplifica: (' + disp(C, [['x', a * k], ['y', b * k]]) + ')' + F.sup(F.frac(1, k));
          resp = R.expresion(txt(c, [['x', a], ['y', b]]), { vars: vars, mostrar: disp(c, [['x', a], ['y', b]]) });
          pistas = ['Un exponente 1/' + k + ' es la raiz ' + (k === 2 ? 'cuadrada' : 'cubica') + ': divide cada exponente entre ' + k + '.',
            C + F.sup(F.frac(1, k)) + ' = ' + c + ' porque ' + c + F.sup(k) + ' = ' + C + '.'];
          sol = ['a<sup>m/n</sup> = <sup>n</sup>&radic;<span class="rad">a<sup>m</sup></span>: reparto el exponente 1/' + k + ' a cada factor.',
            C + F.sup(F.frac(1, k)) + ' = ' + c,
            'x' + F.sup(a * k) + ' &rarr; x' + F.sup(a) + ', y' + F.sup(b * k) + ' &rarr; y' + F.sup(b),
            'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>'];
        } else {
          c = r.elige([2, 3, 4, 5]); d = r.elige([2, 3]); n = r.entero(2, 3);
          a = r.entero(3, 6); b = r.entero(1, 2);
          var cc = Math.pow(c, n), dd = Math.pow(d, n), s2 = F.simplifica(cc, dd);
          var ex2 = (a - b) * n;
          guiaDelPaso = G({
            intro: 'Vamos con <b>(' + F.frac(disp(c, [['x', a]]), disp(d, [['x', b]])) + ')' + F.sup(n) + '</b>.<br>' +
              'Conviene simplificar primero lo de ADENTRO del parentesis y despues elevar.',
            pasos: [
              { seccion: 'Paso 1: simplificar adentro',
                queHacemos: 'Primero simplificamos lo de dentro del parentesis.',
                paraQue: 'Elevar algo ya simplificado es mucho mas facil que elevar y luego simplificar.',
                queda: '(' + F.frac(c, d) + 'x' + F.sup(a - b) + ')' + F.sup(n),
                pregunta: 'Dentro del parentesis los exponentes de x se restan.<br>&iquest;Cuanto es ' + a + ' &minus; ' + b + '?',
                resp: R.numero(a - b, { dec: 0 }), pista: 'Arriba menos abajo.',
                despues: 'Adentro quedo ' + F.frac(c, d) + 'x' + F.sup(a - b) + '.' },
              { seccion: 'Paso 2: elevar',
                queHacemos: 'Elevamos el numerador al exponente de afuera.',
                paraQue: 'El exponente le cae a todo: al de arriba, al de abajo y a la letra.',
                queda: F.frac(cc, '?') + ' x' + F.sup('?'),
                pregunta: 'Ahora eleva a la ' + n + '. El numerador: &iquest;cuanto es ' + c + F.sup(n) + '?',
                resp: R.numero(cc, { dec: 0 }), pista: c + ' multiplicado por si mismo ' + n + ' veces.', despues: '' },
              { seccion: 'Paso 2: elevar',
                queHacemos: 'Ahora el denominador.',
                paraQue: 'Si solo elevas arriba, la fraccion cambia de valor.',
                queda: F.frac(cc, dd) + ' x' + F.sup('?'),
                pregunta: 'Y el denominador: ' + d + F.sup(n),
                resp: R.numero(dd, { dec: 0 }), pista: d + ' elevado a ' + n + '.', despues: '' },
              { seccion: 'Paso 2: elevar',
                queHacemos: 'Multiplicamos el exponente de la x por el de afuera.',
                paraQue: 'Potencia de potencia, igual que siempre.',
                queda: F.frac(cc, dd) + ' x' + F.sup(ex2),
                pregunta: 'El exponente de la x tambien se multiplica: ' + (a - b) + ' &middot; ' + n,
                resp: R.numero(ex2, { dec: 0 }), pista: 'Potencia de potencia.', despues: '' },
              { seccion: 'Paso 3: simplificar',
                queHacemos: 'Simplificamos la fraccion que quedo.',
                paraQue: 'Una fraccion sin simplificar no esta terminada.',
                queda: (s2[1] === 1 ? disp(s2[0], [['x', ex2]]) : F.frac(s2[0], s2[1]) + ' x' + F.sup(ex2)),
                pregunta: 'Escribe el resultado, con la fraccion ya simplificada.',
                resp: R.expresion('(' + s2[0] + '/' + s2[1] + ')*x^(' + ex2 + ')', {
                  mostrar: (s2[1] === 1 ? disp(s2[0], [['x', ex2]]) : F.frac(s2[0], s2[1]) + ' x' + F.sup(ex2))
                }),
                pista: F.mcd(cc, dd) > 1 ? 'La fraccion ' + cc + '/' + dd + ' se simplifica entre ' + F.mcd(cc, dd) + '.' : 'La fraccion ya estaba simplificada.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + (s2[1] === 1 ? disp(s2[0], [['x', ex2]]) : F.frac(s2[0], s2[1]) + ' x' + F.sup(ex2)) + '</b>',
            receta: ['Simplificar primero adentro del parentesis',
              'Elevar numerador y denominador por separado',
              'Multiplicar el exponente de la letra']
          });
          enun = 'Simplifica: (' + F.frac(disp(c, [['x', a]]), disp(d, [['x', b]])) + ')' + F.sup(n);
          resp = R.expresion('(' + s2[0] + '/' + s2[1] + ')*x^(' + ex2 + ')', {
            mostrar: (s2[1] === 1 ? disp(s2[0], [['x', ex2]]) : F.frac(s2[0], s2[1]) + ' x' + F.sup(ex2))
          });
          pistas = ['Simplifica primero lo de adentro del parentesis.',
            'Adentro queda ' + F.frac(c, d) + ' x' + F.sup(a - b) + '; ahora eleva todo a la ' + n + '.'];
          sol = ['Dentro del parentesis: ' + F.frac(c, d) + 'x' + F.sup(a - b),
            'Elevo a la ' + n + ': coeficiente (' + c + '/' + d + ')' + F.sup(n) + ' = ' + F.frac(cc, dd) + ', exponente ' + (a - b) + ' &middot; ' + n + ' = ' + ex2,
            'Resultado: <b>' + (s2[1] === 1 ? disp(s2[0], [['x', ex2]]) : F.frac(s2[0], s2[1]) + ' x' + F.sup(ex2)) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
