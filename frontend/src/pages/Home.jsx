import { useEffect, useState } from 'react';
import ListaProductos from '../components/ListaProductos';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const API = 'http://localhost:3000/api/productos';

  // ============================
  // CARGAR TODOS LOS PRODUCTOS
  // ============================
  async function cargarProductos() {
    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch(API);

      if (!respuesta.ok) {
        throw new Error('Error al consultar productos');
      }

      const datos = await respuesta.json();

      setProductos(datos);
    } catch (error) {
      console.error(error);
      setError('No se pudieron cargar los productos');
    } finally {
      setCargando(false);
    }
  }

  // ============================
  // CARGAR AL INICIAR LA PÁGINA
  // ============================
  useEffect(() => {
    cargarProductos();
  }, []);

  // ============================
  // MOSTRAR SOLO DISPONIBLES
  // ============================
  async function mostrarDisponibles() {
    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch(`${API}/disponibles`);

      if (!respuesta.ok) {
        throw new Error('Error al consultar productos disponibles');
      }

      const datos = await respuesta.json();

      setProductos(datos);
    } catch (error) {
      console.error(error);
      setError('No se pudieron cargar los productos disponibles');
    } finally {
      setCargando(false);
    }
  }

  // ============================
  // BUSCAR PRODUCTOS POR NOMBRE
  // ============================
  async function buscarProductos() {
    // Si el campo está vacío, vuelve a mostrar todos
    if (!busqueda.trim()) {
      cargarProductos();
      return;
    }

    try {
      setCargando(true);
      setError('');

      const respuesta = await fetch(
        `${API}/buscar/${encodeURIComponent(busqueda)}`
      );

      if (!respuesta.ok) {
        throw new Error('Error al buscar productos');
      }

      const datos = await respuesta.json();

      setProductos(datos);
    } catch (error) {
      console.error(error);
      setError('No se pudo realizar la búsqueda');
    } finally {
      setCargando(false);
    }
  }

  // ============================
  // BUSCAR AL PRESIONAR ENTER
  // ============================
  function manejarEnter(evento) {
    if (evento.key === 'Enter') {
      buscarProductos();
    }
  }

  return (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <p className="home-kicker">Selección de la semana</p>
          <h1 className="home-title">Compra cosas que sí quieres.</h1>
        </div>
        <p className="home-subtitle">Diseño útil, precios claros y entrega sin drama.</p>
      </section>

      {/* CONTROLES */}
      <div className="catalog-controls">
        <button
          onClick={cargarProductos}
        >
          Mostrar todos
        </button>

        <button
          onClick={mostrarDisponibles}
        >
          Mostrar disponibles
        </button>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={manejarEnter}
        />

        <button
          onClick={buscarProductos}
        >
          Buscar
        </button>
      </div>

      {/* MENSAJE DE CARGA */}
      {cargando && (
        <p className="status-message">
          Cargando productos...
        </p>
      )}

      {/* MENSAJE DE ERROR */}
      {error && (
        <p className="status-message error">
          {error}
        </p>
      )}

      {/* LISTADO DE PRODUCTOS */}
      {!cargando && !error && (
        <ListaProductos productos={productos} />
      )}
    </main>
  );
}