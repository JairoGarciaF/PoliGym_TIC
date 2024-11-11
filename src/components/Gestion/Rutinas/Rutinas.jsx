import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon, Button } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { CrearRutina } from './CrearRutina';
import { EditarRutina } from './EditarRutina';

const initialRows = [
    {
        id: 1,
        nombre: 'Rutina de Fuerza',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: false,
        musculos: ['chest', 'lowerBack', 'quads'],
        uso_semanal: [10, 12, 8, 10, 5, 8, 12], // Uso de la rutina por día de la semana (lunes a domingo). EL total de la semana es 65
        uso_mensual: [140, 145, 150, 135, 130, 150, 140, 155, 160, 185, 0, 0], // Uso de la rutina por cada mes (ene a dic). 
        ejercicios: [
            {
                id: 6,
                nombre: 'Press de Banca',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 7,
                nombre: 'Peso Muerto',
                series: 4,
                repeticiones: 6,
                tiempoDescanso: 120
            },
            {
                id: 8,
                nombre: 'Sentadillas',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 2,
        nombre: 'Rutina de Hipertrofia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: true,
        musculos: ['biceps', 'chest', 'shoulders'],
        uso_semanal: [5, 8, 10, 12, 15, 10, 8], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [120, 130, 140, 135, 150, 160, 155, 170, 180, 190, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 9,
                nombre: 'Curl de Bíceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 10,
                nombre: 'Press Militar',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 11,
                nombre: 'Fondos en Paralelas',
                series: 3,
                repeticiones: 15,
                tiempoDescanso: 60
            }
        ]
    },
    {
        id: 3,
        nombre: 'Rutina de Resistencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Baja',
        oculto: false,
        musculos: ['quads', 'abdominals'],
        uso_semanal: [8, 10, 12, 15, 10, 8, 5], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 12,
                nombre: 'Zancadas',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 13,
                nombre: 'Elevaciones de Piernas',
                series: 4,
                repeticiones: 15,
                tiempoDescanso: 45
            }
        ]
    },
    {
        id: 4,
        nombre: 'Rutina de Potencia',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Alta',
        oculto: true,
        musculos: ['traps', 'shoulders', 'quads'],
        uso_semanal: [12, 15, 10, 8, 5, 8, 10], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [150, 160, 155, 170, 180, 190, 200, 210, 220, 230, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 14,
                nombre: 'Arranque con Barra',
                series: 5,
                repeticiones: 5,
                tiempoDescanso: 120
            },
            {
                id: 15,
                nombre: 'Press de Hombro con Mancuernas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            },
            {
                id: 16,
                nombre: 'Dominadas',
                series: 4,
                repeticiones: 8,
                tiempoDescanso: 90
            }
        ]
    },
    {
        id: 5,
        nombre: 'Rutina de Volumen',
        imagenRutina: 'https://example.com/rutina1',
        dificultad: 'Media',
        oculto: false,
        musculos: ['biceps', 'quads'],
        uso_semanal: [10, 8, 5, 8, 10, 12, 15], // Uso de la rutina por día de la semana (lunes a domingo). 
        uso_mensual: [130, 140, 150, 160, 155, 170, 180, 190, 200, 210, 0, 0], // Uso de la rutina por cada mes (ene a dic).
        ejercicios: [
            {
                id: 17,
                nombre: 'Sentadilla Hack',
                series: 4,
                repeticiones: 10,
                tiempoDescanso: 90
            },
            {
                id: 18,
                nombre: 'Press Francés',
                series: 3,
                repeticiones: 12,
                tiempoDescanso: 60
            },
            {
                id: 19,
                nombre: 'Extensiones de Cuádriceps',
                series: 4,
                repeticiones: 12,
                tiempoDescanso: 60
            }
        ]
    }
];

// Mapa de traducción de músculos al español
const muscleTranslation = {
    biceps: 'Bíceps',
    chest: 'Pecho',
    quads: 'Cuádriceps',
    glutes: 'Glúteos',
    calves: 'Pantorrillas',
    triceps: 'Tríceps',
    lats: 'Dorsales',
    traps: 'Trapecios',
    forearms: 'Antebrazos',
    shoulders: 'Hombros',
    obliques: 'Oblicuos',
    abdominals: 'Abdominales',
    lowerBack: 'Espalda baja',
    hamstrings: 'Isquiotibiales',
    "traps-middle": 'Trapecio medio',
};


export const Rutinas = () => {

    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
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

    const handleAnadirRutina = () => {
        setCurrentView('add');
    };
    const handleEditarRutina = () => {
        const routine = rows.find(row => row.id === selectedRow);
        setSelectedRoutine(routine);
        setCurrentView('edit');
        handleMenuClose(); // Cierra el menú
    };


    const handleBackToList = () => {
        setCurrentView('list');
    };

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
            flex: 0.5,
            minWidth: 200,
        },
        {
            field: 'musculos',
            headerName: 'Grupos Musculares',
            renderCell: (params) => (
                <div className='flex items-center overflow-auto gap-2 justify-start h-full'>
                    {params.row.musculos.map((musculo) => (
                        <span
                            key={musculo} // Añadido el key único para cada musculo
                            className='px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 bg-indigo-100 text-indigo-700 '
                        >
                            {muscleTranslation[musculo] || musculo}
                        </span>
                    ))}
                </div>
            ),
            flex: 1,
            minWidth: 200
        },
        {
            field: 'dificultad',
            headerName: 'Dificultad',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${params.row.dificultad === 'Baja' ? 'bg-green-100 text-green-700'
                                : params.row.dificultad === 'Media' ? 'bg-yellow-100 text-yellow-700'
                                    : 'bg-red-100 text-red-700'

                            }`}
                    >
                        {params.row.dificultad}
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
                        <MenuItem onClick={handleEditarRutina}>
                            <ListItemIcon>
                                <FaEdit />
                            </ListItemIcon>
                            Editar
                        </MenuItem>
                        <MenuItem onClick={handleToggleVisibility}>
                            <ListItemIcon>
                                {selectedRow && rows.find(row => row.id === selectedRow)?.oculto ? <FaEye /> : <FaEyeSlash />}

                            </ListItemIcon>
                            {selectedRow && rows.find(row => row.id === selectedRow)?.oculto ? 'Mostrar' : 'Ocultar'}
                        </MenuItem>
                    </Menu>


                    <div className='flex flex-initial justify-end'>
                        <Button variant="contained"
                            type="submit"
                            onClick={handleAnadirRutina}

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
                <CrearRutina onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedRoutine && (
                <EditarRutina routine={selectedRoutine} onBack={handleBackToList} />
            )}
        </div>
    )
}
