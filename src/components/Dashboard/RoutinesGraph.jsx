import React, { useState, useEffect } from "react";
import { PieChart, Pie, Sector, ResponsiveContainer, Cell } from "recharts";
import { BiLoaderCircle } from "react-icons/bi";
import { findRoutineById } from "../../services/routine/routine";
import { LuDumbbell } from "react-icons/lu";
import { TbSum } from "react-icons/tb";

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

const colors = [
  "#03045e",
  "#0077b6",
  "#00b4d8",
  "#90e0ef",
  "#caf0f8",
  "#cbd5e1",
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

export const RoutinesGraph = ({ infoMode }) => {
  const [loading, setLoading] = useState(false);
  const [rutinas, setRutinas] = useState([]);
  const pieChartData = generatePieChartData(rutinas);
  const [activeIndex, setActiveIndex] = useState(0);

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
          <LuDumbbell className="xl:size-4 size-3" />
          Rutinas Populares
        </h3>
        <h3 className="text-azul-marino-500 xl:text-sm text-xs flex items-center gap-2 font-medium">
          <TbSum className="xl:size-4 size-3" />
          Total Rutinas: {rutinas.length}
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
