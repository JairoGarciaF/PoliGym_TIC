import { LineChart } from '@mui/x-charts/LineChart';
import React, { useRef, useState, useEffect } from 'react';
import { FaDumbbell } from "react-icons/fa6";

export const MachinesGraph = ({ data }) => {
    const [activeTab, setActiveTab] = useState('Semanal'); // Estado para el tab activo
    const [selectedMachine, setSelectedMachine] = useState(data[0]); // Estado para la máquina seleccionada
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    const containerRef = useRef(null);

    const xLabelsSemanal = [
        'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
    ]

    const xLabelsMensual = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]

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

    // Función que devuelve el color según el tipo
    const getTypePillColor = (tipo) => {
        switch (tipo) {
            case "Máquina":
                return "bg-teal-100 text-teal-700";
            case "Implemento":
                return "bg-lime-100 text-lime-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Función que devuelve el color según la categoría
    const getCategoryPillColor = (category) => {
        switch (category) {
            case "Fuerza":
                return "bg-violet-100 text-violet-700";
            case "Cardio":
                return "bg-orange-100 text-orange-700";
            case "Flexibilidad":
                return "bg-sky-100 text-sky-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Función que devuelve el color según la dificultad
    const getDifficultyPillColor = (difficulty) => {
        switch (difficulty) {
            case "Principiante":
                return "bg-green-100 text-green-700";
            case "Intermedia":
                return "bg-yellow-100 text-yellow-700";
            case "Difícil":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    // Función para manejar el cambio de máquina
    const handleMachineChange = (event) => {
        const machineName = event.target.value;
        const machine = data.find(item => item.nombre === machineName);
        setSelectedMachine(machine);
    };

    // Datos para el gráfico según el tab activo
    const chartData = activeTab === 'Semanal' ? selectedMachine.uso_diario : selectedMachine.uso_mensual;

    return (
        <>

            <div className='grid grid-cols-4 gap-4 grid-rows-1 h-[calc(100%-38px)] '>
                <div ref={containerRef} className=' p-4 mt-4 bg-white col-span-1 rounded border border-stone-300'>
                    <nav className="flex justify-start w-full ">
                        <select
                            className='px-4 py-2 border-b w-full bg-white text-azul-marino-500 '
                            onChange={handleMachineChange}
                        >
                            {data.map(machine => (
                                <option className='font-medium' key={machine.nombre} value={machine.nombre}>
                                    {machine.nombre}
                                </option>
                            ))}
                        </select>

                    </nav>

                    <div className='mt-4'>
                        <p className='pb-4'>
                            <span className='font-semibold'>Descripción: </span>
                            <span >{selectedMachine.detalles.descripcion}</span>
                        </p>
                        <div className='flex flex-col gap-2'>
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
                <div ref={containerRef} className='p-4 mt-4 bg-white col-span-3 rounded border border-stone-300'>
                    <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                        <FaDumbbell className='size-5' />
                        Uso de: {selectedMachine.nombre}
                    </h3>
                    <nav className="flex justify-start  open-sans border-b">
                        <button
                            onClick={() => setActiveTab('Semanal')}
                            className={`p-2 text-xs transition-colors 
                    ${activeTab === 'Semanal'
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-gradient-to-t from-blue-50'
                                    : 'text-stone-500 hover:text-azul-marino-300'}`}
                        >
                            Semanal
                        </button>
                        <button
                            onClick={() => setActiveTab('Mensual')}
                            className={`p-2 text-xs transition-colors 
                    ${activeTab === 'Mensual'
                                    ? 'text-cyan-600 border-b-2 border-cyan-600 bg-gradient-to-t from-cyan-50'
                                    : 'text-stone-500 hover:text-azul-marino-300'}`}
                        >
                            Mensual
                        </button>
                    </nav>

                    {/* Gráfico de uso */}
                    <LineChart
                        series={[
                            {
                                data: chartData,
                            },
                        ]}
                        colors={activeTab === 'Semanal' ? ['#86198f'] : ['#6b21a8']}
                        xAxis={[{
                            scaleType: 'point',
                            data: activeTab === 'Semanal' ? xLabelsSemanal : xLabelsMensual,

                        }]}
                        yAxis={[{
                            min: 0
                        }]}
                        grid={{ vertical: true, horizontal: true }}
                        width={containerSize.width * 1} // Se adapta al tamaño del contenedor
                        height={containerSize.height * 0.8}
                    />
                </div>
            </div>
        </>
    );
};
