import React, { useState } from 'react'
import { PiBowlFoodFill } from "react-icons/pi";
const planesAlimentacion = [
    {
        "plan": "Plan Básico de Pérdida de Peso",
        "fecha": "2024-10-01",
        "estado": "Activo"
    },
    {
        "plan": "Plan de Ganancia Muscular",
        "fecha": "2024-09-15",
        "estado": "Finalizado"
    },
    {
        "plan": "Plan de Mantenimiento",
        "fecha": "2024-08-25",
        "estado": "Activo"
    }
]



export const MealPlansTable = () => {

    const [activeTab, setActiveTab] = useState('Activo');

    // Filtra los planes según el estado activo ('Activo' o 'Finalizado')
    const filteredPlans = planesAlimentacion.filter(plan => plan.estado == activeTab);


    return (
        <div className='col-span-1 row-span-1 p-4 bg-white h-full rounded-xl shadow '>
            <h3 className='text-azul-marino-500 xl:text-lg md:text-base text-sm  font-medium flex items-center gap-1'> <PiBowlFoodFill className='xl:size-5 md:size-4 size-3' />Planes de Alimentación</h3>
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
                        <thead className="text-xs text-white  rounded uppercase bg-azul-marino-500 ">
                            <tr>
                                <th scope="col" className="p-2 ">
                                    Plan
                                </th>
                                <th scope="col" className="p-2 text-center">
                                    Fecha
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPlans.map((plan, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-slate-100 ">
                                    <th scope="row" className="p-2 md:text-sm text-xs font-medium  text-azul-marino-900 ">
                                        {plan.plan}
                                    </th>
                                    <td className="p-2 whitespace-nowrap md:text-sm text-xs text-center">
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
