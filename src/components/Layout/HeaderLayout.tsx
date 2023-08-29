import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from 'react-native-elements'
import { DrawerActions, useNavigation } from '@react-navigation/native'
interface Props {
    navigation?: any
    headerRight?: any
    headerTitle?: string
}
export default function HeaderLayout(props: Props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView >
            <Header
                backgroundColor='#2C698D'
                leftComponent={{
                    icon: 'menu',
                    color: '#fff',
                    size: 30,
                    onPress: () => navigation.dispatch(DrawerActions.openDrawer()),
                }}
                centerComponent={{
                    text: props.headerTitle,
                    style: styles.headerTitle,
                }}
                rightComponent= {props.headerRight}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerTitle: {
        color: 'white',
        lineHeight: 30,
        fontSize: 16,
        fontWeight: '700',
    },
})