import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const createTrainingPlan = async (trainingPlan) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.post(
      "api/training-plan/create",
      trainingPlan,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear el plan de entrenamiento");
    throw error;
  }
};

export const updateTrainingPlan = async (id, trainingPlan) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.patch(
      `api/training-plan/update/${id}`,
      trainingPlan,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el plan de entrenamiento");
    throw error;
  }
};

export const deleteTrainingPlan = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/training-plan/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el plan de entrenamiento");
    throw error;
  }
};

export const findAllTrainingPlan = async () => {
  try {
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    const initialResponse = await axios.get("api/training-plan/find-all", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const total = initialResponse.data.meta.totalTrainingPlans;

    if (!total || total === 0) {
      return [];
    }
    const response = await axios.get("api/training-plan/find-all", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los planes de entrenamiento");
    throw error;
  }
};

export const findTrainingPlanById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/training-plan/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el plan de entrenamiento");
    throw error;
  }
};
