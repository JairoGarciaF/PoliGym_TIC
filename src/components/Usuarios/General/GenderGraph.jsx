import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { BiMaleFemale } from "react-icons/bi";

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy - 120} textAnchor="middle" fill='#1e293b' className='text-base'>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                cornerRadius={7}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <text x={cx} y={cy} textAnchor="middle" fill="#333" className='text-base'>{value}</text>
        </g>
    );
};

export const GenderGraph = ({ usuarios }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    // Inicializamos un objeto para contar usuarios por género
    const genderCount = { Masculino: 0, Femenino: 0, Otro: 0 };

    // Contamos los usuarios por género
    usuarios.forEach(persona => {
        if (genderCount[persona.genero] !== undefined) {
            genderCount[persona.genero]++;
        } else {
            genderCount['Otro']++;
        }
    });

    // Creamos el nuevo arreglo para el gráfico circular
    const usersPerGender = [
        { name: 'Masculino', value: genderCount.Masculino },
        { name: 'Femenino', value: genderCount.Femenino },
        { name: 'Otro', value: genderCount.Otro },
    ];

    // Definimos colores para cada segmento
    const COLORS = ['#0369a1', '#ec4899', '#94a3b8'];

    return (
        <div className='bg-white col-span-4 row-span-6 p-4 rounded-xl shadow flex flex-col items-center'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <BiMaleFemale className='size-5' />
                Usuarios por Género
            </h3>
            <div className='h-[calc(100%-28px)] w-full flex items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={usersPerGender}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            outerRadius="60%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {usersPerGender.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            iconSize={10}
                            wrapperStyle={{ fontSize: 14, fontFamily: 'Open Sans' }}
                            formatter={(value, entry) => (
                                <span className='text-slate-800'>{entry.payload.name}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
