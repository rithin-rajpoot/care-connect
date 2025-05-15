import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './slice/patient/patientSlice.js'

export const store = configureStore({
    reducer: {
       patientReducer,  
    },
})