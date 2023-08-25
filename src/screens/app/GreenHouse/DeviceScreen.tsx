import React, { useEffect, useState } from "react";
import { Modal, ToastAndroid, RefreshControl, ActivityIndicator, FlatList } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import WaterPump from "../../../components/Layout/WaterPump";
import RelayDB from "../../../services/Relays/RelayDB";
import { SafeAreaView } from "react-native-safe-area-context";
import Light from "../../../components/Layout/Light";
import { useDispatch, useSelector } from "react-redux";
import ModalAddDevice from "../../../components/Modals/ModalAddDevice";
import { setImage, setModalAdd, setNameDevice, setPin, setRefreshing, setRelay, setType } from "../../../redux/slices/GreenHouseSlice";
import ModalDeleteDevice from "../../../components/Modals/ModalDeleteDevice";
import { arrTypes } from "../../../constants/dataTyeDevices";
const Relay = new RelayDB();
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

// code doan lay ra sensor

const GreenHouseDevice = ({ navigation }: { navigation: any }) => {
    const [RelayID, setRelayID] = useState('')
    const [loading, setIsLoading] = useState(false);
    const [close, setClose] = useState(false);
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
    const handleSaveModalAdd = async (value: any) => {
        if (value === 0) {
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
                dispatch(setModalAdd({ status: false }));
                onRefresh();
                ToastAndroid.show('Thêm thiết bị thành công', ToastAndroid.SHORT);
            }
            else {
                setIsLoading(false);
            }
        }
        else
        {
            setIsLoading(true);
            const response = await Relay.Update(RelayID,{
                name: nameDevice,
                avatar: image,
            })
            if (response === 200){
                setIsLoading(false);
                dispatch(setNameDevice(''))
                dispatch(setPin(-1));
                dispatch(setType({}));
                dispatch(setModalAdd({ status: false }));
                onRefresh();
            }
        }

    }
    const handleCloseModalAdd = async () => {
        dispatch(setNameDevice(''))
        dispatch(setPin(-1));
        dispatch(setType({}));
        dispatch(setModalAdd({ status: false }));
    }
    const onRefresh = async () => {
        const response = await Relay.GetRelaysByGreenHouseId(GreenHouse.id);
        dispatch(setRelay(response));
        setTimeout(() => {
            dispatch(setRefreshing(false));
        }, 100);
    };


    // Chinh sửa cho cập nhật
    const saveInfo = async (value: any) => {
        setRelayID(value);
        const response = await Relay.GetARelay(value);
        dispatch(setNameDevice(response.name))
        dispatch(setPin(response.pin));
        dispatch(setImage(response.avatar));
        const type = arrTypes.find(doc => doc.value === response.type);
        dispatch(setType(type));
    }
    useEffect(() => {
        onRefresh();
    }, [refreshing])
    return (
        <SafeAreaView style={styles.container}>
            <FlatList refreshControl={
                <RefreshControl
                    onRefresh={() => {
                        dispatch(setRefreshing(true));
                        onRefresh()
                    }}
                    refreshing={refreshing}
                />}
                data={Relays}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={(item: any) => {
                    return (
                        <>
                            {
                                item.type === 1 ?
                                    (
                                        <Light
                                            key={item.index}
                                            route={item.item}
                                            onReturnID={(value) => saveInfo(value)}
                                        />
                                    )
                                    :
                                    (
                                        <WaterPump
                                            key={item.index}
                                            status={close}
                                            route={item.item}
                                            onReturnID={(value) => {
                                                saveInfo(value)
                                            }}
                                        />
                                    )
                            }

                        </>
                    )
                }}
            >
            </FlatList>
            <Modal
                animationType='slide'
                transparent
                visible={enableModalAdd.status}
            >
                <ModalAddDevice
                    item={enableModalAdd.type}
                    onClose={handleCloseModalAdd}
                    onSave={(value: any) => handleSaveModalAdd(value)}
                />
                <Modal visible={loading} transparent>
                    <ActivityIndicator size={'large'} style={styles.indicator} />
                </Modal>
            </Modal>
            <Modal
                animationType='fade'
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