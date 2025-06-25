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

      // admin logout
      builder.addCase(logoutAdminThunk.pending, (state) => {
         state.loading = true;
      });

      builder.addCase(logoutAdminThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = false;
         state.hospitalDetails = null;
         state.adminDetails = null;
         state.loading = false;
      });

      builder.addCase(logoutAdminThunk.rejected, (state) => {
         state.loading = false;
      });


   }
})


export const { /* functions in reducers  */ } = hospitalSlice.actions;

export default hospitalSlice.reducer