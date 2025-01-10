import React, { useState, useEffect } from "react";
import { Avatar, FormControlLabel, Switch } from "@mui/material";
import { FaHeart, FaEye, FaEyeSlash } from "react-icons/fa";
import { getAllPostsFromDatabase } from "../../services/comunidad/Comunidad";
import { findUserById } from "../../services/users/users";
import { BiLoaderCircle } from "react-icons/bi";

const defaultProfilePic = "https://api.dicebear.com/9.x/initials/svg?seed=User";
const defaultCommentPic =
  "https://api.dicebear.com/9.x/initials/svg?seed=Comment";

const comentariosIniciales = [
  {
    id: 1,
    imagenPerfil: defaultProfilePic,
    imagenComentario: defaultCommentPic,
    nombre: "Carlos",
    fecha: "2024-10-15",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 70 kg",
    likes: 12,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 2,
    imagenPerfil: defaultProfilePic,
    nombre: "Ana",
    fecha: "2024-10-16",
    publico: false,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 100 kg",
    likes: 5,
    rutina: "Rutina de Tren superior",
    dificultad: "Media",
    duracion: "40m 33s",
  },
  {
    id: 3,
    imagenPerfil: defaultProfilePic,
    nombre: "Pedro",
    fecha: "2024-10-17",
    publico: true,
    oculto: true,
    mensaje:
      "ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 120 kg",
    likes: 3,
    rutina: "Rutina de Tren superior",
    dificultad: "Alta",
    duracion: "40m 33s",
  },
  {
    id: 4,
    imagenPerfil: defaultProfilePic,
    nombre: "Sofía",
    fecha: "2024-10-18",
    publico: false,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 80 kg",
    likes: 8,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 5,
    imagenPerfil: defaultProfilePic,
    nombre: "Javier",
    fecha: "2024-10-19",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 110 kg",
    likes: 2,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 6,
    imagenPerfil: defaultProfilePic,
    nombre: "María",
    fecha: "2024-10-20",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 130 kg",
    likes: 10,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 7,
    imagenPerfil: defaultProfilePic,
    nombre: "Luis",
    fecha: "2024-10-21",
    publico: false,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 90 kg",
    likes: 6,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 8,
    imagenPerfil: defaultProfilePic,
    nombre: "Elena",
    fecha: "2024-10-22",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 120 kg",
    likes: 4,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 9,
    imagenPerfil: defaultProfilePic,
    nombre: "Miguel",
    fecha: "2024-10-23",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Peso Muerto con Barra con un peso de 140 kg",
    likes: 7,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 10,
    imagenPerfil: defaultProfilePic,
    nombre: "Laura",
    fecha: "2024-10-24",
    publico: false,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 100 kg",
    likes: 9,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 11,
    imagenPerfil: defaultProfilePic,
    nombre: "Raul",
    fecha: "2024-10-25",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Sentadillas con Barra con un peso de 130 kg",
    likes: 11,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 12,
    imagenPerfil: defaultProfilePic,
    nombre: "Carmen",
    fecha: "2024-10-26",
    publico: true,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Peso Muerto con Barras con un peso de 150 kg",
    likes: 1,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
  {
    id: 13,
    imagenPerfil: defaultProfilePic,
    nombre: "Jorge",
    fecha: "2024-10-27",
    publico: false,
    oculto: false,
    mensaje:
      "ha completado exitosamente la rutina de Press de Banca con Barra con un peso de 110 kg",
    likes: 13,
    rutina: "Rutina de Tren superior",
    dificultad: "Baja",
    duracion: "40m 33s",
  },
];

export const Comunidad = () => {
  const [comentarios, setComentarios] = useState([]);
  const [data, setData] = useState([]);
  const [showHidden, setShowHidden] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        setLoading(true);
        const { data: comentariosData } = await getAllPostsFromDatabase();

        // Obtiene la información de los usuarios
        const comentariosEnriquecidos = await Promise.all(
          comentariosData.map(async (comentario) => {
            const usuario = await findUserById(comentario.user_id);
            return {
              ...comentario,
              nombre: usuario?.name || "Usuario desconocido",
              imagenPerfil:
                usuario?.avatarUrl ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${
                  usuario?.name || "Usuario"
                }`,
            };
          })
        );
        setComentarios(comentariosEnriquecidos);
      } catch (error) {
        console.error("Error al obtener los comentarios o usuarios", error);
      }
      setLoading(false);
    };

    fetchComentarios();
  }, []);

  const formatDuracion = (duracion) => {
    if (typeof duracion === "string") {
      const match = duracion.match(/(\d+)\s*mins/);
      const minutos = match ? match[1] : "0";
      return `${minutos} minutos`;
    } else if (typeof duracion === "object" && duracion.minutes !== undefined) {
      return `${duracion.minutes} minutos`;
    } else {
      return "0 minutos"; // Valor por defecto si no es válido
    }
  };

  const toggleOculto = (id) => {
    setComentarios((prevComentarios) =>
      prevComentarios.map((comentario) =>
        comentario.id === id
          ? { ...comentario, oculto: !comentario.oculto }
          : comentario
      )
    );
  };

  const filteredComentarios = comentarios.filter(
    (comentario) => comentario.oculto === showHidden
  );

  if (loading) {
    return (
      <div
        className={`bg-white rounded-xl flex flex-col shadow h-full pl-4 py-4 justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl flex flex-col shadow h-full pl-4 py-4">
      <h1 className="montserrat-alternates pr-4 text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
        Comunidad
      </h1>

      <nav className="flex justify-between border-b  mr-4">
        <span className="px-4 py-1 font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50">
          Feed
        </span>
        <FormControlLabel
          control={
            <Switch
              selected={showHidden}
              onChange={() => setShowHidden(!showHidden)}
              size="small"
              defaultChecked
            />
          }
          label={showHidden ? "Ocultos" : "Visibles"}
          sx={{
            "& .MuiFormControlLabel-label": {
              fontFamily: "Open Sans",
              fontSize: "0.875rem",
            },
          }}
        />
      </nav>
      <div className="overflow-y-auto scroll-smooth bg-slate-100 rounded-xl mr-4 mt-2 flex-1">
        <div className=" flex p-4 flex-col gap-4">
          {filteredComentarios.map((comentario) => (
            <div
              key={comentario.id}
              className={`p-4 rounded-xl shadow ${
                comentario.oculto ? "bg-slate-50" : "bg-white"
              }`}>
              <div className="flex justify-between items-center pb-2 ">
                <div className="flex items-center gap-2">
                  <div
                    className={
                      comentario.oculto ? "brightness-90" : "brightness-100"
                    }>
                    <Avatar
                      src={comentario.imagenPerfil}
                      alt={comentario.nombre}
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2
                      className={`sm:text-xl text-lg font-semibold ${
                        comentario.oculto ? "text-gray-400" : "text-gray-800"
                      }`}>
                      {comentario.nombre}
                    </h2>
                    <span
                      className={`text-xs ${
                        comentario.oculto ? "text-gray-400" : "text-gray-500"
                      }`}>
                      {new Date(comentario.fecha).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <button
                  className="flex border rounded px-2 py-1 items-center gap-1 sm:text-sm text-xs text-gray-500 hover:text-gray-800"
                  onClick={() => toggleOculto(comentario.id)}>
                  {comentario.oculto ? <FaEye /> : <FaEyeSlash />}
                  <span className="hidden sm:block">
                    {comentario.oculto ? "Mostrar" : "Ocultar"}
                  </span>
                </button>
              </div>
              <div className="pl-12 py-2">
                <p
                  className={`sm:text-base text-sm ${
                    comentario.oculto ? "text-gray-400" : "text-gray-800"
                  }`}>
                  {comentario.mensaje}
                </p>
                {comentario.imagen_comentario && (
                  <div className="my-2">
                    <img
                      src={comentario.imagen_comentario}
                      alt="Comentario imagen"
                      className="rounded-lg shadow-md max-w-full max-h-64 w-auto"
                    />
                  </div>
                )}
                <div className="flex sm:flex-row flex-col sm:gap-2 gap-1 pt-2">
                  <span
                    className={`px-3 w-fit py-1 sm:text-sm text-xs rounded-full bg-orange-100 ${
                      comentario.oculto ? "text-orange-400" : "text-orange-700"
                    }`}>
                    {comentario.rutina}
                  </span>
                  <span
                    className={`px-3 w-fit py-1 sm:text-sm text-xs rounded-full ${
                      comentario.dificultad === "Principiante"
                        ? `bg-green-100 ${
                            comentario.oculto
                              ? "text-green-400"
                              : "text-green-700"
                          }`
                        : comentario.dificultad === "Intermedio"
                        ? `bg-yellow-100 ${
                            comentario.oculto
                              ? "text-yellow-400"
                              : "text-yellow-700"
                          }`
                        : `bg-red-100 ${
                            comentario.oculto ? "text-red-400" : "text-red-700"
                          }`
                    }`}>
                    {comentario.dificultad}
                  </span>
                  <span
                    className={`px-3 w-fit py-1 sm:text-sm text-xs rounded-full bg-blue-100 ${
                      comentario.oculto ? "text-blue-400" : "text-blue-700"
                    }`}>
                    {formatDuracion(comentario.duracion)}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-start pl-12 pt-2 gap-4">
                <div className="flex items-center gap-1">
                  <FaHeart
                    className={`${
                      comentario.oculto ? "text-red-400" : "text-red-500"
                    } size-4`}
                  />
                  <span
                    className={`sm:text-base text-sm ${
                      comentario.oculto ? "text-red-400" : "text-red-500"
                    }`}>
                    {comentario.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
