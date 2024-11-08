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
            <div className={`transition-all duration-300 z-0 ${sidebarExpanded ? 'xl:w-[85%] lg:w-4/5 md:w-3/4 w-1/2' : 'xl:w-[96%] lg:w-[92%] md:w-[90%] w-[88%]'} p-4`}>
                <Outlet />
            </div>
        </div>
    );
};
