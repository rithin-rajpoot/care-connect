import axios from "axios";

// Fetch environment variables from Vite configuration
const DB_URL = "http://localhost:9000/careconnect/api"; // THIS WILL CHANGE 

export const axiosInstance = axios.create({
  baseURL : DB_URL,
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  }, 
});
