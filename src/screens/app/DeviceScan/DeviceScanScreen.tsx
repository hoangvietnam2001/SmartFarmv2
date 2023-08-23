import {StyleSheet, Text, TouchableOpacity, View, Modal} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import DeviceScanDB from '../../../services/DeviceScan/DeviceScanDB';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LoadingScreen from '../LoaddingScreen/LoadingScreen';
const DeviceScan = new DeviceScanDB();
export default function DeviceScanScreen() {
	const greenId = useSelector((state: any) => state.farm.greenHouseId);
	const [loading, setLoading] = useState(false);
	const [code, setCode] = useState(0);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);

	// console.log(code);
	const handleScan = async () => {
		setLoading(true);
		if (greenId) {
			const response = await DeviceScan.queryDeviceScan(greenId);
			const data = response.code;
			setLoading(false);
			setCode(data);

			if (data === 200 || data === 201) {
				setShowSuccessModal(true);
			} else {
				setShowErrorModal(true);
			}
		} else {
			setCode(404);
			setLoading(false);
			setShowErrorModal(true);
		}
	};

	return (
		<>
			{loading ? (
				<LoadingScreen title="" />
			) : (
				<View style={styles.container}>
					<TouchableOpacity onPress={handleScan}>
						<Icon name="magnify-scan" size={204} color={'#000'} />
					</TouchableOpacity>
					<Text style={styles.title}>Quét cảm biến</Text>
					<Modal
						transparent={true}
						visible={showSuccessModal}
						animationType="none">
						<TouchableOpacity
							style={styles.modalContainer}
							onPress={() => setShowSuccessModal(false)}>
							<View style={styles.modalContent}>
								<Text style={styles.textPopup}>Cảm biến được add thành công !</Text>
							</View>
						</TouchableOpacity>
					</Modal>

					<Modal
						transparent={true}
						visible={showErrorModal}
						animationType="none">
						<TouchableOpacity
							style={styles.modalContainer}
							onPress={() => setShowErrorModal(false)}
                            >
							<View style={styles.modalContent}>
								<Text style={styles.textPopup}>Gửi bản tin quét cảm biến thất bại</Text>
							</View>
						</TouchableOpacity>
					</Modal>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		fontFamily: 'Roboto-Regular',
	},
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 5,
      },
      textPopup:{
        color:'#000',
        fontWeight:'600'
      }
});
