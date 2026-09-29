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
    id: 'fisica',
    nombre: 'Fisica',
    descripcion: 'Cinematica, dinamica, gravitacion, energia, termodinamica, fluidos, electricidad y optica.',
    orden: 2
  });

  EJ.materia({
    id: 'prepa',
    nombre: 'Modo prepa',
    descripcion: 'Preguntas de opcion multiple como las del examen de admision a la prepa: matematicas, razonamiento y fisica.',
    orden: 3
  });

  EJ.materia({
    id: 'ciencias',
    nombre: 'Ciencias',
    descripcion: 'Quimica y biologia. Pendiente de contenido.',
    orden: 4
  });

  EJ.materia({
    id: 'historia',
    nombre: 'Historia',
    descripcion: 'Fechas, personajes y procesos. Pendiente de contenido.',
    orden: 5
  });
})();
