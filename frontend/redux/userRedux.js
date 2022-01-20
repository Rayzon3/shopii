import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        error: false,
    },

    reducers: {

        loginSuccess: (state, action) => {
            state.user = action.payload;
        },
        loginFaliure: (state) => {
            state.error = true
        },
        logout: (state) => {
            state.user = null;
        },

    }

})

export default userSlice.reducer;
export const { loginSuccess, logout, loginFaliure } = userSlice.actions;