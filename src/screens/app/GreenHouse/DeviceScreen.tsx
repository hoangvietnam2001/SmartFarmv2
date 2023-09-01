import React, { useEffect, useState } from "react";
import { Modal, ToastAndroid, RefreshControl, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import WaterPump from "../../../components/Layout/WaterPump";
import RelayDB from "../../../services/Relays/RelayDB";
import Light from "../../../components/Layout/Light";
import { useDispatch, useSelector } from "react-redux";
import ModalAddDevice from "../../../components/Modals/ModalAddDevice";
import { setImage, setModalAdd, setNameDevice, setPin, setRefreshing, setRelay, setType } from "../../../redux/slices/GreenHouseSlice";
import ModalDeleteDevice from "../../../components/Modals/ModalDeleteDevice";
import BLE from "../../../components/Layout/BLE";
import HeaderLayout from "../../../components/Layout/HeaderLayout";
import { View } from "react-native";
const Relay = new RelayDB();


// code doan lay ra sensor

const GreenHouseDevice = ({ navigation }: { navigation: any }) => {
    const [RelayID, setRelayID] = useState('')
    const [loading, setIsLoading] = useState(false);
    const Relays: [] = useSelector((state: any) => state.farm.Relays);
    const enableModalAdd = useSelector((state: any) => state.farm.enableModalAdd);
    const GreenHouse = useSelector((state: any) => state.farm.GreenHouse);
    const PIN = useSelector((state: any) => state.farm.Pin)
    const TYPE = useSelector((state: any) => state.farm.Type)
    const nameDevice = useSelector((state: any) => state.farm.nameDevice)
    const image = useSelector((state: any) => state.farm.image)
    const enableModalDelete = useSelector((state: any) => state.farm.enableModalDelete);
    const refreshing: boolean = useSelector((state: any) => state.farm.refreshing);
    const dispatch = useDispatch();
    const onReset = () =>{
        dispatch(setNameDevice(''))
        dispatch(setPin(-1));
        dispatch(setType({}));
        dispatch(setImage(''));
        dispatch(setModalAdd({ status: false }));
    }
    const handleSaveModalAdd = async (value: any) => {
        if (value === 0) {
            const object =
            {
                greenhouseId: GreenHouse.id,
                name: nameDevice,
                avatar: image ? image : 'icon TT22 (9).png',
                type: TYPE.value,
                pin: PIN,
            }
            setIsLoading(true);
            const response = await Relay.Create(object)
            if (response === 201) {
                setIsLoading(false);
                onReset()
                onRefresh();
                ToastAndroid.show('Thêm thiết bị thành công', ToastAndroid.SHORT);
            }
            else {
                setIsLoading(false);
            }
        }
        else {
            setIsLoading(true);
            const response = await Relay.Update(RelayID, {
                name: nameDevice,
                avatar: image ? image : 'icon TT22 (17).png',
            })
            if (response === 200) {
                setIsLoading(false);
                onReset()
            }
        }

    }
    const handleCloseModalAdd = async () => {
        onReset();
        dispatch(setModalAdd({ status: false }));
    }
    const onRefresh = async () => {
        const response = await Relay.GetRelaysByGreenHouseId(GreenHouse.id);
        dispatch(setRelay(response));
        setTimeout(() => {
            dispatch(setRefreshing(false));
        }, 1000);
    };

    // Chinh sửa cho cập nhật
    const saveInfo = async (value: any) => {
        setRelayID(value);
    }
    const handleModalAdd = () => {
        dispatch(setModalAdd({ status: true, type: 0 }));
    }
    const handleDeleteModal = (value: boolean) => {
        console.log(value)
    }
    useEffect(() => {
        onRefresh();
    }, [refreshing])
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <HeaderLayout
                headerTitle='Thiết bị'
                headerRight={{
                icon: 'add-box',
               size: 30,
                color: '#FFF',
                onPress: handleModalAdd,
                }}
            />
            {/* Main */}
            <View>

            <FlatList refreshControl={
                <RefreshControl
                    onRefresh={() => {
                        dispatch(setRefreshing(true));
                        onRefresh()
                    }}
                    refreshing={refreshing}
                />}
                data={(Relays)}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={(item: any) => {
                    return (
                        <>
                            {(() => {
                                switch (item.item.type) {
                                    case 1:
                                        return (
                                            <BLE
                                                key={item.index}
                                                route={item.item}
                                                onReturnID={(value) => saveInfo(value)}
                                            />
                                        );
                                    case 2:
                                        return (
                                            <Light
                                                key={item.index}
                                                route={item.item}
                                                onReturnID={(value) => saveInfo(value)}
                                            />
                                        )
                                    default:
                                        return (
                                            <WaterPump
                                                key={item.index}
                                                route={item.item}
                                                onReturnID={(value) => saveInfo(value)}
                                            />
                                        );
                                }
                            })()}
                        </>
                    )
                }}
            >
            </FlatList>
            </View>
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
                    onDelete={(value)=>handleDeleteModal(value)}
                />
            </Modal>
       </SafeAreaView>
    );
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
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