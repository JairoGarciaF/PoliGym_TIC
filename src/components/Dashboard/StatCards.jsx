import React from 'react'
import { FaUsers, FaUserPlus, FaFireAlt } from "react-icons/fa";
import { BiSolidMessageAltDetail } from "react-icons/bi";

export const StatCards = ({ usuarios }) => {
    const totalUsuarios = usuarios.filter(user => !user.oculto).length;

    return (
        <div className='xl:row-span-1 xl:col-span-1  gap-4 grid xl:grid-cols-2 lg:grid-cols-4 grid-cols-2'>
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

            <div className='flex h-full md:flex-col items-center justify-between gap-2 text-azul-marino-500 '>
                <Icon className='md:size-11 size-7' />
                <div className='open-sans md:self-start'>
                    <h3 className='text-stone-500 md:text-sm text-xs '>{title}</h3>
                    <p className='font-semibold md:text-4xl text-2xl'>{value}</p>
                </div>
            </div>

        </div>
    )
}