import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ItemChooseGateway({item}: {item: any}) {
	const [check, setCheck] = useState(false);
	// handle check
	const handleCheck = (id: number) => {
		if (id) {
			setCheck(!check);
		}
	};

	return (
		<TouchableOpacity
			style={styles.item}
			onPress={() => {
				handleCheck(item.id);
				console.log(item.id);
			}}>
			<Text style={styles.itemName}>{item.name}</Text>
			<TouchableOpacity
				onPress={() => {
					handleCheck(item.id);
				}}>
				<Icon
					name={check ? 'check-circle' : 'circle-thin'}
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
		borderWidth: 1,
		borderColor: '#000',
		alignItems: 'center',
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
