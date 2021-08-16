import {
    CREAR_TAREA,
    OBTENER_TAREAS,
    MODIFICAR_TAREA,
    BORRAR_TAREA
  } from "../actions/types";

  const initialState = [];

function tareaReducer(tareas = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREAR_TAREA:
      return [...tareas, payload];

    case OBTENER_TAREAS:
      return payload;

    case MODIFICAR_TAREA:
      return tareas.map((tarea) => {
        if (tarea.id === payload.id) {
          return {
            ...tarea,
            ...payload,
          };
        } else {
          return tarea;
        }
      });

    case BORRAR_TAREA:
      return tareas.filter(({ id }) => id !== payload.id);

   

    default:
      return tareas;
  }
};

export default tareaReducer;