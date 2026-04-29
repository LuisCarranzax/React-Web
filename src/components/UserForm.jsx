import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserForm({ onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', celular: '', correo: '', dni: ''
  });

  // Agregamos "async" aquí
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.apellido || !formData.celular || !formData.correo || !formData.dni) {
      toast.error('Por favor, completa todos los campos.');
      return;
    }

    // Ponemos un toast de carga opcional
    const toastId = toast.loading('Guardando en MongoDB...');

    // ESPERAMOS a que App.jsx intente guardarlo en la base de datos real
    const exito = await onGuardar(formData);
    
    if (exito) {
      toast.success('¡Registro guardado correctamente!', { id: toastId, icon: '✅' });
      setFormData({ nombre: '', apellido: '', celular: '', correo: '', dni: '' });
    } else {
      toast.error('Error: Verifica que tu API en Docker esté encendida.', { id: toastId });
    }
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