import React from 'react'
import { FaUserClock } from "react-icons/fa";

const personas = [
    { nombre: 'Persona 1', genero: 'Masculino', diasActivo: 29 },
    { nombre: 'Persona 2', genero: 'Femenino', diasActivo: 15 },
    { nombre: 'Persona 3', genero: 'Otro', diasActivo: 42 },
    { nombre: 'Persona 4', genero: 'Masculino', diasActivo: 7 },
    { nombre: 'Persona 5', genero: 'Femenino', diasActivo: 3 },
    { nombre: 'Persona 6', genero: 'Masculino', diasActivo: 1 },
    { nombre: 'Persona 7', genero: 'Otro', diasActivo: 0 },
    // Agrega más datos según sea necesario
];


export const UsersTable = () => {
    return (
        <div className='bg-white col-span-6 row-span-6 p-4 rounded border border-stone-300 '>
            <h3 className='text-azul-marino-500 mb-1 flex items-center  gap-2 font-medium'> <FaUserClock className='size-4' />Usuarios Frecuentes</h3>
            <div className="relative h-[calc(100%-24px)] overflow-x-auto border sm:rounded-lg">
                <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
                        <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Género
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Días activo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {personas.map((persona, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-azul-marino-100 ">
                                    <th scope="row" className="px-6 py-4 font-medium text-azul-marino-900 whitespace-nowrap ">
                                        {persona.nombre}
                                    </th>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1  rounded-full font-semibold ${persona.genero === 'Masculino'
                                                ? 'bg-sky-100 text-sky-700'
                                                : persona.genero === 'Femenino'
                                                    ? 'bg-pink-100 text-pink-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {persona.genero}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {persona.diasActivo} días
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>

            </div>
        </div>

    )
}
