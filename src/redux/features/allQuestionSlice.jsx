import { createSlice } from "@reduxjs/toolkit";

export const allQuestionSlice = createSlice({
  name: "allQuestion",
  initialState: {
    allQuestion: [],
    searchAllQuestion: [],
  },
  reducers: {
    setAllQuestion: (state, action) => {
      state.allQuestion = action.payload;
    },
    
    setSearchAllQuestion: (state, action) => {
      state.searchAllQuestion = action.payload;
      console.log("update redux",action.payload);
    },
  },
});

export const { setAllQuestion, setSearchAllQuestion } =
  allQuestionSlice.actions;
export default allQuestionSlice.reducer;
