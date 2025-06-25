import { createSlice } from '@reduxjs/toolkit'
import {
    registerHospitalAndAdminThunk, 
    loginAdminThunk,
    getAdminProfileThunk,
    logoutAdminThunk } from './adminThunk'

const initialState = {
   isAdminAuthenticated: false,
   loading: false,
   adminDetails: null,
}

const adminSlice = createSlice({
   name: 'admin',
   initialState,
   reducers: {
      
   },

   extraReducers: (builder) => {
      // Login hospital
      builder.addCase(loginAdminThunk.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(loginAdminThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = true;
         state.adminDetails = action?.payload?.responseData?.adminDetails
         state.loading = false;
      });

      builder.addCase(loginAdminThunk.rejected, (state, action) => {
         state.loading = false;
      });


      // REGISTRATION
      builder.addCase(registerHospitalAndAdminThunk.pending, (state, action) => {
         state.loading = true
      });

      builder.addCase(registerHospitalAndAdminThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = true;
         state.loading = false;
         state.adminDetails = action?.payload?.responseData?.AdminDetails
      });

      builder.addCase(registerHospitalAndAdminThunk.rejected, (state, action) => {
         state.loading = false;
      });

      // Get Admin Profile
      builder.addCase(getAdminProfileThunk.pending, (state, action) => {
         state.loading = true
      });

      builder.addCase(getAdminProfileThunk.fulfilled, (state, action) => {
         state.loading = false;
         state.adminDetails = action?.payload?.responseData?.adminDetails
         // state.hospitalDetails = action?.payload?.responseData?.hospitalDetails
      });

      builder.addCase(getAdminProfileThunk.rejected, (state, action) => {
         state.loading = false;
      });

      // admin logout
      builder.addCase(logoutAdminThunk.pending, (state) => {
         state.loading = true;
      });

      builder.addCase(logoutAdminThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = false;
         state.adminDetails = null;
         state.loading = false;
      });

      builder.addCase(logoutAdminThunk.rejected, (state) => {
         state.loading = false;
      });


   }
})


export const { /* functions in reducers  */ } = adminSlice.actions;

export default adminSlice.reducer