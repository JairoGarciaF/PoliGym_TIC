import React from 'react';
import { TbCategoryFilled } from "react-icons/tb";
import { BarChart, Cell, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const GeneralCategoryGraph = ({ data, infoMode }) => {
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
    const chartData = Object.keys(categoriasUso).map((categoria) => ({
        categoria,
        uso: categoriasUso[categoria]
    }));

    const COLORS = ['#1e3a8a', '#f97316', '#84cc16']

    return (
        <div className='bg-white p-4 rounded-xl xl:h-auto h-[40svh] shadow flex flex-col items-end xl:col-span-5'>
            <h3 className='text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium'>
                <TbCategoryFilled className='xl:size-4 size-3' />
                Uso por Categoría
            </h3>

            <div className='flex-1 w-full'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        layout="vertical"
                        data={chartData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" tick={{ fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14 }} />
                        <YAxis
                            tick={{ fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14 }}
                            type="category" dataKey="categoria" width={100} />
                        <Tooltip />
                        <Bar dataKey="uso" barSize={20}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
