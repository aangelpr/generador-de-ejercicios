/* Reglas de derivacion */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp, P = EJ.poli;

  function pr(p) { return '(' + P.texto(p) + ')'; }

  var G = EJ.guia.armar;

  var extra = {};

  extra.raiz = function (r) {
    var c = r.entero(2, 9);
    var conRaiz = r.bool();
    if (conRaiz) {
      return {
        guia: G({
          intro: 'Derivar <b>' + c + '&radic;<span class="rad">x</span></b>.<br>' +
            'No hay una "regla de la raiz": lo que hay es que <b>toda raiz es una potencia</b>. Se reescribe y ya es la regla de siempre.',
          pasos: [
            { rotulo: 'Raiz a potencia',
              seccion: 'Paso 1: raiz a potencia',
              queHacemos: 'Reescribimos la raiz como una potencia de exponente 1/2.',
              paraQue: 'No existe una "regla de la raiz": lo que hay es que toda raiz ES una potencia. Reescrita, ya es la regla de siempre.',
              queda: c + 'x' + F.sup('1/2'),
              pregunta: '&iquest;Como se escribe &radic;<span class="rad">x</span> como potencia?',
              resp: R.opcion(['x<sup>1/2</sup>', 'x&sup2;'], 0),
              pista: 'Raiz cuadrada es elevar a un medio. Y raiz cubica seria x<sup>1/3</sup>.',
              despues: 'Entonces f(x) = ' + c + 'x<sup>1/2</sup>, y ya se puede usar la regla de la potencia.' },
            { rotulo: 'Coeficiente',
              seccion: 'Paso 2: bajar el exponente',
              queHacemos: 'El exponente baja y multiplica al coeficiente.',
              paraQue: 'Es exactamente la regla de la potencia, sin nada nuevo.',
              queda: (c / 2) + 'x' + F.sup('?'),
              pregunta: 'El exponente 1/2 baja a multiplicar.<br>&iquest;Cuanto es ' + c + ' &times; &frac12;?',
              resp: R.numero(c / 2, { dec: 4, tol: 0.001 }),
              pista: 'La mitad de ' + c + '.',
              despues: '' },
            { rotulo: 'Exponente',
              seccion: 'Paso 3: restarle 1 al exponente',
              queHacemos: 'Le restamos 1 al exponente.',
              paraQue: '&frac12; &minus; 1 da &minus;&frac12;, o sea que la x acaba abajo, en un denominador con raiz.',
              queda: (c / 2) + 'x' + F.sup('&minus;1/2'),
              pregunta: 'Al exponente se le resta 1.<br>&iquest;Cuanto es &frac12; &minus; 1?',
              resp: R.numero(-0.5, { dec: 4, tol: 0.001 }),
              pista: 'Medio menos uno da menos un medio.',
              despues: 'Un exponente negativo significa que la x baja al denominador: x<sup>&minus;1/2</sup> = 1/&radic;<span class="rad">x</span>.' },
            { rotulo: 'Derivada',
              seccion: 'Paso 4: escribir',
              queHacemos: 'Escribimos el resultado.',
              paraQue: 'Comprobacion: la derivada de una raiz siempre queda con la raiz abajo.',
              queda: F.frac(c, '2&radic;<span class="rad">x</span>'),
              pregunta: 'Escribe la derivada.',
              resp: R.expresion('(' + c + '/2)*x^(-1/2)', { mostrar: F.frac(c, '2&radic;<span class="rad">x</span>') }),
              pista: 'Es ' + F.frac(c, '2&radic;<span class="rad">x</span>') + '. Tambien vale escribirla como ' + (c / 2) + 'x^(-1/2).',
              despues: '' }
          ],
          final: 'f&prime;(x) = <b>' + F.frac(c, '2&radic;<span class="rad">x</span>') + '</b>',
          receta: ['Toda raiz se escribe como potencia fraccionaria',
            '&radic;<span class="rad">x</span> = x<sup>1/2</sup>',
            'Despues es la regla de la potencia normal',
            'Exponente negativo = la x se va abajo',
            'Al final conviene volver a escribirlo con raiz']
        }),
        enunciado: 'Deriva: f(x) = ' + c + '&radic;<span class="rad">x</span>',
        respuesta: R.expresion('(' + c + '/2)*x^(-1/2)', { mostrar: F.frac(c, '2&radic;<span class="rad">x</span>') }),
        pistas: ['Escribe la raiz como potencia: &radic;<span class="rad">x</span> = x<sup>1/2</sup>.',
          'Aplica la regla de la potencia: el exponente 1/2 baja y queda x<sup>&minus;1/2</sup>.'],
        solucion: ['f(x) = ' + c + 'x<sup>1/2</sup>',
          'f&prime;(x) = ' + c + ' &middot; &frac12; &middot; x<sup>&minus;1/2</sup>',
          'f&prime;(x) = <b>' + F.frac(c, '2&radic;<span class="rad">x</span>') + '</b>']
      };
    }
    var n = r.entero(2, 5);
    return {
      guia: G({
        intro: 'Derivar <b>' + F.frac(c, 'x' + F.sup(n)) + '</b>.<br>' +
          'Parece que hace falta la regla del cociente, pero no: como arriba solo hay un numero, ' +
          'conviene <b>subir la x</b> con exponente negativo y usar la regla de la potencia.',
        pasos: [
          { rotulo: 'Subir la x',
            seccion: 'Paso 1: subir la x',
            queHacemos: 'Subimos la x al numerador con exponente negativo.',
            paraQue: 'Parece que hace falta la regla del cociente, pero arriba solo hay un numero: conviene subir la x y usar la potencia.',
            queda: c + 'x' + F.sup('&minus;' + n),
            pregunta: '&iquest;Como se escribe ' + F.frac(c, 'x' + F.sup(n)) + ' sin fraccion?',
            resp: R.opcion([c + 'x<sup>&minus;' + n + '</sup>', c + 'x<sup>' + n + '</sup>'], 0),
            pista: 'Lo que esta dividiendo sube al numerador cambiandole el signo al exponente.',
            despues: 'Asi se evita la regla del cociente, que seria mucho mas larga.' },
          { rotulo: 'Coeficiente',
            seccion: 'Paso 2: bajar el exponente',
            queHacemos: 'El exponente negativo baja y multiplica.',
            paraQue: 'Al bajar un exponente negativo, el coeficiente cambia de signo.',
            queda: (-c * n) + 'x' + F.sup('?'),
            pregunta: 'El exponente &minus;' + n + ' baja a multiplicar.<br>&iquest;Cuanto es ' + c + ' &times; (&minus;' + n + ')?',
            resp: R.numero(-c * n, { dec: 0 }),
            pista: 'Multiplica y ponle el signo negativo.',
            despues: 'El signo menos viene del exponente: por eso estas derivadas suelen salir negativas.' },
          { rotulo: 'Exponente',
            seccion: 'Paso 3: restarle 1 al exponente',
            queHacemos: 'Le restamos 1 al exponente.',
            paraQue: 'Restarle 1 a un negativo lo hace MAS negativo: es el error tipico aqui.',
            queda: (-c * n) + 'x' + F.sup('&minus;' + (n + 1)),
            pregunta: 'Ahora se le resta 1 al exponente.<br>&iquest;Cuanto es &minus;' + n + ' &minus; 1?',
            resp: R.numero(-n - 1, { dec: 0 }),
            pista: 'Cuidado: restar 1 a un negativo lo hace MAS negativo.',
            despues: 'Al bajarlo otra vez queda ' + F.frac(1, 'x' + F.sup(n + 1)) + '.' },
          { rotulo: 'Derivada',
            seccion: 'Paso 4: escribir',
            queHacemos: 'Volvemos a bajar la x al denominador.',
            paraQue: 'Se suele dejar sin exponentes negativos, con la x abajo.',
            queda: F.frac(-c * n, 'x' + F.sup(n + 1)),
            pregunta: 'Escribe la derivada.',
            resp: R.expresion('(' + (-c * n) + ')*x^(' + (-n - 1) + ')', { mostrar: '&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) }),
            pista: 'Es &minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) + '.',
            despues: '' }
        ],
        final: 'f&prime;(x) = <b>&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) + '</b>',
        receta: ['Si arriba solo hay un numero, subir la x con exponente negativo',
          'Asi se evita la regla del cociente',
          'Regla de la potencia normal',
          'Restar 1 a un exponente negativo lo hace mas negativo',
          'Al final volver a bajarlo al denominador']
      }),
      enunciado: 'Deriva: f(x) = ' + F.frac(c, 'x' + F.sup(n)),
      respuesta: R.expresion('(' + (-c * n) + ')*x^(' + (-n - 1) + ')', { mostrar: '&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) }),
      pistas: ['Pasa la x al numerador con exponente negativo: ' + F.frac(c, 'x' + F.sup(n)) + ' = ' + c + 'x<sup>&minus;' + n + '</sup>.',
        'Ahora aplica la regla de la potencia con exponente &minus;' + n + '.'],
      solucion: ['f(x) = ' + c + 'x<sup>&minus;' + n + '</sup>',
        'f&prime;(x) = ' + c + ' &middot; (&minus;' + n + ') &middot; x<sup>&minus;' + (n + 1) + '</sup> = ' + (-c * n) + 'x<sup>&minus;' + (n + 1) + '</sup>',
        'f&prime;(x) = <b>&minus;' + F.frac(c * n, 'x' + F.sup(n + 1)) + '</b>']
    };
  };

  extra.rectaTangente = function (r) {
    var p = [r.enteroNoCero(-3, 3), r.entero(-6, 6), r.entero(-7, 7)];
    var d = P.derivada(p);
    var x0 = r.enteroNoCero(-4, 4);
    var y0 = P.evalua(p, x0);
    var m = P.evalua(d, x0);
    var b = y0 - m * x0;
    return {
      guia: G({
        intro: 'Buscamos la recta <b>tangente</b> a f(x) = ' + P.texto(p) + ' en x = ' + x0 + '.<br>' +
          'Una recta necesita dos cosas: su <b>pendiente</b> y un <b>punto</b>. La derivada da la pendiente; la funcion da el punto.',
        pasos: [
          { rotulo: 'Que es la pendiente',
            seccion: 'Paso 1: que hace falta',
            queHacemos: 'Vemos que necesita una recta.',
            paraQue: 'Una recta necesita dos cosas: pendiente y un punto. La derivada da la pendiente; la funcion da el punto.',
            queda: 'm = ?,  punto = ?',
            pregunta: '&iquest;De donde sale la pendiente de la tangente?',
            resp: R.opcion(['De la derivada evaluada en el punto', 'Del valor de la funcion en el punto'], 0),
            pista: 'La derivada ES la pendiente de la curva en cada x. La tangente es la recta que tiene esa misma inclinacion.',
            despues: 'El valor de la funcion sirve para otra cosa: para saber por donde pasa.' },
          { rotulo: 'La derivada',
            seccion: 'Paso 2: derivar',
            queHacemos: 'Derivamos la funcion.',
            paraQue: 'La derivada es la formula de la pendiente en CUALQUIER punto.',
            queda: 'f&prime;(x) = ' + P.texto(d),
            pregunta: 'Deriva f(x) = ' + P.texto(p),
            resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
            pista: 'Regla de la potencia termino a termino: queda ' + P.texto(d) + '.',
            despues: '' },
          { rotulo: 'Pendiente m',
            seccion: 'Paso 3: la pendiente',
            queHacemos: 'Sustituimos el punto en la derivada.',
            paraQue: 'Eso concreta la pendiente en ESE punto.',
            queda: 'm = ' + m + ';  falta el punto',
            pregunta: 'Evalua la derivada en x = ' + x0,
            resp: R.numero(m, { dec: 2 }),
            pista: 'Sustituye ' + x0 + ' en ' + P.texto(d) + '.',
            despues: 'Ya tenemos la inclinacion: m = ' + m + '.' },
          { rotulo: 'Punto de tangencia',
            seccion: 'Paso 4: el punto',
            queHacemos: 'Sustituimos el mismo valor en la funcion original.',
            paraQue: 'En la ORIGINAL, no en la derivada. La derivada da la pendiente; la funcion da la altura.',
            queda: 'm = ' + m + ',  punto (' + x0 + ', ' + y0 + ')',
            pregunta: 'Ahora el punto. Evalua la funcion ORIGINAL en x = ' + x0,
            resp: R.numero(y0, { dec: 2 }),
            pista: 'Ojo: aqui se usa f, no f&prime;. Sustituye en ' + P.texto(p) + '.',
            despues: 'La recta pasa por (' + x0 + ', ' + y0 + ').' },
          { rotulo: 'Ordenada b',
            seccion: 'Paso 5: la ordenada al origen',
            queHacemos: 'Metemos punto y pendiente en y = mx + b y despejamos b.',
            paraQue: 'Con m y b la recta queda completa.',
            queda: 'y = ' + m + 'x ' + (b < 0 ? '&minus; ' + (-b) : '+ ' + b),
            pregunta: 'Sustituye el punto en y = mx + b:<br>' + y0 + ' = (' + m + ')(' + x0 + ') + b.<br>&iquest;Cuanto vale b?',
            resp: R.numero(b, { dec: 2 }),
            pista: 'b = ' + y0 + ' &minus; (' + (m * x0) + ').',
            despues: 'La recta tangente es y = ' + F.poli([m, b], 'x') + '.' },
          { rotulo: 'Respuesta',
            seccion: 'Paso 6: escribir',
            queHacemos: 'Damos los dos valores.',
            paraQue: 'Comprobacion: la recta debe pasar justo por el punto y rozar la curva ahi.',
            queda: 'm = ' + m + ',  b = ' + b,
            pregunta: 'Escribe m y b.',
            resp: R.varios([
              { etiqueta: 'Pendiente m', resp: R.numero(m, { dec: 2 }) },
              { etiqueta: 'Ordenada b', resp: R.numero(b, { dec: 2 }) }
            ]),
            pista: 'm = ' + m + ' y b = ' + b + '.',
            despues: '' }
        ],
        final: 'La tangente es y = <b>' + F.poli([m, b], 'x') + '</b>',
        receta: ['La derivada da la PENDIENTE',
          'La funcion original da el PUNTO',
          'Evaluar la derivada en el punto para m',
          'Evaluar la funcion en el punto para y',
          'Sustituir en y = mx + b y despejar b']
      }),
      enunciado: 'Encuentra la recta tangente a f(x) = ' + P.texto(p) + ' en x = ' + x0 + '.<br>' +
        'Da la pendiente m y la ordenada al origen b de la recta y = mx + b.',
      respuesta: R.varios([
        { etiqueta: 'Pendiente m', resp: R.numero(m, { dec: 2 }) },
        { etiqueta: 'Ordenada b', resp: R.numero(b, { dec: 2 }) }
      ]),
      pistas: ['La pendiente de la tangente es la derivada evaluada en el punto: m = f&prime;(' + x0 + ').',
        'f&prime;(x) = ' + P.texto(d) + ', y el punto de tangencia es (' + x0 + ', ' + y0 + ').'],
      solucion: ['f&prime;(x) = ' + P.texto(d),
        'm = f&prime;(' + x0 + ') = <b>' + m + '</b>',
        'Punto de tangencia: (' + x0 + ', ' + y0 + ')',
        'Uso y &minus; y&#8320; = m(x &minus; x&#8320;): b = ' + y0 + ' &minus; (' + m + ')(' + x0 + ') = <b>' + b + '</b>',
        'Recta tangente: y = ' + F.poli([m, b], 'x')]
    };
  };

  extra.implicita = function (r) {
    var rad2 = r.elige([25, 100, 169, 289]);
    var ternas = { 25: [3, 4], 100: [6, 8], 169: [5, 12], 289: [8, 15] };
    var par = ternas[rad2];
    var x0 = par[0] * r.elige([1, -1]), y0 = par[1] * r.elige([1, -1]);
    var m = -x0 / y0;
    return {
      guia: G({
        intro: 'Queremos dy/dx en el punto (' + x0 + ', ' + y0 + ') de la circunferencia x&sup2; + y&sup2; = ' + rad2 + '.<br>' +
          'Aqui la y <b>no esta despejada</b>, y despejarla obligaria a partir la circunferencia en dos mitades. ' +
          'La derivacion implicita evita todo eso.',
        pasos: [
          { rotulo: 'Por que implicita',
            seccion: 'Paso 1: por que implicita',
            queHacemos: 'Vemos por que conviene no despejar.',
            paraQue: 'Despejar la y obligaria a partir la circunferencia en dos mitades. La derivacion implicita evita todo eso.',
            queda: 'derivar los dos lados respecto de x',
            pregunta: '&iquest;Por que no se despeja la y primero?',
            resp: R.opcion(['Porque al despejar saldria una raiz y habria que partir la curva en dos',
              'Porque no se puede despejar'], 0),
            pista: 'y = &plusmn;&radic;<span class="rad">' + rad2 + ' &minus; x&sup2;</span>: el &plusmn; obliga a tratar por separado la mitad de arriba y la de abajo. Es mas trabajo.',
            despues: 'En vez de eso, se deriva tal como esta y se trata a y como una funcion de x.' },
          { rotulo: 'Derivar y&sup2;',
            seccion: 'Paso 2: derivar y&sup2;',
            queHacemos: 'Derivamos y&sup2; recordando que la y depende de x.',
            paraQue: 'Por la regla de la cadena aparece el factor y&prime;. Olvidarlo es EL error de este tema.',
            queda: '2x + 2y&middot;y&prime; = 0',
            pregunta: 'Derivamos los dos lados respecto de x. El x&sup2; da 2x.<br>&iquest;Y que da y&sup2;?',
            resp: R.opcion(['2y &middot; y&prime;', '2y'], 0),
            pista: 'Como y depende de x, hay <b>regla de la cadena</b>: se deriva y&sup2; (da 2y) y se multiplica por la derivada de adentro, que es y&prime;.',
            despues: 'Ese y&prime; que aparece es la clave de todo el metodo: por eso al final se puede despejar.' },
          { rotulo: 'Despejar y&prime;',
            seccion: 'Paso 3: despejar y&prime;',
            queHacemos: 'Despejamos y&prime;.',
            paraQue: 'La formula queda en funcion de x y de y, y eso esta bien: es lo normal en implicita.',
            queda: 'y&prime; = &minus;x/y',
            pregunta: 'Queda 2x + 2y&middot;y&prime; = 0.<br>&iquest;Que sale al despejar y&prime;?',
            resp: R.opcion(['y&prime; = &minus;x/y', 'y&prime; = x/y'], 0),
            pista: 'Pasa el 2x restando y divide entre 2y: y&prime; = &minus;2x/2y = &minus;x/y.',
            despues: 'Fijate que la derivada depende de x Y de y: eso es normal en las implicitas.' },
          { rotulo: 'Sustituir el punto',
            seccion: 'Paso 4: sustituir el punto',
            queHacemos: 'Metemos las dos coordenadas del punto.',
            paraQue: 'Comprobacion: en una circunferencia la tangente es perpendicular al radio, y ese cociente lo refleja.',
            queda: 'y&prime; = ' + F.n(m, 4),
            pregunta: 'Sustituye (' + x0 + ', ' + y0 + '): y&prime; = &minus;(' + x0 + ')/(' + y0 + ') (4 decimales)',
            resp: R.numero(m, { dec: 4, tol: 0.005 }),
            pista: 'Cuidado con los signos: hay un menos de la formula y los signos del punto.',
            despues: 'Comprobacion geometrica: en una circunferencia la tangente es perpendicular al radio, y eso es justo lo que dice &minus;x/y.' }
        ],
        final: 'dy/dx = <b>' + F.n(m, 4) + '</b>',
        receta: ['Derivar los dos lados sin despejar la y',
          'Cada vez que derivas una y, aparece un y&prime; por la cadena',
          'Agrupar los terminos con y&prime; y despejarlo',
          'El resultado depende de x y de y',
          'Sustituir el punto al final']
      }),
      enunciado: 'La circunferencia x&sup2; + y&sup2; = ' + rad2 + ' pasa por el punto (' + x0 + ', ' + y0 + ').<br>' +
        'Usando derivacion implicita, encuentra dy/dx en ese punto (4 decimales).',
      respuesta: R.numero(m, { dec: 4, tol: 0.005 }),
      pistas: ['Deriva los dos lados respecto de x, recordando que y depende de x: (y&sup2;)&prime; = 2y&middot;y&prime;.',
        '2x + 2y&middot;y&prime; = 0 &rArr; y&prime; = &minus;x/y.'],
      solucion: ['Derivo: 2x + 2y&middot;y&prime; = 0',
        'Despejo: y&prime; = &minus;x/y',
        'Sustituyo el punto: y&prime; = &minus;(' + x0 + ')/(' + y0 + ')',
        'dy/dx = <b>' + F.n(m, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'derivadas',
    materia: 'matematicas',
    grupo: 'Calculo',
    nombre: 'Reglas de derivacion',
    descripcion: 'Regla de la potencia, producto, cociente, cadena y derivadas de funciones basicas.',
    formulario: '(x<sup>n</sup>)&prime; = nx<sup>n&minus;1</sup> &nbsp;&middot;&nbsp; (uv)&prime; = u&prime;v + uv&prime; &nbsp;&middot;&nbsp; (u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;<br>' +
      'Cadena: [f(g(x))]&prime; = f&prime;(g(x))&middot;g&prime;(x)<br>' +
      '(sen x)&prime; = cos x &nbsp;&middot;&nbsp; (cos x)&prime; = &minus;sen x &nbsp;&middot;&nbsp; (e<sup>x</sup>)&prime; = e<sup>x</sup> &nbsp;&middot;&nbsp; (ln x)&prime; = 1/x',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, p, d, a, b, c, n, k;

      if (dif === 'facil') {
        var t = r.subtema([
          ['polinomio', 'Derivada de un polinomio'],
          ['potencia', 'Regla de la potencia'],
          ['raiz', 'Raices y exponentes negativos'],
          ['enPunto', 'Derivada en un punto']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'polinomio') {
          p = [r.enteroNoCero(-6, 6), r.entero(-8, 8), r.entero(-9, 9), r.entero(-7, 7)];
          d = P.derivada(p);
          guiaDelPaso = EJ.guia.derivadaPoli(p);
          enun = 'Deriva: f(x) = ' + P.texto(p);
          resp = R.expresion(P.expr(d), { mostrar: P.texto(d) });
          pistas = ['Aplica la regla de la potencia termino por termino: baja el exponente y restale 1.',
            'La constante ' + p[3] + ' se deriva como 0.'];
          sol = ['(x<sup>n</sup>)&prime; = nx<sup>n&minus;1</sup> en cada termino',
            F.term(p[0], 'x', 3) + ' &rarr; ' + F.term(3 * p[0], 'x', 2) + ', ' + F.term(p[1], 'x', 2) + ' &rarr; ' + F.term(2 * p[1], 'x', 1) + ', ' + F.term(p[2], 'x', 1) + ' &rarr; ' + p[2] + ', ' + p[3] + ' &rarr; 0',
            'f&prime;(x) = <b>' + P.texto(d) + '</b>'];
        } else if (t === 'potencia') {
          a = r.enteroNoCero(-8, 8); n = r.entero(4, 9);
          guiaDelPaso = G({
            intro: 'Derivar <b>' + F.term(a, 'x', n) + '</b>.<br>' +
              'Es la regla mas usada de todo el calculo: <b>el exponente baja a multiplicar y luego se le resta 1</b>.',
            pasos: [
              { rotulo: 'La regla',
                seccion: 'Paso 1: la regla',
                queHacemos: 'Recordamos que hace la regla de la potencia.',
                paraQue: 'El exponente BAJA a multiplicar y luego se le resta 1. Subirlo es lo que hace integrar, que es lo contrario.',
                queda: '? x' + F.sup('?'),
                pregunta: '&iquest;Que hace la regla de la potencia?',
                resp: R.opcion(['El exponente baja a multiplicar y se le resta 1',
                  'El exponente sube y se le suma 1'], 0),
                pista: 'Derivar BAJA el grado: si algo crece como x&#8309;, su pendiente crece como x&#8308;. ' +
                  'Subir el exponente es lo que hace integrar, que es lo contrario.',
                despues: 'En simbolos: (x&#8319;)&prime; = n x&#8319;&#8315;&sup1;.' },
              { rotulo: 'Coeficiente nuevo',
                seccion: 'Paso 2: el coeficiente nuevo',
                queHacemos: 'Multiplicamos el coeficiente por el exponente.',
                paraQue: 'Ese producto es el coeficiente de la derivada.',
                queda: (a * n) + 'x' + F.sup('?'),
                pregunta: 'El ' + n + ' baja y multiplica al ' + a + '.<br>&iquest;Cuanto es ' + a + ' &times; ' + n + '?',
                resp: R.numero(a * n, { dec: 0 }),
                pista: 'Cuidado con el signo de ' + a + '.',
                despues: '' },
              { rotulo: 'Exponente nuevo',
                seccion: 'Paso 3: el exponente nuevo',
                queHacemos: 'Le restamos 1 al exponente.',
                paraQue: 'Cada derivada baja un grado.',
                queda: F.term(a * n, 'x', n - 1),
                pregunta: '&iquest;Que exponente queda? (' + n + ' &minus; 1)',
                resp: R.numero(n - 1, { dec: 0 }),
                pista: 'Uno menos que el original.',
                despues: '' },
              { rotulo: 'Derivada',
                seccion: 'Paso 4: escribir',
                queHacemos: 'Juntamos coeficiente y exponente.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: F.term(a * n, 'x', n - 1),
                pregunta: 'Junta las dos cosas y escribe f&prime;(x).',
                resp: R.expresion('(' + (a * n) + ')*x^(' + (n - 1) + ')', { mostrar: F.term(a * n, 'x', n - 1) }),
                pista: 'Es ' + F.term(a * n, 'x', n - 1) + '.',
                despues: '' }
            ],
            final: 'f&prime;(x) = <b>' + F.term(a * n, 'x', n - 1) + '</b>',
            receta: ['(x&#8319;)&prime; = n x&#8319;&#8315;&sup1;',
              'El exponente baja multiplicando',
              'Al exponente se le resta 1',
              'Derivar baja el grado; integrar lo sube',
              'La derivada de una constante es 0']
          });
          enun = 'Deriva: f(x) = ' + F.term(a, 'x', n);
          resp = R.expresion('(' + (a * n) + ')*x^(' + (n - 1) + ')', { mostrar: F.term(a * n, 'x', n - 1) });
          pistas = ['Multiplica el coeficiente por el exponente y baja el exponente en 1.',
            a + ' &middot; ' + n + ' = ' + (a * n) + '.'];
          sol = ['f&prime;(x) = ' + a + ' &middot; ' + n + ' &middot; x<sup>' + n + '&minus;1</sup>',
            'f&prime;(x) = <b>' + F.term(a * n, 'x', n - 1) + '</b>'];
        } else {
          p = [r.enteroNoCero(-4, 4), r.entero(-7, 7), r.entero(-8, 8), r.entero(-5, 5)];
          d = P.derivada(p);
          a = r.enteroNoCero(-4, 4);
          guiaDelPaso = G({
            intro: 'Queremos <b>f&prime;(' + a + ')</b> de f(x) = ' + P.texto(p) + '.<br>' +
              'Eso es la pendiente de la curva justo en x = ' + a + '. El orden de los pasos importa muchisimo.',
            pasos: [
              { rotulo: 'Que va primero',
                seccion: 'Paso 1: el orden',
                queHacemos: 'Decidimos que va primero.',
                paraQue: 'Si sustituyes primero te queda un NUMERO, y la derivada de un numero es 0. Siempre se deriva antes.',
                queda: 'derivar, luego sustituir',
                pregunta: '&iquest;Se deriva primero o se sustituye primero?',
                resp: R.opcion(['Derivar primero y sustituir despues', 'Sustituir primero y derivar despues'], 0),
                pista: 'Si sustituyes primero te queda un NUMERO, y la derivada de un numero es 0. Saldria siempre 0.',
                despues: 'Regla de oro: primero se deriva la funcion completa, y solo al final entra el valor.' },
              { rotulo: 'La derivada',
                seccion: 'Paso 2: derivar',
                queHacemos: 'Derivamos toda la funcion.',
                paraQue: 'Queda la formula general de la pendiente.',
                queda: 'f&prime;(x) = ' + P.texto(d),
                pregunta: 'Deriva f(x) = ' + P.texto(p),
                resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
                pista: 'Termino a termino con la regla de la potencia. La constante ' + p[3] + ' desaparece.',
                despues: 'f&prime;(x) = ' + P.texto(d) + '. Esta formula sirve para cualquier x.' },
              { rotulo: 'Evaluar',
                seccion: 'Paso 3: sustituir',
                queHacemos: 'Metemos el valor en la derivada.',
                paraQue: 'Ese numero es la pendiente de la curva justo ahi.',
                queda: 'f&prime;(' + a + ') = ' + P.evalua(d, a),
                pregunta: 'Ahora si, sustituye x = ' + a + ' en la derivada.',
                resp: R.numero(P.evalua(d, a), { dec: 2 }),
                pista: 'Pon (' + a + ') entre parentesis en cada x de ' + P.texto(d) + '.',
                despues: 'Ese numero es la pendiente de la curva en ese punto: ' +
                  (P.evalua(d, a) > 0 ? 'como es positivo, ahi la funcion esta subiendo.'
                    : P.evalua(d, a) < 0 ? 'como es negativo, ahi la funcion esta bajando.'
                      : 'como es 0, ahi la funcion esta plana: hay un maximo o un minimo.') }
            ],
            final: 'f&prime;(' + a + ') = <b>' + P.evalua(d, a) + '</b>',
            receta: ['Derivar SIEMPRE antes de sustituir',
              'Si sustituyes primero, todo se vuelve constante y da 0',
              'La derivada es una formula que sirve para toda x',
              'Evaluarla en un punto da la pendiente ahi',
              'Positiva sube, negativa baja, cero esta plana']
          });
          enun = 'Si f(x) = ' + P.texto(p) + ', calcula f&prime;(' + a + ').';
          resp = R.numero(P.evalua(d, a), { dec: 2 });
          pistas = ['Primero deriva y despues sustituye.',
            'f&prime;(x) = ' + P.texto(d) + '.'];
          sol = ['f&prime;(x) = ' + P.texto(d),
            'f&prime;(' + a + ') = ' + P.texto(d).replace(/x/g, '(' + a + ')'),
            'f&prime;(' + a + ') = <b>' + P.evalua(d, a) + '</b>'];
        }
      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['producto', 'Regla del producto'],
          ['cociente', 'Regla del cociente'],
          ['cadena', 'Regla de la cadena'],
          ['basicas', 'Trigonometricas, exponencial y log'],
          ['raiz', 'Raices y exponentes negativos'],
          ['rectaTangente', 'Recta tangente']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'producto') {
          var u = [r.enteroNoCero(-4, 4), r.entero(-6, 6)];
          var v = [r.enteroNoCero(-3, 3), r.entero(-5, 5), r.entero(-6, 6)];
          d = P.derivada(P.multiplica(u, v));
          guiaDelPaso = G({
            intro: 'Derivar <b>' + pr(u) + pr(v) + '</b> con la regla del producto.<br>' +
              'Lo primero que hay que grabarse: la derivada de un producto <b>no</b> es el producto de las derivadas.',
            pasos: [
              { rotulo: 'El error tipico',
                seccion: 'Paso 1: la regla',
                queHacemos: 'Descartamos el atajo falso.',
                paraQue: '(uv)&prime; NO es u&prime;v&prime;. La regla es u&prime;v + uv&prime;: se deriva uno dejando el otro quieto, y luego al reves.',
                queda: 'u&prime;v + uv&prime;',
                pregunta: '&iquest;Se puede derivar cada parentesis por separado y multiplicarlos?',
                resp: R.opcion(['No: la derivada de un producto no es el producto de las derivadas',
                  'Si, se deriva cada uno'], 0),
                pista: 'Compruebalo con algo facil: (x &middot; x)&prime; = (x&sup2;)&prime; = 2x, pero x&prime; &middot; x&prime; = 1 &middot; 1 = 1. No coinciden.',
                despues: 'La formula correcta es (uv)&prime; = u&prime;v + uv&prime;: se deriva uno y se deja el otro, y luego al reves.' },
              { rotulo: 'u&prime;',
                seccion: 'Paso 2: las cuatro piezas',
                queHacemos: 'Derivamos el primer factor.',
                paraQue: 'Conviene anotar las cuatro piezas (u, u&prime;, v, v&prime;) antes de armar nada.',
                queda: 'u&prime; = ' + P.texto(P.derivada(u)) + ',  v&prime; = ?',
                pregunta: 'Con u = ' + P.texto(u) + ', &iquest;cuanto vale u&prime;?',
                resp: R.expresion(P.expr(P.derivada(u)), { mostrar: P.texto(P.derivada(u)) }),
                pista: 'Regla de la potencia: queda ' + P.texto(P.derivada(u)) + '.',
                despues: '' },
              { rotulo: 'v&prime;',
                seccion: 'Paso 2: las cuatro piezas',
                queHacemos: 'Ahora el segundo.',
                paraQue: 'Con las cuatro piezas listas, armar la formula es mecanico.',
                queda: 'u&prime; = ' + P.texto(P.derivada(u)) + ',  v&prime; = ' + P.texto(P.derivada(v)),
                pregunta: 'Y con v = ' + P.texto(v) + ', &iquest;cuanto vale v&prime;?',
                resp: R.expresion(P.expr(P.derivada(v)), { mostrar: P.texto(P.derivada(v)) }),
                pista: 'Igual, termino a termino: ' + P.texto(P.derivada(v)) + '.',
                despues: 'Ya tenemos las cuatro piezas: u, u&prime;, v y v&prime;.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 3: armar y reducir',
                queHacemos: 'Sustituimos en la formula y reducimos.',
                paraQue: 'Comprobacion util: el grado de f&prime; debe ser uno menos que el de f.',
                queda: 'f&prime;(x) = ' + P.texto(d),
                pregunta: 'Arma u&prime;v + uv&prime;, desarrolla y reduce.<br>&iquest;Cual es f&prime;(x)?',
                resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
                pista: 'Es ' + pr(P.derivada(u)) + pr(v) + ' + ' + pr(u) + pr(P.derivada(v)) + ', que reducido da ' + P.texto(d) + '.',
                despues: 'Comprobacion util: el grado de f&prime; debe ser uno menos que el de f.' }
            ],
            final: 'f&prime;(x) = <b>' + P.texto(d) + '</b>',
            receta: ['(uv)&prime; = u&prime;v + uv&prime;',
              'NO es el producto de las derivadas',
              'Anotar las cuatro piezas antes de armar nada',
              'Se deriva uno dejando el otro quieto, y luego al reves',
              'Comprobar el grado del resultado']
          });
          enun = 'Deriva usando la regla del producto: f(x) = ' + pr(u) + pr(v);
          resp = R.expresion(P.expr(d), { mostrar: P.texto(d) });
          pistas = ['(uv)&prime; = u&prime;v + uv&prime;, con u = ' + P.texto(u) + ' y v = ' + P.texto(v) + '.',
            'u&prime; = ' + P.texto(P.derivada(u)) + ' y v&prime; = ' + P.texto(P.derivada(v)) + '.'];
          sol = ['u = ' + P.texto(u) + ', u&prime; = ' + P.texto(P.derivada(u)),
            'v = ' + P.texto(v) + ', v&prime; = ' + P.texto(P.derivada(v)),
            'f&prime; = u&prime;v + uv&prime; = ' + pr(P.derivada(u)) + pr(v) + ' + ' + pr(u) + pr(P.derivada(v)),
            'Desarrollando y reduciendo: <b>' + P.texto(d) + '</b>'];
        } else if (t2 === 'cociente') {
          a = r.enteroNoCero(-5, 5); b = r.entero(-7, 7);
          c = r.enteroNoCero(-4, 4); var dd = r.entero(-6, 6);
          var numD = a * dd - b * c;
          /* si ad - bc = 0 la funcion es constante y la derivada seria 0: no sirve como ejercicio */
          while (numD === 0) { dd = r.entero(-6, 6); b = r.entero(-7, 7); numD = a * dd - b * c; }
          guiaDelPaso = G({
            intro: 'Derivar <b>' + F.frac(P.texto([a, b]), P.texto([c, dd])) + '</b> con la regla del cociente.<br>' +
              'La formula es (u/v)&prime; = ' + F.frac('u&prime;v &minus; uv&prime;', 'v&sup2;') + '. Ojo con el MENOS: aqui el orden si importa.',
            pasos: [
              { rotulo: 'La formula',
                seccion: 'Paso 1: la formula',
                queHacemos: 'Elegimos la version correcta de la formula.',
                paraQue: 'Ojo con el MENOS: aqui el orden SI importa. Al reves sale con el signo cambiado.',
                queda: F.frac('u&prime;v &minus; uv&prime;', 'v&sup2;'),
                pregunta: '&iquest;Cual de las dos es la correcta?',
                resp: R.opcion([F.frac('u&prime;v &minus; uv&prime;', 'v&sup2;'), F.frac('uv&prime; &minus; u&prime;v', 'v&sup2;')], 0),
                pista: 'Empieza derivando el de ARRIBA. Truco para recordarlo: "deriva el de arriba por el de abajo, menos arriba por derivada de abajo".',
                despues: 'Si inviertes el orden, toda la derivada sale con el signo cambiado.' },
              { rotulo: 'u&prime;',
                seccion: 'Paso 2: derivar el de arriba',
                queHacemos: 'Derivamos el numerador.',
                paraQue: 'La formula empieza por u&prime;, asi que se empieza derivando el de ARRIBA.',
                queda: 'u&prime; = ' + a + ',  v&prime; = ' + c,
                pregunta: 'Con u = ' + P.texto([a, b]) + ', &iquest;cuanto vale u&prime;?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'La derivada de ' + a + 'x es ' + a + ', y la del ' + b + ' es 0.',
                despues: 'Y del mismo modo v&prime; = ' + c + '.' },
              { rotulo: 'Numerador',
                seccion: 'Paso 3: el numerador',
                queHacemos: 'Sustituimos en u&prime;v &minus; uv&prime; y reducimos.',
                paraQue: 'Que la x desaparezca es normal aqui: la derivada de este tipo de funcion es una constante entre v&sup2;.',
                queda: F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;'),
                pregunta: 'Arma ' + a + '(' + P.texto([c, dd]) + ') &minus; (' + P.texto([a, b]) + ')(' + c + ').<br>&iquest;Que queda?',
                resp: R.numero(numD, { dec: 0 }),
                pista: 'Los terminos con x se cancelan siempre en este caso: queda ' + (a * dd) + ' &minus; ' + (b * c) + ' = ' + numD + '.',
                despues: 'Que la x desaparezca es normal aqui: la derivada de este tipo de funcion es una constante entre v&sup2;.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 4: escribir',
                queHacemos: 'Ponemos el denominador al cuadrado.',
                paraQue: 'El denominador NO se deriva: se copia tal cual y se eleva al cuadrado.',
                queda: F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;'),
                pregunta: 'El denominador es v al cuadrado.<br>Escribe f&prime;(x).',
                resp: R.expresion('(' + numD + ')/((' + c + ')*x+(' + dd + '))^2', {
                  mostrar: F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;') }),
                pista: 'Es ' + F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;') + '. El denominador NO se desarrolla: se deja al cuadrado.',
                despues: '' }
            ],
            final: 'f&prime;(x) = <b>' + F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;') + '</b>',
            receta: ['(u/v)&prime; = (u&prime;v &minus; uv&prime;) / v&sup2;',
              'Empieza derivando el de ARRIBA',
              'El orden importa: al reves sale con el signo cambiado',
              'El denominador se deja elevado al cuadrado, sin desarrollar',
              'Si arriba solo hay un numero, conviene usar exponente negativo en vez de esta regla']
          });
          enun = 'Deriva usando la regla del cociente: f(x) = ' + F.frac(P.texto([a, b]), P.texto([c, dd]));
          resp = R.expresion('(' + numD + ')/((' + c + ')*x+(' + dd + '))^2', {
            mostrar: F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;')
          });
          pistas = ['(u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;, con u&prime; = ' + a + ' y v&prime; = ' + c + '.',
            'Numerador: ' + a + '(' + P.texto([c, dd]) + ') &minus; (' + P.texto([a, b]) + ')(' + c + ') = ' + numD + '.'];
          sol = ['u = ' + P.texto([a, b]) + ', u&prime; = ' + a + '; v = ' + P.texto([c, dd]) + ', v&prime; = ' + c,
            'Numerador: ' + a + '(' + P.texto([c, dd]) + ') &minus; (' + P.texto([a, b]) + ')(' + c + ')',
            '= ' + (a * dd) + ' &minus; ' + (b * c) + ' = ' + numD + ' (los terminos con x se cancelan)',
            'f&prime;(x) = <b>' + F.frac(numD, '(' + P.texto([c, dd]) + ')&sup2;') + '</b>'];
        } else if (t2 === 'cadena') {
          a = r.enteroNoCero(-4, 4); b = r.entero(-7, 7); n = r.entero(3, 7);
          guiaDelPaso = G({
            intro: 'Derivar <b>(' + P.texto([a, b]) + ')' + F.sup(n) + '</b> con la regla de la cadena.<br>' +
              'Hay una funcion <b>dentro</b> de otra. Se deriva de fuera hacia dentro, como pelar una cebolla, y se multiplica todo.',
            pasos: [
              { rotulo: 'Que es lo de afuera',
                seccion: 'Paso 1: ver las capas',
                queHacemos: 'Identificamos que operacion queda por fuera.',
                paraQue: 'Se deriva de fuera hacia dentro, como pelar una cebolla. Lo ULTIMO que se hace es lo de afuera.',
                queda: '? (' + P.texto([a, b]) + ')' + F.sup('?'),
                pregunta: '&iquest;Cual es la operacion de AFUERA, la ultima que se hace?',
                resp: R.opcion(['Elevar a la ' + n, 'Multiplicar por ' + a], 0),
                pista: 'Piensa en el orden para calcularlo con un numero: primero harias el parentesis, y al final lo elevarias. ' +
                  'Lo ultimo que se hace es lo de "afuera".',
                despues: 'Se empieza derivando eso, dejando el parentesis intacto.' },
              { rotulo: 'Exponente',
                seccion: 'Paso 2: derivar lo de afuera',
                queHacemos: 'Bajamos el exponente y le restamos 1, dejando el parentesis quieto.',
                paraQue: 'El parentesis no se toca todavia: eso viene en el paso siguiente.',
                queda: n + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + ' &middot; ?',
                pregunta: 'Al derivar lo de afuera, el ' + n + ' baja y el exponente se reduce.<br>&iquest;Que exponente queda?',
                resp: R.numero(n - 1, { dec: 0 }),
                pista: n + ' &minus; 1.',
                despues: 'Vamos en ' + n + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + '. Pero todavia falta la parte de la cadena.' },
              { rotulo: 'Derivada de adentro',
                seccion: 'Paso 3: derivar lo de adentro',
                queHacemos: 'Ahora si derivamos el parentesis.',
                paraQue: 'Ese es el factor de cadena. Olvidarlo es EL error del tema.',
                queda: n + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + ' &middot; ' + a,
                pregunta: '&iquest;Cuanto vale la derivada de lo de adentro, (' + P.texto([a, b]) + ')&prime;?',
                resp: R.numero(a, { dec: 0 }),
                pista: 'La derivada de ' + a + 'x es ' + a + ' y la del ' + b + ' es 0.',
                despues: 'Este es el factor que TODO el mundo olvida. Sin el, la derivada esta mal.' },
              { rotulo: 'Coeficiente final',
                seccion: 'Paso 4: juntar los numeros',
                queHacemos: 'Multiplicamos los dos coeficientes.',
                paraQue: 'Deja el resultado mas limpio.',
                queda: (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1),
                pregunta: 'Multiplica los dos numeros de afuera: ' + n + ' &times; ' + a,
                resp: R.numero(n * a, { dec: 0 }),
                pista: 'Multiplicacion directa.',
                despues: '' },
              { rotulo: 'Derivada',
                seccion: 'Paso 5: escribir',
                queHacemos: 'Escribimos el resultado.',
                paraQue: 'Se deja factorizado: desarrollarlo no aporta nada.',
                queda: (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1),
                pregunta: 'Escribe f&prime;(x).',
                resp: R.expresion('(' + (n * a) + ')*((' + a + ')*x+(' + b + '))^(' + (n - 1) + ')', {
                  mostrar: (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) }),
                pista: 'Es ' + (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + '. El parentesis NO se desarrolla.',
                despues: '' }
            ],
            final: 'f&prime;(x) = <b>' + (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + '</b>',
            receta: ['[f(g(x))]&prime; = f&prime;(g(x)) &middot; g&prime;(x)',
              'Derivar de fuera hacia dentro',
              'Lo de afuera es la ULTIMA operacion que harias con un numero',
              'Al derivar lo de afuera, el parentesis se deja intacto',
              'Multiplicar por la derivada de adentro: ese factor es el que se olvida']
          });
          enun = 'Deriva usando la regla de la cadena: f(x) = (' + P.texto([a, b]) + ')' + F.sup(n);
          resp = R.expresion('(' + (n * a) + ')*((' + a + ')*x+(' + b + '))^(' + (n - 1) + ')', {
            mostrar: (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1)
          });
          pistas = ['Deriva primero "lo de afuera" dejando el parentesis igual, y multiplica por la derivada de adentro.',
            'La derivada de adentro es ' + a + '.'];
          sol = ['Afuera: n(&hellip;)<sup>n&minus;1</sup> = ' + n + '(' + P.texto([a, b]) + ')' + F.sup(n - 1),
            'Adentro: (' + P.texto([a, b]) + ')&prime; = ' + a,
            'f&prime;(x) = <b>' + (n * a) + '(' + P.texto([a, b]) + ')' + F.sup(n - 1) + '</b>'];
        } else {
          k = r.entero(2, 6);
          var caso = r.elige(['sen', 'cos', 'exp', 'ln']);
          var mostrar, txt, pista2;
          if (caso === 'sen') {
            enun = 'Deriva: f(x) = sen(' + k + 'x)';
            txt = k + '*cos(' + k + '*x)'; mostrar = k + ' cos(' + k + 'x)';
            pista2 = 'La derivada de sen u es cos u multiplicada por u&prime; = ' + k + '.';
          } else if (caso === 'cos') {
            enun = 'Deriva: f(x) = cos(' + k + 'x)';
            txt = '-' + k + '*sin(' + k + '*x)'; mostrar = '&minus;' + k + ' sen(' + k + 'x)';
            pista2 = 'La derivada de cos u es &minus;sen u multiplicada por u&prime; = ' + k + '.';
          } else if (caso === 'exp') {
            enun = 'Deriva: f(x) = e<sup>' + k + 'x</sup>';
            txt = k + '*exp(' + k + '*x)'; mostrar = k + 'e' + F.sup(k + 'x');
            pista2 = 'La exponencial se queda igual y se multiplica por la derivada del exponente.';
          } else {
            b = r.entero(1, 9);
            enun = 'Deriva: f(x) = ln(' + k + 'x + ' + b + ')';
            txt = k + '/(' + k + '*x+' + b + ')'; mostrar = F.frac(k, P.texto([k, b]));
            pista2 = 'La derivada de ln u es u&prime;/u, con u&prime; = ' + k + '.';
          }
          var deAfuera = caso === 'sen'
            ? { ok: 'cos(' + k + 'x)', mal: '&minus;cos(' + k + 'x)', nota: 'La derivada de sen es cos. (Y la de cos es &minus;sen: solo una de las dos lleva el menos.)' }
            : caso === 'cos'
              ? { ok: '&minus;sen(' + k + 'x)', mal: 'sen(' + k + 'x)', nota: 'La derivada de cos es &minus;sen. Este signo menos es el que mas se olvida.' }
              : caso === 'exp'
                ? { ok: 'e' + F.sup(k + 'x') + ' (se queda igual)', mal: 'x e' + F.sup(k + 'x'), nota: 'La exponencial es la unica funcion que es su propia derivada.' }
                : { ok: F.frac(1, P.texto([k, b])), mal: 'ln(' + P.texto([k, b]) + ')', nota: 'La derivada de ln(u) es 1/u, multiplicado por u&prime;.' };
          guiaDelPaso = G({
            intro: 'Derivar <b>' + (caso === 'sen' ? 'sen(' + k + 'x)' : caso === 'cos' ? 'cos(' + k + 'x)'
              : caso === 'exp' ? 'e' + F.sup(k + 'x') : 'ln(' + P.texto([k, b]) + ')') + '</b>.<br>' +
              'Estas derivadas hay que sabersela de memoria, pero <b>casi siempre hay cadena escondida</b>: ' +
              'adentro no va una x sola, y eso anade un factor.',
            pasos: [
              { rotulo: 'Lo de adentro',
                seccion: 'Paso 1: ver lo de adentro',
                queHacemos: 'Identificamos el argumento.',
                paraQue: 'Si adentro no va una x sola, SIEMPRE hay factor de cadena.',
                queda: 'u = ' + (caso === 'ln' ? P.texto([k, b]) : k + 'x'),
                pregunta: '&iquest;Que hay dentro de la funcion?',
                resp: R.opcion([caso === 'ln' ? P.texto([k, b]) : k + 'x', 'x sola'], 0),
                pista: 'Si adentro fuera solo x, la derivada seria la de memoria y ya. Como hay algo mas, habra cadena.',
                despues: 'Asi que al final hay que multiplicar por la derivada de eso.' },
              { rotulo: 'Derivada de afuera',
                seccion: 'Paso 2: derivar lo de afuera',
                queHacemos: 'Derivamos la funcion exterior sin tocar el argumento.',
                paraQue: deAfuera.nota,
                queda: deAfuera.ok + ' &middot; u&prime;',
                pregunta: 'Dejando lo de adentro quieto, &iquest;cual es la derivada de la funcion exterior?',
                resp: R.opcion([deAfuera.ok, deAfuera.mal], 0),
                pista: deAfuera.nota,
                despues: '' },
              { rotulo: 'Derivada de adentro',
                seccion: 'Paso 3: derivar lo de adentro',
                queHacemos: 'Derivamos el argumento.',
                paraQue: 'Ese es el factor de cadena que multiplica a todo.',
                queda: deAfuera.ok + ' &middot; ' + k,
                pregunta: '&iquest;Cuanto vale la derivada de ' + (caso === 'ln' ? P.texto([k, b]) : k + 'x') + '?',
                resp: R.numero(k, { dec: 0 }),
                pista: 'La derivada de ' + k + 'x es ' + k + (caso === 'ln' ? ', y la del ' + b + ' es 0' : '') + '.',
                despues: 'Ese ' + k + ' es el factor de la cadena: multiplica a todo.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 4: escribir',
                queHacemos: 'Multiplicamos las dos partes.',
                paraQue: 'Para cerrar el ejercicio.',
                queda: mostrar,
                pregunta: 'Junta las dos partes y escribe f&prime;(x).',
                resp: R.expresion(txt, { mostrar: mostrar }),
                pista: 'Es ' + mostrar + '.',
                despues: '' }
            ],
            final: 'f&prime;(x) = <b>' + mostrar + '</b>',
            receta: ['(sen u)&prime; = cos u &middot; u&prime;',
              '(cos u)&prime; = &minus;sen u &middot; u&prime;',
              '(e&#8319;)&prime; = e&#8319; &middot; u&prime;',
              '(ln u)&prime; = u&prime;/u',
              'Si adentro no va una x sola, siempre hay factor de cadena']
          });
          resp = R.expresion(txt, { mostrar: mostrar });
          pistas = ['Es una cadena: deriva la funcion exterior y multiplica por la derivada del interior.', pista2];
          sol = ['Identifico u = ' + (caso === 'ln' ? P.texto([k, b]) : k + 'x') + ', con u&prime; = ' + k,
            pista2,
            'f&prime;(x) = <b>' + mostrar + '</b>'];
        }
      } else {
        var t3 = r.subtema([
          ['productoExp', 'Producto con exponencial'],
          ['productoTrig', 'Producto con trigonometrica'],
          ['lnPoli', 'Logaritmo de un polinomio'],
          ['cadenaCuad', 'Cadena con polinomio'],
          ['cocienteTrig', 'Cociente con trigonometrica'],
          ['segunda', 'Segunda derivada'],
          ['rectaTangente', 'Recta tangente'],
          ['implicita', 'Derivacion implicita']
        ]);
        if (extra[t3]) return extra[t3](r, dif);
        if (t3 === 'productoExp') {
          n = r.entero(2, 4); k = r.enteroNoCero(-3, 3);
          guiaDelPaso = G({
            intro: 'Derivar <b>x' + F.sup(n) + 'e' + F.sup(k + 'x') + '</b>.<br>' +
              'Son dos cosas multiplicandose, asi que toca la regla del producto. Y ademas la exponencial trae cadena.',
            pasos: [
              { rotulo: 'Que regla',
                seccion: 'Paso 1: elegir las reglas',
                queHacemos: 'Vemos que reglas hacen falta.',
                paraQue: 'Son dos factores con x, asi que producto. Y la exponencial ademas trae cadena por dentro.',
                queda: 'u&prime;v + uv&prime;',
                pregunta: '&iquest;Que regla toca aqui?',
                resp: R.opcion(['La del producto, con u = x' + F.sup(n) + ' y v = e' + F.sup(k + 'x'),
                  'Solo la cadena'], 0),
                pista: 'Hay dos factores distintos multiplicandose, cada uno con su propia x. Eso es un producto.',
                despues: '' },
              { rotulo: 'u&prime;',
                seccion: 'Paso 2: las piezas',
                queHacemos: 'Derivamos el primer factor.',
                paraQue: 'Regla de la potencia de siempre.',
                queda: 'u&prime; = ' + n + 'x' + F.sup(n - 1) + ',  v&prime; = ?',
                pregunta: '&iquest;Cuanto vale la derivada de x' + F.sup(n) + '?',
                resp: R.expresion(n + '*x^(' + (n - 1) + ')', { mostrar: n + 'x' + F.sup(n - 1) }),
                pista: 'Regla de la potencia: baja el ' + n + ' y el exponente queda en ' + (n - 1) + '.',
                despues: '' },
              { rotulo: 'v&prime;',
                seccion: 'Paso 2: las piezas',
                queHacemos: 'Derivamos la exponencial.',
                paraQue: 'La exponencial se queda igual y se multiplica por la derivada del exponente. Nunca desaparece al derivar.',
                queda: 'u&prime; = ' + n + 'x' + F.sup(n - 1) + ',  v&prime; = ' + k + 'e' + F.sup(k + 'x'),
                pregunta: '&iquest;Cuanto vale la derivada de e' + F.sup(k + 'x') + '?',
                resp: R.opcion([k + 'e' + F.sup(k + 'x'), 'e' + F.sup(k + 'x')], 0),
                pista: 'La exponencial se queda igual, pero hay cadena: se multiplica por la derivada del exponente, que es ' + k + '.',
                despues: 'Sin ese ' + k + ' la derivada estaria mal.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 3: armar y factorizar',
                queHacemos: 'Sustituimos en la formula y sacamos la exponencial de factor comun.',
                paraQue: 'Factorizarla deja el resultado mucho mas limpio.',
                queda: 'e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')',
                pregunta: 'Arma u&prime;v + uv&prime; y factoriza la exponencial.<br>&iquest;Cual es f&prime;(x)?',
                resp: R.expresion('exp(' + k + '*x)*(' + n + '*x^(' + (n - 1) + ')+(' + k + ')*x^(' + n + '))', {
                  mostrar: 'e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')' }),
                pista: 'Queda ' + n + 'x' + F.sup(n - 1) + 'e' + F.sup(k + 'x') + ' + ' + k + 'x' + F.sup(n) + 'e' + F.sup(k + 'x') +
                  ', y la e' + F.sup(k + 'x') + ' es factor comun.',
                despues: 'Factorizar la exponencial deja el resultado mucho mas limpio.' }
            ],
            final: 'f&prime;(x) = <b>e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')</b>',
            receta: ['Dos factores con x = regla del producto',
              'La exponencial se queda igual pero lleva cadena',
              '(e&#8319;)&prime; = e&#8319; &middot; u&prime;',
              'Al final, factorizar la exponencial',
              'La exponencial nunca desaparece al derivar']
          });
          enun = 'Deriva: f(x) = x' + F.sup(n) + 'e' + F.sup(k + 'x');
          resp = R.expresion('exp(' + k + '*x)*(' + n + '*x^(' + (n - 1) + ')+(' + k + ')*x^(' + n + '))', {
            mostrar: 'e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')'
          });
          pistas = ['Regla del producto con u = x' + F.sup(n) + ' y v = e' + F.sup(k + 'x') + '.',
            'u&prime; = ' + n + 'x' + F.sup(n - 1) + ' y v&prime; = ' + k + 'e' + F.sup(k + 'x') + '.'];
          sol = ['u = x' + F.sup(n) + ' &rArr; u&prime; = ' + n + 'x' + F.sup(n - 1),
            'v = e' + F.sup(k + 'x') + ' &rArr; v&prime; = ' + k + 'e' + F.sup(k + 'x'),
            'f&prime; = ' + n + 'x' + F.sup(n - 1) + 'e' + F.sup(k + 'x') + ' + ' + k + 'x' + F.sup(n) + 'e' + F.sup(k + 'x'),
            'Factorizando: <b>e' + F.sup(k + 'x') + '(' + n + 'x' + F.sup(n - 1) + ' ' + (k > 0 ? '+ ' + k : '&minus; ' + (-k)) + 'x' + F.sup(n) + ')</b>'];
        } else if (t3 === 'productoTrig') {
          n = r.entero(2, 3); k = r.entero(2, 4);
          var esSen = r.bool();
          guiaDelPaso = G({
            intro: 'Derivar <b>x' + F.sup(n) + ' ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x)</b>.<br>' +
              'Producto de dos funciones, y la trigonometrica trae cadena por dentro. Se combinan las dos reglas.',
            pasos: [
              { rotulo: 'u&prime;',
                seccion: 'Paso 1: las piezas',
                queHacemos: 'Derivamos el factor de potencia.',
                paraQue: 'Producto de dos funciones, y la trigonometrica trae cadena por dentro: se combinan las dos reglas.',
                queda: 'u&prime; = ' + n + 'x' + F.sup(n - 1) + ',  v&prime; = ?',
                pregunta: 'Con u = x' + F.sup(n) + ', &iquest;cuanto vale u&prime;?',
                resp: R.expresion(n + '*x^(' + (n - 1) + ')', { mostrar: n + 'x' + F.sup(n - 1) }),
                pista: 'Regla de la potencia.',
                despues: '' },
              { rotulo: 'v&prime;',
                seccion: 'Paso 1: las piezas',
                queHacemos: 'Derivamos la trigonometrica, con su cadena.',
                paraQue: 'La derivada del coseno lleva MENOS; la del seno no. Y las dos se multiplican por la derivada de adentro.',
                queda: 'v&prime; = ' + (esSen ? k + ' cos(' + k + 'x)' : '&minus;' + k + ' sen(' + k + 'x)'),
                pregunta: 'Con v = ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x), &iquest;cuanto vale v&prime;?',
                resp: R.opcion(esSen
                  ? [k + ' cos(' + k + 'x)', 'cos(' + k + 'x)']
                  : ['&minus;' + k + ' sen(' + k + 'x)', k + ' sen(' + k + 'x)'], 0),
                pista: esSen
                  ? 'La derivada de sen es cos, y por la cadena se multiplica por ' + k + '.'
                  : 'La derivada de cos es &minus;sen (con el menos), y por la cadena se multiplica por ' + k + '.',
                despues: 'Dos cosas que revisar siempre: el signo y el factor de la cadena.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 2: armar',
                queHacemos: 'Sustituimos en la formula del producto.',
                paraQue: 'Aqui no hay factor comun facil, asi que se deja como suma de dos terminos.',
                queda: esSen
                  ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
                  : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)',
                pregunta: 'Arma u&prime;v + uv&prime;.<br>&iquest;Cual es f&prime;(x)?',
                resp: R.expresion(
                  esSen ? n + '*x^(' + (n - 1) + ')*sin(' + k + '*x)+' + k + '*x^(' + n + ')*cos(' + k + '*x)'
                    : n + '*x^(' + (n - 1) + ')*cos(' + k + '*x)-' + k + '*x^(' + n + ')*sin(' + k + '*x)',
                  { mostrar: esSen
                    ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
                    : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)' }),
                pista: 'Es ' + (esSen
                  ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
                  : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)') + '.',
                despues: 'Aqui no hay factor comun facil, asi que se deja como suma de dos terminos.' }
            ],
            final: 'f&prime;(x) = <b>' + (esSen
              ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
              : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)') + '</b>',
            receta: ['Producto: u&prime;v + uv&prime;',
              'La trigonometrica lleva cadena: se multiplica por la derivada de adentro',
              '(sen)&prime; = cos, (cos)&prime; = &minus;sen',
              'Revisar signo y factor de cadena por separado',
              'Sin factor comun, se deja como suma']
          });
          enun = 'Deriva: f(x) = x' + F.sup(n) + ' ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x)';
          resp = R.expresion(
            esSen ? n + '*x^(' + (n - 1) + ')*sin(' + k + '*x)+' + k + '*x^(' + n + ')*cos(' + k + '*x)'
              : n + '*x^(' + (n - 1) + ')*cos(' + k + '*x)-' + k + '*x^(' + n + ')*sin(' + k + '*x)',
            {
              mostrar: esSen
                ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
                : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)'
            });
          pistas = ['Producto: u = x' + F.sup(n) + ', v = ' + (esSen ? 'sen' : 'cos') + '(' + k + 'x).',
            'v&prime; = ' + (esSen ? k + ' cos(' + k + 'x)' : '&minus;' + k + ' sen(' + k + 'x)') + ' por la regla de la cadena.'];
          sol = ['u&prime; = ' + n + 'x' + F.sup(n - 1),
            'v&prime; = ' + (esSen ? k + ' cos(' + k + 'x)' : '&minus;' + k + ' sen(' + k + 'x)'),
            'f&prime; = u&prime;v + uv&prime;',
            'f&prime;(x) = <b>' + (esSen
              ? n + 'x' + F.sup(n - 1) + ' sen(' + k + 'x) + ' + k + 'x' + F.sup(n) + ' cos(' + k + 'x)'
              : n + 'x' + F.sup(n - 1) + ' cos(' + k + 'x) &minus; ' + k + 'x' + F.sup(n) + ' sen(' + k + 'x)') + '</b>'];
        } else if (t3 === 'lnPoli') {
          p = [r.entero(1, 4), r.entero(-5, 5), r.entero(2, 9)];
          d = P.derivada(p);
          guiaDelPaso = G({
            intro: 'Derivar <b>ln(' + P.texto(p) + ')</b>.<br>' +
              'La derivada del logaritmo es <b>u&prime;/u</b>: la derivada de adentro, dividida entre lo de adentro.',
            pasos: [
              { rotulo: 'La regla',
                seccion: 'Paso 1: la regla',
                queHacemos: 'Recordamos que (ln u)&prime; = u&prime;/u.',
                paraQue: '1/u solo sirve si adentro va una x sola. Con cualquier otra cosa hace falta el u&prime; de arriba.',
                queda: F.frac('?', P.texto(p)),
                pregunta: '&iquest;Cual es la derivada de ln(u)?',
                resp: R.opcion([F.frac('u&prime;', 'u'), F.frac(1, 'u')], 0),
                pista: '1/u solo vale cuando adentro va una x sola. Con cualquier otra cosa hay cadena, y arriba aparece u&prime;.',
                despues: 'Aqui adentro va ' + P.texto(p) + ', asi que hay que derivarlo.' },
              { rotulo: 'u&prime;',
                seccion: 'Paso 2: derivar lo de adentro',
                queHacemos: 'Derivamos el argumento del logaritmo.',
                paraQue: 'Eso es lo que va ARRIBA en la fraccion.',
                queda: F.frac(P.texto(d), P.texto(p)),
                pregunta: 'Deriva lo de adentro: (' + P.texto(p) + ')&prime;',
                resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
                pista: 'Regla de la potencia termino a termino: queda ' + P.texto(d) + '.',
                despues: 'Ese resultado va ARRIBA de la fraccion.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 3: escribir',
                queHacemos: 'Montamos la fraccion.',
                paraQue: 'Arriba va derivado y abajo TAL CUAL. El grado de arriba siempre queda uno menos que el de abajo.',
                queda: F.frac(P.texto(d), P.texto(p)),
                pregunta: 'Arma u&prime;/u y escribe f&prime;(x).',
                resp: R.expresion('(' + P.expr(d) + ')/(' + P.expr(p) + ')', { mostrar: F.frac(P.texto(d), P.texto(p)) }),
                pista: 'Es ' + F.frac(P.texto(d), P.texto(p)) + '. Abajo va lo de adentro SIN derivar.',
                despues: 'Fijate en el detalle: arriba va derivado y abajo va tal cual.' }
            ],
            final: 'f&prime;(x) = <b>' + F.frac(P.texto(d), P.texto(p)) + '</b>',
            receta: ['(ln u)&prime; = u&prime;/u',
              'Arriba lo de adentro DERIVADO',
              'Abajo lo de adentro TAL CUAL',
              '1/u solo sirve si adentro va una x sola',
              'El grado de arriba siempre queda uno menos que el de abajo']
          });
          enun = 'Deriva: f(x) = ln(' + P.texto(p) + ')';
          resp = R.expresion('(' + P.expr(d) + ')/(' + P.expr(p) + ')', {
            mostrar: F.frac(P.texto(d), P.texto(p))
          });
          pistas = ['(ln u)&prime; = u&prime;/u.',
            'u&prime; = ' + P.texto(d) + '.'];
          sol = ['u = ' + P.texto(p) + ' &rArr; u&prime; = ' + P.texto(d),
            'f&prime; = u&prime;/u',
            'f&prime;(x) = <b>' + F.frac(P.texto(d), P.texto(p)) + '</b>'];
        } else if (t3 === 'cadenaCuad') {
          p = [r.enteroNoCero(-3, 3), r.entero(-5, 5), r.entero(-6, 6)];
          d = P.derivada(p);
          n = r.entero(3, 6);
          guiaDelPaso = G({
            intro: 'Derivar <b>(' + P.texto(p) + ')' + F.sup(n) + '</b>.<br>' +
              'Misma cadena de siempre, pero ahora lo de adentro es una cuadratica, asi que su derivada ya no es un numero suelto.',
            pasos: [
              { rotulo: 'Por que no desarrollar',
                seccion: 'Paso 1: no desarrollar',
                queHacemos: 'Decidimos no desarrollar el parentesis.',
                paraQue: 'Desarrollar un parentesis elevado a 5 seria interminable. Con la cadena son tres lineas.',
                queda: '? (' + P.texto(p) + ')' + F.sup('?') + ' &middot; ?',
                pregunta: '&iquest;Conviene desarrollar el parentesis antes de derivar?',
                resp: R.opcion(['No: elevarlo a la ' + n + ' seria enorme. Mejor usar la cadena',
                  'Si, siempre se desarrolla primero'], 0),
                pista: 'Elevar un trinomio a la ' + n + ' daria decenas de terminos. La cadena lo resuelve en dos lineas.',
                despues: '' },
              { rotulo: 'Exponente',
                seccion: 'Paso 2: derivar lo de afuera',
                queHacemos: 'Bajamos el exponente y le restamos 1.',
                paraQue: 'El parentesis se copia intacto: todavia no se toca.',
                queda: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + ' &middot; ?',
                pregunta: 'Derivamos lo de afuera dejando el parentesis quieto.<br>&iquest;Que exponente queda?',
                resp: R.numero(n - 1, { dec: 0 }),
                pista: n + ' &minus; 1. El ' + n + ' baja a multiplicar.',
                despues: 'Vamos en ' + n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '.' },
              { rotulo: 'Derivada de adentro',
                seccion: 'Paso 3: derivar lo de adentro',
                queHacemos: 'Derivamos la cuadratica de adentro.',
                paraQue: 'Aqui lo de adentro no es un numero suelto: su derivada sigue teniendo x.',
                queda: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')',
                pregunta: 'Ahora deriva lo de adentro: (' + P.texto(p) + ')&prime;',
                resp: R.expresion(P.expr(d), { mostrar: P.texto(d) }),
                pista: 'Regla de la potencia: queda ' + P.texto(d) + '.',
                despues: 'Este factor es el de la cadena, el que no se puede olvidar.' },
              { rotulo: 'Derivada',
                seccion: 'Paso 4: escribir',
                queHacemos: 'Multiplicamos las dos partes.',
                paraQue: 'Se deja factorizado: desarrollarlo no aporta nada.',
                queda: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')',
                pregunta: 'Multiplica las dos partes y escribe f&prime;(x).',
                resp: R.expresion(n + '*(' + P.expr(p) + ')^(' + (n - 1) + ')*(' + P.expr(d) + ')', {
                  mostrar: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')' }),
                pista: 'Es ' + n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + '). Se deja factorizado, no se desarrolla.',
                despues: '' }
            ],
            final: 'f&prime;(x) = <b>' + n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')</b>',
            receta: ['No desarrollar: usar la cadena',
              'Derivar lo de afuera dejando el parentesis intacto',
              'Multiplicar por la derivada de adentro',
              'Dejar el resultado factorizado',
              'Si adentro fuera solo x, no haria falta el ultimo factor']
          });
          enun = 'Deriva: f(x) = (' + P.texto(p) + ')' + F.sup(n);
          resp = R.expresion(n + '*(' + P.expr(p) + ')^(' + (n - 1) + ')*(' + P.expr(d) + ')', {
            mostrar: n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')'
          });
          pistas = ['Cadena: n(&hellip;)<sup>n&minus;1</sup> por la derivada de lo de adentro.',
            'La derivada de adentro es ' + P.texto(d) + '.'];
          sol = ['Exterior: ' + n + '(' + P.texto(p) + ')' + F.sup(n - 1),
            'Interior: (' + P.texto(p) + ')&prime; = ' + P.texto(d),
            'f&prime;(x) = <b>' + n + '(' + P.texto(p) + ')' + F.sup(n - 1) + '(' + P.texto(d) + ')</b>'];
        } else if (t3 === 'segunda') {
          p = [r.enteroNoCero(-4, 4), r.entero(-6, 6), r.entero(-7, 7), r.entero(-5, 5), r.entero(-6, 6)];
          var d1 = P.derivada(p), d2 = P.derivada(d1);
          guiaDelPaso = G({
            intro: 'Queremos la <b>segunda derivada</b> de f(x) = ' + P.texto(p) + '.<br>' +
              'No hay ninguna regla nueva: es simplemente derivar dos veces seguidas.',
            pasos: [
              { rotulo: 'Que es la segunda',
                seccion: 'Paso 1: que es la segunda',
                queHacemos: 'Aclaramos que es la segunda derivada.',
                paraQue: 'Es derivar DOS VECES, no elevar al cuadrado. No hay ninguna regla nueva.',
                queda: 'derivar dos veces seguidas',
                pregunta: '&iquest;Que significa f&Prime;(x)?',
                resp: R.opcion(['Derivar f, y despues derivar el resultado', 'Elevar la primera derivada al cuadrado'], 0),
                pista: 'La comilla doble no es un cuadrado: son dos derivadas seguidas.',
                despues: 'Si f&prime; mide la pendiente, f&Prime; mide como cambia esa pendiente: la concavidad.' },
              { rotulo: 'Primera derivada',
                seccion: 'Paso 2: primera derivada',
                queHacemos: 'Derivamos una vez.',
                paraQue: 'Cada derivada baja un grado.',
                queda: 'f&prime;(x) = ' + P.texto(d1),
                pregunta: 'Deriva f(x) = ' + P.texto(p),
                resp: R.expresion(P.expr(d1), { mostrar: P.texto(d1) }),
                pista: 'Termino a termino; la constante ' + p[4] + ' desaparece. Queda ' + P.texto(d1) + '.',
                despues: 'Fijate que bajo un grado.' },
              { rotulo: 'Segunda derivada',
                seccion: 'Paso 3: segunda derivada',
                queHacemos: 'Derivamos el resultado anterior.',
                paraQue: 'f&prime; da la pendiente; f&Prime; dice si la curva abre hacia arriba o hacia abajo.',
                queda: 'f&Prime;(x) = ' + P.texto(d2),
                pregunta: 'Ahora deriva ' + P.texto(d1),
                resp: R.expresion(P.expr(d2), { mostrar: P.texto(d2) }),
                pista: 'Otra vez la regla de la potencia sobre el resultado anterior: ' + P.texto(d2) + '.',
                despues: 'Bajo otro grado mas. Si siguieras derivando, tarde o temprano llegarias a 0.' }
            ],
            final: 'f&Prime;(x) = <b>' + P.texto(d2) + '</b>',
            receta: ['f&Prime; es derivar dos veces, no elevar al cuadrado',
              'Derivar f para obtener f&prime;',
              'Derivar f&prime; para obtener f&Prime;',
              'Cada derivada baja un grado',
              'f&prime; da la pendiente; f&Prime; dice si la curva abre hacia arriba o hacia abajo']
          });
          enun = 'Calcula la segunda derivada f&Prime;(x) de f(x) = ' + P.texto(p);
          resp = R.expresion(P.expr(d2), { mostrar: P.texto(d2) });
          pistas = ['Deriva una vez y vuelve a derivar el resultado.',
            'f&prime;(x) = ' + P.texto(d1) + '.'];
          sol = ['f&prime;(x) = ' + P.texto(d1),
            'Derivo otra vez',
            'f&Prime;(x) = <b>' + P.texto(d2) + '</b>'];
        } else {
          k = r.entero(1, 4);
          guiaDelPaso = G({
            intro: 'Derivar <b>' + F.frac('sen(x)', 'x' + (k > 1 ? F.sup(k) : '')) + '</b>.<br>' +
              'Hay una division de verdad (arriba y abajo tienen x), asi que toca la regla del cociente.',
            pasos: [
              { rotulo: 'u&prime;',
                seccion: 'Paso 1: las piezas',
                queHacemos: 'Derivamos el numerador.',
                paraQue: '(sen x)&prime; = cos x, sin menos. El menos lo lleva la derivada del coseno.',
                queda: 'u&prime; = cos x,  v&prime; = ?',
                pregunta: 'Con u = sen x, &iquest;cuanto vale u&prime;?',
                resp: R.opcion(['cos x', '&minus;cos x'], 0),
                pista: 'La derivada de sen es cos, sin signo menos. Aqui adentro va x sola, asi que no hay cadena.',
                despues: '' },
              { rotulo: 'v&prime;',
                seccion: 'Paso 1: las piezas',
                queHacemos: 'Ahora el denominador.',
                paraQue: 'Regla de la potencia de siempre.',
                queda: 'u&prime; = cos x,  v&prime; = ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '1'),
                pregunta: 'Con v = x' + F.sup(k) + ', &iquest;cuanto vale v&prime;?',
                resp: R.expresion(k + '*x^(' + (k - 1) + ')', { mostrar: k > 1 ? k + 'x' + F.sup(k - 1) : '1' }),
                pista: 'Regla de la potencia: ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '1') + '.',
                despues: 'Ya estan las cuatro piezas.' },
              { rotulo: 'Denominador',
                seccion: 'Paso 2: el denominador',
                queHacemos: 'Elevamos el denominador al cuadrado.',
                paraQue: 'v&sup2; multiplica el exponente por 2. El denominador NO se deriva.',
                queda: F.frac('?', 'x' + F.sup(2 * k)),
                pregunta: 'El denominador de la formula es v&sup2;.<br>&iquest;Que exponente queda al elevar x' + F.sup(k) + ' al cuadrado?',
                resp: R.numero(2 * k, { dec: 0 }),
                pista: 'Potencia de potencia: los exponentes se multiplican, ' + k + ' &times; 2.',
                despues: '' },
              { rotulo: 'Derivada',
                seccion: 'Paso 3: armar',
                queHacemos: 'Montamos la formula completa.',
                paraQue: 'Cuidado con el orden: el menos hace que no sea conmutativo.',
                queda: F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x)', 'x' + F.sup(2 * k)),
                pregunta: 'Arma ' + F.frac('u&prime;v &minus; uv&prime;', 'v&sup2;') + ' y escribe f&prime;(x).',
                resp: R.expresion('(x^(' + k + ')*cos(x)-' + k + '*x^(' + (k - 1) + ')*sin(x))/(x^(' + (2 * k) + '))', {
                  mostrar: F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x)', 'x' + F.sup(2 * k)) }),
                pista: 'Arriba: x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x). Abajo: x' + F.sup(2 * k) + '.',
                despues: 'Se puede simplificar sacando x' + F.sup(k - 1) + ' de factor comun arriba, pero asi ya esta correcta.' }
            ],
            final: 'f&prime;(x) = <b>' + F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x)', 'x' + F.sup(2 * k)) + '</b>',
            receta: ['(u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;',
              'Empezar derivando el de arriba',
              '(sen x)&prime; = cos x, sin menos',
              'v&sup2; multiplica el exponente por 2',
              'Cuidado con el orden: el menos hace que no sea conmutativo']
          });
          enun = 'Deriva: f(x) = ' + F.frac('sen(x)', 'x' + (k > 1 ? F.sup(k) : ''));
          resp = R.expresion('(x^(' + k + ')*cos(x)-' + k + '*x^(' + (k - 1) + ')*sin(x))/(x^(' + (2 * k) + '))', {
            mostrar: F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '') + ' sen(x)', 'x' + F.sup(2 * k))
          });
          pistas = ['Regla del cociente con u = sen x y v = x' + (k > 1 ? F.sup(k) : '') + '.',
            'u&prime; = cos x y v&prime; = ' + (k > 1 ? k + 'x' + F.sup(k - 1) : '1') + '.'];
          sol = ['u = sen x, u&prime; = cos x',
            'v = x' + F.sup(k) + ', v&prime; = ' + k + 'x' + F.sup(k - 1),
            'f&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;',
            'f&prime;(x) = <b>' + F.frac('x' + F.sup(k) + ' cos(x) &minus; ' + k + 'x' + F.sup(k - 1) + ' sen(x)', 'x' + F.sup(2 * k)) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
