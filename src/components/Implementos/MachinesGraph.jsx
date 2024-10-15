import { LineChart } from '@mui/x-charts/LineChart';
import React, { useRef, useState, useEffect } from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";

export const MachinesGraph = ({ data }) => {
    const [activeTab, setActiveTab] = useState('Semanal'); // Estado para el tab activo
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

    const xLabelsSemanal = [
        'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
    ]

    const xLabelsMensual = [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ]

    // Datos para el gráfico según el tab activo
    const chartData = activeTab === 'Semanal' ? selectedMachine.uso_diario : selectedMachine.uso_mensual;

    return (
        <>
            <nav className="flex justify-start border-b">
                <select
                    className='px-4 py-2 font-semibold text-sm transition-colors bg-white text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                    onChange={handleMachineChange}
                >
                    {data.map(machine => (
                        <option className='font-medium' key={machine.nombre} value={machine.nombre}>
                            {machine.nombre}
                        </option>
                    ))}
                </select>
            </nav>
            <div ref={containerRef} className='flex-1 p-4 mt-4 bg-white h-full rounded border border-stone-300'>
                <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'>
                    <FaArrowTrendUp className='size-5' />
                    Uso de: {selectedMachine.nombre}
                </h3>
                <nav className="flex justify-start mb-1 open-sans border-b">
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
                        { data: chartData },
                    ]}
                    colors={['#15803d']}
                    xAxis={[{
                        scaleType: 'point',
                        data: activeTab === 'Semanal' ? xLabelsSemanal : xLabelsMensual,

                    }]}
                    yAxis={[{
                        min: 0,
                        max: `${activeTab === 'Semanal' ? 7 : 15}`,
                    }]}
                    width={containerSize.width * 0.5} // Se adapta al tamaño del contenedor
                    height={containerSize.height * 0.8}
                />
            </div>
        </>
    );
};
