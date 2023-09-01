import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Icon, Switch } from 'react-native-elements';
import ModalDeleteDevice from '../../Modals/ModalDeleteDevice';
import { useNavigation } from '@react-navigation/native';

export default function Schedule() {
    const navigation: any = useNavigation();
    const [modal, setModal] = useState(false);
    const handleX = (value: boolean) => {
        console.log(value)
        if (value === false)
            setModal(false)
    }
    const handlePress = () =>{
        navigation.navigate('AddorUpdate');
    }
    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Icon
                name='x'
                type='feather'
                containerStyle={styles.icon}
                onPress={() => { setModal(true) }}
            />
            <Text style={styles.name}>Bóng đèn buổi tối</Text>
            <View style={styles.viewStatus}>
                <View>
                    <Text>Trạng thái</Text>
                    <Text style = {styles.content}>Đang bật</Text>
                </View>
                <Switch
                />
            </View>
            <View style = {styles.cluster}>
                <View>
                    <Text  style = {styles.titleCluster}>Thời gian</Text>
                    <Text style = {styles.content}>19:00</Text>
                </View>
                <View>
                    <Text  style = {styles.titleCluster}>Lặp lại</Text>
                    <Text style = {styles.content}>Hàng ngày</Text>
                </View>
                <View>
                    <Text  style = {styles.titleCluster}>Độ sáng</Text>
                    <Text style = {styles.content}>30%</Text>
                </View>
                <View>
                    <Text  style = {styles.titleCluster}>Nhắc nhở</Text>
                    <Text style = {styles.content}>Bật</Text>
                </View>
            </View>
            <Modal
                visible={modal}
                transparent
            >
                <ModalDeleteDevice
                    RelayID=''
                    onDelete={(value) => handleX(value)}
                />
            </Modal>
        </TouchableOpacity>
    )
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignSelf: 'center',
        width: WIDTH / 1.05,
        height: HEIGHT / 3.4,
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: 'black',
        elevation: 20,
        shadowOffset: { width: 5, height: 10 },
        flexDirection: 'column',
        rowGap: 10,
        padding: 15,
    },
    icon: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    name: {
        marginTop: 15,
        color: 'black',
        fontSize: 17,
        fontWeight: '600',
        fontFamily:'Roboto-Bold'
    },
    viewStatus: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    cluster:{
        flexWrap:'wrap',
        width:WIDTH/1.5,
        height:90,
        justifyContent:'space-between',
        alignContent:'space-between'
    },
    titleCluster:{
        color: 'green'
    },
    content:{
        color:'black',
        fontSize:15,
        fontFamily:'Roboto-Bold'
    }
})