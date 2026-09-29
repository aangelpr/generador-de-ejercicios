/* Modo prepa: geometria y medicion (areas, perimetros, volumenes, angulos, Pitagoras) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var TERNAS = [[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25], [12, 16, 20], [20, 21, 29]];

  var casos = {};

  /* ---------- facil ---------- */

  casos.areaFigura = function (r) {
    var fig = r.entero(0, 2), v, err, enun, sol, pistas;
    if (fig === 0) {
      var b = r.entero(4, 20), h = r.entero(3, 15);
      v = b * h / 2;
      err = [b * h, b + h, 2 * (b + h), b * h / 4];
      enun = 'Un triangulo tiene base de ' + b + ' cm y altura de ' + h + ' cm. &iquest;Cual es su area?';
      pistas = ['Area del triangulo = base &times; altura / 2.', 'No olvides dividir entre 2.'];
      sol = ['A = b &middot; h / 2 = ' + b + ' &times; ' + h + ' / 2', 'A = ' + (b * h) + ' / 2 = <b>' + F.n(v) + ' cm&sup2;</b>'];
    } else if (fig === 1) {
      var B = r.entero(8, 20), bb = r.entero(3, 7) , ht = r.entero(3, 12);
      if (bb >= B) bb = B - 2;
      v = (B + bb) * ht / 2;
      err = [(B + bb) * ht, B * bb * ht / 2, B * ht, (B - bb) * ht / 2];
      enun = 'Un trapecio tiene bases de ' + B + ' cm y ' + bb + ' cm, y altura de ' + ht + ' cm. &iquest;Cual es su area?';
      pistas = ['Area del trapecio = (base mayor + base menor) &times; altura / 2.', 'Suma primero las dos bases.'];
      sol = ['A = (B + b) &middot; h / 2 = (' + B + ' + ' + bb + ') &times; ' + ht + ' / 2', 'A = ' + (B + bb) + ' &times; ' + ht + ' / 2 = <b>' + F.n(v) + ' cm&sup2;</b>'];
    } else {
      var D = r.entero(3, 10) * 2, d = r.entero(2, 9) * 2;
      v = D * d / 2;
      err = [D * d, D + d, 2 * (D + d), D * d / 4];
      enun = 'Un rombo tiene diagonales de ' + D + ' cm y ' + d + ' cm. &iquest;Cual es su area?';
      pistas = ['Area del rombo = diagonal mayor &times; diagonal menor / 2.', 'Es como la mitad del rectangulo que lo encierra.'];
      sol = ['A = D &middot; d / 2 = ' + D + ' &times; ' + d + ' / 2', 'A = <b>' + F.n(v) + ' cm&sup2;</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'cm&sup2;' }), pistas, sol);
  };

  casos.angulos = function (r) {
    var tipo = r.entero(0, 2), v, err, enun, sol, pistas;
    if (tipo === 0) {
      var a = r.entero(25, 80), b = r.entero(25, 70);
      v = 180 - a - b;
      err = [360 - a - b, a + b, 180 - a, Math.abs(90 - a - b)];
      enun = 'En un triangulo, dos angulos miden ' + a + '&deg; y ' + b + '&deg;. &iquest;Cuanto mide el tercero?';
      pistas = ['Los angulos interiores de un triangulo suman 180&deg;.', '180 &minus; ' + a + ' &minus; ' + b + '.'];
      sol = ['A + B + C = 180&deg;', 'C = 180 &minus; ' + a + ' &minus; ' + b + ' = <b>' + v + '&deg;</b>'];
    } else if (tipo === 1) {
      var x = r.entero(10, 80);
      var comp = r.bool();
      v = comp ? 90 - x : 180 - x;
      err = comp ? [180 - x, 360 - x, x] : [90 - x > 0 ? 90 - x : 270 - x, 360 - x, x];
      enun = '&iquest;Cuanto mide el angulo ' + (comp ? 'complementario' : 'suplementario') + ' de un angulo de ' + x + '&deg;?';
      pistas = ['Complementarios suman 90&deg;; suplementarios suman 180&deg;.', 'Truco para no confundirlos: "C" va antes que "S" en el abecedario, igual que 90 antes que 180.'];
      sol = [(comp ? '90' : '180') + ' &minus; ' + x + ' = <b>' + v + '&deg;</b>'];
    } else {
      var n = r.entero(5, 12);
      var suma = (n - 2) * 180;
      v = suma / n;
      err = [360 / n, suma, n * 180 / (n - 2), (n - 1) * 180 / n];
      enun = '&iquest;Cuanto mide cada angulo interior de un poligono regular de ' + n + ' lados?';
      pistas = ['La suma de los angulos interiores es (n &minus; 2) &times; 180&deg;.', 'Como es regular, todos miden lo mismo: divide la suma entre ' + n + '.'];
      sol = ['Suma = (' + n + ' &minus; 2) &times; 180 = ' + suma + '&deg;', 'Cada uno: ' + suma + ' / ' + n + ' = <b>' + F.n(v) + '&deg;</b>'];
      return P.ejercicio(enun, P.opciones(r, v, err, { unidad: '&deg;', fmt: function (k) { return F.n(k, 2); } }), pistas, sol);
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { fmt: function (k) { return k + '&deg;'; } }), pistas, sol);
  };

  casos.perimetro = function (r) {
    var l = r.entero(3, 15), a = r.entero(2, 12);
    var tipo = r.entero(0, 1);
    var v, err, enun, pistas, sol;
    if (tipo === 0) {
      v = 2 * (l + a);
      err = [l * a, l + a, 4 * l];
      enun = 'Se quiere cercar un corral rectangular de ' + l + ' m por ' + a + ' m. &iquest;Cuantos metros de malla se necesitan?';
      pistas = ['La malla va alrededor: es el perimetro, no el area.', 'Perimetro del rectangulo = 2 &times; (largo + ancho).'];
      sol = ['P = 2(' + l + ' + ' + a + ') = 2 &times; ' + (l + a) + ' = <b>' + v + ' m</b>'];
    } else {
      var lado = r.entero(3, 20);
      var area = lado * lado;
      v = 4 * lado;
      err = [area / 4, area / 2, lado, 2 * lado];
      enun = 'Un cuadrado tiene un area de ' + area + ' m&sup2;. &iquest;Cual es su perimetro?';
      pistas = ['Primero saca el lado: es la raiz cuadrada del area.', 'Lado = &radic;' + area + ' = ' + lado + ' m. Luego multiplica por 4.'];
      sol = ['Lado = &radic;' + area + ' = ' + lado + ' m', 'P = 4 &times; ' + lado + ' = <b>' + v + ' m</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'm' }), pistas, sol);
  };

  /* ---------- medio ---------- */

  casos.circulo = function (r) {
    var rad = r.entero(2, 12);
    var diam = r.bool();
    var area = r.bool();
    var v = area ? 3.14 * rad * rad : 2 * 3.14 * rad;
    var err = area
      ? [2 * 3.14 * rad, 3.14 * rad, 3.14 * (2 * rad) * (2 * rad), 3.14 * rad * 2]
      : [3.14 * rad * rad, 3.14 * rad, 4 * 3.14 * rad, 2 * 3.14 * rad * rad];
    var dato = diam ? 'un diametro de ' + (2 * rad) + ' cm' : 'un radio de ' + rad + ' cm';
    var enun = area
      ? 'Una pizza circular tiene ' + dato + '. &iquest;Cual es su area? (usa &pi; = 3.14)'
      : 'Una llanta tiene ' + dato + '. &iquest;Cuanto avanza en una vuelta completa (su perimetro)? (usa &pi; = 3.14)';
    var sol = [];
    if (diam) sol.push('El radio es la mitad del diametro: r = ' + (2 * rad) + ' / 2 = ' + rad + ' cm');
    sol.push(area
      ? 'A = &pi;r' + F.sup(2) + ' = 3.14 &times; ' + rad + F.sup(2) + ' = 3.14 &times; ' + (rad * rad) + ' = <b>' + F.n(v, 2) + ' cm&sup2;</b>'
      : 'P = 2&pi;r = 2 &times; 3.14 &times; ' + rad + ' = <b>' + F.n(v, 2) + ' cm</b>');
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: area ? 'cm&sup2;' : 'cm', enteros: false }),
      [area ? 'Area del circulo: A = &pi;r' + F.sup(2) + '.' : 'Perimetro (circunferencia): P = 2&pi;r = &pi;d.',
        diam ? 'Te dieron el DIAMETRO: el radio es la mitad.' : 'Eleva al cuadrado solo el radio, no el &pi;.'],
      sol);
  };

  casos.volumen = function (r) {
    var tipo = r.entero(0, 2), v, err, enun, sol, unidad = 'cm&sup3;';
    if (tipo === 0) {
      var l = r.entero(2, 12), a = r.entero(2, 10), h = r.entero(2, 10);
      v = l * a * h;
      err = [2 * (l * a + l * h + a * h), l + a + h, l * a];
      enun = 'Una caja mide ' + l + ' cm de largo, ' + a + ' cm de ancho y ' + h + ' cm de alto. &iquest;Cual es su volumen?';
      sol = ['V = largo &times; ancho &times; alto = ' + l + ' &times; ' + a + ' &times; ' + h + ' = <b>' + v + ' cm&sup3;</b>'];
    } else if (tipo === 1) {
      var rc = r.entero(1, 6), hc = r.entero(3, 15);
      v = 3.14 * rc * rc * hc;
      err = [2 * 3.14 * rc * hc, 3.14 * rc * hc, 3.14 * rc * rc * hc / 3];
      enun = 'Un bote cilindrico tiene radio de ' + rc + ' cm y altura de ' + hc + ' cm. &iquest;Cual es su volumen? (&pi; = 3.14)';
      sol = ['V = &pi;r' + F.sup(2) + 'h = 3.14 &times; ' + (rc * rc) + ' &times; ' + hc + ' = <b>' + F.n(v, 2) + ' cm&sup3;</b>'];
    } else {
      var lado = r.entero(3, 12) * 1, hp = r.entero(1, 5) * 3;
      v = lado * lado * hp / 3;
      err = [lado * lado * hp, lado * lado * hp / 2, lado * hp / 3];
      enun = 'Una piramide de base cuadrada tiene lado de base ' + lado + ' cm y altura ' + hp + ' cm. &iquest;Cual es su volumen?';
      sol = ['V = (area de la base &times; altura) / 3', 'V = ' + (lado * lado) + ' &times; ' + hp + ' / 3 = <b>' + F.n(v) + ' cm&sup3;</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: unidad }),
      ['Prisma y cilindro: area de la base &times; altura. Piramide y cono: lo mismo, pero entre 3.',
        'El volumen se mide en unidades cubicas (cm&sup3;).'],
      sol);
  };

  casos.pitagoras = function (r) {
    var t = r.elige(TERNAS);
    var k = r.elige([1, 1, 2]);
    var a = t[0] * k, b = t[1] * k, c = t[2] * k;
    var buscaCateto = r.bool();
    var v, err, enun, sol;
    if (!buscaCateto) {
      v = c;
      err = [a + b, Math.sqrt(Math.abs(b * b - a * a)), a * b / 2, c * c];
      enun = 'Una escalera se recarga en una pared. Su base queda a ' + a + ' m de la pared y la punta llega a ' + b + ' m de altura. &iquest;Cuanto mide la escalera?';
      sol = ['La escalera es la hipotenusa: c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2),
        'c' + F.sup(2) + ' = ' + (a * a) + ' + ' + (b * b) + ' = ' + (c * c), 'c = &radic;' + (c * c) + ' = <b>' + c + ' m</b>'];
    } else {
      v = b;
      err = [Math.sqrt(a * a + c * c), c - a, (a + c) / 2, a];
      enun = 'Un papalote esta atado con un hilo de ' + c + ' m, bien estirado. El papalote queda justo arriba de un punto que esta a ' + a + ' m de quien lo sostiene. ' +
        '&iquest;A que altura esta el papalote? (no tomes en cuenta la estatura de la persona)';
      sol = ['El hilo es la hipotenusa: b' + F.sup(2) + ' = c' + F.sup(2) + ' &minus; a' + F.sup(2),
        'b' + F.sup(2) + ' = ' + (c * c) + ' &minus; ' + (a * a) + ' = ' + (b * b), 'b = &radic;' + (b * b) + ' = <b>' + b + ' m</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'm' }),
      ['Hay un triangulo rectangulo: usa el teorema de Pitagoras, c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2) + '.',
        buscaCateto ? 'Buscas un cateto: a la hipotenusa al cuadrado le RESTAS el otro cateto al cuadrado.' : 'Buscas la hipotenusa: SUMA los cuadrados de los catetos y saca raiz.'],
      sol);
  };

  /* ---------- dificil ---------- */

  casos.areaSombreada = function (r) {
    var lado = r.entero(2, 10) * 2;
    var rad = lado / 2;
    var cuadrado = lado * lado, circulo = 3.14 * rad * rad;
    var v = cuadrado - circulo;
    var err = [circulo, cuadrado - 3.14 * lado * lado, cuadrado - 2 * 3.14 * rad, cuadrado - circulo / 2];
    var dib = F.svg(140, 140,
      /* cuadrado con el circulo recortado: solo se rellena lo de afuera */
      '<path fill-rule="evenodd" fill="currentColor" fill-opacity="0.2" ' +
        'd="M10 10H130V130H10Z M130 70A60 60 0 1 0 10 70A60 60 0 1 0 130 70Z"/>' +
      F.txtSvg(58, 138, lado + ' cm'));
    return P.ejercicio(
      'Dentro de un cuadrado de ' + lado + ' cm de lado se dibuja el circulo mas grande que cabe. ' +
        '&iquest;Cual es el area de la parte del cuadrado que queda fuera del circulo? (&pi; = 3.14)<br>' + dib,
      P.opciones(r, v, err, { unidad: 'cm&sup2;', enteros: false }),
      ['Area sombreada = area del cuadrado &minus; area del circulo.',
        'El circulo toca los cuatro lados: su diametro es ' + lado + ' cm y su radio ' + rad + ' cm.'],
      ['Cuadrado: ' + lado + F.sup(2) + ' = ' + cuadrado + ' cm&sup2;',
        'Circulo: 3.14 &times; ' + rad + F.sup(2) + ' = ' + F.n(circulo, 2) + ' cm&sup2;',
        'Sombreada: ' + cuadrado + ' &minus; ' + F.n(circulo, 2) + ' = <b>' + F.n(v, 2) + ' cm&sup2;</b>']);
  };

  casos.escala = function (r) {
    var k = r.elige([2, 3, 4, 5]);
    var queCosa = r.entero(0, 1);
    var v, err, enun, sol;
    if (queCosa === 0) {
      var area = r.entero(3, 20) * 2;
      v = area * k * k;
      err = [area * k, area * 2 * k, area * k * k * k];
      enun = 'Una foto tiene un area de ' + area + ' cm&sup2;. Si se amplia ' + (k === 2 ? 'al doble' : k === 3 ? 'al triple' : k + ' veces') +
        ' de largo y de ancho, &iquest;cual es el area de la foto ampliada?';
      sol = ['Si los lados se multiplican por ' + k + ', el area se multiplica por ' + k + F.sup(2) + ' = ' + (k * k),
        area + ' &times; ' + (k * k) + ' = <b>' + v + ' cm&sup2;</b>'];
      return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'cm&sup2;' }),
        ['Cuidado: al ampliar los lados ' + k + ' veces, el area NO crece ' + k + ' veces.', 'El area crece con el cuadrado del factor de escala.'], sol);
    }
    var vol = r.entero(2, 15);
    v = vol * k * k * k;
    err = [vol * k, vol * k * k, vol * 3 * k];
    enun = 'Un cubo de ' + vol + ' litros de capacidad se construye otra vez con aristas ' + k + ' veces mas largas. &iquest;Que capacidad tiene el nuevo cubo?';
    sol = ['Si las aristas se multiplican por ' + k + ', el volumen se multiplica por ' + k + F.sup(3) + ' = ' + (k * k * k),
      vol + ' &times; ' + (k * k * k) + ' = <b>' + v + ' litros</b>'];
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: 'litros' }),
      ['El volumen crece con el CUBO del factor de escala.', k + ' &times; ' + k + ' &times; ' + k + ' = ' + (k * k * k) + '.'], sol);
  };

  casos.semejanza = function (r) {
    var hPoste, sPoste, sPer, hPer;
    do {
      hPer = r.elige([1.5, 1.6, 1.8, 2]);
      sPer = r.elige([1, 1.2, 2, 2.4, 3, 4]);
      sPoste = r.entero(3, 15);
      hPoste = hPer * sPoste / sPer;
    } while (Math.round(hPoste * 100) !== hPoste * 100 || hPoste > 40);
    var err = [sPer * sPoste / hPer, hPer * sPer * sPoste, hPer + sPoste - sPer, sPoste];
    return P.ejercicio(
      'A cierta hora, una persona de ' + hPer + ' m de estatura proyecta una sombra de ' + sPer + ' m. ' +
        'En ese mismo momento, un arbol proyecta una sombra de ' + sPoste + ' m. &iquest;Cuanto mide el arbol?',
      P.opciones(r, hPoste, err, { unidad: 'm', enteros: false }),
      ['Los rayos del sol llegan con el mismo angulo: los dos triangulos son semejantes.',
        'Altura / sombra es la misma razon en los dos: ' + hPer + '/' + sPer + ' = x/' + sPoste + '.'],
      [hPer + ' / ' + sPer + ' = x / ' + sPoste,
        'x = ' + hPer + ' &times; ' + sPoste + ' / ' + sPer + ' = <b>' + F.n(hPoste, 2) + ' m</b>']);
  };

  EJ.tema({
    id: 'prepa-geometria',
    materia: 'prepa',
    grupo: 'Matematicas',
    nombre: 'Geometria y medicion',
    descripcion: 'Areas, perimetros, angulos, circulo, volumenes, Pitagoras, semejanza y escala.',
    etiquetas: ['area', 'perimetro', 'volumen', 'angulos', 'pitagoras', 'circulo'],
    formulario: 'Triangulo: bh/2 &nbsp;&middot;&nbsp; Trapecio: (B + b)h/2 &nbsp;&middot;&nbsp; Rombo: Dd/2<br>' +
      'Circulo: A = &pi;r' + F.sup(2) + ', P = 2&pi;r &nbsp;&middot;&nbsp; Prisma y cilindro: V = A<sub>base</sub>&middot;h &nbsp;&middot;&nbsp; Piramide y cono: V = A<sub>base</sub>&middot;h/3<br>' +
      'Pitagoras: c' + F.sup(2) + ' = a' + F.sup(2) + ' + b' + F.sup(2) + ' &nbsp;&middot;&nbsp; Angulos del triangulo: 180&deg; &nbsp;&middot;&nbsp; Poligono: (n &minus; 2)&middot;180&deg;',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['areaFigura', 'Areas de figuras'],
          ['perimetro', 'Perimetros'],
          ['angulos', 'Angulos']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['circulo', 'Circulo'],
          ['volumen', 'Volumenes'],
          ['pitagoras', 'Teorema de Pitagoras']
        ]);
      } else {
        t = r.subtema([
          ['areaSombreada', 'Areas sombreadas'],
          ['escala', 'Escala: areas y volumenes'],
          ['semejanza', 'Triangulos semejantes']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
