import React from "react";
import { LuDumbbell } from "react-icons/lu";
import { BiLoaderCircle } from "react-icons/bi";

const categoryTranslate = (category) => {
  switch (category) {
    case "STRENGTH":
      return "Fuerza";
    case "FLEXIBILITY":
      return "Flexibilidad";
    case "CARDIO":
      return "Cardio";
  }
};

const levelTranslate = (status) => {
  switch (status) {
    case "BASIC":
      return "Básico";
    case "INTERMEDIATE":
      return "Intermedio";
    case "ADVANCED":
      return "Avanzado";
  }
};

// Función que devuelve el color según la categoría
const getCategoryPillColor = (category) => {
  switch (category) {
    case "STRENGTH":
      return "bg-blue-100 text-blue-900";
    case "CARDIO":
      return "bg-orange-100 text-orange-700";
    case "FLEXIBILITY":
      return "bg-lime-100 text-lime-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

// Función que devuelve el color según el nivel
const getLevelPillColor = (level) => {
  switch (level) {
    case "BASIC":
      return "bg-green-100 text-green-700";
    case "INTERMEDIATE":
      return "bg-yellow-100 text-yellow-700";
    case "ADVANCED":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const generateTableData = (rutinas) => {
  // Ordenar los rutinas por totalUses en orden descendente
  const sortedRoutines = [...rutinas].sort((a, b) => b.totalUses - a.totalUses);
  return sortedRoutines;
};

export const WorkoutUsageTable = ({ data, loading }) => {
  const filteredData = generateTableData(data);

  if (loading) {
    return (
      <div
        className={` flex flex-col bg-white p-4 rounded-xl shadow xl:col-span-7 justify-center items-center xl:h-full h-[50svh]`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow xl:col-span-7 xl:h-full h-[50svh]">
      <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
        <LuDumbbell className="xl:size-4 size-3" />
        Uso de Rutinas
      </h3>

      {/* Control del contenedor de la tabla */}
      <div className="relative flex-1 overflow-x-auto overflow-y-auto border sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500">
          <thead className="text-xs text-white  rounded uppercase bg-azul-marino-500">
            <tr>
              <th scope="col" className="p-2">
                Nombre
              </th>
              <th scope="col" className="p-2 text-center">
                Categoría
              </th>
              <th scope="col" className="p-2 text-center">
                Nivel
              </th>
              <th scope="col" className="p-2 text-center truncate">
                Finalización
              </th>
              <th scope="col" className="p-2 text-center">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((rutina, index) => (
              <tr key={index} className="bg-white border-b hover:bg-slate-100">
                <th
                  scope="row"
                  className="p-2 md:text-sm text-xs font-medium w-2/5 whitespace-nowrap text-azul-marino-900">
                  {rutina.name}
                </th>
                <td className="p-2 text-center w-1/5 ">
                  <span
                    className={`px-2 py-1 lg:text-sm text-xs rounded-full whitespace-nowrap ${getCategoryPillColor(
                      rutina.category
                    )}`}>
                    {categoryTranslate(rutina.category)}
                  </span>
                </td>
                <td className="p-2 text-center lg:text-sm text-xs w-1/5 ">
                  <span
                    className={`px-2 py-1 rounded-full whitespace-nowrap ${getLevelPillColor(
                      rutina.level
                    )}`}>
                    {levelTranslate(rutina.level)}
                  </span>
                </td>
                <td
                  className={`p-2 text-center md:text-sm text-xs font-medium whitespace-nowrap
                    ${
                      rutina.completionPercentage > 80
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  `}>
                  {`${rutina.completionPercentage} %`}
                </td>
                <td className="p-2 text-center md:text-sm text-xs whitespace-nowrap">
                  {rutina.totalUses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
