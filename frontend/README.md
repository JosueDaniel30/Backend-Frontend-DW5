# TiendaShop - Frontend E-commerce

Frontend moderno para una plataforma de e-commerce integrada con un backend Node.js + PostgreSQL + MongoDB.

## Características

- ✅ **Catálogo de Productos** - Listado completo de productos desde MongoDB con filtrado por categoría
- ✅ **Detalle de Producto** - Página individual de cada producto con especificaciones
- ✅ **Carrito de Compras** - Gestión completa del carrito con localStorage
- ✅ **Autenticación de Usuarios** - Registro e inicio de sesión desde PostgreSQL
- ✅ **Checkout** - Proceso de compra paso a paso (datos usuario, envío, pago)
- ✅ **Responsive Design** - Totalmente optimizado para móvil, tablet y desktop
- ✅ **Tailwind CSS** - Estilos modernos y limpios

## Tecnologías Usadas

- **React 18** - Librería de UI
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación y routing
- **Axios** - Cliente HTTP para API
- **Tailwind CSS** - Framework de estilos
- **Context API** - Manejo de estado global (carrito y usuario)

## Instalación

### Prerrequisitos

- Node.js 18 o superior
- El backend corriendo en `http://localhost:3000`

### Pasos

```bash
# Navegar a la carpeta del frontend
cd frontend

# Las dependencias ya están instaladas, pero si no:
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegación principal
│   │   ├── ProductCard.jsx     # Tarjeta de producto
│   │   └── CartItem.jsx        # Item del carrito
│   ├── context/
│   │   └── CartContext.jsx     # Context para carrito y usuario
│   ├── pages/
│   │   ├── Home.jsx            # Página principal con productos
│   │   ├── Login.jsx           # Login/Registro
│   │   ├── Cart.jsx            # Página del carrito
│   │   ├── ProductDetail.jsx   # Detalle del producto
│   │   └── Checkout.jsx        # Página de checkout
│   ├── services/
│   │   └── api.js              # Cliente HTTP para el backend
│   ├── App.jsx                 # Componente principal con rutas
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── public/                     # Archivos estáticos
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Rutas Disponibles

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal con catálogo de productos |
| `/login` | Login/Registro de usuarios |
| `/producto/:id` | Detalle de un producto específico |
| `/carrito` | Carrito de compras |
| `/checkout` | Proceso de checkout |

## APIs Utilizadas

El frontend se conecta a las siguientes endpoints del backend:

### Productos (MongoDB)
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/:id` - Obtener un producto específico
- `POST /api/productos` - Crear producto
- `PUT /api/productos/:id` - Actualizar producto
- `DELETE /api/productos/:id` - Eliminar producto

### Usuarios (PostgreSQL)
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener un usuario específico
- `POST /api/usuarios` - Crear usuario (registro)
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

## Flujo de la Aplicación

### Visitante (sin login)
1. Explora el catálogo de productos
2. Filtra por categoría
3. Ve detalles de productos
4. Agrega productos al carrito
5. Para comprar: debe iniciar sesión o registrarse

### Usuario Logueado
1. Toda la experiencia anterior
2. Puede proceder al checkout
3. Ingresa datos de envío
4. Realiza el pago
5. Recibe confirmación de compra

## Manejo de Estado

### CartContext
Gestiona:
- **Carrito**: Array de productos con cantidades
- **Usuario**: Datos del usuario logueado
- **Métodos**:
  - `agregarAlCarrito()` - Agrega producto
  - `removerDelCarrito()` - Elimina producto
  - `actualizarCantidad()` - Cambia cantidad
  - `limpiarCarrito()` - Vacía el carrito
  - `setUsuarioLogueado()` - Loguea usuario
  - `logout()` - Cierra sesión

El estado se persiste en `localStorage` para mantener la sesión y carrito entre recargas.

## Variables de Entorno

Actualmente, la URL del API está hardcodeada en `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

Para cambiarla, modifica ese archivo o crea un `.env` con:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de la build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Notas Importantes

1. **Backend**: Asegúrate de que el backend esté corriendo en `http://localhost:3000`
2. **CORS**: El backend debe tener CORS habilitado para `http://localhost:5173`
3. **LocalStorage**: El carrito y usuario se guardan en el navegador
4. **Contraseñas**: Este es un proyecto educativo, no usa encriptación real de contraseñas

## Próximas Mejoras

- [ ] Integración con Stripe/PayPal para pagos reales
- [ ] Sistema de órdenes y historial
- [ ] Panel de administración
- [ ] Búsqueda de productos
- [ ] Wishlist/Favoritos
- [ ] Reviews y calificaciones
- [ ] Notificaciones por email

## Licencia

Este proyecto es educativo y está disponible bajo licencia MIT.
