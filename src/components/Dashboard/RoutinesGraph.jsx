import React, { useState, useRef, useEffect } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { FaCalendarAlt } from "react-icons/fa";

const routinesStats = [
    { id: 0, value: 30, label: 'Rutina de brazos' },
    { id: 1, value: 15, label: 'Rutina de piernas' },
    { id: 2, value: 45, label: 'Rutina de abdomen' },
    { id: 3, value: 35, label: 'Rutina de gluteos' },
    { id: 4, value: 25, label: 'Rutina de espalda' },
];

const colors = ['#0c4a6e', '#0ea5e9', '#a5f3fc', '#1e40af', '#7dd3fc', '#cbd5e1'];


export const RoutinesGraph = () => {


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
        <div ref={containerRef} className='bg-white col-span-4 row-span-6 p-4 rounded border border-stone-300 '>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'> <FaCalendarAlt className='size-4' />Rutinas Populares</h3>


            <div className='flex h-[calc(100%-20px-4px)] items-center justify-center'>

                <PieChart

                    colors={colors}
                    series={[
                        {
                            data: routinesStats,
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
    )
}
