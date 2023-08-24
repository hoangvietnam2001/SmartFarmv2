import React from 'react';
import { StyleProp, ViewStyle, View, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import { setModalAdd, setModalDelete } from '../../redux/slices/GreenHouseSlice';
const func = [
    {
        title: 'Sửa'
    },
    {
        title: 'Xoá'
    }
]


interface Props {
    style?: StyleProp<ViewStyle>;
    onClick:()=>void
    item: {}
}
const OptionModal= (props:Props) => {
    const dispatch = useDispatch();
    const handleSelectTitle = (index: any) => {
        props.onClick?.()
        if (index === 1) {
            dispatch(setModalDelete(true))
        }
        else {
            dispatch(setModalAdd({status: true, type: 1}))
        }
    };
    return (
        <View style={[props.style]}>
            <View>
                {func.map((doc: any, index: number) => (
                    <Button title={doc.title} onPress={() => handleSelectTitle(index)} key={index}></Button>
                ))}
            </View>

        </View>
    )
}


export default OptionModal;


