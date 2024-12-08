import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { esES } from "@mui/x-data-grid/locales";
import {
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { TbDotsVertical } from "react-icons/tb";
import { FaTrash, FaSearch, FaList } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";
import { deleteUser, findAllUsers } from "../../../services/users/users";

const translateGender = (gender) => {
  switch (gender) {
    case "MALE":
      return "Masculino";
    case "FEMALE":
      return "Femenino";
    case "OTHER":
      return "Otro";
    default:
      return "n/a";
  }
};

const translateType = (type) => {
  switch (type) {
    case "STUDENT":
      return "Estudiante";
    case "PROFESSOR":
      return "Profesor";
    case "ADMINISTRATION":
      return "Administración";
    default:
      return "n/a";
  }
};

export const Lista = ({ onVerDetalles }) => {
  const [searchText, setSearchText] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const usuarios = await findAllUsers();
        setRows(usuarios);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
      setLoading(false);
    };
    fetchData();
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

  const handleVerDetalles = () => {
    const user = rows.find((row) => row.id === selectedRow);
    if (user) {
      onVerDetalles(user); // Pasa el usuario seleccionado al componente padre
    }
    handleMenuClose(); // Cierra el menú
  };

  // Función para ocultar/mostrar usuarios
  const handleDeleteUser = () => {
    // setRows((prevRows) =>
    //   prevRows.map((row) =>
    //     row.id === selectedRow ? { ...row, oculto: !row.oculto } : row
    //   )
    // );
    handleMenuClose(); // Cierra el menú después de actualizar
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      field: "nombre",
      headerName: "Nombre",
      renderCell: (params) => (
        <div className="flex items-center gap-2 justify-start h-full">
          <span className="lg:text-sm text-xs text-balance font-semibold">
            {params.row.name}
          </span>
        </div>
      ),
      flex: 0.6,
      minWidth: 200,
    },
    {
      field: "correo",
      headerName: "Correo",
      renderCell: (params) => (
        <div className="flex items-center gap-2 justify-start h-full">
          <span className="lg:text-sm text-xs text-balance">
            {params.row.email}
          </span>
        </div>
      ),
      flex: 0.6,
      minWidth: 200,
    },

    {
      field: "genero",
      headerName: "Género",
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <span
            className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 ${
              params.row.gender === "MALE"
                ? "bg-sky-100 text-sky-700"
                : params.row.gender === "FEMALE"
                ? "bg-pink-100 text-pink-700"
                : params.row.gender === "OTHER"
                ? "bg-gray-100 text-gray-700"
                : ""
            }`}>
            {params.row.gender === "MALE" ? (
              <IoMale />
            ) : params.row.gender === "FEMALE" ? (
              <IoFemale />
            ) : params.row.gender === "OTHER" ? (
              <IoMaleFemale />
            ) : (
              <></>
            )}
            {translateGender(params.row.gender)}
          </span>
        </div>
      ),
      flex: 0.4,
      minWidth: 150,
    },

    {
      field: "tipo",
      headerName: "Tipo",
      renderCell: (params) => (
        <div className="flex items-center justify-start h-full">
          <span
            className={`px-3 py-1 lg:text-sm text-xs rounded-full font-medium flex items-center gap-1 
        ${
          params.row.userType === "STUDENT"
            ? "bg-[#CCE0F3] text-[#03346E]"
            : params.row.userType === "PROFESSOR"
            ? "bg-[#fed4da] text-[#B8001F]"
            : "bg-[#F1F1D3] text-[#61614A]"
        }`}>
            {translateType(params.row.userType)}
          </span>
        </div>
      ),
      flex: 0.4,
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
            startAdornment: <FaSearch className="pr-1 size-5" />,
          }}
        />
      </div>

      <div className="w-full flex-1 overflow-auto">
        <DataGrid
          loading={loading}
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
        <MenuItem onClick={handleVerDetalles}>
          <ListItemIcon>
            <FaList />
          </ListItemIcon>
          Ver Detalles
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <FaTrash />
          </ListItemIcon>
          Eliminar
        </MenuItem>
      </Menu>
    </div>
  );
};
