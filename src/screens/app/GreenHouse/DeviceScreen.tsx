import React, { useEffect, useState } from "react";
import { ScrollView, Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import WaterPump from "../../../components/Layout/WaterPump";
import RelayDB from "../../../services/Relays/RelayDB";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifi from "../../../components/Layout/Notifi";
import Light from "../../../components/Layout/Light";
const Relay = new RelayDB();
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;


const GreenHouseDevice = ({ navigation }: { navigation: any }) => {
    const [devices, setDevices]: any = useState([]);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleShowNotifi = () => {
        setShow(true);
    }
    const dimissShow = () => {
        setShow(false)
    }
    const handleModalClosed = (value: any)=>{
        setShowConfirm(value)
    }
    useEffect(() => {
        async function GetDevices() {
            const a = await Relay.GetAllRelays()
            console.log(a);
            setDevices(a);
        }
        GetDevices();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView >
                {
                    devices.map((route: any, index: number) => (
                            
                            route.type === 0 ?
                            (
                                <WaterPump
                                status = {showConfirm}
                                key={index}
                                route={route}
                                style={{}}
                                onPress={handleShowNotifi}
                            />
                            )
                            :
                            (
                                <Light
                                    style = {{}}
                                />
                            )
                        
                       
                    ))
                }
            </ScrollView>
                <Notifi
                    show={show}
                    onPress={dimissShow}
                    onModalClosed={handleModalClosed}
                />
        </SafeAreaView>
    );



};

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        flex: 1,
        backgroundColor: 'white',
    },

});
export default GreenHouseDevice;