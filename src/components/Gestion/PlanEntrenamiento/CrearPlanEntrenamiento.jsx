import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'; import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';


const initialRoutines = [
    {
        id: 1,
        nombre: 'Rutina de Fuerza',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['chest', 'lowerBack', 'quads'],
        ejercicios: [
            {
                id: 6,
                nombre: 'Press de Banca',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 7,
                nombre: 'Peso Muerto',
                series: 4,
                repeticiones: 6,
                tiempoDescanso: 120
            },
            {
                id: 8,
                nombre: 'Sentadillas',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 2,
        nombre: 'Rutina de Hipertrofia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: true,
        musculos: ['biceps', 'chest', 'shoulders'],
        ejercicios: [
            {
                id: 9,
                nombre: 'Curl de Bíceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 10,
                nombre: 'Press Militar',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 11,
                nombre: 'Fondos en Paralelas',
                series: 3,
                repeticiones: 15,
                tiempoDescanso: 60
            }
        ]
    },
    {
        id: 3,
        nombre: 'Rutina de Resistencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Baja',
        oculto: false,
        musculos: ['quads', 'abdominals'],
        ejercicios: [
            {
                id: 12,
                nombre: 'Zancadas',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 13,
                nombre: 'Elevaciones de Piernas',
                series: 4,
                repeticiones: 15,
                tiempoDescanso: 45
            }
        ]
    },
    {
        id: 4,
        nombre: 'Rutina de Potencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: true,
        musculos: ['traps', 'shoulders', 'quads'],
        ejercicios: [
            {
                id: 14,
                nombre: 'Arranque con Barra',
                series: 5,
                repeticiones: 5,
                tiempoDescanso: 120
            },
            {
                id: 15,
                nombre: 'Press de Hombro con Mancuernas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 16,
                nombre: 'Dominadas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 5,
        nombre: 'Rutina de Volumen',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: false,
        musculos: ['biceps', 'quads'],
        ejercicios: [
            {
                id: 17,
                nombre: 'Sentadilla Hack',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 18,
                nombre: 'Press Francés',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 19,
                nombre: 'Extensiones de Cuádriceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            }
        ]
    }
];

// Flitrar las rutinas que estan visibles
const visibleRoutines = initialRoutines.filter(rutina => !rutina.oculto);

// Días de la semana preestablecidos
const daysOfWeek = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];

export const CrearPlanEntrenamiento = ({ onBack }) => {
    const [nombre, setNombre] = useState('');
    const [imagenPlanEntrenamiento, setImagenPlanEntrenamiento] = useState(null);
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState(0);
    const [dificultad, setDificultad] = useState('');
    const [detalleDias, setDetalleDias] = useState({
        lunes: "Descanso",
        martes: "Descanso",
        miércoles: "Descanso",
        jueves: "Descanso",
        viernes: "Descanso"
    });

    // Función para cambiar el valor de la rutina seleccionada para un día
    const handleDayChange = (day, value) => {
        setDetalleDias(prevState => ({
            ...prevState,
            [day]: value === "Descanso" ? "Descanso" : visibleRoutines.find(r => r.id === value)
        }));
    };

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
            setImagenPlanEntrenamiento(file);
        }
    };

    const handleEliminarImagen = () => {
        setImagenPlanEntrenamiento(null);
    };

    // Validar que el nombre solo contenga letras, espacios, ñ, tildes
    const handleNombreChange = (e) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(parseInt(e.target.value))) {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            nombre,
            imagenPlanEntrenamiento,
            descripcion,
            duracion,
            dificultad,
            oculto: false,
            detalleDias
        });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white open-sans px-24 h-full flex flex-col">
            <div className='flex flex-col h-[calc(100%-37px)]'>
                <h2 className="text-lg font-semibold montserrat-alternates text-azul-marino-500 pb-4">Crear Plan de Entrenamiento</h2>
                {/* Subir Imagen */}
                <div className='grid grid-cols-2 justify-center items-center divide-x-2'>

                    <div className="flex items-center justify-center space-x-4">
                        {imagenPlanEntrenamiento ? (
                            <img
                                src={imagenPlanEntrenamiento}
                                alt="Plan Entrenamiento"
                                className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
                            />
                        ) : (
                            <div className="h-28 w-28 bg-gray-200 rounded-lg " />
                        )}
                        <div className='flex gap-2 items-center'>
                            <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                                <MdOutlineFileUpload className='size-7' />
                                <input type="file" className="hidden" accept=".png, .jpeg, .jpg" onChange={handleImagenChange} />
                            </label>
                            {imagenPlanEntrenamiento && (
                                <button
                                    onClick={handleEliminarImagen}
                                    className=" hover:bg-rojo-100 text-red-500 rounded  p-1.5"
                                >
                                    <AiOutlineDelete className='size-6' />
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


                {/* Otros campos del formulario */}
                <Grid container spacing={2} className='pt-4'
                    sx={{
                        '& .MuiFormLabel-root':
                        {
                            fontFamily: 'Open Sans',
                        },
                    }}>
                    <Grid size={6}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            fullWidth
                            size='small'
                        />
                    </Grid>
                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Dificultad</InputLabel>
                            <Select
                                label='Dificultad'
                                value={dificultad}
                                onChange={(e) => setDificultad(e.target.value)}
                            >
                                <MenuItem value="Baja">Baja</MenuItem>
                                <MenuItem value="Media">Media</MenuItem>
                                <MenuItem value="Alta">Alta</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={3}>
                        <TextField
                            label="Duración (semanas)"
                            size='small'
                            type="number"
                            value={duracion}
                            inputProps={{ min: 0, max: 24 }}
                            onKeyPress={handleNumeroInput}
                            inputMode='numeric'
                            onChange={(e) => setDuracion(parseInt(e.target.value))}
                            fullWidth
                        />
                    </Grid>
                    <Grid size={12}>
                        <TextField
                            label="Descripción"
                            size='small'
                            inputProps={{ maxLength: 200 }}
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
                        />
                    </Grid>
                </Grid>

                {/* Tabla para seleccionar rutinas por día */}
                <Grid container spacing={2} className='pt-4' columns={10}
                    sx={{
                        '& .MuiFormLabel-root':
                        {
                            fontFamily: 'Open Sans',
                        },
                    }}
                >
                    {daysOfWeek.map((day) => (
                        <Grid size={2} key={day}>
                            <FormControl fullWidth size='small'>
                                <InputLabel>{day.charAt(0).toUpperCase() + day.slice(1)}</InputLabel>
                                <Select
                                    label={day.charAt(0).toUpperCase() + day.slice(1)}
                                    value={detalleDias[day]?.id || "Descanso"}
                                    onChange={(e) => handleDayChange(day, e.target.value)}
                                >
                                    <MenuItem value="Descanso">Descanso</MenuItem>
                                    {visibleRoutines
                                        .map(rutina => (
                                            <MenuItem key={rutina.id} value={rutina.id}>
                                                {rutina.nombre}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                    ))}
                </Grid>
            </div>
            {/* Botones */}
            <div className='flex gap-2 justify-end'>
                <Button variant="outlined" onClick={onBack}
                    startIcon={<FaChevronLeft />}
                    sx={{
                        fontFamily: 'Montserrat Alternates',
                        borderColor: '#16243e',
                        color: '#16243e',
                    }}>
                    Volver
                </Button>
                <Button variant="contained" type="submit"
                    endIcon={<FaPlus />}
                    sx={{
                        backgroundColor: '#16243e',
                        fontFamily: 'Montserrat Alternates',
                    }}>
                    Crear
                </Button>
            </div>
        </form>
    );
};
