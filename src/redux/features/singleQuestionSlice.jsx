import { createSlice } from "@reduxjs/toolkit";

export const singleQuestionSlice = createSlice({
    name:'singleQuestion',
    initialState:{
        questionDetails:'',
        quesId:''
    },
    reducers:{
       setSingleQuestion:(state, action)=>{
            state.questionDetails = action.payload
            console.log(action.payload,"action payload")
        },
        setQuesId :(state,action)=>{
            state.quesId = action.payload
        }
    }
})

export const { setSingleQuestion,setQuesId } = singleQuestionSlice.actions
export default singleQuestionSlice.reducer;