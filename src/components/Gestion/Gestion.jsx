import React, { useState } from 'react';
import { Rutinas } from './Rutinas/Rutinas';
import { PlanEntrenamiento } from './PlanEntrenamiento/PlanEntrenamiento';
import { PlanAlimentacion } from './PlanAlimentacion/PlanAlimentacion';

export const Gestion = () => {
    const [activeTab, setActiveTab] = useState('rutinas');

    return (
        <div className='bg-white rounded-xl pb-4 shadow h-full p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold'>Gestión</h1>

            <nav className="flex justify-start open-sans border-b  ">
                <button
                    onClick={() => setActiveTab('rutinas')}
                    className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
                    ${activeTab === 'rutinas'
                            ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                            : 'text-stone-500 truncate hover:text-azul-marino-300'}`}
                >
                    Rutinas
                </button>
                <button
                    onClick={() => setActiveTab('planEntrenamiento')}
                    className={`px-4 py-1 font-semibold whitespace-nowrap lg:text-sm text-xs transition-colors 
                    ${activeTab === 'planEntrenamiento'
                            ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                            : 'text-stone-500 truncate hover:text-azul-marino-300'}`}
                >
                    Planes de Entrenamiento
                </button>
                <button
                    onClick={() => setActiveTab('planAlimentacion')}
                    className={`px-4 py-1 font-semibold whitespace-nowrap lg:text-sm text-xs transition-colors 
                    ${activeTab === 'planAlimentacion'
                            ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                            : 'text-stone-500 truncate hover:text-azul-marino-300'}`}
                >
                    Planes de Alimentación
                </button>

            </nav>

            {activeTab === 'rutinas' && <Rutinas />}
            {activeTab === 'planEntrenamiento' && <PlanEntrenamiento />}
            {activeTab === 'planAlimentacion' && <PlanAlimentacion />}

        </div>
    )
}
