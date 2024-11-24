import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const createEquipment = async (equipment) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.post("api/equipment/create", equipment, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear el equipo");
    throw error;
  }
};

export const updateEquipment = async (id, equipment) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.patch(
      `api/equipment/update/${id}`,
      equipment,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el equipo");
    throw error;
  }
};

export const deleteEquipment = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.delete(`api/equipment/delete/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el equipo");
    throw error;
  }
};

export const findAllEquipment = async () => {
  try {
    // Validar el token
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    // Primera solicitud con limit=1 para obtener el total de equipos
    const initialResponse = await axios.get("api/equipment/find-all", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const total = initialResponse.data.meta.totalEquipments;

    if (!total || total <= 0) {
      console.log("No hay equipos disponibles.");
      return [];
    }

    // Segunda solicitud para obtener todos los equipos
    const fullResponse = await axios.get("api/equipment/find-all", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return fullResponse.data.data;
  } catch (error) {
    console.error("Error al obtener los equipos", error);
    throw error;
  }
};

export const findEquipmentById = async (id) => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");
    const response = await axios.get(`api/equipment/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el equipo");
    throw error;
  }
};
