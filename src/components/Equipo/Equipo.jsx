import React, { useState } from 'react';
import { DetailsGraph } from './DetailsGraph';
import { EquipmentGraph } from './EquipmentGraph';
import { EquipmentTable } from './EquipmentTable';

const equipos = [
    {
        "nombre": "Bicicleta Estática",
        "tipo": "Máquina",
        "uso_semanal": [3, 4, 3, 5, 2, 3, 4],
        "uso_mensual": [40, 32, 34, 38, 36, 31, 39, 30, 35, 33, 0, 0],
        "detalles": {
            "descripcion": "Máquina cardiovascular ideal para mejorar la resistencia y quemar calorías.",
            "categoria": "Cardio",
            "dificultad": "Baja"
        }
    },
    {
        "nombre": "Máquina Paralela",
        "tipo": "Máquina",
        "uso_semanal": [1, 2, 1, 3, 1, 1, 2],
        "uso_mensual": [20, 18, 19, 16, 17, 15, 20, 19, 18, 17, 0, 0],
        "detalles": {
            "descripcion": "Máquina diseñada para ejercicios de abdominales y fuerza del tronco superior.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina de Bíceps",
        "tipo": "Máquina",
        "uso_semanal": [3, 3, 4, 3, 2, 3, 4],
        "uso_mensual": [30, 28, 29, 26, 27, 24, 29, 27, 28, 26, 0, 0],
        "detalles": {
            "descripcion": "Máquina diseñada para fortalecer los bíceps mediante movimientos controlados.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina de Lumbares",
        "tipo": "Máquina",
        "uso_semanal": [2, 3, 2, 2, 2, 3, 2],
        "uso_mensual": [24, 20, 22, 21, 22, 20, 21, 19, 23, 21, 0, 0],
        "detalles": {
            "descripcion": "Máquina fija diseñada para el entrenamiento de los músculos de la espalda baja.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina de Halterofilia",
        "tipo": "Máquina",
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [35, 34, 32, 30, 33, 31, 32, 30, 33, 31, 0, 0],
        "detalles": {
            "descripcion": "Máquina con barra fija para entrenamientos de levantamiento de peso.",
            "categoria": "Fuerza",
            "dificultad": "Alta"
        }
    },
    {
        "nombre": "Máquina de Aperturas",
        "tipo": "Máquina",
        "uso_semanal": [2, 3, 2, 3, 2, 3, 2],
        "uso_mensual": [28, 26, 27, 25, 28, 26, 27, 25, 28, 27, 0, 0],
        "detalles": {
            "descripcion": "Máquina con poleas para trabajar hombros y pecho mediante aperturas.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina Multiusos",
        "tipo": "Máquina",
        "uso_semanal": [3, 4, 3, 5, 4, 3, 4],
        "uso_mensual": [40, 39, 38, 37, 40, 38, 39, 37, 39, 38, 0, 0],
        "detalles": {
            "descripcion": "Máquina de poleas que permite realizar una variedad de ejercicios para todo el cuerpo.",
            "categoria": "Fuerza",
            "dificultad": "Alta"
        }
    },
    {
        "nombre": "Máquina de Press de Hombros",
        "tipo": "Máquina",
        "uso_semanal": [3, 3, 3, 4, 3, 3, 3],
        "uso_mensual": [33, 30, 31, 29, 33, 30, 32, 29, 31, 30, 0, 0],
        "detalles": {
            "descripcion": "Máquina de gran tamaño para realizar press de hombros y fortalecer el deltoides.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina Polea Alta",
        "tipo": "Máquina",
        "uso_semanal": [2, 2, 3, 2, 2, 2, 3],
        "uso_mensual": [26, 25, 27, 24, 25, 23, 27, 24, 26, 25, 0, 0],
        "detalles": {
            "descripcion": "Máquina de polea alta para ejercicios de espalda y brazos.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Máquina de Remo",
        "tipo": "Máquina",
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [30, 29, 30, 28, 30, 29, 28, 29, 30, 28, 0, 0],
        "detalles": {
            "descripcion": "Máquina de remo que simula el movimiento de remar para un entrenamiento completo de la espalda.",
            "categoria": "Fuerza",
            "dificultad": "Alta"
        }
    },
    {
        "nombre": "Barras",
        "tipo": "Implemento",
        "uso_semanal": [2, 3, 2, 3, 3, 2, 3],
        "uso_mensual": [24, 22, 23, 21, 24, 22, 23, 21, 24, 22, 0, 0],
        "detalles": {
            "descripcion": "Barras para entrenamientos de peso libre, especialmente útiles en ejercicios de fuerza.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    },
    {
        "nombre": "Mancuernas",
        "tipo": "Implemento",
        "uso_semanal": [4, 4, 5, 4, 3, 4, 4],
        "uso_mensual": [40, 38, 39, 37, 40, 38, 39, 36, 40, 37, 0, 0],
        "detalles": {
            "descripcion": "Mancuernas convencionales ideales para ejercicios de fuerza, especialmente en brazos y pecho.",
            "categoria": "Fuerza",
            "dificultad": "Media"
        }
    }
];


const calculateTotals = (equipos) => {
    return equipos.map(equipo => ({
        ...equipo,
        uso_semanal_total: equipo.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: equipo.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};

const generatePieChartData = (equipos, infoMode) => {
    const sortedEquipo = equipos.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );
    const topMachines = sortedEquipo.slice(0, 5);
    const otherTotal = sortedEquipo.slice(5).reduce((sum, machine) =>
        infoMode === 'Semanal' ? sum + machine.uso_semanal_total : sum + machine.uso_mensual_total, 0
    );

    const pieChartData = topMachines.map((machine, index) => ({
        id: index,
        value: infoMode === 'Semanal' ? machine.uso_semanal_total : machine.uso_mensual_total,
        label: machine.nombre,
    }));



    return pieChartData;
};

const generateTableData = (equipos, infoMode) => {
    const sortedEquipo = equipos.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );

    return sortedEquipo.map((equipo) => ({
        nombre: equipo.nombre,
        tipo: equipo.tipo,
        uso_semanal_total: equipo.uso_semanal_total,
        uso_mensual_total: equipo.uso_mensual_total,
    }));
};

export const Equipo = () => {

    const [infoMode, setInfoMode] = useState('Semanal');
    const equiposData = calculateTotals(equipos);
    const pieChartData = generatePieChartData(equiposData, infoMode);
    const tableData = generateTableData(equiposData, infoMode);

    return (
        <div className='bg-white rounded-xl pb-4  shadow open-sans h-full flex flex-col p-4'>
            <div className='flex justify-between overflow-hidden'>
                <h1 className='montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold'>Equipo</h1>
                <nav className="flex justify-start md:w-auto w-1/3 open-sans">
                    <button
                        onClick={() => setInfoMode('Semanal')}
                        className={`sm:p-2 p-1 text-xs truncate rounded-l-lg transition-colors 
                    ${infoMode === 'Semanal'
                                ? 'text-blue-700   bg-blue-100'
                                : 'text-slate-500 border hover:bg-slate-50'}`}
                    >
                        Semanal
                    </button>
                    <button
                        onClick={() => setInfoMode('Mensual')}
                        className={`sm:p-2 p-1 text-xs truncate rounded-r-lg  transition-colors 
                    ${infoMode === 'Mensual'
                                ? 'text-cyan-700  bg-cyan-100'
                                : 'text-slate-500 border hover:bg-slate-50'}`}
                    >
                        Mensual
                    </button>
                </nav>
            </div>
            <div className='overflow-auto flex-1 grid xl:grid-rows-2 gap-2 '>
                <div className='row-span-1 flex flex-col'>
                    <nav className="flex justify-start border-b  mb-2">
                        <span
                            className='px-4 py-1  font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                        >
                            General
                        </span>
                    </nav>
                    <div className='grid overflow-auto flex-1 xl:grid-rows-1 bg-slate-100 gap-4 p-4 rounded-xl xl:grid-cols-2'>
                        <EquipmentGraph data={pieChartData} total={equipos.length} />
                        <EquipmentTable data={tableData} infoMode={infoMode} />
                    </div>
                </div>

                <div className='row-span-1 flex-1 flex flex-col'>
                    <DetailsGraph data={equiposData} infoMode={infoMode} />
                </div>
            </div>
        </div>
    )
}
