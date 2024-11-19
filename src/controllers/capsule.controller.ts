import { NextFunction,Response } from "express";
import { Capsule } from "../models/capsule.model";
import { User } from "../models/users.model";
import { errorResponse, successResponse } from "../utils/responses";
import logger from "../utils/logger";
import { decryptContent, encryptContent, sendACapsule } from "../utils/userAuth.utils";
import { CustomRequest } from "../types";
import { sendMail } from "../utils/mailer";


export const createCapsule = async(req: CustomRequest, res: Response, next: NextFunction): Promise<any> =>{
    const userId = req.user?.id
    const {title, content, media, unlockDate} = req.body
    if(!userId){
        return errorResponse(res, 401, `Unauthorized to Access this Route`)
    }
    
    try {
        const user = await User.findById(userId)

        const encryptedContent = encryptContent(content)

        if(!user){
            return errorResponse(res, 400, `User does not exist`)
        }

        const newCapsule = await Capsule.create({
            title,
            content: encryptedContent,
            media ,
            unlockDate : new Date(unlockDate),
            user: user._id,
        })

        if(!newCapsule){
            return errorResponse(res, 400, `Failed to Create a new Capsule`)
        }

        return successResponse(res, 201, `Capsule Created Sucessfully`, newCapsule)


    } catch (error) {
        logger.error(`Failed to Create a new Capsule`)
        return errorResponse(res, 500, `Capsule Could not be created`)
        
    }
}

export const getAllCapsules = async(req: CustomRequest, res: Response, next: NextFunction): Promise<any> =>{
    const userId = req.user?.id
    if(!userId){
        return errorResponse(res, 401, `Unauthorized to Access this Route`)
    }

    
    try {
        const user = await User.findById(userId)

        if(!user){
            return errorResponse(res, 400, `User does not exist`)
        }
    const capsules = await Capsule.find({user: user._id})

    if(!capsules){
        return errorResponse(res, 404, `No Capsule was Found For this User!`)
    }

    return successResponse(res, 200, `Here are the Capsules you created`, capsules)
        
    } catch (error) {
        logger.error(`Failed to get capsules: ${error}`)
        return errorResponse(res, 500, `Capsule Could not be retrieved!`)
        
    }
}

export const unlockCapsuleAndSend = async()=>{

        const batchSize = 50
        const capsulestoUnlock = await Capsule.find({
            unlockDate : {$lt : Date.now()},
            isUnlocked: false
        }).populate('user', {username: 1, email: 1})
            .limit(batchSize)

        capsulestoUnlock.forEach( async(capsule) =>{
            const decrypted = decryptContent(capsule.content)


            await sendACapsule(capsule.user.username, capsule.user.email, capsule.title, decrypted)

            capsule.isUnlocked = true
            await capsule.save()
        })
        
    }


