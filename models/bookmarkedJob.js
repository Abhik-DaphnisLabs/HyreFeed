const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const BookmarkedJob = sequelize.define("BookmarkedJob", {
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
      job_id: {
        type: DataTypes.INTEGER,

        reference: {
          model: 'Job',
          key: 'id'
        }
      },
  });
  

  return BookmarkedJob;
};
