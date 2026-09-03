# 🛍️ E-Commerce Completo: Backend + Frontend

Proyecto full-stack educativo que demuestra la integración entre un backend Node.js con PostgreSQL y MongoDB, y un frontend React moderno.

## 📋 Requisitos Previos

### Sistema
- Node.js 18 o superior
- npm o yarn
- PostgreSQL instalado y corriendo
- MongoDB instalado y corriendo

### Conocimientos
- JavaScript/ES6
- React básico
- Node.js/Express
- SQL y NoSQL

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│              http://localhost:5173                          │
└─────────────────────────────────────────────────────────────┘
                            ↕
                  API REST (Axios/HTTP)
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              Backend (Express + Node.js)                    │
│              http://localhost:3000                          │
├─────────────────────────────────────────────────────────────┤
│                      /api/usuarios → PostgreSQL             │
│                      /api/productos → MongoDB               │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Estructura del Proyecto

```
backend-node-postgres-mongo/
├── src/
│   ├── app.js                    # Express app
│   ├── server.js                 # Punto de entrada
│   ├── controllers/
│   │   ├── usuarios.controller.js    # CRUD PostgreSQL
│   │   └── productos.controller.js   # CRUD MongoDB
│   ├── database/
│   │   ├── postgres.js          # Conexión PostgreSQL
│   │   └── mongo.js             # Conexión MongoDB
│   └── routes/
│       ├── usuarios.routes.js
│       └── productos.routes.js
├── postgres-init.sql            # Schema PostgreSQL
├── package.json
├── .env                         # Variables de entorno
└── README.md

frontend/
├── src/
│   ├── components/              # Componentes reutilizables
│   ├── context/                 # Context API
│   ├── pages/                   # Páginas principales
│   ├── services/                # API client
│   ├── App.jsx                  # Routing
│   └── main.jsx
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## 🚀 Guía de Instalación y Ejecución

### 1️⃣ Backend - Configuración Inicial

```bash
# Navegar al directorio del proyecto
cd backend-node-postgres-mongo

# Instalar dependencias
npm install

# Crear archivo .env (copiar de .env.example)
# - Configurar credenciales PostgreSQL
# - Configurar URL MongoDB

# Verificar que PostgreSQL esté corriendo y crear base de datos
# Ejecutar postgres-init.sql en tu cliente PostgreSQL

# Iniciar el servidor
npm run dev
# o en producción
npm start
```

### 2️⃣ Frontend - Configuración Inicial

```bash
# Navegar al directorio del frontend
cd frontend

# Instalar dependencias (ya están instaladas)
npm install

# Crear .env (opcional, copiar de .env.example)

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 🔌 Variables de Entorno

### Backend (.env)
```env
PORT=3000

# PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=curso_backend
PG_USER=postgres
PG_PASSWORD=tu_password

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=curso_backend_mongo
```

### Frontend (.env.local)
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📱 Funcionalidades Principales

### Para Visitantes
- ✅ Listar productos con filtrado por categoría
- ✅ Ver detalles de cada producto
- ✅ Agregar productos al carrito
- ✅ Ver resumen del carrito

### Para Usuarios Registrados
- ✅ Crear cuenta
- ✅ Iniciar sesión
- ✅ Acceso completo al checkout
- ✅ Realizar compras con datos de envío y pago

## 🔌 API Endpoints

### Usuarios (PostgreSQL) - `/api/usuarios`

```http
# Obtener todos
GET /api/usuarios

# Obtener uno
GET /api/usuarios/1

# Crear
POST /api/usuarios
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "edad": 30
}

# Actualizar
PUT /api/usuarios/1
{
  "nombre": "Juan José Pérez",
  "email": "juan@example.com",
  "edad": 31
}

# Eliminar
DELETE /api/usuarios/1
```

### Productos (MongoDB) - `/api/productos`

```http
# Obtener todos
GET /api/productos

# Obtener uno
GET /api/productos/507f1f77bcf86cd799439011

# Crear
POST /api/productos
{
  "nombre": "Laptop",
  "categoria": "Computación",
  "precio": 5000,
  "atributos": {
    "ram": "16GB",
    "ssd": "512GB"
  }
}

# Actualizar
PUT /api/productos/507f1f77bcf86cd799439011
{
  "nombre": "Laptop Pro",
  "precio": 5500
}

# Eliminar
DELETE /api/productos/507f1f77bcf86cd799439011
```

## 🧪 Flujo Completo de Compra

1. **Exploración**
   - Usuario abre la app
   - Ve listado de productos
   - Filtra por categoría

2. **Producto**
   - Hace clic en "Ver detalles"
   - Ve especificaciones
   - Ajusta cantidad
   - Agrega al carrito

3. **Carrito**
   - Ve productos agregados
   - Puede modificar cantidades
   - Ve el total
   - Procede al checkout

4. **Autenticación**
   - Si no está logueado, debe registrarse o iniciar sesión
   - Crea cuenta o accede con existente

5. **Checkout**
   - Paso 1: Confirma datos de usuario
   - Paso 2: Ingresa dirección de envío
   - Paso 3: Ingresa datos de pago
   - Paso 4: Confirmación de compra

## 🛠️ Comandos Útiles

### Backend
```bash
npm start              # Producción
npm run dev            # Desarrollo con nodemon
npm test               # Tests (si existen)
```

### Frontend
```bash
npm run dev            # Desarrollo
npm run build          # Build para producción
npm run preview        # Preview de build
npm run lint           # Linting
```

## 🔍 Debugging

### Backend
- Revisar logs en consola del servidor
- Ver queries SQL/MongoDB en consola
- Usar Postman o curl para probar endpoints

### Frontend
- Usar Vue DevTools / React DevTools
- Abrir DevTools del navegador (F12)
- Revisar Network tab para llamadas al API
- Revisar localStorage para persistencia

## ⚠️ Problemas Comunes

### "Cannot connect to PostgreSQL"
- Verificar que PostgreSQL está corriendo: `psql -U postgres`
- Verificar credenciales en .env
- Verificar que la base de datos existe

### "Cannot connect to MongoDB"
- Verificar que mongod está corriendo: `mongosh`
- Verificar MONGO_URI en .env

### "CORS error en frontend"
- El backend debe tener CORS habilitado
- Revisar que `app.use(express.json())` está en app.js

### Carrito no persiste
- Verificar localStorage en DevTools
- Asegurarse que el navegador permite localStorage

## 📚 Recursos Educativos

- [Express Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🚀 Próximos Pasos

1. **Seguridad**
   - Implementar JWT para autenticación
   - Encriptar contraseñas
   - Validar inputs más estrictamente

2. **Base de Datos**
   - Agregar índices en productos
   - Crear tabla de órdenes
   - Implementar transacciones

3. **Frontend**
   - Agregar búsqueda
   - Sistema de reviews
   - Wishlist/Favoritos
   - Dashboard de órdenes

4. **Deployment**
   - Deployar backend en Heroku/Railway
   - Deployar frontend en Vercel/Netlify
   - Usar variables de entorno en producción

## 📝 Licencia

Proyecto educativo bajo licencia MIT.

---

**¿Preguntas?** Revisar los README.md en las carpetas de backend y frontend para más detalles.
