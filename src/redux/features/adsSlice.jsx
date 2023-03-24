import { createSlice } from "@reduxjs/toolkit";

export const adsSlice = createSlice({
  name:"ads",
  initialState:{
    allAds:[]
  },
  reducers:{
    setAllAds :(state,action)=>{
    state.allAds = action.payload
    },
  }

})

export const { setAllAds } = adsSlice.actions
export default adsSlice.reducer;