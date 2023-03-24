import { createSlice } from "@reduxjs/toolkit";

export const otherUserSlice = createSlice({
    name:'otherUser',
    initialState:{
        otherUserDetails:[],
    },

    reducers:{
        setOtherUser:(state,action)=>{
            state.otherUserDetails = action.payload
        }
    }
})


export const { setOtherUser } = otherUserSlice.actions
export default otherUserSlice.reducer