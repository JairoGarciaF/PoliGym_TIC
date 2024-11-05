import React from 'react'
import { FaShieldAlt, FaFire, FaUser } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";


export const UserCard = ({ user }) => {
    return (
        <>
            {/* Imagen de perfil */}
            <div className="col-span-3 h-full bg-white rounded-xl shadow row-span-6 flex flex-col justify-between ">
                <div className='h-64 flex justify-center items-center '>
                    {user.imagenPerfil != null ? (
                        <img
                            src={user.imagenPerfil}
                            alt={user.nombre}
                            className="h-28 rounded-full object-cover self-center border-slate-200 border"
                        />
                    ) : (
                        <div className=" bg-gray-200 rounded-full" />
                    )}
                </div>
                <div className='p-4 flex flex-col justify-end '>
                    <div className='flex gap-2 border-t pt-2 border-slate-300'>
                        <span className='font-semibold text-2xl block  text-azul-marino-500'>{user.nombre}</span>
                        {(user.rol === 'Admin') ? (
                            <span
                                className='py-1 px-2 text-xs rounded-full font-semibold flex items-center gap-1
                                bg-violet-100 text-violet-700'
                            >
                                <FaShieldAlt size={18} />
                            </span>
                        ) : (
                            <div className='hidden'></div>
                        )}
                    </div>
                    <span className='text-sm pb-2 block text-slate-500'>{user.correo}</span>
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
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1  ${user.tipo === 'Estudiante'
                                ? 'bg-blue-100 text-blue-800'
                                : user.tipo === 'Profesor' ? 'bg-rose-100 text-rose-800'
                                    : 'bg-teal-100 text-teal-800'

                                }`}
                        >
                            <FaUser />
                            {user.tipo}
                        </span>
                        <span
                            className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1  
                                bg-orange-100 text-orange-600`}
                        >
                            <FaFire />
                            {user.diasActividad} días
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}
