# Backend Node.js con PostgreSQL y MongoDB

Proyecto didáctico para mostrar cómo un mismo backend **Node.js + Express** puede trabajar directamente con dos motores de base de datos, **sin ORM**.

- PostgreSQL guarda `usuarios`.
- MongoDB guarda `productos`.
- Express expone rutas REST para ambos recursos.

## 1. Arquitectura

```text
Cliente / Postman
       |
       v
    Express
       |
       +--------------------+
       |                    |
       v                    v
 PostgreSQL               MongoDB
 usuarios                 productos
```

La idea principal es comparar lo que antes se hacía con archivos JSON:

```text
Controller -> fs.readFile() -> usuarios.json
```

con una base de datos real:

```text
Controller -> pool.query() -> PostgreSQL
Controller -> collection.find() -> MongoDB
```

## 2. Requisitos

Instalar:

- Node.js 18 o superior.
- PostgreSQL.
- MongoDB Community Server.
- Opcional: pgAdmin, MongoDB Compass y Postman.

## 3. Instalar dependencias

Dentro de la carpeta del proyecto:

```bash
npm install
```

Se instalarán:

- `express`: servidor HTTP.
- `pg`: driver para PostgreSQL.
- `mongodb`: driver oficial para MongoDB.
- `dotenv`: variables de entorno.

## 4. Configurar PostgreSQL

Crear una base llamada:

```text
curso_backend
```

Después ejecutar el archivo:

```text
postgres-init.sql
```

Este crea la tabla:

```text
usuarios
------------------------
id       SERIAL PK
nombre   VARCHAR
email    VARCHAR UNIQUE
edad     INTEGER
```

## 5. Configurar MongoDB

MongoDB no requiere crear previamente la colección.

Al insertar el primer producto, MongoDB puede crear automáticamente:

```text
Database: curso_backend_mongo
Collection: productos
```

Ejemplo de documento:

```json
{
  "nombre": "Laptop Lenovo",
  "categoria": "Computación",
  "precio": 6500,
  "atributos": {
    "ram": "16 GB",
    "ssd": "512 GB",
    "procesador": "Core i7"
  }
}
```

Otro producto puede tener atributos distintos:

```json
{
  "nombre": "Camisa deportiva",
  "categoria": "Ropa",
  "precio": 350,
  "atributos": {
    "talla": "XL",
    "color": "Verde"
  }
}
```

Esto ayuda a visualizar el esquema flexible de MongoDB.

## 6. Crear el archivo `.env`

Copiar:

```text
.env.example
```

como:

```text
.env
```

Ejemplo:

```env
PORT=3000

PG_HOST=localhost
PG_PORT=5432
PG_DATABASE=curso_backend
PG_USER=postgres
PG_PASSWORD=tu_password

MONGO_URI=mongodb://127.0.0.1:27017
MONGO_DATABASE=curso_backend_mongo
```

Cambiar `PG_PASSWORD` por la contraseña real de PostgreSQL.

## 7. Ejecutar

```bash
npm start
```

O durante desarrollo:

```bash
npm run dev
```

Si ambas conexiones funcionan aparecerá algo similar a:

```text
✅ PostgreSQL conectado: ...
✅ MongoDB conectado: curso_backend_mongo
🚀 Servidor ejecutándose en http://localhost:3000
```

## 8. Endpoints PostgreSQL: usuarios

### Obtener todos

```http
GET http://localhost:3000/api/usuarios
```

### Obtener uno

```http
GET http://localhost:3000/api/usuarios/1
```

### Crear

```http
POST http://localhost:3000/api/usuarios
Content-Type: application/json
```

Body:

```json
{
  "nombre": "Carlos Martínez",
  "email": "carlos@example.com",
  "edad": 30
}
```

### Actualizar

```http
PUT http://localhost:3000/api/usuarios/1
```

Body:

