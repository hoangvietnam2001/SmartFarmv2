import {Image, Text, View, BackHandler} from 'react-native';
import React, {useEffect} from 'react';
import Style from './Style';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {makeAuthorizedRequest} from '../../../apis/makeAuthRequest';
export default function Splash({navigation}) {
	useEffect(() => {
		const checkLoginStatus = async () => {
			const accessToken = JSON.parse(await AsyncStorage.getItem('accessToken'));
			console.log(typeof accessToken);
			if (accessToken) {
				navigation.navigate('AppScreen', {screen: 'ChooseGateway'});
			} else {
				setTimeout(
					() => navigation.navigate('AuthScreen', {screen: 'Login'}),
					3000,
				);
			}
		};
		checkLoginStatus();
	}, []);

	// const getData = async () => {
	// 	try {
	// 		const response = await makeAuthorizedRequest('users','GET');
	// 		console.log(response);
	// 	} catch (error) {
	// 		console.error('Lỗi khi gửi yêu cầu:', error);
	// 	}
	// };
	// getData();

	return (
		<View style={Style.container}>
			<Image
				source={require('../../../assets/logo/logorallismart.png')}
				style={Style.logo}
				resizeMode="stretch"
			/>
			<View style={Style.alltext}>
				<Text style={Style.rallip}>RALLIP</Text>
				<Text style={Style.smart}> SMART</Text>
			</View>
		</View>
	);
}
