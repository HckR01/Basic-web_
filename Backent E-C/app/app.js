import dotenv from 'dotenv';
dotenv.config();

import express from"express";
//import here the dbconnect
import dbConnect from "../config/dbconnect.js";
//dbconnect
dbConnect();
import userRoutes from '../routes/userRoute.js';
const app=express();
//routes
app.use('/,userRoutes')
export default app;