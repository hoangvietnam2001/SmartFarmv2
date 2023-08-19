import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Axios from 'axios';
import { URL_GREEN_HOUSE } from '../../utils/config';
import FarmDB from '../FarmsDB';
const Farm = new FarmDB();
export default class GreenHouseDB {
	GreenHouseDB() {}
	async GetAllGreenHouse() {
		const data = [];
		try {
			const response = await Axios.get(URL_GREEN_HOUSE);
			data.push(response.data.body.results);
			return data;
		} catch (e: any) {
			console.log(e.message);
		}
	}

  async GetGreenhouseByFarmId(farmId: any){
    try{
        const response = await Axios.get(`${URL_GREEN_HOUSE}?farmId=`+ farmId);
        const data = response.data.body.results;
        return data;
    }
    catch{
        console.log('không truy vấn được.')
    }
  }
  
  async GetFarm(){
    const data = Farm.getByUserID('sdasd');
    
    // const Arr:any = [];
    // const b = data.map(async(doc:any)=>{
    //   await Axios.get('http://103.160.2.183:5001/api/farms/'+ doc.ID);
     
    //   // console.log(a.data.msg.name);
    // })
    // console.log(b);
  }
}
