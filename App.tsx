import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import GreenHouseInfo from './src/screens/GreenHouse/InfoScreen';
import MainTab from './src/navigators/Tab/MainTab';
import MainDrawer from './src/navigators/Drawer/MainDrawer';
import MyComponent from './src/screens/Demo';
import { FlatList, GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
export default function App() {
  return (

      <NavigationContainer>
        <MainDrawer/>
        {/* <MyComponent/> */}
        
      </NavigationContainer>
  )


// import {StatusBar, StyleSheet, Text, View, Platform} from 'react-native';
// import React, {useEffect} from 'react';
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {Splash, Login, ChooseGateway} from './src/screens';
// import MainDrawer from './src/navigators/Drawer/MainDrawer';
// const Stack = createNativeStackNavigator();

// const AuthScreen = () => {
// 	return (
// 		<Stack.Navigator
// 			initialRouteName="Splash"
// 			screenOptions={{headerShown: false}}>
// 			<Stack.Screen name={'Splash'} component={Splash} />
// 			<Stack.Screen name={'Login'} component={Login} />
// 		</Stack.Navigator>
// 	);
// };

// const AppScreen = () => {
// 	return (
// 		<Stack.Navigator screenOptions={{headerShown: false}}>
// 			<Stack.Screen name={'ChooseGateway'} component={ChooseGateway} />
// 			<Stack.Screen name={'MainDrawer'} component={MainDrawer} />
// 		</Stack.Navigator>
// 	);
// };

// export default function App() {
// 	return (
// 		<>
// 			<StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
// 			<NavigationContainer>
// 				<Stack.Navigator screenOptions={{headerShown: false}}>
// 					<Stack.Screen name="AuthScreen" component={AuthScreen} />
// 					<Stack.Screen name="AppScreen" component={AppScreen} />
// 				</Stack.Navigator>
// 			</NavigationContainer>
// 		</>
// 	);
}

const styles = StyleSheet.create({});
