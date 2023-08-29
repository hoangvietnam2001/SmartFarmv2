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
import RelayDB from "../../services/Relays/RelayDB";
import { useSelector } from "react-redux";

const Relay = new RelayDB();

interface Props {
    style?: StyleProp<ViewStyle>
    route: any,
    onReturnID?: (value: string) => void
}


const Light: React.FC<Props> = (props: Props) => {
    const [data, setData] = useState(props.route)
    const [Open, setOpen] = useState(false);
    const [value, setValue] = useState(props.route.values[0].value);
    const [loading, setIsLoading] = useState(false);
    const ModalAddCLose = useSelector((state: any) => state.farm.enableModalAdd)
    const handleSlider = (value: number) => {
        setValue(value)
    }
    const handleClick = () => {
        setOpen(false);
    }
    const handleSave = async (value: any) => {
        setIsLoading(true);
        const response = await Relay.UpdateStatus(props.route.id, { values: [{ name: "DIM", value: value }] })
        if (response.code === 200) {
            setData(response.body);
            setIsLoading(false);
        }
        else {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if (ModalAddCLose.status === false) {
            async function setRoute() {
                const reponse = await Relay.GetARelay(data.id);
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
        <View style={[styles.container, props.style, { backgroundColor: loading ? '#8B8989' : '#FFF' }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{shortenText(data.name)}</Text>
                </View>
                <IconSim name="options-vertical" size={20} style={styles.icon} onPress={() => {
                    if (!loading) {
                        if (props.onReturnID)
                            props.onReturnID(props.route.id)
                        setOpen(!Open)
                    }
                }
                } />
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
                        <View style={styles.percent}>
                            <Text style={styles.percentnumber}>{value}</Text>
                            <Text style={{ color: 'black' }}>%</Text>
                        </View>
                    </View>
                    {
                        !loading &&
                        <View style={[styles.slider]}>
                            <Text style={styles.sliderstatus}>OFF</Text>
                            <Slider
                                minimumValue={0}
                                maximumValue={100}
                                step={1}
                                value={value}
                                onValueChange={handleSlider}
                                onSlidingComplete={(value: any) => handleSave(value)}
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
                            <Text style={styles.sliderstatus}>ON</Text>
                        </View>
                    }
                </View>
            </View>
            {
                loading &&
                (
                    <ActivityIndicator
                        size={'large'}
                        color={'white'}
                        style={styles.loading}
                    />
                )
            }
        </View>
    );
};
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 130,
        borderBottomWidth: 1,
        borderColor: '#DDDDDD',
        justifyContent: 'center'
    },
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
        height: 40,
    },
    sliderstatus: {
        color: 'black',
        fontSize: 13,
        fontWeight: '700',
    },
    loading: {
        position: 'absolute',
        alignSelf: 'center'
    },
});
export default Light;