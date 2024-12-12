import React from "react";
import { FaFlagCheckered } from "react-icons/fa";
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

const generatePopularChartData = (planes) => {
  const sortedTrainingPlans = planes.sort(
    (a, b) => b.totalEnrollments - a.totalEnrollments
  );
  const topTrainingPlans = sortedTrainingPlans.slice(0, 10);

  const popularChartData = topTrainingPlans.map((trainingPlan) => ({
    nombre: trainingPlan.name,
    Iniciado: trainingPlan.completionStats[0].count,
    "En Progreso": trainingPlan.completionStats[1].count,
    Completado: trainingPlan.completionStats[2].count,
  }));

  return popularChartData;
};
export const TrainingProgressGraph = ({ data, loading }) => {
  const chartData = generatePopularChartData(data);

  if (loading) {
    return (
      <div
        className={`p-4 bg-white xl:col-span-5 xl:h-auto h-[50svh] rounded-xl flex flex-col shadow justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow xl:col-span-5 xl:h-full h-[50svh]">
      <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
        <FaFlagCheckered className="xl:size-4 size-3" />
        Progreso
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
            <Bar dataKey="Iniciado" stackId="a" fill="#2563eb" />
            <Bar dataKey="En Progreso" stackId="a" fill="#facc15" />
            <Bar dataKey="Completado" stackId="a" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
