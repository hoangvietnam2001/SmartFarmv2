
import { URL_RELAYS } from '../../utils/config';
import { ToastAndroid } from 'react-native'
import axios from 'axios';
export default class RelayDB {
    Relay() { };

    async GetAllRelays() {
        try {
            const response = await axios.get(URL_RELAYS);
            const data = response.data.body.results;
            return data;
        }
        catch (e: any) {
            console.log(e.message);
        }
    }
    async GetARelay(param: any) {
        try {
            const response = await axios.get(URL_RELAYS + param)
            return response.data.body;
        }
        catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
            } else {
                console.log(error.message);
            }
        }
    }
    async GetRelaysByGreenHouseId(GreenHouseID: string) {
        try {
            const response = await axios.get(URL_RELAYS);
            const data = response.data.body.results;
            return data.filter((doc: any) => doc.greenhouseId === GreenHouseID);
        }
        catch (e: any) {
            console.log(e.message);
        }
    }
    async Create(params: object) {
        try {
            const response = await axios.post(URL_RELAYS, params);
            return response.data.code;
        }
        catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
            } else {
                console.log(error.message);
            }
        }
    }
    async Delete(params: any) {
        try {
            const response = await axios.delete(URL_RELAYS + params);
            ToastAndroid.show('Xoá thành công', ToastAndroid.SHORT);
            return response.data.code;
        }
        catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
            }
            else {
                console.log(error.message);
            }
        }
    }
    async Update(RelayId: any,params: object) {
        try {
            const response = await axios.patch(URL_RELAYS+RelayId, params);
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.SHORT);
            return response.data.code;
        }
        catch (error: any) {
            if (error.response && error.response.data && error.response.data.message) {
                ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT)
            }
            else {
                console.log(error.message);
            }
        }
    }

}