import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { TbTargetArrow, TbCategoryFilled } from "react-icons/tb";
import { FaCircleInfo, FaArrowTrendUp } from "react-icons/fa6";
import { FaStar, FaFireAlt } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";
import { BodyMap } from "../../BodyMap/BodyMap";
import { DetallesGenderGraph } from "./DetallesGenderGraph";

const categoryTranslate = (category) => {
  switch (category) {
    case "STRENGTH":
      return "Fuerza";
    case "FLEXIBILITY":
      return "Flexibilidad";
    case "CARDIO":
      return "Cardio";
  }
};

const levelTranslate = (status) => {
  switch (status) {
    case "BASIC":
      return "Básico";
    case "INTERMEDIATE":
      return "Intermedio";
    case "ADVANCED":
      return "Avanzado";
  }
};

// Función que devuelve el color según la categoría
const getCategoryColor = (category) => {
  switch (category) {
    case "STRENGTH":
      return " text-blue-900";
    case "CARDIO":
      return " text-orange-700";
    case "FLEXIBILITY":
      return " text-lime-700";
    default:
      return " text-gray-700";
  }
};

// Función que devuelve el color según el nivel
const getLevelColor = (level) => {
  switch (level) {
    case "BASIC":
      return " text-green-700";
    case "INTERMEDIATE":
      return " text-yellow-700";
    case "ADVANCED":
      return " text-red-700";
    default:
      return " text-gray-700";
  }
};

export const DetallesEjercicios = ({ ejercicio }) => {
  const [muscles, setMuscles] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (ejercicio) {
      //array of muscle names
      const muscleNames = ejercicio.muscles.map((musculo) => musculo.name);
      setMuscles(muscleNames);
    }
  }, [ejercicio]);

  return (
    <>
      {ejercicio ? (
        <div className="p-4 flex-1 overflow-auto open-sans gap-4 grid xl:grid-cols-3 lg:grid-cols-2 xl:grid-rows-2 bg-slate-100 rounded-xl">
          <div className="xl:col-span-1 col-span-2 xl:row-span-1 flex justify-center bg-white p-4 rounded-xl shadow">
            {imageLoading && (
              <div className="flex justify-center items-center">
                {/* Puedes usar un ícono o spinner aquí */}
                <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
              </div>
            )}
            <img
              src={ejercicio.mediaUrl}
              alt={ejercicio.name}
              className={`h-full object-cover self-center ${
                imageLoading ? "hidden" : "block"
              }`}
              onLoad={() => setImageLoading(false)} // Se ejecuta cuando la imagen termina de cargar
              onError={() => setImageLoading(false)} // Opcional: para manejar errores de carga
            />
          </div>
          <div className="col-span-2 xl:row-span-1 gap-2 grid xl:grid-rows-4 grid-cols-6">
            <div className="sm:col-span-4 col-span-6 xl:row-span-1 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="flex flex-col justify-center h-full">
                <h3 className="text-slate-500 text-xs">Nombre</h3>
                <div className="flex items-center gap-1 text-azul-marino-500 ">
                  <p className="font-medium xl:text-xl md:text-lg text-sm">
                    {ejercicio.name}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-3 xl:row-span-1 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Popularidad</h3>
                <div className={`open-sans flex gap-2 items-center `}>
                  <span className="font-semibold xl:text-lg md:text-base text-sm">
                    {ejercicio.popularityScore}
                  </span>
                  <Rating
                    name="hover-feedback"
                    value={ejercicio.popularityScore}
                    precision={0.1}
                    readOnly
                    size="small"
                    emptyIcon={
                      <FaStar style={{ opacity: 0.1 }} fontSize="inherit" />
                    }
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-3 xl:row-span-1 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Uso</h3>
                <div className="open-sans flex text-azul-marino-500 gap-2 items-center">
                  <FaArrowTrendUp className="xl:size-4 size-3" />
                  <p className="font-semibold xl:text-lg md:text-base text-sm truncate">
                    {ejercicio.totalUses}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-3 xl:row-span-1 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Categoría</h3>
                <div
                  className={`open-sans flex ${getCategoryColor(
                    ejercicio.category
                  )} gap-2 items-center`}>
                  <TbCategoryFilled className="xl:size-4 size-3" />
                  <p className="font-semibold xl:text-lg md:text-base text-sm truncate">
                    {categoryTranslate(ejercicio.category)}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 col-span-3 xl:row-span-1 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Nivel</h3>
                <div
                  className={`open-sans flex ${getLevelColor(
                    ejercicio.level
                  )} gap-2 items-center`}>
                  <FaFireAlt className="xl:size-4 size-3" />
                  <p className="font-semibold xl:text-lg md:text-base text-sm truncate">
                    {levelTranslate(ejercicio.level)}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 col-span-6 xl:row-span-2 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Descripción</h3>
                <div className={`open-sans overflow-auto`}>
                  <p className="font-medium xl:text-sm text-pretty">
                    {ejercicio.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 col-span-6 xl:row-span-2 bg-white  open-sans p-4 rounded-xl shadow">
              <div className="h-full flex flex-col justify-center">
                <h3 className="text-slate-500 text-xs ">Recomendación</h3>
                <div className={`open-san overflow-auto `}>
                  <p className="font-medium xl:text-sm text-pretty ">
                    {ejercicio.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col justify-center xl:row-span-1 bg-white p-4 rounded-xl shadow h-full ">
            <h3 className="text-azul-marino-500 xl:text-base text-sm mb-1 flex self-start items-center gap-2 font-medium">
              <TbTargetArrow className="xl:size-4 size-3" />
              Grupos Musculares
            </h3>
            <div className="flex justify-center flex-1">
              <BodyMap
                gender="Masculino"
                view="front"
                className="w-1/3"
                recentMuscles={muscles}
                oldMuscles={[]}
              />
              <BodyMap
                gender="Masculino"
                view="back"
                className="w-1/3"
                recentMuscles={muscles}
                oldMuscles={[]}
              />
            </div>
          </div>
          <DetallesGenderGraph ejercicio={ejercicio} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100%-35px-56px)] gap-2">
          <FaCircleInfo className="text-slate-300 size-10" />
          <p className="text-slate-500">
            Selecciona un ejercicio para ver los detalles
          </p>
        </div>
      )}
    </>
  );
};
