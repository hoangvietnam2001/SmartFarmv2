import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false,
		user: null,
		// farmList: [], // Thêm trường farmList
	},
    reducers:{
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            // state.farmList = action.payload.user.farmList; // Lưu farmList vào Redux Store
          },
        logout(state) {
            state.isAuthenticated = false;
            state.user = null;
            // state.farmList = []; // Xóa farmList khi đăng xuất
          },
    }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;