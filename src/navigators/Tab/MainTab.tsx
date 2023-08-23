import React, { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import GreenHouseInfo from "../../screens/app/GreenHouse/InfoScreen";
import GreenHouseDevice from "../../screens/app/GreenHouse/DeviceScreen";
import { setDate } from "date-fns";
import GreenHouseDB from "../../services/Relays/GreenHouseDB";
import { useDispatch } from "react-redux";
import RelayDB from "../../services/Relays/RelayDB";
import { setGreenHouse, setRelay } from "../../redux/slices/GreenHouseSlice";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Relay =  new RelayDB();

const MainTab = ({ navigation, route }: { navigation: any, route: any }) => {
    const {GreenHouse} = route.params;
    const dispatch = useDispatch();
    useEffect(()=>{
        async function SetData() {
            dispatch(setGreenHouse(GreenHouse));
            const a = await Relay.GetRelaysByGreenHouseId(GreenHouse.id);
            dispatch(setRelay(a));
        }
        SetData();
    },[])
    return (
        <Tab.Navigator

            screenOptions={{
                headerShown: false,
                tabBarIcon: () => null,
                tabBarLabelStyle: {
                    marginBottom: 15
                },
                tabBarStyle:{
                },
            }}
        >
            <Tab.Screen
                name="Thông tin"
                component={GreenHouseInfo}
                options={{
                    tabBarLabel: 'Thông tin',
                }}
            />



            <Tab.Screen
                name="Device"
                component={GreenHouseDevice}
                options={{
                    tabBarLabel: 'Thiết bị'
                }}
            />
            <Tab.Screen
                name="Cảm biến"
                component={GreenHouseDevice}
                options={{
                    tabBarLabel: 'Cảm biến'
                }}
            />
        </Tab.Navigator>
    )
}
export default MainTab;