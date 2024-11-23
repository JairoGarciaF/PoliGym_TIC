import axios from 'axios';
import { getToken, isTokenValid } from '../token/store';

export const createEquipment = async (equipment) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.post('api/equipment/create', equipment, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el equipo');
        throw error;
    }
}

export const updateEquipment = async (id, equipment) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.patch(`api/equipment/update/${id}`, equipment, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el equipo');
        throw error;
    }
}

export const deleteEquipment = async (id) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.delete(`api/equipment/delete/${id}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el equipo');
        throw error;
    }
}

export const findAllEquipment = async () => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.get('api/equipment/find-all', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los equipos');
        throw error;
    }
}

export const findEquipmentById = async (id) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.get(`api/equipment/find-by-id/${id}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el equipo');
        throw error;
    }
}
