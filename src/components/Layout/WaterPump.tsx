import React, { useState, useEffect, } from "react";
import {Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import { URL } from "../../assets/images/imageurl";
import OptionModal from "./OptionModify";


interface Props {
    style?: StyleProp<ViewStyle>
    route: any,
    status: boolean,
    onReturnID: (value: string) => void
    onClick?: () => void
}


const WaterPump: React.FC<Props> = ({ style, route, status, onReturnID }) => {
    const [isEnabled, setEnable] = useState(route.status === 1 ? true : false);
    const [Open, setOpen] = useState(false);
    const handleWater = () => {
        setEnable(!isEnabled);
    };
    const handleClick = () => {
        setOpen(false);
    }
    useEffect(() => {
        if (Open)
        setTimeout(() => {
            setOpen(false)
        }, 1800);
    }, [Open])
    return (
        <>
            <View style={[styles.waterbox, style]}>
                <View style={styles.header}>
                    <View>
                        <Text
                            style={styles.title}
                        >{route.name}</Text>
                    </View>
                    <IconSim name="options-vertical" size={20} style={styles.icon} onPress={() => {
                        onReturnID(route.id)
                        setOpen(!Open)

                    }} />
                    {Open && (
                        <OptionModal
                            item={route}
                            onClick={handleClick}
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
        </>

    );


};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
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
        marginBottom: 1,
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
        height: 130,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        marginTop: 5,
    },
    box: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imagebox: {
        width: WIDTH / 3.5,
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