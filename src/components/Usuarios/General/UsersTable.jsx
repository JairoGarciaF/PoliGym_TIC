import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { TbSum } from "react-icons/tb";

const horarioOpciones = ['Mañana', 'Tarde', 'Noche'];

export const UsersTable = ({ usuarios }) => {
    const [horarioSeleccionado, setHorarioSeleccionado] = useState('Mañana');

    // Filtrar usuarios por el horario seleccionado y que no estén ocultos
    const usuariosFiltrados = usuarios.filter(
        user => user.horario === horarioSeleccionado && !user.oculto
    );
    const totalUsuarios = usuariosFiltrados.length;

    return (
        <div className='bg-white flex flex-col col-span-1 xl:row-span-12 p-4 rounded-xl shadow'>
            <div className='flex items-center justify-between'>
                <h3 className='text-azul-marino-500 xl:text-lg md:text-base text-sm flex items-center gap-2 font-medium'>
                    <FaClock className='xl:size-5 md:size-4 size-3' />
                    Usuarios por Horario
                </h3>
                <h3 className='text-azul-marino-500 flex items-center gap-2 xl:text-sm text-xs font-medium'>
                    <TbSum className='xl:size-4 size-3' />
                    Total {horarioSeleccionado}: {totalUsuarios}
                </h3>
            </div>
            {/* Navegación de horarios */}
            <nav className="flex justify-start mb-1 open-sans border-b">
                {horarioOpciones.map((horario) => (
                    <button
                        key={horario}
                        onClick={() => setHorarioSeleccionado(horario)}
                        className={`p-2 text-xs transition-colors 
                                ${horarioSeleccionado === horario
                                ? horario === 'Mañana' ? 'text-cyan-600 border-b-2 border-cyan-600 bg-gradient-to-t from-cyan-50'
                                    : horario === 'Tarde' ? 'text-yellow-600 border-b-2 border-yellow-600 bg-gradient-to-t from-yellow-50'
                                        : 'text-blue-950 border-b-2 border-blue-950 bg-gradient-to-t from-blue-50'
                                : 'text-slate-500 hover:text-azul-marino-300 '}`}
                    >
                        {horario}
                    </button>
                ))}
            </nav>

            {/* Tabla de usuarios */}
            <div className="relative flex-1 overflow-x-auto border rounded-xl">
                <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left text-azul-marino-500">
                        <thead className="text-xs text-white uppercase bg-azul-marino-500">
                            <tr>
                                <th scope="col" className="px-6 py-3 ">Nombre</th>
                                <th scope="col" className="px-6 py-3  text-center">Género</th>
                                <th scope="col" className="px-6 py-3  text-center">Tipo</th>
                                <th scope="col" className="px-6 py-3 ">Días activo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosFiltrados.map((usuario) => (
                                <tr key={usuario.id} className="bg-white border-b hover:bg-slate-100">
                                    <th scope="row" className="px-6 lg:py-4 py-2 lg:text-sm text-xs font-medium text-azul-marino-900 whitespace-nowrap">
                                        {usuario.nombre}
                                    </th>
                                    <td className="px-6 lg:py-4 py-2 text-center">
                                        <span
                                            className={`px-3 py-1 lg:text-sm text-xs rounded-full font-semibold 
                                                ${usuario.genero === 'Masculino'
                                                    ? 'bg-sky-100 text-sky-700'
                                                    : usuario.genero === 'Femenino'
                                                        ? 'bg-pink-100 text-pink-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {usuario.genero}
                                        </span>
                                    </td>
                                    <td className="px-6 lg:py-4 py-2 text-center">
                                        <span
                                            className={`px-3 py-1 rounded-full lg:text-sm text-xs font-semibold 
                                                ${usuario.tipo === 'Estudiante'
                                                    ? 'bg-[#CCE0F3] text-[#03346E]'
                                                    : usuario.tipo === 'Profesor'
                                                        ? 'bg-[#fed4da] text-[#B8001F]'
                                                        : 'bg-[#F1F1D3] text-[#61614A]'
                                                }`}
                                        >
                                            {usuario.tipo}
                                        </span>
                                    </td>
                                    <td className="px-6 lg:py-4 py-2 lg:text-sm text-xs">{usuario.diasActividad} días</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
