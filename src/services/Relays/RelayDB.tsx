
import { URL_RELAYS } from '../../utils/config';
import {ToastAndroid} from 'react-native'
import axios from 'axios';
export default class RelayDB {
    Relay(){};
    
    async GetAllRelays (){
        try{
            const response = await axios.get(URL_RELAYS); 
            const data = response.data.body.results;
            return data;
        }
        catch(e: any){
            console.log(e.message);
        }
    }
    async GetRelaysByGreenHouseId(GreenHouseID: string){
        try{
            const response = await axios.get(URL_RELAYS);
            const data = response.data.body.results;
            return data.filter((doc: any)=>doc.greenhouseId === GreenHouseID);
        }
        catch(e: any){
            console.log(e.message);
        }
    }
    async Create(params : object){
        console.log(params);
        try{
            const response = await axios.post(URL_RELAYS,params);
            console.log('ok',response.data.code );
            return response.data.code;
        }
        catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
             ToastAndroid.show (error.response.data.message, ToastAndroid.SHORT);
            } else {
              console.log(error.message);
            }
        }   
    }
    async Delete(params: any){
        try{
           const response = await axios.delete(URL_RELAYS + params);
           ToastAndroid.show ('Xoá thành công', ToastAndroid.SHORT);
           return response.data.code;
        }
        catch(error: any){
            if (error.response && error.response.data && error.response.data.message) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
            } 
            else {
                 console.log(error.message);
            }
        }
    }
    
}