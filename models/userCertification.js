const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserCertification = sequelize.define("UserCertification", {
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
      name: {
          type: DataTypes.STRING,
      },
      type: {
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
  

  return UserCertification;
};
