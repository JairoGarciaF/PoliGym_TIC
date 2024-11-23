import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const createExercise = async (exercise) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.post(
      "api/exercise/create-exercise",
      exercise,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el ejercicio");
    throw error;
  }
};

export const updateExercise = async (id, exercise) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.patch(`api/training/update/${id}`, exercise, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el ejercicio");
    throw error;
  }
};

export const deleteExercise = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/training/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el ejercicio");
    throw error;
  }
};

export const findAllExercises = async () => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get("api/exercise/find-all-exercises", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los ejercicios");
    throw error;
  }
};

export const findExerciseById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/exercise/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener el ejercicio");
    throw error;
  }
};
