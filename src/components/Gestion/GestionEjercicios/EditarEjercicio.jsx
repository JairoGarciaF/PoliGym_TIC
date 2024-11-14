import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaSave, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';

export const EditarEjercicio = ({ exercise, onBack }) => {
    const [name, setName] = useState(exercise?.name || '');
    const [imagenEjercicio, setImagenEjercicio] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(exercise?.mediaUrl || '');
    const [level, setLevel] = useState(exercise?.level || '');
    const [category, setCategory] = useState(exercise?.category || '');
    const [equipmentIds, setEquipmentIds] = useState(exercise?.equipmentIds || []);
    const [description, setDescription] = useState(exercise?.description || '');
    const [muscleGroupsIds, setMuscleGroupsIds] = useState(exercise?.muscleGroupsIds || []);
    const [recommendation, setRecommendation] = useState(exercise?.recommendation || '');

    const equipmentOptions = [0, 1, 2];
    const muscleGroupsOptions = [0, 1, 2, 3];

    const handleImagenChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Verificar el tipo de archivo (solo GIF o MP4)
            const validTypes = ['image/gif', 'video/mp4'];
            if (!validTypes.includes(file.type)) {
                Swal.fire({
                    title: 'Formato incorrecto',
                    text: 'Solo se permiten imágenes en formato GIF y MP4.',
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
            setImagenEjercicio(file);
        }

    };

    const handleEliminarImagen = () => {
        setImagenEjercicio(null);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            name,
            mediaUrl: 'url',
            level,
            category,
            equipmentIds,
            description,
            muscleGroupsIds,
            recommendation,
        })
    }

    // Validar que el nombre solo contenga letras, espacios, ñ, tildes
    const handleNombreChange = (e) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(parseInt(e.target.value))) {
            setName(e.target.value);
        }
    };


    return (
        <form onSubmit={handleSubmit} className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col">
            <h2 className="text-base font-semibold montserrat-alternates sm:text-lg  text-azul-marino-500 pb-4">Crear Ejercicio</h2>
            <div className='flex flex-col flex-1 overflow-y-auto pb-2'>

                {/* Subir Imagen */}
                <div className='grid sm:grid-cols-2 justify-center sm:gap-0 gap-4 items-center sm:divide-x-2 sm:divide-y-0 divide-y-2'>

                    <div className="flex items-center justify-center space-x-4">
                        {mediaUrl ? (
                            <img
                                src={mediaUrl}
                                alt="Perfil"
                                className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
                            />
                        ) : (
                            <div className="h-28 w-28 bg-gray-200 rounded-lg " />
                        )}
                        <div className='flex gap-2 items-center'>
                            <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                                <MdOutlineFileUpload className='xl:size-7 size-6' />
                                <input type="file" className="hidden" accept=".gif, .mp4" onChange={handleImagenChange} />
                            </label>
                            {mediaUrl && (
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
                            Formatos soportados: GIF, MP4.
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
                    <Grid size={{ sm: 6, xs: 12 }}>
                        <TextField
                            label="Nombre"
                            value={name}
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
                    <Grid size={{ sm: 3, xs: 6 }}>
                        <FormControl size='small' fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Nivel
                            </InputLabel>
                            <Select
                                label='Nivel'
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
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
                                    value="BASIC"
                                >
                                    Básico
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="INTERMEDIATE"
                                >
                                    Intermedio
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="ADVANCED"
                                >
                                    Avanzado
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ sm: 3, xs: 6 }}>
                        <FormControl size='small' fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Categoría
                            </InputLabel>
                            <Select
                                label='Categoría'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
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
                                    value="STRENGTH"
                                >
                                    Fuerza
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="CARDIO"
                                >
                                    Cardio                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="FLEXIBILITY"
                                >
                                    Flexibilidad
                                </MenuItem>

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormControl size='small' fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Equipos
                            </InputLabel>
                            <Select
                                label='Equipos'
                                value={equipmentIds}
                                onChange={(e) => setEquipmentIds(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                    },
                                }}
                            >
                                {equipmentOptions.map((equipment) => (
                                    <MenuItem
                                        sx={{
                                            '& .MuiSelect-select': {
                                                fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                            },
                                        }}
                                        key={equipment} value={equipment}
                                    >
                                        {equipment}
                                    </MenuItem>
                                ))}


                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <FormControl size='small' fullWidth>
                            <InputLabel
                                sx={{
                                    fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                }}
                            >
                                Grupos Musculares
                            </InputLabel>
                            <Select
                                multiple={true}
                                label='Grupos Musculares'
                                value={muscleGroupsIds}
                                onChange={(e) => setMuscleGroupsIds(e.target.value)}
                                sx={{
                                    '& .MuiSelect-select': {
                                        fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                    },
                                }}
                            >

                                {muscleGroupsOptions.map((muscle) => (
                                    <MenuItem
                                        sx={{
                                            '& .MuiSelect-select': {
                                                fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                            },
                                        }}
                                        key={muscle} value={muscle}
                                    >
                                        {muscle}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <TextField
                            label="Descripción"
                            size='small'
                            inputProps={{ maxLength: 200 }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
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
                    <Grid size={12}>
                        <TextField
                            label="Recomendación"
                            size='small'
                            inputProps={{ maxLength: 200 }}
                            value={recommendation}
                            onChange={(e) => setRecommendation(e.target.value)}
                            multiline
                            rows={2}
                            fullWidth
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


                </Grid>
            </div>
            {/* Botones */}
            <div className='flex gap-2 justify-end'>
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
                <Button variant="contained" type="submit"
                    endIcon={<FaSave className='xl:size-4 size-3' />}
                    sx={{
                        backgroundColor: '#16243e',
                        fontFamily: 'Montserrat Alternates',
                        color: '#fff',
                        '&:hover': {
                            color: '#16243e',
                            backgroundColor: '#e2e6ee',
                        },
                        fontSize: window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14,
                    }}>
                    Guardar
                </Button>
            </div>
        </form>
    )
}
