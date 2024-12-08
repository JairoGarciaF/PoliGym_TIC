import React, { useState } from "react";
import { General } from "./General/General";
import { Detalles } from "./Detalles/Detalles";
import { Lista } from "./Lista/Lista";

export const Usuarios = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedUser, setSelectedUser] = useState(null); // Para guardar el usuario seleccionado

  const handleVerDetalles = (user) => {
    setSelectedUser(user); // Guarda el usuario seleccionado
    setActiveTab("detalles"); // Cambia a la pestaña de detalles
  };

  return (
    <div className="bg-white rounded-xl flex flex-col shadow h-full p-4">
      <div className="overflow-hidden">
        <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
          Usuarios
        </h1>

        <nav className="flex justify-start open-sans border-b mb-2 ">
          <button
            onClick={() => setActiveTab("general")}
            className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${
          activeTab === "general"
            ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
            : "text-stone-500 hover:text-azul-marino-300"
        }`}>
            General
          </button>
          <button
            onClick={() => setActiveTab("lista")}
            className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${
          activeTab === "lista"
            ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
            : "text-stone-500 hover:text-azul-marino-300"
        }`}>
            Lista
          </button>
          <button
            onClick={() => setActiveTab("detalles")}
            className={`px-4 py-1 font-semibold lg:text-sm text-xs transition-colors 
        ${
          activeTab === "detalles"
            ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
            : "text-stone-500 hover:text-azul-marino-300"
        }`}>
            Detalles
          </button>
        </nav>
      </div>

      {activeTab === "general" && <General />}
      {activeTab === "lista" && <Lista onVerDetalles={handleVerDetalles} />}
      {activeTab === "detalles" && <Detalles user={selectedUser} />}
    </div>
  );
};
