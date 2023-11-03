const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "recipe",
  "root",
  "",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

module.exports = sequelize;
