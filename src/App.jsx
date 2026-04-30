import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { obtenerTodos, crearNuevo, actualizarExistente, eliminarPorId } from './api/apiRest';
import './App.css';
import Questions from './components/Questions';

const Inicio = () => (
  <div className="page-transition">
    <div className="card">
      <h1>Bienvenido a Inicio</h1>
    </div>
    <TaskList />
    <Questions />
  </div>
);



const AcercaDe = () => (
  <div className="card page-transition">
    <h2>Acerca de</h2>
    <p style={{ color: '#64748b' }}>Aplicación moderna en React con estado global y simulación CRUD.</p>
  </div>
);


function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  /// 1. GET: Cargar los datos desde tu API separada
  useEffect(() => {
    const cargarDatos = async () => {
      const data = await obtenerTodos();
      
      const datosAdaptados = data.map(user => ({
        ...user,
        id: user._id 
      }));
      
      setRegistros(datosAdaptados);
      setLoading(false); 
    };
    
    cargarDatos();
  }, []);

  // 2. POST: Enviar datos del Formulario
  const agregarRegistro = async (nuevoUsuario) => {
    const dataGuardada = await crearNuevo(nuevoUsuario);
    
    if (dataGuardada) {
      setRegistros([{ ...dataGuardada, id: dataGuardada._id }, ...registros]);
      return true; 
    }
    return false; 
  };

  // 3. PUT: Enviar datos actualizados
  const actualizarRegistro = async (id, datosActualizados) => {
    const dataActualizada = await actualizarExistente(id, datosActualizados);
    
    if (dataActualizada) {
      setRegistros(registros.map(r => r.id === id ? { ...dataActualizada, id: dataActualizada._id } : r));
      return true; 
    }
    return false; 
  };

  // 4. DELETE: Eliminar un registro
  const eliminarRegistro = async (id) => {
    const exito = await eliminarPorId(id);
    
    if (exito) {
      setRegistros(registros.filter(r => r.id !== id));
      return true; 
    }
    return false;
  };

  return (
    <Router>
      <div className="app-container">
        <Toaster position="bottom-right" />
        
        <header className="header-container">
          <nav className="navbar">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Directorio</Link>
            <Link to="/landing">Registro</Link>
            <Link to="/acerca-de">Acerca de</Link>
          </nav>
          <div className="user-profile">
            <div className="avatar">L</div>
            <span className="user-name">Luis Carranza</span>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={
            <UserList 
              datos={registros} 
              loading={loading}
              onActualizar={actualizarRegistro}
              onEliminar={eliminarRegistro}
            />
          } />
          <Route path="/landing" element={<UserForm onGuardar={agregarRegistro} />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;