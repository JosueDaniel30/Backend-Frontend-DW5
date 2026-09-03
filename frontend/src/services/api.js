import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Agregar token a las peticiones si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ============ PRODUCTOS (MongoDB) ============

export const getProductos = async () => {
  try {
    const response = await api.get('/productos');
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const getProductoPorId = async (id) => {
  try {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  try {
    const response = await api.post('/productos', producto);
    return response.data;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, producto) => {
  try {
    const response = await api.put(`/productos/${id}`, producto);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  try {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

// ============ USUARIOS (PostgreSQL) ============

export const getUsuarios = async () => {
  try {
    const response = await api.get('/usuarios');
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const getUsuarioPorId = async (id) => {
  try {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error;
  }
};

export const crearUsuario = async (usuario) => {
  try {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw error;
  }
};

export const actualizarUsuario = async (id, usuario) => {
  try {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};

export const eliminarUsuario = async (id) => {
  try {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    throw error;
  }
};

export default api;
