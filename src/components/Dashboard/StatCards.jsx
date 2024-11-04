import React from 'react'
import { FaUsers, FaUserPlus, FaFireAlt } from "react-icons/fa";
import { BiSolidMessageAltDetail } from "react-icons/bi";

export const StatCards = () => {
    return (
        <div className='row-span-6 col-span-4 gap-4 grid grid-cols-6 grid-rows-2'>
            <Card
                sx={'col-span-3'}
                title={'Usuarios'}
                value={'245'}
                Icon={FaUsers}
            />
            <Card
                sx={'col-span-3'}
                title={'Nuevos Usuarios'}
                value={'28'}
                Icon={FaUserPlus}
            />
            <Card
                sx={'col-span-3'}
                title={'Actividad de Hoy'}
                value={'14'}
                Icon={FaFireAlt}
            />
            <Card
                sx={'col-span-3'}
                title={'Comentarios'}
                value={'50'}
                Icon={BiSolidMessageAltDetail}
            />
        </div>
    )
}

const Card = ({ sx, title, value, Icon }) => {
    return (
        <div className={`${sx} bg-white row-span-1 open-sans p-4 rounded-xl shadow`}>

            <div className='flex h-full flex-col items-center justify-between gap-2 text-azul-marino-500 '>
                <div className='h-full flex flex-col justify-center'>
                    <Icon className='size-11' />
                </div>
                <div className='open-sans self-start'>
                    <h3 className='text-stone-500 text-sm '>{title}</h3>
                    <p className='font-semibold text-4xl'>{value}</p>
                </div>
            </div>

        </div>
    )
}