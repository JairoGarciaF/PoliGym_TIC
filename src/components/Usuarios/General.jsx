import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch } from "react-icons/fa";
import { AnadirUsuario } from './AnadirUsuario';
import { EditarUsuario } from './EditarUsuario';

const rows = [
    { id: 1, nombre: 'Carlos', edad: 25, genero: 'Masculino', diasActividad: 5, comentarios: 10, rol: 'Usuario' },
    { id: 2, nombre: 'Laura', edad: 30, genero: 'Femenino', diasActividad: 3, comentarios: 3, rol: 'Admin' },
    { id: 3, nombre: 'Juan', edad: 40, genero: 'Masculino', diasActividad: 7, comentarios: 15, rol: 'Usuario' },
    { id: 4, nombre: 'María', edad: 35, genero: 'Femenino', diasActividad: 2, comentarios: 5, rol: 'Usuario' },
    { id: 5, nombre: 'Pedro', edad: 28, genero: 'Masculino', diasActividad: 6, comentarios: 12, rol: 'Admin' },
    { id: 6, nombre: 'Ana', edad: 45, genero: 'Femenino', diasActividad: 4, comentarios: 8, rol: 'Usuario' },
    { id: 7, nombre: 'Luis', edad: 50, genero: 'Masculino', diasActividad: 1, comentarios: 1, rol: 'Usuario' },
    { id: 8, nombre: 'Sofía', edad: 22, genero: 'Femenino', diasActividad: 5, comentarios: 7, rol: 'Admin' },
    { id: 9, nombre: 'Miguel', edad: 33, genero: 'Masculino', diasActividad: 3, comentarios: 6, rol: 'Usuario' },
    { id: 10, nombre: 'Lucía', edad: 27, genero: 'Femenino', diasActividad: 6, comentarios: 9, rol: 'Usuario' },

    // más datos de ejemplo
];

export const General = ({ onVerDetalles }) => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [currentView, setCurrentView] = useState('list');

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


    const handleAnadirUsuario = () => {
        setCurrentView('add');
    };

    const handleEditarUsuario = () => {
        const user = rows.find(row => row.id === selectedRow);
        setSelectedUser(user);
        setCurrentView('edit');
        handleMenuClose(); // Cierra el menú
    };

    const handleBackToList = () => {
        setCurrentView('list');
        setSelectedUser(null);
    };

    const filteredRows = rows.filter((row) =>
        row.nombre.toLowerCase().includes(searchText.toLowerCase())
    );

    const columns = [
        { field: 'nombre', headerName: 'Nombre', flex: 1 },
        { field: 'edad', headerName: 'Edad', type: 'number', flex: 0.5 },
        { field: 'genero', headerName: 'Género', flex: 0.5 },
        { field: 'diasActividad', headerName: 'Días de Actividad', type: 'number', flex: 1 },
        { field: 'comentarios', headerName: 'Comentarios', type: 'number', flex: 1 },
        { field: 'rol', headerName: 'Rol', flex: 0.5 },
        {
            field: 'acciones',
            headerName: '',
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={(e) => handleMenuClick(e, params.id)}>
                    <TbDotsVertical />
                </IconButton>
            ),
            flex: 0.3,
        },
    ];

    return (
        <div className="pt-4 h-[calc(100%-35px-56px)] space-y-4 open-sans">
            {currentView === 'list' && (
                <>
                    <div className="flex justify-between items-center">
                        <TextField
                            label="Buscar usuario"
                            variant="outlined"
                            value={searchText}
                            onChange={handleSearch}
                            size="small"
                            InputProps={{
                                startAdornment: <FaSearch className='pr-1 size-5' />,
                            }}
                        />
                        <button
                            type="submit"
                            onClick={handleAnadirUsuario}
                            className="flex items-center gap-2 bg-azul-marino-500 hover:bg-azul-marino-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            <FaPlus />
                            Añadir Usuario
                        </button>
                    </div>

                    <div className='w-full h-[calc(100%-40px-16px)]'>
                        <DataGrid
                            rows={filteredRows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
                            disableSelectionOnClick
                        />
                    </div>

                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleVerDetalles}>Ver Detalles</MenuItem>
                        <MenuItem onClick={handleEditarUsuario}>Editar</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Eliminar</MenuItem>
                    </Menu>
                </>
            )}

            {currentView === 'add' && (
                <AnadirUsuario onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedUser && (
                <EditarUsuario user={selectedUser} onBack={handleBackToList} />
            )}

        </div>
    );
};