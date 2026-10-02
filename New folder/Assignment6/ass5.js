const express = require("express");
const { Sequelize } = require("sequelize");
const sequelize = require("../db/connection");

const app = express();
const port = 3000;
app.use(express.json());

async function runQueries() {
  try {
    console.log("Starting Database Queries...");

    await sequelize.query(
      "ALTER TABLE Products ADD COLUMN Category VARCHAR(255);",
    );
    console.log("Column 'Category' added successfully!");

    await sequelize.query("ALTER TABLE Products DROP COLUMN Category;");
    console.log("Column 'Category' dropped successfully!");

    await sequelize.query(
      "ALTER TABLE Suppliers MODIFY COLUMN ContactNumber VARCHAR(15);",
    );
    console.log("Column 'ContactNumber' modified successfully!");

    await sequelize.query(
      "ALTER TABLE Products MODIFY COLUMN ProductName TEXT NOT NULL;",
    );
    console.log("Column 'ProductName' modified successfully!");

    await sequelize.query(
      "INSERT INTO Suppliers (SupplierName, ContactNumber) VALUES ('FreshFoods', '01001234567');",
    );
    console.log("Supplier added successfully!");

    await sequelize.query(
      "INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID) VALUES ('Milk', 15.00, 50, 1);",
    );
    console.log("Product added successfully!");

    await sequelize.query(
      "INSERT INTO Sales (ProductID, QuantitySold, SaleDate) VALUES (1, 2, '2025-05-20');",
    );
    console.log("Sale added successfully!");

    await sequelize.query(
      "UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread';",
    );
    console.log("Price updated successfully!");

    await sequelize.query("DELETE FROM Products WHERE ProductName = 'Eggs';");
    console.log("Product 'Eggs' deleted successfully!");

    const [sales] = await sequelize.query(
      "SELECT ProductID, SUM(QuantitySold) AS TotalSold FROM Sales GROUP BY ProductID;",
    );
    console.log("Total Sold:", sales);

    const [highestStock] = await sequelize.query(
      "SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1;",
    );
    console.log("Highest Stock:", highestStock);

    const [suppliersF] = await sequelize.query(
      "SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%';",
    );
    console.log("Suppliers starting with F:", suppliersF);

    const [unsold] = await sequelize.query(
      "SELECT * FROM Products WHERE ProductID NOT IN (SELECT ProductID FROM Sales);",
    );
    console.log("Unsold Products:", unsold);

    const [allSales] = await sequelize.query(
      "SELECT s.SaleID, p.ProductName, s.SaleDate FROM Sales s JOIN Products p ON s.ProductID = p.ProductID;",
    );
    console.log("All Sales:", allSales);

    await sequelize.query(
      "CREATE USER 'store_manager'@'localhost' IDENTIFIED BY 'password123';",
    );
    await sequelize.query(
      "GRANT SELECT, INSERT, UPDATE ON assignment5.* TO 'store_manager'@'localhost';",
    );
    console.log("User store_manager created and granted permissions!");

    await sequelize.query(
      "REVOKE UPDATE ON assignment5.* FROM 'store_manager'@'localhost';",
    );
    console.log("UPDATE permission revoked from store_manager!");

    await sequelize.query(
      "CREATE USER 'financial_analyst'@'localhost' IDENTIFIED BY 'finance2025';",
    );
    await sequelize.query(
      "GRANT SELECT, UPDATE ON assignment5.* TO 'financial_analyst'@'localhost';",
    );
    console.log("User financial_analyst created!");

    await sequelize.query(
      "GRANT SELECT, INSERT, UPDATE ON assignment5.* TO 'store_manager'@'localhost' WITH GRANT OPTION;",
    );
    console.log("Permissions granted with GRANT OPTION!");

    await sequelize.query(
      "GRANT DELETE ON assignment5.Sales TO 'store_manager'@'localhost';",
    );
    console.log("DELETE on Sales granted to store_manager!");

    console.log("✅ All Queries Executed Successfully in Order!");
  } catch (error) {
    console.error("❌ Error executing queries:", error.message);
  }
}

runQueries();

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
