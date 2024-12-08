import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { BiLoaderCircle } from "react-icons/bi";

import { FaChartPie } from "react-icons/fa";

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
        {payload.name}
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
        className="sm:text-lg text-base">
        {value}
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill="#999"
        className="sm:text-sm text-xs">
        {" "}
        {`${(percent * 100).toFixed(2)}%`}{" "}
      </text>
    </g>
  );
};

export const UserStatsPieChart = ({ stats, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Género");

  const categories = [
    {
      label: "Género",
      options: ["Masculino", "Femenino", "Otro"],
      field: "genderStats",
      colors: ["#0369a1", "#ec4899", "#94a3b8"],
    },
    // {
    //   label: "Tipo",
    //   options: ["Estudiante", "Profesor", "Administración"],
    //   field: "tipo",
    //   colors: ["#03346E", "#B8001F", "#E2E2B6"],
    // },

    {
      label: "Objetivo",
      options: ["Bajar de Peso", "Ganar Músculo", "Mantenerse en Forma"],
      field: "goalStats",
      colors: ["#8ecae6", "#fb8500", "#219ebc"],
    },
    // {
    //   label: "Estado Físico",
    //   options: ["Principiante", "Intermedio", "Avanzado"],
    //   field: "estadoFisico",
    //   colors: ["#B9E5E8", "#7AB2D3", "#4A628A"],
    // },
  ];

  const currentCategory = categories.find(
    (cat) => cat.label === selectedCategory
  );

  const data = currentCategory.options.map((option, index) => ({
    name: option,
    value:
      selectedCategory === "Género"
        ? stats.genderStats[index].count
        : stats.goalStats[index].count,
  }));

  const onPieEnter = (_, index) => setActiveIndex(index);

  if (loading) {
    return (
      <div
        className={
          "bg-white col-span-1 row-span-10 lg:h-auto h-[50svh] p-4 rounded-xl shadow flex flex-col justify-center items-center"
        }>
        <BiLoaderCircle className="xl:size-10 size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="bg-white col-span-1 lg:row-span-10 lg:h-auto h-[60svh] p-4 rounded-xl shadow flex flex-col items-center">
      <h3 className="text-azul-marino-500 xl:text-base text-sm flex self-start items-center gap-2 font-medium">
        <FaChartPie className="xl:size-4 size-3" />
        Usuarios por {selectedCategory}
      </h3>

      <nav className="flex justify-start  open-sans border-b w-full">
        {categories.map((category) => (
          <button
            key={category.label}
            onClick={() => setSelectedCategory(category.label)}
            className={`p-2 text-xs transition-colors 
                            ${
                              selectedCategory === category.label
                                ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                                : "text-slate-500 hover:text-azul-marino-300"
                            }`}>
            {category.label}
          </button>
        ))}
      </nav>

      <div className="flex-1 w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="55%"
              innerRadius="40%"
              outerRadius="70%"
              paddingAngle={2}
              cornerRadius={7}
              dataKey="value"
              onMouseEnter={onPieEnter}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    currentCategory.colors[
                      index % currentCategory.colors.length
                    ]
                  }
                />
              ))}
            </Pie>
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              iconSize={10}
              wrapperStyle={{ fontSize: 14, fontFamily: "Open Sans" }}
              formatter={(value, entry) => (
                <span className="text-slate-800">{entry.payload.name}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
