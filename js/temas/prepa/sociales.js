/* Modo prepa - Ciencias sociales: disciplinas sociales, Estado y sociedad,
   historia de Mexico y problemas actuales (los 40 reactivos del area) */
(function () {
  'use strict';
  var P = EJ.prepa, F = EJ.fmt;

  /* ================= temario de la guia (9. Ciencias sociales) =================
     Preguntas armadas al azar con los temas de la guia "Temas fundamentales y
     bibliografia". Se dejaron fuera los datos de la guia que no son exactos. */

  /* "a que grupo pertenece": la respuesta es el grupo del ejemplo */
  function clasifica(r, grupos, pregunta, extra) {
    var nombres = Object.keys(grupos), g = r.elige(nombres), ej = r.elige(grupos[g]);
    return { p: pregunta(ej), b: g, m: nombres.filter(function (x) { return x !== g; }).concat(extra || []) };
  }
  function cita(t) { return '<br><i>' + t + '</i>'; }
  function pesos(v) { return '$' + Math.round(v).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

  /* ---------- 9.1 Ciencias sociales ---------- */
  function qArea(r) {
    var q = clasifica(r, {
      'Ciencias sociales': ['Analizan estructuras colectivas, relaciones de poder y procesos históricos para explicar las causas de los fenómenos sociales',
        'Estudian fenómenos humanos en contextos específicos e interpretan los significados sociales'],
      'Humanidades': ['Se centran en la expresión subjetiva, simbólica y reflexiva del ser humano, como la literatura, el arte o la filosofía',
        'Privilegian la introspección y el análisis ético o estético'],
      'Ciencias experimentales': ['Estudian fenómenos naturales con el método hipotético-deductivo y buscan leyes universales y reproducibles',
        'Comprueban sus hipótesis con experimentos de laboratorio que se pueden repetir'] },
      function (ej) { return '¿A qué campo del conocimiento corresponde la descripción?' + cita(ej + '.'); }, ['Ciencias formales (matemáticas y lógica)']);
    q.ex = 'Ciencias sociales: lo colectivo, el poder y la historia. Humanidades: lo subjetivo, simbólico, ético y estético. Ciencias experimentales: fenómenos naturales y leyes reproducibles.';
    return q;
  }
  var DISCIPLINAS = {
    'Economía': 'La producción, distribución y consumo de bienes y servicios',
    'Ciencia política': 'El poder, el gobierno, el Estado y la participación ciudadana',
    'Sociología': 'Las relaciones sociales, las instituciones y los grupos que forman la estructura social',
    'Derecho': 'El sistema de normas que regula la convivencia: leyes, derechos, obligaciones y justicia',
    'Antropología': 'Las culturas humanas: creencias, costumbres, lenguas, parentesco y formas de vida',
    'Comunicación': 'La transmisión de mensajes y significados en los distintos medios',
    'Psicología social': 'Cómo las personas piensan, sienten y actúan en función de los grupos',
    'Geografía humana': 'La relación entre la sociedad y el espacio: urbanización, migración y distribución de la población',
    'Historia': 'Los procesos sociales en el tiempo para comprender el presente'
  };
  function qDisciplina(r) {
    var k = r.elige(Object.keys(DISCIPLINAS));
    var otras = Object.keys(DISCIPLINAS).filter(function (x) { return x !== k; });
    if (r.bool()) {
      return { p: '¿Qué disciplina de las ciencias sociales tiene como objeto de estudio lo siguiente?' + cita(DISCIPLINAS[k] + '.'), b: k, m: otras };
    }
    return { p: '¿Cuál es el objeto de estudio ' + (k === 'Derecho' ? 'del ' : 'de la ') + k.toLowerCase() + '?', b: DISCIPLINAS[k],
      m: otras.map(function (x) { return DISCIPLINAS[x]; }) };
  }
  var CASOS_DISCIPLINA = [
    ['Un equipo quiere saber por qué miles de familias se mudan del campo a las ciudades y cómo cambia la distribución de la población', 'Geografía humana'],
    ['Una investigadora estudia cómo cambia la opinión de un adolescente cuando su grupo de amigos piensa distinto', 'Psicología social'],
    ['Un estudio analiza las leyes que regulan la herencia de bienes y cómo se aplican en los juicios', 'Derecho'],
    ['Un estudio compara las costumbres, la lengua y las formas de parentesco de dos pueblos de la sierra', 'Antropología'],
    ['Un análisis revisa cómo los noticieros y las redes sociales presentaron una noticia y qué discursos usaron', 'Comunicación'],
    ['Un estudio calcula cómo afecta el alza de la gasolina al precio de los alimentos', 'Economía'],
    ['Una investigación compara la participación ciudadana y los resultados de los partidos políticos en las últimas tres elecciones', 'Ciencia política'],
    ['Un estudio reconstruye, con documentos de archivo, cómo vivían los obreros textiles a principios del siglo XX', 'Historia'],
    ['Un estudio analiza cómo influyen instituciones como la familia y la escuela en la estructura social de una ciudad', 'Sociología']
  ];
  function qCasoDisciplina(r) {
    var c = r.elige(CASOS_DISCIPLINA);
    return { p: '¿Qué disciplina de las ciencias sociales es la más adecuada para el siguiente estudio?' + cita(c[0] + '.'), b: c[1],
      m: Object.keys(DISCIPLINAS).filter(function (x) { return x !== c[1]; }) };
  }
  var MODELOS = {
    'Positivismo': ['Lo propuso Auguste Comte', 'Estudiar los hechos sociales con observación, datos empíricos e inducción para descubrir leyes sociales', 'el progreso y la objetividad (neutralidad del investigador)'],
    'Materialismo histórico': ['Lo desarrollaron Karl Marx y Friedrich Engels', 'El motor del cambio social está en las relaciones de producción y en la lucha de clases', 'la dialéctica, la conciencia de clase y los modos de producción'],
    'Estructural-funcionalismo': ['Lo encabezó Émile Durkheim y lo desarrolló Talcott Parsons', 'La sociedad es un sistema de partes que cumplen funciones para mantener el equilibrio', 'la función social, el equilibrio, la adaptación y la anomia']
  };
  function qModelo(r) {
    var k = r.elige(Object.keys(MODELOS)), dato = r.entero(0, 2);
    var txt = [MODELOS[k][0], MODELOS[k][1], 'Algunos de sus conceptos clave son ' + MODELOS[k][2]][dato];
    return { p: '¿A qué modelo teórico de las ciencias sociales corresponde lo siguiente?' + cita(txt + '.'), b: k,
      m: Object.keys(MODELOS).filter(function (x) { return x !== k; }).concat(['Existencialismo']),
      ex: 'Positivismo (Comte): datos, observación y leyes sociales. Materialismo histórico (Marx y Engels): economía y lucha de clases. Estructural-funcionalismo (Durkheim, Parsons): funciones, equilibrio y anomia.' };
  }

  /* ---------- 9.2 Formacion civica ---------- */
  function qDemocracia(r) {
    var q = clasifica(r, {
      'Representativa': ['La ciudadanía elige con su voto al presidente, a los senadores y a los diputados', 'Los vecinos votan por un presidente municipal que tomará las decisiones del municipio'],
      'Directa': ['La población decide un asunto sin intermediarios mediante un referéndum', 'Se hace un plebiscito para que la ciudadanía apruebe o rechace una obra pública'],
      'Participativa': ['El gobierno abre presupuestos participativos para que los vecinos decidan en qué gastar una parte del dinero', 'Se crean mecanismos de transparencia y consultas para que la ciudadanía vigile al gobierno'] },
      function (ej) { return '¿Qué modalidad de la democracia se ejemplifica?' + cita(ej + '.'); }, ['Monárquica']);
    q.ex = 'Representativa: elegimos a quienes deciden. Directa: el pueblo decide sin intermediarios (plebiscito, referéndum). Participativa: más intervención ciudadana (consultas, transparencia, presupuestos participativos).';
    return q;
  }
  function qArticulo(r) {
    var A = { 'Artículo 39': 'la soberanía nacional reside esencial y originariamente en el pueblo', 'Artículo 40': 'México es una república representativa, democrática, laica y federal',
      'Artículo 41': 'se organizan los partidos políticos y los procesos electorales' };
    var k = r.elige(Object.keys(A));
    return { p: '¿Qué artículo de la Constitución establece que ' + A[k] + '?', b: k, m: Object.keys(A).filter(function (x) { return x !== k; }).concat(['Artículo 27', 'Artículo 123']),
      ex: 'Art. 39: la soberanía reside en el pueblo. Art. 40: república representativa, democrática, laica y federal. Art. 41: partidos y elecciones.' };
  }
  function qPoder(r) {
    var q = clasifica(r, {
      'Poder Legislativo': ['Crea las leyes', 'Está formado por la Cámara de Diputados y la Cámara de Senadores'],
      'Poder Ejecutivo': ['Aplica las leyes y gobierna', 'Lo encabeza la persona titular de la presidencia de la república'],
      'Poder Judicial': ['Interpreta las leyes y garantiza la justicia', 'Lo integran los tribunales y la Suprema Corte de Justicia'] },
      function (ej) { return '¿A qué poder de la Unión corresponde la característica?' + cita(ej + '.'); }, ['Poder Electoral']);
    q.ex = 'Legislativo: hace las leyes (diputados y senadores). Ejecutivo: las aplica (presidencia). Judicial: las interpreta y juzga (tribunales y Suprema Corte).';
    return q;
  }
  function qInstitucion(r) {
    var q = clasifica(r, {
      'Institución política': ['el INE', 'un partido político', 'el gobierno municipal'],
      'Institución jurídica': ['la Comisión Nacional de los Derechos Humanos', 'la Fiscalía', 'el Poder Judicial'] },
      function (ej) { return '¿Qué tipo de institución social es ' + ej + '?'; }, ['Institución religiosa', 'Institución económica']);
    q.ex = 'Políticas: canalizan la participación ciudadana y la gobernabilidad (gobierno, partidos, INE). Jurídicas: establecen y hacen cumplir las normas legales (Congreso, Poder Judicial, Fiscalía, CNDH).';
    return q;
  }
  function qSocializacion(r) {
    var q = clasifica(r, {
      'Socialización primaria': ['Un niño aprende a hablar y a saludar imitando a sus padres', 'Una niña aprende en casa a compartir sus juguetes con sus hermanos'],
      'Socialización secundaria': ['Un joven aprende en su primer empleo las reglas de la empresa', 'Una estudiante aprende en la escuela a respetar los turnos para hablar',
        'Un adolescente adopta las costumbres de su equipo de futbol'] },
      function (ej) { return '¿Qué tipo de socialización se presenta?' + cita(ej + '.'); }, ['Socialización terciaria', 'Anomia']);
    q.ex = 'Primaria: en la familia, durante la infancia. Secundaria: después, en la escuela, el trabajo y los grupos de amigos.';
    return q;
  }
  var VALORES = {
    'Libertad': ['Cada persona puede expresar su opinión sin que nadie la obligue a callar', 'Actuar sin coacción, decidiendo por uno mismo'],
    'Justicia': ['Dar a cada quien lo que le corresponde', 'Un juez resuelve un conflicto de forma imparcial y conforme a la ley'],
    'Solidaridad': ['Los vecinos juntan víveres para las familias que perdieron su casa en una inundación', 'Un grupo apoya a un compañero enfermo para que no se atrase en sus estudios'],
    'Tolerancia': ['Aceptar y convivir con personas que tienen creencias distintas a las nuestras', 'Escuchar con respeto una opinión diferente sin descalificarla'],
    'Responsabilidad': ['Cumplir con los deberes que nos corresponden', 'Una persona paga a tiempo sus impuestos y cuida los bienes públicos'],
    'Igualdad': ['Todas las personas reciben el mismo trato ante la ley', 'Hombres y mujeres tienen los mismos derechos para votar y ser votados']
  };
  function qValor(r) {
    var q = clasifica(r, VALORES, function (ej) { return '¿Qué valor cívico se ejemplifica?' + cita(ej + '.'); });
    q.ex = 'Libertad: actuar sin coacción. Justicia: dar a cada quien lo que le corresponde. Solidaridad, tolerancia y respeto: convivir en la diversidad. Responsabilidad: cumplir deberes. Igualdad y equidad: justicia social.';
    return q;
  }

  /* ---------- 9.4 a 9.8 Historia de Mexico ---------- */
  function qPeriodo(r) {
    var q = clasifica(r, {
      'Preclásico': ['el desarrollo de la cultura olmeca'],
      'Clásico': ['el esplendor de Teotihuacan', 'el auge de ciudades mayas como Palenque y Tikal'],
      'Posclásico': ['el dominio de los toltecas desde Tula', 'la fundación de Tenochtitlan por los mexicas'] },
      function (ej) { return '¿En qué periodo de la historia de Mesoamérica ocurrió ' + ej + '?'; }, ['Virreinal']);
    q.ex = 'Preclásico: olmecas. Clásico: Teotihuacan y las grandes ciudades mayas. Posclásico: toltecas y mexicas, hasta la Conquista.';
    return q;
  }
  var CULTURAS = {
    'Olmeca': ['Es considerada la cultura madre de Mesoamérica', 'Esculpió enormes cabezas colosales de piedra'],
    'Maya': ['Destacó por sus conocimientos astronómicos y su escritura', 'Usó el cero y un calendario muy preciso'],
    'Tolteca': ['Tuvo gran influencia en el altiplano central', 'Su capital fue Tula, con los famosos atlantes'],
    'Mixteca': ['Alcanzó un alto grado de desarrollo artístico, como la orfebrería y los códices'],
    'Mexica': ['Dominó la región central hacia el siglo XV desde Tenochtitlan', 'Formó la Triple Alianza y cobraba tributo a los pueblos sometidos'],
    'Zapoteca': ['Construyó la ciudad de Monte Albán, en los valles centrales de Oaxaca'],
    'Teotihuacana': ['En su gran ciudad destacan las pirámides del Sol y de la Luna y la Calzada de los Muertos']
  };
  function qCultura(r) {
    var q = clasifica(r, CULTURAS, function (ej) { return '¿A qué cultura mesoamericana corresponde la característica?' + cita(ej + '.'); }, ['Inca']);
    q.ex = 'Olmecas: cultura madre. Mayas: astronomía y escritura. Toltecas: altiplano (Tula). Mixtecos: arte. Zapotecos: Monte Albán. Teotihuacanos: pirámides del Sol y de la Luna. Mexicas: dominaron el centro en el siglo XV.';
    return q;
  }
  var ETAPAS_INDEP = {
    'Primera etapa (iniciación, 1810-1811)': ['Miguel Hidalgo encabezó el levantamiento del pueblo y la toma de Guanajuato y Valladolid', 'Se dio el Grito de Dolores'],
    'Segunda etapa (organización, 1811-1815)': ['José María Morelos articuló un proyecto político liberal y republicano con los Sentimientos de la Nación', 'Se instaló el Congreso de Chilpancingo'],
    'Tercera etapa (resistencia, 1815-1820)': ['Hubo una guerra de guerrillas en la que destacó Vicente Guerrero', 'Francisco Javier Mina llegó desde Europa para apoyar a los insurgentes'],
    'Cuarta etapa (consumación, 1821)': ['Iturbide y Guerrero se aliaron con el Plan de Iguala y el Ejército Trigarante entró a la Ciudad de México', 'Se firmaron los Tratados de Córdoba']
  };
  function qEtapaIndependencia(r) {
    var q = clasifica(r, ETAPAS_INDEP, function (ej) { return '¿A qué etapa de la Independencia corresponde el hecho?' + cita(ej + '.'); });
    q.ex = 'Hidalgo (1810-1811), Morelos (1811-1815), resistencia de Guerrero (1815-1820) y consumación con el Plan de Iguala (1821).';
    return q;
  }
  function qConflicto(r) {
    var q = clasifica(r, {
      'Expedición de Isidro Barradas (1829)': ['Un militar español llegó desde Cuba con un ejército para intentar reconquistar México y fue derrotado por Santa Anna'],
      'Independencia de Texas (1836)': ['En la batalla de San Jacinto, las fuerzas texanas de Sam Houston derrotaron al ejército mexicano y capturaron a Santa Anna'],
      'Guerra de los Pasteles (1838)': ['Francia intervino por las quejas de sus comerciantes y México pagó 600 000 pesos de indemnización'],
      'Intervención de Estados Unidos (1846-1848)': ['Tras la anexión de Texas, el ejército estadounidense ocupó la Ciudad de México y México perdió más de la mitad de su territorio'],
      'Segunda Intervención Francesa (1862-1867)': ['Napoleón III apoyó a Maximiliano de Habsburgo como emperador de México'] },
      function (ej) { return '¿A qué conflicto corresponde la descripción?' + cita(ej + '.'); });
    q.ex = 'Barradas (1829, intento de reconquista española), Texas (1836), Guerra de los Pasteles (1838), guerra con Estados Unidos (1846-1848) y Segunda Intervención Francesa (1862-1867).';
    return q;
  }
  function qProyectoNacion(r) {
    var q = clasifica(r, {
      'Federalismo': ['Promovía la autonomía de los estados', 'Cada estado tendría su propio gobierno y sus leyes, unidos en una federación'],
      'Centralismo': ['Concentraba el poder en el gobierno central', 'Los estados se convertían en departamentos que dependían de la capital'],
      'Imperio': ['Agustín de Iturbide se proclamó emperador en 1822', 'Un monarca gobernaría el país con una corona'] },
      function (ej) { return '¿A qué proyecto de nación corresponde lo siguiente?' + cita(ej + '.'); }, ['Socialismo']);
    q.ex = 'Tras la Independencia hubo un Imperio (Iturbide, 1822-1823) y luego el país osciló entre el federalismo (autonomía de los estados) y el centralismo (poder concentrado), con Santa Anna como caudillo.';
    return q;
  }
  function qLiberales(r) {
    var q = clasifica(r, {
      'Liberales': ['Defendían una república federal y laica', 'Promulgaron las Leyes de Reforma', 'Los encabezó Benito Juárez'],
      'Conservadores': ['Defendían el orden tradicional, la Iglesia y el centralismo', 'Proclamaron el Plan de Tacubaya contra la Constitución de 1857', 'Apoyaron la llegada de Maximiliano de Habsburgo'] },
      function (ej) { return 'En la Guerra de Reforma (1858-1861), ¿qué grupo cumple con la característica?' + cita(ej + '.'); }, ['Insurgentes', 'Constitucionalistas']);
    q.ex = 'Liberales: república, federalismo, Estado laico (Juárez, Leyes de Reforma). Conservadores: orden tradicional, Iglesia y centralismo (Plan de Tacubaya, apoyo al Imperio).';
    return q;
  }
  function qPorfiriato(r) {
    var q = clasifica(r, {
      'Político': ['Díaz neutralizó a sus opositores y se apoyó en una red de jefes políticos', 'Díaz modificó la Constitución para reelegirse'],
      'Económico': ['Llegó inversión extranjera y se tendieron miles de kilómetros de vías de ferrocarril', 'Crecieron la minería, el petróleo y la producción de henequén'],
      'Social': ['Una élite urbana modernizada convivía con una mayoría rural empobrecida', 'Los peones quedaban atados a las haciendas por sus deudas'],
      'Cultural': ['Se construyeron edificios de estilo afrancesado para dar una imagen de nación moderna', 'Se promovió la cultura europea sin integrar a las culturas indígenas'] },
      function (ej) { return '¿A qué ámbito del Porfiriato corresponde el hecho?' + cita(ej + '.'); });
    q.ex = 'Político: autoritarismo, reelección y control. Económico: inversión extranjera, ferrocarriles, minería y petróleo. Social: desigualdad y peonaje por deudas. Cultural: modelo afrancesado.';
    return q;
  }
  function qRevolucion(r) {
    var q = clasifica(r, {
      'Francisco I. Madero': ['Convocó a desconocer a Díaz con el Plan de San Luis (1910)'],
      'Victoriano Huerta': ['Tomó el poder con un golpe de Estado tras la Decena Trágica (1913)'],
      'Emiliano Zapata': ['Encabezó en el sur una propuesta agraria radical con el Plan de Ayala'],
      'Francisco Villa': ['Fue un líder militar del norte con amplio respaldo popular'],
      'Venustiano Carranza': ['Encabezó el constitucionalismo y promulgó la Constitución de 1917'] },
      function (ej) { return '¿Qué personaje de la Revolución Mexicana corresponde a la descripción?' + cita(ej + '.'); });
    q.ex = 'Madero (Plan de San Luis), Huerta (Decena Trágica), Zapata (Plan de Ayala), Villa (División del Norte) y Carranza (Constitución de 1917).';
    return q;
  }
  var PLANES = {
    'Plan de Tuxtepec': ['Porfirio Díaz', 'desconocer la reelección de Lerdo de Tejada'],
    'Plan de San Luis': ['Francisco I. Madero', 'desconocer a Porfirio Díaz y llamar a las armas'],
    'Plan de Ayala': ['Emiliano Zapata', 'devolver las tierras a los pueblos campesinos'],
    'Plan de Guadalupe': ['Venustiano Carranza', 'desconocer al gobierno de Victoriano Huerta']
  };
  function qPlan(r) {
    var k = r.elige(Object.keys(PLANES)), d = PLANES[k], otros = Object.keys(PLANES).filter(function (x) { return x !== k; });
    var ex = 'Tuxtepec (Díaz, 1876), San Luis (Madero, 1910), Ayala (Zapata, 1911) y Guadalupe (Carranza, 1913).';
    if (r.bool()) return { p: '¿Qué plan proclamó ' + d[0] + ' para ' + d[1] + '?', b: k, m: otros.concat(['Plan de Iguala']), ex: ex };
    return { p: '¿Quién proclamó el ' + k + ', que buscaba ' + d[1] + '?', b: d[0], m: otros.map(function (x) { return PLANES[x][0]; }), ex: ex };
  }
  function qArticulo1917(r) {
    var A = { 'Artículo 27': 'la reforma agraria y la propiedad de la tierra y de los recursos naturales', 'Artículo 123': 'los derechos laborales de los trabajadores',
      'Artículo 3': 'la educación' };
    var k = r.elige(Object.keys(A));
    return { p: 'En la Constitución de 1917, ¿qué artículo se refiere a ' + A[k] + '?', b: k, m: Object.keys(A).filter(function (x) { return x !== k; }).concat(['Artículo 39', 'Artículo 130']),
      ex: 'Art. 3: educación. Art. 27: reforma agraria y recursos naturales. Art. 123: derechos laborales.' };
  }
  function qPosrevolucion(r) {
    var q = clasifica(r, {
      'Álvaro Obregón (1920-1924)': ['Firmó el Tratado de Bucareli con Estados Unidos', 'Impulsó la educación rural con José Vasconcelos'],
      'Plutarco Elías Calles (1924-1928)': ['Creó el Banco de México (1925)', 'Enfrentó la Guerra Cristera (1926-1929)'],
      'El Maximato (1928-1934)': ['Calles, el "Jefe Máximo", controló a tres presidentes consecutivos', 'Se fundó el Partido Nacional Revolucionario (PNR) en 1929'],
      'Lázaro Cárdenas (1934-1940)': ['Decretó la expropiación petrolera en 1938', 'Repartió ejidos e impulsó la educación socialista'] },
      function (ej) { return '¿A qué gobierno o periodo corresponde el hecho?' + cita(ej + '.'); });
    q.ex = 'Obregón: pacificación, Bucareli y Vasconcelos. Calles: Banco de México y Guerra Cristera. Maximato: PNR. Cárdenas: expropiación petrolera y reparto agrario.';
    return q;
  }
  function qModeloEconomico(r) {
    var q = clasifica(r, {
      'Sustitución de importaciones (1940-1958)': ['Se buscó industrializar al país reduciendo las importaciones y protegiendo la industria nacional'],
      'Desarrollo estabilizador (1958-1970)': ['Hubo crecimiento económico sostenido con baja inflación, pero sin mejoras sociales significativas'],
      'Desarrollo compartido (1970-1982)': ['Se buscó redistribuir el ingreso con gasto público expansivo, pero terminó en endeudamiento y crisis'],
      'Neoliberalismo (desde 1982)': ['Se abrió el comercio exterior, se redujo el Estado y se privatizaron empresas públicas'] },
      function (ej) { return '¿Qué modelo económico se describe?' + cita(ej + '.'); });
    q.ex = 'Sustitución de importaciones (Ávila Camacho, Alemán), desarrollo estabilizador (López Mateos, Díaz Ordaz), desarrollo compartido (Echeverría, López Portillo) y neoliberalismo (desde De la Madrid).';
    return q;
  }
  function qSexenio1(r) {
    var q = clasifica(r, {
      'Manuel Ávila Camacho': ['Se fundó el IMSS (1943)', 'México declaró la guerra a las potencias del Eje (1942)'],
      'Miguel Alemán Valdés': ['Se construyó la Ciudad Universitaria y se impulsó la industrialización con inversión privada'],
      'Adolfo Ruiz Cortines': ['Las mujeres obtuvieron el derecho a votar en elecciones federales (1953)'],
      'Adolfo López Mateos': ['Se nacionalizó la industria eléctrica (1960)', 'Se crearon los libros de texto gratuitos'],
      'Gustavo Díaz Ordaz': ['Ocurrió la matanza de Tlatelolco (1968)', 'Se firmó el Tratado de Tlatelolco para prohibir las armas nucleares en América Latina (1967)'],
      'Luis Echeverría Álvarez': ['Ocurrió el "Halconazo" contra estudiantes (1971)'],
      'José López Portillo': ['Se nacionalizó la banca (1982)', 'Hubo un auge petrolero que terminó en crisis al caer los precios del petróleo'] },
      function (ej) { return '¿En qué sexenio ocurrió lo siguiente?' + cita(ej + '.'); });
    q.ex = 'Ávila Camacho (1940-1946), Alemán (1946-1952), Ruiz Cortines (1952-1958), López Mateos (1958-1964), Díaz Ordaz (1964-1970), Echeverría (1970-1976) y López Portillo (1976-1982).';
    return q;
  }
  function qSexenio2(r) {
    var q = clasifica(r, {
      'Miguel de la Madrid': ['México ingresó al GATT (1986) y comenzó la apertura comercial', 'Se recortó el gasto público siguiendo las recomendaciones del FMI'],
      'Carlos Salinas de Gortari': ['Se firmó el TLCAN con Estados Unidos y Canadá', 'Se privatizaron más de mil empresas estatales, incluida la banca'],
      'Ernesto Zedillo': ['Ocurrió el "error de diciembre" de 1994', 'Se rescató a los bancos con dinero público mediante el Fobaproa'],
      'Vicente Fox': ['Llegó a la presidencia un candidato del PAN: inició la alternancia política (2000)'],
      'Felipe Calderón': ['Se emprendió una política de seguridad centrada en el combate al narcotráfico', 'Se extinguió la compañía Luz y Fuerza del Centro (2009)'],
      'Enrique Peña Nieto': ['Se aprobó la reforma energética que abrió el petróleo y el gas a la inversión privada', 'Desaparecieron 43 estudiantes de la normal rural de Ayotzinapa (2014)'] },
      function (ej) { return '¿En qué sexenio ocurrió lo siguiente?' + cita(ej + '.'); });
    q.ex = 'De la Madrid (1982-1988), Salinas (1988-1994), Zedillo (1994-2000), Fox (2000-2006), Calderón (2006-2012) y Peña Nieto (2012-2018).';
    return q;
  }
  var PUEBLOS = { 'rarámuri (tarahumara)': 'Chihuahua', 'yaqui': 'Sonora', 'wixárika (huichol)': 'Jalisco y Nayarit', 'purépecha': 'Michoacán',
    'tzotzil': 'Chiapas', 'zapoteco': 'Oaxaca', 'maya peninsular': 'Yucatán' };
  function qPueblo(r) {
    var k = r.elige(Object.keys(PUEBLOS)), otros = Object.keys(PUEBLOS).filter(function (x) { return x !== k; });
    if (r.bool()) return { p: '¿Dónde vive principalmente el pueblo ' + k + '?', b: PUEBLOS[k], m: otros.map(function (x) { return PUEBLOS[x]; }) };
    function may(t) { return t.charAt(0).toUpperCase() + t.slice(1); }
    return { p: '¿Qué pueblo originario vive principalmente en ' + PUEBLOS[k] + '?', b: may(k), m: otros.map(may) };
  }

  /* ---------- 9.9 a 9.11 Mexico actual ---------- */
  function qDemografia(r) {
    var q = clasifica(r, {
      'Natalidad': ['En un año nacieron 18 niños por cada mil habitantes'],
      'Mortalidad': ['En un año murieron 6 personas por cada mil habitantes'],
      'Migración': ['Miles de personas dejaron su estado para vivir en otro con más empleo'],
      'Esperanza de vida': ['Una persona que nace hoy vivirá, en promedio, 75 años'],
      'Crecimiento urbano': ['La mancha urbana de una ciudad se extendió sobre los terrenos de cultivo de su alrededor'] },
      function (ej) { return '¿Qué categoría demográfica describe el dato?' + cita(ej + '.'); });
    q.ex = 'El desarrollo demográfico se estudia con la natalidad, la mortalidad, la migración, la esperanza de vida y el crecimiento urbano.';
    return q;
  }
  function qSalud(r) {
    var Q = [['¿Qué institución de salud pública atiende principalmente a los trabajadores asalariados y a sus familias?', 'IMSS'],
      ['¿Qué institución de salud pública atiende a los trabajadores del Estado (empleados públicos)?', 'ISSSTE'],
      ['¿Qué institución sustituyó en 2020 al Seguro Popular para dar atención médica gratuita a quienes no tenían seguridad social?', 'INSABI']];
    var q = r.elige(Q);
    return { p: q[0], b: q[1], m: ['IMSS', 'ISSSTE', 'INSABI', 'INEGI', 'CONEVAL'].filter(function (x) { return x !== q[1]; }),
      ex: 'IMSS: trabajadores asalariados. ISSSTE: empleados públicos. El Seguro Popular fue sustituido en 2020 por el INSABI para atender a quienes no tenían seguridad social.' };
  }
  function qBrecha(r) {
    var mu = r.entero(80, 100) / 2, ho = r.entero(140, 156) / 2, b = ho - mu;
    return { p: 'En una encuesta, ' + F.n(mu) + '% de las mujeres y ' + F.n(ho) + '% de los hombres participan en la actividad económica. ¿De cuántos puntos porcentuales es la brecha de género?' +
        P.considere('brecha = porcentaje mayor &minus; porcentaje menor.'),
      b: b, m: [ho + mu, 100 - ho, 100 - mu, b / 2, b * 2], fmt: function (v) { return F.n(v, 1) + ' puntos'; }, op: { dec: 1 },
      ex: 'La brecha es la diferencia entre los dos porcentajes: ' + F.n(ho) + ' &minus; ' + F.n(mu) + ' = ' + F.n(b, 1) + ' puntos porcentuales.' };
  }
  function qGini(r) {
    var a = r.entero(25, 55), b;
    do { b = r.entero(25, 55); } while (Math.abs(a - b) < 8);
    var mas = a > b ? 'A' : 'B', menos = a > b ? 'B' : 'A';
    return { p: 'El coeficiente de Gini del país A es 0.' + a + ' y el del país B es 0.' + b + '. ¿Qué afirmación es correcta?',
      b: 'El país ' + mas + ' distribuye su ingreso de forma más desigual',
      m: ['El país ' + menos + ' distribuye su ingreso de forma más desigual', 'Los dos países tienen la misma desigualdad',
        'El país ' + mas + ' tiene una distribución del ingreso casi perfecta', 'El país ' + menos + ' tiene más pobres porque su Gini es menor'],
      ex: 'El Gini va de 0 (igualdad total) a 1 (desigualdad extrema): mientras más alto, más desigual es la distribución del ingreso.' };
  }
  function qRiqueza(r) {
    var casa = r.entero(6, 15) * 100000, auto = r.entero(5, 30) * 10000, ahorro = r.entero(1, 20) * 10000, deuda = r.entero(5, 40) * 10000;
    var b = casa + auto + ahorro - deuda;
    return { p: 'Una familia tiene una casa que vale ' + pesos(casa) + ', un auto de ' + pesos(auto) + ' y ahorros por ' + pesos(ahorro) + '; debe ' + pesos(deuda) + ' de un crédito. ¿Cuál es su riqueza (patrimonio neto)?' +
        P.considere('riqueza = activos (lo que se posee) &minus; pasivos (lo que se debe).'),
      b: b, m: [casa + auto + ahorro, casa + auto + ahorro + deuda, casa - deuda, ahorro - deuda + auto], fmt: pesos,
      ex: 'Riqueza = activos (lo que se posee) &minus; pasivos (lo que se debe) = ' + pesos(casa + auto + ahorro) + ' &minus; ' + pesos(deuda) + ' = ' + pesos(b) + '. El ingreso, en cambio, es un flujo de dinero, como un sueldo.' };
  }
  function qRegion(r) {
    var R = { 'Noroeste (Sonora y Baja California)': 'La industria maquiladora y las exportaciones a Estados Unidos',
      'Noreste (Nuevo León y Coahuila)': 'La industria automotriz, metalmecánica y energética, con Monterrey como motor',
      'Occidente (Jalisco)': 'La electrónica, la tecnología y la agricultura de agave y café',
      'Oriente (Veracruz)': 'El petróleo y el comercio exterior por su puerto marítimo',
      'Centro norte (San Luis Potosí y Zacatecas)': 'La producción de minerales y metales',
      'Sureste (Chiapas, Tabasco y Yucatán)': 'Una economía agrícola, con petróleo en Tabasco, turismo en la Riviera Maya y la pobreza más pronunciada' };
    var k = r.elige(Object.keys(R));
    if (r.bool()) return { p: '¿Qué actividad económica caracteriza a la región ' + k + '?', b: R[k], m: Object.keys(R).filter(function (x) { return x !== k; }).map(function (x) { return R[x]; }) };
    return { p: '¿Qué región del país se describe?' + cita(R[k] + '.'), b: k, m: Object.keys(R).filter(function (x) { return x !== k; }) };
  }
  function qSectorPIB(r) {
    var a = r.entero(3, 20), s = r.entero(20, 45), t = 100 - a - s;
    return { p: 'En una región, el sector primario aporta ' + a + '% del PIB y el secundario ' + s + '%. ¿Cuánto aporta el sector terciario?' + P.considere('que los tres sectores suman el 100% del PIB.'),
      b: t, m: [a + s, 100 - a, 100 - s, t - 10, Math.abs(s - a)], fmt: function (v) { return v + '%'; }, op: { rango: [1, 99] },
      ex: 'Los tres sectores suman 100%: terciario = 100 &minus; ' + a + ' &minus; ' + s + ' = ' + t + '%.' };
  }
  function qComercio(r) {
    var q = clasifica(r, {
      'T-MEC': ['Reemplazó al TLCAN en 2020 y da acceso preferencial a los mercados de Estados Unidos y Canadá'],
      'Alianza del Pacífico': ['Bloque de México, Chile, Perú y Colombia para el comercio, la educación y la innovación'],
      'CPTPP (Acuerdo Transpacífico)': ['Bloque comercial con países de Asia-Pacífico, como Japón, Australia y Malasia'],
      'Mercosur': ['Bloque de países de América del Sur del que México NO forma parte'] },
      function (ej) { return '¿Qué acuerdo o bloque económico se describe?' + cita(ej + '.'); }, ['Unión Europea']);
    q.ex = 'T-MEC (México, Estados Unidos y Canadá), Alianza del Pacífico (México, Chile, Perú y Colombia), CPTPP (Asia-Pacífico) y Mercosur (Sudamérica, sin México).';
    return q;
  }
  function qPerCapita(r) {
    var hab = r.elige([10, 20, 25, 40, 50, 80]), pc = r.entero(4, 30) * 500, pib = pc * hab / 1000;
    return { p: 'Un país tiene un PIB de ' + F.n(pib) + ' mil millones de dólares y ' + hab + ' millones de habitantes. ¿Cuál es su PIB per cápita?' + P.considere('PIB per cápita = ' + F.frac('PIB', 'habitantes') + '.'),
      b: pc, m: [pc * 10, pc / 10, pc * 2, pc / 2, pib], fmt: function (v) { return pesos(v) + ' dólares'; },
      ex: 'PIB per cápita = PIB &divide; habitantes = ' + F.n(pib) + ' mil millones &divide; ' + hab + ' millones = ' + pesos(pc) + ' dólares por persona.' };
  }

  P.temaBanco({
    id: 'prepa-sociedad',
    grupo: 'Ciencias sociales',
    nombre: 'Ciencias sociales, Estado y sociedad',
    descripcion: 'Objeto de las ciencias sociales y sus disciplinas, formas de gobierno, democracia, funciones sociales, valores civicos y conceptos sociologicos. Reactivos 1 a 10 del area.',
    etiquetas: ['ciencias sociales', 'democracia', 'socializacion', 'anomia', 'valores civicos'],
    niveles: {
      facil: ['objeto', 'democracia'],
      medio: ['disciplinas', 'disciplinas2', 'formasGobierno', 'familia', 'socializacion'],
      dificil: ['humanidades', 'valoresCivicos', 'anomia']
    },
    items: [
      { s: 'objeto', n: 'Objeto de las ciencias sociales', v: [
        { p: '¿Cuál es el principal objeto de estudio de las ciencias sociales?', b: 'El comportamiento humano, tanto individual como colectivo',
          m: ['La evolución biológica de la especie humana', 'El pensamiento simbólico y su expresión artística', 'Los fenómenos físicos de la naturaleza'] },
        { p: 'Las ciencias sociales estudian al ser humano en su dimensión colectiva. Esto significa que lo estudian:', b: 'como ser social: sus relaciones, estructuras y procesos de la vida en sociedad',
          m: ['como organismo vivo que evoluciona', 'como cuerpo sujeto a las leyes de la física', 'como individuo aislado, sin relación con los demás', 'a partir de explicaciones sobrenaturales'] },
        { p: 'Las ciencias sociales surgieron en los siglos XVII y XVIII por la necesidad de explicar los problemas sociales mediante:', b: 'la razón y el método científico',
          m: ['explicaciones teológicas o sobrenaturales', 'la tradición y las costumbres', 'la intuición de los gobernantes', 'los mitos de cada pueblo'] },
        { lista: 'Del siguiente listado, identifique los fenómenos que estudian las ciencias sociales.',
          si: ['La migración del campo a la ciudad', 'Las causas de la desigualdad', 'La participación ciudadana en las elecciones', 'Las relaciones de poder en una comunidad'],
          no: ['La fotosíntesis de las plantas', 'La caída libre de los cuerpos', 'La estructura del átomo', 'La formación de los volcanes'] },
        { p: 'Las ciencias sociales combinan enfoques cuantitativos y cualitativos. ¿Cuál de las siguientes es una técnica cualitativa?', b: 'La observación participante',
          m: ['Una encuesta con análisis estadístico', 'Un censo de población', 'Una gráfica del PIB por año'] },
        { p: 'Una investigadora aplica una encuesta a 2 000 hogares y analiza los resultados con estadísticas. ¿Qué enfoque metodológico usa?', b: 'Cuantitativo',
          m: ['Cualitativo', 'Teológico', 'Metafísico'] },
        { p: 'Además de describir la realidad social, las ciencias sociales buscan:', b: 'comprenderla, explicarla críticamente y proponer transformaciones',
          m: ['establecer verdades absolutas que no cambian', 'justificar las costumbres sin analizarlas', 'estudiar únicamente los fenómenos naturales'] }
      ] },
      { s: 'humanidades', n: 'Ciencias sociales y humanidades', v: [
        { p: 'A diferencia de las humanidades, las ciencias sociales:', b: 'suelen recurrir a una comprobación empírica para validar sus hipótesis',
          m: ['rechazan la falsación como parte del método', 'no generan proposiciones sobre fenómenos sociales', 'se basan sólo en interpretaciones subjetivas de la experiencia'] },
        qArea, qArea, qArea,
        { p: 'A diferencia de las ciencias experimentales, las ciencias sociales:', b: 'analizan fenómenos humanos en contextos específicos y valoran la interpretación de los significados sociales',
          m: ['buscan leyes universales que se reproduzcan en un laboratorio', 'estudian únicamente fenómenos naturales', 'no usan ningún método sistemático'] },
        { rel: 'Relacione cada campo del conocimiento con lo que estudia.', cols: ['Campo', 'Estudia'],
          pares: [['Ciencias sociales', 'Las estructuras colectivas, las relaciones de poder y los procesos históricos'], ['Humanidades', 'La expresión subjetiva, simbólica y reflexiva del ser humano'],
            ['Ciencias experimentales', 'Los fenómenos naturales, con leyes universales y reproducibles'], ['Ciencias formales', 'Entes abstractos, como los números y las formas lógicas']],
          extra: ['Las creencias sobrenaturales que explican el origen del mundo'] }
      ] },
      { s: 'disciplinas', n: 'Disciplinas sociales', v: [
        { c: 'Una investigación desde la ___ permite analizar la efectividad de las campañas en una elección de representantes, mientras que un análisis propio de la ___ ayuda a anticipar tendencias de consumo durante una recesión.',
          b: ['ciencia política', 'economía'], m: [['historia', 'antropología'], ['economía', 'psicología social'], ['sociología', 'comunicación']] },
        { c: 'El estudio de las costumbres, creencias y formas de vida de un pueblo indígena corresponde a la ___, mientras que el estudio de cómo se distribuye la población en el territorio corresponde a la ___.',
          b: ['antropología', 'geografía humana'], m: [['historia', 'economía'], ['ciencia política', 'sociología'], ['psicología', 'demografía médica']] },
        qDisciplina, qDisciplina, qDisciplina,
        { rel: 'Relacione cada disciplina con su objeto de estudio.', cols: ['Disciplina', 'Objeto de estudio'],
          pares: Object.keys(DISCIPLINAS).map(function (k) { return [k, DISCIPLINAS[k]]; }) }
      ] },
      { s: 'disciplinas2', n: 'Enfoques de las disciplinas', v: [
        { c: 'Cómo perciben distintos sectores sociales la equidad de una reforma fiscal puede estudiarlo la ___, mientras que una perspectiva de la ___ se centraría en los discursos de los medios sobre la reforma.',
          b: ['sociología', 'comunicación'], m: [['historia', 'antropología'], ['geografía humana', 'economía'], ['ciencia política', 'biología']] },
        { c: 'La ___ estudia el pasado de las sociedades a partir de fuentes y documentos, y la ___ estudia la producción, distribución y consumo de bienes.',
          b: ['historia', 'economía'], m: [['antropología', 'sociología'], ['economía', 'historia'], ['ciencia política', 'geografía']] },
        qCasoDisciplina, qCasoDisciplina, qCasoDisciplina, qCasoDisciplina
      ] },
      { s: 'formasGobierno', n: 'Formas de gobierno', v: [
        { p: 'Los siguientes conceptos se refieren a formas de gobierno de un Estado, excepto:', b: 'anarquismo', m: ['autocracia', 'democracia', 'oclocracia', 'monarquía'],
          ex: 'El anarquismo es una corriente que propone eliminar el Estado, no una forma de gobernarlo.' },
        { p: 'La forma de gobierno en la que el poder lo ejerce un pequeño grupo privilegiado es la:', b: 'oligarquía', m: ['democracia', 'monarquía', 'oclocracia'] },
        { p: 'El Estado está compuesto por tres elementos:', b: 'población, territorio y poder (soberanía)',
          m: ['gobierno, partidos y elecciones', 'leyes, tribunales y policía', 'familia, escuela e iglesia', 'presidente, diputados y senadores'] },
        { p: '¿Qué diferencia hay entre el Estado y el gobierno?', b: 'El gobierno es la administración temporal del poder y puede cambiar sin que desaparezca el Estado',
          m: ['Son exactamente lo mismo', 'El Estado cambia cada seis años y el gobierno es permanente', 'El gobierno está formado por la población y el territorio', 'El Estado sólo existe en las monarquías'] },
        { rel: 'Relacione cada forma de gobierno con su característica.', cols: ['Forma de gobierno', 'Característica'],
          pares: [['Monarquía', 'Gobierna una sola persona, generalmente por herencia'], ['Aristocracia', 'Gobiernan los mejores o más capacitados en beneficio de todos'],
            ['Democracia', 'El poder reside en el pueblo, que elige a sus gobernantes'], ['Oligarquía', 'Gobierna un pequeño grupo privilegiado en su propio beneficio'],
            ['Tiranía', 'Una sola persona gobierna en su propio beneficio y sin límites'], ['Oclocracia', 'Gobierna la muchedumbre, guiada por sus pasiones']] },
        { p: 'Según Aristóteles, la forma impura (degenerada) de la monarquía es la:', b: 'tiranía', m: ['oligarquía', 'aristocracia', 'democracia', 'oclocracia'] },
        { p: 'El Estado actúa con tres funciones: legislativa, ejecutiva y judicial. ¿Qué hace la función judicial?', b: 'Imparte justicia',
          m: ['Crea las leyes', 'Aplica las leyes y gobierna', 'Organiza las elecciones', 'Cobra los impuestos'] }
      ] },
      { s: 'democracia', n: 'Tipos de democracia', v: [
        { p: 'El sistema político mexicano permite a la ciudadanía elegir a sus representantes mediante el voto. Ésta es una característica de la democracia:', b: 'representativa', m: ['directa', 'formal', 'participativa'] },
        { p: 'Cuando la ciudadanía decide directamente un asunto público mediante una consulta popular o un referéndum, se ejerce una democracia:', b: 'directa', m: ['representativa', 'indirecta', 'formal'] },
        qDemocracia, qDemocracia, qArticulo, qArticulo, qPoder, qPoder
      ] },
      { s: 'familia', n: 'Familia e instituciones sociales', v: [
        { p: 'Una joven cuenta que en su familia aprendió a resolver conflictos con diálogo, a expresar sus emociones sin violencia y a cumplir sus tareas de casa. Su familia cumplió con las siguientes funciones sociales, excepto:',
          b: 'organización cívica', m: ['regulación afectiva', 'socialización primaria', 'interiorización de normas'] },
        { p: '¿Qué institución social es la base en la formación de valores, afectos y normas de convivencia de una persona?', b: 'La familia',
          m: ['El partido político', 'La Fiscalía', 'El mercado', 'El INE'] },
        { p: 'Las instituciones sociales son:', b: 'estructuras que regulan la conducta de las personas en la vida colectiva',
          m: ['edificios del gobierno federal', 'grupos de amigos que se reúnen sin normas', 'empresas privadas que buscan ganancias', 'leyes escritas en la Constitución'] },
        { p: 'Un club deportivo de la colonia organiza torneos en los que participan familias de distintas calles. ¿Qué función cumple esta institución?', b: 'Fomenta la participación, el sentido de pertenencia y la integración comunitaria',
          m: ['Establece y hace cumplir las leyes', 'Organiza las elecciones federales', 'Imparte justicia en los conflictos', 'Recauda impuestos'] },
        qInstitucion, qInstitucion
      ] },
      { s: 'socializacion', n: 'Socializacion secundaria', v: [
        { p: 'En un torneo de futbol, un joven aprendió a respetar reglas, aceptar las decisiones del árbitro y trabajar en equipo. El torneo cumplió con las siguientes funciones sociales, excepto:',
          b: 'formación de identidad nacional', m: ['socialización secundaria', 'enseñanza de normas y valores', 'adquisición del sentido de pertenencia'] },
        { p: 'La socialización que se da en la escuela, el trabajo o los grupos de amigos, después de la familia, se llama:', b: 'secundaria', m: ['primaria', 'terciaria', 'familiar'] },
        { p: 'La socialización primaria ocurre principalmente en:', b: 'la familia, durante la infancia',
          m: ['el trabajo, en la edad adulta', 'la universidad', 'los partidos políticos', 'los grupos de amigos de la adolescencia'] },
        { p: '¿Qué institución cumple un papel clave en la transmisión de conocimientos y en la educación cívica?', b: 'La escuela',
          m: ['El club deportivo', 'La Fiscalía', 'El mercado', 'El partido político'] },
        qSocializacion, qSocializacion, qSocializacion
      ] },
      { s: 'valoresCivicos', n: 'Valores civicos', v: [
        { p: 'Unos vecinos crean un programa de reciclaje obligatorio: cada habitante separa sus residuos y respeta los días de recolección. La iniciativa cumple con los siguientes valores cívicos, excepto:',
          b: 'justicia, porque se aplican sanciones proporcionales a quien no participe', m: ['solidaridad, pues la acción conjunta busca el beneficio común', 'responsabilidad, ya que cada uno asume su papel en el cuidado del entorno', 'respeto al medio ambiente, porque el reciclaje protege los recursos'] },
        qValor, qValor, qValor,
        { p: 'Los derechos humanos son universales, inalienables y progresivos. Que sean inalienables significa que:', b: 'nadie puede renunciar a ellos ni ser despojado de ellos',
          m: ['sólo los tienen los ciudadanos mayores de edad', 'cada país decide si los reconoce', 'se pueden vender o ceder a otra persona', 'se pierden al cometer una falta'] },
        { lista: 'Del siguiente listado, identifique las obligaciones de la ciudadanía.',
          si: ['Respetar las leyes', 'Pagar impuestos', 'Cuidar los bienes comunes', 'Respetar los derechos de los demás'],
          no: ['Votar sólo por el partido en el gobierno', 'Pertenecer a una religión', 'Afiliarse a un sindicato', 'Callar ante las injusticias'] },
        { p: 'La ciudadanía es:', b: 'la condición legal y política que permite ejercer derechos y asumir responsabilidades dentro de un Estado',
          m: ['el conjunto de personas que viven en una ciudad', 'el derecho exclusivo de quienes pagan impuestos', 'la obligación de pertenecer a un partido político'] }
      ] },
      { s: 'anomia', n: 'Modelos teoricos y conceptos', v: [
        { p: 'El concepto sociológico (de Durkheim) que se refiere a la ruptura o falta de normas sociales es la:', b: 'anomia', m: ['alienación', 'estratificación', 'plusvalía'] },
        { p: 'Para Marx, el valor que produce el trabajador y del que se apropia el dueño de los medios de producción es la:', b: 'plusvalía', m: ['anomia', 'alienación', 'movilidad social'] },
        { p: 'La división de la sociedad en capas o niveles según su ingreso, prestigio o poder se llama:', b: 'estratificación social', m: ['anomia', 'socialización', 'plusvalía'] },
        qModelo, qModelo, qModelo,
        { p: 'Para el positivismo, el hecho social o <i>positum</i> es:', b: 'lo observable y medible de la sociedad',
          m: ['la lucha entre las clases sociales', 'la falta de normas en una sociedad', 'la interpretación subjetiva del investigador'] },
        { p: 'En el materialismo histórico, el motor del cambio social está en:', b: 'las relaciones de producción y la lucha de clases',
          m: ['las ideas de los grandes pensadores', 'el equilibrio entre las instituciones', 'la voluntad de los gobernantes', 'la religión de cada pueblo'] },
        { p: 'Para el estructural-funcionalismo, la sociedad es:', b: 'un sistema de partes interrelacionadas que cumplen funciones para mantener el equilibrio',
          m: ['una lucha permanente entre clases sociales', 'un conjunto de individuos aislados', 'el resultado de la voluntad divina'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-historia1',
    grupo: 'Ciencias sociales',
    nombre: 'Historia de Mexico: de Mesoamerica a la Reforma',
    descripcion: 'Culturas mesoamericanas, conquista, virreinato, Independencia, primeras decadas del Mexico independiente, intervenciones, Reforma y Segundo Imperio. Reactivos 11 a 21 del area.',
    etiquetas: ['mesoamerica', 'conquista', 'virreinato', 'independencia', 'reforma', 'intervencion'],
    niveles: {
      facil: ['conquista', 'pasteles', 'guadalupe'],
      medio: ['mesoamerica', 'independencia', 'constitucion57', 'reforma', 'segundoImperio'],
      dificil: ['culturas', 'ordenes', 'proyectos']
    },
    items: [
      { s: 'mesoamerica', n: 'Civilizaciones mesoamericanas', v: [
        { rel: 'Relacione cada civilización mesoamericana con su característica.', cols: ['Civilización', 'Característica'],
          pares: [['Olmeca', 'Se le considera la cultura madre de Mesoamérica; esculpió cabezas colosales'],
            ['Teotihuacana', 'En su ciudad destacan la Calzada de los Muertos y las pirámides del Sol y de la Luna'],
            ['Maya', 'Habitó Palenque y Bonampak, usó el cero y creó un calendario muy preciso'],
            ['Mexica', 'Peregrinó hasta encontrar un águila sobre un nopal devorando una serpiente']],
          extra: ['Construyó la ciudad de Monte Albán en Oaxaca'] },
        { p: 'Antes de la llegada de los europeos, el actual territorio mexicano se dividía en tres superáreas culturales:', b: 'Mesoamérica, Aridoamérica y Oasisamérica',
          m: ['Mesoamérica, Andinoamérica y el Caribe', 'Norte, Centro y Sur', 'Tenochtitlan, Tlaxcala y Texcoco', 'Aridoamérica, Patagonia y Mesoamérica'] },
        { lista: 'Del siguiente listado, identifique los rasgos que compartían las culturas mesoamericanas.',
          si: ['Agricultura intensiva', 'Religión politeísta', 'Calendarios complejos', 'Ciudades-estado'],
          no: ['Herramientas de hierro', 'Religión monoteísta', 'Ganadería de caballos y vacas', 'Escritura alfabética latina'] },
        { rel: 'Relacione cada superárea cultural con su característica.', cols: ['Superárea', 'Característica'],
          pares: [['Mesoamérica', 'Pueblos agrícolas sedentarios con grandes ciudades, como olmecas, mayas y mexicas'],
            ['Aridoamérica', 'Pueblos nómadas de cazadores y recolectores en las zonas áridas del norte'],
            ['Oasisamérica', 'Pueblos agricultores de los oasis y valles del noroeste, como los de Paquimé']],
          extra: ['Pueblos que habitaban la cordillera de los Andes'] },
        qPeriodo, qPeriodo
      ] },
      { s: 'culturas', n: 'Culturas mesoamericanas', v: [
        { c: 'En la arquitectura, los zapotecos se distinguieron por ___; los mixtecos sobresalieron por ___; mientras que ___ fue la característica política más importante de los toltecas.',
          b: ['la ciudad de Monte Albán', 'la elaboración de códices', 'el gobierno militar-teocrático'],
          m: [['el juego de pelota', 'la domesticación del maíz', 'el ayllu'], ['el Templo Mayor', 'la escritura jeroglífica', 'la expansión a Centroamérica'], ['las cabezas colosales', 'el culto a Huitzilopochtli', 'el calendario Tonalpohualli']] },
        qCultura, qCultura, qCultura, qCultura,
        { p: 'La Triple Alianza, que dominó el centro de Mesoamérica en el siglo XV, estaba formada por:', b: 'Tenochtitlan, Texcoco y Tlacopan',
          m: ['Tenochtitlan, Tlaxcala y Cholula', 'Tula, Teotihuacan y Monte Albán', 'Texcoco, Tlaxcala y Tzintzuntzan'] }
      ] },
      { s: 'conquista', n: 'Conquista', v: [
        { p: 'Para conquistar Tenochtitlan, Hernán Cortés hizo una importante alianza con los:', b: 'tlaxcaltecas', m: ['mayas', 'olmecas', 'zapotecos'] },
        { p: '¿En qué año cayó Tenochtitlan ante los españoles y sus aliados indígenas?', b: '1521', m: ['1492', '1519', '1810', '1325', '1535', '1821', '1517', '1524'] },
        { orden: 'Ordene cronológicamente los siguientes hechos de la Conquista.',
          pasos: ['Expedición de Francisco Hernández de Córdoba', 'Expedición de Juan de Grijalva', 'Llegada de Hernán Cortés a las costas del golfo',
            'Alianza de Cortés con los tlaxcaltecas', 'La Noche Triste, derrota de los españoles al huir de Tenochtitlan', 'Caída de Tenochtitlan'] },
        { rel: 'Relacione cada fuente histórica de la Conquista con su autor o característica.', cols: ['Fuente', 'Autor o característica'],
          pares: [['Cartas de relación', 'Informes que Hernán Cortés escribió al rey Carlos V'], ['Historia verdadera de la conquista de la Nueva España', 'Crónica del soldado Bernal Díaz del Castillo'],
            ['Historia general de las cosas de la Nueva España', 'Obra de fray Bernardino de Sahagún con testimonios indígenas'], ['Códices', 'Libros pictográficos elaborados por los pueblos indígenas']],
          extra: ['Documento que proclamó la independencia de la Nueva España'] },
        { p: 'Además de las alianzas con pueblos indígenas, ¿qué factores ayudaron a los españoles a conquistar Tenochtitlan?', b: 'Las armas de fuego, los caballos y enfermedades como la viruela',
          m: ['El apoyo militar de Francia e Inglaterra', 'La superioridad numérica de los soldados españoles', 'La rendición de los mexicas sin combatir'] },
        { p: '¿Desde qué isla partieron las expediciones españolas que exploraron las costas de México entre 1517 y 1519?', b: 'Cuba', m: ['Jamaica', 'Puerto Rico', 'Las Canarias'] }
      ] },
      { s: 'ordenes', n: 'Virreinato y ordenes religiosas', v: [
        { rel: 'Relacione cada orden religiosa de la Nueva España con su característica.', cols: ['Orden', 'Característica'],
          pares: [['Franciscanos', 'Fueron los primeros en evangelizar tras la conquista (1524)'], ['Dominicos', 'Destacaron por defender a los indígenas, como fray Bartolomé de las Casas'],
            ['Jesuitas', 'Fundaron colegios para las élites y fueron expulsados en 1767'], ['Agustinos', 'Construyeron grandes conventos-fortaleza en el centro del territorio']] },
        { rel: 'Relacione cada institución del Virreinato con su función.', cols: ['Institución', 'Función'],
          pares: [['Virrey', 'Representaba al rey de España y gobernaba la Nueva España'], ['Real Audiencia', 'Impartía justicia y vigilaba a las autoridades'],
            ['Cabildo (ayuntamiento)', 'Gobernaba las ciudades y villas'], ['Consejo de Indias', 'Desde España, legislaba y administraba los territorios de América']],
          extra: ['Cobraba el diezmo para la Iglesia'] },
        { p: '¿Qué orden religiosa fue expulsada de la Nueva España en 1767 por la Corona española?', b: 'Los jesuitas', m: ['Los franciscanos', 'Los dominicos', 'Los agustinos'] },
        { p: 'Las Reformas Borbónicas, aplicadas en el siglo XVIII, buscaban:', b: 'centralizar el poder y aumentar los ingresos de la Corona',
          m: ['dar la independencia a la Nueva España', 'devolver las tierras a los pueblos indígenas', 'abolir el sistema de castas', 'fortalecer el poder de la Iglesia'] },
        { p: 'En la Nueva España, el sistema de castas:', b: 'jerarquizaba a las personas según su origen étnico',
          m: ['dividía a la población según su religión', 'otorgaba los mismos derechos a todos', 'organizaba a los trabajadores por oficio', 'sólo existía entre los pueblos indígenas'] },
        { p: '¿Cuál fue la principal actividad económica de la Nueva España?', b: 'La minería de plata', m: ['La industria textil', 'La extracción de petróleo', 'La ganadería de exportación'] },
        { p: 'El galeón de Manila permitía a la Nueva España comerciar con:', b: 'Asia', m: ['África', 'el norte de Europa', 'Sudamérica'] }
      ] },
      { s: 'independencia', n: 'Independencia de Mexico', v: [
        { rel: 'Relacione cada personaje con su papel en la Independencia de México.', cols: ['Personaje', 'Papel histórico'],
          pares: [['Miguel Hidalgo y Costilla', 'En 1810 inició el movimiento con el Grito de Dolores'],
            ['José María Morelos y Pavón', 'Dictó los Sentimientos de la Nación y se hizo llamar Siervo de la Nación'],
            ['Vicente Guerrero', 'Encabezó la resistencia insurgente entre 1816 y 1821'],
            ['Agustín de Iturbide', 'Al mando del Ejército Trigarante consumó la Independencia en 1821'],
            ['Josefa Ortiz de Domínguez', 'Avisó a los conspiradores de Querétaro que habían sido descubiertos']] },
        qEtapaIndependencia, qEtapaIndependencia, qEtapaIndependencia,
        { p: 'La Independencia se consumó en 1821 con la alianza entre Agustín de Iturbide y Vicente Guerrero, formalizada en el:', b: 'Plan de Iguala',
          m: ['Plan de Ayala', 'Plan de San Luis', 'Plan de Tacubaya', 'Plan de Ayutla'] },
        { p: 'El Plan de Iguala estableció las tres garantías del Ejército Trigarante:', b: 'religión, independencia y unión',
          m: ['libertad, igualdad y fraternidad', 'tierra, libertad y justicia', 'sufragio efectivo, no reelección y reforma agraria'] },
        { orden: 'Ordene cronológicamente los siguientes hechos de la Independencia.',
          pasos: ['Grito de Dolores', 'Toma de la Alhóndiga de Granaditas', 'Sentimientos de la Nación', 'Plan de Iguala', 'Entrada del Ejército Trigarante a la Ciudad de México'] }
      ] },
      { s: 'proyectos', n: 'Proyectos de nacion', v: [
        { orden: 'Ordene cronológicamente los proyectos de nación en México entre 1821 y 1855.',
          pasos: ['Imperio de Iturbide', 'Primera República Federal', 'República Centralista', 'Segunda República Federal', 'Dictadura de Santa Anna'] },
        qProyectoNacion, qProyectoNacion, qProyectoNacion,
        { p: '¿Qué caudillo ocupó la presidencia en múltiples ocasiones entre 1833 y 1855 y llegó a instaurar una dictadura personalista?', b: 'Antonio López de Santa Anna',
          m: ['Benito Juárez', 'Porfirio Díaz', 'Agustín de Iturbide', 'Vicente Guerrero'] },
        { p: 'El Primer Imperio Mexicano (1822-1823), encabezado por Agustín de Iturbide, terminó con:', b: 'su abdicación y el establecimiento de una república',
          m: ['la invasión de Estados Unidos', 'la llegada de Maximiliano de Habsburgo', 'la Guerra de Reforma', 'la reconquista española'] },
        { p: 'Las Siete Leyes (1836) convirtieron a los estados en departamentos. ¿Qué proyecto de nación establecieron?', b: 'República centralista',
          m: ['República federal', 'Imperio', 'Monarquía parlamentaria'] }
      ] },
      { s: 'pasteles', n: 'Intervenciones extranjeras', v: [
        { p: 'Se conoce como Guerra de los Pasteles (1838) a la:', b: 'Primera Intervención Francesa', m: ['Intervención Norteamericana', 'Segunda Intervención Francesa', 'Guerra de Independencia de Texas'] },
        { p: 'La batalla del 5 de mayo de 1862 en Puebla, ganada por Ignacio Zaragoza, ocurrió durante la:', b: 'Segunda Intervención Francesa', m: ['Primera Intervención Francesa', 'Intervención Norteamericana', 'Guerra de Reforma'] },
        qConflicto, qConflicto, qConflicto,
        { p: 'La Guerra de los Pasteles terminó cuando México aceptó pagar a Francia una indemnización de:', b: 600000, m: [10000, 60000, 100000, 6000000, 15000000, 60000000],
          fmt: function (v) { return pesos(v).slice(1) + ' pesos'; } },
        { p: 'En 1829, el militar español Isidro Barradas llegó con un ejército desde Cuba con el objetivo de:', b: 'reconquistar México para España',
          m: ['apoyar la independencia de Texas', 'cobrar las deudas de los comerciantes franceses', 'instaurar el Segundo Imperio'] }
      ] },
      { s: 'guadalupe', n: 'Guerra con Estados Unidos', v: [
        { p: 'Al terminar la guerra contra Estados Unidos (1846-1848), México perdió más de la mitad de su territorio con la firma del Tratado de:', b: 'Guadalupe-Hidalgo', m: ['Mon-Almonte', 'Córdoba', 'Velasco'] },
        { p: 'Con el Tratado de La Mesilla (1853), Santa Anna:', b: 'vendió a Estados Unidos una franja del norte de Sonora y Chihuahua', m: ['reconoció la independencia de Texas', 'firmó la paz con Francia', 'recuperó California'] },
        { c: 'México reconocía como frontera de Texas el río ___, mientras que Estados Unidos reclamaba el río ___.',
          b: ['Nueces', 'Bravo'], m: [['Bravo', 'Nueces'], ['Colorado', 'Bravo'], ['Nueces', 'Misisipi'], ['Bravo', 'Colorado']] },
        { p: 'El presidente estadounidense James K. Polk justificó la expansión territorial de su país con la idea conocida como:', b: 'el Destino Manifiesto',
          m: ['la Doctrina Monroe', 'la política del Buen Vecino', 'la política del Gran Garrote'] },
        { p: 'Con el Tratado de Guadalupe Hidalgo (1848), Estados Unidos pagó a México:', b: 15, m: [3, 5, 10, 25, 50, 100],
          fmt: function (v) { return v + ' millones de dólares'; } },
        { p: '¿Qué territorios perdió México con el Tratado de Guadalupe Hidalgo?', b: 'Los actuales California, Nevada, Utah, Nuevo México y Arizona, entre otros',
          m: ['Guatemala y Belice', 'Yucatán y Campeche', 'Sonora y Chihuahua completos', 'Cuba y Puerto Rico'] },
        { p: '¿Qué ocurrió con Texas en 1845 que desencadenó la guerra entre México y Estados Unidos?', b: 'Fue anexada a Estados Unidos',
          m: ['Se reincorporó a México', 'Se unió a la República de Centroamérica', 'Fue comprada por Francia'] },
        { p: 'Durante la guerra con Estados Unidos, en 1847, los cadetes del Colegio Militar defendieron el:', b: 'Castillo de Chapultepec',
          m: ['Cerro de las Campanas', 'Fuerte de Loreto', 'Puerto de Veracruz'] }
      ] },
      { s: 'constitucion57', n: 'Constitucion de 1857', v: [
        { lista: 'Del siguiente listado, identifique los principios que quedaron plasmados en la Constitución de 1857.',
          si: ['Soberanía popular', 'Libertad de imprenta', 'Igualdad jurídica ante la ley', 'Federalismo'], no: ['Supremacía del clero', 'Rechazo al federalismo', 'Fueros militares y eclesiásticos'] },
        { p: 'Tras la caída de la dictadura de Santa Anna en 1855, los gobiernos liberales de Juan Álvarez e Ignacio Comonfort impulsaron:', b: 'la Constitución de 1857',
          m: ['la Constitución de 1917', 'el Plan de Iguala', 'las Siete Leyes'] },
        { p: 'Además de las libertades de expresión, tránsito y trabajo, la Constitución de 1857:', b: 'limitó los fueros (privilegios) del clero y del ejército',
          m: ['estableció la religión católica como única', 'instauró una monarquía', 'creó el ejido', 'prohibió la libertad de imprenta'] },
        { p: 'En diciembre de 1857, los conservadores desconocieron la Constitución con el Plan de Tacubaya. ¿Qué hizo el presidente Ignacio Comonfort?', b: 'Se unió al principio a los sublevados, lo que provocó una crisis de legitimidad',
          m: ['Convocó a una consulta popular', 'Declaró la guerra a Estados Unidos', 'Promulgó las Leyes de Reforma'] },
        { lista: 'Del siguiente listado, identifique las libertades que consagró la Constitución de 1857.',
          si: ['Libertad de expresión', 'Libertad de tránsito', 'Libertad de trabajo', 'Libertad de enseñanza'],
          no: ['Libertad del clero para tener tribunales propios', 'Obligación de profesar la religión católica', 'Prohibición de la libertad de imprenta'] }
      ] },
      { s: 'reforma', n: 'Guerra de Reforma', v: [
        { p: 'Durante la Guerra de Reforma (1858-1861), los liberales defendieron el republicanismo, el federalismo y la soberanía popular, principios consagrados en:', b: 'la Constitución de 1857', m: ['la Ley de Nacionalización de Bienes', 'el Plan de Tacubaya', 'los Tratados de Córdoba'] },
        { p: 'El Plan de Tacubaya (1857), que desconocía la Constitución de 1857 y dio inicio a la Guerra de Reforma, fue proclamado por los:', b: 'conservadores', m: ['liberales', 'insurgentes', 'zapatistas'] },
        qLiberales, qLiberales, qLiberales,
        { lista: 'Del siguiente listado, identifique las Leyes de Reforma.',
          si: ['Nacionalización de los bienes del clero', 'Separación de la Iglesia y el Estado', 'Creación del Registro Civil', 'Secularización de los cementerios'],
          no: ['Restitución de tierras a los pueblos', 'Expropiación petrolera', 'Creación del ejido', 'Nacionalización de la banca'] },
        { p: 'Durante la Guerra de Reforma, ¿dónde estableció Benito Juárez su gobierno tras salir de la Ciudad de México?', b: 'Fue un gobierno itinerante que se instaló finalmente en Veracruz',
          m: ['En Monterrey, durante toda la guerra', 'En Nueva Orleans', 'En el Castillo de Chapultepec'] },
        { p: 'Las Leyes de Reforma consolidaron un Estado:', b: 'laico', m: ['confesional', 'monárquico', 'centralista'] }
      ] },
      { s: 'segundoImperio', n: 'Segundo Imperio', v: [
        { p: 'Napoleón III retiró sus tropas de México y abandonó a Maximiliano de Habsburgo porque en Europa crecía la amenaza de:', b: 'Prusia', m: ['Inglaterra', 'Rusia', 'España'] },
        { p: '¿Dónde fue fusilado Maximiliano de Habsburgo en 1867?', b: 'En el Cerro de las Campanas, Querétaro', m: ['En Chapultepec, Ciudad de México', 'En Puebla', 'En Veracruz'] },
        { p: 'Una de las causas de la Segunda Intervención Francesa fue:', b: 'la suspensión del pago de la deuda externa decretada por Juárez en 1861',
          m: ['la anexión de Texas a Estados Unidos', 'las quejas de un pastelero francés', 'la venta de La Mesilla', 'la expropiación petrolera'] },
        { p: 'Francia, Inglaterra y España acordaron intervenir juntas en México mediante la:', b: 'Convención de Londres',
          m: ['Doctrina Monroe', 'Convención de Aguascalientes', 'Tratado de Bucareli', 'Tratados de Córdoba'] },
        { p: 'Tras el fusilamiento de Maximiliano (1867) se restauró la república bajo los gobiernos de:', b: 'Benito Juárez y Sebastián Lerdo de Tejada',
          m: ['Porfirio Díaz y Manuel González', 'Ignacio Comonfort y Juan Álvarez', 'Antonio López de Santa Anna y Valentín Gómez Farías'] },
        { p: 'Porfirio Díaz llegó al poder en 1876 al levantarse contra la reelección de Lerdo de Tejada con el:', b: 'Plan de Tuxtepec',
          m: ['Plan de la Noria', 'Plan de San Luis', 'Plan de Ayutla'] },
        { orden: 'Ordene cronológicamente los siguientes hechos.',
          pasos: ['Suspensión del pago de la deuda externa', 'Batalla del 5 de mayo en Puebla', 'Llegada de Maximiliano de Habsburgo a México', 'Retiro de las tropas francesas', 'Fusilamiento de Maximiliano en Querétaro'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-historia2',
    grupo: 'Ciencias sociales',
    nombre: 'Historia de Mexico: del Porfiriato a hoy',
    descripcion: 'Porfiriato, Revolucion, posrevolucion, cardenismo, desarrollo estabilizador, represion de los años sesenta y setenta, neoliberalismo y diversidad cultural. Reactivos 22 a 32 del area.',
    etiquetas: ['porfiriato', 'revolucion', 'madero', 'zapata', 'cardenas', 'neoliberalismo'],
    niveles: {
      facil: ['madero', 'ayala', 'guerraSucia'],
      medio: ['porfiriato', 'huelgas', 'posguerra', 'cardenas', 'pueblos'],
      dificil: ['calles', 'aleman', 'neoliberal']
    },
    items: [
      { s: 'porfiriato', n: 'Porfiriato', v: [
        { lista: 'Del siguiente listado, identifique las características del Porfiriato.',
          si: ['Apertura económica al capital extranjero', 'Saneamiento de las finanzas públicas', 'Crecimiento de los ferrocarriles y la industria'], no: ['Expropiación petrolera', 'Rechazo a la cultura extranjera', 'Descentralización del poder ejecutivo', 'Reparto agrario masivo'] },
        { p: 'Durante el Porfiriato, el grupo de tecnócratas de corte positivista que promovió la modernización con orden y progreso fue el de los:', b: 'científicos',
          m: ['liberales puros', 'constitucionalistas', 'cristeros'] },
        { p: 'En el campo porfirista, muchos peones vivían endeudados de por vida con la hacienda a través de:', b: 'las tiendas de raya',
          m: ['las cajas de ahorro', 'los bancos agrícolas del gobierno', 'las cooperativas ejidales'] },
        { lista: 'Del siguiente listado, identifique las actividades económicas que crecieron durante el Porfiriato.',
          si: ['Ferrocarriles', 'Minería', 'Petróleo', 'Henequén', 'Industria textil'],
          no: ['Ejidos colectivos', 'Industria eléctrica nacionalizada', 'Maquiladoras de exportación', 'Banca nacionalizada'] },
        qPorfiriato, qPorfiriato
      ] },
      { s: 'huelgas', n: 'Conflictos en el Porfiriato', v: [
        { p: 'Ante las huelgas de Cananea (1906) y Río Blanco (1907), el gobierno de Porfirio Díaz respondió con:', b: 'la represión de los movimientos y la concentración del poder',
          m: ['el equilibrio entre poderes y la apertura política', 'el reparto agrario y la democracia sindical', 'la descentralización del poder y la participación popular'] },
        { p: 'La huelga de Cananea (1906), en Sonora, la protagonizaron trabajadores:', b: 'mineros', m: ['textiles', 'ferrocarrileros', 'petroleros'] },
        { p: 'La huelga de Río Blanco (1907), en Veracruz, la protagonizaron trabajadores:', b: 'textiles', m: ['mineros', 'ferrocarrileros', 'petroleros'] },
        { p: 'Entre las causas de las huelgas de Cananea y Río Blanco estaban:', b: 'las jornadas excesivas, los bajos salarios y la desigualdad frente a los trabajadores extranjeros',
          m: ['la expropiación de las empresas por el gobierno', 'la falta de inversión extranjera', 'la prohibición del trabajo en las haciendas'] },
        { p: '¿Qué grupo opositor al Porfiriato, encabezado por los hermanos Flores Magón, impulsó las demandas obreras?', b: 'El Partido Liberal Mexicano',
          m: ['El Partido Nacional Revolucionario', 'El Partido Acción Nacional', 'El Partido de la Revolución Mexicana'] }
      ] },
      { s: 'madero', n: 'Inicio de la Revolucion', v: [
        { p: '¿Quién se opuso a la reelección de Porfirio Díaz en 1910 y llamó a las armas mediante el Plan de San Luis?', b: 'Francisco I. Madero', m: ['Emiliano Zapata', 'Ricardo Flores Magón', 'Victoriano Huerta'] },
        { p: '¿Quién encabezó el golpe de Estado de la Decena Trágica (1913) contra Madero?', b: 'Victoriano Huerta', m: ['Venustiano Carranza', 'Francisco Villa', 'Pascual Orozco'] },
        qRevolucion, qRevolucion, qRevolucion,
        { p: 'Durante la Decena Trágica (1913) fueron asesinados:', b: 'Francisco I. Madero y José María Pino Suárez',
          m: ['Emiliano Zapata y Francisco Villa', 'Venustiano Carranza y Álvaro Obregón', 'Porfirio Díaz y Ramón Corral'] },
        { orden: 'Ordene cronológicamente los siguientes hechos de la Revolución Mexicana.',
          pasos: ['Plan de San Luis', 'Renuncia de Porfirio Díaz', 'Decena Trágica', 'Convención de Aguascalientes', 'Promulgación de la nueva Constitución en Querétaro'] },
        { p: 'La Convención de Aguascalientes (1914) buscó:', b: 'unificar a las facciones revolucionarias tras la caída de Huerta, pero fracasó',
          m: ['redactar la Constitución de 1917', 'reelegir a Porfirio Díaz', 'firmar la paz con Estados Unidos'] }
      ] },
      { s: 'ayala', n: 'Planes revolucionarios y Constitucion de 1917', v: [
        { p: '¿Qué exigía Emiliano Zapata mediante el Plan de Ayala (1911)?', b: 'La restitución de tierras a los campesinos', m: ['La renuncia de Venustiano Carranza', 'La creación de latifundios', 'La reelección de Madero'] },
        { p: 'El Plan de Guadalupe (1913), encabezado por Venustiano Carranza, buscaba:', b: 'desconocer al gobierno de Victoriano Huerta', m: ['devolver las tierras a los pueblos', 'reelegir a Porfirio Díaz', 'nacionalizar el petróleo'] },
        qArticulo1917, qArticulo1917, qPlan, qPlan,
        { p: 'El artículo 27 de la Constitución de 1917 estableció que:', b: 'la propiedad de las tierras y aguas corresponde originariamente a la nación',
          m: ['la educación debe ser laica y gratuita', 'la jornada máxima de trabajo es de ocho horas', 'la soberanía reside en el pueblo'] },
        { p: 'Durante la Primera Guerra Mundial, Alemania propuso a México una alianza contra Estados Unidos a cambio de recuperar territorios perdidos. Este hecho se conoce como:', b: 'el Telegrama Zimmermann',
          m: ['el Tratado de Bucareli', 'la Doctrina Estrada', 'la Convención de Londres'] }
      ] },
      { s: 'posguerra', n: 'Mexico tras la Segunda Guerra Mundial', v: [
        { p: 'Al terminar la Segunda Guerra Mundial, la inversión extranjera y la dependencia tecnológica de México crecieron porque el país se alineó con el bloque:', b: 'capitalista', m: ['asiático', 'europeo del este', 'socialista'] },
        { p: '¿Qué hecho llevó a México a declarar la guerra a las potencias del Eje en 1942?', b: 'El hundimiento de barcos petroleros mexicanos por submarinos alemanes',
          m: ['Un bombardeo japonés a la Ciudad de México', 'Una invasión alemana a Yucatán', 'El Telegrama Zimmermann'] },
        { p: 'La participación militar de México en la Segunda Guerra Mundial fue con el Escuadrón 201, que combatió en:', b: 'Filipinas', m: ['Francia', 'Italia', 'el norte de África'] },
        { p: 'Durante la Guerra Fría, la política exterior de México se basó en los principios de:', b: 'no intervención y autodeterminación de los pueblos',
          m: ['alineación total con la Unión Soviética', 'expansión territorial', 'intervención militar en América Latina'] },
        qModeloEconomico, qModeloEconomico
      ] },
      { s: 'calles', n: 'Instituciones posrevolucionarias', v: [
        { c: 'Durante el gobierno de ___ (1924-1928) se crearon instituciones como ___ para dar estabilidad al Estado mexicano tras la Revolución.',
          b: ['Plutarco Elías Calles', 'el Banco de México'], m: [['Álvaro Obregón', 'la Secretaría de Educación Pública'], ['Emilio Portes Gil', 'el Partido Nacional Revolucionario'], ['Lázaro Cárdenas', 'la Comisión Federal de Electricidad']] },
        { p: '¿Qué partido fundó Plutarco Elías Calles en 1929 para agrupar a las fuerzas revolucionarias?', b: 'Partido Nacional Revolucionario (PNR)', m: ['Partido Acción Nacional (PAN)', 'Partido de la Revolución Mexicana (PRM)', 'Partido Liberal Mexicano (PLM)'] },
        qPosrevolucion, qPosrevolucion, qPosrevolucion,
        { p: 'Durante el Maximato (1928-1934), Plutarco Elías Calles, el "Jefe Máximo", controló a los presidentes:', b: 'Emilio Portes Gil, Pascual Ortiz Rubio y Abelardo L. Rodríguez',
          m: ['Álvaro Obregón, Adolfo de la Huerta y Lázaro Cárdenas', 'Manuel Ávila Camacho, Miguel Alemán y Adolfo Ruiz Cortines', 'Venustiano Carranza, Francisco Villa y Emiliano Zapata'] },
        { p: 'La Guerra Cristera (1926-1929) enfrentó al gobierno de Calles con:', b: 'grupos católicos que se oponían a la aplicación de los artículos anticlericales',
          m: ['los zapatistas que exigían tierras', 'Estados Unidos por el petróleo', 'los obreros de Cananea'] }
      ] },
      { s: 'cardenas', n: 'Cardenismo', v: [
        { p: 'En 1938, Lázaro Cárdenas transformó el partido oficial en el PRM, un partido de masas organizado por sectores como:', b: 'la CNC en el campo y la CTM en la ciudad',
          m: ['dirigentes locales opuestos a los sindicatos', 'grupos de capital privado', 'instituciones creadas para promover el voto libre'] },
        { p: '¿Qué hizo Lázaro Cárdenas el 18 de marzo de 1938?', b: 'Decretó la expropiación petrolera', m: ['Nacionalizó la banca', 'Firmó el TLCAN', 'Creó el Banco de México'] },
        { lista: 'Del siguiente listado, identifique acciones del gobierno de Lázaro Cárdenas.',
          si: ['La expropiación petrolera', 'El reparto masivo de ejidos', 'La creación del PRM, organizado por sectores', 'La nacionalización de los ferrocarriles', 'La fundación del Instituto Politécnico Nacional'],
          no: ['La firma del TLCAN', 'La fundación del PNR', 'La creación del Banco de México', 'La nacionalización de la banca', 'El ingreso al GATT'] },
        { p: 'El Partido de la Revolución Mexicana (PRM), creado por Cárdenas, se organizó en los sectores:', b: 'obrero, campesino, popular y militar',
          m: ['empresarial, religioso y militar', 'liberal y conservador', 'federal, estatal y municipal'] },
        { p: 'La expropiación petrolera de 1938 se decretó porque las compañías extranjeras:', b: 'se negaron a acatar el fallo de la Suprema Corte que las obligaba a mejorar las condiciones de sus trabajadores',
          m: ['quebraron por la caída de los precios del petróleo', 'pidieron al gobierno que las comprara', 'habían agotado los pozos petroleros'] },
        { p: '¿Qué empresa estatal se creó en 1938 para administrar la industria petrolera expropiada?', b: 'Petróleos Mexicanos (Pemex)', m: ['Comisión Federal de Electricidad', 'Teléfonos de México', 'Nacional Financiera'] }
      ] },
      { s: 'aleman', n: 'Industrializacion', v: [
        { p: 'Durante el sexenio de Miguel Alemán (1946-1952), el modelo de sustitución de importaciones llevó a:', b: 'una modernización económica con inversión en infraestructura',
          m: ['la nacionalización de la banca privada', 'el crecimiento del campo por encima de la industria', 'el ingreso de México al GATT'] },
        qSexenio1, qSexenio1, qSexenio1,
        { p: 'El modelo de sustitución de importaciones (1940-1958) buscaba:', b: 'industrializar al país produciendo lo que antes se compraba al extranjero y protegiendo la industria nacional',
          m: ['abrir por completo las fronteras al comercio', 'privatizar las empresas del Estado', 'regresar a una economía agrícola'] }
      ] },
      { s: 'guerraSucia', n: 'Represion politica', v: [
        { p: '¿Cómo se llama la represión militar y política que el gobierno mexicano ejerció desde los años sesenta contra estudiantes y grupos opositores?', b: 'Guerra Sucia', m: ['Operación Cóndor', 'Guerra Fría mexicana', 'Pacificación Nacional'] },
        { p: 'El 2 de octubre de 1968, el ejército reprimió un mitin estudiantil en la Plaza de las Tres Culturas de:', b: 'Tlatelolco', m: ['Ciudad Universitaria', 'el Zócalo', 'Chapultepec'] },
        { p: 'El 10 de junio de 1971, un grupo paramilitar atacó una manifestación estudiantil en la Ciudad de México. Este hecho se conoce como:', b: 'el Halconazo',
          m: ['la Decena Trágica', 'la matanza de Tlatelolco', 'el error de diciembre'] },
        { p: 'La reforma política de 1977, impulsada por Jesús Reyes Heroles, permitió:', b: 'el registro de partidos de oposición para abrir el sistema político',
          m: ['la reelección del presidente', 'el voto de las mujeres', 'la desaparición del Congreso'] },
        { p: 'En 1963 se creó la figura de los diputados de partido para:', b: 'dar cabida en el Congreso a los partidos minoritarios',
          m: ['eliminar a la oposición', 'permitir la reelección presidencial', 'dar el voto a los jóvenes de 16 años'] },
        { p: 'El movimiento estudiantil de 1968 exigía, entre otras cosas:', b: 'libertades democráticas y el fin de la represión',
          m: ['la reelección de Díaz Ordaz', 'la expropiación petrolera', 'la firma de un tratado de libre comercio'] },
        { orden: 'Ordene cronológicamente los siguientes hechos.',
          pasos: ['Creación de los diputados de partido', 'Matanza de Tlatelolco', 'Halconazo', 'Reforma política de Reyes Heroles'] }
      ] },
      { s: 'neoliberal', n: 'Modelo neoliberal', v: [
        { lista: 'Del siguiente listado, identifique hechos del modelo neoliberal en México.',
          si: ['La entrada de México al GATT con Miguel de la Madrid', 'La firma del TLCAN con Carlos Salinas', 'La privatización de empresas públicas como Teléfonos de México'], no: ['La nacionalización de la banca con López Portillo', 'La expropiación petrolera', 'La creación del ejido'] },
        qSexenio2, qSexenio2, qSexenio2,
        { p: 'El modelo neoliberal se basa en la idea de que:', b: 'el mercado es el mejor regulador de la economía',
          m: ['el Estado debe controlar todos los precios', 'hay que cerrar las fronteras al comercio exterior', 'las empresas privadas deben pasar al Estado'] },
        { p: 'El 1 de enero de 1994, el día en que entró en vigor el TLCAN, se levantó en armas en Chiapas el:', b: 'Ejército Zapatista de Liberación Nacional (EZLN)',
          m: ['Ejército Popular Revolucionario (EPR)', 'Partido Liberal Mexicano', 'Ejército Trigarante'] }
      ] },
      { s: 'pueblos', n: 'Pueblos originarios', v: [
        { c: 'En Sonora habita el pueblo ___, en el occidente del país (Jalisco y Nayarit) viven comunidades ___, y en Chiapas se encuentran grupos ___ de ascendencia maya.',
          b: ['yaqui', 'huicholes', 'tzotziles'], m: [['cucapá', 'zoques', 'mayos'], ['chontal', 'mixtecas', 'tepehuanos'], ['mazateco', 'otomíes', 'tarahumaras']] },
        { p: '¿En qué estado vive principalmente el pueblo rarámuri (tarahumara)?', b: 'Chihuahua', m: ['Oaxaca', 'Yucatán', 'Veracruz'] },
        { p: 'En México se hablan 68 lenguas indígenas. ¿Cuáles son dos de las más habladas?', b: 'El náhuatl y el maya',
          m: ['El quechua y el guaraní', 'El aimara y el mapuche', 'El cucapá y el kiliwa'] },
        { p: 'En Chiapas habitan pueblos de ascendencia maya como los:', b: 'tzeltales y tzotziles', m: ['yaquis y mayos', 'rarámuris y tepehuanos', 'purépechas y otomíes'] },
        { p: 'En Oaxaca conviven muchos pueblos originarios, entre ellos los:', b: 'zapotecos y mixtecos', m: ['yaquis y seris', 'rarámuris y pimas', 'kiliwas y cucapás'] },
        { p: 'Para las ciencias sociales, la etnicidad es:', b: 'una construcción social, no una predeterminación biológica',
          m: ['una característica genética que no cambia', 'lo mismo que la nacionalidad', 'una clasificación que sólo depende del color de piel'] },
        qPueblo, qPueblo
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-mexicoActual',
    grupo: 'Ciencias sociales',
    nombre: 'Mexico actual: poblacion, bienestar y economia',
    descripcion: 'Politicas publicas y poblacion, fecundidad, salud, educacion, genero, pobreza y sectores economicos con datos. Reactivos 33 a 40 del area.',
    etiquetas: ['poblacion', 'fecundidad', 'pobreza', 'pib', 'genero', 'inegi'],
    niveles: {
      facil: ['analfabetismo', 'genero'],
      medio: ['salud', 'pobreza', 'pibRegion'],
      dificil: ['politicaPoblacion', 'fecundidad', 'pibNacional']
    },
    items: [
      { s: 'politicaPoblacion', n: 'Politicas publicas y poblacion', v: [
        { p: 'Los estados con mayor inversión en educación y salud para la primera infancia muestran menor crecimiento de la población infantil, y los de menor inversión, crecimiento más alto. ¿Qué relación se puede inferir?',
          b: 'Los servicios públicos reducen la natalidad al ofrecer alternativas que postergan la maternidad', m: ['La baja inversión aumenta la migración infantil', 'Las políticas sólo influyen en la calidad de vida, no en la población', 'La alta inversión hace que las familias quieran más hijos'] },
        { p: 'Según el censo del INEGI de 2020, ¿cuántos habitantes tenía México, aproximadamente?', b: 126, m: [86, 96, 106, 146, 156, 166],
          fmt: function (v) { return v + ' millones'; } },
        { p: 'La mediana de edad de la población mexicana en 2020 era de 29 años. Esto significa que:', b: 'la mitad de la población tenía menos de 29 años y la otra mitad, 29 o más',
          m: ['todos los mexicanos tenían 29 años', 'el promedio de hijos por mujer era de 29', 'la esperanza de vida era de 29 años'] },
        { p: 'Chiapas y Guerrero tienen una mayor proporción de población joven, mientras que en Nuevo León y la Ciudad de México crece la población adulta mayor. ¿Qué proceso se observa en estas dos últimas entidades?', b: 'El envejecimiento de la población',
          m: ['La explosión demográfica', 'La ruralización', 'El aumento de la natalidad'] },
        { p: 'Cerca del 80% de la población de México vive en zonas urbanas. ¿Por qué crecen ciudades como Guadalajara, Monterrey y la Ciudad de México?', b: 'Concentran empresas, empleos y servicios, por lo que atraen población',
          m: ['Tienen más tierras para la agricultura', 'El gobierno prohíbe vivir en el campo', 'Tienen un costo de vida menor que el campo'] },
        { p: 'La migración se define como:', b: 'el movimiento de personas de un lugar a otro para residir en el destino de forma permanente o semipermanente',
          m: ['un viaje de vacaciones de pocos días', 'el aumento de los nacimientos en una región', 'el cambio de puesto dentro de la misma empresa'] }
      ] },
      { s: 'fecundidad', n: 'Fecundidad y bono demografico', v: [
        { p: 'El promedio de hijos por mujer en México bajó de 6.1 en 1974 a 1.8 en 2024. ¿Qué enunciado describe la relación entre políticas públicas y fecundidad?',
          b: 'Los programas de planificación familiar y educación sexual bajaron la fecundidad y extendieron el bono demográfico', m: ['Las mejoras urbanas redujeron la fecundidad y aumentaron el bono demográfico', 'Las políticas migratorias eliminaron el bono demográfico', 'La fecundidad baja sólo porque las mujeres ya no quieren hijos'] },
        { p: 'El bono demográfico es el periodo en el que:', b: 'la población en edad de trabajar es mayor que la población dependiente (niños y adultos mayores)',
          m: ['nacen más niños que nunca', 'la mayoría de la población es adulta mayor', 'el gobierno paga un bono a cada familia'] },
        { p: 'La esperanza de vida en México es de unos 75 años, pero es mayor en la Ciudad de México que en Chiapas o Guerrero. ¿Qué explica la diferencia?', b: 'Las desigualdades en el acceso a la salud y en las condiciones de vida',
          m: ['El clima de cada estado', 'Que en el sur nacen menos niños', 'Que la población del sur es más joven por naturaleza'] },
        qDemografia, qDemografia,
        { p: 'Si la fecundidad sigue bajando y la esperanza de vida sigue subiendo, a largo plazo en México habrá:', b: 'más adultos mayores en proporción y mayor demanda de pensiones y servicios de salud',
          m: ['más niños que adultos', 'menos necesidad de servicios de salud', 'un bono demográfico que nunca termina'] }
      ] },
      { s: 'salud', n: 'Acceso a la salud', v: [
        { p: 'Según el INEGI, la población sin acceso a servicios de salud pasó de 16.2% en 2018 a 35.7% en 2021. ¿Qué consecuencia directa tiene este aumento?',
          b: 'El aumento de la automedicación y de la atención privada de alto costo', m: ['Menor necesidad de servicios públicos de salud', 'Menos enfermedades crónicas', 'La eliminación de enfermedades prevenibles'] },
        qSalud, qSalud, qSalud,
        { p: 'El sistema de salud de México es mixto porque:', b: 'coexisten servicios públicos y privados',
          m: ['atiende por separado a hombres y mujeres', 'sólo hay hospitales privados', 'lo administran juntos México y Estados Unidos'] },
        { p: '¿Dónde hay más limitaciones de infraestructura y cobertura médica en México?', b: 'En las zonas rurales y en el sur del país',
          m: ['En las grandes ciudades del norte', 'En la Ciudad de México', 'En todas las regiones por igual'] },
        { p: 'La depresión y la ansiedad son los trastornos de salud mental más comunes en México. ¿Qué medida pública ayudaría a atenderlos?', b: 'Ampliar los servicios de salud mental en la seguridad social y en las escuelas',
          m: ['Reducir el número de psicólogos en los hospitales', 'Atenderlos sólo en hospitales privados', 'Evitar que se hable del tema'] }
      ] },
      { s: 'analfabetismo', n: 'Educacion', v: [
        { p: 'En 2020 el analfabetismo en México fue de 4.7%: 12% en zonas rurales y 2.5% en urbanas. ¿Qué factor influye más en el analfabetismo rural?',
          b: 'La escasa infraestructura educativa y de programas de alfabetización en el campo', m: ['La falta de interés de la población rural', 'Una menor capacidad cognitiva en el campo', 'La prohibición legal de alfabetizar adultos'] },
        { p: '¿Qué programa de becas está dirigido a estudiantes de educación media superior para reducir la deserción escolar?', b: 'Beca Universal Benito Juárez',
          m: ['Beca Elisa Acuña', 'Sembrando Vida', 'Jóvenes Construyendo el Futuro'] },
        { p: 'La Beca Elisa Acuña apoya a estudiantes de:', b: 'educación superior en situación de vulnerabilidad', m: ['preescolar', 'primaria y secundaria', 'posgrado en el extranjero'] },
        { p: 'En las universidades públicas más demandadas, como la UNAM, el IPN y la UAM, el ingreso es muy competitivo porque:', b: 'la demanda de lugares supera la oferta',
          m: ['hay más lugares que aspirantes', 'sólo admiten a estudiantes extranjeros', 'no aplican examen de admisión'] },
        { p: 'En México, el analfabetismo es mayor:', b: 'en las zonas rurales, entre las mujeres adultas mayores y en estados como Chiapas, Guerrero y Oaxaca',
          m: ['en las grandes ciudades del norte', 'entre los jóvenes de 15 a 19 años de la Ciudad de México', 'en todas las regiones por igual'] },
        { p: 'La educación privada tiene entre 10% y 15% de la matrícula y se concentra en las grandes ciudades. ¿Qué efecto tiene?', b: 'Genera una brecha en la calidad educativa según el nivel económico',
          m: ['Elimina la desigualdad educativa', 'Hace que desaparezca la educación pública', 'Reduce la cobertura en las ciudades'] }
      ] },
      { s: 'genero', n: 'Empleo y brecha de genero', v: [
        { p: 'En 2022, 45.9% de las mujeres y 76.4% de los hombres participaban en la actividad económica. ¿Qué elemento contribuye directamente a esta brecha?',
          b: 'La persistencia de roles de género que limitan la inserción laboral de las mujeres', m: ['La falta de interés de las mujeres por trabajar', 'La menor preparación académica de las mujeres', 'La inexistencia total de políticas de equidad'] },
        { p: 'En México, las mujeres se concentran más que los hombres en trabajos informales y de bajos salarios. ¿Qué consecuencia tiene?', b: 'Menor acceso a la seguridad social, a las prestaciones y a puestos de alta remuneración',
          m: ['Mayor acceso a pensiones que los hombres', 'Salarios más altos que los de los hombres', 'Ninguna, porque el empleo informal tiene las mismas prestaciones'] },
        { p: 'Más de la mitad de la población ocupada en México trabaja en la informalidad. Esto significa que esos trabajadores:', b: 'no tienen acceso a la seguridad social ni a las prestaciones de ley',
          m: ['trabajan en el gobierno', 'ganan más que los trabajadores formales', 'tienen contrato por tiempo indeterminado'] },
        { p: '¿Qué grupo de edad tiene la tasa de desempleo más alta en México?', b: 'Los jóvenes de 15 a 29 años',
          m: ['Los adultos de 30 a 39 años', 'Los adultos de 40 a 49 años', 'Los mayores de 50 años'] },
        { p: 'Los estados del norte, como Nuevo León y Baja California, suelen tener menos desempleo que Chiapas o Guerrero. ¿Qué lo explica?', b: 'Su industria manufacturera y su cercanía con Estados Unidos',
          m: ['Que tienen más población rural', 'Que no tienen industria', 'Que su población es más joven'] },
        { p: 'Para medir una brecha de género en el trabajo se compara:', b: 'un mismo indicador (participación, salario o desempleo) entre mujeres y hombres',
          m: ['el número de mujeres de dos estados distintos', 'el salario de una mujer en dos años distintos', 'la población total del país con la de otro país'] },
        qBrecha
      ] },
      { s: 'pobreza', n: 'Pobreza y desigualdad', v: [
        { p: 'Según el CONEVAL (2020), en Chiapas 75.5% de la población vivía en pobreza y 29% en pobreza extrema; en Nuevo León, 20.4% y 1.5%. ¿Qué afirmación es correcta?',
          b: 'Ambos estados muestran la desigual distribución del ingreso en el país', m: ['Chiapas es pobre porque no recibe recursos federales', 'En Nuevo León no hay desigualdad de ingresos', 'Nuevo León tiene las mejores políticas sociales del país'] },
        qRiqueza, qRiqueza, qGini,
        { p: 'El coeficiente de Gini mide la desigualdad en la distribución del ingreso. Un valor de 0 significa:', b: 'igualdad total: todos reciben el mismo ingreso',
          m: ['desigualdad extrema: una persona recibe todo', 'que nadie tiene ingresos', 'que la mitad de la población es pobre'] },
        { p: '¿Qué diferencia hay entre el ingreso y la riqueza?', b: 'El ingreso es un flujo de dinero (como un sueldo); la riqueza es lo que se posee menos lo que se debe',
          m: ['Son lo mismo', 'La riqueza es el sueldo mensual y el ingreso son las deudas', 'El ingreso sólo lo tienen las empresas', 'La riqueza sólo incluye el dinero en efectivo'] },
        { p: 'Cuando se divide a la población en deciles según su ingreso, el décimo decil está formado por:', b: 'el 10% de la población con mayores ingresos',
          m: ['el 10% de la población con menores ingresos', 'las 10 personas más ricas del país', 'toda la población'] },
        { p: 'Un agricultor vende su cosecha una vez al año y recibe $80,000. Para las ciencias sociales, ese pago forma parte de su:', b: 'ingreso',
          m: ['pasivo', 'deuda', 'decil'] }
      ] },
      { s: 'pibRegion', n: 'Economia regional', v: [
        { p: 'En el sureste de México, la agricultura aporta 18.7% del PIB regional, la industria 25.3% y los servicios 56%. ¿Qué afirmación es coherente con los datos?',
          b: 'La economía de la región se inclina sobre todo a los servicios, aunque no descuida la industria', m: ['La industria es el sector dominante', 'El sureste está orientado principalmente a la agricultura', 'Los tres sectores aportan lo mismo'] },
        { p: 'En una región, el sector primario aporta 9%, el secundario 48% y el terciario 43% del PIB. ¿Qué afirmación es coherente?',
          b: 'La industria es el sector que más aporta, seguido de cerca por los servicios', m: ['La región es principalmente agrícola', 'Los servicios dominan claramente la economía', 'Los tres sectores aportan lo mismo'] },
        qRegion, qRegion, qRegion, qSectorPIB, qSectorPIB,
        { p: 'La Ciudad de México es el principal motor económico del país porque:', b: 'concentra servicios, comercio, finanzas, tecnología y muchas empresas multinacionales',
          m: ['es la mayor productora de petróleo', 'tiene la mayor producción agrícola', 'concentra la industria maquiladora de la frontera'] }
      ] },
      { s: 'pibNacional', n: 'Sectores y comercio internacional', v: [
        { p: 'En 2022 el sector primario aportó 3.5% del PIB de México, el secundario 30.2% y el terciario 66.3%. ¿Qué afirmación es congruente con el comercio internacional del país?',
          b: 'El sector secundario es clave por la industria manufacturera de exportación', m: ['México es un país principalmente agroexportador', 'El sector terciario exporta sobre todo productos tecnológicos', 'El sector primario es el principal impulsor del comercio exterior'] },
        qComercio, qComercio, qComercio,
        { p: '¿Qué país es el principal socio comercial de México y el destino de alrededor del 80% de sus exportaciones?', b: 'Estados Unidos', m: ['China', 'Canadá', 'Alemania'] },
        { p: 'México es uno de los principales exportadores mundiales de productos manufacturados. ¿Cuáles destacan?', b: 'Automóviles y productos electrónicos',
          m: ['Café y cacao únicamente', 'Servicios financieros', 'Barcos y aviones de pasajeros'] },
        { p: 'Las importaciones de México, como maquinaria, vehículos, productos electrónicos y combustibles, provienen principalmente de:', b: 'Estados Unidos y China',
          m: ['Brasil y Argentina', 'Rusia e India', 'Francia y Alemania'] },
        { p: 'El PIB per cápita es:', b: 'el PIB dividido entre el número de habitantes', m: ['el PIB de un solo estado', 'el ingreso del 10% más rico', 'la suma de las exportaciones'] },
        qPerCapita
      ] }
    ]
  });
})();
