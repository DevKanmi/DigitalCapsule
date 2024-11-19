import { validToken } from "../utils/userAuth.utils";
import { errorResponse, successResponse } from "../utils/responses";

import {Response, NextFunction } from "express";
import { CustomRequest } from "../types/index";

export const tokenAuthentication = async(req: CustomRequest, res: Response, next: NextFunction) : Promise<any> =>{
    const authHeader = req.headers['authorization']

    if(!authHeader) return errorResponse(res, 400, `No token Was found`)
    
    if(authHeader.startsWith('Bearer ')){
        const token = authHeader.replace('Bearer ','')
        
    try{
        const payload= validToken(token)
        if(!validToken) return errorResponse(res, 400, `Token is Invalid`)
        
        req.user = {id: payload.id}
        next()
    }

    catch(error : any){
        if(error.name === "JsonWebTokenError"){
            return errorResponse(res, 400, `Token is Invalid`)
        }
        if(error.name === "TokenExpiredError"){
            return errorResponse(res, 400, `Token has expired`)
        }
        next(error)
    }

    }
    

}