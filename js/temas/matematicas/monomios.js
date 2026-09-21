/* Monomios */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function disp(c, vs) {
    var cuerpo = vs.filter(function (v) { return v[1] !== 0; })
      .map(function (v) { return v[1] === 1 ? v[0] : v[0] + F.sup(v[1]); }).join('');
    if (cuerpo === '') return F.n(c);
    if (c === 1) return cuerpo;
    if (c === -1) return '-' + cuerpo;
    return F.n(c) + cuerpo;
  }
  function txt(c, vs) {
    return '(' + c + ')' + vs.map(function (v) { return '*' + v[0] + '^(' + v[1] + ')'; }).join('');
  }
  function par(s) { return '(' + s + ')'; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.valorNumerico = function (r) {
    var c = r.enteroNoCero(-6, 6), a = r.entero(1, 3), b = r.entero(1, 2);
    var x = r.enteroNoCero(-4, 4), y = r.enteroNoCero(-4, 4);
    var val = c * Math.pow(x, a) * Math.pow(y, b);
    return {
      guia: G({
        intro: 'Queremos el valor de <b>' + disp(c, [['x', a], ['y', b]]) + '</b> cuando <b>x = ' + x + '</b> y <b>y = ' + y + '</b>.<br>' +
          'Se sustituye cada letra por su valor. El detalle importante: SIEMPRE entre parentesis, sobre todo si es negativo.',
        pasos: [
          { seccion: 'Paso 1: las potencias',
            queHacemos: 'Sustituimos y calculamos la potencia de la x.',
            paraQue: 'Las potencias van primero. Y siempre entre parentesis, sobre todo si el numero es negativo.',
            queda: c + ' &middot; ' + Math.pow(x, a) + ' &middot; ?',
            pregunta: 'Calcula la potencia de la x: &iquest;cuanto es (' + x + ')' + F.sup(a) + '?',
            resp: R.numero(Math.pow(x, a), { dec: 0 }),
            pista: x < 0 ? 'Base negativa con exponente ' + (a % 2 === 0 ? 'par: sale positivo' : 'impar: sale negativo') + '.' : 'Multiplica ' + x + ' por si mismo ' + a + ' veces.',
            despues: '' },
          { seccion: 'Paso 1: las potencias',
            queHacemos: 'Ahora la de la y.',
            paraQue: 'Mismo cuidado con el signo.',
            queda: c + ' &middot; ' + Math.pow(x, a) + ' &middot; ' + Math.pow(y, b),
            pregunta: 'Ahora la de la y: (' + y + ')' + F.sup(b),
            resp: R.numero(Math.pow(y, b), { dec: 0 }),
            pista: y < 0 ? 'Otra vez ojo con el signo: exponente ' + (b % 2 === 0 ? 'par da positivo' : 'impar da negativo') + '.' : 'Igual que antes.',
            despues: 'Ya solo falta multiplicar todo junto.' },
          { seccion: 'Paso 2: multiplicar',
            queHacemos: 'Multiplicamos todo junto.',
            paraQue: 'Para llegar al valor numerico.',
            queda: String(val),
            pregunta: 'Multiplica: ' + c + ' &middot; ' + Math.pow(x, a) + ' &middot; ' + Math.pow(y, b),
            resp: R.numero(val, { dec: 0 }), pista: 'De dos en dos, cuidando los signos.', despues: '' }
        ],
        final: 'El valor numerico es <b>' + val + '</b>',
        receta: ['Sustituir cada letra por su valor, entre parentesis',
          'Resolver primero las potencias',
          'Multiplicar al final']
      }),
      enunciado: 'Calcula el valor numerico de ' + disp(c, [['x', a], ['y', b]]) + '<br>cuando x = ' + x + ' y y = ' + y + '.',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Sustituye cada letra por su valor y respeta los parentesis en los negativos.',
        '(' + x + ')' + F.sup(a) + ' = ' + Math.pow(x, a) + ' y (' + y + ')' + F.sup(b) + ' = ' + Math.pow(y, b) + '.'],
      solucion: ['Sustituyo: ' + c + '(' + x + ')' + F.sup(a) + '(' + y + ')' + F.sup(b),
        '= ' + c + ' &middot; ' + Math.pow(x, a) + ' &middot; ' + Math.pow(y, b),
        'Resultado: <b>' + val + '</b>']
    };
  };

  extra.raizMonomio = function (r) {
    var c = r.elige([2, 3, 4, 5, 6, 7]);
    var a = r.entero(1, 4), b = r.entero(1, 3);
    return {
      guia: G({
        intro: 'Vamos con <b>&radic;<span class="rad">' + disp(c * c, [['x', 2 * a], ['y', 2 * b]]) + '</span></b>.<br>' +
          'Sacar raiz cuadrada es preguntarse: &iquest;que tengo que multiplicar por si mismo para obtener esto? Se hace parte por parte.',
        pasos: [
          { seccion: 'Paso 1: el numero',
            queHacemos: 'Sacamos la raiz cuadrada del coeficiente.',
            paraQue: 'Sacar raiz es preguntarse: que multiplicado por si mismo da esto. Se hace parte por parte.',
            queda: c + 'x' + F.sup('?') + 'y' + F.sup('?'),
            pregunta: 'El numero: &iquest;cual es la raiz cuadrada de ' + (c * c) + '?',
            resp: R.numero(c, { dec: 0 }),
            pista: 'Busca el numero que multiplicado por si mismo da ' + (c * c) + '.',
            despues: 'Porque ' + c + ' &middot; ' + c + ' = ' + (c * c) + '.' },
          { seccion: 'Paso 2: la x',
            queHacemos: 'Dividimos el exponente de la x entre 2.',
            paraQue: 'Sacar raiz cuadrada es DIVIDIR el exponente entre 2, al reves de elevar al cuadrado.',
            queda: c + 'x' + F.sup(a) + 'y' + F.sup('?'),
            pregunta: 'La x: la raiz de x' + F.sup(2 * a) + '.<br>&iquest;Que exponente queda?',
            resp: R.numero(a, { dec: 0 }),
            pista: 'Sacar raiz cuadrada es DIVIDIR el exponente entre 2: ' + (2 * a) + ' &divide; 2.',
            despues: 'Compruebalo: x' + F.sup(a) + ' &middot; x' + F.sup(a) + ' = x' + F.sup(2 * a) + '.' },
          { seccion: 'Paso 3: la y',
            queHacemos: 'Lo mismo con la y.',
            paraQue: 'Cada letra por separado.',
            queda: disp(c, [['x', a], ['y', b]]),
            pregunta: 'La y: raiz de y' + F.sup(2 * b) + ' &rarr; &iquest;que exponente?',
            resp: R.numero(b, { dec: 0 }), pista: (2 * b) + ' &divide; 2.', despues: '' },
          { seccion: 'Paso 4: escribir',
            queHacemos: 'Escribimos el monomio completo.',
            paraQue: 'Se puede comprobar elevandolo al cuadrado: debe volver al original.',
            queda: disp(c, [['x', a], ['y', b]]),
            pregunta: 'Escribe el monomio completo.',
            resp: R.expresion(txt(c, [['x', a], ['y', b]]), { vars: ['x', 'y'], mostrar: disp(c, [['x', a], ['y', b]]) }),
            pista: 'Es ' + disp(c, [['x', a], ['y', b]]) + '.', despues: '' }
        ],
        final: 'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>',
        receta: ['Raiz cuadrada del coeficiente',
          'Dividir entre 2 el exponente de cada letra',
          'Se puede comprobar elevando al cuadrado el resultado']
      }),
      enunciado: 'Simplifica: &radic;<span class="rad">' + disp(c * c, [['x', 2 * a], ['y', 2 * b]]) + '</span>',
      respuesta: R.expresion(txt(c, [['x', a], ['y', b]]), {
        vars: ['x', 'y'], mostrar: disp(c, [['x', a], ['y', b]])
      }),
      pistas: ['La raiz cuadrada de un monomio: raiz del coeficiente y exponentes a la mitad.',
        '&radic;<span class="rad">' + (c * c) + '</span> = ' + c + ', y los exponentes ' + (2 * a) + ' y ' + (2 * b) + ' se dividen entre 2.'],
      solucion: ['Coeficiente: &radic;<span class="rad">' + (c * c) + '</span> = ' + c,
        'Exponentes: ' + (2 * a) + ' &divide; 2 = ' + a + ' y ' + (2 * b) + ' &divide; 2 = ' + b,
        'Resultado: <b>' + disp(c, [['x', a], ['y', b]]) + '</b>']
    };
  };

  EJ.tema({
    id: 'monomios',
    materia: 'matematicas',
    grupo: 'Algebra',
    nombre: 'Monomios',
    descripcion: 'Producto, cociente, potencia, terminos semejantes y grado de un monomio.',
    formulario: 'Producto: se multiplican coeficientes y se suman exponentes.<br>' +
      'Cociente: se dividen coeficientes y se restan exponentes.<br>' +
      'Grado de un monomio = suma de los exponentes de sus variables. Solo se suman terminos semejantes.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, c1, c2, a1, a2, b1, b2, vars = ['x', 'y'];

      if (dif === 'facil') {
        var t = r.subtema([
          ['producto', 'Producto de monomios'],
          ['cociente', 'Division de monomios'],
          ['grado', 'Grado de un monomio'],
          ['valorNumerico', 'Valor numerico']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'producto') {
          c1 = r.enteroNoCero(-6, 6); c2 = r.enteroNoCero(-6, 6);
          a1 = r.entero(1, 4); a2 = r.entero(1, 4); b1 = r.entero(0, 3); b2 = r.entero(0, 3);
          guiaDelPaso = EJ.guia.productoMonomios(c1, a1, b1, c2, a2, b2);
          enun = 'Multiplica: ' + par(disp(c1, [['x', a1], ['y', b1]])) + par(disp(c2, [['x', a2], ['y', b2]]));
          resp = R.expresion(txt(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]]), {
            vars: vars, mostrar: disp(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]])
          });
          pistas = ['Multiplica los coeficientes y suma los exponentes de cada variable.',
            'Coeficiente: ' + c1 + ' &middot; ' + c2 + ' = ' + (c1 * c2) + '.'];
          sol = ['Coeficientes: ' + c1 + ' &middot; ' + c2 + ' = ' + (c1 * c2),
            'Exponentes de x: ' + a1 + ' + ' + a2 + ' = ' + (a1 + a2) + '; de y: ' + b1 + ' + ' + b2 + ' = ' + (b1 + b2),
            'Resultado: <b>' + disp(c1 * c2, [['x', a1 + a2], ['y', b1 + b2]]) + '</b>'];
        } else if (t === 'cociente') {
          c2 = r.elige([2, 3, 4, 5]); var k = r.enteroNoCero(-6, 6);
          c1 = c2 * k;
          a2 = r.entero(1, 3); a1 = a2 + r.entero(1, 3);
          b2 = r.entero(0, 2); b1 = b2 + r.entero(0, 3);
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac(disp(c1, [['x', a1], ['y', b1]]), disp(c2, [['x', a2], ['y', b2]])) + '</b>.<br>' +
              'Dividir monomios es por partes: los numeros se dividen y cada letra se resuelve por su lado restando exponentes.',
            pasos: [
              { seccion: 'Paso 1: los coeficientes',
                queHacemos: 'Dividimos solo los numeros.',
                paraQue: 'Numeros con numeros y letras con letras.',
                queda: k + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'Empieza por los numeros: &iquest;cuanto es ' + c1 + ' &divide; ' + c2 + '?',
                resp: R.numero(k, { dec: 0 }),
                pista: 'Division exacta. Ojo con el signo si alguno es negativo.',
                despues: 'Ese es el coeficiente del resultado.' },
              { seccion: 'Paso 2: la x',
                queHacemos: 'Restamos los exponentes de la x.',
                paraQue: 'Dividiendose se RESTAN: las equis de arriba se van cancelando con las de abajo.',
                queda: k + 'x' + F.sup(a1 - a2) + 'y' + F.sup('?'),
                pregunta: 'Ahora la x: x' + F.sup(a1) + ' entre x' + F.sup(a2) + '.<br>&iquest;Que exponente queda?',
                resp: R.numero(a1 - a2, { dec: 0 }),
                pista: 'Dividiendose se RESTAN: ' + a1 + ' &minus; ' + a2 + '. (Arriba hay ' + a1 + ' equis y abajo ' + a2 + ', se van cancelando.)',
                despues: '' },
              { seccion: 'Paso 3: la y',
                queHacemos: 'Lo mismo con la y.',
                paraQue: 'Si el exponente da 0, esa letra desaparece (vale 1).',
                queda: disp(k, [['x', a1 - a2], ['y', b1 - b2]]),
                pregunta: 'Y la y: y' + F.sup(b1) + ' entre y' + F.sup(b2) + '.<br>&iquest;Que exponente queda?',
                resp: R.numero(b1 - b2, { dec: 0 }),
                pista: b1 - b2 === 0 ? 'Cuidado: si da 0, recuerda que y' + F.sup(0) + ' = 1 y la letra desaparece.' : 'Otra vez: ' + b1 + ' &minus; ' + b2 + '.',
                despues: 'Cada letra se trabaja por separado, nunca se mezclan.' },
              { seccion: 'Paso 4: juntar',
                queHacemos: 'Escribimos el monomio completo.',
                paraQue: 'Para dar la respuesta.',
                queda: disp(k, [['x', a1 - a2], ['y', b1 - b2]]),
                pregunta: 'Escribe el monomio completo.',
                resp: R.expresion(txt(k, [['x', a1 - a2], ['y', b1 - b2]]), { vars: ['x', 'y'], mostrar: disp(k, [['x', a1 - a2], ['y', b1 - b2]]) }),
                pista: 'Es ' + disp(k, [['x', a1 - a2], ['y', b1 - b2]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(k, [['x', a1 - a2], ['y', b1 - b2]]) + '</b>',
            receta: ['Dividir los coeficientes',
              'Restar los exponentes de cada letra por separado',
              'Exponente 0 significa que la letra desaparece (vale 1)']
          });
          enun = 'Divide: ' + F.frac(disp(c1, [['x', a1], ['y', b1]]), disp(c2, [['x', a2], ['y', b2]]));
          resp = R.expresion(txt(k, [['x', a1 - a2], ['y', b1 - b2]]), {
            vars: vars, mostrar: disp(k, [['x', a1 - a2], ['y', b1 - b2]])
          });
          pistas = ['Divide los coeficientes y resta los exponentes.',
            'Coeficiente: ' + c1 + ' &divide; ' + c2 + ' = ' + k + '.'];
          sol = ['Coeficientes: ' + c1 + ' &divide; ' + c2 + ' = ' + k,
            'Exponentes: x' + F.sup(a1 + '&minus;' + a2) + ' = x' + F.sup(a1 - a2) + ', y' + F.sup(b1 + '&minus;' + b2) + ' = y' + F.sup(b1 - b2),
            'Resultado: <b>' + disp(k, [['x', a1 - a2], ['y', b1 - b2]]) + '</b>'];
        } else {
          c1 = r.enteroNoCero(-9, 9); a1 = r.entero(1, 5); b1 = r.entero(1, 4);
          var z1 = r.entero(0, 3);
          var vs = [['x', a1], ['y', b1], ['z', z1]];
          guiaDelPaso = G({
            intro: 'Nos preguntan el grado de <b>' + disp(c1, vs) + '</b>.<br>' +
              'El grado de un monomio es la SUMA de los exponentes de todas sus letras. El coeficiente no cuenta.',
            pasos: [
              { seccion: 'Paso 1: leer los exponentes',
                queHacemos: 'Anotamos el exponente de cada letra.',
                paraQue: 'El grado de un monomio es la SUMA de los exponentes de sus letras. El coeficiente no cuenta.',
                queda: 'grado = ' + a1 + ' + ? ' + (z1 ? '+ ?' : ''),
                pregunta: '&iquest;Que exponente tiene la x?',
                resp: R.numero(a1, { dec: 0 }),
                pista: a1 === 1 ? 'Cuando no se ve ningun exponente, es 1.' : 'Mira el numerito de arriba.',
                despues: '' },
              { seccion: 'Paso 1: leer los exponentes',
                queHacemos: 'Anotamos el exponente de cada letra.',
                paraQue: 'El grado de un monomio es la SUMA de los exponentes de sus letras. El coeficiente no cuenta.',
                queda: 'grado = ' + a1 + ' + ' + b1 + (z1 ? ' + ?' : ''),
                pregunta: '&iquest;Y el de la y?',
                resp: R.numero(b1, { dec: 0 }), pista: b1 === 1 ? 'Sin exponente visible significa 1.' : 'El numerito de arriba de la y.',
                despues: z1 ? 'Todavia falta la z.' : 'Ya estan todos.' },
              z1 ? { seccion: 'Paso 1: leer los exponentes',
                     queHacemos: 'Anotamos el exponente de cada letra.',
                     paraQue: 'El grado de un monomio es la SUMA de los exponentes de sus letras.',
                     queda: 'grado = ' + a1 + ' + ' + b1 + ' + ' + z1,
                     pregunta: '&iquest;Y el de la z?', resp: R.numero(z1, { dec: 0 }),
                pista: z1 === 1 ? 'Sin exponente visible es 1.' : 'El de la z.', despues: '' }
                : { seccion: 'Paso 2: que no cuenta',
                    queHacemos: 'Decidimos si el coeficiente entra en la cuenta.',
                    paraQue: 'El grado habla de las LETRAS, no del numero que las acompana.',
                    queda: 'grado = ' + a1 + ' + ' + b1,
                    pregunta: '&iquest;El coeficiente ' + c1 + ' cuenta para el grado?',
                  resp: R.opcion(['No, solo cuentan las letras', 'Si, se suma tambien'], 0),
                  pista: 'El grado habla de las letras, no del numero que las acompaña.', despues: '' },
              { seccion: 'Paso 3: sumar',
                queHacemos: 'Sumamos todos los exponentes.',
                paraQue: 'Esa suma es el grado.',
                queda: 'grado = ' + (a1 + b1 + z1),
                pregunta: 'Suma esos exponentes: &iquest;cual es el grado?',
                resp: R.numero(a1 + b1 + z1, { dec: 0 }),
                pista: a1 + ' + ' + b1 + (z1 ? ' + ' + z1 : ''), despues: '' }
            ],
            final: 'El grado de ' + disp(c1, vs) + ' es <b>' + (a1 + b1 + z1) + '</b>',
            receta: ['Ver el exponente de cada letra',
              'Si no se ve exponente, es 1',
              'Sumarlos todos; el coeficiente no cuenta']
          });
          enun = '&iquest;Cual es el grado del monomio ' + disp(c1, vs) + '?';
          resp = R.numero(a1 + b1 + z1, { dec: 0 });
          pistas = ['El grado de un monomio es la suma de los exponentes de todas sus variables.',
            'Suma ' + a1 + ' + ' + b1 + (z1 ? ' + ' + z1 : '') + '.'];
          sol = ['Exponentes: x&rarr;' + a1 + ', y&rarr;' + b1 + (z1 ? ', z&rarr;' + z1 : ''),
            'Grado = <b>' + (a1 + b1 + z1) + '</b> (el coeficiente no cuenta)'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['potencia', 'Potencia de un monomio'],
          ['semejantes', 'Terminos semejantes'],
          ['tresVars', 'Cociente con tres variables'],
          ['raizMonomio', 'Raiz de un monomio'],
          ['valorNumerico', 'Valor numerico']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'potencia') {
          c1 = r.enteroNoCero(-4, 4); a1 = r.entero(1, 4); b1 = r.entero(1, 3);
          var n = r.entero(2, 3);
          var C = Math.pow(c1, n);
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + par(disp(c1, [['x', a1], ['y', b1]])) + F.sup(n) + '</b>.<br>' +
              'El exponente de afuera le cae a TODO lo de adentro: al numero y a cada letra. Es el error mas comun elevar solo las letras.',
            pasos: [
              { seccion: 'Paso 1: el coeficiente',
                queHacemos: 'Elevamos el numero al exponente de afuera.',
                paraQue: 'El exponente de afuera le cae a TODO lo de adentro, empezando por el numero. Elevar solo las letras es el error tipico.',
                queda: C + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'Primero el coeficiente: &iquest;cuanto es (' + c1 + ')' + F.sup(n) + '?',
                resp: R.numero(C, { dec: 0 }),
                pista: c1 < 0 ? 'Base negativa: exponente ' + (n % 2 === 0 ? 'par da positivo' : 'impar da negativo') + '.' : 'Multiplica ' + c1 + ' por si mismo ' + n + ' veces.',
                despues: '' },
              { seccion: 'Paso 2: la x',
                queHacemos: 'Multiplicamos el exponente de la x por el de afuera.',
                paraQue: 'Potencia de potencia: se MULTIPLICAN, no se suman.',
                queda: C + 'x' + F.sup(a1 * n) + 'y' + F.sup('?'),
                pregunta: 'La x: (x' + F.sup(a1) + ')' + F.sup(n) + ' &rarr; &iquest;que exponente queda?',
                resp: R.numero(a1 * n, { dec: 0 }),
                pista: 'Potencia de potencia: se MULTIPLICAN, ' + a1 + ' &middot; ' + n + '. (No se suman.)',
                despues: '' },
              { seccion: 'Paso 3: la y',
                queHacemos: 'Lo mismo con la y.',
                paraQue: 'Cada letra por separado.',
                queda: disp(C, [['x', a1 * n], ['y', b1 * n]]),
                pregunta: 'La y: (y' + F.sup(b1) + ')' + F.sup(n) + ' &rarr; &iquest;que exponente?',
                resp: R.numero(b1 * n, { dec: 0 }), pista: b1 + ' &middot; ' + n + '.', despues: 'Ya estan las tres partes.' },
              { seccion: 'Paso 4: juntar',
                queHacemos: 'Escribimos el monomio completo.',
                paraQue: 'Para dar la respuesta.',
                queda: disp(C, [['x', a1 * n], ['y', b1 * n]]),
                pregunta: 'Escribe el monomio completo.',
                resp: R.expresion(txt(C, [['x', a1 * n], ['y', b1 * n]]), { vars: ['x', 'y'], mostrar: disp(C, [['x', a1 * n], ['y', b1 * n]]) }),
                pista: 'Es ' + disp(C, [['x', a1 * n], ['y', b1 * n]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(C, [['x', a1 * n], ['y', b1 * n]]) + '</b>',
            receta: ['El exponente de afuera le toca al coeficiente Y a cada letra',
              'El coeficiente se eleva de verdad (no se multiplica)',
              'Los exponentes de las letras se multiplican']
          });
          enun = 'Desarrolla: ' + par(disp(c1, [['x', a1], ['y', b1]])) + F.sup(n);
          resp = R.expresion(txt(C, [['x', a1 * n], ['y', b1 * n]]), {
            vars: vars, mostrar: disp(C, [['x', a1 * n], ['y', b1 * n]])
          });
          pistas = ['El exponente de afuera afecta al coeficiente y a cada variable.',
            '(' + c1 + ')' + F.sup(n) + ' = ' + C + '.'];
          sol = ['Coeficiente: (' + c1 + ')' + F.sup(n) + ' = ' + C,
            'Variables: x' + F.sup(a1) + ' &rarr; x' + F.sup(a1 * n) + ', y' + F.sup(b1) + ' &rarr; y' + F.sup(b1 * n),
            'Resultado: <b>' + disp(C, [['x', a1 * n], ['y', b1 * n]]) + '</b>'];
        } else if (t2 === 'semejantes') {
          a1 = r.entero(1, 3); b1 = r.entero(1, 3);
          var k1 = r.enteroNoCero(-9, 9), k2 = r.enteroNoCero(-9, 9), k3 = r.enteroNoCero(-9, 9);
          var otroTermino = r.enteroNoCero(-5, 5);
          var ea = r.enteroExcepto(1, 4, [a1]);
          var total = k1 + k2 + k3;
          guiaDelPaso = G({
            intro: 'Hay que reducir terminos semejantes.<br>' +
              'Solo se pueden juntar los terminos que tienen EXACTAMENTE las mismas letras con los mismos exponentes. Es como sumar peras con peras.',
            pasos: [
              { seccion: 'Paso 1: ver cuales son semejantes',
                queHacemos: 'Revisamos que terminos tienen EXACTAMENTE la misma parte de letras.',
                paraQue: 'Solo se pueden juntar los semejantes. Es como sumar peras con peras: si cambia una letra o un exponente, ya no se puede.',
                queda: '3 semejantes + 1 suelto',
                pregunta: 'Mira los cuatro terminos. &iquest;Cuantos tienen la parte literal x' + F.sup(a1) + 'y' + F.sup(b1) + '?',
                resp: R.numero(3, { dec: 0 }),
                pista: 'Compara letra por letra y exponente por exponente. Hay uno que no cuadra: ' + disp(otroTermino, [['x', ea], ['y', b1]]) + '.',
                despues: 'Esos tres se pueden juntar; el otro se queda solo.' },
              { seccion: 'Paso 2: sumar los coeficientes',
                queHacemos: 'Sumamos solo los numeros de los terminos semejantes.',
                paraQue: 'La parte de las letras no se toca: 2x + 3x son 5x, no 5x&sup2;.',
                queda: disp(total, [['x', a1], ['y', b1]]) + ' + ?',
                pregunta: 'Suma los coeficientes de esos tres: ' + k1 + ' + (' + k2 + ') + (' + k3 + ')',
                resp: R.numero(total, { dec: 0 }),
                pista: 'Solo los numeros. La parte de las letras no se toca.',
                despues: 'Queda ' + disp(total, [['x', a1], ['y', b1]]) + '.' },
              { seccion: 'Paso 3: el que sobra',
                queHacemos: 'Decidimos que hacer con el termino que no es semejante.',
                paraQue: 'Lo que no es semejante se queda tal cual: no se puede juntar con nada.',
                queda: F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]),
                pregunta: '&iquest;Que pasa con ' + disp(otroTermino, [['x', ea], ['y', b1]]) + '?',
                resp: R.opcion(['Se queda tal cual, no es semejante', 'Se suma tambien'], 0),
                pista: 'Tiene x' + F.sup(ea) + ' en vez de x' + F.sup(a1) + ': no son semejantes, no se pueden juntar.',
                despues: '' },
              { seccion: 'Paso 4: escribir',
                queHacemos: 'Escribimos los terminos que quedaron.',
                paraQue: 'Para dar la respuesta reducida.',
                queda: F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]),
                pregunta: 'Escribe la expresion reducida completa.',
                resp: R.expresion(txt(total, [['x', a1], ['y', b1]]) + '+' + txt(otroTermino, [['x', ea], ['y', b1]]),
                  { vars: ['x', 'y'], mostrar: F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]) }),
                pista: 'Son los dos terminos que quedaron: ' + F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]) + '.',
                despues: '' }
            ],
            final: 'Resultado: <b>' + F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]) + '</b>',
            receta: ['Semejantes = mismas letras con los mismos exponentes',
              'Solo se suman los coeficientes',
              'La parte de las letras no cambia',
              'Lo que no es semejante se queda igual']
          });
          enun = 'Reduce terminos semejantes:<br>' + disp(k1, [['x', a1], ['y', b1]]) + ' + ' +
            par(disp(k2, [['x', a1], ['y', b1]])) + ' + ' + par(disp(otroTermino, [['x', ea], ['y', b1]])) + ' + ' +
            par(disp(k3, [['x', a1], ['y', b1]]));
          resp = R.expresion(txt(total, [['x', a1], ['y', b1]]) + '+' + txt(otroTermino, [['x', ea], ['y', b1]]), {
            vars: vars,
            mostrar: F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])])
          });
          pistas = ['Solo se pueden sumar los terminos que tienen exactamente las mismas variables con los mismos exponentes.',
            'Hay tres terminos con x' + F.sup(a1) + 'y' + F.sup(b1) + ' y uno distinto que se queda solo.'];
          sol = ['Terminos semejantes (x' + F.sup(a1) + 'y' + F.sup(b1) + '): ' + k1 + ' + (' + k2 + ') + (' + k3 + ') = ' + total,
            'El termino ' + disp(otroTermino, [['x', ea], ['y', b1]]) + ' no es semejante, se queda igual',
            'Resultado: <b>' + F.une([disp(total, [['x', a1], ['y', b1]]), disp(otroTermino, [['x', ea], ['y', b1]])]) + '</b>'];
        } else {
          vars = ['x', 'y', 'z'];
          c2 = r.elige([2, 3, 4]); var kk = r.enteroNoCero(-5, 5);
          c1 = c2 * kk;
          var e1 = [r.entero(2, 5), r.entero(1, 4), r.entero(1, 3)];
          var e2 = [r.entero(1, e1[0]), r.entero(0, e1[1]), r.entero(0, e1[2])];
          var vv1 = [['x', e1[0]], ['y', e1[1]], ['z', e1[2]]];
          var vv2 = [['x', e2[0]], ['y', e2[1]], ['z', e2[2]]];
          var vvr = [['x', e1[0] - e2[0]], ['y', e1[1] - e2[1]], ['z', e1[2] - e2[2]]];
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac(disp(c1, vv1), disp(c2, vv2)) + '</b>.<br>' +
              'Son tres letras, pero no cambia nada: cada una se resuelve por su cuenta.',
            pasos: [
              { seccion: 'Paso 1: los coeficientes',
                queHacemos: 'Dividimos los numeros.',
                paraQue: 'Que haya tres letras no cambia nada: los numeros siguen yendo por su lado.',
                queda: kk + 'x' + F.sup('?') + 'y' + F.sup('?') + 'z' + F.sup('?'),
                pregunta: 'Los coeficientes primero: ' + c1 + ' &divide; ' + c2,
                resp: R.numero(kk, { dec: 0 }), pista: 'Ojo con el signo.', despues: '' },
              { seccion: 'Paso 2: cada letra',
                queHacemos: 'Restamos los exponentes de la x.',
                paraQue: 'Cada letra se resuelve por su cuenta; nunca se mezclan entre ellas.',
                queda: kk + 'x' + F.sup(e1[0] - e2[0]) + 'y' + F.sup('?') + 'z' + F.sup('?'),
                pregunta: 'La x: ' + e1[0] + ' &minus; ' + e2[0],
                resp: R.numero(e1[0] - e2[0], { dec: 0 }), pista: 'Dividiendose, los exponentes se restan.', despues: '' },
              { seccion: 'Paso 2: cada letra',
                queHacemos: 'Ahora la y.',
                paraQue: 'Si el exponente da 0, esa letra desaparece del resultado.',
                queda: kk + 'x' + F.sup(e1[0] - e2[0]) + 'y' + F.sup(e1[1] - e2[1]) + 'z' + F.sup('?'),
                pregunta: 'La y: ' + e1[1] + ' &minus; ' + e2[1],
                resp: R.numero(e1[1] - e2[1], { dec: 0 }),
                pista: (e1[1] - e2[1]) === 0 ? 'Si da 0 la letra desaparece (vale 1).' : 'Igual que con la x.', despues: '' },
              { seccion: 'Paso 2: cada letra',
                queHacemos: 'Y la z.',
                paraQue: 'Para terminar la division.',
                queda: disp(kk, vvr),
                pregunta: 'La z: ' + e1[2] + ' &minus; ' + e2[2],
                resp: R.numero(e1[2] - e2[2], { dec: 0 }),
                pista: (e1[2] - e2[2]) === 0 ? 'Si da 0, esa letra ya no aparece en el resultado.' : 'Ultima letra.',
                despues: 'Cada letra por su lado: nunca se mezclan entre ellas.' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Escribimos el resultado completo.',
                paraQue: 'Para dar la respuesta.',
                queda: disp(kk, vvr),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(kk, vvr), { vars: ['x', 'y', 'z'], mostrar: disp(kk, vvr) }),
                pista: 'Es ' + disp(kk, vvr) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(kk, vvr) + '</b>',
            receta: ['Coeficientes se dividen',
              'Cada letra resta sus exponentes por separado',
              'Exponente 0 = esa letra desaparece']
          });
          enun = 'Simplifica: ' + F.frac(disp(c1, vv1), disp(c2, vv2));
          resp = R.expresion(txt(kk, vvr), { vars: vars, mostrar: disp(kk, vvr) });
          pistas = ['Trabaja variable por variable restando exponentes.',
            'Coeficiente ' + c1 + '/' + c2 + ' = ' + kk + '.'];
          sol = ['Coeficientes: ' + c1 + ' &divide; ' + c2 + ' = ' + kk,
            'x: ' + e1[0] + '&minus;' + e2[0] + ' = ' + (e1[0] - e2[0]) + ', y: ' + e1[1] + '&minus;' + e2[1] + ' = ' + (e1[1] - e2[1]) + ', z: ' + e1[2] + '&minus;' + e2[2] + ' = ' + (e1[2] - e2[2]),
            'Resultado: <b>' + disp(kk, vvr) + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['combinado', 'Producto entre cociente'],
          ['dobleProducto', 'Potencias multiplicadas'],
          ['raizMonomio', 'Raiz de un monomio']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'combinado') {
          c1 = r.enteroNoCero(-6, 8); c2 = r.enteroNoCero(-5, 6);
          var c3 = r.elige([2, 3, 4]);
          var prodC = c1 * c2;
          while (prodC % c3 !== 0) { c1 = r.enteroNoCero(-6, 8); prodC = c1 * c2; }
          var A = [r.entero(2, 5), r.entero(1, 4)], B = [r.entero(1, 4), r.entero(1, 3)];
          var D = [r.entero(1, 3), r.entero(0, 2)];
          var ex = A[0] + B[0] - D[0], ey = A[1] + B[1] - D[1];
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + F.frac(par(disp(c1, [['x', A[0]], ['y', A[1]]])) + par(disp(c2, [['x', B[0]], ['y', B[1]]])), disp(c3, [['x', D[0]], ['y', D[1]]])) + '</b>.<br>' +
              'Hay multiplicacion arriba y division abajo. Se resuelve primero todo el numerador y al final se divide.',
            pasos: [
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Resolvemos primero todo el numerador, antes de tocar la division.',
                paraQue: 'La raya de fraccion agrupa: es como si arriba hubiera un parentesis invisible.',
                queda: F.frac(prodC + 'x' + F.sup('?') + 'y' + F.sup('?'), disp(c3, [['x', D[0]], ['y', D[1]]])),
                pregunta: 'Multiplica los coeficientes de arriba: ' + c1 + ' &middot; ' + c2,
                resp: R.numero(prodC, { dec: 0 }), pista: 'Ojo con los signos.', despues: '' },
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Sumamos los exponentes de la x de arriba.',
                paraQue: 'Multiplicandose se SUMAN.',
                queda: F.frac(prodC + 'x' + F.sup(A[0] + B[0]) + 'y' + F.sup('?'), disp(c3, [['x', D[0]], ['y', D[1]]])),
                pregunta: 'Los exponentes de x arriba se suman: ' + A[0] + ' + ' + B[0],
                resp: R.numero(A[0] + B[0], { dec: 0 }), pista: 'Multiplicandose se SUMAN.', despues: '' },
              { seccion: 'Paso 1: el numerador',
                queHacemos: 'Y los de la y.',
                paraQue: 'Para terminar el numerador.',
                queda: F.frac(disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]), disp(c3, [['x', D[0]], ['y', D[1]]])),
                pregunta: 'Los de y arriba: ' + A[1] + ' + ' + B[1],
                resp: R.numero(A[1] + B[1], { dec: 0 }), pista: 'Igual, se suman.',
                despues: 'El numerador quedo ' + disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]) + '.' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Dividimos los numeros.',
                paraQue: 'Ya con el numerador resuelto, toca la division.',
                queda: (prodC / c3) + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'Ahora si, divide los coeficientes: ' + prodC + ' &divide; ' + c3,
                resp: R.numero(prodC / c3, { dec: 0 }), pista: 'Division exacta.', despues: '' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Restamos los exponentes de la x.',
                paraQue: 'Dividiendose se RESTAN.',
                queda: (prodC / c3) + 'x' + F.sup(ex) + 'y' + F.sup('?'),
                pregunta: 'Resta los exponentes de x: ' + (A[0] + B[0]) + ' &minus; ' + D[0],
                resp: R.numero(ex, { dec: 0 }), pista: 'Dividiendose se restan.', despues: '' },
              { seccion: 'Paso 2: dividir',
                queHacemos: 'Y los de la y.',
                paraQue: 'Para terminar la division.',
                queda: disp(prodC / c3, [['x', ex], ['y', ey]]),
                pregunta: 'Y los de y: ' + (A[1] + B[1]) + ' &minus; ' + D[1],
                resp: R.numero(ey, { dec: 0 }), pista: 'Lo mismo con la otra letra.', despues: '' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Escribimos el resultado completo.',
                paraQue: 'Para dar la respuesta.',
                queda: disp(prodC / c3, [['x', ex], ['y', ey]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(prodC / c3, [['x', ex], ['y', ey]]), { vars: ['x', 'y'], mostrar: disp(prodC / c3, [['x', ex], ['y', ey]]) }),
                pista: 'Es ' + disp(prodC / c3, [['x', ex], ['y', ey]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(prodC / c3, [['x', ex], ['y', ey]]) + '</b>',
            receta: ['Resolver primero todo el numerador',
              'Multiplicando: exponentes se suman',
              'Dividiendo: exponentes se restan',
              'Cada letra por separado']
          });
          enun = 'Simplifica: ' + F.frac(par(disp(c1, [['x', A[0]], ['y', A[1]]])) + par(disp(c2, [['x', B[0]], ['y', B[1]]])), disp(c3, [['x', D[0]], ['y', D[1]]]));
          resp = R.expresion(txt(prodC / c3, [['x', ex], ['y', ey]]), {
            vars: vars, mostrar: disp(prodC / c3, [['x', ex], ['y', ey]])
          });
          pistas = ['Resuelve primero el producto del numerador y despues divide.',
            'Numerador: ' + disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]) + '.'];
          sol = ['Numerador: ' + disp(c1, [['x', A[0]], ['y', A[1]]]) + ' &middot; ' + disp(c2, [['x', B[0]], ['y', B[1]]]) + ' = ' + disp(prodC, [['x', A[0] + B[0]], ['y', A[1] + B[1]]]),
            'Divido coeficientes: ' + prodC + ' &divide; ' + c3 + ' = ' + (prodC / c3),
            'Resto exponentes: x' + F.sup(ex) + 'y' + F.sup(ey),
            'Resultado: <b>' + disp(prodC / c3, [['x', ex], ['y', ey]]) + '</b>'];
        } else {
          c1 = r.elige([-3, -2, 2, 3]); c2 = r.elige([-2, 2, 3]);
          var n1 = r.entero(2, 3), n2 = r.entero(2, 3);
          var A2 = [r.entero(1, 3), r.entero(1, 2)], B2 = [r.entero(1, 2), r.entero(1, 2)];
          var CF = Math.pow(c1, n1) * Math.pow(c2, n2);
          var exf = A2[0] * n1 + B2[0] * n2, eyf = A2[1] * n1 + B2[1] * n2;
          guiaDelPaso = G({
            intro: 'Vamos con <b>' + par(disp(c1, [['x', A2[0]], ['y', A2[1]]])) + F.sup(n1) + ' ' + par(disp(c2, [['x', B2[0]], ['y', B2[1]]])) + F.sup(n2) + '</b>.<br>' +
              'Son dos monomios elevados, multiplicandose. El orden importa: primero se eleva cada uno, y hasta el final se multiplican.',
            pasos: [
              { seccion: 'Paso 1: elevar cada uno',
                queHacemos: 'Elevamos el primer monomio a su exponente.',
                paraQue: 'El orden importa: primero se eleva cada uno y HASTA EL FINAL se multiplican. Al reves sale mal.',
                queda: Math.pow(c1, n1) + 'x' + F.sup(A2[0] * n1) + 'y' + F.sup(A2[1] * n1) + ' &middot; ?',
                pregunta: 'Eleva el primero. Su coeficiente: (' + c1 + ')' + F.sup(n1),
                resp: R.numero(Math.pow(c1, n1), { dec: 0 }),
                pista: c1 < 0 ? 'Base negativa, exponente ' + (n1 % 2 === 0 ? 'par: positivo' : 'impar: negativo') + '.' : 'Multiplicalo por si mismo ' + n1 + ' veces.',
                despues: 'Sus exponentes quedan x' + F.sup(A2[0] * n1) + 'y' + F.sup(A2[1] * n1) + ' (se multiplican por ' + n1 + ').' },
              { seccion: 'Paso 1: elevar cada uno',
                queHacemos: 'Ahora el segundo.',
                paraQue: 'Al elevar, los exponentes de dentro se MULTIPLICAN por el de afuera.',
                queda: Math.pow(c1, n1) + 'x' + F.sup(A2[0] * n1) + 'y' + F.sup(A2[1] * n1) + ' &middot; ' + Math.pow(c2, n2) + 'x' + F.sup(B2[0] * n2) + 'y' + F.sup(B2[1] * n2),
                pregunta: 'Ahora el segundo: (' + c2 + ')' + F.sup(n2),
                resp: R.numero(Math.pow(c2, n2), { dec: 0 }), pista: 'Mismo procedimiento.',
                despues: 'Y sus exponentes: x' + F.sup(B2[0] * n2) + 'y' + F.sup(B2[1] * n2) + '.' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Multiplicamos los dos coeficientes.',
                paraQue: 'Ya elevados, es una multiplicacion de monomios normal.',
                queda: CF + 'x' + F.sup('?') + 'y' + F.sup('?'),
                pregunta: 'Ya elevados, multiplicalos. Los coeficientes: ' + Math.pow(c1, n1) + ' &middot; ' + Math.pow(c2, n2),
                resp: R.numero(CF, { dec: 0 }), pista: 'Ojo con los signos.', despues: '' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Ahora SI se suman los exponentes de la x.',
                paraQue: 'Aqui ya es multiplicacion, por eso se suman. Antes era potencia, por eso se multiplicaban.',
                queda: CF + 'x' + F.sup(exf) + 'y' + F.sup('?'),
                pregunta: 'Los exponentes de x ahora se SUMAN: ' + (A2[0] * n1) + ' + ' + (B2[0] * n2),
                resp: R.numero(exf, { dec: 0 }), pista: 'Aqui ya es multiplicacion, por eso se suman.', despues: '' },
              { seccion: 'Paso 2: multiplicar',
                queHacemos: 'Y los de la y.',
                paraQue: 'Para terminar.',
                queda: disp(CF, [['x', exf], ['y', eyf]]),
                pregunta: 'Y los de y: ' + (A2[1] * n1) + ' + ' + (B2[1] * n2),
                resp: R.numero(eyf, { dec: 0 }), pista: 'Igual.', despues: '' },
              { seccion: 'Paso 3: escribir',
                queHacemos: 'Escribimos el resultado completo.',
                paraQue: 'Para dar la respuesta.',
                queda: disp(CF, [['x', exf], ['y', eyf]]),
                pregunta: 'Escribe el resultado completo.',
                resp: R.expresion(txt(CF, [['x', exf], ['y', eyf]]), { vars: ['x', 'y'], mostrar: disp(CF, [['x', exf], ['y', eyf]]) }),
                pista: 'Es ' + disp(CF, [['x', exf], ['y', eyf]]) + '.', despues: '' }
            ],
            final: 'Resultado: <b>' + disp(CF, [['x', exf], ['y', eyf]]) + '</b>',
            receta: ['Primero elevar cada monomio (exponentes se multiplican)',
              'Despues multiplicarlos entre si (exponentes se suman)',
              'No mezclar los dos pasos: primero elevar, luego multiplicar']
          });
          enun = 'Desarrolla y simplifica: ' + par(disp(c1, [['x', A2[0]], ['y', A2[1]]])) + F.sup(n1) + ' ' + par(disp(c2, [['x', B2[0]], ['y', B2[1]]])) + F.sup(n2);
          resp = R.expresion(txt(CF, [['x', exf], ['y', eyf]]), { vars: vars, mostrar: disp(CF, [['x', exf], ['y', eyf]]) });
          pistas = ['Eleva cada monomio a su potencia por separado y luego multiplica.',
            'Primero: ' + disp(Math.pow(c1, n1), [['x', A2[0] * n1], ['y', A2[1] * n1]]) + ' y ' + disp(Math.pow(c2, n2), [['x', B2[0] * n2], ['y', B2[1] * n2]]) + '.'];
          sol = ['Primer factor elevado: ' + disp(Math.pow(c1, n1), [['x', A2[0] * n1], ['y', A2[1] * n1]]),
            'Segundo factor elevado: ' + disp(Math.pow(c2, n2), [['x', B2[0] * n2], ['y', B2[1] * n2]]),
            'Multiplico: coeficiente ' + Math.pow(c1, n1) + ' &middot; ' + Math.pow(c2, n2) + ' = ' + CF,
            'Resultado: <b>' + disp(CF, [['x', exf], ['y', eyf]]) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
