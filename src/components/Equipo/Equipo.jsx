import React, { useState, useEffect } from "react";
import { DetailsGraph } from "./DetailsGraph";
import { EquipmentGraph } from "./EquipmentGraph";
import { EquipmentTable } from "./EquipmentTable";
import { findEquipmentById } from "../../services/equipment/equipment";

const data = [
  {
    id: "64a8b2c5d3f1b8e7c1234567",
    equipmentId: "1",
    totalUses: 160,
    popularityScore: 4.5,
    period: "WEEKLY",
    date: "2024-12-03T12:00:00Z",
    genderStats: [
      {
        id: "64a8b2c5d3f1b8e7c1234568",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "MALE",
        useCount: 80,
      },
      {
        id: "64a8b2c5d3f1b8e7c1234569",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "FEMALE",
        useCount: 70,
      },
      {
        id: "64a8b2c5d3f1b8e7c123456a",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "OTHER",
        useCount: 10,
      },
    ],
  },
  {
    id: "64a8b2c5d3f1b8e7c1234567",
    equipmentId: "2",
    totalUses: 200,
    popularityScore: 4.0,
    period: "WEEKLY",
    date: "2024-12-03T12:00:00Z",
    genderStats: [
      {
        id: "64a8b2c5d3f1b8e7c1234568",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "MALE",
        useCount: 100,
      },
      {
        id: "64a8b2c5d3f1b8e7c1234569",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "FEMALE",
        useCount: 80,
      },
      {
        id: "64a8b2c5d3f1b8e7c123456b",
        equipmentStatisticsId: "64a8b2c5d3f1b8e7c1234567",
        gender: "OTHER",
        useCount: 20,
      },
    ],
  },
];

const generatePieChartData = (equipos) => {
  // Ordenar los equipos por totalUses en orden descendente
  const sortedEquipos = [...equipos].sort((a, b) => b.totalUses - a.totalUses);

  // Tomar solo los 5 equipos con más usos
  const topEquipos = sortedEquipos.slice(0, 5);

  // Mapear al formato necesario para el PieChart
  return topEquipos.map((equipo) => ({
    id: equipo.id,
    value: equipo.totalUses,
    label: equipo.name || "Unknown",
  }));
};

const generateTableData = (equipos) => {
  // Ordenar los equipos por totalUses en orden descendente
  const sortedEquipos = [...equipos].sort((a, b) => b.totalUses - a.totalUses);
  return sortedEquipos;
};

export const Equipo = () => {
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState([]);
  const pieChartData = generatePieChartData(equipment);
  const tableData = generateTableData(equipment);

  useEffect(() => {
    const fetchEquipos = async () => {
      setLoading(true);
      try {
        // Enriquecer el array data con detalles del equipo
        const enrichedEquipos = await Promise.all(
          data.map(async (item) => {
            const equipmentDetails = await findEquipmentById(item.equipmentId);
            return {
              ...item,
              name: equipmentDetails.name,
              description: equipmentDetails.description,
              category: equipmentDetails.category,
              status: equipmentDetails.status,
            };
          })
        );
        setEquipment(enrichedEquipos);
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipos();
  }, []);

  return (
    <div className="bg-white rounded-xl pb-4  shadow open-sans h-full flex flex-col p-4">
      <div className="flex justify-between overflow-hidden">
        <h1 className="montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold">
          Equipos
        </h1>
      </div>
      <div className="overflow-auto flex-1 grid xl:grid-rows-2 gap-2 ">
        <div className="row-span-1 flex flex-col">
          <nav className="flex justify-start border-b  mb-2">
            <span className="px-4 py-1  font-semibold text-sm transition-colors text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50">
              General
            </span>
          </nav>
          <div className="grid overflow-auto flex-1 xl:grid-rows-1 bg-slate-100 gap-4 p-4 rounded-xl xl:grid-cols-2">
            <EquipmentGraph
              data={pieChartData}
              total={equipment.length}
              loading={loading}
            />
            <EquipmentTable data={tableData} loading={loading} />
          </div>
        </div>

        <div className="row-span-1 flex-1 flex flex-col">
          <DetailsGraph data={equipment} loading={loading} />
        </div>
      </div>
    </div>
  );
};
