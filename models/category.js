const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category = sequelize.define("Category", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      name: {
          type: DataTypes.STRING,
      },
  });
  

  return Category;
};
