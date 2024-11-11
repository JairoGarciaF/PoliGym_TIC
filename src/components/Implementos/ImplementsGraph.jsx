import React, { useState, useEffect } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
import { BsFire } from "react-icons/bs";
import { TbSum } from "react-icons/tb";

const colors = ['#22577A', '#38A3A5', '#57CC99', '#80ED99', '#C7F9CC', '#cbd5e1'];

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



export const ImplementsGraph = ({ data, total }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLegend, setShowLegend] = useState(true);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const handleResize = () => {
            // Oculta la leyenda si el ancho es menor a 640px (equivalente a `sm` en Tailwind)
            setShowLegend(window.innerWidth >= 640);
        };

        handleResize(); // Verifica el tamaño inicial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div
            className='flex flex-col bg-white xl:h-auto h-[40svh] p-4 xl:col-span-1 rounded-xl shadow '
        >
            <div className='flex justify-between items-center'>
                <h3 className='text-azul-marino-500 xl:text-base text-sm  mb-1 flex self-start items-center gap-2 font-medium'>
                    <BsFire className='xl:size-4 size-3' />
                    Implementos Populares
                </h3>

                <h3 className='text-azul-marino-500   flex xl:text-sm text-xs items-center gap-2 font-medium'>
                    <TbSum className='xl:size-4 size-3' />
                    Total Implementos: {total}
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
                            outerRadius="80%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        {showLegend && (
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
                        )}
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
