/* Modo prepa - Ciencias experimentales: biologia, geografia y quimica
   (los reactivos 1 a 42 del area; la fisica, 43 a 60, esta en fisica.js) */
(function () {
  'use strict';
  var P = EJ.prepa, F = EJ.fmt;

  /* ================= Biologia y geografia: temario de la guia =================
     Preguntas con datos al azar para los temas 3 (Biologia) y 4 (Geografia)
     de la guia "Temas fundamentales y bibliografia". */

  /* pregunta "a que grupo pertenece": cada grupo con sus ejemplos; la
     respuesta es el grupo del ejemplo y los distractores, otros grupos */
  function clasifica(r, grupos, pregunta, extra) {
    var nombres = Object.keys(grupos), g = r.elige(nombres), ej = r.elige(grupos[g]);
    return { p: pregunta(ej), b: g, m: nombres.filter(function (x) { return x !== g; }).concat(extra || []) };
  }

  /* ---------- 3.1 Origen de la vida ---------- */
  function qRedi(r) {
    var exp = 'Francesco Redi puso carne en tres frascos: uno lo dejó abierto, otro lo cubrió con una tela y el último lo selló. ' +
      'Sólo en la carne del frasco abierto aparecieron larvas.';
    if (r.bool()) {
      return { p: exp + ' ¿Qué teoría refutó con este experimento?', b: 'La generación espontánea (abiogénesis)',
        m: ['La biogénesis', 'La panspermia', 'La síntesis abiótica', 'La selección natural', 'La teoría celular'],
        ex: 'La generación espontánea decía que los gusanos salían de la carne podrida; Redi mostró que salían de huevos de moscas.' };
    }
    return { p: exp + ' ¿Qué idea apoyó con este experimento?', b: 'Que todo ser vivo proviene de otro ser vivo (biogénesis)',
      m: ['Que la vida surge de la materia en descomposición', 'Que la vida llegó del espacio en meteoritos', 'Que las especies cambian por el uso y desuso de sus órganos',
        'Que la vida se formó de moléculas inorgánicas en la sopa primigenia'],
      ex: 'La biogénesis, que después comprobó Pasteur, dice que un ser vivo sólo puede proceder de otro ser vivo.' };
  }

  /* ---------- 3.2 Biomoleculas ---------- */
  var BIOMOLECULAS = {
    'Carbohidratos': ['la glucosa', 'el almidón', 'la celulosa', 'la sacarosa', 'el glucógeno'],
    'Lípidos': ['el colesterol', 'los aceites', 'los fosfolípidos', 'las grasas'],
    'Proteínas': ['la queratina', 'la hemoglobina', 'la insulina', 'la amilasa (una enzima)'],
    'Ácidos nucleicos': ['el ADN', 'el ARN']
  };
  function qGrupoBiomolecula(r) {
    var q = clasifica(r, BIOMOLECULAS, function (ej) { return '¿A qué grupo de biomoléculas pertenece ' + ej + '?'; }, ['Biomoléculas inorgánicas', 'Sales minerales']);
    q.ex = 'Carbohidratos: glucosa, almidón, celulosa. Lípidos: grasas, aceites, colesterol. Proteínas: queratina, hemoglobina, enzimas. Ácidos nucleicos: ADN y ARN.';
    return q;
  }
  var AZUCARES = { 'Monosacárido': ['la glucosa', 'la fructosa', 'la galactosa', 'la ribosa'], 'Disacárido': ['la sacarosa', 'la lactosa', 'la maltosa'],
    'Polisacárido': ['el almidón', 'la celulosa', 'el glucógeno'] };
  function qAzucar(r) {
    var q = clasifica(r, AZUCARES, function (ej) { return '¿Qué tipo de carbohidrato es ' + ej + '?'; }, ['Lípido', 'Aminoácido', 'Nucleótido']);
    q.ex = 'Monosacáridos: azúcares simples (glucosa, fructosa). Disacáridos: dos azúcares (sacarosa, lactosa). Polisacáridos: cadenas de muchos (almidón, celulosa, glucógeno).';
    return q;
  }
  function qInorganica(r) {
    return { p: '¿Cuál de las siguientes es una biomolécula inorgánica?', b: r.elige(['El agua (H<sub>2</sub>O)', 'Una sal mineral (NaCl)', 'El amoniaco (NH<sub>3</sub>)']),
      m: ['La glucosa', 'El colesterol', 'La hemoglobina', 'El ADN', 'El almidón'],
      ex: 'Las biomoléculas inorgánicas no están basadas en el carbono: agua, amoniaco, sales minerales y ozono.' };
  }

  /* ---------- 3.3 Taxonomia ---------- */
  var CATEGORIAS = ['Dominio', 'Reino', 'Phylum (filo)', 'Clase', 'Orden', 'Familia', 'Género', 'Especie'];
  function qCategorias(r) {
    /* cinco de las ocho, en su orden */
    var idx = r.muestra([0, 1, 2, 3, 4, 5, 6, 7], 5).sort(function (a, b) { return a - b; });
    return { orden: 'Ordene las siguientes categorías taxonómicas de la más general (incluyente) a la más particular.',
      pasos: idx.map(function (i) { return CATEGORIAS[i]; }),
      ex: 'Orden completo: dominio, reino, phylum, clase, orden, familia, género y especie.' };
  }
  var BINOMIOS = [['el lobo', 'Canis lupus'], ['el perro doméstico', 'Canis familiaris'], ['el jaguar', 'Panthera onca'], ['el león', 'Panthera leo'],
    ['el ser humano', 'Homo sapiens'], ['el gato doméstico', 'Felis catus'], ['el maíz', 'Zea mays']];
  function qBinomio(r) {
    var e = r.elige(BINOMIOS), partes = e[1].split(' '), genero = r.bool();
    return { p: ('El nombre científico de ' + e[0] + ' es <i>' + e[1] + '</i>. ¿Qué indica la palabra <i>' + (genero ? partes[0] : partes[1]) + '</i>?').replace('de el ', 'del '),
      b: genero ? 'El género' : 'La especie', m: [genero ? 'La especie' : 'El género', 'La familia', 'El orden', 'El reino', 'La clase'],
      ex: 'En la nomenclatura binomial de Linneo, la primera palabra es el género (con mayúscula) y la segunda, la especie.' };
  }

  /* ---------- 3.4 Celula ---------- */
  function qTipoCelula(r) {
    var C = { 'Procariota': ['No tiene un núcleo verdadero', 'No tiene organelos membranosos como mitocondrias', 'Es la célula de las bacterias (reino Monera)'],
      'Eucariota': ['Tiene un núcleo verdadero rodeado de membrana', 'Tiene organelos membranosos como mitocondrias y aparato de Golgi', 'Es la célula de hongos, plantas, animales y protistas'] };
    var q = clasifica(r, C, function (ej) { return '¿A qué tipo de célula corresponde la siguiente característica?<br><i>' + ej + '.</i>'; }, ['Ambas', 'Ninguna de las dos']);
    q.ex = 'Procariotas: sin núcleo verdadero ni organelos membranosos (bacterias). Eucariotas: con núcleo y organelos membranosos (protistas, hongos, plantas y animales).';
    return q;
  }

  /* ---------- 3.5 Fotosintesis ---------- */
  function qFaseFotosintesis(r) {
    var F2 = { 'Fase luminosa': ['La clorofila absorbe la energía de la luz', 'Se rompe el agua (fotólisis) y se libera oxígeno', 'Se producen ATP y NADPH'],
      'Fase oscura': ['Se usan el ATP y el NADPH para reducir el CO<sub>2</sub>', 'Se producen compuestos orgánicos como la glucosa', 'Ocurre sin usar directamente la energía de la luz'] };
    var q = clasifica(r, F2, function (ej) { return '¿En qué fase de la fotosíntesis ocurre lo siguiente?<br><i>' + ej + '.</i>'; }, ['Glucólisis', 'Ciclo de Krebs']);
    q.ex = 'Fase luminosa (en los tilacoides): luz, fotólisis del agua, oxígeno, ATP y NADPH. Fase oscura (en el estroma): con ATP y NADPH el CO<sub>2</sub> se convierte en glucosa.';
    return q;
  }

  /* ---------- 3.6 Reproduccion celular ---------- */
  function qFaseMitosis(r) {
    var M = { 'Profase': 'La cromatina se condensa, los cromosomas se hacen visibles y empieza a formarse el huso acromático',
      'Metafase': 'Los cromosomas se alinean en el centro (plano ecuatorial) de la célula',
      'Anafase': 'El huso acromático jala cada cromátida hacia un polo opuesto',
      'Telofase': 'Se forman las membranas nucleares, el huso se desintegra y la célula se divide en dos' };
    var f = r.elige(Object.keys(M));
    return { p: '¿En qué fase de la mitosis ocurre lo siguiente?<br><i>' + M[f] + '.</i>', b: f,
      m: Object.keys(M).filter(function (x) { return x !== f; }).concat(['Interfase']),
      ex: 'Profase: se condensan los cromosomas. Metafase: se alinean al centro. Anafase: se separan las cromátidas. Telofase: se forman dos núcleos y la célula se divide.' };
  }
  function qMitosisMeiosis(r) {
    var D = { 'Mitosis': ['Produce dos células hijas idénticas a la célula madre', 'Las células hijas conservan el mismo número de cromosomas',
        'Sirve para el crecimiento y la reparación de tejidos'],
      'Meiosis': ['Produce cuatro células hijas con la mitad de cromosomas', 'Tiene dos divisiones celulares consecutivas',
        'Hay intercambio genético durante la profase', 'Forma los gametos (óvulos y espermatozoides)'] };
    var q = clasifica(r, D, function (ej) { return '¿A qué tipo de división celular corresponde la siguiente característica?<br><i>' + ej + '.</i>'; }, ['Fisión binaria', 'Gemación']);
    q.ex = 'Mitosis: 2 células idénticas con el mismo número de cromosomas. Meiosis: 2 divisiones, 4 células con la mitad de cromosomas e intercambio genético; forma gametos.';
    return q;
  }
  var CROMOSOMAS = [['un ser humano', 46], ['un perro', 78], ['un gato', 38], ['una planta de maíz', 20], ['una mosca de la fruta', 8], ['un chimpancé', 48], ['un caballo', 64]];
  function qCromosomas(r) {
    var e = r.elige(CROMOSOMAS), n = e[1], meiosis = r.bool(), b = meiosis ? n / 2 : n;
    return { p: 'Una célula de ' + e[0] + ' tiene ' + n + ' cromosomas y se divide por ' + (meiosis ? 'meiosis' : 'mitosis') + '. ¿Cuántos cromosomas tiene cada célula hija?',
      b: b, m: [meiosis ? n : n / 2, 2 * n, n / 4, 4 * n].filter(function (x) { return x === Math.round(x); }),
      ex: meiosis ? 'La meiosis reduce a la mitad el número de cromosomas: ' + n + ' / 2 = ' + b + ' (y salen cuatro células).'
        : 'En la mitosis las células hijas conservan el mismo número de cromosomas que la madre: ' + n + ' (y salen dos células).' };
  }

  /* ---------- 3.8 Genetica ---------- */
  var RASGOS = [['flores moradas', 'flores blancas', 'A'], ['semillas lisas', 'semillas rugosas', 'L'], ['tallo alto', 'tallo enano', 'T'], ['vainas verdes', 'vainas amarillas', 'V']];
  function qPunnett(r) {
    var t = r.elige(RASGOS), X = t[2], x = X.toLowerCase();
    var G = [X + X, X + x, x + x], p1 = r.elige(G), p2 = r.elige(G);
    var hijos = [];
    [p1.charAt(0), p1.charAt(1)].forEach(function (a) { [p2.charAt(0), p2.charAt(1)].forEach(function (b) { hijos.push(a === X || b !== X ? a + b : b + a); }); });
    var pide = r.elige([['sean homocigotos dominantes (' + X + X + ')', function (h) { return h === X + X; }], ['sean heterocigotos (' + X + x + ')', function (h) { return h === X + x; }],
      ['sean homocigotos recesivos (' + x + x + ')', function (h) { return h === x + x; }], ['tenga ' + t[0] + ' (fenotipo dominante)', function (h) { return h.indexOf(X) !== -1; }],
      ['tenga ' + t[1] + ' (fenotipo recesivo)', function (h) { return h === x + x; }]]);
    var pct = hijos.filter(pide[1]).length * 25;
    return { p: 'En los chícharos, el alelo ' + X + ' (' + t[0] + ') es dominante sobre ' + x + ' (' + t[1] + '). Si se cruzan dos plantas ' + p1 + ' &times; ' + p2 +
        ', ¿qué porcentaje de la descendencia se espera que ' + pide[0] + '?',
      b: pct, m: [0, 25, 50, 75, 100].filter(function (v) { return v !== pct; }), fmt: function (v) { return v + '%'; }, op: { rango: [0, 100] },
      ex: 'Cuadro de Punnett: ' + hijos.join(', ') + ' (cada casilla es el 25%). Cumplen la condición ' + hijos.filter(pide[1]).length + ' de 4: ' + pct + '%.' };
  }
  function qLeyMendel(r) {
    var L = { 'Primera ley (uniformidad)': 'Al cruzar dos razas puras (AA &times; aa), todos los hijos de la primera generación son iguales (Aa)',
      'Segunda ley (segregación)': 'Al cruzar dos híbridos (Aa &times; Aa) reaparece el carácter recesivo en una cuarta parte de la descendencia',
      'Tercera ley (transmisión independiente)': 'Los alelos de genes distintos se heredan de forma independiente; en un cruce dihíbrido sale la proporción 9:3:3:1' };
    var l = r.elige(Object.keys(L));
    return { p: '¿Qué ley de Mendel describe el siguiente enunciado?<br><i>' + L[l] + '.</i>', b: l,
      m: Object.keys(L).filter(function (x) { return x !== l; }).concat(['Herencia ligada al sexo', 'Codominancia']) };
  }

  /* ---------- 3.9 Evolucion ---------- */
  function qAdaptacion(r) {
    var A = { 'Morfológica (forma)': ['El insecto hoja tiene la forma y el color de una hoja', 'El pelaje blanco del oso polar lo camufla en la nieve'],
      'Fisiológica (función)': ['El camello produce orina muy concentrada para ahorrar agua', 'Los peces de mar eliminan el exceso de sal por sus branquias'],
      'Conductual (comportamiento)': ['Las aves migran hacia el sur cuando llega el invierno', 'Las abejas avisan dónde hay flores con una danza'] };
    var q = clasifica(r, A, function (ej) { return '¿Qué tipo de adaptación al medio es la siguiente?<br><i>' + ej + '.</i>'; }, ['Ninguna: es un carácter adquirido por el uso']);
    q.ex = 'Morfológicas: de forma (camuflaje). Fisiológicas: de funcionamiento del cuerpo. Conductuales: de comportamiento (migrar, cortejar).';
    return q;
  }

  /* ---------- 3.10 Poblaciones ---------- */
  function qPoblacionNumeros(r) {
    var tipo = r.entero(0, 2), N = r.entero(4, 30) * 50, nac = r.entero(3, 20) * 5, mue = r.entero(2, 20) * 5;
    var esp = r.elige(['conejos', 'venados', 'ardillas', 'lagartijas', 'ranas']);
    if (tipo === 2) {
      var A = r.elige([2, 4, 5, 8, 10, 20, 25]), dens = N / A;
      return { p: 'En una reserva de ' + A + ' hectáreas viven ' + N + ' ' + esp + '. ¿Cuál es la densidad de esa población?',
        b: dens, m: [A / N, N * A, N / (A * 10), N - A], fmt: function (v) { return P.num(v, v === Math.round(v) ? 0 : 2) + ' por hectárea'; }, op: { dec: 2 },
        ex: 'Densidad = individuos / superficie = ' + N + ' / ' + A + ' = ' + P.num(dens, dens === Math.round(dens) ? 0 : 2) + ' ' + esp + ' por hectárea.' };
    }
    var dato = 'Una población de ' + N + ' ' + esp + ' tuvo en un año ' + nac + ' nacimientos y ' + mue + ' muertes, sin inmigración ni emigración.';
    if (tipo === 0) {
      var fin = N + nac - mue;
      return { p: dato + ' ¿Cuántos individuos tiene al final del año?', b: fin, m: [N + nac + mue, N - nac + mue, nac - mue, N + nac],
        ex: 'Crecimiento = natalidad &minus; mortalidad = ' + nac + ' &minus; ' + mue + ' = ' + F.n(nac - mue).replace('-', '&minus;') + '; al final: ' + N + ' + (' + F.n(nac - mue).replace('-', '&minus;') + ') = ' + fin + '.' };
    }
    var tasa = F.redondea((nac - mue) / N * 100, 2);
    return { p: dato + ' ¿Cuál fue su tasa de crecimiento?', b: tasa,
      m: [F.redondea((nac + mue) / N * 100, 2), F.redondea((mue - nac) / N * 100, 2), F.redondea(nac / N * 100, 2), F.redondea((nac - mue) / N * 10, 2)],
      fmt: function (v) { return (v < 0 ? '&minus;' : '') + P.num(Math.abs(v), 2) + '%'; }, op: { dec: 2, conSigno: true },
      ex: 'Tasa = (nacimientos &minus; muertes) / población &times; 100 = (' + nac + ' &minus; ' + mue + ') / ' + N + ' &times; 100 = ' + P.num(tasa, 2) + '%. ' +
        (tasa > 0 ? 'Es positiva: la población crece.' : tasa < 0 ? 'Es negativa: la población disminuye.' : 'Es cero: la población no cambia.') };
  }
  function qSignoCrecimiento(r) {
    var c = r.entero(0, 2);
    var cond = ['la tasa de natalidad es mayor que la de mortalidad', 'la tasa de natalidad es igual a la de mortalidad', 'la tasa de natalidad es menor que la de mortalidad'][c];
    var b = ['positivo', 'cero', 'negativo'][c];
    return { p: 'Si en una población sin migraciones ' + cond + ', su crecimiento es:', b: b,
      m: ['positivo', 'cero', 'negativo', 'imposible de saber sin conocer la densidad'].filter(function (x) { return x !== b; }),
      ex: 'Sin migraciones, el crecimiento es la natalidad menos la mortalidad: puede ser positivo, cero o negativo.' };
  }

  /* ---------- 3.11 Comunidad ---------- */
  var INTERACCIONES = {
    'Mutualismo': ['Los hongos y las raíces de las plantas forman micorrizas y ambos se benefician', 'Los insectos comen el néctar de las flores y, al llevar el polen, las polinizan'],
    'Comensalismo': ['Las orquídeas crecen sobre las ramas de un árbol, que no se ve afectado', 'La rémora come los restos de las presas del tiburón sin dañarlo'],
    'Competencia': ['Los leones y las hienas pelean por las mismas presas, que son escasas', 'Dos especies de plantas crecen juntas y se quitan la luz y el agua'],
    'Amensalismo': ['Las nutrias acumulan su excremento y matan a las plantas del lugar sin ganar nada', 'El hongo <i>Penicillium</i> produce penicilina, que mata a las bacterias cercanas'],
    'Depredación': ['El coyote caza y se come a los ratones de campo', 'La orca se alimenta de crías de lobo marino'],
    'Parasitismo': ['Las garrapatas se alimentan de la sangre de un perro', 'La lombriz intestinal vive en el intestino humano y le quita nutrientes']
  };
  function qInteraccion(r) {
    var q = clasifica(r, INTERACCIONES, function (ej) { return '¿Qué tipo de relación interespecífica es la siguiente?<br><i>' + ej + '.</i>'; });
    q.ex = 'Mutualismo (+,+), comensalismo (+,0), competencia (&minus;,&minus;), amensalismo (&minus;,0), depredación y parasitismo (+,&minus;).';
    return q;
  }
  function qSignosInteraccion(r) {
    var S = { 'Mutualismo': '(+, +)', 'Comensalismo': '(+, 0)', 'Competencia': '(&minus;, &minus;)', 'Amensalismo': '(&minus;, 0)', 'Depredación': '(+, &minus;)', 'Parasitismo': '(+, &minus;)' };
    var k = r.elige(Object.keys(S));
    return { p: 'Los efectos de una relación interespecífica se simbolizan con + (beneficio), &minus; (perjuicio) y 0 (sin efecto). ¿Qué símbolos le corresponden al ' + k.toLowerCase() + '?',
      b: S[k], m: ['(+, +)', '(+, 0)', '(&minus;, &minus;)', '(&minus;, 0)', '(+, &minus;)'].filter(function (x) { return x !== S[k]; }),
      ex: 'Mutualismo (+,+), comensalismo (+,0), competencia (&minus;,&minus;), amensalismo (&minus;,0), depredación y parasitismo (+,&minus;).' };
  }

  /* ---------- 3.12 Ecosistemas ---------- */
  function qDiezPorCiento(r) {
    var E = r.elige([1000, 2000, 5000, 10000, 20000, 50000, 100000]), nivel = r.entero(1, 3);
    var NOMBRE = ['', 'consumidores primarios (herbívoros)', 'consumidores secundarios', 'consumidores terciarios'];
    var b = F.redondea(E * Math.pow(0.1, nivel), 2);
    return { p: 'En un ecosistema, los productores fijan ' + P.num(E, 0) + ' kcal de energía. Si sólo cerca del 10% pasa de un nivel trófico al siguiente, ¿cuánta energía llega a los ' + NOMBRE[nivel] + '?',
      b: b, m: [E * 0.1, E * 0.01, E * 0.001, E * 0.9, E / 2, E * 0.1 * nivel].map(function (x) { return F.redondea(x, 2); }).filter(function (x) { return x !== b; }),
      fmt: function (v) { return P.num(v, v === Math.round(v) ? 0 : 1) + ' kcal'; }, op: { dec: 1 },
      ex: 'En cada paso queda el 10%: ' + P.num(E, 0) + ' &times; 0.1' + (nivel > 1 ? F.sup(nivel) : '') + ' = ' + P.num(b, b === Math.round(b) ? 0 : 1) + ' kcal.' };
  }
  function qFactorEcosistema(r) {
    var q = clasifica(r, { 'Factor biótico': ['los hongos del suelo', 'las bacterias', 'los árboles', 'los insectos'],
      'Factor abiótico': ['la luz solar', 'la temperatura', 'la humedad', 'el suelo', 'el agua'] },
      function (ej) { return 'En un ecosistema, ¿qué son ' + ej + '?'; }, ['Un ciclo biogeoquímico', 'Una pirámide trófica']);
    q.ex = 'Bióticos: los seres vivos. Abióticos: lo que no tiene vida (luz, temperatura, agua, suelo, humedad).';
    return q;
  }
  function qCiclos(r) {
    if (r.bool()) {
      return { p: '¿Cuál de los siguientes es un ciclo biogeoquímico gaseoso?', b: r.elige(['El ciclo del carbono', 'El ciclo del nitrógeno', 'El ciclo del oxígeno']),
        m: ['El ciclo del fósforo', 'El ciclo de Krebs', 'El ciclo celular', 'El ciclo de Calvin'],
        ex: 'Ciclos gaseosos: oxígeno, nitrógeno y carbono. Sedimentarios: azufre y fósforo. Los de Krebs, Calvin y el celular no son ciclos biogeoquímicos.' };
    }
    return { p: '¿Cuál de los siguientes es un ciclo biogeoquímico sedimentario?', b: 'El ciclo del fósforo',
      m: ['El ciclo del carbono', 'El ciclo del nitrógeno', 'El ciclo del oxígeno', 'El ciclo de Krebs'],
      ex: 'Ciclos gaseosos: oxígeno, nitrógeno y carbono. Sedimentarios: azufre y fósforo.' };
  }

  /* ---------- 4.1 Sistema solar ---------- */
  function qPlanetas(r) {
    var ROC = ['Mercurio', 'Venus', 'la Tierra', 'Marte'], GAS = ['Júpiter', 'Saturno', 'Urano', 'Neptuno'], tipo = r.entero(0, 2);
    var ex = 'Rocosos (telúricos): Mercurio, Venus, Tierra y Marte. Gaseosos (gigantes): Júpiter, Saturno, Urano y Neptuno.';
    function cap(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
    if (tipo === 0) return { p: '¿Cuál de los siguientes es un planeta rocoso o telúrico?', b: cap(r.elige(ROC)), m: GAS.slice(), ex: ex };
    if (tipo === 1) return { p: '¿Cuál de los siguientes es un planeta gaseoso o gigante?', b: r.elige(GAS), m: ROC.map(cap), ex: ex };
    var gas = r.bool();
    return { p: '¿Cuál es una característica de los planetas ' + (gas ? 'gaseosos (Júpiter, Saturno, Urano y Neptuno)' : 'rocosos (Mercurio, Venus, Tierra y Marte)') + '?',
      b: gas ? 'Tienen anillos y muchos satélites naturales' : 'Tienen una superficie sólida de rocas y metales',
      m: gas ? ['Tienen una superficie sólida de rocas y metales', 'Son los más cercanos al Sol', 'Son pequeños y de alta densidad', 'Tienen pocas lunas y no tienen anillos']
        : ['Tienen anillos y muchos satélites naturales', 'Están formados sobre todo por hidrógeno y helio', 'Son los más alejados del Sol', 'Son los planetas más grandes'],
      ex: 'Los rocosos son pequeños, densos, con superficie sólida, pocas lunas, sin anillos y cerca del Sol; los gaseosos, lo contrario.' };
  }

  /* ---------- 4.4 y 4.5 Fenomenos naturales y riesgos ---------- */
  function qTipoFenomeno(r) {
    var q = clasifica(r, { 'Meteorológico': ['un huracán', 'una granizada', 'una nevada', 'el fenómeno de El Niño', 'un arcoíris'],
      'Hidrológico': ['un tsunami', 'un fuerte oleaje', 'una corriente oceánica'],
      'Geológico': ['un terremoto', 'una erupción volcánica', 'un deslizamiento de tierra', 'un hundimiento del suelo'] },
      function (ej) { return '¿Qué tipo de fenómeno natural es ' + ej + '?'; }, ['Astronómico', 'Químico']);
    q.ex = 'Meteorológicos: vientos, lluvias, granizadas, nevadas, huracanes. Hidrológicos: oleajes y tsunamis. Geológicos: terremotos, erupciones, derrumbes, deslizamientos y hundimientos.';
    return q;
  }
  function qRiesgoCenapred(r) {
    var q = clasifica(r, { 'Geológico': ['un sismo', 'una erupción volcánica', 'un deslizamiento de laderas'],
      'Hidrometeorológico': ['un huracán', 'una inundación', 'una sequía', 'una helada'],
      'Químico-tecnológico': ['la explosión de una pipa de gas', 'una fuga de sustancias tóxicas', 'un incendio en una fábrica'],
      'Sanitario-ecológico': ['una epidemia', 'una plaga', 'la contaminación del agua de un río'],
      'Socio-organizativo': ['una estampida en un concierto', 'un accidente aéreo', 'un sabotaje'] },
      function (ej) { return 'Según la clasificación de riesgos del CENAPRED, ¿qué tipo de fenómeno perturbador es ' + ej + '?'; });
    q.ex = 'Geológicos (sismos, volcanes, laderas), hidrometeorológicos (huracanes, lluvias, sequías), químico-tecnológicos (explosiones, fugas, incendios), sanitario-ecológicos (epidemias, plagas, contaminación) y socio-organizativos (accidentes, concentraciones masivas).';
    return q;
  }

  /* ---------- 4.3 Recursos ---------- */
  function qTipoRecurso(r) {
    var q = clasifica(r, { 'Renovable': ['los bosques', 'el suelo', 'la fauna silvestre', 'la flora'],
      'No renovable': ['el petróleo', 'el gas natural', 'el cobre', 'el carbón mineral'],
      'Inagotable': ['la energía solar', 'la energía del viento', 'la energía de las olas'] },
      function (ej) { return '¿Qué tipo de recurso natural es ' + ej + '?'; }, ['Artificial']);
    q.ex = 'Renovables: se regeneran si se usan bien (suelo, flora, fauna). No renovables: se agotan (petróleo, gas, minerales). Inagotables: sol, viento, olas.';
    return q;
  }
  function qSector(r) {
    if (r.bool()) {
      var q = clasifica(r, { 'agrícola': ['Una plaga destruye los cultivos de maíz y frijol', 'Una sequía impide sembrar trigo'],
        'ganadero': ['Un brote de fiebre aftosa enferma al ganado', 'La falta de pastos obliga a vender las reses'],
        'forestal': ['Un incendio arrasa miles de hectáreas de pinos', 'Una plaga de escarabajos seca los bosques maderables'],
        'pesquero': ['Un derrame de petróleo mata peces y camarones en el golfo', 'La marea roja obliga a cerrar la captura de ostiones'],
        'turístico': ['Un huracán destruye hoteles y playas en Cancún', 'El sargazo aleja a los visitantes de las playas del Caribe'] },
        function (ej) { return '¿Qué sector económico resulta más afectado?<br><i>' + ej + '.</i>'; }, ['minero']);
      return q;
    }
    var S = { 'primario': 'la agricultura, la ganadería, la pesca y la minería', 'secundario': 'la industria manufacturera y la construcción', 'terciario': 'el comercio, el turismo y los servicios' };
    var k = r.elige(Object.keys(S));
    return { p: '¿A qué sector económico pertenecen ' + S[k] + '?', b: 'Sector ' + k,
      m: Object.keys(S).filter(function (x) { return x !== k; }).map(function (x) { return 'Sector ' + x; }).concat(['Sector informal']),
      ex: 'Primario: obtiene recursos de la naturaleza. Secundario: los transforma (industria). Terciario: comercio y servicios.' };
  }

  /* ---------- 4.6 Climas ---------- */
  var KOPPEN = { 'A (tropical)': 'No hay invierno: todos los meses tienen temperatura media mayor de 18 °C',
    'B (seco)': 'La evaporación supera a la precipitación; hay plantas xerófilas y no hay árboles',
    'C (templado)': 'Los inviernos son suaves: el mes más frío nunca baja de &minus;3 °C de temperatura media',
    'D (frío)': 'Los inviernos son fríos, con meses por debajo de &minus;3 °C, pero el mes más cálido supera los 10 °C',
    'E (polar)': 'No hay verano: el mes más cálido no llega a 10 °C y no hay vegetación' };
  function qKoppen(r) {
    if (r.bool(0.6)) {
      var k = r.elige(Object.keys(KOPPEN));
      return { p: 'En la clasificación de Köppen, ¿a qué grupo de clima corresponde la siguiente descripción?<br><i>' + KOPPEN[k] + '.</i>', b: 'Grupo ' + k,
        m: Object.keys(KOPPEN).filter(function (x) { return x !== k; }).map(function (x) { return 'Grupo ' + x; }),
        ex: 'A tropical (sin invierno), B seco, C templado, D frío y E polar (sin verano).' };
    }
    var L = { 'f': 'Hay precipitaciones todo el año', 'm': 'Es monzónico: tiene estación seca, pero compensada por muchas lluvias al año',
      's': 'La estación seca es en verano', 'w': 'La estación seca es en invierno (llueve en verano)' };
    var l = r.elige(Object.keys(L));
    return { p: 'En la clasificación de Köppen, ¿qué indica la segunda letra <b>' + l + '</b> en un clima como A' + l + ' o C' + l + '?', b: L[l],
      m: Object.keys(L).filter(function (x) { return x !== l; }).map(function (x) { return L[x]; }).concat(['La evaporación es más del doble de la lluvia']),
      ex: 'f: lluvias todo el año; m: monzónico; s: seco en verano; w: seco en invierno. En los climas B, S es estepario y W desértico.' };
  }
  function qElementoClima(r) {
    var q = clasifica(r, { 'Un elemento del clima': ['la temperatura', 'la precipitación', 'la presión atmosférica', 'la humedad', 'el viento'],
      'Un factor del clima': ['la latitud', 'la altitud', 'el relieve', 'las corrientes marinas', 'la distancia al mar'] },
      function (ej) { return '¿Qué es ' + ej + '?'; }, ['Un fenómeno geológico', 'Un recurso no renovable']);
    q.ex = 'Elementos: lo que se mide del clima (temperatura, precipitación, presión, humedad, viento). Factores: lo que lo modifica (latitud, altitud, relieve, corrientes marinas, distancia al mar).';
    return q;
  }

  /* ---------- 4.7 Poblacion ---------- */
  function qIndicadorNumero(r) {
    if (r.bool()) {
      var hab = r.entero(20, 300) * 1000, km = r.elige([50, 80, 100, 120, 150, 200, 250, 400, 500]), d = hab / km;
      return { p: 'Un municipio tiene ' + P.num(hab, 0) + ' habitantes y una superficie de ' + km + ' km' + F.sup(2) + '. ¿Cuál es su densidad de población?',
        b: F.redondea(d, 1), m: [km / hab, hab * km, hab / km / 10, hab / (km * 1000)].map(function (x) { return F.redondea(x, 4); }),
        fmt: function (v) { return P.num(v, v === Math.round(v) ? 0 : (v < 1 ? 4 : 1)) + ' hab/km' + F.sup(2); }, op: { dec: 1 },
        ex: 'Densidad = habitantes / superficie = ' + P.num(hab, 0) + ' / ' + km + ' = ' + P.num(d, d === Math.round(d) ? 0 : 1) + ' hab/km' + F.sup(2) + '.' };
    }
    var pob = r.entero(5, 60) * 10000, tasa = r.entero(10, 25), nac = pob * tasa / 1000;
    return { p: 'En una ciudad de ' + P.num(pob, 0) + ' habitantes hubo ' + P.num(nac, 0) + ' nacimientos en un año. ¿Cuál es su tasa de natalidad?',
      b: tasa, m: [tasa / 10, tasa * 10, F.redondea(pob / nac, 2), tasa * 100], fmt: function (v) { return P.num(v, v === Math.round(v) ? 0 : 2) + ' por cada mil habitantes'; },
      ex: 'Tasa de natalidad = nacimientos / población &times; 1000 = ' + P.num(nac, 0) + ' / ' + P.num(pob, 0) + ' &times; 1000 = ' + tasa + ' por cada mil.' };
  }

  P.temaBanco({
    id: 'prepa-biologia',
    grupo: 'Ciencias experimentales',
    nombre: 'Biologia',
    descripcion: 'Origen de la vida, biomoleculas, taxonomia, celula, fotosintesis, division celular, herencia, evolucion y ecologia. Reactivos 1 a 14 del area.',
    etiquetas: ['celula', 'biomoleculas', 'mendel', 'evolucion', 'ecologia', 'fotosintesis'],
    niveles: {
      facil: ['carbohidratos', 'respiracion', 'caracteristicasVida', 'evolucion'],
      medio: ['origenVida', 'biomoleculas', 'taxonomia', 'organelos', 'mitosis', 'poblacion', 'interespecificas'],
      dificil: ['fotosintesis', 'mendel', 'ecosistema']
    },
    items: [
      { s: 'origenVida', n: 'Origen de la vida', v: [
        { rel: 'Relacione las teorías del origen de la vida con su descripción.', cols: ['Teoría', 'Descripción'],
          pares: [['Generación espontánea', 'La vida surge de la materia inerte o en descomposición'],
            ['Panspermia', 'La vida llegó de otro planeta a través de meteoritos'],
            ['Biogénesis', 'Un ser vivo sólo puede proceder de otro ser vivo'],
            ['Síntesis abiótica', 'La vida surgió de moléculas químicas sencillas que formaron moléculas orgánicas'],
            ['Creacionismo', 'La vida fue creada por un ser supremo todopoderoso']] },
        { p: '¿Qué científico demostró con sus matraces de cuello de cisne que la vida no surge de manera espontánea?',
          b: 'Louis Pasteur', m: ['Alexander Oparin', 'Francesco Redi', 'Charles Darwin', 'Stanley Miller'],
          ex: 'Pasteur (1862) hirvió caldo en matraces de cuello de cisne: sin contacto con microorganismos del aire, no apareció vida.' },
        { c: 'Según la teoría de Oparin-Haldane, en la atmósfera primitiva, que carecía de ___, se formaron moléculas orgánicas que se agruparon en estructuras llamadas ___.',
          b: ['oxígeno libre', 'coacervados'], m: [['hidrógeno', 'coacervados'], ['oxígeno libre', 'ribosomas'], ['metano', 'células eucariotas'], ['nitrógeno', 'virus']] },
        qRedi, qRedi,
        { p: '¿Quién propuso en 1908 la panspermia, la idea de que la vida llegó a la Tierra desde el espacio en meteoritos, cometas o polvo cósmico?',
          b: 'Svante Arrhenius', m: ['Alexander Oparin', 'Louis Pasteur', 'Francesco Redi', 'Charles Darwin', 'Stanley Miller'] },
        { p: 'Según la síntesis abiótica de Oparin y Haldane, ¿qué hizo que los gases de la atmósfera primitiva disueltos en los océanos formaran moléculas orgánicas sencillas?',
          b: 'Las descargas eléctricas y la radiación ultravioleta', m: ['La llegada de meteoritos con bacterias', 'La descomposición de la carne',
            'La fotosíntesis de las primeras plantas', 'La respiración de los primeros animales'],
          ex: 'En la "sopa primigenia" se formaron moléculas precursoras de la vida, como la alanina (un aminoácido), la ribosa (un azúcar), la adenina y la citosina.' },
        { rel: 'Relacione a cada científico con su aportación sobre el origen de la vida.', cols: ['Científico', 'Aportación'],
          pares: [['Francesco Redi', 'Con frascos de carne abiertos, tapados con tela y sellados refutó la generación espontánea'],
            ['Louis Pasteur', 'Con matraces de cuello de cisne comprobó que la vida no surge de manera espontánea'],
            ['Svante Arrhenius', 'Propuso que la vida llegó del espacio en meteoritos o polvo cósmico'],
            ['Alexander Oparin y John Haldane', 'Propusieron que la vida surgió de moléculas inorgánicas en una sopa primigenia']],
          extra: ['Explicó la evolución de las especies por selección natural'] },
        { c: 'En la sopa primigenia se formaron moléculas precursoras de la vida, como la alanina, que es un ___, y la ribosa, que es un ___.',
          b: ['aminoácido', 'azúcar'], m: [['azúcar', 'aminoácido'], ['lípido', 'azúcar'], ['aminoácido', 'lípido'], ['ácido nucleico', 'aminoácido'], ['mineral', 'azúcar']] }
      ] },
      { s: 'biomoleculas', n: 'Biomoleculas', v: [
        { rel: 'Relacione la biomolécula con su función.', cols: ['Biomolécula', 'Función'],
          pares: [['Carbohidratos', 'Son fuente de energía inmediata y forman estructuras como la pared celular'],
            ['Lípidos', 'Constituyen la reserva energética de uso tardío y forman las membranas'],
            ['Proteínas', 'Determinan la estructura de las células y dirigen casi todos los procesos vitales (enzimas)'],
            ['Ácidos nucleicos', 'Almacenan y expresan la información genética']],
          extra: ['Regulan la temperatura corporal por evaporación'] },
        { p: '¿Cuáles son las unidades estructurales (monómeros) de las proteínas?', b: 'Aminoácidos',
          m: ['Nucleótidos', 'Monosacáridos', 'Ácidos grasos', 'Glicerol'] },
        { p: '¿Qué biomolécula está formada por nucleótidos?', b: 'Ácidos nucleicos', m: ['Proteínas', 'Lípidos', 'Carbohidratos', 'Vitaminas'] },
        qInorganica,
        { p: '¿Cuál es el principal portador de energía en las reacciones de las células, un nucleótido con tres fosfatos?', b: 'El ATP',
          m: ['El ADN', 'El ARN', 'La glucosa', 'El colesterol', 'El almidón'] },
        { p: 'Los nucleótidos que forman los ácidos nucleicos están formados por:', b: 'un grupo fosfato, un azúcar de cinco carbonos y una base nitrogenada',
          m: ['un aminoácido, un grupo fosfato y glicerol', 'tres ácidos grasos y una molécula de glicerol', 'varias moléculas de glucosa unidas', 'un azúcar de seis carbonos y un aminoácido'] },
        { p: 'El agua es conocida como el disolvente universal porque:', b: 'su naturaleza polar le permite disolver la mayor parte de los compuestos iónicos',
          m: ['es una molécula orgánica con mucho carbono', 'es el principal portador de energía de la célula', 'no tiene carga eléctrica en ninguna parte', 'forma la doble hélice del ADN'] },
        { p: 'El carbonato de calcio y el fosfato de calcio de los huesos son sales minerales con una función principalmente:', b: 'esquelética o de sostén',
          m: ['energética', 'hereditaria', 'enzimática', 'hormonal'] }
      ] },
      { s: 'carbohidratos', n: 'Clasificacion de biomoleculas', v: [
        { p: 'De las siguientes opciones, elija aquella que corresponda a un monosacárido.', b: 'Glucosa', m: ['Almidón', 'Celulosa', 'Colesterol', 'Sacarosa', 'Glucógeno'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un polisacárido.', b: 'Almidón', m: ['Glucosa', 'Fructosa', 'Colesterol', 'Sacarosa', 'Galactosa'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un lípido.', b: 'Colesterol', m: ['Glucosa', 'Almidón', 'Hemoglobina', 'Celulosa', 'Queratina'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un disacárido.', b: 'Sacarosa', m: ['Glucosa', 'Almidón', 'Celulosa', 'Fructosa', 'Glucógeno'] },
        qGrupoBiomolecula, qGrupoBiomolecula, qAzucar, qAzucar
      ] },
      { s: 'taxonomia', n: 'Categorias taxonomicas', v: [
        { orden: 'Ordene las categorías taxonómicas de la más general a la más particular.', pasos: ['Reino', 'Clase', 'Familia', 'Género', 'Especie'] },
        { orden: 'Ordene las categorías taxonómicas de la más general a la más particular.', pasos: ['Dominio', 'Reino', 'Filo', 'Orden', 'Especie'] },
        { p: 'El nombre científico del jaguar es <i>Panthera onca</i>. ¿A qué categoría taxonómica corresponde la palabra <i>Panthera</i>?',
          b: 'Género', m: ['Especie', 'Familia', 'Orden', 'Reino'], ex: 'En la nomenclatura binomial la primera palabra es el género y la segunda el epíteto de la especie.' },
        qCategorias, qBinomio, qBinomio,
        { p: '¿Quién propuso la nomenclatura binomial, en la que cada organismo tiene un nombre científico formado por un género y una especie?', b: 'Carlos Linneo',
          m: ['Aristóteles', 'Charles Darwin', 'Gregor Mendel', 'Robert Whittaker', 'Carl Woese'] },
        { p: 'Los dominios agrupan a los seres vivos por sus características celulares. ¿Cuáles son los tres dominios?', b: 'Eukarya, Bacteria y Archaea',
          m: ['Animal, Plantae y Fungi', 'Monera, Protista y Fungi', 'Eukarya, Monera y Plantae', 'Bacteria, Protista y Animal'] },
        { lista: 'Del siguiente listado, identifique los reinos de la clasificación de los seres vivos.',
          si: ['Animal', 'Plantae (vegetal)', 'Fungi', 'Monera', 'Protista'], no: ['Eukarya', 'Mamíferos', 'Cordados', 'Felinos'] }
      ] },
      { s: 'organelos', n: 'La celula y sus organelos', v: [
        { rel: 'Relacione el organelo celular con el proceso que le corresponde.', cols: ['Organelo', 'Proceso'],
          pares: [['Cloroplasto', 'Fotosíntesis'], ['Mitocondria', 'Respiración celular y generación de energía'],
            ['Núcleo', 'Contiene el ADN responsable de la expresión genética'], ['Ribosoma', 'Síntesis de proteínas'],
            ['Lisosoma', 'Degradación de moléculas'], ['Aparato de Golgi', 'Empaque y distribución de proteínas']] },
        { p: '¿Qué organelo está presente en la célula vegetal pero NO en la célula animal?', b: 'Cloroplasto', m: ['Mitocondria', 'Ribosoma', 'Núcleo', 'Aparato de Golgi'] },
        { p: '¿Qué característica distingue a una célula procariota de una eucariota?', b: 'No tiene un núcleo definido por membrana',
          m: ['No tiene material genético', 'No tiene membrana celular', 'Siempre es más grande', 'Tiene mitocondrias y cloroplastos'] },
        qTipoCelula, qTipoCelula,
        { rel: 'Relacione cada parte de la célula con su función.', cols: ['Parte', 'Función'],
          pares: [['Membrana celular', 'Regula el intercambio de sustancias entre la célula y su medio externo'], ['Citoplasma', 'Ahí ocurren las reacciones químicas de la ruta metabólica'],
            ['Centriolo', 'Participa en la división celular'], ['Vacuola', 'Contiene agua y enzimas digestivas'],
            ['Pared celular', 'Da forma y rigidez a las células de plantas, bacterias y hongos'], ['Retículo endoplásmico liso', 'Sintetiza y procesa lípidos']] },
        { p: '¿Quiénes propusieron la teoría celular entre 1838 y 1839?', b: 'Matthias Schleiden y Theodor Schwann',
          m: ['James Watson y Francis Crick', 'Alexander Oparin y John Haldane', 'Charles Darwin y Alfred Wallace', 'Francesco Redi y Louis Pasteur', 'Robert Hooke y Anton van Leeuwenhoek'] },
        { c: 'Según la teoría celular, todos los seres vivos están formados por células (unidad ___), toda célula proviene de otra célula (unidad de ___) y en la célula se realizan los procesos vitales (unidad ___).',
          b: ['estructural', 'origen', 'funcional'], m: [['funcional', 'origen', 'estructural'], ['estructural', 'energía', 'funcional'], ['genética', 'origen', 'funcional'],
            ['estructural', 'origen', 'reproductiva'], ['química', 'reproducción', 'funcional']] },
        { rel: 'Relacione cada tipo de comunicación celular con su descripción.', cols: ['Comunicación', 'Descripción'],
          pares: [['Autocrina', 'La misma célula que secreta la señal (ligando) es la que la recibe'], ['Endocrina', 'La hormona viaja por la sangre hasta células que están lejos'],
            ['Paracrina', 'La señal sólo afecta a las células que están cerca de la que la secretó'], ['Yuxtacrina', 'La señal pasa por contacto directo entre dos células']],
          extra: ['La señal pasa de los padres a los hijos en la reproducción'] }
      ] },
      { s: 'respiracion', n: 'Respiracion celular', v: [
        { p: '¿Cuál es el proceso para extraer energía en forma de ATP de la glucosa de los alimentos que consumimos a diario?',
          b: 'Respiración celular', m: ['Fase oscura', 'Fotosíntesis', 'Respiración anaerobia', 'Digestión'] },
        { p: '¿Qué proceso realizan las levaduras para producir alcohol y CO<sub>2</sub> a partir de glucosa sin oxígeno?',
          b: 'Fermentación alcohólica', m: ['Fermentación láctica', 'Fotosíntesis', 'Respiración aerobia', 'Ciclo de Calvin'] },
        { p: '¿En qué organelo se realiza el ciclo de Krebs?', b: 'Mitocondria', m: ['Cloroplasto', 'Ribosoma', 'Núcleo', 'Lisosoma'] },
        { p: 'La respiración celular que se realiza sin la participación del oxígeno se llama:', b: 'anaeróbica', m: ['aeróbica', 'fotosíntesis', 'fotólisis', 'transpiración'] },
        { p: '¿Cuál es la "moneda de energía" que obtienen las células con la respiración celular?', b: 'El ATP', m: ['El ADN', 'La glucosa', 'El oxígeno', 'La clorofila', 'El dióxido de carbono'] },
        { p: 'Las células procariotas no tienen mitocondrias. ¿Dónde realizan la respiración celular?', b: 'En el citoplasma o en las superficies internas de la célula',
          m: ['En el cloroplasto', 'En el núcleo', 'En el aparato de Golgi', 'En las vacuolas'] }
      ] },
      { s: 'fotosintesis', n: 'Fases de la fotosintesis', v: [
        { rel: 'Relacione la fase de la fotosíntesis con los procesos que le corresponden.', cols: ['Fase', 'Proceso'],
          pares: [['Luminosa', ['Absorción de luz por las moléculas de clorofila', 'Se realiza en los tilacoides del cloroplasto']],
            ['Oscura', ['Se usan el ATP y el NADPH para producir glucosa', 'Se realiza en el estroma del cloroplasto']]],
          extra: ['Como producto se libera dióxido de carbono'] },
        { c: 'En la fase ___ de la fotosíntesis se rompe la molécula de agua y se libera ___ a la atmósfera.',
          b: ['luminosa', 'oxígeno'], m: [['oscura', 'oxígeno'], ['luminosa', 'dióxido de carbono'], ['oscura', 'glucosa'], ['luminosa', 'nitrógeno']] },
        qFaseFotosintesis, qFaseFotosintesis,
        { p: '¿Cuáles son los productos de la fotosíntesis (6CO<sub>2</sub> + 6H<sub>2</sub>O + luz &rarr; ?)?', b: 'Glucosa (C<sub>6</sub>H<sub>12</sub>O<sub>6</sub>) y oxígeno (O<sub>2</sub>)',
          m: ['Dióxido de carbono y agua', 'Glucosa y dióxido de carbono', 'Oxígeno y agua', 'ATP y dióxido de carbono'] },
        { p: 'Algunas bacterias sulfurosas usan ácido sulfhídrico (H<sub>2</sub>S) en lugar de agua como fuente de hidrógeno y no liberan oxígeno. ¿Qué tipo de fotosíntesis realizan?',
          b: 'Anoxigénica (anaerobia)', m: ['Oxigénica (aerobia)', 'Respiración celular', 'Fermentación láctica', 'Fotólisis del agua'] },
        { p: 'En la fase luminosa, la ruptura de las moléculas de agua por la energía de la luz se llama:', b: 'fotólisis', m: ['glucólisis', 'fermentación', 'ciclo de Krebs', 'hidrólisis'] }
      ] },
      { s: 'mitosis', n: 'Division celular', v: [
        { orden: '¿Cuál es el orden correcto de las fases de la mitosis?', pasos: ['Profase', 'Metafase', 'Anafase', 'Telofase'] },
        { p: '¿En qué fase de la mitosis los cromosomas se alinean en el centro (plano ecuatorial) de la célula?', b: 'Metafase', m: ['Profase', 'Anafase', 'Telofase', 'Interfase'] },
        { p: '¿Qué tipo de división celular produce gametos con la mitad de cromosomas?', b: 'Meiosis', m: ['Mitosis', 'Fisión binaria', 'Gemación', 'Citocinesis'] },
        qFaseMitosis, qMitosisMeiosis, qMitosisMeiosis, qCromosomas, qCromosomas,
        { orden: 'Ordene las etapas del ciclo celular.', pasos: ['G1: crecimiento de las células hijas', 'S: replicación del ADN',
          'G2: síntesis de proteínas y preparación para la división', 'M: división celular por mitosis'] }
      ] },
      { s: 'caracteristicasVida', n: 'Caracteristicas de los seres vivos', v: [
        { p: 'La capacidad de las células de mantener estables sus condiciones internas (temperatura, pH, agua) aunque cambie el medio que las rodea es la:',
          b: 'homeostasis', m: ['irritabilidad', 'reproducción', 'organización', 'adaptación'] },
        { p: 'Una planta que dobla su tallo hacia la luz responde a un estímulo del ambiente. Esto es ejemplo de:',
          b: 'irritabilidad', m: ['homeostasis', 'reproducción', 'crecimiento', 'metabolismo'] },
        { p: 'El conjunto de reacciones químicas con las que un ser vivo obtiene energía y construye sus moléculas se llama:',
          b: 'metabolismo', m: ['homeostasis', 'irritabilidad', 'organización', 'evolución'] },
        { rel: 'Relacione cada característica de los seres vivos con su ejemplo.', cols: ['Característica', 'Ejemplo'],
          pares: [['Homeostasis', 'Al hacer ejercicio, el cuerpo suda para mantener su temperatura'], ['Irritabilidad', 'Una planta dobla su tallo hacia la luz'],
            ['Metabolismo', 'Las células transforman la glucosa en energía'], ['Reproducción', 'Una bacteria se divide en dos'],
            ['Adaptación', 'El cactus guarda agua en su tallo para vivir en el desierto'], ['Crecimiento', 'Una semilla se convierte en un árbol']] }
      ] },
      { s: 'mendel', n: 'Leyes de Mendel', v: [
        { p: 'Al cruzar una planta de semillas lisas (LL) con una de semillas rugosas (ll), toda la primera generación tiene semillas lisas (Ll). Este enunciado corresponde a la:',
          b: 'primera ley de Mendel', m: ['segunda ley de Mendel', 'tercera ley de Mendel', 'herencia ligada al sexo', 'adquisición de caracteres'] },
        { p: 'Al cruzar dos plantas Ll entre sí, aparecen en la descendencia plantas lisas y rugosas en proporción 3:1. Esto corresponde a la:',
          b: 'segunda ley de Mendel', m: ['primera ley de Mendel', 'tercera ley de Mendel', 'herencia ligada al sexo', 'codominancia'] },
        { p: 'Si se cruzan dos individuos heterocigotos (Aa × Aa), ¿qué proporción de la descendencia será homocigota recesiva (aa)?',
          b: '1/4', m: ['1/2', '3/4', '0', '1'], ex: 'Cuadro de Punnett: AA, Aa, Aa, aa → 1 de 4.' },
        qPunnett, qPunnett, qPunnett, qLeyMendel,
        { rel: 'Relacione cada concepto de genética con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Gen', 'Segmento de ADN con la información para sintetizar una proteína'], ['Alelo', 'Cada una de las variantes de un gen, como A o a'],
            ['Homocigoto', 'Individuo con dos alelos iguales para un carácter (AA o aa)'], ['Heterocigoto', 'Individuo con dos alelos distintos para un carácter (Aa)'],
            ['Fenotipo', 'Característica que se observa, como el color de la flor'], ['Genotipo', 'Combinación de alelos que tiene un individuo']] }
      ] },
      { s: 'evolucion', n: 'Teorias de la evolucion', v: [
        { p: '¿A qué teoría se refiere el texto?<br><i>Los seres vivos han evolucionado gradualmente; los individuos con variaciones favorables sobreviven y se reproducen más (selección natural), lo que puede originar nuevas especies.</i>',
          b: 'Darwinista', m: ['Catastrofista', 'Lamarckista', 'Creacionista', 'Fijista'] },
        { p: '¿A qué teoría se refiere el texto?<br><i>Los órganos que se usan se desarrollan y los que no se usan se atrofian, y estos caracteres adquiridos se heredan a la descendencia.</i>',
          b: 'Lamarckista', m: ['Darwinista', 'Sintética', 'Catastrofista', 'Fijista'] },
        { p: '¿A qué teoría se refiere el texto?<br><i>Une la selección natural de Darwin con la genética de Mendel y las mutaciones para explicar la evolución.</i>',
          b: 'Sintética', m: ['Lamarckista', 'Catastrofista', 'Creacionista', 'Fijista'] },
        { rel: 'Relacione cada idea sobre la evolución con su autor.', cols: ['Idea', 'Autor'],
          pares: [['Uso y desuso de los órganos y herencia de los caracteres adquiridos', 'Jean-Baptiste Lamarck'],
            ['Tras cada gran catástrofe morían todas las especies y aparecían otras nuevas', 'Georges Cuvier'],
            ['Selección natural: sobreviven y se reproducen los más aptos', 'Charles Darwin'],
            ['Une la selección natural con la genética de Mendel y las mutaciones', 'Theodosius Dobzhansky y Ernst Mayr']],
          extra: ['Gregor Mendel'] },
        { lista: 'Del siguiente listado, identifique los postulados de la teoría de Darwin.', si: ['Variabilidad', 'Sobreproducción', 'Lucha por la existencia', 'Supervivencia del más apto'],
          no: ['Uso y desuso de los órganos', 'Herencia de los caracteres adquiridos', 'Catástrofes que extinguen a todas las especies', 'Generación espontánea'] },
        { p: '¿Cuál de las siguientes NO es una evidencia de la evolución?', b: 'La aparición de gusanos en la carne podrida',
          m: ['El registro fósil', 'La anatomía comparada', 'La embriología comparada', 'La genética de poblaciones'] },
        qAdaptacion, qAdaptacion
      ] },
      { s: 'poblacion', n: 'Propiedades de la poblacion', v: [
        { rel: 'Relacione la característica de la población con su descripción.', cols: ['Propiedad', 'Descripción'],
          pares: [['Mortalidad', 'Número de organismos que mueren en un tiempo y lugar determinados'],
            ['Migración', 'Desplazamiento de la población de una región a otra'],
            ['Natalidad', 'Número de organismos que nacen en un tiempo y lugar determinados'],
            ['Potencial biótico', 'Máxima capacidad de reproducción de una población en condiciones óptimas'],
            ['Resistencia ambiental', 'Conjunto de factores que limita el crecimiento de una población']] },
        qPoblacionNumeros, qPoblacionNumeros, qSignoCrecimiento,
        { p: 'Una población es:', b: 'un grupo de organismos de la misma especie que conviven en el mismo espacio y tiempo y se cruzan entre sí',
          m: ['el conjunto de poblaciones de distintas especies que interactúan en un lugar', 'el lugar físico donde vive una especie',
            'el conjunto de factores bióticos y abióticos de una región', 'el papel que cumple una especie en su ecosistema'] }
      ] },
      { s: 'interespecificas', n: 'Relaciones interespecificas', v: [
        { rel: 'Relacione la relación interespecífica con su definición.', cols: ['Relación', 'Definición'],
          pares: [['Competencia', 'Ambas especies se perjudican porque usan el mismo recurso'],
            ['Parasitismo', 'Una especie vive a costa de otra que sale perjudicada'],
            ['Mutualismo', 'Ambas especies salen beneficiadas'],
            ['Comensalismo', 'Una especie se beneficia y la otra no se beneficia ni se perjudica'],
            ['Depredación', 'Una especie caza y se alimenta de la otra']] },
        { p: 'La rémora se adhiere al tiburón y se alimenta de los restos de sus presas sin causarle daño. ¿Qué tipo de relación es?',
          b: 'Comensalismo', m: ['Mutualismo', 'Parasitismo', 'Competencia', 'Depredación'] },
        qInteraccion, qInteraccion, qInteraccion, qSignosInteraccion
      ] },
      { s: 'ecosistema', n: 'Flujo de energia y materia', v: [
        { c: 'El movimiento de energía en un ecosistema se representa mediante ___, donde sólo cerca del 10% de la energía pasa de un nivel a otro. El flujo de la materia se representa por ___ de elementos como el carbono, el nitrógeno y el fósforo.',
          b: ['la pirámide trófica', 'los ciclos biogeoquímicos'],
          m: [['la cadena trófica', 'los ciclos biológicos'], ['la red trófica', 'la pirámide trófica'], ['los ciclos biogeoquímicos', 'la red trófica'], ['la pirámide de edades', 'los ciclos lunares']] },
        { p: 'En una cadena alimenticia, ¿qué organismos son los productores?', b: 'Las plantas y algas que hacen fotosíntesis',
          m: ['Los herbívoros', 'Los carnívoros', 'Los hongos y bacterias descomponedores', 'Los omnívoros'] },
        qDiezPorCiento, qDiezPorCiento, qFactorEcosistema, qCiclos,
        { orden: 'Ordene los niveles de una cadena alimenticia, empezando por el que aprovecha la energía del Sol.',
          pasos: ['Productores (plantas)', 'Consumidores primarios (herbívoros)', 'Consumidores secundarios (carnívoros)', 'Consumidores terciarios (superdepredadores)'] },
        { c: 'En un ecosistema los materiales se ___ y la energía fluye en una sola dirección; su principal fuente de energía es ___.',
          b: ['reciclan', 'el Sol'], m: [['pierden', 'el Sol'], ['reciclan', 'la Luna'], ['acumulan', 'el suelo'], ['reciclan', 'el agua'], ['destruyen', 'el viento']] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-geografia',
    grupo: 'Ciencias experimentales',
    nombre: 'Geografia',
    descripcion: 'Mapas y SIG, relieve y erosion, recursos naturales, fenomenos naturales, climas, poblacion, riesgos y territorio de Mexico. Reactivos 15 a 24 del area.',
    etiquetas: ['mapa', 'sig', 'erosion', 'recursos', 'clima', 'poblacion', 'riesgos'],
    niveles: {
      facil: ['mapa', 'sig', 'fenomenos'],
      medio: ['erosion', 'recursos', 'sectores', 'demografia', 'riesgos'],
      dificil: ['clima', 'territorio']
    },
    items: [
      { s: 'mapa', n: 'Sistema solar y mapas', v: [
        { p: 'Además del título y la escala, ¿qué otros elementos deben estar siempre presentes en un mapa?', b: 'Simbología y coordenadas',
          m: ['Autor y simbología', 'Relieve y autor', 'Orientación y relieve', 'Fotografías y autor'] },
        { p: 'En un mapa, ¿qué elemento indica la relación entre las distancias del mapa y las distancias reales?', b: 'Escala',
          m: ['Simbología', 'Rosa de los vientos', 'Coordenadas', 'Título'] },
        { p: 'Las líneas imaginarias que van de polo a polo y sirven para medir la longitud son los:', b: 'meridianos',
          m: ['paralelos', 'trópicos', 'círculos polares', 'husos horarios'] },
        qPlanetas, qPlanetas,
        { p: 'Un mapa es una representación:', b: 'plana, reducida y simplificada de la superficie terrestre o de una parte de ella',
          m: ['tridimensional y a escala real de la Tierra', 'esférica de la Tierra, sin deformaciones', 'fotográfica de la Tierra tomada desde un satélite', 'de los astros vistos desde la Tierra'] },
        { p: 'Los cartógrafos idearon las proyecciones cartográficas. ¿Para qué sirven?', b: 'Para reducir la deformación al representar en un plano la Tierra, que es un geoide',
          m: ['Para medir la temperatura de cada región', 'Para calcular la población de cada país', 'Para localizar satélites artificiales', 'Para predecir sismos y huracanes'] },
        { lista: 'Del siguiente listado, identifique los usos de los mapas.',
          si: ['Saber dónde estamos y cómo llegar a otro lugar', 'Ubicar continentes, países y ciudades', 'Conocer la relación entre los elementos de un espacio geográfico'],
          no: ['Medir la intensidad de un sismo', 'Pronosticar el clima de la próxima semana', 'Calcular el producto interno bruto', 'Medir la humedad del aire'] }
      ] },
      { s: 'sig', n: 'Herramientas geograficas', v: [
        { p: '¿Qué herramienta geográfica permite crear consultas interactivas, analizar información espacial, editar datos y mapas y presentar los resultados de forma dinámica?',
          b: 'SIG (Sistema de Información Geográfica)', m: ['Carta topográfica', 'Croquis', 'Imagen de satélite', 'Brújula'] },
        { p: '¿Qué herramienta usa una red de satélites para determinar la posición exacta de un punto en la Tierra?',
          b: 'GPS', m: ['SIG', 'Croquis', 'Carta topográfica', 'Planisferio'] },
        { p: 'Los Sistemas de Información Geográfica (SIG) tienen dos componentes. ¿Cuáles son?', b: 'Una base de datos georreferenciada y funciones o comandos para consultarla',
          m: ['Un globo terráqueo y una brújula', 'Una rosa de los vientos y una escala gráfica', 'Satélites meteorológicos y radares', 'Un sismógrafo y un pluviómetro'] },
        { p: 'Al usar Google Maps en el celular para llegar a un lugar se combinan un SIG y:', b: 'el Sistema de Posicionamiento Global (GPS)',
          m: ['una carta topográfica impresa', 'un croquis hecho a mano', 'un sismógrafo', 'una brújula magnética'] },
        { rel: 'Relacione cada herramienta geográfica con su descripción.', cols: ['Herramienta', 'Descripción'],
          pares: [['GPS', 'Determina la posición exacta de un punto con una red de satélites'], ['SIG', 'Conecta mapas con bases de datos para consultar y analizar información geográfica'],
            ['Imagen de satélite', 'Fotografía de la superficie terrestre tomada desde el espacio'], ['Carta topográfica', 'Mapa que representa el relieve con curvas de nivel'],
            ['Croquis', 'Dibujo sencillo, sin escala precisa, para ubicar un lugar']] }
      ] },
      { s: 'erosion', n: 'Agentes que modelan el relieve', v: [
        { lista: 'Del siguiente listado, identifique los tipos de erosión que modelan el relieve terrestre.',
          si: ['Eólica', 'Marina', 'Fluvial', 'Glaciar'], no: ['Tectónica', 'Volcánica', 'Sísmica'] },
        { p: 'Las fuerzas que forman el relieve desde el interior de la Tierra (como el vulcanismo y el tectonismo) se llaman:',
          b: 'endógenas', m: ['exógenas', 'erosivas', 'eólicas', 'fluviales'] },
        { c: 'El ___ transforma y destruye las rocas de forma mecánica o química; la ___ transporta y deposita los materiales que ya se desgastaron.',
          b: ['intemperismo', 'erosión'], m: [['erosión', 'intemperismo'], ['vulcanismo', 'erosión'], ['tectonismo', 'fotosíntesis'], ['intemperismo', 'tectónica'], ['magnetismo', 'erosión']] },
        { lista: 'Del siguiente listado, identifique los agentes externos que modelan el relieve.', si: ['El viento', 'El agua', 'Los cambios de temperatura', 'Los seres vivos'],
          no: ['El vulcanismo', 'El tectonismo', 'El movimiento de las placas'] },
        { p: 'Los sismos se producen por:', b: 'la liberación repentina de energía acumulada en las rocas',
          m: ['el calentamiento del aire por el Sol', 'la atracción de la Luna sobre los océanos', 'la erosión del suelo por el viento', 'el exceso de lluvia en las montañas'] },
        { p: 'Por su origen, los sismos pueden ser tectónicos, volcánicos o:', b: 'artificiales', m: ['marinos', 'solares', 'eólicos', 'glaciares'] }
      ] },
      { s: 'recursos', n: 'Recursos naturales', v: [
        { rel: 'Relacione el tipo de recurso con sus ejemplos.', cols: ['Recurso', 'Ejemplo'],
          pares: [['Inagotables', 'Energía solar, energía eólica y geotérmica'], ['Renovables', 'Agua, flora y fauna'],
            ['No renovables', 'Minerales, metales e hidrocarburos']], extra: ['Vidrio, plástico y aluminio'] },
        { p: 'El petróleo y el gas natural son recursos:', b: 'no renovables', m: ['renovables', 'inagotables', 'biológicos', 'reciclables'] },
        qTipoRecurso, qTipoRecurso,
        { p: 'Los recursos naturales son escasos y dependientes. ¿Qué significa que sean dependientes?', b: 'Que lo que duren depende del uso correcto que les demos',
          m: ['Que dependen de otros países para existir', 'Que sólo existen en zonas tropicales', 'Que dependen de la energía solar para formarse', 'Que nunca se acaban'] },
        { p: '¿Qué pasa con el costo de un recurso no renovable conforme se acerca su fin?', b: 'Se vuelve más caro',
          m: ['Se vuelve más barato', 'Se mantiene igual', 'Deja de tener valor', 'Baja a la mitad'] }
      ] },
      { s: 'fenomenos', n: 'Fenomenos naturales', v: [
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>El 20 de febrero de 1943 nació en un campo de cultivo de Michoacán el Paricutín, que con su actividad sepultó al pueblo de San Juan Parangaricutiro.</i>',
          b: 'Erupción volcánica', m: ['Depresión tropical', 'Heladas', 'Sismicidad', 'Inundación'] },
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>El 19 de septiembre de 1985 y el 19 de septiembre de 2017 la Ciudad de México sufrió el derrumbe de edificios por el movimiento brusco de las placas tectónicas.</i>',
          b: 'Sismicidad', m: ['Erupción volcánica', 'Huracán', 'Tsunami', 'Deslave'] },
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>En 2005, Wilma llegó a la península de Yucatán con vientos de más de 200 km/h y lluvias intensas durante varios días.</i>',
          b: 'Ciclón tropical (huracán)', m: ['Sismicidad', 'Erupción volcánica', 'Sequía', 'Helada'] },
        qTipoFenomeno, qTipoFenomeno,
        { p: 'Un fenómeno natural se convierte en desastre natural cuando:', b: 'rebasa sus límites normales y causa pérdidas humanas y materiales',
          m: ['ocurre en el mar y no en tierra', 'sucede de manera constante y espontánea', 'lo estudian los científicos', 'dura menos de un día'] },
        { p: 'Un derrame de petróleo que contamina una playa no es un desastre natural, sino un:', b: 'desastre medioambiental',
          m: ['fenómeno hidrológico', 'fenómeno meteorológico', 'fenómeno geológico', 'fenómeno astronómico'] },
        { p: 'Un terremoto muy intenso cerca de la costa puede provocar otro desastre. ¿Cuál?', b: 'Un tsunami', m: ['Un huracán', 'Una sequía', 'Una helada', 'Una granizada'] }
      ] },
      { s: 'sectores', n: 'Actividades economicas afectadas', v: [
        { p: 'El derrame de ácido sulfúrico en el mar de Cortés en 2019 dañó la flora y la fauna marinas. Esto afectó principalmente al sector:',
          b: 'pesquero', m: ['agrícola', 'ganadero', 'industrial', 'forestal'] },
        { p: 'Una sequía prolongada en el norte del país que impide sembrar maíz y frijol afecta principalmente al sector:',
          b: 'agrícola', m: ['pesquero', 'turístico', 'industrial', 'minero'] },
        qSector, qSector, qSector
      ] },
      { s: 'clima', n: 'Tipos de clima', v: [
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Manzanillo, Colima, la temperatura media es superior a 18 °C todo el año y la mayor parte de la lluvia cae en verano.</i>',
          b: 'Aw - Tropical con lluvias en verano', m: ['Af - Tropical con lluvias todo el año', 'Cf - Templado con lluvias todo el año', 'Cw - Templado con lluvias en verano', 'BW - Seco desértico'] },
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Sonora y Baja California casi no llueve durante el año y en el día hace mucho calor.</i>',
          b: 'BW - Seco desértico', m: ['Aw - Tropical con lluvias en verano', 'Cw - Templado con lluvias en verano', 'Af - Tropical con lluvias todo el año', 'ET - Frío de tundra'] },
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Toluca la temperatura es fresca la mayor parte del año (media entre 12 y 18 °C) y llueve sobre todo en verano.</i>',
          b: 'Cw - Templado con lluvias en verano', m: ['Aw - Tropical con lluvias en verano', 'BW - Seco desértico', 'Af - Tropical con lluvias todo el año', 'Cf - Templado con lluvias todo el año'] },
        qKoppen, qKoppen, qKoppen, qElementoClima,
        { p: 'La clasificación climática de Köppen se basa en que el clima tiene una clara relación con:', b: 'la vegetación natural',
          m: ['la altitud de las montañas', 'el tipo de suelo', 'la cantidad de población', 'las corrientes marinas'] }
      ] },
      { s: 'demografia', n: 'Indicadores demograficos', v: [
        { p: 'Los indicadores demográficos describen el comportamiento de la población. Todos los siguientes son indicadores demográficos, excepto:',
          b: 'morbilidad', m: ['fecundidad', 'migración', 'natalidad', 'mortalidad'], ex: 'La morbilidad (proporción de enfermos) es un indicador de salud, no demográfico.' },
        { p: 'El número de nacimientos por cada mil habitantes en un año es la tasa de:', b: 'natalidad', m: ['mortalidad', 'fecundidad', 'migración', 'morbilidad'] },
        qIndicadorNumero, qIndicadorNumero,
        { lista: 'Del siguiente listado, identifique los indicadores que usa el Índice de Desarrollo Humano (IDH).', si: ['Esperanza de vida', 'Educación', 'Ingreso per cápita'],
          no: ['Número de habitantes', 'Superficie territorial', 'Densidad de población', 'Cantidad de recursos naturales'] },
        { p: '¿Qué organismo estableció el Índice de Desarrollo Humano (IDH)?', b: 'El Programa de las Naciones Unidas para el Desarrollo (PNUD)',
          m: ['El Banco de México', 'El INEGI', 'La Organización Mundial de la Salud', 'El Fondo Monetario Internacional'] },
        { p: 'La salida de personas de su país para irse a vivir a otro se llama:', b: 'emigración', m: ['inmigración', 'natalidad', 'mortalidad', 'densidad de población'] },
        { p: 'La llegada de personas de otro país para vivir en el nuestro se llama:', b: 'inmigración', m: ['emigración', 'natalidad', 'mortalidad', 'densidad de población'] }
      ] },
      { s: 'riesgos', n: 'Riesgos geologicos', v: [
        { lista: 'Del siguiente listado, identifique los fenómenos geológicos que ponen en riesgo a las personas.',
          si: ['Erupción volcánica', 'Deslizamiento de laderas', 'Tsunami', 'Sismo'], no: ['Explosión por sustancias inflamables', 'Fuga de sustancias tóxicas', 'Residuos biológicos', 'Huracán'] },
        { lista: 'Del siguiente listado, identifique los fenómenos hidrometeorológicos.',
          si: ['Huracán', 'Inundación', 'Granizada', 'Sequía'], no: ['Sismo', 'Erupción volcánica', 'Incendio industrial', 'Deslizamiento de laderas'] },
        qRiesgoCenapred, qRiesgoCenapred,
        { p: '¿Cuál de las siguientes es una medida de prevención ante un sismo?', b: 'Identificar las rutas de evacuación y las zonas de menor riesgo',
          m: ['Construir viviendas en laderas inestables', 'Usar el elevador para salir rápido', 'Correr por las escaleras mientras tiembla', 'Guardar los documentos importantes en el sótano'] }
      ] },
      { s: 'territorio', n: 'Territorio de Mexico', v: [
        { p: '¿Cómo se llama la franja de mar que se extiende hasta 370 km (200 millas náuticas) desde la costa, donde México puede pescar y aprovechar los recursos?',
          b: 'Zona Económica Exclusiva', m: ['Mar territorial', 'Superficie insular', 'Superficie continental', 'Plataforma continental'] },
        { p: '¿Cuántas millas náuticas, medidas desde la costa, abarca el mar territorial de México?', b: '12 millas náuticas',
          m: ['200 millas náuticas', '24 millas náuticas', '370 millas náuticas', '50 millas náuticas'] },
        { p: '¿Cuántas entidades federativas integran los Estados Unidos Mexicanos?', b: 32, m: [31, 30, 33, 29, 34] },
        { p: '¿Cuál es el nombre oficial de nuestro país?', b: 'Estados Unidos Mexicanos',
          m: ['República Mexicana', 'Estados Mexicanos Unidos', 'República Federal de México', 'Unión de Estados de México'] },
        { p: 'El mar territorial se extiende 12 millas náuticas mar adentro. ¿A cuántos kilómetros equivale?', b: 22.2, m: [12, 200, 370, 1.85, 44.4],
          fmt: function (v) { return F.n(v, 2) + ' km'; } },
        { rel: 'Relacione cada parte del territorio de México con su descripción.', cols: ['Parte', 'Descripción'],
          pares: [['Mar territorial', 'Franja de 12 millas náuticas donde el Estado tiene plena soberanía sobre el agua, el lecho, el subsuelo y el espacio aéreo'],
            ['Zona Económica Exclusiva', 'Franja de 200 millas náuticas donde México aprovecha los recursos, pero los barcos extranjeros circulan libremente'],
            ['Superficie continental', 'Parte del territorio unida al continente americano, junto con las islas'],
            ['Ciudad de México', 'Capital del país y sede de los poderes Ejecutivo, Legislativo y Judicial']] },
        { p: '¿Con qué países tiene México tratados que definen su mar territorial y su Zona Económica Exclusiva?', b: 'Estados Unidos, Guatemala, Belice, Honduras y Cuba',
          m: ['Canadá, Estados Unidos y Guatemala', 'Guatemala, Belice y El Salvador', 'Estados Unidos, Canadá y Cuba', 'Cuba, Jamaica y Belice'] }
      ] }
    ]
  });

  /* ================= Quimica: temario de la guia de estudio =================
     Preguntas con datos al azar para los temas de "5. Quimica" de la guia:
     particulas del atomo, configuracion electronica, octeto, numeros de
     oxidacion, acidos y bases, pH, enlaces, gases, masa molecular y alcanos. */

  /* formula quimica: los numeros van como subindices, salvo el coeficiente del principio */
  function fq(t) {
    var m = String(t).match(/^(\d*)(.*)$/);
    return m[1] + m[2].replace(/(\d+)/g, '<sub>$1</sub>');
  }
  function carga(q) {
    return q === 0 ? '' : '<sup>' + (Math.abs(q) > 1 ? Math.abs(q) : '') + (q > 0 ? '+' : '&minus;') + '</sup>';
  }
  function conSigno(x) { return x > 0 ? '+' + x : x < 0 ? '&minus;' + (-x) : '0'; }
  /* sin repetidos y sin la respuesta */
  function distintos(b, m) {
    return m.filter(function (x, i) { return x !== null && x !== undefined && x !== b && m.indexOf(x) === i; });
  }
  function electrones(n) { return n === 1 ? '1 electrón' : n + ' electrones'; }

  /* ---------- 5.1 Particulas del atomo ---------- */
  var ISOTOPOS = [['carbono', 'C', 6, 12], ['nitrógeno', 'N', 7, 14], ['oxígeno', 'O', 8, 16], ['flúor', 'F', 9, 19], ['sodio', 'Na', 11, 23],
    ['magnesio', 'Mg', 12, 24], ['aluminio', 'Al', 13, 27], ['fósforo', 'P', 15, 31], ['azufre', 'S', 16, 32], ['cloro', 'Cl', 17, 35],
    ['potasio', 'K', 19, 39], ['calcio', 'Ca', 20, 40], ['hierro', 'Fe', 26, 56], ['cobre', 'Cu', 29, 63], ['zinc', 'Zn', 30, 64],
    ['bromo', 'Br', 35, 79], ['plata', 'Ag', 47, 107], ['yodo', 'I', 53, 127], ['oro', 'Au', 79, 197]];
  var IONES = [['Na', 11, 1], ['K', 19, 1], ['Mg', 12, 2], ['Ca', 20, 2], ['Al', 13, 3], ['F', 9, -1], ['Cl', 17, -1], ['O', 8, -2], ['S', 16, -2], ['N', 7, -3]];
  function trio(p, n, e) {
    return 'p<sup>+</sup> = ' + p + ', n<sup>0</sup> = ' + n + ', e<sup>&minus;</sup> = ' + e;
  }
  function qParticulas(r) {
    var tipo = r.entero(0, 2);
    if (tipo === 2) {
      var io = r.elige(IONES), z0 = io[1], q = io[2], el = z0 - q;
      return { p: 'El ion ' + io[0] + carga(q) + ' proviene de un átomo con número atómico ' + z0 + '. ¿Cuántos electrones tiene el ion?',
        b: el, m: [z0, z0 + q, z0 - 2 * q, z0 + 2 * q],
        ex: 'Un ion positivo perdió electrones y uno negativo los ganó: electrones = ' + z0 + (q > 0 ? ' &minus; ' + q : ' + ' + (-q)) + ' = ' + el + '.' };
    }
    var e = r.elige(ISOTOPOS), z = e[2], a = e[3], n = a - z;
    var dato = 'Un átomo de ' + e[0] + ' (' + e[1] + ') tiene número atómico ' + z + ' y número de masa ' + a + '.';
    var ex = 'Protones = número atómico = ' + z + '; en un átomo neutro, electrones = protones = ' + z +
      '; neutrones = número de masa &minus; número atómico = ' + a + ' &minus; ' + z + ' = ' + n + '.';
    if (tipo === 0) {
      var b = trio(z, n, z);
      return { p: dato + ' ¿Cuántos protones, neutrones y electrones tiene?', b: b,
        m: distintos(b, [trio(n, z, n), trio(z, a, z), trio(z, n, n), trio(a, n, a), trio(z, a + z, z)]), ex: ex };
    }
    return { p: dato + ' ¿Cuántos neutrones tiene en su núcleo?', b: n, m: [z, a, a + z, 2 * z], ex: ex };
  }

  /* ---------- 5.2 Configuracion electronica y tabla periodica ---------- */
  var ORDEN_BIEN = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s'];
  var ORDEN_MAL = ['1s', '2s', '2p', '3s', '3p', '3d', '4s', '4p', '5s'];
  var ELEMENTOS = [[5, 'boro'], [6, 'carbono'], [7, 'nitrógeno'], [8, 'oxígeno'], [9, 'flúor'], [10, 'neón'], [11, 'sodio'], [12, 'magnesio'],
    [13, 'aluminio'], [14, 'silicio'], [15, 'fósforo'], [16, 'azufre'], [17, 'cloro'], [18, 'argón'], [19, 'potasio'], [20, 'calcio'],
    [22, 'titanio'], [25, 'manganeso'], [26, 'hierro'], [27, 'cobalto'], [28, 'níquel'], [30, 'zinc'], [31, 'galio'], [33, 'arsénico'],
    [34, 'selenio'], [35, 'bromo'], [36, 'kriptón']];
  function capSub(s, p8) { var t = s.charAt(1); return t === 's' ? 2 : t === 'p' ? (p8 ? 8 : 6) : 10; }
  /* reparte z electrones siguiendo un orden de llenado (p8: el error de meter 8 en p) */
  function llenar(z, orden, p8) {
    var l = [], resto = z;
    for (var i = 0; i < orden.length && resto > 0; i++) {
      var c = Math.min(resto, capSub(orden[i], p8));
      l.push([orden[i], c]);
      resto -= c;
    }
    return l;
  }
  function confTxt(l) { return l.map(function (x) { return x[0] + '<sup>' + x[1] + '</sup>'; }).join(' '); }
  /* el error de no llenar en orden: pasa un electron al subnivel siguiente */
  function corrida(l) {
    var c = l.map(function (x) { return x.slice(); }), u = c[c.length - 1];
    if (u[1] < capSub(u[0])) { c[c.length - 2][1]--; u[1]++; }
    else { u[1]--; c.push([ORDEN_BIEN[c.length], 1]); }
    return c.filter(function (x) { return x[1] > 0; });
  }
  function qConfiguracion(r) {
    var tipo = r.entero(0, 2);
    var lista = tipo === 1 ? ELEMENTOS.filter(function (x) { return x[0] <= 20 || x[0] >= 31; }) : ELEMENTOS;
    var e = r.elige(lista), z = e[0], l = llenar(z, ORDEN_BIEN);
    var ex = 'Los subniveles se llenan en el orden 1s 2s 2p 3s 3p 4s 3d 4p (regla de las diagonales); en s caben 2 electrones, en p 6 y en d 10.';
    if (tipo === 0) {
      var b = confTxt(l), m = [confTxt(llenar(z - 1, ORDEN_BIEN)), confTxt(llenar(z + 1, ORDEN_BIEN)), confTxt(corrida(l))];
      if (z > 18) m.push(confTxt(llenar(z, ORDEN_MAL)));
      if (z > 10) m.push(confTxt(llenar(z, ORDEN_BIEN, true)));
      return { p: '¿Cuál es la configuración electrónica del ' + e[1] + ' (Z = ' + z + ')?', b: b, m: distintos(b, m), ex: ex };
    }
    if (tipo === 1) {
      var nmax = Math.max.apply(null, l.map(function (x) { return +x[0].charAt(0); }));
      var v = l.filter(function (x) { return +x[0].charAt(0) === nmax; }).reduce(function (s, x) { return s + x[1]; }, 0);
      return { p: 'Un elemento tiene la configuración electrónica ' + confTxt(l) + '. ¿Cuántos electrones de valencia tiene?',
        b: v, m: [l[l.length - 1][1], nmax, 8 - v, v + 1],
        ex: 'Los electrones de valencia son los del último nivel (n = ' + nmax + '): ' +
          l.filter(function (x) { return +x[0].charAt(0) === nmax; }).map(function (x) { return x[0] + '<sup>' + x[1] + '</sup>'; }).join(' + ') + ' = ' + v + '.' };
    }
    var ult = l[l.length - 1][0].charAt(1);
    return { p: '¿En qué tipo de subnivel termina la configuración electrónica del ' + e[1] + ' (Z = ' + z + ')?',
      b: 'Subnivel ' + ult, m: ['s', 'p', 'd', 'f'].filter(function (x) { return x !== ult; }).map(function (x) { return 'Subnivel ' + x; }),
      ex: 'Su configuración es ' + confTxt(l) + '. Los grupos 1 y 2 terminan en s, los grupos 13 a 18 en p y los metales de transición en d.' };
  }
  function qCapacidad(r) {
    var CAP = [['s', 2], ['p', 6], ['d', 10], ['f', 14]], c = r.elige(CAP);
    return { p: '¿Cuántos electrones caben como máximo en un subnivel ' + c[0] + '?', b: electrones(c[1]),
      m: [2, 6, 10, 14, 8, 18].filter(function (x) { return x !== c[1]; }).map(electrones),
      ex: 'Cada orbital tiene a lo más 2 electrones: s tiene 1 orbital (2 e<sup>&minus;</sup>), p tiene 3 (6), d tiene 5 (10) y f tiene 7 (14).' };
  }
  var TIPOS_ELEMENTO = {
    metal: ['Sodio (Na)', 'Hierro (Fe)', 'Calcio (Ca)', 'Cobre (Cu)', 'Aluminio (Al)', 'Plata (Ag)', 'Magnesio (Mg)'],
    noMetal: ['Oxígeno (O)', 'Nitrógeno (N)', 'Azufre (S)', 'Cloro (Cl)', 'Carbono (C)', 'Fósforo (P)'],
    gasNoble: ['Helio (He)', 'Neón (Ne)', 'Argón (Ar)', 'Kriptón (Kr)', 'Xenón (Xe)']
  };
  function qTipoElemento(r) {
    var T = TIPOS_ELEMENTO, t = r.elige(['metal', 'noMetal', 'gasNoble']);
    /* los gases nobles no se ponen de distractor de "no metal" para que no haya dos respuestas */
    var otros = t === 'metal' ? T.noMetal.concat(T.gasNoble) : t === 'noMetal' ? T.metal : T.metal.concat(T.noMetal);
    var nombre = { metal: 'un metal', noMetal: 'un no metal', gasNoble: 'un gas noble' }[t];
    return { p: '¿Cuál de los siguientes elementos es ' + nombre + '?', b: r.elige(T[t]), m: r.muestra(otros, 4),
      ex: 'Metales: brillo, conducen el calor y la electricidad (Na, Fe, Cu...). No metales: O, N, S, Cl, C, P. Gases nobles (grupo 18): He, Ne, Ar, Kr, Xe.' };
  }

  /* ---------- Regla del octeto ---------- */
  var OCTETO = [['sodio', 'Na', 1], ['potasio', 'K', 1], ['magnesio', 'Mg', 2], ['calcio', 'Ca', 2], ['aluminio', 'Al', 3],
    ['nitrógeno', 'N', 5], ['oxígeno', 'O', 6], ['azufre', 'S', 6], ['flúor', 'F', 7], ['cloro', 'Cl', 7], ['bromo', 'Br', 7]];
  var GRUPO_A = ['IA', 'IIA', 'IIIA', 'IVA', 'VA', 'VIA', 'VIIA'];
  function qOcteto(r) {
    var e = r.elige(OCTETO), v = e[2], q = v <= 3 ? v : v - 8;
    var quien = 'el ' + e[0] + ' (' + e[1] + ', grupo ' + GRUPO_A[v - 1] + ')';
    var ex = 'Con ' + electrones(v) + ' de valencia, ' + (v <= 3 ? 'le cuesta menos perder ' + electrones(v) + ' y queda con carga +' + v
      : 'le cuesta menos ganar ' + electrones(8 - v) + ' y queda con carga &minus;' + (8 - v)) + ', con 8 electrones en su último nivel.';
    if (r.bool()) {
      var b = e[1] + carga(q);
      return { p: '¿Qué ion tiende a formar ' + quien + ' para cumplir la regla del octeto?', b: b,
        m: distintos(b, [e[1] + carga(-q), e[1] + carga(q > 0 ? q - 8 : q + 8), e[1] + carga(q > 0 ? q + 1 : q - 1), e[1] + carga(q > 0 ? q - 1 : q + 1)]), ex: ex };
    }
    var bien = v <= 3 ? 'Pierde ' + electrones(v) : 'Gana ' + electrones(8 - v);
    return { p: '¿Qué hace ' + quien + ' para completar su octeto?', b: bien,
      m: distintos(bien, ['Gana ' + electrones(v), 'Pierde ' + electrones(8 - v), v <= 3 ? 'Gana ' + electrones(8 - v) : 'Pierde ' + electrones(v),
        v <= 3 ? 'Pierde ' + electrones(v + 1) : 'Gana ' + electrones(9 - v),
        v <= 3 ? (v > 1 ? 'Pierde ' + electrones(v - 1) : null) : (v < 7 ? 'Gana ' + electrones(7 - v) : null)]), ex: ex };
  }

  /* ---------- 5.5 Oxido-reduccion ---------- */
  /* [reaccion, se oxida (agente reductor), se reduce (agente oxidante), otras especies, elementos, quien se oxida, quien se reduce, cambios] */
  var REDOX = [
    ['Zn + CuSO4 &rarr; ZnSO4 + Cu', 'Zn', 'Cu<sup>2+</sup>', ['SO<sub>4</sub><sup>2&minus;</sup>', 'Zn<sup>2+</sup>', 'O<sup>2&minus;</sup>'], ['Zn', 'Cu', 'S', 'O'], 'Zn', 'Cu', 'Zn: 0 &rarr; +2; Cu: +2 &rarr; 0'],
    ['Fe + CuSO4 &rarr; FeSO4 + Cu', 'Fe', 'Cu<sup>2+</sup>', ['SO<sub>4</sub><sup>2&minus;</sup>', 'Fe<sup>2+</sup>', 'O<sup>2&minus;</sup>'], ['Fe', 'Cu', 'S', 'O'], 'Fe', 'Cu', 'Fe: 0 &rarr; +2; Cu: +2 &rarr; 0'],
    ['Mg + 2HCl &rarr; MgCl2 + H2', 'Mg', 'H<sup>+</sup>', ['Cl<sup>&minus;</sup>', 'Mg<sup>2+</sup>'], ['Mg', 'H', 'Cl'], 'Mg', 'H', 'Mg: 0 &rarr; +2; H: +1 &rarr; 0'],
    ['Zn + 2HCl &rarr; ZnCl2 + H2', 'Zn', 'H<sup>+</sup>', ['Cl<sup>&minus;</sup>', 'Zn<sup>2+</sup>'], ['Zn', 'H', 'Cl'], 'Zn', 'H', 'Zn: 0 &rarr; +2; H: +1 &rarr; 0'],
    ['Fe + 2HCl &rarr; FeCl2 + H2', 'Fe', 'H<sup>+</sup>', ['Cl<sup>&minus;</sup>', 'Fe<sup>2+</sup>'], ['Fe', 'H', 'Cl'], 'Fe', 'H', 'Fe: 0 &rarr; +2; H: +1 &rarr; 0'],
    ['2Al + 3CuSO4 &rarr; Al2(SO4)3 + 3Cu', 'Al', 'Cu<sup>2+</sup>', ['SO<sub>4</sub><sup>2&minus;</sup>', 'Al<sup>3+</sup>', 'O<sup>2&minus;</sup>'], ['Al', 'Cu', 'S', 'O'], 'Al', 'Cu', 'Al: 0 &rarr; +3; Cu: +2 &rarr; 0'],
    ['2Na + Cl2 &rarr; 2NaCl', 'Na', 'Cl<sub>2</sub>', ['Na<sup>+</sup>', 'Cl<sup>&minus;</sup>', 'NaCl'], null, 'Na', 'Cl', 'Na: 0 &rarr; +1; Cl: 0 &rarr; &minus;1'],
    ['2Mg + O2 &rarr; 2MgO', 'Mg', 'O<sub>2</sub>', ['Mg<sup>2+</sup>', 'O<sup>2&minus;</sup>', 'MgO'], null, 'Mg', 'O', 'Mg: 0 &rarr; +2; O: 0 &rarr; &minus;2'],
    ['2Fe + 3Cl2 &rarr; 2FeCl3', 'Fe', 'Cl<sub>2</sub>', ['Fe<sup>3+</sup>', 'Cl<sup>&minus;</sup>', 'FeCl<sub>3</sub>'], null, 'Fe', 'Cl', 'Fe: 0 &rarr; +3; Cl: 0 &rarr; &minus;1']
  ];
  function ecuacion(t) { return t.split(' ').map(function (x) { return /^[A-Z0-9(]/.test(x) ? fq(x) : x; }).join(' '); }
  function qAgente(r) {
    var x = r.elige(REDOX), eq = ecuacion(x[0]), oxida = r.bool();
    return { p: 'Determine el agente ' + (oxida ? 'oxidante' : 'reductor') + ' en la reacción:<br>' + eq,
      b: oxida ? x[2] : x[1], m: [oxida ? x[1] : x[2]].concat(x[3]),
      ex: x[7] + '. El que pierde electrones (se oxida) es el agente reductor; el que los gana (se reduce) es el agente oxidante.' };
  }
  function qSeOxida(r) {
    var x = r.elige(REDOX.filter(function (y) { return y[4]; })), oxida = r.bool();
    var b = oxida ? x[5] : x[6];
    return { p: '¿Qué elemento se ' + (oxida ? 'oxida' : 'reduce') + ' en la reacción?<br>' + ecuacion(x[0]),
      b: b, m: distintos(b, x[4].concat(['Ninguno: no hay cambios en los números de oxidación'])),
      ex: x[7] + '. Se oxida el que aumenta su número de oxidación (pierde electrones) y se reduce el que lo disminuye (gana electrones).' };
  }
  /* [formula, elemento, [[elemento, subindice, numero de oxidacion (null: el que se pregunta)], ...]] */
  var OXIDACION = [
    ['H2SO4', 'S', [['H', 2, 1], ['S', 1, null], ['O', 4, -2]]], ['SO2', 'S', [['S', 1, null], ['O', 2, -2]]],
    ['H2S', 'S', [['H', 2, 1], ['S', 1, null]]], ['HNO3', 'N', [['H', 1, 1], ['N', 1, null], ['O', 3, -2]]],
    ['NH3', 'N', [['N', 1, null], ['H', 3, 1]]], ['NO2', 'N', [['N', 1, null], ['O', 2, -2]]],
    ['KMnO4', 'Mn', [['K', 1, 1], ['Mn', 1, null], ['O', 4, -2]]], ['K2Cr2O7', 'Cr', [['K', 2, 1], ['Cr', 2, null], ['O', 7, -2]]],
    ['Fe2O3', 'Fe', [['Fe', 2, null], ['O', 3, -2]]], ['CO2', 'C', [['C', 1, null], ['O', 2, -2]]],
    ['CH4', 'C', [['C', 1, null], ['H', 4, 1]]], ['HClO4', 'Cl', [['H', 1, 1], ['Cl', 1, null], ['O', 4, -2]]],
    ['HClO', 'Cl', [['H', 1, 1], ['Cl', 1, null], ['O', 1, -2]]], ['H3PO4', 'P', [['H', 3, 1], ['P', 1, null], ['O', 4, -2]]],
    ['Na2CO3', 'C', [['Na', 2, 1], ['C', 1, null], ['O', 3, -2]]]
  ];
  function qNumOxidacion(r) {
    var c = r.elige(OXIDACION), partes = c[2], nx = 0, suma = 0, cadaUno = 0, soloO = 0;
    partes.forEach(function (p) {
      if (p[2] === null) { nx = p[1]; return; }
      suma += p[1] * p[2]; cadaUno += p[2];
      if (p[0] === 'O') soloO += p[1] * p[2];
    });
    var x = -suma / nx;
    var conocidos = partes.filter(function (p) { return p[2] !== null; });
    /* los numeros de oxidacion van de -4 a +8 */
    var malas = [-x, -cadaUno, -suma, -soloO / nx].filter(function (y) { return y >= -4 && y <= 8; });
    return { p: '¿Cuál es el número de oxidación del ' + c[1] + ' en ' + fq(c[0]) + '?' +
        P.considere(conocidos.map(function (p) { return p[0] + ': ' + conSigno(p[2]); }).join(', ') + '.'),
      b: x, m: malas, fmt: conSigno, op: { conSigno: true, rango: [-4, 8] },
      ex: 'La suma de los números de oxidación en un compuesto neutro es cero: ' +
        partes.map(function (p) { return (p[1] > 1 ? p[1] : '') + (p[2] === null ? 'x' : '(' + conSigno(p[2]) + ')'); }).join(' + ') +
        ' = 0, así que x = ' + conSigno(x) + '.' };
  }
  function qRedoxRel(r) {
    var OX = ['Pérdida de electrones', 'Aumenta el número de oxidación', 'Ganancia de oxígeno', 'Pérdida de hidrógeno'];
    var RED = ['Ganancia de electrones', 'Disminuye el número de oxidación', 'Pérdida de oxígeno', 'Ganancia de hidrógeno (en compuestos orgánicos)'];
    return { rel: 'Relacione cada proceso con sus características.', cols: ['Proceso', 'Característica'],
      pares: [['Oxidación', r.muestra(OX, 2)], ['Reducción', r.muestra(RED, 2)]], extra: ['Cambia el número de protones del núcleo'],
      ex: 'Oxidación: pierde electrones, aumenta su número de oxidación, gana oxígeno o pierde hidrógeno. Reducción: lo contrario. Siempre ocurren juntas.' };
  }

  /* ---------- 5.6 Acidos y bases ---------- */
  var ACIDOS = [['HCOOH', 'HCOO<sup>&minus;</sup>'], ['HNO<sub>2</sub>', 'NO<sub>2</sub><sup>&minus;</sup>'], ['HF', 'F<sup>&minus;</sup>'],
    ['CH<sub>3</sub>COOH', 'CH<sub>3</sub>COO<sup>&minus;</sup>'], ['HCN', 'CN<sup>&minus;</sup>'], ['HClO', 'ClO<sup>&minus;</sup>']];
  function qConjugados(r) {
    var H2O = 'H<sub>2</sub>O', especies, eq, preguntas;
    if (r.bool(0.25)) {
      var NH3 = 'NH<sub>3</sub>', NH4 = 'NH<sub>4</sub><sup>+</sup>', OH = 'OH<sup>&minus;</sup>';
      especies = [NH3, H2O, NH4, OH];
      eq = NH3 + ' + ' + H2O + ' &rlarr; ' + NH4 + ' + ' + OH;
      preguntas = [['¿cuál es el ácido conjugado?', NH4], ['¿cuál es la base conjugada?', OH], ['¿qué especie actúa como ácido (dona un protón)?', H2O],
        ['¿qué especie actúa como base (acepta un protón)?', NH3]];
    } else {
      var a = r.elige(ACIDOS), H3O = 'H<sub>3</sub>O<sup>+</sup>';
      especies = [a[0], H2O, H3O, a[1]];
      eq = a[0] + ' + ' + H2O + ' &rlarr; ' + H3O + ' + ' + a[1];
      preguntas = [['¿cuál es la base conjugada?', a[1]], ['¿cuál es el ácido conjugado?', H3O], ['¿qué especie actúa como ácido (dona un protón)?', a[0]],
        ['¿qué especie actúa como base (acepta un protón)?', H2O]];
    }
    var q = r.elige(preguntas);
    return { p: 'En la reacción ' + eq + ', ' + q[0], b: q[1], m: especies.filter(function (x) { return x !== q[1]; }),
      ex: 'Según Brønsted-Lowry, el ácido dona un protón (H<sup>+</sup>) y la base lo acepta. El ácido que lo perdió queda como su base conjugada y la base que lo ganó queda como su ácido conjugado.' };
  }
  var NEUTRA = [['HCl', 'NaOH'], ['HCl', 'KOH'], ['HNO3', 'NaOH'], ['HNO3', 'KOH'], ['HBr', 'NaOH'], ['HI', 'KOH'], ['HCl', 'LiOH'], ['HF', 'NaOH']];
  function qNeutralizacion(r) {
    var n = r.elige(NEUTRA), M = n[1].replace(/OH$/, ''), X = n[0].replace(/^H/, ''), sal = fq(M + X), agua = 'H<sub>2</sub>O';
    var tipo = r.entero(0, 2), eq = fq(n[0]) + ' + ' + fq(n[1]) + ' &rarr; ' + sal + ' + ' + agua;
    var ex = 'Ácido + base &rarr; sal + agua: el H<sup>+</sup> del ácido y el OH<sup>&minus;</sup> de la base forman agua, y el metal con el resto del ácido forman la sal: ' + eq + '.';
    if (tipo === 0) {
      var b = sal + ' y ' + agua;
      return { p: '¿Qué compuestos resultan de la neutralización entre ' + fq(n[0]) + ' y ' + fq(n[1]) + '?', b: b,
        m: [sal + ' y H<sub>2</sub>', sal + ' y H<sub>2</sub>O<sub>2</sub>', fq(M + 'H') + ' y ' + fq(X + 'OH'), sal + ' y O<sub>2</sub>',
          fq(X + 'OH') + ' y ' + fq(M + 'H'), 'H<sub>2</sub> y ' + fq(M + X + 'O')], ex: ex };
    }
    if (tipo === 1) {
      return { p: 'En la reacción de neutralización entre ' + fq(n[0]) + ' y ' + fq(n[1]) + ', ¿cuál es la sal que se forma?', b: sal,
        m: [fq(M + 'H'), fq(X + 'OH'), fq(M + '2O'), agua, fq(n[0]), fq(n[1])], ex: ex };
    }
    return { p: '¿Qué tipo de reacción es la siguiente?<br>' + eq, b: 'Neutralización',
      m: ['Óxido-reducción', 'Combustión', 'Descomposición', 'Síntesis de un óxido', 'Desplazamiento simple', 'Precipitación'], ex: ex };
  }

  /* ---------- 5.7 pH ---------- */
  function diezA(k) { return '1 &times; 10<sup>' + (k < 0 ? '&minus;' + (-k) : k) + '</sup> mol/L'; }
  function claseDe(p) { return p < 7 ? 'ácida' : p > 7 ? 'básica' : 'neutra'; }
  function qPH(r) {
    var tipo = r.entero(0, 2);
    if (tipo === 0) {
      var k = r.entero(1, 13), b = 'pH = ' + k + ', ' + claseDe(k);
      var otras = ['ácida', 'básica', 'neutra'].filter(function (c) { return c !== claseDe(k); });
      return { p: 'Una disolución tiene una concentración de iones hidrógeno [H<sup>+</sup>] = ' + diezA(-k) + '. ¿Cuál es su pH y qué tipo de disolución es?' +
          P.considere('pH = &minus;log[H<sup>+</sup>].'), b: b,
        m: distintos(b, ['pH = ' + k + ', ' + otras[0], 'pH = ' + k + ', ' + otras[1], 'pH = ' + (14 - k) + ', ' + claseDe(14 - k),
          'pH = ' + (14 - k) + ', ' + claseDe(k), 'pH = &minus;' + k + ', ' + claseDe(k)]),
        ex: 'pH = &minus;log(10<sup>&minus;' + k + '</sup>) = ' + k + '. Si el pH es menor que 7 es ácida, si es 7 es neutra y si es mayor que 7 es básica.' };
    }
    if (tipo === 1) {
      var p = r.elige([2, 3, 4, 5, 6, 8, 9, 10, 11, 12]), bien = diezA(-p);
      return { p: 'Una disolución tiene pH = ' + p + '. ¿Cuál es su concentración de iones hidrógeno [H<sup>+</sup>]?' + P.considere('pH = &minus;log[H<sup>+</sup>].'),
        b: bien, m: [diezA(p), diezA(-(14 - p)), diezA(-(p + 1)), diezA(-(p - 1))],
        ex: 'Si pH = &minus;log[H<sup>+</sup>], entonces [H<sup>+</sup>] = 10<sup>&minus;pH</sup> = 10<sup>&minus;' + p + '</sup> mol/L.' };
    }
    var a = r.entero(1, 6), d = r.entero(2, 4), veces = function (x) { return x + ' veces'; };
    return { p: 'La disolución A tiene pH = ' + a + ' y la disolución B tiene pH = ' + (a + d) + '. ¿Cuántas veces es mayor la concentración de iones H<sup>+</sup> de A que la de B?',
      b: veces(Math.pow(10, d)), m: [veces(d), veces(10 * d), veces(Math.pow(10, d + 1)), veces(Math.pow(10, d - 1))],
      ex: 'La escala de pH es logarítmica: cada unidad de pH menos es 10 veces más H<sup>+</sup>. Con ' + d + ' unidades de diferencia: 10<sup>' + d + '</sup> = ' + Math.pow(10, d) + ' veces.' };
  }

  /* ---------- 5.8 Enlaces ---------- */
  /* el coordinado no va aqui: el H2SO4 o el HNO3 tambien tienen enlaces covalentes polares y habria dos respuestas */
  var ENLACE_EJ = [['Metálico', ['Cu', 'Al', 'Fe']], ['Covalente no polar', ['H2', 'N2', 'O2', 'F2', 'Cl2']], ['Covalente polar', ['H2O', 'NH3', 'HCl']],
    ['Iónico', ['NaCl', 'CaF2', 'KCl', 'MgCl2', 'LiF']]];
  function qEnlaceEjemplo(r) {
    var ex = 'Metálico: entre metales (Cu, Al, Fe). Covalente no polar: entre átomos iguales de no metal (H<sub>2</sub>, O<sub>2</sub>). Covalente polar: entre no metales distintos (H<sub>2</sub>O, NH<sub>3</sub>). Iónico: metal con no metal (NaCl, CaF<sub>2</sub>).';
    if (r.bool()) {
      var t = r.elige(ENLACE_EJ);
      return { p: '¿Qué tipo de enlace se presenta en el ' + fq(r.elige(t[1])) + '?', b: t[0],
        m: ENLACE_EJ.filter(function (x) { return x !== t; }).map(function (x) { return x[0]; }).concat(['Puente de hidrógeno']), ex: ex };
    }
    return { rel: 'Relacione cada sustancia con el tipo de enlace que presenta.', cols: ['Sustancia', 'Tipo de enlace'],
      pares: ENLACE_EJ.map(function (x) { return [fq(r.elige(x[1])), x[0]]; }), ex: ex };
  }
  var EN = { H: 2.1, Li: 1.0, Na: 0.9, K: 0.8, Mg: 1.2, Ca: 1.0, C: 2.5, N: 3.0, O: 3.5, F: 4.0, Cl: 3.0, Br: 2.8 };
  var NOMBRE_EL = { H: 'hidrógeno', Li: 'litio', Na: 'sodio', K: 'potasio', Mg: 'magnesio', Ca: 'calcio', C: 'carbono', N: 'nitrógeno', O: 'oxígeno',
    F: 'flúor', Cl: 'cloro', Br: 'bromo' };
  var PARES_EN = [['NaCl', 'Na', 'Cl'], ['KCl', 'K', 'Cl'], ['NaF', 'Na', 'F'], ['CaO', 'Ca', 'O'], ['MgO', 'Mg', 'O'], ['LiF', 'Li', 'F'], ['KBr', 'K', 'Br'],
    ['HCl', 'H', 'Cl'], ['HBr', 'H', 'Br'], ['H2O', 'H', 'O'], ['NH3', 'N', 'H'], ['CO2', 'C', 'O'],
    ['Cl2', 'Cl', 'Cl'], ['O2', 'O', 'O'], ['N2', 'N', 'N'], ['F2', 'F', 'F'], ['H2', 'H', 'H']];
  function qElectronegatividad(r) {
    var c = r.elige(PARES_EN), a = c[1], b = c[2], d = F.redondea(Math.abs(EN[a] - EN[b]), 1);
    var tipo = d < 0.4 ? 'Covalente no polar' : d <= 1.7 ? 'Covalente polar' : 'Iónico';
    var datos = a === b ? 'La electronegatividad del ' + NOMBRE_EL[a] + ' es ' + EN[a].toFixed(1) + '.'
      : 'Las electronegatividades del ' + NOMBRE_EL[a] + ' y del ' + NOMBRE_EL[b] + ' son ' + EN[a].toFixed(1) + ' y ' + EN[b].toFixed(1) + '.';
    return { p: datos + ' ¿Qué tipo de enlace se forma en el ' + fq(c[0]) + '?' +
        P.considere('que si la diferencia de electronegatividad es menor que 0.4 el enlace es covalente no polar; de 0.4 a 1.7, covalente polar, y mayor que 1.7, iónico.'),
      b: tipo, m: ['Iónico', 'Covalente polar', 'Covalente no polar', 'Metálico'].filter(function (x) { return x !== tipo; }),
      ex: 'Diferencia = |' + EN[a].toFixed(1) + ' &minus; ' + EN[b].toFixed(1) + '| = ' + d.toFixed(1) + ' &rarr; ' + tipo.toLowerCase() + '.' };
  }

  /* ---------- 5.9 Gas ideal ---------- */
  function qGasIdeal(r) {
    var R0 = 0.0821, n = r.elige([0.5, 1, 1.5, 2, 2.5, 3, 4, 5]), t = r.elige([0, 15, 20, 25, 27, 30, 37, 50, 100]), T = t + 273;
    var V = r.elige([2, 4, 5, 8, 10, 12, 15, 20, 25]), Pr = n * R0 * T / V, que = r.entero(0, 2);
    var cons = P.considere('PV = nRT, R = 0.0821 atm&middot;L/(mol&middot;K) y T(K) = T(&deg;C) + 273.');
    var unid = function (u) { return function (x) { return P.num(x, 2) + ' ' + u; }; };
    if (que === 0) {
      return { p: '¿Qué presión ejercen ' + F.n(n) + ' mol de un gas ideal en un recipiente de ' + V + ' L a ' + t + ' &deg;C?' + cons,
        b: F.redondea(Pr, 2), m: [n * R0 * t / V, n * T / V, V / (n * R0 * T), n * R0 * T * V].map(function (x) { return F.redondea(x, 2); }),
        fmt: unid('atm'), op: { dec: 2 },
        ex: 'T = ' + t + ' + 273 = ' + T + ' K; P = nRT / V = (' + F.n(n) + ')(0.0821)(' + T + ') / ' + V + ' = ' + P.num(Pr, 2) + ' atm.' };
    }
    var p0 = r.elige([0.5, 1, 1.5, 2, 2.5, 3]), V2 = n * R0 * T / p0;
    if (que === 1) {
      return { p: '¿Qué volumen ocupan ' + F.n(n) + ' mol de un gas ideal a ' + F.n(p0) + ' atm y ' + t + ' &deg;C?' + cons,
        b: F.redondea(V2, 2), m: [n * R0 * t / p0, p0 / (n * R0 * T), n * T / p0, n * R0 * T * p0].map(function (x) { return F.redondea(x, 2); }),
        fmt: unid('L'), op: { dec: 2 },
        ex: 'T = ' + t + ' + 273 = ' + T + ' K; V = nRT / P = (' + F.n(n) + ')(0.0821)(' + T + ') / ' + F.n(p0) + ' = ' + P.num(V2, 2) + ' L.' };
    }
    var n2 = p0 * V / (R0 * T);
    return { p: '¿Cuántos moles de gas hay en un recipiente de ' + V + ' L a ' + F.n(p0) + ' atm y ' + t + ' &deg;C?' + cons,
      b: F.redondea(n2, 2), m: [p0 * V / (R0 * t), R0 * T / (p0 * V), p0 * V * R0 * T, p0 * V / T].map(function (x) { return F.redondea(x, 2); }),
      fmt: unid('mol'), op: { dec: 2 },
      ex: 'T = ' + t + ' + 273 = ' + T + ' K; n = PV / RT = (' + F.n(p0) + ')(' + V + ') / (0.0821 &times; ' + T + ') = ' + P.num(n2, 2) + ' mol.' };
  }

  /* ---------- 5.10 Masa molecular ---------- */
  var MASA = { H: '1.008', C: '12.01', N: '14.01', O: '16.00', Na: '22.99', Al: '26.98', S: '32.07', Ca: '40.08' };
  var NUM_ATOMICO = { H: 1, C: 6, N: 7, O: 8, Na: 11, Al: 13, S: 16, Ca: 20 };
  var COMPUESTOS = [['agua', 'H2O', [['H', 2], ['O', 1]]], ['dióxido de carbono', 'CO2', [['C', 1], ['O', 2]]], ['amoniaco', 'NH3', [['N', 1], ['H', 3]]],
    ['metano', 'CH4', [['C', 1], ['H', 4]]], ['ácido sulfúrico', 'H2SO4', [['H', 2], ['S', 1], ['O', 4]]], ['glucosa', 'C6H12O6', [['C', 6], ['H', 12], ['O', 6]]],
    ['carbonato de calcio', 'CaCO3', [['Ca', 1], ['C', 1], ['O', 3]]], ['etanol', 'C2H5OH', [['C', 2], ['H', 6], ['O', 1]]],
    ['ácido nítrico', 'HNO3', [['H', 1], ['N', 1], ['O', 3]]], ['óxido de aluminio', 'Al2O3', [['Al', 2], ['O', 3]]],
    ['propano', 'C3H8', [['C', 3], ['H', 8]]], ['dióxido de azufre', 'SO2', [['S', 1], ['O', 2]]], ['hidróxido de calcio', 'Ca(OH)2', [['Ca', 1], ['O', 2], ['H', 2]]],
    ['carbonato de sodio', 'Na2CO3', [['Na', 2], ['C', 1], ['O', 3]]]];
  function masaDe(c) { return F.redondea(c[2].reduce(function (s, x) { return s + x[1] * parseFloat(MASA[x[0]]); }, 0), 3); }
  function uma(x) { return F.n(x, 3) + ' u'; }
  function masasConsidere(els) {
    return P.considere('las masas atómicas: ' + els.map(function (e) { return e + ' = ' + MASA[e] + ' u'; }).join(', ') + '.');
  }
  function qMasaMolecular(r) {
    if (r.bool(0.7)) {
      var c = r.elige(COMPUESTOS), comp = c[2], b = masaDe(c);
      var suma = function (f) { return F.redondea(comp.reduce(function (s, x, i) { return s + f(x, i); }, 0), 3); };
      var sub = comp.map(function (x) { return x[1]; }).reverse();
      var doble = function (el) { return suma(function (x) { return x[1] * parseFloat(MASA[x[0]]) * (x[0] === el ? 2 : 1); }); };
      return { p: '¿Cuál es la masa molecular ' + (c[0] === 'glucosa' ? 'de la ' : 'del ') + c[0] + ' (' + fq(c[1]) + ')?' + masasConsidere(comp.map(function (x) { return x[0]; })),
        b: b, m: [
          suma(function (x) { return parseFloat(MASA[x[0]]); }),                                   // cada elemento una sola vez
          suma(function (x) { return parseFloat(MASA[x[0]]) + (x[1] > 1 ? x[1] : 0); }),            // suma el subindice en vez de multiplicar
          suma(function (x, i) { return sub[i] * parseFloat(MASA[x[0]]); }),                        // subindices cambiados de lugar
          suma(function (x) { return x[1] * NUM_ATOMICO[x[0]]; }),                                  // numeros atomicos en vez de masas
          suma(function (x, i) { return (i === comp.length - 1 ? 1 : x[1]) * parseFloat(MASA[x[0]]); }),  // olvida el ultimo subindice
          doble('O'), doble('H')                                                                    // toma O como O2 o H como H2
        ].filter(function (y) { return y !== b; }), fmt: uma, op: { dec: 3 },
        ex: 'Se suman las masas de todos los átomos: ' + comp.map(function (x) { return '(' + x[1] + ' &times; ' + MASA[x[0]] + ')'; }).join(' + ') + ' = ' + uma(b) + '.' };
    }
    /* cual pesa mas: cuatro compuestos con masas distintas */
    var cuatro;
    do { cuatro = r.muestra(COMPUESTOS, 4); } while (cuatro.some(function (x, i) { return cuatro.some(function (y, j) { return i < j && Math.abs(masaDe(x) - masaDe(y)) < 1; }); }));
    var mayor = r.bool(), elegido = cuatro.slice().sort(function (x, y) { return mayor ? masaDe(y) - masaDe(x) : masaDe(x) - masaDe(y); })[0];
    var els = [];
    cuatro.forEach(function (x) { x[2].forEach(function (y) { if (els.indexOf(y[0]) === -1) els.push(y[0]); }); });
    var nom = function (x) { return fq(x[1]) + ' (' + x[0] + ')'; };
    return { p: '¿Cuál de las siguientes sustancias tiene la ' + (mayor ? 'mayor' : 'menor') + ' masa molecular?' + masasConsidere(els),
      b: nom(elegido), m: cuatro.filter(function (x) { return x !== elegido; }).map(nom),
      ex: cuatro.map(function (x) { return fq(x[1]) + ' = ' + uma(masaDe(x)); }).join('; ') + '.' };
  }

  /* ---------- 5.11 Compuestos del carbono ---------- */
  var ALCANOS = ['Metano', 'Etano', 'Propano', 'Butano', 'Pentano', 'Hexano', 'Heptano', 'Octano', 'Nonano', 'Decano'];
  function formulaCH(c, h) { return 'C' + (c > 1 ? '<sub>' + c + '</sub>' : '') + 'H<sub>' + h + '</sub>'; }
  function qAlcanos(r) {
    var tipo = r.entero(0, 2), n = tipo === 2 ? r.entero(2, 7) : r.entero(1, 10), nom = ALCANOS[n - 1], f = formulaCH(n, 2 * n + 2);
    var raiz = nom.replace(/ano$/, '');
    var ex = 'Los alcanos tienen fórmula general C<sub>n</sub>H<sub>2n+2</sub> y terminan en -ano. ' + nom + ': ' + n + ' carbono' + (n > 1 ? 's' : '') + ', ' + f + '.';
    var vecinos = distintos(nom, [ALCANOS[n - 2], ALCANOS[n], n >= 2 ? raiz + 'eno' : null, raiz + 'anol', ALCANOS[n + 1]]);
    if (tipo === 0) {
      var malas = [formulaCH(n, 2 * n), formulaCH(n, 2 * n + 4), formulaCH(n + 1, 2 * n + 4)];
      if (n >= 2) malas.push(formulaCH(n, 2 * n - 2), formulaCH(n - 1, 2 * n));
      return { p: '¿Cuál es la fórmula molecular del ' + nom.toLowerCase() + '?', b: f, m: distintos(f, malas), ex: ex };
    }
    if (tipo === 1) return { p: '¿Cómo se llama el alcano de fórmula ' + f + '?', b: nom, m: vecinos, ex: ex };
    var semi = 'CH<sub>3</sub>';
    for (var i = 0; i < n - 2; i++) semi += '&ndash;CH<sub>2</sub>';
    semi += '&ndash;CH<sub>3</sub>';
    return { p: '¿Qué alcano tiene la fórmula semidesarrollada ' + semi + '?', b: nom, m: vecinos, ex: ex };
  }
  function qGrupoEstructura(r) {
    /* el radical de la izquierda termina en el enlace y el de la derecha empieza en el */
    var a = r.elige(['CH<sub>3</sub>', 'CH<sub>3</sub>&ndash;CH<sub>2</sub>', 'CH<sub>3</sub>&ndash;CH<sub>2</sub>&ndash;CH<sub>2</sub>']);
    var b = r.elige(['CH<sub>3</sub>', 'CH<sub>2</sub>&ndash;CH<sub>3</sub>', 'CH<sub>2</sub>&ndash;CH<sub>2</sub>&ndash;CH<sub>3</sub>']);
    var G = [['Alcohol', a + '&ndash;OH'], ['Aldehído', a + '&ndash;CHO'], ['Cetona', a + '&ndash;CO&ndash;' + b], ['Ácido carboxílico', a + '&ndash;COOH'],
      ['Éter', a + '&ndash;O&ndash;' + b], ['Éster', a + '&ndash;COO&ndash;' + b], ['Amina', a + '&ndash;NH<sub>2</sub>']];
    var g = r.elige(G);
    return { p: '¿A qué grupo funcional pertenece el compuesto ' + g[1] + '?', b: g[0], m: G.filter(function (x) { return x !== g; }).map(function (x) { return x[0]; }),
      ex: 'Alcohol: R&ndash;OH. Aldehído: R&ndash;CHO. Cetona: R&ndash;CO&ndash;R&prime;. Ácido carboxílico: R&ndash;COOH. Éter: R&ndash;O&ndash;R&prime;. Éster: R&ndash;COO&ndash;R&prime;. Amina: R&ndash;NH<sub>2</sub>.' };
  }
  function qPlasma(r) {
    return { p: '¿Cuál de los siguientes es un ejemplo del estado de plasma?', b: r.elige(['Un relámpago', 'El Sol', 'El gas de una lámpara fluorescente encendida']),
      m: ['El vapor de agua de las nubes', 'La nieve de una montaña', 'El agua de un río', 'El oxígeno del aire', 'Un anillo de oro'],
      ex: 'El plasma es un gas sometido a altas temperaturas, a corrientes eléctricas o a mucha energía en forma de luz: el Sol, los relámpagos y las lámparas fluorescentes.' };
  }

  P.temaBanco({
    id: 'prepa-quimica',
    grupo: 'Ciencias experimentales',
    nombre: 'Quimica',
    descripcion: 'Atomo, tabla periodica y configuracion electronica, estados de la materia, mezclas, oxido-reduccion, acidos y bases, pH, enlaces, gases, masa molecular y quimica organica. Reactivos 25 a 42 del area.',
    etiquetas: ['atomo', 'tabla periodica', 'enlace', 'redox', 'acido', 'gas ideal', 'organica'],
    formulario: 'PV = nRT, R = 0.0821 atm&middot;L/(mol&middot;K) &nbsp;&middot;&nbsp; pH = &minus;log[H<sup>+</sup>]: pH &lt; 7 &aacute;cido, pH = 7 neutro, pH &gt; 7 b&aacute;sico &nbsp;&middot;&nbsp; masa molecular = suma de las masas at&oacute;micas',
    niveles: {
      facil: ['octeto', 'cambiosEstado', 'estados', 'mezclas', 'compuesto', 'ph'],
      medio: ['particulas', 'bohr', 'tablaPeriodica', 'neutralizacion', 'enlaces', 'grupoFuncional', 'nomenclatura'],
      dificil: ['oxidante', 'seOxida', 'acidoBase', 'caracEnlaces', 'gasIdeal']
    },
    items: [
      { s: 'particulas', n: 'Particulas del atomo', v: [
        { rel: 'Relacione las partículas con sus características.', cols: ['Partícula', 'Característica'],
          pares: [['Protón', ['Determina el número atómico', 'Tiene carga positiva']],
            ['Neutrón', ['Tiene masa, pero no tiene carga', 'Si varía su número se forman isótopos']],
            ['Electrón', ['Se distribuye en niveles de energía', 'Interactúa para formar enlaces químicos']]] },
        { p: 'Un átomo de sodio tiene número atómico 11 y número de masa 23. ¿Cuántos neutrones tiene?', b: '12', m: ['11', '23', '34', '22'],
          ex: 'Neutrones = masa − número atómico = 23 − 11 = 12.' },
        qParticulas, qParticulas,
        { p: '¿Qué determina a qué elemento químico pertenece un átomo?', b: 'Su número de protones (número atómico)',
          m: ['Su número de neutrones', 'Su número de electrones de valencia', 'Su masa atómica', 'El número de niveles de energía que ocupa'],
          ex: 'Todos los átomos de un elemento tienen el mismo número de protones; si cambian los neutrones, son isótopos del mismo elemento.' }
      ] },
      { s: 'bohr', n: 'Modelos atomicos', v: [
        { c: 'En el modelo de Bohr, cuando un electrón absorbe energía pasa a ___ y cuando libera energía (emite un fotón) pasa a ___, quedando más cerca del núcleo.',
          b: ['un nivel de energía mayor', 'un nivel de energía menor'],
          m: [['un nivel de energía menor', 'un nivel de energía mayor'], ['ganar energía', 'perder energía'], ['otro átomo', 'el núcleo'], ['un nivel de energía mayor', 'otro átomo']] },
        { p: '¿Qué científico propuso un modelo del átomo con un núcleo pequeño y denso, a partir del experimento con la lámina de oro?', b: 'Rutherford',
          m: ['Bohr', 'Dalton', 'Thomson', 'Schrödinger'] },
        { rel: 'Relacione cada modelo atómico con su descripción.', cols: ['Modelo', 'Descripción'],
          pares: [['Demócrito', 'Sin hacer experimentos, propuso que la materia está formada por partículas invisibles e indivisibles llamadas átomos'],
            ['Dalton', 'Primera teoría atómica científica: el átomo es una esfera maciza e indivisible y los átomos de un mismo elemento son iguales'],
            ['Thomson', 'El átomo es una esfera con carga positiva que tiene incrustados los electrones, como un budín con pasas'],
            ['Rutherford', 'El átomo tiene un núcleo pequeño y denso con carga positiva, y los electrones giran a su alrededor'],
            ['Bohr', 'Los electrones giran alrededor del núcleo en órbitas con niveles de energía definidos']] },
        { p: 'Según la teoría atómica de Dalton, el átomo es:', b: 'una partícula extremadamente pequeña e indivisible',
          m: ['una esfera positiva con electrones incrustados', 'un núcleo denso rodeado de electrones', 'una nube de electrones sin núcleo', 'una partícula formada por quarks'],
          ex: 'Dalton describió el átomo como una partícula extremadamente pequeña e indivisible; después se descubrió que tiene partículas subatómicas.' }
      ] },
      { s: 'octeto', n: 'Gases nobles y octeto', v: [
        { c: 'El ___ pertenece al grupo de los gases nobles, que casi no reaccionan porque en su último nivel de energía cumplen con ___, lo que les da gran estabilidad.',
          b: ['neón', 'la regla del octeto'], m: [['neón', 'la regla de Hund'], ['hidrógeno', 'el principio de exclusión de Pauli'], ['hidrógeno', 'la regla del octeto'], ['sodio', 'la regla del octeto']] },
        { p: '¿Cuántos electrones de valencia tienen los elementos del grupo 1 (metales alcalinos)?', b: '1', m: ['2', '7', '8', '0'] },
        qOcteto, qOcteto
      ] },
      { s: 'tablaPeriodica', n: 'Tabla periodica', v: [
        { c: 'El Zn y el Fe son ___ que se caracterizan por tener incompleto el subnivel ___ de su configuración electrónica.',
          b: ['metales de transición', 'd'], m: [['metaloides', 'f'], ['metales de transición', 'p'], ['metaloides', 's'], ['gases nobles', 'd']] },
        { p: 'En la tabla periódica, los elementos de un mismo grupo (columna) tienen el mismo número de:', b: 'electrones de valencia',
          m: ['neutrones', 'niveles de energía', 'protones', 'isótopos'] },
        qConfiguracion, qConfiguracion, qCapacidad, qTipoElemento,
        { rel: 'Relacione a cada científico con su aporte a la historia de la tabla periódica.', cols: ['Científico', 'Aporte'],
          pares: [['Robert Boyle', 'En «El químico escéptico» (1661) describió el comportamiento de los gases y se llamó a sí mismo químico'],
            ['Edward Frankland', 'Acuñó en 1852 el término «valencia» para la capacidad de combinación de los elementos'],
            ['John Newlands', 'Notó que al acomodar los elementos en columnas de siete se repetían sus propiedades'],
            ['Dimitri Mendeléiev', 'Ordenó los elementos atendiendo a sus valencias y dejó huecos para elementos aún no descubiertos'],
            ['Henry Moseley', 'Ordenó los elementos por su número atómico, como en la tabla actual']] },
        { rel: 'Relacione cada subnivel de energía con el nombre del que proviene su letra.', cols: ['Subnivel', 'Nombre'],
          pares: [['s', 'sharp (nítido)'], ['p', 'principal'], ['d', 'diffuse (difuso)'], ['f', 'fundamental']] }
      ] },
      { s: 'cambiosEstado', n: 'Cambios de estado', v: [
        { rel: 'Relacione el cambio de estado con su descripción.', cols: ['Cambio', 'Descripción'],
          pares: [['Fusión', 'De sólido a líquido'], ['Evaporación', 'De líquido a gas'], ['Condensación', 'De gas a líquido'],
            ['Solidificación', 'De líquido a sólido'], ['Sublimación', 'De sólido a gas sin pasar por líquido']] },
        { p: 'El hielo seco (CO<sub>2</sub> sólido) pasa directamente a gas. ¿Cómo se llama este cambio de estado?', b: 'Sublimación', m: ['Fusión', 'Evaporación', 'Condensación', 'Deposición'] },
        { p: 'Al sacar una lata de refresco fría del refrigerador, se forman gotitas de agua en su exterior. ¿Qué cambio de estado ocurrió?',
          b: 'Condensación', m: ['Evaporación', 'Fusión', 'Sublimación', 'Solidificación'], ex: 'El vapor de agua del aire se enfría al tocar la lata y pasa de gas a líquido.' },
        { p: 'Un charco de agua desaparece en un día soleado sin que el agua llegue a hervir. ¿Qué cambio de estado ocurrió?',
          b: 'Evaporación', m: ['Condensación', 'Fusión', 'Sublimación', 'Solidificación'], ex: 'El agua líquida pasa poco a poco a vapor (gas) desde su superficie.' },
        { p: 'Al calentar un trozo de mantequilla en un sartén, pasa de sólido a líquido. ¿Cómo se llama este cambio de estado?',
          b: 'Fusión', m: ['Evaporación', 'Condensación', 'Sublimación', 'Solidificación'] }
      ] },
      { s: 'estados', n: 'Estados de la materia', v: [
        { p: '¿En qué estado de la materia las sustancias pueden fluir, tienen volumen fijo y toman la forma del recipiente que las contiene?', b: 'Líquido', m: ['Gaseoso', 'Plasma', 'Sólido'] },
        { p: '¿En qué estado de la materia las partículas están muy separadas, se mueven libremente y la sustancia ocupa todo el volumen del recipiente?', b: 'Gaseoso', m: ['Líquido', 'Sólido', 'Plasma'] },
        { p: '¿En qué estado de la materia predominan las fuerzas de cohesión, de modo que las partículas sólo vibran en su lugar y la sustancia tiene forma y volumen definidos?',
          b: 'Sólido', m: ['Líquido', 'Gaseoso', 'Plasma'] },
        qPlasma,
        { c: 'A los líquidos y a los gases se les llama ___ porque sus partículas pueden deslizarse unas sobre otras.',
          b: ['fluidos'], m: [['sólidos'], ['plasmas'], ['coloides'], ['cristales']] }
      ] },
      { s: 'mezclas', n: 'Mezclas y disoluciones', v: [
        { p: 'Las disoluciones son mezclas homogéneas compuestas por un:', b: 'soluto y un disolvente', m: ['disoluto y un soluto', 'solvente y un disolvente', 'soluto y una disolución'] },
        { p: '¿Cuál de las siguientes es una mezcla heterogénea?', b: 'Agua con aceite', m: ['Agua con sal disuelta', 'Aire limpio', 'Refresco sin gas', 'Acero'] },
        { p: '¿Qué método separa una mezcla de agua y sal?', b: 'Evaporación', m: ['Imantación', 'Decantación', 'Tamizado', 'Filtración'] },
        { rel: 'Relacione cada mezcla con las sustancias que la forman.', cols: ['Mezcla', 'Composición'],
          pares: [['Aire', 'Varios gases, principalmente nitrógeno, oxígeno y argón'], ['Bebida gaseosa', 'Un gas (dióxido de carbono) disuelto en un líquido (agua)'],
            ['Vinagre', 'Un líquido (ácido acético) en otro líquido (agua)'], ['Agua de mar', 'Sólidos (sales) disueltos en un líquido (agua)'],
            ['Amalgama dental', 'Un líquido (mercurio) disuelto en un sólido (plata)'], ['Latón', 'Un sólido (zinc) disuelto en otro sólido (cobre)'],
            ['Humo', 'Partículas sólidas de una combustión incompleta dispersas en el aire']] },
        { p: '¿Qué fenómeno permite distinguir un coloide de una disolución, porque las partículas del coloide dispersan la luz?', b: 'El efecto Tyndall',
          m: ['La sublimación', 'La decantación', 'El efecto invernadero', 'La ósmosis', 'La destilación'],
          ex: 'En un coloide las partículas son lo bastante grandes para dispersar la luz (efecto Tyndall), pero demasiado pequeñas para sedimentar.' },
        { c: 'En una disolución, el componente que está en mayor cantidad se llama ___ y el que está en menor cantidad se llama ___.',
          b: ['disolvente', 'soluto'], m: [['soluto', 'disolvente'], ['coloide', 'suspensión'], ['disolvente', 'coloide'], ['fase dispersa', 'disolvente'], ['medio', 'precipitado']] },
        { p: 'Un medicamento dice «agítese antes de usarse» porque sus partículas, que se ven a simple vista, se van al fondo con el tiempo. ¿Qué tipo de mezcla es?',
          b: 'Suspensión', m: ['Disolución', 'Coloide', 'Compuesto', 'Aleación', 'Sustancia pura'], ex: 'En las suspensiones las partículas son grandes (más de 1 µm) y terminan por sedimentar.' }
      ] },
      { s: 'compuesto', n: 'Compuestos y masa molecular', v: [
        { c: 'Un ___ es una sustancia pura que al ___ por métodos químicos da lugar a dos o más elementos unidos en una proporción constante.',
          b: ['compuesto', 'descomponerse'], m: [['átomo', 'mezclarse'], ['ion', 'descomponerse'], ['metal', 'mezclarse'], ['elemento', 'descomponerse']] },
        { p: '¿Cuál de las siguientes sustancias es un elemento?', b: 'Oro (Au)', m: ['Agua (H<sub>2</sub>O)', 'Sal (NaCl)', 'Aire', 'Dióxido de carbono (CO<sub>2</sub>)'] },
        qMasaMolecular, qMasaMolecular, qMasaMolecular
      ] },
      { s: 'oxidante', n: 'Agente oxidante', v: [
        { p: 'Determine el agente oxidante en la reacción:<br>Cu + 2AgNO<sub>3</sub> &rarr; 2Ag + Cu(NO<sub>3</sub>)<sub>2</sub>', b: 'Ag<sup>+</sup>', m: ['Cu', 'O<sup>2&minus;</sup>', 'N<sup>5+</sup>'],
          ex: 'La plata pasa de +1 a 0: gana electrones, se reduce, y por eso es el agente oxidante.' },
        { p: 'Determine el agente reductor en la reacción:<br>Zn + CuSO<sub>4</sub> &rarr; ZnSO<sub>4</sub> + Cu', b: 'Zn', m: ['Cu<sup>2+</sup>', 'S<sup>6+</sup>', 'O<sup>2&minus;</sup>'],
          ex: 'El zinc pasa de 0 a +2: pierde electrones, se oxida, y por eso es el agente reductor.' },
        qAgente, qAgente,
        { p: 'Una sustancia que oxida a otra, y que en el proceso se reduce, se conoce como:', b: 'agente oxidante',
          m: ['agente reductor', 'catalizador', 'ácido conjugado', 'disolvente'] }
      ] },
      { s: 'seOxida', n: 'Elemento que se oxida', v: [
        { p: '¿Qué elemento se oxida en la reacción?<br>2HNO<sub>3</sub> + 6HBr &rarr; 3Br<sub>2</sub> + 2NO + 4H<sub>2</sub>O<br><small>Considere O: &minus;2 y H: +1.</small>', b: 'Br', m: ['O', 'H', 'N'],
          ex: 'El bromo pasa de −1 (en HBr) a 0 (en Br₂): pierde electrones.' },
        { p: '¿Qué elemento se reduce en la reacción?<br>Fe<sub>2</sub>O<sub>3</sub> + 3CO &rarr; 2Fe + 3CO<sub>2</sub>', b: 'Fe', m: ['C', 'O', 'Ninguno: no hay cambios de estado de oxidación'],
          ex: 'El hierro pasa de +3 a 0: gana electrones.' },
        qSeOxida, qNumOxidacion, qNumOxidacion, qRedoxRel
      ] },
      { s: 'neutralizacion', n: 'Neutralizacion', v: [
        { p: '¿Qué compuestos resultan de la neutralización entre HNO<sub>3</sub> y NaOH?', b: 'NaNO<sub>3</sub> y H<sub>2</sub>O',
          m: ['HNO<sub>3</sub> y O', 'N y H<sub>2</sub>O', 'NO<sub>3</sub> y H<sub>2</sub>', 'NaNO<sub>3</sub> y O<sub>2</sub>', 'NaOH y HNO<sub>3</sub>'] },
        { p: '¿Qué compuestos resultan de la neutralización entre HCl y KOH?', b: 'KCl y H<sub>2</sub>O',
          m: ['KH y ClO', 'K y HClO', 'Cl<sub>2</sub> y H<sub>2</sub>', 'KCl y O<sub>2</sub>', 'KOH y HCl'] },
        qNeutralizacion, qNeutralizacion,
        { c: 'Una reacción de ___ ocurre entre un ácido y una base, y generalmente forma una ___ y agua.',
          b: ['neutralización', 'sal'], m: [['combustión', 'sal'], ['neutralización', 'base'], ['oxidación', 'mezcla'], ['descomposición', 'sal'],
            ['precipitación', 'sustancia gaseosa'], ['neutralización', 'disolución']] }
      ] },
      { s: 'acidoBase', n: 'Acidos y bases', v: [
        { p: 'Según Brønsted-Lowry, un ácido es una sustancia que:', b: 'dona protones (H<sup>+</sup>)', m: ['acepta protones (H<sup>+</sup>)', 'dona electrones', 'libera OH<sup>&minus;</sup> en agua siempre'] },
        { p: 'En la reacción HNO<sub>2</sub> + H<sub>2</sub>O &rlarr; H<sub>3</sub>O<sup>+</sup> + NO<sub>2</sub><sup>&minus;</sup>, ¿cuál es la base conjugada?',
          b: 'NO<sub>2</sub><sup>&minus;</sup>', m: ['HNO<sub>2</sub>', 'H<sub>2</sub>O', 'H<sub>3</sub>O<sup>+</sup>'] },
        qConjugados, qConjugados,
        { p: 'Según Lewis, una base es una sustancia que:', b: 'puede donar un par de electrones',
          m: ['puede aceptar un par de electrones', 'libera iones H<sup>+</sup> en agua', 'tiene un pH menor que 7', 'dona protones (H<sup>+</sup>)'] },
        { p: 'Según Lewis, un ácido es una sustancia que:', b: 'puede aceptar un par de electrones',
          m: ['puede donar un par de electrones', 'libera iones OH<sup>&minus;</sup> en agua', 'tiene un pH mayor que 7', 'acepta protones (H<sup>+</sup>)'] }
      ] },
      { s: 'ph', n: 'Escala de pH', v: [
        { p: 'Identifique la sustancia ácida según su ubicación en la escala de pH.', b: 'Refresco de cola (pH &asymp; 2.5)', m: ['Agua pura (pH = 7)', 'Amoniaco (pH &asymp; 11)', 'Sangre (pH &asymp; 7.4)'] },
        { p: 'Identifique la sustancia básica según su ubicación en la escala de pH.', b: 'Blanqueador (pH &asymp; 12.5)', m: ['Jugo de limón (pH &asymp; 2)', 'Vinagre (pH &asymp; 3)', 'Agua pura (pH = 7)'] },
        qPH, qPH, qPH
      ] },
      { s: 'enlaces', n: 'Tipos de enlace', v: [
        { c: 'El enlace metálico se da entre metales, el enlace covalente se da entre elementos ___, mientras que el enlace iónico se forma por la combinación ___.',
          b: ['no metálicos', 'de un metal con un no metal'], m: [['metálicos', 'entre no metales'], ['no metálicos', 'de metales'], ['metálicos', 'de un metal con un no metal'], ['gaseosos', 'de dos gases nobles']] },
        { p: 'El cloruro de sodio (NaCl) se forma por transferencia de un electrón del sodio al cloro. ¿Qué tipo de enlace es?', b: 'Iónico', m: ['Covalente no polar', 'Metálico', 'Puente de hidrógeno'] },
        qEnlaceEjemplo, qEnlaceEjemplo, qEnlaceEjemplo,
        { p: 'En un enlace covalente coordinado:', b: 'uno de los dos átomos aporta el par de electrones que se comparte',
          m: ['cada átomo aporta un electrón al enlace', 'un átomo transfiere electrones al otro y se forman iones', 'los electrones forman una nube que se mueve entre muchos átomos de metal',
            'los átomos no comparten electrones'], ex: 'Ejemplos de la guía con enlace coordinado: H<sub>2</sub>SO<sub>4</sub>, HNO<sub>3</sub> y HClO<sub>3</sub>.' }
      ] },
      { s: 'caracEnlaces', n: 'Caracteristicas de los enlaces', v: [
        { rel: 'Relacione los tipos de enlace con sus características.', cols: ['Tipo de enlace', 'Característica'],
          pares: [['Covalente', ['Se forma entre dos no metales', 'Comparte electrones']],
            ['Iónico', ['La diferencia de electronegatividad es mayor que 1.7', 'Forma iones']],
            ['Metálico', ['Forma aleaciones', 'Forma una nube electrónica']]] },
        qElectronegatividad, qElectronegatividad,
        { p: 'Una sustancia es un sólido duro y quebradizo, tiene un punto de fusión muy alto y, disuelta en agua, conduce la corriente eléctrica. ¿Qué tipo de enlace presenta?',
          b: 'Iónico', m: ['Covalente no polar', 'Metálico', 'Covalente polar', 'Covalente coordinado'] },
        { p: 'Un material conduce el calor y la electricidad, tiene brillo y se puede estirar en hilos y laminar. ¿Qué tipo de enlace presenta?',
          b: 'Metálico', m: ['Iónico', 'Covalente no polar', 'Covalente polar', 'Covalente coordinado'] },
        { p: '¿Cuál es el único metal que es líquido a temperatura ambiente?', b: 'Mercurio (Hg)',
          m: ['Sodio (Na)', 'Hierro (Fe)', 'Oro (Au)', 'Aluminio (Al)', 'Cobre (Cu)'] }
      ] },
      { s: 'gasIdeal', n: 'Ley del gas ideal', v: (function () {
        var vs = [];
        [[40, 50, 298], [20, 10, 300], [10, 5, 273], [25, 4, 310]].forEach(function (d) {
          var n = d[1] * d[0] / (0.0821 * d[2]);
          vs.push({ p: '¿Cuántos moles de nitrógeno hay en un tanque de ' + d[0].toFixed(2) + ' L que está a ' + d[1].toFixed(2) + ' atm de presión y a ' + d[2].toFixed(2) + ' K?<br><small>Considere R = 0.0821 atm&middot;L/(mol&middot;K).</small>',
            b: F.redondea(n, 2), m: [d[1] / (d[0] * 0.0821 * d[2]), d[1] * d[0] * 0.0821 / d[2], d[1] * d[0] / 0.0821, d[0] * 0.0821 * d[2] / d[1]].map(function (x) { return F.redondea(x, 2); }),
            fmt: function (x) { return P.num(x, 2) + ' mol'; }, op: { dec: 2 },
            ex: 'n = PV / RT = (' + d[1] + ')(' + d[0] + ') / (0.0821 × ' + d[2] + ') = ' + n.toFixed(2) + ' mol' });
        });
        return vs.concat([qGasIdeal, qGasIdeal, qGasIdeal]);
      })() },
      { s: 'grupoFuncional', n: 'Grupos funcionales', v: [
        { rel: 'Relacione el grupo funcional con su estructura.', cols: ['Grupo funcional', 'Estructura'],
          pares: [['Hidroxilo (alcohol)', 'R&ndash;OH'], ['Carboxilo (ácido carboxílico)', 'R&ndash;COOH'], ['Carbonilo de aldehído', 'R&ndash;CHO'],
            ['Alcoxi (éter)', 'R&ndash;O&ndash;R&prime;'], ['Amino (amina)', 'R&ndash;NH<sub>2</sub>']] },
        qGrupoEstructura, qGrupoEstructura,
        { rel: 'Relacione cada grupo funcional con la terminación de su nombre.', cols: ['Grupo funcional', 'Terminación'],
          pares: [['Alcohol', '-ol'], ['Aldehído', '-al'], ['Cetona', '-ona'], ['Ácido carboxílico', 'ácido ...-ico'],
            ['Éster', '...-ato de ...-ilo (etanoato de metilo)'], ['Éter', '...-il ...-il éter (etil metil éter)']] }
      ] },
      { s: 'nomenclatura', n: 'Nomenclatura organica', v: [
        { p: '¿A qué grupo funcional pertenece el propanal?', b: 'Aldehído', m: ['Alcohol', 'Éster', 'Éter', 'Cetona'], ex: 'La terminación -al indica aldehído.' },
        { p: '¿A qué grupo funcional pertenece el etanol?', b: 'Alcohol', m: ['Aldehído', 'Éter', 'Cetona', 'Ácido carboxílico'], ex: 'La terminación -ol indica alcohol.' },
        { p: '¿A qué grupo funcional pertenece la propanona (acetona)?', b: 'Cetona', m: ['Aldehído', 'Alcohol', 'Éter', 'Éster'], ex: 'La terminación -ona indica cetona.' },
        { p: '¿A qué grupo funcional pertenece el ácido etanoico (ácido acético)?', b: 'Ácido carboxílico', m: ['Aldehído', 'Alcohol', 'Cetona', 'Éter'] },
        qAlcanos, qAlcanos, qAlcanos,
        { p: 'Los hidrocarburos son compuestos orgánicos formados únicamente por átomos de:', b: 'carbono e hidrógeno',
          m: ['carbono, hidrógeno y oxígeno', 'carbono y oxígeno', 'hidrógeno y oxígeno', 'carbono, hidrógeno y nitrógeno'] },
        { p: '¿Por qué el carbono puede formar más compuestos que cualquier otro elemento?',
          b: 'Porque sus átomos forman enlaces sencillos, dobles y triples entre sí, y se unen en cadenas o anillos',
          m: ['Porque es el elemento más abundante del universo', 'Porque es un gas noble muy estable', 'Porque tiene ocho electrones de valencia', 'Porque es un metal que conduce la electricidad'] }
      ] }
    ]
  });
})();
