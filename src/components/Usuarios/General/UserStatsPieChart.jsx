import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FaChartPie } from "react-icons/fa";

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
        <g>
            <text x={cx} y={cy * 0.2} textAnchor="middle" fill='#1e293b' className='text-base'>
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
            <text x={cx} y={cy} textAnchor="middle" fill="#333" className='text-lg'>{value}</text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" className='text-sm'> {`${(percent * 100).toFixed(2)}%`} </text>
        </g>
    );
};

export const UserStatsPieChart = ({ usuarios }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState("Género");

    const categories = [
        { label: "Género", options: ["Masculino", "Femenino", "Otro"], field: "genero", colors: ['#0369a1', '#ec4899', '#94a3b8'] },
        { label: "Tipo", options: ["Estudiante", "Profesor", "Administración"], field: "tipo", colors: ['#03346E', '#B8001F', '#E2E2B6'] },
        { label: "Horario", options: ["Mañana", "Tarde", "Noche"], field: "horario", colors: ['#06b6d4', '#facc15', '#172554'] },
        { label: "Objetivo", options: ["Ganar Músculo", "Bajar de Peso", "Mantenerse en Forma"], field: "objetivo", colors: ['#006769', '#E6FF94', '#40A578'] },
        { label: "Estado Físico", options: ["Principiante", "Intermedio", "Avanzado"], field: "estadoFisico", colors: ['#B9E5E8', '#7AB2D3', '#4A628A'] }
    ];

    const currentCategory = categories.find(cat => cat.label === selectedCategory);

    const filteredUsers = usuarios.filter(user => !user.oculto);

    const data = currentCategory.options.map(option => ({
        name: option,
        value: filteredUsers.filter(user => user[currentCategory.field] === option).length
    }));

    const onPieEnter = (_, index) => setActiveIndex(index);

    return (
        <div className='bg-white col-span-6 row-span-10 p-4 rounded-xl shadow flex flex-col items-center'>
            <h3 className='text-azul-marino-500 flex self-start items-center gap-2 font-medium'>
                <FaChartPie className='size-5' />
                Usuarios por {selectedCategory}
            </h3>

            <nav className="flex justify-start  open-sans border-b w-full">
                {categories.map(category => (
                    <button
                        key={category.label}
                        onClick={() => setSelectedCategory(category.label)}
                        className={`p-2 text-xs transition-colors 
                            ${selectedCategory === category.label
                                ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                : 'text-slate-500 hover:text-azul-marino-300'}`}
                    >
                        {category.label}
                    </button>
                ))}
            </nav>

            <div className='h-[calc(100%-24px-35px)] w-full flex items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="55%"
                            innerRadius="40%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={currentCategory.colors[index % currentCategory.colors.length]} />
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
