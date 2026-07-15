import { Response } from "express";

import { catchAsync } from "../utils/async.utils";
import { sendSuccess,sendError } from "../utils/response.utils";
import { AuthRequest } from "../middlewares/auth.middleware";

import { uploadDocument,getUserDocuments,getDocumentById,deleteDocument } from "./document.service";

export const uploadController=catchAsync(async(req:AuthRequest,res:Response):Promise<void>=>{
    if(!req.file){
        sendError(res,'No file uplaoded',400);
        return
    }

    const userId=req.user!.id;
    const result=await uploadDocument(userId,req.file);
    sendSuccess(res,result,'Document uploaded successfully',201);

})

export const getDocuments=catchAsync(async(req:AuthRequest,res:Response):Promise<void>=>{
    const userId=req.user!.id;
    const documents=await getUserDocuments(userId);
    sendSuccess(res,documents,'Documents fetched successfully');

})

export const getDocument=catchAsync(async(req:AuthRequest,res:Response):Promise<void>=>{
    const userId=req.user!.id;
    const id=req.params.id as string;

    const document=await getDocumentById(id,userId)

    if(!document){
        sendError(res,"Document not found");
        return
    }
    sendSuccess(res,document,'Document fetched successfully');
})

export const removeDocument=catchAsync(async(req:AuthRequest,res:Response):Promise<void>=>{
    const userId=req.user!.id;
    const id = req.params.id as string
    await deleteDocument(id,userId)
    sendSuccess(res,null,'Document deleted successfully');
})