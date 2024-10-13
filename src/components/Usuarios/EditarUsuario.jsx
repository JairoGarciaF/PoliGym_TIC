import React, { useState } from 'react';
import { MdOutlineFileUpload } from "react-icons/md";
import { Select, MenuItem, Checkbox, ListItemText, TextField, FormControl, InputLabel, Button, Switch } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { FaSave, FaChevronLeft } from "react-icons/fa";
import { FiTrash } from "react-icons/fi";
import Swal from 'sweetalert2';


export const EditarUsuario = ({ user, onBack }) => {
    const [nombre, setNombre] = useState(user?.nombre || '');
    const [correo, setCorreo] = useState(user?.correo || '');
    const [imagenPerfil, setImagenPerfil] = useState(null);
    const [rol, setRol] = useState(user?.rol || 'Usuario');
    const [edad, setEdad] = useState(user?.edad || '');
    const [genero, setGenero] = useState(user?.genero || '');
    const [peso, setPeso] = useState(user?.peso || '');
    const [altura, setAltura] = useState(user?.altura || '');
    const [objetivo, setObjetivo] = useState(user?.objetivo || '');
    const [estadoFisico, setEstadoFisico] = useState(user?.estadoFisico || '');
    const [problemasMedicos, setProblemasMedicos] = useState(user?.problemasMedicos || '');
    const [detalleProblemasMedicos, setDetalleProblemasMedicos] = useState(user?.detalleProblemasMedicos || '');
    const [horario, setHorario] = useState(user?.horario || '');
    const [diasSeleccionados, setDiasSeleccionados] = useState(user?.diasSeleccionados || []);
    const [notificaciones, setNotificaciones] = useState(user?.notificaciones || false);

    const diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];


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
            setImagenPerfil(file);
        }
    };

    // Validar y manejar el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para enviar los datos del usuario
        console.log({
            nombre,
            correo,
            rol,
            edad,
            genero,
            peso,
            altura,
            objetivo,
            estadoFisico,
            horario,
            diasSeleccionados,
            problemasMedicos,
            detalleProblemasMedicos,
            notificaciones
        });
    };


    const handleDiasChange = (event) => {
        const {
            target: { value },
        } = event;
        setDiasSeleccionados(
            // Convierte el valor a un array
            typeof value === 'string' ? value.split(',') : value
        );
    };


    const handleProblemasMedicosChange = (event) => {
        setProblemasMedicos(event.target.value);
        if (event.target.value === 'Lesiones' || event.target.value === 'Alergias') {
            setDetalleProblemasMedicos('');
        } else {
            setDetalleProblemasMedicos('');
        }
    };

    const handleEliminarImagen = () => {
        setImagenPerfil(null);
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

        <div className='h-[calc(100%-24px)]'>
            <form onSubmit={handleSubmit} className="bg-white open-sans px-24 py-2 h-full overflow-y-auto">
                <h2 className="text-lg font-semibold montserrat-alternates text-azul-marino-500 pb-4">Editar Usuario</h2>

                {/* Subir Imagen */}
                <div className='grid grid-cols-2 justify-center items-center divide-x-2'>

                    <div className="flex items-center justify-center space-x-4">
                        {imagenPerfil ? (
                            <img
                                src={URL.createObjectURL(imagenPerfil)}
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
                            {imagenPerfil && (
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
                    <Grid size={6}>
                        <TextField
                            label="Correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={3}>
                        <FormControl fullWidth size='small'>
                            <InputLabel >Rol</InputLabel>
                            <Select
                                label='Rol'
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Usuario">Usuario</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={3}>
                        <TextField
                            label="Edad"
                            type="number"
                            inputProps={{ min: 18, max: 100 }}
                            value={edad}
                            onKeyPress={handleNumeroInput}
                            inputMode="numeric"
                            onChange={(e) => setEdad(e.target.value)}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Género</InputLabel>
                            <Select
                                label='Género'
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
                                fullWidth

                            >
                                <MenuItem value="Masculino">Masculino</MenuItem>
                                <MenuItem value="Femenino">Femenino</MenuItem>
                                <MenuItem value="Otro">Otro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={3}>
                        <TextField
                            label="Peso (kg)"
                            type="number"
                            inputProps={{ min: 30, max: 200 }}
                            value={peso}
                            onKeyPress={handleNumeroInput}
                            inputMode="numeric"
                            onChange={(e) => setPeso(e.target.value)}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={3}>
                        <TextField
                            label="Altura (cm)"
                            inputProps={{ min: 100, max: 250 }}
                            type="number"
                            value={altura}
                            onKeyPress={handleNumeroInput}
                            inputMode="numeric"
                            onChange={(e) => setAltura(e.target.value)}
                            fullWidth
                            size='small'
                        />
                    </Grid>

                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Objetivo</InputLabel>
                            <Select
                                label='Objetivo'
                                value={objetivo}
                                onChange={(e) => setObjetivo(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Bajar de Peso">Bajar de Peso</MenuItem>
                                <MenuItem value="Ganar Musculo">Ganar Músculo</MenuItem>
                                <MenuItem value="Mantenerse en Forma">Mantenerse en Forma</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Estado Físico</InputLabel>
                            <Select
                                label='Estado Físico'
                                value={estadoFisico}
                                onChange={(e) => setEstadoFisico(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="Principiante">Principiante</MenuItem>
                                <MenuItem value="Intermedio">Intermedio</MenuItem>
                                <MenuItem value="Avanzado">Avanzado</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Horario</InputLabel>
                            <Select
                                label='Horario'
                                value={horario}
                                onChange={(e) => setHorario(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="AM">AM</MenuItem>
                                <MenuItem value="PM">PM</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Días de Entreno */}
                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Días de Entreno</InputLabel>
                            <Select
                                label='Días de Entreno'
                                multiple
                                value={diasSeleccionados}
                                onChange={handleDiasChange}
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {diasSemana.map((dia) => (
                                    <MenuItem key={dia} value={dia}>
                                        <Checkbox checked={diasSeleccionados.includes(dia)} />
                                        <ListItemText primary={dia} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Problemas Médicos */}
                    <Grid size={3}>
                        <FormControl size='small' fullWidth>
                            <InputLabel>Problemas Médicos</InputLabel>
                            <Select
                                label='Problemas Médicos'
                                value={problemasMedicos}
                                onChange={handleProblemasMedicosChange}

                            >
                                <MenuItem value="Ninguno">Ninguno</MenuItem>
                                <MenuItem value="Lesiones">Lesiones</MenuItem>
                                <MenuItem value="Alergias">Alergias</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Detalles de Problemas Médicos */}
                    {(problemasMedicos === 'Lesiones' || problemasMedicos === 'Alergias') && (
                        <Grid size={6}>
                            <TextField
                                label="Detalle de Problemas Médicos"
                                size='small'
                                inputProps={{ maxLength: 50 }}
                                value={detalleProblemasMedicos}
                                onChange={(e) => setDetalleProblemasMedicos(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    )}

                </Grid>
                {/* Recibir Notificaciones */}
                <div className="flex items-center gap-2 mt-4">
                    <label>Recibir Notificaciones</label>
                    <Switch
                        sx={{
                            '& .MuiSwitch-switchBase.Mui-checked': {
                                color: '#6ec207 ', // Verde para el botón cuando está activado
                            },
                            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                backgroundColor: '#6ec207 ', // Verde para la pista cuando está activado
                            }
                        }}
                        checked={notificaciones}
                        onChange={(e) => setNotificaciones(e.target.checked)}
                    />
                </div>

                {/* Botones */}
                <div className='flex gap-2 justify-end'>
                    <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={onBack}
                            startIcon={<FaChevronLeft className='size-4' />}
                            sx={{
                                fontFamily: 'Montserrat Alternates',
                                borderColor: '#16243e',
                                color: '#16243e',
                                borderWidth: 1,
                            }}>
                            Volver
                        </Button>
                        <Button variant="contained"
                            type="submit"
                            endIcon={<FaSave className='size-4' />}
                            sx={{
                                backgroundColor: '#16243e',
                                fontFamily: 'Montserrat Alternates',

                            }}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </div>
            </form>
        </div>
    );
}
