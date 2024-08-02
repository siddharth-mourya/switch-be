import mongoose from "mongoose";
import { dbConnectionRetries } from "../utils/constant.js";
import logger from "./logger.js";

// Fetures: To make DB connection more managable and robust for error anf debugging
/*
    1. Logging: Adding logs
    2. Env based URI: accessing URI from env
    3. Retry Logic: Retry connection when it fails
    4. Connection Pooling: Handle Mongoose connection events
*/

export const connectToDB = async () => {
    let retries = dbConnectionRetries;
    while(retries) {
        try {
            await mongoose.connect(process.env.MONGO_DB_URI);
            logger.info("Connected sucessfully to database")
            // break out of loop if connected successfully
            break; 
        } catch (err) {
            logger.error("Failed to connect to database", err);
            retries--;
            logger.info(`No of retries left: ${retries}`)
            // wait for 500ms before retrying
            await new Promise(res => setTimeout(res, 500))            
        }
    }
    
    if(!retries) {
        logger.error("Cannot connect even after retries, Exiting...");
        process.exit(1);
    }
}