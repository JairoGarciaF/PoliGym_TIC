import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { IoMaleFemale } from "react-icons/io5";

const colors = ["#0369a1", "#ec4899", "#94a3b8"];

// Función para renderizar el sector activo
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
        y={cy * 0.15}
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
        className="sm:text-base text-sm">
        {value}
      </text>
      <text
        x={cx}
        y={cy + 20}
        textAnchor="middle"
        fill="#999"
        className="sm:text-sm text-xs">{`${(percent * 100).toFixed(2)}%`}</text>
    </g>
  );
};

const translateGender = (gender) => {
  switch (gender) {
    case "MALE":
      return "Masculino";
    case "FEMALE":
      return "Femenino";
    case "OTHER":
      return "Otro";
    default:
      return "n/a";
  }
};

export const DetallesGenderGraph = ({ ejercicio }) => {
  const [pieChartData, setPieChartData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0); // Estado para el sector activo
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (ejercicio) {
      const chartData = ejercicio.genderStats.map((stat) => ({
        name: translateGender(stat.gender),
        value: stat.useCount,
      }));
      setPieChartData(chartData);
    }
  }, [ejercicio]);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col bg-white lg:h-auto h-[50svh] p-4 rounded-xl shadow xl:col-span-2 lg:col-span-1 xl:row-span-1">
      <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
        <IoMaleFemale className="xl:size-4 size-3" />
        Uso por Género
      </h3>
      <div className="flex items-center justify-center flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={pieChartData}
              cx="50%"
              cy="55%"
              innerRadius="40%"
              outerRadius="80%"
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
            {showLegend && (
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="middle"
                iconSize={10}
                wrapperStyle={{ fontSize: 14, fontFamily: "Open Sans" }}
                formatter={(value, entry) => (
                  <span className="text-slate-800">{entry.payload.name}</span>
                )}
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
