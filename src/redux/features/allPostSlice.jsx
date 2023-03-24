import { createSlice } from '@reduxjs/toolkit'

export const allPostSlice = createSlice({
    name:'allPost',
    initialState:{
        allPost:[],
    },
    reducers:{
        setAllPost:(state,action)=>{
            state.allPost = action.payload;
        }
    },
});

export const { setAllPost } = allPostSlice.actions;
export default allPostSlice.reducer;