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

function App() {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  // GET: Cargar datos de JSONPlaceholder al iniciar
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        // Mapeamos los datos de la API a nuestro formato de formulario
        const datosAdaptados = data.map(user => {
          const nombres = user.name.split(' ');
          return {
            id: user.id,
            nombre: nombres[0],
            apellido: nombres.slice(1).join(' ') || 'Sin apellido',
            correo: user.email,
            celular: user.phone.split(' ')[0],
            // Generamos un DNI simulado de 8 dígitos usando su ID
            dni: (10000000 + user.id).toString()
          };
        });
        setRegistros(datosAdaptados);
        setLoading(false);
      })
      .catch(err => console.error("Error al cargar API", err));
  }, []);

  // POST: Agregar
  const agregarRegistro = (nuevoUsuario) => {
    setRegistros([{ ...nuevoUsuario, id: Date.now() }, ...registros]);
  };

  // PUT: Actualizar
  const actualizarRegistro = (id, datosActualizados) => {
    setRegistros(registros.map(r => r.id === id ? { ...r, ...datosActualizados } : r));
  };

  // DELETE: Eliminar
  const eliminarRegistro = (id) => {
    setRegistros(registros.filter(r => r.id !== id));
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