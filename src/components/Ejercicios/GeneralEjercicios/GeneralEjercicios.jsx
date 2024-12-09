import React from "react";
import { GeneralPopularGraph } from "./GeneralPopularGraph";
import { GeneralGenderGraph } from "./GeneralGenderGraph";
import { GeneralUsageTable } from "./GeneralUsageTable";
import { GeneralCategoryGraph } from "./GeneralCategoryGraph";

const generatePieChartData = (ejercicios) => {
  // Ordenar los ejercicios por totalUses en orden descendente
  const sortedEjercicios = [...ejercicios].sort(
    (a, b) => b.totalUses - a.totalUses
  );

  // Tomar solo los 5 ejercicios con más usos
  const topEjercicios = sortedEjercicios.slice(0, 5);

  // Mapear al formato necesario para el PieChart
  return topEjercicios.map((ejercicio) => ({
    id: ejercicio.exerciseId,
    value: ejercicio.totalUses,
    label: ejercicio.name || "Unknown",
  }));
};

export const GeneralEjercicios = ({ ejercicios, loading }) => {
  const popularChartData = generatePieChartData(ejercicios);

  return (
    <div className="p-4 flex-1 overflow-auto open-sans gap-4 grid xl:grid-cols-12 xl:grid-rows-2 bg-slate-100 rounded-xl">
      <GeneralPopularGraph
        data={popularChartData}
        total={ejercicios.length}
        loading={loading}
      />
      {/* <GeneralUsageTable data={ejercicios} loading={loading} />
      <GeneralCategoryGraph data={ejercicios} loading={loading} />
      <GeneralGenderGraph data={ejercicios} loading={loading} /> */}
    </div>
  );
};
