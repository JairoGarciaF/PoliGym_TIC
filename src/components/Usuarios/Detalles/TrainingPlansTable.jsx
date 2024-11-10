import React, { useState } from 'react'
import { FaDumbbell } from "react-icons/fa";

const planesEntrenamiento = [
    {
        "plan": "Entrenamiento de fuerza",
        "dificultad": "Alta",
        "fecha": "2024-10-01",
        "estado": "Activo"
    },
    {
        "plan": "Entrenamiento HIIT",
        "dificultad": "Media",
        "fecha": "2024-09-20",
        "estado": "Finalizado"
    },
    {
        "plan": "Entrenamiento de cuerpo completo",
        "dificultad": "Baja",
        "fecha": "2024-09-05",
        "estado": "Finalizado"
    },
    {
        "plan": "Plan Inicial",
        "dificultad": "Baja",
        "fecha": "2024-09-25",
        "estado": "Finalizado"
    },
    {
        "plan": "Plan Intermedio",
        "dificultad": "Media",
        "fecha": "2024-09-05",
        "estado": "Activo"
    },
    {
        "plan": "Plan Avanzado",
        "dificultad": "Alta",
        "fecha": "2024-09-15",
        "estado": "Finalizado"
    },
]

export const TrainingPlansTable = () => {

    const [activeTab, setActiveTab] = useState('Activo');

    // Filtra los planes según el estado activo ('Activo' o 'Finalizado')
    const filteredPlans = planesEntrenamiento.filter(plan => plan.estado == activeTab);

    // Función que devuelve el color según la dificultad
    const getPillColor = (dificultad) => {
        switch (dificultad) {
            case "Alta":
                return "bg-red-100 text-red-700";
            case "Media":
                return "bg-yellow-100 text-yellow-700";
            case "Baja":
                return "bg-green-100 text-green-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (
        <div className='col-span-1 row-span-1 p-4 bg-white h-full  rounded-xl shadow'>
            <h3 className='text-azul-marino-500 xl:text-lg md:text-base text-sm  font-medium flex items-center gap-1'> <FaDumbbell className='xl:size-5 md:size-4 size-3' />Planes de Entrenamiento</h3>
            <nav className="flex justify-start mb-1 open-sans border-b  ">
                <button
                    onClick={() => setActiveTab('Activo')}
                    className={`p-2  text-xs transition-colors 
                    ${activeTab === 'Activo'
                            ? 'text-green-600 border-b-2 border-green-600 bg-gradient-to-t from-green-50'
                            : 'text-slate-500 hover:text-azul-marino-300 '}`}
                >
                    Activo
                </button>
                <button
                    onClick={() => setActiveTab('Finalizado')}
                    className={`p-2  text-xs transition-colors 
                    ${activeTab === 'Finalizado'
                            ? 'text-red-600 border-b-2 border-red-600 bg-gradient-to-t from-red-50'
                            : 'text-slate-500 hover:text-azul-marino-300'}`}
                >
                    Finalizado
                </button>
            </nav>

            <div className="relative h-[calc(100%-24px-39px)] overflow-x-auto border rounded-xl">
                <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
                        <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
                            <tr>
                                <th scope="col" className="p-2">
                                    Plan
                                </th>
                                <th scope="col" className="p-2 text-center">
                                    Dificultad
                                </th>
                                <th scope="col" className="p-2 text-center">
                                    Fecha
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.map((plan, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-slate-100 ">
                                    <th scope="row" className="p-2 font-medium md:text-sm text-xs whitespace-nowrap text-azul-marino-900 ">
                                        {plan.plan}
                                    </th>
                                    <td className="p-2 text-center">
                                        <span className={`px-2 py-1 rounded-full lg:text-sm text-xs whitespace-nowrap ${getPillColor(plan.dificultad)}`}>
                                            {plan.dificultad}
                                        </span>
                                    </td>
                                    <td className="p-2 md:text-sm text-xs text-center whitespace-nowrap">
                                        {plan.fecha}
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
