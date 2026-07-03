const path = require('path');
const fs = require('fs/promises');
const EventEmitter = require('events');
const os = require('os');
const { resolve } = require('dns');
const fsSync = require('node:fs');
const { emit } = require('node:cluster');
const { encode } = require('node:punycode');
const { platform } = require('node:os');

let obj1 = {
    dir: "E:\\Route-Nodejs\\Assignment2",
    name: "OmarEmadeldin - Backend (Node JS) Sun&Wed 8Pm Online - Assignment2 - 01019693586",
    ext: ".js",
    path: "E:\\Route-Nodejs\\Assignment2\\OmarEmadeldin - Backend (Node JS) Sun&Wed 8Pm Online - Assignment2 - 01019693586.js"
}

// 1. Write a function that logs the current file path and directory.

function logFileandDirectory(){
console.log(`File : ${__filename}`)
console.log(`Directory : ${__dirname}`)
};

logFileandDirectory();


console.log("--------------------------------------------")


// 2. Write a function that takes a file path and returns its file name.
function getFileName(filePath){
    console.log(`File Name : ${path.basename(filePath)}`)
}

getFileName("E:\Route-Nodejs\Assignment2\OmarEmadeldin - Backend (Node JS) Sun&Wed 8Pm Online - Assignment2 - 01019693586.js");

console.log("--------------------------------------------")



// 3. Write a function that builds a path from an object
function buildPathFromObject(obj){
    console.log(path.format(obj))
}

buildPathFromObject(obj1);

console.log("--------------------------------------------")

// 4. Write a function that returns the file extension from a given file path.
function getFileExtension(pth){
    console.log(`Your Extention is ${path.extname(pth)}`)
}
getFileExtension(obj1.path)


console.log("--------------------------------------------")



// 5. Write a function that parses a given path and returns its name and ext.


function parseThePath(pth){
    const parsed = path.parse(pth)
    return { Name: parsed.name, Ext: parsed.ext };

}

console.log(parseThePath(obj1.path))

console.log("--------------------------------------------")


// 6. Write a function that checks whether a given path is absolute.
function checkAbs(pth){
    if(path.isAbsolute(pth)){
        console.log("true")
        return true
    }else{
        console.log("false")
        return false
    }
}

checkAbs(obj1.path)

console.log("--------------------------------------------")

// 7. Write a function that joins multiple segments
function joinMltplSgmnts(...segs){
    let res = path.join(...segs)
    console.log(res)
    return res
}

joinMltplSgmnts('users', 'omar', 'desktop', 'main.js');

// 8. Write a function that resolves a relative path to an absolute one.
function res2abs(pth){
    console.log(path.resolve(pth))
}

res2abs("./bounus.js")

// 9. Write a function that joins two paths.
function join2pths(pth1 , pth2){
    console.log(path.join(pth1, pth2))
}

join2pths("users\omar\desktop\main.js" , "E:\Route-Nodejs\bounus.js")


// 10. Write a function that deletes a file asynchronously.
async function dltFileAsync(pth){
    try{
        await fs.rm(pth);
        console.log("File is delete");
        return true
    }catch(err){
        console.error("File isn't delete");
        return false
    }
}
dltFileAsync("E:\\Route-Nodejs\\Assignment2\\SAD.TXT")

// 11. Write a function that creates a folder synchronously.
function crtFolderSync(pth){
    try{
        fsSync.mkdirSync(pth)
        console.log("Folder Created Successfully by Sync!")
    }catch(err){
        console.log("Unlucky.... There is an error")
    }
}

crtFolderSync("E:\\Route-Nodejs\\sadAWY")


// 12. Create an event emitter that listens for a "start" event and logs a welcome message.
let emitter = new EventEmitter();

emitter.on("Start" ,(user)=>{
    console.log(`Welcome ${user}`)
})

emitter.emit("Start" , "omar")


// 13. Emit a custom "login" event with a username parameter.
emitter.on("login" , (username , password)=>{
    console.log(`Your username is ${username} and your password is ${password}`)
    console.log(`you logged in successfully`)

})

emitter.emit("login" , "omaremadeldin" , "123456789")


// 14. Read a file synchronously and log its contents.
function readFleSync(pth){
    try{
        let dataa = fsSync.readFileSync(pth , `utf8`)
        console.log("reading file done..")
        console.log(dataa)
    }catch(err){
        console.log("error..")
    }
}
readFleSync("E:\\Route-Nodejs\\Assignment2\\OmarEmadeldin\\tst.txt");

// 15. Write asynchronously to a file.
function writeContent(pth , content){
    try{
        let file = fs.writeFile(pth , content)
        console.log("The content has been written...")
    }catch(err){
        console.log("err...")
    }
}

let text = " صل على النبي عشر مرات"
writeContent("E:\\Route-Nodejs\\Assignment2\\OmarEmadeldin\\tst.txt" , text) 



// 16. Check if a directory exists.
function checkDirExist(dir){
    if(fsSync.existsSync(dir)){
        console.log("Directory Exits")
        return true
    }else{
        console.log("Directory doesn't exist")
        return false
    }
}
checkDirExist("E:\\Route-Nodejs\\Assignment2\\")


// 17. Write a function that returns the OS platform and CPU architecture.
function osandCPUInfo(){
    return{
        platform : os.platform(),
        Architecture : os.arch()
    }
}
console.log(osandCPUInfo())










/*


// 17. Write a function that returns the OS platform and CPU architecture.
function getOsInfo() {
    return { Platform: os.platform(), Arch: os.arch() };
}
console.log(getOsInfo()); // {Platform: "win32", Arch: "x64"}
*/