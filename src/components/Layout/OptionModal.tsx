import React, { useState } from "react";
import { View, Text, StyleProp, ViewStyle,StyleSheet, TouchableOpacity } from "react-native";
import IconEnt from 'react-native-vector-icons/Entypo'
import {CheckBox} from 'react-native-elements';
interface Props{
    data?: any[];
    style?: StyleProp<ViewStyle>;
    onSelectTitle?: (selectedTitle: string) => void;
}
const OptionModal: React.FC<Props> = ({data = [], style, onSelectTitle}) =>{
    const [checked, setCheck] = useState<boolean[]>(data.map(()=>false));
    const handleCheck = (index:number) =>{
        const updateChecked = [...checked];
        updateChecked[index] = !updateChecked[index]; 
        setCheck(updateChecked);
    }
    const handleSelectTitle = (title: string) => {
        if (onSelectTitle) {
          onSelectTitle(title);
        }
      };
    return(
        <View style={[ styles.container, style]}>
            <View>
            {data.map((doc: any, index: number) => (
                <TouchableOpacity onPress={()=>handleSelectTitle(doc.title)} style = {styles.item} key={index}>
                    <Text style = {{margin: 5}}>{doc.title}</Text>
                    <CheckBox
                        checked={checked[index]}
                        iconType="material-community"
                        checkedIcon="checkbox-marked"
                        uncheckedIcon="checkbox-blank-outline"
                        checkedColor="#81b0ff"
                        containerStyle = {styles.checkbox}
                        size={20}
                        onPress={()=>handleCheck(index)}
                        />
                </TouchableOpacity>
                ))}
            </View>
            
        </View>
)
}

const styles = StyleSheet.create({
    container:{
        width: 150,
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
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    viewlstCalendar:{
        borderWidth: 0.5,
        bottom: 20,
        backgroundColor:'white',
        borderRadius: 5,
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
export default OptionModal;