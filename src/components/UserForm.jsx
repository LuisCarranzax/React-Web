import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserForm({ onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', celular: '', correo: '', dni: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación: Comprobar que no haya campos vacíos
    if (!formData.nombre || !formData.apellido || !formData.celular || !formData.correo || !formData.dni) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    // Enviamos los datos a App.jsx
    onGuardar(formData);
    
    // Mostramos la alerta de éxito
    toast.success('¡Registro guardado correctamente!', { icon: '✅' });
    
    // Limpiamos el formulario
    setFormData({ nombre: '', apellido: '', celular: '', correo: '', dni: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="card page-transition">
      <h2>Nuevo Registro</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Ingresa los datos. Al guardar, aparecerán en la sección de Directorio.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input type="text" name="nombre" className="input-field" placeholder="Nombre" value={formData.nombre} onChange={handleChange} style={{ marginBottom: 0 }} />
          <input type="text" name="apellido" className="input-field" placeholder="Apellido" value={formData.apellido} onChange={handleChange} style={{ marginBottom: 0 }} />
        </div>
        
        <input type="email" name="correo" className="input-field" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} style={{ marginBottom: 0 }} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input type="number" name="celular" className="input-field" placeholder="Celular" value={formData.celular} onChange={handleChange} style={{ marginBottom: 0 }} />
          <input type="number" name="dni" className="input-field" placeholder="DNI" value={formData.dni} onChange={handleChange} style={{ marginBottom: 0 }} />
        </div>
        
        <button type="submit" className="btn" style={{ marginTop: '10px' }}>
          Guardar Información
        </button>
      </form>
    </div>
  );
}