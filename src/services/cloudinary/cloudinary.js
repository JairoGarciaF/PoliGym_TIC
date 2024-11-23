import CryptoJS from 'crypto-js'; // Instala con npm install crypto-js

export const deleteImage = async (publicId) => {
  if (!publicId) {
    throw new Error('No se proporcionó el public_id de la imagen a eliminar.');
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000); // Genera un timestamp actual
    const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET; // Tu API secret (¡maneja con cuidado!)
    const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    // Generar firma usando SHA-1
    const stringToSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature = CryptoJS.SHA1(stringToSign).toString();

    // Prepara el formulario de datos
    const formData = new FormData();
    formData.append('public_id', publicId); // ID público de la imagen
    formData.append('timestamp', timestamp); // Timestamp
    formData.append('api_key', apiKey); // Clave de la API
    formData.append('signature', signature); // Firma generada

    // Realiza la solicitud HTTP
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Error al eliminar la imagen en Cloudinary.');
    }

    const data = await response.json();
    return data.result; // Retorna "ok" si fue exitoso
  } catch (error) {
    console.error('Error al eliminar la imagen:', error);
    throw error;
  }
};

export const uploadImage = async (file, uploadPreset) => {
  if (!file) {
    throw new Error('No se proporcionó un archivo para subir.');
  }

  // Prepara los datos del formulario
  const formData = new FormData();
  formData.append('file', file); // Archivo de imagen
  formData.append('upload_preset', uploadPreset); // Preset configurado en Cloudinary

  try {
    // Realiza la solicitud de subida
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error('Error al subir la imagen a Cloudinary.');
    }

    const data = await response.json();
    return data.secure_url; // Devuelve la URL segura de la imagen subida
  } catch (error) {
    console.error('Error en la subida:', error);
    throw error;
  }
};

