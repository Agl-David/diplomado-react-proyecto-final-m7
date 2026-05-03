# 📝 Proyecto Final: Gestión de Tareas con React

## 🎯 Objetivo

Finalizar la aplicación de "Lista de Tareas" (To-Do List) desarrollada en clase, aplicando los conceptos de reactividad, componentes y manejo de eventos en React.

---

## 🚀 Funcionalidades del sistema

El sistema permite gestionar el ciclo de vida completo de una tarea:

Incluye:

✔ Visualización de tareas en lista dinámica con opciones de:
- Editar
- Cambiar estado
- Eliminar

✔ Creación de nuevas tareas mediante formulario

✔ Edición de tareas existentes

✔ Eliminación de tareas individuales

✔ Gestión de estado entre:
- Pendiente
- Finalizada

---

## 🔗 API utilizada

Backend del docente:

https://taskdone-node.onrender.com

Documentación:

https://taskdone-node.onrender.com/api-docs

Endpoints principales:

- GET /tasks → listar tareas
- POST /tasks → crear tarea
- PUT /tasks/:id → editar tarea
- PATCH /tasks/:id → cambiar estado
- DELETE /tasks/:id → eliminar tarea

---

## 🛠️ Tecnologías utilizadas

- React + TypeScript
- Vite
- React Router DOM
- Material UI (MUI)
- Axios
- Zod
- Context API

---

## ⚙️ Instalación y ejecución

```bash
git clone https://github.com/Agl-David/diplomado-react-proyecto-final-m7.git
npm install
npm run dev

Variables de entorno

Crear archivo .env en la raíz:

VITE_API_URL=https://taskdone-node.onrender.com/api

## ALUMNO: DAVID ADRIAN AGUILAR LOZA