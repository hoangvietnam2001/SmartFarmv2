import React, { useEffect, useState } from "react";
import { ScrollView, Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import WaterPump from "../../../components/Layout/WaterPump";
import RelayDB from "../../../services/Relays/RelayDB";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifi from "../../../components/Layout/Notifi";
import Light from "../../../components/Layout/Light";
import { useSelector } from "react-redux";
import { Text } from "react-native";
const Relay = new RelayDB();
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;


const GreenHouseDevice = ({ navigation }: { navigation: any }) => {
    const [devices, setDevices]: any = useState([]);
    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const Relays = useSelector((state: any) => state.farm.Relays);
    const handleShowNotifi = () => {
        setShow(true);
    }
    const dimissShow = () => {
        setShow(false)
    }
    const handleModalClosed = (value: any) => {
        setShowConfirm(value)
    }
    useEffect(() => {

    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {
                Relays !== null? (
                    Relays.map((route: any, index: number) => (

                        route.type === 0 ?
                            (
                                <WaterPump
                                    status={showConfirm}
                                    key={index}
                                    route={route}
                                    style={{}}
                                    onPress={handleShowNotifi}
                                />
                            )
                            :
                            (
                                <Light
                                    key={index}
                                    style={{}}
                                    route={route}
                                />
                            )


                    )))
                    :
                    (

                        <Text>sjdh</Text>
                    )
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