import React, { useState } from 'react';
import { GeneralEjercicios } from './GeneralEjercicios/GeneralEjercicios';
import { DetallesEjercicios } from './DetallesEjercicios/DetallesEjercicios';

const ejercicios = [
    {
        "id": 1,
        "url": "https://example.com/bicicleta-estatica",
        "nombre": "Bicicleta Estática",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Bicicleta Estática",
        "musculos": ["calves", "quads"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [3, 4, 3, 5, 2, 3, 4],
        "uso_mensual": [40, 32, 34, 38, 36, 31, 39, 30, 35, 33, 0, 0]
    },
    {
        "id": 2,
        "url": "https://example.com/maquina-paralela",
        "nombre": "Fondos en Máquina Paralela",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina Paralela",
        "musculos": ["triceps", "shoulders", "chest"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [1, 2, 1, 3, 1, 1, 2],
        "uso_mensual": [20, 18, 19, 16, 17, 15, 20, 19, 18, 17, 0, 0]
    },
    {
        "id": 3,
        "url": "https://example.com/maquina-biceps",
        "nombre": "Curl en Máquina de Bíceps",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de Bíceps",
        "musculos": ["biceps"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [3, 3, 4, 3, 2, 3, 4],
        "uso_mensual": [30, 28, 29, 26, 27, 24, 29, 27, 28, 26, 0, 0]
    },
    {
        "id": 4,
        "url": "https://example.com/maquina-lumbares",
        "nombre": "Extensiones de Espalda Baja",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de Lumbares",
        "musculos": ["lowerback"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [2, 3, 2, 2, 2, 3, 2],
        "uso_mensual": [24, 20, 22, 21, 22, 20, 21, 19, 23, 21, 0, 0]
    },
    {
        "id": 5,
        "url": "https://example.com/maquina-halterofilia",
        "nombre": "Sentadilla con Barra",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de Halterofilia",
        "musculos": ["quads", "glutes", "hamstrings"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [35, 34, 32, 30, 33, 31, 32, 30, 33, 31, 0, 0]
    },

    {
        "id": 6,
        "url": "https://example.com/maquina-aperturas",
        "nombre": "Aperturas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina de Aperturas",
        "musculos": ["chest", "shoulders"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [2, 3, 2, 3, 2, 3, 2],
        "uso_mensual": [28, 26, 27, 25, 28, 26, 27, 25, 28, 27, 0, 0]
    },
    {
        "id": 7,
        "url": "https://example.com/multiusos-chest-fly",
        "nombre": "Aperturas para Pecho",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina Multiusos",
        "musculos": ["chest", "shoulders"],
        "uso_genero": {
            "masculino": { "semanal": 20, "mensual": 70 },
            "femenino": { "semanal": 18, "mensual": 60 },
            "otro": { "semanal": 15, "mensual": 55 }
        },
        "uso_semanal": [3, 3, 3, 4, 3, 3, 3],
        "uso_mensual": [30, 29, 30, 28, 30, 29, 28, 29, 30, 28, 0, 0]
    },
    {
        "id": 8,
        "url": "https://example.com/multiusos-lat-pulldown",
        "nombre": "Jalón al Pecho",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina Multiusos",
        "musculos": ["lats", "biceps"],
        "uso_genero": {
            "masculino": { "semanal": 25, "mensual": 80 },
            "femenino": { "semanal": 20, "mensual": 70 },
            "otro": { "semanal": 17, "mensual": 60 }
        },
        "uso_semanal": [4, 3, 4, 4, 3, 3, 4],
        "uso_mensual": [35, 33, 34, 32, 35, 33, 34, 32, 35, 34, 0, 0]
    },
    {
        "id": 9,
        "url": "https://example.com/multiusos-seated-row",
        "nombre": "Remo Sentado",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina Multiusos",
        "musculos": ["lats", "traps-middle", "biceps"],
        "uso_genero": {
            "masculino": { "semanal": 22, "mensual": 75 },
            "femenino": { "semanal": 18, "mensual": 65 },
            "otro": { "semanal": 15, "mensual": 55 }
        },
        "uso_semanal": [4, 4, 3, 4, 3, 4, 3],
        "uso_mensual": [36, 34, 35, 33, 34, 35, 36, 34, 35, 33, 0, 0]
    },
    {
        "id": 10,
        "url": "https://example.com/multiusos-tricep-pulldown",
        "nombre": "Jalón de Tríceps",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina Multiusos",
        "musculos": ["triceps"],
        "uso_genero": {
            "masculino": { "semanal": 23, "mensual": 78 },
            "femenino": { "semanal": 19, "mensual": 66 },
            "otro": { "semanal": 16, "mensual": 60 }
        },
        "uso_semanal": [3, 4, 3, 3, 4, 3, 4],
        "uso_mensual": [28, 26, 27, 25, 28, 27, 26, 25, 27, 26, 0, 0]
    },
    {
        "id": 11,
        "url": "https://example.com/press-hombros",
        "nombre": "Press de Hombros",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de Press de Hombros",
        "musculos": ["shoulders"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [3, 3, 3, 4, 3, 3, 3],
        "uso_mensual": [33, 30, 31, 29, 33, 30, 32, 29, 31, 30, 0, 0]
    },
    {
        "id": 12,
        "url": "https://example.com/polea-alta",
        "nombre": "Polea Alta",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Máquina Polea Alta",
        "musculos": ["lats", "triceps"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [2, 2, 3, 2, 2, 2, 3],
        "uso_mensual": [26, 25, 27, 24, 25, 23, 27, 24, 26, 25, 0, 0]
    },
    {
        "id": 13,
        "url": "https://example.com/remo",
        "nombre": "Remo en Máquina",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Máquina de Remo",
        "musculos": ["lats", "traps-middle", "biceps"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 85 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 16, "mensual": 30 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [30, 29, 30, 28, 30, 29, 28, 29, 30, 28, 0, 0]
    },
    {
        "id": 14,
        "url": "https://example.com/barra-deadlift",
        "nombre": "Peso Muerto",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["lowerback", "glutes", "hamstrings", "forearms"],
        "uso_genero": {
            "masculino": { "semanal": 30, "mensual": 90 },
            "femenino": { "semanal": 25, "mensual": 75 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [3, 4, 3, 4, 4, 3, 4],
        "uso_mensual": [30, 28, 29, 27, 30, 28, 29, 27, 30, 28, 0, 0]
    },
    {
        "id": 15,
        "url": "https://example.com/barra-squat",
        "nombre": "Sentadilla",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["quads", "glutes", "lowerback"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 23, "mensual": 70 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [4, 4, 4, 3, 4, 4, 4],
        "uso_mensual": [35, 34, 35, 32, 35, 34, 35, 32, 35, 34, 0, 0]
    },
    {
        "id": 16,
        "url": "https://example.com/barra-bench-press",
        "nombre": "Press de Pecho",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["chest", "triceps", "shoulders"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 82 },
            "femenino": { "semanal": 21, "mensual": 65 },
            "otro": { "semanal": 17, "mensual": 55 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 3],
        "uso_mensual": [29, 28, 29, 27, 29, 28, 27, 28, 29, 27, 0, 0]
    },
    {
        "id": 17,
        "url": "https://example.com/barra-overhead-press",
        "nombre": "Press Militar",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["shoulders", "triceps", "upperback"],
        "uso_genero": {
            "masculino": { "semanal": 24, "mensual": 75 },
            "femenino": { "semanal": 20, "mensual": 65 },
            "otro": { "semanal": 15, "mensual": 50 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [32, 30, 31, 29, 32, 30, 31, 29, 32, 30, 0, 0]
    },
    {
        "id": 18,
        "url": "https://example.com/barra-bicep-curl",
        "nombre": "Curl de Bíceps",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["biceps", "forearms"],
        "uso_genero": {
            "masculino": { "semanal": 26, "mensual": 78 },
            "femenino": { "semanal": 21, "mensual": 65 },
            "otro": { "semanal": 18, "mensual": 58 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 3, 3],
        "uso_mensual": [30, 28, 29, 27, 30, 28, 29, 27, 30, 28, 0, 0]
    },
    {
        "id": 19,
        "url": "https://example.com/barra-row",
        "nombre": "Remo con Barra",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Barras",
        "musculos": ["lats", "biceps", "traps-middle"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 23, "mensual": 72 },
            "otro": { "semanal": 19, "mensual": 60 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 4],
        "uso_mensual": [33, 31, 32, 30, 33, 31, 32, 30, 33, 31, 0, 0]
    },
    {
        "id": 20,
        "url": "https://example.com/mancuernas-bicep-curl",
        "nombre": "Curl de Bíceps con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["biceps", "forearms"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 23, "mensual": 70 },
            "otro": { "semanal": 18, "mensual": 60 }
        },
        "uso_semanal": [4, 4, 5, 4, 3, 4, 4],
        "uso_mensual": [40, 38, 39, 37, 40, 38, 39, 36, 40, 37, 0, 0]
    },
    {
        "id": 21,
        "url": "https://example.com/mancuernas-chest-press",
        "nombre": "Press de Pecho con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["chest", "shoulders", "triceps"],
        "uso_genero": {
            "masculino": { "semanal": 30, "mensual": 90 },
            "femenino": { "semanal": 25, "mensual": 75 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [4, 4, 5, 4, 3, 4, 4],
        "uso_mensual": [42, 40, 41, 39, 42, 40, 41, 39, 42, 40, 0, 0]
    },
    {
        "id": 22,
        "url": "https://example.com/mancuernas-lateral-raise",
        "nombre": "Elevaciones Laterales con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["shoulders", "traps"],
        "uso_genero": {
            "masculino": { "semanal": 26, "mensual": 78 },
            "femenino": { "semanal": 21, "mensual": 65 },
            "otro": { "semanal": 18, "mensual": 58 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 3],
        "uso_mensual": [32, 31, 32, 30, 32, 31, 32, 30, 32, 31, 0, 0]
    },
    {
        "id": 23,
        "url": "https://example.com/mancuernas-squat",
        "nombre": "Sentadilla Goblet con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["quads", "glutes", "hamstrings"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 23, "mensual": 72 },
            "otro": { "semanal": 19, "mensual": 60 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 4],
        "uso_mensual": [33, 31, 32, 30, 33, 31, 32, 30, 33, 31, 0, 0]
    },
    {
        "id": 24,
        "url": "https://example.com/mancuernas-shoulder-press",
        "nombre": "Press Militar con Mancuernas",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["shoulders", "triceps", "upperback"],
        "uso_genero": {
            "masculino": { "semanal": 27, "mensual": 82 },
            "femenino": { "semanal": 22, "mensual": 68 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [35, 34, 35, 33, 35, 34, 35, 33, 35, 34, 0, 0]
    },
    {
        "id": 25,
        "url": "https://example.com/mancuernas-lunges",
        "nombre": "Lunges con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["quads", "glutes", "hamstrings"],
        "uso_genero": {
            "masculino": { "semanal": 29, "mensual": 87 },
            "femenino": { "semanal": 24, "mensual": 75 },
            "otro": { "semanal": 19, "mensual": 58 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 4],
        "uso_mensual": [36, 34, 35, 33, 36, 34, 35, 33, 36, 34, 0, 0]
    },
    {
        "id": 26,
        "url": "https://example.com/mancuernas-front-raise",
        "nombre": "Elevaciones Frontales con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["shoulders", "deltoids"],
        "uso_genero": {
            "masculino": { "semanal": 24, "mensual": 75 },
            "femenino": { "semanal": 20, "mensual": 65 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [3, 3, 4, 3, 3, 3, 3],
        "uso_mensual": [28, 27, 28, 26, 28, 27, 28, 26, 28, 27, 0, 0]
    },
    {
        "id": 27,
        "url": "https://example.com/mancuernas-hammer-curl",
        "nombre": "Curl Martillo con Mancuernas",
        "dificultad": "Media",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["biceps", "forearms"],
        "uso_genero": {
            "masculino": { "semanal": 26, "mensual": 80 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [4, 3, 5, 4, 3, 4, 4],
        "uso_mensual": [34, 33, 34, 32, 34, 33, 34, 32, 34, 33, 0, 0]
    },
    {
        "id": 28,
        "url": "https://example.com/mancuernas-concentration-curl",
        "nombre": "Curl de Concentración con Mancuernas",
        "dificultad": "Alta",
        "categoria": "Fuerza",
        "implemento": "Mancuernas",
        "musculos": ["biceps"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 23, "mensual": 72 },
            "otro": { "semanal": 19, "mensual": 60 }
        },
        "uso_semanal": [4, 4, 5, 4, 3, 4, 4],
        "uso_mensual": [36, 34, 35, 33, 36, 34, 35, 33, 36, 34, 0, 0]
    },
    {
        "id": 29,
        "url": "https://example.com/estiramiento-cuello",
        "nombre": "Estiramiento de Cuello",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["neck"],
        "uso_genero": {
            "masculino": { "semanal": 15, "mensual": 50 },
            "femenino": { "semanal": 12, "mensual": 45 },
            "otro": { "semanal": 10, "mensual": 35 }
        },
        "uso_semanal": [2, 3, 2, 3, 2, 2, 2],
        "uso_mensual": [20, 19, 18, 17, 20, 19, 18, 17, 20, 19, 0, 0]
    },
    {
        "id": 30,
        "url": "https://example.com/estiramiento-hombros",
        "nombre": "Estiramiento de Hombros",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["shoulders", "deltoids"],
        "uso_genero": {
            "masculino": { "semanal": 20, "mensual": 65 },
            "femenino": { "semanal": 18, "mensual": 60 },
            "otro": { "semanal": 15, "mensual": 50 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 3],
        "uso_mensual": [25, 24, 25, 23, 25, 24, 25, 23, 25, 24, 0, 0]
    },
    {
        "id": 31,
        "url": "https://example.com/estiramiento-espalda",
        "nombre": "Estiramiento de Espalda",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["back", "lats"],
        "uso_genero": {
            "masculino": { "semanal": 22, "mensual": 70 },
            "femenino": { "semanal": 20, "mensual": 65 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [3, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [28, 26, 27, 25, 28, 27, 28, 25, 28, 27, 0, 0]
    },
    {
        "id": 32,
        "url": "https://example.com/estiramiento-pecho",
        "nombre": "Estiramiento de Pecho",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["chest"],
        "uso_genero": {
            "masculino": { "semanal": 25, "mensual": 75 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [4, 3, 5, 4, 3, 4, 4],
        "uso_mensual": [32, 30, 31, 29, 32, 31, 32, 29, 32, 31, 0, 0]
    },
    {
        "id": 33,
        "url": "https://example.com/estiramiento-cuadriceps",
        "nombre": "Estiramiento de Cuádriceps",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["quads"],
        "uso_genero": {
            "masculino": { "semanal": 23, "mensual": 72 },
            "femenino": { "semanal": 21, "mensual": 65 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 4, 3],
        "uso_mensual": [30, 28, 29, 27, 30, 29, 30, 27, 30, 29, 0, 0]
    },
    {
        "id": 34,
        "url": "https://example.com/estiramiento-gluteos",
        "nombre": "Estiramiento de Glúteos",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["glutes"],
        "uso_genero": {
            "masculino": { "semanal": 20, "mensual": 60 },
            "femenino": { "semanal": 18, "mensual": 55 },
            "otro": { "semanal": 16, "mensual": 50 }
        },
        "uso_semanal": [3, 3, 4, 3, 4, 3, 4],
        "uso_mensual": [26, 25, 26, 24, 26, 25, 26, 24, 26, 25, 0, 0]
    },
    {
        "id": 35,
        "url": "https://example.com/estiramiento-isquiotibiales",
        "nombre": "Estiramiento de Isquiotibiales",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["hamstrings"],
        "uso_genero": {
            "masculino": { "semanal": 22, "mensual": 68 },
            "femenino": { "semanal": 20, "mensual": 60 },
            "otro": { "semanal": 18, "mensual": 55 }
        },
        "uso_semanal": [3, 4, 3, 4, 3, 3, 3],
        "uso_mensual": [28, 27, 28, 26, 28, 27, 28, 26, 28, 27, 0, 0]
    },
    {
        "id": 36,
        "url": "https://example.com/estiramiento-gluteos-espalda",
        "nombre": "Estiramiento de Glúteos y Espalda Baja",
        "dificultad": "Baja",
        "categoria": "Estiramiento",
        "implemento": "Ninguno",
        "musculos": ["lowerback", "glutes"],
        "uso_genero": {
            "masculino": { "semanal": 25, "mensual": 75 },
            "femenino": { "semanal": 22, "mensual": 70 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [4, 3, 4, 3, 4, 4, 4],
        "uso_mensual": [32, 30, 31, 29, 32, 31, 32, 29, 32, 31, 0, 0]
    },
    {
        "id": 37,
        "url": "https://example.com/jumping-jacks",
        "nombre": "Jumping Jacks",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["calves", "quads", "hamstrings", "glutes", "shoulders"],
        "uso_genero": {
            "masculino": { "semanal": 30, "mensual": 90 },
            "femenino": { "semanal": 25, "mensual": 75 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [5, 6, 5, 6, 5, 5, 5],
        "uso_mensual": [35, 33, 34, 31, 35, 34, 35, 31, 35, 34, 0, 0]
    },
    {
        "id": 38,
        "url": "https://example.com/burpees",
        "nombre": "Burpees",
        "dificultad": "Media",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["chest", "triceps", "shoulders", "quads", "glutes", "hamstrings"],
        "uso_genero": {
            "masculino": { "semanal": 30, "mensual": 90 },
            "femenino": { "semanal": 25, "mensual": 75 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [5, 6, 5, 6, 5, 5, 5],
        "uso_mensual": [35, 33, 34, 31, 35, 34, 35, 31, 35, 34, 0, 0]
    },
    {
        "id": 39,
        "url": "https://example.com/high-knee-taps",
        "nombre": "High Knee Taps",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["quads", "glutes", "hamstrings", "calves", "abs"],
        "uso_genero": {
            "masculino": { "semanal": 28, "mensual": 85 },
            "femenino": { "semanal": 24, "mensual": 72 },
            "otro": { "semanal": 20, "mensual": 60 }
        },
        "uso_semanal": [5, 6, 5, 6, 5, 5, 5],
        "uso_mensual": [33, 31, 32, 29, 33, 32, 33, 29, 33, 32, 0, 0]
    },
    {
        "id": 40,
        "url": "https://example.com/reverse-high-knee-taps",
        "nombre": "Reverse High Knee Taps",
        "dificultad": "Baja",
        "categoria": "Cardio",
        "implemento": "Ninguno",
        "musculos": ["quads", "glutes", "hamstrings", "calves"],
        "uso_genero": {
            "masculino": { "semanal": 30, "mensual": 90 },
            "femenino": { "semanal": 25, "mensual": 75 },
            "otro": { "semanal": 22, "mensual": 66 }
        },
        "uso_semanal": [5, 6, 5, 6, 5, 5, 5],
        "uso_mensual": [35, 33, 34, 31, 35, 34, 35, 31, 35, 34, 0, 0]
    }



];



const calculateTotals = (ejercicios) => {
    return ejercicios.map(ejercicio => ({
        ...ejercicio,
        uso_semanal_total: ejercicio.uso_semanal.reduce((sum, usage) => sum + usage, 0),
        uso_mensual_total: ejercicio.uso_mensual.reduce((sum, usage) => sum + usage, 0),
    }));
};


export const Ejercicios = () => {
    const [infoMode, setInfoMode] = useState('Semanal');
    const [activeTab, setActiveTab] = useState('general');
    const [selectedExercise, setSelectedExercise] = useState(null); // Para guardar el ejercicio seleccionado
    const ejerciciosData = calculateTotals(ejercicios);

    const handleExerciseSelect = (event) => {
        if (event) {
            const exercise = ejerciciosData.find((item) => item.nombre === event);
            setSelectedExercise(exercise); // Almacena el ejercicio seleccionado
            setActiveTab('detalles'); // Cambia a la pestaña de detalles
        }
    };

    return (
        <div className='bg-white rounded-xl flex flex-col shadow h-full p-4'>
            <div>
                <div className='flex justify-between overflow-hidden'>
                    <h1 className='montserrat-alternates text-azul-marino-500 sm:text-3xl text-2xl font-semibold'>Ejercicios</h1>
                    <nav className="flex justify-start md:w-auto w-1/3 open-sans">
                        <button
                            onClick={() => setInfoMode('Semanal')}
                            className={`sm:p-2 p-1 text-xs truncate rounded-l-lg transition-colors 
                    ${infoMode === 'Semanal'
                                    ? 'text-blue-700   bg-blue-100'
                                    : 'text-slate-500 border hover:bg-slate-50'}`}
                        >
                            Semanal
                        </button>
                        <button
                            onClick={() => setInfoMode('Mensual')}
                            className={`sm:p-2 p-1 text-xs truncate rounded-r-lg  transition-colors 
                    ${infoMode === 'Mensual'
                                    ? 'text-cyan-700  bg-cyan-100'
                                    : 'text-slate-500 border hover:bg-slate-50'}`}
                        >
                            Mensual
                        </button>
                    </nav>
                </div>
                <nav className="flex justify-between items-end open-sans border-b mb-2">
                    <div >
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${activeTab === 'general'
                                    ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                    : 'text-stone-500 hover:text-azul-marino-300'}`}
                        >
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('detalles')}
                            className={`px-4 py-1 font-semibold text-sm transition-colors 
                    ${activeTab === 'detalles'
                                    ? 'text-azul-marino-500 border-b-4 border-azul-marino-500 bg-gradient-to-t from-sky-50'
                                    : 'text-stone-500 '}`}
                        >
                            Detalles
                        </button>
                    </div>
                    {activeTab === 'detalles' && (
                        <nav className="flex justify-start sm:w-auto w-1/3 text-sm">
                            <select
                                className="px-4 py-1 w-full bg-white text-azul-marino-500"
                                onChange={(e) => handleExerciseSelect(e.target.value)}
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Selecciona un ejercicio
                                </option>
                                {ejerciciosData.map((exercise) => (
                                    <option key={exercise.nombre} value={exercise.nombre} className="font-medium">
                                        {exercise.nombre}
                                    </option>
                                ))}
                            </select>
                        </nav>
                    )}

                </nav>
            </div>

            {activeTab === 'general' && <GeneralEjercicios ejercicios={ejerciciosData} infoMode={infoMode} />}
            {activeTab === 'detalles' && <DetallesEjercicios ejercicio={selectedExercise} infoMode={infoMode} />}
        </div>
    )
}
