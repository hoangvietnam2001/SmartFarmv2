import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {WIDTH} from '../../constants/Size';
import LinearGradient from 'react-native-linear-gradient';
export default function ButtonContinue({navigation,selectedItemId,handleShowAlert}: {navigation: any,selectedItemId:any,handleShowAlert:any}) {
	return (
		<TouchableOpacity
			style={styles.bgButton}
			onPress={() => {
				if (selectedItemId) {
					 console.log(selectedItemId);
					navigation.navigate('MainDrawer');
				} else {
					handleShowAlert();
				}
			}}>
			<LinearGradient
				style={styles.button}
				colors={['#07BD89', '#006E8C', '#002E32']}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 0}}>
				<Text style={styles.textButton}>Tiếp tục</Text>
			</LinearGradient>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	bgButton: {
		width: WIDTH - 46,
		marginTop: 60,
	},
	button: {
		height: 44,
		borderRadius: 23,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
	textButton: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		lineHeight: 20.83,
		textAlign: 'center',
	},
});