import React from 'react';
import { IoMaleFemale } from "react-icons/io5";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generatePopularChartData = (ejercicios, infoMode) => {
    const sortedEjercicios = ejercicios.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );
    const topEjercicios = sortedEjercicios.slice(0, 5);
    const otherTotal = sortedEjercicios.slice(5).reduce((sum, exercise) =>
        infoMode === 'Semanal' ? sum + exercise.uso_semanal_total : sum + exercise.uso_mensual_total, 0
    );

    const popularChartData = topEjercicios.map(exercise => ({
        nombre: exercise.nombre,
        Masculino: exercise.uso_genero.masculino[infoMode.toLowerCase()],
        Femenino: exercise.uso_genero.femenino[infoMode.toLowerCase()],
        Otro: exercise.uso_genero.otro[infoMode.toLowerCase()],
    }));



    return popularChartData;
};

export const GeneralGenderGraph = ({ data, infoMode }) => {
    const chartData = generatePopularChartData(data, infoMode);

    return (
        <div className='p-4 bg-white xl:col-span-7 xl:h-auto h-[40svh] rounded-xl flex flex-col shadow'>
            <h3 className='text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium'>
                <IoMaleFemale className='xl:size-4 size-3' />
                Uso por Género
            </h3>
            <div className='flex-1 w-full'>

                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14, fontFamily: 'Open Sans' }} />
                        <Bar dataKey="Masculino" fill="#0369a1" />
                        <Bar dataKey="Femenino" fill="#ec4899" />
                        <Bar dataKey="Otro" fill="#94a3b8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
