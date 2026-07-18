import express from "express";
import {Request,Response} from "express";
import authRoutes from "./auth/auth.routes";
import documentRoutes from "./document/document.routes";
import chatRoutes from "./chat/chat.routes";
import conversationRoutes from "./conversation/conversation.routes"
import { errorMiddleware } from "./middlewares/error.middleware";

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

app.use('/api/auth',authRoutes);
app.use('/api/documents',documentRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/conversations',conversationRoutes)
app.use(errorMiddleware)
export default app;
