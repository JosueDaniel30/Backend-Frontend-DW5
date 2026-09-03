import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cantidadItems, usuario, logout } = useCart();

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold">🛍️ TiendaShop</span>
        </Link>

        <nav className="flex gap-6 items-center">
          <Link to="/" className="hover:text-blue-100 transition">
            Productos
          </Link>

          {usuario ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">
                Bienvenido, <strong>{usuario.nombre}</strong>
              </span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
            >
              Login
            </Link>
          )}

          <Link
            to="/carrito"
            className="relative bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded transition flex items-center gap-2"
          >
            🛒 Carrito
            {cantidadItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {cantidadItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
