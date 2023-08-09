import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WIDTH} from '../../../constants/Size';

export default function ChooseGateway({navigation}: {navigation: any}) {
	const [check, setCheck] = useState(false);

	const handleLoginOtherAccount = async () => {
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('refreshToken');
		await AsyncStorage.removeItem('username');
		await AsyncStorage.removeItem('password');
		navigation.navigate('AuthScreen', {screen: 'Login'});
	};

	// handle check
	const handleCheck = (id: number) => {
		if (id) {
			setCheck(!check);
		}
	};

	const data = [
		{
			id: 1,
			name: 'Gateway trồng Sâm',
			status: false,
		},
		{
			id: 2,
			name: 'Gateway trồng Dưa',
			status: false,
		},
		{
			id: 3,
			name: 'Gateway trồng Cà phê',
			status: false,
		},
	];
	const Item = ({item}: {item: any}) => {
	
		return (
			<View style={styles.item}>
				<Text style={styles.itemName}>{item.name}</Text>
				<TouchableOpacity onPress={() => handleCheck(item.id)}>
					<Icon
						name={check ? 'check-circle' : 'circle-thin'}
						size={18}
						color={'#005A6F'}
						style={styles.itemIcon}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={'rgba(44, 105, 141, 1)'}
			/>
			<Text style={styles.title}>Chọn Gateway sử dụng</Text>

			{/* List gateway  */}
			<View style={styles.bgFlatlist}>
				<FlatList
					style={styles.flatlist}
					data={data}
					renderItem={({item}) => {
						return <Item item={item} />;
					}}
					keyExtractor={item => item.id.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<TouchableOpacity
				style={styles.bgButton}
				onPress={() => navigation.navigate('MainDrawer')}>
				<LinearGradient
					style={styles.button}
					colors={['#07BD89', '#006E8C', '#002E32']}
					start={{x: 0, y: 0}}
					end={{x: 1, y: 0}}>
					<Text style={styles.textButton}>Tiếp tục</Text>
				</LinearGradient>
			</TouchableOpacity>

			<TouchableOpacity onPress={handleLoginOtherAccount}>
				<Text style={styles.loginOther}>Đăng nhập bằng tài khoản khác</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		marginTop: 37,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
		marginBottom: 12,
	},
	bgFlatlist: {
		height: 400,
	},
	flatlist: {
		width: WIDTH - 46,
	},
	item: {
		height: 76,
		marginTop: 20,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#000',
		alignItems: 'center',
	},
	itemName: {
		marginHorizontal: 12,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
	},
	itemIcon: {
		marginHorizontal: 12,
	},
	bgButton: {
		width: WIDTH - 46,
		marginTop: 20,
	},
	button: {
		height: 44,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	textButton: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 20.83,
		textAlign: 'center',
	},
	loginOther: {
		paddingVertical: 15,
		color: '#005A6F',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 18.23,
	},
});
