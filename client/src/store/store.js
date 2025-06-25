import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './slice/patient/patientSlice.js'
import hospitalReducer from './slice/hospital/hospitalSlice.js'
import doctorReducer from './slice/doctor/doctorSlice.js'
import adminReducer from './slice/admin/adminSlice.js'

export const store = configureStore({
    reducer: {
       patientReducer,  
       hospitalReducer,
       doctorReducer,
       adminReducer,
    },
})