import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";
import { modificarTarea, eliminarTarea, listTareas, agregarTarea } from "../../actions/tareas.js";

class MantenedorTarea extends React.Component {
    constructor(props) {
        super(props); 
         this.getTareas = this.getTareas.bind(this);
         this.deleteTarea = this.deleteTarea.bind(this);
         this.saveTarea = this.saveTarea.bind(this);
     }
         
     state={
            list:[],
            modalActualizar: false,
            modalInsertar: false,
            form: {
            identificador: "",
            descripcion: "",
            fechaCreacion: "",
            vigente: true,
        },
     };

     componentDidMount(){
        this.getTareas();
      };
 
  getTareas(){
    this.props
      .listTareas()
      .then((response) => {
        this.setState({
          list: response
        })
        
      })
      .catch((e) => {
        console.log(e);
      });
  }

  deleteTarea(e){
    this.props
      .eliminarTarea(e)
      .then(() => {
        alert("se elimino con exito!!")
        this.getTareas();
      })
      .catch((e) => {
        alert("Error: "+e)
        console.log(e);
      });
  }

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    var lista= this.state.data;
    this.saveTarea();
    this.getTareas();
    this.setState({ modalInsertar: false, data: lista });
  }

  saveTarea() {
    const {identificador,descripcion, vigente,fechaCreacion } = this.state.form;

    if(!descripcion.trim()){
      alert("El campo descripción es obligatorio!!");
    }else{

    this.props
    .agregarTarea(identificador, descripcion,vigente, fechaCreacion)
     .then((data) => {
       this.setState({
           identificador: data.identificador,
            descripcion: data.descripcion,
            vigente: true,          
           fechaCreacion: data.fechaCreacion,

           submitted: true,
          });
         console.log(data);   
         alert("Se guardo tarea con éxito!!");   
         this.props.history.push("/");
       })
      .catch((e) => {
        console.log(e);
      });
    }
  }



  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
      this.saveTarea();
      this.getTareas();
      var arreglo = this.state.data;
      this.setState({ data: arreglo, modalActualizar: false });
    // var contador = 0;
    // var arreglo = this.state.data;
    // arreglo.map((registro) => {
    //   if (dato.id == registro.id) {
    //     arreglo[contador].personaje = dato.personaje;
    //     arreglo[contador].anime = dato.anime;
    //   }
    //   contador++;
    // });
    // this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.identificador);
    if (opcion == true) {
      this.deleteTarea(dato.identificador);
    }
  };

 

  handleChange = (e) => {
      console.log(e.target.value);
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button className="float-right" color="success" onClick={()=>this.mostrarModalInsertar()}>Crear nueva tarea</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tarea</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
            {this.state.list.map((value,index) =>{
                return(
                <tr key={index}>
                  <td>{value.identificador}</td>
                  <td>{value.descripcion}</td>
                  <td>{value.fechaCreacion}</td>
                  <td>{value.vigente.toString()}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(value)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(value)}>Eliminar</Button>
                  </td>
                </tr>
                )
              })}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripcion}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha de Creación: 
              </label>
              <input
                className="form-control"
                name="fechaCreacion"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.fechaCreacion}
                
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Nueva Tarea</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.list.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción: 
              </label>
              <input
                className="form-control"
                name="descripcion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha : 
              </label>
              <input
                className="form-control"
                name="fechaCreacion"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vigente : 
              </label>
              <input
                className="form-control"
                name="vigente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Guardar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}


const mapStateToProps = (state) => {
 
    return {
        tareas: state,
      };
    };
    
    export default connect(mapStateToProps, { modificarTarea, eliminarTarea, listTareas, agregarTarea })(MantenedorTarea);