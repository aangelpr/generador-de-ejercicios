/* Modo prepa - Ciencias sociales: disciplinas sociales, Estado y sociedad,
   historia de Mexico y problemas actuales (los 40 reactivos del area) */
(function () {
  'use strict';
  var P = EJ.prepa;

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
          m: ['La evolución biológica de la especie humana', 'El pensamiento simbólico y su expresión artística', 'Los fenómenos físicos de la naturaleza'] }
      ] },
      { s: 'humanidades', n: 'Ciencias sociales y humanidades', v: [
        { p: 'A diferencia de las humanidades, las ciencias sociales:', b: 'suelen recurrir a una comprobación empírica para validar sus hipótesis',
          m: ['rechazan la falsación como parte del método', 'no generan proposiciones sobre fenómenos sociales', 'se basan sólo en interpretaciones subjetivas de la experiencia'] }
      ] },
      { s: 'disciplinas', n: 'Disciplinas sociales', v: [
        { c: 'Una investigación desde la ___ permite analizar la efectividad de las campañas en una elección de representantes, mientras que un análisis propio de la ___ ayuda a anticipar tendencias de consumo durante una recesión.',
          b: ['ciencia política', 'economía'], m: [['historia', 'antropología'], ['economía', 'psicología social'], ['sociología', 'comunicación']] },
        { c: 'El estudio de las costumbres, creencias y formas de vida de un pueblo indígena corresponde a la ___, mientras que el estudio de cómo se distribuye la población en el territorio corresponde a la ___.',
          b: ['antropología', 'geografía humana'], m: [['historia', 'economía'], ['ciencia política', 'sociología'], ['psicología', 'demografía médica']] }
      ] },
      { s: 'disciplinas2', n: 'Enfoques de las disciplinas', v: [
        { c: 'Cómo perciben distintos sectores sociales la equidad de una reforma fiscal puede estudiarlo la ___, mientras que una perspectiva de la ___ se centraría en los discursos de los medios sobre la reforma.',
          b: ['sociología', 'comunicación'], m: [['historia', 'antropología'], ['geografía humana', 'economía'], ['ciencia política', 'biología']] },
        { c: 'La ___ estudia el pasado de las sociedades a partir de fuentes y documentos, y la ___ estudia la producción, distribución y consumo de bienes.',
          b: ['historia', 'economía'], m: [['antropología', 'sociología'], ['economía', 'historia'], ['ciencia política', 'geografía']] }
      ] },
      { s: 'formasGobierno', n: 'Formas de gobierno', v: [
        { p: 'Los siguientes conceptos se refieren a formas de gobierno de un Estado, excepto:', b: 'anarquismo', m: ['autocracia', 'democracia', 'oclocracia', 'monarquía'],
          ex: 'El anarquismo es una corriente que propone eliminar el Estado, no una forma de gobernarlo.' },
        { p: 'La forma de gobierno en la que el poder lo ejerce un pequeño grupo privilegiado es la:', b: 'oligarquía', m: ['democracia', 'monarquía', 'oclocracia'] }
      ] },
      { s: 'democracia', n: 'Tipos de democracia', v: [
        { p: 'El sistema político mexicano permite a la ciudadanía elegir a sus representantes mediante el voto. Ésta es una característica de la democracia:', b: 'representativa', m: ['directa', 'formal', 'participativa'] },
        { p: 'Cuando la ciudadanía decide directamente un asunto público mediante una consulta popular o un referéndum, se ejerce una democracia:', b: 'directa', m: ['representativa', 'indirecta', 'formal'] }
      ] },
      { s: 'familia', n: 'Funciones de la familia', v: [
        { p: 'Una joven cuenta que en su familia aprendió a resolver conflictos con diálogo, a expresar sus emociones sin violencia y a cumplir sus tareas de casa. Su familia cumplió con las siguientes funciones sociales, excepto:',
          b: 'organización cívica', m: ['regulación afectiva', 'socialización primaria', 'interiorización de normas'] }
      ] },
      { s: 'socializacion', n: 'Socializacion secundaria', v: [
        { p: 'En un torneo de futbol, un joven aprendió a respetar reglas, aceptar las decisiones del árbitro y trabajar en equipo. El torneo cumplió con las siguientes funciones sociales, excepto:',
          b: 'formación de identidad nacional', m: ['socialización secundaria', 'enseñanza de normas y valores', 'adquisición del sentido de pertenencia'] },
        { p: 'La socialización que se da en la escuela, el trabajo o los grupos de amigos, después de la familia, se llama:', b: 'secundaria', m: ['primaria', 'terciaria', 'familiar'] }
      ] },
      { s: 'valoresCivicos', n: 'Valores civicos', v: [
        { p: 'Unos vecinos crean un programa de reciclaje obligatorio: cada habitante separa sus residuos y respeta los días de recolección. La iniciativa cumple con los siguientes valores cívicos, excepto:',
          b: 'justicia, porque se aplican sanciones proporcionales a quien no participe', m: ['solidaridad, pues la acción conjunta busca el beneficio común', 'responsabilidad, ya que cada uno asume su papel en el cuidado del entorno', 'respeto al medio ambiente, porque el reciclaje protege los recursos'] }
      ] },
      { s: 'anomia', n: 'Conceptos sociologicos', v: [
        { p: 'El concepto sociológico (de Durkheim) que se refiere a la ruptura o falta de normas sociales es la:', b: 'anomia', m: ['alienación', 'estratificación', 'plusvalía'] },
        { p: 'Para Marx, el valor que produce el trabajador y del que se apropia el dueño de los medios de producción es la:', b: 'plusvalía', m: ['anomia', 'alienación', 'movilidad social'] },
        { p: 'La división de la sociedad en capas o niveles según su ingreso, prestigio o poder se llama:', b: 'estratificación social', m: ['anomia', 'socialización', 'plusvalía'] }
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
          extra: ['Construyó la ciudad de Monte Albán en Oaxaca'] }
      ] },
      { s: 'culturas', n: 'Zapotecos, mixtecos y toltecas', v: [
        { c: 'En la arquitectura, los zapotecos se distinguieron por ___; los mixtecos sobresalieron por ___; mientras que ___ fue la característica política más importante de los toltecas.',
          b: ['la ciudad de Monte Albán', 'la elaboración de códices', 'el gobierno militar-teocrático'],
          m: [['el juego de pelota', 'la domesticación del maíz', 'el ayllu'], ['el Templo Mayor', 'la escritura jeroglífica', 'la expansión a Centroamérica'], ['las cabezas colosales', 'el culto a Huitzilopochtli', 'el calendario Tonalpohualli']] }
      ] },
      { s: 'conquista', n: 'Conquista', v: [
        { p: 'Para conquistar Tenochtitlan, Hernán Cortés hizo una importante alianza con los:', b: 'tlaxcaltecas', m: ['mayas', 'olmecas', 'zapotecos'] },
        { p: '¿En qué año cayó Tenochtitlan ante los españoles y sus aliados indígenas?', b: '1521', m: ['1492', '1519', '1810'] }
      ] },
      { s: 'ordenes', n: 'Ordenes religiosas', v: [
        { rel: 'Relacione cada orden religiosa de la Nueva España con su característica.', cols: ['Orden', 'Característica'],
          pares: [['Franciscanos', 'Fueron los primeros en evangelizar tras la conquista (1524)'], ['Dominicos', 'Destacaron por defender a los indígenas, como fray Bartolomé de las Casas'],
            ['Jesuitas', 'Fundaron colegios para las élites y fueron expulsados en 1767'], ['Agustinos', 'Construyeron grandes conventos-fortaleza en el centro del territorio']] }
      ] },
      { s: 'independencia', n: 'Independencia de Mexico', v: [
        { rel: 'Relacione cada personaje con su papel en la Independencia de México.', cols: ['Personaje', 'Papel histórico'],
          pares: [['Miguel Hidalgo y Costilla', 'En 1810 inició el movimiento con el Grito de Dolores'],
            ['José María Morelos y Pavón', 'Dictó los Sentimientos de la Nación y se hizo llamar Siervo de la Nación'],
            ['Vicente Guerrero', 'Encabezó la resistencia insurgente entre 1816 y 1821'],
            ['Agustín de Iturbide', 'Al mando del Ejército Trigarante consumó la Independencia en 1821'],
            ['Josefa Ortiz de Domínguez', 'Avisó a los conspiradores de Querétaro que habían sido descubiertos']] }
      ] },
      { s: 'proyectos', n: 'Proyectos de nacion', v: [
        { orden: 'Ordene cronológicamente los proyectos de nación en México entre 1821 y 1855.',
          pasos: ['Imperio de Iturbide', 'Primera República Federal', 'República Centralista', 'Segunda República Federal', 'Dictadura de Santa Anna'] }
      ] },
      { s: 'pasteles', n: 'Intervenciones extranjeras', v: [
        { p: 'Se conoce como Guerra de los Pasteles (1838) a la:', b: 'Primera Intervención Francesa', m: ['Intervención Norteamericana', 'Segunda Intervención Francesa', 'Guerra de Independencia de Texas'] },
        { p: 'La batalla del 5 de mayo de 1862 en Puebla, ganada por Ignacio Zaragoza, ocurrió durante la:', b: 'Segunda Intervención Francesa', m: ['Primera Intervención Francesa', 'Intervención Norteamericana', 'Guerra de Reforma'] }
      ] },
      { s: 'guadalupe', n: 'Guerra con Estados Unidos', v: [
        { p: 'Al terminar la guerra contra Estados Unidos (1846-1848), México perdió más de la mitad de su territorio con la firma del Tratado de:', b: 'Guadalupe-Hidalgo', m: ['Mon-Almonte', 'Córdoba', 'Velasco'] },
        { p: 'Con el Tratado de La Mesilla (1853), Santa Anna:', b: 'vendió a Estados Unidos una franja del norte de Sonora y Chihuahua', m: ['reconoció la independencia de Texas', 'firmó la paz con Francia', 'recuperó California'] }
      ] },
      { s: 'constitucion57', n: 'Constitucion de 1857', v: [
        { lista: 'Del siguiente listado, identifique los principios que quedaron plasmados en la Constitución de 1857.',
          si: ['Soberanía popular', 'Libertad de imprenta', 'Igualdad jurídica ante la ley', 'Federalismo'], no: ['Supremacía del clero', 'Rechazo al federalismo', 'Fueros militares y eclesiásticos'] }
      ] },
      { s: 'reforma', n: 'Guerra de Reforma', v: [
        { p: 'Durante la Guerra de Reforma (1858-1861), los liberales defendieron el republicanismo, el federalismo y la soberanía popular, principios consagrados en:', b: 'la Constitución de 1857', m: ['la Ley de Nacionalización de Bienes', 'el Plan de Tacubaya', 'los Tratados de Córdoba'] },
        { p: 'El Plan de Tacubaya (1857), que desconocía la Constitución de 1857 y dio inicio a la Guerra de Reforma, fue proclamado por los:', b: 'conservadores', m: ['liberales', 'insurgentes', 'zapatistas'] }
      ] },
      { s: 'segundoImperio', n: 'Segundo Imperio', v: [
        { p: 'Napoleón III retiró sus tropas de México y abandonó a Maximiliano de Habsburgo porque en Europa crecía la amenaza de:', b: 'Prusia', m: ['Inglaterra', 'Rusia', 'España'] },
        { p: '¿Dónde fue fusilado Maximiliano de Habsburgo en 1867?', b: 'En el Cerro de las Campanas, Querétaro', m: ['En Chapultepec, Ciudad de México', 'En Puebla', 'En Veracruz'] }
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
          si: ['Apertura económica al capital extranjero', 'Saneamiento de las finanzas públicas', 'Crecimiento de los ferrocarriles y la industria'], no: ['Expropiación petrolera', 'Rechazo a la cultura extranjera', 'Descentralización del poder ejecutivo', 'Reparto agrario masivo'] }
      ] },
      { s: 'huelgas', n: 'Conflictos en el Porfiriato', v: [
        { p: 'Ante las huelgas de Cananea (1906) y Río Blanco (1907), el gobierno de Porfirio Díaz respondió con:', b: 'la represión de los movimientos y la concentración del poder',
          m: ['el equilibrio entre poderes y la apertura política', 'el reparto agrario y la democracia sindical', 'la descentralización del poder y la participación popular'] }
      ] },
      { s: 'madero', n: 'Inicio de la Revolucion', v: [
        { p: '¿Quién se opuso a la reelección de Porfirio Díaz en 1910 y llamó a las armas mediante el Plan de San Luis?', b: 'Francisco I. Madero', m: ['Emiliano Zapata', 'Ricardo Flores Magón', 'Victoriano Huerta'] },
        { p: '¿Quién encabezó el golpe de Estado de la Decena Trágica (1913) contra Madero?', b: 'Victoriano Huerta', m: ['Venustiano Carranza', 'Francisco Villa', 'Pascual Orozco'] }
      ] },
      { s: 'ayala', n: 'Planes revolucionarios', v: [
        { p: '¿Qué exigía Emiliano Zapata mediante el Plan de Ayala (1911)?', b: 'La restitución de tierras a los campesinos', m: ['La renuncia de Venustiano Carranza', 'La creación de latifundios', 'La reelección de Madero'] },
        { p: 'El Plan de Guadalupe (1913), encabezado por Venustiano Carranza, buscaba:', b: 'desconocer al gobierno de Victoriano Huerta', m: ['devolver las tierras a los pueblos', 'reelegir a Porfirio Díaz', 'nacionalizar el petróleo'] }
      ] },
      { s: 'posguerra', n: 'Mexico tras la Segunda Guerra Mundial', v: [
        { p: 'Al terminar la Segunda Guerra Mundial, la inversión extranjera y la dependencia tecnológica de México crecieron porque el país se alineó con el bloque:', b: 'capitalista', m: ['asiático', 'europeo del este', 'socialista'] }
      ] },
      { s: 'calles', n: 'Instituciones posrevolucionarias', v: [
        { c: 'Durante el gobierno de ___ (1924-1928) se crearon instituciones como ___ para dar estabilidad al Estado mexicano tras la Revolución.',
          b: ['Plutarco Elías Calles', 'el Banco de México'], m: [['Álvaro Obregón', 'la Secretaría de Educación Pública'], ['Emilio Portes Gil', 'el Partido Nacional Revolucionario'], ['Lázaro Cárdenas', 'la Comisión Federal de Electricidad']] },
        { p: '¿Qué partido fundó Plutarco Elías Calles en 1929 para agrupar a las fuerzas revolucionarias?', b: 'Partido Nacional Revolucionario (PNR)', m: ['Partido Acción Nacional (PAN)', 'Partido de la Revolución Mexicana (PRM)', 'Partido Liberal Mexicano (PLM)'] }
      ] },
      { s: 'cardenas', n: 'Cardenismo', v: [
        { p: 'En 1938, Lázaro Cárdenas transformó el partido oficial en el PRM, un partido de masas organizado por sectores como:', b: 'la CNC en el campo y la CTM en la ciudad',
          m: ['dirigentes locales opuestos a los sindicatos', 'grupos de capital privado', 'instituciones creadas para promover el voto libre'] },
        { p: '¿Qué hizo Lázaro Cárdenas el 18 de marzo de 1938?', b: 'Decretó la expropiación petrolera', m: ['Nacionalizó la banca', 'Firmó el TLCAN', 'Creó el Banco de México'] }
      ] },
      { s: 'aleman', n: 'Industrializacion', v: [
        { p: 'Durante el sexenio de Miguel Alemán (1946-1952), el modelo de sustitución de importaciones llevó a:', b: 'una modernización económica con inversión en infraestructura',
          m: ['la nacionalización de la banca privada', 'el crecimiento del campo por encima de la industria', 'el ingreso de México al GATT'] }
      ] },
      { s: 'guerraSucia', n: 'Represion politica', v: [
        { p: '¿Cómo se llama la represión militar y política que el gobierno mexicano ejerció desde los años sesenta contra estudiantes y grupos opositores?', b: 'Guerra Sucia', m: ['Operación Cóndor', 'Guerra Fría mexicana', 'Pacificación Nacional'] },
        { p: 'El 2 de octubre de 1968, el ejército reprimió un mitin estudiantil en la Plaza de las Tres Culturas de:', b: 'Tlatelolco', m: ['Ciudad Universitaria', 'el Zócalo', 'Chapultepec'] }
      ] },
      { s: 'neoliberal', n: 'Modelo neoliberal', v: [
        { lista: 'Del siguiente listado, identifique hechos del modelo neoliberal en México.',
          si: ['La entrada de México al GATT con Miguel de la Madrid', 'La firma del TLCAN con Carlos Salinas', 'La privatización de empresas públicas como Teléfonos de México'], no: ['La nacionalización de la banca con López Portillo', 'La expropiación petrolera', 'La creación del ejido'] }
      ] },
      { s: 'pueblos', n: 'Pueblos originarios', v: [
        { c: 'En Sonora habita el pueblo ___, en el occidente del país (Jalisco y Nayarit) viven comunidades ___, y en Chiapas se encuentran grupos ___ de ascendencia maya.',
          b: ['yaqui', 'huicholes', 'tzotziles'], m: [['cucapá', 'zoques', 'mayos'], ['chontal', 'mixtecas', 'tepehuanos'], ['mazateco', 'otomíes', 'tarahumaras']] },
        { p: '¿En qué estado vive principalmente el pueblo rarámuri (tarahumara)?', b: 'Chihuahua', m: ['Oaxaca', 'Yucatán', 'Veracruz'] }
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
          b: 'Los servicios públicos reducen la natalidad al ofrecer alternativas que postergan la maternidad', m: ['La baja inversión aumenta la migración infantil', 'Las políticas sólo influyen en la calidad de vida, no en la población', 'La alta inversión hace que las familias quieran más hijos'] }
      ] },
      { s: 'fecundidad', n: 'Fecundidad y bono demografico', v: [
        { p: 'El promedio de hijos por mujer en México bajó de 6.1 en 1974 a 1.8 en 2024. ¿Qué enunciado describe la relación entre políticas públicas y fecundidad?',
          b: 'Los programas de planificación familiar y educación sexual bajaron la fecundidad y extendieron el bono demográfico', m: ['Las mejoras urbanas redujeron la fecundidad y aumentaron el bono demográfico', 'Las políticas migratorias eliminaron el bono demográfico', 'La fecundidad baja sólo porque las mujeres ya no quieren hijos'] }
      ] },
      { s: 'salud', n: 'Acceso a la salud', v: [
        { p: 'Según el INEGI, la población sin acceso a servicios de salud pasó de 16.2% en 2018 a 35.7% en 2021. ¿Qué consecuencia directa tiene este aumento?',
          b: 'El aumento de la automedicación y de la atención privada de alto costo', m: ['Menor necesidad de servicios públicos de salud', 'Menos enfermedades crónicas', 'La eliminación de enfermedades prevenibles'] }
      ] },
      { s: 'analfabetismo', n: 'Educacion', v: [
        { p: 'En 2020 el analfabetismo en México fue de 4.7%: 12% en zonas rurales y 2.5% en urbanas. ¿Qué factor influye más en el analfabetismo rural?',
          b: 'La escasa infraestructura educativa y de programas de alfabetización en el campo', m: ['La falta de interés de la población rural', 'Una menor capacidad cognitiva en el campo', 'La prohibición legal de alfabetizar adultos'] }
      ] },
      { s: 'genero', n: 'Brecha de genero', v: [
        { p: 'En 2022, 45.9% de las mujeres y 76.4% de los hombres participaban en la actividad económica. ¿Qué elemento contribuye directamente a esta brecha?',
          b: 'La persistencia de roles de género que limitan la inserción laboral de las mujeres', m: ['La falta de interés de las mujeres por trabajar', 'La menor preparación académica de las mujeres', 'La inexistencia total de políticas de equidad'] }
      ] },
      { s: 'pobreza', n: 'Pobreza y desigualdad', v: [
        { p: 'Según el CONEVAL (2020), en Chiapas 75.5% de la población vivía en pobreza y 29% en pobreza extrema; en Nuevo León, 20.4% y 1.5%. ¿Qué afirmación es correcta?',
          b: 'Ambos estados muestran la desigual distribución del ingreso en el país', m: ['Chiapas es pobre porque no recibe recursos federales', 'En Nuevo León no hay desigualdad de ingresos', 'Nuevo León tiene las mejores políticas sociales del país'] }
      ] },
      { s: 'pibRegion', n: 'Economia regional', v: [
        { p: 'En el sureste de México, la agricultura aporta 18.7% del PIB regional, la industria 25.3% y los servicios 56%. ¿Qué afirmación es coherente con los datos?',
          b: 'La economía de la región se inclina sobre todo a los servicios, aunque no descuida la industria', m: ['La industria es el sector dominante', 'El sureste está orientado principalmente a la agricultura', 'Los tres sectores aportan lo mismo'] },
        { p: 'En una región, el sector primario aporta 9%, el secundario 48% y el terciario 43% del PIB. ¿Qué afirmación es coherente?',
          b: 'La industria es el sector que más aporta, seguido de cerca por los servicios', m: ['La región es principalmente agrícola', 'Los servicios dominan claramente la economía', 'Los tres sectores aportan lo mismo'] }
      ] },
      { s: 'pibNacional', n: 'Sectores y comercio internacional', v: [
        { p: 'En 2022 el sector primario aportó 3.5% del PIB de México, el secundario 30.2% y el terciario 66.3%. ¿Qué afirmación es congruente con el comercio internacional del país?',
          b: 'El sector secundario es clave por la industria manufacturera de exportación', m: ['México es un país principalmente agroexportador', 'El sector terciario exporta sobre todo productos tecnológicos', 'El sector primario es el principal impulsor del comercio exterior'] }
      ] }
    ]
  });
})();
