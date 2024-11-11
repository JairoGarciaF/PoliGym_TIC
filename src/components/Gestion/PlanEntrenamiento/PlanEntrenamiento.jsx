import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon, Button } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { CrearPlanEntrenamiento } from './CrearPlanEntrenamiento';
import { EditarPlanEntrenamiento } from './EditarPlanEntrenamiento';

const initialRows = [
    {
        id: 1,
        nombre: "Plan Inicial",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan básico para principiantes que introduce los conceptos fundamentales del entrenamiento.",
        usos: 12,
        duracion: 4,  // semanas
        dificultad: "Baja",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 2,
        nombre: "Plan Intermedio",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan para aquellos con algo de experiencia, enfocado en la ganancia muscular y fuerza.",
        usos: 43,
        duracion: 8,  // semanas
        dificultad: "Media",
        oculto: true,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 3,
        nombre: "Plan Avanzado",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan avanzado diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Alta",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 4,
        nombre: "Entrenamiento de fuerza",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan avanzado diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Alta",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 5,
        nombre: "Entrenamiento HIIT",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan medio diseñado para aumentar fuerza y resistencia muscular.",
        usos: 41,
        duracion: 12,  // semanas
        dificultad: "Media",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    },
    {
        id: 6,
        nombre: "Entrenamiento de cuerpo completo",
        imagenPlanEntrenamiento: 'https://example.com/plan1',
        descripcion: "Un plan básico diseñado para aumentar fuerza y resistencia muscular.",
        usos: 23,
        duracion: 12,  // semanas
        dificultad: "Baja",
        oculto: false,
        detalleDias: {
            lunes: {
                id: 1,
                nombre: 'Rutina de Fuerza',
                dificultad: 'Alta',
                oculto: false,
                musculos: ['chest', 'lowerBack', 'quads'],
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
            martes: "Descanso",
            miércoles: {
                id: 2,
                nombre: 'Rutina de Hipertrofia',
                dificultad: 'Media',
                oculto: true,
                musculos: ['biceps', 'chest', 'shoulders'],
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
            jueves: "Descanso",
            viernes: {
                id: 4,
                nombre: 'Rutina de Potencia',
                dificultad: 'Alta',
                oculto: true,
                musculos: ['traps', 'shoulders', 'quads'],
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
            }
        }
    }
];


export const PlanEntrenamiento = () => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedTrainingPlan, setSelectedTrainingPlan] = useState(null);
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

    const handleAnadirPlanEntrenamiento = () => {
        setCurrentView('add');
    };
    const handleEditarPlanEntrenamiento = () => {
        const planEntrenamiento = rows.find(row => row.id === selectedRow);
        setSelectedTrainingPlan(planEntrenamiento);
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
            field: 'descripcion',
            headerName: 'Descripción',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span className='lg:text-sm text-xs text-balance'>{params.row.descripcion}</span>
                </div>
            ),
            flex: 1,
            minWidth: 400
        },
        {
            field: 'duracion',
            headerName: 'Duración',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span
                        className='px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 bg-lime-100 text-lime-700'
                    >
                        {params.row.duracion} semanas
                    </span>
                </div>
            ),
            flex: 0.3,
            minWidth: 150
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
        <div className="pt-1 overflow-auto flex-1 flex flex-col space-y-4 open-sans">
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
                        <MenuItem onClick={handleEditarPlanEntrenamiento}>
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
                            onClick={handleAnadirPlanEntrenamiento}

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
                <CrearPlanEntrenamiento onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedTrainingPlan && (
                <EditarPlanEntrenamiento trainingPlan={selectedTrainingPlan} onBack={handleBackToList} />
            )}
        </div>
    )
}
