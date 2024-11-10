import React from 'react'
import { FaUsers, FaUserPlus, FaFireAlt } from "react-icons/fa";
import { BiSolidMessageAltDetail } from "react-icons/bi";

export const StatCards = ({ usuarios }) => {
    const totalUsuarios = usuarios.filter(user => !user.oculto).length;

    return (
        <div className='xl:row-span-1 xl:col-span-1 lg:col-span-2 gap-4 grid xl:grid-cols-2 lg:grid-cols-4 grid-cols-2 xl:grid-rows-2 lg:grid-rows-1 grid-rows-2'>
            <Card
                sx={'col-span-1'}
                title={'Usuarios'}
                value={totalUsuarios}
                Icon={FaUsers}
            />
            <Card
                sx={'col-span-1'}
                title={'Nuevos Usuarios'}
                value={'2'}
                Icon={FaUserPlus}
            />
            <Card
                sx={'col-span-1'}
                title={'Actividad de Hoy'}
                value={'14'}
                Icon={FaFireAlt}
            />
            <Card
                sx={'col-span-1'}
                title={'Comentarios'}
                value={'50'}
                Icon={BiSolidMessageAltDetail}
            />
        </div>
    )
}

const Card = ({ sx, title, value, Icon }) => {
    return (
        <div className={`${sx} bg-white  open-sans p-4 rounded-xl shadow`}>

            <div className='flex h-full xl:flex-col items-center xl:gap-0 gap-4 xl:justify-between  text-azul-marino-500 '>
                <div className='aspect-square xl:flex hidden h-full items-center justify-center'>
                    <Icon className='2xl:size-1/2 size-1/2' />
                </div>
                <div className='open-sans xl:self-start'>
                    <h3 className='text-stone-500 md:text-sm text-xs '>{title}</h3>
                    <div className='flex gap-2 items-center'>
                        <div className='aspect-square xl:hidden flex items-center justify-center'>
                            <Icon className='size-5' />
                        </div>
                        <p className='font-semibold md:text-3xl text-2xl'>{value}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}