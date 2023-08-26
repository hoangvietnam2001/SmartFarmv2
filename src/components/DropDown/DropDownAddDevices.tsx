import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import { useDispatch } from 'react-redux'
import { setPin, setShowPin, setShowType, setType } from '../../redux/slices/GreenHouseSlice'

interface Props {
    data: any[]
}

export default function DropDownAddDevice(props: Props) {
    const dispatch = useDispatch();
    const data = props.data;

    const handleSelected = (value: any) => {
        if (!isNaN(value)) {
            dispatch(setShowPin(false))
            dispatch(setPin(value))
        }
        else {
            dispatch(setShowType(false))
            dispatch(setType(value))
        }
    };
    return (
        <ScrollView style={styles.containder} showsVerticalScrollIndicator={false}>
            {
                data.map((item) => (
                    <TouchableOpacity style={styles.item} key={item.name ? item.name : item} onPress={() => handleSelected(item)}>
                        <Text style={styles.text}>
                            {item.name ? item.name : item}
                        </Text>
                    </TouchableOpacity>
                ))
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    containder: {
        height: 75,
        position: 'absolute',
        bottom: -70,
        right: 0,
        zIndex: 1,
    },
    item: {
        borderColor: 'black',
        borderWidth: 0.8,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'white',
        height: 35,
        justifyContent: 'center'
    },
    text: {
        color: '#005A6F',
        fontSize: 15,
        textAlign: 'right',
        marginHorizontal: 5,
    }
})