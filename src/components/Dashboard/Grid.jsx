import React, { useEffect, useState } from "react";
import { StatCards } from "./StatCards";
import { ExercisesGraph } from "./ExercisesGraph";
import { RoutinesGraph } from "./RoutinesGraph";
import { PlansGraph } from "./PlansGraph";
import { TopUsers } from "./TopUsers";
import MuscleRadarChart from "./MuscleRadarChart";
import { findAllUsers } from "../../services/users/users";

const defaultProfilePic = "https://api.dicebear.com/9.x/initials/svg?seed=";

// const usuarios = [
//     {
//         id: 1,
//         nombre: 'Carlos',
//         correo: 'carlos@example.com',
//         rol: 'Usuario',
//         tipo: 'Estudiante', //Profesor, Administración
//         edad: 25,
//         oculto: false,
//         genero: 'Masculino',
//         diasActividad: 5,
//         peso: 55,
//         altura: 163,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Principiante',
//         comentarios: 10,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Lunes', 'Martes', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 2,
//         nombre: 'Ana',
//         correo: 'ana@example.com',
//         rol: 'Usuario',
//         tipo: 'Administración',
//         edad: 30,
//         oculto: false,
//         genero: 'Femenino',
//         diasActividad: 3,
//         peso: 60,
//         altura: 170,
//         objetivo: 'Bajar de Peso',
//         estadoFisico: 'Intermedio',
//         comentarios: 5,
//         notificaciones: false,
//         problemasMedicos: 'Alergias',
//         detalleProblemasMedicos: 'Alergia a la mantequilla de maní',
//         horario: 'Tarde',
//         diasSeleccionados: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 3,
//         nombre: 'Pedro',
//         correo: 'pedro@example.com',
//         rol: 'Admin',
//         tipo: 'Profesor',
//         edad: 40,
//         oculto: true,
//         genero: 'Masculino',
//         diasActividad: 4,
//         peso: 70,
//         altura: 180,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Avanzado',
//         comentarios: 15,
//         notificaciones: true,
//         problemasMedicos: 'Lesiones',
//         detalleProblemasMedicos: 'Dolor en la rodilla derecha',
//         horario: 'Noche',
//         diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 4,
//         nombre: 'Sofía',
//         correo: 'sofia@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 28,
//         oculto: true,
//         genero: 'Femenino',
//         diasActividad: 6,
//         peso: 65,
//         altura: 165,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Intermedio',
//         comentarios: 8,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Tarde',
//         diasSeleccionados: ['Miercoles', 'Jueves'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 5,
//         nombre: 'Javier',
//         correo: 'javier@example.com',
//         rol: 'Usuario',
//         tipo: 'Administración',
//         edad: 35,
//         oculto: true,
//         genero: 'Masculino',
//         diasActividad: 2,
//         peso: 75,
//         altura: 175,
//         objetivo: 'Bajar de Peso',
//         estadoFisico: 'Principiante',
//         comentarios: 12,
//         notificaciones: true,
//         problemasMedicos: 'Alergias',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Martes', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 6,
//         nombre: 'María',
//         correo: 'maria@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 20,
//         oculto: false,
//         genero: 'Femenino',
//         diasActividad: 7,
//         peso: 50,
//         altura: 160,
//         objetivo: 'Bajar de Peso',
//         estadoFisico: 'Avanzado',
//         comentarios: 20,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Lunes', 'Miercoles'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 7,
//         nombre: 'Luis',
//         correo: 'luis@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 45,
//         oculto: false,
//         genero: 'Masculino',
//         diasActividad: 1,
//         peso: 80,
//         altura: 185,
//         objetivo: 'Mantenerse en Forma',
//         estadoFisico: 'Intermedio',
//         comentarios: 6,
//         notificaciones: true,
//         problemasMedicos: 'Alergias',
//         detalleProblemasMedicos: '',
//         horario: 'Tarde',
//         diasSeleccionados: ['Lunes', 'Martes', 'Jueves'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 8,
//         nombre: 'Elena',
//         correo: 'elena@example.com',
//         rol: 'Admin',
//         tipo: 'Profesor',
//         edad: 22,
//         oculto: true,
//         genero: 'Otro',
//         diasActividad: 5,
//         peso: 55,
//         altura: 163,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Principiante',
//         comentarios: 10,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Miercoles', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 9,
//         nombre: 'Miguel',
//         correo: 'miguel@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 30,
//         oculto: false,
//         genero: 'Masculino',
//         diasActividad: 3,
//         peso: 60,
//         altura: 170,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Intermedio',
//         comentarios: 5,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 10,
//         nombre: 'Laura',
//         correo: 'laura@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 40,
//         oculto: false,
//         genero: 'Femenino',
//         diasActividad: 4,
//         peso: 70,
//         altura: 180,
//         objetivo: 'Ganar Músculo',
//         estadoFisico: 'Avanzado',
//         comentarios: 15,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Lunes', 'Martes'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 11,
//         nombre: 'Raúl',
//         correo: 'raul@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 28,
//         oculto: false,
//         genero: 'Masculino',
//         diasActividad: 6,
//         peso: 65,
//         altura: 165,
//         objetivo: 'Bajar de Peso',
//         estadoFisico: 'Intermedio',
//         comentarios: 8,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Martes', 'Miercoles', 'Jueves'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 12,
//         nombre: 'Carmen',
//         correo: 'carmen@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 35,
//         oculto: false,
//         genero: 'Otro',
//         diasActividad: 2,
//         peso: 75,
//         altura: 175,
//         objetivo: 'Ganar músculo',
//         estadoFisico: 'Principiante',
//         comentarios: 12,
//         notificaciones: true,
//         problemasMedicos: 'Alergias',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Martes', 'Jueves'],
//         imagenPerfil: defaultProfilePic,
//     },
//     {
//         id: 13,
//         nombre: 'Jorge',
//         correo: 'jorge@example.com',
//         rol: 'Usuario',
//         tipo: 'Profesor',
//         edad: 20,
//         oculto: false,
//         genero: 'Masculino',
//         diasActividad: 7,
//         peso: 50,
//         altura: 160,
//         objetivo: 'Mantenerse en Forma',
//         estadoFisico: 'Avanzado',
//         comentarios: 20,
//         notificaciones: true,
//         problemasMedicos: 'Ninguno',
//         detalleProblemasMedicos: '',
//         horario: 'Mañana',
//         diasSeleccionados: ['Lunes', 'Jueves', 'Viernes'],
//         imagenPerfil: defaultProfilePic,
//     }
// ];

export const Grid = ({ infoMode }) => {
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
      {/* <TopUsers usuarios={users} /> */}
      <MuscleRadarChart />
      <ExercisesGraph infoMode={infoMode} />
      <RoutinesGraph infoMode={infoMode} />
      <PlansGraph infoMode={infoMode} />
    </div>
  );
};
