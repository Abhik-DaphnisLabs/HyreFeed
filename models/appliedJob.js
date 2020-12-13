const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const AppliedJob = sequelize.define("AppliedJob", {
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
        type: DataTypes.INTEGER,     //1: Applied 2: Under Review 3: Shortlisted 4: Accepted/rejected
        default: 1
      },
      rejected: {
        type: DataTypes.BOOLEAN,
        default: false
      },
      answers: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      }
  });
  

  return AppliedJob;
};
