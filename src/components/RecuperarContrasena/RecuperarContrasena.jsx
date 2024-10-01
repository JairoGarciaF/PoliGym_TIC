import React from 'react'

export const RecuperarContrasena = () => {
    return (
        <div className="h-screen w-screen flex">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('./gym.jpg')` }}
            />

            {/* Contenedor para el formulario de recuperación de contraseña */}
            <div className="w-full ml-auto h-full flex items-center justify-center backdrop-blur-sm bg-white/30">
                <div className="w-3/4 max-w-md p-8 bg-white/70 rounded-lg shadow-lg">

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
                    <form action='/login'>
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
                            >
                                Enviar enlace
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
