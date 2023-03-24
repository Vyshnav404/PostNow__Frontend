import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        userDetails:[],
        tokenData:'',
        allUsersDetails:[]
    },
    reducers:{
        setUser:(state, action)=>{
            state.userDetails = action.payload
           
        },
       resetOTP:(state,action)=>{
        state.userDetails.OTP = action.payload
       } ,

       setToken:(state,action)=>{
        state.tokenData=action.payload
       },
       setAllUsersDetails:(state,action)=>{
        state.allUsersDetails = action.payload
       }
    }
})

export const { setUser,resetOTP ,setToken,setAllUsersDetails} = userSlice.actions
export default userSlice.reducer;