import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import { FaAngleDown } from "react-icons/fa6";
import { FaPlus, FaChevronLeft } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { BiLoaderCircle } from "react-icons/bi";
import { MdCloudUpload } from "react-icons/md";
import {
  uploadImage,
  deleteImage,
} from "../../../services/cloudinary/cloudinary";
import { createNutritionPlan } from "../../../services/plans/nutritionPlan";

const daysOfWeek = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
const mealTypes = ["BREAKFAST", "LUNCH", "DINNER"];
const categoryTypes = ["WEIGHT_LOSS", "MUSCLE_GAIN", "DEFINITION"];

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

export const CrearPlanAlimentacion = ({ onBack, refreshData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nutritionPlan, setNutritionPlan] = useState({
    name: "",
    description: "",
    imageURL: "",
    duration: 0,
    category: "",
    weeklyMeals: [],
  });

  const [currentMeals, setCurrentMeals] = useState(
    daysOfWeek.map(() => ({
      dayOfWeek: "",
      meals: mealTypes.map(() => ({
        imageURL: "",
        type: "",
        name: "",
        description: "",
        foods: [],
      })),
    }))
  );

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleNutritionPlanChange = (field, value) => {
    setNutritionPlan((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleMealChange = (dayIndex, mealIndex, field, value, type) => {
    const updatedMeals = [...currentMeals];
    updatedMeals[dayIndex].meals[mealIndex][field] = value;
    updatedMeals[dayIndex].meals[mealIndex].type = type;
    setCurrentMeals(updatedMeals);
  };

  const handleAddFood = (dayIndex, mealIndex) => {
    const newFood = { name: "", calories: 0, proteins: 0, carbs: 0, fats: 0 };
    const updatedMeals = [...currentMeals];
    updatedMeals[dayIndex].meals[mealIndex].foods.push(newFood);
    setCurrentMeals(updatedMeals);
  };

  const handleFoodChange = (dayIndex, mealIndex, foodIndex, field, value) => {
    const updatedMeals = [...currentMeals];
    updatedMeals[dayIndex].meals[mealIndex].foods[foodIndex][field] = value;
    setCurrentMeals(updatedMeals);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      Math.min(prevActiveStep + 1, mealTypes.length - 1)
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => Math.max(prevActiveStep - 1, 0));
  };

  const handleCompleteDay = (dayIndex) => {
    // Agregar el día completo al nutritionPlan con un push
    const updatedWeeklyMeals = [...nutritionPlan.weeklyMeals];
    updatedWeeklyMeals[dayIndex] = {
      ...updatedWeeklyMeals[dayIndex],
      dayOfWeek: daysOfWeek[dayIndex], // Guardamos el día de la semana
      meals: currentMeals[dayIndex].meals, // Guardamos las comidas del día
    };

    // Actualizamos el state de nutritionPlan con el nuevo array de weeklyMeals
    setNutritionPlan({
      ...nutritionPlan,
      weeklyMeals: updatedWeeklyMeals,
    });

    setActiveStep(0); // Reiniciar el stepper
  };

  const handleImagenChange = async (e) => {
    const file = e.target.files[0];

    if (!validateImage(file)) return;

    try {
      const url = await uploadImage(file, "planesAlimentacion");
      if (url) {
        handleNutritionPlanChange("imageURL", url);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }

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
          const mediaUrl = nutritionPlan.imageURL;
          const publicId = mediaUrl.split("/").pop().split(".")[0];

          await deleteImage(publicId);
          Swal.fire({
            title: "Imagen eliminada",
            text: "La imagen se eliminó correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#16243e",
          });
          handleNutritionPlanChange("imageURL", "");
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al intentar eliminar la imagen.",
            icon: "error",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#16243e",
          });
        }
      }
    });
  };

  const handleMealImageUpload = async (e, dayIndex, mealIndex, preset) => {
    const file = e.target.files[0];

    if (!validateImage(file)) return;

    try {
      const url = await uploadImage(file, preset);
      if (url) {
        // Actualiza el URL de la imagen en el estado
        const updatedMeals = [...currentMeals];
        updatedMeals[dayIndex].meals[mealIndex].imageURL = url;
        setCurrentMeals(updatedMeals);
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
    }

    e.target.value = null;
  };

  const handleMealImageDelete = async (e, dayIndex, mealIndex) => {
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
          const mediaUrl = currentMeals[dayIndex].meals[mealIndex].imageURL;
          const publicId = mediaUrl.split("/").pop().split(".")[0];

          await deleteImage(publicId);
          Swal.fire({
            title: "Imagen eliminada",
            text: "La imagen se eliminó correctamente.",
            icon: "success",
            confirmButtonText: "Aceptar",
            confirmButtonColor: "#16243e",
          });
          const updatedMeals = [...currentMeals];
          updatedMeals[dayIndex].meals[mealIndex].imageURL = "";
          setCurrentMeals(updatedMeals);
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          Swal.fire({
            title: "Error",
            text: "Ocurrió un error al intentar eliminar la imagen.",
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
      !nutritionPlan.name ||
      !nutritionPlan.description ||
      !nutritionPlan.imageURL ||
      !nutritionPlan.duration ||
      !nutritionPlan.category ||
      !nutritionPlan.weeklyMeals.length
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
      await createNutritionPlan(nutritionPlan);
      setLoading(false);
      Swal.fire({
        title: "Plan de alimentación creado",
        text: "El plan de alimentación se creó correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      }).then(() => {
        refreshData();
        onBack();
      });
    } catch (error) {
      setLoading(false);
      console.error("Error al crear el plan de alimentación:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al crear el plan de alimentación.",
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#16243e",
      });
    }
  };

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

  const mealTranslate = (meal) => {
    switch (meal) {
      case "BREAKFAST":
        return "Desayuno";
      case "LUNCH":
        return "Almuerzo";
      case "DINNER":
        return "Cena";
    }
  };

  const dayTranslate = (day) => {
    switch (day) {
      case "MONDAY":
        return "Lunes";
      case "TUESDAY":
        return "Martes";
      case "WEDNESDAY":
        return "Miércoles";
      case "THURSDAY":
        return "Jueves";
      case "FRIDAY":
        return "Viernes";
      case "SATURDAY":
        return "Sábado";
      case "SUNDAY":
        return "Domingo";
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
        Crear Plan de Alimentación
      </h2>
      <div className="flex flex-col flex-1 overflow-y-auto pb-2">
        {/* Subir Imagen */}
        <div className="grid sm:grid-cols-2 justify-center sm:gap-0 gap-4 items-center sm:divide-x-2 sm:divide-y-0 divide-y-2">
          <div className="flex items-center justify-center space-x-4">
            {nutritionPlan.imageURL != "" ? (
              <img
                src={nutritionPlan.imageURL}
                alt="Perfil"
                className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
              />
            ) : (
              <div className="h-28 w-28 bg-gray-200 rounded-lg " />
            )}
            <div className="flex gap-2 items-center">
              <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                <MdCloudUpload className="xl:size-7 size-6" />
                <input
                  type="file"
                  className="hidden"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleImagenChange}
                />
              </label>
              {nutritionPlan.imageURL != "" && (
                <button
                  onClick={(e) => {
                    handleEliminarImagen(e);
                  }}
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
          spacing={1}
          className="pt-4"
          sx={{
            "& .MuiFormLabel-root": {
              fontFamily: "Open Sans",
            },
          }}>
          <Grid size={{ sm: 6, xs: 12 }}>
            <TextField
              label="Nombre"
              value={nutritionPlan.name}
              onChange={(e) =>
                handleNutritionPlanChange("name", e.target.value)
              }
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
                value={nutritionPlan.category}
                onChange={(e) =>
                  handleNutritionPlanChange("category", e.target.value)
                }
                sx={{
                  "& .MuiSelect-select": {
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  },
                }}>
                {categoryTypes.map((category) => (
                  <MenuItem
                    key={category}
                    sx={{
                      "& .MuiSelect-select": {
                        fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                      },
                    }}
                    value={category}>
                    {categoryTranslate(category)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ sm: 3, xs: 6 }}>
            <TextField
              label="Duración (semanas)"
              size="small"
              type="number"
              value={nutritionPlan.duration}
              inputProps={{ min: 0, max: 24 }}
              onKeyPress={handleNumeroInput}
              inputMode="numeric"
              onChange={(e) =>
                handleNutritionPlanChange("duration", parseInt(e.target.value))
              }
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <TextField
              label="Descripción"
              size="small"
              inputProps={{ maxLength: 300 }}
              value={nutritionPlan.description}
              onChange={(e) =>
                handleNutritionPlanChange("description", e.target.value)
              }
              multiline
              rows={1}
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

        <div className="pt-4 px-0.5">
          {daysOfWeek.map((day, dayIndex) => (
            <Accordion
              disableGutters
              expanded={expanded === day}
              onChange={handleAccordionChange(day)}
              key={day}>
              <AccordionSummary expandIcon={<FaAngleDown />}>
                <Typography
                  sx={{
                    fontFamily: "Montserrat Alternates",
                    fontWeight: 500,
                    fontSize: window.innerWidth < 640 ? "0.875rem" : "1rem",
                  }}
                  className="text-azul-marino-500 font-medium">
                  {dayTranslate(day).toUpperCase()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {mealTypes.map((label) => (
                    <Step key={label}>
                      <StepLabel>{mealTranslate(label)}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <Box>
                  {mealTypes.map((meal, mealIndex) =>
                    activeStep === mealIndex ? (
                      <Box key={meal}>
                        <Typography
                          sx={{
                            fontFamily: "Montserrat Alternates",
                            fontWeight: 500,
                            fontSize:
                              window.innerWidth < 640 ? "0.875rem" : "1rem",
                          }}>
                          {mealTranslate(meal)}
                        </Typography>
                        <Grid
                          container
                          spacing={1}
                          sx={{
                            "& .MuiFormLabel-root": {
                              fontFamily: "Open Sans",
                            },
                          }}>
                          <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            size={6}>
                            <div className="flex items-center justify-center space-x-4">
                              {currentMeals[dayIndex].meals[mealIndex]
                                .imageURL ? (
                                <img
                                  src={
                                    currentMeals[dayIndex].meals[mealIndex]
                                      .imageURL
                                  }
                                  className="h-28 w-28 rounded-lg object-cover border-stone-200 border"
                                  alt="Meal preview"
                                />
                              ) : (
                                <div className="h-28 w-28 bg-gray-200 rounded-lg " />
                              )}

                              <label className="cursor-pointer text-azul-marino-500 hover:bg-azul-marino-100  p-1 rounded ">
                                <MdCloudUpload className="xl:size-7 size-6" />
                                <input
                                  type="file"
                                  accept=".png, .jpeg, .jpg"
                                  className="hidden"
                                  onChange={(e) => {
                                    handleMealImageUpload(
                                      e,
                                      dayIndex,
                                      mealIndex,
                                      "comidas"
                                    );
                                  }}
                                />
                              </label>
                              {currentMeals[dayIndex].meals[mealIndex]
                                .imageURL && (
                                <button
                                  onClick={(e) => {
                                    handleMealImageDelete(
                                      e,
                                      dayIndex,
                                      mealIndex
                                    );
                                  }}
                                  className=" hover:bg-rojo-100 text-red-500 rounded  p-1.5">
                                  <AiOutlineDelete className="xl:size-7 size-6" />
                                </button>
                              )}
                            </div>
                          </Grid>
                          <Grid
                            size={6}
                            container
                            spacing={1}
                            sx={{
                              "& .MuiFormLabel-root": {
                                fontFamily: "Open Sans",
                              },
                            }}>
                            <Grid size={12}>
                              <TextField
                                label="Nombre"
                                value={
                                  currentMeals[dayIndex].meals[mealIndex].name
                                }
                                size="small"
                                onKeyPress={handleTextChange}
                                onChange={(e) =>
                                  handleMealChange(
                                    dayIndex,
                                    mealIndex,
                                    "name",
                                    e.target.value,
                                    meal
                                  )
                                }
                                fullWidth
                                margin="dense"
                              />
                            </Grid>
                            <Grid size={12}>
                              <TextField
                                label="Descripción"
                                size="small"
                                inputProps={{ maxLength: 300 }}
                                value={
                                  currentMeals[dayIndex].meals[mealIndex]
                                    .description
                                }
                                onKeyPress={handleTextChange}
                                multiline
                                rows={2}
                                onChange={(e) =>
                                  handleMealChange(
                                    dayIndex,
                                    mealIndex,
                                    "description",
                                    e.target.value,
                                    meal
                                  )
                                }
                                fullWidth
                                margin="dense"
                              />
                            </Grid>
                          </Grid>
                        </Grid>

                        <Button
                          variant="outlined"
                          onClick={() => handleAddFood(dayIndex, mealIndex)}
                          startIcon={<FaPlus className="xl:size-4 size-3" />}
                          sx={{
                            fontFamily: "Montserrat Alternates",
                            borderColor: "#16243e",
                            color: "#16243e",
                            borderWidth: 1,
                            "&:hover": {
                              backgroundColor: "#e2e6ee",
                            },
                            textTransform: "none",
                            fontSize:
                              window.innerWidth < 640
                                ? 10
                                : window.innerWidth < 1024
                                ? 12
                                : 14,
                          }}>
                          Comida
                        </Button>
                        <Grid
                          container
                          columns={10}
                          spacing={1}
                          sx={{
                            mt: 2,
                            border: "1px solid #ccc",
                            p: 2,
                            borderRadius: 1,
                            "& .MuiFormLabel-root": {
                              fontFamily: "Open Sans",
                            },
                          }}>
                          {currentMeals[dayIndex].meals[mealIndex].foods.map(
                            (food, foodIndex) => (
                              <>
                                <Grid size={{ lg: 5, xs: 10 }}>
                                  <TextField
                                    label="Nombre"
                                    value={food.name}
                                    onChange={(e) =>
                                      handleFoodChange(
                                        dayIndex,
                                        mealIndex,
                                        foodIndex,
                                        "name",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid size={{ lg: 1, sm: 2 }}>
                                  <TextField
                                    label="Calorías"
                                    type="number"
                                    inputProps={{ min: 0, max: 1500 }}
                                    onKeyPress={handleNumeroInput}
                                    value={food.calories}
                                    onChange={(e) =>
                                      handleFoodChange(
                                        dayIndex,
                                        mealIndex,
                                        foodIndex,
                                        "calories",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid size={{ lg: 1, sm: 2 }}>
                                  <TextField
                                    label="Proteínas (g)"
                                    type="number"
                                    inputProps={{ min: 0, max: 100 }}
                                    onKeyPress={handleNumeroInput}
                                    value={food.proteins}
                                    onChange={(e) =>
                                      handleFoodChange(
                                        dayIndex,
                                        mealIndex,
                                        foodIndex,
                                        "proteins",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid size={{ lg: 1, sm: 2 }}>
                                  <TextField
                                    label="Carbohidratos (g)"
                                    type="number"
                                    inputProps={{ min: 0, max: 300 }}
                                    onKeyPress={handleNumeroInput}
                                    value={food.carbs}
                                    onChange={(e) =>
                                      handleFoodChange(
                                        dayIndex,
                                        mealIndex,
                                        foodIndex,
                                        "carbs",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid size={{ lg: 1, sm: 2 }}>
                                  <TextField
                                    label="Grasa (g)"
                                    type="number"
                                    inputProps={{ min: 0, max: 100 }}
                                    onKeyPress={handleNumeroInput}
                                    value={food.fats}
                                    onChange={(e) =>
                                      handleFoodChange(
                                        dayIndex,
                                        mealIndex,
                                        foodIndex,
                                        "fats",
                                        e.target.value
                                      )
                                    }
                                    fullWidth
                                    margin="dense"
                                    size="small"
                                  />
                                </Grid>
                                <Grid
                                  size={{ lg: 1, sm: 2 }}
                                  display="flex"
                                  justifyContent={"center"}
                                  alignItems={"center"}>
                                  <IconButton
                                    onClick={() =>
                                      setCurrentMeals((prevState) => {
                                        const updatedMeals = [...prevState];
                                        updatedMeals[dayIndex].meals[
                                          mealIndex
                                        ].foods.splice(foodIndex, 1);
                                        return updatedMeals;
                                      })
                                    }
                                    color="error">
                                    <AiOutlineDelete className="xl:size-6 size-5" />
                                  </IconButton>
                                </Grid>
                              </>
                            )
                          )}
                        </Grid>
                      </Box>
                    ) : null
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 2,
                    }}>
                    <Button
                      variant="outlined"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{
                        fontFamily: "Montserrat Alternates",
                        borderColor: "#16243e",
                        color: "#16243e",
                        borderWidth: 1,
                        "&:hover": {
                          backgroundColor: "#e2e6ee",
                        },
                        textTransform: "none",
                        fontSize:
                          window.innerWidth < 640
                            ? 10
                            : window.innerWidth < 1024
                            ? 12
                            : 14,
                      }}>
                      Atrás
                    </Button>
                    {activeStep === mealTypes.length - 1 ? (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleCompleteDay(dayIndex)}
                        disabled={
                          !currentMeals[dayIndex]?.meals[activeStep]?.name || // Nombre requerido
                          !currentMeals[dayIndex]?.meals[activeStep]
                            ?.description ||
                          // !currentMeals[dayIndex]?.meals[activeStep]
                          //   ?.imageURL ||
                          currentMeals[dayIndex]?.meals[activeStep]?.foods
                            .length === 0 ||
                          currentMeals[dayIndex]?.meals[activeStep]?.foods.some(
                            (food) =>
                              !food.name ||
                              !food.calories ||
                              !food.proteins ||
                              !food.carbs ||
                              !food.fats
                          ) // Campos de alimentos requeridos
                        }
                        sx={{
                          fontFamily: "Montserrat Alternates",
                          color: "#fff",
                          "&:hover": {
                            color: "#16243e",
                            backgroundColor: "#e2e6ee",
                          },
                          textTransform: "none",
                          fontSize:
                            window.innerWidth < 640
                              ? 10
                              : window.innerWidth < 1024
                              ? 12
                              : 14,
                        }}>
                        Finalizar Día
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={
                          !currentMeals[dayIndex]?.meals[activeStep]?.name || // Nombre requerido
                          !currentMeals[dayIndex]?.meals[activeStep]
                            ?.description ||
                          !currentMeals[dayIndex]?.meals[activeStep]
                            ?.imageURL ||
                          currentMeals[dayIndex]?.meals[activeStep]?.foods
                            .length === 0 ||
                          currentMeals[dayIndex]?.meals[activeStep]?.foods.some(
                            (food) =>
                              !food.name ||
                              !food.calories ||
                              !food.proteins ||
                              !food.carbs ||
                              !food.fats
                          )
                        }
                        sx={{
                          backgroundColor: "#16243e",
                          fontFamily: "Montserrat Alternates",
                          color: "#fff",
                          "&:hover": {
                            color: "#16243e",
                            backgroundColor: "#e2e6ee",
                          },
                          textTransform: "none",
                          fontSize:
                            window.innerWidth < 640
                              ? 10
                              : window.innerWidth < 1024
                              ? 12
                              : 14,
                        }}>
                        Siguiente
                      </Button>
                    )}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
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
