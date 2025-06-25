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
            const response = await axiosInstance.post('/admin/register', hospitalData);
            toast.success("Admin registered successful")
             return response?.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
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
            console.log("error in loginHospitalThunk:",errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const getAdminProfileThunk = createAsyncThunk('admin/getAdminProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/get-profile');
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const updateHospitalProfileThunk = createAsyncThunk('admin/updateHospital',
    async ({
             hospitalName,
             hospitalEmail,
             hospitalPhno,
             hospitalType,
             hospitalAddress,
        }, { rejectWithValue }) => {
        try {
            const updatedData = {
                  hospitalName,
                  hospitalEmail,
                  hospitalPhno,
                  hospitalType,
                  hospitalAddress,
            }
            console.log("Inside Thunk: ",updatedData)
            const response = await axiosInstance.post('/admin/update-hospital',updatedData);
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const logoutAdminThunk = createAsyncThunk('admin/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/logout');
            toast.success("Logged Out Successfully!!");
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);





