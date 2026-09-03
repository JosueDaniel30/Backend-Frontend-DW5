const express = require('express');

const {
  obtenerProductos,
  obtenerProductosDisponibles,
  obtenerProductoPorId,
  buscarProductosPorNombre,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productos.controller');

const router = express.Router();

router.get('/', obtenerProductos);
router.get('/disponibles', obtenerProductosDisponibles);
router.get('/:id', obtenerProductoPorId);
router.get('/buscar/:nombre', buscarProductosPorNombre);
router.post('/', crearProducto);
router.put('/:id', actualizarProducto);
router.delete('/:id', eliminarProducto);


module.exports = router;