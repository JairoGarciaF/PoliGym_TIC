import React, { useState, useEffect } from 'react';
import { General } from './General/General';
import { Detalles } from './Detalles/Detalles';
import { Lista } from './Lista/Lista';
import { findAllUsers } from '../../services/users/users';

const defaultProfilePic = 'https://api.dicebear.com/9.x/initials/svg?seed=User';


const usuarios = [
    {
        id: 1,
        nombre: 'Carlos',
        correo: 'carlos@example.com',
        rol: 'Usuario',
        tipo: 'Estudiante', //Profesor, Administración
        edad: 25,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'Mañana',
        diasSeleccionados: ['Lunes', 'Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 2,
        nombre: 'Ana',
        correo: 'ana@example.com',
        rol: 'Usuario',
        tipo: 'Administración',
        edad: 30,
        oculto: false,
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
        horario: 'Tarde',
        diasSeleccionados: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 3,
        nombre: 'Pedro',
        correo: 'pedro@example.com',
        rol: 'Admin',
        tipo: 'Profesor',
        edad: 40,
        oculto: true,
        genero: 'Masculino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Lesiones',
        detalleProblemasMedicos: 'Dolor en la rodilla derecha',
        horario: 'Noche',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 4,
        nombre: 'Sofía',
        correo: 'sofia@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 28,
        oculto: true,
        genero: 'Femenino',
        diasActividad: 6,
        peso: 65,
        altura: 165,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Intermedio',
        comentarios: 8,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'Tarde',
        diasSeleccionados: ['Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 5,
        nombre: 'Javier',
        correo: 'javier@example.com',
        rol: 'Usuario',
        tipo: 'Administración',
        edad: 35,
        oculto: true,
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
        horario: 'Mañana',
        diasSeleccionados: ['Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 6,
        nombre: 'María',
        correo: 'maria@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 20,
        oculto: false,
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
        horario: 'Mañana',
        diasSeleccionados: ['Lunes', 'Miercoles'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 7,
        nombre: 'Luis',
        correo: 'luis@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 45,
        oculto: false,
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
        horario: 'Tarde',
        diasSeleccionados: ['Lunes', 'Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 8,
        nombre: 'Elena',
        correo: 'elena@example.com',
        rol: 'Admin',
        tipo: 'Profesor',
        edad: 22,
        oculto: true,
        genero: 'Otro',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'Mañana',
        diasSeleccionados: ['Miercoles', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 9,
        nombre: 'Miguel',
        correo: 'miguel@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 30,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 3,
        peso: 60,
        altura: 170,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Intermedio',
        comentarios: 5,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'Mañana',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 10,
        nombre: 'Laura',
        correo: 'laura@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 40,
        oculto: false,
        genero: 'Femenino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'Mañana',
        diasSeleccionados: ['Lunes', 'Martes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 11,
        nombre: 'Raúl',
        correo: 'raul@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 28,
        oculto: false,
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
        horario: 'Mañana',
        diasSeleccionados: ['Martes', 'Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 12,
        nombre: 'Carmen',
        correo: 'carmen@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 35,
        oculto: false,
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
        horario: 'Mañana',
        diasSeleccionados: ['Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 13,
        nombre: 'Jorge',
        correo: 'jorge@example.com',
        rol: 'Usuario',
        tipo: 'Profesor',
        edad: 20,
        oculto: false,
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
        horario: 'Mañana',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    }
];

export const Usuarios = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedUser, setSelectedUser] = useState(null); // Para guardar el usuario seleccionado
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await findAllUsers();
                setUsers(users);
            } catch (error) {
                console.error('Error al obtener los usuarios', error);
            }
        }
        fetchData();
    }, []);

    const handleVerDetalles = (user) => {
        setSelectedUser(user); // Guarda el usuario seleccionado
        setActiveTab('detalles'); // Cambia a la pestaña de detalles
    };

    return (
        <div className='bg-white rounded-xl flex flex-col shadow h-full p-4'>
            <div className='overflow-hidden'>
                <h1 className='montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold'>Usuarios</h1>

                <nav className="flex justify-start open-sans border-b mb-2 ">
                    <button
                        onClick={() => setActiveTab('general')}
                        className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${activeTab === 'general'
                                ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                : 'text-stone-500 hover:text-azul-marino-300'}`}
                    >
                        General
                    </button>
                    <button
                        onClick={() => setActiveTab('lista')}
                        className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${activeTab === 'lista'
                                ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                : 'text-stone-500 hover:text-azul-marino-300'}`}
                    >
                        Lista
                    </button>
                    <button
                        onClick={() => setActiveTab('detalles')}
                        className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${activeTab === 'detalles'
                                ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                : 'text-stone-500 hover:text-azul-marino-300'}`}
                    >
                        Detalles
                    </button>
                </nav>
            </div>

            {activeTab === 'general' && <General usuarios={usuarios} />}
            {activeTab === 'lista' && <Lista onVerDetalles={handleVerDetalles} usuarios={usuarios} />}
            {activeTab === 'detalles' && <Detalles user={selectedUser} />}
        </div>
    );
}
