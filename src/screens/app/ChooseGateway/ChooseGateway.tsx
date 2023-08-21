import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	SafeAreaView,
	FlatList,
	TouchableOpacity,
	Alert,
} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WIDTH} from '../../../constants/Size';
import ItemChooseGateway from '../../../components/ItemChooseGateway/ItemChooseGateway';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../../redux/slices/authSlice';
import axios from 'axios';
import {URL_GET_GATEWAY} from '../../../utils/config';
import ModalChooseGateway from '../../../components/Modals/ModalChooseGateway';
import ButtonContinue from '../../../components/Buttons/ButtonContinue';

export default function ChooseGateway({
	navigation,
}: {
	navigation: any;
	route: any;
}) {
	const [farmList, setFarmList] = useState([]);
	const [allGateWay, setAllGateWay] = useState([]);
	const [selectedItemId, setSelectedItemId] = useState(null);

	const dispatch = useDispatch();
	const isAuthenticated = useSelector(
		(state: any) => state.user.isAuthenticated,
	);

	// lấy ra danh sách id farmList
	useEffect(() => {
		const getFarmList = async () => {
			const user = await AsyncStorage.getItem('user');
			if (user) {
				const farmList = JSON.parse(user).farmList;
				setFarmList(farmList);
			}
		};
		getFarmList();
	}, [isAuthenticated]);

	// lấy ra thong tin đầy đủ của gateway
	useEffect(() => {
		const getFullFarmInfo = async () => {
			try {
				const response = await axios.get(URL_GET_GATEWAY);
				setAllGateWay(response.data.msg);
			} catch (error) {
				console.log('Get gateway error ', error);
			}
		};
		getFullFarmInfo();
	}, []);

	// danh sach gateway chỉ gồm ID và tên gateway
	const gateWays = useMemo(() => {
		if (farmList && allGateWay) {
			return farmList.map((idFarm: any) => {
				const gateWay: any = allGateWay.find(
					(item: any) => item._id === idFarm.ID,
				);
				return gateWay ? {ID: gateWay._id, name: gateWay.name} : [];
			});
		} else {
			return [];
		}
	}, [farmList, allGateWay]);

	// handleCheck
	const handleCheck = (itemId: any) => {
		setSelectedItemId(itemId === selectedItemId ? null : itemId);
	};

	// handleLoginOtherAccount
	const handleLoginOtherAccount = async () => {
		await AsyncStorage.removeItem('accessToken');
		await AsyncStorage.removeItem('refreshToken');
		await AsyncStorage.removeItem('user');
		// await AsyncStorage.removeItem('username');
		// await AsyncStorage.removeItem('password');
		dispatch(logout());
		navigation.navigate('AuthScreen', {screen: 'Login'});
	};

	// handle modal
	const [showAlert, setShowAlert] = useState(false);
	const handleShowAlert = () => {
		//không chọn gateway nào sẽ hiện alert
		setShowAlert(true);
	};
	const handleCloseAlert = () => {
		// button close modal
		setShowAlert(false);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				barStyle={'light-content'}
				backgroundColor={'rgba(44, 105, 141, 1)'}
			/>

			{/* Hiện modal khi chưa chọn gateway*/}
			<ModalChooseGateway
				visible={showAlert}
				message="Bạn cần chọn Gateway để sử dụng"
				onClose={handleCloseAlert}
			/>
			<Text style={styles.title}>Chọn Gateway sử dụng</Text>

			{/* List gateway  */}
			<View style={styles.bgFlatlist}>
				<FlatList
					style={styles.flatlist}
					data={gateWays}
					renderItem={({item}) => {
						return (
							<ItemChooseGateway
								item={item}
								handleCheck={handleCheck}
								selectedItem={selectedItemId}
							/>
						);
					}}
					keyExtractor={(item: any, index) => index.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			{/* button continue  */}
			<ButtonContinue
				navigation={navigation}
				selectedItemId={selectedItemId}
				handleShowAlert={handleShowAlert}
			/>

			<TouchableOpacity
				onPress={() => {
					handleLoginOtherAccount();
				}}>
				<Text style={styles.loginOther}>Đăng nhập bằng tài khoản khác</Text>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor:'#fff'
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
		backgroundColor:'#fff'
	},
	flatlist: {
		width: WIDTH - 46,
	},
	loginOther: {
		paddingVertical: 15,
		color: '#005A6F',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 18.23,
	},
});
