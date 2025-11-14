# 🐘 Configuración de PostgreSQL para FastPlanner

## 📝 Pasos completados:
✅ PostgreSQL instalado
✅ Base de datos creada
✅ Contraseña configurada

## 🔧 Configurar credenciales:

### 1. Edita el archivo `backend\.env`

Abre el archivo y cambia esta línea:
```
DATABASE_URL="postgresql://postgres:tu_contraseña_aqui@localhost:5432/fastplanner?schema=public"
```

Por tus credenciales reales:
```
DATABASE_URL="postgresql://TU_USUARIO:TU_CONTRASEÑA@localhost:5432/TU_BASE_DATOS?schema=public"
```

**Ejemplo:**
Si tu usuario es `postgres`, contraseña `mipassword123` y base de datos `fastplanner`:
```
DATABASE_URL="postgresql://postgres:mipassword123@localhost:5432/fastplanner?schema=public"
```

## 🚀 Ejecutar migraciones:

### Opción 1: Usar `db push` (Recomendado para desarrollo)
```powershell
cd backend
npx prisma db push
npx prisma generate
```

### Opción 2: Crear migraciones (Para producción)
```powershell
cd backend
# Si existe carpeta migrations con migraciones de SQLite, elimínala:
Remove-Item -Path ".\prisma\migrations" -Recurse -Force

# Crear nueva migración
npx prisma migrate dev --name init
```

### Nota si cambias enums o modelos (por ejemplo: agregar el rol `colaborador`)

Si actualizas `prisma/schema.prisma` (por ejemplo, agregando un nuevo valor al enum `ProjectRoleType`), crea y aplica una migración con:

```powershell
cd backend
npx prisma migrate dev --name add-colaborador-role
npx prisma generate
```

Si solo quieres sincronizar el esquema en desarrollo sin crear una migración explícita, puedes usar `npx prisma db push` (no recomendado para producción).

## ✅ Verificar que funcionó:

```powershell
# Ver la base de datos en el navegador
npx prisma studio
```

Esto abrirá una interfaz web donde puedes ver todas las tablas creadas.

## 🎯 Iniciar el servidor:

```powershell
cd backend
npm run dev
```

Deberías ver:
```
🚀 Servidor corriendo en http://localhost:3001
📋 Health check: http://localhost:3001/api/health
```

## 🐛 Solución de problemas:

### Error: "Can't reach database server"
- Verifica que PostgreSQL esté corriendo
- En PowerShell: `Get-Service -Name postgresql*`
- Si está detenido: `Start-Service postgresql-x64-XX` (reemplaza XX con tu versión)

### Error: "authentication failed"
- Verifica tu usuario y contraseña en el `.env`
- Intenta conectarte con pgAdmin para confirmar las credenciales

### Error: "database does not exist"
- Crea la base de datos manualmente:
```sql
-- En pgAdmin o psql:
CREATE DATABASE fastplanner;
```

## 📋 Comandos útiles de psql:

```powershell
# Conectar a PostgreSQL
psql -U postgres

# Listar bases de datos
\l

# Conectar a una base de datos
\c fastplanner

# Listar tablas
\dt

# Salir
\q
```

---

Una vez configurado, continúa con el README principal para probar la autenticación.
