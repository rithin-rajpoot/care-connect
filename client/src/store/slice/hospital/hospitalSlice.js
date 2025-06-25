import { createSlice } from '@reduxjs/toolkit'
import {updateHospitalProfileThunk } from './hospitalThunk'

const initialState = {
   hospitalDetails: null,
   loading: false,
}

const hospitalSlice = createSlice({
   name: 'hospital',
   initialState,
   reducers: {
      setHospitalDetails: (state, action) => {
         state.hospitalDetails = action.payload;
      }
   },

   extraReducers: (builder) => {
      
      // Update Hospital Profile
      builder.addCase(updateHospitalProfileThunk.pending, (state) => {
         state.loading = true;
      });

      builder.addCase(updateHospitalProfileThunk.fulfilled, (state, action) => {
         state.hospitalDetails = action?.payload?.responseData?.hospitalDetails;
         state.loading = false;
      });

      builder.addCase(updateHospitalProfileThunk.rejected, (state) => {
         state.loading = false;
      });

   }
})


export const { setHospitalDetails} = hospitalSlice.actions;

export default hospitalSlice.reducer