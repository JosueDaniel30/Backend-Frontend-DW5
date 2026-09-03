import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { actualizarCantidad, removerDelCarrito } = useCart();

  const subtotal = item.precio * item.cantidad;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex gap-4 items-start">
      <div className="bg-gray-200 w-24 h-24 rounded-lg flex items-center justify-center flex-shrink-0">
        <span className="text-3xl">📦</span>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{item.nombre}</h3>
        <p className="text-sm text-gray-600">
          Categoría: <strong>{item.categoria}</strong>
        </p>
        <p className="text-blue-600 font-bold mt-2">${item.precio}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => actualizarCantidad(item._id, item.cantidad - 1)}
          className="bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded transition"
        >
          −
        </button>
        <input
          type="number"
          value={item.cantidad}
          onChange={(e) =>
            actualizarCantidad(item._id, parseInt(e.target.value) || 1)
          }
          className="w-12 text-center border rounded px-2 py-1"
        />
        <button
          onClick={() => actualizarCantidad(item._id, item.cantidad + 1)}
          className="bg-gray-300 hover:bg-gray-400 w-8 h-8 rounded transition"
        >
          +
        </button>
      </div>

      <div className="text-right min-w-24">
        <p className="text-lg font-bold text-gray-800">${subtotal.toFixed(2)}</p>
        <button
          onClick={() => removerDelCarrito(item._id)}
          className="text-red-500 hover:text-red-700 text-sm mt-2"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
