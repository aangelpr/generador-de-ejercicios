/* Modo prepa: simulacros con las mismas preguntas y el mismo tiempo que la
   version de practica (uno por area).

   Cada reactivo dice de que tema y subtema sale y su nivel (d). Los que tienen
   `g` (grupo) son un multirreactivo y comparten semilla, asi que hablan del
   mismo texto o de los mismos datos.

   El orden de los subtemas de cada tema es el de la guia (P.orden); al armar
   el examen se puede respetar ese orden o ir de facil a dificil. */
(function () {
  'use strict';
  var P = EJ.prepa;

  /* todos los subtemas de los temas dados, en el orden de la guia;
     `grupos` = {subtema: grupo} para los multirreactivos */
  function deTemas(ids, grupos) {
    var out = [];
    ids.forEach(function (id) {
      (P.orden[id] || []).forEach(function (s) {
        out.push({ t: id, s: s, d: P.nivel[id + '|' + s], g: (grupos && grupos[s]) || null });
      });
    });
    return out;
  }

  P.simulacros = [
    { id: 'matematicas', nombre: 'Matematicas', minutos: 60,
      reactivos: deTemas(['prepa-algebra', 'prepa-geometria', 'prepa-analitica', 'prepa-funciones', 'prepa-calculo', 'prepa-estadistica'], {
        muestraVariable: 'datos', mediana: 'datos', varianza: 'datos', grafica: 'datos',
        deterministico: 'torneo', independientes: 'torneo', binomial: 'torneo' }) },
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
