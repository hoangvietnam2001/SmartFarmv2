import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RelayDB from '../../../services/Relays/RelayDB';
import GreenHouseDB from '../../../services/Relays/GreenHouseDB';
import HeaderLayout from '../../../components/Layout/HeaderLayout';
import ScheduleDevice from '../../../components/Layout/Schedule/ScheduleDevice';
const Relay = new RelayDB();
const GreenHouse = new GreenHouseDB();
interface Props {
	navigation: any
}
const ScheduleScreen = (props: Props) => {
	return (
		<SafeAreaView style = {styles.container}>
			<HeaderLayout
			headerTitle='Lập lịch'
			/>
			<View>
				<ScheduleDevice
				navigation={props.navigation}
				/>
			</View>
		</SafeAreaView>
	);
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
	container:{
		flex: 1,
		backgroundColor: '#FFF',
		width:WIDTH,
		height:HEIGHT
	},
	headerTitle: {
		color: 'white',
		lineHeight: 30,
		fontSize: 16,
		fontWeight: '600'
	}
})

export default ScheduleScreen;
