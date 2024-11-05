import React from 'react';
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { FaDumbbell } from "react-icons/fa6";

const data = [
    { muscle: 'biceps', masculino: 120, femenino: 95, otro: 70 },
    { muscle: 'chest', masculino: 150, femenino: 85, otro: 100 },
    { muscle: 'quads', masculino: 110, femenino: 130, otro: 90 },
    { muscle: 'glutes', masculino: 90, femenino: 150, otro: 85 },
    { muscle: 'calves', masculino: 80, femenino: 75, otro: 65 },
    { muscle: 'triceps', masculino: 115, femenino: 100, otro: 90 },
    { muscle: 'lats', masculino: 105, femenino: 95, otro: 80 },
    { muscle: 'traps', masculino: 100, femenino: 90, otro: 75 },
    { muscle: 'forearms', masculino: 85, femenino: 80, otro: 70 },
    { muscle: 'shoulders', masculino: 130, femenino: 120, otro: 95 },
    { muscle: 'obliques', masculino: 100, femenino: 90, otro: 80 },
    { muscle: 'abdominals', masculino: 95, femenino: 85, otro: 70 },
    { muscle: 'lowerBack', masculino: 100, femenino: 90, otro: 80 },
    { muscle: 'hamstrings', masculino: 110, femenino: 100, otro: 90 },
    { muscle: 'traps-middle', masculino: 100, femenino: 90, otro: 75 }
];

const muscleTranslation = {
    biceps: 'Bíceps',
    chest: 'Pecho',
    quads: 'Cuádriceps',
    glutes: 'Glúteos',
    calves: 'Pantorrillas',
    triceps: 'Tríceps',
    lats: 'Dorsales',
    traps: 'Trapecios',
    forearms: 'Antebrazos',
    shoulders: 'Hombros',
    obliques: 'Oblicuos',
    abdominals: 'Abdominales',
    lowerBack: 'Espalda baja',
    hamstrings: 'Isquiotibiales',
    "traps-middle": 'Trapecio medio',
};

const MuscleRadarChart = () => {
    return (
        <div className='bg-white p-4 rounded-lg shadow col-span-4 row-span-6'>
            <h3 className='text-azul-marino-500 text-lg flex items-center gap-2 font-medium'>
                <FaDumbbell className='size-5' />Entrenamiento de Músculos
            </h3>
            <div className='h-[calc(100%-28px)] flex items-center justify-center'>

                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="48%" outerRadius="80%" data={data}>
                        <PolarGrid />
                        <PolarAngleAxis
                            dataKey="muscle"
                            tickFormatter={(muscle) => muscleTranslation[muscle] || muscle} // Traducción de músculo
                        />
                        <PolarRadiusAxis angle={30} domain={[0, 160]} />
                        <Radar name="Masculino" dataKey="masculino" stroke="#0369a1" fill="#0369a1" fillOpacity={0.5} />
                        <Radar name="Femenino" dataKey="femenino" stroke="#ec4899" fill="#ec4899" fillOpacity={0.5} />
                        <Radar name="Otro" dataKey="otro" stroke="#64748b" fill="#94a3b8" fillOpacity={0.5} />
                        <Legend />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default MuscleRadarChart;
