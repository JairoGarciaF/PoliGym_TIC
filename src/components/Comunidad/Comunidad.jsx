import React, { useState } from 'react';
import { Avatar, FormControlLabel, Switch } from '@mui/material';
import { FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";

const defaultProfilePic = 'https://api.dicebear.com/9.x/initials/svg?seed=User';
const defaultCommentPic = 'https://api.dicebear.com/9.x/initials/svg?seed=Comment';

const comentariosIniciales = [
    {
        id: 1,
        imagenPerfil: defaultProfilePic,
        imagenComentario: defaultCommentPic,
        nombre: 'Carlos',
        fecha: '2024-10-15',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 70 kg',
        likes: 12,
    },
    {
        id: 2,
        imagenPerfil: defaultProfilePic,
        nombre: 'Ana',
        fecha: '2024-10-16',
        publico: false,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 100 kg',
        likes: 5,
    },
    {
        id: 3,
        imagenPerfil: defaultProfilePic,
        nombre: 'Pedro',
        fecha: '2024-10-17',
        publico: true,
        oculto: true,
        mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 120 kg',
        likes: 3,
    },
    {
        id: 4,
        imagenPerfil: defaultProfilePic,
        nombre: 'Sofía',
        fecha: '2024-10-18',
        publico: false,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 80 kg',
        likes: 8,
    },
    {
        id: 5,
        imagenPerfil: defaultProfilePic,
        nombre: 'Javier',
        fecha: '2024-10-19',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 110 kg',
        likes: 2,
    },
    {
        id: 6,
        imagenPerfil: defaultProfilePic,
        nombre: 'María',
        fecha: '2024-10-20',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 130 kg',
        likes: 10,
    },
    {
        id: 7,
        imagenPerfil: defaultProfilePic,
        nombre: 'Luis',
        fecha: '2024-10-21',
        publico: false,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 90 kg',
        likes: 6,
    },
    {
        id: 8,
        imagenPerfil: defaultProfilePic,
        nombre: 'Elena',
        fecha: '2024-10-22',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 120 kg',
        likes: 4,
    },
    {
        id: 9,
        imagenPerfil: defaultProfilePic,
        nombre: 'Miguel',
        fecha: '2024-10-23',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 140 kg',
        likes: 7,
    },
    {
        id: 10,
        imagenPerfil: defaultProfilePic,
        nombre: 'Laura',
        fecha: '2024-10-24',
        publico: false,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 100 kg',
        likes: 9,
    },
    {
        id: 11,
        imagenPerfil: defaultProfilePic,
        nombre: 'Raul',
        fecha: '2024-10-25',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 130 kg',
        likes: 11,
    },
    {
        id: 12,
        imagenPerfil: defaultProfilePic,
        nombre: 'Carmen',
        fecha: '2024-10-26',
        publico: true,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Peso Muerto con Barras con un peso de 150 kg',
        likes: 1,
    },
    {
        id: 13,
        imagenPerfil: defaultProfilePic,
        nombre: 'Jorge',
        fecha: '2024-10-27',
        publico: false,
        oculto: false,
        mensaje: 'ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 110 kg',
        likes: 13,
    }
];

export const Comunidad = () => {
    const [comentarios, setComentarios] = useState(comentariosIniciales);
    const [showHidden, setShowHidden] = useState(false);

    const toggleOculto = (id) => {
        setComentarios((prevComentarios) =>
            prevComentarios.map((comentario) =>
                comentario.id === id ? { ...comentario, oculto: !comentario.oculto } : comentario
            )
        );
    };

    const filteredComentarios = comentarios.filter((comentario) => comentario.oculto === showHidden);

    return (
        <div className='bg-white rounded-lg shadow h-full pl-4 py-4'>
            <h1 className='montserrat-alternates pr-4 text-azul-marino-500 text-3xl font-semibold'>Comunidad</h1>


            <nav className="flex justify-between border-b  mr-4">
                <span
                    className='px-4 py-2 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                >
                    Feed
                </span>
                <FormControlLabel
                    control={
                        <Switch
                            selected={showHidden}
                            onChange={() => setShowHidden(!showHidden)}
                            size='small'
                            defaultChecked
                        />
                    }
                    label={showHidden ? 'Ocultos' : 'Visibles'}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontFamily: 'Open Sans',
                            fontSize: '0.875rem',
                        },
                    }}
                />
            </nav>
            <div className='overflow-y-auto pr-4 mt-4 h-[calc(100%-36px-41px-16px)]'>
                <div className=' flex flex-col gap-4'>
                    {filteredComentarios.map((comentario) => (
                        <div key={comentario.id} className={`p-4  border ${comentario.oculto ? 'bg-gray-50' : 'bg-white'} rounded`}>
                            <div className='flex justify-between items-center pb-2 '>
                                <div className='flex items-center gap-2'>
                                    <div className={comentario.oculto ? 'brightness-90' : 'brightness-100'}>
                                        <Avatar src={comentario.imagenPerfil} alt={comentario.nombre} />
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <h2 className={`text-xl font-semibold ${comentario.oculto ? 'text-gray-400' : 'text-gray-800'}`}>{comentario.nombre}</h2>
                                        <span className={`text-xs ${comentario.oculto ? 'text-gray-400' : 'text-gray-500'}`}>{comentario.fecha}</span>
                                    </div>
                                </div>
                                <button
                                    className='flex border rounded px-2 py-1 items-center gap-1 text-sm text-gray-500 hover:text-gray-800'
                                    onClick={() => toggleOculto(comentario.id)}
                                >
                                    {comentario.oculto ? <FaEye /> : <FaEyeSlash />}
                                    {comentario.oculto ? 'Mostrar' : 'Ocultar'}
                                </button>
                            </div>
                            <p className={`${comentario.oculto ? 'text-gray-400' : 'text-gray-800'} pl-12 py-2`}>{comentario.nombre} {comentario.mensaje}</p>
                            <div className='flex items-center justify-start pl-12 pt-2 gap-4'>
                                <div className='flex items-center gap-1'>
                                    <FaHeart className={`${comentario.oculto ? "text-red-400" : "text-red-500"} size-4`} />
                                    <span className={comentario.oculto ? "text-red-400" : "text-red-500"}>{comentario.likes}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
