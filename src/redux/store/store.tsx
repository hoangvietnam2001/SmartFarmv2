// store.js
import {configureStore} from '@reduxjs/toolkit';
import useReducer from '../slices/authSlice';
import authSlice from '../slices/authSlice';
import {Farm} from '../slices/GreenHouseSlice';
import {Sensor} from '../slices/sensorSlice';
import { Name } from '../slices/nameSlice';
const store = configureStore({
	reducer: {
		user: useReducer,
		farm: Farm,
		sensor: Sensor,
		name: Name
	},
});

export default store;
