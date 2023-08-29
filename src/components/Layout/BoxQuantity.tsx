import { ColorValue, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
interface Props {
    boxTitle: string,
    color?: ColorValue
    icon?: any,
    type?: string,
    quantity: number
}
export default function BoxQuantity(props: Props) {
    return (
        <SafeAreaView>
            {/* <View style={styles.box}> */}
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={['#FFFF99', '#FFFFCC','#FFF']}
                style={styles.box}
            >

                <View style={styles.devicebox}>
                    <Icon
                        name={props.icon}
                        type={props.type}
                        color={props.color}
                        size={50}
                    />
                    <Text style={[styles.devicequantity, { color: props.color }]}>{props.quantity}</Text>
                </View>
                <Text style={[styles.devicetext, { color: props.color }]}>{props.boxTitle}</Text>
            </LinearGradient>
            {/* </View> */}
        </SafeAreaView>
    )
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    box: {
        alignItems: 'center',
        width: WIDTH / 2.5,
        height: HEIGHT / 7.5,
        borderWidth: 1,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#DADADA',
        shadowColor: 'black',
        elevation: 15,
        shadowOffset: { width: 0, height: 4 },
    },
    devicebox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    devicequantity: {
        marginLeft: 35,
        fontSize: 25,
        fontWeight: '700',
        letterSpacing: 0.125,
        lineHeight: 35,
    },
    devicetext: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.125,
        lineHeight: 35,
    },
})