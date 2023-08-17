import React, {useState} from 'react';
import { Dimensions, StyleProp } from 'react-native';
import { StyleSheet } from 'react-native';
import { ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Button } from 'react-native';
import { ScrollView, View, Text ,FlatList} from 'react-native';
import SelectCalendarWater from '../components/Layout/OptionModal';
import OptionModal from '../components/Layout/OptionModal';

const MyComponent = () => {
    const [show, setShow] = useState(false);
    const data = [
        { id: 1, title: 'Item 1' },
        { id: 2, title: 'Item 2' },
        { id: 3, title: 'Item 3' },
      ];
    const handleShow = ()=>{
        setShow(!show);
        console.log('click')
    };
    return (
        <View style={styles.container}>
            
           <OptionModal/>
          
        </View>

  );
};
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;
const styles = StyleSheet.create({
    container:{
        width: WIDTH,
        height: HEIGHT,
        position:'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    item:{
        height: 30,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

})



export default MyComponent;