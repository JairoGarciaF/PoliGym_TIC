import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon, Button } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { CrearEquipo } from './CrearEquipo';
import { EditarEquipo } from './EditarEquipo';


const initialRows = [
    {
        "id": 1,
        "name": "Leg Press Machine",
        "mediaUrl": "https://example.com/media/leg-press.jpg",
        "description": "A machine designed for leg workouts, focusing on quadriceps and glutes.",
        "category": "MACHINE", //MACHINE, FREE_WEIGHT, BODYWEIGHT, CARDIO, ACCESSORY
        "isDeleted": false,
        "status": "AVAILABLE" //AVAILABLE, IN_MAINTENANCE, OUT_OF_ORDER
    },
    {
        "id": 2,
        "name": "Dumbbell Bench Press",
        "mediaUrl": "https://example.com/media/dumbbell-bench-press.jpg",
        "description": "A free weight exercise that targets the chest and triceps.",
        "category": "FREE_WEIGHT",
        "isDeleted": true,
        "status": "AVAILABLE"
    },


]

export const GestionEquipo = () => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [currentView, setCurrentView] = useState('list');
    const [rows, setRows] = useState(initialRows);
    const [showHidden, setShowHidden] = useState(false);


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

    const handleAnadirEquipo = () => {
        setCurrentView('add');
    };
    const handleEditarEquipo = () => {
        const equipment = rows.find(row => row.id === selectedRow);
        setSelectedEquipment(equipment);
        setCurrentView('edit');
        handleMenuClose(); // Cierra el menú
    };

    const handleBackToList = () => {
        setCurrentView('list');
    };

    const handleToggleVisibility = () => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === selectedRow ? { ...row, isDeleted: !row.isDeleted } : row
            )
        );
        handleMenuClose(); // Cierra el menú después de actualizar
    };

    const categoryTranslate = (category) => {
        switch (category) {
            case 'MACHINE':
                return 'Máquina';
            case 'FREE_WEIGHT':
                return 'Peso libre';
            case 'BODYWEIGHT':
                return 'Peso corporal';
            case 'CARDIO':
                return 'Cardio';
            case 'ACCESSORY':
                return 'Accesorio';
        }

    }

    const getPillColor = (category) => {
        switch (category) {
            case 'MACHINE':
                return 'bg-[#dcedfa] text-[#1E6091]';
            case 'FREE_WEIGHT':
                return 'bg-[#cff4ff] text-[#168aad]';
            case 'BODYWEIGHT':
                return 'bg-[#c3ffee] text-[#4ba78d]';
            case 'CARDIO':
                return 'bg-[#dbfcd5] text-[#70a565]';
            case 'ACCESSORY':
                return 'bg-[#f1fcc9] text-[#9eaf60]';
        }
    }


    const statusTranslate = (status) => {
        switch (status) {
            case 'AVAILABLE':
                return 'Disponible';
            case 'IN_MAINTENANCE':
                return 'En mantenimiento';
            case 'OUT_OF_ORDER':
                return 'Fuera de servicio';
        }
    }


    const filteredRows = rows.filter((row) =>
        row.name.toLowerCase().includes(searchText.toLowerCase()) && row.isDeleted === showHidden
    );

    const columns = [
        {
            field: 'nombre',
            headerName: 'Nombre',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance font-semibold'>{params.row.name}</span>
                </div>
            ),
            flex: 0.5,
            minWidth: 200,
        },
        {
            field: 'descripcion',
            headerName: 'Descripción',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance'>{params.row.description}</span>
                </div>
            ),
            flex: 1,
            minWidth: 400
        },
        {
            field: 'categoria',
            headerName: 'Categoría',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${getPillColor(params.row.category)}`}
                    >
                        {categoryTranslate(params.row.category)}
                    </span>
                </div>
            ),
            flex: 0.3,
            minWidth: 100
        },
        {
            field: 'estado',
            headerName: 'Estado',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${params.row.status === 'AVAILABLE' ? 'bg-green-100 text-green-700'
                                : params.row.status === 'IN_MAINTENANCE' ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'

                            }`}
                    >
                        {statusTranslate(params.row.status)}
                    </span>
                </div>
            ),
            flex: 0.3,
            minWidth: 100
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
        <div className="pt-1 flex-1 overflow-auto flex flex-col space-y-4 open-sans">
            {currentView === 'list' && (

                <>
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
                        <MenuItem onClick={handleEditarEquipo}>
                            <ListItemIcon>
                                <FaEdit />
                            </ListItemIcon>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={handleToggleVisibility}>
                            <ListItemIcon>
                                {selectedRow && rows.find(row => row.id === selectedRow)?.isDeleted ? <FaEye /> : <FaEyeSlash />}

                            </ListItemIcon>
                            {selectedRow && rows.find(row => row.id === selectedRow)?.isDeleted ? 'Mostrar' : 'Ocultar'}
                        </MenuItem>
                    </Menu>


                    <div className='flex flex-initial justify-end'>
                        <Button variant="contained"
                            type="submit"
                            onClick={handleAnadirEquipo}

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
                            Añadir
                        </Button>
                    </div>
                </>

            )}

            {currentView === 'add' && (
                <CrearEquipo onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedEquipment && (
                <EditarEquipo equipment={selectedEquipment} onBack={handleBackToList} />
            )}
        </div>
    )


}

