import React from 'react'
import { TbLogout } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const userName = 'Jairo';
const userEmail = 'jairo@email.com';
const defaultProfilePic = `https://api.dicebear.com/9.x/initials/svg?seed=${userName}`;

export const Profile = () => {

    const navigate = useNavigate(); // Hook para la navegación

    const handleLogout = () => {
        // Aquí puedes añadir la lógica de logout, limpiar tokens, etc.
        navigate('/login'); // Redirige a la página de login
    };
    return (
        <div className='flex sticky top-[calc(100vh_-_56px_-_16px)] flex-col h-14 border-t pt-4 border-stone-300 justify-end'>
            <div className='flex p-1 relative gap-2 w-full items-center'>
                <img
                    src={
                        defaultProfilePic
                        // || userImage
                    }
                    alt="Profile"
                    className="size-9 rounded shrink-0 shadow"
                />
                <div className='text-start open-sans'>
                    <span className='font-semibold block text-azul-marino-500'>{userName}</span>
                    <span className='text-xs block text-stone-500'>{userEmail}</span>
                </div>
                <button
                    className='hover:bg-rojo-100  hover:text-rojo-500 text-stone-950  rounded absolute right-2 transition-colors p-1'
                    onClick={handleLogout}
                >
                    <TbLogout className=' size-6' />
                </button>

            </div>


        </div>
    )
}
