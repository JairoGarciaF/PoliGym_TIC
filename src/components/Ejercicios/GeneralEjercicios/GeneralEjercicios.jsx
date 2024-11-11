import React from 'react'
import { GeneralPopularGraph } from './GeneralPopularGraph'
import { GeneralGenderGraph } from './GeneralGenderGraph'
import { GeneralUsageTable } from './GeneralUsageTable'
import { GeneralCategoryGraph } from './GeneralCategoryGraph'

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

export const GeneralEjercicios = ({ ejercicios, infoMode }) => {

    const popularChartData = generatePopularChartData(ejercicios, infoMode);

    return (
        <div className="p-4 flex-1 overflow-auto open-sans gap-4 grid xl:grid-cols-12 xl:grid-rows-2 bg-slate-100 rounded-xl">
            <GeneralPopularGraph data={popularChartData} total={ejercicios.length} />
            <GeneralUsageTable data={ejercicios} infoMode={infoMode} />
            <GeneralCategoryGraph data={ejercicios} infoMode={infoMode} />
            <GeneralGenderGraph data={ejercicios} infoMode={infoMode} />
        </div>
    )
}
