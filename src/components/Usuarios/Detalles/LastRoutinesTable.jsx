import React from "react";

const translateLevel = (level) => {
  switch (level) {
    case "BASIC":
      return "Básico";
    case "INTERMEDIATE":
      return "Intermedio";
    case "ADVANCED":
      return "Avanzado";
    default:
      return "n/a";
  }
};

const translateCategory = (category) => {
  switch (category) {
    case "STRENGTH":
      return "Fuerza";
    case "CARDIO":
      return "Cardio";
    case "FLEXIBILITY":
      return "Flexibilidad";
    default:
      return "n/a";
  }
};

const categoryColor = (category) => {
  switch (category) {
    case "STRENGTH":
      return "bg-blue-100 text-blue-900";
    case "CARDIO":
      return "bg-orange-100 text-orange-700";
    case "FLEXIBILITY":
      return "bg-lime-100 text-lime-700";
  }
};

const levelColor = (level) => {
  switch (level) {
    case "BASIC":
      return "bg-green-100 text-green-700";
    case "INTERMEDIATE":
      return "bg-yellow-100 text-yellow-700";
    case "ADVANCED":
      return "bg-red-100 text-red-700";
  }
};

export const LastRoutinesTable = ({ ultimasRutinas }) => {
  return (
    <div className="relative xl:h-1/2 xl:w-full sm:w-1/2 sm:h-full h-[50svh] overflow-x-auto border rounded-xl">
      <div className="h-full overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
          <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
            <tr>
              <th scope="col" className="p-2">
                Rutina
              </th>
              <th scope="col" className="p-2 text-center ">
                Categoría
              </th>
              <th scope="col" className="p-2 text-center">
                Nivel
              </th>
            </tr>
          </thead>
          <tbody>
            {ultimasRutinas.map((rutina, index) => (
              <tr key={index} className="bg-white border-b hover:bg-slate-100 ">
                <th
                  scope="row"
                  className="p-2 whitespace-nowrap md:text-sm text-xs font-medium text-azul-marino-900 ">
                  {rutina.name}
                </th>

                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full whitespace-nowrap lg:text-sm text-xs ${categoryColor(
                      rutina.category
                    )}`}>
                    {translateCategory(rutina.category)}
                  </span>
                </td>
                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-full whitespace-nowrap md:text-sm text-xs  ${levelColor(
                      rutina.level
                    )}`}>
                    {translateLevel(rutina.level)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
