import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../lib/axiosInstance.js";
import { toast } from 'react-hot-toast'

export const registerDoctorThunk = createAsyncThunk('doctor/registerDoctor',
    async (formData, { rejectWithValue }) => {
        try {

            const response = await axiosInstance.post('/doctor/register',formData);
            toast.success(response?.data?.message);
            return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const getAllDoctorsThunk = createAsyncThunk('doctor/getAllDoctors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/doctor/all-doctors');
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);





