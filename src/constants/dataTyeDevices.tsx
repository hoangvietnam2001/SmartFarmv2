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







