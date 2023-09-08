import React, {useEffect, useState} from 'react';
import {
	Text,
	View,
	StyleSheet,
	Image,
	TextInput,
	TouchableOpacity,
	ToastAndroid,
} from 'react-native';
import {WIDTH} from '../../../constants/Size';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserDB from '../../../services/User/UserDB';
import { setNameUser } from '../../../redux/slices/nameSlice';
import { useDispatch } from 'react-redux';
const userDB = new UserDB();
type User = {
	[x: string]: any;
	name: string;
	username: string;
	role: number;
};
const AccountScreen = () => {
	const [user, setUser] = useState<User>({name: '', username: '', role: -1});
	const [onHover, setOnHover] = useState(false);
	const [name, setName] = useState<any>('');
	const dispatch = useDispatch();

	useEffect(() => {
		const getUser = async () => {
			try {
				const data: any = (await AsyncStorage.getItem('user')) || {};
				const user = JSON.parse(data);
				setUser(user);
				setName(user.name);
			} catch (error) {
				console.log('Get user failed with :', error);
			}
		};
		getUser();
	}, []);

	// hiện quyền người dùng
	const getRoleText = () => {
		if (user.role === 1) {
			return 'Người dùng';
		} else if (user.role === 0) {
			return 'Người quản trị';
		} else {
			return 'Không xác định';
		}
	};
	// cập nhật lại người dùng
	const handleUpdateUser = async () => {
		if (name === '') {
			ToastAndroid.showWithGravity(
				'Vui lòng nhập thông tin',
				ToastAndroid.CENTER,
				ToastAndroid.SHORT,
			);
		} else {
			const userData = {
				username: 'user1234',
				password: 'User@123',
				name: name,
				role: user.role,
			};

			try {
				const response = await userDB.UpdateUser(user.id, userData);
				if (response.code === 200) {
					console.log('Cập nhật thành công', response);
					setOnHover(false);
					dispatch(setNameUser(name));
					console.log(name);
					
					await AsyncStorage.setItem('user', JSON.stringify(response.body));
				} else {
					console.log('Cập nhật thất bại');
				}
			} catch (error) {
				console.error('Lỗi khi cập nhật:', error);
			}
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={require('../../../assets/logo/logorallismart.png')}
				resizeMode={'stretch'}
				style={styles.avatar}
			/>
			<View style={styles.roundtext}>
				<Text style={styles.title}>Tên người dùng :</Text>
				{onHover ? (
					<>
						<TextInput
							style={styles.inputValue}
							value={name}
							onChangeText={text => setName(text)}
							autoFocus
						/>
						<TouchableOpacity
							onPress={handleUpdateUser}
							style={styles.iconSave}>
							<Icon name="edit" color={'#000'} size={24} />
						</TouchableOpacity>
					</>
				) : (
					<Text
						style={styles.value}
						onPress={() => setOnHover(true)}
						numberOfLines={1}>
						{name}
					</Text>
				)}
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
		marginHorizontal: 8,
	},
	value: {
		fontSize: 18,
		fontFamily: 'Roboto-Regular',
		width: 150,
	},
	inputValue: {
		fontSize: 18,
		fontFamily: 'Roboto-Regular',
		width: 150,
	},
	iconSave: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
		position: 'absolute',
		right: 10,
	},
});
export default AccountScreen;
