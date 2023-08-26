import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {WIDTH} from '../../../constants/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';
type User = {
	name: string;
	username: string;
	role: number;
};
const AccountScreen = () => {
	const [user, setUser] = useState<User>({name: '', username: '', role: -1});
	useEffect(() => {
		const getUser = async () => {
			try {
				const data: any = (await AsyncStorage.getItem('user')) || {};
				const user = JSON.parse(data);
				setUser(user);
			} catch (error) {
				console.log('Get user failed with :', error);
			}
		};
		getUser();
	}, []);

	const getRoleText = () => {
		if (user.role === 1) {
			return 'Người dùng';
		} else if (user.role === 0) {
			return 'Người quản trị';
		} else {
			return 'Không xác định';
		}
	};

	console.log('User:', user);

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/logo/logorallismart.png')}
				resizeMode={'stretch'}
				style={styles.avatar}
			/>
			<View style={styles.roundtext}>
				<Text style={styles.title}>Tên người dùng :</Text>
				<Text style={styles.value}>{user.name}</Text>
			</View>
			<View style={styles.roundtext}>
				<Text style={styles.title}>Tên đăng nhập :</Text>
				<Text style={styles.value}>{user.username}</Text>
			</View>
			<View style={styles.roundtext}>
				<Text style={styles.title}>Loại tài khoản :</Text>
				<Text style={styles.value}>{getRoleText()}</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 100,
		marginTop: 64,
		borderWidth: 1,
		borderColor: '#2C698D',
	},
	roundtext: {
		flexDirection: 'row',
		width: WIDTH - 24,
		borderWidth: 1,
		borderColor: '#2C698D',
		borderRadius: 12,
		marginTop: 36,
		height: 64,
		alignItems: 'center',
	},
	title: {
		fontSize: 18,
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		marginHorizontal: 12,
	},
	value: {
		fontSize: 18,
		fontFamily: 'Roboto-Regular',
	},
});
export default AccountScreen;
