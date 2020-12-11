const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const JobMCQOption = sequelize.define("JobMCQOption", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      job_id: {
        type: DataTypes.INTEGER,

        reference: {
          model: 'Job',
          key: 'id'
        }
      },
      video_id: {
        type: DataTypes.INTEGER,
        reference: {
          model: 'JobVideo',
          key: 'id'
        }
      },
      answer: {
          type: DataTypes.STRING,
      },
      nextVideo_id: {
        type: DataTypes.INTEGER,
        //Video, If questionType = 0, 2 or 3
        reference: {
          model: 'JobVideo',
          key: 'id'
        }
      },
  });
  

  return JobMCQOption;
};
