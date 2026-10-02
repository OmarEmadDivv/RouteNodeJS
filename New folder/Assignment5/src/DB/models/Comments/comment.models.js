import { DataTypes } from "sequelize";
import sequelize from "../../connection.js";

const comment = sequelize.define("comments",{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    content : DataTypes.TEXT,
    postId : {
        type : DataTypes.INTEGER,
        references : {
            model : "posts",
            key : "id"
        }
    },
    userId : {
        type : DataTypes.INTEGER,
        references : {
            model : "users",
            key : "id"
        }
    },
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
})


export default comment