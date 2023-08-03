import { WIDTH } from "../../../constants/Size";

export const Style = {
    container: {
		position: 'relative',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	body: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 20,
	},
	logo: {
		marginTop: 30,
		width: 254,
		height: 254,
	},
	alltext: {
		flexDirection: 'row',
		marginTop: 10,
	},
	rallip: {
		fontSize: 30,
		fontWeight: '700',
		lineHeight: 36.31,
		textAlign: 'center',
		color: '#129f95',
	},
	smart: {
		fontSize: 30,
		fontWeight: '700',
		lineHeight: 36.31,
		textAlign: 'center',
		color: '#07C754',
	},
	input: {
		width: 293,
		marginTop: 20,
	},
	email: {
		// borderBottomColor: 'rgba(44, 105, 141, 1)',
		borderBottomColor: '#AEB2B8',
		borderBottomWidth: 1,
	},
	password: {
		borderBottomColor: '#AEB2B8',
		borderBottomWidth: 1,
		marginTop: 5,
	},
	forgot: {
		width:110,
		marginTop: 15,
		
	},
	textForgot: {
		fontFamily: 'Roboto-Regular',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 18,
		color: '#2c698d',
		textAlign: 'right',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 293,
		height: 50,
		borderRadius: 30,
		marginVertical: 30,
	},
	textBtn: {
		fontFamily: 'Roboto-Bold',
		fontWeight: '400',
		color: '#fff',
		lineHeight: 16,
		textAlign: 'center',
		fontSize: 14,
	},
}
