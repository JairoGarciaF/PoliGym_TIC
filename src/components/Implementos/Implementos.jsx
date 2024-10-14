import React from 'react';
import { MachinesGraph } from './MachinesGraph';
import { ImplementsGraph } from './ImplementsGraph';
import { ImplementsTable } from './ImplementsTable';

const implementos = [
    {
        "nombre": "Máquina de press de banca",
        "tipo": "máquina",
        "uso_semanal": 15,
        "uso_mensual": 60,
        "uso_total": 75,
        "detalles": {
            "descripcion": "Ideal para entrenar pecho y tríceps.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Juan Pérez",
                    "fecha_uso": "2024-10-10"
                },
                {
                    "usuario": "María López",
                    "fecha_uso": "2024-10-09"
                }
            ]
        }
    },
    {
        "nombre": "Máquina de remo",
        "tipo": "máquina",
        "uso_semanal": 10,
        "uso_mensual": 40,
        "uso_total": 50,
        "detalles": {
            "descripcion": "Excelente para entrenamiento de cuerpo completo.",
            "categoria": "Cardio",
            "ultimos_usuarios": [
                {
                    "usuario": "Pedro Martínez",
                    "fecha_uso": "2024-10-08"
                },
                {
                    "usuario": "Ana Torres",
                    "fecha_uso": "2024-10-07"
                }
            ]
        }
    },
    {
        "nombre": "Máquina de prensa de piernas",
        "tipo": "máquina",
        "uso_semanal": 8,
        "uso_mensual": 32,
        "uso_total": 40,
        "detalles": {
            "descripcion": "Ideal para fortalecer las piernas.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Carlos Sánchez",
                    "fecha_uso": "2024-10-06"
                },
                {
                    "usuario": "Laura Jiménez",
                    "fecha_uso": "2024-10-05"
                }
            ]
        }
    },
    {
        "nombre": "Bicicleta estática",
        "tipo": "máquina",
        "uso_semanal": 12,
        "uso_mensual": 50,
        "uso_total": 62,
        "detalles": {
            "descripcion": "Perfecta para cardio y quema de grasa.",
            "categoria": "Cardio",
            "ultimos_usuarios": [
                {
                    "usuario": "Jorge Pérez",
                    "fecha_uso": "2024-10-04"
                },
                {
                    "usuario": "Sofia García",
                    "fecha_uso": "2024-10-03"
                }
            ]
        }
    },
    {
        "nombre": "Máquina de poleas",
        "tipo": "máquina",
        "uso_semanal": 10,
        "uso_mensual": 40,
        "uso_total": 50,
        "detalles": {
            "descripcion": "Versátil para entrenamiento de fuerza y resistencia.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Luis Hernández",
                    "fecha_uso": "2024-10-02"
                },
                {
                    "usuario": "Elena Gómez",
                    "fecha_uso": "2024-10-01"
                }
            ]
        }
    },
    {
        "nombre": "Cinta de correr",
        "tipo": "máquina",
        "uso_semanal": 20,
        "uso_mensual": 80,
        "uso_total": 100,
        "detalles": {
            "descripcion": "Perfecta para correr y caminar en casa.",
            "categoria": "Cardio",
            "ultimos_usuarios": [
                {
                    "usuario": "Miguel Rodríguez",
                    "fecha_uso": "2024-09-30"
                },
                {
                    "usuario": "Carmen López",
                    "fecha_uso": "2024-09-29"
                }
            ]
        }
    },
    {
        "nombre": "Mancuernas",
        "tipo": "implemento",
        "uso_semanal": 25,
        "uso_mensual": 100,
        "uso_total": 125,
        "detalles": {
            "descripcion": "Perfectas para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Raúl Martínez",
                    "fecha_uso": "2024-09-28"
                },
                {
                    "usuario": "Lorena Sánchez",
                    "fecha_uso": "2024-09-27"
                }
            ]
        }
    },
    {
        "nombre": "Barra de pesas",
        "tipo": "implemento",
        "uso_semanal": 20,
        "uso_mensual": 80,
        "uso_total": 100,
        "detalles": {
            "descripcion": "Ideal para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Javier Pérez",
                    "fecha_uso": "2024-09-26"
                },
                {
                    "usuario": "María García",
                    "fecha_uso": "2024-09-25"
                }
            ]
        }
    },
    {
        "nombre": "Pelota de yoga",
        "tipo": "implemento",
        "uso_semanal": 15,
        "uso_mensual": 60,
        "uso_total": 75,
        "detalles": {
            "descripcion": "Perfecta para ejercicios de equilibrio y flexibilidad.",
            "categoria": "Flexibilidad",
            "ultimos_usuarios": [
                {
                    "usuario": "Pedro Sánchez",
                    "fecha_uso": "2024-09-24"
                },
                {
                    "usuario": "Ana Martínez",
                    "fecha_uso": "2024-09-23"
                }
            ]
        }
    },
    {
        "nombre": "Banda elástica",
        "tipo": "implemento",
        "uso_semanal": 10,
        "uso_mensual": 40,
        "uso_total": 50,
        "detalles": {
            "descripcion": "Ideal para ejercicios de resistencia y tonificación.",
            "categoria": "Fuerza",
            "ultimos_usuarios": [
                {
                    "usuario": "Carlos Pérez",
                    "fecha_uso": "2024-09-22"
                },
                {
                    "usuario": "Laura Martínez",
                    "fecha_uso": "2024-09-21"
                }
            ]
        }
    },
]

const generatePieChartData = (implementos) => {
    // Ordenar los implementos por uso_total de mayor a menor
    const sortedImplementos = implementos.sort((a, b) => b.uso_total - a.uso_total);

    // Obtener las 5 máquinas más usadas
    const topMachines = sortedImplementos.slice(0, 5);

    // Calcular el total de las máquinas restantes
    const otherTotal = sortedImplementos.slice(5).reduce((sum, machine) => sum + machine.uso_total, 0);

    // Crear el arreglo para el PieChart
    const pieChartData = topMachines.map((machine, index) => ({
        id: index,
        value: machine.uso_total,
        label: machine.nombre,
    }));

    // Añadir la categoría de "Otras"
    if (otherTotal > 0) {
        pieChartData.push({
            id: topMachines.length,
            value: otherTotal,
            label: "Otras",
        });
    }

    return pieChartData;
};

const pieChartData = generatePieChartData(implementos);


export const Implementos = () => {
    return (
        <div className='bg-white rounded-lg pb-4 shadow open-sans h-full flex flex-col p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500 text-3xl font-semibold'>Implementos</h1>
            <div className='grid grid-rows-2 h-[calc(100%-36px)]'>
                <div className='row-span-1 flex flex-col'>
                    <nav className="flex justify-start border-b  ">
                        <button
                            className='px-4 py-2 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                        >
                            General
                        </button>
                    </nav>
                    <div className='grid h-[calc(100%-38px)] gap-4 py-4 grid-cols-2'>
                        <ImplementsGraph data={pieChartData} />
                        <ImplementsTable />
                    </div>
                </div>
                <div className='row-span-1 flex flex-col'>
                    <MachinesGraph />

                </div>

            </div>
        </div>
    )
}
