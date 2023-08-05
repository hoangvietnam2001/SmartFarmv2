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
}

const styles = StyleSheet.create({})