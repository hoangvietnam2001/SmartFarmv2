import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {WIDTH, HEIGHT} from '../../constants/Size';
import SensorDB from '../../services/Sensors/SensorDB';
import {ToastAndroid} from 'react-native';
const sensorDB = new SensorDB();
export default function ModalUpdateSensor({
	setShowModal,
	item,
}: {
	setShowModal: any;
	item: any;
}) {
	const initName: string = item.name;
	const initTime: number = item.timeUpdate;
	const initSensorId: string = item.id;
	const [name, setName] = useState(initName);
	const [time, setTime] = useState(initTime.toString());
	const [sensorId, setSensorId] = useState(initSensorId);
	const [data, setData] = useState({name: name, timeUpdate: parseInt(time)});

	const handleUpdate = async () => {
		if (name === '' || Number.isNaN(time)) {
			ToastAndroid.show('Nhập đầy đủ thông tin', ToastAndroid.CENTER);
		} else {
			try {
				setData({name: name, timeUpdate: parseInt(time)});
				const response = await sensorDB.UpdateSensor(sensorId, data);
				if (response) {
					if (response.code === 200) {
						ToastAndroid.show('Cập nhật thành công', ToastAndroid.CENTER);
						setName('');
						setTime('');
						setShowModal(false);
					} else {
						ToastAndroid.show('Cập nhật không thành công', ToastAndroid.CENTER);
					}
				} else {
					ToastAndroid.show('Cập nhật không thành công', ToastAndroid.CENTER);
				}
			} catch (error) {
				console.log('Cập nhật lỗi :', error);
			}
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.wrap}>
				<Text style={styles.title}>Cập nhật cảm biến</Text>
				<View style={styles.body}>
					<View style={styles.wrapInput}>
						<Text style={styles.textBody}>Tên cảm biến {'         '}:</Text>
						<TextInput
							inputMode="text"
							placeholder="Tên"
							style={styles.inputText}
							value={name}
							onChangeText={text => setName(text)}
						/>
					</View>
					<View style={styles.wrapInput}>
						<Text style={styles.textBody}>Thời gian cập nhật :</Text>
						<TextInput
							inputMode="numeric"
							placeholder="Thời gian"
							style={styles.inputText}
							value={time ? time.toString() : ''}
							onChangeText={text => setTime(text)}
						/>
						<Text style={{color: '#000', fontWeight: '600', fontSize: 16}}>
							phút
						</Text>
					</View>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity style={styles.btn} onPress={handleUpdate}>
						<Text style={styles.textBtn}>Cập nhật</Text>
					</TouchableOpacity>
					<Text style={{borderLeftWidth: 0.3, borderLeftColor: '#000'}}></Text>
					<TouchableOpacity
						style={styles.btn}
						onPress={() => {
							setShowModal(false);
						}}>
						<Text style={styles.textBtn}>Đóng</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	wrap: {
		width: WIDTH - 32,
		height: 350,
		marginVertical: 32,
		alignItems: 'center',
		backgroundColor: '#fff',
		alignSelf: 'center',
		borderRadius: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		color: '#000',
		marginTop: 24,
	},
	body: {
		marginTop: 12,
		backgroundColor: '#fff',
		width: WIDTH - 48,
		height: 200,
		justifyContent: 'center',
	},
	wrapInput: {
		flexDirection: 'row',
		height: 'auto',
		alignItems: 'center',
	},
	textBody: {
		fontFamily: 'Roboto-Bold',
		fontWeight: '400',
		color: '#000',
		lineHeight: 32,
		fontSize: 16,
		marginLeft: 10,
		marginVertical: 15,
		backgroundColor: '#fff',
	},
	inputText: {
		fontSize: 16,
		backgroundColor: '#fff',
		lineHeight: 22,
		width: 120,
	},
	footer: {
		position: 'absolute',
		flexDirection: 'row',
		justifyContent: 'space-between',
		bottom: 0,
		width: '100%',
	},
	btn: {
		borderTopWidth: 0.2,
		width: (WIDTH - 32) / 2,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textBtn: {
		fontFamily: 'Roboto-Bold',
		fontWeight: '400',
		color: '#000',
		lineHeight: 16,
		textAlign: 'center',
		fontSize: 14,
	},
});
