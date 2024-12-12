import React, { useState, useEffect } from "react";
import { FaUsers, FaUserPlus, FaFireAlt, FaBirthdayCake } from "react-icons/fa";
import { FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { findAllUsers } from "../../services/users/users";

const stats = {
  totalUsers: 5000,
  newUsers: 300,
  activeUsers: 4500,
  inactiveUsers: 500,
  period: "2024-Q4",
  date: "2024-12-03T00:00:00Z",
  genderStats: [
    {
      gender: "MALE",
      count: 2500,
    },
    {
      gender: "FEMALE",
      count: 2000,
    },
    {
      gender: "OTHER",
      count: 500,
    },
  ],
  goalStats: [
    {
      goal: "Weight Loss",
      count: 1500,
    },
    {
      goal: "Muscle Gain",
      count: 2000,
    },
    {
      goal: "Maintenance",
      count: 500,
    },
  ],
  ageRangeStats: [
    {
      ageRange: "18-24",
      count: 1500,
    },
    {
      ageRange: "25-34",
      count: 1800,
    },
    {
      ageRange: "35-44",
      count: 700,
    },
    {
      ageRange: "45+",
      count: 1000,
    },
  ],
};

export const StatCards = () => {
  const [loading, setLoading] = useState(false);
  const [activity, setActivity] = useState(0);
  const [averageAge, setAverageAge] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const users = await findAllUsers();

        // Calcular usuarios activos hoy
        const today = new Date().toISOString().slice(0, 10); // Fecha actual en formato 'YYYY-MM-DD'
        const activeToday = users.filter(
          (user) =>
            user.lastLogin &&
            new Date(user.lastLogin).toISOString().slice(0, 10) === today
        ).length;

        // Calcular el promedio de edad
        const totalAge = users.reduce((sum, user) => sum + (user.age || 0), 0);
        const average =
          users.length > 0 ? Math.round(totalAge / users.length) : 0;

        // Actualizar estados
        setActivity(activeToday);
        setAverageAge(average);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="xl:row-span-1 xl:col-span-3 lg:col-span-2 gap-4 grid sm:grid-cols-3 grid-cols-2 xl:grid-rows-2 lg:grid-rows-1 grid-rows-2">
      <Card
        sx={"col-span-1"}
        title={"Usuarios"}
        value={stats.totalUsers}
        Icon={FaUsers}
        loading={loading}
      />
      <Card
        sx={"col-span-1"}
        title={"Nuevos Usuarios"}
        value={stats.newUsers}
        Icon={FaUserPlus}
        loading={loading}
      />
      <Card
        sx={"col-span-1"}
        title={"Usuarios Activos"}
        value={stats.activeUsers}
        Icon={FaUserCheck}
        loading={loading}
      />
      <Card
        sx={"col-span-1 "}
        title={"Usuarios Inactivos"}
        value={stats.inactiveUsers}
        Icon={FaUserXmark}
        loading={loading}
      />
      <Card
        sx={"col-span-1"}
        title={"Actividad de Hoy"}
        value={activity}
        Icon={FaFireAlt}
        loading={loading}
      />
      <Card
        sx={"col-span-1"}
        title={"Promedio de Edad"}
        value={averageAge}
        Icon={FaBirthdayCake}
        loading={loading}
      />
    </div>
  );
};

const Card = ({ sx, title, value, Icon, loading }) => {
  if (loading) {
    return (
      <div
        className={`${sx} bg-white  open-sans p-4 rounded-xl shadow flex justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className={`${sx} bg-white  open-sans p-4 rounded-xl shadow`}>
      <div className="flex h-full xl:flex-col items-center xl:gap-0 gap-4 xl:justify-between  text-azul-marino-500 ">
        <div className="aspect-square xl:flex hidden h-full items-center justify-center">
          <Icon className="2xl:size-1/2 size-1/2" />
        </div>
        <div className="open-sans xl:self-start">
          <h3 className="text-stone-500 xl:text-sm text-xs ">{title}</h3>
          <div className="flex gap-2 items-center">
            <div className="aspect-square xl:hidden flex items-center justify-center">
              <Icon className="size-5" />
            </div>
            <p className="font-semibold xl:text-3xl md:text-2xl text-xl">
              {value}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
