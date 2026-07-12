import {Response} from 'express';

import {ApiResponse} from '../types/api.types';

export const sendSuccess=<T>(
    res:Response,
    data:T,
    message:string='Success',
    statusCode:number=200
): void => {
    const response: ApiResponse<T> = {
        success: true,
        data,
        message
    };
    res.status(statusCode).json(response);
};

export const sendError=(
    res:Response,
    error:string,
    statusCode:number=400
):void=>{
    const response:ApiResponse<null>={
        success:false,
        error
    }
    res.status(statusCode).json(response);
}