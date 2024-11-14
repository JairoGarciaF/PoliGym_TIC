import React, { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { esES } from '@mui/x-data-grid/locales';
import { IconButton, TextField, Menu, MenuItem, Switch, FormControlLabel, ListItemIcon, Button } from '@mui/material';
import { TbDotsVertical } from 'react-icons/tb';
import { FaPlus, FaSearch, FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { CrearPlanAlimentacion } from './CrearPlanAlimentacion';
import { EditarPlanAlimentacion } from './EditarPlanAlimentacion';


const initialRows = [
    {
        id: 1,
        nombre: "Plan Básico de Pérdida de Peso",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan de alimentación diseñado para reducir la ingesta calórica y favorecer la pérdida de peso.",
        usos: 32,
        duracion: 4,  // semanas
        categoria: "Pérdida de Peso",
        oculto: false,
        detalleDias: {
            lunes: {
                desayuno: {
                    nombre: "Huevos revueltos con jamón y espinacas",
                    calorias: 300,
                    proteinas: 25,
                    carbohidratos: 10,
                    grasas: 15
                },
                almuerzo: {
                    nombre: "Pollo a la parrilla con arroz integral y brócoli",
                    calorias: 400,
                    proteinas: 30,
                    carbohidratos: 20,
                    grasas: 10
                },
                cena: {
                    nombre: "Salmón al horno con quinoa y espárragos",
                    calorias: 350,
                    proteinas: 20,
                    carbohidratos: 15,
                    grasas: 15
                }
            },
            martes: {
                desayuno: {
                    nombre: "Panqueques de avena con frutas y miel",
                    calorias: 350,
                    proteinas: 20,
                    carbohidratos: 25,
                    grasas: 10
                },
                almuerzo: {
                    nombre: "Carne de res con batatas y espinacas",
                    calorias: 450,
                    proteinas: 35,
                    carbohidratos: 30,
                    grasas: 20
                },
                cena: {
                    nombre: "Ensalada de atún con aguacate y pan integral",
                    calorias: 300,
                    proteinas: 25,
                    carbohidratos: 15,
                    grasas: 10
                }
            },
            miércoles: {
                desayuno: {
                    nombre: "Batido de proteínas con plátano y avena",
                    calorias: 300,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 10
                },
                almuerzo: {
                    nombre: "Pechuga de pollo con arroz integral y verduras",
                    calorias: 400,
                    proteinas: 30,
                    carbohidratos: 25,
                    grasas: 15
                },
                cena: {
                    nombre: "Filete de ternera con ensalada de garbanzos",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 15
                }
            },
            jueves: {
                desayuno: {
                    nombre: "Tostadas de pan integral con mantequilla de maní y plátano",
                    calorias: 350,
                    proteinas: 20,
                    carbohidratos: 30,
                    grasas: 15
                },
                almuerzo: {
                    nombre: "Ensalada de quinoa con pollo y espárragos",
                    calorias: 400,
                    proteinas: 30,
                    carbohidratos: 25,
                    grasas: 20
                },
                cena: {
                    nombre: "Pescado a la plancha con papas asadas",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 15
                }
            },
            viernes: {
                desayuno: {
                    nombre: "Avena con nueces, pasas y proteína en polvo",
                    calorias: 300,
                    proteinas: 20,
                    carbohidratos: 25,
                    grasas: 15
                },
                almuerzo: {
                    nombre: "Pechuga de pavo con arroz y espinacas",
                    calorias: 400,
                    proteinas: 30,
                    carbohidratos: 25,
                    grasas: 15
                },
                cena: {
                    nombre: "Salmón a la parrilla con batatas",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 15
                }
            },
            sabado: {
                desayuno: {
                    nombre: "Tortilla de huevo con jamón y queso",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 30,
                    grasas: 15
                },
                almuerzo: {
                    nombre: "Lomo de cerdo con puré de papas y brócoli",
                    calorias: 450,
                    proteinas: 35,
                    carbohidratos: 30,
                    grasas: 20
                },
                cena: {
                    nombre: "Pollo al horno con ensalada mixta",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 15
                }
            },
            domingo: {
                desayuno: {
                    nombre: "Smoothie de proteína con frutos rojos",
                    calorias: 300,
                    proteinas: 20,
                    carbohidratos: 25,
                    grasas: 15
                },
                almuerzo: {
                    nombre: "Pollo a la parrilla con arroz y ensalada",
                    calorias: 400,
                    proteinas: 30,
                    carbohidratos: 25,
                    grasas: 20
                },
                cena: {
                    nombre: "Lasaña de carne con espinacas",
                    calorias: 350,
                    proteinas: 25,
                    carbohidratos: 20,
                    grasas: 15
                }
            }
        }
    },
    {
        id: 2,
        nombre: "Plan de Ganancia Muscular",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan alto en proteínas y calorías para promover el desarrollo muscular.",
        usos: 22,
        duracion: 6,  // semanas
        categoria: "Volumen",
        oculto: true,
        detalleDias: {
            lunes: {
                desayuno: "Huevos revueltos con jamón y espinacas",
                almuerzo: "Pollo a la parrilla con arroz integral y brócoli",
                cena: "Salmón al horno con quinoa y espárragos"
            },
            martes: {
                desayuno: "Panqueques de avena con frutas y miel",
                almuerzo: "Carne de res con batatas y espinacas",
                cena: "Ensalada de atún con aguacate y pan integral"
            },
            miércoles: {
                desayuno: "Batido de proteínas con plátano y avena",
                almuerzo: "Pechuga de pollo con arroz integral y verduras",
                cena: "Filete de ternera con ensalada de garbanzos"
            },
            jueves: {
                desayuno: "Tostadas de pan integral con mantequilla de maní y plátano",
                almuerzo: "Ensalada de quinoa con pollo y espárragos",
                cena: "Pescado a la plancha con papas asadas"
            },
            viernes: {
                desayuno: "Avena con nueces, pasas y proteína en polvo",
                almuerzo: "Pechuga de pavo con arroz y espinacas",
                cena: "Salmón a la parrilla con batatas"
            },
            sábado: {
                desayuno: "Tortilla de huevo con jamón y queso",
                almuerzo: "Lomo de cerdo con puré de papas y brócoli",
                cena: "Pollo al horno con ensalada mixta"
            },
            domingo: {
                desayuno: "Smoothie de proteína con frutos rojos",
                almuerzo: "Pollo a la parrilla con arroz y ensalada",
                cena: "Lasaña de carne con espinacas"
            }
        }
    },
    {
        id: 3,
        nombre: "Plan de Mantenimiento",
        imagenPlanAlimentacion: 'https://example.com/plan1',
        descripcion: "Un plan balanceado para mantener el peso y llevar una alimentación saludable.",
        usos: 14,
        duracion: 8,  // semanas
        categoria: 'Definición',
        oculto: false,
        detalleDias: {
            lunes: {
                desayuno: "Batido de frutas con yogur y avena",
                almuerzo: "Sándwich de pollo con aguacate y ensalada",
                cena: "Pescado al horno con verduras"
            },
            martes: {
                desayuno: "Tostadas de aguacate con huevo",
                almuerzo: "Ensalada de atún con vegetales",
                cena: "Pollo asado con papas al horno"
            },
            miércoles: {
                desayuno: "Avena con frutas y nueces",
                almuerzo: "Wrap de pavo con vegetales",
                cena: "Salmón a la parrilla con espinacas"
            },
            jueves: {
                desayuno: "Tortilla de espinacas y champiñones",
                almuerzo: "Quinoa con pollo y ensalada",
                cena: "Pechuga de pavo con brócoli al vapor"
            },
            viernes: {
                desayuno: "Yogur natural con frutas y granola",
                almuerzo: "Pasta integral con salsa de tomate y pavo",
                cena: "Ensalada de pollo con aguacate"
            },
            sábado: {
                desayuno: "Tostadas integrales con mantequilla de maní",
                almuerzo: "Arroz con pollo y vegetales",
                cena: "Tacos de pescado con ensalada"
            },
            domingo: {
                desayuno: "Batido de frutas con avena",
                almuerzo: "Salmón a la plancha con quinoa",
                cena: "Pollo a la parrilla con ensalada verde"
            }
        }
    }
];

export const PlanAlimentacion = () => {
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedMealPlan, setSelectedMealPlan] = useState(null);
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
    const handleEditarPlanAlimentacion = () => {
        const planEntrenamiento = rows.find(row => row.id === selectedRow);
        setSelectedMealPlan(planEntrenamiento);
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
            field: 'categoria',
            headerName: 'Categoría',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${params.row.categoria === 'Volumen' ? 'bg-purple-100 text-purple-700'
                                : params.row.categoria === 'Definición' ? 'bg-orange-100 text-orange-700'
                                    : 'bg-sky-100 text-sky-700'

                            }`}
                    >
                        {params.row.categoria}
                    </span>
                </div>
            ),
            flex: 0.3,
            minWidth: 150
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
                        <MenuItem onClick={handleEditarPlanAlimentacion}>
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
                <CrearPlanAlimentacion onBack={handleBackToList} />
            )}

            {currentView === 'edit' && selectedMealPlan && (
                <EditarPlanAlimentacion mealPlan={selectedMealPlan} onBack={handleBackToList} />
            )}
        </div>
    )
}
