import React, { useState } from "react";
import { GestionRutinas } from "./GestionRutinas/GestionRutinas";
import { PlanEntrenamiento } from "./PlanEntrenamiento/PlanEntrenamiento";
import { PlanAlimentacion } from "./PlanAlimentacion/PlanAlimentacion";
import { GestionEquipo } from "./GestionEquipo/GestionEquipo";
import { GestionEjercicios } from "./GestionEjercicios/GestionEjercicios";

export const Gestion = () => {
  const [activeTab, setActiveTab] = useState("equipos");

  return (
    <div className="bg-white rounded-xl pb-4 shadow p-4 h-full flex flex-col">
      <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
        Gestión
      </h1>

      <nav className="flex justify-start open-sans border-b mb-2 overflow-auto  ">
        <button
          onClick={() => setActiveTab("equipos")}
          className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
                    ${
                      activeTab === "equipos"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500  hover:text-azul-marino-300"
                    }`}>
          Equipos
        </button>
        <button
          onClick={() => setActiveTab("ejercicios")}
          className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
                    ${
                      activeTab === "ejercicios"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500  hover:text-azul-marino-300"
                    }`}>
          Ejercicios
        </button>
        <button
          onClick={() => setActiveTab("rutinas")}
          className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
                    ${
                      activeTab === "rutinas"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500  hover:text-azul-marino-300"
                    }`}>
          Rutinas
        </button>
        <button
          onClick={() => setActiveTab("planEntrenamiento")}
          className={`px-4 py-1 font-semibold whitespace-nowrap lg:text-sm text-xs transition-colors 
                    ${
                      activeTab === "planEntrenamiento"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500  hover:text-azul-marino-300"
                    }`}>
          Planes de Entrenamiento
        </button>
        <button
          onClick={() => setActiveTab("planAlimentacion")}
          className={`px-4 py-1 font-semibold whitespace-nowrap lg:text-sm text-xs transition-colors 
                    ${
                      activeTab === "planAlimentacion"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500  hover:text-azul-marino-300"
                    }`}>
          Planes de Alimentación
        </button>
      </nav>

      {activeTab === "equipos" && <GestionEquipo />}
      {activeTab === "ejercicios" && <GestionEjercicios />}
      {activeTab === "rutinas" && <GestionRutinas />}
      {activeTab === "planEntrenamiento" && <PlanEntrenamiento />}
      {activeTab === "planAlimentacion" && <PlanAlimentacion />}
    </div>
  );
};
