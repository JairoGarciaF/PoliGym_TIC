import React, { useState, useEffect } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { FaDumbbell } from "react-icons/fa6";

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

const getPillColor = (category) => {
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

export const EquipmentTable = ({ data, loading }) => {
  //   // Filtrar los datos según el tab seleccionado
  //   const filteredData = data.map((implemento) => ({
  //     ...implemento,
  //     uso:
  //       infoMode === "Semanal"
  //         ? implemento.uso_semanal_total
  //         : implemento.uso_mensual_total, // Mostrar uso según el tab
  //   }));

  if (loading) {
    return (
      <div
        className={` flex flex-col bg-white p-4 rounded-xl shadow  justify-center items-center xl:h-full h-[50svh]`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white p-4 rounded-xl shadow xl:h-full h-[50svh] ">
      <h3 className="text-azul-marino-500 xl:text-base text-sm  mb-1 flex self-start items-center gap-2 font-medium">
        <FaDumbbell className="xl:size-4 size-3" />
        Uso de Equipos
      </h3>

      {/* Control del contenedor de la tabla */}
      <div className="relative flex-1 overflow-x-auto overflow-y-auto border rounded-xl ">
        <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500">
          <thead className="text-xs text-white rounded uppercase bg-azul-marino-500">
            <tr>
              <th scope="col" className="p-2 ">
                Equipo
              </th>
              <th scope="col" className="p-2  text-center">
                Categoría
              </th>
              <th scope="col" className="p-2  text-center">
                Uso
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((equipo, index) => (
              <tr key={index} className="bg-white border-b hover:bg-slate-100">
                <th
                  scope="row"
                  className="p-2 font-medium md:text-sm text-xs w-1/2 whitespace-nowrap text-azul-marino-900">
                  {equipo.name}
                </th>
                <td className="p-2 text-center w-1/4 ">
                  <span
                    className={`px-2 py-1 lg:text-sm text-xs rounded-full whitespace-nowrap ${getPillColor(
                      equipo.category
                    )}`}>
                    {categoryTranslate(equipo.category)}
                  </span>
                </td>
                <td className="p-2 text-center md:text-sm text-xs whitespace-nowrap">
                  {equipo.totalUses}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
