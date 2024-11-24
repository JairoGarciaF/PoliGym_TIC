import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const deleteMuscleGroup = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/muscle-group/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el grupo muscular");
    throw error;
  }
};

export const findAllMuscleGroups = async () => {
  try {
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    // Primera solicitud con limit=1 para obtener el total de grupos musculares
    const initialResponse = await axios.get("api/muscle-group/find-all", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const total = initialResponse.data.meta.totalMuscleGroups;

    if (!total || total <= 0) {
      console.log("No hay grupos musculares disponibles.");
      return [];
    }

    // Segunda solicitud para obtener todos los grupos musculares
    const fullResponse = await axios.get("api/muscle-group/find-all", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return fullResponse.data.data;
  } catch (error) {
    console.error("Error al obtener los grupos musculares", error);
    throw error;
  }
};

export const findMuscleGroupById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/muscle-group/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener el grupo muscular");
    throw error;
  }
};
