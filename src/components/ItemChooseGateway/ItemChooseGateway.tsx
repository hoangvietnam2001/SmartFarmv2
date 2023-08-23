import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setFarmID, setGreenHouses } from '../../redux/slices/GreenHouseSlice';
import GreenHouseDB from '../../services/Relays/GreenHouseDB';
const GreenHouse = new GreenHouseDB();
export default function ItemChooseGateway({item,handleCheck,selectedItem}: {item: any,handleCheck:any,selectedItem:any}) {
	const dispatch = useDispatch();
	const {ID} = item;
	
	return (
		<TouchableOpacity
			style={styles.item}
			onPress={async() => {
				const a = await GreenHouse.GetGreenhouseByFarmId(ID);
				handleCheck(ID);
				dispatch(setGreenHouses(a));
			}}>
			<Text style={styles.itemName}>{item.name}</Text>
			<TouchableOpacity
				onPress={async() => {
					const a = await GreenHouse.GetGreenhouseByFarmId(ID);
					handleCheck(ID);
					dispatch(setGreenHouses(a));
				}}
			>
				<Icon
					name={selectedItem === ID ? 'check-circle' : 'circle-thin'}
					size={18}
					color={'#005A6F'}
					style={styles.itemIcon}
				/>
			</TouchableOpacity>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	item: {
		height: 76,
		marginTop: 20,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 5,
		borderRadius: 10,
		borderWidth: 1.3,
		borderColor: '#000',
		alignItems: 'center',
		marginBottom:1
	},
	itemName: {
		marginHorizontal: 12,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
	},
	itemIcon: {
		marginHorizontal: 12,
	},
});
