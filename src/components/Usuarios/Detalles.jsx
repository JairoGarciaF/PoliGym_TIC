import React from 'react';
import { FaCircleInfo } from "react-icons/fa6";

export const Detalles = ({ user }) => {
    return (
        <>
            {user ? (
                <div className="grid grid-cols-12 items-center h-[calc(100%-35px-56px)] bg-white ">
                    {/* Imagen de perfil */}
                    <div className="col-span-4 items-center">
                        {user.imagen != null ? (
                            <img
                                src={user.imagen}
                                alt={user.nombre}
                                className="h-28 w-28 rounded-full object-cover border-stone-200 border"
                            />
                        ) : (
                            <div className="h-28 w-28 bg-gray-200 rounded-full" />
                        )}
                        <Card
                            title={'Nombre'}
                            value={user.nombre}
                        />
                    </div>

                    {/* Información del usuario en cuadrícula */}
                    <div className="col-span-8 grid grid-cols-2 gap-4 text-left text-stone-600 w-full max-w-md">
                        <Card
                            title={'Rol'}
                            value={user.rol}
                        />
                        <Card
                            title={'Edad'}
                            value={user.edad}
                        />
                        <Card
                            title={'Género'}
                            value={user.genero}
                        />
                        <Card
                            title={'Días de actividad'}
                            value={user.diasActividad}
                        />
                        <Card
                            title={'Peso'}
                            value={user.peso}
                        />
                        <Card
                            title={'Altura'}
                            value={user.altura}
                        />
                        <Card
                            title={'Objetivo'}
                            value={user.objetivo}
                        />
                        <Card
                            title={'Nivel'}
                            value={user.nivelFisico}
                        />
                        <Card
                            title={'Comentarios'}
                            value={user.comentarios}
                        />

                    </div>
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center h-[calc(100%-35px-56px)] gap-2'>
                    <FaCircleInfo className='text-stone-300 size-10' />
                    <p className='text-stone-500'>Selecciona un usuario para ver los detalles</p>
                </div>
            )}

        </>
    );
};

const Card = ({ title, value }) => {
    return (
        <div className='bg-white  p-4 rounded border border-stone-300 '>
            <div className='flex items-start justify-between'>
                <div className='open-sans '>
                    <h3 className='text-stone-500 mb-1'>{title}</h3>
                    <div className='flex items-center gap-2 text-azul-marino-500 '>

                        <p className='font-semibold text-4xl'>{value}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
