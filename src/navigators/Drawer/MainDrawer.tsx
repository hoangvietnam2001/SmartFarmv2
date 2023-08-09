
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer'
import MainTab from "../Tab/MainTab";
import { View, TouchableOpacity, Alert } from 'react-native'
import Notification from "../../screens/Notification/Notification";
import CustomDrawer from "./CustomDrawer";
import AccountScreen from "../../screens/MyAccount/AccountScreen";
import { createStackNavigator } from "@react-navigation/stack";
import ScheduleScreen from "../../screens/Setting/ScheduleScreen";
import ScriptScreen from "../../screens/Setting/ScriptScreen";
import GreenHouseDB from "../../services/Relays/GreenHouseDB";
import { Header, Icon } from "react-native-elements";
// const ArrGreenHouse = [
//     {
//         id:1 ,
//         name: 'Nhà Kính 1',
//         component: MainTab
//     },
//     {
//         id:2 , 
//         name:'Nhà Kính 2',
//         component: MainTab,
//     },
//     {
//         id:3 ,
//         name:'Nhà Kính 3',
//         component: MainTab,
//     }
// ]
const GreenHouse = new GreenHouseDB();



const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const MainDrawer = () => {
    const [arr, setArr]: any = useState([]);
    useEffect(() => {
        async function GetGreenHouse() {
            const a = await GreenHouse.GetGreenhouseByFarmId('63a3d99dc69cef7476812bea');
            setArr(a);
        }
        GetGreenHouse();
    }, [])
    return (
        <Drawer.Navigator
            screenOptions={{

                headerTitleStyle: {
                    fontSize: 16,
                    color: '#FFF'
                },
                headerStyle: {
                    backgroundColor: '#2C698D',
                }
            }}
            drawerContent={props => <CustomDrawer {...props} />}
        >
            {
                arr.map((doc: any, index: number) => {
                    return (
                        <Drawer.Screen
                            key={index}
                            name={doc.name}
                            component={MainTab}
                            options={{
                                headerRight: () => (
                                    <View style={{ width: 50 }}>
                                        <Icon
                                            name="add-box"
                                            type="MaterialIcons"
                                            size={30}
                                            color={''}
                                            style={{}}
                                            onPress={() => {Alert.alert('Chưa được cung cấp chức năng') }}
                                        />
                                    </View>
                                ),
                            }}
                        />
                    );
                })
            }
            <Drawer.Screen
                name="THÔNG BÁO"
                component={Notification}
            />
            <Drawer.Screen
                name="TÀI KHOẢN CỦA TÔI"
                component={AccountScreen}
            />
            <Drawer.Screen
                name="Lập lịch"
                component={ScheduleScreen}
            />
            <Drawer.Screen
                name="Kịch bản"
                component={ScriptScreen}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawer;

