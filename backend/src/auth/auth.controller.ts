import {Request,Response} from 'express';
import {catchAsync} from '../utils/async.utils';
import {sendSuccess,sendError} from '../utils/response.utils';
import {registerUser,loginUser} from './auth.service';
import {RegisterRequest,LoginRequest} from './auth.types';


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

export const LoginUser=catchAsync(async(req:Request,res:Response):Promise<void>=>{
    const body:LoginRequest=req.body;

    if(!body.email || !body.password){
        sendError(res,'Missing required fields',400);
        return;
    }
    const result=await loginUser(body);
    sendSuccess(res,result,'User Logged in successfully',200);



})