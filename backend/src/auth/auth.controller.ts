import {Request,Response} from 'express';
import {catchAsync} from '../utils/async.utils';
import {sendSuccess,sendError} from '../utils/response.utils';
import {registerUser,loginUser,refreshAccessToken,LogoutUser} from './auth.service';
import {RegisterRequest,LoginRequest} from './auth.types';
import { AuthRequest } from '../middlewares/auth.middleware';


const COOKIE_OPTIONS={
    httpOnly:true,
    secure:process.env.Node_ENV==='production',
    sameSite:'strict' as const,
    maxAge:7*24*60*60*1000 // 7 days
}

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
    // Setting refresh Token as httpOnly Cookie
    res.cookie('refreshToken',result.refreshToken,COOKIE_OPTIONS);
    sendSuccess(res,
        {
            accessToken:result.accessToken,
            user:result.user
        },"User registered Successfully",201
    );
}
)

export const LoginUser=catchAsync(async(req:Request,res:Response):Promise<void>=>{
    const body:LoginRequest=req.body;

    if(!body.email || !body.password){
        sendError(res,'Missing required fields',400);
        return;
    }
    const result=await loginUser(body);
    res.cookie("refreshToken",result.refreshToken,COOKIE_OPTIONS)
    sendSuccess(res,{accessToken:result.accessToken,user:result.user},'User Logged in successfully',200);



})

export const refresh=catchAsync(
    async(req:Request,res:Response)=>{
        const {refreshToken}=req.cookies.refreshToken;

        if(!refreshToken){
            sendError(res,"Refresh Token required",400);
            return
        }
        const result=await refreshAccessToken(refreshToken);

        sendSuccess(res,result,"Access token refreshed successfully");
    }
)

export const logout=catchAsync(
    async(req:AuthRequest,res:Response)=>{
        const userId=req.user!.id as string
        await LogoutUser(userId)

        //clear the cookie
        res.clearCookie('refreshToken',COOKIE_OPTIONS)
        sendSuccess(res,null,'Logged out successfully')
    }
)