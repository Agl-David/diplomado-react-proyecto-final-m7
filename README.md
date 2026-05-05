# 📝 Proyecto Final: Gestión de Tareas con React

## 🎯 Objetivo

Finalizar la aplicación de "Lista de Tareas" (To-Do List) desarrollada en clase, aplicando los conceptos de reactividad, componentes y manejo de eventos en React.

---

## 🚀 Funcionalidades del sistema

El sistema permite gestionar el ciclo de vida completo de una tarea:

✔ Visualización de tareas en lista dinámica con opciones de:

* Editar
* Cambiar estado
* Eliminar

✔ Creación de nuevas tareas mediante formulario

✔ Edición de tareas existentes

✔ Eliminación de tareas individuales

✔ Gestión de estado entre:

* Pendiente
* Finalizada

---

## 🔗 API utilizada

Backend del docente:
https://taskdone-node.onrender.com

Documentación:
https://taskdone-node.onrender.com/api-docs

Endpoints principales:

* GET /tasks → listar tareas
* POST /tasks → crear tarea
* PUT /tasks/:id → editar tarea
* PATCH /tasks/:id → cambiar estado
* DELETE /tasks/:id → eliminar tarea

---

## 🛠️ Tecnologías utilizadas

* React + TypeScript
* Vite
* React Router DOM
* Material UI (MUI)
* Axios
* Zod
* Context API

---

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto necesitas:

### 🔹 Node.js y npm

Descargar desde:
https://nodejs.org/

Verificar instalación:

```bash
node -v
npm -v
```

Se recomienda usar Node.js versión 18 o superior.

---

## 📦 Instalación y ejecución

```bash
git clone https://github.com/Agl-David/diplomado-react-proyecto-final-m7.git
cd diplomado-react-proyecto-final-m7
npm install
npm run dev
```

Abrir en navegador:
http://localhost:5173/

---

## ⚙️ Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=https://taskdone-node.onrender.com/api
```

---

## 🚀 Despliegue en GitHub Pages

### 1. Configurar `vite.config.ts`

```ts
export default defineConfig({
  base: '/diplomado-react-proyecto-final-m7/',
})
```

---

### 2. Configurar Router

```tsx
<BrowserRouter basename="/diplomado-react-proyecto-final-m7">
```

---

### 3. Construir proyecto

```bash
npm run build
```

---

### 4. Publicar en GitHub Pages

```bash
npm run deploy
```

---

## 🌐 Aplicación en producción

https://agl-david.github.io/diplomado-react-proyecto-final-m7/

---

## ⚠️ Nota importante

Para evitar error 404 al recargar en GitHub Pages, se utiliza un archivo:

public/404.html

Este archivo permite manejar correctamente las rutas de React Router en un hosting estático.

---

## 👨‍💻 Autor

**David Adrian Aguilar Loza**
