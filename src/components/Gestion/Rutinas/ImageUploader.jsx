import React, { useState } from 'react';

const ImageUploader = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploading, setUploading] = useState(false);

    // Maneja el cambio de archivo y realiza la subida a Cloudinary
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        // Prepara los datos de subida
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'polygym_rutine_images'); // Cambia a tu upload preset

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) throw new Error('Error al subir la imagen');

            const data = await response.json();
            setImageUrl(data.secure_url); // Guarda la URL segura de la imagen
            console.log('Imagen subida a:', data.secure_url); // Muestra la URL en la consola
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1>Sube una imagen</h1>
            <input type="file" onChange={handleImageUpload} disabled={uploading} />
            {uploading && <p>Subiendo imagen...</p>}
            {imageUrl && (
                <div>
                    <p>Imagen subida:</p>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
