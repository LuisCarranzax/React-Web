// Centralizamos la URL para no repetirla
const API_URL = 'http://127.0.0.1:3000/api/contacts';

// 1. GET: Obtener todos los registros
export const obtenerTodos = async () => {
  try {
    const respuesta = await fetch(API_URL);
    return await respuesta.json(); // Devolvemos los datos puros
  } catch (error) {
    console.error('Error al obtener datos:', error);
    return []; // Si falla, devolvemos un arreglo vacío
  }
};

// 2. POST: Crear un nuevo registro
export const crearNuevo = async (datosFormulario) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosFormulario)
    });
    
    if (respuesta.ok) {
      return await respuesta.json(); // Devolvemos el usuario creado con su ID
    }
    return null;
  } catch (error) {
    console.error('Error al crear:', error);
    return null;
  }
};

// 3. PUT: Actualizar registro
export const actualizarExistente = async (id, datosActualizados) => {
  try {
    // Limpiamos los IDs antes de enviar (como hicimos antes)
    const { _id, id: reactId, __v, ...datosLimpios } = datosActualizados;

    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datosLimpios)
    });

    if (respuesta.ok) {
      return await respuesta.json(); // Devolvemos los datos nuevos
    }
    return null;
  } catch (error) {
    console.error('Error al actualizar:', error);
    return null;
  }
};

// 4. DELETE: Eliminar registro
export const eliminarPorId = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    return respuesta.ok; // Devuelve true si se borró bien, false si falló
  } catch (error) {
    console.error('Error al eliminar:', error);
    return false;
  }
};