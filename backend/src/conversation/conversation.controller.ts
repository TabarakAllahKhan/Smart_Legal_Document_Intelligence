import { Response } from "express";
import { catchAsync } from "../utils/async.utils";
import { sendSuccess,sendError } from "../utils/response.utils";
import { AuthRequest } from "../middlewares/auth.middleware";

import { getUserConversations,getConverstaionWithMessages,deleteConversationById } from "./conversation.service";


export const getConversations = catchAsync(
  async (req: AuthRequest, res: Response): Promise<void> => {
    const userId = req.user!.id
    const documentId = req.query.documentId as string | undefined
    const conversations = await getUserConversations(userId, documentId)
    sendSuccess(res, conversations, 'Conversations fetched successfully')
  }
)

export const getConverstaion=catchAsync(
    async(req:AuthRequest,res:Response):Promise<void>=>{
        const userId=req.user?.id as string;
        const id=req.params.id as string

        const conversation=await getConverstaionWithMessages(id,userId);

        if(!conversation){
            sendError(res,'Conversation not found',404)
            return
        }
        sendSuccess(res,conversation,"Conversation fetched successfully")
    }
)

export const deleteConversation=catchAsync(
    async(req:AuthRequest,res:Response)=>{
        const userId=req.user?.id as string
        const id=req.params.id as string
        await deleteConversationById(id,userId)
        sendSuccess(res,null,'Conversation deleted')
    }
)
