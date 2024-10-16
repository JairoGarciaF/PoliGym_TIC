import React, { useState } from 'react';
import { MdCake } from "react-icons/md";
import { FaCircleInfo, FaArrowTrendUp, FaClockRotateLeft } from "react-icons/fa6";
import { IoFitness, IoPartlySunny, IoCloudyNight } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { FaAngleDown, FaAngleUp, FaWeight, FaRuler } from 'react-icons/fa';
import { BodyMap } from '../../BodyMap/BodyMap';
import { UserCard } from './UserCard';
import { LastRoutinesTable } from './LastRoutinesTable';
import { TrainingPlansTable } from './TrainingPlansTable';
import { MealPlansTable } from './MealPlansTable';

const ultimasRutinas = [
    {
        "rutina": "Full Body",
        "duracion": "45 min",
        "fecha": "2024-10-13",
        "musculos": ['biceps', 'chest', 'quads']
    },
    {
        "rutina": "Piernas y Glúteos",
        "duracion": "50 min",
        "fecha": "2024-10-10",
        "musculos": ['glutes', 'quads', 'calves']
    },
    {
        "rutina": "Pecho y Tríceps",
        "duracion": "40 min",
        "fecha": "2024-10-09",
        "musculos": ['chest', 'triceps', 'shoulders']
    },
    {
        "rutina": "Cardio Intensivo",
        "duracion": "30 min",
        "fecha": "2024-10-05",
        "musculos": ['calves', 'quads']
    },
    {
        "rutina": "Espalda y Bíceps",
        "duracion": "55 min",
        "fecha": "2024-10-03",
        "musculos": ['biceps', 'lats', 'traps']
    }
];

//Fecha de hoy
const today = new Date();
console.log(today);

const recentMuscles = [];
const oldMuscles = [];

ultimasRutinas.forEach(rutina => {
    const rutinaDate = new Date(rutina.fecha);
    const daysDiff = Math.ceil((today - rutinaDate) / (1000 * 60 * 60 * 24)); // Días de diferencia

    if (daysDiff <= 3) {
        // Músculos entrenados recientemente (dentro de 3 días)
        recentMuscles.push(...rutina.musculos);
    } else if (daysDiff >= 4 && daysDiff <= 5) {
        // Músculos entrenados hace algún tiempo (4 a 5 días)
        oldMuscles.push(...rutina.musculos);
    }
});

// Elimina duplicados
const uniqueRecentMuscles = [...new Set(recentMuscles)];
const uniqueOldMuscles = [...new Set(oldMuscles)];



