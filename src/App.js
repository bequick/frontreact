import './App.css';
import {  Container } from 'react-bootstrap';
import MantenedorTarea from './components/tareas/mantenedorTarea';

function App() {
  return (
    <div className="App">
      <header className="App-header">
       Copeuch 
      </header>
       
     
      <Container>
     
        <MantenedorTarea />
       
        </Container>
      
    </div>
  );
}

export default App;
