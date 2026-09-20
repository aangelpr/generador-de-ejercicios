/* Distribucion binomial */
(function () {
  'use strict';
  var F = EJ.fmt, R = EJ.resp;

  function comb(n, k) {
    if (k < 0 || k > n) return 0;
    var res = 1;
    for (var i = 1; i <= k; i++) res = res * (n - k + i) / i;
    return Math.round(res);
  }
  function binom(n, k, p) { return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k); }

  var extra = {};

  extra.identifica = function (r) {
    var casos = [
      { txt: 'Lanzar una moneda 20 veces y contar cuantas aguilas salen', esBinomial: true, por: 'hay un numero fijo de intentos, solo dos resultados y la probabilidad no cambia' },
      { txt: 'Sacar 3 cartas SIN devolverlas y contar cuantas son de corazones', esBinomial: false, por: 'al no devolver las cartas, la probabilidad cambia en cada extraccion' },
      { txt: 'Revisar 50 focos y contar cuantos estan fundidos, si el 4% falla', esBinomial: true, por: 'son 50 pruebas independientes con probabilidad fija' },
      { txt: 'Medir la estatura de 30 alumnos', esBinomial: false, por: 'el resultado no es de dos categorias, es una medida continua' },
      { txt: 'Contar cuantas veces sale 6 al tirar un dado 10 veces', esBinomial: true, por: 'cada tiro es exito (6) o fracaso (no 6), con p = 1/6 fija' },
      { txt: 'Contar cuantos intentos se necesitan hasta el primer exito', esBinomial: false, por: 'el numero de intentos NO es fijo (esa es la distribucion geometrica)' }
    ];
    var caso = r.elige(casos);
    return {
      enunciado: '&iquest;El siguiente experimento sigue una distribucion binomial?<br><span class="big">' + caso.txt + '</span>',
      respuesta: R.opcion(['Si es binomial', 'No es binomial'], caso.esBinomial ? 0 : 1),
      pistas: ['Para ser binomial debe cumplir: numero FIJO de ensayos, solo dos resultados posibles, ensayos independientes y p constante.',
        'Pregunta clave: &iquest;la probabilidad de exito se mantiene igual en cada intento y el numero de intentos esta fijo?'],
      solucion: ['Reviso las cuatro condiciones de una binomial',
        'En este caso ' + caso.por,
        'Por lo tanto <b>' + (caso.esBinomial ? 'si' : 'no') + '</b> es binomial']
    };
  };

  EJ.tema({
    id: 'binomial',
    materia: 'matematicas',
    grupo: 'Probabilidad y estadistica',
    nombre: 'Distribucion binomial',
    descripcion: 'Probabilidad de k exitos en n ensayos, media, varianza y desviacion estandar.',
    formulario: 'P(X = k) = C(n, k) p<sup>k</sup>(1 &minus; p)<sup>n&minus;k</sup><br>' +
      'Media: &mu; = np &nbsp;&middot;&nbsp; Varianza: &sigma;&sup2; = np(1 &minus; p) &nbsp;&middot;&nbsp; Desviacion: &sigma; = &radic;<span class="rad">np(1&minus;p)</span><br>' +
      'Se usa cuando hay n ensayos independientes con solo dos resultados y p constante.',

    generar: function (dif, r) {
      var guiaDelPaso = null;   // guia paso a paso, si este subtema la tiene
      var enun, resp, pistas, sol, n, k, p, val;

      if (dif === 'facil') {
        var tf = r.subtema([
          ['exacta', 'Probabilidad de exactamente k exitos'],
          ['identifica', 'Reconocer si es binomial']
        ]);
        if (extra[tf]) return extra[tf](r, dif);
        var contexto = r.elige([
          { txt: 'se lanza una moneda', p: 0.5, exito: 'caiga aguila' },
          { txt: 'se lanza un dado y se busca el 6', p: 1 / 6, exito: 'salga 6' },
          { txt: 'se responde al azar una pregunta de 4 opciones', p: 0.25, exito: 'se acierte' }
        ]);
        n = r.entero(4, 8);
        k = r.entero(1, n - 1);
        p = contexto.p;
        val = binom(n, k, p);
        guiaDelPaso = EJ.guia.binomialExacta(n, k, p);
        enun = 'Si ' + contexto.txt + ' ' + n + ' veces,<br>&iquest;cual es la probabilidad de que exactamente ' + k + ' veces ' + contexto.exito + '? (4 decimales)';
        resp = R.numero(val, { dec: 4, tol: 0.001 });
        pistas = ['Usa P(X = k) = C(n, k)p<sup>k</sup>(1 &minus; p)<sup>n&minus;k</sup> con n = ' + n + ', k = ' + k + ', p = ' + F.n(p, 4) + '.',
          'C(' + n + ', ' + k + ') = ' + comb(n, k) + '.'];
        sol = ['n = ' + n + ', k = ' + k + ', p = ' + F.n(p, 4),
          'C(' + n + ', ' + k + ') = ' + comb(n, k),
          'P = ' + comb(n, k) + ' &times; ' + F.n(p, 4) + '<sup>' + k + '</sup> &times; ' + F.n(1 - p, 4) + '<sup>' + (n - k) + '</sup>',
          'P = <b>' + F.n(val, 4) + '</b>'];
      } else if (dif === 'medio') {
        var t = r.subtema([
          ['alMenosUno', 'Al menos un exito (complemento)'],
          ['mediaVarianza', 'Media, varianza y desviacion'],
          ['aLoMas', 'Probabilidad acumulada'],
          ['identifica', 'Reconocer si es binomial']
        ]);
        if (extra[t]) return extra[t](r, dif);
        n = r.entero(5, 12);
        p = r.entero(15, 60) / 100;
        if (t === 'alMenosUno') {
          val = 1 - binom(n, 0, p);
          enun = 'Un proceso produce piezas defectuosas con probabilidad ' + p + '.<br>' +
            'Si se revisan ' + n + ' piezas, &iquest;cual es la probabilidad de que AL MENOS UNA sea defectuosa? (4 decimales)';
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['"Al menos una" se calcula mucho mas facil con el complemento: 1 &minus; P(ninguna).',
            'P(X = 0) = (1 &minus; ' + p + ')' + F.sup(n) + ' = ' + F.n(binom(n, 0, p), 4) + '.'];
          sol = ['P(al menos una) = 1 &minus; P(X = 0)',
            'P(X = 0) = ' + F.n(1 - p, 2) + F.sup(n) + ' = ' + F.n(binom(n, 0, p), 4),
            'P = 1 &minus; ' + F.n(binom(n, 0, p), 4) + ' = <b>' + F.n(val, 4) + '</b>'];
        } else if (t === 'mediaVarianza') {
          enun = 'En una distribucion binomial con n = ' + n + ' y p = ' + p + ',<br>' +
            'calcula la media, la varianza y la desviacion estandar (4 decimales).';
          resp = R.varios([
            { etiqueta: 'Media', resp: R.numero(n * p, { dec: 4, tol: 0.001 }) },
            { etiqueta: 'Varianza', resp: R.numero(n * p * (1 - p), { dec: 4, tol: 0.001 }) },
            { etiqueta: 'Desviacion', resp: R.numero(Math.sqrt(n * p * (1 - p)), { dec: 4, tol: 0.001 }) }
          ]);
          pistas = ['&mu; = np y &sigma;&sup2; = np(1 &minus; p).',
            'np = ' + n + ' &times; ' + p + ' = ' + F.n(n * p, 4) + '.'];
          sol = ['&mu; = np = ' + n + '(' + p + ') = <b>' + F.n(n * p, 4) + '</b>',
            '&sigma;&sup2; = np(1 &minus; p) = ' + F.n(n * p, 4) + ' &times; ' + F.n(1 - p, 2) + ' = <b>' + F.n(n * p * (1 - p), 4) + '</b>',
            '&sigma; = &radic;<span class="rad">' + F.n(n * p * (1 - p), 4) + '</span> = <b>' + F.n(Math.sqrt(n * p * (1 - p)), 4) + '</b>'];
        } else {
          k = r.entero(1, 3);
          val = 0;
          for (var i = 0; i <= k; i++) val += binom(n, i, p);
          enun = 'Con n = ' + n + ' ensayos y p = ' + p + ',<br>calcula P(X &le; ' + k + ') (4 decimales).';
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['P(X &le; ' + k + ') es la SUMA de P(X = 0) hasta P(X = ' + k + ').',
            'P(X = 0) = ' + F.n(binom(n, 0, p), 4) + ', P(X = 1) = ' + F.n(binom(n, 1, p), 4) + (k >= 2 ? ', P(X = 2) = ' + F.n(binom(n, 2, p), 4) : '') + '.'];
          sol = (function () {
            var pasos = [];
            for (var j = 0; j <= k; j++) pasos.push('P(X = ' + j + ') = C(' + n + ',' + j + ')(' + p + ')' + F.sup(j) + '(' + F.n(1 - p, 2) + ')' + F.sup(n - j) + ' = ' + F.n(binom(n, j, p), 4));
            pasos.push('Sumo todas: <b>' + F.n(val, 4) + '</b>');
            return pasos;
          })();
        }
      } else {
        var t2 = r.subtema([
          ['rango', 'Probabilidad en un rango'],
          ['aplicado', 'Problema aplicado'],
          ['completo', 'Probabilidad, media y desviacion']
        ]);
        if (extra[t2]) return extra[t2](r, dif);
        n = r.entero(8, 15);
        p = r.entero(20, 70) / 100;
        if (t2 === 'rango') {
          var k1 = r.entero(2, 4), k2 = k1 + r.entero(1, 3);
          val = 0;
          for (var m = k1; m <= k2; m++) val += binom(n, m, p);
          enun = 'Con n = ' + n + ' y p = ' + p + ', calcula P(' + k1 + ' &le; X &le; ' + k2 + ') (4 decimales).';
          resp = R.numero(val, { dec: 4, tol: 0.001 });
          pistas = ['Suma las probabilidades individuales desde k = ' + k1 + ' hasta k = ' + k2 + '.',
            'P(X = ' + k1 + ') = ' + F.n(binom(n, k1, p), 4) + ' es el primer sumando.'];
          sol = (function () {
            var pasos = [];
            for (var j = k1; j <= k2; j++) pasos.push('P(X = ' + j + ') = ' + F.n(binom(n, j, p), 4));
            pasos.push('Suma total: <b>' + F.n(val, 4) + '</b>');
            return pasos;
          })();
        } else if (t2 === 'aplicado') {
          var pct = Math.round(p * 100);
          k = r.entero(2, 5);
          val = binom(n, k, p);
          var masDe = 1;
          for (var q = 0; q <= k; q++) masDe -= binom(n, q, p);
          enun = 'El ' + pct + '% de los clientes de una tienda compra con tarjeta.<br>' +
            'Si llegan ' + n + ' clientes, calcula la probabilidad de que exactamente ' + k + ' paguen con tarjeta<br>' +
            'y la probabilidad de que MAS de ' + k + ' lo hagan (4 decimales).';
          resp = R.varios([
            { etiqueta: 'P(X = ' + k + ')', resp: R.numero(val, { dec: 4, tol: 0.001 }) },
            { etiqueta: 'P(X &gt; ' + k + ')', resp: R.numero(masDe, { dec: 4, tol: 0.001 }) }
          ]);
          pistas = ['Para la primera aplica directo la formula con n = ' + n + ', k = ' + k + ', p = ' + p + '.',
            'Para "mas de ' + k + '" usa el complemento: 1 &minus; P(X &le; ' + k + ').'];
          sol = ['P(X = ' + k + ') = C(' + n + ',' + k + ')(' + p + ')' + F.sup(k) + '(' + F.n(1 - p, 2) + ')' + F.sup(n - k) + ' = <b>' + F.n(val, 4) + '</b>',
            'P(X &le; ' + k + ') = ' + F.n(1 - masDe, 4),
            'P(X &gt; ' + k + ') = 1 &minus; ' + F.n(1 - masDe, 4) + ' = <b>' + F.n(masDe, 4) + '</b>'];
        } else {
          k = r.entero(3, 6);
          val = binom(n, k, p);
          enun = 'Una maquina acierta el tiro con probabilidad ' + p + ' y hace ' + n + ' intentos.<br>' +
            'Calcula P(X = ' + k + '), la media y la desviacion estandar (4 decimales).';
          resp = R.varios([
            { etiqueta: 'P(X = ' + k + ')', resp: R.numero(val, { dec: 4, tol: 0.001 }) },
            { etiqueta: 'Media', resp: R.numero(n * p, { dec: 4, tol: 0.001 }) },
            { etiqueta: 'Desviacion', resp: R.numero(Math.sqrt(n * p * (1 - p)), { dec: 4, tol: 0.001 }) }
          ]);
          pistas = ['C(' + n + ', ' + k + ') = ' + comb(n, k) + '.',
            '&mu; = np y &sigma; = &radic;<span class="rad">np(1&minus;p)</span>.'];
          sol = ['P(X = ' + k + ') = ' + comb(n, k) + '(' + p + ')' + F.sup(k) + '(' + F.n(1 - p, 2) + ')' + F.sup(n - k) + ' = <b>' + F.n(val, 4) + '</b>',
            '&mu; = ' + n + '(' + p + ') = <b>' + F.n(n * p, 4) + '</b>',
            '&sigma; = &radic;<span class="rad">' + F.n(n * p * (1 - p), 4) + '</span> = <b>' + F.n(Math.sqrt(n * p * (1 - p)), 4) + '</b>'];
        }
      }

      return {
        guia: guiaDelPaso, enunciado: enun, respuesta: resp, pistas: pistas, solucion: sol };
    }
  });
})();
