import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceScanScreen from '../../screens/app/DeviceScan/DeviceScanScreen';
import LoadingScreen from '../../screens/app/LoaddingScreen/LoadingScreen';
import ScheduleStack from '../Stack/ScheduleStack';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [refreshToken, setToken] = useState('');
	const farm = useSelector((state: any) => state.farm);
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
						headerShown:false
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
								/>
							);
						})}
					<Drawer.Screen name="Thông báo" component={Notification} />
					<Drawer.Screen name="Tài khoản của tôi" component={AccountScreen} />
					<Drawer.Screen name="Lập lịch" component={ScheduleStack} options={{headerShown:false}}/>
					<Drawer.Screen name="Kịch bản" component={ScriptScreen} options={{headerShown:false}}/>
					<Drawer.Screen name="Cập nhật" component={ScriptScreen} />
					<Drawer.Screen name="Quét thiết bị" component={DeviceScanScreen} />
				</Drawer.Navigator>
			)}
		</>
	);
};

export default MainDrawer;
