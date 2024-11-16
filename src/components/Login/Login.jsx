import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from '../../services/token/store';
import { signIn } from '../../services/auth/auth';
import { BiLoaderCircle } from "react-icons/bi";
import { validateSignIn } from '../../services/auth/validateAuthForm';
import { useAuth } from '../../hooks/useAuth';
import Swal from 'sweetalert2';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loadingLogin, setLoadingLogin] = useState(false);

    const navigate = useNavigate();

    const { loading, isAuthenticated } = useAuth(); // Usa el hook personalizado

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);


    const handleLogin = async (e) => {

        e.preventDefault();

        setErrors(validateSignIn(email, password));

        if (errors.length > 0) {
            Swal.fire({
                title: 'Formato incorrecto',
                text: errors[0],
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#16243e',
            });
            return;
        } else {
            setErrors([]);
            setLoadingLogin(true);
            try {
                const { accessToken } = await signIn(email, password);

                //guardar token en cookies
                saveToken('accessToken', accessToken);
                // Redirigir al dashboard
                window.location.href = '/';
            } catch (error) {
                console.error('Error durante el inicio de sesión:', error.message);

                // Mostrar error con SweetAlert
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesión',
                    text: error.message,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#16243e',
                });
            } finally {
                setLoadingLogin(false);
            }

        }


    };

    if (loading) {
        // Mostrar un loader mientras se verifica
        return (
            <div className="flex flex-col open-sans items-center justify-center h-screen">
                <BiLoaderCircle className="animate-spin size-28 text-azul-marino-500" />
                <p>Redirigiendo...</p>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('./gym.jpg')` }}
            />

            {/* Contenedor para el formulario de login */}
            <div className="xl:w-1/2 lg:w-2/3 w-full ml-auto h-full flex items-center justify-center backdrop-blur-sm bg-white/20">
                <div className="lg:w-3/4 md:w-2/3 w-[90%] p-8 bg-white/70 rounded-lg shadow-lg">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img src="./PoliGymLogo.png" alt="Logo" className="h-16" />
                    </div>

                    {/* Título */}
                    <h2 className="text-3xl font-semibold text-azul-marino-500 mb-6 text-center">Iniciar sesión</h2>

                    {/* Formulario */}
                    <form onSubmit={handleLogin}>
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
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Campo de contraseña */}
                        <div className="mb-6 relative">
                            <label className="block text-stone-700 text-sm font-bold mb-2" htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-stone-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                disabled={loadingLogin}
                            >
                                {loadingLogin ? 'Cargando...' : 'Iniciar Sesión'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
