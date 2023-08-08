import React, {useEffect, useState} from "react";
import { ScrollView, Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View ,Image} from "react-native";
import WaterPump from "../../components/Layout/WaterPump";
import Light from "../../components/Layout/Light";
import RelayDB from "../../services/Relays/RelayDB";
const Relay = new RelayDB();
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const GreenHouseDevice = ({navigation}: {navigation: any}) =>{
    const [devices , setDevices] = useState([]);


    useEffect(()=>{
        async function GetDevices (){
            setDevices(await Relay.GetAllRelays());
        }
        GetDevices();
    },[])
    return(
        <ScrollView style = {styles.container}>

                {
                    devices.map((route: any, index: number)=>(
                        <WaterPump
                            key={index}
                            route={route}
                            style = {{}}
                        />
                    ))
                }
        </ScrollView>
    );



};

const styles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: HEIGHT,
        flex: 1,
        backgroundColor: 'white'
    },
});
export default GreenHouseDevice;