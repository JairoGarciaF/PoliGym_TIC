import React, { useRef, useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { IoMaleFemale } from "react-icons/io5";

const colors = ['#0369a1', '#ec4899', '#94a3b8'];

export const DetallesGenderGraph = ({ ejercicio, infoMode }) => {
    const data = ejercicio.uso_genero;
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

    // Determina los datos que se mostrarán en el gráfico en función del infoMode (semanal o mensual)
    const chartData = infoMode === 'Semanal'
        ? [
            { id: 0, value: data.masculino.semanal, label: 'Masculino', },
            { id: 1, value: data.femenino.semanal, label: 'Femenino' },
            { id: 2, value: data.otro.semanal, label: 'Otro' }
        ]
        : [
            { id: 0, label: 'Masculino', value: data.masculino.mensual },
            { id: 1, label: 'Femenino', value: data.femenino.mensual },
            { id: 2, label: 'Otro', value: data.otro.mensual }
        ];

    return (
        <div ref={containerRef} className='bg-white p-4 rounded-xl shadow col-span-5 row-span-1'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <IoMaleFemale className='size-5' />
                Uso por Género
            </h3>
            <div className='flex items-center justify-center h-[calc(100%-24px-4px)]'>

                <PieChart
                    width={containerSize.width * 0.9} // Se adapta al tamaño del contenedor
                    height={containerSize.height * 0.9} // Se adapta al tamaño del contenedor
                    colors={colors}
                    series={[
                        {
                            data: chartData,
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
    )
}
