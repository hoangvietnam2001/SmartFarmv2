import axios from 'axios';
import {BASE_URL,URL_LOGIN_POST} from '../../utils/config';

export const login = async (credentials:object) => {
	try {
		const response = await axios.post(URL_LOGIN_POST, credentials);
		return response;
	} catch (error) {
		throw error;
	}
};

export const logout = async () => {
	try {
		const response = await axios.post(`${BASE_URL}/auth/logout`);
		return response.data;
	} catch (error) {
		throw error;
	}
};
