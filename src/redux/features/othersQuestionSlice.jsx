import { createSlice } from "@reduxjs/toolkit";

export const othersQuestionSlice =createSlice({
        name:"othersQuestion",
        initialState:{
            othersQuestiononProfile : []
        },

        reducers:{
                setOthersQuestion:(state,action)=>{
                    state.othersQuestiononProfile = action.payload
                }
        }
})

export const { setOthersQuestion } = othersQuestionSlice.actions
export default othersQuestionSlice.reducer