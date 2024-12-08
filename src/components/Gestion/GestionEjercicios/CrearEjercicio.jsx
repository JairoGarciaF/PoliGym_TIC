import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import {
  uploadImage,
  deleteImage,
} from "../../../services/cloudinary/cloudinary";
import { BiLoaderCircle } from "react-icons/bi";
import { createExercise } from "../../../services/exercise/exercise";
import { findAllEquipment } from "../../../services/equipment/equipment";
import { findAllMuscleGroups } from "../../../services/muscleGroup/muscleGroup";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const CrearEjercicio = ({ onBack, refreshData }) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [category, setCategory] = useState("");
  const [equipment, setEquipment] = useState([]);
  const [equipmentIds, setEquipmentIds] = useState([]);
  const [description, setDescription] = useState("");
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [muscleGroupsIds, setMuscleGroupsIds] = useState([]);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipmentData, muscleGroupsData] = await Promise.all([
          findAllEquipment(),
          findAllMuscleGroups(),
        ]);
        setEquipment(equipmentData);
        setMuscleGroups(muscleGroupsData);
      } catch (error) {
        console.error("Error al obtener los equipos:", error);
      }
    };
    fetchData();
  }, []);

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      // Verificar el tipo de archivo (solo GIF )
      const validTypes = ["image/gif"];
      if (!validTypes.includes(file.type)) {
        Swal.fire({
          title: "Formato incorrecto",
          text: "Solo se permiten imágenes en formato GIF.",
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#16243e",
        });
        return;
      }

      // Verificar el tamaño del archivo (máximo 2MB)
      const maxSize = 2 * 1024 * 1024; // 2MB en bytes
      if (file.size > maxSize) {
        Swal.fire({
          title: "Archivo demasiado grande",
          text: "El tamaño máximo permitido es de 2MB.",
          icon: "warning",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#16243e",
        });
        return;
      }
    }
    try {
      setImageLoading(true);
      const url = await uploadImage(file, "ejercicios");
      if (url) {
        setMediaUrl(url);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
    setImageLoading(false);
    e.target.value = null;
  };

  const handleEliminarImagen = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Estás seguro?",
      text: "La imagen se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      confirmButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#16243e",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setImageLoading(true);
          const publicId = mediaUrl.split("/").pop().split(".")[0];
          await deleteImage(publicId);
          setImageLoading(false);
          Swal.fire({
            title: "Imagen eliminada",
            text: "La imagen se eliminó correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#16243e",
          });
          setMediaUrl("");
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          setImageLoading(false);
          Swal.fire({
            title: "Error al eliminar la imagen",
            text: "Ocurrió un error al eliminar la imagen, por favor intenta de nuevo.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#16243e",
          });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !level ||
      !category ||
      !equipmentIds.length ||
      !muscleGroupsIds.length ||
      !description ||
      !recommendation ||
      !mediaUrl
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
      await createExercise({
        mediaUrl,
        name,
        level,
        category,
        equipmentIds,
        description,
        muscleGroupsIds,
        recommendation,
      });

      setLoading(false);
      Swal.fire({
        title: "Ejercicio creado",
        text: "El ejercicio se ha creado correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      }).then(() => {
        refreshData();
        onBack();
      });
    } catch (error) {
      console.error("Error al crear el ejercicio", error);
      setLoading(false);

      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al crear el ejercicio. Por favor, inténtelo de nuevo.",
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

  const translateMuscle = (muscle) => {
    switch (muscle) {
      case "biceps":
        return "Bíceps";
      case "triceps":
        return "Tríceps";
      case "chest":
        return "Pecho";
      case "lats":
        return "Dorsales";
      case "abdominals":
        return "Abdomen";
      case "quads":
        return "Cuádriceps";
      case "hamstrings":
        return "Isquiotibiales";
      case "calves":
        return "Pantorrillas";
      case "glutes":
        return "Glúteos";
      case "obliques":
        return "Oblicuos";
      case "forearms":
        return "Antebrazos";
      case "traps":
        return "Trapecios";
      case "lowerback":
        return "Espalda baja";
      case "shoulders":
        return "Hombros";
      case "traps-middle":
        return "Trapecio medio";
      default:
        return "";
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
        Crear Ejercicio
      </h2>
      <div className="flex flex-col flex-1 overflow-y-auto pb-2">
        {/* Subir Imagen */}
        <div className="grid sm:grid-cols-2 justify-center sm:gap-0 gap-4 items-center sm:divide-x-2 sm:divide-y-0 divide-y-2">
          <div className="flex items-center justify-center space-x-4">
            {imageLoading ? (
              <div className="h-28 w-28 bg-gray-200 rounded-lg flex items-center justify-center">
                <BiLoaderCircle className="xl:size-10 size-8 animate-spin text-azul-marino-500" />
              </div>
            ) : mediaUrl != "" ? (
              <img
                src={mediaUrl}
                alt="Perfil"
                className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
              />
            ) : (
              <div className="h-28 w-28 bg-gray-200 rounded-lg " />
            )}
            <div className="flex gap-2 items-center">
              <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                <MdOutlineFileUpload className="xl:size-7 size-6" />
                <input
                  type="file"
                  className="hidden"
                  accept=".gif"
                  onChange={handleImagenChange}
                />
              </label>
              {mediaUrl != "" && (
                <button
                  onClick={handleEliminarImagen}
                  className=" hover:bg-rojo-100 text-red-500 rounded  p-1.5">
                  <AiOutlineDelete className="xl:size-7 size-6" />
                </button>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <p className="md:text-base text-sm text-azul-marino-500">
              Requisitos:
            </p>
            <p className="xl:text-sm text-xs text-center text-gray-500 mt-2">
              Formatos soportados: GIF.
            </p>
            <p className="xl:text-sm text-xs text-center text-gray-500">
              Tamaño máximo: 2MB.
            </p>
          </div>
        </div>

        <Grid
          container
          spacing={2}
          className="pt-4"
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "Open Sans",
            },
          }}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <Grid size={{ sm: 3, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Nivel
              </InputLabel>
              <Select
                label="Nivel"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
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
          <Grid size={{ sm: 3, xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Categoría
              </InputLabel>
              <Select
                label="Categoría"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
          <Grid size={{ xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Equipos
              </InputLabel>
              <Select
                label="Equipos"
                multiple={true}
                value={equipmentIds}
                onChange={(e) => setEquipmentIds(e.target.value)}
                renderValue={(selected) =>
                  equipment
                    .filter((equip) => selected.includes(equip.id))
                    .map((equip) => equip.name)
                    .join(", ")
                }
                MenuProps={MenuProps}
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                {equipment.map((equip) => (
                  <MenuItem
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                      },
                    }}
                    key={equip.id}
                    value={equip.id}>
                    {equip.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormControl size="small" fullWidth>
              <InputLabel
                sx={{
                  fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                }}>
                Grupos Musculares
              </InputLabel>
              <Select
                multiple={true}
                label="Grupos Musculares"
                value={muscleGroupsIds}
                onChange={(e) => setMuscleGroupsIds(e.target.value)}
                renderValue={(selected) =>
                  muscleGroups
                    .filter((muscle) => selected.includes(muscle.id))
                    .map((muscle) => translateMuscle(muscle.name))
                    .join(", ")
                }
                MenuProps={MenuProps}
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                {muscleGroups.map((muscle) => (
                  <MenuItem
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                      },
                    }}
                    key={muscle.id}
                    value={muscle.id}>
                    {translateMuscle(muscle.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={12}>
            <TextField
              label="Descripción"
              size="small"
              inputProps={{ maxLength: 300 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyPress={handleTextChange}
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
          <Grid size={12}>
            <TextField
              label="Recomendación"
              size="small"
              inputProps={{ maxLength: 500 }}
              value={recommendation}
              onKeyPress={handleTextChange}
              onChange={(e) => setRecommendation(e.target.value)}
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
