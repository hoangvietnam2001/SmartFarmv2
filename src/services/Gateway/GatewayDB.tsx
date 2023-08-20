import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { URL_GET_GATEWAY } from '../../utils/config';
export default class Farms {
	Farm() {}

	async getFarm() {
		try {
			const getFarmList =await axios.get(URL_GET_GATEWAY);
		} catch (error) {
			throw error;
		}
	}
}
