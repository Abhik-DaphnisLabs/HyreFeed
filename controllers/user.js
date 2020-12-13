const { response } = require("express")

module.exports = (db) => {
  const User = db.user,
        UserFilter = db.userFilter,
        AppliedJob = db.appliedJob,
        BookmarkedJob = db.bookmarkedJob

  let userController = {}

  userController.getDetails = async function (userID){
    try{
      const userData = await User.findByPk(userID)
     
      if(!userData)
        throw new Error("Invalid Primary Key!")
      return {
        success: true,
        user: userData,
        
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  userController.insertDetails = async function (userID, body, file){
    // console.log(userID, body, file)
    const userDetails = {
      firstName: body.firstName,
      lastName: body.lastName,
      contactNumber: body.contactNumber,
      dateOfBirth: new Date(body.dateOfBirth),
      gender: body.gender,
      resume: file['resume'][0].filename,
      profileImage: file['profileImage'][0].filename,
      address: body.address,
      pincode: body.pincode,
      city: body.city,
      annualSalary: body.annualSalary,
      hideSalary: body.hideSalary,
      expectedSalary: body.expectedSalary,
      salaryNegotiable: body.salaryNegotiable,
      tagline: body.tagline,
      industry: body.industry,
      functionalArea: body.functionalArea,
      noticePeriod: body.noticePeriod,
      experience: body.experience,
      skills: body.skills,
      educations: body.educations,
      certifications: body.certifications,
      professionalDetails: body.professionalDetails,
    }

    try{
      let response = await User.update(userDetails, {
        where: {
          id: userID
        }
      })
      return {
        success: true,
        message: "Profile Successfully Updated!",
        response: response
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  userController.addBookmark = async function (req, res, next) {
    try {
      await BookmarkedJob.create({
        user_id: req.user.id,
        job_id: req.query.jobID
      })
      res.json({
        success: true
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  userController.getBookmarks = async function (req, res, next) {
    try {
      let bookmarks = await BookmarkedJob.findAll({
        where: {
          user_id: req.user.id
        }
      })
      res.json({
        success: true,
        bookmarks: bookmarks
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }
  userController.deleteBookmark = async function (req, res, next) {
    try {
      await BookmarkedJob.destroy({
        where: {
          user_id: req.user.id,
          job_id: req.query.jobID
        }
      })
      res.json({
        success: true
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }

  userController.getAppliedList = async function (req, res, next) {
    try {
      let appliedJobs = await AppliedJob.findAll({
        where: {
          user_id: req.user.id
        }
      })
      res.json({
        success: true,
        appliedJobs: appliedJobs
      })
    } catch (error) {
      // console.trace()
      res.json({
        success: false,
        error: error
      })
    }
  }

  

  
  return userController;
}
