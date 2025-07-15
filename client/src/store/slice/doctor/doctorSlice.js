import { createSlice } from '@reduxjs/toolkit'
import { getAllDoctorsThunk, getDoctorsByHospitalThunk, registerDoctorThunk } from './doctorThunk';

const initialState = {
   doctors:[],
   loading: false,
   hospitalWiseDoctors: JSON.parse(localStorage.getItem('storeHospitalWiseDoctors')) || null,
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

      // For getting doctors by hospital
      builder.addCase(getDoctorsByHospitalThunk.pending, (state, action) => {
         state.loading = true;
      });

      builder.addCase(getDoctorsByHospitalThunk.fulfilled, (state, action) => {
           const doctorData = action?.payload?.responseData?.doctors;
           localStorage.setItem('storeHospitalWiseDoctors',JSON.stringify(doctorData))
           state.hospitalWiseDoctors = doctorData;
           state.loading = false;
      });

       builder.addCase(getDoctorsByHospitalThunk.rejected, (state) => {
         state.loading = false;
      });

   }
})


export const { /* functions in reducers  */ } = doctorSlice.actions;

export default doctorSlice.reducer