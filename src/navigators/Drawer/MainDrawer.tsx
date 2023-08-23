import React, { useEffect, useState } from 'react';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import Spinner from 'react-native-spinkit';
import { StyleSheet } from 'react-native';
import { HEIGHT } from '../../constants/Size';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAddDevice from '../../components/Modals/ModalAddDevice';
import { setModalAdd } from '../../redux/slices/GreenHouseSlice';



const Drawer = createDrawerNavigator();
const MainDrawer = ({navigation}:{navigation: any}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [visible, setVisible] = useState(true);
	const [refreshToken, setToken] = useState('');
	const farm = useSelector((state: any) => state.farm)
	const dispatch = useDispatch();
	const handleModalAdd = () =>{
		dispatch(setModalAdd(true));
	}
	useEffect(() => {
		async function GetToken() {
			const refresh: any = await AsyncStorage.getItem('user');
			setToken(JSON.parse(refresh).refreshToken);
		}
		GetToken();
	}, [])
	// thời gian load api ảo
	setTimeout(() => {
		setIsLoading(false);
	}, 3000);

	const getLoading = () => {
		return (
			<View style={styles.loadingView}>
				<Spinner
					isVisible={true}
					size={204}
					type={'Circle'}
					color={'#4F4A4A'}
					style={styles.spinner}></Spinner>
				<Icon
					name='search'
					type='ionicon'
					size={87}
					style={styles.iconLoading}
				/>

				<Text style={styles.textLoading}>Tải dữ liệu của Gateway</Text>
			</View>
		);
	};

	return (
		<>
			{isLoading ? (
				getLoading()
			) : (
				<Drawer.Navigator
					screenOptions={{
						headerTitleStyle: {
							fontSize: 16,
							color: '#FFF',
						},
						headerStyle: { backgroundColor: '#2C698D' },

					}}
					drawerContent={props => <CustomDrawer {...props} />}>

					{farm.GreenHouses &&
						farm.GreenHouses.map((doc: any, index: number) => {
							return (
								<Drawer.Screen
									key={index}
									name={doc.name}
									component={MainTab}
									initialParams={{GreenHouse: doc}}
									options={{
										headerRight: () => (
											<TouchableOpacity style={{ width: 50 }} onPress={handleModalAdd}>
												<Icon
													name='add-box'
													type=''
													size={24}
													color={'white'}
												/>
											</TouchableOpacity>
										),
									}}
								/>
							);
						})
					}
					<Drawer.Screen name="THÔNG BÁO" component={Notification} />
					<Drawer.Screen name="TÀI KHOẢN CỦA TÔI" component={AccountScreen} />
					<Drawer.Screen name="Lập lịch" component={ScheduleScreen} />
					<Drawer.Screen name="Quyét cảm biến" component={ScriptScreen}/>
					<Drawer.Screen name="Kịch bản" component={ScriptScreen} />
					<Drawer.Screen name='CẬP NHẬT' component={ScriptScreen} />
					<Drawer.Screen name='Đăng xuất' component={ScriptScreen} />
					
				</Drawer.Navigator>
			)}
		</>
	);
};
export default MainDrawer;

const styles = StyleSheet.create({
	loadingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	spinner: {
		position: 'absolute',
		backgroundColor: '#fff',
	},
	iconLoading: {
		opacity: 0.8,
	},
	textLoading: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 20,
		letterSpacing: 0.5,
		lineHeight: 28.4,
		color: '#13313D',
		position: 'absolute',
		bottom: HEIGHT - 522
	},
});
