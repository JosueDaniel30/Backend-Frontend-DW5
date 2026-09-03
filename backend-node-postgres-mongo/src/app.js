const express = require('express');
const usuariosRoutes = require('./routes/usuarios.routes');
const productosRoutes = require('./routes/productos.routes');

const app = express();

// Permite recibir JSON en req.body.
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API didáctica Node.js + PostgreSQL + MongoDB',
    endpoints: {
      postgres: '/api/usuarios',
      mongo: '/api/productos',
    },
  });
});

app.use('/api/usuarios', usuariosRoutes);
app.use('/api/productos', productosRoutes);

module.exports = app;
