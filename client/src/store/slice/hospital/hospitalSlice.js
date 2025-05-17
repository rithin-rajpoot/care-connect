import { createSlice } from '@reduxjs/toolkit'
import { registerHospitalThunk , loginHospitalThunk} from './hospitalThunk'

const initialState = {
    isAuthenticated: false,
    hospitalDetails: null,
    loading: false,
    adminDetails:null,

}

const  hospitalSlice = createSlice({
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
             state.isAuthenticated = true;
             state.adminDetails = action?.payload?.responseData?.admin
            //  console.log(action?.payload?.responseData)
        });

        builder.addCase(loginHospitalThunk.rejected, (state, action) => { 
            state.loading = false;
        });


        // REGISTRATION
        builder.addCase(registerHospitalThunk.pending, (state, action) => { 
           state.loading = true
        });

        builder.addCase(registerHospitalThunk.fulfilled, (state, action) => { 
           state.loading = false;
           state.hospitalDetails = action?.payload?.responseData?.HospitalDetails
           state.adminDetails = action?.payload?.responseData?.AdminDetails
          
        //    console.log("HospitalDetails:",action?.payload?.responseData?.HospitalDetails)
        //    console.log("AdminDetails:",action?.payload?.responseData?.AdminDetails)
        });

        builder.addCase(registerHospitalThunk.rejected, (state, action) => { 
           state.loading = false;
        });
    }
})


export const { /* functions in reducers  */ } = hospitalSlice.actions;

export default hospitalSlice.reducer