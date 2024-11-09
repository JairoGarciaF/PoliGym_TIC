import React from 'react';
import { FaCrown, FaTrophy } from 'react-icons/fa';

export const TopUsers = ({ usuarios }) => {
    const usuariosOrdenados = [...usuarios]
        .filter(user => !user.oculto)
        .sort((a, b) => b.diasActividad - a.diasActividad);

    const topUsers = usuariosOrdenados.slice(0, 3);

    return (
        <div className='bg-white p-4 rounded-xl shadow flex flex-col xl:col-span-1 xl:row-span-1'>
            <h3 className='text-azul-marino-500 xl:text-lg md:text-base text-sm flex items-center gap-2 font-medium'>
                <FaTrophy className='xl:size-5 md:size-4 size-3' /> Usuarios Frecuentes
            </h3>
            <div className='flex-1 flex items-center justify-center'>

                <div className='flex justify-center aspect-video sm:h-3/4 items-end '>
                    {topUsers.map((user, index) => (
                        <div
                            key={user.id}
                            className={`flex flex-col items-center  ${index === 0 ? 'h-full w-2/5' : index === 1 ? 'h-2/3 order-first w-1/4' : 'h-2/3 w-1/4'}`}
                        >
                            {index === 0 && (
                                <FaCrown className="text-yellow-500 text-2xl mb-1" />
                            )}
                            <div
                                className={`relative rounded-full aspect-square overflow-hidden border-4 
                                ${index === 0 ? 'border-yellow-500 z-10' : index === 1 ? 'border-gray-400   z-0' : 'border-amber-700   z-0'}
                            `}
                            >
                                <img
                                    src={user.imagenPerfil}
                                    alt={user.nombre}
                                    className="w-full h-full object-cover"
                                />

                            </div>
                            <span className='font-semibold text-center text-slate-800 mt-2'>{user.nombre}</span>
                            <span className='text-sm text-center text-slate-600'>{user.diasActividad} días</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
