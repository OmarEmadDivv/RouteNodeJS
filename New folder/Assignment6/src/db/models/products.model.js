import sequelize from "../../connection.js";
import { DataTypes } from "sequelize";

export const products = sequelize.define("product", {
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ProductName: {
    type: DataTypes.TEXT,
  },
  Price: {
    type: DataTypes.DECIMAL,
  },
  StockQuantity: {
    type: DataTypes.INTEGER,
  },
  SupplierID: {
    type: DataTypes.INTEGER,
    references: {
      model: "Suppliers",
      key: "SupplierID",
    },
  },
});
