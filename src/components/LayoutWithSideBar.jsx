import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';
import { useState } from 'react';

export const LayoutWithSidebar = () => {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    return (
        <div className="text-gray-950 bg-slate-100 h-screen flex">
            {/* Sidebar con control de estado */}
            <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

            {/* Contenido principal que se ajusta dinámicamente según el estado del sidebar */}
            <div className={`transition-all duration-300 z-0 ${sidebarExpanded ? 'w-[85%]' : 'w-[96%]'} p-4`}>
                <Outlet />
            </div>
        </div>
    );
};
