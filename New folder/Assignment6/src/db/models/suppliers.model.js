import sequelize from "../../connection.js";
import { DataTypes } from "sequelize";

export const Suppliers = sequelize.define("Supplier", {
  SupplierID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  SupplierName: {
    type: DataTypes.TEXT,
  },
  ContactNumber: {
    type: DataTypes.TEXT,
  },
});
