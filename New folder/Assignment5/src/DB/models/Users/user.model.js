import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const user = sequelize.define("users" , {
    id :{
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        validate :{
            checkNameLength(name){
                if(name.length< 2){
                    throw new Error ("Name must be at least 2 characters long")
                }
            }
        }
    },
    email :{
        type : DataTypes.STRING,
        unique : true,
        validate : {
            isEmail : true
        }
    },
    password : {
        type : DataTypes.STRING,
        validate : {
            checkPasswordLength(pass){
                if(pass.length < 6){
                    throw new Error("Password must be at least 6 characters long")
                }
            }
        }
    },
    role : {
        type : DataTypes.ENUM("user" , "admin")
    },
    createdAt : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.DATE
    },
    updatedAt : {
        type : DataTypes.DATE,
        defaultValue : DataTypes.DATE
    }
})


export default user
