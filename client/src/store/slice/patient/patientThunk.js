import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../../lib/axiosInstance.js'


export const loginPatientThunk = createAsyncThunk('patient/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/patient/login', {
                username,
                password
            });
            toast.success("Login successful")
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const registerPatientThunk = createAsyncThunk('patient/register',
    async ({ fullName,username,email,phno,password,DOB,gender,address,}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/patient/register', {
                fullName,
                username,
                email,
                phno,
                password,
                DOB,
                gender,
                address,
            });
            toast.success("Account Created Successfully!!");
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
)

export const getPatientProfileThunk = createAsyncThunk('patient/getProfile',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/patient/get-profile');
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            return rejectWithValue(errorOutput)
        }
    }
);

export const logoutPatientThunk = createAsyncThunk('patient/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/patient/logout');
            toast.success("Logged Out Successfully!!");
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            // console.log(errorOutput)
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);