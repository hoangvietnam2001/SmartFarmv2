import {
	DrawerContentScrollView,
} from '@react-navigation/drawer';
import React, { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ToastAndroid,
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { ArrayDrawer } from './ArrayDrawer';
import { useDispatch, useSelector } from 'react-redux';
import {
	setGreenHouseId,
} from '../../redux/slices/GreenHouseSlice';
import HeaderDrawer from '../../components/Layout/HeaderDrawer';
import { setRelay } from '../../redux/slices/GreenHouseSlice';
import SensorDB from '../../services/Sensors/SensorDB';
import { setSensor } from '../../redux/slices/sensorSlice';
import RelayDB from '../../services/Relays/RelayDB';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../redux/slices/authSlice';
const Relay = new RelayDB();
const Sensor = new SensorDB();

const HandleLogOut = async () => {
	const navigation: any = useNavigation();
	try {
		navigation.reset({
			index: 0,
			routes: [{ name: 'Login' }]
		});
	}
	catch (e: any) {
		console.log(e.message);
	}

}
const CustomDrawer = (props: any) => {
	const { state, descriptors, navigation } = props;
	const GreenHouses = useSelector((state: any) => state.farm.GreenHouses);
	const dispatch = useDispatch();
	const HandleLogOut = async () => {
		try {
			await AsyncStorage.clear();
			dispatch(logout());
			navigation.navigate('Login')
		}
		catch (e: any) {
			console.log(e.message);
		}

	}
	return (
		<View style={styles.container}>
			<LinearGradient
				colors={['#99FF66', '#009999', '#2C698D']}
				style={styles.header}>
				<HeaderDrawer />
			</LinearGradient>
			{/* Thân drawer */}
			<DrawerContentScrollView>
				<View>
					{ArrayDrawer.map((route: any, index: number) => {
						let isFocused = state.routes[state.index].name === route.name;
						const color = isFocused ? '#000033' : '#2C698D';
						const [Show, setShow] = useState(false);
						const [ShowGreenHouse, setShowGreenHouse] = useState(false);
						const handleShowMenu = (route: any, index: number) => {
							if (
								ArrayDrawer.filter((item: any) => item.parentID === route.id)
									.length > 0
							) {
								setShow(!Show);
							} else {
								if (route.id === 1) {
									if (GreenHouses.length > 0) {
										setShowGreenHouse(!ShowGreenHouse);
									} else {
										ToastAndroid.show(
											'Nhà kính chưa hoạt động',
											ToastAndroid.SHORT,
										);
									}
								} else {
									navigation.navigate(route.name);
								}
							}
						};
						const handleChild = async (route: any) => {
							const a = await Relay.GetRelaysByGreenHouseId(route?.id);
							const sensors = await Sensor.GetSensorWithGreenHouseID(route?.id);
							dispatch(setRelay(a));
							dispatch(setSensor(sensors));
							dispatch(setGreenHouseId(route?.id));
							navigation.navigate(route.name);
						};
						return (
							<View key={route.id}>
								{route.parentID === 0 && (
									<TouchableOpacity
										style={[styles.item, { backgroundColor: color }]}
										onPress={() => {
											handleShowMenu(route, index); // Chuyển đến màn hình tương ứng với mục được chọn
										}}>
										<Text style={styles.itemname}>{route.name}</Text>
									</TouchableOpacity>
								)}
								{/* Hiển thị các mục con nếu có */}

								{Show &&
									ArrayDrawer.filter(
										(doc: any) => doc.parentID === route.id,
									).map((item: any, index: number) => {
										let isFocused =
											state.routes[state.index].name === item.name;
										const color = isFocused ? '#000033' : '#2C698D';
										return (
											<TouchableOpacity
												key={index}
												style={[styles.childitem, { backgroundColor: color }]}
												onPress={() => {
													handleChild(item); // Chuyển đến màn hình tương ứng với mục được chọn
												}}>
												<Text style={styles.itemchildname}>{item.name}</Text>
												{item.name === 'Thông báo' && (
													<View style={{ width: 25, right: 30 }}>
														<Icon
															name="notifications"
															color={'white'}
															size={20}
															style={{}}
														/>
														<Badge
															status="error"
															value="10"
															containerStyle={{
																position: 'absolute',
																top: -5,
																left: 10,
															}}
															textStyle={{ fontSize: 10 }}
															badgeStyle={{ width: 20, height: 15 }}
														/>
													</View>
												)}
											</TouchableOpacity>
										);
									})}
								{ShowGreenHouse &&
									GreenHouses &&
									GreenHouses.map((item: any, index: number) => {
										let isFocused =
											state.routes[state.index].name === item.name;
										const color = isFocused ? '#000033' : '#2C698D';
										return (
											<TouchableOpacity
												key={index}
												style={[styles.childitem, { backgroundColor: color }]}
												onPress={() => {
													handleChild(item); // Chuyển đến màn hình tương ứng với mục được chọn
												}}>
												<Text style={styles.itemchildname}>{item.name}</Text>
											</TouchableOpacity>
										);
									})}

							</View>
						);
					})}
				</View>
				<TouchableOpacity style={styles.item} onPress={HandleLogOut}>
					<Text style={styles.itemname}>Đăng xuất</Text>
				</TouchableOpacity>
			</DrawerContentScrollView>
		</View>
	);
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#2C698D',
	},
	header: {
		height: HEIGHT / 4.7,
		marginBottom: 20,
	},
	imageView: {
		marginLeft: 20,
		marginTop: 15,
	},
	accountimage: {
		width: 60,
		height: 60,
		borderRadius: 50,
		resizeMode: 'contain',
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	accountname: {
		marginTop: 10,
		marginLeft: 20,
		fontSize: 14,
		fontWeight: '500',
		color: 'white',
	},
	email: {
		marginLeft: 20,
		fontSize: 12,
		fontWeight: '400',
		color: 'white',
	},
	// Option
	optionView: {},
	item: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	childitem: {
		height: 40,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	itemchildname: {
		marginLeft: 30,
		color: 'white',
		fontSize: 14,
		fontWeight: '600',
	},
	itemname: {
		paddingHorizontal: 20,
		color: 'white',
		fontSize: 17,
		fontWeight: '600',
		lineHeight: 40,
	},
});

export default CustomDrawer;
