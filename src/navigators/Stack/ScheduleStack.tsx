import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScheduleScreen from '../../screens/app/Setting/ScheduleScreen';
import ScheduleDetail from '../../components/Layout/Schedule/ScheduleDetail';
import ScheduleAddOrUpdate from '../../screens/app/Setting/ScheduleAddOrUpdate';
const Stack = createStackNavigator();


export default function ScheduleStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name='Schedule' component={ScheduleScreen}/>
        <Stack.Screen name='Detail' component={ScheduleDetail}/>
        <Stack.Screen name='AddorUpdate' component={ScheduleAddOrUpdate}/>
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})