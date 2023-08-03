import { WIDTH } from "../../../constants/Size";

export const Style = {
	container: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		marginTop: 37,
		color: '#005A6F',
		fontSize: 18,
		fontWeight: '700',
		lineHeight: 23.44,
		marginBottom: 12,
	},
	bgFlatlist: {
		height: 400,
	},
	flatlist: {
		width: WIDTH - 46,
	},
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
	bgButton: {
		width: WIDTH - 46,
		marginTop: 20,
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
	loginOther: {
		paddingVertical: 15,
		color: '#005A6F',
		fontSize: 14,
		fontWeight: '700',
		lineHeight: 18.23,
	},
};
