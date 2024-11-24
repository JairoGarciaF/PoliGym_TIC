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
    const response = await axios.patch(
      `api/exercise/update-exercise/${id}`,
      exercise,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
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
    const response = await axios.delete(`api/exercise/delete-exercise/${id}`, {
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
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    // Primera solicitud para obtener el total de registros
    const initialResponse = await axios.get("api/exercise/find-all-exercises", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const total = initialResponse.data.meta.totalExercises;

    if (!total || total <= 0) {
      console.log("No hay ejercicios disponibles.");
      return [];
    }

    // Segunda solicitud para obtener todos los datos
    const fullResponse = await axios.get("api/exercise/find-all-exercises", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return fullResponse.data.data;
  } catch (error) {
    console.error("Error al obtener los ejercicios", error);
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
