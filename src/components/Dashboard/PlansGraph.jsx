import React, { useState, useRef, useEffect } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { TbChecklist } from "react-icons/tb";

const plansStats = [
    { id: 0, value: 30, label: 'Plan de 3 meses' },
    { id: 1, value: 15, label: 'Plan de 6 meses' },
    { id: 2, value: 5, label: 'Plan de 12 meses' },
    { id: 3, value: 10, label: 'Plan de 1 mes' },
    { id: 4, value: 25, label: 'Plan de 2 meses' },
];

const colors = ['#365314', '#84cc16', '#d9f99d', '#15803d', '#22c55e', '#cbd5e1'];

export const PlansGraph = () => {


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
        <div ref={containerRef} className='bg-white col-span-4 row-span-6 p-4 rounded-xl shadow '>

            <h3 className='text-azul-marino-500 mb-1  flex self-start items-center gap-2 font-medium'> <TbChecklist className='size-5' />Planes Populares</h3>


            <div className='h-[calc(100%-20px-4px)] flex items-center justify-center'>

                <PieChart
                    colors={colors}
                    series={[
                        {
                            data: plansStats,
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
