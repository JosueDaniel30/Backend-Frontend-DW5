const { getMongoDatabase } = require('../database/mongo');
const { ObjectId } = require('mongodb');

// GET /api/clientes
async function obtenerClientes(req, res) {
  try {
    const db = getMongoDatabase();

    const clientes = await db
      .collection('clientes')
      .find({})
      .toArray();

    res.json(clientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al consultar clientes en MongoDB'
    });
  }
}

// POST /api/clientes
async function crearCliente(req, res) {
  try {
    const { nombre, email, activo } = req.body;

    if (!nombre || !email || activo === undefined) {
      return res.status(400).json({
        error: 'nombre, email y activo son obligatorios'
      });
    }

    const db = getMongoDatabase();

    const nuevoCliente = {
      nombre,
      email,
      activo
    };

    const resultado = await db
      .collection('clientes')
      .insertOne(nuevoCliente);

    res.status(201).json({
      _id: resultado.insertedId,
      ...nuevoCliente
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al crear cliente'
    });
  }
}

// PUT /api/clientes/:id
async function actualizarCliente(req, res) {
  try {
    const { id } = req.params;
    const { nombre, email, activo } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'ID no válido'
      });
    }

    if (!nombre || !email || activo === undefined) {
      return res.status(400).json({
        error: 'nombre, email y activo son obligatorios'
      });
    }

    const db = getMongoDatabase();

    const resultado = await db
      .collection('clientes')
      .updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            nombre,
            email,
            activo
          }
        }
      );

    if (resultado.matchedCount === 0) {
      return res.status(404).json({
        error: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente actualizado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al actualizar cliente'
    });
  }
}

// DELETE /api/clientes/:id
async function eliminarCliente(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'ID no válido'
      });
    }

    const db = getMongoDatabase();

    const resultado = await db
      .collection('clientes')
      .deleteOne({
        _id: new ObjectId(id)
      });

    if (resultado.deletedCount === 0) {
      return res.status(404).json({
        error: 'Cliente no encontrado'
      });
    }

    res.json({
      mensaje: 'Cliente eliminado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Error al eliminar cliente'
    });
  }
}

module.exports = {
  obtenerClientes,
  crearCliente,
  actualizarCliente,
  eliminarCliente
};