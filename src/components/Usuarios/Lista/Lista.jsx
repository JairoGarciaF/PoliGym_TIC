import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaShieldAlt, FaUser, FaSearch, FaEye, FaEyeSlash, FaList } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale, IoPartlySunny, IoSunny, IoCloudyNight } from "react-icons/io5";



export const Lista = ({ onVerDetalles, usuarios }) => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [showHidden, setShowHidden] = useState(false);
    const [rows, setRows] = useState(usuarios);

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
        {
            field: 'nombre',
            headerName: 'Nombre',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance font-semibold'>{params.row.nombre}</span>
                </div>
            ),
            flex: 0.75,
            minWidth: 200,
        },
        {
            field: 'correo',
            headerName: 'Correo',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance font-semibold'>{params.row.correo}</span>
                </div>
            ),
            flex: 0.6,
            minWidth: 200,
        },
        {
            field: 'horario',
            headerName: 'Horario',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full whitespace-nowrap font-medium flex items-center gap-1 ${params.row.horario === 'Mañana' ? 'bg-cyan-100 text-cyan-600'
                            : params.row.horario === 'Tarde' ? 'bg-yellow-100 text-yellow-600'
                                : 'bg-blue-100 text-blue-950'
                            }`}
                    >
                        {params.row.horario === 'Mañana' ? (<IoPartlySunny />) : params.row.horario === 'Tarde' ? (<IoSunny />) : (<IoCloudyNight />)}
                        {params.row.horario}
                    </span>
                </div>
            ),
            flex: 0.35,
            minWidth: 150,
        },
        {
            field: 'genero',
            headerName: 'Género',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 ${params.row.genero === 'Masculino' ? 'bg-sky-100 text-sky-700'
                            : params.row.genero === 'Femenino' ? 'bg-pink-100 text-pink-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        {params.row.genero === 'Masculino' ? (<IoMale />) : params.row.genero === 'Femenino' ? (<IoFemale />) : (<IoMaleFemale />)}
                        {params.row.genero}
                    </span>
                </div>
            ),
            flex: 0.35,
            minWidth: 150,
        },
        {
            field: 'rol',
            headerName: 'Rol',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  ${params.row.rol === 'Admin'
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
            flex: 0.35,
            minWidth: 150,
        },
        {
            field: 'tipo',
            headerName: 'Tipo',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 
        ${params.row.tipo === 'Estudiante'
                                ? 'bg-[#CCE0F3] text-[#03346E]'
                                : params.row.tipo === 'Profesor'
                                    ? 'bg-[#fed4da] text-[#B8001F]'
                                    : 'bg-[#F1F1D3] text-[#61614A]'
                            }`}
                    >
                        {params.row.tipo}
                    </span>


                </div>
            ),
            flex: 0.35,
            minWidth: 150,
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
        <div className="pt-1 overflow-auto flex-1 flex flex-col space-y-4 open-sans">


            <div className="flex sm:flex-row gap-2 pt-0.5 flex-col justify-between items-center">
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
                <FormControlLabel
                    control={
                        <Switch
                            selected={showHidden}
                            onChange={() => setShowHidden(!showHidden)}
                            size='small'
                            defaultChecked
                        />
                    }
                    label={showHidden ? 'Ocultos' : 'Visibles'}
                    sx={{
                        '& .MuiFormControlLabel-label': {
                            fontFamily: 'Open Sans',
                            fontSize: '0.875rem',
                        },
                    }}
                />


            </div>

            <div className='w-full flex-1 overflow-auto'>
                <DataGrid
                    rows={filteredRows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                    disableSelectionOnClick
                    sx={{
                        borderRadius: 3,
                        '& .MuiDataGrid-columnHeader': {
                            backgroundColor: '#16243e',
                            color: '#fff',
                            fontFamily: 'Montserrat Alternates',
                            fontSize: window.innerWidth < 640 ? 13 : 14,
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
                <MenuItem onClick={handleVerDetalles}>
                    <ListItemIcon>
                        <FaList />
                    </ListItemIcon>
                    Ver Detalles
                </MenuItem>
                <MenuItem onClick={handleToggleVisibility}>
                    <ListItemIcon>
                        {selectedRow && rows.find(row => row.id === selectedRow)?.oculto ? <FaEye /> : <FaEyeSlash />}

                    </ListItemIcon>
                    {selectedRow && rows.find(row => row.id === selectedRow)?.oculto ? 'Mostrar' : 'Ocultar'}
                </MenuItem>
                <MenuItem onClick={handleToggleRol}>
                    <ListItemIcon>
                        {rows.find(row => row.id === selectedRow)?.rol === 'Admin'
                            ? <FaUser />
                            : <FaShieldAlt />}
                    </ListItemIcon>
                    {rows.find(row => row.id === selectedRow)?.rol === 'Admin'
                        ? 'Descender'
                        : 'Ascender'}
                </MenuItem>
            </Menu>




        </div>
    );
}
