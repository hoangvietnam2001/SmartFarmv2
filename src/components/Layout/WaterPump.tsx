import React, { useState, useEffect, } from "react";
import { ActivityIndicator, Switch } from "react-native";
import { Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import { URL } from "../../assets/images/imageurl";
import OptionModal from "./OptionModify";
import RelayDB from "../../services/Relays/RelayDB";
import { useSelector } from "react-redux";

const Relay = new RelayDB();
interface Props {
    style?: StyleProp<ViewStyle>
    route: any,
    onReturnID: (value: string) => void
    onClick?: () => void
}


const WaterPump: React.FC<Props> = ({ style, route, onReturnID }) => {
    const [data, setData] = useState(route);
    const [loading, setIsLoading] = useState(false);
    const [isEnabled, setEnable] = useState(route.status === 1 ? true : false);
    const [Open, setOpen] = useState(false);
    const ModalAddCLose = useSelector((state: any) => state.farm.enableModalAdd)
    const handleWater = async () => {
        setEnable(!isEnabled);
        setIsLoading(true)
        const reponse = await Relay.UpdateStatus(route.id, { status: (isEnabled === false ? 1 : 0) });
        if (reponse.code === 200) {
            setData(reponse.body)
            setIsLoading(false);
        }
        else {
            setIsLoading(false)
        }

    };
    const handleClick = () => {
        setOpen(false);
    }
    useEffect(() => {
        if (ModalAddCLose.status === false) {
            async function setRoute() {
                const reponse = await Relay.GetARelay(route.id);
                setData(reponse)
            }
            setRoute();
        }
    }, [ModalAddCLose])
    useEffect(() => {
        if (Open)
            setTimeout(() => {
                setOpen(false)
            }, 1800);
    }, [Open])
    return (
        <>
            <View style={[styles.waterbox, style, loading ? { backgroundColor: '#8B8989' } : {}]}>
                <View style={styles.header}>
                    <View>
                        <Text
                            style={styles.title}
                        >{data.name}</Text>
                    </View>
                    <IconSim name="options-vertical" size={20} style={styles.icon} onPress={() => {
                        if (!loading) {
                            onReturnID(route.id)
                            setOpen(!Open)
                        }

                    }} />
                    {Open && (
                        <OptionModal
                            item={data}
                            onClick={handleClick}
                            style={styles.option}
                        />
                    )}
                </View>
                <View style={styles.box}>
                    <View style={styles.imagebox}>
                        <Image style={styles.image} source={{ uri: URL + (data.avatar === 'null' ? 'icon TT22 (9).png' : data.avatar) }}></Image>
                    </View>
                    <View style={{}}>
                        <View style={styles.boxStatus}>
                            <Text>Trạng thái:</Text>
                            {!loading &&
                                <Switch
                                    style={{ marginLeft: 42 }}
                                    value={isEnabled}
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={'#81b0ff'}
                                    onChange={handleWater}
                                    disabled={loading ? true : false}
                                />
                            }
                        </View>
                        <Text style={styles.statustitle}>Đang {isEnabled ? 'Bật' : 'Tắt'}</Text>
                    </View>
                </View>
                {
                    loading &&
                ( 
                    <ActivityIndicator
                    style={styles.loading}
                    size={"large"}
                    color={'#FFF'}
                    />
                    )
                }
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
        justifyContent: 'center'
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
    loading: {
        position:'absolute',
        alignSelf:'center'
    }

});
export default WaterPump;