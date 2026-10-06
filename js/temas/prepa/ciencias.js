/* Modo prepa - Ciencias experimentales: biologia, geografia y quimica
   (los reactivos 1 a 42 del area; la fisica, 43 a 60, esta en fisica.js) */
(function () {
  'use strict';
  var P = EJ.prepa;

  P.temaBanco({
    id: 'prepa-biologia',
    grupo: 'Ciencias experimentales',
    nombre: 'Biologia',
    descripcion: 'Origen de la vida, biomoleculas, taxonomia, celula, fotosintesis, division celular, herencia, evolucion y ecologia. Reactivos 1 a 14 del area.',
    etiquetas: ['celula', 'biomoleculas', 'mendel', 'evolucion', 'ecologia', 'fotosintesis'],
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
          b: ['oxígeno libre', 'coacervados'], m: [['hidrógeno', 'coacervados'], ['oxígeno libre', 'ribosomas'], ['metano', 'células eucariotas'], ['nitrógeno', 'virus']] }
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
        { p: '¿Qué biomolécula está formada por nucleótidos?', b: 'Ácidos nucleicos', m: ['Proteínas', 'Lípidos', 'Carbohidratos', 'Vitaminas'] }
      ] },
      { s: 'carbohidratos', n: 'Clasificacion de biomoleculas', v: [
        { p: 'De las siguientes opciones, elija aquella que corresponda a un monosacárido.', b: 'Glucosa', m: ['Almidón', 'Celulosa', 'Colesterol', 'Sacarosa', 'Glucógeno'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un polisacárido.', b: 'Almidón', m: ['Glucosa', 'Fructosa', 'Colesterol', 'Sacarosa', 'Galactosa'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un lípido.', b: 'Colesterol', m: ['Glucosa', 'Almidón', 'Hemoglobina', 'Celulosa', 'Queratina'] },
        { p: 'De las siguientes opciones, elija aquella que corresponda a un disacárido.', b: 'Sacarosa', m: ['Glucosa', 'Almidón', 'Celulosa', 'Fructosa', 'Glucógeno'] }
      ] },
      { s: 'taxonomia', n: 'Categorias taxonomicas', v: [
        { orden: 'Ordene las categorías taxonómicas de la más general a la más particular.', pasos: ['Reino', 'Clase', 'Familia', 'Género', 'Especie'] },
        { orden: 'Ordene las categorías taxonómicas de la más general a la más particular.', pasos: ['Dominio', 'Reino', 'Filo', 'Orden', 'Especie'] },
        { p: 'El nombre científico del jaguar es <i>Panthera onca</i>. ¿A qué categoría taxonómica corresponde la palabra <i>Panthera</i>?',
          b: 'Género', m: ['Especie', 'Familia', 'Orden', 'Reino'], ex: 'En la nomenclatura binomial la primera palabra es el género y la segunda el epíteto de la especie.' }
      ] },
      { s: 'organelos', n: 'Organelos celulares', v: [
        { rel: 'Relacione el organelo celular con el proceso que le corresponde.', cols: ['Organelo', 'Proceso'],
          pares: [['Cloroplasto', 'Fotosíntesis'], ['Mitocondria', 'Respiración celular y generación de energía'],
            ['Núcleo', 'Contiene el ADN responsable de la expresión genética'], ['Ribosoma', 'Síntesis de proteínas'],
            ['Lisosoma', 'Degradación de moléculas'], ['Aparato de Golgi', 'Empaque y distribución de proteínas']] },
        { p: '¿Qué organelo está presente en la célula vegetal pero NO en la célula animal?', b: 'Cloroplasto', m: ['Mitocondria', 'Ribosoma', 'Núcleo', 'Aparato de Golgi'] },
        { p: '¿Qué característica distingue a una célula procariota de una eucariota?', b: 'No tiene un núcleo definido por membrana',
          m: ['No tiene material genético', 'No tiene membrana celular', 'Siempre es más grande', 'Tiene mitocondrias y cloroplastos'] }
      ] },
      { s: 'respiracion', n: 'Respiracion celular', v: [
        { p: '¿Cuál es el proceso para extraer energía en forma de ATP de la glucosa de los alimentos que consumimos a diario?',
          b: 'Respiración celular', m: ['Fase oscura', 'Fotosíntesis', 'Respiración anaerobia', 'Digestión'] },
        { p: '¿Qué proceso realizan las levaduras para producir alcohol y CO<sub>2</sub> a partir de glucosa sin oxígeno?',
          b: 'Fermentación alcohólica', m: ['Fermentación láctica', 'Fotosíntesis', 'Respiración aerobia', 'Ciclo de Calvin'] },
        { p: '¿En qué organelo se realiza el ciclo de Krebs?', b: 'Mitocondria', m: ['Cloroplasto', 'Ribosoma', 'Núcleo', 'Lisosoma'] }
      ] },
      { s: 'fotosintesis', n: 'Fases de la fotosintesis', v: [
        { rel: 'Relacione la fase de la fotosíntesis con los procesos que le corresponden.', cols: ['Fase', 'Proceso'],
          pares: [['Luminosa', ['Absorción de luz por las moléculas de clorofila', 'Se realiza en los tilacoides del cloroplasto']],
            ['Oscura', ['Se usan el ATP y el NADPH para producir glucosa', 'Se realiza en el estroma del cloroplasto']]],
          extra: ['Como producto se libera dióxido de carbono'] },
        { c: 'En la fase ___ de la fotosíntesis se rompe la molécula de agua y se libera ___ a la atmósfera.',
          b: ['luminosa', 'oxígeno'], m: [['oscura', 'oxígeno'], ['luminosa', 'dióxido de carbono'], ['oscura', 'glucosa'], ['luminosa', 'nitrógeno']] }
      ] },
      { s: 'mitosis', n: 'Division celular', v: [
        { orden: '¿Cuál es el orden correcto de las fases de la mitosis?', pasos: ['Profase', 'Metafase', 'Anafase', 'Telofase'] },
        { p: '¿En qué fase de la mitosis los cromosomas se alinean en el centro (plano ecuatorial) de la célula?', b: 'Metafase', m: ['Profase', 'Anafase', 'Telofase', 'Interfase'] },
        { p: '¿Qué tipo de división celular produce gametos con la mitad de cromosomas?', b: 'Meiosis', m: ['Mitosis', 'Fisión binaria', 'Gemación', 'Citocinesis'] }
      ] },
      { s: 'caracteristicasVida', n: 'Caracteristicas de los seres vivos', v: [
        { p: 'La capacidad de las células de mantener estables sus condiciones internas (temperatura, pH, agua) aunque cambie el medio que las rodea es la:',
          b: 'homeostasis', m: ['irritabilidad', 'reproducción', 'organización', 'adaptación'] },
        { p: 'Una planta que dobla su tallo hacia la luz responde a un estímulo del ambiente. Esto es ejemplo de:',
          b: 'irritabilidad', m: ['homeostasis', 'reproducción', 'crecimiento', 'metabolismo'] },
        { p: 'El conjunto de reacciones químicas con las que un ser vivo obtiene energía y construye sus moléculas se llama:',
          b: 'metabolismo', m: ['homeostasis', 'irritabilidad', 'organización', 'evolución'] }
      ] },
      { s: 'mendel', n: 'Leyes de Mendel', v: [
        { p: 'Al cruzar una planta de semillas lisas (LL) con una de semillas rugosas (ll), toda la primera generación tiene semillas lisas (Ll). Este enunciado corresponde a la:',
          b: 'primera ley de Mendel', m: ['segunda ley de Mendel', 'tercera ley de Mendel', 'herencia ligada al sexo', 'adquisición de caracteres'] },
        { p: 'Al cruzar dos plantas Ll entre sí, aparecen en la descendencia plantas lisas y rugosas en proporción 3:1. Esto corresponde a la:',
          b: 'segunda ley de Mendel', m: ['primera ley de Mendel', 'tercera ley de Mendel', 'herencia ligada al sexo', 'codominancia'] },
        { p: 'Si se cruzan dos individuos heterocigotos (Aa × Aa), ¿qué proporción de la descendencia será homocigota recesiva (aa)?',
          b: '1/4', m: ['1/2', '3/4', '0', '1'], ex: 'Cuadro de Punnett: AA, Aa, Aa, aa → 1 de 4.' }
      ] },
      { s: 'evolucion', n: 'Teorias de la evolucion', v: [
        { p: '¿A qué teoría se refiere el texto?<br><i>Los seres vivos han evolucionado gradualmente; los individuos con variaciones favorables sobreviven y se reproducen más (selección natural), lo que puede originar nuevas especies.</i>',
          b: 'Darwinista', m: ['Catastrofista', 'Lamarckista', 'Creacionista', 'Fijista'] },
        { p: '¿A qué teoría se refiere el texto?<br><i>Los órganos que se usan se desarrollan y los que no se usan se atrofian, y estos caracteres adquiridos se heredan a la descendencia.</i>',
          b: 'Lamarckista', m: ['Darwinista', 'Sintética', 'Catastrofista', 'Fijista'] },
        { p: '¿A qué teoría se refiere el texto?<br><i>Une la selección natural de Darwin con la genética de Mendel y las mutaciones para explicar la evolución.</i>',
          b: 'Sintética', m: ['Lamarckista', 'Catastrofista', 'Creacionista', 'Fijista'] }
      ] },
      { s: 'poblacion', n: 'Propiedades de la poblacion', v: [
        { rel: 'Relacione la característica de la población con su descripción.', cols: ['Propiedad', 'Descripción'],
          pares: [['Mortalidad', 'Número de organismos que mueren en un tiempo y lugar determinados'],
            ['Migración', 'Desplazamiento de la población de una región a otra'],
            ['Natalidad', 'Número de organismos que nacen en un tiempo y lugar determinados'],
            ['Potencial biótico', 'Máxima capacidad de reproducción de una población en condiciones óptimas'],
            ['Resistencia ambiental', 'Conjunto de factores que limita el crecimiento de una población']] }
      ] },
      { s: 'interespecificas', n: 'Relaciones interespecificas', v: [
        { rel: 'Relacione la relación interespecífica con su definición.', cols: ['Relación', 'Definición'],
          pares: [['Competencia', 'Ambas especies se perjudican porque usan el mismo recurso'],
            ['Parasitismo', 'Una especie vive a costa de otra que sale perjudicada'],
            ['Mutualismo', 'Ambas especies salen beneficiadas'],
            ['Comensalismo', 'Una especie se beneficia y la otra no se beneficia ni se perjudica'],
            ['Depredación', 'Una especie caza y se alimenta de la otra']] },
        { p: 'La rémora se adhiere al tiburón y se alimenta de los restos de sus presas sin causarle daño. ¿Qué tipo de relación es?',
          b: 'Comensalismo', m: ['Mutualismo', 'Parasitismo', 'Competencia', 'Depredación'] }
      ] },
      { s: 'ecosistema', n: 'Flujo de energia y materia', v: [
        { c: 'El movimiento de energía en un ecosistema se representa mediante ___, donde sólo cerca del 10% de la energía pasa de un nivel a otro. El flujo de la materia se representa por ___ de elementos como el carbono, el nitrógeno y el fósforo.',
          b: ['la pirámide trófica', 'los ciclos biogeoquímicos'],
          m: [['la cadena trófica', 'los ciclos biológicos'], ['la red trófica', 'la pirámide trófica'], ['los ciclos biogeoquímicos', 'la red trófica'], ['la pirámide de edades', 'los ciclos lunares']] },
        { p: 'En una cadena alimenticia, ¿qué organismos son los productores?', b: 'Las plantas y algas que hacen fotosíntesis',
          m: ['Los herbívoros', 'Los carnívoros', 'Los hongos y bacterias descomponedores', 'Los omnívoros'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-geografia',
    grupo: 'Ciencias experimentales',
    nombre: 'Geografia',
    descripcion: 'Mapas y SIG, relieve y erosion, recursos naturales, fenomenos naturales, climas, poblacion, riesgos y territorio de Mexico. Reactivos 15 a 24 del area.',
    etiquetas: ['mapa', 'sig', 'erosion', 'recursos', 'clima', 'poblacion', 'riesgos'],
    items: [
      { s: 'mapa', n: 'Elementos del mapa', v: [
        { p: 'Además del título y la escala, ¿qué otros elementos deben estar siempre presentes en un mapa?', b: 'Simbología y coordenadas',
          m: ['Autor y simbología', 'Relieve y autor', 'Orientación y relieve', 'Fotografías y autor'] },
        { p: 'En un mapa, ¿qué elemento indica la relación entre las distancias del mapa y las distancias reales?', b: 'Escala',
          m: ['Simbología', 'Rosa de los vientos', 'Coordenadas', 'Título'] },
        { p: 'Las líneas imaginarias que van de polo a polo y sirven para medir la longitud son los:', b: 'meridianos',
          m: ['paralelos', 'trópicos', 'círculos polares', 'husos horarios'] }
      ] },
      { s: 'sig', n: 'Herramientas geograficas', v: [
        { p: '¿Qué herramienta geográfica permite crear consultas interactivas, analizar información espacial, editar datos y mapas y presentar los resultados de forma dinámica?',
          b: 'SIG (Sistema de Información Geográfica)', m: ['Carta topográfica', 'Croquis', 'Imagen de satélite', 'Brújula'] },
        { p: '¿Qué herramienta usa una red de satélites para determinar la posición exacta de un punto en la Tierra?',
          b: 'GPS', m: ['SIG', 'Croquis', 'Carta topográfica', 'Planisferio'] }
      ] },
      { s: 'erosion', n: 'Agentes que modelan el relieve', v: [
        { lista: 'Del siguiente listado, identifique los tipos de erosión que modelan el relieve terrestre.',
          si: ['Eólica', 'Marina', 'Fluvial', 'Glaciar'], no: ['Tectónica', 'Volcánica', 'Sísmica'] },
        { p: 'Las fuerzas que forman el relieve desde el interior de la Tierra (como el vulcanismo y el tectonismo) se llaman:',
          b: 'endógenas', m: ['exógenas', 'erosivas', 'eólicas', 'fluviales'] }
      ] },
      { s: 'recursos', n: 'Recursos naturales', v: [
        { rel: 'Relacione el tipo de recurso con sus ejemplos.', cols: ['Recurso', 'Ejemplo'],
          pares: [['Inagotables', 'Energía solar, energía eólica y geotérmica'], ['Renovables', 'Agua, flora y fauna'],
            ['No renovables', 'Minerales, metales e hidrocarburos']], extra: ['Vidrio, plástico y aluminio'] },
        { p: 'El petróleo y el gas natural son recursos:', b: 'no renovables', m: ['renovables', 'inagotables', 'biológicos', 'reciclables'] }
      ] },
      { s: 'fenomenos', n: 'Fenomenos naturales', v: [
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>El 20 de febrero de 1943 nació en un campo de cultivo de Michoacán el Paricutín, que con su actividad sepultó al pueblo de San Juan Parangaricutiro.</i>',
          b: 'Erupción volcánica', m: ['Depresión tropical', 'Heladas', 'Sismicidad', 'Inundación'] },
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>El 19 de septiembre de 1985 y el 19 de septiembre de 2017 la Ciudad de México sufrió el derrumbe de edificios por el movimiento brusco de las placas tectónicas.</i>',
          b: 'Sismicidad', m: ['Erupción volcánica', 'Huracán', 'Tsunami', 'Deslave'] },
        { p: '¿A qué tipo de fenómeno se refiere el texto?<br><i>En 2005, Wilma llegó a la península de Yucatán con vientos de más de 200 km/h y lluvias intensas durante varios días.</i>',
          b: 'Ciclón tropical (huracán)', m: ['Sismicidad', 'Erupción volcánica', 'Sequía', 'Helada'] }
      ] },
      { s: 'sectores', n: 'Actividades economicas afectadas', v: [
        { p: 'El derrame de ácido sulfúrico en el mar de Cortés en 2019 dañó la flora y la fauna marinas. Esto afectó principalmente al sector:',
          b: 'pesquero', m: ['agrícola', 'ganadero', 'industrial', 'forestal'] },
        { p: 'Una sequía prolongada en el norte del país que impide sembrar maíz y frijol afecta principalmente al sector:',
          b: 'agrícola', m: ['pesquero', 'turístico', 'industrial', 'minero'] }
      ] },
      { s: 'clima', n: 'Tipos de clima', v: [
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Manzanillo, Colima, la temperatura media es superior a 18 °C todo el año y la mayor parte de la lluvia cae en verano.</i>',
          b: 'Aw - Tropical con lluvias en verano', m: ['Af - Tropical con lluvias todo el año', 'Cf - Templado con lluvias todo el año', 'Cw - Templado con lluvias en verano', 'BW - Seco desértico'] },
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Sonora y Baja California casi no llueve durante el año y en el día hace mucho calor.</i>',
          b: 'BW - Seco desértico', m: ['Aw - Tropical con lluvias en verano', 'Cw - Templado con lluvias en verano', 'Af - Tropical con lluvias todo el año', 'ET - Frío de tundra'] },
        { p: '¿Qué tipo de clima describe el texto?<br><i>En Toluca la temperatura es fresca la mayor parte del año (media entre 12 y 18 °C) y llueve sobre todo en verano.</i>',
          b: 'Cw - Templado con lluvias en verano', m: ['Aw - Tropical con lluvias en verano', 'BW - Seco desértico', 'Af - Tropical con lluvias todo el año', 'Cf - Templado con lluvias todo el año'] }
      ] },
      { s: 'demografia', n: 'Indicadores demograficos', v: [
        { p: 'Los indicadores demográficos describen el comportamiento de la población. Todos los siguientes son indicadores demográficos, excepto:',
          b: 'morbilidad', m: ['fecundidad', 'migración', 'natalidad', 'mortalidad'], ex: 'La morbilidad (proporción de enfermos) es un indicador de salud, no demográfico.' },
        { p: 'El número de nacimientos por cada mil habitantes en un año es la tasa de:', b: 'natalidad', m: ['mortalidad', 'fecundidad', 'migración', 'morbilidad'] }
      ] },
      { s: 'riesgos', n: 'Riesgos geologicos', v: [
        { lista: 'Del siguiente listado, identifique los fenómenos geológicos que ponen en riesgo a las personas.',
          si: ['Erupción volcánica', 'Deslizamiento de laderas', 'Tsunami', 'Sismo'], no: ['Explosión por sustancias inflamables', 'Fuga de sustancias tóxicas', 'Residuos biológicos', 'Huracán'] },
        { lista: 'Del siguiente listado, identifique los fenómenos hidrometeorológicos.',
          si: ['Huracán', 'Inundación', 'Granizada', 'Sequía'], no: ['Sismo', 'Erupción volcánica', 'Incendio industrial', 'Deslizamiento de laderas'] }
      ] },
      { s: 'territorio', n: 'Territorio de Mexico', v: [
        { p: '¿Cómo se llama la franja de mar que se extiende hasta 370 km (200 millas náuticas) desde la costa, donde México puede pescar y aprovechar los recursos?',
          b: 'Zona Económica Exclusiva', m: ['Mar territorial', 'Superficie insular', 'Superficie continental', 'Plataforma continental'] },
        { p: '¿Cuántas millas náuticas, medidas desde la costa, abarca el mar territorial de México?', b: '12 millas náuticas',
          m: ['200 millas náuticas', '24 millas náuticas', '370 millas náuticas', '50 millas náuticas'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-quimica',
    grupo: 'Ciencias experimentales',
    nombre: 'Quimica',
    descripcion: 'Atomo, tabla periodica, estados de la materia, mezclas, oxido-reduccion, acidos y bases, enlaces, gases y quimica organica. Reactivos 25 a 42 del area.',
    etiquetas: ['atomo', 'tabla periodica', 'enlace', 'redox', 'acido', 'gas ideal', 'organica'],
    formulario: 'PV = nRT, R = 0.0821 atm&middot;L/(mol&middot;K) &nbsp;&middot;&nbsp; pH &lt; 7 &aacute;cido, pH = 7 neutro, pH &gt; 7 b&aacute;sico',
    items: [
      { s: 'particulas', n: 'Particulas del atomo', v: [
        { rel: 'Relacione las partículas con sus características.', cols: ['Partícula', 'Característica'],
          pares: [['Protón', ['Determina el número atómico', 'Tiene carga positiva']],
            ['Neutrón', ['Tiene masa, pero no tiene carga', 'Si varía su número se forman isótopos']],
            ['Electrón', ['Se distribuye en niveles de energía', 'Interactúa para formar enlaces químicos']]] },
        { p: 'Un átomo de sodio tiene número atómico 11 y número de masa 23. ¿Cuántos neutrones tiene?', b: '12', m: ['11', '23', '34', '22'],
          ex: 'Neutrones = masa − número atómico = 23 − 11 = 12.' }
      ] },
      { s: 'bohr', n: 'Modelo de Bohr', v: [
        { c: 'En el modelo de Bohr, cuando un electrón absorbe energía pasa a ___ y cuando libera energía (emite un fotón) pasa a ___, quedando más cerca del núcleo.',
          b: ['un nivel de energía mayor', 'un nivel de energía menor'],
          m: [['un nivel de energía menor', 'un nivel de energía mayor'], ['ganar energía', 'perder energía'], ['otro átomo', 'el núcleo'], ['un nivel de energía mayor', 'otro átomo']] },
        { p: '¿Qué científico propuso un modelo del átomo con un núcleo pequeño y denso, a partir del experimento con la lámina de oro?', b: 'Rutherford',
          m: ['Bohr', 'Dalton', 'Thomson', 'Schrödinger'] }
      ] },
      { s: 'octeto', n: 'Gases nobles y octeto', v: [
        { c: 'El ___ pertenece al grupo de los gases nobles, que casi no reaccionan porque en su último nivel de energía cumplen con ___, lo que les da gran estabilidad.',
          b: ['neón', 'la regla del octeto'], m: [['neón', 'la regla de Hund'], ['hidrógeno', 'el principio de exclusión de Pauli'], ['hidrógeno', 'la regla del octeto'], ['sodio', 'la regla del octeto']] },
        { p: '¿Cuántos electrones de valencia tienen los elementos del grupo 1 (metales alcalinos)?', b: '1', m: ['2', '7', '8', '0'] }
      ] },
      { s: 'tablaPeriodica', n: 'Tabla periodica', v: [
        { c: 'El Zn y el Fe son ___ que se caracterizan por tener incompleto el subnivel ___ de su configuración electrónica.',
          b: ['metales de transición', 'd'], m: [['metaloides', 'f'], ['metales de transición', 'p'], ['metaloides', 's'], ['gases nobles', 'd']] },
        { p: 'En la tabla periódica, los elementos de un mismo grupo (columna) tienen el mismo número de:', b: 'electrones de valencia',
          m: ['neutrones', 'niveles de energía', 'protones', 'isótopos'] }
      ] },
      { s: 'cambiosEstado', n: 'Cambios de estado', v: [
        { rel: 'Relacione el cambio de estado con su descripción.', cols: ['Cambio', 'Descripción'],
          pares: [['Fusión', 'De sólido a líquido'], ['Evaporación', 'De líquido a gas'], ['Condensación', 'De gas a líquido'],
            ['Solidificación', 'De líquido a sólido'], ['Sublimación', 'De sólido a gas sin pasar por líquido']] },
        { p: 'El hielo seco (CO<sub>2</sub> sólido) pasa directamente a gas. ¿Cómo se llama este cambio de estado?', b: 'Sublimación', m: ['Fusión', 'Evaporación', 'Condensación', 'Deposición'] }
      ] },
      { s: 'estados', n: 'Estados de la materia', v: [
        { p: '¿En qué estado de la materia las sustancias pueden fluir, tienen volumen fijo y toman la forma del recipiente que las contiene?', b: 'Líquido', m: ['Gaseoso', 'Plasma', 'Sólido'] },
        { p: '¿En qué estado de la materia las partículas están muy separadas, se mueven libremente y la sustancia ocupa todo el volumen del recipiente?', b: 'Gaseoso', m: ['Líquido', 'Sólido', 'Plasma'] }
      ] },
      { s: 'mezclas', n: 'Mezclas y disoluciones', v: [
        { p: 'Las disoluciones son mezclas homogéneas compuestas por un:', b: 'soluto y un disolvente', m: ['disoluto y un soluto', 'solvente y un disolvente', 'soluto y una disolución'] },
        { p: '¿Cuál de las siguientes es una mezcla heterogénea?', b: 'Agua con aceite', m: ['Agua con sal disuelta', 'Aire limpio', 'Refresco sin gas', 'Acero'] },
        { p: '¿Qué método separa una mezcla de agua y sal?', b: 'Evaporación', m: ['Imantación', 'Decantación', 'Tamizado', 'Filtración'] }
      ] },
      { s: 'compuesto', n: 'Elementos y compuestos', v: [
        { c: 'Un ___ es una sustancia pura que al ___ por métodos químicos da lugar a dos o más elementos unidos en una proporción constante.',
          b: ['compuesto', 'descomponerse'], m: [['átomo', 'mezclarse'], ['ion', 'descomponerse'], ['metal', 'mezclarse'], ['elemento', 'descomponerse']] },
        { p: '¿Cuál de las siguientes sustancias es un elemento?', b: 'Oro (Au)', m: ['Agua (H<sub>2</sub>O)', 'Sal (NaCl)', 'Aire', 'Dióxido de carbono (CO<sub>2</sub>)'] }
      ] },
      { s: 'oxidante', n: 'Agente oxidante', v: [
        { p: 'Determine el agente oxidante en la reacción:<br>Cu + 2AgNO<sub>3</sub> &rarr; 2Ag + Cu(NO<sub>3</sub>)<sub>2</sub>', b: 'Ag<sup>+</sup>', m: ['Cu', 'O<sup>2&minus;</sup>', 'N<sup>5+</sup>'],
          ex: 'La plata pasa de +1 a 0: gana electrones, se reduce, y por eso es el agente oxidante.' },
        { p: 'Determine el agente reductor en la reacción:<br>Zn + CuSO<sub>4</sub> &rarr; ZnSO<sub>4</sub> + Cu', b: 'Zn', m: ['Cu<sup>2+</sup>', 'S<sup>6+</sup>', 'O<sup>2&minus;</sup>'],
          ex: 'El zinc pasa de 0 a +2: pierde electrones, se oxida, y por eso es el agente reductor.' }
      ] },
      { s: 'seOxida', n: 'Elemento que se oxida', v: [
        { p: '¿Qué elemento se oxida en la reacción?<br>2HNO<sub>3</sub> + 6HBr &rarr; 3Br<sub>2</sub> + 2NO + 4H<sub>2</sub>O<br><small>Considere O: &minus;2 y H: +1.</small>', b: 'Br', m: ['O', 'H', 'N'],
          ex: 'El bromo pasa de −1 (en HBr) a 0 (en Br₂): pierde electrones.' },
        { p: '¿Qué elemento se reduce en la reacción?<br>Fe<sub>2</sub>O<sub>3</sub> + 3CO &rarr; 2Fe + 3CO<sub>2</sub>', b: 'Fe', m: ['C', 'O', 'Ninguno: no hay cambios de estado de oxidación'],
          ex: 'El hierro pasa de +3 a 0: gana electrones.' }
      ] },
      { s: 'neutralizacion', n: 'Neutralizacion', v: [
        { p: '¿Qué compuestos resultan de la neutralización entre HNO<sub>3</sub> y NaOH?', b: 'NaNO<sub>3</sub> y H<sub>2</sub>O', m: ['HNO<sub>3</sub> y O', 'N y H<sub>2</sub>O', 'NO<sub>3</sub> y H<sub>2</sub>'] },
        { p: '¿Qué compuestos resultan de la neutralización entre HCl y KOH?', b: 'KCl y H<sub>2</sub>O', m: ['KH y ClO', 'K y HClO', 'Cl<sub>2</sub> y H<sub>2</sub>'] }
      ] },
      { s: 'acidoBase', n: 'Acidos y bases', v: [
        { p: 'Según Brønsted-Lowry, un ácido es una sustancia que:', b: 'dona protones (H<sup>+</sup>)', m: ['acepta protones (H<sup>+</sup>)', 'dona electrones', 'libera OH<sup>&minus;</sup> en agua siempre'] },
        { p: 'En la reacción HNO<sub>2</sub> + H<sub>2</sub>O &rlarr; H<sub>3</sub>O<sup>+</sup> + NO<sub>2</sub><sup>&minus;</sup>, ¿cuál es la base conjugada?',
          b: 'NO<sub>2</sub><sup>&minus;</sup>', m: ['HNO<sub>2</sub>', 'H<sub>2</sub>O', 'H<sub>3</sub>O<sup>+</sup>'] }
      ] },
      { s: 'ph', n: 'Escala de pH', v: [
        { p: 'Identifique la sustancia ácida según su ubicación en la escala de pH.', b: 'Refresco de cola (pH &asymp; 2.5)', m: ['Agua pura (pH = 7)', 'Amoniaco (pH &asymp; 11)', 'Sangre (pH &asymp; 7.4)'] },
        { p: 'Identifique la sustancia básica según su ubicación en la escala de pH.', b: 'Blanqueador (pH &asymp; 12.5)', m: ['Jugo de limón (pH &asymp; 2)', 'Vinagre (pH &asymp; 3)', 'Agua pura (pH = 7)'] }
      ] },
      { s: 'enlaces', n: 'Tipos de enlace', v: [
        { c: 'El enlace metálico se da entre metales, el enlace covalente se da entre elementos ___, mientras que el enlace iónico se forma por la combinación ___.',
          b: ['no metálicos', 'de un metal con un no metal'], m: [['metálicos', 'entre no metales'], ['no metálicos', 'de metales'], ['metálicos', 'de un metal con un no metal'], ['gaseosos', 'de dos gases nobles']] },
        { p: 'El cloruro de sodio (NaCl) se forma por transferencia de un electrón del sodio al cloro. ¿Qué tipo de enlace es?', b: 'Iónico', m: ['Covalente no polar', 'Metálico', 'Puente de hidrógeno'] }
      ] },
      { s: 'caracEnlaces', n: 'Caracteristicas de los enlaces', v: [
        { rel: 'Relacione los tipos de enlace con sus características.', cols: ['Tipo de enlace', 'Característica'],
          pares: [['Covalente', ['Se forma entre dos no metales', 'Comparte electrones']],
            ['Iónico', ['La diferencia de electronegatividad es mayor que 1.7', 'Forma iones']],
            ['Metálico', ['Forma aleaciones', 'Forma una nube electrónica']]] }
      ] },
      { s: 'gasIdeal', n: 'Ley del gas ideal', v: (function () {
        var vs = [];
        [[40, 50, 298], [20, 10, 300], [10, 5, 273], [25, 4, 310]].forEach(function (d) {
          var n = d[1] * d[0] / (0.0821 * d[2]);
          vs.push({ p: '¿Cuántos moles de nitrógeno hay en un tanque de ' + d[0].toFixed(2) + ' L que está a ' + d[1].toFixed(2) + ' atm de presión y a ' + d[2].toFixed(2) + ' K?<br><small>Considere R = 0.0821 atm&middot;L/(mol&middot;K).</small>',
            b: n.toFixed(2) + ' mol', m: [(d[1] / (d[0] * 0.0821 * d[2])).toFixed(2) + ' mol', (d[1] * d[0] * 0.0821 / d[2]).toFixed(2) + ' mol', (d[1] * d[0] / 0.0821).toFixed(2) + ' mol', (d[0] * 0.0821 * d[2] / d[1]).toFixed(2) + ' mol'],
            ex: 'n = PV / RT = (' + d[1] + ')(' + d[0] + ') / (0.0821 × ' + d[2] + ') = ' + n.toFixed(2) + ' mol' });
        });
        return vs;
      })() },
      { s: 'grupoFuncional', n: 'Grupos funcionales', v: [
        { rel: 'Relacione el grupo funcional con su estructura.', cols: ['Grupo funcional', 'Estructura'],
          pares: [['Hidroxilo (alcohol)', 'R&ndash;OH'], ['Carboxilo (ácido carboxílico)', 'R&ndash;COOH'], ['Carbonilo de aldehído', 'R&ndash;CHO'],
            ['Alcoxi (éter)', 'R&ndash;O&ndash;R&prime;'], ['Amino (amina)', 'R&ndash;NH<sub>2</sub>']] }
      ] },
      { s: 'nomenclatura', n: 'Nomenclatura organica', v: [
        { p: '¿A qué grupo funcional pertenece el propanal?', b: 'Aldehído', m: ['Alcohol', 'Éster', 'Éter', 'Cetona'], ex: 'La terminación -al indica aldehído.' },
        { p: '¿A qué grupo funcional pertenece el etanol?', b: 'Alcohol', m: ['Aldehído', 'Éter', 'Cetona', 'Ácido carboxílico'], ex: 'La terminación -ol indica alcohol.' },
        { p: '¿A qué grupo funcional pertenece la propanona (acetona)?', b: 'Cetona', m: ['Aldehído', 'Alcohol', 'Éter', 'Éster'], ex: 'La terminación -ona indica cetona.' },
        { p: '¿A qué grupo funcional pertenece el ácido etanoico (ácido acético)?', b: 'Ácido carboxílico', m: ['Aldehído', 'Alcohol', 'Cetona', 'Éter'] }
      ] }
    ]
  });
})();
