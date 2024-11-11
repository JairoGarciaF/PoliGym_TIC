import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, IconButton, Select, MenuItem, TextField, FormControl, InputLabel, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai';


const initialExercises = [
    {
        "id": 1,
        "url": "https://example.com/exercise1",
        "nombre": "Press de banca",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de press de banca",
        "musculos": ["chest", "triceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 2,
        "url": "https://example.com/exercise2",
        "nombre": "Sentadilla",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de prensa de piernas",
        "musculos": ["quads", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 3,
        "url": "https://example.com/exercise3",
        "nombre": "Deadlift",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de pesas",
        "musculos": ["lowerback", "hamstrings", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 4,
        "url": "https://example.com/exercise4",
        "nombre": "Jumping Jacks",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["calves", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 5,
        "url": "https://example.com/exercise5",
        "nombre": "Yoga",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Pelota de yoga",
        "musculos": ["hamstrings", "lowerback"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    },
    {
        "id": 6,
        "url": "https://example.com/exercise6",
        "nombre": "Dominadas",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barra de dominadas",
        "musculos": ["lats", "biceps", "shoulders"],
        "uso_genero": {
            "masculino": {
                "semanal": 27,
                "mensual": 85
            },
            "femenino": {
                "semanal": 22,
                "mensual": 70
            },
            "otro": {
                "semanal": 16,
                "mensual": 30
            }
        },
        "uso_semanal": [10, 12, 8, 10, 5, 8, 12],
        "uso_mensual": [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0]
    },
    {
        "id": 7,
        "url": "https://example.com/exercise7",
        "nombre": "Estocadas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Ninguno",
        "musculos": ["quads", "glutes"],
        "uso_genero": {
            "masculino": {
                "semanal": 20,
                "mensual": 50
            },
            "femenino": {
                "semanal": 40,
                "mensual": 95
            },
            "otro": {
                "semanal": 10,
                "mensual": 20
            }
        },
        "uso_semanal": [12, 8, 10, 12, 8, 4, 6],
        "uso_mensual": [145, 150, 160, 155, 140, 170, 160, 155, 150, 165, 0, 0]
    }
];


export const CrearRutina = ({ onBack }) => {
    const [imagenRutina, setImagenRutina] = useState(null);
    const [nombre, setNombre] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [ejercicios, setEjercicios] = useState([]);
    const [ejercicioSeleccionado, setEjercicioSeleccionado] = useState(initialExercises[0].id);


    // Agregar un ejercicio con id, nombre y campos vacíos de series, repeticiones, descanso
    const agregarEjercicio = () => {
        if (!ejercicios.some(item => item.id === ejercicioSeleccionado)) {
            const ejercicio = initialExercises.find((ex) => ex.id === ejercicioSeleccionado);
            setEjercicios([...ejercicios, {
                id: ejercicio.id,
                nombre: ejercicio.nombre,
                series: 0,
                repeticiones: 0,
                tiempoDescanso: 0,
            }]);
        }
    };


    const removerEjercicio = (id) => {
        setEjercicios(ejercicios.filter((item) => item.id !== id));
    };

    const handleChange = (id, field, value) => {
        console.log(id, field, value);
        setEjercicios(ejercicios.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
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
            setImagenRutina(file);
        }
    };
    // Validar y manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        // Inicializar un conjunto para evitar duplicados
        const conjuntoMusculos = new Set();

        // Iterar sobre los ejercicios y agregar los músculos al conjunto
        ejercicios.forEach(ejercicio => {
            const ejercicioEncontrado = initialExercises.find(ex => ex.id === ejercicio.id);
            if (ejercicioEncontrado && ejercicioEncontrado.musculos) {
                ejercicioEncontrado.musculos.forEach(musculo => {
                    conjuntoMusculos.add(musculo); // Agregar el músculo al conjunto
                });
            }
        });

        // Convertir el conjunto a un array
        const musculosUnicos = Array.from(conjuntoMusculos);

        // Lógica para enviar los datos del usuario
        console.log({
            nombre,
            imagenRutina,
            dificultad,
            oculto: false, // Establecer el valor de 'oculto'
            musculos: musculosUnicos,
            ejercicios,
        });
    };



    const handleEliminarImagen = () => {
        setImagenRutina(null);
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

    return (
        <form onSubmit={handleSubmit} className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col">
            <h2 className="text-base font-semibold montserrat-alternates sm:text-lg  text-azul-marino-500 pb-4">Crear Rutina</h2>
            <div className='flex flex-col flex-1 overflow-y-auto pb-2'>

                {/* Subir Imagen */}
                <div className='grid sm:grid-cols-2 justify-center sm:gap-0 gap-4 items-center sm:divide-x-2 sm:divide-y-0 divide-y-2'>

                    <div className="flex items-center justify-center space-x-4">
                        {imagenRutina ? (
                            <img
                                src={URL.createObjectURL(imagenRutina)}
                                alt="Perfil"
                                className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
                            />
                        ) : (
                            <div className="h-28 w-28 bg-gray-200 rounded-lg " />
                        )}
                        <div className='flex gap-2 items-center'>
                            <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                                <MdOutlineFileUpload className='xl:size-7 size-6' />
                                <input type="file" className="hidden" accept=".png, .jpeg, .jpg" onChange={handleImagenChange} />
                            </label>
                            {imagenRutina && (
                                <button
                                    onClick={handleEliminarImagen}
                                    className=" hover:bg-rojo-100 text-red-500 rounded  p-1.5"
                                >
                                    <AiOutlineDelete className='xl:size-7 size-6' />
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="md:text-base text-sm text-azul-marino-500">
                            Requisitos:
                        </p>
                        <p className="xl:text-sm text-xs text-center text-gray-500 mt-2">
                            Formatos soportados: JPG, JPEG, PNG.
                        </p>
                        <p className="xl:text-sm text-xs text-center text-gray-500">
                            Tamaño máximo: 2MB.
                        </p>
                    </div>
                </div>

                <Grid container spacing={2} className='pt-4'
                    sx={{
                        '& .MuiFormLabel-root':
                        {
                            fontFamily: 'Open Sans',
                        },
                    }}>
                    <Grid size={{ lg: 5, xs: 12 }}>
                        <TextField
                            label="Nombre"
                            value={nombre}
                            onChange={handleNombreChange}
                            fullWidth
                            size='small'
                            sx={{
                                '& .MuiInputBase-input': {
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                },
                                '& .MuiInputLabel-root': {
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ lg: 2, md: 4, sm: 4, xs: 6 }}>
                        <FormControl size='small' fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Dificultad
                            </InputLabel>
                            <Select
                                label='Dificultad'
                                value={dificultad}
                                onChange={(e) => setDificultad(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiSelect-select': {
                                        fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                    },
                                }}
                            >
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="Baja"
                                >
                                    Baja
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="Media"
                                >
                                    Media
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="Alta"
                                >
                                    Alta
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ lg: 4, md: 7, xs: 6 }}>
                        <FormControl fullWidth size='small'>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Ejercicio
                            </InputLabel>
                            <Select
                                label='Ejercicio'
                                value={ejercicioSeleccionado}
                                onChange={(e) => setEjercicioSeleccionado(e.target.value)}
                                fullWidth
                                sx={{
                                    '& .MuiSelect-select': {
                                        fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                    },
                                }}
                            >
                                {initialExercises.map((exercise) => (
                                    <MenuItem
                                        sx={{
                                            '& .MuiSelect-select': {
                                                fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                            },
                                        }}
                                        key={exercise.id} value={exercise.id}
                                    >
                                        {exercise.nombre}
                                    </MenuItem>
                                ))}
                            </Select>


                        </FormControl>
                    </Grid>
                    <Grid
                        display="flex" justifyContent="center" alignItems="center"
                        size={{ md: 1, sm: 2, xs: 12 }} >
                        <IconButton
                            onClick={agregarEjercicio}
                            sx={{
                                backgroundColor: '#16243e',
                                color: '#fff',
                                '&:hover': {
                                    color: '#16243e',
                                    backgroundColor: '#e2e6ee',
                                }
                            }}
                        >
                            <AiOutlinePlus className='xl:size-5 size-4' />
                        </IconButton>
                    </Grid>
                </Grid>

                <div className='my-4'>
                    {/* Tabla de ejercicios */}
                    <Table
                        size='small'
                        sx={{
                            '& .MuiTableCell-root': {
                                fontFamily: 'Open Sans',
                            },
                        }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell>Ejercicio</TableCell>
                                <TableCell>Series</TableCell>
                                <TableCell>Repeticiones</TableCell>
                                <TableCell>Descanso (segundos)</TableCell>
                                <TableCell>Borrar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ejercicios.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell>{initialExercises.find(ex => ex.id === item.id)?.nombre}</TableCell>
                                    <TableCell>
                                        <TextField
                                            size='small'
                                            type="number"
                                            value={item.series}
                                            inputProps={{ min: 0, max: 20 }}
                                            onKeyPress={handleNumeroInput}
                                            inputMode="numeric"
                                            onChange={(e) => handleChange(item.id, 'series', parseInt(e.target.value))}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size='small'
                                            type="number"
                                            value={item.repeticiones}
                                            inputProps={{ min: 0, max: 50 }}
                                            onKeyPress={handleNumeroInput}
                                            inputMode="numeric"
                                            onChange={(e) => handleChange(item.id, 'repeticiones', parseInt(e.target.value))}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <TextField
                                            size='small'
                                            type="number"
                                            value={item.tiempoDescanso}
                                            inputProps={{ min: 0, max: 1800 }}
                                            onKeyPress={handleNumeroInput}
                                            inputMode="numeric"
                                            onChange={(e) => handleChange(item.id, 'tiempoDescanso', parseInt(e.target.value))}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                                }
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => removerEjercicio(item.id)} color="error">
                                            <AiOutlineDelete className='xl:size-6 size-5' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {/* Botones */}
            <div className='flex gap-2 justify-end justify-self-end'>
                <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
                    <Button variant="outlined" onClick={onBack}
                        startIcon={<FaChevronLeft className='xl:size-4 size-3' />}
                        sx={{
                            fontFamily: 'Montserrat Alternates',
                            borderColor: '#16243e',
                            color: '#16243e',
                            borderWidth: 1,
                            '&:hover': {
                                backgroundColor: '#e2e6ee',
                            },
                            fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14,
                        }}>
                        Volver
                    </Button>
                    <Button variant="contained"
                        type="submit"
                        endIcon={<FaPlus className='xl:size-4 size-3' />}
                        sx={{
                            backgroundColor: '#16243e',
                            fontFamily: 'Montserrat Alternates',
                            color: '#fff',
                            '&:hover': {
                                color: '#16243e',
                                backgroundColor: '#e2e6ee',
                            },
                            fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14,
                        }}
                    >
                        Crear
                    </Button>
                </Grid>
            </div>
        </form>

    );
}
