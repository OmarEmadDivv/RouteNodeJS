const fs = require("fs");
const path = require("path");
const { pipeline } = require("stream");
const zlib = require("zlib")
const pth = "E:\\Route-Nodejs\\Assignment3\\test.txt"
const writePth = "E:\\Route-Nodejs\\Assignment3\\CopiedFile.txt.gz";
const http = require("http");
const { buffer } = require("stream/consumers");
const { error } = require("console");

//fs.writeFileSync(pth , "صل على النبي".repeat(50000))


// 1. Use a readable stream to read a file in chunks and log each chunk.
const readStream = fs.createReadStream(pth ,{
    encoding : "utf8",
    highWaterMark : 60
})
const writeStream = fs.createWriteStream(writePth)

/*


readStream.on("open",(fd)=>{
    console.log("File is opened")
})

readStream.on("data",(chunk)=>{
    setTimeout(() => {
        console.log("data" , chunk)
            readStream.resume()
    }, 2000);
    readStream.pause()
})

readStream.on("end" , ()=>{
    console.log("Reading End")
} )

readStream.on("close" , ()=>{
    console.log("File closed")
} )

// 2. Use readable and writable streams to copy content from one file to another.
//fs.writeFileSync("CopiedFile.txt" , "" , "utf8")

pipeline(readStream ,writeStream , (err)=>{
    if(err){
        console.log("error : " , err)
    }else{
        console.log("El donya tamam la taklak")
    }
})


//3. Create a pipeline that reads a file, compresses it, and writes it to another file.
const zib = zlib.createGzip();
pipeline(
    readStream,
    zib,
    writeStream,
    (err) =>{
        if(err){
            console.log("error :" , err)
        }else{
            console.log("KOLO TAMAM")
        }
    }
)
*/


