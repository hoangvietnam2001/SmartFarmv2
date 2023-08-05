import React, {useState} from "react";
import { ScrollView, Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View ,Image} from "react-native";
import WaterPump from "../../components/Layout/WaterPump";
import Light from "../../components/Layout/Light";

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const GreenHouseDevice = ({navigation}: {navigation: any}) =>{
    return(
        <ScrollView>

        <View style = {styles.container}>
            <WaterPump
                style = {{}}
                />
            <Light
                style = {{}}
                />
            <WaterPump
                style = {{}}
                />
        </View>
                </ScrollView>
    );



};

const styles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: HEIGHT,
        flex: 1,
        alignItems: "center",
        backgroundColor: '#FFFFFF'
    },
});
export default GreenHouseDevice;