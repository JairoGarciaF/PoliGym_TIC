import React, { useRef, useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { IoMaleFemale } from "react-icons/io5";

const colors = ['#0369a1', '#ec4899', '#94a3b8'];

// Función para renderizar el sector activo
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
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#999" className='text-sm'>{`${(percent * 100).toFixed(2)}%`}</text>
        </g>
    );
};

export const DetallesGenderGraph = ({ ejercicio, infoMode }) => {
    const data = ejercicio.uso_genero;
    const [activeIndex, setActiveIndex] = useState(0);  // Estado para el sector activo
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

    const chartData = infoMode === 'Semanal'
        ? [
            { name: 'Masculino', value: data.masculino.semanal },
            { name: 'Femenino', value: data.femenino.semanal },
            { name: 'Otro', value: data.otro.semanal }
        ]
        : [
            { name: 'Masculino', value: data.masculino.mensual },
            { name: 'Femenino', value: data.femenino.mensual },
            { name: 'Otro', value: data.otro.mensual }
        ];

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    return (
        <div ref={containerRef} className='bg-white p-4 rounded-xl shadow col-span-5 row-span-1'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                <IoMaleFemale className='size-5' />
                Uso por Género
            </h3>
            <div className='flex items-center justify-center h-[calc(100%-24px-4px)]'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={containerSize.width * 0.9} height={containerSize.height * 0.9}>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="30%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {chartData.map((entry, index) => (
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
                                <span className='text-slate-800'>{entry.payload.name}</span>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
