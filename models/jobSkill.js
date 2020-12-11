const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const JobSkill = sequelize.define("JobSkill", {
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
  });
  

  return JobSkill;
};
