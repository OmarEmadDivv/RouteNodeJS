import mysql from "mysql2";
export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment5",
});

export const initConnection = () => {
  console.log("DB connected successfully");
};
