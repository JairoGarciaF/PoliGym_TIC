import React from "react";
import { IoMaleFemale } from "react-icons/io5";
import { BiLoaderCircle } from "react-icons/bi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const generatePopularChartData = (ejercicios) => {
  const sortedEjercicios = ejercicios.sort((a, b) => b.totalUses - a.totalUses);
  const topEjercicios = sortedEjercicios.slice(0, 3);

  const popularChartData = topEjercicios.map((exercise) => ({
    nombre: exercise.name,
    Masculino: exercise.genderStats[0].useCount,
    Femenino: exercise.genderStats[1].useCount,
    Otro: exercise.genderStats[2].useCount,
  }));

  return popularChartData;
};

export const GeneralGenderGraph = ({ data, loading }) => {
  const chartData = generatePopularChartData(data);

  if (loading) {
    return (
      <div
        className={`p-4 bg-white xl:col-span-7 xl:h-auto h-[50svh] rounded-xl flex flex-col shadow justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white xl:col-span-7 xl:h-auto h-[50svh] rounded-xl flex flex-col shadow">
      <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
        <IoMaleFemale className="xl:size-4 size-3" />
        Top Uso por Género
      </h3>
      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend
              wrapperStyle={{
                fontSize:
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 12
                    : 14,
                fontFamily: "Open Sans",
              }}
            />
            <Bar dataKey="Masculino" fill="#0369a1" />
            <Bar dataKey="Femenino" fill="#ec4899" />
            <Bar dataKey="Otro" fill="#94a3b8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
