import React from 'react';
import { MachinesGraph } from './MachinesGraph';
import { ImplementsGraph } from './ImplementsGraph';
import { ImplementsTable } from './ImplementsTable';

const implementos = [
    {
        "nombre": "Máquina de press de banca",
        "tipo": "Máquina",
        "uso_semanal_total": 15,
        "uso_mensual_total": 60,
        "uso_total": 75,
        "uso_diario": [2, 3, 2, 4, 1, 1, 2],
        "uso_mensual": [5, 6, 5, 4, 6, 7, 7, 5, 6, 6, 8, 8],
        "detalles": {
            "descripcion": "Ideal para entrenar pecho y tríceps.",
            "categoria": "Fuerza",
            "dificultad": "Intermedia"
        }
    },
    {
        "nombre": "Máquina de remo",
        "tipo": "Máquina",
        "uso_semanal_total": 10,
        "uso_mensual_total": 40,
        "uso_total": 50,
        "uso_diario": [1, 2, 3, 1, 1, 1, 1],
        "uso_mensual": [3, 4, 4, 5, 4, 3, 5, 3, 3, 4, 4, 3],
        "detalles": {
            "descripcion": "Excelente para entrenamiento de cuerpo completo.",
            "categoria": "Cardio",
            "dificultad": "Difícil"
        }
    },
    {
        "nombre": "Máquina de prensa de piernas",
        "tipo": "Máquina",
        "uso_semanal_total": 8,
        "uso_mensual_total": 32,
        "uso_total": 40,
        "uso_diario": [1, 1, 1, 2, 1, 1, 1],
        "uso_mensual": [2, 3, 2, 3, 2, 4, 4, 3, 4, 3, 3, 2],
        "detalles": {
            "descripcion": "Ideal para fortalecer las piernas.",
            "categoria": "Fuerza",
            "dificultad": "Intermedia"
        }
    },
    {
        "nombre": "Bicicleta estática",
        "tipo": "Máquina",
        "uso_semanal_total": 12,
        "uso_mensual_total": 50,
        "uso_total": 62,
        "uso_diario": [2, 2, 2, 3, 2, 1, 0],
        "uso_mensual": [4, 5, 5, 4, 5, 6, 5, 4, 5, 4, 5, 4],
        "detalles": {
            "descripcion": "Perfecta para cardio y quema de grasa.",
            "categoria": "Cardio",
            "dificultad": "Principiante"
        }
    },
    {
        "nombre": "Máquina de poleas",
        "tipo": "Máquina",
        "uso_semanal_total": 10,
        "uso_mensual_total": 40,
        "uso_total": 50,
        "uso_diario": [2, 1, 1, 2, 1, 1, 2],
        "uso_mensual": [3, 4, 3, 3, 3, 3, 4, 4, 3, 4, 3, 4],
        "detalles": {
            "descripcion": "Versátil para entrenamiento de fuerza y resistencia.",
            "categoria": "Fuerza",
            "dificultad": "Intermedia"
        }
    },
    {
        "nombre": "Cinta de correr",
        "tipo": "Máquina",
        "uso_semanal_total": 20,
        "uso_mensual_total": 80,
        "uso_total": 100,
        "uso_diario": [4, 4, 4, 4, 2, 1, 1],
        "uso_mensual": [6, 8, 6, 7, 6, 8, 7, 6, 7, 6, 7, 6],
        "detalles": {
            "descripcion": "Perfecta para correr y caminar en casa.",
            "categoria": "Cardio",
            "dificultad": "Principiante"
        }
    },
    {
        "nombre": "Mancuernas",
        "tipo": "Implemento",
        "uso_semanal_total": 25,
        "uso_mensual_total": 100,
        "uso_total": 125,
        "uso_diario": [5, 5, 5, 5, 3, 2, 2],
        "uso_mensual": [9, 10, 10, 8, 9, 9, 10, 9, 8, 10, 9, 10],
        "detalles": {
            "descripcion": "Perfectas para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "dificultad": "Intermedia"
        }
    },
    {
        "nombre": "Barra de pesas",
        "tipo": "Implemento",
        "uso_semanal_total": 20,
        "uso_mensual_total": 80,
        "uso_total": 100,
        "uso_diario": [3, 4, 4, 4, 2, 1, 2],
        "uso_mensual": [6, 8, 6, 7, 7, 7, 6, 7, 7, 8, 8, 7],
        "detalles": {
            "descripcion": "Ideal para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "dificultad": "Intermedia"
        }
    },
    {
        "nombre": "Pelota de yoga",
        "tipo": "Implemento",
        "uso_semanal_total": 15,
        "uso_mensual_total": 60,
        "uso_total": 75,
        "uso_diario": [2, 3, 2, 4, 1, 1, 2],
        "uso_mensual": [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        "detalles": {
            "descripcion": "Perfecta para ejercicios de equilibrio y flexibilidad.",
            "categoria": "Flexibilidad",
            "dificultad": "Principiante"
        }
    },
    {
        "nombre": "Banda elástica",
        "tipo": "Implemento",
        "uso_semanal_total": 10,
        "uso_mensual_total": 40,
        "uso_total": 50,
        "uso_diario": [1, 2, 1, 2, 1, 1, 1],
        "uso_mensual": [3, 4, 3, 4, 4, 3, 3, 4, 3, 3, 4, 3],
        "detalles": {
            "descripcion": "Ideal para ejercicios de resistencia y tonificación.",
            "categoria": "Fuerza",
            "dificultad": "Principiante"
        }
    },
];



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

const generateTableData = (implementos) => {
    // Ordenar los implementos por uso_total de mayor a menor (opcional si quieres que se ordenen igual que el gráfico)
    const sortedImplementos = implementos.sort((a, b) => b.uso_total - a.uso_total);

    // Crear el arreglo de datos para la tabla
    const tableData = sortedImplementos.map((implemento) => ({
        nombre: implemento.nombre,
        tipo: implemento.tipo,
        uso_semanal_total: implemento.uso_semanal_total,
        uso_mensual_total: implemento.uso_mensual_total,
    }));

    return tableData;
};

// Ejemplo de uso
const tableData = generateTableData(implementos);


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
                    <div className='grid h-[calc(100%-38px)] grid-rows-1 gap-4 py-4 grid-cols-2'>
                        <ImplementsGraph data={pieChartData} />
                        <ImplementsTable data={tableData} />
                    </div>
                </div>
                <div className='row-span-1'>
                    <nav className="flex justify-start border-b  ">
                        <button
                            className='px-4 py-2 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                        >
                            Detalles
                        </button>
                    </nav>
                    <MachinesGraph data={implementos} />

                </div>

            </div>
        </div>
    )
}
