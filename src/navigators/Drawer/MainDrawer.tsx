import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import GreenHouseDB from '../../services/Relays/GreenHouseDB';

const GreenHouse = new GreenHouseDB();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MainDrawer = () => {
	const [arr, setArr]: any = useState([]);
	useEffect(() => {
		async function GetGreenHouse() {
			const a = await GreenHouse.GetGreenhouseByFarmId(
				'63a3d99dc69cef7476812bea',
			);
			setArr(a);
		}
		GetGreenHouse();
	}, []);
	return (
		<Drawer.Navigator
			screenOptions={{
				// đổi màu trắng cho biểu tượng
				headerTitleStyle: {
					fontSize: 16,
					color: '#FFF',
				},
				headerStyle: {backgroundColor: '#2C698D'},
			}}
			drawerContent={props => <CustomDrawer {...props} />}>
			<Drawer.Screen name="THÔNG BÁO" component={Notification} />
			{/* {arr.map((doc: any, index: number) => {
				return (
					<Drawer.Screen key={index} name={doc.name} component={MainTab} />
				);
			})} */}
			<Drawer.Screen name="TÀI KHOẢN CỦA TÔI" component={AccountScreen} />
			<Drawer.Screen name="Lập lịch" component={ScheduleScreen} />
			<Drawer.Screen name="Kịch bản" component={ScriptScreen} />
		</Drawer.Navigator>
	);
};

export default MainDrawer;
