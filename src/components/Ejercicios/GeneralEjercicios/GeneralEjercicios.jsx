import React from 'react'
import { GeneralPopularGraph } from './GeneralPopularGraph'
import { GeneralGenderGraph } from './GeneralGenderGraph'
import { GeneralUsageTable } from './GeneralUsageTable'
import { GeneralCategoryGraph } from './GeneralCategoryGraph'

const generatePopularChartData = (ejercicios, infoMode) => {
    const sortedImplementos = ejercicios.sort((a, b) =>
        infoMode === 'Semanal' ? b.uso_semanal_total - a.uso_semanal_total : b.uso_mensual_total - a.uso_mensual_total
    );
    const topMachines = sortedImplementos.slice(0, 5);
    const otherTotal = sortedImplementos.slice(5).reduce((sum, machine) =>
        infoMode === 'Semanal' ? sum + machine.uso_semanal_total : sum + machine.uso_mensual_total, 0
    );

    const popularChartData = topMachines.map((machine, index) => ({
        id: index,
        value: infoMode === 'Semanal' ? machine.uso_semanal_total : machine.uso_mensual_total,
        label: machine.nombre,
    }));

    if (otherTotal > 0) {
        popularChartData.push({
            id: topMachines.length,
            value: otherTotal,
            label: "Otras",
        });
    }

    return popularChartData;
};

export const GeneralEjercicios = ({ ejercicios, infoMode }) => {

    const popularChartData = generatePopularChartData(ejercicios, infoMode);

    return (
        <div className="pt-4 h-[calc(100%-36px-41px)] open-sans gap-4 grid grid-cols-12 grid-rows-2">
            <GeneralPopularGraph data={popularChartData} />
            <GeneralUsageTable data={ejercicios} infoMode={infoMode} />
            <GeneralCategoryGraph data={ejercicios} infoMode={infoMode} />
            <GeneralGenderGraph data={ejercicios} infoMode={infoMode} />
        </div>
    )
}
