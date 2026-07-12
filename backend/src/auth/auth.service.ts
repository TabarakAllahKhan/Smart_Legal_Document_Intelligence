import bycrpt from 'bcryptjs';
import prisma from '../config/prisma.config';
import { signAccessToken, signRefreshToken } from '../utils/jwt.utils';
import {RegisterRequest,AuthResponse} from './auth.types';

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