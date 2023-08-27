import React, { useState, useEffect } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView, Modal, ActivityIndicator } from 'react-native';
import { URI } from '../../utils/config';
import DropDownAddDevice from '../DropDown/DropDownAddDevices';
import { arrImage, arrPin, arrTypes } from '../../constants/dataTyeDevices';
import { useDispatch, useSelector } from 'react-redux';
import { setImage, setNameDevice, setPin, setShowPin, setShowType, setType } from '../../redux/slices/GreenHouseSlice';
import RelayDB from '../../services/Relays/RelayDB';
const Relay = new RelayDB();
interface Props {
    item: any,
    onClose?: () => void,
    onSave?: (value: any) => void,
}

const ModalAddDevice = (props: Props) => {
    const showType = useSelector((state: any) => state.farm.showDropDownTypes)
    const showPin = useSelector((state: any) => state.farm.showDropDownPin)
    const PIN = useSelector((state: any) => state.farm.Pin)
    const TYPE = useSelector((state: any) => state.farm.Type)
    const name = useSelector((state: any) => state.farm.nameDevice)
    const image = useSelector((state: any) => state.farm.image)
    const [selected, setSelect] = useState(image);
    const GreenHouse = useSelector((state: any) => state.farm.GreenHouse);
    const dispatch = useDispatch();
    const handleType = () => {
        dispatch(setShowType(!showType))
        dispatch(setShowPin(false))
    }
    const handlePin = () => {
        dispatch(setShowPin(!showPin))
    }
    const handleChangeText = (value: string) => {
        dispatch(setNameDevice(value));
    }
    return (
        <SafeAreaView style={styles.constainer}>

            <Text style={styles.title}>Bạn đang muốn {props.item === 0 ? 'thêm' : 'cập nhật'} thiết bị?</Text>

            <View style={styles.formGroup}>
                <Text style={styles.titleInput}>Nhà kính</Text>
                <Text style={styles.titleType}>{GreenHouse.name}</Text>
            </View>
            <TouchableWithoutFeedback>
                <View style={styles.formGroup}>
                    <Text style={styles.titleInput}>Tên thiết bị</Text>
                    <TextInput value={name} maxLength={22} onChangeText={(value: any) => handleChangeText(value)} style={styles.inputName} placeholder='Nhập tên thiết bị'></TextInput>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.formGroup}>
                <Text style={styles.titleInput}>Pin</Text>
                <TouchableOpacity onPress={handlePin}>
                    <Text style={styles.titleType}>{PIN > -1 ? PIN : 'Chọn PIN'}</Text>
                </TouchableOpacity>
                {showPin && props.item === 0 &&
                    (<DropDownAddDevice
                        data={arrPin}
                    />)
                }
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.titleInput}>Kiểu thiết bị</Text>
                <TouchableOpacity onPress={handleType}>
                    <Text style={styles.titleType}>{TYPE?.name ? TYPE?.name : 'Chọn Loại Thiết Bị'}</Text>
                </TouchableOpacity>
                {showType && (props.item === 0) &&
                    (<DropDownAddDevice
                        data={arrTypes}
                    />)
                }
            </View>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={arrImage}
                    style={styles.viewImage}
                    numColumns={4}
                    keyExtractor={(item: any, index: number) => { return index.toString() }}
                    renderItem={(item: any) => {
                        const handleSelect = () => {
                            setSelect(item.item);
                            dispatch(setImage(item.item))
                        }
                        return (
                            <TouchableOpacity onPress={handleSelect} style={styles.itemImage} >
                                <Image
                                    style={[item.item !== selected ? styles.image : styles.imageSelected
                                    ]}
                                    source={{ uri: URI + item.item }} />
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>
            <View style={styles.viewBtn}>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    props.onSave?.(props.item)
                }}>
                    <Text>Lưu</Text>
                </TouchableOpacity>
                <Text style={{ borderLeftWidth: 0.2 }}></Text>
                <TouchableOpacity style={styles.btn} onPress={props.onClose}>
                    <Text>Thoát</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    constainer: {
        position: 'absolute',
        width: 300,
        height: 500,
        backgroundColor: '#FFF',
        alignSelf: 'center',
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        elevation: 10,
        shadowRadius: 20,
        shadowOpacity: 1
    },
    title: {
        marginTop: 10,
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '600',
        fontFamily: 'Roboto-Bold',
        marginBottom: 20,
    },
    formGroup: {
        alignSelf: 'center',
        width: 250,
        height: 50,
        borderRadius: 15,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#FFFs',
        alignItems: 'center'
    },
    titleInput: {
        color: 'black',
        fontFamily: 'Roboto-Bold',
        fontSize: 14,
        marginLeft: 5,
    },
    inputName: {
        textAlign: 'right',
        backgroundColor: '#FFF',
        padding: 0,
        borderRightWidth: 0.2,
        paddingRight: 3,
        color: 'black',
        fontWeight: '500'
    },
    titleType: {
        borderRightWidth: 0.3,
        padding: 3,
        color: 'black',
        fontWeight: '500'
    },
    viewImage: {
        marginTop: 15,
        width: 300,
        height: 190,
    },
    itemImage: {
        width: 75, height: 75, borderRadius: 30, overflow: 'hidden'
    },
    image: {
        width: 70,
        height: 70,
        alignSelf: 'center'
    },
    imageSelected: {
        width: 75,
        height: 75,
        backgroundColor: '#CCCCCC',
        alignSelf: 'center',
    },
    viewBtn: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        bottom: 0,
    },
    btn: {
        borderTopWidth: 0.2,
        width: 150,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

})

export default ModalAddDevice;