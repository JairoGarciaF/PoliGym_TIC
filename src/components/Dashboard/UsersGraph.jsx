import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BiMaleFemale } from "react-icons/bi";

const usersPerGender = [
    { id: 0, value: 30, label: 'Masculino' },
    { id: 1, value: 15, label: 'Femenino' },
    { id: 2, value: 5, label: 'Otro' },
];

export const UsersGraph = () => {
    return (
        <div className='bg-white col-span-6 row-span-4 p-4 rounded border flex flex-col items-center border-stone-300 '>
            <h3 className='text-azul-marino-500 mb-1 flex self-start items-center gap-2 font-medium'> <BiMaleFemale className='size-5' />Usuarios por Género</h3>
            <PieChart
                colors={['#0369a1', '#ec4899', '#94a3b8']}
                series={[
                    {
                        data: usersPerGender,
                        innerRadius: 50,
                        outerRadius: 100,
                        paddingAngle: 2,
                        cornerRadius: 7,
                        startAngle: -90,
                        endAngle: 90,
                        cx: 150, // Ajusta la posición horizontal
                        cy: 150, // Ajusta la posición vertical
                    },
                ]}
                width={400}
            />

        </div>
    );
};
