import React, { useState, useEffect } from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { TbSum } from "react-icons/tb";
import { findTrainingPlanById } from "../../services/plans/trainingPlan";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";

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

const colors = [
  "#365314",
  "#006400",
  "#38B000",
  "#9EF01A",
  "#CCFF33",
  "#cbd5e1",
];

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy * 0.2}
        textAnchor="middle"
        fill="#1e293b"
        className="sm:text-base text-sm">
        {payload.label}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        cornerRadius={7}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill="#333"
        className="sm:text-base text-sm">
        {value}
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill="#999"
        className="sm:text-sm text-xs">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

export const PlansGraph = () => {
  const [loading, setLoading] = useState(false);
  const [planesEntrenamiento, setPlanesEntrenamiento] = useState([]);
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

  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div
        className={`bg-white xl:col-span-2 flex flex-col xl:h-auto h-[50svh] xl:row-span-1 p-4 rounded-xl shadow justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }

  return (
    <div className="bg-white xl:col-span-2 flex flex-col xl:h-auto h-[50svh] xl:row-span-1 p-4 rounded-xl shadow">
      <div className="flex justify-between items-center">
        <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
          <FaRegCalendarCheck className="xl:size-4 size-3" />
          Planes Populares
        </h3>
        <h3 className="text-azul-marino-500 xl:text-sm text-xs flex items-center gap-2 font-medium">
          <TbSum className="xl:size-4 size-3" />
          Total Planes: {planesEntrenamiento.length}
        </h3>
      </div>

      <div className="flex items-center justify-center flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieChartData}
              cx="50%"
              cy="55%"
              innerRadius="35%"
              outerRadius="70%"
              paddingAngle={2}
              cornerRadius={7}
              dataKey="value"
              onMouseEnter={onPieEnter}>
              {pieChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
