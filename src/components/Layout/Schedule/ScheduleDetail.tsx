import { Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderLayout from '../HeaderLayout'
import Schedule from './Schedule'

export default function ScheduleDetail() {
    return (
        <SafeAreaView style = {styles.container}>
            <HeaderLayout
            headerTitle='Thiết bị 1'
            headerRight={{
                
            }}
            />
            <View>
                <Schedule/>
            </View>
        </SafeAreaView>
    )
}
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: HEIGHT,
        backgroundColor:'#FFF'
    }
})