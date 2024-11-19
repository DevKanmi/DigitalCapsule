import { config } from "dotenv";
import mongoose from "mongoose";
import logger from "../utils/logger";

config()

const MONGO_URI: any = process.env.MONGO_URI

export const DBconnection = async() =>{
    try{
    await mongoose.connect(MONGO_URI)
    logger.info(`Connected to Database successfuly`)
    }
    catch(error){
        logger.info(`Error Connecting to the Database`)
    }
}