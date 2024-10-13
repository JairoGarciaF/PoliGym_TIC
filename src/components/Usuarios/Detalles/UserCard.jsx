import React from 'react'
import { FaUserShield, FaUser, FaFire } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale, IoChatbox } from "react-icons/io5";


export const UserCard = ({ user }) => {
    return (
        <>
            {/* Imagen de perfil */}
            <div className="col-span-3 h-full bg-white rounded border border-stone-300 row-span-6 flex flex-col justify-between ">
                <div className='h-64 flex justify-center items-center '>
                    {user.imagenPerfil != null ? (
                        <img
                            src={user.imagenPerfil}
                            alt={user.nombre}
                            className="h-28 rounded-full object-cover self-center border-stone-200 border"
                        />
                    ) : (
                        <div className=" bg-gray-200 rounded-full" />
                    )}
                </div>
                <div className='p-4 flex flex-col justify-end '>
                    <span className='font-semibold text-2xl block border-t border-stone-300 text-azul-marino-500'>{user.nombre}</span>
                    <span className='text-sm pb-2 block text-stone-500'>{user.correo}</span>
                    <div className='flex flex-wrap gap-1 items-center '>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${user.genero === 'Masculino' ? 'bg-sky-100 text-sky-700'
                                : user.genero === 'Femenino' ? 'bg-pink-100 text-pink-700'
                                    : 'bg-gray-100 text-gray-700'
                                }`}
                        >
                            {user.genero === 'Masculino' ? (<IoMale />) : user.genero === 'Femenino' ? (<IoFemale />) : (<IoMaleFemale />)}
                            {user.genero}
                        </span>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1  ${user.rol === 'Admin'
                                ? 'bg-violet-100 text-violet-700'
                                : 'bg-green-100 text-green-700'

                                }`}
                        >
                            {user.rol === 'Admin' ? (<FaUserShield />)
                                : (<FaUser />)
                            }
                            {user.rol}
                        </span>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1  
                                bg-blue-100 text-blue-700`}
                        >
                            <IoChatbox />
                            {user.comentarios}
                        </span>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1  
                                bg-orange-100 text-orange-600`}
                        >
                            <FaFire />
                            {user.diasActividad}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
