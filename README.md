# FastPlanner

Aplicación de planificación rápida con React, Node.js y Prisma.

## 🚀 Instalación y Ejecución

### Prerrequisitos
- **Node.js** (versión 16 o superior)
- **npm** (viene con Node.js)

### 1. Instalación de Dependencias

```bash
# Instalar todas las dependencias
npm run install:all
```

### 2. Configuración de la Base de Datos

```bash
# Navegar al directorio backend
cd backend

# Generar el cliente de Prisma
npm run db:generate

# Aplicar las migraciones a la base de datos
npm run db:push
```

### 3. Ejecutar el Proyecto

```bash
# Desde el directorio raíz - ejecutar frontend y backend
npm run dev
```

### 4. Acceso a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001

## 📋 Comandos Útiles

```bash
# Desarrollo
npm run dev                 # Ejecutar frontend y backend
npm run dev:frontend       # Solo frontend
npm run dev:backend        # Solo backend

# Construcción
npm run build              # Construir todo el proyecto

# Base de datos
cd backend
npm run db:generate        # Generar cliente de Prisma
npm run db:push           # Aplicar cambios a la base de datos
npm run db:studio         # Abrir Prisma Studio
```

## 🛠️ Tecnologías

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM
- **Base de Datos**: PostgreSQL