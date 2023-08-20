import axios from 'axios';
import React from 'react';


export default class FarmDB{
    FarmDB(){
    }

    async getByUserID(UserID: string) {
        const data: any = [];
        const data2 =await axios.get('http://103.160.2.183:5001/api/Users?name=Menosss');
        const arr = data2.data.body.results;
        arr.map((doc: any)=>{
            doc.farmList.map((item: any)=>{
                data.push(item);
            })
        
        })
        return data;
    }
    async getByUserID2(UserID: string) {
        const data2 =await axios.get('http://103.160.2.183:5001/api/Users?name=Menosss');
        const data = data2.data.body.results[0].farmList;
        return data;
    }
}