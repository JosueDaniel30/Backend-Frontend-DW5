import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ producto }) {
  const { agregarAlCarrito } = useCart();

  const handleAgregarCarrito = () => {
    agregarAlCarrito(producto);
    alert('Producto agregado al carrito');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4">
      <div className="bg-gray-200 h-48 rounded-lg mb-4 flex items-center justify-center">
        <span className="text-4xl">📦</span>
      </div>

      <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
        {producto.nombre}
      </h3>

      <p className="text-sm text-gray-600 mb-2">
        Categoría: <strong>{producto.categoria}</strong>
      </p>

      {producto.atributos && Object.keys(producto.atributos).length > 0 && (
        <div className="text-xs text-gray-500 mb-2">
          {Object.entries(producto.atributos)
            .slice(0, 2)
            .map(([key, value]) => (
              <p key={key}>
                {key}: {value}
              </p>
            ))}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">
          ${producto.precio || 0}
        </span>
      </div>

      <div className="flex gap-2 mt-4">
        <Link
          to={`/producto/${producto._id}`}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition text-center"
        >
          Ver detalles
        </Link>
        <button
          onClick={handleAgregarCarrito}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
        >
          🛒 Agregar
        </button>
      </div>
    </div>
  );
}
