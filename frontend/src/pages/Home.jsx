import { useState, useEffect } from 'react';
import { getProductos } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const data = await getProductos();
        setProductos(data);
      } catch (err) {
        setError('Error al cargar productos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  const productosFiltrados = filtroCategoria
    ? productos.filter((p) => p.categoria === filtroCategoria)
    : productos;

  const categorias = [...new Set(productos.map((p) => p.categoria))];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Cargando productos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Bienvenido a TiendaShop
          </h1>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFiltroCategoria('')}
              className={`px-4 py-2 rounded transition ${
                filtroCategoria === ''
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              Todas las categorías
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroCategoria(cat)}
                className={`px-4 py-2 rounded transition ${
                  filtroCategoria === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              No hay productos en esta categoría
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosFiltrados.map((producto) => (
              <ProductCard key={producto._id} producto={producto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
