import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar/Sidebar';

export const LayoutWithSidebar = () => {
    return (
        <div className='text-stone-950 bg-stone-100'>
            <div className='grid gap-4 p-4 grid-cols-[220px,_1fr] h-screen'>
                <Sidebar />
                <Outlet />
            </div>
        </div>
    );
};
