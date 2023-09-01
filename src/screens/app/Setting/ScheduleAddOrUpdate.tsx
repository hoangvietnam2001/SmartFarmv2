import { Alert, Dimensions, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { HEIGHT, WIDTH } from '../../../constants/Size'
import HeaderLayout from '../../../components/Layout/HeaderLayout'
import { CheckBox, Icon, Slider, Switch } from 'react-native-elements'
import { daysofWeek } from '../../../constants/dataTyeDevices'
import Clock from '../../../components/Items/Clock'


export default function ScheduleAddOrUpdate() {
    const [check, setCheck] = useState(daysofWeek)
    const [name, setName]= useState('')
    const [status, setStatus] = useState(0) //ok
    const [time, setTime] = useState(new Date())
    const [loop, setLoop]: any = useState([])
    const [remind, setRemind] = useState(false); //ok
    const handleSave = () => {
        const object = {
            name: name,
            status: status,
            remind: remind,

        }
        console.log(object)
    }
    const handleSlider = (value: any) => {
        setStatus(value)
    }
    const handleComplete = (value: number) => {

    }
    const handleCheck = (value: any) => {
        const data = [...check]
        if (check[value]) {
            data[value].check = !data[value].check;
            setCheck(data);
        }
    }
    const handleName = (value: string) =>{
        setName(value)
    }
    return (
        <SafeAreaView style={styles.container}>
            <HeaderLayout
                headerTitle='Thêm lịch bóng đèn 1'
                headerRight={{
                    icon: 'check',
                    color: '#FFF',
                    size: 30,
                    onPress: handleSave
                }}
            />
            <ScrollView style={styles.scroll}

                showsVerticalScrollIndicator={false}>
                <View style={styles.viewName}>
                    <Text style={styles.title}>Tên lịch</Text>
                    <View style={styles.viewInput}>
                        <TextInput value = {name} onChangeText={(value)=>handleName(value)} style={styles.viewInput} placeholder='Tên lịch' />
                    </View>
                </View>
                <View style={styles.viewName}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.title}>Trạng thái thiết bị</Text>
                        <Text style={styles.title}>{`${status}`}%</Text>
                    </View>
                    <View style={styles.slider} >
                        <Text style={styles.title}>OFF</Text>
                        <Slider
                            minimumValue={0}
                            maximumValue={100}
                            step={1}
                            value={status}
                            onValueChange={(value) => handleSlider(value)}
                            onSlidingComplete={(value: number) => handleComplete(value)}
                            thumbProps={{
                                children: (
                                    <Icon containerStyle={{ position: 'absolute', top: -15, left: -15 }} color={'#FF0000'} name="light-down" type='entypo' size={30} />
                                )
                            }}
                            thumbStyle={{ width: 0, height: 0, backgroundColor: 'blue' }}
                            minimumTrackTintColor="#FFF"
                            maximumTrackTintColor="#FFF"
                            style={{
                                width: Dimensions.get('window').width / 1.5,
                                marginHorizontal: 15,
                                overflow: 'visible',

                            }}
                        />
                        <Text style={styles.title}>ON</Text>
                    </View>
                </View>
                <View style={styles.viewName}>
                    <Text style={styles.title}>Chọn thời gian</Text>
                    <View style={styles.clockNumber}>
                        <Text style={styles.hour}>07</Text>
                        <Text style={{ fontSize: 30, fontWeight: '600' }}>:</Text>
                        <Text style={styles.minute}>00</Text>
                        <View>
                            <Text style={[styles.time, { backgroundColor: '#E3F6F5' }]}>AM</Text>
                            <Text style={styles.time}>PM</Text>
                        </View>
                    </View>
                    <View style={styles.clock}>
                    <Clock/>
                    </View>
                    <View>

                    </View>
                </View>
                <View style={styles.viewName}>
                    <Text style={styles.title}>Lặp</Text>
                    {
                        check.map((doc: any, index: number) => {
                            return (
                                <View key={index} style={{ justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.title, { width: 100, }]}>{doc.name}</Text>
                                    <CheckBox
                                        checked={check[index].check}
                                        containerStyle={styles.checkbox}
                                        onPress={() => {
                                            handleCheck(index)
                                        }}
                                    />
                                </View>
                            )
                        }
                        )
                    }

                </View>
                <View style={styles.viewName}>
                    <Text style={styles.title}>Nhắc nhở</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.title}>{remind ? 'Bật' : 'Tắt'}</Text>
                        <Switch
                            value={remind}
                            onValueChange={() => { setRemind(!remind) }}

                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: WIDTH,
        height: HEIGHT,
        backgroundColor: 'pink',
        alignItems: 'center',
    },
    scroll: {
        flex: 1,
        width: WIDTH / 1.05,
        // backgroundColor: 'pink',
    },
    viewName: {
        width: WIDTH / 1.05,
        backgroundColor: '#FFF',
        borderRadius: 15,
        elevation: 10,
        padding: 15,
        flexDirection: 'column',
        rowGap: 15,
        marginVertical: 7,
    },
    title: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        color: 'black'
    },
    viewInput: {
        width: WIDTH / 1.5,
        borderWidth: 0.5,
        fontSize: 16,
        borderColor: '#EEEEEE',
        borderRadius: 10,
        color: 'black',
        fontFamily: 'Roboto-Regular'
    },
    slider: {
        flexDirection: 'row',
        alignItems: "center",
        marginBottom: 5,
        height: 40,
    },
    clockNumber: {
        width: WIDTH / 2,
        height: HEIGHT / 15,
        alignSelf: 'center',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 10
    },
    hour: {
        textAlign: 'center',
        width: 50,
        lineHeight: 50,
        fontSize: 35,
        backgroundColor: '#E3F6F5',
        color: '#2C698D',
        fontWeight: '600'
    },
    minute: {
        textAlign: 'center',
        width: 50,
        lineHeight: 50,
        fontSize: 35,
        fontWeight: '600',
        backgroundColor: '#EEEEEE'
    },
    time: {
        width: 25,
        height: 25,
        fontSize: 12,
        textAlign: 'center',
        verticalAlign: 'middle',
        fontWeight: '500'
    },
    clock: {
        width: 200,
        height: 200,
        backgroundColor: 'pink',
        alignSelf: 'center',
        borderRadius: 110,
    },
    checkbox: {
        padding: 0,
        width: 20,
        height: 21,
    }
})