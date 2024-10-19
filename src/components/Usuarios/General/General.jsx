import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, ToggleButton } from '@mui/material';
import { TbDotsVertical, TbEyeClosed, TbEye } from 'react-icons/tb';
import { FaShieldAlt, FaUser, FaSearch } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";


const defaultProfilePic = 'https://api.dicebear.com/9.x/initials/svg?seed=User';

const initialRows = [
    {
        id: 1,
        nombre: 'Carlos',
        correo: 'carlos@example.com',
        rol: 'Usuario',
        edad: 25,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 2,
        nombre: 'Ana',
        correo: 'ana@example.com',
        rol: 'Usuario',
        edad: 30,
        oculto: false,
        genero: 'Femenino',
        diasActividad: 3,
        peso: 60,
        altura: 170,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Intermedio',
        comentarios: 5,
        notificaciones: false,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: 'Alergia a la mantequilla de maní',
        horario: 'PM',
        diasSeleccionados: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 3,
        nombre: 'Pedro',
        correo: 'pedro@example.com',
        rol: 'Admin',
        edad: 40,
        oculto: true,
        genero: 'Masculino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Lesiones',
        detalleProblemasMedicos: 'Dolor en la rodilla derecha',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 4,
        nombre: 'Sofía',
        correo: 'sofia@example.com',
        rol: 'Usuario',
        edad: 28,
        oculto: true,
        genero: 'Femenino',
        diasActividad: 6,
        peso: 65,
        altura: 165,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Intermedio',
        comentarios: 8,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'PM',
        diasSeleccionados: ['Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 5,
        nombre: 'Javier',
        correo: 'javier@example.com',
        rol: 'Usuario',
        edad: 35,
        oculto: true,
        genero: 'Masculino',
        diasActividad: 2,
        peso: 75,
        altura: 175,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Principiante',
        comentarios: 12,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 6,
        nombre: 'María',
        correo: 'maria@example.com',
        rol: 'Usuario',
        edad: 20,
        oculto: false,
        genero: 'Femenino',
        diasActividad: 7,
        peso: 50,
        altura: 160,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Avanzado',
        comentarios: 20,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Miercoles'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 7,
        nombre: 'Luis',
        correo: 'luis@example.com',
        rol: 'Usuario',
        edad: 45,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 1,
        peso: 80,
        altura: 185,
        objetivo: 'Mantenerse en Forma',
        estadoFisico: 'Intermedio',
        comentarios: 6,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'PM',
        diasSeleccionados: ['Lunes', 'Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 8,
        nombre: 'Elena',
        correo: 'elena@example.com',
        rol: 'Admin',
        edad: 22,
        oculto: true,
        genero: 'Otro',
        diasActividad: 5,
        peso: 55,
        altura: 163,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Principiante',
        comentarios: 10,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Miercoles', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 9,
        nombre: 'Miguel',
        correo: 'miguel@example.com',
        rol: 'Usuario',
        edad: 30,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 3,
        peso: 60,
        altura: 170,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Intermedio',
        comentarios: 5,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 10,
        nombre: 'Laura',
        correo: 'laura@example.com',
        rol: 'Usuario',
        edad: 40,
        oculto: false,
        genero: 'Femenino',
        diasActividad: 4,
        peso: 70,
        altura: 180,
        objetivo: 'Ganar Músculo',
        estadoFisico: 'Avanzado',
        comentarios: 15,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Martes'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 11,
        nombre: 'Raúl',
        correo: 'raul@example.com',
        rol: 'Usuario',
        edad: 28,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 6,
        peso: 65,
        altura: 165,
        objetivo: 'Bajar de Peso',
        estadoFisico: 'Intermedio',
        comentarios: 8,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Miercoles', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 12,
        nombre: 'Carmen',
        correo: 'carmen@example.com',
        rol: 'Usuario',
        edad: 35,
        oculto: false,
        genero: 'Otro',
        diasActividad: 2,
        peso: 75,
        altura: 175,
        objetivo: 'Ganar músculo',
        estadoFisico: 'Principiante',
        comentarios: 12,
        notificaciones: true,
        problemasMedicos: 'Alergias',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Martes', 'Jueves'],
        imagenPerfil: defaultProfilePic,
    },
    {
        id: 13,
        nombre: 'Jorge',
        correo: 'jorge@example.com',
        rol: 'Usuario',
        edad: 20,
        oculto: false,
        genero: 'Masculino',
        diasActividad: 7,
        peso: 50,
        altura: 160,
        objetivo: 'Mantenerse en Forma',
        estadoFisico: 'Avanzado',
        comentarios: 20,
        notificaciones: true,
        problemasMedicos: 'Ninguno',
        detalleProblemasMedicos: '',
        horario: 'AM',
        diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
        imagenPerfil: defaultProfilePic,
    }
];




export const General = ({ onVerDetalles }) => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showHidden, setShowHidden] = useState(false);
    const [rows, setRows] = useState(initialRows);

    const handleMenuClick = (event, row) => {
        setAnchorEl(event.currentTarget);
        setSelectedRow(row);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedRow(null);
    };

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const handleVerDetalles = () => {
        const user = rows.find(row => row.id === selectedRow);
        if (user) {
            onVerDetalles(user); // Pasa el usuario seleccionado al componente padre
        }
        handleMenuClose(); // Cierra el menú
    };


    // Alternar entre Usuario y Admin
    const handleToggleRol = () => {
        setRows(prevRows =>
            prevRows.map(row =>
                row.id === selectedRow
                    ? { ...row, rol: row.rol === 'Admin' ? 'Usuario' : 'Admin' }
                    : row
            )
        );
        handleMenuClose();
    };


    // Función para ocultar/mostrar usuarios
    const handleToggleVisibility = () => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === selectedRow ? { ...row, oculto: !row.oculto } : row
            )
        );
        handleMenuClose(); // Cierra el menú después de actualizar
    };

    const filteredRows = rows.filter((row) =>
        row.nombre.toLowerCase().includes(searchText.toLowerCase()) && row.oculto === showHidden
    );

    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 0.75, },
        { field: 'correo', headerName: 'Correo', flex: 0.75, },
        { field: 'edad', headerName: 'Edad', type: 'number', flex: 0.5, },
        {
            field: 'genero',
            headerName: 'Género',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1 ${params.row.genero === 'Masculino' ? 'bg-sky-100 text-sky-700'
                            : params.row.genero === 'Femenino' ? 'bg-pink-100 text-pink-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        {params.row.genero === 'Masculino' ? (<IoMale />) : params.row.genero === 'Femenino' ? (<IoFemale />) : (<IoMaleFemale />)}
                        {params.row.genero}
                    </span>
                </div>
            ),
            flex: 0.5,
        },
        {
            field: 'rol',
            headerName: 'Rol',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1  ${params.row.rol === 'Admin'
                            ? 'bg-violet-100 text-violet-700'
                            : 'bg-green-100 text-green-700'

                            }`}
                    >
                        {params.row.rol === 'Admin' ? (<FaShieldAlt />)
                            : (<FaUser />)
                        }
                        {params.row.rol}
                    </span>
                </div>
            ),
            flex: 0.5,
        },
        {
            field: 'acciones',
            headerName: '',
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.id)}>
                    <TbDotsVertical />
                </IconButton>
            ),
            flex: 0.15,

            buttonClassName: 'theme-header',
        },
    ];

    return (
        <div className="pt-4 h-[calc(100%-36px-41px)] space-y-4 open-sans">


            <div className="flex justify-between items-center">
                <TextField
                    label="Buscar"
                    variant="outlined"
                    value={searchText}
                    onChange={handleSearch}
                    size="small"
                    InputProps={{
                        startAdornment: <FaSearch className='pr-1 size-5' />,
                    }}
                />
                {/* Toggle para cambiar entre usuarios ocultos y no ocultos */}
                <ToggleButton
                    value="check"
                    selected={showHidden}
                    onChange={() => setShowHidden(!showHidden)}
                    size='small'
                    sx={{
                        'text-transform': 'capitalize',
                        borderRadius: '0.5rem'
                    }}
                >
                    {showHidden ? <TbEyeClosed className='size-5 pr-1' /> : <TbEye className='size-5 pr-1' />}
                    {showHidden ? 'Ocultos' : 'Visibles'}
                </ToggleButton>
            </div>

            <div className='w-full h-[calc(100%-40px-16px)]'>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableSelectionOnClick
                    sx={{
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#16243e',
                            color: '#fff',
                        },
                        '& .MuiSvgIcon-root': {
                            color: '#fff',
                        },
                        '& .MuiDataGrid-columnHeaders .MuiButtonBase-root:hover': {
                            backgroundColor: '#233a64',
                            color: '#fff',
                        },
                        '& .MuiDataGrid-main, .MuiDataGrid-selectedRowCount, .MuiTablePagination-selectLabel, .MuiInputBase-root, .MuiTablePagination-displayedRows ':
                        {
                            fontFamily: 'Open Sans',
                        },
                    }}
                />

            </div>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleVerDetalles}>Ver Detalles</MenuItem>
                <MenuItem onClick={handleToggleVisibility}>
                    {selectedRow && rows.find(row => row.id === selectedRow)?.oculto ? 'Mostrar' : 'Ocultar'}
                </MenuItem>
                <MenuItem onClick={handleToggleRol}>
                    {rows.find(row => row.id === selectedRow)?.rol === 'Admin'
                        ? 'Descender a Usuario'
                        : 'Ascender a Admin'}
                </MenuItem>
            </Menu>




        </div>
    );
};