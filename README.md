# 🎓 UniversidadDevSenior

Sistema de gestión universitaria desarrollado como proyecto CRUD (Create, Read, Update, Delete), orientado a la administración de información académica mediante una interfaz web moderna y funcional.

El proyecto permite realizar operaciones completas de registro, consulta, actualización y eliminación de información, aplicando conceptos fundamentales del desarrollo de software como componentes, servicios, manejo de formularios, consumo de APIs y organización modular del código.

---

## 📌 Descripción del proyecto

**UniversidadDevSenior** es una aplicación web desarrollada para simular un sistema básico de gestión universitaria.

El objetivo principal del proyecto es implementar un sistema CRUD que permita administrar diferentes registros de una universidad de manera sencilla e intuitiva.

A través de la aplicación, el usuario puede:

- 👀 Consultar registros existentes.
- ➕ Crear nuevos registros.
- ✏️ Editar información existente.
- 🗑️ Eliminar registros.
- 🔄 Actualizar la información mostrada.
- 📝 Gestionar información mediante formularios.
- ⚠️ Validar los datos ingresados.
- 🔗 Conectarse con el backend mediante peticiones HTTP.

Este proyecto fue desarrollado como una práctica para fortalecer conocimientos de **desarrollo frontend, backend, APIs REST y operaciones CRUD**.

---

## 🎯 Objetivos

### Objetivo general

Desarrollar una aplicación web capaz de gestionar información universitaria mediante operaciones CRUD, aplicando buenas prácticas de programación y una arquitectura organizada.

### Objetivos específicos

- 📚 Implementar operaciones **CRUD**.
- 🧩 Trabajar con componentes reutilizables.
- 🔗 Consumir servicios mediante peticiones HTTP.
- 📝 Implementar formularios para crear y editar registros.
- ✅ Realizar validaciones de información.
- 🗑️ Implementar eliminación de registros.
- 🔄 Actualizar dinámicamente la información.
- 📂 Mantener una estructura organizada del proyecto.
- 💻 Aplicar conceptos de desarrollo web moderno.
- 🌐 Integrar frontend y backend mediante una API REST.

---

## ⚙️ Funcionalidades

### 👥 Gestión de registros

El sistema permite administrar los registros almacenados en la aplicación.

### ➕ Crear

Permite agregar un nuevo registro mediante un formulario.

El usuario debe ingresar la información solicitada y posteriormente guardar el registro.

### 👀 Consultar

Permite visualizar los registros existentes en una tabla o listado.

### ✏️ Actualizar

Permite seleccionar un registro existente y modificar su información.

### 🗑️ Eliminar

Permite eliminar registros que ya no sean necesarios.

### 🔄 Actualización de información

Después de realizar operaciones como crear, editar o eliminar, la información puede actualizarse para mostrar los datos actuales.

### ⚠️ Validaciones

Los formularios cuentan con validaciones para evitar el envío de información incorrecta o incompleta.

---

## 🧠 Conceptos aplicados

Durante el desarrollo del proyecto se aplicaron diferentes conceptos importantes del desarrollo de software:

- CRUD
- Componentes
- Servicios
- Inyección de dependencias
- Formularios
- Validaciones
- HTTP
- APIs REST
- JSON
- Peticiones GET
- Peticiones POST
- Peticiones PUT
- Peticiones DELETE
- Manejo de eventos
- Arquitectura modular
- Separación de responsabilidades
- Manejo de errores
- Git y GitHub

---

## 🛠️ Tecnologías utilizadas

### 💻 Frontend

- 🅰️ **Angular**
- 📜 **TypeScript**
- 🌐 **HTML5**
- 🎨 **CSS3**
- 📡 **HttpClient**
- 📦 **npm**

### Instalación

Para ejecutar el proyecto localmente es necesario tener instalado:

🟢 Node.js
📦 npm
🅰️ Angular CLI
🐙 Git

### ⚙️ Backend

El frontend se comunica con un backend mediante una API REST.

Dependiendo de la configuración utilizada en el proyecto, el backend puede encargarse de:

- Procesar solicitudes HTTP.
- Consultar información.
- Crear registros.
- Actualizar registros.
- Eliminar registros.
- Comunicarse con la base de datos.

### 🗄️ Base de datos

El proyecto utiliza una base de datos para almacenar la información administrada por el sistema.

---

## 🏗️ Arquitectura del proyecto

El proyecto está organizado siguiendo una estructura modular para facilitar su mantenimiento y escalabilidad.

Una estructura aproximada del proyecto es:

```text
UniversidadDevSenior/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── ...
│   │   │
│   │   ├── services/
│   │   │   ├── ...
│   │   │
│   │   ├── models/
│   │   │   ├── ...
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.routes.ts
│   │
│   ├── assets/
│   │
│   ├── index.html
│   └── main.ts
│
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
