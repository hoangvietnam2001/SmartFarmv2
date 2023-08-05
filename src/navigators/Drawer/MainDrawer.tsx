import React from "react";
import {createDrawerNavigator } from '@react-navigation/drawer'
import MainTab from "../Tab/MainTab";
import Notification from "../../screens/Notification/Notification";
import CustomDrawer from "./CustomDrawer";

const Drawer = createDrawerNavigator();

const MainDrawer = () =>{
    return(
        <Drawer.Navigator
            screenOptions={{
                // đổi màu trắng cho biểu tượng
                headerTitleStyle:{
                    fontSize: 16,
                    color: '#FFF'
                },
                headerStyle: {backgroundColor: '#2C698D'}
            }}
            drawerContent={ props =><CustomDrawer {...props}/>}
        >
            <Drawer.Screen 
                name="Nhà kính"
                component={MainTab}
            />
            <Drawer.Screen
                name="Thông báo"
                component={Notification}
            />
        </Drawer.Navigator>
    );
};

export default MainDrawer;