import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import React from 'react';
export const  Tab1Screen = () =>{
    return(
        <View></View>
    )
}


const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarIcon: () => null,
        tabBarLabelStyle: {
            marginVertical: 15
        },
        tabBarStyle:{
            borderBottomWidth:5
        },
    }}
    >
      <Tab.Screen
        name="Tab1"
        component={Tab1Screen}
        options={{
          tabBarLabel: 'Tab 1',
        }}
      />
      <Tab.Screen
        name="Tab2"
        component={Tab1Screen}
        options={{
          tabBarLabel: 'Tab 2',
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.tabIcon,
                { borderBottomWidth: focused ? 2 : 0 },
              ]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    flex: 1,
    borderBottomColor: 'blue',
  },
});

export default MyTabs;
