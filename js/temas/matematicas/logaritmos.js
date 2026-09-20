/* Propiedades de logaritmos y aplicaciones */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function logSub(b, arg) { return 'log<sub>' + b + '</sub>(' + arg + ')'; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.propiedadesBasicas = function (r) {
    var b1 = r.entero(2, 9), b2 = r.entero(2, 9), b3 = r.entero(2, 6), k = r.entero(2, 7);
    var val = 0 + 1 + k;
    return {
      guia: G({
        intro: 'Hay que calcular <b>' + logSub(b1, 1) + ' + ' + logSub(b2, b2) + ' + ' + logSub(b3, b3 + '<sup>' + k + '</sup>') + '</b> sin calculadora.<br>' +
          'Se puede porque los tres son casos especiales. La clave es acordarse de que ' +
          '<b>un logaritmo es un exponente</b>: log<sub>b</sub>(x) pregunta "&iquest;a que exponente elevo b para obtener x?".',
        pasos: [
          { pregunta: '&iquest;A que exponente hay que elevar ' + b1 + ' para obtener 1?',
            resp: R.numero(0, { dec: 0 }),
            pista: 'Cualquier numero elevado a 0 da 1. Es la unica forma de llegar al 1.',
            despues: 'Por eso log<sub>b</sub>(1) = 0 SIEMPRE, sea cual sea la base.' },
          { pregunta: '&iquest;A que exponente hay que elevar ' + b2 + ' para obtener ' + b2 + '?',
            resp: R.numero(1, { dec: 0 }),
            pista: 'El numero ya es el mismo: basta con elevarlo a 1.',
            despues: 'Por eso log<sub>b</sub>(b) = 1 siempre.' },
          { pregunta: 'Y ahora ' + logSub(b3, b3 + '<sup>' + k + '</sup>') + ': &iquest;a que exponente hay que elevar ' + b3 + ' para obtener ' + b3 + '<sup>' + k + '</sup>?',
            resp: R.numero(k, { dec: 0 }),
            pista: 'La respuesta esta escrita a la vista: el exponente ya es ' + k + '.',
            despues: 'log<sub>b</sub>(b<sup>k</sup>) = k. El logaritmo y la potencia se deshacen mutuamente.' },
          { pregunta: 'Suma los tres resultados: 0 + 1 + ' + k,
            resp: R.numero(val, { dec: 0 }),
            pista: 'Suma simple.',
            despues: '' }
        ],
        final: 'El resultado es <b>' + val + '</b>',
        receta: ['Un logaritmo es un exponente',
          'log<sub>b</sub>(1) = 0 siempre',
          'log<sub>b</sub>(b) = 1 siempre',
          'log<sub>b</sub>(b<sup>k</sup>) = k: se deshacen',
          'La base no importa en los dos primeros casos']
      }),
      enunciado: 'Calcula sin calculadora:<br><span class="big">' +
        logSub(b1, 1) + ' + ' + logSub(b2, b2) + ' + ' + logSub(b3, b3 + '<sup>' + k + '</sup>') + '</span>',
      respuesta: R.numero(val, { dec: 0 }),
      pistas: ['Tres propiedades: log<sub>b</sub>1 = 0, log<sub>b</sub>b = 1 y log<sub>b</sub>b<sup>k</sup> = k.',
        'Los valores son 0, 1 y ' + k + '.'],
      solucion: [logSub(b1, 1) + ' = 0 (porque ' + b1 + '<sup>0</sup> = 1)',
        logSub(b2, b2) + ' = 1',
        logSub(b3, b3 + '<sup>' + k + '</sup>') + ' = ' + k,
        'Suma: <b>' + val + '</b>']
    };
  };

  extra.expandir = function (r) {
    var p = r.entero(2, 5), q = r.entero(1, 4), s = r.entero(2, 4);
    return {
      guia: G({
        intro: 'Hay que <b>expandir</b> log ' + F.frac('x<sup>' + p + '</sup>y<sup>' + q + '</sup>', 'z<sup>' + s + '</sup>') + '.<br>' +
          'Expandir es romper un logaritmo grande en varios chiquitos. Se hace en dos tandas: ' +
          'primero se separan productos y cocientes (que se vuelven sumas y restas), ' +
          'y despues se bajan los exponentes como coeficientes.',
        pasos: [
          { pregunta: '&iquest;Como se separa log(AB/C)?',
            resp: R.opcion(['log A + log B &minus; log C', 'log A &middot; log B / log C'], 0),
            pista: 'El logaritmo baja un nivel las operaciones: los productos se vuelven sumas y los cocientes, restas. ' +
              'Nunca se convierte en producto de logaritmos.',
            despues: 'Queda log(x<sup>' + p + '</sup>) + log(y<sup>' + q + '</sup>) &minus; log(z<sup>' + s + '</sup>).' },
          { pregunta: 'Ahora se bajan los exponentes: log(A<sup>n</sup>) = n log A.<br>&iquest;Que coeficiente acompana a log x?',
            resp: R.numero(p, { dec: 0 }),
            pista: 'El exponente de la x es ' + p + ', y baja tal cual a multiplicar.',
            despues: '' },
          { pregunta: '&iquest;Y el coeficiente de log y?',
            resp: R.numero(q, { dec: 0 }),
            pista: 'El exponente de la y.',
            despues: '' },
          { pregunta: '&iquest;Y el de log z? Cuidado con el signo.',
            resp: R.numero(-s, { dec: 0 }),
            pista: 'El exponente es ' + s + ', pero la z estaba DIVIDIENDO, asi que su logaritmo va restando: ' + (-s) + '.',
            despues: 'Este signo es el error mas comun del ejercicio.' },
          { pregunta: 'Escribe los tres coeficientes.',
            resp: R.varios([
              { etiqueta: 'A (coef. de log x)', resp: R.numero(p, { dec: 0 }) },
              { etiqueta: 'B (coef. de log y)', resp: R.numero(q, { dec: 0 }) },
              { etiqueta: 'C (coef. de log z)', resp: R.numero(-s, { dec: 0 }) }
            ]),
            pista: 'A = ' + p + ', B = ' + q + ', C = ' + (-s) + '.',
            despues: '' }
        ],
        final: 'log ' + F.frac('x<sup>' + p + '</sup>y<sup>' + q + '</sup>', 'z<sup>' + s + '</sup>') +
          ' = <b>' + p + ' log x + ' + q + ' log y &minus; ' + s + ' log z</b>',
        receta: ['Primero separar: productos a sumas, cocientes a restas',
          'Despues bajar los exponentes como coeficientes',
          'Lo que estaba dividiendo queda con signo NEGATIVO',
          'log(A+B) NO se puede separar: solo productos y cocientes']
      }),
      enunciado: 'Expande usando las propiedades de los logaritmos:<br>' +
        '<span class="big">log ' + F.frac('x<sup>' + p + '</sup>y<sup>' + q + '</sup>', 'z<sup>' + s + '</sup>') + '</span><br>' +
        'El resultado tiene la forma A&middot;log x + B&middot;log y + C&middot;log z. Da A, B y C.',
      respuesta: R.varios([
        { etiqueta: 'A (coef. de log x)', resp: R.numero(p, { dec: 0 }) },
        { etiqueta: 'B (coef. de log y)', resp: R.numero(q, { dec: 0 }) },
        { etiqueta: 'C (coef. de log z)', resp: R.numero(-s, { dec: 0 }) }
      ]),
      pistas: ['Primero separa producto y cociente: log(AB/C) = log A + log B &minus; log C.',
        'Despues baja los exponentes como coeficientes: log(x<sup>n</sup>) = n log x. Cuidado con el signo del que va dividiendo.'],
      solucion: ['Separo: log(x<sup>' + p + '</sup>) + log(y<sup>' + q + '</sup>) &minus; log(z<sup>' + s + '</sup>)',
        'Bajo los exponentes: ' + p + ' log x + ' + q + ' log y &minus; ' + s + ' log z',
        'A = <b>' + p + '</b>, B = <b>' + q + '</b>, C = <b>' + (-s) + '</b> (negativo porque estaba dividiendo)']
    };
  };

  EJ.tema({
    id: 'logaritmos',
    materia: 'matematicas',
    grupo: 'Funciones',
    nombre: 'Propiedades de logaritmos y aplicaciones',
    descripcion: 'Definicion, propiedades del producto, cociente y potencia, cambio de base y ecuaciones.',
    formulario: 'log<sub>b</sub>(x) = y &hArr; b<sup>y</sup> = x<br>' +
      'log(AB) = log A + log B &nbsp;&middot;&nbsp; log(A/B) = log A &minus; log B &nbsp;&middot;&nbsp; log(A<sup>n</sup>) = n log A<br>' +
      'log<sub>b</sub>b = 1, log<sub>b</sub>1 = 0, cambio de base: log<sub>b</sub>x = ln x / ln b',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, b, n, x, y;

      if (dif === 'facil') {
        var t = r.subtema([
          ['evaluar', 'Calcular un logaritmo'],
          ['aExponencial', 'De logaritmica a exponencial'],
          ['aLog', 'De exponencial a logaritmica'],
          ['propiedadesBasicas', 'Propiedades basicas']
        ]);
        if (extra[t]) return extra[t](r, dif);
        b = r.elige([2, 3, 4, 5, 10]);
        n = r.entero(1, 5);
        x = Math.pow(b, n);
        if (t === 'evaluar') {
          guiaDelPaso = EJ.guia.logaritmoEvaluar(b, n);
          enun = 'Calcula: ' + logSub(b, x);
          resp = R.numero(n, { dec: 2 });
          pistas = ['Preguntate: &iquest;a que exponente hay que elevar ' + b + ' para obtener ' + x + '?',
            b + '<sup>?</sup> = ' + x];
          sol = [logSub(b, x) + ' = y significa ' + b + '<sup>y</sup> = ' + x,
            b + '<sup>' + n + '</sup> = ' + x,
            'Por lo tanto y = <b>' + n + '</b>'];
        } else if (t === 'aExponencial') {
          guiaDelPaso = G({
            intro: 'Hay que pasar <b>' + logSub(b, x) + ' = ' + n + '</b> a forma exponencial.<br>' +
              'Logaritmo y potencia son la misma informacion escrita de dos maneras. ' +
              'Saber traducir de una a otra es lo mas importante de todo el tema, porque asi se resuelve casi cualquier ejercicio.',
            pasos: [
              { pregunta: '&iquest;Que dice la definicion de logaritmo?',
                resp: R.opcion(['log<sub>b</sub>(x) = y significa b<sup>y</sup> = x',
                  'log<sub>b</sub>(x) = y significa x<sup>y</sup> = b'], 0),
                pista: 'La BASE del logaritmo es la base de la potencia, y el RESULTADO del logaritmo es el exponente.',
                despues: 'Una frase que ayuda: "el logaritmo es el exponente".' },
              { pregunta: 'En la forma exponencial, &iquest;quien hace de exponente?',
                resp: R.opcion(['El resultado del logaritmo, o sea ' + n, 'El argumento'], 0),
                pista: 'El logaritmo vale ' + n + ', y ese numero es justo el exponente que buscabamos.',
                despues: 'Entonces la forma exponencial es ' + b + '<sup>' + n + '</sup> = x.' },
              { pregunta: 'Calcula ' + b + '<sup>' + n + '</sup>',
                resp: R.numero(x, { dec: 2 }),
                pista: 'Multiplica ' + b + ' por si mismo ' + n + ' veces.',
                despues: '' }
            ],
            final: b + '<sup>' + n + '</sup> = <b>' + x + '</b>',
            receta: ['log<sub>b</sub>(x) = y &hArr; b<sup>y</sup> = x',
              'La base del log es la base de la potencia',
              'El resultado del log es el exponente',
              'El argumento del log es el resultado de la potencia']
          });
          enun = 'Escribe en forma exponencial: ' + logSub(b, x) + ' = ' + n + '<br>&iquest;Cuanto vale la base elevada al resultado? Escribe el valor de ' + b + '<sup>' + n + '</sup>.';
          resp = R.numero(x, { dec: 2 });
          pistas = ['La definicion dice log<sub>b</sub>(x) = y &hArr; b<sup>y</sup> = x.',
            'Aqui b = ' + b + ' y y = ' + n + '.'];
          sol = ['Forma exponencial: ' + b + '<sup>' + n + '</sup> = x',
            b + '<sup>' + n + '</sup> = <b>' + x + '</b>'];
        } else {
          guiaDelPaso = G({
            intro: 'Hay que pasar <b>' + b + '<sup>' + n + '</sup> = ' + x + '</b> a forma logaritmica.<br>' +
              'Es la traduccion contraria a la de antes. Lo unico que hay que tener clarisimo es quien es quien: ' +
              'base, exponente y resultado cambian de lugar, pero no de papel.',
            pasos: [
              { pregunta: 'En ' + b + '<sup>' + n + '</sup> = ' + x + ', &iquest;cual es la base?',
                resp: R.numero(b, { dec: 0 }),
                pista: 'Es el numero grande, el que esta abajo.',
                despues: 'Esa misma sera la base del logaritmo.' },
              { pregunta: '&iquest;Y el exponente?',
                resp: R.numero(n, { dec: 0 }),
                pista: 'El numerito de arriba.',
                despues: '' },
              { pregunta: 'Al pasar a forma logaritmica, &iquest;que papel juega el exponente?',
                resp: R.opcion(['Es el RESULTADO del logaritmo', 'Es el argumento, lo que va dentro del parentesis'], 0),
                pista: 'El logaritmo pregunta "&iquest;que exponente?", asi que su respuesta ES el exponente.',
                despues: 'Y el ' + x + ' pasa a ser el argumento: ' + logSub(b, x) + '.' },
              { pregunta: 'Entonces, &iquest;cuanto vale ' + logSub(b, x) + '?',
                resp: R.numero(n, { dec: 2 }),
                pista: 'Es el exponente: ' + n + '.',
                despues: '' }
            ],
            final: logSub(b, x) + ' = <b>' + n + '</b>',
            receta: ['b<sup>y</sup> = x &hArr; log<sub>b</sub>(x) = y',
              'La base se queda de base',
              'El exponente pasa a ser el RESULTADO del log',
              'El resultado de la potencia pasa a ser el argumento']
          });
          enun = 'Escribe en forma logaritmica: ' + b + '<sup>' + n + '</sup> = ' + x + '<br>&iquest;Cuanto vale ' + logSub(b, x) + '?';
          resp = R.numero(n, { dec: 2 });
          pistas = ['El exponente es siempre el resultado del logaritmo.',
            logSub(b, x) + ' = exponente al que elevamos ' + b + '.'];
          sol = [b + '<sup>' + n + '</sup> = ' + x + ' equivale a ' + logSub(b, x) + ' = ' + n,
            'Respuesta: <b>' + n + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['propiedades', 'Producto, cociente y potencia'],
          ['condensar', 'Condensar en un logaritmo'],
          ['expandir', 'Expandir un logaritmo'],
          ['ecuacion', 'Ecuacion logaritmica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'propiedades') {
          b = r.elige([2, 3, 5, 10]);
          var A = r.entero(2, 9), B = r.entero(2, 9);
          var op = r.elige(['producto', 'cociente', 'potencia']);
          var la = Math.log(A) / Math.log(b), lb = Math.log(B) / Math.log(b);
          var valor, expresion, prop;
          if (op === 'producto') {
            valor = la + lb; expresion = logSub(b, A * B); prop = 'log(AB) = log A + log B';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ' y ' + logSub(b, B) + ' = ' + F.n(lb, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          } else if (op === 'cociente') {
            valor = la - lb; expresion = logSub(b, A + '/' + B); prop = 'log(A/B) = log A &minus; log B';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ' y ' + logSub(b, B) + ' = ' + F.n(lb, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          } else {
            n = r.entero(2, 5);
            valor = n * la; expresion = logSub(b, A + '<sup>' + n + '</sup>'); prop = 'log(A<sup>n</sup>) = n log A';
            enun = 'Si ' + logSub(b, A) + ' = ' + F.n(la, 4) + ',<br>calcula ' + expresion + ' (4 decimales).';
          }
          var pasosPr;
          if (op === 'producto') {
            pasosPr = [
              { pregunta: 'El argumento ' + (A * B) + ' se puede escribir como ' + A + ' &times; ' + B + '.<br>&iquest;En que se convierte el log de un producto?',
                resp: R.opcion(['En una SUMA de logaritmos', 'En un producto de logaritmos'], 0),
                pista: 'Esta es la propiedad que hizo famosos a los logaritmos: convierten multiplicaciones en sumas, ' +
                  'que son mucho mas faciles de hacer a mano.',
                despues: 'Entonces ' + logSub(b, A * B) + ' = ' + logSub(b, A) + ' + ' + logSub(b, B) + '.' },
              { pregunta: 'Sustituye los valores que te dan y suma:<br>' + F.n(la, 4) + ' + ' + F.n(lb, 4) + ' (4 decimales)',
                resp: R.numero(valor, { dec: 4, tol: 0.001 }),
                pista: 'No hace falta calculadora de logaritmos: solo sumar los dos numeros dados.',
                despues: '' }
            ];
          } else if (op === 'cociente') {
            pasosPr = [
              { pregunta: 'El argumento es ' + A + '/' + B + '.<br>&iquest;En que se convierte el log de un cociente?',
                resp: R.opcion(['En una RESTA de logaritmos', 'En un cociente de logaritmos'], 0),
                pista: 'Igual que el producto se vuelve suma, el cociente se vuelve resta. ' +
                  'Nunca se convierte en una division de logaritmos.',
                despues: 'Entonces ' + logSub(b, A + '/' + B) + ' = ' + logSub(b, A) + ' &minus; ' + logSub(b, B) + '.' },
              { pregunta: 'Sustituye y resta:<br>' + F.n(la, 4) + ' &minus; ' + F.n(lb, 4) + ' (4 decimales)',
                resp: R.numero(valor, { dec: 4, tol: 0.001 }),
                pista: 'Ojo al orden: el de arriba menos el de abajo, no al reves.',
                despues: '' }
            ];
          } else {
            pasosPr = [
              { pregunta: 'El argumento es ' + A + '<sup>' + n + '</sup>.<br>&iquest;Que se hace con el exponente?',
                resp: R.opcion(['Baja multiplicando: log(A<sup>n</sup>) = n log A',
                  'Se queda donde esta'], 0),
                pista: 'Un exponente es una multiplicacion repetida, y el log convierte multiplicaciones en sumas: ' +
                  'sumar n veces log A es lo mismo que n &middot; log A.',
                despues: 'Entonces ' + logSub(b, A + '<sup>' + n + '</sup>') + ' = ' + n + ' &middot; ' + logSub(b, A) + '.' },
              { pregunta: 'Multiplica: ' + n + ' &times; ' + F.n(la, 4) + ' (4 decimales)',
                resp: R.numero(valor, { dec: 4, tol: 0.001 }),
                pista: 'Multiplicacion directa.',
                despues: '' }
            ];
          }
          guiaDelPaso = G({
            intro: 'Nos dan el valor de unos logaritmos y piden otro, <b>sin calculadora</b>.<br>' +
              'Se puede porque las propiedades permiten reescribir el logaritmo pedido en terminos de los que ya conoces. ' +
              'Lo importante es reconocer que operacion hay dentro del argumento.',
            pasos: pasosPr,
            final: expresion + ' = <b>' + F.n(valor, 4) + '</b>',
            receta: ['log(AB) = log A + log B',
              'log(A/B) = log A &minus; log B',
              'log(A<sup>n</sup>) = n log A',
              'El log baja un nivel las operaciones del argumento',
              'log(A + B) no se puede separar']
          });
          resp = R.numero(valor, { dec: 4, tol: 0.001 });
          pistas = ['Usa la propiedad ' + prop + '.',
            'No necesitas calculadora para el logaritmo: solo combina los valores dados.'];
          sol = ['Propiedad: ' + prop,
            'Sustituyo los valores dados',
            'Resultado: <b>' + F.n(valor, 4) + '</b>'];
        } else if (t2 === 'condensar') {
          var c1 = r.entero(2, 4), c2 = r.entero(1, 3);
          var X = r.entero(2, 6), Y = r.entero(2, 6);
          var res = Math.pow(X, c1) / Math.pow(Y, c2);
          guiaDelPaso = G({
            intro: 'Hay que <b>condensar</b> ' + c1 + ' log(' + X + ') &minus; ' + c2 + ' log(' + Y + ') en un solo logaritmo.<br>' +
              'Es el camino inverso de expandir: en vez de romper, se junta. ' +
              'Y se hace en orden inverso tambien: primero suben los coeficientes como exponentes, y al final se juntan sumas y restas.',
            pasos: [
              { pregunta: '&iquest;Como sube un coeficiente al argumento?',
                resp: R.opcion(['n log A = log(A<sup>n</sup>)', 'n log A = log(nA)'], 0),
                pista: 'Es la propiedad de la potencia leida al reves. El coeficiente se convierte en EXPONENTE, no en factor.',
                despues: 'Este paso va primero: no se puede juntar nada mientras haya coeficientes delante.' },
              { pregunta: 'Sube el primero: ' + c1 + ' log(' + X + ') = log(' + X + '<sup>' + c1 + '</sup>).<br>&iquest;Cuanto vale ese argumento?',
                resp: R.numero(Math.pow(X, c1), { dec: 0 }),
                pista: X + ' elevado a ' + c1 + '.',
                despues: '' },
              { pregunta: 'Y el segundo: ' + Y + '<sup>' + c2 + '</sup>',
                resp: R.numero(Math.pow(Y, c2), { dec: 0 }),
                pista: 'Misma operacion.',
                despues: 'Vamos en log(' + Math.pow(X, c1) + ') &minus; log(' + Math.pow(Y, c2) + ').' },
              { pregunta: 'Una RESTA de logaritmos, &iquest;en que se convierte?',
                resp: R.opcion(['En un cociente: log(A/B)', 'En una resta dentro del log: log(A &minus; B)'], 0),
                pista: 'Al reves de la propiedad del cociente. Restar logaritmos es dividir argumentos, nunca restarlos.',
                despues: '' },
              { pregunta: 'Calcula el argumento final: ' + Math.pow(X, c1) + ' &divide; ' + Math.pow(Y, c2) + ' (4 decimales)',
                resp: R.numero(res, { dec: 4, tol: 0.001 }),
                pista: 'Division directa.',
                despues: '' }
            ],
            final: 'Queda log(<b>' + F.n(res, 4) + '</b>)',
            receta: ['Primero subir los coeficientes como EXPONENTES',
              'Despues juntar: suma a producto, resta a cociente',
              'El que resta va al denominador',
              'Es exactamente lo contrario de expandir']
          });
          enun = 'Condensa en un solo logaritmo y calcula su argumento:<br>' +
            '<span class="big">' + c1 + ' log(' + X + ') &minus; ' + c2 + ' log(' + Y + ')</span><br>' +
            '&iquest;Cual es el numero que queda dentro del logaritmo? (4 decimales)';
          resp = R.numero(res, { dec: 4, tol: 0.001 });
          pistas = ['Primero pasa los coeficientes como exponentes: n log A = log(A<sup>n</sup>).',
            'Queda log(' + Math.pow(X, c1) + ') &minus; log(' + Math.pow(Y, c2) + '), y una resta de logaritmos es un cociente.'];
          sol = [c1 + ' log ' + X + ' = log(' + X + '<sup>' + c1 + '</sup>) = log(' + Math.pow(X, c1) + ')',
            c2 + ' log ' + Y + ' = log(' + Math.pow(Y, c2) + ')',
            'Resta &rArr; cociente: log(' + Math.pow(X, c1) + '/' + Math.pow(Y, c2) + ')',
            'Argumento: <b>' + F.n(res, 4) + '</b>'];
        } else {
          b = r.elige([2, 3, 5, 10]);
          n = r.entero(1, 4);
          var k = r.entero(1, 9);
          var sol0 = (Math.pow(b, n) - k);
          guiaDelPaso = G({
            intro: 'Hay que resolver <b>' + logSub(b, 'x + ' + k) + ' = ' + n + '</b>.<br>' +
              'La incognita esta atrapada dentro de un logaritmo. Para liberarla se usa el truco de siempre: ' +
              'pasar a <b>forma exponencial</b>, que es la operacion que deshace el logaritmo.',
            pasos: [
              { pregunta: '&iquest;Como se quita el logaritmo?',
                resp: R.opcion(['Pasando a forma exponencial', 'Dividiendo los dos lados entre log'], 0),
                pista: 'Un logaritmo no es un factor que multiplica: es una operacion. Se deshace con su inversa, la potencia.',
                despues: 'log<sub>' + b + '</sub>(algo) = ' + n + ' significa que algo = ' + b + '<sup>' + n + '</sup>.' },
              { pregunta: 'Calcula ' + b + '<sup>' + n + '</sup>',
                resp: R.numero(Math.pow(b, n), { dec: 0 }),
                pista: b + ' multiplicado por si mismo ' + n + ' veces.',
                despues: 'La ecuacion quedo x + ' + k + ' = ' + Math.pow(b, n) + ': ya es de primer grado.' },
              { pregunta: 'Despeja x: ' + Math.pow(b, n) + ' &minus; ' + k,
                resp: R.numero(sol0, { dec: 2 }),
                pista: 'Pasa el ' + k + ' restando.',
                despues: '' },
              { pregunta: '&iquest;Por que conviene comprobar el resultado en la ecuacion original?',
                resp: R.opcion(['Porque el argumento del logaritmo tiene que salir POSITIVO',
                  'Porque siempre hay que comprobar, por costumbre'], 0),
                pista: 'log de un numero negativo o de cero no existe. A veces el despeje da soluciones que hay que descartar por eso.',
                despues: 'Aqui x + ' + k + ' = ' + Math.pow(b, n) + ', que es positivo: la solucion es valida.' }
            ],
            final: 'x = <b>' + sol0 + '</b>',
            receta: ['Pasar a forma exponencial para liberar la incognita',
              'log<sub>b</sub>(A) = n significa A = b<sup>n</sup>',
              'Resolver la ecuacion que queda',
              'COMPROBAR que el argumento salga positivo',
              'Las soluciones que dejan argumento negativo se descartan']
          });
          enun = 'Resuelve la ecuacion: ' + logSub(b, 'x + ' + k) + ' = ' + n;
          resp = R.numero(sol0, { dec: 2 });
          pistas = ['Pasa a forma exponencial: si log<sub>b</sub>(algo) = n, entonces algo = b<sup>n</sup>.',
            'x + ' + k + ' = ' + b + '<sup>' + n + '</sup> = ' + Math.pow(b, n) + '.'];
          sol = ['Forma exponencial: x + ' + k + ' = ' + b + '<sup>' + n + '</sup>',
            'x + ' + k + ' = ' + Math.pow(b, n),
            'x = <b>' + sol0 + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['exponencial', 'Ecuacion exponencial'],
          ['cambioBase', 'Cambio de base'],
          ['interes', 'Interes compuesto'],
          ['pH', 'Aplicacion: pH'],
          ['expandir', 'Expandir un logaritmo']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'exponencial') {
          b = r.elige([2, 3, 5, 7]);
          var obj = r.entero(20, 900);
          var sol1 = Math.log(obj) / Math.log(b);
          guiaDelPaso = G({
            intro: 'Hay que resolver <b>' + b + '<sup>x</sup> = ' + obj + '</b>.<br>' +
              'La incognita esta en el EXPONENTE, asi que no se puede despejar con sumas ni divisiones. ' +
              'Para bajarla de ahi solo hay una herramienta: el logaritmo.',
            pasos: [
              { pregunta: '&iquest;Como se baja una incognita que esta en el exponente?',
                resp: R.opcion(['Aplicando logaritmo a los dos lados', 'Dividiendo los dos lados entre la base'], 0),
                pista: 'Dividir entre ' + b + ' no sirve: ' + b + '<sup>x</sup> &divide; ' + b + ' da ' + b + '<sup>x&minus;1</sup>, y la x sigue arriba.',
                despues: 'Al aplicar log, la propiedad log(A<sup>n</sup>) = n log A hace bajar la x: x &middot; log ' + b + ' = log ' + obj + '.' },
              { pregunta: '&iquest;Importa que base de logaritmo uses?',
                resp: R.opcion(['No, mientras uses la misma arriba y abajo', 'Si, tiene que ser base 10'], 0),
                pista: 'Puedes usar ln o log base 10: al dividir, el cambio de base se cancela solo.',
                despues: '' },
              { pregunta: 'Despeja: x = log(' + obj + ') &divide; log(' + b + ') (4 decimales)',
                resp: R.numero(sol1, { dec: 4, tol: 0.001 }),
                pista: 'log(' + obj + ') = ' + F.n(Math.log(obj) / Math.LN10, 4) + ' y log(' + b + ') = ' + F.n(Math.log(b) / Math.LN10, 4) + '.',
                despues: 'Comprobacion mental: ' + b + ' elevado a ese numero debe acercarse a ' + obj + '.' }
            ],
            final: 'x = <b>' + F.n(sol1, 4) + '</b>',
            receta: ['Incognita en el exponente: aplicar logaritmo a los dos lados',
              'log(A<sup>n</sup>) = n log A hace bajar el exponente',
              'x = log(resultado) / log(base)',
              'Sirve cualquier base de logaritmo, con tal de ser la misma',
              'Ojo: es una DIVISION de logaritmos, no log de una division']
          });
          enun = 'Resuelve para x (4 decimales): <span class="big">' + b + '<sup>x</sup> = ' + obj + '</span>';
          resp = R.numero(sol1, { dec: 4, tol: 0.001 });
          pistas = ['Aplica logaritmo a los dos lados y baja el exponente.',
            'x = log(' + obj + ') / log(' + b + ').'];
          sol = ['Aplico log a ambos lados: x&middot;log ' + b + ' = log ' + obj,
            'x = log(' + obj + ')/log(' + b + ') = ' + F.n(Math.log(obj) / Math.LN10, 4) + '/' + F.n(Math.log(b) / Math.LN10, 4),
            'x = <b>' + F.n(sol1, 4) + '</b>'];
        } else if (t3 === 'cambioBase') {
          b = r.elige([3, 5, 6, 7, 11]);
          var arg = r.entero(15, 400);
          var val = Math.log(arg) / Math.log(b);
          guiaDelPaso = G({
            intro: 'Hay que calcular <b>' + logSub(b, arg) + '</b>.<br>' +
              'Problema practico: la calculadora solo trae dos botones de logaritmo, <b>log</b> (base 10) y <b>ln</b> (base e). ' +
              'No hay boton para base ' + b + '. La formula de cambio de base resuelve eso.',
            pasos: [
              { pregunta: '&iquest;Por que hace falta cambiar de base?',
                resp: R.opcion(['Porque la calculadora solo tiene log base 10 y ln',
                  'Porque los logaritmos en base ' + b + ' no existen'], 0),
                pista: 'El logaritmo en base ' + b + ' existe perfectamente; lo que no hay es una tecla para el.',
                despues: '' },
              { pregunta: '&iquest;Cual es la formula del cambio de base?',
                resp: R.opcion(['log<sub>b</sub>x = ln x / ln b', 'log<sub>b</sub>x = ln b / ln x'], 0),
                pista: 'El ARGUMENTO va arriba y la BASE abajo, en el mismo orden en que se escriben. ' +
                  'Comprobacion: log<sub>b</sub>b debe dar 1, y con esta formula sale ln b / ln b = 1.',
                despues: 'Invertirla es el error clasico; la comprobacion de arriba lo detecta al instante.' },
              { pregunta: 'Calcula ln(' + arg + ') (4 decimales)',
                resp: R.numero(Math.log(arg), { dec: 4, tol: 0.001 }),
                pista: 'Con la tecla ln de la calculadora.',
                despues: '' },
              { pregunta: 'Ahora divide entre ln(' + b + ') = ' + F.n(Math.log(b), 4) + ' (4 decimales)',
                resp: R.numero(val, { dec: 4, tol: 0.001 }),
                pista: F.n(Math.log(arg), 4) + ' &divide; ' + F.n(Math.log(b), 4) + '.',
                despues: 'Comprobacion: ' + b + ' elevado a ' + F.n(val, 4) + ' deberia dar ' + arg + '.' }
            ],
            final: logSub(b, arg) + ' = <b>' + F.n(val, 4) + '</b>',
            receta: ['La calculadora solo tiene log (base 10) y ln (base e)',
              'log<sub>b</sub>x = ln x / ln b',
              'Argumento arriba, base abajo',
              'Sirve igual con log base 10 en vez de ln',
              'Comprobacion rapida: log<sub>b</sub>b tiene que dar 1']
          });
          enun = 'Calcula ' + logSub(b, arg) + ' usando cambio de base (4 decimales).';
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['log<sub>b</sub>x = ln x / ln b (tambien sirve con log base 10).',
            'ln ' + arg + ' = ' + F.n(Math.log(arg), 4) + ' y ln ' + b + ' = ' + F.n(Math.log(b), 4) + '.'];
          sol = ['log<sub>' + b + '</sub>(' + arg + ') = ln(' + arg + ') / ln(' + b + ')',
            '= ' + F.n(Math.log(arg), 4) + ' / ' + F.n(Math.log(b), 4),
            '= <b>' + F.n(val, 4) + '</b>'];
        } else if (t3 === 'interes') {
          var C = r.entero(5, 50) * 1000;
          var tasa = r.entero(3, 12);
          var meta = C * r.elige([2, 3]);
          var anios = Math.log(meta / C) / Math.log(1 + tasa / 100);
          guiaDelPaso = G({
            intro: 'Se invierten <b>$' + C + '</b> al <b>' + tasa + '%</b> anual compuesto y queremos saber cuando llegan a <b>$' + meta + '</b>.<br>' +
              '"Compuesto" es la palabra clave: los intereses generan mas intereses, asi que el dinero se MULTIPLICA cada ano, ' +
              'no se suma. Eso pone el tiempo en el exponente, y de ahi solo se baja con logaritmos.',
            pasos: [
              { pregunta: '&iquest;Cual es el modelo del interes compuesto?',
                resp: R.opcion(['M = C(1 + i)<sup>t</sup>', 'M = C + i &middot; t'], 0),
                pista: 'La segunda formula es interes SIMPLE (se suma siempre lo mismo). ' +
                  'Compuesto significa multiplicar por (1 + i) cada periodo, y repetirlo t veces es elevar a la t.',
                despues: 'Aqui i = ' + (tasa / 100) + ', asi que la base es ' + F.n(1 + tasa / 100, 4) + '.' },
              { pregunta: 'Divide los dos lados entre el capital: ' + meta + ' &divide; ' + C,
                resp: R.numero(meta / C, { dec: 2 }),
                pista: 'Asi queda sola la potencia.',
                despues: 'Queda ' + (meta / C) + ' = ' + F.n(1 + tasa / 100, 4) + '<sup>t</sup>. Fijate que el capital inicial ya no importa: solo cuantas veces quieres multiplicarlo.' },
              { pregunta: 'La t esta en el exponente. &iquest;Como se baja?',
                resp: R.opcion(['Aplicando logaritmo a los dos lados', 'Sacando raiz t-esima'], 0),
                pista: 'Misma tecnica que en cualquier ecuacion exponencial.',
                despues: 't = log(' + (meta / C) + ') &divide; log(' + F.n(1 + tasa / 100, 4) + ').' },
              { pregunta: 'Calcula t (4 decimales)',
                resp: R.numero(anios, { dec: 4, tol: 0.005 }),
                pista: 'log(' + (meta / C) + ') = ' + F.n(Math.log(meta / C) / Math.LN10, 4) + ' y log(' + F.n(1 + tasa / 100, 4) + ') = ' + F.n(Math.log(1 + tasa / 100) / Math.LN10, 4) + '.',
                despues: 'Regla practica para comprobar: al ' + tasa + '%, el dinero se duplica en unos ' + F.n(72 / tasa, 1) + ' anos (la "regla del 72").' }
            ],
            final: 'Tardaria <b>' + F.n(anios, 4) + ' anos</b>',
            receta: ['Compuesto = M = C(1 + i)<sup>t</sup>',
              'La tasa en porcentaje se pasa a decimal',
              'Dividir entre el capital para aislar la potencia',
              'Logaritmo a los dos lados para bajar el tiempo',
              'Comprobacion: la regla del 72']
          });
          enun = 'Se invierten $' + C + ' a una tasa de ' + tasa + '% anual compuesto.<br>' +
            '&iquest;En cuantos anios se llega a $' + meta + '? (4 decimales)';
          resp = R.numero(anios, { dec: 4, tol: 0.005 });
          pistas = ['El modelo es M = C(1 + i)<sup>t</sup>. Despeja t con logaritmos.',
            't = log(M/C) / log(1 + ' + (tasa / 100) + ') = log(' + (meta / C) + ')/log(' + F.n(1 + tasa / 100, 4) + ').'];
          sol = [meta + ' = ' + C + '(1 + ' + (tasa / 100) + ')<sup>t</sup>',
            (meta / C) + ' = ' + F.n(1 + tasa / 100, 4) + '<sup>t</sup>',
            't = log(' + (meta / C) + ')/log(' + F.n(1 + tasa / 100, 4) + ')',
            't = <b>' + F.n(anios, 4) + ' anios</b>'];
        } else {
          var expo = r.entero(2, 12);
          var mant = r.entero(11, 99) / 10;
          var conc = mant * Math.pow(10, -expo);
          var pH = -Math.log(conc) / Math.LN10;
          guiaDelPaso = G({
            intro: 'El pH se define como <b>pH = &minus;log[H<sup>+</sup>]</b>, y la concentracion es ' +
              '<b>' + mant + ' &times; 10<sup>&minus;' + expo + '</sup></b> mol/L.<br>' +
              'La escala de pH existe justamente porque las concentraciones son numeros incomodisimos ' +
              '(0.0000001 y cosas asi). El logaritmo los convierte en numeros del 0 al 14.',
            pasos: [
              { pregunta: 'El argumento es un producto: ' + mant + ' &times; 10<sup>&minus;' + expo + '</sup>.<br>&iquest;Como se separa su logaritmo?',
                resp: R.opcion(['log(' + mant + ') + log(10<sup>&minus;' + expo + '</sup>) = log(' + mant + ') &minus; ' + expo,
                  'log(' + mant + ') &times; (&minus;' + expo + ')'], 0),
                pista: 'Producto se vuelve suma. Y log(10<sup>&minus;n</sup>) = &minus;n, porque en base 10 el log de una potencia de 10 es su exponente.',
                despues: 'Por eso las potencias de 10 son tan comodas con log base 10.' },
              { pregunta: 'Calcula log(' + mant + ') (4 decimales)',
                resp: R.numero(Math.log(mant) / Math.LN10, { dec: 4, tol: 0.001 }),
                pista: 'Con la tecla log de la calculadora. Como ' + mant + ' esta entre 1 y 10, el resultado queda entre 0 y 1.',
                despues: 'Entonces log[H<sup>+</sup>] = ' + F.n(Math.log(mant) / Math.LN10, 4) + ' &minus; ' + expo + ' = ' + F.n(Math.log(conc) / Math.LN10, 4) + '.' },
              { pregunta: 'El pH es el NEGATIVO de eso. &iquest;Cuanto vale? (4 decimales)',
                resp: R.numero(pH, { dec: 4, tol: 0.002 }),
                pista: 'Cambiale el signo a ' + F.n(Math.log(conc) / Math.LN10, 4) + '. Tambien sale directo como ' + expo + ' &minus; ' + F.n(Math.log(mant) / Math.LN10, 4) + '.',
                despues: 'Ese menos de la definicion esta justo para que el pH salga positivo, ya que las concentraciones son menores que 1.' },
              { pregunta: 'Con ese pH, &iquest;la sustancia es acida o basica?',
                resp: R.opcion(['Acida (pH menor que 7)', 'Basica (pH mayor que 7)'], pH < 7 ? 0 : 1),
                pista: 'El 7 es el neutro (agua pura). Por debajo, acida; por encima, basica.',
                despues: 'Y ojo: como la escala es logaritmica, un pH de 4 es DIEZ veces mas acido que uno de 5, no un poco mas.' }
            ],
            final: 'pH = <b>' + F.n(pH, 4) + '</b>',
            receta: ['pH = &minus;log[H<sup>+</sup>]',
              'Separar el producto: log(A &times; 10<sup>&minus;n</sup>) = log A &minus; n',
              'En base 10, el log de una potencia de 10 es su exponente',
              'Cambiar el signo al final',
              'Menor que 7 acido, mayor que 7 basico, y cada unidad son 10 veces']
          });
          enun = 'El pH se define como pH = &minus;log[H<sup>+</sup>].<br>' +
            'Si la concentracion es [H<sup>+</sup>] = ' + mant + ' &times; 10<sup>&minus;' + expo + '</sup> mol/L, calcula el pH (4 decimales).';
          resp = R.numero(pH, { dec: 4, tol: 0.002 });
          pistas = ['Usa log(A &times; 10<sup>&minus;n</sup>) = log A &minus; n.',
            'log(' + mant + ') = ' + F.n(Math.log(mant) / Math.LN10, 4) + ', asi que pH = ' + expo + ' &minus; ' + F.n(Math.log(mant) / Math.LN10, 4) + '.'];
          sol = ['pH = &minus;log(' + mant + ' &times; 10<sup>&minus;' + expo + '</sup>)',
            'pH = &minus;[log(' + mant + ') &minus; ' + expo + '] = ' + expo + ' &minus; ' + F.n(Math.log(mant) / Math.LN10, 4),
            'pH = <b>' + F.n(pH, 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
