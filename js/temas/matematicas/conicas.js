/* Secciones conicas */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function cuad(v, h) {   // (x - h)^2 con signo correcto
    if (h === 0) return v + '&sup2;';
    return '(' + v + (h > 0 ? ' &minus; ' + h : ' + ' + (-h)) + ')&sup2;';
  }

  var extra = {};

  extra.circunferencia = function (r) {
    var h = r.entero(-7, 7), k = r.entero(-7, 7), a = r.entero(2, 9);
    return {
      enunciado: 'Encuentra el centro y el radio de la circunferencia:<br><span class="big">' +
        cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '</span>',
      respuesta: R.varios([
        { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
      ]),
      pistas: ['En (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2; el centro es (h, k). Ojo con los signos.',
        'El lado derecho es r&sup2; = ' + (a * a) + '.'],
      solucion: ['Comparo con la forma ordinaria',
        'Centro: <b>(' + h + ', ' + k + ')</b>',
        'r = &radic;<span class="rad">' + (a * a) + '</span> = <b>' + a + '</b>']
    };
  };

  extra.parabolaHorizontal = function (r) {
    var h = r.entero(-6, 6), k = r.entero(-6, 6);
    var p = r.elige([1, 2, 3, -1, -2, -3]);
    return {
      enunciado: 'La parabola <span class="big">' + cuad('y', k) + ' = ' + (4 * p) + '(x ' + (h > 0 ? '&minus; ' + h : '+ ' + (-h)) + ')</span> abre horizontalmente.<br>' +
        'Encuentra su vertice, su foco y hacia donde abre.',
      respuesta: R.varios([
        { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'Foco x', resp: R.numero(h + p, { dec: 2 }) },
        { etiqueta: 'Abre hacia', resp: R.opcion(['La derecha', 'La izquierda'], p > 0 ? 0 : 1) }
      ]),
      pistas: ['Cuando la y es la que esta al cuadrado, la parabola abre a la derecha (p &gt; 0) o a la izquierda (p &lt; 0).',
        '4p = ' + (4 * p) + ' &rArr; p = ' + p + '. El foco se corre p unidades en horizontal desde el vertice.'],
      solucion: ['Vertice: <b>(' + h + ', ' + k + ')</b>',
        '4p = ' + (4 * p) + ' &rArr; p = ' + p,
        'Foco: (h + p, k) = <b>(' + (h + p) + ', ' + k + ')</b>',
        'Como p ' + (p > 0 ? '&gt; 0 abre hacia <b>la derecha</b>' : '&lt; 0 abre hacia <b>la izquierda</b>') + '; directriz x = ' + (h - p)]
    };
  };

  extra.elipseTrasladada = function (r) {
    var h = r.entero(-6, 6), k = r.entero(-6, 6);
    var a = r.entero(4, 9), b = r.entero(2, a - 1);
    var c = Math.sqrt(a * a - b * b);
    return {
      enunciado: 'Para la elipse <span class="big">' + F.frac(cuad('x', h), a * a) + ' + ' + F.frac(cuad('y', k), b * b) + ' = 1</span><br>' +
        'encuentra el centro, el valor de c y las coordenadas del foco derecho (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
        { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
        { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Foco derecho x', resp: R.numero(h + c, { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['El centro sale de los parentesis, con signo cambiado.',
        'c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + ', y los focos estan sobre el eje mayor (horizontal).'],
      solucion: ['Centro: <b>(' + h + ', ' + k + ')</b>',
        'a&sup2; = ' + (a * a) + ', b&sup2; = ' + (b * b),
        'c = &radic;<span class="rad">' + (a * a - b * b) + '</span> = <b>' + F.n(c, 2) + '</b>',
        'Focos: (h &plusmn; c, k) &rArr; el derecho es <b>(' + F.n(h + c, 2) + ', ' + k + ')</b>']
    };
  };

  EJ.tema({
    id: 'conicas',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Secciones conicas',
    descripcion: 'Identificar circunferencia, parabola, elipse e hiperbola y encontrar sus elementos.',
    formulario: 'Circunferencia: (x&minus;h)&sup2; + (y&minus;k)&sup2; = r&sup2;<br>' +
      'Parabola: (x&minus;h)&sup2; = 4p(y&minus;k) &nbsp; (foco a distancia p del vertice)<br>' +
      'Elipse: (x&minus;h)&sup2;/a&sup2; + (y&minus;k)&sup2;/b&sup2; = 1, con c&sup2; = a&sup2; &minus; b&sup2;<br>' +
      'Hiperbola: (x&minus;h)&sup2;/a&sup2; &minus; (y&minus;k)&sup2;/b&sup2; = 1, con c&sup2; = a&sup2; + b&sup2;',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, h, k, a, b, c;
      var TIPOS = ['Circunferencia', 'Parabola', 'Elipse', 'Hiperbola'];

      if (dif === 'facil') {
        var tf = r.subtema([
          ['identificar', 'Identificar la conica'],
          ['circunferencia', 'Centro y radio']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var idx = r.entero(0, 3);
        var A, C, ec;
        if (idx === 0) {
          A = r.elige([1, 2, 3, 4]);
          ec = A + 'x&sup2; + ' + A + 'y&sup2; ' + (r.bool() ? '+ ' + r.entero(1, 9) + 'x ' : '') + '&minus; ' + r.entero(2, 30) + ' = 0';
        } else if (idx === 1) {
          ec = r.bool()
            ? r.entero(1, 5) + 'x&sup2; &minus; ' + r.entero(2, 9) + 'y + ' + r.entero(1, 9) + ' = 0'
            : r.entero(1, 5) + 'y&sup2; + ' + r.entero(2, 9) + 'x &minus; ' + r.entero(1, 9) + ' = 0';
        } else if (idx === 2) {
          A = r.entero(2, 9); C = r.enteroExcepto(2, 9, [A]);
          ec = A + 'x&sup2; + ' + C + 'y&sup2; &minus; ' + r.entero(10, 60) + ' = 0';
        } else {
          A = r.entero(2, 9); C = r.entero(2, 9);
          ec = r.bool() ? A + 'x&sup2; &minus; ' + C + 'y&sup2; &minus; ' + r.entero(5, 40) + ' = 0'
            : '&minus;' + A + 'x&sup2; + ' + C + 'y&sup2; &minus; ' + r.entero(5, 40) + ' = 0';
        }
        enun = '&iquest;Que conica representa la ecuacion?<br><span class="big">' + ec + '</span>';
        resp = R.opcion(TIPOS, idx);
        pistas = ['Fijate en los terminos cuadraticos: cuantos hay, si tienen el mismo coeficiente y si tienen el mismo signo.',
          'Regla rapida: falta un cuadrado &rarr; parabola; mismos coeficientes &rarr; circunferencia; mismo signo pero distintos &rarr; elipse; signos contrarios &rarr; hiperbola.'];
        sol = ['Observo los coeficientes de x&sup2; y y&sup2;',
          idx === 0 ? 'Los dos cuadrados tienen el MISMO coeficiente' :
            idx === 1 ? 'Solo aparece UNA variable al cuadrado' :
              idx === 2 ? 'Los dos cuadrados tienen el mismo signo pero distinto coeficiente' :
                'Los cuadrados tienen SIGNOS CONTRARIOS',
          'Es una <b>' + TIPOS[idx] + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['circulo', 'Circunferencia: centro y radio'],
          ['parabola', 'Parabola vertical'],
          ['parabolaHorizontal', 'Parabola horizontal'],
          ['elipse', 'Elipse: a, b y c']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'circulo') {
          h = r.entero(-7, 7); k = r.entero(-7, 7); a = r.entero(2, 9);
          enun = 'Encuentra el centro y el radio de la circunferencia:<br><span class="big">' +
            cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a) + '</span>';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
          ]);
          pistas = ['En (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2; el centro es (h, k). Cuidado con los signos.',
            'El lado derecho es r&sup2; = ' + (a * a) + ', asi que r = &radic;<span class="rad">' + (a * a) + '</span>.'];
          sol = ['Comparo con (x &minus; h)&sup2; + (y &minus; k)&sup2; = r&sup2;',
            'Centro: <b>(' + h + ', ' + k + ')</b>',
            'r = &radic;<span class="rad">' + (a * a) + '</span> = <b>' + a + '</b>'];
        } else if (t === 'parabola') {
          h = r.entero(-6, 6); k = r.entero(-6, 6);
          var p = r.elige([1, 2, 3, -1, -2, -3]);
          enun = 'Encuentra el vertice y el foco de la parabola:<br><span class="big">' +
            cuad('x', h) + ' = ' + (4 * p) + '(y ' + (k > 0 ? '&minus; ' + k : '+ ' + (-k)) + ')</span>';
          resp = R.varios([
            { etiqueta: 'Vertice x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Vertice y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Foco x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Foco y', resp: R.numero(k + p, { dec: 2 }) }
          ]);
          pistas = ['La forma (x &minus; h)&sup2; = 4p(y &minus; k) tiene vertice (h, k) y abre hacia arriba si p &gt; 0.',
            '4p = ' + (4 * p) + ' &rArr; p = ' + p + '. El foco esta p unidades arriba (o abajo) del vertice.'];
          sol = ['Vertice: <b>(' + h + ', ' + k + ')</b>',
            '4p = ' + (4 * p) + ' &rArr; p = ' + p,
            'El eje es vertical, asi que el foco es (h, k + p) = <b>(' + h + ', ' + (k + p) + ')</b>',
            'Directriz: y = ' + (k - p)];
        } else {
          a = r.entero(3, 9); b = r.entero(2, a - 1);
          c = Math.sqrt(a * a - b * b);
          enun = 'Para la elipse <span class="big">' + F.frac('x&sup2;', a * a) + ' + ' + F.frac('y&sup2;', b * b) + ' = 1</span><br>' +
            'encuentra a, b y c (2 decimales).';
          resp = R.varios([
            { etiqueta: 'a', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'b', resp: R.numero(b, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['a es la raiz del denominador MAYOR y b la del menor.',
            'En la elipse c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a) + ' &minus; ' + (b * b) + ' = ' + (a * a - b * b) + '.'];
          sol = ['a&sup2; = ' + (a * a) + ' &rArr; a = <b>' + a + '</b>',
            'b&sup2; = ' + (b * b) + ' &rArr; b = <b>' + b + '</b>',
            'c&sup2; = a&sup2; &minus; b&sup2; = ' + (a * a - b * b) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'Focos en (&plusmn;' + F.n(c, 2) + ', 0), vertices en (&plusmn;' + a + ', 0)'];
        }
      } else {
        var t2 = r.subtema([
          ['general', 'Completar el cuadrado'],
          ['hiperbola', 'Hiperbola: c, vertices y asintotas'],
          ['elipseTrasladada', 'Elipse con centro (h, k)'],
          ['construir', 'Escribir la ecuacion']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'general') {
          h = r.entero(-6, 6); k = r.entero(-6, 6); a = r.entero(2, 8);
          var D = -2 * h, E = -2 * k, Fc = h * h + k * k - a * a;
          enun = 'Completa el cuadrado y encuentra el centro y el radio de:<br><span class="big">' +
            'x&sup2; + y&sup2; ' + (D >= 0 ? '+ ' + D : '&minus; ' + (-D)) + 'x ' + (E >= 0 ? '+ ' + E : '&minus; ' + (-E)) + 'y ' +
            (Fc >= 0 ? '+ ' + Fc : '&minus; ' + (-Fc)) + ' = 0</span>';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(h, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(k, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Agrupa los terminos de x y los de y, y completa el cuadrado en cada grupo.',
            'La mitad de ' + D + ' es ' + (D / 2) + ' y su cuadrado es ' + (D / 2) * (D / 2) + '; igual con y.'];
          sol = ['Agrupo: (x&sup2; ' + (D >= 0 ? '+ ' + D : '&minus; ' + (-D)) + 'x) + (y&sup2; ' + (E >= 0 ? '+ ' + E : '&minus; ' + (-E)) + 'y) = ' + (-Fc),
            'Completo cuadrados sumando ' + ((D / 2) * (D / 2)) + ' y ' + ((E / 2) * (E / 2)) + ' en ambos lados',
            cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a),
            'Centro <b>(' + h + ', ' + k + ')</b>, radio <b>' + a + '</b>'];
        } else if (t2 === 'hiperbola') {
          a = r.entero(2, 8); b = r.entero(2, 8);
          c = Math.sqrt(a * a + b * b);
          enun = 'Para la hiperbola <span class="big">' + F.frac('x&sup2;', a * a) + ' &minus; ' + F.frac('y&sup2;', b * b) + ' = 1</span><br>' +
            'encuentra c, las coordenadas de un vertice (el positivo) y la pendiente positiva de las asintotas (2 decimales).';
          resp = R.varios([
            { etiqueta: 'c', resp: R.numero(c, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Vertice x', resp: R.numero(a, { dec: 2 }) },
            { etiqueta: 'Pendiente', resp: R.numero(b / a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['En la hiperbola se SUMAN: c&sup2; = a&sup2; + b&sup2;.',
            'Las asintotas de esta hiperbola son y = &plusmn;(b/a)x = &plusmn;(' + b + '/' + a + ')x.'];
          sol = ['a = ' + a + ', b = ' + b,
            'c&sup2; = ' + (a * a) + ' + ' + (b * b) + ' = ' + (a * a + b * b) + ' &rArr; c = <b>' + F.n(c, 2) + '</b>',
            'Vertices en (&plusmn;a, 0) = <b>(' + a + ', 0)</b> y (' + (-a) + ', 0)',
            'Asintotas: y = &plusmn;' + F.frac(b, a) + 'x, pendiente <b>' + F.n(b / a, 2) + '</b>'];
        } else {
          h = r.entero(-5, 5); k = r.entero(-5, 5); a = r.entero(2, 8);
          enun = 'Escribe la ecuacion de la circunferencia con centro (' + h + ', ' + k + ') que pasa por el punto (' + (h + a) + ', ' + k + ').<br>' +
            'Da el radio y el valor del lado derecho de la ecuacion (x &minus; h)&sup2; + (y &minus; k)&sup2; = ?';
          resp = R.varios([
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Lado derecho (r&sup2;)', resp: R.numero(a * a, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['El radio es la distancia del centro al punto dado.',
            'Como tienen la misma y, la distancia es simplemente |' + (h + a) + ' &minus; (' + h + ')| = ' + a + '.'];
          sol = ['r = distancia entre (' + h + ', ' + k + ') y (' + (h + a) + ', ' + k + ') = <b>' + a + '</b>',
            'r&sup2; = <b>' + (a * a) + '</b>',
            'Ecuacion: ' + cuad('x', h) + ' + ' + cuad('y', k) + ' = ' + (a * a)];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
