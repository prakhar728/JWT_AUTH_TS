import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import sendEmail from '../utils/mailer';
export async function createUserHandler(req:Request<{},{},CreateUserInput>,res:Response){
    const body = req.body;
    console.log("Hellow");
    
    try{
        const user = await createUser(body);
        await sendEmail({
            from:"test@example.com",
            to:user.email,
            subject:"Please Verify your account",
            text:`verfication code ${user.verificationCode}. Id:${user._id}`
        });
        return res.status(201).send("User successfully Created");
    }
    catch(e:any){
        if(e.code==11000)
        return res.status(409).send("Account already exists");

        return res.status(500).send(e)
    }
}