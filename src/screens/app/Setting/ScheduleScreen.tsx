import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import RelayDB from '../../../services/Relays/RelayDB';
import GreenHouseDB from '../../../services/Relays/GreenHouseDB';
import HeaderLayout from '../../../components/Layout/HeaderLayout';
const Relay = new RelayDB();
const GreenHouse = new GreenHouseDB();
interface Props {
	navigation: any
}
const ScheduleScreen = (props: Props) => {
	return (
		<SafeAreaView>
			<HeaderLayout
			headerTitle='Lập lịch'
			/>
			<View>
				<Text>Lap lich</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	headerTitle: {
		color: 'white',
		lineHeight: 30,
		fontSize: 16,
		fontWeight: '600'
	}
})

export default ScheduleScreen;
