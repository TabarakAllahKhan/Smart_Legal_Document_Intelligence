import { Request,Response,NextFunction } from "express";

import { sendError } from "../utils/response.utils";

export const errorMiddleware=(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
):void=>{
    console.error("Error:",err.message);

    //gemini quota error
    if(err.message.includes('429') || err.message.includes('quota')){
        sendError(res,'Ai service is temporarily unavailable.Plz try again later',503);
        return

    }

    // prisma errors 
    if(err.message.includes("PrismaClient")){
        sendError(res,'Database error occured',500);
        return
    }

    // default
    sendError(res,err.message || "Internal server error",500);


}