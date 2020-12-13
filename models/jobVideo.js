const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const JobVideo = sequelize.define("JobVideo", {
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
      name: {
          type: DataTypes.STRING,
      },
      filename: {
        type: DataTypes.STRING,
      },
      questionType: {
        type: DataTypes.INTEGER,
        //0: None, go to next Video, 1: MCQ 2: SubjectiveText 3: SubjectiveAudio, 4: End
      },
      question: {
        type: DataTypes.STRING
      },
      mcqOptions: {
        type: DataTypes.ARRAY(DataTypes.JSON)
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
  

  return JobVideo;
};
