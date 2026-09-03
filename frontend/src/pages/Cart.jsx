import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { carrito, totalCarrito, cantidadItems, usuario } = useCart();

  if (cantidadItems === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Explora nuestros productos y agrega algo al carrito
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition"
          >
            Ir a Productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Mi Carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {carrito.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Resumen</h2>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div className="flex justify-between">
                  <span className="text-gray-600">Artículos:</span>
                  <span className="font-bold">{cantidadItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">${totalCarrito.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos:</span>
                  <span className="font-bold">
                    ${(totalCarrito * 0.16).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
                <span>Total:</span>
                <span className="text-blue-600">
                  ${(totalCarrito * 1.16).toFixed(2)}
                </span>
              </div>

              {usuario ? (
                <Link
                  to="/checkout"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition block text-center"
                >
                  Proceder al Checkout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition block text-center"
                >
                  Iniciar Sesión para Comprar
                </Link>
              )}

              <Link
                to="/"
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition block text-center mt-3"
              >
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
