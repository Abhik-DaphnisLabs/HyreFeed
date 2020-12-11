const Op = require("sequelize").Op

module.exports = (db) => {
  const skill = db.skill

  let skillController = {}

  skillController.search = async function (query, category) {
    try{
      let skills = await skill.findAll({
        where: {
          name: 
          {
            [Op.iLike] : query+"%",
          },
          category: category
        }
      });
      return {
        success: true,
        skills: skills
      }
    } catch(err) {
      return {
        success: false,
        message: "Error Occured!",
        error: err
      }
    }
  }

  

  

  
  return skillController;
}
