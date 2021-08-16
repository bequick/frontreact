import api from "../api";

class TareaService {

    listarTareas() {
      return api.get("tarea");
    }
  
    agregarTarea(data) {
      return api.post("/tarea",data);
    }
  
    modificarTarea(id, data) {
      return api.put(`/tarea/${id}`, data);
    }
  
    eliminarTarea(id) {
      return api.delete(`/tarea/${id}`);
    }
  
  
  }
  
  export default new TareaService();