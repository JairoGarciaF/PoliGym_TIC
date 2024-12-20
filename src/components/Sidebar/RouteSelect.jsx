import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  TbBarbell,
  TbHome,
  TbMessages,
  TbTool,
  TbWeight,
  TbUsers,
} from "react-icons/tb";
import { FaRegCalendarCheck } from "react-icons/fa";
import { LuDumbbell } from "react-icons/lu";

const CustomButton = ({ Icon, title, expanded, to }) => {
  const location = useLocation();

  // Verifica si la ruta actual coincide con la ruta del botón
  const isSelected = location.pathname === to;
  return (
    <Link to={to}>
      <button
        className={`flex items-center justify-center gap-2 w-full rounded px-2 py-1.5 text-base open-sans transition-[box-shadow,_background-color,_color] 
                ${
                  isSelected
                    ? "text-white font-semibold bg-azul-marino-500 shadow"
                    : "hover:bg-slate-200 hover:text-azul-marino-500 bg-transparent text-azul-marino-400 shadow-none"
                }`}>
        <Icon className="h-6 w-6" />
        <span
          className={`text-start overflow-hidden transition-all ${
            expanded ? "w-full" : "hidden"
          }`}>
          {title}
        </span>
      </button>
    </Link>
  );
};
export const RouteSelect = ({ expanded }) => {
  return (
    <div className="flex-1 flex flex-col gap-1">
      <CustomButton
        Icon={TbHome}
        title="Dashboard"
        expanded={expanded}
        to="/"
      />
      <CustomButton
        Icon={TbUsers}
        title="Usuarios"
        expanded={expanded}
        to="/usuarios"
      />
      <CustomButton
        Icon={TbWeight}
        title="Equipo"
        expanded={expanded}
        to="/equipo"
      />
      <CustomButton
        Icon={TbBarbell}
        title="Ejercicios"
        expanded={expanded}
        to="/ejercicios"
      />
      <CustomButton
        Icon={LuDumbbell}
        title="Rutinas"
        expanded={expanded}
        to="/rutinas"
      />
      <CustomButton
        Icon={FaRegCalendarCheck}
        title="Planes"
        expanded={expanded}
        to="/planes"
      />
      <CustomButton
        Icon={TbMessages}
        title="Comunidad"
        expanded={expanded}
        to="/comunidad"
      />
      <CustomButton
        Icon={TbTool}
        title="Gestión"
        expanded={expanded}
        to="/gestion"
      />
    </div>
  );
};
