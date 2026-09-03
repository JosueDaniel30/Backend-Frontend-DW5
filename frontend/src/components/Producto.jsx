export default function Producto({ producto }) {
  return (
    <article className="product-tile">
      <h2>{producto.nombre}</h2>

      <p className="product-price">
        Precio: Q{Number(producto.precio).toFixed(2)}
      </p>

      <p className="product-stock">
        Stock: {producto.stock}
      </p>
    </article>
  );
}