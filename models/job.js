const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Job = sequelize.define("Job", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      organization: {
          type: DataTypes.STRING,
      },
      description: {
          type: DataTypes.STRING(1023)
      },
      title: {
          type: DataTypes.STRING,
      },
      positions: {
          type: DataTypes.INTEGER,
      },
      education: {
        type: DataTypes.STRING,
      },
      educationCriteria: {
          type: DataTypes.STRING,
      },
      experience: {
          type: DataTypes.STRING,
      },
      experienceCriteria: {
          type: DataTypes.STRING,
      },
      salaryLowerLimit: {
          type: DataTypes.INTEGER,
      },
      salaryUpperLimit: {
          type: DataTypes.INTEGER,
      },
      location: {
          type: DataTypes.JSONB,
      },
      city: {
        type: DataTypes.STRING
      },
      state: {
          type: DataTypes.STRING,
      },
      skills: {
          type: DataTypes.ARRAY(DataTypes.STRING),
      },
      tools: {
          type: DataTypes.ARRAY(DataTypes.STRING),
      },
      interviewProcess: {
        type: DataTypes.STRING
      },
      shiftTime: {
        type: DataTypes.STRING
      },
      workingDays: {
        type: DataTypes.STRING
      },
      role: {
        type: DataTypes.STRING
      },
      payRate: {
        type: DataTypes.STRING
      },
      paymentTerms: {
        type: DataTypes.STRING
      },
      replacementPeriod: {
        type: DataTypes.STRING
      },
      type: {
        type: DataTypes.STRING
      },
      rootVideo: {
        type: DataTypes.INTEGER,

        reference: {
          model: 'Video',
          key: 'id'
        }
      },
      others: {
          type: DataTypes.JSONB
      }
  });
  

  return Job;
};
