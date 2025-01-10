import React, { useState, useEffect } from "react";
import { GeneralEjercicios } from "./GeneralEjercicios/GeneralEjercicios";
import { DetallesEjercicios } from "./DetallesEjercicios/DetallesEjercicios";
import { findExerciseById } from "../../services/exercise/exercise";

const data = [
  {
    exerciseId: 1,
    totalUses: 1250,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 600,
      },
      {
        gender: "FEMALE",
        useCount: 400,
      },
      {
        gender: "OTHER",
        useCount: 250,
      },
    ],
  },
  {
    exerciseId: 2,
    totalUses: 1450,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 650,
      },
      {
        gender: "FEMALE",
        useCount: 500,
      },
      {
        gender: "OTHER",
        useCount: 200,
      },
    ],
  },
  {
    exerciseId: 3,
    totalUses: 1000,
    popularityScore: 4.8,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 600,
      },
      {
        gender: "FEMALE",
        useCount: 400,
      },
      {
        gender: "OTHER",
        useCount: 0,
      },
    ],
  },
  {
    exerciseId: 4,
    totalUses: 1500,
    popularityScore: 4.5,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 900,
      },
      {
        gender: "FEMALE",
        useCount: 500,
      },
      {
        gender: "OTHER",
        useCount: 100,
      },
    ],
  },
  {
    exerciseId: 5,
    totalUses: 900,
    popularityScore: 4.9,
    period: "2024-Q4",
    date: "2024-12-03T00:00:00Z",
    genderStats: [
      {
        gender: "MALE",
        useCount: 500,
      },
      {
        gender: "FEMALE",
        useCount: 350,
      },
      {
        gender: "OTHER",
        useCount: 50,
      },
    ],
  },
];

export const Ejercicios = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [ejercicios, setEjercicios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEjercicios = async () => {
      setLoading(true);
      try {
        // Enriquecer el array data con detalles del ejercicio
        const enrichedExercises = await Promise.all(
          data.map(async (item) => {
            const exerciseDetails = await findExerciseById(item.exerciseId);
            return {
              ...item,
              name: exerciseDetails.name,
              mediaUrl: exerciseDetails.mediaUrl,
              category: exerciseDetails.category,
              level: exerciseDetails.level,
              description: exerciseDetails.description,
              recommendation: exerciseDetails.recommendation,
              muscles: exerciseDetails.muscleGroups,
            };
          })
        );
        setEjercicios(enrichedExercises);
      } catch (error) {
        console.error("Error fetching exercises details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEjercicios();
  }, []);

  const handleExerciseSelect = (event) => {
    if (event) {
      const exercise = ejercicios.find((item) => item.name === event);
      setSelectedExercise(exercise); // Almacena el ejercicio seleccionado
      setActiveTab("detalles"); // Cambia a la pestaña de detalles
    }
  };

  return (
    <div className="bg-white rounded-xl flex flex-col shadow h-full p-4">
      <div>
        <div className="flex justify-between overflow-hidden">
          <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
            Ejercicios
          </h1>
        </div>
        <nav className="flex justify-between items-end open-sans border-b mb-2">
          <div>
            <button
              onClick={() => setActiveTab("general")}
              className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${
                      activeTab === "general"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500 hover:text-azul-marino-300"
                    }`}>
              General
            </button>
            <button
              onClick={() => setActiveTab("detalles")}
              className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${
                      activeTab === "detalles"
                        ? "text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50"
                        : "text-stone-500 "
                    }`}>
              Detalles
            </button>
          </div>
          {activeTab === "detalles" && (
            <nav className="flex justify-start sm:w-auto w-1/3 text-sm">
              <select
                className="px-4 py-1 w-full bg-white text-azul-marino-500"
                onChange={(e) => handleExerciseSelect(e.target.value)}
                defaultValue="">
                <option value="" disabled>
                  Selecciona un ejercicio
                </option>
                {ejercicios.map((exercise) => (
                  <option
                    key={exercise.name}
                    value={exercise.name}
                    className="font-medium">
                    {exercise.name}
                  </option>
                ))}
              </select>
            </nav>
          )}
        </nav>
      </div>

      {activeTab === "general" && (
        <GeneralEjercicios ejercicios={ejercicios} loading={loading} />
      )}
      {activeTab === "detalles" && (
        <DetallesEjercicios ejercicio={selectedExercise} loading={loading} />
      )}
    </div>
  );
};
