import React, { useRef, useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BsFire } from "react-icons/bs";

const colors = ['#365314', '#84cc16', '#d9f99d', '#15803d', '#22c55e', '#94a3b8'];

// Función para calcular los porcentajes
const calculatePercentages = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map((item) => ({
        ...item,
        percentage: ((item.value / total) * 100).toFixed(2) // Redondeamos a 2 decimales
    }));
};

export const ImplementsGraph = ({ data }) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    // Calcular porcentajes basados en los datos
    const dataWithPercentages = calculatePercentages(data);

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
        <div
            ref={containerRef}
            className='bg-white p-4 rounded border h-full border-stone-300'
        >
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <BsFire className='size-5' />
                Implementos Populares
            </h3>

            <div className='flex items-center justify-center h-[calc(100%-24px-4px)]'>
                <PieChart
                    width={containerSize.width * 0.9} // Se adapta al tamaño del contenedor
                    height={containerSize.height * 0.9} // Se adapta al tamaño del contenedor
                    colors={colors}
                    series={[
                        {
                            data: dataWithPercentages,
                            valueFormatter: (item) => `${item.percentage}%`,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: '10%',
                            outerRadius: '90%',
                            paddingAngle: 2,
                            cornerRadius: 7,
                            startAngle: 0,
                            endAngle: 360,
                            cx: '30%',
                            cy: '50%',
                        },
                    ]}
                    slotProps={{
                        legend: {
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
