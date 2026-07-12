import {Request,Response} from 'express';
import {catchAsync} from '../utils/async.utils';
import {sendSuccess,sendError} from '../utils/response.utils';
import {registerUser} from './auth.service';
import {RegisterRequest} from './auth.types';


export const register=catchAsync(async(req:Request,res:Response):Promise<void>=>{
    const body:RegisterRequest=req.body;
    if(!body.name || !body.email || !body.password){
        sendError(res,'Missing required fields',400);
        return;
    }
    if(body.password.length<8){
        sendError(res,'Password must be at least 8 characters long',400);
        return;
    }
    const result=await registerUser(body);
    sendSuccess(res,result,'User registered successfully',201);
}
)