import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Alert,
	ToastAndroid,
} from 'react-native';
import React from 'react';
import {LinearGradient} from 'react-native-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL_LOGIN_POST} from '../../utils/config';
import {useDispatch, useSelector} from 'react-redux';
import {loginSuccess} from '../../redux/slices/authSlice';
import { userDB } from '../../services/Login/LoginDB';
export default function ButtonLogin({
	navigation,
	userName,
	passWord,
}: {
	navigation: any;
	userName: string;
	passWord: string;
}) {
	const dispatch = useDispatch();
	
	const handleLogin = async () => {
		if (userName == '' || passWord === '') {
			ToastAndroid.showWithGravity(
				'Vui lòng nhập đầy đủ thông tin',
				ToastAndroid.SHORT,
				ToastAndroid.CENTER,
			);
		} else {
			try {
				const response = await axios.post(URL_LOGIN_POST, {
					username: userName,
					password: passWord,
				});

				if (response.data.code === 200) {

					const user = response.data.body.user;
					
					navigation.navigate('AppScreen', {
						screen: 'ChooseGateway'
					});

					await AsyncStorage.setItem('username', userName);
					await AsyncStorage.setItem('password', passWord);

					const accessToken = JSON.stringify(response.data.body.tokens.access);
					const refreshToken = JSON.stringify(
						response.data.body.tokens.refresh,
					);

					await AsyncStorage.setItem('accessToken', accessToken);
					await AsyncStorage.setItem('refreshToken', refreshToken);

					await AsyncStorage.setItem('user',JSON.stringify(user));
					dispatch(loginSuccess());
				}
			} catch (error) {
				console.log('Error', error);
				ToastAndroid.showWithGravity(
					'Sai tài khoản hoặc mật khẩu',
					ToastAndroid.SHORT,
					ToastAndroid.CENTER,
				);
			}
		}
	};

	return (
		<LinearGradient
			colors={['rgba(29, 255, 228,1)', 'rgba(148, 236, 117,1)']}
			start={{x: 0, y: 0}}
			end={{x: 0, y: 1}}
			style={styles.button}>
			<TouchableOpacity onPress={handleLogin} style={styles.backBtn}>
				<Text style={styles.textBtn}>Đăng nhập</Text>
			</TouchableOpacity>
		</LinearGradient>
	);
}

const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 293,
		height: 50,
		borderRadius: 30,
		marginVertical: 30,
	},
	backBtn: {
		width: 293,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textBtn: {
		fontFamily: 'Roboto-Bold',
		fontWeight: '400',
		color: '#fff',
		lineHeight: 16,
		textAlign: 'center',
		fontSize: 14,
	},
});
