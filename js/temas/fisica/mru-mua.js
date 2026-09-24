/* MRU y MUA: movimiento rectilineo uniforme y uniformemente acelerado. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  /* Tabla de posiciones para los ejercicios de "que movimiento es". */
  function tabla(tiempos, valores, unidad) {
    var fila1 = '', fila2 = '';
    tiempos.forEach(function (t) { fila1 += '<td>' + t + '</td>'; });
    valores.forEach(function (v) { fila2 += '<td>' + F.n(v, 1) + '</td>'; });
    return '<table class="datos"><tr><th>t (s)</th>' + fila1 + '</tr>' +
      '<tr><th>' + unidad + '</th>' + fila2 + '</tr></table>';
  }

  var extra = {};

  /* ---------------- identificar el tipo de movimiento ---------------- */
  extra.identificar = function (r) {
    var esMRU = r.bool();
    var v0 = r.entero(2, 12);
    var a = r.entero(2, 6);
    var ts = [0, 1, 2, 3, 4];
    var xs = ts.map(function (t) {
      return esMRU ? v0 * t : v0 * t + 0.5 * a * t * t;
    });
    /* en MRU la posicion avanza a saltos iguales; en MUA los saltos crecen */
    var saltos = [];
    for (var i = 1; i < xs.length; i++) saltos.push(xs[i] - xs[i - 1]);

    return {
      guia: G({
        intro: 'Un movil se mueve en linea recta y nos dan su <b>posicion</b> cada segundo.<br>' +
          'Hay que decir si va con <b>velocidad constante</b> (MRU) o <b>acelerando</b> (MUA). ' +
          'No hace falta ninguna formula: basta con mirar cuanto avanza en cada segundo.',
        tablero: function () { return tabla(ts, xs, 'x (m)'); },
        pasos: [
          {
            seccion: 'Paso 1: cuanto avanza cada segundo',
            queHacemos: 'Restamos cada posicion con la anterior.',
            paraQue: 'Esa resta es lo que avanzo en ese segundo. Comparandolas se ve de un vistazo si el movil mantiene el ritmo o lo cambia.',
            queda: 'primer avance: ' + F.n(saltos[0], 1) + ' m',
            pregunta: 'Del segundo 0 al 1 la posicion pasa de ' + F.n(xs[0], 1) + ' m a ' + F.n(xs[1], 1) + ' m.<br>&iquest;Cuanto avanzo? (1 decimal)',
            resp: R.numero(saltos[0], { dec: 1, tol: 0.05, unidad: 'm' }),
            pista: F.n(xs[1], 1) + ' &minus; ' + F.n(xs[0], 1) + '.',
            despues: 'Ese es el avance del primer segundo.'
          },
          {
            seccion: 'Paso 1: cuanto avanza cada segundo',
            queHacemos: 'Ahora el avance del segundo siguiente.',
            paraQue: 'Con dos avances ya se pueden comparar.',
            queda: 'avances: ' + F.n(saltos[0], 1) + ' y ' + F.n(saltos[1], 1) + ' m',
            pregunta: 'Y del segundo 1 al 2: de ' + F.n(xs[1], 1) + ' m a ' + F.n(xs[2], 1) + ' m.<br>&iquest;Cuanto avanzo? (1 decimal)',
            resp: R.numero(saltos[1], { dec: 1, tol: 0.05, unidad: 'm' }),
            pista: F.n(xs[2], 1) + ' &minus; ' + F.n(xs[1], 1) + '.',
            despues: esMRU ? 'Igual que el anterior.' : 'Mas que el anterior: el movil va cada vez mas rapido.'
          },
          {
            seccion: 'Paso 2: comparar los avances',
            queHacemos: 'Vemos si los avances son iguales o van creciendo.',
            paraQue: 'Avances iguales quieren decir velocidad constante. Avances que crecen parejo quieren decir aceleracion constante.',
            queda: esMRU ? 'avances iguales' : 'avances que crecen',
            pregunta: '&iquest;Como son los avances entre si?',
            resp: R.opcion(['Todos iguales', 'Van creciendo'], esMRU ? 0 : 1),
            pista: 'Los cuatro avances son ' + saltos.map(function (s) { return F.n(s, 1); }).join(', ') + ' m.',
            despues: esMRU ? 'Recorre lo mismo en cada segundo.' : 'Cada segundo recorre mas que el anterior.'
          },
          {
            seccion: 'Paso 3: ponerle nombre',
            queHacemos: 'Traducimos eso al nombre del movimiento.',
            paraQue: 'MRU es velocidad constante (aceleracion cero). MUA es aceleracion constante, con la velocidad cambiando parejo.',
            queda: esMRU ? 'MRU' : 'MUA',
            pregunta: '&iquest;Que movimiento es?',
            resp: R.opcion(['MRU (velocidad constante)', 'MUA (aceleracion constante)'], esMRU ? 0 : 1),
            pista: esMRU ? 'Si en cada segundo avanza lo mismo, la velocidad no cambia.'
              : 'Si cada segundo avanza mas, la velocidad esta aumentando.',
            despues: ''
          }
        ],
        final: 'Es un <b>' + (esMRU ? 'MRU' : 'MUA') + '</b>',
        receta: ['Restar posiciones seguidas para ver cuanto avanza cada segundo',
          'Avances iguales: MRU, velocidad constante',
          'Avances que crecen parejo: MUA, aceleracion constante',
          'No hace falta calcular la velocidad para decidirlo']
      }),
      enunciado: 'Un movil recorre una linea recta y estas son sus posiciones:' +
        tabla(ts, xs, 'x (m)') +
        '&iquest;Que tipo de movimiento es?',
      respuesta: R.opcion(['MRU (velocidad constante)', 'MUA (aceleracion constante)'], esMRU ? 0 : 1),
      pistas: ['Fijate cuanto avanza en cada segundo: resta cada posicion con la anterior.',
        'Los avances son ' + saltos.map(function (s) { return F.n(s, 1); }).join(', ') + ' m.'],
      solucion: ['Avances por segundo: ' + saltos.map(function (s) { return F.n(s, 1); }).join(', ') + ' m',
        esMRU ? 'Son todos iguales, asi que la velocidad no cambia'
          : 'Van creciendo parejo, asi que la velocidad aumenta a ritmo constante',
        'Es un <b>' + (esMRU ? 'MRU' : 'MUA') + '</b>']
    };
  };

  /* ---------------- frenado (MUA con aceleracion negativa) ---------------- */
  extra.frenado = function (r) {
    var v0 = r.elige([10, 12, 15, 18, 20, 25, 30]);
    var d = r.elige([10, 15, 20, 25, 30, 40, 50]);
    var a = -(v0 * v0) / (2 * d);
    var t = v0 / (-a);
    return {
      guia: G({
        intro: 'Un coche va a <b>' + v0 + ' m/s</b> y frena hasta detenerse en <b>' + d + ' m</b>.<br>' +
          'Hay que encontrar su aceleracion. Como no nos dan el tiempo, la formula que sirve es ' +
          '<b>v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad</b>, que es la unica que no lo lleva.',
        pasos: [
          {
            seccion: 'Paso 1: elegir la formula',
            queHacemos: 'Miramos que datos tenemos y cual falta.',
            paraQue: 'Hay cuatro formulas de MUA y cada una deja fuera una variable. Sin tiempo, la que toca es la que no lo usa.',
            queda: 'v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad',
            pregunta: 'Tenemos v<sub>0</sub>, v<sub>f</sub> y d, pero <b>no</b> el tiempo.<br>&iquest;Que formula conviene?',
            resp: R.opcion(['v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad',
              'v<sub>f</sub> = v<sub>0</sub> + at'], 0),
            pista: 'La segunda necesita el tiempo, y no lo tenemos. Habria que calcularlo aparte: mas trabajo y mas oportunidades de error.',
            despues: 'Esa formula relaciona velocidades con distancia, sin pasar por el tiempo.'
          },
          {
            seccion: 'Paso 2: cuanto vale la velocidad final',
            queHacemos: 'Anotamos la velocidad al final del frenado.',
            paraQue: '"Se detiene" es un dato, aunque no venga con numero: quiere decir que la velocidad final es cero.',
            queda: '0 = ' + (v0 * v0) + ' + 2a(' + d + ')',
            pregunta: 'El coche <b>se detiene</b>.<br>&iquest;Cuanto vale v<sub>f</sub>?',
            resp: R.numero(0, { dec: 2, unidad: 'm/s' }),
            pista: 'Detenerse es quedarse sin velocidad.',
            despues: 'Con v<sub>f</sub> = 0 la formula se simplifica mucho.'
          },
          {
            seccion: 'Paso 3: despejar la aceleracion',
            queHacemos: 'Pasamos v<sub>0</sub>&sup2; al otro lado y dividimos entre 2d.',
            paraQue: 'Queda a = &minus;v<sub>0</sub>&sup2;/(2d). El signo menos aparece solo, y tiene sentido: frenar es acelerar en contra del movimiento.',
            queda: 'a = &minus;' + (v0 * v0) + ' &divide; ' + (2 * d),
            pregunta: 'De 0 = ' + (v0 * v0) + ' + 2a(' + d + ') se despeja a = &minus;' + (v0 * v0) + ' / ' + (2 * d) + '.<br>&iquest;Cuanto vale? (2 decimales)',
            resp: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
            pista: 'Division directa, sin olvidar el signo.',
            despues: 'Sale negativa porque apunta al reves del movimiento: por eso frena.'
          },
          {
            seccion: 'Paso 4: comprobar con el tiempo',
            queHacemos: 'Calculamos cuanto tarda en parar, para ver si el numero es creible.',
            paraQue: 'Comprobar con una formula distinta es la mejor forma de cazar un error de signo o de division.',
            queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;,  t = ' + F.n(t, 2) + ' s',
            pregunta: 'De v<sub>f</sub> = v<sub>0</sub> + at sale t = ' + v0 + ' / ' + F.n(-a, 2) + '.<br>&iquest;Cuantos segundos tarda en parar? (2 decimales)',
            resp: R.numero(t, { dec: 2, tol: 0.03, unidad: 's' }),
            pista: 'Divide la velocidad inicial entre el valor absoluto de la aceleracion.',
            despues: 'Un frenado de unos pocos segundos: razonable para un coche.'
          }
        ],
        final: 'La aceleracion es <b>' + F.n(a, 2) + ' m/s&sup2;</b> y tarda <b>' + F.n(t, 2) + ' s</b>',
        receta: ['Sin tiempo entre los datos: usar v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad',
          '"Se detiene" significa v<sub>f</sub> = 0',
          'Al frenar la aceleracion sale NEGATIVA',
          'Comprobar con otra formula antes de dar el resultado']
      }),
      enunciado: 'Un coche que va a ' + v0 + ' m/s frena hasta detenerse en ' + d + ' m.<br>' +
        '&iquest;Cual es su aceleracion? (2 decimales)',
      respuesta: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
      pistas: ['No te dan el tiempo, asi que usa v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad.',
        'Detenerse quiere decir v<sub>f</sub> = 0, asi que 0 = ' + (v0 * v0) + ' + 2a(' + d + ').'],
      solucion: ['v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2ad, con v<sub>f</sub> = 0',
        '0 = ' + (v0 * v0) + ' + 2a(' + d + ')',
        'a = &minus;' + (v0 * v0) + ' / ' + (2 * d) + ' = <b>' + F.n(a, 2) + ' m/s&sup2;</b>',
        'Sale negativa porque el coche frena.']
    };
  };

  /* ---------------- dos moviles: uno alcanza al otro ---------------- */
  extra.alcance = function (r) {
    var v1 = r.elige([10, 12, 15, 20]);
    var v2 = v1 + r.elige([5, 8, 10, 15]);
    var ventaja = r.elige([50, 80, 100, 120, 150]);
    var t = ventaja / (v2 - v1);
    var x = v2 * t;
    return {
      guia: G({
        intro: 'Un camion va a <b>' + v1 + ' m/s</b> y lleva <b>' + ventaja + ' m</b> de ventaja. ' +
          'Un coche sale detras a <b>' + v2 + ' m/s</b>.<br>' +
          'La clave de estos problemas: no compares las velocidades sueltas, sino <b>cuanto le recorta</b> ' +
          'el de atras al de adelante en cada segundo.',
        pasos: [
          {
            seccion: 'Paso 1: cuanto recorta por segundo',
            queHacemos: 'Restamos las dos velocidades.',
            paraQue: 'Esa diferencia es la velocidad con la que se cierra el hueco. Es como si el camion estuviera quieto y el coche fuera a esa velocidad.',
            queda: 'recorta ' + (v2 - v1) + ' m cada segundo',
            pregunta: '&iquest;Cuantos metros le recorta el coche al camion en cada segundo?',
            resp: R.numero(v2 - v1, { dec: 2, tol: 0.01, unidad: 'm/s' }),
            pista: v2 + ' &minus; ' + v1 + '.',
            despues: 'A esa velocidad se acorta la distancia entre los dos.'
          },
          {
            seccion: 'Paso 2: cuanto tarda en cerrar el hueco',
            queHacemos: 'Dividimos la ventaja entre lo que recorta por segundo.',
            paraQue: 'Si recorta la misma cantidad cada segundo, el tiempo sale de una division: es un MRU visto desde el camion.',
            queda: 't = ' + F.n(t, 2) + ' s',
            pregunta: 'Hay ' + ventaja + ' m de ventaja y le recorta ' + (v2 - v1) + ' m cada segundo.<br>&iquest;Cuanto tarda en alcanzarlo? (2 decimales)',
            resp: R.numero(t, { dec: 2, tol: 0.02, unidad: 's' }),
            pista: ventaja + ' &divide; ' + (v2 - v1) + '.',
            despues: 'En ese instante los dos estan en el mismo punto.'
          },
          {
            seccion: 'Paso 3: donde lo alcanza',
            queHacemos: 'Multiplicamos la velocidad del coche por ese tiempo.',
            paraQue: 'Comprobacion: si calculas lo que avanzo el camion y le sumas su ventaja, tiene que darte el mismo numero.',
            queda: 't = ' + F.n(t, 2) + ' s,  x = ' + F.n(x, 2) + ' m',
            pregunta: '&iquest;A que distancia del punto de salida del coche lo alcanza? (2 decimales)',
            resp: R.numero(x, { dec: 2, tol: 0.05, unidad: 'm' }),
            pista: v2 + ' &times; ' + F.n(t, 2) + '.',
            despues: 'Comprueba: el camion recorrio ' + F.n(v1 * t, 2) + ' m mas los ' + ventaja + ' m de ventaja, que dan lo mismo.'
          }
        ],
        final: 'Lo alcanza a los <b>' + F.n(t, 2) + ' s</b>, a <b>' + F.n(x, 2) + ' m</b> de la salida',
        receta: ['Restar las velocidades: eso es lo que recorta por segundo',
          'Tiempo = ventaja / diferencia de velocidades',
          'La posicion sale con la velocidad del que persigue',
          'Comprobar con el otro movil: deben coincidir']
      }),
      enunciado: 'Un camion viaja a ' + v1 + ' m/s y lleva ' + ventaja + ' m de ventaja.<br>' +
        'Un coche sale detras de el a ' + v2 + ' m/s, en la misma direccion.<br>' +
        '&iquest;Cuanto tarda en alcanzarlo? (2 decimales)',
      respuesta: R.numero(t, { dec: 2, tol: 0.02, unidad: 's' }),
      pistas: ['No compares las velocidades sueltas: fijate cuanto le recorta el coche cada segundo.',
        'Le recorta ' + (v2 - v1) + ' m/s, y hay ' + ventaja + ' m que cerrar.'],
      solucion: ['Velocidad con la que se cierra el hueco: ' + v2 + ' &minus; ' + v1 + ' = ' + (v2 - v1) + ' m/s',
        't = ' + ventaja + ' / ' + (v2 - v1) + ' = <b>' + F.n(t, 2) + ' s</b>',
        'Lo alcanza a ' + v2 + ' &times; ' + F.n(t, 2) + ' = ' + F.n(x, 2) + ' m de la salida']
    };
  };

  EJ.tema({
    id: 'mru-mua',
    materia: 'fisica',
    grupo: 'Cinematica',
    nombre: 'MRU y MUA',
    descripcion: 'Movimiento rectilineo con velocidad constante y con aceleracion constante.',
    etiquetas: ['velocidad', 'aceleracion', 'cinematica', 'movimiento'],
    formulario: '<b>MRU</b> (velocidad constante): v = d / t<br>' +
      '<b>MUA</b> (aceleracion constante):<br>' +
      'a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t<br>' +
      'v<sub>f</sub> = v<sub>0</sub> + a t<br>' +
      'd = v<sub>0</sub> t + &frac12; a t&sup2;<br>' +
      'v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2 a d &nbsp;<small>(la unica sin tiempo)</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['velocidad', 'Velocidad en MRU'],
          ['distancia', 'Distancia en MRU'],
          ['tiempo', 'Tiempo en MRU'],
          ['identificar', 'Que movimiento es']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        var v = r.elige([4, 5, 6, 8, 10, 12, 15, 20, 25]);
        var tt = r.entero(3, 15);
        var dd = v * tt;

        if (tf === 'velocidad') {
          guiaDelPaso = EJ.guia.mruDespeje('v', v, dd, tt);
          enun = 'Un ciclista recorre ' + dd + ' m en ' + tt + ' s con velocidad constante.<br>' +
            '&iquest;Cual es su velocidad? (2 decimales)';
          resp = R.numero(v, { dec: 2, tol: 0.01, unidad: 'm/s' });
          pistas = ['En MRU la velocidad es la distancia entre el tiempo: v = d / t.',
            'v = ' + dd + ' / ' + tt + '.'];
          sol = ['Movimiento con velocidad constante: v = d / t',
            'v = ' + dd + ' m / ' + tt + ' s',
            'v = <b>' + F.n(v, 2) + ' m/s</b>'];
        } else if (tf === 'distancia') {
          guiaDelPaso = EJ.guia.mruDespeje('d', v, dd, tt);
          enun = 'Un tren viaja a ' + v + ' m/s constantes durante ' + tt + ' s.<br>' +
            '&iquest;Que distancia recorre? (2 decimales)';
          resp = R.numero(dd, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['Despeja la distancia de v = d / t: queda d = v &middot; t.',
            'd = ' + v + ' &times; ' + tt + '.'];
          sol = ['De v = d / t se despeja d = v &middot; t',
            'd = ' + v + ' m/s &times; ' + tt + ' s',
            'd = <b>' + dd + ' m</b>'];
        } else {
          guiaDelPaso = EJ.guia.mruDespeje('t', v, dd, tt);
          enun = 'Un corredor mantiene ' + v + ' m/s y tiene que recorrer ' + dd + ' m.<br>' +
            '&iquest;Cuanto tiempo tarda? (2 decimales)';
          resp = R.numero(tt, { dec: 2, tol: 0.01, unidad: 's' });
          pistas = ['Despeja el tiempo de v = d / t: queda t = d / v.',
            't = ' + dd + ' / ' + v + '.'];
          sol = ['De v = d / t se despeja t = d / v',
            't = ' + dd + ' m / ' + v + ' m/s',
            't = <b>' + F.n(tt, 2) + ' s</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['aceleracion', 'Calcular la aceleracion'],
          ['velocidadFinal', 'Velocidad despues de acelerar'],
          ['distanciaMUA', 'Distancia con aceleracion'],
          ['identificar', 'Que movimiento es']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var v0 = r.elige([0, 0, 2, 4, 5, 8, 10]);
        var ac = r.elige([1, 1.5, 2, 2.5, 3, 4]);
        var ts = r.entero(3, 12);
        var vf = v0 + ac * ts;
        var dm = v0 * ts + 0.5 * ac * ts * ts;

        if (t2 === 'aceleracion') {
          guiaDelPaso = EJ.guia.aceleracion(v0, vf, ts);
          enun = 'Un coche pasa de ' + v0 + ' m/s a ' + F.n(vf, 2) + ' m/s en ' + ts + ' s.<br>' +
            '&iquest;Cual es su aceleracion? (2 decimales)';
          resp = R.numero(ac, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' });
          pistas = ['La aceleracion es cuanto cambia la velocidad por cada segundo: a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t.',
            'a = (' + F.n(vf, 2) + ' &minus; ' + v0 + ') / ' + ts + '.'];
          sol = ['a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t',
            'a = (' + F.n(vf, 2) + ' &minus; ' + v0 + ') / ' + ts,
            'a = <b>' + F.n(ac, 2) + ' m/s&sup2;</b>'];
        } else if (t2 === 'velocidadFinal') {
          guiaDelPaso = EJ.guia.velocidadFinal(v0, ac, ts);
          enun = 'Un movil arranca con ' + v0 + ' m/s y acelera ' + F.n(ac, 2) + ' m/s&sup2; durante ' + ts + ' s.<br>' +
            '&iquest;Con que velocidad termina? (2 decimales)';
          resp = R.numero(vf, { dec: 2, tol: 0.02, unidad: 'm/s' });
          pistas = ['v<sub>f</sub> = v<sub>0</sub> + a t: a la velocidad de arranque se le suma lo que gano acelerando.',
            'v<sub>f</sub> = ' + v0 + ' + ' + F.n(ac, 2) + ' &times; ' + ts + '.'];
          sol = ['v<sub>f</sub> = v<sub>0</sub> + a t',
            'v<sub>f</sub> = ' + v0 + ' + (' + F.n(ac, 2) + ')(' + ts + ')',
            'v<sub>f</sub> = <b>' + F.n(vf, 2) + ' m/s</b>'];
        } else {
          guiaDelPaso = EJ.guia.distanciaMUA(v0, ac, ts);
          enun = 'Un movil parte con ' + v0 + ' m/s y acelera ' + F.n(ac, 2) + ' m/s&sup2; durante ' + ts + ' s.<br>' +
            '&iquest;Que distancia recorre? (2 decimales)';
          resp = R.numero(dm, { dec: 2, tol: 0.05, unidad: 'm' });
          pistas = ['d = v<sub>0</sub> t + &frac12; a t&sup2;: lo que habria recorrido sin acelerar, mas lo que gano por acelerar.',
            'd = ' + v0 + '(' + ts + ') + &frac12;(' + F.n(ac, 2) + ')(' + ts + ')&sup2;.'];
          sol = ['d = v<sub>0</sub> t + &frac12; a t&sup2;',
            'd = ' + v0 + '(' + ts + ') + &frac12;(' + F.n(ac, 2) + ')(' + (ts * ts) + ')',
            'd = ' + F.n(v0 * ts, 2) + ' + ' + F.n(0.5 * ac * ts * ts, 2),
            'd = <b>' + F.n(dm, 2) + ' m</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['sinTiempo', 'Sin conocer el tiempo'],
          ['frenado', 'Frenado'],
          ['alcance', 'Un movil alcanza a otro']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        /* sinTiempo: vf^2 = v0^2 + 2ad */
        var w0 = r.elige([0, 2, 4, 5, 6, 8]);
        var aa = r.elige([1, 1.5, 2, 2.5, 3]);
        var dd2 = r.elige([20, 25, 30, 40, 50, 60, 80]);
        var wf = Math.sqrt(w0 * w0 + 2 * aa * dd2);
        guiaDelPaso = EJ.guia.sinTiempo(w0, aa, dd2);
        enun = 'Un movil parte con ' + w0 + ' m/s y acelera ' + F.n(aa, 2) + ' m/s&sup2; a lo largo de ' + dd2 + ' m.<br>' +
          '&iquest;Con que velocidad llega? (2 decimales)';
        resp = R.numero(wf, { dec: 2, tol: 0.03, unidad: 'm/s' });
        pistas = ['No te dan el tiempo: usa v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2 a d.',
          'v<sub>f</sub>&sup2; = ' + (w0 * w0) + ' + 2(' + F.n(aa, 2) + ')(' + dd2 + ') = ' + F.n(w0 * w0 + 2 * aa * dd2, 2) + '.'];
        sol = ['Sin tiempo entre los datos, toca v<sub>f</sub>&sup2; = v<sub>0</sub>&sup2; + 2 a d',
          'v<sub>f</sub>&sup2; = ' + (w0 * w0) + ' + 2(' + F.n(aa, 2) + ')(' + dd2 + ') = ' + F.n(w0 * w0 + 2 * aa * dd2, 2),
          'v<sub>f</sub> = &radic;<span class="rad">' + F.n(w0 * w0 + 2 * aa * dd2, 2) + '</span> = <b>' + F.n(wf, 2) + ' m/s</b>'];
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
