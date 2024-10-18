import React, { useRef, useState, useEffect } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { TbCategoryFilled } from "react-icons/tb";

export const GeneralCategoryGraph = ({ data, infoMode }) => {
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

    // Agrupar ejercicios por categoría y sumar el uso
    const categoriasUso = data.reduce((acc, ejercicio) => {
        const categoria = ejercicio.categoria;
        const uso = infoMode === 'Semanal'
            ? ejercicio.uso_semanal.reduce((total, valor) => total + valor, 0)
            : ejercicio.uso_mensual.reduce((total, valor) => total + valor, 0);

        if (acc[categoria]) {
            acc[categoria] += uso;
        } else {
            acc[categoria] = uso;
        }

        return acc;
    }, {});

    // Preparar los datos para el gráfico
    const categorias = Object.keys(categoriasUso);
    const usoCategorias = Object.values(categoriasUso);

    return (
        <div
            ref={containerRef}
            className='bg-white p-4 rounded flex flex-col col-span-5 border h-full border-stone-300'
        >
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <TbCategoryFilled className='size-5' />
                Uso por Categoría
            </h3>
            <BarChart
                xAxis={[{
                    scaleType: 'linear', // Cambiar el tipo de escala


                }]}
                yAxis={[{
                    scaleType: 'band',

                    data: categorias, // Colocar las categorías en el eje Y
                    colorMap: {
                        type: "ordinal",
                        values: categorias,
                        colors: ['#1e3a8a', '#f97316', '#84cc16'],
                    },
                }]}
                series={[{
                    data: usoCategorias,
                }]}
                layout='horizontal' // Cambiar la disposición de las barras a horizontal\
                width={containerSize.width * 1}
                height={containerSize.height * 1}
            />
        </div>
    )
}
