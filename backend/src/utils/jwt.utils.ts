import jwt from 'jsonwebtoken';
import { env } from '../config/env.config';

export const signAccessToken=(userId:string):string=>{
    return jwt.sign({userId},env.jwtAccessSecret,{expiresIn:'15m'});
}

export const signRefreshToken=(userId:string):string=>{
    return jwt.sign({userId},env.jwtRefreshSecret,{expiresIn:'7d'});
}

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.jwtAccessSecret) as { userId: string }
}

export const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, env.jwtRefreshSecret) as { userId: string }
}