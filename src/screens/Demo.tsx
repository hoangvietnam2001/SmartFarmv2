import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import { ScrollView, View, Text, FlatList } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'react-native-elements';

const number = Array(12).fill(null).map((_, index) => index + 1)

const r = 85; // Bán kính của đồng hồ

const coordinates: any = [];
for (let i = 0; i < 12; i++) {
    const angle = (2 * Math.PI * (i - 5)) / 12;
    const x = r * Math.cos(angle) + 90;
    const y = r * Math.sin(angle) + 90;
    coordinates.push({ x, y });
}

const MyComponent = () => {
    const [value, setValue] = useState(0)
    const pan: any = useRef(new Animated.Value(0)).current;
    const [point, setPoint] = useState(false)

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event(
                [null, { dx: pan }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.extractOffset();
            },
        }),
    ).current;
    const rotate = pan.interpolate({
        inputRange: [0, 360],
        outputRange: ['0deg', '359deg']
    });
    useEffect(() => {
        pan.addListener((value: any) => {
            const num: number = Math.round(value.value);
            if (num % 5 === 0)
                setPoint(true)
            else
                setPoint(false)
        });

        return () => {
            pan.removeAllListeners();
        };
    }, [pan]);
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.clockNumber}>
                    <Text style={styles.hour}>07</Text>
                    <Text style={{ fontSize: 30, fontWeight: '600' }}>:</Text>
                    <Text style={styles.minute}>00</Text>
                    <View>
                        <Text style={[styles.time, { backgroundColor: '#E3F6F5' }]}>AM</Text>
                        <Text style={styles.time}>PM</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.clock]}>
                <Animated.View
                    style={[styles.circleseconds, {
                        transform: [{ rotate }],
                    }]}
                    {...panResponder.panHandlers}>
                    <View style={[styles.row, { transform: [{ rotate: `${value}deg` }] }]}>
                        <Icon
                            name='dot-single'
                            type='entypo'
                            containerStyle={styles.dot}
                            size={10}
                            color={'black'}
                        />
                        <View style={styles.handS}></View>
                        {point === true &&
                        (
                            <View style={styles.light}>
                            </View>
                                )
                        }
                    </View>
                </Animated.View>
                {
                    coordinates.map((doc: any, index: number) => {
                        return (
                            <View key={index} style={[styles.numberclock, { top: doc.x, right: doc.y + 5 }]}>
                                <Text style={{ fontSize: 16, fontWeight: '600' }}>{index + 1}</Text>
                            </View>
                        )
                    })
                }
            </View>

        </View>

    );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        rowGap: 20,
        backgroundColor:'#FFF'
    },
    item: {
        height: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    clock: {
        width: 200,
        height: 200,
        backgroundColor: '#EDEDED',
        borderRadius: 100,
        elevation: 15,
        justifyContent: 'center',
        overflow: 'visible'
    },
    dot: {
        alignSelf: 'center',
        marginLeft: 70,
    },
    handS: {
        width: 65,
        height: 2,
        backgroundColor: 'black',
    },
    numberclock: {
        position: 'absolute',
        overflow: 'visible',
        transform: [],
    },
    circleseconds: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderRadius: 100,
        justifyContent: 'center',
        overflow: 'visible',
        alignSelf: 'center',
    },
    title: {
        fontSize: 15,
        fontFamily: 'Roboto-Bold',
        color: 'black'
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
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    light: {
        width: 30,
        height: 30,
        borderRadius: 20,
        // backgroundColor: '#2C698D',
        // position:'absolute',
    }

})


export default MyComponent;