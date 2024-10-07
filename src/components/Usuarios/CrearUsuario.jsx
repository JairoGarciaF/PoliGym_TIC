import React, { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { FiTrash } from "react-icons/fi";
import Swal from 'sweetalert2';

export const CrearUsuario = ({ onBack }) => {
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState(null);
    const [rol, setRol] = useState('');
    const [edad, setEdad] = useState('');
    const [genero, setGenero] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [objetivo, setObjetivo] = useState('');
    const [nivelFisico, setNivelFisico] = useState('');
    const [notificaciones, setNotificaciones] = useState(false);

    const handleImagenChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Verificar el tipo de archivo (solo JPG, JPEG o PNG)
            const validTypes = ['image/jpg', 'image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    title: 'Formato incorrecto',
                    text: 'Solo se permiten imágenes en formato JPG, JPEG o PNG.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#16243e',
                });
                return;
            }

            // Verificar el tamaño del archivo (máximo 2MB)
            const maxSize = 2 * 1024 * 1024; // 2MB en bytes
            if (file.size > maxSize) {
                Swal.fire({
                    title: 'Archivo demasiado grande',
                    text: 'El tamaño máximo permitido es de 2MB.',
                    icon: 'warning',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#16243e',

                });
                return;
            }

            // Si pasa las validaciones, actualizar el estado de la imagen
            setImagen(file);
        }
    };

    // Validar y manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar la lógica de creacion del usuario
        console.log({
            nombre,
            edad,
            genero,
            peso,
            altura,
            objetivo,
            nivelFisico,
            notificaciones,
            imagen
        });
        onBack(); // Regresa a la vista anterior después de guardar
    };



    const handleEliminarImagen = () => {
        setImagen(null);
    };

    // Validar que el nombre solo contenga letras, espacios, ñ, tildes
    const handleNombreChange = (e) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(e.target.value)) {
            setNombre(e.target.value);
        }
    };

    // Función para permitir solo la entrada de números
    const handleNumeroInput = (e) => {
        const regex = /^[0-9]*$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white open-sans px-24 py-2">
            <h2 className="text-lg font-semibold montserrat-alternates text-azul-marino-500 pb-4">Crear Usuario</h2>

            {/* Subir Imagen */}
            <div className='grid grid-cols-2 justify-center items-center divide-x-2'>

                <div className="flex items-center justify-center space-x-4">
                    {imagen ? (
                        <img
                            src={URL.createObjectURL(imagen)}
                            alt="Perfil"
                            className="h-28 w-28 rounded-full object-cover border-stone-200 border"
                        />
                    ) : (
                        <div className="h-28 w-28 bg-gray-200 rounded-full " />
                    )}
                    <div className='flex gap-2 items-center'>
                        <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                            <MdOutlineFileUpload className='size-7' />
                            <input type="file" className="hidden" accept=".png, .jpeg, .jpg" onChange={handleImagenChange} />
                        </label>
                        {imagen && (
                            <button
                                onClick={handleEliminarImagen}
                                className=" hover:bg-rojo-100 text-red-500 rounded  p-1.5"
                            >
                                <FiTrash className='size-6' />
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center h-full">
                    <p className=" text-azul-marino-500">
                        Requisitos:
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                        Formatos soportados: JPG, JPEG, PNG.
                    </p>
                    <p className="text-sm text-gray-500">
                        Tamaño máximo: 2MB.
                    </p>
                </div>
            </div>

            <div className='grid grid-cols-12 gap-4'>
                {/* Nombre */}
                <div className='col-span-8'>
                    <label className="block text-sm font-medium text-azul-marino-500">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={handleNombreChange}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Rol</label>
                    <select
                        value={rol}
                        onChange={(e) => setRol(e.target.value)}
                        className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                    >
                        <option value="Usuario">Usuario</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>

                {/* Edad y Género */}
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Edad</label>
                    <input
                        type="number"
                        min={18}
                        max={100}
                        step={1}
                        value={edad}
                        onKeyPress={handleNumeroInput}
                        inputMode="numeric"
                        onChange={(e) => setEdad(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"

                    />
                </div>
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Género</label>
                    <select
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                {/* Peso y Altura */}
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Peso (Kg)</label>
                    <input
                        type="number"
                        min={30}
                        max={200}
                        step={1}
                        value={peso}
                        onKeyPress={handleNumeroInput}
                        inputMode="numeric"
                        onChange={(e) => setPeso(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Altura (cm)</label>
                    <input
                        type="number"
                        min={100}
                        max={250}
                        step={1}
                        value={altura}
                        onKeyPress={handleNumeroInput}
                        inputMode="numeric"
                        onChange={(e) => setAltura(e.target.value)}
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    />
                </div>

                {/* Objetivo */}
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Objetivo</label>
                    <select
                        value={objetivo}
                        onChange={(e) => setObjetivo(e.target.value)}
                        className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                    >
                        <option value="Ganar fuerza">Ganar fuerza</option>
                        <option value="Ganar músculo">Ganar músculo</option>
                        <option value="Perder peso">Perder peso</option>
                    </select>
                </div>

                {/* Nivel de Estado Físico */}
                <div className='col-span-4'>
                    <label className="block text-sm font-medium text-azul-marino-500">Nivel de Estado Físico</label>
                    <select
                        value={nivelFisico}
                        onChange={(e) => setNivelFisico(e.target.value)}
                        className="mt-1 p-2 block w-full border bg-white border-gray-300 rounded-md"
                    >
                        <option value="Principiante">Principiante</option>
                        <option value="Intermedio">Intermedio</option>
                        <option value="Avanzado">Avanzado</option>
                    </select>
                </div>


            </div>

            {/* Recibir Notificaciones */}
            <div className="flex items-center gap-2 mt-4">
                <span className='text-azul-marino-500 text-sm'>Recibir Notificaciones</span>
                <label className="block text-sm font-medium text-azul-marino-500">

                    <input
                        type="checkbox"
                        checked={notificaciones}
                        onChange={(e) => setNotificaciones(e.target.checked)}
                        className="sr-only peer"
                    />
                    <div className={`relative w-9 h-5 peer-focus:outline-none rounded-full peer bg-gray-400 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all border-gray-600 peer-checked:bg-green-500`}></div>
                </label>

            </div>




            <div className='flex gap-2 justify-end'>
                {/* Botón para regresar */}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onBack}
                        className="bg-azul-marino-500 text-white px-4 py-2 rounded hover:bg-azul-marino-700"
                    >
                        Volver
                    </button>
                </div>

                {/* Botón para crear usuario */}
                <div className="mt-4 flex justify-end">
                    <button
                        className="bg-azul-marino-500 text-white px-4 py-2 rounded hover:bg-azul-marino-700"
                    >
                        Crear
                    </button>
                </div>
            </div>
        </form>
    );
};
