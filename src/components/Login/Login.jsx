import React from 'react'

export const Login = () => {


    return (
        <div className="h-screen w-screen flex">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('./gym.jpg')` }}
            />

            {/* Contenedor para el formulario de login */}
            <div className="xl:w-1/2 lg:w-2/3  w-full ml-auto h-full flex items-center justify-center backdrop-blur-sm bg-white/20">
                <div className="lg:w-3/4 md:w-2/3 w-[90%] p-8 bg-white/70 rounded-lg shadow-lg">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src="./PoliGymLogo.png" alt="Logo" className="h-16" />
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-semibold text-azul-marino-500 mb-6 text-center">Iniciar sesión</h2>

                    <form action='/' >
                        {/* Campo de correo electrónico */}
                        <div className="mb-4">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="correo@mail.com"
                            />
                        </div>

                        <div className="mb-6 relative">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="********"
                            />
                        </div>

                        {/* Recuérdame y Olvidó la contraseña */}
                        <div className="flex items-center justify-between mb-4">

                            <a href="/recuperar-contrasena" className="text-sm text-azul-marino-500 hover:underline">
                                ¿Olvidaste tu contraseña?
                            </a>
                        </div>

                        {/* Botón de inicio de sesión */}
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-azul-marino-500 hover:bg-azul-marino-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
