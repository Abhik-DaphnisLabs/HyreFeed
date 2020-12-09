const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Skill = sequelize.define("Skill", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      category: {
        type: DataTypes.STRING,
      },
      name: {
          type: DataTypes.STRING,
      },
  });
  

  return Skill;
};
