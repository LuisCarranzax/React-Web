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
    </div>
    <TaskList />
  </div>
);

const Productos = () => (
  <div className="page-transition">
    <UserList />
  </div>
);

const Landing = () => (
  <div className="page-transition">
    <UserForm />
  </div>
);

const AcercaDe = () => (
  <div className="card page-transition">
    <h2>Acerca de</h2>
    <p style={{ color: '#64748b', lineHeight: '1.6' }}>
      Esta es una aplicación de demostración implementando React Router, 
      validación de estados, fetching de APIs externas y un diseño UI moderno basado en tarjetas.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Toaster position="bottom-right" reverseOrder={false} />
        <header className="header-container">
          <nav className="navbar">
            <Link to="/">Inicio</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/landing">Landing Page</Link>
            <Link to="/acerca-de">Acerca de</Link>
          </nav>
          
          <div className="user-profile">
            <div className="avatar">L</div>
            <span className="user-name">Luis Carranza</span>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;