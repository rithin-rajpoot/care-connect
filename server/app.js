import express from 'express';
import { app, server } from './socket/socket.js'

// Database connection
import {connectDB} from "./db/db.connection.js";
connectDB(); 

// integration
import cors from 'cors';
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send("hey")
})

// routes 



// Start the server 
const port = process.env.PORT || 5000
server.listen(port,()=>{
    console.log(`CareConnect server running on :`, port);
})