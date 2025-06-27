import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'
import { axiosInstance } from '../../../lib/axiosInstance.js'

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
            // console.log("Inside Thunk: ",updatedData)
            const response = await axiosInstance.post('/hospital/update-hospital', updatedData);
            return response.data;

        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput)
        }
    }
);

export const getHospitalsThunk = createAsyncThunk('hospital/getHospitals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/hospital/get-all-hospitals');
            return response.data;
        } catch (error) {
            const errorOutput = error?.response?.data?.errMessage;
            toast.error(errorOutput);
            return rejectWithValue(errorOutput);
        }
    }
);


