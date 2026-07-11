import express from "express";
import {Request,Response} from "express";

import cors from "cors";

const app=express();

//middlewares

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

//health check

app.get("/health",(req:Request,res:Response)=>{
       res.json({
        "status":"ok",
        "message":"Server is running"
       })
})

export default app;
