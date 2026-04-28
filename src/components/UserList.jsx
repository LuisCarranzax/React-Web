import { useState, useEffect } from 'react';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos que obtenemos "productos" o usuarios
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div className="page-transition">
      <div style={{ marginBottom: '20px' }}>
        <h2>Directorio de Contactos / Productos</h2>
        <p style={{ color: '#64748b' }}>Información cargada dinámicamente desde una API.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
          Cargando datos... ⏳
        </div>
      ) : (
        <div className="grid-container">
          {users.map((user) => (
            <div key={user.id} className="product-card">
              <div className="product-avatar">
                {user.name.charAt(0)}
              </div>
              
              <div>
                <h3 className="product-name">{user.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: '600' }}>
                  @{user.username}
                </span>
              </div>

              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="product-info">
                  📧 {user.email}
                </div>
                <div className="product-info">
                  🏢 {user.company.name}
                </div>
                <div className="product-info">
                  📍 {user.address.city}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}