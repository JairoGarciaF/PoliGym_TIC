import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from 'recharts';
import { BsFire } from "react-icons/bs";
import { TbSum } from "react-icons/tb";

const colors = ['#9d0208', '#d00000', '#e85d04', '#faa307', '#ffea00', '#cbd5e1']

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy * 0.15} textAnchor="middle" fill='#1e293b' className='sm:text-base text-sm'>
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
            <text x={cx} y={cy} textAnchor="middle" fill="#333" className='sm:text-base text-sm'>{value}</text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" className='sm:text-sm text-xs'>
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
            className='flex flex-col bg-white xl:h-auto h-[40svh] p-4 rounded-xl shadow xl:col-span-5  '
        >
            <div className='flex justify-between items-center'>

                <h3 className='text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium'>
                    <BsFire className='xl:size-4 size-3' />
                    Ejercicios Populares
                </h3>
                <h3 className='text-azul-marino-500 xl:text-sm text-xs flex items-center gap-2 font-medium'>
                    <TbSum className='xl:size-4 size-3' />
                    Total Ejercicios: {total}
                </h3>
            </div>

            <div className='flex items-center justify-center flex-1'>
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

                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
