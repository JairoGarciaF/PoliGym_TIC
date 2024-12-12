import React, { useState, useEffect } from "react";
import { findTrainingPlanById } from "../../../services/plans/trainingPlan";
import { TrainingPopularGraph } from "./TrainingPopularGraph";
import { TrainingProgressGraph } from "./TrainingProgressGraph";
import { TrainingGenderGraph } from "./TrainingGenderGraph";
import { TrainingUsageTable } from "./TrainingUsageTable";

const data = [
  {
    trainingPlanId: 1,
    totalEnrollments: 260,
    totalCompletions: 180,
    period: "WEEKLY",
    date: "2024-03-15T10:30:00Z",
    genderStats: [
      {
        gender: "MALE",
        enrollmentCount: 140,
        completionCount: 100,
      },
      {
        gender: "FEMALE",
        enrollmentCount: 110,
        completionCount: 75,
      },
      {
        gender: "OTHER",
        enrollmentCount: 10,
        completionCount: 5,
      },
    ],
    completionStats: [
      {
        completionStatus: "STARTED",
        count: 30,
      },
      {
        completionStatus: "IN_PROGRESS",
        count: 50,
      },
      {
        completionStatus: "COMPLETED",
        count: 180,
      },
    ],
  },
];

const generatePieChartData = (trainingPlan) => {
  // Ordenar los trainingPlan por totalUses en orden descendente
  const sortedTrainingPlan = [...trainingPlan].sort(
    (a, b) => b.totalEnrollments - a.totalEnrollments
  );

  // Tomar solo los 5 trainingPlan con más usos
  const topTrainingPlans = sortedTrainingPlan.slice(0, 5);

  // Mapear al formato necesario para el PieChart
  return topTrainingPlans.map((rutina) => ({
    id: rutina.trainingPlanId,
    value: rutina.totalEnrollments,
    label: rutina.name || "Unknown",
  }));
};

export const Entrenamiento = () => {
  const [loading, setLoading] = useState(false);
  const [planesEntrenamiento, setPlanesEntrenamiento] = useState([]);
  const [infoMode, setInfoMode] = useState("Semanal");
  const pieChartData = generatePieChartData(planesEntrenamiento);

  useEffect(() => {
    const fetchPlanesEntrenamiento = async () => {
      setLoading(true);
      try {
        // Enriquecer el array data con detalles del plan
        const enrichedPlanesEntrenamiento = await Promise.all(
          data.map(async (item) => {
            const trainingPlans = await findTrainingPlanById(
              item.trainingPlanId
            );
            return {
              ...item,
              name: trainingPlans.name,
              level: trainingPlans.level,
              completionPercentage: (
                (item.totalCompletions / item.totalEnrollments) *
                100
              ).toFixed(1),
            };
          })
        );
        setPlanesEntrenamiento(enrichedPlanesEntrenamiento);
      } catch (error) {
        console.error("Error fetching planes de entrenamiento details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanesEntrenamiento();
  }, []);

  return (
    <div className="p-4 flex-1 overflow-auto open-sans gap-4 grid xl:grid-cols-12 xl:grid-rows-2 bg-slate-100 rounded-xl">
      <TrainingPopularGraph
        data={pieChartData}
        total={planesEntrenamiento.length}
        loading={loading}
      />
      <TrainingUsageTable data={planesEntrenamiento} loading={loading} />
      <TrainingProgressGraph data={planesEntrenamiento} loading={loading} />
      <TrainingGenderGraph data={planesEntrenamiento} loading={loading} />
    </div>
  );
};
