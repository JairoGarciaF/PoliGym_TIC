import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
import { FaCalendarAlt } from "react-icons/fa";
import { TbSum } from "react-icons/tb";

const routinesStats = [
    {
        id: 1,
        nombre: 'Rutina de Fuerza',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['chest', 'lowerBack', 'quads'],
        uso_semanal: [10, 12, 8, 10, 5, 8, 12], // Uso de la rutina por día de la semana (lunes a domingo). EL total de la semana es 65
        uso_mensual: [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0], // Uso de la rutina por cada mes (ene a dic). 
        ejercicios: [
            {
                id: 6,
                nombre: 'Press de Banca',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 7,
                nombre: 'Peso Muerto',
                series: 4,
                repeticiones: 6,
                tiempoDescanso: 120
            },
            {
                id: 8,
                nombre: 'Sentadillas',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 2,
        nombre: 'Rutina de Hipertrofia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: true,
        musculos: ['biceps', 'chest', 'shoulders'],
        uso_semanal: [5, 8, 10, 12, 15, 10, 8], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [120, 130, 140, 135, 150, 160, 155, 170, 180, 190, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 9,
                nombre: 'Curl de Bíceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 10,
                nombre: 'Press Militar',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 11,
                nombre: 'Fondos en Paralelas',
                series: 3,
                repeticiones: 15,
                tiempoDescanso: 60
            }
        ]
    },
    {
        id: 3,
        nombre: 'Rutina de Resistencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Baja',
        oculto: false,
        musculos: ['quads', 'abdominals'],
        uso_semanal: [8, 10, 12, 15, 10, 8, 5], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 12,
                nombre: 'Zancadas',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 13,
                nombre: 'Elevaciones de Piernas',
                series: 4,
                repeticiones: 15,
                tiempoDescanso: 45
            }
        ]
    },
    {
        id: 4,
        nombre: 'Rutina de Potencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: true,
        musculos: ['traps', 'shoulders', 'quads'],
        uso_semanal: [12, 15, 10, 8, 5, 8, 10], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [150, 160, 155, 170, 180, 190, 200, 210, 220, 230, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 14,
                nombre: 'Arranque con Barra',
                series: 5,
                repeticiones: 5,
                tiempoDescanso: 120
            },
            {
                id: 15,
                nombre: 'Press de Hombro con Mancuernas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 16,
                nombre: 'Dominadas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 5,
        nombre: 'Rutina de Volumen',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: false,
        musculos: ['biceps', 'quads'],
        uso_semanal: [10, 8, 5, 8, 10, 12, 15], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [130, 140, 150, 160, 155, 170, 180, 190, 200, 210, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 17,
                nombre: 'Sentadilla Hack',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 18,
                nombre: 'Press Francés',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 19,
                nombre: 'Extensiones de Cuádriceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            }
        ]
    }
];

const calculateTotals = (routinesStats) => {
    return routinesStats.map(rutina => ({
        ...rutina,
        uso_semanal_total: rutina.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: rutina.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};

const generatePopularChartData = (routinesStats, infoMode) => {
    const sortedRoutines = routinesStats
        .filter(routine => !routine.oculto)
        .sort((a, b) =>
            infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
        );
    const top = sortedRoutines.slice(0, 5);
    const otherTotal = sortedRoutines.slice(5).reduce((sum, routine) =>
        infoMode === 'Semanal' ? sum + routine.uso_semanal_total : sum + routine.uso_mensual_total, 0
    );

    const popularChartData = top.map((routine, index) => ({
        id: index,
        value: infoMode === 'Semanal' ? routine.uso_semanal_total : routine.uso_mensual_total,
        label: routine.nombre,
    }));

    if (otherTotal > 0) {
        popularChartData.push({
            id: top.length,
            value: otherTotal,
            label: "Otras",
        });
    }

    return popularChartData;
};

const colors = ['#0c4a6e', '#0ea5e9', '#a5f3fc', '#1e40af', '#7dd3fc', '#cbd5e1'];

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy * 0.2} textAnchor="middle" fill='#1e293b' className='sm:text-base text-sm'>
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

export const RoutinesGraph = ({ infoMode }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showLegend, setShowLegend] = useState(true);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const routinesData = generatePopularChartData(calculateTotals(routinesStats), infoMode);

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
        <div className='bg-white xl:col-span-1 flex flex-col xl:row-span-1 p-4 rounded-xl shadow'>
            <div className='flex justify-between items-center'>
                <h3 className='text-azul-marino-500 xl:text-lg md:text-base text-sm flex items-center gap-2 font-medium'>
                    <FaCalendarAlt className='xl:size-5 md:size-4 size-3' />
                    Rutinas Populares
                </h3>
                <h3 className='text-azul-marino-500 flex items-center gap-2 xl:text-sm text-xs font-medium'>
                    <TbSum className='xl:size-4 size-3' />
                    Total Rutinas: {routinesStats.length}
                </h3>
            </div>
            <div className='flex-1 flex items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={routinesData}
                            cx="50%"
                            cy="55%"
                            innerRadius="35%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {routinesData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        {showLegend && (
                            <Legend
                                layout="horizontal"
                                align="bottom"
                                verticalAlign="bottom"
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
