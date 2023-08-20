import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		// user: null,
	},
	reducers: {
		loginSuccess(state) {
			state.isAuthenticated = true;
			// state.user = action.payload.user;
		},
		logout(state) {
			state.isAuthenticated = false;
			// state.user = null;
		},
	},
});

export const {loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
