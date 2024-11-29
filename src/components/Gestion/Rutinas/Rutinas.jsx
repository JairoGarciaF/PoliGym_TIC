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
import { CrearRutina } from "./CrearRutina";
import { EditarRutina } from "./EditarRutina";
import { BiLoaderCircle } from "react-icons/bi";
import {
  findAllRoutine,
  deleteRoutine,
} from "../../../services/routine/routine";

export const Rutinas = () => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [currentView, setCurrentView] = useState("list");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoutine = async () => {
    try {
      setLoading(true);
      const routines = await findAllRoutine();
      setRows(routines);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener las rutinas");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoutine();
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

  const handleAnadirRutina = () => {
    setCurrentView("add");
  };
  const handleEditarRutina = () => {
    const routine = rows.find((row) => row.id === selectedRow);
    setSelectedRoutine(routine);
    setCurrentView("edit");
    handleMenuClose(); // Cierra el menú
  };

  const handleBackToList = () => {
    setCurrentView("list");
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteRoutine(selectedRow);
    await fetchRoutine();
    setLoading(false);
    handleMenuClose(); // Cierra el menú después de actualizar
  };

  const categoryTranslate = (category) => {
    switch (category) {
      case "STRENGTH":
        return "Fuerza";
      case "FLEXIBILITY":
        return "Flexibilidad";
      case "CARDIO":
        return "Cardio";
    }
  };

  const levelTranslate = (status) => {
    switch (status) {
      case "BASIC":
        return "Básico";
      case "INTERMEDIATE":
        return "Intermedio";
      case "ADVANCED":
        return "Avanzado";
    }
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

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
      flex: 0.75,
      minWidth: 350,
    },
    {
      field: "category",
      headerName: "Categoría",
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <span
            className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
              ${
                params.row.category === "CARDIO"
                  ? "bg-orange-100 text-orange-700"
                  : params.row.category === "STRENGTH"
                  ? "bg-blue-100 text-blue-900"
                  : "bg-lime-100 text-lime-700"
              }`}>
            {categoryTranslate(params.row.category)}
          </span>
        </div>
      ),
      flex: 0.3,
      minWidth: 100,
    },
    {
      field: "level",
      headerName: "Nivel",
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <span
            className={`px-3 py-1 capitalize lg:text-sm text-xs rounded-full font-medium flex items-center gap-1  
                            ${
                              params.row.level === "BASIC"
                                ? "bg-green-100 text-green-700"
                                : params.row.level === "INTERMEDIATE"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}>
            {levelTranslate(params.row.level)}
          </span>
        </div>
      ),
      flex: 0.3,
      minWidth: 100,
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
    <div className="pt-1 flex-1 overflow-auto flex flex-col space-y-4 open-sans">
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
            <MenuItem onClick={handleEditarRutina}>
              <ListItemIcon>
                <FaEdit />
              </ListItemIcon>
              Editar
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              <ListItemIcon>
                <FaTrash />
              </ListItemIcon>
              Eliminar
            </MenuItem>
          </Menu>

          <div className="flex flex-initial justify-end">
            <Button
              variant="contained"
              type="submit"
              onClick={handleAnadirRutina}
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
        <CrearRutina onBack={handleBackToList} refreshData={fetchRoutine} />
      )}

      {currentView === "edit" && selectedRoutine && (
        <EditarRutina
          routine={selectedRoutine}
          onBack={handleBackToList}
          refreshData={fetchRoutine}
        />
      )}
    </div>
  );
};
