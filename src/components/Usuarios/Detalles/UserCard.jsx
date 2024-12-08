import React, { useState, useEffect } from "react";
import { FaShieldAlt, FaFire, FaUser } from "react-icons/fa";
import { IoMale, IoFemale, IoMaleFemale } from "react-icons/io5";

const translateRol = (rol) => {
  switch (rol) {
    case "USER_ROLE":
      return "Usuario";
    case "ADMIN_ROLE":
      return "Admin";
    default:
      return "n/a";
  }
};

const translateGender = (gender) => {
  switch (gender) {
    case "MALE":
      return "Masculino";
    case "FEMALE":
      return "Femenino";
    case "OTHER":
      return "Otro";
    default:
      return "n/a";
  }
};

const translateType = (type) => {
  switch (type) {
    case "STUDENT":
      return "Estudiante";
    case "PROFESSOR":
      return "Profesor";
    case "ADMINISTRATION":
      return "Administración";
    default:
      return "n/a";
  }
};

export const UserCard = ({ user }) => {
  const [rol, setRol] = useState("");
  useEffect(() => {
    const rol = user.roles.length === 1 ? translateRol(user.roles[0]) : "Admin";
    setRol(rol);
  }, []);

  return (
    <>
      {/* Imagen de perfil */}
      <div className="col-span-1 h-full bg-white rounded-xl shadow xl:row-span-1 flex flex-col p-4">
        {/* Contenedor de la imagen */}
        <div className="flex-1 flex justify-center items-center overflow-hidden">
          {user.avatarUrl != null ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-auto max-h-full rounded-full object-cover self-center border-slate-200 border"
              style={{ maxWidth: "150px", aspectRatio: "1 / 1" }}
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex justify-center items-center">
              {/* Placeholder en caso de no tener imagen */}
              <FaUser size={48} className="text-gray-400" />
            </div>
          )}
        </div>
        {/* Información del usuario */}
        <div className="flex flex-col mt-4">
          {/* Nombre y Rol */}
          <div className="flex gap-2 border-t pt-2 border-slate-300 items-center">
            <span className="font-semibold md:text-2xl text-xl block text-azul-marino-500">
              {user.name}
            </span>
            {rol === "Admin" && (
              <span
                className="py-1 px-2 text-xs rounded-full font-semibold flex items-center gap-1
                      bg-violet-100 text-violet-700">
                <FaShieldAlt className="md:size-4 size-3" />
              </span>
            )}
          </div>
          {/* Correo */}
          <span className="text-sm pb-2 block text-slate-500">
            {user.email}
          </span>
          {/* Género y Tipo de Usuario */}
          <div className="flex flex-wrap gap-1 items-center">
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${
                user.gender === "MALE"
                  ? "bg-sky-100 text-sky-700"
                  : user.gender === "FEMALE"
                  ? "bg-pink-100 text-pink-700"
                  : user.gender === "OTHER"
                  ? "bg-gray-100 text-gray-700"
                  : ""
              }`}>
              {user.gender === "MALE" ? (
                <IoMale />
              ) : user.gender === "FEMALE" ? (
                <IoFemale />
              ) : user.gender === "OTHER" ? (
                <IoMaleFemale />
              ) : null}
              {translateGender(user.gender)}
            </span>
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold flex items-center gap-1 ${
                user.userType === "STUDENT"
                  ? "bg-[#CCE0F3] text-[#03346E]"
                  : user.userType === "PROFESSOR"
                  ? "bg-[#fed4da] text-[#B8001F]"
                  : "bg-[#F1F1D3] text-[#61614A]"
              }`}>
              <FaUser />
              {translateType(user.userType)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
