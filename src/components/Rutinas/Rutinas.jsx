import React, { useState, useEffect } from "react";
import { findRoutineById } from "../../services/routine/routine";
import { WorkoutGenderGraph } from "./WorkoutGenderGraph";
import { WorkoutPopularGraph } from "./WorkoutPopularGraph";
import { WorkoutUsageTable } from "./WorkoutUsageTable";
import { WorkoutCompletationGraph } from "./WorkoutCompletationGraph";

const data = [
  {
    workoutId: 1,
    popularityScore: 4.7,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        totalCompletions: 250,
      },
      {
        gender: "FEMALE",
        totalCompletions: 200,
      },
      {
        gender: "OTHER",
        totalCompletions: 50,
      },
    ],
    completionStats: [
      {
        completionStatus: "COMPLETED",
        count: 500,
      },
      {
        completionStatus: "INCOMPLETE",
        count: 100,
      },
    ],
  },
  {
    workoutId: 2,
    popularityScore: 4.2,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        totalCompletions: 350,
      },
      {
        gender: "FEMALE",
        totalCompletions: 150,
      },
      {
        gender: "OTHER",
        totalCompletions: 80,
      },
    ],
    completionStats: [
      {
        completionStatus: "COMPLETED",
        count: 550,
      },
      {
        completionStatus: "INCOMPLETE",
        count: 150,
      },
    ],
  },
];

const generatePieChartData = (rutinas) => {
  // Ordenar los rutinas por totalUses en orden descendente
  const sortedRutinas = [...rutinas].sort(
    (a, b) => b.completionStats[0].count - a.completionStats[0].count
  );

  // Tomar solo los 5 rutinas con más usos
  const topRutinas = sortedRutinas.slice(0, 5);

  // Mapear al formato necesario para el PieChart
  return topRutinas.map((rutina) => ({
    id: rutina.workoutId,
    value: rutina.completionStats[0].count + rutina.completionStats[1].count,
    label: rutina.name || "Unknown",
  }));
};

export const Rutinas = () => {
  const [loading, setLoading] = useState(false);
  const [rutinas, setRutinas] = useState([]);
  const [infoMode, setInfoMode] = useState("Semanal");
  const pieChartData = generatePieChartData(rutinas);

  useEffect(() => {
    const fetchRutinas = async () => {
      setLoading(true);
      try {
        // Enriquecer el array data con detalles del equipo
        const enrichedRutinas = await Promise.all(
          data.map(async (item) => {
            const routinesDetails = await findRoutineById(item.workoutId);
            return {
              ...item,
              name: routinesDetails.name,
              frequency: routinesDetails.frequency,
              duration: routinesDetails.duration,
              category: routinesDetails.category,
              level: routinesDetails.level,
              totalUses:
                item.completionStats[0].count + item.completionStats[1].count,
              completionPercentage: (
                (item.completionStats[0].count /
                  (item.completionStats[0].count +
                    item.completionStats[1].count)) *
                100
              ).toFixed(1),
            };
          })
        );
        setRutinas(enrichedRutinas);
      } catch (error) {
        console.error("Error fetching rutinas details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutinas();
  }, []);

  return (
    <div className="bg-white rounded-xl flex flex-col shadow h-full p-4">
      <div>
        <div className="flex justify-between overflow-hidden">
          <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
            Rutinas
          </h1>
          <nav className="flex justify-start md:w-auto w-1/3 open-sans">
            <button
              onClick={() => setInfoMode("Semanal")}
              className={`sm:p-2 p-1 text-xs truncate rounded-l-lg transition-colors 
                        ${
                          infoMode === "Semanal"
                            ? "text-blue-700   bg-blue-100"
                            : "text-slate-500 border hover:bg-slate-50"
                        }`}>
              Semanal
            </button>
            <button
              onClick={() => setInfoMode("Mensual")}
              className={`sm:p-2 p-1 text-xs truncate rounded-r-lg  transition-colors 
                        ${
                          infoMode === "Mensual"
                            ? "text-cyan-700  bg-cyan-100"
                            : "text-slate-500 border hover:bg-slate-50"
                        }`}>
              Mensual
            </button>
          </nav>
        </div>
        <nav className="flex justify-start border-b  mb-2">
          <span className="px-4 py-1  font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50">
            General
          </span>
        </nav>
      </div>
      <div className="p-4 flex-1 overflow-auto open-sans gap-4 grid xl:grid-cols-12 xl:grid-rows-2 bg-slate-100 rounded-xl">
        <WorkoutPopularGraph
          data={pieChartData}
          total={rutinas.length}
          loading={loading}
        />
        <WorkoutUsageTable data={rutinas} loading={loading} />
        <WorkoutCompletationGraph data={rutinas} loading={loading} />
        <WorkoutGenderGraph data={rutinas} loading={loading} />
      </div>
    </div>
  );
};
