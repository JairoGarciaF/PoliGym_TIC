import React, { useState } from 'react';
import { GeneralEjercicios } from './GeneralEjercicios/GeneralEjercicios';
import { DetallesEjercicios } from './DetallesEjercicios/DetallesEjercicios';

const ejercicios = [
    {
        "id": 1,
        "url": "https://example.com/exercise1",
        "nombre": "Press de banca",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de press de banca",
        "musculos": ["chest", "triceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,  // Uso semanal por género, la suma de todos los generos debe ser igual al uso semanal total (65)
                "mensual": 85   // Uso mensual por género, la suma de todos los generos debe ser igual al uso mensual del mes actual(185)
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12], // Uso del ejercicio por día de la semana (lunes a domingo). EL total de la semana es 65
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0] // Uso del ejercicio por cada mes (ene a dic). 
    },
    {
        "id": 2,
        "url": "https://example.com/exercise2",
        "nombre": "Sentadilla",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de prensa de piernas",
        "musculos": ["quads", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 3,
        "url": "https://example.com/exercise3",
        "nombre": "Deadlift",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de pesas",
        "musculos": ["lowerback", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 4,
        "url": "https://example.com/exercise4",
        "nombre": "Jumping Jacks",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["calves", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 5,
        "url": "https://example.com/exercise5",
        "nombre": "Yoga",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Pelota de yoga",
        "musculos": ["hamstrings", "lowerback"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 5],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 6,
        "url": "https://example.com/exercise6",
        "nombre": "Dominadas",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de dominadas",
        "musculos": ["lats", "biceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 7,
        "url": "https://example.com/exercise7",
        "nombre": "Estocadas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Ninguno",
        "musculos": ["quads", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    }
];


const calculateTotals = (ejercicios) => {
    return ejercicios.map(ejercicio => ({
        ...ejercicio,
        uso_semanal_total: ejercicio.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: ejercicio.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};


export const Ejercicios = () => {
    const [infoMode, setInfoMode] = useState('Semanal');
    const [activeTab, setActiveTab] = useState('general');
    const [selectedExercise, setSelectedExercise] = useState(null); // Para guardar el ejercicio seleccionado
    const ejerciciosData = calculateTotals(ejercicios);

    const handleExerciseSelect = (event) => {
        if (event) {
            const exercise = ejerciciosData.find((item) => item.nombre === event);
            setSelectedExercise(exercise); // Almacena el ejercicio seleccionado
            setActiveTab('detalles'); // Cambia a la pestaña de detalles
        }
    };

    return (
        <div className='bg-white rounded-xl flex flex-col shadow h-full p-4'>
            <div>
                <div className='flex justify-between overflow-hidden'>
                    <h1 className='montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold'>Ejercicios</h1>
                    <nav className="flex justify-start md:w-auto w-1/3 open-sans">
                        <button
                            onClick={() => setInfoMode('Semanal')}
                            className={`sm:p-2 p-1 text-xs truncate rounded-l-lg transition-colors 
                    ${infoMode === 'Semanal'
                                    ? 'text-blue-700   bg-blue-100'
                                    : 'text-slate-500 border hover:bg-slate-50'}`}
                        >
                            Semanal
                        </button>
                        <button
                            onClick={() => setInfoMode('Mensual')}
                            className={`sm:p-2 p-1 text-xs truncate rounded-r-lg  transition-colors 
                    ${infoMode === 'Mensual'
                                    ? 'text-cyan-700  bg-cyan-100'
                                    : 'text-slate-500 border hover:bg-slate-50'}`}
                        >
                            Mensual
                        </button>
                    </nav>
                </div>
                <nav className="flex justify-between items-end open-sans border-b mb-2">
                    <div >
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${activeTab === 'general'
                                    ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                    : 'text-stone-500 hover:text-azul-marino-300'}`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('detalles')}
                            className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${activeTab === 'detalles'
                                    ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                    : 'text-stone-500 '}`}
                        >
                            Detalles
                        </button>
                    </div>
                    {activeTab === 'detalles' && (
                        <nav className="flex justify-start sm:w-auto w-1/3 text-sm">
                            <select
                                className="px-4 py-1 w-full bg-white text-azul-marino-500"
                                onChange={(e) => handleExerciseSelect(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Selecciona un ejercicio
                                </option>
                                {ejerciciosData.map((exercise) => (
                                    <option key={exercise.nombre} value={exercise.nombre} className="font-medium">
                                        {exercise.nombre}
                                    </option>
                                ))}
                            </select>
                        </nav>
                    )}

                </nav>
            </div>

            {activeTab === 'general' && <GeneralEjercicios ejercicios={ejerciciosData} infoMode={infoMode} />}
            {activeTab === 'detalles' && <DetallesEjercicios ejercicio={selectedExercise} infoMode={infoMode} />}
        </div>
    )
}
