import axios from 'axios';
import {URL_GET_SENSOR} from '../../utils/config';

export default class SensorDB {
	SensorDB() {}
	async GetSensorWithGreenHouseID(greenHouseID: any) {
		try {
			const response = await axios.get(URL_GET_SENSOR);
			const data = response.data.body.results;
			return data.filter((item: any) => {
				return item.greenhouseId === greenHouseID;
			});
            // return data;
		} catch (error) {
			console.log('Query sensor error :', error);
		}
	}
}
