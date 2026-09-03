import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearUsuario, getUsuarios } from '../services/api';
import { useCart } from '../context/CartContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    edad: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuarios, setUsuarios] = useState([]);

  const navigate = useNavigate();
  const { setUsuarioLogueado } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Obtener usuarios de la BD
      const usuariosDB = await getUsuarios();

      // Buscar usuario por email
      const usuarioEncontrado = usuariosDB.find(
        (u) => u.email === formData.email
      );

      if (!usuarioEncontrado) {
        setError('Email no registrado');
        setLoading(false);
        return;
      }

      // Simulamos validación de contraseña (en producción usar hash)
      // Aquí simplemente verificamos que el email exista
      setUsuarioLogueado(usuarioEncontrado);
      localStorage.setItem('token', 'token_' + usuarioEncontrado.id);
      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.nombre || !formData.email || !formData.edad) {
      setError('Todos los campos son requeridos');
      setLoading(false);
      return;
    }

    try {
      // Crear nuevo usuario en la BD
      const nuevoUsuario = await crearUsuario({
        nombre: formData.nombre,
        email: formData.email,
        edad: parseInt(formData.edad),
      });

      // Login automático
      setUsuarioLogueado(nuevoUsuario);
      localStorage.setItem('token', 'token_' + nuevoUsuario.id);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 409) {
        setError('El email ya está registrado');
      } else {
        setError('Error al registrarse');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={isLogin ? handleLogin : handleRegistro}
          className="space-y-4"
        >
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Edad
                </label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tu edad"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 rounded transition"
          >
            {loading
              ? 'Cargando...'
              : isLogin
              ? 'Iniciar Sesión'
              : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
                setFormData({
                  nombre: '',
                  email: '',
                  edad: '',
                  password: '',
                });
              }}
              className="text-blue-600 hover:text-blue-800 font-bold ml-2"
            >
              {isLogin ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
