import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
import { BsFire } from "react-icons/bs";
import { TbSum } from "react-icons/tb";

const colors = ['#92400e', '#dc2626', '#fef08a', '#fb923c', '#facc15', '#cbd5e1']

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy - 135} textAnchor="middle" fill='#1e293b' className='text-base'>
                {payload.label}
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
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" className='text-sm'>
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        </g >
    );
};

export const GeneralPopularGraph = ({ data, total }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };


    return (
        <div
            className='bg-white p-4 rounded-xl shadow col-span-5  h-full '
        >
            <div className='flex justify-between'>

                <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                    <BsFire className='size-5' />
                    Ejercicios Populares
                </h3>
                <h3 className='text-azul-marino-500   flex self-start items-center gap-2 font-medium'>
                    <TbSum className='size-4' />
                    Total: {total}
                </h3>
            </div>

            <div className='flex items-center justify-center h-[calc(100%-24px-4px)]'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="55%"
                            innerRadius="40%"
                            outerRadius="75%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            iconSize={10}
                            wrapperStyle={{ fontSize: 14, fontFamily: 'Open Sans' }}
                            formatter={(value, entry) => (
                                <span className='text-slate-800'>{entry.payload.label}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
