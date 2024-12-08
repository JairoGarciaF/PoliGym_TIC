import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { BiCalendarStar, BiLoaderCircle } from "react-icons/bi";

const colors = ["#64dfdf", "#4ea8de", "#5e60ce", "#7400b8"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-gray-300 rounded-md open-sans">
        <span className="flex  m-0">
          <p className="font-semibold">Edad: </p> {payload[0].payload.ageRange}
        </span>
        <span className="flex  m-0">
          <p className="font-semibold">Total: </p> {payload[0].value}
        </span>
      </div>
    );
  }
  return null;
};

export const UserAgeGraph = ({ stats, loading }) => {
  if (loading) {
    return (
      <div
        className={
          "bg-white col-span-1 row-span-10 lg:h-auto h-[50svh] p-4 rounded-xl shadow flex flex-col justify-center items-center"
        }>
        <BiLoaderCircle className="xl:size-10 size-8 animate-spin text-azul-marino-200" />
      </div>
    );
  }
  return (
    <div className="bg-white col-span-1 lg:row-span-10 lg:h-auto h-[60svh] p-4 rounded-xl shadow flex flex-col items-center">
      <h3 className="text-azul-marino-500 xl:text-base text-sm flex self-start items-center gap-2 font-medium">
        <BiCalendarStar className="xl:size-5 size-4" />
        Usuarios por Edad
      </h3>
      <div className="flex-1 w-full flex items-center justify-center">
        <ResponsiveContainer width="90%" height="75%">
          <BarChart data={stats.ageRangeStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="ageRange"
              label={{
                value: "Edad",
                position: "insideBottom",
                offset: -5,
                style: { textAnchor: "middle" },
              }}
            />
            <YAxis
              label={{
                value: "Total",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: { textAnchor: "middle" },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" barSize="10%">
              {stats.ageRangeStats.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                  radius={[5, 5, 0, 0]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
