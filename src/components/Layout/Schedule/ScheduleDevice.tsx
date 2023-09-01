import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { URI } from '../../../utils/config';
interface Props{
    navigation?: any
}

export default function ScheduleDevice(props: Props) {
    const [press, setPress] = useState(false);
    const handlePress = () =>{
        setPress(!press);
        props.navigation.navigate('Detail');
    }
    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:!press?'#FFF':'pink'}]} onPress={handlePress}>
            <Text style={styles.name}>Máy bơm</Text>
            <Image style = {styles.image} source={{uri:(URI+'icon TT22 (15).png')}}/>
            <View >
                <Text>Trạng thái</Text>
                <Text style = {styles.status}>Đang bật</Text>
            </View>
        </TouchableOpacity>
    )
}
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: WIDTH / 3,
        height: HEIGHT / 4,
        backgroundColor: 'white',
        borderRadius: 15,
        elevation: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        // justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
        rowGap: 10
    },
    name: {
       top: 10,
       color:'black',
       fontSize: 15,
       fontFamily:'Roboto-Bold'
    },
    image: {
        width: WIDTH/6,
        height: HEIGHT/ 7,
        // backgroundColor:
    },
    status: {
        color: 'green',
        alignSelf:'center'
    }

})