import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';

export const EditarPlanAlimentacion = ({ mealPlan, onBack }) => {
    const [nombre, setNombre] = useState(mealPlan?.nombre || '');
    const [imagenPlanAlimentacion, setImagenPlanAlimentacion] = useState(mealPlan?.imagenPlanAlimentacion || null);
    const [duracion, setDuracion] = useState(mealPlan?.duracion || 0);
    const [descripcion, setDescripcion] = useState(mealPlan?.descripcion || '');
    const [categoria, setCategoria] = useState(mealPlan?.categoria || 'Pérdida de Peso');
    const [detalleDias, setDetalleDias] = useState(
        mealPlan?.detalleDias || {
            lunes: { desayuno: '', almuerzo: '', cena: '' },
            martes: { desayuno: '', almuerzo: '', cena: '' },
            miércoles: { desayuno: '', almuerzo: '', cena: '' },
            jueves: { desayuno: '', almuerzo: '', cena: '' },
            viernes: { desayuno: '', almuerzo: '', cena: '' },
            sábado: { desayuno: '', almuerzo: '', cena: '' },
            domingo: { desayuno: '', almuerzo: '', cena: '' }
        }
    );

    const handleDayChange = (day, field, value) => {
        setDetalleDias({
            ...detalleDias,
            [day]: {
                ...detalleDias[day],
                [field]: value
            }
        });
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
            setImagenPlanAlimentacion(file);
        }
    };

    const handleEliminarImagen = () => {
        setImagenPlanAlimentacion(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            nombre,
            imagenPlanAlimentacion,
            descripcion,
            duracion,
            categoria,
            oculto: false,
            detalleDias
        });
    }

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
        <form onSubmit={handleSubmit} className="bg-white open-sans px-24 h-full flex flex-col">
            <h2 className="text-lg font-semibold montserrat-alternates text-azul-marino-500 pb-4">Crear Plan de Alimentación</h2>
            <div className='overflow-y-auto mb-4'>
                <div className='flex flex-col h-[calc(100%-37px-44px)]'>
                    {/* Subir Imagen */}
                    <div className='grid grid-cols-2 justify-center items-center divide-x-2'>

                        <div className="flex items-center justify-center space-x-4">
                            {imagenPlanAlimentacion === null ? (
                                <img
                                    src={imagenPlanAlimentacion}
                                    alt="Plan Alimentacion"
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
                                {imagenPlanAlimentacion && (
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
                                <InputLabel>Categoría</InputLabel>
                                <Select
                                    label='Categoría'
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <MenuItem value="Pérdida de Peso">Pérdida de Peso</MenuItem>
                                    <MenuItem value="Volumen">Volumen</MenuItem>
                                    <MenuItem value="Definición">Definición</MenuItem>
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
                    <Grid container spacing={2} className='pt-2'>
                        {Object.keys(detalleDias).map((day) => (
                            <Grid item size={12} key={day}>
                                <h3 className='text-azul-marino-500 pb-1'>{day.charAt(0).toUpperCase() + day.slice(1)}</h3>
                                <Grid container spacing={2} columns={12}>
                                    <Grid item size={4}><TextField
                                        label="Desayuno"
                                        value={detalleDias[day].desayuno}
                                        onChange={(e) => handleDayChange(day, 'desayuno', e.target.value)}
                                        fullWidth
                                        inputProps={{ maxLength: 100 }}
                                        size='small'
                                    /></Grid>
                                    <Grid item size={4}><TextField
                                        label="Almuerzo"
                                        value={detalleDias[day].almuerzo}
                                        onChange={(e) => handleDayChange(day, 'almuerzo', e.target.value)}
                                        fullWidth
                                        inputProps={{ maxLength: 100 }}
                                        size='small'
                                    /></Grid>
                                    <Grid item size={4}><TextField
                                        label="Cena"
                                        value={detalleDias[day].cena}
                                        onChange={(e) => handleDayChange(day, 'cena', e.target.value)}
                                        fullWidth
                                        inputProps={{ maxLength: 100 }}
                                        size='small'
                                    /></Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </div>
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
    )
}
