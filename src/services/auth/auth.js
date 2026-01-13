import axios from "axios";
import { getToken, saveToken, deleteToken } from "../token/store";

const IS_DEMO = import.meta.env.VITE_DEMO === "true";

// Credenciales demo (pasan tu validateAuthForm.js)
const DEMO_USER = {
  email: "demo@epn.edu.ec",
  password: "Demo1234!",
  name: "Admin Demo",
  role: "ADMIN_ROLE",
  id: "1",
};

const DEMO_JWT =
  "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0." +
  "eyJzdWIiOiIxIiwiZW1haWwiOiJkZW1vQGVwbi5lZHUuZWMiLCJuYW1lIjoiVXN1YXJpbyBEZW1vIiwicm9sZXMiOlsiQURNSU5fUk9MRSJdLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6NDA3MDkwODgwMH0." +
  "x";

export const signIn = async (email, password) => {
  if (IS_DEMO) {
    if (email === DEMO_USER.email && password === DEMO_USER.password) {
      saveToken("accessToken", DEMO_JWT);
      return { accessToken: DEMO_JWT };
    }
    throw new Error(
      "Credenciales inválidas (demo: demo@epn.edu.ec / Demo1234!)"
    );
  }

  try {
    const body = { email, password };
    const response = await axios.post("api/auth/login", body, {
      headers: {
        Authorization: "none",
        "Content-Type": "application/json",
      },
    });
    const { accessToken } = response.data;
    return { accessToken };
  } catch (error) {
    console.error("Login error:", error);

    if (error.response) {
      switch (error.response.status) {
        case 400:
          throw new Error("Credenciales inválidas");
        case 401:
          throw new Error("Verifique sus credenciales");
        case 404:
          throw new Error("Usuario no encontrado");
        case 500:
          throw new Error(
            `Error al ingresar a la plataforma: ${
              error.response.data.message ||
              "No se proporcionaron detalles adicionales"
            }`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No se recibió respuesta del servidor. Por favor, verifique su conexión a internet."
      );
    } else {
      throw new Error(`Error al realizar la solicitud: ${error.message}`);
    }
  }
};

export const logout = async () => {
  if (IS_DEMO) {
    deleteToken("accessToken");
    deleteToken("refreshToken");
    return;
  }
  try {
    const accessToken = getToken("accessToken");
    await axios.post(
      "api/auth/logout",
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    deleteToken("accessToken");
    deleteToken("refreshToken");
  } catch (error) {
    console.error("Error al cerrar sesión");
    throw error;
  }
};

export const verifyToken = async (token) => {
  if (IS_DEMO) {
    return { status: token ? 200 : 401, data: { ok: !!token } };
  }

  try {
    const response = await axios.get("api/auth/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      try {
        await refreshAccessToken();
        console.log("Token refrescado");
      } catch (error) {
        console.error("Error al refrescar el token", error);
      }
    }
    console.error("Error al verificar el token");
    throw error;
  }
};

export const refreshAccessToken = async () => {
  if (IS_DEMO) {
    saveToken("accessToken", DEMO_JWT);
    return DEMO_JWT;
  }

  try {
    const response = await axios.post(
      "api/auth/refresh",
      {},
      {
        withCredentials: true, // Asegúrate de que la cookie sea enviada con la solicitud
      }
    );

    const { accessToken } = response.data;

    // Guardamos el nuevo access token en cookies o almacenamiento local
    saveToken("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Error al refrescar el access token", error);
    throw new Error("Error al refrescar el token de acceso");
  }
};

export const getUserInfo = async (id, token) => {
  if (IS_DEMO) {
    return {
      id: DEMO_USER.id,
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
    };
  }
  try {
    const response = await axios.get(`api/user/find-by-id/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener el usuario");
    throw error;
  }
};

export const updatePassword = async (
  userId,
  currentPassword,
  newPassword,
  confirmPassword,
  token
) => {
  try {
    const body = {
      userId,
      currentPassword,
      newPassword,
      confirmNewPassword: confirmPassword,
    };
    const response = await axios.patch(`api/auth/change-password`, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la contraseña");
    throw error;
  }
};

export const forgotPassword = async (email) => {
  if (IS_DEMO) {
    return;
  }
  try {
    const response = await axios.post(
      `api/auth/forgot-password`,
      { email },
      {
        headers: { Authorization: "none" },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 502:
          throw new Error(
            "El servidor no está disponible en este momento. Por favor, inténtelo más tarde."
          );
        case 404:
          throw new Error("El correo electrónico no está registrado.");
        case 400:
          throw new Error(error.response.data.message || "Datos inválidos.");
        default:
          throw new Error(
            `Error al enviar el correo: ${
              error.response.data.message || "Error del servidor"
            }`
          );
      }
    } else if (error.request) {
      throw new Error(
        "No se pudo conectar con el servidor. Verifique su conexión a internet."
      );
    } else {
      throw new Error(`Error en la solicitud: ${error.message}`);
    }
  }
};

export const resetPassword = async (code, newPassword) => {
  if (IS_DEMO) {
    return;
  }
  try {
    const body = { token: code, password: newPassword };
    const response = await axios.post(`api/auth/reset-password`, body);
    return response.data;
  } catch (error) {
    console.error("Error al restablecer la contraseña");
    throw error;
  }
};
