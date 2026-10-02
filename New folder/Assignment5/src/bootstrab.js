import sequelize from "./DB/connection.js";


import express from "express";
import userRouter from "./modules/users/user.controller.js";
import authRouter from "./modules/auth/auth.controller.js";
import postRouter from "./modules/posts/post.controller.js";
//DB
import userModel from "./DB/models/Users/user.model.js";
import postModel from "./DB/models/Posts/post.model.js";
import commentModel from "./DB/models/Comments/comment.models.js";



const app = express();

app.use(express.json());

app.use("/user", userRouter)
app.use("/auth", authRouter)
app.use("/posts" , postRouter)


try {
await sequelize.sync()
    console.log("DB connection is ready")
} catch (err) {
    console.log("Unable to connect to the database ", err)
}


app.listen(8000 , () => {
    console.log("App is running on port 8000")
})