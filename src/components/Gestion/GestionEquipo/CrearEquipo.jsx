import React, { useState } from "react";
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
import { createEquipment } from "../../../services/equipment/equipment";
import { BiLoaderCircle } from "react-icons/bi";

const validateImage = (file) => {
  if (!file) return false;
  // Verificar el tipo de archivo (solo JPG, JPEG o PNG)
  const validTypes = ["image/jpg", "image/jpeg", "image/png"];
  if (!validTypes.includes(file.type)) {
    Swal.fire({
      title: "Formato incorrecto",
      text: "Solo se permiten imágenes en formato JPG, JPEG o PNG.",
      icon: "error",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#16243e",
    });
    return false;
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
    return false;
  }

  return true;
};

export const CrearEquipo = ({ onBack, refreshData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];

    if (!validateImage(file)) return;

    try {
      setImageLoading(true);
      const url = await uploadImage(file, "equipos");
      if (url) {
        setMediaUrl(url);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }
    setImageLoading(false);
    e.target.value = null; // Limpiar el input para permitir subir la misma imagen
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

    // Validar que todos los campos estén completos
    if (!name || !description || !category || !status || !mediaUrl) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
      return;
    }
    setLoading(true);

    try {
      await createEquipment({
        name,
        mediaUrl,
        description,
        category,
        status,
      });

      setLoading(false);
      Swal.fire({
        title: "Equipo creado",
        text: "El equipo se creó correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      }).then(() => {
        refreshData();
        onBack();
      });
    } catch (error) {
      console.error("Error:", error);

      setLoading(false);

      // Verifica si el error ocurrió al subir la imagen o al crear el equipo
      const isUploadError = error.message?.includes("subir la imagen");

      Swal.fire({
        title: isUploadError
          ? "Error al subir la imagen"
          : "Error al crear el equipo",
        text: isUploadError
          ? "Ocurrió un error al subir la imagen, por favor intenta de nuevo."
          : "Ocurrió un error al crear el equipo, por favor intenta de nuevo.",
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

  if (loading) {
    return (
      <div className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col items-center justify-center">
        <BiLoaderCircle className="xl:size-20 size-16 animate-spin text-azul-marino-500" />
        <p className="text-azul-marino-500 text-xl">Creando equipo...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white open-sans flex-1 overflow-auto lg:px-24 md:px-12  h-full flex flex-col">
      <h2 className="text-base font-semibold montserrat-alternates sm:text-lg  text-azul-marino-500 pb-4">
        Crear Equipo
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
                  accept=".png, .jpeg, .jpg"
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
              Formatos soportados: JPG, JPEG, PNG.
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
                  value="MACHINE">
                  Máquina
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="FREE_WEIGHT">
                  Peso Libre
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="BODYWEIGHT">
                  Peso Corporal
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="CARDIO">
                  Cardio
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="ACCESSORY">
                  Accesorio
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
                Estado
              </InputLabel>
              <Select
                label="Estado"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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
                  value="AVAILABLE">
                  Disponible
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="IN_MAINTENANCE">
                  En Mantenimiento
                </MenuItem>
                <MenuItem
                  sx={{
                    "& .MuiSelect-select": {
                      fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                    },
                  }}
                  value="OUT_OF_ORDER">
                  Fuera de Servicio
                </MenuItem>
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
