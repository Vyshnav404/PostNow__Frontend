import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
    name:"friend",
    initialState:{
        friendData:[],
    },
    reducers:{
        setFriendData : (state,action)=>{
            state.friendData = action.payload   
        }
    }

})

export const { setFriendData } = friendSlice.actions
export default friendSlice.reducer;