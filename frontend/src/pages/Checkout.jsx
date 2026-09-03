import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { carrito, totalCarrito, usuario, limpiarCarrito } = useCart();
  const [step, setStep] = useState(1);
  const [procesando, setProcesando] = useState(false);

  const [datosEnvio, setDatosEnvio] = useState({
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    telefono: '',
  });

  const [datosPago, setDatosPago] = useState({
    numeroTarjeta: '',
    titular: '',
    vencimiento: '',
    cvv: '',
  });

  if (carrito.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Tu carrito está vacío
          </h1>
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

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Debes iniciar sesión
          </h1>
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  const handleEnvio = (e) => {
    const { name, value } = e.target;
    setDatosEnvio((prev) => ({ ...prev, [name]: value }));
  };

  const handlePago = (e) => {
    const { name, value } = e.target;
    setDatosPago((prev) => ({ ...prev, [name]: value }));
  };

  const handleProcesarPago = async () => {
    setProcesando(true);
    // Simulamos el procesamiento del pago
    setTimeout(() => {
      setProcesando(false);
      setStep(4);
      limpiarCarrito();
    }, 2000);
  };

  const totalConImpuestos = totalCarrito * 1.16;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        {/* Indicador de pasos */}
        <div className="mb-8 flex justify-between items-center">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex items-center ${s < 4 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    s < step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Paso 1: Datos de usuario */}
            {step >= 1 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  1. Datos de Usuario
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={usuario.nombre}
                      disabled
                      className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={usuario.email}
                      disabled
                      className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                    />
                  </div>
                </div>
                {step === 1 && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition mt-6"
                  >
                    Siguiente
                  </button>
                )}
              </div>
            )}

            {/* Paso 2: Datos de envío */}
            {step >= 2 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  2. Datos de Envío
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="direccion"
                      value={datosEnvio.direccion}
                      onChange={handleEnvio}
                      placeholder="Calle y número"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={step > 2}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="ciudad"
                        value={datosEnvio.ciudad}
                        onChange={handleEnvio}
                        placeholder="Ciudad"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={step > 2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={datosEnvio.codigoPostal}
                        onChange={handleEnvio}
                        placeholder="CP"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={step > 2}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={datosEnvio.telefono}
                      onChange={handleEnvio}
                      placeholder="Teléfono de contacto"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={step > 2}
                    />
                  </div>
                </div>
                {step === 2 && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
                    >
                      Siguiente
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Paso 3: Datos de pago */}
            {step >= 3 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  3. Método de Pago
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Número de Tarjeta
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={datosPago.numeroTarjeta}
                      onChange={handlePago}
                      placeholder="1234 5678 9012 3456"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={step > 3}
                      maxLength="19"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titular de la Tarjeta
                    </label>
                    <input
                      type="text"
                      name="titular"
                      value={datosPago.titular}
                      onChange={handlePago}
                      placeholder="Nombre del titular"
                      className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={step > 3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Vencimiento (MM/YY)
                      </label>
                      <input
                        type="text"
                        name="vencimiento"
                        value={datosPago.vencimiento}
                        onChange={handlePago}
                        placeholder="12/25"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={step > 3}
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={datosPago.cvv}
                        onChange={handlePago}
                        placeholder="123"
                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={step > 3}
                        maxLength="4"
                      />
                    </div>
                  </div>
                </div>
                {step === 3 && (
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition"
                    >
                      Atrás
                    </button>
                    <button
                      onClick={handleProcesarPago}
                      disabled={procesando}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 rounded-lg transition"
                    >
                      {procesando ? 'Procesando...' : 'Pagar Ahora'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Paso 4: Confirmación */}
            {step === 4 && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-3xl font-bold text-green-600 mb-4">
                    ¡Compra Realizada!
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Gracias por tu compra. Te enviaremos un correo de confirmación
                    pronto.
                  </p>
                  <Link
                    to="/"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg inline-block transition"
                  >
                    Volver a Productos
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resumen de compra */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Resumen de Compra
              </h2>

              <div className="space-y-3 mb-6 pb-6 border-b max-h-96 overflow-y-auto">
                {carrito.map((item) => (
                  <div key={item._id} className="flex justify-between">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {item.nombre}
                      </p>
                      <p className="text-xs text-gray-600">
                        Cantidad: {item.cantidad}
                      </p>
                    </div>
                    <span className="font-bold text-gray-800">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-bold">${totalCarrito.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Impuestos (16%):</span>
                  <span className="font-bold">
                    ${(totalCarrito * 0.16).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between text-xl font-bold text-gray-800 pt-4 border-t">
                <span>Total:</span>
                <span className="text-blue-600">${totalConImpuestos.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
