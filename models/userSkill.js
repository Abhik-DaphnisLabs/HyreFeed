const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserSkill = sequelize.define("UserSkill", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER,

        reference: {
          model: 'User',
          key: 'id'
        }
      },
      name: {
          type: DataTypes.STRING,
      },
  });
  

  return UserSkill;
};
