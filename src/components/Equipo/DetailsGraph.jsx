import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { BiLoaderCircle } from "react-icons/bi";
import { FaCircleInfo } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoMaleFemale } from "react-icons/io5";
const colors = ["#0369a1", "#ec4899", "#94a3b8"];

const test = [
  {
    id: 0,
    value: 80,
    label: "Masculino",
  },
  {
    id: 1,
    value: 70,
    label: "Femenino",
  },
  {
    id: 2,
    value: 10,
    label: "Otro",
  },
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
        className="sm:text-lg text-base">
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

const categoryTranslate = (category) => {
  switch (category) {
    case "MACHINE":
      return "Máquina";
    case "FREE_WEIGHT":
      return "Peso libre";
    case "BODYWEIGHT":
      return "Peso corporal";
    case "CARDIO":
      return "Cardio";
    case "ACCESSORY":
      return "Accesorio";
  }
};

const categoryColor = (category) => {
  switch (category) {
    case "MACHINE":
      return "bg-[#d7ebf5] text-[#023047]";
    case "FREE_WEIGHT":
      return "bg-[#ebf9ff] text-[#82c2e0]";
    case "BODYWEIGHT":
      return "bg-[#fafae1] text-[#e8c500]";
    case "CARDIO":
      return "bg-[#faecdc] text-[#e87c02]";
    case "ACCESSORY":
      return "bg-[#d4f7ff] text-[#219ebc]";
  }
};

const statusColor = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "bg-green-100 text-green-700";
    case "IN_MAINTENANCE":
      return "bg-yellow-100 text-yellow-700";
    case "OUT_OF_ORDER":
      return "bg-red-100 text-red-700";
  }
};

const statusTranslate = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "Disponible";
    case "IN_MAINTENANCE":
      return "En mantenimiento";
    case "OUT_OF_ORDER":
      return "Fuera de servicio";
  }
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

const transformGenderStats = (genderStats) => {
  if (!genderStats || !Array.isArray(genderStats)) return [];

  return genderStats.map((stat, index) => ({
    id: index,
    value: stat.useCount,
    label: translateGender(stat.gender), // Utiliza tu función de traducción
  }));
};

export const DetailsGraph = ({ data, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMachine, setSelectedMachine] = useState(null); // Estado para la máquina seleccionada
  const [pieChartData, setPieChartData] = useState([]); // Estado para los datos del PieChart

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Inicializa el equipo seleccionado si hay datos disponibles
    if (data && data.length > 0) {
      const initialMachine = data[0];
      setSelectedMachine(initialMachine);
      setPieChartData(transformGenderStats(initialMachine.genderStats)); // Transformar datos
    } else {
      setSelectedMachine(null);
      setPieChartData([]);
    }
  }, [data, loading]);

  // Función para manejar el cambio de máquina
  const handleMachineChange = (event) => {
    const machineName = event.target.value;
    const machine = data.find((item) => item.name === machineName);
    setSelectedMachine(machine);
    setPieChartData(transformGenderStats(machine?.genderStats)); // Transformar datos
  };

  return (
    <>
      <nav className="flex justify-between border-b  mb-2">
        <span className="px-4 py-1 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50">
          Detalles
        </span>
        <nav className="flex justify-start  text-sm ">
          <select
            className="px-4 py-1 w-full bg-white text-azul-marino-500 "
            onChange={handleMachineChange}
            value={selectedMachine?.name || ""}>
            {data.map((machine) => (
              <option
                className="font-medium"
                key={machine.name}
                value={machine.name}>
                {machine.name}
              </option>
            ))}
          </select>
        </nav>
      </nav>
      <div className="flex-1 overflow-auto grid xl:grid-cols-2 grid-cols-1 gap-4 grid-rows-1 bg-slate-100 p-4 rounded-xl">
        {loading ? (
          <div
            className={` p-4  bg-white col-span-1 rounded-xl shadow flex flex-col justify-center items-center`}>
            <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
          </div>
        ) : (
          <div className=" p-4  bg-white col-span-1 rounded-xl shadow flex flex-col">
            <h3 className="text-azul-marino-500 xl:text-base text-sm  mb-1 flex self-start items-center gap-2 font-medium">
              <FaCircleInfo className="xl:size-4 size-3" />
              Información
            </h3>
            <div className="mt-2 xl:text-sm text-xs flex-1 overflow-auto">
              <div className="flex flex-col gap-3 pb-2">
                {selectedMachine ? (
                  <>
                    <p className="flex items-center gap-2">
                      <Rating
                        name="hover-feedback"
                        value={selectedMachine.popularityScore}
                        precision={0.1}
                        readOnly
                        size="small"
                        emptyIcon={
                          <FaStar style={{ opacity: 0.1 }} fontSize="inherit" />
                        }
                      />
                      <span className="font-semibold text-sm">
                        {selectedMachine.popularityScore}
                      </span>
                    </p>
                    <p className="xl:text-base text-sm ">
                      <span className="font-semibold">Descripción: </span>
                      <span>{selectedMachine.description}</span>
                    </p>
                    <p>
                      <span className="font-semibold">Categoría: </span>
                      <span
                        className={`px-2 py-1 rounded-full xl:text-sm text-xs ${categoryColor(
                          selectedMachine.category
                        )}`}>
                        {categoryTranslate(selectedMachine.category)}
                      </span>
                    </p>
                    <p>
                      <span className="font-semibold">Estatus: </span>
                      <span
                        className={`px-2 py-1 rounded-full xl:text-sm text-xs ${statusColor(
                          selectedMachine.status
                        )}`}>
                        {statusTranslate(selectedMachine.status)}
                      </span>
                    </p>
                  </>
                ) : (
                  <p>No hay información disponible.</p>
                )}
              </div>
            </div>
          </div>
        )}
        {loading ? (
          <div
            className={`p-4  bg-white col-span-1 rounded-xl shadow flex justify-center items-center xl:h-auto h-[50svh]`}>
            <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
          </div>
        ) : (
          <div className="p-4  bg-white col-span-1 rounded-xl shadow flex flex-col xl:h-auto h-[50svh]">
            <h3 className="text-azul-marino-500 xl:text-base text-sm flex self-start items-center gap-2 font-medium">
              <IoMaleFemale className="xl:size-4 size-3" />
              Usuarios por Género
            </h3>
            <div className="flex-1 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={test}
                    cx="50%"
                    cy="55%"
                    innerRadius="40%"
                    outerRadius="70%"
                    paddingAngle={2}
                    cornerRadius={7}
                    dataKey="value"
                    onMouseEnter={onPieEnter}>
                    {test.map((entry, index) => (
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
        )}
      </div>
    </>
  );
};
