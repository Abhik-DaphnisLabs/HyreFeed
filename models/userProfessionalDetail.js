const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const UserProfessionalDetail = sequelize.define("UserProfessionalDetail", {
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
      designation: {
          type: DataTypes.STRING,
      },
      organization: {
          type: DataTypes.STRING,
      },
      fromMonth: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      fromYear: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      toMonth: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      toYear: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      others: {
          type: DataTypes.JSONB
      }
  });
  

  return UserProfessionalDetail;
};
