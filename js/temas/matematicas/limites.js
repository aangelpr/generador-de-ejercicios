/* Limites */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function lim(expr, a) {
    return '<span class="big">lim<sub>x&rarr;' + a + '</sub> ' + expr + '</span>';
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.asintotaVertical = function (r) {
    var a = r.enteroNoCero(-6, 6), k = r.enteroNoCero(-9, 9);
    var alCuadrado = r.bool();
    var idx;
    if (alCuadrado) idx = k > 0 ? 0 : 1;   // (x-a)^2 siempre positivo
    else idx = 2;                          // signos distintos por cada lado
    var denTxt = '(x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ')' + (alCuadrado ? '&sup2;' : '');
    return {
      guia: G({
        intro: 'Queremos ' + lim(F.frac(k, denTxt), a) + '.<br>' +
          'El denominador se va a cero, asi que el resultado se dispara. Lo unico que hay que averiguar es <b>hacia que lado</b>.',
        pasos: [
          { rotulo: 'El denominador',
            pregunta: 'Sustituye x = ' + a + ' en el denominador ' + denTxt + '.<br>&iquest;Cuanto da?',
            resp: R.numero(0, { dec: 0 }),
            pista: 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' vale 0 justo en x = ' + a + '.',
            despues: 'Dividir entre algo que tiende a 0 hace crecer la fraccion sin limite: hay una <b>asintota vertical</b> en x = ' + a + '.' },
          { rotulo: 'Signo del denominador',
            pregunta: 'Acercandonos por la izquierda y por la derecha de ' + a + ',<br>&iquest;el denominador tiene el mismo signo por los dos lados?',
            resp: R.opcion(['Si, siempre positivo', 'No, cambia de signo'], alCuadrado ? 0 : 1),
            pista: alCuadrado
              ? 'Esta elevado al cuadrado, y un cuadrado nunca es negativo: da igual por donde te acerques.'
              : 'Sin cuadrado, x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ' es negativo antes de ' + a + ' y positivo despues.',
            despues: alCuadrado
              ? 'Entonces el signo del resultado lo decide solo el numerador.'
              : 'Entonces la fraccion se va para un lado por la izquierda y para el otro por la derecha.' },
          { rotulo: 'Resultado',
            pregunta: '&iquest;Que pasa con el limite?',
            resp: R.opcion([
              'Tiende a +&infin;',
              'Tiende a &minus;&infin;',
              'No existe: por un lado tiende a +&infin; y por el otro a &minus;&infin;'
            ], idx),
            pista: alCuadrado
              ? 'Denominador siempre positivo y numerador ' + k + ': el signo del resultado es el de ' + k + '.'
              : 'Los dos lados dan infinitos de signo contrario. Cuando los laterales no coinciden, el limite NO existe.',
            despues: '' }
        ],
        final: idx === 0 ? 'El limite es <b>+&infin;</b>' : idx === 1 ? 'El limite es <b>&minus;&infin;</b>'
          : 'El limite <b>no existe</b>: los laterales dan infinitos de signo contrario',
        receta: ['Denominador cero = asintota vertical',
          'Revisar el signo del denominador a cada lado',
          'Potencia PAR: mismo signo por los dos lados, el limite es infinito con signo',
          'Potencia IMPAR: cambia de signo, el limite no existe',
          'Infinito no es un numero: decir "el limite es infinito" es decir que no hay valor finito']
      }),
      enunciado: 'Analiza el limite:<br>' + lim(F.frac(k, '(x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ')' + (alCuadrado ? '&sup2;' : '')), a),
      respuesta: R.opcion([
        'Tiende a +&infin;',
        'Tiende a &minus;&infin;',
        'No existe: por un lado tiende a +&infin; y por el otro a &minus;&infin;'
      ], idx),
      pistas: ['El denominador se hace 0, asi que hay una asintota vertical en x = ' + a + '.',
        alCuadrado ? 'Al estar elevado al cuadrado, el denominador es positivo por los dos lados; manda el signo de ' + k + '.'
          : 'Sin el cuadrado, el denominador cambia de signo al pasar por x = ' + a + '.'],
      solucion: ['En x = ' + a + ' el denominador vale 0: hay asintota vertical',
        alCuadrado ? 'El denominador (x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ')&sup2; es positivo por ambos lados'
          : 'El denominador es negativo por la izquierda y positivo por la derecha',
        idx === 0 ? 'Como ' + k + ' &gt; 0, el limite es <b>+&infin;</b>'
          : idx === 1 ? 'Como ' + k + ' &lt; 0, el limite es <b>&minus;&infin;</b>'
            : 'Los limites laterales son infinitos de signo contrario, asi que <b>el limite no existe</b>']
    };
  };

  extra.continuidad = function (r) {
    var c = r.enteroNoCero(-4, 4);
    var a2 = r.enteroNoCero(-3, 3), b2 = r.entero(-6, 6);
    var valorDerecha = a2 * c * c + b2;
    var bIzq = r.entero(-6, 6);
    var m = (valorDerecha - bIzq) / c;
    while (Math.abs(m - Math.round(m)) > 1e-9) { bIzq = r.entero(-6, 6); m = (valorDerecha - bIzq) / c; }
    return {
      guia: G({
        intro: 'Buscamos la m que hace <b>continua</b> la funcion en x = ' + c + '.<br>' +
          'Continua significa que se puede dibujar sin levantar el lapiz: los dos trozos tienen que <b>juntarse</b> justo ahi.',
        pasos: [
          { rotulo: 'Que exige la continuidad',
            pregunta: '&iquest;Que tiene que pasar en x = ' + c + ' para que no haya un salto?',
            resp: R.opcion(['Que los dos trozos den el mismo valor ahi', 'Que la funcion sea positiva'], 0),
            pista: 'Si el trozo de la izquierda llega a una altura y el de la derecha empieza en otra, queda un escalon.',
            despues: 'Asi que hay que calcular los dos y forzarlos a ser iguales.' },
          { rotulo: 'Valor por la derecha',
            pregunta: 'El trozo derecho es ' + F.une([F.term(a2, 'x', 2), String(b2)]) + '.<br>&iquest;Cuanto vale en x = ' + c + '?',
            resp: R.numero(valorDerecha, { dec: 2 }),
            pista: '(' + c + ')&sup2; = ' + (c * c) + ', por ' + a2 + ' y le sumas ' + b2 + '.',
            despues: 'Este lado ya esta fijo: vale ' + valorDerecha + '. La m del otro lado tiene que alcanzarlo.' },
          { rotulo: 'La ecuacion',
            pregunta: 'El trozo izquierdo vale m(' + c + ') ' + (bIzq < 0 ? '&minus; ' + (-bIzq) : '+ ' + bIzq) + '.<br>' +
              'Igualalo a ' + valorDerecha + ' y pasa el ' + bIzq + '. &iquest;Cuanto queda a la derecha?',
            resp: R.numero(valorDerecha - bIzq, { dec: 2 }),
            pista: valorDerecha + ' &minus; (' + bIzq + ').',
            despues: 'Queda ' + c + 'm = ' + (valorDerecha - bIzq) + '.' },
          { rotulo: 'Valor de m',
            pregunta: 'Divide entre ' + c + '. (4 decimales)',
            resp: R.numero(m, { dec: 4, tol: 0.01 }),
            pista: (valorDerecha - bIzq) + ' &divide; ' + c + '.',
            despues: 'Con esa m los dos trozos se tocan y la grafica queda de una sola pieza.' }
        ],
        final: 'm = <b>' + m + '</b>',
        receta: ['Continua = sin saltos = los dos trozos coinciden en la frontera',
          'Calcular el valor del trozo que ya esta completo',
          'Igualar el otro trozo a ese valor',
          'Despejar el parametro',
          'Formalmente: limite por la izquierda = limite por la derecha = f(c)']
      }),
      enunciado: 'Sea f(x) = mx ' + (bIzq < 0 ? '&minus; ' + (-bIzq) : '+ ' + bIzq) + ' si x &lt; ' + c + ',<br>' +
        'y f(x) = ' + F.une([F.term(a2, 'x', 2), String(b2)]) + ' si x &ge; ' + c + '.<br>' +
        '&iquest;Que valor debe tener m para que f sea continua en x = ' + c + '?',
      respuesta: R.numero(m, { dec: 4, tol: 0.01 }),
      pistas: ['Para que sea continua, los dos limites laterales deben coincidir con f(' + c + ').',
        'Por la derecha: f(' + c + ') = ' + valorDerecha + '. Iguala m(' + c + ') ' + (bIzq < 0 ? '&minus; ' + (-bIzq) : '+ ' + bIzq) + ' = ' + valorDerecha + '.'],
      solucion: ['Limite por la derecha: ' + a2 + '(' + c + ')&sup2; ' + (b2 < 0 ? '&minus; ' + (-b2) : '+ ' + b2) + ' = ' + valorDerecha,
        'Limite por la izquierda: m(' + c + ') ' + (bIzq < 0 ? '&minus; ' + (-bIzq) : '+ ' + bIzq),
        'Los igualo: ' + c + 'm = ' + (valorDerecha - bIzq),
        'm = <b>' + m + '</b>']
    };
  };

  EJ.tema({
    id: 'limites',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Limites',
    descripcion: 'Sustitucion directa, indeterminaciones 0/0, limites al infinito y limites trigonometricos.',
    formulario: 'Si al sustituir no hay problema, el limite es ese valor.<br>' +
      'Si aparece 0/0: factoriza y simplifica, o multiplica por el conjugado.<br>' +
      'Al infinito en una racional: manda el termino de mayor grado (iguales &rarr; cociente de coeficientes).<br>' +
      'Trigonometricos clave: lim<sub>x&rarr;0</sub> (sen x)/x = 1, lim<sub>x&rarr;0</sub> (1&minus;cos x)/x = 0',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, val, p;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['polinomio', 'Sustitucion directa'],
          ['racional', 'Limite de una racional']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'polinomio') {
          p = [r.enteroNoCero(-4, 4), r.entero(-7, 7), r.entero(-9, 9)];
          a = r.enteroNoCero(-4, 4);
          val = P.evalua(p, a);
          guiaDelPaso = G({
            intro: 'Queremos ' + lim(P.texto(p), a) + '.<br>' +
              'Este es el caso facil: en un polinomio se puede <b>sustituir y ya</b>. Pero conviene entender por que.',
            pasos: [
              { rotulo: 'Se puede sustituir',
                pregunta: '&iquest;Puede fallar algo al meter x = ' + a + ' en un polinomio?',
                resp: R.opcion(['No: no hay divisiones ni raices, nada se rompe', 'Si, siempre hay que factorizar primero'], 0),
                pista: 'Los problemas de los limites vienen de dividir entre cero o de raices de negativos. Un polinomio no tiene ninguna de las dos cosas.',
                despues: 'A eso se le llama que el polinomio es <b>continuo</b>: el limite es exactamente el valor de la funcion.' },
              { rotulo: '(' + a + ')&sup2;',
                pregunta: 'Sustituimos. Empieza por la potencia: (' + a + ')&sup2;',
                resp: R.numero(a * a, { dec: 0 }),
                pista: a < 0 ? 'Negativo al cuadrado sale positivo.' : 'Multiplica ' + a + ' por si mismo.',
                despues: '' },
              { rotulo: 'Termino en x&sup2;',
                pregunta: 'Multiplica por su coeficiente: ' + p[0] + ' &times; ' + (a * a),
                resp: R.numero(p[0] * a * a, { dec: 0 }),
                pista: 'Cuidado con los signos.', despues: '' },
              { rotulo: 'Termino en x',
                pregunta: 'Ahora el de en medio: ' + p[1] + ' &times; (' + a + ')',
                resp: R.numero(p[1] * a, { dec: 0 }),
                pista: 'Multiplicacion directa.', despues: '' },
              { rotulo: 'Limite',
                pregunta: 'Suma los tres: ' + (p[0] * a * a) + ' + (' + (p[1] * a) + ') + (' + p[2] + ')',
                resp: R.numero(val, { dec: 2 }),
                pista: 'De dos en dos, con cuidado de los signos.',
                despues: '' }
            ],
            final: 'El limite es <b>' + val + '</b>',
            receta: ['Los polinomios son continuos: se sustituye directo',
              'Poner el valor entre parentesis',
              'Resolver primero las potencias',
              'Si al sustituir NO se rompe nada, ese valor ES el limite']
          });
          enun = 'Calcula el limite:<br>' + lim(P.texto(p), a);
          resp = R.numero(val, { dec: 2 });
          pistas = ['Los polinomios son continuos: basta con sustituir.',
            'Sustituye x = ' + a + ' con cuidado de los signos.'];
          sol = ['El polinomio es continuo, asi que sustituyo directamente',
            'f(' + a + ') = ' + p[0] + '(' + a + ')&sup2; + (' + p[1] + ')(' + a + ') + (' + p[2] + ')',
            'Limite = <b>' + val + '</b>'];
        } else {
          var num = [r.enteroNoCero(-4, 4), r.entero(-8, 8)];
          var den = [1, r.enteroNoCero(-6, 6)];
          a = r.enteroNoCero(-5, 5);
          while (P.evalua(den, a) === 0) a = r.enteroNoCero(-5, 5);
          val = P.evalua(num, a) / P.evalua(den, a);
          guiaDelPaso = G({
            intro: 'Queremos ' + lim(F.frac(P.texto(num), P.texto(den)), a) + '.<br>' +
              'En cualquier fraccion, lo <b>primero</b> es mirar el denominador. Si no se anula, el resto es sustituir.',
            pasos: [
              { rotulo: 'Denominador en x = ' + a,
                pregunta: 'Sustituye x = ' + a + ' solo en el denominador ' + P.texto(den) + '.<br>&iquest;Cuanto da?',
                resp: R.numero(P.evalua(den, a), { dec: 2 }),
                pista: 'Sustituye y opera: ' + a + ' ' + (den[1] < 0 ? '&minus; ' + (-den[1]) : '+ ' + den[1]) + '.',
                despues: 'Dio ' + P.evalua(den, a) + ', que NO es cero. Eso lo cambia todo: no hay indeterminacion.' },
              { rotulo: 'Entonces se sustituye',
                pregunta: 'Con el denominador distinto de cero, &iquest;que se puede hacer?',
                resp: R.opcion(['Sustituir directamente y dividir', 'Factorizar para cancelar algo'], 0),
                pista: 'Factorizar solo hace falta cuando sale 0/0. Aqui no es el caso.',
                despues: '' },
              { rotulo: 'Numerador',
                pregunta: 'Calcula el numerador ' + P.texto(num) + ' en x = ' + a,
                resp: R.numero(P.evalua(num, a), { dec: 2 }),
                pista: num[0] + '(' + a + ') ' + (num[1] < 0 ? '&minus; ' + (-num[1]) : '+ ' + num[1]) + '.',
                despues: '' },
              { rotulo: 'Limite',
                pregunta: 'Divide: ' + P.evalua(num, a) + ' &divide; ' + P.evalua(den, a) + ' (4 decimales)',
                resp: R.numero(val, { dec: 4, tol: 0.001 }),
                pista: 'Division directa.',
                despues: '' }
            ],
            final: 'El limite es <b>' + F.n(val, 4) + '</b>',
            receta: ['En una fraccion, revisar SIEMPRE primero el denominador',
              'Si no se anula: sustituir y dividir, se acabo',
              'Si se anula y el numerador no: hay asintota, el limite es infinito',
              'Si se anulan los dos: 0/0, hay que factorizar']
          });
          enun = 'Calcula el limite:<br>' + lim(F.frac(P.texto(num), P.texto(den)), a);
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['Revisa primero si el denominador se hace cero al sustituir.',
            'Denominador en x = ' + a + ': ' + P.evalua(den, a) + ' (distinto de cero, asi que se puede sustituir).'];
          sol = ['Sustituyo: numerador = ' + P.evalua(num, a) + ', denominador = ' + P.evalua(den, a),
            'Como el denominador no es cero, el limite es el cociente',
            'Limite = ' + P.evalua(num, a) + '/' + P.evalua(den, a) + ' = <b>' + F.n(val, 4) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['factorizar', 'Indeterminacion 0/0: factorizar'],
          ['diferenciaCuadrados', 'Diferencia de cuadrados'],
          ['infinito', 'Limite al infinito'],
          ['asintotaVertical', 'Asintota vertical']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'factorizar') {
          a = r.enteroNoCero(-6, 6);
          b = r.enteroNoCero(-7, 7);
          while (b === a) b = r.enteroNoCero(-7, 7);
          var arriba = P.deRaices([a, b]);
          val = a - b;
          guiaDelPaso = EJ.guia.limiteFactorizar(a, b);
          enun = 'Calcula el limite:<br>' + lim(F.frac(P.texto(arriba), 'x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a)), a);
          resp = R.numero(val, { dec: 2 });
          pistas = ['Al sustituir sale 0/0: hay que factorizar el numerador.',
            'El numerador se factoriza como (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ').'];
          sol = ['Al sustituir queda 0/0: indeterminado',
            'Factorizo: ' + P.texto(arriba) + ' = (x ' + (a < 0 ? '+ ' + (-a) : '&minus; ' + a) + ')(x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ')',
            'Simplifico el factor repetido y queda x ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b),
            'Ahora si sustituyo: ' + a + ' ' + (b < 0 ? '+ ' + (-b) : '&minus; ' + b) + ' = <b>' + val + '</b>'];
        } else if (t === 'diferenciaCuadrados') {
          a = r.entero(2, 9);
          val = 2 * a;
          guiaDelPaso = G({
            intro: 'Queremos ' + lim(F.frac('x&sup2; &minus; ' + (a * a), 'x &minus; ' + a), a) + '.<br>' +
              'Al sustituir va a salir <b>0/0</b>. Eso no significa que no exista: significa que hay que reescribir la fraccion.',
            pasos: [
              { rotulo: 'Sustituir primero',
                pregunta: 'Prueba a sustituir x = ' + a + '. &iquest;Que sale?',
                resp: R.opcion(['0/0, una indeterminacion', 'Un numero normal'], 0),
                pista: 'Arriba: ' + (a * a) + ' &minus; ' + (a * a) + ' = 0. Abajo: ' + a + ' &minus; ' + a + ' = 0.',
                despues: 'Siempre se prueba a sustituir primero: solo si sale 0/0 hay que trabajar mas.' },
              { rotulo: 'Que significa 0/0',
                pregunta: '&iquest;Que quiere decir que salga 0/0?',
                resp: R.opcion(['Que arriba y abajo comparten un factor que se puede cancelar',
                  'Que el limite no existe'], 0),
                pista: 'Si los dos se hacen cero en x = ' + a + ', los dos tienen dentro el factor (x &minus; ' + a + '). ' +
                  '0/0 no es una respuesta: es un aviso de "reescribeme".',
                despues: 'Asi que hay que sacar ese factor a la vista, factorizando.' },
              { rotulo: 'Factorizar arriba',
                pregunta: 'x&sup2; &minus; ' + (a * a) + ' es una diferencia de cuadrados.<br>&iquest;Cual es la raiz de ' + (a * a) + '?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'El numero que multiplicado por si mismo da ' + (a * a) + '.',
                despues: 'Entonces x&sup2; &minus; ' + (a * a) + ' = (x + ' + a + ')(x &minus; ' + a + '), y ahi aparece el factor que buscabamos.' },
              { rotulo: 'Cancelar',
                pregunta: 'Queda ' + F.frac('(x + ' + a + ')(x &minus; ' + a + ')', 'x &minus; ' + a) + '.<br>&iquest;Que queda al cancelar?',
                resp: R.expresion('x+' + a, { mostrar: 'x + ' + a }),
                pista: 'El (x &minus; ' + a + ') de arriba y el de abajo se van.',
                despues: 'Se puede cancelar porque x se ACERCA a ' + a + ' pero nunca vale ' + a + ': el factor nunca es exactamente 0.' },
              { rotulo: 'Limite',
                pregunta: 'Ahora si: sustituye x = ' + a + ' en x + ' + a,
                resp: R.numero(val, { dec: 2 }),
                pista: a + ' + ' + a + '.',
                despues: '' }
            ],
            final: 'El limite es <b>' + val + '</b>',
            receta: ['Probar a sustituir SIEMPRE primero',
              '0/0 no es respuesta: es un aviso de que hay factor comun',
              'Factorizar y cancelar el factor que se anula',
              'Se puede cancelar porque x se acerca pero no llega',
              'Volver a sustituir en lo que quedo']
          });
          enun = 'Calcula el limite:<br>' + lim(F.frac('x&sup2; &minus; ' + (a * a), 'x &minus; ' + a), a);
          resp = R.numero(val, { dec: 2 });
          pistas = ['Es una diferencia de cuadrados: x&sup2; &minus; ' + (a * a) + ' = (x + ' + a + ')(x &minus; ' + a + ').',
            'Al simplificar queda x + ' + a + '.'];
          sol = ['Sustituir da 0/0',
            'x&sup2; &minus; ' + (a * a) + ' = (x + ' + a + ')(x &minus; ' + a + ')',
            'Simplifico (x &minus; ' + a + ') y queda x + ' + a,
            'Limite = ' + a + ' + ' + a + ' = <b>' + val + '</b>'];
        } else {
          var gn = r.entero(1, 3), gd = r.entero(1, 3);
          var cn = r.enteroNoCero(-8, 8), cd = r.enteroNoCero(-8, 8);
          var pn = [cn], pd = [cd];
          for (var i = 0; i < gn; i++) pn.push(r.entero(-6, 6));
          for (var j = 0; j < gd; j++) pd.push(r.entero(-6, 6));
          var texto, sugerencia;
          if (gn === gd) { val = cn / cd; sugerencia = 'Los grados son iguales, asi que el limite es el cociente de los coeficientes principales.'; }
          else if (gn < gd) { val = 0; sugerencia = 'El denominador crece mucho mas rapido, asi que el limite es 0.'; }
          else { val = null; sugerencia = 'El numerador crece mas rapido: el limite es infinito (no existe un valor finito).'; }
          texto = F.frac(P.texto(pn), P.texto(pd));
          if (val === null) {
            enun = 'Calcula el limite:<br>' + lim(texto, '&infin;');
            resp = R.opcion(['El limite es 0', 'El limite es ' + F.n(cn / cd, 4), 'El limite es infinito (no existe finito)'], 2);
          } else {
            enun = 'Calcula el limite (4 decimales):<br>' + lim(texto, '&infin;');
            resp = R.numero(val, { dec: 4, tol: 0.001 });
          }
          guiaDelPaso = G({
            intro: 'Queremos ' + lim(texto, '&infin;') + '.<br>' +
              'Cuando x se hace gigante, de cada polinomio <b>solo importa su termino de mayor grado</b>: los demas se vuelven insignificantes al lado.',
            pasos: [
              { rotulo: 'Grado de arriba',
                pregunta: '&iquest;Cual es el mayor exponente del numerador?',
                resp: R.numero(gn, { dec: 0 }),
                pista: 'Mira ' + P.texto(pn) + ' y quedate con el exponente mas grande.',
                despues: 'Con x enorme, ' + P.texto(pn) + ' se comporta como ' + F.term(cn, 'x', gn) + '.' },
              { rotulo: 'Grado de abajo',
                pregunta: '&iquest;Y el del denominador?',
                resp: R.numero(gd, { dec: 0 }),
                pista: 'Lo mismo con ' + P.texto(pd) + '.',
                despues: 'Asi que la pelea es entre ' + F.term(cn, 'x', gn) + ' y ' + F.term(cd, 'x', gd) + '.' },
              { rotulo: 'Quien crece mas',
                pregunta: 'Comparando los grados ' + gn + ' y ' + gd + ', &iquest;quien gana la carrera?',
                resp: R.opcion(['Gana el numerador: crece mas rapido',
                  'Gana el denominador: crece mas rapido',
                  'Empatan: crecen al mismo ritmo'], gn > gd ? 0 : (gn < gd ? 1 : 2)),
                pista: 'A mayor grado, crecimiento mas rapido. Grado 3 aplasta a grado 2, y ese a grado 1.',
                despues: gn > gd ? 'Si arriba crece mucho mas, la fraccion se dispara.'
                  : gn < gd ? 'Si abajo crece mucho mas, la fraccion se hace diminuta.'
                    : 'Si empatan, sobrevive solo la proporcion entre sus coeficientes.' },
              (val === null
                ? { rotulo: 'Limite',
                  pregunta: '&iquest;Cuanto vale el limite?',
                  resp: R.opcion(['El limite es 0', 'El limite es ' + F.n(cn / cd, 4), 'El limite es infinito (no existe finito)'], 2),
                  pista: 'El numerador domina: la fraccion crece sin parar y no se estaciona en ningun numero.',
                  despues: '' }
                : { rotulo: 'Limite',
                  pregunta: '&iquest;Cuanto vale el limite? (4 decimales)',
                  resp: R.numero(val, { dec: 4, tol: 0.001 }),
                  pista: gn < gd ? 'El denominador aplasta al numerador: la fraccion tiende a 0.'
                    : 'Grados iguales: queda el cociente de los coeficientes principales, ' + cn + '/' + cd + '.',
                  despues: '' })
            ],
            final: 'El limite es <b>' + (val === null ? 'infinito (no existe finito)' : F.n(val, 4)) + '</b>',
            receta: ['Con x &rarr; &infin; solo manda el termino de mayor grado',
              'Grado de arriba MENOR: el limite es 0',
              'Grados IGUALES: cociente de los coeficientes principales',
              'Grado de arriba MAYOR: el limite es infinito',
              'Los terminos de grado bajo y las constantes no influyen']
          });
          pistas = ['Compara el grado del numerador (' + gn + ') con el del denominador (' + gd + ').',
            sugerencia];
          sol = ['Grado del numerador: ' + gn + '; grado del denominador: ' + gd,
            'Divido todo entre x elevado al mayor grado del denominador',
            sugerencia,
            'Limite = <b>' + (val === null ? 'infinito' : F.n(val, 4)) + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['conjugado', 'Radicales: multiplicar por el conjugado'],
          ['trigonometrico', 'Limites trigonometricos'],
          ['lateral', 'Limites laterales'],
          ['continuidad', 'Continuidad de una funcion'],
          ['cubico', 'Diferencia de cubos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'conjugado') {
          a = r.elige([1, 4, 9, 16, 25]);
          val = 1 / (2 * Math.sqrt(a));
          var rz = Math.sqrt(a);
          guiaDelPaso = G({
            intro: 'Queremos ' + lim(F.frac('&radic;<span class="rad">x + ' + a + '</span> &minus; ' + rz, 'x'), 0) + '.<br>' +
              'Sale 0/0, pero aqui no se puede factorizar: estorba la raiz. El truco es <b>multiplicar por el conjugado</b> para quitarla.',
            pasos: [
              { rotulo: 'Sustituir primero',
                pregunta: 'Sustituye x = 0. &iquest;Que sale?',
                resp: R.opcion(['0/0, indeterminado', 'Un numero normal'], 0),
                pista: 'Arriba: &radic;<span class="rad">' + a + '</span> &minus; ' + rz + ' = ' + rz + ' &minus; ' + rz + ' = 0. Abajo: 0.',
                despues: 'Hay que reescribir, pero factorizar no sirve con una raiz de por medio.' },
              { rotulo: 'Por que el conjugado',
                pregunta: 'Multiplicamos arriba y abajo por &radic;<span class="rad">x + ' + a + '</span> <b>+</b> ' + rz + '.<br>&iquest;Por que ayuda eso?',
                resp: R.opcion(['Porque (A &minus; B)(A + B) = A&sup2; &minus; B&sup2; y al elevar al cuadrado la raiz desaparece',
                  'Porque simplifica el denominador'], 0),
                pista: 'El conjugado es el mismo binomio con el signo de en medio cambiado. Su producto es una diferencia de cuadrados, ' +
                  'y elevar &radic;<span class="rad">x + ' + a + '</span> al cuadrado la limpia.',
                despues: 'Multiplicar arriba y abajo por lo mismo no cambia el valor: es multiplicar por 1 disfrazado.' },
              { rotulo: 'Numerador',
                pregunta: 'Arriba queda (x + ' + a + ') &minus; ' + a + '.<br>&iquest;Que queda simplificado?',
                resp: R.expresion('x', { mostrar: 'x' }),
                pista: 'El ' + a + ' y el &minus;' + a + ' se cancelan.',
                despues: 'Y esa x es justo lo que hay abajo: por fin aparecio el factor comun.' },
              { rotulo: 'Cancelar',
                pregunta: 'La x de arriba se cancela con la de abajo.<br>&iquest;Que fraccion queda?',
                resp: R.opcion([F.frac(1, '&radic;<span class="rad">x + ' + a + '</span> + ' + rz),
                  F.frac('x', '&radic;<span class="rad">x + ' + a + '</span> + ' + rz)], 0),
                pista: 'Arriba queda 1 (no queda 0: al cancelar la x queda el 1 invisible que la multiplicaba).',
                despues: 'Y esta fraccion ya no se indetermina al sustituir.' },
              { rotulo: 'Limite',
                pregunta: 'Sustituye x = 0: 1 &divide; (' + rz + ' + ' + rz + ') (4 decimales)',
                resp: R.numero(val, { dec: 4, tol: 0.001 }),
                pista: '1 &divide; ' + (2 * rz) + '.',
                despues: '' }
            ],
            final: 'El limite es <b>' + F.n(val, 4) + '</b>',
            receta: ['0/0 con una raiz: multiplicar por el conjugado',
              'Conjugado = mismo binomio con el signo de en medio cambiado',
              'Arriba y abajo, para no cambiar el valor',
              '(A &minus; B)(A + B) = A&sup2; &minus; B&sup2; elimina la raiz',
              'Cancelar y volver a sustituir']
          });
          enun = 'Calcula el limite (4 decimales):<br>' +
            lim(F.frac('&radic;<span class="rad">x + ' + a + '</span> &minus; ' + Math.sqrt(a), 'x'), 0);
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['Sale 0/0. Multiplica arriba y abajo por el conjugado &radic;<span class="rad">x + ' + a + '</span> + ' + Math.sqrt(a) + '.',
            'El numerador se convierte en (x + ' + a + ') &minus; ' + a + ' = x, que se cancela con el denominador.'];
          sol = ['Multiplico por el conjugado arriba y abajo',
            'Numerador: (x + ' + a + ') &minus; ' + a + ' = x',
            'Queda 1/(&radic;<span class="rad">x + ' + a + '</span> + ' + Math.sqrt(a) + ')',
            'Sustituyo x = 0: 1/(' + Math.sqrt(a) + ' + ' + Math.sqrt(a) + ') = <b>' + F.n(val, 4) + '</b>'];
        } else if (t2 === 'trigonometrico') {
          var k = r.entero(2, 9), m = r.entero(2, 9);
          var tipo = r.elige(['senEntreX', 'senEntreSen', 'unoMenosCos', 'tanEntreX']);
          if (tipo === 'senEntreX') {
            val = k;
            enun = 'Calcula el limite:<br>' + lim(F.frac('sen(' + k + 'x)', 'x'), 0);
            pistas = ['Recuerda lim<sub>u&rarr;0</sub> (sen u)/u = 1: acomoda la expresion para que abajo aparezca ' + k + 'x.',
              'Multiplica y divide entre ' + k + ': ' + k + ' &middot; sen(' + k + 'x)/(' + k + 'x).'];
            sol = ['Multiplico y divido entre ' + k + ': ' + k + ' &middot; ' + F.frac('sen(' + k + 'x)', k + 'x'),
              'La parte de la fraccion tiende a 1',
              'Limite = <b>' + k + '</b>'];
          } else if (tipo === 'senEntreSen') {
            val = k / m;
            enun = 'Calcula el limite (4 decimales):<br>' + lim(F.frac('sen(' + k + 'x)', 'sen(' + m + 'x)'), 0);
            pistas = ['Acomoda cada seno con su propio argumento abajo.',
              'sen(' + k + 'x)/(' + k + 'x) &middot; (' + m + 'x)/sen(' + m + 'x) &middot; ' + k + '/' + m + '.'];
            sol = ['Reescribo: ' + F.frac('sen(' + k + 'x)', k + 'x') + ' &middot; ' + F.frac(m + 'x', 'sen(' + m + 'x)') + ' &middot; ' + F.frac(k, m),
              'Las dos primeras fracciones tienden a 1',
              'Limite = ' + k + '/' + m + ' = <b>' + F.n(val, 4) + '</b>'];
          } else if (tipo === 'tanEntreX') {
            val = k;
            enun = 'Calcula el limite:<br>' + lim(F.frac('tan(' + k + 'x)', 'x'), 0);
            pistas = ['tan u = sen u / cos u, y cos 0 = 1.',
              'Queda ' + k + ' &middot; sen(' + k + 'x)/(' + k + 'x) &middot; 1/cos(' + k + 'x).'];
            sol = ['tan(' + k + 'x)/x = ' + F.frac('sen(' + k + 'x)', 'x cos(' + k + 'x)'),
              'Acomodo: ' + k + ' &middot; sen(' + k + 'x)/(' + k + 'x) &middot; 1/cos(' + k + 'x)',
              'Los limites valen 1 y 1, asi que el limite es <b>' + k + '</b>'];
          } else {
            val = 0;
            enun = 'Calcula el limite:<br>' + lim(F.frac('1 &minus; cos(' + k + 'x)', 'x'), 0);
            pistas = ['Multiplica por el conjugado 1 + cos(' + k + 'x).',
              'Se llega a sen&sup2;(' + k + 'x)/(x(1 + cos ' + k + 'x)), y eso tiende a 0.'];
            sol = ['Multiplico arriba y abajo por 1 + cos(' + k + 'x)',
              'Numerador: 1 &minus; cos&sup2;(' + k + 'x) = sen&sup2;(' + k + 'x)',
              'Queda ' + k + ' &middot; sen(' + k + 'x)/(' + k + 'x) &middot; sen(' + k + 'x)/(1 + cos(' + k + 'x)) &rarr; ' + k + ' &middot; 1 &middot; 0',
              'Limite = <b>0</b>'];
          }
          var pasosTr = [
            { rotulo: 'El limite clave',
              pregunta: 'Todo esto se apoya en un solo hecho: lim<sub>u&rarr;0</sub> ' + F.frac('sen u', 'u') + ' = 1.<br>' +
                '&iquest;Que hace falta para poder usarlo?',
              resp: R.opcion(['Que abajo este EXACTAMENTE lo mismo que va dentro del seno',
                'Que abajo haya una x sola'], 0),
              pista: 'La formula dice sen(u)/u con la MISMA u en los dos sitios. Si arriba hay sen(3x), abajo tiene que haber 3x.',
              despues: 'Todo el trabajo consiste en acomodar la expresion para que eso encaje.' }
          ];
          if (tipo === 'senEntreX') {
            pasosTr.push({
              rotulo: 'Que falta abajo',
              pregunta: 'Arriba hay sen(' + k + 'x) pero abajo solo x.<br>&iquest;Por cuanto hay que multiplicar el denominador para que quede ' + k + 'x?',
              resp: R.numero(k, { dec: 0 }),
              pista: 'Para pasar de x a ' + k + 'x hay que multiplicar por ' + k + '.',
              despues: 'Pero no se puede multiplicar abajo y ya: hay que multiplicar tambien arriba, para no cambiar el valor. ' +
                'Queda ' + k + ' &middot; ' + F.frac('sen(' + k + 'x)', k + 'x') + '.'
            });
            pasosTr.push({
              rotulo: 'Limite',
              pregunta: 'La fraccion tiende a 1. &iquest;Que queda entonces?',
              resp: R.numero(val, { dec: 4, tol: 0.001 }),
              pista: 'Queda el ' + k + ' que sacamos fuera, multiplicado por 1.',
              despues: ''
            });
          } else if (tipo === 'senEntreSen') {
            pasosTr.push({
              rotulo: 'Acomodar los dos',
              pregunta: 'Hay dos senos, cada uno con su argumento. Se reescribe como<br>' +
                F.frac('sen(' + k + 'x)', k + 'x') + ' &middot; ' + F.frac(m + 'x', 'sen(' + m + 'x)') + ' &middot; ' + F.frac(k + 'x', m + 'x') + '<br>' +
                '&iquest;A cuanto tiende cada una de las dos primeras?',
              resp: R.numero(1, { dec: 0 }),
              pista: 'Las dos tienen la forma sen(u)/u (la segunda esta volteada, pero 1 entre 1 sigue siendo 1).',
              despues: 'Asi que solo sobrevive la tercera fraccion.'
            });
            pasosTr.push({
              rotulo: 'Limite',
              pregunta: 'Esa tercera fraccion simplifica a ' + k + '/' + m + '.<br>&iquest;Cuanto vale? (4 decimales)',
              resp: R.numero(val, { dec: 4, tol: 0.001 }),
              pista: k + ' &divide; ' + m + '.',
              despues: 'Atajo util: en sen(ax)/sen(bx) con x&rarr;0, el limite es siempre a/b.'
            });
          } else if (tipo === 'tanEntreX') {
            pasosTr.push({
              rotulo: 'Abrir la tangente',
              pregunta: 'Aqui hay una tangente, no un seno. &iquest;Como se abre?',
              resp: R.opcion(['tan u = ' + F.frac('sen u', 'cos u'), 'tan u = ' + F.frac('cos u', 'sen u')], 0),
              pista: 'Tangente es seno entre coseno. Asi aparece el seno que necesitamos.',
              despues: 'Queda ' + k + ' &middot; ' + F.frac('sen(' + k + 'x)', k + 'x') + ' &middot; ' + F.frac(1, 'cos(' + k + 'x)') + '.'
            });
            pasosTr.push({
              rotulo: 'El coseno',
              pregunta: '&iquest;A cuanto tiende cos(' + k + 'x) cuando x &rarr; 0?',
              resp: R.numero(1, { dec: 0 }),
              pista: 'cos(0) = 1. El coseno no estorba.',
              despues: 'Asi que ese factor desaparece y queda igual que el caso del seno.'
            });
            pasosTr.push({
              rotulo: 'Limite',
              pregunta: '&iquest;Cuanto vale el limite?',
              resp: R.numero(val, { dec: 4, tol: 0.001 }),
              pista: k + ' &middot; 1 &middot; 1.',
              despues: ''
            });
          } else {
            pasosTr.push({
              rotulo: 'Conjugado',
              pregunta: 'Aqui no hay seno todavia. Multiplicamos arriba y abajo por 1 + cos(' + k + 'x).<br>' +
                'Arriba queda 1 &minus; cos&sup2;(' + k + 'x). &iquest;A que es igual eso?',
              resp: R.opcion(['sen&sup2;(' + k + 'x)', 'cos&sup2;(' + k + 'x)'], 0),
              pista: 'De la identidad sen&sup2; + cos&sup2; = 1 se despeja 1 &minus; cos&sup2; = sen&sup2;.',
              despues: 'Ya tenemos senos: ahora si se puede usar el limite clave.'
            });
            pasosTr.push({
              rotulo: 'El segundo factor',
              pregunta: 'Queda ' + k + ' &middot; ' + F.frac('sen(' + k + 'x)', k + 'x') + ' &middot; ' + F.frac('sen(' + k + 'x)', '1 + cos(' + k + 'x)') + '.<br>' +
                'La segunda fraccion, &iquest;a cuanto tiende?',
              resp: R.numero(0, { dec: 0 }),
              pista: 'Arriba sen(0) = 0 y abajo 1 + cos(0) = 2. Queda 0/2.',
              despues: 'Y cualquier cosa multiplicada por 0 es 0.'
            });
            pasosTr.push({
              rotulo: 'Limite',
              pregunta: '&iquest;Cuanto vale el limite?',
              resp: R.numero(val, { dec: 4, tol: 0.001 }),
              pista: k + ' &middot; 1 &middot; 0.',
              despues: 'Este es el otro limite que conviene memorizar: (1 &minus; cos u)/u &rarr; 0.'
            });
          }
          guiaDelPaso = G({
            intro: 'Al sustituir x = 0 sale <b>0/0</b>, y aqui no se puede factorizar ni usar el conjugado.<br>' +
              'Con trigonometricas se usa otra herramienta: acomodar la expresion hasta que aparezca ' +
              F.frac('sen u', 'u') + ', que tiende a 1.',
            pasos: pasosTr,
            final: 'El limite es <b>' + F.n(val, 4) + '</b>',
            receta: ['lim<sub>u&rarr;0</sub> sen(u)/u = 1, con la MISMA u arriba y abajo',
              'Multiplicar y dividir por lo que falte para que encaje',
              'tan u se abre como sen u / cos u',
              '1 &minus; cos&sup2; u = sen&sup2; u',
              'lim<sub>u&rarr;0</sub> (1 &minus; cos u)/u = 0']
          });
          resp = R.numero(val, { dec: 4, tol: 0.001 });
        } else if (t2 === 'lateral') {
          a = r.enteroNoCero(-5, 5);
          var m1 = r.enteroNoCero(-4, 4), b1 = r.entero(-6, 6);
          var m2 = r.enteroNoCero(-4, 4), b2 = r.entero(-6, 6);
          var izq = m1 * a + b1, der = m2 * a + b2;
          var existe = izq === der;
          guiaDelPaso = G({
            intro: 'Una funcion por tramos y queremos el limite en <b>x = ' + a + '</b>, justo donde cambia de regla.<br>' +
              'Hay que mirar por separado como llega la funcion <b>por la izquierda</b> y <b>por la derecha</b>.',
            pasos: [
              { rotulo: 'Que regla por la izquierda',
                pregunta: 'Acercandonos a ' + a + ' con valores un poco MENORES (' + (a - 1) + ', ' + (a - 0.1) + '...),<br>&iquest;que regla manda?',
                resp: R.opcion(['La primera, la de x &lt; ' + a, 'La segunda'], 0),
                pista: 'Por la izquierda significa valores menores que ' + a + ', y esa es justo la condicion del primer tramo.',
                despues: '' },
              { rotulo: 'Limite izquierdo',
                pregunta: 'Evalua ' + P.texto([m1, b1]) + ' en x = ' + a,
                resp: R.numero(izq, { dec: 2 }),
                pista: m1 + '(' + a + ') ' + (b1 < 0 ? '&minus; ' + (-b1) : '+ ' + b1) + '.',
                despues: 'Por la izquierda la funcion se acerca a ' + izq + '.' },
              { rotulo: 'Limite derecho',
                pregunta: 'Ahora por la derecha, con la segunda regla: evalua ' + P.texto([m2, b2]) + ' en x = ' + a,
                resp: R.numero(der, { dec: 2 }),
                pista: m2 + '(' + a + ') ' + (b2 < 0 ? '&minus; ' + (-b2) : '+ ' + b2) + '.',
                despues: 'Por la derecha se acerca a ' + der + '.' },
              { rotulo: '&iquest;Existe?',
                pregunta: 'Llegamos a ' + izq + ' por un lado y a ' + der + ' por el otro.<br>&iquest;Existe el limite?',
                resp: R.opcion(['Si existe', 'No existe'], existe ? 0 : 1),
                pista: existe ? 'Los dos lados coinciden, asi que la funcion se acerca a un unico valor.'
                  : 'Los dos lados dan valores distintos: la funcion no se acerca a UN solo numero, da un salto.',
                despues: existe ? 'Cuando los dos laterales coinciden, ese valor comun es el limite.'
                  : 'Un limite existe solo si los dos laterales coinciden. Aqui hay un escalon en x = ' + a + '.' },
              { rotulo: 'Respuesta',
                pregunta: 'Escribe los dos limites laterales y si el limite existe.',
                resp: R.varios([
                  { etiqueta: 'Limite por la izquierda', resp: R.numero(izq, { dec: 2 }) },
                  { etiqueta: 'Limite por la derecha', resp: R.numero(der, { dec: 2 }) },
                  { etiqueta: '&iquest;Existe el limite?', resp: R.opcion(['Si existe', 'No existe'], existe ? 0 : 1) }
                ]),
                pista: izq + ', ' + der + ' y ' + (existe ? 'si' : 'no') + ' existe.',
                despues: '' }
            ],
            final: existe ? 'Los dos laterales valen ' + izq + ': el limite <b>existe</b> y vale <b>' + izq + '</b>'
              : 'Los laterales valen ' + izq + ' y ' + der + ': el limite <b>no existe</b>',
            receta: ['Por la izquierda = valores menores; por la derecha = mayores',
              'Cada lado usa la regla de SU tramo',
              'Calcular los dos por separado',
              'El limite existe solo si los dos coinciden',
              'Si no coinciden, la grafica tiene un salto ahi']
          });
          enun = 'Sea f(x) = ' + P.texto([m1, b1]) + ' si x &lt; ' + a + ', y f(x) = ' + P.texto([m2, b2]) + ' si x &ge; ' + a + '.<br>' +
            'Calcula los limites laterales en x = ' + a + ' y di si el limite existe.';
          resp = R.varios([
            { etiqueta: 'Limite por la izquierda', resp: R.numero(izq, { dec: 2 }) },
            { etiqueta: 'Limite por la derecha', resp: R.numero(der, { dec: 2 }) },
            { etiqueta: '&iquest;Existe el limite?', resp: R.opcion(['Si existe', 'No existe'], existe ? 0 : 1) }
          ]);
          pistas = ['Por la izquierda usa la primera regla; por la derecha, la segunda.',
            'El limite existe solo si los dos laterales coinciden.'];
          sol = ['Por la izquierda: ' + P.texto([m1, b1]) + ' en x = ' + a + ' da <b>' + izq + '</b>',
            'Por la derecha: ' + P.texto([m2, b2]) + ' en x = ' + a + ' da <b>' + der + '</b>',
            existe ? 'Coinciden, asi que el limite <b>si existe</b> y vale ' + izq : 'No coinciden, asi que el limite <b>no existe</b>'];
        } else {
          a = r.enteroNoCero(-4, 4);
          val = 3 * a * a;
          guiaDelPaso = G({
            intro: 'Otro <b>0/0</b>, pero ahora con cubos.<br>' +
              'Mismo plan de siempre: factorizar para que aparezca el factor que se anula, cancelarlo y volver a sustituir.',
            pasos: [
              { rotulo: 'Sustituir primero',
                pregunta: 'Sustituye x = ' + a + '. &iquest;Que sale?',
                resp: R.opcion(['0/0, indeterminado', 'Un numero normal'], 0),
                pista: 'Arriba: (' + a + ')&sup3; = ' + (a * a * a) + ', menos ' + (a * a * a) + ', da 0. Abajo tambien 0.',
                despues: 'Hay factor comun escondido. Toca factorizar el de arriba.' },
              { rotulo: 'Encontrar b',
                pregunta: 'Arriba hay una <b>diferencia de cubos</b> x&sup3; &minus; b&sup3;.<br>&iquest;Que numero al cubo da ' + (a * a * a) + '?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'Prueba: ' + a + ' &times; ' + a + ' &times; ' + a + ' = ' + (a * a * a) + '.',
                despues: 'La formula es a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;), asi que sale el factor (x &minus; ' + a + ') que buscabamos.' },
              { rotulo: 'El trinomio',
                pregunta: 'El segundo factor es (x&sup2; + bx + b&sup2;).<br>&iquest;Que coeficiente acompana a la x?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'Es b, o sea ' + a + '. Ojo al signo: en la diferencia de cubos el termino de en medio va SUMANDO.',
                despues: 'Queda (x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ')(x&sup2; + ' + a + 'x + ' + (a * a) + ').' },
              { rotulo: 'Cancelar y sustituir',
                pregunta: 'Se cancela (x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ') y queda el trinomio.<br>' +
                  'Sustituye x = ' + a + ': ' + (a * a) + ' + ' + (a * a) + ' + ' + (a * a),
                resp: R.numero(val, { dec: 2 }),
                pista: 'Los tres terminos dan lo mismo, ' + (a * a) + ', asi que es 3 &times; ' + (a * a) + '.',
                despues: 'Curiosidad: siempre sale 3a&sup2;. Es la derivada de x&sup3; en ese punto, y no es casualidad.' }
            ],
            final: 'El limite es <b>' + val + '</b>',
            receta: ['0/0 otra vez: factorizar y cancelar',
              'Diferencia de cubos: a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;)',
              'El parentesis chico lleva el mismo signo; el trinomio, todo sumando',
              'Cancelar el factor que se anula y sustituir',
              'Este limite es justo la definicion de derivada de x&sup3;']
          });
          enun = 'Calcula el limite:<br>' + lim(F.frac('x&sup3; ' + (a > 0 ? '&minus; ' + (a * a * a) : '+ ' + (-a * a * a)), 'x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a))), a);
          resp = R.numero(val, { dec: 2 });
          pistas = ['Usa la diferencia de cubos: a&sup3; &minus; b&sup3; = (a &minus; b)(a&sup2; + ab + b&sup2;).',
            'Al simplificar queda x&sup2; + ' + a + 'x + ' + (a * a) + '.'];
          sol = ['Sustituir da 0/0',
            'Factorizo la diferencia de cubos: (x ' + (a > 0 ? '&minus; ' + a : '+ ' + (-a)) + ')(x&sup2; + ' + a + 'x + ' + (a * a) + ')',
            'Simplifico y sustituyo x = ' + a + ': ' + (a * a) + ' + ' + (a * a) + ' + ' + (a * a),
            'Limite = <b>' + val + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
