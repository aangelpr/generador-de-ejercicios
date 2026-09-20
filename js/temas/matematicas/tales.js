/* Teorema de Tales */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  /* Dos rectas cortadas por tres paralelas. */
  function figuraParalelas(a, b, c, d) {
    return F.svg(260, 160,
      '<line x1="20" y1="20" x2="150" y2="140"/>' +
      '<line x1="240" y1="20" x2="150" y2="140"/>' +
      '<line x1="30" y1="30" x2="232" y2="30" stroke-dasharray="4 3"/>' +
      '<line x1="70" y1="75" x2="205" y2="75" stroke-dasharray="4 3"/>' +
      '<line x1="110" y1="120" x2="178" y2="120" stroke-dasharray="4 3"/>' +
      F.txtSvg(24, 58, a) + F.txtSvg(60, 105, b) +
      F.txtSvg(225, 58, c) + F.txtSvg(200, 105, d));
  }

  /* Triangulos semejantes encajados. */
  function figuraTriangulo(a, b, c, d) {
    return F.svg(250, 160,
      '<path d="M20 140 L230 140 L20 20 Z"/>' +
      '<line x1="20" y1="80" x2="125" y2="80" stroke-dasharray="4 3"/>' +
      F.txtSvg(4, 55, a) + F.txtSvg(4, 115, b) +
      F.txtSvg(60, 74, c) + F.txtSvg(110, 155, d));
  }

  var G = EJ.guia.armar;

  var extra = {};

  extra.tercerSegmento = function (r) {
    var k = r.elige([1.5, 2, 2.5, 3]);
    var ad = r.entero(2, 10), ae = r.entero(2, 10);
    var db = ad * k, ec = ae * k;
    while (Math.abs(db - Math.round(db)) > 1e-9) { ad = r.entero(2, 10); db = ad * k; }
    return {
      guia: G({
        intro: 'En el triangulo ABC se trazo DE <b>paralela</b> a la base. Conocemos AD = ' + ad + ', DB = ' + F.n(db) + ' y AE = ' + ae + ', ' +
          'y falta EC.<br>' +
          'Esa palabra "paralela" es la que lo desbloquea todo: cuando una recta paralela corta dos lados de un triangulo, ' +
          'los parte en <b>trozos proporcionales</b>. Es el teorema de Tales.',
        pasos: [
          { pregunta: '&iquest;Que proporcion se puede plantear?',
            resp: R.opcion([F.frac('AD', 'DB') + ' = ' + F.frac('AE', 'EC'),
              F.frac('AD', 'DB') + ' = ' + F.frac('EC', 'AE')], 0),
            pista: 'Los trozos de un lado se comparan con los trozos del OTRO lado, en el mismo orden: el de arriba con el de arriba y el de abajo con el de abajo.',
            despues: 'Queda ' + F.frac(ad, F.n(db)) + ' = ' + F.frac(ae, 'EC') + '.' },
          { pregunta: 'Multiplica en cruz: ' + ad + ' &middot; EC = ' + F.n(db) + ' &middot; ' + ae + '.<br>&iquest;Cuanto vale el lado derecho?',
            resp: R.numero(db * ae, { dec: 2, tol: 0.01 }),
            pista: 'Multiplica ' + F.n(db) + ' por ' + ae + '.',
            despues: 'La ecuacion es ' + ad + ' &middot; EC = ' + F.n(db * ae) + '.' },
          { pregunta: 'Despeja EC dividiendo entre ' + ad + '. (2 decimales)',
            resp: R.numero(ec, { dec: 2, tol: 0.01 }),
            pista: F.n(db * ae) + ' &divide; ' + ad + '.',
            despues: 'Comprueba que tenga sentido: como DB es ' + (db > ad ? 'mayor' : 'menor') + ' que AD, EC debe ser ' +
              (db > ad ? 'mayor' : 'menor') + ' que AE, y lo es.' }
        ],
        final: 'EC = <b>' + F.n(ec, 2) + '</b>',
        receta: ['La palabra clave es "paralela"',
          'Los dos lados quedan cortados en trozos proporcionales',
          'Plantear la proporcion respetando el orden arriba/abajo',
          'Multiplicar en cruz y despejar',
          'Revisar que el resultado sea razonable']
      }),
      enunciado: 'En un triangulo ABC se traza DE paralela a la base BC.<br>' +
        'Si AD = ' + ad + ', DB = ' + F.n(db) + ' y AE = ' + ae + ', &iquest;cuanto mide EC? (2 decimales)' +
        figuraTriangulo('AD=' + ad, 'DB=' + F.n(db), 'AE=' + ae, 'EC=?'),
      respuesta: R.numero(ec, { dec: 2, tol: 0.01 }),
      pistas: ['Por el teorema de Tales: AD/DB = AE/EC.',
        F.frac(ad, F.n(db)) + ' = ' + F.frac(ae, 'EC') + '; despeja multiplicando en cruz.'],
      solucion: ['AD/DB = AE/EC',
        'EC = (DB &middot; AE) / AD = (' + F.n(db) + ' &middot; ' + ae + ') / ' + ad,
        'EC = <b>' + F.n(ec, 2) + '</b>']
    };
  };

  extra.perimetros = function (r) {
    var a = r.entero(2, 6), b = a + r.entero(1, 5);
    var perimetroChico = r.entero(3, 20) * a;
    var perimetroGrande = perimetroChico * b / a;
    return {
      guia: G({
        intro: 'Dos poligonos semejantes con razon <b>' + a + ' : ' + b + '</b>, y el perimetro del menor es <b>' + perimetroChico + ' cm</b>.<br>' +
          'Lo unico que hay que tener claro aqui es como escala cada cosa: las <b>longitudes</b> van con la razon k, ' +
          'las <b>areas</b> con k&sup2; y los volumenes con k&sup3;. Y un perimetro es una longitud.',
        pasos: [
          { pregunta: '&iquest;En que razon estan los perimetros?',
            resp: R.opcion(['En la misma que los lados, ' + a + ' : ' + b,
              'En la razon al cuadrado, ' + (a * a) + ' : ' + (b * b)], 0),
            pista: 'El perimetro es una SUMA de lados. Si cada lado se multiplica por k, la suma tambien. Las areas son las que van al cuadrado.',
            despues: 'Entonces ' + F.frac(a, b) + ' = ' + F.frac(perimetroChico, 'P') + '.' },
          { pregunta: 'Multiplica en cruz: ' + a + ' &middot; P = ' + perimetroChico + ' &middot; ' + b + '.<br>&iquest;Cuanto vale el lado derecho?',
            resp: R.numero(perimetroChico * b, { dec: 2, tol: 0.01 }),
            pista: perimetroChico + ' &times; ' + b + '.',
            despues: '' },
          { pregunta: 'Despeja P dividiendo entre ' + a + '. (2 decimales)',
            resp: R.numero(perimetroGrande, { dec: 2, tol: 0.01, unidad: 'cm' }),
            pista: (perimetroChico * b) + ' &divide; ' + a + '.',
            despues: 'Debe salir mayor que ' + perimetroChico + ', porque ' + b + ' &gt; ' + a + '.' }
        ],
        final: 'El perimetro del mayor es <b>' + F.n(perimetroGrande, 2) + ' cm</b>',
        receta: ['Longitudes escalan con k',
          'Areas con k&sup2;, volumenes con k&sup3;',
          'El perimetro es longitud: va con k',
          'Plantear la proporcion y multiplicar en cruz']
      }),
      enunciado: 'Dos poligonos son semejantes con razon ' + a + ' : ' + b + '.<br>' +
        'El perimetro del menor es ' + perimetroChico + ' cm. &iquest;Cuanto mide el perimetro del mayor? (2 decimales)',
      respuesta: R.numero(perimetroGrande, { dec: 2, tol: 0.01, unidad: 'cm' }),
      pistas: ['En figuras semejantes los perimetros estan en la MISMA razon que los lados.',
        F.frac(a, b) + ' = ' + F.frac(perimetroChico, 'P') + '.'],
      solucion: ['Los perimetros guardan la razon ' + a + ':' + b,
        'P = ' + perimetroChico + ' &middot; ' + b + ' / ' + a,
        'P = <b>' + F.n(perimetroGrande, 2) + ' cm</b>']
    };
  };

  extra.razonAreas = function (r) {
    var a = r.entero(2, 5), b = a + r.entero(1, 4);
    var areaChica = r.entero(4, 40);
    var areaGrande = areaChica * (b * b) / (a * a);
    return {
      guia: G({
        intro: 'Dos figuras semejantes con razon <b>' + a + ' : ' + b + '</b>, y el area de la menor es <b>' + areaChica + ' cm&sup2;</b>.<br>' +
          'Aqui esta la trampa clasica de todo el tema: las areas <b>no</b> van con la razon k, van con <b>k&sup2;</b>. ' +
          'Piensalo asi: si duplicas los lados de un cuadrado, el area no se duplica, se hace cuatro veces mayor.',
        pasos: [
          { pregunta: 'Si la razon de los lados es k, &iquest;en que razon estan las areas?',
            resp: R.opcion(['En k&sup2;', 'En la misma k'], 0),
            pista: 'Un area ocupa DOS dimensiones: largo y ancho. Si los dos se multiplican por k, el area se multiplica por k &middot; k.',
            despues: 'Por eso hay que elevar la razon al cuadrado antes de usarla.' },
          { pregunta: 'La razon es k = ' + b + '/' + a + '.<br>&iquest;Cuanto vale k&sup2;? (4 decimales)',
            resp: R.numero(b * b / (a * a), { dec: 4, tol: 0.001 }),
            pista: 'Eleva arriba y abajo: ' + (b * b) + '/' + (a * a) + '.',
            despues: '' },
          { pregunta: 'Multiplica el area chica por k&sup2;: ' + areaChica + ' &times; ' + (b * b) + ' &divide; ' + (a * a) + ' (2 decimales)',
            resp: R.numero(areaGrande, { dec: 2, tol: 0.02, unidad: 'cm&sup2;' }),
            pista: 'Primero multiplica por ' + (b * b) + ' y luego divide entre ' + (a * a) + '.',
            despues: 'Fijate cuanto crecio: mucho mas de lo que crecieron los lados.' }
        ],
        final: 'El area de la mayor es <b>' + F.n(areaGrande, 2) + ' cm&sup2;</b>',
        receta: ['Razon de lados: k',
          'Razon de areas: k&sup2;',
          'Razon de volumenes: k&sup3;',
          'Elevar la razon ANTES de multiplicar',
          'El error tipico es usar k en vez de k&sup2;']
      }),
      enunciado: 'Dos figuras son semejantes con razon de semejanza ' + a + ' : ' + b + '.<br>' +
        'Si el area de la menor es ' + areaChica + ' cm&sup2;, &iquest;cual es el area de la mayor? (2 decimales)',
      respuesta: R.numero(areaGrande, { dec: 2, tol: 0.02, unidad: 'cm&sup2;' }),
      pistas: ['Cuidado: las areas NO estan en la razon k, sino en k&sup2;.',
        'k = ' + b + '/' + a + ', asi que k&sup2; = ' + (b * b) + '/' + (a * a) + '.'],
      solucion: ['Razon de semejanza k = ' + b + '/' + a,
        'Las areas van como k&sup2; = ' + (b * b) + '/' + (a * a),
        'Area mayor = ' + areaChica + ' &middot; ' + (b * b) + '/' + (a * a) + ' = <b>' + F.n(areaGrande, 2) + ' cm&sup2;</b>']
    };
  };

  EJ.tema({
    id: 'tales',
    materia: 'matematicas',
    grupo: 'Geometria y trigonometria',
    nombre: 'Teorema de Tales',
    descripcion: 'Segmentos proporcionales entre paralelas y triangulos semejantes.',
    formulario: 'Si dos rectas son cortadas por paralelas: a/b = c/d<br>' +
      'En triangulos semejantes los lados correspondientes son proporcionales y los angulos son iguales.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, a, b, c, x, k;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['paralelas', 'Segmentos entre paralelas'],
          ['tercerSegmento', 'Paralela dentro de un triangulo']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        k = r.elige([1.5, 2, 2.5, 3]);
        a = r.entero(2, 12); b = r.entero(2, 12);
        c = a * k; x = b * k;
        while (Math.abs(c - Math.round(c)) > 1e-9) { a = r.entero(2, 12); c = a * k; }
        guiaDelPaso = EJ.guia.tales(a, b, c);
        enun = 'Tres rectas paralelas cortan a dos rectas. Encuentra el valor de x:' +
          figuraParalelas(a, b, F.n(c), 'x');
        resp = R.numero(x, { dec: 2, tol: 0.01 });
        pistas = ['Por el teorema de Tales los segmentos correspondientes son proporcionales: ' + a + '/' + b + ' = ' + F.n(c) + '/x.',
          'Multiplica en cruz: ' + a + 'x = ' + b + ' &middot; ' + F.n(c) + '.'];
        sol = ['Planteo la proporcion: ' + F.frac(a, b) + ' = ' + F.frac(F.n(c), 'x'),
          'Producto cruzado: ' + a + 'x = ' + b + ' &middot; ' + F.n(c) + ' = ' + F.n(b * c),
          'x = ' + F.n(b * c) + ' / ' + a + ' = <b>' + F.n(x, 2) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['semejantes', 'Triangulos semejantes'],
          ['sombra', 'Problema de sombras'],
          ['perimetros', 'Perimetros de figuras semejantes'],
          ['tercerSegmento', 'Paralela dentro de un triangulo']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'semejantes') {
          a = r.entero(3, 10); b = r.entero(2, 9);
          k = r.elige([1.5, 2, 2.5, 3]);
          c = a * k;
          while (Math.abs(c - Math.round(c)) > 1e-9) { a = r.entero(3, 10); c = a * k; }
          x = b * k;
          guiaDelPaso = G({
            intro: 'La linea punteada es <b>paralela a la base</b>, asi que arriba se forma un triangulo chico ' +
              'con exactamente los mismos angulos que el grande: son <b>semejantes</b>.<br>' +
              'En figuras semejantes todos los lados guardan la misma razon. Lo unico delicado es no confundir ' +
              'el lado del triangulo chico con el del grande.',
            pasos: [
              { pregunta: 'El lado izquierdo esta partido en ' + a + ' (arriba) y ' + F.n(c - a) + ' (abajo).<br>&iquest;Cuanto mide el lado izquierdo del triangulo GRANDE?',
                resp: R.numero(c, { dec: 2, tol: 0.01 }),
                pista: 'El grande llega hasta abajo del todo: ' + a + ' + ' + F.n(c - a) + '.',
                despues: 'Este es el paso que mas se falla: se usa solo el pedacito de arriba (' + a + ') como si fuera el lado completo.' },
              { pregunta: 'Razon de semejanza = lado grande &divide; lado chico = ' + F.n(c) + ' &divide; ' + a + '<br>&iquest;Cuanto da?',
                resp: R.numero(k, { dec: 2, tol: 0.01 }),
                pista: 'Division directa.',
                despues: 'Todo el triangulo grande es ' + F.n(k) + ' veces el chico.' },
              { pregunta: 'La base chica mide ' + b + '. Multiplicala por la razon: ' + b + ' &times; ' + F.n(k) + ' (2 decimales)',
                resp: R.numero(x, { dec: 2, tol: 0.01 }),
                pista: 'Multiplicacion directa.',
                despues: 'Comprueba: x debe ser mayor que ' + b + ', y lo es.' }
            ],
            final: 'x = <b>' + F.n(x, 2) + '</b>',
            receta: ['Paralela a la base = triangulos semejantes',
              'El lado del grande es la SUMA de los dos trozos',
              'Razon = grande &divide; chico',
              'Multiplicar el lado conocido del chico por la razon']
          });
          enun = 'En la figura, la linea punteada es paralela a la base. Si los segmentos miden lo indicado, encuentra x:' +
            figuraTriangulo(a, F.n(c - a), b, 'x');
          resp = R.numero(x, { dec: 2, tol: 0.01 });
          pistas = ['La paralela crea un triangulo semejante al grande: los lados guardan la misma razon.',
            'Razon = lado grande / lado chico = ' + F.n(c) + '/' + a + ' = ' + F.n(k) + '.'];
          sol = ['Los dos triangulos son semejantes (tienen los mismos angulos)',
            'Razon de semejanza: ' + F.n(c) + ' / ' + a + ' = ' + F.n(k),
            'x = ' + b + ' &middot; ' + F.n(k) + ' = <b>' + F.n(x, 2) + '</b>'];
        } else {
          var hPersona = r.elige([1.5, 1.6, 1.7, 1.8]);
          var sPersona = r.entero(2, 5);
          var sArbol = r.entero(6, 25);
          x = hPersona * sArbol / sPersona;
          guiaDelPaso = G({
            intro: 'Una persona de <b>' + hPersona + ' m</b> hace una sombra de <b>' + sPersona + ' m</b>, y a la misma hora ' +
              'un arbol hace una sombra de <b>' + sArbol + ' m</b>.<br>' +
              'Este es el problema con el que Tales midio la piramide de Egipto. La clave es "a la misma hora": ' +
              'los rayos del sol llegan con el mismo angulo, asi que la persona y el arbol forman ' +
              '<b>triangulos semejantes</b> con su sombra.',
            pasos: [
              { pregunta: '&iquest;Por que se pueden comparar la persona y el arbol?',
                resp: R.opcion(['Porque el sol llega con el mismo angulo y forman triangulos semejantes',
                  'Porque los dos estan de pie'], 0),
                pista: 'Si fueran horas distintas las sombras tendrian otra inclinacion y no se podria.',
                despues: 'Entonces la razon altura &divide; sombra es la MISMA para los dos.' },
              { pregunta: 'Calcula esa razon con la persona: ' + hPersona + ' &divide; ' + sPersona + ' (4 decimales)',
                resp: R.numero(hPersona / sPersona, { dec: 4, tol: 0.001 }),
                pista: 'Division directa. Dice cuantos metros de alto hay por cada metro de sombra.',
                despues: 'Cualquier cosa parada ahi cumple lo mismo.' },
              { pregunta: 'Aplicasela al arbol: multiplica esa razon por su sombra de ' + sArbol + ' m. (2 decimales)',
                resp: R.numero(x, { dec: 2, tol: 0.01, unidad: 'm' }),
                pista: 'Tambien sale como ' + hPersona + ' &times; ' + sArbol + ' &divide; ' + sPersona + '.',
                despues: 'Revisa que tenga sentido: la sombra del arbol es mas larga, asi que debe ser mas alto.' }
            ],
            final: 'El arbol mide <b>' + F.n(x, 2) + ' m</b>',
            receta: ['"A la misma hora" = triangulos semejantes',
              'La razon altura/sombra es igual para todo',
              'Calcularla con el objeto conocido',
              'Aplicarla al desconocido',
              'Comprobar que el resultado sea razonable']
          });
          enun = 'Una persona de ' + hPersona + ' m proyecta una sombra de ' + sPersona + ' m.<br>' +
            'A la misma hora, un arbol proyecta una sombra de ' + sArbol + ' m.<br>&iquest;Cuanto mide el arbol? (2 decimales)';
          resp = R.numero(x, { dec: 2, tol: 0.01, unidad: 'm' });
          pistas = ['Los rayos del sol forman triangulos semejantes: altura/sombra es la misma para los dos.',
            F.frac(hPersona, sPersona) + ' = ' + F.frac('h', sArbol) + '.'];
          sol = ['Proporcion: altura/sombra es constante',
            F.frac(hPersona, sPersona) + ' = ' + F.frac('h', sArbol),
            'h = ' + hPersona + ' &middot; ' + sArbol + ' / ' + sPersona + ' = <b>' + F.n(x, 2) + ' m</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['algebraico', 'Proporcion con incognita'],
          ['dosIncognitas', 'Resolver un triangulo semejante'],
          ['razonAreas', 'Razon de areas']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'algebraico') {
          // (x + p)/(x + q) = m/n  con solucion entera
          var sol0 = r.entero(2, 12);
          var p = r.entero(1, 8), q = r.entero(1, 8);
          while (q === p) q = r.entero(1, 8);
          var m = sol0 + p, n = sol0 + q;
          var g = F.mcd(m, n);
          var Mg = m / g, Ng = n / g;
          guiaDelPaso = G({
            intro: 'Tenemos la proporcion <b>' + F.frac('x + ' + p, 'x + ' + q) + ' = ' + F.frac(Mg, Ng) + '</b>.<br>' +
              'Es el mismo teorema de Tales de siempre, solo que ahora los segmentos vienen escritos con una incognita adentro. ' +
              'Se resuelve igual: producto cruzado, y despues es pura ecuacion de primer grado.',
            pasos: [
              { pregunta: 'Multiplica en cruz: ' + Ng + '(x + ' + p + ') = ' + Mg + '(x + ' + q + ').<br>Distribuye el lado izquierdo: &iquest;cuanto vale ' + Ng + ' &times; ' + p + '?',
                resp: R.numero(Ng * p, { dec: 0 }),
                pista: 'El ' + Ng + ' entra a los dos terminos del parentesis: queda ' + Ng + 'x + ' + (Ng * p) + '.',
                despues: 'Izquierda: ' + Ng + 'x + ' + (Ng * p) + '.' },
              { pregunta: 'Ahora el derecho: ' + Mg + ' &times; ' + q,
                resp: R.numero(Mg * q, { dec: 0 }),
                pista: 'Mismo procedimiento: queda ' + Mg + 'x + ' + (Mg * q) + '.',
                despues: 'La ecuacion es ' + Ng + 'x + ' + (Ng * p) + ' = ' + Mg + 'x + ' + (Mg * q) + '.' },
              { pregunta: 'Pasa las x a la izquierda y los numeros a la derecha.<br>&iquest;Que coeficiente queda acompañando a la x? (' + Ng + ' &minus; ' + Mg + ')',
                resp: R.numero(Ng - Mg, { dec: 0 }),
                pista: 'El ' + Mg + 'x pasa restando.',
                despues: '' },
              { pregunta: '&iquest;Y cuanto queda del lado derecho? (' + (Mg * q) + ' &minus; ' + (Ng * p) + ')',
                resp: R.numero(Mg * q - Ng * p, { dec: 0 }),
                pista: 'El ' + (Ng * p) + ' pasa restando al otro lado.',
                despues: 'Queda ' + (Ng - Mg) + 'x = ' + (Mg * q - Ng * p) + '.' },
              { pregunta: 'Despeja x. (2 decimales)',
                resp: R.numero(sol0, { dec: 2, tol: 0.01 }),
                pista: (Mg * q - Ng * p) + ' &divide; ' + (Ng - Mg) + '.',
                despues: 'Comprueba sustituyendo: ' + F.frac(sol0 + p, sol0 + q) + ' debe simplificarse a ' + F.frac(Mg, Ng) + '.' }
            ],
            final: 'x = <b>' + sol0 + '</b>',
            receta: ['Producto cruzado para quitar las fracciones',
              'Distribuir los dos parentesis',
              'Agrupar las x de un lado y los numeros del otro',
              'Despejar dividiendo',
              'Comprobar sustituyendo en la proporcion original']
          });
          enun = 'Dos rectas son cortadas por paralelas y los segmentos correspondientes cumplen:<br>' +
            '<span class="big">' + F.frac('x + ' + p, 'x + ' + q) + ' = ' + F.frac(m / g, n / g) + '</span><br>Encuentra x.';
          resp = R.numero(sol0, { dec: 2, tol: 0.01 });
          pistas = ['Multiplica en cruz para quitar las fracciones.',
            (n / g) + '(x + ' + p + ') = ' + (m / g) + '(x + ' + q + ').'];
          sol = ['Producto cruzado: ' + (n / g) + '(x + ' + p + ') = ' + (m / g) + '(x + ' + q + ')',
            (n / g) + 'x + ' + (n / g * p) + ' = ' + (m / g) + 'x + ' + (m / g * q),
            'Agrupo: ' + (n / g - m / g) + 'x = ' + (m / g * q - n / g * p),
            'x = <b>' + sol0 + '</b>'];
        } else {
          k = r.elige([2, 3, 1.5]);
          a = r.entero(3, 9); b = r.entero(3, 9); c = r.entero(3, 9);
          var A2 = a * k, B2 = b * k, C2 = c * k;
          while (Math.abs(A2 - Math.round(A2)) > 1e-9 || Math.abs(B2 - Math.round(B2)) > 1e-9) {
            a = r.entero(3, 9); b = r.entero(3, 9); A2 = a * k; B2 = b * k;
          }
          guiaDelPaso = G({
            intro: 'Dos triangulos semejantes: el primero mide <b>' + a + ', ' + b + ' y ' + c + ' cm</b>, ' +
              'y el lado del segundo que corresponde al de ' + a + ' cm mide <b>' + F.n(A2) + ' cm</b>.<br>' +
              'Todo sale de un solo numero: la <b>razon de semejanza</b>. Una vez que la tienes, los demas lados son multiplicaciones.',
            pasos: [
              { pregunta: 'Encuentra la razon con el unico par de lados que conoces completo:<br>' + F.n(A2) + ' &divide; ' + a,
                resp: R.numero(k, { dec: 2, tol: 0.01 }),
                pista: 'Siempre el lado del segundo entre su correspondiente del primero.',
                despues: 'k = ' + F.n(k) + ': el segundo triangulo es ' + F.n(k) + ' veces el primero.' },
              { pregunta: 'Lado correspondiente al de ' + b + ' cm: ' + b + ' &times; ' + F.n(k) + ' (2 decimales)',
                resp: R.numero(B2, { dec: 2, tol: 0.01 }),
                pista: 'Multiplica por la razon.',
                despues: '' },
              { pregunta: 'Lado correspondiente al de ' + c + ' cm: ' + c + ' &times; ' + F.n(k) + ' (2 decimales)',
                resp: R.numero(C2, { dec: 2, tol: 0.01 }),
                pista: 'Igual, por la misma razon.',
                despues: 'Ya estan los tres lados del segundo triangulo.' },
              { pregunta: 'Para el perimetro, &iquest;hay atajo?',
                resp: R.opcion(['Si: el perimetro del primero por k', 'No, hay que sumar los tres lados'], 0),
                pista: 'El perimetro tambien es una longitud, asi que escala con k igual que los lados. ' +
                  '(' + a + ' + ' + b + ' + ' + c + ') &times; ' + F.n(k) + ' da lo mismo que sumar los tres nuevos.',
                despues: 'Las dos formas valen; el atajo ahorra errores.' },
              { pregunta: 'Calcula el perimetro del segundo triangulo. (2 decimales)',
                resp: R.numero(A2 + B2 + C2, { dec: 2, tol: 0.02 }),
                pista: F.n(A2) + ' + ' + F.n(B2) + ' + ' + F.n(C2) + ', o bien ' + (a + b + c) + ' &times; ' + F.n(k) + '.',
                despues: '' },
              { pregunta: 'Escribe las tres respuestas.',
                resp: R.varios([
                  { etiqueta: 'Lado ~' + b, resp: R.numero(B2, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Lado ~' + c, resp: R.numero(C2, { dec: 2, tol: 0.01 }) },
                  { etiqueta: 'Perimetro', resp: R.numero(A2 + B2 + C2, { dec: 2, tol: 0.02 }) }
                ]),
                pista: F.n(B2) + ', ' + F.n(C2) + ' y ' + F.n(A2 + B2 + C2) + '.',
                despues: '' }
            ],
            final: 'Lados <b>' + F.n(B2, 2) + '</b> y <b>' + F.n(C2, 2) + '</b>, perimetro <b>' + F.n(A2 + B2 + C2, 2) + '</b>',
            receta: ['Hallar la razon con el par de lados conocido',
              'Segundo entre primero, siempre en ese orden',
              'Multiplicar cada lado restante por la razon',
              'El perimetro tambien escala con k',
              'Las areas serian con k&sup2;, no con k']
          });
          enun = 'Dos triangulos son semejantes. El primero tiene lados ' + a + ', ' + b + ' y ' + c + ' cm.<br>' +
            'El lado del segundo que corresponde al de ' + a + ' cm mide ' + F.n(A2) + ' cm.<br>' +
            'Encuentra los otros dos lados del segundo triangulo y el perimetro.';
          resp = R.varios([
            { etiqueta: 'Lado ~' + b, resp: R.numero(B2, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Lado ~' + c, resp: R.numero(C2, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Perimetro', resp: R.numero(A2 + B2 + C2, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['Primero halla la razon de semejanza dividiendo los lados correspondientes conocidos.',
            'Razon = ' + F.n(A2) + ' / ' + a + ' = ' + F.n(k) + '. Multiplica los demas lados por ella.'];
          sol = ['Razon de semejanza: k = ' + F.n(A2) + '/' + a + ' = ' + F.n(k),
            'Lado correspondiente a ' + b + ': ' + b + ' &middot; ' + F.n(k) + ' = <b>' + F.n(B2, 2) + '</b>',
            'Lado correspondiente a ' + c + ': ' + c + ' &middot; ' + F.n(k) + ' = <b>' + F.n(C2, 2) + '</b>',
            'Perimetro: ' + F.n(A2) + ' + ' + F.n(B2) + ' + ' + F.n(C2) + ' = <b>' + F.n(A2 + B2 + C2, 2) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
