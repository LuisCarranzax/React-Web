import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import TaskList from './components/TaskList';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

const Inicio = () => (
  <div className="page-transition">
    <div className="card">
      <h1>Bienvenido a Inicio</h1>
      <p style={{ color: '#64748b' }}>Desde aquí puedes gestionar el Ejercicio 1.</p>
    </div>
    <TaskList />
  </div>
);

const AcercaDe = () => (
  <div className="card page-transition">
    <h2>Acerca de</h2>
    <p style={{ color: '#64748b' }}>Aplicación moderna en React con estado global y simulación CRUD.</p>
  </div>
);

// ... (Tus importaciones y componentes Inicio/AcercaDe se quedan igual)

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. GET: Cargar los datos desde tu API real en Node/MongoDB
  useEffect(() => {
    fetch('http://localhost:3000/api/contacts')
      .then(res => res.json())
      .then(data => {
        // Adaptamos los datos de Mongo para que React use _id como id
        const datosAdaptados = data.map(user => ({
          ...user,
          id: user._id 
        }));
        setRegistros(datosAdaptados);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar la API local:", err);
        setLoading(false);
      });
  }, []);

  // 2. POST: Enviar datos del Formulario a la Base de Datos
  const agregarRegistro = async (nuevoUsuario) => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });
      
      if (respuesta.ok) {
        const dataGuardada = await respuesta.json();
        setRegistros([{ ...dataGuardada, id: dataGuardada._id }, ...registros]);
        return true; // ¡Exito! Le avisamos al formulario
      }
      return false; // Falló el servidor
    } catch (error) {
      console.error('Error al guardar en BD:', error);
      return false; // Falló la conexión (Docker apagado)
    }
  };

  // 3. PUT: Enviar datos actualizados desde el Modal de Edición
  const actualizarRegistro = async (id, datosActualizados) => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosActualizados)
      });

      if (respuesta.ok) {
        const dataActualizada = await respuesta.json();
        // Actualizamos la tarjeta en la pantalla sin recargar la página
        setRegistros(registros.map(r => r.id === id ? { ...dataActualizada, id: dataActualizada._id } : r));
      }
    } catch (error) {
      console.error('Error al actualizar en BD:', error);
    }
  };

  // 4. DELETE: Eliminar un registro de la Base de Datos
  const eliminarRegistro = async (id) => {
    try {
      const respuesta = await fetch(`http://localhost:3000/api/contacts/${id}`, {
        method: 'DELETE'
      });

      if (respuesta.ok) {
        // Lo borramos de la pantalla
        setRegistros(registros.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar en BD:', error);
    }
  };

  // ... (El resto del return <Router> se queda exactamente igual)

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