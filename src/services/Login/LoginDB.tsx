import axios from 'axios';
import {BASE_URL,URL_LOGIN_POST, URL_USERS} from '../../utils/config';

export const login = async (credentials:object) => {
	try {
		const response = await axios.post(URL_LOGIN_POST, credentials);
		return response;
	} catch (error) {
		throw error;
	}
};

export const logout = async (refreshToken: object) => {
	try {
		const response = await axios.post(BASE_URL,JSON.stringify(refreshToken));
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const userDB = async (userName: string) =>{
	try{
		const response = await axios.get(URL_USERS);
		const data = response.data.body.results.find((doc: any)=>doc.username === userName);
		console.log(data);
		return data;
	}
	catch (e: any )
	{
		throw e;
	}
}