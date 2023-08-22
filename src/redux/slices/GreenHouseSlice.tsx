import {createSlice} from '@reduxjs/toolkit';

const GreenHouseSlice = createSlice({
	name: 'GreenHouse',
	initialState: {
		farmID: '',
		greenHouseId: '',
		GreenHouses: [],
		Relays: [],
	},
	reducers: {
		setFarmID: (state: any, action: any) => {
			state.farmID = action.payload;
		},
		setGreenHouseId: (state: any, action: any) => {
			state.greenHouseId = action.payload;
		},
		setGreenHouse: (state: any, action: any) => {
			state.GreenHouses = action.payload;
		},
		setRelay: (state: any, action: any) => {
			state.Relays = action.payload;
		},
	},
});

export const {setFarmID, setGreenHouse, setRelay, setGreenHouseId} =
	GreenHouseSlice.actions;
export const Farm = GreenHouseSlice.reducer;
