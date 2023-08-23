// store.js
import {configureStore} from '@reduxjs/toolkit';
import useReducer from '../slices/authSlice';
import authSlice from '../slices/authSlice';
import {Farm} from '../slices/GreenHouseSlice';
import {Sensor} from '../slices/sensorSlice';
const store = configureStore({
	reducer: {
		user: useReducer,
		farm: Farm,
		sensor: Sensor,
	},
});

export default store;
