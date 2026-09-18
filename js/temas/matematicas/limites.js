/* Limites */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function lim(expr, a) {
    return '<span class="big">lim<sub>x&rarr;' + a + '</sub> ' + expr + '</span>';
  }

  var extra = {};

  extra.asintotaVertical = function (r) {
    var a = r.enteroNoCero(-6, 6), k = r.enteroNoCero(-9, 9);
    var alCuadrado = r.bool();
    var idx;
    if (alCuadrado) idx = k > 0 ? 0 : 1;   // (x-a)^2 siempre positivo
    else idx = 2;                          // signos distintos por cada lado
    return {
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
          resp = R.numero(val, { dec: 4, tol: 0.001 });
        } else if (t2 === 'lateral') {
          a = r.enteroNoCero(-5, 5);
          var m1 = r.enteroNoCero(-4, 4), b1 = r.entero(-6, 6);
          var m2 = r.enteroNoCero(-4, 4), b2 = r.entero(-6, 6);
          var izq = m1 * a + b1, der = m2 * a + b2;
          var existe = izq === der;
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

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
