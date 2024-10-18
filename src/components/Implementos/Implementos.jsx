import React, { useState } from 'react';
import { MachinesGraph } from './MachinesGraph';
import { ImplementsGraph } from './ImplementsGraph';
import { ImplementsTable } from './ImplementsTable';

const implementos = [
    {
        "nombre": "Máquina de press de banca",
        "tipo": "Máquina",
        "uso_semanal": [2, 3, 2, 4, 1, 1, 2],
        "uso_mensual": [35, 26, 35, 24, 36, 27, 37, 25, 36, 26, 0, 0],
        "detalles": {
            "descripcion": "Ideal para entrenar pecho y tríceps.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina de remo",
        "tipo": "Máquina",
        "uso_semanal": [1, 2, 3, 1, 1, 1, 1],
        "uso_mensual": [13, 14, 24, 25, 14, 23, 15, 23, 13, 14, 0, 0],
        "detalles": {
            "descripcion": "Excelente para entrenamiento de cuerpo completo.",
            "categoria": "Cardio",
            "dificultad": "Alta"
        }
    },
    {
        "nombre": "Máquina de prensa de piernas",
        "tipo": "Máquina",
        "uso_semanal": [1, 1, 1, 2, 1, 1, 1],
        "uso_mensual": [22, 23, 12, 23, 12, 24, 14, 23, 14, 13, 0, 0],
        "detalles": {
            "descripcion": "Ideal para fortalecer las piernas.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Bicicleta estática",
        "tipo": "Máquina",
        "uso_semanal": [2, 2, 2, 3, 2, 1, 4],
        "uso_mensual": [24, 35, 25, 24, 35, 26, 25, 24, 25, 24, 0, 0],
        "detalles": {
            "descripcion": "Perfecta para cardio y quema de grasa.",
            "categoria": "Cardio",
            "dificultad": "Baja"
        }
    },
    {
        "nombre": "Máquina de poleas",
        "tipo": "Máquina",

        "uso_semanal": [2, 1, 1, 2, 1, 1, 2],
        "uso_mensual": [13, 24, 13, 13, 23, 23, 14, 24, 13, 14, 0, 0],
        "detalles": {
            "descripcion": "Versátil para entrenamiento de fuerza y resistencia.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Cinta de correr",
        "tipo": "Máquina",
        "uso_semanal": [4, 4, 4, 4, 2, 1, 1],
        "uso_mensual": [16, 28, 36, 27, 26, 28, 27, 26, 27, 26, 0, 0],
        "detalles": {
            "descripcion": "Perfecta para correr y caminar en casa.",
            "categoria": "Cardio",
            "dificultad": "Baja"
        }
    },
    {
        "nombre": "Mancuernas",
        "tipo": "Implemento",
        "uso_semanal": [5, 5, 5, 5, 3, 2, 2],
        "uso_mensual": [39, 40, 30, 38, 39, 39, 40, 39, 48, 40, 0, 0],
        "detalles": {
            "descripcion": "Perfectas para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Barra de pesas",
        "tipo": "Implemento",
        "uso_semanal": [3, 4, 4, 4, 2, 1, 2],
        "uso_mensual": [26, 28, 36, 37, 27, 37, 26, 37, 27, 28, 0, 0],
        "detalles": {
            "descripcion": "Ideal para entrenamiento de fuerza en casa.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Pelota de yoga",
        "tipo": "Implemento",
        "uso_semanal": [2, 3, 2, 4, 1, 1, 2],
        "uso_mensual": [16, 28, 36, 27, 26, 28, 27, 26, 27, 25, 0, 0],
        "detalles": {
            "descripcion": "Perfecta para ejercicios de equilibrio y flexibilidad.",
            "categoria": "Estiramiento",
            "dificultad": "Baja"
        }
    },
    {
        "nombre": "Banda elástica",
        "tipo": "Implemento",
        "uso_semanal": [1, 2, 1, 2, 1, 1, 1],
        "uso_mensual": [23, 14, 23, 24, 24, 23, 33, 24, 13, 23, 0, 0],
        "detalles": {
            "descripcion": "Ideal para ejercicios de resistencia y tonificación.",
            "categoria": "Fuerza",
            "dificultad": "Baja"
        }
    },
];

const calculateTotals = (implementos) => {
    return implementos.map(implemento => ({
        ...implemento,
        uso_semanal_total: implemento.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: implemento.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};

const generatePieChartData = (implementos, infoMode) => {
    const sortedImplementos = implementos.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );
    const topMachines = sortedImplementos.slice(0, 5);
    const otherTotal = sortedImplementos.slice(5).reduce((sum, machine) =>
        infoMode === 'Semanal' ? sum + machine.uso_semanal_total : sum + machine.uso_mensual_total, 0
    );

    const pieChartData = topMachines.map((machine, index) => ({
        id: index,
        value: infoMode === 'Semanal' ? machine.uso_semanal_total : machine.uso_mensual_total,
        label: machine.nombre,
    }));

    if (otherTotal > 0) {
        pieChartData.push({
            id: topMachines.length,
            value: otherTotal,
            label: "Otras",
        });
    }

    return pieChartData;
};

const generateTableData = (implementos, infoMode) => {
    const sortedImplementos = implementos.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );

    return sortedImplementos.map((implemento) => ({
        nombre: implemento.nombre,
        tipo: implemento.tipo,
        uso_semanal_total: implemento.uso_semanal_total,
        uso_mensual_total: implemento.uso_mensual_total,
    }));
};

export const Implementos = () => {

    const [infoMode, setInfoMode] = useState('Semanal');
    const implementosData = calculateTotals(implementos);
    const pieChartData = generatePieChartData(implementosData, infoMode);
    const tableData = generateTableData(implementosData, infoMode);

    return (
        <div className='bg-white rounded-lg pb-4 shadow open-sans h-full flex flex-col p-4'>
            <div className='flex justify-between'>
                <h1 className='montserrat-alternates text-azul-marino-500 text-3xl font-semibold'>Implementos</h1>
                <nav className="flex justify-startopen-sans">
                    <button
                        onClick={() => setInfoMode('Semanal')}
                        className={`p-2 text-xs rounded-l-lg transition-colors 
                    ${infoMode === 'Semanal'
                                ? 'text-blue-700   bg-blue-100'
                                : 'text-stone-500 border hover:bg-stone-50'}`}
                    >
                        Semanal
                    </button>
                    <button
                        onClick={() => setInfoMode('Mensual')}
                        className={`p-2 text-xs rounded-r-lg  transition-colors 
                    ${infoMode === 'Mensual'
                                ? 'text-cyan-700  bg-cyan-100'
                                : 'text-stone-500 border hover:bg-stone-50'}`}
                    >
                        Mensual
                    </button>
                </nav>
            </div>
            <div className='grid grid-rows-2 h-[calc(100%-36px)]'>
                <div className='row-span-1 flex flex-col'>
                    <nav className="flex justify-start border-b  ">
                        <span
                            className='px-4 py-2 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                        >
                            General
                        </span>
                    </nav>
                    <div className='grid h-[calc(100%-38px)] grid-rows-1 gap-4 py-4 grid-cols-2'>
                        <ImplementsGraph data={pieChartData} />
                        <ImplementsTable data={tableData} infoMode={infoMode} />
                    </div>
                </div>
                <div className='row-span-1'>
                    <MachinesGraph data={implementosData} infoMode={infoMode} />
                </div>

            </div>
        </div>
    )
}
