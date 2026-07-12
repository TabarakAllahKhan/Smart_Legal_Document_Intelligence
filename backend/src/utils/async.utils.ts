
// This file contains the utility function to cathch
// the async errors in the express controllers and pass it to the error handling middleware
// In short we dont have to write try catch block in every controller function, we can just wrap the controller function with this catchAsync function and it will handle the errors for us
import {Request,Response,NextFunction} from 'express';

type AsyncController=(
    req:Request,
    res:Response,
    next:NextFunction
)=>Promise<void>;

export const catchAsync=(fn:AsyncController)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch(next);
    }
}