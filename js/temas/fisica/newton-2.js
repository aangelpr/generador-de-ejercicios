/* Segunda ley de Newton: F = ma. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- fuerza neta con dos fuerzas ---------------- */
  extra.fuerzaNeta = function (r) {
    var m = r.elige([2, 4, 5, 8, 10, 12, 20]);
    var f1 = r.entero(30, 120);
    var f2 = r.entero(5, f1 - 5);
    var neta = f1 - f2;
    var a = neta / m;
    return {
      guia: G({
        intro: 'Una caja de <b>' + m + ' kg</b> recibe <b>' + f1 + ' N</b> hacia la derecha y <b>' + f2 + ' N</b> ' +
          'hacia la izquierda.<br>' +
          'La segunda ley se usa con la <b>fuerza neta</b>, no con una fuerza suelta. Por eso el primer paso ' +
          'nunca es dividir: es juntar todas las fuerzas en una sola.',
        pasos: [
          {
            seccion: 'Paso 1: la fuerza neta',
            queHacemos: 'Restamos las dos fuerzas, porque van en sentidos contrarios.',
            paraQue: 'Usar ' + f1 + ' N directo en F = ma es el error mas comun del tema: esa no es la fuerza que de verdad mueve la caja.',
            queda: 'F neta = ' + neta + ' N',
            pregunta: 'Calcula la fuerza neta: ' + f1 + ' &minus; ' + f2 + ' (2 decimales)',
            resp: R.numero(neta, { dec: 2, tol: 0.01, unidad: 'N' }),
            pista: 'Sentidos contrarios se restan.',
            despues: 'Esos ' + neta + ' N son los que quedan sin compensar.'
          },
          {
            seccion: 'Paso 2: despejar la aceleracion',
            queHacemos: 'De F = ma despejamos a = F/m.',
            paraQue: 'La masa va DIVIDIENDO: cuanto mas pesado, menos acelera con la misma fuerza. Eso es la inercia en numeros.',
            queda: 'a = ' + neta + ' &divide; ' + m,
            pregunta: '&iquest;Como queda despejada la aceleracion?',
            resp: R.opcion(['a = F / m', 'a = F &middot; m'], 0),
            pista: 'Comprueba con las unidades: N/kg da m/s&sup2;, que es lo que debe salir.',
            despues: ''
          },
          {
            seccion: 'Paso 3: calcular',
            queHacemos: 'Hacemos la division.',
            paraQue: 'Comprobacion: si duplicaras la masa, la aceleracion se reduciria a la mitad.',
            queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;',
            pregunta: 'Calcula ' + neta + ' / ' + m + ' (2 decimales)',
            resp: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
            pista: 'Division directa.',
            despues: 'Acelera hacia la derecha, que es hacia donde apunta la fuerza neta.'
          }
        ],
        final: 'La caja acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b> hacia la derecha',
        receta: ['Primero la fuerza NETA, nunca una fuerza suelta',
          'Mismo sentido se suman, contrarios se restan',
          'a = F neta / m',
          'La aceleracion apunta hacia donde apunta la fuerza neta']
      }),
      enunciado: 'Una caja de ' + m + ' kg recibe ' + f1 + ' N hacia la derecha y ' + f2 + ' N hacia la izquierda.<br>' +
        '&iquest;Cual es su aceleracion? (2 decimales)',
      respuesta: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
      pistas: ['Primero calcula la fuerza NETA: las dos van en sentidos contrarios.',
        'F neta = ' + f1 + ' &minus; ' + f2 + ' = ' + neta + ' N, y luego a = F/m.'],
      solucion: ['Fuerza neta: ' + f1 + ' &minus; ' + f2 + ' = ' + neta + ' N',
        'a = F neta / m = ' + neta + ' / ' + m,
        'a = <b>' + F.n(a, 2) + ' m/s&sup2;</b> hacia la derecha']
    };
  };

  /* ---------------- frenar: fuerza a partir de la cinematica ---------------- */
  extra.frenar = function (r) {
    var m = r.elige([800, 1000, 1200, 1500, 2000]);
    var v0 = r.elige([10, 15, 20, 25, 30]);
    var t = r.elige([2, 3, 4, 5]);
    var a = -v0 / t;
    var fuerza = m * a;
    return {
      guia: G({
        intro: 'Un coche de <b>' + m + ' kg</b> que va a <b>' + v0 + ' m/s</b> se detiene en <b>' + t + ' s</b>.<br>' +
          'Nos piden la fuerza de frenado, pero no nos dan ninguna fuerza. El camino es en dos tiempos: ' +
          'primero <b>cinematica</b> para sacar la aceleracion, y luego <b>dinamica</b> para pasar a fuerza.',
        pasos: [
          {
            seccion: 'Paso 1: ver que falta',
            queHacemos: 'Miramos que necesita F = ma y que nos dieron.',
            paraQue: 'Los datos son de movimiento (velocidad y tiempo), no de fuerza. El puente entre los dos mundos es la aceleracion.',
            queda: 'primero a, luego F',
            pregunta: 'Para usar F = ma nos falta un dato. &iquest;Cual?',
            resp: R.opcion(['La aceleracion', 'La distancia de frenado'], 0),
            pista: 'Tenemos la masa, pero la a hay que sacarla de los datos de movimiento.',
            despues: 'La aceleracion sale de la velocidad y el tiempo.'
          },
          {
            seccion: 'Paso 2: la aceleracion',
            queHacemos: 'Aplicamos a = (v final &minus; v inicial) / t.',
            paraQue: 'Detenerse es v final = 0, asi que el cambio es negativo y la aceleracion tambien.',
            queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;',
            pregunta: 'Calcula (0 &minus; ' + v0 + ') / ' + t + ' (2 decimales)',
            resp: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
            pista: 'Sale negativa: la velocidad esta disminuyendo.',
            despues: 'El signo menos indica que apunta en contra del movimiento.'
          },
          {
            seccion: 'Paso 3: pasar a fuerza',
            queHacemos: 'Multiplicamos la masa por la aceleracion.',
            paraQue: 'La fuerza hereda el signo de la aceleracion: tambien apunta en contra del movimiento, que es justo lo que hace un freno.',
            queda: 'F = ' + F.n(fuerza, 0) + ' N',
            pregunta: 'Calcula ' + m + ' &times; ' + F.n(a, 2) + ' (0 decimales)',
            resp: R.numero(fuerza, { dec: 0, tol: 20, unidad: 'N' }),
            pista: 'Multiplicacion directa, conservando el signo.',
            despues: 'Son ' + F.n(Math.abs(fuerza), 0) + ' N en contra del movimiento.'
          },
          {
            seccion: 'Paso 4: leer el signo',
            queHacemos: 'Interpretamos que significa el negativo.',
            paraQue: 'El signo no es un adorno: dice el SENTIDO de la fuerza. Darlo en positivo sin explicar es dar media respuesta.',
            queda: F.n(Math.abs(fuerza), 0) + ' N en contra del movimiento',
            pregunta: '&iquest;Que quiere decir que la fuerza salga negativa?',
            resp: R.opcion(['Que apunta en sentido contrario al movimiento', 'Que la fuerza no existe'], 0),
            pista: 'Es lo que hace un freno: empujar al reves de como vas.',
            despues: ''
          }
        ],
        final: 'La fuerza de frenado es de <b>' + F.n(Math.abs(fuerza), 0) + ' N</b> en contra del movimiento',
        receta: ['Si no hay datos de fuerza, primero cinematica',
          'a = (v final &minus; v inicial) / t',
          'Detenerse quiere decir v final = 0',
          'F = ma, conservando el signo',
          'El signo dice el sentido de la fuerza']
      }),
      enunciado: 'Un coche de ' + m + ' kg que viaja a ' + v0 + ' m/s se detiene en ' + t + ' s.<br>' +
        '&iquest;Que fuerza de frenado actuo? (da el valor con signo, 0 decimales)',
      respuesta: R.numero(fuerza, { dec: 0, tol: 20, unidad: 'N' }),
      pistas: ['No te dan la aceleracion: sacala primero de a = (v<sub>f</sub> &minus; v<sub>0</sub>)/t.',
        'a = (0 &minus; ' + v0 + ')/' + t + ' = ' + F.n(a, 2) + ' m/s&sup2;, y luego F = ma.'],
      solucion: ['a = (0 &minus; ' + v0 + ') / ' + t + ' = ' + F.n(a, 2) + ' m/s&sup2;',
        'F = ma = ' + m + '(' + F.n(a, 2) + ')',
        'F = <b>' + F.n(fuerza, 0) + ' N</b>, o sea ' + F.n(Math.abs(fuerza), 0) + ' N en contra del movimiento']
    };
  };

  EJ.tema({
    id: 'newton-2',
    materia: 'fisica',
    grupo: 'Dinamica',
    nombre: 'Segunda ley de Newton (F = ma)',
    descripcion: 'Relacionar fuerza, masa y aceleracion, y calcular el peso.',
    etiquetas: ['fuerza', 'masa', 'aceleracion', 'newton', 'peso'],
    formulario: '<b>Segunda ley:</b> F = m a &nbsp;<small>(F es la fuerza NETA)</small><br>' +
      'a = F / m &nbsp;&middot;&nbsp; m = F / a<br>' +
      '<b>Peso:</b> W = m g, con g = 9.8 m/s&sup2;<br>' +
      '<small>La fuerza se mide en newtons (N). 1 N = 1 kg&middot;m/s&sup2;.<br>' +
      'Masa y peso no son lo mismo: la masa va en kg y no cambia; el peso es una fuerza en N.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['fuerza', 'Calcular la fuerza'],
          ['aceleracion', 'Calcular la aceleracion'],
          ['masa', 'Calcular la masa'],
          ['peso', 'Calcular el peso']
        ]);

        var m = r.elige([2, 3, 4, 5, 8, 10, 12, 15, 20, 25]);
        var a = r.elige([1, 1.5, 2, 2.5, 3, 4, 5]);
        var fz = m * a;

        if (tf === 'fuerza') {
          guiaDelPaso = G({
            intro: 'Un cuerpo de <b>' + m + ' kg</b> acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b>.<br>' +
              'La segunda ley es una multiplicacion: <b>F = m a</b>. Lo interesante es entender que dice.',
            pasos: [
              {
                seccion: 'Paso 1: la formula',
                queHacemos: 'Escribimos la segunda ley.',
                paraQue: 'Dice dos cosas a la vez: mas fuerza da mas aceleracion, y mas masa da menos aceleracion con la misma fuerza.',
                queda: 'F = ' + m + ' &times; ' + F.n(a, 2),
                pregunta: '&iquest;Como se relacionan fuerza, masa y aceleracion?',
                resp: R.opcion(['F = m &middot; a', 'F = m / a'], 0),
                pista: 'Para mover algo pesado hace falta MAS fuerza, no menos: por eso multiplican.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Multiplicamos masa por aceleracion.',
                paraQue: 'El resultado sale en newtons, que son kg&middot;m/s&sup2;. Las unidades cuadran solas.',
                queda: 'F = ' + F.n(fz, 2) + ' N',
                pregunta: 'Calcula ' + m + ' &times; ' + F.n(a, 2) + ' (2 decimales)',
                resp: R.numero(fz, { dec: 2, tol: 0.02, unidad: 'N' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: entender el newton',
                queHacemos: 'Vemos que significa un newton.',
                paraQue: 'Un newton es la fuerza que le da 1 m/s&sup2; a 1 kg. Saberlo ayuda a juzgar si un resultado es creible.',
                queda: 'F = ' + F.n(fz, 2) + ' N',
                pregunta: '&iquest;Que es un newton?',
                resp: R.opcion(['La fuerza que acelera 1 kg a 1 m/s&sup2;', 'El peso de 1 kg'], 0),
                pista: 'El peso de 1 kg son 9.8 N, no 1 N.',
                despues: ''
              }
            ],
            final: 'La fuerza es de <b>' + F.n(fz, 2) + ' N</b>',
            receta: ['F = m a',
              'Mas masa con la misma fuerza: menos aceleracion',
              'La fuerza va en newtons (kg&middot;m/s&sup2;)',
              '1 N acelera 1 kg a 1 m/s&sup2;']
          });
          enun = 'Un cuerpo de ' + m + ' kg acelera a ' + F.n(a, 2) + ' m/s&sup2;.<br>' +
            '&iquest;Que fuerza neta actua sobre el? (2 decimales)';
          resp = R.numero(fz, { dec: 2, tol: 0.02, unidad: 'N' });
          pistas = ['La segunda ley dice F = m a.', 'F = ' + m + ' &times; ' + F.n(a, 2) + '.'];
          sol = ['F = m a', 'F = ' + m + ' kg &times; ' + F.n(a, 2) + ' m/s&sup2;', 'F = <b>' + F.n(fz, 2) + ' N</b>'];

        } else if (tf === 'aceleracion') {
          guiaDelPaso = G({
            intro: 'Sobre un cuerpo de <b>' + m + ' kg</b> actua una fuerza neta de <b>' + F.n(fz, 2) + ' N</b>.<br>' +
              'Ahora la incognita es la aceleracion, asi que hay que <b>despejarla</b> de F = ma.',
            pasos: [
              {
                seccion: 'Paso 1: despejar',
                queHacemos: 'Pasamos la masa dividiendo.',
                paraQue: 'La masa esta multiplicando, asi que pasa dividiendo. Y tiene sentido: mas masa, menos acelera.',
                queda: 'a = ' + F.n(fz, 2) + ' &divide; ' + m,
                pregunta: 'De F = m a, &iquest;como queda la aceleracion?',
                resp: R.opcion(['a = F / m', 'a = F &middot; m'], 0),
                pista: 'Si multiplicaras, un camion aceleraria mas que una bici con la misma fuerza.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Newtons entre kilos dan m/s&sup2;, que es lo que debe salir.',
                queda: 'a = ' + F.n(a, 2) + ' m/s&sup2;',
                pregunta: 'Calcula ' + F.n(fz, 2) + ' / ' + m + ' (2 decimales)',
                resp: R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'Division directa.',
                despues: ''
              }
            ],
            final: 'Acelera <b>' + F.n(a, 2) + ' m/s&sup2;</b>',
            receta: ['a = F / m',
              'La masa divide: mas masa, menos aceleracion',
              'N entre kg da m/s&sup2;',
              'La fuerza tiene que ser la NETA']
          });
          enun = 'Sobre un cuerpo de ' + m + ' kg actua una fuerza neta de ' + F.n(fz, 2) + ' N.<br>' +
            '&iquest;Cual es su aceleracion? (2 decimales)';
          resp = R.numero(a, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' });
          pistas = ['Despeja la aceleracion de F = m a.', 'a = ' + F.n(fz, 2) + ' / ' + m + '.'];
          sol = ['De F = m a se despeja a = F / m', 'a = ' + F.n(fz, 2) + ' / ' + m, 'a = <b>' + F.n(a, 2) + ' m/s&sup2;</b>'];

        } else if (tf === 'masa') {
          guiaDelPaso = G({
            intro: 'Una fuerza neta de <b>' + F.n(fz, 2) + ' N</b> le produce a un cuerpo una aceleracion de ' +
              '<b>' + F.n(a, 2) + ' m/s&sup2;</b>.<br>' +
              'Aqui la incognita es la masa. Es una forma indirecta de <b>pesar</b> algo: se le aplica una fuerza ' +
              'conocida y se mide cuanto acelera.',
            pasos: [
              {
                seccion: 'Paso 1: despejar la masa',
                queHacemos: 'Pasamos la aceleracion dividiendo.',
                paraQue: 'Asi se mide la masa de cosas que no caben en una balanza, como un satelite.',
                queda: 'm = ' + F.n(fz, 2) + ' &divide; ' + F.n(a, 2),
                pregunta: 'De F = m a, &iquest;como queda la masa?',
                resp: R.opcion(['m = F / a', 'm = F &middot; a'], 0),
                pista: 'La a esta multiplicando, asi que pasa dividiendo.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Comprobacion: si con la misma fuerza acelerara menos, la masa saldria mayor.',
                queda: 'm = ' + F.n(m, 2) + ' kg',
                pregunta: 'Calcula ' + F.n(fz, 2) + ' / ' + F.n(a, 2) + ' (2 decimales)',
                resp: R.numero(m, { dec: 2, tol: 0.05, unidad: 'kg' }),
                pista: 'Division directa.',
                despues: 'La masa sale en kilos, no en newtons.'
              }
            ],
            final: 'La masa es de <b>' + F.n(m, 2) + ' kg</b>',
            receta: ['m = F / a',
              'Es una forma de medir masa sin balanza',
              'Con la misma fuerza, menos aceleracion quiere decir mas masa',
              'La masa va en kg; la fuerza, en N']
          });
          enun = 'Una fuerza neta de ' + F.n(fz, 2) + ' N produce una aceleracion de ' + F.n(a, 2) + ' m/s&sup2;.<br>' +
            '&iquest;Cual es la masa del cuerpo? (2 decimales)';
          resp = R.numero(m, { dec: 2, tol: 0.05, unidad: 'kg' });
          pistas = ['Despeja la masa de F = m a.', 'm = ' + F.n(fz, 2) + ' / ' + F.n(a, 2) + '.'];
          sol = ['De F = m a se despeja m = F / a', 'm = ' + F.n(fz, 2) + ' / ' + F.n(a, 2), 'm = <b>' + F.n(m, 2) + ' kg</b>'];

        } else {
          var peso = m * g;
          guiaDelPaso = G({
            intro: 'Un objeto tiene una masa de <b>' + m + ' kg</b>. &iquest;Cuanto <b>pesa</b>?<br>' +
              'Masa y peso se confunden todo el tiempo, pero son cosas distintas: la masa es <b>cuanta materia hay</b> ' +
              'y el peso es <b>la fuerza con que la Tierra la jala</b>.',
            pasos: [
              {
                seccion: 'Paso 1: peso es una fuerza',
                queHacemos: 'Reconocemos que el peso es un caso de F = ma.',
                paraQue: 'El peso es la fuerza que produce la gravedad, asi que W = mg no es una formula nueva: es F = ma con a = g.',
                queda: 'W = ' + m + ' &times; 9.8',
                pregunta: '&iquest;Que formula da el peso?',
                resp: R.opcion(['W = m g', 'W = m / g'], 0),
                pista: 'Es F = ma, con la gravedad haciendo de aceleracion.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Multiplicamos la masa por 9.8.',
                paraQue: 'El resultado va en NEWTONS, no en kilos. Decir "peso 70 kilos" es un abuso del lenguaje: eso es la masa.',
                queda: 'W = ' + F.n(peso, 2) + ' N',
                pregunta: 'Calcula ' + m + ' &times; 9.8 (2 decimales)',
                resp: R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: en la Luna',
                queHacemos: 'Pensamos que cambiaria fuera de la Tierra.',
                paraQue: 'La masa es la misma en todas partes; el peso depende de donde estes. En la Luna pesarias como una sexta parte.',
                queda: 'masa ' + m + ' kg,  peso ' + F.n(peso, 2) + ' N',
                pregunta: 'Si llevaras ese objeto a la Luna, &iquest;que cambiaria?',
                resp: R.opcion(['El peso, pero no la masa', 'Los dos por igual'], 0),
                pista: 'La cantidad de materia no cambia por viajar; la gravedad si.',
                despues: ''
              }
            ],
            final: 'Pesa <b>' + F.n(peso, 2) + ' N</b>',
            receta: ['W = m g, con g = 9.8 m/s&sup2;',
              'El peso es una FUERZA y va en newtons',
              'La masa va en kg y no cambia de lugar a lugar',
              'El peso si cambia: en la Luna es menor']
          });
          enun = 'Un objeto tiene una masa de ' + m + ' kg.<br>&iquest;Cuanto pesa en la Tierra? (2 decimales)';
          resp = R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' });
          pistas = ['El peso es la fuerza de la gravedad: W = m g.',
            'W = ' + m + ' &times; 9.8.'];
          sol = ['El peso es una fuerza: W = m g',
            'W = ' + m + ' kg &times; 9.8 m/s&sup2;',
            'W = <b>' + F.n(peso, 2) + ' N</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['fuerzaNeta', 'Fuerza neta y aceleracion'],
          ['desdeReposo', 'Fuerza y movimiento'],
          ['comparar', 'Comparar dos cuerpos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        if (t2 === 'desdeReposo') {
          var mm = r.elige([2, 4, 5, 8, 10]);
          var ff = r.entero(10, 60);
          var tt = r.entero(2, 8);
          var ac = ff / mm;
          var vf = ac * tt;
          guiaDelPaso = G({
            intro: 'Un carrito de <b>' + mm + ' kg</b> parte del reposo y se le aplica una fuerza neta de ' +
              '<b>' + ff + ' N</b> durante <b>' + tt + ' s</b>.<br>' +
              'Nos piden una velocidad, pero nos dan una fuerza. El puente entre las dos cosas es, otra vez, ' +
              'la <b>aceleracion</b>.',
            pasos: [
              {
                seccion: 'Paso 1: de fuerza a aceleracion',
                queHacemos: 'Aplicamos a = F/m.',
                paraQue: 'La fuerza no da velocidad directamente: da aceleracion. La velocidad se va acumulando con el tiempo.',
                queda: 'a = ' + F.n(ac, 2) + ' m/s&sup2;',
                pregunta: 'Calcula ' + ff + ' / ' + mm + ' (2 decimales)',
                resp: R.numero(ac, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'a = F / m.',
                despues: 'Cada segundo gana ' + F.n(ac, 2) + ' m/s.'
              },
              {
                seccion: 'Paso 2: de aceleracion a velocidad',
                queHacemos: 'Multiplicamos la aceleracion por el tiempo.',
                paraQue: 'Parte del reposo, asi que toda la velocidad que tiene al final es la que gano acelerando.',
                queda: 'v = ' + F.n(vf, 2) + ' m/s',
                pregunta: 'Parte del reposo. Calcula ' + F.n(ac, 2) + ' &times; ' + tt + ' (2 decimales)',
                resp: R.numero(vf, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'v = v<sub>0</sub> + at, con v<sub>0</sub> = 0.',
                despues: ''
              },
              {
                seccion: 'Paso 3: que pasa si deja de empujar',
                queHacemos: 'Pensamos que ocurre al quitar la fuerza.',
                paraQue: 'Aqui vuelve la primera ley: sin fuerza no se para, sigue a ' + F.n(vf, 2) + ' m/s. Lo que se acaba es la ACELERACION, no la velocidad.',
                queda: 'v = ' + F.n(vf, 2) + ' m/s y se mantiene',
                pregunta: 'Si en ese momento dejara de actuar la fuerza (y no hubiera rozamiento), &iquest;que pasaria?',
                resp: R.opcion(['Seguiria a ' + F.n(vf, 2) + ' m/s constantes', 'Se iria frenando hasta pararse'], 0),
                pista: 'Sin fuerza neta no hay cambio de velocidad: primera ley.',
                despues: ''
              }
            ],
            final: 'Termina con <b>' + F.n(vf, 2) + ' m/s</b>',
            receta: ['La fuerza da ACELERACION, no velocidad',
              'a = F/m y despues v = at si parte del reposo',
              'La velocidad se acumula mientras dure la fuerza',
              'Al quitar la fuerza se mantiene la velocidad, no se pierde']
          });
          enun = 'Un carrito de ' + mm + ' kg parte del reposo y recibe una fuerza neta de ' + ff + ' N durante ' + tt + ' s.<br>' +
            '&iquest;Que velocidad alcanza? (2 decimales)';
          resp = R.numero(vf, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['Primero saca la aceleracion con a = F/m.',
            'a = ' + ff + '/' + mm + ' = ' + F.n(ac, 2) + ' m/s&sup2;, y luego v = at.'];
          sol = ['a = F/m = ' + ff + '/' + mm + ' = ' + F.n(ac, 2) + ' m/s&sup2;',
            'Parte del reposo: v = at = ' + F.n(ac, 2) + '(' + tt + ')',
            'v = <b>' + F.n(vf, 2) + ' m/s</b>'];

        } else {
          var ma = r.elige([2, 4, 5]);
          var mb = ma * r.elige([2, 3, 4]);
          var fc = r.entero(20, 80);
          var aa = fc / ma, ab = fc / mb;
          guiaDelPaso = G({
            intro: 'La <b>misma fuerza</b> de <b>' + fc + ' N</b> se aplica a dos cuerpos: uno de <b>' + ma + ' kg</b> ' +
              'y otro de <b>' + mb + ' kg</b>.<br>' +
              'Sin calcular nada ya se puede anticipar quien acelera mas. Calcularlo sirve para ver <b>cuanto</b> mas.',
            pasos: [
              {
                seccion: 'Paso 1: anticipar',
                queHacemos: 'Predecimos cual acelera mas antes de calcular.',
                paraQue: 'En a = F/m la masa divide: con la misma fuerza, el mas ligero acelera mas. Eso es la inercia.',
                queda: 'el de ' + ma + ' kg acelera mas',
                pregunta: 'Con la misma fuerza, &iquest;cual acelera mas?',
                resp: R.opcion(['El de ' + ma + ' kg', 'El de ' + mb + ' kg'], 0),
                pista: 'Piensa en empujar un carrito de super vacio o lleno con la misma fuerza.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el ligero',
                queHacemos: 'Calculamos su aceleracion.',
                paraQue: 'Para poder comparar con numeros.',
                queda: 'a<sub>1</sub> = ' + F.n(aa, 2) + ' m/s&sup2;',
                pregunta: 'Calcula ' + fc + ' / ' + ma + ' (2 decimales)',
                resp: R.numero(aa, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'a = F/m.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el pesado',
                queHacemos: 'Ahora el otro.',
                paraQue: 'Es ' + (mb / ma) + ' veces mas masivo, asi que deberia acelerar ' + (mb / ma) + ' veces menos.',
                queda: 'a<sub>1</sub> = ' + F.n(aa, 2) + ',  a<sub>2</sub> = ' + F.n(ab, 2) + ' m/s&sup2;',
                pregunta: 'Calcula ' + fc + ' / ' + mb + ' (2 decimales)',
                resp: R.numero(ab, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'a = F/m otra vez.',
                despues: 'Justo ' + (mb / ma) + ' veces menos, como se esperaba.'
              },
              {
                seccion: 'Paso 4: la relacion',
                queHacemos: 'Comparamos las dos aceleraciones.',
                paraQue: 'Masa y aceleracion son inversamente proporcionales: si una se multiplica, la otra se divide por lo mismo.',
                queda: 'el pesado acelera ' + (mb / ma) + ' veces menos',
                pregunta: 'El segundo tiene ' + (mb / ma) + ' veces mas masa. &iquest;Como es su aceleracion?',
                resp: R.opcion([(mb / ma) + ' veces menor', (mb / ma) + ' veces mayor'], 0),
                pista: 'La masa divide, asi que van al reves.',
                despues: ''
              }
            ],
            final: 'Aceleran <b>' + F.n(aa, 2) + '</b> y <b>' + F.n(ab, 2) + ' m/s&sup2;</b>',
            receta: ['Con la misma fuerza, mas masa da menos aceleracion',
              'a = F/m para cada uno',
              'Masa y aceleracion son inversamente proporcionales',
              'Doble masa, mitad de aceleracion']
          });
          enun = 'La misma fuerza de ' + fc + ' N se aplica a un cuerpo de ' + ma + ' kg y a otro de ' + mb + ' kg.<br>' +
            'Calcula las dos aceleraciones (2 decimales).';
          resp = R.varios([
            { etiqueta: 'a del de ' + ma + ' kg', resp: R.numero(aa, { dec: 2, tol: 0.02 }) },
            { etiqueta: 'a del de ' + mb + ' kg', resp: R.numero(ab, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['Aplica a = F/m a cada uno por separado.',
            'Con la misma fuerza, el mas masivo acelera menos.'];
          sol = ['a<sub>1</sub> = ' + fc + '/' + ma + ' = <b>' + F.n(aa, 2) + ' m/s&sup2;</b>',
            'a<sub>2</sub> = ' + fc + '/' + mb + ' = <b>' + F.n(ab, 2) + ' m/s&sup2;</b>',
            'El segundo tiene ' + (mb / ma) + ' veces mas masa y acelera ' + (mb / ma) + ' veces menos'];
        }

      } else {
        var t3 = r.subtema([
          ['frenar', 'Fuerza de frenado'],
          ['elevador', 'Elevador'],
          ['dosFuerzasDistancia', 'Fuerza y distancia']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'elevador') {
          var me = r.elige([50, 60, 70, 80]);
          var ae = r.elige([1, 1.5, 2, 2.5]);
          var sube = r.bool();
          var acc = sube ? ae : -ae;
          var normal = me * (g + acc);
          guiaDelPaso = G({
            intro: 'Una persona de <b>' + me + ' kg</b> va en un elevador que <b>acelera ' +
              (sube ? 'hacia arriba' : 'hacia abajo') + '</b> a <b>' + F.n(ae, 2) + ' m/s&sup2;</b>.<br>' +
              'Queremos lo que marca una bascula bajo sus pies, que es la <b>normal</b>. ' +
              'Sentirse mas pesado o mas ligero en un elevador tiene esta explicacion exacta.',
            pasos: [
              {
                seccion: 'Paso 1: las dos fuerzas',
                queHacemos: 'Anotamos que fuerzas actuan sobre la persona.',
                paraQue: 'Son solo dos: el peso hacia abajo y la normal hacia arriba. La bascula marca la normal, no el peso.',
                queda: 'N &minus; W = ma',
                pregunta: '&iquest;Que fuerzas actuan sobre la persona?',
                resp: R.opcion(['Su peso hacia abajo y la normal hacia arriba',
                  'Solo su peso'], 0),
                pista: 'Si solo estuviera el peso, caeria libremente.',
                despues: 'La segunda ley se aplica a la resta de las dos.'
              },
              {
                seccion: 'Paso 2: el peso',
                queHacemos: 'Calculamos cuanto pesa.',
                paraQue: 'Ese valor no cambia dentro del elevador: la gravedad sigue siendo la misma.',
                queda: 'W = ' + F.n(me * g, 2) + ' N',
                pregunta: 'Calcula ' + me + ' &times; 9.8 (2 decimales)',
                resp: R.numero(me * g, { dec: 2, tol: 0.05, unidad: 'N' }),
                pista: 'W = mg.',
                despues: 'Lo que cambia es la normal, no el peso.'
              },
              {
                seccion: 'Paso 3: plantear la segunda ley',
                queHacemos: 'Escribimos N &minus; W = ma con el signo que toca.',
                paraQue: sube
                  ? 'Acelera hacia arriba, asi que la normal tiene que GANARLE al peso: la bascula marca de mas.'
                  : 'Acelera hacia abajo, asi que el peso le gana a la normal: la bascula marca de menos.',
                queda: 'N = ' + me + '(9.8 ' + (sube ? '+' : '&minus;') + ' ' + F.n(ae, 2) + ')',
                pregunta: 'El elevador acelera hacia ' + (sube ? 'arriba' : 'abajo') + '.<br>&iquest;Que marca la bascula?',
                resp: R.opcion(sube
                  ? ['Mas que su peso normal', 'Menos que su peso normal']
                  : ['Menos que su peso normal', 'Mas que su peso normal'], 0),
                pista: sube ? 'Al arrancar hacia arriba te sientes mas pesado.' : 'Al bajar de golpe se siente el estomago flotando.',
                despues: ''
              },
              {
                seccion: 'Paso 4: calcular la normal',
                queHacemos: 'Despejamos N = m(g ' + (sube ? '+' : '&minus;') + ' a).',
                paraQue: 'Si el elevador cayera libremente (a = g), la normal daria CERO: eso es la ingravidez.',
                queda: 'N = ' + F.n(normal, 2) + ' N',
                pregunta: 'Calcula ' + me + ' &times; (9.8 ' + (sube ? '+' : '&minus;') + ' ' + F.n(ae, 2) + ') (2 decimales)',
                resp: R.numero(normal, { dec: 2, tol: 0.1, unidad: 'N' }),
                pista: 'Primero el parentesis: 9.8 ' + (sube ? '+' : '&minus;') + ' ' + F.n(ae, 2) + ' = ' + F.n(g + acc, 2) + '.',
                despues: 'Comparalo con su peso real de ' + F.n(me * g, 2) + ' N.'
              }
            ],
            final: 'La bascula marca <b>' + F.n(normal, 2) + ' N</b>, ' +
              (sube ? 'mas' : 'menos') + ' que sus ' + F.n(me * g, 2) + ' N de peso',
            receta: ['Sobre la persona actuan peso y normal',
              'La bascula mide la NORMAL, no el peso',
              'N &minus; W = ma, con el signo de la aceleracion',
              'Subiendo acelerado: marca de mas. Bajando acelerado: de menos',
              'En caida libre la normal es cero: ingravidez']
          });
          enun = 'Una persona de ' + me + ' kg va en un elevador que acelera hacia ' + (sube ? 'arriba' : 'abajo') +
            ' a ' + F.n(ae, 2) + ' m/s&sup2;.<br>&iquest;Que fuerza marca una bascula bajo sus pies? (2 decimales)';
          resp = R.numero(normal, { dec: 2, tol: 0.1, unidad: 'N' });
          pistas = ['Sobre la persona actuan su peso (abajo) y la normal (arriba): N &minus; W = ma.',
            'N = m(g ' + (sube ? '+' : '&minus;') + ' a) = ' + me + '(9.8 ' + (sube ? '+' : '&minus;') + ' ' + F.n(ae, 2) + ').'];
          sol = ['Peso: ' + me + '(9.8) = ' + F.n(me * g, 2) + ' N',
            'Segunda ley: N &minus; W = ma, asi que N = m(g ' + (sube ? '+' : '&minus;') + ' a)',
            'N = ' + me + '(' + F.n(g + acc, 2) + ') = <b>' + F.n(normal, 2) + ' N</b>'];

        } else {
          var md = r.elige([2, 4, 5, 10]);
          var fd = r.entero(15, 80);
          var dd = r.elige([5, 10, 15, 20, 25]);
          var ad = fd / md;
          var vd = Math.sqrt(2 * ad * dd);
          guiaDelPaso = G({
            intro: 'Un bloque de <b>' + md + ' kg</b> parte del reposo y se empuja con una fuerza neta de ' +
              '<b>' + fd + ' N</b> a lo largo de <b>' + dd + ' m</b>.<br>' +
              'Nos dan fuerza y distancia, y nos piden velocidad. Se cruzan dinamica y cinematica, ' +
              'y en medio esta la aceleracion.',
            pasos: [
              {
                seccion: 'Paso 1: la aceleracion',
                queHacemos: 'Pasamos de fuerza a aceleracion.',
                paraQue: 'La fuerza sola no dice nada del movimiento hasta que se convierte en aceleracion.',
                queda: 'a = ' + F.n(ad, 2) + ' m/s&sup2;',
                pregunta: 'Calcula ' + fd + ' / ' + md + ' (2 decimales)',
                resp: R.numero(ad, { dec: 2, tol: 0.02, unidad: 'm/s&sup2;' }),
                pista: 'a = F/m.',
                despues: ''
              },
              {
                seccion: 'Paso 2: elegir la formula de cinematica',
                queHacemos: 'Vemos que formula usa distancia y no tiempo.',
                paraQue: 'Nos dan la distancia, no el tiempo. La formula que los conecta sin tiempo es v&sup2; = v<sub>0</sub>&sup2; + 2ad.',
                queda: 'v&sup2; = 2(' + F.n(ad, 2) + ')(' + dd + ')',
                pregunta: 'Tenemos a y d, pero no el tiempo. &iquest;Que formula conviene?',
                resp: R.opcion(['v&sup2; = v<sub>0</sub>&sup2; + 2ad', 'v = v<sub>0</sub> + at'], 0),
                pista: 'La segunda necesita el tiempo, que habria que calcular aparte.',
                despues: 'Como parte del reposo, v<sub>0</sub>&sup2; = 0.'
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Sustituimos y sacamos la raiz.',
                paraQue: 'Comprobacion: con el doble de distancia la velocidad NO se dobla, solo crece &radic;2 veces.',
                queda: 'v = ' + F.n(vd, 2) + ' m/s',
                pregunta: 'Calcula &radic;<span class="rad">2(' + F.n(ad, 2) + ')(' + dd + ')</span> (2 decimales)',
                resp: R.numero(vd, { dec: 2, tol: 0.05, unidad: 'm/s' }),
                pista: 'Dentro de la raiz queda ' + F.n(2 * ad * dd, 2) + '.',
                despues: ''
              }
            ],
            final: 'Llega a <b>' + F.n(vd, 2) + ' m/s</b>',
            receta: ['Fuerza a aceleracion: a = F/m',
              'Con distancia y sin tiempo: v&sup2; = v<sub>0</sub>&sup2; + 2ad',
              'Partir del reposo anula el v<sub>0</sub>&sup2;',
              'No olvidar la raiz al final']
          });
          enun = 'Un bloque de ' + md + ' kg parte del reposo y se empuja con una fuerza neta de ' + fd + ' N a lo largo de ' + dd + ' m.<br>' +
            '&iquest;Que velocidad alcanza? (2 decimales)';
          resp = R.numero(vd, { dec: 2, tol: 0.05, unidad: 'm/s' });
          pistas = ['Primero a = F/m, y despues la formula de MUA que usa distancia sin tiempo.',
            'a = ' + fd + '/' + md + ' = ' + F.n(ad, 2) + ' m/s&sup2;; luego v&sup2; = 2ad.'];
          sol = ['a = F/m = ' + fd + '/' + md + ' = ' + F.n(ad, 2) + ' m/s&sup2;',
            'v&sup2; = 2ad = 2(' + F.n(ad, 2) + ')(' + dd + ') = ' + F.n(2 * ad * dd, 2),
            'v = <b>' + F.n(vd, 2) + ' m/s</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
