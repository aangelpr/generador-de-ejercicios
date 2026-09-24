/* Ley cero de la termodinamica: equilibrio termico. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;

  var extra = {};

  /* ---------------- temperatura final de dos cuerpos iguales ---------------- */
  extra.equilibrio = function (r) {
    var t1 = r.entero(10, 40), t2 = t1 + r.entero(20, 60);
    var tf = (t1 + t2) / 2;
    return {
      guia: G({
        intro: 'Se juntan <b>dos masas iguales de la misma sustancia</b>, una a <b>' + t1 + ' &deg;C</b> ' +
          'y otra a <b>' + t2 + ' &deg;C</b>, aisladas del exterior.<br>' +
          'La ley cero dice que acabaran a la <b>misma temperatura</b>. Como son iguales en masa y material, ' +
          'esa temperatura queda justo en medio.',
        pasos: [
          {
            seccion: 'Paso 1: hacia donde va el calor',
            queHacemos: 'Decidimos en que sentido fluye el calor.',
            paraQue: 'El calor va SIEMPRE del cuerpo caliente al frio, nunca al reves por si solo. Es lo que hace que acaben igualandose.',
            queda: 'el calor va del de ' + t2 + ' al de ' + t1,
            pregunta: '&iquest;Hacia donde fluye el calor?',
            resp: R.opcion(['Del cuerpo de ' + t2 + ' &deg;C al de ' + t1 + ' &deg;C',
              'Del cuerpo de ' + t1 + ' &deg;C al de ' + t2 + ' &deg;C'], 0),
            pista: 'El calor baja de temperatura, igual que el agua baja de nivel.',
            despues: 'Uno se enfria y el otro se calienta hasta encontrarse.'
          },
          {
            seccion: 'Paso 2: donde se detiene',
            queHacemos: 'Vemos cuando deja de fluir el calor.',
            paraQue: 'Se detiene cuando las dos temperaturas son iguales. Eso es el equilibrio termico: no que no haya calor, sino que ya no hay trasvase neto.',
            queda: 'acaban a la misma temperatura',
            pregunta: '&iquest;Cuando deja de pasar calor de uno a otro?',
            resp: R.opcion(['Cuando los dos estan a la misma temperatura', 'Cuando el caliente se queda sin calor'], 0),
            pista: 'Un cuerpo nunca se queda "sin calor": lo que se iguala es la temperatura.',
            despues: ''
          },
          {
            seccion: 'Paso 3: calcular el punto medio',
            queHacemos: 'Promediamos las dos temperaturas.',
            paraQue: 'Solo vale promediar porque las masas y el material son IGUALES. Si uno fuera mayor o de otro material, la final se correria hacia el.',
            queda: 'T final = ' + F.n(tf, 1) + ' &deg;C',
            pregunta: 'Calcula (' + t1 + ' + ' + t2 + ') / 2 (1 decimal)',
            resp: R.numero(tf, { dec: 1, tol: 0.05, unidad: '&deg;C' }),
            pista: 'Suma y divide entre 2.',
            despues: 'Lo que uno se enfria es exactamente lo que el otro se calienta.'
          },
          {
            seccion: 'Paso 4: comprobar',
            queHacemos: 'Vemos cuanto cambio cada uno.',
            paraQue: 'El calor que suelta uno es el que absorbe el otro: nada se pierde. Si los cambios no salen iguales, hay un error.',
            queda: 'los dos cambian ' + F.n((t2 - t1) / 2, 1) + ' &deg;C',
            pregunta: '&iquest;Cuantos grados subio el frio? (1 decimal)',
            resp: R.numero(tf - t1, { dec: 1, tol: 0.05, unidad: '&deg;C' }),
            pista: F.n(tf, 1) + ' &minus; ' + t1 + '.',
            despues: 'Y el caliente bajo exactamente lo mismo.'
          }
        ],
        final: 'Acaban los dos a <b>' + F.n(tf, 1) + ' &deg;C</b>',
        receta: ['El calor va siempre de caliente a frio',
          'Se detiene cuando las temperaturas se igualan',
          'Con masas y material iguales, la final es el promedio',
          'Lo que uno pierde es lo que el otro gana']
      }),
      enunciado: 'Se ponen en contacto dos masas iguales de la misma sustancia, a ' + t1 + ' &deg;C y ' + t2 + ' &deg;C, ' +
        'aisladas del exterior.<br>&iquest;A que temperatura quedan? (1 decimal)',
      respuesta: R.numero(tf, { dec: 1, tol: 0.05, unidad: '&deg;C' }),
      pistas: ['El calor pasa del caliente al frio hasta que las temperaturas se igualan.',
        'Con masas iguales y el mismo material, la temperatura final es el promedio.'],
      solucion: ['El calor fluye del de ' + t2 + ' &deg;C al de ' + t1 + ' &deg;C',
        'Se detiene al igualarse las temperaturas: eso es el equilibrio termico',
        'T final = (' + t1 + ' + ' + t2 + ')/2 = <b>' + F.n(tf, 1) + ' &deg;C</b>']
    };
  };

  EJ.tema({
    id: 'termo-0',
    materia: 'fisica',
    grupo: 'Termodinamica',
    nombre: 'Ley cero de la termodinamica',
    descripcion: 'Equilibrio termico, por que funciona un termometro y hacia donde fluye el calor.',
    etiquetas: ['termodinamica', 'equilibrio termico', 'temperatura', 'calor'],
    formulario: '<b>Ley cero:</b> si A esta en equilibrio termico con C, y B tambien lo esta con C, ' +
      'entonces A y B estan en equilibrio entre si.<br>' +
      'Equilibrio termico = misma temperatura = ya no hay trasvase neto de calor.<br>' +
      '<small>Esta ley es la que permite que exista el termometro: se pone en contacto con lo que quieres medir, ' +
      'espera a equilibrarse y marca esa temperatura.<br>' +
      'Se llama "cero" porque se enuncio despues de las otras tres, pero es mas basica que todas.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['sentido', 'Hacia donde va el calor'],
          ['queEs', 'Que es el equilibrio termico'],
          ['termometro', 'Por que funciona el termometro']
        ]);

        if (tf === 'sentido') {
          var ta = r.entero(5, 40), tb = ta + r.entero(15, 50);
          guiaDelPaso = G({
            intro: 'Se ponen en contacto un cuerpo a <b>' + ta + ' &deg;C</b> y otro a <b>' + tb + ' &deg;C</b>.<br>' +
              'Antes de calcular nada, hay que tener clarisimo en que sentido se mueve el calor. ' +
              'Y ojo con una confusion muy comun: calor y temperatura <b>no son lo mismo</b>.',
            pasos: [
              {
                seccion: 'Paso 1: el sentido del calor',
                queHacemos: 'Decidimos hacia donde fluye.',
                paraQue: 'Siempre de caliente a frio, nunca al reves espontaneamente. Un refrigerador lo consigue, pero gastando energia electrica.',
                queda: 'de ' + tb + ' &deg;C hacia ' + ta + ' &deg;C',
                pregunta: '&iquest;Hacia donde fluye el calor?',
                resp: R.opcion(['Del de ' + tb + ' &deg;C al de ' + ta + ' &deg;C', 'Del de ' + ta + ' &deg;C al de ' + tb + ' &deg;C'], 0),
                pista: 'Como el agua, que siempre baja: el calor baja de temperatura.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calor no es temperatura',
                queHacemos: 'Distinguimos las dos ideas.',
                paraQue: 'La temperatura es un NIVEL; el calor es lo que se TRANSFIERE entre dos niveles distintos. Un cuerpo tiene temperatura, no "tiene calor".',
                queda: 'la temperatura es el nivel; el calor, el trasvase',
                pregunta: '&iquest;Cual es la diferencia entre calor y temperatura?',
                resp: R.opcion(['La temperatura es un nivel; el calor es energia que se transfiere',
                  'Son dos nombres para lo mismo'], 0),
                pista: 'Se dice "esta a 30 grados", no "tiene 30 calores".',
                despues: 'Por eso el calor solo existe mientras hay diferencia de temperatura.'
              }
            ],
            final: 'El calor va <b>del de ' + tb + ' &deg;C al de ' + ta + ' &deg;C</b>',
            receta: ['El calor va siempre de caliente a frio',
              'Se detiene al igualarse las temperaturas',
              'La temperatura es un nivel; el calor, una transferencia',
              'Para llevarlo al reves hay que gastar energia']
          });
          enun = 'Se ponen en contacto un cuerpo a ' + ta + ' &deg;C y otro a ' + tb + ' &deg;C.<br>&iquest;Hacia donde fluye el calor?';
          resp = R.opcion(['Del de ' + tb + ' &deg;C al de ' + ta + ' &deg;C', 'Del de ' + ta + ' &deg;C al de ' + tb + ' &deg;C'], 0);
          pistas = ['El calor fluye siempre de mayor a menor temperatura.',
            'Se detiene cuando las dos temperaturas se igualan.'];
          sol = ['El calor va espontaneamente de caliente a frio',
            'Aqui, <b>del de ' + tb + ' &deg;C al de ' + ta + ' &deg;C</b>',
            'Se detendra cuando las dos temperaturas se igualen'];

        } else if (tf === 'queEs') {
          var pe = r.elige([
            { q: '&iquest;Que significa que dos cuerpos esten en equilibrio termico?',
              ok: 'Que estan a la misma temperatura', mal: 'Que tienen la misma cantidad de calor',
              por: 'el equilibrio se define por la temperatura, no por cuanta energia tenga cada uno' },
            { q: 'Dos cuerpos en equilibrio termico, &iquest;intercambian calor?',
              ok: 'No hay transferencia neta entre ellos', mal: 'Si, el grande le pasa calor al pequeno',
              por: 'al estar a la misma temperatura no hay hacia donde fluir' },
            { q: 'Si A esta en equilibrio con C y B tambien, &iquest;que pasa entre A y B?',
              ok: 'Tambien estan en equilibrio entre si', mal: 'No se puede saber sin ponerlos en contacto',
              por: 'eso es justo lo que afirma la ley cero, y es lo que permite comparar temperaturas' },
            { q: 'Un trozo de metal y uno de madera en la misma habitacion. El metal se siente mas frio. &iquest;Estan a distinta temperatura?',
              ok: 'No: estan a la misma, pero el metal conduce mejor el calor', corto: 'misma temperatura, distinta conduccion', mal: 'Si, el metal esta mas frio',
              por: 'el metal te quita calor de la mano mas rapido, y eso se siente como frio' }
          ]);
          guiaDelPaso = G({
            intro: 'Una pregunta sobre el <b>equilibrio termico</b>, que es la idea que sostiene toda la termodinamica.',
            pasos: [
              {
                seccion: 'Paso 1: la definicion',
                queHacemos: 'Fijamos que es el equilibrio termico.',
                paraQue: 'Es que las temperaturas sean iguales, no que tengan la misma energia. Un vaso y una alberca a 20 &deg;C estan en equilibrio, con energias muy distintas.',
                queda: 'equilibrio = misma temperatura',
                pregunta: '&iquest;Que define el equilibrio termico?',
                resp: R.opcion(['Que las temperaturas sean iguales', 'Que las energias sean iguales'], 0),
                pista: 'Una alberca tiene mucha mas energia que un vaso, pero pueden estar a la misma temperatura.',
                despues: ''
              },
              {
                seccion: 'Paso 2: aplicarlo',
                queHacemos: 'Contestamos la pregunta.',
                paraQue: 'Aqui ' + pe.por + '.',
                queda: pe.corto || pe.ok,
                pregunta: pe.q,
                resp: R.opcion([pe.ok, pe.mal], 0),
                pista: 'Piensa en temperaturas, no en cantidades de energia.',
                despues: ''
              }
            ],
            final: '<b>' + pe.ok + '</b>',
            receta: ['Equilibrio termico es igualdad de TEMPERATURA',
              'En equilibrio no hay transferencia neta de calor',
              'La ley cero es transitiva: si A~C y B~C, entonces A~B',
              'Lo que se siente al tocar depende tambien de la conduccion']
          });
          enun = pe.q;
          resp = R.opcion([pe.ok, pe.mal], 0);
          pistas = ['El equilibrio termico se define por la temperatura, no por la energia.',
            'Aqui ' + pe.por + '.'];
          sol = ['Equilibrio termico quiere decir misma temperatura',
            'Aqui ' + pe.por,
            'Respuesta: <b>' + pe.ok + '</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'Metes un termometro en un vaso de agua y esperas. &iquest;Por que lo que marca es ' +
              'la temperatura del <b>agua</b> y no la del termometro?<br>' +
              'La respuesta es justamente la ley cero, y por eso esta ley existe: sin ella, medir temperaturas ' +
              'no tendria sentido.',
            pasos: [
              {
                seccion: 'Paso 1: que pasa al meterlo',
                queHacemos: 'Seguimos lo que ocurre entre el termometro y el agua.',
                paraQue: 'Intercambian calor hasta igualarse. Por eso hay que ESPERAR: al principio el termometro marca su propia temperatura.',
                queda: 'se igualan las temperaturas',
                pregunta: 'Al meter el termometro en el agua, &iquest;que ocurre?',
                resp: R.opcion(['Intercambian calor hasta quedar a la misma temperatura',
                  'El termometro mide el agua sin tocarla'], 0),
                pista: 'Por eso hay que esperar unos segundos antes de leerlo.',
                despues: 'Cuando se estabiliza, los dos estan a la misma temperatura.'
              },
              {
                seccion: 'Paso 2: por que sirve para comparar',
                queHacemos: 'Aplicamos la transitividad de la ley cero.',
                paraQue: 'Si el termometro marca lo mismo en dos vasos distintos, esos dos vasos estan en equilibrio entre si, aunque nunca se hayan tocado.',
                queda: 'el termometro sirve de intermediario',
                pregunta: 'Si el termometro marca 25 &deg;C en dos vasos distintos, &iquest;que se puede afirmar?',
                resp: R.opcion(['Que los dos vasos estan en equilibrio termico entre si',
                  'Nada, porque no se han tocado'], 0),
                pista: 'Es la ley cero: los dos estan en equilibrio con el termometro, asi que lo estan entre si.',
                despues: 'Esa transitividad es lo que hace util la escala de temperaturas.'
              },
              {
                seccion: 'Paso 3: el termometro debe ser pequeno',
                queHacemos: 'Pensamos por que conviene que sea chico.',
                paraQue: 'Al equilibrarse, el termometro cambia un poco la temperatura de lo que mide. Cuanto mas pequeno, menos lo altera.',
                queda: 'pequeno para no alterar la medida',
                pregunta: '&iquest;Por que conviene que el termometro sea pequeno comparado con lo que mide?',
                resp: R.opcion(['Para no cambiar apreciablemente la temperatura de lo que mide',
                  'Para que se enfrie mas rapido despues'], 0),
                pista: 'Un termometro enorme en un vaso chico enfriaria el agua al meterlo.',
                despues: ''
              }
            ],
            final: 'Porque el termometro y el agua llegan al <b>equilibrio termico</b>: acaban a la misma temperatura',
            receta: ['El termometro se equilibra con lo que mide',
              'Por eso hay que esperar antes de leerlo',
              'La ley cero permite comparar cosas que nunca se tocaron',
              'Conviene que sea pequeno para no alterar la medida']
          });
          enun = '&iquest;Por que un termometro marca la temperatura de aquello en lo que se introduce?';
          resp = R.opcion(['Porque llega al equilibrio termico con ello: acaban a la misma temperatura',
            'Porque detecta el calor a distancia'], 0);
          pistas = ['El termometro intercambia calor con lo que mide hasta igualarse.',
            'Esa es justamente la utilidad de la ley cero.'];
          sol = ['Al meterlo, termometro y sustancia intercambian calor',
            'Se detienen cuando estan a la misma temperatura: equilibrio termico',
            'El termometro marca entonces esa temperatura comun, que es la de la sustancia'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['equilibrio', 'Temperatura final'],
          ['transitiva', 'Propiedad transitiva'],
          ['sensacion', 'Sensacion termica']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        if (t2 === 'transitiva') {
          var tc = r.entero(15, 45);
          guiaDelPaso = G({
            intro: 'Un bloque <b>A</b> esta en equilibrio termico con un termometro <b>C</b>, que marca ' +
              '<b>' + tc + ' &deg;C</b>. Un bloque <b>B</b>, en otra habitacion, tambien esta en equilibrio con <b>C</b>.<br>' +
              'La pregunta es que se puede decir de A y B, que <b>nunca se han tocado</b>.',
            pasos: [
              {
                seccion: 'Paso 1: que sabemos de cada uno',
                queHacemos: 'Anotamos la temperatura de A y de B.',
                paraQue: 'Estar en equilibrio con C quiere decir estar a la temperatura de C. Los dos, por separado, estan a ' + tc + ' &deg;C.',
                queda: 'A y B estan los dos a ' + tc + ' &deg;C',
                pregunta: '&iquest;A que temperatura esta el bloque A?',
                resp: R.numero(tc, { dec: 1, tol: 0.05, unidad: '&deg;C' }),
                pista: 'Esta en equilibrio con el termometro, que marca ' + tc + '.',
                despues: 'Y B tambien, por la misma razon.'
              },
              {
                seccion: 'Paso 2: la conclusion',
                queHacemos: 'Comparamos A con B.',
                paraQue: 'Esto es LA ley cero: el equilibrio termico es transitivo. Si no lo fuera, no se podrian comparar temperaturas de cosas separadas.',
                queda: 'A y B estan en equilibrio entre si',
                pregunta: 'Si A y B estuvieran en contacto, &iquest;habria flujo de calor?',
                resp: R.opcion(['No: ya estan a la misma temperatura', 'Si, hasta que se igualen'], 0),
                pista: 'Los dos estan a ' + tc + ' &deg;C.',
                despues: 'Estan en equilibrio aunque nunca se hayan tocado.'
              },
              {
                seccion: 'Paso 3: para que sirve esto',
                queHacemos: 'Vemos la consecuencia practica.',
                paraQue: 'Gracias a esto se pueden comparar temperaturas de cosas que estan lejos, en distinto momento, sin ponerlas juntas. Toda la medicion de temperatura depende de ello.',
                queda: 'por eso se pueden comparar temperaturas',
                pregunta: '&iquest;Para que sirve esta propiedad?',
                resp: R.opcion(['Para comparar temperaturas sin poner los cuerpos en contacto',
                  'Para calcular cuanto calor tiene cada cuerpo'], 0),
                pista: 'Es lo que hace util un termometro.',
                despues: ''
              }
            ],
            final: 'A y B estan <b>en equilibrio termico entre si</b>, los dos a ' + tc + ' &deg;C',
            receta: ['Equilibrio con C quiere decir estar a la temperatura de C',
              'El equilibrio termico es transitivo: A~C y B~C implica A~B',
              'Esa es exactamente la ley cero',
              'Por eso el termometro sirve para comparar']
          });
          enun = 'A esta en equilibrio termico con un termometro que marca ' + tc + ' &deg;C, ' +
            'y B tambien lo esta con el mismo termometro.<br>Si se pusieran A y B en contacto, &iquest;que pasaria?';
          resp = R.opcion(['Nada: ya estan a la misma temperatura', 'Fluiria calor hasta que se igualaran'], 0);
          pistas = ['Estar en equilibrio con el termometro quiere decir estar a su temperatura.',
            'La ley cero dice que el equilibrio termico es transitivo.'];
          sol = ['A esta a ' + tc + ' &deg;C y B tambien, por estar los dos en equilibrio con el termometro',
            'Por la ley cero, A y B estan en equilibrio entre si',
            'Al ponerlos en contacto <b>no fluiria calor</b>'];

        } else {
          guiaDelPaso = G({
            intro: 'En una habitacion a temperatura ambiente, tocas un <b>azulejo</b> y una <b>alfombra</b>.<br>' +
              'El azulejo se siente <b>mucho mas frio</b>, aunque llevan horas en la misma habitacion. ' +
              '&iquest;Estan a distinta temperatura?',
            pasos: [
              {
                seccion: 'Paso 1: a que temperatura estan',
                queHacemos: 'Aplicamos la ley cero a la habitacion.',
                paraQue: 'Llevan horas en el mismo cuarto, asi que estan en equilibrio con el aire y, por tanto, entre si. Estan a la MISMA temperatura.',
                queda: 'los dos a la temperatura del cuarto',
                pregunta: 'Llevan horas en la misma habitacion. &iquest;A que temperatura estan?',
                resp: R.opcion(['Los dos a la misma: la del cuarto', 'El azulejo mas frio que la alfombra'], 0),
                pista: 'Los dos estan en equilibrio con el aire de la habitacion.',
                despues: 'Entonces la sensacion no viene de la temperatura.'
              },
              {
                seccion: 'Paso 2: que estas sintiendo de verdad',
                queHacemos: 'Pensamos que mide tu piel.',
                paraQue: 'Tu piel no mide temperatura: mide la RAPIDEZ con la que pierde calor. Cuanto mas rapido se lo llevan, mas frio sientes.',
                queda: 'sientes la rapidez con que pierdes calor',
                pregunta: 'Tu mano, &iquest;que esta detectando?',
                resp: R.opcion(['Que tan rapido pierde calor', 'La temperatura exacta del objeto'], 0),
                pista: 'Si midiera temperatura, los dos se sentirian igual.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la diferencia entre los dos',
                queHacemos: 'Comparamos como conducen el calor.',
                paraQue: 'El azulejo conduce muy bien: se lleva el calor de tu mano deprisa. La alfombra conduce mal y ademas atrapa aire, asi que apenas te quita calor.',
                queda: 'el azulejo conduce mejor el calor',
                pregunta: '&iquest;Por que el azulejo se siente mas frio?',
                resp: R.opcion(['Porque conduce el calor mucho mejor y te lo quita mas rapido',
                  'Porque de verdad esta a menor temperatura'], 0),
                pista: 'Un termometro marcaria lo mismo en los dos.',
                despues: 'Por eso en invierno se ponen alfombras: no calientan, solo no te roban calor.'
              }
            ],
            final: 'Estan a <b>la misma temperatura</b>: el azulejo se siente frio porque conduce mejor el calor',
            receta: ['Objetos en el mismo cuarto acaban a la misma temperatura',
              'La piel no mide temperatura, mide perdida de calor',
              'Los buenos conductores se sienten mas frios',
              'Un termometro marcaria lo mismo en los dos']
          });
          enun = 'En una misma habitacion, un azulejo se siente mas frio que una alfombra.<br>&iquest;Por que?';
          resp = R.opcion(['Porque conduce el calor mejor y se lo quita mas rapido a tu mano',
            'Porque esta realmente a menor temperatura'], 0);
          pistas = ['Los dos llevan horas en la misma habitacion: estan en equilibrio termico.',
            'La piel no detecta temperatura, sino la rapidez con la que pierde calor.'];
          sol = ['Por la ley cero, los dos estan a la temperatura del cuarto',
            'La sensacion depende de la rapidez con que tu mano pierde calor',
            'El azulejo <b>conduce mejor</b> y te lo quita mas deprisa: por eso se siente frio'];
        }

      } else {
        var t3 = r.subtema([
          ['mezclaDesigual', 'Mezcla de masas distintas'],
          ['equilibrio', 'Temperatura final'],
          ['escalas', 'Escalas de temperatura']
        ]);
        if (extra[t3]) return extra[t3](r, dif);

        if (t3 === 'mezclaDesigual') {
          var m1 = r.elige([1, 2, 3]);
          var m2 = m1 * r.elige([2, 3, 4]);
          var T1 = r.entero(10, 30), T2 = T1 + r.entero(30, 60);
          var Tf = (m1 * T1 + m2 * T2) / (m1 + m2);
          guiaDelPaso = G({
            intro: 'Se mezclan <b>' + m1 + ' kg</b> de agua a <b>' + T1 + ' &deg;C</b> con <b>' + m2 + ' kg</b> ' +
              'a <b>' + T2 + ' &deg;C</b>.<br>' +
              'Ahora las masas <b>no</b> son iguales, asi que el resultado ya no es el punto medio: ' +
              'la temperatura final se corre hacia la masa mayor.',
            pasos: [
              {
                seccion: 'Paso 1: anticipar el resultado',
                queHacemos: 'Predecimos hacia donde va a caer la temperatura final.',
                paraQue: 'Hay ' + (m2 / m1) + ' veces mas agua caliente, asi que la final quedara mucho mas cerca de los ' + T2 + ' &deg;C. Anticiparlo permite detectar un error absurdo.',
                queda: 'mas cerca de ' + T2 + ' &deg;C',
                pregunta: 'Hay mas masa del agua caliente. &iquest;Donde quedara la temperatura final?',
                resp: R.opcion(['Mas cerca de ' + T2 + ' &deg;C', 'Justo en el punto medio'], 0),
                pista: 'La masa mayor "manda" mas en la mezcla.',
                despues: 'Estara entre ' + T1 + ' y ' + T2 + ', pero corrida hacia arriba.'
              },
              {
                seccion: 'Paso 2: el balance de calor',
                queHacemos: 'Igualamos el calor que suelta uno al que absorbe el otro.',
                paraQue: 'Nada se pierde: el calor que sale del caliente entra en el frio. De ahi sale la ecuacion.',
                queda: m1 + '(T &minus; ' + T1 + ') = ' + m2 + '(' + T2 + ' &minus; T)',
                pregunta: '&iquest;Que relacion se cumple?',
                resp: R.opcion(['El calor que suelta el caliente es el que absorbe el frio',
                  'Los dos sueltan la misma cantidad de calor'], 0),
                pista: 'Uno se enfria y el otro se calienta con esa misma energia.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la media ponderada',
                queHacemos: 'Despejamos la temperatura final.',
                paraQue: 'Queda un promedio PONDERADO por las masas: cada temperatura pesa segun cuanta agua haya. Con masas iguales se reduce al promedio normal.',
                queda: 'T = ' + F.n(Tf, 2) + ' &deg;C',
                pregunta: 'Calcula (' + m1 + '&times;' + T1 + ' + ' + m2 + '&times;' + T2 + ') / ' + (m1 + m2) + ' (2 decimales)',
                resp: R.numero(Tf, { dec: 2, tol: 0.05, unidad: '&deg;C' }),
                pista: 'Arriba: ' + (m1 * T1) + ' + ' + (m2 * T2) + ' = ' + (m1 * T1 + m2 * T2) + '.',
                despues: ''
              },
              {
                seccion: 'Paso 4: comprobar la prediccion',
                queHacemos: 'Miramos si el resultado cuadra con lo que anticipamos.',
                paraQue: 'Tiene que estar entre las dos temperaturas y mas cerca de la de mayor masa. Si no cumple eso, hay un error.',
                queda: 'T = ' + F.n(Tf, 2) + ' &deg;C, mas cerca de ' + T2,
                pregunta: '&iquest;Esta el resultado entre ' + T1 + ' y ' + T2 + ' y mas cerca de ' + T2 + '?',
                resp: R.opcion(['Si, como se esperaba', 'No, hay un error'], 0),
                pista: F.n(Tf, 2) + ' esta a ' + F.n(T2 - Tf, 2) + ' grados de ' + T2 + ' y a ' + F.n(Tf - T1, 2) + ' de ' + T1 + '.',
                despues: ''
              }
            ],
            final: 'La mezcla queda a <b>' + F.n(Tf, 2) + ' &deg;C</b>',
            receta: ['El calor que suelta uno lo absorbe el otro',
              'Con masas distintas, la final es una media PONDERADA',
              'T = (m1T1 + m2T2) / (m1 + m2)',
              'Siempre queda mas cerca de la masa mayor']
          });
          enun = 'Se mezclan ' + m1 + ' kg de agua a ' + T1 + ' &deg;C con ' + m2 + ' kg a ' + T2 + ' &deg;C.<br>' +
            '&iquest;A que temperatura queda la mezcla? (2 decimales)';
          resp = R.numero(Tf, { dec: 2, tol: 0.05, unidad: '&deg;C' });
          pistas = ['El calor que suelta el agua caliente es el que absorbe la fria.',
            'Sale una media ponderada: T = (m1T1 + m2T2)/(m1+m2).'];
          sol = ['El calor cedido por la caliente es el absorbido por la fria',
            'T = (' + m1 + '&times;' + T1 + ' + ' + m2 + '&times;' + T2 + ') / (' + m1 + '+' + m2 + ')',
            'T = ' + (m1 * T1 + m2 * T2) + ' / ' + (m1 + m2) + ' = <b>' + F.n(Tf, 2) + ' &deg;C</b>'];

        } else {
          var tcel = r.entero(-20, 100);
          var tk = tcel + 273.15;
          var tfah = tcel * 9 / 5 + 32;
          guiaDelPaso = G({
            intro: 'Una temperatura de <b>' + tcel + ' &deg;C</b> hay que pasarla a <b>kelvin</b> y a <b>Fahrenheit</b>.<br>' +
              'Las tres escalas miden lo mismo con reglas distintas. La diferencia entre ellas es ' +
              '<b>donde ponen el cero</b> y <b>como de grandes son sus grados</b>.',
            pasos: [
              {
                seccion: 'Paso 1: a kelvin',
                queHacemos: 'Sumamos 273.15.',
                paraQue: 'El kelvin tiene grados del MISMO tamano que el Celsius; solo mueve el cero al cero absoluto. Por eso solo hay que sumar.',
                queda: 'T = ' + F.n(tk, 2) + ' K',
                pregunta: 'Calcula ' + tcel + ' + 273.15 (2 decimales)',
                resp: R.numero(tk, { dec: 2, tol: 0.05, unidad: 'K' }),
                pista: 'Suma directa.',
                despues: 'Se escribe "K", sin el simbolo de grado.'
              },
              {
                seccion: 'Paso 2: por que el kelvin no lleva grados',
                queHacemos: 'Pensamos que tiene de especial.',
                paraQue: 'Su cero es el cero ABSOLUTO: no hay nada mas frio. Por eso no existen kelvin negativos, y por eso las formulas de gases solo funcionan en kelvin.',
                queda: 'T = ' + F.n(tk, 2) + ' K, sin negativos posibles',
                pregunta: '&iquest;Por que en las leyes de los gases hay que usar kelvin?',
                resp: R.opcion(['Porque su cero es el cero absoluto y nunca es negativa',
                  'Porque sus grados son mas pequenos'], 0),
                pista: 'Con Celsius podrias dividir entre cero o entre un numero negativo, y saldrian disparates.',
                despues: ''
              },
              {
                seccion: 'Paso 3: a Fahrenheit',
                queHacemos: 'Multiplicamos por 9/5 y sumamos 32.',
                paraQue: 'Aqui cambian las DOS cosas: el cero esta en otro sitio y ademas sus grados son mas pequenos. Por eso hay multiplicacion y suma.',
                queda: 'T = ' + F.n(tfah, 2) + ' &deg;F',
                pregunta: 'Calcula ' + tcel + ' &times; 9/5 + 32 (2 decimales)',
                resp: R.numero(tfah, { dec: 2, tol: 0.05, unidad: '&deg;F' }),
                pista: 'Primero ' + tcel + ' &times; 1.8 = ' + F.n(tcel * 1.8, 2) + ', luego suma 32.',
                despues: ''
              }
            ],
            final: '<b>' + F.n(tk, 2) + ' K</b> y <b>' + F.n(tfah, 2) + ' &deg;F</b>',
            receta: ['K = &deg;C + 273.15 (solo se mueve el cero)',
              '&deg;F = &deg;C &times; 9/5 + 32 (cambian cero y tamano)',
              'El kelvin nunca es negativo',
              'En gases hay que usar SIEMPRE kelvin']
          });
          enun = 'Convierte ' + tcel + ' &deg;C a kelvin y a Fahrenheit (2 decimales).';
          resp = R.varios([
            { etiqueta: 'Kelvin (K)', resp: R.numero(tk, { dec: 2, tol: 0.05 }) },
            { etiqueta: 'Fahrenheit (&deg;F)', resp: R.numero(tfah, { dec: 2, tol: 0.05 }) }
          ]);
          pistas = ['K = &deg;C + 273.15.', '&deg;F = &deg;C &times; 9/5 + 32.'];
          sol = ['K = ' + tcel + ' + 273.15 = <b>' + F.n(tk, 2) + ' K</b>',
            '&deg;F = ' + tcel + '(9/5) + 32 = ' + F.n(tcel * 1.8, 2) + ' + 32 = <b>' + F.n(tfah, 2) + ' &deg;F</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
