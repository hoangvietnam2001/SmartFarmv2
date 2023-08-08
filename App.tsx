import {StatusBar, StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Login, ChooseGateway} from './src/screens';
import LoadingGateway from './src/screens/app/LoadGateway/LoadingGateway';
const Stack = createNativeStackNavigator();

const AuthScreen = () => {
	return (
		<Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
			<Stack.Screen name={'Splash'} component={Splash} />
			<Stack.Screen name={'Login'} component={Login} />
		</Stack.Navigator>
	);
};

const AppScreen = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown:false}}>
			<Stack.Screen name={'ChooseGateway'} component={ChooseGateway} />
			<Stack.Screen name={'Loading'} component={LoadingGateway} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<>
			<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="AuthScreen" component={AuthScreen} />
					<Stack.Screen name="AppScreen" component={AppScreen} />
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({});
