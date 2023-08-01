import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
export default function App() {
  return (
    <View>
      <StatusBar barStyle={'dark-content'}/>
      <Text style={{fontFamily:'Montserrat-Italic',fontSize:30,fontStyle:'normal'}}>App</Text>
      <Ionicons name={'close'} size={24} color={'red'}/>
    </View>
  )
}

const styles = StyleSheet.create({})