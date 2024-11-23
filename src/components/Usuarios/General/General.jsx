import React from 'react';
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { UsersTable } from './UsersTable';
import { UserStatsPieChart } from './UserStatsPieChart';

export const General = ({ usuarios }) => {

    const totalUsuarios = usuarios.filter(user => user.isActive).length;

    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);

    const nuevosUsuarios = usuarios.filter(usuario => {
        const createAtDate = new Date(usuario.createAt);
        return createAtDate >= unaSemanaAtras;
    });


    return (
        <div className="flex-1 overflow-auto grid xl:grid-rows-12 p-4 bg-slate-100 rounded-xl open-sans gap-4 xl:grid-cols-2">
            <div className='col-span-1 xl:row-span-2 grid-rows-1 grid grid-cols-2 gap-4'>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='h-full flex flex-col justify-center'>
                        <h3 className='text-stone-500 md:text-sm text-xs'>Usuarios</h3>
                        <div className='open-sans flex text-azul-marino-500 gap-4 items-center'>
                            <FaUsers className='md:size-9 size-5' />
                            <p className='font-semibold md:text-3xl text-2xl'>{totalUsuarios}</p>
                        </div>
                    </div>

                </div>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='h-full flex flex-col justify-center'>
                        <h3 className='text-stone-500 md:text-sm text-xs '>Nuevos Usuarios</h3>
                        <div className='open-sans text-azul-marino-500 flex gap-4 items-center'>
                            <FaUserPlus className='md:size-9 size-5' />
                            <p className='font-semibold md:text-3xl text-2xl'>{nuevosUsuarios.length}</p>
                        </div>

                    </div>

                </div>
            </div>
            <UsersTable usuarios={usuarios} />
            <UserStatsPieChart usuarios={usuarios} />



        </div>
    );
};