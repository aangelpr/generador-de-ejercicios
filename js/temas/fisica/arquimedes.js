/* Principio de Arquimedes: empuje = peso del fluido desplazado. */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;
  var G = EJ.guia.armar;
  var g = 9.8;

  var extra = {};

  /* ---------------- calcular el empuje ---------------- */
  extra.empuje = function (r) {
    var vcm = r.elige([100, 200, 250, 500, 1000]);
    var v = vcm / 1000000;                 /* cm3 a m3 */
    var dens = r.elige([1000, 1000, 800, 1030, 13600]);
    var nombre = dens === 1000 ? 'agua' : dens === 800 ? 'aceite' : dens === 1030 ? 'agua de mar' : 'mercurio';
    var e = dens * v * g;
    return {
      guia: G({
        intro: 'Un objeto de <b>' + vcm + ' cm&sup3;</b> se sumerge por completo en <b>' + nombre + '</b> ' +
          '(densidad ' + dens + ' kg/m&sup3;).<br>' +
          'El <b>empuje</b> es el peso del fluido que el objeto aparta: <b>E = &rho;Vg</b>. ' +
          'Fijate en que no aparece de que esta hecho el objeto.',
        pasos: [
          {
            seccion: 'Paso 1: pasar el volumen a m&sup3;',
            queHacemos: 'Convertimos los centimetros cubicos.',
            paraQue: 'La densidad viene en kg/m&sup3;, asi que el volumen tiene que ir en m&sup3;. Un m&sup3; son un millon de cm&sup3;: el factor es enorme y equivocarse aqui arruina todo.',
            queda: 'V = ' + F.n(v, 6) + ' m&sup3;',
            pregunta: 'Convierte ' + vcm + ' cm&sup3; a m&sup3; (6 decimales)',
            resp: R.numero(v, { dec: 6, tol: 0.0000005, unidad: 'm&sup3;' }),
            pista: 'Divide entre 1 000 000.',
            despues: ''
          },
          {
            seccion: 'Paso 2: la masa desplazada',
            queHacemos: 'Multiplicamos densidad por volumen.',
            paraQue: 'Eso da los kilogramos de ' + nombre + ' que el objeto aparto al meterse.',
            queda: 'masa desplazada = ' + F.n(dens * v, 4) + ' kg',
            pregunta: 'Calcula ' + dens + ' &times; ' + F.n(v, 6) + ' (4 decimales)',
            resp: R.numero(dens * v, { dec: 4, tol: 0.0008, unidad: 'kg' }),
            pista: 'Multiplicacion directa.',
            despues: ''
          },
          {
            seccion: 'Paso 3: convertirlo en fuerza',
            queHacemos: 'Multiplicamos por g.',
            paraQue: 'El empuje es el PESO de ese fluido, no su masa. Por eso hace falta el 9.8.',
            queda: 'E = ' + F.n(e, 3) + ' N',
            pregunta: 'Calcula ' + F.n(dens * v, 4) + ' &times; 9.8 (3 decimales)',
            resp: R.numero(e, { dec: 3, tol: 0.008, unidad: 'N' }),
            pista: 'Multiplicacion directa.',
            despues: ''
          },
          {
            seccion: 'Paso 4: de que no depende',
            queHacemos: 'Miramos que datos NO usamos.',
            paraQue: 'No hizo falta saber de que material es el objeto. Una bola de plomo y una de corcho del mismo tamano reciben el mismo empuje; lo que cambia es su peso.',
            queda: 'E = ' + F.n(e, 3) + ' N, sea de lo que sea',
            pregunta: '&iquest;De que depende el empuje?',
            resp: R.opcion(['Del volumen sumergido y del fluido', 'Del material del objeto'], 0),
            pista: 'Mira la formula: E = &rho;Vg, y esa &rho; es la del FLUIDO.',
            despues: ''
          }
        ],
        final: 'E = <b>' + F.n(e, 3) + ' N</b>',
        receta: ['E = &rho;Vg, con &rho; la del FLUIDO',
          'Pasar el volumen a m&sup3;: dividir entre 1 000 000',
          'Multiplicar por g para pasar de masa a peso',
          'El empuje no depende del material del objeto']
      }),
      enunciado: 'Un objeto de ' + vcm + ' cm&sup3; se sumerge por completo en ' + nombre +
        ' (&rho; = ' + dens + ' kg/m&sup3;).<br>&iquest;Que empuje recibe? (3 decimales)<br>' +
        '<small>g = 9.8 m/s&sup2;</small>',
      respuesta: R.numero(e, { dec: 3, tol: 0.008, unidad: 'N' }),
      pistas: ['El empuje es E = &rho;Vg, con la densidad del fluido.',
        vcm + ' cm&sup3; son ' + F.n(v, 6) + ' m&sup3;.'],
      solucion: ['V = ' + F.n(v, 6) + ' m&sup3;',
        'E = ' + dens + ' &middot; ' + F.n(v, 6) + ' &middot; 9.8',
        'E = <b>' + F.n(e, 3) + ' N</b>']
    };
  };

  /* ---------------- peso aparente ---------------- */
  extra.aparente = function (r) {
    var m = r.elige([2, 3, 5, 8, 10]);
    var densObj = r.elige([2700, 7800, 8900, 11300]);
    var mat = densObj === 2700 ? 'aluminio' : densObj === 7800 ? 'hierro' : densObj === 8900 ? 'cobre' : 'plomo';
    var v = m / densObj;
    var peso = m * g;
    var e = 1000 * v * g;
    var ap = peso - e;
    return {
      guia: G({
        intro: 'Un bloque de <b>' + mat + '</b> de <b>' + m + ' kg</b> (densidad ' + densObj + ' kg/m&sup3;) se sumerge ' +
          'en agua.<br>' +
          'Dentro del agua parece pesar menos. Ese <b>peso aparente</b> es el peso real menos el empuje.',
        pasos: [
          {
            seccion: 'Paso 1: el peso real',
            queHacemos: 'Multiplicamos la masa por g.',
            paraQue: 'Es lo que marcaria la balanza fuera del agua.',
            queda: 'peso = ' + F.n(peso, 2) + ' N',
            pregunta: 'Calcula ' + m + ' &times; 9.8 (2 decimales)',
            resp: R.numero(peso, { dec: 2, tol: 0.05, unidad: 'N' }),
            pista: 'Multiplicacion directa.',
            despues: ''
          },
          {
            seccion: 'Paso 2: el volumen del bloque',
            queHacemos: 'Dividimos masa entre densidad.',
            paraQue: 'Necesitamos el volumen para saber cuanta agua aparta. V = m/&rho;, con la densidad del ' + mat + '.',
            queda: 'V = ' + F.n(v, 6) + ' m&sup3;',
            pregunta: 'Calcula ' + m + ' &divide; ' + densObj + ' (6 decimales)',
            resp: R.numero(v, { dec: 6, tol: 0.0000008, unidad: 'm&sup3;' }),
            pista: 'Division directa.',
            despues: 'Ahora si, esta es la densidad del objeto. La del agua viene despues.'
          },
          {
            seccion: 'Paso 3: el empuje',
            queHacemos: 'Aplicamos E = &rho;Vg con el agua.',
            paraQue: 'Aqui la densidad que entra es la del <b>agua</b> (1000), no la del ' + mat + '. Confundirlas es el error tipico.',
            queda: 'E = ' + F.n(e, 3) + ' N',
            pregunta: 'Calcula 1000 &times; ' + F.n(v, 6) + ' &times; 9.8 (3 decimales)',
            resp: R.numero(e, { dec: 3, tol: 0.008, unidad: 'N' }),
            pista: 'Usa 1000 kg/m&sup3;, la del agua.',
            despues: ''
          },
          {
            seccion: 'Paso 4: el peso aparente',
            queHacemos: 'Restamos el empuje al peso.',
            paraQue: 'El agua empuja hacia arriba, asi que la balanza marca menos: peso aparente = peso &minus; empuje.',
            queda: 'aparente = ' + F.n(ap, 2) + ' N',
            pregunta: 'Calcula ' + F.n(peso, 2) + ' &minus; ' + F.n(e, 3) + ' (2 decimales)',
            resp: R.numero(ap, { dec: 2, tol: 0.05, unidad: 'N' }),
            pista: 'Resta directa.',
            despues: ''
          },
          {
            seccion: 'Paso 5: por que se hunde igual',
            queHacemos: 'Comparamos peso y empuje.',
            paraQue: 'El peso sigue siendo mayor que el empuje, asi que el bloque se hunde. Pesa menos, pero no lo suficiente para flotar.',
            queda: 'pesa menos, pero se hunde',
            pregunta: '&iquest;Por que el bloque se hunde a pesar del empuje?',
            resp: R.opcion(['Porque su peso sigue siendo mayor que el empuje', 'Porque el empuje no actua hacia arriba'], 0),
            pista: 'Compara ' + F.n(peso, 2) + ' con ' + F.n(e, 3) + '.',
            despues: ''
          }
        ],
        final: 'Peso aparente = <b>' + F.n(ap, 2) + ' N</b>',
        receta: ['Peso real = mg',
          'Volumen del objeto = m/&rho;<sub>objeto</sub>',
          'Empuje = &rho;<sub>fluido</sub>Vg (ojo: la del FLUIDO)',
          'Peso aparente = peso &minus; empuje']
      }),
      enunciado: 'Un bloque de ' + mat + ' de ' + m + ' kg (&rho; = ' + densObj + ' kg/m&sup3;) se sumerge en agua ' +
        '(&rho; = 1000 kg/m&sup3;).<br>&iquest;Cual es su peso aparente? (2 decimales)<br>' +
        '<small>g = 9.8 m/s&sup2;</small>',
      respuesta: R.numero(ap, { dec: 2, tol: 0.05, unidad: 'N' }),
      pistas: ['Peso aparente = peso real &minus; empuje.',
        'Para el empuje hace falta el volumen: V = m/&rho;<sub>objeto</sub>.'],
      solucion: ['Peso = ' + m + ' &middot; 9.8 = ' + F.n(peso, 2) + ' N',
        'V = ' + m + '/' + densObj + ' = ' + F.n(v, 6) + ' m&sup3;, E = 1000&middot;V&middot;9.8 = ' + F.n(e, 3) + ' N',
        'Aparente = <b>' + F.n(ap, 2) + ' N</b>']
    };
  };

  EJ.tema({
    id: 'arquimedes',
    materia: 'fisica',
    grupo: 'Elasticidad y fluidos',
    nombre: 'Principio de Arquimedes',
    descripcion: 'Todo cuerpo sumergido recibe un empuje igual al peso del fluido que desplaza.',
    etiquetas: ['arquimedes', 'fluidos', 'empuje', 'flotacion', 'densidad'],
    formulario: '<b>Principio de Arquimedes:</b> todo cuerpo sumergido recibe un empuje hacia arriba igual al ' +
      '<b>peso del fluido que desplaza</b>.<br>' +
      '<b>Empuje:</b> E = &rho;<sub>fluido</sub> &middot; V<sub>sumergido</sub> &middot; g &nbsp;(N)<br>' +
      '<b>Peso aparente:</b> P<sub>ap</sub> = P &minus; E<br>' +
      '<small>La &rho; de la formula es la del <b>fluido</b>, no la del objeto.<br>' +
      'Flota si &rho;<sub>objeto</sub> &lt; &rho;<sub>fluido</sub>; se hunde si es mayor.<br>' +
      'Flotando: fraccion sumergida = &rho;<sub>objeto</sub> / &rho;<sub>fluido</sub><br>' +
      'Agua: 1000 kg/m&sup3; &middot; 1 m&sup3; = 1 000 000 cm&sup3; &middot; g = 9.8 m/s&sup2;</small>',

    generar: function (dif, r) {
      var guiaDelPaso = null;
      var enun, resp, pistas, sol;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['queDice', 'Que dice el principio'],
          ['flota', 'Flota o se hunde'],
          ['sentido', 'Por que parece pesar menos']
        ]);

        if (tf === 'queDice') {
          var pq = r.elige([
            { q: '&iquest;A que es igual el empuje que recibe un cuerpo sumergido?',
              ok: 'Al peso del fluido que desplaza', mal: 'Al peso del propio cuerpo',
              por: 'si fuera su propio peso, todo flotaria siempre' },
            { q: 'Dos bolas del mismo tamano, una de plomo y otra de corcho, sumergidas en agua.',
              ok: 'Reciben el mismo empuje', mal: 'La de plomo recibe mas empuje',
              por: 'el empuje depende del volumen desplazado, no del material' },
            { q: '&iquest;Hacia donde apunta el empuje?', ok: 'Hacia arriba, siempre',
              mal: 'Hacia donde se mueva el objeto', por: 'es el fluido de abajo el que empuja al de arriba' },
            { q: 'Si sumerges un objeto a mas profundidad sin cambiar nada mas, &iquest;cambia el empuje?',
              ok: 'No: mientras siga totalmente sumergido, es el mismo', corto: 'no: el mismo empuje',
              mal: 'Si, aumenta con la profundidad',
              por: 'lo que cuenta es el volumen desplazado, y ese no cambia al bajar' }
          ]);
          guiaDelPaso = G({
            intro: 'El <b>principio de Arquimedes</b> explica por que un barco de acero flota y una moneda no.<br>' +
              'La idea es que al meterte en el agua <b>apartas</b> una cantidad de agua, y esa agua te devuelve ' +
              'el empujon.',
            pasos: [
              {
                seccion: 'Paso 1: de donde sale el empuje',
                queHacemos: 'Pensamos en el agua que se aparta.',
                paraQue: 'Al meter un objeto, un volumen de agua tiene que irse a otro sitio. El empuje que recibe el objeto es exactamente el peso de esa agua apartada.',
                queda: 'empuje = peso del fluido desplazado',
                pregunta: '&iquest;A que es igual el empuje?',
                resp: R.opcion(['Al peso del fluido desplazado', 'Al peso del objeto'], 0),
                pista: 'Por eso hay que pensar en cuanta agua se aparta.',
                despues: ''
              },
              {
                seccion: 'Paso 2: de que depende',
                queHacemos: 'Miramos que entra en la formula.',
                paraQue: 'E = &rho;Vg lleva el volumen sumergido y la densidad del FLUIDO. El material del objeto no aparece por ningun lado.',
                queda: 'E = &rho;Vg, con &rho; del fluido',
                pregunta: '&iquest;Que densidad entra en la formula del empuje?',
                resp: R.opcion(['La del fluido', 'La del objeto'], 0),
                pista: 'Es el fluido el que empuja.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + pq.por + '.',
                queda: pq.corto || pq.ok,
                pregunta: pq.q,
                resp: R.opcion([pq.ok, pq.mal], 0),
                pista: 'Vuelve a E = &rho;Vg y mira que aparece y que no.',
                despues: ''
              }
            ],
            final: '<b>' + pq.ok + '</b>',
            receta: ['El empuje es el peso del fluido desplazado',
              'E = &rho;Vg, con la densidad del FLUIDO',
              'Apunta siempre hacia arriba',
              'No depende del material ni de la profundidad']
          });
          enun = pq.q;
          resp = R.opcion([pq.ok, pq.mal], 0);
          pistas = ['El empuje es igual al peso del fluido desplazado: E = &rho;Vg.',
            'Aqui ' + pq.por + '.'];
          sol = ['Arquimedes: el empuje iguala al peso del fluido desplazado',
            'Aqui ' + pq.por,
            'Respuesta: <b>' + pq.ok + '</b>'];

        } else if (tf === 'flota') {
          var cuerpo = r.elige([
            { n: 'madera de pino', d: 500 }, { n: 'hielo', d: 917 }, { n: 'corcho', d: 240 },
            { n: 'aluminio', d: 2700 }, { n: 'hierro', d: 7800 }, { n: 'plomo', d: 11300 },
            { n: 'aceite', d: 920 }, { n: 'hueso', d: 1800 }
          ]);
          var flota = cuerpo.d < 1000;
          guiaDelPaso = G({
            intro: 'Un trozo de <b>' + cuerpo.n + '</b> (densidad ' + cuerpo.d + ' kg/m&sup3;) se echa al agua ' +
              '(1000 kg/m&sup3;).<br>' +
              'Para saber si flota no hace falta calcular nada: basta con <b>comparar densidades</b>.',
            pasos: [
              {
                seccion: 'Paso 1: la regla',
                queHacemos: 'Recordamos el criterio.',
                paraQue: 'Si el objeto es menos denso que el fluido, flota. Si es mas denso, se hunde. El tamano no importa: un tronco enorme flota igual que una astilla.',
                queda: 'menos denso, flota',
                pregunta: '&iquest;Cuando flota un objeto?',
                resp: R.opcion(['Cuando es menos denso que el fluido', 'Cuando pesa poco'], 0),
                pista: 'Un barco pesa toneladas y flota.',
                despues: ''
              },
              {
                seccion: 'Paso 2: comparar',
                queHacemos: 'Ponemos los dos numeros juntos.',
                paraQue: cuerpo.d + ' frente a 1000: ' + (flota ? 'el ' + cuerpo.n + ' es menos denso' : 'el ' + cuerpo.n + ' es mas denso') + '.',
                queda: cuerpo.d + ' vs 1000',
                pregunta: '&iquest;Es ' + cuerpo.d + ' mayor o menor que 1000?',
                resp: R.opcion(flota ? ['Menor', 'Mayor'] : ['Mayor', 'Menor'], 0),
                pista: 'Comparacion directa.',
                despues: ''
              },
              {
                seccion: 'Paso 3: concluir',
                queHacemos: 'Aplicamos la regla.',
                paraQue: flota
                  ? 'Al ser menos denso, el empuje llega a igualar su peso antes de que se hunda del todo. Se queda flotando con una parte fuera.'
                  : 'Al ser mas denso, ni sumergido del todo el empuje alcanza a igualar su peso. Se va al fondo.',
                queda: 'el ' + cuerpo.n + ' ' + (flota ? 'flota' : 'se hunde'),
                pregunta: '&iquest;Flota o se hunde?',
                resp: R.opcion(flota ? ['Flota', 'Se hunde'] : ['Se hunde', 'Flota'], 0),
                pista: 'Menos denso flota; mas denso se hunde.',
                despues: ''
              }
            ],
            final: 'El ' + cuerpo.n + ' <b>' + (flota ? 'flota' : 'se hunde') + '</b>',
            receta: ['Comparar la densidad del objeto con la del fluido',
              'Menos denso: flota',
              'Mas denso: se hunde',
              'El tamano y el peso total no importan']
          });
          enun = 'Un trozo de ' + cuerpo.n + ' (&rho; = ' + cuerpo.d + ' kg/m&sup3;) se echa al agua ' +
            '(&rho; = 1000 kg/m&sup3;).<br>&iquest;Flota o se hunde?';
          resp = R.opcion(flota ? ['Flota', 'Se hunde'] : ['Se hunde', 'Flota'], 0);
          pistas = ['Compara las dos densidades.',
            'Menos denso que el agua: flota. Mas denso: se hunde.'];
          sol = ['&rho;<sub>objeto</sub> = ' + cuerpo.d + ', &rho;<sub>agua</sub> = 1000 kg/m&sup3;',
            cuerpo.d + ' es ' + (flota ? 'menor' : 'mayor') + ' que 1000',
            'El ' + cuerpo.n + ' <b>' + (flota ? 'flota' : 'se hunde') + '</b>'];

        } else {
          var cs = r.elige([
            { q: 'Levantas una piedra dentro del agua y parece mucho mas ligera.',
              ok: 'El empuje del agua le resta peso aparente', corto: 'el empuje le resta peso',
              mal: 'La piedra pesa menos dentro del agua',
              por: 'su peso real no cambia: lo que cambia es la fuerza neta que tienes que hacer' },
            { q: '&iquest;Por que flota un barco de acero, si el acero se hunde?',
              ok: 'Porque esta hueco: su densidad media es menor que la del agua', corto: 'esta hueco: menos denso',
              mal: 'Porque el acero flota si tiene la forma correcta',
              por: 'lo que cuenta es la densidad del conjunto barco mas aire, no la del acero solo' },
            { q: 'Un globo de helio sube en el aire. &iquest;Por que?',
              ok: 'Porque el aire tambien empuja, y el helio es menos denso', corto: 'el aire tambien empuja',
              mal: 'Porque el helio no tiene peso',
              por: 'Arquimedes vale para cualquier fluido, y el aire lo es' },
            { q: 'Flotas mejor en el mar que en una alberca. &iquest;Por que?',
              ok: 'Porque el agua salada es mas densa y empuja mas', corto: 'el agua salada empuja mas',
              mal: 'Porque el mar es mas profundo',
              por: 'a mas densidad del fluido, mas empuje para el mismo volumen' }
          ]);
          guiaDelPaso = G({
            intro: 'Arquimedes explica un monton de cosas cotidianas: por que una piedra pesa menos bajo el agua, ' +
              'por que flota un barco de acero, por que sube un globo.<br>' +
              'Todas salen de la misma idea.',
            pasos: [
              {
                seccion: 'Paso 1: el empuje resta',
                queHacemos: 'Vemos que hace el empuje al peso.',
                paraQue: 'El empuje apunta hacia arriba y el peso hacia abajo, asi que se restan. Lo que notas al levantar algo en el agua es la diferencia.',
                queda: 'aparente = peso &minus; empuje',
                pregunta: '&iquest;Por que algo parece pesar menos bajo el agua?',
                resp: R.opcion(['Porque el empuje va hacia arriba y resta', 'Porque pierde masa'], 0),
                pista: 'Su masa no cambia por meterlo en agua.',
                despues: ''
              },
              {
                seccion: 'Paso 2: vale para cualquier fluido',
                queHacemos: 'Ampliamos la idea al aire.',
                paraQue: 'El aire tambien es un fluido y tambien empuja. Poco, porque es poco denso, pero lo justo para que un globo de helio suba.',
                queda: 'tambien en el aire',
                pregunta: '&iquest;El aire tambien produce empuje?',
                resp: R.opcion(['Si, aunque mucho menor que el agua', 'No, solo los liquidos'], 0),
                pista: 'Piensa en un globo de helio.',
                despues: ''
              },
              {
                seccion: 'Paso 3: contestar',
                queHacemos: 'Aplicamos lo anterior.',
                paraQue: 'Aqui ' + cs.por + '.',
                queda: cs.corto || cs.ok,
                pregunta: cs.q,
                resp: R.opcion([cs.ok, cs.mal], 0),
                pista: 'Piensa en densidades y en el fluido que rodea al objeto.',
                despues: ''
              }
            ],
            final: '<b>' + cs.ok + '</b>',
            receta: ['El empuje resta al peso: peso aparente',
              'Arquimedes vale para cualquier fluido, incluido el aire',
              'Lo que decide es la densidad MEDIA del objeto',
              'Fluido mas denso, mas empuje']
          });
          enun = cs.q;
          resp = R.opcion([cs.ok, cs.mal], 0);
          pistas = ['El empuje va hacia arriba y resta al peso.',
            'Aqui ' + cs.por + '.'];
          sol = ['El empuje resta al peso y depende de la densidad del fluido',
            'Aqui ' + cs.por,
            'Respuesta: <b>' + cs.ok + '</b>'];
        }

      } else if (dif === 'medio') {
        var t2 = r.subtema([
          ['empuje', 'Calcular el empuje'],
          ['aparente', 'Peso aparente'],
          ['desplazado', 'Volumen desplazado']
        ]);
        if (extra[t2]) return extra[t2](r, dif);

        var mD = r.elige([0.5, 1, 2, 3, 5]);
        var vDesp = mD / 1000;
        var vcm3 = vDesp * 1000000;
        guiaDelPaso = G({
          intro: 'Un objeto flota en agua y desplaza <b>' + F.n(mD, 1) + ' kg</b> de agua.<br>' +
            'Vamos a sacar dos cosas de ese unico dato: <b>cuanto pesa el objeto</b> y <b>que volumen de agua</b> ' +
            'aparto. Es un ejercicio de leer bien el principio.',
          pasos: [
            {
              seccion: 'Paso 1: el empuje',
              queHacemos: 'Convertimos esa masa de agua en fuerza.',
              paraQue: 'El empuje es el PESO del agua desplazada: E = mg.',
              queda: 'E = ' + F.n(mD * g, 2) + ' N',
              pregunta: 'Calcula ' + F.n(mD, 1) + ' &times; 9.8 (2 decimales)',
              resp: R.numero(mD * g, { dec: 2, tol: 0.05, unidad: 'N' }),
              pista: 'Multiplicacion directa.',
              despues: ''
            },
            {
              seccion: 'Paso 2: que implica flotar',
              queHacemos: 'Pensamos en el equilibrio.',
              paraQue: 'Si flota quieto, el empuje iguala exactamente a su peso. Ni mas (subiria) ni menos (se hundiria).',
              queda: 'peso del objeto = ' + F.n(mD * g, 2) + ' N',
              pregunta: 'Si flota en equilibrio, &iquest;cuanto pesa el objeto?',
              resp: R.numero(mD * g, { dec: 2, tol: 0.05, unidad: 'N' }),
              pista: 'Lo mismo que el empuje.',
              despues: 'Por eso un barco desplaza exactamente su propio peso en agua.'
            },
            {
              seccion: 'Paso 3: el volumen desplazado',
              queHacemos: 'Dividimos la masa de agua entre su densidad.',
              paraQue: 'V = m/&rho;, con &rho; = 1000 kg/m&sup3; para el agua.',
              queda: 'V = ' + F.n(vDesp, 6) + ' m&sup3;',
              pregunta: 'Calcula ' + F.n(mD, 1) + ' &divide; 1000 (6 decimales)',
              resp: R.numero(vDesp, { dec: 6, tol: 0.0000008, unidad: 'm&sup3;' }),
              pista: 'Division directa.',
              despues: ''
            },
            {
              seccion: 'Paso 4: en centimetros cubicos',
              queHacemos: 'Multiplicamos por un millon.',
              paraQue: 'En m&sup3; el numero es diminuto; en cm&sup3; se ve que son ' + F.n(vcm3, 0) + ', o sea ' + F.n(vcm3 / 1000, 1) + ' litros.',
              queda: 'V = ' + F.n(vcm3, 0) + ' cm&sup3;',
              pregunta: 'Expresa ese volumen en cm&sup3; (0 decimales)',
              resp: R.numero(vcm3, { dec: 0, tol: 2, unidad: 'cm&sup3;' }),
              pista: 'Multiplica por 1 000 000.',
              despues: 'Son ' + F.n(vcm3 / 1000, 1) + ' litros de agua apartados.'
            },
            {
              seccion: 'Paso 5: la regla del barco',
              queHacemos: 'Generalizamos lo visto.',
              paraQue: 'Un barco flotando desplaza siempre su propio peso en agua. Por eso al cargarlo se hunde un poco mas: necesita apartar mas agua.',
              queda: 'desplaza su propio peso',
              pregunta: 'Al cargar un barco, &iquest;que pasa?',
              resp: R.opcion(['Se hunde mas, para desplazar mas agua', 'Flota igual'], 0),
              pista: 'Mas peso exige mas empuje, y mas empuje exige mas agua desplazada.',
              despues: ''
            }
          ],
          final: 'El objeto desplaza <b>' + F.n(vcm3, 0) + ' cm&sup3;</b> de agua',
          receta: ['El empuje es el peso del agua desplazada: E = mg',
            'Flotando, el empuje iguala al peso del objeto',
            'V = m/&rho;, con 1000 kg/m&sup3; para el agua',
            'Un barco desplaza su propio peso en agua']
        });
        enun = 'Un objeto flota en agua desplazando ' + F.n(mD, 1) + ' kg de agua.<br>' +
          '&iquest;Que volumen de agua desplaza, en cm&sup3;? (0 decimales)<br>' +
          '<small>&rho;<sub>agua</sub> = 1000 kg/m&sup3;</small>';
        resp = R.numero(vcm3, { dec: 0, tol: 2, unidad: 'cm&sup3;' });
        pistas = ['V = m/&rho;, con la densidad del agua.',
          'El resultado en m&sup3; hay que multiplicarlo por 1 000 000.'];
        sol = ['V = ' + F.n(mD, 1) + '/1000 = ' + F.n(vDesp, 6) + ' m&sup3;',
          'En cm&sup3;: &times; 1 000 000',
          'V = <b>' + F.n(vcm3, 0) + ' cm&sup3;</b>'];

      } else {
        var t3 = r.subtema([
          ['fraccion', 'Que fraccion queda sumergida'],
          ['corona', 'La densidad por peso aparente'],
          ['aparente', 'Peso aparente']
        ]);
        if (t3 === 'aparente') return extra.aparente(r, dif);

        if (t3 === 'fraccion') {
          var obj = r.elige([
            { n: 'hielo', d: 917 }, { n: 'madera de pino', d: 500 }, { n: 'corcho', d: 240 },
            { n: 'plastico', d: 700 }, { n: 'parafina', d: 900 }
          ]);
          var fluido = r.elige([{ n: 'agua', d: 1000 }, { n: 'agua de mar', d: 1030 }]);
          var frac = obj.d / fluido.d;
          guiaDelPaso = G({
            intro: 'Un bloque de <b>' + obj.n + '</b> (densidad ' + obj.d + ' kg/m&sup3;) flota en <b>' + fluido.n + '</b> ' +
              '(' + fluido.d + ' kg/m&sup3;).<br>' +
              'La pregunta es <b>que fraccion</b> queda bajo la superficie. Lo bonito es que sale sin saber el ' +
              'tamano del bloque.',
            pasos: [
              {
                seccion: 'Paso 1: la condicion de flotar',
                queHacemos: 'Escribimos el equilibrio.',
                paraQue: 'Flotando, el empuje iguala al peso: &rho;<sub>fluido</sub>V<sub>sumergido</sub>g = &rho;<sub>objeto</sub>V<sub>total</sub>g.',
                queda: '&rho;<sub>f</sub>V<sub>sum</sub> = &rho;<sub>o</sub>V<sub>tot</sub>',
                pregunta: 'Flotando en equilibrio, &iquest;que relacion hay entre empuje y peso?',
                resp: R.opcion(['Son iguales', 'El empuje es mayor'], 0),
                pista: 'Si no fueran iguales, el bloque subiria o bajaria.',
                despues: ''
              },
              {
                seccion: 'Paso 2: simplificar',
                queHacemos: 'Cancelamos lo que se repite.',
                paraQue: 'La g esta en los dos lados y se va. Queda V<sub>sum</sub>/V<sub>tot</sub> = &rho;<sub>o</sub>/&rho;<sub>f</sub>: la fraccion sumergida es el cociente de densidades, y el volumen desaparece.',
                queda: 'fraccion = &rho;<sub>o</sub>/&rho;<sub>f</sub>',
                pregunta: '&iquest;De que depende la fraccion sumergida?',
                resp: R.opcion(['Solo del cociente de densidades', 'Del tamano del bloque'], 0),
                pista: 'El volumen total se cancela.',
                despues: 'Por eso un cubito y un iceberg se hunden en la misma proporcion.'
              },
              {
                seccion: 'Paso 3: calcular',
                queHacemos: 'Dividimos las dos densidades.',
                paraQue: 'Sale la fraccion que queda debajo del agua.',
                queda: 'fraccion = ' + F.n(frac, 4),
                pregunta: 'Calcula ' + obj.d + ' &divide; ' + fluido.d + ' (4 decimales)',
                resp: R.numero(frac, { dec: 4, tol: 0.0015 }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: en porcentaje',
                queHacemos: 'Multiplicamos por 100.',
                paraQue: 'Queda sumergido el ' + F.n(100 * frac, 1) + '%, y asoma el ' + F.n(100 * (1 - frac), 1) + '%.',
                queda: F.n(100 * frac, 1) + '% dentro, ' + F.n(100 * (1 - frac), 1) + '% fuera',
                pregunta: 'Expresa la fraccion sumergida en porcentaje (1 decimal)',
                resp: R.numero(100 * frac, { dec: 1, tol: 0.2, unidad: '%' }),
                pista: 'Multiplica por 100.',
                despues: ''
              },
              {
                seccion: 'Paso 5: la punta del iceberg',
                queHacemos: 'Conectamos con la frase hecha.',
                paraQue: 'Con el hielo en agua de mar sale alrededor del 90% sumergido. De ahi viene lo de que solo se ve la punta del iceberg: es literalmente cierto.',
                queda: 'solo asoma el ' + F.n(100 * (1 - frac), 1) + '%',
                pregunta: '&iquest;Por que de un iceberg solo se ve la punta?',
                resp: R.opcion(['Porque su densidad es casi la del agua y se hunde casi entero',
                  'Porque el resto se derritio'], 0),
                pista: 'Mira que cerca estan las dos densidades.',
                despues: ''
              }
            ],
            final: 'Queda sumergido el <b>' + F.n(100 * frac, 1) + '%</b>',
            receta: ['Flotando, empuje = peso',
              'La g y el volumen total se cancelan',
              'Fraccion sumergida = &rho;<sub>objeto</sub>/&rho;<sub>fluido</sub>',
              'No depende del tamano del objeto']
          });
          enun = 'Un bloque de ' + obj.n + ' (&rho; = ' + obj.d + ' kg/m&sup3;) flota en ' + fluido.n +
            ' (&rho; = ' + fluido.d + ' kg/m&sup3;).<br>&iquest;Que porcentaje del bloque queda sumergido? (1 decimal)';
          resp = R.numero(100 * frac, { dec: 1, tol: 0.2, unidad: '%' });
          pistas = ['Flotando, el empuje iguala al peso, y el volumen total se cancela.',
            'La fraccion sumergida es &rho;<sub>objeto</sub>/&rho;<sub>fluido</sub>.'];
          sol = ['&rho;<sub>f</sub>V<sub>sum</sub> = &rho;<sub>o</sub>V<sub>tot</sub>',
            'Fraccion = ' + obj.d + '/' + fluido.d + ' = ' + F.n(frac, 4),
            'Queda sumergido el <b>' + F.n(100 * frac, 1) + '%</b>'];

        } else {
          var mCor = r.elige([1, 2, 3, 5]);
          var densCor = r.elige([10500, 19300, 8900]);
          var metal = densCor === 19300 ? 'oro' : densCor === 10500 ? 'plata' : 'cobre';
          var vCor = mCor / densCor;
          var pesoCor = mCor * g;
          var empCor = 1000 * vCor * g;
          var apCor = pesoCor - empCor;
          guiaDelPaso = G({
            intro: 'Una pieza de metal pesa <b>' + F.n(pesoCor, 2) + ' N</b> en el aire y <b>' + F.n(apCor, 2) + ' N</b> ' +
              'sumergida en agua.<br>' +
              'Con solo esos dos numeros se puede averiguar <b>de que metal es</b>. Es el problema de la corona ' +
              'que, segun la leyenda, resolvio Arquimedes en la banera.',
            pasos: [
              {
                seccion: 'Paso 1: el empuje',
                queHacemos: 'Restamos los dos pesos.',
                paraQue: 'La diferencia entre lo que pesa fuera y dentro es exactamente el empuje.',
                queda: 'E = ' + F.n(empCor, 3) + ' N',
                pregunta: 'Calcula ' + F.n(pesoCor, 2) + ' &minus; ' + F.n(apCor, 2) + ' (3 decimales)',
                resp: R.numero(empCor, { dec: 3, tol: 0.02, unidad: 'N' }),
                pista: 'Resta directa.',
                despues: ''
              },
              {
                seccion: 'Paso 2: el volumen',
                queHacemos: 'De E = &rho;Vg despejamos V.',
                paraQue: 'V = E/(&rho;g), con la densidad del agua. Asi medimos el volumen de una pieza irregular sin tener que calcular ninguna forma geometrica: ese fue el hallazgo de Arquimedes.',
                queda: 'V = ' + F.n(vCor, 7) + ' m&sup3;',
                pregunta: 'Calcula ' + F.n(empCor, 3) + ' &divide; (1000 &times; 9.8) (7 decimales)',
                resp: R.numero(vCor, { dec: 7, tol: 0.00000008, unidad: 'm&sup3;' }),
                pista: 'Divide entre 9800.',
                despues: ''
              },
              {
                seccion: 'Paso 3: la masa',
                queHacemos: 'Del peso en el aire sacamos la masa.',
                paraQue: 'm = peso/g, para poder dividir masa entre volumen.',
                queda: 'm = ' + F.n(mCor, 2) + ' kg',
                pregunta: 'Calcula ' + F.n(pesoCor, 2) + ' &divide; 9.8 (2 decimales)',
                resp: R.numero(mCor, { dec: 2, tol: 0.02, unidad: 'kg' }),
                pista: 'Division directa.',
                despues: ''
              },
              {
                seccion: 'Paso 4: la densidad',
                queHacemos: 'Dividimos masa entre volumen.',
                paraQue: 'Ese numero identifica el material: cada metal tiene la suya y no hay dos iguales.',
                queda: '&rho; = ' + F.n(densCor, 0) + ' kg/m&sup3;',
                pregunta: 'Calcula ' + F.n(mCor, 2) + ' &divide; ' + F.n(vCor, 7) + ' (0 decimales)',
                resp: R.numero(densCor, { dec: 0, tol: 60, unidad: 'kg/m&sup3;' }),
                pista: '&rho; = m/V.',
                despues: 'Esa densidad corresponde al ' + metal + '.'
              },
              {
                seccion: 'Paso 5: la corona del rey',
                queHacemos: 'Vemos para que servia esto.',
                paraQue: 'El rey sospechaba que su corona no era de oro puro. Arquimedes no podia fundirla, pero si pesarla dentro y fuera del agua: si la densidad no daba la del oro, habia trampa.',
                queda: 'la densidad delata el material',
                pregunta: '&iquest;Por que este metodo servia para la corona?',
                resp: R.opcion(['Porque da la densidad sin destruir la pieza', 'Porque pesaba mas que el oro'], 0),
                pista: 'Habia que averiguarlo sin fundir la corona.',
                despues: ''
              }
            ],
            final: 'La densidad es <b>' + F.n(densCor, 0) + ' kg/m&sup3;</b>: es ' + metal,
            receta: ['Empuje = peso en aire &minus; peso aparente',
              'V = E/(&rho;<sub>agua</sub>g)',
              'm = peso/g',
              '&rho; = m/V, y esa densidad identifica el material']
          });
          enun = 'Una pieza de metal pesa ' + F.n(pesoCor, 2) + ' N en el aire y ' + F.n(apCor, 2) + ' N sumergida en agua.<br>' +
            '&iquest;Cual es su densidad? (0 decimales)<br>' +
            '<small>&rho;<sub>agua</sub> = 1000 kg/m&sup3; &middot; g = 9.8 m/s&sup2;</small>';
          resp = R.numero(densCor, { dec: 0, tol: 60, unidad: 'kg/m&sup3;' });
          pistas = ['El empuje es la diferencia entre los dos pesos.',
            'De ahi sale el volumen: V = E/(&rho;<sub>agua</sub>g), y luego &rho; = m/V.'];
          sol = ['E = ' + F.n(pesoCor, 2) + ' &minus; ' + F.n(apCor, 2) + ' = ' + F.n(empCor, 3) + ' N',
            'V = E/(1000&middot;9.8) = ' + F.n(vCor, 7) + ' m&sup3;, m = ' + F.n(mCor, 2) + ' kg',
            '&rho; = <b>' + F.n(densCor, 0) + ' kg/m&sup3;</b>: es ' + metal];
        }
      }

      return { guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
