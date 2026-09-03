const { pool } = require('../database/postgres');

// GET /api/productos
async function obtenerProductos(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT id, nombre, precio, stock FROM productos ORDER BY id'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al consultar productos en PostgreSQL',
    });
  }
}

// GET /api/productos/:id
async function obtenerProductoPorId(req, res) {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT id, nombre, precio, stock FROM productos WHERE id = $1',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado',
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al consultar el producto',
    });
  }
}

// POST /api/productos
async function crearProducto(req, res) {
  try {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        error: 'nombre, precio y stock son obligatorios',
      });
    }

    const resultado = await pool.query(
      `INSERT INTO productos(nombre, precio, stock)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, precio, stock`,
      [nombre, precio, stock]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al crear producto',
    });
  }
}

// PUT /api/productos/:id
async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio === undefined || stock === undefined) {
      return res.status(400).json({
        error: 'nombre, precio y stock son obligatorios',
      });
    }

    const resultado = await pool.query(
      `UPDATE productos
       SET nombre = $1,
           precio = $2,
           stock = $3
       WHERE id = $4
       RETURNING id, nombre, precio, stock`,
      [nombre, precio, stock, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado',
      });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al actualizar producto',
    });
  }
}

// DELETE /api/productos/:id
async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      `DELETE FROM productos
       WHERE id = $1
       RETURNING id, nombre, precio, stock`,
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({
        error: 'Producto no encontrado',
      });
    }

    res.json({
      mensaje: 'Producto eliminado',
      producto: resultado.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al eliminar producto',
    });
  }
}

// GET /api/productos/disponibles
async function obtenerProductosDisponibles(req, res) {
  try {
    const resultado = await pool.query(
      `SELECT id, nombre, precio, stock
       FROM productos
       WHERE stock > 0
       ORDER BY id`
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al consultar productos disponibles'
    });
  }
}

// GET /api/productos/buscar/:nombre
async function buscarProductosPorNombre(req, res) {
  try {
    const { nombre } = req.params;

    const resultado = await pool.query(
      `SELECT id, nombre, precio, stock
       FROM productos
       WHERE nombre ILIKE $1
       ORDER BY id`,
      [`%${nombre}%`]
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al buscar productos por nombre'
    });
  }
}

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  obtenerProductosDisponibles,
  actualizarProducto,
  eliminarProducto,
  buscarProductosPorNombre,
};