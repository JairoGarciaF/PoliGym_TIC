import React, { useState, useRef, useEffect } from 'react'
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

    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    useEffect(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                setContainerSize({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height,
                });
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                resizeObserver.unobserve(containerRef.current);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className='bg-white col-span-4 row-span-6 p-4 rounded border border-stone-300'>
            <h3 className='text-azul-marino-500 flex items-center gap-2 font-medium'>
                <FaDumbbell className='size-4' />
                Ejercicios Populares
            </h3>


            <div className='h-[calc(100%-20px-4px)] flex items-center justify-center'>

                <PieChart
                    colors={colors}
                    series={[
                        {
                            data: exerciseStats,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: '30%',
                            outerRadius: '60%',
                            paddingAngle: 2,
                            cornerRadius: 7,
                            startAngle: 0,
                            endAngle: 360,
                            cx: '30%',
                            cy: '50%',
                        },
                    ]}
                    width={containerSize.width * 0.9} // Se adapta al tamaño del contenedor
                    height={containerSize.height * 0.9} // Se adapta al tamaño del contenedor
                    slotProps={{
                        legend: {
                            // Hacer mas pequeño
                            labelStyle: {
                                fontSize: 14,
                                fontFamily: 'Open Sans',
                            },
                            position: { vertical: 'middle', horizontal: 'right' },
                            direction: 'column',
                            itemMarkHeight: 10,
                        },
                    }}
                />

            </div>
        </div>
    );
};
