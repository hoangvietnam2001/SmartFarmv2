import {createSlice} from '@reduxjs/toolkit';

const NameSlice = createSlice({
	name: 'Name',
	initialState: {
		name: '',
	},
	reducers: {
		setNameUser: (state: any, action: any) => {
			state.name = action.payload;
		},
	},
});

export const {setNameUser} = NameSlice.actions;

export const Name = NameSlice.reducer;
