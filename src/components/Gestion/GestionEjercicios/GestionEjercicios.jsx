import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon, Button } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { CrearEjercicio } from './CrearEjercicio';
import { EditarEjercicio } from './EditarEjercicio';


const initialRows = [
    {
        "id": 1,
        "mediaUrl": "https://example.com/exercise-video.mp4",
        "name": "Ejercicio de espalda basico",
        "level": "BASIC",
        "category": "STRENGTH",
        "equipmentIds": [1],
        "description": "Stand with feet shoulder-width apart, holding a barbell across the upper back. Bend knees and hips to lower into a squat, then press through heels to return to standing.",
        "muscleGroupsIds": [3, 4],
        "recommendation": "Perform 3 sets of 10-15 reps, 2-3 times per week.",
        "isDeleted": false,

    },
    {
        "id": 2,
        "mediaUrl": "https://example.com/exercise-video.mp4",
        "name": "Ejercicio de espalda intermedio",
        "level": "INTERMEDIATE",
        "category": "STRENGTH",
        "equipmentIds": [1],
        "description": "Stand with feet shoulder-width apart, holding a barbell across the upper back. Bend knees and hips to lower into a squat, then press through heels to return to standing.",
        "muscleGroupsIds": [3, 4],
        "recommendation": "Perform 3 sets of 10-15 reps, 2-3 times per week.",
        "isDeleted": true,
    }
]

export const GestionEjercicios = () => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedExercise, setSelectedExercise] = useState(null);
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

    const handleAnadirEjercicio = () => {
        setCurrentView('add');
    };
    const handleEditarEjercicio = () => {
        const exercise = rows.find(row => row.id === selectedRow);
        setSelectedExercise(exercise);
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
            case 'STRENGTH':
                return 'Fuerza';
            case 'FLEXIBILITY':
                return 'Flexibilidad';
            case 'CARDIO':
                return 'Cardio';
        }

    }

    const levelTranslate = (status) => {
        switch (status) {
            case 'BASIC':
                return 'Básico';
            case 'INTERMEDIATE':
                return 'Intermedio';
            case 'ADVANCED':
                return 'Avanzado';
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
            field: 'equipo',
            headerName: 'Equipo',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance'>{params.row.equipmentIds[0]}</span>
                </div>
            ),
            flex: 0.4,
            minWidth: 200
        },
        {
            field: 'musculos',
            headerName: 'Grupos Musculares',
            renderCell: (params) => (
                <div className='flex items-center overflow-auto gap-2 justify-start h-full'>
                    {params.row.muscleGroupsIds.map((musculo) => (
                        <span
                            key={musculo} // Añadido el key único para cada musculo
                            className='px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 bg-indigo-100 text-indigo-700 '
                        >
                            {musculo}
                        </span>
                    ))}
                </div>
            ),
            flex: 0.5,
            minWidth: 200
        },
        {
            field: 'categoria',
            headerName: 'Categoría',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${params.row.category === 'Baja' ? 'bg-green-100 text-green-700'
                                : params.row.category === 'Media' ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'

                            }`}
                    >
                        {categoryTranslate(params.row.category)}
                    </span>
                </div>
            ),
            flex: 0.3,
            minWidth: 100
        },
        {
            field: 'nivel',
            headerName: 'Nivel',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${params.row.level === 'BASIC' ? 'bg-green-100 text-green-700'
                                : params.row.level === 'INTERMEDIATE' ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'

                            }`}
                    >
                        {levelTranslate(params.row.level)}
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
                        <MenuItem onClick={handleEditarEjercicio}>
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
                            onClick={handleAnadirEjercicio}

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
                <CrearEjercicio onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedExercise && (
                <EditarEjercicio exercise={selectedExercise} onBack={handleBackToList} />
            )}
        </div>
    )

}