// Part2
const userDataPath = path.join(__dirname, "userData.json");
let port = 8000
const server = http.createServer((req, res) => {
    const { method, url } = req;
    let body = [];
    //1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before) (1 Grade)
    if (method === "POST" && url === "/user") {
        req.on("data", (chunk) => {
            body.push(chunk)
            console.log("Reciveing user data")
        })

        req.on("end", () => {
            try {
                let parsedBody = Buffer.concat(body).toString();
                const newUser = JSON.parse(parsedBody)

                let fileData = fs.readFileSync(userDataPath)
                let userArray = JSON.parse(fileData)

                const isEmailExist = userArray.find(user => user.email === newUser.email);

                if (isEmailExist) {
                    res.writeHead(404, { "content-type": "application/json" });
                    console.log("The user is already in file data");
                    return res.end(JSON.stringify({ error: "Email already existed" }));
                } else {
                    userArray.push(newUser);

                    fs.writeFileSync(userDataPath, JSON.stringify(userArray, null, 2))
                    res.writeHead(200, { "content-type": "application/json" });
                    console.log("User Added");
                    return res.end(JSON.stringify({ message: "User Added Successfully", user: newUser }));
                }
            } catch (err) {
                console.log("error:", err);
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Something went wrong" }));
            }
        })
    }

    //2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL (1 Grade)
    else if (method === "PATCH" && url.startsWith("/user/")) {
        req.on("data", (chunk) => {
            body.push(chunk)
            console.log("Reciveing user data")
        })

        const parts = url.split("/");
        const userId = parseInt(parts[2]);
        console.log("userID", userId);

        req.on("end", () => {
            try {
                let parsedBody = Buffer.concat(body).toString();
                let updatedData = JSON.parse(parsedBody);

                let fileData = fs.readFileSync(userDataPath);
                let userArray = JSON.parse(fileData);

                let existingUser = userArray.find(user => user.id === userId);

                if (!existingUser) {
                    res.writeHead(404, { "content-type": "application/json" });
                    return res.end(JSON.stringify({ error: "The user doesn't exist" }));
                }

                if (updatedData.email) {
                    let emailTaken = userArray.find(
                        user => user.email === updatedData.email && user.id !== userId
                    );
                    if (emailTaken) {
                        res.writeHead(400, { "content-type": "application/json" });
                        return res.end(JSON.stringify({ error: "This email is already taken by another user" }));
                    }
                    existingUser.email = updatedData.email;
                }

                if (updatedData.name) existingUser.name = updatedData.name;
                if (updatedData.age) existingUser.age = updatedData.age;

                fs.writeFileSync(userDataPath, JSON.stringify(userArray, null, 2));

                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "User updated successfully", user: existingUser }));
            } catch (err) {
                console.log("error:", err);
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "Something went wrong" }));
            }
        });
    } 
    //3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
    else if (method === "DELETE" && url.startsWith("/user/")) 
        {
        const id = url.split("/")[2];
        console.log("DELETE request received, id:", id); 
        
        try {
            let dataFile = fs.readFileSync(userDataPath);
            let userArray = JSON.parse(dataFile);

            const ind = userArray.findIndex(user => user.id === Number(id));
            console.log("user id :", id);
            
            if (ind >= 0) {
                userArray.splice(ind, 1);
                fs.writeFileSync(userDataPath, JSON.stringify(userArray, null, 2));
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify({ message: "User Deleted Successfully" }));
            } else {
                res.writeHead(404, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "User Deletion Failed" }));
            }
        } catch (err) {
            console.log("error:", err);
            res.writeHead(500, { "content-type": "application/json" });
            res.end(JSON.stringify({ error: "Something went wrong" }));
        }
    }
    //4. Create an API that gets all users from the JSON file. (1 Grade)
    else if(method === "GET" && url === "/user"){
        try{
            let fileData = fs.readFileSync(userDataPath , "utf8");
            const userArray = JSON.parse(fileData);

            res.writeHead(200 , {"content-type" : "application/json"});
            res.end(JSON.stringify(userArray));
            
        }catch(error){
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "User sending Failed" }));
        }
    }
    //5. Create an API that gets User by ID. (1 Grade)
    else if(method === "GET" &&  url.startsWith("/user/")){
        let userUrlID = url.split("/")[2];
        try{
            let fileData = fs.readFileSync(userDataPath);
            let userArray = JSON.parse(fileData);

            let isUserExist = userArray.find(user => user.id === Number(userUrlID));

            if(isUserExist){
            res.writeHead(200 , {"content-type" : "application/json"});
            res.end(JSON.stringify(isUserExist))
            }else{
                res.writeHead(404 , {"content-type " : "application/json"});
                res.end(JSON.stringify({message : "User is not found"}))
            }
            
        }catch(error){
                res.writeHead(500, { "content-type": "application/json" });
                res.end(JSON.stringify({ error: "User is not found" }));
        }
    }

    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }


    
})





server.listen(port, 511, () => {
    console.log("Server Running on port ", port);
});

server.on("error", (err) => {
    console.log("error", err);
    if (err.code === "EADDRINUSE") {
        console.log("This server in use..........!");
        console.log("Try another Port");
        ++port;
        server.listen(port, () => {
            console.log("server is running on port :", port);
        });
    }
});







/*
const server = http.createServer((req , res) =>{
    console.log({req});
    const {method , url} = req;
    console.log({method , url});








    res.setHeader("content-type" , "application/json")
    res.write("Request Recived ...............");
    res.write("Method" + req.method);
    //res.write("URL" + req.url);
    res.end(
        /*JSON.stringify({
                data:"This the firt API with nodejs with my hands",
            }), 
            "Response End"
    );
});

console.log(server.req)

server.listen(port ,511, () =>{
    console.log("Server Running on port " , port)
})


server.on("error" , (err)=>{
    console.log("error" , err)
    if(err.code === "EADDRINUSE"){
        console.log("This server in use..........!")
        console.log("Try another Port");
        ++port;
        server.listen(port , ()=>{
            console.log("server is running on port :" , port)
        })
    }
})

server.on("close" , ()=>{
    console.log("close  ")
})
*/
