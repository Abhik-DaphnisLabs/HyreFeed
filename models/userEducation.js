const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserEducation = sequelize.define("UserEducation", {
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
      institute: {
          type: DataTypes.STRING,
      },
      course: {
          type: DataTypes.STRING,
      },
      degree: {
        type: DataTypes.STRING,
      },
      batchFrom: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      batchTo: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      others: {
          type: DataTypes.JSONB
      }
  });
  

  return UserEducation;
};
