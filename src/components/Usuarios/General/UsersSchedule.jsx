import React, { useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { FaClock } from "react-icons/fa";

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
            <text x={cx} y={cy} textAnchor="middle" fill="#333" className='text-lg'>{value}</text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" className='text-sm'> {`${(percent * 100).toFixed(2)}%`} </text>
        </g>
    );
};

export const UsersSchedule = ({ usuarios }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => setActiveIndex(index);

    const scheduleCount = { Mañana: 0, Tarde: 0, Noche: 0 };

    const filteredUsers = usuarios.filter(user => !user.oculto);
    filteredUsers.forEach(user => {
        scheduleCount[user.horario] = (scheduleCount[user.horario] || 0) + 1;
    });

    const data = Object.entries(scheduleCount).map(([name, value]) => ({ name, value }));

    const COLORS = ['#FFD700', '#FF6347', '#4682B4'];

    return (
        <div className='bg-white col-span-4 row-span-6 p-4 rounded-xl shadow flex flex-col items-center'>
            <h3 className='text-azul-marino-500 flex self-start items-center gap-2 font-medium'>
                <FaClock className='size-5' /> Horarios de Usuarios
            </h3>
            <div className='h-[calc(100%-28px)] w-full flex items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius="35%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
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
