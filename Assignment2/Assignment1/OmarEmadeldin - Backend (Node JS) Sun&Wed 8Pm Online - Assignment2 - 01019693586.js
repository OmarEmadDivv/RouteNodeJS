const path = require('path');
const fs = require('fs');
const EventEmitter = require('events');
const os = require('os');

// 1. Write a function that logs the current file path and directory.
function logCurrentFileAndDir() {
    console.log(`{File: "${__filename}", Dir: "${__dirname}"}`);
}
logCurrentFileAndDir();

// 2. Write a function that takes a file path and returns its file name.
function getFileName(filePath) {
    return path.basename(filePath);
}
console.log(getFileName('/user/files/report.pdf')); // "report.pdf"

// 3. Write a function that builds a path from an object
function buildPathFromObject(obj) {
    // Adding path.sep handling might be automatic in path.format depending on the object fields
    return path.format(obj);
}
console.log(buildPathFromObject({ dir: "/folder", name: "app", ext: ".js" })); // "/folder/app.js"

// 4. Write a function that returns the file extension from a given file path.
function getFileExtension(filePath) {
    return path.extname(filePath);
}
console.log(getFileExtension('/docs/readme.md')); // ".md"

// 5. Write a function that parses a given path and returns its name and ext.
function parsePathInfo(filePath) {
    const parsed = path.parse(filePath);
    return { Name: parsed.name, Ext: parsed.ext };
}
console.log(parsePathInfo('/home/app/main.js')); // { Name: "main", Ext: ".js" }

// 6. Write a function that checks whether a given path is absolute.
function isPathAbsolute(filePath) {
    return path.isAbsolute(filePath);
}
console.log(isPathAbsolute('/home/user/file.txt')); // true

// 7. Write a function that joins multiple segments
function joinSegments(...segments) {
    return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js")); // src/components/App.js

// 8. Write a function that resolves a relative path to an absolute one.
function resolveToAbsolute(relativePath) {
    return path.resolve(relativePath);
}
console.log(resolveToAbsolute('./index.js')); 

// 9. Write a function that joins two paths.
function joinTwoPaths(path1, path2) {
    return path.join(path1, path2);
}
console.log(joinTwoPaths('/folder1', 'folder2/file.txt')); // /folder1/folder2/file.txt

// 10. Write a function that deletes a file asynchronously.
function deleteFileAsync(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return;
        }
        console.log(`The ${path.basename(filePath)} is deleted.`);
    });
}
// Un-comment to test with a real file:
// deleteFileAsync('./filetodelete.txt');

// 11. Write a function that creates a folder synchronously.
function createFolderSync(folderPath) {
    try {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        console.log("Success");
    } catch (err) {
        console.error(err);
    }
}
createFolderSync("./testFolder");

// 12. Create an event emitter that listens for a "start" event and logs a welcome message.
const emitter = new EventEmitter();
emitter.on('start', () => {
    console.log("Welcome event triggered!");
});
emitter.emit('start');

// 13. Emit a custom "login" event with a username parameter.
emitter.on('login', (username) => {
    console.log(`User logged in: ${username}`);
});
emitter.emit('login', "Ahmed");

// 14. Read a file synchronously and log its contents.
function readFileSyncAndLog(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`the file content => "${content}"`);
    } catch (err) {
        console.error(err.message);
    }
}
// Creating the file simply to show the example in action
fs.writeFileSync('./notes.txt', 'This is a note.');
readFileSyncAndLog('./notes.txt');

// 15. Write asynchronously to a file.
function writeToFileAsync(filePath, content) {
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
        // Async save
    });
}
writeToFileAsync("./async.txt", "Async save");

// 16. Check if a directory exists.
function checkDirectoryExists(dirPath) {
    console.log(fs.existsSync(dirPath));
}
checkDirectoryExists("./notes.txt"); // true

// 17. Write a function that returns the OS platform and CPU architecture.
function getOsInfo() {
    return { Platform: os.platform(), Arch: os.arch() };
}
console.log(getOsInfo()); // {Platform: "win32", Arch: "x64"}
