import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TbBarbell, TbHome, TbMessages, TbTool, TbWeight, TbUsers } from "react-icons/tb";

const CustomButton = ({ Icon, title, to }) => {
    const location = useLocation();

    // Verifica si la ruta actual coincide con la ruta del botón
    const isSelected = location.pathname === to;
    return (
        <Link to={to}>
            <button className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-base open-sans transition-[box-shadow,_background-color,_color] 
                ${isSelected
                    ? 'bg-white font-semibold text-azul-marino-500 shadow'
                    : 'hover:bg-azul-marino-100 hover:text-azul-marino-400 bg-transparent text-stone-500 shadow-none'
                }`}
            >
                <Icon className='h-6 w-6' />
                <p>{title}</p>
            </button>
        </Link>
    );
};
export const RouteSelect = () => {
    return (
        <div>
            <div>
                <nav className='space-y-1'>
                    <CustomButton Icon={TbHome} title="Dashboard" to="/" />
                    <CustomButton Icon={TbUsers} title="Usuarios" to="/usuarios" />
                    <CustomButton Icon={TbWeight} title="Implementos" to="/implementos" />
                    <CustomButton Icon={TbBarbell} title="Ejercicios" to="/ejercicios" />
                    <CustomButton Icon={TbMessages} title="Comunidad" to="/comunidad" />
                    <CustomButton Icon={TbTool} title="Gestión" to="/gestion" />
                </nav>
            </div>
        </div>
    );
};

