import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const createNutritionPlan = async (nutritionPlan) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.post("api/nutrition/create", nutritionPlan, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el plan de nutrición");
    throw error;
  }
};

export const updateNutritionPlan = async (id, nutritionPlan) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.patch(
      `api/nutrition/update/${id}`,
      nutritionPlan,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el plan de nutrición");
    throw error;
  }
};

export const deleteNutritionPlan = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/nutrition/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el plan de nutrición");
    throw error;
  }
};

export const findAllNutritionPlan = async () => {
  try {
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    const initialResponse = await axios.get("api/nutrition/find-all", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const total = initialResponse.data.meta.totalPlans;

    if (!total || total === 0) {
      return [];
    }

    const response = await axios.get("api/nutrition/find-all", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los planes de nutrición");
    throw error;
  }
};

export const findNutritionPlanById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/nutrition/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el plan de nutrición");
    throw error;
  }
};
