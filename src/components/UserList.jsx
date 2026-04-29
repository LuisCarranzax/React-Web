import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserList({ datos = [], loading, onActualizar, onEliminar }) {
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);

  // 1. FILTRADO BLINDADO: Convertimos todo a texto de forma segura
  const datosFiltrados = datos.filter(persona => {
    const dniSeguro = String(persona?.dni || ''); // Si no hay DNI, usa texto vacío
    return dniSeguro.includes(busqueda);
  });

  const manejarClickTarjeta = (persona) => {
    setEditando(persona);
  };

  const manejarActualizacion = (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de guardar estos cambios?')) {
      onActualizar(editando.id, editando);
      toast.success('Registro actualizado correctamente', { icon: '✏️' });
      setEditando(null);
    }
  };

  const manejarEliminacion = () => {
    if (window.confirm(`¿Estás seguro de eliminar a ${editando?.nombre}?`)) {
      onEliminar(editando.id);
      toast.error('Registro eliminado', { icon: '🗑️' });
      setEditando(null);
    }
  };

// ... (todo tu código de arriba se queda igual)

  return (
    <> {/* 👈 1. Agregamos este Fragmento (etiqueta vacía) al inicio */}
      
      <div className="page-transition">
        <div style={{ marginBottom: '20px' }}>
          <h2>Directorio Registrado</h2>
          <p style={{ color: '#64748b' }}>Busca, edita o elimina registros. Haz clic en una tarjeta para gestionar.</p>
          
          <input 
            type="number" 
            className="input-field" 
            placeholder="🔍 Buscar por DNI..." 
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
            {datosFiltrados.map((persona) => {
              const inicialNombre = persona?.nombre ? String(persona.nombre).charAt(0).toUpperCase() : '👤';
              const inicialApellido = persona?.apellido ? String(persona.apellido).charAt(0).toUpperCase() : '';

              return (
                <div 
                  key={persona.id || Math.random()} 
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
      </div> {/* 👈 2. Cerramos el div de page-transition AQUÍ */}

      {/* 3. El modal ahora está AFUERA del contenedor animado, por lo que ocupará toda la pantalla */}
      {editando && (
        <div className="modal-overlay">
          <div className="card page-transition" style={{ maxWidth: '500px', width: '100%', margin: '0 auto', position: 'relative' }}>
            <h2>Actualizar Registro</h2>
            
            <form onSubmit={manejarActualizacion} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" className="input-field" value={editando?.nombre || ''} onChange={(e) => setEditando({...editando, nombre: e.target.value})} required />
                <input type="text" className="input-field" value={editando?.apellido || ''} onChange={(e) => setEditando({...editando, apellido: e.target.value})} required />
              </div>
              <input type="email" className="input-field" value={editando?.correo || ''} onChange={(e) => setEditando({...editando, correo: e.target.value})} required />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="number" className="input-field" value={editando?.celular || ''} onChange={(e) => setEditando({...editando, celular: e.target.value})} required />
                <input type="number" className="input-field" value={editando?.dni || ''} onChange={(e) => setEditando({...editando, dni: e.target.value})} required />
              </div>
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button type="submit" className="btn" style={{ flex: 1 }}>💾 Guardar</button>
                <button type="button" className="btn" onClick={manejarEliminacion} style={{ flex: 1, backgroundColor: '#ef4444' }}>🗑️ Eliminar</button>
                <button type="button" className="btn" onClick={() => setEditando(null)} style={{ flex: 1, backgroundColor: '#64748b' }}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </> /* 👈 4. Cerramos el Fragmento */
  );
}