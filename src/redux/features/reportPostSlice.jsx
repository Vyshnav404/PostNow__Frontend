import { createSlice } from "@reduxjs/toolkit";

export const reportPostSlice = createSlice({
    name:"reportPost",
    initialState:{
        reportedPost:[]
    },
    reducers:{
        setReportPost :(state,action)=>{
            state.reportedPost=action.payload
        }
    }
})

export const { setReportPost } = reportPostSlice.actions
export default reportPostSlice.reducer