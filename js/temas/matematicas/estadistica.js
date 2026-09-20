/* Estadistica: elementos y medidas */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function media(v) { return v.reduce(function (a, b) { return a + b; }, 0) / v.length; }
  function mediana(v) {
    var s = v.slice().sort(function (a, b) { return a - b; });
    var n = s.length, m = Math.floor(n / 2);
    return n % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  }
  function moda(v) {
    var cuenta = {}, mejor = null, max = 0;
    v.forEach(function (x) {
      cuenta[x] = (cuenta[x] || 0) + 1;
      if (cuenta[x] > max) { max = cuenta[x]; mejor = x; }
    });
    return mejor;
  }
  function varianzaPob(v) {
    var m = media(v);
    return v.reduce(function (a, x) { return a + (x - m) * (x - m); }, 0) / v.length;
  }
  function tabla(datos) {
    return '<table class="tabla"><tr><th>x</th>' + datos.map(function (d) { return '<td>' + d.x + '</td>'; }).join('') + '</tr>' +
      '<tr><th>f</th>' + datos.map(function (d) { return '<td>' + d.f + '</td>'; }).join('') + '</tr></table>';
  }

  var extra = {};

  extra.rangoModa = function (r) {
    var datos = [];
    var rep = r.entero(2, 12);
    datos.push(rep, rep, rep);
    while (datos.length < 8) {
      var v = r.entero(1, 20);
      if (datos.indexOf(v) === -1) datos.push(v);
    }
    datos = r.baraja(datos);
    var max = Math.max.apply(null, datos), min = Math.min.apply(null, datos);
    return {
      enunciado: 'Para los datos:<br><span class="big">' + datos.join(', ') + '</span><br>calcula el rango y la moda.',
      respuesta: R.varios([
        { etiqueta: 'Rango', resp: R.numero(max - min, { dec: 0 }) },
        { etiqueta: 'Moda', resp: R.numero(moda(datos), { dec: 0 }) }
      ]),
      pistas: ['El rango es el dato mayor menos el dato menor.',
        'Mayor = ' + max + ', menor = ' + min + '. La moda es el valor que mas se repite.'],
      solucion: ['Rango = ' + max + ' &minus; ' + min + ' = <b>' + (max - min) + '</b>',
        'El valor que aparece mas veces es <b>' + moda(datos) + '</b>']
    };
  };

  extra.muestral = function (r) {
    var datos = [];
    for (var i = 0; i < r.entero(5, 7); i++) datos.push(r.entero(2, 20));
    var m = media(datos);
    var sumaCuad = datos.reduce(function (a, x) { return a + (x - m) * (x - m); }, 0);
    var vMuestral = sumaCuad / (datos.length - 1);
    var vPoblacional = sumaCuad / datos.length;
    return {
      enunciado: 'Estos datos son una MUESTRA:<br><span class="big">' + datos.join(', ') + '</span><br>' +
        'Calcula la varianza muestral (dividiendo entre n &minus; 1) y su desviacion estandar (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Varianza muestral', resp: R.numero(vMuestral, { dec: 4, tol: 0.01 }) },
        { etiqueta: 'Desviacion muestral', resp: R.numero(Math.sqrt(vMuestral), { dec: 4, tol: 0.01 }) }
      ]),
      pistas: ['Es igual que la poblacional, pero al final se divide entre n &minus; 1 = ' + (datos.length - 1) + '.',
        'Media = ' + F.n(m, 4) + ' y &Sigma;(x &minus; x&#772;)&sup2; = ' + F.n(sumaCuad, 4) + '.'],
      solucion: ['Media: ' + F.n(m, 4),
        '&Sigma;(x &minus; x&#772;)&sup2; = ' + F.n(sumaCuad, 4),
        's&sup2; = ' + F.n(sumaCuad, 4) + ' / ' + (datos.length - 1) + ' = <b>' + F.n(vMuestral, 4) + '</b>',
        's = <b>' + F.n(Math.sqrt(vMuestral), 4) + '</b>',
        '(Si fuera poblacional se dividiria entre ' + datos.length + ' y daria ' + F.n(vPoblacional, 4) + ')']
    };
  };

  extra.agrupados = function (r) {
    var inicio = r.entero(0, 20), ancho = r.elige([5, 10]);
    var filas = [];
    for (var i = 0; i < 4; i++) {
      filas.push({ li: inicio + i * ancho, ls: inicio + (i + 1) * ancho, f: r.entero(2, 12) });
    }
    var N = filas.reduce(function (a, x) { return a + x.f; }, 0);
    var suma = filas.reduce(function (a, x) { return a + ((x.li + x.ls) / 2) * x.f; }, 0);
    var mediaAprox = suma / N;
    var tablaHtml = '<table class="tabla"><tr><th>Clase</th>' +
      filas.map(function (x) { return '<td>' + x.li + ' &ndash; ' + x.ls + '</td>'; }).join('') + '</tr>' +
      '<tr><th>f</th>' + filas.map(function (x) { return '<td>' + x.f + '</td>'; }).join('') + '</tr></table>';
    return {
      enunciado: 'Datos agrupados en intervalos de clase:' + tablaHtml +
        'Calcula la marca de clase del PRIMER intervalo y la media aproximada (4 decimales).',
      respuesta: R.varios([
        { etiqueta: 'Marca de clase 1', resp: R.numero((filas[0].li + filas[0].ls) / 2, { dec: 2, tol: 0.01 }) },
        { etiqueta: 'Media aproximada', resp: R.numero(mediaAprox, { dec: 4, tol: 0.01 }) }
      ]),
      pistas: ['La marca de clase es el punto medio del intervalo: (limite inferior + limite superior)/2.',
        'Media = &Sigma;(marca &times; f) / &Sigma;f, con &Sigma;f = ' + N + '.'],
      solucion: ['Marca de clase 1 = (' + filas[0].li + ' + ' + filas[0].ls + ')/2 = <b>' + F.n((filas[0].li + filas[0].ls) / 2, 2) + '</b>',
        'Marcas: ' + filas.map(function (x) { return F.n((x.li + x.ls) / 2, 1); }).join(', '),
        '&Sigma;(marca &times; f) = ' + F.n(suma, 2) + ' y &Sigma;f = ' + N,
        'Media aproximada = <b>' + F.n(mediaAprox, 4) + '</b>']
    };
  };

  EJ.tema({
    id: 'estadistica',
    materia: 'matematicas',
    grupo: 'Probabilidad y estadistica',
    nombre: 'Estadistica: elementos y medidas',
    descripcion: 'Media, mediana, moda, rango, varianza, desviacion estandar y tablas de frecuencia.',
    formulario: 'Media: x&#772; = &Sigma;x/n &nbsp;&middot;&nbsp; Mediana: el valor de en medio con los datos ordenados<br>' +
      'Moda: el dato que mas se repite &nbsp;&middot;&nbsp; Rango: maximo &minus; minimo<br>' +
      'Varianza poblacional: &sigma;&sup2; = &Sigma;(x &minus; x&#772;)&sup2;/n &nbsp;&middot;&nbsp; Desviacion estandar: &sigma; = &radic;<span class="rad">&sigma;&sup2;</span><br>' +
      'Con tabla de frecuencias: x&#772; = &Sigma;xf / &Sigma;f',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, datos, i;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['medidasCentrales', 'Media, mediana y moda'],
          ['rangoModa', 'Rango y moda']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var repetido = r.entero(2, 9);
        datos = [repetido, repetido, repetido];
        var usados = [repetido];
        while (datos.length < 7) {
          var v = r.entero(1, 15);
          if (usados.indexOf(v) === -1) { datos.push(v); usados.push(v); }
        }
        datos = r.baraja(datos);
        guiaDelPaso = EJ.guia.medidasCentrales(datos);
        enun = 'Para los datos:<br><span class="big">' + datos.join(', ') + '</span><br>calcula la media, la mediana y la moda.';
        resp = R.varios([
          { etiqueta: 'Media', resp: R.numero(media(datos), { dec: 4, tol: 0.005 }) },
          { etiqueta: 'Mediana', resp: R.numero(mediana(datos), { dec: 2, tol: 0.005 }) },
          { etiqueta: 'Moda', resp: R.numero(moda(datos), { dec: 2 }) }
        ]);
        pistas = ['Para la mediana hay que ORDENAR los datos primero.',
          'Ordenados: ' + datos.slice().sort(function (a, b) { return a - b; }).join(', ') + '. Hay ' + datos.length + ' datos.'];
        sol = ['Suma = ' + datos.reduce(function (a, b) { return a + b; }, 0) + ', n = ' + datos.length,
          'Media = ' + datos.reduce(function (a, b) { return a + b; }, 0) + '/' + datos.length + ' = <b>' + F.n(media(datos), 4) + '</b>',
          'Ordenados: ' + datos.slice().sort(function (a, b) { return a - b; }).join(', ') + ' &rArr; el de en medio es <b>' + mediana(datos) + '</b>',
          'El dato que mas se repite es <b>' + moda(datos) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['dispersion', 'Rango, varianza y desviacion'],
          ['muestral', 'Varianza muestral (n &minus; 1)'],
          ['ponderada', 'Media ponderada'],
          ['faltante', 'Dato que falta']
        ]);
        if (extra[t]) return extra[t](r, dif);
        if (t === 'dispersion') {
          datos = [];
          for (i = 0; i < r.entero(5, 7); i++) datos.push(r.entero(2, 20));
          var vp = varianzaPob(datos);
          enun = 'Para los datos:<br><span class="big">' + datos.join(', ') + '</span><br>' +
            'calcula el rango, la varianza POBLACIONAL y la desviacion estandar (4 decimales).';
          resp = R.varios([
            { etiqueta: 'Rango', resp: R.numero(Math.max.apply(null, datos) - Math.min.apply(null, datos), { dec: 2 }) },
            { etiqueta: 'Varianza', resp: R.numero(vp, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Desviacion', resp: R.numero(Math.sqrt(vp), { dec: 4, tol: 0.01 }) }
          ]);
          pistas = ['Necesitas primero la media: x&#772; = ' + F.n(media(datos), 4) + '.',
            'Varianza poblacional: suma los (x &minus; x&#772;)&sup2; y divide entre n = ' + datos.length + '.'];
          sol = ['Media: ' + F.n(media(datos), 4),
            'Rango = ' + Math.max.apply(null, datos) + ' &minus; ' + Math.min.apply(null, datos) + ' = <b>' + (Math.max.apply(null, datos) - Math.min.apply(null, datos)) + '</b>',
            '&Sigma;(x &minus; x&#772;)&sup2; = ' + F.n(vp * datos.length, 4),
            '&sigma;&sup2; = ' + F.n(vp * datos.length, 4) + '/' + datos.length + ' = <b>' + F.n(vp, 4) + '</b>',
            '&sigma; = &radic;<span class="rad">' + F.n(vp, 4) + '</span> = <b>' + F.n(Math.sqrt(vp), 4) + '</b>'];
        } else if (t === 'ponderada') {
          var pesos = [r.entero(10, 40), r.entero(10, 40), r.entero(10, 40)];
          var suma = pesos.reduce(function (a, b) { return a + b; }, 0);
          pesos = pesos.map(function (p) { return Math.round(p * 100 / suma); });
          pesos[2] = 100 - pesos[0] - pesos[1];
          var cal = [r.entero(50, 100), r.entero(50, 100), r.entero(50, 100)];
          var prom = (cal[0] * pesos[0] + cal[1] * pesos[1] + cal[2] * pesos[2]) / 100;
          enun = 'Una materia se califica asi: examenes ' + pesos[0] + '%, tareas ' + pesos[1] + '% y proyecto ' + pesos[2] + '%.<br>' +
            'Un alumno saco ' + cal[0] + ', ' + cal[1] + ' y ' + cal[2] + ' respectivamente.<br>&iquest;Cual es su promedio final? (4 decimales)';
          resp = R.numero(prom, { dec: 4, tol: 0.01 });
          pistas = ['Es una media ponderada: multiplica cada calificacion por su peso y suma.',
            '(' + cal[0] + '&times;' + pesos[0] + ' + ' + cal[1] + '&times;' + pesos[1] + ' + ' + cal[2] + '&times;' + pesos[2] + ') / 100'];
          sol = ['Media ponderada = &Sigma;(valor &times; peso) / &Sigma;pesos',
            '= (' + (cal[0] * pesos[0]) + ' + ' + (cal[1] * pesos[1]) + ' + ' + (cal[2] * pesos[2]) + ') / 100',
            '= <b>' + F.n(prom, 4) + '</b>'];
        } else {
          var objetivo = r.entero(6, 12);
          var n = r.entero(4, 6);
          datos = [];
          for (i = 0; i < n - 1; i++) datos.push(r.entero(2, 18));
          var falta = objetivo * n - datos.reduce(function (a, b) { return a + b; }, 0);
          enun = 'Un conjunto de ' + n + ' datos tiene media ' + objetivo + '.<br>' +
            'Si ' + (n - 1) + ' de los datos son ' + datos.join(', ') + ', &iquest;cuanto vale el dato que falta?';
          resp = R.numero(falta, { dec: 2 });
          pistas = ['Si la media es ' + objetivo + ' con ' + n + ' datos, la suma total debe ser ' + objetivo + ' &times; ' + n + '.',
            'Suma total = ' + (objetivo * n) + '; lo que ya tienes suma ' + datos.reduce(function (a, b) { return a + b; }, 0) + '.'];
          sol = ['Suma total necesaria = ' + objetivo + ' &times; ' + n + ' = ' + (objetivo * n),
            'Suma de los conocidos = ' + datos.reduce(function (a, b) { return a + b; }, 0),
            'Dato faltante = ' + (objetivo * n) + ' &minus; ' + datos.reduce(function (a, b) { return a + b; }, 0) + ' = <b>' + falta + '</b>'];
        }
      } else {
        var t2 = r.subtema([
          ['tablaFrec', 'Tabla de frecuencias'],
          ['agrupados', 'Datos agrupados en clases'],
          ['cuartiles', 'Cuartiles'],
          ['comparacion', 'Comparar dos grupos']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        if (t2 === 'tablaFrec') {
          /* valores distintos y frecuencias distintas, para que la moda sea unica */
          var filas = [];
          var frecs = r.muestra([1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
          var xInicial = r.entero(1, 4);
          for (i = 0; i < 5; i++) filas.push({ x: xInicial + i * r.entero(1, 2) + i, f: frecs[i] });
          filas.sort(function (a, b) { return a.x - b.x; });
          var N = filas.reduce(function (a, d) { return a + d.f; }, 0);
          var sumaXF = filas.reduce(function (a, d) { return a + d.x * d.f; }, 0);
          var m = sumaXF / N;
          var acumulado = 0, med = null, pos = N / 2;
          for (i = 0; i < filas.length; i++) {
            acumulado += filas[i].f;
            if (med === null && acumulado >= Math.ceil(pos)) med = filas[i].x;
          }
          var modaF = filas.reduce(function (a, d) { return d.f > a.f ? d : a; }, filas[0]).x;
          enun = 'A partir de la tabla de frecuencias:' + tabla(filas) +
            'calcula la media, la mediana y la moda (4 decimales en la media).';
          resp = R.varios([
            { etiqueta: 'Media', resp: R.numero(m, { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Mediana', resp: R.numero(med, { dec: 2, tol: 0.5 }) },
            { etiqueta: 'Moda', resp: R.numero(modaF, { dec: 2 }) }
          ]);
          pistas = ['La media con frecuencias es &Sigma;xf / &Sigma;f.',
            '&Sigma;f = ' + N + ' y &Sigma;xf = ' + sumaXF + '. Para la mediana usa la frecuencia acumulada hasta ' + F.n(N / 2, 1) + '.'];
          sol = ['&Sigma;f = ' + N + ', &Sigma;xf = ' + sumaXF,
            'Media = ' + sumaXF + '/' + N + ' = <b>' + F.n(m, 4) + '</b>',
            'La mediana esta en la posicion ' + Math.ceil(N / 2) + ' de la frecuencia acumulada: <b>' + med + '</b>',
            'La moda es el valor con mayor frecuencia: <b>' + modaF + '</b>'];
        } else if (t2 === 'cuartiles') {
          datos = [];
          for (i = 0; i < 8; i++) datos.push(r.entero(1, 40));
          var s = datos.slice().sort(function (a, b) { return a - b; });
          var q1 = (s[1] + s[2]) / 2, q2 = (s[3] + s[4]) / 2, q3 = (s[5] + s[6]) / 2;
          enun = 'Para los datos ordenados:<br><span class="big">' + s.join(', ') + '</span><br>' +
            'calcula Q&#8321;, Q&#8322; (mediana) y Q&#8323; usando el metodo de las mitades.';
          resp = R.varios([
            { etiqueta: 'Q1', resp: R.numero(q1, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Q2', resp: R.numero(q2, { dec: 2, tol: 0.01 }) },
            { etiqueta: 'Q3', resp: R.numero(q3, { dec: 2, tol: 0.01 }) }
          ]);
          pistas = ['Con 8 datos, Q&#8322; es el promedio de los dos centrales.',
            'Q&#8321; es la mediana de los 4 primeros y Q&#8323; la de los 4 ultimos.'];
          sol = ['Q&#8322; = (' + s[3] + ' + ' + s[4] + ')/2 = <b>' + F.n(q2, 2) + '</b>',
            'Mitad inferior: ' + s.slice(0, 4).join(', ') + ' &rArr; Q&#8321; = (' + s[1] + ' + ' + s[2] + ')/2 = <b>' + F.n(q1, 2) + '</b>',
            'Mitad superior: ' + s.slice(4).join(', ') + ' &rArr; Q&#8323; = (' + s[5] + ' + ' + s[6] + ')/2 = <b>' + F.n(q3, 2) + '</b>',
            'Rango intercuartilico: ' + F.n(q3 - q1, 2)];
        } else {
          var A = [], B = [];
          var base = r.entero(8, 15);
          for (i = 0; i < 5; i++) { A.push(base + r.entero(-2, 2)); B.push(base + r.entero(-8, 8)); }
          var vA = varianzaPob(A), vB = varianzaPob(B);
          enun = 'Dos grupos de datos:<br>Grupo A: ' + A.join(', ') + '<br>Grupo B: ' + B.join(', ') + '<br>' +
            'Calcula la desviacion estandar poblacional de cada uno y di cual grupo es mas homogeneo (4 decimales).';
          resp = R.varios([
            { etiqueta: '&sigma; de A', resp: R.numero(Math.sqrt(vA), { dec: 4, tol: 0.01 }) },
            { etiqueta: '&sigma; de B', resp: R.numero(Math.sqrt(vB), { dec: 4, tol: 0.01 }) },
            { etiqueta: 'Mas homogeneo', resp: R.opcion(['Grupo A', 'Grupo B'], vA <= vB ? 0 : 1) }
          ]);
          pistas = ['Calcula la media de cada grupo y luego su varianza poblacional.',
            'Mas homogeneo = menor desviacion estandar (los datos estan mas juntos).'];
          sol = ['Media A = ' + F.n(media(A), 4) + ' &rArr; &sigma;<sub>A</sub> = <b>' + F.n(Math.sqrt(vA), 4) + '</b>',
            'Media B = ' + F.n(media(B), 4) + ' &rArr; &sigma;<sub>B</sub> = <b>' + F.n(Math.sqrt(vB), 4) + '</b>',
            'Es mas homogeneo el <b>grupo ' + (vA <= vB ? 'A' : 'B') + '</b>, porque su desviacion es menor'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
