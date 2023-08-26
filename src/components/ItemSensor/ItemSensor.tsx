import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import moment from 'moment';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ItemSensor({item}: {item: any}) {
	const sensors = useSelector((state: any) => state.sensor.Sensors);
	const [sensor, setSensor] = useState(sensors);
	const [showModal, setShowModal] = useState(false);
	useEffect(() => {
		setSensor(sensors);
	}, [sensors]);

	const formattedDate = moment(sensor.updatedAt)
		.format('DD/MM/YYYY, HH:mm:ss A')
		.replace('AM', 'sáng')
		.replace('PM', 'chiều');
	// khai bao cac bien su dung trong item
	let status = '';
	let unit = '';
	let uri = '';

	if (item.type === 0 || item.type === 1 || item.type === 2) {
		unit = '%';
		uri = 'http://112.137.129.232:3700/static/icons/water.png';
	} else if (item.type === 3) {
		unit = 'lux';
		uri = 'http://112.137.129.232:3700/static/icons/sun.png';
	} else if (item.type == 4) {
		unit = 'ppm';
		uri =
			'http://112.137.129.232:3700/static/icons/64/icon%20TT22%20%2818%29.png';
	} else if (item.type == 5 || item.type == 7 || item.type == 8) {
		unit = 'độ C';
		uri = 'http://112.137.129.232:3700/static/icons/temp.png';
	} else if (item.type === 12) {
		unit = 'ppm';
		uri =
			'http://112.137.129.232:3700/static/icons/64/icon%20TT22%20%2817%29.png';
	}

	if (item.active) {
		status = 'bật';
	} else {
		status = 'tắt';
	}

	return (
		<View style={styles.itemRound}>
			<View style={styles.left}>
				<View style={styles.nameRound}>
					<Text style={styles.name}>{item.name}</Text>
					<TouchableOpacity onPress={() => setShowModal(true)}>
						<Icon name="edit" color={'#000'} size={20} />
					</TouchableOpacity>
				</View>
				<Text style={styles.time}>{formattedDate}</Text>
				<Text style={styles.status}>
					Trạng thái:{' '}
					<Text style={[styles.active, {color: item.active ? 'green' : 'red'}]}>
						{status}
					</Text>
				</Text>
				<Text style={styles.time}>
					Cập nhật sau: <Text>{item.timeUpdate} phút</Text>{' '}
				</Text>
				<View style={styles.wrapValue}>
					<Text style={styles.value}>{item.curValue}</Text>
					<Text style={styles.unit}>{unit}</Text>
				</View>
			</View>
			<View style={styles.right}>
				<View style={styles.batteryRound}>
					<Text style={styles.percent}>{item.battery}% </Text>
					<Icon name="battery-full" color={'green'} size={22} />
				</View>
				<Image
					source={{
						uri: uri,
					}}
					style={styles.img}
					resizeMode="stretch"
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	itemRound: {
		flex: 1,
		flexDirection: 'row',
		paddingHorizontal: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		paddingBottom: 20,
		marginTop: 15,
	},
	left: {
		flex: 7,
	},
	nameRound: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
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
