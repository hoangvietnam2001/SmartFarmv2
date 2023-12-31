import {
	StatusBar,
	StyleSheet,
	Text,
	View,
	Platform,
	AppState,
} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Splash, Login, ChooseGateway} from './src/screens';
import MainDrawer from './src/navigators/Drawer/MainDrawer';
import {Provider} from 'react-redux';
import store from './src/redux/store/store';
import MyComponent from './src/screens/Demo';

const Stack = createNativeStackNavigator();

export const AuthScreen = () => {
	return (
		<Stack.Navigator
			initialRouteName="Splash"
			screenOptions={{headerShown: false}}>
			<Stack.Screen name={'Splash'} component={Splash} />
			<Stack.Screen name={'Login'} component={Login} />
		</Stack.Navigator>
	);
};

const AppScreen = () => {
	return (
		<Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name={'ChooseGateway'} component={ChooseGateway} />
			<Stack.Screen name={'MainDrawer'} component={MainDrawer} />
		</Stack.Navigator>
	);
};

export default function App() {
	return (
		<>
			<Provider store={store}>
				<StatusBar barStyle={'dark-content'} />
				<NavigationContainer>
					<Stack.Navigator screenOptions={{headerShown: false}}>
						<Stack.Screen name="AuthScreen" component={AuthScreen} />
						<Stack.Screen name="AppScreen" component={AppScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		</>
	);
}

const styles = StyleSheet.create({});
