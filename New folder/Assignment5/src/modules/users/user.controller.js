import sequelize from "../../DB/connection.js";
import express from "express";
import userModel from "../../DB/models/Users/user.model.js";
import { where } from "sequelize";
const {Router} = express;

const userRouter = Router();


userRouter.get("/by-email" ,  async (req , res ) =>{
    
    const {email} = req.query;
    const user = await userModel.findOne({where : {email}});

    if(!user){
        return res.status(404).json({message : "User not found"});
    }
    return res.status(200).json({message : "User found successfully", user});
    

});


userRouter.put("/:id" , async (req , res) =>{
    const {id} = req.params;
    const user = await userModel.findByPk(id);
    if(!user){
        return res.status(404).json({message : "no user found"});
    }
    const {name , email , age , role} = req.body;
    await user.update({name , email , age , role});
    return res.status(200).json({message : "User created or updated successfully", user});
})



userRouter.get("/:id" , async(req , res) =>{
    try{
        const {id} = req.params;
        const user = await userModel.findByPk(id ,{
            attributes : {
                exclude : ["role"]   
            }
        });
        if(!user){
            return res.status(404).json({message : "no user found"})
        }
        return res.status(200).json({message : "user found successfully" , user})
    }catch(err){
        console.log(err);
        return res.status(500).json({message : "error in getting user"})
    }
})

export default userRouter