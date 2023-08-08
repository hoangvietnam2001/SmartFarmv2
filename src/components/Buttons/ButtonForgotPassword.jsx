import {StyleSheet, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
// import {Style} from '../../screens/auth/Login/Style';
export default function ButtonForgotPassword() {
	const handleShowToast = () => {
		ToastAndroid.showWithGravity(
			'Vui lòng liên hệ với nhà cung cấp để cấp lại mật khẩu',
			ToastAndroid.SHORT,
			ToastAndroid.CENTER
		);
	};

	return (
		<TouchableOpacity
			onPress={handleShowToast}
			style={[styles.forgot, {alignSelf: 'flex-end'}]}>
			<Text style={styles.textForgot}>Quên mật khẩu ?</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	forgot: {
		width: 110,
		marginTop: 15,
	},
	textForgot: {
		fontFamily: 'Roboto-Regular',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 18,
		color: '#2c698d',
		textAlign: 'right',
	},
});
