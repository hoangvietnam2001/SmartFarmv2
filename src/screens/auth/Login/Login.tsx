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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Style} from './Style';
import {LinearGradient} from 'react-native-linear-gradient';

export default function Login({navigation}: {navigation: any}) {
	const [focusedField, setFocusedField] = useState(null);

	// back handle
	// useEffect(() => {
	// 	const backAction = () => {
	// 		BackHandler.exitApp();
	// 		return false;
	// 	};
	// 	const backHandler = BackHandler.addEventListener(
	// 		'hardwareBackPress',
	// 		backAction,
	// 	);

	// 	return () => backHandler.remove();
	// }, []);
	// handle focus
	const handleFieldFocus = (value: any) => {
		setFocusedField(value);
	};
	// handle blur
	const handleFieldBlur = () => {
		setFocusedField(null);
	};

	return (
		<KeyboardAvoidingView
			style={Style.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<View style={Style.body}>
				<Image
					source={require('../../../assets/logo/logoralismart.jpg')}
					style={Style.logo}
					resizeMode="stretch"
				/>
				<View style={Style.alltext}>
					<Text style={Style.rallip}>RALLIP</Text>
					<Text style={Style.smart}> SMART</Text>
				</View>

				<View style={Style.input}>
					<TextInput
						style={[
							Style.email,
							{
								borderBottomColor:
									focusedField === 'email'
										? 'rgba(44, 105, 141, 1)'
										: '#AEB2B8',
							},
						]}
						placeholder="Email"
						onFocus={() => handleFieldFocus('email')}
						onBlur={handleFieldFocus}
					/>
					<TextInput
						id="password"
						style={[
							Style.password,
							{
								borderBottomColor:
									focusedField === 'password'
										? 'rgba(44, 105, 141, 1)'
										: '#AEB2B8',
							},
						]}
						placeholder="Mật khẩu"
						secureTextEntry
						onFocus={() => handleFieldFocus('password')}
						onBlur={handleFieldBlur}
					/>

					<TouchableOpacity style={[Style.forgot, {alignSelf: 'flex-end'}]}>
						<Text style={Style.textForgot}>Quên mật khẩu ?</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity onPress={() => navigation.navigate('ChooseGateway')}>
					<LinearGradient
						colors={['rgba(29, 255, 228,1)', 'rgba(148, 236, 117,1)']}
						start={{x: 0, y: 0}}
						end={{x: 0, y: 1}}
						style={Style.button}>
						<Text style={Style.textBtn}>Đăng nhập</Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}
