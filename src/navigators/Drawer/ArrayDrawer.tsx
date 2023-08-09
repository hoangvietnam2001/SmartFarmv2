import React from "react"; 
import MainTab from "../Tab/MainTab";
import Notification from "../../screens/Notification/Notification";
import AccountScreen from "../../screens/MyAccount/AccountScreen";


export const ArrayDrawer = [
    {
        id: 1,
        name:"NHÀ KÍNH",
        parentID: 0,
    },
    {
        id: 2,
        name:'THÔNG BÁO',
        parentID: 0,
    },
    ,{
        id : 7,
        name: 'CÀI ĐẶT',
        parentID: 0,
    },
    {
        id: 8, 
        name:'Lập lịch',
        parentID: 7,
    },
    {
        id: 9, 
        name:'Kịch bản',
        parentID: 7,
    },
    {
        id: 3, 
        name:'TÀI KHOẢN CỦA TÔI',
        parentID: 0,
    },
];