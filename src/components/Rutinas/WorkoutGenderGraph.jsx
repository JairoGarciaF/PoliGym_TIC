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

const generatePopularChartData = (rutinas) => {
  const sortedRutinas = rutinas.sort((a, b) => b.totalUses - a.totalUses);
  const topRutinas = sortedRutinas.slice(0, 3);

  const popularChartData = topRutinas.map((routine) => ({
    nombre: routine.name,
    Masculino: routine.genderStats[0].totalCompletions,
    Femenino: routine.genderStats[1].totalCompletions,
    Otro: routine.genderStats[2].totalCompletions,
  }));

  return popularChartData;
};

export const WorkoutGenderGraph = ({ data, loading }) => {
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
    <div className="flex flex-col bg-white p-4 rounded-xl shadow xl:col-span-7 xl:h-full h-[50svh]">
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
