import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'
import { setModalDelete, setRefreshing } from '../../redux/slices/GreenHouseSlice'
import RelayDB from '../../services/Relays/RelayDB'

const Relay = new RelayDB();

interface Props {
    RelayID: string
}
export default function ModalDeleteDevice(props: Props) {
    const [loading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const handleDelete = async () => {
        setIsLoading(true)
        const response = await Relay.Delete(props.RelayID);
        if (response === 200) {
            setIsLoading(false);
            dispatch(setModalDelete(false));
            dispatch(setRefreshing(true));
        }
    }
    const handleCancle = () => {
        dispatch(setModalDelete(false))
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bạn có chắc muốn xoá thiết bị này ?</Text>
            <View style={styles.viewBtn} >
                <TouchableOpacity style={styles.btn} onPress={handleDelete}>
                    <Text style={styles.titleBtn}>Xoá</Text>
                </TouchableOpacity>
                <Text style={{ borderLeftWidth: 0.3 }}></Text>
                <TouchableOpacity style={styles.btn} onPress={handleCancle}>
                    <Text style={styles.titleBtn}>Huỷ</Text>
                </TouchableOpacity>
            </View>
            <Modal visible = {loading} transparent>
                <ActivityIndicator size={'large'} style={styles.indicator} />
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 300,
        alignSelf: 'center',
        width: 300,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 15,
        // justifyContent: 'center',
    },
    title: {
        marginTop: 20,
        alignSelf: 'center'
    },
    viewBtn: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
    },
    btn: {
        borderTopWidth: 0.3,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        width: 150
    },
    titleBtn: {
        fontSize: 16,
        fontWeight: '500'
    },
    indicator: {
        // position:'absolute',
        alignItems: 'center',
        top: 300,
    }
})