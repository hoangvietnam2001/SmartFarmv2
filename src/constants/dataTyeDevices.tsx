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

export const daysofWeek = [
    {
        id: 1,
        name:'Thứ 2',
        check:false,
    },
    {
        id: 2,
        name:'Thứ 3',
        check:false,

    },
    {
        id: 3,
        name:'Thứ 4',
        check:false,
    },
    {
        id:4,
        name:'Thứ 5',
        check:false,
    },
    {
        id: 5,
        name:'Thứ 6',
        check:false,
    },
    {
        id: 6,
        name:'Thứ 7',
        check:false,
    },
    {
        id: 7,
        name:'Chủ nhật',
        check: false
    }
]


export const arrPin = Array(10).fill(null).map((_, index) => index);
export const arrImage = Array(29).fill(null).map((_, index) => 'icon TT22 (' + (index + 1) + ').png');







