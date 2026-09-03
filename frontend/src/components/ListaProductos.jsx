import Producto from './Producto';

export default function ListaProductos({ productos }) {
  if (productos.length === 0) {
    return <p className="status-message">No se encontraron productos.</p>;
  }

  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          producto={producto}
        />
      ))}
    </div>
  );
}