import React, { useState } from 'react'
import { FaArrowTrendUp } from "react-icons/fa6";

export const ImplementsTable = ({ data }) => {

    const [activeTab, setActiveTab] = useState('Semanal'); // Estado para el tab activo

    console.log(data);
    // Filtrar los datos según el tab seleccionado
    const filteredData = data.map(implemento => ({
        ...implemento,
        uso: activeTab === 'Semanal' ? implemento.uso_semanal_total : implemento.uso_mensual_total, // Mostrar uso según el tab
    }));

    // Función que devuelve el color según el tipo
    const getPillColor = (tipo) => {
        switch (tipo) {
            case "Máquina":
                return "bg-teal-100 text-teal-700";
            case "Implemento":
                return "bg-lime-100 text-lime-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (
        <div className='bg-white p-4 rounded border h-full border-stone-300'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <FaArrowTrendUp className='size-5' />
                Uso de Implementos
            </h3>
            <nav className="flex justify-start mb-1 open-sans border-b">
                <button
                    onClick={() => setActiveTab('Semanal')}
                    className={`p-2 text-xs transition-colors 
                    ${activeTab === 'Semanal'
                            ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-t from-blue-50'
                            : 'text-stone-500 hover:text-azul-marino-300'}`}
                >
                    Semanal
                </button>
                <button
                    onClick={() => setActiveTab('Mensual')}
                    className={`p-2 text-xs transition-colors 
                    ${activeTab === 'Mensual'
                            ? 'text-cyan-600 border-b-2 border-cyan-600 bg-gradient-to-t from-cyan-50'
                            : 'text-stone-500 hover:text-azul-marino-300'}`}
                >
                    Mensual
                </button>
            </nav>

            {/* Control del contenedor de la tabla */}
            <div className="relative h-[calc(100%-28px-39px)] overflow-x-auto overflow-y-auto border sm:rounded-lg">
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
