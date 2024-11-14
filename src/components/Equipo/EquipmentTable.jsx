import React from 'react'
import { FaDumbbell } from "react-icons/fa6";
export const EquipmentTable = ({ data, infoMode }) => {


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
        <div className='flex flex-col bg-white p-4 rounded-xl shadow h-full '>
            <h3 className='text-azul-marino-500 xl:text-base text-sm  mb-1 flex self-start items-center gap-2 font-medium'>
                <FaDumbbell className='xl:size-4 size-3' />
                Uso de Equipos
            </h3>

            {/* Control del contenedor de la tabla */}
            <div className="relative flex-1 overflow-x-auto overflow-y-auto border rounded-xl">
                <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500">
                    <thead className="text-xs text-white rounded uppercase bg-azul-marino-500">
                        <tr>
                            <th scope="col" className="p-2 ">Equipo</th>
                            <th scope="col" className="p-2  text-center">Tipo</th>
                            <th scope="col" className="p-2  text-center">Uso</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((implemento, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-slate-100">
                                <th scope="row" className="p-2 font-medium md:text-sm text-xs w-1/2 whitespace-nowrap text-azul-marino-900">
                                    {implemento.nombre}
                                </th>
                                <td className="p-2 text-center w-1/4 ">
                                    <span className={`px-2 py-1 lg:text-sm text-xs rounded-full whitespace-nowrap ${getPillColor(implemento.tipo)}`}>
                                        {implemento.tipo}
                                    </span>
                                </td>
                                <td className="p-2 text-center md:text-sm text-xs whitespace-nowrap">
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
