import React, { useState } from 'react'
import { Grid } from './Grid'

export const Dashboard = () => {
    const [infoMode, setInfoMode] = useState('Semanal');
    return (
        <div className='bg-white rounded-xl flex flex-col shadow h-full p-4'>
            <div className='flex justify-between mb-1 overflow-hidden'>
                <h1 className='montserrat-alternates text-azul-marino-500  text-3xl font-semibold'>Dashboard</h1>
                <nav className="flex justify-start md:w-auto w-1/3 open-sans">
                    <button
                        onClick={() => setInfoMode('Semanal')}
                        className={`p-2 text-xs  truncate rounded-l-lg transition-colors 
                    ${infoMode === 'Semanal'
                                ? 'text-blue-700   bg-blue-100'
                                : 'text-slate-500 border hover:bg-slate-50'}`}
                    >
                        Semanal
                    </button>
                    <button
                        onClick={() => setInfoMode('Mensual')}
                        className={`p-2 text-xs truncate rounded-r-lg  transition-colors 
                    ${infoMode === 'Mensual'
                                ? 'text-cyan-700  bg-cyan-100'
                                : 'text-slate-500 border hover:bg-slate-50'}`}
                    >
                        Mensual
                    </button>
                </nav>
            </div>
            <Grid infoMode={infoMode} />
        </div>
    )
}
