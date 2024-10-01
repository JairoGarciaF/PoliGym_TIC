import React, { useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { FaDumbbell } from 'react-icons/fa';

const exerciseStats = [
    { id: 0, value: 30, label: 'Flexiones' },
    { id: 1, value: 25, label: 'Sentadillas' },
    { id: 2, value: 15, label: 'Planchas' },
    { id: 3, value: 50, label: 'Burpees' },
    { id: 4, value: 40, label: 'Abdominales' },
];

const colors = ['#0c4a6e', '#0ea5e9', '#a5f3fc', '#1e40af', '#7dd3fc'];

export const ExercisesGraph = () => {
    const [showChart, setShowChart] = useState(true); // Estado para alternar entre gráfico y leyenda

    const toggleView = () => {
        setShowChart(!showChart); // Cambia entre gráfico y leyenda
    };

    return (
        <div className='bg-white col-span-4 row-span-6 p-4 rounded border border-stone-300'>
            <div className='flex justify-between items-center mb-4'>
                <h3 className='text-azul-marino-500 flex items-center gap-2 font-medium'>
                    <FaDumbbell className='size-4' />
                    Ejercicios Populares
                </h3>

                {/* Toggle switch */}
                <label className="flex items-center gap-2">
                    <span className='text-azul-marino-500 text-sm'>{showChart ? 'Gráfico' : 'Leyenda'}</span>

                    <input type="checkbox" value="" className="sr-only peer" checked={showChart}
                        onChange={toggleView} />
                    <div className="relative w-9 h-5 peer-focus:outline-none rounded-full peer bg-sky-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-600 peer-checked:bg-blue-800"></div>

                </label>
            </div>

            <div className='h-[calc(100%-20px-4px)] flex items-center justify-center'>
                {showChart ? (
                    <PieChart
                        colors={colors}
                        series={[
                            {
                                data: exerciseStats,
                                highlightScope: { fade: 'global', highlight: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                innerRadius: 50,
                                outerRadius: 100,
                                paddingAngle: 2,
                                cornerRadius: 7,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 100,
                            },
                        ]}
                        height={200}
                        width={200}
                        slotProps={{
                            legend: { hidden: true },
                        }}
                    />
                ) : (
                    <div className='flex flex-col gap-2'>
                        {exerciseStats.map((exercise, index) => (
                            <div key={exercise.id} className='flex items-center gap-2'>
                                <div
                                    className='w-4 h-4'
                                    style={{ backgroundColor: colors[index] }}
                                ></div>
                                <span className='text-azul-marino-500'>
                                    {exercise.label}: {exercise.value}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
