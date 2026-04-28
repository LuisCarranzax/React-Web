import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserForm() {
  const [formData, setFormData] = useState({ nombre: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nombre.trim() || !formData.email.trim()) {
      toast.error('Faltan datos. Completa todos los campos.');
      return;
    }

    toast.success(`¡Bienvenido, ${formData.nombre}! Registro exitoso.`, {
      icon: '🎉',
    });
    
    setFormData({ nombre: '', email: '' });
  };

  return (
    <div className="card">
      <h2>Registro de Usuario</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Llena tus datos para crear una nueva cuenta.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          className="input-field"
          placeholder="Nombre completo"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
        />
        <input
          type="email"
          className="input-field"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit" className="btn" style={{ marginTop: '10px' }}>
          Registrar Usuario
        </button>
      </form>
    </div>
  );
}