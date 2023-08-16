import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MainTab from '../Tab/MainTab';
import Notification from '../../screens/app/Notification/Notification';
import CustomDrawer from './CustomDrawer';
import AccountScreen from '../../screens/app/MyAccount/AccountScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {View, Text, TouchableOpacity} from 'react-native';
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScriptScreen from '../../screens/app/Setting/ScriptScreen';
import GreenHouseDB from '../../services/Relays/GreenHouseDB';
import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import { HEIGHT } from '../../constants/Size';
const GreenHouse = new GreenHouseDB();

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const MainDrawer = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState();
	const [arr, setArr]: any = useState([]);

	useEffect(() => {
		async function GetGreenHouse() {
			try {
				const a = await GreenHouse.GetGreenhouseByFarmId(
					'63a3d99dc69cef7476812bea',
				);
				setArr(a);
				// setIsLoading(false);
			} catch (error: any) {
				console.log('Have error :', error);
				// setIsLoading(false);
				setError(error);
			}
		}
		GetGreenHouse();
	}, []);

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
					name={'search'}
					color="#000"
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
						// đổi màu trắng cho biểu tượng
						headerTitleStyle: {
							fontSize: 16,
							color: '#FFF',
						},
						headerStyle: {backgroundColor: '#2C698D'},
					}}
					drawerContent={props => <CustomDrawer {...props} />}>
					<Drawer.Screen name="THÔNG BÁO" component={Notification} />
					<Drawer.Screen name="TÀI KHOẢN CỦA TÔI" component={AccountScreen} />
					<Drawer.Screen name="Lập lịch" component={ScheduleScreen} />
					<Drawer.Screen name="Kịch bản" component={ScriptScreen} />
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
		backgroundColor:'#fff'
	},
	spinner:{
		backgroundColor:'#fff'
	},
	iconLoading: {
		position: 'absolute',
		opacity: 0.8,
		// alignSelf:'center',
	},
	textLoading: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 20,
		letterSpacing: 0.5,
		lineHeight: 28.4,
		color: '#13313D',
		position: 'absolute',
		bottom:HEIGHT-522
	},
});
