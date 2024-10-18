import React from 'react'
import { FaDumbbell } from "react-icons/fa6";

export const GeneralUsageTable = ({ data, infoMode }) => {
    // Filtrar los datos según el tab seleccionado
    const filteredData = data.map(ejercicio => ({
        ...ejercicio,
        uso: infoMode === 'Semanal' ? ejercicio.uso_semanal_total : ejercicio.uso_mensual_total, // Mostrar uso según el tab
    }));

    // Función que devuelve el color según la categoría
    const getCategoryPillColor = (category) => {
        switch (category) {
            case "Fuerza":
                return "bg-blue-100 text-blue-900";
            case "Cardio":
                return "bg-orange-100 text-orange-700";
            case "Estiramiento":
                return "bg-lime-100 text-lime-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Función que devuelve el color según la dificultad
    const getDifficultyPillColor = (difficulty) => {
        switch (difficulty) {
            case "Baja":
                return "bg-green-100 text-green-700";
            case "Media":
                return "bg-yellow-100 text-yellow-700";
            case "Alta":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className='bg-white p-4 rounded col-span-7 border h-full border-stone-300'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <FaDumbbell className='size-5' />
                Uso de Ejercicios
            </h3>

            {/* Control del contenedor de la tabla */}
            <div className="relative h-[calc(100%-28px)] overflow-x-auto overflow-y-auto border sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500">
                    <thead className="text-xs text-white rounded uppercase bg-azul-marino-500">
                        <tr>
                            <th scope="col" className="p-2">Ejercicios</th>
                            <th scope="col" className="p-2 text-center">Categoría</th>
                            <th scope="col" className="p-2 text-center">Dificultad</th>
                            <th scope="col" className="p-2 text-center">Uso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((ejercicio, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-azul-marino-100">
                                <th scope="row" className="p-2 font-medium w-2/5 whitespace-nowrap text-azul-marino-900">
                                    {ejercicio.nombre}
                                </th>
                                <td className="p-2 text-center w-1/5 ">
                                    <span className={`px-2 py-1 rounded-full whitespace-nowrap ${getCategoryPillColor(ejercicio.categoria)}`}>
                                        {ejercicio.categoria}
                                    </span>
                                </td>
                                <td className="p-2 text-center w-1/5 ">
                                    <span className={`px-2 py-1 rounded-full whitespace-nowrap ${getDifficultyPillColor(ejercicio.dificultad)}`}>
                                        {ejercicio.dificultad}
                                    </span>
                                </td>
                                <td className="p-2 text-center whitespace-nowrap">
                                    {ejercicio.uso}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
