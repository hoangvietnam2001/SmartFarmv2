import React, {useState} from "react";
import { Button, Switch, TouchableOpacity } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View ,Image} from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import IconEn from 'react-native-vector-icons/Entypo'
import Picker from "./Picker";
import { Slider } from "react-native-elements";

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
            {data.map((doc: any, index: number) => (
                <TouchableOpacity onPress={()=>handleSelectTitle(doc.title)} style = {styles.item} key={index}>
                    <Button title={doc.title}></Button>
                </TouchableOpacity>
                ))}
            </View>
            
        </View>
)
}

const Light:React.FC<Props> = ({style}) =>{
    const [isChecked, setCheck] = useState(false);
    const [isEnabled, setEnable] = useState(false);
    const [isShowed, setShow] = useState(false);
    const [Open, setOpen] = useState(false);
    const [value, setValue] = useState(0);
    const handleWater = () =>{
        setEnable(!isEnabled);
    };
    const handleCheck = () =>{
        setCheck(!isChecked);
    };
    const handleShow = () => {
        setShow(!isShowed)
    };
    const handleSlider = (value: number) => {
        setValue(value)
    }
    return(
            <View style = {[styles.waterbox, style]}>
                <View style = {styles.header}>
                    <View>
                        <Text style = {styles.title}>Bóng đèn 1</Text>
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

                        <Image style = {styles.image} source={require("../../assets/images/light.png")}></Image>
                    </View>
                    <View style = {{}}>
                        <View style = {styles.boxStatus}>
                            <Text>Trạng thái:</Text>     
                            <View  style = {styles.percent}>
                                <Text style = {styles.percentnumber}>{value}</Text>
                                <Text style = {{color:'black'}}>%</Text>
                            </View>
                        </View>
                        <View style = {styles.slider}>
                            <Text style = {styles.sliderstatus}>OFF</Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                allowTouchTrack
                                value={value}
                                onValueChange={handleSlider}
                                thumbTouchSize={{width: 20, height:20}}
                                thumbProps={{
                                  children:(
                                    <IconEn color={'#FFFF00'} name="light-down" size = {20}/>
                                  )      
                                }}
                                thumbStyle = {{width: 20,height: 20,backgroundColor:'black'}}
                                minimumTrackTintColor="#FFFF00"
                                maximumTrackTintColor="black"
                                style = {{
                                    width: 150,
                                    marginHorizontal: 10
                                }}
                                />
                            <Text  style = {styles.sliderstatus}>ON</Text>
                            </View>
                        <View style = {styles.boxCheck}>
                            <CheckBox
                                checked={isChecked}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="#81b0ff"
                                containerStyle = {styles.checkbox}
                                onPress={handleCheck}
                                title={'Đặt lịch cho bóng đèn'}
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
    percent:{
        marginLeft: 42,
        lineHeight: 20,
        width: 40,
        borderWidth: 0.5,
        flexDirection:'row'
    },
    percentnumber:{
        width: 25,
        color: 'black',
        fontSize: 14,
        fontWeight:'700'
    },
    slider:{
        flexDirection: 'row',
        alignItems: "center"
    },
    sliderstatus:{
        color:'black',
        fontSize: 13,
        fontWeight:'700'
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
export default Light;