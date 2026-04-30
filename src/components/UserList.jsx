import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserList({ datos = [], loading, onActualizar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);
  
  const [erroresEdicion, setErroresEdicion] = useState({
    nombre: false, apellido: false, celular: false, correo: false, dni: false
  });

  const datosLimpios = Array.isArray(datos) ? datos.filter(p => p !== null && p !== undefined) : [];

  const datosFiltrados = datosLimpios.filter(persona => {
    const dniSeguro = String(persona?.dni || '');
    return dniSeguro.includes(busqueda);
  });

  const manejarClickTarjeta = (persona) => {
    if (!persona) return; 
    setEditando(persona);
    setErroresEdicion({ nombre: false, apellido: false, celular: false, correo: false, dni: false });
  };

  const manejarCambioEdicion = (e) => {
    setEditando({ ...editando, [e.target.name]: e.target.value });
    setErroresEdicion({ ...erroresEdicion, [e.target.name]: false });
  };

  const manejarActualizacion = (e) => {
    e.preventDefault();
    if (!editando) return;

    const nuevosErrores = {
      nombre: String(editando?.nombre || '').trim() === '',
      apellido: String(editando?.apellido || '').trim() === '',
      correo: String(editando?.correo || '').trim() === '',
      celular: String(editando?.celular || '').trim() === '',
      dni: String(editando?.dni || '').trim() === ''
    };

    setErroresEdicion(nuevosErrores);

    if (Object.values(nuevosErrores).includes(true)) {
      toast.error('Por favor, completa los campos marcados en rojo para actualizar.');
      return;
    }

    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', padding: '10px' }}>
        <span style={{ fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }}>
          ¿Confirmas los cambios para {editando?.nombre}?
        </span>
        
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button 
            className="btn" 
            style={{ flex: 1, backgroundColor: '#10b981', padding: '8px', fontSize: '14px' }} 
            onClick={async () => {
              toast.dismiss(t.id);
              const toastId = toast.loading('Actualizando en MongoDB...');
              
              const idSeguro = editando?.id || editando?._id;
              const exito = await onActualizar(idSeguro, editando);

              if (exito) {
                toast.success('Registro actualizado correctamente', { id: toastId });
                setEditando(null);
              } else {
                toast.error('Error al actualizar. Verifica el servidor.', { id: toastId });
              }
            }}
          >
            Sí, actualizar
          </button>
          
          <button 
            className="btn" 
            style={{ flex: 1, backgroundColor: '#cbd5e1', color: '#333', padding: '8px', fontSize: '14px' }} 
            onClick={() => toast.dismiss(t.id)}
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center', style: { border: '1px solid #10b981', boxShadow: '0 10px 25px rgba(16, 185, 129, 0.2)' }});
  };

  const manejarEliminacion = () => {
    toast((t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center', padding: '10px' }}>
        <span style={{ fontWeight: 'bold', textAlign: 'center', color: '#1e293b' }}>
          ¿Seguro que deseas eliminar a {editando?.nombre}? <br/>
          <small style={{ color: '#ef4444', fontWeight: 'normal' }}>Esta acción no se puede deshacer.</small>
        </span>
        
        <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
          <button 
            className="btn" 
            style={{ flex: 1, backgroundColor: '#ef4444', padding: '8px', fontSize: '14px' }} 
            onClick={async () => {
              toast.dismiss(t.id);
              const idSeguro = editando?.id || editando?._id;
              await onEliminar(idSeguro);
              toast.success('Registro eliminado', { icon: '🗑️' });
              setEditando(null);
            }}
          >
            Sí, eliminar
          </button>
          
          <button 
            className="btn" 
            style={{ flex: 1, backgroundColor: '#cbd5e1', color: '#333', padding: '8px', fontSize: '14px' }} 
            onClick={() => toast.dismiss(t.id)} 
          >
            Cancelar
          </button>
        </div>
      </div>
    ), { duration: Infinity, position: 'top-center', style: { border: '1px solid #ef4444', boxShadow: '0 10px 25px rgba(239, 68, 68, 0.2)' }});
  };

  const estiloError = (campo) => ({
    border: erroresEdicion[campo] ? '2px solid #ef4444' : '',
    backgroundColor: erroresEdicion[campo] ? '#fef2f2' : ''
  });

  return (
    <> 
      <div className="page-transition">
        <div style={{ marginBottom: '20px' }}>
          <h2>Directorio Registrado</h2>
          <p style={{ color: '#64748b' }}>Busca, edita o elimina registros. Haz clic en una tarjeta para gestionar.</p>
          
          <input 
            type="number" 
            className="input-field" 
            placeholder="Buscar por DNI..." 
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            style={{ maxWidth: '300px', marginTop: '10px' }}
          />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Cargando directorio... ⏳</div>
        ) : datosFiltrados.length === 0 ? (
          <div className="card" style={{ textAlign: 'center' }}>
            <p>No se encontraron resultados.</p>
          </div>
        ) : (
          <div className="grid-container">
            {datosFiltrados.map((persona, index) => {
              const inicialNombre = persona?.nombre ? String(persona.nombre).charAt(0).toUpperCase() : '👤';
              const inicialApellido = persona?.apellido ? String(persona.apellido).charAt(0).toUpperCase() : '';

              return (
                <div 
                  key={persona?._id || persona?.id || index} 
                  className="product-card" 
                  onClick={() => manejarClickTarjeta(persona)}
                  style={{ cursor: 'pointer' }}
                  title="Haz clic para editar o eliminar"
                >
                  <div className="product-avatar">
                    {inicialNombre}{inicialApellido}
                  </div>
                  
                  <div>
                    <h3 className="product-name">{persona?.nombre || 'Usuario'} {persona?.apellido || ''}</h3>
                    <span style={{ fontSize: '0.85rem', color: '#8b5cf6', fontWeight: '600' }}>
                      DNI: {persona?.dni || 'No registrado'}
                    </span>
                  </div>

                  <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="product-info">📧 {persona?.correo || 'Sin correo'}</div>
                    <div className="product-info">📱 Cel: {persona?.celular || 'Sin celular'}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div> 

      {editando && (
        <div className="modal-overlay">
          <div className="card page-transition" style={{ maxWidth: '500px', width: '100%', margin: '0 auto', position: 'relative' }}>
            <h2>Actualizar Registro</h2>
            
            <form onSubmit={manejarActualizacion} className="form-container">
              <div className="form-grid">
                <input type="text" name="nombre" className="input-field" value={editando?.nombre || ''} onChange={manejarCambioEdicion} style={estiloError('nombre')} />
                <input type="text" name="apellido" className="input-field" value={editando?.apellido || ''} onChange={manejarCambioEdicion} style={estiloError('apellido')} />
              </div>
              <input type="email" name="correo" className="input-field" value={editando?.correo || ''} onChange={manejarCambioEdicion} style={estiloError('correo')} />
              <div className="form-grid">
                <input type="number" name="celular" className="input-field" value={editando?.celular || ''} onChange={manejarCambioEdicion} style={estiloError('celular')} />
                <input type="number" name="dni" className="input-field" value={editando?.dni || ''} onChange={manejarCambioEdicion} style={estiloError('dni')} />
              </div>
              
              <div className="modal-actions">
                <button type="submit" className="btn" style={{ flex: 1 }}>Guardar Cambios</button>
                <button type="button" className="btn" onClick={manejarEliminacion} style={{ flex: 1, backgroundColor: '#ef4444' }}>Eliminar</button>
                <button type="button" className="btn" onClick={() => setEditando(null)} style={{ flex: 1, backgroundColor: '#64748b' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}