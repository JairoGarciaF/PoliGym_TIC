import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import { FaSave, FaChevronLeft } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { findAllExercises } from "../../../services/exercise/exercise";
import {
  updateRoutine,
  findExercisesInRoutine,
} from "../../../services/routine/routine";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const EditarRutina = ({ routine, onBack, refreshData }) => {
  const [workout, setWorkout] = useState({
    name: routine?.name || "",
    description: routine?.description || "",
    frequency: routine?.frequency || 0,
    duration: routine?.duration || 0,
    level: routine?.level || "",
    category: routine?.category || "",
    trainingType: routine?.trainingType || "",
    exercisesInWorkout: [],
  });
  const [exerciseData, setExerciceData] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        setLoading(true);
        const exercises = await findAllExercises();
        setExerciceData(exercises);
        setSelectedExercise(exercises[0].id);
        // Utiliza Promise.all para manejar todas las operaciones asíncronas
        const exercisesInRoutine = await Promise.all(
          routine.exercisesInWorkout.map(async (exercise) => {
            const { id, workoutId, ...rest } = await findExercisesInRoutine(
              exercise.id
            ); // Excluir propiedades
            return rest;
          })
        );

        // Actualiza el estado con los datos resueltos
        setWorkout({
          ...workout,
          exercisesInWorkout: exercisesInRoutine,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los ejercicios", error);
      }
    };
    fetchExercises();
  }, []);

  const handleChange = (e) => {
    setWorkout({
      ...workout,
      [e.target.name]:
        e.target.name === "frequency" || e.target.name === "duration"
          ? parseInt(e.target.value)
          : e.target.value,
    });
  };

  // Agregar un ejercicio con id, nombre y campos vacíos de series, repeticiones, descanso
  const agregarEjercicio = () => {
    if (
      !workout.exercisesInWorkout.some(
        (item) => item.exerciseId === selectedExercise
      )
    ) {
      const ejercicio = exerciseData.find((ex) => ex.id === selectedExercise);
      setWorkout({
        ...workout,
        exercisesInWorkout: [
          ...workout.exercisesInWorkout,
          {
            exerciseId: ejercicio.id,
            sets: 0,
            reps: 0,
            weight: 0,
            restTime: 0,
            order: workout.exercisesInWorkout.length + 1,
          },
        ],
      });
    }
  };

  const removerEjercicio = (id) => {
    setWorkout({
      ...workout,
      exercisesInWorkout: workout.exercisesInWorkout.filter(
        (item) => item.exerciseId !== id
      ),
    });
  };

  const handleExerciseChange = (id, field, value) => {
    setWorkout({
      ...workout,
      exercisesInWorkout: workout.exercisesInWorkout.map((item) =>
        item.exerciseId === id ? { ...item, [field]: value } : item
      ),
    });
  };

  // Validar y manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !workout.name ||
      !workout.trainingType ||
      !workout.level ||
      !workout.category ||
      !workout.frequency ||
      !workout.duration ||
      !workout.description ||
      workout.exercisesInWorkout.length === 0
    ) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, complete todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
      return;
    }
    setLoading(true);

    try {
      await updateRoutine(routine.id, workout);
      setLoading(false);
      Swal.fire({
        title: "Rutina actualizada",
        text: "La rutina se actualizó correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      }).then(() => {
        refreshData();
        onBack();
      });
    } catch (error) {
      setLoading(false);
      console.error("Error al actualizar la rutina", error);
      Swal.fire({
        title: "Error",
        text: "Ha ocurrido un error al intentar actualizar la rutina.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
    }
  };

  const handleTextChange = (e) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-.,#%':]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // Función para permitir solo la entrada de números
  const handleNumeroInput = (e) => {
    const regex = /^[0-9]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
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
        Editar Rutina
      </h2>
      <div className="flex flex-col flex-1 overflow-y-auto pb-2">
        <Grid
          container
          spacing={2}
          className="pt-4"
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "Open Sans",
            },
          }}>
          <Grid size={{ lg: 6, xs: 12 }}>
            <TextField
              label="Nombre"
              name="name"
              value={workout.name}
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
          <Grid size={{ lg: 6, xs: 12 }}>
            <TextField
              label="Tipo de entrenamiento"
              name="trainingType"
              value={workout.trainingType}
              onChange={handleChange}
              onKeyPress={handleTextChange}
              inputProps={{ maxLength: 50 }}
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
          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Nivel
              </InputLabel>
              <Select
                label="Nivel"
                name="level"
                value={workout.level}
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
          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Categoría
              </InputLabel>
              <Select
                label="Categoría"
                name="category"
                value={workout.category}
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
                  value="STRENGTH">
                  Fuerza
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="CARDIO">
                  Cardio{" "}
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="FLEXIBILITY">
                  Flexibilidad
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <TextField
                label="Frequencia"
                name="frequency"
                size="small"
                type="number"
                value={workout.frequency}
                inputProps={{ min: 0, max: 5 }}
                onKeyPress={handleNumeroInput}
                inputMode="numeric"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={{ md: 3, sm: 6, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <TextField
                label="Duración (min)"
                name="duration"
                size="small"
                type="number"
                value={workout.duration}
                inputProps={{ min: 0, max: 90 }}
                onKeyPress={handleNumeroInput}
                inputMode="numeric"
                onChange={handleChange}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Descripción"
              size="small"
              name="description"
              inputProps={{ maxLength: 300 }}
              value={workout.description}
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

          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            size={12}>
            <FormControl
              size="small"
              sx={{
                width: window.innerWidth < 770 ? "100%" : "60%",
              }}>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Ejercicio
              </InputLabel>
              <Select
                label="Ejercicio"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
                fullWidth
                MenuProps={MenuProps}
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                {exerciseData.map((exercise) => (
                  <MenuItem
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                      },
                    }}
                    key={exercise.id}
                    value={exercise.id}>
                    {exercise.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton
              onClick={agregarEjercicio}
              sx={{
                backgroundColor: "#16243e",
                color: "#fff",
                "&:hover": {
                  color: "#16243e",
                  backgroundColor: "#e2e6ee",
                },
              }}>
              <AiOutlinePlus className="xl:size-5 size-4" />
            </IconButton>
          </Grid>
        </Grid>

        <div className=" my-4">
          {/* Tabla de ejercicios */}
          <Table
            size="small"
            sx={{
              "& .MuiTableCell-root": {
                fontFamily: "Open Sans",
              },
            }}>
            <TableHead>
              <TableRow>
                <TableCell>Ejercicio</TableCell>
                <TableCell>Series</TableCell>
                <TableCell>Repeticiones</TableCell>
                <TableCell>Peso (kg)</TableCell>
                <TableCell>Descanso (seg)</TableCell>
                <TableCell>Borrar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workout.exercisesInWorkout.map((item, index) => (
                <TableRow key={item.exerciseId}>
                  <TableCell>
                    {exerciseData.find((ex) => ex.id === item.exerciseId)?.name}
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.sets}
                      inputProps={{ min: 0, max: 5 }}
                      onKeyPress={handleNumeroInput}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleExerciseChange(
                          item.exerciseId,
                          "sets",
                          parseInt(e.target.value)
                        )
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize:
                            window.innerWidth < 640 ? "0.875rem" : "1rem",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.reps}
                      inputProps={{ min: 0, max: 20 }}
                      onKeyPress={handleNumeroInput}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleExerciseChange(
                          item.exerciseId,
                          "reps",
                          parseInt(e.target.value)
                        )
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize:
                            window.innerWidth < 640 ? "0.875rem" : "1rem",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.weight}
                      inputProps={{ min: 0, max: 300 }}
                      onKeyPress={handleNumeroInput}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleExerciseChange(
                          item.exerciseId,
                          "weight",
                          parseInt(e.target.value)
                        )
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize:
                            window.innerWidth < 640 ? "0.875rem" : "1rem",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      size="small"
                      type="number"
                      value={item.restTime}
                      inputProps={{ min: 0, max: 1800 }}
                      onKeyPress={handleNumeroInput}
                      inputMode="numeric"
                      onChange={(e) =>
                        handleExerciseChange(
                          item.exerciseId,
                          "restTime",
                          parseInt(e.target.value)
                        )
                      }
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize:
                            window.innerWidth < 640 ? "0.875rem" : "1rem",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => removerEjercicio(item.exerciseId)}
                      color="error">
                      <AiOutlineDelete className="xl:size-6 size-5" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      {/* Botones */}
      <div className="flex gap-2 justify-end justify-self-end">
        <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
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
                window.innerWidth < 640
                  ? 10
                  : window.innerWidth < 1024
                  ? 12
                  : 14,
            }}>
            Volver
          </Button>
          <Button
            variant="contained"
            type="submit"
            endIcon={<FaSave className="xl:size-4 size-3" />}
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
            Guardar
          </Button>
        </Grid>
      </div>
    </form>
  );
};
