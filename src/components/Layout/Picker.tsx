import React, { useState } from "react";
import { View, Text, StyleProp, ViewStyle,StyleSheet, TouchableOpacity } from "react-native";
import IconEnt from 'react-native-vector-icons/Entypo'
import OptionModal from "./OptionModal";

interface Props2{
    data?: any[], 
    style?: StyleProp<ViewStyle>, 
    value?: Boolean,
}
const Picker:React.FC<Props2> = ({data, style, value}) =>{
    const [isShowed, setShow] = useState(value);
    const [valuetext, setValue] = useState('Chọn lịch')
    const handleOpen = () =>{
        setShow(true);
    };
    const handleClose = () =>{
        setShow(false);
    };
    const handleSelectTitle = (selectedTitle: string) => {
        // Xử lý thông tin đã chọn từ "Item"
        setValue(selectedTitle)
        setShow(false);
        // Thực hiện hành động cần thiết thông qua các props, ví dụ: 
        // setState, dispatch, gửi thông tin qua mạng, v.v.
      };
    return (
        <View style = {styles.chevon}>
            <Text style = {styles.textvalue}>{valuetext}</Text>
            {!isShowed &&(
                <IconEnt name="chevron-small-up" onPress={handleOpen} size={15} style = {styles.icon}/>
            )}
            { isShowed && (
                <IconEnt name="chevron-small-down" onPress={handleClose} size = {15} style = {styles.icon}/>
            )}
            {isShowed && (
            <OptionModal
                data={data}
                style = {[styles.viewlstCalendar, style]}
                onSelectTitle={handleSelectTitle}
            />
        )}
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        width: 100,
        height: 'auto',
        position:'absolute'
        
    },
    item:{
        height: 30,
        flexDirection:'row',
        alignItems: "center"
    },
    box: {
        width: 100, 
        height: 30,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center"
    },
    viewlstCalendar:{
        borderWidth: 0.5,
        bottom: 21,
        backgroundColor:'white',
        borderRadius: 5,
        borderColor:'black'
    },
    chevon:{
        flexDirection:'row',
        alignItems: "center",
        borderWidth:0.5,
        marginLeft: 15,
        width: 150
    },
    textvalue:{
        marginLeft: 5,
        width: 130,
    },
    icon:{
        padding: 0,
    },
    checkbox:{
        padding: 0,
        margin: 0,
        marginLeft: 0,
        backgroundColor:'white',
        borderWidth: 0,
    },
})
export default Picker;