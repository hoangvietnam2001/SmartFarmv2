import {
	StyleSheet,
	Text,
	View,
	Platform,
	KeyboardAvoidingView,
	TextInput,
	Image,
	TouchableOpacity,
	BackHandler,
	ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ButtonLogin from '../../../components/Buttons/ButtonLogin';
import ButtonForgotPassword from '../../../components/Buttons/ButtonForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import GreenHouseDB from '../../../services/Relays/GreenHouseDB';

export default function Login({navigation}: {navigation: any}) {
	const [focusedField, setFocusedField] = useState(null);
	const [userName, setUserName] = useState('');
	const [passWord, setPassWord] = useState('');
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		const setField = async () => {
			const username = await AsyncStorage.getItem('username');
			const password = await AsyncStorage.getItem('password');
			if (username && password) {
				setUserName(username);
				setPassWord(password);
			}else{
				setUserName('');
				setPassWord('');
			}
			// console.log(username, ' and --', password);
		};
		setField();
	}, []);

	// handle focus
	const handleFieldFocus = (value: any) => {
		setFocusedField(value);
	};
	// handle blur
	const handleFieldBlur = () => {
		setFocusedField(null);
	};
	// handle setUser
	const handleSetUser = (value: any) => setUserName(value);
	// handle setPassword
	const handleSetPassword = (value: any) => setPassWord(value);
	// handle visible password
	const handleVisiblePassword = () => {
		setVisible(!visible);
	};
	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={styles.body}>
				<Image
					source={require('../../../assets/logo/logorallismart.png')}
					style={styles.logo}
					resizeMode="stretch"
				/>
				<View style={styles.alltext}>
					<Text style={styles.rallip}>RALLIP</Text>
					<Text style={styles.smart}> SMART</Text>
				</View>

				<View style={styles.input}>
					<TextInput
						style={[
							styles.username,
							{
								borderBottomColor:
									focusedField === 'username'
										? 'rgba(44, 105, 141, 1)'
										: '#AEB2B8',
							},
						]}
						placeholder="Tài khoản"
						onFocus={() => handleFieldFocus('username')}
						onBlur={handleFieldFocus}
						value={userName}
						onChangeText={text => {
							// await AsyncStorage.setItem('username', text);
							// const userName = AsyncStorage.getItem('username');
							handleSetUser(text);
						}}
					/>
					<View style={styles.passRound}>
						<TextInput
							id="password"
							style={[
								styles.password,
								{
									borderBottomColor:
										focusedField === 'password'
											? 'rgba(44, 105, 141, 1)'
											: '#AEB2B8',
								},
							]}
							placeholder="Mật khẩu"
							secureTextEntry={visible ? true : false}
							onFocus={() => handleFieldFocus('password')}
							onBlur={handleFieldBlur}
							value={passWord}
							onChangeText={text => handleSetPassword(text)}
						/>
						<TouchableOpacity
							onPress={handleVisiblePassword}
							style={styles.iconRound}>
							<Ionicons
								name={visible ? 'eye-off-outline' : 'eye-outline'}
								size={24}
								color={'#000'}
								style={styles.icon}
							/>
						</TouchableOpacity>
					</View>

					{/* forgot password  */}
					<ButtonForgotPassword />
				</View>

				{/* button login  */}
				<ButtonLogin
					navigation={navigation}
					userName={userName}
					passWord={passWord}
				/>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 20,
	},
	logo: {
		marginTop: 30,
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
	input: {
		width: 293,
		marginTop: 20,
	},
	username: {
		borderBottomColor: '#AEB2B8',
		borderBottomWidth: 1,
		fontSize: 16,
	},
	passRound: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 293,
	},
	password: {
		borderBottomColor: '#AEB2B8',
		borderBottomWidth: 1,
		marginTop: 5,
		fontSize: 16,
		width: 293,
	},
	iconRound: {
		backgroundColor: 'yellow',
		alignItems: 'center',
		justifyContent: 'center',
	},
	icon: {
		position: 'absolute',
		right: 0,
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 293,
		height: 50,
		borderRadius: 30,
		marginVertical: 30,
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
