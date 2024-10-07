import React from 'react'
import { FaUserClock } from "react-icons/fa";

const personas = [
    { id: 1, nombre: 'Carlos', rol: 'Usuario', edad: 25, genero: 'Masculino', diasActividad: 5, peso: 55, altura: 163, objetivo: 'Ganar músculo', nivelFisico: 'Principiante', comentarios: 10, notificaciones: true },
    { id: 2, nombre: 'Ana', rol: 'Usuario', edad: 30, genero: 'Femenino', diasActividad: 3, peso: 60, altura: 170, objetivo: 'Perder peso', nivelFisico: 'Intermedio', comentarios: 5, notificaciones: false },
    { id: 3, nombre: 'Pedro', rol: 'Admin', edad: 40, genero: 'Masculino', diasActividad: 4, peso: 70, altura: 180, objetivo: 'Ganar fuerza', nivelFisico: 'Avanzado', comentarios: 15, notificaciones: true },
    { id: 4, nombre: 'Sofía', rol: 'Usuario', edad: 28, genero: 'Femenino', diasActividad: 6, peso: 65, altura: 165, objetivo: 'Ganar músculo', nivelFisico: 'Intermedio', comentarios: 8, notificaciones: true },
    { id: 5, nombre: 'Javier', rol: 'Usuario', edad: 35, genero: 'Masculino', diasActividad: 2, peso: 75, altura: 175, objetivo: 'Perder peso', nivelFisico: 'Principiante', comentarios: 12, notificaciones: true },
    { id: 6, nombre: 'María', rol: 'Usuario', edad: 20, genero: 'Femenino', diasActividad: 7, peso: 50, altura: 160, objetivo: 'Perder peso', nivelFisico: 'Avanzado', comentarios: 20, notificaciones: true },
    { id: 7, nombre: 'Luis', rol: 'Usuario', edad: 45, genero: 'Masculino', diasActividad: 1, peso: 80, altura: 185, objetivo: 'Ganar fuerza', nivelFisico: 'Intermedio', comentarios: 6, notificaciones: true },
    { id: 8, nombre: 'Elena', rol: 'Admin', edad: 22, genero: 'Otro', diasActividad: 5, peso: 55, altura: 163, objetivo: 'Ganar músculo', nivelFisico: 'Principiante', comentarios: 10, notificaciones: true },
    { id: 9, nombre: 'Miguel', rol: 'Usuario', edad: 30, genero: 'Masculino', diasActividad: 3, peso: 60, altura: 170, objetivo: 'Ganar músculo', nivelFisico: 'Intermedio', comentarios: 5, notificaciones: true },
    { id: 10, nombre: 'Laura', rol: 'Usuario', edad: 40, genero: 'Femenino', diasActividad: 4, peso: 70, altura: 180, objetivo: 'Ganar fuerza', nivelFisico: 'Avanzado', comentarios: 15, notificaciones: true },
    { id: 11, nombre: 'Raúl', rol: 'Usuario', edad: 28, genero: 'Masculino', diasActividad: 6, peso: 65, altura: 165, objetivo: 'Perder peso', nivelFisico: 'Intermedio', comentarios: 8, notificaciones: true },
    { id: 12, nombre: 'Carmen', rol: 'Usuario', edad: 35, genero: 'Otro', diasActividad: 2, peso: 75, altura: 175, objetivo: 'Ganar músculo', nivelFisico: 'Principiante', comentarios: 12, notificaciones: true },
    { id: 13, nombre: 'Jorge', rol: 'Usuario', edad: 20, genero: 'Masculino', diasActividad: 7, peso: 50, altura: 160, objetivo: 'Ganar fuerza', nivelFisico: 'Avanzado', comentarios: 20, notificaciones: true },
    // más datos de ejemplo
];

export const UsersTable = () => {

    const personasOrdenadas = [...personas].sort((a, b) => b.diasActividad - a.diasActividad);
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
                            {personasOrdenadas.map((persona, index) => (
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
                                        {persona.diasActividad} días
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
