const cors = require('cors');
const express = require('express');

const productosRoutes = require('./routes/productos.routes');
const clientesRoutes = require('./routes/clientes.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    mensaje: 'API didáctica Node.js + PostgreSQL + MongoDB',
    endpoints: {
      postgres: '/api/productos',
      mongo: '/api/clientes',
    },
  });
});

app.use('/api/productos', productosRoutes);
app.use('/api/clientes', clientesRoutes);

module.exports = app;