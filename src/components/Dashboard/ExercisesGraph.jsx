import React, { useState } from 'react'
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
import { FaDumbbell } from 'react-icons/fa';
import { TbSum } from "react-icons/tb";

const ejercicios = [
    {
        "id": 1,
        "url": "https://example.com/exercise1",
        "nombre": "Press de banca",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de press de banca",
        "musculos": ["chest", "triceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,  // Uso semanal por género, la suma de todos los generos debe ser igual al uso semanal total (65)
                "mensual": 85   // Uso mensual por género, la suma de todos los generos debe ser igual al uso mensual del mes actual(185)
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12], // Uso del ejercicio por día de la semana (lunes a domingo). EL total de la semana es 65
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0] // Uso del ejercicio por cada mes (ene a dic). 
    },
    {
        "id": 2,
        "url": "https://example.com/exercise2",
        "nombre": "Sentadilla",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de prensa de piernas",
        "musculos": ["quads", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 3,
        "url": "https://example.com/exercise3",
        "nombre": "Deadlift",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de pesas",
        "musculos": ["lowerback", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 4,
        "url": "https://example.com/exercise4",
        "nombre": "Jumping Jacks",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["calves", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 5,
        "url": "https://example.com/exercise5",
        "nombre": "Yoga",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Pelota de yoga",
        "musculos": ["hamstrings", "lowerback"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 6,
        "url": "https://example.com/exercise6",
        "nombre": "Dominadas",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de dominadas",
        "musculos": ["lats", "biceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 7,
        "url": "https://example.com/exercise7",
        "nombre": "Estocadas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Ninguno",
        "musculos": ["quads", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    }
];

const calculateTotals = (ejercicios) => {
    return ejercicios.map(ejercicio => ({
        ...ejercicio,
        uso_semanal_total: ejercicio.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: ejercicio.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};


const generatePopularChartData = (ejercicios, infoMode) => {
    const sortedEjercicios = ejercicios.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );
    const topEjercicios = sortedEjercicios.slice(0, 5);
    const otherTotal = sortedEjercicios.slice(5).reduce((sum, exercise) =>
        infoMode === 'Semanal' ? sum + exercise.uso_semanal_total : sum + exercise.uso_mensual_total, 0
    );

    const popularChartData = topEjercicios.map((exercise, index) => ({
        id: index,
        value: infoMode === 'Semanal' ? exercise.uso_semanal_total : exercise.uso_mensual_total,
        label: exercise.nombre,
    }));

    if (otherTotal > 0) {
        popularChartData.push({
            id: topEjercicios.length,
            value: otherTotal,
            label: "Otros",
        });
    }

    return popularChartData;
};

const colors = ['#92400e', '#dc2626', '#fef08a', '#fb923c', '#facc15', '#cbd5e1']

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g>
            <text x={cx} y={cy - 120} textAnchor="middle" fill='#1e293b' className='text-base'>
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

export const ExercisesGraph = ({ infoMode }) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const ejerciciosData = generatePopularChartData(calculateTotals(ejercicios), infoMode);


    return (
        <div className='bg-white col-span-4 row-span-6 p-4 rounded-xl shadow'>
            <div className='flex justify-between'>

                <h3 className='text-azul-marino-500 text-lg flex items-center gap-2 font-medium'>
                    <FaDumbbell className='size-4' />
                    Ejercicios Populares
                </h3>
                <h3 className='text-azul-marino-500   flex self-start items-center gap-2 font-medium'>
                    <TbSum className='size-4' />
                    Total: {ejercicios.length}
                </h3>
            </div>



            <div className='h-[calc(100%-28px)]  flex  items-center justify-center'>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={ejerciciosData}
                            cx="50%"
                            cy="55%"
                            innerRadius="35%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {ejerciciosData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
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
                    </PieChart>
                </ResponsiveContainer>

            </div>
        </div >
    );
};
