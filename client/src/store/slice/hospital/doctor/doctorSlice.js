import { createSlice } from '@reduxjs/toolkit'
import { getAllDoctorsThunk } from './doctorThunk';

const initialState = {
   doctors:[],
}

const doctorSlice = createSlice({
   name: 'doctor',
   initialState,
   reducers: {

   },

   extraReducers: (builder) => {
    
      builder.addCase(getAllDoctorsThunk.pending, (state, action) => {
      
      });

      builder.addCase(getAllDoctorsThunk.fulfilled, (state, action) => {
           state.doctors = action?.payload?.responseData?.doctors;
           console.log(action?.payload?.responseData?.doctors)
      });
   }
})


export const { /* functions in reducers  */ } = doctorSlice.actions;

export default doctorSlice.reducer