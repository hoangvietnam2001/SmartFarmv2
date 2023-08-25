import React from 'react';
import {
	Dimensions,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const GreenHouseInfo = () => {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.item}>
				<View style={styles.box}>
					<View style={styles.devicebox}>
						<Image
							style={styles.deviceimage}
							source={require('../../../assets/images/swap.png')}></Image>
						<Text style={styles.devicequantity}>1</Text>
					</View>
					<Text style={styles.devicetext}>DEVICE</Text>
				</View>
				<View style={styles.box}>
					<View style={styles.devicebox}>
						<Image
							style={styles.sensorimage}
							source={require('../../../assets/images/temperature.png')}></Image>
						<Text style={styles.sendorquantity}>1</Text>
					</View>
					<Text style={styles.sensortext}>SENSOR</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: WIDTH,
		height: HEIGHT,
		backgroundColor: 'white',
	},
	item: {
		flexDirection: 'row',
	},
	box: {
		alignItems: 'center',
		width: WIDTH / 2.245,
		height: HEIGHT / 7,
		borderWidth: 1,
		justifyContent: 'center',
		borderRadius: 10,
		borderColor: '#DADADA',
		marginHorizontal: 9,
	},
	devicebox: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	deviceimage: {
		width: 40,
		height: 40,
	},
	devicequantity: {
		marginLeft: 35,
		fontSize: 25,
		color: '#27AE60',
		fontWeight: '700',
		letterSpacing: 0.125,
		lineHeight: 35,
	},
	devicetext: {
		fontSize: 16,
		color: '#27AE60',
		fontWeight: '700',
		letterSpacing: 0.125,
		lineHeight: 35,
		bottom: 0,
	},
	sensorimage: {
		width: 35,
		height: 35,
	},
	sendorquantity: {
		marginLeft: 35,
		fontSize: 25,
		color: 'red',
		fontWeight: '700',
		letterSpacing: 0.125,
		lineHeight: 35,
	},
	sensortext: {
		fontSize: 16,
		color: 'red',
		fontWeight: '700',
		letterSpacing: 0.125,
		lineHeight: 35,
		bottom: 0,
	},
});
export default GreenHouseInfo;
