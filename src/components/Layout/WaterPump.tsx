import React, { useState , useEffect,} from "react";
import { Button, Switch, TouchableOpacity, TextInput } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import { URL } from "../../assets/images/imageurl";

const func = [
    {
        title: 'Xoá'
    }
]
interface Props {
    style: StyleProp<ViewStyle>
    route: any,
    onPress: any,
    status: boolean, 
}
interface Props2 {
    data?: any[];
    style?: StyleProp<ViewStyle>;
    onSelectTitle?: (selectedTitle: string) => void;
}
const OptionModal: React.FC<Props2> = ({ data = [], style, onSelectTitle }) => {
    const handleSelectTitle = (title: string) => {
        if (onSelectTitle) {
            onSelectTitle(title);
        }
    };
    return (
        <View style={[style]}>
            <View>
                {data.map((doc: any, index: number) => (
                    <TouchableOpacity onPress={() => handleSelectTitle(doc.title)} style={styles.item} key={index}>
                        <Button title={doc.title}></Button>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    )
}

const WaterPump: React.FC<Props> = ({ style, route, onPress, status }) => {
    const [isEnabled, setEnable] = useState(route.status === 1 ? true : false);
    const [Open, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [valueEdit, setValueEdit] = useState(route.name);
    const handleWater = () => {
        setEnable(!isEnabled);
    };
    const handleChangeText = (value: string) => {
            setValueEdit(value);
    }
    
    useEffect(()=>{
    },[status])
    return (
        <View style={[styles.waterbox, style]}>
            <View style={styles.header}>
                <View>
                    {/* hiển thị tên Máy bơm */}
                    {
                        isEdit === true ?
                            <TextInput
                                style={styles.edit}
                                value={valueEdit}
                                onChangeText={(value) => handleChangeText(value)}
                                onBlur={() => {
                                    setEdit(false)
                                }}
                                placeholder={route.name}
                                autoFocus
                            />
                            :
                            <Text
                                onLongPress={() => {
                                    onPress()
                                }}
                                onPress={()=>{}}
                                style={styles.title}
                            >{valueEdit}</Text>
                    }

                    {/* Hiển thị ID máy bơm */}
                </View>

                <IconSim name="options-vertical" size={20} style={styles.icon} onPress={() => setOpen(!Open)} />
                {Open && (
                    <OptionModal
                        data={func}
                        style={styles.option}
                    />
                )}
            </View>
            <View style={styles.box}>
                <View style={styles.imagebox}>
                    <Image style={styles.image} source={{ uri: URL + route.avatar }}></Image>
                </View>
                <View style={{}}>
                    <View style={styles.boxStatus}>
                        <Text>Trạng thái:</Text>
                        {/* Công tắc máy bơm */}
                        <Switch
                            style={{ marginLeft: 42 }}
                            value={isEnabled}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={'#81b0ff'}
                            onChange={handleWater}
                        />
                    </View>
                    <Text style={styles.statustitle}>Đang {isEnabled ? 'Bật' : 'Tắt'}</Text>
                </View>
            </View>
        </View>

    );


};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    header: {
        marginLeft: 28,
        marginTop: 5,
        flexDirection: 'row'
    },
    title: {
        width: WIDTH / 2,
        height: 30,
        lineHeight: 30,
        color: '#13313D',
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 15,
    },
    edit: {
        width: WIDTH / 2,
        height: 30,
        padding: 0,
        marginBottom: 15,

    },
    option: {
        position: 'absolute',
        backgroundColor: 'white',
        left: WIDTH / 1.42
    },
    icon: {
        left: WIDTH / 3.1,
        top: 10
    },
    ID: {
        color: 'black',
        fontWeight: '400',
        width: WIDTH / 1.5,
    },
    item: {

    },
    waterbox: {
        width: WIDTH,
        height: HEIGHT / 5.5,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        marginTop: 5,
    },
    box: {
        flexDirection: 'row'
    },
    imagebox: {
        width: WIDTH / 3.5,
        height: WIDTH / 5.5,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: WIDTH / 5.5,
        height: WIDTH / 5.5,
    },
    boxStatus: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 0,
    },
    statustitle: {
        fontWeight: '800',
        color: 'black',
        marginBottom: 5,
    },
    boxCheck: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 8,
    },

});
export default WaterPump;