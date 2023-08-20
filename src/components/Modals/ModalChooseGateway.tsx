import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';

export default function ModalChooseGateway({
	visible,
	message,
	onClose,
}: {
	visible: any;
	message: any;
	onClose: any;
}) {
	return (
		<Modal visible={visible} transparent animationType="fade">
			<View style={styles.modalContainer}>
				<View style={styles.modalContent}>
					<Text style={styles.alertMessage}>{message}</Text>
					<TouchableOpacity style={styles.closeButton} onPress={onClose}>
						<Text style={styles.closeButtonText}>OK</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 6,
		width: 300,
	},
	alertMessage: {
		fontSize: 16,
		marginBottom: 20,
		textAlign: 'center',
        color:'#000',
        fontWeight:'700'
	},
	closeButton: {
		alignSelf: 'center',
		padding: 8,
        backgroundColor:'#2C698D',
        borderRadius:8,
        width:88,
        
	},
	closeButtonText: {
		color: '#fff',
		fontSize: 16,
        fontWeight:'500',
        textAlign:'center'
	},
});
