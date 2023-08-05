import React, {useState} from "react";
import { Button, Switch, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View ,Image} from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import SelectCalendarWater from "./OptionModal";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import Picker from "./Picker";

let listCalendar = [
    {
        id: 1,
        title: 'Bật máy buổi chiều'
    },
    {
        id: 2,
        title: 'Chiều'
    },
    {   
        id: 3,
        title: 'Tối'
    }
]
const func = [
    {
        title:'Sửa'
    },
    {
        title:'Xoá'
    }
]
interface Props{
    style: StyleProp<ViewStyle>
}
interface Props2{
    data?: any[];
    style?: StyleProp<ViewStyle>;
    onSelectTitle?: (selectedTitle: string) => void;
}
const OptionModal: React.FC<Props2> = ({data = [], style, onSelectTitle}) =>{
    const handleSelectTitle = (title: string) => {
        if (onSelectTitle) {
          onSelectTitle(title);
        }
      };
    return(
        <View style={[style]}>
            <View>
            {data.map((doc: any) => (
                <TouchableOpacity onPress={()=>handleSelectTitle(doc.title)} style = {styles.item}>
                    <Button title={doc.title}></Button>
                </TouchableOpacity>
                ))}
            </View>
            
        </View>
)
}

const WaterPump:React.FC<Props> = ({style}) =>{
    const [isChecked, setCheck] = useState(false);
    const [isEnabled, setEnable] = useState(false);
    const [isShowed, setShow] = useState(false);
    const [Open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const handleWater = () =>{
        setEnable(!isEnabled);
    };
    const handleCheck = () =>{
        setCheck(!isChecked);
    };
    const handleShow = () => {
        setShow(!isShowed)
    };
    return(
            <View style = {[styles.waterbox, style]}>
                <View style = {styles.header}>
                    <View>
                        <Text style = {styles.title}>Máy bơm 1</Text>
                        <Text style = {styles.ID}>ID: 1</Text>
                    </View>
                    <IconSim name="options-vertical" size = {20} style = {styles.icon} onPress={()=>setOpen(!Open)}/>
                    {Open &&(
                        <OptionModal
                            data={func}
                            style = {styles.option}
                        />
                    )}
                </View>
                <View style = {styles.box}>
                    <View style = {styles.imagebox}>
                        <Image style = {styles.image} source={require("../../components/UI/waterpump.png")}></Image>
                    </View>
                    <View style = {{}}>
                        <View style = {styles.boxStatus}>
                            <Text>Trạng thái:</Text>     
                            <Switch
                                style = {{marginLeft: 42}}
                                value = {isEnabled}
                                trackColor={{false: '#767577', true: '#81b0ff'}}
                                thumbColor={'#81b0ff'}
                                onChange={handleWater}
                            />
                        </View>
                       <Text style = {styles.statustitle}>Đang bật</Text>
                        <View style = {styles.boxCheck}>
                            <CheckBox
                                checked={isChecked}
                                // Use ThemeProvider to make change for all checkbox
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#81b0ff"
                                containerStyle = {styles.checkbox}
                                onPress={handleCheck}
                                title={'Đặt lịch cho máy bơm'}
                                size={20}
                                />
                            
                        </View>
                        <View style = {styles.boxCalendar}>
                            <Text>Lịch: </Text>
                            <Picker
                                value={isShowed}
                                data={listCalendar}
                                style = {{}}
                                
                            />
                        </View>
                        
                    </View>
                </View>
            </View>

    );



};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    header:{
        marginLeft: 28,
        marginTop: 5,
        flexDirection: 'row'
    },
    title:{
        color:'#13313D',
        fontWeight: '700',
        fontSize: 16
    },
    option:{
        position:'absolute',
        backgroundColor:'white',
        left: WIDTH/1.42
    },
    icon:{
        left: WIDTH/1.6,
        top: 10
    },
    ID:{
        color: 'black',
        fontWeight: '400'
    },
    item:{

    },
    waterbox:{
        width: WIDTH,
        
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        marginTop: 5,
    },
    box: {
        flexDirection: 'row'
    },
    imagebox: {
       justifyContent: "center",
       alignItems: "center",
    },
    image:{
        width: WIDTH/ 6.25,
        height: WIDTH/ 6.25 ,
        marginLeft: 28,
        marginRight: 42,
    },
    boxStatus:{
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 0,
    },
    statustitle:{
        fontWeight:'800',
        color: 'black',
        marginBottom:5,
    },
    boxCheck:{
        flexDirection:'row',
        alignItems: "center",
        marginBottom: 8,
    },
    checkbox:{
        padding: 0,
        margin: 0,
        marginLeft: 0,
        backgroundColor:'white',
        borderWidth: 0,
    },
    boxCalendar: {
        flexDirection: "row",
        marginBottom: 15,
        alignItems: "center",
        
    },
    lstCalendar:{
        margin: 0,
        padding: 0,
        marginLeft: 5,
    },
    viewlstCalendar:{
        borderWidth: 0.5,
        bottom: 20,
        backgroundColor:'white',
        borderRadius: 5,
    },
    chevon:{
        flexDirection:'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth:0.5,
        marginLeft: 15,
    }
});
export default WaterPump;