import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import { State, TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawer = (props: any) =>{
    const {state, descriptors, navigation} = props;
    return(
        <View style = {styles.container}>
            <View style = {styles.header}>
                <View style = {styles.imageView}>
                    <Image style = {styles.accountimage} source={require('../../components/UI/gau.png')}></Image>
                </View>
                <Text>Header</Text>
                <Text>Header@gmail.com</Text>
            </View>
            <DrawerContentScrollView {...props}>
                <View style = {styles.optionView}>
                    {state.routes.map((route:any, index:number)=>{
                        const isFocused = state.index === index;
                        const {options} = descriptors[route.key];
                        const onPress = () =>{
                           const event = navigation.emit({
                            type:'tabPress',
                            target:route.key
                           })
                           if (!isFocused && !event.defaultPrevent){
                                navigation.navigate(route.name);
                           }
                        }

                        const color = isFocused?'#FFFFCC':'#99FF66'
                        return(
                            <View>
                                <View>
                                    <TouchableOpacity onPress={onPress}>
                                        <View style = {styles.item}>
                                            <Text style = {styles.itemname}>{route.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </DrawerContentScrollView>
            <Text></Text>
        </View>
    );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#2C698D'

    },
    header:{
        height: 100,
        marginBottom: 20,

    },
    imageView:{

    },
    accountimage:{
        width: 60,
        height: 60,
        borderRadius: 50,
        resizeMode: 'contain'
    },
    optionView:{
        flex: 1,
        backgroundColor: '#2C698D'
    },
    item:{
        height: 30,
        marginBottom: 10,
        borderRadius: 20,
        justifyContent: 'center',
    },
    itemname:{
        paddingHorizontal: 10,
    }
});

export default CustomDrawer;