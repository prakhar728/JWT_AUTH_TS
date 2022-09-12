import mongoose from "mongoose";
import config from 'config';
import log from "./logger";

async function connectToDb(){
    const dbURI = config.get<string>("dbURI");

    try {
        await mongoose.connect(dbURI);
        log.info('Connected to DB');
    } catch (error) {
        console.log(error);
        process.exit(1);
        
    }
}

export default connectToDb;