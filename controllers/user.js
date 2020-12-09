module.exports = (db) => {
  const user = db.user,
        userCertification = db.userCertification,
        userEducation = db.userEducation,
        userFilter = db.userFilter,
        userProfessionalDetail = db.userProfessionalDetail,
        userSkill = db.userSkill

  let userController = {}

  userController.getDetails = async function (userID){
    try{
      const userData = await user.findByPk(userID)
      const certification = await userCertification.findAll({
        where: {
          user_id: userID
        }
      })
      const education = await userEducation.findAll({
        where: {
          user_id: userID
        }
      })
      const professionalDetails = await userProfessionalDetail.findAll({
        where: {
          user_id: userID
        }
      })
      const skills = await userSkill.findAll({
        where: {
          user_id: userID
        }
      })

      if(!userData)
        throw new Error("Invalid Primary Key!")
      return {
        success: true,
        user: userData,
        education: education,
        professionalDetails, professionalDetails,
        skills: skills,
        certification: certification
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
    console.log(userID, body, file)
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
    }

    const educations = body.educations;
    const certifications = body.certifications;
    const professionalDetails = body.professionalDetails;
    const skills = body.skills;

    try{
      let respone = await user.update(userDetails, {
        where: {
          id: userID
        }
      })
      if(educations){
        educations.forEach(async (education) => {
          education.user_id = userID
          await userEducation.create(education)
        })
      }
      if(certifications){
        certifications.forEach(async (certification) => {
          certification.user_id = userID
          await userCertification.create(certification)
        })
      }
      if(professionalDetails){
        professionalDetails.forEach(async (professionalDetail) => {
          professionalDetail.user_id = userID
          await userProfessionalDetail.create(professionalDetail)
        })
      }
      if(skills){
        skills.forEach(async (skill) => {
          let newSkill = {
            user_id: userID,
            name: skill
          }
          await userSkill.create(newSkill)
        })
      }
      return {
        success: true,
        message: "Profile Successfully Updated!"
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  

  
  return userController;
}
