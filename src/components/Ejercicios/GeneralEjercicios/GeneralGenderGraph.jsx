import React, { useRef, useState, useEffect } from 'react';
import { IoMaleFemale } from "react-icons/io5";
import { BarChart } from '@mui/x-charts/BarChart';

export const GeneralGenderGraph = ({ data, infoMode }) => {

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

    // Obtener los nombres de los ejercicios y datos por género
    const exercises = data.map(exercise => exercise.nombre);
    const masculinoData = data.map(exercise => exercise.uso_genero.masculino[infoMode.toLowerCase()]);
    const femeninoData = data.map(exercise => exercise.uso_genero.femenino[infoMode.toLowerCase()]);
    const otroData = data.map(exercise => exercise.uso_genero.otro[infoMode.toLowerCase()]);

    return (
        <div ref={containerRef} className=' p-4  bg-white col-span-7 rounded-xl shadow'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <IoMaleFemale className='size-5' />
                Uso por Género
            </h3>
            <BarChart
                xAxis={[{
                    scaleType: 'band',
                    data: exercises,
                    categoryGapRatio: 0.5,
                    barGapRatio: 0.2,

                }]}
                series={[
                    { label: 'Masculino', data: masculinoData, },
                    { label: 'Femenino', data: femeninoData },
                    { label: 'Otro', data: otroData }
                ]}
                colors={['#0369a1', '#ec4899', '#94a3b8']}
                width={containerSize.width * 1} // Se adapta al tamaño del contenedor
                height={containerSize.height * 1}
                slotProps={{
                    legend: {
                        labelStyle: {
                            fontSize: 14,
                            fontFamily: 'Open Sans',
                        },
                        itemMarkHeight: 10
                    },

                }}
            />
        </div>
    )
}
