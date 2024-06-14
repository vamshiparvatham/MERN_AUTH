import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    currentUser: null,
    loading: false,
    error: false,
};

const userSlice  = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInstart: (state)=>{
            state.loading = true;
            state.error = false;
        },
        signInsuccess: (state, action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInfailure :(state, action)=>{
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {signInstart,signInsuccess,signInfailure} = userSlice.actions;

export default userSlice.reducer;