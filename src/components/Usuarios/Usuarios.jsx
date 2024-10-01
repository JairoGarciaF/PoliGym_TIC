import React from 'react'
import { General } from './General'
import { Detalles } from './Detalles'

export const Usuarios = () => {
    return (
        <div className='bg-white rounded-lg pb-4 shadow h-full p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500 text-3xl font-semibold'>Usuarios</h1>
            <General />
            <Detalles />
        </div>

    )
}
