import sequelize from "../../connection.js";
import { DataTypes } from "sequelize";

export const Sales = sequelize.define("Sale", {
  SaleID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    references: {
      model: "products",
      key: "ProductID",
    },
  },
  QuantitySold: {
    type: DataTypes.INTEGER,
  },
  SaleDate: {
    type: DataTypes.DATE,
  },
});
