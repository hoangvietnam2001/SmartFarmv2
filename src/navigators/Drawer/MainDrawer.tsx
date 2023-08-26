import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import { TouchableOpacity } from 'react-native';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setImage, setModalAdd, setNameDevice, setPin, setType } from '../../redux/slices/GreenHouseSlice';
import DeviceScanScreen from '../../screens/app/DeviceScan/DeviceScanScreen';
import LoadingScreen from '../../screens/app/LoaddingScreen/LoadingScreen';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [refreshToken, setToken] = useState('');
	const farm = useSelector((state: any) => state.farm);
	const dispatch = useDispatch();
	const handleModalAdd = () => {
		dispatch(setNameDevice(''))
		dispatch(setImage(''));
		dispatch(setPin(-1))
		dispatch(setType({}))
		dispatch(setModalAdd({ status: true, type: 0 }));
	}
	useEffect(() => {
		async function GetToken() {
			const refresh: any = await AsyncStorage.getItem('user');
			setToken(JSON.parse(refresh).refreshToken);
		}
		GetToken();
	}, [])
	setTimeout(() => {
		setIsLoading(false);
	}, 2000);

	return (
		<>
			{isLoading ? (
				<LoadingScreen title="Tải dữ liệu của Gateway" />
			) : (
				<Drawer.Navigator
					screenOptions={{
						headerTitleStyle: {
							fontSize: 16,
							color: '#FFF',
						},
						headerStyle: { backgroundColor: '#2C698D' },
						headerTitleAlign: 'center',
					}}
					drawerContent={props => <CustomDrawer {...props} />}>
					{farm.GreenHouses &&
						farm.GreenHouses.map((doc: any, index: number) => {
							return (
								<Drawer.Screen
									key={index}
									name={doc.name}
									component={MainTab}
									initialParams={{ GreenHouse: doc }}
									options={{
										headerRight: () => (
											<TouchableOpacity
												style={{ width: 50 }}
												onPress={handleModalAdd}>
												<Icon
													name="add-box"
													type=""
													size={24}
													color={'white'}
												/>
											</TouchableOpacity>
										),
									}}
								/>
							);
						})}
					<Drawer.Screen name="Thông báo" component={Notification} />
					<Drawer.Screen name="Tài khoản của tôi" component={AccountScreen} />
					<Drawer.Screen name="Lập lịch" component={ScheduleScreen} />
					<Drawer.Screen name="Kịch bản" component={ScriptScreen} />
					<Drawer.Screen name="Cập nhật" component={ScriptScreen} />
					<Drawer.Screen name="Quét thiết bị" component={DeviceScanScreen} />
				</Drawer.Navigator>
			)}
		</>
	);
};

export default MainDrawer;
