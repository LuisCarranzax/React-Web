import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserForm({ onGuardar }) {
  const [formData, setFormData] = useState({
    nombre: '', apellido: '', celular: '', correo: '', dni: ''
  });

  // NUEVO ESTADO: Controla qué inputs están en error
  const [errores, setErrores] = useState({
    nombre: false, apellido: false, celular: false, correo: false, dni: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Revisamos qué campos están vacíos
    const nuevosErrores = {
      nombre: formData.nombre.trim() === '',
      apellido: formData.apellido.trim() === '',
      correo: formData.correo.trim() === '',
      celular: formData.celular.trim() === '',
      dni: formData.dni.trim() === ''
    };

    // 2. Activamos los bordes rojos
    setErrores(nuevosErrores);

    // 3. Si algún campo dio "true" (está vacío), detenemos todo
    if (Object.values(nuevosErrores).includes(true)) {
      toast.error('Por favor, completa los campos marcados en rojo.');
      return;
    }

    const toastId = toast.loading('Guardando en MongoDB...');
    const exito = await onGuardar(formData);
    
    if (exito) {
      toast.success('¡Registro guardado correctamente!', { id: toastId, icon: '✅' });
      setFormData({ nombre: '', apellido: '', celular: '', correo: '', dni: '' });
      // Limpiamos los errores
      setErrores({ nombre: false, apellido: false, celular: false, correo: false, dni: false });
    } else {
      toast.error('Error: Verifica tu servidor.', { id: toastId });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // En cuanto el usuario empieza a escribir, le quitamos el borde rojo a ese input
    setErrores({ ...errores, [e.target.name]: false });
  };

  // Función de ayuda para aplicar el borde rojo si hay error
  const estiloError = (campo) => ({
    border: errores[campo] ? '2px solid #ef4444' : '',
    backgroundColor: errores[campo] ? '#fef2f2' : ''
  });

  return (
    <div className="card page-transition">
      <h2>Nuevo Registro</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>
        Ingresa los datos. Los campos obligatorios se marcarán si los omites.
      </p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {/* Aplicamos estiloError a cada input */}
          <input type="text" name="nombre" className="input-field" placeholder="Nombre" value={formData.nombre} onChange={handleChange} style={estiloError('nombre')} />
          <input type="text" name="apellido" className="input-field" placeholder="Apellido" value={formData.apellido} onChange={handleChange} style={estiloError('apellido')} />
        </div>
        
        <input type="email" name="correo" className="input-field" placeholder="Correo electrónico" value={formData.correo} onChange={handleChange} style={estiloError('correo')} />
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input type="number" name="celular" className="input-field" placeholder="Celular" value={formData.celular} onChange={handleChange} style={estiloError('celular')} />
          <input type="number" name="dni" className="input-field" placeholder="DNI" value={formData.dni} onChange={handleChange} style={estiloError('dni')} />
        </div>
        
        <button type="submit" className="btn" style={{ marginTop: '10px' }}>
          Guardar Información
        </button>
      </form>
    </div>
  );
}