/* Modo prepa - Fisica (la parte de fisica del area de ciencias experimentales:
   los reactivos 43 a 60 de la version de practica) */
(function () {
  'use strict';
  var F = EJ.fmt, P = EJ.prepa;

  var MS = 'm/s', MS2 = 'm/s' + F.sup(2);

  /* opciones numericas con decimales fijos, como en el cuadernillo */
  function num(r, v, malas, unidad, dec) {
    return P.opciones(r, v, malas, { unidad: unidad, fijo: true, dec: dec === undefined ? 2 : dec, enteros: false });
  }

  var casos = {};

  /* 43. Velocidad (MRU) */
  casos.velocidad = function (r) {
    var v = r.entero(2, 30), t = r.entero(2, 12), d = v * t;
    var cosa = r.elige(['una pelota', 'un ciclista', 'un carrito de juguete', 'un patinador']);
    return P.ejercicio('&iquest;Cu&aacute;l es la velocidad de ' + cosa + ' si despu&eacute;s de ' + P.num(t, 1) + ' s est&aacute; a ' + P.num(d, 1) + ' m de distancia?',
      num(r, v, [t / d * 10, d / (t + 1), d - t, v / 2], MS, 1),
      ['Velocidad = distancia / tiempo.', 'v = ' + d + ' / ' + t + '.'],
      ['v = d / t = ' + d + ' / ' + t + ' = <b>' + P.num(v, 1) + ' m/s</b>']);
  };

  /* 44. Aceleracion */
  casos.aceleracion = function (r) {
    var a = r.entero(1, 6), t = r.entero(2, 10), v0 = r.entero(2, 30), vf = v0 + a * t;
    var cosa = r.elige(['una motocicleta', 'un autom&oacute;vil', 'un tren']);
    return P.ejercicio('&iquest;Cu&aacute;l es la aceleraci&oacute;n de ' + cosa + ' que pasa de ' + v0 + ' m/s a ' + vf + ' m/s en ' + t + ' s?',
      num(r, a, [vf / t, (vf + v0) / t, v0 / t, a * 2], MS2, 0),
      ['Aceleracion = cambio de velocidad / tiempo.', 'a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t: primero RESTA las velocidades.'],
      ['a = (' + vf + ' &minus; ' + v0 + ') / ' + t + ' = ' + (vf - v0) + ' / ' + t + ' = <b>' + a + ' m/s' + F.sup(2) + '</b>']);
  };

  /* 45. Fuerza neta con cambio de velocidad */
  casos.fuerzaNeta = function (r) {
    var m = r.elige([10, 20, 25, 40, 50, 60, 80]), a = r.entero(1, 6), t = r.entero(2, 8), v0 = r.entero(5, 20), vf = v0 + a * t;
    var f = m * a;
    return P.ejercicio('Un cuerpo de ' + m + ' kg pasa de ' + v0 + ' m/s a ' + vf + ' m/s en ' + t + ' s. &iquest;Cu&aacute;l es su fuerza neta?',
      num(r, f, [m * vf / t, m, m * (vf - v0), f / 2], 'N', 0),
      ['Primero la aceleracion: a = (v<sub>f</sub> &minus; v<sub>0</sub>)/t.', 'Luego la segunda ley de Newton: F = m &middot; a.'],
      ['a = (' + vf + ' &minus; ' + v0 + ') / ' + t + ' = ' + a + ' m/s' + F.sup(2), 'F = ' + m + ' &times; ' + a + ' = <b>' + f + ' N</b>']);
  };

  /* 46. Aceleracion con la segunda ley */
  casos.aceleracionNewton = function (r) {
    var m = r.elige([40, 50, 60, 75, 80, 90, 100]), a = r.entero(1, 9) / 10, fza = m * a;
    var quien = r.elige(['una persona', 'un carrito de supermercado', 'una caja']);
    return P.ejercicio('&iquest;Qu&eacute; aceleraci&oacute;n tendr&aacute; ' + quien + ' de ' + P.num(m, 1) + ' kg si recibe un empuje de ' + P.num(fza, 1) + ' N?',
      num(r, a, [m / fza, fza / 10, m * fza / 1000, a * 9.8], MS2, 1),
      ['Segunda ley de Newton: F = m &middot; a, asi que a = F / m.', 'Divide la fuerza entre la masa (no al reves).'],
      ['a = ' + F.n(fza) + ' / ' + m + ' = <b>' + P.num(a, 1) + ' m/s' + F.sup(2) + '</b>']);
  };

  /* 47. Masa a partir del peso */
  casos.masaPeso = function (r) {
    var w = r.entero(3, 40) * 50, m = w / 9.81;
    var bien = P.num(m) + ' kg';
    var malas = [P.num(w / 9.81 / 9.81 * 3) + ' N', P.num(w / 9) + ' N', P.num(w * 9.81 / 100) + ' kg', P.num(w / 10) + ' N', P.num(m * 2) + ' kg'];
    return P.ejercicio('&iquest;Cu&aacute;l es la masa de un cuerpo cuyo peso es de ' + P.num(w) + ' N?' + P.considere('g = 9.81 m/s' + F.sup(2) + '.'),
      P.opciones(r, bien, malas),
      ['Peso = masa &times; gravedad (W = mg), asi que m = W / g.', 'La masa se mide en kilogramos, no en newtons: fijate en la unidad.'],
      ['m = ' + P.num(w) + ' / 9.81 = <b>' + bien + '</b>']);
  };

  /* 48. Leyes de Kepler */
  casos.kepler = function (r) {
    var leyes = [
      { t: 'los planetas siguen trayectorias el&iacute;pticas en las que el Sol se encuentra en uno de sus focos', b: 'las &oacute;rbitas' },
      { t: 'la l&iacute;nea que une al Sol con un planeta barre &aacute;reas iguales en tiempos iguales', b: 'las &aacute;reas' },
      { t: 'el cuadrado del periodo de un planeta es proporcional al cubo de su distancia media al Sol', b: 'los periodos' }
    ];
    var l = r.elige(leyes);
    var todas = ['las &aacute;reas', 'las &oacute;rbitas', 'los periodos', 'los sistemas', 'la gravitaci&oacute;n universal'];
    return P.ejercicio('Cuando decimos que ' + l.t + ', nos referimos a la ley de:',
      P.opciones(r, l.b, todas.filter(function (x) { return x !== l.b; })),
      ['1a ley (de las orbitas): las orbitas son elipses. 2a (de las areas): areas iguales en tiempos iguales.', '3a (de los periodos): T' + F.sup(2) + ' es proporcional a a' + F.sup(3) + '.'],
      ['Es la ley de <b>' + l.b + '</b>']);
  };

  /* 49. Formas de transferencia de calor */
  casos.calor = function (r) {
    var c = r.elige([
      { t: 'Al interior de un cuerpo s&oacute;lido, la &uacute;nica forma de transferencia de calor es por:', b: 'conducci&oacute;n' },
      { t: 'En los l&iacute;quidos y gases, el calor se transfiere principalmente por el movimiento del propio fluido, es decir, por:', b: 'convecci&oacute;n' },
      { t: 'El calor del Sol llega a la Tierra a trav&eacute;s del vac&iacute;o por:', b: 'radiaci&oacute;n' }
    ]);
    var todas = ['conducci&oacute;n', 'convecci&oacute;n', 'propagaci&oacute;n', 'radiaci&oacute;n'];
    return P.ejercicio(c.t, P.opciones(r, c.b, todas.filter(function (x) { return x !== c.b; })),
      ['Conduccion: de particula a particula (solidos). Conveccion: el fluido se mueve. Radiacion: ondas, aun en el vacio.', '"Propagacion" no es una de las tres formas.'],
      ['Respuesta: <b>' + c.b + '</b>']);
  };

  /* 50. Temperatura y calor (completar texto) */
  casos.temperaturaCalor = function (r) {
    var bien = ['temperatura', 'calor'];
    var malas = [['entrop&iacute;a', 'calor espec&iacute;fico'], ['dilataci&oacute;n t&eacute;rmica', 'calor'], ['entalp&iacute;a', 'calor espec&iacute;fico'], ['calor', 'temperatura']];
    return P.complete(r, 'La ___ indica qu&eacute; tan caliente o fr&iacute;a est&aacute; una sustancia con respecto a un cuerpo que se toma como patr&oacute;n. ' +
      'El ___ es energ&iacute;a en tr&aacute;nsito y siempre fluye de los cuerpos de mayor temperatura a los de menor temperatura.', bien, malas,
      ['La temperatura se MIDE con un termometro; el calor es energia que PASA de un cuerpo a otro.', 'No los confundas: un cuerpo no "tiene" calor, tiene temperatura.'], []);
  };

  /* 51. Tipos de sistemas termodinamicos (completar texto) */
  casos.sistemas = function (r) {
    var s = r.elige([
      { t: 'En un sistema ___ no existe intercambio de materia ni de ___ con otro sistema.', b: ['aislado', 'energ&iacute;a'],
        m: [['abierto', 'energ&iacute;a'], ['abierto', 'temperatura'], ['aislado', 'temperatura'], ['cerrado', 'energ&iacute;a']] },
      { t: 'En un sistema ___ s&oacute;lo se intercambia ___ con el entorno, pero no materia.', b: ['cerrado', 'energ&iacute;a'],
        m: [['abierto', 'energ&iacute;a'], ['aislado', 'materia'], ['cerrado', 'temperatura'], ['aislado', 'energ&iacute;a']] },
      { t: 'En un sistema ___ se intercambia tanto ___ como energ&iacute;a con el entorno.', b: ['abierto', 'materia'],
        m: [['cerrado', 'materia'], ['aislado', 'temperatura'], ['abierto', 'presi&oacute;n'], ['cerrado', 'calor']] }
    ]);
    return P.complete(r, s.t, s.b, s.m,
      ['Abierto: entra y sale materia y energia. Cerrado: solo energia. Aislado: nada.', 'Piensa en una olla destapada, una olla tapada y un termo.'], []);
  };

  /* 52. Leyes de la termodinamica */
  casos.leyesTermo = function (r) {
    var l = r.elige([
      { t: 'En un proceso termodin&aacute;mico, el calor absorbido o cedido por un sistema siempre ser&aacute; igual a la suma del trabajo realizado y el cambio de energ&iacute;a interna.', b: 'Primera' },
      { t: 'Si dos cuerpos est&aacute;n cada uno en equilibrio t&eacute;rmico con un tercero, entonces est&aacute;n en equilibrio t&eacute;rmico entre s&iacute;.', b: 'Cero' },
      { t: 'El calor fluye de manera espont&aacute;nea del cuerpo caliente al fr&iacute;o y nunca al rev&eacute;s; la entrop&iacute;a del universo siempre aumenta.', b: 'Segunda' },
      { t: 'Es imposible alcanzar el cero absoluto de temperatura en un n&uacute;mero finito de pasos.', b: 'Tercera' }
    ]);
    return P.ejercicio('&iquest;A qu&eacute; ley de la termodin&aacute;mica se refiere el siguiente enunciado?<br><div class="lectura">' + l.t + '</div>',
      P.opciones(r, l.b, ['Cero', 'Primera', 'Segunda', 'Tercera'].filter(function (x) { return x !== l.b; })),
      ['Cero: equilibrio termico. Primera: conservacion de la energia (Q = W + &Delta;U).', 'Segunda: entropia y direccion del calor. Tercera: el cero absoluto.'],
      ['Es la ley <b>' + l.b + '</b>']);
  };

  /* 53. Ley de Charles */
  casos.charles = function (r) {
    var V1, T1, V2, T2;
    do { V1 = r.entero(2, 9) * 100; T1 = r.entero(5, 8) * 50; V2 = r.entero(2, 9) * 100; T2 = T1 * V2 / V1; }
    while (V1 === V2 || T2 !== Math.round(T2));
    var gas = r.elige(['helio', 'nitr&oacute;geno', 'arg&oacute;n', 'ox&iacute;geno']);
    return P.ejercicio('Una muestra de ' + gas + ' ocupa ' + V1 + ' ml a ' + T1 + ' K. &iquest;A qu&eacute; temperatura ocupar&aacute; ' + V2 + ' ml si la presi&oacute;n no cambia?',
      num(r, T2, [T1 * V1 / V2, T1 + (V2 - V1), V2 - V1 + T1 / 2, T1], 'K', 0),
      ['Con presion constante es la ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>.', 'Si el volumen crece, la temperatura tambien (es directa).'],
      ['T<sub>2</sub> = T<sub>1</sub> &middot; V<sub>2</sub> / V<sub>1</sub> = ' + T1 + ' &times; ' + V2 + ' / ' + V1 + ' = <b>' + T2 + ' K</b>']);
  };

  /* 54. Ley de Boyle */
  casos.boyle = function (r) {
    var V1 = r.entero(10, 40) * 5, P1 = r.entero(2, 9), dp = r.entero(1, 5), P2 = P1 + dp;
    var V2 = P1 * V1 / P2;
    return P.ejercicio('Un gas ocupa un volumen de ' + P.num(V1, 1) + ' cm' + F.sup(3) + ' a una presi&oacute;n de ' + P.num(P1, 1) + ' atm. ' +
      '&iquest;Cu&aacute;l ser&aacute; el volumen si la presi&oacute;n aumenta ' + P.num(dp, 1) + ' atm m&aacute;s y la temperatura no cambia?',
      num(r, V2, [P1 * V1 / dp, V1 * P2 / P1, V1 - dp * 10, dp * V1 / P2], 'cm' + F.sup(3), 1),
      ['Con temperatura constante es la ley de Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.', 'La presion nueva es ' + P1 + ' + ' + dp + ' = ' + P2 + ' atm, no ' + dp + ' atm.'],
      ['P<sub>2</sub> = ' + P2 + ' atm', 'V<sub>2</sub> = ' + P1 + ' &times; ' + V1 + ' / ' + P2 + ' = <b>' + P.num(V2, 1) + ' cm' + F.sup(3) + '</b>']);
  };

  /* 55. Ley de Hooke */
  casos.hooke = function (r) {
    var m = r.entero(1, 12), x = r.entero(10, 90) / 100, k = m * 9.81 / x;
    return P.ejercicio('Si a un resorte se le cuelga una masa de ' + P.num(m) + ' kg, &eacute;ste se deforma ' + P.num(x) + ' m. Determine el valor de la constante k del resorte en N/m.' +
      P.considere('g = 9.81 m/s' + F.sup(2) + '.'),
      num(r, k, [m / x, m * 9.81 * x, x * 9.81 / m * 100, m * 9.81]),
      ['La fuerza que estira el resorte es el peso: F = mg.', 'Ley de Hooke: F = kx, asi que k = F / x.'],
      ['F = ' + m + ' &times; 9.81 = ' + P.num(m * 9.81) + ' N', 'k = ' + P.num(m * 9.81) + ' / ' + P.num(x) + ' = <b>' + P.num(k) + ' N/m</b>']);
  };

  /* 56. Principio de Pascal (prensa hidraulica) */
  casos.pascal = function (r) {
    var A1 = r.elige([5, 10, 20, 25]), mult = r.entero(4, 30), A2 = A1 * mult, F1 = r.entero(2, 20) * 10, F2 = F1 * mult;
    return P.ejercicio('En una prensa hidr&aacute;ulica, el &eacute;mbolo peque&ntilde;o tiene un &aacute;rea de ' + A1 + ' cm' + F.sup(2) + ' y el grande de ' + A2 +
      ' cm' + F.sup(2) + '. Si sobre el &eacute;mbolo peque&ntilde;o se aplica una fuerza de ' + F1 + ' N, &iquest;qu&eacute; fuerza se ejerce en el &eacute;mbolo grande?',
      P.opciones(r, F2, [F1 / mult, F1 + A2, F1 * A1, A2 * 2], { unidad: 'N', fmt: function (v) { return P.num(v, 0); } }),
      ['Principio de Pascal: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub>.', 'El embolo grande tiene ' + mult + ' veces el area, asi que recibe ' + mult + ' veces la fuerza.'],
      ['F<sub>2</sub> = ' + F1 + ' &times; ' + A2 + ' / ' + A1 + ' = <b>' + P.num(F2, 0) + ' N</b>']);
  };

  /* 57. Principio de Arquimedes */
  casos.arquimedes = function (r) {
    var V = r.entero(1, 30) / 10 * (r.bool() ? 1 : 10), E = 1000 * 9.81 * V;
    V = F.redondea(V, 2); E = 1000 * 9.81 * V;
    return P.ejercicio('Un cuerpo desplaza ' + P.num(V) + ' m' + F.sup(3) + ' de agua al sumergirse. &iquest;Cu&aacute;l es el empuje del agua sobre el cuerpo?' +
      P.considere('g = 9.81 m/s' + F.sup(2) + ' y &rho;<sub>agua</sub> = 1 000.00 kg/m' + F.sup(3) + '.'),
      num(r, E, [1000 * V, 9.81 * V, 1000 * 9.81 / V, E / 2], 'N'),
      ['Empuje = peso del agua desalojada: E = &rho; &middot; g &middot; V.', 'Multiplica los tres datos.'],
      ['E = 1000 &times; 9.81 &times; ' + F.n(V) + ' = <b>' + P.num(E) + ' N</b>']);
  };

  /* 58. Ley de Ohm: corriente */
  casos.ohmCorriente = function (r) {
    var V = r.elige([110, 120, 127, 220, 240]), I = r.elige([0.5, 1, 1.5, 2, 2.5, 4, 5]), R = V / I;
    if (R !== Math.round(R * 10) / 10) { V = 120; I = 2; R = 60; }
    return P.ejercicio('Un aparato el&eacute;ctrico tiene una resistencia de ' + P.num(R, 1) + ' &Omega; cuando est&aacute; funcionando. &iquest;Cu&aacute;l ser&aacute; la intensidad de corriente al conectarlo a ' + P.num(V, 1) + ' V?',
      num(r, I, [R / V, V * R / 100, V - R > 0 ? V - R : R - V, I * 2], 'A', 1),
      ['Ley de Ohm: V = I &middot; R, asi que I = V / R.', 'Divide el voltaje entre la resistencia.'],
      ['I = ' + V + ' / ' + F.n(R) + ' = <b>' + P.num(I, 1) + ' A</b>']);
  };

  /* 59. Ley de Ohm: voltaje */
  casos.ohmVoltaje = function (r) {
    var R = r.entero(1, 40) * 50, I = r.entero(1, 10) / 4, V = R * I;
    return P.ejercicio('Determine el voltaje en una resistencia de ' + P.num(R) + ' &Omega; si a trav&eacute;s de ella circula una corriente de ' + P.num(I) + ' A.',
      num(r, V, [R / I, I / R * 1000, R + I, V / 2], 'V'),
      ['Ley de Ohm: V = I &middot; R.', 'Multiplica la corriente por la resistencia.'],
      ['V = ' + P.num(I) + ' &times; ' + P.num(R) + ' = <b>' + P.num(V) + ' V</b>']);
  };

  /* 60. Ley de Snell */
  casos.snell = function (r) {
    var ang = r.elige([[30, 0.50], [40, 0.64], [45, 0.71], [53, 0.80], [60, 0.87], [70, 0.94]]);
    var n2 = r.elige([1.33, 1.5, 1.6]);
    var s2 = Math.round(ang[1] / n2 * 100) / 100;
    var a2 = Math.round(Math.asin(s2) * 180 / Math.PI * 10) / 10;
    var nCalc = ang[1] / s2;
    var medio = r.elige(['un vidrio', 'un bloque de acr&iacute;lico', 'un prisma de cuarzo']);
    return P.ejercicio('A ' + medio + ' se le hace llegar desde el aire un rayo de luz con un &aacute;ngulo de incidencia de ' + ang[0] + '&deg; y se refracta con un &aacute;ngulo de ' + a2 +
      '&deg;. &iquest;Cu&aacute;l es el &iacute;ndice de refracci&oacute;n del material?' +
      P.considere('n<sub>aire</sub> = 1, sen(' + ang[0] + '&deg;) = ' + ang[1].toFixed(2) + ' y sen(' + a2 + '&deg;) = ' + s2.toFixed(2) + '.'),
      num(r, nCalc, [s2 / ang[1], ang[1] * s2, ang[0] / a2 > 3 ? ang[1] + s2 : ang[0] / a2, ang[1] - s2 + 1]),
      ['Ley de Snell: n<sub>1</sub> sen &theta;<sub>1</sub> = n<sub>2</sub> sen &theta;<sub>2</sub>.', 'Despeja n<sub>2</sub> = sen &theta;<sub>1</sub> / sen &theta;<sub>2</sub> (porque n<sub>1</sub> = 1).'],
      ['n<sub>2</sub> = ' + ang[1].toFixed(2) + ' / ' + s2.toFixed(2) + ' = <b>' + P.num(nCalc) + '</b>']);
  };

  /* ================= otras formas de preguntar =================
     Cada reactivo de la guia tiene mas enfoques: despejar otra variable,
     un problema de la vida diaria o el concepto detras de la formula. */
  function m(v) { return F.n(v).replace(/^-/, '&minus;'); }
  var G = 'g = 9.81 m/s' + F.sup(2);

  /* ---------- 43. velocidad ---------- */
  function velDistancia(r) {
    var v = r.entero(2, 25), t = r.entero(5, 60), d = v * t;
    var quien = r.elige(['Un ciclista', 'Un corredor', 'Un tren de juguete', 'Una patinadora']);
    return P.ejercicio(quien + ' se mueve con velocidad constante de ' + v + ' m/s durante ' + t + ' s. &iquest;Qu&eacute; distancia recorre?',
      num(r, d, [v / t, t / v, v + t, d / 2], 'm', 0),
      ['En movimiento uniforme: d = v &middot; t.', 'Multiplica la velocidad por el tiempo.'],
      ['d = ' + v + ' &times; ' + t + ' = <b>' + d + ' m</b>']);
  }

  function velTiempo(r) {
    var v = r.entero(2, 20), t = r.entero(5, 90), d = v * t;
    return P.ejercicio('&iquest;Cu&aacute;nto tiempo tarda en recorrer ' + P.num(d, 0) + ' m un m&oacute;vil que va a velocidad constante de ' + v + ' m/s?',
      num(r, t, [d * v, v / d, d - v, d / (2 * v)], 's', 0),
      ['De v = d / t se despeja t = d / v.', 'Divide la distancia entre la velocidad.'],
      ['t = ' + d + ' / ' + v + ' = <b>' + t + ' s</b>']);
  }

  function velConversion(r) {
    var ms = r.entero(2, 40), kmh = F.redondea(ms * 3.6, 2);
    if (r.bool()) {
      return P.ejercicio('Un autom&oacute;vil viaja a ' + F.n(kmh) + ' km/h. &iquest;Cu&aacute;l es su velocidad en m/s?',
        num(r, ms, [kmh * 3.6, kmh * 1000 / 60, kmh / 36, kmh * 1000], 'm/s', 1),
        ['1 km = 1 000 m y 1 h = 3 600 s.', 'Para pasar de km/h a m/s divide entre 3.6.'],
        [F.n(kmh) + ' &times; 1 000 / 3 600 = <b>' + ms + ' m/s</b>']);
    }
    return P.ejercicio('Un corredor va a ' + ms + ' m/s. &iquest;Cu&aacute;l es su velocidad en km/h?',
      num(r, kmh, [ms / 3.6, ms * 60, ms * 3600, ms * 1000 / 3600], 'km/h', 1),
      ['En una hora hay 3 600 s y en un kilometro 1 000 m.', 'Para pasar de m/s a km/h multiplica por 3.6.'],
      [ms + ' &times; 3.6 = <b>' + F.n(kmh) + ' km/h</b>']);
  }

  function velMedia(r) {
    var v1, t1, v2, t2;
    do { v1 = r.entero(4, 12) * 10; t1 = r.entero(1, 4); v2 = r.entero(4, 12) * 10; t2 = r.entero(1, 4); }
    while (v1 === v2 || t1 === t2 || (v1 * t1 + v2 * t2) % (t1 + t2) !== 0);
    var d = v1 * t1 + v2 * t2, vm = d / (t1 + t2);
    return P.ejercicio('Un autob&uacute;s viaja ' + t1 + ' h a ' + v1 + ' km/h y despu&eacute;s ' + t2 + ' h a ' + v2 + ' km/h. &iquest;Cu&aacute;l fue su velocidad media en todo el viaje?',
      num(r, vm, [(v1 + v2) / 2, d, v1 + v2, d / 2], 'km/h', 1),
      ['Velocidad media = distancia TOTAL / tiempo TOTAL.', 'No es el promedio de las dos velocidades, porque viaja distinto tiempo a cada una.'],
      ['d = ' + v1 + '(' + t1 + ') + ' + v2 + '(' + t2 + ') = ' + d + ' km en ' + (t1 + t2) + ' h', 'v = ' + d + ' / ' + (t1 + t2) + ' = <b>' + F.n(vm) + ' km/h</b>']);
  }

  /* ---------- 44. aceleracion ---------- */
  function acelVf(r) {
    var v0 = r.bool(0.4) ? 0 : r.entero(2, 20), a = r.entero(1, 6), t = r.entero(2, 12), vf = v0 + a * t;
    return P.ejercicio('Un autom&oacute;vil ' + (v0 ? 'que va a ' + v0 + ' m/s' : 'que parte del reposo') + ' acelera a ' + a + ' m/s' + F.sup(2) + ' durante ' + t + ' s. &iquest;Qu&eacute; velocidad alcanza?',
      num(r, vf, [a * t, v0 + a, a * t * t + v0, v0 + a * t * t / 2], 'm/s', 0),
      ['v<sub>f</sub> = v<sub>0</sub> + a &middot; t.', v0 ? 'No olvides la velocidad que ya traia.' : 'Parte del reposo: v<sub>0</sub> = 0.'],
      ['v<sub>f</sub> = ' + v0 + ' + ' + a + ' &times; ' + t + ' = <b>' + vf + ' m/s</b>']);
  }

  function acelDistancia(r) {
    var a = r.entero(1, 6), t = r.entero(2, 12), d = a * t * t / 2;
    return P.ejercicio('Un m&oacute;vil parte del reposo con una aceleraci&oacute;n constante de ' + a + ' m/s' + F.sup(2) + '. &iquest;Qu&eacute; distancia recorre en ' + t + ' s?' +
      P.considere('d = v<sub>0</sub>t + ' + F.frac(1, 2) + 'at' + F.sup(2) + '.'),
      num(r, d, [a * t * t, a * t, a * t / 2, a * t * t / 4], 'm', 1),
      ['Parte del reposo: v<sub>0</sub> = 0, asi que d = ' + F.frac(1, 2) + 'at' + F.sup(2) + '.', 'Primero eleva el tiempo al cuadrado.'],
      ['d = ' + F.frac(1, 2) + '(' + a + ')(' + t + ')' + F.sup(2) + ' = <b>' + F.n(d) + ' m</b>']);
  }

  function acelFrenado(r) {
    var a = r.entero(2, 8), t = r.entero(2, 10), v0 = a * t;
    return P.ejercicio('Un autom&oacute;vil que va a ' + v0 + ' m/s frena de manera uniforme y se detiene en ' + t + ' s. &iquest;Cu&aacute;l es su aceleraci&oacute;n?',
      P.opciones(r, -a, [a, -v0 * t, t / v0, -v0], { conSigno: true, fmt: function (x) { return m(F.redondea(x, 2)) + ' m/s' + F.sup(2); } }),
      ['a = (v<sub>f</sub> &minus; v<sub>0</sub>) / t, y al detenerse v<sub>f</sub> = 0.', 'Al frenar la aceleracion es NEGATIVA (va en contra del movimiento).'],
      ['a = (0 &minus; ' + v0 + ') / ' + t + ' = <b>' + m(-a) + ' m/s' + F.sup(2) + '</b>']);
  }

  function caidaLibre(r) {
    var t = r.entero(1, 6), v = F.redondea(9.81 * t, 2), pideV = r.bool(), d = F.redondea(9.81 * t * t / 2, 2);
    if (pideV) {
      return P.ejercicio('Se deja caer una piedra desde el reposo. &iquest;Qu&eacute; velocidad lleva despu&eacute;s de ' + t + ' s? (No considere la resistencia del aire.)' + P.considere(G + '.'),
        num(r, v, [d, 9.81 / t, 9.81 * t * t, 9.81], 'm/s'),
        ['Es caida libre: un movimiento acelerado con a = g.', 'v = g &middot; t (parte del reposo).'],
        ['v = 9.81 &times; ' + t + ' = <b>' + P.num(v) + ' m/s</b>']);
    }
    return P.ejercicio('Se deja caer una piedra desde el reposo. &iquest;Qu&eacute; distancia ha ca&iacute;do despu&eacute;s de ' + t + ' s? (No considere la resistencia del aire.)' + P.considere(G + '.'),
      num(r, d, [v, 9.81 * t * t, 9.81 * t / 2, d / 2], 'm'),
      ['d = ' + F.frac(1, 2) + 'gt' + F.sup(2) + '.', 'Eleva el tiempo al cuadrado antes de multiplicar.'],
      ['d = ' + F.frac(1, 2) + '(9.81)(' + t + ')' + F.sup(2) + ' = <b>' + P.num(d) + ' m</b>']);
  }

  /* ---------- 45. fuerza neta ---------- */
  function fnOpuestas(r) {
    var f1 = r.entero(5, 40) * 10, f2 = r.entero(5, 40) * 10;
    while (f1 === f2) f2 = r.entero(5, 40) * 10;
    var neta = Math.abs(f1 - f2), lado = f1 > f2 ? 'derecha' : 'izquierda', otro = f1 > f2 ? 'izquierda' : 'derecha';
    function op(v, l) { return v + ' N hacia la ' + l; }
    return P.ejercicio('Dos personas jalan una caja en sentidos opuestos: una con ' + f1 + ' N hacia la derecha y la otra con ' + f2 + ' N hacia la izquierda. &iquest;Cu&aacute;l es la fuerza neta sobre la caja?',
      P.opciones(r, op(neta, lado), [op(neta, otro), op(f1 + f2, lado), op(f1 + f2, otro), '0 N, porque las fuerzas se anulan']),
      ['Fuerzas en sentidos opuestos se RESTAN.', 'La fuerza neta va hacia el lado de la fuerza mayor.'],
      [Math.max(f1, f2) + ' &minus; ' + Math.min(f1, f2) + ' = ' + neta + ' N', '<b>' + op(neta, lado) + '</b>']);
  }

  function fnFriccion(r) {
    var mm = r.entero(5, 40), a = r.entero(1, 5), fr = r.entero(2, 12) * 5, Fa = mm * a + fr;
    return P.ejercicio('Se empuja una caja de ' + mm + ' kg con una fuerza de ' + Fa + ' N y la fricci&oacute;n con el piso es de ' + fr + ' N. &iquest;Qu&eacute; aceleraci&oacute;n adquiere la caja?',
      num(r, a, [Fa / mm, (Fa + fr) / mm, fr / mm, (Fa - fr) * mm], 'm/s' + F.sup(2), 2),
      ['La friccion va en contra del empuje: la fuerza neta es ' + Fa + ' &minus; ' + fr + '.', 'Luego a = F<sub>neta</sub> / m.'],
      ['F<sub>neta</sub> = ' + Fa + ' &minus; ' + fr + ' = ' + (Fa - fr) + ' N', 'a = ' + (Fa - fr) + ' / ' + mm + ' = <b>' + a + ' m/s' + F.sup(2) + '</b>']);
  }

  function fnPrimeraLey(r) {
    var ops = ['Permanece en reposo o sigue movi&eacute;ndose con velocidad constante', 'Se detiene poco a poco hasta quedar en reposo',
      'Acelera en la direcci&oacute;n en que se mov&iacute;a', 'Cae hacia el centro de la Tierra con aceleraci&oacute;n g'];
    return P.ejercicio('Si la fuerza neta que act&uacute;a sobre un cuerpo es cero, entonces el cuerpo:',
      P.opciones(r, ops[0], ops.slice(1)),
      ['Es la primera ley de Newton (ley de la inercia).', 'Sin fuerza neta no hay aceleracion: la velocidad no cambia (puede ser cero o no).'],
      ['Primera ley: <b>' + ops[0].toLowerCase() + '</b>']);
  }

  /* ---------- 46. segunda y tercera ley ---------- */
  function newtonMasa(r) {
    var mm = r.entero(2, 60) * 5, a = r.entero(1, 8), f = mm * a;
    return P.ejercicio('Una fuerza neta de ' + P.num(f, 0) + ' N produce en un cuerpo una aceleraci&oacute;n de ' + a + ' m/s' + F.sup(2) + '. &iquest;Cu&aacute;l es la masa del cuerpo?',
      num(r, mm, [f * a, a / f, f - a, f / (2 * a)], 'kg', 1),
      ['Segunda ley: F = m &middot; a, asi que m = F / a.', 'Divide la fuerza entre la aceleracion.'],
      ['m = ' + f + ' / ' + a + ' = <b>' + mm + ' kg</b>']);
  }

  function newtonFuerza(r) {
    var mm = r.entero(4, 30) * 50, a = r.entero(1, 8) / 2, f = mm * a;
    var cosa = r.elige(['un autom&oacute;vil', 'una camioneta', 'un tractor']);
    return P.ejercicio('&iquest;Qu&eacute; fuerza neta se necesita para que ' + cosa + ' de ' + P.num(mm, 0) + ' kg acelere a ' + F.n(a) + ' m/s' + F.sup(2) + '?',
      num(r, f, [mm / a, a / mm * 1000, mm + a, f * 9.81], 'N', 1),
      ['Segunda ley de Newton: F = m &middot; a.', 'Multiplica la masa por la aceleracion.'],
      ['F = ' + mm + ' &times; ' + F.n(a) + ' = <b>' + P.num(f, 1) + ' N</b>']);
  }

  function newtonLeyes(r) {
    var s = r.elige([
      ['Cuando un autob&uacute;s frena de golpe, los pasajeros se van hacia adelante.', 'Primera ley (inercia)'],
      ['Un mantel se jala muy r&aacute;pido y los platos se quedan en la mesa.', 'Primera ley (inercia)'],
      ['Mientras m&aacute;s fuerte se patea un bal&oacute;n, mayor aceleraci&oacute;n adquiere.', 'Segunda ley (F = ma)'],
      ['Con la misma fuerza, un carrito vac&iacute;o acelera m&aacute;s que uno lleno.', 'Segunda ley (F = ma)'],
      ['Al remar, el remo empuja el agua hacia atr&aacute;s y la lancha avanza hacia adelante.', 'Tercera ley (acci&oacute;n y reacci&oacute;n)'],
      ['Un cohete expulsa gases hacia abajo y &eacute;l sube.', 'Tercera ley (acci&oacute;n y reacci&oacute;n)']]);
    var todas = ['Primera ley (inercia)', 'Segunda ley (F = ma)', 'Tercera ley (acci&oacute;n y reacci&oacute;n)', 'Ley de la gravitaci&oacute;n universal'];
    return P.ejercicio('&iquest;Qu&eacute; ley de Newton explica la siguiente situaci&oacute;n?<br><div class="lectura">' + s[0] + '</div>',
      P.opciones(r, s[1], todas.filter(function (x) { return x !== s[1]; })),
      ['Inercia: los cuerpos se resisten a cambiar su movimiento. F = ma: mas fuerza, mas aceleracion; mas masa, menos.', 'Accion y reaccion: si empujas algo, ese algo te empuja a ti en sentido contrario.'],
      ['Es la <b>' + s[1] + '</b>']);
  }

  /* ---------- 47. masa y peso ---------- */
  function pesoDeMasa(r) {
    var mm = r.entero(20, 95), w = F.redondea(mm * 9.81, 2);
    return P.ejercicio('&iquest;Cu&aacute;l es el peso de una persona de ' + mm + ' kg de masa?' + P.considere(G + '.'),
      P.opciones(r, P.num(w) + ' N', [P.num(mm) + ' N', P.num(mm / 9.81) + ' N', P.num(w) + ' kg', P.num(mm * 10) + ' kg']),
      ['Peso = masa &times; gravedad (W = mg).', 'El peso es una fuerza: se mide en newtons, no en kilogramos.'],
      ['W = ' + mm + ' &times; 9.81 = <b>' + P.num(w) + ' N</b>']);
  }

  function pesoLuna(r) {
    var mm = r.entero(40, 95), w = F.redondea(mm * 1.62, 2);
    return P.ejercicio('Un astronauta tiene una masa de ' + mm + ' kg. &iquest;Cu&aacute;nto pesa en la Luna?' + P.considere('g<sub>Luna</sub> = 1.62 m/s' + F.sup(2) + '.'),
      num(r, w, [mm, mm * 9.81, mm / 1.62, mm * 9.81 / 6 * 1.62], 'N'),
      ['La masa es la misma en la Luna; lo que cambia es la gravedad.', 'W = m &middot; g<sub>Luna</sub>.'],
      ['W = ' + mm + ' &times; 1.62 = <b>' + P.num(w) + ' N</b>']);
  }

  function masaConcepto(r) {
    var ops = ['Su masa es la misma y su peso disminuye', 'Su masa y su peso disminuyen', 'Su masa disminuye y su peso es el mismo', 'Su masa y su peso no cambian'];
    return P.ejercicio('Un astronauta viaja de la Tierra a la Luna, donde la gravedad es menor. &iquest;Qu&eacute; pasa con su masa y con su peso?',
      P.opciones(r, ops[0], ops.slice(1)),
      ['La masa es la cantidad de materia: no depende del lugar.', 'El peso es la fuerza con que la gravedad atrae esa masa: W = mg.'],
      ['<b>' + ops[0] + '</b>']);
  }

  /* ---------- 48. Kepler y gravitacion ---------- */
  function keplerRelacione(r) {
    var pares = [['Primera ley (de las &oacute;rbitas)', 'Los planetas giran en &oacute;rbitas el&iacute;pticas con el Sol en uno de sus focos'],
      ['Segunda ley (de las &aacute;reas)', 'La l&iacute;nea Sol-planeta barre &aacute;reas iguales en tiempos iguales'],
      ['Tercera ley (de los periodos)', 'El cuadrado del periodo es proporcional al cubo de la distancia media al Sol']];
    var der = r.baraja(pares.map(function (p) { return p[1]; }).concat(['Todo cuerpo atrae a otro con una fuerza proporcional a sus masas']));
    return P.relacione(r, 'Relacione cada ley de Kepler con lo que establece.', ['Ley', 'Enunciado'],
      pares.map(function (p) { return p[0]; }), der, pares.map(function (p) { return der.indexOf(p[1]); }),
      ['Orbitas: forma de la trayectoria. Areas: rapidez (mas rapido cerca del Sol). Periodos: tiempo de una vuelta segun la distancia.', 'La atraccion entre masas es la ley de Newton, no de Kepler.'], []);
  }

  function keplerTercera(r) {
    var k = r.elige([4, 9, 16, 25]), T = Math.pow(k, 1.5);
    return P.ejercicio('Un planeta est&aacute; ' + k + ' veces m&aacute;s lejos del Sol que otro. Seg&uacute;n la tercera ley de Kepler (T' + F.sup(2) + ' es proporcional a a' + F.sup(3) + '), &iquest;cu&aacute;ntas veces mayor es su periodo?',
      P.opciones(r, T, [k, k * k, Math.sqrt(k), k * k * k], { fmt: function (x) { return F.n(x) + ' veces'; } }),
      ['Si la distancia se multiplica por ' + k + ', a' + F.sup(3) + ' se multiplica por ' + k + F.sup(3) + '.', 'T' + F.sup(2) + ' crece igual, asi que T crece como la raiz: &radic;(' + k + F.sup(3) + ').'],
      ['T' + F.sup(2) + ' &prop; ' + k + F.sup(3) + ' = ' + (k * k * k), 'T &prop; &radic;' + (k * k * k) + ' = <b>' + T + ' veces</b>']);
  }

  function gravitacion(r) {
    var c = r.elige([['la distancia entre ellos se duplica', 'Se reduce a la cuarta parte'], ['la distancia entre ellos se triplica', 'Se reduce a la novena parte'],
      ['la distancia entre ellos se reduce a la mitad', 'Se hace cuatro veces mayor'], ['la masa de uno de ellos se duplica', 'Se duplica'],
      ['las masas de los dos se duplican', 'Se hace cuatro veces mayor']]);
    var todas = ['Se reduce a la cuarta parte', 'Se reduce a la novena parte', 'Se hace cuatro veces mayor', 'Se duplica', 'Se reduce a la mitad', 'No cambia'];
    return P.ejercicio('Seg&uacute;n la ley de la gravitaci&oacute;n universal, F = G' + F.frac('m<sub>1</sub>m<sub>2</sub>', 'd' + F.sup(2)) + '. Si ' + c[0] + ', &iquest;qu&eacute; pasa con la fuerza de atracci&oacute;n?',
      P.opciones(r, c[1], r.muestra(todas.filter(function (x) { return x !== c[1]; }), 4)),
      ['La fuerza es directamente proporcional a las masas.', 'Es inversamente proporcional al CUADRADO de la distancia.'],
      ['<b>' + c[1] + '</b>']);
  }

  /* ---------- 49. calor ---------- */
  function calorEjemplo(r) {
    var c = r.elige([['una cuchara met&aacute;lica se calienta al dejarla en una olla de sopa caliente', 'Conducci&oacute;n'],
      ['te quemas la mano al tocar un comal caliente', 'Conducci&oacute;n'],
      ['en una olla el agua caliente sube y la fr&iacute;a baja, formando corrientes', 'Convecci&oacute;n'],
      ['el aire caliente de un calefactor calienta toda la habitaci&oacute;n', 'Convecci&oacute;n'],
      ['sientes el calor de una fogata aunque est&eacute;s a un metro de distancia', 'Radiaci&oacute;n'],
      ['el Sol calienta la Tierra a trav&eacute;s del espacio vac&iacute;o', 'Radiaci&oacute;n']]);
    return P.ejercicio('&iquest;Qu&eacute; forma de transferencia de calor ocurre cuando ' + c[0] + '?',
      P.opciones(r, c[1], ['Conducci&oacute;n', 'Convecci&oacute;n', 'Radiaci&oacute;n', 'Propagaci&oacute;n'].filter(function (x) { return x !== c[1]; })),
      ['Conduccion: por contacto, de particula a particula. Conveccion: el fluido (aire o agua) se mueve llevando el calor.', 'Radiacion: ondas que viajan aun sin contacto ni aire.'],
      ['Es <b>' + c[1].toLowerCase() + '</b>']);
  }

  function calorQ(r) {
    var mm = r.entero(2, 20) * 50, t1 = r.entero(10, 30), t2 = t1 + r.entero(2, 12) * 5, Q = mm * (t2 - t1);
    return P.ejercicio('&iquest;Cu&aacute;nto calor se necesita para calentar ' + mm + ' g de agua de ' + t1 + ' &deg;C a ' + t2 + ' &deg;C?' +
      P.considere('Q = m &middot; c &middot; &Delta;T y c<sub>agua</sub> = 1 cal/g&deg;C.'),
      P.opciones(r, Q, [mm * t2, mm * t1, mm * (t1 + t2), t2 - t1], { unidad: 'cal', fmt: function (x) { return P.num(x, 0); } }),
      ['&Delta;T es el CAMBIO de temperatura: final menos inicial.', 'Multiplica masa &times; calor especifico &times; &Delta;T.'],
      ['&Delta;T = ' + t2 + ' &minus; ' + t1 + ' = ' + (t2 - t1) + ' &deg;C', 'Q = ' + mm + ' &times; 1 &times; ' + (t2 - t1) + ' = <b>' + P.num(Q, 0) + ' cal</b>']);
  }

  /* ---------- 50. temperatura ---------- */
  function tempConversion(r) {
    var tipo = r.entero(0, 2), enun, v, malas, sol, u;
    if (tipo === 0) {
      var c = r.entero(-30, 150); v = F.redondea(c + 273.15, 2); u = 'K';
      enun = 'Convierta ' + m(c) + ' &deg;C a kelvin.' + P.considere('K = &deg;C + 273.15.');
      malas = [c - 273.15, c * 273.15 / 100, c + 32]; sol = c + ' + 273.15 = <b>' + P.num(v) + ' K</b>';
    } else if (tipo === 1) {
      var c2 = r.entero(-20, 100) ; v = F.redondea(1.8 * c2 + 32, 2); u = '&deg;F';
      enun = 'Convierta ' + m(c2) + ' &deg;C a grados Fahrenheit.' + P.considere('&deg;F = 1.8 &middot; &deg;C + 32.');
      malas = [(c2 - 32) / 1.8, 1.8 * c2, c2 + 32, 1.8 * (c2 + 32)]; sol = '1.8(' + c2 + ') + 32 = <b>' + P.num(v) + ' &deg;F</b>';
    } else {
      var f = r.entero(0, 220); v = F.redondea((f - 32) / 1.8, 2); u = '&deg;C';
      enun = 'Convierta ' + f + ' &deg;F a grados Celsius.' + P.considere('&deg;C = (&deg;F &minus; 32) / 1.8.');
      malas = [1.8 * f + 32, f / 1.8 - 32, (f + 32) / 1.8, f - 32]; sol = '(' + f + ' &minus; 32) / 1.8 = <b>' + P.num(v) + ' &deg;C</b>';
    }
    return P.ejercicio(enun, P.opciones(r, v, malas.map(function (x) { return F.redondea(x, 2); }), { unidad: u, conSigno: true, fmt: function (x) { return P.num(x).replace(/^-/, '&minus;'); } }),
      ['Sustituye en la formula que te dan, respetando el orden de las operaciones.', 'Para Fahrenheit: primero multiplica y luego suma (o primero resta y luego divide, al reves).'], [sol]);
  }

  function tempEquilibrio(r) {
    var m1, t1, m2, t2, T;
    do { m1 = r.entero(1, 8) * 50; t1 = r.entero(50, 90); m2 = r.entero(1, 8) * 50; t2 = r.entero(5, 30); T = (m1 * t1 + m2 * t2) / (m1 + m2); }
    while (T !== Math.round(T * 10) / 10);
    return P.ejercicio('Se mezclan ' + m1 + ' g de agua a ' + t1 + ' &deg;C con ' + m2 + ' g de agua a ' + t2 + ' &deg;C. Si no hay p&eacute;rdidas de calor, &iquest;cu&aacute;l es la temperatura final de la mezcla?',
      num(r, T, [(t1 + t2) / 2, t1 - t2, (m1 * t2 + m2 * t1) / (m1 + m2), (t1 * t2) / (t1 + t2)], '&deg;C', 1),
      ['El calor que pierde el agua caliente lo gana la fria: m<sub>1</sub>(t<sub>1</sub> &minus; T) = m<sub>2</sub>(T &minus; t<sub>2</sub>).', 'Queda T = (m<sub>1</sub>t<sub>1</sub> + m<sub>2</sub>t<sub>2</sub>) / (m<sub>1</sub> + m<sub>2</sub>): un promedio pesado por las masas.'],
      ['T = (' + m1 + '&times;' + t1 + ' + ' + m2 + '&times;' + t2 + ') / ' + (m1 + m2) + ' = <b>' + F.n(T) + ' &deg;C</b>']);
  }

  function tempUnidades(r) {
    var c = r.elige([['el calor', 'Joule (J)'], ['la temperatura', 'Kelvin (K)'], ['la potencia', 'Watt (W)'], ['la presi&oacute;n', 'Pascal (Pa)']]);
    var todas = ['Joule (J)', 'Kelvin (K)', 'Watt (W)', 'Pascal (Pa)', 'Calor&iacute;a (cal)', 'Newton (N)'];
    return P.ejercicio('&iquest;Cu&aacute;l es la unidad de ' + c[0] + ' en el Sistema Internacional?',
      P.opciones(r, c[1], r.muestra(todas.filter(function (x) { return x !== c[1]; }), 4)),
      ['El calor es energia: se mide igual que el trabajo.', 'La caloria se usa mucho, pero no es del Sistema Internacional.'],
      ['Unidad de ' + c[0] + ': <b>' + c[1] + '</b>']);
  }

  /* ---------- 51. sistemas termodinamicos ---------- */
  function sisEjemplo(r) {
    var c = r.elige([['Un termo bien cerrado que mantiene caliente el caf&eacute;', 'Aislado'], ['Una olla con tapa sobre la estufa', 'Cerrado'],
      ['Un refresco sellado dentro del refrigerador', 'Cerrado'], ['Una olla sin tapa con agua hirviendo', 'Abierto'], ['El cuerpo humano', 'Abierto'], ['Una planta que hace fotos&iacute;ntesis', 'Abierto']]);
    return P.ejercicio('&iquest;Qu&eacute; tipo de sistema termodin&aacute;mico es el siguiente?<br><div class="lectura">' + c[0] + '.</div>',
      P.opciones(r, c[1], ['Abierto', 'Cerrado', 'Aislado', 'Adiab&aacute;tico parcial'].filter(function (x) { return x !== c[1]; })),
      ['Abierto: intercambia materia y energia. Cerrado: solo energia. Aislado: ni materia ni energia.', 'Piensa si algo entra o sale (vapor, comida, aire) y si pasa el calor.'],
      ['Es un sistema <b>' + c[1].toLowerCase() + '</b>']);
  }

  /* ---------- 52. leyes de la termodinamica ---------- */
  function primeraLeyCalc(r) {
    var Q = r.entero(4, 30) * 50, W = r.entero(1, 15) * 50;
    while (W >= Q) W = r.entero(1, 15) * 50;
    var dU = Q - W;
    return P.ejercicio('Un gas absorbe ' + Q + ' J de calor y realiza un trabajo de ' + W + ' J. &iquest;Cu&aacute;l es el cambio de su energ&iacute;a interna?' +
      P.considere('la primera ley: Q = &Delta;U + W.'),
      P.opciones(r, dU, [Q + W, W - Q, Q * W / 100, Q], { unidad: 'J', conSigno: true, fmt: m }),
      ['Despeja &Delta;U = Q &minus; W.', 'El calor que entra se reparte: una parte se vuelve trabajo y el resto queda como energia interna.'],
      ['&Delta;U = ' + Q + ' &minus; ' + W + ' = <b>' + dU + ' J</b>']);
  }

  function eficiencia(r) {
    var Q = r.entero(4, 40) * 100, e = r.elige([10, 15, 20, 25, 30, 40]), W = Q * e / 100;
    return P.ejercicio('Una m&aacute;quina t&eacute;rmica recibe ' + P.num(Q, 0) + ' J de calor y produce ' + P.num(W, 0) + ' J de trabajo. &iquest;Cu&aacute;l es su eficiencia?' +
      P.considere('e = W / Q<sub>entrada</sub> &times; 100%.'),
      P.opciones(r, e, [100 - e, Q / W * 100, W / 100, e / 100], { fmt: function (x) { return F.n(x, 2) + '%'; } }),
      ['La eficiencia es la parte del calor que se convierte en trabajo.', 'Ninguna maquina termica llega al 100% (segunda ley).'],
      ['e = ' + W + ' / ' + Q + ' &times; 100 = <b>' + e + '%</b>']);
  }

  function leyEjemplo(r) {
    var c = r.elige([['Un caf&eacute; caliente se enfr&iacute;a solo en la habitaci&oacute;n, pero nunca se calienta solo.', 'Segunda'],
      ['Un term&oacute;metro marca la temperatura del paciente cuando alcanza el equilibrio t&eacute;rmico con &eacute;l.', 'Cero'],
      ['Ninguna m&aacute;quina puede producir trabajo sin recibir energ&iacute;a: la energ&iacute;a no se crea ni se destruye.', 'Primera'],
      ['Por m&aacute;s que se enfr&iacute;e una sustancia, nunca se llega exactamente a 0 K.', 'Tercera']]);
    return P.ejercicio('&iquest;Qu&eacute; ley de la termodin&aacute;mica explica la siguiente situaci&oacute;n?<br><div class="lectura">' + c[0] + '</div>',
      P.opciones(r, c[1], ['Cero', 'Primera', 'Segunda', 'Tercera'].filter(function (x) { return x !== c[1]; })),
      ['Cero: equilibrio termico. Primera: conservacion de la energia. Segunda: el calor va de lo caliente a lo frio (entropia).', 'Tercera: el cero absoluto es inalcanzable.'],
      ['Ley <b>' + c[1] + '</b>']);
  }

  /* ---------- 53. leyes de los gases ---------- */
  function gayLussac(r) {
    var P1, T1, T2, P2;
    do { P1 = r.entero(1, 8); T1 = r.entero(5, 8) * 50; T2 = r.entero(5, 10) * 50; P2 = P1 * T2 / T1; } while (T1 === T2 || P2 !== Math.round(P2 * 100) / 100);
    return P.ejercicio('Un tanque r&iacute;gido contiene un gas a ' + P1 + ' atm y ' + T1 + ' K. Si se calienta hasta ' + T2 + ' K, &iquest;cu&aacute;l ser&aacute; la presi&oacute;n?',
      num(r, P2, [P1 * T1 / T2, P1 + (T2 - T1) / 100, T2 / T1, P1 * (T2 - T1) / T1], 'atm'),
      ['Tanque rigido: el volumen no cambia. Es la ley de Gay-Lussac: P<sub>1</sub>/T<sub>1</sub> = P<sub>2</sub>/T<sub>2</sub>.', 'Si la temperatura sube, la presion sube en la misma proporcion.'],
      ['P<sub>2</sub> = ' + P1 + ' &times; ' + T2 + ' / ' + T1 + ' = <b>' + P.num(P2) + ' atm</b>']);
  }

  function charlesCelsius(r) {
    var V1 = r.entero(2, 9), c1 = r.elige([27, 7, 17, 47, 77]), c2 = c1 + r.entero(2, 8) * 10;
    var T1 = c1 + 273, T2 = c2 + 273, V2 = F.redondea(V1 * T2 / T1, 2);
    return P.ejercicio('Un globo tiene un volumen de ' + V1 + ' L a ' + c1 + ' &deg;C. Si la presi&oacute;n no cambia, &iquest;qu&eacute; volumen tendr&aacute; a ' + c2 + ' &deg;C?' +
      P.considere('K = &deg;C + 273.'),
      num(r, V2, [V1 * c2 / c1, V1 * T1 / T2, V1 + (c2 - c1) / 10, V1 * c1 / c2], 'L'),
      ['En las leyes de los gases la temperatura SIEMPRE va en kelvin.', 'Ley de Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub>.'],
      ['T<sub>1</sub> = ' + T1 + ' K, T<sub>2</sub> = ' + T2 + ' K', 'V<sub>2</sub> = ' + V1 + ' &times; ' + T2 + ' / ' + T1 + ' = <b>' + P.num(V2) + ' L</b>']);
  }

  function leyGas(r) {
    var c = r.elige([['la presi&oacute;n', 'Ley de Charles'], ['la temperatura', 'Ley de Boyle'], ['el volumen', 'Ley de Gay-Lussac']]);
    return P.ejercicio('En un proceso con una cantidad fija de gas, &iquest;qu&eacute; ley se aplica si se mantiene constante ' + c[0] + '?',
      P.opciones(r, c[1], ['Ley de Charles', 'Ley de Boyle', 'Ley de Gay-Lussac', 'Ley de Avogadro'].filter(function (x) { return x !== c[1]; })),
      ['Boyle: temperatura constante (PV = constante). Charles: presion constante (V/T = constante).', 'Gay-Lussac: volumen constante (P/T = constante).'],
      ['Con ' + c[0] + ' constante: <b>' + c[1] + '</b>']);
  }

  function boylePresion(r) {
    var P1, V1, V2, P2;
    do { P1 = r.entero(1, 9); V1 = r.entero(2, 20) * 5; V2 = r.entero(2, 20) * 5; P2 = P1 * V1 / V2; } while (V1 === V2 || P2 !== Math.round(P2 * 100) / 100);
    return P.ejercicio('Un gas a ' + P1 + ' atm ocupa ' + V1 + ' L. Si a temperatura constante se comprime (o expande) hasta ' + V2 + ' L, &iquest;cu&aacute;l ser&aacute; su presi&oacute;n?',
      num(r, P2, [P1 * V2 / V1, P1 + (V1 - V2) / 10, V1 / V2, P1 * V1 * V2 / 100], 'atm'),
      ['Ley de Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub>.', 'Si el volumen baja, la presion sube (son inversamente proporcionales).'],
      ['P<sub>2</sub> = ' + P1 + ' &times; ' + V1 + ' / ' + V2 + ' = <b>' + P.num(P2) + ' atm</b>']);
  }

  function boyleConcepto(r) {
    var c = r.elige([['se reduce a la mitad', 'Se duplica'], ['se duplica', 'Se reduce a la mitad'], ['se triplica', 'Se reduce a la tercera parte'], ['se reduce a la tercera parte', 'Se triplica']]);
    var todas = ['Se duplica', 'Se reduce a la mitad', 'Se triplica', 'Se reduce a la tercera parte', 'No cambia', 'Se cuadruplica'];
    return P.ejercicio('A temperatura constante, si el volumen de un gas ' + c[0] + ', &iquest;qu&eacute; le pasa a su presi&oacute;n?',
      P.opciones(r, c[1], r.muestra(todas.filter(function (x) { return x !== c[1]; }), 4)),
      ['Ley de Boyle: P &middot; V = constante.', 'Si una se multiplica por un numero, la otra se divide entre ese numero.'],
      ['<b>' + c[1] + '</b>']);
  }

  function gasesCombinada(r) {
    var P1, V1, T1, P2, T2, V2;
    do { P1 = r.entero(1, 4); V1 = r.entero(2, 12); T1 = r.entero(5, 8) * 50; P2 = r.entero(1, 6); T2 = r.entero(5, 10) * 50; V2 = P1 * V1 * T2 / (T1 * P2); }
    while (P1 === P2 || T1 === T2 || V2 !== Math.round(V2 * 100) / 100);
    return P.ejercicio('Un gas ocupa ' + V1 + ' L a ' + P1 + ' atm y ' + T1 + ' K. &iquest;Qu&eacute; volumen ocupar&aacute; a ' + P2 + ' atm y ' + T2 + ' K?' +
      P.considere('la ley general de los gases: ' + F.frac('P<sub>1</sub>V<sub>1</sub>', 'T<sub>1</sub>') + ' = ' + F.frac('P<sub>2</sub>V<sub>2</sub>', 'T<sub>2</sub>') + '.'),
      num(r, V2, [P2 * V1 * T2 / (T1 * P1), P1 * V1 * T1 / (T2 * P2), V1 * T2 / T1, V1 * P1 / P2], 'L'),
      ['Despeja V<sub>2</sub> = P<sub>1</sub>V<sub>1</sub>T<sub>2</sub> / (T<sub>1</sub>P<sub>2</sub>).', 'Revisa que las temperaturas esten en kelvin.'],
      ['V<sub>2</sub> = ' + P1 + '&times;' + V1 + '&times;' + T2 + ' / (' + T1 + '&times;' + P2 + ') = <b>' + P.num(V2) + ' L</b>']);
  }

  /* ---------- 55. Hooke ---------- */
  function hookeElongacion(r) {
    var k = r.entero(2, 40) * 25, x = r.entero(2, 40) / 100, f = F.redondea(k * x, 2);
    if (r.bool()) {
      return P.ejercicio('Un resorte tiene una constante k = ' + k + ' N/m. &iquest;Cu&aacute;nto se estira si se le aplica una fuerza de ' + P.num(f) + ' N?',
        num(r, x, [f * k / 1000, k / f / 100, f / k * 10, x * 2], 'm'),
        ['Ley de Hooke: F = k &middot; x, asi que x = F / k.', 'Divide la fuerza entre la constante del resorte.'],
        ['x = ' + P.num(f) + ' / ' + k + ' = <b>' + P.num(x) + ' m</b>']);
    }
    return P.ejercicio('&iquest;Qu&eacute; fuerza se necesita para estirar ' + P.num(x) + ' m un resorte cuya constante es k = ' + k + ' N/m?',
      num(r, f, [k / x, x / k * 1000, k + x, f * 2], 'N'),
      ['Ley de Hooke: F = k &middot; x.', 'Multiplica la constante por lo que se estira (en metros).'],
      ['F = ' + k + ' &times; ' + P.num(x) + ' = <b>' + P.num(f) + ' N</b>']);
  }

  function hookeEnergia(r) {
    var k = r.entero(2, 20) * 50, x = r.entero(1, 30) / 100, E = F.redondea(k * x * x / 2, 4);
    return P.ejercicio('Un resorte con constante k = ' + k + ' N/m se comprime ' + P.num(x) + ' m. &iquest;Cu&aacute;nta energ&iacute;a potencial el&aacute;stica almacena?' +
      P.considere('E = ' + F.frac(1, 2) + 'kx' + F.sup(2) + '.'),
      num(r, E, [k * x, k * x * x, k * x / 2, k * x * x * 2], 'J', 3),
      ['Eleva la deformacion al cuadrado antes de multiplicar.', 'No olvides el ' + F.frac(1, 2) + '.'],
      ['E = ' + F.frac(1, 2) + '(' + k + ')(' + P.num(x) + ')' + F.sup(2) + ' = <b>' + P.num(E, 3) + ' J</b>']);
  }

  /* ---------- 56. Pascal y presion ---------- */
  function pascalArea(r) {
    var A1 = r.elige([5, 10, 20, 25]), mult = r.entero(4, 30), F1 = r.entero(2, 20) * 10, F2 = F1 * mult, A2 = A1 * mult;
    return P.ejercicio('En una prensa hidr&aacute;ulica se aplican ' + F1 + ' N sobre un &eacute;mbolo de ' + A1 + ' cm' + F.sup(2) + ' para levantar un auto que pesa ' + P.num(F2, 0) +
      ' N. &iquest;Qu&eacute; &aacute;rea debe tener el &eacute;mbolo grande?',
      num(r, A2, [A1 * F1 / F2, F2 / A1, A1 + mult, A2 / 2], 'cm' + F.sup(2), 0),
      ['Principio de Pascal: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub>.', 'Despeja A<sub>2</sub> = A<sub>1</sub> &middot; F<sub>2</sub> / F<sub>1</sub>.'],
      ['A<sub>2</sub> = ' + A1 + ' &times; ' + F2 + ' / ' + F1 + ' = <b>' + A2 + ' cm' + F.sup(2) + '</b>']);
  }

  function presionFA(r) {
    var A = r.elige([0.02, 0.05, 0.1, 0.2, 0.25, 0.5]), p = r.entero(2, 60) * 100, f = F.redondea(p * A, 2);
    return P.ejercicio('Una caja ejerce una fuerza de ' + P.num(f) + ' N sobre una superficie de ' + F.n(A) + ' m' + F.sup(2) + '. &iquest;Qu&eacute; presi&oacute;n ejerce?',
      num(r, p, [f * A, A / f, f + A, f / A / 10], 'Pa', 0),
      ['Presion = fuerza / area.', 'Mientras mas chica el area, mayor la presion.'],
      ['P = ' + P.num(f) + ' / ' + F.n(A) + ' = <b>' + P.num(p, 0) + ' Pa</b>']);
  }

  function presionHidro(r) {
    var h = r.entero(2, 40), p = 1000 * 9.81 * h;
    return P.ejercicio('&iquest;Qu&eacute; presi&oacute;n ejerce el agua sobre un buzo que est&aacute; a ' + h + ' m de profundidad? (Solo la del agua.)' +
      P.considere('P = &rho;gh, ' + G + ' y &rho;<sub>agua</sub> = 1 000 kg/m' + F.sup(3) + '.'),
      num(r, p, [1000 * h, 9.81 * h, 1000 * 9.81 / h, p / 2], 'Pa'),
      ['La presion hidrostatica crece con la profundidad: P = &rho; &middot; g &middot; h.', 'Multiplica los tres datos.'],
      ['P = 1000 &times; 9.81 &times; ' + h + ' = <b>' + P.num(p) + ' Pa</b>']);
  }

  /* ---------- 57. Arquimedes ---------- */
  function arqFlota(r) {
    var c = r.elige([['madera de pino', 500], ['corcho', 240], ['hielo', 920], ['aluminio', 2700], ['hierro', 7870], ['pl&aacute;stico PVC', 1380]]);
    var flota = c[1] < 1000;
    var ops = ['Flota, porque es menos denso que el agua', 'Se hunde, porque es m&aacute;s denso que el agua',
      'Flota, porque es m&aacute;s denso que el agua', 'Se hunde, porque es menos denso que el agua'];
    return P.ejercicio('Un bloque macizo de ' + c[0] + ' (densidad ' + P.num(c[1], 0) + ' kg/m' + F.sup(3) + ') se coloca en agua (densidad 1 000 kg/m' + F.sup(3) + '). &iquest;Qu&eacute; ocurre?',
      P.opciones(r, flota ? ops[0] : ops[1], flota ? [ops[1], ops[2], ops[3]] : [ops[0], ops[2], ops[3]]),
      ['Un cuerpo flota si su densidad es MENOR que la del liquido.', 'Si es mayor, su peso le gana al empuje y se hunde.'],
      [P.num(c[1], 0) + (flota ? ' &lt; ' : ' &gt; ') + '1 000: <b>' + (flota ? ops[0] : ops[1]) + '</b>']);
  }

  function arqPesoAparente(r) {
    var W = r.entero(10, 90), E = r.entero(2, W - 3), Wa = W - E;
    return P.ejercicio('Un objeto pesa ' + W + ' N en el aire y ' + Wa + ' N cuando est&aacute; sumergido en agua. &iquest;Cu&aacute;l es el empuje que recibe?',
      num(r, E, [W + Wa, W, Wa, W / Wa], 'N', 1),
      ['Dentro del agua "pesa menos" porque el empuje lo ayuda a sostenerse.', 'Empuje = peso en el aire &minus; peso aparente.'],
      ['E = ' + W + ' &minus; ' + Wa + ' = <b>' + E + ' N</b>']);
  }

  function arqVolumen(r) {
    var V = r.entero(1, 40) / 100, E = F.redondea(1000 * 9.81 * V, 2);
    return P.ejercicio('Un cuerpo totalmente sumergido en agua recibe un empuje de ' + P.num(E) + ' N. &iquest;Qu&eacute; volumen tiene?' +
      P.considere('E = &rho;gV, ' + G + ' y &rho;<sub>agua</sub> = 1 000 kg/m' + F.sup(3) + '.'),
      num(r, V, [E / 1000, E / 9.81, E * 1000 * 9.81 / 1e6, V * 10], 'm' + F.sup(3), 2),
      ['Despeja V = E / (&rho; g).', 'Divide el empuje entre 1000 &times; 9.81 = 9 810.'],
      ['V = ' + P.num(E) + ' / 9 810 = <b>' + P.num(V) + ' m' + F.sup(3) + '</b>']);
  }

  /* ---------- 58 y 59. electricidad ---------- */
  function ohmResistencia(r) {
    var I = r.elige([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), R = r.entero(4, 60) * 5, V = I * R;
    return P.ejercicio('Por un aparato conectado a ' + P.num(V, 1) + ' V circula una corriente de ' + P.num(I, 1) + ' A. &iquest;Cu&aacute;l es su resistencia?',
      num(r, R, [V * I, I / V, V - I, R * 2], '&Omega;', 1),
      ['Ley de Ohm: V = I &middot; R, asi que R = V / I.', 'Divide el voltaje entre la corriente.'],
      ['R = ' + P.num(V, 1) + ' / ' + P.num(I, 1) + ' = <b>' + P.num(R, 1) + ' &Omega;</b>']);
  }

  function resistenciasSerieParalelo(r) {
    if (r.bool()) {
      var rs = [r.entero(1, 20) * 5, r.entero(1, 20) * 5, r.entero(1, 20) * 5], tot = rs[0] + rs[1] + rs[2];
      return P.ejercicio('Tres resistencias de ' + rs.join(' &Omega;, ') + ' &Omega; se conectan en serie. &iquest;Cu&aacute;l es la resistencia total?',
        num(r, tot, [1 / (1 / rs[0] + 1 / rs[1] + 1 / rs[2]), tot / 3, rs[0] * rs[1] * rs[2] / 100, Math.max.apply(null, rs)], '&Omega;'),
        ['En serie la corriente pasa por una y luego por otra: las resistencias se SUMAN.', 'R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub>.'],
        ['R<sub>T</sub> = ' + rs.join(' + ') + ' = <b>' + tot + ' &Omega;</b>']);
    }
    var par = r.elige([[6, 3], [12, 6], [4, 4], [10, 15], [20, 30], [12, 4], [60, 30]]), Rp = par[0] * par[1] / (par[0] + par[1]);
    return P.ejercicio('Dos resistencias de ' + par[0] + ' &Omega; y ' + par[1] + ' &Omega; se conectan en paralelo. &iquest;Cu&aacute;l es la resistencia equivalente?' +
      P.considere(F.frac(1, 'R<sub>T</sub>') + ' = ' + F.frac(1, 'R<sub>1</sub>') + ' + ' + F.frac(1, 'R<sub>2</sub>') + '.'),
      num(r, Rp, [par[0] + par[1], (par[0] + par[1]) / 2, par[0] * par[1], Math.abs(par[0] - par[1])], '&Omega;'),
      ['En paralelo la resistencia equivalente es MENOR que la mas chica.', 'Para dos resistencias: R<sub>T</sub> = R<sub>1</sub>R<sub>2</sub> / (R<sub>1</sub> + R<sub>2</sub>).'],
      ['R<sub>T</sub> = ' + par[0] + '&times;' + par[1] + ' / (' + par[0] + ' + ' + par[1] + ') = <b>' + P.num(Rp) + ' &Omega;</b>']);
  }

  function potenciaElectrica(r) {
    var V = r.elige([110, 120, 127, 220]), I = r.entero(1, 20) / 2, Pw = F.redondea(V * I, 2);
    var aparato = r.elige(['una plancha', 'un horno de microondas', 'una secadora de cabello', 'un calentador']);
    if (r.bool()) {
      return P.ejercicio('Si ' + aparato + ' conectada a ' + V + ' V consume una corriente de ' + F.n(I) + ' A, &iquest;cu&aacute;l es su potencia?',
        num(r, Pw, [V / I, I / V * 1000, V + I, Pw * 2], 'W', 1),
        ['Potencia electrica: P = V &middot; I.', 'Multiplica el voltaje por la corriente.'],
        ['P = ' + V + ' &times; ' + F.n(I) + ' = <b>' + P.num(Pw, 1) + ' W</b>']);
    }
    return P.ejercicio('Un aparato de ' + P.num(Pw, 0) + ' W se conecta a ' + V + ' V. &iquest;Qu&eacute; corriente consume?',
      num(r, I, [Pw * V / 1000, V / Pw * 10, Pw - V, I * 2], 'A', 2),
      ['P = V &middot; I, asi que I = P / V.', 'Divide la potencia entre el voltaje.'],
      ['I = ' + P.num(Pw, 0) + ' / ' + V + ' = <b>' + P.num(I) + ' A</b>']);
  }

  function energiaConsumo(r) {
    var W = r.elige([9, 15, 40, 60, 75, 100, 150, 1000, 1500]), h = r.entero(1, 8), d = r.elige([7, 15, 30]);
    var kwh = F.redondea(W * h * d / 1000, 3);
    return P.ejercicio('Un aparato de ' + P.num(W, 0) + ' W se usa ' + h + ' h al d&iacute;a durante ' + d + ' d&iacute;as. &iquest;Cu&aacute;nta energ&iacute;a consume en kWh?',
      num(r, kwh, [W * h * d, W * h / 1000, W * d / 1000, kwh * 10], 'kWh', 3),
      ['Energia = potencia &times; tiempo. Usa la potencia en kW y el tiempo en horas.', 'Horas totales: ' + h + ' &times; ' + d + ' = ' + (h * d) + '.'],
      [P.num(W, 0) + ' W = ' + F.n(W / 1000, 3) + ' kW', F.n(W / 1000, 3) + ' &times; ' + (h * d) + ' h = <b>' + F.n(kwh, 3) + ' kWh</b>']);
  }

  function conceptosElectricos(r) {
    var pares = [['Voltaje', 'Volt (V)'], ['Corriente el&eacute;ctrica', 'Ampere (A)'], ['Resistencia', 'Ohm (&Omega;)'], ['Potencia', 'Watt (W)'], ['Carga el&eacute;ctrica', 'Coulomb (C)']];
    var elegidos = r.muestra(pares, 4), resto = pares.filter(function (p) { return elegidos.indexOf(p) === -1; });
    var der = r.baraja(elegidos.map(function (p) { return p[1]; }).concat([resto[0][1]]));
    return P.relacione(r, 'Relacione cada magnitud el&eacute;ctrica con su unidad en el Sistema Internacional.', ['Magnitud', 'Unidad'],
      elegidos.map(function (p) { return p[0]; }), der, elegidos.map(function (p) { return der.indexOf(p[1]); }),
      ['Volt: voltaje; ampere: corriente; ohm: resistencia.', 'Watt: potencia; coulomb: carga.'], []);
  }

  /* ---------- 60. optica ---------- */
  function indiceVelocidad(r) {
    var c = r.elige([['el agua', 1.33], ['el vidrio', 1.5], ['el diamante', 2.42], ['el acr&iacute;lico', 1.49], ['el alcohol', 1.36]]);
    var v = F.redondea(3 / c[1], 2), n = F.redondea(3 / v, 2);
    return P.ejercicio('La luz viaja en ' + c[0] + ' a ' + v.toFixed(2) + ' &times; 10<sup>8</sup> m/s. &iquest;Cu&aacute;l es el &iacute;ndice de refracci&oacute;n d' + c[0] + '?' +
      P.considere('n = c / v y c = 3.00 &times; 10<sup>8</sup> m/s.'),
      num(r, n, [v / 3, 3 * v, 3 - v, 1 / n], '', 2),
      ['El indice de refraccion compara la rapidez de la luz en el vacio con la del material.', 'Siempre es mayor que 1, porque en un material la luz va mas lento.'],
      ['n = 3.00 / ' + v.toFixed(2) + ' = <b>' + P.num(n) + '</b>']);
  }

  function reflexion(r) {
    var a = r.entero(10, 80);
    return P.ejercicio('Un rayo de luz llega a un espejo plano formando un &aacute;ngulo de ' + a + '&deg; con la normal. &iquest;Cu&aacute;l es el &aacute;ngulo de reflexi&oacute;n?',
      P.opciones(r, a, [90 - a, 180 - a, 2 * a, a / 2], { fmt: function (x) { return F.n(x, 1) + '&deg;'; } }),
      ['Ley de la reflexion: el angulo de incidencia es igual al de reflexion.', 'Los dos se miden desde la normal (la perpendicular al espejo).'],
      ['Angulo de reflexion = angulo de incidencia = <b>' + a + '&deg;</b>']);
  }

  function refraccionConcepto(r) {
    var aMas = r.bool();
    var ops = ['Se acerca a la normal', 'Se aleja de la normal', 'Sigue en l&iacute;nea recta sin desviarse', 'Se refleja por completo'];
    var bien = aMas ? ops[0] : ops[1];
    return P.ejercicio('Un rayo de luz pasa oblicuamente ' + (aMas ? 'del aire al agua' : 'del agua al aire') + '. &iquest;Qu&eacute; le pasa al rayo al cambiar de medio?',
      P.opciones(r, bien, ops.filter(function (x) { return x !== bien; })),
      ['Al entrar a un medio con MAYOR indice de refraccion (mas lento), el rayo se acerca a la normal.', 'Al pasar a uno con menor indice, se aleja de la normal.'],
      ['n<sub>agua</sub> = 1.33 ' + (aMas ? '&gt;' : '&lt;') + ' n<sub>aire</sub> = 1: <b>' + bien.toLowerCase() + '</b>']);
  }

  function snellSeno(r) {
    var ang = r.elige([[30, 0.5], [40, 0.64], [45, 0.71], [53, 0.8], [60, 0.87], [70, 0.94]]), n2 = r.elige([1.33, 1.5, 1.6, 2]);
    var s2 = F.redondea(ang[1] / n2, 2);
    return P.ejercicio('Un rayo de luz pasa del aire (n = 1) a un material con &iacute;ndice de refracci&oacute;n ' + n2 + ', con un &aacute;ngulo de incidencia de ' + ang[0] + '&deg;. &iquest;Cu&aacute;nto vale el seno del &aacute;ngulo de refracci&oacute;n?' +
      P.considere('n<sub>1</sub> sen &theta;<sub>1</sub> = n<sub>2</sub> sen &theta;<sub>2</sub> y sen(' + ang[0] + '&deg;) = ' + ang[1].toFixed(2) + '.'),
      num(r, s2, [ang[1] * n2, n2 / ang[1], ang[1] - n2 / 10, ang[1]], '', 2),
      ['Despeja sen &theta;<sub>2</sub> = n<sub>1</sub> sen &theta;<sub>1</sub> / n<sub>2</sub>.', 'Debe salir menor que sen &theta;<sub>1</sub>: el rayo se acerca a la normal.'],
      ['sen &theta;<sub>2</sub> = 1 &times; ' + ang[1].toFixed(2) + ' / ' + n2 + ' = <b>' + s2.toFixed(2) + '</b>']);
  }

  /* ================= temas de la guia de estudio =================
     Lo que la guia trae y la version de practica no pregunta: tiro
     vertical, procesos termodinamicos, conductores del calor y entropia. */
  function tiroVertical(r) {
    var vi = r.elige([9.81, 19.62, 29.43, 14.72, 24.53]), tipo = r.entero(0, 2), enun, v, malas, sol, u;
    var t = vi / 9.81;
    if (tipo === 0) {
      v = F.redondea(vi * vi / (2 * 9.81), 2); u = 'm';
      enun = 'Se lanza una pelota verticalmente hacia arriba con una velocidad de ' + P.num(vi) + ' m/s. &iquest;Qu&eacute; altura m&aacute;xima alcanza?' +
        P.considere('h<sub>m&aacute;x</sub> = ' + F.frac('v<sub>i</sub>' + F.sup(2), '2g') + ' y ' + G + '.');
      malas = [vi * vi / 9.81, vi / (2 * 9.81), vi * t, vi * vi / 2]; sol = 'h = ' + P.num(vi) + F.sup(2) + ' / (2 &times; 9.81) = <b>' + P.num(v) + ' m</b>';
    } else if (tipo === 1) {
      v = F.redondea(2 * vi / 9.81, 2); u = 's';
      enun = 'Se lanza una pelota verticalmente hacia arriba con una velocidad de ' + P.num(vi) + ' m/s. &iquest;Cu&aacute;nto tiempo tarda en volver al punto de lanzamiento?' +
        P.considere('t = ' + F.frac('2v<sub>i</sub>', 'g') + ' y ' + G + '.');
      malas = [vi / 9.81, vi * 9.81 / 100, 4 * vi / 9.81, vi / 2]; sol = 't = 2 &times; ' + P.num(vi) + ' / 9.81 = <b>' + P.num(v) + ' s</b>';
    } else {
      var tt = r.entero(1, Math.max(1, Math.floor(t))) / 2;
      v = F.redondea(vi - 9.81 * tt, 2); u = 'm/s';
      enun = 'Se lanza una pelota verticalmente hacia arriba a ' + P.num(vi) + ' m/s. &iquest;Qu&eacute; velocidad lleva ' + F.n(tt) + ' s despu&eacute;s?' +
        P.considere('v<sub>f</sub> = v<sub>i</sub> &minus; g&middot;t y ' + G + '.');
      malas = [vi + 9.81 * tt, 9.81 * tt, vi - tt, vi * tt]; sol = 'v = ' + P.num(vi) + ' &minus; 9.81 &times; ' + F.n(tt) + ' = <b>' + P.num(v) + ' m/s</b>';
    }
    return P.ejercicio(enun, num(r, v, malas, u),
      ['En el tiro vertical la gravedad frena la subida: la velocidad baja 9.81 m/s cada segundo.', 'En el punto mas alto la velocidad es cero.'], [sol]);
  }

  function procesosTermo(r) {
    var c = r.elige([['la presi&oacute;n', 'Isob&aacute;rico'], ['el volumen', 'Isoc&oacute;rico'], ['la temperatura', 'Isot&eacute;rmico']]);
    var todos = ['Isob&aacute;rico', 'Isoc&oacute;rico', 'Isot&eacute;rmico', 'Adiab&aacute;tico'];
    return P.ejercicio('&iquest;C&oacute;mo se llama el proceso termodin&aacute;mico en el que ' + c[0] + ' del sistema permanece constante?',
      P.opciones(r, c[1], todos.filter(function (x) { return x !== c[1]; })),
      ['Iso- significa "igual". Baros: presion. Coro: volumen (espacio). Termo: temperatura.', 'Adiabatico es el proceso en el que no hay intercambio de calor.'],
      ['Con ' + c[0] + ' constante el proceso es <b>' + c[1].toLowerCase() + '</b>']);
  }

  function conductores(r) {
    var buenos = ['Cobre', 'Aluminio', 'Hierro', 'Plata'], malos = ['Corcho', 'Madera', 'Pl&aacute;stico', 'Lana', 'Porcelana', 'Vidrio', 'Papel'];
    var pideBueno = r.bool();
    var bien = r.elige(pideBueno ? buenos : malos);
    return P.ejercicio('&iquest;Cu&aacute;l de los siguientes materiales es un ' + (pideBueno ? 'buen' : 'mal') + ' conductor del calor?',
      P.opciones(r, bien, r.muestra(pideBueno ? malos : buenos, 3)),
      ['Los metales son buenos conductores del calor: por eso las ollas son de metal.', 'El corcho, la madera, el plastico, la lana, la porcelana, el vidrio y el papel son malos conductores (aislantes).'],
      ['<b>' + bien + '</b> es ' + (pideBueno ? 'buen' : 'mal') + ' conductor']);
  }

  function entropia(r) {
    var ops = ['El grado de desorden de un sistema', 'La cantidad de calor que contiene un cuerpo', 'La temperatura m&iacute;nima que puede alcanzar un sistema', 'La energ&iacute;a que se transforma en trabajo'];
    return P.ejercicio('Seg&uacute;n la segunda ley de la termodin&aacute;mica, la entrop&iacute;a del universo tiende a aumentar. &iquest;Qu&eacute; mide la entrop&iacute;a?',
      P.opciones(r, ops[0], ops.slice(1)),
      ['La segunda ley tambien se llama ley de la entropia.', 'En cada transformacion de energia una parte se pierde como calor y aumenta el desorden.'],
      ['La entropia es una medida del <b>desorden</b> de un sistema']);
  }

  var ENFOQUES = {
    velocidad: [casos.velocidad, velDistancia, velTiempo, velConversion, velMedia],
    aceleracion: [casos.aceleracion, acelVf, acelDistancia, acelFrenado, caidaLibre, tiroVertical],
    fuerzaNeta: [casos.fuerzaNeta, fnOpuestas, fnFriccion, fnPrimeraLey],
    aceleracionNewton: [casos.aceleracionNewton, newtonMasa, newtonFuerza, newtonLeyes],
    masaPeso: [casos.masaPeso, pesoDeMasa, pesoLuna, masaConcepto],
    kepler: [casos.kepler, keplerRelacione, keplerTercera, gravitacion],
    calor: [casos.calor, calorEjemplo, calorEjemplo, calorQ, conductores],
    temperaturaCalor: [casos.temperaturaCalor, tempConversion, tempEquilibrio, tempUnidades],
    sistemas: [casos.sistemas, sisEjemplo, sisEjemplo, procesosTermo],
    leyesTermo: [casos.leyesTermo, primeraLeyCalc, eficiencia, leyEjemplo, entropia],
    charles: [casos.charles, gayLussac, charlesCelsius, leyGas],
    boyle: [casos.boyle, boylePresion, boyleConcepto, gasesCombinada],
    hooke: [casos.hooke, hookeElongacion, hookeEnergia],
    pascal: [casos.pascal, pascalArea, presionFA, presionHidro],
    arquimedes: [casos.arquimedes, arqFlota, arqPesoAparente, arqVolumen],
    ohmCorriente: [casos.ohmCorriente, ohmResistencia, resistenciasSerieParalelo, potenciaElectrica],
    ohmVoltaje: [casos.ohmVoltaje, energiaConsumo, conceptosElectricos, potenciaElectrica],
    snell: [casos.snell, indiceVelocidad, reflexion, refraccionConcepto, snellSeno]
  };

  var SUB_FISICA = [
    ['velocidad', 'Velocidad', 'facil'],
    ['aceleracion', 'Aceleracion', 'facil'],
    ['fuerzaNeta', 'Fuerza neta', 'medio'],
    ['aceleracionNewton', 'Segunda ley de Newton', 'facil'],
    ['masaPeso', 'Masa y peso', 'facil'],
    ['kepler', 'Leyes de Kepler', 'facil'],
    ['calor', 'Transferencia de calor', 'facil'],
    ['temperaturaCalor', 'Temperatura y calor', 'medio'],
    ['sistemas', 'Sistemas termodinamicos', 'medio'],
    ['leyesTermo', 'Leyes de la termodinamica', 'medio'],
    ['charles', 'Ley de Charles', 'medio'],
    ['boyle', 'Ley de Boyle', 'dificil'],
    ['hooke', 'Ley de Hooke', 'dificil'],
    ['pascal', 'Principio de Pascal', 'medio'],
    ['arquimedes', 'Principio de Arquimedes', 'medio'],
    ['ohmCorriente', 'Ley de Ohm: corriente', 'facil'],
    ['ohmVoltaje', 'Ley de Ohm: voltaje', 'facil'],
    ['snell', 'Ley de Snell', 'dificil']
  ];

  EJ.tema({
    id: 'prepa-fisica',
    materia: 'prepa',
    grupo: 'Ciencias experimentales',
    nombre: 'Fisica',
    descripcion: 'Movimiento, Newton, peso, Kepler, calor y termodinamica, gases, Hooke, Pascal, Arquimedes, Ohm y Snell. La parte de fisica del area de ciencias experimentales de la guia.',
    etiquetas: ['velocidad', 'aceleracion', 'newton', 'kepler', 'calor', 'termodinamica', 'boyle', 'charles', 'hooke', 'pascal', 'arquimedes', 'ohm', 'snell'],
    dificultades: P.registrarSubtemas('prepa-fisica', SUB_FISICA),
    formulario: 'v = d/t &nbsp;&middot;&nbsp; a = (v<sub>f</sub> &minus; v<sub>0</sub>)/t &nbsp;&middot;&nbsp; F = ma &nbsp;&middot;&nbsp; W = mg<br>' +
      'Boyle: P<sub>1</sub>V<sub>1</sub> = P<sub>2</sub>V<sub>2</sub> &nbsp;&middot;&nbsp; Charles: V<sub>1</sub>/T<sub>1</sub> = V<sub>2</sub>/T<sub>2</sub> &nbsp;&middot;&nbsp; Hooke: F = kx<br>' +
      'Pascal: F<sub>1</sub>/A<sub>1</sub> = F<sub>2</sub>/A<sub>2</sub> &nbsp;&middot;&nbsp; Arquimedes: E = &rho;gV &nbsp;&middot;&nbsp; Ohm: V = IR &nbsp;&middot;&nbsp; Snell: n<sub>1</sub>sen&theta;<sub>1</sub> = n<sub>2</sub>sen&theta;<sub>2</sub>',
    generar: function (dif, r) {
      var t = P.subtemaDe(r, dif, 'prepa-fisica', SUB_FISICA);
      return P.enfoque(r, ENFOQUES[t]);
    }
  });
})();
