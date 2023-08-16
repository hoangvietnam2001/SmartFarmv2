import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_REFRESH_TOKEN_POST,BASE_URL} from '../utils/config';
import moment from 'moment';
const makeAuthorizedRequest = async (url, method, data) => {
	try {
		let accessToken =JSON.parse( await AsyncStorage.getItem('accessToken'));
	console.log('oo', accessToken.expires);
		// Kiểm tra xem access token có hết hạn hay không
		const isAccessTokenExpired = await isTokenExpired(accessToken);
 
		if (!accessToken || isAccessTokenExpired) {
			// Nếu không có access token hoặc token hết hạn, lấy lại access token từ refresh token
			const refreshToken = await AsyncStorage.getItem('refreshToken');
			
			try {
				const response = await axios.post(URL_REFRESH_TOKEN_POST, {
					refreshToken: refreshToken,
				});
				accessToken = JSON.stringify(response.data.body.token);
				// Lưu access token mới vào AsyncStorage
				await AsyncStorage.setItem('accessToken', accessToken);
				console.log('Lấy lại access token mới thành công.');

				// Sau khi lấy lại access token, gửi lại yêu cầu API với access token mới
				// Tùy biến theo username password ??
				const responseWithNewAccessToken = await axios({
					url: `http://103.160.2.183:5001/api/${url}`,
					method,
					headers: {
						Authorization: `${accessToken}`,
					},
					data,
				}); 

				return responseWithNewAccessToken.data;
			} catch (error) {
				console.error('Lỗi khi lấy lại access token:', error);
				throw error;
			}

		} else {
			// Nếu access token chưa hết hạn, gửi yêu cầu API với access token hiện tại
			const response = await axios({
				url: `http://103.160.2.183:5001/api/${url}`,
				method,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				data,
			});

			return response.data;
		}
		const response = await axios.post(URL_REFRESH_TOKEN_POST, {});
	} catch (error) {
		console.log('Lỗi khi gửi yêu cầu', error);
		throw error;
	}
};

const isTokenExpired = async accessToken => {
	const currentTime = new Date().getTime();
	const tokenExpirationTime = moment(accessToken.expires).valueOf();
	return currentTime > tokenExpirationTime;
};

export { makeAuthorizedRequest };
