/* Materias disponibles. Para abrir una nueva basta registrarla aqui y crear
   sus archivos de temas en js/temas/<id>/ . */
(function () {
  'use strict';

  EJ.materia({
    id: 'matematicas',
    nombre: 'Matematicas',
    descripcion: 'Aritmetica, algebra, geometria, funciones, calculo y probabilidad.',
    orden: 1
  });

  EJ.materia({
    id: 'ciencias',
    nombre: 'Ciencias',
    descripcion: 'Quimica, fisica y biologia. Pendiente de contenido.',
    orden: 2
  });

  EJ.materia({
    id: 'historia',
    nombre: 'Historia',
    descripcion: 'Fechas, personajes y procesos. Pendiente de contenido.',
    orden: 3
  });
})();
