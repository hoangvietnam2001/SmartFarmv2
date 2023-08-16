// store.js
import {configureStore} from '@reduxjs/toolkit';
import useReducer from '../slices/authSlice';

const store = configureStore({
	reducer: {
		user: useReducer,
	},
});

export default store;
