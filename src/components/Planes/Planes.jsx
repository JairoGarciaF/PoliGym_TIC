import React, { useState } from "react";
import { Entrenamiento } from "./Entrenamiento/Entrenamiento";
import { Alimentacion } from "./Alimentacion/Alimentacion";

export const Planes = () => {
  const [activeTab, setActiveTab] = useState("entrenamiento");
  return (
    <div className="bg-white rounded-xl flex flex-col shadow h-full p-4">
      <div>
        <div className="flex justify-between overflow-hidden">
          <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
            Planes
          </h1>
        </div>
        <nav className="flex justify-between items-end open-sans border-b mb-2">
          <div>
            <button
              onClick={() => setActiveTab("entrenamiento")}
              className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${
                      activeTab === "entrenamiento"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500 hover:text-azul-marino-300"
                    }`}>
              Entrenamiento
            </button>
          </div>
        </nav>
      </div>

      {activeTab === "entrenamiento" && <Entrenamiento />}
      {activeTab === "alimentacion" && <Alimentacion />}
    </div>
  );
};
