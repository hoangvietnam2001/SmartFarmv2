import {createSlice} from '@reduxjs/toolkit';

const SensorSlice = createSlice({
	name: 'Sensor',
	initialState: {
		Sensors: [],
	},
	reducers: {
		setSensor: (state: any, action: any) => {
			state.Sensors = action.payload;
		},
	},
});

export const {setSensor} = SensorSlice.actions;

export const Sensor = SensorSlice.reducer;
