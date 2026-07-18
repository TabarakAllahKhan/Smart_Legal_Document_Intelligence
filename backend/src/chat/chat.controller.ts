import { Response } from "express";
import { catchAsync } from "../utils/async.utils";
import { sendSuccess,sendError } from "../utils/response.utils";
import { AuthRequest } from "../middlewares/auth.middleware";
import { processChat } from "./chat.service";
import { ChatRequest } from "./chat.types";

export const chatController=catchAsync(
    async(req:AuthRequest,res:Response):Promise<void>=>{
        const {question}=req.body
        const documentId=req.params.documentId as string
        const conversationId=req.params.conversationId as string

        if(!question||!documentId){
            sendError(res,"Question is required",400);
            return
        }

        if(question.trim().length < 3){
            sendError(res,"Question is too short",400);
            return
        }

        const userId=req.user?.id as string;

        const result=await processChat(
            userId,
            {question,documentId},
            conversationId || undefined
        )
        sendSuccess(res,result,"Answer Generated Successfully")

    }
)