import React, { useState } from 'react';
import { General } from './General';
import { Detalles } from './Detalles/Detalles';

export const Usuarios = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [selectedUser, setSelectedUser] = useState(null); // Para guardar el usuario seleccionado

    const handleVerDetalles = (user) => {
        setSelectedUser(user); // Guarda el usuario seleccionado
        setActiveTab('detalles'); // Cambia a la pestaña de detalles
    };

    return (
        <div className='bg-white rounded-lg shadow h-full p-4'>
            <h1 className='montserrat-alternates text-azul-marino-500 text-3xl font-semibold'>Usuarios</h1>

            <nav className="flex justify-start open-sans border-b  ">
                <button
                    onClick={() => setActiveTab('general')}
                    className={`px-4 py-2 font-semibold text-sm transition-colors 
                    ${activeTab === 'general'
                            ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                            : 'text-stone-500 hover:text-azul-marino-300'}`}
                >
                    General
                </button>
                <button
                    onClick={() => setActiveTab('detalles')}
                    className={`px-4 py-2 font-semibold text-sm transition-colors 
                    ${activeTab === 'detalles'
                            ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                            : 'text-stone-500 hover:text-azul-marino-300'}`}
                >
                    Detalles
                </button>
            </nav>

            {activeTab === 'general' && <General onVerDetalles={handleVerDetalles} />}
            {activeTab === 'detalles' && <Detalles user={selectedUser} />} {/* Pasar el usuario seleccionado */}
        </div>
    );
}
