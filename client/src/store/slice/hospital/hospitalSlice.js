import { createSlice } from '@reduxjs/toolkit'
import { registerHospitalThunk, loginHospitalThunk, getAdminProfileThunk } from './hospitalThunk'

const initialState = {
   isAdminAuthenticated: false,
   hospitalDetails: null,
   loading: false,
   adminDetails: null,

}

const hospitalSlice = createSlice({
   name: 'hospital',
   initialState,
   reducers: {

   },

   extraReducers: (builder) => {
      // Login hospital
      builder.addCase(loginHospitalThunk.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(loginHospitalThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = true;
         state.adminDetails = action?.payload?.responseData?.adminDetails
         state.hospitalDetails = action?.payload?.responseData?.hospitalDetails
         state.loading = false;
      });

      builder.addCase(loginHospitalThunk.rejected, (state, action) => {
         state.loading = false;
      });


      // REGISTRATION
      builder.addCase(registerHospitalThunk.pending, (state, action) => {
         state.loading = true
      });

      builder.addCase(registerHospitalThunk.fulfilled, (state, action) => {
         state.isAdminAuthenticated = true;
         state.loading = false;
         state.hospitalDetails = action?.payload?.responseData?.HospitalDetails
         state.adminDetails = action?.payload?.responseData?.AdminDetails
      });

      builder.addCase(registerHospitalThunk.rejected, (state, action) => {
         state.loading = false;
      });

      // Get Admin Profile
      builder.addCase(getAdminProfileThunk.pending, (state, action) => {
         state.loading = true
      });

      builder.addCase(getAdminProfileThunk.fulfilled, (state, action) => {
         state.loading = false;
         state.adminDetails = action?.payload?.responseData?.adminDetails
         state.hospitalDetails = action?.payload?.responseData?.hospitalId
      });

      builder.addCase(getAdminProfileThunk.rejected, (state, action) => {
         state.loading = false;
      });
   }
})


export const { /* functions in reducers  */ } = hospitalSlice.actions;

export default hospitalSlice.reducer