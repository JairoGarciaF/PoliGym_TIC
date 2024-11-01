import React from 'react'
import { FaUsers, FaUserPlus } from "react-icons/fa";

export const StatCards = () => {
    return (
        <>
            <Card
                title={'Usuarios'}
                value={'14.5K'}
                Icon={FaUsers}
            />
            <Card
                title={'Nuevos Usuarios'}
                value={'1.5K'}
                Icon={FaUserPlus}
            />
        </>
    )
}

const Card = ({ title, value, Icon }) => {
    return (
        <div className='bg-white row-span-2 col-span-3 p-4 rounded-xl shadow'>
            <div className='flex items-start justify-between'>
                <div className='open-sans '>
                    <h3 className='text-stone-500 mb-1'>{title}</h3>
                    <div className='flex items-center gap-2 text-azul-marino-500 '>
                        <Icon className='size-6' />
                        <p className='font-semibold text-4xl'>{value}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}