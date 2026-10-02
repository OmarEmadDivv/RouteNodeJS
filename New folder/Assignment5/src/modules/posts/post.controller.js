import express from "express"
import sequelize from "../../DB/connection.js";
import postModel from "../../DB/models/Posts/post.model.js"
import userModel from "../../DB/models/Users/user.model.js";
import { Router } from "express";

const postRouter = Router();

postRouter.post("/" , async (req , res , next) =>{
    const {content , userId} = req.body
    try{
        const userExist = await userModel.findByPk(userId);
        if(!userExist){
            return res.status(404).json({message : "User Not Found"})
        }
        const post = await postModel.create({
            content : content,
            userId : userId
        })
        return res.status(200).json({message : "Post Created Successfully"})
    }catch(err){
        return res.status(500).json({message : "Post Creation Failed"})
    }
})


postRouter.delete("/:postId" , async(req , res , next) =>{
    const userId = req.body.userId
    const {postId} = req.params
    try{
           const userExist = await userModel.findByPk(userId);
    const post = await postModel.findByPk(postId)
    if(!userExist){
        return res.status(404).json({message : "User Not Found"})
    }

    if (!post) {
    return res.status(404).json({ message: "Post Not Found" });
}
    if(userExist.id !==  post.userId){
        return res.status(403).json({message : "You Aren't Authorized to delete the post"})
    }else{
        await post.destroy();
        return res.status(200).json({message : "Post Deleted Successfully"})
    }
    }catch(err){
        return res.status(500).json({message : "Post Deletion Failed"})
    }

 

})

export default postRouter