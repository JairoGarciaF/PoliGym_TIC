import React, { useState, useEffect } from "react";
import { FaUsers, FaUserPlus } from "react-icons/fa";
import { FaUserCheck, FaUserXmark } from "react-icons/fa6";
import { BiLoaderCircle } from "react-icons/bi";
import { UserAgeGraph } from "./UserAgeGraph";
import { UserStatsPieChart } from "./UserStatsPieChart";

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

export const General = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex-1 overflow-auto grid xl:grid-rows-12 p-4 bg-slate-100 rounded-xl open-sans gap-4 lg:grid-cols-2 ">
      <div className="lg:col-span-2 lg:row-span-2 col-span-1 grid-rows-1 grid grid-cols-4 gap-4">
        <Card
          sx={"col-span-1 row-span-1"}
          title={"Usuarios"}
          value={stats.totalUsers}
          Icon={FaUsers}
          loading={loading}
        />
        <Card
          sx={"col-span-1 row-span-1"}
          title={"Nuevos Usuarios"}
          value={stats.newUsers}
          Icon={FaUserPlus}
          loading={loading}
        />
        <Card
          sx={"col-span-1 row-span-1"}
          title={"Usuarios Activos"}
          value={stats.activeUsers}
          Icon={FaUserCheck}
          loading={loading}
        />
        <Card
          sx={"col-span-1 row-span-1"}
          title={"Usuarios Inactivos"}
          value={stats.inactiveUsers}
          Icon={FaUserXmark}
          loading={loading}
        />
      </div>
      <UserStatsPieChart stats={stats} loading={loading} />
      <UserAgeGraph stats={stats} loading={loading} />
    </div>
  );
};

const Card = ({ sx, title, value, Icon, loading }) => {
  if (loading) {
    return (
      <div
        className={`${sx} sm:col-span-1 col-span-2 row-span-1 bg-white  open-sans p-4 rounded-xl shadow flex justify-center items-center`}>
        <BiLoaderCircle className="size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div
      className={`${sx} sm:col-span-1 col-span-2 row-span-1 bg-white  open-sans p-4 rounded-xl shadow`}>
      <div className="h-full flex flex-col justify-center">
        <h3 className="text-stone-500 lg:text-sm text-xs s">{title}</h3>
        <div className="open-sans text-azul-marino-500 flex gap-4 items-center">
          <Icon className="lg:size-8 md:size-7 size-5" />
          <p className="font-semibold xl:text-3xl md:text-2xl text-xl">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
