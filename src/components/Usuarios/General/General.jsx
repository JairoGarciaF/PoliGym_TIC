import React from 'react';
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { UsersTable } from './UsersTable';
import { UserStatsPieChart } from './UserStatsPieChart';

export const General = ({ usuarios }) => {

    const totalUsuarios = usuarios.filter(user => !user.oculto).length;


    return (
        <div className="h-[calc(100%-36px-49px)]  grid grid-rows-12 p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 grid-cols-12">
            <div className='col-span-6 row-span-2 grid-rows-1 grid grid-cols-2 gap-4'>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='h-full flex flex-col justify-center'>
                        <h3 className='text-stone-500 text-sm '>Usuarios</h3>
                        <div className='open-sans flex text-azul-marino-500 gap-4 items-center'>
                            <FaUsers className='size-9' />
                            <p className='font-semibold text-4xl'>{totalUsuarios}</p>
                        </div>
                    </div>

                </div>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='h-full flex flex-col justify-center'>
                        <h3 className='text-stone-500 text-sm '>Nuevos Usuarios</h3>
                        <div className='open-sans text-azul-marino-500 flex gap-4 items-center'>
                            <FaUserPlus className='size-9' />
                            <p className='font-semibold text-4xl'>2</p>
                        </div>

                    </div>

                </div>
            </div>
            <UsersTable usuarios={usuarios} />
            <UserStatsPieChart usuarios={usuarios} />



        </div>
    );
};