```json
{
  "nombre": "Carlos José Martínez",
  "email": "carlos@example.com",
  "edad": 31
}
```

### Eliminar

```http
DELETE http://localhost:3000/api/usuarios/1
```

## 9. Endpoints MongoDB: productos

### Obtener todos

```http
GET http://localhost:3000/api/productos
```

### Obtener uno

```http
GET http://localhost:3000/api/productos/OBJECT_ID
```

### Crear

```http
POST http://localhost:3000/api/productos
Content-Type: application/json
```

Body:

```json
{
  "nombre": "Laptop Lenovo",
  "categoria": "Computación",
  "precio": 6500,
  "atributos": {
    "ram": "16 GB",
    "ssd": "512 GB"
  }
}
```

### Actualizar

```http
PUT http://localhost:3000/api/productos/OBJECT_ID
```

### Eliminar

```http
DELETE http://localhost:3000/api/productos/OBJECT_ID
```

## 10. Explicación del código

### `src/database/postgres.js`

Crea un `Pool` de conexiones.

```js
const pool = new Pool({...});
```

Los controladores ejecutan SQL directamente:

```js
await pool.query('SELECT * FROM usuarios');
```

También usamos consultas parametrizadas:

```js
await pool.query(
  'SELECT * FROM usuarios WHERE id = $1',
  [id]
);
```

`$1` representa el primer parámetro enviado en el arreglo.

### `src/database/mongo.js`

Utiliza el driver oficial:

```js
const { MongoClient } = require('mongodb');
```

Después abre la base:

```js
client.db('curso_backend_mongo');
```

### `usuarios.controller.js`

Traduce las operaciones CRUD a SQL:

| REST | SQL |
|---|---|
| GET | SELECT |
| POST | INSERT |
| PUT | UPDATE |
| DELETE | DELETE |

### `productos.controller.js`

Traduce las operaciones CRUD a MongoDB:

| REST | MongoDB |
|---|---|
| GET | `find()` / `findOne()` |
| POST | `insertOne()` |
| PUT | `findOneAndUpdate()` |
| DELETE | `findOneAndDelete()` |

## 11. Comparación útil para clase

### Antes: JSON

```js
const contenido = fs.readFileSync('usuarios.json');
```

### PostgreSQL

```js
const resultado = await pool.query(
  'SELECT * FROM usuarios'
);
```

### MongoDB

```js
const productos = await db
  .collection('productos')
  .find({})
  .toArray();
```

Lo que cambia principalmente es la **capa de persistencia**.

## 12. Estructura del proyecto

```text
backend-node-postgres-mongo/
|
|-- src/
|   |-- controllers/
|   |   |-- usuarios.controller.js
|   |   `-- productos.controller.js
|   |
|   |-- database/
|   |   |-- postgres.js
|   |   `-- mongo.js
|   |
|   |-- routes/
|   |   |-- usuarios.routes.js
|   |   `-- productos.routes.js
|   |
|   |-- app.js
|   `-- server.js
|
|-- .env.example
|-- .gitignore
|-- postgres-init.sql
|-- package.json
`-- README.md
```

## 13. Puntos teóricos que se observan en esta práctica

1. Persistencia con DBMS en lugar de archivos.
2. SQL vs NoSQL.
3. Tabla vs colección.
4. Fila vs documento.
5. Primary Key vs `_id`.
6. Esquema definido vs flexible.
7. CRUD.
8. Consultas SQL parametrizadas.
9. Driver de base de datos.
10. Variables de entorno.
11. Código asíncrono con `async/await`.
12. Manejo básico de errores.

## 14. Importante

Este proyecto está hecho deliberadamente **sin ORM**.

El objetivo es que primero se observe el acceso directo:

```text
Node -> Driver -> Base de datos
```

Más adelante un ORM agregará otra capa:

```text
Node -> ORM -> Driver/Base de datos
```

Así resulta más fácil entender qué trabajo abstrae el ORM.
