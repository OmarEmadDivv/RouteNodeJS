import sequelize from "../../connection.js";
import { DataTypes } from "sequelize";

const post = sequelize.define("posts" , {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    title : DataTypes.STRING,
    content : DataTypes.TEXT,
    userId :{
        type : DataTypes.INTEGER,
        references :{
            model : "users",
            key : "id"
        },
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
    
})


export default post
