const { pool } = require('../database/postgres');

// GET /api/usuarios
async function obtenerUsuarios(req, res) {
  try {
    const resultado = await pool.query(
      'SELECT id, nombre, email, edad FROM usuarios ORDER BY id'
    );

    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar usuarios en PostgreSQL' });
  }
}

// GET /api/usuarios/:id
async function obtenerUsuarioPorId(req, res) {
  try {
    const { id } = req.params;

    // $1 evita concatenar directamente el valor recibido dentro del SQL.
    const resultado = await pool.query(
      'SELECT id, nombre, email, edad FROM usuarios WHERE id = $1',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar el usuario' });
  }
}

// POST /api/usuarios
async function crearUsuario(req, res) {
  try {
    const { nombre, email, edad } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({
        error: 'nombre y email son obligatorios',
      });
    }

    const resultado = await pool.query(
      `INSERT INTO usuarios(nombre, email, edad)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, email, edad`,
      [nombre, email, edad ?? null]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);

    // PostgreSQL usa el código 23505 para una violación UNIQUE.
    if (error.code === '23505') {
      return res.status(409).json({ error: 'El email ya existe' });
    }

    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

// PUT /api/usuarios/:id
async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const { nombre, email, edad } = req.body;

    const resultado = await pool.query(
      `UPDATE usuarios
       SET nombre = $1, email = $2, edad = $3
       WHERE id = $4
       RETURNING id, nombre, email, edad`,
      [nombre, email, edad ?? null, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

// DELETE /api/usuarios/:id
async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING id, nombre, email, edad',
      [id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      mensaje: 'Usuario eliminado',
      usuario: resultado.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}

module.exports = {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
};
