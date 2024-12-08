import React, { useState, useEffect } from "react";
import { MdCake } from "react-icons/md";
import {
  FaCircleInfo,
  FaArrowTrendUp,
  FaClockRotateLeft,
} from "react-icons/fa6";
import { IoFitness } from "react-icons/io5";
import { TbTargetArrow } from "react-icons/tb";
import { FaAngleDown, FaAngleUp, FaWeight, FaRuler } from "react-icons/fa";
import { BodyMap } from "../../BodyMap/BodyMap";
import { UserCard } from "./UserCard";
import { LastRoutinesTable } from "./LastRoutinesTable";
import { TrainingPlansTable } from "./TrainingPlansTable";
import { MealPlansTable } from "./MealPlansTable";
import { findRoutineById } from "../../../services/routine/routine";
import { BiLoaderCircle } from "react-icons/bi";

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

const translateFitnessLevel = (fitnessLevel) => {
  switch (fitnessLevel) {
    case "BEGINNER":
      return "Principiante";
    case "INTERMEDIATE":
      return "Intermedio";
    case "ADVANCED":
      return "Avanzado";
    default:
      return "n/a";
  }
};

const translateGoal = (goal) => {
  switch (goal) {
    case "LOSE_WEIGHT":
      return "Perder Peso";
    case "MAINTAIN":
      return "Mantener Peso";
    case "GAIN_MUSCLE":
      return "Ganar Músculo";
    case "IMPROVE_ENDURANCE":
      return "Mejorar Resistencia";
    default:
      return "n/a";
  }
};

export const Detalles = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [recentMuscles, setRecentMuscles] = useState([]);
  const [oldMuscles, setOldMuscles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const workoutIds = user.workoutIds?.slice(0, 5) || [];
        if (!workoutIds.length) {
          console.error("No workout IDs found.");
          return;
        }

        setLoading(true);

        // Obtén los datos de las rutinas
        const fetchedWorkouts = await Promise.all(
          workoutIds.map(async (id) => {
            try {
              const workout = await findRoutineById(id);
              return workout;
            } catch (error) {
              console.error(`Error fetching workout ID ${id}:`, error);
              return null;
            }
          })
        );

        // Filtrar los que no se pudieron obtener
        const validWorkouts = fetchedWorkouts.filter(
          (workout) => workout !== null
        );

        // Transforma los datos al formato requerido
        const transformedWorkouts = validWorkouts.map((workout) => ({
          name: workout.name,
          category: workout.category,
          level: workout.level,
          muscles: [
            ...new Set(
              workout.exercisesInWorkout.flatMap((exercise) =>
                exercise.exercise.muscleGroups.map((group) => group.name)
              )
            ),
          ], // Evita duplicados con `Set`
        }));

        // Llena los arreglos recent y old
        setRecentMuscles(
          transformedWorkouts.slice(0, 3).flatMap((workout) => workout.muscles)
        );
        setOldMuscles(
          transformedWorkouts.slice(3).flatMap((workout) => workout.muscles)
        );
        setWorkouts(transformedWorkouts);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {user ? (
        <div className="grid open-sans xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 xl:grid-rows-2 gap-4 p-4 items-start flex-1 overflow-auto bg-slate-100 rounded-xl">
          <UserCard user={user} />

          {/* Información del usuario en cuadrícula */}
          <div className="col-span-1 h-full xl:row-span-1 grid grid-cols-6 gap-2 text-left text-slate-600 w-full">
            <Card
              Icon={MdCake}
              colSpan={"col-span-2"}
              title={"Edad"}
              value={user.age + " años"}
            />
            <Card
              Icon={FaWeight}
              colSpan={"col-span-2"}
              title={"Peso"}
              value={user.weight + " kg"}
            />
            <Card
              Icon={FaRuler}
              colSpan={"col-span-2"}
              title={"Altura"}
              value={user.height + " cm"}
            />
            <Card
              Icon={TbTargetArrow}
              colSpan={"col-span-3"}
              title={"Objetivo"}
              value={translateGoal(user.goal)}
            />
            <Card
              Icon={FaArrowTrendUp}
              colSpan={"col-span-3"}
              title={"Estado Físico"}
              value={translateFitnessLevel(user.fitnessLevel)}
            />

            <div className="relative flex items-center col-span-6 bg-white p-2 rounded-xl shadow">
              {/* Header del acordeón */}

              <div className="flex w-full justify-between items-center ">
                <div className="flex flex-col justify-center h-full">
                  <h3 className="text-stone-500 text-xs">Problemas Médicos</h3>
                  <div className="flex items-center gap-1 text-azul-marino-500">
                    <IoFitness className="xl:size-5 size-4" />
                    <p className="font-medium xl:text-xl md:text-lg text-sm">
                      {user.injury === null ? "Ninguno" : "Lesión"}
                    </p>
                  </div>
                </div>
                {user.injury !== null && (
                  <div onClick={toggleAccordion} className="cursor-pointer">
                    {isOpen ? (
                      <FaAngleUp className="size-5" />
                    ) : (
                      <FaAngleDown className="size-5" />
                    )}
                  </div>
                )}
              </div>

              {/* Contenido expandido */}
              {isOpen && (
                <div className="absolute left-0 top-full w-full bg-white shadow p-3 rounded mt-1 z-10">
                  <p className=" text-stone-800 text-sm">{user.injury}</p>
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div
              className={`xl:col-span-1 lg:col-span-2 xl:row-span-2 gap-2 p-4 xl:h-full sm:h-[50svh] h-full bg-white shadow rounded-xl flex flex-col justify-center items-center`}>
              <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
            </div>
          ) : (
            <div className="xl:col-span-1 lg:col-span-2 xl:row-span-2 gap-2 p-4 xl:h-full sm:h-[50svh] h-full bg-white shadow rounded-xl flex flex-col">
              <h3 className="text-azul-marino-500 xl:text-base text-sm  mb-1 flex items-center font-medium gap-1">
                <FaClockRotateLeft className="xl:size-4 size-3" />
                Últimas Rutinas
              </h3>

              <div className="flex-1 flex xl:flex-col sm:flex-row flex-col gap-2">
                <div className="flex justify-center xl:h-1/2 xl:w-full sm:w-1/2 h-auto">
                  <BodyMap
                    gender={translateGender(user.gender)}
                    view="front"
                    className="w-1/3"
                    recentMuscles={recentMuscles}
                    oldMuscles={oldMuscles}
                  />
                  <BodyMap
                    gender={translateGender(user.gender)}
                    view="back"
                    className="w-1/3"
                    recentMuscles={recentMuscles}
                    oldMuscles={oldMuscles}
                  />
                </div>
                <LastRoutinesTable ultimasRutinas={workouts} />
              </div>
            </div>
          )}

          <TrainingPlansTable plansIds={user.trainingPlanIds} />
          <MealPlansTable plansIds={user.nutritionIds} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[calc(100%-35px-56px)] gap-2">
          <FaCircleInfo className="text-stone-300 size-10" />
          <p className="text-stone-500">
            Selecciona un usuario para ver los detalles
          </p>
        </div>
      )}
    </>
  );
};

const Card = ({ Icon, colSpan, title, value }) => {
  return (
    <div className={`bg-white ${colSpan} row-span-1 p-2 rounded-xl shadow`}>
      <div className="flex flex-col justify-center h-full">
        <h3 className="text-stone-500 text-xs">{title}</h3>
        <div className="flex items-center gap-1 text-azul-marino-500 ">
          <Icon className="xl:size-5 size-4" />
          <p className="font-medium xl:text-xl md:text-lg text-sm truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
