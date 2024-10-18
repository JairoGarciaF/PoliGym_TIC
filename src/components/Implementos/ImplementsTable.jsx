import React from 'react'
import { FaDumbbell } from "react-icons/fa6";
export const ImplementsTable = ({ data, infoMode }) => {


    // Filtrar los datos según el tab seleccionado
    const filteredData = data.map(implemento => ({
        ...implemento,
        uso: infoMode === 'Semanal' ? implemento.uso_semanal_total : implemento.uso_mensual_total, // Mostrar uso según el tab
    }));


    // Función que devuelve el color según el tipo
    const getPillColor = (tipo) => {
        switch (tipo) {
            case "Máquina":
                return "bg-stone-100 text-stone-800";
            case "Implemento":
                return "bg-teal-100 text-teal-800";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (
        <div className='bg-white p-4 rounded border h-full border-stone-300'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <FaDumbbell className='size-5' />
                Uso de Implementos
            </h3>

            {/* Control del contenedor de la tabla */}
            <div className="relative h-[calc(100%-28px)] overflow-x-auto overflow-y-auto border sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500">
                    <thead className="text-xs text-white rounded uppercase bg-azul-marino-500">
                        <tr>
                            <th scope="col" className="p-2">Implementos</th>
                            <th scope="col" className="p-2 text-center">Tipo</th>
                            <th scope="col" className="p-2 text-center">Uso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((implemento, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-azul-marino-100">
                                <th scope="row" className="p-2 font-medium w-1/2 whitespace-nowrap text-azul-marino-900">
                                    {implemento.nombre}
                                </th>
                                <td className="p-2 text-center w-1/4 ">
                                    <span className={`px-2 py-1 rounded-full whitespace-nowrap ${getPillColor(implemento.tipo)}`}>
                                        {implemento.tipo}
                                    </span>
                                </td>
                                <td className="p-2 text-center whitespace-nowrap">
                                    {implemento.uso}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}
