import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { findExerciseById } from "../../services/exercise/exercise";
import { BiLoaderCircle } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa";
import { TbSum } from "react-icons/tb";

const data = [
  {
    exerciseId: 1,
    totalUses: 1250,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 600,
      },
      {
        gender: "FEMALE",
        useCount: 400,
      },
      {
        gender: "OTHER",
        useCount: 250,
      },
    ],
  },
  {
    exerciseId: 2,
    totalUses: 1450,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 650,
      },
      {
        gender: "FEMALE",
        useCount: 500,
      },
      {
        gender: "OTHER",
        useCount: 200,
      },
    ],
  },
  {
    exerciseId: 3,
    totalUses: 1000,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 600,
      },
      {
        gender: "FEMALE",
        useCount: 400,
      },
      {
        gender: "OTHER",
        useCount: 0,
      },
    ],
  },
  {
    exerciseId: 4,
    totalUses: 1500,
    popularityScore: 4.5,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 900,
      },
      {
        gender: "FEMALE",
        useCount: 500,
      },
      {
        gender: "OTHER",
        useCount: 100,
      },
    ],
  },
  {
    exerciseId: 5,
    totalUses: 900,
    popularityScore: 4.9,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 500,
      },
      {
        gender: "FEMALE",
        useCount: 350,
      },
      {
        gender: "OTHER",
        useCount: 50,
      },
    ],
  },
];

const colors = [
  "#9d0208",
  "#d00000",
  "#e85d04",
  "#faa307",
  "#ffea00",
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

export const ExercisesGraph = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const popularChartData = generatePieChartData(ejercicios);

  useEffect(() => {
    const fetchEjercicios = async () => {
      setLoading(true);
      try {
        // Enriquecer el array data con detalles del ejercicio
        const enrichedExercises = await Promise.all(
          data.map(async (item) => {
            const exerciseDetails = await findExerciseById(item.exerciseId);
            return {
              ...item,
              name: exerciseDetails.name,
            };
          })
        );
        setEjercicios(enrichedExercises);
      } catch (error) {
        console.error("Error fetching exercises details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEjercicios();
  }, []);

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
          <FaDumbbell className="xl:size-4 size-3" />
          Ejercicios Populares
        </h3>
        <h3 className="text-azul-marino-500 xl:text-sm text-xs flex items-center gap-2 font-medium">
          <TbSum className="xl:size-4 size-3" />
          Total Ejercicios: {popularChartData.length}
        </h3>
      </div>

      <div className="flex items-center justify-center flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={popularChartData}
              cx="50%"
              cy="55%"
              innerRadius="35%"
              outerRadius="70%"
              paddingAngle={2}
              cornerRadius={7}
              dataKey="value"
              onMouseEnter={onPieEnter}>
              {popularChartData.map((entry, index) => (
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
