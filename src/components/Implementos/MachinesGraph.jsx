import { LineChart } from '@mui/x-charts/LineChart';
import React, { useRef, useState, useEffect } from 'react';
import { FaArrowTrendUp, FaCircleInfo } from "react-icons/fa6";


// Función que devuelve el color según la categoría
const getCategoryPillColor = (category) => {
    switch (category) {
        case "Fuerza":
            return "bg-blue-100 text-blue-900";
        case "Cardio":
            return "bg-orange-100 text-orange-700";
        case "Estiramiento":
            return "bg-lime-100 text-lime-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

// Función que devuelve el color según la dificultad
const getDifficultyPillColor = (difficulty) => {
    switch (difficulty) {
        case "Baja":
            return "bg-green-100 text-green-700";
        case "Media":
            return "bg-yellow-100 text-yellow-700";
        case "Alta":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
};

// Función que devuelve el color según el tipo
const getTypePillColor = (tipo) => {
    switch (tipo) {
        case "Máquina":
            return "bg-stone-100 text-stone-800";
        case "Implemento":
            return "bg-teal-100 text-teal-800";
        default:
            return "bg-gray-100 text-gray-700";
    }
};




const xLabelsSemanal = [
    'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
]

const xLabelsMensual = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
]

export const MachinesGraph = ({ data, infoMode }) => {
    const [selectedMachine, setSelectedMachine] = useState(data[0]); // Estado para la máquina seleccionada
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



    // Función para manejar el cambio de máquina
    const handleMachineChange = (event) => {
        const machineName = event.target.value;
        const machine = data.find(item => item.nombre === machineName);
        setSelectedMachine(machine);
    };

    // Datos para el gráfico según el tab activo
    const chartData = infoMode === 'Semanal' ? selectedMachine.uso_semanal : selectedMachine.uso_mensual;

    return (
        <>
            <nav className="flex justify-between border-b  mb-2">
                <span
                    className='px-4 py-2 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                >
                    Detalles
                </span>
                <nav className="flex justify-start  text-sm ">
                    <select
                        className='px-4 py-2 w-full bg-white text-azul-marino-500 '
                        onChange={handleMachineChange}
                    >
                        {data.map(machine => (
                            <option className='font-medium' key={machine.nombre} value={machine.nombre}>
                                {machine.nombre}
                            </option>
                        ))}
                    </select>

                </nav>
            </nav>
            <div className='grid grid-cols-4 gap-4 grid-rows-1 h-[calc(100%-49px)] bg-slate-100 p-4 rounded-xl'>
                <div ref={containerRef} className=' p-4  bg-white col-span-1 rounded-xl shadow'>

                    <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                        <FaCircleInfo className='size-5' />
                        Información
                    </h3>
                    <div className='mt-4 text-sm'>
                        <p className='pb-4 text-base'>
                            <span className='font-semibold'>Descripción: </span>
                            <span >{selectedMachine.detalles.descripcion}</span>
                        </p>
                        <div className='flex flex-col gap-3'>
                            <p>
                                <span className='font-semibold'>Tipo: </span>
                                <span className={`px-2 py-1 rounded-full text-sm ${getTypePillColor(selectedMachine.tipo)}`}>{selectedMachine.tipo}</span>
                            </p>
                            <p>
                                <span className='font-semibold'>Categoría: </span>
                                <span className={`px-2 py-1 rounded-full text-sm ${getCategoryPillColor(selectedMachine.detalles.categoria)}`}>{selectedMachine.detalles.categoria}</span>
                            </p>
                            <p>
                                <span className='font-semibold'>Dificultad: </span>
                                <span className={`px-2 py-1 rounded-full text-sm ${getDifficultyPillColor(selectedMachine.detalles.dificultad)}`}>{selectedMachine.detalles.dificultad || 'No especificada'}</span>
                            </p>
                        </div>
                    </div>



                </div>
                <div ref={containerRef} className='p-4  bg-white col-span-3 rounded-xl shadow'>
                    <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                        <FaArrowTrendUp className='size-5' />
                        Frecuencia de Uso
                    </h3>


                    {/* Gráfico de uso */}
                    <LineChart
                        series={[
                            {
                                data: chartData,
                            },
                        ]}
                        colors={infoMode === 'Semanal' ? ['#3b82f6'] : ['#06b6d4']}
                        xAxis={[{
                            scaleType: 'point',
                            data: infoMode === 'Semanal' ? xLabelsSemanal : xLabelsMensual,

                        }]}
                        yAxis={[{
                            min: 0
                        }]}
                        grid={{ vertical: true, horizontal: true }}
                        width={containerSize.width * 1} // Se adapta al tamaño del contenedor
                        height={containerSize.height * 0.9}
                    />
                </div>
            </div>
        </>
    );
};
