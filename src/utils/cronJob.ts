import cron from "node-cron"
import { unlockCapsuleAndSend } from "../controllers/capsule.controller"
import logger from "./logger"

export const sendCapsules = cron.schedule("0 0 * * *", async() =>{
    try{
        await unlockCapsuleAndSend()
        console.log(`Capsules Successully Sent out!`)
    }
    catch(error){
        logger.error(`Failed to Send out Capsules`)
    }

})

