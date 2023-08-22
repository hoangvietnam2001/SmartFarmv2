import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import GreenHouseInfo from '../../screens/app/GreenHouse/InfoScreen';
import GreenHouseDevice from '../../screens/app/GreenHouse/DeviceScreen';
import SensorScreen from '../../screens/app/Sensor/SensorScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainTab = ({navigation}: {navigation: any}) => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarIcon: () => null,
				tabBarLabelStyle: {
					// marginVertical: 15,
					marginBottom: 15,
				},
			}}>
			<Tab.Screen
				name="Thông tin"
				component={GreenHouseInfo}
				options={{
					tabBarLabel: 'Thông tin',
				}}
			/>
			<Tab.Screen
				name="Device"
				component={GreenHouseDevice}
				options={{
					tabBarLabel: 'Thiết bị',
				}}
			/>
			<Tab.Screen
				name="Sensor"
				component={SensorScreen}
				options={{
					tabBarLabel: 'Cảm biến',
				}}
			/>
		</Tab.Navigator>
	);
};
export default MainTab;
