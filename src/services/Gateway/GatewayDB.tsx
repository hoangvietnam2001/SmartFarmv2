import axios from 'axios';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default class Farms {
	Farm() {}

	async getFarm() {
		try {
			const getAccessToken = await AsyncStorage.getItem('accessToken');
			if (getAccessToken) {
				const accessToken = JSON.parse(getAccessToken).token;

			}
		} catch (error) {}
	}
}
