import React from 'react'
import { TbTargetArrow, TbCategoryFilled } from "react-icons/tb";
import { FaCircleInfo, FaArrowTrendUp } from "react-icons/fa6";
import { FaChartLine, FaFireAlt } from "react-icons/fa";
import { BodyMap } from '../../BodyMap/BodyMap';
import { DetallesGenderGraph } from './DetallesGenderGraph';
import { DetallesUsageGraph } from './DetallesUsageGraph';

// Función que devuelve el color según la categoría
const getCategoryPillColor = (category) => {
    switch (category) {
        case "Fuerza":
            return " text-blue-900";
        case "Cardio":
            return " text-orange-700";
        case "Estiramiento":
            return " text-lime-700";
        default:
            return " text-gray-700";
    }
};

// Función que devuelve el color según la dificultad
const getDifficultyPillColor = (difficulty) => {
    switch (difficulty) {
        case "Baja":
            return " text-green-700";
        case "Media":
            return " text-yellow-700";
        case "Alta":
            return " text-red-700";
        default:
            return "text-gray-700";
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
                    <div className='col-span-4 row-span-1 gap-4 grid grid-rows-3 grid-cols-1'>
                        <div className='bg-white py-2 px-4 rounded-xl shadow '>
                            <div className='flex flex-col justify-center h-full'>
                                <h3 className='text-slate-500 text-xs'>Nombre</h3>
                                <div className='flex items-center gap-1 text-azul-marino-500 '>
                                    <p className='font-medium text-3xl'>{ejercicio.nombre}</p>
                                </div>
                            </div>
                        </div>
                        <div className='grid row-span-1 gap-4 grid-cols-3'>
                            <div className='col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow'>
                                <div className='h-full flex flex-col justify-center'>
                                    <h3 className='text-slate-500 text-xs '>Uso</h3>
                                    <div className='open-sans flex text-azul-marino-500 gap-2 items-center'>
                                        <FaArrowTrendUp className='size-7' />
                                        <p className='font-semibold text-3xl'>  {infoMode === 'Semanal' ? ejercicio.uso_semanal_total : ejercicio.uso_mensual_total}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow'>
                                <div className='h-full flex flex-col justify-center'>
                                    <h3 className='text-slate-500 text-xs '>Categoría</h3>
                                    <div className={`open-sans flex ${getCategoryPillColor(ejercicio.categoria)} gap-2 items-center`}>
                                        <TbCategoryFilled className='size-7' />
                                        <p className='font-semibold text-3xl'>  {ejercicio.categoria}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow'>
                                <div className='h-full flex flex-col justify-center'>
                                    <h3 className='text-slate-500 text-xs '>Dificultad</h3>
                                    <div className={`open-sans flex ${getDifficultyPillColor(ejercicio.dificultad)} gap-2 items-center`}>
                                        <FaFireAlt className='size-7' />
                                        <p className='font-semibold text-3xl'>  {ejercicio.dificultad}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white py-2 px-4 rounded-xl shadow '>
                            <div className='flex flex-col justify-center h-full'>
                                <h3 className='text-slate-500 text-xs'>Implemento</h3>
                                <div className='flex items-center gap-1 text-azul-marino-500 '>
                                    <p className='font-medium text-3xl'>{ejercicio.implemento}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='col-span-4 flex flex-col justify-center row-span-1 bg-white p-4 rounded-xl shadow h-full '>
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


