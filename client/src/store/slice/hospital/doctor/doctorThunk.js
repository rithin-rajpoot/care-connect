import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../lib/axiosInstance.js";



export const registerDoctorThunk = createAsyncThunk('doctor/register-doctor',
    async (formData, { rejectWithValue }) => {
        try {

            console.log("received: ",formData)
            const response = await axiosInstance.post('/doctor/register',formData);
            toast.success(response?.data?.message);
            console.log(response?.data?.responseData?.doctorDetails);
           // return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);






















export const getAllDoctorsThunk = createAsyncThunk('doctor/get-all-doctors',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/doctor/all:hospitalId');
            toast.success("All doctors fetched successfully.!");
            console.log(response?.data?.responseData);
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);





