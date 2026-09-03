import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductoPorId } from '../services/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCart();

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        setLoading(true);
        const data = await getProductoPorId(id);
        setProducto(data);
      } catch (err) {
        setError('Error al cargar el producto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto, cantidad);
    alert('Producto agregado al carrito');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Cargando producto...</p>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-red-600 mb-4">{error}</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800 mb-8 inline-block">
          ← Volver a Productos
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center h-96">
            <span className="text-9xl">📦</span>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {producto.nombre}
            </h1>

            <div className="mb-6 pb-6 border-b">
              <p className="text-lg text-gray-600 mb-2">
                Categoría:{' '}
                <span className="font-bold text-gray-800">
                  {producto.categoria}
                </span>
              </p>
              {producto.creadoEn && (
                <p className="text-sm text-gray-500">
                  Agregado el: {new Date(producto.creadoEn).toLocaleDateString()}
                </p>
              )}
            </div>

            {producto.atributos &&
              Object.keys(producto.atributos).length > 0 && (
                <div className="mb-6 pb-6 border-b">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Especificaciones
                  </h2>
                  <div className="space-y-2">
                    {Object.entries(producto.atributos).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between py-2 border-b border-gray-200"
                      >
                        <span className="text-gray-600 capitalize">{key}:</span>
                        <span className="font-bold text-gray-800">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            <div className="mb-8">
              <p className="text-5xl font-bold text-blue-600 mb-4">
                ${producto.precio || 0}
              </p>

              <div className="flex gap-4 items-center mb-6">
                <label className="text-lg font-bold text-gray-800">
                  Cantidad:
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                    className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={cantidad}
                    onChange={(e) =>
                      setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-16 text-center border rounded px-2 py-1"
                  />
                  <button
                    onClick={() => setCantidad(cantidad + 1)}
                    className="bg-gray-300 hover:bg-gray-400 w-10 h-10 rounded transition"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAgregarCarrito}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-lg transition mb-4"
              >
                🛒 Agregar al Carrito
              </button>
            </div>

            <Link
              to="/"
              className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition block text-center"
            >
              Seguir Comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
