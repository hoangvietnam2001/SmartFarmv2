import React from 'react';
import {
	Dimensions,
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import BoxQuantity from '../../../components/Layout/BoxQuantity';
import { Header, Icon } from 'react-native-elements';
import { DrawerActions } from '@react-navigation/native';
import HeaderLayout from '../../../components/Layout/HeaderLayout';

interface Props {
	navigation: any
}
const GreenHouseInfo = (props: Props) => {
	return (
		<SafeAreaView style={styles.container}>
			<HeaderLayout
				navigation={props.navigation}
				headerTitle='Trang chính'
			/>
			<View style={styles.gateWay}>
				<Text style={styles.title}>GateWay</Text>
				<Icon
					name='router'
					type='martialicon'
					size={18}
					style={styles.icongetway}
				/>
			</View>
			<View style={styles.viewChart}>
			</View>
			<View style={styles.box}>
				<BoxQuantity
					boxTitle='Devices'
					icon={'swap'}
					type={'entypo'}
					color={'green'}
					quantity={21}
				/>
				<BoxQuantity
					boxTitle='Sensor'
					quantity={10}
					color={'red'}
					icon={'temperature-low'}
					type='font-awesome-5'
				/>
			</View>
		</SafeAreaView>
	);
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container: {
		width: WIDTH,
		height: HEIGHT,
		flex: 1,
		backgroundColor: 'red',
	},
	gateWay: {
		flexDirection: 'row',
		// alignItems:'center',
		columnGap: 5,
		marginLeft: 15,
		marginTop: 10,
	},
	title: {
		fontSize: 14,
		fontWeight: '500',
		color: 'black'
	},
	icongetway: {
	},
	viewChart: {
		marginTop: 50,
		alignSelf: 'center',
		width: WIDTH / 1.1,
		height: HEIGHT / 3,
		borderRadius: 20,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#DADADA',
		justifyContent: 'center',
		backgroundColor: 'white',
		shadowColor: 'black',
		elevation: 15,
		shadowOffset: { width: 0, height: 4 },
	},
	chart: {

	},
	box: {
		position: 'absolute',
		bottom: 20,
		height: HEIGHT / 5,
		flexWrap: 'wrap',
		rowGap: 10,
		columnGap: 30,
		alignContent: 'flex-start',
		justifyContent: 'center',
		alignSelf: 'center'
	}

});
export default GreenHouseInfo;
