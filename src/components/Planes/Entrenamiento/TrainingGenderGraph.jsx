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

// Función para procesar datos
const generatePopularChartData = (planes) => {
  const planesEntrenamiento = planes.sort(
    (a, b) => b.totalEnrollments - a.totalEnrollments
  );
  const topTrainingPlans = planesEntrenamiento.slice(0, 3);

  const popularChartData = topTrainingPlans.map((routine) => ({
    nombre: routine.name,
    "Masculino Incompletos":
      routine.genderStats[0].enrollmentCount -
      routine.genderStats[0].completionCount,
    "Masculino Completados": routine.genderStats[0].completionCount,
    "Femenino Incompletos":
      routine.genderStats[1].enrollmentCount -
      routine.genderStats[1].completionCount,
    "Femenino Completados": routine.genderStats[1].completionCount,
    "Otro Incompletos":
      routine.genderStats[2].enrollmentCount -
      routine.genderStats[2].completionCount,
    "Otro Completados": routine.genderStats[2].completionCount,
  }));

  return popularChartData;
};

export const TrainingGenderGraph = ({ data, loading }) => {
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

            {/* Barras apiladas para Masculino */}
            <Bar
              dataKey="Masculino Completados"
              stackId="masculino"
              fill="#0369a1"
            />
            <Bar
              dataKey="Masculino Incompletos"
              stackId="masculino"
              fill="#0ea5e9"
            />
            {/* Barras apiladas para Femenino */}
            <Bar
              dataKey="Femenino Completados"
              stackId="femenino"
              fill="#ec4899"
            />
            <Bar
              dataKey="Femenino Incompletos"
              stackId="femenino"
              fill="#f9a8d4"
            />
            {/* Barras apiladas para Otro */}
            <Bar dataKey="Otro Completados" stackId="otro" fill="#94a3b8" />
            <Bar dataKey="Otro Incompletos" stackId="otro" fill="#cbd5e1" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
