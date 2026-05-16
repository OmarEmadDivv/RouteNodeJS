// Convert the string "123" to a number and add 7. (0.5 Grade)
x ="123"
x = Number(x)
z = x + 7
console.log(z)

// Check if the given variable is falsy and return "Invalid" if it is. (0.5 Grade)
x = false;

function falsy() {
    if (!x) {
        console.log("Value is Invalid")
        return "Invalid"
    }
}

console.log(falsy())

// Use for loop to print all numbers between 1 and 10, skipping even numbers using continue (0.5 Grade)
for(let x = 1 ; x <= 10 ; x++)
    {
        if (x % 2 == 0){
            continue;
        }
        console.log(x);
    
    }

//Create an array of numbers and return only the even numbers using filter method. (0.5 Grade)
arr = [1,2,3,4,5,6,7,8,9,10]
let evenNumbers = arr.filter(x => x % 2 == 0)
console.log(evenNumbers)

// Use the spread operator to merge two arrays, then return the merged array. (0.5 Grade)
arr1 = [1,2,3]
arr2 = [4,5,6]

arr3 = [...arr1,...arr2]
console.log(arr3)

// Use a switch statement to return the day of the week given a number (1 = Sunday ...., 7 = Saturday). (0.5 Grade)

x = 5

switch (x){
    case 1:
        x = 1
        console.log("Saturday")
        break;
    case 2:
        x = 2
        console.log("Sunday")
        break;
    case 3:
        x = 3
        console.log("Monday")
        break;
    case 4:
        x = 4
        console.log("Tuesday")
        break;
    case 5:
        x = 5
        console.log("Wednesday")
        break;
    case 6:
        x = 6
        console.log("Thusday")
        break;
    case 7:
        x = 7
        console.log("Friday")
        break;
}

// Create an array of strings and return their lengths using map method (0.5 Grade)
arr = ["a", "ab", "abc"];
len = arr.map(x => x.length)
console.log(len)

// Write a function that checks if a number is divisible by 3 and 5. (0.5 Grade)
x = 15
function isDivby3and5(x){
        if(x % 3 ==0 && x % 5 ==0){
            console.log("Divisable by Both")
        }
        else if(x % 5 == 0){
            console.log("Divisable by 5")
        }
        else if (x % 3 == 0){
            console.log("Divisable by 3")
        }
        else{
            console.log("Not divisible by 3 or 5");
        }
}
isDivby3and5(15); 
isDivby3and5(9);  
isDivby3and5(10); 
isDivby3and5(7);  

// Write a function using arrow syntax to return the square of a number (0.5 Grade)
let sqrt = (a) =>{
    console.log(a*a)
}

sqrt(5)

// Write a function that destructures an object to extract values and returns a formatted string. (0.5 Grade)
const human ={
    name : "Jhon",
    age  : 25
}

function des(obj){
    const {name , age} = obj
    return `${name} is ${age} years old`
}
console.log(des(human))

// Write a function that accepts multiple parameters (two or more) and returns their sum. (0.5 Grade)
function summ(...numbers){
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(summ(1, 2, 3, 4, 5))

// Write a function that returns a promise which resolves after 3 seconds with a 'Success' message. (0.5 Grade)
function waitForSuccess() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000); 
    });
}

waitForSuccess().then(message => console.log(message));

// Write a function to find the largest number in an array. (0.5 Grade)
function TheLargest(arr){
    let temp = [0];

    for(let x of arr){
        if (x > temp){
            temp = x
        }
    }
    return temp
}
console.log(TheLargest([1, 3, 7, 2, 4]));

// Write a function that takes an object and returns an array containing only its keys. (0.5 Grade)
function objtoarr(obj){
    keys = Object.keys(obj)
    return keys;
}

console.log(objtoarr(human))

// Write a function that splits a string into an array of words based on spaces. (0.5 Grade)
function split(str){
    return str.split(" ");
}
console.log(split("The quick brown fox"))