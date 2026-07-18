import bycrpt from 'bcryptjs';
import prisma from '../config/prisma.config';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt.utils';
import {RegisterRequest,AuthResponse,LoginRequest} from './auth.types';

export const registerUser=async(body:RegisterRequest):Promise<AuthResponse>=>{
    const {name,email,password}=body;
    const existingUser=await prisma.user.findUnique({
        where:{email}
    })
    if(existingUser){
        throw new Error('User already exists');
    }
    // create user
    const passwordHash=await bycrpt.hash(password,12);
    const user=await prisma.user.create({
        data:{name,email,passwordHash}
    })
    // generate tokens
    const accessToken=signAccessToken(user.id);
    const refreshToken=signRefreshToken(user.id);
    return{
        accessToken,
        refreshToken,
        user:{
            id:user.id,
            name:user.name,
            email:user.email
        }
        
    }
}
export const loginUser=async(body:LoginRequest):Promise<AuthResponse>=>{
    const {email,password}=body;
     // check if user exists
    const user=await prisma.user.findUnique({
        where:{email}
    })

    if(!user){
        throw new Error('user not found');
    }
    //compare password
    const isPasswordValid=await bycrpt.compare(password,user.passwordHash);
    if(!isPasswordValid){
        throw new Error('Invalid password');
    }
    // generate tokens
    const accessToken=signAccessToken(user.id);
    const refreshToken=signRefreshToken(user.id);
    return{
        accessToken,
        refreshToken,
        user:{id:user.id,name:user.name,email:user.email}
    }
}

export const refreshAccessToken=async(
    refreshToken:string
)=>{
    try{
        // verify refresh token
        const decoded=verifyRefreshToken(refreshToken);

        // check user exist
        const user=await prisma.user.findUnique({
            where:{id:decoded.userId}
        })
        if(!user){
            throw new Error("User not found")
        }
        const accessToken=signAccessToken(user.id)
        return {accessToken}
    }catch(error){
         throw new Error("Invalid or expired refresh Token")
    }
}

export const LogoutUser=async(userId:string):Promise<void>=>{
    // increment Token version to invalidate all existing tokens
    
    await prisma.user.update({
        where:{id:userId},
        data:{tokenVersion:{increment:1}}
    })
}