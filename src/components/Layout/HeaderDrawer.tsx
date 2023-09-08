import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HEIGHT} from '../../constants/Size';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
interface Props {
    navigation:any
}
export default function HeaderDrawer(props: Props) {
    const navigation:any = useNavigation();
	const name = useSelector((state: any) => state.name.name);
	const [user, setuser]: any = useState({});
	useEffect(() => {
		async function GetUSER() {
			const USER: any = await AsyncStorage.getItem('user');
			setuser(JSON.parse(USER));
		}
		GetUSER();
	}, []);
	// console.log('user', name);

	return (
		<View style={styles.header}>
			<View style={styles.imageView}>
				<Image
					style={styles.accountimage}
					source={require('../../assets/images/gau.png')}></Image>
			</View>
			<View style={styles.info}>
				<View style={{width: 150}}>
					<Text style={styles.accountname}>{user.username}</Text>
					<Text style={styles.email}>{name ? name : user.name}</Text>
				</View>
                <TouchableOpacity onPress={()=>navigation.navigate('Tài khoản của tôi')}>
                    <Icon
					name="account-edit"
					type="material-community"
					size={24}
					style={{marginLeft: 30}}
				/>
                </TouchableOpacity>
				
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		height: HEIGHT / 4.7,
	},
	imageView: {
		marginLeft: 20,
		marginTop: 35,
	},
	accountimage: {
		width: 60,
		height: 60,
		borderRadius: 50,
		resizeMode: 'contain',
	},
	info: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	accountname: {
		marginTop: 10,
		marginLeft: 20,
		fontSize: 14,
		fontWeight: '500',
		color: 'white',
	},
	email: {
		marginLeft: 20,
		fontSize: 12,
		fontWeight: '400',
		color: 'white',
	},
});

//   export default HeaderDrawer;
