import express from"express";
//import here the dbconnect
import dbConnect from "../config/dbconnect.js";
//dbconnect
dbConnect();
const app=express();

export default app;