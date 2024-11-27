import axios from "axios";
import { getToken, isTokenValid } from "../token/store";

export const findAllUsers = async () => {
  try {
    await isTokenValid("accessToken");
    const accessToken = getToken("accessToken");

    const initialResponse = await axios.get("api/user/find-all-users", {
      params: { limit: 1 },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const total = initialResponse.data.meta.totalUsers;

    if (!total || total === 0) {
      return [];
    }
    const response = await axios.get("api/user/find-all-users", {
      params: { limit: total },
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los usuarios");
    throw error;
  }
};
