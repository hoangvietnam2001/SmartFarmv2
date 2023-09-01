import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { setModalDelete, setRefreshing, setRelay } from '../../redux/slices/GreenHouseSlice'
import RelayDB from '../../services/Relays/RelayDB'

const Relay = new RelayDB();

interface Props {
    RelayID: string
    onDelete: (value: boolean) => void
}
export default function ModalDeleteDevice(props: Props) {
    const [loading, setIsLoading] = useState(false);
    const Relays:[] = useSelector((state: any) => state.farm.Relays);
    const dispatch = useDispatch();
    const handleDelete = async () => {
        props.onDelete(true)
        setIsLoading(true)
        const response = await Relay.Delete(props.RelayID);
        if (response === 200) {
            dispatch(setModalDelete(false));
            setIsLoading(false);
            dispatch(setRefreshing(true));
        }
        else{
            setIsLoading(false);
        }
    }
    const handleCancle = () => {
        props.onDelete(false)
        dispatch(setModalDelete(false))
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bạn có chắc muốn xoá chứ ?</Text>
            <View style={styles.viewBtn} >
                <TouchableOpacity style={styles.btn} onPress={loading ? () => { } : handleDelete}>
                    {
                        loading === true ?
                            (<ActivityIndicator size={'small'} style={styles.indicator} />)
                            :
                            (<Text style={styles.titleBtn}>Xoá</Text>)
                    }
                </TouchableOpacity>
                <Text style={{ borderLeftWidth: 0.3 }}></Text>
                <TouchableOpacity style={styles.btn} onPress={loading ? () => { } : handleCancle}>
                    <Text style={styles.titleBtn}>Huỷ</Text>
                </TouchableOpacity>
            </View>
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
        alignItems: 'center',
    }
})