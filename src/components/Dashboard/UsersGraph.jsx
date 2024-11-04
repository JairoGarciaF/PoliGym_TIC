import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { BiMaleFemale } from "react-icons/bi";



export const UsersGraph = ({ usuarios }) => {

    // Inicializamos un objeto para contar usuarios por género
    const genderCount = { Masculino: 0, Femenino: 0, Otro: 0 };

    // Contamos los usuarios por género
    usuarios.forEach(persona => {
        if (genderCount[persona.genero] !== undefined) {
            genderCount[persona.genero]++;
        } else {
            genderCount['Otro']++;
        }
    });

    // Creamos el nuevo arreglo para el gráfico circular
    const usersPerGender = [
        { id: 0, value: genderCount.Masculino, label: 'Masculino' },
        { id: 1, value: genderCount.Femenino, label: 'Femenino' },
        { id: 2, value: genderCount.Otro, label: 'Otro' },
    ];

    return (
        <div className='bg-white col-span-4 row-span-6 p-4 rounded-xl shadow flex flex-col items-center '>
            <h3 className='text-azul-marino-500 mb-1 flex text-lg self-start items-center gap-2 font-medium'> <BiMaleFemale className='size-5' />Usuarios por Género</h3>
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
