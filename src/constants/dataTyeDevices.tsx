import { useSelector } from "react-redux";





export const arrTypes = [
    {
        value: 0,
        name: 'Thiết bị 1'
    },
    {
        value: 3,
        name: 'Thiết bị 2'
    },
    {
        value: 1,
        name: 'Đèn LED (BLE)'
    },
    {
        value: 2,
        name: 'Chiết  áp (0-10V)'
    }
]
export const arrPin = Array(10).fill(null).map((_, index) => index);
export const arrImage = Array(29).fill(null).map((_, index) => 'icon TT22 (' + (index + 1) + ').png');



export function dataAdd(){
    const GreenHouse = useSelector((state: any) => state.farm.GreenHouse);
    const PIN = useSelector((state: any) => state.farm.Pin)
    const TYPE = useSelector((state: any) => state.farm.Type)
    const nameDevice = useSelector((state: any) => state.farm.nameDevice)
    const image = useSelector((state: any) => state.farm.image)
    
    const object = 
        {
            greenhouseId: GreenHouse.id,
            name: nameDevice,
            avatar: image,
            type: TYPE.value,
            pin: PIN,
        }
    return object;

}




