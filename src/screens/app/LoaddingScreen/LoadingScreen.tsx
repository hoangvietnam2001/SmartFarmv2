import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Spinner from 'react-native-spinkit';
import { Icon } from 'react-native-elements'
import { HEIGHT } from '../../../constants/Size';

export default function LoadingScreen({title}:{title:string}) {
	return (
		<View style={styles.loadingView}>
			<Spinner
				isVisible={true}
				size={204}
				type={'Circle'}
				color={'#4F4A4A'}
				style={styles.spinner}
			></Spinner>
			<Icon
				name='search'
				type='ionicon'
				size={87}
				style={styles.iconLoading}
			/>
			<Text style={styles.textLoading}>{title}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	loadingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	spinner: {
		position: 'absolute',
		backgroundColor: '#fff',
	},
	iconLoading: {
		opacity: 0.8,
	},
	textLoading: {
		fontFamily: 'Roboto-Regular',
		fontWeight: '700',
		fontSize: 20,
		letterSpacing: 0.5,
		lineHeight: 28.4,
		color: '#13313D',
		position: 'absolute',
		bottom: HEIGHT - 522
	},
})
