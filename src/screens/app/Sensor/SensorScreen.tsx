import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import ItemSensor from '../../../components/ItemSensor/ItemSensor';
import HeaderLayout from '../../../components/Layout/HeaderLayout';

export default function SensorScreen() {
	const sensors = useSelector((state: any) => state.sensor.Sensors);
	const [sensor, setSensor] = useState(sensors);
	const handleModalAdd=()=>{
		console.log('Đang thêm');
	}
	return (
		<SafeAreaView style={styles.container}>
			<HeaderLayout
				headerTitle="Cảm biến"
				headerRight={{
					icon: 'add-box',
					size: 30,
					color: '#FFF',
					onPress: handleModalAdd,
				}}
			/>
			<View style={styles.content}>
				{sensor.length === 0 ? (
					<>
						<Text style={styles.error}>Không tìm thấy cảm biến nào</Text>
					</>
				) : (
					<>
						<FlatList
							style={styles.flatlist}
							data={sensor}
							renderItem={({item}) => {
								return <ItemSensor item={item} />;
							}}
							keyExtractor={item => item.id}
						/>
					</>
				)}
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	error: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 24,
		textAlign: 'center',
	},
	flatlist: {},
	content: {
		justifyContent: 'center',
	},
	itemRound: {
		flex: 1,
		flexDirection: 'row',
		// marginVertical: 15,
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		paddingBottom: 20,
		marginTop: 15,
	},
	left: {
		flex: 7,
	},
	name: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 20,
		lineHeight: 28.4,
		letterSpacing: 0.5,
		color: '#13313D',
	},
	time: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 22.72,
		letterSpacing: 0.5,
		color: '#000',
	},
	status: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '400',
		fontSize: 16,
		lineHeight: 22.72,
		letterSpacing: 0.5,
		color: '#000',
	},
	active: {
		marginHorizontal: 10,
		fontWeight: '700',
		fontFamily: 'Roboto-Regular',
		borderRadius: 5,
		color: 'green',
	},
	wrapValue: {
		flexDirection: 'row',
		backgroundColor: '#fff',
	},
	value: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 24,
		lineHeight: 34.08,
		letterSpacing: 0.5,
		color: '#000',
	},
	unit: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 18,
		lineHeight: 25.56,
		letterSpacing: 0.5,
		color: '#000',
		marginLeft: 8,
	},

	right: {
		flex: 3,
		alignItems: 'center',
	},
	batteryRound: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 4,
	},
	img: {
		width: 50,
		height: 50,
		marginTop: 16,
	},
	percent: {
		paddingHorizontal: 5,
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 16,
		lineHeight: 22.72,
		letterSpacing: 0.5,
		textAlign: 'center',
	},
});
