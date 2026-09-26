/* Principio de Pascal: la presion se transmite igual en todo el fluido. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- prensa hidraulica: hallar la fuerza de salida ---------------- */
  extra.prensa = function (r) {
    var a1 = r.elige([2, 4, 5, 10]);
    var a2 = a1 * r.elige([5, 10, 20, 25, 50]);
    var f1 = r.elige([50, 100, 150, 200, 250]);
    var f2 = f1 * a2 / a1;
    return {
      guia: G({
        intro: 'Una prensa hidraulica tiene un piston chico de <b>' + a1 + ' cm&sup2;</b> y uno grande de ' +
          '<b>' + a2 + ' cm&sup2;</b>. Se empuja el chico con <b>' + f1 + ' N</b>.<br>' +
          'El principio de Pascal dice que esa presion llega <b>identica</b> al piston grande. Y como el grande ' +
          'tiene mas area, la fuerza que sale es mucho mayor.',
        pasos: [
          {
            seccion: 'Paso 1: la presion que entra',
            queHacemos: 'Dividimos la fuerza entre el area del piston chico.',
            paraQue: 'Presion es fuerza por unidad de area: P = F/A. Es lo unico que viaja por el liquido.',
            queda: 'P = ' + f1 + '/' + a1 + ' = ' + F.n(f1 / a1, 2) + ' N/cm&sup2;',
            pregunta: 'Calcula ' + f1 + ' &divide; ' + a1 + ' (2 decimales)',
            resp: R.numero(f1 / a1, { dec: 2, tol: 0.05 }),
            pista: 'P = F/A.',
            despues: ''
          },
          {
            seccion: 'Paso 2: lo que dice Pascal',
            queHacemos: 'Trasladamos esa presion al otro piston.',
            paraQue: 'El liquido transmite la presion sin perder nada y hacia todos lados. En el piston grande hay exactamente la misma presion que en el chico.',
            queda: 'misma presion en los dos pistones',
            pregunta: '&iquest;Que llega igual al piston grande?',
            resp: R.opcion(['La presion', 'La fuerza'], 0),
            pista: 'Lo que se transmite no es la fuerza: es la presion.',
            despues: 'La fuerza NO es la misma, y ahi esta toda la gracia del invento.'
          },
          {
            seccion: 'Paso 3: la fuerza que sale',
            queHacemos: 'Multiplicamos esa presion por el area grande.',
            paraQue: 'Misma presion sobre mas area da mas fuerza: F = P&middot;A. Por eso una prensa multiplica lo que empujas.',
            queda: 'F<sub>2</sub> = ' + F.n(f2, 1) + ' N',
            pregunta: 'Calcula ' + F.n(f1 / a1, 2) + ' &times; ' + a2 + ' (1 decimal)',
            resp: R.numero(f2, { dec: 1, tol: 0.5, unidad: 'N' }),
            pista: 'F = P&middot;A.',
            despues: ''
          },
          {
            seccion: 'Paso 4: cuanto multiplica',
            queHacemos: 'Comparamos las dos fuerzas.',
            paraQue: 'La fuerza se multiplica por ' + F.n(a2 / a1, 0) + ', que es justo la proporcion entre las dos areas. Ese numero se llama ventaja mecanica.',
            queda: 'multiplica por ' + F.n(a2 / a1, 0),
            pregunta: 'Calcula ' + a2 + ' &divide; ' + a1 + ' (0 decimales)',
            resp: R.numero(a2 / a1, { dec: 0, tol: 0.5 }),
            pista: 'Divide el area grande entre la chica.',
            despues: 'La fuerza se multiplica exactamente en esa proporcion.'
          },
          {
            seccion: 'Paso 5: donde esta el truco',
            queHacemos: 'Miramos lo que se pierde a cambio.',
            paraQue: 'No sale energia de la nada: el piston chico tiene que recorrer ' + F.n(a2 / a1, 0) + ' veces mas distancia. Ganas fuerza, pierdes recorrido.',
            queda: 'mas fuerza, menos recorrido',
            pregunta: '&iquest;Que se pierde a cambio de multiplicar la fuerza?',
            resp: R.opcion(['El recorrido: hay que empujar mucho mas lejos', 'Nada: es energia gratis'], 0),
            pista: 'La energia no se crea.',
            despues: ''
          }
        ],
        final: 'F<sub>2</sub> = <b>' + F.n(f2, 1) + ' N</b>',
        receta: ['P = F<sub>1</sub>/A<sub>1</sub> en el piston chico',
          'Pascal: esa misma presion llega al grande',
          'F<sub>2</sub> = P&middot;A<sub>2</sub>',
          'Atajo: F<sub>2</sub> = F<sub>1</sub> &middot; A<sub>2</sub>/A<sub>1</sub>',
          'Se gana fuerza pero se pierde recorrido']
      }),
      enunciado: 'Una prensa hidraulica tiene pistones de ' + a1 + ' cm&sup2; y ' + a2 + ' cm&sup2;. ' +
        'Se empuja el chico con ' + f1 + ' N.<br>&iquest;Que fuerza sale en el grande? (1 decimal)',
      respuesta: R.numero(f2, { dec: 1, tol: 0.5, unidad: 'N' }),
      pistas: ['La presion es la misma en los dos pistones: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub>.',
        'Despejando: F<sub>2</sub> = F<sub>1</sub> &middot; A<sub>2</sub>/A<sub>1</sub>.'],
      solucion: ['P = ' + f1 + '/' + a1 + ' = ' + F.n(f1 / a1, 2) + ' N/cm&sup2;',
        'F<sub>2</sub> = P &middot; A<sub>2</sub> = ' + F.n(f1 / a1, 2) + ' &middot; ' + a2,
        'F<sub>2</sub> = <b>' + F.n(f2, 1) + ' N</b>']
    };
  };

  /* ---------------- hallar el area necesaria ---------------- */
  extra.area = function (r) {
    var a1 = r.elige([5, 8, 10, 20]);
    var f1 = r.elige([100, 200, 250, 400]);
    var f2 = f1 * r.elige([10, 20, 25, 40]);
    var a2 = a1 * f2 / f1;
    return {
      guia: G({
        intro: 'Se quiere levantar <b>' + F.n(f2, 0) + ' N</b> empujando con solo <b>' + f1 + ' N</b> sobre un piston ' +
          'de <b>' + a1 + ' cm&sup2;</b>.<br>' +
          'La incognita ahora es el <b>area</b> que tiene que tener el piston grande para lograrlo.',
        pasos: [
          {
            seccion: 'Paso 1: cuanto hay que multiplicar',
            queHacemos: 'Dividimos la fuerza que queremos entre la que damos.',
            paraQue: 'Ese cociente es la ventaja mecanica que necesitamos: cuantas veces hay que multiplicar la fuerza.',
            queda: 'hay que multiplicar por ' + F.n(f2 / f1, 0),
            pregunta: 'Calcula ' + F.n(f2, 0) + ' &divide; ' + f1 + ' (0 decimales)',
            resp: R.numero(f2 / f1, { dec: 0, tol: 0.5 }),
            pista: 'Division directa.',
            despues: ''
          },
          {
            seccion: 'Paso 2: de donde sale esa ventaja',
            queHacemos: 'Recordamos que la ventaja es la proporcion de areas.',
            paraQue: 'Como la presion es la misma, la fuerza crece exactamente en la proporcion de las areas. Para multiplicar la fuerza por ' + F.n(f2 / f1, 0) + ', el area tiene que ser ' + F.n(f2 / f1, 0) + ' veces mayor.',
            queda: 'A<sub>2</sub> = ' + F.n(f2 / f1, 0) + ' &times; A<sub>1</sub>',
            pregunta: '&iquest;De que depende cuanto se multiplica la fuerza?',
            resp: R.opcion(['De la proporcion entre las areas', 'De la cantidad de liquido'], 0),
            pista: 'P es la misma, asi que F crece con A.',
            despues: ''
          },
          {
            seccion: 'Paso 3: calcular el area',
            queHacemos: 'Multiplicamos el area chica por esa proporcion.',
            paraQue: 'A<sub>2</sub> = A<sub>1</sub> &middot; F<sub>2</sub>/F<sub>1</sub>.',
            queda: 'A<sub>2</sub> = ' + F.n(a2, 1) + ' cm&sup2;',
            pregunta: 'Calcula ' + a1 + ' &times; ' + F.n(f2 / f1, 0) + ' (1 decimal)',
            resp: R.numero(a2, { dec: 1, tol: 0.5, unidad: 'cm&sup2;' }),
            pista: 'Multiplicacion directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: comprobar',
            queHacemos: 'Verificamos que las dos presiones coinciden.',
            paraQue: 'F<sub>1</sub>/A<sub>1</sub> tiene que dar lo mismo que F<sub>2</sub>/A<sub>2</sub>. Si no coinciden, algo se despejo al reves.',
            queda: 'las dos presiones dan ' + F.n(f1 / a1, 2),
            pregunta: 'Calcula ' + F.n(f2, 0) + ' &divide; ' + F.n(a2, 1) + ' (2 decimales)',
            resp: R.numero(f2 / a2, { dec: 2, tol: 0.05 }),
            pista: 'Tiene que dar lo mismo que ' + f1 + '/' + a1 + '.',
            despues: 'Coincide con ' + f1 + '/' + a1 + ' = ' + F.n(f1 / a1, 2) + '.'
          }
        ],
        final: 'A<sub>2</sub> = <b>' + F.n(a2, 1) + ' cm&sup2;</b>',
        receta: ['La ventaja que se busca es F<sub>2</sub>/F<sub>1</sub>',
          'La ventaja es igual a A<sub>2</sub>/A<sub>1</sub>',
          'A<sub>2</sub> = A<sub>1</sub> &middot; F<sub>2</sub>/F<sub>1</sub>',
          'Comprobar que las dos presiones coinciden']
      }),
      enunciado: 'Se quiere levantar ' + F.n(f2, 0) + ' N empujando con ' + f1 + ' N sobre un piston de ' +
        a1 + ' cm&sup2;.<br>&iquest;Que area debe tener el otro piston? (1 decimal)',
      respuesta: R.numero(a2, { dec: 1, tol: 0.5, unidad: 'cm&sup2;' }),
      pistas: ['F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub>.',
        'Despejando: A<sub>2</sub> = A<sub>1</sub> &middot; F<sub>2</sub>/F<sub>1</sub>.'],
      solucion: ['La fuerza debe multiplicarse por ' + F.n(f2 / f1, 0),
        'A<sub>2</sub> = ' + a1 + ' &middot; ' + F.n(f2 / f1, 0),
        'A<sub>2</sub> = <b>' + F.n(a2, 1) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'pascal',
    materia: 'fisica',
    grupo: 'Elasticidad y fluidos',
    nombre: 'Principio de Pascal',
    descripcion: 'La presion se transmite igual por todo el fluido: F1/A1 = F2/A2.',
    etiquetas: ['pascal', 'fluidos', 'presion', 'prensa hidraulica'],
    formulario: '<b>Principio de Pascal:</b> la presion aplicada a un fluido encerrado se transmite ' +
      '<b>sin perdidas y por igual</b> a todos sus puntos.<br>' +
      '<b>Presion:</b> P = F/A &nbsp;(1 Pa = 1 N/m&sup2;)<br>' +
      '<b>Prensa hidraulica:</b> F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub><br>' +
      '<small>Despejes: F<sub>2</sub> = F<sub>1</sub>A<sub>2</sub>/A<sub>1</sub> &middot; ' +
      'A<sub>2</sub> = A<sub>1</sub>F<sub>2</sub>/F<sub>1</sub><br>' +
      'Lo que se transmite es la <b>presion</b>, no la fuerza.<br>' +
      'Se gana fuerza pero se pierde recorrido: el piston chico baja mucho mas de lo que sube el grande.<br>' +
      'Si el piston es circular, A = &pi;r&sup2;.</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice el principio'],
          ['presion', 'Calcular una presion'],
          ['donde', 'Donde se usa']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;Que se transmite por igual en un fluido encerrado?', ok: 'La presion', mal: 'La fuerza',
              por: 'la fuerza cambia con el area; lo que se mantiene igual en todos los puntos es la presion' },
            { q: 'Si aprietas un globo lleno de agua por un lado, &iquest;donde sube la presion?',
              ok: 'En todo el globo por igual', mal: 'Solo donde aprietas',
              por: 'el fluido reparte la presion instantaneamente por todo su volumen' },
            { q: 'En una prensa hidraulica, &iquest;por que sale mas fuerza de la que entra?',
              ok: 'Porque la misma presion actua sobre un area mayor', corto: 'misma presion, mas area',
              mal: 'Porque el liquido multiplica la energia',
              por: 'la energia no se multiplica: solo se reparte distinto entre fuerza y recorrido' },
            { q: '&iquest;El principio de Pascal crea energia?', ok: 'No: se gana fuerza pero se pierde recorrido',
              mal: 'Si, multiplica la energia', por: 'el piston chico recorre mucha mas distancia que el grande' }
          ]);
          guiaDelPaso = G({
            intro: 'El <b>principio de Pascal</b> dice que si aprietas un liquido encerrado, esa presion llega ' +
              '<b>igual a todos los rincones</b>, sin perder nada por el camino.<br>' +
              'Parece poca cosa, pero es la base de los frenos del coche y de cualquier gato hidraulico.',
            pasos: [
              {
                seccion: 'Paso 1: que viaja por el liquido',
                queHacemos: 'Distinguimos presion de fuerza.',
                paraQue: 'Lo que se transmite es la <b>presion</b>, no la fuerza. Es la distincion clave de todo el tema, y la que mas se confunde.',
                queda: 'viaja la presion, no la fuerza',
                pregunta: '&iquest;Que se transmite por igual en el fluido?',
                resp: R.opcion(['La presion', 'La fuerza'], 0),
                pista: 'Presion es fuerza por unidad de area: son cosas distintas.',
                despues: ''
              },
              {
                seccion: 'Paso 2: por que sirve de algo',
                queHacemos: 'Vemos que pasa al cambiar el area.',
                paraQue: 'Si la presion es la misma pero el area es mayor, la fuerza que aparece es mayor. Ahi esta el truco de la prensa hidraulica.',
                queda: 'misma P, mas A, mas F',
                pregunta: 'Con la misma presion sobre un area mayor, &iquest;que fuerza aparece?',
                resp: R.opcion(['Mayor', 'La misma'], 0),
                pista: 'F = P&middot;A.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.corto || pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a la diferencia entre presion y fuerza.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['La presion se transmite igual por todo el fluido',
              'Lo que viaja es la presion, no la fuerza',
              'F = P&middot;A: mas area, mas fuerza',
              'No se crea energia: se pierde recorrido']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['Pascal: la presion se transmite igual a todos los puntos del fluido.',
            'Aqui ' + pq.por + '.'];
          sol = ['Lo que se transmite por igual es la presion',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'presion') {
          var fP = r.elige([100, 200, 300, 500, 800]);
          var aP = r.elige([2, 4, 5, 10, 20, 25]);
          var pP = fP / aP;
          guiaDelPaso = G({
            intro: 'Una fuerza de <b>' + fP + ' N</b> se reparte sobre un area de <b>' + aP + ' cm&sup2;</b>.<br>' +
              'Antes de tocar prensas hidraulicas hay que tener claro que es la <b>presion</b>: no es lo mismo ' +
              'que la fuerza.',
            pasos: [
              {
                seccion: 'Paso 1: la definicion',
                queHacemos: 'Recordamos que es la presion.',
                paraQue: 'Presion es fuerza <b>repartida</b> entre el area: P = F/A. La misma fuerza sobre menos area da mas presion.',
                queda: 'P = F/A',
                pregunta: '&iquest;Como se calcula la presion?',
                resp: R.opcion(['Dividiendo la fuerza entre el area', 'Multiplicando la fuerza por el area'], 0),
                pista: 'Por eso un cuchillo afilado corta mejor: menos area, mas presion.',
                despues: ''
              },
              {
                seccion: 'Paso 2: calcular',
                queHacemos: 'Hacemos la division.',
                paraQue: 'Con los datos tal como vienen, el resultado sale en N/cm&sup2;.',
                queda: 'P = ' + F.n(pP, 2) + ' N/cm&sup2;',
                pregunta: 'Calcula ' + fP + ' &divide; ' + aP + ' (2 decimales)',
                resp: R.numero(pP, { dec: 2, tol: 0.05 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: el mismo peso, otra area',
                queHacemos: 'Pensamos que pasaria con el doble de area.',
                paraQue: 'La fuerza seria la misma, pero repartida en mas sitio: la presion caeria a la mitad. Es por lo que las raquetas de nieve funcionan.',
                queda: 'mas area, menos presion',
                pregunta: 'Con el doble de area y la misma fuerza, &iquest;que pasa con la presion?',
                resp: R.opcion(['Se reduce a la mitad', 'Se duplica'], 0),
                pista: 'El area esta dividiendo.',
                despues: ''
              }
            ],
            final: 'P = <b>' + F.n(pP, 2) + ' N/cm&sup2;</b>',
            receta: ['P = F/A',
              'Misma fuerza y menos area: mas presion',
              'Misma fuerza y mas area: menos presion',
              'En el sistema internacional, 1 Pa = 1 N/m&sup2;']
          });
          enun = 'Una fuerza de ' + fP + ' N se reparte sobre ' + aP + ' cm&sup2;.<br>' +
            '&iquest;Que presion ejerce, en N/cm&sup2;? (2 decimales)';
          resp = R.numero(pP, { dec: 2, tol: 0.05 });
          pistas = ['La presion es P = F/A.',
            'Con F en newtons y A en cm&sup2;, el resultado sale en N/cm&sup2;.'];
          sol = ['P = F/A',
            'P = ' + fP + '/' + aP,
            'P = <b>' + F.n(pP, 2) + ' N/cm&sup2;</b>'];

        } else {
          var cd = r.elige([
            { q: 'Los frenos de un coche.', ok: 'Usan Pascal: el pedal manda presion a las cuatro ruedas',
              corto: 'si: presion a las ruedas', mal: 'No tienen nada que ver con Pascal',
              por: 'el liquido de frenos lleva la presion del pedal hasta cada rueda sin perderla' },
            { q: 'Un gato hidraulico que levanta un coche con una palanca pequena.',
              ok: 'Usa Pascal: multiplica la fuerza por la proporcion de areas', corto: 'si: multiplica la fuerza',
              mal: 'Funciona por magnetismo', por: 'es exactamente una prensa hidraulica' },
            { q: 'Una silla de dentista que sube al pisar un pedal.', ok: 'Usa Pascal: es un sistema hidraulico',
              corto: 'si: sistema hidraulico', mal: 'Usa la ley de Hooke',
              por: 'el pedal empuja un liquido que levanta un piston grande' },
            { q: 'Un resorte que se estira al colgarle un peso.', ok: 'No usa Pascal: es la ley de Hooke',
              corto: 'no: es Hooke', mal: 'Usa Pascal', por: 'ahi no hay ningun fluido transmitiendo presion' }
          ]);
          guiaDelPaso = G({
            intro: 'El principio de Pascal no es teoria de museo: lo usas cada vez que frenas un coche.<br>' +
              'Conviene reconocerlo cuando aparece, y tambien cuando <b>no</b> aparece.',
            pasos: [
              {
                seccion: 'Paso 1: la senal que delata',
                queHacemos: 'Buscamos el ingrediente clave.',
                paraQue: 'Para que haya Pascal tiene que haber un <b>fluido encerrado</b> transmitiendo presion de un sitio a otro. Sin fluido, no es Pascal.',
                queda: 'hace falta un fluido encerrado',
                pregunta: '&iquest;Que tiene que haber para aplicar Pascal?',
                resp: R.opcion(['Un fluido encerrado que transmita la presion', 'Un resorte'], 0),
                pista: 'Hidraulico quiere decir movido por liquido.',
                despues: ''
              },
              {
                seccion: 'Paso 2: para que se usa',
                queHacemos: 'Vemos que se gana con ello.',
                paraQue: 'Sirve para llevar fuerza a distancia (frenos) o para multiplicarla (gatos y prensas). Casi todo lo que lleva "hidraulico" en el nombre.',
                queda: 'llevar o multiplicar fuerza',
                pregunta: '&iquest;Para que sirve un sistema hidraulico?',
                resp: R.opcion(['Para transmitir o multiplicar fuerza', 'Para generar energia'], 0),
                pista: 'La energia no se crea.',
                despues: ''
              },
              {
                seccion: 'Paso 3: juzgar el caso',
                queHacemos: 'Decidimos si aplica.',
                paraQue: 'Aqui ' + cd.por + '.',
                queda: cd.corto || cd.ok,
                pregunta: cd.q + '<br>&iquest;Usa el principio de Pascal?',
                resp: R.opcion([cd.ok, cd.mal], 0),
                pista: 'Busca si hay un liquido encerrado de por medio.',
                despues: ''
              }
            ],
            final: '<b>' + cd.ok + '</b>',
            receta: ['Pascal necesita un fluido encerrado',
              'Sirve para transmitir o multiplicar fuerza',
              'Frenos, gatos, prensas, sillas de dentista',
              'Si no hay fluido, es otra ley']
          });
          enun = cd.q + '<br>&iquest;Usa el principio de Pascal?';
          resp = R.opcion([cd.ok, cd.mal], 0);
          pistas = ['Pascal necesita un fluido encerrado que transmita la presion.',
            'Aqui ' + cd.por + '.'];
          sol = ['El principio de Pascal aparece donde hay un fluido encerrado',
            'Aqui ' + cd.por,
            'Respuesta: <b>' + cd.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['prensa', 'Prensa hidraulica'],
          ['area', 'Hallar el area necesaria'],
          ['coche', 'Levantar un coche']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var masa = r.elige([800, 1000, 1200, 1500]);
        var aChico = r.elige([5, 10, 20]);
        var aGrande = r.elige([500, 800, 1000, 1200]);
        var pesoCoche = masa * g;
        var fNec = pesoCoche * aChico / aGrande;
        guiaDelPaso = G({
          intro: 'Un gato hidraulico tiene un piston de <b>' + aChico + ' cm&sup2;</b> y otro de ' +
            '<b>' + aGrande + ' cm&sup2;</b>. Encima del grande hay un coche de <b>' + masa + ' kg</b>.<br>' +
            'La pregunta es con cuanta fuerza hay que empujar el piston chico. Pero ojo: el enunciado da una ' +
            '<b>masa</b>, no una fuerza.',
          pasos: [
            {
              seccion: 'Paso 1: el peso del coche',
              queHacemos: 'Convertimos la masa en fuerza.',
              paraQue: 'Lo que el gato tiene que vencer es el PESO, en newtons: peso = mg, con g = 9.8 m/s&sup2;.',
              queda: 'peso = ' + F.n(pesoCoche, 0) + ' N',
              pregunta: 'Calcula ' + masa + ' &times; 9.8 (0 decimales)',
              resp: R.numero(pesoCoche, { dec: 0, tol: 2, unidad: 'N' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 2: la relacion de areas',
              queHacemos: 'Vemos cuanto multiplica el gato.',
              paraQue: 'El piston grande es ' + F.n(aGrande / aChico, 0) + ' veces mas ancho, asi que multiplica la fuerza por ese mismo numero.',
              queda: 'multiplica por ' + F.n(aGrande / aChico, 0),
              pregunta: 'Calcula ' + aGrande + ' &divide; ' + aChico + ' (0 decimales)',
              resp: R.numero(aGrande / aChico, { dec: 0, tol: 0.5 }),
              pista: 'Divide el area grande entre la chica.',
              despues: ''
            },
            {
              seccion: 'Paso 3: la fuerza necesaria',
              queHacemos: 'Dividimos el peso entre esa ventaja.',
              paraQue: 'Si el gato multiplica por ' + F.n(aGrande / aChico, 0) + ', basta con empujar ' + F.n(aGrande / aChico, 0) + ' veces menos.',
              queda: 'F<sub>1</sub> = ' + F.n(fNec, 1) + ' N',
              pregunta: 'Calcula ' + F.n(pesoCoche, 0) + ' &divide; ' + F.n(aGrande / aChico, 0) + ' (1 decimal)',
              resp: R.numero(fNec, { dec: 1, tol: 0.6, unidad: 'N' }),
              pista: 'Division directa.',
              despues: ''
            },
            {
              seccion: 'Paso 4: hacerse una idea',
              queHacemos: 'Traducimos esa fuerza a algo familiar.',
              paraQue: 'Son unos ' + F.n(fNec / g, 1) + ' kg de empuje: lo que pesa una maleta. Por eso una persona puede levantar un coche con un gato.',
              queda: 'como empujar ' + F.n(fNec / g, 1) + ' kg',
              pregunta: 'Calcula ' + F.n(fNec, 1) + ' &divide; 9.8 (1 decimal)',
              resp: R.numero(fNec / g, { dec: 1, tol: 0.2, unidad: 'kg' }),
              pista: 'Divide entre 9.8 para volver a kilogramos.',
              despues: ''
            },
            {
              seccion: 'Paso 5: el precio',
              queHacemos: 'Miramos lo que cuesta esa comodidad.',
              paraQue: 'Para subir el coche 1 cm, el piston chico tiene que bajar ' + F.n(aGrande / aChico, 0) + ' cm. Por eso hay que bombear la palanca tantas veces.',
              queda: F.n(aGrande / aChico, 0) + ' cm de bombeo por cada cm de coche',
              pregunta: '&iquest;Por que hay que bombear tantas veces la palanca?',
              resp: R.opcion(['Porque el piston chico recorre mucha mas distancia', 'Porque el liquido se escapa'], 0),
              pista: 'La energia que entra es la que sale.',
              despues: ''
            }
          ],
          final: 'Hay que empujar con <b>' + F.n(fNec, 1) + ' N</b>',
          receta: ['Pasar la masa a peso: F = mg',
            'La ventaja es A<sub>2</sub>/A<sub>1</sub>',
            'F<sub>1</sub> = peso &divide; ventaja',
            'A cambio, el piston chico recorre esa misma proporcion de mas']
        });
        enun = 'Un gato hidraulico tiene pistones de ' + aChico + ' cm&sup2; y ' + aGrande + ' cm&sup2;. ' +
          'Sobre el grande hay un coche de ' + masa + ' kg.<br>' +
          '&iquest;Con que fuerza hay que empujar el piston chico? (1 decimal)<br><small>g = 9.8 m/s&sup2;</small>';
        resp = R.numero(fNec, { dec: 1, tol: 0.6, unidad: 'N' });
        pistas = ['Primero el peso del coche: F = mg = ' + masa + ' &middot; 9.8.',
          'Luego F<sub>1</sub> = F<sub>2</sub> &middot; A<sub>1</sub>/A<sub>2</sub>.'];
        sol = ['Peso = ' + masa + ' &middot; 9.8 = ' + F.n(pesoCoche, 0) + ' N',
          'F<sub>1</sub> = ' + F.n(pesoCoche, 0) + ' &middot; ' + aChico + '/' + aGrande,
          'F<sub>1</sub> = <b>' + F.n(fNec, 1) + ' N</b>'];

      } else {
        var t3 = r.subtema([
          ['radios', 'Pistones circulares'],
          ['recorrido', 'Cuanto baja el piston chico'],
          ['prensa', 'Prensa hidraulica']
        ]);
        if (t3 === 'prensa') return extra.prensa(r, dif);

        if (t3 === 'radios') {
          var r1 = r.elige([1, 2, 3]);
          var r2 = r1 * r.elige([3, 4, 5, 6]);
          var fR = r.elige([100, 150, 200, 300]);
          var A1 = Math.PI * r1 * r1;
          var A2 = Math.PI * r2 * r2;
          var fSal = fR * A2 / A1;
          guiaDelPaso = G({
            intro: 'Una prensa tiene pistones <b>circulares</b> de radio <b>' + r1 + ' cm</b> y <b>' + r2 + ' cm</b>. ' +
              'Se empuja el chico con <b>' + fR + ' N</b>.<br>' +
              'Aqui hay una trampa clasica: el radio es ' + F.n(r2 / r1, 0) + ' veces mayor, pero la fuerza ' +
              '<b>no</b> se multiplica por ' + F.n(r2 / r1, 0) + '.',
            pasos: [
              {
                seccion: 'Paso 1: lo que manda es el area',
                queHacemos: 'Recordamos de que depende la ventaja.',
                paraQue: 'La prensa multiplica segun la proporcion de <b>areas</b>, no de radios. Y el area de un circulo va con el radio al cuadrado.',
                queda: 'A = &pi;r&sup2;',
                pregunta: '&iquest;Con que crece la ventaja de la prensa?',
                resp: R.opcion(['Con la proporcion de areas', 'Con la proporcion de radios'], 0),
                pista: 'F = P&middot;A: lo que aparece en la formula es el area.',
                despues: ''
              },
              {
                seccion: 'Paso 2: las dos areas',
                queHacemos: 'Aplicamos A = &pi;r&sup2;.',
                paraQue: 'Con r = ' + r1 + ' sale ' + F.n(A1, 2) + ' cm&sup2;, y con r = ' + r2 + ' sale ' + F.n(A2, 2) + ' cm&sup2;.',
                queda: F.n(A1, 2) + ' y ' + F.n(A2, 2) + ' cm&sup2;',
                pregunta: 'Calcula el area del piston grande: &pi; &times; ' + r2 + '&sup2; (2 decimales)',
                resp: R.numero(A2, { dec: 2, tol: 0.1, unidad: 'cm&sup2;' }),
                pista: 'Eleva el radio al cuadrado y multiplica por &pi;.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la ventaja real',
                queHacemos: 'Dividimos las dos areas.',
                paraQue: 'Sale ' + F.n(A2 / A1, 0) + ', que es ' + F.n(r2 / r1, 0) + ' al cuadrado. El &pi; se cancela: solo importa la proporcion de radios, elevada al cuadrado.',
                queda: 'ventaja = ' + F.n(A2 / A1, 0) + ', no ' + F.n(r2 / r1, 0),
                pregunta: 'Calcula ' + F.n(A2, 2) + ' &divide; ' + F.n(A1, 2) + ' (0 decimales)',
                resp: R.numero(A2 / A1, { dec: 0, tol: 0.6 }),
                pista: 'Es ' + F.n(r2 / r1, 0) + ' al cuadrado.',
                despues: 'Doblar el radio cuadruplica la fuerza.'
              },
              {
                seccion: 'Paso 4: la fuerza de salida',
                queHacemos: 'Multiplicamos por esa ventaja.',
                paraQue: 'F<sub>2</sub> = F<sub>1</sub> &middot; A<sub>2</sub>/A<sub>1</sub>.',
                queda: 'F<sub>2</sub> = ' + F.n(fSal, 0) + ' N',
                pregunta: 'Calcula ' + fR + ' &times; ' + F.n(A2 / A1, 0) + ' (0 decimales)',
                resp: R.numero(fSal, { dec: 0, tol: 3, unidad: 'N' }),
                pista: 'Multiplicacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 5: la moraleja',
                queHacemos: 'Guardamos la regla.',
                paraQue: 'Con pistones circulares, la ventaja va con el <b>cuadrado</b> de la proporcion de radios. Quien use los radios directamente se equivoca por un factor grande.',
                queda: 'ventaja = (r<sub>2</sub>/r<sub>1</sub>)&sup2;',
                pregunta: 'Si el radio fuera el triple, &iquest;cuanto se multiplicaria la fuerza?',
                resp: R.opcion(['Por 9', 'Por 3'], 0),
                pista: 'Tres al cuadrado.',
                despues: ''
              }
            ],
            final: 'F<sub>2</sub> = <b>' + F.n(fSal, 0) + ' N</b>',
            receta: ['Con pistones circulares, A = &pi;r&sup2;',
              'La ventaja es A<sub>2</sub>/A<sub>1</sub> = (r<sub>2</sub>/r<sub>1</sub>)&sup2;',
              'El &pi; se cancela',
              'Doblar el radio cuadruplica la fuerza']
          });
          enun = 'Una prensa tiene pistones circulares de radio ' + r1 + ' cm y ' + r2 + ' cm. Se empuja el chico ' +
            'con ' + fR + ' N.<br>&iquest;Que fuerza sale en el grande? (0 decimales)';
          resp = R.numero(fSal, { dec: 0, tol: 3, unidad: 'N' });
          pistas = ['El area de un circulo es A = &pi;r&sup2;.',
            'La ventaja es (r<sub>2</sub>/r<sub>1</sub>)&sup2;, no r<sub>2</sub>/r<sub>1</sub>.'];
          sol = ['A<sub>1</sub> = &pi;&middot;' + r1 + '&sup2; = ' + F.n(A1, 2) + ', A<sub>2</sub> = &pi;&middot;' + r2 + '&sup2; = ' + F.n(A2, 2) + ' cm&sup2;',
            'Ventaja = ' + F.n(A2 / A1, 0) + ' = (' + r2 + '/' + r1 + ')&sup2;',
            'F<sub>2</sub> = ' + fR + ' &middot; ' + F.n(A2 / A1, 0) + ' = <b>' + F.n(fSal, 0) + ' N</b>'];

        } else {
          var aCh = r.elige([5, 10, 20]);
          var aGr = aCh * r.elige([10, 20, 25]);
          var subeCm = r.elige([2, 5, 10]);
          var bajaCm = subeCm * aGr / aCh;
          var fEnt = r.elige([100, 200, 250]);
          var fSalR = fEnt * aGr / aCh;
          var trabajo = fEnt * (bajaCm / 100);
          guiaDelPaso = G({
            intro: 'Una prensa con pistones de <b>' + aCh + ' cm&sup2;</b> y <b>' + aGr + ' cm&sup2;</b> tiene que ' +
              'subir la carga <b>' + subeCm + ' cm</b>.<br>' +
              'Ya sabemos que multiplica la fuerza. Ahora toca ver <b>que se paga a cambio</b>, porque la energia ' +
              'no sale de la nada.',
            pasos: [
              {
                seccion: 'Paso 1: el liquido no se comprime',
                queHacemos: 'Pensamos en el volumen que se mueve.',
                paraQue: 'El liquido que sale del cilindro chico es exactamente el que entra en el grande. Ese volumen es area por recorrido, e iguala los dos lados.',
                queda: 'A<sub>1</sub>&middot;d<sub>1</sub> = A<sub>2</sub>&middot;d<sub>2</sub>',
                pregunta: '&iquest;Que se conserva al pasar el liquido de un cilindro a otro?',
                resp: R.opcion(['El volumen', 'La altura'], 0),
                pista: 'Un liquido no se comprime.',
                despues: ''
              },
              {
                seccion: 'Paso 2: cuanto baja el chico',
                queHacemos: 'Despejamos el recorrido del piston chico.',
                paraQue: 'd<sub>1</sub> = d<sub>2</sub> &middot; A<sub>2</sub>/A<sub>1</sub>. Como el grande es ' + F.n(aGr / aCh, 0) + ' veces mas ancho, el chico recorre ' + F.n(aGr / aCh, 0) + ' veces mas.',
                queda: 'd<sub>1</sub> = ' + F.n(bajaCm, 0) + ' cm',
                pregunta: 'Calcula ' + subeCm + ' &times; ' + F.n(aGr / aCh, 0) + ' (0 decimales)',
                resp: R.numero(bajaCm, { dec: 0, tol: 1, unidad: 'cm' }),
                pista: 'Multiplica por la proporcion de areas.',
                despues: F.n(bajaCm, 0) + ' cm es mucho: por eso se bombea en varias pasadas.'
              },
              {
                seccion: 'Paso 3: el trabajo que entra',
                queHacemos: 'Multiplicamos fuerza por recorrido.',
                paraQue: 'Trabajo = F &middot; d, con la distancia en metros. Es la energia que pones tu.',
                queda: 'W = ' + F.n(trabajo, 1) + ' J',
                pregunta: 'Calcula ' + fEnt + ' &times; ' + F.n(bajaCm / 100, 2) + ' (1 decimal)',
                resp: R.numero(trabajo, { dec: 1, tol: 0.5, unidad: 'J' }),
                pista: 'Pasa los centimetros a metros antes de multiplicar.',
                despues: ''
              },
              {
                seccion: 'Paso 4: el trabajo que sale',
                queHacemos: 'Repetimos del lado grande.',
                paraQue: 'La fuerza es ' + F.n(aGr / aCh, 0) + ' veces mayor pero el recorrido es ' + F.n(aGr / aCh, 0) + ' veces menor, asi que el producto da exactamente lo mismo.',
                queda: 'entra y sale el mismo trabajo',
                pregunta: 'Calcula ' + F.n(fSalR, 0) + ' &times; ' + F.n(subeCm / 100, 2) + ' (1 decimal)',
                resp: R.numero(trabajo, { dec: 1, tol: 0.5, unidad: 'J' }),
                pista: 'Tiene que dar lo mismo que el paso anterior.',
                despues: 'Los dos dan ' + F.n(trabajo, 1) + ' J.'
              },
              {
                seccion: 'Paso 5: que multiplica de verdad',
                queHacemos: 'Cerramos la idea.',
                paraQue: 'La prensa multiplica la FUERZA, no la energia. Lo que gana en fuerza lo paga en recorrido, y el trabajo total queda igual. Ninguna maquina hace mas.',
                queda: 'multiplica fuerza, no energia',
                pregunta: '&iquest;Que multiplica realmente una prensa hidraulica?',
                resp: R.opcion(['La fuerza, a costa del recorrido', 'La energia'], 0),
                pista: 'Los dos trabajos dieron el mismo numero.',
                despues: ''
              }
            ],
            final: 'El piston chico tiene que bajar <b>' + F.n(bajaCm, 0) + ' cm</b>',
            receta: ['El volumen de liquido se conserva: A<sub>1</sub>d<sub>1</sub> = A<sub>2</sub>d<sub>2</sub>',
              'd<sub>1</sub> = d<sub>2</sub> &middot; A<sub>2</sub>/A<sub>1</sub>',
              'El trabajo que entra es el que sale',
              'Se multiplica la fuerza, nunca la energia']
          });
          enun = 'Una prensa con pistones de ' + aCh + ' cm&sup2; y ' + aGr + ' cm&sup2; debe subir la carga ' +
            subeCm + ' cm.<br>&iquest;Cuanto tiene que bajar el piston chico? (0 decimales)';
          resp = R.numero(bajaCm, { dec: 0, tol: 1, unidad: 'cm' });
          pistas = ['El volumen de liquido se conserva: A<sub>1</sub>d<sub>1</sub> = A<sub>2</sub>d<sub>2</sub>.',
            'El piston chico recorre tantas veces mas como veces menor es su area.'];
          sol = ['A<sub>1</sub>d<sub>1</sub> = A<sub>2</sub>d<sub>2</sub>',
            'd<sub>1</sub> = ' + subeCm + ' &middot; ' + aGr + '/' + aCh,
            'd<sub>1</sub> = <b>' + F.n(bajaCm, 0) + ' cm</b>'];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
