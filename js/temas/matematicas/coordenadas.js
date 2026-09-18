/* Coordenadas rectangulares y polares */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function rad(g) { return g * Math.PI / 180; }
  function deg(x) { return x * 180 / Math.PI; }
  function normaliza(g) { var v = g % 360; return v < 0 ? v + 360 : v; }

  var extra = {};

  extra.distanciaPuntoMedio = function (r) {
    var x1 = r.entero(-10, 10), y1 = r.entero(-10, 10);
    var x2 = r.entero(-10, 10), y2 = r.entero(-10, 10);
    while (x1 === x2 && y1 === y2) { x2 = r.entero(-10, 10); y2 = r.entero(-10, 10); }
    var d = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    return {
      enunciado: 'Dados A(' + x1 + ', ' + y1 + ') y B(' + x2 + ', ' + y2 + '):<br>' +
        'calcula la distancia AB y las coordenadas del punto medio (2 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Distancia', resp: R.numero(d, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Punto medio x', resp: R.numero((x1 + x2) / 2, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Punto medio y', resp: R.numero((y1 + y2) / 2, { dec: 2, tol: 0.01 }) }
      ]),
      pistas: ['Distancia: d = &radic;<span class="rad">(x&#8322;&minus;x&#8321;)&sup2; + (y&#8322;&minus;y&#8321;)&sup2;</span>. Punto medio: promedio de cada coordenada.',
        '&Delta;x = ' + (x2 - x1) + ' y &Delta;y = ' + (y2 - y1) + '.'],
      solucion: ['d = &radic;<span class="rad">(' + (x2 - x1) + ')&sup2; + (' + (y2 - y1) + ')&sup2;</span> = &radic;<span class="rad">' + ((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)) + '</span> = <b>' + F.n(d, 2) + '</b>',
        'Punto medio x = (' + x1 + ' + ' + x2 + ')/2 = <b>' + F.n((x1 + x2) / 2, 2) + '</b>',
        'Punto medio y = (' + y1 + ' + ' + y2 + ')/2 = <b>' + F.n((y1 + y2) / 2, 2) + '</b>']
    };
  };

  extra.aPolarEcuacion = function (r) {
    var a = r.entero(2, 9);
    var esX = r.bool();
    return {
      enunciado: 'Convierte a forma polar la ecuacion:<br><span class="big">x&sup2; + y&sup2; &minus; ' + (2 * a) + (esX ? 'x' : 'y') + ' = 0</span><br>' +
        'El resultado es r = k &middot; (cos&theta; o sen&theta;). Indica k y cual de las dos funciones es.',
      respuesta: R.varios([
        { etiqueta: 'Valor de k', resp: R.numero(2 * a, { dec: 2 }) },
        { etiqueta: 'Funcion', resp: R.opcion(['cos&theta;', 'sen&theta;'], esX ? 0 : 1) }
      ]),
      pistas: ['Usa las identidades x&sup2; + y&sup2; = r&sup2;, x = r cos&theta; y y = r sen&theta;.',
        'Queda r&sup2; = ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + '; divide todo entre r.'],
      solucion: ['Sustituyo: r&sup2; &minus; ' + (2 * a) + (esX ? ' r cos&theta;' : ' r sen&theta;') + ' = 0',
        'Factorizo r: r(r &minus; ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + ') = 0',
        'Resultado: <b>r = ' + (2 * a) + (esX ? ' cos&theta;' : ' sen&theta;') + '</b>',
        'Es una circunferencia de radio ' + a + ' con centro en ' + (esX ? '(' + a + ', 0)' : '(0, ' + a + ')')]
    };
  };

  EJ.tema({
    id: 'coordenadas',
    materia: 'matematicas',
    grupo: 'Geometria analitica',
    nombre: 'Coordenadas rectangulares y polares',
    descripcion: 'Conversion entre (x, y) y (r, &theta;), y ecuaciones en forma polar.',
    formulario: 'De polares a rectangulares: x = r&middot;cos&theta;, y = r&middot;sen&theta;<br>' +
      'De rectangulares a polares: r = &radic;<span class="rad">x&sup2; + y&sup2;</span>, &theta; = arctan(y/x) ajustando el cuadrante<br>' +
      'Identidades utiles: x&sup2; + y&sup2; = r&sup2;, x = r cos&theta;, y = r sen&theta;',

    generar: function (dif, r) {
      var enun, resp, pistas, sol, x, y, rr, th;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['polarARect', 'De polares a rectangulares'],
          ['rectAPolar', 'De rectangulares a polares'],
          ['distanciaPuntoMedio', 'Distancia y punto medio']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        if (tf === 'polarARect') {
          th = r.elige([0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330]);
          rr = r.entero(2, 12);
          x = rr * Math.cos(rad(th)); y = rr * Math.sin(rad(th));
          enun = 'Convierte el punto polar (r, &theta;) = (' + rr + ', ' + th + '&deg;) a coordenadas rectangulares.<br>(2 decimales)';
          resp = R.par(x, y, { dec: 2, tol: 0.01 });
          pistas = ['x = r&middot;cos&theta; y y = r&middot;sen&theta;.',
            'cos ' + th + '&deg; = ' + F.n(Math.cos(rad(th)), 4) + ' y sen ' + th + '&deg; = ' + F.n(Math.sin(rad(th)), 4) + '.'];
          sol = ['x = ' + rr + '&middot;cos ' + th + '&deg; = ' + rr + '(' + F.n(Math.cos(rad(th)), 4) + ') = <b>' + F.n(x, 2) + '</b>',
            'y = ' + rr + '&middot;sen ' + th + '&deg; = ' + rr + '(' + F.n(Math.sin(rad(th)), 4) + ') = <b>' + F.n(y, 2) + '</b>',
            'Punto: (' + F.n(x, 2) + ', ' + F.n(y, 2) + ')'];
        } else {
          var base = r.elige([[3, 4], [5, 12], [6, 8], [8, 15], [1, 1], [2, 2], [0, 5], [7, 0]]);
          x = base[0] * r.elige([1, -1]); y = base[1] * r.elige([1, -1]);
          rr = Math.sqrt(x * x + y * y);
          th = normaliza(deg(Math.atan2(y, x)));
          enun = 'Convierte el punto (' + x + ', ' + y + ') a coordenadas polares.<br>Da r y &theta; en grados entre 0&deg; y 360&deg; (2 decimales).';
          resp = R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 });
          pistas = ['r = &radic;<span class="rad">x&sup2; + y&sup2;</span> y &theta; = arctan(y/x), pero cuida el cuadrante.',
            'El punto esta en el cuadrante ' + (x >= 0 ? (y >= 0 ? 'I' : 'IV') : (y >= 0 ? 'II' : 'III')) + ', asi que &theta; debe quedar ahi.'];
          sol = ['r = &radic;<span class="rad">' + (x * x) + ' + ' + (y * y) + '</span> = <b>' + F.n(rr, 2) + '</b>',
            '&theta; de referencia: arctan(|' + y + '|/|' + x + '|)',
            'Ajustando al cuadrante: &theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        }
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['aPolar', 'De rectangulares a polares'],
          ['aRect', 'De polares a rectangulares'],
          ['cuadrante', 'Cuadrante y angulo'],
          ['distanciaPuntoMedio', 'Distancia y punto medio']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'aPolar') {
          x = r.enteroNoCero(-12, 12); y = r.enteroNoCero(-12, 12);
          rr = Math.sqrt(x * x + y * y);
          th = normaliza(deg(Math.atan2(y, x)));
          enun = 'Convierte (' + x + ', ' + y + ') a polares con &theta; en [0&deg;, 360&deg;) (2 decimales).';
          resp = R.par(rr, th, { etiquetas: ['r', '&theta; (&deg;)'], dec: 2, tol: 0.02 });
          pistas = ['Calcula primero el angulo de referencia con los valores absolutos.',
            'Angulo de referencia: ' + F.n(deg(Math.atan(Math.abs(y / x))), 2) + '&deg;. Ahora ubicalo en el cuadrante correcto.'];
          sol = ['r = &radic;<span class="rad">' + (x * x) + ' + ' + (y * y) + '</span> = <b>' + F.n(rr, 2) + '</b>',
            'Cuadrante ' + (x >= 0 ? (y >= 0 ? 'I' : 'IV') : (y >= 0 ? 'II' : 'III')) + ', angulo de referencia ' + F.n(deg(Math.atan(Math.abs(y / x))), 2) + '&deg;',
            '&theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        } else if (t === 'aRect') {
          th = r.entero(1, 359); rr = r.entero(2, 15);
          x = rr * Math.cos(rad(th)); y = rr * Math.sin(rad(th));
          enun = 'Convierte el punto polar (' + rr + ', ' + th + '&deg;) a rectangulares (2 decimales).';
          resp = R.par(x, y, { dec: 2, tol: 0.02 });
          pistas = ['x = r cos&theta;, y = r sen&theta;. Respeta los signos del cuadrante.',
            'cos ' + th + '&deg; = ' + F.n(Math.cos(rad(th)), 4) + ', sen ' + th + '&deg; = ' + F.n(Math.sin(rad(th)), 4) + '.'];
          sol = ['x = ' + rr + '(' + F.n(Math.cos(rad(th)), 4) + ') = <b>' + F.n(x, 2) + '</b>',
            'y = ' + rr + '(' + F.n(Math.sin(rad(th)), 4) + ') = <b>' + F.n(y, 2) + '</b>'];
        } else {
          x = r.enteroNoCero(-9, 9); y = r.enteroNoCero(-9, 9);
          var cuad = x > 0 ? (y > 0 ? 'I' : 'IV') : (y > 0 ? 'II' : 'III');
          th = normaliza(deg(Math.atan2(y, x)));
          enun = '&iquest;En que cuadrante esta el punto (' + x + ', ' + y + ') y cual es su angulo polar &theta; en [0&deg;, 360&deg;)?<br>(2 decimales)';
          resp = R.varios([
            { etiqueta: 'Cuadrante (I, II, III o IV)', resp: R.texto(cuad, { alternativas: [cuad.toLowerCase(), String(['I', 'II', 'III', 'IV'].indexOf(cuad) + 1)] }) },
            { etiqueta: '&theta; (&deg;)', resp: R.numero(th, { dec: 2, tol: 0.02 }) }
          ]);
          pistas = ['El cuadrante depende de los signos: (+,+) I, (&minus;,+) II, (&minus;,&minus;) III, (+,&minus;) IV.',
            'La calculadora da arctan(' + y + '/' + x + ') = ' + F.n(deg(Math.atan(y / x)), 2) + '&deg;; sumale 180&deg; o 360&deg; segun el cuadrante.'];
          sol = ['Signos (' + (x > 0 ? '+' : '&minus;') + ', ' + (y > 0 ? '+' : '&minus;') + ') &rArr; cuadrante <b>' + cuad + '</b>',
            '&theta; = <b>' + F.n(th, 2) + '&deg;</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['ecuacionCirculo', 'Ecuacion polar de una circunferencia'],
          ['ecuacionRecta', 'Ecuacion polar de una recta'],
          ['aPolarEc', 'Distancia entre puntos polares'],
          ['aPolarEcuacion', 'De rectangular a polar']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'ecuacionCirculo') {
          var a = r.entero(2, 8);
          var esCos = r.bool();
          enun = 'La ecuacion polar r = ' + (2 * a) + (esCos ? ' cos' : ' sen') + '&theta; representa una circunferencia.<br>' +
            'Encuentra su centro (en rectangulares) y su radio.';
          resp = R.varios([
            { etiqueta: 'Centro x', resp: R.numero(esCos ? a : 0, { dec: 2 }) },
            { etiqueta: 'Centro y', resp: R.numero(esCos ? 0 : a, { dec: 2 }) },
            { etiqueta: 'Radio', resp: R.numero(a, { dec: 2 }) }
          ]);
          pistas = ['Multiplica los dos lados por r para poder usar r&sup2; = x&sup2; + y&sup2; y r cos&theta; = x.',
            'Queda x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y') + '; ahora completa el cuadrado.'];
          sol = ['Multiplico por r: r&sup2; = ' + (2 * a) + (esCos ? ' r cos&theta;' : ' r sen&theta;'),
            'Sustituyo: x&sup2; + y&sup2; = ' + (2 * a) + (esCos ? 'x' : 'y'),
            'Completo el cuadrado: ' + (esCos ? '(x &minus; ' + a + ')&sup2; + y&sup2; = ' + (a * a) : 'x&sup2; + (y &minus; ' + a + ')&sup2; = ' + (a * a)),
            'Centro <b>(' + (esCos ? a + ', 0' : '0, ' + a) + ')</b>, radio <b>' + a + '</b>'];
        } else if (t2 === 'ecuacionRecta') {
          var A = r.enteroNoCero(-5, 5), B = r.enteroNoCero(-5, 5), C = r.enteroNoCero(-12, 12);
          /* si B = -A la recta es paralela a la direccion 45 grados y r se va al infinito */
          while (B === -A) B = r.enteroNoCero(-5, 5);
          enun = 'Escribe la ecuacion ' + F.une([F.term(A, 'x', 1), F.term(B, 'y', 1)]) + ' = ' + C + ' en forma polar,<br>' +
            'y calcula r cuando &theta; = 45&deg; (2 decimales).';
          var denom = A * Math.cos(rad(45)) + B * Math.sin(rad(45));
          resp = R.numero(C / denom, { dec: 2, tol: 0.02 });
          pistas = ['Sustituye x = r cos&theta; y y = r sen&theta; y despeja r.',
            'r = C / (A cos&theta; + B sen&theta;) = ' + C + ' / (' + A + 'cos45&deg; + ' + B + 'sen45&deg;).'];
          sol = ['Sustituyendo: ' + A + '(r cos&theta;) + ' + B + '(r sen&theta;) = ' + C,
            'r(' + A + 'cos&theta; + ' + B + 'sen&theta;) = ' + C + ' &rArr; r = ' + C + '/(' + A + 'cos&theta; + ' + B + 'sen&theta;)',
            'Con &theta; = 45&deg;: denominador = ' + F.n(denom, 4),
            'r = <b>' + F.n(C / denom, 2) + '</b>'];
        } else {
          var r1 = r.entero(2, 10), t1 = r.elige([0, 30, 45, 60, 90, 120]);
          var r2 = r.entero(2, 10), t2b = r.elige([150, 180, 210, 240, 270, 300]);
          var dAng = Math.abs(t2b - t1);
          var d = Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(rad(dAng)));
          enun = 'Calcula la distancia entre los puntos polares P(' + r1 + ', ' + t1 + '&deg;) y Q(' + r2 + ', ' + t2b + '&deg;).<br>(2 decimales)';
          resp = R.numero(d, { dec: 2, tol: 0.02 });
          pistas = ['Puedes pasarlos a rectangulares, o usar directamente la ley de cosenos con el angulo entre los radios.',
            'El angulo entre los radios es ' + dAng + '&deg;.'];
          sol = ['d&sup2; = r&sub1;&sup2; + r&sub2;&sup2; &minus; 2r&sub1;r&sub2;cos(&theta;&sub2; &minus; &theta;&sub1;)',
            'd&sup2; = ' + (r1 * r1) + ' + ' + (r2 * r2) + ' &minus; ' + F.n(2 * r1 * r2 * Math.cos(rad(dAng)), 3) + ' = ' + F.n(d * d, 3),
            'd = <b>' + F.n(d, 2) + '</b>'];
        }
      }

      return { enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
