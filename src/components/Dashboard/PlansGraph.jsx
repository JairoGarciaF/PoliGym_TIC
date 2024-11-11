import React, { useState } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer, Legend, Cell } from 'recharts';
import { TbChecklist } from "react-icons/tb";
import { TbSum } from "react-icons/tb";

const trainingPlans = [
    {
        id: 1,
        nombre: "Plan Inicial",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan básico para principiantes que introduce los conceptos fundamentales del entrenamiento.",
        usos: 12,
        duracion: 4,  // semanas
        dificultad: "Baja",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 2,
        nombre: "Plan Intermedio",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan para aquellos con algo de experiencia, enfocado en la ganancia muscular y fuerza.",
        usos: 43,
        duracion: 8,  // semanas
        dificultad: "Media",
        oculto: true,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 3,
        nombre: "Plan Avanzado",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan avanzado diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Alta",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 4,
        nombre: "Entrenamiento de fuerza",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan avanzado diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Alta",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 5,
        nombre: "Entrenamiento HIIT",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan medio diseñado para aumentar fuerza y resistencia muscular.",
        usos: 41,
        duracion: 12,  // semanas
        dificultad: "Media",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 6,
        nombre: "Entrenamiento de cuerpo completo",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan básico diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Baja",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    }
];

const mealPlans = [
    {
        id: 1,
        nombre: "Plan Básico de Pérdida de Peso",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan de alimentación diseñado para reducir la ingesta calórica y favorecer la pérdida de peso.",
        usos: 52,
        duracion: 4,  // semanas
        categoria: "Pérdida de Peso",
        oculto: false,
        detalleDias: {
            lunes: {
                desayuno: "Avena con frutas y miel",
                almuerzo: "Ensalada de pollo con aguacate",
                cena: "Pescado a la plancha con verduras al vapor"
            },
            martes: {
                desayuno: "Tostadas integrales con aguacate y huevo",
                almuerzo: "Sopa de verduras y pechuga de pollo",
                cena: "Ensalada de atún con espinacas"
            },
            miércoles: {
                desayuno: "Smoothie verde con espinacas, manzana y avena",
                almuerzo: "Quinoa con vegetales y pollo",
                cena: "Salmón con brócoli al vapor"
            },
            jueves: {
                desayuno: "Tostadas integrales con crema de almendras y plátano",
                almuerzo: "Pechuga de pavo con ensalada mixta",
                cena: "Pechuga de pollo a la parrilla con calabacines"
            },
            viernes: {
                desayuno: "Yogur natural con frutas y nueces",
                almuerzo: "Arroz integral con vegetales y tofu",
                cena: "Tortilla de espinacas con champiñones"
            },
            sábado: {
                desayuno: "Batido de proteínas con leche de almendras y avena",
                almuerzo: "Ensalada César con pechuga de pollo",
                cena: "Filete de ternera con ensalada verde"
            },
            domingo: {
                desayuno: "Pan integral con queso cottage y fresas",
                almuerzo: "Pollo asado con papas y brócoli",
                cena: "Sopa de lentejas y verduras"
            }
        }
    },
    {
        id: 2,
        nombre: "Plan de Ganancia Muscular",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan alto en proteínas y calorías para promover el desarrollo muscular.",
        usos: 22,
        duracion: 6,  // semanas
        categoria: "Volumen",
        oculto: true,
        detalleDias: {
            lunes: {
                desayuno: "Huevos revueltos con jamón y espinacas",
                almuerzo: "Pollo a la parrilla con arroz integral y brócoli",
                cena: "Salmón al horno con quinoa y espárragos"
            },
            martes: {
                desayuno: "Panqueques de avena con frutas y miel",
                almuerzo: "Carne de res con batatas y espinacas",
                cena: "Ensalada de atún con aguacate y pan integral"
            },
            miércoles: {
                desayuno: "Batido de proteínas con plátano y avena",
                almuerzo: "Pechuga de pollo con arroz integral y verduras",
                cena: "Filete de ternera con ensalada de garbanzos"
            },
            jueves: {
                desayuno: "Tostadas de pan integral con mantequilla de maní y plátano",
                almuerzo: "Ensalada de quinoa con pollo y espárragos",
                cena: "Pescado a la plancha con papas asadas"
            },
            viernes: {
                desayuno: "Avena con nueces, pasas y proteína en polvo",
                almuerzo: "Pechuga de pavo con arroz y espinacas",
                cena: "Salmón a la parrilla con batatas"
            },
            sábado: {
                desayuno: "Tortilla de huevo con jamón y queso",
                almuerzo: "Lomo de cerdo con puré de papas y brócoli",
                cena: "Pollo al horno con ensalada mixta"
            },
            domingo: {
                desayuno: "Smoothie de proteína con frutos rojos",
                almuerzo: "Pollo a la parrilla con arroz y ensalada",
                cena: "Lasaña de carne con espinacas"
            }
        }
    },
    {
        id: 3,
        nombre: "Plan de Mantenimiento",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan balanceado para mantener el peso y llevar una alimentación saludable.",
        usos: 14,
        duracion: 8,  // semanas
        categoria: 'Definición',
        oculto: false,
        detalleDias: {
            lunes: {
                desayuno: "Batido de frutas con yogur y avena",
                almuerzo: "Sándwich de pollo con aguacate y ensalada",
                cena: "Pescado al horno con verduras"
            },
            martes: {
                desayuno: "Tostadas de aguacate con huevo",
                almuerzo: "Ensalada de atún con vegetales",
                cena: "Pollo asado con papas al horno"
            },
            miércoles: {
                desayuno: "Avena con frutas y nueces",
                almuerzo: "Wrap de pavo con vegetales",
                cena: "Salmón a la parrilla con espinacas"
            },
            jueves: {
                desayuno: "Tortilla de espinacas y champiñones",
                almuerzo: "Quinoa con pollo y ensalada",
                cena: "Pechuga de pavo con brócoli al vapor"
            },
            viernes: {
                desayuno: "Yogur natural con frutas y granola",
                almuerzo: "Pasta integral con salsa de tomate y pavo",
                cena: "Ensalada de pollo con aguacate"
            },
            sábado: {
                desayuno: "Tostadas integrales con mantequilla de maní",
                almuerzo: "Arroz con pollo y vegetales",
                cena: "Tacos de pescado con ensalada"
            },
            domingo: {
                desayuno: "Batido de frutas con avena",
                almuerzo: "Salmón a la plancha con quinoa",
                cena: "Pollo a la parrilla con ensalada verde"
            }
        }
    }
];




const generatePopularChartData = (trainingPlans, mealPlans) => {
    //sorted plans and oculto=false
    const plans = [...trainingPlans, ...mealPlans].filter(plan => !plan.oculto).sort((a, b) => b.usos - a.usos);
    const topPlans = plans.slice(0, 5);
    const otherTotal = plans.slice(5).reduce((sum, plan) => sum + plan.usos, 0);

    const popularChartData = topPlans.map((plan, index) => ({
        id: index,
        value: plan.usos,
        label: plan.nombre,
    }));

    if (otherTotal > 0) {
        popularChartData.push({
            id: topPlans.length,
            value: otherTotal,
            label: "Otros",
        });
    }

    return popularChartData;

}

const colors = ['#365314', '#006400', '#38B000', '#9EF01A', '#CCFF33', '#cbd5e1'];

const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;

    return (
        <g >
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

export const PlansGraph = () => {

    const [activeIndex, setActiveIndex] = useState(0);


    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    const plansData = generatePopularChartData(trainingPlans, mealPlans);


    return (
        <div className='bg-white xl:col-span-1 flex flex-col xl:h-auto h-[40svh] xl:row-span-1 p-4 rounded-xl shadow'>
            <div className='flex justify-between items-center'>

                <h3 className='text-azul-marino-500 xl:text-base text-sm flex items-center gap-2 font-medium'>
                    <TbChecklist className='xl:size-4 size-3' />
                    Planes Populares
                </h3>

                <h3 className='text-azul-marino-500 flex xl:text-sm text-xs items-center gap-2 font-medium'>
                    <TbSum className='xl:size-4 size-3' />
                    Total Planes: {mealPlans.length + trainingPlans.length}
                </h3>
            </div>

            <div className='flex-1 flex items-center justify-center'>

                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={plansData}
                            cx="50%"
                            cy="55%"
                            innerRadius="35%"
                            outerRadius="70%"
                            paddingAngle={2}
                            cornerRadius={7}
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {plansData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

            </div>
        </div>
    )
}
