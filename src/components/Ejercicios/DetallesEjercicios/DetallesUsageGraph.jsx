import React, { useRef, useState, useEffect } from 'react';
import { FaChartLine } from "react-icons/fa";
import { LineChart } from '@mui/x-charts/LineChart';

const xLabelsSemanal = [
    'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
]

const xLabelsMensual = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]


export const DetallesUsageGraph = ({ ejercicio, infoMode }) => {
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

    // Datos para el gráfico según el tab activo
    const chartData = infoMode === 'Semanal' ? ejercicio.uso_semanal : ejercicio.uso_mensual;


    return (
        <div ref={containerRef} className='bg-white p-4 rounded-xl shadow lg:col-span-2 xl:row-span-1 '>
            <h3 className='text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium'>
                <FaChartLine className='xl:size-4 size-3' />
                Frecuencia de Uso
            </h3>
            {/* Gráfico de uso */}
            <LineChart
                series={[
                    {
                        data: chartData,
                    },
                ]}
                colors={infoMode === 'Semanal' ? ['#3b82f6'] : ['#06b6d4']}
                xAxis={[{
                    scaleType: 'point',
                    data: infoMode === 'Semanal' ? xLabelsSemanal : xLabelsMensual,

                }]}
                yAxis={[{
                    min: 0
                }]}
                grid={{ vertical: true, horizontal: true }}
                width={containerSize.width * 1} // Se adapta al tamaño del contenedor
                height={containerSize.height * 0.9}
            />
        </div>
    )
}
