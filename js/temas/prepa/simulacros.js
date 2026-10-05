/* Modo prepa: simulacros con el mismo orden, numero de preguntas y tiempo que
   la version de practica. Cada reactivo dice de que tema y subtema sale; los
   que tienen `g` (grupo) son un multirreactivo y comparten semilla, asi que
   hablan de los mismos datos. */
(function () {
  'use strict';

  function lista(temaId, subtemas, grupo) {
    return subtemas.map(function (s) { return { t: temaId, s: s, g: grupo || null }; });
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
    {
      id: 'fisica',
      nombre: 'Fisica',
      minutos: 18,
      reactivos: lista('prepa-fisica', ['velocidad', 'aceleracion', 'fuerzaNeta', 'aceleracionNewton', 'masaPeso',
        'kepler', 'calor', 'temperaturaCalor', 'sistemas', 'leyesTermo', 'charles', 'boyle', 'hooke', 'pascal',
        'arquimedes', 'ohmCorriente', 'ohmVoltaje', 'snell'])
    }
  ];
})();
