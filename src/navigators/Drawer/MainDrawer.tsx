import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import {View, Text} from 'react-native';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import {useSelector} from 'react-redux';
import DeviceScanScreen from '../../screens/app/DeviceScan/DeviceScanScreen';
import LoadingScreen from '../../screens/app/LoaddingScreen/LoadingScreen';

const Drawer = createDrawerNavigator();
const MainDrawer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const farm = useSelector((state: any) => state.farm);

	// thời gian load api ảo
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
						// đổi màu trắng cho biểu tượng
						headerTitleStyle: {
							fontSize: 16,
							color: '#FFF',
						},
						headerStyle: {backgroundColor: '#2C698D'},
						headerTitleAlign: 'center',
					}}
					drawerContent={props => <CustomDrawer {...props} />}>
					<Drawer.Screen name="THÔNG BÁO" component={Notification} />
					{farm.GreenHouses &&
						farm.GreenHouses.map((doc: any, index: number) => {
							return (
								<Drawer.Screen
									key={index}
									name={doc.name}
									component={MainTab}
									options={{
										headerRight: () => <View style={{width: 50}}></View>,
									}}
								/>
							);
						})}
					<Drawer.Screen name="TÀI KHOẢN CỦA TÔI" component={AccountScreen} />
					<Drawer.Screen name="Lập lịch" component={ScheduleScreen} />
					<Drawer.Screen name="Kịch bản" component={ScriptScreen} />
					<Drawer.Screen name="QUÉT THIẾT BỊ" component={DeviceScanScreen} />
				</Drawer.Navigator>
			)}
		</>
	);
};
export default MainDrawer;
