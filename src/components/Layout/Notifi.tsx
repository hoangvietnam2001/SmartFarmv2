import { StyleSheet, Text, View, ViewStyle, StyleProp, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { Dimensions } from "react-native";
type ModalStatus = true|false;
interface Props{
    style?: StyleProp<ViewStyle>, 
    show: boolean, 
    onPress: () => void,
    onModalClosed: (status: ModalStatus)=>void,
}
const  Notifi: React.FC<Props> =  ({style , show, onPress , onModalClosed} )  => {
    const handleSubmit = () =>{
        onModalClosed(true);
        onPress()
    }
    const handleDimiss = () =>{
        onModalClosed(false);
        onPress()
    }
    return (
        <>
            {show &&
                (
                    <View style={[style, styles.Modal]}>
                        <Text style={styles.textcontent}>Bạn đang thực hiện đổi tên</Text>
                        <View style = {styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonTitle}>Xác nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleDimiss}>
                                <Text style={styles.buttonTitle}>Huỷ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }

        </>
    )
}

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    Modal: {
        position: 'absolute',
        width: WIDTH / 1.7,
        height: HEIGHT / 5.5,
        backgroundColor: '#333366',
        alignSelf: "center",
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        top: WIDTH / 2,
    },
    textcontent: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500'
    },
    buttonView:{
        flexDirection:'row'
    },
    button: {
        width: 70,
        height: 40,
        backgroundColor: '#999999',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 15,
        marginHorizontal: 20,
    },
    buttonTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500'
    }
})

export default Notifi;