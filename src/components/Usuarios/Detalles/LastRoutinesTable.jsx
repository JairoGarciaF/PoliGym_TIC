import React from 'react'
import { FaClockRotateLeft } from "react-icons/fa6";
const ultimasRutinas = [
    {
        "rutina": "Full Body",
        "duracion": "45 min",
        "fecha": "2024-10-10"
    },
    {
        "rutina": "Piernas y Glúteos",
        "duracion": "50 min",
        "fecha": "2024-10-08"
    },
    {
        "rutina": "Pecho y Tríceps",
        "duracion": "40 min",
        "fecha": "2024-10-06"
    },
    {
        "rutina": "Cardio Intensivo",
        "duracion": "30 min",
        "fecha": "2024-10-05"
    },
    {
        "rutina": "Espalda y Bíceps",
        "duracion": "55 min",
        "fecha": "2024-10-03"
    }
]


export const LastRoutinesTable = () => {
    return (
        <div className='col-span-4 row-span-6  bg-white h-full border border-stone-300 rounded p-2'>
            <h3 className='text-azul-marino-500 mb-1 flex items-center font-medium gap-1'> <FaClockRotateLeft />Últimas Rutinas</h3>
            <div className="relative h-[calc(100%-28px)] overflow-x-auto border sm:rounded-lg">
                <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
                        <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
                            <tr>
                                <th scope="col" className="p-2">
                                    Rutina
                                </th>
                                <th scope="col" className="p-2 text-center ">
                                    Duración
                                </th>
                                <th scope="col" className="p-2 text-center">
                                    Fecha
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ultimasRutinas.map((rutina, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-azul-marino-100 ">
                                    <th scope="row" className="p-2 whitespace-nowrap font-medium text-azul-marino-900 ">
                                        {rutina.rutina}
                                    </th>
                                    <td className="p-2 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full whitespace-nowrap bg-blue-100 text-blue-700`}
                                        >
                                            {rutina.duracion}
                                        </span>
                                    </td>
                                    <td className="p-2 whitespace-nowrap text-center">
                                        {rutina.fecha}
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
