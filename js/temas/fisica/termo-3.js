/* Tercera ley de la termodinamica: el cero absoluto es inalcanzable. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  var extra = {};

  /* ---------------- pasar de Celsius a kelvin ---------------- */
  extra.aKelvin = function (r) {
    var c = r.elige([-200, -150, -100, -40, 0, 25, 37, 100, 150, 300]);
    var k = c + 273.15;
    return {
      guia: G({
        intro: 'Convierte <b>' + c + ' &deg;C</b> a kelvin.<br>' +
          'La escala Kelvin es la misma que la Celsius, solo que <b>corrida</b> para que el cero caiga en el ' +
          'cero absoluto, no en el punto de congelacion del agua.',
        pasos: [
          {
            seccion: 'Paso 1: donde empieza cada escala',
            queHacemos: 'Comparamos los dos ceros.',
            paraQue: 'El 0 &deg;C es la congelacion del agua, que no tiene nada de especial en fisica. El 0 K es la temperatura minima posible del universo.',
            queda: '0 K = &minus;273.15 &deg;C',
            pregunta: '&iquest;A cuantos grados Celsius corresponde 0 K?',
            resp: R.numero(-273.15, { dec: 2, tol: 0.2, unidad: '&deg;C' }),
            pista: 'Es el cero absoluto.',
            despues: ''
          },
          {
            seccion: 'Paso 2: el mismo tamano de grado',
            queHacemos: 'Comprobamos que los grados miden igual.',
            paraQue: 'Subir 1 K es exactamente lo mismo que subir 1 &deg;C. Solo cambia desde donde se cuenta, asi que basta con sumar.',
            queda: 'Basta con sumar 273.15',
            pregunta: 'Subir 1 &deg;C, &iquest;cuanto es en kelvin?',
            resp: R.numero(1, { dec: 0, tol: 0.1, unidad: 'K' }),
            pista: 'Son grados del mismo tamano.',
            despues: 'Por eso no hay que multiplicar por nada.'
          },
          {
            seccion: 'Paso 3: convertir',
            queHacemos: 'Sumamos 273.15.',
            paraQue: 'Con eso trasladamos el origen de la congelacion del agua al cero absoluto.',
            queda: 'T = ' + F.n(k, 2) + ' K',
            pregunta: 'Calcula ' + c + ' + 273.15 (2 decimales)',
            resp: R.numero(k, { dec: 2, tol: 0.05, unidad: 'K' }),
            pista: 'Suma directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: comprobar que tiene sentido',
            queHacemos: 'Verificamos que el resultado es positivo.',
            paraQue: 'En kelvin NUNCA puede salir un numero negativo: seria mas frio que el cero absoluto, y eso no existe. Es la mejor comprobacion de este tipo de ejercicio.',
            queda: 'T = ' + F.n(k, 2) + ' K, positivo: correcto',
            pregunta: '&iquest;Puede una temperatura en kelvin ser negativa?',
            resp: R.opcion(['No, nunca', 'Si, si hace mucho frio'], 0),
            pista: 'El 0 K es el minimo absoluto.',
            despues: ''
          }
        ],
        final: c + ' &deg;C = <b>' + F.n(k, 2) + ' K</b>',
        receta: ['K = &deg;C + 273.15',
          'Los grados miden lo mismo en las dos escalas',
          'Solo cambia donde esta el cero',
          'El resultado en kelvin nunca puede ser negativo']
      }),
      enunciado: 'Convierte ' + c + ' &deg;C a kelvin. (2 decimales)',
      respuesta: R.numero(k, { dec: 2, tol: 0.05, unidad: 'K' }),
      pistas: ['K = &deg;C + 273.15.',
        'Los grados son del mismo tamano: solo se corre el origen.'],
      solucion: ['K = &deg;C + 273.15',
        'K = ' + c + ' + 273.15',
        'T = <b>' + F.n(k, 2) + ' K</b>']
    };
  };

  EJ.tema({
    id: 'termo-3',
    materia: 'fisica',
    grupo: 'Termodinamica',
    nombre: 'Tercera ley de la termodinamica',
    descripcion: 'El cero absoluto, la escala Kelvin y por que 0 K es inalcanzable.',
    etiquetas: ['termodinamica', 'cero absoluto', 'kelvin', 'entropia'],
    formulario: '<b>Tercera ley:</b> es imposible llegar al cero absoluto (0 K) en un numero finito de pasos.<br>' +
      'Al acercarse a 0 K, la entropia de un cristal perfecto tiende a cero: todo queda en su minima energia.<br>' +
      '<b>Cero absoluto:</b> 0 K = &minus;273.15 &deg;C<br>' +
      '<b>Conversion:</b> K = &deg;C + 273.15 &nbsp;&middot;&nbsp; &deg;C = K &minus; 273.15<br>' +
      '<small>Se puede uno acercar cuanto quiera (se han logrado millonesimas de kelvin), pero nunca llegar.<br>' +
      'Una temperatura en kelvin nunca es negativa.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice la tercera ley'],
          ['ceroAbs', 'El cero absoluto'],
          ['aKelvin', 'De Celsius a kelvin']
        ]);
        if (extra[tf]) return extra[tf](r, dif);

        if (tf === 'queDice') {
          var pd = r.elige([
            { q: '&iquest;Que afirma la tercera ley de la termodinamica?',
              ok: 'Que es imposible alcanzar el cero absoluto', mal: 'Que el calor va de caliente a frio',
              por: 'lo del sentido del calor es la segunda ley' },
            { q: '&iquest;Se puede enfriar algo hasta 0 K?',
              ok: 'Se puede acercar mucho, pero nunca llegar', mal: 'Si, con equipo suficientemente bueno',
              por: 'cada paso de enfriamiento quita solo una parte de lo que queda, asi que harian falta infinitos pasos' },
            { q: 'En los laboratorios se han alcanzado temperaturas de millonesimas de kelvin. &iquest;Que dice eso?',
              ok: 'Que uno se puede acercar mucho al cero absoluto, pero no llegar', corto: 'acercarse si; llegar no', mal: 'Que la tercera ley es falsa',
              por: 'acercarse cuanto se quiera es justo lo que la ley permite; lo prohibido es tocar el cero' },
            { q: '&iquest;Que le pasa a la entropia de un cristal perfecto al acercarse a 0 K?',
              ok: 'Tiende a cero: ya no hay desorden posible', mal: 'Se hace infinita',
              por: 'a esa temperatura todos los atomos caen a su estado de minima energia, que es uno solo' }
          ]);
          guiaDelPaso = G({
            intro: 'La tercera ley es la mas corta de las cuatro: habla de un limite que no se puede cruzar.<br>' +
              'El <b>cero absoluto</b> existe como referencia, pero es <b>inalcanzable</b>.',
            pasos: [
              {
                seccion: 'Paso 1: el enunciado',
                queHacemos: 'Fijamos que dice la ley.',
                paraQue: 'No dice que el cero absoluto no exista: dice que no se puede llegar a el en un numero finito de pasos.',
                queda: '0 K es inalcanzable',
                pregunta: '&iquest;Que afirma la tercera ley?',
                resp: R.opcion(['Que el cero absoluto es inalcanzable', 'Que el cero absoluto no existe'], 0),
                pista: 'Existe como limite, pero no se puede tocar.',
                despues: ''
              },
              {
                seccion: 'Paso 2: por que',
                queHacemos: 'Vemos la razon.',
                paraQue: 'Cada metodo de enfriamiento quita una fraccion de lo que queda, nunca todo. Es como recorrer media distancia cada vez: te acercas siempre, pero no llegas.',
                queda: 'Harian falta infinitos pasos',
                pregunta: '&iquest;Por que no se puede llegar a 0 K?',
                resp: R.opcion(['Porque harian falta infinitos pasos de enfriamiento',
                  'Porque los termometros no miden tan bajo'], 0),
                pista: 'No es un problema de medir, es de enfriar.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pd.por + '.',
                queda: pd.corto || pd.ok,
                pregunta: pd.q,
                resp: R.opcion([pd.ok, pd.mal], 0),
                pista: 'Distingue entre acercarse y llegar.',
                despues: ''
              }
            ],
            final: '<b>' + pd.ok + '</b>',
            receta: ['La tercera ley: 0 K es inalcanzable',
              'Se puede uno acercar cuanto quiera',
              'Harian falta infinitos pasos para llegar',
              'Cerca de 0 K la entropia de un cristal perfecto tiende a cero']
          });
          enun = pd.q;
          resp = R.opcion([pd.ok, pd.mal], 0);
          pistas = ['La tercera ley dice que el cero absoluto es inalcanzable.',
            'Aqui ' + pd.por + '.'];
          sol = ['La tercera ley: no se puede alcanzar 0 K en pasos finitos',
            'Aqui ' + pd.por,
            'Respuesta: <b>' + pd.ok + '</b>'];

        } else {
          var pc = r.elige([
            { q: '&iquest;Cuanto vale el cero absoluto en grados Celsius?', ok: '&minus;273.15 &deg;C', mal: '0 &deg;C',
              por: 'el 0 &deg;C es la congelacion del agua, que esta muy por encima del cero absoluto' },
            { q: '&iquest;Que ocurre con el movimiento de los atomos en el cero absoluto?',
              ok: 'Queda reducido al minimo posible', mal: 'Los atomos se mueven mas rapido que nunca',
              por: 'la temperatura mide justamente ese movimiento, asi que a la minima temperatura corresponde el minimo movimiento' },
            { q: '&iquest;Puede existir una temperatura de &minus;300 &deg;C?', ok: 'No: esta por debajo del cero absoluto',
              mal: 'Si, seria simplemente muy frio', por: 'no hay nada por debajo de &minus;273.15 &deg;C' },
            { q: '&iquest;Por que la escala Kelvin empieza en el cero absoluto?',
              ok: 'Para que no existan temperaturas negativas y las formulas funcionen', corto: 'para que no haya negativos', mal: 'Por costumbre historica',
              por: 'muchas formulas de fisica dividen entre la temperatura, y con negativos darian resultados sin sentido' }
          ]);
          guiaDelPaso = G({
            intro: 'El <b>cero absoluto</b> es el fondo de la escala de temperaturas: no hay nada mas frio.<br>' +
              'Esta en <b>&minus;273.15 &deg;C</b>, y es el punto donde empieza la escala Kelvin.',
            pasos: [
              {
                seccion: 'Paso 1: que mide la temperatura',
                queHacemos: 'Recordamos que hay detras de un termometro.',
                paraQue: 'La temperatura mide la agitacion de las particulas. Mas frio quiere decir menos movimiento.',
                queda: 'Temperatura = agitacion de las particulas',
                pregunta: '&iquest;Que mide en el fondo la temperatura?',
                resp: R.opcion(['El movimiento de las particulas', 'La cantidad de calor que hay'], 0),
                pista: 'Calor y temperatura no son lo mismo.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el fondo de la escala',
                queHacemos: 'Localizamos el cero absoluto.',
                paraQue: 'Si el movimiento no puede bajar mas, tampoco la temperatura. Ese fondo esta en &minus;273.15 &deg;C.',
                queda: '0 K = &minus;273.15 &deg;C',
                pregunta: '&iquest;Cuanto vale el cero absoluto en Celsius? (2 decimales)',
                resp: R.numero(-273.15, { dec: 2, tol: 0.2, unidad: '&deg;C' }),
                pista: 'Es un numero muy conocido.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pc.por + '.',
                queda: pc.corto || pc.ok,
                pregunta: pc.q,
                resp: R.opcion([pc.ok, pc.mal], 0),
                pista: 'Todo sale de que no hay nada por debajo de &minus;273.15 &deg;C.',
                despues: ''
              }
            ],
            final: '<b>' + pc.ok + '</b>',
            receta: ['La temperatura mide la agitacion de las particulas',
              'El cero absoluto es el minimo posible: &minus;273.15 &deg;C',
              'La escala Kelvin empieza ahi',
              'No existen temperaturas por debajo']
          });
          enun = pc.q;
          resp = R.opcion([pc.ok, pc.mal], 0);
          pistas = ['El cero absoluto esta en &minus;273.15 &deg;C y es la temperatura minima posible.',
            'Aqui ' + pc.por + '.'];
          sol = ['El cero absoluto (0 K) es &minus;273.15 &deg;C',
            'Aqui ' + pc.por,
            'Respuesta: <b>' + pc.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['aCelsius', 'De kelvin a Celsius'],
          ['diferencia', 'Diferencias de temperatura'],
          ['aKelvin', 'De Celsius a kelvin']
        ]);
        if (t2 === 'aKelvin') return extra.aKelvin(r, dif);

        if (t2 === 'aCelsius') {
          var kk = r.elige([77, 100, 200, 273.15, 300, 373.15, 500, 1000]);
          var cc = kk - 273.15;
          guiaDelPaso = G({
            intro: 'Convierte <b>' + kk + ' K</b> a grados Celsius.<br>' +
              'Es la conversion de siempre, pero al reves: ahora hay que <b>restar</b>.',
            pasos: [
              {
                seccion: 'Paso 1: la relacion',
                queHacemos: 'Partimos de K = &deg;C + 273.15 y la damos vuelta.',
                paraQue: 'Si para ir a kelvin se suma, para volver hay que restar lo mismo.',
                queda: '&deg;C = K &minus; 273.15',
                pregunta: '&iquest;Como se pasa de kelvin a Celsius?',
                resp: R.opcion(['Restando 273.15', 'Sumando 273.15'], 0),
                pista: 'Es la operacion contraria.',
                despues: ''
              },
              {
                seccion: 'Paso 2: restar',
                queHacemos: 'Hacemos la resta.',
                paraQue: 'Trasladamos el origen del cero absoluto a la congelacion del agua.',
                queda: 'T = ' + F.n(cc, 2) + ' &deg;C',
                pregunta: 'Calcula ' + kk + ' &minus; 273.15 (2 decimales)',
                resp: R.numero(cc, { dec: 2, tol: 0.05, unidad: '&deg;C' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: comprobar',
                queHacemos: 'Miramos si el signo tiene sentido.',
                paraQue: cc < 0
                  ? 'Salio negativo, y esta bien: en Celsius si se admiten negativos, porque su cero es solo la congelacion del agua.'
                  : 'Salio positivo, o sea que esta por encima de la congelacion del agua.',
                queda: 'T = ' + F.n(cc, 2) + ' &deg;C (' + (cc < 0 ? 'bajo cero' : 'sobre cero') + ')',
                pregunta: '&iquest;Puede una temperatura en Celsius ser negativa?',
                resp: R.opcion(['Si, su cero es solo la congelacion del agua', 'No, igual que en kelvin'], 0),
                pista: 'En kelvin no, pero en Celsius si.',
                despues: ''
              }
            ],
            final: kk + ' K = <b>' + F.n(cc, 2) + ' &deg;C</b>',
            receta: ['&deg;C = K &minus; 273.15',
              'Es la operacion contraria a la de ir a kelvin',
              'En Celsius si hay negativos; en kelvin no',
              '273.15 K es justo 0 &deg;C']
          });
          enun = 'Convierte ' + kk + ' K a grados Celsius. (2 decimales)';
          resp = R.numero(cc, { dec: 2, tol: 0.05, unidad: '&deg;C' });
          pistas = ['&deg;C = K &minus; 273.15.',
            'Es la operacion contraria a pasar de Celsius a kelvin.'];
          sol = ['&deg;C = K &minus; 273.15',
            '&deg;C = ' + kk + ' &minus; 273.15',
            'T = <b>' + F.n(cc, 2) + ' &deg;C</b>'];

        } else {
          var c1 = r.elige([10, 20, 25, 30]);
          var c2 = c1 + r.elige([15, 30, 45, 60]);
          var dC = c2 - c1;
          guiaDelPaso = G({
            intro: 'Un cuerpo pasa de <b>' + c1 + ' &deg;C</b> a <b>' + c2 + ' &deg;C</b>.<br>' +
              'La pregunta es cuanto <b>cambio</b> su temperatura en kelvin. Hay un atajo que mucha gente no ve.',
            pasos: [
              {
                seccion: 'Paso 1: el cambio en Celsius',
                queHacemos: 'Restamos las dos temperaturas.',
                paraQue: 'Es la variacion tal cual, sin convertir nada todavia.',
                queda: '&Delta;T = ' + dC + ' &deg;C',
                pregunta: 'Calcula ' + c2 + ' &minus; ' + c1,
                resp: R.numero(dC, { dec: 0, tol: 0.5, unidad: '&deg;C' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el atajo',
                queHacemos: 'Pensamos que pasaria al convertir cada temperatura.',
                paraQue: 'A las dos les sumarias 273.15, y al restarlas ese 273.15 se cancela. Por eso una DIFERENCIA vale igual en las dos escalas.',
                queda: '&Delta;T = ' + dC + ' K',
                pregunta: '&iquest;Cuanto vale esa variacion en kelvin?',
                resp: R.numero(dC, { dec: 0, tol: 0.5, unidad: 'K' }),
                pista: 'El 273.15 se suma a las dos y se cancela al restar.',
                despues: 'Compruebalo: ' + F.n(c2 + 273.15, 2) + ' &minus; ' + F.n(c1 + 273.15, 2) + ' = ' + dC + '.'
              },
              {
                seccion: 'Paso 3: cuando si importa la escala',
                queHacemos: 'Separamos los dos casos.',
                paraQue: 'En una DIFERENCIA da igual la escala. Pero en formulas con la temperatura sola, como la de Carnot o la de los gases, hay que usar kelvin obligatoriamente.',
                queda: 'Diferencias: igual. Temperaturas sueltas: kelvin',
                pregunta: '&iquest;Cuando es obligatorio usar kelvin?',
                resp: R.opcion(['Cuando la formula usa la temperatura sola, no una diferencia',
                  'Siempre, sin excepcion'], 0),
                pista: 'Piensa en la ley de Boyle-Charles o en Carnot: ahi aparece T, no &Delta;T.',
                despues: ''
              }
            ],
            final: 'La variacion es de <b>' + dC + ' K</b>, igual que en Celsius',
            receta: ['Una DIFERENCIA de temperatura vale igual en Celsius y en kelvin',
              'El 273.15 se cancela al restar',
              'Con temperaturas sueltas si hay que convertir',
              'Carnot y las leyes de los gases exigen kelvin']
          });
          enun = 'Un cuerpo pasa de ' + c1 + ' &deg;C a ' + c2 + ' &deg;C.<br>' +
            '&iquest;Cuanto vale esa variacion de temperatura en kelvin? (0 decimales)';
          resp = R.numero(dC, { dec: 0, tol: 0.5, unidad: 'K' });
          pistas = ['Una diferencia de temperatura vale lo mismo en Celsius que en kelvin.',
            'Al sumar 273.15 a las dos, se cancela en la resta.'];
          sol = ['&Delta;T = ' + c2 + ' &minus; ' + c1 + ' = ' + dC + ' &deg;C',
            'Al convertir, el 273.15 se suma a las dos y se cancela',
            '&Delta;T = <b>' + dC + ' K</b>'];
        }

      } else {
        var t3 = r.subtema([
          ['inalcanzable', 'Por que no se llega a 0 K'],
          ['entropiaCero', 'La entropia cerca de 0 K'],
          ['enFormulas', 'Kelvin en las formulas']
        ]);

        if (t3 === 'inalcanzable') {
          var T0 = r.elige([100, 80, 40, 20]);
          var frac = r.elige([2, 4, 5]);
          var t1v = T0 / frac, t2v = t1v / frac, t3v = t2v / frac;
          guiaDelPaso = G({
            intro: 'Imagina un metodo de enfriamiento que, en cada paso, deja el cuerpo a <b>1/' + frac + '</b> de la ' +
              'temperatura que tenia (en kelvin). Partimos de <b>' + T0 + ' K</b>.<br>' +
              'Vamos a ver por que este metodo, por muchas veces que se repita, <b>nunca</b> llega a cero.',
            pasos: [
              {
                seccion: 'Paso 1: el primer paso',
                queHacemos: 'Dividimos entre ' + frac + '.',
                paraQue: 'Vemos cuanto baja en la primera aplicacion.',
                queda: 'T = ' + F.n(t1v, 3) + ' K',
                pregunta: 'Calcula ' + T0 + ' &divide; ' + frac + ' (3 decimales)',
                resp: R.numero(t1v, { dec: 3, tol: 0.002, unidad: 'K' }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: repetir dos veces mas',
                queHacemos: 'Volvemos a dividir dos veces.',
                paraQue: 'Cada paso baja muchisimo, pero siempre deja algo. Fijate en que nunca da cero.',
                queda: 'T = ' + F.n(t3v, 4) + ' K tras 3 pasos',
                pregunta: 'Calcula ' + T0 + ' &divide; ' + frac + ' &divide; ' + frac + ' &divide; ' + frac + ' (4 decimales)',
                resp: R.numero(t3v, { dec: 4, tol: 0.002, unidad: 'K' }),
                pista: 'Divide tres veces seguidas entre ' + frac + '.',
                despues: 'Pequeno, pero no cero.'
              },
              {
                seccion: 'Paso 3: ver el patron',
                queHacemos: 'Pensamos en repetirlo muchas veces.',
                paraQue: 'Dividir entre ' + frac + ' nunca da cero, por muchas veces que lo hagas. La temperatura se acerca al cero sin tocarlo jamas.',
                queda: 'Nunca llega a 0 K',
                pregunta: 'Repitiendo el proceso un millon de veces, &iquest;se llegaria a 0 K?',
                resp: R.opcion(['No: siempre quedaria algo, por poco que sea', 'Si, a efectos practicos seria cero'], 0),
                pista: 'Un numero dividido muchas veces se hace diminuto, pero no cero.',
                despues: ''
              },
              {
                seccion: 'Paso 4: la ley',
                queHacemos: 'Le ponemos nombre a lo que acabamos de ver.',
                paraQue: 'Eso es exactamente la tercera ley: harian falta INFINITOS pasos, y por eso el cero absoluto es inalcanzable.',
                queda: 'Tercera ley: 0 K inalcanzable',
                pregunta: '&iquest;Que ley acabamos de ilustrar?',
                resp: R.opcion(['La tercera: el cero absoluto es inalcanzable',
                  'La segunda: el calor va de caliente a frio'], 0),
                pista: 'Es la que habla del limite inferior de temperatura.',
                despues: ''
              }
            ],
            final: 'Tras 3 pasos quedan <b>' + F.n(t3v, 4) + ' K</b>: cerca de cero, pero nunca cero',
            receta: ['Cada paso de enfriamiento quita solo una fraccion',
              'Dividir nunca da cero exacto',
              'Harian falta infinitos pasos',
              'Eso es la tercera ley: 0 K es inalcanzable']
          });
          enun = 'Un metodo de enfriamiento deja el cuerpo a 1/' + frac + ' de su temperatura en kelvin en cada paso. ' +
            'Se parte de ' + T0 + ' K.<br>&iquest;Que temperatura queda tras 3 pasos? (4 decimales)';
          resp = R.numero(t3v, { dec: 4, tol: 0.002, unidad: 'K' });
          pistas = ['Cada paso divide la temperatura entre ' + frac + '.',
            'Tres pasos son tres divisiones seguidas.'];
          sol = ['Paso 1: ' + T0 + ' / ' + frac + ' = ' + F.n(t1v, 3) + ' K',
            'Paso 2: ' + F.n(t2v, 4) + ' K. Paso 3: ' + F.n(t3v, 4) + ' K',
            'T = <b>' + F.n(t3v, 4) + ' K</b>: nunca llega a cero, por eso 0 K es inalcanzable'];

        } else if (t3 === 'entropiaCero') {
          var pe = r.elige([
            { q: '&iquest;Por que la entropia de un cristal perfecto tiende a cero en 0 K?',
              ok: 'Porque solo queda una forma posible de ordenarlo: la de minima energia', corto: 'solo queda una forma posible',
              mal: 'Porque desaparece toda la materia',
              por: 'la entropia cuenta las formas de organizarse, y a 0 K solo queda una' },
            { q: '&iquest;Que pasa con la entropia si el cristal tiene defectos?',
              ok: 'No llega a cero: queda una entropia residual', mal: 'Llega a cero igualmente',
              por: 'con defectos hay varias formas de colocarlos, y ese desorden sobra aunque baje la temperatura' },
            { q: '&iquest;Para que sirve que la entropia valga cero en 0 K?',
              ok: 'Da un punto de partida absoluto para medir entropias', mal: 'Para nada practico',
              por: 'sin esa referencia solo podrias medir cambios de entropia, nunca su valor' },
            { q: 'En 0 K, &iquest;se detiene todo movimiento?',
              ok: 'Casi: queda un movimiento minimo que la cuantica no permite eliminar', corto: 'casi: queda un minimo',
              mal: 'Si, todo queda absolutamente quieto',
              por: 'el principio de incertidumbre impide que una particula este totalmente quieta y localizada a la vez' }
          ]);
          guiaDelPaso = G({
            intro: 'La tercera ley tiene una segunda cara, menos famosa: dice que ocurre con la <b>entropia</b> ' +
              'cuando la temperatura se acerca a cero.<br>' +
              'Y ahi esta lo que hace util a esta ley en la practica.',
            pasos: [
              {
                seccion: 'Paso 1: que cuenta la entropia',
                queHacemos: 'Recordamos su significado.',
                paraQue: 'Cuenta de cuantas formas se puede organizar un sistema sin cambiar por fuera.',
                queda: 'Entropia = formas de organizarse',
                pregunta: '&iquest;Que cuenta la entropia?',
                resp: R.opcion(['Las formas posibles de organizar el sistema', 'La energia total del sistema'], 0),
                pista: 'No es energia: es desorden.',
                despues: ''
              },
              {
                seccion: 'Paso 2: que queda en 0 K',
                queHacemos: 'Miramos cuantas formas quedan a esa temperatura.',
                paraQue: 'Sin energia sobrante, cada atomo cae a su estado mas bajo. En un cristal perfecto solo hay UNA forma de estar asi, y una sola forma quiere decir entropia cero.',
                queda: 'S tiende a 0 en un cristal perfecto',
                pregunta: 'En 0 K, &iquest;cuantas formas de organizarse le quedan a un cristal perfecto?',
                resp: R.opcion(['Una sola', 'Muchisimas'], 0),
                pista: 'Todo en su minima energia, sin alternativas.',
                despues: ''
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pe.por + '.',
                queda: pe.corto || pe.ok,
                pregunta: pe.q,
                resp: R.opcion([pe.ok, pe.mal], 0),
                pista: 'Vuelve a la idea de contar formas posibles.',
                despues: ''
              }
            ],
            final: '<b>' + pe.ok + '</b>',
            receta: ['La entropia cuenta las formas de organizarse',
              'En 0 K un cristal perfecto tiene una sola: S tiende a 0',
              'Con defectos queda entropia residual',
              'Eso da un origen absoluto para medir entropias']
          });
          enun = pe.q;
          resp = R.opcion([pe.ok, pe.mal], 0);
          pistas = ['En 0 K un cristal perfecto tiene una sola configuracion posible, asi que su entropia tiende a cero.',
            'Aqui ' + pe.por + '.'];
          sol = ['La tercera ley: la entropia de un cristal perfecto tiende a cero en 0 K',
            'Aqui ' + pe.por,
            'Respuesta: <b>' + pe.ok + '</b>'];

        } else {
          var cf = r.elige([27, 127, 227, 327]);
          var kf = cf + 273;
          var pf = r.elige([
            { q: 'En la ley de los gases (PV/T constante), &iquest;en que escala va T?', ok: 'En kelvin', mal: 'En Celsius',
              por: 'la T aparece sola en un cociente, asi que necesita una escala absoluta' },
            { q: 'En el rendimiento de Carnot, &iquest;en que escala van las temperaturas?', ok: 'En kelvin', mal: 'En Celsius',
              por: 'se divide una temperatura entre otra, y con Celsius saldrian cocientes sin sentido' },
            { q: 'Si usas 27 &deg;C en vez de 300 K en la ley de los gases, &iquest;que pasa?',
              ok: 'El resultado sale mal, porque el cociente cambia por completo', corto: 'el resultado sale mal', mal: 'Da igual, es la misma temperatura',
              por: 'dividir entre 27 no es ni parecido a dividir entre 300' },
            { q: 'Para calcular un &Delta;T en una formula de calor, &iquest;hace falta convertir a kelvin?',
              ok: 'No: una diferencia vale igual en las dos escalas', mal: 'Si, siempre hay que convertir',
              por: 'el 273.15 se cancela al restar las dos temperaturas' }
          ]);
          guiaDelPaso = G({
            intro: 'Un error clasico en los examenes: meter grados Celsius donde la formula pide kelvin.<br>' +
              'Hay una regla sencilla para no equivocarse, y un ejemplo numerico deja claro por que importa tanto.',
            pasos: [
              {
                seccion: 'Paso 1: la regla',
                queHacemos: 'Separamos los dos casos.',
                paraQue: 'Si en la formula aparece T sola (multiplicando o dividiendo), va en kelvin. Si aparece &Delta;T, da igual la escala.',
                queda: 'T sola: kelvin. &Delta;T: cualquiera',
                pregunta: 'Si la formula divide entre T, &iquest;que escala hay que usar?',
                resp: R.opcion(['Kelvin', 'Celsius'], 0),
                pista: 'Dividir entre una temperatura exige un cero que signifique algo.',
                despues: ''
              },
              {
                seccion: 'Paso 2: ver la diferencia con numeros',
                queHacemos: 'Convertimos ' + cf + ' &deg;C a kelvin.',
                paraQue: 'Comparando ' + cf + ' con ' + kf + ' se entiende de golpe: no son parecidos ni de lejos.',
                queda: cf + ' &deg;C = ' + kf + ' K',
                pregunta: 'Calcula ' + cf + ' + 273 (0 decimales)',
                resp: R.numero(kf, { dec: 0, tol: 0.5, unidad: 'K' }),
                pista: 'Suma 273.',
                despues: 'Usar ' + cf + ' en vez de ' + kf + ' te cambia el resultado por completo.'
              },
              {
                seccion: 'Paso 3: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pf.por + '.',
                queda: pf.corto || pf.ok,
                pregunta: pf.q,
                resp: R.opcion([pf.ok, pf.mal], 0),
                pista: 'Mira si en la formula aparece T sola o una diferencia.',
                despues: ''
              }
            ],
            final: '<b>' + pf.ok + '</b>',
            receta: ['Si la formula usa T sola: kelvin obligatorio',
              'Si usa &Delta;T: cualquiera de las dos escalas',
              'K = &deg;C + 273.15',
              'Es uno de los errores mas comunes en examenes']
          });
          enun = pf.q;
          resp = R.opcion([pf.ok, pf.mal], 0);
          pistas = ['Regla: si la formula usa la temperatura sola, va en kelvin; si usa una diferencia, da igual.',
            'Aqui ' + pf.por + '.'];
          sol = ['Las formulas con T sola exigen kelvin; las de &Delta;T no',
            'Aqui ' + pf.por,
            'Respuesta: <b>' + pf.ok + '</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
