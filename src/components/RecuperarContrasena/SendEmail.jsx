import React, { useState, useEffect } from 'react';
import { BiLoaderCircle } from "react-icons/bi";
import Swal from 'sweetalert2';
export const SendEmail = () => {

  const [loadingEmail, setLoadingEmail] = useState(false);



  const handleSendEmail = async (e) => {
    e.preventDefault();
    setLoadingEmail(true);
    try {
      // Enviar correo
      // Redirigir a la página de inicio de sesión
      Swal.fire({
        title: 'Correo enviado',
        text: 'Hemos enviado un enlace a tu correo para que puedas reestablecer tu contraseña',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#16243e',
      });
      navigate('/login');
    } catch (error) {
      console.error('Error al enviar el correo:', error.message);
      Swal.fire({
        title: 'Error al enviar el correo',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#16243e',
      });
    } finally {
      setLoadingEmail(false);
    }

  }
  return (
    <div className="xl:w-1/3 lg:w-1/2 md:w-2/3 w-[90%]  p-8 bg-white/70 rounded-lg shadow-lg">

      {/* Logo */}
      <div className="flex justify-center mb-4">
        <img src="./PoliGymLogo.png" alt="PoliGym Logo" className="h-20" />
      </div>

      {/* Título */}
      <h2 className="text-3xl font-semibold text-azul-marino-500 mb-4 text-center">
        Olvidaste tu contraseña?
      </h2>

      {/* Párrafo */}
      <p className="text-stone-600 mb-6 text-center">
        No te preocupes, enviaremos un link a tu correo para que puedes reestablecer tu contraseña                    </p>

      {/* Formulario */}
      <form onSubmit={handleSendEmail}>
        {/* Campo de Correo Electrónico */}
        <div className="mb-4">
          <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Ingresa tu correo"
          />
        </div>

        {/* Botón de Enviar */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-azul-marino-500 hover:bg-azul-marino-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loadingEmail}
          >
            {loadingEmail ? 'Cargando...' : 'Enviar Enlace'}

          </button>
        </div>
      </form>
    </div>
  )
}
