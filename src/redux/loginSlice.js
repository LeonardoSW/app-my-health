import { createSlice } from "@reduxjs/toolkit";

const initicalValues ={
    email: '',
    password: ''
};

export const loginSlice = createSlice({
    name: 'login',
    initialState: initicalValues,
    reducers:{
        reducerSetLogin: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
        }
    }
})

export const {reducerSetLogin} = loginSlice.actions

export default loginSlice.reducer