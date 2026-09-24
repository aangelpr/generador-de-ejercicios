/* Caida libre y tiro vertical. Se usa g = 9.8 m/s2. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- de que depende el tiempo de caida ---------------- */
  extra.concepto = function (r) {
    var h = r.elige([10, 20, 45, 80, 125]);
    var m1 = r.entero(1, 3), m2 = m1 * r.elige([3, 5, 10]);
    var t = Math.sqrt(2 * h / g);
    return {
      guia: G({
        intro: 'Desde la misma altura se sueltan dos bolas: una de <b>' + m1 + ' kg</b> y otra de <b>' + m2 + ' kg</b>.<br>' +
          'La pregunta parece de sentido comun ("la pesada cae antes"), pero el sentido comun se equivoca aqui. ' +
          'Lo que decide es la <b>formula</b>, y en ella no aparece la masa por ningun lado.',
        pasos: [
          {
            seccion: 'Paso 1: que formula manda',
            queHacemos: 'Escribimos la formula del tiempo de caida.',
            paraQue: 'Caer libremente es un MUA con a = g. De d = &frac12;gt&sup2; se despeja t = &radic;(2h/g).',
            queda: 't = &radic;(2h / g)',
            pregunta: 'Se suelta desde el reposo y cae ' + h + ' m.<br>&iquest;Que formula da el tiempo?',
            resp: R.opcion(['t = &radic;<span class="rad">2h / g</span>', 't = &radic;<span class="rad">2h / (mg)</span>'], 0),
            pista: 'Sale de h = &frac12;gt&sup2;, despejando la t. Fijate si en esa formula aparece la masa.',
            despues: 'En la formula no hay ninguna m: el tiempo no depende de la masa.'
          },
          {
            seccion: 'Paso 2: calcular el tiempo',
            queHacemos: 'Sustituimos la altura y la gravedad.',
            paraQue: 'Sale UN solo tiempo, no uno por cada bola: las dos tardan lo mismo.',
            queda: 't = ' + F.n(t, 2) + ' s para las dos',
            pregunta: 'Calcula t = &radic;<span class="rad">2(' + h + ') / 9.8</span> (2 decimales)',
            resp: R.numero(t, { dec: 2, tol: 0.03, unidad: 's' }),
            pista: 'Primero 2 &times; ' + h + ' = ' + (2 * h) + ', luego divide entre 9.8 y saca la raiz.',
            despues: 'Ese tiempo vale para cualquier objeto soltado desde ' + h + ' m.'
          },
          {
            seccion: 'Paso 3: responder la pregunta',
            queHacemos: 'Comparamos las dos bolas.',
            paraQue: 'La gravedad jala mas fuerte a la pesada, pero tambien le cuesta mas moverla, y las dos cosas se cancelan exactamente. Por eso caen igual.',
            queda: 'llegan al mismo tiempo',
            pregunta: '&iquest;Cual llega primero al suelo?',
            resp: R.opcion(['Las dos al mismo tiempo', 'La de ' + m2 + ' kg, porque pesa mas'], 0),
            pista: 'En el vacio una pluma y un martillo caen igual: lo hicieron en la Luna para demostrarlo.',
            despues: 'En el aire de verdad la pluma se retrasa, pero por el rozamiento, no por su peso.'
          }
        ],
        final: 'Las dos tardan <b>' + F.n(t, 2) + ' s</b>: el tiempo de caida <b>no depende de la masa</b>',
        receta: ['Caida libre es MUA con a = g = 9.8 m/s&sup2;',
          't = &radic;(2h/g), sin masa por ningun lado',
          'Dos objetos soltados juntos llegan juntos',
          'Solo el rozamiento del aire rompe esa igualdad']
      }),
      enunciado: 'Desde ' + h + ' m se sueltan a la vez una bola de ' + m1 + ' kg y otra de ' + m2 + ' kg.<br>' +
        '&iquest;Cual llega primero al suelo?',
      respuesta: R.opcion(['Las dos al mismo tiempo', 'La de ' + m2 + ' kg, porque pesa mas'], 0),
      pistas: ['Escribe la formula del tiempo de caida y fijate si aparece la masa.',
        't = &radic;<span class="rad">2h/g</span>: no hay ninguna m.'],
      solucion: ['El tiempo sale de h = &frac12;gt&sup2;, o sea t = &radic;<span class="rad">2h/g</span>',
        't = &radic;<span class="rad">2(' + h + ')/9.8</span> = ' + F.n(t, 2) + ' s, igual para las dos',
        'La masa no aparece: <b>llegan al mismo tiempo</b>']
    };
  };

  /* ---------------- lanzado hacia arriba desde una altura ---------------- */
  extra.desdeAltura = function (r) {
    var v0 = r.elige([5, 8, 10, 12, 15]);
    var h0 = r.elige([10, 15, 20, 25, 30, 40]);
    /* -4.9t^2 + v0 t + h0 = 0  ->  t = (v0 + sqrt(v0^2 + 2 g h0)) / g */
    var disc = v0 * v0 + 2 * g * h0;
    var t = (v0 + Math.sqrt(disc)) / g;
    var hmax = h0 + v0 * v0 / (2 * g);
    return {
      guia: G({
        intro: 'Desde una azotea de <b>' + h0 + ' m</b> se lanza una piedra <b>hacia arriba</b> a <b>' + v0 + ' m/s</b>.<br>' +
          'Queremos cuanto tarda en llegar al suelo. Lo delicado aqui son los <b>signos</b>: la piedra ' +
          'empieza subiendo pero la gravedad siempre jala hacia abajo.',
        pasos: [
          {
            seccion: 'Paso 1: poner los signos',
            queHacemos: 'Elegimos hacia donde es positivo y anotamos los signos.',
            paraQue: 'Si tomas arriba como positivo, la velocidad inicial es +' + v0 + ' pero la aceleracion es &minus;9.8. Mezclar los signos es EL error de este tema.',
            queda: 'v<sub>0</sub> = +' + v0 + ',  a = &minus;9.8,  y<sub>0</sub> = ' + h0,
            pregunta: 'Tomando <b>arriba</b> como positivo, &iquest;que signo lleva la aceleracion?',
            resp: R.opcion(['Negativa: &minus;9.8 m/s&sup2;', 'Positiva: +9.8 m/s&sup2;'], 0),
            pista: 'La gravedad siempre apunta hacia abajo, suba o baje la piedra.',
            despues: 'La aceleracion apunta hacia abajo todo el tiempo, tambien mientras la piedra sube.'
          },
          {
            seccion: 'Paso 2: hasta donde sube',
            queHacemos: 'Calculamos la altura maxima sobre el suelo.',
            paraQue: 'En el punto mas alto la velocidad vale CERO un instante. Ese dato es el que permite calcular la subida.',
            queda: 'sube hasta ' + F.n(hmax, 2) + ' m',
            pregunta: 'La piedra sube v<sub>0</sub>&sup2;/(2g) = ' + (v0 * v0) + '/19.6 sobre la azotea.<br>&iquest;Que altura maxima alcanza sobre el suelo? (2 decimales)',
            resp: R.numero(hmax, { dec: 2, tol: 0.05, unidad: 'm' }),
            pista: 'Calcula ' + (v0 * v0) + ' / 19.6 y sumale los ' + h0 + ' m de la azotea.',
            despues: 'Desde ahi cae libremente hasta el suelo.'
          },
          {
            seccion: 'Paso 3: plantear la ecuacion del suelo',
            queHacemos: 'Escribimos la altura en funcion del tiempo e igualamos a cero.',
            paraQue: 'Llegar al suelo es y = 0. Queda una cuadratica: por eso salen dos tiempos y hay que elegir.',
            queda: '&minus;4.9t&sup2; + ' + v0 + 't + ' + h0 + ' = 0',
            pregunta: 'La altura es y = ' + h0 + ' + ' + v0 + 't &minus; 4.9t&sup2;.<br>&iquest;Que condicion cumple al tocar el suelo?',
            resp: R.opcion(['y = 0', 'v = 0'], 0),
            pista: 'v = 0 pasa en el punto mas alto, no en el suelo.',
            despues: 'Hay que resolver la cuadratica.'
          },
          {
            seccion: 'Paso 4: resolver y elegir la raiz',
            queHacemos: 'Aplicamos la formula general y nos quedamos con el tiempo positivo.',
            paraQue: 'La otra raiz sale negativa: seria "cuando habria salido del suelo" si hubiera venido de antes. No sirve.',
            queda: 't = ' + F.n(t, 2) + ' s',
            pregunta: 'Resolviendo sale t = (' + v0 + ' + &radic;<span class="rad">' + F.n(disc, 2) + '</span>) / 9.8.<br>&iquest;Cuanto tarda en llegar al suelo? (2 decimales)',
            resp: R.numero(t, { dec: 2, tol: 0.05, unidad: 's' }),
            pista: '&radic;<span class="rad">' + F.n(disc, 2) + '</span> = ' + F.n(Math.sqrt(disc), 2) + '. Sumale ' + v0 + ' y divide entre 9.8.',
            despues: 'Comprobacion: tarda mas que si la hubieras soltado sin lanzarla, porque primero sube.'
          }
        ],
        final: 'Tarda <b>' + F.n(t, 2) + ' s</b> en llegar al suelo',
        receta: ['Elegir un sentido positivo y respetarlo',
          'La gravedad es negativa si arriba es positivo, suba o baje',
          'En el punto mas alto la velocidad es cero',
          'Tocar el suelo es y = 0: sale una cuadratica',
          'De las dos raices, quedarse con la positiva']
      }),
      enunciado: 'Desde una azotea de ' + h0 + ' m se lanza una piedra hacia arriba a ' + v0 + ' m/s.<br>' +
        '&iquest;Cuanto tarda en llegar al suelo? (2 decimales)',
      respuesta: R.numero(t, { dec: 2, tol: 0.05, unidad: 's' }),
      pistas: ['Escribe la altura: y = ' + h0 + ' + ' + v0 + 't &minus; 4.9t&sup2;, y hazla cero.',
        'Queda una cuadratica; de las dos raices te quedas con la positiva.'],
      solucion: ['Tomo arriba como positivo: v<sub>0</sub> = +' + v0 + ', a = &minus;9.8',
        'Altura: y = ' + h0 + ' + ' + v0 + 't &minus; 4.9t&sup2;',
        'En el suelo y = 0, asi que 4.9t&sup2; &minus; ' + v0 + 't &minus; ' + h0 + ' = 0',
        't = (' + v0 + ' + &radic;<span class="rad">' + F.n(disc, 2) + '</span>)/9.8 = <b>' + F.n(t, 2) + ' s</b>']
    };
  };

  EJ.tema({
    id: 'caida-libre',
    materia: 'fisica',
    grupo: 'Cinematica',
    nombre: 'Caida libre y tiro vertical',
    descripcion: 'Objetos que caen o se lanzan hacia arriba, con g = 9.8 m/s2.',
    etiquetas: ['gravedad', 'caida', 'tiro vertical', 'cinematica'],
    formulario: 'Se usa <b>g = 9.8 m/s&sup2;</b>, siempre hacia abajo.<br>' +
      '<b>Caida libre</b> (se suelta, v<sub>0</sub> = 0):<br>' +
      'h = &frac12; g t&sup2; &nbsp;&middot;&nbsp; t = &radic;<span class="rad">2h/g</span> &nbsp;&middot;&nbsp; v = g t = &radic;<span class="rad">2gh</span><br>' +
      '<b>Tiro vertical</b> (se lanza hacia arriba con v<sub>0</sub>):<br>' +
      'altura maxima = v<sub>0</sub>&sup2; / (2g) &nbsp;&middot;&nbsp; tiempo de subida = v<sub>0</sub> / g<br>' +
      'tiempo total (si vuelve al mismo nivel) = 2 v<sub>0</sub> / g<br>' +
      '<small>En el punto mas alto la velocidad es 0. La masa nunca aparece.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['tiempoCaida', 'Tiempo de caida'],
          ['velocidadCaida', 'Velocidad al llegar'],
          ['alturaCaida', 'Altura desde la que cayo'],
          ['concepto', 'Depende de la masa?']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        var h = r.elige([5, 10, 15, 20, 30, 45, 60, 80]);
        var tc = Math.sqrt(2 * h / g);
        var vc = g * tc;

        if (tf === 'tiempoCaida') {
          guiaDelPaso = G({
            intro: 'Se <b>suelta</b> un objeto desde <b>' + h + ' m</b> y queremos cuanto tarda en caer.<br>' +
              '"Se suelta" es un dato escondido: quiere decir que empieza con velocidad <b>cero</b>. ' +
              'Con eso, la caida es un MUA con a = g.',
            pasos: [
              {
                seccion: 'Paso 1: el dato escondido',
                queHacemos: 'Anotamos con que velocidad empieza.',
                paraQue: 'Soltar no es lanzar: si lo sueltas, v<sub>0</sub> = 0 y la formula se simplifica muchisimo.',
                queda: 'h = &frac12; g t&sup2;',
                pregunta: 'Se <b>suelta</b> (no se lanza). &iquest;Cuanto vale la velocidad inicial?',
                resp: R.numero(0, { dec: 2, unidad: 'm/s' }),
                pista: 'Soltar algo es dejarlo caer sin empujarlo.',
                despues: 'Con v<sub>0</sub> = 0, de d = v<sub>0</sub>t + &frac12;at&sup2; solo sobrevive el segundo pedazo.'
              },
              {
                seccion: 'Paso 2: despejar el tiempo',
                queHacemos: 'De h = &frac12;gt&sup2; despejamos t.',
                paraQue: 'Pasa el &frac12; y la g al otro lado, y al final se saca la raiz.',
                queda: 't = &radic;<span class="rad">2(' + h + ') / 9.8</span>',
                pregunta: '&iquest;Como queda despejado el tiempo?',
                resp: R.opcion(['t = &radic;<span class="rad">2h / g</span>', 't = 2h / g'], 0),
                pista: 'La t viene al cuadrado, asi que al final hay que sacar raiz.',
                despues: 'Ahora solo falta sustituir.'
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Sustituimos y sacamos la raiz.',
                paraQue: 'Comprobacion rapida: desde unos 5 m se tarda alrededor de 1 s. Si te sale 10 s, algo esta mal.',
                queda: 't = ' + F.n(tc, 2) + ' s',
                pregunta: 'Calcula &radic;<span class="rad">' + (2 * h) + ' / 9.8</span> (2 decimales)',
                resp: R.numero(tc, { dec: 2, tol: 0.03, unidad: 's' }),
                pista: (2 * h) + ' / 9.8 = ' + F.n(2 * h / g, 3) + ', y de ahi la raiz.',
                despues: ''
              }
            ],
            final: 'Tarda <b>' + F.n(tc, 2) + ' s</b> en caer',
            receta: ['"Se suelta" quiere decir v<sub>0</sub> = 0',
              'h = &frac12;gt&sup2;, y de ahi t = &radic;(2h/g)',
              'No sirve de nada la masa: no aparece',
              'Comprobar que el numero sea creible']
          });
          enun = 'Se suelta un objeto desde ' + h + ' m de altura.<br>&iquest;Cuanto tarda en llegar al suelo? (2 decimales)';
          resp = R.numero(tc, { dec: 2, tol: 0.03, unidad: 's' });
          pistas = ['Al soltarlo la velocidad inicial es cero, asi que h = &frac12;gt&sup2;.',
            'Despeja: t = &radic;<span class="rad">2h/g</span> = &radic;<span class="rad">' + (2 * h) + '/9.8</span>.'];
          sol = ['Al soltarlo, v<sub>0</sub> = 0, asi que h = &frac12;gt&sup2;',
            't = &radic;<span class="rad">2h/g</span> = &radic;<span class="rad">' + (2 * h) + '/9.8</span>',
            't = <b>' + F.n(tc, 2) + ' s</b>'];

        } else if (tf === 'velocidadCaida') {
          guiaDelPaso = G({
            intro: 'Se suelta un objeto desde <b>' + h + ' m</b> y queremos la velocidad con la que llega al suelo.<br>' +
              'Hay dos caminos. El corto usa <b>v = &radic;(2gh)</b>, que no necesita el tiempo.',
            pasos: [
              {
                seccion: 'Paso 1: elegir el camino',
                queHacemos: 'Vemos que formula evita calcular el tiempo.',
                paraQue: 'Se podria hallar primero el tiempo y luego v = gt, pero son dos cuentas en vez de una, y dos oportunidades de equivocarse.',
                queda: 'v = &radic;<span class="rad">2(9.8)(' + h + ')</span>',
                pregunta: '&iquest;Que formula da la velocidad sin pasar por el tiempo?',
                resp: R.opcion(['v = &radic;<span class="rad">2gh</span>', 'v = g h'], 0),
                pista: 'Es la de v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad con v<sub>0</sub> = 0, a = g y d = h.',
                despues: 'Sale de la formula de MUA que no lleva tiempo.'
              },
              {
                seccion: 'Paso 2: el numero de adentro',
                queHacemos: 'Calculamos 2gh.',
                paraQue: 'Es lo que va dentro de la raiz. Ese numero es la velocidad AL CUADRADO, no la velocidad.',
                queda: 'v&sup2; = ' + F.n(2 * g * h, 2),
                pregunta: 'Calcula 2 &middot; 9.8 &middot; ' + h + ' (2 decimales)',
                resp: R.numero(2 * g * h, { dec: 2, tol: 0.05 }),
                pista: '19.6 &times; ' + h + '.',
                despues: 'Ojo: esto todavia es v al cuadrado.'
              },
              {
                seccion: 'Paso 3: sacar la raiz',
                queHacemos: 'Sacamos la raiz cuadrada.',
                paraQue: 'El paso que mas se olvida. Comprobacion: desde ' + h + ' m se llega a unos ' + F.n(vc, 0) + ' m/s, que son ' + F.n(vc * 3.6, 0) + ' km/h.',
                queda: 'v = ' + F.n(vc, 2) + ' m/s',
                pregunta: 'Saca la raiz de ' + F.n(2 * g * h, 2) + ' (2 decimales)',
                resp: R.numero(vc, { dec: 2, tol: 0.03, unidad: 'm/s' }),
                pista: '&radic;<span class="rad">' + F.n(2 * g * h, 2) + '</span>.',
                despues: ''
              }
            ],
            final: 'Llega a <b>' + F.n(vc, 2) + ' m/s</b>',
            receta: ['Sin tiempo entre los datos: v = &radic;(2gh)',
              'Primero el numero de dentro de la raiz',
              'Sacar la raiz al final',
              'Tampoco aqui interviene la masa']
          });
          enun = 'Se suelta un objeto desde ' + h + ' m.<br>&iquest;Con que velocidad llega al suelo? (2 decimales)';
          resp = R.numero(vc, { dec: 2, tol: 0.03, unidad: 'm/s' });
          pistas = ['Usa v = &radic;<span class="rad">2gh</span>, que no necesita el tiempo.',
            '2gh = 2(9.8)(' + h + ') = ' + F.n(2 * g * h, 2) + '.'];
          sol = ['De v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad con v<sub>0</sub> = 0: v = &radic;<span class="rad">2gh</span>',
            'v = &radic;<span class="rad">2(9.8)(' + h + ')</span> = &radic;<span class="rad">' + F.n(2 * g * h, 2) + '</span>',
            'v = <b>' + F.n(vc, 2) + ' m/s</b>'];

        } else {
          var td = r.elige([1, 1.5, 2, 2.5, 3, 4]);
          var hd = 0.5 * g * td * td;
          guiaDelPaso = G({
            intro: 'Un objeto se suelta y tarda <b>' + td + ' s</b> en llegar al suelo.<br>' +
              'Ahora el problema va al reves: nos dan el tiempo y hay que encontrar desde que altura cayo.',
            pasos: [
              {
                seccion: 'Paso 1: la formula',
                queHacemos: 'Escribimos la altura en funcion del tiempo.',
                paraQue: 'Al soltarlo v<sub>0</sub> = 0, asi que de d = v<sub>0</sub>t + &frac12;at&sup2; solo queda el segundo pedazo.',
                queda: 'h = &frac12;(9.8)(' + td + ')&sup2;',
                pregunta: 'Se solto desde el reposo. &iquest;Que formula da la altura?',
                resp: R.opcion(['h = &frac12; g t&sup2;', 'h = g t'], 0),
                pista: 'La segunda daria una velocidad, no una distancia. Mira las unidades.',
                despues: 'Solo hay que sustituir.'
              },
              {
                seccion: 'Paso 2: elevar el tiempo al cuadrado',
                queHacemos: 'Primero el cuadrado del tiempo.',
                paraQue: 'El tiempo va AL CUADRADO: por eso al doblar el tiempo la altura se cuadruplica.',
                queda: 'h = &frac12;(9.8)(' + F.n(td * td, 2) + ')',
                pregunta: 'Calcula ' + td + '&sup2; (2 decimales)',
                resp: R.numero(td * td, { dec: 2, tol: 0.02 }),
                pista: td + ' &times; ' + td + '.',
                despues: ''
              },
              {
                seccion: 'Paso 3: completar la cuenta',
                queHacemos: 'Multiplicamos por g y dividimos entre 2.',
                paraQue: 'Comprobacion: en 1 s se caen unos 4.9 m; en 2 s, unos 19.6 m. Crece rapido.',
                queda: 'h = ' + F.n(hd, 2) + ' m',
                pregunta: 'Calcula &frac12; &middot; 9.8 &middot; ' + F.n(td * td, 2) + ' (2 decimales)',
                resp: R.numero(hd, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: '4.9 &times; ' + F.n(td * td, 2) + '.',
                despues: ''
              }
            ],
            final: 'Cayo desde <b>' + F.n(hd, 2) + ' m</b>',
            receta: ['Al soltarlo: h = &frac12;gt&sup2;',
              'Elevar el tiempo al cuadrado primero',
              'Multiplicar por 4.9 (que es g/2)',
              'En 1 s se caen 4.9 m; la altura crece con el cuadrado del tiempo']
          });
          enun = 'Un objeto se suelta y tarda ' + td + ' s en llegar al suelo.<br>&iquest;Desde que altura cayo? (2 decimales)';
          resp = R.numero(hd, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['Al soltarlo v<sub>0</sub> = 0, asi que h = &frac12;gt&sup2;.',
            'h = &frac12;(9.8)(' + td + ')&sup2; = 4.9 &times; ' + F.n(td * td, 2) + '.'];
          sol = ['Al soltarlo, h = &frac12;gt&sup2;',
            'h = &frac12;(9.8)(' + F.n(td * td, 2) + ')',
            'h = <b>' + F.n(hd, 2) + ' m</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['alturaMax', 'Altura maxima'],
          ['tiempoSubida', 'Tiempo de subida'],
          ['tiempoTotal', 'Tiempo total de vuelo'],
          ['velocidadRegreso', 'Velocidad de regreso']
        ]);

        var v0 = r.elige([5, 8, 10, 12, 14, 15, 18, 20, 25]);
        var hmax = v0 * v0 / (2 * g);
        var tsub = v0 / g;

        if (t2 === 'alturaMax') {
          guiaDelPaso = G({
            intro: 'Se lanza una pelota hacia arriba a <b>' + v0 + ' m/s</b> y queremos saber hasta donde sube.<br>' +
              'La clave esta en un dato que el enunciado no dice pero que siempre se cumple: ' +
              'en el <b>punto mas alto la velocidad vale cero</b>.',
            pasos: [
              {
                seccion: 'Paso 1: el dato que no te dan',
                queHacemos: 'Anotamos cuanto vale la velocidad arriba del todo.',
                paraQue: 'Sin ese dato el problema no se puede resolver. Subiendo la pelota va frenando, y justo antes de empezar a bajar se queda quieta un instante.',
                queda: 'v<sub>f</sub> = 0 en el punto mas alto',
                pregunta: 'En el punto mas alto, &iquest;cuanto vale la velocidad?',
                resp: R.numero(0, { dec: 2, unidad: 'm/s' }),
                pista: 'Si todavia tuviera velocidad hacia arriba, seguiria subiendo.',
                despues: 'Con v<sub>f</sub> = 0 se puede usar la formula sin tiempo.'
              },
              {
                seccion: 'Paso 2: elegir la formula',
                queHacemos: 'Usamos la que relaciona velocidades con altura.',
                paraQue: 'No nos piden el tiempo, asi que conviene la formula que no lo lleva: v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; &minus; 2gh.',
                queda: '0 = ' + (v0 * v0) + ' &minus; 19.6h',
                pregunta: 'Con v<sub>f</sub> = 0, &iquest;que formula conviene?',
                resp: R.opcion(['v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; &minus; 2gh', 'v<sub>f</sub> = v<sub>0</sub> &minus; gt'], 0),
                pista: 'La segunda lleva tiempo, y no nos lo piden ni nos lo dan.',
                despues: 'De ahi se despeja h = v<sub>0</sub>&sup2;/(2g).'
              },
              {
                seccion: 'Paso 3: calcular la altura',
                queHacemos: 'Dividimos el cuadrado de la velocidad entre 2g.',
                paraQue: 'Fijate en el cuadrado: al doblar la velocidad de lanzamiento, la altura se hace CUATRO veces mayor.',
                queda: 'h = ' + F.n(hmax, 2) + ' m',
                pregunta: 'Calcula ' + (v0 * v0) + ' / 19.6 (2 decimales)',
                resp: R.numero(hmax, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'Division directa.',
                despues: ''
              }
            ],
            final: 'Sube <b>' + F.n(hmax, 2) + ' m</b>',
            receta: ['Arriba del todo la velocidad es CERO',
              'Sin tiempo de por medio: v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; &minus; 2gh',
              'h = v<sub>0</sub>&sup2; / (2g)',
              'La altura crece con el CUADRADO de la velocidad']
          });
          enun = 'Se lanza una pelota hacia arriba con ' + v0 + ' m/s.<br>&iquest;Que altura maxima alcanza? (2 decimales)';
          resp = R.numero(hmax, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['En el punto mas alto la velocidad es cero.',
            'h = v<sub>0</sub>&sup2;/(2g) = ' + (v0 * v0) + '/19.6.'];
          sol = ['Arriba del todo v = 0',
            'De v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh con v = 0: h = v<sub>0</sub>&sup2;/(2g)',
            'h = ' + (v0 * v0) + '/19.6 = <b>' + F.n(hmax, 2) + ' m</b>'];

        } else if (t2 === 'tiempoSubida') {
          guiaDelPaso = G({
            intro: 'Se lanza algo hacia arriba a <b>' + v0 + ' m/s</b>. &iquest;Cuanto tarda en llegar a lo mas alto?<br>' +
              'La gravedad le quita <b>9.8 m/s de velocidad en cada segundo</b>. Todo el problema es ver ' +
              'cuantos segundos tarda en quitarle los ' + v0 + ' m/s que llevaba.',
            pasos: [
              {
                seccion: 'Paso 1: que hace la gravedad',
                queHacemos: 'Vemos cuanta velocidad pierde por segundo.',
                paraQue: 'Eso es exactamente lo que significa g = 9.8 m/s&sup2;: cada segundo, 9.8 m/s menos.',
                queda: 'pierde 9.8 m/s cada segundo',
                pregunta: '&iquest;Cuanta velocidad pierde la pelota en cada segundo de subida?',
                resp: R.numero(9.8, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'Es el valor de g.',
                despues: 'Arranca con ' + v0 + ' m/s y va perdiendo de 9.8 en 9.8.'
              },
              {
                seccion: 'Paso 2: cuantos segundos tarda',
                queHacemos: 'Dividimos la velocidad inicial entre 9.8.',
                paraQue: 'Es lo mismo que despejar t de 0 = v<sub>0</sub> &minus; gt, pero entendiendo lo que se hace.',
                queda: 't = ' + F.n(tsub, 2) + ' s',
                pregunta: 'Si arranca con ' + v0 + ' m/s y pierde 9.8 cada segundo, &iquest;cuanto tarda en quedarse sin velocidad? (2 decimales)',
                resp: R.numero(tsub, { dec: 2, tol: 0.03, unidad: 's' }),
                pista: v0 + ' &divide; 9.8.',
                despues: 'En ese instante esta en el punto mas alto.'
              },
              {
                seccion: 'Paso 3: lo que sigue',
                queHacemos: 'Pensamos que pasa despues de ese instante.',
                paraQue: 'La bajada tarda lo MISMO que la subida. Por eso el vuelo completo dura el doble.',
                queda: 'sube en ' + F.n(tsub, 2) + ' s;  el vuelo entero dura ' + F.n(2 * tsub, 2) + ' s',
                pregunta: 'Si vuelve a la mano, &iquest;cuanto dura el vuelo completo?',
                resp: R.opcion(['El doble: ' + F.n(2 * tsub, 2) + ' s', 'Lo mismo: ' + F.n(tsub, 2) + ' s'], 0),
                pista: 'Bajar desde la altura maxima cuesta lo mismo que subir hasta ella.',
                despues: ''
              }
            ],
            final: 'Tarda <b>' + F.n(tsub, 2) + ' s</b> en llegar arriba',
            receta: ['La gravedad quita 9.8 m/s cada segundo',
              'Tiempo de subida = v<sub>0</sub> / g',
              'Arriba del todo la velocidad es cero',
              'La bajada dura lo mismo que la subida']
          });
          enun = 'Se lanza un objeto hacia arriba con ' + v0 + ' m/s.<br>&iquest;Cuanto tarda en alcanzar su altura maxima? (2 decimales)';
          resp = R.numero(tsub, { dec: 2, tol: 0.03, unidad: 's' });
          pistas = ['Arriba del todo la velocidad es cero: 0 = v<sub>0</sub> &minus; gt.',
            't = v<sub>0</sub>/g = ' + v0 + '/9.8.'];
          sol = ['En el punto mas alto v = 0',
            '0 = ' + v0 + ' &minus; 9.8t',
            't = ' + v0 + '/9.8 = <b>' + F.n(tsub, 2) + ' s</b>'];

        } else if (t2 === 'tiempoTotal') {
          var ttot = 2 * tsub;
          guiaDelPaso = G({
            intro: 'Se lanza una pelota hacia arriba a <b>' + v0 + ' m/s</b> y vuelve a la misma altura.<br>' +
              'El vuelo tiene dos mitades <b>identicas</b>: lo que tarda en subir es exactamente lo que tarda en bajar.',
            pasos: [
              {
                seccion: 'Paso 1: la subida',
                queHacemos: 'Calculamos cuanto tarda en llegar arriba.',
                paraQue: 'Arriba del todo la velocidad es cero, asi que t = v<sub>0</sub>/g.',
                queda: 'sube en ' + F.n(tsub, 2) + ' s',
                pregunta: 'Calcula ' + v0 + ' / 9.8 (2 decimales)',
                resp: R.numero(tsub, { dec: 2, tol: 0.03, unidad: 's' }),
                pista: 'Division directa.',
                despues: 'Esa es solo la mitad del viaje.'
              },
              {
                seccion: 'Paso 2: por que la bajada tarda lo mismo',
                queHacemos: 'Comparamos subida y bajada.',
                paraQue: 'Al subir pierde 9.8 m/s por segundo; al bajar gana 9.8 m/s por segundo, desde la misma altura y empezando en cero. Es la misma pelicula al reves.',
                queda: 'total = 2 &times; ' + F.n(tsub, 2),
                pregunta: '&iquest;Cuanto tarda en bajar desde lo mas alto?',
                resp: R.opcion(['Lo mismo que en subir', 'Menos, porque baja acelerando'], 0),
                pista: 'Sube frenando y baja acelerando, pero con la misma g y la misma altura.',
                despues: 'Por eso el total es el doble de la subida.'
              },
              {
                seccion: 'Paso 3: el vuelo completo',
                queHacemos: 'Multiplicamos por dos.',
                paraQue: 'Formula rapida: t total = 2v<sub>0</sub>/g. Sale de este razonamiento, no hay que memorizarla suelta.',
                queda: 't total = ' + F.n(ttot, 2) + ' s',
                pregunta: 'Calcula 2 &times; ' + F.n(tsub, 2) + ' (2 decimales)',
                resp: R.numero(ttot, { dec: 2, tol: 0.05, unidad: 's' }),
                pista: 'El doble del tiempo de subida.',
                despues: ''
              }
            ],
            final: 'El vuelo dura <b>' + F.n(ttot, 2) + ' s</b>',
            receta: ['Subida y bajada duran lo mismo',
              'Tiempo de subida = v<sub>0</sub>/g',
              'Tiempo total = 2v<sub>0</sub>/g',
              'Solo vale si vuelve a la MISMA altura de la que salio']
          });
          enun = 'Se lanza una pelota hacia arriba con ' + v0 + ' m/s y se atrapa a la misma altura.<br>&iquest;Cuanto dura el vuelo? (2 decimales)';
          resp = R.numero(ttot, { dec: 2, tol: 0.05, unidad: 's' });
          pistas = ['La subida y la bajada duran lo mismo.',
            't total = 2v<sub>0</sub>/g = 2(' + v0 + ')/9.8.'];
          sol = ['Tiempo de subida: ' + v0 + '/9.8 = ' + F.n(tsub, 2) + ' s',
            'La bajada tarda lo mismo',
            't total = 2(' + F.n(tsub, 2) + ') = <b>' + F.n(ttot, 2) + ' s</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'Se lanza una pelota hacia arriba a <b>' + v0 + ' m/s</b>.<br>' +
              '&iquest;Con que velocidad vuelve a la mano? La respuesta sorprende la primera vez: ' +
              'con <b>la misma rapidez</b> con la que salio.',
            pasos: [
              {
                seccion: 'Paso 1: hasta donde sube',
                queHacemos: 'Calculamos la altura maxima.',
                paraQue: 'Desde ahi empieza a caer, y esa altura es la que va a recorrer bajando.',
                queda: 'sube ' + F.n(hmax, 2) + ' m',
                pregunta: 'Calcula la altura maxima: ' + (v0 * v0) + ' / 19.6 (2 decimales)',
                resp: R.numero(hmax, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'h = v<sub>0</sub>&sup2;/(2g).',
                despues: 'Ahi se queda un instante y empieza a caer.'
              },
              {
                seccion: 'Paso 2: la caida desde ahi',
                queHacemos: 'Calculamos con que velocidad llega abajo tras caer esa altura.',
                paraQue: 'Es una caida libre normal desde ' + F.n(hmax, 2) + ' m: v = &radic;(2gh).',
                queda: 'vuelve a ' + F.n(v0, 2) + ' m/s',
                pregunta: 'Calcula &radic;<span class="rad">2(9.8)(' + F.n(hmax, 2) + ')</span> (2 decimales)',
                resp: R.numero(v0, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'Te va a salir un numero muy conocido.',
                despues: 'Da exactamente los ' + v0 + ' m/s del lanzamiento.'
              },
              {
                seccion: 'Paso 3: por que pasa esto',
                queHacemos: 'Entendemos por que coincide.',
                paraQue: 'La gravedad le quita velocidad subiendo y se la devuelve bajando, en la misma altura y al mismo ritmo. Lo unico que cambia es el SENTIDO: sale hacia arriba y vuelve hacia abajo.',
                queda: 'misma rapidez, sentido contrario',
                pregunta: '&iquest;Que cambia entre la salida y el regreso?',
                resp: R.opcion(['Solo el sentido: la rapidez es la misma', 'Vuelve mas lento por la gravedad'], 0),
                pista: 'En el aire real vuelve algo mas lento por el rozamiento, pero en estos problemas se desprecia.',
                despues: ''
              }
            ],
            final: 'Vuelve con <b>' + F.n(v0, 2) + ' m/s</b>, la misma rapidez con la que salio',
            receta: ['Sube hasta v<sub>0</sub>&sup2;/(2g) y desde ahi cae',
              'Al volver al mismo nivel, la rapidez es la misma',
              'Lo unico que cambia es el sentido',
              'La gravedad quita y devuelve exactamente lo mismo']
          });
          enun = 'Se lanza una pelota hacia arriba con ' + v0 + ' m/s.<br>&iquest;Con que velocidad regresa a la mano? (2 decimales)';
          resp = R.numero(v0, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['Sube hasta v<sub>0</sub>&sup2;/(2g) y desde ahi cae libremente.',
            'Al caer la misma altura recupera exactamente la velocidad que perdio.'];
          sol = ['Altura maxima: ' + (v0 * v0) + '/19.6 = ' + F.n(hmax, 2) + ' m',
            'Cae esa altura: v = &radic;<span class="rad">2(9.8)(' + F.n(hmax, 2) + ')</span>',
            'v = <b>' + F.n(v0, 2) + ' m/s</b>, la misma con la que salio'];
        }

      } else {
        var t3 = r.subtema([
          ['desdeAltura', 'Lanzado desde una azotea'],
          ['alturaEnT', 'Altura en un instante'],
          ['velocidadEnAltura', 'Velocidad a cierta altura']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        var w0 = r.elige([10, 12, 15, 18, 20, 25]);
        if (t3 === 'alturaEnT') {
          var te = r.elige([1, 1.5, 2, 2.5, 3]);
          var ye = w0 * te - 0.5 * g * te * te;
          var subiendo = w0 - g * te > 0;
          guiaDelPaso = G({
            intro: 'Se lanza hacia arriba a <b>' + w0 + ' m/s</b> y queremos saber a que altura esta a los <b>' + te + ' s</b>.<br>' +
              'La altura tiene dos pedazos que <b>compiten</b>: lo que sube por el lanzamiento y lo que la gravedad le baja.',
            pasos: [
              {
                seccion: 'Paso 1: lo que sube por el lanzamiento',
                queHacemos: 'Multiplicamos la velocidad inicial por el tiempo.',
                paraQue: 'Es lo que habria subido si la gravedad no existiera: subiria para siempre a velocidad constante.',
                queda: F.n(w0 * te, 2) + ' m  &minus;  ?',
                pregunta: 'Calcula ' + w0 + ' &times; ' + te + ' (2 decimales)',
                resp: R.numero(w0 * te, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'Multiplicacion directa.',
                despues: 'Pero la gravedad le va quitando altura.'
              },
              {
                seccion: 'Paso 2: lo que la gravedad le baja',
                queHacemos: 'Calculamos &frac12;gt&sup2;.',
                paraQue: 'Ese pedazo crece con el CUADRADO del tiempo: al principio es poco, pero acaba ganando siempre.',
                queda: F.n(w0 * te, 2) + ' m  &minus;  ' + F.n(0.5 * g * te * te, 2) + ' m',
                pregunta: 'Calcula 4.9 &times; ' + F.n(te * te, 2) + ' (2 decimales)',
                resp: R.numero(0.5 * g * te * te, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'Primero ' + te + '&sup2; = ' + F.n(te * te, 2) + ', luego por 4.9.',
                despues: ''
              },
              {
                seccion: 'Paso 3: restar',
                queHacemos: 'Le quitamos al primero el segundo.',
                paraQue: 'Si diera negativo, querria decir que ya paso por debajo del punto de lanzamiento.',
                queda: 'y = ' + F.n(ye, 2) + ' m',
                pregunta: 'Calcula ' + F.n(w0 * te, 2) + ' &minus; ' + F.n(0.5 * g * te * te, 2) + ' (2 decimales)',
                resp: R.numero(ye, { dec: 2, tol: 0.05, unidad: 'm' }),
                pista: 'Resta directa.',
                despues: 'A los ' + te + ' s esta a ' + F.n(ye, 2) + ' m de donde salio.'
              },
              {
                seccion: 'Paso 4: subiendo o bajando',
                queHacemos: 'Comparamos ese instante con el tiempo de subida.',
                paraQue: 'La altura sola no lo dice: por cada altura pasa DOS veces, una subiendo y otra bajando.',
                queda: 'y = ' + F.n(ye, 2) + ' m, ' + (subiendo ? 'subiendo' : 'bajando'),
                pregunta: 'La pelota sube durante ' + F.n(w0 / g, 2) + ' s.<br>A los ' + te + ' s, &iquest;va subiendo o bajando?',
                resp: R.opcion(['Subiendo', 'Bajando'], subiendo ? 0 : 1),
                pista: 'Compara ' + te + ' s con los ' + F.n(w0 / g, 2) + ' s que tarda en llegar arriba.',
                despues: ''
              }
            ],
            final: 'A los ' + te + ' s esta a <b>' + F.n(ye, 2) + ' m</b>, ' + (subiendo ? 'todavia subiendo' : 'ya bajando'),
            receta: ['y = v<sub>0</sub>t &minus; &frac12;gt&sup2;: dos pedazos que compiten',
              'El primero sube, el segundo baja y crece con el cuadrado',
              'Para saber si sube o baja, comparar con v<sub>0</sub>/g',
              'Por cada altura se pasa dos veces']
          });
          enun = 'Se lanza una pelota hacia arriba con ' + w0 + ' m/s.<br>&iquest;A que altura esta a los ' + te + ' s? (2 decimales)';
          resp = R.numero(ye, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['y = v<sub>0</sub>t &minus; &frac12;gt&sup2;.',
            'y = ' + w0 + '(' + te + ') &minus; 4.9(' + F.n(te * te, 2) + ').'];
          sol = ['y = v<sub>0</sub>t &minus; &frac12;gt&sup2;',
            'y = ' + F.n(w0 * te, 2) + ' &minus; ' + F.n(0.5 * g * te * te, 2),
            'y = <b>' + F.n(ye, 2) + ' m</b>'];

        } else {
          var hp = r.elige([2, 3, 4, 5, 6, 8]);
          var hmx = w0 * w0 / (2 * g);
          while (hp >= hmx) { w0 = r.elige([15, 18, 20, 25]); hmx = w0 * w0 / (2 * g); }
          var vp = Math.sqrt(w0 * w0 - 2 * g * hp);
          guiaDelPaso = G({
            intro: 'Se lanza hacia arriba a <b>' + w0 + ' m/s</b>. &iquest;Con que rapidez pasa por los <b>' + hp + ' m</b>?<br>' +
              'Como no nos dan ni nos piden el tiempo, conviene la formula que no lo lleva.',
            pasos: [
              {
                seccion: 'Paso 1: elegir la formula',
                queHacemos: 'Usamos la que relaciona velocidad con altura.',
                paraQue: 'v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh evita tener que calcular primero el tiempo.',
                queda: 'v&sup2; = ' + (w0 * w0) + ' &minus; 19.6(' + hp + ')',
                pregunta: 'No nos dan el tiempo. &iquest;Que formula conviene?',
                resp: R.opcion(['v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh', 'v = v<sub>0</sub> &minus; gt'], 0),
                pista: 'La segunda lleva t, que no tenemos.',
                despues: ''
              },
              {
                seccion: 'Paso 2: lo que pierde subiendo',
                queHacemos: 'Calculamos 2gh.',
                paraQue: 'Es la parte de v&sup2; que se gasta en subir esos metros.',
                queda: 'v&sup2; = ' + (w0 * w0) + ' &minus; ' + F.n(2 * g * hp, 2),
                pregunta: 'Calcula 19.6 &times; ' + hp + ' (2 decimales)',
                resp: R.numero(2 * g * hp, { dec: 2, tol: 0.05 }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: restar y sacar la raiz',
                queHacemos: 'Restamos y sacamos la raiz.',
                paraQue: 'Comprobacion: pasa por esa altura dos veces, subiendo y bajando, y las dos con la MISMA rapidez.',
                queda: 'v = ' + F.n(vp, 2) + ' m/s',
                pregunta: 'Calcula &radic;<span class="rad">' + (w0 * w0) + ' &minus; ' + F.n(2 * g * hp, 2) + '</span> (2 decimales)',
                resp: R.numero(vp, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'Dentro de la raiz queda ' + F.n(w0 * w0 - 2 * g * hp, 2) + '.',
                despues: 'Esa misma rapidez tendra al pasar de bajada por los ' + hp + ' m.'
              }
            ],
            final: 'Pasa a <b>' + F.n(vp, 2) + ' m/s</b>',
            receta: ['Sin tiempo: v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh',
              'Calcular 2gh y restarlo',
              'Sacar la raiz al final',
              'Por cada altura pasa dos veces con la misma rapidez']
          });
          enun = 'Se lanza un objeto hacia arriba con ' + w0 + ' m/s.<br>&iquest;Con que rapidez pasa por los ' + hp + ' m de altura? (2 decimales)';
          resp = R.numero(vp, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['Usa v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh, que no necesita el tiempo.',
            'v&sup2; = ' + (w0 * w0) + ' &minus; 19.6(' + hp + ') = ' + F.n(w0 * w0 - 2 * g * hp, 2) + '.'];
          sol = ['v&sup2; = v<sub>0</sub>&sup2; &minus; 2gh',
            'v&sup2; = ' + (w0 * w0) + ' &minus; ' + F.n(2 * g * hp, 2) + ' = ' + F.n(w0 * w0 - 2 * g * hp, 2),
            'v = <b>' + F.n(vp, 2) + ' m/s</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
