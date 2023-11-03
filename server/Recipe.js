// models/Recipe.js
const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const Recipe = sequelize.define("Recipe", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrementIdentity: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  serving: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Recipe;
