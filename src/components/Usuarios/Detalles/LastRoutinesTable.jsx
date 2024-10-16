import React from 'react';

// Mapa de colores para los músculos
const muscleColors = {
    recent: 'bg-red-100 text-red-700', // Para músculos recientes
    old: 'bg-yellow-100 text-yellow-700',   // Para músculos antiguos
    default: 'bg-gray-100 text-gray-700'    // Para otros músculos
};

// Mapa de traducción de músculos al español
const muscleTranslation = {
    biceps: 'Bíceps',
    chest: 'Pecho',
    quads: 'Cuádriceps',
    glutes: 'Glúteos',
    calves: 'Pantorrillas',
    triceps: 'Tríceps',
    lats: 'Dorsales',
    traps: 'Trapecios',
    forearms: 'Antebrazos',
    shoulders: 'Hombros',
    obliques: 'Oblicuos',
    abdominals: 'Abdominales',
    lowerBack: 'Espalda baja',
    hamstrings: 'Isquiotibiales',
    "traps-middle": 'Trapecio medio',
};

export const LastRoutinesTable = ({ ultimasRutinas }) => {

    const today = new Date();

    // Función para determinar el estado de la rutina
    const getMuscleColor = (rutinaDate) => {
        const routineDate = new Date(rutinaDate);
        const timeDiff = today - routineDate; // Diferencia en milisegundos
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Diferencia en días

        if (daysDiff <= 3) {
            return muscleColors.recent; // Dentro de 3 días
        } else if (daysDiff <= 5) {
            return muscleColors.old; // De 4 a 5 días
        } else {
            return muscleColors.default; // Más de 5 días
        }
    };

    // Ordenar las rutinas por fecha de forma descendente (más reciente primero)
    const sortedRutinas = ultimasRutinas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));


    return (
        <div className="relative h-1/2 overflow-x-auto border sm:rounded-lg">
            <div className="h-full overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-azul-marino-500 ">
                    <thead className="text-xs text-white rounded uppercase bg-azul-marino-500 ">
                        <tr>
                            <th scope="col" className="p-2">
                                Rutina
                            </th>
                            <th scope="col" className="p-2 text-center ">
                                Músculos
                            </th>
                            <th scope="col" className="p-2 text-center ">
                                Duración
                            </th>
                            <th scope="col" className="p-2 text-center">
                                Fecha
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedRutinas.map((rutina, index) => (
                            <tr key={index} className="bg-white border-b hover:bg-azul-marino-100 ">
                                <th scope="row" className="p-2 whitespace-nowrap font-medium text-azul-marino-900 ">
                                    {rutina.rutina}
                                </th>
                                <td className="p-2 text-center">
                                    {rutina.musculos.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className={`${getMuscleColor(rutina.fecha)} px-2 py-1 rounded-full whitespace-nowrap mx-1`}
                                        >
                                            {muscleTranslation[muscle] || muscle}
                                        </span>
                                    ))}
                                </td>
                                <td className="p-2 text-center">
                                    <span className={`px-2 py-1 rounded-full whitespace-nowrap bg-blue-100 text-blue-700`}>
                                        {rutina.duracion}
                                    </span>
                                </td>
                                <td className="p-2 whitespace-nowrap text-center">
                                    {rutina.fecha}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}
