import React, { useState } from 'react'
import { TbLogout } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/auth';

const userName = 'Jairo';
const userEmail = 'jairo@email.com';
const defaultProfilePic = `https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;

export const Profile = ({ expanded }) => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook para la navegación

    const handleLogout = async () => {
        // Eliminar token de acceso
        setLoading(true);
        await logout();
        setLoading(false);
        navigate('/login'); // Redirige a la página de login
    };

    return (
        <div className='flex items-center justify-center gap-2 border-t  pt-4 border-slate-300'>


            <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? 'w-full' : 'hidden'}`}  >
                {loading ? (
                    <>
                        <p className='open-sans'>Cerrando Sesión...</p>
                        <BiLoaderCircle className="animate-spin size-7 text-azul-marino-500" />
                    </>
                ) : (
                    <>
                        <img
                            src={
                                defaultProfilePic
                                // || userImage
                            }
                            alt="Profile"
                            className="size-9 rounded shrink-0 shadow"
                        />
                        <div className='text-start open-sans leading-4'>
                            <span className='font-semibold block text-azul-marino-500'>{userName}</span>
                            <span className='text-xs block text-stone-500'>{userEmail}</span>
                        </div>
                        <button
                            className='hover:bg-rojo-100 h-min hover:text-rojo-500 text-stone-950  rounded  right-2 transition-colors p-1'
                            onClick={handleLogout}
                        >
                            <TbLogout className=' size-6' />
                        </button>
                    </>
                )}
            </div>




        </div>
    )
}
