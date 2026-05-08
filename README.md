# Proyecto React-Web: Gestor de Contactos

## Descripción General
Esta aplicación es un gestor de contactos completo (Full-Stack). Proporciona una interfaz de usuario interactiva y una API RESTful para administrar la información de los contactos, permitiendo crear, visualizar, actualizar y eliminar registros almacenados en una base de datos.

## Tecnologías Utilizadas
* **Frontend**: React (creado con Vite), React Router DOM para la navegación, Formik y Yup para la gestión y validación de formularios, y React Hot Toast para las notificaciones.
* **Backend**: Node.js y Express.js.
* **Base de Datos**: MongoDB, utilizando Mongoose como ODM.
* **Infraestructura y Despliegue**: Docker.

## Funcionalidades Principales
* **Gestión de Contactos (CRUD)**: Capacidad para listar todos los contactos, añadir nuevos, actualizar información existente y eliminar registros.
* **Validación de Datos**: Formularios robustos con validaciones integradas en el cliente para garantizar la integridad de los datos antes de enviarlos.
* **API REST**: Backend configurado con rutas específicas (`/api/contacts`) que procesa las peticiones e interactúa de manera eficiente con la base de datos MongoDB.
* **Notificaciones de Usuario**: Alertas visuales para informar rápidamente sobre el estado de las operaciones, como la creación exitosa de un contacto o errores de validación.

## Despliegue con Docker (Ejecución en otra PC)
Para garantizar que la aplicación funcione en cualquier otra máquina de forma rápida y sin conflictos de dependencias, puedes utilizar Docker.

Sigue estos pasos para crear y ejecutar la imagen:

### Requisitos Previos
1. Tener instalado **Docker** (y Docker Desktop si usas Windows/Mac).
2. Tener una instancia de **MongoDB** en ejecución en la máquina anfitriona (el backend por defecto se conecta a `mongodb://host.docker.internal:27017/contactsDB`).

### Paso 1: Construir la Imagen de Docker
Abre una terminal en la raíz de este proyecto y ejecuta el siguiente comando para construir la imagen. En este ejemplo, la llamaremos `react-web-app`:

```bash
docker build -t react-web-app .
```

### Paso 2: Ejecutar el Contenedor
Una vez que la imagen se haya creado correctamente, inicia el contenedor mapeando el puerto 3000 de tu máquina al puerto 3000 del contenedor:

```bash
docker run -d -p 3000:3000 react-web-app
```
La aplicación backend estará disponible en `http://localhost:3000`.

### Desarrollo Local (Alternativa sin Docker)
Si prefieres correr el proyecto de forma local para modificar el código o probar características:
1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
2. Inicia el frontend (entorno de desarrollo Vite):
   ```bash
   npm run dev
   ```
3. En una terminal independiente, inicia el backend:
   ```bash
   node app.js
   ```
