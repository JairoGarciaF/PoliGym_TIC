import React from 'react'
import { Grid } from './Grid'

export const Dashboard = () => {
    return (
        <div className='bg-white rounded-lg shadow h-[calc(100vh-32px)] p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500  text-3xl font-semibold'>Dashboard</h1>
            <Grid />
        </div>
    )
}
