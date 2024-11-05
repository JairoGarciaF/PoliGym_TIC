import React, { useState } from 'react';
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaShieldAlt, FaUser, FaSearch, FaEye, FaEyeSlash, FaList } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import { GenderGraph } from './GenderGraph';


//Card usuarios y nuevos usuarios
//pastel de genero
//TAbla de usuarios por horario con suma ****
//pastel tipo de usuario11

export const General = ({ usuarios }) => {


    return (
        <div className="h-[calc(100%-36px-49px)]  grid grid-rows-12 p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 grid-cols-12">
            <div className='col-span-2 row-span-6 grid-rows-6 grid grid-cols-1 gap-4'>
                <div className={`col-span-1 row-span-3 bg-white  open-sans p-4 rounded-xl shadow`}>

                    <div className='flex h-full flex-col items-center justify-between gap-2 text-azul-marino-500 '>
                        <div className='h-full flex flex-col justify-center'>
                            <FaUsers className='size-11' />
                        </div>
                        <div className='open-sans self-start'>
                            <h3 className='text-stone-500 text-sm '>Usuarios</h3>
                            <p className='font-semibold text-4xl'>245</p>
                        </div>
                    </div>

                </div>
                <div className={`col-span-1 row-span-3 bg-white  open-sans p-4 rounded-xl shadow`}>

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



        </div>
    );
};