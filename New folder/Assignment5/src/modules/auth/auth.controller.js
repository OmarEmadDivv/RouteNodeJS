import { Router } from "express";
import userModel from "../../DB/models/Users/user.model.js";


const authRouter = Router();


authRouter.post("/signup", async(req ,res)=>{
    try {
        const {name , email , password} = req.body;
        const existingUser = await userModel.findOne({where : {email}});
        if(existingUser){
            return res.status(400).json({message : "User already exists"});
        }
        const user = await userModel.build({name , email , password});
        await user.save();
        return res.status(201).json({message : "User added successfully", user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "error in signup"});
    }
})


export default authRouter