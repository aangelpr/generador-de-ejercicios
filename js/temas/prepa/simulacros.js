/* Modo prepa: simulacros con el mismo orden, numero de preguntas y tiempo que
   la version de practica (una por area). Cada reactivo dice de que tema y
   subtema sale; los que tienen `g` (grupo) son un multirreactivo y comparten
   semilla, asi que hablan del mismo texto o de los mismos datos.

   En las areas hechas con bancos, el orden de los subtemas de cada tema ya es
   el de la guia, asi que el simulacro se arma juntando los temas en orden. */
(function () {
  'use strict';

  function lista(temaId, subtemas, grupo) {
    return subtemas.map(function (s) { return { t: temaId, s: s, g: grupo || null }; });
  }

  /* todos los subtemas de los temas dados, en orden; `grupos` = {subtema: grupo} */
  function deTemas(ids, grupos) {
    var out = [];
    ids.forEach(function (id) {
      EJ.subtemasDe(id, 'medio').forEach(function (s) {
        out.push({ t: id, s: s.id, g: (grupos && grupos[s.id]) || null });
      });
    });
    return out;
  }

  EJ.prepa.simulacros = [
    {
      id: 'matematicas',
      nombre: 'Matematicas',
      minutos: 60,
      reactivos: [].concat(
        lista('prepa-algebra', ['racionales', 'grado', 'lenguaje', 'progAritmetica', 'progGeometrica',
          'proporcionInversa', 'variacion', 'factorizacion']),
        lista('prepa-geometria', ['definiciones', 'notacion', 'angulos', 'relacionRectas', 'triangulos',
          'semejanza', 'volumen', 'razones', 'sumaAngulos', 'areaTrig']),
        lista('prepa-analitica', ['polares', 'puntoMedio', 'pendiente', 'sistema', 'vertice', 'conicas', 'excentricidad']),
        lista('prepa-funciones', ['rango', 'paridad', 'tipos', 'logaritmos', 'limite']),
        lista('prepa-calculo', ['derivada', 'maximo', 'integral']),
        lista('prepa-estadistica', ['muestraVariable', 'mediana', 'varianza', 'grafica'], 'datos'),
        lista('prepa-estadistica', ['deterministico', 'independientes', 'binomial'], 'torneo')
      )
    },
    { id: 'humanidades', nombre: 'Humanidades', minutos: 40,
      reactivos: deTemas(['prepa-filosofia', 'prepa-etica', 'prepa-logica', 'prepa-pensamiento'], { premisas: 'argumento', conector: 'argumento' }) },
    { id: 'ciencias', nombre: 'Ciencias experimentales', minutos: 60,
      reactivos: deTemas(['prepa-biologia', 'prepa-geografia', 'prepa-quimica', 'prepa-fisica']) },
    { id: 'comunicacion', nombre: 'Comunicacion', minutos: 40,
      reactivos: deTemas(['prepa-redaccion', 'prepa-textos', 'prepa-investigacion', 'prepa-ingles'], { ideaGeneral: 'lectura', vocabulario: 'lectura', detalle: 'lectura' }) },
    { id: 'sociales', nombre: 'Ciencias sociales', minutos: 40,
      reactivos: deTemas(['prepa-sociedad', 'prepa-historia1', 'prepa-historia2', 'prepa-mexicoActual']) },
    { id: 'trabajo', nombre: 'Introduccion al trabajo', minutos: 20,
      reactivos: deTemas(['prepa-introTrabajo']) },
    { id: 'rh', nombre: 'Recursos humanos', minutos: 40,
      reactivos: deTemas(['prepa-rhAdministracion', 'prepa-rhReclutamiento', 'prepa-rhNomina', 'prepa-rhSeguridad']) },
    { id: 'contabilidad', nombre: 'Contabilidad', minutos: 40,
      reactivos: deTemas(['prepa-contaFundamentos', 'prepa-contaRegistro', 'prepa-contaEstados', 'prepa-contaBancos', 'prepa-contaImpuestos']) },
    { id: 'informatica', nombre: 'Informatica', minutos: 40,
      reactivos: deTemas(['prepa-algoritmos', 'prepa-php', 'prepa-bd', 'prepa-java']) },
    { id: 'turismo', nombre: 'Turismo', minutos: 40,
      reactivos: deTemas(['prepa-hospedaje', 'prepa-cocina', 'prepa-restaurante', 'prepa-caja']) }
  ];
})();
