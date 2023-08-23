import axios from 'axios';
import {getUrlDeviceScan} from '../../utils/config';

export default class DeviceScanDB {
	DeviceScanDB() {}

	async queryDeviceScan(idGateway: string) {
		try {
			const response = await axios.get(getUrlDeviceScan(idGateway));
			const data = response.data;
			return data;
		} catch (e: any) {
			console.log('không truy vấn được.' + e.message);
		}
	}
}
