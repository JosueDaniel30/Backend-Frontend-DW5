import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

    const usuarioGuardado = localStorage.getItem('usuario');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find((item) => item._id === producto._id);

      if (existe) {
        return prevCarrito.map((item) =>
          item._id === producto._id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const removerDelCarrito = (productoId) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter((item) => item._id !== productoId)
    );
  };

  const actualizarCantidad = (productoId, cantidad) => {
    if (cantidad <= 0) {
      removerDelCarrito(productoId);
    } else {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item._id === productoId ? { ...item, cantidad } : item
        )
      );
    }
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  const totalCarrito = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  const cantidadItems = carrito.reduce((total, item) => total + item.cantidad, 0);

  const setUsuarioLogueado = (usuarioData) => {
    setUsuario(usuarioData);
    localStorage.setItem('usuario', JSON.stringify(usuarioData));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        usuario,
        agregarAlCarrito,
        removerDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
        totalCarrito,
        cantidadItems,
        setUsuarioLogueado,
        logout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider');
  }
  return context;
}