export const Detalles = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {user ? (
                <div className="grid open-sans grid-cols-12 grid-rows-12 gap-2 pt-4 items-start h-[calc(100%-36px-41px)] bg-white ">

                    <UserCard user={user} />

                    {/* Información del usuario en cuadrícula */}
                    <div className="col-span-4 h-full row-span-6 grid grid-cols-12 gap-2 text-left text-stone-600 w-full">
                        <Card
                            Icon={MdCake}
                            colSpan={'col-span-4'}
                            title={'Edad'}
                            value={user.edad + ' años'}
                        />
                        <Card
                            Icon={FaWeight}
                            colSpan={'col-span-4'}
                            title={'Peso'}
                            value={user.peso + ' kg'}
                        />
                        <Card
                            Icon={FaRuler}
                            colSpan={'col-span-4'}
                            title={'Altura'}
                            value={user.altura + ' cm'}
                        />
                        <Card
                            Icon={TbTargetArrow}
                            colSpan={'col-span-6'}
                            title={'Objetivo'}
                            value={user.objetivo}
                        />
                        <Card
                            Icon={FaArrowTrendUp}
                            colSpan={'col-span-6'}
                            title={'Estado Físico'}
                            value={user.estadoFisico}
                        />
                        <Card
                            Icon={{ 'AM': IoPartlySunny, 'PM': IoCloudyNight }[user.horario]}
                            colSpan={'col-span-2'}
                            title={'Horario'}
                            value={user.horario}
                        />
                        <div className={`bg-white flex flex-col  justify-center col-span-10 p-2 rounded border border-stone-300`}>
                            <h3 className="text-stone-500 text-xs">Días de Entreno</h3>
                            <div className="flex gap-1 overflow-auto mt-1">
                                {user.diasSeleccionados.map((dia, index) => {
                                    // Define el color según el género
                                    let bgColor = '';
                                    let textColor = '';

                                    switch (user.genero) {
                                        case 'Masculino':
                                            bgColor = 'bg-sky-100';
                                            textColor = 'text-sky-700';
                                            break;
                                        case 'Femenino':
                                            bgColor = 'bg-pink-100';
                                            textColor = 'text-pink-700';
                                            break;
                                        default: // Otro
                                            bgColor = 'bg-gray-100';
                                            textColor = 'text-gray-700';
                                            break;
                                    }

                                    return (
                                        <span
                                            key={index}
                                            className={`${bgColor} ${textColor} text-sm font-medium px-2 py-1 rounded-full`}
                                        >
                                            {dia}
                                        </span>
                                    );
                                })}
                            </div>

                        </div>


                        <div className="relative flex items-center col-span-12 bg-white p-2 rounded border border-stone-300">
                            {/* Header del acordeón */}

                            <div
                                className="flex w-full justify-between items-center "

                            >
                                <div className="flex flex-col justify-center h-full">
                                    <h3 className="text-stone-500 text-xs">Problemas Médicos</h3>
                                    <div className="flex items-center gap-1 text-azul-marino-500">
                                        <IoFitness className="size-5" />
                                        <p className="font-medium text-xl">{user.problemasMedicos}</p>
                                    </div>
                                </div>
                                {user.problemasMedicos !== 'Ninguno' && (
                                    <div onClick={toggleAccordion} className='cursor-pointer'>
                                        {isOpen ? <FaAngleUp className='size-5' /> : <FaAngleDown className='size-5' />}
                                    </div>)}
                            </div>


                            {/* Contenido expandido */}
                            {isOpen && (
                                <div className="absolute left-0 top-full w-full bg-white border border-stone-300 p-3 rounded mt-1 z-10">
                                    <p className=" text-stone-800 text-sm">{user.detalleProblemasMedicos}</p>
                                </div>
                            )}
                        </div>


                    </div>

                    <div className='col-span-5 row-span-12 gap-2 p-2 h-full  border border-stone-300 rounded flex flex-col'>
                        <h3 className='text-azul-marino-500 mb-1 flex items-center font-medium gap-1'> <FaClockRotateLeft />Últimas Rutinas</h3>

                        <div className='h-[calc(100%-28px)] flex flex-col gap-2'>

                            <div className='flex justify-center h-1/2'>
                                <BodyMap gender={user.genero} view='front' className='w-1/3' recentMuscles={uniqueRecentMuscles} oldMuscles={uniqueOldMuscles} />
                                <BodyMap gender={user.genero} view='back' className='w-1/3' recentMuscles={uniqueRecentMuscles} oldMuscles={uniqueOldMuscles} />
                            </div>
                            <LastRoutinesTable ultimasRutinas={ultimasRutinas} />
                        </div>
                    </div>

                    <MealPlansTable />
                    <TrainingPlansTable />

                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[calc(100%-35px-56px)] gap-2'>
                    <FaCircleInfo className='text-stone-300 size-10' />
                    <p className='text-stone-500'>Selecciona un usuario para ver los detalles</p>
                </div>
            )}

        </>
    );
};

const Card = ({ Icon, colSpan, title, value }) => {
    return (
        <div className={`bg-white ${colSpan} p-2 rounded border border-stone-300`}>
            <div className='flex flex-col justify-center h-full'>
                <h3 className='text-stone-500 text-xs'>{title}</h3>
                <div className='flex items-center gap-1 text-azul-marino-500 '>
                    <Icon className='size-5' />
                    <p className='font-medium text-xl'>{value}</p>
                </div>

            </div>
        </div>
    )
}
