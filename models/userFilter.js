const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserFilter = sequelize.define("UserFilter", {
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
      category: {
          type: DataTypes.STRING,
      },
      city: {
          type: DataTypes.STRING,
      },
      type: {
          type: DataTypes.STRING,
      },
      experience: {
          type: DataTypes.STRING,
      },
      distance: {
          type: DataTypes.STRING,
      },
      salary: {
          type: DataTypes.STRING,
      },
      skills: {
          type: DataTypes.STRING,
      },
      tools: {
          type: DataTypes.STRING,
      },
      
      others: {
          type: DataTypes.JSONB
      }
  });
  

  return UserFilter;
};
