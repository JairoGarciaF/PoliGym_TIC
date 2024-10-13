import React from 'react'
import { FaUserClock } from "react-icons/fa";

const defaultProfilePic = 'https://api.dicebear.com/9.x/initials/svg?seed=User';


const personas = [
    {
        id: 1,
        nombre: 'Carlos',
        correo: 'carlos@example.com',
        rol: 'Usuario',
        edad: 25,
        genero: 'Masculino',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 2,
        nombre: 'Ana',
        correo: 'ana@example.com',
        rol: 'Usuario',
        edad: 30,
        genero: 'Femenino',
        diasActividad: 3,
        peso: 60,
        altura: 170,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Intermedio',
        comentarios: 5,
        notificaciones: false,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: 'Alergia a la mantequilla de maní',
        horario: 'PM',
        diasSeleccionados: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 3,
        nombre: 'Pedro',
        correo: 'pedro@example.com',
        rol: 'Admin',
        edad: 40,
        genero: 'Masculino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Lesiones',
        detalleProblemasMedicos: 'Dolor en la rodilla derecha',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 4,
        nombre: 'Sofía',
        correo: 'sofia@example.com',
        rol: 'Usuario',
        edad: 28,
        genero: 'Femenino',
        diasActividad: 6,
        peso: 65,
        altura: 165,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Intermedio',
        comentarios: 8,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'PM',
        diasSeleccionados: ['Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 5,
        nombre: 'Javier',
        correo: 'javier@example.com',
        rol: 'Usuario',
        edad: 35,
        genero: 'Masculino',
        diasActividad: 2,
        peso: 75,
        altura: 175,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Principiante',
        comentarios: 12,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 6,
        nombre: 'María',
        correo: 'maria@example.com',
        rol: 'Usuario',
        edad: 20,
        genero: 'Femenino',
        diasActividad: 7,
        peso: 50,
        altura: 160,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Avanzado',
        comentarios: 20,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Miercoles'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 7,
        nombre: 'Luis',
        correo: 'luis@example.com',
        rol: 'Usuario',
        edad: 45,
        genero: 'Masculino',
        diasActividad: 1,
        peso: 80,
        altura: 185,
        objetivo: 'Mantenerse en Forma',
        estadoFisico: 'Intermedio',
        comentarios: 6,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'PM',
        diasSeleccionados: ['Lunes', 'Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 8,
        nombre: 'Elena',
        correo: 'elena@example.com',
        rol: 'Admin',
        edad: 22,
        genero: 'Otro',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Miercoles', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 9,
        nombre: 'Miguel',
        correo: 'miguel@example.com',
        rol: 'Usuario',
        edad: 30,
        genero: 'Masculino',
        diasActividad: 3,
        peso: 60,
        altura: 170,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Intermedio',
        comentarios: 5,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 10,
        nombre: 'Laura',
        correo: 'laura@example.com',
        rol: 'Usuario',
        edad: 40,
        genero: 'Femenino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Musculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Martes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 11,
        nombre: 'Raúl',
        correo: 'raul@example.com',
        rol: 'Usuario',
        edad: 28,
        genero: 'Masculino',
        diasActividad: 6,
        peso: 65,
        altura: 165,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Intermedio',
        comentarios: 8,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 12,
        nombre: 'Carmen',
        correo: 'carmen@example.com',
        rol: 'Usuario',
        edad: 35,
        genero: 'Otro',
        diasActividad: 2,
        peso: 75,
        altura: 175,
        objetivo: 'Ganar músculo',
        estadoFisico: 'Principiante',
        comentarios: 12,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 13,
        nombre: 'Jorge',
        correo: 'jorge@example.com',
        rol: 'Usuario',
        edad: 20,
        genero: 'Masculino',
        diasActividad: 7,
        peso: 50,
        altura: 160,
        objetivo: 'Mantenerse en Forma',
        estadoFisico: 'Avanzado',
        comentarios: 20,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    }
];

export const UsersTable = () => {

    const personasOrdenadas = [...personas].sort((a, b) => b.diasActividad - a.diasActividad);
    return (
        <div className='bg-white col-span-6 row-span-6 p-4 rounded border border-stone-300 '>
            <h3 className='text-azul-marino-500 mb-1 flex items-center  gap-2 font-medium'> <FaUserClock className='size-4' />Usuarios Frecuentes</h3>
            <div className="relative h-[calc(100%-28px)] overflow-x-auto border sm:rounded-lg">
                <div className="h-full overflow-y-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
                        <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Nombre
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
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
                                    <td className="px-6 py-4 text-center">
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
