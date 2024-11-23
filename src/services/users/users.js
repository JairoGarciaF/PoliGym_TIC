import axios from 'axios';
import { getToken } from '../token/store';

export const findAllUsers = async () => {
    try {
        const accessToken = getToken('accessToken');
        const response = await axios.get('api/user/find-all-users', {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error al obtener los usuarios');
        throw error;
    }
}