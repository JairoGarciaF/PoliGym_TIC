import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

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

const generateTableData = (planes) => {
  // Ordenar los planes por totalEnrollments en orden descendente
  const sortedTrainingPlans = [...planes].sort(
    (a, b) => b.totalEnrollments - a.totalEnrollments
  );
  return sortedTrainingPlans;
};

export const TrainingUsageTable = ({ data, loading }) => {
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
        <FaRegCalendarCheck className="xl:size-4 size-3" />
        Uso de Planes
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
            {filteredData.map((plan, index) => (
              <tr key={index} className="bg-white border-b hover:bg-slate-100">
                <th
                  scope="row"
                  className="p-2 md:text-sm text-xs font-medium w-2/5 whitespace-nowrap text-azul-marino-900">
                  {plan.name}
                </th>
                <td className="p-2 text-center lg:text-sm text-xs w-1/5 ">
                  <span
                    className={`px-2 py-1 rounded-full whitespace-nowrap ${getLevelPillColor(
                      plan.level
                    )}`}>
                    {levelTranslate(plan.level)}
                  </span>
                </td>
                <td
                  className={`p-2 text-center md:text-sm text-xs font-medium whitespace-nowrap
                    ${
                      plan.completionPercentage > 70
                        ? "text-green-700"
                        : "text-red-700"
                    }
                  `}>
                  {`${plan.completionPercentage} %`}
                </td>
                <td className="p-2 text-center md:text-sm text-xs whitespace-nowrap">
                  {plan.totalEnrollments}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
