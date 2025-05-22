import { createSlice } from '@reduxjs/toolkit'
import { getAllDoctorsThunk, registerDoctorThunk } from './doctorThunk';

const initialState = {
   doctors:[],
   loading: false,
}

const doctorSlice = createSlice({
   name: 'doctor',
   initialState,
   reducers: {

   },

   extraReducers: (builder) => {
    
      builder.addCase(registerDoctorThunk.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(registerDoctorThunk.fulfilled, (state, action) => {
           const doctorData = action?.payload?.responseData?.doctorDetails;
           state.doctors = [...state.doctors, doctorData];
           state.loading = false;
      });

       builder.addCase(registerDoctorThunk.rejected, (state) => {
         state.loading = false;
      });


      builder.addCase(getAllDoctorsThunk.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(getAllDoctorsThunk.fulfilled, (state, action) => {
           const doctorData = action?.payload?.responseData?.doctors;
           state.doctors = doctorData;
           state.loading = false;
      });

       builder.addCase(getAllDoctorsThunk.rejected, (state) => {
         state.loading = false;
      });

   }
})


export const { /* functions in reducers  */ } = doctorSlice.actions;

export default doctorSlice.reducer