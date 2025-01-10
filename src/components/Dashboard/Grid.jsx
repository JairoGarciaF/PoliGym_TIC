import React, { useEffect, useState } from "react";
import { StatCards } from "./StatCards";
import { ExercisesGraph } from "./ExercisesGraph";
import { RoutinesGraph } from "./RoutinesGraph";
import { PlansGraph } from "./PlansGraph";
import MuscleRadarChart from "./MuscleRadarChart";
import { findAllUsers } from "../../services/users/users";

export const Grid = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await findAllUsers();
        setUsers(users);
      } catch (error) {
        console.error("Error al obtener los usuarios", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="flex-1 overflow-auto grid xl:grid-rows-2  p-4 bg-slate-100 rounded-xl mt-2 open-sans gap-4 xl:grid-cols-6 lg:grid-cols-2">
      <StatCards usuarios={users} />
      <MuscleRadarChart />
      <ExercisesGraph />
      <RoutinesGraph />
      <PlansGraph />
    </div>
  );
};
