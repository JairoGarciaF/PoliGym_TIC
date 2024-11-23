import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import Swal from 'sweetalert2';
import { MdOutlineFileUpload } from "react-icons/md";
import { FaSave, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from 'react-icons/ai';
import { uploadImage, deleteImage } from '../../../services/cloudinary/cloudinary';
import { updateEquipment } from '../../../services/equipment/equipment';
import { BiLoaderCircle } from "react-icons/bi";

export const EditarEquipo = ({ equipment, onBack, refreshData }) => {

    const [name, setName] = useState(equipment?.name || '');
    const [description, setDescription] = useState(equipment?.description || '');
    const [imagenEquipo, setImagenEquipo] = useState(null);
    const [mediaUrl, setMediaUrl] = useState(equipment?.mediaUrl || '');
    const [category, setCategory] = useState(equipment?.category || '');
    const [status, setStatus] = useState(equipment?.status || '');
    const [loading, setLoading] = useState(false);

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
            setImagenEquipo(file);
            e.target.value = null; // Limpiar el input para permitir subir la misma imagen
        }

    };

    const handleEliminarImagen = (e) => {
        e.preventDefault();
        if (mediaUrl) {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'La imagen se eliminará permanentemente.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                confirmButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#16243e',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const publicId = mediaUrl.split('/').pop().split('.')[0];
                        await deleteImage(publicId);
                        Swal.fire({
                            title: 'Imagen eliminada',
                            text: 'La imagen se eliminó correctamente.',
                            icon: 'success',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#16243e',
                        });
                        setMediaUrl('');
                    } catch (error) {
                        console.error('Error al eliminar la imagen:', error);
                        Swal.fire({
                            title: 'Error',
                            text: 'Ocurrió un error al intentar eliminar la imagen.',
                            icon: 'error',
                            confirmButtonText: 'Aceptar',
                            confirmButtonColor: '#16243e',
                        });
                    }
                }
            });
        }
        if (imagenEquipo) {
            setImagenEquipo(null);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validar que todos los campos estén completos
        if (!name || !description || !category || !status || (!imagenEquipo && !mediaUrl)) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos.',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#16243e',
            });
            return;
        }
        setLoading(true);

        try {
            let imageUrl = mediaUrl;
            if (imagenEquipo) {
                // Subir la imagen a Cloudinary
                imageUrl = await uploadImage(imagenEquipo, 'equipos');
            }

            if (imageUrl) {
                // Actualizar el equipo en la base de datos
                await updateEquipment(equipment.id, {
                    name,
                    mediaUrl: imageUrl,
                    description,
                    category,
                    status,
                });
            }
            Swal.fire({
                title: 'Equipo actualizado',
                text: 'El equipo se actualizó correctamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#16243e',
            }).then(() => {
                setLoading(false);
                refreshData();
                onBack();
            });
        } catch (error) {
            console.error('Error al actualizar el equipo:', error);
            Swal.fire({
                title: 'Error',
                text: 'Ocurrió un error al intentar actualizar el equipo.',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#16243e',
            });
            setLoading(false);
        }
    }

    // Validar que el nombre solo contenga letras, espacios, ñ, tildes
    const handleNombreChange = (e) => {
        const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
        if (regex.test(parseInt(e.target.value))) {
            setName(e.target.value);
        }
    };

    if (loading) {
        return (
            <div className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col items-center justify-center">
                <BiLoaderCircle className='xl:size-20 size-16 animate-spin text-azul-marino-500' />
                <p className='text-azul-marino-500 text-lg'>Cargando...</p>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col">
            <h2 className="text-base font-semibold montserrat-alternates sm:text-lg  text-azul-marino-500 pb-4">Editar Equipo</h2>
            <div className='flex flex-col flex-1 overflow-y-auto pb-2'>

                {/* Subir Imagen */}
                <div className='grid sm:grid-cols-2 justify-center sm:gap-0 gap-4 items-center sm:divide-x-2 sm:divide-y-0 divide-y-2'>

                    <div className="flex items-center justify-center space-x-4">
                        {mediaUrl || imagenEquipo ? (
                            <img
                                src={mediaUrl ? mediaUrl : URL.createObjectURL(imagenEquipo)}
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
                            {(mediaUrl || imagenEquipo) && (
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
                                    value="MACHINE"
                                >
                                    Máquina
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="FREE_WEIGHT"
                                >
                                    Peso Libre
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="BODYWEIGHT"
                                >
                                    Peso Corporal
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="CARDIO"
                                >
                                    Cardio
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="ACCESSORY"
                                >
                                    Accesorio
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
                                Estado
                            </InputLabel>
                            <Select
                                label='Estado'
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
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
                                    value="AVAILABLE"
                                >
                                    Disponible
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="IN_MAINTENANCE"
                                >
                                    En Mantenimiento
                                </MenuItem>
                                <MenuItem
                                    sx={{
                                        '& .MuiSelect-select': {
                                            fontSize: window.innerWidth < 640 ? '0.875rem' : '1rem',
                                        },
                                    }}
                                    value="OUT_OF_ORDER"
                                >
                                    Fuera de Servicio
                                </MenuItem>

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
