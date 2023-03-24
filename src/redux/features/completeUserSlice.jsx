import { createSlice } from "@reduxjs/toolkit";

export const completeUserSlice = createSlice({
    name:"allUsers",
    initialState:{
        usersDetails:[],
    },
    reducers:{
        setUsers:(state,action)=>{
            state.usersDetails = action.payload
        }
    }
})

export const { setUsers } = completeUserSlice.actions
export default completeUserSlice.reducer;