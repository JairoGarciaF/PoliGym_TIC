import axios from 'axios';
import { getToken, isTokenValid } from '../token/store';

export const deleteMuscleGroup = async (id) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.delete(`api/muscle-group/delete/${id}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el grupo muscular');
        throw error;
    }
}

export const findAllMuscleGroups = async () => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.get('api/muscle-group/find-all', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los grupos musculares');
        throw error;
    }
}

export const findMuscleGroupById = async (id) => {
    try {
        await isTokenValid('accessToken');
        const accessToken = getToken('accessToken');
        const response = await axios.get(`api/muscle-group/find-by-id/${id}`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener el grupo muscular');
        throw error;
    }
}