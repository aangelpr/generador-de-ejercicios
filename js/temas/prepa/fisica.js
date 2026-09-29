/* Modo prepa: fisica basica (movimiento, fuerzas, energia, densidad, presion, electricidad) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var casos = {};

  /* ---------- facil ---------- */

  casos.velocidad = function (r) {
    var v = r.entero(3, 25) * 5, t = r.elige([2, 3, 4, 5, 6]);
    var d = v * t;
    var pide = r.entero(0, 2), res, err, enun, un, sol;
    if (pide === 0) {
      res = v; un = 'km/h'; err = [d * t, d + t, d - t];
      enun = 'Un autobus recorre ' + d + ' km en ' + t + ' horas a velocidad constante. &iquest;Cual es su velocidad?';
      sol = ['v = d / t = ' + d + ' / ' + t + ' = <b>' + v + ' km/h</b>'];
    } else if (pide === 1) {
      res = d; un = 'km'; err = [v / t, v + t, v * (t + 1)];
      enun = 'Un auto va a ' + v + ' km/h durante ' + t + ' horas. &iquest;Que distancia recorre?';
      sol = ['d = v &middot; t = ' + v + ' &times; ' + t + ' = <b>' + d + ' km</b>'];
    } else {
      res = t; un = 'horas'; err = [v / d > 0.5 ? v / d : d * v / 100, d - v, t + 1];
      enun = '&iquest;Cuanto tarda un tren en recorrer ' + d + ' km si va a ' + v + ' km/h?';
      sol = ['t = d / v = ' + d + ' / ' + v + ' = <b>' + t + ' horas</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, res, err, { unidad: un }),
      ['Velocidad = distancia / tiempo (v = d / t).',
        'Despeja lo que te piden: d = v &middot; t, t = d / v.'],
      sol);
  };

  casos.conversion = function (r) {
    var tipo = r.entero(0, 3), v, err, enun, un, sol;
    if (tipo === 0) {
      var kmh = r.elige([18, 36, 54, 72, 90, 108, 126, 144]);
      v = kmh / 3.6; un = 'm/s'; err = [kmh * 3.6, kmh / 60, kmh * 1000 / 60];
      enun = '&iquest;A cuantos metros por segundo equivalen ' + kmh + ' km/h?';
      sol = ['1 km = 1000 m y 1 h = 3600 s', kmh + ' &times; 1000 / 3600 = ' + kmh + ' / 3.6 = <b>' + F.n(v) + ' m/s</b>'];
    } else if (tipo === 1) {
      var km = r.entero(2, 40) / 2;
      v = km * 1000; un = 'm'; err = [km * 100, km * 10, km * 10000];
      enun = '&iquest;Cuantos metros son ' + F.n(km) + ' km?';
      sol = ['1 km = 1000 m', F.n(km) + ' &times; 1000 = <b>' + F.n(v) + ' m</b>'];
    } else if (tipo === 2) {
      var h = r.elige([0.5, 1.5, 2, 2.5, 3, 0.25, 0.75]);
      v = h * 3600; un = 's'; err = [h * 60, h * 100 * 60, h * 360];
      enun = '&iquest;Cuantos segundos hay en ' + F.n(h) + ' horas?';
      sol = ['1 h = 60 min = 3600 s', F.n(h) + ' &times; 3600 = <b>' + F.n(v) + ' s</b>'];
    } else {
      var g = r.entero(2, 90) * 50;
      v = g / 1000; un = 'kg'; err = [g / 100, g * 1000, g / 10];
      enun = '&iquest;Cuantos kilogramos son ' + g + ' gramos?';
      sol = ['1 kg = 1000 g', g + ' / 1000 = <b>' + F.n(v) + ' kg</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: un, dec: 4, enteros: false }),
      ['Escribe cuanto vale una unidad en la otra y multiplica o divide.',
        'Si pasas a una unidad mas chica el numero crece; a una mas grande, se hace mas chico.'],
      sol);
  };

  casos.peso = function (r) {
    var m = r.entero(2, 90), g = 9.8;
    var luna = r.bool(0.3);
    var gg = luna ? 1.6 : g;
    var w = m * gg;
    return P.ejercicio(
      '&iquest;Cual es el peso de un objeto de ' + m + ' kg ' + (luna ? 'en la Luna (g = 1.6 m/s&sup2;)' : 'en la Tierra (g = 9.8 m/s&sup2;)') + '?',
      P.opciones(r, w, [m, m / gg, m + gg, m * (luna ? g : 1.6)], { unidad: 'N', enteros: false }),
      ['La masa (kg) no es lo mismo que el peso: el peso es una fuerza y se mide en newtons.',
        'Peso = masa &times; gravedad (W = mg).'],
      ['W = m &middot; g = ' + m + ' &times; ' + gg + ' = <b>' + F.n(w, 2) + ' N</b>']);
  };

  /* ---------- medio ---------- */

  casos.newton = function (r) {
    var m = r.entero(2, 40), a = r.entero(1, 8);
    var fuerza = m * a;
    var pide = r.entero(0, 2), v, err, enun, un, sol;
    if (pide === 0) {
      v = fuerza; un = 'N'; err = [m / a, m + a, m * 9.8];
      enun = '&iquest;Que fuerza se necesita para que un carrito de ' + m + ' kg acelere a ' + a + ' m/s&sup2;?';
      sol = ['F = m &middot; a = ' + m + ' &times; ' + a + ' = <b>' + fuerza + ' N</b>'];
    } else if (pide === 1) {
      v = a; un = 'm/s&sup2;'; err = [fuerza * m, m / fuerza, fuerza - m];
      enun = 'Se empuja una caja de ' + m + ' kg con una fuerza neta de ' + fuerza + ' N. &iquest;Cual es su aceleracion?';
      sol = ['a = F / m = ' + fuerza + ' / ' + m + ' = <b>' + a + ' m/s&sup2;</b>'];
    } else {
      v = m; un = 'kg'; err = [fuerza * a, a / fuerza, fuerza - a];
      enun = 'Una fuerza neta de ' + fuerza + ' N le produce a un cuerpo una aceleracion de ' + a + ' m/s&sup2;. &iquest;Cual es su masa?';
      sol = ['m = F / a = ' + fuerza + ' / ' + a + ' = <b>' + m + ' kg</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: un, enteros: false }),
      ['Segunda ley de Newton: F = m &middot; a.', 'Despeja lo que te piden: a = F / m, m = F / a.'],
      sol);
  };

  casos.densidad = function (r) {
    var mat = r.elige([
      { n: 'aluminio', rho: 2.7 }, { n: 'hierro', rho: 7.9 }, { n: 'cobre', rho: 8.9 },
      { n: 'plomo', rho: 11.3 }, { n: 'madera de pino', rho: 0.5 }, { n: 'hielo', rho: 0.9 }
    ]);
    var vol = r.entero(2, 20) * 10;
    var masa = F.redondea(mat.rho * vol, 2);
    var pideDens = r.bool();
    if (pideDens) {
      return P.ejercicio(
        'Un bloque de ' + mat.n + ' tiene una masa de ' + F.n(masa) + ' g y un volumen de ' + vol + ' cm&sup3;. &iquest;Cual es su densidad?',
        P.opciones(r, mat.rho, [vol / masa, masa * vol, masa - vol > 0 ? masa - vol : mat.rho * 10], { unidad: 'g/cm&sup3;', enteros: false }),
        ['Densidad = masa / volumen (&rho; = m / V).', 'Divide los gramos entre los cm&sup3;.'],
        ['&rho; = ' + F.n(masa) + ' / ' + vol + ' = <b>' + mat.rho + ' g/cm&sup3;</b>']);
    }
    return P.ejercicio(
      'La densidad del ' + mat.n + ' es ' + mat.rho + ' g/cm&sup3;. &iquest;Que masa tiene una pieza de ' + vol + ' cm&sup3;?',
      P.opciones(r, masa, [vol / mat.rho, mat.rho / vol, vol + mat.rho], { unidad: 'g', enteros: false }),
      ['Densidad = masa / volumen, asi que masa = densidad &times; volumen.', 'Cuida las unidades: g/cm&sup3; por cm&sup3; da gramos.'],
      ['m = &rho; &middot; V = ' + mat.rho + ' &times; ' + vol + ' = <b>' + F.n(masa) + ' g</b>']);
  };

  casos.ohm = function (r) {
    var i = r.entero(1, 10) / 2, res = r.entero(2, 24) * 5;
    var volt = i * res;
    var pide = r.entero(0, 2), v, err, un, enun, sol;
    if (pide === 0) {
      v = volt; un = 'V'; err = [res / i, i / res, res + i];
      enun = 'Por una resistencia de ' + res + ' &Omega; circula una corriente de ' + F.n(i) + ' A. &iquest;Cual es el voltaje?';
      sol = ['V = I &middot; R = ' + F.n(i) + ' &times; ' + res + ' = <b>' + F.n(volt) + ' V</b>'];
    } else if (pide === 1) {
      v = i; un = 'A'; err = [volt * res, res / volt, volt - res > 0 ? volt - res : volt / 10];
      enun = 'Un foco de ' + res + ' &Omega; se conecta a ' + F.n(volt) + ' V. &iquest;Que corriente pasa por el?';
      sol = ['I = V / R = ' + F.n(volt) + ' / ' + res + ' = <b>' + F.n(i) + ' A</b>'];
    } else {
      v = res; un = '&Omega;'; err = [volt * i, i / volt, volt + i];
      enun = 'Un aparato conectado a ' + F.n(volt) + ' V consume una corriente de ' + F.n(i) + ' A. &iquest;Cual es su resistencia?';
      sol = ['R = V / I = ' + F.n(volt) + ' / ' + F.n(i) + ' = <b>' + res + ' &Omega;</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: un, enteros: false }),
      ['Ley de Ohm: V = I &middot; R.', 'Triangulo V arriba, I y R abajo: tapa lo que buscas y ve que queda.'],
      sol);
  };

  /* ---------- dificil ---------- */

  casos.energia = function (r) {
    var tipo = r.entero(0, 2), v, err, enun, un = 'J', sol, pistas;
    if (tipo === 0) {
      var m = r.entero(1, 10) * 2, vel = r.entero(2, 12);
      v = m * vel * vel / 2;
      err = [m * vel * vel, m * vel / 2, m * vel];
      enun = '&iquest;Cual es la energia cinetica de una pelota de ' + m + ' kg que va a ' + vel + ' m/s?';
      pistas = ['Ec = m v&sup2; / 2.', 'Eleva al cuadrado SOLO la velocidad, y no olvides dividir entre 2.'];
      sol = ['Ec = ' + m + ' &times; ' + vel + '&sup2; / 2 = ' + m + ' &times; ' + (vel * vel) + ' / 2 = <b>' + F.n(v) + ' J</b>'];
    } else if (tipo === 1) {
      var m2 = r.entero(2, 30), h = r.entero(2, 25);
      v = m2 * 9.8 * h;
      err = [m2 * h, m2 * 9.8, m2 * 9.8 * h / 2];
      enun = '&iquest;Que energia potencial tiene una maceta de ' + m2 + ' kg colocada a ' + h + ' m de altura? (g = 9.8 m/s&sup2;)';
      pistas = ['Ep = m g h.', 'Multiplica los tres: masa, gravedad y altura.'];
      sol = ['Ep = ' + m2 + ' &times; 9.8 &times; ' + h + ' = <b>' + F.n(v, 2) + ' J</b>'];
    } else {
      var hh = r.elige([5, 20, 45, 80, 125]);   /* con g = 10 da raiz exacta */
      v = Math.sqrt(2 * 10 * hh); un = 'm/s';
      err = [2 * 10 * hh, 10 * hh, Math.sqrt(10 * hh)];
      enun = 'Se deja caer una piedra desde ' + hh + ' m de altura. Sin friccion, &iquest;con que velocidad llega al suelo? (usa g = 10 m/s&sup2;)';
      pistas = ['La energia potencial de arriba se vuelve cinetica abajo: m g h = m v&sup2; / 2.', 'La masa se cancela: v = &radic;(2 g h).'];
      sol = ['m g h = m v&sup2; / 2 &rarr; v = &radic;(2 g h)',
        'v = &radic;(2 &times; 10 &times; ' + hh + ') = &radic;' + (20 * hh) + ' = <b>' + F.n(v) + ' m/s</b>'];
    }
    return P.ejercicio(enun, P.opciones(r, v, err, { unidad: un, enteros: false }), pistas, sol);
  };

  casos.presion = function (r) {
    var fza = r.entero(2, 30) * 100, ar = r.elige([0.5, 1, 2, 4, 5, 0.25]);
    var tipo = r.entero(0, 1);
    if (tipo === 0) {
      var p = fza / ar;
      return P.ejercicio(
        'Una caja que pesa ' + fza + ' N esta apoyada sobre una cara de ' + F.n(ar) + ' m&sup2;. &iquest;Que presion ejerce sobre el piso?',
        P.opciones(r, p, [fza * ar, ar / fza, fza + ar], { unidad: 'Pa', enteros: false }),
        ['Presion = fuerza / area (P = F / A).', 'El resultado sale en pascales: 1 Pa = 1 N/m&sup2;.'],
        ['P = ' + fza + ' / ' + F.n(ar) + ' = <b>' + F.n(p) + ' Pa</b>']);
    }
    var prof = r.entero(2, 30);
    var ph = 1000 * 9.8 * prof;
    return P.ejercicio(
      '&iquest;Que presion ejerce el agua (&rho; = 1000 kg/m&sup3;) sobre un buzo a ' + prof + ' m de profundidad? (g = 9.8 m/s&sup2;, sin contar la del aire)',
      P.opciones(r, ph, [1000 * prof, 9.8 * prof, 1000 * 9.8 / prof], { unidad: 'Pa', enteros: false }),
      ['Presion hidrostatica: P = &rho; g h.', 'Multiplica densidad, gravedad y profundidad.'],
      ['P = 1000 &times; 9.8 &times; ' + prof + ' = <b>' + F.n(ph) + ' Pa</b>']);
  };

  casos.mua = function (r) {
    var v0 = r.entero(0, 10) * 2, a = r.entero(1, 5), t = r.entero(2, 10);
    var vf = v0 + a * t;
    var d = v0 * t + a * t * t / 2;
    var pideD = r.bool();
    var enun = 'Un auto va a ' + v0 + ' m/s y acelera a ' + a + ' m/s&sup2; durante ' + t + ' s. &iquest;' +
      (pideD ? 'Que distancia recorre en ese tiempo?' : 'Que velocidad alcanza?');
    if (v0 === 0) enun = 'Un auto parte del reposo y acelera a ' + a + ' m/s&sup2; durante ' + t + ' s. &iquest;' +
      (pideD ? 'Que distancia recorre en ese tiempo?' : 'Que velocidad alcanza?');
    if (pideD) {
      return P.ejercicio(enun,
        P.opciones(r, d, [v0 * t + a * t * t, vf * t, v0 * t + a * t / 2], { unidad: 'm', enteros: false }),
        ['Movimiento uniformemente acelerado: d = v<sub>0</sub>t + a t&sup2; / 2.', 'No uses d = v &middot; t: la velocidad va cambiando.'],
        ['d = ' + v0 + ' &times; ' + t + ' + ' + a + ' &times; ' + t + '&sup2; / 2',
          'd = ' + (v0 * t) + ' + ' + F.n(a * t * t / 2) + ' = <b>' + F.n(d) + ' m</b>']);
    }
    return P.ejercicio(enun,
      P.opciones(r, vf, [a * t, v0 + a, v0 * a * t || a * t + t], { unidad: 'm/s', enteros: false }),
      ['v<sub>f</sub> = v<sub>0</sub> + a t.', 'Cada segundo la velocidad aumenta ' + a + ' m/s.'],
      ['v<sub>f</sub> = ' + v0 + ' + ' + a + ' &times; ' + t + ' = <b>' + vf + ' m/s</b>']);
  };

  EJ.tema({
    id: 'prepa-fisica',
    materia: 'prepa',
    grupo: 'Fisica',
    nombre: 'Fisica basica',
    descripcion: 'Velocidad, conversiones, peso, Newton, densidad, ley de Ohm, energia, presion y movimiento acelerado.',
    etiquetas: ['velocidad', 'fuerza', 'newton', 'densidad', 'ohm', 'energia', 'presion'],
    formulario: 'v = d / t &nbsp;&middot;&nbsp; v<sub>f</sub> = v<sub>0</sub> + at &nbsp;&middot;&nbsp; d = v<sub>0</sub>t + at&sup2;/2<br>' +
      'F = ma &nbsp;&middot;&nbsp; W = mg &nbsp;&middot;&nbsp; &rho; = m / V &nbsp;&middot;&nbsp; P = F / A &nbsp;&middot;&nbsp; P = &rho;gh<br>' +
      'Ec = mv&sup2;/2 &nbsp;&middot;&nbsp; Ep = mgh &nbsp;&middot;&nbsp; V = IR &nbsp;&middot;&nbsp; 1 km/h = 1/3.6 m/s',

    generar: function (dif, r) {
      var t;
      if (dif === 'facil') {
        t = r.subtema([
          ['velocidad', 'Velocidad, distancia y tiempo'],
          ['conversion', 'Conversion de unidades'],
          ['peso', 'Masa y peso']
        ]);
      } else if (dif === 'medio') {
        t = r.subtema([
          ['newton', 'Segunda ley de Newton'],
          ['densidad', 'Densidad'],
          ['ohm', 'Ley de Ohm']
        ]);
      } else {
        t = r.subtema([
          ['energia', 'Energia cinetica y potencial'],
          ['presion', 'Presion'],
          ['mua', 'Movimiento acelerado']
        ]);
      }
      return casos[t](r, dif);
    }
  });
})();
