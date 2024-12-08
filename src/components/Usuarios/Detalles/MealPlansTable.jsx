import React, { useState, useEffect } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import { BiLoaderCircle } from "react-icons/bi";
import { findNutritionPlanById } from "../../../services/plans/nutritionPlan";

const categoryTranslate = (category) => {
  switch (category) {
    case "WEIGHT_LOSS":
      return "Pérdida de peso";
    case "MUSCLE_GAIN":
      return "Ganancia de músculo";
    case "DEFINITION":
      return "Definición";
  }
};

const categoryColor = (category) => {
  switch (category) {
    case "WEIGHT_LOSS":
      return "bg-sky-100 text-sky-700";
    case "MUSCLE_GAIN":
      return "bg-purple-100 text-purple-700";
    case "DEFINITION":
      return "bg-orange-100 text-orange-700";
  }
};

export const MealPlansTable = ({ plansIds }) => {
  const [nutritionPlans, setNutritionPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrainingPlans = async () => {
      try {
        setLoading(true);
        // Limitar los IDs a un máximo de 10
        const limitedIds = plansIds.slice(0, 10);

        // Obtener los detalles de cada plan
        const plans = await Promise.all(
          limitedIds.map(async (id) => {
            const plan = await findNutritionPlanById(id);
            // Extraer solo los campos necesarios
            return {
              name: plan.name,
              category: plan.category,
            };
          })
        );

        setNutritionPlans(plans);
      } catch (error) {
        console.error("Error fetching training plans:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingPlans();
  }, []);

  //   const [activeTab, setActiveTab] = useState("Activo");

  //   // Filtra los planes según el estado activo ('Activo' o 'Finalizado')
  //   const filteredPlans = planesAlimentacion.filter(
  //     (plan) => plan.estado == activeTab
  //   );

  if (loading) {
    return (
      <div
        className={`col-span-1 row-span-1 p-4 bg-white xl:h-full h-[50svh]  rounded-xl shadow flex justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="col-span-1 row-span-1 p-4 bg-white xl:h-full h-[50svh]  rounded-xl shadow flex flex-col">
      <h3 className="text-azul-marino-500 xl:text-base text-sm  font-medium flex items-center gap-1">
        <PiBowlFoodFill className="xl:size-4 size-3" />
        Planes de Alimentación
      </h3>
      {/* <nav className="flex justify-start mb-1 open-sans border-b  ">
        <button
          onClick={() => setActiveTab("Activo")}
          className={`p-2  text-xs transition-colors 
                    ${
                      activeTab === "Activo"
                        ? "text-green-600 border-b-2 border-green-600 bg-gradient-to-t from-green-50"
                        : "text-slate-500 hover:text-azul-marino-300 "
                    }`}>
          Activo
        </button>
        <button
          onClick={() => setActiveTab("Finalizado")}
          className={`p-2  text-xs transition-colors 
                    ${
                      activeTab === "Finalizado"
                        ? "text-red-600 border-b-2 border-red-600 bg-gradient-to-t from-red-50"
                        : "text-slate-500 hover:text-azul-marino-300"
                    }`}>
          Finalizado
        </button>
      </nav> */}
      <div className="relative flex-1 overflow-x-auto border rounded-xl mt-1">
        <div className="h-full overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
            <thead className="text-xs text-white  rounded uppercase bg-azul-marino-500 ">
              <tr>
                <th scope="col" className="p-2 ">
                  Nombre
                </th>
                <th scope="col" className="p-2 text-center">
                  Categoría
                </th>
              </tr>
            </thead>
            <tbody>
              {nutritionPlans.map((plan, index) => (
                <tr
                  key={index}
                  className="bg-white border-b hover:bg-slate-100 ">
                  <th
                    scope="row"
                    className="p-2 md:text-sm text-xs font-medium  text-azul-marino-900 ">
                    {plan.name}
                  </th>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full lg:text-sm text-xs whitespace-nowrap ${categoryColor(
                        plan.category
                      )}`}>
                      {categoryTranslate(plan.category)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
