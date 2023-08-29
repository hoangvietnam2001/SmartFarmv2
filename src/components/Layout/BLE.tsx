import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { Text, View, Image } from "react-native";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import IconSim from 'react-native-vector-icons/SimpleLineIcons'
import IconEn from 'react-native-vector-icons/Entypo'
import { Slider } from "react-native-elements";
import { URL } from "../../assets/images/imageurl";
import { shortenText } from "../../constants/Function";
import OptionModal from "./OptionModify";
import { useSelector } from "react-redux";
import RelayDB from "../../services/Relays/RelayDB";
import { setModalAdd } from "../../redux/slices/GreenHouseSlice";

const Relay = new RelayDB();


interface Props {
    style?: StyleProp<ViewStyle>
    route: any,
    onReturnID?: (value: string) => void
}


const BLE: React.FC<Props> = (props: Props) => {
    const [data, setData] = useState(props.route);
    const [Open, setOpen] = useState(false);
    const [loading, setIsLoading] = useState(false);
    const [DIM, setDIM]: any = useState(props.route.values[0].value);
    const [CTCT, setCTCT]: any = useState(props.route.values[1].value);
    const ModalAddCLose = useSelector((state: any) => state.farm.enableModalAdd)
    const handleDIM = (value: number) => {
        setDIM(value);
    }
    const handleCTCT = (value: number) => {
        setCTCT(value);
    }
    const handleClick = () => {
        setOpen(false);
    }
    const handleSaveDIM = async (value: any) => {
        setIsLoading(true);
        const response = await Relay.UpdateStatus(props.route.id, {
            values: [
                {
                    name: "DIM",
                    value: value
                },
            ]
        })
        if (response.code === 200) {
            setIsLoading(false);
        }
    }
    const handleSaveCTCT = async (value: any) => {
        setIsLoading(true);
        const response = await Relay.UpdateStatus(props.route.id, {
            values: [
                {
                    name: "CCT",
                    value: value,
                }
            ]
        })       
        if (response.code === 200) {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (ModalAddCLose.status === false) {
            async function setRoute() {
                const reponse = await Relay.GetARelay(props.route.id);
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
        <View style={[styles.waterbox, props.style, loading ? { backgroundColor: '#8B8989' } : {}]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{shortenText(data.name)}</Text>
                </View>
                <IconSim name="options-vertical" size={20} style={styles.icon} onPress={() => {
                    if (props.onReturnID)
                        props.onReturnID(props.route.id)
                    if (!loading)
                        setOpen(!Open)
                }
                } />
                {Open && (
                    <OptionModal
                        item={props.route}
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
                    </View>
                    {
                        !loading &&
                        <View>
                            <View style={styles.slider}>
                                <Text style={styles.sliderstatus}>DIM</Text>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    allowTouchTrack
                                    value={DIM}
                                    onValueChange={handleDIM}
                                    onSlidingComplete={(value: any) => handleSaveDIM(value)}
                                    thumbTouchSize={{ width: 20, height: 20 }}
                                    thumbProps={{
                                        children: (
                                            <IconEn color={'#FFFF00'} name="light-down" size={20} />
                                        )
                                    }}
                                    thumbStyle={{ width: 20, height: 20, backgroundColor: 'black' }}
                                    minimumTrackTintColor="#FFFF00"
                                    maximumTrackTintColor="black"
                                    style={{
                                        width: Dimensions.get('window').width/3,
                                        marginHorizontal: 10
                                    }}
                                />
                                <View style={styles.percent}>
                                    <Text style={styles.percentnumber}>{DIM}</Text>
                                    <Text style={{ color: 'black' }}>%</Text>
                                </View>
                            </View>
                            <View style={styles.slider}>
                                <Text style={styles.sliderstatus}>CTCT</Text>
                                <Slider
                                    minimumValue={0}
                                    maximumValue={100}
                                    step={1}
                                    allowTouchTrack
                                    value={CTCT}
                                    onValueChange={handleCTCT}
                                    onSlidingComplete={(value: any)=>handleSaveCTCT(value)}
                                    thumbTouchSize={{ width: 20, height: 20 }}
                                    thumbProps={{
                                        children: (
                                            <IconEn color={'#FFFF00'} name="light-down" size={20} />
                                        )
                                    }}
                                    thumbStyle={{ width: 20, height: 20, backgroundColor: 'black' }}
                                    minimumTrackTintColor="#FFFF00"
                                    maximumTrackTintColor="black"
                                    style={{
                                        width: Dimensions.get('window').width/3,
                                        marginHorizontal: 10
                                    }}
                                />
                                <View style={styles.percent}>
                                    <Text style={styles.percentnumber}>{CTCT}</Text>
                                    <Text style={{ color: 'black' }}>%</Text>
                                </View>
                            </View>
                        </View>
                    }
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

    );



};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    header: {
        marginLeft: 28,
        marginTop: 5,
        flexDirection: 'row',
    },
    title: {
        width: WIDTH / 2,
        height: 30,
        lineHeight: 30,
        color: '#13313D',
        fontWeight: '700',
        fontSize: 16,
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
        fontWeight: '400'
    },
    item: {

    },
    waterbox: {
        width: WIDTH,
        height: 150,
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
        // height: WIDTH / 5.5,
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
        marginTop: 10,
    },
    percent: {
        marginLeft: 42,
        lineHeight: 20,
        width: 40,
        flexDirection: 'row'
    },
    percentnumber: {
        textAlign: "center",
        width: 30,
        color: 'black',
        fontSize: 14,
        fontWeight: '700'
    },
    slider: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 5,
    },
    sliderstatus: {
        color: 'black',
        fontSize: 13,
        fontWeight: '700',
        width: 35,
    },
    loading: {
        position: 'absolute',
        alignSelf: 'center'
    },
});
export default BLE;