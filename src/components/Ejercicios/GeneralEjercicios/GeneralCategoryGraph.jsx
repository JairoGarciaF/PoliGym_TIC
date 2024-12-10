import React from "react";
import { TbCategoryFilled } from "react-icons/tb";
import { BiLoaderCircle } from "react-icons/bi";
import {
  BarChart,
  Cell,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1e3a8a", "#84cc16", "#f97316"];

const categoryTranslate = (category) => {
  switch (category) {
    case "STRENGTH":
      return "Fuerza";
    case "FLEXIBILITY":
      return "Flexibilidad";
    case "CARDIO":
      return "Cardio";
  }
};

const getCategoryUsage = (exercises) => {
  const categories = ["STRENGTH", "FLEXIBILITY", "CARDIO"];

  // Inicializamos el resultado con las categorías y un Uso de 0
  const result = categories.map((category) => ({
    label: category,
    Uso: 0,
  }));

  // Sumamos los usos de cada ejercicio a la categoría correspondiente
  exercises.forEach((exercise) => {
    const categoryIndex = categories.indexOf(exercise.category);
    if (categoryIndex !== -1) {
      result[categoryIndex].Uso += exercise.totalUses || 0;
    }
  });

  return result;
};

export const GeneralCategoryGraph = ({ data, loading }) => {
  // Preparar los datos para el gráfico, asegurando el orden deseado
  const chartData = getCategoryUsage(data);

  if (loading) {
    return (
      <div
        className={`bg-white p-4 rounded-xl xl:h-auto h-[50svh] shadow flex flex-col items-center xl:col-span-5 justify-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl xl:h-auto h-[50svh] shadow flex flex-col items-end xl:col-span-5">
      <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
        <TbCategoryFilled className="xl:size-4 size-3" />
        Uso por Categoría
      </h3>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tick={{
                fontSize:
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 12
                    : 14,
              }}
            />
            <YAxis
              tick={{
                fontSize:
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 12
                    : 14,
              }}
              type="category"
              dataKey={(entry) => categoryTranslate(entry.label)}
              width={100}
            />
            <Tooltip />
            <Bar dataKey="Uso" barSize={20}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
