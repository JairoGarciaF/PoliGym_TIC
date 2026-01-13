import Cookies from "js-cookie";
import { verifyToken } from "../auth/auth";

const IS_DEMO = import.meta.env.VITE_DEMO === "true";

export const getToken = (key) => {
  try {
    return Cookies.get(key);
  } catch {
    Cookies.remove(key);
    return null;
  }
};

export const saveToken = (key, value) => {
  try {
    const isHttps =
      typeof window !== "undefined" && window.location.protocol === "https:";

    Cookies.set(key, value, {
      // En demo/local normalmente estás en http, entonces secure debe ser false
      secure: isHttps,
      sameSite: "Strict",
    });
  } catch {
    return;
  }
};

export const isTokenValid = async (key) => {
  try {
    const token = getToken(key);
    if (!token) return false;

    if (IS_DEMO) return true;

    const response = await verifyToken(token);
    return response.status === 200;
  } catch {
    return false; // Cualquier error implica token inválido
  }
};

export const deleteToken = (key) => {
  try {
    Cookies.remove(key);
  } catch {
    return;
  }
};
