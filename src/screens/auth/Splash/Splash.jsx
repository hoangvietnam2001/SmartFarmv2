import {Image, Text, View} from 'react-native';
import React from 'react';
import Style from './Style';

export default function Splash({navigation}) {
  setTimeout(()=>navigation.navigate('Login'),3000)
	return (
		<View style={Style.container}>
			<Image
				source={require('../../../assets/logo/logoralismart.jpg')}
				style={Style.logo}
				resizeMode="stretch"
			/>
			<View style={Style.alltext}>
				<Text style={Style.rallip}>RALLIP</Text>
				<Text style={Style.smart}> SMART</Text>
			</View>
		</View>
	);
}

