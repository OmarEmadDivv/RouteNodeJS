import { Sequelize } from "sequelize";

const sequelize = new Sequelize('assignment6', 'root', '', {
    host: '127.0.0.1',
    dialect: "mysql"
});





export default sequelize
