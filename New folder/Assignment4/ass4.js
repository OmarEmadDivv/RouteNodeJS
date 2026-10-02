const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const filePath = (path.join(__dirname , "users.json"));

function readUsers(){
    const users = fs.readFileSync(filePath);
    return JSON.parse(users);
}

app.use(express.json());
app.get("/user" , (req , res) =>{
    return res.status(200).json({message : "Users" , users : readUsers()})
})
app.get("/user/filter" , (req , res)=>{
    const users = readUsers();
    const minAge = req.query.minAge;
    const user = users.filter(user => user.age >= Number(minAge));
    if(user){
        return res.status(200).json({message : "User Found minnn" , user})
    }else{
        return res.status(404).json({message : "User Not Found"})
    }
})


app.get("/user/name/:name" , (req , res , next)=>{
    try{
        const name = req.params.name;
        const users = readUsers();
        const user = users.find(user => user.name === name );
        if(user){
            return res.status(200).json({message : "User Found" , user})
        }else{
            return res.status(404).json({message : "User Not Found"})
        }
    }catch(err){
        console.log("error" , err)
        return res.status(400).json({message : "Error"})
    }
    
})

app.get("/user/id/:id" , (req , res) =>{
    try{
        const id = req.params.id;
        const users = readUsers();
        const user = users.find(user => user.id === Number(id))
        if(user){
            return res.status(200).json({message : "User Found" , user})
        }else{
            return res.status(404).json({message : "User Not Found"})
        }
    }catch(err){
        console.log("error" , err)
        return res.status(400).json({message : "Error"})
    }
})






app.delete("/user{/:id}" , (req , res) => {
    try{
        const id = req.params.id;
        if(!id){
            return res.status(400).json({message : "Please provide user id"})
        }
        const users = readUsers();
        const user = users.findIndex(user => user.id === Number(id));
        if(user !== -1){
            users.splice(user , 1);
            fs.writeFileSync(path.join(__dirname , "users.json") , JSON.stringify(users));
            return res.status(200).json({message : "User deleted successfully"})
        }else{
            return res.status(404).json({message : "User Not Found"})
        }
    }catch(err){
        console.log("error" , err)
        return res.status(400).json({message : "Error"})
    }   
})




app.patch("/user/:id" , (req , res)=>{
    const id = req.params.id
    const users = readUsers();
    const user = users.find(user => user.id === Number(id));
    if(user){
        user.name = req.body.name ?? user.name;
        user.age = req.body.age ?? user.age;
        user.email =req.body.email ?? user.email;
        fs.writeFileSync(path.join(__dirname , "users.json") , JSON.stringify(users));
        return res.status(200).json({message : "User updated successfully" , user})
    }else{
        return res.status(404).json({message : "User Not Found"})
    }

})

app.post("/user" , (req , res) => {
    try{
        
            const users = readUsers();
            const exist = users.find(user => user.id === req.body.id);
            if(!req.body.id){
                req.body.id = users.length + 1;
                return res.status(201).json({message : "User added successfully"})
            }else{
                if(exist){
                    return res.status(400).json({message : "User already exists"})
                }
                else{
                    users.push(req.body);
                    fs.writeFileSync(path.join(__dirname , "users.json") , JSON.stringify(users));
                    return res.status(201).json({message : "User added successfully"} , users);
                }
}
    }
    catch(err){
        console.log(err);
        return res.status(400).json({message : "Error"})
    }

})










app.listen(8000 , () => {
    console.log("Server is running on port 8000");
});