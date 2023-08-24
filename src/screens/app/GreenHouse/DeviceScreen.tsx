import React, { useEffect, useState } from "react";
import { Modal, ScrollView, Switch, ToastAndroid, RefreshControl, ActivityIndicator } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import WaterPump from "../../../components/Layout/WaterPump";
import RelayDB from "../../../services/Relays/RelayDB";
import { SafeAreaView } from "react-native-safe-area-context";
import Notifi from "../../../components/Layout/Notifi";
import Light from "../../../components/Layout/Light";
import { useDispatch, useSelector } from "react-redux";
import ModalAddDevice from "../../../components/Modals/ModalAddDevice";
import { setModalAdd, setNameDevice, setPin, setRefreshing, setRelay, setType } from "../../../redux/slices/GreenHouseSlice";
import ModalDeleteDevice from "../../../components/Modals/ModalDeleteDevice";
const Relay = new RelayDB();
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

// code doan lay ra sensor

const GreenHouseDevice = ({ navigation }: { navigation: any }) => {
    const [loading, setIsLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [RelayID, setRelayID] = useState('');
    const Relays = useSelector((state: any) => state.farm.Relays);
    const enableModalAdd = useSelector((state: any) => state.farm.enableModalAdd);
    const GreenHouse = useSelector((state: any) => state.farm.GreenHouse);
    const PIN = useSelector((state: any) => state.farm.Pin)
    const TYPE = useSelector((state: any) => state.farm.Type)
    const nameDevice = useSelector((state: any) => state.farm.nameDevice)
    const image = useSelector((state: any) => state.farm.image)
    const enableModalDelete = useSelector((state: any) => state.farm.enableModalDelete);
    const refreshing: boolean = useSelector((state: any) => state.farm.refreshing);
    const dispatch = useDispatch();
    const handleSaveModalAdd = async () => {
        const object =
        {
            greenhouseId: GreenHouse.id,
            name: nameDevice,
            avatar: image,
            type: TYPE.value,
            pin: PIN,
        }
        setIsLoading(true);
        const response = await Relay.Create(object)
        if (response === 201) {
            setIsLoading(false);
            dispatch(setNameDevice(''))
            dispatch(setPin(-1));
            dispatch(setType({}));
            dispatch(setModalAdd(false));
            onRefresh();
            ToastAndroid.show('Thêm thiết bị thành công', ToastAndroid.SHORT);
        }
        else{
            setIsLoading(false);
        }
    }
    const handleCloseModalAdd = async () => {
        dispatch(setNameDevice(''))
        dispatch(setPin(-1));
        dispatch(setType({}));
        dispatch(setModalAdd(false));
    }
    const onRefresh = async () => {
        const response = await Relay.GetRelaysByGreenHouseId(GreenHouse.id);
        dispatch(setRelay(response));
        setTimeout(() => {
            dispatch(setRefreshing(false));
        }, 100);
    };
    useEffect(() => {
        onRefresh();
    }, [refreshing])
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl
                    onRefresh={() => {
                        dispatch(setRefreshing(true));
                        onRefresh()
                    }}
                    refreshing={refreshing}
                />}
                showsVerticalScrollIndicator={false} >
                {
                    Relays !== null && (
                        Relays.map((route: any, index: number) => (
                            route.type === 1 ?
                                (
                                    <Light
                                        key={index}
                                        route={route}
                                    />
                                )
                                :
                                (
                                    <WaterPump
                                        status={showConfirm}
                                        key={index}
                                        route={route}
                                        onReturnID={(value) => setRelayID(value)}
                                    />
                                )
                        )))
                }
            </ScrollView>
            <Modal
                transparent
                visible={enableModalAdd}
            >
                <ModalAddDevice
                    onClose={handleCloseModalAdd}
                    onSave={handleSaveModalAdd}
                />
                <Modal visible = {loading} transparent>
                    <ActivityIndicator size={'large'} style={styles.indicator} />
                </Modal>
            </Modal>
            <Modal
                visible={enableModalDelete}
                transparent
            >
                <ModalDeleteDevice
                    RelayID={RelayID}
                />
            </Modal>
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
    indicator: {
        // position:'absolute',
        alignItems: 'center',
        top: 300,
    }
});
export default GreenHouseDevice;