import React from 'react';
import FemaleBack from '../BodyMap/FemaleBack';
import FemaleFront from '../BodyMap/FemaleFront';
import MaleFront from '../BodyMap/MaleFront';
import MaleBack from '../BodyMap/MaleBack';



const muscles = ['biceps', 'chest', 'quads'];


export const Implementos = () => {
    return (
        <div className='bg-white rounded-lg pb-4 shadow h-full p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500 text-3xl font-semibold'>Implementos</h1>
            <div className='col-span-4 row-span-6 gap-2  h-full items-center justify-center flex'>
            </div>
        </div>
    )
}
