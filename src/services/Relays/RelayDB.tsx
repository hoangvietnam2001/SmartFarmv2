import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Axios from 'axios';

;
export default class RelayDB {
    Relay(){};
    
    async GetAllRelays (){
        try{
            const response = await Axios.get('http://103.160.2.183:5001/api/relays/'); 
            const data = response.data.body.results;
            return data;
        }
        catch(e: any){
            console.log(e.message);
        }
    }
    
}