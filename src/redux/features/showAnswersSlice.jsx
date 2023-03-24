import { createSlice } from "@reduxjs/toolkit";

export const showAnswersSlice = createSlice({
    name:'showAnswers',
    initialState:{
        answerDetails:[],
    },
    reducers:{
        setShowAnswers:(state, action)=>{
            state.answerDetails = action.payload
            console.log("answer action payload",action.payload)

        }
    }
})

export const { setShowAnswers } = showAnswersSlice.actions
export default showAnswersSlice.reducer;