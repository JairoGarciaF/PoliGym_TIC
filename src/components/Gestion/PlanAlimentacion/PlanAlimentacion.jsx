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
        descripcion: "Un plan de alimentación diseñado para reducir la ingesta calórica y favorecer la pérdida de peso.",
        duracion: 4,  // semanas
        categoria: "Pérdida de peso",
        oculto: false,
        detalleDias: {
            lunes: {
                desayuno: "Avena con frutas y miel",
                almuerzo: "Ensalada de pollo con aguacate",
                cena: "Pescado a la plancha con verduras al vapor"
            },
            martes: {
                desayuno: "Tostadas integrales con aguacate y huevo",
                almuerzo: "Sopa de verduras y pechuga de pollo",
                cena: "Ensalada de atún con espinacas"
            },
            miércoles: {
                desayuno: "Smoothie verde con espinacas, manzana y avena",
                almuerzo: "Quinoa con vegetales y pollo",
                cena: "Salmón con brócoli al vapor"
            },
            jueves: {
                desayuno: "Tostadas integrales con crema de almendras y plátano",
                almuerzo: "Pechuga de pavo con ensalada mixta",
                cena: "Pechuga de pollo a la parrilla con calabacines"
            },
            viernes: {
                desayuno: "Yogur natural con frutas y nueces",
                almuerzo: "Arroz integral con vegetales y tofu",
                cena: "Tortilla de espinacas con champiñones"
            },
            sábado: {
                desayuno: "Batido de proteínas con leche de almendras y avena",
                almuerzo: "Ensalada César con pechuga de pollo",
                cena: "Filete de ternera con ensalada verde"
            },
            domingo: {
                desayuno: "Pan integral con queso cottage y fresas",
                almuerzo: "Pollo asado con papas y brócoli",
                cena: "Sopa de lentejas y verduras"
            }
        }
    },
    {
        id: 2,
        nombre: "Plan de Ganancia Muscular",
        descripcion: "Un plan alto en proteínas y calorías para promover el desarrollo muscular.",
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
        descripcion: "Un plan balanceado para mantener el peso y llevar una alimentación saludable.",
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
        { field: 'nombre', headerName: 'Nombre', flex: 0.5, },
        { field: 'descripcion', headerName: 'Descripción', flex: 1, },
        {
            field: 'duracion',
            headerName: 'Duración',
            renderCell: (params) => (
                <div className='flex items-center gap-2 justify-start h-full'>
                    <span
                        className='px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1 bg-lime-100 text-lime-700'
                    >
                        {params.row.duracion} semanas
                    </span>
                </div>
            ),
            flex: 0.3,
        },
        {
            field: 'categoria',
            headerName: 'Categoría',
            renderCell: (params) => (
                <div className='flex items-center justify-start h-full'>
                    <span
                        className={`px-3 py-1 text-sm rounded-full font-medium flex items-center gap-1  
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
            {currentView === 'list' && (

                <>
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

                    <div className='w-full h-[calc(100%-40px-32px-36px)]'>
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


                    <div className='flex justify-end'>
                        <Button variant="contained"
                            type="submit"
                            onClick={handleAnadirPlanEntrenamiento}

                            endIcon={<FaPlus className='size-4' />}
                            sx={{
                                backgroundColor: '#16243e',
                                fontFamily: 'Montserrat Alternates',
                                color: '#fff',
                                '&:hover': {
                                    color: '#16243e',
                                    backgroundColor: '#e2e6ee',
                                }

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
                <EditarPlanAlimentacion routine={selectedMealPlan} onBack={handleBackToList} />
            )}
        </div>
    )
}
