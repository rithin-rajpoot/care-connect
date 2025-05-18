import { createSlice } from '@reduxjs/toolkit'
import { getPatientProfileThunk, loginPatientThunk, logoutPatientThunk, registerPatientThunk } from './patientThunk'

const initialState = {
    isAuthenticated: false,
    patientProfile: null,
    loading: false,
    opBookings:[]
}

const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        bookOp:()=>{
           // book op Here
        },
    },

    extraReducers: (builder) => {
        // Login patient
        builder.addCase(loginPatientThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(loginPatientThunk.fulfilled, (state, action) => { 
            state.patientProfile = action?.payload?.responseData?.patient 
            // console.log("Logged In:",state.patientProfile)
            state.isAuthenticated = true;
            state.loading = false;

        });

        builder.addCase(loginPatientThunk.rejected, (state, action) => { 
            state.loading = false;
        });


        // Sign up user
        builder.addCase(registerPatientThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(registerPatientThunk.fulfilled, (state, action) => {
            state.patientProfile = action.payload?.responseData?.patient;
            state.isAuthenticated = true;
            state.loading = false;
        });

        builder.addCase(registerPatientThunk.rejected, (state, action) => {
            state.loading = false;
        });


        // get patient profile
        builder.addCase(getPatientProfileThunk.pending, (state, action) => {
             state.loading = true;
        });

        builder.addCase(getPatientProfileThunk.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.patientProfile = action.payload?.responseData;
            state.loading = false;
        });

        builder.addCase(getPatientProfileThunk.rejected, (state, action) => {
            state.loading = false;
        });

        // Logout
        builder.addCase(logoutPatientThunk.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(logoutPatientThunk.fulfilled, (state, action) => {
            state.patientProfile = null;
            state.isAuthenticated = false;
            state.loading = false;
        });

        builder.addCase(logoutPatientThunk.rejected, (state, action) => {
            state.loading = false;
        });
    },
})
export const { /* functions in reducers  */ } = patientSlice.actions;

export default patientSlice.reducer