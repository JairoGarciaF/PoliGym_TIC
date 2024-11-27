import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const createRoutine = async (routine) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.post("api/workout/create", routine, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la rutina");
    throw error;
  }
};
export const updateRoutine = async (id, routine) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.patch(`api/workout/update/${id}`, routine, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la rutina");
    throw error;
  }
};
export const deleteRoutine = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/workout/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la rutina");
    throw error;
  }
};

export const findAllRoutine = async () => {
  try {
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    // Primera solicitud con limit=1 para obtener el total de equipos
    const initialResponse = await axios.get("api/workout/find-all", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const total = initialResponse.data.meta.totalWorkouts;

    if (!total || total === 0) {
      return [];
    }
    const response = await axios.get("api/workout/find-all", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener las rutinas");
    throw error;
  }
};

export const findRoutineById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/workout/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener la rutina");
    throw error;
  }
};

export const findExercisesInRoutine = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(
      `api/workout/find-by-id-exercise-in-workout/${id}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los ejercicios de la rutina");
    throw error;
  }
};
