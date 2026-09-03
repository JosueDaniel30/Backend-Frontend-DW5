const { ObjectId } = require('mongodb');
const { getMongoDatabase } = require('../database/mongo');

function obtenerColeccion() {
  const db = getMongoDatabase();
  return db.collection('productos');
}

// GET /api/productos
async function obtenerProductos(req, res) {
  try {
    const productos = await obtenerColeccion()
      .find({})
      .sort({ nombre: 1 })
      .toArray();

    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar productos en MongoDB' });
  }
}

// GET /api/productos/:id
async function obtenerProductoPorId(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ObjectId inválido' });
    }

    const producto = await obtenerColeccion().findOne({
      _id: new ObjectId(id),
    });

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al consultar el producto' });
  }
}

// POST /api/productos
async function crearProducto(req, res) {
  try {
    const { nombre, categoria, precio, atributos } = req.body;

    if (!nombre || !categoria) {
      return res.status(400).json({
        error: 'nombre y categoria son obligatorios',
      });
    }

    const nuevoProducto = {
      nombre,
      categoria,
      precio: precio ?? null,
      // atributos puede tener distinta estructura para cada producto.
      atributos: atributos ?? {},
      creadoEn: new Date(),
    };

    const resultado = await obtenerColeccion().insertOne(nuevoProducto);

    res.status(201).json({
      _id: resultado.insertedId,
      ...nuevoProducto,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
}

// PUT /api/productos/:id
async function actualizarProducto(req, res) {
  try {
    const { id } = req.params;
    const { nombre, categoria, precio, atributos } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ObjectId inválido' });
    }

    const resultado = await obtenerColeccion().findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          nombre,
          categoria,
          precio: precio ?? null,
          atributos: atributos ?? {},
        },
      },
      { returnDocument: 'after' }
    );

    if (!resultado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
}

// DELETE /api/productos/:id
async function eliminarProducto(req, res) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ObjectId inválido' });
    }

    const resultado = await obtenerColeccion().findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!resultado) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto eliminado',
      producto: resultado,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
}

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
