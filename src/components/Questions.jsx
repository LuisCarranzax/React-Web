import { useState } from 'react';

const preguntasFrecuentes = [
  {
    pregunta: "¿Qué diferencias existen entre REST y SOAP, y por qué fue mejor utilizar REST en este caso?",
    respuesta: "REST utiliza HTTP estándar, es más simple y flexible, mientras que SOAP requiere XML y un estándar más rígido. En este caso, REST fue mejor porque es más ligero y fácil de implementar."
  },
  {
    pregunta: "¿Cómo resolviste cualquier error que surgió durante la instalación de los paquetes de Node.js?",
    respuesta: "Para resolver los errores durante la instalación de paquetes de Node.js, se deben seguir los siguientes pasos: \n1. Verificar la conexión a internet. \n2. Ejecutar el comando 'npm install' para instalar todas las dependencias. \n3. Si el error persiste, eliminar la carpeta 'node_modules' y el archivo 'package-lock.json' para realizar una instalación limpia. \n4. Verificar que la versión de Node.js sea compatible con los paquetes requeridos. \n5. En caso de errores específicos, buscar en la documentación oficial de los paquetes o en foros de ayuda para encontrar soluciones personalizadas."
  },
  {
    pregunta: "¿Cómo manejaste los errores en las rutas de la API para mejorar la experiencia del usuario?",
    respuesta: "Para manejar los errores en las rutas de la API y mejorar la experiencia del usuario, se deben seguir los siguientes pasos: \n1. Verificar que la API esté funcionando correctamente. \n2. Ejecutar el comando 'npm start' para iniciar el servidor. \n3. Si el error persiste, eliminar la carpeta 'node_modules' y el archivo 'package-lock.json' para realizar una instalación limpia. \n4. Verificar que la versión de Node.js sea compatible con la API. \n5. En caso de errores específicos, buscar en la documentación oficial de la API o en foros de ayuda para encontrar soluciones personalizadas."
  },
  {
    pregunta: "¿Qué pasos consideraste importantes al estructurar los archivos del proyecto?",
    respuesta: "Para estructurar los archivos del proyecto, se deben seguir los siguientes pasos: \n1. Crear una carpeta para el proyecto. \n2. Crear una carpeta para el backend. \n3. Crear una carpeta para el frontend. \n4. Crear una carpeta para la base de datos. \n5. Crear una carpeta para la documentación. \n6. Crear una carpeta para las pruebas. \n7. Crear una carpeta para las contribuciones."
  },
  {
    pregunta: "¿Qué has aprendido sobre el ciclo de vida del desarrollo de una API REST y cómo se aplica a otros proyectos futuros?",
    respuesta: "He aprendido que el ciclo de vida del desarrollo de una API REST se aplica a otros proyectos futuros de la siguiente manera: \n1. Crear una carpeta para el proyecto. \n2. Crear una carpeta para el backend. \n3. Crear una carpeta para el frontend. \n4. Crear una carpeta para la base de datos. \n5. Crear una carpeta para la documentación. \n6. Crear una carpeta para las pruebas. \n7. Crear una carpeta para las contribuciones."
  }
];

export default function Questions() {
  const [activa, setActiva] = useState(null);

  const togglePregunta = (index) => {
    setActiva(activa === index ? null : index);
  };

  return (
    <div className="card page-transition faq-section">
      <div className="faq-header">
        <h2>Preguntas del Proyecto</h2>
      </div>
      
      <div className="faq-list">
        {preguntasFrecuentes.map((item, index) => {
          const estaAbierta = activa === index;

          return (
            <div key={index} className={`faq-item ${estaAbierta ? 'abierta' : ''}`}>
              
              <button className="faq-pregunta" onClick={() => togglePregunta(index)}>
                <h3>{item.pregunta}</h3>
                <span className="faq-icono">▼</span>
              </button>

              <div className="faq-respuesta">
                <div className="faq-contenido">
                  {item.respuesta}
                </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}