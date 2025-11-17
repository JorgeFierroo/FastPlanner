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

## 🔐 Variables de Entorno (Backend)

Agrega estas variables al entorno (por ejemplo en un archivo `.env` en `backend/`) para configurar la firma y expiración de tokens:

- `JWT_SECRET` : Cadena secreta para firmar los JWT. **Requerido en producción**.
- `ACCESS_TOKEN_EXPIRY` : Tiempo de vida del access token (ej: `15m`, `1h`). Valor por defecto: `15m`.
- `REFRESH_TOKEN_DAYS` : Días de expiración para refresh tokens (entero). Valor por defecto: `7`.
- `REFRESH_TOKEN_EXTENDED_DAYS` : Días de expiración si el usuario marca "recordarme". Valor por defecto: `30`.

Ejemplo `.env` mínimo en `backend/.env`:

```
JWT_SECRET=una_clave_muy_larga_y_segura_que_debes_generar
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_DAYS=7
REFRESH_TOKEN_EXTENDED_DAYS=30
```

Nota: Para producción usa un secreto fuerte y almacénalo en un gestor de secretos (Azure Key Vault, AWS Secrets Manager, etc.).