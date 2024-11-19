import { User } from "../models/users.model";

import { successResponse, errorResponse } from "../utils/responses";
import logger from "../utils/logger";
import { hashPassword, verifyPassword, createtoken } from "../utils/userAuth.utils";
import { Request, Response, NextFunction } from "express";

export const registerUser = async(req: Request, res: Response, next: NextFunction) : Promise<any> =>{
    const {email, username, password} = req.body
    if(!email || !username || !password){
        return errorResponse(res, 400, `Fields Can'\t be left empty`)
    }
    try {
        logger.info(`Attempting to SignUp`)
        const existingUser = await User.findOne({
            $or : [{email}, {username}]
        })

        if(existingUser){
            return errorResponse(res, 400, `User already exist, Login!`)
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await User.create({
            email, 
            username,
            password: hashedPassword
        })

        console.log(newUser.password)

        return successResponse(res, 201, `New User Created Successfully`, newUser)
        
    } catch (error) {
        logger.error(`Failed to Register User: ${error}`)
        
    }
}

export const login = async(req: Request, res: Response, next: NextFunction): Promise<any> =>{
    const{ email, password} = req.body
    if(!email || !password){
        return errorResponse(res, 400, `Fields cannot be left empty`)
    }

    try {
        logger.info(`Attempting to Login`)
        const user = await User.findOne({email})
        if(!user){
            return errorResponse(res, 401, `Invalid Credentials`)
        }
        

        const isPasswordCorrect = await verifyPassword(password, user.password)
        console.log(isPasswordCorrect)
        if(!isPasswordCorrect){
            return errorResponse(res, 401, `Invalid Credentials`)
        }
        const id : any = user._id
        const accessToken = createtoken(id)

        return successResponse(res, 201, `Successfully Logged In`, {user, accessToken})
        
    } catch (error) {
        logger.error(`Error Logging In: ${error}`)
        console.log(error)
        
    }
}