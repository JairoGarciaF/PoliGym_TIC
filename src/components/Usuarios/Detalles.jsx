import React from 'react'

export const Detalles = ({ user }) => {
    return (
        <div>
            <h2>Detalles del Usuario</h2>
            {user ? (
                <div>
                    <p>Nombre: {user.nombre}</p>
                    <p>Edad: {user.edad}</p>
                    <p>Género: {user.genero}</p>
                    <p>Días de Actividad: {user.diasActividad}</p>
                    <p>Comentarios: {user.comentarios}</p>
                    <p>Rol: {user.rol}</p>
                </div>
            ) : (
                <p>No hay usuario seleccionado.</p>
            )}
        </div>
    );
};
