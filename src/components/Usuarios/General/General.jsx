import React from 'react';
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { GenderGraph } from './GenderGraph';
import { UsersTable } from './UsersTable';
import { UsersType } from './UsersType';
import { UsersSchedule } from './UsersSchedule';

//pastel tipo de usuario11
//pastel horario de usuario

export const General = ({ usuarios }) => {


    return (
        <div className="h-[calc(100%-36px-49px)]  grid grid-rows-12 p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 grid-cols-12">
            <div className='col-span-6 row-span-2 grid-rows-1 grid grid-cols-2 gap-4'>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='flex h-full  items-center justify-between gap-2 text-azul-marino-500 '>
                        <div className='h-full flex flex-col justify-center'>
                            <h3 className='text-stone-500 text-sm '>Usuarios</h3>
                            <div className='open-sans self-start flex'>
                                <FaUsers className='size-11' />
                                <p className='font-semibold text-4xl'>245</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className={`col-span-1 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='flex h-full flex-col items-center justify-between gap-2 text-azul-marino-500 '>
                        <div className='h-full flex flex-col justify-center'>
                            <FaUserPlus className='size-11' />
                        </div>
                        <div className='open-sans self-start'>
                            <h3 className='text-stone-500 text-sm '>Nuevos Usuarios</h3>
                            <p className='font-semibold text-4xl'>28</p>
                        </div>
                    </div>

                </div>
            </div>
            <GenderGraph usuarios={usuarios} />
            <UsersTable usuarios={usuarios} />
            {/* <UsersType usuarios={usuarios} />
            <UsersSchedule usuarios={usuarios} /> */}



        </div>
    );
};