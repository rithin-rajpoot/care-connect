import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../../lib/axiosInstance.js'


export const registerHospitalThunk = createAsyncThunk('admin/register',
    async ( {
                hospitalName,
                registrationId,
                hospitalType,
                hospitalEmail,
                hospitalPhno,
                hospitalAddress,
                logoUrl,
                adminName,
                adminEmail,
                adminPassword,}, { rejectWithValue }) => {
        try {
         const hospitalData = {
             hospitalDetails:
                            {
                                hospitalName,
                                registrationId,
                                hospitalType,
                                hospitalEmail,
                                hospitalPhno,
                                hospitalAddress,
                                logoUrl,
                            },
                adminDetails:
                            {
                                adminName,
                                adminEmail,
                                adminPassword,
                            }
                    }
            console.log("inside Thunk:",hospitalData);
            const response = await axiosInstance.post('/admin/register', hospitalData);
            console.log("Registration Success")
            toast.success("Admin registered successful")
             return response?.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            console.log("error in registerPatientThunk:",errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);


export const loginHospitalThunk = createAsyncThunk('admin/login',
    async ( {adminEmail,adminPassword}, { rejectWithValue }) => {
        try {
           
            const response = await axiosInstance.post('/admin/login', {
                adminEmail,
                adminPassword
            });
            toast.success("Login successful")
             return response?.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            console.log("error in loginPatientThunk:",errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);





