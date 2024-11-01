import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BiMaleFemale } from "react-icons/bi";

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

// Inicializamos un objeto para contar usuarios por género
const genderCount = { Masculino: 0, Femenino: 0, Otro: 0 };

// Contamos los usuarios por género
personas.forEach(persona => {
    if (genderCount[persona.genero] !== undefined) {
        genderCount[persona.genero]++;
    } else {
        genderCount['Otro']++;
    }
});

// Creamos el nuevo arreglo para el gráfico circular
const usersPerGender = [
    { id: 0, value: genderCount.Masculino, label: 'Masculino' },
    { id: 1, value: genderCount.Femenino, label: 'Femenino' },
    { id: 2, value: genderCount.Otro, label: 'Otro' },
];


export const UsersGraph = () => {
    return (
        <div className='bg-white col-span-6 row-span-4 p-4 rounded-xl shadow flex flex-col items-center '>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'> <BiMaleFemale className='size-5' />Usuarios por Género</h3>
            <PieChart
                colors={['#0369a1', '#ec4899', '#94a3b8']}
                series={[
                    {
                        data: usersPerGender,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 7,
                        startAngle: -90,
                        endAngle: 90,
                        cx: 150, // Ajusta la posición horizontal
                        cy: 150, // Ajusta la posición vertical
                    },
                ]}
                width={400}
            />

        </div>
    );
};
