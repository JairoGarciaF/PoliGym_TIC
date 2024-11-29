import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/en-gb";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { createTrainingPlan } from "../../../services/plans/trainingPlan";
import { findAllRoutine } from "../../../services/routine/routine";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const CrearPlanEntrenamiento = ({ onBack, refreshData }) => {
  const [trainingPlan, setTrainingPlan] = useState({
    name: "",
    level: "",
    description: "",
    startDate: null,
    endDate: null,
    workoutsIds: [],
  });
  const [workoutsData, setWorkoutsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRoutines = async () => {
      try {
        setLoading(true);
        const routines = await findAllRoutine();
        setWorkoutsData(routines);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener las rutinas");
        setLoading(false);
      }
    };
    fetchRoutines();
  }, []);

  const handleChange = (e) => {
    setTrainingPlan({
      ...trainingPlan,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (name, value) => {
    setTrainingPlan({
      ...trainingPlan,
      [name]: value,
    });
  };

  const handleWorkoutsChange = (e) => {
    setTrainingPlan({
      ...trainingPlan,
      workoutsIds: e.target.value,
    });
  };

  const handleTextChange = (e) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-.,#%':]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // comprobar startDate < endDate
    if (trainingPlan.startDate >= trainingPlan.endDate) {
      Swal.fire({
        title: "Error",
        text: "La fecha de inicio debe ser menor a la fecha de fin",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
      return;
    }

    // comprobar campos vacíos
    if (
      !trainingPlan.name ||
      !trainingPlan.level ||
      !trainingPlan.startDate ||
      !trainingPlan.endDate ||
      !trainingPlan.workoutsIds.length
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, conpleta todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
      return;
    }
    setLoading(true);

    try {
      await createTrainingPlan(trainingPlan);
      setLoading(false);
      Swal.fire({
        title: "Plan de entrenamiento creado",
        text: "El plan de entrenamiento se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      }).then(() => {
        refreshData();
        onBack();
      });
    } catch (error) {
      console.error("Error al crear el plan de entrenamiento", error);
      Swal.fire({
        title: "Error",
        text: "Error al crear el plan de entrenamiento",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
    }
  };

  if (loading) {
    return (
      <div className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col items-center justify-center">
        <BiLoaderCircle className="xl:size-20 size-16 animate-spin text-azul-marino-500" />
        <p className="text-azul-marino-500 text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col">
      <h2 className="text-base font-semibold montserrat-alternates sm:text-lg  text-azul-marino-500 pb-4">
        Crear Plan de Entrenamiento
      </h2>
      <div className="flex flex-col flex-1 pb-2 overflow-y-auto ">
        {/* Otros campos del formulario */}
        <Grid
          container
          spacing={2}
          className="pt-4"
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "Open Sans",
            },
          }}>
          <Grid size={{ md: 9, xs: 12 }}>
            <TextField
              label="Nombre"
              name="name"
              value={trainingPlan.name}
              onChange={handleChange}
              onKeyPress={handleTextChange}
              fullWidth
              size="small"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                },
              }}
            />
          </Grid>
          <Grid size={{ md: 3, sm: 6, xs: 12 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Dificultad
              </InputLabel>
              <Select
                label="Dificultad"
                name="level"
                value={trainingPlan.level}
                onChange={handleChange}
                fullWidth
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="BASIC">
                  Básico
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="INTERMEDIATE">
                  Intermedio
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="ADVANCED">
                  Avanzado
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ sm: 6, xs: 12 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Rutinas
              </InputLabel>
              <Select
                label="Rutinas"
                multiple={true}
                value={trainingPlan.workoutsIds}
                onChange={handleWorkoutsChange}
                renderValue={(selected) =>
                  workoutsData
                    .filter((workout) => selected.includes(workout.id))
                    .map((workout) => workout.name)
                    .join(", ")
                }
                MenuProps={MenuProps}
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                {workoutsData.map((workout) => (
                  <MenuItem
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                      },
                    }}
                    key={workout.id}
                    value={workout.id}>
                    {workout.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb">
              <DatePicker
                label="Inicio"
                value={trainingPlan.startDate}
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
                onChange={(e) => handleDateChange("startDate", e)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb">
              <DatePicker
                label="Fin"
                value={trainingPlan.endDate}
                name="endDate"
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                  },
                }}
                onChange={(e) => handleDateChange("endDate", e)}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Descripción"
              name="description"
              size="small"
              inputProps={{ maxLength: 300 }}
              value={trainingPlan.description}
              onKeyPress={handleTextChange}
              onChange={handleChange}
              multiline
              rows={2}
              fullWidth
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                },
                "& .MuiInputLabel-root": {
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                },
              }}
            />
          </Grid>
        </Grid>
      </div>
      {/* Botones */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outlined"
          onClick={onBack}
          startIcon={<FaChevronLeft className="xl:size-4 size-3" />}
          sx={{
            fontFamily: "Montserrat Alternates",
            borderColor: "#16243e",
            color: "#16243e",
            borderWidth: 1,
            "&:hover": {
              backgroundColor: "#e2e6ee",
            },
            fontSize:
              window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14,
          }}>
          Volver
        </Button>
        <Button
          variant="contained"
          type="submit"
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
              window.innerWidth < 640 ? 10 : window.innerWidth < 1024 ? 12 : 14,
          }}>
          Crear
        </Button>
      </div>
    </form>
  );
};
