import {  createSlice} from '@reduxjs/toolkit'

export const adminSlice = createSlice({
    name:'admin',
    initialState:{
        adminToken:'',
    },
    reducers:{
        setAdminToken:(state,action)=>{
            state.adminToken = action.payload
        }
    }
})

export const { setAdminToken } = adminSlice.actions;
export default adminSlice.reducer;