/* Modo prepa - Introduccion al trabajo (20 reactivos) y la capacitacion de
   Recursos humanos (40 reactivos): Ley Federal del Trabajo, administracion,
   reclutamiento, nomina y seguridad e higiene.

   Criterios de la Ley Federal del Trabajo que se usan en las cuentas:
   - salario diario = salario mensual / 30
   - vacaciones (reforma 2023): 1 año 12 dias, 2 años 14, 3 años 16, 4 años 18, 5 años 20
   - prima vacacional: 25% del salario de los dias de vacaciones
   - aguinaldo: 15 dias de salario, proporcional a los dias trabajados (/365)
   - horas extra: las primeras 9 de la semana se pagan al doble */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* $2,989.73 */
  function pesos(v) {
    var s = (Math.round(v * 100) / 100).toFixed(2).split('.');
    return '$' + s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + s[1];
  }
  var VAC = { 1: 12, 2: 14, 3: 16, 4: 18, 5: 20 };

  /* tabla mensual del ISR (Anexo 8, RMF 2025): limite inferior, cuota fija, % */
  var ISR = [[0.01, 0, 1.92], [746.05, 14.32, 6.40], [6332.06, 371.83, 10.88], [11128.02, 893.63, 16.00], [12935.83, 1182.88, 17.92], [15487.72, 1640.18, 21.36]];
  function isr(base) {
    var fila = ISR[0];
    ISR.forEach(function (f) { if (base >= f[0]) fila = f; });
    return { fila: fila, valor: fila[1] + (base - fila[0]) * fila[2] / 100 };
  }
  function tablaISR() {
    var h = '<table class="tabla"><tr><th>Límite inferior</th><th>Límite superior</th><th>Cuota fija</th><th>% sobre excedente</th></tr>';
    for (var i = 1; i < ISR.length - 1; i++) {
      h += '<tr><td>' + pesos(ISR[i][0]) + '</td><td>' + pesos(ISR[i + 1][0] - 0.01) + '</td><td>' + pesos(ISR[i][1]) + '</td><td>' + ISR[i][2].toFixed(2) + '%</td></tr>';
    }
    return h + '</table><small>Tarifa mensual del ISR (fragmento).</small><br>';
  }

  var NOMBRES = ['Alfredo', 'Norma', 'Jesús', 'Emilia', 'Roberto', 'Luis', 'Patricia', 'Andrea', 'Mario', 'Karla'];

  P.temaBanco({
    id: 'prepa-introTrabajo',
    grupo: 'Introduccion al trabajo',
    nombre: 'Introduccion al trabajo',
    descripcion: 'Destrezas, sectores, plan de vida, reclutamiento, documentos, tipos de contratacion y trabajador, y derechos y obligaciones de la Ley Federal del Trabajo. Los 20 reactivos del area.',
    etiquetas: ['ley federal del trabajo', 'aguinaldo', 'vacaciones', 'curp', 'nss', 'ptu', 'contrato'],
    formulario: 'Jornada diurna: 8 h, nocturna: 7 h, mixta: 7.5 h &nbsp;&middot;&nbsp; Aguinaldo: 15 días mínimo<br>Vacaciones: 1 año 12 días, 2 años 14, 3 años 16, 4 años 18, 5 años 20 &nbsp;&middot;&nbsp; PTU: 10% de las utilidades',
    items: [
      { s: 'destreza', n: 'Destrezas', v: [
        { p: 'Las destrezas son habilidades específicas para realizar una actividad. ¿Cuál opción describe una destreza deportiva?', b: 'Ejecutar movimientos precisos como driblar un balón',
          m: ['Desarrollar fuerza muscular con pesas', 'Tener una mentalidad competitiva', 'Tener una excelente condición física'] },
        { p: '¿Cuál de las siguientes es una destreza de un carpintero?', b: 'Cortar y ensamblar piezas de madera con precisión', m: ['Tener buena salud', 'Ser puntual', 'Querer ganar más dinero'] }
      ] },
      { s: 'sectores', n: 'Sectores economicos', v: [
        { p: '¿Cuál opción describe una característica del sector de servicios?', b: 'Proveer transporte, educación, turismo y comercio',
          m: ['Realizar actividades como la pesca, la minería y la agricultura', 'Transformar materias primas en productos terminados', 'Diseñar productos en laboratorios especializados'] },
        { p: 'La transformación de materias primas en productos terminados corresponde al sector:', b: 'secundario', m: ['primario', 'terciario', 'cuaternario'] }
      ] },
      { s: 'planVida', n: 'Plan de vida ocupacional', v: [
        { p: '¿Qué característica tiene la estructura de un plan de vida ocupacional?', b: 'Diseñar estrategias para equilibrar actividades laborales, personales y recreativas',
          m: ['Concentrarse sólo en obtener experiencia en empresas de prestigio', 'Fijar únicamente la carrera universitaria', 'Priorizar sólo el ahorro y la inversión'] }
      ] },
      { s: 'fuentes', n: 'Fuentes de reclutamiento', v: [
        { p: 'Es el lugar de origen donde se encuentran los recursos humanos que necesita una empresa para cubrir sus vacantes:', b: 'Fuentes de reclutamiento', m: ['Bolsa de trabajo', 'Medios de reclutamiento', 'Medios digitales'] },
        { p: 'Los anuncios en periódicos, carteles y redes sociales que usa una empresa para dar a conocer una vacante son:', b: 'medios de reclutamiento', m: ['fuentes de reclutamiento', 'pruebas psicométricas', 'contratos'] }
      ] },
      { s: 'curriculum', n: 'Documentos para el empleo', v: [
        { p: '¿Qué documento reúne los estudios, méritos, cargos y experiencia laboral de una persona?', b: 'Currículum vitae', m: ['Carta de presentación', 'Carta de recomendación', 'Solicitud de empleo'] },
        { p: '¿Qué documento escribe una persona que conoce tu trabajo para avalar tu desempeño ante otra empresa?', b: 'Carta de recomendación', m: ['Currículum vitae', 'Carta de presentación', 'Contrato'] }
      ] },
      { s: 'pruebas', n: 'Pruebas de seleccion', v: [
        { p: 'Un candidato tuvo puntajes altos en razonamiento verbal y matemático, pero su desempeño laboral no lo refleja. ¿Qué prueba adicional puede explicar la diferencia?', b: 'De personalidad', m: ['De habilidad', 'De inteligencia', 'De interés'] },
        { p: '¿Qué prueba mide la capacidad de razonamiento y aprendizaje de un candidato?', b: 'De inteligencia', m: ['De personalidad', 'De interés', 'Médica'] }
      ] },
      { s: 'nss', n: 'Numero de Seguridad Social', v: [
        { p: '¿Qué función tiene el Número de Seguridad Social (NSS)?', b: 'Inscribir a los trabajadores al sistema de pensiones y servicios de salud',
          m: ['Emitir permisos laborales', 'Obtener sólo créditos hipotecarios', 'Registrar a los empleados sólo en la nómina'] }
      ] },
      { s: 'curp', n: 'CURP y RFC', v: [
        { p: 'Código alfanumérico único de identidad que permite registrar de forma individual a todas las personas que residen en México:', b: 'CURP', m: ['Credencial para votar', 'Número de Seguridad Social', 'RFC'] },
        { p: 'Clave con la que el SAT identifica a las personas que pagan impuestos:', b: 'RFC', m: ['CURP', 'NSS', 'INE'] }
      ] },
      { s: 'contratacion', n: 'Tipos de contratacion', v: [
        { p: 'Alfonsina fue contratada para impartir un curso de cuatro meses y cobra por el servicio profesional. ¿Qué tipo de contratación es?', b: 'Honorarios', m: ['Sindicalizado', 'Subempleo', 'Subcontratación'] },
        { p: 'Una empresa contrata a otra para que le preste personal de limpieza. ¿Qué tipo de contratación es?', b: 'Subcontratación', m: ['Honorarios', 'Sindicalizado', 'Por obra determinada'] }
      ] },
      { s: 'tipoTrabajador', n: 'Tipos de trabajador', v: [
        { p: 'Alejandro es estudiante y sólo trabaja durante las vacaciones. Es un trabajador:', b: 'de temporada', m: ['a destajo', 'de confianza', 'de base'] },
        { p: 'Ana cobra según el número de piezas que cose al día. Es una trabajadora:', b: 'a destajo', m: ['de temporada', 'de confianza', 'de base'] }
      ] },
      { s: 'vacaciones', n: 'Vacaciones', v: [
        { p: 'Javier cumplió 3 años en la empresa. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 16, m: [10, 12, 14, 18] },
        { p: 'Lucía cumplió su primer año de trabajo. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 12, m: [6, 10, 14, 15] },
        { p: 'Marcos cumplió 5 años en la empresa. ¿Cuántos días de vacaciones le corresponden según la Ley Federal del Trabajo?', b: 20, m: [14, 16, 18, 22] }
      ] },
      { s: 'jornada', n: 'Jornada de trabajo', v: [
        { p: '¿Cuál es la duración máxima legal de la jornada de trabajo diurna?', b: '8 h', m: ['6 h', '7 h', '9 h'] },
        { p: '¿Cuál es la duración máxima legal de la jornada de trabajo nocturna?', b: '7 h', m: ['6 h', '8 h', '7.5 h'] },
        { p: '¿Cuál es la duración máxima legal de la jornada mixta?', b: '7.5 h', m: ['6 h', '7 h', '8 h'] }
      ] },
      { s: 'salario', n: 'Tipos de salario', v: [
        { p: 'Remuneración que se integra por el pago en efectivo por cuota diaria más las demás prestaciones que recibe el trabajador:', b: 'Salario diario integrado', m: ['Salario nominal', 'Salario profesional', 'Salario mínimo'] },
        { p: 'La cantidad de dinero que se le paga al trabajador, sin considerar lo que puede comprar con ella, es el salario:', b: 'nominal', m: ['real', 'integrado', 'mínimo'] }
      ] },
      { s: 'aguinaldo', n: 'Aguinaldo', v: [
        { p: 'De acuerdo con la Ley Federal del Trabajo, ¿cuántos días de salario debe recibir como mínimo un trabajador por concepto de aguinaldo anual?', b: 15, m: [12, 13, 14, 30] },
        { p: '¿Antes de qué fecha debe pagarse el aguinaldo?', b: '20 de diciembre', m: ['1 de diciembre', '31 de diciembre', '6 de enero'] }
      ] },
      { s: 'ptu', n: 'Reparto de utilidades', v: [
        { p: '¿Qué afirmación describe correctamente la PTU (participación de los trabajadores en las utilidades)?', b: 'Corresponde al 10% de las utilidades y se reparte dentro de los 60 días siguientes a la declaración anual',
          m: ['Corresponde al 15% de las utilidades y se paga antes de 90 días', 'Corresponde al 5% y se paga antes de 30 días', 'Sólo la reciben empresas con más de 100 trabajadores'] }
      ] },
      { s: 'exceptuados', n: 'Exceptuados de la PTU', v: [
        { p: 'Según la Ley Federal del Trabajo, ¿qué trabajadores NO participan en el reparto de utilidades?', b: 'Los directores, administradores y gerentes generales',
          m: ['Los contratados por menos de tres meses', 'Los de empresas con menos de 50 empleados', 'Los trabajadores sindicalizados'] }
      ] },
      { s: 'obligaciones', n: 'Obligaciones', v: [
        { p: 'Cumplir con las disposiciones de las normas de trabajo es una obligación del:', b: 'patrón', m: ['sindicato', 'socio', 'cliente'] },
        { p: 'Ejecutar el trabajo con la intensidad, cuidado y esmero apropiados es una obligación del:', b: 'trabajador', m: ['patrón', 'sindicato', 'gobierno'] }
      ] },
      { s: 'prohibiciones', n: 'Prohibiciones', v: [
        { p: 'Una empresa obliga a todos sus trabajadores a asistir a una misa por su aniversario. Este acto se considera dentro de las:', b: 'prohibiciones de los patrones',
          m: ['obligaciones de los trabajadores', 'prohibiciones de los trabajadores', 'obligaciones de los patrones'] },
        { p: 'Presentarse al trabajo en estado de embriaguez está dentro de las:', b: 'prohibiciones de los trabajadores', m: ['obligaciones de los patrones', 'prohibiciones de los patrones', 'obligaciones de los trabajadores'] }
      ] },
      { s: 'suspension', n: 'Suspension y rescision', v: [
        { p: '¿Qué distingue la suspensión de la relación de trabajo de la rescisión?', b: 'La suspensión la interrumpe temporalmente; la rescisión la termina de forma definitiva',
          m: ['La suspensión es por acuerdo mutuo y la rescisión es siempre una sanción', 'Ambas tienen los mismos efectos', 'La suspensión sólo se aplica por revelar secretos'] }
      ] },
      { s: 'rescision', n: 'Causas de rescision', v: [
        { p: '¿Cuál de las siguientes es una causa de rescisión con efecto sancionatorio hacia el trabajador?', b: 'Falta de honradez', m: ['Incapacidad física', 'Muerte del trabajador', 'Prisión preventiva'] },
        { p: '¿Cuál de las siguientes es una causa de terminación de la relación de trabajo, sin culpa del trabajador?', b: 'La muerte del trabajador', m: ['Falta de honradez', 'Faltar más de tres días en un mes sin permiso', 'Revelar secretos de la empresa'] }
      ] }
    ]
  });

  /* ---------- Recursos humanos: preguntas de nomina con datos al azar ---------- */
  function aguinaldoProp(r) {
    var q = r.elige(NOMBRES), dias = r.entero(120, 340), mensual = r.entero(25, 90) * 200;
    var diario = mensual / 30, v = diario * 15 * dias / 365;
    return { p: 'Si ' + q + ' lleva trabajando ' + dias + ' días en su empresa con un sueldo mensual de ' + pesos(mensual) + ', ¿cuánto le pagarán de aguinaldo?',
      b: v, m: [diario * 15, mensual * dias / 365 / 2.5, (mensual / 31) * 15 * dias / 365, diario * 12 * dias / 365], fmt: pesos,
      ex: 'Salario diario = ' + pesos(mensual) + ' / 30 = ' + pesos(diario) + '; aguinaldo = 15 × ' + pesos(diario) + ' × ' + dias + ' / 365 = ' + pesos(v) };
  }
  function primaVac(r) {
    var anios = r.entero(1, 4), mensual = r.entero(30, 90) * 200, diario = mensual / 30, dv = VAC[anios];
    var v = diario * dv * 0.25;
    return { p: '¿Cuánto pagará de prima vacacional una empresa que otorga las prestaciones mínimas de ley a un empleado con sueldo mensual de ' + pesos(mensual) + ' y ' + anios + (anios === 1 ? ' año cumplido' : ' años cumplidos') + '?',
      b: v, m: [diario * dv, (mensual / 31) * dv * 0.25, diario * dv * 0.5, mensual * 0.25], fmt: pesos,
      ex: 'Le tocan ' + dv + ' días de vacaciones; prima = 25% × ' + dv + ' × ' + pesos(diario) + ' = ' + pesos(v) };
  }
  function horasExtra(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(30, 90) * 200, h = r.entero(2, 9);
    var hora = mensual / 30 / 8, v = hora * h * 2;
    return { p: q + ' tiene una jornada diurna de 8 horas y un sueldo mensual de ' + pesos(mensual) + '. Si esta semana trabajó ' + h + ' horas extra, ¿cuánto le pagarán por ellas?',
      b: v, m: [hora * h, hora * h * 3, (mensual / 31 / 8) * h * 2, (mensual / 31 / 8) * h], fmt: pesos,
      ex: 'Hora normal = ' + pesos(mensual) + ' / 30 / 8 = ' + pesos(hora) + '; las primeras 9 horas extra se pagan al doble: ' + h + ' × 2 × ' + pesos(hora) + ' = ' + pesos(v) };
  }
  function cuotaSindical(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(30, 90) * 200, pct = r.elige([1, 2, 3, 4]), v = mensual * pct / 100 / 2;
    return { p: q + ' gana ' + pesos(mensual) + ' al mes y el sindicato le descuenta ' + pct + '% de cuota sindical. ¿Cuánto se le descuenta por quincena?',
      b: v, m: [v * 2, mensual / 31 * 15 * pct / 100, v / 2, mensual * pct / 100 / 31 * 7], fmt: pesos,
      ex: pct + '% de ' + pesos(mensual) + ' = ' + pesos(v * 2) + ' al mes; por quincena, la mitad: ' + pesos(v) };
  }
  function faltaSemana(r) {
    var q = r.elige(NOMBRES), d = r.entero(25, 60) * 10, v = d * 7 - d - d / 6;
    return { p: q + ' gana ' + pesos(d) + ' diarios. Si faltó un día sin justificar, ¿cuánto recibirá esa semana? (Se descuenta el día y la parte proporcional del séptimo día.)',
      b: v, m: [d * 7, d * 6, d * 5, d * 7 - d / 6], fmt: pesos,
      ex: 'Semana completa: 7 × ' + pesos(d) + ' = ' + pesos(7 * d) + '; menos el día (' + pesos(d) + ') y 1/6 del séptimo día (' + pesos(d / 6) + ') = ' + pesos(v) };
  }
  function isrMensual(r) {
    var q = r.elige(NOMBRES), mensual = r.entero(35, 64) * 200, t = isr(mensual);
    var exced = mensual - t.fila[0];
    return { p: tablaISR() + 'Si ' + q + ' gana ' + pesos(mensual) + ' mensuales, ¿cuánto le retendrán de ISR?',
      b: t.valor, m: [exced * t.fila[2] / 100, t.fila[1], mensual * t.fila[2] / 100, t.fila[1] + mensual * t.fila[2] / 100], fmt: pesos,
      ex: 'Excedente: ' + pesos(mensual) + ' − ' + pesos(t.fila[0]) + ' = ' + pesos(exced) + '; × ' + t.fila[2] + '% = ' + pesos(exced * t.fila[2] / 100) + '; más la cuota fija ' + pesos(t.fila[1]) + ' = ' + pesos(t.valor) };
  }
  function netoMensual(r) {
    var q = r.elige(NOMBRES), d = r.entero(250, 420), mensual = d * 30, t = isr(mensual), neto = mensual - t.valor;
    return { p: tablaISR() + 'Identifique la percepción neta mensual de ' + q + ' si percibe ' + pesos(d) + ' de salario diario (considere 30 días y sólo la retención del ISR).',
      b: neto, m: [mensual, t.valor, mensual - t.fila[1], mensual - (mensual - t.fila[0]) * t.fila[2] / 100], fmt: pesos,
      ex: 'Mensual: ' + pesos(mensual) + '; ISR: ' + pesos(t.valor) + '; neto = ' + pesos(neto) };
  }

  P.temaBanco({
    id: 'prepa-rhAdministracion',
    grupo: 'Recursos humanos',
    nombre: 'Administracion',
    descripcion: 'Escuelas de la administracion, planeacion, principios de Fayol, proceso administrativo, areas funcionales y manuales. Reactivos 1 a 14 de la capacitacion.',
    etiquetas: ['taylor', 'fayol', 'proceso administrativo', 'planeacion', 'manuales'],
    items: [
      { s: 'escuelas', n: 'Escuelas de la administracion', v: [
        { p: '¿Quién es el precursor de la administración científica?', b: 'Frederick W. Taylor', m: ['Elton Mayo', 'Max Weber', 'William Ouchi'] },
        { p: '¿Quién es considerado el padre de la teoría clásica de la administración y propuso 14 principios?', b: 'Henri Fayol', m: ['Frederick W. Taylor', 'Elton Mayo', 'Max Weber'] },
        { p: '¿Quién desarrolló el modelo burocrático de la administración?', b: 'Max Weber', m: ['Henri Fayol', 'Elton Mayo', 'Frederick W. Taylor'] }
      ] },
      { s: 'humanista', n: 'Escuela humanista', v: [
        { p: '¿Qué escuela parte del supuesto de adaptar la administración a las necesidades del personal?', b: 'Humanista (relaciones humanas)', m: ['Estructuralista', 'Científica', 'Sistémica'] },
        { p: 'Los experimentos de Hawthorne, de Elton Mayo, dieron origen a la escuela:', b: 'de las relaciones humanas', m: ['científica', 'clásica', 'burocrática'] }
      ] },
      { s: 'planeacion', n: 'Tipos de planeacion', v: [
        { p: 'Si una empresa considera su misión y visión para tener éxito en el mercado durante años, ¿a qué tipo de planeación se refiere?', b: 'Estratégica', m: ['Administrativa', 'Operativa', 'Táctica'] },
        { p: 'La planeación de las actividades diarias de cada puesto, a corto plazo, es la planeación:', b: 'operativa', m: ['estratégica', 'táctica', 'corporativa'] }
      ] },
      { s: 'principios', n: 'Principios administrativos', v: [
        { rel: 'Relacione cada principio administrativo de Fayol con su particularidad.', cols: ['Principio', 'Particularidad'],
          pares: [['División del trabajo', 'La especialización aumenta la experiencia y las habilidades'], ['Disciplina', 'Respetar los acuerdos y reglas de la organización'],
            ['Unidad de mando', 'Cada trabajador debe tener un solo jefe'], ['Equidad', 'Trato justo y amable a todo el personal'], ['Iniciativa', 'Permitir que el personal proponga y realice planes']], n: 3 }
      ] },
      { s: 'importancia', n: 'Importancia de la administracion', v: [
        { p: 'Para que toda empresa, e incluso las tareas de la vida cotidiana, tengan buenos resultados, se debe tener una buena:', b: 'administración', m: ['contabilidad', 'paciencia', 'tolerancia'] }
      ] },
      { s: 'globalizacion', n: 'Administracion y globalizacion', v: [
        { p: 'Identifique la oración que señala la importancia de la administración en la globalización económica.', b: 'Una empresa es competitiva al tener personal capacitado que la lleve a cruzar fronteras',
          m: ['Libre comercio de bienes y menores costos de producción', 'Crecimiento del mercado por los tratados comerciales', 'Las empresas invierten en sistemas de información'] }
      ] },
      { s: 'proceso', n: 'Proceso administrativo', v: [
        { p: '¿Qué es el proceso administrativo?', b: 'La secuencia de fases o etapas para administrar una organización', m: ['Un plan con objetivos en mente', 'La evaluación del futuro de un programa', 'La contabilidad de la empresa'] },
        { orden: 'Ordene las etapas del proceso administrativo.', pasos: ['Planeación', 'Organización', 'Dirección', 'Control'] }
      ] },
      { s: 'etapas', n: 'Etapas del proceso administrativo', v: [
        { rel: 'Relacione cada etapa del proceso administrativo con su característica.', cols: ['Etapa', 'Característica'],
          pares: [['Control', 'Se miden y comparan los resultados con los objetivos para mejorar'], ['Dirección', 'Con liderazgo y motivación se logra que todos se involucren'],
            ['Organización', 'Se coordinan las actividades y se asignan funciones a las personas'], ['Planeación', 'Se fijan objetivos y se deciden las acciones a futuro']] }
      ] },
      { s: 'areaFuncional', n: 'Areas funcionales', v: [
        { p: 'Para lograr sus metas, una empresa divide sus actividades en secciones especializadas llamadas:', b: 'áreas funcionales', m: ['capacitaciones', 'informática', 'producción'] }
      ] },
      { s: 'areaRH', n: 'Area de recursos humanos', v: [
        { p: '¿Qué área funcional de la empresa recluta y capacita al personal nuevo?', b: 'Recursos humanos', m: ['Finanzas', 'Mercadotecnia', 'Producción'] },
        { p: '¿Qué área funcional se encarga de la publicidad, las ventas y el estudio del mercado?', b: 'Mercadotecnia', m: ['Recursos humanos', 'Finanzas', 'Producción'] }
      ] },
      { s: 'etapaAjuste', n: 'Aplicacion del proceso', v: [
        { p: 'Una empresa quiere aumentar 20% su producción y necesita más materia prima. ¿En qué etapa del proceso administrativo debe hacer ajustes?', b: 'Planeación', m: ['Control', 'Dirección', 'Organización'] },
        { p: 'Un gerente revisa a fin de mes si se cumplió la meta de ventas y corrige lo que falló. ¿En qué etapa está?', b: 'Control', m: ['Planeación', 'Organización', 'Dirección'] }
      ] },
      { s: 'manuales', n: 'Manuales administrativos', v: [
        { p: '¿Qué tipo de manual muestra la estructura de la empresa, sus políticas y las funciones de cada integrante?', b: 'De organización', m: ['De bienvenida', 'De procedimientos', 'Técnico'] },
        { p: '¿Qué tipo de manual describe paso a paso cómo se realiza cada actividad, con diagramas de flujo?', b: 'De procedimientos', m: ['De bienvenida', 'De organización', 'De políticas'] }
      ] },
      { s: 'manualProc', n: 'Contenido de los manuales', v: [
        { p: 'Un manual contiene el nombre de la empresa, normas de operación, objetivo, gráficas de Gantt y la descripción de cada proceso. ¿Qué tipo de manual es?', b: 'De procedimientos', m: ['De bienvenida', 'Departamental', 'De organización'] },
        { p: 'Un manual que da a conocer al nuevo empleado la historia de la empresa, su misión, visión y prestaciones es el manual:', b: 'de bienvenida', m: ['de procedimientos', 'de organización', 'técnico'] }
      ] },
      { s: 'gestion', n: 'Gestion de personal', v: [
        { orden: 'Ordene los pasos de la gestión de personal en una empresa.', pasos: ['Reclutamiento', 'Selección', 'Contratación', 'Inducción'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhReclutamiento',
    grupo: 'Recursos humanos',
    nombre: 'Reclutamiento y seleccion',
    descripcion: 'Conceptos de reclutamiento, analisis y requisicion de puestos, tipos de reclutamiento y entrevista, examen medico, contratos e induccion. Reactivos 15 a 22 de la capacitacion.',
    etiquetas: ['reclutamiento', 'seleccion', 'entrevista', 'contrato', 'induccion'],
    items: [
      { s: 'conceptos', n: 'Conceptos de reclutamiento', v: [
        { rel: 'Relacione cada concepto del proceso de reclutamiento con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Puesto', 'Espacio donde se realiza una actividad laboral'], ['Plaza', 'Puesto que no tiene titular'], ['Candidato', 'Persona que aspira a ocupar un puesto'],
            ['Perfil del puesto', 'Aptitudes, cualidades y capacidades que requiere el puesto'], ['Reclutamiento', 'Técnicas para atraer candidatos capaces de ocupar un cargo']] }
      ] },
      { s: 'definicion', n: 'Reclutamiento y seleccion', v: [
        { c: 'Al proceso de ___ se le define como el conjunto de tareas que tienen como finalidad ___ personal calificado para ocupar un puesto.',
          b: ['reclutamiento', 'atraer'], m: [['reclutamiento', 'contratar'], ['selección', 'atraer'], ['selección', 'contratar']] },
        { c: 'La ___ consiste en ___ entre los candidatos al más adecuado para el puesto.',
          b: ['selección', 'elegir'], m: [['inducción', 'elegir'], ['selección', 'atraer'], ['reclutamiento', 'capacitar']] }
      ] },
      { s: 'requisicion', n: 'Analisis de puestos', v: [
        { rel: 'Relacione cada concepto con su definición.', cols: ['Concepto', 'Definición'],
          pares: [['Proceso de reclutamiento', 'Inicia con la petición del área donde surge la vacante y termina al elegir al candidato'],
            ['Requisición de personal', 'Documento con el que se pide reemplazar a un trabajador'],
            ['Descripción del puesto', 'Herramienta para conocer con precisión las particularidades del puesto'],
            ['Análisis de puestos', 'Establece con precisión tareas, requisitos, responsabilidades y condiciones del puesto']],
          extra: ['Inventario de personal que ya labora en la organización'] }
      ] },
      { s: 'interno', n: 'Tipos de reclutamiento', v: [
        { p: '¿Qué tipo de reclutamiento usa transferencias, promociones o planes de carrera del personal que ya trabaja en la empresa?', b: 'Interno', m: ['Externo', 'En línea', 'Por agencia'] },
        { p: 'Cuando una empresa busca candidatos en universidades, bolsas de trabajo y anuncios, el reclutamiento es:', b: 'externo', m: ['interno', 'mixto por promoción', 'por transferencia'] }
      ] },
      { s: 'entrevista', n: 'Tipos de entrevista', v: [
        { p: '¿Qué tipo de entrevista sigue un patrón fijo de preguntas para comparar a los candidatos?', b: 'Dirigida (estructurada)', m: ['Mixta', 'No dirigida', 'De tensión'] },
        { p: '¿Qué tipo de entrevista deja que el candidato hable libremente, sin un guion fijo?', b: 'No dirigida', m: ['Dirigida', 'De tensión', 'Grupal'] }
      ] },
      { s: 'examenMedico', n: 'Evaluaciones de seleccion', v: [
        { p: 'Tiene como finalidad evaluar la salud física y mental de los candidatos para saber si tienen algún impedimento para el puesto:', b: 'Examen médico', m: ['Estudio socioeconómico', 'Prueba psicométrica', 'Prueba situacional'] },
        { p: 'Visitar el domicilio del candidato para conocer su entorno familiar y económico corresponde al:', b: 'estudio socioeconómico', m: ['examen médico', 'examen de conocimientos', 'periodo de prueba'] }
      ] },
      { s: 'contratos', n: 'Tipos de contrato', v: [
        { p: '¿Qué tipo de contrato se usa para actividades que se repiten sólo en ciertas épocas del año?', b: 'Por temporada', m: ['Indeterminado', 'Periodo de prueba', 'Por capacitación inicial'] },
        { p: 'El contrato que no tiene fecha de terminación es el:', b: 'por tiempo indeterminado', m: ['por obra determinada', 'por temporada', 'de capacitación inicial'] }
      ] },
      { s: 'induccion', n: 'Induccion', v: [
        { p: 'Proceso en el que al empleado de nuevo ingreso se le explican la misión, visión, valores, horarios y prestaciones de la empresa:', b: 'Inducción', m: ['Capacitación', 'Entrevista', 'Selección'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhNomina',
    grupo: 'Recursos humanos',
    nombre: 'Nomina',
    descripcion: 'Salario base de cotizacion, aguinaldo, prima vacacional, horas extra, ISR, percepcion neta, descuentos y Ley del Seguro Social. Reactivos 23 a 33 de la capacitacion.',
    etiquetas: ['nomina', 'aguinaldo', 'prima vacacional', 'horas extra', 'isr', 'imss'],
    formulario: 'Salario diario = mensual / 30 &nbsp;&middot;&nbsp; Aguinaldo = 15 días &times; diario &times; días trabajados / 365<br>' +
      'Prima vacacional = 25% &times; días de vacaciones &times; diario &nbsp;&middot;&nbsp; Horas extra (primeras 9 a la semana) = 2 &times; hora normal<br>' +
      'ISR = cuota fija + (ingreso &minus; límite inferior) &times; %',
    items: [
      { s: 'sbc', n: 'Salario base de cotizacion', v: [
        { p: 'El salario base de cotización se integra con los pagos en efectivo por cuota diaria, gratificaciones y percepciones. ¿En qué ley se establece?', b: 'Ley del Seguro Social', m: ['Ley del Impuesto sobre la Renta', 'Ley del INFONAVIT', 'Ley Federal del Trabajo'] }
      ] },
      { s: 'sbc2', n: 'Integracion del salario', v: [
        { p: '¿Qué prestaciones se suman al salario diario para obtener el salario diario integrado?', b: 'Las partes proporcionales de aguinaldo y prima vacacional, entre otras', m: ['Sólo las horas extra', 'Los descuentos del ISR', 'Las cuotas sindicales'] }
      ] },
      { s: 'aguinaldo', n: 'Aguinaldo proporcional', v: [aguinaldoProp] },
      { s: 'prima', n: 'Prima vacacional', v: [primaVac] },
      { s: 'extra1', n: 'Horas extra', v: [horasExtra] },
      { s: 'extra2', n: 'Horas extra (otro caso)', v: [horasExtra] },
      { s: 'isr', n: 'Retencion de ISR', v: [isrMensual] },
      { s: 'neto', n: 'Percepcion neta', v: [netoMensual] },
      { s: 'falta', n: 'Descuento por falta', v: [faltaSemana] },
      { s: 'sindical', n: 'Cuota sindical', v: [cuotaSindical] },
      { s: 'lss', n: 'Ley del Seguro Social', v: [
        { p: '¿Qué ley establece que se debe garantizar el derecho a la salud, la asistencia médica, la protección de los medios de subsistencia y los servicios sociales para el bienestar?', b: 'Ley del Seguro Social', m: ['Ley del INFONAVIT', 'Ley del ISR', 'Ley Federal del Trabajo'] },
        { p: '¿Qué institución otorga créditos a los trabajadores para comprar vivienda?', b: 'INFONAVIT', m: ['IMSS', 'SAT', 'STPS'] }
      ] }
    ]
  });

  P.temaBanco({
    id: 'prepa-rhSeguridad',
    grupo: 'Recursos humanos',
    nombre: 'Seguridad e higiene',
    descripcion: 'Seguridad e higiene laboral, NOM, factores de riesgo, equipo de proteccion y prevencion. Reactivos 34 a 40 de la capacitacion.',
    etiquetas: ['seguridad', 'higiene', 'riesgos', 'nom', 'epp'],
    items: [
      { s: 'higiene', n: 'Higiene laboral', v: [
        { p: '¿Qué disciplina busca prevenir enfermedades de trabajo identificando y controlando los factores de riesgo del ambiente laboral?', b: 'Higiene laboral', m: ['Salud pública', 'Seguridad laboral', 'Mercadotecnia'] }
      ] },
      { s: 'seguridad', n: 'Seguridad laboral', v: [
        { p: 'Conjunto de reglas y medidas para prevenir accidentes y proteger la integridad física del trabajador:', b: 'Seguridad laboral', m: ['Higiene laboral', 'Salud pública', 'Capacitación'] }
      ] },
      { s: 'nom', n: 'Normas Oficiales Mexicanas', v: [
        { p: 'Categoría de las Normas Oficiales Mexicanas de la STPS cuyo propósito es prevenir enfermedades por las actividades laborales:', b: 'Salud', m: ['Específicas', 'Organización', 'Producto'] },
        { p: 'Las Normas Oficiales Mexicanas sobre seguridad e higiene en el trabajo las emite la:', b: 'Secretaría del Trabajo y Previsión Social (STPS)', m: ['Secretaría de Economía', 'Secretaría de Educación Pública', 'Secretaría de Hacienda'] }
      ] },
      { s: 'riesgos', n: 'Factores de riesgo', v: [
        { p: 'Saúl aplana el asfalto con una compactadora manual que vibra todo el día. ¿A qué factor de riesgo se expone?', b: 'Físico', m: ['Biológico', 'Ergonómico', 'Químico'] },
        { p: 'Una enfermera que maneja muestras de sangre se expone a un riesgo:', b: 'biológico', m: ['físico', 'químico', 'ergonómico'] },
        { p: 'Un capturista que pasa 8 horas sentado en una silla sin respaldo adecuado se expone a un riesgo:', b: 'ergonómico', m: ['biológico', 'químico', 'físico'] }
      ] },
      { s: 'epp', n: 'Equipo de proteccion', v: [
        { p: 'Juan trabaja en una obra y no usa el casco ni el arnés que le asignaron porque le resultan incómodos. ¿Qué omisión está cometiendo?', b: 'No usar el equipo de protección personal', m: ['Adoptar una mala postura', 'No asistir a las capacitaciones', 'Trabajar a un ritmo inadecuado'] }
      ] },
      { s: 'programa', n: 'Programas de prevencion', v: [
        { p: '¿Qué programa identifica los riesgos laborales que afectan la salud del personal y aplica medidas preventivas?', b: 'De prevención de riesgos laborales', m: ['De capacitación técnica', 'De manejo de herramientas', 'De inducción'] }
      ] },
      { s: 'ergonomia', n: 'Medidas ergonomicas', v: [
        { p: 'Francisco es cajero, pasa casi toda la jornada de pie y ya tiene molestias en las piernas. ¿Qué medida ayudaría más a su salud en el trabajo?', b: 'Poner un banco para sentarse a intervalos periódicos', m: ['Acudir a un centro deportivo', 'Cambiarse de departamento', 'Trabajar más horas extra'] }
      ] }
    ]
  });
})();
