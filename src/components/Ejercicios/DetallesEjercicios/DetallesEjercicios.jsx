import React from 'react'
import { TbTargetArrow } from "react-icons/tb";
import { FaCircleInfo } from "react-icons/fa6";
import { BodyMap } from '../../BodyMap/BodyMap';
import { DetallesGenderGraph } from './DetallesGenderGraph';
import { DetallesUsageGraph } from './DetallesUsageGraph';

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


export const DetallesEjercicios = ({ ejercicio, infoMode }) => {

    return (
        <>
            {ejercicio ? (

                <div className="p-4 h-[calc(100%-40px-49px)] open-sans gap-4 grid grid-cols-12 grid-rows-2 bg-slate-100 rounded-xl">
                    <div className='col-span-4 row-span-1 h-full flex justify-center bg-white p-4 rounded-xl shadow '>
                        <img
                            src='./Navy-Seal-Burpee.gif' //ejercicio.url
                            alt={ejercicio.nombre}
                            className="h-full object-cover self-center"
                        />
                    </div>
                    <div className='col-span-3 row-span-1 gap-4 grid grid-cols-1'>
                        <div className='bg-white py-2 px-4 rounded-xl shadow '>
                            <div className='flex flex-col justify-center h-full'>
                                <h3 className='text-slate-500 text-xs'>Nombre</h3>
                                <div className='flex items-center gap-1 text-azul-marino-500 '>
                                    <p className='font-medium text-xl'>{ejercicio.nombre}</p>
                                </div>

                            </div>
                        </div>
                        <div className='grid gap-4 grid-cols-2'>
                            <div className='bg-white py-2 px-4 rounded-xl shadow '>
                                <div className='flex flex-col justify-center h-full'>
                                    <h3 className='text-slate-500 text-xs'>Categoría</h3>
                                    <span className={`px-2 py-0.5 mt-1 rounded-full w-fit  ${getCategoryPillColor(ejercicio.categoria)}`}>
                                        {ejercicio.categoria}
                                    </span>

                                </div>
                            </div>
                            <div className='bg-white py-2 px-4 rounded-xl shadow '>
                                <div className='flex flex-col justify-center h-full'>
                                    <h3 className='text-slate-500 text-xs'>Dificultad</h3>
                                    <span className={`px-2 py-0.5 mt-1 rounded-full w-fit  ${getDifficultyPillColor(ejercicio.dificultad)}`}>
                                        {ejercicio.dificultad}
                                    </span>

                                </div>
                            </div>
                        </div>
                        <div className='bg-white py-2 px-4 rounded-xl shadow '>
                            <div className='flex flex-col justify-center h-full'>
                                <h3 className='text-slate-500 text-xs'>Implemento</h3>
                                <div className='flex items-center gap-1 text-azul-marino-500 '>
                                    <p className='font-medium text-xl'>{ejercicio.implemento}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-span-5 flex flex-col justify-center row-span-1 bg-white p-4 rounded-xl shadow h-full '>
                        <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                            <TbTargetArrow className='size-5' />
                            Grupos Musculares
                        </h3>
                        <div className='flex justify-center h-[calc(100%-28px)]'>
                            <BodyMap gender='Masculino' view='front' className='w-1/3' recentMuscles={ejercicio.musculos} oldMuscles={[]} />
                            <BodyMap gender='Masculino' view='back' className='w-1/3' recentMuscles={ejercicio.musculos} oldMuscles={[]} />
                        </div>

                    </div>
                    <DetallesGenderGraph ejercicio={ejercicio} infoMode={infoMode} />
                    <DetallesUsageGraph ejercicio={ejercicio} infoMode={infoMode} />
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[calc(100%-35px-56px)] gap-2'>
                    <FaCircleInfo className='text-slate-300 size-10' />
                    <p className='text-slate-500'>Selecciona un ejercicio para ver los detalles</p>
                </div>
            )}
        </>
    )
}


