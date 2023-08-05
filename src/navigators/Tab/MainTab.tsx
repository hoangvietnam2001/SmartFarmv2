import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {createStackNavigator} from '@react-navigation/stack'
import GreenHouseInfo from "../../screens/GreenHouse/InfoScreen";
import GreenHouseDevice from "../../screens/GreenHouse/DeviceScreen";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();




const MainTab = ({navigation}:{navigation:any}) =>{
    return(
            <Tab.Navigator 
                
                screenOptions={{
                    headerShown: false,
                    tabBarIcon:()=>null,
                    tabBarLabelStyle:{
                        marginVertical:15
                    }
                }}
                
            >
                <Tab.Screen 
                    name="Thông tin" 
                    component={GreenHouseInfo}
                    options={{
                        tabBarLabel:'Thông tin',
                    }}
                />
                <Tab.Screen 
                    name="Device" 
                    component={GreenHouseDevice}
                    options={{
                        tabBarLabel:'Thiết bị'
                    }}
                />
                <Tab.Screen 
                    name="Cảm biến" 
                    component={GreenHouseDevice}
                    options={{
                        tabBarLabel:'Cảm biến'
                    }}
                />
            </Tab.Navigator>
    )
}

export default MainTab;