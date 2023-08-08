import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Axios from 'axios';
const URL = 'http://103.160.2.183:5001/api/greenhouses/'
export default class GreenHouseDB {
  GreenHouseDB(){}
  async GetAllGreenHouse(){
    const data = [];
    try{
        const response =await Axios.get('http://222.252.17.89:5000/api/greenhouses/'); 
        data.push( response.data.body.results);
        return data;
    }
    catch(e: any){
        console.log(e.message);
    }
  }

  async GetGreenhouseByFarmId(farmId: any){
    try{
        const response = await Axios.get('http://103.160.2.183:5001/api/greenhouses?farmId='+ farmId);
        const data = response.data.body.results;
        return data;
    }
    catch{
        console.log('không truy vấn được.')
    }
  }
}

