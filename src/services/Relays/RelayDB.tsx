
import Axios from 'axios';
import { URL_RELAYS } from '../../utils/config';
export default class RelayDB {
    Relay(){};
    
    async GetAllRelays (){
        try{
            const response = await Axios.get(URL_RELAYS); 
            const data = response.data.body.results;
            return data;
        }
        catch(e: any){
            console.log(e.message);
        }
    }
    
}