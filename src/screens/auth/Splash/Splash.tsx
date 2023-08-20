import {Image, Text, View, BackHandler, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({navigation}: {navigation: any}) {
	useEffect(() => {
		const checkLoginStatus = async () => {
			const getAccess = await AsyncStorage.getItem('accessToken');
			const accessToken = JSON.parse(getAccess!);
			
			if (accessToken) {
				navigation.navigate('AppScreen', {screen: 'ChooseGateway'});
			} else {
				setTimeout(
					() => navigation.navigate('AuthScreen', {screen: 'Login'}),
					2500,
				);
			}
		};
		checkLoginStatus();
	}, []);

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/logo/logorallismart.png')}
				style={styles.logo}
				resizeMode="stretch"
			/>
			<View style={styles.alltext}>
				<Text style={styles.rallip}>RALLIP</Text>
				<Text style={styles.smart}> SMART</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	logo: {
		width: 254,
		height: 254,
	},
	alltext: {
		flexDirection: 'row',
		marginTop: 10,
	},
	rallip: {
		fontSize: 30,
		fontWeight: '700',
		lineHeight: 36.31,
		textAlign: 'center',
		color: '#129f95',
	},
	smart: {
		fontSize: 30,
		fontWeight: '700',
		lineHeight: 36.31,
		textAlign: 'center',
		color: '#07C754',
	},
});
