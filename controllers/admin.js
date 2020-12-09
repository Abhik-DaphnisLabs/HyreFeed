const admin = require("../routes/admin");

module.exports = (db) => {
  const user = db.user,
        userCertification = db.userCertification,
        userEducation = db.userEducation,
        userFilter = db.userFilter,
        userProfessionalDetail = db.userProfessionalDetail,
        userSkill = db.userSkill,
        skill = db.skill,
        category = db.category

  let adminController = {}

  adminController.addSkills = async function (body) {
    try{
      let skills = body.skills
      for(let i = 0; i < skills.length; i++){
        let newSkill = {
          name: skills[i].name,
          category: skills[i].category
        }
        await skill.create(newSkill)
      }
      return {
        success: true
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  adminController.addCategories = async function (body) {
    try{
      let categories = body.categories
      for(let i = 0; i < categories.length; i++){
        let newCategory = {
          name: categories[i].name
        }
        await category.create(newCategory)
      }
      return {
        success: true
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  

  
  return adminController;
}
