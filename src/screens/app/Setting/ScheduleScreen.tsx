import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import RelayDB from '../../../services/Relays/RelayDB';
import axios from 'axios';
import GreenHouseDB from '../../../services/Relays/GreenHouseDB';
const Relay = new RelayDB();
const GreenHouse = new GreenHouseDB();
const ScheduleScreen = () => {
	const [arr, setArr] = useState([]);
	useEffect(() => {
		async function name() {
			const a = await Relay.GetAllRelays();
			if (a !== null) {
				setArr(a);
			}
		}

		name();
	}, []);
	return (
		<View>
			{arr.map((route: any, index: number) => (
				<Text key={index}>{route.name}</Text>
			))}
			<Text>Lập lịch ở đây</Text>
		</View>
	);
};
export default ScheduleScreen;
