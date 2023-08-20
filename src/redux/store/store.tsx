// store.js
import {configureStore} from '@reduxjs/toolkit';
import useReducer from '../slices/authSlice';
import authSlice from '../slices/authSlice';
import { Farm } from '../slices/GreenHouseSlice';

const store = configureStore({
	reducer: {
		user: useReducer,
		farm: Farm,
	},
});

export default store;
