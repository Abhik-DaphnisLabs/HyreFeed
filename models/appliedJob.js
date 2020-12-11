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
      stage: {
        type: DataTypes.INTEGER     //1: Applied 2: Under Review 3: Shortlisted 4: Accepted/rejected
      },
      rejected: {
        type: DataTypes.BOOLEAN,
        default: false
      }
  });
  

  return BookmarkedJob;
};
