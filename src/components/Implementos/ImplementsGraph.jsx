import React, { useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { FaCalendarAlt } from "react-icons/fa";


const colors = ['#365314', '#84cc16', '#d9f99d', '#15803d', '#22c55e', '#64748b'];


export const ImplementsGraph = ({ data }) => {
    return (
        <div className='bg-white p-4 rounded border h-[calc(100%-1px)]   border-stone-300'>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'> <FaCalendarAlt className='size-4' />Rutinas Populares</h3>

            <div className='h-[calc(100%-28px)]  flex items-center justify-center'>
                <PieChart
                    colors={colors}
                    series={[
                        {
                            data: data,
                            highlightScope: { fade: 'global', highlight: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                            innerRadius: '10%',
                            outerRadius: '90%',
                            paddingAngle: 2,
                            cornerRadius: 7,
                            startAngle: 0,
                            endAngle: 360,
                            cx: '50%',
                            cy: '50%',
                        },
                    ]}
                    slotProps={{

                        legend: {
                            // Hacer mas pequeño
                            labelStyle: {
                                fontSize: 12,
                                fontFamily: 'Open Sans',
                            },
                            position: { vertical: 'middle', horizontal: 'right' },
                            direction: 'column',

                            itemMarkHeight: 10,
                        },
                    }}
                />
            </div>
        </div>
    )
}
