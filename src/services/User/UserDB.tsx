import {URL_USERS} from '../../utils/config';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
export default class UserDB {
	UserDB() {}
	async UpdateUser(uid: any, data: any) {
		try {
			const response = await axios.patch(URL_USERS + `/${uid}`, data);
			ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
			return response.data;
		} catch (error) {
			console.log('Update user failed :', error);
		}
	}
}
