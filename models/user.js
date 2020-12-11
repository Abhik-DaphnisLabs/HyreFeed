const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
      id: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      email: {
          type: DataTypes.STRING,
          unique: true,
          notNull: true
      },
      hash: {
          type: DataTypes.STRING(2047)
      },
      salt: {
          type: DataTypes.STRING,
      },
      firstName: {
          type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      contactNumber: {
          type: DataTypes.STRING(31),
      },
      dateOfBirth: {
          type: DataTypes.DATEONLY,
      },
      gender: {
          type: DataTypes.ENUM('Male', 'Female', 'Others'),
      },
      resume: {
          type: DataTypes.STRING,
      },
      profileImage: {
          type: DataTypes.STRING,
      },
      lastFiltered: {
          type: DataTypes.JSON,
      },
      bookMarkCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      roles: {
          type: DataTypes.JSON
        //   type: DataTypes.ENUM('user', 'recruiter', 'videoPresenter', 'videoEditor', 'screener', 'superUser')
      },
      applicationCount: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      city: {
          type: DataTypes.STRING(31),
      },
      address: {
          type: DataTypes.JSONB,
      },
      pincode: {
          type: DataTypes.STRING(15),
      },
      annualSalary: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      hideSalary: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      expectedSalary: {
          type: DataTypes.INTEGER,
          defaultValue: 0
      },
      salaryNegotiable: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
      },
      tagline: {
        type: DataTypes.STRING(1024)
      },
      industry: {
        type: DataTypes.STRING
      },
      functionalArea: {
        type: DataTypes.STRING
      },
      noticePeriod: {
        type: DataTypes.STRING
      },
      experience: {
        type: DataTypes.STRING
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING)
      },
      educations: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      certifications: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      professionalDetails: {
        type: DataTypes.ARRAY(DataTypes.JSON)
      },
      others: {
          type: DataTypes.JSONB
      }
  });
  

  return User;
};
