import React, {useEffect, useState} from 'react';
import { StyleProp, ViewStyle, View, Button } from 'react-native'
import { useDispatch } from 'react-redux';
import {
    setModalAdd, setModalDelete, setImage as setImg
    ,setNameDevice as setDevice
    ,setPin as setPIN
    ,setType as setTYPE
}
    from '../../redux/slices/GreenHouseSlice';
import RelayDB from '../../services/Relays/RelayDB';
import { arrTypes } from '../../constants/dataTyeDevices';


const Relay = new RelayDB();
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
    onClick: () => void
    item: any
}
const OptionModal = (props: Props) => {
    const [data,setData]:any = useState({})
    const dispatch = useDispatch();
    const handleSelectTitle = async (index: any) => {
        props.onClick?.()
        if (index === 1) {
            dispatch(setModalDelete(true))
        }
        else {
            dispatch(setImg(data.avatar))
            dispatch(setDevice(data.name))
            dispatch(setPIN(data.pin))
            const type = arrTypes.find(doc => doc.value === data.type);
            dispatch(setTYPE(type))
            dispatch(setModalAdd({ status: true, type: 1 }))
        }
    };
    useEffect(()=>{
        async function Device() {
            const response = await Relay.GetARelay(props.item.id);
            setData(response);
        }
        Device();
    },[])
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


function setNameDevice(name: any): any {
    throw new Error('Function not implemented.');
}

function setPin(pin: any): any {
    throw new Error('Function not implemented.');
}

function setImage(avatar: any): any {
    throw new Error('Function not implemented.');
}

function setType(type: any): any {
    throw new Error('Function not implemented.');
}

