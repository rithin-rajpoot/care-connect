import express from 'express';
import { app, server } from './socket/socket.js'
import cookieParser from 'cookie-parser';

// Database connection
import {connectDB} from "./db/db.connection.js";
connectDB(); 

// integration
import cors from 'cors';
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(cookieParser()) // for parsing cookie in middleware's
app.use(express.json({ limit: '100mb' }));


// routes 

import patientRouter from './routes/patient.router.js';
app.use('/careconnect/api/patient', patientRouter);

import hospitalRouter from './routes/hospital.router.js';
app.use('/careconnect/api/hospital', hospitalRouter);

import adminRouter from './routes/admin.router.js';
app.use('/careconnect/api/admin', adminRouter);

import doctorRouter from './routes/doctor.router.js';
app.use('/careconnect/api/doctor', doctorRouter);

// error.middleware
import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware);

// Start the server 
const port = process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`CareConnect server running on :`, port);
})