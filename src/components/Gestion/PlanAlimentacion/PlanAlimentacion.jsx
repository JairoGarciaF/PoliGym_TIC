import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import {
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  Button,
} from "@mui/material";
import { TbDotsVertical } from "react-icons/tb";
import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { CrearPlanAlimentacion } from "./CrearPlanAlimentacion";
import { EditarPlanAlimentacion } from "./EditarPlanAlimentacion";
import { BiLoaderCircle } from "react-icons/bi";
import {
  findAllNutritionPlan,
  deleteNutritionPlan,
} from "../../../services/plans/nutritionPlan";

export const PlanAlimentacion = () => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedMealPlan, setSelectedMealPlan] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNutritionPlans = async () => {
    try {
      setLoading(true);
      const nutritionPlans = await findAllNutritionPlan();
      setRows(nutritionPlans);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los planes de alimentación");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchNutritionPlans();
  }, []);

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
    setCurrentView("add");
  };
  const handleEditarPlanAlimentacion = () => {
    const planEntrenamiento = rows.find((row) => row.id === selectedRow);
    setSelectedMealPlan(planEntrenamiento);
    setCurrentView("edit");
    handleMenuClose(); // Cierra el menú
  };

  const handleBackToList = () => {
    setCurrentView("list");
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteNutritionPlan(selectedRow);
    await fetchNutritionPlans();
    setLoading(false);
    handleMenuClose(); // Cierra el menú después de actualizar
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const categoryTranslate = (category) => {
    switch (category) {
      case "WEIGHT_LOSS":
        return "Pérdida de peso";
      case "MUSCLE_GAIN":
        return "Ganancia de músculo";
      case "DEFINITION":
        return "Definición";
    }
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      renderCell: (params) => (
        <div className="flex items-center gap-2 justify-start h-full">
          <span className="lg:text-sm text-xs text-balance font-semibold">
            {params.row.name}
          </span>
        </div>
      ),
      flex: 0.5,
      minWidth: 200,
    },
    {
      field: "description",
      headerName: "Descripción",
      renderCell: (params) => (
        <div className="flex items-center gap-2 justify-start h-full">
          <span className="lg:text-sm text-xs text-balance">
            {params.row.description}
          </span>
        </div>
      ),
      flex: 1,
      minWidth: 400,
    },
    {
      field: "duration",
      headerName: "Duración",
      renderCell: (params) => (
        <div className="flex items-center gap-2 justify-start h-full">
          <span className="px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 bg-lime-100 text-lime-700">
            {params.row.duration} semanas
          </span>
        </div>
      ),
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "category",
      headerName: "Categoría",
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <span
            className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${
                              params.row.categoria === "MUSCLE_GAIN"
                                ? "bg-purple-100 text-purple-700"
                                : params.row.categoria === "DEFINITION"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-sky-100 text-sky-700"
                            }`}>
            {categoryTranslate(params.row.category)}
          </span>
        </div>
      ),
      flex: 0.3,
      minWidth: 150,
    },
    {
      field: "acciones",
      headerName: "",
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={(e) => handleMenuClick(e, params.id)}>
          <TbDotsVertical />
        </IconButton>
      ),
      flex: 0.15,

      buttonClassName: "theme-header",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col items-center justify-center">
        <BiLoaderCircle className="xl:size-20 size-16 animate-spin text-azul-marino-500" />
        <p className="text-azul-marino-500 text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="pt-1 overflow-auto flex-1 flex flex-col space-y-4 open-sans">
      {currentView === "list" && (
        <>
          <div className="flex sm:flex-row gap-2 pt-0.5 flex-col justify-between items-center">
            <TextField
              label="Buscar"
              variant="outlined"
              value={searchText}
              onChange={handleSearch}
              size="small"
              InputProps={{
                startAdornment: <FaSearch className="pr-1 size-5" />,
              }}
            />
          </div>

          <div className="w-full flex-1 overflow-auto">
            <DataGrid
              rows={filteredRows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              localeText={esES.components.MuiDataGrid.defaultProps.localeText}
              disableSelectionOnClick
              sx={{
                borderRadius: 3,
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#16243e",
                  color: "#fff",
                  fontFamily: "Montserrat Alternates",
                  fontSize: window.innerWidth < 640 ? 13 : 14,
                },
                "& .MuiSvgIcon-root": {
                  color: "#fff",
                },
                "& .MuiDataGrid-columnHeaders .MuiButtonBase-root:hover": {
                  backgroundColor: "#233a64",
                  color: "#fff",
                },
                "& .MuiDataGrid-main, .MuiDataGrid-selectedRowCount, .MuiTablePagination-selectLabel, .MuiInputBase-root, .MuiTablePagination-displayedRows ":
                  {
                    fontFamily: "Open Sans",
                  },
              }}
            />
          </div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}>
            <MenuItem onClick={handleEditarPlanAlimentacion}>
              <ListItemIcon>
                <FaEdit />
              </ListItemIcon>
              Editar
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <FaTrash />
              </ListItemIcon>
              Elminar
            </MenuItem>
          </Menu>

          <div className="flex flex-initial justify-end">
            <Button
              variant="contained"
              type="submit"
              onClick={handleAnadirPlanEntrenamiento}
              endIcon={<FaPlus className="xl:size-4 size-3" />}
              sx={{
                backgroundColor: "#16243e",
                fontFamily: "Montserrat Alternates",
                color: "#fff",
                "&:hover": {
                  color: "#16243e",
                  backgroundColor: "#e2e6ee",
                },
                fontSize:
                  window.innerWidth < 640
                    ? 10
                    : window.innerWidth < 1024
                    ? 12
                    : 14,
              }}>
              Añadir
            </Button>
          </div>
        </>
      )}

      {currentView === "add" && (
        <CrearPlanAlimentacion
          onBack={handleBackToList}
          refreshData={fetchNutritionPlans}
        />
      )}

      {currentView === "edit" && selectedMealPlan && (
        <EditarPlanAlimentacion
          mealPlan={selectedMealPlan}
          onBack={handleBackToList}
          refreshData={fetchNutritionPlans}
        />
      )}
    </div>
  );
};
